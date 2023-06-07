(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function h(){}function F(t){return t()}function L(){return Object.create(null)}function b(t){t.forEach(F)}function M(t){return typeof t=="function"}function B(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function R(t){return Object.keys(t).length===0}function p(t,e){t.appendChild(e)}function x(t,e,n){t.insertBefore(e,n||null)}function w(t){t.parentNode&&t.parentNode.removeChild(t)}function d(t){return document.createElement(t)}function U(t){return document.createTextNode(t)}function C(){return U(" ")}function J(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function u(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function V(t){return Array.from(t.childNodes)}let P;function $(t){P=t}const m=[],T=[];let y=[];const I=[],W=Promise.resolve();let O=!1;function X(){O||(O=!0,W.then(K))}function E(t){y.push(t)}const j=new Set;let g=0;function K(){if(g!==0)return;const t=P;do{try{for(;g<m.length;){const e=m[g];g++,$(e),Y(e.$$)}}catch(e){throw m.length=0,g=0,e}for($(null),m.length=0,g=0;T.length;)T.pop()();for(let e=0;e<y.length;e+=1){const n=y[e];j.has(n)||(j.add(n),n())}y.length=0}while(m.length);for(;I.length;)I.pop()();O=!1,j.clear(),$(t)}function Y(t){if(t.fragment!==null){t.update(),b(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(E)}}function Z(t){const e=[],n=[];y.forEach(o=>t.indexOf(o)===-1?e.push(o):n.push(o)),n.forEach(o=>o()),y=e}const v=new Set;let tt;function z(t,e){t&&t.i&&(v.delete(t),t.i(e))}function et(t,e,n,o){if(t&&t.o){if(v.has(t))return;v.add(t),tt.c.push(()=>{v.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}else o&&o()}function nt(t){t&&t.c()}function D(t,e,n,o){const{fragment:r,after_update:s}=t.$$;r&&r.m(e,n),o||E(()=>{const c=t.$$.on_mount.map(F).filter(M);t.$$.on_destroy?t.$$.on_destroy.push(...c):b(c),t.$$.on_mount=[]}),s.forEach(E)}function G(t,e){const n=t.$$;n.fragment!==null&&(Z(n.after_update),b(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function rt(t,e){t.$$.dirty[0]===-1&&(m.push(t),X(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function H(t,e,n,o,r,s,c,a=[-1]){const f=P;$(t);const i=t.$$={fragment:null,ctx:[],props:s,update:h,not_equal:r,bound:L(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(f?f.$$.context:[])),callbacks:L(),dirty:a,skip_bound:!1,root:e.target||f.$$.root};c&&c(i.root);let _=!1;if(i.ctx=n?n(t,e.props||{},(l,S,...A)=>{const N=A.length?A[0]:S;return i.ctx&&r(i.ctx[l],i.ctx[l]=N)&&(!i.skip_bound&&i.bound[l]&&i.bound[l](N),_&&rt(t,l)),S}):[],i.update(),_=!0,b(i.before_update),i.fragment=o?o(i.ctx):!1,e.target){if(e.hydrate){const l=V(e.target);i.fragment&&i.fragment.l(l),l.forEach(w)}else i.fragment&&i.fragment.c();e.intro&&z(t.$$.fragment),D(t,e.target,e.anchor,e.customElement),K()}$(f)}class Q{$destroy(){G(this,1),this.$destroy=h}$on(e,n){if(!M(n))return h;const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(n),()=>{const r=o.indexOf(n);r!==-1&&o.splice(r,1)}}$set(e){this.$$set&&!R(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function ot(t){let e,n,o,r,s,c;return{c(){e=d("label"),n=d("input"),o=C(),r=d("span"),u(n,"type","checkbox"),u(n,"id","package-toggler"),u(n,"class","svelte-j9tsuo"),u(r,"class","slider round svelte-j9tsuo"),u(e,"class","switch svelte-j9tsuo")},m(a,f){x(a,e,f),p(e,n),p(e,o),p(e,r),s||(c=J(n,"change",t[1]),s=!0)},p:h,d(a){a&&w(e),s=!1,c()}}}function st(t){let e,n,o,r,s,c;return{c(){e=d("label"),n=d("input"),o=C(),r=d("span"),u(n,"type","checkbox"),u(n,"id","package-toggler"),n.checked="checked",u(n,"class","svelte-j9tsuo"),u(r,"class","slider round svelte-j9tsuo"),u(e,"class","switch svelte-j9tsuo")},m(a,f){x(a,e,f),p(e,n),p(e,o),p(e,r),s||(c=J(n,"change",t[1]),s=!0)},p:h,d(a){a&&w(e),s=!1,c()}}}function ct(t){let e;function n(s,c){return s[0]?st:ot}let o=n(t),r=o(t);return{c(){e=d("div"),r.c(),u(e,"class","card")},m(s,c){x(s,e,c),r.m(e,null)},p(s,[c]){o===(o=n(s))&&r?r.p(s,c):(r.d(1),r=o(s),r&&(r.c(),r.m(e,null)))},i:h,o:h,d(s){s&&w(e),r.d()}}}let q=41547480268940;async function k(){const t=await fetch("/cart.json");if(t.status===200)return t.json();throw new Error(`Failed to get request, Shopify returned ${t.status} ${t.statusText}`)}function it(t,e,n){let o=null,r=null;function s(){event.target.checked?c():a()}const c=async()=>{const l=await(await fetch("/cart/add",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({id:q,quantity:1})})).json();l&&n(0,r=l),o=await k(),window.location=window.location},a=async()=>{const l=await(await fetch("/cart/change",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({id:r.key,quantity:0})})).json();(!l.errors||l.errors.length===0)&&n(0,r=null),o=await k(),window.location=window.location};function f(){if(o)return o.items.find(_=>_.id===q)}return f(),(async()=>{o=await k(),n(0,r=f()),console.log(r)})(),[r,s]}class lt extends Q{constructor(e){super(),H(this,e,it,ct,B,{})}}function at(t){let e,n,o,r,s;return n=new lt({}),{c(){e=d("div"),nt(n.$$.fragment),o=C(),r=d("p"),r.textContent="Click for shipping protection",u(r,"class","description svelte-1kue4g"),u(e,"id","package-protection")},m(c,a){x(c,e,a),D(n,e,null),p(e,o),p(e,r),s=!0},p:h,i(c){s||(z(n.$$.fragment,c),s=!0)},o(c){et(n.$$.fragment,c),s=!1},d(c){c&&w(e),G(n)}}}class ut extends Q{constructor(e){super(),H(this,e,null,at,B,{})}}new ut({target:document.getElementById("package-protection")});
