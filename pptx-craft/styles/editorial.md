# Style: Editorial / Magazine

**Register:** narrative · premium · long-form · considered
**Heritage:** The New Yorker, Monocle, Wired, Aperture, Kinfolk
**Modern analogs:** Stripe Press web essays, NYT Magazine, MIT Tech Review long-reads

## When to use
- Brand narrative decks
- Long-form research presentations
- Founder / executive keynotes that tell a story
- Audience expects to "read" the deck after the meeting

## Token spec

### Typography
- **Display headline:** a contrasting serif — Tiempos Headline / GT Sectra / Source Serif Pro — 48–72pt, can break across lines for rhythm
- **Subhead / kicker:** sans-serif small caps, 10–11pt, +200 tracking, sits **above** the headline
- **Body:** serif — Tiempos Text / Source Serif Pro / Charter — 13–15pt, line-height 1.55, **first paragraph uses a drop cap** (3 lines tall)
- **Pull quote:** display serif, italic, 24–32pt, hanging quotation marks
- **Byline / caption:** sans-serif, 9pt, italic

Always pair a serif display with a sans-serif kicker — this is the editorial signature.

### Color palette (pick one)
| Variant | Bg | Ink | Accent | Texture |
|---------|----|----|--------|---------|
| Cream | `#F5F1EA` | `#1A1A1A` | `#8B2331` (oxblood) | paper noise 3% |
| Ink | `#0E0E0E` | `#EDEDED` | `#D4A537` (ochre) | none |
| Slate | `#1F2933` | `#F0F4F8` | `#52B788` (sage) | none |

Pull a 4th "image-tint" color from the hero photo of each slide.

### Grid
- **Manuscript grid** with margin notes column: main column 60% width, side column 25%, gutter 5%
- Asymmetric — main column is **offset left of center**
- Folio numbers ("Page 03 / 12") bottom-right, 9pt small caps

### Spacing
- Generous outer margins (`0.8"+`)
- Body paragraphs separated by indent, not by extra space (like a book)

## Allowed primitives
`pull-quote` (with quotation marks + drop cap) · `half-bleed-image` (full-bleed photography, caption in margin) · `manuscript-narrative` · `dropcap-paragraph` · `margin-note` · `chapter-opener` · `kicker-headline`

## Forbidden patterns
- Sans-serif headlines
- Icons or pictograms (use photography or illustration)
- Bullet lists — convert to prose
- Center-aligned anything except chapter openers
- Equal-width columns (asymmetry is the point)

## AI tell to actively avoid
A grid of identical "feature cards" with icon + title + 2-line description. Editorial **never** uses card grids — it uses prose with marginalia.

## Mini example (rhythm script for 10 slides)
```
01 chapter-opener           — kicker + huge serif title
02 dropcap-paragraph        — opening prose
03 pull-quote               — italic, quoted
04 half-bleed-image         — full right, caption in left margin
05 manuscript-narrative     — main + margin note
06 big-stat                 — single number, serif, with prose explanation
07 dropcap-paragraph        — section 2
08 half-bleed-image         — full left, caption right margin
09 pull-quote               — closing line
10 chapter-opener           — "Next chapter:" CTA
```

## Reference imagery to study
- Stripe Press: *High Growth Handbook*, *The Dream Machine*
- Monocle magazine layouts
- NYT Magazine cover stories
