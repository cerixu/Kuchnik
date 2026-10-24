import fs from 'node:fs';

const photosSource = fs.readFileSync('food-photos.js', 'utf8');
const photoFiles = new Map(
  [...photosSource.matchAll(/^\s*(['"]?[a-z][a-z0-9-]*['"]?)\s*:\s*'([^']+\.b64)'\s*,?\s*$/gm)]
    .map((match) => [match[1].replace(/['"]/g, ''), match[2]])
);
const recipeRulesBlock = photosSource.match(/const RECIPE_RULES = \[([\s\S]*?)\n\];/);
const categoryBlock = photosSource.match(/const CATEGORY_PHOTOS = Object\.freeze\(\{([\s\S]*?)\n\}\);/);
if (!recipeRulesBlock || !categoryBlock) throw new Error('Nie znaleziono map zdjęć do audytu.');

const ruleKeys = [...recipeRulesBlock[1].matchAll(/^\s*\['([^']+)'\s*,/gm)].map((match) => match[1]);
const categoryKeys = [...categoryBlock[1].matchAll(/^\s*['"]?([a-z][a-z0-9-]*)['"]?\s*:\s*'([^']+)'/gm)];
const duplicates = ruleKeys.filter((key, index) => ruleKeys.indexOf(key) !== index);
if (duplicates.length) throw new Error('Powtórzone klucze RECIPE_RULES: ' + [...new Set(duplicates)].join(', '));

for (const key of [...ruleKeys, ...categoryKeys.map((match) => match[2])]) {
  if (!photoFiles.has(key)) throw new Error('Reguła wskazuje nieistniejący klucz zdjęcia: ' + key);
}
const assetContents = new Map();
for (const [key, file] of photoFiles) {
  if (!fs.existsSync(file)) throw new Error('Brak pliku zdjęcia ' + key + ': ' + file);
  const raw = fs.readFileSync(file, 'utf8').trim();
  if (!raw.startsWith('/9j/') || raw.length < 1000) throw new Error('Nieprawidłowy JPEG base64: ' + file);
  const bytes = Buffer.from(raw, 'base64');
  if (bytes.length < 500 || bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[bytes.length - 2] !== 0xff || bytes[bytes.length - 1] !== 0xd9) {
    throw new Error('Uszkodzony strumień JPEG: ' + file);
  }
  const duplicateOf = assetContents.get(raw);
  if (duplicateOf) throw new Error('Dwa pliki zawierają identyczną fotografię: ' + duplicateOf + ' oraz ' + file);
  assetContents.set(raw, file);
}
const sauceCategory = categoryKeys.find((match) => match[1].replace(/[\'\"]/g, '') === 'cat-sosy');
if (!sauceCategory || sauceCategory[2] !== 'sauce') {
  throw new Error('Kategoria sosów musi korzystać z dedykowanego zdjęcia sosu, nie zdjęcia makaronu.');
}
if (/return CATEGORY_PHOTOS\[recipe\.category\] \|\| 'dessert'/.test(photosSource)) {
  throw new Error('Nieznana receptura nie może domyślnie dostawać zdjęcia deseru.');
}
console.log('Photo mapping QA passed: ' + photoFiles.size + ' zdjęć, ' + ruleKeys.length + ' unikalnych reguł, ' + categoryKeys.length + ' zdjęć kategorii.');
