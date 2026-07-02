import type { Config } from "tailwindcss";

/**
 * Design tokens for the Pro Stringing rebuild.
 *
 * Palette is deliberately drawn from the subject: deep "match-night" ink,
 * hard-court teal, and trophy gold — not a generic SaaS palette. See
 * README "Design system" section before introducing new colors; extend
 * this file rather than hardcoding hex values in components.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#221E25", // warm charcoal — dark surface / heading text (warmed from navy for a softer, Typeform-minimal mood)
        court: "#1C4E63", // brand teal — hard-court blue
        "court-light": "#2C6E89",
        gold: "#C9A227", // trophy accent — used sparingly for CTAs/highlights
        paper: "#FAF9F7", // near-white surface (cleaned up from warm paper)
        line: "#E7E3DB", // hairline rule / divider color (lightened to a soft near-white seam)
        muted: "#5B6371", // secondary text — clears WCAG AA (4.5:1) on bg-paper
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        // Native system UI stack (SF on Apple, Segoe UI on Windows, Roboto on
        // Android) — the Instagram/large-app approach. No webfont load.
        body: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
