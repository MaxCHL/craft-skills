---
name: pm-craft
description: >
  PM workflow skill for spec-driven development (SDD). Covers the full product lifecycle
  from opportunity discovery to engineering handoff. Produces Markdown documents:
  Opportunity Brief, Epic, User Story, Product Spec (GWT), Acceptance Checklist, Handoff Doc.
  Use when the user wants to write PM documents, define requirements, break down features,
  or prepare engineering handoffs — NOT for coding, UI design, or architecture review.
  Trigger phrases (zh-TW): 寫規格、寫 spec、寫需求、寫 PRD、寫 story、拆 story、
  驗收標準、AC、handoff、交付工程、機會探索、寫 Epic、產品文件、SDD、GWT、
  幫我想清楚這個功能、這個功能怎麼定義、怎麼寫需求。
  Trigger phrases (en): write spec, product spec, PRD, user story, acceptance criteria,
  engineering handoff, opportunity brief, epic planning, feature requirements, SDD, GWT.
---

# pm-craft

A Claude Code skill for PM workflow — lightweight, SDD-first, spec-before-code.

---

## Step 0 — Input Detection (Always Run First)

Before routing to any reference, detect what the user gave you:

```
What did the user provide?
│
├── Image / screenshot
│     └── → intake-advisor.md § Visual Input
│
├── Attached file (PDF / PPTX / DOCX / TXT / MD)
│     └── → intake-advisor.md § Document Input
│
├── Vague / open-ended natural language
│     (no clear document type, exploring, asking "what should I do")
│     └── → intake-advisor.md § Open-Ended Input
│
└── Clear request with recognizable intent
      └── → Routing Table (Step 1)
```

**Vague input signals** (any of these → go to intake-advisor):
- No document type mentioned
- Phrased as a question ("我想…", "我們要做…", "有個想法…", "幫我看看這個")
- Provides context but no clear output request
- Contains both problem AND solution without separation

---

## Step 1 — Routing Table

Only reach here after input type is confirmed.

| Intent | Trigger signals | Load reference |
|--------|----------------|---------------|
| 機會探索 | 機會、問題、insight、市場、為什麼做、用戶痛點、值不值得做 | `references/opportunity-brief.md` |
| Epic 規劃 | epic、功能群組、feature set、大功能、一整個季度、roadmap | `references/epic.md` |
| 拆解故事 | story、使用者故事、user story、task、拆解、怎麼切、怎麼分 | `references/user-story.md` |
| 寫規格 | spec、規格、PRD、product spec、需求文件、SDD、怎麼寫需求 | `references/product-spec.md` |
| 驗收標準 | AC、驗收、acceptance criteria、DoD、完成定義、怎麼驗 | `references/acceptance-checklist.md` |
| 工程交付 | handoff、交付、給工程師、設計交付、開發前、ready for dev | `references/handoff.md` |
| 反模式 / 風險 | 反模式、anti-pattern、常見錯誤、不要做、風險、踩坑 | `references/anti-patterns.md` |
| 引導 / 不確定 | *(fallback — if no match above)* | `references/intake-advisor.md` |

---

## Step 2 — Inter-Skill Integration

pm-craft does not work alone. Know when to pull in other skills and in which direction.

### Outbound — pm-craft triggers other skills

| Condition in pm-craft workflow | Trigger skill | Hand-over content |
|-------------------------------|--------------|------------------|
| Spec needs a UI prototype or mockup (no Figma yet) | **design-craft** | Feature description + personas + key screens list |
| Product Spec references existing Figma but GWT coverage is incomplete | **design-craft** | Figma link + list of scenarios not yet covered by design |
| Product Spec has complex technical architecture | **arch-review** *(if available)* | Non-Goals, constraints, GWT edge cases |
| Handoff doc references a design not yet created | **design-craft** | Screen list from spec + device target |

**When arch-review is not available:** flag the technical complexity explicitly in the spec as a Risk / Rabbit Hole, and add an Open Question for the engineering lead to address during sprint planning. Do not skip the flag — surface it, even if there is no dedicated review process.

**How to trigger design-craft from pm-craft:**

When writing a Product Spec and the feature needs visual design, emit this bridge prompt inline:

