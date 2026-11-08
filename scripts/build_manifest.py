"""Construye el manifiesto de fuentes: id ↔ archivo de video ↔ transcripción, duración y disponibilidad.
Uso: python -I scripts/build_manifest.py <raiz>   (requiere ffprobe en PATH)
Salida: content/traceability/sources_manifest.json (sin enlaces de Drive)."""
import json, subprocess, sys, unicodedata
from pathlib import Path

root = Path(sys.argv[1])
vid = root / "sources/drive/videos"
tr = root / "sources/drive/transcripts/local_whisper"
N = lambda s: unicodedata.normalize("NFC", s)

MAP = {
 "mc-dig-1": "0 Aparato_digestivo/MC DEL APARATO DIGESTIVO (parte 1)", "mc-dig-2": "0 Aparato_digestivo/MC DEL APARATO DIGESTIVO (parte 2)",
 "mc-dig-3": "0 Aparato_digestivo/MC DEL APARATO DIGESTIVO (parte 3)", "mc-dig-4": "0 Aparato_digestivo/MC DEL APARATO DIGESTIVO (parte 4)",
 "mc-dig-5": "0 Aparato_digestivo/MC DEL APARATO DIGESTIVO (parte 5)", "mc-dig-6": "0 Aparato_digestivo/MC DEL APARATO DIGESTIVO (parte 6)",
 "ef-dig-1": "0 Aparato_digestivo/EXAMEN FÍSICO DEL APARATO DIGESTIVO (parte 1)", "ef-dig-2": "0 Aparato_digestivo/EXAMEN FÍSICO DEL APARATO DIGESTIVO (parte 2)",
}
T1 = "1 SÍNDROMES O ENFERMEDADES DEL APARATO DIGESTIVO_ “TUBO DIGESTIVO”/"
T2 = "2 SÍNDROME O ENFERMEDADES DEL APARATO DIGESTIVO_ “HIGADO, PÁNCREAS Y VÍAS BILIARES_ EMERGENCIAS DIGESTIVAS”/"
for k, v in {"sd-esof": "1-SD. ESOFÁGICO", "sd-ulc-1": "2-SD.ULCEROSO - GASTRITIS (parte 1)", "sd-ulc-2": "3-SD.ULCEROSO - GASTRITIS (parte 2)", "sd-ulc-3": "4-SD.ULCEROSO - GASTRITIS (parte 3)",
             "sd-pil": "5-SÍNDROME PILÓRICO", "ileo": "6-ÍLEO", "malabs-1": "7-SÍNDROME DE MALA ABSORCIÓN (parte 1)", "malabs-2": "8-SÍNDROME DE MALA ABSORCIÓN (parte 2)", "sii": "9-SÍNDROME DE INTESTINO IRRITABLE"}.items():
    MAP[k] = T1 + v
for k, v in {"perit-1": "10-PERITONITIS (parte 1)", "perit-2": "11-PERITONITIS (parte 2)", "vesic": "12-SÍNDROMES VESICULARES", "hd-1": "13-HEMORRAGÍAS DIGESTIVAS (parte 1)", "hd-2": "14-HEMORRAGÍAS DIGESTIVAS (parte 2)",
             "cirr-1": "15-CIRROSIS (parte 1)", "cirr-2": "16-CIRROSIS (parte 2)", "htp-1": "17-HTP (parte 1)", "htp-2": "18-HTP (parte 2)", "ih": "19-INSUFICIENCIA HEPÁTICA", "pa-1": "20-PANCREATITIS AGUDA (parte 1)", "pa-2": "21-PANCREATITIS AGUDA (parte 2)"}.items():
    MAP[k] = T2 + v
R = "3 APARATO NEFROUROLOGICO/"
for k, v in {"mc-ren-1": "MOTIVOS DE CONSULTA DE RENAL (parte 1)", "mc-ren-2": "MOTIVOS DE CONSULTA DE RENAL (parte 2)", "ef-ren": "MOTIVOS DE CONSULTA DE RENAL (parte 3) - EXAMEN FÍSICO",
             "nefritico": "SÍNDROME NEFRÍTICO", "nefrotico": "SÍNDROME NEFRÓTICO", "ir-1": "INSUFICIENCIA RENAL (parte 1)", "ir-2": "INSUFICIENCIA RENAL (parte 2)", "ir-3": "INSUFICIENCIA RENAL (parte 3)",
             "itu-1": "INFECCIÓN URINARIA (parte 1)", "itu-2": "INFECCIÓN URINARIA (parte 2)", "lit-1": "LITIASIS RENOURETERAL (parte 1)", "lit-2": "LITIASIS RENOURETERAL (parte 2)"}.items():
    MAP[k] = R + v
