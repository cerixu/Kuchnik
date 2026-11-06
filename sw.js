/* ==========================================================================
   ŻARŁOK / Kuchnik — service worker
   Strategia: Stale-While-Revalidate dla JS/CSS, Cache-First dla mediów,
   Network-First z limitem dla nawigacji i pozostałych żądań same-origin.
   Offline aplikacja otwiera się z pamięci podręcznej.
   Nowa wersja NIE przejmuje aplikacji po cichu: strona pokazuje „Odśwież”
   i dopiero wtedy wysyła SKIP_WAITING.

   ZMIANA WERSJI: podbij VERSION (i APP_VERSION w util.js) przy każdej
   aktualizacji plików, żeby urządzenia wykryły nową wersję.
   ========================================================================== */
const VERSION = 'kucharzyna-1.4.99';
const MEDIA_CACHE = 'kucharzyna-media-v1';
const NETWORK_TIMEOUT = 3500;

const CORE = [
  './',
  'index.html',
  'art-preview-1-4-52.html',
  'galeria-kredkowa.html', 'food-illustrations.js',
  'styles.css',
  'manifest.webmanifest',
  'assets/food-svg/carbonara.svg', 'assets/food-svg/margherita.svg', 'assets/food-svg/tomato-soup.svg',
  'assets/food-svg/burger.svg', 'assets/food-svg/greek-salad.svg', 'assets/food-svg/mojito.svg',
  'assets/food-svg/lasagna.svg', 'assets/food-svg/gnocchi.svg', 'assets/food-svg/bruschetta.svg', 'assets/food-svg/panna-cotta.svg', 'assets/food-svg/tagliatelle-ragu.svg',
  'assets/food-svg/ramen-tonkotsu.svg', 'assets/food-svg/sushi-maki.svg', 'assets/food-svg/croissant.svg',
  'assets/food-svg/pizza-diavola.svg',
  'assets/food-svg/risotto-milanese.svg',
  'assets/food-svg/pierogi.svg',
  'assets/food-svg/steak.svg',
  'assets/food-svg/salmon.svg',
  'assets/food-svg/focaccia.svg',
  'assets/food-svg/tiramisu.svg',
  'assets/food-svg/caesar-salad.svg',
  'assets/food-svg/pho-bo.svg',
  'assets/food-svg/bibimbap.svg',
  'assets/food-svg/chicken-curry.svg',
  'assets/food-svg/dumplings.svg',
  'assets/food-svg/tacos.svg',
  'assets/food-svg/pancakes.svg',
  'assets/food-svg/cheesecake.svg',
  'assets/food-svg/shakshuka.svg',
  'assets/food-svg/grilled-chicken.svg',
  'assets/food-svg/tuna-sashimi.svg',
  'assets/food-svg/fries.svg',
  'assets/food-svg/apple-pie.svg',
  'assets/food-svg/boeuf-bourguignon.svg',
  'assets/food-svg/paella-marisco.svg',
  'assets/food-svg/parmigiana-di-melanzane.svg',
  'assets/food-svg/french-onion-soup.svg',
  'assets/food-svg/coq-au-vin.svg',
  'assets/food-svg/tom-yum.svg',
  'assets/food-svg/ratatouille.svg',
  'assets/food-svg/creme-brulee.svg',
  'assets/food-svg/cacio-e-pepe.svg',
  'assets/food-svg/fish-and-chips.svg',
  'assets/food-svg/gulasz-wegierski.svg',
  'assets/food-svg/gambas-al-ajillo.svg',
  'assets/food-svg/gnocchi-burro-salvia.svg',
  'assets/food-svg/tarte-tatin.svg',
  'assets/food-svg/moussaka.svg',
  'assets/food-svg/ramen-shoyu.svg',
  'assets/food-svg/spaghetti-puttanesca.svg',
  'assets/food-svg/minestrone.svg',
  'assets/food-svg/moules-mariniere.svg',
  'assets/food-svg/quiche-lorraine.svg',
  'assets/food-svg/pad-thai.svg',
  'assets/food-svg/spaghetti-aglio-olio.svg',
  'assets/food-svg/biryani.svg',
  'assets/food-svg/falafel.svg',
  'assets/food-svg/spaghetti-amatriciana.svg',
  'assets/food-svg/panzanella.svg',
  'assets/food-svg/saltimbocca-romana.svg',
  'assets/food-svg/spanakopita.svg',
  'app.js', 'changelog.js', 'router.js', 'pwa.js', 'ui.js', 'util.js', 'db.js', 'recipes.js', 'calculator.js', 'importer.js', 'backup.js',
  'components.js', 'shopping.js', 'zarlock-art.js', 'art.js', 'food-photos.js', 'inventory-matching.js', 'inventory.js', 'barcode.js', 'ingredient-icons.js', 'art-kit.js', 'art-extra.js', 'nutrition.js', 'seeds.js', 'seeds-pl.js', 'seeds-world.js', 'seeds-more.js', 'timers.js', 'kitchen.js', 'tools-data.js', 'calc-kit.js', 'search.js',
  'views-start.js', 'views-recipes.js', 'views-detail.js', 'views-editor.js', 'views-cook.js', 'views-cook-home.js', 'views-calc.js', 'views-tools.js', 'views-guide.js', 'views-search.js', 'views-import.js', 'views-settings.js', 'views-inventory.js',
  'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png',
  'bg-texture.png', 'poppins-300.woff', 'poppins-400.woff', 'poppins-500.woff', 'poppins-700.woff',
  'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png',
  'assets/zarlock-hatch.svg',
  'assets/ingredient-illustrations/egg.png',
  'assets/ingredient-illustrations/bacon.png',
  'assets/ingredient-illustrations/sausage.png',
  'assets/ingredient-illustrations/pork.png',
  'assets/ingredient-illustrations/chicken.png',
  'assets/ingredient-illustrations/beef.png',
  'assets/ingredient-illustrations/shrimp.png',
  'assets/ingredient-illustrations/fish.png',
  'assets/ingredient-illustrations/tofu.png',
  'assets/ingredient-illustrations/pasta.png',
  'assets/ingredient-illustrations/rice.png',
  'assets/ingredient-illustrations/potato.png',
  'assets/ingredient-illustrations/carrot.png',
  'assets/ingredient-illustrations/onion.png',
  'assets/ingredient-illustrations/garlic.png',
  'assets/ingredient-illustrations/tomato.png',
  'assets/ingredient-illustrations/can.png',
  'assets/ingredient-illustrations/pepper.png',
  'assets/ingredient-illustrations/chili.png',
  'assets/ingredient-illustrations/cucumber.png',
  'assets/ingredient-illustrations/zucchini.png',
  'assets/ingredient-illustrations/leafy.png',
  'assets/ingredient-illustrations/mushroom.png',
  'assets/ingredient-illustrations/olive.png',
  'assets/ingredient-illustrations/lemon.png',
  'assets/ingredient-illustrations/basil.png',
  'assets/ingredient-illustrations/herb.png',
  'assets/ingredient-illustrations/cheese.png',
  'assets/ingredient-illustrations/milk.png',
  'assets/ingredient-illustrations/butter.png',
  'assets/ingredient-illustrations/flour.png',
  'assets/ingredient-illustrations/sugar.png',
  'assets/ingredient-illustrations/honey.png',
  'assets/ingredient-illustrations/cream.png',
  'assets/ingredient-illustrations/yogurt.png',
  'assets/ingredient-illustrations/salt.png',
  'assets/ingredient-illustrations/seafood.png',
  'assets/ingredient-illustrations/grain.png',
  'assets/ingredient-illustrations/parsnip.png',
  'assets/ingredient-illustrations/broccoli.png',
  'assets/ingredient-illustrations/eggplant.png',
  'assets/ingredient-illustrations/corn.png',
  'assets/ingredient-illustrations/pumpkin.png',
  'assets/ingredient-illustrations/avocado.png',
  'assets/ingredient-illustrations/lime.png',
  'assets/ingredient-illustrations/orange.png',
  'assets/ingredient-illustrations/pineapple.png',
  'assets/ingredient-illustrations/apple.png',
  'assets/ingredient-illustrations/banana.png',
  'assets/ingredient-illustrations/berry.png',
  'assets/ingredient-illustrations/dried-fruit.png',
  'assets/ingredient-illustrations/coconut.png',
  'assets/ingredient-illustrations/bread.png',
  'assets/ingredient-illustrations/tortilla.png',
  'assets/ingredient-illustrations/pastry.png',
  'assets/ingredient-illustrations/wine.png',
  'assets/ingredient-illustrations/beer.png',
  'assets/ingredient-illustrations/spirit.png',
  'assets/ingredient-illustrations/coffee.png',
  'assets/ingredient-illustrations/ice.png',
  'assets/ingredient-illustrations/water.png',
  'assets/ingredient-illustrations/stock.png',
  'assets/ingredient-illustrations/mint.png',
  'assets/ingredient-illustrations/lemongrass.png',
  'assets/ingredient-illustrations/ginger.png',
  'assets/ingredient-illustrations/oil.png',
  'assets/ingredient-illustrations/chocolate.png',
  'assets/ingredient-illustrations/nuts.png',
  'assets/ingredient-illustrations/beans.png',
  'assets/ingredient-illustrations/lentils.png',
  'assets/ingredient-illustrations/spice.png',
  'assets/ingredient-illustrations/seasoning-mix.png',
  'assets/ingredient-illustrations/sauce.png',
  'assets/ingredient-illustrations/mustard.png',
  'assets/ingredient-illustrations/vinegar.png',
  'assets/ingredient-illustrations/yeast.png',
  'assets/ingredient-illustrations/spoon.png',
  'assets/ingredient-illustrations/starter.png',
  'assets/ingredient-illustrations/beet.png',
  'assets/ingredient-illustrations/celery.png',
  'assets/ingredient-illustrations/radish.png',
  'assets/ingredient-illustrations/jam.png',
  'assets/ingredient-illustrations/pickle.png',
  'assets/ingredient-illustrations/seaweed.png',
];

