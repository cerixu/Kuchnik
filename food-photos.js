/* ==========================================================================
   Żarłok 2.0 — prawdziwe zdjęcia dań.
   Fotografie są wersjonowane lokalnie w repozytorium jako base64/JPEG, dzięki
   czemu działają również offline. Własne zdjęcie użytkownika ma pierwszeństwo;
   gdy zdjęcie nie istnieje albo się nie załaduje, zostaje ilustracja SVG.
   ========================================================================== */

const PHOTO_FILES = Object.freeze({
  pizza: 'food-pizza.jpg.b64',
  carbonara: 'food-carbonara.jpg.b64',
  risotto: 'food-risotto.jpg.b64',
  salmon: 'food-salmon.jpg.b64',
  steak: 'food-steak.jpg.b64',
  dessert: 'food-dessert.jpg.b64',
  salad: 'food-salad.jpg.b64',
  sauce: 'food-sauce.jpg.b64',
  soup: 'food-soup.jpg.b64',
  seafood: 'food-seafood.jpg.b64',
  pierogi: 'food-pierogi.jpg.b64',
  burger: 'food-burger.jpg.b64',
  focaccia: 'food-focaccia.jpg.b64',
  'pasta-tomato': 'food-pasta-tomato.jpg.b64',
  lasagna: 'food-lasagna.jpg.b64',
  'chicken-curry': 'food-chicken-curry.jpg.b64',
  schnitzel: 'food-schnitzel.jpg.b64',
  'soup-tomato': 'food-soup-tomato.jpg.b64',
  'soup-clear': 'food-soup-clear.jpg.b64',
  'soup-pumpkin': 'food-soup-pumpkin.jpg.b64',
  sourdough: 'food-sourdough.jpg.b64',
  baguette: 'food-baguette.jpg.b64',
  cake: 'food-cake.jpg.b64',
  'babka-piaskowa': 'food-babka-piaskowa.jpg.b64',
  'baba-ganoush': 'food-baba-ganoush.jpg.b64',
  cocktail: 'food-cocktail.jpg.b64',
  'asian-noodles': 'food-asian-noodles.jpg.b64',
  'fried-rice': 'food-fried-rice.jpg.b64',
  barszcz: 'food-barszcz.jpg.b64',
  bigos: 'food-bigos.jpg.b64',
  'bbq-ribs': 'food-bbq-ribs.jpg.b64',
  'beef-stew': 'food-beef-stew.jpg.b64',
  brownie: 'food-brownie.jpg.b64',
  'creme-brulee': 'food-creme-brulee.jpg.b64',
  crepes: 'food-crepes.jpg.b64',
  bagel: 'food-bagel.jpg.b64',
  bibimbap: 'food-bibimbap.jpg.b64',
  'curry-chickpea': 'food-curry-chickpea.jpg.b64',
  bruschetta: 'food-bruschetta.jpg.b64',
  aperol: 'food-aperol.jpg.b64',
});

const CATEGORY_PHOTOS = Object.freeze({
  'cat-pizza': 'pizza',
  'cat-pasta': 'carbonara',
  'cat-mieso': 'steak',
  'cat-ryby': 'salmon',
  'cat-owoce-morza': 'seafood',
  'cat-warzywa': 'salad',
  'cat-desery': 'dessert',
  'cat-pieczywo': 'sourdough',
  'cat-zupy': 'soup-clear',
  'cat-salatki': 'salad',
  'cat-sosy': 'sauce',
});

