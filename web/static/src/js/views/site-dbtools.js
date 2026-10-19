// PodNest - Self-hosted site management platform
// Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com>
// Licensed under the MIT License. See LICENSE file in the project root for full license text.

"use strict";

import { api } from '../api.js';
import { confirm, escapeHtml, hideProgressModal, showProgressModal } from '../helpers.js';
import { toast } from '../toast.js';

// renderDBToolsTab returns the static HTML shell for the database tools tab
export function renderDBToolsTab(siteId, siteType) {
    return `
        <div id="dbtools-panel" data-site-id="${siteId}">

            <!-- export card -->
            <div class="kp-card uk-padding-small uk-margin-bottom">
                <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                    <h3 class="kp-view-title">Export</h3>
                    <button class="uk-button kp-btn-primary kp-btn-sm" id="dbtools-dump-btn" uk-tooltip="Download a Database Dump">
                        <span uk-icon="download"></span>
                    </button>
                </div>
                <p class="kp-muted uk-text-small uk-margin-small-top">
                    Downloads a gzip-compressed SQL dump of the site's database, including stored routines.
                </p>
            </div>

            ${siteType === 1 ? `
            <!-- search-replace card (WordPress only) -->
            <div class="kp-card uk-padding-small uk-margin-bottom">
                <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                    <h3 class="kp-view-title">Search &amp; Replace</h3>
                    <div class="uk-flex" style="gap:6px">
                        <button class="uk-button kp-btn-secondary kp-btn-sm" id="dbtools-sr-preview" uk-tooltip="Count Matches Without Changing Anything">
                            <span uk-icon="search"></span>
                        </button>
                        <button class="uk-button kp-btn-primary kp-btn-sm" id="dbtools-sr-run" uk-tooltip="Run the Search &amp; Replace">
                            <span uk-icon="play"></span>
                        </button>
                    </div>
                </div>
                <div class="uk-grid-small uk-child-width-1-2@s" uk-grid>
                    <div>
                        <label class="uk-form-label kp-text" for="dbtools-sr-search">Search</label>
                        <input class="uk-input kp-input" id="dbtools-sr-search" type="text" maxlength="1024" autocomplete="off">
                    </div>
                    <div>
                        <label class="uk-form-label kp-text" for="dbtools-sr-replace">Replace</label>
                        <input class="uk-input kp-input" id="dbtools-sr-replace" type="text" maxlength="1024" autocomplete="off">
                    </div>
                </div>
                <p class="kp-muted uk-text-small uk-margin-small-top">
                    Runs WP-CLI's serialization-safe search-replace across every table in the site's database.
                    Preview first to see how many replacements would be made.
                </p>
                <div id="dbtools-sr-result"></div>
            </div>` : ""}

            <!-- import card -->
            <div class="kp-card uk-padding-small uk-margin-bottom">
                <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                    <h3 class="kp-view-title">Import</h3>
                    <button class="uk-button kp-btn-ghost kp-btn-sm" id="dbtools-sftp-refresh" uk-tooltip="Refresh the SFTP File List">
                        <span uk-icon="refresh"></span>
                    </button>
                </div>
                <label class="uk-flex uk-flex-middle" style="gap:8px;cursor:pointer">
                    <input type="checkbox" class="uk-checkbox" id="dbtools-wipe">
                    <span class="kp-text">Wipe the database before importing</span>
                </label>
                <p class="kp-muted uk-text-small uk-margin-small-top">
                    Without wipe, the dump is merged into the existing database — tables the dump recreates are
                    replaced, everything else is kept. The site is in maintenance mode while the import runs.
                </p>

                <hr class="uk-divider-small">

                <!-- upload section -->
                <h4 class="kp-text uk-margin-small-bottom">Upload Dump</h4>
                <p class="kp-muted uk-text-small uk-margin-small-bottom">
                    Accepts <span class="kp-mono">.sql</span> or <span class="kp-mono">.sql.gz</span>. Maximum upload
                    size is <strong>512 MB</strong>. For larger dumps, transfer the file to
                    <span class="kp-mono">backups/import/</span> via SFTP and use the <em>Import from SFTP</em> section below.
                </p>
                <div class="uk-margin-small">
                    <input type="file" class="uk-input kp-input" id="dbtools-file-input" accept=".sql,.gz">
                </div>
                <button class="uk-button kp-btn-primary kp-btn-sm uk-margin-small-top" id="dbtools-upload-btn">
                    Upload &amp; Import
                </button>

                <hr class="uk-divider-small uk-margin-small">

                <!-- SFTP section -->
                <h4 class="kp-text uk-margin-small-bottom">Import from SFTP</h4>
                <p class="kp-muted uk-text-small uk-margin-small-bottom">
                    Dumps found in <span class="kp-mono">backups/import/</span> on this site's SFTP.
                </p>
                <div id="dbtools-sftp-list">
                    <div uk-spinner="ratio: 0.6" style="color:var(--kp-blue)"></div>
                </div>
            </div>
        </div>`;
}

