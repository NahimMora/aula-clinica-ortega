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

## 4. Arquitectura (desde 2026-11-08, noche tarde: versión «mapas + fichas visuales» + motor animado)
- **Pedido vigente de la usuaria (2026-11-08):** la versión «por pasos» copiada de farmaco NO le gustó («copia literal, sin colores»). Quiere la versión anterior (mapa conceptual con flechas, fichas con más teoría, colores, diagramas interactivos) y de farmaco **solo la idea de las animaciones**. Todo muy visual, sin pantallas de texto plano; pensado para estudiar rápido y que quede. Hacer **todos los capítulos de digestivo** (como mínimo) y desplegar de a uno.
- Vite + React 18 + TypeScript, HashRouter, base `/aula-clinica-ortega/`. Deploy por GitHub Actions (`.github/workflows/deploy.yml`) en cada push a `main`.
- Página del capítulo (`src/pages/ChapterPage.tsx`): una sola página con navegación por secciones (Mapa · Lo que toma · Fichas · Video · Choice · Desarrollos · Memoria · Maniobras · Cierre). **Sin modos** (se quitaron «Recorrido/Teoría/Práctica»).
- `content/chapters/<id>/index.tsx` — tipo `Chapter` (`src/types.ts`): `map` (mapa conceptual), `theory` (fichas con bloques), `developments` (con `prio` P0/P1/P2 y `quote` textual del profe), `mcq`, `memory` (tarjeta de recuperación), `closing` (mapa final, imprescindibles, errores, conexiones, mini simulacro), `maneuvers`, `video`, `escenas`, `audioPasos`, `diagrams` (diagramas propios del capítulo, opcional).
- **Bloques visuales genéricos** (`src/visual/`): se describen con datos y sirven para todos los capítulos.
  - `tipos.ts` — `abdomen` (9 regiones, puntos McBurney/Murphy/Cullen/Grey-Turner…, recorrido del dolor), `organos` (aparato digestivo, Treitz, marca de lesión), `biliar` (vía biliar con cálculo/tumor/dilatación), `triad` (tríada/péntada con vértices extra), `scale` (escalas, glifos de Bristol), `calc` (calculadora de puntaje: Child-Pugh, Ranson…), `mnemo` (letras que se despliegan), `timeline`, `flow` (árbol), `cuadro` (comparativo con «tapar respuestas»).
  - `anatomia.tsx` — dibujos SVG compartidos (AbdomenFig, TractoFig, BiliarFig, BristolGlyph). Con `t` se animan por fotograma (video); sin `t`, con clases CSS (web).
  - `Visual.tsx` — componentes web. Estilos en `src/styles/visual.css`. Colores `--v-*` en `tokens.css` (también versión clara para imprimir).
- **Explicación animada** (idea de farmaco): bloque `{ t: 'anim', id }` dentro de una ficha → `src/components/Anim.tsx` recorre una escena de `content/chapters/<id>/escenas.ts` paso a paso (dibujo + narración + «Retené esto»), con «Modo clase» que avanza solo con la voz (`public/media/<id>/pasos/<escena>-<n>.mp3`, `audioPasos: true`). Motor: `src/escenas/tipos.ts` + `Lienzo.tsx` (cuadro, lista, tubo, flujo con partículas, paneles, abdomen, organos, biliar). Mismo dibujo en el video (`video/src/Root.tsx`).
- Choice: opciones mezcladas con permutación fija por pregunta (`src/lib/useChapter.ts`, también el mini simulacro).
- Se eliminaron: @remotion/player en la web (SlideDeck/SlidesBlock, `src/video/kit.tsx`), `slides.tsx`, `narration.json`, `timing.json`, la página «Teoría por pasos».
- `content/maneuvers/index.ts`, `content/sources.ts`, `content/traceability/<id>.md`, `src/lib/progress.ts` (localStorage `aula-clinica-ortega:v1`) igual que antes.

## 4b. Piloto «Aula Clínica 2.0» (solo dig-02, en evaluación)
- **No escalar a otros capítulos hasta que la usuaria evalúe el piloto.**
- Un capítulo lo activa con `estudio` (`src/types.ts`). Sin ese campo se sigue usando la página clásica; `StudyView` se carga diferido.
- `src/estudio/`: `tipos.ts` (bloques y plan), `StudyView.tsx` (pestañas, persistencia, modo repaso, ?t= y ?s=), `bloques.tsx` (render; `desde` reutiliza bloques de `theory`, `escena` reutiliza escenas de abdomen), `figuras.tsx`. Estilos aislados bajo `.estudio` en `src/styles/estudio.css`.
- Contenido: `content/chapters/dig-02/estudio.ts` organiza lo existente y agrega la fisiopatología (bloques `mecanismo`, `precision`). `theory`, choice, desarrollos y memoria siguen en `index.tsx`: manual, PDF, buscador y práctica no cambian.
- `ConceptMap` admite `seq` opcional (número por rama).
- Recursos y licencias: `content/traceability/dig-02.md`. Prueba: `node scripts/test-estudio.mjs <url> dig-02 <carpeta>`.

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

