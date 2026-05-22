const CACHE_NAME = "dance-growth-local-shell-v1";
const APP_SHELL = [
  "/",
  "/offline",
  "/manifest.json",
  "/icons/app-icon.svg",
  "/icons/maskable-icon.svg",
  "/images/hero-local-learning.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const cachedCopy = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, cachedCopy);
        });

        return response;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(event.request);

        return cachedResponse || caches.match("/offline");
      }),
  );
});

