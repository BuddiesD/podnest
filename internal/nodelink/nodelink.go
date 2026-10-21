// PodNest - Self-hosted site management platform
// Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com>
// Licensed under the MIT License. See LICENSE file in the project root for full license text.

package nodelink

import (
	"crypto/ed25519"
	"crypto/rand"
	"encoding/base32"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"net"
	"net/http"
	"net/url"
	"strings"
	"time"

	"podnest/internal/auth"
	"podnest/internal/models"
)

// assertion operations
const (
	OpPair   = "pair"
	OpUpdate = "update"
	OpUnpair = "unpair"
	OpSSO    = "sso"
)

const (
	PairCodeTTL  = 5 * time.Minute
	OpTTL        = 5 * time.Minute
	AssertionTTL = 60 * time.Second

	// maxSkew tolerates clock drift between parent and child, which never talk
	// directly and so never agree on time beyond what NTP gives each of them
	maxSkew = 60 * time.Second

	// maxLifetime caps exp-iat regardless of what the signer claims
	maxLifetime = AssertionTTL + maxSkew

	maxTokenLen = 64 << 10
)

// ErrInvalidAssertion is returned for any assertion that fails parsing, signature, or claim checks.
var ErrInvalidAssertion = errors.New("invalid node assertion")

var (
	b64     = base64.RawURLEncoding
	codeEnc = base32.StdEncoding.WithPadding(base32.NoPadding)
)

// Assertion is a parent-signed instruction carried to a child through the
// browser. The browser is only a courier: the child trusts nothing in it that
// the signature does not cover.
type Assertion struct {
	Op       string            `json:"op"`
	LinkID   string            `json:"lid"`
	Aud      string            `json:"aud"`
	Nonce    string            `json:"nonce"`
	IssuedAt int64             `json:"iat"`
	Expires  int64             `json:"exp"`
	Ack      string            `json:"ack,omitempty"`
	Ret      string            `json:"ret,omitempty"`
	Code     string            `json:"code,omitempty"`
	PubKey   string            `json:"pub,omitempty"`
	Sub      int64             `json:"sub,omitempty"`
	Users    []models.NodeUser `json:"users,omitempty"`
}

// NewAssertion returns an assertion for op on the given link and audience with
// a fresh nonce and the standard lifetime.
func NewAssertion(op, linkID, aud string) (*Assertion, error) {
	nonce, err := models.GenerateSessionID()
	if err != nil {
		return nil, err
	}
	now := time.Now().UTC()
	return &Assertion{
		Op:       op,
		LinkID:   linkID,
		Aud:      aud,
		Nonce:    nonce,
		IssuedAt: now.Unix(),
		Expires:  now.Add(AssertionTTL).Unix(),
	}, nil
}

// GenerateKey returns a new Ed25519 link keypair as base64 seed and public key.
func GenerateKey() (string, string, error) {
	pub, priv, err := ed25519.GenerateKey(rand.Reader)
	if err != nil {
		return "", "", err
	}
	return base64.StdEncoding.EncodeToString(priv.Seed()), base64.StdEncoding.EncodeToString(pub), nil
}

// PublicKey derives the base64 public key from a base64 private key seed.
func PublicKey(privKey string) (string, error) {
	priv, err := decodePriv(privKey)
	if err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(priv.Public().(ed25519.PublicKey)), nil
}

// decodePriv decodes a base64 private key seed.
func decodePriv(privKey string) (ed25519.PrivateKey, error) {
	seed, err := base64.StdEncoding.DecodeString(privKey)
	if err != nil || len(seed) != ed25519.SeedSize {
		return nil, fmt.Errorf("invalid node private key")
	}
	return ed25519.NewKeyFromSeed(seed), nil
}

// Sign serializes and signs an assertion, returning the token.
func Sign(privKey string, a *Assertion) (string, error) {
	priv, err := decodePriv(privKey)
	if err != nil {
		return "", err
	}
	payload, err := json.Marshal(a)
	if err != nil {
		return "", err
	}
	return b64.EncodeToString(payload) + "." + b64.EncodeToString(ed25519.Sign(priv, payload)), nil
}

