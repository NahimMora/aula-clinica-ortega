// Figuras de neurología: funciones puras de (t, paso, dt).
// Las importa Remotion: sin import.meta ni alias con valor.
import type { ReactNode } from 'react';
import type { VTone } from '../visual/tipos';
import { type BaseFig, INK, INK2, INK3, L, Pulso, ROJO, Via, apf } from './figuras-base';

const col = (t: VTone) => `var(--v-${t})`;

/* ─────────── Encéfalo de perfil: estructuras y vías ─────────── */

export type ParteEnc =
  | 'frontal'
  | 'parietal'
  | 'occipital'
  | 'temporal'
  | 'talamo'
  | 'hipotalamo'
  | 'mesencefalo'
  | 'protuberancia'
  | 'bulbo'
  | 'medula'
  | 'cerebelo'
  | 'ojo'
  | 'laberinto'
  | 'gasser'
  | 'olfatorio';

export type ViaEnc = 'trigemino' | 'sensitiva' | 'vision' | 'olfato' | 'vestibular' | 'cerebelo' | 'hipotalamo';

export interface VistaEnc {
  luz?: ParteEnc[];
  lesion?: ParteEnc[];
  vias?: ViaEnc[];
  etiquetas?: ParteEnc[];
  tone?: VTone;
  nota?: string;
  notaTone?: VTone;
}

const CEREBRO = '#c9a9a5';
const CEREBRO_B = '#8d6f6b';
const NERVIO = '#e3c26b';

const HEMI =
  'M160,312 C118,280 112,196 166,136 C222,76 330,52 430,58 C530,64 610,110 650,180 C682,236 676,296 640,322 C612,340 572,336 540,332 C520,344 500,360 470,366 C430,374 380,376 330,368 C292,362 262,350 246,334 C226,330 186,330 160,312 Z';
const LOBULOS: Record<'frontal' | 'parietal' | 'occipital' | 'temporal', string> = {
  frontal: 'M160,312 C118,280 112,196 166,136 C222,76 330,52 420,58 C412,120 398,180 384,240 C340,260 290,300 252,332 C226,330 186,330 160,312 Z',
  parietal: 'M420,58 C530,64 600,104 628,160 C590,190 560,220 540,240 C500,250 440,250 384,240 C398,180 412,120 420,58 Z',
  occipital: 'M628,160 C660,200 680,280 640,322 C612,340 572,336 540,332 C548,300 548,260 540,240 C560,220 590,190 628,160 Z',
  temporal: 'M252,332 C290,300 340,262 384,240 C440,250 500,250 540,240 C548,260 548,300 540,332 C520,344 500,360 470,366 C430,374 380,376 330,368 C292,362 262,350 252,332 Z',
};
const FORMAS: Record<Exclude<ParteEnc, 'frontal' | 'parietal' | 'occipital' | 'temporal' | 'ojo' | 'laberinto' | 'gasser' | 'olfatorio' | 'cerebelo' | 'talamo' | 'hipotalamo'>, string> = {
  mesencefalo: 'M414,282 L470,282 L476,338 L414,338 Z',
  protuberancia: 'M414,338 C392,352 390,412 410,426 L486,426 C492,400 490,360 476,338 Z',
  bulbo: 'M412,426 L486,426 L480,476 L424,476 Z',
  medula: 'M424,476 L480,476 L477,540 L428,540 Z',
};

const VIAS: Record<ViaEnc, string> = {
  trigemino: 'M132,318 C180,332 240,362 300,386 L318,392 C352,392 384,388 412,384 C432,366 440,330 438,300 C436,284 432,270 430,256 C442,200 456,150 470,96',
  sensitiva: 'M452,540 C452,510 450,470 448,430 C446,380 444,330 438,300 C434,280 432,268 430,256 C442,200 456,150 470,96',
  vision: 'M128,348 C200,340 290,322 352,312 C392,298 420,280 450,262 C520,250 590,244 646,240',
  olfato: 'M188,322 C228,324 262,332 296,344',
  vestibular: 'M388,478 C400,462 406,446 414,430 C452,420 500,406 540,396',
  cerebelo: 'M560,350 C540,300 496,272 452,262 C452,200 462,150 470,96',
  hipotalamo: 'M380,292 C362,330 342,370 318,392 C258,370 190,336 132,318',
};

const ETQ: Record<ParteEnc, { x: number; y: number; a?: 'start' | 'middle' | 'end'; n: string }> = {
  frontal: { x: 250, y: 180, n: 'Lóbulo frontal' },
  parietal: { x: 520, y: 128, n: 'Corteza parietal' },
  occipital: { x: 606, y: 214, n: 'Occipital' },
  temporal: { x: 470, y: 330, n: 'Temporal' },
  talamo: { x: 430, y: 214, n: 'Tálamo' },
  hipotalamo: { x: 350, y: 270, a: 'end', n: 'Hipotálamo' },
  mesencefalo: { x: 482, y: 300, a: 'start', n: 'Mesencéfalo' },
  protuberancia: { x: 386, y: 338, a: 'end', n: 'Protuberancia' },
  bulbo: { x: 496, y: 474, a: 'start', n: 'Bulbo' },
  medula: { x: 490, y: 524, a: 'start', n: 'Médula (cordones)' },
  cerebelo: { x: 580, y: 398, n: 'Cerebelo' },
  ojo: { x: 96, y: 404, n: 'Ojo' },
  laberinto: { x: 330, y: 540, a: 'end', n: 'Oído interno' },
  gasser: { x: 332, y: 430, n: 'Gasser' },
  olfatorio: { x: 206, y: 296, n: 'Olfatorio' },
};

