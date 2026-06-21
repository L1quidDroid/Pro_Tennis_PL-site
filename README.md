# PRO Stringing — Website Rebuild

A feature-by-feature rebuild of the Pro Tennis / Pro Stringing website,
built by two developers using agentic coding tools (including GitHub
Copilot's coding agent and Claude Code) against a GitHub Issues + GitHub
Projects backlog.

## Project purpose

Recreate the existing site with a stronger UI, cleaner UX, and a
maintainable engineering foundation, then extend it feature-by-feature
across two delivery stages:

- **MVP** — a polished, functional rebuild of what exists today
  (marketing pages, a simple booking form, static content).
- **Phase 2** — operational and conversion features layered on top
  (real-time booking, payments, admin dashboard, customer accounts).

See the project's pinned issue/board for the full MVP and Phase 2
feature lists and current status.

## How the agentic workflow works, in plain language

1. **One GitHub Issue = one feature or fix.** Nothing gets built without
   an issue describing exactly what's in scope, what's out of scope,
   and how to verify it's done (acceptance criteria).
2. **An agent (or a developer) works on exactly one issue at a time.**
   It reads the issue, creates a branch, writes the code and tests, and
   opens a pull request — or updates an existing one if it's iterating
   on feedback.
3. **CI runs automatically** on that PR (lint, typecheck, tests, build).
   This has to pass before anyone reviews it.
4. **A human reviews, tests on the live preview link, and merges.** Only
   after that does the next issue start. No issue's work begins before
   the previous one tied to the same area of the app is merged.

That's the whole loop: **issue → branch → PR → CI → human review → merge
→ next issue.** Every piece of tooling in this repo (templates, labels,
CI, the planned-issues folder) exists to make that loop fast and hard to
get wrong, for both a human and an AI agent.


## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| UI components | shadcn/ui (copied into `src/components/ui`, not a package dependency) |
| Forms/validation | React Hook Form + Zod |
| Hosting | Vercel |
| Backend (added in later tickets) | Supabase (Postgres, Auth, Storage) |
| Email (added in later tickets) | Resend |
| Testing | Vitest (unit) + Playwright (E2E) + axe-core (automated accessibility scans) |
| Linting/formatting | ESLint + Prettier + Husky + lint-staged |
| CI | GitHub Actions (lint, typecheck, test, build, E2E on every PR) |
| Dependency updates | Dependabot (weekly, grouped, minor/patch auto-grouped, major left for human review) |

This is a starter scaffold, not a finished product. Backend, booking
logic, and payments are intentionally not built yet — see the issue
templates and MVP/Phase 2 split in `.github/copilot-instructions.md`.

## Local setup

```bash
npm install
cp .env.example .env.local   # fill in values as features need them
npm run dev                  # http://localhost:3000
```

Other useful scripts:

```bash
npm run lint          # ESLint
npm run typecheck      # tsc --noEmit
npm run format         # Prettier write
npm test                # Vitest unit tests
npm run test:e2e        # Playwright E2E tests
```

A pre-commit hook (Husky + lint-staged) runs lint and format
automatically on staged files.

## Branch and PR workflow

1. Every change starts from a GitHub issue using the **Feature Ticket**
   template (`.github/ISSUE_TEMPLATE/feature_ticket.md`).
2. Branch naming: `feature/<issue-number>-short-description`.
3. Branches are short-lived — aim for under 48 hours. If a feature
   doesn't fit that window, split it into sub-issues instead of letting
   the branch run long.
4. Open a PR using the PR template, link it with `Closes #N`, and let
   Vercel generate a preview deploy.
5. **CI must pass before merge.** `.github/workflows/ci.yml` runs lint,
   typecheck, unit tests, build, and E2E tests on every PR — this is a
   required status check (configured in Settings → Branches), not a
   suggestion. If CI fails, fix it before requesting review.
6. The other developer reviews against the issue's acceptance criteria
   (not just code style) before merging.
7. Merge to `main` deploys to production automatically via Vercel.

**One issue = one branch = one PR.** Never bundle two features into one
PR — this is the rule that keeps both human review and AI-agent work
tractable.

## How we use GitHub Issues and Projects

- **Issues** are the unit of work. Every feature, bug, and chore is an
  issue using the appropriate template.
- **Labels** mark type (`type: feature`, `type: bug`, `type: refactor`,
  `type: docs`, `type: foundations`) and agent-readiness (`agent: ready`
  vs `needs-scoping`). **`.github/labels.yml` is the source of truth** —
  don't create labels by hand in the GitHub UI; edit that file and the
  `labels.yml` workflow syncs them automatically on push to `main`.
- **Milestones** separate `MVP Core Launch` from `Phase 2 Operational
  Scale`.
- **The Project board** has five columns: Backlog → Ready for Agent →
  In Progress → Review/QA → Done. Only issues labeled `agent: ready`
  should be picked up by an AI coding agent.

## How AI agents should work on this repo

See [`.github/copilot-instructions.md`](.github/copilot-instructions.md)
for the full rules. The short version:

- Work from exactly one issue at a time. Don't touch files outside its
  stated scope.
- If an issue is ambiguous, ask — don't guess at product decisions.
- Write tests for what you build.
- Database schema changes go through migration files, never a
  dashboard.
- Run lint, typecheck, and tests before opening a PR.

This applies whether the agent is GitHub Copilot's cloud coding agent
(which can open a draft PR, work on a branch, and request review) or
another tool like Claude Code.

## Folder structure

```
src/
  app/                  # Next.js App Router pages + SEO routes
    sitemap.ts          # auto-generated sitemap.xml
    robots.ts           # auto-generated robots.txt
    opengraph-image.tsx # auto-generated OG share image (next/og)
  components/
    ui/                 # shadcn/ui-style primitives (button, card, ...)
    layout/             # header, footer
    sections/           # homepage section components (hero, services, ...)
  content/              # plain-data site copy — edit here, not in JSX
  lib/
    utils.ts            # cn() class-merging helper
    env.ts               # validated environment variable access — see below
  types/                # shared TypeScript types
tests/
  unit/                 # Vitest component/unit tests
  e2e/                  # Playwright end-to-end tests
docs/
  planned-issues/       # fully-scoped issue bodies not yet filed on GitHub
.github/
  workflows/            # CI and label-sync automation
  ISSUE_TEMPLATE/       # feature + bug issue templates
  labels.yml            # canonical label definitions (source of truth)
  dependabot.yml        # automated dependency update schedule
  pull_request_template.md
  copilot-instructions.md  # rules GitHub Copilot's agent reads automatically
```

New features should map cleanly onto this structure: a new homepage
section is a new file in `src/components/sections/`, a new page is a
new folder in `src/app/`, new copy goes in `src/content/`.

## What the new foundational files do

These were added after an engineering audit identified gaps between
the documented workflow and what was actually enforced. Each one closes
a specific gap:

| File | What it does | Why it matters |
|---|---|---|
| `.github/workflows/ci.yml` | Runs lint, typecheck, unit tests, build, and E2E tests on every PR | Without this, "run tests before opening a PR" was just an instruction anyone (human or agent) could skip. Set as a required check in branch protection, this actually blocks a broken PR from merging. |
| `.github/dependabot.yml` | Opens grouped, weekly PRs for dependency updates (patch/minor auto-grouped; majors left for a human to review individually) | Keeps the project from accumulating years of dependency drift into one risky upgrade — the opposite of "low maintenance." |
| `.github/labels.yml` + `.github/workflows/labels.yml` | Defines the canonical label set and syncs it to GitHub automatically | Stops the two of you from hand-creating slightly different labels over time. Edit the file, push to `main`, labels update themselves. |
| `public/favicon.ico` + `src/app/opengraph-image.tsx` | A placeholder browser tab icon and a dynamically generated link-preview image | Closes a real, visible gap — without these, sharing a link to the site showed no icon and no preview image. The OG image is generated from code (via `next/og`), so it updates automatically if the tagline in `src/content/site.ts` changes — no image file to keep in sync by hand. |
| `src/lib/env.ts` | Validates environment variables once, at startup, with Zod | Without it, a missing API key fails deep inside whichever feature uses it, often in production, with a confusing error. This fails immediately and names exactly which variable is missing. Import `env` from here — don't read `process.env` directly elsewhere. |
| `tests/e2e/accessibility.spec.ts` + `tests/e2e/fixtures/axe-fixture.ts` | Automated WCAG 2.0/2.1 A/AA scans (via axe-core) across every real route, run in the CI E2E job | Catches contrast issues, missing alt text, and invalid ARIA automatically on every PR — accessibility stops being something only caught by manual review. |
| `docs/planned-issues/*.md` | Five fully-scoped issue bodies for known MVP gaps (mobile nav, booking form, contact form, FAQ content, pricing content) | These were previously just `TODO` comments pointing at tickets that didn't exist yet. Now they're copy-paste-ready GitHub Issues with real acceptance criteria — see `docs/planned-issues/README.md` for how to file them. |

## A note on dark mode

`tailwind.config.ts` previously had `darkMode: "class"` configured with
no actual dark-mode styles or toggle anywhere — dead config implying a
feature that didn't exist. It's been removed rather than wired up.
Dark mode is a real feature with ongoing cost (every component needs
to account for both states going forward) and nobody has asked for it.
If it's wanted, file it as a proper ticket with its own acceptance
criteria — don't reintroduce the config without the feature attached.

## A note on shadcn/ui primitives

`src/components/ui/button.tsx` and `card.tsx` were hand-written to match
shadcn/ui's conventions (same `cva` variant pattern, same file shape)
rather than generated via `npx shadcn add`. Treat these as the
canonical shape for this project. If you run the shadcn CLI to add a
*new* component, check it doesn't silently produce a different
`Card`/`Button` shape than what's already here — reconcile before
merging if it does.

## Design system

Color, type, and spacing tokens live in `tailwind.config.ts` —
extend that file rather than hardcoding values in components. The
palette (deep "match-night" ink, hard-court teal, trophy gold) and the
`.string-grid` texture utility (a subtle strung-racquet grid motif) are
the project's visual signature; see `src/app/globals.css`.

This line was added by a throwaway PR to verify the CI/CD loop (branch protection, Vercel preview, required checks) end-to-end before real feature work begins.
