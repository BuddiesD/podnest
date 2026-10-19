// PodNest - Self-hosted site management platform
// Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com>
// Licensed under the MIT License. See LICENSE file in the project root for full license text.

"use strict";

import { hideProgressModal, showProgressModal } from '../helpers.js';

// renderDBToolsTab returns the static HTML shell for the database tools tab
export function renderDBToolsTab(siteId) {
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
}
