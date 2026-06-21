# Instructions for AI coding agents working in this repository

This file is read by GitHub Copilot's coding agent (and is a useful
primer for any other AI agent, including Claude, working in this repo).
Follow these rules before writing any code.

## Ground rules

1. **Work from exactly one GitHub issue at a time.** Do not implement
   anything not described in the issue's Scope and Acceptance Criteria
   sections. If the issue is ambiguous, stop and ask a clarifying
   question in the issue or PR rather than guessing.
2. **Stay inside the stated scope.** Do not touch files outside the
   issue's "Affected subsystems" unless the change is a direct,
   necessary consequence of the in-scope work (e.g. adding a new shared
   type). If you think a broader change is needed, say so in the PR
   description instead of just doing it.
3. **One issue = one branch = one PR.** Branch naming:
   `feature/<issue-number>-short-description`.
4. **Never hand-edit a database directly.** Schema changes go through
   versioned migration files, never through a dashboard or ad hoc query.
5. **Write tests for what you build.** Unit tests (Vitest) for
   components and logic; a Playwright E2E test if you touch the booking
   flow specifically — that flow has zero tolerance for silent failure.
6. **Follow existing patterns, don't introduce new ones.** Before adding
   a new section component, look at `src/components/sections/` for the
   expected shape (a typed props-free component pulling from
   `src/content/site.ts`). Before adding a new UI primitive, check
   `src/components/ui/` first — it may already exist or be addable via
   `npx shadcn add <component>`.

## Where things live

| What | Where |
|---|---|
| Page routes | `src/app/**/page.tsx` |
| Reusable section components (hero, services, etc.) | `src/components/sections/` |
| Layout shell (header/footer) | `src/components/layout/` |
| UI primitives (button, card, etc.) | `src/components/ui/` |
| Site copy and structured content | `src/content/site.ts` |
| Content type definitions | `src/types/content.ts` |
| Shared utilities | `src/lib/` |
| Unit tests | `tests/unit/` |
| E2E tests | `tests/e2e/` |

## Design system

- Colors, fonts, and spacing tokens are defined once in
  `tailwind.config.ts`. Never hardcode a hex value or arbitrary pixel
  size in a component — extend the token file if a new value is
  genuinely needed.
- The `.string-grid` utility in `globals.css` is the site's one
  recurring visual motif (a strung-racquet grid texture). Use it
  sparingly — at most one section per page.

## MVP vs Phase 2

Check the issue's "Stage" field before implementing. Do not pull in
Phase 2 functionality (payments, real-time booking calendar, customer
accounts, etc.) while implementing an MVP-stage ticket, even if it
seems convenient to do "while you're in there."

## Before opening a PR

- Run `npm run lint`, `npm run typecheck`, and `npm test`.
- Confirm the diff only touches files relevant to the linked issue.
- Fill out the PR template completely, including the acceptance
  criteria checklist.
