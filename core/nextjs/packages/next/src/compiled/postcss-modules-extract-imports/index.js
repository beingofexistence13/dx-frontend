(()=>{var r={591:(r,e,t)=>{const o=t(697);const n=/^(.+?)\s+from\s+(?:"([^"]+)"|'([^']+)'|(global))$/;const s=/^:import\((?:"([^"]+)"|'([^']+)')\)/;const c=1;function addImportToGraph(r,e,t,o){const n=e+"_"+"siblings";const s=e+"_"+r;if(o[s]!==c){if(!Array.isArray(o[n])){o[n]=[]}const e=o[n];if(Array.isArray(t[r])){t[r]=t[r].concat(e)}else{t[r]=e.slice()}o[s]=c;e.push(r)}}r.exports=(r={})=>{let e=0;const t=typeof r.createImportedName!=="function"?r=>`i__imported_${r.replace(/\W/g,"_")}_${e++}`:r.createImportedName;const c=r.failOnWrongOrder;return{postcssPlugin:"postcss-modules-extract-imports",prepare(){const r={};const e={};const a={};const i={};const p={};return{Once(l,f){l.walkRules((t=>{const o=s.exec(t.selector);if(o){const[,n,s]=o;const c=n||s;addImportToGraph(c,"root",r,e);a[c]=t}}));l.walkDecls(/^composes$/,(o=>{const s=o.value.match(n);if(!s){return}let c;let[,a,l,f,u]=s;if(u){c=a.split(/\s+/).map((r=>`global(${r})`))}else{const n=l||f;let s=o.parent;let u="";while(s.type!=="root"){u=s.parent.index(s)+"_"+u;s=s.parent}const{selector:d}=o.parent;const _=`_${u}${d}`;addImportToGraph(n,_,r,e);i[n]=o;p[n]=p[n]||{};c=a.split(/\s+/).map((r=>{if(!p[n][r]){p[n][r]=t(r,n)}return p[n][r]}))}o.value=c.join(" ")}));const u=o(r,c);if(u instanceof Error){const r=u.nodes.find((r=>i.hasOwnProperty(r)));const e=i[r];throw e.error("Failed to resolve order of composed modules "+u.nodes.map((r=>"`"+r+"`")).join(", ")+".",{plugin:"postcss-modules-extract-imports",word:"composes"})}let d;u.forEach((r=>{const e=p[r];let t=a[r];if(!t&&e){t=f.rule({selector:`:import("${r}")`,raws:{after:"\n"}});if(d){l.insertAfter(d,t)}else{l.prepend(t)}}d=t;if(!e){return}Object.keys(e).forEach((r=>{t.append(f.decl({value:r,prop:e[r],raws:{before:"\n  "}}))}))}))}}}}};r.exports.postcss=true},697:r=>{const e=2;const t=1;function createError(r,e){const t=new Error("Nondeterministic import's order");const o=e[r];const n=o.find((t=>e[t].indexOf(r)>-1));t.nodes=[r,n];return t}function walkGraph(r,o,n,s,c){if(n[r]===e){return}if(n[r]===t){if(c){return createError(r,o)}return}n[r]=t;const a=o[r];const i=a.length;for(let r=0;r<i;++r){const e=walkGraph(a[r],o,n,s,c);if(e instanceof Error){return e}}n[r]=e;s.push(r)}function topologicalSort(r,e){const t=[];const o={};const n=Object.keys(r);const s=n.length;for(let c=0;c<s;++c){const s=walkGraph(n[c],r,o,t,e);if(s instanceof Error){return s}}return t}r.exports=topologicalSort}};var e={};function __nccwpck_require__(t){var o=e[t];if(o!==undefined){return o.exports}var n=e[t]={exports:{}};var s=true;try{r[t](n,n.exports,__nccwpck_require__);s=false}finally{if(s)delete e[t]}return n.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var t=__nccwpck_require__(591);module.exports=t})();