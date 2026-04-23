# Acceptance Checklist

Two separate checklists — one for PM (Product AC) and one for Engineering (DoD).
Both must be complete before a story is marked Done.

---

## Why Two Checklists

| | Product AC | Engineering DoD |
|-|-----------|-----------------|
| Owner | PM | Engineering |
| Written by | PM before sprint | Engineers during sprint |
| Validates | User behavior meets spec | Code quality meets standards |
| Verified by | PM / QA | Engineering lead / CI |
| Merge condition | Required | Required |

These are separate concerns. A feature can pass DoD but fail Product AC (wrong behavior).
A feature can pass Product AC but fail DoD (working but untestable code).

**How Product AC relates to GWT in the spec:**
The Product Spec's GWT scenarios ARE the source of truth for Product AC.
PM does NOT re-copy GWT blocks into the checklist — instead, PM verifies each scenario passes in the running build.
For each GWT scenario in the spec: open the build, reproduce the Given/When, assert the Then.
If a scenario is ambiguous at verification time, that is a spec defect — file it as an Open Question and block the story until resolved.

---

## Product AC Checklist (PM)

Used by PM to verify that the shipped feature matches the agreed spec.

```markdown
### Product AC — [Story Name]

**Verified by:** [PM Name]  
**Date:** YYYY-MM-DD  
**Build / PR:** [link]

#### Functional Behavior
- [ ] Happy path scenario(s) from spec verified end-to-end
- [ ] Edge case scenario(s) verified
- [ ] Error state(s) show correct message and recovery path
- [ ] No scenarios from spec are missing or behave differently

#### UX & Copy
- [ ] All user-facing copy matches approved copy doc / Figma
- [ ] Empty states are handled (not blank or broken)
- [ ] Loading states are handled (no frozen UI)
- [ ] Responsive / platform behavior matches design spec

#### Non-Regression
- [ ] Existing adjacent features still work correctly
- [ ] No regressions in flows that share state with this feature

#### Open Questions
- [ ] All open questions from spec are resolved before sign-off

**Result:** ✅ Approved | ❌ Blocked — [issue description]
```

---

## Engineering Definition of Done (DoD)

Used by engineers to self-certify before requesting PM review.

```markdown
### Engineering DoD — [Story Name]

**Verified by:** [Engineer Name]  
**PR:** [link]

#### Code Quality
- [ ] Code reviewed by at least one other engineer
- [ ] No new linting errors or type errors
- [ ] No commented-out code left behind
- [ ] No hardcoded values that should be config or env vars

#### Testing
- [ ] Unit tests written for new logic
- [ ] Integration / E2E test covers the happy path scenario
- [ ] Test coverage does not decrease from baseline
- [ ] All CI checks pass (lint, type-check, test)

#### Behavior
- [ ] Feature flag configured correctly (on/off tested)
- [ ] Error handling is explicit — no silent failures
- [ ] Logging / analytics events wired up per spec

#### Documentation
- [ ] API changes documented (if applicable)
- [ ] README / runbook updated if deployment steps changed
- [ ] Migration script tested on staging (if DB change)

#### Deployment
- [ ] Staged deployment tested (staging / preview env)
- [ ] Rollback plan identified
- [ ] No known performance regressions (checked in profiler / monitoring)

**Result:** ✅ Ready for PM Review | ❌ Blocked — [reason]
```

---

## Completion Gate

A story moves to Done **only when both are true:**

```
Engineering DoD ✅ AND Product AC ✅ → Done
```

If either is blocked, the story stays In Review with a clear blocker description.

**How this maps to user-story.md status flow:**

```
In Progress → In Review → PM Approved → Done
                              ↑
                   PM Approved = Product AC ✅
                   Done = Product AC ✅ AND Engineering DoD ✅
```

"PM Approved" means the PM has signed off on behavior (Product AC passed).
The story moves to "Done" only after the engineering lead also confirms DoD is complete.
A story must NOT skip from "In Review" directly to "Done" — the PM Approved step is required.

---

## Common Issues at Review

| Symptom | Root Cause | Fix |
|---------|-----------|-----|
| PM finds behavior mismatch | GWT scenarios were ambiguous | Clarify AC before next sprint |
| Engineer missed an edge case | DoD didn't reference spec scenarios | Link DoD checklist to spec GWT |
| Review cycles > 2 rounds | Spec wasn't approved before dev started | Enforce spec approval gate |
| "Done" but copy is wrong | Copy review not in Product AC | Add copy check to AC template |
