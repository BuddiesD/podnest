// PodNest - Self-hosted site management platform
// Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com>
// Licensed under the MIT License. See LICENSE file in the project root for full license text.

"use strict";

import { api } from '../api.js';
import { confirm, escapeHtml, fmtBytes, hideProgressModal, showProgressModal } from '../helpers.js';
import { toast } from '../toast.js';

// renderDBToolsTab returns the static HTML shell for the database tools tab
export function renderDBToolsTab(siteId, siteType) {
    return `
        <div id="dbtools-panel" data-site-id="${siteId}">

            <!-- tab pills -->
            <ul class="kp-tab-pills" id="kp-db-pills">
                <li data-tab="db-export"><a href="#"><span uk-icon="icon: download; ratio: 0.85"></span> Export</a></li>
                <li data-tab="db-import"><a href="#"><span uk-icon="icon: upload; ratio: 0.85"></span> Import</a></li>
                ${siteType === 1 ? `<li data-tab="db-replace"><a href="#"><span uk-icon="icon: search; ratio: 0.85"></span> Search &amp; Replace</a></li>` : ""}
                <li data-tab="db-tables"><a href="#"><span uk-icon="icon: table; ratio: 0.85"></span> Optimize &amp; Repair</a></li>
            </ul>

            <!-- switcher panels -->
            <ul class="uk-switcher uk-margin-large-bottom" id="kp-db-switcher">

                <!-- export -->
                <li>
                    <div class="kp-card uk-padding-small">
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
                </li>

                <!-- import -->
                <li>
                    <label class="uk-flex uk-flex-middle" style="gap:8px;cursor:pointer">
                        <input type="checkbox" class="uk-checkbox" id="dbtools-wipe">
                        <span class="kp-text">Wipe the database before importing</span>
                    </label>
                    <p class="kp-muted uk-text-small uk-margin-small-top uk-margin-small-bottom">
                        Without wipe, the dump is merged into the existing database — tables the dump recreates are
                        replaced, everything else is kept. The site is in maintenance mode while the import runs.
                    </p>

                    <div class="kp-card uk-padding-small uk-margin-bottom">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">Upload Dump</h3>
                            <button class="uk-button kp-btn-primary kp-btn-sm" id="dbtools-upload-btn" uk-tooltip="Upload &amp; Import">
                                <span uk-icon="cloud-upload"></span>
                            </button>
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-bottom">
                            Accepts <span class="kp-mono">.sql</span> or <span class="kp-mono">.sql.gz</span>. Maximum upload
                            size is <strong>512 MB</strong>. For larger dumps, transfer the file to
                            <span class="kp-mono">backups/import/</span> via SFTP and use <em>Import from SFTP</em> below.
                        </p>
                        <input type="file" class="uk-input kp-input" id="dbtools-file-input" accept=".sql,.gz">
                    </div>

                    <div class="kp-card uk-padding-small">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">Import from SFTP</h3>
                            <button class="uk-button kp-btn-ghost kp-btn-sm" id="dbtools-sftp-refresh" uk-tooltip="Refresh the SFTP File List">
                                <span uk-icon="refresh"></span>
                            </button>
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-bottom">
                            Dumps found in <span class="kp-mono">backups/import/</span> on this site's SFTP.
                        </p>
                        <div id="dbtools-sftp-list">
                            <div uk-spinner="ratio: 0.6" style="color:var(--kp-blue)"></div>
                        </div>
                    </div>
                </li>

                ${siteType === 1 ? `
                <!-- search-replace (WordPress only) -->
                <li>
                    <div class="kp-card uk-padding-small">
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
                    </div>
                </li>` : ""}

                <!-- optimize / repair -->
                <li>
                    <div class="kp-card uk-padding-small">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">Optimize &amp; Repair</h3>
                            <div class="uk-flex" style="gap:6px">
                                <button class="uk-button kp-btn-ghost kp-btn-sm" id="dbtools-tables-refresh" uk-tooltip="Refresh the Table List">
                                    <span uk-icon="refresh"></span>
                                </button>
                                <button class="uk-button kp-btn-primary kp-btn-sm dbtools-maintain-btn" data-action="optimize" uk-tooltip="Optimize the Selected Tables" disabled>
                                    <span uk-icon="bolt"></span>
                                </button>
                                <button class="uk-button kp-btn-secondary kp-btn-sm dbtools-maintain-btn" data-action="repair" uk-tooltip="Repair the Selected Tables" disabled>
                                    <span uk-icon="cog"></span>
                                </button>
                            </div>
                        </div>
                        <div id="dbtools-tables-wrap">
                            <div uk-spinner="ratio: 0.8" style="color:var(--kp-blue)"></div>
                        </div>
                        <div id="dbtools-maintain-result"></div>
                    </div>
                </li>
            </ul>
        </div>`;
}

