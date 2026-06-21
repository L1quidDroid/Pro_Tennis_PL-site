---
name: Feature Ticket
about: Standard template for AI-assisted, feature-by-feature development
title: "[MVP] Short Descriptive Title"
labels: "type: feature, agent: ready"
---

## Stage
MVP | Phase 2

## High-Level Objective
One sentence on what this feature accomplishes and why.

## Scope & System Boundaries

**In-Scope:**
- [ ]
- [ ]

**Out-of-Scope:**
- [ ]

## Dependencies & Architectural Context
- **Depends on:** None / #IssueNumber
- **Blocks:** None / #IssueNumber
- **Affected subsystems:** e.g. `src/components/booking/...`, `src/app/booking/...`
- **Data models (if any):** table/shape, fields, and types touched

## Acceptance Criteria
- [ ] **GIVEN** [context] **WHEN** [action] **THEN** [expected result]
- [ ] **GIVEN** [context] **WHEN** [action] **THEN** [expected result]

## Implementation Notes & Blueprint
> Keep changes isolated to the scope above. Follow existing component and
> Tailwind patterns already in the repo — see `src/components/sections/`
> for the expected shape of a new section component.

1. Step one
2. Step two
3. Step three

## Security, Validation & Edge Cases
- Validation rules to enforce (e.g. Zod schema constraints)
- Edge cases to handle explicitly (empty states, network failure, invalid input)

## Definition of Done
- [ ] Acceptance criteria all checked
- [ ] Tests added/updated (unit and/or E2E as relevant)
- [ ] No unrelated files changed
- [ ] PR description links this issue with `Closes #N`
