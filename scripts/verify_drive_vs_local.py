import json, hashlib, sys, unicodedata
from pathlib import Path
root = Path(sys.argv[1])
log = json.loads((root/"content/traceability/drive_download_log.json").read_text(encoding="utf-8"))
local = {}
for f in (root/"sources/drive/transcripts/local_whisper").rglob("*.md"):
    local[unicodedata.normalize("NFC", f.name)] = hashlib.sha256(f.read_bytes()).hexdigest()
by_hash = {v: k for k, v in local.items()}
same = diff = 0; diffs = []
for l in log:
    if not l["dest"].endswith(".md"): 
        b = root / l["dest"]
        loc = Path(r"C:/Users/pc10/Downloads/ClinicaMedicaI- 2023 Lautaro Ortega 2.pdf")
        print("BOOK drive sha:", hashlib.sha256(b.read_bytes()).hexdigest()[:16], "local sha:", hashlib.sha256(loc.read_bytes()).hexdigest()[:16], "bytes", b.stat().st_size, loc.stat().st_size)
        continue
    h = hashlib.sha256((root/l["dest"]).read_bytes()).hexdigest()
    if h in by_hash: same += 1
    else: diff += 1; diffs.append(l["path"])
print("transcripts identical:", same, "different:", diff)
for d in diffs: print("  DIFF", d)
