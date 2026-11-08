# HANDOFF — Cómo continuar este proyecto (para otra IA o persona)

> Leé esto primero. Se actualiza a medida que avanza el trabajo. Última actualización: 2026-11-08.

## 1. Qué es
**Aula Clínica — Semiología I**: web de estudio de Semiología y Clínica Médica I basada en las clases del Dr. Ortega.
- Sitio publicado: https://nahimmora.github.io/aula-clinica-ortega/
- Repo: https://github.com/NahimMora/aula-clinica-ortega (público; `gh` autenticado como NahimMora)
- Carpeta local del proyecto: `C:\Claude\semio` (trabajar SIEMPRE acá, no escanear el resto del disco).

## 2. Indicaciones vigentes de la usuaria (prioridad máxima — feedback del 2026-11-08)
1. **Estética**: le gusta el diseño, pero quiere **paleta OSCURA** (tanto blanco la encandila). Centrar mejor diapositivas, diagramas y la distribución general.
2. **Contenido conciso y centrado en el profesor**:
   - Fuente principal: **audios/transcripciones del profesor** + **fotos de pizarra** (escritas por él).
   - **Remarcar muy bien las preguntas de examen** (lo que el profe dice que toma: criterios, tríadas, clasificaciones).
   - Del **libro de Clínica Médica** solo agregar la **fisiopatología**, para poder relacionar y defender el “por qué”.
   - **Quitar relleno.** “Si me ponés mucha info no me voy a centrar en lo que el profe pide, que es muy conciso (criterios, tríadas, etc.)”.
   - Referencia de estilo/densidad: los videos hechos en `C:\Claude\semiologia-ortega` (**el de nefro es el mejor**).
3. **Diapositivas**: tomar como modelo la forma de hacer diapositivas ilustrativas, animadas e interactivas de `C:\Claude\farrmaco` y aplicarla donde corresponda (entendimiento + memoria visual).
4. **Apartado propio de EXAMEN FÍSICO**, dividido por sistema: digestivo (separado en hígado, bazo, vesícula, etc.), renal, neuro y soma. Cada maniobra con su fragmento exacto de video.
5. Documentar el avance (este archivo) por si se corta la sesión.

Instrucciones originales completas del proyecto: ver `docs/progress/PLAN.md` (orden de capítulos) y el pedido inicial resumido en la sección 8.

## 2b. Lo aprendido de las referencias (2026-11-08)
- **`C:\Claude\semiologia-ortega`** (trabajo previo para el oral del 4/11): videos 01–05 en `output/videos/` (el de **nefro, 02, es el modelo**). Guiones en `video/src/chapters/ren/*.ts`: escenas cortas con `prio: "P0"`, `quote` (frase textual del profe: “este cuadrito lo pregunta…”), `src` con minuto, narración breve, visual tipado (`scale` para valores, `compare` “NO CONFUNDIR”, `points`, `flow` para algoritmos, `table`, `quiz` pregunta→respuesta).
  - **Preguntero de examen**: `output/oral-study/PREGUNTERO_RESUELTO.md` — 156 preguntas (124 del Word `C:\Users\pc10\Downloads\Preguntas_Semiologia_Digestivo_y_Urinario.docx` + 32 de neuro), cada una con prioridad P0/P1/P2, “datos imprescindibles”, respuesta modelo, frase remarcada en clase y grabación@minuto. **Es la base para “preguntas de examen”.** También `HOJA_TRIADAS_ESCALAS_VALORES.md` (tríadas, escalas y valores) y `analysis/correcciones_asr.md`.
  - Ojo: en el bloque “MC náuseas, vómitos y dolor abdominal” **no hay preguntas de disfagia ni dispepsia**: lo que se toma es vómito/náusea, tipos de vómito, **hematemesis vs hemoptisis (P0)**, Mallory-Weiss (tríada), abdomen agudo (5 tipos, P0), Cullen/Grey-Turner (P0).
