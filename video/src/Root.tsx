// Video del capítulo: las mismas escenas de Teoría (src/escenas), narradas paso a paso.
// Render: npm run video:render -- dig-01 video/out/dig-01-master.mp4 --codec=h264 --crf=20
import '@fontsource-variable/fraunces';
import '@fontsource-variable/inter';
import { useEffect, useState, type CSSProperties } from 'react';
import { AbsoluteFill, Audio, Composition, Sequence, continueRender, delayRender, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { Lienzo } from '../../src/escenas/Lienzo';
import type { Escena } from '../../src/escenas/tipos';
import { escenas as dig01 } from '../../content/chapters/dig-01/escenas';
import tiempos01 from '../../content/chapters/dig-01/tiempos.json';
import { clase as planDig02 } from '../../content/chapters/dig-02/clase';
import tiemposDig02 from '../../content/chapters/dig-02/clase-tiempos.json';
import { clase as planDig01 } from '../../content/chapters/dig-01/clase';
import tiemposDig01 from '../../content/chapters/dig-01/clase-tiempos.json';
import { clase as planDig03 } from '../../content/chapters/dig-03/clase';
import tiemposDig03 from '../../content/chapters/dig-03/clase-tiempos.json';
import { clase as planDig04 } from '../../content/chapters/dig-04/clase';
import tiemposDig04 from '../../content/chapters/dig-04/clase-tiempos.json';
import { clase as planDig05 } from '../../content/chapters/dig-05/clase';
import tiemposDig05 from '../../content/chapters/dig-05/clase-tiempos.json';
import { clase as planDig06 } from '../../content/chapters/dig-06/clase';
import tiemposDig06 from '../../content/chapters/dig-06/clase-tiempos.json';
import { clase as planDig07 } from '../../content/chapters/dig-07/clase';
import tiemposDig07 from '../../content/chapters/dig-07/clase-tiempos.json';
import { clase as planDig08 } from '../../content/chapters/dig-08/clase';
import tiemposDig08 from '../../content/chapters/dig-08/clase-tiempos.json';
import { clase as planDig09 } from '../../content/chapters/dig-09/clase';
import tiemposDig09 from '../../content/chapters/dig-09/clase-tiempos.json';
import { clase as planDig10 } from '../../content/chapters/dig-10/clase';
import tiemposDig10 from '../../content/chapters/dig-10/clase-tiempos.json';
import { clase as planDig11 } from '../../content/chapters/dig-11/clase';
import tiemposDig11 from '../../content/chapters/dig-11/clase-tiempos.json';
import { clase as planDig12 } from '../../content/chapters/dig-12/clase';
import tiemposDig12 from '../../content/chapters/dig-12/clase-tiempos.json';
import { clase as planDig13 } from '../../content/chapters/dig-13/clase';
import tiemposDig13 from '../../content/chapters/dig-13/clase-tiempos.json';
import { clase as planDig14 } from '../../content/chapters/dig-14/clase';
import tiemposDig14 from '../../content/chapters/dig-14/clase-tiempos.json';
import { clase as planDig15 } from '../../content/chapters/dig-15/clase';
import tiemposDig15 from '../../content/chapters/dig-15/clase-tiempos.json';
import type { PlanClase } from '../../src/clase/tipos';
import { AssetCtx, Diapositiva } from '../../src/clase/Diapositiva';
import '../../src/styles/tokens.css';
import '../../src/styles/clase.css';

interface Beat {
  escena: number;
  paso: number;
  archivo: string;
  inicio: number;
  frames: number;
  lead: number;
  cues: [number, number, string][];
  retener: string[];
}
interface Tiempos {
  fps: number;
  total: number;
  portada: number;
  cierre: number;
  beats: Beat[];
}
interface Cap {
  id: string;
  titulo: string;
  objetivo: string;
  escenas: Escena[];
  tiempos: Tiempos;
}

const CAPS: Cap[] = [
  {
    id: 'dig-01',
    titulo: 'Vómitos, disfagia y dispepsia',
    objetivo: 'Tipos de vómito · hematemesis vs hemoptisis · Mallory-Weiss · acalasia · dispepsia',
    escenas: dig01,
    tiempos: tiempos01 as Tiempos,
  },
];

// Paleta oscura de la web (mismas variables que .lienzo en capitulo.css).
const VARS = {
  '--v-bg': '#1d1925', '--v-card': '#272130', '--v-ink': '#f3eef6', '--v-ink2': '#cfc5d8', '--v-ink3': '#9a8fa7', '--v-line': '#3d3549',
  '--v-rose': '#f2a7be', '--v-rose-f': '#3a2431', '--v-lilac': '#c4b0f2', '--v-lilac-f': '#302747', '--v-sky': '#a3cbef', '--v-sky-f': '#203043',
  '--v-mint': '#8fd4b5', '--v-mint-f': '#20352b', '--v-peach': '#f1b88b', '--v-peach-f': '#3a2b1f', '--v-red': '#ff6b7d', '--v-red-f': '#45202a',
} as CSSProperties;
const FONDO = '#16131b';
const TINTA = '#f3eef6';
const TINTA2 = '#cfc5d8';
const ACENTO = '#f2a7be';
const TIT = "'Fraunces Variable', Georgia, serif";
const TXT = "'Inter Variable', 'Segoe UI', sans-serif";

function useFuentes() {
  const [h] = useState(() => delayRender('fuentes'));
  useEffect(() => {
    document.fonts.ready.then(() => continueRender(h));
  }, [h]);
}

function Clase({ cap }: { cap: Cap }) {
  useFuentes();
  const frame = useCurrentFrame();
  const T = cap.tiempos;
  const beats = T.beats;
  const primero = beats[0].inicio;
  const ultimo = beats[beats.length - 1];
  const fin = ultimo.inicio + ultimo.frames;
  let idx = 0;
  for (let i = 0; i < beats.length; i++) if (frame >= beats[i].inicio) idx = i;
  const b = beats[idx];
  const e = cap.escenas[b.escena];
  const t = (frame - b.inicio) / T.fps;
  const local = frame - b.inicio;
  const cue = b.cues.find((q) => local >= q[0] && local < q[1] + 6)?.[2] ?? (local < b.lead + 4 ? b.cues[0]?.[2] : b.cues[b.cues.length - 1]?.[2]);
  // Lo que queda anotado se acumula dentro de cada escena, como en una pizarra.
  const notas = beats.slice(0, idx + 1).filter((x) => x.escena === b.escena).flatMap((x) => x.retener).slice(-7);
  const portada = frame < primero;
  const cierre = frame >= fin;
  const pasosEscena = beats.filter((x) => x.escena === b.escena).length;
  return (
    <AbsoluteFill style={{ ...VARS, background: FONDO, color: TINTA, fontFamily: TXT }}>
      {beats.map((x) => (
        <Sequence key={x.archivo} from={x.inicio + x.lead} durationInFrames={x.frames}>
          <Audio src={staticFile(x.archivo)} />
        </Sequence>
      ))}
      {portada && (
        <AbsoluteFill style={{ justifyContent: 'center', padding: '0 140px', opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' }) }}>
          <div style={{ fontSize: 34, fontWeight: 700, color: ACENTO, letterSpacing: 2, textTransform: 'uppercase' }}>Aula Clínica · Semiología I</div>
          <div style={{ fontFamily: TIT, fontWeight: 650, fontSize: 120, lineHeight: 1, marginTop: 14 }}>{cap.titulo}</div>
          <div style={{ fontSize: 36, marginTop: 26, color: TINTA2 }}>{cap.objetivo}</div>
          <div style={{ marginTop: 34, height: 10, width: 300, background: ACENTO, borderRadius: 5 }} />
        </AbsoluteFill>
      )}
      {!portada && !cierre && (
        <>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 96, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', borderBottom: '2px solid #352e40' }}>
            <div style={{ fontFamily: TIT, fontWeight: 650, fontSize: 48 }}>
              <span style={{ color: ACENTO }}>{b.escena + 1}.</span> {e.titulo}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {Array.from({ length: pasosEscena }, (_, k) => (
                <div key={k} style={{ width: 46, height: 8, borderRadius: 4, background: k <= b.paso ? ACENTO : '#352e40' }} />
              ))}
            </div>
          </div>
          <div style={{ position: 'absolute', top: 120, left: 40, width: 1260, borderRadius: 26, overflow: 'hidden', border: '2px solid #352e40' }}>
            <Lienzo e={e} i={b.paso} t={t} titulo />
          </div>
          <div style={{ position: 'absolute', top: 124, left: 1340, right: 44, bottom: 200, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {notas.length > 0 && <div style={{ fontFamily: TIT, fontWeight: 650, fontSize: 40, color: ACENTO }}>Retené esto</div>}
            {notas.map((n, k) => (
              <div key={n + k} style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.18, borderLeft: `6px solid ${ACENTO}`, paddingLeft: 14 }}>
                {n}
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 170, background: '#0e0c12', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 80px', textAlign: 'center', fontSize: 42, fontWeight: 600, lineHeight: 1.22 }}>
            {cue}
          </div>
        </>
      )}
      {cierre && (
        <AbsoluteFill style={{ justifyContent: 'center', padding: '0 140px', opacity: interpolate(frame, [fin, fin + 10], [0, 1], { extrapolateRight: 'clamp' }) }}>
          <div style={{ fontFamily: TIT, fontWeight: 650, fontSize: 96, lineHeight: 1.04 }}>Ahora cerrá el video y respondé las preguntas de examen en voz alta</div>
          <div style={{ fontSize: 38, marginTop: 24, color: TINTA2 }}>Recordar sin pistas, en días distintos, es lo que fija.</div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}

// Cada capítulo se liga a su propio componente: las props de Remotion deben ser serializables.
const BOUND = CAPS.map((cap) => ({ cap, Video: () => <Clase cap={cap} /> }));

/* ───────── Clase completa: las mismas diapositivas de la web, con la voz de Tomás ───────── */

interface TiempoDiapo {
  mazo: string;
  id: string;
  inicio: number;
  frames: number;
  beats: { inicio: number; frames: number }[];
}
interface TiemposClase {
  fps: number;
  total: number;
  portada: number;
  cierre: number;
  diapos: TiempoDiapo[];
}

interface CapClase {
  id: string;
  titulo: string;
  plan: PlanClase;
  tiempos: TiemposClase;
}

const CLASES: CapClase[] = [
  { id: 'dig-15-clase', titulo: 'Pancreatitis aguda', plan: planDig15, tiempos: tiemposDig15 as TiemposClase },
  { id: 'dig-14-clase', titulo: 'Insuficiencia hepática', plan: planDig14, tiempos: tiemposDig14 as TiemposClase },
  { id: 'dig-13-clase', titulo: 'Cirrosis e hipertensión portal', plan: planDig13, tiempos: tiemposDig13 as TiemposClase },
  { id: 'dig-12-clase', titulo: 'Hemorragias digestivas', plan: planDig12, tiempos: tiemposDig12 as TiemposClase },
  { id: 'dig-11-clase', titulo: 'Síndromes vesiculares', plan: planDig11, tiempos: tiemposDig11 as TiemposClase },
  { id: 'dig-10-clase', titulo: 'Peritonitis', plan: planDig10, tiempos: tiemposDig10 as TiemposClase },
  { id: 'dig-09-clase', titulo: 'Malabsorción e intestino irritable', plan: planDig09, tiempos: tiemposDig09 as TiemposClase },
  { id: 'dig-08-clase', titulo: 'Síndrome pilórico e íleo', plan: planDig08, tiempos: tiemposDig08 as TiemposClase },
  { id: 'dig-07-clase', titulo: 'Síndrome ulceroso y gastritis', plan: planDig07, tiempos: tiemposDig07 as TiemposClase },
  { id: 'dig-06-clase', titulo: 'Síndrome esofágico', plan: planDig06, tiempos: tiemposDig06 as TiemposClase },
  { id: 'dig-05-clase', titulo: 'Examen físico del aparato digestivo', plan: planDig05, tiempos: tiemposDig05 as TiemposClase },
  { id: 'dig-04-clase', titulo: 'Ictericia', plan: planDig04, tiempos: tiemposDig04 as TiemposClase },
  { id: 'dig-03-clase', titulo: 'Diarrea, constipación y trastornos anorrectales', plan: planDig03, tiempos: tiemposDig03 as TiemposClase },
  { id: 'dig-01-clase', titulo: 'Vómitos, disfagia y dispepsia', plan: planDig01, tiempos: tiemposDig01 as TiemposClase },{ id: 'dig-02-clase', titulo: 'Dolor abdominal y abdomen agudo', plan: planDig02, tiempos: tiemposDig02 as TiemposClase }];

const SEC_FADE = 7;

function ClaseCompleta({ cap }: { cap: CapClase }) {
  useFuentes();
  const frame = useCurrentFrame();
  const T = cap.tiempos;
  const primera = T.diapos[0].inicio;
  const ult = T.diapos[T.diapos.length - 1];
  const fin = ult.inicio + ult.frames;
  const portada = frame < primera;
  const cierre = frame >= fin;
  let k = 0;
  for (let i = 0; i < T.diapos.length; i++) if (frame >= T.diapos[i].inicio) k = i;
  const td = T.diapos[k];
  const mazo = td.mazo === 'fisio' ? cap.plan.fisio : cap.plan.teoria;
  const d = mazo.diapos.find((x) => x.id === td.id)!;
  let b = 0;
  for (let i = 0; i < td.beats.length; i++) if (frame >= td.beats[i].inicio) b = i;
  const seccion = mazo.secciones.find((s) => s.id === d.sec)?.label;
  const reloj = { t: (frame - td.inicio) / T.fps, paso: b, dt: (frame - td.beats[b].inicio) / T.fps };
  const fade = interpolate(frame - td.inicio, [0, SEC_FADE], [0, 1], { extrapolateRight: 'clamp' });
  const avance = (frame - primera) / (fin - primera);
  return (
    <AbsoluteFill style={{ background: '#1d1925', color: TINTA, fontFamily: TXT }}>
      {portada && (
        <AbsoluteFill style={{ justifyContent: 'center', padding: '0 150px', opacity: interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' }) }}>
          <div style={{ fontSize: 32, fontWeight: 650, color: ACENTO, letterSpacing: 2, textTransform: 'uppercase' }}>Semiología I · Clase completa</div>
          <div style={{ fontFamily: TIT, fontWeight: 620, fontSize: 112, lineHeight: 1.04, marginTop: 16 }}>{cap.titulo}</div>
        </AbsoluteFill>
      )}
      {!portada && !cierre && (
        <AssetCtx.Provider value={(p) => staticFile(p)}>
          <AbsoluteFill style={{ opacity: fade }}>
            <Diapositiva d={d} reloj={reloj} video seccion={seccion} />
          </AbsoluteFill>
          <div style={{ position: 'absolute', left: 0, bottom: 0, height: 5, width: `${avance * 100}%`, background: ACENTO, opacity: 0.8 }} />
        </AssetCtx.Provider>
      )}
      {cierre && (
        <AbsoluteFill style={{ justifyContent: 'center', padding: '0 150px', opacity: interpolate(frame, [fin, fin + 12], [0, 1], { extrapolateRight: 'clamp' }) }}>
          <div style={{ fontFamily: TIT, fontWeight: 620, fontSize: 92, lineHeight: 1.08 }}>Ahora volvé a las diapositivas y practicá</div>
          <div style={{ fontSize: 38, marginTop: 24, color: TINTA2 }}>Choice, desarrollos, memoria y simulacro.</div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}

const CLASES_LIGADAS = CLASES.map((cap) => ({ cap, Video: () => <ClaseCompleta cap={cap} /> }));

export const Root: React.FC = () => (
  <>
    {BOUND.map(({ cap, Video }) => (
      <Composition key={cap.id} id={cap.id} component={Video} durationInFrames={cap.tiempos.total} fps={cap.tiempos.fps} width={1920} height={1080} />
    ))}
    {CLASES_LIGADAS.map(({ cap, Video }) => (
      <Composition key={cap.id} id={cap.id} component={Video} durationInFrames={cap.tiempos.total} fps={cap.tiempos.fps} width={1920} height={1080} />
    ))}
  </>
);
