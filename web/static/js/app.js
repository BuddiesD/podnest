/*! PodNest - Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com> | MIT License */

"use strict";(()=>{var k={async _req(e,t,a,s=6e4){let i=new AbortController,n=setTimeout(()=>i.abort(),s),o={method:e,headers:{"Content-Type":"application/json"},signal:i.signal};e!=="GET"&&e!=="HEAD"&&(o.headers["X-CSRF-Token"]=window.KP?.csrf??""),a!==void 0&&(o.body=JSON.stringify(a));try{let l=await fetch("/api"+t,o);clearTimeout(n);let r=l.status===204?null:await l.json().catch(()=>null);if(l.status===401)return window.location.href="/login?msg=Your+session+has+expired+%E2%80%94+please+log+in+again",null;if(!l.ok)throw new Error(r?.error||`HTTP ${l.status}`);return r}catch(l){throw clearTimeout(n),l}},get:e=>k._req("GET",e),post:(e,t,a)=>k._req("POST",e,t,a),put:(e,t,a)=>k._req("PUT",e,t,a),delete:e=>k._req("DELETE",e),patch:(e,t)=>k._req("PATCH",e,t)};var g=e=>String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");function L(e){return e===0?"0 B":e<1024?`${e} B`:e<1048576?`${(e/1024).toFixed(1)} KB`:e<1073741824?`${(e/1048576).toFixed(1)} MB`:`${(e/1073741824).toFixed(2)} GB`}var ne=()=>'<div class="kp-spinner"><div uk-spinner="ratio: 1.25"></div></div>',T=e=>`<div class="kp-empty">
        <div class="kp-empty-icon" uk-icon="icon: warning; ratio: 2.5"></div>
        <div class="kp-empty-text">${e}</div>
    </div>`,N=(e,t)=>`<div class="kp-empty">
        <div class="kp-empty-icon" uk-icon="icon: ${e}; ratio: 2.5"></div>
        <div class="kp-empty-text">${t}</div>
    </div>`,A=e=>{let t={1:["running","Running"],2:["stopped","Stopped"],3:["restarting","Restarting"],4:["error","Error"]},[a,s]=t[e]||["stopped","Unknown"];return`<span class="kp-status kp-status-${a}">${s}</span>`},Yt=e=>({3:"8.2",4:"8.3",5:"8.4",6:"8.5"})[e]||"?",G=e=>({1:"WordPress",2:"PHP",3:"Static",4:"Node.js",5:".NET",6:"Reverse Proxy",7:"Python"})[e]||"?",P=()=>window.KP.user.role===window.KP.roles.admin,R=e=>{switch(e.SiteType){case 1:case 2:return`PHP ${Yt(e.PHPVersion)}`;case 4:return`Node ${{2:"22",4:"24",5:"25",6:"26"}[e.RuntimeVersion]||"?"}`;case 5:return`.NET ${{1:"8.0",2:"9.0",3:"10.0"}[e.RuntimeVersion]||"?"}`;case 7:return`Python ${{1:"3.11",2:"3.12",3:"3.13",4:"3.14"}[e.RuntimeVersion]||"?"}`;case 6:return"Reverse Proxy";default:return""}},U=e=>({id:e.id??e.ID,uname:e.uname??e.UName,uhash:e.uhash??e.UHash,fname:e.fname??e.FName,lname:e.lname??e.LName,email:e.email??e.Email,phone:e.phone??e.Phone,role:e.role??e.Role,totp_enabled:e.totp_enabled??!1,notify_email:e.notify_email??!1,notify_sms:e.notify_sms??!1,created:e.created??e.Created});function $(e,t){return new Promise(a=>{document.getElementById("kp-confirm-title").textContent=e,document.getElementById("kp-confirm-message").textContent=t;let s=UIkit.modal("#kp-confirm-modal");document.getElementById("kp-confirm-ok").addEventListener("click",()=>{s.hide(),a(!0)},{once:!0}),s.show(),document.getElementById("kp-confirm-modal").addEventListener("hidden",()=>a(!1),{once:!0})})}function S(e,t){let a=`
        <div id="kp-progress-modal" uk-modal="bg-close: false; esc-close: false; keyboard: false">
            <div class="uk-modal-dialog kp-modal uk-modal-body uk-text-center" style="max-width:420px">
                <div uk-spinner="ratio: 1.5" style="color:var(--kp-blue)"></div>
                <h3 class="uk-modal-title uk-margin-small-top" id="kp-progress-title">${e}</h3>
                <p class="kp-muted uk-text-small" id="kp-progress-message">${t}</p>
                <p class="kp-muted">
                    This may take several minutes while the task(s) complete, make sure to keep screen open until it has completed.
                </p>
            </div>
        </div>`;document.body.insertAdjacentHTML("beforeend",a),UIkit.modal("#kp-progress-modal").show()}function x(){let e=document.getElementById("kp-progress-modal");e&&(UIkit.modal(e).hide(),setTimeout(()=>e.remove(),300))}function We(e){return new Promise(t=>{let a="kp-clone-modal",s=`
            <div id="${a}" uk-modal>
                <div class="uk-modal-dialog kp-modal uk-modal-body" style="max-width:420px">
                    <h3 class="uk-modal-title">Clone Site</h3>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">
                        Enter a name and domain for the clone of <strong>${e}</strong>.
                        Files, database, and configuration will be copied \u2014 the clone is served on its own domain.
                    </p>
                    <input id="kp-clone-name" class="uk-input kp-input" type="text"
                        placeholder="clone-name" autocomplete="off">
                    <input id="kp-clone-domain" class="uk-input kp-input uk-margin-small-top" type="text"
                        placeholder="staging.example.com" autocomplete="off">
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button class="uk-button kp-btn-ghost uk-modal-close" id="kp-clone-cancel">Cancel</button>
                        <button class="uk-button kp-btn-primary" id="kp-clone-ok">
                            <span uk-icon="move"></span> Clone
                        </button>
                    </div>
                </div>
            </div>`;document.body.insertAdjacentHTML("beforeend",s);let i=UIkit.modal(`#${a}`),n=document.getElementById("kp-clone-name"),o=document.getElementById("kp-clone-domain"),l=document.getElementById("kp-clone-ok"),r=document.getElementById("kp-clone-cancel"),m=p=>{i.hide(),setTimeout(()=>document.getElementById(a)?.remove(),300),t(p)};l.addEventListener("click",()=>{let p=n.value.trim(),d=o.value.trim();if(!p){n.focus();return}if(!d){o.focus();return}m({name:p,domain:d})}),r.addEventListener("click",()=>m(null),{once:!0}),document.getElementById(a).addEventListener("hidden",()=>m(null),{once:!0}),i.show(),setTimeout(()=>n.focus(),150),[n,o].forEach(p=>p.addEventListener("keydown",d=>{d.key==="Enter"&&l.click()}))})}function je(e){return new Promise(t=>{let a="kp-rename-modal",s=`
            <div id="${a}" uk-modal>
                <div class="uk-modal-dialog kp-modal uk-modal-body" style="max-width:420px">
                    <h3 class="uk-modal-title">Rename Site</h3>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">
                        Enter a new name for <strong>${e}</strong>.  Please have patience, this takes a few minutes.
                    </p>
                    <input id="kp-rename-name" class="uk-input kp-input" type="text"
                        value="${e}" autocomplete="off">
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button class="uk-button kp-btn-ghost uk-modal-close" id="kp-rename-cancel">Cancel</button>
                        <button class="uk-button kp-btn-primary" id="kp-rename-ok">
                            <span uk-icon="pencil"></span> Rename
                        </button>
                    </div>
                </div>
            </div>`;document.body.insertAdjacentHTML("beforeend",s);let i=UIkit.modal(`#${a}`),n=document.getElementById("kp-rename-name"),o=document.getElementById("kp-rename-ok"),l=document.getElementById("kp-rename-cancel"),r=m=>{i.hide(),setTimeout(()=>document.getElementById(a)?.remove(),300),t(m)};o.addEventListener("click",()=>r(n.value.trim()||null),{once:!0}),l.addEventListener("click",()=>r(null),{once:!0}),document.getElementById(a).addEventListener("hidden",()=>r(null),{once:!0}),i.show(),setTimeout(()=>n.focus(),150),n.addEventListener("keydown",m=>{m.key==="Enter"&&o.click()})})}function Oe(e,t,a){return new Promise(s=>{let i="kp-sync-modal",n=t.map(d=>`<option value="${d.ID}">${d.Name} (${d.ParentID===e.ID?"clone":"parent"})</option>`).join(""),o=`
            <div id="${i}" uk-modal>
                <div class="uk-modal-dialog kp-modal uk-modal-body" style="max-width:460px">
                    <h3 class="uk-modal-title">Push Site</h3>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">
                        This will overwrite the selected content on the target with data from <strong>${e.Name}</strong>.
                        The target is backed up first, and the push is aborted if that backup fails.
                    </p>
                    <div class="uk-margin-small">
                        <label class="uk-form-label kp-text" for="kp-sync-target">Push To</label>
                        <select id="kp-sync-target" class="uk-select kp-select">${n}</select>
                    </div>
                    <div class="uk-flex uk-margin-small" style="gap:16px">
                        <label><input class="uk-checkbox" type="checkbox" id="kp-sync-files" checked> &nbsp;Files</label>
                        ${a?'<label><input class="uk-checkbox" type="checkbox" id="kp-sync-db" checked> &nbsp;Database</label>':""}
                    </div>
                    <div class="uk-margin-small">
                        <label class="uk-form-label kp-text" for="kp-sync-exclude">Exclude Paths (one per line, relative to the web root)</label>
                        <textarea class="uk-textarea kp-textarea" id="kp-sync-exclude" rows="3" placeholder="wp-content/uploads"></textarea>
                    </div>
                    <p class="kp-muted uk-text-small" style="color:var(--kp-red, #e05c5c)">
                        <span uk-icon="icon: warning; ratio: 0.85"></span>
                        The target will be temporarily unavailable during the push.
                    </p>
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button class="uk-button kp-btn-ghost uk-modal-close" id="kp-sync-cancel">Cancel</button>
                        <button class="uk-button kp-btn-primary" id="kp-sync-ok">
                            <span uk-icon="cloud-upload"></span> Push Site
                        </button>
                    </div>
                </div>
            </div>`;document.body.insertAdjacentHTML("beforeend",o);let l=UIkit.modal(`#${i}`),r=document.getElementById("kp-sync-ok"),m=document.getElementById("kp-sync-cancel"),p=d=>{l.hide(),setTimeout(()=>document.getElementById(i)?.remove(),300),s(d)};r.addEventListener("click",()=>{let d=parseInt(document.getElementById("kp-sync-target").value,10),b=document.getElementById("kp-sync-files").checked,u=document.getElementById("kp-sync-db")?.checked??!1,h=document.getElementById("kp-sync-exclude").value.split(`
`).map(f=>f.trim()).filter(Boolean);p({target_id:d,files:b,database:u,exclude:h})},{once:!0}),m.addEventListener("click",()=>p(null),{once:!0}),document.getElementById(i).addEventListener("hidden",()=>p(null),{once:!0}),l.show()})}var y={routes:{},_ownHashChange:!1,register(e,t){this.routes[e]=t},async go(e,t={}){let a=Object.keys(t).length?e+"/"+Object.values(t).join("/"):e;this._ownHashChange=!0,window.location.hash=a,setTimeout(()=>{this._ownHashChange=!1},0),document.querySelectorAll(".kp-nav-link").forEach(n=>{n.classList.toggle("kp-active",n.dataset.view===e)}),document.querySelectorAll(".kp-bn-item[data-view]").forEach(n=>{n.classList.toggle("kp-active",n.dataset.view===e)});let s=this.routes[e];if(!s)return;let i=document.getElementById("kp-view");i.innerHTML=ne();try{await s(i,t)}catch(n){i.innerHTML=T(n.message)}}};function ie(){let t=(window.location.hash.replace("#","")||"dashboard").split("/"),a=t[0],s={};return a==="site-detail"&&t[1]&&(s.id=t[1]),a==="settings"&&t[1]&&(s.tab=t[1]),a==="site-detail"&&t[2]&&(s.tab=t[2]),a==="security"&&t[1]&&(s.tab=t[1]),a==="waf"&&t[1]&&(s.tab=t[1]),{view:a,params:s}}var c={show(e,t="info",a=7e3){let s={success:"check",error:"warning",info:"info"},i=document.createElement("div");i.className=`kp-toast kp-toast-${t}`,i.innerHTML=`<span uk-icon="${s[t]||"info"}"></span><span>${g(e)}</span>`,document.getElementById("kp-toasts").appendChild(i),UIkit.icon(i.querySelector("[uk-icon]")),setTimeout(()=>i.remove(),a)},success:e=>c.show(e,"success"),error:e=>c.show(e,"error"),info:e=>c.show(e,"info")};var Zt=2e3;function ea(){return`
        <div id="admin-logs-panel">
            <div class="kp-card uk-padding-small">
                <h3 class="kp-view-title uk-margin-small-bottom">Admin Logs</h3>

                <div class="kp-log-controls">
                    <select class="uk-select kp-select" id="admin-log-source" style="width:160px;height:38px">
                        <option value="proxy">Proxy Access Log</option>
                        <option value="waf">WAF Log</option>
                    </select>
                    <select class="uk-select kp-select" id="admin-log-tail" style="width:120px;height:38px">
                        <option value="100">100 lines</option>
                        <option value="250">250 lines</option>
                        <option value="500">500 lines</option>
                        <option value="1000">1000 lines</option>
                    </select>
                    <button class="uk-button kp-btn-secondary kp-btn-sm" id="admin-log-connect"
                        uk-tooltip="Start Tailing the Logs">
                        <span uk-icon="play"></span>
                    </button>
                    <button class="uk-button kp-btn-ghost kp-btn-sm" id="admin-log-disconnect" disabled
                        uk-tooltip="Stop Tailing the Logs">
                        <span uk-icon="ban"></span>
                    </button>
                    <button class="uk-button kp-btn-ghost kp-btn-sm" id="admin-log-clear"
                        uk-tooltip="Clear the Logs">
                        <span uk-icon="trash"></span>
                    </button>
                    <label style="font-size:0.82rem;color:var(--kp-text-dim);display:flex;align-items:center;gap:6px">
                        <input type="checkbox" class="uk-checkbox" id="admin-log-autoscroll" checked>
                        Auto-scroll
                    </label>
                </div>

                <div class="kp-log-header">
                    <div class="kp-log-dot kp-log-dot-red"></div>
                    <div class="kp-log-dot kp-log-dot-yellow"></div>
                    <div class="kp-log-dot kp-log-dot-green"></div>
                    <span style="font-size:0.72rem;color:var(--kp-text-dim);margin-left:8px"
                        id="admin-log-status">Disconnected</span>
                </div>
                <div class="kp-log-wrap" id="admin-log-output"></div>
            </div>
        </div>`}function ta(e){let t=null,a=!1,s=e.querySelector("#admin-log-output"),i=e.querySelector("#admin-log-connect"),n=e.querySelector("#admin-log-disconnect"),o=e.querySelector("#admin-log-clear"),l=e.querySelector("#admin-log-autoscroll"),r=e.querySelector("#admin-log-status");function m(b){for(b.split(`
`).forEach(u=>{if(!u)return;let h=document.createElement("div");h.className=u.match(/WAF BLOCK/i)?"kp-log-line-err":u.match(/WAF DETECT/i)?"kp-log-line-warn":u.match(/error|crit|emerg/i)?"kp-log-line-err":u.match(/warn/i)?"kp-log-line-warn":u.match(/info|notice/i)?"kp-log-line-info":"",h.textContent=u,s.appendChild(h)});s.childElementCount>Zt;)s.removeChild(s.firstChild);l.checked&&(s.scrollTop=s.scrollHeight)}function p(){t&&(t.close(),t=null),a=!1,i.disabled=!1,n.disabled=!0,r&&(r.textContent="Disconnected")}i.addEventListener("click",()=>{p();let b=e.querySelector("#admin-log-source").value,u=e.querySelector("#admin-log-tail").value,h=location.protocol==="https:"?"wss":"ws",f=b==="waf"?`${h}://${location.host}/api/logs/waf?tail=${u}`:`${h}://${location.host}/api/logs/proxy?tail=${u}`;t=new WebSocket(f),t.onopen=()=>{a=!0,i.disabled=!0,n.disabled=!1,r&&(r.textContent=`Connected \u2014 ${b==="waf"?"WAF Log":"Proxy Access Log"}`)},t.onmessage=v=>m(v.data),t.onerror=()=>{},t.onclose=()=>{a=!1,i.disabled=!1,n.disabled=!0,r&&(r.textContent="Disconnected")}}),n.addEventListener("click",p),o.addEventListener("click",()=>{s.innerHTML=""}),e.querySelector("#admin-log-source").addEventListener("change",()=>{t&&t.readyState===WebSocket.OPEN&&(p(),i.click())});let d=y.go.bind(y);y.go=function(b,u={}){return t&&p(),d(b,u)}}function ze(e){e.innerHTML=ea(),ta(e)}var le=50;function aa(e,t,a){let s=Math.max(1,Math.ceil(e.total/le)),i=(e.entries??[]).map(Ve).join("")||'<tr><td colspan="8" class="uk-text-center" style="color:var(--kp-text-dim)">No records found</td></tr>';return`
        <div id="audit-log-panel">
            <div class="kp-view-header">
                <h1 class="kp-view-title" style="font-size:2rem;">Audit Log</h1>
            </div>

            <div class="kp-card uk-padding-small uk-margin-bottom">
                <div class="uk-flex uk-flex-middle uk-flex-wrap kp-filter-bar">
                    <input class="uk-input kp-input" id="al-filter-user" type="text"
                        placeholder="Username" value="${_(t.username)}">
                    <input class="uk-input kp-input" id="al-filter-action" type="text"
                        placeholder="Action" value="${_(t.action)}">
                    <input class="uk-input kp-input" id="al-filter-target" type="text"
                        placeholder="Target type" value="${_(t.target_type)}">
                    <input class="uk-input kp-input" id="al-filter-date-from" type="date"
                        value="${_(t.date_from)}">
                    <input class="uk-input kp-input" id="al-filter-date-to" type="date"
                        value="${_(t.date_to)}">
                    <select class="uk-select kp-select" id="al-filter-auth">
                        <option value=""  ${t.auth===""?"selected":""}>All requests</option>
                        <option value="1" ${t.auth==="1"?"selected":""}>Authenticated</option>
                        <option value="0" ${t.auth==="0"?"selected":""}>Unauthenticated</option>
                    </select>
                    <div class="uk-flex uk-flex-middle" style="gap:4px">
                        <button class="uk-button kp-btn-primary kp-btn-sm" id="al-filter-apply">
                            <span uk-icon="icon: search; ratio: 0.85"></span>
                        </button>
                        <button class="uk-button kp-btn-ghost kp-btn-sm" id="al-filter-clear">
                            <span uk-icon="icon: close; ratio: 0.85"></span>
                        </button>
                    </div>
                    <span id="al-record-count" class="uk-margin-auto-left kp-text-dim kp-text-sm">
                        ${e.total} record${e.total!==1?"s":""}
                    </span>
                </div>
            </div>

            <div class="kp-table-wrap">
                <div class="uk-overflow-auto">
                <table class="uk-table uk-table-divider uk-table-small uk-table-middle uk-margin-remove">
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>User</th>
                            <th>IP</th>
                            <th>Method</th>
                            <th>Action</th>
                            <th>Status</th>
                            <th>Details</th>
                            <th>State diff</th>
                        </tr>
                    </thead>
                    <tbody id="al-table-body">${i}</tbody>
                </table>
                </div>
            </div>

            ${s>1?`<div id="al-pager">${Ke(a,s)}</div>`:'<div id="al-pager"></div>'}
        </div>`}function Ve(e){let t=new Date(e.ts).toLocaleString(),a=e.username?`<span style="font-family:monospace">${_(e.username)}</span>`:'<span style="color:var(--kp-text-dim)">\u2014</span>',s=sa(e.status),n=e.prior_state||e.new_state?`<button class="uk-button kp-btn-ghost kp-btn-sm al-diff-btn"
                data-prior="${_(e.prior_state)}" data-new="${_(e.new_state)}">
               <span uk-icon="icon: git-fork; ratio: 0.85"></span>
           </button>`:"<span>\u2014</span>",o=e.details?`<button class="uk-button kp-btn-ghost kp-btn-sm al-diff-btn"
                data-prior="" data-new="${_(e.details)}">
               <span uk-icon="icon: info; ratio: 0.85"></span>
           </button>`:"<span>\u2014</span>";return`<tr>
        <td style="white-space:nowrap;font-size:0.82rem">${t}</td>
        <td>${a}</td>
        <td style="font-family:monospace;font-size:0.82rem">${_(e.ip)}</td>
        <td><span class="kp-badge">${_(e.method)}</span></td>
        <td style="font-family:monospace;font-size:0.82rem">${_(e.action)}</td>
        <td>${s}</td>
        <td>${o}</td>
        <td>${n}</td>
    </tr>`}function Ke(e,t){let a=e>1?'<button class="uk-button kp-btn-ghost kp-btn-sm" id="al-prev">\u2039 Prev</button>':"",s=e<t?'<button class="uk-button kp-btn-ghost kp-btn-sm" id="al-next">Next \u203A</button>':"";return`<div class="uk-flex uk-flex-middle uk-flex-center uk-margin-small-top" style="gap:12px">
        ${a}
        <span style="font-size:0.85rem;color:var(--kp-text-dim)">Page ${e} of ${t}</span>
        ${s}
    </div>`}function sa(e){return`<span class="kp-badge ${e>=500?"kp-badge-error":e>=400?"kp-badge-warn":e>=300?"kp-badge-info":"kp-badge-ok"}">${e}</span>`}var _=e=>g(e??"");async function Xe(e,t){let a=new URLSearchParams({page:t,page_size:le});return e.username&&a.set("username",e.username),e.action&&a.set("action",e.action),e.target_type&&a.set("target_type",e.target_type),e.date_from&&a.set("date_from",e.date_from),e.date_to&&a.set("date_to",e.date_to),e.auth!==""&&a.set("auth",e.auth),k.get(`/audit?${a}`)}function na(e){return{username:e.querySelector("#al-filter-user").value.trim(),action:e.querySelector("#al-filter-action").value.trim(),target_type:e.querySelector("#al-filter-target").value.trim(),date_from:e.querySelector("#al-filter-date-from").value,date_to:e.querySelector("#al-filter-date-to").value,auth:e.querySelector("#al-filter-auth").value}}async function ia(e,t,a){async function s(o,l){let r=await Xe(o,l);e.querySelector("#al-table-body").innerHTML=(r.entries??[]).map(Ve).join("")||'<tr><td colspan="8" class="uk-text-center kp-text-dim">No records found</td></tr>';let m=Math.max(1,Math.ceil(r.total/le)),p=e.querySelector("#al-pager");p&&(p.innerHTML=m>1?Ke(l,m):""),e.querySelector("#al-record-count").textContent=`${r.total} record${r.total!==1?"s":""}`,i(e,o,l,m),t=o,a=l}function i(o,l,r,m){o.querySelector("#al-prev")?.addEventListener("click",()=>s(l,r-1)),o.querySelector("#al-next")?.addEventListener("click",()=>s(l,r+1))}e.querySelector("#al-filter-apply")?.addEventListener("click",()=>{s(na(e),1)}),e.querySelector("#al-filter-clear")?.addEventListener("click",()=>{["al-filter-user","al-filter-action","al-filter-target","al-filter-date-from","al-filter-date-to"].forEach(o=>{let l=e.querySelector(`#${o}`);l&&(l.value="")}),e.querySelector("#al-filter-auth").value="",s({username:"",action:"",target_type:"",date_from:"",date_to:"",auth:""},1)});let n=Math.max(1,Math.ceil(parseInt(e.querySelector("#al-record-count")?.textContent??"0")/le));i(e,t,a,n),e.querySelector("#audit-log-panel")?.addEventListener("click",o=>{let l=o.target.closest(".al-diff-btn");if(!l)return;o.preventDefault(),o.stopPropagation();let r=l.dataset.prior??"",m=l.dataset.new??"",p="";r&&m?p=`=== BEFORE ===
`+oe(r)+`

=== AFTER ===
`+oe(m):m?p=oe(m):p=oe(r),document.body.insertAdjacentHTML("beforeend",`
            <div id="al-diff-modal-inst" uk-modal>
                <div class="uk-modal-dialog kp-modal uk-modal-body uk-width-large">
                    <button class="uk-modal-close-default" type="button" uk-close></button>
                    <h3 class="kp-view-title uk-margin-bottom">Request Detail</h3>
                    <pre class="kp-cron-output">${_(p)}</pre>
                </div>
            </div>`);let d=document.getElementById("al-diff-modal-inst");UIkit.modal(d).show(),d.addEventListener("hidden",()=>d.remove(),{once:!0})})}function oe(e){try{return JSON.stringify(JSON.parse(e),null,2)}catch{return e}}async function Je(e){if(!P()){e.innerHTML=T("Access denied");return}let t={username:"",action:"",target_type:"",date_from:"",date_to:"",auth:""},a=await Xe(t,1);e.innerHTML=aa(a,t,1),ia(e,t,1)}function re(){document.body.insertAdjacentHTML("beforeend",`
        <div id="kp-create-site-modal" uk-modal>
            <div class="uk-modal-dialog kp-modal uk-modal-body uk-width-large">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <h3 class="kp-view-title">New Site</h3>
                <form id="create-site-form" class="uk-form-stacked uk-margin-top">
                    <div class="uk-grid-small" uk-grid>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Site Name</label>
                            <input class="uk-input kp-input" name="name" type="text" placeholder="mysite" required>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Site Type</label>
                            <select class="uk-select kp-select" name="site_type" id="cs-site-type">
                                <option value="1">PHP</option>
                                <option value="3">Static HTML</option>
                                <option value="4">Node.js</option>
                                <option value="5">.NET</option>
                                <option value="7">Python</option>                                
                                <option value="6">Reverse Proxy</option>
                            </select>
                        </div>
                        <div class="uk-width-1-2@s" id="cs-php-version-wrap">
                            <label class="kp-label">PHP Version</label>
                            <select class="uk-select kp-select" name="php_version">
                                <option value="3" selected>PHP 8.2</option>
                                <option value="4">PHP 8.3</option>
                                <option value="5">PHP 8.4</option>
                                <option value="6">PHP 8.5</option>
                            </select>
                        </div>
                        <div class="uk-width-1-2@s uk-hidden" id="cs-node-version-wrap">
                            <label class="kp-label">Node.js Version</label>
                            <select class="uk-select kp-select" name="node_version">
                                <option value="2" selected>Node 22 (LTS)</option>
                                <option value="4">Node 24</option>
                                <option value="5">Node 25</option>
                                <option value="6">Node 26</option>
                            </select>
                        </div>
                        <div class="uk-width-1-2@s uk-hidden" id="cs-dotnet-version-wrap">
                            <label class="kp-label">.NET Version</label>
                            <select class="uk-select kp-select" name="dotnet_version">
                                <option value="1">.NET 8.0 (LTS)</option>
                                <option value="2">.NET 9.0</option>
                                <option value="3" selected>.NET 10.0 (LTS)</option>
                            </select>
                        </div>
                        <div class="uk-width-1-2@s uk-hidden" id="cs-python-version-wrap">
                            <label class="kp-label">Python Version</label>
                            <select class="uk-select kp-select" name="python_version">
                                <option value="1">Python 3.11</option>
                                <option value="2">Python 3.12</option>
                                <option value="3">Python 3.13</option>
                                <option value="4" selected>Python 3.14</option>
                            </select>
                        </div>
                        <div class="uk-width-1-1 uk-hidden" id="cs-start-command-wrap">
                            <label class="kp-label">Start Command</label>
                            <input class="uk-input kp-input" name="start_command" type="text" placeholder="node server.js, dotnet MyApp.dll, or gunicorn -b 0.0.0.0:8000 app:app">
                        </div>
                        <div class="uk-width-1-1" id="cs-wordpress-wrap">
                            <label><input class="uk-checkbox" type="checkbox" name="install_wordpress" checked> Install WordPress</label>
                        </div>
                        <div class="uk-width-1-1" id="cs-domains-wrap">
                            <label class="kp-label">Domains (one per line)</label>
                            <textarea class="uk-textarea kp-textarea" name="domains" rows="3" placeholder="example.com&#10;www.example.com"></textarea>
                        </div>
                        <div class="uk-width-1-1 uk-hidden" id="cs-rp-note">
                            <p class="kp-muted uk-text-small">Configure domain \u2192 upstream mappings in the Routes tab after creation.</p>
                        </div>
                    </div>
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button type="button" class="uk-button kp-btn-ghost uk-modal-close">Cancel</button>
                        <button type="submit" class="uk-button kp-btn-primary">
                            <span uk-icon="server"></span> Create Site
                        </button>
                    </div>
                </form>
            </div>
        </div>`);let t=UIkit.modal("#kp-create-site-modal"),a=document.getElementById("cs-site-type"),s=document.getElementById("cs-php-version-wrap"),i=document.getElementById("cs-node-version-wrap"),n=document.getElementById("cs-dotnet-version-wrap"),o=document.getElementById("cs-python-version-wrap"),l=document.getElementById("cs-start-command-wrap"),r=document.getElementById("cs-wordpress-wrap");t.show();let m=document.getElementById("cs-domains-wrap"),p=document.getElementById("cs-rp-note");a.addEventListener("change",()=>{let d=parseInt(a.value);s.classList.toggle("uk-hidden",d!==1&&d!==2||d===6),i.classList.toggle("uk-hidden",d!==4),n.classList.toggle("uk-hidden",d!==5),o.classList.toggle("uk-hidden",d!==7),l.classList.toggle("uk-hidden",d!==4&&d!==5&&d!==7),l.querySelector("input").required=d===7,r.classList.toggle("uk-hidden",d!==1||d===6),m.classList.toggle("uk-hidden",d===6),p.classList.toggle("uk-hidden",d!==6)}),document.getElementById("create-site-form").addEventListener("submit",async d=>{d.preventDefault();let b=d.target.querySelector('[type="submit"]'),u=b.innerHTML;b.disabled=!0,b.innerHTML='<div uk-spinner="ratio: 0.6"></div> Creating...';let h=new FormData(d.target),f=parseInt(h.get("site_type")),v=null;f===4&&(v=parseInt(h.get("node_version"))),f===5&&(v=parseInt(h.get("dotnet_version"))),f===7&&(v=parseInt(h.get("python_version")));let w={name:h.get("name").trim(),php_version:parseInt(h.get("php_version"))||3,site_type:f,runtime_version:v,start_command:h.get("start_command")?.trim()||"",domains:h.get("domains").split(`
`).map(C=>C.trim()).filter(Boolean),install_wordpress:f===1?h.get("install_wordpress")==="on":!1};t.hide(),document.getElementById("kp-create-site-modal")?.remove();let E=f===6?`Setting up '${w.name}' as a reverse proxy...`:`Setting up '${w.name}' \u2014 pulling images and provisioning containers...`;S("Creating Site",E);try{await k.post("/sites",w,6e5),x(),c.success(`Site '${w.name}' created`),y.go("sites")}catch(C){x(),c.error(C.message),b.disabled=!1,b.innerHTML=u}}),document.getElementById("kp-create-site-modal").addEventListener("hidden",()=>document.getElementById("kp-create-site-modal")?.remove())}var W=null;function oa(e){return`${e.toFixed(1)}%`}var ce=null;function Se(){return ce||(ce=new Promise(e=>{if(window.Chart){e();return}let t=document.createElement("script");t.src="https://cdn.jsdelivr.net/npm/chart.js@latest/dist/chart.umd.min.js",t.onload=e,t.onerror=e,document.body.appendChild(t)}),ce)}function $e(e,t){return`
        <div id="stats-panel" data-site-id="${e}" data-site-type="${t}">

            <!-- traffic -->
            <div class="kp-card uk-padding-small uk-margin-bottom">
                <h3 class="kp-view-title uk-margin-small-bottom">Site Traffic
                    <span class="kp-muted uk-text-small" style="font-weight:400"> \u2014 last 24 hours</span>
                </h3>

                <!-- status code badges -->
                <div class="uk-grid-small uk-child-width-1-2 uk-child-width-1-4@m uk-margin-small-bottom" uk-grid>
                    <div><div class="kp-stat-card" style="padding:16px">
                        <div class="kp-stat-value" id="stats-2xx" style="font-size:1.6rem">\u2014</div>
                        <div class="kp-stat-label" style="color:var(--kp-success)">2xx Success</div>
                    </div></div>
                    <div><div class="kp-stat-card" style="padding:16px">
                        <div class="kp-stat-value" id="stats-3xx" style="font-size:1.6rem">\u2014</div>
                        <div class="kp-stat-label" style="color:var(--kp-cyan)">3xx Redirect</div>
                    </div></div>
                    <div><div class="kp-stat-card" style="padding:16px">
                        <div class="kp-stat-value" id="stats-4xx" style="font-size:1.6rem">\u2014</div>
                        <div class="kp-stat-label" style="color:var(--kp-warning)">4xx Client Err</div>
                    </div></div>
                    <div><div class="kp-stat-card" style="padding:16px">
                        <div class="kp-stat-value" id="stats-5xx" style="font-size:1.6rem">\u2014</div>
                        <div class="kp-stat-label" style="color:var(--kp-danger)">5xx Server Err</div>
                    </div></div>
                </div>

                <!-- bandwidth -->
                <div class="kp-stats-bandwidth">
                    Total Bandwidth: <span id="stats-bandwidth" class="kp-stats-bandwidth-val">\u2014</span>
                </div>

                <!-- hits per hour chart -->
                <div class="kp-stats-chart-wrap">
                    <canvas id="stats-chart"></canvas>
                </div>
            </div>

            <!-- drilldown modal \u2014 populated on 4xx/5xx bar click -->
            <div id="stats-drilldown-modal" uk-modal>
                <div class="uk-modal-dialog uk-modal-body" style="min-width:min(96vw,900px)">
                    <button class="uk-modal-close-default" type="button" uk-close></button>
                    <h3 class="kp-view-title uk-margin-small-bottom" id="stats-drilldown-title">Request Detail</h3>
                    <div id="stats-drilldown-body">
                        <div uk-spinner="ratio:0.8" style="color:var(--kp-blue)"></div>
                    </div>
                </div>
            </div>

            <!-- top IPs + UAs -->
            <div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@m uk-margin-bottom" uk-grid>
                <div>
                    <div class="kp-table-wrap">
                        <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
                            <thead><tr>
                                <th style="color:var(--kp-text-dim);font-size:0.75rem">Top IPs</th>
                                <th style="color:var(--kp-text-dim);font-size:0.75rem;text-align:right">Hits</th>
                            </tr></thead>
                            <tbody id="stats-ip-rows">
                                <tr><td colspan="2" class="kp-muted uk-text-small">Loading\u2026</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <div class="kp-table-wrap">
                        <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
                            <thead><tr>
                                <th style="color:var(--kp-text-dim);font-size:0.75rem">Top User-Agents</th>
                                <th style="color:var(--kp-text-dim);font-size:0.75rem;text-align:right">Hits</th>
                            </tr></thead>
                            <tbody id="stats-ua-rows">
                                <tr><td colspan="2" class="kp-muted uk-text-small">Loading\u2026</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            ${t===6?"":`
        <!-- pod statistics -->
        <div class="kp-card uk-padding-small uk-margin-bottom">
            <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                <h3 class="kp-view-title">Pod Statistics</h3>
                <span id="stats-pod-indicator" class="kp-status kp-status-stopped" style="font-size:0.7rem">
                    Connecting\u2026
                </span>
            </div>
            <div id="stats-pod-table-wrap">
                <div uk-spinner="ratio:0.8" style="color:var(--kp-blue)"></div>
            </div>
        </div>

        <!-- disk usage -->
        <div class="kp-card uk-padding-small uk-margin-bottom">
            <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                <h3 class="kp-view-title">Disk Usage</h3>
                <button class="uk-button kp-btn-ghost kp-btn-sm" id="stats-disk-refresh"
                    uk-tooltip="Refresh disk usage">
                    <span uk-icon="refresh"></span>
                </button>
            </div>
            <div id="stats-disk-wrap">
                <div uk-spinner="ratio:0.8" style="color:var(--kp-blue)"></div>
            </div>
        </div>`}

        </div>`}async function la(e){await Se();let t;try{t=await k.get(`/sites/${e}/stats/traffic`)}catch(n){document.getElementById("stats-ip-rows").innerHTML=`<tr><td colspan="2" class="kp-muted uk-text-small">Failed to load: ${n.message}</td></tr>`;return}document.getElementById("stats-2xx").textContent=(t.status_codes["2xx"]??0).toLocaleString(),document.getElementById("stats-3xx").textContent=(t.status_codes["3xx"]??0).toLocaleString(),document.getElementById("stats-4xx").textContent=(t.status_codes["4xx"]??0).toLocaleString(),document.getElementById("stats-5xx").textContent=(t.status_codes["5xx"]??0).toLocaleString(),document.getElementById("stats-bandwidth").textContent=L(t.total_bandwidth??0);let a=document.getElementById("stats-chart");if(a&&window.Chart){let n=(t.hits_per_hour??[]).map(l=>new Date(l.hour).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}));W&&(W.destroy(),W=null),W=new window.Chart(a,{type:"bar",data:{labels:n,datasets:[{label:"2xx",data:(t.hits_per_hour??[]).map(l=>l["2xx"]),backgroundColor:"rgba(39,174,96,0.75)",borderColor:"rgba(39,174,96,1)",borderWidth:1,borderRadius:3},{label:"3xx",data:(t.hits_per_hour??[]).map(l=>l["3xx"]),backgroundColor:"rgba(43,142,255,0.75)",borderColor:"rgba(43,142,255,1)",borderWidth:1,borderRadius:3},{label:"4xx",data:(t.hits_per_hour??[]).map(l=>l["4xx"]),backgroundColor:"rgba(255,171,0,0.75)",borderColor:"rgba(255,171,0,1)",borderWidth:1,borderRadius:3},{label:"5xx",data:(t.hits_per_hour??[]).map(l=>l["5xx"]),backgroundColor:"rgba(235,59,90,0.75)",borderColor:"rgba(235,59,90,1)",borderWidth:1,borderRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(l,r)=>{if(!r||!r.length)return;let m=r[0].datasetIndex,p=W.data.datasets[m].label;if(p!=="4xx"&&p!=="5xx")return;let d=r[0].index,b=document.getElementById("stats-panel");if(!b||!b._hitsPerHour)return;let u=b._hitsPerHour[d]?.hour;u&&Ee(`/sites/${e}/stats/drilldown`,u,p)},onHover:(l,r)=>{if(!r||!r.length){l.native.target.style.cursor="default";return}let m=W.data.datasets[r[0].datasetIndex].label;l.native.target.style.cursor=m==="4xx"||m==="5xx"?"pointer":"default"},plugins:{legend:{display:!0,labels:{color:"#6b8cae",font:{size:11}},onHover:l=>{l.native.target.style.cursor="pointer"},onLeave:l=>{l.native.target.style.cursor="default"}},tooltip:{mode:"index",backgroundColor:"#0c1530",borderColor:"#1a2a4a",borderWidth:1,titleColor:"#dde8f5",bodyColor:"#6b8cae"}},scales:{x:{stacked:!0,ticks:{color:"#6b8cae",font:{size:10},maxRotation:45},grid:{color:"rgba(26,42,74,0.6)"}},y:{stacked:!0,ticks:{color:"#6b8cae",font:{size:10}},grid:{color:"rgba(26,42,74,0.6)"},beginAtZero:!0}}}});let o=document.getElementById("stats-panel");o&&(o._hitsPerHour=t.hits_per_hour??[])}let s=document.getElementById("stats-ip-rows");s&&(s.innerHTML=(t.top_ips??[]).length===0?'<tr><td colspan="2" class="kp-muted uk-text-small">No data</td></tr>':(t.top_ips??[]).map(n=>`
                <tr>
                    <td class="kp-stats-table-cell-mono">${g(n.name)}</td>
                    <td class="kp-stats-table-cell-count">${n.count.toLocaleString()}</td>
                </tr>`).join(""));let i=document.getElementById("stats-ua-rows");i&&(i.innerHTML=(t.top_uas??[]).length===0?'<tr><td colspan="2" class="kp-muted uk-text-small">No data</td></tr>':(t.top_uas??[]).map(n=>`
                <tr>
                    <td class="kp-stats-ua-cell" title="${g(n.name)}">${g(n.name)}</td>
                    <td class="kp-stats-table-cell-count">${n.count.toLocaleString()}</td>
                </tr>`).join(""))}async function Ge(e){let t=document.getElementById("stats-disk-wrap");if(t){t.innerHTML='<div uk-spinner="ratio:0.8" style="color:var(--kp-blue)"></div>';try{let a=await k.get(`/sites/${e}/stats/disk`);t.innerHTML=`
            <div class="uk-grid-small uk-child-width-1-2" uk-grid>
                <div>
                    <div class="kp-stat-card" style="padding:16px">
                        <div class="kp-stat-value kp-stats-disk-val">${L(a.html_bytes??0)}</div>
                        <div class="kp-stat-label">Site Files</div>
                    </div>
                </div>
                <div>
                    <div class="kp-stat-card" style="padding:16px">
                        <div class="kp-stat-value kp-stats-disk-val">${L(a.db_bytes??0)}</div>
                        <div class="kp-stat-label">Database</div>
                    </div>
                </div>
            </div>`}catch(a){t.innerHTML=`<p class="kp-muted uk-text-small">Failed to load disk usage: ${a.message}</p>`}}}function ra(e){return!e||e.length===0?'<p class="kp-muted uk-text-small uk-margin-remove">No container data.</p>':`
        <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
            <thead><tr>
                <th style="color:var(--kp-text-dim);font-size:0.75rem">Container</th>
                <th style="color:var(--kp-text-dim);font-size:0.75rem">CPU</th>
                <th style="color:var(--kp-text-dim);font-size:0.75rem">Memory</th>
                <th style="color:var(--kp-text-dim);font-size:0.75rem">Mem %</th>
            </tr></thead>
            <tbody>${e.map(a=>{let s=a.mem_limit>0?(a.mem_used/a.mem_limit*100).toFixed(1):0,i=s>80,n=a.name.split("-").pop();return`
            <tr>
                <td class="kp-stats-pod-role kp-stats-pod-role-btn"
                    data-container="${a.name}"
                    title="Restart ${n}"
                    style="cursor:pointer">${n}</td>
                <td class="kp-stats-pod-cpu${a.cpu_percent>80?" is-hot":""}">
                    ${oa(a.cpu_percent)}
                </td>
                <td class="kp-stats-pod-mem">
                    ${L(a.mem_used)}
                    <span class="kp-stats-pod-mem-limit"> / ${L(a.mem_limit)}</span>
                </td>
                <td>
                    <div class="kp-stats-mem-wrap">
                        <div class="kp-stats-mem-bar-track">
                            <div class="kp-stats-mem-bar-fill${i?" is-hot":""}"
                                style="width:${s}%"></div>
                        </div>
                        <span class="kp-stats-mem-pct">${s}%</span>
                    </div>
                </td>
            </tr>`}).join("")}</tbody>
        </table>`}function ca(e,t,a,s,i){if(!e||e.length===0)return'<p class="kp-muted uk-text-small">No matching requests found.</p>';let n=[...e].sort((d,b)=>{let u,h;switch(a){case"time":u=d.time,h=b.time;break;case"method":u=d.method,h=b.method;break;case"site":u=d.site_name,h=b.site_name;break;case"ip":u=d.client_ip,h=b.client_ip;break;default:u=d.status,h=b.status;break}return u<h?s?1:-1:u>h?s?-1:1:0}),o=50,l=Math.ceil(n.length/o),m=n.slice(t*o,(t+1)*o).map(d=>{let b=g(d.ua),u=d.status>=500?"kp-badge-danger":"kp-badge-warning";return`
            <tr>
                <td class="kp-stats-table-cell-mono" style="white-space:nowrap">${d.time.slice(11,19)}</td>
                ${i?`<td class="kp-stats-table-cell-mono" style="font-size:0.8rem">${g(d.site_name)}</td>`:""}
                <td class="kp-stats-table-cell-mono">${g(d.method)}</td>
                <td style="word-break:break-all;font-size:0.8rem">${g(d.path)}</td>
                <td><span class="kp-badge ${u}">${d.status}</span>${d.reason?` <span class="kp-badge kp-badge-danger" style="font-size:0.65rem" uk-tooltip="Blocked by security rule">${g(d.reason)}</span>`:""}</td>
                <td class="kp-stats-table-cell-mono">${g(d.client_ip)}</td>
                <td class="kp-dd-ua-cell">${b}</td>
            </tr>`}).join(""),p=l>1?`
        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-top">
            <span class="kp-muted uk-text-small">Page ${t+1} of ${l} \u2014 ${e.length} total</span>
            <div>
                ${t>0?`<button class="uk-button kp-btn-ghost kp-btn-sm" data-dd-page="${t-1}">\u2039 Prev</button>`:""}
                ${t<l-1?`<button class="uk-button kp-btn-ghost kp-btn-sm" data-dd-page="${t+1}">Next \u203A</button>`:""}
            </div>
        </div>`:"";return`
        <div class="kp-table-wrap uk-overflow-auto">
            <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
                <thead><tr>
                    <th style="color:var(--kp-text-dim);font-size:0.75rem;cursor:pointer;user-select:none" data-dd-col="time">Time ${a==="time"?s?"\u2193":"\u2191":"\u2195"}</th>
                    ${i?`<th style="color:var(--kp-text-dim);font-size:0.75rem;cursor:pointer;user-select:none" data-dd-col="site">Site ${a==="site"?s?"\u2193":"\u2191":"\u2195"}</th>`:""}
                    <th style="color:var(--kp-text-dim);font-size:0.75rem;cursor:pointer;user-select:none" data-dd-col="method">Method ${a==="method"?s?"\u2193":"\u2191":"\u2195"}</th>
                    <th style="color:var(--kp-text-dim);font-size:0.75rem">Path</th>
                    <th style="color:var(--kp-text-dim);font-size:0.75rem;cursor:pointer;user-select:none" data-dd-col="status">Status ${a==="status"?s?"\u2193":"\u2191":"\u2195"}</th>
                    <th style="color:var(--kp-text-dim);font-size:0.75rem;cursor:pointer;user-select:none" data-dd-col="ip">IP ${a==="ip"?s?"\u2193":"\u2191":"\u2195"}</th>
                    <th style="color:var(--kp-text-dim);font-size:0.75rem">UA</th>
                </tr></thead>
                <tbody>${m}</tbody>
            </table>
        </div>
        ${p}`}async function Ee(e,t,a,s=!1){let i=document.getElementById("stats-drilldown-modal"),n=document.getElementById("stats-drilldown-title"),o=document.getElementById("stats-drilldown-body");if(!i||!o)return;n.textContent=`${a} Requests \u2014 ${new Date(t).toLocaleString([],{hour:"2-digit",minute:"2-digit",month:"short",day:"numeric"})}`,o.innerHTML='<div uk-spinner="ratio:0.8" style="color:var(--kp-blue)"></div>',UIkit.modal(i).show();let l=[],r=0,m="time",p=!0;function d(){o.innerHTML=ca(l,r,m,p,s),o.querySelectorAll("th[data-dd-col]").forEach(b=>{b.addEventListener("click",()=>{let u=b.dataset.ddCol;m===u?p=!p:(m=u,p=!0),r=0,d()})}),o.querySelectorAll("[data-dd-page]").forEach(b=>{b.addEventListener("click",()=>{r=parseInt(b.dataset.ddPage,10),d()})})}try{l=await k.get(`${e}?hour=${encodeURIComponent(t)}&status=${a}`)}catch(b){o.innerHTML=`<p class="kp-muted uk-text-small">Failed to load: ${g(b.message)}</p>`;return}d()}function Le(e,t,a){let s=a===6,i=null;function n(){if(s)return;let r=e.querySelector("#stats-pod-indicator"),m=e.querySelector("#stats-pod-table-wrap");if(!m)return;let p=location.protocol==="https:"?"wss":"ws";i=new WebSocket(`${p}://${location.host}/api/sites/${t}/stats/pod`),i.onopen=()=>{r&&(r.className="kp-status kp-status-running",r.textContent="Live")},i.onmessage=d=>{try{let b=JSON.parse(d.data);m.innerHTML=ra(b.containers??[]),m.querySelectorAll(".kp-stats-pod-role-btn").forEach(u=>{u.addEventListener("click",async()=>{let h=u.style.color;u.style.color="var(--kp-warning)";let f=u.dataset.container.split("-").pop();try{await k.post(`/sites/${t}/containers/${f}/restart`),c.success(`${f} restarted`)}catch(v){u.style.color=h,c.error(v.message)}})})}catch{}},i.onerror=()=>{r&&(r.className="kp-status kp-status-error",r.textContent="Error")},i.onclose=()=>{r&&r.textContent==="Live"&&(r.className="kp-status kp-status-stopped",r.textContent="Disconnected")}}function o(){i&&i.readyState===WebSocket.OPEN&&i.close(),i=null}e.querySelector("#stats-disk-refresh")?.addEventListener("click",()=>{Ge(t)}),n();let l=new MutationObserver(()=>{document.getElementById("stats-panel")||(o(),l.disconnect())});l.observe(document.getElementById("main")??document.body,{childList:!0,subtree:!1})}async function Te(e,t){let a=t===6;await la(e),a||await Ge(e)}async function Qe(e){let t=await k.get("/sites")??[];e.innerHTML=`
        <div class="kp-view-header">
            <h1 class="kp-view-title kp-cursor" style="font-size:2rem;">Sites</h1>
            <button class="uk-button kp-btn-primary" id="sites-new-btn" uk-tooltip="Create a New Site">
                <span uk-icon="plus"></span> New
            </button>
        </div>

        <!-- bulk action bar \u2014 always visible -->
        <div id="sites-bulk-bar" class="kp-bulk-bar">
            <div class="kp-bulk-actions">
                <span id="sites-bulk-count" class="kp-bulk-count">0 selected</span>
                <!-- desktop: individual buttons (hidden on mobile) -->
                <button class="uk-button kp-btn-secondary kp-btn-sm uk-visible@s" id="bulk-start" uk-tooltip="Start the Pod(s)" disabled>
                    <span uk-icon="play"></span>
                </button>
                <button class="uk-button kp-btn-secondary kp-btn-sm uk-visible@s" id="bulk-stop" uk-tooltip="Stop the Pod(s)" disabled>
                    <span uk-icon="ban"></span>
                </button>
                <button class="uk-button kp-btn-secondary kp-btn-sm uk-visible@s" id="bulk-restart" uk-tooltip="Restart the Pod(s)" disabled>
                    <span uk-icon="refresh"></span>
                </button>
                <button class="uk-button kp-btn-secondary kp-btn-sm uk-visible@s" id="bulk-flush" uk-tooltip="Flush the Pod Cache(s)" disabled>
                    <span uk-icon="bolt"></span>
                </button>
                <!-- separator + dangerous bulk action -->
                <span class="uk-visible@s kp-vert-sep" aria-hidden="true"></span>
                <button class="uk-button kp-btn-danger kp-btn-recreate kp-btn-sm uk-visible@s" id="bulk-recreate" uk-tooltip="Recreate the Pod(s)" disabled>
                    <span uk-icon="cloud-download"></span>
                </button>
                <!-- mobile: actions dropdown (hidden on desktop), mirrors Manage dropdown -->
                <li id="kp-bulk-mobile-pill" class="uk-hidden@s" style="position:relative;list-style:none">
                    <a href="javascript:void(0);" class="kp-pill-dropdown-btn" id="kp-bulk-mobile-btn">
                        Actions <span uk-icon="icon: chevron-down; ratio: 0.8"></span>
                    </a>
                    <div class="kp-pill-dropdown" id="kp-bulk-mobile-dropdown" hidden>
                        <a href="#" id="bulk-mobile-start"><span uk-icon="icon: play; ratio: 0.85"></span> Start</a>
                        <a href="#" id="bulk-mobile-stop"><span uk-icon="icon: ban; ratio: 0.85"></span> Stop</a>
                        <a href="#" id="bulk-mobile-restart"><span uk-icon="icon: refresh; ratio: 0.85"></span> Restart</a>
                        <a href="#" id="bulk-mobile-flush"><span uk-icon="icon: bolt; ratio: 0.85"></span> Flush Caches</a>
                        <a href="#" id="bulk-mobile-recreate"><span uk-icon="icon: cloud-download; ratio: 0.85"></span> Recreate</a>
                    </div>
                </li>
            </div>
            <input class="uk-input kp-input kp-input-sm kp-sites-search"
                   id="sites-search" type="text" placeholder="Filter sites\u2026" autocomplete="off">
        </div>

        ${t.length===0?N("world","No sites yet \u2014 create one to get started"):`<div class="kp-table-wrap">
                <div class="uk-overflow-auto">
                    <table class="uk-table uk-table-hover uk-table-divider uk-table-small uk-margin-remove">
                        <thead>
                            <tr>
                                <th class="uk-table-shrink">
                                    <input class="uk-checkbox" type="checkbox" id="sites-select-all" uk-tooltip="Select All">
                                </th>
                                <th class="kp-sortable" data-col="status">Status <span class="kp-sort-icon" data-col="status"></span></th>
                                <th class="kp-sortable" data-col="name">Name <span class="kp-sort-icon" data-col="name"></span></th>
                                <th class="uk-visible@s kp-sortable" data-col="type">Type <span class="kp-sort-icon" data-col="type"></span></th>
                                <th class="uk-visible@m">Port</th>
                                <th class="uk-visible@m">UID</th>
                                <th class="uk-visible@m kp-sortable" data-col="domain">Domain <span class="kp-sort-icon" data-col="domain"></span></th>
                                <th class="uk-table-shrink">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${t.map(a=>da(a,t)).join("")}
                        </tbody>
                    </table>
                </div>
            </div>`}`,document.getElementById("sites-new-btn").addEventListener("click",()=>re()),ua()}function da(e,t=[]){let a=e.Domains?.[0]??null,s=e.SiteType===6,i=e.ParentID>0?t.find(n=>n.ID===e.ParentID)??null:null;return`
        <tr data-site-id="${e.ID}" data-status="${s?"":e.SiteStatus}" data-type="${e.SiteType}">
            <!-- row checkbox -->
            <td class="uk-table-shrink">
                <input class="uk-checkbox kp-site-row-check" type="checkbox"
                       data-site-id="${e.ID}" data-site-type="${e.SiteType}">
            </td>
            <!-- status badge -->
            <td class="uk-table-shrink kp-site-row-status">${s?"":A(e.SiteStatus)}</td>

            <!-- name + optional parent clone link -->
            <td>
                <a class="kp-site-row-name" href="javascript:void(0)"
                   data-action="manage" data-id="${e.ID}">${e.Name}</a>
                ${i?`<div class="kp-muted uk-text-small kp-mono">
                           <span uk-icon="icon: git-fork; ratio: 0.7"></span>
                           <a href="javascript:void(0)" data-action="manage" data-id="${i.ID}"
                              style="color:var(--kp-cyan)">${i.Name}</a>
                       </div>`:""}
            </td>

            <!-- type / runtime version -->
            <td class="uk-visible@s kp-muted kp-mono uk-text-small">
                ${G(e.SiteType)}${R(e)?" / "+R(e):""}
            </td>

            <!-- internal port -->
            <td class="uk-visible@m kp-muted kp-mono uk-text-small">:${e.Port}</td>

            <!-- host-mapped owner UID of html/ -->
            <td class="uk-visible@m kp-muted kp-mono uk-text-small">${e.HostUID??(s?"":"\u2014")}</td>

            <!-- primary domain -->
            <td class="uk-visible@m uk-text-small">
                ${a?`<a href="http://${a}" target="_blank"
                          style="color:var(--kp-cyan)">${a}</a>`:'<span class="kp-muted">\u2014</span>'}
            </td>

            <!-- action buttons -->
            <td class="uk-table-shrink">
                <div class="kp-site-row-actions">
                    <button class="uk-button kp-btn-secondary kp-btn-sm"
                            data-action="manage" data-id="${e.ID}"
                            uk-tooltip="Manage">
                        <span uk-icon="icon: cog;"></span>
                    </button>
                    ${s?"":`
                    ${e.SiteStatus===1?`<button class="uk-button kp-btn-secondary kp-btn-sm"
                                   data-action="stop" data-id="${e.ID}"
                                   uk-tooltip="Stop">
                               <span uk-icon="icon: ban;"></span>
                           </button>`:`<button class="uk-button kp-btn-secondary kp-btn-sm"
                                   data-action="start" data-id="${e.ID}"
                                   uk-tooltip="Start">
                               <span uk-icon="icon: play;"></span>
                           </button>`}
                    <button class="uk-button kp-btn-secondary kp-btn-sm"
                            data-action="restart" data-id="${e.ID}"
                            uk-tooltip="Restart">
                        <span uk-icon="icon: refresh;"></span>
                    </button>
                    <button class="uk-button kp-btn-secondary kp-btn-sm"
                            data-action="flush" data-id="${e.ID}"
                            uk-tooltip="Flush Caches">
                        <span uk-icon="icon: bolt;"></span>
                    </button>
                    <button class="uk-button kp-btn-ghost kp-btn-sm kp-btn-recreate"
                            data-action="recreate" data-id="${e.ID}"
                            uk-tooltip="Recreate Pod">
                        <span uk-icon="icon: history;"></span>
                    </button>
                    `}
                    <button class="uk-button kp-btn-ghost kp-btn-sm kp-btn-recreate"
                            data-action="delete" data-id="${e.ID}"
                            uk-tooltip="Delete">
                        <span uk-icon="icon: trash;"></span>
                    </button>
                </div>
            </td>
        </tr>`}function Ye(e,t=[]){let a=e.Domains?.[0]??null,s=e.SiteType===6,i=e.ParentID>0?t.find(n=>n.ID===e.ParentID)??null:null;return`
        <div class="kp-site-card uk-margin" data-site-id="${e.ID}" data-status="${s?"":e.SiteStatus}" data-type="${e.SiteType}">
            <div class="kp-site-card-header">
                <div>
                    <h2 class="kp-view-title" data-action="manage" data-id="${e.ID}">${e.Name}</h2>
                    <div class="kp-site-meta">
                        <span class="kp-site-meta-item"><span uk-icon="icon: server; ratio: 0.75"></span> :${e.Port}</span>
                        <span class="kp-site-meta-item"><span uk-icon="icon: code; ratio: 0.75"></span> ${G(e.SiteType)}${R(e)?" / "+R(e):""}</span>
                        ${a?`<span class="kp-site-meta-item" style="width:100%"><a href="http://${a}" target="_blank" style="color:var(--kp-cyan)">${a}</a></span>`:""}
                    </div>
                    ${i?`<div class="kp-site-meta kp-muted uk-text-small uk-margin-small-top"><span uk-icon="icon: git-fork; ratio: 0.75"></span> <a href="javascript:void(0)" data-action="manage" data-id="${i.ID}" style="color:var(--kp-cyan)">${i.Name}</a></div>`:""}
                </div>
                ${s?"":A(e.SiteStatus)}
            </div>
            <div class="kp-site-actions">
                <button class="uk-button kp-btn-secondary kp-btn-sm" data-action="manage" data-id="${e.ID}" uk-tooltip="Manage This Site"><span uk-icon="icon: cog;"></span></button>
                ${s?"":`
                ${e.SiteStatus===1?`<button class="uk-button kp-btn-secondary kp-btn-sm" data-action="stop" data-id="${e.ID}" uk-tooltip="Stop the Site"><span uk-icon="icon: ban;"></span></button>`:`<button class="uk-button kp-btn-secondary kp-btn-sm" data-action="start" data-id="${e.ID}" uk-tooltip="Start the Site"><span uk-icon="icon: play;"></span></button>`}
                <button class="uk-button kp-btn-secondary kp-btn-sm" data-action="restart" data-id="${e.ID}" uk-tooltip="Restart the Site"><span uk-icon="icon: refresh;"></span></button>
                <button class="uk-button kp-btn-secondary kp-btn-sm" data-action="flush" data-id="${e.ID}" title="Flush cache" uk-tooltip="Flush the Caches"><span uk-icon="icon: bolt;"></span></button>
                <div class="kp-site-actions-break"></div>
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="recreate" data-id="${e.ID}" title="Recreate pod" uk-tooltip="Recreate the Pod"><span uk-icon="icon: history;"></span></button>
                `}
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="delete" data-id="${e.ID}" title="Delete" uk-tooltip="Delete the Site"><span uk-icon="icon: trash;"></span></button>
            </div>
        </div>`}function ua(){let e=document.getElementById("sites-bulk-bar"),t=document.getElementById("sites-bulk-count"),a=document.getElementById("sites-select-all"),s=document.getElementById("sites-search"),i=document.querySelector(".kp-table-wrap tbody");if(!e||!a)return;let n=null,o=!0,l=()=>[...document.querySelectorAll(".kp-site-row-check:checked")],r=()=>{let h=l().length;t.textContent=`${h} selected`,["bulk-start","bulk-stop","bulk-restart","bulk-flush","bulk-recreate"].forEach(w=>{let E=document.getElementById(w);E&&(E.disabled=h===0)});let f=document.getElementById("kp-bulk-mobile-btn");f&&(f.disabled=h===0);let v=document.querySelectorAll(".kp-site-row-check");a.indeterminate=h>0&&h<v.length,a.checked=v.length>0&&h===v.length},m=()=>{let u=s.value.trim().toLowerCase();document.querySelectorAll(".kp-table-wrap tbody tr").forEach(h=>{let f=h.querySelector(".kp-site-row-name")?.textContent.toLowerCase()??"",v=h.querySelector("td:nth-child(6)")?.textContent.toLowerCase()??"";h.style.display=!u||f.includes(u)||v.includes(u)?"":"none"})},p=u=>{n===u?o=!o:(n=u,o=!0),document.querySelectorAll(".kp-sort-icon").forEach(f=>{f.textContent=f.dataset.col===u?o?" \u2191":" \u2193":" \u2195"});let h=[...i.querySelectorAll("tr")];h.sort((f,v)=>{let w="",E="";return u==="name"?(w=f.querySelector(".kp-site-row-name")?.textContent??"",E=v.querySelector(".kp-site-row-name")?.textContent??""):u==="status"?(w=f.dataset.status??"",E=v.dataset.status??""):u==="type"?(w=f.dataset.type??"",E=v.dataset.type??""):u==="domain"&&(w=f.querySelector("td:nth-child(6)")?.textContent.trim()??"",E=v.querySelector("td:nth-child(6)")?.textContent.trim()??""),o?w.localeCompare(E):E.localeCompare(w)}),h.forEach(f=>i.appendChild(f))};a.addEventListener("change",()=>{document.querySelectorAll(".kp-site-row-check").forEach(u=>{u.checked=a.checked}),r()}),i?.addEventListener("change",u=>{u.target.classList.contains("kp-site-row-check")&&r()}),s?.addEventListener("input",m),document.querySelectorAll(".kp-sortable").forEach(u=>{u.addEventListener("click",()=>p(u.dataset.col))}),["bulk-start","bulk-stop","bulk-restart","bulk-flush","bulk-recreate"].forEach(u=>{let h=u.replace("bulk-","");document.getElementById(u)?.addEventListener("click",()=>{let f=l().filter(v=>v.dataset.siteType!=="6").map(v=>v.dataset.siteId);document.dispatchEvent(new CustomEvent("kp:bulk-action",{detail:{action:h,ids:f}}))})});let d=document.getElementById("kp-bulk-mobile-pill"),b=document.getElementById("kp-bulk-mobile-dropdown");document.getElementById("kp-bulk-mobile-btn")?.addEventListener("click",u=>{u.stopPropagation(),b.hidden=!b.hidden}),document.addEventListener("click",u=>{b&&!d?.contains(u.target)&&(b.hidden=!0)},{capture:!0}),["start","stop","restart","flush","recreate"].forEach(u=>{document.getElementById(`bulk-mobile-${u}`)?.addEventListener("click",h=>{h.preventDefault(),b.hidden=!0;let f=l().filter(v=>v.dataset.siteType!=="6").map(v=>v.dataset.siteId);document.dispatchEvent(new CustomEvent("kp:bulk-action",{detail:{action:u,ids:f}}))})}),document.querySelectorAll(".kp-sort-icon").forEach(u=>{u.textContent=" \u2195"}),r()}var j=null,O=null;function pa(){O&&(O.close(),O=null);let e=(s,i)=>i>0?`${(s/i*100).toFixed(1)}%`:"\u2014",t=location.protocol==="https:"?"wss":"ws",a=new WebSocket(`${t}://${location.host}/api/stats/host`);O=a,a.onmessage=s=>{let i=document.getElementById("dash-host-cpu");if(!i){a.close();return}let n;try{n=JSON.parse(s.data)}catch{return}i.textContent=`${(n.cpu_percent??0).toFixed(1)}%`,document.getElementById("dash-host-mem").textContent=e(n.mem_used,n.mem_total),document.getElementById("dash-host-mem-sub").textContent=`${L(n.mem_used??0)} / ${L(n.mem_total??0)}`,document.getElementById("dash-host-disk").textContent=e(n.disk_used,n.disk_total),document.getElementById("dash-host-disk-sub").textContent=`${L(n.disk_used??0)} / ${L(n.disk_total??0)}`,document.getElementById("dash-host-procs").textContent=(n.procs_running??0).toLocaleString(),document.getElementById("dash-host-procs-sub").textContent=`of ${(n.procs_total??0).toLocaleString()} threads`},a.onclose=()=>{O===a&&(O=null)}}async function Ze(e){let[t,a]=await Promise.all([k.get("/sites").catch(()=>[]),k.get("/stats/traffic").catch(()=>null)]),s=t.filter(l=>l.SiteType!==6&&l.SiteStatus===1).length,i=t.filter(l=>l.SiteType===6).length,n=t.filter(l=>l.SiteType!==6&&l.SiteStatus===4).length,o=window.KP?.user?.role===99;if(e.innerHTML=`

        <!-- global counts -->
        <div class="kp-view-header">
            <h1 class="kp-view-title kp-cursor" style="font-size:2rem;">Dashboard</h1>
        </div>
        <div class="uk-grid-small uk-child-width-1-2 uk-child-width-1-4@m uk-margin-medium-bottom" uk-grid>
            <div>
                <div class="kp-stat-card">
                    <div class="uk-flex uk-flex-between">
                        <div>
                            <div class="kp-stat-value">${t.length}</div>
                            <div class="kp-stat-label">Total Sites</div>
                        </div>
                        <span class="kp-stat-icon" uk-icon="icon: world; ratio: 1.75"></span>
                    </div>
                </div>
            </div>
            <div>
                <div class="kp-stat-card">
                    <div class="uk-flex uk-flex-between">
                        <div>
                            <div class="kp-stat-value" style="color:var(--kp-success)">${s}</div>
                            <div class="kp-stat-label">Running</div>
                        </div>
                        <span style="color:var(--kp-success)" uk-icon="icon: check; ratio: 1.75"></span>
                    </div>
                </div>
            </div>
            <div>
                <div class="kp-stat-card">
                    <div class="uk-flex uk-flex-between">
                        <div>
                            <div class="kp-stat-value" style="color:var(--kp-cyan)">${i}</div>
                            <div class="kp-stat-label">Proxies</div>
                        </div>
                        <span style="color:var(--kp-cyan)" uk-icon="icon: link; ratio: 1.75"></span>
                    </div>
                </div>
            </div>
            <div>
                <div class="kp-stat-card">
                    <div class="uk-flex uk-flex-between">
                        <div>
                            <div class="kp-stat-value" style="color:var(--kp-danger)">${n}</div>
                            <div class="kp-stat-label">Errors</div>
                        </div>
                        <span style="color:var(--kp-danger)" uk-icon="icon: warning; ratio: 1.75"></span>
                    </div>
                </div>
            </div>
        </div>

        <!-- live host usage \u2014 admin only -->
        ${o?`
        <div class="uk-grid-small uk-child-width-1-2 uk-child-width-1-4@m uk-margin-medium-bottom" uk-grid>
            <div>
                <div class="kp-stat-card">
                    <div class="uk-flex uk-flex-between">
                        <div>
                            <div class="kp-stat-value" id="dash-host-cpu">\u2014</div>
                            <div class="kp-stat-label">Host CPU</div>
                            <div class="kp-muted uk-text-small kp-mono">&nbsp;</div>
                        </div>
                        <span class="kp-stat-icon" uk-icon="icon: bolt; ratio: 1.75"></span>
                    </div>
                </div>
            </div>
            <div>
                <div class="kp-stat-card">
                    <div class="uk-flex uk-flex-between">
                        <div>
                            <div class="kp-stat-value" id="dash-host-mem">\u2014</div>
                            <div class="kp-stat-label">Host Memory</div>
                            <div class="kp-muted uk-text-small kp-mono" id="dash-host-mem-sub">&nbsp;</div>
                        </div>
                        <span class="kp-stat-icon" uk-icon="icon: server; ratio: 1.75"></span>
                    </div>
                </div>
            </div>
            <div>
                <div class="kp-stat-card">
                    <div class="uk-flex uk-flex-between">
                        <div>
                            <div class="kp-stat-value" id="dash-host-disk">\u2014</div>
                            <div class="kp-stat-label">Host Disk</div>
                            <div class="kp-muted uk-text-small kp-mono" id="dash-host-disk-sub">&nbsp;</div>
                        </div>
                        <span class="kp-stat-icon" uk-icon="icon: database; ratio: 1.75"></span>
                    </div>
                </div>
            </div>
            <div>
                <div class="kp-stat-card">
                    <div class="uk-flex uk-flex-between">
                        <div>
                            <div class="kp-stat-value" id="dash-host-procs">\u2014</div>
                            <div class="kp-stat-label">Running Processes</div>
                            <div class="kp-muted uk-text-small kp-mono" id="dash-host-procs-sub">&nbsp;</div>
                        </div>
                        <span class="kp-stat-icon" uk-icon="icon: list; ratio: 1.75"></span>
                    </div>
                </div>
            </div>
        </div>
        `:""}

        <!-- global traffic -->
        <div class="kp-view-header uk-margin-top">
            <h2 class="kp-view-title" style="font-size:1.25rem">Traffic
                <span class="kp-muted uk-text-small" style="font-weight:400"> \u2014 last 24 hours</span>
            </h2>
        </div>
        <div class="kp-card uk-padding-small uk-margin-medium-bottom">
            <div class="uk-grid-small uk-child-width-1-2 uk-child-width-1-4@m uk-margin-small-bottom" uk-grid>
                <div><div class="kp-stat-card" style="padding:16px">
                    <div class="kp-stat-value" style="font-size:1.6rem;color:var(--kp-success)">
                        ${(a?.status_codes?.["2xx"]??0).toLocaleString()}
                    </div>
                    <div class="kp-stat-label" style="color:var(--kp-success)">2xx Success</div>
                </div></div>
                <div><div class="kp-stat-card" style="padding:16px">
                    <div class="kp-stat-value" style="font-size:1.6rem;color:var(--kp-cyan)">
                        ${(a?.status_codes?.["3xx"]??0).toLocaleString()}
                    </div>
                    <div class="kp-stat-label" style="color:var(--kp-cyan)">3xx Redirect</div>
                </div></div>
                <div><div class="kp-stat-card" style="padding:16px">
                    <div class="kp-stat-value" style="font-size:1.6rem;color:var(--kp-warning)">
                        ${(a?.status_codes?.["4xx"]??0).toLocaleString()}
                    </div>
                    <div class="kp-stat-label" style="color:var(--kp-warning)">4xx Client Err</div>
                </div></div>
                <div><div class="kp-stat-card" style="padding:16px">
                    <div class="kp-stat-value" style="font-size:1.6rem;color:var(--kp-danger)">
                        ${(a?.status_codes?.["5xx"]??0).toLocaleString()}
                    </div>
                    <div class="kp-stat-label" style="color:var(--kp-danger)">5xx Server Err</div>
                </div></div>
            </div>
            <div class="uk-margin-small-bottom" style="color:var(--kp-text-dim);font-size:0.85rem">
                Total Bandwidth:
                <span style="color:var(--kp-cyan);font-family:'JetBrains Mono',monospace">
                    ${L(a?.total_bandwidth??0)}
                </span>
            </div>
            <div style="position:relative;height:180px">
                <canvas id="dash-traffic-chart"></canvas>
            </div>
        </div>

        <!-- drilldown modal \u2014 populated on 4xx/5xx bar click -->
        <div id="stats-drilldown-modal" uk-modal>
            <div class="uk-modal-dialog uk-modal-body" style="min-width:min(96vw,900px)">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <h3 class="kp-view-title uk-margin-small-bottom" id="stats-drilldown-title">Request Detail</h3>
                <div id="stats-drilldown-body">
                    <div uk-spinner="ratio:0.8" style="color:var(--kp-blue)"></div>
                </div>
            </div>
        </div>

        <!-- global pod aggregate + top sites -->
        <div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@m uk-margin-medium-bottom" uk-grid>
            <div>

                <!-- recent sites -->
                <div class="kp-view-header">
                    <h2 class="kp-view-title" style="font-size:1.25rem">Recent Sites</h2>
                </div>
                <div class="">
                    ${t.length===0?emptyState("world","No sites yet"):t.slice(-3).reverse().map(l=>Ye(l,t)).join("")}
                </div>

            </div>
            <div>

                <!-- top traffic sites -->
                <div class="kp-view-header">
                    <h2 class="kp-view-title" style="font-size:1.25rem">Top Sites by Traffic</h2>
                </div>
                <div class="kp-table-wrap">
                    <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
                        <thead><tr>
                            <th style="color:var(--kp-text-dim);font-size:0.75rem">Host</th>
                            <th style="color:var(--kp-text-dim);font-size:0.75rem;text-align:right">Hits</th>
                        </tr></thead>
                        <tbody>
                            ${(a?.top_sites??[]).length===0?'<tr><td colspan="2" class="kp-muted uk-text-small">No traffic data</td></tr>':(a?.top_sites??[]).map(l=>`
                                    <tr>
                                        <td class="kp-mono" style="font-size:0.8rem">${g(l.name)}</td>
                                        <td style="text-align:right;color:var(--kp-cyan);
                                            font-family:'JetBrains Mono',monospace;font-size:0.8rem">
                                            ${l.count.toLocaleString()}
                                        </td>
                                    </tr>`).join("")}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `,o&&pa(),a?.hits_per_hour?.length){await Se();let l=document.getElementById("dash-traffic-chart");l&&window.Chart&&(j&&(j.destroy(),j=null),j=new window.Chart(l,{type:"bar",data:{labels:a.hits_per_hour.map(r=>new Date(r.hour).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})),datasets:[{label:"2xx",data:a.hits_per_hour.map(r=>r["2xx"]),backgroundColor:"rgba(39,174,96,0.75)",borderColor:"rgba(39,174,96,1)",borderWidth:1,borderRadius:3},{label:"3xx",data:a.hits_per_hour.map(r=>r["3xx"]),backgroundColor:"rgba(43,142,255,0.75)",borderColor:"rgba(43,142,255,1)",borderWidth:1,borderRadius:3},{label:"4xx",data:a.hits_per_hour.map(r=>r["4xx"]),backgroundColor:"rgba(255,171,0,0.75)",borderColor:"rgba(255,171,0,1)",borderWidth:1,borderRadius:3},{label:"5xx",data:a.hits_per_hour.map(r=>r["5xx"]),backgroundColor:"rgba(235,59,90,0.75)",borderColor:"rgba(235,59,90,1)",borderWidth:1,borderRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(r,m)=>{if(!m||!m.length)return;let p=m[0].datasetIndex,d=j.data.datasets[p].label;if(d!=="4xx"&&d!=="5xx")return;let b=a.hits_per_hour[m[0].index]?.hour;b&&Ee("/stats/drilldown",b,d,!0)},onHover:(r,m)=>{if(!m||!m.length){r.native.target.style.cursor="default";return}let p=j.data.datasets[m[0].datasetIndex].label;r.native.target.style.cursor=p==="4xx"||p==="5xx"?"pointer":"default"},plugins:{legend:{display:!0,labels:{color:"#6b8cae",font:{size:11}},onHover:r=>{r.native.target.style.cursor="pointer"},onLeave:r=>{r.native.target.style.cursor="default"}},tooltip:{mode:"index",backgroundColor:"#0c1530",borderColor:"#1a2a4a",borderWidth:1,titleColor:"#dde8f5",bodyColor:"#6b8cae"}},scales:{x:{stacked:!0,ticks:{color:"#6b8cae",font:{size:10},maxRotation:45},grid:{color:"rgba(26,42,74,0.6)"}},y:{stacked:!0,ticks:{color:"#6b8cae",font:{size:10}},grid:{color:"rgba(26,42,74,0.6)"},beginAtZero:!0}}}}))}document.getElementById("dash-new-site")?.addEventListener("click",()=>re())}function et(){return at({title:"Add Node",intro:"On the child node, use Generate Pairing Code, then enter its URL and code here.",okLabel:"Pair",okIcon:"link",fields:`
            <label class="kp-label">Name</label>
            <input id="kp-node-name" class="uk-input kp-input" type="text" maxlength="100" autocomplete="off">
            <label class="kp-label uk-margin-small-top">URL</label>
            <input id="kp-node-url" class="uk-input kp-input" type="text" placeholder="https://node.example.com" autocomplete="off">
            <label class="kp-label uk-margin-small-top">Pairing Code</label>
            <input id="kp-node-code" class="uk-input kp-input" type="text" placeholder="XXXX-XXXX-XXXX-XXXX" autocomplete="off"
                style="letter-spacing:0.2em;text-align:center">`,read:()=>{let e=document.getElementById("kp-node-name"),t=document.getElementById("kp-node-url"),a=document.getElementById("kp-node-code");for(let s of[e,t,a])if(!s.value.trim())return s.focus(),null;return{name:e.value.trim(),url:t.value.trim(),code:a.value.trim()}}})}function tt(e){return at({title:`Edit Node \u2014 ${g(e.name)}`,intro:"A URL change or re-key opens the child in a new tab to apply it; it takes effect once the child confirms.",okLabel:"Save",okIcon:"pencil",fields:`
            <label class="kp-label">Name</label>
            <input id="kp-node-name" class="uk-input kp-input" type="text" maxlength="100" value="${g(e.name)}" autocomplete="off">
            <label class="kp-label uk-margin-small-top">URL</label>
            <input id="kp-node-url" class="uk-input kp-input" type="text" value="${g(e.url)}" autocomplete="off"
                ${e.status!==2?"disabled":""}>
            <label class="uk-margin-small-top uk-display-block">
                <input id="kp-node-rekey" class="uk-checkbox" type="checkbox" ${e.status!==2?"disabled":""}> &nbsp;Re-key this link
            </label>`,read:()=>{let t=document.getElementById("kp-node-name");return t.value.trim()?{name:t.value.trim(),url:document.getElementById("kp-node-url").value.trim(),rekey:document.getElementById("kp-node-rekey").checked}:(t.focus(),null)}})}function at({title:e,intro:t,okLabel:a,okIcon:s,fields:i,read:n}){return new Promise(o=>{let l="kp-node-modal";document.getElementById(l)?.remove();let r=`
            <div id="${l}" uk-modal>
                <div class="uk-modal-dialog kp-modal uk-modal-body" style="max-width:460px">
                    <h3 class="uk-modal-title">${e}</h3>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">${t}</p>
                    ${i}
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button class="uk-button kp-btn-ghost uk-modal-close" id="kp-node-cancel">Cancel</button>
                        <button class="uk-button kp-btn-primary" id="kp-node-ok">
                            <span uk-icon="${s}"></span> ${a}
                        </button>
                    </div>
                </div>
            </div>`;document.body.insertAdjacentHTML("beforeend",r);let m=document.getElementById(l),p=UIkit.modal(m),d=!1,b=u=>{d||(d=!0,p.hide(),setTimeout(()=>m.remove(),300),o(u))};document.getElementById("kp-node-ok").addEventListener("click",()=>{let u=n();u&&b(u)}),document.getElementById("kp-node-cancel").addEventListener("click",()=>b(null),{once:!0}),m.addEventListener("hidden",()=>b(null),{once:!0}),m.querySelectorAll("input[type=text]").forEach(u=>u.addEventListener("keydown",h=>{h.key==="Enter"&&document.getElementById("kp-node-ok").click()})),p.show(),setTimeout(()=>document.getElementById("kp-node-name")?.focus(),150)})}var ue=2;async function D(e){if(!P()){e.innerHTML=T("Access denied");return}let t=await k.get("/nodes");e.innerHTML=`
        <div id="kp-nodes">
            <div class="kp-view-header">
                <h1 class="kp-view-title kp-cursor" style="font-size:2rem;">Nodes</h1>
                <button class="uk-button kp-btn-primary" data-action="node-add">
                    <span uk-icon="plus"></span> Add Node
                </button>
            </div>
            ${t.length?`
            <div class="kp-table-wrap">
                <div class="uk-overflow-auto">
                <table class="uk-table uk-table-divider uk-table-middle uk-margin-remove">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>URL</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${t.map(ma).join("")}
                    </tbody>
                </table>
                </div>
            </div>`:N("server","No child nodes yet")}
        </div>`;let a=document.getElementById("kp-nodes");a.addEventListener("click",s=>ka(s,e,t)),window.addEventListener("focus",()=>{document.getElementById("kp-nodes")===a&&D(e)},{once:!0})}function ma(e){let t=e.status===ue?'<span class="kp-status kp-status-running">Paired</span>':'<span class="kp-status kp-status-restarting">Pending</span>';return`<tr>
        <td><strong>${g(e.name)}</strong></td>
        <td><span style="font-family:monospace">${g(e.url)}</span></td>
        <td>${t}</td>
        <td><span class="kp-muted">${g(e.created)}</span></td>
        <td>
            <div class="uk-flex" style="gap:6px;justify-content:flex-end">
                ${e.status===ue?`
                <button class="uk-button kp-btn-primary kp-btn-sm" data-action="node-open" data-nid="${e.id}" uk-tooltip="Open the Node">
                    <span uk-icon="icon: sign-in;"></span>
                </button>`:""}
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="node-edit" data-nid="${e.id}" uk-tooltip="Edit the Node">
                    <span uk-icon="icon: pencil;"></span>
                </button>
                <button class="uk-button kp-btn-secondary kp-btn-sm" data-action="node-remove" data-nid="${e.id}" uk-tooltip="Remove the Node">
                    <span uk-icon="icon: trash;"></span>
                </button>
                ${e.status===ue?`
                <button class="uk-button kp-btn-danger kp-btn-sm" data-action="node-force-remove" data-nid="${e.id}" uk-tooltip="Force remove without the child">
                    <span uk-icon="icon: ban;"></span>
                </button>`:""}
            </div>
        </td>
    </tr>`}async function ka(e,t,a){let s=e.target.closest("[data-action^='node-']");if(!s)return;e.stopPropagation();let i=a.find(n=>n.id===Number(s.dataset.nid));try{switch(s.dataset.action){case"node-add":{let n=await et();if(!n)return;let o=await k.post("/nodes",n);de(o.link),c.success("Finish pairing in the new tab"),await D(t);break}case"node-open":{let n=await k.post(`/nodes/${i.id}/sso`);de(n.link);break}case"node-edit":{let n=await tt(i);if(!n)return;let o=await k.put(`/nodes/${i.id}`,n);o?.link?(de(o.link),c.success("Finish the update in the new tab")):c.success("Node updated"),await D(t);break}case"node-remove":{let n=i.status===ue;if(!await $("Remove Node",n?`Unpair ${i.name}? The child opens in a new tab to drop this parent and its synced users.`:`Remove the pending node ${i.name}?`))return;let l=await k.delete(`/nodes/${i.id}`);l?.link?(de(l.link),c.success("Finish unpairing in the new tab")):(c.success("Node removed"),await D(t));break}case"node-force-remove":{if(!await $("Force Remove Node",`Remove ${i.name} here without contacting it? Only for a child that is gone \u2014 a live child keeps trusting this parent until it is unparented on that host.`))return;await k.delete(`/nodes/${i.id}?force=1`),c.success("Node removed"),await D(t);break}}}catch(n){c.error(n.message)}}function de(e){let t=document.createElement("a");t.href=e,t.target="_blank",t.rel="noopener noreferrer",document.body.appendChild(t),t.click(),t.remove()}function Q(e=null){let t=e?`/sites/${e}/security/ip`:"/security/ip",a=e?`/sites/${e}/security/ua`:"/security/ua",s=e?`/sites/${e}/security/country`:"/security/country",i=e?`/sites/${e}/security/asn`:"/security/asn";return`
        <div id="security-panel" data-ip-base="${t}" data-ua-base="${a}" data-geo-base="${s}" data-asn-base="${i}" ${e?`data-site-id="${e}"`:""}>

            <!-- tab pills -->
            <ul class="kp-tab-pills" id="kp-sec-pills">
                <li data-tab="ip"><a href="#"><span uk-icon="icon: location; ratio: 0.85"></span> IP Rules</a></li>
                <li data-tab="ua"><a href="#"><span uk-icon="icon: laptop; ratio: 0.85"></span> User-Agent</a></li>
                <li data-tab="country"><a href="#"><span uk-icon="icon: world; ratio: 0.85"></span> Country</a></li>
                <li data-tab="asn"><a href="#"><span uk-icon="icon: server; ratio: 0.85"></span> ASN</a></li>
                ${e?`
                <li data-tab="malware"><a href="#"><span uk-icon="icon: bolt; ratio: 0.85"></span> Malware</a></li>
                `:""}
                ${e?"":`
                <li data-tab="proxies"><a href="#"><span uk-icon="icon: link; ratio: 0.85"></span> Trusted Proxies</a></li>
                <li data-tab="bypass"><a href="#"><span uk-icon="icon: unlock; ratio: 0.85"></span> Bypass</a></li>
                `}
            </ul>

            <!-- switcher panels -->
            <ul class="uk-switcher uk-margin-large-bottom" id="kp-sec-switcher">

                <!-- ip rules -->
                <li>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">
                        <span uk-icon="icon: warning; ratio: 0.75"></span>
                        The Spamhaus DROP lists are enforced alongside these rules on every
                        request. Whitelist an IP here to allow it through regardless.
                        <a href="https://www.spamhaus.org/blocklists/do-not-route-or-peer/" target="_blank" rel="noopener">
                            About Spamhaus DROP
                        </a>
                    </p>
                    <div class="kp-card uk-padding-small">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">IP Rules</h3>
                            <div class="uk-flex" style="gap:8px">
                                <a class="uk-button kp-btn-ghost kp-btn-sm" href="/api${t}/export" download="${e?`site-${e}-ip-rules.csv`:"podnest-global-ip-rules.csv"}" uk-tooltip="Export IP rules as CSV">
                                    <span uk-icon="download"></span>
                                </a>
                                <label class="uk-button kp-btn-ghost kp-btn-sm" style="cursor:pointer" uk-tooltip="Import IP rules from CSV">
                                    <span uk-icon="upload"></span>
                                    <input type="file" id="sec-ip-import" accept=".csv" style="display:none">
                                </label>
                                <button class="uk-button kp-btn-primary kp-btn-sm" id="sec-ip-save" uk-tooltip="Save the IP Rules">
                                    <span uk-icon="check"></span>
                                </button>
                            </div>
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-bottom">
                            One IP address or CIDR block per line (e.g. <span class="kp-mono">1.2.3.4</span>
                            or <span class="kp-mono">10.0.0.0/8</span>).
                            A whitelisted IP is allowed outright, ahead of both the global and
                            per-site blacklists. Whitelist is disabled when empty.
                        </p>
                        <div class="uk-grid-small" uk-grid>
                            <div class="uk-width-1-2@s">
                                <label class="kp-label">
                                    <span uk-icon="icon: check; ratio: 0.75" style="color:var(--kp-success)"></span>
                                    Whitelist
                                </label>
                                <textarea class="uk-textarea kp-textarea" id="sec-ip-whitelist" rows="6"
                                    placeholder="# allow only these IPs&#10;1.2.3.4&#10;10.0.0.0/8"></textarea>
                            </div>
                            <div class="uk-width-1-2@s">
                                <label class="kp-label">
                                    <span uk-icon="icon: ban; ratio: 0.75" style="color:var(--kp-danger)"></span>
                                    Blacklist
                                </label>
                                <textarea class="uk-textarea kp-textarea" id="sec-ip-blacklist" rows="6"
                                    placeholder="# block these IPs&#10;5.6.7.8&#10;192.168.99.0/24"></textarea>
                            </div>
                        </div>
                    </div>
                </li>

                <!-- user-agent rules -->
                <li>
                    <div class="kp-card uk-padding-small">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">User-Agent Rules</h3>
                            <div class="uk-flex" style="gap:8px">
                                <a class="uk-button kp-btn-ghost kp-btn-sm" href="/api${a}/export" download="${e?`site-${e}-ua-rules.csv`:"podnest-global-ua-rules.csv"}" uk-tooltip="Export UA rules as CSV">
                                    <span uk-icon="download"></span>
                                </a>
                                <label class="uk-button kp-btn-ghost kp-btn-sm" style="cursor:pointer" uk-tooltip="Import UA rules from CSV">
                                    <span uk-icon="upload"></span>
                                    <input type="file" id="sec-ua-import" accept=".csv" style="display:none">
                                </label>
                                <button class="uk-button kp-btn-primary kp-btn-sm" id="sec-ua-save" uk-tooltip="Save the User-Agent Rules">
                                    <span uk-icon="check"></span>
                                </button>
                            </div>
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-bottom">
                            One substring per line \u2014 matched case-insensitively against the full User-Agent header.
                            Blacklist always wins. Whitelist is disabled when empty.
                        </p>
                        <div class="uk-grid-small" uk-grid>
                            <div class="uk-width-1-2@s">
                                <label class="kp-label">
                                    <span uk-icon="icon: check; ratio: 0.75" style="color:var(--kp-success)"></span>
                                    Whitelist
                                </label>
                                <textarea class="uk-textarea kp-textarea" id="sec-ua-whitelist" rows="6"
                                    placeholder="# allow only these agents&#10;mozilla&#10;googlebot"></textarea>
                            </div>
                            <div class="uk-width-1-2@s">
                                <label class="kp-label">
                                    <span uk-icon="icon: ban; ratio: 0.75" style="color:var(--kp-danger)"></span>
                                    Blacklist
                                </label>
                                <textarea class="uk-textarea kp-textarea" id="sec-ua-blacklist" rows="6"
                                    placeholder="# block these agents&#10;sqlmap&#10;nikto&#10;masscan"></textarea>
                            </div>
                        </div>
                    </div>
                </li>

                <!-- country rules -->
                <li>
                    <div class="kp-card uk-padding-small">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">Country Rules</h3>
                            <div class="uk-flex" style="gap:8px">
                                <button class="uk-button kp-btn-primary kp-btn-sm" id="sec-geo-save" uk-tooltip="Save the Country Rules">
                                    <span uk-icon="check"></span>
                                </button>
                            </div>
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-bottom">
                            One ISO 3166-1 alpha-2 country code per line (e.g. <span class="kp-mono">US</span>
                            or <span class="kp-mono">DE</span>).
                            Blacklist always wins. Whitelist is disabled when empty.
                            Unresolvable IPs (private ranges, unknown) are always allowed.
                        </p>
                        <div class="uk-grid-small" uk-grid>
                            <div class="uk-width-1-2@s">
                                <label class="kp-label">
                                    <span uk-icon="icon: check; ratio: 0.75" style="color:var(--kp-success)"></span>
                                    Whitelist
                                </label>
                                <textarea class="uk-textarea kp-textarea" id="sec-geo-whitelist" rows="6"
                                    placeholder="# allow only these countries&#10;US&#10;CA"></textarea>
                            </div>
                            <div class="uk-width-1-2@s">
                                <label class="kp-label">
                                    <span uk-icon="icon: ban; ratio: 0.75" style="color:var(--kp-danger)"></span>
                                    Blacklist
                                </label>
                                <textarea class="uk-textarea kp-textarea" id="sec-geo-blacklist" rows="6"
                                    placeholder="# block these countries&#10;CN&#10;RU"></textarea>
                            </div>
                        </div>
                    </div>
                </li>

                <!-- asn rules -->
                <li>
                    <div class="kp-card uk-padding-small">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">ASN Rules</h3>
                            <div class="uk-flex uk-flex-middle" style="gap:8px">
                                <button class="uk-button kp-btn-ghost kp-btn-sm" id="sec-asn-lookup" uk-tooltip="Look up the ASN for an IP or domain">
                                    <span uk-icon="eye"></span>
                                </button>
                                <div style="width:1px;align-self:stretch;background:var(--kp-border)"></div>
                                <button class="uk-button kp-btn-primary kp-btn-sm" id="sec-asn-save" uk-tooltip="Save the ASN Rules">
                                    <span uk-icon="check"></span>
                                </button>
                            </div>
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-bottom">
                            One autonomous system number per line (e.g. <span class="kp-mono">AS15169</span>
                            or <span class="kp-mono">15169</span>).
                            Blacklist always wins. Whitelist is disabled when empty.
                            Unresolvable IPs (private ranges, unknown) are always allowed.
                        </p>
                        <div class="uk-grid-small" uk-grid>
                            <div class="uk-width-1-2@s">
                                <label class="kp-label">
                                    <span uk-icon="icon: check; ratio: 0.75" style="color:var(--kp-success)"></span>
                                    Whitelist
                                </label>
                                <textarea class="uk-textarea kp-textarea" id="sec-asn-whitelist" rows="6"
                                    placeholder="# allow only these networks&#10;AS7922&#10;AS20115"></textarea>
                            </div>
                            <div class="uk-width-1-2@s">
                                <label class="kp-label">
                                    <span uk-icon="icon: ban; ratio: 0.75" style="color:var(--kp-danger)"></span>
                                    Blacklist
                                </label>
                                <textarea class="uk-textarea kp-textarea" id="sec-asn-blacklist" rows="6"
                                    placeholder="# block these networks&#10;AS16509&#10;AS14061"></textarea>
                            </div>
                        </div>
                    </div>
                </li>

                ${e?`
                <!-- malware scans -->
                <li>
                    <div class="kp-card uk-padding-small">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">Malware Scans</h3>
                            <div class="uk-flex" style="gap:8px">
                                <button class="uk-button kp-btn-primary kp-btn-sm" id="sec-malware-scan" uk-tooltip="Scan this site now" disabled>
                                    <span uk-icon="search"></span>
                                </button>
                            </div>
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-bottom">
                            The site's html directory is scanned nightly at midnight with ClamAV and Linux Malware Detect.
                            Findings are reported only \u2014 quarantine moves a file out of
                            the site and out of SFTP reach. History is kept for <span id="sec-malware-retain">30</span> days.
                        </p>
                        <div id="sec-malware-list">
                            <div uk-spinner="ratio: 0.6"></div>
                        </div>
                    </div>
                </li>
                `:""}

                ${e?"":`
                <!-- trusted proxy ranges -->
                <li>
                    <div class="kp-card uk-padding-small">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">Trusted Proxy Ranges</h3>
                            <div class="uk-flex" style="gap:8px">
                                <a class="uk-button kp-btn-ghost kp-btn-sm" href="/api/settings/trusted-proxies/export" download="podnest-trusted-proxies.csv" uk-tooltip="Export trusted proxies">
                                    <span uk-icon="download"></span>
                                </a>
                                <label class="uk-button kp-btn-ghost kp-btn-sm" style="cursor:pointer" uk-tooltip="Import trusted proxies from CSV">
                                    <span uk-icon="upload"></span>
                                    <input type="file" id="sec-tp-import" accept=".csv" style="display:none">
                                </label>
                                <button class="uk-button kp-btn-primary kp-btn-sm" id="sec-tp-save" uk-tooltip="Save Trusted Proxy Ranges">
                                    <span uk-icon="check"></span>
                                </button>
                            </div>
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-bottom">
                            Custom IP ranges (one CIDR per line) to trust in addition to the
                            auto-fetched Cloudflare, Fastly, and CloudFront ranges.
                            <code>X-Forwarded-For</code> is only honoured when a request arrives
                            from one of these addresses.
                        </p>
                        <textarea class="uk-textarea kp-textarea kp-mono" id="sec-tp-cidrs" rows="12"
                            placeholder="192.168.1.0/24"></textarea>
                        <p class="kp-muted uk-text-small uk-margin-small-top">
                            One IPv4 or IPv6 CIDR per line. Auto-fetched provider ranges are
                            managed automatically and do not need to be entered here.
                        </p>
                    </div>
                </li>

                <!-- security bypass -->
                <li>
                    <div class="kp-card uk-padding-small">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">Security Bypass</h3>
                            <div class="uk-flex" style="gap:8px">
                                <button class="uk-button kp-btn-primary kp-btn-sm" id="sec-bypass-save" uk-tooltip="Save Bypass Rules">
                                    <span uk-icon="check"></span>
                                </button>
                            </div>
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-bottom">
                            IPs or CIDRs that skip all security checks (IP rules, UA rules, WAF).
                            Use for trusted services that must not be blocked. Supports inline
                            notes with <code>#</code> e.g. <code>1.2.3.4/32 # WP Umbrella</code>
                        </p>
                        <textarea class="uk-textarea kp-textarea kp-mono" id="sec-bypass-cidrs" rows="12"
                            placeholder="1.2.3.4/32 # WP Umbrella&#10;2001:db8::/32 # monitoring"></textarea>
                        <p class="kp-muted uk-text-small uk-margin-small-top">
                            One IPv4, IPv6, or CIDR per line. Bypassed IPs are still proxied normally \u2014 only enforcement is skipped.
                        </p>
                    </div>
                </li>
                `}

            </ul>
        </div>`}function me(e,t){let a=e.querySelector("#security-panel"),s=e.querySelector("#kp-sec-pills"),i=e.querySelector("#kp-sec-switcher");if(!a||!s||!i)return;let n=a.dataset.siteId,o=[...s.querySelectorAll(":scope > li")],l=(r,m)=>{if(UIkit.switcher(i).show(r),o.forEach((d,b)=>d.classList.toggle("kp-pill-active",b===r)),!m)return;let p=o[r].dataset.tab;history.replaceState(null,"",n?`#site-detail/${n}/${p}`:r===0?"#security":`#security/${p}`)};o.forEach((r,m)=>{r.querySelector(":scope > a").addEventListener("click",p=>{p.preventDefault(),l(m,!0)})}),l(Math.max(0,o.findIndex(r=>r.dataset.tab===t)),!1)}async function H(e){let t=e.querySelector("#security-panel");if(!t)return;let a=t.dataset.ipBase,s=t.dataset.uaBase;try{let i=t.dataset.geoBase,n=t.dataset.asnBase,o=[k.get(a),k.get(s),k.get(i),k.get(n)];t.dataset.siteId||o.push(k.get("/settings/trusted-proxies"),k.get("/security/bypass"));let[l,r,m,p,d,b]=await Promise.all(o);if(!e.querySelector("#sec-ip-whitelist"))return;if(e.querySelector("#sec-ip-whitelist").value=l.whitelist??"",e.querySelector("#sec-ip-blacklist").value=l.blacklist??"",e.querySelector("#sec-ua-whitelist").value=r.whitelist??"",e.querySelector("#sec-ua-blacklist").value=r.blacklist??"",e.querySelector("#sec-geo-whitelist").value=m.whitelist??"",e.querySelector("#sec-geo-blacklist").value=m.blacklist??"",e.querySelector("#sec-asn-whitelist").value=p.whitelist??"",e.querySelector("#sec-asn-blacklist").value=p.blacklist??"",d){let u=e.querySelector("#sec-tp-cidrs");u&&(u.value=d.trusted_proxies_custom??"")}if(b){let u=e.querySelector("#sec-bypass-cidrs");u&&(u.value=b.bypass??"")}}catch(i){c.error("Failed to load security rules: "+i.message)}t.dataset.siteId&&pe(e,t.dataset.siteId)}var ba={1:["restarting","Running"],2:["running","Clean"],3:["error","Infected"],4:["stopped","Failed"]},st=null;function ha(e){return e.scannable?e.scans.length?`
        <div class="uk-overflow-auto">
        <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
            <thead>
                <tr>
                    <th>Started</th>
                    <th>Trigger</th>
                    <th>Status</th>
                    <th>Files</th>
                    <th>Hits</th>
                </tr>
            </thead>
            <tbody>${e.scans.map(a=>{let[s,i]=ba[a.status]||["stopped","Unknown"],n=a.status===1,o=(a.findings||[]).map(l=>`
            <tr>
                <td colspan="4" style="padding-left:24px">
                    <div class="kp-mono" style="font-size:0.8rem">${g(l.path)}</div>
                    <div class="kp-muted uk-text-small">${g(l.signature)}</div>
                </td>
                <td>
                    ${l.quarantined?'<span class="kp-muted uk-text-small">Quarantined</span>':`<button class="uk-button kp-btn-danger kp-btn-sm sec-malware-quarantine" data-id="${l.id}" uk-tooltip="Move this file into quarantine">
                               <span uk-icon="lock"></span>
                           </button>`}
                </td>
            </tr>`).join("");return`
            <tr>
                <td>${new Date(a.started).toLocaleString()}</td>
                <td>${a.trigger==="manual"?"Manual":"Scheduled"}</td>
                <td>
                    <span class="kp-status kp-status-${s}">${i}</span>
                    ${a.error?`<div class="kp-muted uk-text-small">${g(a.error)}</div>`:""}
                </td>
                <td>${n?"\u2014":a.files_scanned}</td>
                <td>${n?"\u2014":a.infected}</td>
            </tr>${o}`}).join("")}</tbody>
        </table>
        </div>`:'<p class="kp-muted uk-text-small uk-margin-remove">No scans yet.</p>':'<p class="kp-muted uk-text-small uk-margin-remove">This site has no html directory to scan.</p>'}async function pe(e,t){if(clearTimeout(st),!!e.querySelector("#sec-malware-list"))try{let a=await k.get(`/sites/${t}/malware`),s=e.querySelector("#sec-malware-list");if(!s)return;let i=a.scans.some(n=>n.status===1);s.innerHTML=ha(a),e.querySelector("#sec-malware-scan").disabled=!a.scannable||i,e.querySelector("#sec-malware-retain").textContent=a.retain_days,i&&(st=setTimeout(()=>pe(e,t),1e4))}catch(a){c.error("Failed to load malware scans: "+a.message)}}function ke(e){let t=e.querySelector("#security-panel");if(!t)return;let a=t.dataset.ipBase,s=t.dataset.uaBase,i=t.dataset.geoBase;e.querySelector("#sec-ip-save")?.addEventListener("click",async()=>{let n=e.querySelector("#sec-ip-save"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.put(a,{whitelist:e.querySelector("#sec-ip-whitelist").value,blacklist:e.querySelector("#sec-ip-blacklist").value}),c.success("IP rules saved")}catch(l){c.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),e.querySelector("#sec-ua-save")?.addEventListener("click",async()=>{let n=e.querySelector("#sec-ua-save"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.put(s,{whitelist:e.querySelector("#sec-ua-whitelist").value,blacklist:e.querySelector("#sec-ua-blacklist").value}),c.success("UA rules saved")}catch(l){c.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),e.querySelector("#sec-geo-save")?.addEventListener("click",async()=>{let n=e.querySelector("#sec-geo-save"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{let l={whitelist:e.querySelector("#sec-geo-whitelist").value,blacklist:e.querySelector("#sec-geo-blacklist").value},r=await k.put(i,l);r?.status==="confirm"&&(await UIkit.modal.confirm(`${r.reason}. Save anyway?`),r=await k.put(i,{...l,confirm:!0})),c.success("Country rules saved")}catch(l){l instanceof Error&&c.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),e.querySelector("#sec-asn-save")?.addEventListener("click",async()=>{let n=e.querySelector("#sec-asn-save"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{let l=e.querySelector("#security-panel").dataset.asnBase,r={whitelist:e.querySelector("#sec-asn-whitelist").value,blacklist:e.querySelector("#sec-asn-blacklist").value},m=await k.put(l,r);m?.status==="confirm"&&(await UIkit.modal.confirm(`${m.reason}. Save anyway?`),m=await k.put(l,{...r,confirm:!0})),c.success("ASN rules saved")}catch(l){l instanceof Error&&c.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),e.querySelector("#sec-asn-lookup")?.addEventListener("click",()=>va(e)),e.querySelector("#sec-malware-scan")?.addEventListener("click",async()=>{let n=e.querySelector("#sec-malware-scan"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.post(`/sites/${t.dataset.siteId}/malware/scan`),c.success("Malware scan queued"),await pe(e,t.dataset.siteId)}catch(l){c.error(l.message),n.disabled=!1}finally{n.innerHTML=o}}),e.querySelector("#sec-malware-list")?.addEventListener("click",async n=>{let o=n.target.closest(".sec-malware-quarantine");if(!(!o||!await $("Quarantine File","This moves the file out of the site's html directory. If it is legitimately needed, the site may break. Continue?"))){o.disabled=!0,o.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.post(`/sites/${t.dataset.siteId}/malware/findings/${o.dataset.id}/quarantine`),c.success("File quarantined")}catch(r){c.error(r.message)}finally{await pe(e,t.dataset.siteId)}}}),e.querySelector("#sec-tp-save")?.addEventListener("click",async()=>{let n=e.querySelector("#sec-tp-save"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.put("/settings/trusted-proxies",{trusted_proxies_custom:e.querySelector("#sec-tp-cidrs").value.trim()}),c.success("Trusted proxy ranges saved")}catch(l){c.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),e.querySelector("#sec-bypass-save")?.addEventListener("click",async()=>{let n=e.querySelector("#sec-bypass-save"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.put("/security/bypass",{bypass:e.querySelector("#sec-bypass-cidrs").value.trim()}),c.success("Bypass rules saved")}catch(l){c.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),e.querySelector("#sec-tp-import")?.addEventListener("change",async n=>{let o=n.target.files[0];if(!o)return;let l=new FormData;l.append("file",o);try{let r=await fetch("/api/settings/trusted-proxies/import",{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:l}),m=r.status===204?null:await r.json().catch(()=>null);if(!r.ok)throw new Error(m?.error||`HTTP ${r.status}`);await H(e),c.success("Trusted proxies imported")}catch(r){c.error(r.message)}finally{n.target.value=""}}),e.querySelector("#sec-ip-import")?.addEventListener("change",async n=>{let o=n.target.files[0];if(!o)return;let l=new FormData;l.append("file",o);try{let r=await fetch("/api"+a+"/import",{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:l}),m=r.status===204?null:await r.json().catch(()=>null);if(!r.ok)throw new Error(m?.error||`HTTP ${r.status}`);await H(e),c.success("IP rules imported")}catch(r){c.error(r.message)}finally{n.target.value=""}}),e.querySelector("#sec-ua-import")?.addEventListener("change",async n=>{let o=n.target.files[0];if(!o)return;let l=new FormData;l.append("file",o);try{let r=await fetch("/api"+s+"/import",{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:l}),m=r.status===204?null:await r.json().catch(()=>null);if(!r.ok)throw new Error(m?.error||`HTTP ${r.status}`);await H(e),c.success("UA rules imported")}catch(r){c.error(r.message)}finally{n.target.value=""}})}function va(e){document.getElementById("kp-asn-lookup-modal")?.remove(),document.body.insertAdjacentHTML("beforeend",`
        <div id="kp-asn-lookup-modal" uk-modal>
            <div class="uk-modal-dialog kp-modal uk-modal-body">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <h3 class="kp-view-title">ASN Lookup</h3>
                <div class="uk-flex uk-margin-top" style="gap:8px">
                    <input class="uk-input kp-input" id="asn-lookup-q" type="text" placeholder="IP address or domain">
                    <button class="uk-button kp-btn-primary kp-btn-sm" id="asn-lookup-go" uk-tooltip="Look it up">
                        <span uk-icon="search"></span>
                    </button>
                </div>
                <div id="asn-lookup-result" class="uk-margin-top"></div>
            </div>
        </div>`);let a=UIkit.modal("#kp-asn-lookup-modal");a.show();let s=async()=>{let i=document.getElementById("asn-lookup-q").value.trim();if(!i)return;let n=document.getElementById("asn-lookup-result");n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{let o=await k.get(`/security/asn/lookup?q=${encodeURIComponent(i)}`);if(!o?.asn){n.innerHTML='<p class="kp-muted uk-text-small">No ASN found for <span class="kp-mono"></span>.</p>',n.querySelector(".kp-mono").textContent=o?.ip||i;return}n.innerHTML=`
                <p class="uk-text-small">
                    <span class="kp-mono" id="asn-lookup-ip"></span> \u2192
                    <span class="kp-mono">AS${o.asn}</span>
                    <span id="asn-lookup-org"></span>
                    ${o.country?`<span class="kp-muted">(${o.country})</span>`:""}
                </p>
                <button class="uk-button kp-btn-ghost kp-btn-sm" id="asn-lookup-add">
                    <span uk-icon="ban"></span> Add AS${o.asn} to blacklist
                </button>`,n.querySelector("#asn-lookup-ip").textContent=o.ip,n.querySelector("#asn-lookup-org").textContent=o.org||"",n.querySelector("#asn-lookup-add").addEventListener("click",()=>{let l=e.querySelector("#sec-asn-blacklist"),r=`AS${o.asn}`;l.value.split(`
`).some(m=>m.trim().toUpperCase()===r)||(l.value=l.value.trim()?`${l.value.replace(/\s+$/,"")}
${r}`:r),a.hide(),c.success(`${r} added to blacklist \u2014 save to apply`)})}catch(o){n.innerHTML="",c.error(o.message)}};document.getElementById("asn-lookup-go").addEventListener("click",s),document.getElementById("asn-lookup-q").addEventListener("keydown",i=>{i.key==="Enter"&&s()})}async function nt(e,t={}){if(!P()){e.innerHTML=T("Access denied");return}e.innerHTML=`
        <div class="kp-view-header">
            <h1 class="kp-view-title kp-cursor" style="font-size:2rem;">Global Security</h1>
        </div>
        <p class="kp-muted uk-text-small uk-margin-bottom">
            Global rules apply to all sites before per-site rules are evaluated.
            Blacklist always wins \u2014 except for IP rules, where a whitelist match
            in either scope allows the request outright.
        </p>
        ${Q(null)}`,ke(e),me(e,t.tab),H(e)}function ga(e){switch(e){case"valid":return'<span class="kp-ssl-valid" uk-icon="icon: lock; ratio: 0.85" uk-tooltip="Valid SSL certificate"></span>';case"self-signed":return'<span class="kp-ssl-self-signed" uk-icon="icon: lock; ratio: 0.85" uk-tooltip="Self-signed certificate"></span>';case"expired":return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="Expired certificate"></span>';case"mismatch":return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="Certificate does not match this domain"></span>';default:return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="No SSL certificate"></span>'}}async function it(e){let t=document.getElementById("admin-domain-ssl");if(!(!t||!e))try{let a=await k.get(`/ssl-status?domain=${encodeURIComponent(e)}`);t.outerHTML=ga(a.status)}catch{}}var ot=["general","backups","notifications","malware"];function be(e){return`
        <div class="uk-flex" style="gap:8px">
            <a class="uk-button kp-btn-ghost kp-btn-sm" href="/api/settings/export?group=${e}" download="podnest-settings-${e}.csv" uk-tooltip="Export these settings">
                <span uk-icon="download"></span>
            </a>
            <label class="uk-button kp-btn-ghost kp-btn-sm" style="cursor:pointer" uk-tooltip="Import these settings from CSV">
                <span uk-icon="upload"></span>
                <input type="file" class="kp-settings-import" data-group="${e}" accept=".csv" style="display:none">
            </label>
        </div>`}async function Pe(e,t={}){if(!P()){e.innerHTML=T("Access denied");return}let[a,s,i,n,o]=await Promise.all([k.get("/settings"),k.get("/settings/backup"),k.get("/settings/notifications"),k.get("/settings/resources"),k.get("/settings/malware")]);e.innerHTML=`
    <div class="kp-view-header">
        <h1 class="kp-view-title kp-cursor" style="font-size:2rem;">Settings</h1>
    </div>

    <!-- tab pills -->
    <ul class="kp-tab-pills" id="kp-settings-pills">
        <li data-pill="0"><a href="#"><span uk-icon="icon: cog; ratio: 0.85"></span> General</a></li>
        <li data-pill="1"><a href="#"><span uk-icon="icon: cloud-upload; ratio: 0.85"></span> Backups</a></li>
        <li data-pill="2"><a href="#"><span uk-icon="icon: bell; ratio: 0.85"></span> Notifications</a></li>
        <li data-pill="3"><a href="#"><span uk-icon="icon: bolt; ratio: 0.85"></span> Malware</a></li>
    </ul>

    <!-- switcher panels -->
    <ul class="uk-switcher uk-margin-large-bottom" id="kp-settings-switcher">

        <!-- general: panel configuration + host resource watcher -->
        <li>
            <div class="kp-card uk-padding">
                <div class="uk-flex uk-flex-right uk-margin-bottom">
                    ${be("general")}
                </div>
                <form id="settings-form" class="uk-form-stacked">
                    <div class="uk-margin">
                        <label class="kp-label" for="admin-domain">Management UI Domain</label>
                        <div class="uk-flex kp-settings-domain-wrap">
                            <span id="admin-domain-ssl" class="kp-ssl-pending" uk-icon="icon: more; ratio: 0.85"></span>
                            <input
                                class="uk-input kp-input"
                                id="admin-domain"
                                name="admin_domain"
                                type="text"
                                placeholder="panel.example.com"
                                value="${a.admin_domain??""}">
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-top">
                            When set, the proxy will route this domain to the management UI and issue
                            a Let's Encrypt certificate automatically. Leave blank to disable.
                        </p>
                    </div>

                    <h3 class="kp-view-title uk-margin-bottom uk-margin-top">Host Resource Watcher</h3>
                    <div class="uk-grid-small uk-child-width-1-2@m" uk-grid>
                        <div>
                            <label class="kp-label" for="resource-ram-reserve">RAM Reserve (GB)</label>
                            <input class="uk-input kp-input" id="resource-ram-reserve" name="resource_ram_reserve_gb" type="number"
                                min="0.5" max="64" step="0.5" placeholder="2"
                                value="${n.resource_ram_reserve_gb??"2"}">
                            <p class="kp-muted uk-text-small uk-margin-small-top">
                                Amount of RAM to keep free for the host OS. Throttling fires when aggregate pod usage exceeds total RAM minus this value.
                            </p>
                        </div>
                        <div>
                            <label class="kp-label" for="resource-poll-interval">Poll Interval (seconds)</label>
                            <input class="uk-input kp-input" id="resource-poll-interval" name="resource_poll_interval" type="number"
                                min="5" max="300" step="5" placeholder="30"
                                value="${n.resource_poll_interval??"30"}">
                        </div>
                        <div>
                            <label class="kp-label" for="resource-throttle-pct">Throttle Aggressiveness (%)</label>
                            <input class="uk-input kp-input" id="resource-throttle-pct" name="resource_throttle_pct" type="number"
                                min="10" max="90" step="5" placeholder="50"
                                value="${n.resource_throttle_pct??"50"}">
                            <p class="kp-muted uk-text-small uk-margin-small-top">
                                Percentage to reduce the offending pod's current memory usage by when throttling.
                            </p>
                        </div>
                        <div>
                            <label class="kp-label" for="shutdown-job-timeout">Shutdown Job Drain (minutes)</label>
                            <input class="uk-input kp-input" id="shutdown-job-timeout" name="shutdown_job_timeout" type="number"
                                min="1" max="60" step="1" placeholder="5"
                                value="${n.shutdown_job_timeout??"5"}">
                            <p class="kp-muted uk-text-small uk-margin-small-top">
                                How long to wait for in-flight backups, restores, and imports to finish before the process exits on stop or restart.
                            </p>
                        </div>
                        <div class="uk-width-1-1">
                            <label class="kp-label" for="resource-webhook-url">Webhook URL <span class="kp-muted">(optional)</span></label>
                            <input class="uk-input kp-input kp-mono" id="resource-webhook-url" name="resource_webhook_url" type="url"
                                placeholder="https://hooks.example.com/notify"
                                value="${n.resource_webhook_url??""}">
                            <p class="kp-muted uk-text-small uk-margin-small-top">
                                HTTP POST with JSON payload on threshold breach and resolution. Compatible with Uptime Kuma, PagerDuty, Slack, etc.
                            </p>
                        </div>
                    </div>
                    <div class="uk-flex uk-flex-right uk-margin-top">
                        <button type="submit" class="uk-button kp-btn-primary">
                            <span uk-icon="check"></span> Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </li>

        <!-- backups: schedule/retention + S3 storage -->
        <li>
            <div class="kp-card uk-padding">
                <div class="uk-flex uk-flex-right uk-margin-bottom">
                    ${be("backups")}
                </div>
                <form id="backup-form" class="uk-form-stacked">
                    <div class="uk-grid-medium uk-child-width-1-2@m" uk-grid>
                        <div>
                            <h4 class="kp-view-title uk-margin-bottom">Schedule</h4>
                            <div class="uk-margin">
                                <label class="kp-label" for="backup-schedule">Cron Schedule</label>
                                <input
                                    class="uk-input kp-input kp-mono"
                                    id="backup-schedule"
                                    name="backup_schedule"
                                    type="text"
                                    placeholder="0 2 * * *"
                                    value="${s.backup_schedule??""}">
                                <p class="kp-muted uk-text-small uk-margin-small-top">
                                    Standard 5-field cron expression. Leave blank to disable automatic backups.<br>
                                    Examples: <span class="kp-mono">0 2 * * *</span> (daily at 2am) &nbsp;
                                    <span class="kp-mono">0 */6 * * *</span> (every 6 hours)
                                </p>
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="backup-retain-days">Retain Backups (days)</label>
                                <input
                                    class="uk-input kp-input"
                                    id="backup-retain-days"
                                    name="backup_retain_days"
                                    type="number"
                                    min="1"
                                    max="365"
                                    placeholder="30"
                                    value="${s.backup_retain_days??"30"}">
                                <p class="kp-muted uk-text-small uk-margin-small-top">
                                    Snapshots older than this many days will be pruned automatically after each backup run.
                                </p>
                            </div>
                        </div>
                        <div>
                            <h4 class="kp-view-title uk-margin-bottom">S3 Storage</h4>
                            <div class="uk-margin">
                                <label class="kp-label" for="s3-endpoint">Endpoint URL</label>
                                <input
                                    class="uk-input kp-input kp-mono"
                                    id="s3-endpoint"
                                    name="s3_endpoint"
                                    type="url"
                                    placeholder="https://s3.amazonaws.com"
                                    value="${s.s3_endpoint??""}">
                                <p class="kp-muted uk-text-small uk-margin-small-top">
                                    AWS S3 or any S3-compatible endpoint (Backblaze B2, MinIO, Wasabi, etc.)
                                </p>
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="s3-bucket">Bucket</label>
                                <input
                                    class="uk-input kp-input kp-mono"
                                    id="s3-bucket"
                                    name="s3_bucket"
                                    type="text"
                                    placeholder="my-podnest-backups"
                                    value="${s.s3_bucket??""}">
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="s3-region">Region</label>
                                <input
                                    class="uk-input kp-input kp-mono"
                                    id="s3-region"
                                    name="s3_region"
                                    type="text"
                                    placeholder="us-east-1"
                                    value="${s.s3_region??""}">
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="s3-access-key">Access Key ID</label>
                                <input
                                    class="uk-input kp-input kp-mono"
                                    id="s3-access-key"
                                    name="s3_access_key"
                                    type="text"
                                    placeholder="AKIAIOSFODNN7EXAMPLE"
                                    value="${s.s3_access_key??""}">
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="s3-secret-key">Secret Access Key</label>
                                <input
                                    class="uk-input kp-input kp-mono"
                                    id="s3-secret-key"
                                    name="s3_secret_key"
                                    type="password"
                                    placeholder="${s.s3_secret_key?"saved \u2014 enter new value to change":"enter secret key"}"
                                    value="">
                                <p class="kp-muted uk-text-small uk-margin-small-top">
                                    Leave blank to keep the existing key.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="uk-flex uk-flex-right uk-margin-top">
                        <button type="submit" class="uk-button kp-btn-primary">
                            <span uk-icon="check"></span> Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </li>

        <!-- notifications: smtp + aws sns -->
        <li>
            <div class="kp-card uk-padding">
                <div class="uk-flex uk-flex-right uk-flex-middle uk-margin-bottom">
                    ${be("notifications")}
                </div>
                <form id="notifications-form" class="uk-form-stacked">
                    <div class="uk-grid-medium uk-child-width-1-2@m" uk-grid>
                        <div>
                            <h4 class="kp-view-title uk-margin-bottom">Email (SMTP)</h4>
                            <div class="uk-margin">
                                <label class="kp-label" for="smtp-host">SMTP Host</label>
                                <input class="uk-input kp-input kp-mono" id="smtp-host" name="smtp_host" type="text"
                                    placeholder="smtp.example.com" value="${i.smtp_host??""}">
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="smtp-port">Port</label>
                                <input class="uk-input kp-input kp-mono" id="smtp-port" name="smtp_port" type="text"
                                    placeholder="587" value="${i.smtp_port??""}">
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="smtp-username">Username</label>
                                <input class="uk-input kp-input kp-mono" id="smtp-username" name="smtp_username" type="text"
                                    placeholder="user@example.com" value="${i.smtp_username??""}">
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="smtp-password">Password</label>
                                <input class="uk-input kp-input kp-mono" id="smtp-password" name="smtp_password" type="password"
                                    placeholder="${i.smtp_password?"saved \u2014 enter new value to change":"enter password"}"
                                    value="">
                                <p class="kp-muted uk-text-small uk-margin-small-top">Leave blank to keep the existing password.</p>
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="smtp-from">From Address</label>
                                <input class="uk-input kp-input kp-mono" id="smtp-from" name="smtp_from" type="email"
                                    placeholder="podnest@example.com" value="${i.smtp_from??""}">
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label">
                                    <input class="uk-checkbox" type="checkbox" id="smtp-tls" name="smtp_tls"
                                        ${i.smtp_tls==="true"||i.smtp_tls==="1"?"checked":""}>
                                    &nbsp;Use implicit TLS (port 465)
                                </label>
                                <p class="kp-muted uk-text-small uk-margin-small-top">
                                    Unchecked uses STARTTLS (port 587). Check only for port 465 / SSL-only servers.
                                </p>
                            </div>
                        </div>
                        <div>
                            <h4 class="kp-view-title uk-margin-bottom">SMS (AWS SNS)</h4>
                            <div class="uk-margin">
                                <label class="kp-label" for="aws-access-key">Access Key ID</label>
                                <input class="uk-input kp-input kp-mono" id="aws-access-key" name="aws_access_key" type="text"
                                    placeholder="AKIAIOSFODNN7EXAMPLE" value="${i.aws_access_key??""}">
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="aws-secret-key">Secret Access Key</label>
                                <input class="uk-input kp-input kp-mono" id="aws-secret-key" name="aws_secret_key" type="password"
                                    placeholder="${i.aws_secret_key?"saved \u2014 enter new value to change":"enter secret key"}"
                                    value="">
                                <p class="kp-muted uk-text-small uk-margin-small-top">Leave blank to keep the existing key.</p>
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="aws-region">AWS Region</label>
                                <input class="uk-input kp-input kp-mono" id="aws-region" name="aws_region" type="text"
                                    placeholder="us-east-1" value="${i.aws_region??""}">
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="aws-sns-sender-id">Sender ID <span class="kp-muted">(optional)</span></label>
                                <input class="uk-input kp-input kp-mono" id="aws-sns-sender-id" name="aws_sns_sender_id" type="text"
                                    placeholder="PodNest" value="${i.aws_sns_sender_id??""}">
                                <p class="kp-muted uk-text-small uk-margin-small-top">
                                    Alphanumeric sender name shown on the recipient's phone. Supported in select AWS regions only.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="uk-flex uk-flex-right uk-margin-top">
                        <button type="submit" class="uk-button kp-btn-primary">
                            <span uk-icon="check"></span> Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </li>

        <!-- malware: scan history retention + scanner resource caps -->
        <li>
            <div class="kp-card uk-padding">
                <div class="uk-flex uk-flex-right uk-margin-bottom">
                    ${be("malware")}
                </div>
                <form id="malware-form" class="uk-form-stacked">
                    <p class="kp-muted uk-text-small uk-margin-bottom">
                        Every site's html directory is scanned nightly at midnight with ClamAV and Linux Malware Detect.
                        Scans run one site at a time in a throwaway container.
                    </p>
                    <div class="uk-grid-small uk-child-width-1-3@m" uk-grid>
                        <div>
                            <label class="kp-label" for="malware-retain-days">Retain History (days)</label>
                            <input class="uk-input kp-input" id="malware-retain-days" name="malware_retain_days" type="number"
                                min="1" max="3650" step="1" placeholder="30"
                                value="${o.malware_retain_days||"30"}">
                            <p class="kp-muted uk-text-small uk-margin-small-top">
                                Scan results older than this are pruned after each nightly run.
                            </p>
                        </div>
                        <div>
                            <label class="kp-label" for="malware-memory-mb">Scanner Memory (MB)</label>
                            <input class="uk-input kp-input" id="malware-memory-mb" name="malware_memory_mb" type="number"
                                min="512" max="65536" step="1" placeholder="2048"
                                value="${o.malware_memory_mb||"2048"}">
                            <p class="kp-muted uk-text-small uk-margin-small-top">
                                ClamAV's signature set alone needs over 1 GB; too low and scans fail out of memory.
                            </p>
                        </div>
                        <div>
                            <label class="kp-label" for="malware-cpus">Scanner CPUs</label>
                            <input class="uk-input kp-input" id="malware-cpus" name="malware_cpus" type="number"
                                min="0.1" max="64" step="0.1" placeholder="1"
                                value="${o.malware_cpus||"1"}">
                            <p class="kp-muted uk-text-small uk-margin-small-top">
                                CPU cores the scanner may use. Fractions are allowed (e.g. 0.5).
                            </p>
                        </div>
                    </div>
                    <div class="uk-flex uk-flex-right uk-margin-top">
                        <button type="submit" class="uk-button kp-btn-primary">
                            <span uk-icon="check"></span> Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </li>
    </ul>
    `;let l=e.querySelector("#kp-settings-pills"),r=e.querySelector("#kp-settings-switcher"),m=p=>{UIkit.switcher(r).show(p),l.querySelectorAll(":scope > li").forEach((d,b)=>d.classList.toggle("kp-pill-active",b===p)),history.replaceState(null,"",p===0?"#settings":`#settings/${ot[p]}`)};l.querySelectorAll(":scope > li > a").forEach(p=>{p.addEventListener("click",d=>{d.preventDefault(),m(parseInt(p.closest("li").dataset.pill,10))})}),m(Math.max(0,ot.indexOf(t.tab))),a.admin_domain&&it(a.admin_domain),e.querySelectorAll(".kp-settings-import").forEach(p=>{p.addEventListener("change",async d=>{let b=d.target.files[0];if(!b)return;let u=d.target.dataset.group,h=new FormData;h.append("file",b);try{let f=await fetch(`/api/settings/import?group=${encodeURIComponent(u)}`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:h}),v=f.status===204?null:await f.json().catch(()=>null);if(!f.ok)throw new Error(v?.error||`HTTP ${f.status}`);c.success("Settings imported"),await Pe(e,{tab:u})}catch(f){c.error(f.message)}finally{d.target.value=""}})}),document.getElementById("settings-form").addEventListener("submit",async p=>{p.preventDefault();let d=p.target.querySelector('[type="submit"]'),b=d.innerHTML;d.disabled=!0,d.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let u=new FormData(p.target),h={admin_domain:u.get("admin_domain").trim()},f={resource_ram_reserve_gb:u.get("resource_ram_reserve_gb").trim(),resource_poll_interval:u.get("resource_poll_interval").trim(),resource_throttle_pct:u.get("resource_throttle_pct").trim(),resource_webhook_url:u.get("resource_webhook_url").trim(),shutdown_job_timeout:u.get("shutdown_job_timeout").trim()};try{await k.put("/settings",h),await k.put("/settings/resources",f),c.success("Settings saved"),it(h.admin_domain)}catch(v){c.error(v.message)}finally{d.disabled=!1,d.innerHTML=b}}),document.getElementById("backup-form").addEventListener("submit",async p=>{p.preventDefault();let d=p.target.querySelector('[type="submit"]'),b=d.innerHTML;d.disabled=!0,d.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let u=new FormData(p.target),h={backup_schedule:u.get("backup_schedule").trim(),backup_retain_days:u.get("backup_retain_days").trim(),s3_endpoint:u.get("s3_endpoint").trim(),s3_bucket:u.get("s3_bucket").trim(),s3_region:u.get("s3_region").trim(),s3_access_key:u.get("s3_access_key").trim()},f=u.get("s3_secret_key").trim();f&&(h.s3_secret_key=f);try{await k.put("/settings/backup",h),c.success("Backup settings saved")}catch(v){c.error(v.message)}finally{d.disabled=!1,d.innerHTML=b}}),document.getElementById("notifications-form").addEventListener("submit",async p=>{p.preventDefault();let d=p.target.querySelector('[type="submit"]'),b=d.innerHTML;d.disabled=!0,d.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let u=new FormData(p.target),h={smtp_host:u.get("smtp_host").trim(),smtp_port:u.get("smtp_port").trim(),smtp_username:u.get("smtp_username").trim(),smtp_from:u.get("smtp_from").trim(),smtp_tls:u.get("smtp_tls")?"true":"false",aws_access_key:u.get("aws_access_key").trim(),aws_region:u.get("aws_region").trim(),aws_sns_sender_id:u.get("aws_sns_sender_id").trim()},f=u.get("smtp_password").trim();f&&(h.smtp_password=f);let v=u.get("aws_secret_key").trim();v&&(h.aws_secret_key=v);try{await k.put("/settings/notifications",h),c.success("Notification settings saved")}catch(w){c.error(w.message)}finally{d.disabled=!1,d.innerHTML=b}}),document.getElementById("malware-form").addEventListener("submit",async p=>{p.preventDefault();let d=p.target.querySelector('[type="submit"]'),b=d.innerHTML;d.disabled=!0,d.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let u=new FormData(p.target),h={malware_retain_days:u.get("malware_retain_days").trim(),malware_memory_mb:u.get("malware_memory_mb").trim(),malware_cpus:u.get("malware_cpus").trim()};try{await k.put("/settings/malware",h),c.success("Malware settings saved")}catch(f){c.error(f.message)}finally{d.disabled=!1,d.innerHTML=b}})}async function lt(e){let t=`
        <div id="kp-edit-site-modal" uk-modal>
            <div class="uk-modal-dialog kp-modal uk-modal-body uk-width-large">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <h3 class="kp-view-title">Edit Site \u2014 ${e.Name}</h3>
                <form id="edit-site-form" class="uk-form-stacked uk-margin-top">
                    <div class="uk-grid-small" uk-grid>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Site Name</label>
                            <input class="uk-input kp-input" name="name" type="text" value="${e.Name}" readonly disabled>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Site Type</label>
                            <select class="uk-select kp-select" name="site_type" id="es-site-type">
                                <option value="1" ${e.SiteType===1?"selected":""}>PHP</option>
                                <option value="3" ${e.SiteType===3?"selected":""}>Static HTML</option>
                                <option value="4" ${e.SiteType===4?"selected":""}>Node.js</option>
                                <option value="5" ${e.SiteType===5?"selected":""}>.NET</option>
                                <option value="7" ${e.SiteType===7?"selected":""}>Python</option>
                                <option value="6" ${e.SiteType===6?"selected":""}>Reverse Proxy</option>
                            </select>
                        </div>
                        <div class="uk-width-1-2@s" id="es-php-version-wrap">
                            <label class="kp-label">PHP Version</label>
                            <select class="uk-select kp-select" name="php_version">
                                <option value="3" ${e.PHPVersion===3?"selected":""}>PHP 8.2</option>
                                <option value="4" ${e.PHPVersion===4?"selected":""}>PHP 8.3</option>
                                <option value="5" ${e.PHPVersion===5?"selected":""}>PHP 8.4</option>
                                <option value="6" ${e.PHPVersion===6?"selected":""}>PHP 8.5</option>
                            </select>
                        </div>
                        <div class="uk-width-1-2@s uk-hidden" id="es-node-version-wrap">
                            <label class="kp-label">Node.js Version</label>
                            <select class="uk-select kp-select" name="node_version">
                                <option value="2" ${e.RuntimeVersion===2?"selected":""}>Node 22 (LTS)</option>
                                <option value="4" ${e.RuntimeVersion===4?"selected":""}>Node 24</option>
                                <option value="5" ${e.RuntimeVersion===5?"selected":""}>Node 25</option>
                                <option value="6" ${e.RuntimeVersion===6?"selected":""}>Node 26</option>                                
                            </select>
                        </div>
                        <div class="uk-width-1-2@s uk-hidden" id="es-dotnet-version-wrap">
                            <label class="kp-label">.NET Version</label>
                            <select class="uk-select kp-select" name="dotnet_version">
                                <option value="1" ${e.RuntimeVersion===1?"selected":""}>.NET 8.0 (LTS)</option>
                                <option value="2" ${e.RuntimeVersion===2?"selected":""}>.NET 9.0</option>
                                <option value="3" ${e.RuntimeVersion===3?"selected":""}>.NET 10.0 (LTS)</option>
                            </select>
                        </div>
                        <div class="uk-width-1-2@s uk-hidden" id="es-python-version-wrap">
                            <label class="kp-label">Python Version</label>
                            <select class="uk-select kp-select" name="python_version">
                                <option value="1" ${e.SiteType===7&&e.RuntimeVersion===1?"selected":""}>Python 3.11</option>
                                <option value="2" ${e.SiteType===7&&e.RuntimeVersion===2?"selected":""}>Python 3.12</option>
                                <option value="3" ${e.SiteType===7&&e.RuntimeVersion===3?"selected":""}>Python 3.13</option>
                                <option value="4" ${e.SiteType!==7||e.RuntimeVersion===4?"selected":""}>Python 3.14</option>
                            </select>
                        </div>
                        <div class="uk-width-1-1 uk-hidden" id="es-start-command-wrap">
                            <label class="kp-label">Start Command</label>
                            <input class="uk-input kp-input" name="start_command" type="text" value="${e.StartCommand||""}">
                        </div>
                        <div class="uk-width-1-1 ${e.SiteType!==1?"uk-hidden":""}" id="es-wordpress-wrap">
                            <label><input class="uk-checkbox" type="checkbox" name="install_wordpress" checked> WordPress</label>
                        </div>
                    </div>
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button type="button" class="uk-button kp-btn-ghost uk-modal-close">Cancel</button>
                        <button type="submit" class="uk-button kp-btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>`;document.body.insertAdjacentHTML("beforeend",t);let a=UIkit.modal("#kp-edit-site-modal"),s=document.getElementById("es-site-type"),i=document.getElementById("es-php-version-wrap"),n=document.getElementById("es-node-version-wrap"),o=document.getElementById("es-dotnet-version-wrap"),l=document.getElementById("es-python-version-wrap"),r=document.getElementById("es-start-command-wrap"),m=document.getElementById("es-wordpress-wrap");a.show();let p=d=>{i.classList.toggle("uk-hidden",d!==1&&d!==2||d===6),n.classList.toggle("uk-hidden",d!==4),o.classList.toggle("uk-hidden",d!==5),l.classList.toggle("uk-hidden",d!==7),r.classList.toggle("uk-hidden",d!==4&&d!==5&&d!==7),r.querySelector("input").required=d===7,m.classList.toggle("uk-hidden",d!==1)};p(e.SiteType),s.addEventListener("change",()=>p(parseInt(s.value))),document.getElementById("edit-site-form").addEventListener("submit",async d=>{d.preventDefault();let b=d.target.querySelector('[type="submit"]'),u=b.innerHTML;b.disabled=!0,b.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let h=new FormData(d.target),f=parseInt(h.get("site_type")),v=null;f===4&&(v=parseInt(h.get("node_version"))),f===5&&(v=parseInt(h.get("dotnet_version"))),f===7&&(v=parseInt(h.get("python_version")));let w={php_version:parseInt(h.get("php_version"))||3,site_type:f,runtime_version:v,start_command:h.get("start_command")?.trim()||""},E=f===1?h.get("install_wordpress")==="on":!1;try{if(await k.put(`/sites/${e.ID}`,w),a.hide(),document.getElementById("kp-edit-site-modal")?.remove(),f!==6){S("Applying Changes","Saving changes and recreating pod...");try{await k.post(`/sites/${e.ID}/recreate`,{install_wordpress:E,prune:!0}),x(),c.success("Site updated and pod recreated")}catch(C){x(),c.error("Site saved but pod recreate failed: "+C.message)}}else c.success("Site updated");y.go("site-detail",{id:String(e.ID)})}catch(C){c.error(C.message),b.disabled=!1,b.innerHTML=u}}),document.getElementById("kp-edit-site-modal").addEventListener("hidden",()=>document.getElementById("kp-edit-site-modal")?.remove())}function ct(e){return`
        <div id="backups-panel" data-site-id="${e}">

            <!-- repo config card -->
            <div class="kp-card uk-padding-small uk-margin-bottom">
                <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                    <h3 class="kp-view-title">Backup Destinations</h3>
                    <button class="uk-button kp-btn-primary kp-btn-sm" id="backup-repo-save" uk-tooltip="Save Your Backup Configuration">
                        <span uk-icon="check"></span>
                    </button>
                </div>
                <div class="uk-flex" style="gap:24px;flex-wrap:wrap" id="backup-repo-toggles">
                    <label class="uk-flex uk-flex-middle" style="gap:8px;cursor:pointer">
                        <input type="checkbox" class="uk-checkbox" id="backup-local-enabled">
                        <span class="kp-text">Local</span>
                    </label>
                    <label class="uk-flex uk-flex-middle" style="gap:8px;cursor:pointer">
                        <input type="checkbox" class="uk-checkbox" id="backup-s3-enabled">
                        <span class="kp-text">S3</span>
                    </label>
                </div>
                <p class="kp-muted uk-text-small uk-margin-small-top">
                    Local backups are stored under the site's SFTP home directory and are accessible
                    over SFTP as <span class="kp-mono">backups/local/</span>. S3 requires global S3
                    credentials to be configured under Settings.
                </p>
            </div>

            <!-- backup list card -->
            <div class="kp-card uk-padding-small">
                <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                    <h3 class="kp-view-title">Snapshots</h3>
                    <div class="uk-flex" style="gap:6px">
                        <button class="uk-button kp-btn-primary kp-btn-sm" id="backup-run-btn" uk-tooltip="Run a Manual Backup">
                            <span uk-icon="cloud-upload"></span>
                        </button>
                        <button class="uk-button kp-btn-secondary kp-btn-sm" id="backup-import-btn"
                            uk-toggle="target: #import-backup-modal" uk-tooltip="Import a backup archive">
                            <span uk-icon="upload"></span>
                        </button>
                    </div>
                </div>
                <div id="backup-error-banner"></div>
                <div id="backup-list-wrap">
                    <div uk-spinner="ratio: 0.8" style="color:var(--kp-blue)"></div>
                </div>
            </div>

            <!-- import modal -->
            <div id="import-backup-modal" uk-modal>
                <div class="uk-modal-dialog uk-modal-body">
                    <button class="uk-modal-close-default" type="button" uk-close></button>
                    <h3 class="kp-view-title uk-margin-small-bottom">Import Backup Archive</h3>

                    <!-- target site selector -->
                    <div class="uk-margin-small">
                        <label class="uk-form-label kp-text">Restore To</label>
                        <select class="uk-select kp-input" id="import-target-site"></select>
                    </div>

                    <hr class="uk-divider-small">

                    <!-- upload section -->
                    <h4 class="kp-text uk-margin-small-bottom">Upload Archive</h4>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">
                        Maximum upload size is <strong>512 MB</strong>. For larger archives, transfer
                        the file to <span class="kp-mono">backups/import/</span> via SFTP and use
                        the <em>Import from SFTP</em> section below.
                    </p>
                    <div class="uk-margin-small">
                        <input type="file" class="uk-input kp-input" id="import-file-input"
                            accept=".tar.gz,.tar.xz,.zip">
                    </div>
                    <button class="uk-button kp-btn-primary kp-btn-sm uk-margin-small-top" id="import-upload-btn">
                        Upload &amp; Restore
                    </button>

                    <hr class="uk-divider-small uk-margin-small">

                    <!-- SFTP section -->
                    <h4 class="kp-text uk-margin-small-bottom">Import from SFTP</h4>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">
                        Files found in <span class="kp-mono">backups/import/</span> on this site's SFTP.
                    </p>
                    <div id="import-sftp-list">
                        <div uk-spinner="ratio: 0.6" style="color:var(--kp-blue)"></div>
                    </div>
                </div>
            </div>

        </div>`}function fa(e){if(!e||e.length===0)return'<p class="kp-muted uk-text-small uk-margin-remove">No snapshots yet.</p>';let t=s=>s===2?'<span class="kp-mono" style="color:var(--kp-cyan)">S3</span>':'<span class="kp-mono" style="color:var(--kp-blue)">Local</span>';return`
        <div class="uk-overflow-auto">
        <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
            <thead>
                <tr>
                    <th>Snapshot ID</th>
                    <th>Label</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Created</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>${e.map(s=>`
        <tr>
            <td class="kp-mono" style="font-size:0.8rem">${g(s.SnapshotID)}</td>
            <td>${s.Label?g(s.Label):"\u2014"}</td>
            <td>${t(s.BackupType)}</td>
            <td>${L(s.SizeBytes)}</td>
            <td>${new Date(s.Created).toLocaleString()}</td>
            <td>
                <div class="uk-flex" style="gap:6px">
                    <button class="uk-button kp-btn-ghost kp-btn-sm backup-download-btn"
                        data-id="${s.ID}" uk-tooltip="Download backup archive">
                        <span uk-icon="download"></span>
                    </button>
                    <button class="uk-button kp-btn-secondary kp-btn-sm backup-restore-btn"
                        data-id="${s.ID}" uk-tooltip="Restore from this snapshot">
                        <span uk-icon="history"></span>
                    </button>
                    <button class="uk-button kp-btn-danger kp-btn-sm backup-delete-btn"
                        data-id="${s.ID}" uk-tooltip="Delete this snapshot">
                        <span uk-icon="trash"></span>
                    </button>
                </div>
            </td>
        </tr>`).join("")}</tbody>
        </table>
        </div>`}function rt(e,t,a){let s=Date.now()+18e5,i=setInterval(async()=>{try{let n=await k.get(`/sites/${a||t}/backups/restore-status`);(!n?.active||Date.now()>s)&&(clearInterval(i),x(),n?.active?c.error("Import timed out \u2014 check server logs"):n?.error?c.error(`Import failed: ${n.error}`):c.success("Import complete"),await z(e,t))}catch{Date.now()>s&&(clearInterval(i),x(),c.error("Import status unavailable \u2014 check server logs"))}},3e3)}async function z(e,t){try{let[a,s]=await Promise.all([k.get(`/sites/${t}/backup-repo`),k.get(`/sites/${t}/backups`)]),i=e.querySelector("#backup-local-enabled"),n=e.querySelector("#backup-s3-enabled");i&&(i.checked=!!a.LocalEnabled),n&&(n.checked=!!a.S3Enabled);let o=e.querySelector("#backup-error-banner");if(o)if(a.last_error){let r=a.last_error_at?` (${new Date(a.last_error_at).toLocaleString()})`:"";o.innerHTML=`
                    <div uk-alert class="uk-alert-warning">
                        <a class="uk-alert-close" uk-close></a>
                        <p><strong>Last scheduled backup failed${r}:</strong> ${g(a.last_error)}</p>
                    </div>`}else o.innerHTML="";let l=e.querySelector("#backup-list-wrap");l&&(l.innerHTML=fa(s))}catch(a){let s=e.querySelector("#backup-list-wrap");s&&(s.innerHTML=`<p class="kp-muted uk-text-small">Failed to load backups: ${g(a.message)}</p>`)}}function dt(e,t){e.querySelector("#backup-repo-save")?.addEventListener("click",async()=>{let s={local_enabled:e.querySelector("#backup-local-enabled")?.checked??!1,s3_enabled:e.querySelector("#backup-s3-enabled")?.checked??!1};try{await k.put(`/sites/${t}/backup-repo`,s),c.success("Backup destinations saved")}catch(i){c.error(i.message)}}),e.querySelector("#backup-run-btn")?.addEventListener("click",async()=>{try{await k.post(`/sites/${t}/backups`,{label:"manual"})}catch(n){c.error(n.message);return}S("Backup Running","Snapshotting files and database \u2014 this may take a few minutes.");let s=Date.now()+1800*1e3,i=setInterval(async()=>{try{let n=await k.get(`/sites/${t}/backups/backup-status`);(!n?.active||Date.now()>s)&&(clearInterval(i),x(),await z(e,t),n?.active?c.error("Backup is taking longer than expected \u2014 check server logs for status"):n?.error?c.error(`Backup failed: ${n.error}`):c.success("Backup complete"))}catch{}},4e3)}),e.querySelector("#backup-list-wrap")?.addEventListener("click",async s=>{let i=s.target.closest(".backup-restore-btn");if(i){let l=i.dataset.id;if(!await $("Restore Site","This will restore the site from the selected snapshot. The site will show a maintenance page during the restore. Continue?"))return;try{await k.post(`/sites/${t}/backups/${l}/restore`)}catch(b){c.error(b.message);return}S("Restore Running","Restoring files and database \u2014 the site will return automatically when complete.");let m=Date.now(),p=Date.now()+900*1e3,d=setInterval(async()=>{try{let b=await k.get(`/sites/${t}/backups/restore-status`);(!b?.active||Date.now()>p)&&(clearInterval(d),x(),b?.active?c.error("Restore timed out"):c.success("Restore complete"),await z(e,t))}catch{}},3e3);return}let n=s.target.closest(".backup-delete-btn");if(n){let l=n.dataset.id;if(!await $("Delete Snapshot","This will permanently remove the snapshot from all configured repositories. This cannot be undone."))return;S("Deleting Snapshot","Removing snapshot data from repositories \u2014 this may take a moment.");try{await k.delete(`/sites/${t}/backups/${l}`),x(),c.success("Snapshot deleted"),await z(e,t)}catch(m){x(),c.error(m.message)}}let o=s.target.closest(".backup-download-btn");if(o){let l=o.dataset.id,r=`${Date.now().toString(36)}${Math.random().toString(36).slice(2,10)}`,m=`kp_dl_${r}`;S("Preparing Download","Your backup archive is being generated \u2014 this may take a moment depending on site size. Your download will begin automatically. Do not close this tab."),setTimeout(()=>{let p=document.createElement("a");p.href=`/api/sites/${t}/backups/${l}/download?dl=${r}`,p.style.display="none",document.body.appendChild(p),p.click(),document.body.removeChild(p);let d=Date.now(),b=setInterval(()=>{!document.cookie.split(";").some(h=>h.trim().startsWith(`${m}=`))&&Date.now()-d<18e5||(clearInterval(b),document.cookie=`${m}=; Path=/; Max-Age=0`,x())},500)},300);return}});let a=e.querySelector("#import-backup-modal");a&&(UIkit.util.on(a,"beforeshow",async()=>{let s=a.querySelector("#import-target-site");try{let n=await k.get("/sites"),o=Number(t);s.innerHTML=n.map(l=>`<option value="${l.ID}"${Number(l.ID)===o?" selected":""}>${l.Name}</option>`).join("")}catch{s.innerHTML='<option value="">Failed to load sites</option>'}let i=a.querySelector("#import-sftp-list");try{let n=await k.get(`/sites/${t}/backups/import/files`);!n||n.length===0?i.innerHTML='<p class="kp-muted uk-text-small">No files found.</p>':i.innerHTML=n.map(o=>`
                    <div class="uk-flex uk-flex-middle uk-flex-between uk-margin-small-bottom">
                        <span class="kp-mono uk-text-small">${g(o)}</span>
                        <button class="uk-button kp-btn-primary kp-btn-sm import-sftp-btn" data-file="${g(o)}">
                            Restore
                        </button>
                    </div>`).join("")}catch(n){i.innerHTML=`<p class="kp-muted uk-text-small">Failed to list files: ${g(n.message)}</p>`}}),a.querySelector("#import-upload-btn")?.addEventListener("click",async()=>{let s=a.querySelector("#import-file-input"),i=a.querySelector("#import-target-site")?.value;if(!s?.files?.length){c.error("Select an archive file first");return}let n=s.files[0],o=new FormData;o.append("archive",n),o.append("target_site_id",i),UIkit.modal(a).hide(),S("Importing Backup","Uploading and restoring \u2014 this may take several minutes.");try{await fetch(`/api/sites/${t}/backups/import/upload`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:o,credentials:"same-origin"}).then(async l=>{if(!l.ok){let r=await l.json().catch(()=>({}));throw new Error(r.error||`HTTP ${l.status}`)}})}catch(l){x(),c.error(l.message);return}rt(e,t,i)}),a.querySelector("#import-sftp-list")?.addEventListener("click",async s=>{let i=s.target.closest(".import-sftp-btn");if(!i)return;let n=i.dataset.file,o=a.querySelector("#import-target-site")?.value;UIkit.modal(a).hide(),S("Importing from SFTP","Restoring archive \u2014 this may take several minutes.");try{await k.post(`/sites/${t}/backups/import/sftp`,{filename:n,target_site_id:parseInt(o,10)})}catch(l){x(),c.error(l.message);return}rt(e,t,o)}))}function _e(){return`
        <div class="kp-card uk-padding uk-margin-top" id="basicauth-panel">
            <h3 class="kp-view-title uk-margin-bottom">Basic Auth</h3>
            <p class="kp-muted uk-text-small uk-margin-small-bottom">
                Enforced at the proxy level \u2014 no nginx involvement. All requests to this
                site will require valid credentials before any content is served.
            </p>

            <div class="uk-grid-small uk-margin-bottom" uk-grid>
                <div class="uk-width-1-2@s">
                    <label class="kp-label">
                        <input class="uk-checkbox" type="checkbox" id="ba-enabled">
                        &nbsp;Enable Basic Auth
                    </label>
                </div>
                <div class="uk-width-1-2@s">
                    <label class="kp-label" for="ba-realm">Realm</label>
                    <input class="uk-input kp-input" type="text" id="ba-realm" placeholder="Restricted">
                </div>
            </div>

            <div class="uk-flex uk-flex-right uk-margin-bottom">
                <button class="uk-button kp-btn-primary kp-btn-sm" id="ba-config-save">
                    <span uk-icon="check"></span> Save Settings
                </button>
            </div>

            <hr class="kp-divider">

            <h4 class="kp-label uk-margin-small-bottom">Credentials</h4>
            <div id="ba-users-list" class="uk-margin-small-bottom"></div>

            <div class="uk-grid-small uk-margin-small-top" uk-grid>
                <div class="uk-width-1-3@s">
                    <input class="uk-input kp-input" type="text" id="ba-new-username" placeholder="Username">
                </div>
                <div class="uk-width-1-3@s">
                    <input class="uk-input kp-input" type="password" id="ba-new-password" placeholder="Password">
                </div>
                <div class="uk-width-1-3@s">
                    <button class="uk-button kp-btn-ghost" id="ba-add-user">
                        <span uk-icon="plus"></span> Add / Update
                    </button>
                </div>
            </div>
        </div>`}async function Y(e){let t=document.getElementById("basicauth-panel");if(t)try{let[a,s]=await Promise.all([k.get(`/sites/${e}/basicauth`),k.get(`/sites/${e}/basicauth/users`)]),i=t.querySelector("#ba-enabled"),n=t.querySelector("#ba-realm");i&&(i.checked=!!a.Enabled),n&&(n.value=a.Realm??"Restricted"),ya(t,s??[])}catch(a){c.error("Failed to load basic auth settings: "+a.message)}}function ya(e,t){let a=e.querySelector("#ba-users-list");if(a){if(!t.length){a.innerHTML='<p class="kp-muted uk-text-small">No credentials configured.</p>';return}a.innerHTML=t.map(s=>`
        <div class="uk-flex uk-flex-middle uk-margin-small-bottom ba-user-row" data-uid="${s.id}" style="gap:8px">
            <span class="kp-mono" style="flex:1">${g(s.username)}</span>
            <a href="javascript:void(0);" class="kp-muted ba-delete-btn" uk-icon="trash" uk-tooltip="Remove credential"></a>
        </div>`).join("")}}function Ie(e,t){let a=new AbortController,s={signal:a.signal};e.addEventListener("click",async i=>{if(!i.target.closest("#ba-config-save"))return;let n=e.querySelector("#ba-config-save"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.put(`/sites/${t}/basicauth`,{enabled:e.querySelector("#ba-enabled").checked,realm:e.querySelector("#ba-realm").value.trim()||"Restricted"}),c.success("Basic auth settings saved")}catch(l){c.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}},s),e.addEventListener("click",async i=>{if(!i.target.closest("#ba-add-user"))return;let n=e.querySelector("#ba-new-username").value.trim(),o=e.querySelector("#ba-new-password").value;if(!n||!o){c.error("Username and password are required");return}let l=e.querySelector("#ba-add-user"),r=l.innerHTML;l.disabled=!0,l.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.put(`/sites/${t}/basicauth/users`,{username:n,password:o}),c.success(`Credential saved for ${n}`),e.querySelector("#ba-new-username").value="",e.querySelector("#ba-new-password").value="",await Y(t)}catch(m){c.error(m.message)}finally{l.disabled=!1,l.innerHTML=r}},s),e.addEventListener("click",async i=>{let n=i.target.closest(".ba-delete-btn");if(!n)return;let o=n.closest(".ba-user-row")?.dataset.uid;if(o)try{await k.delete(`/sites/${t}/basicauth/users/${o}`),c.success("Credential removed"),await Y(t)}catch(l){c.error(l.message)}},s),e.__basicAuthAbort?.abort(),e.__basicAuthAbort=a}var Z={1:"Nginx",2:"PHP",3:"MariaDB",4:"Redis",5:"Varnish"};function te(e,t,a){let s=a?Object.entries(a):[];return`
        <div>
            <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                <div class="uk-flex uk-flex-middle" style="gap:10px">
                    <h4 class="kp-view-title uk-margin-remove">${Z[t]}</h4>
                </div>
                <div class="uk-flex" style="gap:8px">
                    <button class="uk-button kp-btn-ghost kp-btn-sm cfg-add-row" data-type="${t}" uk-tooltip="Add a Key">
                        <span uk-icon="plus"></span>
                    </button>
                    <button class="uk-button kp-btn-secondary kp-btn-sm cfg-save" data-type="${t}" data-site="${e}" uk-tooltip="Save the Configuration">
                        <span uk-icon="check"></span>
                    </button>
                    <button class="uk-button kp-btn-ghost kp-btn-sm cfg-reset" data-type="${t}" data-site="${e}" uk-tooltip="Reset to Defaults">
                        <span uk-icon="refresh"></span>
                    </button>
                    <a class="uk-button kp-btn-ghost kp-btn-sm" href="/api/sites/${e}/configs/${t}/export" download="${e}-config-${t}.csv" uk-tooltip="Export config as CSV">
                        <span uk-icon="download"></span>
                    </a>
                    <label class="uk-button kp-btn-ghost kp-btn-sm cfg-import-label" data-type="${t}" data-site="${e}" uk-tooltip="Import config from CSV" style="cursor:pointer">
                        <span uk-icon="upload"></span>
                        <input type="file" class="cfg-import-input" accept=".csv" style="display:none" data-type="${t}" data-site="${e}">
                    </label>
                </div>
            </div>
            <div class="kp-config-grid cfg-rows" data-type="${t}">
                ${s.map(([i,n])=>ee(i,n)).join("")}
            </div>
        </div>`}function ut(e,t){let a=t?.enabled==="true",s=t?Object.entries(t).filter(([i])=>i!=="enabled"):[];return`
        <div>
            <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom" uk-tooltip="Add a Key">
                <div class="uk-flex uk-flex-middle" style="gap:10px">
                    <h4 class="kp-view-title uk-margin-remove">Varnish</h4>
                </div>
                <div class="uk-flex" style="gap:8px">
                    <button class="uk-button kp-btn-ghost kp-btn-sm cfg-add-row" data-type="5">
                        <span uk-icon="plus"></span>
                    </button>
                    <button class="uk-button kp-btn-secondary kp-btn-sm cfg-save" data-type="5" data-site="${e}" uk-tooltip="Save the Configuration">
                        <span uk-icon="check"></span>
                    </button>
                    <button class="uk-button kp-btn-ghost kp-btn-sm cfg-reset" data-type="5" data-site="${e}" uk-tooltip="Reset to Defaults">
                        <span uk-icon="refresh"></span>
                    </button>
                    <a class="uk-button kp-btn-ghost kp-btn-sm" href="/api/sites/${e}/configs/5/export" download="${e}-config-5.csv" uk-tooltip="Export config as CSV">
                        <span uk-icon="download"></span>
                    </a>
                    <label class="uk-button kp-btn-ghost kp-btn-sm cfg-import-label" data-type="5" data-site="${e}" uk-tooltip="Import config from CSV" style="cursor:pointer">
                        <span uk-icon="upload"></span>
                        <input type="file" class="cfg-import-input" accept=".csv" style="display:none" data-type="5" data-site="${e}">
                    </label>
                </div>
            </div>

            <!-- enable/disable toggle \u2014 requires pod recreate to take effect -->
            <div class="uk-margin-small-bottom" style="background:var(--kp-surface-2);padding:10px 12px;border-radius:6px">
                <label class="uk-flex uk-flex-middle" style="gap:10px;cursor:pointer">
                    <input type="checkbox" class="uk-checkbox varnish-enabled-toggle" ${a?"checked":""}>
                    <span>Enable Varnish Cache</span>
                    <span class="kp-muted uk-text-small">\u2014 requires pod recreate to take effect</span>
                </label>
            </div>

            <div class="kp-config-grid cfg-rows" data-type="5">
                ${s.map(([i,n])=>ee(i,n)).join("")}
            </div>
        </div>`}function ee(e="",t=""){return`<div class="kp-config-row">
        <div class="kp-config-key">
            <input class="cfg-key" type="text" value="${e}" placeholder="key">
        </div>
        <div class="kp-config-val">
            <input class="cfg-val" type="text" value="${t}" placeholder="value">
        </div>
        <button class="kp-config-del cfg-del-row" title="Remove">
            <span uk-icon="icon: close; ratio: 0.8"></span>
        </button>
    </div>`}function pt(e,t,a){e.addEventListener("click",s=>{if(s.target.closest(".cfg-add-row")){let i=s.target.closest(".cfg-add-row");e.querySelector(`.cfg-rows[data-type="${i.dataset.type}"]`).insertAdjacentHTML("beforeend",ee())}},{signal:a}),e.addEventListener("click",s=>{s.target.closest(".cfg-del-row")&&s.target.closest(".kp-config-row").remove()},{signal:a}),e.addEventListener("click",async s=>{let i=s.target.closest(".cfg-save");if(!i)return;let{type:n,site:o}=i.dataset,l=e.querySelectorAll(`.cfg-rows[data-type="${n}"] .kp-config-row`),r={};if(l.forEach(m=>{let p=m.querySelector(".cfg-key").value.trim(),d=m.querySelector(".cfg-val").value.trim();p&&(r[p]=d)}),n==="5"){let m=e.querySelector(".varnish-enabled-toggle");r.enabled=m?.checked?"true":"false"}try{await k.put(`/sites/${o}/configs/${n}`,r),c.success(`${Z[n]} config saved`)}catch(m){c.error(m.message)}},{signal:a}),e.addEventListener("click",async s=>{let i=s.target.closest(".cfg-reset");if(!i)return;let{type:n,site:o}=i.dataset;if(await $("Reset Config",`Reset ${Z[n]} config to defaults?`))try{let r=await k.post(`/sites/${o}/configs/${n}/reset`),m=e.querySelector(`.cfg-rows[data-type="${n}"]`);m.innerHTML=Object.entries(r).map(([p,d])=>ee(p,d)).join(""),c.success(`${Z[n]} reset to defaults`)}catch(r){c.error(r.message)}},{signal:a}),e.addEventListener("change",async s=>{let i=s.target.closest(".cfg-import-input");if(!i)return;let{type:n,site:o}=i.dataset,l=i.files[0];if(!l)return;let r=new FormData;r.append("file",l);try{let m=await fetch(`/api/sites/${o}/configs/${n}/import`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:r}),p=m.status===204?null:await m.json().catch(()=>null);if(!m.ok)throw new Error(p?.error||`HTTP ${m.status}`);let d=e.querySelector(`.cfg-rows[data-type="${n}"]`);d.innerHTML=Object.entries(p).map(([b,u])=>ee(b,u)).join(""),c.success(`${Z[n]} config imported`)}catch(m){c.error(m.message)}finally{i.value=""}},{signal:a})}function kt(e){return`
        <div id="crons-panel" data-site-id="${e}">
            <div class="kp-card uk-padding-small">
                <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                    <h3 class="kp-view-title">Cron Jobs</h3>
                    <button class="uk-button kp-btn-primary kp-btn-sm" id="cron-add-btn" uk-tooltip="Add Cron Job">
                        <span uk-icon="plus"></span>
                    </button>
                </div>
                <div id="cron-list-wrap">
                    <div uk-spinner="ratio: 0.8" style="color:var(--kp-blue)"></div>
                </div>
            </div>

            <!-- add / edit modal -->
            <div id="cron-modal" uk-modal>
                <div class="uk-modal-dialog kp-modal uk-modal-body uk-width-large">
                    <button class="uk-modal-close-default" type="button" uk-close></button>
                    <h3 class="kp-view-title" id="cron-modal-title">Add Cron Job</h3>
                    <div class="uk-form-stacked uk-margin-top">
                        <div class="uk-grid-small" uk-grid>
                            <input type="hidden" id="cron-modal-id">
                            <div class="uk-width-1-1">
                                <label class="kp-label">Label</label>
                                <input class="uk-input kp-input" type="text" id="cron-modal-label" placeholder="e.g. Daily cleanup">
                            </div>
                            <div class="uk-width-1-1">
                                <label class="kp-label">Command</label>
                                <textarea class="uk-textarea kp-textarea kp-mono" id="cron-modal-command" rows="3"
                                    placeholder="e.g. php /var/www/html/artisan schedule:run"></textarea>
                            </div>
                            <div class="uk-width-1-1">
                                <label class="kp-label">Schedule <span class="kp-muted uk-text-small">(5-field cron expression)</span></label>
                                <input class="uk-input kp-input kp-mono" type="text" id="cron-modal-schedule" placeholder="e.g. 0 3 * * *">
                                <p class="kp-muted uk-text-small uk-margin-small-top uk-margin-remove-bottom" id="cron-schedule-preview"></p>
                            </div>
                            <div class="uk-width-1-1">
                                <label class="uk-flex uk-flex-middle" style="gap:8px;cursor:pointer">
                                    <input type="checkbox" class="uk-checkbox" id="cron-modal-enabled" checked>
                                    <span class="kp-text">Enabled</span>
                                </label>
                            </div>
                        </div>
                        <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                            <button class="uk-button kp-btn-ghost uk-modal-close">Cancel</button>
                            <button class="uk-button kp-btn-primary" id="cron-modal-save">Save</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>`}function bt(e){if(!e||e.length===0)return'<p class="kp-muted uk-text-small uk-margin-remove">No cron jobs configured.</p>';let t=s=>s?new Date(s).toLocaleString():"\u2014";return`
        <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-small uk-table-middle kp-fm-table">
            <thead>
                <tr>
                    <th>Label</th>
                    <th>Schedule</th>
                    <th>Last Run</th>
                    <th>Status</th>
                    <th>Enabled</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>${e.map(s=>`
        <tr>
            <td class="kp-text">${s.Label||'<span class="kp-muted">\u2014</span>'}</td>
            <td class="kp-mono kp-text-sm">${s.Schedule}</td>
            <td class="kp-muted uk-text-small">${t(s.LastRun)}</td>
            <td>
                ${s.LastError?'<span class="kp-badge kp-badge-error">Error</span>':s.LastRun?'<span class="kp-badge kp-badge-success">OK</span>':'<span class="kp-muted uk-text-small">\u2014</span>'}
                ${s.LastOutput||s.LastError?`<a class="kp-cron-detail-btn cron-detail-btn" data-id="${s.ID}" uk-tooltip="View Run Details">
                            <span uk-icon="icon: info; ratio: 0.75"></span>
                        </a>`:""}
            </td>
            <td>
                <input type="checkbox" class="uk-checkbox cron-toggle"
                    data-id="${s.ID}" ${s.Enabled?"checked":""}>
            </td>
            <td>
                <div class="uk-flex kp-cron-actions">
                    <button class="uk-button kp-btn-ghost kp-btn-sm cron-run-btn"
                        data-id="${s.ID}" uk-tooltip="Run Now">
                        <span uk-icon="play"></span>
                    </button>
                    <button class="uk-button kp-btn-ghost kp-btn-sm cron-edit-btn"
                        data-id="${s.ID}" uk-tooltip="Edit">
                        <span uk-icon="pencil"></span>
                    </button>
                    <button class="uk-button kp-btn-danger kp-btn-sm cron-delete-btn"
                        data-id="${s.ID}" uk-tooltip="Delete">
                        <span uk-icon="trash"></span>
                    </button>
                </div>
            </td>
        </tr>`).join("")}</tbody>
        </table>
        </div>`}async function he(e,t){let a=e.querySelector("#cron-list-wrap");if(a)try{let s=await k.get(`/sites/${t}/crons`);a.innerHTML=bt(s)}catch(s){a.innerHTML=`<p class="kp-muted uk-text-small">Failed to load cron jobs: ${g(s.message)}</p>`}}function ht(e,t){let a=[],s=e.querySelector("#cron-modal"),i=e.querySelector("#cron-modal-title"),n=e.querySelector("#cron-modal-id"),o=e.querySelector("#cron-modal-label"),l=e.querySelector("#cron-modal-command"),r=e.querySelector("#cron-modal-schedule"),m=e.querySelector("#cron-schedule-preview"),p=e.querySelector("#cron-modal-enabled");r?.addEventListener("input",()=>{m.textContent=mt(r.value.trim())}),e.querySelector("#cron-add-btn")?.addEventListener("click",()=>{i.textContent="Add Cron Job",n.value="",o.value="",l.value="",r.value="",m.textContent="",p.checked=!0,UIkit.modal(s).show()}),e.querySelector("#cron-modal-save")?.addEventListener("click",async()=>{let d=l.value.trim(),b=r.value.trim();if(!d||!b){c.error("Command and schedule are required");return}let u={label:o.value.trim(),command:d,schedule:b,enabled:p.checked},h=n.value;try{h?(await k.put(`/sites/${t}/crons/${h}`,u),c.success("Cron job updated")):(await k.post(`/sites/${t}/crons`,u),c.success("Cron job created")),UIkit.modal(s).hide(),await he(e,t),a=await k.get(`/sites/${t}/crons`)}catch(f){c.error(f.message)}}),e.querySelector("#cron-list-wrap")?.addEventListener("click",async d=>{let b=d.target.closest(".cron-detail-btn");if(b){let v=b.dataset.id,w=a.find(C=>String(C.ID)===v);if(!w)return;document.body.insertAdjacentHTML("beforeend",`
                <div id="cron-detail-modal" uk-modal>
                    <div class="uk-modal-dialog kp-modal uk-modal-body uk-width-large">
                        <button class="uk-modal-close-default" type="button" uk-close></button>
                        <h3 class="kp-view-title uk-margin-bottom">Run Details \u2014 ${g(w.Label||String(w.ID))}</h3>
                        <div class="uk-margin-small-bottom">
                            <label class="kp-label">Output</label>
                            <pre class="kp-cron-output">${g(w.LastOutput||"(no output)")}</pre>
                        </div>
                        <div class="uk-margin-small-top">
                            <label class="kp-label">Error</label>
                            <pre class="kp-cron-output kp-cron-output-error">${g(w.LastError||"(no error)")}</pre>
                        </div>
                    </div>
                </div>`);let E=document.getElementById("cron-detail-modal");UIkit.modal(E).show(),E.addEventListener("hidden",()=>E.remove(),{once:!0});return}let u=d.target.closest(".cron-edit-btn");if(u){let v=u.dataset.id,w=a.find(E=>String(E.ID)===v);if(!w)return;i.textContent="Edit Cron Job",n.value=w.ID,o.value=w.Label||"",l.value=w.Command,r.value=w.Schedule,m.textContent=mt(w.Schedule),p.checked=w.Enabled,UIkit.modal(s).show();return}let h=d.target.closest(".cron-delete-btn");if(h){let v=h.dataset.id;if(!await $("Delete Cron Job","This will permanently remove the cron job. Continue?"))return;try{await k.delete(`/sites/${t}/crons/${v}`),c.success("Cron job deleted"),await he(e,t),a=await k.get(`/sites/${t}/crons`)}catch(E){c.error(E.message)}return}let f=d.target.closest(".cron-run-btn");if(f){let v=f.dataset.id;try{await k.post(`/sites/${t}/crons/${v}/run`)}catch(B){c.error(B.message);return}S("Running Cron Job","Executing the job inside the container \u2014 please wait.");let w=null;try{w=(await k.get(`/sites/${t}/crons`)).find(F=>String(F.ID)===v)?.LastRun??null}catch{}let E=Date.now()+300*1e3,C=setInterval(async()=>{try{let B=await k.get(`/sites/${t}/crons`),F=B.find(se=>String(se.ID)===v);if(!F||F.LastRun!==w||Date.now()>E){clearInterval(C),x(),a=B??[];let se=e.querySelector("#cron-list-wrap");se&&(se.innerHTML=bt(B)),F?.LastError?c.error(`Job failed: ${F.LastError}`):c.success("Cron job complete")}}catch{}},2e3);return}}),e.querySelector("#cron-list-wrap")?.addEventListener("change",async d=>{let b=d.target.closest(".cron-toggle");if(!b)return;let u=b.dataset.id;try{await k.patch(`/sites/${t}/crons/${u}/toggle`,{enabled:b.checked}),c.success(b.checked?"Cron job enabled":"Cron job disabled")}catch(h){c.error(h.message),b.checked=!b.checked}}),k.get(`/sites/${t}/crons`).then(d=>{a=d??[]}).catch(()=>{})}function mt(e){if(!e)return"";let t=e.trim().split(/\s+/);if(t.length!==5)return"invalid expression";let[a,s,i,n,o]=t;if(e==="* * * * *")return"every minute";if(a!=="*"&&s!=="*"&&i==="*"&&n==="*"&&o==="*")return`daily at ${s.padStart(2,"0")}:${a.padStart(2,"0")}`;if(a!=="*"&&s!=="*"&&i==="*"&&n==="*"&&o!=="*"){let l=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return`weekly on ${o.split(",").map(m=>l[parseInt(m)]??m).join(", ")} at ${s.padStart(2,"0")}:${a.padStart(2,"0")}`}return a.startsWith("*/")?`every ${a.slice(2)} minutes`:s.startsWith("*/")?`every ${s.slice(2)} hours`:e}function yt(e,t){return`
        <div id="dbtools-panel" data-site-id="${e}">

            <!-- tab pills -->
            <ul class="kp-tab-pills" id="kp-db-pills">
                <li data-tab="db-export"><a href="#"><span uk-icon="icon: download; ratio: 0.85"></span> Export</a></li>
                <li data-tab="db-import"><a href="#"><span uk-icon="icon: upload; ratio: 0.85"></span> Import</a></li>
                ${t===1?'<li data-tab="db-replace"><a href="#"><span uk-icon="icon: search; ratio: 0.85"></span> Search &amp; Replace</a></li>':""}
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
                        Without wipe, the dump is merged into the existing database \u2014 tables the dump recreates are
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

                ${t===1?`
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
                </li>`:""}

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
        </div>`}function wt(e,t){let a=e.querySelector("#dbtools-panel"),s=e.querySelector("#kp-db-pills"),i=e.querySelector("#kp-db-switcher");if(!a||!s||!i)return;let n=a.dataset.siteId,o=[...s.querySelectorAll(":scope > li")],l=(r,m)=>{UIkit.switcher(i).show(r),o.forEach((p,d)=>p.classList.toggle("kp-pill-active",d===r)),m&&history.replaceState(null,"",`#site-detail/${n}/${o[r].dataset.tab}`)};o.forEach((r,m)=>{r.querySelector(":scope > a").addEventListener("click",p=>{p.preventDefault(),l(m,!0)})}),l(Math.max(0,o.findIndex(r=>r.dataset.tab===t)),!1)}function xt(e,t){e.querySelector("#dbtools-dump-btn")?.addEventListener("click",()=>{let a=`${Date.now().toString(36)}${Math.random().toString(36).slice(2,10)}`,s=`kp_dl_${a}`;S("Preparing Download","Your database dump is being generated \u2014 your download will begin automatically. Do not close this tab."),setTimeout(()=>{let i=document.createElement("a");i.href=`/api/sites/${t}/db/dump?dl=${a}`,i.style.display="none",document.body.appendChild(i),i.click(),document.body.removeChild(i);let n=Date.now(),o=setInterval(()=>{!document.cookie.split(";").some(r=>r.trim().startsWith(`${s}=`))&&Date.now()-n<18e5||(clearInterval(o),document.cookie=`${s}=; Path=/; Max-Age=0`,x())},500)},300)}),e.querySelector("#dbtools-upload-btn")?.addEventListener("click",async()=>{let a=e.querySelector("#dbtools-file-input");if(!a?.files?.length){c.error("Select a .sql or .sql.gz file first");return}let s=await vt(e);if(s===null)return;let i=new FormData;i.append("dump",a.files[0]),i.append("wipe",s?"1":"0"),S("Importing Database","Uploading and importing \u2014 the site is in maintenance mode until this completes.");try{await fetch(`/api/sites/${t}/db/import/upload`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:i,credentials:"same-origin"}).then(async n=>{if(!n.ok){let o=await n.json().catch(()=>({}));throw new Error(o.error||`HTTP ${n.status}`)}})}catch(n){x(),c.error(n.message);return}a.value="",gt(e,t)}),e.querySelector("#dbtools-sftp-list")?.addEventListener("click",async a=>{let s=a.target.closest(".dbtools-sftp-btn");if(!s)return;let i=await vt(e);if(i!==null){S("Importing Database","Importing from SFTP \u2014 the site is in maintenance mode until this completes.");try{await k.post(`/sites/${t}/db/import/sftp`,{filename:s.dataset.file,wipe:i})}catch(n){x(),c.error(n.message);return}gt(e,t)}}),e.querySelector("#dbtools-sr-preview")?.addEventListener("click",()=>ft(e,t,!0)),e.querySelector("#dbtools-sr-run")?.addEventListener("click",()=>ft(e,t,!1)),e.querySelector("#dbtools-tables-wrap")?.addEventListener("change",a=>{a.target.id==="dbtools-tables-all"&&e.querySelectorAll(".dbtools-table-check").forEach(s=>{s.checked=a.target.checked}),Be(e)}),e.querySelectorAll(".dbtools-maintain-btn").forEach(a=>{a.addEventListener("click",()=>wa(e,t,a.dataset.action))}),e.querySelector("#dbtools-tables-refresh")?.addEventListener("click",()=>qe(e,t)),qe(e,t),e.querySelector("#dbtools-sftp-refresh")?.addEventListener("click",()=>Ce(e,t)),Ce(e,t)}async function vt(e){let t=!!e.querySelector("#dbtools-wipe")?.checked;return await $(t?"Wipe & Import Database":"Import Database",t?"Every table, view and routine in this site's database will be dropped before the import. This cannot be undone.":"The dump will be merged into this site's database, replacing any tables it recreates. This cannot be undone.")?t:null}async function Ce(e,t){let a=e.querySelector("#dbtools-sftp-list");if(a)try{let s=await k.get(`/sites/${t}/db/import/files`);if(!s||s.length===0){a.innerHTML='<p class="kp-muted uk-text-small uk-margin-remove">No files found.</p>';return}a.innerHTML=s.map(i=>`
            <div class="uk-flex uk-flex-middle uk-flex-between uk-margin-small-bottom">
                <span class="kp-mono uk-text-small">${g(i)}</span>
                <button class="uk-button kp-btn-primary kp-btn-sm dbtools-sftp-btn" data-file="${g(i)}">
                    Import
                </button>
            </div>`).join("")}catch(s){a.innerHTML=`<p class="kp-muted uk-text-small">Failed to list files: ${g(s.message)}</p>`}}function gt(e,t){let a=Date.now()+18e5,s=setInterval(async()=>{try{let i=await k.get(`/sites/${t}/db/import/status`);(!i?.active||Date.now()>a)&&(clearInterval(s),x(),i?.active?c.error("Import timed out \u2014 check server logs"):i?.error?c.error(`Import failed: ${i.error}`):c.success("Import complete"),await Ce(e,t))}catch{Date.now()>a&&(clearInterval(s),x(),c.error("Import status unavailable \u2014 check server logs"))}},3e3)}async function ft(e,t,a){let s=e.querySelector("#dbtools-sr-search")?.value??"",i=e.querySelector("#dbtools-sr-replace")?.value??"",n=e.querySelector("#dbtools-sr-result");if(!s){c.error("Enter a search term first");return}if(!(!a&&!await $("Run Search & Replace",`Every occurrence of "${s}" in this site's database will be replaced with "${i}". This cannot be undone \u2014 download a dump first if unsure.`))){S(a?"Previewing Search & Replace":"Running Search & Replace","Scanning every table in the site's database \u2014 this may take a while on large sites.");try{let o=await k.post(`/sites/${t}/db/search-replace`,{search:s,replace:i,dry_run:a},18e5);x();let l=o?.count??0,r=a?`${l} replacement${l===1?"":"s"} would be made`:`${l} replacement${l===1?"":"s"} made`;n&&(n.innerHTML=`<p class="kp-text uk-text-small uk-margin-small-top uk-margin-remove-bottom">${g(r)}</p>`),a||c.success(r)}catch(o){x(),c.error(o.message)}}}async function qe(e,t){let a=e.querySelector("#dbtools-tables-wrap");if(a){try{let s=await k.get(`/sites/${t}/db/tables`);if(!s||s.length===0){a.innerHTML='<p class="kp-muted uk-text-small uk-margin-remove">No tables found.</p>',Be(e);return}let i=s.map(n=>`
            <tr>
                <td><input class="uk-checkbox dbtools-table-check" type="checkbox" value="${g(n.name)}"></td>
                <td class="kp-mono" style="font-size:0.8rem">${g(n.name)}</td>
                <td>${g(n.engine||"\u2014")}</td>
                <td class="uk-visible@s">${Number(n.rows).toLocaleString()}</td>
                <td>${L(n.size)}</td>
            </tr>`).join("");a.innerHTML=`
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
                <tbody>${i}</tbody>
            </table>
            </div>`}catch(s){a.innerHTML=`<p class="kp-muted uk-text-small">Failed to list tables: ${g(s.message)}</p>`}Be(e)}}function Be(e){let t=[...e.querySelectorAll(".dbtools-table-check")],a=t.filter(i=>i.checked).length,s=e.querySelector("#dbtools-tables-all");s&&(s.checked=a>0&&a===t.length,s.indeterminate=a>0&&a<t.length),e.querySelectorAll(".dbtools-maintain-btn").forEach(i=>{i.disabled=a===0})}async function wa(e,t,a){let s=[...e.querySelectorAll(".dbtools-table-check:checked")].map(l=>l.value);if(s.length===0)return;let i=a==="repair"?"Repair":"Optimize";if(!await $(`${i} Tables`,`${i} ${s.length} table${s.length===1?"":"s"}? Tables may be briefly locked while this runs.`))return;S(`${i} Running`,`Running ${a} on ${s.length} table${s.length===1?"":"s"} \u2014 this may take a while on large tables.`);let o=e.querySelector("#dbtools-maintain-result");try{let l=await k.post(`/sites/${t}/db/tables/maintain`,{action:a,tables:s},18e5);x(),o&&(o.innerHTML=`<pre class="kp-cron-output uk-margin-small-top">${g(l?.output||"(no output)")}</pre>`),c.success(`${i} complete`)}catch(l){x(),c.error(l.message)}await qe(e,t)}var q="";function Tt(e){return`
        <div class="kp-card uk-padding uk-margin-top" id="fm-root" data-site="${e}">
            <div class="uk-flex uk-flex-middle uk-flex-between uk-margin-bottom" style="gap:8px;flex-wrap:wrap">
                <nav id="fm-breadcrumb" class="kp-fm-breadcrumb uk-text-small"></nav>
                <div class="uk-flex" style="gap:8px;flex-wrap:wrap">
                    <button class="uk-button kp-btn-ghost kp-btn-sm" id="fm-new-file" uk-tooltip="New File"><span uk-icon="file-edit"></span></button>
                    <button class="uk-button kp-btn-ghost kp-btn-sm" id="fm-new-dir" uk-tooltip="New Folder"><span uk-icon="folder"></span></button>
                    <label class="uk-button kp-btn-ghost kp-btn-sm" style="cursor:pointer" uk-tooltip="Upload">
                        <span uk-icon="upload"></span>
                        <input type="file" id="fm-upload" multiple style="display:none">
                    </label>
                    <button class="uk-button kp-btn-ghost kp-btn-sm" id="fm-refresh" uk-tooltip="Refresh"><span uk-icon="refresh"></span></button>
                </div>
            </div>
            <div id="fm-list"></div>
        </div>`}function xa(){let e=q?q.split("/"):[],t="",a=['<a href="#" data-path="">html</a>'];for(let s of e)t=t?t+"/"+s:s,a.push(`<span class="kp-fm-sep">/</span><a href="#" data-path="${g(t)}">${g(s)}</a>`);return a.join("")}function Sa(e){let t=new Date(e);return isNaN(t)?"":t.toLocaleString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function St(e){return e==="d"?"folder":e==="l"?"link":"file-text"}function V(e,t){return e?e+"/"+t:t}var $t=new Set(["php","js","jsx","ts","tsx","css","scss","sass","less","html","htm","xml","json","txt","md","markdown","yml","yaml","ini","conf","cnf","toml","env","sh","bash","sql","log","csv","tsv","svg","htaccess","gitignore","lock","map"]);function $a(e,t){if(t)return!1;let a=e.lastIndexOf(".");return e.startsWith(".")&&a===0?$t.has(e.slice(1).toLowerCase()):a>=0&&$t.has(e.slice(a+1).toLowerCase())}function Ea(e){if(!e||!e.length)return N("folder","This folder is empty");let t=document.getElementById("fm-root").dataset.site;return`
        <table class="uk-table uk-table-divider uk-table-small uk-table-middle kp-fm-table">
            <thead>
                <tr>
                    <th>Name</th><th>Size</th><th>Perms</th><th>Modified</th><th></th>
                </tr>
            </thead>
            <tbody>${e.map(s=>{let i=V(q,s.name),n=s.is_dir,o=$a(s.name,n),l=n?`<a href="#" class="fm-nav" data-path="${g(i)}"><span uk-icon="icon: ${St(s.type)}; ratio: 0.9"></span> ${g(s.name)}</a>`:`<span><span uk-icon="icon: ${St(s.type)}; ratio: 0.9"></span> ${g(s.name)}</span>`;return`
            <tr data-path="${g(i)}" data-name="${g(s.name)}" data-dir="${n?1:0}" data-mode="${g(s.mode)}">
                <td class="kp-fm-name">${l}</td>
                <td class="uk-text-nowrap">${L(s.size,n)}</td>
                <td><code class="kp-mono">${g(s.mode)}</code></td>
                <td class="uk-text-nowrap uk-text-small kp-muted">${Sa(s.mod_time)}</td>
                <td class="uk-text-right uk-text-nowrap">
                    ${o?`<button class="kp-fm-act fm-edit" data-path="${g(i)}" uk-tooltip="Edit"><span uk-icon="icon: pencil; ratio: 0.85"></span></button>`:""}
                    ${n?"":`<a class="kp-fm-act fm-download" href="/api/sites/${t}/files/download?path=${encodeURIComponent(i)}" uk-tooltip="Download"><span uk-icon="icon: download; ratio: 0.85"></span></a>`}
                    <button class="kp-fm-act fm-chmod" uk-tooltip="Permissions"><span uk-icon="icon: settings; ratio: 0.85"></span></button>
                    <button class="kp-fm-act fm-rename" uk-tooltip="Rename / Move"><span uk-icon="icon: move; ratio: 0.85"></span></button>
                    <button class="kp-fm-act fm-copy" uk-tooltip="Copy"><span uk-icon="icon: copy; ratio: 0.85"></span></button>
                    <button class="kp-fm-act fm-delete" uk-tooltip="Delete"><span uk-icon="icon: trash; ratio: 0.85"></span></button>
                </td>
            </tr>`}).join("")}</tbody>
        </table>`}async function I(e){let t=document.getElementById("fm-list"),a=document.getElementById("fm-breadcrumb");if(t){t.innerHTML=ne(),a&&(a.innerHTML=xa());try{let s=await k.get(`/sites/${e}/files?path=${encodeURIComponent(q)}`);t.innerHTML=Ea(s)}catch(s){t.innerHTML=T("Failed to list files: "+s.message)}}}function Et(e,t){q=t||"",I(e)}function ae(e,t,a=""){return new Promise(s=>{let i="fm-prompt-modal";document.getElementById(i)?.remove();let n=document.createElement("div");n.id=i,n.setAttribute("uk-modal",""),n.innerHTML=`
            <div class="uk-modal-dialog uk-modal-body kp-modal">
                <h3 class="uk-modal-title">${g(e)}</h3>
                <label class="kp-label uk-margin-small-bottom">${g(t)}</label>
                <input class="uk-input kp-input" id="fm-prompt-input" value="${g(a)}" autocomplete="off">
                <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                    <button class="uk-button kp-btn-ghost uk-modal-close">Cancel</button>
                    <button class="uk-button kp-btn-primary" id="fm-prompt-ok">OK</button>
                </div>
            </div>`,document.body.appendChild(n),window.UIkit&&UIkit.icon(n);let o=UIkit.modal(n),l=n.querySelector("#fm-prompt-input"),r=!1,m=p=>{r||(r=!0,s(p),o.hide())};n.querySelector("#fm-prompt-ok").addEventListener("click",()=>m(l.value.trim()||null)),l.addEventListener("keydown",p=>{p.key==="Enter"&&(p.preventDefault(),m(l.value.trim()||null))}),UIkit.util.on(n,"hidden",()=>{r||(r=!0,s(null)),n.remove()}),o.show(),setTimeout(()=>l.focus(),50)})}async function La(e,t){let a=V(q,t.name),s=await fetch(`/api/sites/${e}/files/upload?path=${encodeURIComponent(a)}`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:t}),i=s.status===204?null:await s.json().catch(()=>null);if(!s.ok)throw new Error(i?.error||`HTTP ${s.status}`)}function Pt(e,t){q="",e.addEventListener("click",a=>{let s=a.target.closest("#fm-breadcrumb a");if(s){a.preventDefault(),Et(t,s.dataset.path);return}let i=a.target.closest(".fm-nav");if(i){a.preventDefault(),Et(t,i.dataset.path);return}let n=a.target.closest(".fm-edit");if(n){a.preventDefault(),_a(t,n.dataset.path,n.dataset.path.split("/").pop());return}}),e.querySelector("#fm-new-file")?.addEventListener("click",async()=>{let a=await ae("New File","File name");if(a)try{await k.post(`/sites/${t}/files/file`,{path:V(q,a)}),I(t)}catch(s){c.error(s.message)}}),e.querySelector("#fm-new-dir")?.addEventListener("click",async()=>{let a=await ae("New Folder","Folder name");if(a)try{await k.post(`/sites/${t}/files/dir`,{path:V(q,a)}),I(t)}catch(s){c.error(s.message)}}),e.querySelector("#fm-upload")?.addEventListener("change",async a=>{let s=[...a.target.files];if(s.length)try{for(let i of s)await La(t,i);c.success(s.length===1?"File uploaded":`${s.length} files uploaded`),I(t)}catch(i){c.error(i.message)}finally{a.target.value=""}}),e.querySelector("#fm-refresh")?.addEventListener("click",()=>I(t)),e.addEventListener("click",async a=>{let s=a.target.closest("tr[data-path]");if(!s)return;let i=s.dataset.path,n=s.dataset.name;if(a.target.closest(".fm-chmod")){let o=await ae("Permissions",`Octal mode for "${n}"`,s.dataset.mode);if(!o)return;try{await k.patch(`/sites/${t}/files/chmod`,{path:i,mode:o}),I(t)}catch(l){c.error(l.message)}return}if(a.target.closest(".fm-rename")){let o=await ae("Rename / Move","New path (relative to current folder)",n);if(!o||o===n)return;try{await k.post(`/sites/${t}/files/move`,{src:i,dst:V(q,o)}),I(t)}catch(l){c.error(l.message)}return}if(a.target.closest(".fm-copy")){let o=await ae("Copy","Destination name",n+"-copy");if(!o)return;try{await k.post(`/sites/${t}/files/copy`,{src:i,dst:V(q,o)}),I(t)}catch(l){c.error(l.message)}return}if(a.target.closest(".fm-delete")){if(!await $("Delete",`Delete "${n}"? This cannot be undone.`))return;try{await k.delete(`/sites/${t}/files?path=${encodeURIComponent(i)}`),I(t)}catch(l){c.error(l.message)}return}})}var ve=null;function Lt(e){if(document.querySelector(`link[href="${e}"]`))return;let t=document.createElement("link");t.rel="stylesheet",t.href=e,document.head.appendChild(t)}function Me(e){return new Promise((t,a)=>{let s=document.querySelector(`script[src="${e}"]`);if(s){if(s.dataset.loaded)return t();s.addEventListener("load",()=>t()),s.addEventListener("error",()=>a(new Error("failed to load "+e)));return}let i=document.createElement("script");i.src=e,i.addEventListener("load",()=>{i.dataset.loaded="1",t()}),i.addEventListener("error",()=>a(new Error("failed to load "+e))),document.head.appendChild(i)})}function Ta(){if(ve)return ve;let e="https://cdn.jsdelivr.net/npm/codemirror@5";return Lt(`${e}/lib/codemirror.css`),Lt(`${e}/theme/material-darker.css`),ve=Me(`${e}/lib/codemirror.js`).then(()=>Promise.all([Me(`${e}/mode/meta.js`),Me(`${e}/addon/mode/loadmode.js`)])).then(()=>{window.CodeMirror.modeURL=`${e}/mode/%N/%N.js`}),ve}function Pa(e){let t=window.CodeMirror.findModeByFileName(e);return t?t.mode:null}async function _a(e,t,a){let s;try{s=await k.get(`/sites/${e}/files/content?path=${encodeURIComponent(t)}`)}catch(b){let u=/too large/i.test(b.message)?"File is too large to edit \u2014 download it instead.":/binary/i.test(b.message)?"Binary file \u2014 download it instead of editing.":b.message;c.error(u);return}try{await Ta()}catch(b){c.error("Editor failed to load: "+b.message);return}let i="fm-editor-modal";document.getElementById(i)?.remove();let n=document.createElement("div");n.id=i,n.setAttribute("uk-modal",""),n.innerHTML=`
        <div class="uk-modal-dialog kp-modal kp-fm-editor-dialog">
            <div class="uk-flex uk-flex-middle uk-flex-between uk-padding-small">
                <h3 class="uk-modal-title uk-margin-remove"><span uk-icon="file-text"></span> ${g(a)} <span id="fm-ed-dirty" class="kp-muted uk-text-small" hidden>\u2022 unsaved</span></h3>
                <div class="uk-flex" style="gap:8px">
                    <button class="uk-button kp-btn-primary kp-btn-sm" id="fm-ed-save"><span uk-icon="icon: check; ratio: 0.85"></span> Save</button>
                    <button class="uk-button kp-btn-ghost kp-btn-sm uk-modal-close"><span uk-icon="icon: close; ratio: 0.85"></span></button>
                </div>
            </div>
            <div class="kp-fm-editor-body">
                <textarea id="fm-ed-area"></textarea>
            </div>
        </div>`,document.body.appendChild(n),window.UIkit&&UIkit.icon(n);let o=UIkit.modal(n,{bgClose:!1,escClose:!0}),l=n.querySelector("#fm-ed-dirty"),r=null,m=!0,p=b=>{m=!b,l.hidden=!b};UIkit.util.on(n,"shown",()=>{if(r)return;r=window.CodeMirror.fromTextArea(n.querySelector("#fm-ed-area"),{value:s.content,lineNumbers:!0,theme:"material-darker",indentUnit:4,lineWrapping:!1,extraKeys:{"Ctrl-S":d,"Cmd-S":d,"Ctrl-F":"findPersistent","Ctrl-/":"toggleComment"}}),r.setValue(s.content),r.on("change",()=>p(!0));let b=Pa(a);b&&(r.setOption("mode",b),window.CodeMirror.autoLoadMode(r,b)),setTimeout(()=>r.refresh(),30)}),UIkit.util.on(n,"hidden",()=>n.remove());async function d(){if(!r)return;let b=n.querySelector("#fm-ed-save"),u=b.innerHTML;b.disabled=!0,b.innerHTML='<div uk-spinner="ratio: 0.6"></div>';try{await k.put(`/sites/${e}/files/content`,{path:t,content:r.getValue()}),p(!1),c.success("Saved"),I(e)}catch(h){c.error(h.message)}finally{b.disabled=!1,b.innerHTML=u}}n.querySelector("#fm-ed-save").addEventListener("click",d),UIkit.util.on(n,"beforehide",b=>{!m&&!window.confirm("Discard unsaved changes?")&&b.preventDefault()}),o.show()}var Ia=2e3;function Ae(e,t){return`
        <div>
            <div class="kp-log-controls">
                <select class="uk-select kp-select" id="log-container" style="width:140px;height:38px">
                    ${t===6?'<option value="access">Access Log</option><option value="waf">WAF Log</option>':`<option value="access">Access</option>
            <option value="nginx">Nginx</option>
                    ${(()=>{switch(t){case 1:case 2:return'<option value="php">PHP-FPM</option>';case 4:return'<option value="app">Node.js</option>';case 5:return'<option value="app">.NET</option>';case 7:return'<option value="app">Python</option>';default:return""}})()}
                    <option value="waf">WAF Log</option>`}
                </select>
                <select class="uk-select kp-select" id="log-tail" style="width:120px;height:38px">
                    <option value="100">100 lines</option>
                    <option value="250">250 lines</option>
                    <option value="500">500 lines</option>
                    <option value="1000">1000 lines</option>
                </select>
                <button class="uk-button kp-btn-secondary kp-btn-sm" id="log-connect" uk-tooltip="Start Tailing the Logs">
                    <span uk-icon="play"></span>
                </button>
                <button class="uk-button kp-btn-ghost kp-btn-sm" id="log-disconnect" disabled uk-tooltip="Stop Tailing the Logs">
                    <span uk-icon="ban"></span>
                </button>
                <button class="uk-button kp-btn-ghost kp-btn-sm" id="log-clear" uk-tooltip="Clear the Logs">
                    <span uk-icon="trash"></span>
                </button>
                <label style="font-size:0.82rem;color:var(--kp-text-dim);display:flex;align-items:center;gap:6px">
                    <input type="checkbox" class="uk-checkbox" id="log-autoscroll" checked>
                    Auto-scroll
                </label>
            </div>
            <div class="kp-log-header">
                <div class="kp-log-dot kp-log-dot-red"></div>
                <div class="kp-log-dot kp-log-dot-yellow"></div>
                <div class="kp-log-dot kp-log-dot-green"></div>
                <span style="font-size:0.72rem;color:var(--kp-text-dim);margin-left:8px" id="log-status">Disconnected</span>
            </div>
            <div class="kp-log-wrap" id="log-output"></div>
        </div>`}function _t(e,t){let a=null,s=!1,i=e.querySelector("#log-output"),n=e.querySelector("#log-connect"),o=e.querySelector("#log-disconnect"),l=e.querySelector("#log-clear"),r=e.querySelector("#log-autoscroll"),m=e.querySelector("#log-status");function p(u){for(u.split(`
`).forEach(h=>{if(!h)return;let f=document.createElement("div");f.className=h.match(/WAF BLOCK/i)?"kp-log-line-err":h.match(/WAF DETECT/i)?"kp-log-line-warn":h.match(/error|crit|emerg/i)?"kp-log-line-err":h.match(/warn/i)?"kp-log-line-warn":h.match(/info|notice/i)?"kp-log-line-info":"",f.textContent=h,i.appendChild(f)});i.childElementCount>Ia;)i.removeChild(i.firstChild);r.checked&&(i.scrollTop=i.scrollHeight)}function d(){a&&(a.close(),a=null),s=!1,n.disabled=!1,o.disabled=!0,m&&(m.textContent="Disconnected")}n.addEventListener("click",()=>{d();let u=e.querySelector("#log-container").value,h=e.querySelector("#log-tail").value,f=location.protocol==="https:"?"wss":"ws",v=u==="waf"?`${f}://${location.host}/api/sites/${t}/logs/waf?tail=${h}`:u==="proxy"?`${f}://${location.host}/api/sites/${t}/logs/proxy?tail=${h}`:u==="access"?`${f}://${location.host}/api/sites/${t}/logs/proxy?tail=${h}`:`${f}://${location.host}/api/sites/${t}/logs?container=${u}&tail=${h}`;a=new WebSocket(v),a.onopen=()=>{s=!0,n.disabled=!0,o.disabled=!1,m&&(m.textContent=`Connected \u2014 ${u}`)},a.onmessage=w=>p(w.data),a.onerror=()=>{},a.onclose=()=>{s=!1,n.disabled=!1,o.disabled=!0,m&&(m.textContent="Disconnected")}}),o.addEventListener("click",d),l.addEventListener("click",()=>{i.innerHTML=""}),e.querySelector("#log-container").addEventListener("change",()=>{a&&a.readyState===WebSocket.OPEN&&(d(),n.click())});let b=y.go.bind(y);y.go=function(u,h={}){return a&&d(),b(u,h)}}function Ca(e){switch(e){case"valid":return'<span class="kp-ssl-valid" uk-icon="icon: lock; ratio: 0.85" uk-tooltip="Valid SSL certificate"></span>';case"self-signed":return'<span class="kp-ssl-self-signed" uk-icon="icon: lock; ratio: 0.85" uk-tooltip="Self-signed certificate"></span>';case"expired":return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="Expired certificate"></span>';case"mismatch":return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="Certificate does not match this domain"></span>';default:return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="No SSL certificate"></span>'}}async function It(e,t){try{let a=await k.get(`/ssl-status?domain=${encodeURIComponent(e)}`),s=document.getElementById(`ssl-icon-${t}`);s&&(s.outerHTML=Ca(a.status))}catch{}}function Ct(e){e.forEach(t=>It(t.Domain,t.ID))}function qt(e,t,a,s=0,i=null,n=[]){let o=e.SiteType!==3&&e.PMAPort>0;return`
        <div class="uk-grid-medium" uk-grid>
            <div class="uk-width-1-2@m">
                <div class="kp-card uk-padding-small">
                    <h3 class="kp-view-title uk-margin-bottom">Site Info</h3>
                    <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
                        <tbody>
                            <tr><td class="kp-muted">Name</td><td>${e.Name}</td></tr>
                            ${i?`<tr><td class="kp-muted">Parent</td><td><a href="javascript:void(0)" data-action="manage" data-id="${s}" style="color:var(--kp-cyan)">${i}</a></td></tr>`:""}
                            <tr><td class="kp-muted">Internal Port</td><td>:${e.Port}</td></tr>
                            <tr><td class="kp-muted">Type</td><td>${G(e.SiteType)}</td></tr>
                            <tr><td class="kp-muted">Version</td><td>${R(e)}</td></tr>
                            <tr><td class="kp-muted">Status</td><td>${A(e.SiteStatus)}</td></tr>
                            <tr><td class="kp-muted">Containers</td><td><div id="sd-health-badges" class="kp-health-badges"></div></td></tr>
                            <tr><td class="kp-muted">Created</td><td>${new Date(e.Created).toLocaleString()}</td></tr>
                        </tbody>
                    </table>
                </div>
                
                ${n.length?`
                <div class="kp-card uk-padding-small uk-margin-small-top">
                    <h3 class="kp-view-title uk-margin-bottom">Site Sync</h3>
                    <p class="kp-muted uk-text-small uk-margin-remove-bottom">
                        Push files and/or database from this site onto its parent or one of its clones.
                    </p>
                    <div class="uk-flex uk-margin-small-top" style="gap:8px">
                        <button class="uk-button kp-btn-secondary kp-btn-sm" id="sync-push-btn">
                            <span uk-icon="cloud-upload"></span> Push Site
                        </button>
                    </div>
                </div>`:""}

                ${o?`
                <div class="kp-card uk-padding-small uk-margin-small-top">
                    <h3 class="kp-view-title uk-margin-bottom">phpMyAdmin</h3>
                    <p class="kp-muted uk-text-small uk-margin-remove-bottom">
                        Opens a secure time-limited session. Link expires after 10 minutes or first use.
                    </p>
                    <div class="uk-margin-small-top">
                        <button class="uk-button kp-btn-secondary kp-btn-sm" id="pma-open-btn">
                            <span uk-icon="database"></span> Open phpMyAdmin
                        </button>
                    </div>
                </div>`:""}
                
            </div>

            <div class="uk-width-1-2@m">

                <div class="kp-card uk-padding-small">
                    <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                        <h3 class="kp-view-title uk-margin-bottom">Domains</h3>
                        <button class="uk-button kp-btn-secondary kp-btn-sm" id="domain-add-btn" uk-tooltip="Add a New Domain">
                            <span uk-icon="plus"></span>
                        </button>
                    </div>
                    <div id="domain-list">
                        ${t.length?t.map(Bt).join(""):'<p class="kp-muted uk-text-small">No domains configured</p>'}
                    </div>
                    <div id="domain-add-form" class="uk-hidden uk-margin-small-top">
                        <div class="uk-flex kp-domain-add-wrap">
                            <input class="uk-input kp-input kp-input-sm" id="domain-add-input" type="text" placeholder="example.com">
                            <button class="uk-button kp-btn-primary kp-btn-sm" id="domain-save-btn">Add</button>
                            <button class="uk-button kp-btn-ghost kp-btn-sm" id="domain-cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>

                <div class="kp-card uk-padding-small uk-margin-small-top">
                    <h3 class="kp-view-title uk-margin-bottom">SFTP Access</h3>
                    <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
                        <tbody>
                            <tr><td class="kp-muted">Host</td><td class="kp-mono">${location.hostname}</td></tr>
                            <tr><td class="kp-muted">Port</td><td class="kp-mono">2222</td></tr>
                            <tr><td class="kp-muted">User</td><td class="kp-mono">${a?.Username??e.Name}</td></tr>
                            <tr>
                                <td class="kp-muted">Password</td>
                                <td>
                                    <span id="sftp-pass-display" class="kp-mono kp-sftp-pass" data-revealed="0">\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022</span>
                                    <button class="uk-button kp-btn-secondary kp-btn-sm uk-margin-small-left" id="sftp-reveal-btn" uk-tooltip="Reveal the Password">
                                        <span uk-icon="icon: eye; ratio: 0.75"></span>
                                    </button>
                                    <button class="uk-button kp-btn-secondary kp-btn-sm uk-margin-small-left" id="sftp-copy-btn" uk-tooltip="Copy the Password">
                                        <span uk-icon="icon: copy; ratio: 0.75"></span>
                                    </button>
                                </td>
                            </tr>
                            <tr><td class="kp-muted">Path</td><td class="kp-mono">/html</td></tr>
                        </tbody>
                    </table>
                    <div class="uk-margin-small-top">
                        <button class="uk-button kp-btn-ghost kp-btn-sm" id="sftp-regen-btn">
                            <span uk-icon="refresh"></span> Regenerate Password
                        </button>
                    </div>
                </div>

            </div>
        </div>`}function Bt(e){return`<div class="uk-flex uk-flex-between uk-flex-middle kp-config-row" data-domain-id="${e.ID}">
        <div class="uk-flex uk-flex-middle kp-domain-row-inner">
            <span id="ssl-icon-${e.ID}" class="kp-ssl-pending" uk-icon="icon: more; ratio: 0.85"></span>
            <span class="uk-text-small kp-mono">${e.Domain}</span>
        </div>
        <button class="kp-config-del" data-action="delete-domain" data-did="${e.ID}" title="Remove">
            <span uk-icon="icon: close; ratio: 0.8"></span>
        </button>
    </div>`}function Mt(e,t){e.querySelector("#domain-add-btn")?.addEventListener("click",()=>{e.querySelector("#domain-add-form").classList.remove("uk-hidden")}),e.querySelector("#domain-cancel-btn")?.addEventListener("click",()=>{e.querySelector("#domain-add-form").classList.add("uk-hidden")}),e.querySelector("#domain-save-btn")?.addEventListener("click",async()=>{let a=e.querySelector("#domain-add-input").value.trim();if(a)try{let s=await k.post(`/sites/${t}/domains`,{domain:a});e.querySelector("#domain-list").insertAdjacentHTML("beforeend",Bt(s)),It(s.Domain,s.ID),e.querySelector("#domain-add-form").classList.add("uk-hidden"),e.querySelector("#domain-add-input").value="",c.success("Domain added")}catch(s){c.error(s.message)}}),e.querySelector("#domain-list")?.addEventListener("click",async a=>{let s=a.target.closest('[data-action="delete-domain"]');if(!(!s||!await $("Remove Domain","Remove this domain from the site?")))try{await k.delete(`/sites/${t}/domains/${s.dataset.did}`),s.closest("[data-domain-id]").remove(),c.success("Domain removed")}catch(n){c.error(n.message)}})}function At(e,t,a=null,s=[]){e.querySelector("#sftp-regen-btn")?.addEventListener("click",async()=>{let o=e.querySelector("#sftp-regen-btn"),l=o.innerHTML;o.disabled=!0,o.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{let r=await k.post(`/sites/${t}/sftp-regen`),m=e.querySelector("#sftp-pass-display");if(m&&r?.password){m.textContent=r.password,m.dataset.revealed="1";let p=e.querySelector("#sftp-reveal-btn");p&&(p.innerHTML='<span uk-icon="icon: eye-slash; ratio: 0.75"></span>')}c.success("SFTP password regenerated"),y.go("site-detail",{id:String(t)})}catch(r){c.error(r.message),o.disabled=!1,o.innerHTML=l}});let i=async()=>(await k.get(`/sites/${t}/sftp-password`))?.password??"",n=o=>{if(navigator.clipboard)navigator.clipboard.writeText(o).then(()=>c.success("Password copied to clipboard")).catch(()=>c.error("Failed to copy password"));else{let l=document.createElement("textarea");l.value=o,l.style.cssText="position:fixed;opacity:0",document.body.appendChild(l),l.select(),document.execCommand("copy"),document.body.removeChild(l),c.success("Password copied to clipboard")}};e.querySelector("#sftp-reveal-btn")?.addEventListener("click",async()=>{let o=e.querySelector("#sftp-pass-display"),l=e.querySelector("#sftp-reveal-btn");if(!o)return;if(o.dataset.revealed==="1"){o.textContent="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",o.dataset.revealed="0",l.innerHTML='<span uk-icon="icon: eye; ratio: 0.75"></span>';return}let r=l.innerHTML;l.disabled=!0,l.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{o.textContent=await i(),o.dataset.revealed="1",l.innerHTML='<span uk-icon="icon: eye-slash; ratio: 0.75"></span>'}catch(m){c.error(m.message),l.innerHTML=r}finally{l.disabled=!1}}),e.querySelector("#sftp-copy-btn")?.addEventListener("click",async()=>{let o=e.querySelector("#sftp-copy-btn"),l=o.innerHTML;o.disabled=!0,o.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{let r=await i();r&&n(r)}catch(r){c.error(r.message)}finally{o.disabled=!1,o.innerHTML=l}}),e.querySelector("#pma-open-btn")?.addEventListener("click",async()=>{let o=e.querySelector("#pma-open-btn"),l=o.innerHTML;o.disabled=!0,o.innerHTML='<div uk-spinner="ratio: 0.5"></div> Opening...';try{let r=await k.post(`/sites/${t}/pma-token`);window.open(r.url,"_blank")}catch(r){c.error(r.message)}finally{o.disabled=!1,o.innerHTML=l}}),e.querySelector("#sync-push-btn")?.addEventListener("click",async()=>{let o=await Oe(a,s,a.SiteType!==3&&a.PMAPort>0);if(!o)return;let l=s.find(p=>p.ID===o.target_id)?.Name??"target";try{await k.post(`/sites/${t}/push`,o)}catch(p){c.error(p.message);return}S("Push Running",`Backing up ${l}, then pushing ${a.Name} onto it.`);let r=Date.now()+1800*1e3,m=setInterval(async()=>{try{let p=await k.get(`/sites/${t}/push-status`);(!p?.active||Date.now()>r)&&(clearInterval(m),x(),p?.active?c.error("Push is taking longer than expected \u2014 check server logs for status"):p?.error?c.error(`Push failed: ${p.error}`):c.success(`Push to ${l} complete`))}catch{}},4e3)})}function Rt(){return`
        <div class="kp-card uk-padding uk-margin-top">
            <h3 class="kp-view-title uk-margin-bottom">Redirects</h3>
            <p class="kp-muted uk-text-small uk-margin-small-bottom">
                Rules are evaluated in order. The first matching source wins.
                Source is a path (e.g. <code>/old-page</code>) or a regular expression (e.g. <code>^/blog/(d+)$</code>). Target is a full URL or path.
            </p>
            <div id="redirects-list" class="uk-margin-small-bottom"></div>
            <div class="uk-flex uk-flex-middle uk-margin-small-top" style="gap:8px">
                <button type="button" class="uk-button kp-btn-ghost uk-button-small" id="redirect-add-btn">
                    <span uk-icon="plus"></span> Add Rule
                </button>
            </div>
            <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                <button type="button" class="uk-button kp-btn-primary" id="redirect-save-btn">
                    <span uk-icon="check"></span> Save
                </button>
            </div>
        </div>`}function Dt(e="",t="",a=301){return`
        <div class="redirect-row uk-flex uk-flex-middle uk-margin-small-bottom" style="gap:8px">
            <input class="uk-input kp-input redirect-source" type="text" placeholder="/old-path" value="${e}" style="flex:1">
            <input class="uk-input kp-input redirect-target" type="text" placeholder="https://example.com/new-path" value="${t}" style="flex:2">
            <select class="uk-select kp-select redirect-code" style="width:90px">
                <option value="301" ${a===301?"selected":""}>301</option>
                <option value="302" ${a===302?"selected":""}>302</option>
                <option value="307" ${a===307?"selected":""}>307</option>
                <option value="308" ${a===308?"selected":""}>308</option>
            </select>
            <a href="javascript:void(0);" class="kp-muted redirect-remove-btn" uk-icon="trash"></a>
        </div>`}async function Ht(e){let t=document.getElementById("redirects-list");if(!t)return;t.innerHTML="";let a=await k.get(`/sites/${e}/redirects`);t.innerHTML=a.map(s=>Dt(s.Source,s.Target,s.Code)).join("")}function Ft(e,t){let a=new AbortController,s={signal:a.signal};e.addEventListener("click",i=>{i.target.closest("#redirect-add-btn")&&document.getElementById("redirects-list").insertAdjacentHTML("beforeend",Dt()),i.target.closest(".redirect-remove-btn")&&i.target.closest(".redirect-row").remove()},s),e.addEventListener("click",async i=>{if(!i.target.closest("#redirect-save-btn"))return;let n=[...document.querySelectorAll(".redirect-row")].map(o=>({Source:o.querySelector(".redirect-source").value.trim(),Target:o.querySelector(".redirect-target").value.trim(),Code:parseInt(o.querySelector(".redirect-code").value,10)}));try{await k.put(`/sites/${t}/redirects`,n),c.success("Redirects saved")}catch(o){c.error(o.message||"Failed to save redirects")}},s),e.__redirectsAbort?.abort(),e.__redirectsAbort=a}var X=[{id:"ab-threshold",key:"threshold",api:"Threshold",mult:1,label:"Error Responses",help:"4xx/5xx responses within the window that trigger the 429."},{id:"ab-window",key:"window_secs",api:"WindowSecs",mult:1,label:"Window (seconds)",help:"Span the error responses are counted over."},{id:"ab-cooldown",key:"cooldown_secs",api:"CooldownSecs",mult:60,label:"429 Cooldown (minutes)",help:"Hitting the limit again during the cooldown converts it to a ban."},{id:"ab-ban",key:"ban_secs",api:"BanSecs",mult:60,label:"Ban Length (minutes)",help:"How long a ban lasts."},{id:"ab-strikes",key:"perm_strikes",api:"PermStrikes",mult:1,label:"Bans Before Permanent",help:"Bans within the strike window that make the ban permanent."},{id:"ab-strike-win",key:"perm_window_secs",api:"PermWindowSecs",mult:3600,label:"Strike Window (hours)",help:"Span the bans are counted over."}],De={id:"ab-escalate",key:"escalate_sites",api:"EscalateSites",mult:1,label:"Sites Before Global Ban",help:"An IP banned on this many sites is banned on all of them."},K=e=>e?`/sites/${e}/security/autoban`:"/security/autoban";function ge(e=null){let t=e?X:[...X,De];return`
        <div id="autoban-panel">

            <div class="kp-card uk-padding-small uk-margin-bottom">
                <ul class="kp-accordion uk-margin-remove" uk-accordion>
                    <li>
                        <a class="uk-accordion-title" href="#"><h3 class="kp-view-title">Auto-Ban Settings</h3></a>
                        <div class="uk-accordion-content">
                            <div class="uk-flex uk-flex-between uk-flex-top uk-margin-small-bottom" style="gap:8px">
                                <p class="kp-muted uk-text-small uk-margin-remove">
                                    ${e?"Counts this site's 4xx/5xx responses per IP. Leave a field blank to inherit the global value shown.":"The global scope counts hits on unregistered domains; per-site counters use these values unless a site overrides them."}
                                    Bypassed and whitelisted IPs are never counted.
                                </p>
                                <button class="uk-button kp-btn-primary kp-btn-sm" id="ab-save" uk-tooltip="Save Auto-Ban Settings">
                                    <span uk-icon="check"></span>
                                </button>
                            </div>
                            ${e?`
                            <div class="uk-margin-small-bottom">
                                <label class="kp-label">
                                    <input class="uk-checkbox" type="checkbox" id="ab-enabled">
                                    &nbsp;Enable auto-ban for this site
                                </label>
                            </div>`:""}
                            <div class="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid>
                                ${t.map(a=>`
                                <div>
                                    <label class="kp-label" for="${a.id}">${a.label}</label>
                                    <input class="uk-input kp-input" id="${a.id}" type="number" min="1" step="1">
                                    <p class="kp-muted uk-text-small uk-margin-small-top">${a.help}</p>
                                </div>`).join("")}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="kp-card uk-padding-small">
                <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                    <h3 class="kp-view-title">Banned IPs</h3>
                    <button class="uk-button kp-btn-ghost kp-btn-sm" id="ab-refresh" uk-tooltip="Refresh the list">
                        <span uk-icon="refresh"></span>
                    </button>
                </div>
                <div id="ab-list"><span class="kp-muted uk-text-small">Loading\u2026</span></div>
            </div>
        </div>`}function qa(e){if(!e.length)return'<p class="kp-muted uk-text-small uk-margin-remove">No IPs are currently banned.</p>';let t=P();return`
        <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-small uk-table-middle kp-fm-table">
            <thead>
                <tr>
                    <th>IP</th>
                    <th>Hits</th>
                    <th>Strikes</th>
                    <th>Banned</th>
                    <th>Expires</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>${e.map(s=>{let i=!s.Expires;return`
        <tr>
            <td class="kp-mono">${g(s.IP)}</td>
            <td>${s.Hits}</td>
            <td>${s.Strikes}</td>
            <td>${new Date(s.Created).toLocaleString()}</td>
            <td>${i?'<span class="kp-muted">Permanent</span>':new Date(s.Expires).toLocaleString()}</td>
            <td>
                <div class="uk-flex uk-flex-right" style="gap:4px">
                    ${i?"":`
                    <button class="uk-button kp-btn-ghost kp-btn-sm" data-ab-action="permanent" data-id="${s.ID}" uk-tooltip="Ban permanently">
                        <span uk-icon="lock"></span>
                    </button>`}
                    ${t?`
                    <button class="uk-button kp-btn-ghost kp-btn-sm" data-ab-action="allow" data-id="${s.ID}" uk-tooltip="Allow \u2014 add to Security Bypass">
                        <span uk-icon="check"></span>
                    </button>`:""}
                    <button class="uk-button kp-btn-danger kp-btn-sm" data-ab-action="remove" data-id="${s.ID}" uk-tooltip="Remove the ban">
                        <span uk-icon="trash"></span>
                    </button>
                </div>
            </td>
        </tr>`}).join("")}</tbody>
        </table>
        </div>`}async function Re(e,t){let a=e.querySelector("#ab-list");try{let s=await k.get(K(t));a.innerHTML=qa(s??[])}catch(s){a.innerHTML=`<p class="kp-muted uk-text-small uk-margin-remove">Failed to load bans: ${g(s.message)}</p>`}}async function Ba(e,t){try{let a=await k.get(`${K(t)}/settings`),s=t?a.global:a,i=t?a.override:a;(t?X:[...X,De]).forEach(l=>{let r=e.querySelector(`#${l.id}`);r&&(r.placeholder=String(s[l.api]/l.mult),r.value=i[l.api]==null?"":String(i[l.api]/l.mult))});let o=e.querySelector("#ab-enabled");o&&(o.checked=!!a.override?.Enabled)}catch(a){c.error("Failed to load auto-ban settings: "+a.message)}}async function Ma(e,t){let a=t?X:[...X,De],s={};for(let i of a){let n=e.querySelector(`#${i.id}`).value.trim();if(n===""){if(!t)throw new Error(`${i.label} is required`);s[i.key]=null;continue}let o=Number(n);if(!Number.isInteger(o)||o<1)throw new Error(`${i.label} must be a whole number above 0`);s[i.key]=o*i.mult}t&&(s.enabled=e.querySelector("#ab-enabled").checked),await k.put(`${K(t)}/settings`,s)}function fe(e,t=null){let a=e.querySelector("#autoban-panel");a&&(a.querySelector("#ab-save")?.addEventListener("click",async s=>{let i=s.currentTarget,n=i.innerHTML;i.disabled=!0,i.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await Ma(a,t),c.success("Auto-ban settings saved")}catch(o){c.error(o.message)}finally{i.disabled=!1,i.innerHTML=n}}),a.querySelector("#ab-refresh")?.addEventListener("click",()=>Re(a,t)),a.querySelector("#ab-list")?.addEventListener("click",async s=>{let i=s.target.closest("[data-ab-action]");if(!i)return;let n=i.dataset.id,o=i.dataset.abAction,l=i.closest("tr")?.querySelector("td")?.textContent??"this IP";try{if(o==="permanent"){if(!await $("Ban Permanently",`Ban ${l} permanently? It stays banned until removed.`))return;await k.post(`${K(t)}/${n}/permanent`),c.success(`${l} banned permanently`)}else if(o==="allow"){if(!await $("Allow IP",`Add ${l} to Security Bypass? It will skip every security check, including the WAF, on all sites.`))return;await k.post(`${K(t)}/${n}/allow`),c.success(`${l} added to Security Bypass`)}else if(o==="remove"){if(!await $("Remove Ban",`Remove the ban on ${l}? Its strike history is cleared too.`))return;await k.delete(`${K(t)}/${n}`),c.success(`Ban on ${l} removed`)}await Re(a,t)}catch(r){c.error(r.message)}}),Ba(a,t),Re(a,t))}function Aa(e){return`
        <!-- tab pills -->
        <ul class="kp-tab-pills" id="kp-waf-pills">
            <li data-tab="crs"><a href="#"><span uk-icon="icon: lifesaver; ratio: 0.85"></span> Core Rule Set</a></li>
            <li data-tab="autoban"><a href="#"><span uk-icon="icon: ban; ratio: 0.85"></span> Auto-Ban</a></li>
        </ul>

        <!-- switcher panels -->
        <ul class="uk-switcher uk-margin-large-bottom" id="kp-waf-switcher">

            <!-- core rule set -->
            <li>
                <div class="kp-card uk-padding">
                    <h3 class="kp-view-title uk-margin-bottom">WAF Override</h3>
                    <form id="waf-override-form" class="uk-form-stacked">
                        <div class="uk-margin">
                            <label class="kp-label" for="waf-override">Site Behaviour</label>
                            <select class="uk-select kp-select" id="waf-override" name="override">
                                <option value="0">Inherit global setting</option>
                                <option value="1">Force ON for this site</option>
                                <option value="2">Force OFF for this site</option>
                            </select>
                        </div>
                        <div class="uk-margin">
                            <label class="kp-label">CRS Plugins</label>
                            <p class="kp-muted uk-text-small uk-margin-small-top">
                                Select OWASP CRS plugins to enable for this site. Only plugins present in the
                                local CRS install are shown. Changes recompile the site WAF engine in the background.
                            </p>
                            <div id="waf-plugins-list" class="uk-margin-small-top">
                                <span class="kp-muted uk-text-small">Loading available plugins\u2026</span>
                            </div>
                        </div>
                        <div class="uk-margin">
                            <label class="kp-label" for="waf-site-exclusions">Additional Rule Exclusions</label>
                            <textarea
                                class="uk-textarea kp-input kp-mono kp-waf-exclusions"
                                id="waf-site-exclusions"
                                name="exclusions"
                                rows="15"
                                placeholder="# Numeric = rule ID, text = tag name, one per line&#10;942100&#10;attack-xss"></textarea>
                            <p class="kp-muted uk-text-small uk-margin-small-top">
                                Merged on top of global exclusions. Useful for WooCommerce, contact forms, or file upload paths that trigger false positives.
                            </p>
                        </div>
                        <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                            <a class="uk-button kp-btn-ghost" id="waf-export-btn" href="#" uk-tooltip="Export WAF settings">
                                <span uk-icon="download"></span>
                            </a>
                            <label class="uk-button kp-btn-ghost" style="cursor:pointer" uk-tooltip="Import WAF settings">
                                <span uk-icon="upload"></span>
                                <input type="file" id="waf-import" accept=".json" style="display:none">
                            </label>
                            <button type="submit" class="uk-button kp-btn-primary">
                                <span uk-icon="check"></span> Save
                            </button>
                        </div>
                    </form>
                </div>
            </li>

            <!-- auto-ban -->
            <li>${ge(e)}</li>

        </ul>`}function He(e,t,a=null){let s=e.querySelector("#kp-waf-pills"),i=e.querySelector("#kp-waf-switcher");if(!s||!i)return;let n=[...s.querySelectorAll(":scope > li")],o=(l,r)=>{if(UIkit.switcher(i).show(l),n.forEach((p,d)=>p.classList.toggle("kp-pill-active",d===l)),!r)return;let m=n[l].dataset.tab;history.replaceState(null,"",a?`#site-detail/${a}/${m}`:l===0?"#waf":`#waf/${m}`)};n.forEach((l,r)=>{l.querySelector(":scope > a").addEventListener("click",m=>{m.preventDefault(),o(r,!0)})}),o(Math.max(0,n.findIndex(l=>l.dataset.tab===t)),!1)}async function Fe(e,t){let a=document.getElementById("waf-tab-panel");if(!a)return;a.innerHTML=Aa(e),He(a,t,e),fe(a,e);let s=document.getElementById("waf-export-btn");s&&(s.href=`/api/sites/${e}/waf/export`);try{let i=await k.get(`/sites/${e}/waf`),n=document.getElementById("waf-override"),o=document.getElementById("waf-site-exclusions");n&&(n.value=String(i.Override??0)),o&&(o.value=i.Exclusions??"");let l=document.getElementById("waf-plugins-list");if(l){let[r,m]=await Promise.all([k.get("/settings/waf/plugins"),k.get(`/sites/${e}/waf/plugins`)]),p=new Set(m??[]);!r||r.length===0?l.innerHTML='<span class="kp-muted uk-text-small">No plugins found in local CRS install.</span>':window.matchMedia("(max-width: 959px)").matches?l.innerHTML=`
                    <select multiple class="uk-select kp-select waf-plugin-select" size="${Math.min(r.length,8)}">
                        ${r.map(d=>`
                        <option value="${d}" ${p.has(d)?"selected":""}>${d}</option>
                        `).join("")}
                    </select>`:(l.innerHTML=`
                    <div class="waf-plugin-pills">
                        ${r.map(d=>`
                        <span class="waf-plugin-pill ${p.has(d)?"active":""}"
                            data-plugin="${d}">${d}</span>
                        `).join("")}
                    </div>`,l.querySelectorAll(".waf-plugin-pill").forEach(d=>{d.addEventListener("click",()=>d.classList.toggle("active"))}))}}catch(i){c.error("Failed to load WAF settings: "+i.message)}}function Nt(e,t,a){e.addEventListener("submit",async s=>{if(s.target.id!=="waf-override-form")return;s.preventDefault();let i=s.target.querySelector('[type="submit"]'),n=i.innerHTML;i.disabled=!0,i.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let o=new FormData(s.target),l={override:parseInt(o.get("override"),10),exclusions:o.get("exclusions").trim()};try{await k.put(`/sites/${t}/waf`,l);let r=document.querySelector(".waf-plugin-select"),m=r?[...r.selectedOptions].map(p=>p.value):[...document.querySelectorAll(".waf-plugin-pill.active")].map(p=>p.dataset.plugin);await k.put(`/sites/${t}/waf/plugins`,m),c.success("WAF override saved \u2014 engine recompiling in background")}catch(r){c.error(r.message)}finally{i.disabled=!1,i.innerHTML=n}},{signal:a}),e.addEventListener("change",async s=>{if(s.target.id!=="waf-import")return;let i=s.target.files[0];if(!i)return;let n=new FormData;n.append("file",i);try{let o=await fetch(`/api/sites/${t}/waf/import`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:n}),l=o.status===204?null:await o.json().catch(()=>null);if(!o.ok)throw new Error(l?.error||`HTTP ${o.status}`);await Fe(t),c.success("WAF settings imported")}catch(o){c.error(o.message)}finally{s.target.value=""}},{signal:a})}var Ra=[{label:"Cache Flush",cmd:"cache flush"},{label:"Plugin List",cmd:"plugin list"},{label:"Theme List",cmd:"theme list"},{label:"User List",cmd:"user list"},{label:"Core Check",cmd:"core check-update"},{label:"Core Update",cmd:"core update"},{label:"Plugin Updates",cmd:"plugin update --all"},{label:"Theme Updates",cmd:"theme update --all"},{label:"Rewrite Flush",cmd:"rewrite flush"},{label:"Transient Delete",cmd:"transient delete --all"},{label:"Search Replace",cmd:"search-replace '' ''"}];function Ut(e){return`
        <div class="kp-wpcli">
            <div class="kp-log-controls" style="flex-wrap:wrap;gap:6px">
                ${Ra.map(t=>`
                   <button class="uk-button kp-btn-ghost kp-btn-sm"
                        data-action="wpcli-quick"
                        data-cmd="${t.cmd}">
                        ${t.label}
                    </button>`).join("")}
            </div>
            
            <p class="kp-muted uk-text-small uk-margin-small-top">
                <span uk-icon="icon: info; ratio: 0.75"></span>
                WP-CLI <span class="kp-mono">db</span> subcommands are not available for security.
            </p>

            <div class="uk-flex uk-flex-middle uk-margin-small-top" style="gap:8px">
                <span class="kp-mono" style="color:var(--kp-cyan);font-size:0.85rem;flex-shrink:0">wp&gt;</span>
                <input
                    class="uk-input kp-input"
                    id="wpcli-input"
                    type="text"
                    placeholder="plugin list --status=active"
                    style="height:38px;font-family:'JetBrains Mono',monospace;font-size:0.85rem"
                    autocomplete="off"
                    spellcheck="false">
                <button class="uk-button kp-btn-primary kp-btn-sm" id="wpcli-run">
                    <span uk-icon="play"></span> Run
                </button>
                <button class="uk-button kp-btn-ghost kp-btn-sm" id="wpcli-clear">
                    <span uk-icon="trash"></span> Clear
                </button>
            </div>

            <div class="kp-log-header uk-margin-small-top">
                <div class="kp-log-dot kp-log-dot-red"></div>
                <div class="kp-log-dot kp-log-dot-yellow"></div>
                <div class="kp-log-dot kp-log-dot-green"></div>
                <span style="font-size:0.72rem;color:var(--kp-text-dim);margin-left:8px" id="wpcli-status">Ready</span>
            </div>
            <div class="kp-log-wrap" id="wpcli-output" style="height:500px"></div>
        </div>`}function Wt(e,t){let a=e.querySelector("#wpcli-output"),s=e.querySelector("#wpcli-input"),i=e.querySelector("#wpcli-run"),n=e.querySelector("#wpcli-clear"),o=e.querySelector("#wpcli-status"),l=[],r=-1;function m(b,u=""){b.split(`
`).forEach(h=>{if(!h)return;let f=document.createElement("div");u?f.className=u:f.className=h.match(/error|fatal|critical/i)?"kp-log-line-err":h.match(/warning|warn/i)?"kp-log-line-warn":h.match(/success|done\]/i)?"kp-log-line-info":"",f.textContent=h,a.appendChild(f)}),a.scrollTop=a.scrollHeight}function p(b){if(b=b.trim(),!b)return;l.unshift(b),r=-1,m(`wp> ${b}`,"kp-log-line-info"),s.disabled=!0,i.disabled=!0,o&&(o.textContent="Running...");let u=location.protocol==="https:"?"wss":"ws",h=new WebSocket(`${u}://${location.host}/api/sites/${t}/wpcli`);h.onopen=()=>{h.send(JSON.stringify({command:b}))},h.onmessage=f=>{let v=f.data;if(v.trim()==="[done]"){h.close();return}if(v.startsWith("[info]")){m(v,"kp-muted");return}if(v.startsWith("[error]")){m(v,"kp-log-line-err");return}m(v)},h.onerror=()=>{m("[error] WebSocket connection failed","kp-log-line-err")},h.onclose=()=>{s.disabled=!1,i.disabled=!1,o&&(o.textContent="Ready"),s.focus()}}i.addEventListener("click",()=>{p(s.value),s.value=""}),s.addEventListener("keydown",b=>{if(b.key==="Enter"){p(s.value),s.value="",r=-1;return}if(b.key==="ArrowUp"){b.preventDefault(),r<l.length-1&&(r++,s.value=l[r]);return}b.key==="ArrowDown"&&(b.preventDefault(),r>0?(r--,s.value=l[r]):(r=-1,s.value=""))}),e.querySelectorAll('[data-action="wpcli-quick"]').forEach(b=>{b.addEventListener("click",()=>{let u=b.dataset.cmd;if(u.startsWith("search-replace")){s.value=u,s.focus();let h=u.indexOf("''")+1;s.setSelectionRange(h,h);return}p(u)})}),n.addEventListener("click",()=>{a.innerHTML=""});let d=y.go.bind(y);y.go=function(b,u={}){return d(b,u)},s.focus()}var J=null,M=null;function jt(e,t,a){let s=e.querySelector("#kp-site-pills"),i=e.querySelector("#kp-site-switcher"),n=e.querySelector("#kp-manage-pill"),o=e.querySelector("#kp-manage-dropdown");if(!s||!i)return;let l=["#kp-sec-pills","#kp-waf-pills","#kp-db-pills"].map(b=>e.querySelector(b)).filter(Boolean),r=b=>[...i.children].findIndex(u=>u.contains(b));function m(b,u=!1){UIkit.switcher(i).show(b),s.querySelectorAll(":scope > li[data-pill]").forEach(v=>v.classList.remove("kp-pill-active")),u?(n?.classList.add("kp-pill-active"),o?.querySelectorAll("a[data-switcher]").forEach(v=>{v.classList.toggle("kp-dd-active",parseInt(v.dataset.switcher,10)===b)})):(n?.classList.remove("kp-pill-active"),o?.querySelectorAll("a[data-switcher]").forEach(v=>v.classList.remove("kp-dd-active")));let f=l.find(v=>r(v)===b)?.querySelector(":scope > li.kp-pill-active")?.dataset.tab;history.replaceState(null,"",f?`#site-detail/${t}/${f}`:`#site-detail/${t}`)}s.querySelectorAll(":scope > li[data-pill] > a").forEach(b=>{b.addEventListener("click",u=>{u.preventDefault();let h=parseInt(b.closest("li").dataset.pill,10);m(h,!1)})}),n?.querySelector(".kp-pill-dropdown-btn")?.addEventListener("click",b=>{b.stopPropagation(),o.hidden=!o.hidden,n.classList.toggle("kp-pill-active",!o.hidden)}),o?.querySelectorAll("a[data-switcher]").forEach(b=>{b.addEventListener("click",u=>{u.preventDefault(),o.hidden=!0,m(parseInt(b.dataset.switcher,10),!0)})}),document.addEventListener("click",b=>{o&&!n.contains(b.target)&&(o.hidden=!0)},{capture:!0});let d=a?l.find(b=>[...b.children].some(u=>u.dataset.tab===a)):null;d?m(r(d),!0):UIkit.switcher(i).show(1)}function Da(){return`
        <div class="kp-card uk-padding uk-margin-top">
            <h3 class="kp-view-title uk-margin-bottom">Upstream Routes</h3>
            <p class="kp-muted uk-text-small uk-margin-bottom">
                Each domain maps to one or more upstream URLs. Multiple upstreams for the same
                domain are load-balanced via round-robin.
            </p>
            <div id="rp-routes-list"></div>
            <button class="uk-button kp-btn-ghost uk-margin-small-top" id="rp-add-row">
                <span uk-icon="plus"></span> Add Route
            </button>
            <div class="uk-flex uk-flex-right uk-margin-top">
                <button class="uk-button kp-btn-primary" id="rp-save-btn">
                    <span uk-icon="check"></span> Save Routes
                </button>
            </div>
        </div>`}function Ne(e="",t="",a=!1){return`
        <div class="rp-route-row uk-flex uk-flex-middle uk-margin-small-bottom" style="gap:8px">
            <span>Host:</span><input class="uk-input kp-input" style="flex:1" placeholder="example.com" value="${e}" data-field="domain">
            <span>Upstream:</span><input class="uk-input kp-input" style="flex:2" placeholder="https://10.0.0.1:8080" value="${t}" data-field="upstream">
            <label style="white-space:nowrap;font-size:0.75rem;color:var(--kp-text-dim)" title="Send incoming domain as Host header instead of upstream hostname">
                <input type="checkbox" class="uk-checkbox" data-field="pass_host" ${a?"checked":""}> Pass Host
            </label>
            <button class="uk-button kp-btn-ghost kp-btn-sm rp-remove-row" uk-tooltip="Remove"><span uk-icon="trash"></span></button>
        </div>`}async function Ha(e){let t=document.getElementById("rp-routes-list");if(t)try{let a=await k.get(`/sites/${e}/rp-routes`);t.innerHTML=a.length?a.map(s=>Ne(s.Domain,s.Upstream,s.PassHost)).join(""):Ne()}catch(a){c.error("Failed to load routes: "+a.message)}}function Fa(e,t){e.addEventListener("click",async a=>{if(a.target.closest("#rp-add-row")){document.getElementById("rp-routes-list").insertAdjacentHTML("beforeend",Ne());return}if(a.target.closest(".rp-remove-row")){a.target.closest(".rp-route-row").remove();return}if(!a.target.closest("#rp-save-btn"))return;let s=a.target.closest("#rp-save-btn"),i=s.innerHTML;s.disabled=!0,s.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let n=[...document.querySelectorAll(".rp-route-row")].map(o=>({Domain:o.querySelector('[data-field="domain"]').value.trim(),Upstream:o.querySelector('[data-field="upstream"]').value.trim(),PassHost:o.querySelector('[data-field="pass_host"]').checked})).filter(o=>o.Domain&&o.Upstream);try{await k.put(`/sites/${t}/rp-routes`,n),c.success("Routes saved")}catch(o){c.error(o.message)}finally{s.disabled=!1,s.innerHTML=i}},{signal:J.signal})}function Na(e){return e.endsWith("-nginx")?"world":e.endsWith("-php")?"code":e.endsWith("-db")?"database":e.endsWith("-redis")?"server":e.endsWith("-varnish")?"grid":e.endsWith("-pma")?"table":e.endsWith("-app")?"laptop":"bolt"}function Ot(e){let t=e.split("-").pop();return{nginx:"Nginx",php:"PHP-FPM",db:"MariaDB",redis:"Redis",varnish:"Varnish",pma:"phpMyAdmin",app:"App"}[t]??t}function zt(e){switch(e){case"running":return"var(--kp-success)";case"exited":case"stopped":case"dead":return"var(--kp-danger)";case"created":case"configured":case"initialized":case"paused":case"stopping":case"restarting":return"var(--kp-warning)";default:return"var(--kp-text-dim)"}}function Ua(e){return!e||!e.length?"":e.filter(t=>!t.name.endsWith("-infra")).map(t=>`
            <span class="kp-health-badge"
                data-container="${g(t.name)}"
                title="Restart the Container"
                style="cursor:pointer;color:${zt(t.status)}">
                <span uk-icon="icon: ${Na(t.name)}; ratio: 1.1"></span>
                <span class="kp-health-badge-label">${g(Ot(t.name))}</span>
            </span>
        `).join("")}function Wa(e,t){M&&(M.close(),M=null);let a=document.getElementById("sd-health-badges");if(!a)return;let s=location.protocol==="https:"?"wss":"ws";M=new WebSocket(`${s}://${location.host}/api/sites/${t}/health/stream`);let i=[],n=()=>{a.innerHTML=Ua(i),a.querySelectorAll(".kp-health-badge").forEach(o=>{o.addEventListener("click",async()=>{o.style.color=zt("restarting");let l=o.dataset.container,r=l.split("-").pop();try{await k.post(`/sites/${t}/containers/${r}/restart`),c.success(`${Ot(l)} restarted`)}catch(m){c.error(m.message)}n()})})};M.onmessage=o=>{try{i=JSON.parse(o.data),n()}catch{}},M.onerror=()=>{},M.onclose=()=>{M=null}}async function Vt(e,{id:t,tab:a}){let[{site:s,domains:i,sftp:n},o,l]=await Promise.all([k.get(`/sites/${t}`),k.get("/sites"),k.get(`/sites/${t}/configs`)]),r=Array.isArray(o)?o:[],m=r.filter(v=>v.ID===s.ParentID||v.ParentID===s.ID),p=s.SiteType===1||s.SiteType===2,d=s.SiteType===6,b=[1,2,4,5,7].includes(s.SiteType),u=[1,2,4,5,7].includes(s.SiteType);if(J&&J.abort(),J=new AbortController,e.innerHTML=`
        <div class="kp-view-header">
            <div class="uk-flex uk-flex-middle" style="gap:12px">
                <button class="kp-btn-icon" id="sd-back"><span uk-icon="arrow-left"></span></button>
                <div class="kp-site-nav-wrap">
                    <select id="sd-site-nav" class="uk-select kp-select">
                        ${r.map(v=>`<option value="${v.ID}" ${v.ID===s.ID?"selected":""}>${v.Name}</option>`).join("")}
                    </select>
                    <span class="kp-site-nav-arrow">&#9660;</span>
                </div>
                ${d?"":A(s.SiteStatus)}
            </div>
            <div class="uk-flex" style="gap:8px;flex-wrap:wrap">
                ${d?"":`
                ${s.SiteStatus===1?`<button class="uk-button kp-btn-ghost kp-btn-sm" data-action="stop" data-id="${t}" uk-tooltip="Stop the Site"><span uk-icon="ban"></span></button>`:`<button class="uk-button kp-btn-ghost kp-btn-sm" data-action="start" data-id="${t}" uk-tooltip="Start the Site"><span uk-icon="play"></span></button>`}
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="restart" data-id="${t}" uk-tooltip="Restart the Site"><span uk-icon="refresh"></span></button>
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="flush" data-id="${t}" uk-tooltip="Flush the Caches"><span uk-icon="bolt"></span></button>
                <button class="uk-button kp-btn-ghost kp-btn-sm kp-btn-recreate" id="sd-recreate" uk-tooltip="Recreate &amp; Update the Pod"><span uk-icon="history"></span></button>
                <button class="uk-button kp-btn-ghost kp-btn-sm" id="sd-clone" uk-tooltip="Clone the Site"><span uk-icon="move"></span></button>
                `}
                <button class="uk-button kp-btn-ghost kp-btn-sm" id="sd-rename" uk-tooltip="Rename the Site"><span uk-icon="tag"></span></button>
                <button class="uk-button kp-btn-ghost kp-btn-sm" id="sd-edit" uk-tooltip="Edit the Site"><span uk-icon="pencil"></span></button>
            </div>
        </div>
 
        ${d?`
        <!-- tab pills (reverse proxy) -->
        <ul class="kp-tab-pills" id="kp-site-pills">
            <li data-pill="0"><a href="#">Routes</a></li>
            <li id="kp-manage-pill">
                <a href="javascript:void(0);" class="kp-pill-dropdown-btn">
                    Manage <span uk-icon="icon: chevron-down; ratio: 0.8"></span>
                </a>
                <div class="kp-pill-dropdown" id="kp-manage-dropdown" hidden>
                    <div class="kp-pill-dropdown-section">Security</div>
                    <a href="#" data-switcher="3"><span uk-icon="icon: lock; ratio: 0.85"></span> Security</a>
                    <a href="#" data-switcher="4"><span uk-icon="icon: lifesaver; ratio: 0.85"></span> WAF</a>
                    <a href="#" data-switcher="5"><span uk-icon="icon: user; ratio: 0.85"></span> Basic Auth</a>
                </div>
            </li>
            <li data-pill="1"><a href="#">Stats</a></li>
            <li data-pill="2"><a href="#">Logs</a></li>
        </ul>

        <!-- switcher panels -->
        <ul class="uk-switcher" id="kp-site-switcher">
            <li>${Da()}</li>
            <li>${$e(t,s.SiteType)}</li>
            <li>${Ae(t,s.SiteType)}</li>
            <li>${Q(t)}</li>
            <li id="waf-tab-panel"></li>
            <li>${_e()}</li>
        </ul>
        `:`
        <!-- tab pills -->
        <ul class="kp-tab-pills" id="kp-site-pills">
            <li data-pill="0"><a href="#">Overview</a></li>
            <li id="kp-manage-pill">
                <a href="javascript:void(0);" class="kp-pill-dropdown-btn">
                    Manage <span uk-icon="icon: chevron-down; ratio: 0.8"></span>
                </a>
                <div class="kp-pill-dropdown" id="kp-manage-dropdown" hidden>
                    <div class="kp-pill-dropdown-section">Config</div>
                    <a href="#" data-switcher="2"><span uk-icon="icon: settings; ratio: 0.85"></span> Nginx</a>
                    ${p?'<a href="#" data-switcher="3"><span uk-icon="icon: code; ratio: 0.85"></span> PHP</a>':""}
                    <a href="#" data-switcher="${p?4:3}"><span uk-icon="icon: database; ratio: 0.85"></span> MariaDB</a>
                    <a href="#" data-switcher="${p?5:4}"><span uk-icon="icon: server; ratio: 0.85"></span> Redis</a>
                    <a href="#" data-switcher="${p?6:5}"><span uk-icon="icon: world; ratio: 0.85"></span> Varnish</a>
                    <hr>
                    <div class="kp-pill-dropdown-section">Security</div>
                    <a href="#" data-switcher="${p?8:7}"><span uk-icon="icon: lock; ratio: 0.85"></span> Security</a>
                    <a href="#" data-switcher="${p?9:8}"><span uk-icon="icon: lifesaver; ratio: 0.85"></span> WAF</a>
                    <a href="#" data-switcher="${p?10:9}"><span uk-icon="icon: user; ratio: 0.85"></span> Basic Auth</a>
                    <hr>
                    <div class="kp-pill-dropdown-section">Tools</div>
                    ${s.SiteType===1?`<a href="#" data-switcher="${p?11:10}"><span uk-icon="icon: file-text; ratio: 0.85"></span> WP-CLI</a>`:""}
                    <a href="#" data-switcher="${s.SiteType===1?p?12:11:p?11:10}"><span uk-icon="icon: history; ratio: 0.85"></span> Backups</a>
                    ${u?'<a href="#" data-switcher="database"><span uk-icon="icon: table; ratio: 0.85"></span> Database</a>':""}
                    ${b?`<a href="#" data-switcher="${s.SiteType===1?p?13:12:p?12:11}"><span uk-icon="icon: clock; ratio: 0.85"></span> Crons</a>`:""}
                    <a href="#" data-switcher="${(s.SiteType===1?p?14:13:p?13:12)-(b?0:1)}"><span uk-icon="icon: forward; ratio: 0.85"></span> Redirects</a>
                    <a href="#" data-switcher="files"><span uk-icon="icon: folder; ratio: 0.85"></span> Files</a>
                </div>
            </li>
            <li data-pill="1"><a href="#">Stats</a></li>
            <li data-pill="${p?7:6}"><a href="#">Logs</a></li>
        </ul>

        <!-- switcher panels (driven by pills above) -->
        <ul class="uk-switcher" id="kp-site-switcher">
            <li>${qt(s,i??[],n,s.ParentID??0,r.find(v=>v.ID===s.ParentID)?.Name??null,m)}</li>
            <li>${$e(t,s.SiteType)}</li>
            <li>${te(t,1,l[1])}</li>
            ${p?`<li>${te(t,2,l[2])}</li>`:""}
            <li>${te(t,3,l[3])}</li>
            <li>${te(t,4,l[4])}</li>
            <li>${ut(t,l[5])}</li>
            <li>${Ae(t,s.SiteType)}</li>
            <li>${Q(t)}</li>
            <li id="waf-tab-panel"></li>
            <li>${_e()}</li>
            ${s.SiteType===1?`<li>${Ut(t)}</li>`:""}
            <li>${ct(t)}</li>
            ${b?`<li>${kt(t)}</li>`:""}
            <li>${Rt()}</li>
            ${u?`<li>${yt(t,s.SiteType)}</li>`:""}
            <li>${Tt(t)}</li>
        </ul>`}`,document.getElementById("sd-back").addEventListener("click",()=>y.go("sites")),document.getElementById("sd-edit").addEventListener("click",()=>lt(s)),document.getElementById("sd-rename").addEventListener("click",async()=>{let v=await je(s.Name);if(!(!v||v===s.Name)){S("Renaming Site","Moving the database, files, and pod \u2014 this may take a few minutes...");try{await k.post(`/sites/${t}/rename`,{name:v},18e5),x(),c.success(`Site renamed to '${v}'`),y.go("site-detail",{id:t})}catch(w){x(),c.error(w.message)}}}),document.getElementById("sd-site-nav")?.addEventListener("change",v=>{y.go("site-detail",{id:v.target.value})}),ke(e),me(e,a),H(e),_t(e,t),Nt(e,t,J.signal),Fe(t,a),d){Fa(e,t),Ha(t),Le(e,t,s.SiteType),Te(t,s.SiteType),Ie(e,t),Y(t),jt(e,t,a);return}document.getElementById("sd-recreate").addEventListener("click",async()=>{S("Recreating Pod","Recreating containers for this site...");try{await k.post(`/sites/${t}/recreate`,{prune:!0}),x(),c.success("Pod recreated"),y.go("site-detail",{id:t})}catch(v){x(),c.error(v.message)}}),document.getElementById("sd-clone")?.addEventListener("click",async()=>{let v=await We(s.Name);if(v){S("Cloning Site","Copying files and database \u2014 this may take a few minutes...");try{await k.post(`/sites/${t}/clone`,v,6e5),x(),c.success(`Site cloned as '${v.name}'`),y.go("sites")}catch(w){x(),c.error(w.message)}}}),pt(e,t,J.signal),Mt(e,t),s.SiteType===1&&Wt(e,t),At(e,t,s,m),dt(e,t),z(e,t),b&&(ht(e,t),he(e,t)),Ft(e,t),Ht(t);let h=e.querySelector("#kp-site-switcher"),f=e.querySelector('a[data-switcher="files"]');if(h&&f&&(f.dataset.switcher=String(h.children.length-1)),Pt(e,t),I(t),u){let v=e.querySelector('a[data-switcher="database"]'),w=e.querySelector("#dbtools-panel");h&&v&&w&&(v.dataset.switcher=String([...h.children].findIndex(E=>E.contains(w)))),xt(e,t),wt(e,a)}Wa(e,t),Le(e,t,s.SiteType),Te(t,s.SiteType),jt(e,t,a),Ie(e,t),Y(t),Ct(i??[])}async function ye(e){let t=document.getElementById("totp-qr-img"),a=document.getElementById("totp-qr-wrap");if(!t||!a)return;if(a.querySelectorAll(".totp-uri-text").forEach(i=>i.remove()),typeof QRCode<"u")try{let i=await new Promise((n,o)=>{QRCode.toDataURL(e,{width:220,margin:2},(l,r)=>{l?o(l):n(r)})});t.src=i,t.style.display="";return}catch{}let s=document.createElement("p");s.className="totp-uri-text kp-muted uk-text-small",s.style.wordBreak="break-all",s.textContent=e,a.appendChild(s)}function we(e){document.getElementById("kp-backup-codes-modal")?.remove();let a=`
        <div id="kp-backup-codes-modal" uk-modal="bg-close:false;esc-close:false">
            <div class="uk-modal-dialog kp-modal uk-modal-body" style="max-width:480px">
                <h3 class="uk-modal-title" style="color:var(--kp-yellow,#f0b429)">
                    <span uk-icon="warning"></span>&nbsp;Save Your Backup Codes
                </h3>
                <p class="kp-muted uk-text-small uk-margin-small-bottom">
                    These codes let you access your account if you lose your authenticator.
                    Each code works <strong>once only</strong>. Keep them somewhere safe.
                </p>
                <div class="kp-backup-codes-grid uk-margin-small">${e.map(i=>`<code class="kp-backup-code">${i}</code>`).join("")}</div>
                <p class="kp-muted uk-text-small uk-margin-small-top">
                    These codes will <strong>not</strong> be shown again.
                </p>
                <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                    <button id="kp-backup-copy-btn" class="uk-button kp-btn-ghost">Copy All</button>
                    <button id="kp-backup-done-btn" class="uk-button kp-btn-primary">I've Saved These</button>
                </div>
            </div>
        </div>`;document.body.insertAdjacentHTML("beforeend",a);let s=UIkit.modal("#kp-backup-codes-modal");s.show(),document.getElementById("kp-backup-copy-btn").addEventListener("click",()=>{let i=e.join(`
`),n=document.getElementById("kp-backup-copy-btn");if(navigator.clipboard)navigator.clipboard.writeText(i).then(()=>{n.textContent="Copied!"});else{let o=document.createElement("textarea");o.value=i,o.style.cssText="position:fixed;opacity:0",document.body.appendChild(o),o.select();try{document.execCommand("copy"),n.textContent="Copied!"}catch{}o.remove()}}),document.getElementById("kp-backup-done-btn").addEventListener("click",()=>{s.hide(),document.getElementById("kp-backup-codes-modal")?.remove(),y.go("users")})}function Kt(e){document.body.insertAdjacentHTML("beforeend",`
        <div id="kp-create-user-modal" uk-modal>
            <div class="uk-modal-dialog kp-modal uk-modal-body uk-width-large">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <h3 class="kp-view-title">New User</h3>
                <form id="create-user-form" class="uk-form-stacked uk-margin-top">
                    <div class="uk-grid-small" uk-grid>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">First Name</label>
                            <input class="uk-input kp-input" name="fname" type="text" required>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Last Name</label>
                            <input class="uk-input kp-input" name="lname" type="text" required>
                        </div>
                        <div class="uk-width-1-1">
                            <label class="kp-label">Username</label>
                            <input class="uk-input kp-input" name="uname" type="text" required>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Email</label>
                            <input class="uk-input kp-input" name="email" type="email" required>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Phone</label>
                            <input class="uk-input kp-input" name="phone" type="tel" required>
                        </div>
                        <div class="uk-width-1-1">
                            <label class="kp-label uk-margin-small-bottom">Notifications</label>
                            <div class="uk-flex" style="gap:24px">
                                <label><input class="uk-checkbox" type="checkbox" name="notify_email"> &nbsp;Email</label>
                                <label><input class="uk-checkbox" type="checkbox" name="notify_sms"> &nbsp;SMS</label>
                            </div>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Password</label>
                            <input class="uk-input kp-input" name="password" type="password" required>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Role</label>
                            <select class="uk-select kp-select" name="role">
                                <option value="50">Manager</option>
                                <option value="99">Admin</option>
                            </select>
                        </div>
                    </div>
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button type="button" class="uk-button kp-btn-ghost uk-modal-close">Cancel</button>
                        <button type="submit" class="uk-button kp-btn-primary">Create User</button>
                    </div>
                </form>

                <div id="cu-totp-section" style="display:none">
                    <hr class="uk-divider-muted uk-margin-top">
                    <h4 class="uk-margin-small-bottom kp-view-title">Two-Factor Authentication</h4>
                    <div class="uk-flex uk-flex-middle" style="gap:12px">
                        <span class="kp-badge kp-badge-manager" style="font-size:0.75rem">Disabled</span>
                        <button id="cu-totp-setup-btn" class="uk-button kp-btn-primary kp-btn-sm">Enable TOTP</button>
                    </div>
                    <div id="totp-setup-area" style="display:none" class="uk-margin-top">
                        <p class="kp-muted uk-text-small">Scan the QR code with your authenticator app, then enter the 6-digit code to activate.</p>
                        <div class="uk-text-center uk-margin-small" id="totp-qr-wrap">
                            <img id="totp-qr-img" style="display:none;width:220px;height:220px;border-radius:6px" alt="TOTP QR Code">
                        </div>
                        <p class="kp-muted uk-text-small uk-text-center uk-margin-remove-top">
                            Manual key: <code id="totp-secret-text" style="word-break:break-all"></code>
                        </p>
                        <div class="uk-flex" style="gap:8px;margin-top:8px">
                            <input class="uk-input kp-input" id="totp-confirm-code" type="text" inputmode="numeric" maxlength="6" placeholder="6-digit code" style="letter-spacing:0.2em">
                            <button id="cu-totp-confirm-btn" class="uk-button kp-btn-primary" style="white-space:nowrap">Confirm &amp; Enable</button>
                        </div>
                    </div>
                    <div class="uk-flex uk-flex-right uk-margin-top">
                        <button id="cu-totp-skip-btn" class="uk-button kp-btn-ghost">Skip for now</button>
                    </div>
                </div>
            </div>
        </div>`);let a=UIkit.modal("#kp-create-user-modal");a.show(),document.getElementById("create-user-form").addEventListener("submit",async s=>{s.preventDefault();let i=s.target.querySelector('[type="submit"]'),n=i.innerHTML;i.disabled=!0,i.innerHTML='<div uk-spinner="ratio: 0.6"></div> Creating...';let o=new FormData(s.target),l={fname:o.get("fname").trim(),lname:o.get("lname").trim(),uname:o.get("uname").trim(),email:o.get("email").trim(),phone:o.get("phone").trim(),password:o.get("password"),role:parseInt(o.get("role")),notify_email:o.get("notify_email")==="on",notify_sms:o.get("notify_sms")==="on"};try{let r=U(await k.post("/users",l));document.getElementById("users-table-body").insertAdjacentHTML("beforeend",Ue(r)),c.success(`User '${r.uname}' created`),document.getElementById("create-user-form").style.display="none",document.getElementById("cu-totp-section").style.display="",ja(r.id,a)}catch(r){c.error(r.message),i.disabled=!1,i.innerHTML=n}}),document.getElementById("kp-create-user-modal").addEventListener("hidden",()=>document.getElementById("kp-create-user-modal")?.remove())}function ja(e,t){let a=()=>{t.hide(),document.getElementById("kp-create-user-modal")?.remove(),y.go("users")};document.getElementById("cu-totp-skip-btn").addEventListener("click",a),document.getElementById("cu-totp-setup-btn").addEventListener("click",async()=>{let s=document.getElementById("cu-totp-setup-btn");s.disabled=!0,s.textContent="Setting up\u2026";try{let i=await k.post(`/users/${e}/totp/setup`,{});document.getElementById("totp-secret-text").textContent=i.secret,document.getElementById("totp-setup-area").style.display="",document.getElementById("cu-totp-skip-btn").style.display="none",await ye(i.uri)}catch(i){c.error(i.message),s.disabled=!1,s.textContent="Enable TOTP"}}),document.getElementById("cu-totp-confirm-btn").addEventListener("click",async()=>{let s=document.getElementById("totp-confirm-code").value.trim();if(s.length!==6){c.error("Enter a 6-digit code");return}let i=document.getElementById("cu-totp-confirm-btn");i.disabled=!0;try{let n=await k.post(`/users/${e}/totp/confirm`,{code:s});t.hide(),document.getElementById("kp-create-user-modal")?.remove(),c.success("TOTP enabled"),n.backup_codes?.length?we(n.backup_codes):y.go("users")}catch(n){c.error(n.message),i.disabled=!1}})}async function Xt(e,t){document.getElementById("kp-edit-user-modal")?.remove();let a;try{a=U(await k.get(`/users/${t}`))}catch(p){c.error(p.message);return}let s=window.KP?.user?.role===99,i=Number(t)===Number(window.KP?.user?.id),n=`
        <div id="kp-edit-user-modal" uk-modal>
            <div class="uk-modal-dialog kp-modal uk-modal-body uk-width-large">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <h3 class="kp-view-title">Edit User \u2014 ${a.uname}</h3>
                <form id="edit-user-form" class="uk-form-stacked uk-margin-top">
                    <div class="uk-grid-small" uk-grid>
                        ${s?`
                        <div class="uk-width-1-1">
                            <label class="kp-label">Username</label>
                            <input class="uk-input kp-input" name="uname" type="text" value="${g(a.uname)}" autocomplete="off">
                        </div>`:""}
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">First Name</label>
                            <input class="uk-input kp-input" name="fname" type="text" value="${g(a.fname)}" required>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Last Name</label>
                            <input class="uk-input kp-input" name="lname" type="text" value="${g(a.lname)}" required>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Email</label>
                            <input class="uk-input kp-input" name="email" type="email" value="${g(a.email)}" required>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Phone</label>
                            <input class="uk-input kp-input" name="phone" type="tel" value="${g(a.phone||"")}" required>
                        </div>
                        <div class="uk-width-1-1">
                            <label class="kp-label uk-margin-small-bottom">Notifications</label>
                            <div class="uk-flex" style="gap:24px">
                                <label><input class="uk-checkbox" type="checkbox" name="notify_email" ${a.notify_email?"checked":""}> &nbsp;Email</label>
                                <label><input class="uk-checkbox" type="checkbox" name="notify_sms" ${a.notify_sms?"checked":""}> &nbsp;SMS</label>
                            </div>
                        </div>
                        ${s?`
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Role</label>
                            <select class="uk-select kp-select" name="role">
                                <option value="50" ${a.role===50?"selected":""}>Manager</option>
                                <option value="99" ${a.role===99?"selected":""}>Admin</option>
                            </select>
                        </div>`:""}
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">New Password</label>
                            <input class="uk-input kp-input" name="password" type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" uk-tooltip="leave blank to keep">
                        </div>
                        ${i?`
                        <div class="uk-margin" id="edit-user-current-pw">
                            <label class="uk-form-label">Current Password</label>
                            <input class="uk-input kp-input" name="current_password" type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" uk-tooltip="required when changing your own password">
                        </div>`:""}                      
                    </div>
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button type="button" class="uk-button kp-btn-ghost uk-modal-close">Cancel</button>
                        <button type="submit" class="uk-button kp-btn-primary">Save Changes</button>
                    </div>
                </form>

                <hr class="uk-divider-muted uk-margin-top">

                <div id="totp-section">
                    <h4 class="uk-margin-small-bottom kp-view-title">Two-Factor Authentication</h4>
                    ${a.totp_enabled?`<div class="uk-flex uk-flex-middle" style="gap:12px">
                            <span class="kp-badge kp-badge-admin" style="font-size:0.75rem">Enabled</span>
                            <button id="totp-disable-btn" class="uk-button kp-btn-secondary kp-btn-sm">Disable TOTP</button>
                           </div>`:`<div class="uk-flex uk-flex-middle" style="gap:12px">
                            <span class="kp-badge kp-badge-manager" style="font-size:0.75rem">Disabled</span>
                            <button id="totp-setup-btn" class="uk-button kp-btn-primary kp-btn-sm">Enable TOTP</button>
                           </div>`}
                    <div id="totp-setup-area" style="display:none" class="uk-margin-top">
                        <p class="kp-muted uk-text-small">Scan the QR code with your authenticator app, then enter the 6-digit code to activate.</p>
                        <div class="uk-text-center uk-margin-small" id="totp-qr-wrap">
                            <img id="totp-qr-img" style="display:none;width:220px;height:220px;border-radius:6px" alt="TOTP QR Code">
                        </div>
                        <p class="kp-muted uk-text-small uk-text-center uk-margin-remove-top">
                            Manual key: <code id="totp-secret-text" style="word-break:break-all"></code>
                        </p>
                        <div class="uk-flex" style="gap:8px;margin-top:8px">
                            <input class="uk-input kp-input" id="totp-confirm-code" type="text" inputmode="numeric" maxlength="6" placeholder="6-digit code" style="letter-spacing:0.2em">
                            <button id="totp-confirm-btn" class="uk-button kp-btn-primary" style="white-space:nowrap">Confirm &amp; Enable</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;document.body.insertAdjacentHTML("beforeend",n);let o=UIkit.modal("#kp-edit-user-modal");o.show(),document.getElementById("edit-user-form").addEventListener("submit",async p=>{p.preventDefault();let d=p.target.querySelector('[type="submit"]'),b=d.innerHTML;d.disabled=!0,d.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let u=new FormData(p.target),h={fname:u.get("fname").trim(),lname:u.get("lname").trim(),email:u.get("email").trim(),phone:u.get("phone").trim(),notify_email:u.get("notify_email")==="on",notify_sms:u.get("notify_sms")==="on"};if(s){h.role=parseInt(u.get("role"));let v=u.get("uname");v&&(h.uname=v.trim())}let f=u.get("password");f&&(h.password=f),f&&i&&(h.current_password=u.get("current_password"));try{await k.put(`/users/${t}`,h),o.hide(),document.getElementById("kp-edit-user-modal")?.remove(),c.success("User updated"),y.go("users")}catch(v){c.error(v.message),d.disabled=!1,d.innerHTML=b}});let l=document.getElementById("totp-setup-btn");l&&l.addEventListener("click",async()=>{l.disabled=!0,l.textContent="Setting up\u2026";try{let p=await k.post(`/users/${t}/totp/setup`,{});document.getElementById("totp-secret-text").textContent=p.secret,document.getElementById("totp-setup-area").style.display="",await ye(p.uri)}catch(p){c.error(p.message),l.disabled=!1,l.textContent="Enable TOTP"}});let r=document.getElementById("totp-confirm-btn");r&&r.addEventListener("click",async()=>{let p=document.getElementById("totp-confirm-code").value.trim();if(p.length!==6){c.error("Enter a 6-digit code");return}r.disabled=!0;try{let d=await k.post(`/users/${t}/totp/confirm`,{code:p});o.hide(),document.getElementById("kp-edit-user-modal")?.remove(),c.success("TOTP enabled"),d.backup_codes?.length?we(d.backup_codes):y.go("users")}catch(d){c.error(d.message),r.disabled=!1}});let m=document.getElementById("totp-disable-btn");m&&m.addEventListener("click",async()=>{m.disabled=!0;try{await k.delete(`/users/${t}/totp`),c.success("TOTP disabled"),o.hide(),document.getElementById("kp-edit-user-modal")?.remove(),y.go("users")}catch(p){c.error(p.message),m.disabled=!1}}),document.getElementById("kp-edit-user-modal").addEventListener("hidden",()=>document.getElementById("kp-edit-user-modal")?.remove())}async function Jt(e){if(!P()){e.innerHTML=T("Access denied");return}let t=await k.get("/users");e.innerHTML=`
        <div class="kp-view-header">
            <h1 class="kp-view-title kp-cursor" style="font-size:2rem;">Users</h1>
            <button class="uk-button kp-btn-primary" id="users-new-btn">
                <span uk-icon="plus"></span> New User
            </button>
        </div>
        <div class="kp-table-wrap">
            <div class="uk-overflow-auto">
            <table class="uk-table uk-table-divider uk-table-middle uk-margin-remove">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th class="uk-text-center">2FA</th>
                        <th class="uk-text-center">Notify</th>
                        <th>Created</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="users-table-body">
                    ${t.map(a=>Ue(U(a))).join("")}
                </tbody>
            </table>
            </div>
        </div>`,document.getElementById("users-new-btn").addEventListener("click",()=>Kt(e)),Oa(e)}function Ue(e){let t=e.role===99?'<span class="kp-badge kp-badge-admin">Admin</span>':'<span class="kp-badge kp-badge-manager">Manager</span>',a=[e.notify_email?'<span uk-icon="icon: mail; ratio: 0.85" uk-tooltip="Email notifications on" style="color:var(--kp-success)"></span>':'<span uk-icon="icon: mail; ratio: 0.85" style="color:var(--kp-text-dim)" uk-tooltip="Email notifications off"></span>',e.notify_sms?'<span uk-icon="icon: receiver; ratio: 0.85" uk-tooltip="SMS notifications on" style="color:var(--kp-success)"></span>':'<span uk-icon="icon: receiver; ratio: 0.85" style="color:var(--kp-text-dim)" uk-tooltip="SMS notifications off"></span>'].join(" ");return`<tr data-user-id="${e.id}">
        <td><strong>${g(e.fname)} ${g(e.lname)}</strong></td>
        <td><span style="font-family:monospace">${g(e.uname)}</span></td>
        <td>${g(e.email)}</td>
        <td>${t}</td>
        <td class="uk-text-center">${e.totp_enabled?'<span uk-icon="icon: check; ratio: 0.9" style="color:var(--kp-success)"></span>':'<span uk-icon="icon: close; ratio: 0.9" style="color:var(--kp-text-dim)"></span>'}</td>
        <td class="uk-text-center">${a}</td>
        <td><span class="kp-muted">${g(e.created)}</span></td>
        <td>
            <div class="uk-flex" style="gap:6px;justify-content:flex-end">
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="edit-user" data-uid="${e.id}" title="Edit" uk-tooltip="Edit the User">
                    <span uk-icon="icon: pencil;"></span>
                </button>
                <button class="uk-button kp-btn-secondary kp-btn-sm" data-action="delete-user" data-uid="${e.id}" title="Delete" uk-tooltip="Delete the User">
                    <span uk-icon="icon: trash;"></span>
                </button>
            </div>
        </td>
    </tr>`}function Oa(e){e.addEventListener("click",async t=>{let a=t.target.closest('[data-action="delete-user"]');if(!(!a||!await $("Delete User","Delete this user? This cannot be undone.")))try{await k.delete(`/users/${a.dataset.uid}`),a.closest("tr").remove(),c.success("User deleted")}catch(i){c.error(i.message)}}),e.addEventListener("click",async t=>{let a=t.target.closest('[data-action="edit-user"]');a&&Xt(e,a.dataset.uid)})}async function Gt(e,t={}){if(!P()){e.innerHTML=T("Access denied");return}e.innerHTML=`
        <div class="kp-view-header">
            <h1 class="kp-view-title kp-cursor" style="font-size:2rem;">Global WAF</h1>
        </div>
        <p class="kp-muted uk-text-small uk-margin-bottom">
            Global WAF settings apply to all sites. Per-site overrides are set on each site's WAF tab.
        </p>

        <!-- tab pills -->
        <ul class="kp-tab-pills" id="kp-waf-pills">
            <li data-tab="crs"><a href="#"><span uk-icon="icon: lifesaver; ratio: 0.85"></span> Core Rule Set</a></li>
            <li data-tab="autoban"><a href="#"><span uk-icon="icon: ban; ratio: 0.85"></span> Auto-Ban</a></li>
        </ul>

        <!-- switcher panels -->
        <ul class="uk-switcher uk-margin-large-bottom" id="kp-waf-switcher">

            <!-- core rule set -->
            <li>
                <div class="kp-card uk-padding-small">
                    <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                        <h3 class="kp-view-title">Web Application Firewall</h3>
                        <div class="uk-flex" style="gap:8px">
                            <a class="uk-button kp-btn-ghost kp-btn-sm" href="/api/settings/waf/export" download="podnest-waf-settings.json" uk-tooltip="Export WAF settings">
                                <span uk-icon="download"></span>
                            </a>
                            <label class="uk-button kp-btn-ghost kp-btn-sm" style="cursor:pointer" uk-tooltip="Import WAF settings from JSON">
                                <span uk-icon="upload"></span>
                                <input type="file" id="sec-waf-import" accept=".json" style="display:none">
                            </label>
                            <button class="uk-button kp-btn-primary kp-btn-sm" id="sec-waf-save" uk-tooltip="Save WAF Settings">
                                <span uk-icon="check"></span>
                            </button>
                        </div>
                    </div>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">
                        Inspects all proxied requests using the OWASP Core Rule Set.
                        Start in Detection mode to review false positives before enabling Prevention.
                        The engine recompiles in the background after saving.
                    </p>
                    <div class="uk-grid-small uk-margin-small-bottom" uk-grid>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label" for="sec-waf-mode">Mode</label>
                            <select class="uk-select kp-select" id="sec-waf-mode">
                                <option value="0">Detection \u2014 log matches only</option>
                                <option value="1">Prevention \u2014 block matching requests</option>
                            </select>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label" for="sec-waf-paranoia">Paranoia Level</label>
                            <select class="uk-select kp-select" id="sec-waf-paranoia">
                                <option value="1">1 \u2014 Baseline (recommended)</option>
                                <option value="2">2 \u2014 Moderate</option>
                                <option value="3">3 \u2014 Strict</option>
                                <option value="4">4 \u2014 Paranoid</option>
                            </select>
                        </div>
                    </div>
                    <div class="uk-grid-small uk-margin-small-bottom" uk-grid>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">
                                <input class="uk-checkbox" type="checkbox" id="sec-waf-enabled">
                                &nbsp;Enable WAF (OWASP Core Rule Set)
                            </label>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">
                                <input class="uk-checkbox" type="checkbox" id="sec-waf-audit">
                                &nbsp;Enable Audit Log
                            </label>
                        </div>
                    </div>
                    <div class="uk-margin-small-bottom">
                        <label class="kp-label" for="sec-waf-exclusions">Global Rule Exclusions</label>
                        <textarea class="uk-textarea kp-textarea kp-mono kp-waf-exclusions" id="sec-waf-exclusions" rows="15"
                            placeholder="# Numeric = rule ID, text = tag name, one per line&#10;920350&#10;attack-sqli"></textarea>
                        <p class="kp-muted uk-text-small uk-margin-small-top">
                            Numeric entries map to <span class="kp-mono">SecRuleRemoveById</span>;
                            text entries to <span class="kp-mono">SecRuleRemoveByTag</span>.
                        </p>
                    </div>
                </div>
            </li>

            <!-- auto-ban -->
            <li>${ge()}</li>

        </ul>`,za(e),He(e,t.tab),Qt(e),fe(e)}async function Qt(e){try{let t=await k.get("/settings/waf");if(!e.querySelector("#sec-waf-enabled"))return;e.querySelector("#sec-waf-enabled").checked=!!t.Enabled,e.querySelector("#sec-waf-audit").checked=!!t.AuditLog,e.querySelector("#sec-waf-mode").value=String(t.Mode??0),e.querySelector("#sec-waf-paranoia").value=String(t.ParanoiaLevel??1),e.querySelector("#sec-waf-exclusions").value=t.Exclusions??""}catch(t){c.error("Failed to load WAF settings: "+t.message)}}function za(e){e.querySelector("#sec-waf-save")?.addEventListener("click",async()=>{let t=e.querySelector("#sec-waf-save"),a=t.innerHTML;t.disabled=!0,t.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.put("/settings/waf",{enabled:e.querySelector("#sec-waf-enabled").checked,mode:parseInt(e.querySelector("#sec-waf-mode").value,10),paranoia_level:parseInt(e.querySelector("#sec-waf-paranoia").value,10),audit_log:e.querySelector("#sec-waf-audit").checked,exclusions:e.querySelector("#sec-waf-exclusions").value.trim()}),c.success("WAF settings saved \u2014 engine recompiling in background")}catch(s){c.error(s.message)}finally{t.disabled=!1,t.innerHTML=a}}),e.querySelector("#sec-waf-import")?.addEventListener("change",async t=>{let a=t.target.files[0];if(!a)return;let s=new FormData;s.append("file",a);try{let i=await fetch("/api/settings/waf/import",{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:s}),n=i.status===204?null:await i.json().catch(()=>null);if(!i.ok)throw new Error(n?.error||`HTTP ${i.status}`);await Qt(e),c.success("WAF settings imported")}catch(i){c.error(i.message)}finally{t.target.value=""}})}y.register("dashboard",e=>Ze(e));y.register("sites",e=>Qe(e));y.register("site-detail",(e,t)=>Vt(e,t));y.register("users",e=>Jt(e));y.register("nodes",e=>D(e));y.register("settings",(e,t)=>Pe(e,t));y.register("security",(e,t)=>nt(e,t));y.register("waf",(e,t)=>Gt(e,t));y.register("admin-logs",e=>ze(e));y.register("audit-log",e=>Je(e));document.addEventListener("keydown",e=>{let t=e.target;t?.matches?.("input, textarea, select, [contenteditable='true']")&&(t.closest?.(".CodeMirror")||t.id==="wpcli-input"&&(e.key==="ArrowUp"||e.key==="ArrowDown")||["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)&&e.stopPropagation())},!0);document.addEventListener("click",e=>{let t=e.target.closest("[data-view]");t&&(e.preventDefault(),y.go(t.dataset.view))});document.addEventListener("click",async e=>{let t=e.target.closest("[data-action]");if(!t)return;e.stopPropagation();let{action:a,id:s}=t.dataset;switch(a){case"manage":y.go("site-detail",{id:s});break;case"start":await xe(s,"start","Starting Site","Starting all containers - please wait...");break;case"stop":await xe(s,"stop","Stopping Site","Gracefully stopping all containers - please wait...");break;case"restart":await xe(s,"restart","Restarting Site","Restarting all containers - please wait...");break;case"flush":await xe(s,"flush","Flushing Caches","Clearing container caches - please wait...");break;case"delete":await Va(s);break;case"recreate":S("Recreating Pod","Recreating containers for this site - this may take a few minutes...");try{await k.post(`/sites/${s}/recreate`,{prune:!0}),x(),c.success("Pod recreated"),y.go("sites")}catch(i){x(),c.error(i.message)}break}});document.addEventListener("kp:bulk-action",async e=>{let{action:t,ids:a}=e.detail;if(!a.length)return;let s={start:"Starting",stop:"Stopping",restart:"Restarting",flush:"Flushing Caches",recreate:"Recreating"},i=t==="recreate"?"Please hold while we update your Pods":"Please wait...",n=t==="recreate"?{prune:!0}:void 0,o=t==="recreate"?1200*1e3:void 0;S(`${s[t]} ${a.length} Site${a.length!==1?"s":""}`,i);let l=await Promise.allSettled(a.map(m=>k.post(`/sites/${m}/${t}`,n,o)));x();let r=l.filter(m=>m.status==="rejected").length;r===0?c.success(`${t.charAt(0).toUpperCase()+t.slice(1)} complete for ${a.length} site${a.length!==1?"s":""}`):c.error(`${r} of ${a.length} sites failed \u2014 check logs`),["start","stop","restart","recreate"].includes(t)&&y.go("sites")});async function xe(e,t,a,s){S(a,s);try{if(await k.post(`/sites/${e}/${t}`),x(),c.success(a+" complete"),t!=="flush"){let{view:i,params:n}=ie();y.go(i,n)}}catch(i){x(),c.error(i.message)}}async function Va(e){if(!await $("Delete Site",`This will stop and permanently remove the pod and all its data. Are you sure?

A final backup will be created before deletion. This may take a moment.`))return;S("Deleting Site","Creating final backup and removing the pod \u2014 please wait...");let a;try{a=await fetch(`/api/sites/${e}`,{method:"DELETE",headers:{"X-CSRF-Token":window.KP?.csrf??""}})}catch{}if(x(),a?.ok&&a.headers.get("Content-Type")?.includes("gzip")){let o=(a.headers.get("Content-Disposition")??"").match(/filename="([^"]+)"/)?.[1]??`${e}_final.tar.gz`,l=await a.blob(),r=document.createElement("a");r.href=URL.createObjectURL(l),r.download=o,r.click(),URL.revokeObjectURL(r.href),c.success("Site deleted. Final backup downloaded."),y.go("sites");return}let s=!1,i=0;for(;!s&&i<10;){try{await new Promise(o=>setTimeout(o,2e3)),s=!(await k.get("/sites")).find(o=>o.ID===parseInt(e))}catch{}i++}s?(c.success("Site deleted. Final backup saved to S3."),y.go("sites")):c.error("Delete failed - site still exists after 20s")}if(window.KP?.user?.role===99){let e=document.getElementById("kp-resource-warning"),t=document.getElementById("kp-resource-warning-msg"),a=async()=>{try{let s=await k.get("/settings/resource-warning");s?.active&&e&&t?(t.textContent=`${s.current_mb}MB used, threshold ${s.threshold_mb}MB \u2014 throttling ${s.offender}.`,e.style.display=""):e&&(e.style.display="none")}catch{}};a(),setInterval(a,3e4)}window.addEventListener("hashchange",()=>{if(y._ownHashChange)return;let{view:e,params:t}=ie();y.go(e,t)});(()=>{let e=document.getElementById("kp-totop");if(!e)return;let t=()=>{e.classList.toggle("is-visible",window.scrollY>150)};window.addEventListener("scroll",t,{passive:!0}),t(),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})})();(()=>{let e=document.querySelectorAll(".kp-logout-link");e.length&&e.forEach(t=>{t.addEventListener("click",async a=>{a.preventDefault(),await fetch("/logout",{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""}}),window.location.href="/login"})})})();(()=>{let e=document.querySelectorAll(".kp-pair-code-link");e.length&&e.forEach(t=>{t.addEventListener("click",async a=>{a.preventDefault();try{Ka(await k.post("/nodes/pair-code"))}catch(s){c.error(s.message)}})})})();function Ka({code:e,url:t,expires_in:a}){let s="kp-pair-code-modal";document.getElementById(s)?.remove();let i=`
        <div id="${s}" uk-modal>
            <div class="uk-modal-dialog kp-modal uk-modal-body" style="max-width:460px">
                <h3 class="uk-modal-title">Pairing Code</h3>
                <p class="kp-muted uk-text-small">
                    On the parent node, choose Add Node and enter this URL and code.
                    The code works once, and only for this URL.
                </p>
                <label class="kp-label">URL</label>
                <input class="uk-input kp-input" type="text" readonly value="${g(t)}">
                <label class="kp-label uk-margin-small-top">Code</label>
                <input class="uk-input kp-input" type="text" readonly value="${g(e)}"
                    style="letter-spacing:0.2em;font-size:1.2rem;text-align:center">
                <p class="kp-muted uk-text-small uk-margin-small-top">
                    Expires in <span id="kp-pair-code-ttl"></span>
                </p>
                <div class="uk-flex uk-flex-right uk-margin-top">
                    <button class="uk-button kp-btn-ghost uk-modal-close">Close</button>
                </div>
            </div>
        </div>`;document.body.insertAdjacentHTML("beforeend",i);let n=document.getElementById(s),o=document.getElementById("kp-pair-code-ttl"),l=a,r=()=>{if(l<=0){o.textContent="\u2014 expired",clearInterval(m);return}o.textContent=`${Math.floor(l/60)}:${String(l%60).padStart(2,"0")}`,l--},m=setInterval(r,1e3);r(),n.addEventListener("hidden",()=>{clearInterval(m),setTimeout(()=>n.remove(),300)},{once:!0}),UIkit.modal(n).show()}var{view:Xa,params:Ja}=ie();y.go(Xa,Ja);})();
