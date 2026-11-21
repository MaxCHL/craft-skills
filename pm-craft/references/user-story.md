# User Story & Task

User Stories express features from the user's perspective.
Tasks are the engineering breakdown of a story — written by engineers, not PMs.

---

## User Story Format

```
As a [persona],
I want to [action],
So that [benefit / outcome].
```

**Acceptance Criteria:** Attached GWT blocks (see product-spec.md for GWT format).
**Story Points / Size:** [XS=1 / S=2 / M=3 / L=5 / XL=8 — never estimate above 8, split instead]

---

## Template

```markdown
## Story: [Short title]

**Epic:** [link]
**Priority:** Must / Should / Could
**Size:** [XS/S/M/L/XL]
**Status:** Backlog | Ready | In Progress | In Review | PM Approved | Done

---

### User Story

As a **[persona]**,
I want to **[action]**,
so that **[outcome]**.

---

### Context

> Why does this story exist? What triggers the user's need?
> Keep to 2-3 sentences. Link to design if available.

**Design reference:** [Figma link]

---

### Acceptance Criteria

**Scenario: [Happy path name]**
```
Given [state]
When  [action]
Then  [outcome]
```

**Scenario: [Edge case name]**
```
Given [edge condition]
When  [action]
Then  [outcome]
```

**Scenario: [Error state name]**
```
Given [failure condition]
When  [action]
Then  [error behavior]
 And  [recovery path]
```

---

### Non-Goals for this Story

- 🚫 [What this story does NOT cover]

---

### Open Questions

> ⚠️ [Question] — Owner: [Name] — Due: [Date]

---

### Tasks (Engineering breakdown — filled in by Eng only, not PM)

<!-- PM: leave this section blank. Engineering fills it during sprint planning. -->
```

---

## Story Sizing Guide

| Size | Points | Complexity indicator |
|------|--------|---------------------|
| XS | 1 | Single UI change, no logic |
| S | 2 | Simple feature, one component |
| M | 3 | Feature with state/API, clear scope |
| L | 5 | Cross-component, some unknowns |
| XL | 8 | Split this — too large for one story |

Stories estimated above 8 must be split before sprint planning.

---

## PM vs Engineering Responsibility

| Layer | Owner | Content |
|-------|-------|---------|
| User Story | PM | Persona, goal, benefit |
| Acceptance Criteria | PM | GWT behavioral scenarios |
| Tasks | Engineering | Technical steps, implementation breakdown |
| Definition of Done | Engineering | Code quality, test coverage, deployment |

PM writes everything above the line. Engineering writes everything below.
PM does NOT write tasks. Engineering does NOT change AC without PM sign-off.

---

## Story Splitting Patterns

When a story is too large (XL or vague), split by:

| Pattern | Example |
|---------|---------|
| Happy path first | Ship core flow; add error handling in next story |
| By persona | Admin story separate from end-user story |
| By platform | Mobile story separate from desktop |
| By data state | Empty state / loaded state / error state as 3 stories |
| By permission level | Read-only first, then edit capabilities |

Never split by technical layer (frontend story + backend story = wrong).
