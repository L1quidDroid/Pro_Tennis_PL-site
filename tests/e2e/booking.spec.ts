import { test, expect } from "@playwright/test";

async function fillValidBooking(page: import("@playwright/test").Page) {
  await page.getByLabel("Name").fill("Jane Player");
  await page.getByLabel("Email").fill("jane@example.com");
  await page.getByLabel("Phone").fill("0494 515 456");
  await page.getByLabel("Preferred date").fill("2026-08-01");
  await page.getByRole("radio", { name: /standard restring/i }).check();
  await page.locator("#stringChoice").selectOption("Luxilon ALU Power 1.25");
  // Phone is optional; tension defaults to a valid 52/52 via the instrument.
}

test("submits a valid booking and shows the success state", async ({
  page,
}) => {
  // Mock the API so the test never depends on a real Resend key.
  await page.route("**/api/booking", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto("/booking");
  await fillValidBooking(page);
  await page.getByRole("button", { name: /request my booking/i }).click();

  await expect(page.getByRole("status")).toContainText(/booking received/i);
});

test("tension instrument is keyboard-operable and clamps to the valid range", async ({
  page,
}) => {
  await page.goto("/booking");

  const mains = page.getByRole("slider", { name: "Mains" });
  await expect(mains).toHaveAttribute("aria-valuenow", "52");

  // Arrow keys adjust by 1 lb; the control cannot exceed the 70 lb max.
  await mains.focus();
  await mains.press("ArrowRight");
  await expect(mains).toHaveAttribute("aria-valuenow", "53");
  await mains.press("End");
  await expect(mains).toHaveAttribute("aria-valuenow", "70");

  // Crosses are locked to mains by default (mirrors the value, not focusable).
  const crosses = page.getByRole("slider", { name: "Crosses" });
  await expect(crosses).toHaveAttribute("aria-valuenow", "70");
  await expect(crosses).toHaveAttribute("aria-disabled", "true");

  // Unlocking lets crosses be set independently.
  await page.getByRole("button", { name: /crosses matched to mains/i }).click();
  await expect(crosses).not.toHaveAttribute("aria-disabled", "true");
  await crosses.focus();
  await crosses.press("ArrowLeft");
  await expect(crosses).toHaveAttribute("aria-valuenow", "69");
  await expect(mains).toHaveAttribute("aria-valuenow", "70"); // mains unchanged
});

test("shows an error and allows retry when the API fails", async ({ page }) => {
  await page.route("**/api/booking", async (route) => {
    await route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({
        error: "We couldn't send your booking. Please try again.",
      }),
    });
  });

  await page.goto("/booking");
  await fillValidBooking(page);
  await page.getByRole("button", { name: /request my booking/i }).click();

  await expect(page.getByText(/couldn't send your booking/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /try again/i })).toBeVisible();
});
