# Epic

An Epic groups related features or user stories that together deliver a coherent user outcome.
It is the planning unit between an Opportunity and individual Stories.

---

## When to Write an Epic

- A feature requires more than 2 sprints or multiple engineers
- Multiple user stories share a common goal or dependency
- You need a parent container for roadmap tracking
- Stakeholders need a summary without full spec detail

For small, self-contained features: skip directly to Product Spec.

---

## Template

```markdown
# [Epic Name]

**Status:** Backlog | In Planning | In Progress | Done | Parked
**Owner:** [PM Name]
**Engineering Lead:** [Name]
**Quarter / Target:** [Q? YYYY or Sprint range]
**Opportunity Brief:** [link, if exists]
**Product Specs:** [links to child spec(s) — filled in as specs are written]

---

## Goal

> One sentence. What user outcome does this Epic achieve?
> Written as: "Enable [persona] to [do X] so that [outcome Y]."
> Note: this is a strategic framing — deliberately different from User Story format ("As a...I want...so that...").
> Epic goal = team-level direction. User Story = user-centric action. Both are correct; they serve different audiences.

---

## Non-Goals

> High-level intent: why certain things are out of scope for this Epic (principle level).

- 🚫 [What this Epic will NOT do — stated as a principle]
- 🚫 [Adjacent capability excluded and why]

---

## Success Metrics

| Metric | Current | Target | Timeframe |
|--------|---------|--------|-----------|
| [Metric] | [Value] | [Value] | [e.g. 60 days post-launch] |

---

## User Stories Included

| # | Story | Priority | Status |
|---|-------|----------|--------|
| 1 | [As a [persona], I want to...] | Must / Should / Could / Won't | Backlog |
| 2 | [...] | | |

---

## Dependencies

| Dependency | Type | Owner | Status |
|------------|------|-------|--------|
| [API / team / decision] | Blocks / Blocked-by | [Name] | Pending / In Progress / Unblocked / Blocked |

---

## Risks & Rabbit Holes

> 🐇 **Rabbit Hole:** [Description]

- [Risk]: [Mitigation]

---

## Out of Scope

> Specific feature list excluded from this Epic (item level, distinct from Non-Goals above).
> Non-Goals = why; Out of Scope = what specifically.

- [Feature / behavior] — deferred to [Epic name / future cycle]

---

## Open Questions

> ⚠️ **Open Question:** [Question] — Owner: [Name] — Due: [Date]

---

## Milestones

| Milestone | Target Date | Criteria |
|-----------|-------------|----------|
| Spec approved | [date] | Product Spec(s) in "Approved" status; GWT scenarios cover all stories |
| Dev complete | [date] | All stories in `In Review` status (engineering done, awaiting PM sign-off) |
| Shipped | [date] | Feature flag on for 100% |
```

---

## Epic vs Product Spec

| | Epic | Product Spec |
|-|------|-------------|
| Purpose | Planning container + roadmap unit | Engineering contract |
| Audience | PM, Eng Lead, stakeholders | All engineers |
| Detail level | Goal + story list + metrics | GWT per scenario |
| When written | Before stories are broken down | Before sprint starts |
| Approval needed | Yes — before spec writing | Yes — before coding |

---

## Story Prioritization (MoSCoW)

| Label | Meaning |
|-------|---------|
| **Must** | Epic is incomplete without this — blocks launch |
| **Should** | High value, include if capacity allows |
| **Could** | Nice-to-have, only if time permits |
| **Won't** | Explicitly deferred — do not include |

Apply MoSCoW at the Epic level. Individual story priority is refined in sprint planning.
