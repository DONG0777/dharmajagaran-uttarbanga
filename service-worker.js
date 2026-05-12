const CACHE_NAME = "djuttarbanga-cache-v2";

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
  "/dharmajagaran-uttarbanga/manifest.json",
  "/dharmajagaran-uttarbanga/assets/style.css",
  "/dharmajagaran-uttarbanga/assets/app.js",
  "/dharmajagaran-uttarbanga/assets/upi-qr.png",
  "/dharmajagaran-uttarbanga/assets/icons/icon-192.png",
  "/dharmajagaran-uttarbanga/assets/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).then((response) => {
      return response;
    }).catch(() => {
      return caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || caches.match("/dharmajagaran-uttarbanga/offline.html");
      });
    })
  );
});
