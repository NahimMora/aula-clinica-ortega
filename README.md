# Aula Clínica — Semiología I

Entorno de estudio de **Semiología y Clínica Médica I** basado en las clases del Dr. Ortega: mapas conceptuales, teoría ilustrada, videos explicativos, preguntas choice, desarrollos resueltos con repaso espaciado, mnemotecnias, manual por sistema en PDF y una biblioteca de maniobras.

**Sitio:** https://nahimmora.github.io/aula-clinica-ortega/

## Cómo está hecho
- **Vite + React + TypeScript**, sitio estático en GitHub Pages (despliegue con GitHub Actions).
- Contenido médico tipado en `content/` (separado de los componentes de `src/`); cada capítulo se carga de forma diferida.
- Progreso en `localStorage` con exportación/importación JSON. Sin backend ni inicio de sesión.
- Videos producidos con **Remotion** + narración TTS (`es-AR-TomasNeural`) + FFmpeg. Las mismas escenas se ofrecen como **diapositivas interactivas** con `@remotion/player`, que se descarga solo al abrir una diapositiva.
- Producción de un capítulo: `npm run tts -- dig-01` (narración y sincronía) → `npm run video:render -- dig-01 video/out/dig-01-master.mp4` → FFmpeg para la versión web.
- PDFs generados desde la ruta imprimible `#/imprimir/<sistema>` con Chrome sin interfaz (`npm run pdf`).

## Material académico
El repositorio **no contiene** el libro, las grabaciones, las transcripciones ni las fotos de pizarra (viven en `sources/`, excluido por `.gitignore`). Se publica únicamente contenido didáctico original con referencias a las fuentes. El video de maniobras se reproduce por fragmentos desde su publicación original en YouTube.

## Desarrollo
```bash
npm install
npm run dev          # servidor local
npm run build        # typecheck + build
npm run smoke -- <url> <carpeta-capturas>   # test de humo con Chrome
```

Avance y trazabilidad: [`docs/progress/`](docs/progress/).
