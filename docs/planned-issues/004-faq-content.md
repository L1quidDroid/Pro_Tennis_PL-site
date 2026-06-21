---
title: "[MVP] FAQ page content"
labels: "type: content, area: frontend, agent: ready"
---

## Stage
MVP

## High-Level Objective
Replace the placeholder text on `/faq` with real, structured FAQ
content sourced from a content file, matching the project's
content-separate-from-components convention.

## Scope & System Boundaries

**In-Scope:**
- [ ] New `src/content/faq.ts` exporting a typed array of `{ question, answer }`
- [ ] New type in `src/types/content.ts` for the FAQ item shape
- [ ] Render the list on `/faq` as an accessible accordion (each question expandable, only one open at a time or independent — either is fine, pick one and be consistent)
- [ ] At least 6 real questions covering: turnaround time, pricing basics, string options, drop-off vs. mail-in, what to bring, cancellation policy

**Out-of-Scope:**
- [ ] Search/filter functionality on the FAQ list
- [ ] CMS integration — content stays in the TS file for now

## Dependencies & Architectural Context
- **Depends on:** None
- **Affected subsystems:** `src/app/faq/page.tsx`, new `src/content/faq.ts`, `src/types/content.ts`

## Acceptance Criteria
- [ ] **GIVEN** a user opens `/faq` **WHEN** the page loads **THEN** all FAQ items render from `src/content/faq.ts`, not hardcoded JSX
- [ ] **GIVEN** a user clicks a question **WHEN** it's currently collapsed **THEN** the answer expands, with `aria-expanded` updated on the trigger
- [ ] **GIVEN** a keyboard-only user **WHEN** tabbing through the page **THEN** each question is focusable and operable via Enter/Space

## Implementation Notes & Blueprint
- Follow the existing content-file pattern in `src/content/site.ts` — plain data, no JSX, no logic
- If an accordion UI primitive doesn't exist yet in `src/components/ui/`, add one (or use `npx shadcn add accordion` — check the canonical-primitives note in CONTRIBUTING.md first)

## Security, Validation & Edge Cases
- None beyond standard accessibility requirements above

## Definition of Done
- [ ] Acceptance criteria all checked
- [ ] Unit test confirming an FAQ item expands on click
- [ ] No unrelated files changed
