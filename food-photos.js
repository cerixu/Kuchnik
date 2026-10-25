/* ==========================================================================
   food-photos.js — lokalna biblioteka zdjęć przeniesiona z Zaruok-App.
   Zdjęcia są pobierane na żądanie i cache'owane przez service workera.
   Brak sieci/zdjęcia nie blokuje receptury: zostaje ilustracja SVG.
   Własne zdjęcia użytkownika zawsze mają pierwszeństwo.
   ========================================================================== */

const PHOTO_FILES = Object.freeze({
  pizza: 'food-pizza.jpg',
  'pizza-diavola': 'food-pizza-diavola.jpg',
  carbonara: 'food-carbonara.jpg',
  risotto: 'food-risotto.jpg',
  salmon: 'food-salmon.jpg',
  steak: 'food-steak.jpg',
  salad: 'food-salad.jpg',
  'caesar-salad': 'food-caesar-salad.jpg',
  sauce: 'food-sauce.jpg',
  soup: 'food-soup.jpg',
  'soup-tomato': 'food-soup-tomato.jpg',
  pierogi: 'food-pierogi.jpg',
  burger: 'food-burger.jpg',
  focaccia: 'food-focaccia.jpg',
  'pasta-tomato': 'food-pasta-tomato.jpg',
  cocktail: 'food-cocktail.jpg',
  aperol: 'food-aperol.jpg',
  lasagna: 'food-lasagna.jpg',
  'chicken-curry': 'food-chicken-curry.jpg',
  schnitzel: 'food-schnitzel.jpg',
  bigos: 'food-bigos.jpg',
  sernik: 'food-sernik.jpg',
  baguette: 'food-baguette.jpg',
  dessert: 'food-dessert.jpg',
  'ramen-tonkotsu': 'food-ramen-tonkotsu.jpg',
  'sushi-maki': 'food-sushi-maki.jpg',
  seafood: 'food-seafood.jpg',
  barszcz: 'food-barszcz.jpg',
});

const CATEGORY_PHOTOS = Object.freeze({
  'cat-pizza': 'pizza',
  'cat-pasta': 'carbonara',
  'cat-mieso': 'steak',
  'cat-ryby': 'salmon',
  'cat-owoce-morza': 'seafood',
  'cat-warzywa': 'salad',
  'cat-desery': 'dessert',
  'cat-pieczywo': 'baguette',
  'cat-zupy': 'soup',
  'cat-salatki': 'caesar-salad',
  'cat-sosy': 'sauce',
  'cat-cocktaile': 'aperol',
});

const normalise = (value) => String(value || '')
  .toLocaleLowerCase('pl')
  .replace(/ł/g, 'l')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

/* Dopasowania są celowo konkretne — nie przypisujemy zdjęcia „na chybił trafił”. */
const RECIPE_RULES = [
  ['pizza-diavola', /\b(pizza diavola|diavola pizza|pizza salami pikantne)\b/],
  ['pizza', /\b(pizza margherita|margherita neapolitana|margherita classica|pizza napoletana)\b/],
  ['carbonara', /\b(spaghetti carbonara|carbonara tradycyjna|carbonara klasyczna|carbonara tradizionale|pasta alla carbonara)\b/],
  ['risotto', /\b(risotto ai funghi|risotto funghi|risotto z grzybami|risotto grzybowe|risotto z pieczarkami)\b/],
  ['salmon', /\b(losos pieczony|losos z cytryna|salmon fillet|grilled salmon)\b/],
  ['steak', /\b(steak frites|stek wolowy|stek z antrykotu|ribeye steak|filet mignon)\b/],
  ['caesar-salad', /\b(salatka cezar|salatka caesar|caesar salad)\b/],
  ['soup-tomato', /\b(zupa pomidorowa|krem pomidorowy|pomidorowa)\b/],
  ['barszcz', /\b(barszcz czerwony|barszcz ukrainski|barszcz wigilijny|barszcz)\b/],
  ['soup', /\b(rosol drobiowy|rosol wolowy|bulion drobiowy|zupa ogorkowa|krupnik|zupa grzybowa|minestrone)\b/],
  ['pierogi', /\b(pierogi ruskie|pierogi z miesem|pierogi z kapusta i grzybami|pierogi)\b/],
  ['burger', /\b(burger klasyczny|burger wolowy|cheeseburger|hamburger wolowy|burger domowy)\b/],
  ['focaccia', /\bfocaccia\b/],
  ['pasta-tomato', /\b(spaghetti al pomodoro|pasta pomodoro|spaghetti pomodoro|pasta marinara|penne all arrabbiata)\b/],
  // Zdjęcie cocktail przedstawia Moscow Mule — nie używaj go do innych drinków.
  ['cocktail', /\bmoscow mule\b/],
  ['aperol', /\baperol spritz\b/],
  ['lasagna', /\b(lasagne alla bolognese|lasagna bolognese|lasagne bolognese|lasagne tradycyjne|lasagne klasyczne)\b/],
  ['chicken-curry', /\b(kurczak tikka masala|butter chicken|kurczak curry|tikka masala)\b/],
  ['schnitzel', /\b(kotlet schabowy|schabowy|wiener schnitzel|schnitzel|sznycel wiedenski)\b/],
  ['bigos', /\b(bigos staropolski|bigos)\b/],
  ['sernik', /\b(sernik|cheesecake)\b/],
  ['baguette', /\bbaguette\b/],
  ['ramen-tonkotsu', /\b(ramen tonkotsu|tonkotsu ramen)\b/],
  ['sushi-maki', /\b(sushi maki|salmon cucumber maki)\b/],
  ['seafood', /\b(frutti di mare|mule marinara|mussels marinara|owoce morza na parze)\b/],
];

