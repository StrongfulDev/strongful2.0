(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();function x(){}function rt(t){return t()}function Z(){return Object.create(null)}function E(t){t.forEach(rt)}function st(t){return typeof t=="function"}function J(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let M;function ft(t,e){return M||(M=document.createElement("a")),M.href=e,t===M.href}function dt(t){return Object.keys(t).length===0}function f(t,e){t.appendChild(e)}function w(t,e,n){t.insertBefore(e,n||null)}function y(t){t.parentNode&&t.parentNode.removeChild(t)}function p(t){return document.createElement(t)}function K(t){return document.createTextNode(t)}function v(){return K(" ")}function pt(){return K("")}function L(t,e,n,l){return t.addEventListener(e,n,l),()=>t.removeEventListener(e,n,l)}function d(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function mt(t){return Array.from(t.childNodes)}let V;function O(t){V=t}const C=[],tt=[];let S=[];const et=[],ht=Promise.resolve();let F=!1;function _t(){F||(F=!0,ht.then(ot))}function R(t){S.push(t)}const B=new Set;let D=0;function ot(){if(D!==0)return;const t=V;do{try{for(;D<C.length;){const e=C[D];D++,O(e),gt(e.$$)}}catch(e){throw C.length=0,D=0,e}for(O(null),C.length=0,D=0;tt.length;)tt.pop()();for(let e=0;e<S.length;e+=1){const n=S[e];B.has(n)||(B.add(n),n())}S.length=0}while(C.length);for(;et.length;)et.pop()();F=!1,B.clear(),O(t)}function gt(t){if(t.fragment!==null){t.update(),E(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(R)}}function vt(t){const e=[],n=[];S.forEach(l=>t.indexOf(l)===-1?e.push(l):n.push(l)),n.forEach(l=>l()),S=e}const N=new Set;let A;function it(){A={r:0,c:[],p:A}}function ct(){A.r||E(A.c),A=A.p}function $(t,e){t&&t.i&&(N.delete(t),t.i(e))}function P(t,e,n,l){if(t&&t.o){if(N.has(t))return;N.add(t),A.c.push(()=>{N.delete(t),l&&(n&&t.d(1),l())}),t.o(e)}else l&&l()}function G(t){t&&t.c()}function q(t,e,n,l){const{fragment:r,after_update:o}=t.$$;r&&r.m(e,n),l||R(()=>{const a=t.$$.on_mount.map(rt).filter(st);t.$$.on_destroy?t.$$.on_destroy.push(...a):E(a),t.$$.on_mount=[]}),o.forEach(R)}function H(t,e){const n=t.$$;n.fragment!==null&&(vt(n.after_update),E(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function yt(t,e){t.$$.dirty[0]===-1&&(C.push(t),_t(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Q(t,e,n,l,r,o,a,_=[-1]){const c=V;O(t);const s=t.$$={fragment:null,ctx:[],props:o,update:x,not_equal:r,bound:Z(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:Z(),dirty:_,skip_bound:!1,root:e.target||c.$$.root};a&&a(s.root);let m=!1;if(s.ctx=n?n(t,e.props||{},(u,g,...i)=>{const h=i.length?i[0]:g;return s.ctx&&r(s.ctx[u],s.ctx[u]=h)&&(!s.skip_bound&&s.bound[u]&&s.bound[u](h),m&&yt(t,u)),g}):[],s.update(),m=!0,E(s.before_update),s.fragment=l?l(s.ctx):!1,e.target){if(e.hydrate){const u=mt(e.target);s.fragment&&s.fragment.l(u),u.forEach(y)}else s.fragment&&s.fragment.c();e.intro&&$(t.$$.fragment),q(t,e.target,e.anchor,e.customElement),ot()}O(c)}class U{$destroy(){H(this,1),this.$destroy=x}$on(e,n){if(!st(n))return x;const l=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return l.push(n),()=>{const r=l.indexOf(n);r!==-1&&l.splice(r,1)}}$set(e){this.$$set&&!dt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function wt(t){let e,n,l,r,o,a,_,c,s,m,u,g,i,h,b,W,j,X,T,I,Y;return{c(){e=p("div"),n=p("img"),r=v(),o=p("div"),a=p("p"),a.textContent="ביטוח משלוח מורחב",_=v(),c=p("div"),s=p("div"),m=K(`נגד אובדן, גניבה או נזק במשלוח ומתן פתרון מיידי לכל בעיה.
                `),u=p("button"),u.innerHTML='<svg class="information info-icon svelte-r9e4w6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm1 15h-2v-6h2zm0-8h-2V7h2z"></path></svg>',g=v(),i=p("div"),h=p("div"),b=p("button"),b.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-close svelte-r9e4w6" fill="none" viewBox="0 0 18 17"><path d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z" fill="currentColor"></path></svg>',W=v(),j=p("h4"),j.textContent="ביטוח משלוח מורחב",X=v(),T=p("div"),T.innerHTML=`<ol class="modal-list"><li class="modal-list-item">הגנה מורחבת: מעניק הגנה מורחבת מעבר לביטוח חבילה הסטנדרטי. מבטיח שהחבילה שלך תהיה מוגנת לא רק מאובדן או גניבה, אלא גם במידה והמוצר נפגם במהלך ההובלה מכל סיבה שהיא, לרבות כל נזק שנגרם מגוף צד שלישי שאינו באחריות החברה.</li> 
                <li class="modal-list-item">הגנה מגניבה: השירות מציע הגנה מלאה מפני גניבה, השירות מבטיח שהלקוחות יקבלו החזר או תחליף במידה והחבילה שלהן תיגנב/תיאבד לאחר מסירה לחברת השילוח ו/או מחברת השילוח אליך. השירות מכסה את מלוא שווי הסחורה והמשלוח (עד גובה הרכישה).</li> 
                <li class="modal-list-item">פתרון בעיות באופן מהיר ללא בעיות: במקרה של אובדן, גניבה או פגם במשלוח, אנו נדאג לתהליך פתרון בשם הלקוח/ה. השירות כולל התנהלות מול אותה חברת השילוח ממנה נשלחה החבילה, הגשת תביעות, תיאום מחודש עם חברת השילוח והבטחת חוויה חלקה ונטולת טרחה.</li> 
                <li class="modal-list-item">החלפה/החזרה מזורזת: הבטחת תעדוף וטיפול מהיר במקרה של בעיה/תקלה במהלך הליך ההחלפה/ההחזרה.
                    השירות תקף ללקוחת אשר רכשו את שירות ביטוח החבילה למטרת מזעור כל אי נוחות.</li> 
                <li class="modal-list-item">שירות לקוחות מורחב: השירות מספק שירות לקוחות מורחב ללקוחות שהוסיפו את שירות הגנת החבילה. המבטיח טיפול ומענה מהיר ומקשיב הנותן מענה לכל בעיה.</li> 
                <li class="modal-list-item">החלפות מורחבות: בשירות זה בלבד תינתן הארכה בפרק הזמן שבו ניתן להחליף את הפריטים בהזמנה שלך מ30 ימים ל60 ימים.</li> 
                <li class="modal-list-item svelte-r9e4w6">השירות הינו כפוף ל<a href="https://strongful.co.il/blogs/%D7%AA%D7%A7%D7%A0%D7%95%D7%A0%D7%99%D7%9D/%D7%AA%D7%A7%D7%A0%D7%95%D7%9F-%D7%94%D7%90%D7%AA%D7%A8#package" class="svelte-r9e4w6">תקנון שירות ביטוח המשלוח ותנאי השימוש באתר</a></li></ol>`,ft(n.src,l="https://cdn.shopify.com/s/files/1/0340/7986/7020/files/45237952fab2a0074f9b37a83e03b0c0.jpg?v=1690898033")||d(n,"src",l),d(n,"alt","ביטוח משלוח"),d(n,"height","30"),d(n,"width","30"),d(a,"class","bold svelte-r9e4w6"),d(u,"class","open-modal-button"),d(s,"class","description svelte-r9e4w6"),d(c,"class","text-and-info-container flex"),d(e,"class","product svelte-r9e4w6"),d(b,"class","close-modal svelte-r9e4w6"),d(j,"class","modal-title"),d(T,"class","svelte-r9e4w6"),d(h,"class","modal-content svelte-r9e4w6"),d(i,"class","modal hidden modal-overlay svelte-r9e4w6")},m(k,z){w(k,e,z),f(e,n),f(e,r),f(e,o),f(o,a),f(o,_),f(o,c),f(c,s),f(s,m),f(s,u),w(k,g,z),w(k,i,z),f(i,h),f(h,b),f(h,W),f(h,j),f(h,X),f(h,T),I||(Y=[L(u,"click",$t),L(b,"click",nt),L(i,"click",nt)],I=!0)},p:x,i:x,o:x,d(k){k&&y(e),k&&y(g),k&&y(i),I=!1,E(Y)}}}function $t(){document.querySelector(".modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function nt(){document.querySelector(".modal").classList.add("hidden"),document.body.style.overflow="auto"}function bt(t,e,n){let{product:l}=e;return t.$$set=r=>{"product"in r&&n(0,l=r.product)},[l]}class at extends U{constructor(e){super(),Q(this,e,bt,wt,J,{product:0})}}function lt(t){let e,n,l,r;const o=[kt,xt],a=[];function _(c,s){return c[1]?0:1}return e=_(t),n=a[e]=o[e](t),{c(){n.c(),l=pt()},m(c,s){a[e].m(c,s),w(c,l,s),r=!0},p(c,s){let m=e;e=_(c),e===m?a[e].p(c,s):(it(),P(a[m],1,1,()=>{a[m]=null}),ct(),n=a[e],n?n.p(c,s):(n=a[e]=o[e](c),n.c()),$(n,1),n.m(l.parentNode,l))},i(c){r||($(n),r=!0)},o(c){P(n),r=!1},d(c){a[e].d(c),c&&y(l)}}}function xt(t){let e,n,l,r,o,a,_,c,s,m,u,g;return s=new at({}),{c(){e=p("div"),n=p("label"),l=p("input"),r=v(),o=p("span"),a=v(),_=p("p"),_.textContent="₪4.99",c=v(),G(s.$$.fragment),d(l,"type","checkbox"),d(l,"class","svelte-196lft0"),d(o,"class","slider round svelte-196lft0"),d(n,"class","switch svelte-196lft0"),d(_,"class","small-text svelte-196lft0")},m(i,h){w(i,e,h),f(e,n),f(n,l),f(n,r),f(n,o),f(e,a),f(e,_),w(i,c,h),q(s,i,h),m=!0,u||(g=L(l,"change",t[3]),u=!0)},p:x,i(i){m||($(s.$$.fragment,i),m=!0)},o(i){P(s.$$.fragment,i),m=!1},d(i){i&&y(e),i&&y(c),H(s,i),u=!1,g()}}}function kt(t){let e,n,l,r,o,a,_,c,s,m,u,g;return s=new at({props:{product:t[0]}}),{c(){e=p("div"),n=p("label"),l=p("input"),r=v(),o=p("span"),a=v(),_=p("p"),_.textContent="₪4.99",c=v(),G(s.$$.fragment),d(l,"type","checkbox"),l.checked=!0,d(l,"class","svelte-196lft0"),d(o,"class","slider round svelte-196lft0"),d(n,"class","switch svelte-196lft0"),d(_,"class","small-text svelte-196lft0")},m(i,h){w(i,e,h),f(e,n),f(n,l),f(n,r),f(n,o),f(e,a),f(e,_),w(i,c,h),q(s,i,h),m=!0,u||(g=L(l,"change",t[4]),u=!0)},p(i,h){const b={};h&1&&(b.product=i[0]),s.$set(b)},i(i){m||($(s.$$.fragment,i),m=!0)},o(i){P(s.$$.fragment,i),m=!1},d(i){i&&y(e),i&&y(c),H(s,i),u=!1,g()}}}function At(t){let e,n,l=t[2]&&lt(t);return{c(){e=p("div"),l&&l.c(),d(e,"class","card")},m(r,o){w(r,e,o),l&&l.m(e,null),n=!0},p(r,[o]){r[2]?l?(l.p(r,o),o&4&&$(l,1)):(l=lt(r),l.c(),$(l,1),l.m(e,null)):l&&(it(),P(l,1,1,()=>{l=null}),ct())},i(r){n||($(l),n=!0)},o(r){P(l),n=!1},d(r){r&&y(e),l&&l.d()}}}let ut=41547480268940;async function Pt(){const t=await fetch("/cart.json");if(t.status===200)return t.json();throw new Error(`Failed to get request, Shopify returned ${t.status} ${t.statusText}`)}function Dt(t){return t.items.find(e=>e.id===ut)}function Ct(t,e,n){let l=null,r=null,o=!1,a=!1;const _=async()=>{const u=await(await fetch("/cart/add",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({items:[{id:ut,quantity:1}]})})).json();u&&(l=u,n(1,o=!!r),window.publish("PackageProtection/addToCard",{product:r}))},c=async()=>{sessionStorage.setItem("PackageProtection/HasRemoved","true");const u=await(await fetch("/cart/change",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({id:r.key,quantity:0})})).json();(!u.errors||u.errors.length===0)&&(n(1,o=!1),window.publish("PackageProtection/removeFromCart",{product:r}))};async function s(){l=await Pt(),n(0,r=Dt(l)),n(1,o=!!r);const m=sessionStorage.getItem("PackageProtection/HasRemoved");r||m==="true"||await _(),setTimeout(()=>{n(2,a=!0)},1e3)}return s(),[r,o,a,_,c]}class St extends U{constructor(e){super(),Q(this,e,Ct,At,J,{})}}function Et(t){let e,n,l;return n=new St({}),{c(){e=p("div"),G(n.$$.fragment),d(e,"id","package-protection")},m(r,o){w(r,e,o),q(n,e,null),l=!0},p:x,i(r){l||($(n.$$.fragment,r),l=!0)},o(r){P(n.$$.fragment,r),l=!1},d(r){r&&y(e),H(n)}}}class Lt extends U{constructor(e){super(),Q(this,e,null,Et,J,{})}}new Lt({target:document.getElementById("package-protection")});
