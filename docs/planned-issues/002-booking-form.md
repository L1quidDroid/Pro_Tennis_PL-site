---
title: "[MVP] Booking form — date, service type, string/tension fields"
labels: "type: feature, area: booking, agent: ready"
---

## Stage
MVP

## High-Level Objective
Replace the placeholder copy on `/booking` with a real, working booking
form that captures everything needed to schedule a restring and emails
both the customer and the admin on submission.

## Scope & System Boundaries

**In-Scope:**
- [ ] Form fields: name, email, phone, preferred date, service type (standard / express), string choice, tension (main + cross), notes
- [ ] Client-side validation via React Hook Form + Zod (tension range, required fields, valid email/phone)
- [ ] On submit: send a confirmation email to the customer and a notification email to the admin via Resend
- [ ] Success state shown in the UI after submission (no page reload)
- [ ] Failure state shown if the email send fails, with a retry option

**Out-of-Scope:**
- [ ] Real-time slot availability / calendar (Phase 2 — see "[Phase 2] Real-time slot availability")
- [ ] Payment collection (Phase 2)
- [ ] Persisting bookings to a database (this ticket only sends email; storage is a separate ticket once Supabase is wired up)

## Dependencies & Architectural Context
- **Depends on:** `RESEND_API_KEY` must be set (see `.env.example` and `src/lib/env.ts`)
- **Affected subsystems:** `src/app/booking/page.tsx`, new `src/app/api/booking/route.ts`, new `src/lib/validations/booking.ts`
- **Data models:** Zod schema only at this stage — no DB table yet
  ```
  tension_main: number (30-70)
  tension_cross: number (30-70)
  service_type: "standard" | "express"
  ```

## Acceptance Criteria
- [ ] **GIVEN** a user opens `/booking` **WHEN** the page loads **THEN** all fields described above are present and labelled
- [ ] **GIVEN** a user enters a tension value outside 30-70 lbs **WHEN** they attempt to submit **THEN** the form blocks submission and shows an inline error on that field
- [ ] **GIVEN** a user submits a valid form **WHEN** the request completes successfully **THEN** the UI shows a success message and both emails are sent
- [ ] **GIVEN** the email service fails **WHEN** submission is attempted **THEN** the user sees a clear error message and can retry without re-entering data

## Implementation Notes & Blueprint
1. Define the Zod schema in `src/lib/validations/booking.ts`
2. Build the form UI in `src/app/booking/page.tsx` using shadcn-style form primitives (add `Input`, `Label`, `Select` to `src/components/ui/` if not already present — check before creating new ones)
3. Create a route handler at `src/app/api/booking/route.ts` that validates the payload server-side (don't trust client validation alone) and calls Resend
4. Read `RESEND_API_KEY` via `src/lib/env.ts`, not `process.env` directly

## Security, Validation & Edge Cases
- Server-side validation must mirror client-side — never trust the client alone
- Rate-limit or otherwise guard against form spam (a simple honeypot field is enough at this stage)
- Handle network timeout from Resend gracefully — don't let the API route hang

## Definition of Done
- [ ] Acceptance criteria all checked
- [ ] Unit tests for the Zod schema (valid/invalid tension, missing fields)
- [ ] Playwright E2E test covering the full submit flow
- [ ] No unrelated files changed
