const CACHE_NAME = 'outilsprofs-v7.1';
const ASSETS = [
  './',
  './index.html',
  './outilsprofs_icone.png'
  // Ajoutez ici vos autres fichiers .html si vous voulez qu'ils soient dispos hors-ligne
];

// Installation : mise en cache des ressources
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force le nouveau SW à prendre le contrôle immédiatement
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activation : NETTOYAGE des anciens caches (v6, v7...)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Suppression de l\'ancien cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Force l'activation immédiate sur tous les onglets ouverts
});

// Récupération : Stratégie "Cache First" pour la rapidité
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});