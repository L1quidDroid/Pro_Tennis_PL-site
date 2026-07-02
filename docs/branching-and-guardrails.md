# Branching Strategy & Guardrails

> How code moves from idea to production on this repo, and the
> automated/manual guardrails that keep a small AI-assisted team from
> shipping broken or scope-creeping work.
>
> This consolidates the rules scattered across `README.md` and
> `CONTRIBUTING.md` into one operational reference, **plus** a checklist
> of the one-time setup that only the repo owner can do.

_Last updated: 2026-06-27 · Repo: L1quidDroid/Pro_Tennis_PL-site_

---

## 1. The model in one line

**Trunk-based with short-lived feature branches.** `main` is always
deployable. A change flows one branch → one PR → CI → human review →
merge. No long-running branches, no direct commits to `main`.

```
work item  →  feature/<slug>  →  PR  →  CI passes  →  review  →  merge to main  →  Vercel deploy  →  tag releases
```

> **On "issue-first":** today most work starts from a GitHub Issue
> because the team is small and AI agents need a scoped source of truth.
> This is a **current-stage convention, not a permanent law** — it is
> expected to relax as the project matures (e.g. small fixes, hotfixes,
> and experiments may skip the formal issue). The durable rules are the
> ones below: short-lived branches, PR + CI + review before `main`, and
> staying in scope. Treat "an issue exists" as _recommended_ for
> feature work, not a hard gate.

## 2. Branch types

| Branch                               | Purpose                                      | Lifetime       | Merges into |
| ------------------------------------ | -------------------------------------------- | -------------- | ----------- |
| `main`                               | Production. Always green, always deployable. | permanent      | —           |
| `feature/<issue#>-short-description` | One scoped issue                             | **< 48 hours** | `main`      |
| `fix/<issue#>-short-description`     | One bug fix                                  | < 48 hours     | `main`      |
| `chore/<issue#>-short-description`   | Infra/config/deps (no user-facing change)    | < 48 hours     | `main`      |

**Naming:** always lead with the issue number, e.g.
`feature/002-booking-form`. The number ties the branch to the issue, PR,
and board card.

**The 48-hour rule:** if a branch is older than ~2 days, the issue was
too big. Split it into sub-issues rather than letting the branch drift
from `main`. Long branches are the #1 source of painful merge conflicts.

## 3. The lifecycle, step by step

1. **Start from a work item** (current convention: a GitHub Issue for
   feature work — will relax over time, see §1). If it's an MVP gap, the
   body is already in `docs/planned-issues/` — copy it into a real Issue,
   then delete the file in the PR that closes it. Small fixes/chores may
   proceed without a formal issue once the team agrees that's the norm.
2. **One in progress per person.** Move the issue to _In Progress_ on the
   board. Only one card per person there at a time.
3. **Branch from latest `main`.** `git switch main && git pull && git
switch -c feature/<n>-slug`.
4. **Build + test.** Write the feature and its tests together. Run
   `npm run lint`, `npm run typecheck`, `npm test` locally before
   pushing (the pre-commit hook runs lint/format on staged files, but it
   is **not** a substitute for the full suite).
5. **Open a PR.** Use the PR template, fill the acceptance-criteria
   checklist, link with `Closes #N`. Vercel posts a preview URL.
6. **CI runs automatically** (see §4). It must be green.
7. **Human review** against the issue's acceptance criteria — clicking
   through the Vercel preview for anything UI-facing, not just reading
   the diff.
8. **Merge to `main`** → Vercel deploys to production automatically.
9. **Next issue.** Don't start the next issue touching the same
   subsystem until this one is merged.

## 4. Automated guardrails (already in the repo)

These run without anyone remembering to trigger them:

| Guardrail                                  | File                                          | What it blocks                              |
| ------------------------------------------ | --------------------------------------------- | ------------------------------------------- |
| **CI: lint, typecheck, unit tests, build** | `.github/workflows/ci.yml`                    | Broken or untyped code, build failures      |
| **CI: Playwright E2E + axe accessibility** | same file (`e2e` job)                         | Broken user flows, WCAG A/AA regressions    |
| **Pre-commit hook**                        | `.husky/pre-commit` → `lint-staged`           | Unformatted/unlinted staged files locally   |
| **Env validation**                         | `src/lib/env.ts` (Zod)                        | App starting with a missing/invalid env var |
| **Label sync**                             | `.github/workflows/labels.yml` + `labels.yml` | Ad-hoc hand-made labels drifting            |
| **Dependabot**                             | `.github/dependabot.yml`                      | Dependency rot (weekly grouped PRs)         |

