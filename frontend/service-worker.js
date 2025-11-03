const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/index-UmUnppXS.css',
  '/assets/index-Dko38AWr.js',
  '/bilder/icon-small.png',
  '/bilder/icon-big.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(urlsToCache);
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const response = await caches.match(event.request);
    return response || fetch(event.request);
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => {
        if (cacheName !== CACHE_NAME) {
          return caches.delete(cacheName);
        }
      })
    );
  })());
});
