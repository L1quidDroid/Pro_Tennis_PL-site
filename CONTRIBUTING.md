# Contributing

This repo is built by two developers using agentic coding tools. These
guidelines exist to prevent the two failure modes that actually happen
on small AI-assisted teams: duplicated work and scope-creeping PRs.

## Environment variables

Never read `process.env` directly in a component or route. Import
`env` from `src/lib/env.ts` instead — it validates everything once at
startup and fails with a clear message if something's missing,
instead of a confusing error deep inside a feature later. If a new
feature needs a new environment variable, add it to the schema in that
file first.

## Picking up a planned issue

`docs/planned-issues/` contains fully-scoped issue bodies for known
MVP gaps that haven't been filed on GitHub yet. Before starting one:
copy it into a real GitHub Issue (title and labels are in the YAML
frontmatter), then delete the file from that folder in the PR that
closes the issue. Don't work directly from the markdown file without
filing the issue first — the issue is what CI, the PR template, and
the board all link back to.

## Before you start any work

1. Check the Project board. Only one issue per person should be
   "In Progress" at a time.
2. Confirm no one else is touching the same subsystem (check open PRs
   and in-progress issues, not just the board column).
3. Make sure the issue is labeled `agent: ready` before assigning it to
   an AI agent. If it's not fully scoped (clear acceptance criteria,
   defined boundaries), scope it first — don't hand an agent an
   ambiguous ticket and hope.

## Working with AI coding agents

- **Single-Agent, Single-Branch.** One agent, one branch, one issue, at
  any given time. Never run two agents against the same subsystem
  concurrently.
- **Prompt with the issue, not a paraphrase.** Point the agent at the
  actual issue (`Read GitHub Issue #N and implement exactly the
  acceptance criteria listed`) rather than re-describing it from memory
  — the issue is the source of truth, not your summary of it.
- **No open-ended prompts.** Avoid "improve the styling" or "make the
  booking page better." Every prompt should map to a specific issue
  with specific acceptance criteria.
- **Review agent output like any other PR.** Agent-generated code that
  reads cleanly can still be confidently wrong — verify against
  acceptance criteria, not just code style.

## Branching

- `feature/<issue-number>-short-description`
- Keep branches under 48 hours old. If a feature is taking longer,
  it should have been split into sub-issues — split it now rather than
  letting the branch run long.

## Database changes

Schema changes are always versioned migration files committed to the
repo. Never make a schema change through a dashboard, even "just to
test something" — it breaks reproducibility and the other developer's
local environment.

## Pull requests

- One issue per PR. If you find yourself wanting to fix something
  unrelated while you're in there, open a separate issue for it instead.
- Fill out the full PR template, including the acceptance criteria
  checklist — don't just link the issue and leave the rest blank.
- Wait for the Vercel preview deploy and actually click through it
  before approving; don't review from the diff alone for anything
  UI-facing.

## Definition of done

A PR is done when:
- All acceptance criteria are checked and verified (not just
  implemented)
- Lint, typecheck, and tests pass
- The diff doesn't touch files outside the issue's stated scope
- The other developer has reviewed and approved
