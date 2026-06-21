---
title: "[MVP] Contact form with validation"
labels: "type: feature, area: frontend, agent: ready"
---

## Stage
MVP

## High-Level Objective
Replace the static contact details on `/contact` and the homepage
contact section with a working contact form that emails the admin.

## Scope & System Boundaries

**In-Scope:**
- [ ] Form fields: name, email, message
- [ ] Client + server-side validation (Zod) — required fields, valid email
- [ ] On submit: send the message to the admin email via Resend
- [ ] Success/failure UI states, no page reload
- [ ] Keep the existing static email/phone display alongside the form (don't remove it)

**Out-of-Scope:**
- [ ] Live chat or any real-time messaging (not part of this ticket)
- [ ] Storing messages in a database

## Dependencies & Architectural Context
- **Depends on:** `RESEND_API_KEY` (shared with the booking form ticket — if that ticket lands first, reuse its Resend setup rather than duplicating it)
- **Affected subsystems:** `src/components/sections/contact-section.tsx`, new `src/app/api/contact/route.ts`, new `src/lib/validations/contact.ts`

## Acceptance Criteria
- [ ] **GIVEN** a user fills in name, email, and message **WHEN** they submit **THEN** the admin receives an email with that content
- [ ] **GIVEN** a user submits with an invalid email or empty message **WHEN** they attempt to submit **THEN** the form blocks submission with an inline error
- [ ] **GIVEN** the email send fails **WHEN** submission is attempted **THEN** the user sees a clear error and can retry

## Implementation Notes & Blueprint
1. Define the Zod schema in `src/lib/validations/contact.ts`
2. Extend `src/components/sections/contact-section.tsx` with the form (it currently only renders static `<dl>` contact details — keep those, add the form below)
3. Create `src/app/api/contact/route.ts` following the same pattern as the booking API route if it already exists

## Security, Validation & Edge Cases
- Server-side validation mirrors client-side
- Simple honeypot or rate-limit to deter spam submissions

## Definition of Done
- [ ] Acceptance criteria all checked
- [ ] Unit tests for the Zod schema
- [ ] No unrelated files changed
