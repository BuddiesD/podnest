/*! PodNest - Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com> | MIT License */

"use strict";(()=>{var k={async _req(e,t,s,a=6e4){let i=new AbortController,n=setTimeout(()=>i.abort(),a),o={method:e,headers:{"Content-Type":"application/json"},signal:i.signal};e!=="GET"&&e!=="HEAD"&&(o.headers["X-CSRF-Token"]=window.KP?.csrf??""),s!==void 0&&(o.body=JSON.stringify(s));try{let l=await fetch("/api"+t,o);clearTimeout(n);let r=l.status===204?null:await l.json().catch(()=>null);if(l.status===401)return window.location.href="/login?msg=Your+session+has+expired+%E2%80%94+please+log+in+again",null;if(!l.ok)throw new Error(r?.error||`HTTP ${l.status}`);return r}catch(l){throw clearTimeout(n),l}},get:e=>k._req("GET",e),post:(e,t,s)=>k._req("POST",e,t,s),put:(e,t,s)=>k._req("PUT",e,t,s),delete:e=>k._req("DELETE",e),patch:(e,t)=>k._req("PATCH",e,t)};var f=e=>String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");function L(e){return e===0?"0 B":e<1024?`${e} B`:e<1048576?`${(e/1024).toFixed(1)} KB`:e<1073741824?`${(e/1048576).toFixed(1)} MB`:`${(e/1073741824).toFixed(2)} GB`}var ae=()=>'<div class="kp-spinner"><div uk-spinner="ratio: 1.25"></div></div>',T=e=>`<div class="kp-empty">
        <div class="kp-empty-icon" uk-icon="icon: warning; ratio: 2.5"></div>
        <div class="kp-empty-text">${e}</div>
    </div>`,se=(e,t)=>`<div class="kp-empty">
        <div class="kp-empty-icon" uk-icon="icon: ${e}; ratio: 2.5"></div>
        <div class="kp-empty-text">${t}</div>
    </div>`,M=e=>{let t={1:["running","Running"],2:["stopped","Stopped"],3:["restarting","Restarting"],4:["error","Error"]},[s,a]=t[e]||["stopped","Unknown"];return`<span class="kp-status kp-status-${s}">${a}</span>`},Nt=e=>({3:"8.2",4:"8.3",5:"8.4",6:"8.5"})[e]||"?",J=e=>({1:"WordPress",2:"PHP",3:"Static",4:"Node.js",5:".NET",6:"Reverse Proxy",7:"Python"})[e]||"?",_=()=>window.KP.user.role===window.KP.roles.admin,D=e=>{switch(e.SiteType){case 1:case 2:return`PHP ${Nt(e.PHPVersion)}`;case 4:return`Node ${{2:"22",4:"24",5:"25",6:"26"}[e.RuntimeVersion]||"?"}`;case 5:return`.NET ${{1:"8.0",2:"9.0",3:"10.0"}[e.RuntimeVersion]||"?"}`;case 7:return`Python ${{1:"3.11",2:"3.12",3:"3.13",4:"3.14"}[e.RuntimeVersion]||"?"}`;case 6:return"Reverse Proxy";default:return""}},F=e=>({id:e.id??e.ID,uname:e.uname??e.UName,uhash:e.uhash??e.UHash,fname:e.fname??e.FName,lname:e.lname??e.LName,email:e.email??e.Email,phone:e.phone??e.Phone,role:e.role??e.Role,totp_enabled:e.totp_enabled??!1,notify_email:e.notify_email??!1,notify_sms:e.notify_sms??!1,created:e.created??e.Created});function E(e,t){return new Promise(s=>{document.getElementById("kp-confirm-title").textContent=e,document.getElementById("kp-confirm-message").textContent=t;let a=UIkit.modal("#kp-confirm-modal");document.getElementById("kp-confirm-ok").addEventListener("click",()=>{a.hide(),s(!0)},{once:!0}),a.show(),document.getElementById("kp-confirm-modal").addEventListener("hidden",()=>s(!1),{once:!0})})}function S(e,t){let s=`
        <div id="kp-progress-modal" uk-modal="bg-close: false; esc-close: false; keyboard: false">
            <div class="uk-modal-dialog kp-modal uk-modal-body uk-text-center" style="max-width:420px">
                <div uk-spinner="ratio: 1.5" style="color:var(--kp-blue)"></div>
                <h3 class="uk-modal-title uk-margin-small-top" id="kp-progress-title">${e}</h3>
                <p class="kp-muted uk-text-small" id="kp-progress-message">${t}</p>
                <p class="kp-muted">
                    This may take several minutes while the task(s) complete, make sure to keep screen open until it has completed.
                </p>
            </div>
        </div>`;document.body.insertAdjacentHTML("beforeend",s),UIkit.modal("#kp-progress-modal").show()}function w(){let e=document.getElementById("kp-progress-modal");e&&(UIkit.modal(e).hide(),setTimeout(()=>e.remove(),300))}function Re(e){return new Promise(t=>{let s="kp-clone-modal",a=`
            <div id="${s}" uk-modal>
                <div class="uk-modal-dialog kp-modal uk-modal-body" style="max-width:420px">
                    <h3 class="uk-modal-title">Clone Site</h3>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">
                        Enter a name for the clone of <strong>${e}</strong>.
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
            </div>`;document.body.insertAdjacentHTML("beforeend",a);let i=UIkit.modal(`#${s}`),n=document.getElementById("kp-clone-name"),o=document.getElementById("kp-clone-ok"),l=document.getElementById("kp-clone-cancel"),r=d=>{i.hide(),setTimeout(()=>document.getElementById(s)?.remove(),300),t(d)};o.addEventListener("click",()=>r(n.value.trim()||null),{once:!0}),l.addEventListener("click",()=>r(null),{once:!0}),document.getElementById(s).addEventListener("hidden",()=>r(null),{once:!0}),i.show(),setTimeout(()=>n.focus(),150),n.addEventListener("keydown",d=>{d.key==="Enter"&&o.click()})})}function He(e){return new Promise(t=>{let s="kp-rename-modal",a=`
            <div id="${s}" uk-modal>
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
            </div>`;document.body.insertAdjacentHTML("beforeend",a);let i=UIkit.modal(`#${s}`),n=document.getElementById("kp-rename-name"),o=document.getElementById("kp-rename-ok"),l=document.getElementById("kp-rename-cancel"),r=d=>{i.hide(),setTimeout(()=>document.getElementById(s)?.remove(),300),t(d)};o.addEventListener("click",()=>r(n.value.trim()||null),{once:!0}),l.addEventListener("click",()=>r(null),{once:!0}),document.getElementById(s).addEventListener("hidden",()=>r(null),{once:!0}),i.show(),setTimeout(()=>n.focus(),150),n.addEventListener("keydown",d=>{d.key==="Enter"&&o.click()})})}function ge(e,t,s){return new Promise(a=>{let i="kp-sync-modal",n=e==="pull",o=n?"Pull From Parent":"Push To Parent",l=n?"cloud-download":"cloud-upload",r=n?s:t,d=n?t:s,b=`
            <div id="${i}" uk-modal>
                <div class="uk-modal-dialog kp-modal uk-modal-body" style="max-width:460px">
                    <h3 class="uk-modal-title">${o}</h3>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">
                        This will overwrite all files and database content on
                        <strong>${d}</strong> with data from <strong>${r}</strong>.
                        This action cannot be undone.
                    </p>
                    <p class="kp-muted uk-text-small" style="color:var(--kp-red, #e05c5c)">
                        <span uk-icon="icon: warning; ratio: 0.85"></span>
                        <strong>${d}</strong> will be temporarily unavailable during the sync.
                    </p>
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button class="uk-button kp-btn-ghost uk-modal-close" id="kp-sync-cancel">Cancel</button>
                        <button class="uk-button kp-btn-primary" id="kp-sync-ok">
                            <span uk-icon="${l}"></span> ${o}
                        </button>
                    </div>
                </div>
            </div>`;document.body.insertAdjacentHTML("beforeend",b);let p=UIkit.modal(`#${i}`),u=document.getElementById("kp-sync-ok"),m=document.getElementById("kp-sync-cancel"),h=v=>{p.hide(),setTimeout(()=>document.getElementById(i)?.remove(),300),a(v)};u.addEventListener("click",()=>h(!0),{once:!0}),m.addEventListener("click",()=>h(!1),{once:!0}),document.getElementById(i).addEventListener("hidden",()=>h(!1),{once:!0}),p.show()})}var y={routes:{},_ownHashChange:!1,register(e,t){this.routes[e]=t},async go(e,t={}){let s=Object.keys(t).length?e+"/"+Object.values(t).join("/"):e;this._ownHashChange=!0,window.location.hash=s,setTimeout(()=>{this._ownHashChange=!1},0),document.querySelectorAll(".kp-nav-link").forEach(n=>{n.classList.toggle("kp-active",n.dataset.view===e)}),document.querySelectorAll(".kp-bn-item[data-view]").forEach(n=>{n.classList.toggle("kp-active",n.dataset.view===e)});let a=this.routes[e];if(!a)return;let i=document.getElementById("kp-view");i.innerHTML=ae();try{await a(i,t)}catch(n){i.innerHTML=T(n.message)}}};function ne(){let t=(window.location.hash.replace("#","")||"dashboard").split("/"),s=t[0],a={};return s==="site-detail"&&t[1]&&(a.id=t[1]),s==="settings"&&t[1]&&(a.tab=t[1]),s==="site-detail"&&t[2]&&(a.tab=t[2]),s==="security"&&t[1]&&(a.tab=t[1]),s==="waf"&&t[1]&&(a.tab=t[1]),{view:s,params:a}}var c={show(e,t="info",s=7e3){let a={success:"check",error:"warning",info:"info"},i=document.createElement("div");i.className=`kp-toast kp-toast-${t}`,i.innerHTML=`<span uk-icon="${a[t]||"info"}"></span><span>${f(e)}</span>`,document.getElementById("kp-toasts").appendChild(i),UIkit.icon(i.querySelector("[uk-icon]")),setTimeout(()=>i.remove(),s)},success:e=>c.show(e,"success"),error:e=>c.show(e,"error"),info:e=>c.show(e,"info")};var Wt=2e3;function jt(){return`
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
        </div>`}function Ot(e){let t=null,s=!1,a=e.querySelector("#admin-log-output"),i=e.querySelector("#admin-log-connect"),n=e.querySelector("#admin-log-disconnect"),o=e.querySelector("#admin-log-clear"),l=e.querySelector("#admin-log-autoscroll"),r=e.querySelector("#admin-log-status");function d(u){for(u.split(`
`).forEach(m=>{if(!m)return;let h=document.createElement("div");h.className=m.match(/WAF BLOCK/i)?"kp-log-line-err":m.match(/WAF DETECT/i)?"kp-log-line-warn":m.match(/error|crit|emerg/i)?"kp-log-line-err":m.match(/warn/i)?"kp-log-line-warn":m.match(/info|notice/i)?"kp-log-line-info":"",h.textContent=m,a.appendChild(h)});a.childElementCount>Wt;)a.removeChild(a.firstChild);l.checked&&(a.scrollTop=a.scrollHeight)}function b(){t&&(t.close(),t=null),s=!1,i.disabled=!1,n.disabled=!0,r&&(r.textContent="Disconnected")}i.addEventListener("click",()=>{b();let u=e.querySelector("#admin-log-source").value,m=e.querySelector("#admin-log-tail").value,h=location.protocol==="https:"?"wss":"ws",v=u==="waf"?`${h}://${location.host}/api/logs/waf?tail=${m}`:`${h}://${location.host}/api/logs/proxy?tail=${m}`;t=new WebSocket(v),t.onopen=()=>{s=!0,i.disabled=!0,n.disabled=!1,r&&(r.textContent=`Connected \u2014 ${u==="waf"?"WAF Log":"Proxy Access Log"}`)},t.onmessage=g=>d(g.data),t.onerror=()=>{},t.onclose=()=>{s=!1,i.disabled=!1,n.disabled=!0,r&&(r.textContent="Disconnected")}}),n.addEventListener("click",b),o.addEventListener("click",()=>{a.innerHTML=""}),e.querySelector("#admin-log-source").addEventListener("change",()=>{t&&t.readyState===WebSocket.OPEN&&(b(),i.click())});let p=y.go.bind(y);y.go=function(u,m={}){return t&&b(),p(u,m)}}function Fe(e){e.innerHTML=jt(),Ot(e)}var oe=50;function zt(e,t,s){let a=Math.max(1,Math.ceil(e.total/oe)),i=(e.entries??[]).map(Ue).join("")||'<tr><td colspan="8" class="uk-text-center" style="color:var(--kp-text-dim)">No records found</td></tr>';return`
        <div id="audit-log-panel">
            <div class="kp-view-header">
                <h1 class="kp-view-title" style="font-size:2rem;">Audit Log</h1>
            </div>

            <div class="kp-card uk-padding-small uk-margin-bottom">
                <div class="uk-flex uk-flex-middle uk-flex-wrap kp-filter-bar">
                    <input class="uk-input kp-input" id="al-filter-user" type="text"
                        placeholder="Username" value="${P(t.username)}">
                    <input class="uk-input kp-input" id="al-filter-action" type="text"
                        placeholder="Action" value="${P(t.action)}">
                    <input class="uk-input kp-input" id="al-filter-target" type="text"
                        placeholder="Target type" value="${P(t.target_type)}">
                    <input class="uk-input kp-input" id="al-filter-date-from" type="date"
                        value="${P(t.date_from)}">
                    <input class="uk-input kp-input" id="al-filter-date-to" type="date"
                        value="${P(t.date_to)}">
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

            ${a>1?`<div id="al-pager">${Ne(s,a)}</div>`:'<div id="al-pager"></div>'}
        </div>`}function Ue(e){let t=new Date(e.ts).toLocaleString(),s=e.username?`<span style="font-family:monospace">${P(e.username)}</span>`:'<span style="color:var(--kp-text-dim)">\u2014</span>',a=Vt(e.status),n=e.prior_state||e.new_state?`<button class="uk-button kp-btn-ghost kp-btn-sm al-diff-btn"
                data-prior="${P(e.prior_state)}" data-new="${P(e.new_state)}">
               <span uk-icon="icon: git-fork; ratio: 0.85"></span>
           </button>`:"<span>\u2014</span>",o=e.details?`<button class="uk-button kp-btn-ghost kp-btn-sm al-diff-btn"
                data-prior="" data-new="${P(e.details)}">
               <span uk-icon="icon: info; ratio: 0.85"></span>
           </button>`:"<span>\u2014</span>";return`<tr>
        <td style="white-space:nowrap;font-size:0.82rem">${t}</td>
        <td>${s}</td>
        <td style="font-family:monospace;font-size:0.82rem">${P(e.ip)}</td>
        <td><span class="kp-badge">${P(e.method)}</span></td>
        <td style="font-family:monospace;font-size:0.82rem">${P(e.action)}</td>
        <td>${a}</td>
        <td>${o}</td>
        <td>${n}</td>
    </tr>`}function Ne(e,t){let s=e>1?'<button class="uk-button kp-btn-ghost kp-btn-sm" id="al-prev">\u2039 Prev</button>':"",a=e<t?'<button class="uk-button kp-btn-ghost kp-btn-sm" id="al-next">Next \u203A</button>':"";return`<div class="uk-flex uk-flex-middle uk-flex-center uk-margin-small-top" style="gap:12px">
        ${s}
        <span style="font-size:0.85rem;color:var(--kp-text-dim)">Page ${e} of ${t}</span>
        ${a}
    </div>`}function Vt(e){return`<span class="kp-badge ${e>=500?"kp-badge-error":e>=400?"kp-badge-warn":e>=300?"kp-badge-info":"kp-badge-ok"}">${e}</span>`}var P=e=>f(e??"");async function We(e,t){let s=new URLSearchParams({page:t,page_size:oe});return e.username&&s.set("username",e.username),e.action&&s.set("action",e.action),e.target_type&&s.set("target_type",e.target_type),e.date_from&&s.set("date_from",e.date_from),e.date_to&&s.set("date_to",e.date_to),e.auth!==""&&s.set("auth",e.auth),k.get(`/audit?${s}`)}function Kt(e){return{username:e.querySelector("#al-filter-user").value.trim(),action:e.querySelector("#al-filter-action").value.trim(),target_type:e.querySelector("#al-filter-target").value.trim(),date_from:e.querySelector("#al-filter-date-from").value,date_to:e.querySelector("#al-filter-date-to").value,auth:e.querySelector("#al-filter-auth").value}}async function Jt(e,t,s){async function a(o,l){let r=await We(o,l);e.querySelector("#al-table-body").innerHTML=(r.entries??[]).map(Ue).join("")||'<tr><td colspan="8" class="uk-text-center kp-text-dim">No records found</td></tr>';let d=Math.max(1,Math.ceil(r.total/oe)),b=e.querySelector("#al-pager");b&&(b.innerHTML=d>1?Ne(l,d):""),e.querySelector("#al-record-count").textContent=`${r.total} record${r.total!==1?"s":""}`,i(e,o,l,d),t=o,s=l}function i(o,l,r,d){o.querySelector("#al-prev")?.addEventListener("click",()=>a(l,r-1)),o.querySelector("#al-next")?.addEventListener("click",()=>a(l,r+1))}e.querySelector("#al-filter-apply")?.addEventListener("click",()=>{a(Kt(e),1)}),e.querySelector("#al-filter-clear")?.addEventListener("click",()=>{["al-filter-user","al-filter-action","al-filter-target","al-filter-date-from","al-filter-date-to"].forEach(o=>{let l=e.querySelector(`#${o}`);l&&(l.value="")}),e.querySelector("#al-filter-auth").value="",a({username:"",action:"",target_type:"",date_from:"",date_to:"",auth:""},1)});let n=Math.max(1,Math.ceil(parseInt(e.querySelector("#al-record-count")?.textContent??"0")/oe));i(e,t,s,n),e.querySelector("#audit-log-panel")?.addEventListener("click",o=>{let l=o.target.closest(".al-diff-btn");if(!l)return;o.preventDefault(),o.stopPropagation();let r=l.dataset.prior??"",d=l.dataset.new??"",b="";r&&d?b=`=== BEFORE ===
`+ie(r)+`

=== AFTER ===
`+ie(d):d?b=ie(d):b=ie(r),document.body.insertAdjacentHTML("beforeend",`
            <div id="al-diff-modal-inst" uk-modal>
                <div class="uk-modal-dialog kp-modal uk-modal-body uk-width-large">
                    <button class="uk-modal-close-default" type="button" uk-close></button>
                    <h3 class="kp-view-title uk-margin-bottom">Request Detail</h3>
                    <pre class="kp-cron-output">${P(b)}</pre>
                </div>
            </div>`);let p=document.getElementById("al-diff-modal-inst");UIkit.modal(p).show(),p.addEventListener("hidden",()=>p.remove(),{once:!0})})}function ie(e){try{return JSON.stringify(JSON.parse(e),null,2)}catch{return e}}async function je(e){if(!_()){e.innerHTML=T("Access denied");return}let t={username:"",action:"",target_type:"",date_from:"",date_to:"",auth:""},s=await We(t,1);e.innerHTML=zt(s,t,1),Jt(e,t,1)}function le(){document.body.insertAdjacentHTML("beforeend",`
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
        </div>`);let t=UIkit.modal("#kp-create-site-modal"),s=document.getElementById("cs-site-type"),a=document.getElementById("cs-php-version-wrap"),i=document.getElementById("cs-node-version-wrap"),n=document.getElementById("cs-dotnet-version-wrap"),o=document.getElementById("cs-python-version-wrap"),l=document.getElementById("cs-start-command-wrap"),r=document.getElementById("cs-wordpress-wrap");t.show();let d=document.getElementById("cs-domains-wrap"),b=document.getElementById("cs-rp-note");s.addEventListener("change",()=>{let p=parseInt(s.value);a.classList.toggle("uk-hidden",p!==1&&p!==2||p===6),i.classList.toggle("uk-hidden",p!==4),n.classList.toggle("uk-hidden",p!==5),o.classList.toggle("uk-hidden",p!==7),l.classList.toggle("uk-hidden",p!==4&&p!==5&&p!==7),l.querySelector("input").required=p===7,r.classList.toggle("uk-hidden",p!==1||p===6),d.classList.toggle("uk-hidden",p===6),b.classList.toggle("uk-hidden",p!==6)}),document.getElementById("create-site-form").addEventListener("submit",async p=>{p.preventDefault();let u=p.target.querySelector('[type="submit"]'),m=u.innerHTML;u.disabled=!0,u.innerHTML='<div uk-spinner="ratio: 0.6"></div> Creating...';let h=new FormData(p.target),v=parseInt(h.get("site_type")),g=null;v===4&&(g=parseInt(h.get("node_version"))),v===5&&(g=parseInt(h.get("dotnet_version"))),v===7&&(g=parseInt(h.get("python_version")));let x={name:h.get("name").trim(),php_version:parseInt(h.get("php_version"))||3,site_type:v,runtime_version:g,start_command:h.get("start_command")?.trim()||"",domains:h.get("domains").split(`
`).map(C=>C.trim()).filter(Boolean),install_wordpress:v===1?h.get("install_wordpress")==="on":!1};t.hide(),document.getElementById("kp-create-site-modal")?.remove();let $=v===6?`Setting up '${x.name}' as a reverse proxy...`:`Setting up '${x.name}' \u2014 pulling images and provisioning containers...`;S("Creating Site",$);try{await k.post("/sites",x,6e5),w(),c.success(`Site '${x.name}' created`),y.go("sites")}catch(C){w(),c.error(C.message),u.disabled=!1,u.innerHTML=m}}),document.getElementById("kp-create-site-modal").addEventListener("hidden",()=>document.getElementById("kp-create-site-modal")?.remove())}var U=null;function Gt(e){return`${e.toFixed(1)}%`}var re=null;function fe(){return re||(re=new Promise(e=>{if(window.Chart){e();return}let t=document.createElement("script");t.src="https://cdn.jsdelivr.net/npm/chart.js@latest/dist/chart.umd.min.js",t.onload=e,t.onerror=e,document.body.appendChild(t)}),re)}function ye(e,t){return`
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

        </div>`}async function Xt(e){await fe();let t;try{t=await k.get(`/sites/${e}/stats/traffic`)}catch(n){document.getElementById("stats-ip-rows").innerHTML=`<tr><td colspan="2" class="kp-muted uk-text-small">Failed to load: ${n.message}</td></tr>`;return}document.getElementById("stats-2xx").textContent=(t.status_codes["2xx"]??0).toLocaleString(),document.getElementById("stats-3xx").textContent=(t.status_codes["3xx"]??0).toLocaleString(),document.getElementById("stats-4xx").textContent=(t.status_codes["4xx"]??0).toLocaleString(),document.getElementById("stats-5xx").textContent=(t.status_codes["5xx"]??0).toLocaleString(),document.getElementById("stats-bandwidth").textContent=L(t.total_bandwidth??0);let s=document.getElementById("stats-chart");if(s&&window.Chart){let n=(t.hits_per_hour??[]).map(l=>new Date(l.hour).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}));U&&(U.destroy(),U=null),U=new window.Chart(s,{type:"bar",data:{labels:n,datasets:[{label:"2xx",data:(t.hits_per_hour??[]).map(l=>l["2xx"]),backgroundColor:"rgba(39,174,96,0.75)",borderColor:"rgba(39,174,96,1)",borderWidth:1,borderRadius:3},{label:"3xx",data:(t.hits_per_hour??[]).map(l=>l["3xx"]),backgroundColor:"rgba(43,142,255,0.75)",borderColor:"rgba(43,142,255,1)",borderWidth:1,borderRadius:3},{label:"4xx",data:(t.hits_per_hour??[]).map(l=>l["4xx"]),backgroundColor:"rgba(255,171,0,0.75)",borderColor:"rgba(255,171,0,1)",borderWidth:1,borderRadius:3},{label:"5xx",data:(t.hits_per_hour??[]).map(l=>l["5xx"]),backgroundColor:"rgba(235,59,90,0.75)",borderColor:"rgba(235,59,90,1)",borderWidth:1,borderRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(l,r)=>{if(!r||!r.length)return;let d=r[0].datasetIndex,b=U.data.datasets[d].label;if(b!=="4xx"&&b!=="5xx")return;let p=r[0].index,u=document.getElementById("stats-panel");if(!u||!u._hitsPerHour)return;let m=u._hitsPerHour[p]?.hour;m&&we(`/sites/${e}/stats/drilldown`,m,b)},onHover:(l,r)=>{if(!r||!r.length){l.native.target.style.cursor="default";return}let d=U.data.datasets[r[0].datasetIndex].label;l.native.target.style.cursor=d==="4xx"||d==="5xx"?"pointer":"default"},plugins:{legend:{display:!0,labels:{color:"#6b8cae",font:{size:11}},onHover:l=>{l.native.target.style.cursor="pointer"},onLeave:l=>{l.native.target.style.cursor="default"}},tooltip:{mode:"index",backgroundColor:"#0c1530",borderColor:"#1a2a4a",borderWidth:1,titleColor:"#dde8f5",bodyColor:"#6b8cae"}},scales:{x:{stacked:!0,ticks:{color:"#6b8cae",font:{size:10},maxRotation:45},grid:{color:"rgba(26,42,74,0.6)"}},y:{stacked:!0,ticks:{color:"#6b8cae",font:{size:10}},grid:{color:"rgba(26,42,74,0.6)"},beginAtZero:!0}}}});let o=document.getElementById("stats-panel");o&&(o._hitsPerHour=t.hits_per_hour??[])}let a=document.getElementById("stats-ip-rows");a&&(a.innerHTML=(t.top_ips??[]).length===0?'<tr><td colspan="2" class="kp-muted uk-text-small">No data</td></tr>':(t.top_ips??[]).map(n=>`
                <tr>
                    <td class="kp-stats-table-cell-mono">${f(n.name)}</td>
                    <td class="kp-stats-table-cell-count">${n.count.toLocaleString()}</td>
                </tr>`).join(""));let i=document.getElementById("stats-ua-rows");i&&(i.innerHTML=(t.top_uas??[]).length===0?'<tr><td colspan="2" class="kp-muted uk-text-small">No data</td></tr>':(t.top_uas??[]).map(n=>`
                <tr>
                    <td class="kp-stats-ua-cell" title="${f(n.name)}">${f(n.name)}</td>
                    <td class="kp-stats-table-cell-count">${n.count.toLocaleString()}</td>
                </tr>`).join(""))}async function Oe(e){let t=document.getElementById("stats-disk-wrap");if(t){t.innerHTML='<div uk-spinner="ratio:0.8" style="color:var(--kp-blue)"></div>';try{let s=await k.get(`/sites/${e}/stats/disk`);t.innerHTML=`
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
            </div>`}catch(s){t.innerHTML=`<p class="kp-muted uk-text-small">Failed to load disk usage: ${s.message}</p>`}}}function Qt(e){return!e||e.length===0?'<p class="kp-muted uk-text-small uk-margin-remove">No container data.</p>':`
        <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
            <thead><tr>
                <th style="color:var(--kp-text-dim);font-size:0.75rem">Container</th>
                <th style="color:var(--kp-text-dim);font-size:0.75rem">CPU</th>
                <th style="color:var(--kp-text-dim);font-size:0.75rem">Memory</th>
                <th style="color:var(--kp-text-dim);font-size:0.75rem">Mem %</th>
            </tr></thead>
            <tbody>${e.map(s=>{let a=s.mem_limit>0?(s.mem_used/s.mem_limit*100).toFixed(1):0,i=a>80,n=s.name.split("-").pop();return`
            <tr>
                <td class="kp-stats-pod-role kp-stats-pod-role-btn"
                    data-container="${s.name}"
                    title="Restart ${n}"
                    style="cursor:pointer">${n}</td>
                <td class="kp-stats-pod-cpu${s.cpu_percent>80?" is-hot":""}">
                    ${Gt(s.cpu_percent)}
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
        </table>`}function Yt(e,t,s,a,i){if(!e||e.length===0)return'<p class="kp-muted uk-text-small">No matching requests found.</p>';let n=[...e].sort((p,u)=>{let m,h;switch(s){case"time":m=p.time,h=u.time;break;case"method":m=p.method,h=u.method;break;case"site":m=p.site_name,h=u.site_name;break;case"ip":m=p.client_ip,h=u.client_ip;break;default:m=p.status,h=u.status;break}return m<h?a?1:-1:m>h?a?-1:1:0}),o=50,l=Math.ceil(n.length/o),d=n.slice(t*o,(t+1)*o).map(p=>{let u=f(p.ua),m=p.status>=500?"kp-badge-danger":"kp-badge-warning";return`
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
            <span class="kp-muted uk-text-small">Page ${t+1} of ${l} \u2014 ${e.length} total</span>
            <div>
                ${t>0?`<button class="uk-button kp-btn-ghost kp-btn-sm" data-dd-page="${t-1}">\u2039 Prev</button>`:""}
                ${t<l-1?`<button class="uk-button kp-btn-ghost kp-btn-sm" data-dd-page="${t+1}">Next \u203A</button>`:""}
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
                <tbody>${d}</tbody>
            </table>
        </div>
        ${b}`}async function we(e,t,s,a=!1){let i=document.getElementById("stats-drilldown-modal"),n=document.getElementById("stats-drilldown-title"),o=document.getElementById("stats-drilldown-body");if(!i||!o)return;n.textContent=`${s} Requests \u2014 ${new Date(t).toLocaleString([],{hour:"2-digit",minute:"2-digit",month:"short",day:"numeric"})}`,o.innerHTML='<div uk-spinner="ratio:0.8" style="color:var(--kp-blue)"></div>',UIkit.modal(i).show();let l=[],r=0,d="time",b=!0;function p(){o.innerHTML=Yt(l,r,d,b,a),o.querySelectorAll("th[data-dd-col]").forEach(u=>{u.addEventListener("click",()=>{let m=u.dataset.ddCol;d===m?b=!b:(d=m,b=!0),r=0,p()})}),o.querySelectorAll("[data-dd-page]").forEach(u=>{u.addEventListener("click",()=>{r=parseInt(u.dataset.ddPage,10),p()})})}try{l=await k.get(`${e}?hour=${encodeURIComponent(t)}&status=${s}`)}catch(u){o.innerHTML=`<p class="kp-muted uk-text-small">Failed to load: ${f(u.message)}</p>`;return}p()}function xe(e,t,s){let a=s===6,i=null;function n(){if(a)return;let r=e.querySelector("#stats-pod-indicator"),d=e.querySelector("#stats-pod-table-wrap");if(!d)return;let b=location.protocol==="https:"?"wss":"ws";i=new WebSocket(`${b}://${location.host}/api/sites/${t}/stats/pod`),i.onopen=()=>{r&&(r.className="kp-status kp-status-running",r.textContent="Live")},i.onmessage=p=>{try{let u=JSON.parse(p.data);d.innerHTML=Qt(u.containers??[]),d.querySelectorAll(".kp-stats-pod-role-btn").forEach(m=>{m.addEventListener("click",async()=>{let h=m.style.color;m.style.color="var(--kp-warning)";let v=m.dataset.container.split("-").pop();try{await k.post(`/sites/${t}/containers/${v}/restart`),c.success(`${v} restarted`)}catch(g){m.style.color=h,c.error(g.message)}})})}catch{}},i.onerror=()=>{r&&(r.className="kp-status kp-status-error",r.textContent="Error")},i.onclose=()=>{r&&r.textContent==="Live"&&(r.className="kp-status kp-status-stopped",r.textContent="Disconnected")}}function o(){i&&i.readyState===WebSocket.OPEN&&i.close(),i=null}e.querySelector("#stats-disk-refresh")?.addEventListener("click",()=>{Oe(t)}),n();let l=new MutationObserver(()=>{document.getElementById("stats-panel")||(o(),l.disconnect())});l.observe(document.getElementById("main")??document.body,{childList:!0,subtree:!1})}async function Se(e,t){let s=t===6;await Xt(e),s||await Oe(e)}async function ze(e){let t=await k.get("/sites")??[];e.innerHTML=`
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

        ${t.length===0?se("world","No sites yet \u2014 create one to get started"):`<div class="kp-table-wrap">
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
                            ${t.map(s=>Zt(s,t)).join("")}
                        </tbody>
                    </table>
                </div>
            </div>`}`,document.getElementById("sites-new-btn").addEventListener("click",()=>le()),ea()}function Zt(e,t=[]){let s=e.Domains?.[0]??null,a=e.SiteType===6,i=e.ParentID>0?t.find(n=>n.ID===e.ParentID)??null:null;return`
        <tr data-site-id="${e.ID}" data-status="${a?"":e.SiteStatus}" data-type="${e.SiteType}">
            <!-- row checkbox -->
            <td class="uk-table-shrink">
                <input class="uk-checkbox kp-site-row-check" type="checkbox"
                       data-site-id="${e.ID}" data-site-type="${e.SiteType}">
            </td>
            <!-- status badge -->
            <td class="uk-table-shrink kp-site-row-status">${a?"":M(e.SiteStatus)}</td>

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
                ${J(e.SiteType)}${D(e)?" / "+D(e):""}
            </td>

            <!-- internal port -->
            <td class="uk-visible@m kp-muted kp-mono uk-text-small">:${e.Port}</td>

            <!-- host-mapped owner UID of html/ -->
            <td class="uk-visible@m kp-muted kp-mono uk-text-small">${e.HostUID??(a?"":"\u2014")}</td>

            <!-- primary domain -->
            <td class="uk-visible@m uk-text-small">
                ${s?`<a href="http://${s}" target="_blank"
                          style="color:var(--kp-cyan)">${s}</a>`:'<span class="kp-muted">\u2014</span>'}
            </td>

            <!-- action buttons -->
            <td class="uk-table-shrink">
                <div class="kp-site-row-actions">
                    <button class="uk-button kp-btn-secondary kp-btn-sm"
                            data-action="manage" data-id="${e.ID}"
                            uk-tooltip="Manage">
                        <span uk-icon="icon: cog;"></span>
                    </button>
                    ${a?"":`
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
        </tr>`}function Ve(e,t=[]){let s=e.Domains?.[0]??null,a=e.SiteType===6,i=e.ParentID>0?t.find(n=>n.ID===e.ParentID)??null:null;return`
        <div class="kp-site-card uk-margin" data-site-id="${e.ID}" data-status="${a?"":e.SiteStatus}" data-type="${e.SiteType}">
            <div class="kp-site-card-header">
                <div>
                    <h2 class="kp-view-title" data-action="manage" data-id="${e.ID}">${e.Name}</h2>
                    <div class="kp-site-meta">
                        <span class="kp-site-meta-item"><span uk-icon="icon: server; ratio: 0.75"></span> :${e.Port}</span>
                        <span class="kp-site-meta-item"><span uk-icon="icon: code; ratio: 0.75"></span> ${J(e.SiteType)}${D(e)?" / "+D(e):""}</span>
                        ${s?`<span class="kp-site-meta-item" style="width:100%"><a href="http://${s}" target="_blank" style="color:var(--kp-cyan)">${s}</a></span>`:""}
                    </div>
                    ${i?`<div class="kp-site-meta kp-muted uk-text-small uk-margin-small-top"><span uk-icon="icon: git-fork; ratio: 0.75"></span> <a href="javascript:void(0)" data-action="manage" data-id="${i.ID}" style="color:var(--kp-cyan)">${i.Name}</a></div>`:""}
                </div>
                ${a?"":M(e.SiteStatus)}
            </div>
            <div class="kp-site-actions">
                <button class="uk-button kp-btn-secondary kp-btn-sm" data-action="manage" data-id="${e.ID}" uk-tooltip="Manage This Site"><span uk-icon="icon: cog;"></span></button>
                ${a?"":`
                ${e.SiteStatus===1?`<button class="uk-button kp-btn-secondary kp-btn-sm" data-action="stop" data-id="${e.ID}" uk-tooltip="Stop the Site"><span uk-icon="icon: ban;"></span></button>`:`<button class="uk-button kp-btn-secondary kp-btn-sm" data-action="start" data-id="${e.ID}" uk-tooltip="Start the Site"><span uk-icon="icon: play;"></span></button>`}
                <button class="uk-button kp-btn-secondary kp-btn-sm" data-action="restart" data-id="${e.ID}" uk-tooltip="Restart the Site"><span uk-icon="icon: refresh;"></span></button>
                <button class="uk-button kp-btn-secondary kp-btn-sm" data-action="flush" data-id="${e.ID}" title="Flush cache" uk-tooltip="Flush the Caches"><span uk-icon="icon: bolt;"></span></button>
                <div class="kp-site-actions-break"></div>
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="recreate" data-id="${e.ID}" title="Recreate pod" uk-tooltip="Recreate the Pod"><span uk-icon="icon: history;"></span></button>
                `}
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="delete" data-id="${e.ID}" title="Delete" uk-tooltip="Delete the Site"><span uk-icon="icon: trash;"></span></button>
            </div>
        </div>`}function ea(){let e=document.getElementById("sites-bulk-bar"),t=document.getElementById("sites-bulk-count"),s=document.getElementById("sites-select-all"),a=document.getElementById("sites-search"),i=document.querySelector(".kp-table-wrap tbody");if(!e||!s)return;let n=null,o=!0,l=()=>[...document.querySelectorAll(".kp-site-row-check:checked")],r=()=>{let h=l().length;t.textContent=`${h} selected`,["bulk-start","bulk-stop","bulk-restart","bulk-flush","bulk-recreate"].forEach(x=>{let $=document.getElementById(x);$&&($.disabled=h===0)});let v=document.getElementById("kp-bulk-mobile-btn");v&&(v.disabled=h===0);let g=document.querySelectorAll(".kp-site-row-check");s.indeterminate=h>0&&h<g.length,s.checked=g.length>0&&h===g.length},d=()=>{let m=a.value.trim().toLowerCase();document.querySelectorAll(".kp-table-wrap tbody tr").forEach(h=>{let v=h.querySelector(".kp-site-row-name")?.textContent.toLowerCase()??"",g=h.querySelector("td:nth-child(6)")?.textContent.toLowerCase()??"";h.style.display=!m||v.includes(m)||g.includes(m)?"":"none"})},b=m=>{n===m?o=!o:(n=m,o=!0),document.querySelectorAll(".kp-sort-icon").forEach(v=>{v.textContent=v.dataset.col===m?o?" \u2191":" \u2193":" \u2195"});let h=[...i.querySelectorAll("tr")];h.sort((v,g)=>{let x="",$="";return m==="name"?(x=v.querySelector(".kp-site-row-name")?.textContent??"",$=g.querySelector(".kp-site-row-name")?.textContent??""):m==="status"?(x=v.dataset.status??"",$=g.dataset.status??""):m==="type"?(x=v.dataset.type??"",$=g.dataset.type??""):m==="domain"&&(x=v.querySelector("td:nth-child(6)")?.textContent.trim()??"",$=g.querySelector("td:nth-child(6)")?.textContent.trim()??""),o?x.localeCompare($):$.localeCompare(x)}),h.forEach(v=>i.appendChild(v))};s.addEventListener("change",()=>{document.querySelectorAll(".kp-site-row-check").forEach(m=>{m.checked=s.checked}),r()}),i?.addEventListener("change",m=>{m.target.classList.contains("kp-site-row-check")&&r()}),a?.addEventListener("input",d),document.querySelectorAll(".kp-sortable").forEach(m=>{m.addEventListener("click",()=>b(m.dataset.col))}),["bulk-start","bulk-stop","bulk-restart","bulk-flush","bulk-recreate"].forEach(m=>{let h=m.replace("bulk-","");document.getElementById(m)?.addEventListener("click",()=>{let v=l().filter(g=>g.dataset.siteType!=="6").map(g=>g.dataset.siteId);document.dispatchEvent(new CustomEvent("kp:bulk-action",{detail:{action:h,ids:v}}))})});let p=document.getElementById("kp-bulk-mobile-pill"),u=document.getElementById("kp-bulk-mobile-dropdown");document.getElementById("kp-bulk-mobile-btn")?.addEventListener("click",m=>{m.stopPropagation(),u.hidden=!u.hidden}),document.addEventListener("click",m=>{u&&!p?.contains(m.target)&&(u.hidden=!0)},{capture:!0}),["start","stop","restart","flush","recreate"].forEach(m=>{document.getElementById(`bulk-mobile-${m}`)?.addEventListener("click",h=>{h.preventDefault(),u.hidden=!0;let v=l().filter(g=>g.dataset.siteType!=="6").map(g=>g.dataset.siteId);document.dispatchEvent(new CustomEvent("kp:bulk-action",{detail:{action:m,ids:v}}))})}),document.querySelectorAll(".kp-sort-icon").forEach(m=>{m.textContent=" \u2195"}),r()}var N=null,W=null;function ta(){W&&(W.close(),W=null);let e=(a,i)=>i>0?`${(a/i*100).toFixed(1)}%`:"\u2014",t=location.protocol==="https:"?"wss":"ws",s=new WebSocket(`${t}://${location.host}/api/stats/host`);W=s,s.onmessage=a=>{let i=document.getElementById("dash-host-cpu");if(!i){s.close();return}let n;try{n=JSON.parse(a.data)}catch{return}i.textContent=`${(n.cpu_percent??0).toFixed(1)}%`,document.getElementById("dash-host-mem").textContent=e(n.mem_used,n.mem_total),document.getElementById("dash-host-mem-sub").textContent=`${L(n.mem_used??0)} / ${L(n.mem_total??0)}`,document.getElementById("dash-host-disk").textContent=e(n.disk_used,n.disk_total),document.getElementById("dash-host-disk-sub").textContent=`${L(n.disk_used??0)} / ${L(n.disk_total??0)}`,document.getElementById("dash-host-procs").textContent=(n.procs_running??0).toLocaleString(),document.getElementById("dash-host-procs-sub").textContent=`of ${(n.procs_total??0).toLocaleString()} threads`},s.onclose=()=>{W===s&&(W=null)}}async function Ke(e){let[t,s]=await Promise.all([k.get("/sites").catch(()=>[]),k.get("/stats/traffic").catch(()=>null)]),a=t.filter(l=>l.SiteType!==6&&l.SiteStatus===1).length,i=t.filter(l=>l.SiteType===6).length,n=t.filter(l=>l.SiteType!==6&&l.SiteStatus===4).length,o=window.KP?.user?.role===99;if(e.innerHTML=`

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
                    ${t.length===0?emptyState("world","No sites yet"):t.slice(-3).reverse().map(l=>Ve(l,t)).join("")}
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
        `,o&&ta(),s?.hits_per_hour?.length){await fe();let l=document.getElementById("dash-traffic-chart");l&&window.Chart&&(N&&(N.destroy(),N=null),N=new window.Chart(l,{type:"bar",data:{labels:s.hits_per_hour.map(r=>new Date(r.hour).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})),datasets:[{label:"2xx",data:s.hits_per_hour.map(r=>r["2xx"]),backgroundColor:"rgba(39,174,96,0.75)",borderColor:"rgba(39,174,96,1)",borderWidth:1,borderRadius:3},{label:"3xx",data:s.hits_per_hour.map(r=>r["3xx"]),backgroundColor:"rgba(43,142,255,0.75)",borderColor:"rgba(43,142,255,1)",borderWidth:1,borderRadius:3},{label:"4xx",data:s.hits_per_hour.map(r=>r["4xx"]),backgroundColor:"rgba(255,171,0,0.75)",borderColor:"rgba(255,171,0,1)",borderWidth:1,borderRadius:3},{label:"5xx",data:s.hits_per_hour.map(r=>r["5xx"]),backgroundColor:"rgba(235,59,90,0.75)",borderColor:"rgba(235,59,90,1)",borderWidth:1,borderRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(r,d)=>{if(!d||!d.length)return;let b=d[0].datasetIndex,p=N.data.datasets[b].label;if(p!=="4xx"&&p!=="5xx")return;let u=s.hits_per_hour[d[0].index]?.hour;u&&we("/stats/drilldown",u,p,!0)},onHover:(r,d)=>{if(!d||!d.length){r.native.target.style.cursor="default";return}let b=N.data.datasets[d[0].datasetIndex].label;r.native.target.style.cursor=b==="4xx"||b==="5xx"?"pointer":"default"},plugins:{legend:{display:!0,labels:{color:"#6b8cae",font:{size:11}},onHover:r=>{r.native.target.style.cursor="pointer"},onLeave:r=>{r.native.target.style.cursor="default"}},tooltip:{mode:"index",backgroundColor:"#0c1530",borderColor:"#1a2a4a",borderWidth:1,titleColor:"#dde8f5",bodyColor:"#6b8cae"}},scales:{x:{stacked:!0,ticks:{color:"#6b8cae",font:{size:10},maxRotation:45},grid:{color:"rgba(26,42,74,0.6)"}},y:{stacked:!0,ticks:{color:"#6b8cae",font:{size:10}},grid:{color:"rgba(26,42,74,0.6)"},beginAtZero:!0}}}}))}document.getElementById("dash-new-site")?.addEventListener("click",()=>le())}function G(e=null){let t=e?`/sites/${e}/security/ip`:"/security/ip",s=e?`/sites/${e}/security/ua`:"/security/ua",a=e?`/sites/${e}/security/country`:"/security/country",i=e?`/sites/${e}/security/asn`:"/security/asn";return`
        <div id="security-panel" data-ip-base="${t}" data-ua-base="${s}" data-geo-base="${a}" data-asn-base="${i}" ${e?`data-site-id="${e}"`:""}>

            <!-- tab pills -->
            <ul class="kp-tab-pills" id="kp-sec-pills">
                <li data-tab="ip"><a href="#"><span uk-icon="icon: location; ratio: 0.85"></span> IP Rules</a></li>
                <li data-tab="ua"><a href="#"><span uk-icon="icon: laptop; ratio: 0.85"></span> User-Agent</a></li>
                <li data-tab="country"><a href="#"><span uk-icon="icon: world; ratio: 0.85"></span> Country</a></li>
                <li data-tab="asn"><a href="#"><span uk-icon="icon: server; ratio: 0.85"></span> ASN</a></li>
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
                                <a class="uk-button kp-btn-ghost kp-btn-sm" href="/api${s}/export" download="${e?`site-${e}-ua-rules.csv`:"podnest-global-ua-rules.csv"}" uk-tooltip="Export UA rules as CSV">
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
        </div>`}function ce(e,t){let s=e.querySelector("#security-panel"),a=e.querySelector("#kp-sec-pills"),i=e.querySelector("#kp-sec-switcher");if(!s||!a||!i)return;let n=s.dataset.siteId,o=[...a.querySelectorAll(":scope > li")],l=(r,d)=>{if(UIkit.switcher(i).show(r),o.forEach((p,u)=>p.classList.toggle("kp-pill-active",u===r)),!d)return;let b=o[r].dataset.tab;history.replaceState(null,"",n?`#site-detail/${n}/${b}`:r===0?"#security":`#security/${b}`)};o.forEach((r,d)=>{r.querySelector(":scope > a").addEventListener("click",b=>{b.preventDefault(),l(d,!0)})}),l(Math.max(0,o.findIndex(r=>r.dataset.tab===t)),!1)}async function R(e){let t=e.querySelector("#security-panel");if(!t)return;let s=t.dataset.ipBase,a=t.dataset.uaBase;try{let i=t.dataset.geoBase,n=t.dataset.asnBase,o=[k.get(s),k.get(a),k.get(i),k.get(n)];t.dataset.siteId||o.push(k.get("/settings/trusted-proxies"),k.get("/security/bypass"));let[l,r,d,b,p,u]=await Promise.all(o);if(!e.querySelector("#sec-ip-whitelist"))return;if(e.querySelector("#sec-ip-whitelist").value=l.whitelist??"",e.querySelector("#sec-ip-blacklist").value=l.blacklist??"",e.querySelector("#sec-ua-whitelist").value=r.whitelist??"",e.querySelector("#sec-ua-blacklist").value=r.blacklist??"",e.querySelector("#sec-geo-whitelist").value=d.whitelist??"",e.querySelector("#sec-geo-blacklist").value=d.blacklist??"",e.querySelector("#sec-asn-whitelist").value=b.whitelist??"",e.querySelector("#sec-asn-blacklist").value=b.blacklist??"",p){let m=e.querySelector("#sec-tp-cidrs");m&&(m.value=p.trusted_proxies_custom??"")}if(u){let m=e.querySelector("#sec-bypass-cidrs");m&&(m.value=u.bypass??"")}}catch(i){c.error("Failed to load security rules: "+i.message)}}function de(e){let t=e.querySelector("#security-panel");if(!t)return;let s=t.dataset.ipBase,a=t.dataset.uaBase,i=t.dataset.geoBase;e.querySelector("#sec-ip-save")?.addEventListener("click",async()=>{let n=e.querySelector("#sec-ip-save"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.put(s,{whitelist:e.querySelector("#sec-ip-whitelist").value,blacklist:e.querySelector("#sec-ip-blacklist").value}),c.success("IP rules saved")}catch(l){c.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),e.querySelector("#sec-ua-save")?.addEventListener("click",async()=>{let n=e.querySelector("#sec-ua-save"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.put(a,{whitelist:e.querySelector("#sec-ua-whitelist").value,blacklist:e.querySelector("#sec-ua-blacklist").value}),c.success("UA rules saved")}catch(l){c.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),e.querySelector("#sec-geo-save")?.addEventListener("click",async()=>{let n=e.querySelector("#sec-geo-save"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{let l={whitelist:e.querySelector("#sec-geo-whitelist").value,blacklist:e.querySelector("#sec-geo-blacklist").value},r=await k.put(i,l);r?.status==="confirm"&&(await UIkit.modal.confirm(`${r.reason}. Save anyway?`),r=await k.put(i,{...l,confirm:!0})),c.success("Country rules saved")}catch(l){l instanceof Error&&c.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),e.querySelector("#sec-asn-save")?.addEventListener("click",async()=>{let n=e.querySelector("#sec-asn-save"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{let l=e.querySelector("#security-panel").dataset.asnBase,r={whitelist:e.querySelector("#sec-asn-whitelist").value,blacklist:e.querySelector("#sec-asn-blacklist").value},d=await k.put(l,r);d?.status==="confirm"&&(await UIkit.modal.confirm(`${d.reason}. Save anyway?`),d=await k.put(l,{...r,confirm:!0})),c.success("ASN rules saved")}catch(l){l instanceof Error&&c.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),e.querySelector("#sec-asn-lookup")?.addEventListener("click",()=>aa(e)),e.querySelector("#sec-tp-save")?.addEventListener("click",async()=>{let n=e.querySelector("#sec-tp-save"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.put("/settings/trusted-proxies",{trusted_proxies_custom:e.querySelector("#sec-tp-cidrs").value.trim()}),c.success("Trusted proxy ranges saved")}catch(l){c.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),e.querySelector("#sec-bypass-save")?.addEventListener("click",async()=>{let n=e.querySelector("#sec-bypass-save"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.put("/security/bypass",{bypass:e.querySelector("#sec-bypass-cidrs").value.trim()}),c.success("Bypass rules saved")}catch(l){c.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),e.querySelector("#sec-tp-import")?.addEventListener("change",async n=>{let o=n.target.files[0];if(!o)return;let l=new FormData;l.append("file",o);try{let r=await fetch("/api/settings/trusted-proxies/import",{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:l}),d=r.status===204?null:await r.json().catch(()=>null);if(!r.ok)throw new Error(d?.error||`HTTP ${r.status}`);await R(e),c.success("Trusted proxies imported")}catch(r){c.error(r.message)}finally{n.target.value=""}}),e.querySelector("#sec-ip-import")?.addEventListener("change",async n=>{let o=n.target.files[0];if(!o)return;let l=new FormData;l.append("file",o);try{let r=await fetch("/api"+s+"/import",{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:l}),d=r.status===204?null:await r.json().catch(()=>null);if(!r.ok)throw new Error(d?.error||`HTTP ${r.status}`);await R(e),c.success("IP rules imported")}catch(r){c.error(r.message)}finally{n.target.value=""}}),e.querySelector("#sec-ua-import")?.addEventListener("change",async n=>{let o=n.target.files[0];if(!o)return;let l=new FormData;l.append("file",o);try{let r=await fetch("/api"+a+"/import",{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:l}),d=r.status===204?null:await r.json().catch(()=>null);if(!r.ok)throw new Error(d?.error||`HTTP ${r.status}`);await R(e),c.success("UA rules imported")}catch(r){c.error(r.message)}finally{n.target.value=""}})}function aa(e){document.getElementById("kp-asn-lookup-modal")?.remove(),document.body.insertAdjacentHTML("beforeend",`
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
                </button>`,n.querySelector("#asn-lookup-ip").textContent=o.ip,n.querySelector("#asn-lookup-org").textContent=o.org||"",n.querySelector("#asn-lookup-add").addEventListener("click",()=>{let l=e.querySelector("#sec-asn-blacklist"),r=`AS${o.asn}`;l.value.split(`
`).some(d=>d.trim().toUpperCase()===r)||(l.value=l.value.trim()?`${l.value.replace(/\s+$/,"")}
${r}`:r),s.hide(),c.success(`${r} added to blacklist \u2014 save to apply`)})}catch(o){n.innerHTML="",c.error(o.message)}};document.getElementById("asn-lookup-go").addEventListener("click",a),document.getElementById("asn-lookup-q").addEventListener("keydown",i=>{i.key==="Enter"&&a()})}async function Je(e,t={}){if(!_()){e.innerHTML=T("Access denied");return}e.innerHTML=`
        <div class="kp-view-header">
            <h1 class="kp-view-title kp-cursor" style="font-size:2rem;">Global Security</h1>
        </div>
        <p class="kp-muted uk-text-small uk-margin-bottom">
            Global rules apply to all sites before per-site rules are evaluated.
            Blacklist always wins \u2014 except for IP rules, where a whitelist match
            in either scope allows the request outright.
        </p>
        ${G(null)}`,de(e),ce(e,t.tab),R(e)}function sa(e){switch(e){case"valid":return'<span class="kp-ssl-valid" uk-icon="icon: lock; ratio: 0.85" uk-tooltip="Valid SSL certificate"></span>';case"self-signed":return'<span class="kp-ssl-self-signed" uk-icon="icon: lock; ratio: 0.85" uk-tooltip="Self-signed certificate"></span>';case"expired":return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="Expired certificate"></span>';case"mismatch":return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="Certificate does not match this domain"></span>';default:return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="No SSL certificate"></span>'}}async function Ge(e){let t=document.getElementById("admin-domain-ssl");if(!(!t||!e))try{let s=await k.get(`/ssl-status?domain=${encodeURIComponent(e)}`);t.outerHTML=sa(s.status)}catch{}}var Xe=["general","backups","notifications"];function $e(e){return`
        <div class="uk-flex" style="gap:8px">
            <a class="uk-button kp-btn-ghost kp-btn-sm" href="/api/settings/export?group=${e}" download="podnest-settings-${e}.csv" uk-tooltip="Export these settings">
                <span uk-icon="download"></span>
            </a>
            <label class="uk-button kp-btn-ghost kp-btn-sm" style="cursor:pointer" uk-tooltip="Import these settings from CSV">
                <span uk-icon="upload"></span>
                <input type="file" class="kp-settings-import" data-group="${e}" accept=".csv" style="display:none">
            </label>
        </div>`}async function Ee(e,t={}){if(!_()){e.innerHTML=T("Access denied");return}let[s,a,i,n]=await Promise.all([k.get("/settings"),k.get("/settings/backup"),k.get("/settings/notifications"),k.get("/settings/resources")]);e.innerHTML=`
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
                    ${$e("general")}
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
                    ${$e("backups")}
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
                    ${$e("notifications")}
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
    `;let o=e.querySelector("#kp-settings-pills"),l=e.querySelector("#kp-settings-switcher"),r=d=>{UIkit.switcher(l).show(d),o.querySelectorAll(":scope > li").forEach((b,p)=>b.classList.toggle("kp-pill-active",p===d)),history.replaceState(null,"",d===0?"#settings":`#settings/${Xe[d]}`)};o.querySelectorAll(":scope > li > a").forEach(d=>{d.addEventListener("click",b=>{b.preventDefault(),r(parseInt(d.closest("li").dataset.pill,10))})}),r(Math.max(0,Xe.indexOf(t.tab))),s.admin_domain&&Ge(s.admin_domain),e.querySelectorAll(".kp-settings-import").forEach(d=>{d.addEventListener("change",async b=>{let p=b.target.files[0];if(!p)return;let u=b.target.dataset.group,m=new FormData;m.append("file",p);try{let h=await fetch(`/api/settings/import?group=${encodeURIComponent(u)}`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:m}),v=h.status===204?null:await h.json().catch(()=>null);if(!h.ok)throw new Error(v?.error||`HTTP ${h.status}`);c.success("Settings imported"),await Ee(e,{tab:u})}catch(h){c.error(h.message)}finally{b.target.value=""}})}),document.getElementById("settings-form").addEventListener("submit",async d=>{d.preventDefault();let b=d.target.querySelector('[type="submit"]'),p=b.innerHTML;b.disabled=!0,b.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let u=new FormData(d.target),m={admin_domain:u.get("admin_domain").trim()},h={resource_ram_reserve_gb:u.get("resource_ram_reserve_gb").trim(),resource_poll_interval:u.get("resource_poll_interval").trim(),resource_throttle_pct:u.get("resource_throttle_pct").trim(),resource_webhook_url:u.get("resource_webhook_url").trim(),shutdown_job_timeout:u.get("shutdown_job_timeout").trim()};try{await k.put("/settings",m),await k.put("/settings/resources",h),c.success("Settings saved"),Ge(m.admin_domain)}catch(v){c.error(v.message)}finally{b.disabled=!1,b.innerHTML=p}}),document.getElementById("backup-form").addEventListener("submit",async d=>{d.preventDefault();let b=d.target.querySelector('[type="submit"]'),p=b.innerHTML;b.disabled=!0,b.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let u=new FormData(d.target),m={backup_schedule:u.get("backup_schedule").trim(),backup_retain_days:u.get("backup_retain_days").trim(),s3_endpoint:u.get("s3_endpoint").trim(),s3_bucket:u.get("s3_bucket").trim(),s3_region:u.get("s3_region").trim(),s3_access_key:u.get("s3_access_key").trim()},h=u.get("s3_secret_key").trim();h&&(m.s3_secret_key=h);try{await k.put("/settings/backup",m),c.success("Backup settings saved")}catch(v){c.error(v.message)}finally{b.disabled=!1,b.innerHTML=p}}),document.getElementById("notifications-form").addEventListener("submit",async d=>{d.preventDefault();let b=d.target.querySelector('[type="submit"]'),p=b.innerHTML;b.disabled=!0,b.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let u=new FormData(d.target),m={smtp_host:u.get("smtp_host").trim(),smtp_port:u.get("smtp_port").trim(),smtp_username:u.get("smtp_username").trim(),smtp_from:u.get("smtp_from").trim(),smtp_tls:u.get("smtp_tls")?"true":"false",aws_access_key:u.get("aws_access_key").trim(),aws_region:u.get("aws_region").trim(),aws_sns_sender_id:u.get("aws_sns_sender_id").trim()},h=u.get("smtp_password").trim();h&&(m.smtp_password=h);let v=u.get("aws_secret_key").trim();v&&(m.aws_secret_key=v);try{await k.put("/settings/notifications",m),c.success("Notification settings saved")}catch(g){c.error(g.message)}finally{b.disabled=!1,b.innerHTML=p}})}async function Qe(e){let t=`
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
        </div>`;document.body.insertAdjacentHTML("beforeend",t);let s=UIkit.modal("#kp-edit-site-modal"),a=document.getElementById("es-site-type"),i=document.getElementById("es-php-version-wrap"),n=document.getElementById("es-node-version-wrap"),o=document.getElementById("es-dotnet-version-wrap"),l=document.getElementById("es-python-version-wrap"),r=document.getElementById("es-start-command-wrap"),d=document.getElementById("es-wordpress-wrap");s.show();let b=p=>{i.classList.toggle("uk-hidden",p!==1&&p!==2||p===6),n.classList.toggle("uk-hidden",p!==4),o.classList.toggle("uk-hidden",p!==5),l.classList.toggle("uk-hidden",p!==7),r.classList.toggle("uk-hidden",p!==4&&p!==5&&p!==7),r.querySelector("input").required=p===7,d.classList.toggle("uk-hidden",p!==1)};b(e.SiteType),a.addEventListener("change",()=>b(parseInt(a.value))),document.getElementById("edit-site-form").addEventListener("submit",async p=>{p.preventDefault();let u=p.target.querySelector('[type="submit"]'),m=u.innerHTML;u.disabled=!0,u.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let h=new FormData(p.target),v=parseInt(h.get("site_type")),g=null;v===4&&(g=parseInt(h.get("node_version"))),v===5&&(g=parseInt(h.get("dotnet_version"))),v===7&&(g=parseInt(h.get("python_version")));let x={php_version:parseInt(h.get("php_version"))||3,site_type:v,runtime_version:g,start_command:h.get("start_command")?.trim()||""},$=v===1?h.get("install_wordpress")==="on":!1;try{if(await k.put(`/sites/${e.ID}`,x),s.hide(),document.getElementById("kp-edit-site-modal")?.remove(),v!==6){S("Applying Changes","Saving changes and recreating pod...");try{await k.post(`/sites/${e.ID}/recreate`,{install_wordpress:$,prune:!0}),w(),c.success("Site updated and pod recreated")}catch(C){w(),c.error("Site saved but pod recreate failed: "+C.message)}}else c.success("Site updated");y.go("site-detail",{id:String(e.ID)})}catch(C){c.error(C.message),u.disabled=!1,u.innerHTML=m}}),document.getElementById("kp-edit-site-modal").addEventListener("hidden",()=>document.getElementById("kp-edit-site-modal")?.remove())}function Ze(e){return`
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

        </div>`}function na(e){if(!e||e.length===0)return'<p class="kp-muted uk-text-small uk-margin-remove">No snapshots yet.</p>';let t=a=>a===2?'<span class="kp-mono" style="color:var(--kp-cyan)">S3</span>':'<span class="kp-mono" style="color:var(--kp-blue)">Local</span>';return`
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
            <tbody>${e.map(a=>`
        <tr>
            <td class="kp-mono" style="font-size:0.8rem">${f(a.SnapshotID)}</td>
            <td>${a.Label?f(a.Label):"\u2014"}</td>
            <td>${t(a.BackupType)}</td>
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
        </div>`}function Ye(e,t,s){let a=Date.now()+18e5,i=setInterval(async()=>{try{let n=await k.get(`/sites/${s||t}/backups/restore-status`);(!n?.active||Date.now()>a)&&(clearInterval(i),w(),n?.active?c.error("Import timed out \u2014 check server logs"):n?.error?c.error(`Import failed: ${n.error}`):c.success("Import complete"),await j(e,t))}catch{Date.now()>a&&(clearInterval(i),w(),c.error("Import status unavailable \u2014 check server logs"))}},3e3)}async function j(e,t){try{let[s,a]=await Promise.all([k.get(`/sites/${t}/backup-repo`),k.get(`/sites/${t}/backups`)]),i=e.querySelector("#backup-local-enabled"),n=e.querySelector("#backup-s3-enabled");i&&(i.checked=!!s.LocalEnabled),n&&(n.checked=!!s.S3Enabled);let o=e.querySelector("#backup-error-banner");if(o)if(s.last_error){let r=s.last_error_at?` (${new Date(s.last_error_at).toLocaleString()})`:"";o.innerHTML=`
                    <div uk-alert class="uk-alert-warning">
                        <a class="uk-alert-close" uk-close></a>
                        <p><strong>Last scheduled backup failed${r}:</strong> ${f(s.last_error)}</p>
                    </div>`}else o.innerHTML="";let l=e.querySelector("#backup-list-wrap");l&&(l.innerHTML=na(a))}catch(s){let a=e.querySelector("#backup-list-wrap");a&&(a.innerHTML=`<p class="kp-muted uk-text-small">Failed to load backups: ${f(s.message)}</p>`)}}function et(e,t){e.querySelector("#backup-repo-save")?.addEventListener("click",async()=>{let a={local_enabled:e.querySelector("#backup-local-enabled")?.checked??!1,s3_enabled:e.querySelector("#backup-s3-enabled")?.checked??!1};try{await k.put(`/sites/${t}/backup-repo`,a),c.success("Backup destinations saved")}catch(i){c.error(i.message)}}),e.querySelector("#backup-run-btn")?.addEventListener("click",async()=>{try{await k.post(`/sites/${t}/backups`,{label:"manual"})}catch(n){c.error(n.message);return}S("Backup Running","Snapshotting files and database \u2014 this may take a few minutes.");let a=Date.now()+1800*1e3,i=setInterval(async()=>{try{let n=await k.get(`/sites/${t}/backups/backup-status`);(!n?.active||Date.now()>a)&&(clearInterval(i),w(),await j(e,t),n?.active?c.error("Backup is taking longer than expected \u2014 check server logs for status"):n?.error?c.error(`Backup failed: ${n.error}`):c.success("Backup complete"))}catch{}},4e3)}),e.querySelector("#backup-list-wrap")?.addEventListener("click",async a=>{let i=a.target.closest(".backup-restore-btn");if(i){let l=i.dataset.id;if(!await E("Restore Site","This will restore the site from the selected snapshot. The site will show a maintenance page during the restore. Continue?"))return;try{await k.post(`/sites/${t}/backups/${l}/restore`)}catch(u){c.error(u.message);return}S("Restore Running","Restoring files and database \u2014 the site will return automatically when complete.");let d=Date.now(),b=Date.now()+900*1e3,p=setInterval(async()=>{try{let u=await k.get(`/sites/${t}/backups/restore-status`);(!u?.active||Date.now()>b)&&(clearInterval(p),w(),u?.active?c.error("Restore timed out"):c.success("Restore complete"),await j(e,t))}catch{}},3e3);return}let n=a.target.closest(".backup-delete-btn");if(n){let l=n.dataset.id;if(!await E("Delete Snapshot","This will permanently remove the snapshot from all configured repositories. This cannot be undone."))return;S("Deleting Snapshot","Removing snapshot data from repositories \u2014 this may take a moment.");try{await k.delete(`/sites/${t}/backups/${l}`),w(),c.success("Snapshot deleted"),await j(e,t)}catch(d){w(),c.error(d.message)}}let o=a.target.closest(".backup-download-btn");if(o){let l=o.dataset.id,r=`${Date.now().toString(36)}${Math.random().toString(36).slice(2,10)}`,d=`kp_dl_${r}`;S("Preparing Download","Your backup archive is being generated \u2014 this may take a moment depending on site size. Your download will begin automatically. Do not close this tab."),setTimeout(()=>{let b=document.createElement("a");b.href=`/api/sites/${t}/backups/${l}/download?dl=${r}`,b.style.display="none",document.body.appendChild(b),b.click(),document.body.removeChild(b);let p=Date.now(),u=setInterval(()=>{!document.cookie.split(";").some(h=>h.trim().startsWith(`${d}=`))&&Date.now()-p<18e5||(clearInterval(u),document.cookie=`${d}=; Path=/; Max-Age=0`,w())},500)},300);return}});let s=e.querySelector("#import-backup-modal");s&&(UIkit.util.on(s,"beforeshow",async()=>{let a=s.querySelector("#import-target-site");try{let n=await k.get("/sites"),o=Number(t);a.innerHTML=n.map(l=>`<option value="${l.ID}"${Number(l.ID)===o?" selected":""}>${l.Name}</option>`).join("")}catch{a.innerHTML='<option value="">Failed to load sites</option>'}let i=s.querySelector("#import-sftp-list");try{let n=await k.get(`/sites/${t}/backups/import/files`);!n||n.length===0?i.innerHTML='<p class="kp-muted uk-text-small">No files found.</p>':i.innerHTML=n.map(o=>`
                    <div class="uk-flex uk-flex-middle uk-flex-between uk-margin-small-bottom">
                        <span class="kp-mono uk-text-small">${f(o)}</span>
                        <button class="uk-button kp-btn-primary kp-btn-sm import-sftp-btn" data-file="${f(o)}">
                            Restore
                        </button>
                    </div>`).join("")}catch(n){i.innerHTML=`<p class="kp-muted uk-text-small">Failed to list files: ${f(n.message)}</p>`}}),s.querySelector("#import-upload-btn")?.addEventListener("click",async()=>{let a=s.querySelector("#import-file-input"),i=s.querySelector("#import-target-site")?.value;if(!a?.files?.length){c.error("Select an archive file first");return}let n=a.files[0],o=new FormData;o.append("archive",n),o.append("target_site_id",i),UIkit.modal(s).hide(),S("Importing Backup","Uploading and restoring \u2014 this may take several minutes.");try{await fetch(`/api/sites/${t}/backups/import/upload`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:o,credentials:"same-origin"}).then(async l=>{if(!l.ok){let r=await l.json().catch(()=>({}));throw new Error(r.error||`HTTP ${l.status}`)}})}catch(l){w(),c.error(l.message);return}Ye(e,t,i)}),s.querySelector("#import-sftp-list")?.addEventListener("click",async a=>{let i=a.target.closest(".import-sftp-btn");if(!i)return;let n=i.dataset.file,o=s.querySelector("#import-target-site")?.value;UIkit.modal(s).hide(),S("Importing from SFTP","Restoring archive \u2014 this may take several minutes.");try{await k.post(`/sites/${t}/backups/import/sftp`,{filename:n,target_site_id:parseInt(o,10)})}catch(l){w(),c.error(l.message);return}Ye(e,t,o)}))}function Le(){return`
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
        </div>`}async function X(e){let t=document.getElementById("basicauth-panel");if(t)try{let[s,a]=await Promise.all([k.get(`/sites/${e}/basicauth`),k.get(`/sites/${e}/basicauth/users`)]),i=t.querySelector("#ba-enabled"),n=t.querySelector("#ba-realm");i&&(i.checked=!!s.Enabled),n&&(n.value=s.Realm??"Restricted"),ia(t,a??[])}catch(s){c.error("Failed to load basic auth settings: "+s.message)}}function ia(e,t){let s=e.querySelector("#ba-users-list");if(s){if(!t.length){s.innerHTML='<p class="kp-muted uk-text-small">No credentials configured.</p>';return}s.innerHTML=t.map(a=>`
        <div class="uk-flex uk-flex-middle uk-margin-small-bottom ba-user-row" data-uid="${a.id}" style="gap:8px">
            <span class="kp-mono" style="flex:1">${f(a.username)}</span>
            <a href="javascript:void(0);" class="kp-muted ba-delete-btn" uk-icon="trash" uk-tooltip="Remove credential"></a>
        </div>`).join("")}}function Te(e,t){let s=new AbortController,a={signal:s.signal};e.addEventListener("click",async i=>{if(!i.target.closest("#ba-config-save"))return;let n=e.querySelector("#ba-config-save"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.put(`/sites/${t}/basicauth`,{enabled:e.querySelector("#ba-enabled").checked,realm:e.querySelector("#ba-realm").value.trim()||"Restricted"}),c.success("Basic auth settings saved")}catch(l){c.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}},a),e.addEventListener("click",async i=>{if(!i.target.closest("#ba-add-user"))return;let n=e.querySelector("#ba-new-username").value.trim(),o=e.querySelector("#ba-new-password").value;if(!n||!o){c.error("Username and password are required");return}let l=e.querySelector("#ba-add-user"),r=l.innerHTML;l.disabled=!0,l.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.put(`/sites/${t}/basicauth/users`,{username:n,password:o}),c.success(`Credential saved for ${n}`),e.querySelector("#ba-new-username").value="",e.querySelector("#ba-new-password").value="",await X(t)}catch(d){c.error(d.message)}finally{l.disabled=!1,l.innerHTML=r}},a),e.addEventListener("click",async i=>{let n=i.target.closest(".ba-delete-btn");if(!n)return;let o=n.closest(".ba-user-row")?.dataset.uid;if(o)try{await k.delete(`/sites/${t}/basicauth/users/${o}`),c.success("Credential removed"),await X(t)}catch(l){c.error(l.message)}},a),e.__basicAuthAbort?.abort(),e.__basicAuthAbort=s}var Q={1:"Nginx",2:"PHP",3:"MariaDB",4:"Redis",5:"Varnish"};function Z(e,t,s){let a=s?Object.entries(s):[];return`
        <div>
            <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                <div class="uk-flex uk-flex-middle" style="gap:10px">
                    <h4 class="kp-view-title uk-margin-remove">${Q[t]}</h4>
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
                ${a.map(([i,n])=>Y(i,n)).join("")}
            </div>
        </div>`}function tt(e,t){let s=t?.enabled==="true",a=t?Object.entries(t).filter(([i])=>i!=="enabled"):[];return`
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
                    <input type="checkbox" class="uk-checkbox varnish-enabled-toggle" ${s?"checked":""}>
                    <span>Enable Varnish Cache</span>
                    <span class="kp-muted uk-text-small">\u2014 requires pod recreate to take effect</span>
                </label>
            </div>

            <div class="kp-config-grid cfg-rows" data-type="5">
                ${a.map(([i,n])=>Y(i,n)).join("")}
            </div>
        </div>`}function Y(e="",t=""){return`<div class="kp-config-row">
        <div class="kp-config-key">
            <input class="cfg-key" type="text" value="${e}" placeholder="key">
        </div>
        <div class="kp-config-val">
            <input class="cfg-val" type="text" value="${t}" placeholder="value">
        </div>
        <button class="kp-config-del cfg-del-row" title="Remove">
            <span uk-icon="icon: close; ratio: 0.8"></span>
        </button>
    </div>`}function at(e,t,s){e.addEventListener("click",a=>{if(a.target.closest(".cfg-add-row")){let i=a.target.closest(".cfg-add-row");e.querySelector(`.cfg-rows[data-type="${i.dataset.type}"]`).insertAdjacentHTML("beforeend",Y())}},{signal:s}),e.addEventListener("click",a=>{a.target.closest(".cfg-del-row")&&a.target.closest(".kp-config-row").remove()},{signal:s}),e.addEventListener("click",async a=>{let i=a.target.closest(".cfg-save");if(!i)return;let{type:n,site:o}=i.dataset,l=e.querySelectorAll(`.cfg-rows[data-type="${n}"] .kp-config-row`),r={};if(l.forEach(d=>{let b=d.querySelector(".cfg-key").value.trim(),p=d.querySelector(".cfg-val").value.trim();b&&(r[b]=p)}),n==="5"){let d=e.querySelector(".varnish-enabled-toggle");r.enabled=d?.checked?"true":"false"}try{await k.put(`/sites/${o}/configs/${n}`,r),c.success(`${Q[n]} config saved`)}catch(d){c.error(d.message)}},{signal:s}),e.addEventListener("click",async a=>{let i=a.target.closest(".cfg-reset");if(!i)return;let{type:n,site:o}=i.dataset;if(await E("Reset Config",`Reset ${Q[n]} config to defaults?`))try{let r=await k.post(`/sites/${o}/configs/${n}/reset`),d=e.querySelector(`.cfg-rows[data-type="${n}"]`);d.innerHTML=Object.entries(r).map(([b,p])=>Y(b,p)).join(""),c.success(`${Q[n]} reset to defaults`)}catch(r){c.error(r.message)}},{signal:s}),e.addEventListener("change",async a=>{let i=a.target.closest(".cfg-import-input");if(!i)return;let{type:n,site:o}=i.dataset,l=i.files[0];if(!l)return;let r=new FormData;r.append("file",l);try{let d=await fetch(`/api/sites/${o}/configs/${n}/import`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:r}),b=d.status===204?null:await d.json().catch(()=>null);if(!d.ok)throw new Error(b?.error||`HTTP ${d.status}`);let p=e.querySelector(`.cfg-rows[data-type="${n}"]`);p.innerHTML=Object.entries(b).map(([u,m])=>Y(u,m)).join(""),c.success(`${Q[n]} config imported`)}catch(d){c.error(d.message)}finally{i.value=""}},{signal:s})}function nt(e){return`
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

        </div>`}function it(e){if(!e||e.length===0)return'<p class="kp-muted uk-text-small uk-margin-remove">No cron jobs configured.</p>';let t=a=>a?new Date(a).toLocaleString():"\u2014";return`
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
            <tbody>${e.map(a=>`
        <tr>
            <td class="kp-text">${a.Label||'<span class="kp-muted">\u2014</span>'}</td>
            <td class="kp-mono kp-text-sm">${a.Schedule}</td>
            <td class="kp-muted uk-text-small">${t(a.LastRun)}</td>
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
        </div>`}async function ue(e,t){let s=e.querySelector("#cron-list-wrap");if(s)try{let a=await k.get(`/sites/${t}/crons`);s.innerHTML=it(a)}catch(a){s.innerHTML=`<p class="kp-muted uk-text-small">Failed to load cron jobs: ${f(a.message)}</p>`}}function ot(e,t){let s=[],a=e.querySelector("#cron-modal"),i=e.querySelector("#cron-modal-title"),n=e.querySelector("#cron-modal-id"),o=e.querySelector("#cron-modal-label"),l=e.querySelector("#cron-modal-command"),r=e.querySelector("#cron-modal-schedule"),d=e.querySelector("#cron-schedule-preview"),b=e.querySelector("#cron-modal-enabled");r?.addEventListener("input",()=>{d.textContent=st(r.value.trim())}),e.querySelector("#cron-add-btn")?.addEventListener("click",()=>{i.textContent="Add Cron Job",n.value="",o.value="",l.value="",r.value="",d.textContent="",b.checked=!0,UIkit.modal(a).show()}),e.querySelector("#cron-modal-save")?.addEventListener("click",async()=>{let p=l.value.trim(),u=r.value.trim();if(!p||!u){c.error("Command and schedule are required");return}let m={label:o.value.trim(),command:p,schedule:u,enabled:b.checked},h=n.value;try{h?(await k.put(`/sites/${t}/crons/${h}`,m),c.success("Cron job updated")):(await k.post(`/sites/${t}/crons`,m),c.success("Cron job created")),UIkit.modal(a).hide(),await ue(e,t),s=await k.get(`/sites/${t}/crons`)}catch(v){c.error(v.message)}}),e.querySelector("#cron-list-wrap")?.addEventListener("click",async p=>{let u=p.target.closest(".cron-detail-btn");if(u){let g=u.dataset.id,x=s.find(C=>String(C.ID)===g);if(!x)return;document.body.insertAdjacentHTML("beforeend",`
                <div id="cron-detail-modal" uk-modal>
                    <div class="uk-modal-dialog kp-modal uk-modal-body uk-width-large">
                        <button class="uk-modal-close-default" type="button" uk-close></button>
                        <h3 class="kp-view-title uk-margin-bottom">Run Details \u2014 ${f(x.Label||String(x.ID))}</h3>
                        <div class="uk-margin-small-bottom">
                            <label class="kp-label">Output</label>
                            <pre class="kp-cron-output">${f(x.LastOutput||"(no output)")}</pre>
                        </div>
                        <div class="uk-margin-small-top">
                            <label class="kp-label">Error</label>
                            <pre class="kp-cron-output kp-cron-output-error">${f(x.LastError||"(no error)")}</pre>
                        </div>
                    </div>
                </div>`);let $=document.getElementById("cron-detail-modal");UIkit.modal($).show(),$.addEventListener("hidden",()=>$.remove(),{once:!0});return}let m=p.target.closest(".cron-edit-btn");if(m){let g=m.dataset.id,x=s.find($=>String($.ID)===g);if(!x)return;i.textContent="Edit Cron Job",n.value=x.ID,o.value=x.Label||"",l.value=x.Command,r.value=x.Schedule,d.textContent=st(x.Schedule),b.checked=x.Enabled,UIkit.modal(a).show();return}let h=p.target.closest(".cron-delete-btn");if(h){let g=h.dataset.id;if(!await E("Delete Cron Job","This will permanently remove the cron job. Continue?"))return;try{await k.delete(`/sites/${t}/crons/${g}`),c.success("Cron job deleted"),await ue(e,t),s=await k.get(`/sites/${t}/crons`)}catch($){c.error($.message)}return}let v=p.target.closest(".cron-run-btn");if(v){let g=v.dataset.id;try{await k.post(`/sites/${t}/crons/${g}/run`)}catch(B){c.error(B.message);return}S("Running Cron Job","Executing the job inside the container \u2014 please wait.");let x=null;try{x=(await k.get(`/sites/${t}/crons`)).find(H=>String(H.ID)===g)?.LastRun??null}catch{}let $=Date.now()+300*1e3,C=setInterval(async()=>{try{let B=await k.get(`/sites/${t}/crons`),H=B.find(te=>String(te.ID)===g);if(!H||H.LastRun!==x||Date.now()>$){clearInterval(C),w(),s=B??[];let te=e.querySelector("#cron-list-wrap");te&&(te.innerHTML=it(B)),H?.LastError?c.error(`Job failed: ${H.LastError}`):c.success("Cron job complete")}}catch{}},2e3);return}}),e.querySelector("#cron-list-wrap")?.addEventListener("change",async p=>{let u=p.target.closest(".cron-toggle");if(!u)return;let m=u.dataset.id;try{await k.patch(`/sites/${t}/crons/${m}/toggle`,{enabled:u.checked}),c.success(u.checked?"Cron job enabled":"Cron job disabled")}catch(h){c.error(h.message),u.checked=!u.checked}}),k.get(`/sites/${t}/crons`).then(p=>{s=p??[]}).catch(()=>{})}function st(e){if(!e)return"";let t=e.trim().split(/\s+/);if(t.length!==5)return"invalid expression";let[s,a,i,n,o]=t;if(e==="* * * * *")return"every minute";if(s!=="*"&&a!=="*"&&i==="*"&&n==="*"&&o==="*")return`daily at ${a.padStart(2,"0")}:${s.padStart(2,"0")}`;if(s!=="*"&&a!=="*"&&i==="*"&&n==="*"&&o!=="*"){let l=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return`weekly on ${o.split(",").map(d=>l[parseInt(d)]??d).join(", ")} at ${a.padStart(2,"0")}:${s.padStart(2,"0")}`}return s.startsWith("*/")?`every ${s.slice(2)} minutes`:a.startsWith("*/")?`every ${a.slice(2)} hours`:e}function dt(e,t){return`
        <div id="dbtools-panel" data-site-id="${e}">

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

            ${t===1?`
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
            </div>`:""}

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
                    Without wipe, the dump is merged into the existing database \u2014 tables the dump recreates are
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
        </div>`}function ut(e,t){e.querySelector("#dbtools-dump-btn")?.addEventListener("click",()=>{let s=`${Date.now().toString(36)}${Math.random().toString(36).slice(2,10)}`,a=`kp_dl_${s}`;S("Preparing Download","Your database dump is being generated \u2014 your download will begin automatically. Do not close this tab."),setTimeout(()=>{let i=document.createElement("a");i.href=`/api/sites/${t}/db/dump?dl=${s}`,i.style.display="none",document.body.appendChild(i),i.click(),document.body.removeChild(i);let n=Date.now(),o=setInterval(()=>{!document.cookie.split(";").some(r=>r.trim().startsWith(`${a}=`))&&Date.now()-n<18e5||(clearInterval(o),document.cookie=`${a}=; Path=/; Max-Age=0`,w())},500)},300)}),e.querySelector("#dbtools-upload-btn")?.addEventListener("click",async()=>{let s=e.querySelector("#dbtools-file-input");if(!s?.files?.length){c.error("Select a .sql or .sql.gz file first");return}let a=await lt(e);if(a===null)return;let i=new FormData;i.append("dump",s.files[0]),i.append("wipe",a?"1":"0"),S("Importing Database","Uploading and importing \u2014 the site is in maintenance mode until this completes.");try{await fetch(`/api/sites/${t}/db/import/upload`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:i,credentials:"same-origin"}).then(async n=>{if(!n.ok){let o=await n.json().catch(()=>({}));throw new Error(o.error||`HTTP ${n.status}`)}})}catch(n){w(),c.error(n.message);return}s.value="",rt(e,t)}),e.querySelector("#dbtools-sftp-list")?.addEventListener("click",async s=>{let a=s.target.closest(".dbtools-sftp-btn");if(!a)return;let i=await lt(e);if(i!==null){S("Importing Database","Importing from SFTP \u2014 the site is in maintenance mode until this completes.");try{await k.post(`/sites/${t}/db/import/sftp`,{filename:a.dataset.file,wipe:i})}catch(n){w(),c.error(n.message);return}rt(e,t)}}),e.querySelector("#dbtools-sr-preview")?.addEventListener("click",()=>ct(e,t,!0)),e.querySelector("#dbtools-sr-run")?.addEventListener("click",()=>ct(e,t,!1)),e.querySelector("#dbtools-sftp-refresh")?.addEventListener("click",()=>Pe(e,t)),Pe(e,t)}async function lt(e){let t=!!e.querySelector("#dbtools-wipe")?.checked;return await E(t?"Wipe & Import Database":"Import Database",t?"Every table, view and routine in this site's database will be dropped before the import. This cannot be undone.":"The dump will be merged into this site's database, replacing any tables it recreates. This cannot be undone.")?t:null}async function Pe(e,t){let s=e.querySelector("#dbtools-sftp-list");if(s)try{let a=await k.get(`/sites/${t}/db/import/files`);if(!a||a.length===0){s.innerHTML='<p class="kp-muted uk-text-small uk-margin-remove">No files found.</p>';return}s.innerHTML=a.map(i=>`
            <div class="uk-flex uk-flex-middle uk-flex-between uk-margin-small-bottom">
                <span class="kp-mono uk-text-small">${f(i)}</span>
                <button class="uk-button kp-btn-primary kp-btn-sm dbtools-sftp-btn" data-file="${f(i)}">
                    Import
                </button>
            </div>`).join("")}catch(a){s.innerHTML=`<p class="kp-muted uk-text-small">Failed to list files: ${f(a.message)}</p>`}}function rt(e,t){let s=Date.now()+18e5,a=setInterval(async()=>{try{let i=await k.get(`/sites/${t}/db/import/status`);(!i?.active||Date.now()>s)&&(clearInterval(a),w(),i?.active?c.error("Import timed out \u2014 check server logs"):i?.error?c.error(`Import failed: ${i.error}`):c.success("Import complete"),await Pe(e,t))}catch{Date.now()>s&&(clearInterval(a),w(),c.error("Import status unavailable \u2014 check server logs"))}},3e3)}async function ct(e,t,s){let a=e.querySelector("#dbtools-sr-search")?.value??"",i=e.querySelector("#dbtools-sr-replace")?.value??"",n=e.querySelector("#dbtools-sr-result");if(!a){c.error("Enter a search term first");return}if(!(!s&&!await E("Run Search & Replace",`Every occurrence of "${a}" in this site's database will be replaced with "${i}". This cannot be undone \u2014 download a dump first if unsure.`))){S(s?"Previewing Search & Replace":"Running Search & Replace","Scanning every table in the site's database \u2014 this may take a while on large sites.");try{let o=await k.post(`/sites/${t}/db/search-replace`,{search:a,replace:i,dry_run:s},18e5);w();let l=o?.count??0,r=s?`${l} replacement${l===1?"":"s"} would be made`:`${l} replacement${l===1?"":"s"} made`;n&&(n.innerHTML=`<p class="kp-text uk-text-small uk-margin-small-top uk-margin-remove-bottom">${f(r)}</p>`),s||c.success(r)}catch(o){w(),c.error(o.message)}}}var q="";function ht(e){return`
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
        </div>`}function oa(){let e=q?q.split("/"):[],t="",s=['<a href="#" data-path="">html</a>'];for(let a of e)t=t?t+"/"+a:a,s.push(`<span class="kp-fm-sep">/</span><a href="#" data-path="${f(t)}">${f(a)}</a>`);return s.join("")}function la(e){let t=new Date(e);return isNaN(t)?"":t.toLocaleString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function pt(e){return e==="d"?"folder":e==="l"?"link":"file-text"}function O(e,t){return e?e+"/"+t:t}var mt=new Set(["php","js","jsx","ts","tsx","css","scss","sass","less","html","htm","xml","json","txt","md","markdown","yml","yaml","ini","conf","cnf","toml","env","sh","bash","sql","log","csv","tsv","svg","htaccess","gitignore","lock","map"]);function ra(e,t){if(t)return!1;let s=e.lastIndexOf(".");return e.startsWith(".")&&s===0?mt.has(e.slice(1).toLowerCase()):s>=0&&mt.has(e.slice(s+1).toLowerCase())}function ca(e){if(!e||!e.length)return se("folder","This folder is empty");let t=document.getElementById("fm-root").dataset.site;return`
        <table class="uk-table uk-table-divider uk-table-small uk-table-middle kp-fm-table">
            <thead>
                <tr>
                    <th>Name</th><th>Size</th><th>Perms</th><th>Modified</th><th></th>
                </tr>
            </thead>
            <tbody>${e.map(a=>{let i=O(q,a.name),n=a.is_dir,o=ra(a.name,n),l=n?`<a href="#" class="fm-nav" data-path="${f(i)}"><span uk-icon="icon: ${pt(a.type)}; ratio: 0.9"></span> ${f(a.name)}</a>`:`<span><span uk-icon="icon: ${pt(a.type)}; ratio: 0.9"></span> ${f(a.name)}</span>`;return`
            <tr data-path="${f(i)}" data-name="${f(a.name)}" data-dir="${n?1:0}" data-mode="${f(a.mode)}">
                <td class="kp-fm-name">${l}</td>
                <td class="uk-text-nowrap">${L(a.size,n)}</td>
                <td><code class="kp-mono">${f(a.mode)}</code></td>
                <td class="uk-text-nowrap uk-text-small kp-muted">${la(a.mod_time)}</td>
                <td class="uk-text-right uk-text-nowrap">
                    ${o?`<button class="kp-fm-act fm-edit" data-path="${f(i)}" uk-tooltip="Edit"><span uk-icon="icon: pencil; ratio: 0.85"></span></button>`:""}
                    ${n?"":`<a class="kp-fm-act fm-download" href="/api/sites/${t}/files/download?path=${encodeURIComponent(i)}" uk-tooltip="Download"><span uk-icon="icon: download; ratio: 0.85"></span></a>`}
                    <button class="kp-fm-act fm-chmod" uk-tooltip="Permissions"><span uk-icon="icon: settings; ratio: 0.85"></span></button>
                    <button class="kp-fm-act fm-rename" uk-tooltip="Rename / Move"><span uk-icon="icon: move; ratio: 0.85"></span></button>
                    <button class="kp-fm-act fm-copy" uk-tooltip="Copy"><span uk-icon="icon: copy; ratio: 0.85"></span></button>
                    <button class="kp-fm-act fm-delete" uk-tooltip="Delete"><span uk-icon="icon: trash; ratio: 0.85"></span></button>
                </td>
            </tr>`}).join("")}</tbody>
        </table>`}async function I(e){let t=document.getElementById("fm-list"),s=document.getElementById("fm-breadcrumb");if(t){t.innerHTML=ae(),s&&(s.innerHTML=oa());try{let a=await k.get(`/sites/${e}/files?path=${encodeURIComponent(q)}`);t.innerHTML=ca(a)}catch(a){t.innerHTML=T("Failed to list files: "+a.message)}}}function kt(e,t){q=t||"",I(e)}function ee(e,t,s=""){return new Promise(a=>{let i="fm-prompt-modal";document.getElementById(i)?.remove();let n=document.createElement("div");n.id=i,n.setAttribute("uk-modal",""),n.innerHTML=`
            <div class="uk-modal-dialog uk-modal-body kp-modal">
                <h3 class="uk-modal-title">${f(e)}</h3>
                <label class="kp-label uk-margin-small-bottom">${f(t)}</label>
                <input class="uk-input kp-input" id="fm-prompt-input" value="${f(s)}" autocomplete="off">
                <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                    <button class="uk-button kp-btn-ghost uk-modal-close">Cancel</button>
                    <button class="uk-button kp-btn-primary" id="fm-prompt-ok">OK</button>
                </div>
            </div>`,document.body.appendChild(n),window.UIkit&&UIkit.icon(n);let o=UIkit.modal(n),l=n.querySelector("#fm-prompt-input"),r=!1,d=b=>{r||(r=!0,a(b),o.hide())};n.querySelector("#fm-prompt-ok").addEventListener("click",()=>d(l.value.trim()||null)),l.addEventListener("keydown",b=>{b.key==="Enter"&&(b.preventDefault(),d(l.value.trim()||null))}),UIkit.util.on(n,"hidden",()=>{r||(r=!0,a(null)),n.remove()}),o.show(),setTimeout(()=>l.focus(),50)})}async function da(e,t){let s=O(q,t.name),a=await fetch(`/api/sites/${e}/files/upload?path=${encodeURIComponent(s)}`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:t}),i=a.status===204?null:await a.json().catch(()=>null);if(!a.ok)throw new Error(i?.error||`HTTP ${a.status}`)}function vt(e,t){q="",e.addEventListener("click",s=>{let a=s.target.closest("#fm-breadcrumb a");if(a){s.preventDefault(),kt(t,a.dataset.path);return}let i=s.target.closest(".fm-nav");if(i){s.preventDefault(),kt(t,i.dataset.path);return}let n=s.target.closest(".fm-edit");if(n){s.preventDefault(),ma(t,n.dataset.path,n.dataset.path.split("/").pop());return}}),e.querySelector("#fm-new-file")?.addEventListener("click",async()=>{let s=await ee("New File","File name");if(s)try{await k.post(`/sites/${t}/files/file`,{path:O(q,s)}),I(t)}catch(a){c.error(a.message)}}),e.querySelector("#fm-new-dir")?.addEventListener("click",async()=>{let s=await ee("New Folder","Folder name");if(s)try{await k.post(`/sites/${t}/files/dir`,{path:O(q,s)}),I(t)}catch(a){c.error(a.message)}}),e.querySelector("#fm-upload")?.addEventListener("change",async s=>{let a=[...s.target.files];if(a.length)try{for(let i of a)await da(t,i);c.success(a.length===1?"File uploaded":`${a.length} files uploaded`),I(t)}catch(i){c.error(i.message)}finally{s.target.value=""}}),e.querySelector("#fm-refresh")?.addEventListener("click",()=>I(t)),e.addEventListener("click",async s=>{let a=s.target.closest("tr[data-path]");if(!a)return;let i=a.dataset.path,n=a.dataset.name;if(s.target.closest(".fm-chmod")){let o=await ee("Permissions",`Octal mode for "${n}"`,a.dataset.mode);if(!o)return;try{await k.patch(`/sites/${t}/files/chmod`,{path:i,mode:o}),I(t)}catch(l){c.error(l.message)}return}if(s.target.closest(".fm-rename")){let o=await ee("Rename / Move","New path (relative to current folder)",n);if(!o||o===n)return;try{await k.post(`/sites/${t}/files/move`,{src:i,dst:O(q,o)}),I(t)}catch(l){c.error(l.message)}return}if(s.target.closest(".fm-copy")){let o=await ee("Copy","Destination name",n+"-copy");if(!o)return;try{await k.post(`/sites/${t}/files/copy`,{src:i,dst:O(q,o)}),I(t)}catch(l){c.error(l.message)}return}if(s.target.closest(".fm-delete")){if(!await E("Delete",`Delete "${n}"? This cannot be undone.`))return;try{await k.delete(`/sites/${t}/files?path=${encodeURIComponent(i)}`),I(t)}catch(l){c.error(l.message)}return}})}var pe=null;function bt(e){if(document.querySelector(`link[href="${e}"]`))return;let t=document.createElement("link");t.rel="stylesheet",t.href=e,document.head.appendChild(t)}function _e(e){return new Promise((t,s)=>{let a=document.querySelector(`script[src="${e}"]`);if(a){if(a.dataset.loaded)return t();a.addEventListener("load",()=>t()),a.addEventListener("error",()=>s(new Error("failed to load "+e)));return}let i=document.createElement("script");i.src=e,i.addEventListener("load",()=>{i.dataset.loaded="1",t()}),i.addEventListener("error",()=>s(new Error("failed to load "+e))),document.head.appendChild(i)})}function ua(){if(pe)return pe;let e="https://cdn.jsdelivr.net/npm/codemirror@5";return bt(`${e}/lib/codemirror.css`),bt(`${e}/theme/material-darker.css`),pe=_e(`${e}/lib/codemirror.js`).then(()=>Promise.all([_e(`${e}/mode/meta.js`),_e(`${e}/addon/mode/loadmode.js`)])).then(()=>{window.CodeMirror.modeURL=`${e}/mode/%N/%N.js`}),pe}function pa(e){let t=window.CodeMirror.findModeByFileName(e);return t?t.mode:null}async function ma(e,t,s){let a;try{a=await k.get(`/sites/${e}/files/content?path=${encodeURIComponent(t)}`)}catch(u){let m=/too large/i.test(u.message)?"File is too large to edit \u2014 download it instead.":/binary/i.test(u.message)?"Binary file \u2014 download it instead of editing.":u.message;c.error(m);return}try{await ua()}catch(u){c.error("Editor failed to load: "+u.message);return}let i="fm-editor-modal";document.getElementById(i)?.remove();let n=document.createElement("div");n.id=i,n.setAttribute("uk-modal",""),n.innerHTML=`
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
        </div>`,document.body.appendChild(n),window.UIkit&&UIkit.icon(n);let o=UIkit.modal(n,{bgClose:!1,escClose:!0}),l=n.querySelector("#fm-ed-dirty"),r=null,d=!0,b=u=>{d=!u,l.hidden=!u};UIkit.util.on(n,"shown",()=>{if(r)return;r=window.CodeMirror.fromTextArea(n.querySelector("#fm-ed-area"),{value:a.content,lineNumbers:!0,theme:"material-darker",indentUnit:4,lineWrapping:!1,extraKeys:{"Ctrl-S":p,"Cmd-S":p,"Ctrl-F":"findPersistent","Ctrl-/":"toggleComment"}}),r.setValue(a.content),r.on("change",()=>b(!0));let u=pa(s);u&&(r.setOption("mode",u),window.CodeMirror.autoLoadMode(r,u)),setTimeout(()=>r.refresh(),30)}),UIkit.util.on(n,"hidden",()=>n.remove());async function p(){if(!r)return;let u=n.querySelector("#fm-ed-save"),m=u.innerHTML;u.disabled=!0,u.innerHTML='<div uk-spinner="ratio: 0.6"></div>';try{await k.put(`/sites/${e}/files/content`,{path:t,content:r.getValue()}),b(!1),c.success("Saved"),I(e)}catch(h){c.error(h.message)}finally{u.disabled=!1,u.innerHTML=m}}n.querySelector("#fm-ed-save").addEventListener("click",p),UIkit.util.on(n,"beforehide",u=>{!d&&!window.confirm("Discard unsaved changes?")&&u.preventDefault()}),o.show()}var ka=2e3;function Ie(e,t){return`
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
        </div>`}function gt(e,t){let s=null,a=!1,i=e.querySelector("#log-output"),n=e.querySelector("#log-connect"),o=e.querySelector("#log-disconnect"),l=e.querySelector("#log-clear"),r=e.querySelector("#log-autoscroll"),d=e.querySelector("#log-status");function b(m){for(m.split(`
`).forEach(h=>{if(!h)return;let v=document.createElement("div");v.className=h.match(/WAF BLOCK/i)?"kp-log-line-err":h.match(/WAF DETECT/i)?"kp-log-line-warn":h.match(/error|crit|emerg/i)?"kp-log-line-err":h.match(/warn/i)?"kp-log-line-warn":h.match(/info|notice/i)?"kp-log-line-info":"",v.textContent=h,i.appendChild(v)});i.childElementCount>ka;)i.removeChild(i.firstChild);r.checked&&(i.scrollTop=i.scrollHeight)}function p(){s&&(s.close(),s=null),a=!1,n.disabled=!1,o.disabled=!0,d&&(d.textContent="Disconnected")}n.addEventListener("click",()=>{p();let m=e.querySelector("#log-container").value,h=e.querySelector("#log-tail").value,v=location.protocol==="https:"?"wss":"ws",g=m==="waf"?`${v}://${location.host}/api/sites/${t}/logs/waf?tail=${h}`:m==="proxy"?`${v}://${location.host}/api/sites/${t}/logs/proxy?tail=${h}`:m==="access"?`${v}://${location.host}/api/sites/${t}/logs/proxy?tail=${h}`:`${v}://${location.host}/api/sites/${t}/logs?container=${m}&tail=${h}`;s=new WebSocket(g),s.onopen=()=>{a=!0,n.disabled=!0,o.disabled=!1,d&&(d.textContent=`Connected \u2014 ${m}`)},s.onmessage=x=>b(x.data),s.onerror=()=>{},s.onclose=()=>{a=!1,n.disabled=!1,o.disabled=!0,d&&(d.textContent="Disconnected")}}),o.addEventListener("click",p),l.addEventListener("click",()=>{i.innerHTML=""}),e.querySelector("#log-container").addEventListener("change",()=>{s&&s.readyState===WebSocket.OPEN&&(p(),n.click())});let u=y.go.bind(y);y.go=function(m,h={}){return s&&p(),u(m,h)}}function ba(e){switch(e){case"valid":return'<span class="kp-ssl-valid" uk-icon="icon: lock; ratio: 0.85" uk-tooltip="Valid SSL certificate"></span>';case"self-signed":return'<span class="kp-ssl-self-signed" uk-icon="icon: lock; ratio: 0.85" uk-tooltip="Self-signed certificate"></span>';case"expired":return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="Expired certificate"></span>';case"mismatch":return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="Certificate does not match this domain"></span>';default:return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="No SSL certificate"></span>'}}async function ft(e,t){try{let s=await k.get(`/ssl-status?domain=${encodeURIComponent(e)}`),a=document.getElementById(`ssl-icon-${t}`);a&&(a.outerHTML=ba(s.status))}catch{}}function yt(e){e.forEach(t=>ft(t.Domain,t.ID))}function wt(e,t,s,a=0,i=null){let n=e.SiteType!==3&&e.PMAPort>0;return`
        <div class="uk-grid-medium" uk-grid>
            <div class="uk-width-1-2@m">
                <div class="kp-card uk-padding-small">
                    <h3 class="kp-view-title uk-margin-bottom">Site Info</h3>
                    <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
                        <tbody>
                            <tr><td class="kp-muted">Name</td><td>${e.Name}</td></tr>
                            ${i?`<tr><td class="kp-muted">Parent</td><td><a href="javascript:void(0)" data-action="manage" data-id="${a}" style="color:var(--kp-cyan)">${i}</a></td></tr>`:""}
                            <tr><td class="kp-muted">Internal Port</td><td>:${e.Port}</td></tr>
                            <tr><td class="kp-muted">Type</td><td>${J(e.SiteType)}</td></tr>
                            <tr><td class="kp-muted">Version</td><td>${D(e)}</td></tr>
                            <tr><td class="kp-muted">Status</td><td>${M(e.SiteStatus)}</td></tr>
                            <tr><td class="kp-muted">Containers</td><td><div id="sd-health-badges" class="kp-health-badges"></div></td></tr>
                            <tr><td class="kp-muted">Created</td><td>${new Date(e.Created).toLocaleString()}</td></tr>
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
                        ${t.length?t.map(xt).join(""):'<p class="kp-muted uk-text-small">No domains configured</p>'}
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
                            <tr><td class="kp-muted">User</td><td class="kp-mono">${s?.Username??e.Name}</td></tr>
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
        </div>`}function xt(e){return`<div class="uk-flex uk-flex-between uk-flex-middle kp-config-row" data-domain-id="${e.ID}">
        <div class="uk-flex uk-flex-middle kp-domain-row-inner">
            <span id="ssl-icon-${e.ID}" class="kp-ssl-pending" uk-icon="icon: more; ratio: 0.85"></span>
            <span class="uk-text-small kp-mono">${e.Domain}</span>
        </div>
        <button class="kp-config-del" data-action="delete-domain" data-did="${e.ID}" title="Remove">
            <span uk-icon="icon: close; ratio: 0.8"></span>
        </button>
    </div>`}function St(e,t){e.querySelector("#domain-add-btn")?.addEventListener("click",()=>{e.querySelector("#domain-add-form").classList.remove("uk-hidden")}),e.querySelector("#domain-cancel-btn")?.addEventListener("click",()=>{e.querySelector("#domain-add-form").classList.add("uk-hidden")}),e.querySelector("#domain-save-btn")?.addEventListener("click",async()=>{let s=e.querySelector("#domain-add-input").value.trim();if(s)try{let a=await k.post(`/sites/${t}/domains`,{domain:s});e.querySelector("#domain-list").insertAdjacentHTML("beforeend",xt(a)),ft(a.Domain,a.ID),e.querySelector("#domain-add-form").classList.add("uk-hidden"),e.querySelector("#domain-add-input").value="",c.success("Domain added")}catch(a){c.error(a.message)}}),e.querySelector("#domain-list")?.addEventListener("click",async s=>{let a=s.target.closest('[data-action="delete-domain"]');if(!(!a||!await E("Remove Domain","Remove this domain from the site?")))try{await k.delete(`/sites/${t}/domains/${a.dataset.did}`),a.closest("[data-domain-id]").remove(),c.success("Domain removed")}catch(n){c.error(n.message)}})}function $t(e,t,s=null){e.querySelector("#sftp-regen-btn")?.addEventListener("click",async()=>{let n=e.querySelector("#sftp-regen-btn"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{let l=await k.post(`/sites/${t}/sftp-regen`),r=e.querySelector("#sftp-pass-display");if(r&&l?.password){r.textContent=l.password,r.dataset.revealed="1";let d=e.querySelector("#sftp-reveal-btn");d&&(d.innerHTML='<span uk-icon="icon: eye-slash; ratio: 0.75"></span>')}c.success("SFTP password regenerated"),y.go("site-detail",{id:String(t)})}catch(l){c.error(l.message),n.disabled=!1,n.innerHTML=o}});let a=async()=>(await k.get(`/sites/${t}/sftp-password`))?.password??"",i=n=>{if(navigator.clipboard)navigator.clipboard.writeText(n).then(()=>c.success("Password copied to clipboard")).catch(()=>c.error("Failed to copy password"));else{let o=document.createElement("textarea");o.value=n,o.style.cssText="position:fixed;opacity:0",document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o),c.success("Password copied to clipboard")}};e.querySelector("#sftp-reveal-btn")?.addEventListener("click",async()=>{let n=e.querySelector("#sftp-pass-display"),o=e.querySelector("#sftp-reveal-btn");if(!n)return;if(n.dataset.revealed==="1"){n.textContent="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",n.dataset.revealed="0",o.innerHTML='<span uk-icon="icon: eye; ratio: 0.75"></span>';return}let l=o.innerHTML;o.disabled=!0,o.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{n.textContent=await a(),n.dataset.revealed="1",o.innerHTML='<span uk-icon="icon: eye-slash; ratio: 0.75"></span>'}catch(r){c.error(r.message),o.innerHTML=l}finally{o.disabled=!1}}),e.querySelector("#sftp-copy-btn")?.addEventListener("click",async()=>{let n=e.querySelector("#sftp-copy-btn"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{let l=await a();l&&i(l)}catch(l){c.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),e.querySelector("#pma-open-btn")?.addEventListener("click",async()=>{let n=e.querySelector("#pma-open-btn"),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div> Opening...';try{let l=await k.post(`/sites/${t}/pma-token`);window.open(l.url,"_blank")}catch(l){c.error(l.message)}finally{n.disabled=!1,n.innerHTML=o}}),e.querySelector("#sync-pull-btn")?.addEventListener("click",async()=>{if(await ge("pull",s.Name,e.querySelector('[data-action="manage"][data-id="'+s.ParentID+'"]')?.textContent?.trim()??"parent"))try{c.success("Pull from parent complete")}catch(o){c.error(o.message)}}),e.querySelector("#sync-push-btn")?.addEventListener("click",async()=>{if(await ge("push",s.Name,e.querySelector('[data-action="manage"][data-id="'+s.ParentID+'"]')?.textContent?.trim()??"parent"))try{c.success("Push to parent complete")}catch(o){c.error(o.message)}})}function Et(){return`
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
        </div>`}function Lt(e="",t="",s=301){return`
        <div class="redirect-row uk-flex uk-flex-middle uk-margin-small-bottom" style="gap:8px">
            <input class="uk-input kp-input redirect-source" type="text" placeholder="/old-path" value="${e}" style="flex:1">
            <input class="uk-input kp-input redirect-target" type="text" placeholder="https://example.com/new-path" value="${t}" style="flex:2">
            <select class="uk-select kp-select redirect-code" style="width:90px">
                <option value="301" ${s===301?"selected":""}>301</option>
                <option value="302" ${s===302?"selected":""}>302</option>
                <option value="307" ${s===307?"selected":""}>307</option>
                <option value="308" ${s===308?"selected":""}>308</option>
            </select>
            <a href="javascript:void(0);" class="kp-muted redirect-remove-btn" uk-icon="trash"></a>
        </div>`}async function Tt(e){let t=document.getElementById("redirects-list");if(!t)return;t.innerHTML="";let s=await k.get(`/sites/${e}/redirects`);t.innerHTML=s.map(a=>Lt(a.Source,a.Target,a.Code)).join("")}function Pt(e,t){let s=new AbortController,a={signal:s.signal};e.addEventListener("click",i=>{i.target.closest("#redirect-add-btn")&&document.getElementById("redirects-list").insertAdjacentHTML("beforeend",Lt()),i.target.closest(".redirect-remove-btn")&&i.target.closest(".redirect-row").remove()},a),e.addEventListener("click",async i=>{if(!i.target.closest("#redirect-save-btn"))return;let n=[...document.querySelectorAll(".redirect-row")].map(o=>({Source:o.querySelector(".redirect-source").value.trim(),Target:o.querySelector(".redirect-target").value.trim(),Code:parseInt(o.querySelector(".redirect-code").value,10)}));try{await k.put(`/sites/${t}/redirects`,n),c.success("Redirects saved")}catch(o){c.error(o.message||"Failed to save redirects")}},a),e.__redirectsAbort?.abort(),e.__redirectsAbort=s}var V=[{id:"ab-threshold",key:"threshold",api:"Threshold",mult:1,label:"Error Responses",help:"4xx/5xx responses within the window that trigger the 429."},{id:"ab-window",key:"window_secs",api:"WindowSecs",mult:1,label:"Window (seconds)",help:"Span the error responses are counted over."},{id:"ab-cooldown",key:"cooldown_secs",api:"CooldownSecs",mult:60,label:"429 Cooldown (minutes)",help:"Hitting the limit again during the cooldown converts it to a ban."},{id:"ab-ban",key:"ban_secs",api:"BanSecs",mult:60,label:"Ban Length (minutes)",help:"How long a ban lasts."},{id:"ab-strikes",key:"perm_strikes",api:"PermStrikes",mult:1,label:"Bans Before Permanent",help:"Bans within the strike window that make the ban permanent."},{id:"ab-strike-win",key:"perm_window_secs",api:"PermWindowSecs",mult:3600,label:"Strike Window (hours)",help:"Span the bans are counted over."}],qe={id:"ab-escalate",key:"escalate_sites",api:"EscalateSites",mult:1,label:"Sites Before Global Ban",help:"An IP banned on this many sites is banned on all of them."},z=e=>e?`/sites/${e}/security/autoban`:"/security/autoban";function me(e=null){let t=e?V:[...V,qe];return`
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
                                ${t.map(s=>`
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
        </div>`}function ha(e){if(!e.length)return'<p class="kp-muted uk-text-small uk-margin-remove">No IPs are currently banned.</p>';let t=_();return`
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
            <tbody>${e.map(a=>{let i=!a.Expires;return`
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
                    ${t?`
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
        </div>`}async function Ce(e,t){let s=e.querySelector("#ab-list");try{let a=await k.get(z(t));s.innerHTML=ha(a??[])}catch(a){s.innerHTML=`<p class="kp-muted uk-text-small uk-margin-remove">Failed to load bans: ${f(a.message)}</p>`}}async function va(e,t){try{let s=await k.get(`${z(t)}/settings`),a=t?s.global:s,i=t?s.override:s;(t?V:[...V,qe]).forEach(l=>{let r=e.querySelector(`#${l.id}`);r&&(r.placeholder=String(a[l.api]/l.mult),r.value=i[l.api]==null?"":String(i[l.api]/l.mult))});let o=e.querySelector("#ab-enabled");o&&(o.checked=!!s.override?.Enabled)}catch(s){c.error("Failed to load auto-ban settings: "+s.message)}}async function ga(e,t){let s=t?V:[...V,qe],a={};for(let i of s){let n=e.querySelector(`#${i.id}`).value.trim();if(n===""){if(!t)throw new Error(`${i.label} is required`);a[i.key]=null;continue}let o=Number(n);if(!Number.isInteger(o)||o<1)throw new Error(`${i.label} must be a whole number above 0`);a[i.key]=o*i.mult}t&&(a.enabled=e.querySelector("#ab-enabled").checked),await k.put(`${z(t)}/settings`,a)}function ke(e,t=null){let s=e.querySelector("#autoban-panel");s&&(s.querySelector("#ab-save")?.addEventListener("click",async a=>{let i=a.currentTarget,n=i.innerHTML;i.disabled=!0,i.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await ga(s,t),c.success("Auto-ban settings saved")}catch(o){c.error(o.message)}finally{i.disabled=!1,i.innerHTML=n}}),s.querySelector("#ab-refresh")?.addEventListener("click",()=>Ce(s,t)),s.querySelector("#ab-list")?.addEventListener("click",async a=>{let i=a.target.closest("[data-ab-action]");if(!i)return;let n=i.dataset.id,o=i.dataset.abAction,l=i.closest("tr")?.querySelector("td")?.textContent??"this IP";try{if(o==="permanent"){if(!await E("Ban Permanently",`Ban ${l} permanently? It stays banned until removed.`))return;await k.post(`${z(t)}/${n}/permanent`),c.success(`${l} banned permanently`)}else if(o==="allow"){if(!await E("Allow IP",`Add ${l} to Security Bypass? It will skip every security check, including the WAF, on all sites.`))return;await k.post(`${z(t)}/${n}/allow`),c.success(`${l} added to Security Bypass`)}else if(o==="remove"){if(!await E("Remove Ban",`Remove the ban on ${l}? Its strike history is cleared too.`))return;await k.delete(`${z(t)}/${n}`),c.success(`Ban on ${l} removed`)}await Ce(s,t)}catch(r){c.error(r.message)}}),va(s,t),Ce(s,t))}function fa(e){return`
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
            <li>${me(e)}</li>

        </ul>`}function Be(e,t,s=null){let a=e.querySelector("#kp-waf-pills"),i=e.querySelector("#kp-waf-switcher");if(!a||!i)return;let n=[...a.querySelectorAll(":scope > li")],o=(l,r)=>{if(UIkit.switcher(i).show(l),n.forEach((b,p)=>b.classList.toggle("kp-pill-active",p===l)),!r)return;let d=n[l].dataset.tab;history.replaceState(null,"",s?`#site-detail/${s}/${d}`:l===0?"#waf":`#waf/${d}`)};n.forEach((l,r)=>{l.querySelector(":scope > a").addEventListener("click",d=>{d.preventDefault(),o(r,!0)})}),o(Math.max(0,n.findIndex(l=>l.dataset.tab===t)),!1)}async function Ae(e,t){let s=document.getElementById("waf-tab-panel");if(!s)return;s.innerHTML=fa(e),Be(s,t,e),ke(s,e);let a=document.getElementById("waf-export-btn");a&&(a.href=`/api/sites/${e}/waf/export`);try{let i=await k.get(`/sites/${e}/waf`),n=document.getElementById("waf-override"),o=document.getElementById("waf-site-exclusions");n&&(n.value=String(i.Override??0)),o&&(o.value=i.Exclusions??"");let l=document.getElementById("waf-plugins-list");if(l){let[r,d]=await Promise.all([k.get("/settings/waf/plugins"),k.get(`/sites/${e}/waf/plugins`)]),b=new Set(d??[]);!r||r.length===0?l.innerHTML='<span class="kp-muted uk-text-small">No plugins found in local CRS install.</span>':window.matchMedia("(max-width: 959px)").matches?l.innerHTML=`
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
                    </div>`,l.querySelectorAll(".waf-plugin-pill").forEach(p=>{p.addEventListener("click",()=>p.classList.toggle("active"))}))}}catch(i){c.error("Failed to load WAF settings: "+i.message)}}function _t(e,t,s){e.addEventListener("submit",async a=>{if(a.target.id!=="waf-override-form")return;a.preventDefault();let i=a.target.querySelector('[type="submit"]'),n=i.innerHTML;i.disabled=!0,i.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let o=new FormData(a.target),l={override:parseInt(o.get("override"),10),exclusions:o.get("exclusions").trim()};try{await k.put(`/sites/${t}/waf`,l);let r=document.querySelector(".waf-plugin-select"),d=r?[...r.selectedOptions].map(b=>b.value):[...document.querySelectorAll(".waf-plugin-pill.active")].map(b=>b.dataset.plugin);await k.put(`/sites/${t}/waf/plugins`,d),c.success("WAF override saved \u2014 engine recompiling in background")}catch(r){c.error(r.message)}finally{i.disabled=!1,i.innerHTML=n}},{signal:s}),e.addEventListener("change",async a=>{if(a.target.id!=="waf-import")return;let i=a.target.files[0];if(!i)return;let n=new FormData;n.append("file",i);try{let o=await fetch(`/api/sites/${t}/waf/import`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:n}),l=o.status===204?null:await o.json().catch(()=>null);if(!o.ok)throw new Error(l?.error||`HTTP ${o.status}`);await Ae(t),c.success("WAF settings imported")}catch(o){c.error(o.message)}finally{a.target.value=""}},{signal:s})}var ya=[{label:"Cache Flush",cmd:"cache flush"},{label:"Plugin List",cmd:"plugin list"},{label:"Theme List",cmd:"theme list"},{label:"User List",cmd:"user list"},{label:"Core Check",cmd:"core check-update"},{label:"Core Update",cmd:"core update"},{label:"Plugin Updates",cmd:"plugin update --all"},{label:"Theme Updates",cmd:"theme update --all"},{label:"Rewrite Flush",cmd:"rewrite flush"},{label:"Transient Delete",cmd:"transient delete --all"},{label:"Search Replace",cmd:"search-replace '' ''"}];function It(e){return`
        <div class="kp-wpcli">
            <div class="kp-log-controls" style="flex-wrap:wrap;gap:6px">
                ${ya.map(t=>`
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
        </div>`}function Ct(e,t){let s=e.querySelector("#wpcli-output"),a=e.querySelector("#wpcli-input"),i=e.querySelector("#wpcli-run"),n=e.querySelector("#wpcli-clear"),o=e.querySelector("#wpcli-status"),l=[],r=-1;function d(u,m=""){u.split(`
`).forEach(h=>{if(!h)return;let v=document.createElement("div");m?v.className=m:v.className=h.match(/error|fatal|critical/i)?"kp-log-line-err":h.match(/warning|warn/i)?"kp-log-line-warn":h.match(/success|done\]/i)?"kp-log-line-info":"",v.textContent=h,s.appendChild(v)}),s.scrollTop=s.scrollHeight}function b(u){if(u=u.trim(),!u)return;l.unshift(u),r=-1,d(`wp> ${u}`,"kp-log-line-info"),a.disabled=!0,i.disabled=!0,o&&(o.textContent="Running...");let m=location.protocol==="https:"?"wss":"ws",h=new WebSocket(`${m}://${location.host}/api/sites/${t}/wpcli`);h.onopen=()=>{h.send(JSON.stringify({command:u}))},h.onmessage=v=>{let g=v.data;if(g.trim()==="[done]"){h.close();return}if(g.startsWith("[info]")){d(g,"kp-muted");return}if(g.startsWith("[error]")){d(g,"kp-log-line-err");return}d(g)},h.onerror=()=>{d("[error] WebSocket connection failed","kp-log-line-err")},h.onclose=()=>{a.disabled=!1,i.disabled=!1,o&&(o.textContent="Ready"),a.focus()}}i.addEventListener("click",()=>{b(a.value),a.value=""}),a.addEventListener("keydown",u=>{if(u.key==="Enter"){b(a.value),a.value="",r=-1;return}if(u.key==="ArrowUp"){u.preventDefault(),r<l.length-1&&(r++,a.value=l[r]);return}u.key==="ArrowDown"&&(u.preventDefault(),r>0?(r--,a.value=l[r]):(r=-1,a.value=""))}),e.querySelectorAll('[data-action="wpcli-quick"]').forEach(u=>{u.addEventListener("click",()=>{let m=u.dataset.cmd;if(m.startsWith("search-replace")){a.value=m,a.focus();let h=m.indexOf("''")+1;a.setSelectionRange(h,h);return}b(m)})}),n.addEventListener("click",()=>{s.innerHTML=""});let p=y.go.bind(y);y.go=function(u,m={}){return p(u,m)},a.focus()}var K=null,A=null;function qt(e,t,s){let a=e.querySelector("#kp-site-pills"),i=e.querySelector("#kp-site-switcher"),n=e.querySelector("#kp-manage-pill"),o=e.querySelector("#kp-manage-dropdown");if(!a||!i)return;let l=["#kp-sec-pills","#kp-waf-pills"].map(u=>e.querySelector(u)).filter(Boolean),r=u=>[...i.children].findIndex(m=>m.contains(u));function d(u,m=!1){UIkit.switcher(i).show(u),a.querySelectorAll(":scope > li[data-pill]").forEach(g=>g.classList.remove("kp-pill-active")),m?(n?.classList.add("kp-pill-active"),o?.querySelectorAll("a[data-switcher]").forEach(g=>{g.classList.toggle("kp-dd-active",parseInt(g.dataset.switcher,10)===u)})):(n?.classList.remove("kp-pill-active"),o?.querySelectorAll("a[data-switcher]").forEach(g=>g.classList.remove("kp-dd-active")));let v=l.find(g=>r(g)===u)?.querySelector(":scope > li.kp-pill-active")?.dataset.tab;history.replaceState(null,"",v?`#site-detail/${t}/${v}`:`#site-detail/${t}`)}a.querySelectorAll(":scope > li[data-pill] > a").forEach(u=>{u.addEventListener("click",m=>{m.preventDefault();let h=parseInt(u.closest("li").dataset.pill,10);d(h,!1)})}),n?.querySelector(".kp-pill-dropdown-btn")?.addEventListener("click",u=>{u.stopPropagation(),o.hidden=!o.hidden,n.classList.toggle("kp-pill-active",!o.hidden)}),o?.querySelectorAll("a[data-switcher]").forEach(u=>{u.addEventListener("click",m=>{m.preventDefault(),o.hidden=!0,d(parseInt(u.dataset.switcher,10),!0)})}),document.addEventListener("click",u=>{o&&!n.contains(u.target)&&(o.hidden=!0)},{capture:!0});let p=s?l.find(u=>[...u.children].some(m=>m.dataset.tab===s)):null;p?d(r(p),!0):UIkit.switcher(i).show(1)}function wa(){return`
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
        </div>`}function Me(e="",t="",s=!1){return`
        <div class="rp-route-row uk-flex uk-flex-middle uk-margin-small-bottom" style="gap:8px">
            <span>Host:</span><input class="uk-input kp-input" style="flex:1" placeholder="example.com" value="${e}" data-field="domain">
            <span>Upstream:</span><input class="uk-input kp-input" style="flex:2" placeholder="https://10.0.0.1:8080" value="${t}" data-field="upstream">
            <label style="white-space:nowrap;font-size:0.75rem;color:var(--kp-text-dim)" title="Send incoming domain as Host header instead of upstream hostname">
                <input type="checkbox" class="uk-checkbox" data-field="pass_host" ${s?"checked":""}> Pass Host
            </label>
            <button class="uk-button kp-btn-ghost kp-btn-sm rp-remove-row" uk-tooltip="Remove"><span uk-icon="trash"></span></button>
        </div>`}async function xa(e){let t=document.getElementById("rp-routes-list");if(t)try{let s=await k.get(`/sites/${e}/rp-routes`);t.innerHTML=s.length?s.map(a=>Me(a.Domain,a.Upstream,a.PassHost)).join(""):Me()}catch(s){c.error("Failed to load routes: "+s.message)}}function Sa(e,t){e.addEventListener("click",async s=>{if(s.target.closest("#rp-add-row")){document.getElementById("rp-routes-list").insertAdjacentHTML("beforeend",Me());return}if(s.target.closest(".rp-remove-row")){s.target.closest(".rp-route-row").remove();return}if(!s.target.closest("#rp-save-btn"))return;let a=s.target.closest("#rp-save-btn"),i=a.innerHTML;a.disabled=!0,a.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let n=[...document.querySelectorAll(".rp-route-row")].map(o=>({Domain:o.querySelector('[data-field="domain"]').value.trim(),Upstream:o.querySelector('[data-field="upstream"]').value.trim(),PassHost:o.querySelector('[data-field="pass_host"]').checked})).filter(o=>o.Domain&&o.Upstream);try{await k.put(`/sites/${t}/rp-routes`,n),c.success("Routes saved")}catch(o){c.error(o.message)}finally{a.disabled=!1,a.innerHTML=i}},{signal:K.signal})}function $a(e){return e.endsWith("-nginx")?"world":e.endsWith("-php")?"code":e.endsWith("-db")?"database":e.endsWith("-redis")?"server":e.endsWith("-varnish")?"grid":e.endsWith("-pma")?"table":e.endsWith("-app")?"laptop":"bolt"}function Bt(e){let t=e.split("-").pop();return{nginx:"Nginx",php:"PHP-FPM",db:"MariaDB",redis:"Redis",varnish:"Varnish",pma:"phpMyAdmin",app:"App"}[t]??t}function At(e){switch(e){case"running":return"var(--kp-success)";case"exited":case"stopped":case"dead":return"var(--kp-danger)";case"created":case"configured":case"initialized":case"paused":case"stopping":case"restarting":return"var(--kp-warning)";default:return"var(--kp-text-dim)"}}function Ea(e){return!e||!e.length?"":e.filter(t=>!t.name.endsWith("-infra")).map(t=>`
            <span class="kp-health-badge"
                data-container="${f(t.name)}"
                title="Restart the Container"
                style="cursor:pointer;color:${At(t.status)}">
                <span uk-icon="icon: ${$a(t.name)}; ratio: 1.1"></span>
                <span class="kp-health-badge-label">${f(Bt(t.name))}</span>
            </span>
        `).join("")}function La(e,t){A&&(A.close(),A=null);let s=document.getElementById("sd-health-badges");if(!s)return;let a=location.protocol==="https:"?"wss":"ws";A=new WebSocket(`${a}://${location.host}/api/sites/${t}/health/stream`);let i=[],n=()=>{s.innerHTML=Ea(i),s.querySelectorAll(".kp-health-badge").forEach(o=>{o.addEventListener("click",async()=>{o.style.color=At("restarting");let l=o.dataset.container,r=l.split("-").pop();try{await k.post(`/sites/${t}/containers/${r}/restart`),c.success(`${Bt(l)} restarted`)}catch(d){c.error(d.message)}n()})})};A.onmessage=o=>{try{i=JSON.parse(o.data),n()}catch{}},A.onerror=()=>{},A.onclose=()=>{A=null}}async function Mt(e,{id:t,tab:s}){let[{site:a,domains:i,sftp:n},o,l]=await Promise.all([k.get(`/sites/${t}`),k.get("/sites"),k.get(`/sites/${t}/configs`)]),r=Array.isArray(o)?o:[],d=a.SiteType===1||a.SiteType===2,b=a.SiteType===6,p=[1,2,4,5,7].includes(a.SiteType),u=[1,2,4,5,7].includes(a.SiteType);if(K&&K.abort(),K=new AbortController,e.innerHTML=`
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
                ${a.SiteStatus===1?`<button class="uk-button kp-btn-ghost kp-btn-sm" data-action="stop" data-id="${t}" uk-tooltip="Stop the Site"><span uk-icon="ban"></span></button>`:`<button class="uk-button kp-btn-ghost kp-btn-sm" data-action="start" data-id="${t}" uk-tooltip="Start the Site"><span uk-icon="play"></span></button>`}
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="restart" data-id="${t}" uk-tooltip="Restart the Site"><span uk-icon="refresh"></span></button>
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="flush" data-id="${t}" uk-tooltip="Flush the Caches"><span uk-icon="bolt"></span></button>
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
            <li>${wa()}</li>
            <li>${ye(t,a.SiteType)}</li>
            <li>${Ie(t,a.SiteType)}</li>
            <li>${G(t)}</li>
            <li id="waf-tab-panel"></li>
            <li>${Le()}</li>
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
                    ${d?'<a href="#" data-switcher="3"><span uk-icon="icon: code; ratio: 0.85"></span> PHP</a>':""}
                    <a href="#" data-switcher="${d?4:3}"><span uk-icon="icon: database; ratio: 0.85"></span> MariaDB</a>
                    <a href="#" data-switcher="${d?5:4}"><span uk-icon="icon: server; ratio: 0.85"></span> Redis</a>
                    <a href="#" data-switcher="${d?6:5}"><span uk-icon="icon: world; ratio: 0.85"></span> Varnish</a>
                    <hr>
                    <div class="kp-pill-dropdown-section">Security</div>
                    <a href="#" data-switcher="${d?8:7}"><span uk-icon="icon: lock; ratio: 0.85"></span> Security</a>
                    <a href="#" data-switcher="${d?9:8}"><span uk-icon="icon: lifesaver; ratio: 0.85"></span> WAF</a>
                    <a href="#" data-switcher="${d?10:9}"><span uk-icon="icon: user; ratio: 0.85"></span> Basic Auth</a>
                    <hr>
                    <div class="kp-pill-dropdown-section">Tools</div>
                    ${a.SiteType===1?`<a href="#" data-switcher="${d?11:10}"><span uk-icon="icon: file-text; ratio: 0.85"></span> WP-CLI</a>`:""}
                    <a href="#" data-switcher="${a.SiteType===1?d?12:11:d?11:10}"><span uk-icon="icon: history; ratio: 0.85"></span> Backups</a>
                    ${u?'<a href="#" data-switcher="database"><span uk-icon="icon: table; ratio: 0.85"></span> Database</a>':""}
                    ${p?`<a href="#" data-switcher="${a.SiteType===1?d?13:12:d?12:11}"><span uk-icon="icon: clock; ratio: 0.85"></span> Crons</a>`:""}
                    <a href="#" data-switcher="${(a.SiteType===1?d?14:13:d?13:12)-(p?0:1)}"><span uk-icon="icon: forward; ratio: 0.85"></span> Redirects</a>
                    <a href="#" data-switcher="files"><span uk-icon="icon: folder; ratio: 0.85"></span> Files</a>
                </div>
            </li>
            <li data-pill="1"><a href="#">Stats</a></li>
            <li data-pill="${d?7:6}"><a href="#">Logs</a></li>
        </ul>

        <!-- switcher panels (driven by pills above) -->
        <ul class="uk-switcher" id="kp-site-switcher">
            <li>${wt(a,i??[],n,a.ParentID??0,r.find(v=>v.ID===a.ParentID)?.Name??null)}</li>
            <li>${ye(t,a.SiteType)}</li>
            <li>${Z(t,1,l[1])}</li>
            ${d?`<li>${Z(t,2,l[2])}</li>`:""}
            <li>${Z(t,3,l[3])}</li>
            <li>${Z(t,4,l[4])}</li>
            <li>${tt(t,l[5])}</li>
            <li>${Ie(t,a.SiteType)}</li>
            <li>${G(t)}</li>
            <li id="waf-tab-panel"></li>
            <li>${Le()}</li>
            ${a.SiteType===1?`<li>${It(t)}</li>`:""}
            <li>${Ze(t)}</li>
            ${p?`<li>${nt(t)}</li>`:""}
            <li>${Et()}</li>
            ${u?`<li>${dt(t,a.SiteType)}</li>`:""}
            <li>${ht(t)}</li>
        </ul>`}`,document.getElementById("sd-back").addEventListener("click",()=>y.go("sites")),document.getElementById("sd-edit").addEventListener("click",()=>Qe(a)),document.getElementById("sd-rename").addEventListener("click",async()=>{let v=await He(a.Name);if(!(!v||v===a.Name)){S("Renaming Site","Moving the database, files, and pod \u2014 this may take a few minutes...");try{await k.post(`/sites/${t}/rename`,{name:v},18e5),w(),c.success(`Site renamed to '${v}'`),y.go("site-detail",{id:t})}catch(g){w(),c.error(g.message)}}}),document.getElementById("sd-site-nav")?.addEventListener("change",v=>{y.go("site-detail",{id:v.target.value})}),de(e),ce(e,s),R(e),gt(e,t),_t(e,t,K.signal),Ae(t,s),b){Sa(e,t),xa(t),xe(e,t,a.SiteType),Se(t,a.SiteType),Te(e,t),X(t),qt(e,t,s);return}document.getElementById("sd-recreate").addEventListener("click",async()=>{S("Recreating Pod","Recreating containers for this site...");try{await k.post(`/sites/${t}/recreate`,{prune:!0}),w(),c.success("Pod recreated"),y.go("site-detail",{id:t})}catch(v){w(),c.error(v.message)}}),document.getElementById("sd-clone")?.addEventListener("click",async()=>{let v=await Re(a.Name);if(v){S("Cloning Site","Copying files and database \u2014 this may take a few minutes...");try{await k.post(`/sites/${t}/clone`,{name:v},6e5),w(),c.success(`Site cloned as '${v}'`),y.go("sites")}catch(g){w(),c.error(g.message)}}}),at(e,t,K.signal),St(e,t),a.SiteType===1&&Ct(e,t),$t(e,t,a),et(e,t),j(e,t),p&&(ot(e,t),ue(e,t)),Pt(e,t),Tt(t);let m=e.querySelector("#kp-site-switcher"),h=e.querySelector('a[data-switcher="files"]');if(m&&h&&(h.dataset.switcher=String(m.children.length-1)),vt(e,t),I(t),u){let v=e.querySelector('a[data-switcher="database"]'),g=e.querySelector("#dbtools-panel");m&&v&&g&&(v.dataset.switcher=String([...m.children].findIndex(x=>x.contains(g)))),ut(e,t)}La(e,t),xe(e,t,a.SiteType),Se(t,a.SiteType),qt(e,t,s),Te(e,t),X(t),yt(i??[])}async function be(e){let t=document.getElementById("totp-qr-img"),s=document.getElementById("totp-qr-wrap");if(!t||!s)return;if(s.querySelectorAll(".totp-uri-text").forEach(i=>i.remove()),typeof QRCode<"u")try{let i=await new Promise((n,o)=>{QRCode.toDataURL(e,{width:220,margin:2},(l,r)=>{l?o(l):n(r)})});t.src=i,t.style.display="";return}catch{}let a=document.createElement("p");a.className="totp-uri-text kp-muted uk-text-small",a.style.wordBreak="break-all",a.textContent=e,s.appendChild(a)}function he(e){document.getElementById("kp-backup-codes-modal")?.remove();let s=`
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
        </div>`;document.body.insertAdjacentHTML("beforeend",s);let a=UIkit.modal("#kp-backup-codes-modal");a.show(),document.getElementById("kp-backup-copy-btn").addEventListener("click",()=>{let i=e.join(`
`),n=document.getElementById("kp-backup-copy-btn");if(navigator.clipboard)navigator.clipboard.writeText(i).then(()=>{n.textContent="Copied!"});else{let o=document.createElement("textarea");o.value=i,o.style.cssText="position:fixed;opacity:0",document.body.appendChild(o),o.select();try{document.execCommand("copy"),n.textContent="Copied!"}catch{}o.remove()}}),document.getElementById("kp-backup-done-btn").addEventListener("click",()=>{a.hide(),document.getElementById("kp-backup-codes-modal")?.remove(),y.go("users")})}function Dt(e){document.body.insertAdjacentHTML("beforeend",`
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
        </div>`);let s=UIkit.modal("#kp-create-user-modal");s.show(),document.getElementById("create-user-form").addEventListener("submit",async a=>{a.preventDefault();let i=a.target.querySelector('[type="submit"]'),n=i.innerHTML;i.disabled=!0,i.innerHTML='<div uk-spinner="ratio: 0.6"></div> Creating...';let o=new FormData(a.target),l={fname:o.get("fname").trim(),lname:o.get("lname").trim(),uname:o.get("uname").trim(),email:o.get("email").trim(),phone:o.get("phone").trim(),password:o.get("password"),role:parseInt(o.get("role")),notify_email:o.get("notify_email")==="on",notify_sms:o.get("notify_sms")==="on"};try{let r=F(await k.post("/users",l));document.getElementById("users-table-body").insertAdjacentHTML("beforeend",De(r)),c.success(`User '${r.uname}' created`),document.getElementById("create-user-form").style.display="none",document.getElementById("cu-totp-section").style.display="",Ta(r.id,s)}catch(r){c.error(r.message),i.disabled=!1,i.innerHTML=n}}),document.getElementById("kp-create-user-modal").addEventListener("hidden",()=>document.getElementById("kp-create-user-modal")?.remove())}function Ta(e,t){let s=()=>{t.hide(),document.getElementById("kp-create-user-modal")?.remove(),y.go("users")};document.getElementById("cu-totp-skip-btn").addEventListener("click",s),document.getElementById("cu-totp-setup-btn").addEventListener("click",async()=>{let a=document.getElementById("cu-totp-setup-btn");a.disabled=!0,a.textContent="Setting up\u2026";try{let i=await k.post(`/users/${e}/totp/setup`,{});document.getElementById("totp-secret-text").textContent=i.secret,document.getElementById("totp-setup-area").style.display="",document.getElementById("cu-totp-skip-btn").style.display="none",await be(i.uri)}catch(i){c.error(i.message),a.disabled=!1,a.textContent="Enable TOTP"}}),document.getElementById("cu-totp-confirm-btn").addEventListener("click",async()=>{let a=document.getElementById("totp-confirm-code").value.trim();if(a.length!==6){c.error("Enter a 6-digit code");return}let i=document.getElementById("cu-totp-confirm-btn");i.disabled=!0;try{let n=await k.post(`/users/${e}/totp/confirm`,{code:a});t.hide(),document.getElementById("kp-create-user-modal")?.remove(),c.success("TOTP enabled"),n.backup_codes?.length?he(n.backup_codes):y.go("users")}catch(n){c.error(n.message),i.disabled=!1}})}async function Rt(e,t){document.getElementById("kp-edit-user-modal")?.remove();let s;try{s=F(await k.get(`/users/${t}`))}catch(b){c.error(b.message);return}let a=window.KP?.user?.role===99,i=Number(t)===Number(window.KP?.user?.id),n=`
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
        </div>`;document.body.insertAdjacentHTML("beforeend",n);let o=UIkit.modal("#kp-edit-user-modal");o.show(),document.getElementById("edit-user-form").addEventListener("submit",async b=>{b.preventDefault();let p=b.target.querySelector('[type="submit"]'),u=p.innerHTML;p.disabled=!0,p.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let m=new FormData(b.target),h={fname:m.get("fname").trim(),lname:m.get("lname").trim(),email:m.get("email").trim(),phone:m.get("phone").trim(),notify_email:m.get("notify_email")==="on",notify_sms:m.get("notify_sms")==="on"};if(a){h.role=parseInt(m.get("role"));let g=m.get("uname");g&&(h.uname=g.trim())}let v=m.get("password");v&&(h.password=v),v&&i&&(h.current_password=m.get("current_password"));try{await k.put(`/users/${t}`,h),o.hide(),document.getElementById("kp-edit-user-modal")?.remove(),c.success("User updated"),y.go("users")}catch(g){c.error(g.message),p.disabled=!1,p.innerHTML=u}});let l=document.getElementById("totp-setup-btn");l&&l.addEventListener("click",async()=>{l.disabled=!0,l.textContent="Setting up\u2026";try{let b=await k.post(`/users/${t}/totp/setup`,{});document.getElementById("totp-secret-text").textContent=b.secret,document.getElementById("totp-setup-area").style.display="",await be(b.uri)}catch(b){c.error(b.message),l.disabled=!1,l.textContent="Enable TOTP"}});let r=document.getElementById("totp-confirm-btn");r&&r.addEventListener("click",async()=>{let b=document.getElementById("totp-confirm-code").value.trim();if(b.length!==6){c.error("Enter a 6-digit code");return}r.disabled=!0;try{let p=await k.post(`/users/${t}/totp/confirm`,{code:b});o.hide(),document.getElementById("kp-edit-user-modal")?.remove(),c.success("TOTP enabled"),p.backup_codes?.length?he(p.backup_codes):y.go("users")}catch(p){c.error(p.message),r.disabled=!1}});let d=document.getElementById("totp-disable-btn");d&&d.addEventListener("click",async()=>{d.disabled=!0;try{await k.delete(`/users/${t}/totp`),c.success("TOTP disabled"),o.hide(),document.getElementById("kp-edit-user-modal")?.remove(),y.go("users")}catch(b){c.error(b.message),d.disabled=!1}}),document.getElementById("kp-edit-user-modal").addEventListener("hidden",()=>document.getElementById("kp-edit-user-modal")?.remove())}async function Ht(e){if(!_()){e.innerHTML=T("Access denied");return}let t=await k.get("/users");e.innerHTML=`
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
                    ${t.map(s=>De(F(s))).join("")}
                </tbody>
            </table>
            </div>
        </div>`,document.getElementById("users-new-btn").addEventListener("click",()=>Dt(e)),Pa(e)}function De(e){let t=e.role===99?'<span class="kp-badge kp-badge-admin">Admin</span>':'<span class="kp-badge kp-badge-manager">Manager</span>',s=[e.notify_email?'<span uk-icon="icon: mail; ratio: 0.85" uk-tooltip="Email notifications on" style="color:var(--kp-success)"></span>':'<span uk-icon="icon: mail; ratio: 0.85" style="color:var(--kp-text-dim)" uk-tooltip="Email notifications off"></span>',e.notify_sms?'<span uk-icon="icon: receiver; ratio: 0.85" uk-tooltip="SMS notifications on" style="color:var(--kp-success)"></span>':'<span uk-icon="icon: receiver; ratio: 0.85" style="color:var(--kp-text-dim)" uk-tooltip="SMS notifications off"></span>'].join(" ");return`<tr data-user-id="${e.id}">
        <td><strong>${f(e.fname)} ${f(e.lname)}</strong></td>
        <td><span style="font-family:monospace">${f(e.uname)}</span></td>
        <td>${f(e.email)}</td>
        <td>${t}</td>
        <td class="uk-text-center">${e.totp_enabled?'<span uk-icon="icon: check; ratio: 0.9" style="color:var(--kp-success)"></span>':'<span uk-icon="icon: close; ratio: 0.9" style="color:var(--kp-text-dim)"></span>'}</td>
        <td class="uk-text-center">${s}</td>
        <td><span class="kp-muted">${f(e.created)}</span></td>
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
    </tr>`}function Pa(e){e.addEventListener("click",async t=>{let s=t.target.closest('[data-action="delete-user"]');if(!(!s||!await E("Delete User","Delete this user? This cannot be undone.")))try{await k.delete(`/users/${s.dataset.uid}`),s.closest("tr").remove(),c.success("User deleted")}catch(i){c.error(i.message)}}),e.addEventListener("click",async t=>{let s=t.target.closest('[data-action="edit-user"]');s&&Rt(e,s.dataset.uid)})}async function Ft(e,t={}){if(!_()){e.innerHTML=T("Access denied");return}e.innerHTML=`
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
            <li>${me()}</li>

        </ul>`,_a(e),Be(e,t.tab),Ut(e),ke(e)}async function Ut(e){try{let t=await k.get("/settings/waf");if(!e.querySelector("#sec-waf-enabled"))return;e.querySelector("#sec-waf-enabled").checked=!!t.Enabled,e.querySelector("#sec-waf-audit").checked=!!t.AuditLog,e.querySelector("#sec-waf-mode").value=String(t.Mode??0),e.querySelector("#sec-waf-paranoia").value=String(t.ParanoiaLevel??1),e.querySelector("#sec-waf-exclusions").value=t.Exclusions??""}catch(t){c.error("Failed to load WAF settings: "+t.message)}}function _a(e){e.querySelector("#sec-waf-save")?.addEventListener("click",async()=>{let t=e.querySelector("#sec-waf-save"),s=t.innerHTML;t.disabled=!0,t.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await k.put("/settings/waf",{enabled:e.querySelector("#sec-waf-enabled").checked,mode:parseInt(e.querySelector("#sec-waf-mode").value,10),paranoia_level:parseInt(e.querySelector("#sec-waf-paranoia").value,10),audit_log:e.querySelector("#sec-waf-audit").checked,exclusions:e.querySelector("#sec-waf-exclusions").value.trim()}),c.success("WAF settings saved \u2014 engine recompiling in background")}catch(a){c.error(a.message)}finally{t.disabled=!1,t.innerHTML=s}}),e.querySelector("#sec-waf-import")?.addEventListener("change",async t=>{let s=t.target.files[0];if(!s)return;let a=new FormData;a.append("file",s);try{let i=await fetch("/api/settings/waf/import",{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:a}),n=i.status===204?null:await i.json().catch(()=>null);if(!i.ok)throw new Error(n?.error||`HTTP ${i.status}`);await Ut(e),c.success("WAF settings imported")}catch(i){c.error(i.message)}finally{t.target.value=""}})}y.register("dashboard",e=>Ke(e));y.register("sites",e=>ze(e));y.register("site-detail",(e,t)=>Mt(e,t));y.register("users",e=>Ht(e));y.register("settings",(e,t)=>Ee(e,t));y.register("security",(e,t)=>Je(e,t));y.register("waf",(e,t)=>Ft(e,t));y.register("admin-logs",e=>Fe(e));y.register("audit-log",e=>je(e));document.addEventListener("keydown",e=>{let t=e.target;t?.matches?.("input, textarea, select, [contenteditable='true']")&&(t.closest?.(".CodeMirror")||t.id==="wpcli-input"&&(e.key==="ArrowUp"||e.key==="ArrowDown")||["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)&&e.stopPropagation())},!0);document.addEventListener("click",e=>{let t=e.target.closest("[data-view]");t&&(e.preventDefault(),y.go(t.dataset.view))});document.addEventListener("click",async e=>{let t=e.target.closest("[data-action]");if(!t)return;e.stopPropagation();let{action:s,id:a}=t.dataset;switch(s){case"manage":y.go("site-detail",{id:a});break;case"start":await ve(a,"start","Starting Site","Starting all containers - please wait...");break;case"stop":await ve(a,"stop","Stopping Site","Gracefully stopping all containers - please wait...");break;case"restart":await ve(a,"restart","Restarting Site","Restarting all containers - please wait...");break;case"flush":await ve(a,"flush","Flushing Caches","Clearing container caches - please wait...");break;case"delete":await Ia(a);break;case"recreate":S("Recreating Pod","Recreating containers for this site - this may take a few minutes...");try{await k.post(`/sites/${a}/recreate`,{prune:!0}),w(),c.success("Pod recreated"),y.go("sites")}catch(i){w(),c.error(i.message)}break}});document.addEventListener("kp:bulk-action",async e=>{let{action:t,ids:s}=e.detail;if(!s.length)return;let a={start:"Starting",stop:"Stopping",restart:"Restarting",flush:"Flushing Caches",recreate:"Recreating"},i=t==="recreate"?"Please hold while we update your Pods":"Please wait...",n=t==="recreate"?{prune:!0}:void 0,o=t==="recreate"?1200*1e3:void 0;S(`${a[t]} ${s.length} Site${s.length!==1?"s":""}`,i);let l=await Promise.allSettled(s.map(d=>k.post(`/sites/${d}/${t}`,n,o)));w();let r=l.filter(d=>d.status==="rejected").length;r===0?c.success(`${t.charAt(0).toUpperCase()+t.slice(1)} complete for ${s.length} site${s.length!==1?"s":""}`):c.error(`${r} of ${s.length} sites failed \u2014 check logs`),["start","stop","restart","recreate"].includes(t)&&y.go("sites")});async function ve(e,t,s,a){S(s,a);try{if(await k.post(`/sites/${e}/${t}`),w(),c.success(s+" complete"),t!=="flush"){let{view:i,params:n}=ne();y.go(i,n)}}catch(i){w(),c.error(i.message)}}async function Ia(e){if(!await E("Delete Site",`This will stop and permanently remove the pod and all its data. Are you sure?

A final backup will be created before deletion. This may take a moment.`))return;S("Deleting Site","Creating final backup and removing the pod \u2014 please wait...");let s;try{s=await fetch(`/api/sites/${e}`,{method:"DELETE",headers:{"X-CSRF-Token":window.KP?.csrf??""}})}catch{}if(w(),s?.ok&&s.headers.get("Content-Type")?.includes("gzip")){let o=(s.headers.get("Content-Disposition")??"").match(/filename="([^"]+)"/)?.[1]??`${e}_final.tar.gz`,l=await s.blob(),r=document.createElement("a");r.href=URL.createObjectURL(l),r.download=o,r.click(),URL.revokeObjectURL(r.href),c.success("Site deleted. Final backup downloaded."),y.go("sites");return}let a=!1,i=0;for(;!a&&i<10;){try{await new Promise(o=>setTimeout(o,2e3)),a=!(await k.get("/sites")).find(o=>o.ID===parseInt(e))}catch{}i++}a?(c.success("Site deleted. Final backup saved to S3."),y.go("sites")):c.error("Delete failed - site still exists after 20s")}if(window.KP?.user?.role===99){let e=document.getElementById("kp-resource-warning"),t=document.getElementById("kp-resource-warning-msg"),s=async()=>{try{let a=await k.get("/settings/resource-warning");a?.active&&e&&t?(t.textContent=`${a.current_mb}MB used, threshold ${a.threshold_mb}MB \u2014 throttling ${a.offender}.`,e.style.display=""):e&&(e.style.display="none")}catch{}};s(),setInterval(s,3e4)}window.addEventListener("hashchange",()=>{if(y._ownHashChange)return;let{view:e,params:t}=ne();y.go(e,t)});(()=>{let e=document.getElementById("kp-totop");if(!e)return;let t=()=>{e.classList.toggle("is-visible",window.scrollY>150)};window.addEventListener("scroll",t,{passive:!0}),t(),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})})();(()=>{let e=document.querySelectorAll(".kp-logout-link");e.length&&e.forEach(t=>{t.addEventListener("click",async s=>{s.preventDefault(),await fetch("/logout",{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""}}),window.location.href="/login"})})})();var{view:Ca,params:qa}=ne();y.go(Ca,qa);})();
