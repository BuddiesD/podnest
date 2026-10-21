// PodNest - Self-hosted site management platform
// Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com>
// Licensed under the MIT License. See LICENSE file in the project root for full license text.

package db

import (
	"database/sql"
	"errors"
	"fmt"
	"regexp"
	"strings"
	"time"

	"podnest/internal/logger"
	"podnest/internal/models"
)

// ErrNoLocalAdmin is returned when a synced user owns sites that must be
// reassigned but no local admin exists to receive them.
var ErrNoLocalAdmin = errors.New("no local admin to reassign sites to")

// nodeUnameMaxSuffix bounds the clash search for a synced username.
const nodeUnameMaxSuffix = 1000

var nodeUnameStrip = regexp.MustCompile(`[^a-z0-9]`)

// nodeUnameBase builds a synced user's base username: first initial plus last
// name, lowercased and stripped to [a-z0-9].
func nodeUnameBase(fname, lname string) string {
	f := nodeUnameStrip.ReplaceAllString(strings.ToLower(fname), "")
	l := nodeUnameStrip.ReplaceAllString(strings.ToLower(lname), "")
	base := l
	if f != "" {
		base = f[:1] + l
	}
	if base == "" {
		base = "user"
	}
	return base
}

// nodeUname returns the first free username for base, suffixing 2, 3, ... on a
// clash. The row selfID is ignored so a user can keep the name it already holds.
func nodeUname(tx *sql.Tx, base string, selfID int64) (string, error) {
	for i := 1; i <= nodeUnameMaxSuffix; i++ {
		name := base
		if i > 1 {
			name = fmt.Sprintf("%s%d", base, i)
		}
		var id int64
		err := tx.QueryRow(`SELECT id FROM kppn_users WHERE uname = ?`, name).Scan(&id)
		if err == sql.ErrNoRows || (err == nil && id == selfID) {
			return name, nil
		}
		if err != nil {
			return "", err
		}
	}
	return "", fmt.Errorf("no free username for '%s'", base)
}

// nodeReassignTarget returns the oldest local admin's ID, or 0 when there is none.
func nodeReassignTarget(tx *sql.Tx) (int64, error) {
	var id int64
	err := tx.QueryRow(`
		SELECT id FROM kppn_users WHERE node_uid = 0 AND role = ? ORDER BY id ASC LIMIT 1`,
		models.RoleAdmin,
	).Scan(&id)
	if err == sql.ErrNoRows {
		return 0, nil
	}
	return id, err
}

// removeNodeUser deletes a synced user, first handing any sites they own to
// target. Sites reference users ON DELETE RESTRICT, so without a target a user
// who owns sites cannot be removed and ErrNoLocalAdmin is returned.
func removeNodeUser(tx *sql.Tx, id, target int64) error {
	var owned int
	if err := tx.QueryRow(`SELECT COUNT(*) FROM kppn_sites WHERE uid = ?`, id).Scan(&owned); err != nil {
		return err
	}
	if owned > 0 {
		if target == 0 {
			return ErrNoLocalAdmin
		}
		if _, err := tx.Exec(`UPDATE kppn_sites SET uid = ?, updated = ? WHERE uid = ?`, target, time.Now().UTC(), id); err != nil {
			return err
		}
	}
	_, err := tx.Exec(`DELETE FROM kppn_users WHERE id = ? AND node_uid > 0`, id)
	return err
}

