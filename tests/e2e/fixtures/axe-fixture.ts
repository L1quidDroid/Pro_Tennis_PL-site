import { test as base } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Reusable accessibility scanner for Playwright tests. Extends the base
 * test object so every test gets a consistently configured AxeBuilder
 * (same WCAG tags) instead of each test file rolling its own.
 */
type AxeFixture = {
  makeAxeBuilder: () => AxeBuilder;
};

export const test = base.extend<AxeFixture>({
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () =>
      new AxeBuilder({ page }).withTags([
        "wcag2a",
        "wcag2aa",
        "wcag21a",
        "wcag21aa",
      ]);

    await use(makeAxeBuilder);
  },
});

export { expect } from "@playwright/test";
