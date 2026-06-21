import { test, expect } from "./fixtures/axe-fixture";

/**
 * Scans every real route currently in the app. Add a new route here
 * whenever a new page ships — this is meant to stay in sync with
 * src/app/**, not just cover the homepage.
 */
const routesToTest = ["/", "/booking", "/contact", "/faq", "/pricing"];

test.describe("Automated accessibility scans (axe-core)", () => {
  for (const route of routesToTest) {
    test(`Route "${route}" has no automatically detectable WCAG violations`, async ({
      page,
      makeAxeBuilder,
    }) => {
      await page.goto(route);

      const accessibilityScanResults = await makeAxeBuilder().analyze();

      // CI fails here on contrast issues, missing alt text, invalid ARIA,
      // and other rules covered by the WCAG 2.0/2.1 A/AA tag sets.
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
