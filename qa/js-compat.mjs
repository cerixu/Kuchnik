import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const ignored = new Set(['.git', 'node_modules']);
const files = [];

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (/\.(?:js|mjs)$/.test(ent.name)) files.push(full);
  }
}

walk(root);
const failures = [];
for (const file of files) {
  const check = spawnSync(process.execPath, ['--experimental-default-type=module', '--check', file], {
    cwd: root,
    encoding: 'utf8',
  });
  if (check.status !== 0) {
    failures.push({
      file: path.relative(root, file),
      message: (check.stderr || check.stdout || 'Syntax check failed').trim(),
    });
  }

  const source = fs.readFileSync(file, 'utf8');
  const imports = /(?:from\s*|import\s*)['"]([^'"]+)['"]/g;
  for (const match of source.matchAll(imports)) {
    const specifier = match[1];
    if (!specifier.startsWith('.')) continue;
    const resolved = path.resolve(path.dirname(file), specifier);
    if (!fs.existsSync(resolved)) failures.push({
      file: path.relative(root, file),
      message: `Missing local import: ${specifier}`,
    });
  }
}

if (failures.length) {
  console.error('JS COMPATIBILITY AUDIT FAILED:\n' + failures.map((x) => `- ${x.file}: ${x.message}`).join('\n'));
  process.exit(1);
}
console.log(`PASS: syntax and local imports checked for ${files.length} JavaScript modules.`);
