# craft-skills

A collection of Claude Code skills for product and design workflows.

---

## Skills included

| Skill | Purpose | Trigger examples |
|-------|---------|-----------------|
| **pm-craft** | PM workflow — SDD-first, spec-before-code | 寫規格、寫 spec、寫需求、user story、handoff |
| **design-craft** | HTML-native UI design — prototypes, slides, infographics | 做原型、做 mockup、幫我設計、做簡報 |
| **pptx-craft** | Style-driven PowerPoint — 7 distinct presets, anti-AI checklist | distinctive deck, editorial slides, swiss-style, bento grid, don't make it look AI |

---

## Install

```bash
npx github:MaxCHL/craft-skills
```

Installs both skills into `~/.claude/skills/`. Requires [Claude Code](https://claude.ai/code).

---

## pm-craft

A skill for the full PM document lifecycle, built on Spec-Driven Development (SDD) principles.

**Supported documents**

| Document | When to use |
|----------|------------|
| Opportunity Brief | New problem / idea validation |
| Epic | Feature set planning, roadmap unit |
| Product Spec | GWT acceptance criteria, engineering contract |
| User Story | Story breakdown, sprint-level tasks |
| Acceptance Checklist | PM AC + Engineering DoD |
| Handoff Doc | Design → Engineering handoff |

**Core principles**
1. Spec before code — no implementation discussion until spec is agreed
2. GWT as the contract — Given/When/Then bridges PM, Design, and Engineering
3. Ambiguity is a blocker — surface open questions before writing specs
4. Non-Goals are first-class — what you won't do is as important as what you will

---

## design-craft

A skill for high-fidelity HTML prototypes, interactive mockups, presentation slides,
data infographics, and design critique — all in native HTML/CSS/JS.

**Supported output types**

| Output | When to use |
|--------|------------|
| Prototype / Mockup | Feature UI, interactive flows |
| Presentation slides | Decks, pitches, reports |
| Infographic | Data visualization, dashboards |
| Design critique | Review existing UI for issues |
| Style exploration | T1–T11 Timeless + R1–R9 Trending styles |

**20 design styles**

| Set | Count | Codes |
|-----|-------|-------|
| Timeless | 11 | T1–T11 |
| Trending | 9 | R1–R9 |

---

## pptx-craft

A skill for **distinctive PowerPoint decks** that don't look AI-generated. Sits on top of the
standard `pptx` skill (which handles file ops) and adds a style-driven design layer.

**7 style presets**

| Style | Register |
|-------|----------|
| Swiss / International | rigorous, systematic, neutral |
| Editorial / Magazine | narrative, premium, long-form |
| Bento Grid | modular, product-launch, dense-but-clean |
| Brutalist | experimental, provocative, anti-corporate |
| Big Type / Manifesto | keynote, single-idea-per-slide |
| Data-dense / Analytical | Tufte-grade, numbers-heavy |
| Monograph / White-paper | academic, document-as-deck |

**Core principles**
1. **Style first, layout second, content third** — pick the visual register before opening an editor
2. **Rhythm beats symmetry** — never reuse the same layout primitive on adjacent slides
3. **Anti-AI checklist is the acceptance gate** — 15 AI tells must be absent before a deck is "done"

**Includes**: 4 executable `python-pptx` recipes (Swiss tech talk, Editorial pitch, Bento launch,
Brutalist workshop), 16 layout primitives with helper functions, and a 15-point anti-AI QA checklist.

```bash
# Try a recipe locally
cd ~/.claude/skills/pptx-craft
uv venv && uv pip install python-pptx
.venv/bin/python -m recipes.tech_talk_swiss
```

---

## Skill integration

pm-craft and design-craft are designed to work together:

```
pm-craft (Product Spec)  ──────→  design-craft (prototype)
                         ←──────  (prototype feeds back into GWT coverage)
```

When a spec needs UI validation, pm-craft emits a `design-craft handoff` block.
When a prototype is ready, design-craft hands back to pm-craft to formalize behavior in GWT.

---

## License

MIT
