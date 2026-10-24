#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const files = fs.readdirSync(root).filter((f) => f.endsWith('.js')).sort();
const bad = [];
for (const file of files) {
  try { execFileSync(process.execPath, ['--check', path.join(root, file)], { stdio: 'pipe' }); }
  catch (e) { bad.push(file + ': ' + String(e.stderr || e.stdout || e.message).trim()); }
}
const source = files.map((f) => fs.readFileSync(path.join(root, f), 'utf8')).join('\n');
const patterns = [
  ['findLast', /\.findLast\s*\(/],
  ['toSorted', /\.toSorted\s*\(/],
  ['toReversed', /\.toReversed\s*\(/],
  ['Object.hasOwn', /Object\.hasOwn\s*\(/],
];
const flagged = patterns.filter(([, re]) => re.test(source)).map(([name]) => name);
if (bad.length) { console.error('JS syntax failures:\n' + bad.join('\n')); process.exit(1); }
console.log('PASS: Node syntax check for ' + files.length + ' JS files');
console.log(flagged.length ? 'Compatibility review needed: ' + flagged.join(', ') : 'No high-risk modern JS patterns found');
