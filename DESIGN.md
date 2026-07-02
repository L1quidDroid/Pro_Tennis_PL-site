---
name: PRO Stringing
description: Tour-level racquet stringing, strung in Melbourne - exacting, premium, unshowy.
colors:
  ink: "#221E25"
  court: "#1C4E63"
  court-light: "#2C6E89"
  gold: "#C9A227"
  paper: "#FAF9F7"
  line: "#E7E3DB"
  muted: "#5B6371"
typography:
  display:
    fontFamily: "Fraunces, serif"
    fontSize: "clamp(2rem, 5vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Fraunces, serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  body:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.02em"
rounded:
  md: "6px"
  DEFAULT: "8px"
spacing:
  gutter: "24px"
  gutter-wide: "32px"
  grid-unit: "24px"
components:
  button-default:
    backgroundColor: "{colors.court}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "8px 20px"
    height: "40px"
  button-default-hover:
    backgroundColor: "{colors.court-light}"
    textColor: "{colors.paper}"
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px 20px"
    height: "40px"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px 20px"
    height: "40px"
  button-ghost:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px 20px"
    height: "40px"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  nav-link-hover:
    textColor: "{colors.court}"
---

# Design System: PRO Stringing

## 1. Overview

**Creative North Star: "The Tour Stringer's Bench"**

This is the workbench of a craftsman who has strung at twenty Grand Slams and three Olympics, photographed under match-night light: precise, premium, and entirely without theatrics.
The system speaks in the voice of expertise that doesn't need to raise its voice - warm-charcoal dark surfaces, hard-court teal, and a single restrained note of trophy gold on a soft near-white ground, held together by rounded, minimal shape.
Every surface should make a player trust the hands before they read a word, and then move them quietly toward booking a restring.

The aesthetic is _committed restraint_: confident typography, generous space, one signature texture (a faint strung-racquet grid), and color used with discipline rather than decoration.
It explicitly rejects the four anti-references in PRODUCT.md - generic navy-and-white SaaS templates, loud discount sporting-goods clutter, trendy AI-startup gradient-and-glass, and cheap clip-art amateurism.
Warmth and athletic edge come from type, contrast, and the texture motif, never from gradient meshes or decorative effects.

**Key Characteristics:**

- Quiet confidence: premium without luxury-preciousness, athletic without shouting.
- Disciplined color: teal is the brand voice, gold is the rare accent (≤10%), ink and paper carry everything else.
- One signature motif: the `.string-grid` texture, used at most once per page.
- Accessibility as identity: WCAG AA is the floor, AAA the goal; the gold focus ring is never removed.

## 2. Colors

A grounded, athletic palette drawn from the subject itself - hard-court, trophy - on a soft near-white ground with warm-charcoal dark surfaces, never a generic SaaS spectrum. The charcoal was warmed from the original navy and the paper cleaned toward near-white to give the system a softer, more minimal (Typeform-adjacent) feel while keeping teal and gold as the identity.

### Primary

