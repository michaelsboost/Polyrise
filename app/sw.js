// Import Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { NetworkFirst, StaleWhileRevalidate, CacheFirst } = workbox.strategies;
const { CacheableResponsePlugin } = workbox.cacheableResponse;
const { ExpirationPlugin } = workbox.expiration;
const { clientsClaim, skipWaiting } = workbox.core;

// Define cache name dynamically based on the project name
const cacheName = 'Polyrise-cache';

// Force update when a new service worker is available
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Immediately apply new service worker
});

// Clear old caches when activating a new service worker
self.addEventListener('activate', async (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== cacheName) // Keep only the latest cache
          .map(name => caches.delete(name)) // Delete old caches
      );
    })
  );
  clientsClaim(); // Take control of all open clients
});

// Use Network First for scripts, styles, and documents (ensures updates)
registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style' || request.destination === 'document',
  new NetworkFirst({
    cacheName: cacheName,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Cache images, fonts, audio, and video for performance
registerRoute(
  ({ request }) =>
    request.destination === 'image' || request.destination === 'font' ||
    request.destination === 'audio' || request.destination === 'video',
  new CacheFirst({
    cacheName: cacheName,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50, // Limit stored assets
        maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
      }),
    ],
  })
);

// Listen for messages to skip waiting and apply new updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
