# SOURCES — Fuentes y trazabilidad

Relación entre el contenido publicado y las fuentes utilizadas. **Ninguna fuente original se publica**: el libro, las grabaciones, las transcripciones y las fotos viven en `sources/` (excluido de Git y del despliegue). El enlace a la carpeta de Drive tampoco se publica.

## Jerarquía aplicada

1. Clases y transcripciones del Dr. Ortega (máxima prioridad; marcas `[mm:ss]` usadas para trazabilidad).
2. Libro *Clínica Médica I (2023)* del mismo profesor (definiciones, mecanismos, clasificaciones).
3. Fotos de pizarra (confirmar esquemas y énfasis).
4. Video de maniobras Argente-Álvarez (examen físico práctico; se reproduce por fragmentos desde YouTube, sin redistribuir).
5. Bibliografía médica actual solo para aclarar errores o lagunas, siempre señalada como tal.

## Ubicación local (no versionada)

| Ruta | Contenido |
|---|---|
| `sources/drive/transcripts/local_whisper/` | Transcripciones .md (faster-whisper, con marcas de tiempo). Verificadas: las 60 de Drive son idénticas byte a byte. |
| `sources/drive/transcripts/drive/` | Copia descargada desde Drive (nombres por ID de archivo). |
| `sources/drive/transcripts/condensed/` | Versiones condensadas en bloques de ~40 s para análisis. |
| `sources/drive/videos/` | *Junction* a la caché local de videos de Drive (6,5 GB; no se duplica). |
| `sources/drive/book/` | Libro PDF descargado de Drive (65 MB; mismo contenido que la copia local de 22 MB) y su texto extraído por página. |
| `sources/local/maneuvers/` | Video Argente-Álvarez (4 h 02 min, 35 capítulos), SRT y transcripciones con y sin tiempos. |
| `sources/local/whiteboards/` | Pizzarra1.pdf (22 fotos) y Pizzarra2.pdf (2 fotos). Una foto muestra a una persona: no se publica ninguna; los esquemas se recrean como SVG propios. |

## Observaciones del inventario

- El libro es una compilación de apuntes (cada uno reinicia en “Página 1”). **No contiene un apunte de Motivos de consulta digestivos**: salta de Diabetes insípida (p354) a Examen físico digestivo (p356). El apunte de Síndromes digestivos remite a un “Trastornos de la deglución” que no está en la compilación.
- Digestivo en el libro: Examen físico p356–367, Síndromes p368–414 (hemorragias desde p389). Renal: p415–460. Neurología: p461–509. Ictericia: p10–15. Dolor: p2–4.
- Transcripciones automáticas: contienen errores de reconocimiento (p. ej. “exófago” por esófago, “ACB” por ACV, “signo de hopper” por signo de Popper). Se corrigen al redactar, sin atribuir al profesor frases que no dijo.

## Inventario (generado desde `content/traceability/sources_manifest.json`)

