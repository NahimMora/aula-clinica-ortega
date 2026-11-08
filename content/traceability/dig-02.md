# dig-02: clase visual

## Jerarquía de fuentes
1. **Clases de Ortega** (MC Digestivo 2, 3, 4; Examen físico 1): deciden qué se estudia, el orden y lo que se evalúa.
2. **Libro de Clínica Médica de Ortega** (p. 2–3, 86, 360, 377, 409): aclaraciones.
3. **Argente-Álvarez** (cap. 39-4, p. 650–651; cap. 42-4, p. 696–697): solo los mecanismos que la clase no explica.
4. **Preguntero** (P6–P15 de «MC náuseas, vómitos y dolor abdominal»): avisos de examen y desarrollos.

## Lo que se tomó del Argente-Álvarez
| Página | Dato | Dónde se usa |
|---|---|---|
| 650 | Receptores en pared muscular y cápsula; estímulos; entrada medular bilateral | Fisiopatología: dolor visceral, por qué se localiza |
| 650 | Peritoneo parietal: nervios espinales D7–L1; estímulo bacteriano o químico; espasmo reflejo | Fisiopatología: dolor somático, contractura |
| 650 | Apendicitis: dolor visceral → transmural → parietal | Fisiopatología: apendicitis |
| 650 | Dolor referido: convergencia en asta dorsal, proyección a la piel | Fisiopatología: referido |
| 651 | Contaminación según sitio de perforación; peritonitis terciaria | Fisiopatología, Perforativo |
| 697 | Lucha, resistencia elástica, dolor continuo | Fisiopatología: obstáculo |

## Avisos de examen
- **❗ Dr. Ortega**: solo si lo dice como pregunta de examen o lo marca como lo que no debe olvidarse: cinco quirúrgicos (mc-dig-3 17:02), Jobert (mc-dig-4 05:09), matidez (12:24), perforativo vs hemorrágico (25:28).
- **❗ Preguntero**: el resto de los temas evaluables. Las citas son textuales y llevan su minuto.

## Discrepancias aclaradas sin atribuir errores
- **Apendicitis inicial:** en clase se la llama dolor referido; Argente la describe como visceral percibido en epigastrio. Aclarado en la diapositiva.
- **Dolor al hombro:** se enseña con colecistitis e irritación diafragmática; el cólico renal irradia a ingle y genitales.
- **Peritonitis terciaria:** en clase se vincula a causas iatrogénicas o traumáticas; se usa la definición de Argente p. 651 y se aclara la diferencia.
- **Agudo:** el libro define dolor agudo en general hasta 4 semanas; para abdomen agudo se usa 7 días (clase y Argente p. 650).
- **Sangre en retroperitoneo:** la clase simplifica que toda la sangre va al retroperitoneo; las diapositivas dicen «si llega».
- Se omitió un fragmento de transcripción ininteligible sobre el paciente agitado (mc-dig-4 21:24).

## Choice y desarrollos
Los 10 desarrollos son las preguntas P6–P15 del preguntero. Las choice se elaboraron para practicar y así se identifican en pantalla.
Casos del simulacro: c3 y c4 contados en clase (mc-dig-3 10:15–11:36, 25:18; mc-dig-4 10:18–11:43). c1, c2 y c5 armados para practicar.

## Video completo
- Voz: **es-AR-TomasNeural** (`scripts/tts-clase.mjs`, falla si no puede usarla).
- Producción: `npm run tts:clase -- dig-02`, luego Remotion con la composición `dig-02-clase`, sin audio, y unión con `sources/tts-cache/dig-02/clase/narracion.wav`.
- Mismas diapositivas (`src/clase/Diapositiva.tsx`) que la web. `soloWeb` y `soloDiapo` son lo que queda solo para estudiar.

## Videos previos
| Recurso | Origen | Uso |
|---|---|---|
| `media/dig-02/repaso-abdomen-agudo.mp4` (5:29) | Repaso propio ya generado | Pestaña Video, como repaso |
| `media/dig-02/clips/*.mp4` | Cortes del video propio de digestivo | Se conservan; esta versión no los usa |
| Maniobras (YouTube, por fragmentos) | `content/maneuvers`, verificados por fotogramas | Pestaña Maniobras |

## Imágenes
| Archivo | Autor | Licencia | Fuente | Cambios |
|---|---|---|---|---|
| `img/rx-neumoperitoneo.jpg` | Bill Rhodes | CC BY 2.0 | Wikimedia Commons, «Pneumoperitoneum chest X-ray.jpg» | Recorte |
| `img/rx-obstruccion.jpg` | James Heilman, MD | CC BY-SA 3.0 | Wikimedia Commons, «Upright X-ray demonstrating small bowel obstruction.jpg» | Recorte para quitar texto sobreimpreso |
| `img/signo-cullen.jpg` | Herbert L. Fred, MD y Hendrik A. van Dijk | CC BY 2.0 | Wikimedia Commons, «Cullen's sign.jpg» | Recorte del borde |
| `img/signo-grey-turner.jpg` | Herbert L. Fred, MD y Hendrik A. van Dijk | CC BY 2.0 | Wikimedia Commons, «Hemorrhagic pancreatitis - Grey Turner's sign.jpg» | Recorte del borde |
| `img/apendice-blausen.jpg` | Blausen.com staff (2014) | CC BY 4.0 | Wikimedia Commons | Se conserva; esta versión no la usa |

Descartada: «Chest X-ray showing presence of free air under left diaphragm.png» (dimensiones típicas de imagen generada por IA; no se pudo confirmar que sea una radiografía real).

Prueba: `node scripts/test-clase.mjs <url> dig-02 <carpeta>`.
