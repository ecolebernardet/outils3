const CACHE_NAME = 'outilsprofs-v7';
const ASSETS = [
  '/',
  '/index.html',
  '/outilsprofs_icone.png'
];

// Installation du Service Worker et mise en cache minimale
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Récupération des ressources
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});