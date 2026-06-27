# Project Context — PRO Stringing Website

> Living context document. Captures *why* this project exists, *who* it
> serves, *what* the target end state is, and *how we'll know we got
> there*. Code structure and workflow rules live in `README.md` and
> `.github/copilot-instructions.md`; this file is the product/strategy
> layer above them.

_Last updated: 2026-06-27_

---

## 1. One-line summary

A Melbourne racquet-stringing business website that grows from a
polished marketing + booking site (MVP) into a **full self-serve
operations platform** — customers book, pay, and track restrings
online, and the owner runs the whole business through an admin
dashboard.

## 2. The business

**PRO Stringing** (a.k.a. Pro Tennis) — a racquet stringing service led
by a 35-year tour stringer with 20 Grand Slam appearances and 3 Olympic
Games. The differentiator is **tour-level expertise**: precision
tension, premium strings, fast (24–48h) turnaround.

| Fact | Value |
|---|---|
| Location / market | Melbourne, Australia (local drop-off / pickup) |
| Phone | 0494 515 456 |
| Email | protennisau@gmail.com |
| Domain | https://www.prostringing.au |
| Locale | en_AU |

**How the business operates:**
- **Drop-off / pickup (local):** primary model — customers bring
  racquets in and collect in person.
- **Mobile / on-site (clubs, tournaments, customer location):**
  *possibly* offered — **needs confirmation with the business owner**
  before building anything around it. (See Open Questions.)
- **Mail-in:** not in scope.
- **Capacity:** assume a small operation (effectively one expert pair of
  hands). This matters for any future real-time availability feature —
  throughput is the constraint, not a big team.

## 3. Target end state (the destination)

The website's primary job at maturity is **full self-serve
operations** — it is the business's operating system, not just a
brochure. Concretely:

- A customer can discover the service, understand pricing, **book a
  restring online, pay for it, and track its status** without phoning
  anyone.
- The owner can **log in and manage the entire pipeline** — see incoming
  bookings, update statuses (received → stringing → ready → collected),
  and mark jobs complete — from an **admin dashboard**.
- Returning customers have **accounts** with booking history and saved
  string/tension preferences for fast re-ordering.
- The owner (non-technical) can **edit site content** — copy, prices,
  FAQ — through a **CMS**, without a developer or a code deploy.

Everything in the MVP should be built so it doesn't have to be torn out
to reach this end state (e.g. the booking form's data shape should
anticipate later persistence and payment).

## 4. Personas

| Persona | Goal | Cares about |
|---|---|---|
| **Player / customer** | Get racquet restrung quickly with the right string & tension | Trust, turnaround, easy booking, clear pricing |
| **Returning customer** | Re-book with their usual setup | Saved preferences, history, speed |
| **Owner / stringer** | Run the business, not the website | Seeing bookings at a glance, status management, editing content himself |
| **Developer (human or AI agent)** | Ship one well-scoped feature at a time | Clear scope, acceptance criteria, tests, CI |

## 5. Delivery stages

This project is delivered **feature-by-feature** against a GitHub Issues
backlog (one issue = one branch = one PR; see `README.md`). Work is
grouped into two milestones.

### Stage 1 — MVP Core Launch
A polished, functional rebuild of what exists today: marketing pages, a
working booking form (email-based, no DB yet), contact form, real FAQ
and pricing content, and mobile navigation.

Five MVP gaps are already fully scoped in `docs/planned-issues/`:

| # | Feature | Status |
|---|---|---|
| 001 | Mobile navigation menu | Planned (scoped) |
| 002 | Booking form — date, service type, string/tension, emails via Resend | Planned (scoped) |
| 003 | Contact form with validation | Planned (scoped) |
| 004 | FAQ page content (accordion, `src/content/faq.ts`) | Planned (scoped) |
| 005 | Pricing page content (from existing `services`/`products`) | Planned (scoped) |

> MVP booking **sends email only** — it does not persist to a database
> or take payment. Those are deliberately deferred to Stage 2 so the MVP
> can ship.

### Stage 2 — Operational Scale (the end state)
Confirmed in scope (in rough priority / dependency order):

