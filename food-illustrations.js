/* Ręcznie rysowane ilustracje kredką. Jedna precyzyjna grafika na przepis. */
export const FOOD_ILLUSTRATIONS = Object.freeze([
  { key: 'rosol-z-kury', name: 'Rosół z kury', filename: 'rosol-kredka.png', path: 'assets/food-illustrations/rosol-kredka.png', batch: 'Partia kredkowa 1', status: 'pending' },
  { key: 'kotlet-schabowy', name: 'Kotlet schabowy', filename: 'kotlet-schabowy-kredka.png', path: 'assets/food-illustrations/kotlet-schabowy-kredka.png', batch: 'Partia kredkowa 1', status: 'pending' },
  { key: 'pierogi-ruskie', name: 'Pierogi ruskie', filename: 'pierogi-ruskie-kredka.png', path: 'assets/food-illustrations/pierogi-ruskie-kredka.png', batch: 'Partia kredkowa 1', status: 'pending' },
  { key: 'zupa-pomidorowa', name: 'Zupa pomidorowa', filename: 'zupa-pomidorowa-kredka.png', path: 'assets/food-illustrations/zupa-pomidorowa-kredka.png', batch: 'Partia kredkowa 1', status: 'pending' },
  { key: 'zurek-na-zakwasie', name: 'Żurek na zakwasie', filename: 'zurek-kredka.png', path: 'assets/food-illustrations/zurek-kredka.png', batch: 'Partia kredkowa 2', status: 'pending' },
  { key: 'barszcz-czerwony', name: 'Barszcz czerwony', filename: 'barszcz-czerwony-kredka.png', path: 'assets/food-illustrations/barszcz-czerwony-kredka.png', batch: 'Partia kredkowa 2', status: 'pending' },
  { key: 'krem-z-dyni', name: 'Krem z dyni', filename: 'krem-z-dyni-kredka.png', path: 'assets/food-illustrations/krem-z-dyni-kredka.png', batch: 'Partia kredkowa 2', status: 'pending' },
  { key: 'kapusniak', name: 'Kapuśniak', filename: 'kapusniak-kredka.png', path: 'assets/food-illustrations/kapusniak-kredka.png', batch: 'Partia kredkowa 2', status: 'pending' },
  { key: 'bigos-staropolski', name: 'Bigos staropolski', filename: 'bigos-staropolski-kredka.png', path: 'assets/food-illustrations/bigos-staropolski-kredka.png', batch: 'Partia kredkowa 3', status: 'pending' },
  { key: 'golabki-pomidorowe', name: 'Gołąbki w sosie pomidorowym', filename: 'golabki-pomidorowe-kredka.png', path: 'assets/food-illustrations/golabki-pomidorowe-kredka.png', batch: 'Partia kredkowa 3', status: 'pending' },
  { key: 'gulasz-wegierski', name: 'Gulasz węgierski', filename: 'gulasz-wegierski-kredka.png', path: 'assets/food-illustrations/gulasz-wegierski-kredka.png', batch: 'Partia kredkowa 3', status: 'pending' },
  { key: 'szakszuka', name: 'Szakszuka', filename: 'szakszuka-kredka.png', path: 'assets/food-illustrations/szakszuka-kredka.png', batch: 'Partia kredkowa 3', status: 'pending' },
  { key: 'salatka-grecka', name: 'Sałatka grecka', filename: 'salatka-grecka-kredka.png', path: 'assets/food-illustrations/salatka-grecka-kredka.png', batch: 'Partia kredkowa 4', status: 'pending' },
  { key: 'salatka-caprese', name: 'Sałatka caprese', filename: 'salatka-caprese-kredka.png', path: 'assets/food-illustrations/salatka-caprese-kredka.png', batch: 'Partia kredkowa 4', status: 'pending' },
  { key: 'salatka-cezar', name: 'Sałatka Cezar', filename: 'salatka-cezar-kredka.png', path: 'assets/food-illustrations/salatka-cezar-kredka.png', batch: 'Partia kredkowa 4', status: 'pending' },
  { key: 'mizeria', name: 'Mizeria', filename: 'mizeria-kredka.png', path: 'assets/food-illustrations/mizeria-kredka.png', batch: 'Partia kredkowa 4', status: 'pending' },
]);
const normalise = (value) => String(value || '').toLocaleLowerCase('pl').replace(/ł/g, 'l').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const RECIPE_NAMES = new Map(FOOD_ILLUSTRATIONS.map((item) => [normalise(item.name), item]));
export function illustrationForRecipe(recipe) {
  if (!recipe || !recipe.name) return null;
  return RECIPE_NAMES.get(normalise(recipe.name)) || null;
}
