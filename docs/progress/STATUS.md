# STATUS — Avance real

_Última actualización: 2026-11-07_

## Hecho
- **Inventario**: Drive “Videos_Ortega” listado en modo lectura (121 archivos: 60 videos, 60 transcripciones .md, 1 libro). Los videos ya estaban en la caché local del equipo (6,5 GB) y se enlazan sin duplicar. Transcripciones descargadas de Drive y verificadas idénticas a las locales (60/60). Libro descargado de Drive (65 MB; mismo contenido que la copia local de 22 MB).
- **Fuentes locales**: video de maniobras Argente-Álvarez (4 h 02 min, YouTube `EC9tSepFn_U`, embebible), SRT y transcripciones con/sin tiempos; 24 fotos de pizarra (respiratorio, cardiovascular, hígado/bazo/vesícula, motilidad, pares craneales, soma, signos meníngeos). Reorganizados en `sources/local/`.
- **Análisis**: MC digestivo (6 clases) leído completo; libro indexado por apunte (68 apuntes). Hallazgo: el libro no tiene el apunte de MC digestivos → la fuente principal de dig-01..03 son las clases.
- **Arquitectura y diseño**: app Vite + React + TS con carga diferida, contenido tipado separado de la presentación, progreso local con exportación/importación JSON, repaso espaciado (Leitner), búsqueda, modos teoría/práctica/examen, manual web, ruta imprimible para PDF, biblioteca de maniobras con reproductor de fragmentos de YouTube.

## En curso
- Primer despliegue en GitHub Pages (estructura inicial, capítulos como “Próximamente”).

## Pendiente inmediato
- dig-01 completo (teoría, diagramas, video Remotion con narración es-AR-TomasNeural, choice, desarrollos, mnemotecnias, integración, PDF).

## Problemas / decisiones
- El video de maniobras es material editorial de terceros subido a YouTube: se usa el reproductor incrustado con inicio/fin, no se publican recortes.
- Las fotos de pizarra no se publican (una muestra a una persona); sus esquemas se recrean como SVG originales.
- Las transcripciones automáticas tienen errores de reconocimiento: cada dato se contrasta con el libro y, si hace falta, con bibliografía actual (señalado como tal).
