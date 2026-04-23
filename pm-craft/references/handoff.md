# Handoff Doc

Written by PM + Design before engineering begins a sprint.
The handoff doc is the entry point for engineers — it should answer every question
they might have without needing a meeting.

---

## When to Write

- Before any engineering sprint starts
- When design has reached "ready for dev" state
- When a spec has been approved but assets/links need to be consolidated

---

## Template

```markdown
# [Feature Name] — Handoff

**Date:** YYYY-MM-DD
**PM:** [Name]
**Designer:** [Name]
**Engineering Lead:** [Name]
**Sprint / Target:** [Sprint # or date]

---

## Summary

> 2-3 sentences. What is this feature, who is it for, and what does it do?
> Engineers should understand the scope in 30 seconds.

---

## Links

| Resource | Link | Notes |
|----------|------|-------|
| Product Spec | [link] | Approved — [date] |
| Figma / Design | [link] | Frame: [specific page/frame name] |
| Prototype | [link] | Interactive: [yes/no] |
| Epic | [link] | |
| Analytics plan | [link] | Events to instrument: [list] |
| API docs / contract | [link] | |
| Staging env | [link] | Branch: [name] · Credentials: [where to find] · Scope: [what data / features are active] |

---

## Design Assets

> Skip this section for backend / API / ops features with no UI. Document API contract, schema, or infrastructure spec in Links instead.

- [ ] All states designed: empty, loading, error, success
- [ ] Mobile / responsive breakpoints included
- [ ] Component specs (spacing, color tokens, typography) in Figma Dev Mode
- [ ] Icon exports available in [format: SVG / PNG / Lottie]
- [ ] Any custom animations: [Lottie file / CSS spec]

---

## Behavior Summary

> Key behaviors that are NOT obvious from the Figma alone.
> Describe state transitions, conditional rendering, and timing.

| Condition | Behavior |
|-----------|---------|
| [User state / data state] | [What the UI does] |
| [Error from API] | [Error message shown / fallback] |
| [Empty state] | [What is displayed] |
| [Permission level: guest] | [e.g. Edit button hidden; export disabled; read-only banner shown] |

---

## Analytics / Instrumentation

Events to fire:

| Event name | Trigger | Properties |
|-----------|---------|------------|
| `[event_name]` | [When] | `{ key: value }` |

---

## Feature Flag

**Flag name:** `[flag_name]`  
**Default state:** Off  
**Rollout plan:** [Internal only → 10% → 100%]  
**Kill-switch behavior:** [What happens when flag is turned off mid-rollout]

---

## Open Questions (Unresolved)

> ⚠️ **Open Question:** [Question] — Owner: [Name] — Due: [Date]

_If any open questions remain at handoff, list them here. Engineering should not start
until these are resolved, or explicitly agreed to proceed with a stated assumption._

---

## Out of Scope (Reminder)

These items were explicitly excluded from this sprint:
- 🚫 [Item]

---

## Ready Checklist (PM sign-off before handing off)

- [ ] Product Spec is in "Approved" status — **OR** feature is confirmed trivial (scope documented in Summary above, no spec required per product-spec.md § When to Write)
- [ ] All Figma frames linked and in "Ready for Dev" status
- [ ] Analytics events defined
- [ ] Feature flag name agreed with engineering
- [ ] No open questions blocking development
- [ ] Engineering lead has reviewed and acknowledged this doc (comment in doc / Slack thread linked here)
```

---

## What "Ready for Dev" Means

A story is not ready for dev until:

1. **Spec is approved** — PM + Eng Lead signed off. Exception: confirmed trivial feature (scope documented in Handoff Summary, no spec required per product-spec.md § When to Write).
2. **Design is final** — No "TBD" frames, all states covered. Exception: backend / API / ops features with no UI — skip design requirement; document API contract or schema in Links instead.
3. **Open questions resolved** — Or explicitly accepted with a stated assumption and risk noted.
4. **Dependencies unblocked** — APIs available, third-party contracts confirmed.

If any of the above is missing, return the story to "Spec / Design" — do not hand off partial work.

---

## Handoff Anti-Patterns

| Anti-pattern | Problem | Fix |
|-------------|---------|-----|
| Handing off without an approved spec (non-trivial feature) | Engineers build the wrong thing | Enforce spec approval gate; use trivial exception only for confirmed low-scope changes |
| Design has only the happy path | Engineers must guess at edge cases | All states required before handoff |
| "Just look at the Figma" | Behavior nuances get lost | Always include behavior summary table |
| No feature flag defined | No rollback option | Every feature needs a flag |
| Open questions in the handoff doc | Engineers blocked mid-sprint | Resolve before handoff, or explicitly accept the assumption |
