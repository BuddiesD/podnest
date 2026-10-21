// PodNest - Self-hosted site management platform
// Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com>
// Licensed under the MIT License. See LICENSE file in the project root for full license text.

package nodes

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"

	"podnest/internal/apiutil"
	"podnest/internal/auth"
	"podnest/internal/db"
	"podnest/internal/logger"
	"podnest/internal/models"
	"podnest/internal/nodelink"
)

// Handler handles node link management API routes.
type Handler struct {
	DB *sql.DB
}

// nodeNameMax bounds a node's display name.
const nodeNameMax = 100

// nodeView is the API shape of a child node — never carries the private key.
type nodeView struct {
	ID      int64  `json:"id"`
	Name    string `json:"name"`
	URL     string `json:"url"`
	Status  int    `json:"status"`
	Created string `json:"created"`
}

// RegisterRoutes mounts node link management routes onto api.
func (h *Handler) RegisterRoutes(api *http.ServeMux) {
	api.Handle("POST /nodes/pair-code", auth.RequireAPIAdmin(http.HandlerFunc(h.apiPairCode)))
	api.Handle("GET /nodes", auth.RequireAPIAdmin(http.HandlerFunc(h.apiListNodes)))
	api.Handle("POST /nodes", auth.RequireAPIAdmin(http.HandlerFunc(h.apiAddNode)))
	api.Handle("POST /nodes/ack", auth.RequireAPIAdmin(http.HandlerFunc(h.apiAckNode)))
	api.Handle("PUT /nodes/{id}", auth.RequireAPIAdmin(http.HandlerFunc(h.apiUpdateNode)))
	api.Handle("DELETE /nodes/{id}", auth.RequireAPIAdmin(http.HandlerFunc(h.apiRemoveNode)))
	api.Handle("POST /nodes/{id}/sso", auth.RequireAPIAdmin(http.HandlerFunc(h.apiNodeSSO)))
}

// apiPairCode issues a single-use pairing code bound to the origin the admin
// is using, so the parent must pair against exactly that URL.
func (h *Handler) apiPairCode(w http.ResponseWriter, r *http.Request) {
	parent, err := db.GetNodeParent(h.DB)
	if err != nil {
		apiutil.Error(w, http.StatusInternalServerError, err)
		return
	}
	if parent != nil {
		apiutil.ErrorMsg(w, http.StatusConflict, "this node already has a parent")
		return
	}

	code, err := nodelink.GeneratePairCode()
	if err != nil {
		logger.Error("apiPairCode: failed to generate code: %v", err)
		apiutil.Error(w, http.StatusInternalServerError, err)
		return
	}

	origin := nodelink.RequestOrigin(r)
	if err := db.CreateNodePairCode(h.DB, nodelink.NormalizePairCode(code), origin, nodelink.PairCodeTTL); err != nil {
		apiutil.Error(w, http.StatusInternalServerError, err)
		return
	}

	logger.Debug("issued node pairing code for %s", origin)
	apiutil.JSON(w, http.StatusOK, map[string]any{
		"code":       code,
		"url":        origin,
		"expires_in": int(nodelink.PairCodeTTL.Seconds()),
	})
}

func (h *Handler) apiListNodes(w http.ResponseWriter, r *http.Request) {
	nodes, err := db.GetAllNodes(h.DB)
	if err != nil {
		apiutil.Error(w, http.StatusInternalServerError, err)
		return
	}
	out := make([]nodeView, 0, len(nodes))
	for _, n := range nodes {
		out = append(out, nodeView{
			ID:      n.ID,
			Name:    n.Name,
			URL:     n.URL,
			Status:  n.Status,
			Created: n.Created.Format("2006-01-02 15:04:05"),
		})
	}
	apiutil.JSON(w, http.StatusOK, out)
}

