import { test, expect } from "@playwright/test";

async function fillValidBooking(page: import("@playwright/test").Page) {
  await page.getByLabel("Name").fill("Jane Player");
  await page.getByLabel("Email").fill("jane@example.com");
  await page.getByLabel("Phone").fill("0494 515 456");
  await page.getByLabel("Preferred date").fill("2026-08-01");
  await page.getByLabel("Service type").selectOption("standard");
  await page
    .getByLabel("String", { exact: true })
    .selectOption("Luxilon ALU Power 1.25");
  await page.getByLabel("Main tension (lbs)").fill("52");
  await page.getByLabel("Cross tension (lbs)").fill("50");
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
  await page.getByRole("button", { name: /request booking/i }).click();

  await expect(page.getByRole("status")).toContainText(/booking received/i);
});

test("blocks submission when tension is out of range", async ({ page }) => {
  let apiCalled = false;
  await page.route("**/api/booking", async (route) => {
    apiCalled = true;
    await route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) });
  });

  await page.goto("/booking");
  await fillValidBooking(page);
  await page.getByLabel("Main tension (lbs)").fill("80"); // above the 70 lb max

  await page.getByRole("button", { name: /request booking/i }).click();

  await expect(page.getByText(/at most 70 lbs/i)).toBeVisible();
  expect(apiCalled).toBe(false);
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
  await page.getByRole("button", { name: /request booking/i }).click();

  await expect(page.getByText(/couldn't send your booking/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /try again/i })).toBeVisible();
});
