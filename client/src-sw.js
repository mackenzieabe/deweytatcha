const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
const { cache } = require('webpack');
// const FILES_TO_CACHE = [
//   '/',
//   '/index.html',
//   '/css/style.css',
//   '/index.js',
  //do I add in all my css from index.html? 
// ];
//const APP_PREFIX = "J.A.T.E";
// const VERSION = "version_01";
// const CACHE_NAME = "APP_PREFIX + VERSION" 

// self.addEventListener("install", function(e) {
//   e.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log("Your files were pre=cached successfully!" + CACHE_NAME);
//       return cache.addAll(FILES_TO_CACHE);
//     })
//   )
// })

// self.addEventListener("activate", function(e) {
//   e.waitUntil( 
//     caches.keys().then(function(keyList) {
//       const cacheKeeplist = keyList.filter(function(key) {
//         return key.indexOf(APP_PREFIX)
//       })
//       cacheKeeplist.push(CACHE_NAME);
//       return Promise.all(keylist.map(function(key, i) {
//         if (cacheKeeplist.indexOf(key) === -1)
//         return caches.delete(keyList[i]);
//       }))
//     })
//   )
// })

// self.addEventListener("fetch", function(e) {
//   e.respondWith(
//     caches.match(e.request).then(function(request) {
//       if(request) {
//         return request;
//       } else {
//         return fetch (e.request);
//       }
//       })
//     )
// })


precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching




registerRoute();