1. **Persistence** — store bookings in a database (Supabase) instead of
   email-only. *(Prerequisite for everything below; implied by the
   booking ticket's own out-of-scope note.)*
2. **Online payments** — collect payment at booking (Stripe or similar).
   ⚠️ Open question: pay-at-booking vs pay-on-pickup.
3. **Admin dashboard** — owner logs in; view/manage bookings, update
   statuses, mark complete.
4. **Customer accounts** — login, booking history, saved string/tension
   preferences, re-order.
5. **CMS** — owner edits copy, prices, FAQ without code.

**Considered but NOT currently selected for the end state:**
- **Real-time slot availability / live calendar** — was offered, not
  chosen. The MVP's simple "preferred date" field stands for now. Flag
  as a possible later add if booking volume justifies it.

## 6. Tech stack (as established)

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS (tokens in `tailwind.config.ts`) |
| UI | shadcn/ui-style primitives in `src/components/ui` |
| Forms / validation | React Hook Form + Zod |
| Hosting | Vercel |
| Backend (Stage 2) | Supabase (Postgres, Auth, Storage) |
| Payments (Stage 2) | TBD (Stripe assumed) |
| CMS (Stage 2) | TBD — see Open Questions |
| Email | Resend |
| Testing | Vitest (unit) + Playwright (E2E) + axe-core (a11y) |
| CI | GitHub Actions (lint, typecheck, test, build, E2E per PR) |

Content currently lives as plain data in `src/content/site.ts`,
deliberately shaped so a CMS can later replace its exports without
touching components.

## 7. Acceptance criteria — what "done" means at the end state

These are end-state, product-level criteria. Each shipped feature still
gets its own per-issue acceptance criteria (see `docs/planned-issues/`).

**Customer can self-serve a booking**
- GIVEN a customer on `/booking` WHEN they complete the form THEN the
  booking is **persisted** (not just emailed) and they receive
  confirmation.
- GIVEN payment is enabled WHEN they book THEN they can pay online and
  the booking records payment status.
- GIVEN a tension value outside the valid range (30–70 lbs) WHEN they
  submit THEN submission is blocked with an inline error (already in
  MVP ticket 002).

**Customer can track and re-book**
- GIVEN a returning customer WHEN they log in THEN they see past
  bookings and saved string/tension preferences.
- GIVEN a saved preference WHEN they start a new booking THEN it
  pre-fills.

**Owner can run the business**
- GIVEN the owner logs into the admin dashboard WHEN a booking comes in
  THEN it appears in a manageable list.
- GIVEN a booking in progress WHEN the owner updates its status THEN the
  status is recorded (and, ideally, the customer is notified).

**Owner can maintain content**
- GIVEN the owner edits copy / a price / an FAQ in the CMS WHEN they
  save THEN the live site reflects it **without a code deploy**.
- GIVEN a price changes once WHEN it's displayed in multiple places
  THEN every location updates consistently (single source of truth).

**Quality gates (apply to every feature, both stages)**
- CI (lint, typecheck, unit, build, E2E) passes before merge.
- Automated accessibility scans (axe-core, WCAG 2.x A/AA) pass on every
  route.
- Server-side validation mirrors client-side for any user input.
- No duplicate sources of truth introduced (content/pricing especially).

## 8. Non-goals / explicitly out of scope

- Mail-in / postal stringing service.
- Real-time slot availability (deferred unless re-prioritised).
- Dark mode (intentionally removed; needs its own ticket if wanted).
- Live chat / real-time messaging.
- Multi-location / multi-stringer team management (assume single
  operator unless told otherwise).

## 9. Open questions (to resolve with the business owner)

1. **Mobile / on-site stringing** — is it actually offered? If so, it
   affects booking flow, pricing, and content. *(Confirm before
   building.)*
2. **Payment timing** — pay-at-booking (card on file / upfront) or
   pay-on-pickup? Drives the payments implementation and booking UX.
3. **CMS choice** — which CMS/approach? (e.g. headless CMS like Sanity,
   Supabase-backed admin editing, or a Git-based CMS.) The content layer
   in `src/content` is already structured to be swappable.
4. **Real-time availability** — confirm it stays deferred, or promote it
   if booking volume warrants showing live capacity.
5. **Customer notifications** — should status changes (e.g. "ready for
   pickup") trigger automatic email/SMS to the customer?
6. **Accounts auth method** — email/password, magic link, social login?
   (Supabase Auth supports all; pick before building accounts.)

---

### How to use this doc
- Treat it as the source of truth for *product intent*. When a planned
  issue or PR seems to conflict with the end state here, raise it.
- Update it when a decision is made (resolve an Open Question, change a
  Non-goal). Keep the "Last updated" date current.
- It does **not** replace per-issue acceptance criteria — it sets the
  frame they fit inside.
