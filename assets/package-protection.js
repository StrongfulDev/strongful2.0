(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();function x(){}function st(t){return t()}function Z(){return Object.create(null)}function S(t){t.forEach(st)}function rt(t){return typeof t=="function"}function J(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let T;function ft(t,e){return T||(T=document.createElement("a")),T.href=e,t===T.href}function dt(t){return Object.keys(t).length===0}function f(t,e){t.appendChild(e)}function $(t,e,n){t.insertBefore(e,n||null)}function y(t){t.parentNode&&t.parentNode.removeChild(t)}function p(t){return document.createElement(t)}function K(t){return document.createTextNode(t)}function v(){return K(" ")}function pt(){return K("")}function E(t,e,n,l){return t.addEventListener(e,n,l),()=>t.removeEventListener(e,n,l)}function d(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function mt(t){return Array.from(t.childNodes)}let V;function L(t){V=t}const z=[],tt=[];let C=[];const et=[],ht=Promise.resolve();let F=!1;function _t(){F||(F=!0,ht.then(ot))}function R(t){C.push(t)}const B=new Set;let D=0;function ot(){if(D!==0)return;const t=V;do{try{for(;D<z.length;){const e=z[D];D++,L(e),gt(e.$$)}}catch(e){throw z.length=0,D=0,e}for(L(null),z.length=0,D=0;tt.length;)tt.pop()();for(let e=0;e<C.length;e+=1){const n=C[e];B.has(n)||(B.add(n),n())}C.length=0}while(z.length);for(;et.length;)et.pop()();F=!1,B.clear(),L(t)}function gt(t){if(t.fragment!==null){t.update(),S(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(R)}}function vt(t){const e=[],n=[];C.forEach(l=>t.indexOf(l)===-1?e.push(l):n.push(l)),n.forEach(l=>l()),C=e}const M=new Set;let A;function it(){A={r:0,c:[],p:A}}function ct(){A.r||S(A.c),A=A.p}function b(t,e){t&&t.i&&(M.delete(t),t.i(e))}function P(t,e,n,l){if(t&&t.o){if(M.has(t))return;M.add(t),A.c.push(()=>{M.delete(t),l&&(n&&t.d(1),l())}),t.o(e)}else l&&l()}function G(t){t&&t.c()}function N(t,e,n,l){const{fragment:s,after_update:o}=t.$$;s&&s.m(e,n),l||R(()=>{const a=t.$$.on_mount.map(st).filter(rt);t.$$.on_destroy?t.$$.on_destroy.push(...a):S(a),t.$$.on_mount=[]}),o.forEach(R)}function q(t,e){const n=t.$$;n.fragment!==null&&(vt(n.after_update),S(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function yt(t,e){t.$$.dirty[0]===-1&&(z.push(t),_t(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Q(t,e,n,l,s,o,a,_=[-1]){const c=V;L(t);const r=t.$$={fragment:null,ctx:[],props:o,update:x,not_equal:s,bound:Z(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:Z(),dirty:_,skip_bound:!1,root:e.target||c.$$.root};a&&a(r.root);let m=!1;if(r.ctx=n?n(t,e.props||{},(u,g,...i)=>{const h=i.length?i[0]:g;return r.ctx&&s(r.ctx[u],r.ctx[u]=h)&&(!r.skip_bound&&r.bound[u]&&r.bound[u](h),m&&yt(t,u)),g}):[],r.update(),m=!0,S(r.before_update),r.fragment=l?l(r.ctx):!1,e.target){if(e.hydrate){const u=mt(e.target);r.fragment&&r.fragment.l(u),u.forEach(y)}else r.fragment&&r.fragment.c();e.intro&&b(t.$$.fragment),N(t,e.target,e.anchor,e.customElement),ot()}L(c)}class U{$destroy(){q(this,1),this.$destroy=x}$on(e,n){if(!rt(n))return x;const l=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return l.push(n),()=>{const s=l.indexOf(n);s!==-1&&l.splice(s,1)}}$set(e){this.$$set&&!dt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function $t(t){let e,n,l,s,o,a,_,c,r,m,u,g,i,h,w,W,O,X,j,H,Y;return{c(){e=p("div"),n=p("img"),s=v(),o=p("div"),a=p("p"),a.textContent="החלפות מורחבות",_=v(),c=p("div"),r=p("div"),m=K(`שירות זה מגדיל את פרק זמן ההחלפה מ30 ל60 יום.
                `),u=p("button"),u.innerHTML='<svg class="information info-icon svelte-mlaznt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm1 15h-2v-6h2zm0-8h-2V7h2z"></path></svg>',g=v(),i=p("div"),h=p("div"),w=p("button"),w.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-close svelte-mlaznt" fill="none" viewBox="0 0 18 17"><path d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z" fill="currentColor"></path></svg>',W=v(),O=p("h4"),O.textContent="החלפות מורחבות",X=v(),j=p("div"),j.innerHTML=`<ol class="modal-list"><li class="modal-list-item">השירות מקנה הארכה בפרק הזמן בו ניתן להחליף את הפריטים בהזמנה שלך מ30 ימים ל60
                    ימים מרגע קבלת החבילה</li> 
                <li class="modal-list-item">ההחלפה ראשונה הינה ללא עלות משלוח.</li> 
                <li class="modal-list-item">ההחלפה מתבצעת עם שליח עד הבית ללא עלות.</li> 
                <li class="modal-list-item">החלפה בין מידות אינה כרוכה בתשלום נוסף.</li> 
                <li class="modal-list-item">ההחלפה המורחבת תקפה על ההזמנה אשר התווסף אליה השירות בלבד</li> 
                <li class="modal-list-item svelte-mlaznt">השירות הינו כפוף ל<a href="https://strongful.co.il/blogs/%D7%AA%D7%A7%D7%A0%D7%95%D7%A0%D7%99%D7%9D/%D7%AA%D7%A7%D7%A0%D7%95%D7%9F-%D7%94%D7%90%D7%AA%D7%A8#package" class="svelte-mlaznt">תקנון שירות ביטוח המשלוח ותנאי השימוש באתר</a></li></ol>`,ft(n.src,l="https://cdn.shopify.com/s/files/1/0340/7986/7020/files/45237952fab2a0074f9b37a83e03b0c0.jpg?v=1690898033")||d(n,"src",l),d(n,"alt","ביטוח משלוח"),d(n,"height","30"),d(n,"width","30"),d(a,"class","bold svelte-mlaznt"),d(u,"class","open-modal-button"),d(r,"class","description svelte-mlaznt"),d(c,"class","text-and-info-container flex"),d(e,"class","product svelte-mlaznt"),d(w,"class","close-modal svelte-mlaznt"),d(O,"class","modal-title"),d(j,"class","svelte-mlaznt"),d(h,"class","modal-content svelte-mlaznt"),d(i,"class","modal hidden modal-overlay svelte-mlaznt")},m(k,I){$(k,e,I),f(e,n),f(e,s),f(e,o),f(o,a),f(o,_),f(o,c),f(c,r),f(r,m),f(r,u),$(k,g,I),$(k,i,I),f(i,h),f(h,w),f(h,W),f(h,O),f(h,X),f(h,j),H||(Y=[E(u,"click",bt),E(w,"click",nt),E(i,"click",nt)],H=!0)},p:x,i:x,o:x,d(k){k&&y(e),k&&y(g),k&&y(i),H=!1,S(Y)}}}function bt(){document.querySelector(".modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function nt(){document.querySelector(".modal").classList.add("hidden"),document.body.style.overflow="auto"}function wt(t,e,n){let{product:l}=e;return t.$$set=s=>{"product"in s&&n(0,l=s.product)},[l]}class at extends U{constructor(e){super(),Q(this,e,wt,$t,J,{product:0})}}function lt(t){let e,n,l,s;const o=[kt,xt],a=[];function _(c,r){return c[1]?0:1}return e=_(t),n=a[e]=o[e](t),{c(){n.c(),l=pt()},m(c,r){a[e].m(c,r),$(c,l,r),s=!0},p(c,r){let m=e;e=_(c),e===m?a[e].p(c,r):(it(),P(a[m],1,1,()=>{a[m]=null}),ct(),n=a[e],n?n.p(c,r):(n=a[e]=o[e](c),n.c()),b(n,1),n.m(l.parentNode,l))},i(c){s||(b(n),s=!0)},o(c){P(n),s=!1},d(c){a[e].d(c),c&&y(l)}}}function xt(t){let e,n,l,s,o,a,_,c,r,m,u,g;return r=new at({}),{c(){e=p("div"),n=p("label"),l=p("input"),s=v(),o=p("span"),a=v(),_=p("p"),_.textContent="₪4.99",c=v(),G(r.$$.fragment),d(l,"type","checkbox"),d(l,"class","svelte-196lft0"),d(o,"class","slider round svelte-196lft0"),d(n,"class","switch svelte-196lft0"),d(_,"class","small-text svelte-196lft0")},m(i,h){$(i,e,h),f(e,n),f(n,l),f(n,s),f(n,o),f(e,a),f(e,_),$(i,c,h),N(r,i,h),m=!0,u||(g=E(l,"change",t[3]),u=!0)},p:x,i(i){m||(b(r.$$.fragment,i),m=!0)},o(i){P(r.$$.fragment,i),m=!1},d(i){i&&y(e),i&&y(c),q(r,i),u=!1,g()}}}function kt(t){let e,n,l,s,o,a,_,c,r,m,u,g;return r=new at({props:{product:t[0]}}),{c(){e=p("div"),n=p("label"),l=p("input"),s=v(),o=p("span"),a=v(),_=p("p"),_.textContent="₪4.99",c=v(),G(r.$$.fragment),d(l,"type","checkbox"),l.checked=!0,d(l,"class","svelte-196lft0"),d(o,"class","slider round svelte-196lft0"),d(n,"class","switch svelte-196lft0"),d(_,"class","small-text svelte-196lft0")},m(i,h){$(i,e,h),f(e,n),f(n,l),f(n,s),f(n,o),f(e,a),f(e,_),$(i,c,h),N(r,i,h),m=!0,u||(g=E(l,"change",t[4]),u=!0)},p(i,h){const w={};h&1&&(w.product=i[0]),r.$set(w)},i(i){m||(b(r.$$.fragment,i),m=!0)},o(i){P(r.$$.fragment,i),m=!1},d(i){i&&y(e),i&&y(c),q(r,i),u=!1,g()}}}function At(t){let e,n,l=t[2]&&lt(t);return{c(){e=p("div"),l&&l.c(),d(e,"class","card")},m(s,o){$(s,e,o),l&&l.m(e,null),n=!0},p(s,[o]){s[2]?l?(l.p(s,o),o&4&&b(l,1)):(l=lt(s),l.c(),b(l,1),l.m(e,null)):l&&(it(),P(l,1,1,()=>{l=null}),ct())},i(s){n||(b(l),n=!0)},o(s){P(l),n=!1},d(s){s&&y(e),l&&l.d()}}}let ut=41547480268940;async function Pt(){const t=await fetch("/cart.json");if(t.status===200)return t.json();throw new Error(`Failed to get request, Shopify returned ${t.status} ${t.statusText}`)}function Dt(t){return t.items.find(e=>e.id===ut)}function zt(t,e,n){let l=null,s=null,o=!1,a=!1;const _=async()=>{const u=await(await fetch("/cart/add",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({items:[{id:ut,quantity:1}]})})).json();u&&(l=u,n(1,o=!!s),window.publish("PackageProtection/addToCard",{product:s}))},c=async()=>{sessionStorage.setItem("PackageProtection/HasRemoved","true");const u=await(await fetch("/cart/change",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({id:s.key,quantity:0})})).json();(!u.errors||u.errors.length===0)&&(n(1,o=!1),window.publish("PackageProtection/removeFromCart",{product:s}))};async function r(){l=await Pt(),n(0,s=Dt(l)),n(1,o=!!s);const m=sessionStorage.getItem("PackageProtection/HasRemoved");s||m==="true"||await _(),setTimeout(()=>{n(2,a=!0)},1e3)}return r(),[s,o,a,_,c]}class Ct extends U{constructor(e){super(),Q(this,e,zt,At,J,{})}}function St(t){let e,n,l;return n=new Ct({}),{c(){e=p("div"),G(n.$$.fragment),d(e,"id","package-protection")},m(s,o){$(s,e,o),N(n,e,null),l=!0},p:x,i(s){l||(b(n.$$.fragment,s),l=!0)},o(s){P(n.$$.fragment,s),l=!1},d(s){s&&y(e),q(n)}}}class Et extends U{constructor(e){super(),Q(this,e,null,St,J,{})}}new Et({target:document.getElementById("package-protection")});
