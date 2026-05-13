"""
Recipe: Editorial pitch deck (8 slides).

Run:
    cd ~/.claude/skills/pptx-craft
    python -m recipes.pitch_deck_editorial
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from lib.helpers import (
    blank_slide,
    new_presentation,
    primitive_big_stat,
    primitive_chapter_opener,
    primitive_dropcap_paragraph,
    primitive_half_bleed_placeholder,
    primitive_manifesto,
    primitive_pull_quote,
)


def build(out_path: Path) -> None:
    prs = new_presentation()

    primitive_chapter_opener(
        blank_slide(prs),
        kicker="Series A · May 2026",
        title="Quietly, the clinic\nrebuilt itself.",
        meta="Atelier Health · A six-year notebook",
        style="editorial",
    )

    primitive_dropcap_paragraph(
        blank_slide(prs),
        kicker="The problem",
        paragraph=(
            "Independent paediatric clinics in Taiwan still run on paper. Mothers wait an hour to be told "
            "the vaccine is out of stock, then drive across town to a chain clinic, who orders the same "
            "vaccine from the same wholesaler. We watched this happen for two years before we did anything."
        ),
        style="editorial",
    )

    primitive_pull_quote(
        blank_slide(prs),
        quote="We are not building software. We are building the inventory layer the country forgot to build.",
        attribution="Dr. M., co-founder",
        style="editorial",
    )

    primitive_big_stat(
        blank_slide(prs),
        number="3,400",
        label="independent paediatric clinics",
        context="Combined annual paediatric vaccine spend: NT$ 11.2B. Today they buy through 27 fragmented wholesalers.",
        style="editorial",
    )

    primitive_half_bleed_placeholder(
        blank_slide(prs),
        caption="What the clinic\nactually does at 8am.",
        side="right",
        style="editorial",
    )

    primitive_dropcap_paragraph(
        blank_slide(prs),
        kicker="The wedge",
        paragraph=(
            "Start with vaccine inventory — high-trust, finite SKUs, predictable demand. Once a clinic "
            "lets us touch the cold-chain fridge, the rest of the operation follows. We've earned that "
            "trust in 47 clinics over six years. The next 47 are the proof; the next 470 are the company."
        ),
        style="editorial",
    )

    primitive_pull_quote(
        blank_slide(prs),
        quote="The slowest possible market entry is also the only durable one.",
        attribution=None,
        style="editorial",
    )

    primitive_chapter_opener(
        blank_slide(prs),
        kicker="Next chapter",
        title="Raise NT$ 80M.\nReach 470 clinics.",
        meta="Atelier Health · Confidential",
        style="editorial",
    )

    prs.save(out_path)


if __name__ == "__main__":
    out = Path(__file__).resolve().parent.parent / "pitch_deck_editorial.pptx"
    build(out)
    print(f"Wrote {out}")
