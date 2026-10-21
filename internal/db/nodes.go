// PodNest - Self-hosted site management platform
// Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com>
// Licensed under the MIT License. See LICENSE file in the project root for full license text.

package db

import (
	"database/sql"
	"time"

	"podnest/internal/logger"
	"podnest/internal/models"
)

// CreateNode inserts a child node link.
func CreateNode(db *sql.DB, n *models.Node) error {
	res, err := db.Exec(`
		INSERT INTO kppn_nodes (name, url, link_id, priv_key, status)
		VALUES (?, ?, ?, ?, ?)`,
		n.Name, n.URL, n.LinkID, n.PrivKey, n.Status,
	)
	if err != nil {
		logger.Error("CreateNode: failed to create node '%s': %v", n.Name, err)
		return err
	}
	n.ID, _ = res.LastInsertId()
	logger.Debug("Created node %d: %s", n.ID, n.Name)
	return nil
}

// GetAllNodes returns every child node link ordered by name.
func GetAllNodes(db *sql.DB) ([]*models.Node, error) {
	rows, err := db.Query(`
		SELECT id, name, url, link_id, priv_key, status, created, updated
		FROM kppn_nodes ORDER BY name ASC`,
	)
	if err != nil {
		logger.Error("GetAllNodes: failed to retrieve nodes: %v", err)
		return nil, err
	}
	defer rows.Close()

	var nodes []*models.Node
	for rows.Next() {
		n := &models.Node{}
		if err := rows.Scan(&n.ID, &n.Name, &n.URL, &n.LinkID, &n.PrivKey, &n.Status, &n.Created, &n.Updated); err != nil {
			logger.Error("GetAllNodes: failed to scan node row: %v", err)
			return nil, err
		}
		nodes = append(nodes, n)
	}
	return nodes, rows.Err()
}

// GetNodeByID retrieves a child node link by primary key. Returns nil when missing.
func GetNodeByID(db *sql.DB, id int64) (*models.Node, error) {
	n := &models.Node{}
	err := db.QueryRow(`
		SELECT id, name, url, link_id, priv_key, status, created, updated
		FROM kppn_nodes WHERE id = ?`, id,
	).Scan(&n.ID, &n.Name, &n.URL, &n.LinkID, &n.PrivKey, &n.Status, &n.Created, &n.Updated)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		logger.Error("GetNodeByID: failed to retrieve node %d: %v", id, err)
		return nil, err
	}
	return n, nil
}

// UpdateNode updates a child node link's mutable fields.
func UpdateNode(db *sql.DB, n *models.Node) error {
	_, err := db.Exec(`
		UPDATE kppn_nodes SET name = ?, url = ?, priv_key = ?, status = ?, updated = ?
		WHERE id = ?`,
		n.Name, n.URL, n.PrivKey, n.Status, time.Now().UTC(), n.ID,
	)
	if err != nil {
		logger.Error("UpdateNode: failed to update node %d: %v", n.ID, err)
	}
	return err
}

// DeleteNode removes a child node link and any pending operations on it.
func DeleteNode(db *sql.DB, id int64) error {
	_, err := db.Exec(`DELETE FROM kppn_nodes WHERE id = ?`, id)
	if err != nil {
		logger.Error("DeleteNode: failed to delete node %d: %v", id, err)
	}
	return err
}

// NodeLinkExists reports whether linkID belongs to one of this instance's own child links.
func NodeLinkExists(db *sql.DB, linkID string) (bool, error) {
	var n int
	if err := db.QueryRow(`SELECT COUNT(*) FROM kppn_nodes WHERE link_id = ?`, linkID).Scan(&n); err != nil {
		logger.Error("NodeLinkExists: failed to check link %s: %v", linkID, err)
		return false, err
	}
	return n > 0, nil
}

// CreateNodeOp records a pending operation on a child link, replacing any
// operation already pending on it. Only the hash of the acknowledgement secret
// is stored — the raw value travels to the child and back through the browser,
// and possession of it is what proves the child applied the change.
func CreateNodeOp(db *sql.DB, o *models.NodeOp, ack string) error {
	tx, err := db.Begin()
	if err != nil {
		logger.Error("CreateNodeOp: failed to begin transaction: %v", err)
		return err
	}
	defer tx.Rollback()

	if _, err := tx.Exec(`DELETE FROM kppn_node_ops WHERE node_id = ?`, o.NodeID); err != nil {
		logger.Error("CreateNodeOp: failed to clear pending ops for node %d: %v", o.NodeID, err)
		return err
	}

	res, err := tx.Exec(`
		INSERT INTO kppn_node_ops (node_id, op, ack_hash, new_url, new_key, expires_at)
		VALUES (?, ?, ?, ?, ?, ?)`,
		o.NodeID, o.Op, hashToken(ack), o.NewURL, o.NewKey, o.ExpiresAt.UTC(),
	)
	if err != nil {
		logger.Error("CreateNodeOp: failed to create op for node %d: %v", o.NodeID, err)
		return err
	}
	o.ID, _ = res.LastInsertId()
	return tx.Commit()
}

