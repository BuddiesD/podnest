// PodNest - Self-hosted site management platform
// Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com>
// Licensed under the MIT License. See LICENSE file in the project root for full license text.

package nodes

import (
	"database/sql"
	"net/http"

	"podnest/internal/apiutil"
	"podnest/internal/auth"
	"podnest/internal/db"
	"podnest/internal/logger"
	"podnest/internal/nodelink"
)

// Handler handles node link management API routes.
type Handler struct {
	DB *sql.DB
}

// RegisterRoutes mounts node link management routes onto api.
func (h *Handler) RegisterRoutes(api *http.ServeMux) {
	api.Handle("POST /nodes/pair-code", auth.RequireAPIAdmin(http.HandlerFunc(h.apiPairCode)))
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
