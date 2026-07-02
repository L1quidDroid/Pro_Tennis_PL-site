# Product

## Register

brand

Primary surface is a marketing site for a premium service business, so design carries the identity.
Note: task surfaces within it (the booking form, contact form) are **product**-register islands - design serves the task there, even though the site around them is brand-led.

## Users

Competitive and club tennis players in Melbourne who care about how their racquet plays: string type, tension, turnaround.
They arrive from search or word-of-mouth, often on mobile, deciding whether to trust a stringer with a racquet they rely on.
The job to be done: book a restring with confidence, or reach out with a question, without friction.

## Product Purpose

PRO Stringing sells tour-level racquet stringing led by a 35-year tour stringer (20 Grand Slam appearances, 3 Olympic Games).
The site exists to convert that credibility into bookings and enquiries.
Success = a player finishing the booking form and trusting that a real expert will handle their racquet.

## Brand Personality

Expert, precise, understated. The confidence of someone who has strung for the best and does not need to shout about it.
Three words: tour-grade, exacting, warm-professional.
Emotional goal: reassurance at the moment of handing over a prized racquet - "this person knows exactly what they are doing."

## Anti-references

- Generic SaaS form UI (Stripe-clone gray-on-white, no sense of place).
- Loud fitness/sports-brand energy (neon gradients, aggressive caps, hype).
- Cheap local-business template (clip-art, stock tennis photos, clutter).

## Design Principles

- **Precision as personality.** Tension in lbs, exact turnaround, calibrated machines - the craft is exact, so the UI should feel measured, not decorative.
- **Earned trust at the ask.** The booking form is the highest-stakes moment; every field and state should reassure, never introduce doubt.
- **One quiet motif.** The strung-racquet grid (`.string-grid`) is the single recurring tie back to the product; used sparingly, it does the identity work so the rest can stay calm.
- **Expert confidence, not hand-holding.** Speak the player's language (string names, tension) without over-explaining.

## Accessibility & Inclusion

WCAG AA minimum (4.5:1 body text), AAA where reachable - already a project standard.
Visible keyboard focus everywhere (gold outline, never removed for aesthetics).
Full `prefers-reduced-motion` support: any motion added must have a beautiful static alternative.
Native, accessible form controls preferred over custom widgets.
