// PodNest - Self-hosted site management platform
// Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com>
// Licensed under the MIT License. See LICENSE file in the project root for full license text.

package server

import (
	"encoding/json"
	"errors"
	"net/http"
	"net/url"
	"strings"
	"time"

	"podnest/internal/apiutil"
	"podnest/internal/audit"
	"podnest/internal/auth"
	"podnest/internal/db"
	"podnest/internal/logger"
	"podnest/internal/models"
	"podnest/internal/nodelink"
	"podnest/web"
)

// nodeLinkMaxBody bounds the link POST — the token cap plus JSON framing.
const nodeLinkMaxBody = 128 << 10

var (
	errNodeLinkInvalid = errors.New("this node link is invalid or has expired")
	errNodeLinkFailed  = errors.New("the node link could not be applied")
)

// handleNodeLink serves GET /node/link (the courier page) and processes POST
// /node/link (the assertion it carries). The token rides in the URL fragment
// so it never reaches a server log or a Referer; the page strips it from the
// address bar and posts it here. The route is public — the parent's signature
// is the only credential, so nothing here trusts the session or the browser.
func (s *Server) handleNodeLink(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		if err := web.Templates.ExecuteTemplate(w, "node.html", map[string]any{"Nonce": cspNonce(r)}); err != nil {
			logger.Error("failed to execute node.html template: %v", err)
			http.Error(w, "template error", http.StatusInternalServerError)
		}

	case http.MethodPost:
		ip := s.proxy.ClientIP(r)
		if !auth.LoginAllowed(ip) {
			apiutil.ErrorMsg(w, http.StatusTooManyRequests, "too many failed attempts, please try again later")
			return
		}

		// a cross-site form cannot send JSON without a CORS preflight, so this
		// keeps another origin from driving the endpoint with a captured token
		if !strings.HasPrefix(r.Header.Get("Content-Type"), "application/json") {
			apiutil.ErrorMsg(w, http.StatusUnsupportedMediaType, "expected application/json")
			return
		}

		var req struct {
			Token string `json:"token"`
		}
		if err := json.NewDecoder(http.MaxBytesReader(w, r.Body, nodeLinkMaxBody)).Decode(&req); err != nil {
			apiutil.ErrorMsg(w, http.StatusBadRequest, "invalid request")
			return
		}

		redirect, user, err := s.applyNodeAssertion(w, r, req.Token)
		if err != nil {
			auth.RecordFailedLogin(ip)
			audit.Record(models.AuditEntry{
				IP:      ip,
				UA:      r.Header.Get("User-Agent"),
				Method:  r.Method,
				Action:  "POST /node/link",
				Status:  http.StatusForbidden,
				Details: `{"event":"node_link_failed"}`,
			})
			apiutil.ErrorMsg(w, http.StatusForbidden, err.Error())
			return
		}

		entry := models.AuditEntry{
			IP:      ip,
			UA:      r.Header.Get("User-Agent"),
			Method:  r.Method,
			Action:  "POST /node/link",
			Status:  http.StatusOK,
			Details: `{"event":"node_link"}`,
		}
		if user != nil {
			auth.RecordSuccessfulLogin(ip)
			entry.UID = &user.ID
			entry.Username = user.UName
			entry.Details = `{"event":"node_sso"}`
		}
		audit.Record(entry)
		apiutil.JSON(w, http.StatusOK, map[string]string{"redirect": redirect})

	default:
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
	}
}