// split decodes a token into its payload and signature.
func split(token string) ([]byte, []byte, error) {
	if len(token) == 0 || len(token) > maxTokenLen {
		return nil, nil, ErrInvalidAssertion
	}
	parts := strings.SplitN(token, ".", 2)
	if len(parts) != 2 {
		return nil, nil, ErrInvalidAssertion
	}
	payload, err := b64.DecodeString(parts[0])
	if err != nil {
		return nil, nil, ErrInvalidAssertion
	}
	sig, err := b64.DecodeString(parts[1])
	if err != nil || len(sig) != ed25519.SignatureSize {
		return nil, nil, ErrInvalidAssertion
	}
	return payload, sig, nil
}

// Peek decodes an assertion WITHOUT verifying it. Only for choosing which key
// to verify with (the link ID) or, when pairing, reading the key the assertion
// presents — nothing it returns may be acted on before Verify succeeds.
func Peek(token string) (*Assertion, error) {
	payload, _, err := split(token)
	if err != nil {
		return nil, err
	}
	a := &Assertion{}
	if err := json.Unmarshal(payload, a); err != nil {
		return nil, ErrInvalidAssertion
	}
	return a, nil
}

// Verify checks a token's signature against pubKey and its claims against the
// clock and the expected audience, returning the assertion when all pass.
// Nonce replay is the caller's to enforce, since it needs storage.
func Verify(token, pubKey, aud string) (*Assertion, error) {
	payload, sig, err := split(token)
	if err != nil {
		return nil, err
	}
	pub, err := base64.StdEncoding.DecodeString(pubKey)
	if err != nil || len(pub) != ed25519.PublicKeySize {
		return nil, ErrInvalidAssertion
	}
	if !ed25519.Verify(ed25519.PublicKey(pub), payload, sig) {
		return nil, ErrInvalidAssertion
	}

	a := &Assertion{}
	if err := json.Unmarshal(payload, a); err != nil {
		return nil, ErrInvalidAssertion
	}

	now := time.Now().UTC().Unix()
	if a.Expires <= now || a.IssuedAt > now+int64(maxSkew.Seconds()) || a.Expires-a.IssuedAt > int64(maxLifetime.Seconds()) {
		return nil, ErrInvalidAssertion
	}
	if a.Aud == "" || a.Aud != aud || a.LinkID == "" || a.Nonce == "" {
		return nil, ErrInvalidAssertion
	}
	return a, nil
}

// GeneratePairCode returns a random 80-bit pairing code formatted as
// XXXX-XXXX-XXXX-XXXX for display.
func GeneratePairCode() (string, error) {
	b := make([]byte, 10)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	s := codeEnc.EncodeToString(b)
	return s[0:4] + "-" + s[4:8] + "-" + s[8:12] + "-" + s[12:16], nil
}

// NormalizePairCode reduces a pairing code to its stored form, uppercased with
// separators and whitespace removed, so a hand-typed code still matches.
func NormalizePairCode(code string) string {
	return strings.Map(func(r rune) rune {
		if r == '-' || r == ' ' || r == '\t' {
			return -1
		}
		return r
	}, strings.ToUpper(strings.TrimSpace(code)))
}

// NormalizeOrigin reduces a node URL to its lowercase scheme://host[:port]
// origin, dropping the scheme's default port.
func NormalizeOrigin(raw string) (string, error) {
	u, err := url.Parse(strings.TrimSpace(raw))
	if err != nil {
		return "", fmt.Errorf("invalid URL: %w", err)
	}
	if u.Scheme != "http" && u.Scheme != "https" {
		return "", fmt.Errorf("URL must be http or https")
	}
	if u.Host == "" || u.User != nil {
		return "", fmt.Errorf("URL must be a plain host")
	}
	return buildOrigin(u.Scheme, u.Host), nil
}

// RequestOrigin returns the origin the browser used to reach this instance.
func RequestOrigin(r *http.Request) string {
	scheme := "http"
	if auth.IsSecure(r) {
		scheme = "https"
	}
	return buildOrigin(scheme, r.Host)
}

// buildOrigin lowercases scheme and host and strips the scheme's default port.
func buildOrigin(scheme, host string) string {
	scheme = strings.ToLower(scheme)
	host = strings.ToLower(host)
	if h, p, err := net.SplitHostPort(host); err == nil {
		if (scheme == "https" && p == "443") || (scheme == "http" && p == "80") {
			host = h
			if strings.Contains(h, ":") {
				host = "[" + h + "]"
			}
		}
	}
	return scheme + "://" + host
}
