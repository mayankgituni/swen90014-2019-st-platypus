var CACHE = 'cache-and-update';

self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromCache(evt.request));
  evt.waitUntil(update(evt.request));
});

async function precache() {
  const cache = await caches.open(CACHE);
  return cache.addAll([
    "./assets/stimulus/I_0_round.png",
    "./assets/stimulus/I_0_sharp.png",
    "./assets/stimulus/I_90_round.png",
    "./assets/stimulus/I_90_sharp.png",
    "./assets/stimulus/L_0_round.png",
    "./assets/stimulus/L_0_sharp.png",
    "./assets/stimulus/L_180_round.png",
    "./assets/stimulus/L_180_sharp.png",
    "./assets/stimulus/L_270_round.png",
    "./assets/stimulus/L_270_sharp.png",
    "./assets/stimulus/L_90_round.png",
    "./assets/stimulus/L_90_sharp.png",
    "./assets/stimulus/O_0_round.png",
    "./assets/stimulus/O_0_sharp.png",
    "./assets/stimulus/O_180_round.png",
    "./assets/stimulus/O_180_sharp.png",
    "./assets/stimulus/O_90_round.png",
    "./assets/stimulus/O_90_sharp.png",
    "./assets/stimulus/T_0_round.png",
    "./assets/stimulus/T_0_sharp.png",
    "./assets/stimulus/T_180_round.png",
    "./assets/stimulus/T_180_sharp.png",
    "./assets/stimulus/T_270_round.png",
    "./assets/stimulus/T_270_sharp.png",
    "./assets/stimulus/T_90_round.png",
    "./assets/stimulus/T_90_sharp.png",
    "./assets/stimulus/X_0_round.png",
    "./assets/stimulus/X_0_sharp.png",
    "./assets/media/unselected.png",
    "./assets/media/selected.png",
    "./assets/media/eg1.png",
    "./assets/media/disctactors.png",
    "./assets/media/end_gif.gif",
    "./assets/media/p1_gif.gif",
    "./assets/media/p1_rocket.png",
    "./assets/media/p2_char.png",
    "./assets/media/p3_rocket.png",
    "./assets/media/shapes.png",
    "./assets/media/targets.png",
    "./index.js",
    "./service-worker.js",
    "./index.css",
    "./App.js",
    "./App.css",
    "./public/favicon.ico",
    "./public/index.html",
    "./public/manifest.json",
    "./public/robots.txt",
    "./components/input.json",
    "./components/LevelController.js",
    "./components/Levels.js",
    "./components/ShapeGrid.js",
    "./components/ShapeSprite.js",
    "./components/TutorialPage.js",
    "./components/TutorialPage/First.js",
    "./components/TutorialPage/Second.js",
    "./components/TutorialPage/Third.js",
    "./components/TutorialPage/ShapeSprite.js"
  ]);
}

async function fromCache(request) {
  const cache = await caches.open(CACHE);
  const matching = await cache.match(request);
  return matching || Promise.reject('no-match');
}

function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}