const scopeUrl = (p) => new URL(p, self.registration.scope).href;
const INDEX = () => scopeUrl('index.html');

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    // Wymagane pliki aplikacji muszą być kompletne, ale brak jednej ilustracji,
    // ikony lub fontu nie może zablokować instalacji całego service workera.
    const uniqueCore = [...new Set(CORE)];
    const optionalAsset = (p) => /\.(?:png|jpe?g|webp|avif|woff2?|ttf|otf|svg|b64)$/i.test(p);
    const required = uniqueCore.filter((p) => !optionalAsset(p));
    const optional = uniqueCore.filter(optionalAsset);
    await cache.addAll(required.map((p) => new Request(scopeUrl(p), { cache: 'reload' })));
    await Promise.allSettled(optional.map((p) =>
      cache.add(new Request(scopeUrl(p), { cache: 'reload' }))
    ));
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    const previousVersions = keys.filter((k) =>
      k.startsWith('kucharzyna-') && k !== VERSION && k !== MEDIA_CACHE
    );

    // Zachowaj tylko stare ilustracje, które były zapisane w cache wydania.
    // Pozostałe pliki starej wersji można usunąć po aktywacji nowego wydania.
    for (const name of previousVersions) {
      try {
        const oldCache = await caches.open(name);
        let hasArtwork = false;
        for (const request of await oldCache.keys()) {
          const path = new URL(request.url).pathname;
          if (path.includes('/assets/food-illustrations/') && /\.png$/i.test(path)) {
            hasArtwork = true;
          } else {
            await oldCache.delete(request);
          }
        }
        if (!hasArtwork) await caches.delete(name);
      } catch (_) { /* Czyszczenie starej pamięci nie może zablokować aktywacji. */ }
    }

    await self.clients.claim();
  })());
});
self.addEventListener('message', (event) => {
  const msg = event.data || {};
  if (msg.type === 'SKIP_WAITING') self.skipWaiting();
  else if (msg.type === 'GET_VERSION' && event.ports && event.ports[0]) event.ports[0].postMessage({ version: VERSION });
});

