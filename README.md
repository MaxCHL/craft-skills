# craft-skills

A collection of Claude Code skills for product and design workflows.

---

## Skills included

| Skill | Purpose | Trigger examples |
|-------|---------|-----------------|
| **pm-craft** | PM workflow — SDD-first, spec-before-code, plus meeting minutes from raw transcripts | 規格、PRD、user story、驗收標準、handoff、會議記錄、逐字稿 |
| **design-craft** | HTML-native UI design — prototypes, slides, infographics | 做原型、做 mockup、幫我設計、HTML 簡報、資訊圖 |
| **pptx-craft** | Style-driven PowerPoint — 7 distinct presets, anti-AI checklist | distinctive deck, editorial slides, swiss-style, bento grid, don't make it look AI |

---

## Install

Pick **one** of the two methods. Do not use both at once, or each skill shows up twice.

### Option A: npx (copies into `~/.claude/skills/`)

```bash
npx github:MaxCHL/craft-skills
```

Installs all three skills (pm-craft, design-craft, pptx-craft) into `~/.claude/skills/`.
Skills keep their plain names (`pm-craft`, `design-craft`, `pptx-craft`).
Requires [Claude Code](https://claude.ai/code) and Node.js 16+.

Re-running it updates the skills in place and overwrites local edits to the shipped files.
Each installed skill gets a `.craft-skills-manifest.json` listing the files the installer wrote,
together with a SHA-256 of each file's content. On the next run, a file that was shipped before but
is no longer shipped is removed only if its current content still matches the checksum recorded at
install time. This detects files you modified, but it does not authenticate the manifest: a manifest
edited by hand with a correct checksum can cause that file to be removed. A modified file is kept
with a warning ("modified or not installed by craft-skills — kept") and dropped from tracking.
Manifests written by older versions have no checksums: their entries are never deleted, only
dropped from tracking with a notice. Files you added yourself (a `.venv`, generated decks, notes)
are never touched.

Each skill is installed independently: if one fails (for example a path conflict), the others are
still installed and the command exits non-zero. The installer never follows symlinks that exist
when it runs: if a skill folder, a subfolder inside it, or a target file is a symlink, that skill
is refused (nothing is written or deleted through the link) and the installer reports it. Files
are written to an unpredictably named temp file and renamed into place. Symlinks in the package
itself are skipped. If `~/.claude/skills` is a dangling symlink or not a directory, the installer
prints an error and exits with status 1.

Limits of this protection: the checks are path-based (Node.js has no directory-handle APIs such as
`openat`), so the guarantee covers symlinks present before or at install time. It assumes no other
process modifies your skills directory while the installer is running; a process that can do that
already has write access to your own `~/.claude/skills`.

### Option B: Claude Code plugin marketplace

```text
/plugin marketplace add MaxCHL/craft-skills
/plugin install craft-skills@craft-skills
```

The same steps work from a shell as `claude plugin marketplace add MaxCHL/craft-skills` and
`claude plugin install craft-skills@craft-skills`. Third-party marketplaces do not auto-update
by default: refresh with `claude plugin marketplace update craft-skills` and
`claude plugin update craft-skills@craft-skills` (or use "Update now" in `/plugin`), then
`/reload-plugins`. Claude Code 2.1.275+ can also do both steps at once:
`/plugin install craft-skills --marketplace MaxCHL/craft-skills`.

Plugin skills are namespaced by the plugin name: invoke them as `craft-skills:pm-craft`,
`craft-skills:design-craft` and `craft-skills:pptx-craft`. Automatic triggering from your
request works the same way as with Option A.

If you switch methods, remove the old one first (`claude plugin uninstall craft-skills@craft-skills`,
or delete `~/.claude/skills/{pm-craft,design-craft,pptx-craft}`).

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
| Meeting Minutes | Turn raw meeting transcripts (STT output) into multi-dimensional minutes: TL;DR, Executive Summary, Detailed Notes, Decisions & Action Items |

**Meeting Minutes** — four built-in templates with routing keywords:

| Template | Use for |
|----------|---------|
| `template-product.md` | Product / business decision meetings (roadmap, OKR, pricing) |
| `template-one-on-one.md` | 1-on-1s and manager check-ins (privacy-aware) |
| `template-customer-interview.md` | User research and customer interviews (JTBD framework) |
| `template-technical.md` | Architecture / technical decision meetings (ADR-style) |

Includes a 3-layer annotation system for STT corrections (`[需確認]` / `[推測:X]` / `[unclear]`),
a 6-phase workflow (Intake → Preprocess → Segment → Extract → Assemble → Verify & Save),
and saves output to `./meeting-notes/YYYY-MM-DD-{slug}.md` by default.

**Core principles**
1. Spec before code — no implementation discussion until spec is agreed
2. GWT as the contract — Given/When/Then bridges PM, Design, and Engineering
3. Ambiguity is a blocker — surface open questions before writing specs
4. Non-Goals are first-class — what you won't do is as important as what you will
5. Meeting minutes are evidence — preserve dissent, mark uncertainty, never invent metadata

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
Brutalist workshop), 18 layout primitives with helper functions, and a 15-point anti-AI QA checklist.

```bash
# Try a recipe locally
cd ~/.claude/skills/pptx-craft
uv venv && uv pip install python-pptx
.venv/bin/python -m recipes.tech_talk_swiss
```

---

## Brand Extension Pattern (pptx-craft)

pptx-craft is brand-neutral but supports **brand color overlays** via a sibling-skill convention.
Any installed Claude Code skill named `<brand>-pptx-craft` is auto-detected by pptx-craft's
Step 0 and offered (default: No) as an optional color overlay.

```
~/.claude/skills/
├── pptx-craft/             # base (this repo)
├── acme-pptx-craft/        # any brand extension you build
└── ...
```

Each extension provides only:
- `references/brand-tokens.md` — hex / RGB / contrast / usage ratios
- `references/style-overlays.md` — how the brand's colors map onto each of pptx-craft's 7 styles

Layout, typography, primitives, grid, and the anti-AI checklist still come from pptx-craft.
This keeps brand-specific colors out of the public repo while letting any team layer their CI
on top of the same proven structure.

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

## Note on examples

Company and product names in the examples and recipes (for instance "Acme Bikes" or "Atelier Desk") are fictional placeholders. Any resemblance to a real business is coincidental.
