(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(s){if(s.ep)return;s.ep=!0;const l=n(s);fetch(s.href,l)}})();const se=(e,t)=>e===t,ie=Symbol("solid-track"),E={equals:se};let le=Y;const y=1,C=2,V={owned:null,cleanups:null,context:null,owner:null};var a=null;let O=null,u=null,h=null,w=null,T=0;function B(e,t){const n=u,i=a,s=e.length===0,l=s?V:{owned:null,cleanups:null,context:null,owner:t===void 0?i:t},r=s?e:()=>e(()=>g(()=>L(l)));a=l,u=null;try{return A(r,!0)}finally{u=n,a=i}}function D(e,t){t=t?Object.assign({},E,t):E;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},i=s=>(typeof s=="function"&&(s=s(n.value)),Q(n,s));return[X.bind(n),i]}function $(e,t,n){const i=W(e,t,!1,y);_(i)}function I(e,t,n){n=n?Object.assign({},E,n):E;const i=W(e,t,!0,0);return i.observers=null,i.observerSlots=null,i.comparator=n.equals||void 0,_(i),X.bind(i)}function g(e){if(u===null)return e();const t=u;u=null;try{return e()}finally{u=t}}function oe(e){return a===null||(a.cleanups===null?a.cleanups=[e]:a.cleanups.push(e)),e}function X(){if(this.sources&&this.state)if(this.state===y)_(this);else{const e=h;h=null,A(()=>x(this),!1),h=e}if(u){const e=this.observers?this.observers.length:0;u.sources?(u.sources.push(this),u.sourceSlots.push(e)):(u.sources=[this],u.sourceSlots=[e]),this.observers?(this.observers.push(u),this.observerSlots.push(u.sources.length-1)):(this.observers=[u],this.observerSlots=[u.sources.length-1])}return this.value}function Q(e,t,n){let i=e.value;return(!e.comparator||!e.comparator(i,t))&&(e.value=t,e.observers&&e.observers.length&&A(()=>{for(let s=0;s<e.observers.length;s+=1){const l=e.observers[s],r=O&&O.running;r&&O.disposed.has(l),(r?!l.tState:!l.state)&&(l.pure?h.push(l):w.push(l),l.observers&&Z(l)),r||(l.state=y)}if(h.length>1e6)throw h=[],new Error},!1)),t}function _(e){if(!e.fn)return;L(e);const t=a,n=u,i=T;u=a=e,re(e,e.value,i),u=n,a=t}function re(e,t,n){let i;try{i=e.fn(t)}catch(s){return e.pure&&(e.state=y,e.owned&&e.owned.forEach(L),e.owned=null),e.updatedAt=n+1,z(s)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?Q(e,i):e.value=i,e.updatedAt=n)}function W(e,t,n,i=y,s){const l={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:a,context:null,pure:n};return a===null||a!==V&&(a.owned?a.owned.push(l):a.owned=[l]),l}function J(e){if(e.state===0)return;if(e.state===C)return x(e);if(e.suspense&&g(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<T);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===y)_(e);else if(e.state===C){const i=h;h=null,A(()=>x(e,t[0]),!1),h=i}}function A(e,t){if(h)return e();let n=!1;t||(h=[]),w?n=!0:w=[],T++;try{const i=e();return ce(n),i}catch(i){n||(w=null),h=null,z(i)}}function ce(e){if(h&&(Y(h),h=null),e)return;const t=w;w=null,t.length&&A(()=>le(t),!1)}function Y(e){for(let t=0;t<e.length;t++)J(e[t])}function x(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const i=e.sources[n];if(i.sources){const s=i.state;s===y?i!==t&&(!i.updatedAt||i.updatedAt<T)&&J(i):s===C&&x(i,t)}}}function Z(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=C,n.pure?h.push(n):w.push(n),n.observers&&Z(n))}}function L(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),i=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const l=s.pop(),r=n.observerSlots.pop();i<s.length&&(l.sourceSlots[r]=i,s[i]=l,n.observerSlots[i]=r)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)L(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function z(e){throw e}const j=Symbol("fallback");function G(e){for(let t=0;t<e.length;t++)e[t]()}function ue(e,t,n={}){let i=[],s=[],l=[],r=[],o=0,c;return oe(()=>G(l)),()=>{const f=e()||[];return f[ie],g(()=>{if(f.length===0)return o!==0&&(G(l),l=[],i=[],s=[],o=0,r=[]),n.fallback&&(i=[j],s[0]=B(p=>(l[0]=p,n.fallback())),o=1),s;for(i[0]===j&&(l[0](),l=[],i=[],s=[],o=0),c=0;c<f.length;c++)c<i.length&&i[c]!==f[c]?r[c](()=>f[c]):c>=i.length&&(s[c]=B(d));for(;c<i.length;c++)l[c]();return o=r.length=l.length=f.length,i=f.slice(0),s=s.slice(0,o)});function d(p){l[c]=p;const[S,v]=D(f[c]);return r[c]=v,t(S,c)}}}function P(e,t){return g(()=>e(t||{}))}const fe=e=>`Stale read from <${e}>.`;function ae(e){const t="fallback"in e&&{fallback:()=>e.fallback};return I(ue(()=>e.each,e.children,t||void 0))}function he(e){const t=e.keyed,n=I(()=>e.when,void 0,{equals:(i,s)=>t?i===s:!i==!s});return I(()=>{const i=n();if(i){const s=e.children;return typeof s=="function"&&s.length>0?g(()=>s(t?i:()=>{if(!g(n))throw fe("Show");return e.when})):s}return e.fallback},void 0,void 0)}function de(e,t,n){let i=n.length,s=t.length,l=i,r=0,o=0,c=t[s-1].nextSibling,f=null;for(;r<s||o<l;){if(t[r]===n[o]){r++,o++;continue}for(;t[s-1]===n[l-1];)s--,l--;if(s===r){const d=l<i?o?n[o-1].nextSibling:n[l-o]:c;for(;o<l;)e.insertBefore(n[o++],d)}else if(l===o)for(;r<s;)(!f||!f.has(t[r]))&&t[r].remove(),r++;else if(t[r]===n[l-1]&&n[o]===t[s-1]){const d=t[--s].nextSibling;e.insertBefore(n[o++],t[r++].nextSibling),e.insertBefore(n[--l],d),t[s]=n[l]}else{if(!f){f=new Map;let p=o;for(;p<l;)f.set(n[p],p++)}const d=f.get(t[r]);if(d!=null)if(o<d&&d<l){let p=r,S=1,v;for(;++p<s&&p<l&&!((v=f.get(t[p]))==null||v!==d+S);)S++;if(S>d-o){const ne=t[r];for(;o<d;)e.insertBefore(n[o++],ne)}else e.replaceChild(n[o++],t[r++])}else r++;else t[r++].remove()}}}const K="_$DX_DELEGATE";function pe(e,t,n,i={}){let s;return B(l=>{s=l,t===document?e():ee(t,e(),t.firstChild?null:void 0,n)},i.owner),()=>{s(),t.textContent=""}}function R(e,t,n){let i;const s=()=>{const r=document.createElement("template");return r.innerHTML=e,n?r.content.firstChild.firstChild:r.content.firstChild},l=t?()=>(i||(i=s())).cloneNode(!0):()=>g(()=>document.importNode(i||(i=s()),!0));return l.cloneNode=l,l}function ge(e,t=window.document){const n=t[K]||(t[K]=new Set);for(let i=0,s=e.length;i<s;i++){const l=e[i];n.has(l)||(n.add(l),t.addEventListener(l,me))}}function k(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function we(e,t){t==null?e.removeAttribute("class"):e.className=t}function ye(e,t,n){return g(()=>e(t,n))}function ee(e,t,n,i){if(n!==void 0&&!i&&(i=[]),typeof t!="function")return N(e,t,i,n);$(s=>N(e,t(),s,n),i)}function me(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}});n;){const i=n[t];if(i&&!n.disabled){const s=n[`${t}Data`];if(s!==void 0?i.call(n,s,e):i.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function N(e,t,n,i,s){for(;typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,r=i!==void 0;if(e=r&&n[0]&&n[0].parentNode||e,l==="string"||l==="number")if(l==="number"&&(t=t.toString()),r){let o=n[0];o&&o.nodeType===3?o.data=t:o=document.createTextNode(t),n=m(e,n,i,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t;else if(t==null||l==="boolean")n=m(e,n,i);else{if(l==="function")return $(()=>{let o=t();for(;typeof o=="function";)o=o();n=N(e,o,n,i)}),()=>n;if(Array.isArray(t)){const o=[],c=n&&Array.isArray(n);if(F(o,t,n,s))return $(()=>n=N(e,o,n,i,!0)),()=>n;if(o.length===0){if(n=m(e,n,i),r)return n}else c?n.length===0?H(e,o,i):de(e,n,o):(n&&m(e),H(e,o));n=o}else if(t instanceof Node){if(Array.isArray(n)){if(r)return n=m(e,n,i,t);m(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}else console.warn("Unrecognized value. Skipped inserting",t)}return n}function F(e,t,n,i){let s=!1;for(let l=0,r=t.length;l<r;l++){let o=t[l],c=n&&n[l];if(o instanceof Node)e.push(o);else if(!(o==null||o===!0||o===!1))if(Array.isArray(o))s=F(e,o,c)||s;else if(typeof o=="function")if(i){for(;typeof o=="function";)o=o();s=F(e,Array.isArray(o)?o:[o],Array.isArray(c)?c:[c])||s}else e.push(o),s=!0;else{const f=String(o);c&&c.nodeType===3?(c.data=f,e.push(c)):e.push(document.createTextNode(f))}}return s}function H(e,t,n=null){for(let i=0,s=t.length;i<s;i++)e.insertBefore(t[i],n)}function m(e,t,n,i){if(n===void 0)return e.textContent="";const s=i||document.createTextNode("");if(t.length){let l=!1;for(let r=t.length-1;r>=0;r--){const o=t[r];if(s!==o){const c=o.parentNode===e;!l&&!r?c?e.replaceChild(s,o):e.insertBefore(s,n):c&&o.remove()}else l=!0}}else e.insertBefore(s,n);return[s]}class Se{#e;#t=null;constructor(t){this.#e=t*1e3}start(t){this.stop(),this.#t=setTimeout(t,this.#e)}stop(){this.#t&&(clearTimeout(this.#t),this.#t=null)}}const U=["pickup","hangup"],M=["agh","no","yes","hohoho"],be=[...U,...M],[b,te]=D(!1),[Ae,ve]=D(U.at(0));class Ee{#e=new Map;#t=new Se(5);playScene(t){const n=this.#e.get(t);if(!n)throw new Error(`Scene ${t} not found`);this.#e.forEach(i=>{i.pause(),i.currentTime=0}),n.play(),ve(t)}registerScene(t,n){n.addEventListener("ended",()=>{b()&&this.#t.start(()=>{this.playScene(U.at(1)),te(!1)})}),n.addEventListener("play",()=>{this.#t.stop()}),this.#e.set(t,n)}}function Ce(e=0,t=Number.MAX_SAFE_INTEGER-1){return Math.floor(Math.random()*(t-e+1))+e}class $e{#e;#t;constructor(t){this.#t=t;try{const n=window.SpeechRecognition||window.webkitSpeechRecognition;this.#e=new n,this.#e.interimResults=!0,this.#e.addEventListener("result",i=>this.onResult(i)),this.#e.addEventListener("end",()=>this.onEnd())}catch{alert("SpeechRecognition is not supported in your browser")}}toggleRecognition(){b()?this.#e.start():this.#e.stop()}onResult(t){const n=t.results[0].isFinal,i=Array.from(t.results).map(s=>s[0]).map(s=>s.transcript).join("");if(!n)console.clear(),console.log(i);else{const s=M[Ce(0,M.length)];this.#t.playScene(s)}}onEnd(){b()&&this.#e.start()}}const xe=R('<img src="hangup.png">'),Ne=R('<div class="phone">'),Te=R("<video><source>"),_e=R('<img src="pickup.png">'),q=new Ee,Le=new $e(q),Re=()=>{const e=()=>{const t=!b();te(t),q.playScene(t?"pickup":"hangup"),Le.toggleRecognition()};return[P(ae,{each:be,children:t=>(()=>{const n=Te(),i=n.firstChild;return ye(s=>q.registerScene(t(),s),n),$(s=>{const l=t()!==Ae()?"hidden":"visible",r=t()+".mp4";return l!==s._v$&&we(n,s._v$=l),r!==s._v$2&&k(i,"src",s._v$2=r),s},{_v$:void 0,_v$2:void 0}),n})()}),(()=>{const t=Ne();return ee(t,P(he,{get when(){return b()},get fallback(){return(()=>{const n=_e();return n.$$click=()=>e(),k(n,"draggable",!1),n})()},get children(){const n=xe();return n.$$click=()=>e(),k(n,"draggable",!1),n}})),t})()]};ge(["click"]);const Oe=document.getElementById("root");pe(()=>P(Re,{}),Oe);