const SVG_FILES = Object.freeze({
  carbonara: 'carbonara.svg',
  margherita: 'margherita.svg',
  'tomato-soup': 'tomato-soup.svg',
  burger: 'burger.svg',
  'greek-salad': 'greek-salad.svg',
  mojito: 'mojito.svg',
  lasagna: 'lasagna.svg',
  gnocchi: 'gnocchi.svg',
  bruschetta: 'bruschetta.svg',
  'panna-cotta': 'panna-cotta.svg',
  'tagliatelle-ragu': 'tagliatelle-ragu.svg',
  'ramen-tonkotsu': 'ramen-tonkotsu.svg',
  'sushi-maki': 'sushi-maki.svg',
  croissant: 'croissant.svg',
});

const SVG_RECIPE_RULES = [
  ['carbonara', /\b(spaghetti carbonara|carbonara tradizionale|carbonara tradycyjna|carbonara klasyczna|pasta alla carbonara)\b/],
  ['margherita', /\b(pizza margherita|margherita neapolitana|margherita classica|neapolitan margherita)\b/],
  ['tomato-soup', /\b(zupa pomidorowa|krem pomidorowy|tomato soup|pomidorowa)\b/],
  ['burger', /\b(burger klasyczny|burger wolowy|cheeseburger|hamburger wolowy|classic burger)\b/],
  ['greek-salad', /\b(salatka grecka|greek salad)\b/],
  ['mojito', /\bmojito\b/],
  ['lasagna', /\b(lasagne alla bolognese|lasagna bolognese|lasagne bolognese|lasagne tradycyjne|lasagne klasyczne|lasagna)\b/],
  ['gnocchi', /\b(gnocchi al pomodoro|gnocchi pomodoro|gnocchi z sosem pomidorowym|gnocchi)\b/],
  ['bruschetta', /\b(bruschetta al pomodoro|bruschetta z pomidorami|bruschetta)\b/],
  ['tagliatelle-ragu', /\b(tagliatelle al ragu|tagliatelle z ragu|tagliatelle bolognese|tagliatelle z sosem bolognese)\b/],
  ['panna-cotta', /\bpanna cotta\b/],
  ['ramen-tonkotsu', /\b(ramen tonkotsu|tonkotsu ramen|ramen wieprzowy tonkotsu)\b/],
  ['sushi-maki', /\b(sushi maki|maki sushi|salmon cucumber maki)\b/],
  ['croissant', /\b(croissant|rogalik maslany|rogal francuski)\b/],
];

export function recipeSvgKey(recipe) {
  if (!recipe || !recipe.name) return null;
  const name = normalise(recipe.name);
  for (const [key, pattern] of SVG_RECIPE_RULES) {
    if (pattern.test(name)) return key;
  }
  return null;
}

function attachSvg(img, key) {
  const file = SVG_FILES[key];
  if (!img || !file) return false;
  img.dataset.photoRequested = 'svg:' + key;
  img.classList.remove('art');
  img.dataset.photoSource = 'svg:' + key;
  img.src = new URL('./assets/food-svg/' + file, import.meta.url).href;
  return true;
}

const photoPromises = new Map();

function loadPhoto(key) {
  const file = PHOTO_FILES[key];
  if (!file) return Promise.resolve(null);
  if (!photoPromises.has(key)) {
    const url = new URL('./' + file, import.meta.url);
    photoPromises.set(key, fetch(url.href, { cache: 'force-cache' })
      .then((response) => {
        if (!response.ok) throw new Error('Brak zdjęcia: ' + key);
        return response.blob();
      })
      .then((blob) => {
        if (!blob.type.startsWith('image/') || blob.size < 1000) throw new Error('Nieprawidłowy plik zdjęcia: ' + key);
        return URL.createObjectURL(blob);
      })
      .catch(() => {
        photoPromises.delete(key);
        return null;
      }));
  }
  return photoPromises.get(key);
}

function attach(img, key, fallbackSvgKey = null) {
  if (!img || !key) return;
  img.dataset.photoRequested = key;
  loadPhoto(key).then((src) => {
    if (!img.isConnected || img.dataset.photoRequested !== key) return;
    if (src) {
      img.classList.remove('art');
      img.dataset.photoSource = key;
      img.src = src;
      return;
    }
    if (fallbackSvgKey) attachSvg(img, fallbackSvgKey);
  }).catch(() => {
    if (img.isConnected && img.dataset.photoRequested === key && fallbackSvgKey) attachSvg(img, fallbackSvgKey);
  });
}

export function recipePhotoKey(recipe) {
  if (!recipe || !recipe.name) return null;
  const name = normalise(recipe.name);
  for (const [key, pattern] of RECIPE_RULES) {
    if (pattern.test(name)) return key;
  }
  return null;
}

export function attachRecipePhoto(img, recipe) {
  // Własne zdjęcia użytkownika zawsze mają pierwszeństwo.
  if (!img || !recipe || recipe.thumb || recipe.photo) return;
  const photoKey = recipePhotoKey(recipe);
  const svgKey = recipeSvgKey(recipe);
  if (photoKey) {
    // Preferuj zdjęcie, ale w razie braku pliku pokaż lokalną ilustrację wektorową.
    attach(img, photoKey, svgKey);
    return;
  }
  if (svgKey) attachSvg(img, svgKey);
}

export function attachCategoryPhoto(img, categoryId) {
  attach(img, CATEGORY_PHOTOS[categoryId] || null);
}

export function hasFoodPhoto(recipe) {
  return !!(recipe && (recipe.thumb || recipe.photo || recipePhotoKey(recipe) || recipeSvgKey(recipe)));
}
