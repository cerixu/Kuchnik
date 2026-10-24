/* Żarłok — mapowanie gotowych obrazów Firefly do nazw potraw.
 * Trzymane osobno od art.js: obecne SVG zostają fallbackiem offline.
 * Gdy oryginalne PNG trafią do assets/food, można przypisać je przepisom.
 */
export const FIREFLY_FOOD_ASSETS = Object.freeze({
  pizza: './assets/food/pizza-margherita.jpg',
  carbonara: './assets/food/tagliatelle-carbonara.jpg',
  risotto: './assets/food/mushroom-risotto.jpg',
  salmon: './assets/food/salmon-lemon-butter.jpg'
});

const MATCHERS = [
  [/\\bpizza\\b|margherita|marinara/i, 'pizza'],
  [/carbonara|tagliatelle alla gricia/i, 'carbonara'],
  [/risotto.*fung|fung.*risotto|risotto ai funghi|risotto grzyb/i, 'risotto'],
  [/łosoś|salmon/i, 'salmon']
];

export function fireflyAssetForRecipe(recipe) {
  const name = String((recipe && recipe.name) || '');
  for (const entry of MATCHERS) {
    if (entry[0].test(name)) return FIREFLY_FOOD_ASSETS[entry[1]];
  }
  return null;
}
