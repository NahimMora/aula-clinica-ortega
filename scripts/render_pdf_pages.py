import sys, pymupdf
from pathlib import Path
src, outdir, width = sys.argv[1], Path(sys.argv[2]), int(sys.argv[3])
outdir.mkdir(parents=True, exist_ok=True)
d = pymupdf.open(src)
stem = Path(src).stem
for i, page in enumerate(d, start=1):
    zoom = width / page.rect.width
    pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom))
    pix.save(str(outdir / f"{stem}_p{i:02d}.jpg"), jpg_quality=70)
    print(stem, i, pix.width, "x", pix.height, "text chars:", len(page.get_text()))
