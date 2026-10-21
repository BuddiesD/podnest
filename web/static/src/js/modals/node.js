// PodNest - Self-hosted site management platform
// Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com>
// Licensed under the MIT License. See LICENSE file in the project root for full license text.

"use strict";

import { escapeHtml } from '../helpers.js';

// showAddNodeModal prompts for a child's name, URL, and pairing code and
// resolves with { name, url, code }, or null if the user cancelled
export function showAddNodeModal() {
    return nodeModal({
        title: "Add Node",
        intro: "On the child node, use Generate Pairing Code, then enter its URL and code here.",
        okLabel: "Pair",
        okIcon: "link",
        fields: `
            <label class="kp-label">Name</label>
            <input id="kp-node-name" class="uk-input kp-input" type="text" maxlength="100" autocomplete="off">
            <label class="kp-label uk-margin-small-top">URL</label>
            <input id="kp-node-url" class="uk-input kp-input" type="text" placeholder="https://node.example.com" autocomplete="off">
            <label class="kp-label uk-margin-small-top">Pairing Code</label>
            <input id="kp-node-code" class="uk-input kp-input" type="text" placeholder="XXXX-XXXX-XXXX-XXXX" autocomplete="off"
                style="letter-spacing:0.2em;text-align:center">`,
        read: () => {
            const name = document.getElementById("kp-node-name");
            const url = document.getElementById("kp-node-url");
            const code = document.getElementById("kp-node-code");
            for (const el of [name, url, code]) {
                if (!el.value.trim()) { el.focus(); return null; }
            }
            return { name: name.value.trim(), url: url.value.trim(), code: code.value.trim() };
        },
    });
}

// showEditNodeModal prompts for a child's name, URL, and whether to re-key,
// resolving with { name, url, rekey }, or null if the user cancelled
export function showEditNodeModal(node) {
    return nodeModal({
        title: `Edit Node — ${escapeHtml(node.name)}`,
        intro: "A URL change or re-key opens the child in a new tab to apply it; it takes effect once the child confirms.",
        okLabel: "Save",
        okIcon: "pencil",
        fields: `
            <label class="kp-label">Name</label>
            <input id="kp-node-name" class="uk-input kp-input" type="text" maxlength="100" value="${escapeHtml(node.name)}" autocomplete="off">
            <label class="kp-label uk-margin-small-top">URL</label>
            <input id="kp-node-url" class="uk-input kp-input" type="text" value="${escapeHtml(node.url)}" autocomplete="off"
                ${node.status !== 2 ? "disabled" : ""}>
            <label class="uk-margin-small-top uk-display-block">
                <input id="kp-node-rekey" class="uk-checkbox" type="checkbox" ${node.status !== 2 ? "disabled" : ""}> &nbsp;Re-key this link
            </label>`,
        read: () => {
            const name = document.getElementById("kp-node-name");
            if (!name.value.trim()) { name.focus(); return null; }
            return {
                name: name.value.trim(),
                url: document.getElementById("kp-node-url").value.trim(),
                rekey: document.getElementById("kp-node-rekey").checked,
            };
        },
    });
}

function nodeModal({ title, intro, okLabel, okIcon, fields, read }) {
    return new Promise((resolve) => {
        const id = "kp-node-modal";
        document.getElementById(id)?.remove();

        const html = `
            <div id="${id}" uk-modal>
                <div class="uk-modal-dialog kp-modal uk-modal-body" style="max-width:460px">
                    <h3 class="uk-modal-title">${title}</h3>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">${intro}</p>
                    ${fields}
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button class="uk-button kp-btn-ghost uk-modal-close" id="kp-node-cancel">Cancel</button>
                        <button class="uk-button kp-btn-primary" id="kp-node-ok">
                            <span uk-icon="${okIcon}"></span> ${okLabel}
                        </button>
                    </div>
                </div>
            </div>`;

        document.body.insertAdjacentHTML("beforeend", html);
        const el = document.getElementById(id);
        const modal = UIkit.modal(el);
        let done = false;

        const cleanup = (val) => {
            if (done) return;
            done = true;
            modal.hide();
            setTimeout(() => el.remove(), 300);
            resolve(val);
        };

        document.getElementById("kp-node-ok").addEventListener("click", () => {
            const val = read();
            if (val) cleanup(val);
        });
        document.getElementById("kp-node-cancel").addEventListener("click", () => cleanup(null), { once: true });
        el.addEventListener("hidden", () => cleanup(null), { once: true });

        el.querySelectorAll("input[type=text]").forEach((input) => input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") document.getElementById("kp-node-ok").click();
        }));

        modal.show();
        setTimeout(() => document.getElementById("kp-node-name")?.focus(), 150);
    });
}