// wireDBToolsTab binds the database tools actions
export function wireDBToolsTab(root, siteId) {

    // dump download
    root.querySelector("#dbtools-dump-btn")?.addEventListener("click", () => {

        // correlation token — the server sets a cookie under this name once
        // the dump is producing output and the download headers are on the wire
        const dlToken = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
        const dlCookie = `kp_dl_${dlToken}`;

        showProgressModal(
            "Preparing Download",
            "Your database dump is being generated — your download will begin automatically. Do not close this tab."
        );

        // give the modal time to render before the browser download dialog
        // potentially blocks the UI, then trigger via a hidden anchor
        setTimeout(() => {
            const a = document.createElement("a");
            a.href = `/api/sites/${siteId}/db/dump?dl=${dlToken}`;
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // poll for the server's cookie — it lands when the download
            // actually starts, however long the dump took to begin
            const started = Date.now();
            const poll = setInterval(() => {
                const hit = document.cookie
                    .split(";")
                    .some(c => c.trim().startsWith(`${dlCookie}=`));

                // stop waiting after 30 minutes so the modal cannot stick
                if (!hit && Date.now() - started < 1800000) {
                    return;
                }
                clearInterval(poll);
                document.cookie = `${dlCookie}=; Path=/; Max-Age=0`;
                hideProgressModal();
            }, 500);
        }, 300);

    });

    // upload & import
    root.querySelector("#dbtools-upload-btn")?.addEventListener("click", async () => {
        const fileInput = root.querySelector("#dbtools-file-input");
        if (!fileInput?.files?.length) {
            toast.error("Select a .sql or .sql.gz file first");
            return;
        }
        const wipe = await confirmImport(root);
        if (wipe === null) return;

        const formData = new FormData();
        formData.append("dump", fileInput.files[0]);
        formData.append("wipe", wipe ? "1" : "0");

        showProgressModal("Importing Database", "Uploading and importing — the site is in maintenance mode until this completes.");

        try {
            await fetch(`/api/sites/${siteId}/db/import/upload`, {
                method: "POST",
                headers: { "X-CSRF-Token": window.KP?.csrf ?? "" },
                body: formData,
                credentials: "same-origin",
            }).then(async res => {
                if (!res.ok) {
                    const j = await res.json().catch(() => ({}));
                    throw new Error(j.error || `HTTP ${res.status}`);
                }
            });
        } catch (err) {
            hideProgressModal();
            toast.error(err.message);
            return;
        }

        fileInput.value = "";
        pollImportStatus(root, siteId);
    });

    // SFTP import (delegated)
    root.querySelector("#dbtools-sftp-list")?.addEventListener("click", async (e) => {
        const btn = e.target.closest(".dbtools-sftp-btn");
        if (!btn) return;
        const wipe = await confirmImport(root);
        if (wipe === null) return;

        showProgressModal("Importing Database", "Importing from SFTP — the site is in maintenance mode until this completes.");

        try {
            await api.post(`/sites/${siteId}/db/import/sftp`, { filename: btn.dataset.file, wipe });
        } catch (err) {
            hideProgressModal();
            toast.error(err.message);
            return;
        }

        pollImportStatus(root, siteId);
    });

    // search-replace (WordPress only)
    root.querySelector("#dbtools-sr-preview")?.addEventListener("click", () => runSearchReplace(root, siteId, true));
    root.querySelector("#dbtools-sr-run")?.addEventListener("click", () => runSearchReplace(root, siteId, false));

    // refresh the SFTP dump list
    root.querySelector("#dbtools-sftp-refresh")?.addEventListener("click", () => loadImportFiles(root, siteId));
    loadImportFiles(root, siteId);
}


