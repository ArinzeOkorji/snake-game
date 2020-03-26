const cacheVersion = 'snakeCache4';
const filesToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/index.js'
];

self.addEventListener('install', (e) => {
    console.log('install')
    e.waitUntil(
        caches.open(cacheVersion)
        .then((cache) => {
            cache.addAll(filesToCache);
        })
        .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (e) => {
    console.log('activate')
        /* e.waitUntil(
            
            })
        ).then(() => self.skipWaiting()) */
    caches.keys()
        .then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== cacheVersion) {
                        // console.log(caches.delete(key).then(res => console.log(key)));
                        return caches.delete(key);
                    }
                })
            )
        })
})


self.addEventListener('fetch', (e) => {
    console.log('fetch')
    e.respondWith(
        fetch(e.request)
        .catch(() => {
            return caches.match(e.request);
        })
        .then((response) => {
            return response
        })
    )

    /*  e.respondWith(
             caches.match(e.request)
             .then(res => {
                 if (!res) {
                     fetch(e.request)
                         .then(res => {
                             caches.open(cacheVersion)
                                 .then(cache => {
                                     cache.add(e.request)
                                 })
                                 //caches.put(e.request, res.clone())
                             return res;
                         })
                 } else {
                     return res;
                 }
             })

         ) */
    /* e.respondWith(
        caches.open(cacheVersion)
        .then(cache => {
            return fetch(e.request)
                .then(res => {
                    cache.put(e.request, res.clone());
                    return res
                })
        })
    ) */

})


//Check if homeScreen is added
/* window.addEventListener('beforeInstallPrompt', (event) => {
        event.preventDefault();
        event.prompt();
        event.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        })
    }) */
// if homesreenis not added, request to add to homescreen