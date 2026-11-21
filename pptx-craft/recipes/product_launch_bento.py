"""
Recipe: Bento-style product launch (6 slides).

All company/product names in this recipe are fictional placeholders;
any resemblance to a real business is coincidental.

Run:
    cd ~/.claude/skills/pptx-craft
    python -m recipes.product_launch_bento
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from lib.helpers import (
    blank_slide,
    new_presentation,
    primitive_bento_3x2,
    primitive_big_stat,
    primitive_half_bleed_placeholder,
    primitive_manifesto,
)


def build(out_path: Path) -> None:
    prs = new_presentation()

    # 01 manifesto
    primitive_manifesto(
        blank_slide(prs),
        "Acme Bikes 2.0",
        style="bento",
    )

    # 02 half-bleed product hero (placeholder)
    primitive_half_bleed_placeholder(
        blank_slide(prs),
        caption="One app.\nEvery dock.",
        side="right",
        style="bento",
    )

    # 03 bento — features (each cell DIFFERENT type)
    primitive_bento_3x2(
        blank_slide(prs),
        cells=[
            {"type": "stat",  "title": "Cities",        "body": "47", "accent": True},
            {"type": "quote", "title": "Commuter, Taipei","body": "Last time I circled twenty minutes for a free bike. Today it took six."},
            {"type": "text",  "title": "Battery swaps","body": "Live charge tracking from depot to dock."},
            {"type": "code",  "title": "Rebalancing",  "body": "Greedy\n→ Min-cost flow\n→ 98.4% availability"},
            {"type": "text",  "title": "Station map","body": "Synced every minute from city open data, 12 operators."},
            {"type": "stat",  "title": "Median pickup","body": "6 min"},
        ],
        style="bento",
    )

    # 04 bento — specs (different mix)
    primitive_bento_3x2(
        blank_slide(prs),
        cells=[
            {"type": "text",  "title": "Integrations","body": "Transit cards, Apple Pay, LINE Pay, 悠遊卡"},
            {"type": "stat",  "title": "Uptime",     "body": "99.97%"},
            {"type": "quote", "title": "Reviewer",   "body": "First city bike-share app that wasn't a horror story."},
            {"type": "text",  "title": "Compliance", "body": "ISO 27001, 個資法 compliant, audit-ready ride logs."},
            {"type": "stat",  "title": "Time to onboard","body": "2 days", "accent": True},
            {"type": "text",  "title": "Pricing",    "body": "NT$ 199/月 · unlimited 30-min rides"},
        ],
        style="bento",
    )

    # 05 big stat
    primitive_big_stat(
        blank_slide(prs),
        number="6.2×",
        label="faster than waiting for the bus",
        context="Average door-to-door time, Q1 2026, n=2,840 trips across 12 pilot districts.",
        style="bento",
    )

    # 06 closing manifesto
    primitive_manifesto(
        blank_slide(prs),
        "Available now, in 47 cities.",
        style="bento",
    )

    prs.save(out_path)


if __name__ == "__main__":
    out = Path(__file__).resolve().parent.parent / "product_launch_bento.pptx"
    build(out)
    print(f"Wrote {out}")
