# Style: Brutalism

**Register:** experimental · provocative · anti-corporate · raw · loud
**Heritage:** Wolfgang Weingart, David Carson's *Ray Gun*, late-90s web brutalism
**Modern analogs:** Balenciaga site, Are.na editorial, MSCHF drops, Bloomberg Businessweek covers

## When to use
- Creative agency pitch
- Conference talks where the speaker has personality
- Manifestos, zines, internal cultural decks
- Audience that responds to attitude over polish

## Caveat
Brutalism done badly = "broken slides". Brutalism done well = **intentional rule-breaking**. The skill is making the user feel the violations are deliberate, not accidental. **Do not pick this style without confirming the user wants attitude.**

## Token spec

### Typography
- **Headline:** a "weird" display face — Druk / Migra / Editorial New / Neue Haas Grotesk Display Black / Times New Roman (yes, deliberately retro) — 80–160pt, can clip off the slide edge
- **Body:** a system font, ideally one that looks "default" — Arial / Times — 14pt
- **Mono accents:** typewriter / monospace — Courier / JetBrains Mono — for callouts
- **Mix at least 2 unrelated typefaces** on the same slide

### Color palette (pick ONE, very limited)
| Variant | Bg | Ink | Accent |
|---------|----|----|--------|
| Black & yellow | `#000000` | `#FFFFFF` | `#FFFF00` |
| Lime warning | `#0F0F0F` | `#F2F2F2` | `#DAFB28` |
| Print red | `#F2EFEA` | `#0A0A0A` | `#FF0000` |
| Hazard | `#FFFFFF` | `#000000` | `#FF6600` |

**Maximum 3 colors. Pure black + pure white permitted (no grays).**

### Grid
- **Broken grid** — start with a 12-col grid, then *deliberately* place 1–2 elements off-grid
- Allow text to **clip off the slide edge** intentionally
- Asymmetric — refuse symmetric layouts categorically
- Rotation: occasional 90° or –7° tilt on a single element per deck (not every slide)

### Spacing
- Mix extremely tight (–20 tracking) with extremely loose (+400 tracking) typography
- Some slides 90% empty, some 90% full — high contrast between slides

## Allowed primitives
`manifesto-one-line` (cropped, oversized) · `pull-quote` (no quotation marks, hard left) · `mono-callout` · `clipped-headline` · `text-as-image` (huge text fills slide) · `numbered-track` (giant numerals)

## Forbidden patterns
- Gradients of any kind
- Drop shadows
- Rounded corners
- Centered titles in the middle of the slide
- Stock photography
- Emoji
- Smooth transitions

## AI tell to actively avoid
LLMs generating "brutalist" decks usually produce sterile Swiss with one neon color. Real brutalism has **deliberate tension** — typography clipping the edge, intentional overlaps, "wrong" line breaks. Add at least one element per deck that looks "broken" but is computed.

## Mini example (rhythm script for 7 slides)
```
01 clipped-headline         — title at 160pt, last letter clipped off right edge
02 mono-callout             — small typewriter paragraph, hard-left
03 text-as-image            — single word, fills the slide, no margins
04 pull-quote               — left-flush, no marks, rotated –4°
05 numbered-track           — "01 / 02 / 03" — huge numbers, tiny labels
06 manifesto-one-line       — one sentence in default Times Roman, deliberate
07 clipped-headline         — closer, title clipped off bottom
```

## Reference imagery to study
- David Carson, *The End of Print*
- Balenciaga.com (current)
- Bloomberg Businessweek cover archive
- Are.na blocks tagged "brutalism"
