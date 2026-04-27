self.addEventListener("install", function(e) {
    console.log("Service Worker Installed");

    e.waitUntil(
        caches.open("todo-cache").then(function(cache) {
            return cache.addAll([
                "/todo-app/",
                "/todo-app/index.html",
                "/todo-app/style.css",
                "/todo-app/script.js"
            ]);
        })
    );
});
