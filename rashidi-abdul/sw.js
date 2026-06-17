const CACHE_NAME = 'rashidi-abdul-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/styles/reset.css',
  '/scripts/main.js',
  '/images/favicon.svg',
  '/images/icon-192.svg',
  '/images/icon-512.svg',
  '/images/posters/vicious.jpg',
  '/images/posters/kraken.jpg',
  '/images/posters/barurot2.jpg',
  '/images/posters/krista.jpg',
  '/images/posters/checkin.jpg',
  '/images/posters/roomservice.jpg',
  '/images/posters/blades.jpg',
  '/images/posters/officeromance.jpg',
  '/images/posters/animalfarm.jpg',
  '/images/posters/swapped.jpg',
  '/images/posters/citadel-s1.jpg',
  '/images/posters/citadel-s2.jpg',
  '/images/posters/kissgoblin.jpg',
  '/images/posters/from-s4.jpg',
  '/images/posters/spider-noir.jpg',
  '/images/music-covers/midnight-vibes.jpg',
  '/images/music-covers/afrobeats.jpg',
  '/images/music-covers/heartstrings.jpg',
  '/images/music-covers/urbanflow.jpg',
  '/images/music-covers/classical-dreams.jpg',
  '/images/music-covers/rock-anthems.jpg',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
