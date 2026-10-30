/* EFCquiz v2.3.1 · funciona sem internet. Troque VERSAO a cada versão nova para atualizar o cache. */
const VERSAO = "efcquiz-v2.3.1";
const ARQUIVOS = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png", "./abertura.jpg", "./ios/abertura-1170x2532.jpg", "./ios/abertura-1179x2556.jpg", "./ios/abertura-1284x2778.jpg", "./ios/abertura-1290x2796.jpg", "./ios/abertura-828x1792.jpg", "./ios/abertura-1242x2688.jpg", "./ios/abertura-640x1136.jpg", "./ios/abertura-1242x2208.jpg", "./ios/abertura-750x1334.jpg", "./ios/abertura-1125x2436.jpg", "./ios/abertura-1206x2622.jpg", "./ios/abertura-1320x2868.jpg"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("efcquiz-") && k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  /* página: tenta a rede primeiro (pega versão nova) e cai no cache sem internet; o resto: cache primeiro */
  if (e.request.mode === "navigate"){
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(VERSAO).then(x => x.put("./index.html", c)); return r; }).catch(() => caches.match("./index.html")));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
