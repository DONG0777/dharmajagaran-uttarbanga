const CACHE_NAME = "djuttarbanga-cache-v1";

const urlsToCache = [
  "/dharmajagaran-uttarbanga/",
  "/dharmajagaran-uttarbanga/index.html",
  "/dharmajagaran-uttarbanga/about.html",
  "/dharmajagaran-uttarbanga/issues.html",
  "/dharmajagaran-uttarbanga/solutions.html",
  "/dharmajagaran-uttarbanga/quotes.html",
  "/dharmajagaran-uttarbanga/donation.html",
  "/dharmajagaran-uttarbanga/contact.html",
  "/dharmajagaran-uttarbanga/offline.html",

  "/dharmajagaran-uttarbanga/assets/style.css",
  "/dharmajagaran-uttarbanga/assets/app.js",

  "/dharmajagaran-uttarbanga/assets/icons/icon-192.png",
  "/dharmajagaran-uttarbanga/assets/icons/icon-512.png",

  "/dharmajagaran-uttarbanga/assets/upi-qr.png"
];

// INSTALL
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// ACTIVATE
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

// FETCH
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((res) => {
          return res || caches.match("/dharmajagaran-uttarbanga/offline.html");
        });
      })
  );
});