/** Cache-First dla mediów: szybki odczyt i osobny cache zachowywany między wydaniami. */
async function cacheFirst(request) {
  const media = await caches.open(MEDIA_CACHE);
  const cached = await media.match(request, { ignoreSearch: true });
  if (cached) return cached;

  // Ikony/fonty z CORE są już w cache wersji aplikacji — przenieś kopię do trwałego cache mediów.
  const core = await caches.open(VERSION);
  const bundled = await core.match(request, { ignoreSearch: true });
  if (bundled) {
    await media.put(request, bundled.clone()).catch(() => {});
    return bundled;
  }

  // Odczytaj rysunki zapisane przez poprzednie wydania. Wybór pełnego pakietu
  // w Ustawieniach może dodatkowo zapisać je do trwałego cache mediów.
  const legacyNames = (await caches.keys()).filter((name) =>
    name.startsWith('kucharzyna-') && name !== VERSION && name !== MEDIA_CACHE
  );
  for (const name of legacyNames) {
    try {
      const legacy = await caches.open(name);
      const saved = await legacy.match(request, { ignoreSearch: true });
      if (saved) return saved;
    } catch (_) { /* */ }
  }

  const response = await fetch(request, { cache: 'no-cache' });
  if (response && response.ok && response.type !== 'opaque') {
    await media.put(request, response.clone()).catch(() => {});
  }
  return response;
}

