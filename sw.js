"use strict";

/*
  Cache strategy:
  - The app DOCUMENT (index.html / navigations) is NETWORK-FIRST with cache
    fallback, so new deploys reach installed apps on the next launch while
    offline still works (network fails -> serve the cached copy).
  - Static assets (icons, manifest) are CACHE-FIRST; they change rarely and
    a CACHE_NAME bump refreshes them.
  - Bump CACHE_NAME on any deploy that changes a precached static asset.
    Deploys that only change index.html no longer require a bump.
*/

const CACHE_NAME = "descent-shell-2026-07-14-2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-512.png",
  "./icons/atom.svg",
  "./icons/book-open.svg",
  "./icons/gear.svg",
  "./icons/info.svg",
  "./icons/moon.svg",
  "./icons/resonance-wave.png",
  "./icons/sparkle.svg",
  "./icons/sun.svg"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) { return cache.addAll(APP_SHELL); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (key) {
          return key.startsWith("descent-shell-") && key !== CACHE_NAME;
        }).map(function (key) {
          return caches.delete(key);
        }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  const isDocument =
    event.request.mode === "navigate" ||
    requestUrl.pathname.endsWith("/") ||
    requestUrl.pathname.endsWith("/index.html");

  if (isDocument) {
    // Network-first: always try to serve the freshest app.
    event.respondWith(
      fetch(event.request).then(function (response) {
        if (response && response.status === 200 && response.type !== "opaque") {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, copy); });
        }
        return response;
      }).catch(function () {
        // Offline: fall back to the cached document.
        return caches.match(event.request).then(function (cached) {
          return cached || caches.match("./index.html");
        });
      })
    );
    return;
  }

  // Static assets: cache-first.
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;
      return fetch(event.request).then(function (response) {
        if (!response || response.status !== 200 || response.type === "opaque") return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, copy); });
        return response;
      });
    })
  );
});