// ConsumeNodeOp returns and deletes the unexpired pending operation matching
// the acknowledgement secret, so an acknowledgement can be applied only once.
// Returns nil when no operation matches.
func ConsumeNodeOp(db *sql.DB, ack string) (*models.NodeOp, error) {
	tx, err := db.Begin()
	if err != nil {
		logger.Error("ConsumeNodeOp: failed to begin transaction: %v", err)
		return nil, err
	}
	defer tx.Rollback()

	o := &models.NodeOp{}
	err = tx.QueryRow(`
		SELECT id, node_id, op, new_url, new_key, expires_at
		FROM kppn_node_ops WHERE ack_hash = ? AND expires_at > datetime('now')`, hashToken(ack),
	).Scan(&o.ID, &o.NodeID, &o.Op, &o.NewURL, &o.NewKey, &o.ExpiresAt)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		logger.Error("ConsumeNodeOp: failed to retrieve op: %v", err)
		return nil, err
	}

	if _, err := tx.Exec(`DELETE FROM kppn_node_ops WHERE id = ?`, o.ID); err != nil {
		logger.Error("ConsumeNodeOp: failed to delete op %d: %v", o.ID, err)
		return nil, err
	}
	return o, tx.Commit()
}

// GetNodeParent returns this instance's parent link. Returns nil when unparented.
func GetNodeParent(db *sql.DB) (*models.NodeParent, error) {
	p := &models.NodeParent{}
	err := db.QueryRow(`
		SELECT link_id, parent_pub, created, updated
		FROM kppn_node_parent WHERE id = 1`,
	).Scan(&p.LinkID, &p.ParentPub, &p.Created, &p.Updated)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		logger.Error("GetNodeParent: failed to retrieve parent link: %v", err)
		return nil, err
	}
	return p, nil
}

// CreateNodeParent stores this instance's parent link. A plain insert against
// the single-row table, so pairing fails when a parent link already exists.
func CreateNodeParent(db *sql.DB, linkID, parentPub string) error {
	_, err := db.Exec(`
		INSERT INTO kppn_node_parent (id, link_id, parent_pub) VALUES (1, ?, ?)`,
		linkID, parentPub,
	)
	if err != nil {
		logger.Error("CreateNodeParent: failed to store parent link: %v", err)
	}
	return err
}

// UpdateNodeParentKey replaces the parent link's public key after a re-key.
func UpdateNodeParentKey(db *sql.DB, parentPub string) error {
	_, err := db.Exec(`
		UPDATE kppn_node_parent SET parent_pub = ?, updated = ? WHERE id = 1`,
		parentPub, time.Now().UTC(),
	)
	if err != nil {
		logger.Error("UpdateNodeParentKey: failed to update parent key: %v", err)
	}
	return err
}

// DeleteNodeParent removes this instance's parent link.
func DeleteNodeParent(db *sql.DB) error {
	_, err := db.Exec(`DELETE FROM kppn_node_parent WHERE id = 1`)
	if err != nil {
		logger.Error("DeleteNodeParent: failed to remove parent link: %v", err)
	}
	return err
}

// CreateNodePairCode stores a pairing code bound to the origin it was issued
// on, replacing any code already outstanding so only one is ever live.
func CreateNodePairCode(db *sql.DB, code, origin string, ttl time.Duration) error {
	tx, err := db.Begin()
	if err != nil {
		logger.Error("CreateNodePairCode: failed to begin transaction: %v", err)
		return err
	}
	defer tx.Rollback()

	if _, err := tx.Exec(`DELETE FROM kppn_node_pair_codes`); err != nil {
		logger.Error("CreateNodePairCode: failed to clear outstanding codes: %v", err)
		return err
	}

	if _, err := tx.Exec(`
		INSERT INTO kppn_node_pair_codes (code_hash, origin, expires_at) VALUES (?, ?, ?)`,
		hashToken(code), origin, time.Now().UTC().Add(ttl),
	); err != nil {
		logger.Error("CreateNodePairCode: failed to store code: %v", err)
		return err
	}
	return tx.Commit()
}

// ConsumeNodePairCode deletes the unexpired pairing code matching code and
// origin, reporting whether one existed. The match and the delete are a single
// statement so a code cannot be redeemed twice.
func ConsumeNodePairCode(db *sql.DB, code, origin string) (bool, error) {
	res, err := db.Exec(`
		DELETE FROM kppn_node_pair_codes
		WHERE code_hash = ? AND origin = ? AND expires_at > datetime('now')`,
		hashToken(code), origin,
	)
	if err != nil {
		logger.Error("ConsumeNodePairCode: failed to consume code: %v", err)
		return false, err
	}
	n, err := res.RowsAffected()
	if err != nil {
		logger.Error("ConsumeNodePairCode: failed to read result: %v", err)
		return false, err
	}
	return n == 1, nil
}

// ConsumeNodeNonce records a signed assertion's nonce, returning false when it
// has already been seen. Kept until the assertion itself expires, which is as
// long as a replay could be accepted.
func ConsumeNodeNonce(db *sql.DB, nonce string, expires time.Time) bool {
	_, err := db.Exec(`
		INSERT INTO kppn_node_nonces (nonce, expires_at) VALUES (?, ?)`,
		nonce, expires.UTC(),
	)
	if err != nil {
		logger.Debug("ConsumeNodeNonce: nonce rejected: %v", err)
		return false
	}
	return true
}

// DeleteExpiredNodeTokens purges stale pairing codes, nonces, and pending operations.
func DeleteExpiredNodeTokens(db *sql.DB) error {
	for _, stmt := range []string{
		`DELETE FROM kppn_node_pair_codes WHERE expires_at <= datetime('now')`,
		`DELETE FROM kppn_node_nonces WHERE expires_at <= datetime('now')`,
		`DELETE FROM kppn_node_ops WHERE expires_at <= datetime('now')`,
	} {
		if _, err := db.Exec(stmt); err != nil {
			logger.Error("DeleteExpiredNodeTokens: %v", err)
			return err
		}
	}
	return nil
}
