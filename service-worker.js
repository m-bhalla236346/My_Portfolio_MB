self.addEventListener('install', (event) => {
    // Perform install steps
    event.waitUntil(
        caches.open('my-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/js/scripts.js',
                '/firebaseConfig.js',
                // Add other static assets as needed
            ]).catch((error) => {
                console.error('Error caching resources during install:', error);
            });
        })
    );
});

self.addEventListener('activate', (event) => {
    // Perform any necessary cleanup on activation (like deleting old caches)
    const cacheWhitelist = ['my-cache'];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Only cache GET requests, not POST, PUT, or DELETE
    if (event.request.method === 'GET') {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                // Return cached response or fetch from network if not cached
                return cachedResponse || fetch(event.request).then((response) => {
                    // Cache the fetched response for future use, but do not cache POST requests
                    if (event.request.method !== 'POST') {
                        return caches.open('my-cache').then((cache) => {
                            cache.put(event.request, response.clone());
                            return response;
                        }).catch((error) => {
                            console.error('Error caching response:', error);
                            return response; // Return network response even if caching fails
                        });
                    } else {
                        return response; // For POST requests, just return the response
                    }
                });
            }).catch((error) => {
                console.error('Error fetching or caching request:', error);
                return fetch(event.request); // Fallback to network if both cache and fetch fail
            })
        );
    } else {
        // For POST requests (e.g., Firestore), do not cache
        event.respondWith(fetch(event.request));
    }
});
