# STATUS — Avance real

_Última actualización: 2026-11-07_

## Publicado
| Capítulo | Estado | Contenido | Verificación |
|---|---|---|---|
| Etapa 1 · estructura | Desplegado y verificado | Inicio, sistemas, búsqueda, práctica, examen, repasar, progreso, manual, maniobras | Workflow OK, URL 200, test de humo escritorio/móvil |
| dig-01 · Disfagia, dispepsia, náuseas y vómitos | **Desplegado y verificado en la URL pública** | 4 bases + 11 bloques de teoría, 13 diagramas, 11 diapositivas animadas, video 8:37, 28 choice + 6 de simulacro, 10 desarrollos, 8 tarjetas de memoria, 3 maniobras, 3 fichas de consulta, PDF del sistema (59 p.) | Local y en GitHub Pages: workflow OK, test de humo 20/20 (escritorio y móvil), test de interacción 12/12, video 1920×1080 con 121 subtítulos, PDF y audios accesibles |

## Hecho
- **Inventario**: Drive “Videos_Ortega” listado (121 archivos). Transcripciones de Drive verificadas idénticas a las locales (60/60). Libro descargado (mismo contenido que la copia local). Manifiesto con duraciones reales: 65 fuentes, 31 h de clase.
- **dig-01**: redactado desde MC Digestivo 1 y 2 con el minuto exacto de cada dato (matriz en `content/traceability/dig-01.md`). Las diferencias con la bibliografía actual se señalan (Roma IV, OCA con amoxicilina, pruebas no invasivas de *H. pylori*, mecanismo renal de la hipopotasemia, vómito bilioso y píloro).
- **Video y diapositivas**: escenas animadas con Remotion 4.0.541 (mismo código para el video y las diapositivas), narración `es-AR-TomasNeural` (edge-tts) sincronizada por oración, subtítulos WebVTT (121 cues), capítulos internos y guion completo. A pedido de la usuaria, las escenas también funcionan como **diapositivas interactivas** dentro de la teoría (`@remotion/player`, que se descarga solo al abrir una diapositiva).
- **Maniobras**: 3 fragmentos verificados contra fotogramas reales del video Argente (boca/orofaringe 50:08–51:30, supraclaviculares 32:16–33:02, bazuqueo 2:39:54–2:40:44).

## Problemas encontrados y resueltos
- Reproductor de maniobras: si la página se re-renderizaba mientras YouTube inicializaba, se llamaba a `loadVideoById` antes de `onReady` y la página quedaba en blanco. Corregido (comandos solo tras `onReady`, lista memoizada) y se agregaron *error boundaries* por sección.
- Desbordes horizontales en móvil (grillas con `1fr` y árbol de algoritmos con `max-content`): corregidos.
- Puerto 4173 ocupado por otra aplicación del equipo: la vista previa local usa 4791.

## Pendiente inmediato
- dig-02 · Dolor abdominal y abdomen agudo (MC Digestivo 2 desde 32:03, 3 y 4).

## Decisiones
- El video de maniobras es material editorial de terceros en YouTube: se usa el reproductor incrustado con inicio/fin, sin recortes publicados.
- Las fotos de pizarra no se publican (una muestra a una persona); sus esquemas se recrean como SVG.
- El reproductor de Remotion en la web pesa ~136 kB gzip: se descarga solo al tocar una diapositiva; la carga inicial del sitio sigue en ~65 kB gzip.