// SyncNodeUsers makes the synced users match the parent's admin list carried
// on an SSO hop: missing users are created, existing ones overwritten (or
// re-created if deleted locally), and users no longer on the parent removed.
// The blocked flag is the one local setting a sync never touches. A removal
// that would orphan sites with no local admin to take them is skipped.
func SyncNodeUsers(database *sql.DB, users []models.NodeUser) error {
	tx, err := database.Begin()
	if err != nil {
		logger.Error("SyncNodeUsers: failed to begin transaction: %v", err)
		return err
	}
	defer tx.Rollback()

	now := time.Now().UTC()
	keep := make(map[int64]bool, len(users))
	for _, nu := range users {
		if nu.NodeUID <= 0 {
			continue
		}
		keep[nu.NodeUID] = true

		var id int64
		err := tx.QueryRow(`SELECT id FROM kppn_users WHERE node_uid = ?`, nu.NodeUID).Scan(&id)
		if err != nil && err != sql.ErrNoRows {
			logger.Error("SyncNodeUsers: failed to look up node user %d: %v", nu.NodeUID, err)
			return err
		}

		uname, err := nodeUname(tx, nodeUnameBase(nu.FName, nu.LName), id)
		if err != nil {
			logger.Error("SyncNodeUsers: failed to pick username for node user %d: %v", nu.NodeUID, err)
			return err
		}

		if id > 0 {
			if _, err := tx.Exec(`
				UPDATE kppn_users SET uname = ?, fname = ?, lname = ?, email = ?, phone = ?, role = ?, updated = ?
				WHERE id = ?`,
				uname, nu.FName, nu.LName, nu.Email, nu.Phone, models.RoleAdmin, now, id,
			); err != nil {
				logger.Error("SyncNodeUsers: failed to update node user %d: %v", nu.NodeUID, err)
				return err
			}
			continue
		}

		uhash, err := models.GenerateUHash()
		if err != nil {
			logger.Error("SyncNodeUsers: failed to generate user hash: %v", err)
			return err
		}

		// "!" is never a valid bcrypt hash, so a synced user has no usable password
		if _, err := tx.Exec(`
			INSERT INTO kppn_users (uname, pword, uhash, fname, lname, email, phone, role, node_uid)
			VALUES (?, '!', ?, ?, ?, ?, ?, ?, ?)`,
			uname, uhash, nu.FName, nu.LName, nu.Email, nu.Phone, models.RoleAdmin, nu.NodeUID,
		); err != nil {
			logger.Error("SyncNodeUsers: failed to create node user %d: %v", nu.NodeUID, err)
			return err
		}
	}

	rows, err := tx.Query(`SELECT id, node_uid FROM kppn_users WHERE node_uid > 0`)
	if err != nil {
		logger.Error("SyncNodeUsers: failed to list node users: %v", err)
		return err
	}
	var stale []int64
	for rows.Next() {
		var id, nuid int64
		if err := rows.Scan(&id, &nuid); err != nil {
			rows.Close()
			logger.Error("SyncNodeUsers: failed to scan node user: %v", err)
			return err
		}
		if !keep[nuid] {
			stale = append(stale, id)
		}
	}
	rows.Close()
	if err := rows.Err(); err != nil {
		return err
	}

	if len(stale) > 0 {
		target, err := nodeReassignTarget(tx)
		if err != nil {
			logger.Error("SyncNodeUsers: failed to find reassign target: %v", err)
			return err
		}
		for _, id := range stale {
			if err := removeNodeUser(tx, id, target); err != nil {
				if errors.Is(err, ErrNoLocalAdmin) {
					logger.Warn("SyncNodeUsers: kept node user %d: %v", id, err)
					continue
				}
				logger.Error("SyncNodeUsers: failed to remove node user %d: %v", id, err)
				return err
			}
		}
	}

	return tx.Commit()
}