> ⚠️ **Important:** CI _exists_ but does not _block merge_ until you
> mark it a **required status check** in branch protection. Until then
> it's advisory. See §6 — this is the single most important thing
> required from you.

## 5. Manual guardrails (human discipline)

Things automation can't enforce — these are on the team:

- **Scope:** a PR touches only files in the issue's "Affected
  subsystems". Found an unrelated thing to fix? New issue, not this PR.
- **No concurrent work on the same subsystem** (human or AI agent).
- **Prompt agents with the issue, not a paraphrase** — the issue is the
  source of truth.
- **Review agent output as critically as human code** — clean-reading
  code can be confidently wrong.
- **Database changes go through committed migration files**, never a
  dashboard.
- **Click the Vercel preview** before approving UI work.

## 6. What is required from YOU (repo owner) — one-time setup

These can only be done by someone with admin rights on the GitHub repo
and the connected services. Do them once; they make every guardrail
above actually bite.

### 6.1 — Branch protection on `main` ⭐ highest priority

GitHub → **Settings → Branches → Add branch protection rule**, branch
name pattern `main`:

- [ ] **Require a pull request before merging** (blocks direct pushes to
      `main`)
- [ ] **Require approvals: 1** (the other developer must approve)
- [ ] **Require status checks to pass before merging**, and select:
  - [ ] `Lint, typecheck, test, build` (the `ci` job)
  - [ ] `Playwright E2E` (the `e2e` job)
- [ ] **Require branches to be up to date before merging**
- [ ] **Do not allow bypassing the above** (apply to admins too)

> Without this step, all of §4's CI is just a green/red badge nobody is
> forced to honour.

### 6.2 — GitHub Actions permissions for label sync

GitHub → **Settings → Actions → General → Workflow permissions**:

- [ ] Set to **Read and write permissions** (so the `labels.yml`
      workflow can create/update labels).

### 6.3 — Secrets & environment variables

The app needs these (see `.env.example`). They live in **two places**:

| Variable                        | Local (`.env.local`) | Vercel (Project → Settings → Environment Variables) | When needed                            |
| ------------------------------- | -------------------- | --------------------------------------------------- | -------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | ✅                   | ✅ (prod = real domain)                             | now                                    |
| `RESEND_API_KEY`                | ✅                   | ✅                                                  | booking/contact forms (issues 002/003) |
| `NEXT_PUBLIC_SUPABASE_URL`      | ✅                   | ✅                                                  | Stage 2 persistence                    |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅                   | ✅                                                  | Stage 2 persistence                    |
| `SUPABASE_SERVICE_ROLE_KEY`     | ✅                   | ✅ (**never** expose client-side)                   | Stage 2 admin/server                   |

- [ ] Provide a **Resend API key** when the booking/contact forms start.
- [ ] Provide **Supabase project keys** when Stage 2 begins.
- [ ] Never commit `.env.local` (already gitignored). Never paste the
      `SUPABASE_SERVICE_ROLE_KEY` into client code or a
      `NEXT_PUBLIC_*` variable.

### 6.4 — Vercel connection

- [ ] Confirm the repo is connected to a Vercel project with
      **preview deploys on PRs** and **production deploy on `main`**.
- [ ] Set production env vars in Vercel (above), not just locally.

### 6.5 — Project board & labels

- [ ] Create/confirm the Project board with columns: **Backlog → Ready
      for Agent → In Progress → Review/QA → Done**.
- [ ] Confirm milestones exist: **MVP Core Launch** and **Phase 2
      Operational Scale**.

### 6.6 — Ongoing, from you (not one-time)

- [ ] **Approve PRs** — you're the required reviewer; nothing merges
      without a human approval.
- [ ] **Triage Dependabot PRs** weekly — auto-grouped minor/patch can be
      merged after CI; review majors individually.
- [ ] **Decide the open product questions** in `context.md` /
      `business-req.md` before the dependent features are built (payment
      timing, CMS choice, mobile/on-site).

## 7. Release & version tagging

