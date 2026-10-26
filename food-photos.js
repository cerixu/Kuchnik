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
  ['soup', /\b(rosol drobiowy|rosol wolowy|bulion drobiowy|zupa ogorkowa|krupnik|zupa grzybowa)\b/],
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
  'pizza-diavola': 'pizza-diavola.svg',
  'risotto-milanese': 'risotto-milanese.svg',
  'pierogi': 'pierogi.svg',
  'steak': 'steak.svg',
  'salmon': 'salmon.svg',
  'focaccia': 'focaccia.svg',
  'tiramisu': 'tiramisu.svg',
  'caesar-salad': 'caesar-salad.svg',
  'pho-bo': 'pho-bo.svg',
  'bibimbap': 'bibimbap.svg',
  'chicken-curry': 'chicken-curry.svg',
  'dumplings': 'dumplings.svg',
  'tacos': 'tacos.svg',
  'pancakes': 'pancakes.svg',
  'cheesecake': 'cheesecake.svg',
  'shakshuka': 'shakshuka.svg',
  'grilled-chicken': 'grilled-chicken.svg',
  'tuna-sashimi': 'tuna-sashimi.svg',
  'fries': 'fries.svg',
  'apple-pie': 'apple-pie.svg',
  'boeuf-bourguignon': 'boeuf-bourguignon.svg',
  'paella-marisco': 'paella-marisco.svg',
  'parmigiana-di-melanzane': 'parmigiana-di-melanzane.svg',
  'french-onion-soup': 'french-onion-soup.svg',
  'coq-au-vin': 'coq-au-vin.svg',
  'tom-yum': 'tom-yum.svg',
  'ratatouille': 'ratatouille.svg',
  'creme-brulee': 'creme-brulee.svg',
  'cacio-e-pepe': 'cacio-e-pepe.svg',
  'fish-and-chips': 'fish-and-chips.svg',
  'gulasz-wegierski': 'gulasz-wegierski.svg',
  'gambas-al-ajillo': 'gambas-al-ajillo.svg',
  'gnocchi-burro-salvia': 'gnocchi-burro-salvia.svg',
  'tarte-tatin': 'tarte-tatin.svg',
  'moussaka': 'moussaka.svg',
  'ramen-shoyu': 'ramen-shoyu.svg',
  'spaghetti-puttanesca': 'spaghetti-puttanesca.svg',
  'minestrone': 'minestrone.svg',
  'moules-mariniere': 'moules-mariniere.svg',
  'quiche-lorraine': 'quiche-lorraine.svg',
});