function Encefalo({ t, paso, dt, vistas = [{}] }: BaseFig & { vistas?: VistaEnc[] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  const tone = v.tone ?? 'sky';
  const luz = new Set(v.luz ?? []);
  const les = new Set(v.lesion ?? []);
  const lat = 0.75 + 0.25 * Math.sin(t * 3);
  const estilo = (p: ParteEnc, base: string, borde: string) => {
    if (les.has(p)) return { fill: `color-mix(in srgb, var(--v-red) ${Math.round(35 + 30 * lat * u)}%, ${base})`, stroke: ROJO, strokeWidth: 4, opacity: 1 };
    if (luz.has(p)) return { fill: `color-mix(in srgb, ${col(tone)} 55%, ${base})`, stroke: col(tone), strokeWidth: 4, opacity: 1 };
    return { fill: base, stroke: borde, strokeWidth: 2.5, opacity: 1 };
  };
  const mostrar = new Set<ParteEnc>([...(v.luz ?? []), ...(v.lesion ?? []), ...(v.etiquetas ?? [])]);
  const vias = v.vias ?? [];
  const lobulos = (['frontal', 'parietal', 'occipital', 'temporal'] as const).filter((p) => luz.has(p) || les.has(p));
  return (
    <svg viewBox="30 40 720 560" role="img" aria-label="Encéfalo de perfil: corteza, tálamo, tronco, cerebelo y médula">
      {/* hemisferio y lóbulos */}
      <path d={HEMI} fill={CEREBRO} stroke={CEREBRO_B} strokeWidth={3} />
      {lobulos.map((p) => (
        <path key={p} d={LOBULOS[p]} {...estilo(p, CEREBRO, CEREBRO_B)} />
      ))}
      {/* surcos: central y de Silvio, circunvoluciones */}
      <g fill="none" stroke={CEREBRO_B} strokeLinecap="round">
        <path d="M420,60 C412,120 398,180 384,240" strokeWidth={3.5} />
        <path d="M252,332 C300,312 360,302 420,300" strokeWidth={3.5} />
        <g strokeWidth={2} opacity={0.55}>
          <path d="M200,140 C230,170 220,210 250,230" />
          <path d="M290,90 C300,130 280,170 310,200" />
          <path d="M150,240 C190,240 210,270 240,280" />
          <path d="M470,80 C460,120 480,160 460,200" />
          <path d="M540,110 C520,150 560,180 540,220" />
          <path d="M600,170 C590,210 620,240 600,280" />
          <path d="M300,345 C340,335 380,340 420,345" />
        </g>
      </g>
      {/* estructuras profundas (por transparencia) */}
      <g opacity={0.92}>
        <ellipse cx={430} cy={250} rx={46} ry={26} {...estilo('talamo', '#b07f8c', '#7a4d5a')} strokeDasharray={luz.has('talamo') || les.has('talamo') ? undefined : '6 5'} />
        <ellipse cx={380} cy={292} rx={24} ry={15} {...estilo('hipotalamo', '#a9708a', '#7a4d5a')} strokeDasharray={luz.has('hipotalamo') || les.has('hipotalamo') ? undefined : '6 5'} />
        <path d="M374,306 L370,318" stroke="#7a4d5a" strokeWidth={4} />
        <circle cx={368} cy={326} r={9} fill="#a9708a" stroke="#7a4d5a" strokeWidth={2} />
        <path d={FORMAS.mesencefalo} {...estilo('mesencefalo', '#b8948f', '#7d5f5a')} strokeDasharray={luz.has('mesencefalo') || les.has('mesencefalo') ? undefined : '6 5'} />
      </g>
      {/* cerebelo */}
      <g>
        <ellipse cx={575} cy={395} rx={92} ry={58} {...estilo('cerebelo', '#b3898a', '#7a5556')} />
        <g fill="none" stroke="#7a5556" strokeWidth={2} opacity={0.6}>
          {[-36, -18, 0, 18, 36].map((dy) => (
            <path key={dy} d={`M${500 + Math.abs(dy) * 0.9},${395 + dy} C${545},${388 + dy} ${610},${388 + dy} ${652 - Math.abs(dy) * 0.9},${395 + dy}`} />
          ))}
        </g>
      </g>
      {/* tronco y médula */}
      <path d={FORMAS.protuberancia} {...estilo('protuberancia', '#b8948f', '#7d5f5a')} />
      <path d={FORMAS.bulbo} {...estilo('bulbo', '#b8948f', '#7d5f5a')} />
      <path d={FORMAS.medula} {...estilo('medula', '#c4a59f', '#7d5f5a')} />
      <path d="M452,480 L452,540" stroke="#7d5f5a" strokeWidth={2} strokeDasharray="5 5" opacity={0.6} />
      {/* ojo y nervio óptico */}
      <circle cx={100} cy={350} r={28} {...estilo('ojo', '#f2ede4', '#8a7f72')} />
      <circle cx={80} cy={350} r={11} fill="#5a7a9a" />
      <circle cx={76} cy={350} r={5} fill="#1d2430" />
      {/* bulbo olfatorio */}
      <ellipse cx={210} cy={322} rx={30} ry={8} {...estilo('olfatorio', NERVIO, '#a5862e')} />
      {/* trigémino: ganglio de Gasser y tres ramas */}
      <g fill="none" stroke={NERVIO} strokeLinecap="round" opacity={luz.has('gasser') || les.has('gasser') || vias.includes('trigemino') ? 1 : 0.55}>
        <path d="M300,386 C240,360 180,332 132,318" strokeWidth={5} />
        <path d="M300,394 C230,400 170,404 130,404" strokeWidth={5} />
        <path d="M306,402 C250,440 190,470 140,490" strokeWidth={5} />
        <path d="M330,392 C360,392 384,388 404,384" strokeWidth={8} />
      </g>
      <path d="M296,378 C318,370 336,380 334,394 C332,408 312,414 298,404 C310,398 312,386 296,378 Z" {...estilo('gasser', NERVIO, '#a5862e')} />
      {/* oído interno: vestíbulo, conductos semicirculares y cóclea; VIII par */}
      <g>
        <path d="M388,478 C398,462 404,446 412,430" stroke={NERVIO} strokeWidth={5} fill="none" opacity={0.8} />
        {(() => {
          const st = estilo('laberinto', '#e6d3a8', '#9a8458');
          return (
            <g stroke={st.stroke} strokeWidth={Math.max(3, st.strokeWidth)} fill="none" opacity={st.opacity}>
              <ellipse cx={378} cy={490} rx={13} ry={10} fill={st.fill} />
              <path d="M386,482 C392,456 420,456 418,478 C416,494 396,494 390,488" strokeWidth={6} />
              <path d="M372,481 C368,452 396,446 400,466" strokeWidth={6} />
              <path d="M388,496 C410,506 414,524 396,526 C384,527 380,514 386,504" strokeWidth={6} />
              <path d="M366,494 C344,492 338,512 352,518 C364,522 370,510 362,504 C356,500 352,508 356,510" strokeWidth={6} />
            </g>
          );
        })()}
      </g>
      {/* vías */}
      {vias.map((k) => (
        <g key={k} opacity={u}>
          <Via d={VIAS[k]} c={k === 'olfato' ? 'var(--v-mint)' : col(tone)} w={4} o={0.55} />
          <Pulso d={VIAS[k]} t={t} v={30} c={k === 'olfato' ? 'var(--v-mint)' : col(tone)} w={9} largo={7} />
        </g>
      ))}
      {vias.includes('trigemino') && (
        <g opacity={u}>
          <L x={150} y={296} a="start" c={NERVIO} s={20}>
            V1
          </L>
          <L x={112} y={410} a="end" c={NERVIO} s={20}>
            V2
          </L>
          <L x={132} y={500} a="end" c={NERVIO} s={20}>
            V3
          </L>
          {[
            { x: 318, y: 392, n: '1' },
            { x: 420, y: 376, n: '2' },
            { x: 430, y: 256, n: '3' },
          ].map((p) => (
            <g key={p.n}>
              <circle cx={p.x} cy={p.y} r={15} fill="var(--v-bg)" stroke={col(tone)} strokeWidth={3} />
              <L x={p.x} y={p.y + 1} c={col(tone)} s={18} w={800}>
                {p.n}
              </L>
            </g>
          ))}
        </g>
      )}
      {/* etiquetas */}
      {[...mostrar].map((p) => {
        const e = ETQ[p];
        const c = les.has(p) ? ROJO : luz.has(p) ? col(tone) : INK2;
        return (
          <L key={p} x={e.x} y={e.y} a={e.a ?? 'middle'} c={c} s={20}>
            {e.n}
          </L>
        );
      })}
      {v.nota && (
        <L x={390} y={580} c={v.notaTone ? col(v.notaTone) : INK} s={21}>
          {v.nota}
        </L>
      )}
    </svg>
  );
}

/* ─────────── Cabeza de frente: dónde duele cada cefalea ─────────── */

export type VistaCabeza = 'normal' | 'hemicraneal' | 'aura' | 'vincha' | 'periorbitario' | 'trigemino' | 'holocraneana' | 'facial-periferica' | 'facial-central' | 'weber-conduccion' | 'weber-percepcion';

const PIEL = '#d9b7a0';
const PIEL_B = '#8a6a58';
const CRANEO = 'M400,40 C520,40 590,130 592,250 C594,330 580,380 560,420 C540,470 480,530 400,536 C320,530 260,470 240,420 C220,380 206,330 208,250 C210,130 280,40 400,40 Z';
const V_ZONAS = {
  v1: 'M400,42 C300,44 236,110 214,200 L222,246 C262,242 312,240 352,252 C372,262 388,276 398,290 Z',
  v2: 'M222,246 C262,242 312,240 352,252 C372,262 388,276 398,290 L398,388 C384,398 372,412 366,426 C330,428 290,420 262,404 C246,380 230,330 222,246 Z',
  v3: 'M262,404 C290,420 330,428 366,426 C376,452 386,470 400,478 L400,536 C330,532 282,494 262,450 Z',
};

function Ojo({ x, y, rojo = 0, ptosis = 0, miosis = 0, cerrado = false, arriba = 0 }: { x: number; y: number; rojo?: number; ptosis?: number; miosis?: number; cerrado?: boolean; arriba?: number }) {
  if (cerrado)
    return <path d={`M${x - 42},${y} C${x - 20},${y + 14} ${x + 20},${y + 14} ${x + 42},${y}`} fill="none" stroke={PIEL_B} strokeWidth={4} strokeLinecap="round" />;
  return (
    <g>
      <path d={`M${x - 42},${y} C${x - 20},${y - 24} ${x + 20},${y - 24} ${x + 42},${y} C${x + 20},${y + 22} ${x - 20},${y + 22} ${x - 42},${y} Z`} fill={rojo ? `rgba(220,90,90,${0.25 + 0.45 * rojo})` : '#f4efe8'} stroke={PIEL_B} strokeWidth={2.5} />
      <circle cx={x} cy={y - 10 * arriba} r={14} fill="#5a7a9a" />
      <circle cx={x} cy={y - 10 * arriba} r={6 - 3 * miosis} fill="#151a22" />
      {ptosis > 0 && <path d={`M${x - 44},${y - 2} C${x - 20},${y - 26} ${x + 20},${y - 26} ${x + 44},${y - 2} C${x + 20},${y - 26 + 22 * ptosis} ${x - 20},${y - 26 + 22 * ptosis} ${x - 44},${y - 2} Z`} fill={PIEL} stroke={PIEL_B} strokeWidth={2.5} />}
    </g>
  );
}

function Cabeza({ t, paso, dt, vistas = ['normal'] }: BaseFig & { vistas?: VistaCabeza[] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  const late = 0.55 + 0.45 * Math.abs(Math.sin(t * 3.2));
  const opr = 0.6 + 0.25 * Math.sin(t * 1.4);
  const cluster = v === 'periorbitario';
  const fp = v === 'facial-periferica';
  const fc = v === 'facial-central';
  const weber = v === 'weber-conduccion' || v === 'weber-percepcion';
  return (
    <svg viewBox="-24 0 856 600" role="img" aria-label="Cabeza de frente: localización de las cefaleas">
      <defs>
        <clipPath id="cab-izq">
          <rect x={0} y={0} width={400} height={600} />
        </clipPath>
        <clipPath id="cab-craneo">
          <path d={CRANEO} />
        </clipPath>
      </defs>
      {/* orejas, cara y pelo */}
      <ellipse cx={208} cy={300} rx={20} ry={42} fill={PIEL} stroke={PIEL_B} strokeWidth={2.5} />
      <ellipse cx={592} cy={300} rx={20} ry={42} fill={PIEL} stroke={PIEL_B} strokeWidth={2.5} />
      <path d={CRANEO} fill={PIEL} stroke={PIEL_B} strokeWidth={3} />
      <path d="M214,200 C220,100 300,40 400,40 C500,40 580,100 586,200 C560,140 500,110 400,112 C300,110 240,140 214,200 Z" fill="#4a3a32" opacity={0.9} />
      {/* zonas */}
      <g clipPath="url(#cab-craneo)">
        {v === 'hemicraneal' || v === 'aura' ? (
          <g clipPath="url(#cab-izq)" opacity={u}>
            <ellipse cx={330} cy={200} rx={200} ry={190} fill="var(--v-red)" opacity={0.18 + 0.32 * late} />
          </g>
        ) : null}
        {v === 'holocraneana' && <ellipse cx={400} cy={220} rx={240} ry={210} fill="var(--v-red)" opacity={(0.15 + 0.25 * opr) * u} />}
        {v === 'vincha' && (
          <g opacity={u}>
            <path d="M200,196 C270,160 530,160 600,196 L600,262 C530,226 270,226 200,262 Z" fill="var(--v-peach)" opacity={0.3 + 0.25 * opr} />
            <path d="M200,196 C270,160 530,160 600,196" stroke="var(--v-peach)" strokeWidth={4} fill="none" />
            <path d="M200,262 C270,226 530,226 600,262" stroke="var(--v-peach)" strokeWidth={4} fill="none" />
          </g>
        )}
        {v === 'trigemino' && (
          <g opacity={u}>
            <path d={V_ZONAS.v1} fill="var(--v-sky)" opacity={0.4} />
            <path d={V_ZONAS.v2} fill="var(--v-red)" opacity={0.25 + 0.35 * late} />
            <path d={V_ZONAS.v3} fill="var(--v-peach)" opacity={0.4} />
          </g>
        )}
      </g>
      {/* cejas, ojos, nariz, boca */}
      <path d="M290,232 C312,218 352,216 378,226" stroke="#4a3a32" strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d="M422,226 C448,216 488,218 510,232" stroke="#4a3a32" strokeWidth={6} fill="none" strokeLinecap="round" />
      {cluster && <ellipse cx={335} cy={270} rx={74} ry={56} fill="var(--v-red)" opacity={(0.15 + 0.3 * late) * u} />}
      <Ojo x={335} y={272} rojo={cluster ? u : 0} ptosis={cluster ? 0.45 * u : 0} miosis={cluster ? u : 0} cerrado={fc} arriba={fp ? u : 0} />
      <Ojo x={465} y={272} cerrado={fp || fc} />
      {(fp || fc) && (
        <g stroke={PIEL_B} strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.85}>
          {[150, 166, 182].map((y) => (
            <g key={y}>
              {fc && <path d={`M300,${y + 8} C330,${y} 360,${y} 390,${y + 4}`} />}
              <path d={`M410,${y + 4} C440,${y} 470,${y} 500,${y + 8}`} />
            </g>
          ))}
        </g>
      )}
      <path d="M400,286 C396,330 386,360 378,374 C392,386 408,386 422,374 C414,360 404,330 400,286" fill="none" stroke={PIEL_B} strokeWidth={2.5} />
      <path d={fp || fc ? `M352,${444 + 22 * u} C372,${448 + 12 * u} 410,${452} 456,${436 - 6 * u}` : 'M352,444 C380,458 420,458 448,444'} fill="none" stroke="#8a4a4a" strokeWidth={4} strokeLinecap="round" />
      {fp && <path d="M366,380 C350,400 345,420 350,436" stroke={PIEL_B} strokeWidth={2} fill="none" opacity={0.3} />}
      {(fp || fc) && <path d="M434,380 C452,400 458,420 456,434" stroke={PIEL_B} strokeWidth={2.5} fill="none" opacity={0.8} />}
      {weber && (
        <g opacity={u}>
          <path d="M392,6 L392,40 M408,6 L408,40 M392,40 C392,50 408,50 408,40 M400,50 L400,62" stroke="#b8b8c0" strokeWidth={6} fill="none" strokeLinecap="round" />
          {[0, 1, 2].map((i) => {
            const k = (t * 0.8 + i / 3) % 1;
            const dest = v === 'weber-conduccion' ? 208 : 592;
            return <circle key={i} cx={400 + (dest - 400) * k} cy={70 + 230 * k} r={9} fill="var(--v-gold)" opacity={1 - k * 0.6} />;
          })}
          <ellipse cx={v === 'weber-conduccion' ? 208 : 592} cy={300} rx={34} ry={56} fill="none" stroke="var(--v-gold)" strokeWidth={4} opacity={0.5 + 0.5 * late} />
        </g>
      )}
      {cluster &&
        [0, 1, 2].map((i) => {
          const k = (t * 0.6 + i / 3) % 1;
          return <path key={i} d={`M${318 + i * 12},${296 + k * 90} q-7,12 0,18 q7,-6 0,-18`} fill="var(--v-sky)" opacity={u * (1 - k)} />;
        })}
      {cluster && <path d={`M384,384 q-6,${10 + 10 * late} 0,${20 + 10 * late} q6,-8 0,-${20 + 10 * late}`} fill="var(--v-sky)" opacity={u} />}
      {/* rayo de la neuralgia */}
      {v === 'trigemino' && (
        <path d="M300,300 L330,330 L310,336 L346,372" stroke="var(--v-gold)" strokeWidth={6} fill="none" strokeLinejoin="round" opacity={late * u} />
      )}
      {/* aura: espectro en zigzag */}
      {v === 'aura' && (
        <g opacity={u} transform={`translate(680 210) rotate(${(t * 12) % 360})`}>
          <path d={Array.from({ length: 13 }, (_, i) => {
            const a = -Math.PI * 0.9 + (i / 12) * Math.PI * 1.1;
            const r = i % 2 ? 58 : 76;
            return `${i ? 'L' : 'M'}${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`;
          }).join(' ')} stroke="var(--v-gold)" strokeWidth={5} fill="none" opacity={late} />
        </g>
      )}
      {/* rótulos */}
      {v === 'hemicraneal' && (
        <L x={400} y={572} c="var(--v-red)" s={22} o={u}>
          Hemicraneal, pulsátil, moderada a severa
        </L>
      )}
      {v === 'aura' && (
        <>
          <L x={626} y={318} a="start" c="var(--v-gold)" s={20} o={u}>
            Aura: escotomas,
          </L>
          <L x={626} y={344} a="start" c="var(--v-gold)" s={20} o={u}>
            destellos (5–60 min)
          </L>
          <L x={400} y={572} c="var(--v-red)" s={22} o={u}>
            Después, la cefalea (dentro de los 60 minutos)
          </L>
        </>
      )}
      {v === 'vincha' && (
        <L x={400} y={572} c="var(--v-peach)" s={22} o={u}>
          En vincha: bilateral, opresiva, leve a moderada
        </L>
      )}
      {cluster && (
        <>
          <L x={190} y={180} a="end" c="var(--v-red)" s={20} o={u}>
            Periorbitario
          </L>
          <L x={190} y={206} a="end" c="var(--v-red)" s={20} o={u}>
            y unilateral
          </L>
          <L x={626} y={260} a="start" c="var(--v-sky)" s={20} o={u}>
            Ojo rojo, lagrimeo,
          </L>
          <L x={626} y={286} a="start" c="var(--v-sky)" s={20} o={u}>
            congestión nasal,
          </L>
          <L x={626} y={312} a="start" c="var(--v-sky)" s={20} o={u}>
            ptosis y miosis
          </L>
          <L x={400} y={572} c="var(--v-red)" s={22} o={u}>
            Hombre, de noche, por crisis (racimos)
          </L>
        </>
      )}
      {v === 'trigemino' && (
        <>
          <L x={186} y={150} a="end" c="var(--v-sky)" s={20} o={u}>
            V1 oftálmica
          </L>
          <L x={186} y={384} a="end" c="var(--v-red)" s={20} o={u}>
            V2 maxilar sup.
          </L>
          <L x={186} y={476} a="end" c="var(--v-peach)" s={20} o={u}>
            V3 maxilar inf.
          </L>
          <L x={400} y={572} c="var(--v-gold)" s={22} o={u}>
            Descarga eléctrica de segundos, de un solo lado
          </L>
        </>
      )}
      {v === 'holocraneana' && (
        <L x={400} y={572} c="var(--v-red)" s={22} o={u}>
          Holocraneana
        </L>
      )}
      {fp && (
        <>
          <L x={186} y={160} a="end" c="var(--v-red)" s={20} o={u}>Frente lisa</L>
          <L x={186} y={272} a="end" c="var(--v-red)" s={20} o={u}>No cierra: Bell</L>
          <L x={400} y={572} c="var(--v-red)" s={22} o={u}>Periférica: toda la hemicara (frente incluida)</L>
        </>
      )}
      {fc && (
        <>
          <L x={186} y={160} a="end" c="var(--v-mint)" s={20} o={u}>Frente sana</L>
          <L x={186} y={460} a="end" c="var(--v-red)" s={20} o={u}>Boca caída</L>
          <L x={400} y={572} c="var(--v-red)" s={22} o={u}>Central: solo la mitad inferior de la cara</L>
        </>
      )}
      {weber && (
        <>
          <L x={186} y={380} a="end" c="var(--v-red)" s={20} o={u}>Oído enfermo</L>
          <L x={400} y={572} c="var(--v-gold)" s={22} o={u}>
            {v === 'weber-conduccion' ? 'Conducción: se oye más en el oído enfermo' : 'Percepción: se oye más en el oído sano'}
          </L>
        </>
      )}
      {v === 'normal' && (
        <L x={400} y={572} c={INK3} s={20}>
          Cabeza de frente (la derecha del paciente, a la izquierda)
        </L>
      )}
    </svg>
  );
}

/* ─────────── Núcleos de la base: corte coronal ─────────── */

export type ParteNuc = 'caudado' | 'putamen' | 'palido' | 'talamo' | 'subtalamico' | 'negra';

export interface VistaNuc {
  luz?: ParteNuc[];
  lesion?: ParteNuc[];
  /** Solo un lado (el izquierdo del paciente, a la derecha del dibujo). */
  unLado?: boolean;
  /** Vía nigroestriada (dopamina): 'normal' o 'baja'. */
  dopamina?: 'normal' | 'baja';
  tone?: VTone;
  nota?: string;
  notaTone?: VTone;
}

const NUC_BASE: Record<ParteNuc, string> = {
  caudado: '#8e7a8a',
  putamen: '#8e7a8a',
  palido: '#b9a7ad',
  talamo: '#9a8090',
  subtalamico: '#7a6070',
  negra: '#2b2228',
};
const NUC_ETQ: Record<ParteNuc, { x: number; y: number; a?: 'start' | 'middle' | 'end'; n: string }> = {
  caudado: { x: 486, y: 128, a: 'start', n: 'Caudado' },
  putamen: { x: 560, y: 200, a: 'start', n: 'Putamen' },
  palido: { x: 548, y: 336, a: 'start', n: 'Globo pálido' },
  talamo: { x: 460, y: 232, a: 'start', n: 'Tálamo' },
  subtalamico: { x: 468, y: 372, a: 'start', n: 'Subtalámico (Luys)' },
  negra: { x: 470, y: 410, a: 'start', n: 'Sustancia negra' },
};

function NucForma({ p, k, fill, stroke, w }: { p: ParteNuc; k: 1 | -1; fill: string; stroke: string; w: number }) {
  const x = (d: number) => 400 + k * d;
  switch (p) {
    case 'caudado':
      return <ellipse cx={x(50)} cy={188} rx={24} ry={36} fill={fill} stroke={stroke} strokeWidth={w} />;
    case 'putamen':
      return <path d={`M${x(110)},210 C${x(140)},226 ${x(142)},300 ${x(112)},318 C${x(96)},300 ${x(94)},232 ${x(110)},210 Z`} fill={fill} stroke={stroke} strokeWidth={w} />;
    case 'palido':
      return <path d={`M${x(84)},236 C${x(96)},252 ${x(96)},290 ${x(84)},304 C${x(72)},290 ${x(72)},250 ${x(84)},236 Z`} fill={fill} stroke={stroke} strokeWidth={w} />;
    case 'talamo':
      return <ellipse cx={x(30)} cy={282} rx={26} ry={34} fill={fill} stroke={stroke} strokeWidth={w} />;
    case 'subtalamico':
      return <ellipse cx={x(40)} cy={334} rx={18} ry={8} fill={fill} stroke={stroke} strokeWidth={w} />;
    case 'negra':
      return <path d={`M${x(14)},392 C${x(30)},384 ${x(44)},380 ${x(54)},370`} fill="none" stroke={stroke} strokeWidth={10} strokeLinecap="round" />;
  }
}

function Nucleos({ t, paso, dt, vistas = [{}] }: BaseFig & { vistas?: VistaNuc[] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  const tone = v.tone ?? 'lilac';
  const luz = new Set(v.luz ?? []);
  const les = new Set(v.lesion ?? []);
  const lat = 0.5 + 0.5 * Math.sin(t * 3);
  const parte = (p: ParteNuc, k: 1 | -1) => {
    const activo = (les.has(p) || luz.has(p)) && (!v.unLado || k === 1);
    const c = les.has(p) ? ROJO : col(tone);
    const fill = activo ? `color-mix(in srgb, ${c} ${les.has(p) ? Math.round(45 + 25 * lat * u) : 60}%, ${NUC_BASE[p]})` : NUC_BASE[p];
    const stroke = p === 'negra' ? (activo ? c : NUC_BASE[p]) : activo ? c : '#5d4a56';
    return <NucForma key={`${p}${k}`} p={p} k={k} fill={fill} stroke={stroke} w={activo ? 4 : 2} />;
  };
  const mostrar = new Set<ParteNuc>([...(v.luz ?? []), ...(v.lesion ?? [])]);
  const via = v.dopamina;
  const dpath = 'M452,372 C468,330 470,280 462,240 C458,220 454,206 450,194';
  return (
    <svg viewBox="40 20 720 530" role="img" aria-label="Corte coronal del cerebro: núcleos de la base">
      {/* hemisferios: sustancia blanca y corteza */}
      <path d="M400,60 C300,40 160,70 120,170 C96,240 110,330 160,380 C190,410 230,420 260,410 C290,402 320,396 350,392 L350,470 L450,470 L450,392 C480,396 510,402 540,410 C570,420 610,410 640,380 C690,330 704,240 680,170 C640,70 500,40 400,60 Z" fill="#e3d6cf" stroke="#8f7a86" strokeWidth={3} />
      <path d="M400,60 C300,40 160,70 120,170 C96,240 110,330 160,380 C190,410 230,420 260,410 C290,402 320,396 350,392" fill="none" stroke="#a8919c" strokeWidth={22} opacity={0.75} />
      <path d="M450,392 C480,396 510,402 540,410 C570,420 610,410 640,380 C690,330 704,240 680,170 C640,70 500,40 400,60" fill="none" stroke="#a8919c" strokeWidth={22} opacity={0.75} />
      <path d="M400,60 L400,150" stroke="#8f7a86" strokeWidth={4} />
      {/* ventrículos laterales y tercero */}
      <path d="M392,160 C380,150 362,150 354,160 C348,176 358,196 372,206 L392,214 Z" fill="#2b3550" opacity={0.85} />
      <path d="M408,160 C420,150 438,150 446,160 C452,176 442,196 428,206 L408,214 Z" fill="#2b3550" opacity={0.85} />
      <rect x={396} y={250} width={8} height={70} rx={4} fill="#2b3550" opacity={0.85} />
      {/* núcleos */}
      {(['caudado', 'putamen', 'palido', 'talamo', 'subtalamico'] as const).flatMap((p) => [parte(p, -1), parte(p, 1)])}
      {/* mesencéfalo con la sustancia negra */}
      <path d="M350,360 C370,352 430,352 450,360 L452,430 C430,440 370,440 348,430 Z" fill="#c9b3ad" stroke="#8f7a86" strokeWidth={2.5} />
      {parte('negra', -1)}
      {parte('negra', 1)}
      {/* vía nigroestriada */}
      {via && (
        <g opacity={u}>
          <Via d={dpath} c={via === 'baja' ? ROJO : 'var(--v-gold)'} w={4} o={0.6} dash={via === 'baja' ? '6 8' : undefined} />
          <Pulso d={dpath} t={t} v={via === 'baja' ? 8 : 30} c="var(--v-gold)" w={9} largo={via === 'baja' ? 3 : 8} o={via === 'baja' ? 0.5 : 1} />
          <L x={230} y={490} c={via === 'baja' ? ROJO : 'var(--v-gold)'} s={20}>
            {via === 'baja' ? 'Falta dopamina en el estriado' : 'Dopamina: sustancia negra → estriado'}
          </L>
        </g>
      )}
      {[...mostrar].map((p) => {
        const e = NUC_ETQ[p];
        return (
          <L key={p} x={e.x} y={e.y} a={e.a ?? 'middle'} c={les.has(p) ? ROJO : col(tone)} s={20}>
            {e.n}
          </L>
        );
      })}
      {v.unLado && (
        <L x={400} y={496} c={INK2} s={20}>
          Lesión izquierda → síntomas a la derecha
        </L>
      )}
      {v.nota && (
        <L x={400} y={530} c={v.notaTone ? col(v.notaTone) : INK} s={21}>
          {v.nota}
        </L>
      )}
    </svg>
  );
}

/* ─────────── Vía motora: de la corteza al músculo ─────────── */

export type NivelMotor = 'corteza' | 'capsula' | 'tronco' | 'medula' | 'asta' | 'nervio' | 'placa' | 'musculo';
export type PatronCuerpo = 'hemi' | 'distal' | 'proximal' | 'ascendente' | 'ocular' | 'alterna-iii' | 'alterna-vii' | 'paraplejia' | 'ninguno';

export interface VistaMotora {
  lesion?: NivelMotor;
  cuerpo?: PatronCuerpo;
  tone?: VTone;
  nota?: string;
  notaTone?: VTone;
}

const VM = {
  primera: 'M420,92 C400,120 380,150 368,178 C356,210 350,250 346,290 C344,320 342,346 336,362 C330,376 322,386 314,396 L312,520',
  segunda: 'M312,520 C300,528 280,534 252,538 L190,540',
};
const VM_NIVEL: Record<NivelMotor, { x: number; y: number; n: string; lx: number; ly: number; a: 'start' | 'middle' | 'end' }> = {
  corteza: { x: 420, y: 92, n: 'Corteza motora', lx: 450, ly: 80, a: 'start' },
  capsula: { x: 368, y: 178, n: 'Cápsula interna', lx: 400, ly: 182, a: 'start' },
  tronco: { x: 346, y: 290, n: 'Tronco', lx: 378, ly: 290, a: 'start' },
  medula: { x: 312, y: 450, n: 'Médula', lx: 380, ly: 450, a: 'start' },
  asta: { x: 312, y: 520, n: 'Asta anterior', lx: 380, ly: 520, a: 'start' },
  nervio: { x: 245, y: 538, n: 'Nervio periférico', lx: 245, ly: 580, a: 'middle' },
  placa: { x: 190, y: 540, n: 'Placa neuromuscular', lx: 190, ly: 580, a: 'middle' },
  musculo: { x: 140, y: 540, n: 'Músculo', lx: 140, ly: 580, a: 'middle' },
};

function Cuerpo({ patron, u, lat, t }: { patron: PatronCuerpo; u: number; lat: number; t: number }) {
  const op = (0.3 + 0.4 * lat) * u;
  const R = 'var(--v-red)';
  const sube = ((t * 0.25) % 1) * 0.85 + 0.15;
  return (
    <g transform="translate(560 130)">
      <circle cx={100} cy={30} r={26} fill="#d9b7a0" stroke="#8a6a58" strokeWidth={2.5} />
      <path d="M70,62 L130,62 L142,170 L120,170 L118,220 L132,330 L110,330 L100,232 L90,330 L68,330 L82,220 L80,170 L58,170 Z" fill="#d9b7a0" stroke="#8a6a58" strokeWidth={2.5} />
      <path d="M70,62 L40,90 L24,180 L40,182 L56,104 Z M130,62 L160,90 L176,180 L160,182 L144,104 Z" fill="#d9b7a0" stroke="#8a6a58" strokeWidth={2.5} />
      {(patron === 'alterna-iii' || patron === 'alterna-vii' || patron === 'paraplejia') && (
        <g opacity={op} fill={R}>
          {patron !== 'paraplejia' && <path d="M100,62 L70,62 L40,90 L24,180 L40,182 L56,104 L58,170 L80,170 L82,220 L68,330 L90,330 L100,232 Z" />}
          {patron === 'alterna-iii' && <circle cx={111} cy={26} r={9} />}
          {patron === 'alterna-vii' && <path d="M100,4 C116,4 126,16 126,30 C126,46 114,56 100,56 Z" />}
          {patron === 'paraplejia' && <path d="M82,220 L68,330 L90,330 L100,232 L110,330 L132,330 L118,220 Z" />}
        </g>
      )}
      {patron === 'hemi' && (
        <g opacity={op} fill={R}>
          <path d="M100,4 C84,4 74,16 74,30 C74,46 86,56 100,56 Z" />
          <path d="M100,62 L70,62 L40,90 L24,180 L40,182 L56,104 L58,170 L80,170 L82,220 L68,330 L90,330 L100,232 Z" />
        </g>
      )}
      {patron === 'distal' && (
        <g opacity={op} fill={R}>
          <circle cx={32} cy={184} r={15} />
          <circle cx={168} cy={184} r={15} />
          <rect x={64} y={280} width={30} height={52} rx={8} />
          <rect x={106} y={280} width={30} height={52} rx={8} />
        </g>
      )}
      {patron === 'proximal' && (
        <g opacity={op} fill={R}>
          <ellipse cx={58} cy={82} rx={26} ry={22} />
          <ellipse cx={142} cy={82} rx={26} ry={22} />
          <ellipse cx={100} cy={178} rx={48} ry={26} />
        </g>
      )}
      {patron === 'ascendente' && (
        <g opacity={u}>
          <clipPath id="mot-asc">
            <rect x={0} y={330 - 330 * sube} width={200} height={330 * sube} />
          </clipPath>
          <g clipPath="url(#mot-asc)" fill={R} opacity={0.5}>
            <path d="M70,62 L130,62 L142,170 L120,170 L118,220 L132,330 L110,330 L100,232 L90,330 L68,330 L82,220 L80,170 L58,170 Z" />
          </g>
          <path d="M190,300 L190,120 M180,136 L190,120 L200,136" stroke={R} strokeWidth={4} fill="none" />
        </g>
      )}
      {patron === 'ocular' && (
        <g opacity={u}>
          <path d="M82,24 L98,24 M102,24 L118,24" stroke={R} strokeWidth={5} strokeLinecap="round" />
          <path d={`M82,${20 + 4 * lat} C88,${16 + 4 * lat} 92,${16 + 4 * lat} 98,${20 + 4 * lat} M102,${20 + 4 * lat} C108,${16 + 4 * lat} 112,${16 + 4 * lat} 118,${20 + 4 * lat}`} stroke="#8a6a58" strokeWidth={3} fill="none" />
        </g>
      )}
      <L x={100} y={-12} c={INK3} s={18}>
        Paciente de frente
      </L>
      <L x={40} y={358} c={INK3} s={18}>
        derecho
      </L>
      <L x={160} y={358} c={INK3} s={18}>
        izquierdo
      </L>
    </g>
  );
}

function Motora({ t, paso, dt, vistas = [{}] }: BaseFig & { vistas?: VistaMotora[] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  const tone = v.tone ?? 'sky';
  const lat = 0.5 + 0.5 * Math.sin(t * 3);
  const n = v.lesion ? VM_NIVEL[v.lesion] : undefined;
  const primeraLes = !!v.lesion && ['corteza', 'capsula', 'tronco', 'medula'].includes(v.lesion);
  const segundaLes = !!v.lesion && ['asta', 'nervio'].includes(v.lesion);
  return (
    <svg viewBox="80 20 700 590" role="img" aria-label="Vía motora: primera y segunda motoneurona">
      {/* cerebro coronal (la izquierda del paciente a la derecha del dibujo) */}
      <path d="M330,40 C250,30 180,60 170,120 C162,170 200,200 250,206 L300,206 L300,230 L360,230 L360,206 L410,206 C460,200 498,170 490,120 C480,60 410,30 330,40 Z" fill="#c9a9a5" stroke="#8d6f6b" strokeWidth={3} />
      <path d="M330,40 L330,140" stroke="#8d6f6b" strokeWidth={3} />
      {/* tronco y médula */}
      <path d="M306,230 L354,230 L352,300 C360,320 358,350 348,372 L340,400 L320,400 L312,372 C302,350 300,320 308,300 Z" fill="#b8948f" stroke="#7d5f5a" strokeWidth={2.5} />
      <rect x={296} y={400} width={68} height={140} rx={30} fill="#c4a59f" stroke="#7d5f5a" strokeWidth={2.5} />
      <path d="M330,404 L330,536" stroke="#7d5f5a" strokeWidth={1.5} strokeDasharray="5 5" opacity={0.6} />
      <L x={366} y={378} a="start" c={INK3} s={18}>
        decusación (bulbo)
      </L>
      {/* músculo y placa */}
      <path d="M100,540 C110,518 160,516 180,540 C160,564 110,562 100,540 Z" fill="#b5574f" stroke="#7d2f2a" strokeWidth={2.5} />
      <circle cx={190} cy={540} r={7} fill="var(--v-gold)" />
      {/* vías */}
      <Via d={VM.primera} c={col(tone)} w={5} o={0.7} />
      <Via d={VM.segunda} c="var(--v-mint)" w={5} o={0.7} />
      <Pulso d={VM.primera} t={t} v={25} c={col(tone)} w={10} largo={6} o={primeraLes ? 0.2 : 1} />
      <Pulso d={VM.segunda} t={t} v={25} c="var(--v-mint)" w={10} largo={14} o={primeraLes || segundaLes ? 0.2 : 1} />
      <circle cx={312} cy={520} r={9} fill="var(--v-mint)" />
      <L x={384} y={250} a="start" c={col(tone)} s={20}>
        1.ª motoneurona
      </L>
      <L x={210} y={496} c="var(--v-mint)" s={20}>
        2.ª motoneurona
      </L>
      {n && (
        <g opacity={u}>
          <circle cx={n.x} cy={n.y} r={16 + 4 * lat} fill="none" stroke={ROJO} strokeWidth={5} />
          <path d={`M${n.x - 10},${n.y - 10} L${n.x + 10},${n.y + 10} M${n.x + 10},${n.y - 10} L${n.x - 10},${n.y + 10}`} stroke={ROJO} strokeWidth={5} />
          <L x={n.lx} y={n.ly} a={n.a} c={ROJO} s={20}>
            {n.n}
          </L>
        </g>
      )}
      {v.cuerpo && v.cuerpo !== 'ninguno' && <Cuerpo patron={v.cuerpo} u={u} lat={lat} t={t} />}
      {v.nota && (
        <L x={430} y={600} c={v.notaTone ? col(v.notaTone) : INK} s={21}>
          {v.nota}
        </L>
      )}
    </svg>
  );
}

/* ─────────── Temblor: tres trazados ─────────── */

export type TipoTemblor = 'reposo' | 'postural' | 'intencional';

function Temblor({ t, paso, dt, vistas = [['reposo', 'postural', 'intencional']] }: BaseFig & { vistas?: TipoTemblor[][] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  const filas: { k: TipoTemblor; y: number; t1: string; t2: string; tone: VTone }[] = [
    { k: 'reposo', y: 110, t1: 'De reposo: Parkinson', t2: 'Lento y grosero; cede al moverse', tone: 'lilac' },
    { k: 'postural', y: 270, t1: 'Postural: fisiológico, esencial', t2: 'Fino y rápido, brazos extendidos', tone: 'sky' },
    { k: 'intencional', y: 430, t1: 'Intencional: cerebeloso', t2: 'Aumenta cerca del objetivo', tone: 'peach' },
  ];
  const traza = (k: TipoTemblor, y0: number) => {
    const pts: string[] = [];
    for (let x = 330; x <= 760; x += 3) {
      const s = (x - 330) / 430;
      let a = 12;
      let f = 11;
      if (k === 'reposo') {
        a = s > 0.6 && s < 0.86 ? 5 : 34;
        f = 5;
      } else if (k === 'intencional') {
        a = 4 + 44 * s * s;
        f = 6;
      }
      const y = y0 + a * Math.sin(s * f * 2 * Math.PI * 2 - t * f * 1.5);
      pts.push(`${x === 330 ? 'M' : 'L'}${x},${y.toFixed(1)}`);
    }
    return pts.join(' ');
  };
  return (
    <svg viewBox="0 30 800 490" role="img" aria-label="Tres tipos de temblor">
      {filas.map((f) => {
        const on = v.includes(f.k);
        return (
          <g key={f.k} opacity={on ? 0.35 + 0.65 * u : 0.25}>
            <rect x={318} y={f.y - 64} width={466} height={128} rx={14} fill="none" stroke={col(f.tone)} strokeWidth={on ? 3 : 1.5} opacity={0.7} />
            <path d={traza(f.k, f.y)} fill="none" stroke={col(f.tone)} strokeWidth={4} strokeLinejoin="round" />
            {f.k === 'reposo' && (
              <L x={330 + 0.73 * 430} y={f.y - 48} c={INK2} s={18}>
                al moverse
              </L>
            )}
            {f.k === 'intencional' && <circle cx={766} cy={f.y} r={10} fill="none" stroke={INK2} strokeWidth={3} />}
            <L x={300} y={f.y - 14} a="end" c={col(f.tone)} s={21}>
              {f.t1}
            </L>
            <L x={300} y={f.y + 16} a="end" c={INK2} s={18} w={500}>
              {f.t2}
            </L>
          </g>
        );
      })}
    </svg>
  );
}

/* ─────────── Crisis tónico-clónica: las fases ─────────── */

export type FaseCrisis = 'aura' | 'tonica' | 'clonica' | 'postictal';

function Crisis({ t, paso, dt, vistas = [['aura', 'tonica', 'clonica', 'postictal']] }: BaseFig & { vistas?: FaseCrisis[][] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  const fases: { k: FaseCrisis; x0: number; x1: number; n: string; d: string; tone: VTone }[] = [
    { k: 'aura', x0: 40, x1: 170, n: 'Aura', d: 'El aviso', tone: 'gold' },
    { k: 'tonica', x0: 170, x1: 340, n: 'Tónica', d: 'Rígido, arqueado', tone: 'red' },
    { k: 'clonica', x0: 340, x1: 560, n: 'Clónica', d: 'Sacudidas, saliva', tone: 'peach' },
    { k: 'postictal', x0: 560, x1: 760, n: 'Postictal', d: 'Débil, confuso', tone: 'sky' },
  ];
  const pts: string[] = [];
  for (let x = 40; x <= 760; x += 2) {
    let a = 2 * Math.sin(x * 0.5 + t * 3);
    if (x < 170) a = 6 * Math.sin(x * 0.9 + t * 8);
    else if (x < 340) a = 46 * Math.sin(x * 2.3 + t * 30) * (0.8 + 0.2 * Math.sin(x));
    else if (x < 560) {
      const fase = ((x - 340) / 220) * 9;
      a = 50 * (Math.sin(fase * Math.PI * 2) > 0.2 ? 1 : 0.08) * Math.sin(x * 2.1 + t * 30);
    }
    pts.push(`${x === 40 ? 'M' : 'L'}${x},${(170 + a).toFixed(1)}`);
  }
  const cursor = 40 + ((t * 70) % 720);
  return (
    <svg viewBox="20 30 760 400" role="img" aria-label="Fases de la crisis tónico-clónica">
      <L x={400} y={64} c={INK2} s={20}>
        Actividad muscular durante la crisis
      </L>
      <path d={pts.join(' ')} fill="none" stroke={INK2} strokeWidth={3} />
      <line x1={cursor} x2={cursor} y1={100} y2={240} stroke="var(--v-gold)" strokeWidth={2} opacity={0.6} />
      {fases.map((f) => {
        const on = v.includes(f.k);
        return (
          <g key={f.k} opacity={on ? 0.4 + 0.6 * u : 0.3}>
            <rect x={f.x0 + 4} y={270} width={f.x1 - f.x0 - 8} height={110} rx={14} fill={`color-mix(in srgb, ${col(f.tone)} 22%, transparent)`} stroke={col(f.tone)} strokeWidth={on ? 3 : 1.5} />
            <L x={(f.x0 + f.x1) / 2} y={306} c={col(f.tone)} s={22}>
              {f.n}
            </L>
            <L x={(f.x0 + f.x1) / 2} y={344} c={INK} s={18} w={500}>
              {f.d}
            </L>
          </g>
        );
      })}
    </svg>
  );
}

/* ─────────── Hipnograma: las etapas del sueño ─────────── */

export type EtapaSueno = 'vigilia' | 'rem' | 'n1' | 'n2' | 'n34';

function Sueno({ t, paso, dt, vistas = [['rem', 'n34']] }: BaseFig & { vistas?: EtapaSueno[][] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  const Y: Record<EtapaSueno, number> = { vigilia: 90, rem: 150, n1: 210, n2: 270, n34: 330 };
  const N: Record<EtapaSueno, string> = { vigilia: 'Vigilia', rem: 'REM', n1: 'No REM 1', n2: 'No REM 2', n34: 'No REM 3–4' };
  const sec: [EtapaSueno, number][] = [
    ['vigilia', 0], ['n1', 0.2], ['n2', 0.35], ['n34', 0.6], ['n2', 1.1], ['rem', 1.3], ['n2', 1.5], ['n34', 1.8], ['n2', 2.3], ['rem', 2.7], ['n2', 3.0],
    ['n34', 3.3], ['n2', 3.6], ['rem', 4.1], ['n2', 4.6], ['n1', 5.2], ['n2', 5.4], ['rem', 5.8], ['n2', 6.5], ['rem', 7.0], ['vigilia', 7.8], ['vigilia', 8],
  ];
  const X = (h: number) => 190 + (h / 8) * 570;
  let d = '';
  sec.forEach(([e, h], i) => {
    d += i === 0 ? `M${X(h)},${Y[e]}` : ` L${X(h)},${Y[sec[i - 1][0]]} L${X(h)},${Y[e]}`;
  });
  const cursor = X((t * 0.5) % 8);
  const color = (e: EtapaSueno) => (e === 'rem' ? 'var(--v-lilac)' : 'var(--v-sky)');
  return (
    <svg viewBox="0 50 800 390" role="img" aria-label="Hipnograma: etapas del sueño a lo largo de la noche">
      {(Object.keys(Y) as EtapaSueno[]).map((e) => (
        <g key={e}>
          <line x1={190} x2={760} y1={Y[e]} y2={Y[e]} stroke="var(--v-line)" strokeWidth={1} opacity={0.5} />
          <L x={176} y={Y[e]} a="end" c={v.includes(e) ? color(e) : INK3} s={20}>
            {N[e]}
          </L>
        </g>
      ))}
      {sec.map(([e, h], i) => {
        if (i === sec.length - 1 || !v.includes(e)) return null;
        return <rect key={i} x={X(h)} y={Y[e] - 14} width={X(sec[i + 1][1]) - X(h)} height={28} rx={6} fill={color(e)} opacity={0.35 * u} />;
      })}
      <path d={d} fill="none" stroke={INK} strokeWidth={3.5} strokeLinejoin="round" />
      <line x1={cursor} x2={cursor} y1={70} y2={350} stroke="var(--v-gold)" strokeWidth={2} opacity={0.6} />
      {[0, 2, 4, 6, 8].map((h) => (
        <L key={h} x={X(h)} y={376} c={INK3} s={18}>
          {`${h} h`}
        </L>
      ))}
      <L x={475} y={418} c={INK2} s={20}>
        Ciclos de unos 90 minutos; el REM se alarga hacia la mañana
      </L>
    </svg>
  );
}

/* ─────────── Vía óptica vista desde arriba, con los campos visuales ─────────── */

export type LesionOptica = 'nervio' | 'quiasma' | 'cintilla' | 'radiacion-inf' | 'radiacion-sup' | 'corteza';

export interface VistaOptica {
  lesion?: LesionOptica;
  fibras?: boolean;
  fotomotor?: boolean;
  nota?: string;
  notaTone?: VTone;
}

// Desde arriba con la cara hacia arriba: el ojo izquierdo del paciente queda a la izquierda del dibujo.
const VO = {
  izqTemp: 'M250,206 C260,240 300,282 368,304 C340,332 312,370 300,400',
  izqNas: 'M290,210 C302,250 340,286 400,300 C450,316 482,360 500,400',
  derTemp: 'M550,206 C540,240 500,282 432,304 C460,332 488,370 500,400',
  derNas: 'M510,210 C498,250 460,286 400,300 C350,316 318,360 300,400',
  izqSup: 'M300,400 C312,450 322,500 334,552',
  izqInf: 'M300,400 C232,430 244,510 316,560',
  derSup: 'M500,400 C488,450 478,500 466,552',
  derInf: 'M500,400 C568,430 556,510 484,560',
  aferente: 'M478,362 C450,392 420,410 400,432',
  eferenteI: 'M400,432 C370,400 320,330 292,226',
  eferenteD: 'M400,432 C430,400 480,330 508,226',
};
const VO_MARCA: Record<LesionOptica, [number, number, number]> = {
  nervio: [279, 258, 30],
  quiasma: [400, 300, 0],
  cintilla: [326, 352, 60],
  'radiacion-inf': [254, 478, 10],
  'radiacion-sup': [318, 478, -10],
  corteza: [320, 566, 0],
};

function Campo({ cx, cy, ojo, lesion, u }: { cx: number; cy: number; ojo: 'izq' | 'der'; lesion?: LesionOptica; u: number }) {
  const r = 38;
  // Mitades del campo visual de cada ojo vistas por el paciente: la izquierda del dibujo es su izquierda.
  const negro: string[] = [];
  const izq = `M${cx},${cy - r} A${r},${r} 0 0 0 ${cx},${cy + r} Z`;
  const der = `M${cx},${cy - r} A${r},${r} 0 0 1 ${cx},${cy + r} Z`;
  const derSup = `M${cx},${cy} L${cx},${cy - r} A${r},${r} 0 0 1 ${cx + r},${cy} Z`;
  const derInf = `M${cx},${cy} L${cx + r},${cy} A${r},${r} 0 0 1 ${cx},${cy + r} Z`;
  if (lesion === 'nervio' && ojo === 'izq') negro.push(izq, der);
  if (lesion === 'quiasma') negro.push(ojo === 'izq' ? izq : der);
  if (lesion === 'cintilla' || lesion === 'corteza') negro.push(der);
  if (lesion === 'radiacion-inf') negro.push(derSup);
  if (lesion === 'radiacion-sup') negro.push(derInf);
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#f3eee6" stroke={INK2} strokeWidth={2.5} />
      {negro.map((d, i) => (
        <path key={i} d={d} fill="#15121a" opacity={u} />
      ))}
      <path d={`M${cx},${cy - r} L${cx},${cy + r} M${cx - r},${cy} L${cx + r},${cy}`} stroke={INK3} strokeWidth={1.2} opacity={0.6} />
    </g>
  );
}

function ViaOptica({ t, paso, dt, vistas = [{ fibras: true }] }: BaseFig & { vistas?: VistaOptica[] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  const TEMP = 'var(--v-sky)';
  const NAS = 'var(--v-red)';
  const fibras = v.fibras ?? true;
  const m = v.lesion ? VO_MARCA[v.lesion] : undefined;
  return (
    <svg viewBox="70 0 730 630" role="img" aria-label="Vía óptica vista desde arriba con los campos visuales de cada ojo">
      <Campo cx={270} cy={56} ojo="izq" lesion={v.lesion} u={u} />
      <Campo cx={530} cy={56} ojo="der" lesion={v.lesion} u={u} />
      <L x={222} y={56} a="end" c={INK2} s={18}>
        Campo OI
      </L>
      <L x={578} y={56} a="start" c={INK2} s={18}>
        Campo OD
      </L>
      {/* ojos */}
      {[270, 530].map((x) => (
        <g key={x}>
          <circle cx={x} cy={166} r={44} fill="#f2ede4" stroke="#8a7f72" strokeWidth={2.5} />
          <ellipse cx={x} cy={124} rx={18} ry={6} fill="#5a7a9a" />
        </g>
      ))}
      {/* corteza occipital */}
      <path d="M230,548 C260,600 340,606 392,566" fill="none" stroke="#a8919c" strokeWidth={18} strokeLinecap="round" />
      <path d="M570,548 C540,600 460,606 408,566" fill="none" stroke="#a8919c" strokeWidth={18} strokeLinecap="round" />
      {/* cuerpos geniculados y mesencéfalo */}
      <ellipse cx={300} cy={400} rx={16} ry={11} fill="#9a8090" />
      <ellipse cx={500} cy={400} rx={16} ry={11} fill="#9a8090" />
      {/* fibras */}
      <g fill="none" strokeLinecap="round" strokeWidth={5} opacity={fibras ? 0.95 : 0.35}>
        <path d={VO.izqTemp} stroke={TEMP} />
        <path d={VO.derTemp} stroke={TEMP} />
        <path d={VO.izqNas} stroke={NAS} />
        <path d={VO.derNas} stroke={NAS} />
        {[VO.izqSup, VO.izqInf, VO.derSup, VO.derInf].map((d) => (
          <path key={d} d={d} stroke={INK2} strokeWidth={4} />
        ))}
      </g>
      {fibras && (
        <g>
          {[VO.izqTemp, VO.derTemp].map((d, i) => (
            <Pulso key={d} d={d} t={t} v={22} c={TEMP} w={9} largo={6} desfase={i * 30} />
          ))}
          {[VO.izqNas, VO.derNas].map((d, i) => (
            <Pulso key={d} d={d} t={t} v={22} c={NAS} w={9} largo={6} desfase={15 + i * 30} />
          ))}
        </g>
      )}
      {v.fotomotor && (
        <g opacity={u}>
          <circle cx={400} cy={436} r={14} fill="var(--v-mint)" />
          <Via d={VO.aferente} c="var(--v-gold)" w={4} dash="7 6" />
          <Via d={VO.eferenteI} c="var(--v-mint)" w={4} dash="7 6" />
          <Via d={VO.eferenteD} c="var(--v-mint)" w={4} dash="7 6" />
          <Pulso d={VO.aferente} t={t} v={30} c="var(--v-gold)" w={9} largo={10} />
          <Pulso d={VO.eferenteI} t={t} v={30} c="var(--v-mint)" w={9} largo={8} desfase={40} />
          <Pulso d={VO.eferenteD} t={t} v={30} c="var(--v-mint)" w={9} largo={8} desfase={40} />
          <L x={400} y={470} c="var(--v-mint)" s={18}>
            Edinger-Westphal
          </L>
          <L x={96} y={300} a="start" c="var(--v-mint)" s={18}>
            III par: miosis
          </L>
        </g>
      )}
      {m && (
        <g opacity={u} transform={`translate(${m[0]} ${m[1]}) rotate(${m[2]})`}>
          <rect x={-24} y={-7} width={48} height={14} rx={5} fill={ROJO} />
        </g>
      )}
      {/* rótulos */}
      <L x={590} y={250} a="start" c={INK2} s={18}>
        Nervio óptico
      </L>
      <L x={590} y={300} a="start" c={INK2} s={18}>
        Quiasma
      </L>
      <L x={590} y={350} a="start" c={INK2} s={18}>
        Cintilla
      </L>
      <L x={590} y={400} a="start" c={INK2} s={18}>
        Geniculado (tálamo)
      </L>
      <L x={590} y={470} a="start" c={INK2} s={18}>
        Radiaciones
      </L>
      <L x={590} y={570} a="start" c={INK2} s={18}>
        Occipital (calcarina)
      </L>
      <L x={120} y={186} a="start" c={TEMP} s={18}>
        temporal
      </L>
      <L x={120} y={210} a="start" c={NAS} s={18}>
        nasal (cruza)
      </L>
      {v.nota && (
        <L x={400} y={618} c={v.notaTone ? col(v.notaTone) : INK} s={21}>
          {v.nota}
        </L>
      )}
    </svg>
  );
}

/* ─────────── Músculos del ojo y parálisis de los oculomotores ─────────── */

export type VistaOjos = 'musculos' | 'iii' | 'iii-parcial' | 'iv' | 'vi' | 'nistagmo' | 'normal';

function OjoFrente({ cx, cy, dx, dy, pr, ptosis }: { cx: number; cy: number; dx: number; dy: number; pr: number; ptosis: number }) {
  return (
    <g>
      <path d={`M${cx - 80},${cy} C${cx - 40},${cy - 52} ${cx + 40},${cy - 52} ${cx + 80},${cy} C${cx + 40},${cy + 48} ${cx - 40},${cy + 48} ${cx - 80},${cy} Z`} fill="#f4efe8" stroke="#8a6a58" strokeWidth={3} />
      <clipPath id={`ojo-${cx}`}>
        <path d={`M${cx - 80},${cy} C${cx - 40},${cy - 52} ${cx + 40},${cy - 52} ${cx + 80},${cy} C${cx + 40},${cy + 48} ${cx - 40},${cy + 48} ${cx - 80},${cy} Z`} />
      </clipPath>
      <g clipPath={`url(#ojo-${cx})`}>
        <circle cx={cx + dx} cy={cy + dy} r={28} fill="#5a7a9a" />
        <circle cx={cx + dx} cy={cy + dy} r={pr} fill="#151a22" />
        {ptosis > 0 && <rect x={cx - 90} y={cy - 60} width={180} height={20 + 70 * ptosis} fill="#d9b7a0" stroke="#8a6a58" strokeWidth={2} />}
      </g>
      <path d={`M${cx - 86},${cy - 64 + 70 * ptosis} C${cx - 40},${cy - 84 + 70 * ptosis} ${cx + 40},${cy - 84 + 70 * ptosis} ${cx + 86},${cy - 64 + 70 * ptosis}`} stroke="#4a3a32" strokeWidth={7} fill="none" strokeLinecap="round" opacity={ptosis ? 0 : 1} />
    </g>
  );
}

function Oculomotores({ t, paso, dt, vistas = ['musculos'] }: BaseFig & { vistas?: VistaOjos[] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  // Paciente de frente: su ojo derecho queda a la izquierda del dibujo (x 250); la nariz, hacia el centro.
  const D = 250;
  const I = 550;
  const Y = 200;
  let d = { dx: 0, dy: 0, pr: 10, ptosis: 0 };
  if (v === 'iii') d = { dx: -34 * u, dy: 16 * u, pr: 10 + 8 * u, ptosis: 0.5 * u };
  if (v === 'iii-parcial') d = { dx: -34 * u, dy: 16 * u, pr: 10, ptosis: 0.5 * u };
  if (v === 'iv') d = { dx: 6 * u, dy: -14 * u, pr: 10, ptosis: 0 };
  if (v === 'vi') d = { dx: 36 * u, dy: 0, pr: 10, ptosis: 0 };
  const ny = v === 'nistagmo' ? ((t * 2.2) % 1 < 0.8 ? -18 + 36 * (((t * 2.2) % 1) / 0.8) : 18 - 36 * ((((t * 2.2) % 1) - 0.8) / 0.2)) : 0;
  const C = 400;
  const flechas: { a: number; n: string; par: string; x: number; y: number; anc: 'start' | 'middle' | 'end' }[] = [
    { a: -90, n: 'Recto superior', par: 'III', x: C, y: 72, anc: 'middle' },
    { a: 90, n: 'Recto inferior', par: 'III', x: C, y: 330, anc: 'middle' },
    { a: 0, n: 'Recto interno', par: 'III', x: C + 140, y: Y, anc: 'start' },
    { a: 180, n: 'Recto externo', par: 'VI', x: C - 140, y: Y, anc: 'end' },
    { a: 45, n: 'Oblicuo superior', par: 'IV', x: C + 84, y: 292, anc: 'start' },
    { a: -45, n: 'Oblicuo inferior', par: 'III', x: C + 84, y: 110, anc: 'start' },
  ];
  const tone: Record<string, string> = { III: 'var(--v-sky)', IV: 'var(--v-gold)', VI: 'var(--v-peach)' };
  const nota: Partial<Record<VistaOjos, string>> = {
    iii: 'III: abajo y afuera, ptosis y midriasis',
    'iii-parcial': 'III parcial: igual, pero la pupila responde',
    iv: 'IV: el ojo queda alto; diplopía al mirar abajo',
    vi: 'VI: el ojo se desvía hacia adentro',
    nistagmo: 'Nistagmo: oscilación con fase lenta y fase rápida',
    musculos: 'Ojo derecho del paciente: cada músculo y su par',
  };
  return (
    <svg viewBox="0 20 800 380" role="img" aria-label="Músculos extraoculares y parálisis de los pares oculomotores">
      {v === 'musculos' ? (
        <OjoFrente cx={C} cy={Y} dx={0} dy={0} pr={10} ptosis={0} />
      ) : (
        <>
          <OjoFrente cx={D} cy={Y} dx={d.dx + ny} dy={d.dy} pr={d.pr} ptosis={d.ptosis} />
          <OjoFrente cx={I} cy={Y} dx={ny} dy={0} pr={10} ptosis={0} />
          <path d={`M${400},${Y - 30} C${392},${Y + 20} ${384},${Y + 60} ${380},${Y + 80}`} stroke="#8a6a58" strokeWidth={3} fill="none" opacity={0.6} />
        </>
      )}
      {v === 'musculos' &&
        flechas.map((f) => {
          const rad = (f.a * Math.PI) / 180;
          const x1 = C + Math.cos(rad) * 40;
          const y1 = Y + Math.sin(rad) * 40;
          const x2 = C + Math.cos(rad) * (f.a === 0 || f.a === 180 ? 128 : 100);
          const y2 = Y + Math.sin(rad) * 100;
          return (
            <g key={f.n}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={tone[f.par]} strokeWidth={5} markerEnd="url(#neu-flecha)" />
              <L x={f.x} y={f.y} a={f.anc} c={tone[f.par]} s={19}>
                {`${f.n} (${f.par})`}
              </L>
            </g>
          );
        })}
      <defs>
        <marker id="neu-flecha" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={5} markerHeight={5} orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill={INK2} />
        </marker>
      </defs>
      {v !== 'musculos' && (
        <>
          <L x={D} y={Y + 92} c={INK3} s={18}>
            Ojo derecho
          </L>
          <L x={I} y={Y + 92} c={INK3} s={18}>
            Ojo izquierdo
          </L>
        </>
      )}
      {nota[v] && (
        <L x={400} y={380} c={v === 'musculos' ? INK : 'var(--v-red)'} s={21}>
          {nota[v]}
        </L>
      )}
    </svg>
  );
}

/* ─────────── Tronco encefálico de frente: dónde nace cada par ─────────── */

export interface VistaTronco {
  luz?: number[];
  nivel?: ('mesencefalo' | 'protuberancia' | 'bulbo')[];
  nota?: string;
  notaTone?: VTone;
  tone?: VTone;
}

// Cada par: trazo del lado izquierdo del dibujo (se espeja) y posición del rótulo.
const PARES: Record<number, { d: string; lx: number; ly: number; n: string }> = {
  2: { d: 'M388,62 C360,46 330,36 300,30', lx: 290, ly: 30, n: 'II óptico' },
  3: { d: 'M388,170 C360,166 320,160 280,150', lx: 270, ly: 148, n: 'III motor ocular común' },
  4: { d: 'M332,186 C310,190 290,194 262,192', lx: 252, ly: 196, n: 'IV patético' },
  5: { d: 'M290,262 C270,258 250,254 226,248', lx: 216, ly: 248, n: 'V trigémino' },
  6: { d: 'M386,336 C372,300 350,260 330,226', lx: 316, ly: 222, n: 'VI motor ocular ext.' },
  7: { d: 'M318,338 C300,336 270,334 240,330', lx: 230, ly: 318, n: 'VII facial' },
  8: { d: 'M308,346 C290,350 262,356 236,360', lx: 226, ly: 360, n: 'VIII vestibulococlear' },
  9: { d: 'M318,384 C296,386 270,390 246,394', lx: 236, ly: 396, n: 'IX glosofaríngeo' },
  10: { d: 'M318,404 C296,410 270,418 246,426', lx: 236, ly: 428, n: 'X vago' },
  11: { d: 'M330,520 C318,486 312,462 300,452 C286,450 266,452 246,456', lx: 236, ly: 460, n: 'XI espinal' },
  12: { d: 'M356,404 C340,420 320,440 300,490', lx: 290, ly: 500, n: 'XII hipogloso' },
};

function TroncoPares({ t, paso, dt, vistas = [{ luz: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }] }: BaseFig & { vistas?: VistaTronco[] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  const tone = v.tone ?? 'gold';
  const luz = new Set(v.luz ?? []);
  const niv = new Set(v.nivel ?? []);
  const lat = 0.6 + 0.4 * Math.sin(t * 3);
  const fillNivel = (n: 'mesencefalo' | 'protuberancia' | 'bulbo', base: string) => (niv.has(n) ? `color-mix(in srgb, ${col(tone)} ${Math.round(30 + 25 * lat * u)}%, ${base})` : base);
  return (
    <svg viewBox="0 10 800 600" role="img" aria-label="Tronco encefálico visto de frente con el origen aparente de los pares craneales">
      {/* quiasma */}
      <path d="M370,60 L430,60 L420,78 L380,78 Z" fill="#c9b3ad" stroke="#8d6f6b" strokeWidth={2} />
      {/* mesencéfalo: pedúnculos */}
      <path d="M360,80 C340,110 330,150 340,196 L392,196 L392,90 Z M440,80 C460,110 470,150 460,196 L408,196 L408,90 Z" fill={fillNivel('mesencefalo', '#b8948f')} stroke="#7d5f5a" strokeWidth={2.5} />
      {/* protuberancia */}
      <path d="M300,196 C270,230 270,300 310,336 L490,336 C530,300 530,230 500,196 Z" fill={fillNivel('protuberancia', '#c49f99')} stroke="#7d5f5a" strokeWidth={2.5} />
      <g stroke="#7d5f5a" strokeWidth={1.5} opacity={0.5} fill="none">
        {[230, 260, 290, 316].map((y) => (
          <path key={y} d={`M${300},${y} C${360},${y + 8} ${440},${y + 8} ${500},${y}`} />
        ))}
      </g>
      {/* bulbo: pirámides y olivas */}
      <path d="M318,336 C320,380 336,440 360,500 L440,500 C464,440 480,380 482,336 Z" fill={fillNivel('bulbo', '#b8948f')} stroke="#7d5f5a" strokeWidth={2.5} />
      <path d="M400,340 L400,500" stroke="#7d5f5a" strokeWidth={2} />
      <ellipse cx={340} cy={398} rx={14} ry={30} fill="#a8847f" stroke="#7d5f5a" strokeWidth={2} />
      <ellipse cx={460} cy={398} rx={14} ry={30} fill="#a8847f" stroke="#7d5f5a" strokeWidth={2} />
      {/* médula */}
      <rect x={364} y={500} width={72} height={100} rx={24} fill="#c4a59f" stroke="#7d5f5a" strokeWidth={2.5} />
      {/* pares */}
      {Object.entries(PARES).map(([k, p]) => {
        const n = Number(k);
        const on = luz.has(n);
        const c = on ? col(tone) : '#a5862e';
        return (
          <g key={k} opacity={on ? 1 : 0.45}>
            <path d={p.d} stroke={c} strokeWidth={on ? 6 : 4} fill="none" strokeLinecap="round" />
            <path d={p.d} transform="translate(800 0) scale(-1 1)" stroke={c} strokeWidth={on ? 6 : 4} fill="none" strokeLinecap="round" />
            {on && (
              <L x={p.lx} y={p.ly} a="end" c={c} s={19}>
                {p.n}
              </L>
            )}
          </g>
        );
      })}
      <L x={560} y={130} a="start" c={INK3} s={19}>
        Mesencéfalo
      </L>
      <L x={560} y={270} a="start" c={INK3} s={19}>
        Protuberancia
      </L>
      <L x={560} y={420} a="start" c={INK3} s={19}>
        Bulbo
      </L>
      {v.nota && (
        <L x={400} y={590} c={v.notaTone ? col(v.notaTone) : INK} s={21}>
          {v.nota}
        </L>
      )}
    </svg>
  );
}

/* ─────────── La lengua y el velo: IX, X y XII ─────────── */

export type VistaBoca = 'inervacion' | 'xii' | 'cortina' | 'velo';

const LENGUA = 'M300,110 C300,70 500,70 500,110 L516,330 C518,430 462,500 400,502 C338,500 282,430 284,330 Z';

function Boca({ t, paso, dt, vistas = ['inervacion'] }: BaseFig & { vistas?: VistaBoca[] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  const LEN = '#d98a8a';
  const LEN_B = '#9a4a4a';
  if (v === 'cortina' || v === 'velo') {
    // Boca abierta de frente diciendo «ah»: la derecha del paciente queda a la izquierda del dibujo.
    const enf = v === 'cortina' ? u : 0;
    const ux = 400 + 34 * enf;
    return (
      <svg viewBox="80 20 640 520" role="img" aria-label="Velo del paladar y úvula al decir ah">
        <ellipse cx={400} cy={270} rx={250} ry={210} fill="#7a3a3a" stroke="#5a2a2a" strokeWidth={4} />
        <path d={`M170,250 C220,${120 + 30 * enf} 330,${110 + 20 * enf} 400,110 C470,110 580,120 630,250`} fill="#c9787a" stroke="#8a4a4a" strokeWidth={3} />
        <path d={`M210,260 C250,${180 + 40 * enf} 330,${150 + 30 * enf} ${ux - 18},170 L${ux + 18},170 C470,150 550,180 590,260`} fill="#3a1a1e" />
        <path d={`M${ux - 14},168 C${ux - 16},200 ${ux - 10},226 ${ux},232 C${ux + 10},226 ${ux + 16},200 ${ux + 14},168 Z`} fill="#d98a8a" stroke={LEN_B} strokeWidth={2.5} />
        <path d="M200,370 C260,330 540,330 600,370 C600,440 520,470 400,470 C280,470 200,440 200,370 Z" fill={LEN} stroke={LEN_B} strokeWidth={3} />
        {v === 'cortina' && (
          <g opacity={u}>
            <L x={238} y={110} c={ROJO} s={20}>
              Lado paralizado
            </L>
            <L x={560} y={110} c="var(--v-mint)" s={20}>
              Lado sano
            </L>
          </g>
        )}
        <L x={400} y={520} c={v === 'cortina' ? ROJO : INK} s={21}>
          {v === 'cortina' ? 'Signo de la cortina: la úvula se va hacia el lado sano' : 'Al decir «ah», el velo sube parejo y la úvula queda al medio'}
        </L>
      </svg>
    );
  }
  const xii = v === 'xii';
  // Lengua vista desde arriba, con la base (posterior) arriba y la punta abajo.
  return (
    <svg viewBox="40 20 780 530" role="img" aria-label="Inervación de la lengua y parálisis del hipogloso">
      <g transform={xii ? `rotate(${-14 * u} 400 110)` : undefined}>
        <path d={LENGUA} fill={LEN} stroke={LEN_B} strokeWidth={3} />
        {!xii && (
          <g>
            <clipPath id="len-clip">
              <path d={LENGUA} />
            </clipPath>
            <g clipPath="url(#len-clip)">
              <path d="M260,60 L540,60 L540,252 L400,200 L260,252 Z" fill="var(--v-gold)" opacity={0.45} />
              <path d="M260,252 L400,200 L540,252 L540,520 L260,520 Z" fill="var(--v-sky)" opacity={0.35} />
            </g>
            <path d="M292,252 L400,200 L508,252" stroke={LEN_B} strokeWidth={3} fill="none" strokeDasharray="8 6" />
          </g>
        )}
        {xii && (
          <g opacity={u}>
            <path d="M400,110 L400,500 L460,480 C500,440 512,380 510,330 L500,110 Z" fill="#b97070" opacity={0.6} />
            {[0, 1, 2, 3, 4].map((i) => (
              <circle key={i} cx={440 + (i % 2) * 30} cy={200 + i * 50 + 6 * Math.sin(t * 9 + i)} r={4} fill={LEN_B} />
            ))}
          </g>
        )}
        <path d="M400,90 L400,480" stroke={LEN_B} strokeWidth={2} opacity={0.5} />
      </g>
      {!xii && (
        <>
          <L x={540} y={150} a="start" c="var(--v-gold)" s={20}>
            Tercio posterior
          </L>
          <L x={540} y={176} a="start" c={INK} s={19} w={500}>
            tacto y gusto: IX
          </L>
          <L x={540} y={340} a="start" c="var(--v-sky)" s={20}>
            Dos tercios anteriores
          </L>
          <L x={540} y={366} a="start" c={INK} s={19} w={500}>
            tacto: V (maxilar inferior)
          </L>
          <L x={540} y={392} a="start" c={INK} s={19} w={500}>
            gusto: VII
          </L>
          <L x={240} y={300} a="end" c="var(--v-mint)" s={20}>
            Motora: XII
          </L>
          <L x={240} y={326} a="end" c={INK2} s={18} w={500}>
            (el palatogloso, X)
          </L>
        </>
      )}
      {xii && (
        <>
          <L x={580} y={250} a="start" c={ROJO} s={20}>
            Lado del XII lesionado:
          </L>
          <L x={580} y={276} a="start" c={ROJO} s={20}>
            atrofia, fasciculaciones
          </L>
          <L x={400} y={540} c={ROJO} s={21}>
            La punta se desvía hacia el lado paralizado
          </L>
        </>
      )}
    </svg>
  );
}

/* ─────────── Cráneo en corte coronal: componentes, hipertensión y hernias ─────────── */

export type VistaCraneo = 'normal' | 'componentes' | 'hte' | 'subfalcina' | 'uncal' | 'amigdalina' | 'puncion';

function Craneo({ t, paso, dt, vistas = ['normal'] }: BaseFig & { vistas?: VistaCraneo[] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  const lat = 0.5 + 0.5 * Math.sin(t * 3);
  const comp = v === 'componentes';
  const hte = v !== 'normal' && v !== 'componentes';
  const vent = hte ? 1 + 0.25 * u : 1;
  const R = 'var(--v-red)';
  return (
    <svg viewBox="60 0 680 560" role="img" aria-label="Corte coronal del cráneo: parénquima, sangre y líquido cefalorraquídeo">
      {/* hueso */}
      <path d="M400,24 C560,24 664,120 664,250 C664,350 620,420 560,450 L440,470 L360,470 L240,450 C180,420 136,350 136,250 C136,120 240,24 400,24 Z" fill="#e8dcc8" stroke="#a89878" strokeWidth={6} />
      {/* espacio subaracnoideo (LCR) */}
      <path d="M400,44 C548,44 644,132 644,250 C644,340 604,404 548,432 L440,452 L360,452 L252,432 C196,404 156,340 156,250 C156,132 252,44 400,44 Z" fill={comp ? 'color-mix(in srgb, var(--v-sky) 55%, #cfe6f2)' : '#cfe6f2'} />
      {/* seno sagital superior (sangre venosa) */}
      <path d="M384,44 L416,44 L400,66 Z" fill={comp ? R : '#5a3a6a'} />
      {/* hemisferios */}
      <path d="M394,60 C300,58 196,118 180,230 C172,300 214,340 270,342 C320,344 360,330 394,316 Z" fill={comp ? 'color-mix(in srgb, var(--v-gold) 45%, #d9b3ad)' : '#d9b3ad'} stroke="#9a7a76" strokeWidth={3} />
      <path d="M406,60 C500,58 604,118 620,230 C628,300 586,340 530,342 C480,344 440,330 406,316 Z" fill={comp ? 'color-mix(in srgb, var(--v-gold) 45%, #d9b3ad)' : '#d9b3ad'} stroke="#9a7a76" strokeWidth={3} />
      {/* hoz y tienda */}
      <path d="M400,48 L400,250" stroke="#8a7c6a" strokeWidth={5} />
      <path d="M210,352 C280,330 340,328 376,338 M424,338 C460,328 520,330 590,352" stroke="#8a7c6a" strokeWidth={5} fill="none" />
      {/* ventrículos */}
      <g fill={comp ? 'var(--v-sky)' : '#7fb0d0'}>
        <path d={`M392,${160 - 20 * (vent - 1)} C${360 - 40 * (vent - 1)},${150 - 20 * (vent - 1)} ${330 - 30 * (vent - 1)},170 340,200 C350,215 380,215 392,210 Z`} />
        <path d={`M408,${160 - 20 * (vent - 1)} C${440 + 40 * (vent - 1)},${150 - 20 * (vent - 1)} ${470 + 30 * (vent - 1)},170 460,200 C450,215 420,215 408,210 Z`} />
        <rect x={396} y={226} width={8} height={56} rx={4} />
      </g>
      {/* cerebelo y tronco */}
      <ellipse cx={330} cy={392} rx={70} ry={42} fill="#c9a0a0" stroke="#9a7a76" strokeWidth={3} />
      <ellipse cx={470} cy={392} rx={70} ry={42} fill="#c9a0a0" stroke="#9a7a76" strokeWidth={3} />
      <path d="M380,300 L420,300 L424,360 L418,470 L382,470 L376,360 Z" fill="#b8948f" stroke="#7d5f5a" strokeWidth={3} />
      <rect x={384} y={470} width={32} height={80} rx={12} fill="#c4a59f" stroke="#7d5f5a" strokeWidth={3} />
      {/* presión */}
      {hte &&
        [0, 1, 2, 3, 4, 5].map((i) => {
          const a = Math.PI * (0.15 + (i / 5) * 0.7);
          const r0 = 250 + 14 * lat;
          const x = 400 - Math.cos(a) * r0;
          const y = 250 - Math.sin(a) * r0 * 0.85;
          const x2 = 400 - Math.cos(a) * (r0 - 50);
          const y2 = 250 - Math.sin(a) * (r0 - 50) * 0.85;
          return <line key={i} x1={x} y1={y} x2={x2} y2={y2} stroke={R} strokeWidth={6} markerEnd="url(#neu-flecha)" opacity={0.8 * u} />;
        })}
      {/* hernias */}
      {v === 'subfalcina' && <path d={`M394,170 C${400 + 30 * u},180 ${400 + 34 * u},230 394,250 Z`} fill={R} opacity={0.75} />}
      {v === 'uncal' && <path d={`M340,330 C360,${330 + 10 * u} ${372},${336 + 14 * u} ${380 + 6 * u},${330 + 22 * u} C360,${352 + 10 * u} 340,346 330,338 Z`} fill={R} opacity={0.85} />}
      {(v === 'amigdalina' || v === 'puncion') && (
        <g opacity={0.85}>
          <ellipse cx={372} cy={444 + 24 * u} rx={14} ry={22} fill={R} />
          <ellipse cx={428} cy={444 + 24 * u} rx={14} ry={22} fill={R} />
        </g>
      )}
      {v === 'puncion' && <path d={`M400,${300} L400,${330 + 30 * u}`} stroke={R} strokeWidth={6} markerEnd="url(#neu-flecha)" />}
      {/* rótulos */}
      {(v === 'normal' || comp) && (
        <>
          <L x={240} y={150} c={comp ? 'var(--v-gold)' : INK2} s={20}>
            Parénquima
          </L>
          <L x={600} y={70} a="start" c={comp ? R : INK2} s={20}>
            Sangre (senos venosos)
          </L>
          <L x={560} y={150} c={comp ? 'var(--v-sky)' : INK2} s={20}>
            LCR
          </L>
          <L x={400} y={292} c={INK2} s={18}>
            ventrículos
          </L>
        </>
      )}
      {v === 'subfalcina' && (
        <L x={540} y={210} c={R} s={20} o={u}>
          Bajo la hoz
        </L>
      )}
      {v === 'uncal' && (
        <>
          <L x={250} y={300} c={R} s={20} o={u}>
            Uncus → mesencéfalo
          </L>
          <L x={250} y={326} c={R} s={20} o={u}>
            (III: midriasis)
          </L>
        </>
      )}
      {(v === 'amigdalina' || v === 'puncion') && (
        <L x={560} y={500} c={R} s={20} o={u}>
          Amígdalas → agujero occipital
        </L>
      )}
      <L x={400} y={540} c={hte ? R : INK} s={21}>
        {v === 'normal'
          ? 'Tres componentes dentro de una caja rígida'
          : comp
            ? 'Si uno aumenta, los otros dos tienen que bajar'
            : v === 'hte'
              ? 'Más de 15 mmHg (20 cm de agua): hipertensión endocraneana'
              : v === 'subfalcina'
                ? 'Hernia subfalcina'
                : v === 'uncal'
                  ? 'Hernia transtentorial (uncal): la más frecuente'
                  : v === 'amigdalina'
                    ? 'Hernia amigdalina: comprime el bulbo (mortal)'
                    : 'Punción con HTE: el bulbo se enclava'}
      </L>
    </svg>
  );
}

/* ─────────── Fondo de ojo: las fases del edema de papila ─────────── */

export type FasePapila = 'normal' | 'hiperemica' | 'edematosa' | 'atrofica';

function Papila({ t, paso, dt, vistas = [['normal', 'hiperemica', 'edematosa', 'atrofica']] }: BaseFig & { vistas?: FasePapila[][] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  const fases: { k: FasePapila; n: string }[] = [
    { k: 'normal', n: 'Normal' },
    { k: 'hiperemica', n: 'Hiperémica' },
    { k: 'edematosa', n: 'Edematosa' },
    { k: 'atrofica', n: 'Atrófica' },
  ];
  return (
    <svg viewBox="0 30 800 330" role="img" aria-label="Fondo de ojo: papila normal y fases del edema de papila">
      {fases.map((f, i) => {
        const cx = 100 + i * 200;
        const cy = 170;
        const on = v.includes(f.k);
        const disco = f.k === 'normal' ? '#f0b070' : f.k === 'hiperemica' ? '#e8806a' : f.k === 'edematosa' ? '#f0a888' : '#f4eee4';
        const rd = f.k === 'edematosa' ? 34 : 26;
        const venaW = f.k === 'normal' ? 4 : f.k === 'atrofica' ? 3 : 7;
        const artW = f.k === 'normal' ? 3 : f.k === 'atrofica' ? 1.5 : 2;
        const borroso = f.k === 'edematosa' || f.k === 'hiperemica';
        return (
          <g key={f.k} opacity={on ? 0.4 + 0.6 * u : 0.3}>
            <circle cx={cx} cy={cy} r={86} fill="#b8402e" stroke={on ? 'var(--v-gold)' : INK3} strokeWidth={on ? 4 : 2} />
            {/* vasos */}
            {[-1, 1].map((s) => (
              <g key={s} fill="none" strokeLinecap="round">
                <path d={`M${cx},${cy} C${cx + s * 20},${cy - 40} ${cx + s * 50},${cy - 60} ${cx + s * 70},${cy - 46}`} stroke="#5a1418" strokeWidth={venaW} />
                <path d={`M${cx},${cy} C${cx + s * 24},${cy + 40} ${cx + s * 50},${cy + 60} ${cx + s * 70},${cy + 48}`} stroke="#5a1418" strokeWidth={venaW} />
                <path d={`M${cx},${cy} C${cx + s * 30},${cy - 24} ${cx + s * 56},${cy - 30} ${cx + s * 78},${cy - 16}`} stroke="#e85a48" strokeWidth={artW} />
                <path d={`M${cx},${cy} C${cx + s * 30},${cy + 24} ${cx + s * 56},${cy + 30} ${cx + s * 78},${cy + 18}`} stroke="#e85a48" strokeWidth={artW} />
              </g>
            ))}
            {borroso && <circle cx={cx} cy={cy} r={rd + 12} fill={disco} opacity={0.35} />}
            <circle cx={cx} cy={cy} r={rd} fill={disco} stroke={borroso ? 'none' : '#c08050'} strokeWidth={2} />
            {f.k === 'edematosa' &&
              [0, 1, 2].map((j) => <path key={j} d={`M${cx - 40 + j * 36},${cy + 50 - j * 70} l10,4 l-6,6 z`} fill="#7a0e14" opacity={0.6 + 0.4 * Math.sin(t * 2 + j)} />)}
            {f.k === 'atrofica' && [0, 1, 2, 3].map((j) => <circle key={j} cx={cx - 8 + j * 6} cy={cy - 4 + (j % 2) * 8} r={2.5} fill="#fff" />)}
            <L x={cx} y={290} c={on ? 'var(--v-gold)' : INK3} s={20}>
              {f.n}
            </L>
          </g>
        );
      })}
      <L x={400} y={340} c={INK2} s={19}>
        Debe ser bilateral para pensar en hipertensión endocraneana
      </L>
    </svg>
  );
}

/* ─────────── Signos de irritación meníngea ─────────── */

export type VistaMeningeo = 'nuca' | 'brudzinski' | 'kernig' | 'reposo';

function Meningeos({ t, paso, dt, vistas = ['reposo'] }: BaseFig & { vistas?: VistaMeningeo[] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  const P = '#d9b7a0';
  const PB = '#8a6a58';
  const lat = 0.5 + 0.5 * Math.sin(t * 3);
  // Paciente acostado boca arriba: cabeza a la izquierda.
  const cabezaAlta = v === 'nuca' || v === 'brudzinski';
  const ang = cabezaAlta ? 32 * u : 0;
  const rad = (ang * Math.PI) / 180;
  const cuello = { x: 230, y: 300 };
  const cab = { x: cuello.x - Math.cos(rad) * 60, y: cuello.y - Math.sin(rad) * 60 - 6 };
  const cadera = { x: 470, y: 300 };
  let rodilla = { x: 600, y: 300 };
  let pie = { x: 730, y: 300 };
  if (v === 'brudzinski') {
    rodilla = { x: 470 + 130 * Math.cos((-55 * u * Math.PI) / 180), y: 300 + 130 * Math.sin((-55 * u * Math.PI) / 180) };
    pie = { x: rodilla.x + 120 * Math.cos((40 * u * Math.PI) / 180), y: rodilla.y + 120 * Math.sin((40 * u * Math.PI) / 180) };
  }
  if (v === 'kernig') {
    const th = (-(10 + 25 * lat) * Math.PI) / 180;
    rodilla = { x: 600 - 130 * u, y: 300 - 130 * u };
    const pf = { x: rodilla.x + 120 * Math.cos(th), y: rodilla.y + 120 * Math.sin(th) };
    pie = { x: 730 + (pf.x - 730) * u, y: 300 + (pf.y - 300) * u };
  }
  return (
    <svg viewBox="80 60 720 360" role="img" aria-label="Signos de irritación meníngea">
      <rect x={120} y={318} width={660} height={18} rx={6} fill="#5a5560" />
      {/* tronco, brazos */}
      <path d={`M${cuello.x},${cuello.y} L${cadera.x},${cadera.y}`} stroke={P} strokeWidth={44} strokeLinecap="round" />
      <path d={`M${cuello.x},${cuello.y} L${cadera.x},${cadera.y}`} stroke={PB} strokeWidth={2} opacity={0.4} />
      {/* pierna */}
      <path d={`M${cadera.x},${cadera.y} L${rodilla.x},${rodilla.y} L${pie.x},${pie.y}`} stroke={P} strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* cuello y cabeza */}
      <path d={`M${cuello.x},${cuello.y} L${cab.x + 20},${cab.y + 6}`} stroke={P} strokeWidth={22} strokeLinecap="round" />
      <circle cx={cab.x} cy={cab.y} r={34} fill={P} stroke={PB} strokeWidth={2.5} />
      {/* manos del examinador */}
      {cabezaAlta && <path d={`M${cab.x - 30},${cab.y + 40} q20,-10 40,0`} stroke="var(--v-sky)" strokeWidth={10} fill="none" strokeLinecap="round" opacity={u} />}
      {v === 'kernig' && <path d={`M${pie.x + 20},${pie.y - 10} l30,-20`} stroke="var(--v-sky)" strokeWidth={10} strokeLinecap="round" opacity={u} />}
      {/* dolor y respuesta */}
      {v !== 'reposo' && <circle cx={v === 'kernig' ? rodilla.x : cuello.x} cy={v === 'kernig' ? rodilla.y : cuello.y - 10} r={18 + 8 * lat} fill="none" stroke="var(--v-red)" strokeWidth={4} opacity={u} />}
      <L x={440} y={390} c={v === 'reposo' ? INK2 : 'var(--v-red)'} s={21}>
        {v === 'nuca'
          ? 'Rigidez de nuca: el mentón no llega al pecho'
          : v === 'brudzinski'
            ? 'Brudzinski: al flexionar la nuca, flexiona las rodillas'
            : v === 'kernig'
              ? 'Kernig: con el muslo flexionado no puede extender la rodilla'
              : 'Paciente en decúbito dorsal'}
      </L>
    </svg>
  );
}

export const FIGURAS_NEU = {
  encefalo: Encefalo,
  cabeza: Cabeza,
  nucleos: Nucleos,
  motora: Motora,
  temblor: Temblor,
  crisis: Crisis,
  sueno: Sueno,
  'via-optica': ViaOptica,
  oculomotores: Oculomotores,
  'tronco-pares': TroncoPares,
  boca: Boca,
  craneo: Craneo,
  papila: Papila,
  meningeos: Meningeos,
} satisfies Record<string, (p: never) => ReactNode>;

