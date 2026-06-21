---
title: "[MVP] Mobile navigation menu"
labels: "type: feature, area: frontend, agent: ready"
---

## Stage
MVP

## High-Level Objective
The header navigation is currently hidden below the `md` breakpoint with
no replacement — mobile visitors cannot navigate the site at all except
via the homepage anchor links. Add an accessible mobile nav disclosure.

## Scope & System Boundaries

**In-Scope:**
- [ ] A menu button (hamburger icon) visible only below `md` breakpoint, in `src/components/layout/header.tsx`
- [ ] Clicking it opens a full-width disclosure panel listing the same links as `navLinks` in `src/content/site.ts`
- [ ] The booking CTA button remains visible at all breakpoints (already is — don't change that)
- [ ] Closing via: tapping the button again, tapping a link, or pressing Escape

**Out-of-Scope:**
- [ ] Animations beyond a simple open/close transition
- [ ] Any change to desktop nav behaviour

## Dependencies & Architectural Context
- **Depends on:** None
- **Affected subsystems:** `src/components/layout/header.tsx`
- **Data models:** None — reuses existing `navLinks` from `src/content/site.ts`

## Acceptance Criteria
- [ ] **GIVEN** viewport width is below the `md` breakpoint **WHEN** the page loads **THEN** a menu button is visible and the desktop nav links are hidden
- [ ] **GIVEN** the mobile menu is closed **WHEN** the menu button is tapped **THEN** the disclosure panel opens and lists all `navLinks`
- [ ] **GIVEN** the mobile menu is open **WHEN** Escape is pressed, a link is tapped, or the button is tapped again **THEN** the panel closes
- [ ] **GIVEN** the mobile menu is open **WHEN** a screen reader user navigates **THEN** the button has `aria-expanded` reflecting state and the panel has an accessible name

## Implementation Notes & Blueprint
- Use a controlled `useState` for open/closed — no need for a global state library
- Follow existing Tailwind/utility patterns already in `header.tsx`
- Keep this a client component (`"use client"`) — the rest of the header can stay server-rendered if you split the interactive part into a small subcomponent

## Security, Validation & Edge Cases
- Keyboard-only users must be able to open, navigate, and close the menu without a mouse
- Menu must close automatically on route change (e.g. after a link is clicked)

## Definition of Done
- [ ] Acceptance criteria all checked
- [ ] Unit test confirming the menu opens/closes via the button
- [ ] No unrelated files changed