// initDBToolsPills wires the database sub-tab pills to their switcher and lands
// on the pill named by tab, if any
export function initDBToolsPills(root, tab) {
    const panel    = root.querySelector("#dbtools-panel");
    const pills    = root.querySelector("#kp-db-pills");
    const switcher = root.querySelector("#kp-db-switcher");
    if (!panel || !pills || !switcher) return;

    const siteId = panel.dataset.siteId;
    const items  = [...pills.querySelectorAll(":scope > li")];

    // show the nth database panel, optionally recording its pill in the hash
    const showTab = (idx, updateHash) => {
        UIkit.switcher(switcher).show(idx);
        items.forEach((li, i) => li.classList.toggle("kp-pill-active", i === idx));
        if (!updateHash) return;
        history.replaceState(null, "", `#site-detail/${siteId}/${items[idx].dataset.tab}`);
    };

    items.forEach((li, i) => {
        li.querySelector(":scope > a").addEventListener("click", (e) => {
            e.preventDefault();
            showTab(i, true);
        });
    });

    showTab(Math.max(0, items.findIndex((li) => li.dataset.tab === tab)), false);
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

    // optimize / repair — select-all and row checkboxes (delegated)
    root.querySelector("#dbtools-tables-wrap")?.addEventListener("change", (e) => {
        if (e.target.id === "dbtools-tables-all") {
            root.querySelectorAll(".dbtools-table-check").forEach(c => { c.checked = e.target.checked; });
        }
        syncTableSelection(root);
    });
    root.querySelectorAll(".dbtools-maintain-btn").forEach(btn => {
        btn.addEventListener("click", () => runMaintenance(root, siteId, btn.dataset.action));
    });
    root.querySelector("#dbtools-tables-refresh")?.addEventListener("click", () => loadTables(root, siteId));
    loadTables(root, siteId);

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


// loadTables fetches the site's tables and renders the selectable list
async function loadTables(root, siteId) {
    const wrap = root.querySelector("#dbtools-tables-wrap");
    if (!wrap) return;
    try {
        const tables = await api.get(`/sites/${siteId}/db/tables`);
        if (!tables || tables.length === 0) {
            wrap.innerHTML = `<p class="kp-muted uk-text-small uk-margin-remove">No tables found.</p>`;
            syncTableSelection(root);
            return;
        }
        const rows = tables.map(t => `
            <tr>
                <td><input class="uk-checkbox dbtools-table-check" type="checkbox" value="${escapeHtml(t.name)}"></td>
                <td class="kp-mono" style="font-size:0.8rem">${escapeHtml(t.name)}</td>
                <td>${escapeHtml(t.engine || "—")}</td>
                <td class="uk-visible@s">${Number(t.rows).toLocaleString()}</td>
                <td>${fmtBytes(t.size)}</td>
            </tr>`).join("");
        wrap.innerHTML = `
            <div class="uk-overflow-auto">
            <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
                <thead>
                    <tr>
                        <th class="uk-table-shrink">
                            <input class="uk-checkbox" type="checkbox" id="dbtools-tables-all" uk-tooltip="Select All">
                        </th>
                        <th>Table</th>
                        <th>Engine</th>
                        <th class="uk-visible@s">Rows</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
            </div>`;
    } catch (err) {
        wrap.innerHTML = `<p class="kp-muted uk-text-small">Failed to list tables: ${escapeHtml(err.message)}</p>`;
    }
    syncTableSelection(root);
}

// syncTableSelection keeps the select-all box and action buttons in step with
// the row checkboxes
function syncTableSelection(root) {
    const checks = [...root.querySelectorAll(".dbtools-table-check")];
    const n = checks.filter(c => c.checked).length;
    const all = root.querySelector("#dbtools-tables-all");
    if (all) {
        all.checked = n > 0 && n === checks.length;
        all.indeterminate = n > 0 && n < checks.length;
    }
    root.querySelectorAll(".dbtools-maintain-btn").forEach(b => { b.disabled = n === 0; });
}

// runMaintenance optimizes or repairs the selected tables and shows the report
async function runMaintenance(root, siteId, action) {
    const tables = [...root.querySelectorAll(".dbtools-table-check:checked")].map(c => c.value);
    if (tables.length === 0) return;
    const label = action === "repair" ? "Repair" : "Optimize";

    const ok = await confirm(
        `${label} Tables`,
        `${label} ${tables.length} table${tables.length === 1 ? "" : "s"}? Tables may be briefly locked while this runs.`
    );
    if (!ok) return;

    showProgressModal(`${label} Running`, `Running ${action} on ${tables.length} table${tables.length === 1 ? "" : "s"} — this may take a while on large tables.`);

    const result = root.querySelector("#dbtools-maintain-result");
    try {
        const res = await api.post(`/sites/${siteId}/db/tables/maintain`, { action, tables }, 1800000);
        hideProgressModal();
        if (result) result.innerHTML = `<pre class="kp-cron-output uk-margin-small-top">${escapeHtml(res?.output || "(no output)")}</pre>`;
        toast.success(`${label} complete`);
    } catch (err) {
        hideProgressModal();
        toast.error(err.message);
    }
    await loadTables(root, siteId);
}
