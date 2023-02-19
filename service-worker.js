const staticAssets = [
  "/",
  "/index.html",
  "/css/fonts.min.css",
  "/css/styles.min.css",
  "/manifest.json",
  "/service-worker.js",
  "/assets/particles.json",
  "/js/bootstrap.bundle.min.js",
  "/js/jquery-3.5.1.min.js",
  "/js/jquery.easing.min.js",
  "/js/particles.min.js",
  "/js/scrollspy.min.js",
  "/js/dark-light-theme.min.js",
  "/js/typed.init.js",
  "/js/typed.min.js",
  "/js/vanilla-tilt.min.js",
  "/js/app.min.js",
  "/images/Profile-pic.webp",
  "/favicon.ico",
  "/images/about-bg.svg",
  "/images/about-bg-sm.svg",
  "/images/bgimg.webp",
  "/images/girlscript.webp",
  "/images/Data-Analysis-DAtaset-on-Terrorisn.webp",
  "/images/Desktop_Voice_Assistant.webp",
  "/images/DoctorsHood.webp",
  "/images/Health-Shire.webp",
  "/images/Image-to-sketch-image.webp",
  "/images/Octocat-Sling-Shot.webp",
  "/images/footer-cloud.svg",
  "/images/gist.webp",
  "/images/HackerRank.webp",
  "/images/hacktoberfest2021.webp",
  "/404.html",
  "/css/404.min.css",
  "/js/404.min.js",
  "/images/404.webp",
  "/js/wow.min.js",
  "/js/live2d.min.js",
  "/css/animate.min.css",
];
let cacheName = "cache-0";
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(staticAssets);
    })
  );
});
self.addEventListener("fetch", function (event) {
  if (event && event.request && caches) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response !== undefined) {
          return response;
        } else {
          let requestClone = event.request.clone();
          return fetch(requestClone)
            .then(function (response) {
              if (response.ok) {
                let responseClone = response.clone();
                caches.open(cacheName).then(function (cache) {
                  if (
                    event.request &&
                    requestClone &&
                    requestClone.status &&
                    requestClone.status !== 206
                  ) {
                    cache.put(event.request, responseClone).then((_) => {});
                  }
                });
              }
              return response;
            })
            .catch(function () {
              return caches.match("/");
            });
        }
      })
    );
  }
});
self.addEventListener("message", function (event) {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting().then((_) => {});
  }
});