/** Sieć najpierw (z limitem czasu, gdy mamy kopię), potem pamięć podręczna. */
async function networkFirst(event, url, cacheKey) {
  const cache = await caches.open(VERSION);
  const cached = await cache.match(cacheKey, { ignoreSearch: true });

  const net = fetch(url, { cache: 'no-cache' }).then((res) => {
    if (res && res.ok && res.type !== 'opaque') cache.put(cacheKey, res.clone()).catch(() => {});
    return res;
  });

  // Ogranicz czas oczekiwania także wtedy, gdy nie ma jeszcze kopii w cache.
  // W przeciwnym razie na pustym/wyczyszczonym cache nawigacja może wisieć bez końca.
  const timeout = new Promise((resolve) => setTimeout(() => resolve(null), NETWORK_TIMEOUT));
  const bounded = Promise.race([net, timeout]);

  if (!cached) {
    const response = await bounded;
    if (!response) throw new Error('Network timeout without cached response');
    return response;
  }

  // Aktualizacja cache działa w tle, ale nie przedłuża życia workera bez limitu.
  event.waitUntil(bounded.catch(() => {}));
  try {
    const res = await bounded;
    return res && res.ok ? res : cached;
  } catch (_) {
    return cached;
  }
}

/** Cache-First dla statycznego JS/CSS, z odświeżeniem kopii w tle. */
async function staleWhileRevalidate(event, request) {
  const cache = await caches.open(VERSION);
  const cached = await cache.match(request, { ignoreSearch: true });
  const refresh = fetch(request, { cache: 'no-cache' }).then(async (response) => {
    if (response && response.ok && response.type !== 'opaque') {
      await cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  });
  const timeout = new Promise((resolve) => setTimeout(() => resolve(null), NETWORK_TIMEOUT));
  const bounded = Promise.race([refresh, timeout]);

  if (cached) {
    event.waitUntil(bounded.catch(() => {}));
    return cached;
  }

  const response = await bounded;
  if (response) return response;
  const fallback = await cache.match(request, { ignoreSearch: true });
  if (fallback) return fallback;
  throw new Error('Network timeout without cached response');
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // nic spoza własnej domeny

  if (req.mode === 'navigate') {
    // The standalone artwork gallery is a real HTML page, not an SPA route.
    if (url.pathname.endsWith('/galeria-kredkowa.html')) {
      const gallery = scopeUrl('galeria-kredkowa.html');
      event.respondWith(networkFirst(event, gallery, gallery).catch(async () => {
        const cache = await caches.open(VERSION);
        return (await cache.match(gallery)) || Response.error();
      }));
      return;
    }
    if (url.pathname.endsWith('/art-preview-1-4-52.html')) {
      const preview = scopeUrl('art-preview-1-4-52.html');
      event.respondWith(networkFirst(event, preview, preview).catch(async () => {
        const cache = await caches.open(VERSION);
        return (await cache.match(preview)) || Response.error();
      }));
      return;
    }
    // Aplikacja jednostronicowa (trasy po #): każda nawigacja = index.html.
    event.respondWith(networkFirst(event, INDEX(), INDEX()).catch(async () => {
      const cache = await caches.open(VERSION);
      return (await cache.match(INDEX())) || Response.error();
    }));
    return;
  }
  if (/\.(?:m?js|css)$/i.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(event, req).catch(async () => {
      const cache = await caches.open(VERSION);
      return (await cache.match(req, { ignoreSearch: true })) || Response.error();
    }));
    return;
  }
  if (/\.(?:avif|gif|jpe?g|png|svg|webp|woff2?|ttf|otf)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(req).catch(async () => {
      const media = await caches.open(MEDIA_CACHE);
      return (await media.match(req, { ignoreSearch: true })) || Response.error();
    }));
    return;
  }
  event.respondWith(networkFirst(event, req.url, req.url).catch(async () => {
    const cache = await caches.open(VERSION);
    return (await cache.match(req, { ignoreSearch: true })) || Response.error();
  }));
});

