# Style: Monograph / White-paper

**Register:** academic · long-form · authoritative · readable-as-document
**Heritage:** Bell Labs technical reports, RAND white papers, university press monographs, Knuth's TAOCP
**Modern analogs:** Stripe Press essays, Distill.pub articles, OpenAI research blog posts, latex.org documents

## When to use
- Research papers presented as slides
- Standards / RFC walkthroughs
- White papers shared as PDF after the meeting
- Audience reads the slides as a document (no live speaker, or speaker mostly annotates)

## The principle
A monograph slide is a **page**, not a slide. It is designed to be read at A4 / letter density, with the live presentation being a secondary mode.

## Token spec

### Typography
- **Title:** Computer Modern / Source Serif / EB Garamond — 24–30pt, regular weight, **not bold**
- **Section heading:** same family, 16–18pt, small caps
- **Body:** same family, 11–12pt, line-height 1.6, ranged-left with hyphenation
- **Math / code:** Computer Modern Math / Latin Modern Math, or for code: Latin Modern Mono / IBM Plex Mono
- **Footnote:** 8–9pt, with superscript reference marks
- **Page number / running head:** 9pt small caps

### Color palette
| Use | Color |
|-----|-------|
| Ink | `#222222` |
| Background | `#FAFAF7` (warm white) |
| Link / reference | `#3B5998` |
| Equation accent | `#8B0000` |

**Color is rare.** A monograph is essentially monochrome with restrained highlights.

### Grid
- **Manuscript grid** — single column, 65–75 characters per line (the readability sweet spot)
- Wide outer margin (1.0–1.2") for marginalia
- Optional: 2-column for code listings or figures
- Footnotes pinned to bottom of slide

### Spacing
- Paragraphs indent first line by `0.25"`, no extra vertical space (like a book)
- Section headings have 1.5× normal space above, normal below
- Figures float — captions in small caps

## Allowed primitives
`manuscript-narrative` · `dropcap-paragraph` (only on chapter openers) · `footnoted-paragraph` · `equation-block` · `code-listing` · `figure-with-caption` · `references-list`

## Forbidden patterns
- Sans-serif anywhere
- Color highlights for emphasis (use italic instead)
- Icons
- Bullet lists for prose (use prose; bullets are reserved for terminal-style enumerations like "Theorem 1, Theorem 2")
- Background imagery
- Drop shadows / borders on figures

## AI tell to actively avoid
LLMs producing "academic" slides reach for IEEE-template-from-2003 aesthetic: navy blue headers, sans-serif, bullet lists. **Real monograph aesthetic** is closer to a Knuth textbook page — serif throughout, ample whitespace, no headers/footers chrome.

## Mini example (rhythm script for 10 slides — research walkthrough)
```
01 chapter-opener           — title page with author + date, like a book
02 footnoted-paragraph      — abstract paragraph
03 manuscript-narrative     — introduction
04 equation-block           — the model
05 figure-with-caption      — schematic
06 code-listing             — algorithm pseudocode
07 manuscript-narrative     — results discussion
08 figure-with-caption      — outcome chart
09 footnoted-paragraph      — limitations
10 references-list          — numbered bibliography
```

## Pagination
Show "Page N / Total" bottom-center, 9pt, small caps. This style is the only one that *should* feel like a document.

## Reference imagery to study
- Knuth, *The Art of Computer Programming* page spreads
- Distill.pub article PDFs
- Stripe Press essay typography
- Any LaTeX `book` class output
