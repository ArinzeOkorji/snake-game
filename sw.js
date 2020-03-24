const version = 1;
const filesToCache = [
    '/',
    'index.html',
    'index.css',
    'index.js'
];


self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('FilesToCache')
        .then(cache => {
            cache.addAll(filesToCache)
        })
        .then(() => self.skipWaiting())
    )

});

self.addEventListener('activate', (e) => {
    caches.keys()
        .then((res) => {
            return Promise.all(
                res.map((version) => {
                    if (version !== cacheVersion) {
                        return caches.delete(version);
                    }
                })
            )
        })
})

self.addEventListener('fetch', (e) => {
    console.log(e)
    e.respondWith(
        fetch(e.request)
        .catch(() => {
            console.log(e.request)
            console.log(caches.match(e.request))
            return caches.match(e.request);
        })
        .then((response) => {
            console.log(response);
            return response
        })
    )

})