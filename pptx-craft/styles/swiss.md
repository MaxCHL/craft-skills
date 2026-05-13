# Style: Swiss / International Typographic

**Register:** rigorous · systematic · objective · neutral
**Heritage:** Josef Müller-Brockmann, Helvetica, 1950s Zürich/Basel posters
**Modern analogs:** Linear changelog, Stripe Docs, Vercel, Mercury landing pages

## When to use
- Engineering / scientific talks
- B2B SaaS pitch where credibility outranks excitement
- Policy / standards / spec documents as slides
- Audience values clarity over delight

## Token spec

### Typography
- **Headline:** Inter / Helvetica Neue / Söhne — 32–44pt, **regular weight** (not bold), tight tracking, ranged-left
- **Subhead:** same family, 18–22pt, 60% gray
- **Body:** same family, 14–16pt, line-height 1.45, ranged-left, **never centered**
- **Caption / source:** 9–10pt, all caps with +50 tracking
- One font family for everything. Two weights max (regular + medium). **No italics**.

### Color palette (pick one)
| Variant | Bg | Ink | Accent |
|---------|----|----|--------|
| Classic | `#FFFFFF` | `#111111` | `#E63946` (single red) |
| Cool | `#F4F4F4` | `#1A1A1A` | `#0066FF` |
| Mono | `#FFFFFF` | `#000000` | none — use rule-lines only |

**Color is information, not decoration.** The accent appears at most once per slide.

### Grid
- 12-column grid, gutter `0.2"`, outer margin `0.6"`
- All text starts on the same vertical baseline grid (use a 4pt baseline)
- Headline and body align to the **same left edge** — no indents

### Spacing
- Heavy whitespace. Aim for **55%+ empty** on every slide.
- Generous baseline (12pt+ between paragraphs)

## Allowed primitives
`manifesto-one-line` · `pull-quote` (no quote marks, just left rule) · `data-table-full` · `manuscript-narrative` · `swiss-numbered-list` · `half-bleed-image` (B&W only)

## Forbidden patterns (these break the style)
- Drop shadows, gradients, rounded corners
- More than one accent color
- Center-aligned body text
- Bold for emphasis (use color or rule-line instead)
- Icons of any kind — Swiss uses *typography* as the icon
- Pull-quote with quote marks (use a left rule instead)

## AI tell to actively avoid
Three equal-length bullets each starting with a verb. Swiss replaces bullets with **numbered prose paragraphs** or **a single sentence per slide**.

## Mini example (rhythm script for 8 slides)
```
01 manifesto-one-line       — title, 80pt
02 swiss-numbered-list      — 3 numbered prose blocks
03 pull-quote               — single line, left rule
04 data-table-full          — uncolored except 1 accent cell
05 manuscript-narrative     — one column, 60% width
06 half-bleed-image         — duotone, caption bottom-left
07 swiss-numbered-list      — 5 items
08 manifesto-one-line       — closing line
```

## Reference imagery to study
- Müller-Brockmann: "Beethoven" poster, Tonhalle posters
- Stripe Press book covers
- Linear changelog pages
