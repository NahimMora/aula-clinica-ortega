"""Genera la tabla de inventario de docs/progress/SOURCES.md a partir del manifiesto."""
import json, sys
from pathlib import Path
root = Path(sys.argv[1])
rows = json.loads((root / "content/traceability/sources_manifest.json").read_text(encoding="utf-8"))
fmt = lambda s: "—" if not s else (f"{s//3600}:{s%3600//60:02d}:{s%60:02d}" if s >= 3600 else f"{s//60}:{s%60:02d}")
lines = ["| id | Tema | Tipo | Duración | Video ↔ transcripción | Disponible |", "|---|---|---|---|---|---|"]
for r in rows:
    rel = "mismo nombre base (.mp4 ↔ .md)" if r.get("video") and r.get("transcripcion") and r["id"] not in ("argente",) else (r.get("transcripcion") or "—")
    lines.append(f"| `{r['id']}` | {r['tema']} | {r['tipo']} | {fmt(r.get('duracion_s'))} | {rel} | {'sí' if r['disponible'] else 'NO'} |")
table = "\n".join(lines)
md = root / "docs/progress/SOURCES.md"
text = md.read_text(encoding="utf-8")
start, end = "<!-- INVENTARIO:INICIO -->", "<!-- INVENTARIO:FIN -->"
text = text.split(start)[0] + start + "\n" + table + "\n" + end + text.split(end)[1]
md.write_text(text, encoding="utf-8")
print("ok", len(rows))
