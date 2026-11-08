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

## 4. Arquitectura
- Vite + React 18 + TypeScript, HashRouter, base `/aula-clinica-ortega/`. Deploy por GitHub Actions (`.github/workflows/deploy.yml`) en cada push a `main`.
- `content/` = contenido médico tipado (separado de `src/`):
  - `content/curriculum.ts` — sistemas y capítulos (`status: 'published' | 'soon'`). Un capítulo se ve solo si está `published` y existe `content/chapters/<id>/index.tsx`.
  - `content/chapters/<id>/index.tsx` — datos del capítulo (tipo `Chapter` en `src/types.ts`): map, bases, theory (bloques), quickRef, mcq, developments, memory, maneuvers, closing, video, slides.
  - `content/chapters/<id>/diagrams.tsx` — diagramas SVG/HTML del capítulo.
  - `content/chapters/<id>/slides.tsx` — escenas Remotion (video + diapositivas interactivas). `narration.json` (guion), `timing.json` y `video.json` (generados).
  - `content/maneuvers/index.ts` — biblioteca de maniobras (grupos + maniobras con segmento de YouTube verificado).
  - `content/sources.ts` — rótulos de fuentes para las referencias `{src, t, p}`.
  - `content/traceability/<id>.md` — matriz subtema → clase → minuto → prioridad.
- `src/components/` — Blocks (renderiza bloques), ConceptMap, Practice (choice/desarrollos/memoria), Maneuvers (reproductor de fragmentos YouTube con IFrame API), SlidesBlock/SlideDeck (@remotion/player, carga diferida), VideoPlayer, diagram-kit (Flow, Donut, ChoiceBar, PAL), ErrorBoundary.
- `src/video/kit.tsx` + `src/video/DeckScene.tsx` — kit de animación Remotion compartido (imports relativos; lo usa Vite y el bundler de Remotion).
- `video/src/index.ts` + `Root.tsx` — entrada de Remotion solo para render.
- Estilos: `src/styles/tokens.css` (paleta en variables CSS; acá se cambia a oscuro), base, layout, content, practice, print.
- Progreso del estudiante: `src/lib/progress.ts` (localStorage `aula-clinica-ortega:v1`, Leitner, exportar/importar JSON).

## 5. Comandos
```bash
npm install
npm run build                      # typecheck + build
npx vite preview --port 4791       # (el puerto 4173 lo usa otra app del equipo)
npm run check:content              # sin fuentes privadas
npm run tts -- dig-01              # narración edge-tts es-AR-TomasNeural + timing + VTT + video.json
npm run video:render -- dig-01 video/out/dig-01-master.mp4 --codec=h264 --crf=20
ffmpeg -i video/out/dig-01-master.mp4 -c:v libx264 -preset slow -crf 27 -tune animation -c:a aac -b:a 96k -movflags +faststart public/media/dig-01.mp4
npm run pdf                        # PDFs desde #/imprimir/<sistema> (requiere preview en 4791)
# Verificación (en Git Bash anteponer MSYS_NO_PATHCONV=1):
node scripts/smoke-test.mjs <url> <carpeta> / /capitulo/dig-01
node scripts/interaction-test.mjs <url> dig-01 <carpeta>
node scripts/check-video.mjs <url> dig-01
node scripts/shoot-sections.mjs "<url>#/capitulo/dig-01" <carpeta> 1440 "#ubicate" ...   # capturas para revisión visual
```
Chrome para puppeteer: `C:/Program Files/Google/Chrome/Application/chrome.exe`. Python con PyMuPDF/Pillow: `.venv/Scripts/python`.

Verificar un fragmento de maniobra: extraer fotogramas con `ffmpeg -ss <seg> -i "sources/local/maneuvers/Semiología Médica Argente Álvarez.mp4" -frames:v 1 ...` y armar hoja con `scripts/contact_sheet.py`. La duración local coincide con YouTube (14 522 s), así que los segundos sirven para el embed.

