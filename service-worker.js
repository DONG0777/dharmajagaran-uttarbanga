const CACHE_NAME = "djuttarbanga-v1";

const urlsToCache = [
  "index.html",
  "about.html",
  "issues.html",
  "solutions.html",
  "quotes.html",
  "contact.html",
  "offline.html",
  "assets/style.css",
  "assets/app.js",
  "manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then((res) => {
      return res || caches.match("offline.html");
    }))
  );
});
