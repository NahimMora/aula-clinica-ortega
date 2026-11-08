"""Condensa una transcripción faster-whisper (.md con **[mm:ss.xxx]**) en bloques
de ~N segundos, conservando la marca de tiempo inicial de cada bloque.
Uso: python condense_transcript.py <in_dir> <out_dir> [segundos]"""
import re, sys
from pathlib import Path
src, dst = Path(sys.argv[1]), Path(sys.argv[2])
win = float(sys.argv[3]) if len(sys.argv) > 3 else 40
pat = re.compile(r"^\*\*\[(?:(\d+):)?(\d+):(\d+(?:\.\d+)?)\]\*\*\s*(.*)$")
def fmt(s):
    s = int(s); h, r = divmod(s, 3600); m, sec = divmod(r, 60)
    return f"{h}:{m:02d}:{sec:02d}" if h else f"{m:02d}:{sec:02d}"
for f in sorted(src.rglob("*.md")):
    if f.name.startswith("00_"): continue
    blocks, cur, start = [], [], None
    for line in f.read_text(encoding="utf-8").splitlines():
        m = pat.match(line.strip())
        if not m: continue
        h, mi, se, txt = m.groups()
        t = (int(h) if h else 0) * 3600 + int(mi) * 60 + float(se)
        if start is None: start = t
        if t - start >= win and cur:
            blocks.append(f"[{fmt(start)}] " + " ".join(cur)); cur, start = [], t
        cur.append(txt.strip())
    if cur: blocks.append(f"[{fmt(start)}] " + " ".join(cur))
    out = dst / f.relative_to(src).with_suffix(".txt")
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text("\n".join(blocks), encoding="utf-8")
    print(f"{len(blocks):4d} bloques  {out.stat().st_size:7d} B  {out.relative_to(dst)}")
