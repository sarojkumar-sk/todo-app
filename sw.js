self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open("todo-cache").then(function(cache) {
      return cache.addAll([
        "/todo-app/",
        "/todo-app/index.html",
        "/todo-app/style.css",
        "/todo-app/script.js",
        "/todo-app/icon.png"
      ]);
    })
  );
});

self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
