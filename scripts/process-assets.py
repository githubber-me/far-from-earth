#!/usr/bin/env python3
"""Post-process generated assets: downscale for mobile, fix alpha, copy to public/assets."""
import shutil
import sys
from pathlib import Path

from PIL import Image

SRC = Path("/private/var/folders/qg/1rrmyc1527xc52nk9k3hd1bc0000gn/T/opencode/asset-gen")
DST = Path("/Users/thegreat/github/junior-builder/public/assets")
DST.mkdir(parents=True, exist_ok=True)

MAX_EDGE = 1280

def process(name: str, transparent: bool) -> None:
    src = SRC / name
    if not src.exists():
        print(f"MISSING {name}")
        return
    im = Image.open(src)
    if transparent:
        im = im.convert("RGBA")
        # If the generator returned a solid background instead of alpha, key it out.
        if im.getextrema()[3][0] > 250:
            px = im.load()
            w, h = im.size
            for y in range(h):
                for x in range(w):
                    r, g, b, a = px[x, y]
                    if r > 235 and g > 235 and b > 235:
                        px[x, y] = (r, g, b, 0)
            print(f"  keyed white background on {name}")
    else:
        im = im.convert("RGB")
    if max(im.size) > MAX_EDGE:
        ratio = MAX_EDGE / max(im.size)
        im = im.resize((int(im.size[0] * ratio), int(im.size[1] * ratio)), Image.LANCZOS)
    if transparent:
        out = DST / name
        im.save(out, optimize=True)
    else:
        # Photographic backgrounds: WebP at 85 keeps them light for mobile
        out = DST / name.replace(".png", ".webp")
        im.save(out, "WEBP", quality=85, method=6)
    kb = out.stat().st_size // 1024
    print(f"OK {out.name} {im.size} {kb}KB")

BG = ["bg-outpost.png", "bg-storm.png", "bg-greenhouse.png", "bg-power.png", "bg-life.png", "bg-sol.png", "bg-space.png"]
STICKERS = ["chinnu.png", "gerald.png"]

for name in BG:
    process(name, transparent=False)
for name in STICKERS:
    process(name, transparent=True)

print("done")
