# Anti-AI Checklist

The acceptance gate. After building, run every item. If any item fails, fix and re-render. No exceptions.

## The 15 AI tells (find and remove every one)

1. **Accent line under the title.** A 2–4pt colored horizontal line directly below the headline. **Single biggest tell.** Replace with whitespace or a left rule.

2. **Three equal-length bullets, each starting with a verb.** "Enable / Streamline / Accelerate". Replace with prose, prose-numbered, or one-sentence-per-slide.

3. **The same icon library across every slide.** Outlined linear icons for team/growth/strategy. If you must use icons, swap at least 2 for a screenshot, chart, or photo.

4. **Cards everywhere.** Rounded rectangles with icon-top, title-middle, description-bottom, repeated 3 or 6 times. If using bento, cells must differ in *type*.

5. **Center-aligned body text.** Always ranged-left except in `big-type`.

6. **The same layout on every slide.** Title top, content middle, footer bottom — slide after slide. Rotate primitives.

7. **Default blue color (`#1E40AF` family).** Pick from the style preset's palette instead.

8. **Soft gradients in headers / backgrounds.** Forbidden in every style except `bento` (and only on 1–2 cells).

9. **Drop shadows on cards.** Use the gutter for separation. Shadows are forbidden.

10. **Stock photography of "diverse team in glass office".** Use real product screenshots, charts, custom illustration, or text-only.

11. **Symmetrical two-column layout repeated.** Image left, bullets right, on slide after slide. Vary the asymmetry.

12. **Footer with company name + page number + date on every slide.** Either commit to chrome (monograph) or remove all chrome (big-type).

13. **Chart with legend on the right and 3 bars in primary colors.** Use inline labels, summary headline, and category-encoded colors.

14. **Emoji as decoration.** Banned in every preset.

15. **"AI-generated subtitle"-style sentences:** "Streamline your workflow with our cutting-edge solution that leverages..." Rewrite with concrete nouns.

---

## Visual QA prompt (give this to a fresh subagent)

Save slides as JPGs (see `pptx` skill's "Converting to Images"), then send to a fresh subagent:

```
Inspect these slides as if you've never seen them. Find AI-generated tells.

Specifically look for:
- Decorative accent lines under titles
- Repetitive identical layouts across slides
- Equal-length bullets all starting with verbs
- Same icon style across all slides
- Card grids with uniform icon+title+description cells
- Center-aligned body text
- Default blue / gradient / drop shadow patterns
- Generic stock-photo aesthetic
- Boilerplate buzzword copy

For each slide, list every AI tell you find. Be uncharitable. Do not justify or defend any choice — your job is to find problems.

Slides:
1. /path/slide-01.jpg (expected: [brief])
2. /path/slide-02.jpg (expected: [brief])
...
```

A "no issues" report from the subagent is suspicious. Push back: ask "are you sure? look again at slide N for ___".

---

## Rhythm audit

After building, list each slide's primitive:

```
01 manifesto-one-line
02 pull-quote
03 big-stat
04 half-bleed-image
05 bento-3x2
...
```

Check:
- [ ] No primitive appears twice in a row
- [ ] At least 5 different primitives across a 10-slide deck
- [ ] Density alternates: dense → sparse → dense → sparse

---

## Copy audit

Read every line of body text aloud:

- [ ] No sentence starts with "Leverage", "Streamline", "Enable", "Empower", "Unlock", "Drive"
- [ ] No phrase contains "cutting-edge", "best-in-class", "state-of-the-art", "next-generation", "world-class"
- [ ] No "transformative solutions" or "innovative platforms"
- [ ] Bullets (if used) have **varying lengths** — some 2 words, some 8, some a full sentence
- [ ] At least one slide is a single sentence

---

## Style discipline audit

- [ ] Typography stack matches the chosen style preset exactly
- [ ] Color palette is from the preset; accent appears max once per slide
- [ ] Margins consistent with the preset's grid
- [ ] No element forbidden by the preset appears (e.g. no icons in `swiss`)

---

## Final gate

A deck passes when **a designer friend** would not be able to tell it was made with help from an LLM. If you can't ask a designer, ask: "would this look out of place on the brand site I'm modeling?"

If the answer is "yes, it looks like ChatGPT made it", iterate.
