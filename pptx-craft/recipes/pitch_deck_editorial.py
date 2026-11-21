"""
Recipe: Editorial pitch deck (8 slides).

All company/product names in this recipe are fictional placeholders;
any resemblance to a real business is coincidental.

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
        title="Quietly, the front desk\nrebuilt itself.",
        meta="Atelier Desk · A six-year notebook",
        style="editorial",
    )

    primitive_dropcap_paragraph(
        blank_slide(prs),
        kicker="The problem",
        paragraph=(
            "Independent co-working spaces in Taiwan still run on spreadsheets. Members wait an hour to be told "
            "the meeting room is double-booked, then walk across town to a chain space, which leases the same "
            "kind of room from the same landlord. We watched this happen for two years before we did anything."
        ),
        style="editorial",
    )

    primitive_pull_quote(
        blank_slide(prs),
        quote="We are not building software. We are building the booking layer the industry forgot to build.",
        attribution="A. L., co-founder",
        style="editorial",
    )

    primitive_big_stat(
        blank_slide(prs),
        number="3,400",
        label="independent co-working spaces",
        context="Combined annual rent roll: NT$ 11.2B. Today they take bookings through 27 fragmented tools.",
        style="editorial",
    )

    primitive_half_bleed_placeholder(
        blank_slide(prs),
        caption="What the front desk\nactually does at 8am.",
        side="right",
        style="editorial",
    )

    primitive_dropcap_paragraph(
        blank_slide(prs),
        kicker="The wedge",
        paragraph=(
            "Start with room booking — high-trust, finite inventory, predictable demand. Once a space "
            "lets us touch the door-access schedule, the rest of the operation follows. We've earned that "
            "trust in 47 spaces over six years. The next 47 are the proof; the next 470 are the company."
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
        title="Raise NT$ 80M.\nReach 470 spaces.",
        meta="Atelier Desk · Confidential",
        style="editorial",
    )

    prs.save(out_path)


if __name__ == "__main__":
    out = Path(__file__).resolve().parent.parent / "pitch_deck_editorial.pptx"
    build(out)
    print(f"Wrote {out}")