S = "4 SISTEMA NERVIOSO/"
for i in range(1, 5): MAP[f"mc-neu-{i}"] = S + f"MC NEUROLOGÍA (parte {i})"
for i in range(1, 7): MAP[f"pc-{i}"] = S + f"PARES CRANEALES (parte {i})"
for i in range(1, 8): MAP[f"sn-{i}"] = S + f"SÍNDROMES DEL SN (parte {i})"
MAP["neu-rec-1026"] = S + "26.10.2026_22.38.43_REC"
MAP["neu-meet-1024"] = S + "Screen_Recording_20261024_121309_Meet"

def find(base: Path, rel: str, exts):
    target = N(rel)
    for f in base.rglob("*"):
        if f.suffix.lower() in exts and N(f.relative_to(base).with_suffix("").as_posix()) == target:
            return f
    return None

def dur(f):
    try:
        out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(f)], capture_output=True, text=True, timeout=60).stdout.strip()
        return round(float(out))
    except Exception:
        return None

rows = []
for sid, rel in MAP.items():
    v = find(vid, rel, {".mp4"}); t = find(tr, rel, {".md"})
    rows.append({"id": sid, "tema": rel.split("/")[-1], "carpeta": rel.split("/")[0], "tipo": "clase grabada + transcripción con marcas de tiempo",
                 "video": v.relative_to(vid).as_posix() if v else None, "transcripcion": t.relative_to(tr).as_posix() if t else None,
                 "duracion_s": dur(v) if v else None, "disponible": bool(v and t)})
# Fuentes sueltas
for sid, name, ext in [("meningeo-osteo", "Meningeo y osteo", ".m4a"), ("repaso-pato", "Clase Pato repaso", ".mp4")]:
    hits = list((vid / "_archivos_sueltos").rglob(name + ext))  # se busca por nombre: no se guardan IDs de Drive
    v = hits[0] if hits else vid / "_archivos_sueltos" / (name + ext)
    rel = name
    # Nunca exponer IDs de Drive: solo el nombre del archivo.
    rows.append({"id": sid, "tema": Path(rel).name, "carpeta": "archivos sueltos (caché local)", "tipo": "audio/video + transcripción", "video": (Path(rel).name + ext) if v.exists() else None,
                 "transcripcion": f"Archivos sueltos/{Path(rel).name}.md", "duracion_s": dur(v) if v.exists() else None, "disponible": v.exists()})
book = root / "sources/drive/book/ClinicaMedicaI-2023-Ortega.pdf"
rows.append({"id": "libro", "tema": "Clínica Médica I 2023 — L. Ortega (511 p.)", "carpeta": "raíz del Drive", "tipo": "libro PDF", "video": None, "transcripcion": None, "duracion_s": None, "disponible": book.exists()})
mv = root / "sources/local/maneuvers/Semiología Médica Argente Álvarez.mp4"
rows.append({"id": "argente", "tema": "Semiología Médica Argente-Álvarez — 35 videos (YouTube EC9tSepFn_U)", "carpeta": "sources/local/maneuvers", "tipo": "video de maniobras + SRT + transcripciones", "video": mv.name, "transcripcion": "Transcripcion_con_tiempos.txt", "duracion_s": dur(mv), "disponible": mv.exists()})
rows.append({"id": "pizarra", "tema": "Fotos de pizarra (Pizzarra1.pdf 22 p., Pizzarra2.pdf 2 p.)", "carpeta": "sources/local/whiteboards", "tipo": "fotografías", "video": None, "transcripcion": None, "duracion_s": None, "disponible": True})
out = root / "content/traceability/sources_manifest.json"
out.write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding="utf-8")
missing = [r["id"] for r in rows if not r["disponible"]]
total = sum(r["duracion_s"] or 0 for r in rows if r["id"] not in ("argente",))
print("fuentes:", len(rows), "faltantes:", missing, "horas de clase:", round(total / 3600, 1))
