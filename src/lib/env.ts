import { z } from "zod";

/**
 * Centralised, validated access to environment variables.
 *
 * Why this file exists: without it, a missing env var (e.g. a forgotten
 * RESEND_API_KEY) fails deep inside whichever feature uses it, with a
 * confusing stack trace, possibly in production. This module validates
 * everything once, at startup, and fails with a clear message naming
 * exactly which variable is missing.
 *
 * How to use it: import `env` from this file instead of reading
 * `process.env` directly anywhere else in the app. If a new feature
 * needs a new environment variable, add it to the relevant schema below
 * — don't reach for `process.env.X` ad hoc in a component or route.
 *
 * Public vs. server-only: anything prefixed `NEXT_PUBLIC_` is exposed to
 * the browser. Everything else (service-role keys, API secrets) must
 * only ever be read on the server (route handlers, server components).
 */

const serverEnvSchema = z.object({
  // Optional today — these become required once the booking/email
  // features that use them are implemented (see planned issues).
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  // The verified sender address transactional emails are sent from.
  // Defaults to Resend's shared onboarding sender for local/dev use;
  // set a verified domain address in production.
  RESEND_FROM_EMAIL: z
    .string()
    .min(1)
    .default("PRO Stringing <onboarding@resend.dev>"),
});

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
});

function parseEnv() {
  const serverResult = serverEnvSchema.safeParse(process.env);
  const publicResult = publicEnvSchema.safeParse(process.env);

  if (!serverResult.success || !publicResult.success) {
    const issues = [
      ...(serverResult.success ? [] : serverResult.error.issues),
      ...(publicResult.success ? [] : publicResult.error.issues),
    ];

    const message = issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(
      `Invalid or missing environment variables:\n${message}\n\n` +
        `Check .env.local against .env.example.`,
    );
  }

  return { ...serverResult.data, ...publicResult.data };
}

export const env = parseEnv();
