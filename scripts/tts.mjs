// Narración TTS paso a paso a partir de las escenas del capítulo (content/chapters/<id>/escenas.ts).
// Uso (desde la raíz): node scripts/tts.mjs dig-01
// Salidas:
//   public/media/<id>/pasos/<escena>-<n>.mp3   → audio de cada paso («Escuchar este paso» y video)
//   content/chapters/<id>/tiempos.json         → fotogramas de cada paso para el video
//   public/media/<id>.vtt                      → subtítulos del video
//   content/chapters/<id>/video.json           → duración, temas y guion para la web
//   sources/tts-cache/<id>/                    → .srt y hashes (no se publican)
// Si el texto de un paso no cambió, no se vuelve a sintetizar.
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const FPS = 30;
const VOICE = 'es-AR-TomasNeural';
const RATE = '-4%';
const LEAD = 8; // fotogramas de silencio antes de la voz
const TAIL = 18; // fotogramas después de la voz
export const PORTADA = 96; // fotogramas de la portada
export const CIERRE = 150; // fotogramas del cierre

const id = process.argv[2];
if (!id) throw new Error('Falta el id del capítulo');
const chDir = join('content', 'chapters', id);
const tmp = join('sources', 'tts-cache', id, 'escenas.mjs');
mkdirSync(join('sources', 'tts-cache', id), { recursive: true });
await build({ entryPoints: [join(chDir, 'escenas.ts')], bundle: true, format: 'esm', platform: 'node', outfile: tmp, logLevel: 'error' });
const { escenas } = await import(pathToFileURL(resolve(tmp)).href + `?v=${Date.now()}`);

const audioDir = join('public', 'media', id, 'pasos');
const cacheDir = join('sources', 'tts-cache', id);
mkdirSync(audioDir, { recursive: true });

const srtTime = (s) => {
  const [h, m, rest] = s.split(':');
  const [sec, ms] = rest.split(',');
  return Number(h) * 3600 + Number(m) * 60 + Number(sec) + Number(ms) / 1000;
};
const parseSrt = (txt) =>
  txt
    .replace(/\r/g, '')
    .split(/\n\n+/)
    .map((b) => b.split('\n'))
    .filter((l) => l.length >= 3)
    .map((l) => {
      const [a, b] = l[1].split(' --> ');
      return { start: srtTime(a), end: srtTime(b), text: l.slice(2).join(' ').trim() };
    });
const probe = (f) => Number(spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], { encoding: 'utf8' }).stdout.trim());
const vttTime = (t) => {
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = (t % 60).toFixed(3).padStart(6, '0');
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${s}`;
};

/** Reparte el texto visible (di) en subtítulos de ≤ 84 caracteres, con tiempos proporcionales a la voz. */
function subtitulos(di, dur, srt) {
  const partes = [];
  let cur = '';
  for (const w of di.split(/\s+/)) {
    if ((cur + ' ' + w).trim().length > 84 && cur) {
      partes.push(cur.trim());
      cur = w;
    } else cur = (cur + ' ' + w).trim();
  }
  if (cur) partes.push(cur.trim());
  const ini = srt.length ? srt[0].start : 0;
  const fin = srt.length ? srt[srt.length - 1].end : dur;
  const total = partes.reduce((s, p) => s + p.length, 0);
  let t = ini;
  return partes.map((p) => {
    const d = ((fin - ini) * p.length) / total;
    const c = { start: t, end: t + d, text: p };
    t += d;
    return c;
  });
}

const usados = new Set();
const beats = [];
let cursor = PORTADA;
for (const [ei, e] of escenas.entries()) {
  for (const [pi, p] of e.pasos.entries()) {
    const say = p.voz ?? p.di;
    const name = `${e.id}-${pi + 1}`;
    usados.add(`${name}.mp3`);
    const mp3 = join(audioDir, `${name}.mp3`);
    const srt = join(cacheDir, `${name}.srt`);
    const stamp = join(cacheDir, `${name}.hash`);
    const hash = createHash('sha1').update(VOICE + RATE + say).digest('hex').slice(0, 12);
    const fresh = existsSync(mp3) && existsSync(srt) && existsSync(stamp) && readFileSync(stamp, 'utf8') === hash;
    if (!fresh) {
      process.stdout.write(`TTS ${name}… `);
      let ok = false;
      for (let a = 0; a < 4 && !ok; a++) {
        const r = spawnSync('edge-tts', ['--voice', VOICE, `--rate=${RATE}`, '--text', say, '--write-media', mp3, '--write-subtitles', srt], { encoding: 'utf8' });
        ok = r.status === 0 && existsSync(mp3) && probe(mp3) > 0.5;
        if (!ok) console.log('reintento', r.stderr?.slice(0, 160));
      }
      if (!ok) throw new Error(`No se pudo sintetizar ${name}`);
      writeFileSync(stamp, hash);
      console.log('ok');
    }
    const dur = probe(mp3);
    const frames = LEAD + Math.ceil(dur * FPS) + TAIL;
    const cues = subtitulos(p.di, dur, parseSrt(readFileSync(srt, 'utf8'))).map((c) => [LEAD + Math.round(c.start * FPS), LEAD + Math.round(c.end * FPS), c.text]);
    beats.push({ escena: ei, paso: pi, archivo: `media/${id}/pasos/${name}.mp3`, inicio: cursor, frames, lead: LEAD, cues, retener: p.retener ?? [] });
    cursor += frames;
  }
}
// Audios de pasos que ya no existen.
for (const f of readdirSync(audioDir)) if (!usados.has(f)) rmSync(join(audioDir, f));

const total = cursor + CIERRE;
writeFileSync(join(chDir, 'tiempos.json'), JSON.stringify({ fps: FPS, total, portada: PORTADA, cierre: CIERRE, beats }, null, 1));

let vtt = 'WEBVTT\n\n';
let n = 1;
for (const b of beats) {
  for (const [a, z, text] of b.cues) {
    vtt += `${n++}\n${vttTime((b.inicio + a) / FPS)} --> ${vttTime(Math.min(b.inicio + z, b.inicio + b.frames) / FPS)}\n${text}\n\n`;
  }
}
writeFileSync(join('public', 'media', `${id}.vtt`), vtt);

const secs = total / FPS;
const meta = {
  src: `media/${id}.mp4`,
  poster: `media/${id}-poster.jpg`,
  vtt: `media/${id}.vtt`,
  duration: `${Math.floor(secs / 60)}:${String(Math.round(secs % 60)).padStart(2, '0')} min`,
  chapters: escenas.map((e, ei) => ({ t: Math.floor(beats.find((b) => b.escena === ei).inicio / FPS), label: e.titulo })),
  script: escenas.map((e) => ({ title: e.titulo, text: e.pasos.map((p) => p.di).join(' ') })),
};
writeFileSync(join(chDir, 'video.json'), JSON.stringify(meta, null, 2));
console.log(`Total: ${total} fotogramas (${meta.duration}) · ${beats.length} pasos · ${n - 1} subtítulos`);
