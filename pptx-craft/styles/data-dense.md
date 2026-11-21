# Style: Data-dense / Analytical

**Register:** analytical · numbers-heavy · trust-through-density · tufte-grade
**Heritage:** Edward Tufte's *Visual Display of Quantitative Information*, *Financial Times* graphics desk, Bloomberg terminals, *The Economist* charts
**Modern analogs:** FT visual stories, *Our World in Data*, Stratechery charts, Pitchbook research

## When to use
- Quant research presentations
- Board / investor metrics reviews
- Competitive analysis with many comparisons
- Academic / policy briefings
- Audience reads carefully, can pause; this is **not** for a projected keynote

## The Tufte principle
**Maximize data-ink, minimize chart-junk.** Every visual element must encode information. Grid lines, legends, 3D effects, drop shadows, color gradients on bars — all forbidden unless they encode something.

## Token spec

### Typography
- **Headline:** condensed serif or grotesk — Söhne Schmal, Roboto Condensed, Tiempos Headline — 22–28pt (smaller than other styles)
- **Body:** clean sans — Inter, Söhne, IBM Plex Sans — 11–13pt
- **Numbers / tabular data:** **tabular-figures** turned on; monospace optional (JetBrains Mono, IBM Plex Mono) — 10–12pt
- **Source line:** italic 8–9pt, gray, always present at slide bottom

### Color palette
| Use | Color |
|-----|-------|
| Ink | `#1A1A1A` |
| Background | `#F8F5EE` (FT pink) or `#FFFFFF` |
| Data category 1 | `#990000` (FT red) |
| Data category 2 | `#005A8C` |
| Data category 3 | `#637478` (slate) |
| De-emphasis | `#B8B8B8` |
| Highlight | `#FFD200` (use only to flag a single data point) |

Color encodes *category*, never *style*. Maximum 4 data colors.

### Grid
- **Modular grid** — divide slide into 12 cols × 8 rows, place charts and tables in modules
- Charts are **small-multiples** when possible (many small charts > one big chart)
- Tables align decimals; right-align numbers; left-align labels

### Spacing
- Dense, but with breathing room around each module
- 0.4" margin between chart and its caption
- Source lines flush bottom-left

## Allowed primitives
`small-multiples` · `data-table-full` · `annotated-chart` (chart with inline labels, no legend) · `big-stat` (with confidence interval) · `comparison-pair` · `quadrant-2x2` · `sparkline-row`

## Forbidden patterns
- Pie charts (use bar charts)
- 3D anything
- Color gradients on bars / lines
- Legends when inline labels would work
- Chart-junk: heavy gridlines, axis tick marks every unit, decorative shadows
- Rounded numbers without significant figures stated
- Headlines that describe; headlines should **summarize the finding** ("Revenue tripled" not "Revenue 2020–2024")

## AI tell to actively avoid
LLMs generate generic "bar chart with title + legend + 3 colors". Real analytical work uses **inline annotation** — the chart line itself is labeled directly where it sits, with a callout sentence pointing to the most important data point.

## Mini example (rhythm script for 8 slides — research brief)
```
01 manifesto-one-line       — the thesis as one sentence
02 big-stat                 — headline number with CI
03 small-multiples          — 6 small line charts, same y-scale
04 annotated-chart          — one big chart with 3 callouts inline
05 data-table-full          — 8 rows × 5 cols, accent on one cell
06 comparison-pair          — before/after with deltas
07 quadrant-2x2             — positioning chart with named labels
08 manifesto-one-line       — the implication
```

## Title craft
Each chart's title should state the finding, not the variable.
- Bad: "Quarterly Revenue by Region"
- Good: "Europe doubled while Americas flattened"

## Reference imagery to study
- *Financial Times* visual stories (ft.com/visual-and-data-journalism)
- Tufte's books, especially small-multiples examples
- *Our World in Data* article charts