- **Hard-Court Teal** (#1C4E63): the brand voice. Primary buttons, links, hover targets, and any interactive accent that isn't the headline CTA. This is the color a visitor should associate with the business.
- **Hard-Court Teal, Lit** (#2C6E89): the hover/active state of teal surfaces only. Never used as a resting fill.

### Secondary

- **Trophy Gold** (#C9A227): the accent. Reserved for the headline CTA ("Book a Restring"), the keyboard focus ring, and rare highlight moments. Its scarcity is the point.

### Neutral

- **Warm Charcoal Ink** (#221E25): heading text, dark surfaces (hero, stat band, CTA text, footer), and the deepest tone in the system. A warm near-black rather than a cold navy - softer, more premium, still high-contrast for text.
- **Near-White Paper** (#FAF9F7): the body background and light surfaces. A clean, barely-warm near-white - the calm ground the teal and gold sit on.
- **String Line** (#E7E3DB): hairline rules, dividers, card borders, and the strung-grid texture. A soft near-white seam. Structure, never text.
- **Slate Muted** (#5B6371): secondary and supporting text only. Deliberately darkened from a generic gray to clear WCAG AA (4.5:1) on Near-White Paper. Do not lighten it.

### Named Rules

**The One Gold Rule.** Trophy Gold appears on at most ~10% of any screen - the primary CTA and the focus ring. The moment gold decorates a second element, it stops reading as "the trophy" and becomes noise.

**The No-Faded-Text Rule.** Secondary text uses Slate Muted (#5B6371) at full strength, never a lighter gray "for elegance." Placeholder and helper text hold the same 4.5:1 bar as body copy.

## 3. Typography

**Display Font:** Fraunces (serif)
**Body / UI Font:** System UI stack (San Francisco on Apple, Segoe UI on Windows, Roboto on Android)
**Numeric / Mono Font:** IBM Plex Mono (monospace)

**Character:** A three-voice system. Fraunces brings warmth and a hand-cut, slightly editorial authority to headings and the wordmark. The body and navigation use the native system UI font - the same approach Instagram and most large apps take - which renders as San Francisco on Apple devices for a crisp, familiar, zero-load reading face. IBM Plex Mono does what it does best: real numerics (stats, prices, tensions, turnaround) and the certified-stringer kicker, where the instrument-panel feel earns its place. Serif heads over a clean system body, with mono reserved for figures - preserve this pairing.

### Hierarchy

- **Display** (Fraunces, 600, clamp(2rem → 3.75rem), line-height 1.05, tracking -0.02em): hero and page-title headings (`h1`). `text-wrap: balance` recommended.
- **Headline** (Fraunces, 600, clamp(1.5rem → 2.25rem), line-height 1.15): section headings (`h2`/`h3`).
- **Body** (System UI stack, 400, 1rem, line-height 1.6): all running copy and navigation. Cap measure at 65-75ch.
- **Label / Numeric** (IBM Plex Mono, 500, 0.875rem, tracking 0.02em): trust stats, prices, tensions, and the kicker. Use `tabular-nums` so figures align. Mono signals a real value - it is not a costume for "technical" body text.

### Named Rules

**The Serif-Heads Rule.** Headings (`h1`-`h3`) and the wordmark are always Fraunces; running copy and nav use the system UI font. Don't set a heading in the system font or body copy in Fraunces.

**The Mono-Means-Number Rule.** IBM Plex Mono signals a real value (tension, hours, price, count) or the single certified-stringer kicker. If it isn't a number or that one metadata line, it's the system UI font - never mono as a "technical" costume for prose.

## 4. Elevation & Shape

The system is flat by default. Depth comes from tonal layering (charcoal surfaces and String Line borders on Near-White Paper) and from **soft rounded shape**, not from shadows.

**Rounded shape is now a core structural device** (the minimal, Typeform-adjacent softness):

- **Section seams:** where a dark (charcoal/teal) band meets the near-white ground, round the seam - the stat band closes with a `rounded-b-[2rem]/[2.75rem]`, the footer opens with a matching `rounded-t`, and the CTA is an **inset rounded card** (`rounded-[2rem]/[2.5rem]` teal block floating on paper with whitespace around it) rather than a full-bleed band. This soft banding, plus generous whitespace, carries the rhythm that hard divider rules used to.
- **Cards:** `rounded-2xl` (16px), flat at rest, with a hover lift.
- **Buttons:** full pills (`rounded-full`).

Shadow is still rare: the mobile-nav disclosure panel gets a tight, ink-tinted separation shadow (`0 16px 32px -16px rgba(34,30,37,0.35)`) so it reads as a distinct surface over content; product cards lift on hover. There is no shadow scale beyond this.

### Named Rules

**The Flat-But-Soft Rule.** Surfaces are flat at rest; structure comes from rounded shape, whitespace, and String Line borders rather than shadows. The only lifts are the open mobile-nav panel and the product-card hover.

**The Gold-Focus Rule.** Keyboard focus is a 2px Trophy Gold outline with a 2px offset (`:focus-visible`), applied globally. It is never removed for aesthetics - it is part of the brand's accessibility identity.

## 5. Components

### Buttons

- **Shape:** Full pills (`rounded-full`). Height 40px default; small 36px, large 48px.
- **Primary (default):** Hard-Court Teal fill, Near-White text. Hover shifts to Hard-Court Teal Lit (#2C6E89). The workhorse action.
- **Gold:** Trophy Gold fill, Warm Charcoal Ink text, hover at 90% gold. Reserved for the single highest-intent action per view ("Book a Restring"). One per view, per The One Gold Rule.
- **Outline / Ghost:** Transparent on Near-White, Ink text, hover fills with String Line at 30% (on dark surfaces, a `paper/25` border with a `paper/10` hover). Secondary and tertiary actions.
- **Link:** Hard-Court Teal text, underline on hover.
- **Focus:** Gold focus ring (see Elevation), never suppressed.

### Navigation

- **Style:** System UI font (medium), matching the body/UI voice. The Fraunces wordmark sits beside it for a serif/system-sans contrast in the header. Desktop nav is a horizontal row at `md` and up; below `md` it collapses into the mobile-nav disclosure (hamburger → full-width panel beneath the header).
- **Default / Hover:** Links rest at **full Warm Charcoal Ink** (AAA on Near-White Paper) and shift to Hard-Court Teal on hover/focus. On mobile, each link is a full-width row that also picks up a String Line tint (`line/40`) on hover/focus, giving a clear touch target beyond the color change. Full Ink at rest is deliberate: it is the highest-contrast, crispest state, and teal is reserved as the hover affordance.
- **Disclosure motion:** Opening the mobile panel runs a 280ms slide-and-fade (`translateY(-0.75rem)` → `0`, opacity `0` → `1`) on an ease-out-expo curve (`cubic-bezier(0.16, 1, 0.3, 1)`); closing plays the reverse before the panel unmounts. The hamburger morphs into a close (`X`) glyph via a synchronized rotate/scale/fade. Reduced motion collapses all of this to an instant show/hide.
- **States:** The disclosure button carries `aria-expanded`; the panel closes on link tap, Escape (returning focus to the toggle), and route change, with a Gold focus ring throughout.

### Signature Texture - The String Grid

- A faint 24px repeating linear-gradient grid in String Line at 40% opacity (`.string-grid`), evoking a strung racquet face.
- The one recurring motif tying the UI back to the product. Use at most one section per page; it is a background accent, never a foreground pattern.

## 6. Do's and Don'ts

### Do:

- **Do** keep Hard-Court Teal as the single brand voice and let Trophy Gold stay rare (≤10% of any screen, per The One Gold Rule).
- **Do** hold all text to WCAG AA (4.5:1) as a floor and prefer AAA (7:1); use Slate Muted (#5B6371) at full strength for secondary text and never lighter.
- **Do** set headings and the wordmark in Fraunces, body and nav in the system UI font, and reserve IBM Plex Mono for real numeric values and the kicker (using `tabular-nums` for figures).
- **Do** convey depth with tonal layering and String Line borders; keep surfaces flat by default.
- **Do** preserve the global Gold focus ring on every interactive element.
- **Do** use the `.string-grid` motif sparingly - at most one section per page.

### Don't:

- **Don't** drift into a **generic navy-and-white SaaS template** - no hero-metric blocks, no endless identical icon-heading-text card grids, no stock business photography.
- **Don't** adopt **loud discount sporting-goods** energy - no red sale banners, no price-shouting clutter. This is a specialist, not a warehouse.
- **Don't** use the **trendy AI-startup** costume - no gradient meshes, no glassmorphism, no `background-clip: text` gradient text. Glass/blur is for the header translucency only.
- **Don't** ship anything that reads as **cheap or amateur** - no clip-art, no default system fonts, no inconsistent spacing. This rebuild exists to replace that impression.
- **Don't** add side-stripe `border-left` accents, arbitrary z-index values, or shadows where a border would do.
- **Don't** lighten Slate Muted or set body text below 4.5:1 contrast on Near-White Paper "for elegance" - it is the single biggest readability failure and this brand's accessibility bar forbids it.
