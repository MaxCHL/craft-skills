"""
Recipe: Swiss-style tech talk (8 slides).

Run:
    cd ~/.claude/skills/pptx-craft
    python -m recipes.tech_talk_swiss   # writes tech_talk_swiss.pptx

Convert + inspect:
    soffice --headless --convert-to pdf tech_talk_swiss.pptx
    pdftoppm -jpeg -r 150 tech_talk_swiss.pdf slide
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from lib.helpers import (
    blank_slide,
    new_presentation,
    primitive_big_stat,
    primitive_data_table,
    primitive_half_bleed_placeholder,
    primitive_manifesto,
    primitive_pull_quote,
    primitive_swiss_numbered_list,
    primitive_timeline,
)


def build(out_path: Path) -> None:
    prs = new_presentation()

    # 01 manifesto
    primitive_manifesto(
        blank_slide(prs),
        "We rewrote the database in a weekend.",
        style="swiss",
    )

    # 02 swiss numbered list (problem)
    primitive_swiss_numbered_list(
        blank_slide(prs),
        title="Why we did it",
        items=[
            ("01", "Migrations took three hours and blocked every deploy."),
            ("02", "Replicas drifted; reads on the secondary were 40 minutes stale."),
            ("03", "Backups silently corrupted twice in 2025. We found out from a customer."),
        ],
    )

    # 03 pull quote
    primitive_pull_quote(
        blank_slide(prs),
        quote="A backup you have not restored is a wish, not a backup.",
        attribution="Adapted from W. Curtis Preston",
        style="swiss",
    )

    # 04 big stat
    primitive_big_stat(
        blank_slide(prs),
        number="11×",
        label="faster median migration",
        context="From 3h 02m (p50) to 16m 24s. Measured across 247 production migrations.",
        style="swiss",
    )

    # 05 data table
    primitive_data_table(
        blank_slide(prs),
        title="Before / after on the same workload",
        headers=["Metric", "Before", "After", "Δ"],
        rows=[
            ["Median migration", "3h 02m", "16m 24s", "−91%"],
            ["p99 query latency", "1,840 ms", "210 ms", "−89%"],
            ["Replica lag (p50)", "40 min", "1.1 s", "−99.9%"],
            ["Backup restore drill", "fails", "2m 11s", "—"],
            ["Storage cost / month", "$8,400", "$6,200", "−26%"],
        ],
        accent_cell=(4, 2),
        source="n=247 production migrations, 30-day window, Apr–May 2026",
        style="swiss",
    )

    # 06 half-bleed (placeholder for an architecture diagram)
    primitive_half_bleed_placeholder(
        blank_slide(prs),
        caption="The new write path",
        side="right",
        style="swiss",
    )

    # 07 timeline
    primitive_timeline(
        blank_slide(prs),
        nodes=[
            ("Fri 18:00", "Spike",   "Two engineers in a room."),
            ("Sat 02:00", "Prototype","Single-shard read working."),
            ("Sat 14:00", "Drill",   "First restore in 2m 11s."),
            ("Sun 09:00", "Cutover", "Live traffic, 0.04% errors."),
            ("Mon 09:00", "Ship",    "Removed the old code path."),
        ],
        style="swiss",
    )

    # 08 closing manifesto
    primitive_manifesto(
        blank_slide(prs),
        "Bias to action survives any process.",
        style="swiss",
    )

    prs.save(out_path)


if __name__ == "__main__":
    out = Path(__file__).resolve().parent.parent / "tech_talk_swiss.pptx"
    build(out)
    print(f"Wrote {out}")
