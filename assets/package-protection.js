(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerPolicy&&(o.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?o.credentials="include":l.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(l){if(l.ep)return;l.ep=!0;const o=n(l);fetch(l.href,o)}})();function x(){}function lt(t){return t()}function Z(){return Object.create(null)}function E(t){t.forEach(lt)}function rt(t){return typeof t=="function"}function J(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let M;function ft(t,e){return M||(M=document.createElement("a")),M.href=e,t===M.href}function dt(t){return Object.keys(t).length===0}function f(t,e){t.appendChild(e)}function $(t,e,n){t.insertBefore(e,n||null)}function y(t){t.parentNode&&t.parentNode.removeChild(t)}function p(t){return document.createElement(t)}function K(t){return document.createTextNode(t)}function g(){return K(" ")}function pt(){return K("")}function L(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function d(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function mt(t){return Array.from(t.childNodes)}let V;function O(t){V=t}const C=[],tt=[];let S=[];const et=[],ht=Promise.resolve();let F=!1;function _t(){F||(F=!0,ht.then(ot))}function R(t){S.push(t)}const B=new Set;let D=0;function ot(){if(D!==0)return;const t=V;do{try{for(;D<C.length;){const e=C[D];D++,O(e),vt(e.$$)}}catch(e){throw C.length=0,D=0,e}for(O(null),C.length=0,D=0;tt.length;)tt.pop()();for(let e=0;e<S.length;e+=1){const n=S[e];B.has(n)||(B.add(n),n())}S.length=0}while(C.length);for(;et.length;)et.pop()();F=!1,B.clear(),O(t)}function vt(t){if(t.fragment!==null){t.update(),E(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(R)}}function gt(t){const e=[],n=[];S.forEach(s=>t.indexOf(s)===-1?e.push(s):n.push(s)),n.forEach(s=>s()),S=e}const N=new Set;let A;function it(){A={r:0,c:[],p:A}}function ct(){A.r||E(A.c),A=A.p}function b(t,e){t&&t.i&&(N.delete(t),t.i(e))}function P(t,e,n,s){if(t&&t.o){if(N.has(t))return;N.add(t),A.c.push(()=>{N.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}else s&&s()}function G(t){t&&t.c()}function q(t,e,n,s){const{fragment:l,after_update:o}=t.$$;l&&l.m(e,n),s||R(()=>{const a=t.$$.on_mount.map(lt).filter(rt);t.$$.on_destroy?t.$$.on_destroy.push(...a):E(a),t.$$.on_mount=[]}),o.forEach(R)}function H(t,e){const n=t.$$;n.fragment!==null&&(gt(n.after_update),E(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function yt(t,e){t.$$.dirty[0]===-1&&(C.push(t),_t(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Q(t,e,n,s,l,o,a,_=[-1]){const c=V;O(t);const r=t.$$={fragment:null,ctx:[],props:o,update:x,not_equal:l,bound:Z(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:Z(),dirty:_,skip_bound:!1,root:e.target||c.$$.root};a&&a(r.root);let m=!1;if(r.ctx=n?n(t,e.props||{},(u,v,...i)=>{const h=i.length?i[0]:v;return r.ctx&&l(r.ctx[u],r.ctx[u]=h)&&(!r.skip_bound&&r.bound[u]&&r.bound[u](h),m&&yt(t,u)),v}):[],r.update(),m=!0,E(r.before_update),r.fragment=s?s(r.ctx):!1,e.target){if(e.hydrate){const u=mt(e.target);r.fragment&&r.fragment.l(u),u.forEach(y)}else r.fragment&&r.fragment.c();e.intro&&b(t.$$.fragment),q(t,e.target,e.anchor,e.customElement),ot()}O(c)}class U{$destroy(){H(this,1),this.$destroy=x}$on(e,n){if(!rt(n))return x;const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(n),()=>{const l=s.indexOf(n);l!==-1&&s.splice(l,1)}}$set(e){this.$$set&&!dt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function $t(t){let e,n,s,l,o,a,_,c,r,m,u,v,i,h,w,W,j,X,T,I,Y;return{c(){e=p("div"),n=p("img"),l=g(),o=p("div"),a=p("p"),a.textContent="החלפות מורחבות",_=g(),c=p("div"),r=p("div"),m=K(`שירות זה מגדיל את פרק זמן ההחלפה מ30 ל60 יום.
                `),u=p("button"),u.innerHTML='<svg class="information info-icon svelte-xevas8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm1 15h-2v-6h2zm0-8h-2V7h2z"></path></svg>',v=g(),i=p("div"),h=p("div"),w=p("button"),w.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-close svelte-xevas8" fill="none" viewBox="0 0 18 17"><path d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z" fill="currentColor"></path></svg>',W=g(),j=p("h4"),j.textContent="החלפות מורחבות",X=g(),T=p("div"),T.innerHTML=`<ol class="modal-list"><li class="modal-list-item">השירות מקנה הארכה בפרק הזמן בו ניתן להחליף את הפריטים בהזמנה שלך מ30 ימים ל60
                    ימים מרגע קבלת החבילה</li> 
                <li class="modal-list-item">ההחלפה ראשונה הינה ללא עלות משלוח.</li> 
                <li class="modal-list-item">ההחלפה מתבצעת עם שליח עד הבית ללא עלות.</li> 
                <li class="modal-list-item">החלפה בין מידות אינה כרוכה בתשלום נוסף.</li> 
                <li class="modal-list-item">ההחלפה המורחבת תקפה על ההזמנה אשר התווסף אליה השירות בלבד</li> 
                <li class="modal-list-item svelte-xevas8">השירות הינו כפוף ל<a href="https://strongful.co.il/blogs/%D7%AA%D7%A7%D7%A0%D7%95%D7%A0%D7%99%D7%9D/%D7%AA%D7%A7%D7%A0%D7%95%D7%9F-%D7%94%D7%90%D7%AA%D7%A8#package" class="svelte-xevas8">תקנון שירות ביטוח המשלוח ותנאי השימוש באתר</a></li></ol>`,ft(n.src,s="https://cdn.shopify.com/s/files/1/0340/7986/7020/files/45237952fab2a0074f9b37a83e03b0c0.jpg?v=1690898033")||d(n,"src",s),d(n,"alt","ביטוח משלוח"),d(n,"height","30"),d(n,"width","30"),d(a,"class","bold svelte-xevas8"),d(u,"class","open-modal-button"),d(r,"class","description svelte-xevas8"),d(c,"class","text-and-info-container flex"),d(e,"class","product svelte-xevas8"),d(w,"class","close-modal svelte-xevas8"),d(j,"class","modal-title"),d(T,"class","svelte-xevas8"),d(h,"class","modal-content svelte-xevas8"),d(i,"class","modal hidden modal-overlay svelte-xevas8")},m(k,z){$(k,e,z),f(e,n),f(e,l),f(e,o),f(o,a),f(o,_),f(o,c),f(c,r),f(r,m),f(r,u),$(k,v,z),$(k,i,z),f(i,h),f(h,w),f(h,W),f(h,j),f(h,X),f(h,T),I||(Y=[L(u,"click",bt),L(w,"click",nt),L(i,"click",nt)],I=!0)},p:x,i:x,o:x,d(k){k&&y(e),k&&y(v),k&&y(i),I=!1,E(Y)}}}function bt(){document.querySelector(".modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function nt(){document.querySelector(".modal").classList.add("hidden"),document.body.style.overflow="auto"}function wt(t,e,n){let{product:s}=e;return t.$$set=l=>{"product"in l&&n(0,s=l.product)},[s]}class at extends U{constructor(e){super(),Q(this,e,wt,$t,J,{product:0})}}function st(t){let e,n,s,l;const o=[kt,xt],a=[];function _(c,r){return c[1]?0:1}return e=_(t),n=a[e]=o[e](t),{c(){n.c(),s=pt()},m(c,r){a[e].m(c,r),$(c,s,r),l=!0},p(c,r){let m=e;e=_(c),e===m?a[e].p(c,r):(it(),P(a[m],1,1,()=>{a[m]=null}),ct(),n=a[e],n?n.p(c,r):(n=a[e]=o[e](c),n.c()),b(n,1),n.m(s.parentNode,s))},i(c){l||(b(n),l=!0)},o(c){P(n),l=!1},d(c){a[e].d(c),c&&y(s)}}}function xt(t){let e,n,s,l,o,a,_,c,r,m,u,v;return r=new at({}),{c(){e=p("div"),n=p("label"),s=p("input"),l=g(),o=p("span"),a=g(),_=p("p"),_.textContent="₪4.99",c=g(),G(r.$$.fragment),d(s,"type","checkbox"),d(s,"class","svelte-196lft0"),d(o,"class","slider round svelte-196lft0"),d(n,"class","switch svelte-196lft0"),d(_,"class","small-text svelte-196lft0")},m(i,h){$(i,e,h),f(e,n),f(n,s),f(n,l),f(n,o),f(e,a),f(e,_),$(i,c,h),q(r,i,h),m=!0,u||(v=L(s,"change",t[3]),u=!0)},p:x,i(i){m||(b(r.$$.fragment,i),m=!0)},o(i){P(r.$$.fragment,i),m=!1},d(i){i&&y(e),i&&y(c),H(r,i),u=!1,v()}}}function kt(t){let e,n,s,l,o,a,_,c,r,m,u,v;return r=new at({props:{product:t[0]}}),{c(){e=p("div"),n=p("label"),s=p("input"),l=g(),o=p("span"),a=g(),_=p("p"),_.textContent="₪4.99",c=g(),G(r.$$.fragment),d(s,"type","checkbox"),s.checked=!0,d(s,"class","svelte-196lft0"),d(o,"class","slider round svelte-196lft0"),d(n,"class","switch svelte-196lft0"),d(_,"class","small-text svelte-196lft0")},m(i,h){$(i,e,h),f(e,n),f(n,s),f(n,l),f(n,o),f(e,a),f(e,_),$(i,c,h),q(r,i,h),m=!0,u||(v=L(s,"change",t[4]),u=!0)},p(i,h){const w={};h&1&&(w.product=i[0]),r.$set(w)},i(i){m||(b(r.$$.fragment,i),m=!0)},o(i){P(r.$$.fragment,i),m=!1},d(i){i&&y(e),i&&y(c),H(r,i),u=!1,v()}}}function At(t){let e,n,s=t[2]&&st(t);return{c(){e=p("div"),s&&s.c(),d(e,"class","card")},m(l,o){$(l,e,o),s&&s.m(e,null),n=!0},p(l,[o]){l[2]?s?(s.p(l,o),o&4&&b(s,1)):(s=st(l),s.c(),b(s,1),s.m(e,null)):s&&(it(),P(s,1,1,()=>{s=null}),ct())},i(l){n||(b(s),n=!0)},o(l){P(s),n=!1},d(l){l&&y(e),s&&s.d()}}}let ut=41547480268940;async function Pt(){const t=await fetch("/cart.json");if(t.status===200)return t.json();throw new Error(`Failed to get request, Shopify returned ${t.status} ${t.statusText}`)}function Dt(t){return t.items.find(e=>e.id===ut)}function Ct(t,e,n){let s=null,l=null,o=!1,a=!1;const _=async()=>{const u=await(await fetch("/cart/add",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({items:[{id:ut,quantity:1}]})})).json();u&&(s=u,n(1,o=!!l),window.publish("PackageProtection/addToCard",{product:l}))},c=async()=>{sessionStorage.setItem("PackageProtection/HasRemoved","true");const u=await(await fetch("/cart/change",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({id:l.key,quantity:0})})).json();(!u.errors||u.errors.length===0)&&(n(1,o=!1),window.publish("PackageProtection/removeFromCart",{product:l}))};async function r(){s=await Pt(),n(0,l=Dt(s)),n(1,o=!!l);const m=sessionStorage.getItem("PackageProtection/HasRemoved");l||m==="true"||await _(),setTimeout(()=>{n(2,a=!0)},1e3)}return r(),[l,o,a,_,c]}class St extends U{constructor(e){super(),Q(this,e,Ct,At,J,{})}}function Et(t){let e,n,s;return n=new St({}),{c(){e=p("div"),G(n.$$.fragment),d(e,"id","package-protection")},m(l,o){$(l,e,o),q(n,e,null),s=!0},p:x,i(l){s||(b(n.$$.fragment,l),s=!0)},o(l){P(n.$$.fragment,l),s=!1},d(l){l&&y(e),H(n)}}}class Lt extends U{constructor(e){super(),Q(this,e,null,Et,J,{})}}new Lt({target:document.getElementById("package-protection")});