// confirmImport asks before an import, warning harder when the wipe box is
// checked; resolves the wipe flag, or null when the user backs out
async function confirmImport(root) {
    const wipe = !!root.querySelector("#dbtools-wipe")?.checked;
    const ok = await confirm(
        wipe ? "Wipe & Import Database" : "Import Database",
        wipe
            ? "Every table, view and routine in this site's database will be dropped before the import. This cannot be undone."
            : "The dump will be merged into this site's database, replacing any tables it recreates. This cannot be undone."
    );
    return ok ? wipe : null;
}

// loadImportFiles lists the SQL dumps waiting in the site's SFTP import directory
async function loadImportFiles(root, siteId) {
    const list = root.querySelector("#dbtools-sftp-list");
    if (!list) return;
    try {
        const files = await api.get(`/sites/${siteId}/db/import/files`);
        if (!files || files.length === 0) {
            list.innerHTML = `<p class="kp-muted uk-text-small uk-margin-remove">No files found.</p>`;
            return;
        }
        list.innerHTML = files.map(f => `
            <div class="uk-flex uk-flex-middle uk-flex-between uk-margin-small-bottom">
                <span class="kp-mono uk-text-small">${escapeHtml(f)}</span>
                <button class="uk-button kp-btn-primary kp-btn-sm dbtools-sftp-btn" data-file="${escapeHtml(f)}">
                    Import
                </button>
            </div>`).join("");
    } catch (err) {
        list.innerHTML = `<p class="kp-muted uk-text-small">Failed to list files: ${escapeHtml(err.message)}</p>`;
    }
}

// pollImportStatus waits for the running import to finish, then reports the outcome
function pollImportStatus(root, siteId) {
    const deadline = Date.now() + 30 * 60 * 1000;
    const poll = setInterval(async () => {
        try {
            const res = await api.get(`/sites/${siteId}/db/import/status`);
            if (!res?.active || Date.now() > deadline) {
                clearInterval(poll);
                hideProgressModal();
                if (res?.active) {
                    toast.error("Import timed out — check server logs");
                } else if (res?.error) {
                    toast.error(`Import failed: ${res.error}`);
                } else {
                    toast.success("Import complete");
                }
                await loadImportFiles(root, siteId);
            }
        } catch (_) {
            // keep polling on transient errors, but never past the deadline
            if (Date.now() > deadline) {
                clearInterval(poll);
                hideProgressModal();
                toast.error("Import status unavailable — check server logs");
            }
        }
    }, 3000);
}


// runSearchReplace sends the search-replace terms, confirming first on a live
// run, and reports the replacement count under the form
async function runSearchReplace(root, siteId, dryRun) {
    const search = root.querySelector("#dbtools-sr-search")?.value ?? "";
    const replace = root.querySelector("#dbtools-sr-replace")?.value ?? "";
    const result = root.querySelector("#dbtools-sr-result");
    if (!search) {
        toast.error("Enter a search term first");
        return;
    }
    if (!dryRun) {
        const ok = await confirm(
            "Run Search & Replace",
            `Every occurrence of "${search}" in this site's database will be replaced with "${replace}". This cannot be undone — download a dump first if unsure.`
        );
        if (!ok) return;
    }

    showProgressModal(
        dryRun ? "Previewing Search & Replace" : "Running Search & Replace",
        "Scanning every table in the site's database — this may take a while on large sites."
    );

    try {
        const res = await api.post(`/sites/${siteId}/db/search-replace`, { search, replace, dry_run: dryRun }, 1800000);
        hideProgressModal();
        const n = res?.count ?? 0;
        const msg = dryRun
            ? `${n} replacement${n === 1 ? "" : "s"} would be made`
            : `${n} replacement${n === 1 ? "" : "s"} made`;
        if (result) result.innerHTML = `<p class="kp-text uk-text-small uk-margin-small-top uk-margin-remove-bottom">${escapeHtml(msg)}</p>`;
        if (!dryRun) toast.success(msg);
    } catch (err) {
        hideProgressModal();
        toast.error(err.message);
    }
}