// RemoveAllNodeUsers deletes every synced user when the parent link is
// dropped. All-or-nothing: if any of them owns sites and no local admin exists
// to take them, nothing is removed and ErrNoLocalAdmin is returned.
func RemoveAllNodeUsers(database *sql.DB) error {
	tx, err := database.Begin()
	if err != nil {
		logger.Error("RemoveAllNodeUsers: failed to begin transaction: %v", err)
		return err
	}
	defer tx.Rollback()

	target, err := nodeReassignTarget(tx)
	if err != nil {
		logger.Error("RemoveAllNodeUsers: failed to find reassign target: %v", err)
		return err
	}

	rows, err := tx.Query(`SELECT id FROM kppn_users WHERE node_uid > 0`)
	if err != nil {
		logger.Error("RemoveAllNodeUsers: failed to list node users: %v", err)
		return err
	}
	var ids []int64
	for rows.Next() {
		var id int64
		if err := rows.Scan(&id); err != nil {
			rows.Close()
			return err
		}
		ids = append(ids, id)
	}
	rows.Close()
	if err := rows.Err(); err != nil {
		return err
	}

	for _, id := range ids {
		if err := removeNodeUser(tx, id, target); err != nil {
			logger.Error("RemoveAllNodeUsers: failed to remove node user %d: %v", id, err)
			return err
		}
	}
	return tx.Commit()
}

// SetNodeUserBlocked sets the blocked flag on a synced user. Blocking also
// ends the user's live sessions so it takes effect immediately.
func SetNodeUserBlocked(database *sql.DB, id int64, blocked bool) error {
	tx, err := database.Begin()
	if err != nil {
		logger.Error("SetNodeUserBlocked: failed to begin transaction: %v", err)
		return err
	}
	defer tx.Rollback()

	res, err := tx.Exec(`
		UPDATE kppn_users SET blocked = ?, updated = ? WHERE id = ? AND node_uid > 0`,
		blocked, time.Now().UTC(), id,
	)
	if err != nil {
		logger.Error("SetNodeUserBlocked: failed to update user %d: %v", id, err)
		return err
	}
	if n, _ := res.RowsAffected(); n != 1 {
		return sql.ErrNoRows
	}

	if blocked {
		if _, err := tx.Exec(`DELETE FROM kppn_sessions WHERE uid = ?`, id); err != nil {
			logger.Error("SetNodeUserBlocked: failed to end sessions for user %d: %v", id, err)
			return err
		}
	}
	return tx.Commit()
}

// GetUserByNodeUID retrieves the synced user carrying the parent's user ID. Returns nil when missing.
func GetUserByNodeUID(db *sql.DB, nodeUID int64) (*models.User, error) {
	u := &models.User{}
	err := db.QueryRow(`
		SELECT id, uname, pword, uhash, fname, lname, email, phone, role, totp_secret, totp_salt, totp_enabled, notify_email, notify_sms, node_uid, blocked, created, updated
		FROM kppn_users WHERE node_uid = ? AND node_uid > 0`, nodeUID,
	).Scan(
		&u.ID, &u.UName, &u.PWord, &u.UHash, &u.FName, &u.LName,
		&u.Email, &u.Phone, &u.Role, &u.TOTPSecret, &u.TOTPSalt, &u.TOTPEnabled,
		&u.NotifyEmail, &u.NotifySMS, &u.NodeUID, &u.Blocked, &u.Created, &u.Updated,
	)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		logger.Error("GetUserByNodeUID: failed to retrieve node user %d: %v", nodeUID, err)
		return nil, err
	}
	return u, nil
}

// GetNodeAdmins returns this node's unblocked admins — local and synced alike —
// as the list carried down to a child on an SSO hop. The child keys them by
// this node's user ID.
func GetNodeAdmins(db *sql.DB) ([]models.NodeUser, error) {
	rows, err := db.Query(`
		SELECT id, fname, lname, email, phone FROM kppn_users
		WHERE role = ? AND blocked = 0 ORDER BY id ASC`, models.RoleAdmin,
	)
	if err != nil {
		logger.Error("GetNodeAdmins: failed to list admins: %v", err)
		return nil, err
	}
	defer rows.Close()

	var out []models.NodeUser
	for rows.Next() {
		var nu models.NodeUser
		if err := rows.Scan(&nu.NodeUID, &nu.FName, &nu.LName, &nu.Email, &nu.Phone); err != nil {
			logger.Error("GetNodeAdmins: failed to scan admin: %v", err)
			return nil, err
		}
		out = append(out, nu)
	}
	return out, rows.Err()
}
