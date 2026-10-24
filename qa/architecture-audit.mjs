import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const failures = [];
const requireText = (file, pattern, description) => {
  let source = '';
  try { source = read(file); } catch { failures.push(`Missing required file: ${file}`); return; }
  if (!pattern.test(source)) failures.push(`${file}: missing ${description}`);
};

requireText('index.html', /<title>Kuchnik<\/title>/, 'Kuchnik page title');
requireText('index.html', /viewport-fit=cover/, 'iPhone safe-area viewport support');
requireText('index.html', /apple-mobile-web-app-capable/, 'iOS standalone PWA support');
requireText('manifest.webmanifest', /"name":\s*"Kuchnik"/, 'Kuchnik install name');
requireText('manifest.webmanifest', /"short_name":\s*"Kuchnik"/, 'Kuchnik short install name');
requireText('recipes.js', /import\s*\{\s*SEED_CURATED\s*\}/, 'curated recipe collection import');
requireText('recipes.js', /parseSeeds\(SEED_CURATED,\s*f\)/, 'curated recipes added to seed catalog');
requireText('components.js', /attachRecipePhoto/, 'local recipe photography integration');
requireText('food-photos.js', /export function attachRecipePhoto/, 'local photo attachment API');
requireText('sw.js', /kucharzyna-1\.5\.0/, 'updated service-worker cache version');
requireText('sw.js', /seeds-curated\.js/, 'offline cache for curated recipes');
requireText('sw.js', /food-pizza\.jpg\.b64/, 'offline cache for local recipe photos');
requireText('util.js', /APP_VERSION = '1\.5\.0'/, 'application version aligned with service worker');

const requiredOfflineFiles = [
  'start-final.css', 'visual-system.css', 'kucharzyna-visual.css',
  'claude-completion.css', 'visual-redesign.css', 'generated-art.css',
  'zarlok-v2.css', 'design-overhaul.css', 'mobile-polish.css', 'art-direction.css',
  'seeds-curated.js', 'food-photos.js',
  'food-pizza.jpg.b64', 'food-carbonara.jpg.b64', 'food-focaccia.jpg.b64',
  'food-cocktail.jpg.b64', 'food-pasta-tomato.jpg.b64', 'food-pierogi.jpg.b64',
  'food-burger.jpg.b64', 'food-salmon.jpg.b64', 'food-aperol.jpg.b64',
  'food-asian-noodles.jpg.b64', 'food-baba-ganoush.jpg.b64', 'food-babka-piaskowa.jpg.b64',
];
for (const file of requiredOfflineFiles) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing offline asset: ${file}`);
}

// Kuchnik intentionally retains Pro/Amator modes: the amateur mode is a product requirement,
// not obsolete code. This audit protects the feature instead of banning its identifiers.
requireText('recipes.js', /mode:\s*'pro'/, 'default professional mode setting');
requireText('recipes.js', /amateur/, 'amateur mode setting');
requireText('app.js', /data-mode/, 'runtime mode application');

if (failures.length) {
  console.error('ARCHITECTURE AUDIT FAILED:\n' + failures.map((x) => '- ' + x).join('\n'));
  process.exit(1);
}
console.log('PASS: Kuchnik PWA architecture, curated recipes, local photos, offline assets and Pro/Amator mode are present.');
