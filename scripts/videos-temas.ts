// Arma el video de cada tema del parcial como una lista de tramos de los videos que ya existen:
// las clases narradas de los capítulos (public/media/<cap>/clase.mp4) y el de las diapositivas propias
// del parcial (public/media/parcial/diapos.mp4). Orden: el de las pestañas del tema (fisiopatología aparte
// primero, salvo los temas con la fisiopatología junto a la teoría).
// Uso: npm run videos:temas  →  content/parcial/videos-temas.json
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { TEMAS } from '../content/parcial/temario';

interface Tiempos {
  fps: number;
  diapos: { mazo: string; id: string; inicio: number; frames: number }[];
}
interface Guion {
  script: { title: string }[];
}
interface Segmento {
  src: string;
  vtt?: string;
  poster?: string;
  ini: number;
  fin: number;
  titulo: string;
}

const cache = new Map<string, { t: Tiempos; g: Guion; base: string } | null>();
function videoDe(cap: string) {
  if (!cache.has(cap)) {
    const dir = cap === 'parcial' ? 'content/parcial' : `content/chapters/${cap}`;
    const base = cap === 'parcial' ? 'diapos' : 'clase';
    const ft = `${dir}/${base}-tiempos.json`;
    const fg = `${dir}/${base}-video.json`;
    const media = `public/media/${cap}/${base}.mp4`;
    cache.set(cap, existsSync(ft) && existsSync(fg) && existsSync(media) ? { t: JSON.parse(readFileSync(ft, 'utf8')), g: JSON.parse(readFileSync(fg, 'utf8')), base } : null);
  }
  return cache.get(cap)!;
}

const salida: Record<string, { total: number; segmentos: Segmento[] }> = {};
const faltan: string[] = [];
for (const t of TEMAS) {
  const orden: { cap: string; id: string }[] = [];
  const todos = t.diapos.flatMap((d) => d.ids.map((id) => ({ cap: d.cap, id })));
  if (t.fisioJunto) orden.push(...todos);
  else orden.push(...todos.filter((x) => x.id.startsWith('f-')), ...todos.filter((x) => !x.id.startsWith('f-')));
  const segs: Segmento[] = [];
  for (const { cap, id } of orden) {
    const v = videoDe(cap);
    const k = v ? v.t.diapos.findIndex((x) => x.id === id) : -1;
    if (!v || k < 0) {
      faltan.push(`${t.id}: ${cap}:${id}`);
      continue;
    }
    const d = v.t.diapos[k];
    const seg: Segmento = {
      src: `media/${cap}/${v.base}.mp4`,
      vtt: `media/${cap}/${v.base}.vtt`,
      poster: `media/${cap}/${v.base}.jpg`,
      ini: +(d.inicio / v.t.fps).toFixed(3),
      fin: +((d.inicio + d.frames) / v.t.fps).toFixed(3),
      titulo: v.g.script[k]?.title ?? id,
    };
    segs.push(seg);
  }
  if (!segs.length) continue;
  const total = segs.reduce((a, s) => a + (s.fin - s.ini), 0);
  salida[t.id] = { total: +total.toFixed(2), segmentos: segs };
}
writeFileSync('content/parcial/videos-temas.json', JSON.stringify(salida, null, 1));
const min = (x: number) => `${Math.floor(x / 60)}:${String(Math.round(x % 60)).padStart(2, '0')}`;
for (const [id, v] of Object.entries(salida)) console.log(`${id.padEnd(22)} ${min(v.total).padStart(6)} · ${v.segmentos.length} partes`);
console.log(`\n${Object.keys(salida).length} temas con video · ${faltan.length} diapositivas sin tramo de video (solo web o sin video):`);
for (const f of faltan) console.log('  ', f);
