// PodNest - Self-hosted site management platform
// Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com>
// Licensed under the MIT License. See LICENSE file in the project root for full license text.

package dbtools

import (
	"fmt"
	"net/http"
	"time"

	"podnest/internal/apiutil"
	"podnest/internal/auth"
	"podnest/internal/logger"
	"podnest/internal/models"
)

// apiDumpDB streams a gzip-compressed dump of the site's database as a download.
func (m Module) apiDumpDB(w http.ResponseWriter, r *http.Request, site *models.Site) {
	if !m.AppliesTo(site.SiteType) {
		apiutil.ErrorMsg(w, http.StatusBadRequest, "this site type has no database")
		return
	}
	filename := fmt.Sprintf("%s-%s.sql.gz", site.Name, time.Now().UTC().Format("2006-01-02-150405"))
	logger.Debug("apiDumpDB: streaming database for site %s as %s", site.Name, filename)
	dw := &downloadWriter{w: w, filename: filename, token: downloadToken(r.URL.Query().Get("dl")), secure: auth.IsSecure(r)}
	if err := m.Manager.DumpDB(r.Context(), site, dw); err != nil {
		logger.Error("apiDumpDB: site %d: %v", site.ID, err)
		if !dw.ready {
			apiutil.Error(w, http.StatusInternalServerError, err)
		}
	}
}

// downloadWriter holds back the attachment response headers until the first
// write, so a dump that fails before producing output can still return a JSON
// error instead of a zero-length 200 with a Content-Disposition attached.
type downloadWriter struct {
	w        http.ResponseWriter
	filename string
	token    string
	secure   bool
	ready    bool
}

// Write emits the download response headers on first use.
func (d *downloadWriter) Write(p []byte) (int, error) {
	if !d.ready {
		d.ready = true
		h := d.w.Header()

		// the browser cannot signal the client when a download starts, so drop a
		// readable cookie here — the UI polls for it to dismiss its progress modal
		if d.token != "" {
			http.SetCookie(d.w, &http.Cookie{
				Name:     "kp_dl_" + d.token,
				Value:    "1",
				Path:     "/",
				Secure:   d.secure,
				SameSite: http.SameSiteStrictMode,
				MaxAge:   600,
			})
		}

		h.Set("Content-Type", "application/gzip")
		h.Set("Content-Disposition", "attachment; filename=\""+d.filename+"\"")
		h.Set("Cache-Control", "no-store")
		h.Set("X-Accel-Buffering", "no")
		d.w.WriteHeader(http.StatusOK)
	}
	return d.w.Write(p)
}

// downloadToken sanitises the client-supplied download correlation token,
// keeping only short alphanumeric values safe to echo back in a cookie name
func downloadToken(s string) string {
	if len(s) == 0 || len(s) > 32 {
		return ""
	}
	for _, r := range s {
		if (r < '0' || r > '9') && (r < 'a' || r > 'z') && (r < 'A' || r > 'Z') {
			return ""
		}
	}
	return s
}
