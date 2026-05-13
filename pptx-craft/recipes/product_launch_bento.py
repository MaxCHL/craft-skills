"""
Recipe: Bento-style product launch (6 slides).

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
        "MediPass 2.0",
        style="bento",
    )

    # 02 half-bleed product hero (placeholder)
    primitive_half_bleed_placeholder(
        blank_slide(prs),
        caption="One pass.\nEvery clinic.",
        side="right",
        style="bento",
    )

    # 03 bento — features (each cell DIFFERENT type)
    primitive_bento_3x2(
        blank_slide(prs),
        cells=[
            {"type": "stat",  "title": "Adoption",      "body": "47", "accent": True},
            {"type": "quote", "title": "Mother, Taipei","body": "I waited two hours last time. Today it took six minutes."},
            {"type": "text",  "title": "Cold chain",   "body": "Continuous temperature logging from wholesaler to needle."},
            {"type": "code",  "title": "OCR uplift",   "body": "EasyOCR\n→ PaddleOCR-v5\n→ 98.4% accuracy"},
            {"type": "text",  "title": "Vaccine catalog","body": "Sync'd nightly from CDC.gov.tw, 12 publishers."},
            {"type": "stat",  "title": "Median visit", "body": "6 min"},
        ],
        style="bento",
    )

    # 04 bento — specs (different mix)
    primitive_bento_3x2(
        blank_slide(prs),
        cells=[
            {"type": "text",  "title": "Integrations","body": "HIS, EMR, NHI VPN, 健保署快易通"},
            {"type": "stat",  "title": "Uptime",     "body": "99.97%"},
            {"type": "quote", "title": "Reviewer",   "body": "First Taiwan clinic SaaS that wasn't a horror story."},
            {"type": "text",  "title": "Compliance", "body": "ISO 27001, 個資法 §27, NHI audit-ready logs."},
            {"type": "stat",  "title": "Time to onboard","body": "2 days", "accent": True},
            {"type": "text",  "title": "Pricing",    "body": "NT$ 12,000/月 · per clinic · all-in"},
        ],
        style="bento",
    )

    # 05 big stat
    primitive_big_stat(
        blank_slide(prs),
        number="6.2×",
        label="faster than the chain clinic next door",
        context="Average visit time, Q1 2026, n=2,840 visits across 12 pilot clinics.",
        style="bento",
    )

    # 06 closing manifesto
    primitive_manifesto(
        blank_slide(prs),
        "Available now, in 47 clinics.",
        style="bento",
    )

    prs.save(out_path)


if __name__ == "__main__":
    out = Path(__file__).resolve().parent.parent / "product_launch_bento.pptx"
    build(out)
    print(f"Wrote {out}")