// apiAddNode records a pending child with a fresh link keypair and returns the
// link that carries the pairing assertion to it. The child stays pending until
// its acknowledgement comes back through /node/ack.
func (h *Handler) apiAddNode(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Name string `json:"name"`
		URL  string `json:"url"`
		Code string `json:"code"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		apiutil.Error(w, http.StatusBadRequest, err)
		return
	}

	req.Name = strings.TrimSpace(req.Name)
	if req.Name == "" || len(req.Name) > nodeNameMax {
		apiutil.ErrorMsg(w, http.StatusBadRequest, "name is required (max 100 characters)")
		return
	}
	origin, err := nodelink.NormalizeOrigin(req.URL)
	if err != nil {
		apiutil.ErrorMsg(w, http.StatusBadRequest, err.Error())
		return
	}
	if origin == nodelink.RequestOrigin(r) {
		apiutil.ErrorMsg(w, http.StatusBadRequest, "a node cannot be added as its own child")
		return
	}
	code := nodelink.NormalizePairCode(req.Code)
	if code == "" {
		apiutil.ErrorMsg(w, http.StatusBadRequest, "pairing code is required")
		return
	}

	priv, pub, err := nodelink.GenerateKey()
	if err != nil {
		logger.Error("apiAddNode: failed to generate link key: %v", err)
		apiutil.Error(w, http.StatusInternalServerError, err)
		return
	}
	linkID, err := models.GenerateSessionID()
	if err != nil {
		apiutil.Error(w, http.StatusInternalServerError, err)
		return
	}

	n := &models.Node{Name: req.Name, URL: origin, LinkID: linkID, PrivKey: priv, Status: models.NodeStatusPending}
	if err := db.CreateNode(h.DB, n); err != nil {
		apiutil.Error(w, http.StatusInternalServerError, err)
		return
	}

	link, err := h.signOp(r, n, &models.NodeOp{NodeID: n.ID, Op: models.NodeOpPair}, nodelink.OpPair, origin, priv, func(a *nodelink.Assertion) {
		a.Code = code
		a.PubKey = pub
	})
	if err != nil {
		_ = db.DeleteNode(h.DB, n.ID)
		apiutil.Error(w, http.StatusInternalServerError, err)
		return
	}

	logger.Debug("node %d (%s) pending pairing at %s", n.ID, n.Name, origin)
	apiutil.JSON(w, http.StatusCreated, map[string]any{"id": n.ID, "link": link})
}

// apiUpdateNode renames a child locally, and for a URL change or re-key signs
// an update with the current key. The new URL and key are committed only once
// the child acknowledges, so a failed hop leaves the working link untouched.
func (h *Handler) apiUpdateNode(w http.ResponseWriter, r *http.Request) {
	n, ok := h.resolveNode(w, r)
	if !ok {
		return
	}

	var req struct {
		Name  string `json:"name"`
		URL   string `json:"url"`
		Rekey bool   `json:"rekey"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		apiutil.Error(w, http.StatusBadRequest, err)
		return
	}

	if name := strings.TrimSpace(req.Name); name != "" && name != n.Name {
		if len(name) > nodeNameMax {
			apiutil.ErrorMsg(w, http.StatusBadRequest, "name max 100 characters")
			return
		}
		n.Name = name
		if err := db.UpdateNode(h.DB, n); err != nil {
			apiutil.Error(w, http.StatusInternalServerError, err)
			return
		}
	}

	newURL := ""
	if strings.TrimSpace(req.URL) != "" {
		origin, err := nodelink.NormalizeOrigin(req.URL)
		if err != nil {
			apiutil.ErrorMsg(w, http.StatusBadRequest, err.Error())
			return
		}
		if origin != n.URL {
			newURL = origin
		}
	}

	if newURL == "" && !req.Rekey {
		apiutil.JSON(w, http.StatusOK, map[string]any{"id": n.ID})
		return
	}
	if n.Status != models.NodeStatusPaired {
		apiutil.ErrorMsg(w, http.StatusConflict, "node is not paired")
		return
	}

	op := &models.NodeOp{NodeID: n.ID, Op: models.NodeOpUpdate, NewURL: newURL}
	newPub := ""
	if req.Rekey {
		priv, pub, err := nodelink.GenerateKey()
		if err != nil {
			apiutil.Error(w, http.StatusInternalServerError, err)
			return
		}
		op.NewKey = priv
		newPub = pub
	}

	aud := n.URL
	if newURL != "" {
		aud = newURL
	}
	link, err := h.signOp(r, n, op, nodelink.OpUpdate, aud, n.PrivKey, func(a *nodelink.Assertion) {
		a.PubKey = newPub
	})
	if err != nil {
		apiutil.Error(w, http.StatusInternalServerError, err)
		return
	}
	apiutil.JSON(w, http.StatusOK, map[string]any{"id": n.ID, "link": link})
}

// apiRemoveNode removes a pending child at once, and for a paired child signs
// an unpair so the child drops this parent and its synced users. force=1
// removes the link here without the child — for a child that is gone.
func (h *Handler) apiRemoveNode(w http.ResponseWriter, r *http.Request) {
	n, ok := h.resolveNode(w, r)
	if !ok {
		return
	}

	if n.Status != models.NodeStatusPaired || r.URL.Query().Get("force") == "1" {
		if err := db.DeleteNode(h.DB, n.ID); err != nil {
			apiutil.Error(w, http.StatusInternalServerError, err)
			return
		}
		logger.Debug("node %d (%s) removed locally", n.ID, n.Name)
		w.WriteHeader(http.StatusNoContent)
		return
	}

	link, err := h.signOp(r, n, &models.NodeOp{NodeID: n.ID, Op: models.NodeOpUnpair}, nodelink.OpUnpair, n.URL, n.PrivKey, nil)
	if err != nil {
		apiutil.Error(w, http.StatusInternalServerError, err)
		return
	}
	apiutil.JSON(w, http.StatusOK, map[string]any{"id": n.ID, "link": link})
}

