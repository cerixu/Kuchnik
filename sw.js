/* ==========================================================================
   Kucharzyna — service worker
   Strategia: network-first z krótkim limitem czasu i cache jako zapasem.
   Dzięki temu online zawsze dostajesz świeże pliki (brak „starej wersji
   przez kilka dni”), a offline aplikacja otwiera się z pamięci podręcznej.
   Nowa wersja NIE przejmuje aplikacji po cichu: strona pokazuje „Odśwież”
   i dopiero wtedy wysyła SKIP_WAITING.

   ZMIANA WERSJI: podbij VERSION (i APP_VERSION w util.js) przy każdej
   aktualizacji plików, żeby urządzenia wykryły nową wersję.
   ========================================================================== */
const VERSION = 'kucharzyna-1.4.30';
const MEDIA_CACHE = 'kucharzyna-media-v1';
const NETWORK_TIMEOUT = 3500;

const CORE = [
  './',
  'index.html',
  'styles.css',
  'manifest.webmanifest',
  'assets/food-svg/carbonara.svg', 'assets/food-svg/margherita.svg', 'assets/food-svg/tomato-soup.svg',
  'assets/food-svg/burger.svg', 'assets/food-svg/greek-salad.svg', 'assets/food-svg/mojito.svg',
  'app.js', 'changelog.js', 'router.js', 'pwa.js', 'ui.js', 'util.js', 'db.js', 'recipes.js', 'calculator.js', 'importer.js', 'backup.js',
  'components.js', 'shopping.js', 'art.js', 'food-photos.js', 'inventory-matching.js', 'inventory.js', 'barcode.js', 'ingredient-icons.js', 'art-kit.js', 'art-extra.js', 'nutrition.js', 'seeds.js', 'seeds-pl.js', 'seeds-world.js', 'seeds-more.js', 'timers.js', 'kitchen.js', 'tools-data.js', 'calc-kit.js', 'search.js',
  'views-start.js', 'views-recipes.js', 'views-detail.js', 'views-editor.js', 'views-cook.js', 'views-cook-home.js', 'views-calc.js', 'views-tools.js', 'views-guide.js', 'views-search.js', 'views-import.js', 'views-settings.js', 'views-inventory.js',
  'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png',
  'bg-texture.png', 'poppins-300.woff', 'poppins-400.woff', 'poppins-500.woff', 'poppins-700.woff',
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
    await Promise.all(keys.filter((k) => k.startsWith('kucharzyna-') && k !== VERSION && k !== MEDIA_CACHE).map((k) => caches.delete(k)));
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

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // nic spoza własnej domeny

  if (req.mode === 'navigate') {
    // Aplikacja jednostronicowa (trasy po #): każda nawigacja = index.html.
    event.respondWith(networkFirst(event, INDEX(), INDEX()).catch(async () => {
      const cache = await caches.open(VERSION);
      return (await cache.match(INDEX())) || Response.error();
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
