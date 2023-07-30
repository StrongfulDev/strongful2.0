(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerPolicy&&(s.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?s.credentials="include":l.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(l){if(l.ep)return;l.ep=!0;const s=n(l);fetch(l.href,s)}})();function b(){}function tt(t){return t()}function U(){return Object.create(null)}function E(t){t.forEach(tt)}function et(t){return typeof t=="function"}function J(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let M;function ct(t,e){return M||(M=document.createElement("a")),M.href=e,t===M.href}function at(t){return Object.keys(t).length===0}function d(t,e){t.appendChild(e)}function $(t,e,n){t.insertBefore(e,n||null)}function v(t){t.parentNode&&t.parentNode.removeChild(t)}function m(t){return document.createElement(t)}function nt(t){return document.createTextNode(t)}function y(){return nt(" ")}function ut(){return nt("")}function O(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function p(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function ft(t){return Array.from(t.childNodes)}let K;function j(t){K=t}const C=[],W=[];let S=[];const X=[],dt=Promise.resolve();let F=!1;function pt(){F||(F=!0,dt.then(rt))}function R(t){S.push(t)}const B=new Set;let q=0;function rt(){if(q!==0)return;const t=K;do{try{for(;q<C.length;){const e=C[q];q++,j(e),mt(e.$$)}}catch(e){throw C.length=0,q=0,e}for(j(null),C.length=0,q=0;W.length;)W.pop()();for(let e=0;e<S.length;e+=1){const n=S[e];B.has(n)||(B.add(n),n())}S.length=0}while(C.length);for(;X.length;)X.pop()();F=!1,B.clear(),j(t)}function mt(t){if(t.fragment!==null){t.update(),E(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(R)}}function ht(t){const e=[],n=[];S.forEach(r=>t.indexOf(r)===-1?e.push(r):n.push(r)),n.forEach(r=>r()),S=e}const N=new Set;let x;function lt(){x={r:0,c:[],p:x}}function st(){x.r||E(x.c),x=x.p}function w(t,e){t&&t.i&&(N.delete(t),t.i(e))}function P(t,e,n,r){if(t&&t.o){if(N.has(t))return;N.add(t),x.c.push(()=>{N.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}else r&&r()}function V(t){t&&t.c()}function A(t,e,n,r){const{fragment:l,after_update:s}=t.$$;l&&l.m(e,n),r||R(()=>{const a=t.$$.on_mount.map(tt).filter(et);t.$$.on_destroy?t.$$.on_destroy.push(...a):E(a),t.$$.on_mount=[]}),s.forEach(R)}function H(t,e){const n=t.$$;n.fragment!==null&&(ht(n.after_update),E(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function _t(t,e){t.$$.dirty[0]===-1&&(C.push(t),pt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function D(t,e,n,r,l,s,a,h=[-1]){const c=K;j(t);const o=t.$$={fragment:null,ctx:[],props:s,update:b,not_equal:l,bound:U(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:U(),dirty:h,skip_bound:!1,root:e.target||c.$$.root};a&&a(o.root);let f=!1;if(o.ctx=n?n(t,e.props||{},(u,g,...i)=>{const _=i.length?i[0]:g;return o.ctx&&l(o.ctx[u],o.ctx[u]=_)&&(!o.skip_bound&&o.bound[u]&&o.bound[u](_),f&&_t(t,u)),g}):[],o.update(),f=!0,E(o.before_update),o.fragment=r?r(o.ctx):!1,e.target){if(e.hydrate){const u=ft(e.target);o.fragment&&o.fragment.l(u),u.forEach(v)}else o.fragment&&o.fragment.c();e.intro&&w(t.$$.fragment),A(t,e.target,e.anchor,e.customElement),rt()}j(c)}class G{$destroy(){H(this,1),this.$destroy=b}$on(e,n){if(!et(n))return b;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const l=r.indexOf(n);l!==-1&&r.splice(l,1)}}$set(e){this.$$set&&!at(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function gt(t){let e,n,r,l,s,a,h,c,o,f,u,g,i,_,L,T,I,Q;return{c(){e=m("div"),n=m("img"),l=y(),s=m("div"),a=m("p"),a.textContent="ביטוח חבילה",h=y(),c=m("p"),c.textContent="ביטוח על החבילה שלך",o=y(),f=m("button"),f.innerHTML='<svg class="information svelte-8y3lte" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm1 15h-2v-6h2zm0-8h-2V7h2z"></path></svg>',u=y(),g=m("div"),i=m("div"),_=m("button"),_.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-close svelte-8y3lte" fill="none" viewBox="0 0 18 17"><path d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z" fill="currentColor"></path></svg>',L=y(),T=m("div"),T.innerHTML=`<ol class="modal-list"><li class="modal-list-item">הגנה מורחבת: מעניק הגנה מורחבת מעבר לביטוח חבילה הסטנדרטי. מבטיח שהחבילה שלך תהיה מוגנת לא רק מאובדן או גניבה, אלא גם במידה והמוצר נפגם במהלך ההובלה.</li> 
                <li class="modal-list-item">הגנה מגניבה: השירות מציע הגנה מלאה מפני גניבה, השירות מבטיח שהלקוחות יקבלו החזר או תחליף במידה והחבילה שלהן תגנב לאחר מסירה לחברת השילוח.</li> 
                <li class="modal-list-item">פתרון בעיות באופן מהיר ללא בעיות: במקרה של אובדן, גניבה או פגם במשלוח, אנו נדאג לתהליך פתרון בשם הלקוח/ה. השירות כולל התנהלות מול אותה חברת השילוח ממנה נשלחה החבילה, הגשת תביעות, תיאום מחודש עם חברת השילוח והבטחת חוויה חלקה ונטולת טרחה.</li> 
                <li class="modal-list-item">החלפה/החזרה מזורזת: הבטחת תעדוף וטיפול מהיר במקרה של בעיה/תקלה במהלך הליך ההחלפה/ההחזרה.
                    השירות תקף ללקוחת אשר רכשו את שירות ביטוח החבילה למטרת מיזעור כל אי נוחות.</li> 
                <li class="modal-list-item">שירות לקוחות מורחב: השירות מספק שירות לקוחות מורחב ללקוחות שהוסיפו את שירות הגנת החבילה. המבטיח טיפול ומענה מהיר ומקשיב הנותן מענה לכל בעיה, ויעניק ללקוחות שקט נפשי ותחושת עדיפות.</li></ol>`,ct(n.src,r="https://cdn.shopify.com/s/files/1/0340/7986/7020/files/e0b92ec5ead34e878203fec630dc2c95.jpg?v=1683560264")||p(n,"src",r),p(n,"alt","ביטוח משלוח"),p(n,"height","30"),p(n,"width","30"),p(a,"class","bold svelte-8y3lte"),p(c,"class","description"),p(e,"class","product svelte-8y3lte"),p(_,"class","close-modal svelte-8y3lte"),p(T,"class","svelte-8y3lte"),p(i,"class","modal-content svelte-8y3lte"),p(g,"class","modal hidden modal-overlay svelte-8y3lte")},m(k,z){$(k,e,z),d(e,n),d(e,l),d(e,s),d(s,a),d(s,h),d(s,c),d(s,o),d(s,f),$(k,u,z),$(k,g,z),d(g,i),d(i,_),d(i,L),d(i,T),I||(Q=[O(f,"click",yt),O(_,"click",Y),O(g,"click",Y)],I=!0)},p:b,i:b,o:b,d(k){k&&v(e),k&&v(u),k&&v(g),I=!1,E(Q)}}}function yt(){document.querySelector(".modal").classList.remove("hidden")}function Y(){document.querySelector(".modal").classList.add("hidden")}function vt(t,e,n){let{product:r}=e;return t.$$set=l=>{"product"in l&&n(0,r=l.product)},[r]}class ot extends G{constructor(e){super(),D(this,e,vt,gt,J,{product:0})}}function Z(t){let e,n,r,l;const s=[wt,$t],a=[];function h(c,o){return c[1]?0:1}return e=h(t),n=a[e]=s[e](t),{c(){n.c(),r=ut()},m(c,o){a[e].m(c,o),$(c,r,o),l=!0},p(c,o){let f=e;e=h(c),e===f?a[e].p(c,o):(lt(),P(a[f],1,1,()=>{a[f]=null}),st(),n=a[e],n?n.p(c,o):(n=a[e]=s[e](c),n.c()),w(n,1),n.m(r.parentNode,r))},i(c){l||(w(n),l=!0)},o(c){P(n),l=!1},d(c){a[e].d(c),c&&v(r)}}}function $t(t){let e,n,r,l,s,a,h,c,o,f,u,g;return o=new ot({}),{c(){e=m("div"),n=m("label"),r=m("input"),l=y(),s=m("span"),a=y(),h=m("p"),h.textContent="₪4.99",c=y(),V(o.$$.fragment),p(r,"type","checkbox"),p(r,"class","svelte-q8mk34"),p(s,"class","slider round svelte-q8mk34"),p(n,"class","switch svelte-q8mk34"),p(h,"class","small-text svelte-q8mk34")},m(i,_){$(i,e,_),d(e,n),d(n,r),d(n,l),d(n,s),d(e,a),d(e,h),$(i,c,_),A(o,i,_),f=!0,u||(g=O(r,"change",t[3]),u=!0)},p:b,i(i){f||(w(o.$$.fragment,i),f=!0)},o(i){P(o.$$.fragment,i),f=!1},d(i){i&&v(e),i&&v(c),H(o,i),u=!1,g()}}}function wt(t){let e,n,r,l,s,a,h,c,o,f,u,g;return o=new ot({props:{product:t[0]}}),{c(){e=m("div"),n=m("label"),r=m("input"),l=y(),s=m("span"),a=y(),h=m("p"),h.textContent="₪4.99",c=y(),V(o.$$.fragment),p(r,"type","checkbox"),r.checked=!0,p(r,"class","svelte-q8mk34"),p(s,"class","slider round svelte-q8mk34"),p(n,"class","switch svelte-q8mk34"),p(h,"class","small-text svelte-q8mk34")},m(i,_){$(i,e,_),d(e,n),d(n,r),d(n,l),d(n,s),d(e,a),d(e,h),$(i,c,_),A(o,i,_),f=!0,u||(g=O(r,"change",t[4]),u=!0)},p(i,_){const L={};_&1&&(L.product=i[0]),o.$set(L)},i(i){f||(w(o.$$.fragment,i),f=!0)},o(i){P(o.$$.fragment,i),f=!1},d(i){i&&v(e),i&&v(c),H(o,i),u=!1,g()}}}function bt(t){let e,n,r=t[2]&&Z(t);return{c(){e=m("div"),r&&r.c(),p(e,"class","card")},m(l,s){$(l,e,s),r&&r.m(e,null),n=!0},p(l,[s]){l[2]?r?(r.p(l,s),s&4&&w(r,1)):(r=Z(l),r.c(),w(r,1),r.m(e,null)):r&&(lt(),P(r,1,1,()=>{r=null}),st())},i(l){n||(w(r),n=!0)},o(l){P(r),n=!1},d(l){l&&v(e),r&&r.d()}}}let it=41547480268940;async function kt(){const t=await fetch("/cart.json");if(t.status===200)return t.json();throw new Error(`Failed to get request, Shopify returned ${t.status} ${t.statusText}`)}function xt(t){return t.items.find(e=>e.id===it)}function Pt(t,e,n){let r=null,l=null,s=!1,a=!1;const h=async()=>{const u=await(await fetch("/cart/add",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({items:[{id:it,quantity:1}]})})).json();u&&(r=u,n(1,s=!!l),window.publish("PackageProtection/addToCard",{product:l,cart:r}))},c=async()=>{sessionStorage.setItem("PackageProtection/HasRemoved","true");const u=await(await fetch("/cart/change",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({id:l.key,quantity:0})})).json();(!u.errors||u.errors.length===0)&&(n(1,s=!1),window.publish("PackageProtection/removeFromCart",{product:l}))};return(async()=>{r=await kt(),n(0,l=xt(r)),n(1,s=!!l);const f=sessionStorage.getItem("PackageProtection/HasRemoved");l||f==="true"||await h(),setTimeout(()=>{n(2,a=!0)},1e3)})(),[l,s,a,h,c]}class qt extends G{constructor(e){super(),D(this,e,Pt,bt,J,{})}}function Ct(t){let e,n,r;return n=new qt({}),{c(){e=m("div"),V(n.$$.fragment),p(e,"class","package-protection-root")},m(l,s){$(l,e,s),A(n,e,null),r=!0},p:b,i(l){r||(w(n.$$.fragment,l),r=!0)},o(l){P(n.$$.fragment,l),r=!1},d(l){l&&v(e),H(n)}}}class St extends G{constructor(e){super(),D(this,e,null,Ct,J,{})}}new St({target:document.getElementById("package-protection")});