const SVG_RECIPE_RULES = [
  ['pizza-diavola', /\b(pizza diavola|diavola pizza|pizza salami pikantne)\b/],
  ['risotto-milanese', /\b(risotto alla milanese|risotto milanese|risotto szafranowe)\b/],
  ['pierogi', /\b(pierogi ruskie|pierogi z miesem|pierogi z kapusta i grzybami|pierogi)\b/],
  ['steak', /\b(steak frites|stek wolowy|stek z antrykotu|ribeye steak|filet mignon)\b/],
  ['salmon', /\b(losos pieczony|losos z cytryna|salmon fillet|grilled salmon)\b/],
  ['focaccia', /\b(focaccia)\b/],
  ['tiramisu', /\b(tiramisu)\b/],
  ['caesar-salad', /\b(salatka cezar|salatka caesar|caesar salad)\b/],
  ['pho-bo', /\b(pho bo|pho)\b/],
  ['bibimbap', /\b(bibimbap)\b/],
  ['chicken-curry', /\b(kurczak tikka masala|butter chicken|kurczak curry|tikka masala)\b/],
  ['dumplings', /\b(gyoza|japonskie pierozki|dumplings)\b/],
  ['tacos', /\b(tacos al pastor|tacos)\b/],
  ['pancakes', /\b(pancakes|nalesniki amerykanskie)\b/],
  ['cheesecake', /\b(sernik|cheesecake)\b/],
  ['shakshuka', /\b(shakshuka)\b/],
  ['grilled-chicken', /\b(kurczak z grilla|grilled chicken|grillowany kurczak)\b/],
  ['tuna-sashimi', /\b(sashimi z tunczyka|tuna sashimi|sashimi tuna)\b/],
  ['fries', /\b(frytki belgijskie|frytki|french fries)\b/],
  ['apple-pie', /\b(szarlotka|apple pie|apple tart)\b/],
  ['carbonara', /\b(spaghetti carbonara|carbonara tradizionale|carbonara tradycyjna|carbonara klasyczna|pasta alla carbonara)\b/],
  ['margherita', /\b(pizza margherita|margherita neapolitana|margherita classica|neapolitan margherita)\b/],
  ['tomato-soup', /\b(zupa pomidorowa|krem pomidorowy|tomato soup|pomidorowa)\b/],
  ['burger', /\b(burger klasyczny|burger wolowy|cheeseburger|hamburger wolowy|classic burger)\b/],
  ['greek-salad', /\b(salatka grecka|greek salad)\b/],
  ['mojito', /\bmojito\b/],
  ['lasagna', /\b(lasagne alla bolognese|lasagna bolognese|lasagne bolognese|lasagne tradycyjne|lasagne klasyczne|lasagna)\b/],
  ['gnocchi-burro-salvia', /\b(gnocchi z maslem szalwiowym|gnocchi burro e salvia|gnocchi al burro e salvia|gnocchi with sage butter)\b/],
  ['gnocchi', /\b(gnocchi al pomodoro|gnocchi pomodoro|gnocchi z sosem pomidorowym)\b/],
  ['tarte-tatin', /\b(tarte tatin|tarte tatin aux pommes|tarta tatin)\b/],
  ['moussaka', /\b(mussaka|moussaka|moussaka grecka|musaka)\b/],
  ['bruschetta', /\b(bruschetta al pomodoro|bruschetta z pomidorami|bruschetta)\b/],
  ['tagliatelle-ragu', /\b(tagliatelle al ragu|tagliatelle z ragu|tagliatelle bolognese|tagliatelle z sosem bolognese)\b/],
  ['panna-cotta', /\bpanna cotta\b/],
  ['spaghetti-puttanesca', /\b(spaghetti alla puttanesca|spaghetti puttanesca|pasta puttanesca|puttanesca)\b/],
  ['minestrone', /\b(minestrone|minestrone soup|zuppa minestrone)\b/],
  ['moules-mariniere', /\b(moules marinieres|moules mariniere|moules mariniere traditionnelles|mussels in white wine)\b/],
  ['quiche-lorraine', /\b(quiche lorraine|lorraine quiche)\b/],
  ['ramen-shoyu', /\b(ramen shoyu|shoyu ramen|ramen z sosem sojowym)\b/],
  ['ramen-tonkotsu', /\b(ramen tonkotsu|tonkotsu ramen|ramen wieprzowy tonkotsu)\b/],
  ['sushi-maki', /\b(sushi maki|maki sushi|salmon cucumber maki)\b/],
  ['croissant', /\b(croissant|rogalik maslany|rogal francuski)\b/],
  ['boeuf-bourguignon', /\b(boeuf bourguignon|beef bourguignon)\b/],
  ['paella-marisco', /\b(paella z owocami morza|paella de marisco|seafood paella)\b/],
  ['parmigiana-di-melanzane', /\b(parmigiana di melanzane|melanzane alla parmigiana|parmigiana z baklazanem)\b/],
  ['french-onion-soup', /\b(zupa cebulowa|francuska zupa cebulowa|french onion soup|soupe a l oignon)\b/],
  ['coq-au-vin', /\b(coq au vin|kurczak duszony w czerwonym winie)\b/],
  ['tom-yum', /\b(tom yum goong|tom yum|zupa tom yum)\b/],
  ['ratatouille', /\b(ratatouille|ratatuj)\b/],
  ['creme-brulee', /\b(creme brulee|creme brulee klasyczna|creme brulee waniliowa)\b/],
  ['cacio-e-pepe', /\b(cacio e pepe|cacio pepe|spaghetti cacio e pepe|tonnarelli cacio e pepe)\b/],
  ['fish-and-chips', /\b(fish and chips|fish chips|fish n chips|ryba z frytkami|dorsz z frytkami)\b/],
  ['gulasz-wegierski', /\b(gulasz wegierski|wegierski gulasz|hungarian goulash|goulash)\b/],
  ['gambas-al-ajillo', /\b(gambas al ajillo|gambas|krewetki al ajillo|krewetki z czosnkiem)\b/],
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
