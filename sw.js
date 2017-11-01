var sb_strCacheName = 'cache-v2';
var sb_objUrlsToCache = [
  '/soundboard.html',
  '/noscript.html',
  '/config1.json',
  '/config2.json',
  '/css/alt.css', '/css/common.css', '/css/default.css',
  '/images/applause.png', '/images/charge.jpg', '/images/crash.jpg', '/images/cricket.jpg', '/images/crybaby.jpg', '/images/drumroll.png', '/images/frog.jpg', '/images/headshake.jpg', '/images/jiayou.jpg', '/images/rimshot.jpg', '/images/trombone.jpg', '/images/waow.png', '/images/Aatrox_OriginalLoading.jpg', '/images/Annie_OriginalLoading.jpg', '/images/Dr._Mundo_OriginalLoading.jpg', '/images/Jhin_OriginalLoading.jpg', '/images/Kog\'Maw_OriginalLoading.jpg', '/images/Leona_OriginalLoading.jpg', '/images/Master_Yi_OriginalLoading.jpg', '/images/Riven_OriginalLoading.jpg', '/images/Soraka_OriginalLoading.jpg', '/images/Warwick_OriginalLoading.jpg', '/images/Zac_OriginalLoading.jpg', '/images/Zed_OriginalLoading.jpg',
  '/sounds/Applause.mp3', '/sounds/Charge.mp3', '/sounds/Crash.mp3', '/sounds/Cricket.mp3', '/sounds/Cry Baby.mp3', '/sounds/Drumroll.mp3', '/sounds/Frog.mp3', '/sounds/Head Shake.mp3', '/sounds/Jiayou.mp3', '/sounds/Rimshot.mp3', '/sounds/Sad Trombone.mp3', '/sounds/Waow.mp3', '/sounds/Aatrox.mp3', '/sounds/Annie.mp3', '/sounds/Dr. Mundo.mp3', '/sounds/Jhin.mp3', '/sounds/Kog\'Maw.mp3', '/sounds/Leona.mp3', '/sounds/Master Yi.mp3', '/sounds/Riven.mp3', '/sounds/Soraka.mp3', '/sounds/Warwick.mp3', '/sounds/Zac.mp3', '/sounds/Zed.mp3'
];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(sb_strCacheName)
      .then(function(cache) {
        return cache.addAll(sb_objUrlsToCache);
      })
      .catch(function(err) {
        console.log(err);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if(response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  var sb_objCacheWhiteList = [sb_strCacheName];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if(sb_objCacheWhiteList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
