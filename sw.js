const staticCacheName = 'restaurant-cache';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
        return cache.addAll([
            'index.html',
            'restaurant.html',
            '/css/main.css',
            '/css/responsive.css',
            '/js/dbhelper.js',
            '/js/main.js',
            '/js/restaurant_info.js',
            '/img/*',
            '/js/register.js'
        ]).catch(error => {
                
        });
    }));
});  

self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            return cacheName.startsWith('Udacity-FEND-') &&
                   cacheName != staticCacheName;
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });

self.addEventListener('fetch', event => {
    event.respondWith(    
      caches.match(event.request).then( response => {
        if (response !== undefined) {
            return response;
        } else {        
            return fetch(event.request).then( response => { 
                let responseClone = response.clone();  
                caches.open(staticCacheName).then( cache => {
                    cache.put(event.request, responseClone);
                });
                return response;
            });
          }
      })  
    ); 
});