---
title: "[MVP] Pricing page content"
labels: "type: content, area: frontend, agent: ready"
---

## Stage
MVP

## High-Level Objective
Replace the placeholder text on `/pricing` with a real pricing table
sourced from the existing `services` and `products` content, so prices
live in one place rather than being duplicated as new hardcoded copy.

## Scope & System Boundaries

**In-Scope:**
- [ ] Render `/pricing` using the existing `services` array from `src/content/site.ts` for service pricing
- [ ] Render string pricing using the existing `products` array (same data already used in `ProductsSection`)
- [ ] If services don't currently have a `price` field, add one to the `ServiceItem` type and populate real values — don't invent a second pricing data structure

**Out-of-Scope:**
- [ ] Any checkout or payment functionality
- [ ] Dynamic/personalised pricing

## Dependencies & Architectural Context
- **Depends on:** None
- **Affected subsystems:** `src/app/pricing/page.tsx`, `src/types/content.ts` (if adding `price` to `ServiceItem`), `src/content/site.ts`

## Acceptance Criteria
- [ ] **GIVEN** a user opens `/pricing` **WHEN** the page loads **THEN** all services show a price sourced from `src/content/site.ts`, not hardcoded in the page component
- [ ] **GIVEN** the same data is used elsewhere (e.g. `ServicesSection` on the homepage) **WHEN** a price changes in `src/content/site.ts` **THEN** it updates consistently everywhere it's displayed

## Implementation Notes & Blueprint
- Don't create a separate `pricing.ts` content file — this would duplicate `services`/`products` and the two would inevitably drift. Extend the existing types/data instead.
- Use the existing `Card` primitive for layout consistency with the rest of the site

## Security, Validation & Edge Cases
- None beyond standard content accuracy — this is static/internal display data, no user input involved

## Definition of Done
- [ ] Acceptance criteria all checked
- [ ] No unrelated files changed
- [ ] Confirmed no duplicate pricing data structure was introduced