- **`C:\Claude\farrmaco\farmaco-flor`** (app de farmacología de la misma usuaria): “No es una biblioteca: es un entrenamiento de memoria”. Práctica solo con material real de examen (no inventar preguntas). Diapositivas = **escena + pasos**: cada paso tiene texto `di` (se lee en la web y se narra) y `retener` (términos clave); la web las recorre **paso a paso** (Anterior/Siguiente + puntos de progreso) y el mismo motor renderiza el video (`src/vis/`). Tema oscuro con `data-tema` + `prefers-color-scheme`.
- Verificaciones de fuentes hechas: hematemesis vs hemoptisis → clase `hd-1` 08:08–08:27 (“pregunta de parcial… ese cuadrito tienen que sabérselo”; en la grabación dice “hematemesis pH alcalino”, el libro p75 dice que la alcalina es la hemoptisis → usar el libro y aclarar). Mallory-Weiss → `hd-1` 16:48 (“tríada: hematemesis, vómito y alcoholismo; desgarro lineal de la mucosa esofagogástrica”) + libro p390.
- Fisiopatología en el libro para dig-01: p368–369 (síndrome esofágico, acalasia), p375 (síndrome pilórico: vómito), p377 (íleo: vómitos alimentarios→biliosos→fecaloides; deshidratación, hipopotasemia, alcalosis), p389–390 (hemorragia digestiva, hematemesis, Mallory-Weiss), p75 (hemoptisis vs hematemesis: hematina ácida, reacción alcalina, melena posterior).

## 3. Fuentes (NUNCA se suben a Git ni al sitio)
- `sources/drive/transcripts/local_whisper/` — transcripciones .md con marcas `**[mm:ss.xxx]**` (idénticas a las de Drive).
- `sources/drive/transcripts/condensed/` — versiones en bloques de ~40 s (más fáciles de leer). Regenerar con `scripts/condense_transcript.py`.
- `sources/drive/videos/` — junction a `C:\Users\pc10\Downloads\Videos transcrpitos\.cache_videos_drive` (videos de las clases).
- `sources/drive/book/ClinicaMedicaI-2023-Ortega.pdf` y `book_text_drive.txt` (texto por página con marcas `=== [pN] ===`). Índice de apuntes: `content/traceability/book_index_drive.txt` (ignorado por git; regenerable).
- `sources/local/maneuvers/` — video Argente-Álvarez (YouTube `EC9tSepFn_U`, 4 h 02 min, 35 capítulos), `Transcripcion_con_tiempos.txt` ([hh:mm:ss] por línea), SRT, info.json (capítulos con segundos).
- `sources/local/whiteboards/` — `Pizzarra1.pdf` (22 fotos), `Pizzarra2.pdf` (2). Render a JPG en `sources/local/whiteboards/png/` con `scripts/render_pdf_pages.py`. Contienen: respiratorio, cardio, hígado/bazo/vesícula (Chauffard, Güemes, Mathieu, Gilbert; bazo: simple, bimanual propia, Galambos, cuchara, Naegeli, Merlo, Schuster), motilidad/reflejos, tabla de síndromes motores, pares craneales (I–XII, VII, IX, X), soma (codo, muñeca Tinel/Phalen, rodilla cajón/bostezo/meniscos), signos meníngeos (rigidez de nuca, Kernig, Brudzinski).
- Mapeo id ↔ archivo: `content/traceability/sources_manifest.json` y `docs/progress/SOURCES.md`.
- **Prohibido publicar**: enlace o IDs de Drive, libro, transcripciones, grabaciones, fotos. `npm run check:content` lo verifica (corre también en CI).

## 4. Arquitectura (desde el 2026-11-08 noche: capítulo por pasos, modelo farmaco-flor)
- Vite + React 18 + TypeScript, HashRouter, base `/aula-clinica-ortega/`. Deploy por GitHub Actions (`.github/workflows/deploy.yml`) en cada push a `main`.
- **Pedido de la usuaria (2026-11-08):** «todo el capítulo con una estructura limpia como la de farmaco, sin tantas opciones» y diapositivas interactivas de verdad. Se aplicó así:
  - Capítulo = **riel de pasos**, una pantalla por paso: `Sabete esto · Teoría · Video · Cuadros · Choice · Desarrollo · Repaso`. Ruta `#/capitulo/<id>/<paso>`; `#/capitulo/<id>` y los enlaces viejos `?s=` redirigen. Botón «Seguir con …» al final de cada paso. Sin modos ni toggles extra (solo «Mapa limpio/oculto» y «Ver todo/Tapar respuestas»).
  - **Teoría = escenas + pasos** (como `src/vis` de farmaco): cada paso tiene `di` (texto que se lee y se narra), `voz` opcional (pronunciación) y `retener` (chips). El dibujo es **SVG puro, función de (escena, paso, t)**: la web lo anima con requestAnimationFrame y Remotion con el fotograma. Mismo texto y mismo dibujo en web y video.
