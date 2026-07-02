import { z } from "zod";

/**
 * Booking form contract, shared by the client form (React Hook Form
 * resolver) and the server route handler. Defining it once here is what
 * lets server-side validation mirror the client exactly — the route must
 * never trust the client alone, so it re-parses the payload with the same
 * schema before doing anything with it.
 */

export const TENSION_MIN = 30;
export const TENSION_MAX = 70;

export const SERVICE_TYPES = ["standard", "express"] as const;
export type ServiceType = (typeof SERVICE_TYPES)[number];

const tension = z.coerce
  .number({ invalid_type_error: "Enter a tension in lbs" })
  .int("Use a whole number")
  .min(TENSION_MIN, `Tension must be at least ${TENSION_MIN} lbs`)
  .max(TENSION_MAX, `Tension must be at most ${TENSION_MAX} lbs`);

export const bookingSchema = z.object({
  name: z.string().trim().min(1, "Your name is required").max(100),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email"),
  // Optional: email is the confirmation channel, so requiring a phone
  // only adds friction (research links a required phone to sharply higher
  // abandonment). Validate the format only when one is actually given.
  phone: z
    .string()
    .trim()
    .max(20)
    .refine(
      (v) => v === "" || (v.length >= 6 && /^[0-9+()\-\s]+$/.test(v)),
      "Enter a valid phone number",
    )
    .optional(),
  preferredDate: z.string().min(1, "Choose a preferred date"),
  serviceType: z.enum(SERVICE_TYPES, {
    errorMap: () => ({ message: "Choose a service type" }),
  }),
  stringChoice: z.string().trim().min(1, "Choose a string"),
  tensionMain: tension,
  tensionCross: tension,
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  /**
   * Honeypot: a hidden field real users never see or fill. A non-empty
   * value means a bot filled every field it found, so we drop the request.
   */
  company: z.string().max(0).optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;
