// Genera la narración TTS de un capítulo escena por escena y los datos de sincronización.
// Uso (desde la raíz): node scripts/tts.mjs dig-01
// Entrada:  content/chapters/<id>/narration.json
// Salidas:
//   public/media/<id>/audio/NN-escena.mp3     → narración (video y diapositivas con narración)
//   content/chapters/<id>/timing.json          → frames por escena y tiempo de cada oración
//   public/media/<id>.vtt                      → subtítulos sincronizados del video
//   content/chapters/<id>/video.json           → duración, capítulos y guion para la web
//   sources/tts-cache/<id>/                    → .srt y hashes (no se publican)
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const FPS = 30;
const LEAD = 12; // frames de silencio antes de la voz
const TAIL = 24; // frames después de la voz
const id = process.argv[2];
if (!id) throw new Error('Falta el id del capítulo');
const chDir = join('content', 'chapters', id);
const script = JSON.parse(readFileSync(join(chDir, 'narration.json'), 'utf8'));
// Pronunciaciones fonéticas → texto correcto en los subtítulos.
const FIX = [
  ['Málori Uáis', 'Mallory-Weiss'],
  ['Búrjave', 'Boerhaave'],
];
const audioDir = join('public', 'media', id, 'audio');
const cacheDir = join('sources', 'tts-cache', id);
mkdirSync(audioDir, { recursive: true });
mkdirSync(cacheDir, { recursive: true });

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
      let text = l.slice(2).join(' ').trim();
      for (const [x, y] of FIX) text = text.replaceAll(x, y);
      // edge-tts omite el signo de apertura: se repone en preguntas.
      text = text.replace(/(^|[.:;]\s+)([^.:;¿?]*\?)/g, (m, pre, q) => (q.trim().startsWith('¿') ? m : `${pre}¿${q.trimStart()}`));
      return { start: srtTime(a), end: srtTime(b), text };
    });
const probe = (f) => Number(spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], { encoding: 'utf8' }).stdout.trim());
const vttTime = (t) => {
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = (t % 60).toFixed(3).padStart(6, '0');
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${s}`;
};
/** Parte oraciones largas en subtítulos de ≤ 90 caracteres, repartiendo el tiempo por longitud. */
function splitCue(c) {
  if (c.text.length <= 90) return [c];
  const parts = [];
  let cur = '';
  for (const w of c.text.split(/\s+/)) {
    if ((cur + ' ' + w).trim().length > 84 && cur) {
      parts.push(cur.trim());
      cur = w;
    } else cur = (cur + ' ' + w).trim();
  }
  if (cur) parts.push(cur.trim());
  const total = parts.reduce((s, p) => s + p.length, 0);
  let t = c.start;
  return parts.map((p) => {
    const d = ((c.end - c.start) * p.length) / total;
    const out = { start: t, end: t + d, text: p };
    t += d;
    return out;
  });
}

const scenes = [];
let cursor = 0;
for (const [i, sc] of script.scenes.entries()) {
  const say = sc.say ?? sc.text;
  const hash = createHash('sha1').update(script.voice + script.rate + say).digest('hex').slice(0, 10);
  const name = `${String(i + 1).padStart(2, '0')}-${sc.id}`;
  const mp3 = join(audioDir, `${name}.mp3`);
  const srt = join(cacheDir, `${name}.srt`);
  const stamp = join(cacheDir, `${name}.hash`);
  const fresh = existsSync(mp3) && existsSync(srt) && existsSync(stamp) && readFileSync(stamp, 'utf8') === hash;
  if (!fresh) {
    process.stdout.write(`TTS ${sc.id}… `);
    let ok = false;
    for (let a = 0; a < 3 && !ok; a++) {
      const r = spawnSync('edge-tts', ['--voice', script.voice, `--rate=${script.rate}`, '--text', say, '--write-media', mp3, '--write-subtitles', srt], { encoding: 'utf8' });
      ok = r.status === 0 && existsSync(mp3);
      if (!ok) console.log('reintento', r.stderr?.slice(0, 200));
    }
    if (!ok) throw new Error(`No se pudo sintetizar ${sc.id}`);
    writeFileSync(stamp, hash);
    console.log('ok');
  }
  const dur = probe(mp3);
  const cues = parseSrt(readFileSync(srt, 'utf8'));
  const frames = LEAD + Math.ceil(dur * FPS) + TAIL;
  scenes.push({
    id: sc.id,
    title: sc.title,
    from: cursor,
    frames,
    audio: `media/${id}/audio/${name}.mp3`,
    audioFrom: LEAD,
    cues: cues.map((c) => ({ start: LEAD + Math.round(c.start * FPS), end: LEAD + Math.round(c.end * FPS), text: c.text })),
  });
  cursor += frames;
}
const total = cursor;
writeFileSync(join(chDir, 'timing.json'), JSON.stringify({ fps: FPS, total, scenes }, null, 1));

let vtt = 'WEBVTT\n\n';
let n = 1;
for (const s of scenes) {
  for (const c0 of s.cues) {
    for (const c of splitCue(c0)) {
      const a = (s.from + c.start) / FPS;
      const b = Math.min((s.from + c.end) / FPS, (s.from + s.frames) / FPS);
      vtt += `${n++}\n${vttTime(a)} --> ${vttTime(b)}\n${c.text}\n\n`;
    }
  }
}
writeFileSync(join('public', 'media', `${id}.vtt`), vtt);

const secs = total / FPS;
const meta = {
  src: `media/${id}.mp4`,
  poster: `media/${id}-poster.jpg`,
  vtt: `media/${id}.vtt`,
  duration: `${Math.floor(secs / 60)}:${String(Math.round(secs % 60)).padStart(2, '0')} min`,
  chapters: scenes.map((s) => ({ t: Math.round(s.from / FPS), label: s.title })),
  script: script.scenes.map((s) => ({ title: s.title, text: s.text })),
};
writeFileSync(join(chDir, 'video.json'), JSON.stringify(meta, null, 2));
console.log(`Total: ${total} frames (${meta.duration}) · ${scenes.length} escenas · ${n - 1} subtítulos`);