- `content/` = contenido médico tipado:
  - `content/curriculum.ts` — sistemas y capítulos (`status`). Un capítulo se ve solo si está `published` y existe `content/chapters/<id>/index.tsx`.
  - `content/chapters/<id>/index.tsx` — tipo `Chapter` (`src/types.ts`): `esencial` (objetivo, avisos, bloques del mapa), `escenas`, `cuadros` (tabla + `porque` del libro + `nota` + cita del profe), `mcq`, `developments` (preguntas de examen con `prio` y `quote`), `memory`, `trampas`, `links`, `maneuvers`, `video`.
  - `content/chapters/<id>/escenas.ts` — Teoría paso a paso. `tiempos.json` y `video.json` los genera `npm run tts`.
  - `content/maneuvers/index.ts`, `content/sources.ts`, `content/traceability/<id>.md` (igual que antes).
- `src/escenas/tipos.ts` + `src/escenas/Lienzo.tsx` — motor de escenas. Tipos: `cuadro` (comparativo fila por fila), `lista` (tarjetas), `tubo` (tubo digestivo + muestra de vómito), `flujo` (causa→consecuencia, algoritmos), `paneles` (1–3 figuras: pared/MW/Boerhaave, paciente alta/baja, muro/motor, acalasia, pico de pájaro, manzana mordida; franja opcional para tríadas). Colores por variables `--v-*` (web: `.lienzo` en `src/styles/capitulo.css`; video: en línea en `video/src/Root.tsx`). Lienzo 960×600; textos ≥ 23 px de coordenada para que se lean en celular.
- `src/pages/ChapterPage.tsx` — riel y pasos (Esencial, Cuadros, Repaso). `src/components/Teoria.tsx` — recorrido paso a paso (temas, puntos, narración, retener, Anterior/Siguiente, flechas, «Escuchar este paso» con `public/media/<id>/pasos/<escena>-<n>.mp3`).
- `src/lib/useChapter.ts` — al cargar, **mezcla las opciones de cada choice con una permutación fija por pregunta** (antes la correcta quedaba casi siempre en B). Es determinística: igual en web, examen y PDF.
- `src/pages/Manual.tsx` — `#/manual/<sistema>` = cuadros del sistema; `#/imprimir/<sistema>` = fuente del PDF (lo que pregunta el profe, sabete esto, cuadros, desarrollos, memoria, trampas, choice con respuestas).
- `video/src/Root.tsx` — video de Remotion armado con las mismas escenas (portada, lienzo + «Retené esto» acumulado + subtítulo, cierre).
- Se eliminaron: SlideDeck/SlidesBlock (@remotion/player en la web), `src/video/kit.tsx`, DeckScene, ConceptMap, diagram-kit, `diagrams.tsx`, `slides.tsx`, `narration.json`, `timing.json`.
- Estilos: `src/styles/tokens.css` (paleta oscura), base, layout, content, practice, **capitulo.css** (riel, teoría, cuadros, repaso), print.
- Progreso del estudiante: `src/lib/progress.ts` (localStorage `aula-clinica-ortega:v1`; los pasos vistos se guardan como `visited`).

