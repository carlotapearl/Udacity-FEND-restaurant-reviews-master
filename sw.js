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