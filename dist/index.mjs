var E=Object.defineProperty;var b=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(n,o)=>(typeof require<"u"?require:n)[o]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')});var v=(e,n)=>{for(var o in n)E(e,o,{get:n[o],enumerable:!0})};import re from"cac";import{resolve as u}from"path";import{writeFileSync as x,existsSync as k,mkdirSync as te}from"fs";import{resolve as D,extname as R}from"path";import{readdirSync as H,statSync as K,readFileSync as C,writeFileSync as V}from"fs";import z from"magic-string";var O=0;function A(){return++O,`${global.i18n.config.prefix}${O}`}var d={},w=e=>{let n=H(e);n=n.filter(o=>!global.i18n.config.ignoreDirs.includes(o)),n.forEach(o=>{let t=D(e,o);if(K(t).isDirectory())w(D(e,o));else{let f=C(t,"utf-8");if(global.i18n.config.ignoreExts.includes(R(t||"")))return;let r=new z(f);r.replace(global.i18n.config.reg,(...l)=>{let i=A();return d=global.i18n.config.handlerResult(d,i,l),global.i18n.back?global.i18n.config.backHandler(d,i,l):global.i18n.config.handlerTemlpate(d,i,l)}),V(t,r.toString())}})};function T(e){return w(e),d}import I from"md5";import M from"axios";var N=e=>(e=e.reduce((n,o)=>{if(n.length>0){let t=n.pop();return t.length<20?[...n,[...t,o]]:[...n,t,[o]]}return[...n,[o]]},[]),e),_=async(e,n,o)=>{try{let t=Object.values(e),g=Object.keys(e),f=N(t),r=N(g),l=f.map(c=>c.join(`
`)),i=[];for(let c=0;c<l.length;c++){let a=l[c],s=new Date().getTime(),p=global.i18n.config.appid+a+s+global.i18n.config.key,F=I(p),m=(await M.get("http://api.fanyi.baidu.com/api/trans/vip/translate",{params:{q:a,appid:global.i18n.config.appid,salt:s,from:n,to:o,sign:F}})).data;if(m&&m.error_code)throw console.log("\u7FFB\u8BD1\u5931\u8D25\uFF1A",m),new Error(m.error_code);i=[...i,...m.trans_result.map((j,$)=>{if(!r[c]||!r[c][$])throw new Error(JSON.stringify(j));return{key:r[c][$],item:j}})]}return i.reduce((c,a)=>({...c,[a.key]:a.item.dst}),{})}catch(t){console.log(t)}};var y={};v(y,{appid:()=>L,backHandler:()=>oe,from:()=>Q,getCacheFromJson:()=>q,handlerResult:()=>ee,handlerTemlpate:()=>ne,ignoreDirs:()=>W,ignoreExts:()=>X,key:()=>P,prefix:()=>Z,reg:()=>Y,to:()=>U});var B=b("fs"),G=b("path"),L="",P="",Q="cht",U=["en","zh"],W=[".hbuilderx","node_modules","uni_modules","unpackage",".git","dist","static"],X=[".woff2",".jpg",".png",".pdf",".keystore"],Y=new RegExp(/\$t\(('|"|`)(.*?)('|"|`)\)/g),Z="i18n_",ee=(e,n,[o,t,g,f])=>(e[n]=g,e),ne=(e,n,[o,t,g,f])=>`$t(${t}${n}${f})`,h,q=()=>{if(h)return h;let e=B.readFileSync(G.resolve(global.i18n.cacheDir,`./${global.i18n.cacheDir}.json`),"utf-8");return h=JSON.parse(e),h},oe=(e,n,[o,t,g,f])=>{let r=q();return`$t(${t}${r[n]?r[n]:""}${f})`};global.i18n={};global.i18n.config=y;async function J(){let e=process.cwd();if(global.i18n.cacheDir=u(e,".i18n"),k(u(global.i18n.cacheDir,"config.js"))){let r=b(u(global.i18n.cacheDir,"config.js"));global.i18n.config=r}k(global.i18n.cacheDir)||te(global.i18n.cacheDir);let n=T(e);if(global.i18n.back)return;x(u(global.i18n.cacheDir,`${global.i18n.config.from}.json`),JSON.stringify(n,null,2));let o={},t={};k(u(global.i18n.cacheDir,"cache.json"))&&(t=b(u(global.i18n.cacheDir,"cache.json"))),o[global.i18n.config.from]=n;for(let r of global.i18n.config.to){let l=[],i=JSON.parse(JSON.stringify(n));if(t){let a=Object.keys(t);i=Object.keys(i).reduce((s,p)=>!a.includes(i[p])||!t[i[p]][r]?{...s,[p]:i[p]}:(l[p]=t[i[p]][r],s),{})}console.log(i,"\u7FFB\u8BD1\u6570\u636E",r);let c=await _(i,global.i18n.config.from,r);l={...l,...c},l=Object.keys(l).sort((a,s)=>Number(a.replace(global.i18n.config.prefix,""))-Number(s.replace(global.i18n.config.prefix,""))).reduce((a,s)=>({...a,[s]:l[s]}),{}),x(u(global.i18n.cacheDir,`${r}.json`),JSON.stringify(l,null,2)),o[r]=c}let g=Object.keys(o),f=Object.keys(o[global.i18n.config.from]).reduce((r,l)=>{let i=o[global.i18n.config.from][l],c=g.reduce((a,s)=>o[s][l]?{...a,[s]:o[s][l]}:a,{});return r[i]?r[i]={...r[i],...c}:r[i]=c,r},t);x(u(global.i18n.cacheDir,"cache.json"),JSON.stringify(f,null,2))}var S=re();S.command("i18n","\u63D0\u53D6\u5F53\u524D\u9879\u76EE\u4E0B\u591A\u8BED\u8A00\u7684\u6587\u672C\uFF0C \u8FDB\u884C\u5904\u7406\u5E76\u7FFB\u8BD1").option("back","\u56DE\u9000\u4EE3\u7801").action(async({back:e})=>{global.i18n.back=e,J()});S.help();S.parse();
//# sourceMappingURL=index.mjs.map