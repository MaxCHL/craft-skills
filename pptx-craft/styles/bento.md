# Style: Bento Grid

**Register:** modular · product-launch · dense-but-clean · contemporary
**Heritage:** Japanese bento boxes; popularized by Apple keynote graphics (M-series chips), Notion, Vercel, Raycast
**Modern analogs:** Apple "iPad Pro" pages, Linear feature pages, Arc browser launch site

## When to use
- Product launches with many features to show at once
- "What's new" recaps
- Comparison pages where each cell has different content density
- Audience scans, not reads

## Token spec

### Typography
- **Headline:** geometric sans — Söhne / Inter / SF Pro Display — 32–40pt, **medium** weight
- **Cell title:** 16–20pt medium, sits at top of each cell
- **Cell body:** 12–14pt regular, line-height 1.4
- **Cell caption / number:** 11pt or 48pt+ (the big-number-in-cell trick)
- One font family throughout.

### Color palette
| Variant | Bg | Cell | Ink | Accent set |
|---------|----|----|----|-----------|
| Light | `#F2F2F2` | `#FFFFFF` | `#1D1D1F` | one cell uses brand color background |
| Dark | `#000000` | `#1C1C1E` | `#F2F2F7` | one cell uses brand color, one uses gradient |
| Tinted | brand-50 | brand-100 | brand-900 | accent cells in brand-500 |

**Rule:** 1–2 "hero cells" get color treatment; the rest stay neutral. Never color every cell.

### Grid
- Slide divided into a **3×2** or **4×3** module grid with `0.15"` gutters
- Cells are **not** all the same size — merge cells to create a 2×1 hero, a 1×2 sidebar, etc.
- Each cell has **rounded corners radius 12–16pt** (this style permits rounded corners; others don't)
- No cell touches another — gutters are sacred

### Spacing
- Within a cell: `0.25"` inner padding
- Each cell behaves like a mini-slide

## Allowed primitives
`bento-3x2` · `bento-4x3` · `bento-hero-plus-grid` (one big cell + small cells) · `big-stat` (inside a cell) · `feature-icon-cell` · `screenshot-cell` · `chart-cell`

## Forbidden patterns
- All cells the same size (that's just a grid, not a bento)
- More than 6 cells visible at once (cognitive overload)
- Drop shadows (use the gutter for separation, not shadow)
- Text overflow — every cell must self-contain
- Same cell type repeated more than 3 times on one slide

## AI tell to actively avoid
A 3×2 grid where every cell has an identical "icon + title + 2-line description" layout. **Real bento cells differ from each other** — one shows a screenshot, one shows a quote, one shows a chart, one shows a giant number, one shows just an icon, one shows a code snippet.

## Mini example (rhythm script for 6 slides — product launch)
```
01 manifesto-one-line       — product name, 100pt
02 half-bleed-image         — product hero photo
03 bento-hero-plus-grid     — features (1 large + 4 small cells, each DIFFERENT type)
04 bento-3x2                — specs (mix of stat / chart / icon / quote)
05 big-stat                 — single benchmark number, full bleed
06 manifesto-one-line       — pricing or CTA
```

## Cell-type variety (use at least 4 different types per bento slide)
1. **Screenshot cell** — UI screenshot, no label
2. **Big-number cell** — 60pt+ number, small label
3. **Quote cell** — short quote, attribution
4. **Icon cell** — single icon centered, one-word label
5. **Chart cell** — minimal chart, no legend
6. **Code cell** — 4–6 lines of monospace
7. **Photo cell** — abstract product photo
8. **Comparison cell** — before/after, two halves

## Reference imagery to study
- Apple M3 chip page (apple.com)
- Linear "Connect" feature page
- Raycast 1.0 launch announcement
