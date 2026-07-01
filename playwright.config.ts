import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
const webServerPort = new URL(baseURL).port || "3000";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer: {
    command: `npm run dev -- --port ${webServerPort}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
