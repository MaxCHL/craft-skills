---
name: pptx-craft
description: "Design-led PowerPoint creation. Use AFTER deciding to make a .pptx when the output must NOT look AI-generated. Pairs with the `pptx` skill (which handles file ops and rendering). Triggers: 'distinctive deck', 'editorial slides', 'pitch deck with style', 'don't make it look AI', 'swiss-style slides', 'bento grid presentation'."
---

# pptx-craft

A **style-driven** layer on top of the existing `pptx` skill. Where `pptx` covers *how to operate PowerPoint*, this skill covers *how to design slides that look like a human made them*.

## When to Use

Use `pptx-craft` when **all** of the following are true:
- The user wants a `.pptx` output.
- Visual quality matters (pitch deck, keynote, conference talk, exec review, design portfolio, marketing).
- "Looks AI-generated" is unacceptable.

Use the plain `pptx` skill instead when:
- The user just wants content extraction, template filling, or quick internal slides.
- The user supplied a strict corporate template (no design freedom).

## Sibling Skills

| Need | Use |
|------|-----|
| Reading / extracting `.pptx` content | `pptx` skill (`markitdown`) |
| Rendering `.pptx` → PDF → JPG | `pptx` skill (`scripts/office/soffice.py`) |
| Visual QA loop | `pptx` skill QA section |
| **Designing distinctive layouts** | **this skill** |

## The Three Rules

1. **Style first, layout second, content third.** Pick the visual register before opening an editor.
2. **Rhythm beats symmetry.** Never use the same layout primitive on 2 consecutive slides. Vary density.
3. **Anti-AI checklist is the acceptance gate.** A deck is not done until it passes `anti-ai.md`.

## Workflow

### Step 0 — Brand extension detection (optional, run first)

Before the interview, scan `~/.claude/skills/` for **brand extension skills** — any directory
matching the pattern `*-pptx-craft` (other than `pptx-craft` itself). These are user-installed
brand-color overlays that follow the same `references/brand-tokens.md` + `references/style-overlays.md`
convention.

```bash
ls -d ~/.claude/skills/*-pptx-craft 2>/dev/null | grep -v '/pptx-craft$'
```

- **None found** → skip to Step 1, run the normal workflow.
- **One or more found** → ask the user:
  > 「偵測到 N 個 brand extension（例：`pf-pptx-craft`），要套用品牌色嗎？(y/N)」
  - Default answer is **No** — assume neutral palette unless the user explicitly opts in.
  - If user answers **Yes** → load that extension's `references/brand-tokens.md` and
    `references/style-overlays.md`. Apply its color overrides whenever Steps 2-5 reference
    color tokens. Typography / grid / anti-AI rules still come from this skill.
- **Multiple found** → list them and let the user pick one (or none).

Brand extensions are color-only overlays; they never replace the style preset itself.
The user still picks a style in Step 2 — the extension just swaps which colors fill the slots.

### Step 1 — Interview (mandatory, 3 questions)

Ask the user, then write the answers down explicitly before designing:

1. **Topic & audience** — Who reads this, what decision do they make?
2. **Medium** — Projected on a screen / shared as PDF / clicked through on laptop / printed?
3. **Register** — One word: rigorous / experimental / warm / cold / luxurious / scrappy / academic / playful?

If the user cannot answer #1 or #3, refuse to start. Generic input → generic output.

### Step 2 — Style selection

Map the register to a style preset and propose 1–2 candidates. Read the matching file in `styles/`:

| Register | Preset file |
|----------|------|
| rigorous, neutral, systematic | [styles/swiss.md](styles/swiss.md) |
| narrative, premium, magazine | [styles/editorial.md](styles/editorial.md) |
| modular, product-launch, dense-but-clean | [styles/bento.md](styles/bento.md) |
| experimental, provocative, anti-corporate | [styles/brutalist.md](styles/brutalist.md) |
| keynote, manifesto, single-idea-per-slide | [styles/big-type.md](styles/big-type.md) |
| analytical, numbers-heavy, FT/Bloomberg | [styles/data-dense.md](styles/data-dense.md) |
| academic, white-paper, long-form | [styles/monograph.md](styles/monograph.md) |

Each style file declares: typography stack, color palette, margins, default grid, allowed primitives, forbidden patterns.

### Step 3 — Rhythm script

Before writing code, draft a **slide-by-slide rhythm script**. Example:

```
01 manifesto-one-line       (title)
02 pull-quote               (problem statement)
03 big-stat                 (market size)
04 half-bleed-image         (product hero)
05 bento-3x2                (features)
06 manuscript-narrative     (story)
07 data-table-full          (competitive)
08 timeline-horizontal      (roadmap)
09 manifesto-one-line       (CTA)
```

Hard rule: **no primitive repeats on adjacent slides**. If you only know one primitive, re-read [primitives.md](primitives.md).

### Step 4 — Build

Use [lib/helpers.py](lib/helpers.py) for the canonical primitives. For full end-to-end examples see [recipes/](recipes/).

Render via the `pptx` skill pipeline:

```bash
python scripts/office/soffice.py --headless --convert-to pdf out.pptx
pdftoppm -jpeg -r 150 out.pdf slide
```

### Step 5 — Anti-AI QA (acceptance gate)

Run every item in [anti-ai.md](anti-ai.md). If any item fails, fix and re-render. A subagent with fresh eyes is mandatory for visual QA — you have anchoring bias from the code.

## File Map

```
pptx-craft/
├── SKILL.md             ← you are here
├── styles/              ← 7 style presets
├── grids.md             ← 4 grid systems
├── primitives.md        ← 16 layout primitives with code
├── anti-ai.md           ← 15 AI tells + QA checklist
├── lib/helpers.py       ← reusable primitive functions
└── recipes/             ← 4 complete executable examples
```

## Brand Extension Pattern

To add brand colors on top of pptx-craft without forking it, create a sibling skill named
`<brand>-pptx-craft` (e.g., `acme-pptx-craft`) with this structure:

```
<brand>-pptx-craft/
├── SKILL.md
└── references/
    ├── brand-tokens.md      ← hex / RGB / usage ratios / contrast warnings
    └── style-overlays.md    ← per-style (swiss/editorial/.../monograph) PF token mapping
```

Step 0 of pptx-craft will auto-detect it and offer to apply it (default: No).
Pure color overlay — typography, grid, primitives, anti-AI checklist still come from pptx-craft.

## Quick Decision Tree

```
Is there a strict corporate template?
├── yes → use `pptx` skill only, don't override design
└── no  → continue
            │
            Audience expects polish / "designer-made" feel?
            ├── no  → use `pptx` skill defaults
            └── yes → use this skill, run full 5-step workflow
```

## Common Failure Modes (read before you start)

- **Skipping the interview.** Output will be generic. Refuse to skip.
- **Picking a style mid-build.** Style decisions are upstream — changing them late means rebuilding.
- **Using the same primitive for "consistency".** That is the AI look. Consistency is in *style tokens* (color, type, margin), not in *layout repetition*.
- **Not running the anti-AI checklist.** This is the single most common reason output still looks AI-made.
