import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(file, 'utf8');
const app = read('app.js');
const index = read('index.html');
const util = read('util.js');
const sw = read('sw.js');
const changelog = read('changelog.js');
const readme = read('README.md');

test('app, service worker, changelog and README use the same release version', () => {
  const appVersion = util.match(/APP_VERSION\s*=\s*['"]([^'"]+)['"]/)?.[1];
  const swVersion = sw.match(/const VERSION\s*=\s*['"]kucharzyna-([^'"]+)['"]/)?.[1];
  const readmeVersion = readme.match(/\*\*Aktualna wersja aplikacji:\s*([^*]+)\*\*/)?.[1]?.trim();

  assert.ok(appVersion, 'util.js must declare APP_VERSION');
  assert.equal(swVersion, appVersion, 'service-worker cache version must match APP_VERSION');
  assert.ok(changelog.includes("'" + appVersion + "'"), 'changelog must include the current release');
  assert.equal(readmeVersion, appVersion, 'README must report the current release version');
});

test('startup has bounded module-load and application-boot watchdogs', () => {
  assert.match(index, /timer = setTimeout\([\s\S]*?},\s*15000\);/, 'module loading must have a 15-second diagnostic');
  assert.match(index, /hardTimer = setTimeout\([\s\S]*?},\s*70000\);/, 'HTML shell must have a final 70-second watchdog');
  assert.match(index, /<script type="module" src="app\.js"><\/script>/, 'HTML shell must load the app entry module');

  assert.match(app, /startupDeadlineMs,\s*60000,\s*100,\s*60000/, 'application boot must have a 60-second global deadline');
  assert.match(app, /startupPhaseTimeoutMs,\s*32000,\s*50,\s*32000/, 'each startup phase must have a bounded timeout');
  assert.match(app, /await timed\('pełne uruchamianie aplikacji'/, 'the global deadline must wrap the full boot sequence');
  assert.match(app, /catch \(e\) \{\s*fatal\(e\);\s*\}/, 'startup failures must enter the diagnostic screen');
  assert.match(app, /bootEl\.classList\.add\('gone'\)/, 'successful boot must remove the splash overlay');
  assert.match(app, /window\.__kucharzyna = \{ state, ready: true \}/, 'ready state must be set after successful boot');
});
