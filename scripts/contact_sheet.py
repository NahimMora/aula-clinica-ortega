import sys
from pathlib import Path
from PIL import Image, ImageDraw
files = sorted(Path(sys.argv[1]).glob(sys.argv[2]))
out = Path(sys.argv[3]); cols = int(sys.argv[4]); cell = int(sys.argv[5]); per = int(sys.argv[6])
for s in range(0, len(files), per):
    chunk = files[s:s+per]
    rows = (len(chunk) + cols - 1) // cols
    sheet = Image.new("RGB", (cols*cell, rows*cell), "white")
    d = ImageDraw.Draw(sheet)
    for i, f in enumerate(chunk):
        im = Image.open(f); im.thumbnail((cell-8, cell-24))
        x, y = (i % cols)*cell, (i//cols)*cell
        sheet.paste(im, (x+4, y+20)); d.text((x+6, y+4), f.stem, fill="red")
    p = out.parent / f"{out.stem}_{s//per+1}.jpg"; sheet.save(p, quality=80); print(p)
