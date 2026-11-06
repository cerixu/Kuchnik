/* ==========================================================================
   ŻARŁOK / Kuchnik — service worker
   Strategia: network-first z krótkim limitem czasu i cache jako zapasem.
   Dzięki temu online zawsze dostajesz świeże pliki (brak „starej wersji
   przez kilka dni”), a offline aplikacja otwiera się z pamięci podręcznej.
   Nowa wersja NIE przejmuje aplikacji po cichu: strona pokazuje „Odśwież”
   i dopiero wtedy wysyła SKIP_WAITING.

   ZMIANA WERSJI: podbij VERSION (i APP_VERSION w util.js) przy każdej
   aktualizacji plików, żeby urządzenia wykryły nową wersję.
   ========================================================================== */
const VERSION = 'kucharzyna-1.4.95';
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
  'components.js', 'shopping.js', 'zarlock-art.js', 'art.js', 'food-photos.js', 'inventory-matching.js', 'inventory.js', 'barcode.js', 'ingredient-icons.js', 'art-kit.js', 'art-extra.js', 'nutrition.js', 'seeds.js', 'seeds-pl.js', 'seeds-world.js', 'seeds-more.js', 'timers.js', 'kitchen.js', 'tools-data.js', 'calc-kit.js', 'search.js',
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
  'assets/food-illustrations/wiener-schnitzel-kredka.png',
  'assets/food-illustrations/kurczak-tikka-masala-kredka.png',
  'assets/food-illustrations/coq-au-vin-kredka.png',
  'assets/food-illustrations/nalesniki-kredka.png',
  'assets/food-illustrations/spaghetti-aglio-olio-kredka.png',
  'assets/food-illustrations/cacio-e-pepe-kredka.png',
  'assets/food-illustrations/pad-thai-kredka.png',
  'assets/food-illustrations/pesto-genovese-kredka.png',
  'assets/food-illustrations/guacamole-kredka.png',
  'assets/food-illustrations/tzatziki-kredka.png',
  'assets/food-illustrations/sos-beszamel-kredka.png',
  'assets/food-illustrations/sos-holenderski-kredka.png',
  'assets/food-illustrations/majonez-domowy-kredka.png',
  'assets/food-illustrations/vinaigrette-kredka.png',
  'assets/food-illustrations/bulion-drobiowy-fond-kredka.png',
  'assets/food-illustrations/maslo-ziolowe-kredka.png',
  'assets/food-illustrations/cebula-karmelizowana-kredka.png',
  'assets/food-illustrations/marynowana-czerwona-cebula-kredka.png',
  'assets/food-illustrations/gambas-al-ajillo-kredka.png',
  'assets/food-illustrations/creme-brulee-kredka.png',
  'assets/food-illustrations/pancakes-amerykanskie-kredka.png',
  'assets/food-illustrations/chleb-na-zakwasie-kredka.png',
  'assets/food-illustrations/chleb-pszenny-drozdze-kredka.png',
  'assets/food-illustrations/margarita-kredka.png',
  'assets/food-illustrations/negroni-kredka.png',
  'assets/food-illustrations/aperol-spritz-kredka.png',
  'assets/food-illustrations/old-fashioned-kredka.png',
  'assets/food-illustrations/mojito-kredka.png',
  'assets/food-illustrations/espresso-martini-kredka.png',
  'assets/food-illustrations/krupnik-kredka.png',
  'assets/food-illustrations/zupa-koperkowa-kredka.png',
  'assets/food-illustrations/flaki-wolowe-kredka.png',
  'assets/food-illustrations/chlodnik-litewski-kredka.png',
  'assets/food-illustrations/zupa-szczawiowa-kredka.png',
  'assets/food-illustrations/grochowka-kredka.png',
  'assets/food-illustrations/zupa-fasolowa-kredka.png',
  'assets/food-illustrations/zrazy-zawijane-kredka.png',
  'assets/food-illustrations/watrobka-z-cebula-kredka.png',
  'assets/food-illustrations/zeberka-w-miodzie-kredka.png',
  'assets/food-illustrations/schab-pieczony-sos-wlasny-kredka.png',
  'assets/food-illustrations/lazanki-z-kapusta-kredka.png',
  'assets/food-illustrations/kapusta-zasmazana-kredka.png',
  'assets/food-illustrations/buraczki-zasmazane-kredka.png',
  'assets/food-illustrations/ogorki-kiszone-kredka.png',
  'assets/food-illustrations/fasolka-szparagowa-bulka-tarta-kredka.png',
  'assets/food-illustrations/sernik-na-zimno-galaretka-kredka.png',
  'assets/food-illustrations/drozdzowka-z-serem-kredka.png',
  'assets/food-illustrations/babka-piaskowa-kredka.png',
  'assets/food-illustrations/mazurek-kajmakowy-kredka.png',
  'assets/food-illustrations/paczek-kredka.png',
  'assets/food-illustrations/faworki-kredka.png',
  'assets/food-illustrations/kisiel-zurawinowy-kredka.png',
  'assets/food-illustrations/ciasto-marchewkowe-kredka.png',
  'assets/food-illustrations/placek-drozdzowy-sliwki-kredka.png',
  'assets/food-illustrations/kutia-kredka.png',
  'assets/food-illustrations/pierniczki-kredka.png',
  'assets/food-illustrations/sledzie-w-smietanie-kredka.png',
  'assets/food-illustrations/pasta-jajeczna-kredka.png',
  'assets/food-illustrations/smalec-ze-skwarami-kredka.png',
  'assets/food-illustrations/uszka-do-barszczu-kredka.png',
  'assets/food-illustrations/risotto-alla-milanese-kredka.png',
  'assets/food-illustrations/gnocchi-maslo-szalwiowe-kredka.png',
  'assets/food-illustrations/spaghetti-alla-puttanesca-kredka.png',
  'assets/food-illustrations/spaghetti-all-amatriciana-kredka.png',
  'assets/food-illustrations/ragu-alla-bolognese-kredka.png',
  'assets/food-illustrations/penne-allarrabbiata-kredka.png',
  'assets/food-illustrations/fettuccine-alfredo-kredka.png',
  'assets/food-illustrations/minestrone-kredka.png',
  'assets/food-illustrations/panzanella-kredka.png',
  'assets/food-illustrations/saltimbocca-alla-romana-kredka.png',
  'assets/food-illustrations/parmigiana-di-melanzane-kredka.png',
  'assets/food-illustrations/zupa-cebulowa-kredka.png',
  'assets/food-illustrations/boeuf-bourguignon-kredka.png',
  'assets/food-illustrations/croque-monsieur-kredka.png',
  'assets/food-illustrations/moules-marinieres-kredka.png',
  'assets/food-illustrations/salatka-nicoise-kredka.png',
  'assets/food-illustrations/tarte-tatin-kredka.png',
  'assets/food-illustrations/crepes-kredka.png',
  'assets/food-illustrations/patatas-bravas-kredka.png',
  'assets/food-illustrations/albondigas-w-sosie-pomidorowym-kredka.png',
  'assets/food-illustrations/mussaka-kredka.png',
  'assets/food-illustrations/souvlaki-z-kurczaka-kredka.png',
  'assets/food-illustrations/spanakopita-kredka.png',
  'assets/food-illustrations/quesadilla-z-serem-kurczakiem-kredka.png',
  'assets/food-illustrations/enchiladas-z-kurczakiem-kredka.png',
  'assets/food-illustrations/pico-de-gallo-kredka.png',
  'assets/food-illustrations/burrito-bowl-kredka.png',
  'assets/food-illustrations/mac-and-cheese-kredka.png',
  'assets/food-illustrations/bbq-ribs-kredka.png',
  'assets/food-illustrations/pulled-pork-kredka.png',
  'assets/food-illustrations/skrzydelka-buffalo-kredka.png',
  'assets/food-illustrations/salatka-cobb-kredka.png',
  'assets/food-illustrations/sushi-maki-ogorek-losos-kredka.png',
  'assets/food-illustrations/zielone-curry-tajskie-kredka.png',
  'assets/food-illustrations/kurczak-teriyaki-kredka.png',
  'assets/food-illustrations/smazony-ryz-z-jajkiem-kredka.png',
  'assets/food-illustrations/pho-bo-kredka.png',
  'assets/food-illustrations/gyoza-kredka.png',
  'assets/food-illustrations/kung-pao-z-kurczakiem-kredka.png',
  'assets/food-illustrations/zupa-miso-kredka.png',
  'assets/food-illustrations/satay-z-kurczaka-sos-orzechowy-kredka.png',
  'assets/food-illustrations/dal-z-soczewicy-kredka.png',
  'assets/food-illustrations/biryani-z-kurczakiem-kredka.png',
  'assets/food-illustrations/tabbouleh-kredka.png',
  'assets/food-illustrations/baba-ganoush-kredka.png',
  'assets/food-illustrations/kofta-z-jagnieciny-kredka.png',
  'assets/food-illustrations/shawarma-z-kurczaka-kredka.png',
  'assets/food-illustrations/spatzle-z-serem-kredka.png',
  'assets/food-illustrations/currywurst-kredka.png',
  'assets/food-illustrations/leczo-kredka.png',
  'assets/food-illustrations/langosz-kredka.png',
  'assets/food-illustrations/boeuf-stroganow-kredka.png',
  'assets/food-illustrations/chaczapuri-adzarskie-kredka.png',
  'assets/food-illustrations/tagine-z-kurczakiem-morele-kredka.png',
  'assets/food-illustrations/shepherds-pie-kredka.png',
  'assets/food-illustrations/owsianka-z-owocami-orzechami-kredka.png',
  'assets/food-illustrations/tosty-francuskie-kredka.png',
  'assets/food-illustrations/granola-domowa-kredka.png',
  'assets/food-illustrations/tost-awokado-jajko-kredka.png',
  'assets/food-illustrations/smoothie-bowl-truskawkowy-kredka.png',
  'assets/food-illustrations/placuszki-bananowe-kredka.png',
  'assets/food-illustrations/curry-ciecierzyca-szpinak-kredka.png',
  'assets/food-illustrations/kotlety-z-soczewicy-kredka.png',
  'assets/food-illustrations/burger-weganski-czarna-fasola-kredka.png',
  'assets/food-illustrations/tofu-z-warzywami-wok-kredka.png',
  'assets/food-illustrations/krem-z-brokulow-kredka.png',
  'assets/food-illustrations/zapiekanka-makaronowa-warzywna-kredka.png',
  'assets/food-illustrations/muffinki-czekoladowe-kredka.png',
  'assets/food-illustrations/ciastka-owsiane-z-zurawina-kredka.png',
  'assets/food-illustrations/lody-waniliowe-domowe-kredka.png',
  'assets/food-illustrations/mus-czekoladowy-kredka.png',
  'assets/food-illustrations/sernik-nowojorski-kredka.png',
  'assets/food-illustrations/tarta-cytrynowa-kredka.png',
  'assets/food-illustrations/ciasto-czekoladowe-bez-maki-kredka.png',
  'assets/food-illustrations/biszkopt-kredka.png',
  'assets/food-illustrations/bulion-warzywny-kredka.png',
  'assets/food-illustrations/sos-bbq-domowy-kredka.png',
  'assets/food-illustrations/sos-czosnkowy-kredka.png',
  'assets/food-illustrations/dzem-truskawkowy-kredka.png',
  'assets/food-illustrations/kruche-ciasto-uniwersalne-kredka.png',
  'assets/food-illustrations/ciasto-na-pierogi-kredka.png',
  'assets/food-illustrations/zakwas-zytni-kredka.png',
  'assets/food-illustrations/marynata-do-kurczaka-kredka.png',
  'assets/food-illustrations/nachos-z-serem-kredka.png',
  'assets/food-illustrations/frytki-z-piekarnika-kredka.png',
  'assets/food-illustrations/kanapka-club-kredka.png',
  'assets/food-illustrations/cosmopolitan-kredka.png',
  'assets/food-illustrations/daiquiri-kredka.png',
  'assets/food-illustrations/moscow-mule-kredka.png',
  'assets/food-illustrations/pina-colada-kredka.png',
  'assets/food-illustrations/whisky-sour-kredka.png',
  'assets/food-illustrations/gin-tonic-kredka.png',
  'assets/food-illustrations/caipirinha-kredka.png',
  'assets/food-illustrations/bloody-mary-kredka.png',
  'assets/food-illustrations/hugo-kredka.png',
  'assets/food-illustrations/grzaniec-kredka.png',
  'assets/food-illustrations/lemoniada-domowa-kredka.png',
  'assets/food-illustrations/carbonara-kredka.png',
  'assets/food-illustrations/pizza-napoletana-kredka.png',
  'assets/food-illustrations/sos-pomidorowy-kredka.png',
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

