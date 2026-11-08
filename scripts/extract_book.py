import sys, pymupdf
from pathlib import Path
src, out = sys.argv[1], Path(sys.argv[2])
d = pymupdf.open(src)
chars = 0
with out.open("w", encoding="utf-8") as f:
    for i, page in enumerate(d, start=1):
        t = page.get_text("text")
        chars += len(t)
        f.write(f"\n\n=== [p{i}] ===\n{t}")
print("pages", d.page_count, "chars", chars)
