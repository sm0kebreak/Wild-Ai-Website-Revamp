#!/usr/bin/env python3
"""Crop carousel logos to the pixels the row actually shows.

The homepage marks are filtered to a single ink color. Transparent padding and
light or dark plates that the filter already hides still take up space, so the
gaps look uneven. This rewrites those files in place. Re-run after adding a logo.
"""

from __future__ import annotations

import re
import sys
from io import BytesIO
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src" / "data" / "companyLogos.ts"
PUBLIC = ROOT / "public"

# Pixels the filter leaves visible. Matches the matrices in LogoCarousel.
def content_mask(rgba: np.ndarray, tone: str | None) -> np.ndarray:
    image = rgba.astype(np.float32)
    red, green, blue, alpha = image[:, :, 0], image[:, :, 1], image[:, :, 2], image[:, :, 3]
    visible = alpha > 16
    if tone in ("dark-bg", "deep-bg"):
        lift = 0.35 if tone == "deep-bg" else 0.7
        knock = 0.5315 * red + 1.788 * green + 0.1805 * blue - lift * 255
        if tone == "deep-bg":
            knock = 1.7 * red + 5.72 * green + 0.58 * blue - 0.35 * 255
        return visible & (knock > 10)
    if tone == "light-ink":
        luma = 0.2126 * red + 0.7152 * green + 0.0722 * blue
        return visible & (luma > 28)
    # Default mono filter keeps dark ink and drops near-white plates.
    knock = -0.34 * red - 1.144 * green - 0.1155 * blue + 1.36 * 255
    return visible & (knock > 12)


def bounds(mask: np.ndarray) -> tuple[int, int, int, int] | None:
    ys, xs = np.where(mask)
    if xs.size < 16:
        return None
    return int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())


def logos() -> list[tuple[Path, str | None]]:
    text = DATA.read_text()
    found: list[tuple[Path, str | None]] = []
    seen: set[Path] = set()
    for match in re.finditer(r"\{[^{}]*?logo:\s*'([^']+)'[^{}]*?\}", text, re.S):
        block = match.group(0)
        tone = re.search(r"tone:\s*'([^']+)'", block)
        path = PUBLIC / match.group(1).split("?", 1)[0].lstrip("/")
        if path in seen or not path.exists():
            continue
        seen.add(path)
        found.append((path, tone.group(1) if tone else None))
    return found


def trim_raster(path: Path, tone: str | None, write: bool) -> str:
    image = Image.open(path).convert("RGBA")
    width, height = image.size
    box = bounds(content_mask(np.asarray(image), tone))
    if box is None:
        return f"skip {path.name}: no visible ink"
    left, top, right, bottom = box
    # Keep a pixel of antialiasing.
    left = max(0, left - 1)
    top = max(0, top - 1)
    right = min(width - 1, right + 1)
    bottom = min(height - 1, bottom + 1)
    pad = (left, width - 1 - right, top, height - 1 - bottom)
    if max(pad) < 2:
        return f"tight {path.name} {width}x{height}"
    cropped = image.crop((left, top, right + 1, bottom + 1))
    if cropped.size[0] < 8 or cropped.size[1] < 8:
        return f"skip {path.name}: crop too small {cropped.size}"
    note = f"crop {path.name} {width}x{height} -> {cropped.size[0]}x{cropped.size[1]} tone={tone or 'mono'}"
    if write:
        suffix = path.suffix.lower()
        if suffix == ".webp":
            cropped.save(path, "WEBP", lossless=True, method=6)
        elif suffix in {".jpg", ".jpeg"}:
            cropped.convert("RGB").save(path, "JPEG", quality=92, optimize=True)
        else:
            cropped.save(path, "PNG", optimize=True)
    return note


def trim_svg(path: Path, tone: str | None, write: bool) -> str:
    import cairosvg

    text = path.read_text()
    root = re.search(r"<svg\b[^>]*>", text)
    if not root:
        return f"skip {path.name}: no svg root"
    tag = root.group(0)
    view = re.search(r'viewBox="\s*([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s*"', tag)
    width_attr = re.search(r'\bwidth="([-\d.]+)', tag)
    height_attr = re.search(r'\bheight="([-\d.]+)', tag)
    if view:
        origin_x, origin_y, box_w, box_h = map(float, view.groups())
    elif width_attr and height_attr:
        origin_x, origin_y = 0.0, 0.0
        box_w, box_h = float(width_attr.group(1)), float(height_attr.group(1))
    else:
        return f"skip {path.name}: no viewBox"
    rendered = cairosvg.svg2png(url=str(path), output_width=max(900, int(box_w * 3)))
    image = Image.open(BytesIO(rendered)).convert("RGBA")
    box = bounds(content_mask(np.asarray(image), tone))
    if box is None:
        return f"skip {path.name}: no visible ink"
    left, top, right, bottom = box
    left = max(0, left - 2)
    top = max(0, top - 2)
    right = min(image.width - 1, right + 2)
    bottom = min(image.height - 1, bottom + 2)
    px = image.width
    py = image.height
    # Ignore a sliver. The renderer adds a hairline of antialiasing.
    if (left < 3 and top < 3 and px - 1 - right < 3 and py - 1 - bottom < 3):
        return f"tight {path.name} viewBox {box_w:.1f}x{box_h:.1f}"
    next_x = origin_x + left / px * box_w
    next_y = origin_y + top / py * box_h
    next_w = (right - left + 1) / px * box_w
    next_h = (bottom - top + 1) / py * box_h
    if next_w < 1 or next_h < 1:
        return f"skip {path.name}: crop too small"
    view_box = f'{next_x:.4f} {next_y:.4f} {next_w:.4f} {next_h:.4f}'
    note = f"crop {path.name} viewBox {box_w:.1f}x{box_h:.1f} -> {next_w:.1f}x{next_h:.1f} tone={tone or 'mono'}"
    if not write:
        return note

    def rewrite(match: re.Match[str]) -> str:
        opening = match.group(0)
        if re.search(r'viewBox="', opening):
            opening = re.sub(r'viewBox="[^"]*"', f'viewBox="{view_box}"', opening, count=1)
        else:
            opening = opening[:-1] + f' viewBox="{view_box}">'
        opening = re.sub(r'\bwidth="[^"]*"', f'width="{next_w:.2f}"', opening, count=1)
        opening = re.sub(r'\bheight="[^"]*"', f'height="{next_h:.2f}"', opening, count=1)
        if "width=" not in opening:
            opening = opening[:-1] + f' width="{next_w:.2f}" height="{next_h:.2f}">'
        return opening

    path.write_text(re.sub(r"<svg\b[^>]*>", rewrite, text, count=1))
    return note


def main() -> None:
    write = "--write" in sys.argv
    for path, tone in logos():
        if path.suffix.lower() == ".svg":
            print(trim_svg(path, tone, write))
        else:
            print(trim_raster(path, tone, write))


if __name__ == "__main__":
    main()