```
> 🎨 design-craft handoff: [Feature name]
> Problem: [one sentence — copied from Product Spec § Problem Statement]
> Success metric: [key metric — copied from Product Spec § Success Metrics]
> Non-Goals: [relevant constraints that affect design scope]
> Target: [web / iOS / Android / macOS]
> Screens needed: [list]
> Key states: [empty / loading / error / success]
> Open Questions: [any unresolved questions that affect design decisions]
> Style direction: [T-code or description, optional]
> Spec reference: [section name in this doc]
```

### Inbound — other skills hand off to pm-craft

| Upstream skill | When it calls pm-craft | What it provides |
|---------------|----------------------|-----------------|
| **design-craft** | Prototype is ready, needs spec to formalize behavior | Figma/HTML prototype link + screen descriptions |
| **arch-review** | Architecture review surfaces product-level decisions | Constraints, rejected approaches, performance limits |

**How to receive from design-craft:**

When given a prototype or design file:
1. Run intake-advisor.md § Document / Visual Input
2. Extract: screens, states, user flows, copy
3. Map each screen to a GWT scenario in the Product Spec
4. Flag gaps (states in spec with no design, designs with no spec coverage)

---

## Core Principles

1. **Spec before code** — no implementation discussion until the spec is written and agreed
2. **Lightweight by default** — only produce the document the team actually needs; no forced ceremony
3. **GWT as the contract** — Given/When/Then is the language between PM, Design, and Engineering
4. **Ambiguity is a blocker** — surface unclear requirements as explicit open questions before writing specs
5. **Non-Goals are first-class** — what you won't do is as important as what you will

---

## Output Format Rules

- All documents are Markdown
- Use `[ ]` checkboxes for actionable items (AC, DoD, handoff checklists)
- Use `> ⚠️ **Open Question:**` callout for unresolved ambiguities
- Use `> 🚫 **Out of Scope:**` callout for explicit Non-Goals
- Use `> 🐇 **Rabbit Hole:**` callout for identified risks / complexity traps
- Tables for structured data (personas, metrics, error states)
- Keep each document under one printed page unless content demands more

---

## Status Vocabulary (Per Document Type)

Each document has its own status lifecycle. These are intentionally different — each reflects the document's stage, not a unified pipeline.

| Document | Status values |
|----------|-------------|
| Opportunity Brief | `Exploring` → `Validating` → `Approved` → `Parked` |
| Epic | `Backlog` → `In Planning` → `In Progress` → `Done` / `Parked` |
| Product Spec | `Draft` → `Review` → `Approved` → `Shipped` |
| User Story | `Backlog` → `Ready` → `In Progress` → `In Review` → `PM Approved` → `Done` |
| Handoff | No status field — use the linked Product Spec's status as proxy |

**Gate dependencies:** Spec must be `Approved` before stories enter `In Progress`. Story must reach `PM Approved` + Engineering DoD before moving to `Done`.

---

## Document Hierarchy

```
Opportunity Brief  →  Epic  →  Product Spec
                                    ↓
                              User Stories  (broken down from spec, refined in sprint planning)
                                    ↓
                            Acceptance Checklist
                                    ↓
                                Handoff Doc
```

**design-craft integration is bidirectional — not a downstream step:**

```
pm-craft  ──────────────────────────→  design-craft
 (Product Spec with UI needs)           (prototype / mockup)
          ←──────────────────────────
           (prototype → feeds back into GWT coverage)
```

Trigger design-craft at the **Product Spec stage** (not only at Handoff), whenever UI behavior needs to be validated before writing GWT scenarios.

Match depth to team size and ambiguity:

| Team / Ambiguity | Start at |
|-----------------|---------|
| Solo / low ambiguity | Product Spec |
| Small team | Epic → Product Spec |
| Multi-team / high ambiguity | Opportunity Brief → Epic → Product Spec |

---

## Quick Reference: SDD Gate Checklist

Before calling a spec "done":

- [ ] Problem statement is written from the user's perspective (not the solution)
- [ ] Success Metrics defined and measurable
- [ ] At least one Non-Goal explicitly stated
- [ ] Every major feature has GWT acceptance criteria
- [ ] Ambiguities surfaced as Open Questions (with owners and due dates)
- [ ] Rabbit Holes / Risks identified
- [ ] Edge cases and error states covered in GWT
- [ ] Handoff doc links to Figma/prototype, spec, and open questions
- [ ] design-craft handoff emitted (if UI screens are needed)
