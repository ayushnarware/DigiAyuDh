import{a as s,j as c}from"./query-x5SyejHI.js";import{B as g}from"./button-TnuuhuaF.js";import{a as f}from"./index-A4bwQ62-.js";/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),C=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,o,r)=>r?r.toUpperCase():o.toLowerCase()),m=t=>{const e=C(t);return e.charAt(0).toUpperCase()+e.slice(1)},l=(...t)=>t.filter((e,o,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===o).join(" ").trim(),w=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var x={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=s.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:o=2,absoluteStrokeWidth:r,className:n="",children:a,iconNode:p,...i},d)=>s.createElement("svg",{ref:d,...x,width:e,height:e,stroke:t,strokeWidth:r?Number(o)*24/Number(e):o,className:l("lucide",n),...!a&&!w(i)&&{"aria-hidden":"true"},...i},[...p.map(([u,k])=>s.createElement(u,k)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=(t,e)=>{const o=s.forwardRef(({className:r,...n},a)=>s.createElement(j,{ref:a,iconNode:e,className:l(`lucide-${y(m(t))}`,`lucide-${t}`,r),...n}));return o.displayName=m(t),o};/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],b=h("moon",v);/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],T=h("sun",A);function N(){const{resolvedTheme:t,setTheme:e}=f();return c.jsx(g,{variant:"ghost",size:"icon","aria-label":"Toggle theme",onClick:()=>e(t==="dark"?"light":"dark"),children:t==="dark"?c.jsx(T,{className:"size-4"}):c.jsx(b,{className:"size-4"})})}export{N as T,h as c};
