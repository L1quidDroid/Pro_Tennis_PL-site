import { test, expect } from "@playwright/test";

test("homepage loads and shows primary CTA", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/PRO Stringing/i);
  await expect(
    page.getByRole("link", { name: /book a restring now/i }).first(),
  ).toBeVisible();
});

test("booking link navigates to /booking", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: /book a restring now/i })
    .first()
    .click();

  await expect(page).toHaveURL(/\/booking/);
});
