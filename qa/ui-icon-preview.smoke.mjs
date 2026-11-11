import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const errors = [];

try {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  page.on('pageerror', (error) => errors.push(error.message));

  const response = await page.goto('http://127.0.0.1:4173/ui-icons-preview.html', {
    waitUntil: 'networkidle',
    timeout: 15000,
  });
  assert.ok(response && response.ok(), 'preview page should return HTTP 200');
  await page.locator('.ui-preview-icon').first().waitFor({ timeout: 8000 });

  assert.equal(await page.locator('.ui-preview-icon').count(), 64, 'all 64 UI icons should render');
  assert.equal(await page.locator('.ui-preview-controls > .ui-preview-control').count(), 4, 'four button variants should render');
  assert.equal(await page.locator('.ui-preview-icon-button').count(), 6, 'six icon-only controls should render');
  assert.equal(await page.locator('.ui-preview-tab').count(), 4, 'four bottom navigation samples should render');

  const result = await page.evaluate(() => ({
    pageTitle: document.title,
    iconSvgCount: document.querySelectorAll('.ui-preview-icon svg.ico-pencil').length,
    hatchBackground: getComputedStyle(document.querySelector('.ui-preview-control.primary'), '::after').backgroundImage,
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
    viewport: document.querySelector('meta[name="viewport"]')?.content || '',
  }));

  assert.equal(result.iconSvgCount, 64, 'all preview symbols should use pencil SVGs');
  assert.match(result.hatchBackground, /ui-pencil-hatch\.svg/, 'button texture should be present');
  assert.equal(result.horizontalOverflow, false, 'mobile preview must not scroll sideways');
  assert.match(result.viewport, /viewport-fit=cover/, 'preview should use iPhone safe-area viewport');
  assert.equal(errors.length, 0, 'preview should not emit JavaScript errors: ' + errors.join('; '));

  console.log('UI preview smoke: PASS (64 icons, button variants, mobile width, no JS errors)');
} finally {
  await browser.close();
}
