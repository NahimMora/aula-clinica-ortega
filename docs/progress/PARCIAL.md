# Parcial del lunes 16/11 — módulo «Parcial del lunes»

> Pedido del 2026-11-11: recortar el temario a lo que Ortega confirmó en el repaso del 11/11, **sin reducir la profundidad**, en una sección independiente que reutiliza la web (capítulos originales intactos). Rutas: `/parcial`, `/parcial/<digestivo|renal|neuro|soma>?t=<tema>`, `/parcial/maniobras?s=…`, `/parcial/preguntas?s=…&q=<id>`.

## Fuentes y cómo se leyeron
- **Audio del repaso** (`nuevo material/Hoyyy semio.m4a`, 75 min, fuera de Git). La transcripción entregada (`Hoyyy semio.md`) tiene muchos errores. Se re-transcribieron los tramos clave con **faster-whisper large-v3-turbo** (CPU, int8, beam 5, `hotwords` médicos, VAD) sobre audio **normalizado** (`highpass=80, dynaudnorm`): 0–6:30, 6:30–12:30, 29:30–35:00, 35:00–58:20 y 1:03:00–1:15:10. Sin normalizar, el tramo 35–44 salía vacío (solo «.»). El resto (12:30–29:30, 58:00–1:03:00) se leyó de la transcripción original, que ahí es aceptable.
- **Pizarras del repaso** (PDF de WhatsApp, 5 fotos): digestivo (Disfagia · Dolor abd + AA · Ictericia · Hemorragia digestiva · Cirrosis e HTP · Peritonitis · Úlcera péptica-Gastritis · Ex), renal (Sd nefrótico, nefrítico, IRA [RIFLE/AKIN, Pre/Renal/Post] – ERC [KDIGO: FG > 120; G1 > 90 · G2 60–90 · G3a 45–60 · G3b 30–45 · G4 15–30 · G5 < 15 → HD], AEIOU con valores; Definición · Clasificación · Etiologías · Clínica), SN (Cefalea · Estado de conciencia [15 · 13–14 · 11–12 · 9–10 · < 8] · Ex: Sd piramidal, extrapiramidal, HTE, meníngeo, cerebeloso) y SOMA (columna cervical/dorsal/lumbar/sacro, MMSS, MMII; encerrados: Spurling, tenista-golfista, Tinel, túnel carpiano, Phalen, cajón, bostezo, Apley).
- **Foto.pdf** (22 fotos en alta resolución de las pizarras de neurología): motilidad (activa/pasiva), **tabla de síndromes motores**, sensibilidad y gnosia, pares I–XII. Se transcribieron al módulo.
- «Faensle» de la pizarra de SOMA = **Phalen** (la clase «Meníngeo y osteo», 43:04: «con la muñeca, tres maniobras: túnel carpiano… Phalen»). **Finkelstein no aparece** en el material de Ortega.
- «Wemes» = maniobra bimanual de **Güemes** (hígado), ya en la pizarra de examen físico digestivo y en dig-05.

## Temario confirmado (prioridad)
- **Digestivo**: Ictericia (crítico) · Abdomen agudo, los 5 tipos (crítico) · Examen físico y puntos dolorosos (crítico) · Dolor abdominal · Hemorragia digestiva e hipovolemia · Cirrosis e HTP · Peritonitis · Úlcera y gastritis · Pancreatitis (confirmada de palabra, no está en la pizarra) · Disfagia.
- **Renal**: Nefrótico (crítico: «pregunta que voy a hacer en el examen» sobre complicaciones) · IRA (crítico) · ERC + AEIOU (crítico) · Nefrítico · Funciones normales del riñón · Examen físico renal.
- **Neurología**: Pares craneales (crítico) · Estado de conciencia y Glasgow (crítico) · Cefalea (único motivo de consulta) · Motilidad y piramidal · Extrapiramidal · Cerebeloso · HTE · Meníngeo · Sensibilidad/praxia/gnosia/lenguaje (complementario; dijo que preguntó apraxia ideomotora e ideacional).
- **SOMA**: Columna · Miembro superior (crítico: «el círculo azul es lo que voy a preguntar») · Miembro inferior.

## Excluidos
Digestivo: vómitos, dispepsia, diarrea/constipación/anorrectal, pilórico e íleo, malabsorción e intestino irritable, insuficiencia hepática como tema propio. Renal: ITU, litiasis, motivos de consulta como tema propio. Neuro: otros motivos de consulta (deterioro cognitivo, vértigo, movimientos involuntarios, debilidad, convulsiones, sueño). SOMA: teoría de enfermedades.

