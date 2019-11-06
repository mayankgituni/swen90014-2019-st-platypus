const CACHE_NAME = 'prdc'
// Version 0.6.5
self.addEventListener('install', e => {
    console.log('installing service worker!!')
  const timeStamp = Date.now();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll( [
        `/`,
        `/index.html`,
        `../src/assets/stimulus/I_0_sharp.png`,
        `../src/assets/stimulus/I_90_round.png`,
        `../src/assets/stimulus/I_90_sharp.png`,
        `../src/assets/stimulus/L_0_round.png`,
        `../src/assets/stimulus/L_0_sharp.png`,
        `../src/assets/stimulus/L_180_round.png`,
        `../src/assets/stimulus/L_180_sharp.png`,
        `../src/assets/stimulus/L_270_round.png`,
        `../src/assets/stimulus/L_270_sharp.png`,
        `../src/assets/stimulus/L_90_round.png`,
        `../src/assets/stimulus/L_90_sharp.png`,
        `../src/assets/stimulus/O_0_round.png`,
        `../src/assets/stimulus/O_0_sharp.png`,
        `../src/assets/stimulus/O_180_round.png`,
        `../src/assets/stimulus/O_180_sharp.png`,
        `../src/assets/stimulus/O_90_round.png`,
        `../src/assets/stimulus/O_90_sharp.png`,
        `../src/assets/stimulus/T_0_round.png`,
        `../src/assets/stimulus/T_0_sharp.png`,
        `../src/assets/stimulus/T_180_round.png`,
        `../src/assets/stimulus/T_180_sharp.png`,
        `../src/assets/stimulus/T_270_round.png`,
        `../src/assets/stimulus/T_270_sharp.png`,
        `../src/assets/stimulus/T_90_round.png`,
        `../src/assets/stimulus/T_90_sharp.png`,
        `../src/assets/stimulus/X_0_round.png`,
        `../src/assets/stimulus/X_0_sharp.png`,
        `../src/assets/media/unselected.png`,
        `../src/assets/media/selected.png`,
        `../src/assets/media/eg1.png`,
        `../src/assets/media/disctactors.png`,
        `../src/assets/media/end_gif.gif`,
        `../src/assets/media/p1_gif.gif`,
        `../src/assets/media/p1_rocket.png`,
        `../src/assets/media/p2_char.png`,
        `../src/assets/media/p3_rocket.png`,
        `../src/assets/media/shapes.png`,
        `../src/assets/media/targets.png`,
        `../src/index.js`,
        `/offline.js`,
        `../src/index.css`,
        `../src/App.js`,
        `../src/App.css`,
        `/favicon.ico`,
        '/manifest.json',
        `./robots.txt`,
        `../src/components/input.json`,
        `../src/components/LevelController.js`,
        `../src/components/Levels.js`,
        `../src/components/ShapeGrid.js`,
        `../src/components/ShapeSprite.js`,
        `../src/components/TutorialPage.js`,
        `../src/components/TutorialPage/First.js`,
        `../src/components/TutorialPage/Second.js`,
        `../src/components/TutorialPage/Third.js`,
        `../src/components/TutorialPage/ShapeSprite.js`
      ])
        .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
    console.log('activating service worker');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
    console.log(`fetching ${event.request.url}`)
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});