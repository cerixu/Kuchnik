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
const VERSION = 'kucharzyna-1.4.68';
const MEDIA_CACHE = 'kucharzyna-media-v1';
const NETWORK_TIMEOUT = 3500;

const CORE = [
  './',
  'index.html',
  'art-preview-1-4-52.html',
  'galeria-kredkowa.html', 'food-illustrations.js',
  'assets/food-illustrations/rosol-kredka.png', 'assets/food-illustrations/kotlet-schabowy-kredka.png',
  'assets/food-illustrations/pierogi-ruskie-kredka.png', 'assets/food-illustrations/zupa-pomidorowa-kredka.png',
  'assets/food-illustrations/zurek-kredka.png', 'assets/food-illustrations/barszcz-czerwony-kredka.png',
  'assets/food-illustrations/krem-z-dyni-kredka.png', 'assets/food-illustrations/kapusniak-kredka.png',
  'assets/food-illustrations/bigos-staropolski-kredka.png', 'assets/food-illustrations/golabki-pomidorowe-kredka.png',
  'assets/food-illustrations/gulasz-wegierski-kredka.png', 'assets/food-illustrations/szakszuka-kredka.png',
  'assets/food-illustrations/salatka-grecka-kredka.png', 'assets/food-illustrations/salatka-caprese-kredka.png',
  'assets/food-illustrations/salatka-cezar-kredka.png', 'assets/food-illustrations/mizeria-kredka.png',
  'assets/food-illustrations/kotlet-mielony-kredka.png', 'assets/food-illustrations/nalesniki-z-serem-kredka.png',
  'assets/food-illustrations/placki-ziemniaczane-kredka.png', 'assets/food-illustrations/zupa-grzybowa-kredka.png',
  'assets/food-illustrations/tom-yum-kredka.png', 'assets/food-illustrations/gazpacho-kredka.png',
  'assets/food-illustrations/chili-con-carne-kredka.png', 'assets/food-illustrations/burger-domowy-kredka.png',
  'assets/food-illustrations/kaczka-pieczona-jablka-kredka.png', 'assets/food-illustrations/losos-pieczony-cytryna-kredka.png',
  'assets/food-illustrations/pizza-pepperoni-kredka.png', 'assets/food-illustrations/panna-cotta-truskawki-kredka.png',
  'assets/food-illustrations/lasagne-bolognese-kredka.png',
  'assets/food-illustrations/bruschetta-pomidory-kredka.png',
  'assets/food-illustrations/quiche-lorraine-kredka.png',
  'assets/food-illustrations/focaccia-kredka.png',
  'assets/food-illustrations/calzone-kredka.png',
  'assets/food-illustrations/pizza-quattro-formaggi-kredka.png',
  'assets/food-illustrations/kopytka-kredka.png',
  'assets/food-illustrations/tortilla-espanola-kredka.png',
  'assets/food-illustrations/falafel-kredka.png',
  'assets/food-illustrations/ratatouille-kredka.png',
  'assets/food-illustrations/pierogi-kapusta-grzyby-kredka.png',
  'assets/food-illustrations/pierogi-jagody-kredka.png',
  'assets/food-illustrations/pierogi-leniwe-kredka.png',
  'assets/food-illustrations/ryba-po-grecku-kredka.png',
  'assets/food-illustrations/kurczak-pieczony-kredka.png',
  'assets/food-illustrations/pstrag-maslo-migdalami-kredka.png',
  'assets/food-illustrations/karkowka-pieczona-kredka.png',
  'assets/food-illustrations/pulpety-koperkowe-kredka.png',
  'assets/food-illustrations/salatka-jarzynowa-kredka.png',
  'assets/food-illustrations/surowka-marchew-jablko-kredka.png',
  'assets/food-illustrations/jajecznica-kredka.png',
  'assets/food-illustrations/jajka-w-koszulkach-kredka.png',
  'assets/food-illustrations/racuchy-z-jablkami-kredka.png',
  'assets/food-illustrations/knedle-ze-sliwkami-kredka.png',
  'assets/food-illustrations/makowiec-kredka.png',
  'assets/food-illustrations/sernik-klasyczny-kredka.png',
  'assets/food-illustrations/brownie-czekoladowe-kredka.png',
  'assets/food-illustrations/fish-and-chips-kredka.png',
  'assets/food-illustrations/sledz-w-oleju-kredka.png',
  'assets/food-illustrations/hummus-kredka.png',
  'assets/food-illustrations/lasagne-bolognese-kredka.png',
  'assets/food-illustrations/bruschetta-pomidory-kredka.png',
  'assets/food-illustrations/quiche-lorraine-kredka.png',
  'assets/food-illustrations/focaccia-kredka.png',
  'assets/food-illustrations/calzone-kredka.png',
  'assets/food-illustrations/pizza-quattro-formaggi-kredka.png',
  'assets/food-illustrations/kopytka-kredka.png',
  'assets/food-illustrations/tortilla-espanola-kredka.png',
  'assets/food-illustrations/falafel-kredka.png',
  'assets/food-illustrations/ratatouille-kredka.png',
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
  'components.js', 'shopping.js', 'art.js', 'food-photos.js', 'inventory-matching.js', 'inventory.js', 'barcode.js', 'ingredient-icons.js', 'art-kit.js', 'art-extra.js', 'nutrition.js', 'seeds.js', 'seeds-pl.js', 'seeds-world.js', 'seeds-more.js', 'timers.js', 'kitchen.js', 'tools-data.js', 'calc-kit.js', 'search.js',
  'views-start.js', 'views-recipes.js', 'views-detail.js', 'views-editor.js', 'views-cook.js', 'views-cook-home.js', 'views-calc.js', 'views-tools.js', 'views-guide.js', 'views-search.js', 'views-import.js', 'views-settings.js', 'views-inventory.js',
  'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png',
  'bg-texture.png', 'poppins-300.woff', 'poppins-400.woff', 'poppins-500.woff', 'poppins-700.woff',
  'assets/food-illustrations/zupa-ogorkowa-kredka.png',
  'assets/food-illustrations/pieczen-rzymska-kredka.png',
  'assets/food-illustrations/kluski-slaskie-kredka.png',
  'assets/food-illustrations/karp-smazony-kredka.png',
  'assets/food-illustrations/szarlotka-kredka.png',
  'assets/food-illustrations/tiramisu-kredka.png',
  'assets/food-illustrations/paella-owoce-morza-kredka.png',
  'assets/food-illustrations/tacos-al-pastor-kredka.png',
  'assets/food-illustrations/ramen-shoyu-kredka.png',
  'assets/food-illustrations/bibimbap-kredka.png',
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

