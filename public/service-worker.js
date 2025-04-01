
// This is the service worker with the combined offline experience

const CACHE = "lovable-offline-page";

// A list of local resources we always want to be cached
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg'
];

// The install handler takes care of precaching the resources we always need
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler cleans up old caches
self.addEventListener('activate', event => {
  const currentCaches = [CACHE];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses from a cache.
// If no response is found, it fetches from the network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests like those for Google Analytics
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request).then(response => {
          // If we got a valid response, open the cache and clone the response
          if (response && response.status === 200 && response.type === 'basic') {
            const responseToCache = response.clone();
            caches.open(CACHE)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        }).catch(error => {
          // If the network is unavailable, return the offline page
          console.log('Fetch failed; returning offline page instead.', error);
          return caches.match('/');
        });
      })
    );
  }
});
