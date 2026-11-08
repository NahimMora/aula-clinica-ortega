"""Descarga desde el Drive público las transcripciones .md y el libro PDF.
Uso: python -I scripts/fetch_drive_text.py <raiz_proyecto>
No descarga videos (ya están en la caché local enlazada en sources/drive/videos)."""
import json, sys, time, hashlib
from pathlib import Path
import gdown

root = Path(sys.argv[1])
manifest = json.loads((root / "content/traceability/drive_manifest.raw.json").read_text(encoding="utf-8"))
out_t = root / "sources/drive/transcripts/drive"
out_b = root / "sources/drive/book"
log = []
for item in manifest:
    p = item["path"].replace("\\", "/")
    if p.endswith(".md") and p.startswith("transcripciones/"):
        dest = out_t / f"{item['id']}.md"   # nombre por ID: evita problemas de codificación
    elif p.lower().endswith(".pdf"):
        dest = out_b / "ClinicaMedicaI-2023-Ortega.pdf"
    else:
        continue
    if dest.exists() and dest.stat().st_size > 0:
        log.append({"id": item["id"], "path": p, "dest": str(dest.relative_to(root)), "status": "cached"})
        continue
    dest.parent.mkdir(parents=True, exist_ok=True)
    for attempt in range(3):
        r = gdown.download(id=item["id"], output=str(dest), quiet=True, use_cookies=False, resume=True)
        if r: break
        time.sleep(5)
    ok = dest.exists() and dest.stat().st_size > 0
    sha = hashlib.sha256(dest.read_bytes()).hexdigest() if ok else None
    log.append({"id": item["id"], "path": p, "dest": str(dest.relative_to(root)), "status": "ok" if ok else "FAILED", "sha256": sha, "bytes": dest.stat().st_size if ok else 0})
    print(log[-1]["status"], p, flush=True)
(root / "content/traceability/drive_download_log.json").write_text(json.dumps(log, ensure_ascii=False, indent=1), encoding="utf-8")
print("DONE", sum(1 for l in log if l["status"] != "FAILED"), "/", len(log))
