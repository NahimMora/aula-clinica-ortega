// Clase completa: narración de Tomás paso a paso, tiempos del video, subtítulos y pista de audio.
// Uso: node scripts/tts-clase.mjs dig-02
// Salidas:
//   content/chapters/<id>/clase-tiempos.json   → fotogramas por diapositiva y paso (Remotion)
//   content/chapters/<id>/clase-video.json     → duración, capítulos y guion (web)
//   public/media/<id>/clase.vtt                → subtítulos
//   sources/tts-cache/<id>/clase/              → mp3 por paso y pista completa (no se publican)
// Si la voz no se puede sintetizar con es-AR-TomasNeural, el proceso falla: no se reemplaza por otra voz.
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const FPS = 24;
const VOICE = 'es-AR-TomasNeural';
const RATE = '-4%';
const LEAD = 5;
const TAIL = 14;
const PORTADA = 96;
const CIERRE = 120;

// Solo para la voz: nombres que el sintetizador lee mal. Los subtítulos conservan la grafía correcta.
const PRONUNCIA = [
  [/Gueneau de Mussy/g, 'Guenó de Musí'],
  [/Grey-Turner|Grey Turner/g, 'Grei Térner'],
  [/Cullen/g, 'Cálen'],
  [/Jobert/g, 'Yobér'],
  [/Popper/g, 'Póper'],
  [/Murphy/g, 'Múrfi'],
  [/McBurney/g, 'Mac Bérni'],
  [/Blumberg/g, 'Blúmberg'],
  [/Hinchey/g, 'Jínchi'],
  [/Boerhaave/g, 'Búrjave'],
  [/ALICIA/g, 'Alicia'],
  [/Mallory-Weiss/g, 'Málori Uáis'],
  [/Ménière/g, 'Meniér'],
  [/Schatzki/g, 'Shátski'],
  [/Plummer-Vinson/g, 'Plámer Vínson'],
  [/Helicobacter pylori/g, 'Jelicobácter pilóri'],
  [/Virchow/g, 'Fírjof'],
  [/Auerbach/g, 'Áuerbaj'],
  [/CEUCGO/g, 'ce, e, u, ce, ge, o'],
  [/ampolla de Vater/g, 'ampolla de Fáter'],
  [/Escherichia/g, 'Esqueríquia'],
  [/Shigella/g, 'Shiguela'],
  [/Clostridium difficile/g, 'Clostrídium dífisil'],
  [/Staphylococcus aureus/g, 'estafilococo áureus'],
  [/VIPoma/g, 'vipoma'],
  [/Zollinger-Ellison/g, 'Sólinguer Élison'],
  [/Hirschsprung/g, 'Jírshprung'],
  [/Crohn/g, 'Cron'],
  [/Fournier/g, 'Furnié'],
  [/Gilbert/g, 'Yilbér'],
  [/Crigler-Najjar/g, 'Crígler Náyar'],
  [/Dubin-Johnson/g, 'Dúbin Yónson'],
  [/Courvoisier-Terrier/g, 'Curvuasié Terrié'],
  [/Courvoisier/g, 'Curvuasié'],
  [/Bard y Pick/g, 'Bar y Pic'],
  [/Koller/g, 'Kóler'],
  [/Chvostek/g, 'Chvóstek'],
  [/\bLDH\b/g, 'ele de hache'],
  [/\bGPT\b/g, 'ge pe te'],
  [/\bGOT\b/g, 'ge o te'],
  [/\bGGT\b/g, 'ge ge te'],
  [/Traube/g, 'Tráube'],
  [/Chauffard/g, 'Shofár'],
  [/Mathieu/g, 'Matié'],
  [/Obrastzov/g, 'Obrástsof'],
  [/Naegeli/g, 'Néguéli'],
  [/Schuster/g, 'Shúster'],
  [/Castell/g, 'Castél'],
  [/Lecene/g, 'Lesén'],
  [/\bCope\b/g, 'Cop'],
  [/Desjardins/g, 'Deyardén'],
  [/Pfannenstiel/g, 'Fánenstil'],
  [/Kocher/g, 'Kójer'],
  [/Godet/g, 'Godé'],
  [/Chilaiditi/g, 'Quilaidíti'],
  [/Zenker/g, 'Sénker'],
  [/Barrett/g, 'Bárret'],
  [/\bACTH\b/g, 'a ce te hache'],
  [/\bPCR\b/g, 'pe ce erre'],
];
const pronunciar = (s) => PRONUNCIA.reduce((a, [re, r]) => a.replace(re, r), s);

const id = process.argv[2];
if (!id) throw new Error('Falta el id del capítulo');
const chDir = join('content', 'chapters', id);
const cache = join('sources', 'tts-cache', id, 'clase');
mkdirSync(cache, { recursive: true });
const tmp = join(cache, 'clase.mjs');
await build({ entryPoints: [join(chDir, 'clase.ts')], bundle: true, format: 'esm', platform: 'node', outfile: tmp, logLevel: 'error', alias: { '@': resolve('src') } });
const { clase } = await import(pathToFileURL(resolve(tmp)).href + `?v=${Date.now()}`);

