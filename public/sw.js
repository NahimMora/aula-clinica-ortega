// Aula Clínica como app instalable. Páginas: red primero (siempre la versión nueva) y, sin conexión, la guardada.
// Archivos con hash (JS, CSS, fuentes, imágenes): se guardan al usarlos. Videos y PDF no se guardan (pesan mucho).
const CACHE = 'aula-v1';
const BASE = '/aula-clinica-ortega/';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) =>
  e.waitUntil(
    caches
      .keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  ),
);
self.addEventListener('fetch', (e) => {
  const r = e.request;
  const url = new URL(r.url);
  if (r.method !== 'GET' || url.origin !== location.origin || r.headers.has('range') || /\.(mp4|vtt|pdf)$/.test(url.pathname)) return;
  e.respondWith(
    fetch(r)
      .then((res) => {
        if (res.ok) {
          const c = res.clone();
          caches.open(CACHE).then((k) => k.put(r, c));
        }
        return res;
      })
      .catch(() => caches.match(r).then((m) => m || caches.match(BASE))),
  );
});