## 5. Comandos
```bash
npm install
npm run build                      # typecheck + build
npx vite preview --port 4791       # (el puerto 4173 lo usa otra app del equipo)
npm run check:content              # sin fuentes privadas
npm run tts -- dig-01              # narra cada paso de escenas.ts (edge-tts es-AR-TomasNeural) → pasos/*.mp3, tiempos.json, VTT, video.json
npm run video:render -- dig-01 video/out/dig-01-master.mp4 --codec=h264 --crf=20
ffmpeg -i video/out/dig-01-master.mp4 -c:v libx264 -preset slow -crf 27 -tune animation -c:a aac -b:a 96k -movflags +faststart public/media/dig-01.mp4
npm run pdf                        # PDFs desde #/imprimir/<sistema> (requiere preview en 4791)
# Verificación (en Git Bash anteponer MSYS_NO_PATHCONV=1):
node scripts/smoke-test.mjs <url> <carpeta> / /capitulo/dig-01/esencial /capitulo/dig-01/teoria
node scripts/interaction-test.mjs <url> dig-01 <carpeta>     # 26 controles en ancho de celular
node scripts/check-video.mjs <url> dig-01
node scripts/shoot-teoria.mjs "<url>#/capitulo/dig-01/teoria" <carpeta> 420   # captura cada paso de Teoría
npx remotion still video/src/index.ts dig-01 out.png --frame=<n>               # revisar un cuadro del video
```
Chrome para puppeteer: `C:/Program Files/Google/Chrome/Application/chrome.exe`. Python con PyMuPDF/Pillow: `.venv/Scripts/python`.
Cambiar el texto de un paso obliga a `npm run tts` (solo re-narra lo que cambió) y a renderizar el video.

Verificar un fragmento de maniobra: extraer fotogramas con `ffmpeg -ss <seg> -i "sources/local/maneuvers/Semiología Médica Argente Álvarez.mp4" -frames:v 1 ...` y armar hoja con `scripts/contact_sheet.py`. La duración local coincide con YouTube (14 522 s), así que los segundos sirven para el embed.

## 6. Estado
- **dig-01 rehecho por pasos** y verificado (ver 6b). Es la plantilla para los capítulos siguientes.
- Maniobras verificadas hasta ahora: boca/orofaringe (3008–3090 s), supraclaviculares (1936–1982 s), bazuqueo (9594–9644 s).

## 7. Próximos pasos (en orden)
1. Sección **Examen físico** por sistema y región (digestivo: abdomen, hígado, bazo, vesícula; renal; neuro; soma) con fragmentos del video Argente verificados por fotogramas + pizarras + clases EF.
2. dig-02 (dolor abdominal / abdomen agudo: 5 tipos P0, Cullen/Grey-Turner P0) con la misma estructura: `esencial`, `escenas.ts`, `cuadros`, desarrollos del preguntero, choice, memoria.

## 8. Pedido original (resumen)
Plataforma completa por sistemas (digestivo, renal, neuro, maniobras, soma); cada capítulo con teoría visual, consulta/PDF, video con voz es-AR-TomasNeural, choice, desarrollos resueltos con «Lo sabía/No lo sabía» y repaso espaciado, mnemotecnias. Un capítulo completo, probado y desplegado a la vez. No publicar material privado. Nunca atribuir al profesor frases que no dijo.

## 6b. Estado al cortar la sesión (2026-11-08, noche)
- dig-01 por pasos: 5 bloques en «Sabete esto» + 7 preguntas de examen (2 P0); **11 escenas / 47 pasos** de Teoría con narración por paso; video de 9:35 generado desde las mismas escenas; 8 cuadros con «¿por qué?» del libro; 15 choice (opciones mezcladas); 7 desarrollos; 5 tarjetas de recuperación; 5 trampas; 3 maniobras.
- Verificado en local: interaction-test 26/26 (celular), smoke-test (12 rutas, escritorio y celular), check:content, PDF (15 páginas), revisión visual de los 47 pasos y de cuadros del video.

## 9. Bitácora
- 2026-11-07 — Inventario, arquitectura, Etapa 1 y dig-01 publicados y verificados.
- 2026-11-08 — Feedback de la usuaria (sección 2). Se crea este HANDOFF. Paleta oscura; dig-01 conciso.
- 2026-11-08 (tarde) — Video re-renderizado y diapositivas paso a paso sobre Remotion (luego reemplazadas).
- 2026-11-08 (noche) — Pedido: «estructura limpia como la de farmaco, sin tantas opciones» + diapositivas interactivas de verdad. Capítulo por pasos, motor de escenas propio, video desde las escenas, opciones de choice mezcladas.
- 2026-11-08 (noche) — Publicado y verificado en la URL pública: interaction-test 26/26, smoke-test, check-video (9:35, 110 subtítulos), PDF.