## 6. Estado (2026-11-08, digestivo y renal completos)
- **Digestivo completo: dig-01 a dig-15 publicados** y verificados uno por uno (interaction-test «Todas las verificaciones pasaron» + check:content) antes de cada push.
  - 01 vómitos/disfagia/dispepsia · 02 dolor abdominal y abdomen agudo · 03 diarrea, constipación, anorrectal · 04 ictericia · 05 examen físico digestivo · 06 síndrome esofágico · 07 ulceroso y gastritis · 08 pilórico e íleo · 09 malabsorción e intestino irritable · 10 peritonitis · 11 síndromes vesiculares · 12 hemorragias digestivas · 13 cirrosis e HTP · 14 insuficiencia hepática · 15 pancreatitis aguda.
- **Nefrourológico completo: ren-01 a ren-07 publicados** (mismo criterio de verificación).
  - 01 motivos de consulta (edema, obstrucción → IRA posrenal, poliuria, hematuria y tres vasos) · 02 examen físico y proteinuria · 03 nefrítico · 04 nefrótico · 05 insuficiencia renal aguda y crónica · 06 infección urinaria · 07 litiasis.
  - Kit visual nuevo: bloques/escenas `urinario` (riñones con pelvis y cálices, uréteres, vejiga, próstata, uretra; cálculo, tumor, hidronefrosis, globo vesical, HPB, tres vasos, irradiación del cólico, estrecheces) y `nefrona` (glomérulo y túbulos; partículas que se pierden: proteínas, hematíes, glucosa, agua; lesión e isquemia). Tokens `--v-kidney`, `--v-urine`, `--v-vessel`. Puntos `ureteral-sup` y `ureteral-med` en el abdomen.
  - Maniobras renales (grupo «Riñón», listo): Guyon (Argente 10958–11036) y puñopercusión (11037–11076) verificadas por fotogramas; Montenegro, Israel, Glenard y puntos renoureterales sin video.
- Cada capítulo: mapa, «Lo que toma» (P0/P1 con cita textual verificada en la transcripción), fichas visuales (bloques de `src/visual` + 1–3 explicaciones animadas `anim`), choice (8–12), desarrollos, memoria, maniobras, cierre con mini simulacro.
- Criterio de fuentes: lo que el profe marca define la prioridad; del libro, la fisiopatología y tablas (p. ej., Ranson p. 410). Escalas estándar que el libro no trae (Balthazar, West Haven, Forrest) se marcan en pantalla como «estándar». Si el profe se equivoca en un mecanismo, se explica el correcto **sin atribuirle** el error (p. ej., hipocalcemia de la pancreatitis = saponificación).
- dig-04 (ictericia): no hay clase grabada; el profe remite al apunte = libro p. 10–15.
- Maniobras: 17 en digestivo (abdomen, ascitis, puntos, hígado, bazo, vesícula) con fragmentos del video Argente verificados por fotogramas.
- Figura del abdomen: puntos nuevos `chauffard` (se dibuja como triángulo) y `desjardins`; las etiquetas de región van por encima de la flecha de recorrido.
- Videos: solo dig-01 tiene video y audio por paso (`audioPasos`). Para los demás falta `npm run tts -- <id>` + render; antes hay que agregar las variables `--v-*` nuevas en `VARS` de `video/src/Root.tsx` y el capítulo en `CAPS`.

## 7. Próximos pasos (en orden)
1. **Sistema nervioso** (capítulos en `content/curriculum.ts`; transcripciones en `sources/drive/transcripts/condensed/4 SISTEMA NERVIOSO`). Probablemente haga falta una figura propia (encéfalo/médula/vía motora) siguiendo el patrón de `urinario`/`nefrona`: figura en `anatomia.tsx` + tipo en `visual/tipos.ts` + bloque en `Visual.tsx` + escena en `escenas/tipos.ts` y `Lienzo.tsx` + casos en `text.ts` y `Blocks.tsx`.
2. Examen físico neurológico (maniobras con fragmentos de Argente verificados por fotogramas) y soma.
3. Audio por paso y video para dig-02…dig-15 (ver sección 6).
4. Regenerar PDF (`npm run pdf`, con preview en 4791).

## 8. Pedido original (resumen)
Plataforma completa por sistemas (digestivo, renal, neuro, maniobras, soma); cada capítulo: mapa inicial, bases, teoría visual, consulta/PDF, video Remotion con voz es-AR-TomasNeural, choice, desarrollos resueltos con «Lo sabía/No lo sabía» y repaso espaciado, mnemotecnias, integración. Un capítulo completo, probado y desplegado a la vez. No publicar material privado. Nunca atribuir al profesor frases que no dijo.

## 9. Bitácora
- 2026-11-07 — Inventario, arquitectura, Etapa 1 y dig-01 publicados y verificados.
- 2026-11-08 — Feedback de la usuaria (sección 2). Se crea este HANDOFF.
- 2026-11-08 (tarde) — Video dig-01 re-renderizado (6:18) y diapositivas paso a paso; verificado en la URL pública (check-video + interaction-test 14/14).
- 2026-11-08 (noche) — La versión «por pasos» no gustó: se volvió a la versión de mapas y fichas (revert de 8e99a0a/ed5745b) y se agregó lo mejor de farmaco: explicaciones animadas dentro de las fichas, bloques visuales genéricos, choice mezclado.
- 2026-11-08 (noche) — dig-02 a dig-15 publicados de a uno (cada uno con su commit y deploy). Digestivo completo. Siguiente: nefrourológico.
- 2026-11-08 (madrugada) — Kit `urinario` + `nefrona`; ren-01 a ren-07 publicados de a uno; 6 maniobras renales. Renal completo. Siguiente: nervioso.
