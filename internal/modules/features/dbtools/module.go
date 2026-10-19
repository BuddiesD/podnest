// PodNest - Self-hosted site management platform
// Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com>
// Licensed under the MIT License. See LICENSE file in the project root for full license text.

package dbtools

import (
	"context"
	"net/http"

	"podnest/internal/backup"
	"podnest/internal/models"
	"podnest/internal/modules"
)

// Module implements modules.FeatureModule for the per-site database tools.
type Module struct {
	Manager *backup.Manager
}

// FeatureID returns the unique key for this feature.
func (m Module) FeatureID() string { return "dbtools" }

// AppliesTo reports whether the site type provisions a MariaDB container.
func (m Module) AppliesTo(siteType int) bool {
	t := modules.TypeModule(siteType)
	return t != nil && t.HasDatabase()
}

// Tabs returns site-detail tab descriptors for the database tools feature.
func (m Module) Tabs(_ *models.Site) []modules.TabDescriptor { return nil }

// RegisterRoutes mounts all database tool HTTP handlers onto the provided mux.
func (m Module) RegisterRoutes(mux *http.ServeMux, resolve modules.SiteResolver) {
	mux.HandleFunc("GET /sites/{id}/db/dump", func(w http.ResponseWriter, r *http.Request) {
		site, ok := resolve(w, r)
		if !ok {
			return
		}
		m.apiDumpDB(w, r, site)
	})
}

// OnSiteCreate is a no-op; the database tools hold no per-site state.
func (m Module) OnSiteCreate(_ context.Context, _ *models.Site) error { return nil }

// OnSiteDelete is a no-op; the database tools hold no per-site state.
func (m Module) OnSiteDelete(_ context.Context, _ *models.Site) error { return nil }