## 6. Estado
- Etapa 1 (estructura) y **dig-01** publicados y verificados (ver `STATUS.md`).
- **dig-01 debe REESCRIBIRSE** según la sección 2: más conciso, centrado en lo que dice el profe, preguntas de examen destacadas, fisiopatología del libro, sin relleno de bibliografía.
- Maniobras verificadas hasta ahora: boca/orofaringe (3008–3090 s), supraclaviculares (1936–1982 s), bazuqueo (9594–9644 s).

## 7. Próximos pasos (en orden)
1. Estudiar `C:\Claude\semiologia-ortega` (nefro) y `C:\Claude\farrmaco` → anotar acá el patrón a seguir.
2. Paleta oscura + centrado/distribución.
3. Sección “Examen físico” por sistema y región (digestivo: abdomen, hígado, bazo, vesícula…; renal; neuro; soma) con fragmentos verificados.
4. Rehacer dig-01 conciso; luego dig-02 (dolor abdominal / abdomen agudo).

## 8. Pedido original (resumen)
Plataforma completa por sistemas (digestivo, renal, neuro, maniobras, soma); cada capítulo: mapa inicial, bases, teoría visual, consulta/PDF, video Remotion con voz es-AR-TomasNeural, choice, desarrollos resueltos con “Lo sabía/No lo sabía” y repaso espaciado, mnemotecnias, integración. Un capítulo completo, probado y desplegado a la vez. No publicar material privado. Nunca atribuir al profesor frases que no dijo.

## 6b. Estado al cortar la sesión (2026-11-08)
- HECHO y publicado: paleta oscura; dig-01 reescrito conciso (sección “Lo que pregunta el profe” con P0/P1 y citas verificadas, 7 fichas con “¿Por qué?” del libro, 7 preguntas de examen, 12 choice, 5 tarjetas de memoria); narración nueva (10 escenas, 6:18) con escena hematemesis vs hemoptisis.
- HECHO en la sesión siguiente (2026-11-08, tarde):
  - Escenas `intro`, `complicaciones` y `cierre` rehechas sobre los cues nuevos (intro = los 4 temas que toma el profe; complicaciones con la tríada de Mallory-Weiss como cronología; cierre = lo que no puede faltar). Se borraron las escenas viejas sin uso (deglución, causas-oro, funcional, reflejo).
  - Video re-renderizado y vuelto a enlazar (`video` en `content/chapters/dig-01/index.tsx`).
  - **Diapositivas paso a paso** (estilo farrmaco) en `src/components/SlideDeck.tsx`: modo por defecto «Paso a paso» (cada oración = un paso; la escena queda congelada con el paso dibujado, texto debajo, puntos de progreso, Anterior/Siguiente, flechas del teclado, «Escuchar este paso») + modo «Reproducir» (de corrido, como antes). El fotograma congelado se toma antes de los fundidos (`Show` 12 f, fin de escena 12 f).
  - `scripts/interaction-test.mjs` actualizado (secciones obligatorias por id; prueba paso a paso y modo reproducir). Pasa completo en local.
- PENDIENTE:
  1. Sección **Examen físico** por sistema y región (digestivo: abdomen, hígado, bazo, vesícula; renal; neuro; soma) con fragmentos del video Argente verificados por fotogramas + pizarras + clases EF.
  2. Regenerar PDF (`npm run pdf`, con preview en 4791).
  3. Siguiente capítulo: dig-02 (dolor abdominal / abdomen agudo: 5 tipos P0, Cullen/Grey-Turner P0).

## 9. Bitácora
- 2026-11-07 — Inventario, arquitectura, Etapa 1 y dig-01 publicados y verificados.
- 2026-11-08 — Feedback de la usuaria (sección 2). Se crea este HANDOFF.
- 2026-11-08 (tarde) — Video dig-01 re-renderizado (6:18) y diapositivas paso a paso; verificado en la URL pública (check-video + interaction-test 14/14).
