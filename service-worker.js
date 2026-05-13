const CACHE_NAME = "dharmajagaran-v1";

const FILES_TO_CACHE = [
  "/dharmajagaran-uttarbanga/",
  "/dharmajagaran-uttarbanga/index.html",
  "/dharmajagaran-uttarbanga/about.html",
  "/dharmajagaran-uttarbanga/issues.html",
  "/dharmajagaran-uttarbanga/donation.html",
  "/dharmajagaran-uttarbanga/contact.html",

  "/dharmajagaran-uttarbanga/manifest.json",

  "/dharmajagaran-uttarbanga/assets/style.css",
  "/dharmajagaran-uttarbanga/assets/upi-qr.webp",

  "/dharmajagaran-uttarbanga/assets/icon-192.png",
  "/dharmajagaran-uttarbanga/assets/icon-512.png"
];

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event (Cache First Strategy)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }).catch(() => {
          // fallback: return homepage if offline
          return caches.match("/dharmajagaran-uttarbanga/index.html");
        })
      );
    })
  );
});