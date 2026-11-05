/* Ręcznie rysowane ilustracje kredką. Jedna precyzyjna grafika na przepis. */
export const FOOD_ILLUSTRATIONS = Object.freeze([
  { key: 'rosol-z-kury', name: 'Rosół z kury', filename: 'rosol-kredka.png', path: 'assets/food-illustrations/rosol-kredka.png', batch: 'Partia kredkowa 1', status: 'pending' },
  { key: 'kotlet-schabowy', name: 'Kotlet schabowy', filename: 'kotlet-schabowy-kredka.png', path: 'assets/food-illustrations/kotlet-schabowy-kredka.png', batch: 'Partia kredkowa 1', status: 'pending' },
  { key: 'pierogi-ruskie', name: 'Pierogi ruskie', filename: 'pierogi-ruskie-kredka.png', path: 'assets/food-illustrations/pierogi-ruskie-kredka.png', batch: 'Partia kredkowa 1', status: 'pending' },
  { key: 'zupa-pomidorowa', name: 'Zupa pomidorowa', filename: 'zupa-pomidorowa-kredka.png', path: 'assets/food-illustrations/zupa-pomidorowa-kredka.png', batch: 'Partia kredkowa 1', status: 'pending' },
]);
const normalise = (value) => String(value || '').toLocaleLowerCase('pl').replace(/ł/g, 'l').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const RECIPE_NAMES = new Map(FOOD_ILLUSTRATIONS.map((item) => [normalise(item.name), item]));
export function illustrationForRecipe(recipe) {
  if (!recipe || !recipe.name) return null;
  return RECIPE_NAMES.get(normalise(recipe.name)) || null;
}
