import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = [];
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === '.git' || ent.name === 'node_modules') continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (/\.m?js$/.test(ent.name)) files.push(p);
  }
}
walk(root);

const errors = [];
let checkedImports = 0;
for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  for (const match of source.matchAll(/(?:from\s*|import\s*)['"]([^'"]+)['"]/g)) {
    const spec = match[1];
    if (!spec.startsWith('./') && !spec.startsWith('../')) continue;
    checkedImports++;
    const target = path.resolve(path.dirname(file), spec);
    if (!fs.existsSync(target)) errors.push(path.relative(root, file) + ' -> missing ' + spec);
  }
}

const indexPath = path.join(root, 'index.html');
const manifestPath = path.join(root, 'manifest.webmanifest');
if (!fs.existsSync(indexPath)) errors.push('index.html is missing');
if (!fs.existsSync(manifestPath)) errors.push('manifest.webmanifest is missing');
if (fs.existsSync(indexPath)) {
  const html = fs.readFileSync(indexPath, 'utf8');
  if (!/type=["']module["']\s+src=["']app\.js["']/.test(html)) errors.push('index.html does not load app.js as a module');
  if (!/rel=["']manifest["']/.test(html)) errors.push('index.html does not link the PWA manifest');
}
if (fs.existsSync(manifestPath)) {
  let manifest;
  try { manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')); }
  catch { errors.push('manifest.webmanifest is not valid JSON'); }
  if (manifest) {
    if (manifest.display !== 'standalone') errors.push('PWA display must be standalone');
    if (!Array.isArray(manifest.icons) || !manifest.icons.some((x) => x.purpose === 'maskable')) errors.push('PWA maskable icon is missing');
  }
}

if (errors.length) {
  console.error('ARCHITECTURE AUDIT FAILED:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('PASS: ' + files.length + ' JS files scanned, ' + checkedImports + ' local imports resolved, PWA shell and manifest validated.');
