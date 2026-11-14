// Yours Quran Reader service worker. The Quran text, translations, word data and font are cached
// on the first visit so reading works offline. Recitation audio is streamed and needs a connection.
const V="yqr-6b705760e4";
const CORE=["/","/manifest.webmanifest","/icons/icon-192.png","/icons/icon-512.png","/fonts/indopak.woff2?v=6b705760e4","/data/meta.json?v=6b705760e4","/data/ip.json?v=6b705760e4","/data/en.json?v=6b705760e4","/data/tr.json?v=6b705760e4","/data/ur.json?v=6b705760e4","/data/wbw.json?v=6b705760e4"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!=="yqr-runtime").map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
  if(u.origin===location.origin){
    if(u.pathname.startsWith("/api/"))return;
    if(r.mode==="navigate"){ // network first, so updates arrive; cached copy when offline
      e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put("/",c));return res;}).catch(()=>caches.match("/")));return;}
    e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(V).then(x=>x.put(r,c));}return res;})));return;
  }
  if(/^(fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com)$/.test(u.hostname)){
    e.respondWith(caches.open("yqr-runtime").then(c=>c.match(r).then(hit=>{const net=fetch(r).then(res=>{if(res.ok||res.type==="opaque")c.put(r,res.clone());return res;}).catch(()=>hit);return hit||net;})));
  }
});
