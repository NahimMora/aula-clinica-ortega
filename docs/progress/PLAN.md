# PLAN — Capítulos y orden de ejecución

Regla técnica: **un capítulo completo, probado y desplegado a la vez**. Regla pedagógica: **ubicarse → comprender → relacionar → memorizar y practicar**.

Cada capítulo incluye: A. mapa inicial · B. bases · C. teoría visual · D. consulta rápida + manual web + PDF del sistema · E. video Remotion (voz es-AR-TomasNeural) · F. choice · G. desarrollos resueltos (Lo sabía / No lo sabía + repaso espaciado) · H. memoria activa y mnemotecnias · maniobras relacionadas (si corresponden) · I. integración final.

## Etapa 1 — Preparación
- [x] Inventario de Drive (121 archivos) y fuentes locales; manifiesto con duraciones (31 h de clase).
- [x] Análisis del temario de MC digestivo (6 clases) y división en capítulos.
- [x] Arquitectura (Vite + React + TS, contenido tipado en `content/`, carga diferida por capítulo).
- [x] Diseño general y funciones globales (búsqueda, progreso, repaso, práctica, examen, manual, maniobras).
- [ ] Repositorio `aula-clinica-ortega`, GitHub Actions y GitHub Pages con estructura inicial verificada.

## Orden de capítulos

La división de “Motivos de consulta digestivos” en tres capítulos responde a su extensión real (6 clases, ~3 h 15 min).

| # | id | Capítulo | Fuentes principales |
|---|---|---|---|
| 1 | dig-01 | Disfagia, dispepsia, náuseas y vómitos | MC Digestivo 1 (00:00–35:13) y 2 (00:00–32:03) · Libro p368–369 |
| 2 | dig-02 | Dolor abdominal y abdomen agudo | MC Digestivo 2 (32:03–fin), 3 y 4 |
| 3 | dig-03 | Diarrea, constipación y trastornos anorrectales | MC Digestivo 5 y 6 |
| 4 | dig-04 | Ictericia (repaso que el profesor exige) | MC Digestivo 6 (15:58) · Libro p10–15 |
| 5 | dig-05 | Examen físico del aparato digestivo + maniobras | EF Digestivo 1–2 · Libro p356–367 · Pizarras · Argente 19–27 |
| 6 | dig-06 | Síndrome esofágico | Clase Sd. esofágico · Libro p368–372 |
| 7 | dig-07 | Síndrome ulceroso y gastritis | Clases 2–4 |
| 8 | dig-08 | Síndrome pilórico e íleo | Clases 5–6 |
| 9 | dig-09 | Malabsorción e intestino irritable | Clases 7–9 |
| 10 | dig-10 | Peritonitis | Clases 10–11 |
| 11 | dig-11 | Síndromes vesiculares | Clase 12 |
| 12 | dig-12 | Hemorragias digestivas | Clases 13–14 · Libro p389+ |
| 13 | dig-13 | Cirrosis e hipertensión portal | Clases 15–18 |
| 14 | dig-14 | Insuficiencia hepática | Clase 19 |
| 15 | dig-15 | Pancreatitis aguda | Clases 20–21 |
| 16 | ren-01 | Motivos de consulta nefrourológicos | MC Renal 1–2 · Libro p445–458 |
| 17 | ren-02 | Examen físico nefrourológico + maniobras | MC Renal 3 · Libro p459–460 · Argente 28 |
| 18 | ren-03 | Síndrome nefrítico | Clase |
| 19 | ren-04 | Síndrome nefrótico | Clase · Libro p440–444 |
| 20 | ren-05 | Insuficiencia renal | Clases 1–3 · Libro p429–439 |
| 21 | ren-06 | Infección urinaria | Clases 1–2 · Libro p420–428 |
| 22 | ren-07 | Litiasis renoureteral | Clases 1–2 |
| 23 | neu-01 | MC neurológicos I | MC Neuro 1–2 (orden provisional) |
| 24 | neu-02 | MC neurológicos II | MC Neuro 3–4 |
| 25 | neu-03 | Pares craneales I | Pares 1–3 · Pizarras |
| 26 | neu-04 | Pares craneales II | Pares 4–6 · Pizarras |
| 27 | neu-05 | Motilidad y síndromes motores | Síndromes SN · Libro p461–509 · Pizarras |
| 28 | neu-06 | Otros síndromes neurológicos | Síndromes SN · Libro |
| 29 | man-dig / man-ren / man-neu | Biblioteca de maniobras | Argente 19–35 · Pizarras · clases de EF |
| 30 | soma-01 | Soma (práctico) | Argente 4 · audio meníngeo y osteo · Pizarras |
| 31 | — | Integradores finales por sistema | Todo lo anterior |

Las grabaciones de neurología sin título (26/10 y 24/10) y la clase de repaso se analizarán al llegar a ese sistema para ubicarlas en el capítulo correcto.

## PDFs
- `public/pdf/manual-digestivo.pdf`, `manual-renal.pdf`, `manual-neuro.pdf`, `guia-maniobras.pdf`: se regeneran (`npm run pdf`) cada vez que se publica un capítulo del sistema.
