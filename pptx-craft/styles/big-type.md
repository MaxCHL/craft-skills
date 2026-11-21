# Style: Big Type / Manifesto

**Register:** keynote · single-idea-per-slide · cinematic · confident
**Heritage:** Steve Jobs Keynote era, TED Talks at the Vancouver Conference Centre, Pentagram's exhibition signage
**Modern analogs:** Tobi Lütke keynotes, Apple WWDC opening sequences, Naval's manifesto threads

## When to use
- Keynotes projected on a big screen with a live speaker
- The slide is *background*, the speaker is the content
- One-shot manifestos, vision statements, theses
- Audience watches; they don't read

## The single rule
**One idea per slide. Maximum 8 words.** If a slide needs a second sentence, split it into two slides.

## Token spec

### Typography
- **Single sentence:** 80–160pt, weight depends on font
  - Serif option: GT Sectra, Tiempos, Söhne Breit — for gravitas
  - Sans option: Söhne Mono, Inter Display, Suisse Int'l — for momentum
- **Speaker name / chapter:** 12pt, all caps small, bottom corner
- Line breaks are *editorial* — break for breath, not for width

### Color palette
| Variant | Bg | Ink | Optional accent word |
|---------|----|----|---------------------|
| Black | `#000000` | `#FFFFFF` | one word in `#FFD60A` |
| White | `#FFFFFF` | `#0A0A0A` | one word in `#D62828` |
| Deep blue | `#0A1828` | `#F8F9FA` | one word in `#FFA62B` |

**Use highlighted word sparingly** — at most once every 3 slides.

### Grid
- No grid. The slide is composed by eye.
- Headline sits **slightly above optical center** (40–45% from top), never dead-center vertically
- Generous left margin equals right margin (this is the one style that's symmetric horizontally)

### Spacing
- 70%+ of slide is empty
- Generous line-height (1.05 for headline — tight to read as one block)

## Allowed primitives
`manifesto-one-line` (the only one you really need) · `big-stat` (a number IS a manifesto) · `pull-quote` (attributed quote as full slide)

## Forbidden patterns
- More than one sentence per slide
- Bullet points (ever)
- Footers, logos, page numbers, slide chrome of any kind
- Decorative shapes, lines, gradients
- Icons
- Tables, charts (use a separate `data-dense` deck if you need them)

## AI tell to actively avoid
LLM "manifesto" slides write long sentences with subordinate clauses. **Cut ruthlessly.** "We believe that the future of work will be increasingly remote" → "Remote is the default." The brevity is the style.

## Mini example (rhythm script for 9 slides — vision talk)
```
01 manifesto-one-line       — "We were wrong."
02 manifesto-one-line       — "About everything."
03 manifesto-one-line       — "For ten years."
04 big-stat                 — "0.4%"  (with one line of context)
05 manifesto-one-line       — "So we started over."
06 pull-quote               — short attributed line
07 manifesto-one-line       — the new thesis
08 manifesto-one-line       — the call
09 manifesto-one-line       — "Begin."
```

## Word-count audit
After writing the script, count words per slide. If any slide exceeds 8 words, split or cut. This is non-negotiable.

## Reference imagery to study
- Steve Jobs 2007 iPhone keynote (full deck)
- TED Talk title slides (any speaker)
- Pentagram's signage portfolio