const probe = (f) => Number(spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], { encoding: 'utf8' }).stdout.trim());
const ff = (...a) => {
  const r = spawnSync('ffmpeg', ['-y', '-v', 'error', ...a], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error(r.stderr);
};
const vttTime = (t) => {
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = (t % 60).toFixed(3).padStart(6, '0');
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${s}`;
};
function cortar(txt, max = 84) {
  const out = [];
  let cur = '';
  for (const w of txt.split(/\s+/)) {
    if ((cur + ' ' + w).trim().length > max && cur) {
      out.push(cur.trim());
      cur = w;
    } else cur = (cur + ' ' + w).trim();
  }
  if (cur) out.push(cur.trim());
  return out;
}

async function sintetizar(nombre, texto) {
  const say = pronunciar(texto);
  const mp3 = join(cache, `${nombre}.mp3`);
  const sello = join(cache, `${nombre}.hash`);
  const hash = createHash('sha1').update(VOICE + RATE + say).digest('hex').slice(0, 12);
  if (existsSync(mp3) && existsSync(sello) && readFileSync(sello, 'utf8') === hash) return mp3;
  let ok = false;
  let err = '';
  for (let a = 0; a < 5 && !ok; a++) {
    const r = spawnSync('edge-tts', ['--voice', VOICE, `--rate=${RATE}`, '--text', say, '--write-media', mp3], { encoding: 'utf8' });
    ok = r.status === 0 && existsSync(mp3) && probe(mp3) > 0.3;
    err = r.stderr ?? '';
    if (!ok) await new Promise((res) => setTimeout(res, 1500 * (a + 1)));
  }
  if (!ok) throw new Error(`No se pudo sintetizar ${nombre} con ${VOICE}: ${err.slice(0, 200)}`);
  writeFileSync(sello, hash);
  console.log('ok', nombre);
  return mp3;
}

const mazos = [
  { m: clase.fisio, nombre: 'Fisiopatología' },
  { m: clase.teoria, nombre: 'Teoría' },
];

const diapos = [];
const partes = [];
const capitulos = [];
const guion = [];
let vtt = 'WEBVTT\n\n';
let nCue = 1;
let cursor = PORTADA;
const silencio = join(cache, '_portada.wav');
ff('-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-t', String(PORTADA / FPS), silencio);
partes.push(silencio);

for (const { m, nombre } of mazos) {
  let secAnterior = null;
  for (const d of m.diapos) {
    if (d.soloDiapo) continue;
    if (d.sec !== secAnterior) {
      const label = m.secciones.find((s) => s.id === d.sec)?.label ?? d.sec;
      capitulos.push({ t: Math.floor(cursor / FPS), label: `${nombre} · ${label}` });
      secAnterior = d.sec;
    }
    const beats = [];
    const inicioDiapo = cursor;
    for (const [i, texto] of d.voz.entries()) {
      const nom = `${d.id}-${i + 1}`;
      const mp3 = await sintetizar(nom, texto);
      const dur = probe(mp3);
      const frames = LEAD + Math.ceil(dur * FPS) + TAIL;
      beats.push({ inicio: cursor, frames });
      const wav = join(cache, `${nom}.wav`);
      const total = frames / FPS;
      ff('-i', mp3, '-af', `aresample=44100,adelay=${Math.round((LEAD / FPS) * 1000)}:all=1,apad=whole_dur=${total},atrim=0:${total}`, '-ac', '1', '-ar', '44100', wav);
      partes.push(wav);
      const trozos = cortar(texto);
      const totalC = trozos.reduce((s, p) => s + p.length, 0);
      let t = (cursor + LEAD) / FPS;
      for (const tr of trozos) {
        const dt = (dur * tr.length) / totalC;
        vtt += `${nCue++}\n${vttTime(t)} --> ${vttTime(t + dt)}\n${tr}\n\n`;
        t += dt;
      }
      cursor += frames;
    }
    diapos.push({ mazo: m.id, id: d.id, inicio: inicioDiapo, frames: cursor - inicioDiapo, beats });
    guion.push({ title: d.titulo, text: d.voz.join(' ') });
  }
}

const finSil = join(cache, '_cierre.wav');
ff('-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-t', String(CIERRE / FPS), finSil);
partes.push(finSil);
const total = cursor + CIERRE;

const lista = join(cache, '_lista.txt');
writeFileSync(lista, partes.map((p) => `file '${resolve(p).replace(/\\/g, '/')}'`).join('\n'));
ff('-f', 'concat', '-safe', '0', '-i', lista, '-c:a', 'pcm_s16le', join(cache, 'narracion.wav'));

writeFileSync(join(chDir, 'clase-tiempos.json'), JSON.stringify({ fps: FPS, total, portada: PORTADA, cierre: CIERRE, voz: VOICE, diapos }, null, 1));
mkdirSync(join('public', 'media', id), { recursive: true });
writeFileSync(join('public', 'media', id, 'clase.vtt'), vtt);
const secs = total / FPS;
const duracion = secs >= 3600 ? `${Math.floor(secs / 3600)} h ${Math.round((secs % 3600) / 60)} min` : `${Math.floor(secs / 60)}:${String(Math.round(secs % 60)).padStart(2, '0')}`;
writeFileSync(join(chDir, 'clase-video.json'), JSON.stringify({ src: `media/${id}/clase.mp4`, poster: `media/${id}/clase.jpg`, vtt: `media/${id}/clase.vtt`, duration: duracion, chapters: capitulos, script: guion }, null, 2));
console.log(`Total: ${total} fotogramas (${duracion}) · ${diapos.length} diapositivas · voz ${VOICE}`);
