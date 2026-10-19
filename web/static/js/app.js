/*! PodNest - Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com> | MIT License */

"use strict";(()=>{var k={async _req(t,e,s,a=6e4){let i=new AbortController,n=setTimeout(()=>i.abort(),a),o={method:t,headers:{"Content-Type":"application/json"},signal:i.signal};t!=="GET"&&t!=="HEAD"&&(o.headers["X-CSRF-Token"]=window.KP?.csrf??""),s!==void 0&&(o.body=JSON.stringify(s));try{let l=await fetch("/api"+e,o);clearTimeout(n);let r=l.status===204?null:await l.json().catch(()=>null);if(l.status===401)return window.location.href="/login?msg=Your+session+has+expired+%E2%80%94+please+log+in+again",null;if(!l.ok)throw new Error(r?.error||`HTTP ${l.status}`);return r}catch(l){throw clearTimeout(n),l}},get:t=>k._req("GET",t),post:(t,e,s)=>k._req("POST",t,e,s),put:(t,e,s)=>k._req("PUT",t,e,s),delete:t=>k._req("DELETE",t),patch:(t,e)=>k._req("PATCH",t,e)};var f=t=>String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");function L(t){return t===0?"0 B":t<1024?`${t} B`:t<1048576?`${(t/1024).toFixed(1)} KB`:t<1073741824?`${(t/1048576).toFixed(1)} MB`:`${(t/1073741824).toFixed(2)} GB`}var at=()=>'<div class="kp-spinner"><div uk-spinner="ratio: 1.25"></div></div>',T=t=>`<div class="kp-empty">
        <div class="kp-empty-icon" uk-icon="icon: warning; ratio: 2.5"></div>
        <div class="kp-empty-text">${t}</div>
    </div>`,st=(t,e)=>`<div class="kp-empty">
        <div class="kp-empty-icon" uk-icon="icon: ${t}; ratio: 2.5"></div>
        <div class="kp-empty-text">${e}</div>
    </div>`,M=t=>{let e={1:["running","Running"],2:["stopped","Stopped"],3:["restarting","Restarting"],4:["error","Error"]},[s,a]=e[t]||["stopped","Unknown"];return`<span class="kp-status kp-status-${s}">${a}</span>`},Re=t=>({3:"8.2",4:"8.3",5:"8.4",6:"8.5"})[t]||"?",J=t=>({1:"WordPress",2:"PHP",3:"Static",4:"Node.js",5:".NET",6:"Reverse Proxy",7:"Python"})[t]||"?",P=()=>window.KP.user.role===window.KP.roles.admin,D=t=>{switch(t.SiteType){case 1:case 2:return`PHP ${Re(t.PHPVersion)}`;case 4:return`Node ${{2:"22",4:"24",5:"25",6:"26"}[t.RuntimeVersion]||"?"}`;case 5:return`.NET ${{1:"8.0",2:"9.0",3:"10.0"}[t.RuntimeVersion]||"?"}`;case 7:return`Python ${{1:"3.11",2:"3.12",3:"3.13",4:"3.14"}[t.RuntimeVersion]||"?"}`;case 6:return"Reverse Proxy";default:return""}},F=t=>({id:t.id??t.ID,uname:t.uname??t.UName,uhash:t.uhash??t.UHash,fname:t.fname??t.FName,lname:t.lname??t.LName,email:t.email??t.Email,phone:t.phone??t.Phone,role:t.role??t.Role,totp_enabled:t.totp_enabled??!1,notify_email:t.notify_email??!1,notify_sms:t.notify_sms??!1,created:t.created??t.Created});function E(t,e){return new Promise(s=>{document.getElementById("kp-confirm-title").textContent=t,document.getElementById("kp-confirm-message").textContent=e;let a=UIkit.modal("#kp-confirm-modal");document.getElementById("kp-confirm-ok").addEventListener("click",()=>{a.hide(),s(!0)},{once:!0}),a.show(),document.getElementById("kp-confirm-modal").addEventListener("hidden",()=>s(!1),{once:!0})})}function S(t,e){let s=`
        <div id="kp-progress-modal" uk-modal="bg-close: false; esc-close: false; keyboard: false">
            <div class="uk-modal-dialog kp-modal uk-modal-body uk-text-center" style="max-width:420px">
                <div uk-spinner="ratio: 1.5" style="color:var(--kp-blue)"></div>
                <h3 class="uk-modal-title uk-margin-small-top" id="kp-progress-title">${t}</h3>
                <p class="kp-muted uk-text-small" id="kp-progress-message">${e}</p>
                <p class="kp-muted">
                    This may take several minutes while the task(s) complete, make sure to keep screen open until it has completed.
                </p>
            </div>
        </div>`;document.body.insertAdjacentHTML("beforeend",s),UIkit.modal("#kp-progress-modal").show()}function x(){let t=document.getElementById("kp-progress-modal");t&&(UIkit.modal(t).hide(),setTimeout(()=>t.remove(),300))}function Dt(t){return new Promise(e=>{let s="kp-clone-modal",a=`
            <div id="${s}" uk-modal>
                <div class="uk-modal-dialog kp-modal uk-modal-body" style="max-width:420px">
                    <h3 class="uk-modal-title">Clone Site</h3>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">
                        Enter a name for the clone of <strong>${t}</strong>.
                        Files, database, and configuration will be copied \u2014 domains will not.
                    </p>
                    <input id="kp-clone-name" class="uk-input kp-input" type="text"
                        placeholder="clone-name" autocomplete="off">
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button class="uk-button kp-btn-ghost uk-modal-close" id="kp-clone-cancel">Cancel</button>
                        <button class="uk-button kp-btn-primary" id="kp-clone-ok">
                            <span uk-icon="move"></span> Clone
                        </button>
                    </div>
                </div>
            </div>`;document.body.insertAdjacentHTML("beforeend",a);let i=UIkit.modal(`#${s}`),n=document.getElementById("kp-clone-name"),o=document.getElementById("kp-clone-ok"),l=document.getElementById("kp-clone-cancel"),r=c=>{i.hide(),setTimeout(()=>document.getElementById(s)?.remove(),300),e(c)};o.addEventListener("click",()=>r(n.value.trim()||null),{once:!0}),l.addEventListener("click",()=>r(null),{once:!0}),document.getElementById(s).addEventListener("hidden",()=>r(null),{once:!0}),i.show(),setTimeout(()=>n.focus(),150),n.addEventListener("keydown",c=>{c.key==="Enter"&&o.click()})})}function Rt(t){return new Promise(e=>{let s="kp-rename-modal",a=`
            <div id="${s}" uk-modal>
                <div class="uk-modal-dialog kp-modal uk-modal-body" style="max-width:420px">
                    <h3 class="uk-modal-title">Rename Site</h3>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">
                        Enter a new name for <strong>${t}</strong>.  Please have patience, this takes a few minutes.
                    </p>
                    <input id="kp-rename-name" class="uk-input kp-input" type="text"
                        value="${t}" autocomplete="off">
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button class="uk-button kp-btn-ghost uk-modal-close" id="kp-rename-cancel">Cancel</button>
                        <button class="uk-button kp-btn-primary" id="kp-rename-ok">
                            <span uk-icon="pencil"></span> Rename
                        </button>
                    </div>
                </div>
            </div>`;document.body.insertAdjacentHTML("beforeend",a);let i=UIkit.modal(`#${s}`),n=document.getElementById("kp-rename-name"),o=document.getElementById("kp-rename-ok"),l=document.getElementById("kp-rename-cancel"),r=c=>{i.hide(),setTimeout(()=>document.getElementById(s)?.remove(),300),e(c)};o.addEventListener("click",()=>r(n.value.trim()||null),{once:!0}),l.addEventListener("click",()=>r(null),{once:!0}),document.getElementById(s).addEventListener("hidden",()=>r(null),{once:!0}),i.show(),setTimeout(()=>n.focus(),150),n.addEventListener("keydown",c=>{c.key==="Enter"&&o.click()})})}function gt(t,e,s){return new Promise(a=>{let i="kp-sync-modal",n=t==="pull",o=n?"Pull From Parent":"Push To Parent",l=n?"cloud-download":"cloud-upload",r=n?s:e,c=n?e:s,b=`
            <div id="${i}" uk-modal>
                <div class="uk-modal-dialog kp-modal uk-modal-body" style="max-width:460px">
                    <h3 class="uk-modal-title">${o}</h3>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">
                        This will overwrite all files and database content on
                        <strong>${c}</strong> with data from <strong>${r}</strong>.
                        This action cannot be undone.
                    </p>
                    <p class="kp-muted uk-text-small" style="color:var(--kp-red, #e05c5c)">
                        <span uk-icon="icon: warning; ratio: 0.85"></span>
                        <strong>${c}</strong> will be temporarily unavailable during the sync.
                    </p>
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button class="uk-button kp-btn-ghost uk-modal-close" id="kp-sync-cancel">Cancel</button>
                        <button class="uk-button kp-btn-primary" id="kp-sync-ok">
                            <span uk-icon="${l}"></span> ${o}
                        </button>
                    </div>
                </div>
            </div>`;document.body.insertAdjacentHTML("beforeend",b);let p=UIkit.modal(`#${i}`),u=document.getElementById("kp-sync-ok"),m=document.getElementById("kp-sync-cancel"),h=v=>{p.hide(),setTimeout(()=>document.getElementById(i)?.remove(),300),a(v)};u.addEventListener("click",()=>h(!0),{once:!0}),m.addEventListener("click",()=>h(!1),{once:!0}),document.getElementById(i).addEventListener("hidden",()=>h(!1),{once:!0}),p.show()})}var y={routes:{},_ownHashChange:!1,register(t,e){this.routes[t]=e},async go(t,e={}){let s=Object.keys(e).length?t+"/"+Object.values(e).join("/"):t;this._ownHashChange=!0,window.location.hash=s,setTimeout(()=>{this._ownHashChange=!1},0),document.querySelectorAll(".kp-nav-link").forEach(n=>{n.classList.toggle("kp-active",n.dataset.view===t)}),document.querySelectorAll(".kp-bn-item[data-view]").forEach(n=>{n.classList.toggle("kp-active",n.dataset.view===t)});let a=this.routes[t];if(!a)return;let i=document.getElementById("kp-view");i.innerHTML=at();try{await a(i,e)}catch(n){i.innerHTML=T(n.message)}}};function nt(){let e=(window.location.hash.replace("#","")||"dashboard").split("/"),s=e[0],a={};return s==="site-detail"&&e[1]&&(a.id=e[1]),s==="settings"&&e[1]&&(a.tab=e[1]),s==="site-detail"&&e[2]&&(a.tab=e[2]),s==="security"&&e[1]&&(a.tab=e[1]),s==="waf"&&e[1]&&(a.tab=e[1]),{view:s,params:a}}var d={show(t,e="info",s=7e3){let a={success:"check",error:"warning",info:"info"},i=document.createElement("div");i.className=`kp-toast kp-toast-${e}`,i.innerHTML=`<span uk-icon="${a[e]||"info"}"></span><span>${f(t)}</span>`,document.getElementById("kp-toasts").appendChild(i),UIkit.icon(i.querySelector("[uk-icon]")),setTimeout(()=>i.remove(),s)},success:t=>d.show(t,"success"),error:t=>d.show(t,"error"),info:t=>d.show(t,"info")};var He=2e3;function Fe(){return`
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
        </div>`}function Ue(t){let e=null,s=!1,a=t.querySelector("#admin-log-output"),i=t.querySelector("#admin-log-connect"),n=t.querySelector("#admin-log-disconnect"),o=t.querySelector("#admin-log-clear"),l=t.querySelector("#admin-log-autoscroll"),r=t.querySelector("#admin-log-status");function c(u){for(u.split(`
`).forEach(m=>{if(!m)return;let h=document.createElement("div");h.className=m.match(/WAF BLOCK/i)?"kp-log-line-err":m.match(/WAF DETECT/i)?"kp-log-line-warn":m.match(/error|crit|emerg/i)?"kp-log-line-err":m.match(/warn/i)?"kp-log-line-warn":m.match(/info|notice/i)?"kp-log-line-info":"",h.textContent=m,a.appendChild(h)});a.childElementCount>He;)a.removeChild(a.firstChild);l.checked&&(a.scrollTop=a.scrollHeight)}function b(){e&&(e.close(),e=null),s=!1,i.disabled=!1,n.disabled=!0,r&&(r.textContent="Disconnected")}i.addEventListener("click",()=>{b();let u=t.querySelector("#admin-log-source").value,m=t.querySelector("#admin-log-tail").value,h=location.protocol==="https:"?"wss":"ws",v=u==="waf"?`${h}://${location.host}/api/logs/waf?tail=${m}`:`${h}://${location.host}/api/logs/proxy?tail=${m}`;e=new WebSocket(v),e.onopen=()=>{s=!0,i.disabled=!0,n.disabled=!1,r&&(r.textContent=`Connected \u2014 ${u==="waf"?"WAF Log":"Proxy Access Log"}`)},e.onmessage=g=>c(g.data),e.onerror=()=>{},e.onclose=()=>{s=!1,i.disabled=!1,n.disabled=!0,r&&(r.textContent="Disconnected")}}),n.addEventListener("click",b),o.addEventListener("click",()=>{a.innerHTML=""}),t.querySelector("#admin-log-source").addEventListener("change",()=>{e&&e.readyState===WebSocket.OPEN&&(b(),i.click())});let p=y.go.bind(y);y.go=function(u,m={}){return e&&b(),p(u,m)}}function Ht(t){t.innerHTML=Fe(),Ue(t)}var ot=50;function Ne(t,e,s){let a=Math.max(1,Math.ceil(t.total/ot)),i=(t.entries??[]).map(Ft).join("")||'<tr><td colspan="8" class="uk-text-center" style="color:var(--kp-text-dim)">No records found</td></tr>';return`
        <div id="audit-log-panel">
            <div class="kp-view-header">
                <h1 class="kp-view-title" style="font-size:2rem;">Audit Log</h1>
            </div>

            <div class="kp-card uk-padding-small uk-margin-bottom">
                <div class="uk-flex uk-flex-middle uk-flex-wrap kp-filter-bar">
                    <input class="uk-input kp-input" id="al-filter-user" type="text"
                        placeholder="Username" value="${_(e.username)}">
                    <input class="uk-input kp-input" id="al-filter-action" type="text"
                        placeholder="Action" value="${_(e.action)}">
                    <input class="uk-input kp-input" id="al-filter-target" type="text"
                        placeholder="Target type" value="${_(e.target_type)}">
                    <input class="uk-input kp-input" id="al-filter-date-from" type="date"
                        value="${_(e.date_from)}">
                    <input class="uk-input kp-input" id="al-filter-date-to" type="date"
                        value="${_(e.date_to)}">
                    <select class="uk-select kp-select" id="al-filter-auth">
                        <option value=""  ${e.auth===""?"selected":""}>All requests</option>
                        <option value="1" ${e.auth==="1"?"selected":""}>Authenticated</option>
                        <option value="0" ${e.auth==="0"?"selected":""}>Unauthenticated</option>
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
                        ${t.total} record${t.total!==1?"s":""}
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

            ${a>1?`<div id="al-pager">${Ut(s,a)}</div>`:'<div id="al-pager"></div>'}
        </div>`}function Ft(t){let e=new Date(t.ts).toLocaleString(),s=t.username?`<span style="font-family:monospace">${_(t.username)}</span>`:'<span style="color:var(--kp-text-dim)">\u2014</span>',a=We(t.status),n=t.prior_state||t.new_state?`<button class="uk-button kp-btn-ghost kp-btn-sm al-diff-btn"
                data-prior="${_(t.prior_state)}" data-new="${_(t.new_state)}">
               <span uk-icon="icon: git-fork; ratio: 0.85"></span>
           </button>`:"<span>\u2014</span>",o=t.details?`<button class="uk-button kp-btn-ghost kp-btn-sm al-diff-btn"
                data-prior="" data-new="${_(t.details)}">
               <span uk-icon="icon: info; ratio: 0.85"></span>
           </button>`:"<span>\u2014</span>";return`<tr>
        <td style="white-space:nowrap;font-size:0.82rem">${e}</td>
        <td>${s}</td>
        <td style="font-family:monospace;font-size:0.82rem">${_(t.ip)}</td>
        <td><span class="kp-badge">${_(t.method)}</span></td>
        <td style="font-family:monospace;font-size:0.82rem">${_(t.action)}</td>
        <td>${a}</td>
        <td>${o}</td>
        <td>${n}</td>
    </tr>`}function Ut(t,e){let s=t>1?'<button class="uk-button kp-btn-ghost kp-btn-sm" id="al-prev">\u2039 Prev</button>':"",a=t<e?'<button class="uk-button kp-btn-ghost kp-btn-sm" id="al-next">Next \u203A</button>':"";return`<div class="uk-flex uk-flex-middle uk-flex-center uk-margin-small-top" style="gap:12px">
        ${s}
        <span style="font-size:0.85rem;color:var(--kp-text-dim)">Page ${t} of ${e}</span>
        ${a}
    </div>`}function We(t){return`<span class="kp-badge ${t>=500?"kp-badge-error":t>=400?"kp-badge-warn":t>=300?"kp-badge-info":"kp-badge-ok"}">${t}</span>`}var _=t=>f(t??"");async function Nt(t,e){let s=new URLSearchParams({page:e,page_size:ot});return t.username&&s.set("username",t.username),t.action&&s.set("action",t.action),t.target_type&&s.set("target_type",t.target_type),t.date_from&&s.set("date_from",t.date_from),t.date_to&&s.set("date_to",t.date_to),t.auth!==""&&s.set("auth",t.auth),k.get(`/audit?${s}`)}function je(t){return{username:t.querySelector("#al-filter-user").value.trim(),action:t.querySelector("#al-filter-action").value.trim(),target_type:t.querySelector("#al-filter-target").value.trim(),date_from:t.querySelector("#al-filter-date-from").value,date_to:t.querySelector("#al-filter-date-to").value,auth:t.querySelector("#al-filter-auth").value}}async function Oe(t,e,s){async function a(o,l){let r=await Nt(o,l);t.querySelector("#al-table-body").innerHTML=(r.entries??[]).map(Ft).join("")||'<tr><td colspan="8" class="uk-text-center kp-text-dim">No records found</td></tr>';let c=Math.max(1,Math.ceil(r.total/ot)),b=t.querySelector("#al-pager");b&&(b.innerHTML=c>1?Ut(l,c):""),t.querySelector("#al-record-count").textContent=`${r.total} record${r.total!==1?"s":""}`,i(t,o,l,c),e=o,s=l}function i(o,l,r,c){o.querySelector("#al-prev")?.addEventListener("click",()=>a(l,r-1)),o.querySelector("#al-next")?.addEventListener("click",()=>a(l,r+1))}t.querySelector("#al-filter-apply")?.addEventListener("click",()=>{a(je(t),1)}),t.querySelector("#al-filter-clear")?.addEventListener("click",()=>{["al-filter-user","al-filter-action","al-filter-target","al-filter-date-from","al-filter-date-to"].forEach(o=>{let l=t.querySelector(`#${o}`);l&&(l.value="")}),t.querySelector("#al-filter-auth").value="",a({username:"",action:"",target_type:"",date_from:"",date_to:"",auth:""},1)});let n=Math.max(1,Math.ceil(parseInt(t.querySelector("#al-record-count")?.textContent??"0")/ot));i(t,e,s,n),t.querySelector("#audit-log-panel")?.addEventListener("click",o=>{let l=o.target.closest(".al-diff-btn");if(!l)return;o.preventDefault(),o.stopPropagation();let r=l.dataset.prior??"",c=l.dataset.new??"",b="";r&&c?b=`=== BEFORE ===
`+it(r)+`

=== AFTER ===
`+it(c):c?b=it(c):b=it(r),document.body.insertAdjacentHTML("beforeend",`
            <div id="al-diff-modal-inst" uk-modal>
                <div class="uk-modal-dialog kp-modal uk-modal-body uk-width-large">
                    <button class="uk-modal-close-default" type="button" uk-close></button>
                    <h3 class="kp-view-title uk-margin-bottom">Request Detail</h3>
                    <pre class="kp-cron-output">${_(b)}</pre>
                </div>
            </div>`);let p=document.getElementById("al-diff-modal-inst");UIkit.modal(p).show(),p.addEventListener("hidden",()=>p.remove(),{once:!0})})}function it(t){try{return JSON.stringify(JSON.parse(t),null,2)}catch{return t}}async function Wt(t){if(!P()){t.innerHTML=T("Access denied");return}let e={username:"",action:"",target_type:"",date_from:"",date_to:"",auth:""},s=await Nt(e,1);t.innerHTML=Ne(s,e,1),Oe(t,e,1)}function lt(){document.body.insertAdjacentHTML("beforeend",`
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
        </div>`);let e=UIkit.modal("#kp-create-site-modal"),s=document.getElementById("cs-site-type"),a=document.getElementById("cs-php-version-wrap"),i=document.getElementById("cs-node-version-wrap"),n=document.getElementById("cs-dotnet-version-wrap"),o=document.getElementById("cs-python-version-wrap"),l=document.getElementById("cs-start-command-wrap"),r=document.getElementById("cs-wordpress-wrap");e.show();let c=document.getElementById("cs-domains-wrap"),b=document.getElementById("cs-rp-note");s.addEventListener("change",()=>{let p=parseInt(s.value);a.classList.toggle("uk-hidden",p!==1&&p!==2||p===6),i.classList.toggle("uk-hidden",p!==4),n.classList.toggle("uk-hidden",p!==5),o.classList.toggle("uk-hidden",p!==7),l.classList.toggle("uk-hidden",p!==4&&p!==5&&p!==7),l.querySelector("input").required=p===7,r.classList.toggle("uk-hidden",p!==1||p===6),c.classList.toggle("uk-hidden",p===6),b.classList.toggle("uk-hidden",p!==6)}),document.getElementById("create-site-form").addEventListener("submit",async p=>{p.preventDefault();let u=p.target.querySelector('[type="submit"]'),m=u.innerHTML;u.disabled=!0,u.innerHTML='<div uk-spinner="ratio: 0.6"></div> Creating...';let h=new FormData(p.target),v=parseInt(h.get("site_type")),g=null;v===4&&(g=parseInt(h.get("node_version"))),v===5&&(g=parseInt(h.get("dotnet_version"))),v===7&&(g=parseInt(h.get("python_version")));let w={name:h.get("name").trim(),php_version:parseInt(h.get("php_version"))||3,site_type:v,runtime_version:g,start_command:h.get("start_command")?.trim()||"",domains:h.get("domains").split(`
`).map(I=>I.trim()).filter(Boolean),install_wordpress:v===1?h.get("install_wordpress")==="on":!1};e.hide(),document.getElementById("kp-create-site-modal")?.remove();let $=v===6?`Setting up '${w.name}' as a reverse proxy...`:`Setting up '${w.name}' \u2014 pulling images and provisioning containers...`;S("Creating Site",$);try{await k.post("/sites",w,6e5),x(),d.success(`Site '${w.name}' created`),y.go("sites")}catch(I){x(),d.error(I.message),u.disabled=!1,u.innerHTML=m}}),document.getElementById("kp-create-site-modal").addEventListener("hidden",()=>document.getElementById("kp-create-site-modal")?.remove())}var U=null;function ze(t){return`${t.toFixed(1)}%`}var rt=null;function ft(){return rt||(rt=new Promise(t=>{if(window.Chart){t();return}let e=document.createElement("script");e.src="https://cdn.jsdelivr.net/npm/chart.js@latest/dist/chart.umd.min.js",e.onload=t,e.onerror=t,document.body.appendChild(e)}),rt)}function yt(t,e){return`
        <div id="stats-panel" data-site-id="${t}" data-site-type="${e}">

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

            ${e===6?"":`
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

        </div>`}async function Ve(t){await ft();let e;try{e=await k.get(`/sites/${t}/stats/traffic`)}catch(n){document.getElementById("stats-ip-rows").innerHTML=`<tr><td colspan="2" class="kp-muted uk-text-small">Failed to load: ${n.message}</td></tr>`;return}document.getElementById("stats-2xx").textContent=(e.status_codes["2xx"]??0).toLocaleString(),document.getElementById("stats-3xx").textContent=(e.status_codes["3xx"]??0).toLocaleString(),document.getElementById("stats-4xx").textContent=(e.status_codes["4xx"]??0).toLocaleString(),document.getElementById("stats-5xx").textContent=(e.status_codes["5xx"]??0).toLocaleString(),document.getElementById("stats-bandwidth").textContent=L(e.total_bandwidth??0);let s=document.getElementById("stats-chart");if(s&&window.Chart){let n=(e.hits_per_hour??[]).map(l=>new Date(l.hour).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}));U&&(U.destroy(),U=null),U=new window.Chart(s,{type:"bar",data:{labels:n,datasets:[{label:"2xx",data:(e.hits_per_hour??[]).map(l=>l["2xx"]),backgroundColor:"rgba(39,174,96,0.75)",borderColor:"rgba(39,174,96,1)",borderWidth:1,borderRadius:3},{label:"3xx",data:(e.hits_per_hour??[]).map(l=>l["3xx"]),backgroundColor:"rgba(43,142,255,0.75)",borderColor:"rgba(43,142,255,1)",borderWidth:1,borderRadius:3},{label:"4xx",data:(e.hits_per_hour??[]).map(l=>l["4xx"]),backgroundColor:"rgba(255,171,0,0.75)",borderColor:"rgba(255,171,0,1)",borderWidth:1,borderRadius:3},{label:"5xx",data:(e.hits_per_hour??[]).map(l=>l["5xx"]),backgroundColor:"rgba(235,59,90,0.75)",borderColor:"rgba(235,59,90,1)",borderWidth:1,borderRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(l,r)=>{if(!r||!r.length)return;let c=r[0].datasetIndex,b=U.data.datasets[c].label;if(b!=="4xx"&&b!=="5xx")return;let p=r[0].index,u=document.getElementById("stats-panel");if(!u||!u._hitsPerHour)return;let m=u._hitsPerHour[p]?.hour;m&&wt(`/sites/${t}/stats/drilldown`,m,b)},onHover:(l,r)=>{if(!r||!r.length){l.native.target.style.cursor="default";return}let c=U.data.datasets[r[0].datasetIndex].label;l.native.target.style.cursor=c==="4xx"||c==="5xx"?"pointer":"default"},plugins:{legend:{display:!0,labels:{color:"#6b8cae",font:{size:11}},onHover:l=>{l.native.target.style.cursor="pointer"},onLeave:l=>{l.native.target.style.cursor="default"}},tooltip:{mode:"index",backgroundColor:"#0c1530",borderColor:"#1a2a4a",borderWidth:1,titleColor:"#dde8f5",bodyColor:"#6b8cae"}},scales:{x:{stacked:!0,ticks:{color:"#6b8cae",font:{size:10},maxRotation:45},grid:{color:"rgba(26,42,74,0.6)"}},y:{stacked:!0,ticks:{color:"#6b8cae",font:{size:10}},grid:{color:"rgba(26,42,74,0.6)"},beginAtZero:!0}}}});let o=document.getElementById("stats-panel");o&&(o._hitsPerHour=e.hits_per_hour??[])}let a=document.getElementById("stats-ip-rows");a&&(a.innerHTML=(e.top_ips??[]).length===0?'<tr><td colspan="2" class="kp-muted uk-text-small">No data</td></tr>':(e.top_ips??[]).map(n=>`
                <tr>
                    <td class="kp-stats-table-cell-mono">${f(n.name)}</td>
                    <td class="kp-stats-table-cell-count">${n.count.toLocaleString()}</td>
                </tr>`).join(""));let i=document.getElementById("stats-ua-rows");i&&(i.innerHTML=(e.top_uas??[]).length===0?'<tr><td colspan="2" class="kp-muted uk-text-small">No data</td></tr>':(e.top_uas??[]).map(n=>`
                <tr>
                    <td class="kp-stats-ua-cell" title="${f(n.name)}">${f(n.name)}</td>
                    <td class="kp-stats-table-cell-count">${n.count.toLocaleString()}</td>
                </tr>`).join(""))}async function jt(t){let e=document.getElementById("stats-disk-wrap");if(e){e.innerHTML='<div uk-spinner="ratio:0.8" style="color:var(--kp-blue)"></div>';try{let s=await k.get(`/sites/${t}/stats/disk`);e.innerHTML=`
            <div class="uk-grid-small uk-child-width-1-2" uk-grid>
                <div>
                    <div class="kp-stat-card" style="padding:16px">
                        <div class="kp-stat-value kp-stats-disk-val">${L(s.html_bytes??0)}</div>
                        <div class="kp-stat-label">Site Files</div>
                    </div>
                </div>
                <div>
                    <div class="kp-stat-card" style="padding:16px">
                        <div class="kp-stat-value kp-stats-disk-val">${L(s.db_bytes??0)}</div>
                        <div class="kp-stat-label">Database</div>
                    </div>
                </div>
            </div>`}catch(s){e.innerHTML=`<p class="kp-muted uk-text-small">Failed to load disk usage: ${s.message}</p>`}}}function Ke(t){return!t||t.length===0?'<p class="kp-muted uk-text-small uk-margin-remove">No container data.</p>':`
        <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
            <thead><tr>
                <th style="color:var(--kp-text-dim);font-size:0.75rem">Container</th>
                <th style="color:var(--kp-text-dim);font-size:0.75rem">CPU</th>
                <th style="color:var(--kp-text-dim);font-size:0.75rem">Memory</th>
                <th style="color:var(--kp-text-dim);font-size:0.75rem">Mem %</th>
            </tr></thead>
            <tbody>${t.map(s=>{let a=s.mem_limit>0?(s.mem_used/s.mem_limit*100).toFixed(1):0,i=a>80,n=s.name.split("-").pop();return`
            <tr>
                <td class="kp-stats-pod-role kp-stats-pod-role-btn"
                    data-container="${s.name}"
                    title="Restart ${n}"
                    style="cursor:pointer">${n}</td>
                <td class="kp-stats-pod-cpu${s.cpu_percent>80?" is-hot":""}">
                    ${ze(s.cpu_percent)}
                </td>
                <td class="kp-stats-pod-mem">
                    ${L(s.mem_used)}
                    <span class="kp-stats-pod-mem-limit"> / ${L(s.mem_limit)}</span>
                </td>
                <td>
                    <div class="kp-stats-mem-wrap">
                        <div class="kp-stats-mem-bar-track">
                            <div class="kp-stats-mem-bar-fill${i?" is-hot":""}"
                                style="width:${a}%"></div>
                        </div>
                        <span class="kp-stats-mem-pct">${a}%</span>
                    </div>
                </td>
            </tr>`}).join("")}</tbody>
        </table>`}function Je(t,e,s,a,i){if(!t||t.length===0)return'<p class="kp-muted uk-text-small">No matching requests found.</p>';let n=[...t].sort((p,u)=>{let m,h;switch(s){case"time":m=p.time,h=u.time;break;case"method":m=p.method,h=u.method;break;case"site":m=p.site_name,h=u.site_name;break;case"ip":m=p.client_ip,h=u.client_ip;break;default:m=p.status,h=u.status;break}return m<h?a?1:-1:m>h?a?-1:1:0}),o=50,l=Math.ceil(n.length/o),c=n.slice(e*o,(e+1)*o).map(p=>{let u=f(p.ua),m=p.status>=500?"kp-badge-danger":"kp-badge-warning";return`
            <tr>
                <td class="kp-stats-table-cell-mono" style="white-space:nowrap">${p.time.slice(11,19)}</td>
                ${i?`<td class="kp-stats-table-cell-mono" style="font-size:0.8rem">${f(p.site_name)}</td>`:""}
                <td class="kp-stats-table-cell-mono">${f(p.method)}</td>
                <td style="word-break:break-all;font-size:0.8rem">${f(p.path)}</td>
                <td><span class="kp-badge ${m}">${p.status}</span>${p.reason?` <span class="kp-badge kp-badge-danger" style="font-size:0.65rem" uk-tooltip="Blocked by security rule">${f(p.reason)}</span>`:""}</td>
                <td class="kp-stats-table-cell-mono">${f(p.client_ip)}</td>
                <td class="kp-dd-ua-cell">${u}</td>
            </tr>`}).join(""),b=l>1?`
        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-top">
            <span class="kp-muted uk-text-small">Page ${e+1} of ${l} \u2014 ${t.length} total</span>
            <div>
                ${e>0?`<button class="uk-button kp-btn-ghost kp-btn-sm" data-dd-page="${e-1}">\u2039 Prev</button>`:""}
                ${e<l-1?`<button class="uk-button kp-btn-ghost kp-btn-sm" data-dd-page="${e+1}">Next \u203A</button>`:""}
            </div>
        </div>`:"";return`
        <div class="kp-table-wrap uk-overflow-auto">
            <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
                <thead><tr>
                    <th style="color:var(--kp-text-dim);font-size:0.75rem;cursor:pointer;user-select:none" data-dd-col="time">Time ${s==="time"?a?"\u2193":"\u2191":"\u2195"}</th>
                    ${i?`<th style="color:var(--kp-text-dim);font-size:0.75rem;cursor:pointer;user-select:none" data-dd-col="site">Site ${s==="site"?a?"\u2193":"\u2191":"\u2195"}</th>`:""}
                    <th style="color:var(--kp-text-dim);font-size:0.75rem;cursor:pointer;user-select:none" data-dd-col="method">Method ${s==="method"?a?"\u2193":"\u2191":"\u2195"}</th>
                    <th style="color:var(--kp-text-dim);font-size:0.75rem">Path</th>
                    <th style="color:var(--kp-text-dim);font-size:0.75rem;cursor:pointer;user-select:none" data-dd-col="status">Status ${s==="status"?a?"\u2193":"\u2191":"\u2195"}</th>
                    <th style="color:var(--kp-text-dim);font-size:0.75rem;cursor:pointer;user-select:none" data-dd-col="ip">IP ${s==="ip"?a?"\u2193":"\u2191":"\u2195"}</th>
                    <th style="color:var(--kp-text-dim);font-size:0.75rem">UA</th>
                </tr></thead>
                <tbody>${c}</tbody>
            </table>
        </div>
        ${b}`}async function wt(t,e,s,a=!1){let i=document.getElementById("stats-drilldown-modal"),n=document.getElementById("stats-drilldown-title"),o=document.getElementById("stats-drilldown-body");if(!i||!o)return;n.textContent=`${s} Requests \u2014 ${new Date(e).toLocaleString([],{hour:"2-digit",minute:"2-digit",month:"short",day:"numeric"})}`,o.innerHTML='<div uk-spinner="ratio:0.8" style="color:var(--kp-blue)"></div>',UIkit.modal(i).show();let l=[],r=0,c="time",b=!0;function p(){o.innerHTML=Je(l,r,c,b,a),o.querySelectorAll("th[data-dd-col]").forEach(u=>{u.addEventListener("click",()=>{let m=u.dataset.ddCol;c===m?b=!b:(c=m,b=!0),r=0,p()})}),o.querySelectorAll("[data-dd-page]").forEach(u=>{u.addEventListener("click",()=>{r=parseInt(u.dataset.ddPage,10),p()})})}try{l=await k.get(`${t}?hour=${encodeURIComponent(e)}&status=${s}`)}catch(u){o.innerHTML=`<p class="kp-muted uk-text-small">Failed to load: ${f(u.message)}</p>`;return}p()}function xt(t,e,s){let a=s===6,i=null;function n(){if(a)return;let r=t.querySelector("#stats-pod-indicator"),c=t.querySelector("#stats-pod-table-wrap");if(!c)return;let b=location.protocol==="https:"?"wss":"ws";i=new WebSocket(`${b}://${location.host}/api/sites/${e}/stats/pod`),i.onopen=()=>{r&&(r.className="kp-status kp-status-running",r.textContent="Live")},i.onmessage=p=>{try{let u=JSON.parse(p.data);c.innerHTML=Ke(u.containers??[]),c.querySelectorAll(".kp-stats-pod-role-btn").forEach(m=>{m.addEventListener("click",async()=>{let h=m.style.color;m.style.color="var(--kp-warning)";let v=m.dataset.container.split("-").pop();try{await k.post(`/sites/${e}/containers/${v}/restart`),d.success(`${v} restarted`)}catch(g){m.style.color=h,d.error(g.message)}})})}catch{}},i.onerror=()=>{r&&(r.className="kp-status kp-status-error",r.textContent="Error")},i.onclose=()=>{r&&r.textContent==="Live"&&(r.className="kp-status kp-status-stopped",r.textContent="Disconnected")}}function o(){i&&i.readyState===WebSocket.OPEN&&i.close(),i=null}t.querySelector("#stats-disk-refresh")?.addEventListener("click",()=>{jt(e)}),n();let l=new MutationObserver(()=>{document.getElementById("stats-panel")||(o(),l.disconnect())});l.observe(document.getElementById("main")??document.body,{childList:!0,subtree:!1})}async function St(t,e){let s=e===6;await Ve(t),s||await jt(t)}async function Ot(t){let e=await k.get("/sites")??[];t.innerHTML=`
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

        ${e.length===0?st("world","No sites yet \u2014 create one to get started"):`<div class="kp-table-wrap">
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
                            ${e.map(s=>Ge(s,e)).join("")}
                        </tbody>
                    </table>
                </div>
            </div>`}`,document.getElementById("sites-new-btn").addEventListener("click",()=>lt()),Xe()}function Ge(t,e=[]){let s=t.Domains?.[0]??null,a=t.SiteType===6,i=t.ParentID>0?e.find(n=>n.ID===t.ParentID)??null:null;return`
        <tr data-site-id="${t.ID}" data-status="${a?"":t.SiteStatus}" data-type="${t.SiteType}">
            <!-- row checkbox -->
            <td class="uk-table-shrink">
                <input class="uk-checkbox kp-site-row-check" type="checkbox"
                       data-site-id="${t.ID}" data-site-type="${t.SiteType}">
            </td>
            <!-- status badge -->
            <td class="uk-table-shrink kp-site-row-status">${a?"":M(t.SiteStatus)}</td>

            <!-- name + optional parent clone link -->
            <td>
                <a class="kp-site-row-name" href="javascript:void(0)"
                   data-action="manage" data-id="${t.ID}">${t.Name}</a>
                ${i?`<div class="kp-muted uk-text-small kp-mono">
                           <span uk-icon="icon: git-fork; ratio: 0.7"></span>
                           <a href="javascript:void(0)" data-action="manage" data-id="${i.ID}"
                              style="color:var(--kp-cyan)">${i.Name}</a>
                       </div>`:""}
            </td>

            <!-- type / runtime version -->
            <td class="uk-visible@s kp-muted kp-mono uk-text-small">
                ${J(t.SiteType)}${D(t)?" / "+D(t):""}
            </td>

            <!-- internal port -->
            <td class="uk-visible@m kp-muted kp-mono uk-text-small">:${t.Port}</td>

            <!-- host-mapped owner UID of html/ -->
            <td class="uk-visible@m kp-muted kp-mono uk-text-small">${t.HostUID??(a?"":"\u2014")}</td>

            <!-- primary domain -->
            <td class="uk-visible@m uk-text-small">
                ${s?`<a href="http://${s}" target="_blank"
                          style="color:var(--kp-cyan)">${s}</a>`:'<span class="kp-muted">\u2014</span>'}
            </td>

            <!-- action buttons -->
            <td class="uk-table-shrink">
                <div class="kp-site-row-actions">
                    <button class="uk-button kp-btn-secondary kp-btn-sm"
                            data-action="manage" data-id="${t.ID}"
                            uk-tooltip="Manage">
                        <span uk-icon="icon: cog;"></span>
                    </button>
                    ${a?"":`
                    ${t.SiteStatus===1?`<button class="uk-button kp-btn-secondary kp-btn-sm"
                                   data-action="stop" data-id="${t.ID}"
                                   uk-tooltip="Stop">
                               <span uk-icon="icon: ban;"></span>
                           </button>`:`<button class="uk-button kp-btn-secondary kp-btn-sm"
                                   data-action="start" data-id="${t.ID}"
                                   uk-tooltip="Start">
                               <span uk-icon="icon: play;"></span>
                           </button>`}
                    <button class="uk-button kp-btn-secondary kp-btn-sm"
                            data-action="restart" data-id="${t.ID}"
                            uk-tooltip="Restart">
                        <span uk-icon="icon: refresh;"></span>
                    </button>
                    <button class="uk-button kp-btn-secondary kp-btn-sm"
                            data-action="flush" data-id="${t.ID}"
                            uk-tooltip="Flush Caches">
                        <span uk-icon="icon: bolt;"></span>
                    </button>
                    <button class="uk-button kp-btn-ghost kp-btn-sm kp-btn-recreate"
                            data-action="recreate" data-id="${t.ID}"
                            uk-tooltip="Recreate Pod">
                        <span uk-icon="icon: history;"></span>
                    </button>
                    `}
                    <button class="uk-button kp-btn-ghost kp-btn-sm kp-btn-recreate"
                            data-action="delete" data-id="${t.ID}"
                            uk-tooltip="Delete">
                        <span uk-icon="icon: trash;"></span>
                    </button>
                </div>
            </td>
        </tr>`}function zt(t,e=[]){let s=t.Domains?.[0]??null,a=t.SiteType===6,i=t.ParentID>0?e.find(n=>n.ID===t.ParentID)??null:null;return`
        <div class="kp-site-card uk-margin" data-site-id="${t.ID}" data-status="${a?"":t.SiteStatus}" data-type="${t.SiteType}">
            <div class="kp-site-card-header">
                <div>
                    <h2 class="kp-view-title" data-action="manage" data-id="${t.ID}">${t.Name}</h2>
                    <div class="kp-site-meta">
                        <span class="kp-site-meta-item"><span uk-icon="icon: server; ratio: 0.75"></span> :${t.Port}</span>
                        <span class="kp-site-meta-item"><span uk-icon="icon: code; ratio: 0.75"></span> ${J(t.SiteType)}${D(t)?" / "+D(t):""}</span>
                        ${s?`<span class="kp-site-meta-item" style="width:100%"><a href="http://${s}" target="_blank" style="color:var(--kp-cyan)">${s}</a></span>`:""}
                    </div>
                    ${i?`<div class="kp-site-meta kp-muted uk-text-small uk-margin-small-top"><span uk-icon="icon: git-fork; ratio: 0.75"></span> <a href="javascript:void(0)" data-action="manage" data-id="${i.ID}" style="color:var(--kp-cyan)">${i.Name}</a></div>`:""}
                </div>
                ${a?"":M(t.SiteStatus)}
            </div>
            <div class="kp-site-actions">
                <button class="uk-button kp-btn-secondary kp-btn-sm" data-action="manage" data-id="${t.ID}" uk-tooltip="Manage This Site"><span uk-icon="icon: cog;"></span></button>
                ${a?"":`
                ${t.SiteStatus===1?`<button class="uk-button kp-btn-secondary kp-btn-sm" data-action="stop" data-id="${t.ID}" uk-tooltip="Stop the Site"><span uk-icon="icon: ban;"></span></button>`:`<button class="uk-button kp-btn-secondary kp-btn-sm" data-action="start" data-id="${t.ID}" uk-tooltip="Start the Site"><span uk-icon="icon: play;"></span></button>`}
                <button class="uk-button kp-btn-secondary kp-btn-sm" data-action="restart" data-id="${t.ID}" uk-tooltip="Restart the Site"><span uk-icon="icon: refresh;"></span></button>
                <button class="uk-button kp-btn-secondary kp-btn-sm" data-action="flush" data-id="${t.ID}" title="Flush cache" uk-tooltip="Flush the Caches"><span uk-icon="icon: bolt;"></span></button>
                <div class="kp-site-actions-break"></div>
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="recreate" data-id="${t.ID}" title="Recreate pod" uk-tooltip="Recreate the Pod"><span uk-icon="icon: history;"></span></button>
                `}
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="delete" data-id="${t.ID}" title="Delete" uk-tooltip="Delete the Site"><span uk-icon="icon: trash;"></span></button>
            </div>
        </div>`}function Xe(){let t=document.getElementById("sites-bulk-bar"),e=document.getElementById("sites-bulk-count"),s=document.getElementById("sites-select-all"),a=document.getElementById("sites-search"),i=document.querySelector(".kp-table-wrap tbody");if(!t||!s)return;let n=null,o=!0,l=()=>[...document.querySelectorAll(".kp-site-row-check:checked")],r=()=>{let h=l().length;e.textContent=`${h} selected`,["bulk-start","bulk-stop","bulk-restart","bulk-flush","bulk-recreate"].forEach(w=>{let $=document.getElementById(w);$&&($.disabled=h===0)});let v=document.getElementById("kp-bulk-mobile-btn");v&&(v.disabled=h===0);let g=document.querySelectorAll(".kp-site-row-check");s.indeterminate=h>0&&h<g.length,s.checked=g.length>0&&h===g.length},c=()=>{let m=a.value.trim().toLowerCase();document.querySelectorAll(".kp-table-wrap tbody tr").forEach(h=>{let v=h.querySelector(".kp-site-row-name")?.textContent.toLowerCase()??"",g=h.querySelector("td:nth-child(6)")?.textContent.toLowerCase()??"";h.style.display=!m||v.includes(m)||g.includes(m)?"":"none"})},b=m=>{n===m?o=!o:(n=m,o=!0),document.querySelectorAll(".kp-sort-icon").forEach(v=>{v.textContent=v.dataset.col===m?o?" \u2191":" \u2193":" \u2195"});let h=[...i.querySelectorAll("tr")];h.sort((v,g)=>{let w="",$="";return m==="name"?(w=v.querySelector(".kp-site-row-name")?.textContent??"",$=g.querySelector(".kp-site-row-name")?.textContent??""):m==="status"?(w=v.dataset.status??"",$=g.dataset.status??""):m==="type"?(w=v.dataset.type??"",$=g.dataset.type??""):m==="domain"&&(w=v.querySelector("td:nth-child(6)")?.textContent.trim()??"",$=g.querySelector("td:nth-child(6)")?.textContent.trim()??""),o?w.localeCompare($):$.localeCompare(w)}),h.forEach(v=>i.appendChild(v))};s.addEventListener("change",()=>{document.querySelectorAll(".kp-site-row-check").forEach(m=>{m.checked=s.checked}),r()}),i?.addEventListener("change",m=>{m.target.classList.contains("kp-site-row-check")&&r()}),a?.addEventListener("input",c),document.querySelectorAll(".kp-sortable").forEach(m=>{m.addEventListener("click",()=>b(m.dataset.col))}),["bulk-start","bulk-stop","bulk-restart","bulk-flush","bulk-recreate"].forEach(m=>{let h=m.replace("bulk-","");document.getElementById(m)?.addEventListener("click",()=>{let v=l().filter(g=>g.dataset.siteType!=="6").map(g=>g.dataset.siteId);document.dispatchEvent(new CustomEvent("kp:bulk-action",{detail:{action:h,ids:v}}))})});let p=document.getElementById("kp-bulk-mobile-pill"),u=document.getElementById("kp-bulk-mobile-dropdown");document.getElementById("kp-bulk-mobile-btn")?.addEventListener("click",m=>{m.stopPropagation(),u.hidden=!u.hidden}),document.addEventListener("click",m=>{u&&!p?.contains(m.target)&&(u.hidden=!0)},{capture:!0}),["start","stop","restart","flush","recreate"].forEach(m=>{document.getElementById(`bulk-mobile-${m}`)?.addEventListener("click",h=>{h.preventDefault(),u.hidden=!0;let v=l().filter(g=>g.dataset.siteType!=="6").map(g=>g.dataset.siteId);document.dispatchEvent(new CustomEvent("kp:bulk-action",{detail:{action:m,ids:v}}))})}),document.querySelectorAll(".kp-sort-icon").forEach(m=>{m.textContent=" \u2195"}),r()}var N=null,W=null;function Qe(){W&&(W.close(),W=null);let t=(a,i)=>i>0?`${(a/i*100).toFixed(1)}%`:"\u2014",e=location.protocol==="https:"?"wss":"ws",s=new WebSocket(`${e}://${location.host}/api/stats/host`);W=s,s.onmessage=a=>{let i=document.getElementById("dash-host-cpu");if(!i){s.close();return}let n;try{n=JSON.parse(a.data)}catch{return}i.textContent=`${(n.cpu_percent??0).toFixed(1)}%`,document.getElementById("dash-host-mem").textContent=t(n.mem_used,n.mem_total),document.getElementById("dash-host-mem-sub").textContent=`${L(n.mem_used??0)} / ${L(n.mem_total??0)}`,document.getElementById("dash-host-disk").textContent=t(n.disk_used,n.disk_total),document.getElementById("dash-host-disk-sub").textContent=`${L(n.disk_used??0)} / ${L(n.disk_total??0)}`,document.getElementById("dash-host-procs").textContent=(n.procs_running??0).toLocaleString(),document.getElementById("dash-host-procs-sub").textContent=`of ${(n.procs_total??0).toLocaleString()} threads`},s.onclose=()=>{W===s&&(W=null)}}async function Vt(t){let[e,s]=await Promise.all([k.get("/sites").catch(()=>[]),k.get("/stats/traffic").catch(()=>null)]),a=e.filter(l=>l.SiteType!==6&&l.SiteStatus===1).length,i=e.filter(l=>l.SiteType===6).length,n=e.filter(l=>l.SiteType!==6&&l.SiteStatus===4).length,o=window.KP?.user?.role===99;if(t.innerHTML=`

        <!-- global counts -->
        <div class="kp-view-header">
            <h1 class="kp-view-title kp-cursor" style="font-size:2rem;">Dashboard</h1>
        </div>
        <div class="uk-grid-small uk-child-width-1-2 uk-child-width-1-4@m uk-margin-medium-bottom" uk-grid>
            <div>
                <div class="kp-stat-card">
                    <div class="uk-flex uk-flex-between">
                        <div>
                            <div class="kp-stat-value">${e.length}</div>
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
                            <div class="kp-stat-value" style="color:var(--kp-success)">${a}</div>
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
                        ${(s?.status_codes?.["2xx"]??0).toLocaleString()}
                    </div>
                    <div class="kp-stat-label" style="color:var(--kp-success)">2xx Success</div>
                </div></div>
                <div><div class="kp-stat-card" style="padding:16px">
                    <div class="kp-stat-value" style="font-size:1.6rem;color:var(--kp-cyan)">
                        ${(s?.status_codes?.["3xx"]??0).toLocaleString()}
                    </div>
                    <div class="kp-stat-label" style="color:var(--kp-cyan)">3xx Redirect</div>
                </div></div>
                <div><div class="kp-stat-card" style="padding:16px">
                    <div class="kp-stat-value" style="font-size:1.6rem;color:var(--kp-warning)">
                        ${(s?.status_codes?.["4xx"]??0).toLocaleString()}
                    </div>
                    <div class="kp-stat-label" style="color:var(--kp-warning)">4xx Client Err</div>
                </div></div>
                <div><div class="kp-stat-card" style="padding:16px">
                    <div class="kp-stat-value" style="font-size:1.6rem;color:var(--kp-danger)">
                        ${(s?.status_codes?.["5xx"]??0).toLocaleString()}
                    </div>
                    <div class="kp-stat-label" style="color:var(--kp-danger)">5xx Server Err</div>
                </div></div>
            </div>
            <div class="uk-margin-small-bottom" style="color:var(--kp-text-dim);font-size:0.85rem">
                Total Bandwidth:
                <span style="color:var(--kp-cyan);font-family:'JetBrains Mono',monospace">
                    ${L(s?.total_bandwidth??0)}
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
                    ${e.length===0?emptyState("world","No sites yet"):e.slice(-3).reverse().map(l=>zt(l,e)).join("")}
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
                            ${(s?.top_sites??[]).length===0?'<tr><td colspan="2" class="kp-muted uk-text-small">No traffic data</td></tr>':(s?.top_sites??[]).map(l=>`
                                    <tr>
                                        <td class="kp-mono" style="font-size:0.8rem">${f(l.name)}</td>
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
        `,o&&Qe(),s?.hits_per_hour?.length){await ft();let l=document.getElementById("dash-traffic-chart");l&&window.Chart&&(N&&(N.destroy(),N=null),N=new window.Chart(l,{type:"bar",data:{labels:s.hits_per_hour.map(r=>new Date(r.hour).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})),datasets:[{label:"2xx",data:s.hits_per_hour.map(r=>r["2xx"]),backgroundColor:"rgba(39,174,96,0.75)",borderColor:"rgba(39,174,96,1)",borderWidth:1,borderRadius:3},{label:"3xx",data:s.hits_per_hour.map(r=>r["3xx"]),backgroundColor:"rgba(43,142,255,0.75)",borderColor:"rgba(43,142,255,1)",borderWidth:1,borderRadius:3},{label:"4xx",data:s.hits_per_hour.map(r=>r["4xx"]),backgroundColor:"rgba(255,171,0,0.75)",borderColor:"rgba(255,171,0,1)",borderWidth:1,borderRadius:3},{label:"5xx",data:s.hits_per_hour.map(r=>r["5xx"]),backgroundColor:"rgba(235,59,90,0.75)",borderColor:"rgba(235,59,90,1)",borderWidth:1,borderRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(r,c)=>{if(!c||!c.length)return;let b=c[0].datasetIndex,p=N.data.datasets[b].label;if(p!=="4xx"&&p!=="5xx")return;let u=s.hits_per_hour[c[0].index]?.hour;u&&wt("/stats/drilldown",u,p,!0)},onHover:(r,c)=>{if(!c||!c.length){r.native.target.style.cursor="default";return}let b=N.data.datasets[c[0].datasetIndex].label;r.native.target.style.cursor=b==="4xx"||b==="5xx"?"pointer":"default"},plugins:{legend:{display:!0,labels:{color:"#6b8cae",font:{size:11}},onHover:r=>{r.native.target.style.cursor="pointer"},onLeave:r=>{r.native.target.style.cursor="default"}},tooltip:{mode:"index",backgroundColor:"#0c1530",borderColor:"#1a2a4a",borderWidth:1,titleColor:"#dde8f5",bodyColor:"#6b8cae"}},scales:{x:{stacked:!0,ticks:{color:"#6b8cae",font:{size:10},maxRotation:45},grid:{color:"rgba(26,42,74,0.6)"}},y:{stacked:!0,ticks:{color:"#6b8cae",font:{size:10}},grid:{color:"rgba(26,42,74,0.6)"},beginAtZero:!0}}}}))}document.getElementById("dash-new-site")?.addEventListener("click",()=>lt())}function G(t=null){let e=t?`/sites/${t}/security/ip`:"/security/ip",s=t?`/sites/${t}/security/ua`:"/security/ua",a=t?`/sites/${t}/security/country`:"/security/country",i=t?`/sites/${t}/security/asn`:"/security/asn";return`
        <div id="security-panel" data-ip-base="${e}" data-ua-base="${s}" data-geo-base="${a}" data-asn-base="${i}" ${t?`data-site-id="${t}"`:""}>

            <!-- tab pills -->
            <ul class="kp-tab-pills" id="kp-sec-pills">
                <li data-tab="ip"><a href="#"><span uk-icon="icon: location; ratio: 0.85"></span> IP Rules</a></li>
                <li data-tab="ua"><a href="#"><span uk-icon="icon: laptop; ratio: 0.85"></span> User-Agent</a></li>
                <li data-tab="country"><a href="#"><span uk-icon="icon: world; ratio: 0.85"></span> Country</a></li>
                <li data-tab="asn"><a href="#"><span uk-icon="icon: server; ratio: 0.85"></span> ASN</a></li>
                ${t?"":`
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
                                <a class="uk-button kp-btn-ghost kp-btn-sm" href="/api${e}/export" download="${t?`site-${t}-ip-rules.csv`:"podnest-global-ip-rules.csv"}" uk-tooltip="Export IP rules as CSV">
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
                                <a class="uk-button kp-btn-ghost kp-btn-sm" href="/api${s}/export" download="${t?`site-${t}-ua-rules.csv`:"podnest-global-ua-rules.csv"}" uk-tooltip="Export UA rules as CSV">
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

                ${t?"":`
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
        </div>`}function ct(t,e){let s=t.querySelector("#security-panel"),a=t.querySelector("#kp-sec-pills"),i=t.querySelector("#kp-sec-switcher");if(!s||!a||!i)return;let n=s.dataset.siteId,o=[...a.querySelectorAll(":scope > li")],l=(r,c)=>{if(UIkit.switcher(i).show(r),o.forEach((p,u)=>p.classList.toggle("kp-pill-active",u===r)),!c)return;let b=o[r].dataset.tab;history.replaceState(null,"",n?`#site-detail/${n}/${b}`:r===0?"#security":`#security/${b}`)};o.forEach((r,c)=>{r.querySelector(":scope > a").addEventListener("click",b=>{b.preventDefault(),l(c,!0)})}),l(Math.max(0,o.findIndex(r=>r.dataset.tab===e)),!1)}async function R(t){let e=t.querySelector("#security-panel");if(!e)return;let s=e.dataset.ipBase,a=e.dataset.uaBase;try{let i=e.dataset.geoBase,n=e.dataset.asnBase,o=[k.get(s),k.get(a),k.get(i),k.get(n)];e.dataset.siteId||o.push(k.get("/settings/trusted-proxies"),k.get("/security/bypass"));let[l,r,c,b,p,u]=await Promise.all(o);if(!t.querySelector("#sec-ip-whitelist"))return;if(t.querySelector("#sec-ip-whitelist").value=l.whitelist??"",t.querySelector("#sec-ip-blacklist").value=l.blacklist??"",t.querySelector("#sec-ua-whitelist").value=r.whitelist??"",t.querySelector("#sec-ua-blacklist").value=r.blacklist??"",t.querySelector("#sec-geo-whitelist").value=c.whitelist??"",t.querySelector("#sec-geo-blacklist").value=c.blacklist??"",t.querySelector("#sec-asn-whitelist").value=b.whitelist??"",t.querySelector("#sec-asn-blacklist").value=b.blacklist??"",p){let m=t.querySelector("#sec-tp-cidrs");m&&(m.value=p.trusted_proxies_custom??"")}if(u){let m=t.querySelector("#sec-bypass-cidrs");m&&(m.value=u.bypass??"")}}catch(i){d.error("Failed to load security rules: "+i.message)}}function dt(t){let e=t.querySelector("#security-panel");if(!e)return;let s=e.dataset.ipBase,a=e.dataset.uaBase,i=e.dataset.geoBase;t.querySelector("#sec-ip-save")?.addEventListener("click",async()=>{let n=t.querySelector("#sec-ip-save"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.put(s,{whitelist:t.querySelector("#sec-ip-whitelist").value,blacklist:t.querySelector("#sec-ip-blacklist").value}),d.success("IP rules saved")}catch(l){d.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),t.querySelector("#sec-ua-save")?.addEventListener("click",async()=>{let n=t.querySelector("#sec-ua-save"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.put(a,{whitelist:t.querySelector("#sec-ua-whitelist").value,blacklist:t.querySelector("#sec-ua-blacklist").value}),d.success("UA rules saved")}catch(l){d.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),t.querySelector("#sec-geo-save")?.addEventListener("click",async()=>{let n=t.querySelector("#sec-geo-save"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{let l={whitelist:t.querySelector("#sec-geo-whitelist").value,blacklist:t.querySelector("#sec-geo-blacklist").value},r=await k.put(i,l);r?.status==="confirm"&&(await UIkit.modal.confirm(`${r.reason}. Save anyway?`),r=await k.put(i,{...l,confirm:!0})),d.success("Country rules saved")}catch(l){l instanceof Error&&d.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),t.querySelector("#sec-asn-save")?.addEventListener("click",async()=>{let n=t.querySelector("#sec-asn-save"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{let l=t.querySelector("#security-panel").dataset.asnBase,r={whitelist:t.querySelector("#sec-asn-whitelist").value,blacklist:t.querySelector("#sec-asn-blacklist").value},c=await k.put(l,r);c?.status==="confirm"&&(await UIkit.modal.confirm(`${c.reason}. Save anyway?`),c=await k.put(l,{...r,confirm:!0})),d.success("ASN rules saved")}catch(l){l instanceof Error&&d.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),t.querySelector("#sec-asn-lookup")?.addEventListener("click",()=>Ye(t)),t.querySelector("#sec-tp-save")?.addEventListener("click",async()=>{let n=t.querySelector("#sec-tp-save"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.put("/settings/trusted-proxies",{trusted_proxies_custom:t.querySelector("#sec-tp-cidrs").value.trim()}),d.success("Trusted proxy ranges saved")}catch(l){d.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),t.querySelector("#sec-bypass-save")?.addEventListener("click",async()=>{let n=t.querySelector("#sec-bypass-save"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.put("/security/bypass",{bypass:t.querySelector("#sec-bypass-cidrs").value.trim()}),d.success("Bypass rules saved")}catch(l){d.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),t.querySelector("#sec-tp-import")?.addEventListener("change",async n=>{let o=n.target.files[0];if(!o)return;let l=new FormData;l.append("file",o);try{let r=await fetch("/api/settings/trusted-proxies/import",{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:l}),c=r.status===204?null:await r.json().catch(()=>null);if(!r.ok)throw new Error(c?.error||`HTTP ${r.status}`);await R(t),d.success("Trusted proxies imported")}catch(r){d.error(r.message)}finally{n.target.value=""}}),t.querySelector("#sec-ip-import")?.addEventListener("change",async n=>{let o=n.target.files[0];if(!o)return;let l=new FormData;l.append("file",o);try{let r=await fetch("/api"+s+"/import",{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:l}),c=r.status===204?null:await r.json().catch(()=>null);if(!r.ok)throw new Error(c?.error||`HTTP ${r.status}`);await R(t),d.success("IP rules imported")}catch(r){d.error(r.message)}finally{n.target.value=""}}),t.querySelector("#sec-ua-import")?.addEventListener("change",async n=>{let o=n.target.files[0];if(!o)return;let l=new FormData;l.append("file",o);try{let r=await fetch("/api"+a+"/import",{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:l}),c=r.status===204?null:await r.json().catch(()=>null);if(!r.ok)throw new Error(c?.error||`HTTP ${r.status}`);await R(t),d.success("UA rules imported")}catch(r){d.error(r.message)}finally{n.target.value=""}})}function Ye(t){document.getElementById("kp-asn-lookup-modal")?.remove(),document.body.insertAdjacentHTML("beforeend",`
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
        </div>`);let s=UIkit.modal("#kp-asn-lookup-modal");s.show();let a=async()=>{let i=document.getElementById("asn-lookup-q").value.trim();if(!i)return;let n=document.getElementById("asn-lookup-result");n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{let o=await k.get(`/security/asn/lookup?q=${encodeURIComponent(i)}`);if(!o?.asn){n.innerHTML='<p class="kp-muted uk-text-small">No ASN found for <span class="kp-mono"></span>.</p>',n.querySelector(".kp-mono").textContent=o?.ip||i;return}n.innerHTML=`
                <p class="uk-text-small">
                    <span class="kp-mono" id="asn-lookup-ip"></span> \u2192
                    <span class="kp-mono">AS${o.asn}</span>
                    <span id="asn-lookup-org"></span>
                    ${o.country?`<span class="kp-muted">(${o.country})</span>`:""}
                </p>
                <button class="uk-button kp-btn-ghost kp-btn-sm" id="asn-lookup-add">
                    <span uk-icon="ban"></span> Add AS${o.asn} to blacklist
                </button>`,n.querySelector("#asn-lookup-ip").textContent=o.ip,n.querySelector("#asn-lookup-org").textContent=o.org||"",n.querySelector("#asn-lookup-add").addEventListener("click",()=>{let l=t.querySelector("#sec-asn-blacklist"),r=`AS${o.asn}`;l.value.split(`
`).some(c=>c.trim().toUpperCase()===r)||(l.value=l.value.trim()?`${l.value.replace(/\s+$/,"")}
${r}`:r),s.hide(),d.success(`${r} added to blacklist \u2014 save to apply`)})}catch(o){n.innerHTML="",d.error(o.message)}};document.getElementById("asn-lookup-go").addEventListener("click",a),document.getElementById("asn-lookup-q").addEventListener("keydown",i=>{i.key==="Enter"&&a()})}async function Kt(t,e={}){if(!P()){t.innerHTML=T("Access denied");return}t.innerHTML=`
        <div class="kp-view-header">
            <h1 class="kp-view-title kp-cursor" style="font-size:2rem;">Global Security</h1>
        </div>
        <p class="kp-muted uk-text-small uk-margin-bottom">
            Global rules apply to all sites before per-site rules are evaluated.
            Blacklist always wins \u2014 except for IP rules, where a whitelist match
            in either scope allows the request outright.
        </p>
        ${G(null)}`,dt(t),ct(t,e.tab),R(t)}function Ze(t){switch(t){case"valid":return'<span class="kp-ssl-valid" uk-icon="icon: lock; ratio: 0.85" uk-tooltip="Valid SSL certificate"></span>';case"self-signed":return'<span class="kp-ssl-self-signed" uk-icon="icon: lock; ratio: 0.85" uk-tooltip="Self-signed certificate"></span>';case"expired":return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="Expired certificate"></span>';case"mismatch":return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="Certificate does not match this domain"></span>';default:return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="No SSL certificate"></span>'}}async function Jt(t){let e=document.getElementById("admin-domain-ssl");if(!(!e||!t))try{let s=await k.get(`/ssl-status?domain=${encodeURIComponent(t)}`);e.outerHTML=Ze(s.status)}catch{}}var Gt=["general","backups","notifications"];function $t(t){return`
        <div class="uk-flex" style="gap:8px">
            <a class="uk-button kp-btn-ghost kp-btn-sm" href="/api/settings/export?group=${t}" download="podnest-settings-${t}.csv" uk-tooltip="Export these settings">
                <span uk-icon="download"></span>
            </a>
            <label class="uk-button kp-btn-ghost kp-btn-sm" style="cursor:pointer" uk-tooltip="Import these settings from CSV">
                <span uk-icon="upload"></span>
                <input type="file" class="kp-settings-import" data-group="${t}" accept=".csv" style="display:none">
            </label>
        </div>`}async function Et(t,e={}){if(!P()){t.innerHTML=T("Access denied");return}let[s,a,i,n]=await Promise.all([k.get("/settings"),k.get("/settings/backup"),k.get("/settings/notifications"),k.get("/settings/resources")]);t.innerHTML=`
    <div class="kp-view-header">
        <h1 class="kp-view-title kp-cursor" style="font-size:2rem;">Settings</h1>
    </div>

    <!-- tab pills -->
    <ul class="kp-tab-pills" id="kp-settings-pills">
        <li data-pill="0"><a href="#"><span uk-icon="icon: cog; ratio: 0.85"></span> General</a></li>
        <li data-pill="1"><a href="#"><span uk-icon="icon: cloud-upload; ratio: 0.85"></span> Backups</a></li>
        <li data-pill="2"><a href="#"><span uk-icon="icon: bell; ratio: 0.85"></span> Notifications</a></li>
    </ul>

    <!-- switcher panels -->
    <ul class="uk-switcher uk-margin-large-bottom" id="kp-settings-switcher">

        <!-- general: panel configuration + host resource watcher -->
        <li>
            <div class="kp-card uk-padding">
                <div class="uk-flex uk-flex-right uk-margin-bottom">
                    ${$t("general")}
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
                                value="${s.admin_domain??""}">
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
                    ${$t("backups")}
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
                                    value="${a.backup_schedule??""}">
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
                                    value="${a.backup_retain_days??"30"}">
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
                                    value="${a.s3_endpoint??""}">
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
                                    value="${a.s3_bucket??""}">
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="s3-region">Region</label>
                                <input
                                    class="uk-input kp-input kp-mono"
                                    id="s3-region"
                                    name="s3_region"
                                    type="text"
                                    placeholder="us-east-1"
                                    value="${a.s3_region??""}">
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="s3-access-key">Access Key ID</label>
                                <input
                                    class="uk-input kp-input kp-mono"
                                    id="s3-access-key"
                                    name="s3_access_key"
                                    type="text"
                                    placeholder="AKIAIOSFODNN7EXAMPLE"
                                    value="${a.s3_access_key??""}">
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="s3-secret-key">Secret Access Key</label>
                                <input
                                    class="uk-input kp-input kp-mono"
                                    id="s3-secret-key"
                                    name="s3_secret_key"
                                    type="password"
                                    placeholder="${a.s3_secret_key?"saved \u2014 enter new value to change":"enter secret key"}"
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
                    ${$t("notifications")}
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
    </ul>
    `;let o=t.querySelector("#kp-settings-pills"),l=t.querySelector("#kp-settings-switcher"),r=c=>{UIkit.switcher(l).show(c),o.querySelectorAll(":scope > li").forEach((b,p)=>b.classList.toggle("kp-pill-active",p===c)),history.replaceState(null,"",c===0?"#settings":`#settings/${Gt[c]}`)};o.querySelectorAll(":scope > li > a").forEach(c=>{c.addEventListener("click",b=>{b.preventDefault(),r(parseInt(c.closest("li").dataset.pill,10))})}),r(Math.max(0,Gt.indexOf(e.tab))),s.admin_domain&&Jt(s.admin_domain),t.querySelectorAll(".kp-settings-import").forEach(c=>{c.addEventListener("change",async b=>{let p=b.target.files[0];if(!p)return;let u=b.target.dataset.group,m=new FormData;m.append("file",p);try{let h=await fetch(`/api/settings/import?group=${encodeURIComponent(u)}`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:m}),v=h.status===204?null:await h.json().catch(()=>null);if(!h.ok)throw new Error(v?.error||`HTTP ${h.status}`);d.success("Settings imported"),await Et(t,{tab:u})}catch(h){d.error(h.message)}finally{b.target.value=""}})}),document.getElementById("settings-form").addEventListener("submit",async c=>{c.preventDefault();let b=c.target.querySelector('[type="submit"]'),p=b.innerHTML;b.disabled=!0,b.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let u=new FormData(c.target),m={admin_domain:u.get("admin_domain").trim()},h={resource_ram_reserve_gb:u.get("resource_ram_reserve_gb").trim(),resource_poll_interval:u.get("resource_poll_interval").trim(),resource_throttle_pct:u.get("resource_throttle_pct").trim(),resource_webhook_url:u.get("resource_webhook_url").trim(),shutdown_job_timeout:u.get("shutdown_job_timeout").trim()};try{await k.put("/settings",m),await k.put("/settings/resources",h),d.success("Settings saved"),Jt(m.admin_domain)}catch(v){d.error(v.message)}finally{b.disabled=!1,b.innerHTML=p}}),document.getElementById("backup-form").addEventListener("submit",async c=>{c.preventDefault();let b=c.target.querySelector('[type="submit"]'),p=b.innerHTML;b.disabled=!0,b.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let u=new FormData(c.target),m={backup_schedule:u.get("backup_schedule").trim(),backup_retain_days:u.get("backup_retain_days").trim(),s3_endpoint:u.get("s3_endpoint").trim(),s3_bucket:u.get("s3_bucket").trim(),s3_region:u.get("s3_region").trim(),s3_access_key:u.get("s3_access_key").trim()},h=u.get("s3_secret_key").trim();h&&(m.s3_secret_key=h);try{await k.put("/settings/backup",m),d.success("Backup settings saved")}catch(v){d.error(v.message)}finally{b.disabled=!1,b.innerHTML=p}}),document.getElementById("notifications-form").addEventListener("submit",async c=>{c.preventDefault();let b=c.target.querySelector('[type="submit"]'),p=b.innerHTML;b.disabled=!0,b.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let u=new FormData(c.target),m={smtp_host:u.get("smtp_host").trim(),smtp_port:u.get("smtp_port").trim(),smtp_username:u.get("smtp_username").trim(),smtp_from:u.get("smtp_from").trim(),smtp_tls:u.get("smtp_tls")?"true":"false",aws_access_key:u.get("aws_access_key").trim(),aws_region:u.get("aws_region").trim(),aws_sns_sender_id:u.get("aws_sns_sender_id").trim()},h=u.get("smtp_password").trim();h&&(m.smtp_password=h);let v=u.get("aws_secret_key").trim();v&&(m.aws_secret_key=v);try{await k.put("/settings/notifications",m),d.success("Notification settings saved")}catch(g){d.error(g.message)}finally{b.disabled=!1,b.innerHTML=p}})}async function Xt(t){let e=`
        <div id="kp-edit-site-modal" uk-modal>
            <div class="uk-modal-dialog kp-modal uk-modal-body uk-width-large">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <h3 class="kp-view-title">Edit Site \u2014 ${t.Name}</h3>
                <form id="edit-site-form" class="uk-form-stacked uk-margin-top">
                    <div class="uk-grid-small" uk-grid>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Site Name</label>
                            <input class="uk-input kp-input" name="name" type="text" value="${t.Name}" readonly disabled>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Site Type</label>
                            <select class="uk-select kp-select" name="site_type" id="es-site-type">
                                <option value="1" ${t.SiteType===1?"selected":""}>PHP</option>
                                <option value="3" ${t.SiteType===3?"selected":""}>Static HTML</option>
                                <option value="4" ${t.SiteType===4?"selected":""}>Node.js</option>
                                <option value="5" ${t.SiteType===5?"selected":""}>.NET</option>
                                <option value="7" ${t.SiteType===7?"selected":""}>Python</option>
                                <option value="6" ${t.SiteType===6?"selected":""}>Reverse Proxy</option>
                            </select>
                        </div>
                        <div class="uk-width-1-2@s" id="es-php-version-wrap">
                            <label class="kp-label">PHP Version</label>
                            <select class="uk-select kp-select" name="php_version">
                                <option value="3" ${t.PHPVersion===3?"selected":""}>PHP 8.2</option>
                                <option value="4" ${t.PHPVersion===4?"selected":""}>PHP 8.3</option>
                                <option value="5" ${t.PHPVersion===5?"selected":""}>PHP 8.4</option>
                                <option value="6" ${t.PHPVersion===6?"selected":""}>PHP 8.5</option>
                            </select>
                        </div>
                        <div class="uk-width-1-2@s uk-hidden" id="es-node-version-wrap">
                            <label class="kp-label">Node.js Version</label>
                            <select class="uk-select kp-select" name="node_version">
                                <option value="2" ${t.RuntimeVersion===2?"selected":""}>Node 22 (LTS)</option>
                                <option value="4" ${t.RuntimeVersion===4?"selected":""}>Node 24</option>
                                <option value="5" ${t.RuntimeVersion===5?"selected":""}>Node 25</option>
                                <option value="6" ${t.RuntimeVersion===6?"selected":""}>Node 26</option>                                
                            </select>
                        </div>
                        <div class="uk-width-1-2@s uk-hidden" id="es-dotnet-version-wrap">
                            <label class="kp-label">.NET Version</label>
                            <select class="uk-select kp-select" name="dotnet_version">
                                <option value="1" ${t.RuntimeVersion===1?"selected":""}>.NET 8.0 (LTS)</option>
                                <option value="2" ${t.RuntimeVersion===2?"selected":""}>.NET 9.0</option>
                                <option value="3" ${t.RuntimeVersion===3?"selected":""}>.NET 10.0 (LTS)</option>
                            </select>
                        </div>
                        <div class="uk-width-1-2@s uk-hidden" id="es-python-version-wrap">
                            <label class="kp-label">Python Version</label>
                            <select class="uk-select kp-select" name="python_version">
                                <option value="1" ${t.SiteType===7&&t.RuntimeVersion===1?"selected":""}>Python 3.11</option>
                                <option value="2" ${t.SiteType===7&&t.RuntimeVersion===2?"selected":""}>Python 3.12</option>
                                <option value="3" ${t.SiteType===7&&t.RuntimeVersion===3?"selected":""}>Python 3.13</option>
                                <option value="4" ${t.SiteType!==7||t.RuntimeVersion===4?"selected":""}>Python 3.14</option>
                            </select>
                        </div>
                        <div class="uk-width-1-1 uk-hidden" id="es-start-command-wrap">
                            <label class="kp-label">Start Command</label>
                            <input class="uk-input kp-input" name="start_command" type="text" value="${t.StartCommand||""}">
                        </div>
                        <div class="uk-width-1-1 ${t.SiteType!==1?"uk-hidden":""}" id="es-wordpress-wrap">
                            <label><input class="uk-checkbox" type="checkbox" name="install_wordpress" checked> WordPress</label>
                        </div>
                    </div>
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button type="button" class="uk-button kp-btn-ghost uk-modal-close">Cancel</button>
                        <button type="submit" class="uk-button kp-btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>`;document.body.insertAdjacentHTML("beforeend",e);let s=UIkit.modal("#kp-edit-site-modal"),a=document.getElementById("es-site-type"),i=document.getElementById("es-php-version-wrap"),n=document.getElementById("es-node-version-wrap"),o=document.getElementById("es-dotnet-version-wrap"),l=document.getElementById("es-python-version-wrap"),r=document.getElementById("es-start-command-wrap"),c=document.getElementById("es-wordpress-wrap");s.show();let b=p=>{i.classList.toggle("uk-hidden",p!==1&&p!==2||p===6),n.classList.toggle("uk-hidden",p!==4),o.classList.toggle("uk-hidden",p!==5),l.classList.toggle("uk-hidden",p!==7),r.classList.toggle("uk-hidden",p!==4&&p!==5&&p!==7),r.querySelector("input").required=p===7,c.classList.toggle("uk-hidden",p!==1)};b(t.SiteType),a.addEventListener("change",()=>b(parseInt(a.value))),document.getElementById("edit-site-form").addEventListener("submit",async p=>{p.preventDefault();let u=p.target.querySelector('[type="submit"]'),m=u.innerHTML;u.disabled=!0,u.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let h=new FormData(p.target),v=parseInt(h.get("site_type")),g=null;v===4&&(g=parseInt(h.get("node_version"))),v===5&&(g=parseInt(h.get("dotnet_version"))),v===7&&(g=parseInt(h.get("python_version")));let w={php_version:parseInt(h.get("php_version"))||3,site_type:v,runtime_version:g,start_command:h.get("start_command")?.trim()||""},$=v===1?h.get("install_wordpress")==="on":!1;try{if(await k.put(`/sites/${t.ID}`,w),s.hide(),document.getElementById("kp-edit-site-modal")?.remove(),v!==6){S("Applying Changes","Saving changes and recreating pod...");try{await k.post(`/sites/${t.ID}/recreate`,{install_wordpress:$,prune:!0}),x(),d.success("Site updated and pod recreated")}catch(I){x(),d.error("Site saved but pod recreate failed: "+I.message)}}else d.success("Site updated");y.go("site-detail",{id:String(t.ID)})}catch(I){d.error(I.message),u.disabled=!1,u.innerHTML=m}}),document.getElementById("kp-edit-site-modal").addEventListener("hidden",()=>document.getElementById("kp-edit-site-modal")?.remove())}function Yt(t){return`
        <div id="backups-panel" data-site-id="${t}">

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

        </div>`}function ta(t){if(!t||t.length===0)return'<p class="kp-muted uk-text-small uk-margin-remove">No snapshots yet.</p>';let e=a=>a===2?'<span class="kp-mono" style="color:var(--kp-cyan)">S3</span>':'<span class="kp-mono" style="color:var(--kp-blue)">Local</span>';return`
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
            <tbody>${t.map(a=>`
        <tr>
            <td class="kp-mono" style="font-size:0.8rem">${f(a.SnapshotID)}</td>
            <td>${a.Label?f(a.Label):"\u2014"}</td>
            <td>${e(a.BackupType)}</td>
            <td>${L(a.SizeBytes)}</td>
            <td>${new Date(a.Created).toLocaleString()}</td>
            <td>
                <div class="uk-flex" style="gap:6px">
                    <button class="uk-button kp-btn-ghost kp-btn-sm backup-download-btn"
                        data-id="${a.ID}" uk-tooltip="Download backup archive">
                        <span uk-icon="download"></span>
                    </button>
                    <button class="uk-button kp-btn-secondary kp-btn-sm backup-restore-btn"
                        data-id="${a.ID}" uk-tooltip="Restore from this snapshot">
                        <span uk-icon="history"></span>
                    </button>
                    <button class="uk-button kp-btn-danger kp-btn-sm backup-delete-btn"
                        data-id="${a.ID}" uk-tooltip="Delete this snapshot">
                        <span uk-icon="trash"></span>
                    </button>
                </div>
            </td>
        </tr>`).join("")}</tbody>
        </table>
        </div>`}function Qt(t,e,s){let a=Date.now()+18e5,i=setInterval(async()=>{try{let n=await k.get(`/sites/${s||e}/backups/restore-status`);(!n?.active||Date.now()>a)&&(clearInterval(i),x(),n?.active?d.error("Import timed out \u2014 check server logs"):n?.error?d.error(`Import failed: ${n.error}`):d.success("Import complete"),await j(t,e))}catch{Date.now()>a&&(clearInterval(i),x(),d.error("Import status unavailable \u2014 check server logs"))}},3e3)}async function j(t,e){try{let[s,a]=await Promise.all([k.get(`/sites/${e}/backup-repo`),k.get(`/sites/${e}/backups`)]),i=t.querySelector("#backup-local-enabled"),n=t.querySelector("#backup-s3-enabled");i&&(i.checked=!!s.LocalEnabled),n&&(n.checked=!!s.S3Enabled);let o=t.querySelector("#backup-error-banner");if(o)if(s.last_error){let r=s.last_error_at?` (${new Date(s.last_error_at).toLocaleString()})`:"";o.innerHTML=`
                    <div uk-alert class="uk-alert-warning">
                        <a class="uk-alert-close" uk-close></a>
                        <p><strong>Last scheduled backup failed${r}:</strong> ${f(s.last_error)}</p>
                    </div>`}else o.innerHTML="";let l=t.querySelector("#backup-list-wrap");l&&(l.innerHTML=ta(a))}catch(s){let a=t.querySelector("#backup-list-wrap");a&&(a.innerHTML=`<p class="kp-muted uk-text-small">Failed to load backups: ${f(s.message)}</p>`)}}function Zt(t,e){t.querySelector("#backup-repo-save")?.addEventListener("click",async()=>{let a={local_enabled:t.querySelector("#backup-local-enabled")?.checked??!1,s3_enabled:t.querySelector("#backup-s3-enabled")?.checked??!1};try{await k.put(`/sites/${e}/backup-repo`,a),d.success("Backup destinations saved")}catch(i){d.error(i.message)}}),t.querySelector("#backup-run-btn")?.addEventListener("click",async()=>{try{await k.post(`/sites/${e}/backups`,{label:"manual"})}catch(n){d.error(n.message);return}S("Backup Running","Snapshotting files and database \u2014 this may take a few minutes.");let a=Date.now()+1800*1e3,i=setInterval(async()=>{try{let n=await k.get(`/sites/${e}/backups/backup-status`);(!n?.active||Date.now()>a)&&(clearInterval(i),x(),await j(t,e),n?.active?d.error("Backup is taking longer than expected \u2014 check server logs for status"):n?.error?d.error(`Backup failed: ${n.error}`):d.success("Backup complete"))}catch{}},4e3)}),t.querySelector("#backup-list-wrap")?.addEventListener("click",async a=>{let i=a.target.closest(".backup-restore-btn");if(i){let l=i.dataset.id;if(!await E("Restore Site","This will restore the site from the selected snapshot. The site will show a maintenance page during the restore. Continue?"))return;try{await k.post(`/sites/${e}/backups/${l}/restore`)}catch(u){d.error(u.message);return}S("Restore Running","Restoring files and database \u2014 the site will return automatically when complete.");let c=Date.now(),b=Date.now()+900*1e3,p=setInterval(async()=>{try{let u=await k.get(`/sites/${e}/backups/restore-status`);(!u?.active||Date.now()>b)&&(clearInterval(p),x(),u?.active?d.error("Restore timed out"):d.success("Restore complete"),await j(t,e))}catch{}},3e3);return}let n=a.target.closest(".backup-delete-btn");if(n){let l=n.dataset.id;if(!await E("Delete Snapshot","This will permanently remove the snapshot from all configured repositories. This cannot be undone."))return;S("Deleting Snapshot","Removing snapshot data from repositories \u2014 this may take a moment.");try{await k.delete(`/sites/${e}/backups/${l}`),x(),d.success("Snapshot deleted"),await j(t,e)}catch(c){x(),d.error(c.message)}}let o=a.target.closest(".backup-download-btn");if(o){let l=o.dataset.id,r=`${Date.now().toString(36)}${Math.random().toString(36).slice(2,10)}`,c=`kp_dl_${r}`;S("Preparing Download","Your backup archive is being generated \u2014 this may take a moment depending on site size. Your download will begin automatically. Do not close this tab."),setTimeout(()=>{let b=document.createElement("a");b.href=`/api/sites/${e}/backups/${l}/download?dl=${r}`,b.style.display="none",document.body.appendChild(b),b.click(),document.body.removeChild(b);let p=Date.now(),u=setInterval(()=>{!document.cookie.split(";").some(h=>h.trim().startsWith(`${c}=`))&&Date.now()-p<18e5||(clearInterval(u),document.cookie=`${c}=; Path=/; Max-Age=0`,x())},500)},300);return}});let s=t.querySelector("#import-backup-modal");s&&(UIkit.util.on(s,"beforeshow",async()=>{let a=s.querySelector("#import-target-site");try{let n=await k.get("/sites"),o=Number(e);a.innerHTML=n.map(l=>`<option value="${l.ID}"${Number(l.ID)===o?" selected":""}>${l.Name}</option>`).join("")}catch{a.innerHTML='<option value="">Failed to load sites</option>'}let i=s.querySelector("#import-sftp-list");try{let n=await k.get(`/sites/${e}/backups/import/files`);!n||n.length===0?i.innerHTML='<p class="kp-muted uk-text-small">No files found.</p>':i.innerHTML=n.map(o=>`
                    <div class="uk-flex uk-flex-middle uk-flex-between uk-margin-small-bottom">
                        <span class="kp-mono uk-text-small">${f(o)}</span>
                        <button class="uk-button kp-btn-primary kp-btn-sm import-sftp-btn" data-file="${f(o)}">
                            Restore
                        </button>
                    </div>`).join("")}catch(n){i.innerHTML=`<p class="kp-muted uk-text-small">Failed to list files: ${f(n.message)}</p>`}}),s.querySelector("#import-upload-btn")?.addEventListener("click",async()=>{let a=s.querySelector("#import-file-input"),i=s.querySelector("#import-target-site")?.value;if(!a?.files?.length){d.error("Select an archive file first");return}let n=a.files[0],o=new FormData;o.append("archive",n),o.append("target_site_id",i),UIkit.modal(s).hide(),S("Importing Backup","Uploading and restoring \u2014 this may take several minutes.");try{await fetch(`/api/sites/${e}/backups/import/upload`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:o,credentials:"same-origin"}).then(async l=>{if(!l.ok){let r=await l.json().catch(()=>({}));throw new Error(r.error||`HTTP ${l.status}`)}})}catch(l){x(),d.error(l.message);return}Qt(t,e,i)}),s.querySelector("#import-sftp-list")?.addEventListener("click",async a=>{let i=a.target.closest(".import-sftp-btn");if(!i)return;let n=i.dataset.file,o=s.querySelector("#import-target-site")?.value;UIkit.modal(s).hide(),S("Importing from SFTP","Restoring archive \u2014 this may take several minutes.");try{await k.post(`/sites/${e}/backups/import/sftp`,{filename:n,target_site_id:parseInt(o,10)})}catch(l){x(),d.error(l.message);return}Qt(t,e,o)}))}function Lt(){return`
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
        </div>`}async function X(t){let e=document.getElementById("basicauth-panel");if(e)try{let[s,a]=await Promise.all([k.get(`/sites/${t}/basicauth`),k.get(`/sites/${t}/basicauth/users`)]),i=e.querySelector("#ba-enabled"),n=e.querySelector("#ba-realm");i&&(i.checked=!!s.Enabled),n&&(n.value=s.Realm??"Restricted"),ea(e,a??[])}catch(s){d.error("Failed to load basic auth settings: "+s.message)}}function ea(t,e){let s=t.querySelector("#ba-users-list");if(s){if(!e.length){s.innerHTML='<p class="kp-muted uk-text-small">No credentials configured.</p>';return}s.innerHTML=e.map(a=>`
        <div class="uk-flex uk-flex-middle uk-margin-small-bottom ba-user-row" data-uid="${a.id}" style="gap:8px">
            <span class="kp-mono" style="flex:1">${f(a.username)}</span>
            <a href="javascript:void(0);" class="kp-muted ba-delete-btn" uk-icon="trash" uk-tooltip="Remove credential"></a>
        </div>`).join("")}}function Tt(t,e){let s=new AbortController,a={signal:s.signal};t.addEventListener("click",async i=>{if(!i.target.closest("#ba-config-save"))return;let n=t.querySelector("#ba-config-save"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.put(`/sites/${e}/basicauth`,{enabled:t.querySelector("#ba-enabled").checked,realm:t.querySelector("#ba-realm").value.trim()||"Restricted"}),d.success("Basic auth settings saved")}catch(l){d.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}},a),t.addEventListener("click",async i=>{if(!i.target.closest("#ba-add-user"))return;let n=t.querySelector("#ba-new-username").value.trim(),o=t.querySelector("#ba-new-password").value;if(!n||!o){d.error("Username and password are required");return}let l=t.querySelector("#ba-add-user"),r=l.innerHTML;l.disabled=!0,l.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.put(`/sites/${e}/basicauth/users`,{username:n,password:o}),d.success(`Credential saved for ${n}`),t.querySelector("#ba-new-username").value="",t.querySelector("#ba-new-password").value="",await X(e)}catch(c){d.error(c.message)}finally{l.disabled=!1,l.innerHTML=r}},a),t.addEventListener("click",async i=>{let n=i.target.closest(".ba-delete-btn");if(!n)return;let o=n.closest(".ba-user-row")?.dataset.uid;if(o)try{await k.delete(`/sites/${e}/basicauth/users/${o}`),d.success("Credential removed"),await X(e)}catch(l){d.error(l.message)}},a),t.__basicAuthAbort?.abort(),t.__basicAuthAbort=s}var Q={1:"Nginx",2:"PHP",3:"MariaDB",4:"Redis",5:"Varnish"};function Z(t,e,s){let a=s?Object.entries(s):[];return`
        <div>
            <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                <div class="uk-flex uk-flex-middle" style="gap:10px">
                    <h4 class="kp-view-title uk-margin-remove">${Q[e]}</h4>
                </div>
                <div class="uk-flex" style="gap:8px">
                    <button class="uk-button kp-btn-ghost kp-btn-sm cfg-add-row" data-type="${e}" uk-tooltip="Add a Key">
                        <span uk-icon="plus"></span>
                    </button>
                    <button class="uk-button kp-btn-secondary kp-btn-sm cfg-save" data-type="${e}" data-site="${t}" uk-tooltip="Save the Configuration">
                        <span uk-icon="check"></span>
                    </button>
                    <button class="uk-button kp-btn-ghost kp-btn-sm cfg-reset" data-type="${e}" data-site="${t}" uk-tooltip="Reset to Defaults">
                        <span uk-icon="refresh"></span>
                    </button>
                    <a class="uk-button kp-btn-ghost kp-btn-sm" href="/api/sites/${t}/configs/${e}/export" download="${t}-config-${e}.csv" uk-tooltip="Export config as CSV">
                        <span uk-icon="download"></span>
                    </a>
                    <label class="uk-button kp-btn-ghost kp-btn-sm cfg-import-label" data-type="${e}" data-site="${t}" uk-tooltip="Import config from CSV" style="cursor:pointer">
                        <span uk-icon="upload"></span>
                        <input type="file" class="cfg-import-input" accept=".csv" style="display:none" data-type="${e}" data-site="${t}">
                    </label>
                </div>
            </div>
            <div class="kp-config-grid cfg-rows" data-type="${e}">
                ${a.map(([i,n])=>Y(i,n)).join("")}
            </div>
        </div>`}function te(t,e){let s=e?.enabled==="true",a=e?Object.entries(e).filter(([i])=>i!=="enabled"):[];return`
        <div>
            <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom" uk-tooltip="Add a Key">
                <div class="uk-flex uk-flex-middle" style="gap:10px">
                    <h4 class="kp-view-title uk-margin-remove">Varnish</h4>
                </div>
                <div class="uk-flex" style="gap:8px">
                    <button class="uk-button kp-btn-ghost kp-btn-sm cfg-add-row" data-type="5">
                        <span uk-icon="plus"></span>
                    </button>
                    <button class="uk-button kp-btn-secondary kp-btn-sm cfg-save" data-type="5" data-site="${t}" uk-tooltip="Save the Configuration">
                        <span uk-icon="check"></span>
                    </button>
                    <button class="uk-button kp-btn-ghost kp-btn-sm cfg-reset" data-type="5" data-site="${t}" uk-tooltip="Reset to Defaults">
                        <span uk-icon="refresh"></span>
                    </button>
                    <a class="uk-button kp-btn-ghost kp-btn-sm" href="/api/sites/${t}/configs/5/export" download="${t}-config-5.csv" uk-tooltip="Export config as CSV">
                        <span uk-icon="download"></span>
                    </a>
                    <label class="uk-button kp-btn-ghost kp-btn-sm cfg-import-label" data-type="5" data-site="${t}" uk-tooltip="Import config from CSV" style="cursor:pointer">
                        <span uk-icon="upload"></span>
                        <input type="file" class="cfg-import-input" accept=".csv" style="display:none" data-type="5" data-site="${t}">
                    </label>
                </div>
            </div>

            <!-- enable/disable toggle \u2014 requires pod recreate to take effect -->
            <div class="uk-margin-small-bottom" style="background:var(--kp-surface-2);padding:10px 12px;border-radius:6px">
                <label class="uk-flex uk-flex-middle" style="gap:10px;cursor:pointer">
                    <input type="checkbox" class="uk-checkbox varnish-enabled-toggle" ${s?"checked":""}>
                    <span>Enable Varnish Cache</span>
                    <span class="kp-muted uk-text-small">\u2014 requires pod recreate to take effect</span>
                </label>
            </div>

            <div class="kp-config-grid cfg-rows" data-type="5">
                ${a.map(([i,n])=>Y(i,n)).join("")}
            </div>
        </div>`}function Y(t="",e=""){return`<div class="kp-config-row">
        <div class="kp-config-key">
            <input class="cfg-key" type="text" value="${t}" placeholder="key">
        </div>
        <div class="kp-config-val">
            <input class="cfg-val" type="text" value="${e}" placeholder="value">
        </div>
        <button class="kp-config-del cfg-del-row" title="Remove">
            <span uk-icon="icon: close; ratio: 0.8"></span>
        </button>
    </div>`}function ee(t,e,s){t.addEventListener("click",a=>{if(a.target.closest(".cfg-add-row")){let i=a.target.closest(".cfg-add-row");t.querySelector(`.cfg-rows[data-type="${i.dataset.type}"]`).insertAdjacentHTML("beforeend",Y())}},{signal:s}),t.addEventListener("click",a=>{a.target.closest(".cfg-del-row")&&a.target.closest(".kp-config-row").remove()},{signal:s}),t.addEventListener("click",async a=>{let i=a.target.closest(".cfg-save");if(!i)return;let{type:n,site:o}=i.dataset,l=t.querySelectorAll(`.cfg-rows[data-type="${n}"] .kp-config-row`),r={};if(l.forEach(c=>{let b=c.querySelector(".cfg-key").value.trim(),p=c.querySelector(".cfg-val").value.trim();b&&(r[b]=p)}),n==="5"){let c=t.querySelector(".varnish-enabled-toggle");r.enabled=c?.checked?"true":"false"}try{await k.put(`/sites/${o}/configs/${n}`,r),d.success(`${Q[n]} config saved`)}catch(c){d.error(c.message)}},{signal:s}),t.addEventListener("click",async a=>{let i=a.target.closest(".cfg-reset");if(!i)return;let{type:n,site:o}=i.dataset;if(await E("Reset Config",`Reset ${Q[n]} config to defaults?`))try{let r=await k.post(`/sites/${o}/configs/${n}/reset`),c=t.querySelector(`.cfg-rows[data-type="${n}"]`);c.innerHTML=Object.entries(r).map(([b,p])=>Y(b,p)).join(""),d.success(`${Q[n]} reset to defaults`)}catch(r){d.error(r.message)}},{signal:s}),t.addEventListener("change",async a=>{let i=a.target.closest(".cfg-import-input");if(!i)return;let{type:n,site:o}=i.dataset,l=i.files[0];if(!l)return;let r=new FormData;r.append("file",l);try{let c=await fetch(`/api/sites/${o}/configs/${n}/import`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:r}),b=c.status===204?null:await c.json().catch(()=>null);if(!c.ok)throw new Error(b?.error||`HTTP ${c.status}`);let p=t.querySelector(`.cfg-rows[data-type="${n}"]`);p.innerHTML=Object.entries(b).map(([u,m])=>Y(u,m)).join(""),d.success(`${Q[n]} config imported`)}catch(c){d.error(c.message)}finally{i.value=""}},{signal:s})}function se(t){return`
        <div id="crons-panel" data-site-id="${t}">
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

        </div>`}function ne(t){if(!t||t.length===0)return'<p class="kp-muted uk-text-small uk-margin-remove">No cron jobs configured.</p>';let e=a=>a?new Date(a).toLocaleString():"\u2014";return`
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
            <tbody>${t.map(a=>`
        <tr>
            <td class="kp-text">${a.Label||'<span class="kp-muted">\u2014</span>'}</td>
            <td class="kp-mono kp-text-sm">${a.Schedule}</td>
            <td class="kp-muted uk-text-small">${e(a.LastRun)}</td>
            <td>
                ${a.LastError?'<span class="kp-badge kp-badge-error">Error</span>':a.LastRun?'<span class="kp-badge kp-badge-success">OK</span>':'<span class="kp-muted uk-text-small">\u2014</span>'}
                ${a.LastOutput||a.LastError?`<a class="kp-cron-detail-btn cron-detail-btn" data-id="${a.ID}" uk-tooltip="View Run Details">
                            <span uk-icon="icon: info; ratio: 0.75"></span>
                        </a>`:""}
            </td>
            <td>
                <input type="checkbox" class="uk-checkbox cron-toggle"
                    data-id="${a.ID}" ${a.Enabled?"checked":""}>
            </td>
            <td>
                <div class="uk-flex kp-cron-actions">
                    <button class="uk-button kp-btn-ghost kp-btn-sm cron-run-btn"
                        data-id="${a.ID}" uk-tooltip="Run Now">
                        <span uk-icon="play"></span>
                    </button>
                    <button class="uk-button kp-btn-ghost kp-btn-sm cron-edit-btn"
                        data-id="${a.ID}" uk-tooltip="Edit">
                        <span uk-icon="pencil"></span>
                    </button>
                    <button class="uk-button kp-btn-danger kp-btn-sm cron-delete-btn"
                        data-id="${a.ID}" uk-tooltip="Delete">
                        <span uk-icon="trash"></span>
                    </button>
                </div>
            </td>
        </tr>`).join("")}</tbody>
        </table>
        </div>`}async function ut(t,e){let s=t.querySelector("#cron-list-wrap");if(s)try{let a=await k.get(`/sites/${e}/crons`);s.innerHTML=ne(a)}catch(a){s.innerHTML=`<p class="kp-muted uk-text-small">Failed to load cron jobs: ${f(a.message)}</p>`}}function ie(t,e){let s=[],a=t.querySelector("#cron-modal"),i=t.querySelector("#cron-modal-title"),n=t.querySelector("#cron-modal-id"),o=t.querySelector("#cron-modal-label"),l=t.querySelector("#cron-modal-command"),r=t.querySelector("#cron-modal-schedule"),c=t.querySelector("#cron-schedule-preview"),b=t.querySelector("#cron-modal-enabled");r?.addEventListener("input",()=>{c.textContent=ae(r.value.trim())}),t.querySelector("#cron-add-btn")?.addEventListener("click",()=>{i.textContent="Add Cron Job",n.value="",o.value="",l.value="",r.value="",c.textContent="",b.checked=!0,UIkit.modal(a).show()}),t.querySelector("#cron-modal-save")?.addEventListener("click",async()=>{let p=l.value.trim(),u=r.value.trim();if(!p||!u){d.error("Command and schedule are required");return}let m={label:o.value.trim(),command:p,schedule:u,enabled:b.checked},h=n.value;try{h?(await k.put(`/sites/${e}/crons/${h}`,m),d.success("Cron job updated")):(await k.post(`/sites/${e}/crons`,m),d.success("Cron job created")),UIkit.modal(a).hide(),await ut(t,e),s=await k.get(`/sites/${e}/crons`)}catch(v){d.error(v.message)}}),t.querySelector("#cron-list-wrap")?.addEventListener("click",async p=>{let u=p.target.closest(".cron-detail-btn");if(u){let g=u.dataset.id,w=s.find(I=>String(I.ID)===g);if(!w)return;document.body.insertAdjacentHTML("beforeend",`
                <div id="cron-detail-modal" uk-modal>
                    <div class="uk-modal-dialog kp-modal uk-modal-body uk-width-large">
                        <button class="uk-modal-close-default" type="button" uk-close></button>
                        <h3 class="kp-view-title uk-margin-bottom">Run Details \u2014 ${f(w.Label||String(w.ID))}</h3>
                        <div class="uk-margin-small-bottom">
                            <label class="kp-label">Output</label>
                            <pre class="kp-cron-output">${f(w.LastOutput||"(no output)")}</pre>
                        </div>
                        <div class="uk-margin-small-top">
                            <label class="kp-label">Error</label>
                            <pre class="kp-cron-output kp-cron-output-error">${f(w.LastError||"(no error)")}</pre>
                        </div>
                    </div>
                </div>`);let $=document.getElementById("cron-detail-modal");UIkit.modal($).show(),$.addEventListener("hidden",()=>$.remove(),{once:!0});return}let m=p.target.closest(".cron-edit-btn");if(m){let g=m.dataset.id,w=s.find($=>String($.ID)===g);if(!w)return;i.textContent="Edit Cron Job",n.value=w.ID,o.value=w.Label||"",l.value=w.Command,r.value=w.Schedule,c.textContent=ae(w.Schedule),b.checked=w.Enabled,UIkit.modal(a).show();return}let h=p.target.closest(".cron-delete-btn");if(h){let g=h.dataset.id;if(!await E("Delete Cron Job","This will permanently remove the cron job. Continue?"))return;try{await k.delete(`/sites/${e}/crons/${g}`),d.success("Cron job deleted"),await ut(t,e),s=await k.get(`/sites/${e}/crons`)}catch($){d.error($.message)}return}let v=p.target.closest(".cron-run-btn");if(v){let g=v.dataset.id;try{await k.post(`/sites/${e}/crons/${g}/run`)}catch(q){d.error(q.message);return}S("Running Cron Job","Executing the job inside the container \u2014 please wait.");let w=null;try{w=(await k.get(`/sites/${e}/crons`)).find(H=>String(H.ID)===g)?.LastRun??null}catch{}let $=Date.now()+300*1e3,I=setInterval(async()=>{try{let q=await k.get(`/sites/${e}/crons`),H=q.find(et=>String(et.ID)===g);if(!H||H.LastRun!==w||Date.now()>$){clearInterval(I),x(),s=q??[];let et=t.querySelector("#cron-list-wrap");et&&(et.innerHTML=ne(q)),H?.LastError?d.error(`Job failed: ${H.LastError}`):d.success("Cron job complete")}}catch{}},2e3);return}}),t.querySelector("#cron-list-wrap")?.addEventListener("change",async p=>{let u=p.target.closest(".cron-toggle");if(!u)return;let m=u.dataset.id;try{await k.patch(`/sites/${e}/crons/${m}/toggle`,{enabled:u.checked}),d.success(u.checked?"Cron job enabled":"Cron job disabled")}catch(h){d.error(h.message),u.checked=!u.checked}}),k.get(`/sites/${e}/crons`).then(p=>{s=p??[]}).catch(()=>{})}function ae(t){if(!t)return"";let e=t.trim().split(/\s+/);if(e.length!==5)return"invalid expression";let[s,a,i,n,o]=e;if(t==="* * * * *")return"every minute";if(s!=="*"&&a!=="*"&&i==="*"&&n==="*"&&o==="*")return`daily at ${a.padStart(2,"0")}:${s.padStart(2,"0")}`;if(s!=="*"&&a!=="*"&&i==="*"&&n==="*"&&o!=="*"){let l=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return`weekly on ${o.split(",").map(c=>l[parseInt(c)]??c).join(", ")} at ${a.padStart(2,"0")}:${s.padStart(2,"0")}`}return s.startsWith("*/")?`every ${s.slice(2)} minutes`:a.startsWith("*/")?`every ${a.slice(2)} hours`:t}function oe(t){return`
        <div id="dbtools-panel" data-site-id="${t}">

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
        </div>`}function le(t,e){t.querySelector("#dbtools-dump-btn")?.addEventListener("click",()=>{let s=`${Date.now().toString(36)}${Math.random().toString(36).slice(2,10)}`,a=`kp_dl_${s}`;S("Preparing Download","Your database dump is being generated \u2014 your download will begin automatically. Do not close this tab."),setTimeout(()=>{let i=document.createElement("a");i.href=`/api/sites/${e}/db/dump?dl=${s}`,i.style.display="none",document.body.appendChild(i),i.click(),document.body.removeChild(i);let n=Date.now(),o=setInterval(()=>{!document.cookie.split(";").some(r=>r.trim().startsWith(`${a}=`))&&Date.now()-n<18e5||(clearInterval(o),document.cookie=`${a}=; Path=/; Max-Age=0`,x())},500)},300)})}var B="";function pe(t){return`
        <div class="kp-card uk-padding uk-margin-top" id="fm-root" data-site="${t}">
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
        </div>`}function aa(){let t=B?B.split("/"):[],e="",s=['<a href="#" data-path="">html</a>'];for(let a of t)e=e?e+"/"+a:a,s.push(`<span class="kp-fm-sep">/</span><a href="#" data-path="${f(e)}">${f(a)}</a>`);return s.join("")}function sa(t){let e=new Date(t);return isNaN(e)?"":e.toLocaleString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function re(t){return t==="d"?"folder":t==="l"?"link":"file-text"}function O(t,e){return t?t+"/"+e:e}var ce=new Set(["php","js","jsx","ts","tsx","css","scss","sass","less","html","htm","xml","json","txt","md","markdown","yml","yaml","ini","conf","cnf","toml","env","sh","bash","sql","log","csv","tsv","svg","htaccess","gitignore","lock","map"]);function na(t,e){if(e)return!1;let s=t.lastIndexOf(".");return t.startsWith(".")&&s===0?ce.has(t.slice(1).toLowerCase()):s>=0&&ce.has(t.slice(s+1).toLowerCase())}function ia(t){if(!t||!t.length)return st("folder","This folder is empty");let e=document.getElementById("fm-root").dataset.site;return`
        <table class="uk-table uk-table-divider uk-table-small uk-table-middle kp-fm-table">
            <thead>
                <tr>
                    <th>Name</th><th>Size</th><th>Perms</th><th>Modified</th><th></th>
                </tr>
            </thead>
            <tbody>${t.map(a=>{let i=O(B,a.name),n=a.is_dir,o=na(a.name,n),l=n?`<a href="#" class="fm-nav" data-path="${f(i)}"><span uk-icon="icon: ${re(a.type)}; ratio: 0.9"></span> ${f(a.name)}</a>`:`<span><span uk-icon="icon: ${re(a.type)}; ratio: 0.9"></span> ${f(a.name)}</span>`;return`
            <tr data-path="${f(i)}" data-name="${f(a.name)}" data-dir="${n?1:0}" data-mode="${f(a.mode)}">
                <td class="kp-fm-name">${l}</td>
                <td class="uk-text-nowrap">${L(a.size,n)}</td>
                <td><code class="kp-mono">${f(a.mode)}</code></td>
                <td class="uk-text-nowrap uk-text-small kp-muted">${sa(a.mod_time)}</td>
                <td class="uk-text-right uk-text-nowrap">
                    ${o?`<button class="kp-fm-act fm-edit" data-path="${f(i)}" uk-tooltip="Edit"><span uk-icon="icon: pencil; ratio: 0.85"></span></button>`:""}
                    ${n?"":`<a class="kp-fm-act fm-download" href="/api/sites/${e}/files/download?path=${encodeURIComponent(i)}" uk-tooltip="Download"><span uk-icon="icon: download; ratio: 0.85"></span></a>`}
                    <button class="kp-fm-act fm-chmod" uk-tooltip="Permissions"><span uk-icon="icon: settings; ratio: 0.85"></span></button>
                    <button class="kp-fm-act fm-rename" uk-tooltip="Rename / Move"><span uk-icon="icon: move; ratio: 0.85"></span></button>
                    <button class="kp-fm-act fm-copy" uk-tooltip="Copy"><span uk-icon="icon: copy; ratio: 0.85"></span></button>
                    <button class="kp-fm-act fm-delete" uk-tooltip="Delete"><span uk-icon="icon: trash; ratio: 0.85"></span></button>
                </td>
            </tr>`}).join("")}</tbody>
        </table>`}async function C(t){let e=document.getElementById("fm-list"),s=document.getElementById("fm-breadcrumb");if(e){e.innerHTML=at(),s&&(s.innerHTML=aa());try{let a=await k.get(`/sites/${t}/files?path=${encodeURIComponent(B)}`);e.innerHTML=ia(a)}catch(a){e.innerHTML=T("Failed to list files: "+a.message)}}}function de(t,e){B=e||"",C(t)}function tt(t,e,s=""){return new Promise(a=>{let i="fm-prompt-modal";document.getElementById(i)?.remove();let n=document.createElement("div");n.id=i,n.setAttribute("uk-modal",""),n.innerHTML=`
            <div class="uk-modal-dialog uk-modal-body kp-modal">
                <h3 class="uk-modal-title">${f(t)}</h3>
                <label class="kp-label uk-margin-small-bottom">${f(e)}</label>
                <input class="uk-input kp-input" id="fm-prompt-input" value="${f(s)}" autocomplete="off">
                <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                    <button class="uk-button kp-btn-ghost uk-modal-close">Cancel</button>
                    <button class="uk-button kp-btn-primary" id="fm-prompt-ok">OK</button>
                </div>
            </div>`,document.body.appendChild(n),window.UIkit&&UIkit.icon(n);let o=UIkit.modal(n),l=n.querySelector("#fm-prompt-input"),r=!1,c=b=>{r||(r=!0,a(b),o.hide())};n.querySelector("#fm-prompt-ok").addEventListener("click",()=>c(l.value.trim()||null)),l.addEventListener("keydown",b=>{b.key==="Enter"&&(b.preventDefault(),c(l.value.trim()||null))}),UIkit.util.on(n,"hidden",()=>{r||(r=!0,a(null)),n.remove()}),o.show(),setTimeout(()=>l.focus(),50)})}async function oa(t,e){let s=O(B,e.name),a=await fetch(`/api/sites/${t}/files/upload?path=${encodeURIComponent(s)}`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:e}),i=a.status===204?null:await a.json().catch(()=>null);if(!a.ok)throw new Error(i?.error||`HTTP ${a.status}`)}function me(t,e){B="",t.addEventListener("click",s=>{let a=s.target.closest("#fm-breadcrumb a");if(a){s.preventDefault(),de(e,a.dataset.path);return}let i=s.target.closest(".fm-nav");if(i){s.preventDefault(),de(e,i.dataset.path);return}let n=s.target.closest(".fm-edit");if(n){s.preventDefault(),ca(e,n.dataset.path,n.dataset.path.split("/").pop());return}}),t.querySelector("#fm-new-file")?.addEventListener("click",async()=>{let s=await tt("New File","File name");if(s)try{await k.post(`/sites/${e}/files/file`,{path:O(B,s)}),C(e)}catch(a){d.error(a.message)}}),t.querySelector("#fm-new-dir")?.addEventListener("click",async()=>{let s=await tt("New Folder","Folder name");if(s)try{await k.post(`/sites/${e}/files/dir`,{path:O(B,s)}),C(e)}catch(a){d.error(a.message)}}),t.querySelector("#fm-upload")?.addEventListener("change",async s=>{let a=[...s.target.files];if(a.length)try{for(let i of a)await oa(e,i);d.success(a.length===1?"File uploaded":`${a.length} files uploaded`),C(e)}catch(i){d.error(i.message)}finally{s.target.value=""}}),t.querySelector("#fm-refresh")?.addEventListener("click",()=>C(e)),t.addEventListener("click",async s=>{let a=s.target.closest("tr[data-path]");if(!a)return;let i=a.dataset.path,n=a.dataset.name;if(s.target.closest(".fm-chmod")){let o=await tt("Permissions",`Octal mode for "${n}"`,a.dataset.mode);if(!o)return;try{await k.patch(`/sites/${e}/files/chmod`,{path:i,mode:o}),C(e)}catch(l){d.error(l.message)}return}if(s.target.closest(".fm-rename")){let o=await tt("Rename / Move","New path (relative to current folder)",n);if(!o||o===n)return;try{await k.post(`/sites/${e}/files/move`,{src:i,dst:O(B,o)}),C(e)}catch(l){d.error(l.message)}return}if(s.target.closest(".fm-copy")){let o=await tt("Copy","Destination name",n+"-copy");if(!o)return;try{await k.post(`/sites/${e}/files/copy`,{src:i,dst:O(B,o)}),C(e)}catch(l){d.error(l.message)}return}if(s.target.closest(".fm-delete")){if(!await E("Delete",`Delete "${n}"? This cannot be undone.`))return;try{await k.delete(`/sites/${e}/files?path=${encodeURIComponent(i)}`),C(e)}catch(l){d.error(l.message)}return}})}var pt=null;function ue(t){if(document.querySelector(`link[href="${t}"]`))return;let e=document.createElement("link");e.rel="stylesheet",e.href=t,document.head.appendChild(e)}function _t(t){return new Promise((e,s)=>{let a=document.querySelector(`script[src="${t}"]`);if(a){if(a.dataset.loaded)return e();a.addEventListener("load",()=>e()),a.addEventListener("error",()=>s(new Error("failed to load "+t)));return}let i=document.createElement("script");i.src=t,i.addEventListener("load",()=>{i.dataset.loaded="1",e()}),i.addEventListener("error",()=>s(new Error("failed to load "+t))),document.head.appendChild(i)})}function la(){if(pt)return pt;let t="https://cdn.jsdelivr.net/npm/codemirror@5";return ue(`${t}/lib/codemirror.css`),ue(`${t}/theme/material-darker.css`),pt=_t(`${t}/lib/codemirror.js`).then(()=>Promise.all([_t(`${t}/mode/meta.js`),_t(`${t}/addon/mode/loadmode.js`)])).then(()=>{window.CodeMirror.modeURL=`${t}/mode/%N/%N.js`}),pt}function ra(t){let e=window.CodeMirror.findModeByFileName(t);return e?e.mode:null}async function ca(t,e,s){let a;try{a=await k.get(`/sites/${t}/files/content?path=${encodeURIComponent(e)}`)}catch(u){let m=/too large/i.test(u.message)?"File is too large to edit \u2014 download it instead.":/binary/i.test(u.message)?"Binary file \u2014 download it instead of editing.":u.message;d.error(m);return}try{await la()}catch(u){d.error("Editor failed to load: "+u.message);return}let i="fm-editor-modal";document.getElementById(i)?.remove();let n=document.createElement("div");n.id=i,n.setAttribute("uk-modal",""),n.innerHTML=`
        <div class="uk-modal-dialog kp-modal kp-fm-editor-dialog">
            <div class="uk-flex uk-flex-middle uk-flex-between uk-padding-small">
                <h3 class="uk-modal-title uk-margin-remove"><span uk-icon="file-text"></span> ${f(s)} <span id="fm-ed-dirty" class="kp-muted uk-text-small" hidden>\u2022 unsaved</span></h3>
                <div class="uk-flex" style="gap:8px">
                    <button class="uk-button kp-btn-primary kp-btn-sm" id="fm-ed-save"><span uk-icon="icon: check; ratio: 0.85"></span> Save</button>
                    <button class="uk-button kp-btn-ghost kp-btn-sm uk-modal-close"><span uk-icon="icon: close; ratio: 0.85"></span></button>
                </div>
            </div>
            <div class="kp-fm-editor-body">
                <textarea id="fm-ed-area"></textarea>
            </div>
        </div>`,document.body.appendChild(n),window.UIkit&&UIkit.icon(n);let o=UIkit.modal(n,{bgClose:!1,escClose:!0}),l=n.querySelector("#fm-ed-dirty"),r=null,c=!0,b=u=>{c=!u,l.hidden=!u};UIkit.util.on(n,"shown",()=>{if(r)return;r=window.CodeMirror.fromTextArea(n.querySelector("#fm-ed-area"),{value:a.content,lineNumbers:!0,theme:"material-darker",indentUnit:4,lineWrapping:!1,extraKeys:{"Ctrl-S":p,"Cmd-S":p,"Ctrl-F":"findPersistent","Ctrl-/":"toggleComment"}}),r.setValue(a.content),r.on("change",()=>b(!0));let u=ra(s);u&&(r.setOption("mode",u),window.CodeMirror.autoLoadMode(r,u)),setTimeout(()=>r.refresh(),30)}),UIkit.util.on(n,"hidden",()=>n.remove());async function p(){if(!r)return;let u=n.querySelector("#fm-ed-save"),m=u.innerHTML;u.disabled=!0,u.innerHTML='<div uk-spinner="ratio: 0.6"></div>';try{await k.put(`/sites/${t}/files/content`,{path:e,content:r.getValue()}),b(!1),d.success("Saved"),C(t)}catch(h){d.error(h.message)}finally{u.disabled=!1,u.innerHTML=m}}n.querySelector("#fm-ed-save").addEventListener("click",p),UIkit.util.on(n,"beforehide",u=>{!c&&!window.confirm("Discard unsaved changes?")&&u.preventDefault()}),o.show()}var da=2e3;function Pt(t,e){return`
        <div>
            <div class="kp-log-controls">
                <select class="uk-select kp-select" id="log-container" style="width:140px;height:38px">
                    ${e===6?'<option value="access">Access Log</option><option value="waf">WAF Log</option>':`<option value="access">Access</option>
            <option value="nginx">Nginx</option>
                    ${(()=>{switch(e){case 1:case 2:return'<option value="php">PHP-FPM</option>';case 4:return'<option value="app">Node.js</option>';case 5:return'<option value="app">.NET</option>';case 7:return'<option value="app">Python</option>';default:return""}})()}
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
        </div>`}function ke(t,e){let s=null,a=!1,i=t.querySelector("#log-output"),n=t.querySelector("#log-connect"),o=t.querySelector("#log-disconnect"),l=t.querySelector("#log-clear"),r=t.querySelector("#log-autoscroll"),c=t.querySelector("#log-status");function b(m){for(m.split(`
`).forEach(h=>{if(!h)return;let v=document.createElement("div");v.className=h.match(/WAF BLOCK/i)?"kp-log-line-err":h.match(/WAF DETECT/i)?"kp-log-line-warn":h.match(/error|crit|emerg/i)?"kp-log-line-err":h.match(/warn/i)?"kp-log-line-warn":h.match(/info|notice/i)?"kp-log-line-info":"",v.textContent=h,i.appendChild(v)});i.childElementCount>da;)i.removeChild(i.firstChild);r.checked&&(i.scrollTop=i.scrollHeight)}function p(){s&&(s.close(),s=null),a=!1,n.disabled=!1,o.disabled=!0,c&&(c.textContent="Disconnected")}n.addEventListener("click",()=>{p();let m=t.querySelector("#log-container").value,h=t.querySelector("#log-tail").value,v=location.protocol==="https:"?"wss":"ws",g=m==="waf"?`${v}://${location.host}/api/sites/${e}/logs/waf?tail=${h}`:m==="proxy"?`${v}://${location.host}/api/sites/${e}/logs/proxy?tail=${h}`:m==="access"?`${v}://${location.host}/api/sites/${e}/logs/proxy?tail=${h}`:`${v}://${location.host}/api/sites/${e}/logs?container=${m}&tail=${h}`;s=new WebSocket(g),s.onopen=()=>{a=!0,n.disabled=!0,o.disabled=!1,c&&(c.textContent=`Connected \u2014 ${m}`)},s.onmessage=w=>b(w.data),s.onerror=()=>{},s.onclose=()=>{a=!1,n.disabled=!1,o.disabled=!0,c&&(c.textContent="Disconnected")}}),o.addEventListener("click",p),l.addEventListener("click",()=>{i.innerHTML=""}),t.querySelector("#log-container").addEventListener("change",()=>{s&&s.readyState===WebSocket.OPEN&&(p(),n.click())});let u=y.go.bind(y);y.go=function(m,h={}){return s&&p(),u(m,h)}}function ua(t){switch(t){case"valid":return'<span class="kp-ssl-valid" uk-icon="icon: lock; ratio: 0.85" uk-tooltip="Valid SSL certificate"></span>';case"self-signed":return'<span class="kp-ssl-self-signed" uk-icon="icon: lock; ratio: 0.85" uk-tooltip="Self-signed certificate"></span>';case"expired":return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="Expired certificate"></span>';case"mismatch":return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="Certificate does not match this domain"></span>';default:return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="No SSL certificate"></span>'}}async function be(t,e){try{let s=await k.get(`/ssl-status?domain=${encodeURIComponent(t)}`),a=document.getElementById(`ssl-icon-${e}`);a&&(a.outerHTML=ua(s.status))}catch{}}function he(t){t.forEach(e=>be(e.Domain,e.ID))}function ve(t,e,s,a=0,i=null){let n=t.SiteType!==3&&t.PMAPort>0;return`
        <div class="uk-grid-medium" uk-grid>
            <div class="uk-width-1-2@m">
                <div class="kp-card uk-padding-small">
                    <h3 class="kp-view-title uk-margin-bottom">Site Info</h3>
                    <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
                        <tbody>
                            <tr><td class="kp-muted">Name</td><td>${t.Name}</td></tr>
                            ${i?`<tr><td class="kp-muted">Parent</td><td><a href="javascript:void(0)" data-action="manage" data-id="${a}" style="color:var(--kp-cyan)">${i}</a></td></tr>`:""}
                            <tr><td class="kp-muted">Internal Port</td><td>:${t.Port}</td></tr>
                            <tr><td class="kp-muted">Type</td><td>${J(t.SiteType)}</td></tr>
                            <tr><td class="kp-muted">Version</td><td>${D(t)}</td></tr>
                            <tr><td class="kp-muted">Status</td><td>${M(t.SiteStatus)}</td></tr>
                            <tr><td class="kp-muted">Containers</td><td><div id="sd-health-badges" class="kp-health-badges"></div></td></tr>
                            <tr><td class="kp-muted">Created</td><td>${new Date(t.Created).toLocaleString()}</td></tr>
                        </tbody>
                    </table>
                </div>
                
                ${i?`
                <div class="kp-card uk-padding-small uk-margin-small-top">
                    <h3 class="kp-view-title uk-margin-bottom">Site Sync</h3>
                    <p class="kp-muted uk-text-small uk-margin-remove-bottom">
                        Sync files and database between this clone and its parent site.
                    </p>
                    <div class="uk-flex uk-margin-small-top" style="gap:8px">
                        <button class="uk-button kp-btn-secondary kp-btn-sm" id="sync-pull-btn">
                            <span uk-icon="cloud-download"></span> Pull From Parent
                        </button>
                        <button class="uk-button kp-btn-secondary kp-btn-sm" id="sync-push-btn">
                            <span uk-icon="cloud-upload"></span> Push To Parent
                        </button>
                    </div>
                </div>`:""}

                ${n?`
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
                        ${e.length?e.map(ge).join(""):'<p class="kp-muted uk-text-small">No domains configured</p>'}
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
                            <tr><td class="kp-muted">User</td><td class="kp-mono">${s?.Username??t.Name}</td></tr>
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
        </div>`}function ge(t){return`<div class="uk-flex uk-flex-between uk-flex-middle kp-config-row" data-domain-id="${t.ID}">
        <div class="uk-flex uk-flex-middle kp-domain-row-inner">
            <span id="ssl-icon-${t.ID}" class="kp-ssl-pending" uk-icon="icon: more; ratio: 0.85"></span>
            <span class="uk-text-small kp-mono">${t.Domain}</span>
        </div>
        <button class="kp-config-del" data-action="delete-domain" data-did="${t.ID}" title="Remove">
            <span uk-icon="icon: close; ratio: 0.8"></span>
        </button>
    </div>`}function fe(t,e){t.querySelector("#domain-add-btn")?.addEventListener("click",()=>{t.querySelector("#domain-add-form").classList.remove("uk-hidden")}),t.querySelector("#domain-cancel-btn")?.addEventListener("click",()=>{t.querySelector("#domain-add-form").classList.add("uk-hidden")}),t.querySelector("#domain-save-btn")?.addEventListener("click",async()=>{let s=t.querySelector("#domain-add-input").value.trim();if(s)try{let a=await k.post(`/sites/${e}/domains`,{domain:s});t.querySelector("#domain-list").insertAdjacentHTML("beforeend",ge(a)),be(a.Domain,a.ID),t.querySelector("#domain-add-form").classList.add("uk-hidden"),t.querySelector("#domain-add-input").value="",d.success("Domain added")}catch(a){d.error(a.message)}}),t.querySelector("#domain-list")?.addEventListener("click",async s=>{let a=s.target.closest('[data-action="delete-domain"]');if(!(!a||!await E("Remove Domain","Remove this domain from the site?")))try{await k.delete(`/sites/${e}/domains/${a.dataset.did}`),a.closest("[data-domain-id]").remove(),d.success("Domain removed")}catch(n){d.error(n.message)}})}function ye(t,e,s=null){t.querySelector("#sftp-regen-btn")?.addEventListener("click",async()=>{let n=t.querySelector("#sftp-regen-btn"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{let l=await k.post(`/sites/${e}/sftp-regen`),r=t.querySelector("#sftp-pass-display");if(r&&l?.password){r.textContent=l.password,r.dataset.revealed="1";let c=t.querySelector("#sftp-reveal-btn");c&&(c.innerHTML='<span uk-icon="icon: eye-slash; ratio: 0.75"></span>')}d.success("SFTP password regenerated"),y.go("site-detail",{id:String(e)})}catch(l){d.error(l.message),n.disabled=!1,n.innerHTML=o}});let a=async()=>(await k.get(`/sites/${e}/sftp-password`))?.password??"",i=n=>{if(navigator.clipboard)navigator.clipboard.writeText(n).then(()=>d.success("Password copied to clipboard")).catch(()=>d.error("Failed to copy password"));else{let o=document.createElement("textarea");o.value=n,o.style.cssText="position:fixed;opacity:0",document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o),d.success("Password copied to clipboard")}};t.querySelector("#sftp-reveal-btn")?.addEventListener("click",async()=>{let n=t.querySelector("#sftp-pass-display"),o=t.querySelector("#sftp-reveal-btn");if(!n)return;if(n.dataset.revealed==="1"){n.textContent="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",n.dataset.revealed="0",o.innerHTML='<span uk-icon="icon: eye; ratio: 0.75"></span>';return}let l=o.innerHTML;o.disabled=!0,o.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{n.textContent=await a(),n.dataset.revealed="1",o.innerHTML='<span uk-icon="icon: eye-slash; ratio: 0.75"></span>'}catch(r){d.error(r.message),o.innerHTML=l}finally{o.disabled=!1}}),t.querySelector("#sftp-copy-btn")?.addEventListener("click",async()=>{let n=t.querySelector("#sftp-copy-btn"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{let l=await a();l&&i(l)}catch(l){d.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),t.querySelector("#pma-open-btn")?.addEventListener("click",async()=>{let n=t.querySelector("#pma-open-btn"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div> Opening...';try{let l=await k.post(`/sites/${e}/pma-token`);window.open(l.url,"_blank")}catch(l){d.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),t.querySelector("#sync-pull-btn")?.addEventListener("click",async()=>{if(await gt("pull",s.Name,t.querySelector('[data-action="manage"][data-id="'+s.ParentID+'"]')?.textContent?.trim()??"parent"))try{d.success("Pull from parent complete")}catch(o){d.error(o.message)}}),t.querySelector("#sync-push-btn")?.addEventListener("click",async()=>{if(await gt("push",s.Name,t.querySelector('[data-action="manage"][data-id="'+s.ParentID+'"]')?.textContent?.trim()??"parent"))try{d.success("Push to parent complete")}catch(o){d.error(o.message)}})}function we(){return`
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
        </div>`}function xe(t="",e="",s=301){return`
        <div class="redirect-row uk-flex uk-flex-middle uk-margin-small-bottom" style="gap:8px">
            <input class="uk-input kp-input redirect-source" type="text" placeholder="/old-path" value="${t}" style="flex:1">
            <input class="uk-input kp-input redirect-target" type="text" placeholder="https://example.com/new-path" value="${e}" style="flex:2">
            <select class="uk-select kp-select redirect-code" style="width:90px">
                <option value="301" ${s===301?"selected":""}>301</option>
                <option value="302" ${s===302?"selected":""}>302</option>
                <option value="307" ${s===307?"selected":""}>307</option>
                <option value="308" ${s===308?"selected":""}>308</option>
            </select>
            <a href="javascript:void(0);" class="kp-muted redirect-remove-btn" uk-icon="trash"></a>
        </div>`}async function Se(t){let e=document.getElementById("redirects-list");if(!e)return;e.innerHTML="";let s=await k.get(`/sites/${t}/redirects`);e.innerHTML=s.map(a=>xe(a.Source,a.Target,a.Code)).join("")}function $e(t,e){let s=new AbortController,a={signal:s.signal};t.addEventListener("click",i=>{i.target.closest("#redirect-add-btn")&&document.getElementById("redirects-list").insertAdjacentHTML("beforeend",xe()),i.target.closest(".redirect-remove-btn")&&i.target.closest(".redirect-row").remove()},a),t.addEventListener("click",async i=>{if(!i.target.closest("#redirect-save-btn"))return;let n=[...document.querySelectorAll(".redirect-row")].map(o=>({Source:o.querySelector(".redirect-source").value.trim(),Target:o.querySelector(".redirect-target").value.trim(),Code:parseInt(o.querySelector(".redirect-code").value,10)}));try{await k.put(`/sites/${e}/redirects`,n),d.success("Redirects saved")}catch(o){d.error(o.message||"Failed to save redirects")}},a),t.__redirectsAbort?.abort(),t.__redirectsAbort=s}var V=[{id:"ab-threshold",key:"threshold",api:"Threshold",mult:1,label:"Error Responses",help:"4xx/5xx responses within the window that trigger the 429."},{id:"ab-window",key:"window_secs",api:"WindowSecs",mult:1,label:"Window (seconds)",help:"Span the error responses are counted over."},{id:"ab-cooldown",key:"cooldown_secs",api:"CooldownSecs",mult:60,label:"429 Cooldown (minutes)",help:"Hitting the limit again during the cooldown converts it to a ban."},{id:"ab-ban",key:"ban_secs",api:"BanSecs",mult:60,label:"Ban Length (minutes)",help:"How long a ban lasts."},{id:"ab-strikes",key:"perm_strikes",api:"PermStrikes",mult:1,label:"Bans Before Permanent",help:"Bans within the strike window that make the ban permanent."},{id:"ab-strike-win",key:"perm_window_secs",api:"PermWindowSecs",mult:3600,label:"Strike Window (hours)",help:"Span the bans are counted over."}],It={id:"ab-escalate",key:"escalate_sites",api:"EscalateSites",mult:1,label:"Sites Before Global Ban",help:"An IP banned on this many sites is banned on all of them."},z=t=>t?`/sites/${t}/security/autoban`:"/security/autoban";function mt(t=null){let e=t?V:[...V,It];return`
        <div id="autoban-panel">

            <div class="kp-card uk-padding-small uk-margin-bottom">
                <ul class="kp-accordion uk-margin-remove" uk-accordion>
                    <li>
                        <a class="uk-accordion-title" href="#"><h3 class="kp-view-title">Auto-Ban Settings</h3></a>
                        <div class="uk-accordion-content">
                            <div class="uk-flex uk-flex-between uk-flex-top uk-margin-small-bottom" style="gap:8px">
                                <p class="kp-muted uk-text-small uk-margin-remove">
                                    ${t?"Counts this site's 4xx/5xx responses per IP. Leave a field blank to inherit the global value shown.":"The global scope counts hits on unregistered domains; per-site counters use these values unless a site overrides them."}
                                    Bypassed and whitelisted IPs are never counted.
                                </p>
                                <button class="uk-button kp-btn-primary kp-btn-sm" id="ab-save" uk-tooltip="Save Auto-Ban Settings">
                                    <span uk-icon="check"></span>
                                </button>
                            </div>
                            ${t?`
                            <div class="uk-margin-small-bottom">
                                <label class="kp-label">
                                    <input class="uk-checkbox" type="checkbox" id="ab-enabled">
                                    &nbsp;Enable auto-ban for this site
                                </label>
                            </div>`:""}
                            <div class="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid>
                                ${e.map(s=>`
                                <div>
                                    <label class="kp-label" for="${s.id}">${s.label}</label>
                                    <input class="uk-input kp-input" id="${s.id}" type="number" min="1" step="1">
                                    <p class="kp-muted uk-text-small uk-margin-small-top">${s.help}</p>
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
        </div>`}function pa(t){if(!t.length)return'<p class="kp-muted uk-text-small uk-margin-remove">No IPs are currently banned.</p>';let e=P();return`
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
            <tbody>${t.map(a=>{let i=!a.Expires;return`
        <tr>
            <td class="kp-mono">${f(a.IP)}</td>
            <td>${a.Hits}</td>
            <td>${a.Strikes}</td>
            <td>${new Date(a.Created).toLocaleString()}</td>
            <td>${i?'<span class="kp-muted">Permanent</span>':new Date(a.Expires).toLocaleString()}</td>
            <td>
                <div class="uk-flex uk-flex-right" style="gap:4px">
                    ${i?"":`
                    <button class="uk-button kp-btn-ghost kp-btn-sm" data-ab-action="permanent" data-id="${a.ID}" uk-tooltip="Ban permanently">
                        <span uk-icon="lock"></span>
                    </button>`}
                    ${e?`
                    <button class="uk-button kp-btn-ghost kp-btn-sm" data-ab-action="allow" data-id="${a.ID}" uk-tooltip="Allow \u2014 add to Security Bypass">
                        <span uk-icon="check"></span>
                    </button>`:""}
                    <button class="uk-button kp-btn-danger kp-btn-sm" data-ab-action="remove" data-id="${a.ID}" uk-tooltip="Remove the ban">
                        <span uk-icon="trash"></span>
                    </button>
                </div>
            </td>
        </tr>`}).join("")}</tbody>
        </table>
        </div>`}async function Ct(t,e){let s=t.querySelector("#ab-list");try{let a=await k.get(z(e));s.innerHTML=pa(a??[])}catch(a){s.innerHTML=`<p class="kp-muted uk-text-small uk-margin-remove">Failed to load bans: ${f(a.message)}</p>`}}async function ma(t,e){try{let s=await k.get(`${z(e)}/settings`),a=e?s.global:s,i=e?s.override:s;(e?V:[...V,It]).forEach(l=>{let r=t.querySelector(`#${l.id}`);r&&(r.placeholder=String(a[l.api]/l.mult),r.value=i[l.api]==null?"":String(i[l.api]/l.mult))});let o=t.querySelector("#ab-enabled");o&&(o.checked=!!s.override?.Enabled)}catch(s){d.error("Failed to load auto-ban settings: "+s.message)}}async function ka(t,e){let s=e?V:[...V,It],a={};for(let i of s){let n=t.querySelector(`#${i.id}`).value.trim();if(n===""){if(!e)throw new Error(`${i.label} is required`);a[i.key]=null;continue}let o=Number(n);if(!Number.isInteger(o)||o<1)throw new Error(`${i.label} must be a whole number above 0`);a[i.key]=o*i.mult}e&&(a.enabled=t.querySelector("#ab-enabled").checked),await k.put(`${z(e)}/settings`,a)}function kt(t,e=null){let s=t.querySelector("#autoban-panel");s&&(s.querySelector("#ab-save")?.addEventListener("click",async a=>{let i=a.currentTarget,n=i.innerHTML;i.disabled=!0,i.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await ka(s,e),d.success("Auto-ban settings saved")}catch(o){d.error(o.message)}finally{i.disabled=!1,i.innerHTML=n}}),s.querySelector("#ab-refresh")?.addEventListener("click",()=>Ct(s,e)),s.querySelector("#ab-list")?.addEventListener("click",async a=>{let i=a.target.closest("[data-ab-action]");if(!i)return;let n=i.dataset.id,o=i.dataset.abAction,l=i.closest("tr")?.querySelector("td")?.textContent??"this IP";try{if(o==="permanent"){if(!await E("Ban Permanently",`Ban ${l} permanently? It stays banned until removed.`))return;await k.post(`${z(e)}/${n}/permanent`),d.success(`${l} banned permanently`)}else if(o==="allow"){if(!await E("Allow IP",`Add ${l} to Security Bypass? It will skip every security check, including the WAF, on all sites.`))return;await k.post(`${z(e)}/${n}/allow`),d.success(`${l} added to Security Bypass`)}else if(o==="remove"){if(!await E("Remove Ban",`Remove the ban on ${l}? Its strike history is cleared too.`))return;await k.delete(`${z(e)}/${n}`),d.success(`Ban on ${l} removed`)}await Ct(s,e)}catch(r){d.error(r.message)}}),ma(s,e),Ct(s,e))}function ba(t){return`
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
            <li>${mt(t)}</li>

        </ul>`}function Bt(t,e,s=null){let a=t.querySelector("#kp-waf-pills"),i=t.querySelector("#kp-waf-switcher");if(!a||!i)return;let n=[...a.querySelectorAll(":scope > li")],o=(l,r)=>{if(UIkit.switcher(i).show(l),n.forEach((b,p)=>b.classList.toggle("kp-pill-active",p===l)),!r)return;let c=n[l].dataset.tab;history.replaceState(null,"",s?`#site-detail/${s}/${c}`:l===0?"#waf":`#waf/${c}`)};n.forEach((l,r)=>{l.querySelector(":scope > a").addEventListener("click",c=>{c.preventDefault(),o(r,!0)})}),o(Math.max(0,n.findIndex(l=>l.dataset.tab===e)),!1)}async function qt(t,e){let s=document.getElementById("waf-tab-panel");if(!s)return;s.innerHTML=ba(t),Bt(s,e,t),kt(s,t);let a=document.getElementById("waf-export-btn");a&&(a.href=`/api/sites/${t}/waf/export`);try{let i=await k.get(`/sites/${t}/waf`),n=document.getElementById("waf-override"),o=document.getElementById("waf-site-exclusions");n&&(n.value=String(i.Override??0)),o&&(o.value=i.Exclusions??"");let l=document.getElementById("waf-plugins-list");if(l){let[r,c]=await Promise.all([k.get("/settings/waf/plugins"),k.get(`/sites/${t}/waf/plugins`)]),b=new Set(c??[]);!r||r.length===0?l.innerHTML='<span class="kp-muted uk-text-small">No plugins found in local CRS install.</span>':window.matchMedia("(max-width: 959px)").matches?l.innerHTML=`
                    <select multiple class="uk-select kp-select waf-plugin-select" size="${Math.min(r.length,8)}">
                        ${r.map(p=>`
                        <option value="${p}" ${b.has(p)?"selected":""}>${p}</option>
                        `).join("")}
                    </select>`:(l.innerHTML=`
                    <div class="waf-plugin-pills">
                        ${r.map(p=>`
                        <span class="waf-plugin-pill ${b.has(p)?"active":""}"
                            data-plugin="${p}">${p}</span>
                        `).join("")}
                    </div>`,l.querySelectorAll(".waf-plugin-pill").forEach(p=>{p.addEventListener("click",()=>p.classList.toggle("active"))}))}}catch(i){d.error("Failed to load WAF settings: "+i.message)}}function Ee(t,e,s){t.addEventListener("submit",async a=>{if(a.target.id!=="waf-override-form")return;a.preventDefault();let i=a.target.querySelector('[type="submit"]'),n=i.innerHTML;i.disabled=!0,i.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let o=new FormData(a.target),l={override:parseInt(o.get("override"),10),exclusions:o.get("exclusions").trim()};try{await k.put(`/sites/${e}/waf`,l);let r=document.querySelector(".waf-plugin-select"),c=r?[...r.selectedOptions].map(b=>b.value):[...document.querySelectorAll(".waf-plugin-pill.active")].map(b=>b.dataset.plugin);await k.put(`/sites/${e}/waf/plugins`,c),d.success("WAF override saved \u2014 engine recompiling in background")}catch(r){d.error(r.message)}finally{i.disabled=!1,i.innerHTML=n}},{signal:s}),t.addEventListener("change",async a=>{if(a.target.id!=="waf-import")return;let i=a.target.files[0];if(!i)return;let n=new FormData;n.append("file",i);try{let o=await fetch(`/api/sites/${e}/waf/import`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:n}),l=o.status===204?null:await o.json().catch(()=>null);if(!o.ok)throw new Error(l?.error||`HTTP ${o.status}`);await qt(e),d.success("WAF settings imported")}catch(o){d.error(o.message)}finally{a.target.value=""}},{signal:s})}var ha=[{label:"Cache Flush",cmd:"cache flush"},{label:"Plugin List",cmd:"plugin list"},{label:"Theme List",cmd:"theme list"},{label:"User List",cmd:"user list"},{label:"Core Check",cmd:"core check-update"},{label:"Core Update",cmd:"core update"},{label:"Plugin Updates",cmd:"plugin update --all"},{label:"Theme Updates",cmd:"theme update --all"},{label:"Rewrite Flush",cmd:"rewrite flush"},{label:"Transient Delete",cmd:"transient delete --all"},{label:"Search Replace",cmd:"search-replace '' ''"}];function Le(t){return`
        <div class="kp-wpcli">
            <div class="kp-log-controls" style="flex-wrap:wrap;gap:6px">
                ${ha.map(e=>`
                   <button class="uk-button kp-btn-ghost kp-btn-sm"
                        data-action="wpcli-quick"
                        data-cmd="${e.cmd}">
                        ${e.label}
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
        </div>`}function Te(t,e){let s=t.querySelector("#wpcli-output"),a=t.querySelector("#wpcli-input"),i=t.querySelector("#wpcli-run"),n=t.querySelector("#wpcli-clear"),o=t.querySelector("#wpcli-status"),l=[],r=-1;function c(u,m=""){u.split(`
`).forEach(h=>{if(!h)return;let v=document.createElement("div");m?v.className=m:v.className=h.match(/error|fatal|critical/i)?"kp-log-line-err":h.match(/warning|warn/i)?"kp-log-line-warn":h.match(/success|done\]/i)?"kp-log-line-info":"",v.textContent=h,s.appendChild(v)}),s.scrollTop=s.scrollHeight}function b(u){if(u=u.trim(),!u)return;l.unshift(u),r=-1,c(`wp> ${u}`,"kp-log-line-info"),a.disabled=!0,i.disabled=!0,o&&(o.textContent="Running...");let m=location.protocol==="https:"?"wss":"ws",h=new WebSocket(`${m}://${location.host}/api/sites/${e}/wpcli`);h.onopen=()=>{h.send(JSON.stringify({command:u}))},h.onmessage=v=>{let g=v.data;if(g.trim()==="[done]"){h.close();return}if(g.startsWith("[info]")){c(g,"kp-muted");return}if(g.startsWith("[error]")){c(g,"kp-log-line-err");return}c(g)},h.onerror=()=>{c("[error] WebSocket connection failed","kp-log-line-err")},h.onclose=()=>{a.disabled=!1,i.disabled=!1,o&&(o.textContent="Ready"),a.focus()}}i.addEventListener("click",()=>{b(a.value),a.value=""}),a.addEventListener("keydown",u=>{if(u.key==="Enter"){b(a.value),a.value="",r=-1;return}if(u.key==="ArrowUp"){u.preventDefault(),r<l.length-1&&(r++,a.value=l[r]);return}u.key==="ArrowDown"&&(u.preventDefault(),r>0?(r--,a.value=l[r]):(r=-1,a.value=""))}),t.querySelectorAll('[data-action="wpcli-quick"]').forEach(u=>{u.addEventListener("click",()=>{let m=u.dataset.cmd;if(m.startsWith("search-replace")){a.value=m,a.focus();let h=m.indexOf("''")+1;a.setSelectionRange(h,h);return}b(m)})}),n.addEventListener("click",()=>{s.innerHTML=""});let p=y.go.bind(y);y.go=function(u,m={}){return p(u,m)},a.focus()}var K=null,A=null;function _e(t,e,s){let a=t.querySelector("#kp-site-pills"),i=t.querySelector("#kp-site-switcher"),n=t.querySelector("#kp-manage-pill"),o=t.querySelector("#kp-manage-dropdown");if(!a||!i)return;let l=["#kp-sec-pills","#kp-waf-pills"].map(u=>t.querySelector(u)).filter(Boolean),r=u=>[...i.children].findIndex(m=>m.contains(u));function c(u,m=!1){UIkit.switcher(i).show(u),a.querySelectorAll(":scope > li[data-pill]").forEach(g=>g.classList.remove("kp-pill-active")),m?(n?.classList.add("kp-pill-active"),o?.querySelectorAll("a[data-switcher]").forEach(g=>{g.classList.toggle("kp-dd-active",parseInt(g.dataset.switcher,10)===u)})):(n?.classList.remove("kp-pill-active"),o?.querySelectorAll("a[data-switcher]").forEach(g=>g.classList.remove("kp-dd-active")));let v=l.find(g=>r(g)===u)?.querySelector(":scope > li.kp-pill-active")?.dataset.tab;history.replaceState(null,"",v?`#site-detail/${e}/${v}`:`#site-detail/${e}`)}a.querySelectorAll(":scope > li[data-pill] > a").forEach(u=>{u.addEventListener("click",m=>{m.preventDefault();let h=parseInt(u.closest("li").dataset.pill,10);c(h,!1)})}),n?.querySelector(".kp-pill-dropdown-btn")?.addEventListener("click",u=>{u.stopPropagation(),o.hidden=!o.hidden,n.classList.toggle("kp-pill-active",!o.hidden)}),o?.querySelectorAll("a[data-switcher]").forEach(u=>{u.addEventListener("click",m=>{m.preventDefault(),o.hidden=!0,c(parseInt(u.dataset.switcher,10),!0)})}),document.addEventListener("click",u=>{o&&!n.contains(u.target)&&(o.hidden=!0)},{capture:!0});let p=s?l.find(u=>[...u.children].some(m=>m.dataset.tab===s)):null;p?c(r(p),!0):UIkit.switcher(i).show(1)}function va(){return`
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
        </div>`}function At(t="",e="",s=!1){return`
        <div class="rp-route-row uk-flex uk-flex-middle uk-margin-small-bottom" style="gap:8px">
            <span>Host:</span><input class="uk-input kp-input" style="flex:1" placeholder="example.com" value="${t}" data-field="domain">
            <span>Upstream:</span><input class="uk-input kp-input" style="flex:2" placeholder="https://10.0.0.1:8080" value="${e}" data-field="upstream">
            <label style="white-space:nowrap;font-size:0.75rem;color:var(--kp-text-dim)" title="Send incoming domain as Host header instead of upstream hostname">
                <input type="checkbox" class="uk-checkbox" data-field="pass_host" ${s?"checked":""}> Pass Host
            </label>
            <button class="uk-button kp-btn-ghost kp-btn-sm rp-remove-row" uk-tooltip="Remove"><span uk-icon="trash"></span></button>
        </div>`}async function ga(t){let e=document.getElementById("rp-routes-list");if(e)try{let s=await k.get(`/sites/${t}/rp-routes`);e.innerHTML=s.length?s.map(a=>At(a.Domain,a.Upstream,a.PassHost)).join(""):At()}catch(s){d.error("Failed to load routes: "+s.message)}}function fa(t,e){t.addEventListener("click",async s=>{if(s.target.closest("#rp-add-row")){document.getElementById("rp-routes-list").insertAdjacentHTML("beforeend",At());return}if(s.target.closest(".rp-remove-row")){s.target.closest(".rp-route-row").remove();return}if(!s.target.closest("#rp-save-btn"))return;let a=s.target.closest("#rp-save-btn"),i=a.innerHTML;a.disabled=!0,a.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let n=[...document.querySelectorAll(".rp-route-row")].map(o=>({Domain:o.querySelector('[data-field="domain"]').value.trim(),Upstream:o.querySelector('[data-field="upstream"]').value.trim(),PassHost:o.querySelector('[data-field="pass_host"]').checked})).filter(o=>o.Domain&&o.Upstream);try{await k.put(`/sites/${e}/rp-routes`,n),d.success("Routes saved")}catch(o){d.error(o.message)}finally{a.disabled=!1,a.innerHTML=i}},{signal:K.signal})}function ya(t){return t.endsWith("-nginx")?"world":t.endsWith("-php")?"code":t.endsWith("-db")?"database":t.endsWith("-redis")?"server":t.endsWith("-varnish")?"grid":t.endsWith("-pma")?"table":t.endsWith("-app")?"laptop":"bolt"}function Pe(t){let e=t.split("-").pop();return{nginx:"Nginx",php:"PHP-FPM",db:"MariaDB",redis:"Redis",varnish:"Varnish",pma:"phpMyAdmin",app:"App"}[e]??e}function Ce(t){switch(t){case"running":return"var(--kp-success)";case"exited":case"stopped":case"dead":return"var(--kp-danger)";case"created":case"configured":case"initialized":case"paused":case"stopping":case"restarting":return"var(--kp-warning)";default:return"var(--kp-text-dim)"}}function wa(t){return!t||!t.length?"":t.filter(e=>!e.name.endsWith("-infra")).map(e=>`
            <span class="kp-health-badge"
                data-container="${f(e.name)}"
                title="Restart the Container"
                style="cursor:pointer;color:${Ce(e.status)}">
                <span uk-icon="icon: ${ya(e.name)}; ratio: 1.1"></span>
                <span class="kp-health-badge-label">${f(Pe(e.name))}</span>
            </span>
        `).join("")}function xa(t,e){A&&(A.close(),A=null);let s=document.getElementById("sd-health-badges");if(!s)return;let a=location.protocol==="https:"?"wss":"ws";A=new WebSocket(`${a}://${location.host}/api/sites/${e}/health/stream`);let i=[],n=()=>{s.innerHTML=wa(i),s.querySelectorAll(".kp-health-badge").forEach(o=>{o.addEventListener("click",async()=>{o.style.color=Ce("restarting");let l=o.dataset.container,r=l.split("-").pop();try{await k.post(`/sites/${e}/containers/${r}/restart`),d.success(`${Pe(l)} restarted`)}catch(c){d.error(c.message)}n()})})};A.onmessage=o=>{try{i=JSON.parse(o.data),n()}catch{}},A.onerror=()=>{},A.onclose=()=>{A=null}}async function Ie(t,{id:e,tab:s}){let[{site:a,domains:i,sftp:n},o,l]=await Promise.all([k.get(`/sites/${e}`),k.get("/sites"),k.get(`/sites/${e}/configs`)]),r=Array.isArray(o)?o:[],c=a.SiteType===1||a.SiteType===2,b=a.SiteType===6,p=[1,2,4,5,7].includes(a.SiteType),u=[1,2,4,5,7].includes(a.SiteType);if(K&&K.abort(),K=new AbortController,t.innerHTML=`
        <div class="kp-view-header">
            <div class="uk-flex uk-flex-middle" style="gap:12px">
                <button class="kp-btn-icon" id="sd-back"><span uk-icon="arrow-left"></span></button>
                <div class="kp-site-nav-wrap">
                    <select id="sd-site-nav" class="uk-select kp-select">
                        ${r.map(v=>`<option value="${v.ID}" ${v.ID===a.ID?"selected":""}>${v.Name}</option>`).join("")}
                    </select>
                    <span class="kp-site-nav-arrow">&#9660;</span>
                </div>
                ${b?"":M(a.SiteStatus)}
            </div>
            <div class="uk-flex" style="gap:8px;flex-wrap:wrap">
                ${b?"":`
                ${a.SiteStatus===1?`<button class="uk-button kp-btn-ghost kp-btn-sm" data-action="stop" data-id="${e}" uk-tooltip="Stop the Site"><span uk-icon="ban"></span></button>`:`<button class="uk-button kp-btn-ghost kp-btn-sm" data-action="start" data-id="${e}" uk-tooltip="Start the Site"><span uk-icon="play"></span></button>`}
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="restart" data-id="${e}" uk-tooltip="Restart the Site"><span uk-icon="refresh"></span></button>
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="flush" data-id="${e}" uk-tooltip="Flush the Caches"><span uk-icon="bolt"></span></button>
                <button class="uk-button kp-btn-ghost kp-btn-sm kp-btn-recreate" id="sd-recreate" uk-tooltip="Recreate &amp; Update the Pod"><span uk-icon="history"></span></button>
                <button class="uk-button kp-btn-ghost kp-btn-sm" id="sd-clone" uk-tooltip="Clone the Site"><span uk-icon="move"></span></button>
                `}
                <button class="uk-button kp-btn-ghost kp-btn-sm" id="sd-rename" uk-tooltip="Rename the Site"><span uk-icon="tag"></span></button>
                <button class="uk-button kp-btn-ghost kp-btn-sm" id="sd-edit" uk-tooltip="Edit the Site"><span uk-icon="pencil"></span></button>
            </div>
        </div>
 
        ${b?`
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
            <li>${va()}</li>
            <li>${yt(e,a.SiteType)}</li>
            <li>${Pt(e,a.SiteType)}</li>
            <li>${G(e)}</li>
            <li id="waf-tab-panel"></li>
            <li>${Lt()}</li>
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
                    ${c?'<a href="#" data-switcher="3"><span uk-icon="icon: code; ratio: 0.85"></span> PHP</a>':""}
                    <a href="#" data-switcher="${c?4:3}"><span uk-icon="icon: database; ratio: 0.85"></span> MariaDB</a>
                    <a href="#" data-switcher="${c?5:4}"><span uk-icon="icon: server; ratio: 0.85"></span> Redis</a>
                    <a href="#" data-switcher="${c?6:5}"><span uk-icon="icon: world; ratio: 0.85"></span> Varnish</a>
                    <hr>
                    <div class="kp-pill-dropdown-section">Security</div>
                    <a href="#" data-switcher="${c?8:7}"><span uk-icon="icon: lock; ratio: 0.85"></span> Security</a>
                    <a href="#" data-switcher="${c?9:8}"><span uk-icon="icon: lifesaver; ratio: 0.85"></span> WAF</a>
                    <a href="#" data-switcher="${c?10:9}"><span uk-icon="icon: user; ratio: 0.85"></span> Basic Auth</a>
                    <hr>
                    <div class="kp-pill-dropdown-section">Tools</div>
                    ${a.SiteType===1?`<a href="#" data-switcher="${c?11:10}"><span uk-icon="icon: file-text; ratio: 0.85"></span> WP-CLI</a>`:""}
                    <a href="#" data-switcher="${a.SiteType===1?c?12:11:c?11:10}"><span uk-icon="icon: history; ratio: 0.85"></span> Backups</a>
                    ${u?'<a href="#" data-switcher="database"><span uk-icon="icon: table; ratio: 0.85"></span> Database</a>':""}
                    ${p?`<a href="#" data-switcher="${a.SiteType===1?c?13:12:c?12:11}"><span uk-icon="icon: clock; ratio: 0.85"></span> Crons</a>`:""}
                    <a href="#" data-switcher="${(a.SiteType===1?c?14:13:c?13:12)-(p?0:1)}"><span uk-icon="icon: forward; ratio: 0.85"></span> Redirects</a>
                    <a href="#" data-switcher="files"><span uk-icon="icon: folder; ratio: 0.85"></span> Files</a>
                </div>
            </li>
            <li data-pill="1"><a href="#">Stats</a></li>
            <li data-pill="${c?7:6}"><a href="#">Logs</a></li>
        </ul>

        <!-- switcher panels (driven by pills above) -->
        <ul class="uk-switcher" id="kp-site-switcher">
            <li>${ve(a,i??[],n,a.ParentID??0,r.find(v=>v.ID===a.ParentID)?.Name??null)}</li>
            <li>${yt(e,a.SiteType)}</li>
            <li>${Z(e,1,l[1])}</li>
            ${c?`<li>${Z(e,2,l[2])}</li>`:""}
            <li>${Z(e,3,l[3])}</li>
            <li>${Z(e,4,l[4])}</li>
            <li>${te(e,l[5])}</li>
            <li>${Pt(e,a.SiteType)}</li>
            <li>${G(e)}</li>
            <li id="waf-tab-panel"></li>
            <li>${Lt()}</li>
            ${a.SiteType===1?`<li>${Le(e)}</li>`:""}
            <li>${Yt(e)}</li>
            ${p?`<li>${se(e)}</li>`:""}
            <li>${we()}</li>
            ${u?`<li>${oe(e)}</li>`:""}
            <li>${pe(e)}</li>
        </ul>`}`,document.getElementById("sd-back").addEventListener("click",()=>y.go("sites")),document.getElementById("sd-edit").addEventListener("click",()=>Xt(a)),document.getElementById("sd-rename").addEventListener("click",async()=>{let v=await Rt(a.Name);if(!(!v||v===a.Name)){S("Renaming Site","Moving the database, files, and pod \u2014 this may take a few minutes...");try{await k.post(`/sites/${e}/rename`,{name:v},18e5),x(),d.success(`Site renamed to '${v}'`),y.go("site-detail",{id:e})}catch(g){x(),d.error(g.message)}}}),document.getElementById("sd-site-nav")?.addEventListener("change",v=>{y.go("site-detail",{id:v.target.value})}),dt(t),ct(t,s),R(t),ke(t,e),Ee(t,e,K.signal),qt(e,s),b){fa(t,e),ga(e),xt(t,e,a.SiteType),St(e,a.SiteType),Tt(t,e),X(e),_e(t,e,s);return}document.getElementById("sd-recreate").addEventListener("click",async()=>{S("Recreating Pod","Recreating containers for this site...");try{await k.post(`/sites/${e}/recreate`,{prune:!0}),x(),d.success("Pod recreated"),y.go("site-detail",{id:e})}catch(v){x(),d.error(v.message)}}),document.getElementById("sd-clone")?.addEventListener("click",async()=>{let v=await Dt(a.Name);if(v){S("Cloning Site","Copying files and database \u2014 this may take a few minutes...");try{await k.post(`/sites/${e}/clone`,{name:v},6e5),x(),d.success(`Site cloned as '${v}'`),y.go("sites")}catch(g){x(),d.error(g.message)}}}),ee(t,e,K.signal),fe(t,e),a.SiteType===1&&Te(t,e),ye(t,e,a),Zt(t,e),j(t,e),p&&(ie(t,e),ut(t,e)),$e(t,e),Se(e);let m=t.querySelector("#kp-site-switcher"),h=t.querySelector('a[data-switcher="files"]');if(m&&h&&(h.dataset.switcher=String(m.children.length-1)),me(t,e),C(e),u){let v=t.querySelector('a[data-switcher="database"]'),g=t.querySelector("#dbtools-panel");m&&v&&g&&(v.dataset.switcher=String([...m.children].findIndex(w=>w.contains(g)))),le(t,e)}xa(t,e),xt(t,e,a.SiteType),St(e,a.SiteType),_e(t,e,s),Tt(t,e),X(e),he(i??[])}async function bt(t){let e=document.getElementById("totp-qr-img"),s=document.getElementById("totp-qr-wrap");if(!e||!s)return;if(s.querySelectorAll(".totp-uri-text").forEach(i=>i.remove()),typeof QRCode<"u")try{let i=await new Promise((n,o)=>{QRCode.toDataURL(t,{width:220,margin:2},(l,r)=>{l?o(l):n(r)})});e.src=i,e.style.display="";return}catch{}let a=document.createElement("p");a.className="totp-uri-text kp-muted uk-text-small",a.style.wordBreak="break-all",a.textContent=t,s.appendChild(a)}function ht(t){document.getElementById("kp-backup-codes-modal")?.remove();let s=`
        <div id="kp-backup-codes-modal" uk-modal="bg-close:false;esc-close:false">
            <div class="uk-modal-dialog kp-modal uk-modal-body" style="max-width:480px">
                <h3 class="uk-modal-title" style="color:var(--kp-yellow,#f0b429)">
                    <span uk-icon="warning"></span>&nbsp;Save Your Backup Codes
                </h3>
                <p class="kp-muted uk-text-small uk-margin-small-bottom">
                    These codes let you access your account if you lose your authenticator.
                    Each code works <strong>once only</strong>. Keep them somewhere safe.
                </p>
                <div class="kp-backup-codes-grid uk-margin-small">${t.map(i=>`<code class="kp-backup-code">${i}</code>`).join("")}</div>
                <p class="kp-muted uk-text-small uk-margin-small-top">
                    These codes will <strong>not</strong> be shown again.
                </p>
                <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                    <button id="kp-backup-copy-btn" class="uk-button kp-btn-ghost">Copy All</button>
                    <button id="kp-backup-done-btn" class="uk-button kp-btn-primary">I've Saved These</button>
                </div>
            </div>
        </div>`;document.body.insertAdjacentHTML("beforeend",s);let a=UIkit.modal("#kp-backup-codes-modal");a.show(),document.getElementById("kp-backup-copy-btn").addEventListener("click",()=>{let i=t.join(`
`),n=document.getElementById("kp-backup-copy-btn");if(navigator.clipboard)navigator.clipboard.writeText(i).then(()=>{n.textContent="Copied!"});else{let o=document.createElement("textarea");o.value=i,o.style.cssText="position:fixed;opacity:0",document.body.appendChild(o),o.select();try{document.execCommand("copy"),n.textContent="Copied!"}catch{}o.remove()}}),document.getElementById("kp-backup-done-btn").addEventListener("click",()=>{a.hide(),document.getElementById("kp-backup-codes-modal")?.remove(),y.go("users")})}function Be(t){document.body.insertAdjacentHTML("beforeend",`
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
        </div>`);let s=UIkit.modal("#kp-create-user-modal");s.show(),document.getElementById("create-user-form").addEventListener("submit",async a=>{a.preventDefault();let i=a.target.querySelector('[type="submit"]'),n=i.innerHTML;i.disabled=!0,i.innerHTML='<div uk-spinner="ratio: 0.6"></div> Creating...';let o=new FormData(a.target),l={fname:o.get("fname").trim(),lname:o.get("lname").trim(),uname:o.get("uname").trim(),email:o.get("email").trim(),phone:o.get("phone").trim(),password:o.get("password"),role:parseInt(o.get("role")),notify_email:o.get("notify_email")==="on",notify_sms:o.get("notify_sms")==="on"};try{let r=F(await k.post("/users",l));document.getElementById("users-table-body").insertAdjacentHTML("beforeend",Mt(r)),d.success(`User '${r.uname}' created`),document.getElementById("create-user-form").style.display="none",document.getElementById("cu-totp-section").style.display="",Sa(r.id,s)}catch(r){d.error(r.message),i.disabled=!1,i.innerHTML=n}}),document.getElementById("kp-create-user-modal").addEventListener("hidden",()=>document.getElementById("kp-create-user-modal")?.remove())}function Sa(t,e){let s=()=>{e.hide(),document.getElementById("kp-create-user-modal")?.remove(),y.go("users")};document.getElementById("cu-totp-skip-btn").addEventListener("click",s),document.getElementById("cu-totp-setup-btn").addEventListener("click",async()=>{let a=document.getElementById("cu-totp-setup-btn");a.disabled=!0,a.textContent="Setting up\u2026";try{let i=await k.post(`/users/${t}/totp/setup`,{});document.getElementById("totp-secret-text").textContent=i.secret,document.getElementById("totp-setup-area").style.display="",document.getElementById("cu-totp-skip-btn").style.display="none",await bt(i.uri)}catch(i){d.error(i.message),a.disabled=!1,a.textContent="Enable TOTP"}}),document.getElementById("cu-totp-confirm-btn").addEventListener("click",async()=>{let a=document.getElementById("totp-confirm-code").value.trim();if(a.length!==6){d.error("Enter a 6-digit code");return}let i=document.getElementById("cu-totp-confirm-btn");i.disabled=!0;try{let n=await k.post(`/users/${t}/totp/confirm`,{code:a});e.hide(),document.getElementById("kp-create-user-modal")?.remove(),d.success("TOTP enabled"),n.backup_codes?.length?ht(n.backup_codes):y.go("users")}catch(n){d.error(n.message),i.disabled=!1}})}async function qe(t,e){document.getElementById("kp-edit-user-modal")?.remove();let s;try{s=F(await k.get(`/users/${e}`))}catch(b){d.error(b.message);return}let a=window.KP?.user?.role===99,i=Number(e)===Number(window.KP?.user?.id),n=`
        <div id="kp-edit-user-modal" uk-modal>
            <div class="uk-modal-dialog kp-modal uk-modal-body uk-width-large">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <h3 class="kp-view-title">Edit User \u2014 ${s.uname}</h3>
                <form id="edit-user-form" class="uk-form-stacked uk-margin-top">
                    <div class="uk-grid-small" uk-grid>
                        ${a?`
                        <div class="uk-width-1-1">
                            <label class="kp-label">Username</label>
                            <input class="uk-input kp-input" name="uname" type="text" value="${f(s.uname)}" autocomplete="off">
                        </div>`:""}
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">First Name</label>
                            <input class="uk-input kp-input" name="fname" type="text" value="${f(s.fname)}" required>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Last Name</label>
                            <input class="uk-input kp-input" name="lname" type="text" value="${f(s.lname)}" required>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Email</label>
                            <input class="uk-input kp-input" name="email" type="email" value="${f(s.email)}" required>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Phone</label>
                            <input class="uk-input kp-input" name="phone" type="tel" value="${f(s.phone||"")}" required>
                        </div>
                        <div class="uk-width-1-1">
                            <label class="kp-label uk-margin-small-bottom">Notifications</label>
                            <div class="uk-flex" style="gap:24px">
                                <label><input class="uk-checkbox" type="checkbox" name="notify_email" ${s.notify_email?"checked":""}> &nbsp;Email</label>
                                <label><input class="uk-checkbox" type="checkbox" name="notify_sms" ${s.notify_sms?"checked":""}> &nbsp;SMS</label>
                            </div>
                        </div>
                        ${a?`
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Role</label>
                            <select class="uk-select kp-select" name="role">
                                <option value="50" ${s.role===50?"selected":""}>Manager</option>
                                <option value="99" ${s.role===99?"selected":""}>Admin</option>
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
                    ${s.totp_enabled?`<div class="uk-flex uk-flex-middle" style="gap:12px">
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
        </div>`;document.body.insertAdjacentHTML("beforeend",n);let o=UIkit.modal("#kp-edit-user-modal");o.show(),document.getElementById("edit-user-form").addEventListener("submit",async b=>{b.preventDefault();let p=b.target.querySelector('[type="submit"]'),u=p.innerHTML;p.disabled=!0,p.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let m=new FormData(b.target),h={fname:m.get("fname").trim(),lname:m.get("lname").trim(),email:m.get("email").trim(),phone:m.get("phone").trim(),notify_email:m.get("notify_email")==="on",notify_sms:m.get("notify_sms")==="on"};if(a){h.role=parseInt(m.get("role"));let g=m.get("uname");g&&(h.uname=g.trim())}let v=m.get("password");v&&(h.password=v),v&&i&&(h.current_password=m.get("current_password"));try{await k.put(`/users/${e}`,h),o.hide(),document.getElementById("kp-edit-user-modal")?.remove(),d.success("User updated"),y.go("users")}catch(g){d.error(g.message),p.disabled=!1,p.innerHTML=u}});let l=document.getElementById("totp-setup-btn");l&&l.addEventListener("click",async()=>{l.disabled=!0,l.textContent="Setting up\u2026";try{let b=await k.post(`/users/${e}/totp/setup`,{});document.getElementById("totp-secret-text").textContent=b.secret,document.getElementById("totp-setup-area").style.display="",await bt(b.uri)}catch(b){d.error(b.message),l.disabled=!1,l.textContent="Enable TOTP"}});let r=document.getElementById("totp-confirm-btn");r&&r.addEventListener("click",async()=>{let b=document.getElementById("totp-confirm-code").value.trim();if(b.length!==6){d.error("Enter a 6-digit code");return}r.disabled=!0;try{let p=await k.post(`/users/${e}/totp/confirm`,{code:b});o.hide(),document.getElementById("kp-edit-user-modal")?.remove(),d.success("TOTP enabled"),p.backup_codes?.length?ht(p.backup_codes):y.go("users")}catch(p){d.error(p.message),r.disabled=!1}});let c=document.getElementById("totp-disable-btn");c&&c.addEventListener("click",async()=>{c.disabled=!0;try{await k.delete(`/users/${e}/totp`),d.success("TOTP disabled"),o.hide(),document.getElementById("kp-edit-user-modal")?.remove(),y.go("users")}catch(b){d.error(b.message),c.disabled=!1}}),document.getElementById("kp-edit-user-modal").addEventListener("hidden",()=>document.getElementById("kp-edit-user-modal")?.remove())}async function Ae(t){if(!P()){t.innerHTML=T("Access denied");return}let e=await k.get("/users");t.innerHTML=`
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
                    ${e.map(s=>Mt(F(s))).join("")}
                </tbody>
            </table>
            </div>
        </div>`,document.getElementById("users-new-btn").addEventListener("click",()=>Be(t)),$a(t)}function Mt(t){let e=t.role===99?'<span class="kp-badge kp-badge-admin">Admin</span>':'<span class="kp-badge kp-badge-manager">Manager</span>',s=[t.notify_email?'<span uk-icon="icon: mail; ratio: 0.85" uk-tooltip="Email notifications on" style="color:var(--kp-success)"></span>':'<span uk-icon="icon: mail; ratio: 0.85" style="color:var(--kp-text-dim)" uk-tooltip="Email notifications off"></span>',t.notify_sms?'<span uk-icon="icon: receiver; ratio: 0.85" uk-tooltip="SMS notifications on" style="color:var(--kp-success)"></span>':'<span uk-icon="icon: receiver; ratio: 0.85" style="color:var(--kp-text-dim)" uk-tooltip="SMS notifications off"></span>'].join(" ");return`<tr data-user-id="${t.id}">
        <td><strong>${f(t.fname)} ${f(t.lname)}</strong></td>
        <td><span style="font-family:monospace">${f(t.uname)}</span></td>
        <td>${f(t.email)}</td>
        <td>${e}</td>
        <td class="uk-text-center">${t.totp_enabled?'<span uk-icon="icon: check; ratio: 0.9" style="color:var(--kp-success)"></span>':'<span uk-icon="icon: close; ratio: 0.9" style="color:var(--kp-text-dim)"></span>'}</td>
        <td class="uk-text-center">${s}</td>
        <td><span class="kp-muted">${f(t.created)}</span></td>
        <td>
            <div class="uk-flex" style="gap:6px;justify-content:flex-end">
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="edit-user" data-uid="${t.id}" title="Edit" uk-tooltip="Edit the User">
                    <span uk-icon="icon: pencil;"></span>
                </button>
                <button class="uk-button kp-btn-secondary kp-btn-sm" data-action="delete-user" data-uid="${t.id}" title="Delete" uk-tooltip="Delete the User">
                    <span uk-icon="icon: trash;"></span>
                </button>
            </div>
        </td>
    </tr>`}function $a(t){t.addEventListener("click",async e=>{let s=e.target.closest('[data-action="delete-user"]');if(!(!s||!await E("Delete User","Delete this user? This cannot be undone.")))try{await k.delete(`/users/${s.dataset.uid}`),s.closest("tr").remove(),d.success("User deleted")}catch(i){d.error(i.message)}}),t.addEventListener("click",async e=>{let s=e.target.closest('[data-action="edit-user"]');s&&qe(t,s.dataset.uid)})}async function Me(t,e={}){if(!P()){t.innerHTML=T("Access denied");return}t.innerHTML=`
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
            <li>${mt()}</li>

        </ul>`,Ea(t),Bt(t,e.tab),De(t),kt(t)}async function De(t){try{let e=await k.get("/settings/waf");if(!t.querySelector("#sec-waf-enabled"))return;t.querySelector("#sec-waf-enabled").checked=!!e.Enabled,t.querySelector("#sec-waf-audit").checked=!!e.AuditLog,t.querySelector("#sec-waf-mode").value=String(e.Mode??0),t.querySelector("#sec-waf-paranoia").value=String(e.ParanoiaLevel??1),t.querySelector("#sec-waf-exclusions").value=e.Exclusions??""}catch(e){d.error("Failed to load WAF settings: "+e.message)}}function Ea(t){t.querySelector("#sec-waf-save")?.addEventListener("click",async()=>{let e=t.querySelector("#sec-waf-save"),s=e.innerHTML;e.disabled=!0,e.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.put("/settings/waf",{enabled:t.querySelector("#sec-waf-enabled").checked,mode:parseInt(t.querySelector("#sec-waf-mode").value,10),paranoia_level:parseInt(t.querySelector("#sec-waf-paranoia").value,10),audit_log:t.querySelector("#sec-waf-audit").checked,exclusions:t.querySelector("#sec-waf-exclusions").value.trim()}),d.success("WAF settings saved \u2014 engine recompiling in background")}catch(a){d.error(a.message)}finally{e.disabled=!1,e.innerHTML=s}}),t.querySelector("#sec-waf-import")?.addEventListener("change",async e=>{let s=e.target.files[0];if(!s)return;let a=new FormData;a.append("file",s);try{let i=await fetch("/api/settings/waf/import",{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:a}),n=i.status===204?null:await i.json().catch(()=>null);if(!i.ok)throw new Error(n?.error||`HTTP ${i.status}`);await De(t),d.success("WAF settings imported")}catch(i){d.error(i.message)}finally{e.target.value=""}})}y.register("dashboard",t=>Vt(t));y.register("sites",t=>Ot(t));y.register("site-detail",(t,e)=>Ie(t,e));y.register("users",t=>Ae(t));y.register("settings",(t,e)=>Et(t,e));y.register("security",(t,e)=>Kt(t,e));y.register("waf",(t,e)=>Me(t,e));y.register("admin-logs",t=>Ht(t));y.register("audit-log",t=>Wt(t));document.addEventListener("keydown",t=>{let e=t.target;e?.matches?.("input, textarea, select, [contenteditable='true']")&&(e.closest?.(".CodeMirror")||e.id==="wpcli-input"&&(t.key==="ArrowUp"||t.key==="ArrowDown")||["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key)&&t.stopPropagation())},!0);document.addEventListener("click",t=>{let e=t.target.closest("[data-view]");e&&(t.preventDefault(),y.go(e.dataset.view))});document.addEventListener("click",async t=>{let e=t.target.closest("[data-action]");if(!e)return;t.stopPropagation();let{action:s,id:a}=e.dataset;switch(s){case"manage":y.go("site-detail",{id:a});break;case"start":await vt(a,"start","Starting Site","Starting all containers - please wait...");break;case"stop":await vt(a,"stop","Stopping Site","Gracefully stopping all containers - please wait...");break;case"restart":await vt(a,"restart","Restarting Site","Restarting all containers - please wait...");break;case"flush":await vt(a,"flush","Flushing Caches","Clearing container caches - please wait...");break;case"delete":await La(a);break;case"recreate":S("Recreating Pod","Recreating containers for this site - this may take a few minutes...");try{await k.post(`/sites/${a}/recreate`,{prune:!0}),x(),d.success("Pod recreated"),y.go("sites")}catch(i){x(),d.error(i.message)}break}});document.addEventListener("kp:bulk-action",async t=>{let{action:e,ids:s}=t.detail;if(!s.length)return;let a={start:"Starting",stop:"Stopping",restart:"Restarting",flush:"Flushing Caches",recreate:"Recreating"},i=e==="recreate"?"Please hold while we update your Pods":"Please wait...",n=e==="recreate"?{prune:!0}:void 0,o=e==="recreate"?1200*1e3:void 0;S(`${a[e]} ${s.length} Site${s.length!==1?"s":""}`,i);let l=await Promise.allSettled(s.map(c=>k.post(`/sites/${c}/${e}`,n,o)));x();let r=l.filter(c=>c.status==="rejected").length;r===0?d.success(`${e.charAt(0).toUpperCase()+e.slice(1)} complete for ${s.length} site${s.length!==1?"s":""}`):d.error(`${r} of ${s.length} sites failed \u2014 check logs`),["start","stop","restart","recreate"].includes(e)&&y.go("sites")});async function vt(t,e,s,a){S(s,a);try{if(await k.post(`/sites/${t}/${e}`),x(),d.success(s+" complete"),e!=="flush"){let{view:i,params:n}=nt();y.go(i,n)}}catch(i){x(),d.error(i.message)}}async function La(t){if(!await E("Delete Site",`This will stop and permanently remove the pod and all its data. Are you sure?

A final backup will be created before deletion. This may take a moment.`))return;S("Deleting Site","Creating final backup and removing the pod \u2014 please wait...");let s;try{s=await fetch(`/api/sites/${t}`,{method:"DELETE",headers:{"X-CSRF-Token":window.KP?.csrf??""}})}catch{}if(x(),s?.ok&&s.headers.get("Content-Type")?.includes("gzip")){let o=(s.headers.get("Content-Disposition")??"").match(/filename="([^"]+)"/)?.[1]??`${t}_final.tar.gz`,l=await s.blob(),r=document.createElement("a");r.href=URL.createObjectURL(l),r.download=o,r.click(),URL.revokeObjectURL(r.href),d.success("Site deleted. Final backup downloaded."),y.go("sites");return}let a=!1,i=0;for(;!a&&i<10;){try{await new Promise(o=>setTimeout(o,2e3)),a=!(await k.get("/sites")).find(o=>o.ID===parseInt(t))}catch{}i++}a?(d.success("Site deleted. Final backup saved to S3."),y.go("sites")):d.error("Delete failed - site still exists after 20s")}if(window.KP?.user?.role===99){let t=document.getElementById("kp-resource-warning"),e=document.getElementById("kp-resource-warning-msg"),s=async()=>{try{let a=await k.get("/settings/resource-warning");a?.active&&t&&e?(e.textContent=`${a.current_mb}MB used, threshold ${a.threshold_mb}MB \u2014 throttling ${a.offender}.`,t.style.display=""):t&&(t.style.display="none")}catch{}};s(),setInterval(s,3e4)}window.addEventListener("hashchange",()=>{if(y._ownHashChange)return;let{view:t,params:e}=nt();y.go(t,e)});(()=>{let t=document.getElementById("kp-totop");if(!t)return;let e=()=>{t.classList.toggle("is-visible",window.scrollY>150)};window.addEventListener("scroll",e,{passive:!0}),e(),t.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})})();(()=>{let t=document.querySelectorAll(".kp-logout-link");t.length&&t.forEach(e=>{e.addEventListener("click",async s=>{s.preventDefault(),await fetch("/logout",{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""}}),window.location.href="/login"})})})();var{view:Ta,params:_a}=nt();y.go(Ta,_a);})();