## Correcciones que salieron de re-escuchar el audio
- 1:06:59 no es «par afectado en la HTE» sino **«¿cuál es el par craneal afectado en el síndrome piramidal?» → VII** (parálisis facial central).
- 46:01: lo que preguntó de la úlcera fue la **causa más frecuente** (H. pylori, «ante la duda, siempre es esta»), no la complicación.
- 45:40: **Forrest es de la úlcera, no clasifica la hemorragia digestiva**: «no se metan ahí».
- 31:35: complicación más severa del nefrítico según Ortega: **IRA** (por la oliguria).
- 54:34: marcador de laboratorio por tipo de ictericia (LDH · GOT/GPT · FAL, GGT, 5′-nucleotidasa).
- 38:33: puntos izquierdos «dos solamente: Monro y Lian».

## Partes del audio que no se pudieron interpretar con certeza
- 39:35: «puntos costovertebral y costomuscular, lo cual no le pregunto(é)» — no se sabe si dice que no los pregunta. Se dejan en el módulo con el aviso.
- 1:09:56: preguntó una **afasia** («apasia de …»): no se entiende cuál (se cubren Broca y Wernicke).
- 59:59–1:00:30: nombres de los rangos 13–14 (somnolencia) y 11–12 (obnubilación) de Glasgow, reconstruidos.
- 43:00–43:56: «esos tres… si ponen … los voy a matar» (sobre dolor abdominal / abdomen agudo); 1:08:00 «generalmente los motores de los tres: VI, IV y III» (contexto incierto).
- 17:14–17:43 (ERC, riesgo por estadio), 33:19 («no lo voy a preguntar en …»), 34:00–34:53 (qué fórmula de filtrado nombra: se cita MDRD/CKD-EPI/Cockcroft-Gault sin atribuir).

## Preguntas
Comparadas por concepto con `content/examen/citas.json` (avisos de Ortega y preguntero) y `orales.ts` (oral del 10/11: 15 preguntas de teórico y 4 de práctico, las 19 reunidas en el banco; se interpretó que son «las diez preguntas orales» del pedido). `une` guarda qué preguntas existentes reúne cada una. Las de Ortega que el banco no reúne son solo de temas excluidos (`npm run check:parcial -- --informe`).

## Maniobras nuevas en la biblioteca (libro de Ortega p. 57–59, sin fragmento de video)
Valsalva cervical, Naffziger-Jones, Adson, Schober, Bragard, Lasègue invertido, Volkmann, Erichsen, Gaenslen y la percusión del túnel carpiano (como la enseña Ortega). Puntos dolorosos para el maniquí: `content/parcial/puntos.ts` (libro p. 360–362).

## Archivos
- Datos: `content/parcial/{tipos,temario,preguntas,preguntas-neuro,pares,puntos,maniobras}.ts`.
- Página: `src/pages/ParcialPage.tsx`; componentes `src/parcial/{MiniVisor,PreguntaCard,Maniqui,ParesTabla,marcas}`; estilos `src/styles/parcial.css`.
- El visor del tema (`MiniVisor`) arma un mazo con diapositivas de varios capítulos sin copiarlas.
- Aviso en los capítulos originales: `ClaseView` muestra «Entra en el parcial del lunes» con el enlace al tema.
- Marcas «La sé / Dudé / Tengo que repasarla»: `localStorage` (`aula-clinica-ortega:parcial:marcas`).
- Verificación: `npm run check:parcial` (ids de diapositivas, maniobras, temas, relaciones, duplicados) y `node scripts/test-parcial.mjs <url> <carpeta>` (149 verificaciones en escritorio y celular).

