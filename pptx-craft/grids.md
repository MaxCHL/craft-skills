# Grid Systems

Four canonical grids. Each style preset declares which grid(s) it uses. Don't mix grids within one deck unless the style explicitly permits it (only `editorial` does).

Standard slide is 13.333" × 7.5" (16:9 widescreen). All numbers below assume this size.

---

## 1. Manuscript grid (single column)

**Used by:** `editorial`, `monograph`

One main reading column, often offset from center. Used when the slide is meant to be **read as text**.

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  ┌──────────────────────────────┐  ┌──────────┐  │
│  │                              │  │          │  │
│  │  Main column                 │  │ Margin   │  │
│  │  60–75 ch wide               │  │ note     │  │
│  │                              │  │ column   │  │
│  │  Body text lives here.       │  │          │  │
│  │  Line-height 1.5–1.6.        │  │ Captions │  │
│  │  Ranged-left.                │  │ Footnote │  │
│  │                              │  │ refs     │  │
│  └──────────────────────────────┘  └──────────┘  │
│                                                  │
└──────────────────────────────────────────────────┘
   ↑                                ↑           ↑
   0.8" margin                   gutter      margin
```

Measurements:
- Outer margins: 0.8–1.2"
- Main column: ~8" wide (~65 chars at 12pt)
- Optional margin column: ~2" wide
- Gutter: 0.4"

---

## 2. Column grid (12-col)

**Used by:** `swiss`, `data-dense`, `bento` (as base)

The Swiss workhorse. Divide the usable area into 12 equal columns with gutters; place every element on column lines.

```
┌──────────────────────────────────────────────────┐
│ 0.6"                                             │
│ ┌─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┐                       │
│ │ │ │ │ │ │ │ │ │ │ │ │ │   12 columns          │
│ │ │ │ │ │ │ │ │ │ │ │ │ │   width: ~0.97"       │
│ │ │ │ │ │ │ │ │ │ │ │ │ │   gutter: 0.2"        │
│ │ │ │ │ │ │ │ │ │ │ │ │ │                       │
│ └─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘                       │
└──────────────────────────────────────────────────┘
```

Typical span patterns:
- Headline: cols 1–8 (occupies 2/3 width)
- Body: cols 1–6
- Sidebar: cols 9–12
- Full-bleed: cols 1–12

Helper math: `col_x(n) = margin_left + (n-1) * (col_w + gutter)` — implemented in `lib/helpers.py`.

---

## 3. Modular grid (Bento)

**Used by:** `bento`, `data-dense` (small multiples)

Rows × columns of irregular cells, **gutters as separators**. Cells can span multiple grid units.

```
┌──────────────────────────────────────────────────┐
│  ┌─────────────┐  ┌──────┐  ┌─────────────────┐  │
│  │             │  │      │  │                 │  │
│  │  Hero cell  │  │ Cell │  │  Wide cell      │  │
│  │  (2x1)      │  │      │  │  (2x1)          │  │
│  │             │  └──────┘  └─────────────────┘  │
│  │             │  ┌──────────────────┐  ┌─────┐  │
│  │             │  │                  │  │     │  │
│  │             │  │  Mid cell        │  │ Tall│  │
│  └─────────────┘  │                  │  │ cell│  │
│                   └──────────────────┘  │     │  │
│                                         └─────┘  │
└──────────────────────────────────────────────────┘
```

Rules:
- Base unit: 4×3 grid = 12 modules
- Outer margin: 0.5"
- Gutter: 0.15"
- Cell radius: 12–16pt (bento permits rounded corners)
- **Mix at least 3 different cell sizes** — never a uniform 3×2 grid of identical cells

---

## 4. Hierarchical grid

**Used by:** `brutalist`, `editorial` (chapter openers)

No regular grid. Composition by visual weight. Use only when you can defend each placement.

```
┌──────────────────────────────────────────────────┐
│ Huge headline element                            │
│ ████████████████████████████████████ ←clipped    │
│                                                  │
│              small body text                     │
│              over here, offset                   │
│                                                  │
│                                                  │
│                                       ┌────────┐ │
│                                       │ image  │ │
│                                       │ bottom │ │
│                                       │ right  │ │
│                                       └────────┘ │
└──────────────────────────────────────────────────┘
```

Discipline:
- Pick **one** dominant element (60–70% visual weight)
- Place secondary elements at points of golden-ratio tension, not center
- Asymmetry is the point — refuse symmetric balance

---

## Choosing a grid

| If you have… | Use |
|-----|-----|
| Prose to read | Manuscript |
| Multiple equal-priority data blocks | Column |
| Many small modules of different types | Modular |
| A statement to make with one or two elements | Hierarchical |
