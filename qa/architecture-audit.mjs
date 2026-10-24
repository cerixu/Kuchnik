import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const forbidden = [
  /\bamateur\b/i,
  /\bamator\b/i,
  /data-mode/i,
  /Tryb aplikacji/i,
  /Tryb amatora/i,
  /mode\s*:\s*['"]pro['"]/i,
  /getSetting\(\s*['"]mode['"]/i,
  /setSetting\(\s*['"]mode['"]/i,
];

function walk(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === '.git' || ent.name === 'node_modules') continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else if (/\.(js|css|html)$/.test(ent.name)) out.push(p);
  }
  return out;
}

const files = walk(root);
const hits = [];
for (const file of files) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (forbidden.some((re) => re.test(line))) {
      hits.push(path.relative(root, file) + ':' + (i + 1) + ': ' + line.trim());
    }
  });
}

if (hits.length) {
  console.error('OBSOLETE AMATEUR MODE REFERENCES FOUND:\n' + hits.join('\n'));
  process.exit(1);
}
console.log('PASS: amateur mode fully removed from runtime code');