Branches are how work _gets in_; **tags are how we mark what shipped**.
Every meaningful release on `main` gets an annotated, immutable git tag
so we can point at "exactly what the MVP launch was" or roll back to a
known-good commit.

We use **Semantic Versioning** (`vMAJOR.MINOR.PATCH`) plus named
milestone tags for the two big stage gates.

### 7.1 — Versioning scheme

| Phase                         | Version range                      | Meaning                                                                    |
| ----------------------------- | ---------------------------------- | -------------------------------------------------------------------------- |
| Pre-MVP build-up              | `v0.x.y`                           | Scaffold + features landing; not yet "launched". API/UX may change freely. |
| **MVP Core Launch**           | `v1.0.0`                           | First public release — the polished marketing + booking site.              |
| Post-MVP features             | `v1.x.0` (minor), `v1.x.y` (patch) | New features = minor bump; bug fixes = patch bump.                         |
| **Phase 2 Operational Scale** | `v2.0.0`                           | Self-serve operations: payments, accounts, admin dashboard, CMS.           |

Bump rules:

- **MAJOR** — a stage gate / breaking change (`v1.0.0` MVP, `v2.0.0`
  Phase 2).
- **MINOR** — a new user-facing feature shipped to `main`
  (e.g. booking form lands → `v0.2.0`; FAQ page → `v0.3.0`).
- **PATCH** — bug fix or content tweak, no new capability.

### 7.2 — Milestone (stage) tags

Alongside the SemVer tag, add a human-readable milestone tag at each
stage gate so non-developers can find them:

| Milestone tag   | Points at                        | Paired with |
| --------------- | -------------------------------- | ----------- |
| `mvp-launch`    | The commit that is the live MVP  | `v1.0.0`    |
| `phase2-launch` | First Phase 2 production release | `v2.0.0`    |

### 7.3 — Per-feature tags (optional, lightweight)

For tracing _which commit shipped a given feature_ without a full
version bump, an optional feature tag is allowed:

```
feature-<slug>-<date>      e.g. feature-booking-form-2026-07
```

Use these sparingly — the SemVer minor bump is the primary record of a
feature shipping. Feature tags are just a convenience pointer.

### 7.4 — How to tag (always annotated, on `main` after merge)

```bash
git switch main && git pull            # be on the merged release commit

# Feature release (minor bump)
git tag -a v0.2.0 -m "Booking form (Resend email) shipped — closes #2"
git push origin v0.2.0

# MVP launch (major + milestone tag, same commit)
git tag -a v1.0.0      -m "MVP Core Launch"
git tag -a mvp-launch  -m "MVP Core Launch — see v1.0.0"
git push origin v1.0.0 mvp-launch
```

Rules:

- **Annotated tags only** (`-a` … `-m`), never lightweight — annotated
  tags carry author, date, and message and are what GitHub Releases use.
- **Tag `main` only**, after the PR is merged and CI is green — never
  tag a feature branch.
- **Never move or delete a published tag.** A released tag is immutable;
  if something's wrong, ship a new patch tag.
- Consider cutting a **GitHub Release** from the `v1.0.0` / `v2.0.0`
  tags with short notes — good for the client and for changelog history.

> **Required from you (§6 link):** decide whether tagging is **manual**
> (run the commands above at each release) or **automated** later (e.g. a
> release workflow that tags on merge). Manual is fine to start.

## 8. Quick reference card

```
START   work item ready? (issue for features; optional for small fixes)
        git switch main && git pull
        git switch -c feature/<slug>
BUILD   code + tests together
        npm run lint && npm run typecheck && npm test
SHIP    git push -u origin HEAD
        open PR, fill template, link the work item
        CI green + 1 approval + clicked preview
        merge → auto-deploy
TAG     on main after merge:
        feature → git tag -a v0.X.0 -m "..."   (minor bump)
        fix     → git tag -a v0.X.Y -m "..."   (patch bump)
        launch  → v1.0.0 + mvp-launch  /  v2.0.0 + phase2-launch
        git push origin <tag>
RULE    one branch · one PR · < 48h · stay in scope · always deployable
```

---

### Related docs

- `README.md` — full workflow narrative & stack
- `CONTRIBUTING.md` — day-to-day contributor rules
- `.github/copilot-instructions.md` — rules AI agents read automatically
- `docs/context.md` — product intent & target end state
- `docs/business-req.md` — questions for the client
