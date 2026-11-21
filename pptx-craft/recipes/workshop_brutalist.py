"""
Recipe: Brutalist workshop / manifesto deck (7 slides).

Use this style when the speaker has personality and the audience wants attitude.
Don't pick this style for risk-averse audiences.

Run:
    cd ~/.claude/skills/pptx-craft
    python -m recipes.workshop_brutalist
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from lib.helpers import (
    blank_slide,
    new_presentation,
    primitive_clipped_headline,
    primitive_manifesto,
    primitive_mono_callout,
    primitive_pull_quote,
    primitive_text_as_image,
)


def build(out_path: Path) -> None:
    prs = new_presentation()

    primitive_clipped_headline(
        blank_slide(prs),
        text="STOP",
        style="brutalist",
        clip_side="right",
    )

    primitive_mono_callout(
        blank_slide(prs),
        lines=[
            "$ ls -la /your/process",
            "drwxr-xr-x  scrum_master",
            "drwxr-xr-x  three_standups",
            "drwxr-xr-x  retro_template.md",
            "-rw-------  shipped_thing  (empty)",
        ],
        position="left",
        style="brutalist",
    )

    primitive_text_as_image(
        blank_slide(prs),
        word="SHIP",
        style="brutalist",
    )

    primitive_pull_quote(
        blank_slide(prs),
        quote="Anything you can put on a Jira ticket, you can also delete.",
        attribution="Someone who shipped",
        style="brutalist",
    )

    primitive_manifesto(
        blank_slide(prs),
        "Do one terrifying thing this week.",
        style="brutalist",
    )

    primitive_mono_callout(
        blank_slide(prs),
        lines=[
            "// homework",
            "  1. cancel one meeting",
            "  2. ship one half-finished thing",
            "  3. tell one truth at standup",
        ],
        position="right",
        style="brutalist",
    )

    primitive_clipped_headline(
        blank_slide(prs),
        text="GO.",
        style="brutalist",
        clip_side="bottom",
    )

    prs.save(out_path)


if __name__ == "__main__":
    out = Path(__file__).resolve().parent.parent / "workshop_brutalist.pptx"
    build(out)
    print(f"Wrote {out}")
