// PodNest - Self-hosted site management platform
// Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com>
// Licensed under the MIT License. See LICENSE file in the project root for full license text.

package nodelink

import (
	"crypto/ed25519"
	"database/sql"
	"encoding/base64"

	"podnest/internal/db"
)

// ValidPublicKey reports whether s is a base64 Ed25519 public key.
func ValidPublicKey(s string) bool {
	b, err := base64.StdEncoding.DecodeString(s)
	return err == nil && len(b) == ed25519.PublicKeySize
}

// DropParent removes this node's parent link and every user synced from it.
// Users go first and all-or-nothing, so a failure leaves the link in place
// rather than a parent link whose users have already been stripped.
func DropParent(database *sql.DB) error {
	if err := db.RemoveAllNodeUsers(database); err != nil {
		return err
	}
	return db.DeleteNodeParent(database)
}
