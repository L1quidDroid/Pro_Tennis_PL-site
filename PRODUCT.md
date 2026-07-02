# Product

## Register

brand

> The live, in-progress surface is a marketing + booking site where design carries the brand impression (hero, services, trust, conversion to "Book a Restring").
> The roadmap (`docs/context.md`) grows this into a self-serve operations platform - admin dashboard, customer accounts, CMS. When working those app surfaces, override the register to `product` for that task. Brand is the default because it describes the primary surface shipping today.

## Users

- **Player / customer** (primary): a Melbourne tennis player who needs a racquet restrung quickly with the right string and tension. Arrives on phone or desktop, often researching where to take a racquet before a match or tournament week. Cares about trust, turnaround (24-48h, same-day express), easy booking, and clear pricing.
- **Returning customer**: wants to re-book their usual string/tension fast. Cares about saved preferences, history, speed. (Served fully in Stage 2 accounts; the MVP should not design them out.)
- **Owner / stringer**: a 35-year tour stringer (20 Grand Slam appearances, 3 Olympic Games) who wants to run the business, not the website - see bookings at a glance, manage statuses, and edit content himself without a developer. (Stage 2 admin + CMS.)

## Product Purpose

PRO Stringing is a Melbourne racquet-stringing service whose differentiator is **tour-level expertise**: precision tension, premium strings, fast turnaround, one expert pair of hands. The website's job today is to make that expertise legible to a player in seconds and convert them into a booking. Its job at maturity is to be the business's operating system - book, pay, track, and manage online - so the MVP must be built so it doesn't have to be torn out to get there (data shapes anticipate persistence and payment; copy lives in one CMS-ready place).

Success for the brand surface: a first-time visitor trusts the expertise, understands the offer and price, and books without phoning - and the page never reads as a generic template.

## Brand Personality

Exacting, tour-grade, unshowy. The voice of a craftsman who has strung at the highest level and doesn't need to shout about it - quiet confidence over flash, precision over hype, local and human over corporate scale. Emotionally the site should evoke **trust and competence** (you're handing your racquet to a real expert) with an undercurrent of **athletic edge** (match-night, hard-court, tournament stakes). Premium, not luxury-precious; confident, not loud.

## Anti-references

- **Generic SaaS / corporate template** - navy-and-white, stock business photos, hero-metric blocks, identical icon-heading-text card grids. The existing tokens deliberately reject "a generic SaaS palette" (`tailwind.config.ts`); the layout should reject the matching shape.
- **Loud discount sport retailer** - big-box sporting-goods energy: red sale banners, clutter, price-shouting. This is a specialist, not a warehouse.
- **Trendy AI-startup** - gradient meshes, glassmorphism, oversized emoji, gradient text. The 2023-25 startup costume.
- **Cheap / amateur local business** - clip-art, default system fonts, inconsistent spacing. This rebuild exists to replace exactly that impression.

## Design Principles

1. **Show the expertise, don't claim it.** Let real credentials (Grand Slams, Olympics, tour years, named tour strings) and visible precision carry trust. No empty superlatives.
2. **Every brand surface earns the booking.** The page exists to move a player toward "Book a Restring." Conversion is the quiet throughline, never a hard sell.
3. **Build the MVP for the end state.** Marketing/booking surfaces should anticipate persistence, payment, accounts, and CMS - content stays editable in one place, data shapes stay forward-compatible.
4. **Quiet confidence beats flash.** Restraint here must read as premium and deliberate, never as timid or unfinished. Distinctive over safe.
5. **Local, human, one pair of hands.** Trust and turnaround over scale. The brand is a Melbourne specialist, not a chain.

## Accessibility & Inclusion

- **WCAG AA is the floor** (4.5:1 body text, 3:1 large text); prefer **AAA (7:1)** where the palette allows. Per `CLAUDE.md` and the `muted` token rationale, contrast is a hard requirement, not a nicety.
- Placeholder and secondary text held to the same 4.5:1 bar - no decorative light-gray-on-paper.
- Honor `prefers-reduced-motion` for any animation; provide a crossfade or instant fallback.
- Interactive controls (nav disclosure, booking form) keep accessible names, visible focus, and keyboard operability (the mobile nav already wires `aria-expanded`, Escape-to-close, and route-change close).
- Locale is `en_AU`.
