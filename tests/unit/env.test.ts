import { describe, it, expect } from "vitest";

describe("env validation", () => {
  it("loads without throwing when no optional vars are set", async () => {
    // Optional vars are genuinely optional today, so an empty environment
    // should not throw. This guards against someone accidentally making
    // them required without updating the booking/email features first.
    await expect(import("@/lib/env")).resolves.toBeDefined();
  });
});
