import { describe, it, expect } from "vitest";

import { bookingSchema } from "@/lib/validations/booking";

const validInput = {
  name: "Jane Player",
  email: "jane@example.com",
  phone: "0494 515 456",
  preferredDate: "2026-08-01",
  serviceType: "standard",
  stringChoice: "Luxilon ALU Power 1.25",
  tensionMain: 52,
  tensionCross: 50,
  notes: "Wilson Blade, please.",
  company: "",
};

describe("bookingSchema", () => {
  it("accepts a fully valid booking", () => {
    const result = bookingSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("coerces numeric strings for tension (form inputs arrive as strings)", () => {
    const result = bookingSchema.safeParse({
      ...validInput,
      tensionMain: "52",
      tensionCross: "50",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.tensionMain).toBe(52);
    }
  });

  it("rejects tension below the 30 lb minimum", () => {
    const result = bookingSchema.safeParse({ ...validInput, tensionMain: 29 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === "tensionMain")).toBe(
        true,
      );
    }
  });

  it("rejects tension above the 70 lb maximum", () => {
    const result = bookingSchema.safeParse({ ...validInput, tensionCross: 71 });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = bookingSchema.safeParse({
      ...validInput,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a missing name", () => {
    const result = bookingSchema.safeParse({ ...validInput, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown service type", () => {
    const result = bookingSchema.safeParse({
      ...validInput,
      serviceType: "premium",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a filled honeypot field", () => {
    const result = bookingSchema.safeParse({
      ...validInput,
      company: "bot inc",
    });
    expect(result.success).toBe(false);
  });

  it("treats phone as optional (empty string is allowed)", () => {
    const result = bookingSchema.safeParse({ ...validInput, phone: "" });
    expect(result.success).toBe(true);
  });

  it("still rejects a malformed phone when one is provided", () => {
    const result = bookingSchema.safeParse({ ...validInput, phone: "abc" });
    expect(result.success).toBe(false);
  });

  it("treats notes as optional", () => {
    const { notes: _notes, ...withoutNotes } = validInput;
    const result = bookingSchema.safeParse(withoutNotes);
    expect(result.success).toBe(true);
  });
});
