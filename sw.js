const CACHE_NAME = 'site-flamengo-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/assets/css/index.css',
  '/assets/css/global/variables.css',
  '/assets/css/global/reset.css',
  '/assets/css/global/base.css',
  '/assets/css/global/utilities.css',
  '/assets/js/index.js',
  '/assets/js/index.nomodule.js',
  '/assets/img/logo-menu.webp',
  '/assets/img/maracana-capa.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
    ))
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match('/index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return res;
      });
    })
  );
});