## Matriz de cobertura (generada con `npm run check:parcial -- --matriz`)
| Sistema | Tema | Prioridad | Repaso 11/11 (min) | Otras fuentes | Capítulos | Diapos | Maniobras | Preguntas |
|---|---|---|---|---|---|---|---|---|
| digestivo | Ictericia | critico | 00:36, 42:53, 54:34, 55:44 | pizarra repaso | dig-04, dig-11 | 24 | 4 | 6 (5 reales) |
| digestivo | Abdomen agudo: los cinco tipos | critico | 40:00, 41:04, 42:10, 43:24 | pizarra repaso | dig-02, dig-10 | 36 | 6 | 5 (5 reales) |
| digestivo | Dolor abdominal | obligatorio | 43:24 | pizarra repaso | dig-02 | 16 | 2 | 1 (1 reales) |
| digestivo | Hemorragia digestiva e hipovolemia | obligatorio | 44:05, 44:44, 45:02 | pizarra repaso, oral 10/11 | dig-12 | 22 | 1 | 2 (2 reales) |
| digestivo | Cirrosis e hipertensión portal | obligatorio | 47:37, 31:35 | pizarra repaso, cirr-2 | dig-13, dig-14 | 31 | 8 | 6 (5 reales) |
| digestivo | Peritonitis | obligatorio | 46:55 | pizarra repaso, perit-1 | dig-10 | 19 | 4 | 1 (1 reales) |
| digestivo | Úlcera péptica y gastritis | obligatorio | 45:40, 46:01, 46:30 | pizarra repaso, oral 10/11 | dig-07 | 17 | 2 | 4 (4 reales) |
| digestivo | Pancreatitis aguda | obligatorio | 51:59, 53:20 | pa-1 | dig-15 | 16 | 1 | 3 (2 reales) |
| digestivo | Disfagia | obligatorio | — | pizarra repaso | dig-01, dig-06 | 16 | 2 | 1 (1 reales) |
| digestivo | Examen físico digestivo y puntos dolorosos | critico | 37:31, 37:59, 38:30 | oral 10/11, ef-dig-2 | dig-05 | 17 | 11 | 4 (4 reales) |
| renal | Funciones normales del riñón (la base de la clínica) | obligatorio | 23:25, 24:31, 25:25, 27:27, 28:23, 29:00, 33:43 |  | ren-05 | 5 | 0 | 1 (1 reales) |
| renal | Síndrome nefrótico | critico | 11:52, 13:13, 29:20, 30:42, 32:36 | pizarra repaso, oral 10/11 | ren-04 | 12 | 2 | 5 (5 reales) |
| renal | Síndrome nefrítico | obligatorio | 08:07, 09:23, 11:31, 13:13, 31:35 | pizarra repaso, oral 10/11 | ren-03 | 11 | 2 | 2 (2 reales) |
| renal | Insuficiencia (lesión) renal aguda | critico | 14:57, 21:13, 21:25 | pizarra repaso, ir-1 | ren-05 | 11 | 2 | 3 (2 reales) |
| renal | Enfermedad renal crónica e indicaciones de diálisis | critico | 15:15, 15:56, 17:53, 18:35, 19:00, 20:16 | pizarra repaso | ren-05 | 8 | 0 | 3 (3 reales) |
| renal | Examen físico renal y puntos dolorosos | obligatorio | 37:41 | oral 10/11, ef-ren | ren-02 | 5 | 6 | 1 (1 reales) |
| neuro | Pares craneales I a XII | critico | 01:03:30, 01:03:55, 01:07:17, 01:08:07 | oral 10/11, pc-3, pc-5 | neu-03, neu-04 | 32 | 12 | 9 (9 reales) |
| neuro | Estado de conciencia y escala de Glasgow | critico | 58:07, 58:45, 59:03, 01:00:01, 01:02:02, 01:02:36 | pizarra repaso, oral 10/11 | neu-01 | 2 | 0 | 2 (2 reales) |
| neuro | Cefalea | obligatorio | 01:13:20 | pizarra repaso | neu-01 | 15 | 0 | 1 (1 reales) |
| neuro | Motilidad y síndrome piramidal | obligatorio | 01:06:42, 01:06:53, 01:09:17 | pizarra repaso, oral 10/11 | neu-05, neu-02 | 16 | 5 | 3 (3 reales) |
| neuro | Sensibilidad, praxia, gnosia y lenguaje | complementario | 01:09:50, 01:09:56 | pizarra, pc-1 | neu-06 | 1 | 2 | 1 (1 reales) |
| neuro | Síndrome extrapiramidal (Parkinson) | obligatorio | — | pizarra repaso, oral 10/11 | neu-05 | 8 | 1 | 1 (1 reales) |
| neuro | Síndrome cerebeloso | obligatorio | 01:11:32, 01:11:54, 01:12:03, 01:12:42 | pizarra repaso | neu-05 | 6 | 4 | 1 (1 reales) |
| neuro | Hipertensión endocraneana | obligatorio | — | pizarra repaso, oral 10/11 | neu-06 | 10 | 2 | 1 (1 reales) |
| neuro | Síndrome meníngeo | obligatorio | 01:14:32, 01:14:49 | pizarra repaso, sn-6, neu-rec-1026 | neu-06 | 6 | 2 | 1 (1 reales) |
| soma | Columna: cervical, dorsal, lumbar y sacroilíaca | obligatorio | 03:54, 04:22 | oral 10/11, pizarra | soma-01 | 0 | 15 | 3 (1 reales) |
| soma | Miembro superior: hombro, codo y muñeca | critico | 04:38 | meningeo-osteo, pizarra | soma-01 | 0 | 6 | 2 (2 reales) |
| soma | Miembro inferior: cadera, rodilla y tobillo | obligatorio | 04:38 | meningeo-osteo, pizarra | soma-01 | 0 | 8 | 1 (1 reales) |
