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
        ink: "#0F1B2B", // primary dark surface / heading text
        court: "#1C4E63", // brand teal — hard-court blue
        "court-light": "#2C6E89",
        gold: "#C9A227", // trophy accent — used sparingly for CTAs/highlights
        paper: "#F6F4EF", // warm off-white surface
        line: "#D8D2C4", // hairline rule / divider color
        muted: "#5B6371", // secondary text — darkened from #6B7280 to clear WCAG AA (4.5:1) on bg-paper
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
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
