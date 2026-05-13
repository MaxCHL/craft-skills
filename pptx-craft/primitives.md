# Layout Primitives

Reusable single-slide layouts. Each primitive is a **shape language** — a recurring composition you mix across a deck to create rhythm. Implementation lives in `lib/helpers.py`.

**Rule:** never use the same primitive on adjacent slides. Plan a rhythm script before building.

---

## 01. manifesto-one-line
Single sentence ≤ 8 words, 80–160pt, full-bleed.
- Helper: `manifesto(slide, text, accent_word=None)`
- Styles: `big-type` (canonical), `swiss`, `brutalist`, `data-dense` (closer)

```
                                                
                                                
              We were wrong.                    
                                                
                                                
```

---

## 02. pull-quote
A quoted line at 28–40pt with attribution. Editorial uses curly quotes + drop cap; Swiss uses a left rule and no quote marks; Brutalist tilts –4°.

- Helper: `pull_quote(slide, quote, attribution, mode="editorial"|"swiss"|"brutalist")`

```
   "Software is eating the world,        
    but design is eating software."      
                                         
                  — Marc Andreessen      
```

---

## 03. big-stat
One huge number (96–180pt) with a small label below or beside. Allow 1 line of context.

- Helper: `big_stat(slide, number, label, context=None)`
- Variant: include confidence interval for `data-dense`

```
   42%                                    
                                          
   of patients return within 90 days     
   (n=8,247, 95% CI 39–45%)              
```

---

## 04. half-bleed-image
Full-height image on one side (left or right), content on the other 50–60%.

- Helper: `half_bleed(slide, image_path, side="left"|"right", caption=None)`
- Editorial: caption in opposite margin, small caps
- Swiss: duotone or B&W only

---

## 05. bento-3x2
A 3-column × 2-row modular grid where **each cell is a different type**: screenshot / quote / chart / icon / number / code.

- Helper: `bento_3x2(slide, cells: list[dict])` where each cell dict declares its type
- Forbidden: 6 cells of the same type

```
   ┌──────┐ ┌──────┐ ┌──────┐
   │ stat │ │ pic  │ │quote │
   └──────┘ └──────┘ └──────┘
   ┌──────┐ ┌──────┐ ┌──────┐
   │ icon │ │chart │ │ code │
   └──────┘ └──────┘ └──────┘
```

---

## 06. bento-hero-plus-grid
One large hero cell (2×2) plus 4 small cells (1×1) on the side. Used for "one big feature + supporting details".

- Helper: `bento_hero(slide, hero: dict, sides: list[dict])`

---

## 07. timeline-horizontal
Horizontal track with 3–7 nodes. Each node has a year/label, a heading, a 1-line description.

- Helper: `timeline(slide, nodes: list[dict])`
- Never use this on adjacent slides

```
   2020 ──── 2022 ──── 2024 ──── 2026
   founded   pmf       series-b  ipo
```

---

## 08. data-table-full
Tabular data filling 70%+ of the slide. Right-align numbers, tabular figures on, accent only one cell.

- Helper: `data_table(slide, headers, rows, accent_cell=(row, col))`

---

## 09. annotated-chart
A chart with inline labels and 1–3 callout arrows. **No legend** — annotations replace it.

- Helper: `annotated_chart(slide, chart_image_path, callouts: list[dict])`
- Use only in `data-dense` and `monograph`

---

## 10. small-multiples
6–12 small charts arranged in a grid, same y-scale, same x-scale. Single shared caption.

- Helper: `small_multiples(slide, charts: list[image_path], shared_caption)`

---

## 11. comparison-pair
Two stacked or side-by-side panels (before/after, this/that). Asymmetric is allowed — one side can dominate.

- Helper: `comparison(slide, left: dict, right: dict, orientation="horizontal"|"vertical")`

---

## 12. quadrant-2x2
A 2×2 positioning matrix with axis labels and 3–10 plotted points.

- Helper: `quadrant(slide, x_axis_label, y_axis_label, points: list[(x, y, label)])`

---

## 13. dropcap-paragraph
Opening prose paragraph with a 3-line-tall capital letter. Editorial / monograph only.

- Helper: `dropcap(slide, paragraph_text, kicker=None)`

---

## 14. chapter-opener
A "page-like" section break: kicker (small caps) + huge serif title + optional date. Page-number style: "Chapter 02 / 06".

- Helper: `chapter_opener(slide, kicker, title, meta=None)`

---

## 15. swiss-numbered-list
Replacement for bullet lists. Numbered paragraphs ("01", "02", "03") with hanging numerals, each paragraph 2–4 lines of prose.

- Helper: `swiss_numbered_list(slide, items: list[(num, text)])`

---

## 16. clipped-headline (brutalist-only)
Headline at 120pt+ where the last character is clipped off the slide edge.

- Helper: `clipped_headline(slide, text, clip_side="right"|"bottom")`

---

## 17. text-as-image (brutalist-only)
A single word at 200pt+ filling the slide, acting as a "visual".

- Helper: `text_as_image(slide, word)`

---

## 18. mono-callout (brutalist / data-dense)
A 4–10 line block in monospace, set flush-left or flush-right, like a terminal excerpt.

- Helper: `mono_callout(slide, lines: list[str], position="left"|"right")`

---

## Primitive cheat sheet by style

| Style | Primary primitives |
|-------|--------------------|
| swiss | 01, 02, 04, 08, 15 |
| editorial | 02, 04, 13, 14, 11 (rare) |
| bento | 05, 06, 03 (inside cells) |
| brutalist | 16, 17, 18, 02 (modified) |
| big-type | 01, 03 |
| data-dense | 03, 08, 09, 10, 11, 12, 18 |
| monograph | 13, 14, 08, 09 |
