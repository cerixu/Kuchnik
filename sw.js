/* ==========================================================================
   Żarłok — service worker
   Strategia: network-first z krótkim limitem czasu i cache jako zapasem.
   Dzięki temu online zawsze dostajesz świeże pliki (brak „starej wersji
   przez kilka dni”), a offline aplikacja otwiera się z pamięci podręcznej.
   Nowa wersja NIE przejmuje aplikacji po cichu: strona pokazuje „Odśwież”
   i dopiero wtedy wysyła SKIP_WAITING.

   ZMIANA WERSJI: podbij VERSION (i APP_VERSION w util.js) przy każdej
   aktualizacji plików, żeby urządzenia wykryły nową wersję.
   ========================================================================== */
const VERSION = 'kuchnik-0.1.0';
const NETWORK_TIMEOUT = 3500;

const CORE = [
  './',
  'index.html',
  'styles.css', 'start-final.css', 'visual-system.css', 'visual-redesign.css', 'generated-art.css', 'zarlok-v2.css', 'design-overhaul.css', 'mobile-polish.css', 'art-direction.css', 'food-photos.js', 'claude-completion.css', 'kucharzyna-visual.css',
  'manifest.webmanifest',
  'app.js', 'changelog.js', 'router.js', 'start-final.css', 'inventory.js', 'barcode.js', 'pwa.js', 'ui.js', 'util.js', 'db.js', 'recipes.js', 'calculator.js', 'importer.js', 'backup.js',
  'components.js', 'shopping.js', 'art.js', 'art-kit.js', 'art-extra.js', 'nutrition.js', 'seeds.js', 'seeds-pl.js', 'seeds-world.js', 'seeds-more.js', 'seeds-curated.js', 'timers.js', 'kitchen.js', 'tools-data.js', 'calc-kit.js', 'search.js',
  'views-start.js', 'views-recipes.js', 'views-detail.js', 'views-editor.js', 'views-cook.js', 'views-cook-home.js', 'views-more.js', 'views-calc.js', 'views-tools.js', 'views-guide.js', 'views-search.js', 'views-import.js', 'views-settings.js',
  'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png',
  'poppins-300.woff', 'poppins-400.woff', 'poppins-500.woff', 'poppins-700.woff',
];

const scopeUrl = (p) => new URL(p, self.registration.scope).href;
const INDEX = () => scopeUrl('index.html');

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    // Pliki aplikacji są wymagane: jeśli któregoś brakuje, aktualizacja nie może
    // udawać gotowej. Pojedynczy brak zdjęcia/fontu nie może jednak zablokować
    // instalacji całego Service Workera (Cache.addAll jest operacją atomową).
    const uniqueCore = [...new Set(CORE)];
    const optionalAsset = (p) => /\.(?:png|jpe?g|webp|avif|woff2?|b64)$/i.test(p);
    const required = uniqueCore.filter((p) => !optionalAsset(p));
    const optional = uniqueCore.filter(optionalAsset);
    await cache.addAll(required.map((p) => new Request(scopeUrl(p), { cache: 'reload' })));
    await Promise.allSettled(optional.map((p) =>
      cache.add(new Request(scopeUrl(p), { cache: 'reload' }))
    ));
    // Pierwsza instalacja może aktywować się od razu; aktualizacje czekają,
    // aż użytkownik wybierze „Odśwież” w powiadomieniu.
    if (!self.registration.active) await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('zaruok-') && k !== VERSION).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  const msg = event.data || {};
  if (msg.type === 'SKIP_WAITING') self.skipWaiting();
  else if (msg.type === 'GET_VERSION' && event.ports && event.ports[0]) event.ports[0].postMessage({ version: VERSION });
});

/** Sieć najpierw (z limitem czasu, gdy mamy kopię), potem pamięć podręczna. */
async function networkFirst(event, url, cacheKey) {
  const cache = await caches.open(VERSION);
  const cached = await cache.match(cacheKey, { ignoreSearch: true });

  const net = fetch(url, { cache: 'no-cache' }).then((res) => {
    if (res && res.ok && res.type !== 'opaque') cache.put(cacheKey, res.clone()).catch(() => {});
    return res;
  });

  if (!cached) return net;                       // brak kopii — czekamy na sieć
  event.waitUntil(net.catch(() => {}));          // dokończ aktualizację cache w tle

  const timeout = new Promise((resolve) => setTimeout(() => resolve(cached), NETWORK_TIMEOUT));
  try {
    const res = await Promise.race([net, timeout]);
    return res && res.ok ? res : cached;         // 404/500 z sieci → lepsza kopia
  } catch (_) {
    return cached;                               // offline
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
  event.respondWith(networkFirst(event, req.url, req.url).catch(async () => {
    const cache = await caches.open(VERSION);
    return (await cache.match(req, { ignoreSearch: true })) || Response.error();
  }));
});