<!-- INVENTARIO:INICIO -->
| id | Tema | Tipo | Duración | Video ↔ transcripción | Disponible |
|---|---|---|---|---|---|
| `mc-dig-1` | MC DEL APARATO DIGESTIVO (parte 1) | clase grabada + transcripción con marcas de tiempo | 35:13 | mismo nombre base (.mp4 ↔ .md) | sí |
| `mc-dig-2` | MC DEL APARATO DIGESTIVO (parte 2) | clase grabada + transcripción con marcas de tiempo | 36:12 | mismo nombre base (.mp4 ↔ .md) | sí |
| `mc-dig-3` | MC DEL APARATO DIGESTIVO (parte 3) | clase grabada + transcripción con marcas de tiempo | 35:14 | mismo nombre base (.mp4 ↔ .md) | sí |
| `mc-dig-4` | MC DEL APARATO DIGESTIVO (parte 4) | clase grabada + transcripción con marcas de tiempo | 33:50 | mismo nombre base (.mp4 ↔ .md) | sí |
| `mc-dig-5` | MC DEL APARATO DIGESTIVO (parte 5) | clase grabada + transcripción con marcas de tiempo | 36:44 | mismo nombre base (.mp4 ↔ .md) | sí |
| `mc-dig-6` | MC DEL APARATO DIGESTIVO (parte 6) | clase grabada + transcripción con marcas de tiempo | 17:05 | mismo nombre base (.mp4 ↔ .md) | sí |
| `ef-dig-1` | EXAMEN FÍSICO DEL APARATO DIGESTIVO (parte 1) | clase grabada + transcripción con marcas de tiempo | 30:53 | mismo nombre base (.mp4 ↔ .md) | sí |
| `ef-dig-2` | EXAMEN FÍSICO DEL APARATO DIGESTIVO (parte 2) | clase grabada + transcripción con marcas de tiempo | 26:47 | mismo nombre base (.mp4 ↔ .md) | sí |
| `sd-esof` | 1-SD. ESOFÁGICO | clase grabada + transcripción con marcas de tiempo | 24:44 | mismo nombre base (.mp4 ↔ .md) | sí |
| `sd-ulc-1` | 2-SD.ULCEROSO - GASTRITIS (parte 1) | clase grabada + transcripción con marcas de tiempo | 8:31 | mismo nombre base (.mp4 ↔ .md) | sí |
| `sd-ulc-2` | 3-SD.ULCEROSO - GASTRITIS (parte 2) | clase grabada + transcripción con marcas de tiempo | 34:43 | mismo nombre base (.mp4 ↔ .md) | sí |
| `sd-ulc-3` | 4-SD.ULCEROSO - GASTRITIS (parte 3) | clase grabada + transcripción con marcas de tiempo | 16:45 | mismo nombre base (.mp4 ↔ .md) | sí |
| `sd-pil` | 5-SÍNDROME PILÓRICO | clase grabada + transcripción con marcas de tiempo | 16:54 | mismo nombre base (.mp4 ↔ .md) | sí |
| `ileo` | 6-ÍLEO | clase grabada + transcripción con marcas de tiempo | 17:08 | mismo nombre base (.mp4 ↔ .md) | sí |
| `malabs-1` | 7-SÍNDROME DE MALA ABSORCIÓN (parte 1) | clase grabada + transcripción con marcas de tiempo | 34:24 | mismo nombre base (.mp4 ↔ .md) | sí |
| `malabs-2` | 8-SÍNDROME DE MALA ABSORCIÓN (parte 2) | clase grabada + transcripción con marcas de tiempo | 16:42 | mismo nombre base (.mp4 ↔ .md) | sí |
| `sii` | 9-SÍNDROME DE INTESTINO IRRITABLE | clase grabada + transcripción con marcas de tiempo | 16:37 | mismo nombre base (.mp4 ↔ .md) | sí |
| `perit-1` | 10-PERITONITIS (parte 1) | clase grabada + transcripción con marcas de tiempo | 24:45 | mismo nombre base (.mp4 ↔ .md) | sí |
| `perit-2` | 11-PERITONITIS (parte 2) | clase grabada + transcripción con marcas de tiempo | 6:32 | mismo nombre base (.mp4 ↔ .md) | sí |
| `vesic` | 12-SÍNDROMES VESICULARES | clase grabada + transcripción con marcas de tiempo | 29:56 | mismo nombre base (.mp4 ↔ .md) | sí |
| `hd-1` | 13-HEMORRAGÍAS DIGESTIVAS (parte 1) | clase grabada + transcripción con marcas de tiempo | 32:00 | mismo nombre base (.mp4 ↔ .md) | sí |
| `hd-2` | 14-HEMORRAGÍAS DIGESTIVAS (parte 2) | clase grabada + transcripción con marcas de tiempo | 12:15 | mismo nombre base (.mp4 ↔ .md) | sí |
| `cirr-1` | 15-CIRROSIS (parte 1) | clase grabada + transcripción con marcas de tiempo | 25:31 | mismo nombre base (.mp4 ↔ .md) | sí |
| `cirr-2` | 16-CIRROSIS (parte 2) | clase grabada + transcripción con marcas de tiempo | 9:22 | mismo nombre base (.mp4 ↔ .md) | sí |
| `htp-1` | 17-HTP (parte 1) | clase grabada + transcripción con marcas de tiempo | 21:23 | mismo nombre base (.mp4 ↔ .md) | sí |
| `htp-2` | 18-HTP (parte 2) | clase grabada + transcripción con marcas de tiempo | 26:57 | mismo nombre base (.mp4 ↔ .md) | sí |
| `ih` | 19-INSUFICIENCIA HEPÁTICA | clase grabada + transcripción con marcas de tiempo | 51:14 | mismo nombre base (.mp4 ↔ .md) | sí |
| `pa-1` | 20-PANCREATITIS AGUDA (parte 1) | clase grabada + transcripción con marcas de tiempo | 9:22 | mismo nombre base (.mp4 ↔ .md) | sí |
| `pa-2` | 21-PANCREATITIS AGUDA (parte 2) | clase grabada + transcripción con marcas de tiempo | 25:04 | mismo nombre base (.mp4 ↔ .md) | sí |
| `mc-ren-1` | MOTIVOS DE CONSULTA DE RENAL (parte 1) | clase grabada + transcripción con marcas de tiempo | 36:27 | mismo nombre base (.mp4 ↔ .md) | sí |
| `mc-ren-2` | MOTIVOS DE CONSULTA DE RENAL (parte 2) | clase grabada + transcripción con marcas de tiempo | 33:17 | mismo nombre base (.mp4 ↔ .md) | sí |
| `ef-ren` | MOTIVOS DE CONSULTA DE RENAL (parte 3) - EXAMEN FÍSICO | clase grabada + transcripción con marcas de tiempo | 32:30 | mismo nombre base (.mp4 ↔ .md) | sí |
| `nefritico` | SÍNDROME NEFRÍTICO | clase grabada + transcripción con marcas de tiempo | 33:54 | mismo nombre base (.mp4 ↔ .md) | sí |
| `nefrotico` | SÍNDROME NEFRÓTICO | clase grabada + transcripción con marcas de tiempo | 33:26 | mismo nombre base (.mp4 ↔ .md) | sí |
| `ir-1` | INSUFICIENCIA RENAL (parte 1) | clase grabada + transcripción con marcas de tiempo | 35:12 | mismo nombre base (.mp4 ↔ .md) | sí |
| `ir-2` | INSUFICIENCIA RENAL (parte 2) | clase grabada + transcripción con marcas de tiempo | 35:37 | mismo nombre base (.mp4 ↔ .md) | sí |
| `ir-3` | INSUFICIENCIA RENAL (parte 3) | clase grabada + transcripción con marcas de tiempo | 14:43 | mismo nombre base (.mp4 ↔ .md) | sí |
| `itu-1` | INFECCIÓN URINARIA (parte 1) | clase grabada + transcripción con marcas de tiempo | 33:55 | mismo nombre base (.mp4 ↔ .md) | sí |
| `itu-2` | INFECCIÓN URINARIA (parte 2) | clase grabada + transcripción con marcas de tiempo | 17:10 | mismo nombre base (.mp4 ↔ .md) | sí |
| `lit-1` | LITIASIS RENOURETERAL (parte 1) | clase grabada + transcripción con marcas de tiempo | 17:18 | mismo nombre base (.mp4 ↔ .md) | sí |
| `lit-2` | LITIASIS RENOURETERAL (parte 2) | clase grabada + transcripción con marcas de tiempo | 24:32 | mismo nombre base (.mp4 ↔ .md) | sí |
| `mc-neu-1` | MC NEUROLOGÍA (parte 1) | clase grabada + transcripción con marcas de tiempo | 31:44 | mismo nombre base (.mp4 ↔ .md) | sí |
| `mc-neu-2` | MC NEUROLOGÍA (parte 2) | clase grabada + transcripción con marcas de tiempo | 35:45 | mismo nombre base (.mp4 ↔ .md) | sí |
| `mc-neu-3` | MC NEUROLOGÍA (parte 3) | clase grabada + transcripción con marcas de tiempo | 37:06 | mismo nombre base (.mp4 ↔ .md) | sí |
| `mc-neu-4` | MC NEUROLOGÍA (parte 4) | clase grabada + transcripción con marcas de tiempo | 30:34 | mismo nombre base (.mp4 ↔ .md) | sí |
| `pc-1` | PARES CRANEALES (parte 1) | clase grabada + transcripción con marcas de tiempo | 31:55 | mismo nombre base (.mp4 ↔ .md) | sí |
| `pc-2` | PARES CRANEALES (parte 2) | clase grabada + transcripción con marcas de tiempo | 35:55 | mismo nombre base (.mp4 ↔ .md) | sí |
| `pc-3` | PARES CRANEALES (parte 3) | clase grabada + transcripción con marcas de tiempo | 34:42 | mismo nombre base (.mp4 ↔ .md) | sí |
| `pc-4` | PARES CRANEALES (parte 4) | clase grabada + transcripción con marcas de tiempo | 29:07 | mismo nombre base (.mp4 ↔ .md) | sí |
| `pc-5` | PARES CRANEALES (parte 5) | clase grabada + transcripción con marcas de tiempo | 26:49 | mismo nombre base (.mp4 ↔ .md) | sí |
| `pc-6` | PARES CRANEALES (parte 6) | clase grabada + transcripción con marcas de tiempo | 20:29 | mismo nombre base (.mp4 ↔ .md) | sí |
| `sn-1` | SÍNDROMES DEL SN (parte 1) | clase grabada + transcripción con marcas de tiempo | 32:53 | mismo nombre base (.mp4 ↔ .md) | sí |
| `sn-2` | SÍNDROMES DEL SN (parte 2) | clase grabada + transcripción con marcas de tiempo | 34:25 | mismo nombre base (.mp4 ↔ .md) | sí |
| `sn-3` | SÍNDROMES DEL SN (parte 3) | clase grabada + transcripción con marcas de tiempo | 32:40 | mismo nombre base (.mp4 ↔ .md) | sí |
| `sn-4` | SÍNDROMES DEL SN (parte 4) | clase grabada + transcripción con marcas de tiempo | 27:04 | mismo nombre base (.mp4 ↔ .md) | sí |
| `sn-5` | SÍNDROMES DEL SN (parte 5) | clase grabada + transcripción con marcas de tiempo | 31:11 | mismo nombre base (.mp4 ↔ .md) | sí |
| `sn-6` | SÍNDROMES DEL SN (parte 6) | clase grabada + transcripción con marcas de tiempo | 36:16 | mismo nombre base (.mp4 ↔ .md) | sí |
| `sn-7` | SÍNDROMES DEL SN (parte 7) | clase grabada + transcripción con marcas de tiempo | 6:30 | mismo nombre base (.mp4 ↔ .md) | sí |
| `neu-rec-1026` | 26.10.2026_22.38.43_REC | clase grabada + transcripción con marcas de tiempo | 53:40 | mismo nombre base (.mp4 ↔ .md) | sí |
| `neu-meet-1024` | Screen_Recording_20261024_121309_Meet | clase grabada + transcripción con marcas de tiempo | 1:31:23 | mismo nombre base (.mp4 ↔ .md) | sí |
| `meningeo-osteo` | Meningeo y osteo | audio/video + transcripción | 1:21:03 | mismo nombre base (.mp4 ↔ .md) | sí |
| `repaso-pato` | Clase Pato repaso | audio/video + transcripción | 1:00:28 | mismo nombre base (.mp4 ↔ .md) | sí |
| `libro` | Clínica Médica I 2023 — L. Ortega (511 p.) | libro PDF | — | — | sí |
| `argente` | Semiología Médica Argente-Álvarez — 35 videos (YouTube EC9tSepFn_U) | video de maniobras + SRT + transcripciones | 4:02:02 | Transcripcion_con_tiempos.txt | sí |
| `pizarra` | Fotos de pizarra (Pizzarra1.pdf 22 p., Pizzarra2.pdf 2 p.) | fotografías | — | — | sí |
<!-- INVENTARIO:FIN -->

## Contenido publicado ↔ fuentes

Cada capítulo tiene su matriz detallada en `content/traceability/<capitulo>.md` (subtema → archivo → minuto → prioridad).

| Capítulo | Fuentes principales | Matriz |
|---|---|---|
| dig-01 · Disfagia, dispepsia, náuseas y vómitos | MC Digestivo 1 (00:00–35:13), MC Digestivo 2 (00:00–32:03), Libro p368–369; maniobras Argente 32:16, 50:08, 2:39:54 | [`content/traceability/dig-01.md`](../../content/traceability/dig-01.md) |
