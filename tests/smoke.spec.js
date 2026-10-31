// Full-route smoke test: load every real route in the app with external network blocked, and assert there
// are no page/console errors, no failed or 4xx/5xx same-origin requests, and no horizontal overflow. The
// route list is generated from the same data files the app itself loads (see gen-routes.mjs via
// `npm run pretest`), so it can't drift out of date with content.
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const routesFile = path.join(HERE, 'routes.generated.json');
if (!fs.existsSync(routesFile)) {
  throw new Error('tests/routes.generated.json is missing — run `npm run pretest` (or `node tests/gen-routes.mjs`) first.');
}
const routes = JSON.parse(fs.readFileSync(routesFile, 'utf8'));

const EXTERNAL_HOST = /^https?:\/\/(?!localhost)/i;
// The generic line Chrome logs for every failed resource load, with no URL attached — expected for every
// externally-hosted request this test deliberately blocks (KaTeX/Google Fonts CDNs; the app already degrades
// gracefully without them, see js/app.js's renderMath guard). Same-origin failures are still caught below,
// via requestfailed/response, which do carry the URL.
const GENERIC_RESOURCE_FAILURE = /^Failed to load resource: net::ERR_/i;

test.describe('route smoke test', () => {
  for (const route of routes) {
    test(`loads cleanly: ${route}`, async ({ page }, testInfo) => {
      const errors = [];
      const sameOriginFailures = [];
      const badResponses = [];

      page.on('pageerror', e => errors.push(`[pageerror] ${e.message}`));
      page.on('console', msg => {
        if (msg.type() !== 'error' || GENERIC_RESOURCE_FAILURE.test(msg.text())) return;
        errors.push(`[console] ${msg.text()}`);
      });
      page.on('requestfailed', req => {
        if (EXTERNAL_HOST.test(req.url())) return; // blocked on purpose below
        sameOriginFailures.push(`${req.url()} — ${req.failure()?.errorText}`);
      });
      page.on('response', res => {
        if (EXTERNAL_HOST.test(res.url()) || res.status() < 400) return;
        badResponses.push(`${res.url()} — ${res.status()}`);
      });
      await page.route(EXTERNAL_HOST, r => r.abort());

      await page.goto(`/index.html#${encodeURI(route).replace(/%23/g, '#')}`, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('load');
      await page.waitForTimeout(250); // let the router's synchronous render settle

      expect(sameOriginFailures, `same-origin requests that failed on ${route}`).toEqual([]);
      expect(badResponses, `same-origin 4xx/5xx responses on ${route}`).toEqual([]);
      expect(errors, `console/page errors on ${route}`).toEqual([]);

      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      const viewportWidth = testInfo.project.use.viewport.width;
      expect(scrollWidth, `horizontal overflow on ${route} at ${viewportWidth}px (scrollWidth ${scrollWidth} > clientWidth ${clientWidth})`)
        .toBeLessThanOrEqual(clientWidth + 1); // +1 for sub-pixel rounding
    });
  }
});