// apiNodeSSO signs an SSO hop into a paired child for the calling admin,
// carrying this node's current admin list for the child to sync against.
func (h *Handler) apiNodeSSO(w http.ResponseWriter, r *http.Request) {
	n, ok := h.resolveNode(w, r)
	if !ok {
		return
	}
	if n.Status != models.NodeStatusPaired {
		apiutil.ErrorMsg(w, http.StatusConflict, "node is not paired")
		return
	}
	caller := auth.UserFromContext(r.Context())

	admins, err := db.GetNodeAdmins(h.DB)
	if err != nil {
		apiutil.Error(w, http.StatusInternalServerError, err)
		return
	}

	a, err := nodelink.NewAssertion(nodelink.OpSSO, n.LinkID, n.URL)
	if err != nil {
		apiutil.Error(w, http.StatusInternalServerError, err)
		return
	}
	a.Sub = caller.ID
	a.Users = admins

	token, err := nodelink.Sign(n.PrivKey, a)
	if err != nil {
		logger.Error("apiNodeSSO: failed to sign for node %d: %v", n.ID, err)
		apiutil.Error(w, http.StatusInternalServerError, err)
		return
	}

	logger.Debug("user %d SSO hop to node %d (%s)", caller.ID, n.ID, n.Name)
	apiutil.JSON(w, http.StatusOK, map[string]any{"link": n.URL + "/node/link#t=" + token})
}

// apiAckNode commits the pending operation whose acknowledgement secret the
// child handed back. The secret only ever left this node inside a signed
// assertion, so holding it proves the child applied the change.
func (h *Handler) apiAckNode(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Ack string `json:"ack"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || req.Ack == "" {
		apiutil.ErrorMsg(w, http.StatusBadRequest, "ack is required")
		return
	}

	op, err := db.ConsumeNodeOp(h.DB, req.Ack)
	if err != nil {
		apiutil.Error(w, http.StatusInternalServerError, err)
		return
	}
	if op == nil {
		apiutil.ErrorMsg(w, http.StatusNotFound, "no matching pending node operation — it may have expired")
		return
	}

	n, err := db.GetNodeByID(h.DB, op.NodeID)
	if err != nil || n == nil {
		apiutil.ErrorMsg(w, http.StatusNotFound, "node not found")
		return
	}

	switch op.Op {
	case models.NodeOpPair:
		n.Status = models.NodeStatusPaired
		if err := db.UpdateNode(h.DB, n); err != nil {
			apiutil.Error(w, http.StatusInternalServerError, err)
			return
		}
	case models.NodeOpUpdate:
		if op.NewURL != "" {
			n.URL = op.NewURL
		}
		if op.NewKey != "" {
			n.PrivKey = op.NewKey
		}
		if err := db.UpdateNode(h.DB, n); err != nil {
			apiutil.Error(w, http.StatusInternalServerError, err)
			return
		}
	case models.NodeOpUnpair:
		if err := db.DeleteNode(h.DB, n.ID); err != nil {
			apiutil.Error(w, http.StatusInternalServerError, err)
			return
		}
	}

	logger.Debug("node %d (%s) acknowledged op %d", n.ID, n.Name, op.Op)
	apiutil.JSON(w, http.StatusOK, map[string]any{"id": n.ID, "name": n.Name, "op": op.Op})
}

// signOp records a pending operation with a fresh acknowledgement secret and
// returns the link carrying its signed assertion to the child at aud.
func (h *Handler) signOp(r *http.Request, n *models.Node, op *models.NodeOp, kind, aud, privKey string, fill func(*nodelink.Assertion)) (string, error) {
	ack, err := models.GenerateSessionID()
	if err != nil {
		return "", err
	}

	a, err := nodelink.NewAssertion(kind, n.LinkID, aud)
	if err != nil {
		return "", err
	}
	a.Ack = ack
	a.Ret = nodelink.RequestOrigin(r) + "/node/ack"
	if fill != nil {
		fill(a)
	}

	token, err := nodelink.Sign(privKey, a)
	if err != nil {
		logger.Error("signOp: failed to sign %s for node %d: %v", kind, n.ID, err)
		return "", err
	}

	op.ExpiresAt = time.Now().UTC().Add(nodelink.OpTTL)
	if err := db.CreateNodeOp(h.DB, op, ack); err != nil {
		return "", err
	}
	return aud + "/node/link#t=" + token, nil
}

// resolveNode loads the node named by the {id} path value.
func (h *Handler) resolveNode(w http.ResponseWriter, r *http.Request) (*models.Node, bool) {
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 64)
	if err != nil {
		apiutil.ErrorMsg(w, http.StatusBadRequest, "invalid node id")
		return nil, false
	}
	n, err := db.GetNodeByID(h.DB, id)
	if err != nil {
		apiutil.Error(w, http.StatusInternalServerError, err)
		return nil, false
	}
	if n == nil {
		apiutil.ErrorMsg(w, http.StatusNotFound, "node not found")
		return nil, false
	}
	return n, true
}