const normalise = (value) => String(value || '')
  .toLocaleLowerCase('pl')
  .replace(/ł/g, 'l')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const RECIPE_RULES = [
  // Najpierw konkretne potrawy i składniki, dopiero później szerokie kategorie.
  ['pizza', /\b(pizza|pinsa|margherita|diavola|capricciosa|napoletana|quattro formaggi)\b/],
  ['carbonara', /\b(carbonara)\b/],
  ['risotto', /\b(risotto)\b/],
  ['baba-ganoush', /\b(baba ganoush|baba ghanoush|mutabal|pasta z baklazana)\b/],
  ['bruschetta', /\b(bruschetta|grzanki z pomidorami)\b/],
  ['babka-piaskowa', /\b(babka piaskowa|babka cytrynowa|babka drozdzowa)\b/],
  ['brownie', /\b(brownie|ciasto czekoladowe)\b/],
  ['creme-brulee', /\b(creme brulee|krem katalonski)\b/],
  ['crepes', /\b(nalesniki|crepes|crepe)\b/],
  ['bagel', /\b(bagel|bajgiel)\b/],
  ['bibimbap', /\b(bibimbap)\b/],
  ['curry-chickpea', /\b(curry z ciecierzycy|ciecierzyca curry|chickpea curry)\b/],
  ['fried-rice', /\b(smazony ryz|fried rice|nasi goreng)\b/],
  ['asian-noodles', /\b(pad thai|pad see ew|mie goreng|chow mein|makaron po azjatycku)\b/],
  ['barszcz', /\b(barszcz)\b/],
  ['bigos', /\b(bigos)\b/],
  ['bbq-ribs', /\b(zeberka|bbq ribs)\b/],
  ['beef-stew', /\b(gulasz wolowy|boeuf bourguignon|wolowina duszona)\b/],
  ['salmon', /\b(losos|salmon)\b/],
  ['steak', /\b(stek|steak|antrykot|ribeye|rostbef|t bone)\b/],
  ['dessert', /\b(tiramisu|deser kawowy)\b/],
  ['salad', /\b(burrata|caprese|salatka|salad)\b/],
  ['aperol', /\baperol spritz\b/],
  // Zdjęcie z miedzianym kubkiem przedstawia Moscow Mule — nie przypisuj go wszystkim drinkom.
  ['cocktail', /\bmoscow mule\b/],
  ['lasagna', /\b(lasagna|lasagne)\b/],
  ['chicken-curry', /\b(tikka masala|butter chicken|chicken curry)\b/],
  ['schnitzel', /\b(kotlet schabowy|schabowy|wiener schnitzel|schnitzel)\b/],
  ['soup-tomato', /\b(zupa pomidorowa|pomidorowa|tomato soup)\b/],
  ['soup-clear', /\b(rosol|bulion drobiowy|chicken broth|chicken stock)\b/],
  ['soup-pumpkin', /\b(krem z dyni|zupa dyniowa|pumpkin soup)\b/],
  ['pasta-tomato', /\b(spaghetti al pomodoro|sos pomidorowy do makaronu|pasta pomodoro|pasta marinara|spaghetti all amatriciana)\b/],
  ['cake', /\b(szarlotka|apple pie)\b/],
  ['baguette', /\b(baguette|bagietka|bagietki)\b/],
  ['sourdough', /\b(chleb na zakwasie|sourdough|chleb zytni|chleb pszenny na drozdzach|bread|bochenek chleba)\b/],
  ['soup', /\b(zurek)\b/],
  ['seafood', /\b(vongole|malze|mussels|krewetki|krewetka|frutti di mare|owoce morza)\b/],
  ['pierogi', /\b(pierogi|pierog|uszka)\b/],
  ['burger', /\b(burger|hamburger)\b/],
  ['focaccia', /\b(focaccia|ciabatta)\b/],
];

const photoPromises = new Map();

export function recipePhotoKey(recipe) {
  if (!recipe || recipe.thumb || recipe.photo) return null;
  const name = normalise(recipe.name);
  for (const [key, pattern] of RECIPE_RULES) {
    if (pattern.test(name)) return key;
  }
  // Nie przypisuj nieznanej potrawie przypadkowego zdjęcia deseru.
  // Jeśli kategoria nie ma mapowania, pozostaw ilustrację SVG receptury.
  return CATEGORY_PHOTOS[recipe.category] || null;
}

function loadPhoto(key) {
  if (!PHOTO_FILES[key]) return Promise.resolve(null);
  if (!photoPromises.has(key)) {
    const url = new URL(PHOTO_FILES[key], import.meta.url);
    photoPromises.set(key, fetch(url.href, { cache: 'force-cache' })
      .then((response) => {
        if (!response.ok) throw new Error('Nie udało się odczytać zdjęcia ' + key);
        return response.text();
      })
      .then((base64) => {
        const data = base64.trim();
        if (!data.startsWith('/9j/') || data.length < 1000) throw new Error('Nieprawidłowe zdjęcie ' + key);
        return 'data:image/jpeg;base64,' + data;
      })
      .catch((error) => {
        photoPromises.delete(key);
        console.warn('[Żarłok 2.0] Zdjęcie niedostępne, używam ilustracji:', key, error);
        return null;
      }));
  }
  return photoPromises.get(key);
}

function attach(img, key) {
  if (!img || !key) return;
  img.dataset.photoRequested = key;
  loadPhoto(key).then((src) => {
    if (!src || !img.isConnected || img.dataset.photoRequested !== key) return;
    img.classList.remove('art');
    img.dataset.photoSource = key;
    img.src = src;
  }).catch(() => {});
}

/** Podmień ilustrację wyłącznie wtedy, gdy nazwa naprawdę pasuje do dania. */
export function attachRecipePhoto(img, recipe) {
  attach(img, recipePhotoKey(recipe));
}

/** Zdjęcie reprezentacyjne dla kafla kategorii (nie dla konkretnej receptury). */
export function attachCategoryPhoto(img, categoryId) {
  attach(img, CATEGORY_PHOTOS[categoryId] || null);
}

/** Przydatne przy wyborze wyróżnionej receptury na ekranie Start. */
export function hasFoodPhoto(recipe) {
  return !!(recipe && (recipe.thumb || recipe.photo || recipePhotoKey(recipe)));
}
