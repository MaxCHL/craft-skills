# Product Spec (SDD)

The Product Spec is the single source of truth for a feature. It is written **before** any
implementation begins. Engineering should be able to build from the spec alone.

---

## When to Write a Product Spec

- Scope spans more than one sprint
- More than one engineer or team is involved
- User-facing behavior has edge cases or error states
- Stakeholder alignment is needed before development starts

For trivial tasks (typo fix, copy change, single-engineer small feature): skip to Handoff Doc directly.

---

## Template

```markdown
# [Feature Name] — Product Spec

**Status:** Draft | Review | Approved | Shipped
**Author:** [Name]
**Reviewers:** [Name(s)]
**Created:** YYYY-MM-DD
**Last Updated:** YYYY-MM-DD
**Epic:** [link]

---

## Problem Statement

> What user problem are we solving? Written from the user's perspective — not the solution.

[One paragraph. Start with "Users currently..." or "When a user tries to..."]

---

## Success Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| [e.g. Task completion rate] | [x%] | [y%] | [Analytics event / A-B test] |
| [e.g. Support tickets for X] | [N/week] | [<N] | [Zendesk tag] |

---

## Non-Goals

> High-level intent: why certain things are excluded (principle level). Reduces scope creep.
> Distinct from "Out of Scope (Detailed)" below — Non-Goals state the reason; Out of Scope lists specific items.

- 🚫 [What this feature will NOT do — stated as a principle]
- 🚫 [Capability excluded and why — e.g. "Not building admin controls in this spec; addressed in the Permissions epic"]

---

## User Personas

| Persona | Context | Goal |
|---------|---------|------|
| [Role] | [Situation when they encounter this feature] | [What they want to achieve] |

---

## Feature Description

[2-4 paragraphs describing the feature at a high level. Reference design/prototype links here.]

**Design reference:** [Figma link / prototype link]

---

## Acceptance Criteria (GWT)

> Given/When/Then format. Each scenario is a testable contract.
> Write from the user's perspective, not the implementation's.

### Happy Path

**Scenario: [Name]**
```
Given [precondition / user state]
When  [user action]
Then  [expected outcome]
 And  [additional assertions if needed]
```

### Edge Cases

**Scenario: [Name]**
```
Given [edge condition]
When  [user action]
Then  [expected outcome]
```

### Error States

**Scenario: [Name]**
```
Given [failure condition — e.g. network error, invalid input]
When  [user action or system event]
Then  [error message / fallback behavior]
 And  [recovery path]
```

---

## Open Questions

> ⚠️ **Open Question:** [Question] — Owner: [Name] — Due: [Date]

List all unresolved ambiguities. A spec with open questions is still better than no spec —
but questions must be resolved before implementation begins.

**Handoff exception:** If an open question cannot be resolved before handoff, it may proceed only if:
- An explicit assumption is stated inline (e.g., "Assuming X unless engineering flags otherwise")
- The risk/impact is documented in Risks & Rabbit Holes
- Engineering lead has acknowledged the assumption

Do not silently carry open questions into handoff without the above three conditions.

---

## Risks & Rabbit Holes

> 🐇 **Rabbit Hole:** [Description of complexity trap or risky assumption]

- [Risk]: [Mitigation or spike required]
- [Dependency]: [External team / service / decision blocking this]

---

## Out of Scope (Detailed)

> Specific item list excluded from this spec. Distinct from Non-Goals above — this is the what, not the why.

- [Feature / behavior] — deferred to [Epic name / future cycle]

---

## Analytics Events

> Define instrumentation before handoff so DoD can verify it.

| Event name | Trigger | Properties |
|-----------|---------|------------|
| `[event_name]` | [When this fires] | `{ key: value }` |

---

## Feature Flag

**Flag name:** `[flag_name]`
**Default state:** Off
**Kill-switch behavior:** [What happens to in-progress actions when flag is turned off]

---

## Changelog

> Record spec revisions after the initial draft. Track decisions, not just edits.
> Format: date · author · what changed and why.

| Date | Author | Change |
|------|--------|--------|
| YYYY-MM-DD | [Name] | Initial draft |

---

## Amendment (mid-sprint scope change)

> Only add this section if scope changes after the spec is Approved and sprint has started.
> See anti-patterns.md § Scope Change Mid-Sprint Without a Spec Amendment.

**Amendment date:** YYYY-MM-DD  
**Requested by:** [PM / stakeholder name]  
**Approved by:** [PM + Eng Lead sign-off required]  
**Spec status reset to:** Draft → Review → Approved

### What changed

| Section | Before | After | Reason |
|---------|--------|-------|--------|
| [e.g. GWT #3] | [old behavior] | [new behavior] | [why] |

### Impact on in-flight work

- [ ] Stories already In Progress: [list stories affected]
- [ ] GWT scenarios updated to reflect change
- [ ] Acceptance Checklist updated
- [ ] Engineering lead notified and re-acknowledged
```

---

## Ambiguity Detection — Required Checks

Before marking a spec as "Review", verify each item:

**Problem Statement**
- [ ] Written from user perspective (not engineering or product perspective)
- [ ] Does not contain a solution in the problem statement
- [ ] Scope is clear — one problem, not three

**Success Metrics**
- [ ] At least one quantitative metric defined
- [ ] Each metric has a measurement method
- [ ] Target is realistic and time-bound

**Acceptance Criteria**
- [ ] Every "happy path" scenario has a corresponding GWT block
- [ ] At least one error state is covered
- [ ] No `and` conjunctions inside a single `When` clause (split if needed)
- [ ] No vague terms: "fast", "easy", "nice", "properly" — replace with measurable criteria

**Open Questions**
- [ ] Every ambiguity is listed (if none, write "None — all requirements are clear")
- [ ] Each question has an owner and a due date

**Non-Goals**
- [ ] At least one Non-Goal is stated (forces the author to think about scope)

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Writing "The system should..." | Write from user perspective: "Users can..." |
| Merging multiple features into one spec | One spec per independently shippable feature |
| AC written as implementation steps | AC describes behavior, not code |
| No error states covered | Add at least one error scenario per major flow |
| "TBD" without owner or date | Every TBD must have an owner and deadline |
| Spec approved with open questions | Block approval until questions are resolved |