// applyNodeAssertion verifies and applies a parent-signed assertion, returning
// where to send the browser next and, for an SSO hop, the user signed in.
// Errors are safe to show to the browser.
func (s *Server) applyNodeAssertion(w http.ResponseWriter, r *http.Request, token string) (string, *models.User, error) {
	peek, err := nodelink.Peek(token)
	if err != nil {
		return "", nil, errNodeLinkInvalid
	}

	// the audience is the origin the browser actually reached, so a token minted
	// for one URL is refused on any other
	origin := nodelink.RequestOrigin(r)

	parent, err := db.GetNodeParent(s.cfg.DB)
	if err != nil {
		return "", nil, errNodeLinkFailed
	}

	// pairing is the one assertion verified against the key it presents — the
	// single-use, origin-bound pairing code is what proves the parent is the
	// one the local admin handed it to
	if peek.Op == nodelink.OpPair {
		if parent != nil {
			return "", nil, errors.New("this node already has a parent")
		}
		if !nodelink.ValidPublicKey(peek.PubKey) {
			return "", nil, errNodeLinkInvalid
		}
		a, err := nodelink.Verify(token, peek.PubKey, origin)
		if err != nil {
			return "", nil, errNodeLinkInvalid
		}
		ret, err := nodeLinkReturn(a)
		if err != nil {
			return "", nil, err
		}
		if !db.ConsumeNodeNonce(s.cfg.DB, a.Nonce, time.Unix(a.Expires, 0)) {
			return "", nil, errNodeLinkInvalid
		}
		ok, err := db.ConsumeNodePairCode(s.cfg.DB, nodelink.NormalizePairCode(a.Code), origin)
		if err != nil || !ok {
			return "", nil, errors.New("the pairing code is invalid, expired, or was issued for a different URL")
		}
		if err := db.CreateNodeParent(s.cfg.DB, a.LinkID, a.PubKey); err != nil {
			return "", nil, errNodeLinkFailed
		}
		logger.Info("node paired to parent link %s", a.LinkID)
		return ret, nil, nil
	}

	if parent == nil || peek.LinkID != parent.LinkID {
		return "", nil, errNodeLinkInvalid
	}
	a, err := nodelink.Verify(token, parent.ParentPub, origin)
	if err != nil {
		return "", nil, errNodeLinkInvalid
	}
	if !db.ConsumeNodeNonce(s.cfg.DB, a.Nonce, time.Unix(a.Expires, 0)) {
		return "", nil, errNodeLinkInvalid
	}

	switch a.Op {
	case nodelink.OpUpdate:
		ret, err := nodeLinkReturn(a)
		if err != nil {
			return "", nil, err
		}
		if a.PubKey != "" {
			if !nodelink.ValidPublicKey(a.PubKey) {
				return "", nil, errNodeLinkInvalid
			}
			if err := db.UpdateNodeParentKey(s.cfg.DB, a.PubKey); err != nil {
				return "", nil, errNodeLinkFailed
			}
			logger.Info("parent link %s re-keyed", a.LinkID)
		}
		return ret, nil, nil

	case nodelink.OpUnpair:
		ret, err := nodeLinkReturn(a)
		if err != nil {
			return "", nil, err
		}
		if err := nodelink.DropParent(s.cfg.DB); err != nil {
			if errors.Is(err, db.ErrNoLocalAdmin) {
				return "", nil, errors.New("synced users own sites and this node has no local admin to reassign them to")
			}
			return "", nil, errNodeLinkFailed
		}
		logger.Info("parent link %s removed", a.LinkID)
		return ret, nil, nil

	case nodelink.OpSSO:

		// the signed-in user must be in the admin list the same assertion carries,
		// or a parent user dropped from it could still ride a stale local record
		listed := false
		for _, u := range a.Users {
			if u.NodeUID == a.Sub {
				listed = true
				break
			}
		}
		if !listed || a.Sub <= 0 {
			return "", nil, errNodeLinkInvalid
		}

		if err := db.SyncNodeUsers(s.cfg.DB, a.Users); err != nil {
			return "", nil, errNodeLinkFailed
		}
		user, err := db.GetUserByNodeUID(s.cfg.DB, a.Sub)
		if err != nil || user == nil {
			return "", nil, errNodeLinkFailed
		}
		if user.Blocked {
			return "", nil, errors.New("your account is blocked on this node")
		}

		sessionID, _, err := auth.CreateSession(s.cfg.DB, user.ID)
		if err != nil {
			return "", nil, errNodeLinkFailed
		}
		auth.SetSessionCookie(w, r, sessionID)
		return "/dashboard", user, nil
	}

	return "", nil, errNodeLinkInvalid
}

// nodeLinkReturn builds the URL that carries an operation's acknowledgement
// back to the parent. Both values come from the verified assertion, so the
// child never stores or learns its parent beyond this one redirect.
func nodeLinkReturn(a *nodelink.Assertion) (string, error) {
	if a.Ack == "" || a.Ret == "" {
		return "", errNodeLinkInvalid
	}
	u, err := url.Parse(a.Ret)
	if err != nil || (u.Scheme != "http" && u.Scheme != "https") || u.Host == "" {
		return "", errNodeLinkInvalid
	}
	u.Fragment = ""
	return u.String() + "#ack=" + url.QueryEscape(a.Ack), nil
}
