// Figuras de digestivo (tubo alto, estómago, tracto completo). Funciones puras de (t, paso, dt).
// Las importa Remotion: sin import.meta ni alias con valor.
import type { ReactNode } from 'react';
import { BIL_H, BIL_W, BiliarFig, BristolGlyph, TR_H, TR_W, TractoFig } from '../visual/anatomia';
import type { Organo, ViaBiliar, VTone } from '../visual/tipos';
import { type BaseFig, CIELO, DURAZNO, ESTOMAGO, HIGADO, ManoFrente, INK, INK2, INK3, INTESTINO, L, LILA, LINE, MENTA, Pulso, ROJO, ROSA, SANGRE, apf, clamp, ease } from './figuras-base';

const PIEL = 'var(--v-skin)';
const HUESO = '#d8cdbd';
const AIRE = '#120f17';
const MUCOSA = '#c98a86';
const MUSCULO = '#9c5a5a';
const BOLO = '#b98a55';
const BILIS = '#9fae4a';
const ACIDO = '#e8d36a';

/** Punto sobre una polilínea (u de 0 a 1). */
function sobre(pts: [number, number][], u: number): [number, number] {
  const seg: number[] = [];
  let tot = 0;
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    seg.push(d);
    tot += d;
  }
  let r = clamp(u) * tot;
  for (let i = 0; i < seg.length; i++) {
    if (r <= seg[i]) {
      const k = seg[i] ? r / seg[i] : 0;
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k];
    }
    r -= seg[i];
  }
  return pts[pts.length - 1];
}

function Flecha({ d, c = ROSA, w = 5, o = 1, id }: { d: string; c?: string; w?: number; o?: number; id: string }) {
  return (
    <g opacity={o}>
      <defs>
        <marker id={id} viewBox="0 0 10 10" refX={6} refY={5} markerWidth={4} markerHeight={4} orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={c} />
        </marker>
      </defs>
      <path d={d} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" markerEnd={`url(#${id})`} />
    </g>
  );
}

/* ═════════════ Cabeza y cuello de perfil (mirando a la izquierda) · coordenadas 0–400 × 0–430 ═════════════ */

const CABEZA =
  'M210,8 C140,6 92,44 86,104 C84,118 70,130 58,150 C54,158 62,166 76,168 C82,176 72,186 74,194 C76,202 86,204 80,214 C78,228 86,242 106,248 C124,254 140,256 150,264 L156,430 L330,430 C326,340 336,280 350,230 C372,160 360,60 300,24 C276,12 246,8 210,8 Z';
const NARIZ = 'M80,150 C112,128 182,124 226,130 L228,156 C182,150 122,154 84,166 Z';
const LENGUA = 'M92,192 C122,176 182,170 214,186 C236,198 240,226 232,250 C214,262 160,256 120,240 C100,230 90,212 92,192 Z';
const PALADAR_DURO = 'M88,172 C130,164 170,160 202,160 L202,169 C170,170 130,173 90,180 Z';

interface EstadoCabeza {
  paladar: number; // 0 en reposo · 1 elevado (cierra la nasofaringe)
  epiglotis: number; // 0 abierta · 1 cierra la laringe
  ees: number; // 0 cerrado · 1 relajado
}

function Cabeza({ e, id, rotulos = true, o = 1 }: { e: EstadoCabeza; id: string; rotulos?: boolean; o?: number }) {
  const p = e.paladar;
  // Paladar blando: cuelga (reposo) o se eleva hasta la pared posterior.
  const pb = `M200,160 C${222 + 4 * p},${166 - 12 * p} ${236 + 6 * p},${178 - 30 * p} ${240 + 12 * p},${196 - 50 * p}`;
  const g = e.epiglotis;
  const epi = `M236,290 C${238 + 4 * g},${276 - 2 * g} ${240 + 14 * g},${262 + 14 * g} ${246 + 18 * g},${252 + 34 * g}`;
  const anchoEes = 6 + 12 * e.ees;
  return (
    <g opacity={o}>
      <defs>
        <clipPath id={id}>
          <path d={CABEZA} />
        </clipPath>
      </defs>
      <path d={CABEZA} fill={PIEL} stroke={LINE} strokeWidth={3} />
      <g clipPath={`url(#${id})`}>
        {/* Vértebras cervicales */}
        {[150, 196, 242, 288, 334, 380].map((y) => (
          <rect key={y} x={286} y={y} width={44} height={36} rx={9} fill={HUESO} opacity={0.45} />
        ))}
        {/* Fosas nasales, faringe, laringe y esófago */}
        <path d={NARIZ} fill={AIRE} />
        <path d="M226,130 C246,132 256,144 258,170 L262,300 L240,300 L236,262 C240,230 236,206 228,156 Z" fill={AIRE} />
        <path d="M200,292 L196,430 L228,430 L234,292 Z" fill={AIRE} stroke={MUCOSA} strokeWidth={2} />
        {[310, 336, 362, 388, 414].map((y) => (
          <path key={y} d={`M198,${y} L230,${y}`} stroke={HUESO} strokeWidth={4} opacity={0.5} />
        ))}
        <path d={`M${251 - anchoEes / 2},300 L${252 - anchoEes / 2},430 L${252 + anchoEes / 2},430 L${251 + anchoEes / 2},300 Z`} fill={MUCOSA} opacity={0.9} />
        <rect x={238} y={296} width={28} height={12} rx={5} fill={MUSCULO} opacity={1 - 0.6 * e.ees} />
        {/* Boca */}
        <path d="M90,180 C130,173 170,170 202,169 L214,186 C182,170 122,176 92,192 Z" fill={AIRE} opacity={0.9} />
        <path d={PALADAR_DURO} fill={HUESO} />
        <path d={LENGUA} fill="#c46f73" stroke="#8f4a4f" strokeWidth={2} />
        <path d={pb} fill="none" stroke="#c46f73" strokeWidth={13} strokeLinecap="round" />
        <path d={epi} fill="none" stroke="#e2c9a6" strokeWidth={8} strokeLinecap="round" />
        {/* Cuerdas vocales */}
        <path d="M204,300 L216,304 M230,300 L218,304" stroke="#e2c9a6" strokeWidth={4} strokeLinecap="round" />
      </g>
      {rotulos && (
        <>
          <L x={150} y={110} s={20} c={INK2} w={550}>
            Fosas nasales
          </L>
          <L x={128} y={222} s={20} c={INK2} w={550}>
            Lengua
          </L>
        </>
      )}
    </g>
  );
}

/* ─────────── Deglución: tres fases (y la falla orofaríngea) ─────────── */

const RUTA_BOLO: [number, number][] = [
  [150, 196],
  [210, 192],
  [244, 222],
  [250, 262],
  [252, 300],
  [252, 360],
  [253, 440],
];

function Deglucion({ t, paso, dt, modo = 'normal' }: BaseFig & { modo?: 'normal' | 'orofaringea' }) {
  const ap = (n: number) => apf(paso, dt, n);
  if (modo === 'orofaringea') {
    // El bolo no se transfiere: queda en la faringe; una parte sube a la nariz y otra cae a la laringe.
    const ciclo = (t % 4) / 4;
    const bolo = sobre(RUTA_BOLO.slice(0, 4), ease(Math.min(1, ciclo * 2)));
    const nariz = sobre([[248, 230], [246, 170], [230, 146], [160, 142]], ease(clamp((ciclo - 0.45) * 2.2)));
    const lar = sobre([[244, 262], [226, 290], [214, 330], [212, 380]], ease(clamp((ciclo - 0.5) * 2.2)));
    return (
      <svg viewBox="0 0 720 450" role="img" aria-label="Disfagia orofaríngea: el bolo no pasa al esófago">
        <Cabeza e={{ paladar: 0.15, epiglotis: 0.1, ees: 0 }} id="cl-cab-of" />
        <circle cx={bolo[0]} cy={bolo[1]} r={15} fill={BOLO} stroke="#7a5630" strokeWidth={2} />
        <g opacity={ap(1)}>
          <circle cx={nariz[0]} cy={nariz[1]} r={8} fill={BOLO} />
          <L x={470} y={150} a="start" c={DURAZNO} s={23}>
            Regurgitación
          </L>
          <L x={470} y={178} a="start" c={DURAZNO} s={23}>
            por la nariz
          </L>
          <path d="M462,160 L300,150" stroke={DURAZNO} strokeWidth={2} strokeDasharray="5 6" />
        </g>
        <g opacity={ap(2)}>
          <circle cx={lar[0]} cy={lar[1]} r={8} fill={BOLO} />
          <L x={470} y={330} a="start" c={ROJO} s={23}>
            Aspiración:
          </L>
          <L x={470} y={358} a="start" c={ROJO} s={23}>
            tos, neumonía
          </L>
          <path d="M462,340 L236,340" stroke={ROJO} strokeWidth={2} strokeDasharray="5 6" />
        </g>
        <g opacity={ap(0)}>
          <L x={470} y={244} a="start" s={23}>
            No puede iniciar
          </L>
          <L x={470} y={272} a="start" s={23}>
            la deglución
          </L>
          <path d="M462,254 L268,250" stroke={INK3} strokeWidth={2} strokeDasharray="5 6" />
        </g>
      </svg>
    );
  }
  // Normal: el bolo recorre la fase del paso actual en bucle.
  const tramos: [number, number][] = [
    [0, 0.34],
    [0.3, 0.68],
    [0.62, 1],
  ];
  const fase = Math.min(paso, 2);
  const [a, b] = tramos[fase];
  const u = a + (b - a) * ease(((t % 2.6) / 2.6) * 1.3);
  const bolo = sobre(RUTA_BOLO, u);
  const enFaringe = fase === 1;
  const e: EstadoCabeza = { paladar: enFaringe ? 1 : fase === 2 ? 0.3 : 0, epiglotis: enFaringe ? 1 : 0, ees: enFaringe ? 1 : fase === 2 ? 0.4 : 0 };
  const onda = fase === 2 ? 300 + ((t * 70) % 140) : -100;
  return (
    <svg viewBox="0 0 720 450" role="img" aria-label="Las tres fases de la deglución">
      <Cabeza e={e} id="cl-cab-dg" />
      {fase === 2 && <ellipse cx={252} cy={onda - 22} rx={16} ry={9} fill={MUSCULO} opacity={0.8} />}
      <circle cx={bolo[0]} cy={bolo[1]} r={14} fill={BOLO} stroke="#7a5630" strokeWidth={2} />
      <g opacity={paso === 0 ? 1 : 0.38}>
        <L x={460} y={150} a="start" c={MENTA} s={24}>
          1. Oral
        </L>
        <L x={460} y={178} a="start" c={INK2} s={19} w={500}>
          voluntaria: masticar
        </L>
      </g>
      <g opacity={paso === 1 ? 1 : 0.38 * ap(1)}>
        <L x={460} y={238} a="start" c={LILA} s={24}>
          2. Faríngea
        </L>
        <L x={460} y={266} a="start" c={INK2} s={19} w={500}>
          refleja: paladar sube,
        </L>
        <L x={460} y={290} a="start" c={INK2} s={19} w={500}>
          epiglotis cierra
        </L>
      </g>
      <g opacity={paso >= 2 ? 1 : 0}>
        <L x={460} y={350} a="start" c={CIELO} s={24}>
          3. Esofágica
        </L>
        <L x={460} y={378} a="start" c={INK2} s={19} w={500}>
          peristaltismo (vago)
        </L>
      </g>
    </svg>
  );
}

/* ─────────── Esófago: normal, mecánica, motora, acalasia y esofagograma ─────────── */

type ModoEsofago = 'normal' | 'comparar' | 'acalasia' | 'rx';

/** Tubo vertical del esófago con su estómago. x = centro; ancho(y) define el calibre. */
function TuboEsofago({ x, ancho, id }: { x: number; ancho: (y: number) => number; id: string }) {
  const Y0 = 40;
  const Y1 = 420;
  const izq: string[] = [];
  const der: string[] = [];
  for (let y = Y0; y <= Y1; y += 6) {
    const w = ancho(y) / 2;
    izq.push(`${(x - w).toFixed(1)},${y}`);
    der.push(`${(x + w).toFixed(1)},${y}`);
  }
  const d = `M${izq.join(' L')} L${der.reverse().join(' L')} Z`;
  return (
    <g>
      <defs>
        <clipPath id={id}>
          <path d={d} />
        </clipPath>
      </defs>
      <path d={d} fill={MUCOSA} stroke={MUSCULO} strokeWidth={4} />
      {/* Estómago */}
      <path d={`M${x - 14},420 C${x - 30},450 ${x - 10},500 ${x + 40},500 C${x + 110},500 ${x + 130},440 ${x + 100},414 C${x + 70},392 ${x + 30},402 ${x + 14},420 Z`} fill={ESTOMAGO} stroke="#8f5f56" strokeWidth={3} />
    </g>
  );
}

function Esofago({ t, paso, dt, modo = 'normal' }: BaseFig & { modo?: ModoEsofago }) {
  const ap = (n: number) => apf(paso, dt, n);
  if (modo === 'rx') {
    // Esofagograma con bario: blanco sobre negro.
    const acal = (y: number) => (y < 330 ? 46 + 40 * Math.sin(((y - 40) / 290) * Math.PI * 0.9) : Math.max(6, 74 - (y - 330) * 0.86));
    const can = (y: number) => (y > 220 && y < 300 ? 18 + 6 * Math.sin(y / 5) : 34);
    const columna = (x: number, f: (y: number) => number, y0: number, y1: number) => {
      const izq: string[] = [];
      const der: string[] = [];
      for (let y = y0; y <= y1; y += 5) {
        izq.push(`${(x - f(y) / 2).toFixed(1)},${y}`);
        der.push(`${(x + f(y) / 2).toFixed(1)},${y}`);
      }
      return `M${izq.join(' L')} L${der.reverse().join(' L')} Z`;
    };
    return (
      <svg viewBox="0 0 800 520" role="img" aria-label="Esofagograma: pico de pájaro y manzana mordida">
        <rect x={20} y={10} width={360} height={470} rx={18} fill="#0b0a0d" />
        <rect x={420} y={10} width={360} height={470} rx={18} fill="#0b0a0d" opacity={ap(1)} />
        <path d={columna(200, acal, 40, 410)} fill="#e9e6ee" opacity={0.92} />
        <path d="M196,410 C190,436 210,460 250,458 C300,456 312,430 290,416" fill="none" stroke="#e9e6ee" strokeWidth={10} opacity={0.6} />
        <L x={200} y={500} c={DURAZNO} s={23}>
          Acalasia: pico de pájaro
        </L>
        <g opacity={ap(1)}>
          <path d={columna(600, can, 40, 430)} fill="#e9e6ee" opacity={0.92} />
          <L x={600} y={500} c={ROJO} s={23}>
            Cáncer: manzana mordida
          </L>
          <path d="M650,262 L716,262" stroke={ROJO} strokeWidth={3} />
        </g>
        <L x={300} y={392} a="start" c={INK2} s={18} w={500}>
          EEI cerrado
        </L>
        <L x={300} y={120} a="start" c={INK2} s={18} w={500}>
          Esófago
        </L>
        <L x={300} y={144} a="start" c={INK2} s={18} w={500}>
          dilatado
        </L>
      </svg>
    );
  }
  if (modo === 'acalasia') {
    // Plexo de Auerbach dañado: aperistalsis y EEI que no se relaja → megaesófago.
    const dil = ap(2);
    const ancho = (y: number) => {
      const base = 36;
      if (y > 380) return base - (base - 10) * clamp((y - 380) / 40) * (0.4 + 0.6 * ap(1));
      return base + dil * 70 * Math.sin(((y - 40) / 340) * Math.PI * 0.95);
    };
    const nivel = 260 - 60 * dil;
    const ganglios = [90, 150, 210, 270, 330];
    return (
      <svg viewBox="0 0 800 520" role="img" aria-label="Acalasia: sin peristaltismo y con el esfínter inferior cerrado">
        <TuboEsofago x={300} ancho={ancho} id="cl-es-ac" />
        <g clipPath="url(#cl-es-ac)">
          <rect x={150} y={nivel} width={300} height={420 - nivel} fill={BOLO} opacity={0.55 * dil} />
          {Array.from({ length: 10 }, (_, i) => (
            <circle key={i} cx={262 + ((i * 37) % 80)} cy={nivel + 20 + ((i * 53) % Math.max(10, 380 - nivel))} r={7} fill="#e9dfd2" opacity={0.4 * dil} />
          ))}
        </g>
        {ganglios.map((y, i) => (
          <g key={y}>
            <circle cx={300 - ancho(y) / 2 - 6} cy={y} r={7} fill={i % 2 ? LILA : MENTA} opacity={1 - 0.8 * ap(0)} />
            <circle cx={300 + ancho(y) / 2 + 6} cy={y} r={7} fill={i % 2 ? MENTA : LILA} opacity={1 - 0.8 * ap(0)} />
          </g>
        ))}
        <L x={520} y={110} a="start" c={LILA} s={23} o={ap(0)}>
          Plexo de Auerbach
        </L>
        <L x={520} y={138} a="start" c={INK2} s={19} w={500} o={ap(0)}>
          idiopático o Chagas
        </L>
        <L x={520} y={396} a="start" c={DURAZNO} s={23} o={ap(1)}>
          EEI no se relaja
        </L>
        <path d="M512,398 L326,402" stroke={DURAZNO} strokeWidth={2} strokeDasharray="5 6" opacity={ap(1)} />
        <L x={520} y={250} a="start" c={ROSA} s={23} o={ap(2)}>
          Megaesófago
        </L>
        <L x={520} y={278} a="start" c={INK2} s={19} w={500} o={ap(2)}>
          sólidos y líquidos
        </L>
        <L x={520} y={302} a="start" c={INK2} s={19} w={500} o={ap(2)}>
          quedan retenidos
        </L>
      </svg>
    );
  }
  if (modo === 'comparar') {
    // Izquierda: obstáculo (mecánica). Derecha: falla el motor (motora).
    const sten = (y: number) => (y > 250 && y < 290 ? 14 : 38);
    const libre = () => 38;
    const liq = (k: number, x0: number, tope?: number) =>
      Array.from({ length: 7 }, (_, i) => {
        const y = 50 + ((t * 90 + i * 60 + k) % 380);
        if (tope && y > tope - 10 && y < tope + 40) return null;
        return <circle key={`l${i}`} cx={x0 + Math.sin(i * 3 + t * 2) * 6} cy={y} r={5} fill={CIELO} opacity={0.9} />;
      });
    const solidoIzq = 60 + Math.min(180, ((t * 60) % 260));
    const solidoDer = 80 + 20 * Math.sin(t * 1.3);
    return (
      <svg viewBox="0 0 800 520" role="img" aria-label="Disfagia mecánica frente a disfagia motora">
        <TuboEsofago x={200} ancho={sten} id="cl-es-me" />
        <g clipPath="url(#cl-es-me)">{liq(0, 200)}</g>
        <circle cx={200} cy={Math.min(solidoIzq, 232)} r={17} fill={BOLO} stroke="#7a5630" strokeWidth={2} />
        <rect x={168} y={250} width={64} height={40} rx={8} fill="#6f3a55" opacity={0.55} />
        <L x={200} y={20} c={DURAZNO} s={24}>
          Mecánica
        </L>
        <L x={340} y={250} a="start" c={INK2} s={19} w={500}>
          obstáculo
        </L>
        <g opacity={ap(1)}>
          <TuboEsofago x={560} ancho={libre} id="cl-es-mo" />
          <g clipPath="url(#cl-es-mo)">
            {Array.from({ length: 6 }, (_, i) => (
              <circle key={i} cx={548 + (i % 3) * 12} cy={170 + Math.floor(i / 3) * 14 + Math.sin(t * 2 + i) * 4} r={5} fill={CIELO} />
            ))}
          </g>
          <circle cx={560} cy={solidoDer} r={17} fill={BOLO} stroke="#7a5630" strokeWidth={2} />
          {[150, 230, 310].map((y, i) => (
            <path key={y} d={`M538,${y} L582,${y}`} stroke={MUSCULO} strokeWidth={5} opacity={0.3 + 0.3 * Math.abs(Math.sin(t * 3 + i * 2))} />
          ))}
          <L x={560} y={20} c={LILA} s={24}>
            Motora
          </L>
        </g>
        <L x={200} y={510} s={20} o={ap(0)}>
          Solo sólidos · progresiva
        </L>
        <L x={600} y={510} s={20} o={ap(1)}>
          Sólidos y líquidos · intermitente
        </L>
      </svg>
    );
  }
  // Normal: la onda peristáltica empuja el bolo; el EEI se abre cuando llega.
  const ciclo = (t % 3.4) / 3.4;
  const yb = 60 + 350 * ease(ciclo);
  const ancho = (y: number) => {
    const contra = Math.exp(-(((y - (yb - 46)) / 22) ** 2));
    const esfinter = y > 395 ? 1 - 0.75 * (yb > 380 ? 0 : 1) * clamp((y - 395) / 20) : 1;
    return (36 - 22 * contra) * esfinter;
  };
  return (
    <svg viewBox="150 0 560 520" role="img" aria-label="Peristaltismo esofágico normal">
      <TuboEsofago x={300} ancho={ancho} id="cl-es-no" />
      <circle cx={300} cy={yb} r={15} fill={BOLO} stroke="#7a5630" strokeWidth={2} />
      <L x={430} y={120} a="start" c={MENTA} s={23}>
        Onda peristáltica
      </L>
      <L x={430} y={148} a="start" c={INK2} s={19} w={500}>
        parasimpático (vago)
      </L>
      <L x={430} y={400} a="start" c={CIELO} s={23} o={ap(1)}>
        EEI se relaja
      </L>
      <L x={430} y={428} a="start" c={INK2} s={19} w={500} o={ap(1)}>
        al llegar el bolo
      </L>
    </svg>
  );
}

/* ─────────── Centros del vómito ─────────── */

function CentrosVomito({ t, paso, dt, modo = 'aferencias' }: BaseFig & { modo?: 'centros' | 'aferencias' | 'eferencias' }) {
  const ap = (n: number) => apf(paso, dt, n);
  const CV: [number, number] = [352, 404];
  const AP: [number, number] = [386, 380];
  const cerebro =
    'M80,206 C70,110 162,36 300,32 C430,28 526,92 534,182 C538,236 506,266 456,274 C410,280 372,262 342,268 C306,276 262,298 210,294 C148,290 88,268 80,206 Z';
  const tronco = 'M316,262 C298,292 290,330 298,360 C304,384 322,402 328,432 L334,560 L378,560 L378,432 C380,400 390,372 388,340 C386,302 374,276 360,262 Z';
  const cerebelo = 'M398,300 C418,268 500,262 540,290 C572,312 566,368 528,384 C488,400 430,392 406,364 C394,346 392,318 398,300 Z';
  const vias = {
    corteza: 'M220,110 C290,190 330,300 346,392',
    vestibulo: 'M150,372 C220,380 290,394 340,402',
    vago: 'M150,500 C230,480 300,450 346,414',
    sangre: 'M790,540 C640,520 470,440 392,386',
  };
  const orden = ['corteza', 'vestibulo', 'vago', 'sangre'] as const;
  const lucen = modo === 'aferencias' ? orden.slice(0, paso + 1) : [];
  return (
    <svg viewBox="0 0 800 560" role="img" aria-label="Centro del vómito y zona quimiorreceptora gatillo en el bulbo">
      <path d={cerebro} fill="#c9a9a5" stroke="#8d6f6b" strokeWidth={2.5} />
      <path d="M150,110 C180,130 210,126 240,104 M300,60 C306,96 330,110 360,102 M420,90 C420,130 450,150 486,142 M140,210 C176,214 200,236 230,240 M300,180 C330,190 380,186 420,206" fill="none" stroke="#8d6f6b" strokeWidth={2} />
      <path d={cerebelo} fill="#b99a96" stroke="#8d6f6b" strokeWidth={2.5} />
      {[318, 336, 354, 372].map((y) => (
        <path key={y} d={`M${410 + (y - 318) * 0.3},${y} C450,${y - 18} 510,${y - 14} 548,${y + 4}`} fill="none" stroke="#8d6f6b" strokeWidth={1.6} />
      ))}
      <path d={tronco} fill="#d8c3bb" stroke="#9a7f78" strokeWidth={2.5} />
      <ellipse cx={316} cy={330} rx={30} ry={34} fill="#d0b9b1" stroke="#9a7f78" strokeWidth={2} />
      <path d="M386,316 L418,340 L384,388 Z" fill={AIRE} />
      <circle cx={AP[0]} cy={AP[1]} r={11 + (modo !== 'eferencias' ? 2 * Math.sin(t * 4) : 0)} fill={DURAZNO} opacity={0.95} />
      <circle cx={CV[0]} cy={CV[1]} r={15 + 3 * Math.sin(t * 3.4)} fill={ROSA} />
      <circle cx={CV[0]} cy={CV[1]} r={28} fill={ROSA} opacity={0.18 + 0.1 * Math.sin(t * 3.4)} />
      <L x={488} y={334} s={21} c={INK} w={600}>
        Cerebelo
      </L>
      <L x={274} y={332} a="end" s={21} c={INK2} w={550}>
        Protuberancia
      </L>
      {modo === 'centros' && (
        <>
          <L x={300} y={140} s={22} c={INK2} w={550}>
            Corteza
          </L>
          <g opacity={ap(0)}>
            <L x={290} y={470} a="end" c={ROSA} s={24}>
              Centro del vómito
            </L>
            <L x={290} y={500} a="end" c={INK2} s={21} w={500}>
              formación reticular
            </L>
            <path d="M296,476 L336,416" stroke={ROSA} strokeWidth={2} strokeDasharray="5 6" />
          </g>
          <g opacity={ap(1)}>
            <L x={580} y={230} a="start" c={DURAZNO} s={24}>
              Área postrema
            </L>
            <L x={580} y={260} a="start" c={INK2} s={21} w={500}>
              zona gatillo:
            </L>
            <L x={580} y={286} a="start" c={INK2} s={21} w={500}>
              sin barrera
            </L>
            <L x={580} y={312} a="start" c={INK2} s={21} w={500}>
              hematoencefálica
            </L>
            <path d="M574,250 L400,374" stroke={DURAZNO} strokeWidth={2} strokeDasharray="5 6" />
          </g>
          <g opacity={ap(2)}>
            <Flecha d={`M${AP[0] - 6},${AP[1] + 8} L${CV[0] + 16},${CV[1] - 6}`} c={DURAZNO} w={4} id="cl-cv-zq" />
            <L x={580} y={470} a="start" c={INK} s={22}>
              Activa el centro
            </L>
          </g>
        </>
      )}
      {modo === 'aferencias' && (
        <>
          {orden.map((k, i) => (
            <g key={k} opacity={lucen.includes(k) ? 1 : 0.12}>
              <path d={vias[k]} fill="none" stroke={k === 'sangre' ? SANGRE : INK3} strokeWidth={k === 'sangre' ? 12 : 3} strokeLinecap="round" opacity={0.85} />
              {lucen.includes(k) && <Pulso d={vias[k]} t={t} c={k === 'sangre' ? DURAZNO : CIELO} v={45} desfase={i * 25} />}
            </g>
          ))}
          <g opacity={ap(0)}>
            <L x={16} y={34} a="start" c={CIELO} s={23}>
              Corteza:
            </L>
            <L x={16} y={62} a="start" c={CIELO} s={21} w={550}>
              olores, dolor
            </L>
          </g>
          <g opacity={ap(1)}>
            <L x={16} y={358} a="start" c={CIELO} s={23}>
              Vestíbulo:
            </L>
            <L x={16} y={386} a="start" c={CIELO} s={21} w={550}>
              movimiento
            </L>
          </g>
          <g opacity={ap(2)}>
            <L x={16} y={486} a="start" c={CIELO} s={23}>
              Vago:
            </L>
            <L x={16} y={514} a="start" c={CIELO} s={21} w={550}>
              distensión,
            </L>
            <L x={16} y={540} a="start" c={CIELO} s={21} w={550}>
              inflamación
            </L>
          </g>
          <g opacity={ap(3)}>
            <L x={590} y={418} a="start" c={DURAZNO} s={23}>
              Sangre:
            </L>
            <L x={590} y={446} a="start" c={DURAZNO} s={21} w={550}>
              fármacos,
            </L>
            <L x={590} y={472} a="start" c={DURAZNO} s={21} w={550}>
              uremia, toxinas
            </L>
            {Array.from({ length: 6 }, (_, i) => {
              const [x, y] = sobre(
                [
                  [790, 540],
                  [640, 520],
                  [500, 452],
                  [392, 386],
                ],
                (t * 0.3 + i / 6) % 1,
              );
              return <circle key={i} cx={x} cy={y} r={5} fill={ACIDO} />;
            })}
          </g>
        </>
      )}
      {modo === 'eferencias' && (
        <>
          {[
            { d: 'M352,420 C360,470 420,500 520,486', c: CIELO, txt: 'Frénico: diafragma', x: 530, y: 486, a: 'start' as const, n: 0 },
            { d: 'M356,430 C366,500 430,530 520,530', c: MENTA, txt: 'Espinales: abdominales', x: 530, y: 530, a: 'start' as const, n: 1 },
            { d: 'M346,414 C300,440 240,470 200,520', c: LILA, txt: 'Vago: EEI, fondo, píloro', x: 16, y: 546, a: 'start' as const, n: 2 },
          ].map((v) => (
            <g key={v.txt} opacity={ap(v.n)}>
              <path d={v.d} fill="none" stroke={v.c} strokeWidth={3} />
              <Pulso d={v.d} t={t} c={v.c} v={50} desfase={v.n * 30} />
              <L x={v.x} y={v.y} a={v.a} c={v.c} s={22}>
                {v.txt}
              </L>
            </g>
          ))}
          <L x={290} y={440} a="end" c={ROSA} s={23}>
            Centro del vómito
          </L>
        </>
      )}
    </svg>
  );
}

/* ─────────── El acto del vómito (perfil del tronco) ─────────── */

function ActoVomito({ t, paso, dt }: BaseFig) {
  const ap = (n: number) => apf(paso, dt, n);
  const cuerpo = 'M137,262 C126,290 112,330 104,382 C98,430 96,500 102,560 C108,620 122,680 150,720 L292,720 C296,640 294,560 288,470 C284,400 276,330 252,262 Z';
  const dy = 6 * ap(1) * (0.6 + 0.4 * Math.sin(t * 5));
  const diaf = `M104,${414 + dy} C126,${372 + dy} 200,${356 + dy} 288,${420 + dy}`;
  const emp = ap(1) * (4 + 3 * Math.sin(t * 5));
  const est = `M206,${428 + dy} C230,${404 + dy} 262,${410 + dy} 262,${446 + dy} C262,500 236,546 ${206 + emp * 0.2},560 C186,568 ${150 + emp},556 ${142 + emp},528 C${136 + emp},500 166,476 186,468 C200,460 200,446 206,${428 + dy} Z`;
  const ruta: [number, number][] = [
    [200, 500],
    [204, 440],
    [198, 400],
    [196, 330],
    [196, 262],
    [192, 190],
    [175, 158],
    [140, 128],
    [80, 118],
  ];
  const sube = paso >= 2;
  const parts = Array.from({ length: 9 }, (_, i) => {
    const [x, y] = sube ? sobre(ruta, (t * 0.42 + i / 9) % 1) : [186 + ((i * 23) % 46), 486 + ((i * 17) % 52)];
    return <circle key={i} cx={x} cy={y} r={7} fill={i % 3 === 0 ? BILIS : BOLO} opacity={0.95} />;
  });
  return (
    <svg viewBox="0 0 640 720" role="img" aria-label="El acto del vómito visto de perfil">
      <g transform="translate(40 0) scale(0.62)">
        <Cabeza e={{ paladar: ap(3), epiglotis: ap(3), ees: sube ? 1 : 0 }} id="cl-cab-av" rotulos={false} />
      </g>
      <path d={cuerpo} fill={PIEL} stroke={LINE} strokeWidth={3} />
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={244 + i * 2.6} y={280 + i * 42} width={30} height={32} rx={7} fill={HUESO} opacity={0.35} />
      ))}
      <path d="M196,262 L198,400 L204,436" fill="none" stroke={MUCOSA} strokeWidth={14} strokeLinecap="round" />
      <path d="M100,430 C96,500 100,570 112,630" fill="none" stroke={MUSCULO} strokeWidth={14 + emp} strokeLinecap="round" opacity={0.85} />
      <path d={diaf} fill="none" stroke={MUSCULO} strokeWidth={9} strokeLinecap="round" />
      <path d={est} fill={ESTOMAGO} stroke="#8f5f56" strokeWidth={3} />
      <path d="M206,560 C226,566 246,566 256,590" fill="none" stroke={INTESTINO} strokeWidth={14} strokeLinecap="round" />
      <circle cx={204} cy={560} r={9} fill={MUSCULO} opacity={0.3 + 0.7 * ap(1)} />
      {parts}
      <g opacity={paso === 0 ? 1 : 0.25}>
        <Pulso d="M262,640 C256,600 240,576 212,562" t={t} c={BILIS} w={8} v={55} />
      </g>
      <g opacity={ap(1)}>
        <Flecha d="M26,520 L84,520" c={MENTA} id="cl-av-1" />
        <Flecha d="M26,580 L88,580" c={MENTA} id="cl-av-2" />
        <Flecha d={`M200,322 L200,${352 + dy}`} c={MENTA} w={4} id="cl-av-3" />
      </g>
      <L x={330} y={640} a="start" c={BILIS} s={25} o={paso === 0 ? 1 : 0.45}>
        Bilis → estómago
      </L>
      <g opacity={ap(1)}>
        <L x={330} y={384} a="start" c={MENTA} s={25}>
          Diafragma ↓
        </L>
        <L x={330} y={500} a="start" c={MENTA} s={25}>
          Abdominales
        </L>
        <L x={330} y={570} a="start" c={INK2} s={23} w={550}>
          Píloro cerrado
        </L>
      </g>
      <L x={330} y={444} a="start" c={DURAZNO} s={25} o={ap(2)}>
        EEI abierto
      </L>
      <g opacity={ap(3)}>
        <L x={330} y={120} a="start" c={LILA} s={25}>
          Paladar ↑
        </L>
        <L x={330} y={152} a="start" c={LILA} s={25}>
          Glotis cerrada
        </L>
      </g>
    </svg>
  );
}

/* ─────────── Tracto digestivo por niveles ─────────── */

interface VistaTracto {
  luz?: Partial<Record<Organo, VTone>>;
  marca?: { o: Organo; tone: VTone };
  treitz?: boolean;
  nota?: string;
  notaTone?: VTone;
}

function Tracto({ t, paso, dt, vistas = [{}] }: BaseFig & { vistas?: VistaTracto[] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  return (
    <svg viewBox={`0 0 ${TR_W} ${TR_H + 40}`} role="img" aria-label="Tubo digestivo">
      <g opacity={0.55 + 0.45 * u}>
        <TractoFig luz={v.luz} marca={v.marca} treitz={v.treitz} t={t} s={21} />
      </g>
      {v.nota && (
        <L x={TR_W / 2} y={TR_H + 22} c={v.notaTone ? `var(--v-${v.notaTone})` : INK} s={22}>
          {v.nota}
        </L>
      )}
    </svg>
  );
}

/* ─────────── Partes: estómago de frente y pulmones ─────────── */

/** Estómago visto de frente (el fondo a la derecha del observador). Coordenadas 60–380 × 20–390. */
const ESTOMAGO_F = 'M250,135 C258,100 300,78 338,98 C368,116 368,180 360,220 C350,282 310,336 250,358 C200,374 140,360 110,330 L86,312 L94,288 C120,298 168,306 200,296 C224,286 232,250 232,210 C232,180 230,150 232,135 Z';

function EstomagoFrente({ id, esofago = true, children }: { id: string; esofago?: boolean; children?: ReactNode }) {
  return (
    <g>
      <defs>
        <clipPath id={id}>
          <path d={ESTOMAGO_F} />
        </clipPath>
      </defs>
      {esofago && <path d="M241,20 L241,140" stroke={MUCOSA} strokeWidth={20} strokeLinecap="round" />}
      <path d="M90,300 C62,304 52,332 60,358 C68,384 104,392 128,382" fill="none" stroke={INTESTINO} strokeWidth={22} strokeLinecap="round" />
      <path d={ESTOMAGO_F} fill={ESTOMAGO} stroke="#8f5f56" strokeWidth={3} />
      <path d="M262,150 C300,140 330,170 336,220 M240,330 C280,320 316,290 336,250" fill="none" stroke="#a87368" strokeWidth={2} opacity={0.6} />
      <g clipPath={`url(#${id})`}>{children}</g>
    </g>
  );
}

const PULMON_D = 'M352,70 C300,72 238,140 224,240 C210,340 218,430 252,462 C286,490 352,478 376,440 L380,230 C382,150 378,72 352,70 Z';
const PULMON_I = 'M448,70 C500,72 562,140 576,240 C590,340 582,430 548,462 C516,490 470,480 444,456 C460,420 452,380 428,350 L420,230 C418,150 422,72 448,70 Z';
const BRONQUIOS = 'M400,10 L400,170 M400,170 C380,186 356,206 340,232 C326,262 312,310 300,360 M400,170 C426,184 452,198 470,214 C490,240 504,290 512,334 M340,232 C318,240 292,250 270,262 M470,214 C494,224 518,236 536,250';

function Pulmones({ id, infiltrado = 0 }: { id: string; infiltrado?: number }) {
  return (
    <g>
      <defs>
        <clipPath id={id}>
          <path d={PULMON_D} />
        </clipPath>
      </defs>
      <path d={PULMON_D} fill="#d9a0a8" fillOpacity={0.28} stroke="#c98a8f" strokeWidth={3} />
      <path d={PULMON_I} fill="#d9a0a8" fillOpacity={0.28} stroke="#c98a8f" strokeWidth={3} />
      <path d="M244,190 C290,260 330,340 372,420 M556,190 C520,260 486,330 452,400" fill="none" stroke="#c98a8f" strokeWidth={2} opacity={0.7} />
      <g clipPath={`url(#${id})`}>
        <ellipse cx={290} cy={410} rx={90 * infiltrado} ry={60 * infiltrado} fill="#f1e3c8" opacity={0.55} />
      </g>
      <path d={BRONQUIOS} fill="none" stroke="#c98a8f" strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />
      <path d={BRONQUIOS} fill="none" stroke={AIRE} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/* ─────────── Hematemesis frente a hemoptisis ─────────── */

function Hematemesis({ t, paso, dt }: BaseFig) {
  const ap = (n: number) => apf(paso, dt, n);
  const gotas = Array.from({ length: 10 }, (_, i) => {
    const u = (t * 0.22 + i / 10) % 1;
    const x = 210 + Math.sin(i * 2.3) * 60 + u * 20;
    const y = 240 + Math.cos(i * 1.7) * 50;
    const m = clamp(u * 1.5);
    return <circle key={i} cx={x} cy={y} r={8} fill={`rgb(${Math.round(196 - 96 * m)},${Math.round(34 + 26 * m)},${Math.round(44 - 24 * m)})`} />;
  });
  const sube = Array.from({ length: 10 }, (_, i) => {
    const u = (t * 0.3 + i / 10) % 1;
    const [x, y] = sobre(
      [
        [300, 360],
        [330, 260],
        [340, 232],
        [400, 170],
        [400, 10],
      ],
      u,
    );
    return i % 2 ? <circle key={i} cx={x + 6} cy={y} r={8} fill="none" stroke="#f3eef6" strokeWidth={2.5} /> : <circle key={i} cx={x - 4} cy={y} r={8} fill="#e2384f" />;
  });
  return (
    <svg viewBox="0 0 800 540" role="img" aria-label="Hematemesis frente a hemoptisis">
      <g transform="translate(10 40)">
        <EstomagoFrente id="cl-hm-est">
          {gotas}
          {['H⁺', 'Cl⁻', 'H⁺'].map((s, i) => (
            <text key={i} x={150 + i * 70} y={320 + Math.sin(t * 2 + i) * 6} fill={ACIDO} fontSize={24} fontWeight={700} fontFamily="Inter Variable, sans-serif">
              {s}
            </text>
          ))}
        </EstomagoFrente>
        <Flecha d="M241,10 L241,-24" c={DURAZNO} w={5} id="cl-hm-1" />
      </g>
      <L x={220} y={460} c={DURAZNO} s={26}>
        Hematemesis
      </L>
      <L x={220} y={492} s={22} c={INK2} w={550}>
        vómito · ácida · borra de café
      </L>
      <g opacity={ap(1)}>
        <g transform="translate(330 20) scale(0.78)">
          <Pulmones id="cl-hm-pul" />
          {sube}
        </g>
        <L x={642} y={460} c={ROSA} s={26}>
          Hemoptisis
        </L>
        <L x={642} y={492} s={22} c={INK2} w={550}>
          tos · alcalina · espumosa
        </L>
      </g>
    </svg>
  );
}

/* ─────────── Lo que se pierde al vomitar ─────────── */

function Perdidas({ t, paso, dt }: BaseFig) {
  const ap = (n: number) => apf(paso, dt, n);
  const rinon = 'M590,120 C650,90 720,120 730,200 C738,270 700,330 640,330 C600,330 590,300 605,270 C620,240 620,210 602,185 C582,160 570,135 590,120 Z';
  const iones = (paso >= 1 ? ['H⁺', 'Cl⁻', 'H₂O', 'H⁺', 'Cl⁻'] : []).map((s, i) => {
    const u = (t * 0.32 + i / 5) % 1;
    return (
      <text key={i} x={230 - u * 40 + (i % 2) * 22} y={150 - u * 150} fill={s === 'H₂O' ? CIELO : ACIDO} fontSize={22} fontWeight={700} fontFamily="Inter Variable, sans-serif" opacity={1 - u}>
        {s}
      </text>
    );
  });
  const potasio = (paso >= 2 ? [0, 1, 2, 3] : []).map((i) => {
    const u = (t * 0.3 + i / 4) % 1;
    return (
      <text key={i} x={598 + Math.sin(i) * 6} y={260 + u * 220} fill={LILA} fontSize={22} fontWeight={700} fontFamily="Inter Variable, sans-serif" opacity={1 - u * 0.7}>
        K⁺
      </text>
    );
  });
  return (
    <svg viewBox="0 0 800 520" role="img" aria-label="Pérdidas por el vómito y respuesta del riñón">
      <g transform="translate(0 110) scale(0.92)">
        <EstomagoFrente id="cl-pe-est" />
      </g>
      {iones}
      <path d={rinon} fill="var(--v-kidney)" stroke="#a65d68" strokeWidth={3} opacity={0.4 + 0.6 * ap(2)} />
      <path d="M604,250 C596,320 590,400 590,500" fill="none" stroke="var(--v-urine)" strokeWidth={10} opacity={ap(2)} />
      {potasio}
      <path d="M360,420 L540,420" stroke={SANGRE} strokeWidth={26} strokeLinecap="round" opacity={0.75} />
      <g opacity={ap(3)}>
        {[0, 1, 2].map((i) => (
          <text key={i} x={380 + i * 54} y={428 + Math.sin(t * 2 + i) * 4} fill="#f3eef6" fontSize={18} fontWeight={700} fontFamily="Inter Variable, sans-serif">
            HCO₃⁻
          </text>
        ))}
      </g>
      <L x={240} y={26} c={DURAZNO} s={24} o={ap(1)}>
        Sale ácido y agua
      </L>
      <L x={680} y={70} c={LILA} s={24} o={ap(2)}>
        El riñón pierde K⁺
      </L>
      <g opacity={ap(3)}>
        <L x={450} y={470} c={ROSA} s={24}>
          Alcalosis · hipopotasemia
        </L>
        <L x={450} y={502} c={INK2} s={21} w={550}>
          y deshidratación
        </L>
      </g>
    </svg>
  );
}

/* ─────────── Aspiración ─────────── */

function Aspiracion({ t, paso, dt }: BaseFig) {
  const ap = (n: number) => apf(paso, dt, n);
  const caen = Array.from({ length: 7 }, (_, i) => {
    const [x, y] = sobre(
      [
        [400, 0],
        [400, 170],
        [340, 232],
        [300, 360],
      ],
      (t * 0.3 + i / 7) % 1,
    );
    return <circle key={i} cx={x} cy={y} r={7} fill={BOLO} />;
  });
  const bacterias = Array.from({ length: 8 }, (_, i) => (
    <ellipse key={i} cx={250 + (i % 4) * 26} cy={392 + Math.floor(i / 4) * 30 + Math.sin(t * 2 + i) * 3} rx={8} ry={4} fill={MENTA} transform={`rotate(${(i * 47) % 90} ${250 + (i % 4) * 26} ${392 + Math.floor(i / 4) * 30})`} />
  ));
  return (
    <svg viewBox="0 0 800 520" role="img" aria-label="Aspiración del vómito y neumonía">
      <Pulmones id="cl-as-pul" infiltrado={0.4 * ap(1) + 0.6 * ap(3)} />
      {caen}
      <g opacity={ap(2)}>{bacterias}</g>
      <L x={790} y={40} a="end" c={DURAZNO} s={23} o={ap(0)}>
        Contenido gástrico
      </L>
      <L x={790} y={68} a="end" c={DURAZNO} s={23} o={ap(0)}>
        a la vía aérea
      </L>
      <L x={110} y={300} a="middle" c={ACIDO} s={23} o={ap(1)}>
        Neumonitis
      </L>
      <L x={110} y={328} a="middle" c={ACIDO} s={23} o={ap(1)}>
        química
      </L>
      <L x={110} y={420} a="middle" c={MENTA} s={23} o={ap(2)}>
        Bacterias
      </L>
      <L x={400} y={505} c={ROSA} s={25} o={ap(3)}>
        Neumonía aspirativa
      </L>
    </svg>
  );
}

/* ─────────── Horario del vómito ─────────── */

function Horario({ t, paso, dt }: BaseFig) {
  const ap = (n: number) => apf(paso, dt, n);
  const X0 = 90;
  const X1 = 740;
  const hx = (h: number) => X0 + ((X1 - X0) * h) / 7;
  const bolo = hx(((t * 0.8) % 7));
  return (
    <svg viewBox="0 0 800 440" role="img" aria-label="Horario del vómito">
      <g opacity={ap(0)}>
        <circle cx={120} cy={80} r={30} fill={DURAZNO} />
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2 + t * 0.3;
          return <line key={i} x1={120 + Math.cos(a) * 40} y1={80 + Math.sin(a) * 40} x2={120 + Math.cos(a) * 54} y2={80 + Math.sin(a) * 54} stroke={DURAZNO} strokeWidth={5} strokeLinecap="round" />;
        })}
        <L x={190} y={66} a="start" c={DURAZNO} s={24}>
          Mañana, en ayunas
        </L>
        <L x={190} y={98} a="start" c={INK} s={21} w={550}>
          embarazo · alcohol · HTE
        </L>
      </g>
      <g opacity={ap(1)}>
        <path d="M560,52 A34,34 0 1 0 600,108 A26,26 0 1 1 560,52 Z" fill={LILA} />
        <L x={630} y={66} a="start" c={LILA} s={24}>
          Noche
        </L>
        <L x={630} y={98} a="start" c={INK} s={21} w={550}>
          orgánico
        </L>
      </g>
      <line x1={X0} y1={300} x2={X1} y2={300} stroke={INK3} strokeWidth={4} strokeLinecap="round" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((h) => (
        <g key={h}>
          <line x1={hx(h)} y1={290} x2={hx(h)} y2={310} stroke={INK3} strokeWidth={3} />
          <L x={hx(h)} y={334} s={19} c={INK3} w={500}>
            {`${h} h`}
          </L>
        </g>
      ))}
      <circle cx={bolo} cy={300} r={11} fill={BOLO} />
      <L x={hx(0)} y={262} s={22} c={INK2}>
        Comida
      </L>
      <g opacity={ap(2)}>
        <path d={`M${hx(1)},300 L${hx(1)},220`} stroke={CIELO} strokeWidth={3} />
        <L x={hx(1)} y={200} c={CIELO} s={24}>
          Estómago
        </L>
      </g>
      <g opacity={ap(3)}>
        <rect x={hx(4)} y={286} width={hx(6) - hx(4)} height={28} rx={14} fill={ROSA} opacity={0.35} />
        <path d={`M${hx(5)},286 L${hx(5)},220`} stroke={ROSA} strokeWidth={3} />
        <L x={hx(5)} y={200} c={ROSA} s={24}>
          Píloro
        </L>
        <L x={hx(5)} y={380} c={INK2} s={21} w={550}>
          4 a 6 horas
        </L>
      </g>
    </svg>
  );
}

/* ─────────── Estómago: qué falla en la dispepsia ─────────── */


type MecEst = 'acomodacion' | 'vaciamiento' | 'sensibilidad' | 'hp' | 'snc' | 'acido';

function Estomago({ t, paso, dt, vistas = [[]] }: BaseFig & { vistas?: MecEst[][] }) {
  const m = vistas[Math.min(paso, vistas.length - 1)];
  const on = (k: MecEst) => m.includes(k);
  const u = apf(paso, dt, paso);
  const fondo = on('acomodacion') ? 0 : 1;
  const est = `M300,120 C${300 - 30 * fondo},${76 - 20 * fondo} ${420 + 20 * fondo},${50 - 16 * fondo} ${460 + 10 * fondo},110 C500,170 500,250 470,320 C440,390 380,430 320,436 C260,440 214,414 196,384 L160,380 C150,350 170,330 206,334 C246,338 268,360 300,350 C350,334 370,290 360,240 C352,200 320,170 300,120 Z`;
  const vacia = on('vaciamiento') ? 0.25 : 1;
  const parts = Array.from({ length: 14 }, (_, i) => {
    const salida = ((t * 0.3 * vacia + i / 14) % 1) as number;
    const x = 420 - salida * 260 + Math.sin(i * 3) * 18;
    const y = 300 + Math.sin(salida * 3) * 40 + ((i * 13) % 30);
    return <circle key={i} cx={x} cy={y} r={7} fill={BOLO} opacity={0.85} />;
  });
  return (
    <svg viewBox="0 0 800 520" role="img" aria-label="Estómago: mecanismos de la dispepsia funcional">
      <path d="M300,120 C296,80 292,40 290,0" stroke={MUCOSA} strokeWidth={24} strokeLinecap="round" fill="none" />
      <path d={est} fill={ESTOMAGO} stroke="#8f5f56" strokeWidth={3} />
      <path d="M160,380 C120,384 100,410 104,450 C108,480 130,500 160,500" fill="none" stroke={INTESTINO} strokeWidth={22} strokeLinecap="round" />
      <rect x={150} y={366} width={22} height={30} rx={6} fill={MUSCULO} opacity={on('vaciamiento') ? 0.9 : 0.4} />
      {parts}
      <L x={390} y={86} c={INK2} s={19} w={550}>
        Fondo
      </L>
      <L x={430} y={250} c={INK2} s={19} w={550}>
        Cuerpo
      </L>
      <L x={262} y={420} c={INK2} s={19} w={550}>
        Antro
      </L>
      <L x={140} y={346} a="end" c={INK2} s={19} w={550}>
        Píloro
      </L>
      {on('acomodacion') && (
        <g opacity={u}>
          <L x={560} y={70} a="start" c={DURAZNO} s={22}>
            El fondo no se relaja:
          </L>
          <L x={560} y={96} a="start" c={DURAZNO} s={22}>
            plenitud, saciedad
          </L>
        </g>
      )}
      {on('vaciamiento') && (
        <g opacity={u}>
          <L x={20} y={300} a="start" c={DURAZNO} s={22}>
            Vaciamiento
          </L>
          <L x={20} y={326} a="start" c={DURAZNO} s={22}>
            retrasado
          </L>
        </g>
      )}
      {on('sensibilidad') && (
        <g opacity={u}>
          {['M480,180 C540,170 590,190 640,180', 'M490,260 C550,262 600,280 650,270', 'M460,340 C520,350 570,370 640,370'].map((d, i) => (
            <g key={d}>
              <path d={d} fill="none" stroke={LILA} strokeWidth={3} />
              <Pulso d={d} t={t} c={LILA} v={70} desfase={i * 30} />
            </g>
          ))}
          <L x={660} y={230} a="start" c={LILA} s={22}>
            Hipersensibilidad
          </L>
          <L x={660} y={256} a="start" c={LILA} s={22}>
            visceral
          </L>
        </g>
      )}
      {on('hp') && (
        <g opacity={u}>
          {Array.from({ length: 7 }, (_, i) => {
            const x = 220 + i * 26;
            const y = 352 + Math.sin(i * 1.7) * 10;
            return <path key={i} d={`M${x},${y} c6,-8 12,8 18,0 c6,-8 12,8 18,0`} fill="none" stroke={MENTA} strokeWidth={4} strokeLinecap="round" transform={`rotate(${(i * 37) % 60 - 30} ${x} ${y})`} />;
          })}
          <L x={300} y={480} c={MENTA} s={22}>
            H. pylori: inflamación
          </L>
        </g>
      )}
      {on('acido') && (
        <g opacity={u}>
          {Array.from({ length: 6 }, (_, i) => (
            <text key={i} x={330 + (i % 3) * 40} y={190 + Math.floor(i / 3) * 50 + Math.sin(t * 2 + i) * 5} fill={ACIDO} fontSize={21} fontWeight={700} fontFamily="Inter Variable, sans-serif">
              H⁺
            </text>
          ))}
        </g>
      )}
      {on('snc') && (
        <g opacity={u}>
          <path d="M640,380 C640,350 666,330 696,330 C730,330 756,352 756,380 C756,404 736,420 712,420 L670,420 C652,420 640,404 640,380 Z" fill="#c9a9a5" stroke="#8d6f6b" strokeWidth={2} />
          <path d="M650,400 C600,420 540,420 480,390" fill="none" stroke={CIELO} strokeWidth={3} strokeDasharray="6 6" />
          <Pulso d="M650,400 C600,420 540,420 480,390" t={t} c={CIELO} v={60} />
          <L x={700} y={450} c={CIELO} s={21}>
            Estrés, ansiedad
          </L>
        </g>
      )}
    </svg>
  );
}

/* ─────────── Mallory-Weiss frente a Boerhaave ─────────── */

function Desgarro({ t, paso, dt, vistas = ['presion', 'mw', 'boerhaave'] }: BaseFig & { vistas?: ('presion' | 'mw' | 'boerhaave')[] }) {
  const k = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  const golpe = k === 'presion' ? Math.abs(Math.sin(t * 4)) : 0;
  // Vista ampliada: esófago distal que atraviesa el diafragma y se abre en el estómago (fondo a la derecha).
  const pared = 'M262,0 L262,236 C258,300 240,380 214,540 L600,540 C620,430 600,320 540,262 C490,216 410,214 352,248 L352,0 Z';
  const luz = 'M282,0 L282,240 C278,300 262,380 238,540 L578,540 C596,430 578,334 526,282 C482,240 410,236 334,262 L334,0 Z';
  const sangre = Array.from({ length: 7 }, (_, i) => {
    const v = (t * 0.4 + i / 7) % 1;
    return <circle key={i} cx={300 + Math.sin(i * 2) * 8} cy={262 - v * 250} r={7} fill="#c8233a" opacity={1 - v * 0.5} />;
  });
  const fuga = Array.from({ length: 8 }, (_, i) => {
    const v = (t * 0.35 + i / 8) % 1;
    return <circle key={i} cx={356 + v * 190} cy={170 - v * 70 + Math.sin(i * 3) * 18} r={7} fill={BOLO} opacity={1 - v * 0.6} />;
  });
  return (
    <svg viewBox="0 0 800 540" role="img" aria-label="Mallory-Weiss: desgarro de la mucosa. Boerhaave: rotura de todo el espesor">
      <rect x={390} y={30} width={380} height={170} rx={24} fill={LILA} opacity={k === 'boerhaave' ? 0.14 : 0.05} />
      <L x={580} y={62} c={INK3} s={22} w={550}>
        Mediastino
      </L>
      <path d={pared} fill={MUSCULO} stroke="#6e3a3a" strokeWidth={3} transform={`translate(${-golpe * 3} 0) scale(${1 + golpe * 0.012} 1)`} />
      <path d={luz} fill={MUCOSA} />
      <path d="M282,262 C278,300 262,380 238,540 L578,540 C596,430 578,334 526,282 C504,268 470,260 440,258 Z" fill={ESTOMAGO} opacity={0.6} />
      <path d="M40,232 C140,214 220,226 262,232 M352,236 C420,226 600,214 780,236" fill="none" stroke={MUSCULO} strokeWidth={10} strokeLinecap="round" opacity={0.8} />
      <L x={110} y={198} c={INK2} s={21} w={550}>
        Diafragma
      </L>
      <path d="M262,262 L352,262" stroke={INK3} strokeWidth={2} strokeDasharray="6 5" />
      <L x={250} y={292} a="end" c={INK2} s={21} w={550}>
        Unión
      </L>
      <L x={250} y={318} a="end" c={INK2} s={21} w={550}>
        esofagogástrica
      </L>
      {k === 'presion' && (
        <g>
          <Flecha d={`M420,${480 - golpe * 20} L330,${330 - golpe * 20}`} c={MENTA} id="cl-dg-p" />
          <L x={690} y={290} c={MENTA} s={24}>
            Arcadas: la presión
          </L>
          <L x={690} y={320} c={MENTA} s={24}>
            sube de golpe
          </L>
        </g>
      )}
      {k === 'mw' && (
        <g opacity={u}>
          <path d="M296,226 L302,252 L296,280" stroke="#c8233a" strokeWidth={6} strokeLinecap="round" fill="none" />
          {sangre}
          <L x={690} y={290} c={ROSA} s={25}>
            Mallory-Weiss
          </L>
          <L x={690} y={322} c={INK2} s={21} w={550}>
            solo la mucosa
          </L>
        </g>
      )}
      {k === 'boerhaave' && (
        <g opacity={u}>
          <path d="M334,150 L364,168 L334,186 Z" fill={AIRE} stroke="#c8233a" strokeWidth={3} />
          {fuga}
          <L x={690} y={290} c={ROJO} s={25}>
            Boerhaave
          </L>
          <L x={690} y={322} c={INK2} s={21} w={550}>
            todo el espesor
          </L>
        </g>
      )}
    </svg>
  );
}

/* ─────────── Mucosa intestinal: absorción y mecanismos de diarrea ─────────── */

type ModoMucosa = 'normal' | 'secretora' | 'osmotica' | 'inflamatoria' | 'malabsortiva' | 'motora';

const MUCOSA_TXT: Record<ModoMucosa, { t: string; c: string }> = {
  normal: { t: 'Absorción: agua y nutrientes pasan a la sangre', c: MENTA },
  secretora: { t: 'Secreción activa: sale agua a la luz', c: CIELO },
  osmotica: { t: 'Un soluto no absorbido retiene agua', c: DURAZNO },
  inflamatoria: { t: 'Mucosa lesionada: sangre, moco y pus', c: ROJO },
  malabsortiva: { t: 'Vellosidades atróficas: la grasa no se absorbe', c: ACIDO },
  motora: { t: 'Tránsito rápido: no hay tiempo para absorber', c: LILA },
};

function Mucosa({ t, paso, dt, modo = 'normal', vistas }: BaseFig & { modo?: ModoMucosa; vistas?: ModoMucosa[] }) {
  const m = vistas ? vistas[Math.min(paso, vistas.length - 1)] : modo;
  const u = vistas && vistas.length > 1 ? apf(paso, dt, paso) : apf(paso, dt, 0);
  const BASE = 420;
  const xs = [110, 250, 390, 530, 670];
  const alto = m === 'malabsortiva' ? 70 : m === 'inflamatoria' ? 150 : 210;
  const ancho = m === 'malabsortiva' ? 120 : 92;
  const vello = (x: number, i: number) => {
    const h = alto + (m === 'inflamatoria' ? Math.sin(i * 2.1) * 30 : 0);
    const top = BASE - h;
    const w = ancho / 2;
    if (m === 'inflamatoria') {
      return `M${x - w},${BASE} L${x - w},${top + 30} L${x - w + 14},${top + 6} L${x - 6},${top + 26} L${x + 10},${top} L${x + w - 8},${top + 22} L${x + w},${top + 40} L${x + w},${BASE} Z`;
    }
    return `M${x - w},${BASE} L${x - w},${top + w} C${x - w},${top - 4} ${x + w},${top - 4} ${x + w},${top + w} L${x + w},${BASE} Z`;
  };
  const agua = (n: number, sube: boolean, rapido = 1) =>
    Array.from({ length: n }, (_, i) => {
      const v = (t * 0.35 * rapido + i / n) % 1;
      const x0 = 60 + ((i * 97) % 680);
      const y = sube ? BASE - 30 - v * 360 : 40 + v * 300;
      return <circle key={`a${i}`} cx={x0 + (m === 'motora' ? v * 160 : 0)} cy={y} r={6} fill={CIELO} opacity={sube ? 0.95 : 1 - v * 0.8} />;
    });
  const txt = MUCOSA_TXT[m];
  return (
    <svg viewBox="0 0 800 500" role="img" aria-label={`Mucosa intestinal: ${txt.t}`}>
      <rect x={0} y={0} width={800} height={BASE} fill="#241d2b" />
      {m === 'secretora' && <rect x={0} y={260 - 120 * u} width={800} height={BASE - 260 + 120 * u} fill={CIELO} opacity={0.12} />}
      <rect x={0} y={BASE} width={800} height={80} fill="#5b3a44" />
      <path d={`M0,${BASE + 46} L800,${BASE + 46}`} stroke={SANGRE} strokeWidth={16} opacity={0.85} />
      {xs.map((x, i) => (
        <g key={x}>
          <path d={vello(x, i)} fill={MUCOSA} stroke="#a0605c" strokeWidth={3} />
          {m !== 'malabsortiva' && m !== 'inflamatoria' && (
            <>
              <path d={`M${x - 14},${BASE} L${x - 14},${BASE - alto + 60} C${x - 14},${BASE - alto + 40} ${x + 14},${BASE - alto + 40} ${x + 14},${BASE - alto + 60} L${x + 14},${BASE}`} fill="none" stroke={SANGRE} strokeWidth={4} />
              <path d={`M${x},${BASE} L${x},${BASE - alto + 70}`} stroke="#efe6d6" strokeWidth={5} strokeLinecap="round" />
            </>
          )}
        </g>
      ))}
      {m === 'normal' && agua(14, false)}
      {m === 'motora' && agua(14, false, 2.6)}
      {m === 'secretora' && (
        <g opacity={u}>
          {agua(16, true)}
          {xs.slice(0, 4).map((x, i) => (
            <text key={i} x={x + 70} y={BASE - 40 - ((t * 60 + i * 40) % 200)} fill={ACIDO} fontSize={21} fontWeight={700} fontFamily="Inter Variable, sans-serif">
              Cl⁻
            </text>
          ))}
        </g>
      )}
      {m === 'osmotica' && (
        <g opacity={u}>
          {Array.from({ length: 7 }, (_, i) => {
            const x = 80 + i * 105 + Math.sin(t + i) * 8;
            const y = 110 + (i % 2) * 70;
            return (
              <g key={i}>
                <path d={`M${x - 14},${y} l7,-12 h14 l7,12 l-7,12 h-14 z`} fill={DURAZNO} />
                {[0, 1, 2, 3].map((k) => {
                  const a = (k / 4) * Math.PI * 2 + t * 1.2;
                  return <circle key={k} cx={x + Math.cos(a) * 30} cy={y + Math.sin(a) * 26} r={5.5} fill={CIELO} />;
                })}
              </g>
            );
          })}
        </g>
      )}
      {m === 'inflamatoria' && (
        <g opacity={u}>
          {Array.from({ length: 12 }, (_, i) => {
            const v = (t * 0.3 + i / 12) % 1;
            const x = 90 + ((i * 61) % 640);
            const y = BASE - 140 - v * 220;
            return i % 3 === 0 ? <circle key={i} cx={x} cy={y} r={8} fill="#f1e3c8" stroke="#c9b48c" strokeWidth={2} /> : <circle key={i} cx={x} cy={y} r={7} fill="#c8233a" />;
          })}
        </g>
      )}
      {m === 'malabsortiva' && (
        <g opacity={u}>
          {Array.from({ length: 12 }, (_, i) => {
            const v = (t * 0.12 + i / 12) % 1;
            return <circle key={i} cx={(v * 900 + i * 37) % 820} cy={150 + ((i * 53) % 140)} r={9 + (i % 3) * 3} fill={ACIDO} opacity={0.85} stroke="#b9a640" strokeWidth={2} />;
          })}
        </g>
      )}
      {m === 'motora' && (
        <g opacity={u}>
          <Flecha d="M80,70 L720,70" c={LILA} id="cl-mu-mo" />
        </g>
      )}
      <L x={400} y={476} c={INK2} s={19} w={550}>
        Vellosidades · capilar y quilífero
      </L>
      <L x={400} y={34} c={txt.c} s={24} o={u}>
        {txt.t}
      </L>
    </svg>
  );
}

/* ─────────── Recto y canal anal (corte sagital) ─────────── */

type ModoRecto = 'normal' | 'anismo' | 'tenesmo' | 'hemorroides';

function Defecacion({ t, paso, dt, modo = 'normal' }: BaseFig & { modo?: ModoRecto }) {
  const ap = (n: number) => apf(paso, dt, n);
  // Ángulo anorrectal: se abre (normal al pujar) o se cierra (anismo).
  const abre = modo === 'normal' ? ap(2) : 0;
  const cierra = modo === 'anismo' ? ap(1) : 0;
  const giro = -14 * abre + 10 * cierra;
  const recto = 'M330,0 C330,80 300,150 310,220 C320,290 360,320 420,330 C470,338 500,320 500,280 C500,200 470,120 470,0 Z';
  const ampolla = `M330,0 C330,80 300,150 310,220 C320,290 360,320 420,330 C470,338 500,320 500,280 C500,200 470,120 470,0`;
  const canal = `rotate(${giro} 430 340)`;
  const yh = modo === 'normal' ? 230 + 250 * clamp((paso >= 2 ? apf(paso, dt, 2) * 0.4 + ((t * 0.3) % 1) * 0.6 : 0)) : 230;
  return (
    <svg viewBox="0 0 800 560" role="img" aria-label="Recto y canal anal">
      {/* Pubis adelante (izquierda) y sacro y cóccix atrás (derecha) */}
      <path d="M120,360 C170,330 230,330 260,360 C270,400 240,430 190,430 C140,430 110,400 120,360 Z" fill={HUESO} opacity={0.6} />
      <L x={190} y={460} c={INK3} s={20} w={550}>
        Pubis
      </L>
      <path d="M640,0 C680,120 690,240 660,340 C650,380 620,410 590,420" fill="none" stroke={HUESO} strokeWidth={28} strokeLinecap="round" opacity={0.55} />
      <L x={720} y={250} c={INK3} s={20} w={550}>
        Sacro
      </L>
      <path d={recto} fill={MUCOSA} stroke={MUSCULO} strokeWidth={6} />
      {modo === 'tenesmo' && <path d={ampolla} fill="none" stroke={ROJO} strokeWidth={10} opacity={0.5 + 0.4 * Math.abs(Math.sin(t * 3))} />}
      <g transform={canal}>
        {/* Canal anal con esfínter interno (liso) y externo (estriado) */}
        <path d="M400,330 L420,500 L460,500 L470,330 Z" fill={MUCOSA} stroke={MUSCULO} strokeWidth={4} />
        <rect x={384} y={380} width={20} height={110} rx={8} fill="#b77a6f" opacity={modo === 'normal' ? 1 - 0.6 * ap(1) : 1} />
        <rect x={468} y={380} width={20} height={110} rx={8} fill="#b77a6f" opacity={modo === 'normal' ? 1 - 0.6 * ap(1) : 1} />
        <rect x={360} y={400} width={20} height={100} rx={8} fill={MUSCULO} opacity={modo === 'normal' ? 1 - 0.6 * ap(2) : 1} />
        <rect x={492} y={400} width={20} height={100} rx={8} fill={MUSCULO} opacity={modo === 'normal' ? 1 - 0.6 * ap(2) : 1} />
        {modo === 'hemorroides' && (
          <g>
            <circle cx={408} cy={398} r={14} fill="#7a3343" stroke="#5a1f2c" strokeWidth={2} />
            <circle cx={464} cy={404} r={13} fill="#7a3343" stroke="#5a1f2c" strokeWidth={2} />
            <g opacity={ap(1)}>
              <path d="M462,470 L470,500" stroke="#c8233a" strokeWidth={4} />
            </g>
            {Array.from({ length: 4 }, (_, i) => {
              const v = (t * 0.5 + i / 4) % 1;
              return <circle key={i} cx={440 + Math.sin(i) * 6} cy={500 + v * 50} r={5} fill="#e2384f" opacity={1 - v} />;
            })}
          </g>
        )}
      </g>
      {/* Puborrectal: el cabestrillo que forma el ángulo */}
      <path d={`M210,${380 + 10 * cierra} C300,${420 + 20 * cierra - 30 * abre} 420,${400 + 20 * cierra - 30 * abre} 500,${330 - 10 * abre}`} fill="none" stroke={MUSCULO} strokeWidth={16 + 6 * cierra} strokeLinecap="round" opacity={0.9} />
      {modo !== 'tenesmo' && modo !== 'hemorroides' && (
        <ellipse cx={415 + (yh - 230) * 0.1} cy={yh} rx={44} ry={30} fill="var(--v-stool)" stroke="var(--v-stool-2)" strokeWidth={2} opacity={yh > 470 ? 1 - (yh - 470) / 30 : 1} />
      )}
      <L x={300} y={512} c={INK3} s={19} w={550}>
        Puborrectal
      </L>
      <L x={600} y={470} a="start" c={INK3} s={19} w={550}>
        Esfínteres
      </L>
      {(
        {
          normal: [
            [CIELO, 0, ['El recto', 'se distiende']],
            [MENTA, 1, ['Se relaja el', 'esfínter interno']],
            [LILA, 2, ['Al pujar se relajan', 'puborrectal', 'y esfínter externo']],
          ],
          anismo: [
            [DURAZNO, 0, ['El paciente', 'puja…']],
            [ROJO, 1, ['…pero el', 'puborrectal se', 'contrae: no sale']],
          ],
          tenesmo: [
            [ROJO, 0, ['Recto', 'inflamado']],
            [INK, 1, ['Siente el recto', 'ocupado:', 'tenesmo']],
          ],
          hemorroides: [
            [ROSA, 0, ['Hemorroides:', 'venas del', 'canal anal']],
            [ROJO, 1, ['Fisura:', 'desgarro']],
            [INK, 1, ['Gotas rojas', 'al final']],
          ],
        } as Record<ModoRecto, [string, number, string[]][]>
      )[modo].map(([c, n, lineas], k) => (
        <g key={k} opacity={ap(n)}>
          {lineas.map((ln, j) => (
            <L key={j} x={20} y={50 + k * 100 + j * 28} a="start" c={c} s={23}>
              {ln}
            </L>
          ))}
        </g>
      ))}
    </svg>
  );
}

/* ─────────── Escala de Bristol ─────────── */

function Bristol({ paso, dt }: BaseFig) {
  const ap = (n: number) => apf(paso, dt, n);
  const grupo = (n: number) => (n <= 2 ? 0 : n <= 4 ? 1 : 2);
  const tonos = [DURAZNO, MENTA, CIELO];
  const nombres = ['Constipación', 'Normal', 'Diarrea'];
  return (
    <svg viewBox="0 0 800 520" role="img" aria-label="Escala de heces de Bristol">
      {[1, 2, 3, 4, 5, 6, 7].map((n, i) => {
        const g = grupo(n);
        const y = 30 + i * 68;
        return (
          <g key={n} opacity={0.18 + 0.82 * ap(g)}>
            <L x={60} y={y + 26} c={tonos[g]} s={28}>
              {String(n)}
            </L>
            <g transform={`translate(110 ${y - 8}) scale(2.2 1.2)`}>
              <BristolGlyph n={n} />
            </g>
          </g>
        );
      })}
      {[0, 1, 2].map((g) => {
        const y0 = [30, 166, 302][g];
        const y1 = [134, 270, 506][g];
        return (
          <g key={g} opacity={ap(g)}>
            <path d={`M330,${y0} L344,${y0} L344,${y1} L330,${y1}`} fill="none" stroke={tonos[g]} strokeWidth={4} />
            <L x={370} y={(y0 + y1) / 2} a="start" c={tonos[g]} s={28}>
              {nombres[g]}
            </L>
          </g>
        );
      })}
    </svg>
  );
}

/* ─────────── El circuito de la bilirrubina ─────────── */

type ModoBili = 'normal' | 'pre' | 'hepatica' | 'post';

const BI_C = '#f2d14b';
const BD_C = '#8fc46a';

function Bilirrubina({ t, paso, dt, modo = 'normal' }: BaseFig & { modo?: ModoBili }) {
  const ap = (n: number) => apf(paso, dt, n);
  const roto = modo === 'hepatica';
  const tapado = modo === 'post';
  const hemolisis = modo === 'pre';
  const vaso = 'M20,92 L780,92';
  // Recorridos de las partículas
  const aHigado: [number, number][] = [
    [60, 92],
    [300, 92],
    [360, 150],
  ];
  const aBilis: [number, number][] = [
    [400, 290],
    [404, 360],
    [430, 420],
    [560, 452],
    [740, 452],
  ];
  const aRinon: [number, number][] = [
    [470, 92],
    [640, 92],
    [670, 170],
  ];
  const parts = (ruta: [number, number][], n: number, c: string, v: number, r = 6) =>
    Array.from({ length: n }, (_, i) => {
      const [x, y] = sobre(ruta, (t * v + i / n) % 1);
      return <circle key={`${c}${i}`} cx={x} cy={y} r={r} fill={c} />;
    });
  const colorHeces = modo === 'post' ? '#efe6d6' : modo === 'pre' ? '#5e3d22' : 'var(--v-stool)';
  const colorOrina = modo === 'hepatica' || modo === 'post' ? '#8a4a1c' : modo === 'pre' ? '#b07a2a' : '#e6c55a';
  return (
    <svg viewBox="0 0 800 540" role="img" aria-label="Circuito de la bilirrubina">
      {/* Sangre */}
      <path d={vaso} stroke={SANGRE} strokeWidth={34} strokeLinecap="round" opacity={0.75} />
      {Array.from({ length: 6 }, (_, i) => {
        const x = 40 + ((t * 40 + i * 44) % 200);
        const rompe = hemolisis && i % 2 === 0;
        return <ellipse key={i} cx={x} cy={92} rx={rompe ? 9 : 12} ry={7} fill={rompe ? 'none' : '#e2384f'} stroke="#ff8a96" strokeWidth={rompe ? 2 : 0} strokeDasharray={rompe ? '3 3' : undefined} />;
      })}
      <L x={20} y={44} a="start" c={INK2} s={21} w={550}>
        Glóbulos rojos → hemoglobina
      </L>
      {/* Indirecta unida a albúmina */}
      <g opacity={ap(0)}>{parts(aHigado, hemolisis ? 12 : 5, BI_C, 0.25, 7)}</g>
      {(hemolisis || roto) && <g opacity={ap(1)}>{parts([[300, 92], [780, 92]], 6, BI_C, 0.2, 7)}</g>}
      {/* Hepatocito */}
      <path d="M330,150 L470,140 L500,220 L470,300 L340,300 L310,220 Z" fill="#8a5450" stroke={roto ? ROJO : '#5d2a2a'} strokeWidth={roto ? 5 : 3} />
      <circle cx={405} cy={215} r={22} fill="#5d2a2a" opacity={0.7} />
      {roto && <path d="M350,170 L380,200 L360,230 M440,160 L420,200 L450,240" stroke={ROJO} strokeWidth={4} fill="none" />}
      <L x={380} y={330} a="end" c={INK2} s={20} w={550}>
        Hepatocito:
      </L>
      <L x={380} y={356} a="end" c={INK2} s={20} w={550}>
        capta, conjuga, excreta
      </L>
      {/* Bilis e intestino */}
      <path d="M400,300 C404,360 420,410 470,440 L780,452" fill="none" stroke="var(--v-bile)" strokeWidth={16} strokeLinecap="round" />
      <path d="M300,470 C360,450 420,444 470,446 L790,460 L790,500 L460,490 C420,488 360,492 300,512 Z" fill={INTESTINO} opacity={0.8} />
      {tapado && (
        <g>
          <circle cx={418} cy={402} r={14} fill="var(--v-stone)" stroke="var(--v-stone-2)" strokeWidth={2} />
          <L x={300} y={402} a="end" c={DURAZNO} s={21}>
            Obstrucción
          </L>
        </g>
      )}
      {!tapado && <g opacity={ap(2)}>{parts(aBilis, 6, BD_C, 0.22, 7)}</g>}
      {tapado && <g opacity={ap(1)}>{parts([[400, 290], [470, 150], [520, 92], [780, 92]], 7, BD_C, 0.25, 7)}</g>}
      {roto && <g opacity={ap(1)}>{parts([[440, 160], [520, 92], [780, 92]], 4, BD_C, 0.25, 7)}</g>}
      {Array.from({ length: 4 }, (_, i) => (
        <ellipse key={i} cx={560 + i * 52} cy={476} rx={20} ry={12} fill={colorHeces} stroke="#3a2a1a" strokeWidth={1.5} opacity={0.4 + 0.6 * ap(2)} />
      ))}
      <L x={640} y={526} c={INK} s={21} o={ap(2)}>
        {modo === 'post' ? 'Heces acólicas' : modo === 'pre' ? 'Heces hipercólicas' : modo === 'hepatica' ? 'Heces normo o hipocólicas' : 'Estercobilina: color de las heces'}
      </L>
      {/* Riñón y orina */}
      <path d="M650,160 C690,140 730,160 734,210 C738,256 706,286 670,282 C646,280 640,260 650,244 C660,228 660,212 648,196 C636,182 634,168 650,160 Z" fill="var(--v-kidney)" stroke="#a65d68" strokeWidth={3} />
      <rect x={740} y={300} width={44} height={70} rx={10} fill={colorOrina} stroke={INK3} strokeWidth={2} opacity={0.4 + 0.6 * ap(modo === 'normal' ? 3 : 2)} />
      <path d="M690,282 C700,300 720,310 740,320" fill="none" stroke="var(--v-urine)" strokeWidth={6} />
      {(modo === 'normal' || modo === 'pre') && <g opacity={ap(modo === 'normal' ? 3 : 2)}>{parts(aRinon, 3, '#e6c55a', 0.2, 5)}</g>}
      {(modo === 'hepatica' || modo === 'post') && <g opacity={ap(2)}>{parts(aRinon, 5, BD_C, 0.25, 7)}</g>}
      <L x={760} y={394} a="end" c={INK} s={21} o={ap(modo === 'normal' ? 3 : 2)}>
        {modo === 'hepatica' || modo === 'post' ? 'Coluria' : modo === 'pre' ? 'Orina parda' : 'Orina normal'}
      </L>
      {/* Leyenda */}
      <circle cx={40} cy={160} r={9} fill={BI_C} />
      <L x={58} y={160} a="start" s={21} c={INK}>
        Indirecta + albúmina
      </L>
      <circle cx={40} cy={196} r={9} fill={BD_C} />
      <L x={58} y={196} a="start" s={21} c={INK}>
        Directa (conjugada)
      </L>
      {modo === 'pre' && (
        <L x={150} y={250} c={DURAZNO} s={23} o={ap(0)}>
          Hemólisis: sobra indirecta
        </L>
      )}
      {modo === 'hepatica' && (
        <L x={150} y={250} c={ROJO} s={23} o={ap(0)}>
          Hepatocito lesionado
        </L>
      )}
      {modo === 'post' && (
        <L x={150} y={250} c={DURAZNO} s={23} o={ap(0)}>
          La directa refluye
        </L>
      )}
    </svg>
  );
}

/* ─────────── Vía biliar por vistas ─────────── */

interface VistaBiliar {
  luz?: Partial<Record<ViaBiliar, VTone>>;
  calculo?: ViaBiliar;
  tumor?: ViaBiliar;
  dilata?: ViaBiliar[];
  nota?: string;
  notaTone?: VTone;
}

function Biliar({ t, paso, dt, vistas = [{}] }: BaseFig & { vistas?: VistaBiliar[] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  return (
    <svg viewBox={`0 0 ${BIL_W} ${BIL_H + 40}`} role="img" aria-label="Vía biliar y páncreas">
      <g opacity={0.55 + 0.45 * u}>
        <BiliarFig luz={v.luz} calculo={v.calculo} tumor={v.tumor} dilata={v.dilata} t={t} s={20} />
      </g>
      {v.nota && (
        <L x={BIL_W / 2} y={BIL_H + 22} c={v.notaTone ? `var(--v-${v.notaTone})` : INK} s={22}>
          {v.nota}
        </L>
      )}
    </svg>
  );
}

/* ─────────── Ascitis en corte transversal: decúbito dorsal y lateral ─────────── */

function Ascitis({ t, paso, dt, vistas = ['dorsal', 'lateral'] }: BaseFig & { vistas?: ('dorsal' | 'lateral' | 'onda')[] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  const giro = v === 'lateral' ? -90 * u : 0;
  // Corte del abdomen (elipse) con la columna atrás; el líquido cae a lo declive y las asas flotan.
  const asas = [
    [-60, -40],
    [10, -55],
    [70, -30],
    [-20, -10],
    [40, 5],
  ];
  const ola = v === 'onda' ? Math.sin(t * 6) * 6 : 0;
  return (
    <svg viewBox="0 0 800 520" role="img" aria-label="Ascitis: el líquido cae a lo declive y las asas flotan">
      <g transform={`translate(400 270) rotate(${giro})`}>
        <ellipse rx={250} ry={170} fill={PIEL} stroke={LINE} strokeWidth={4} />
        <defs>
          <clipPath id="cl-asc">
            <ellipse rx={232} ry={152} />
          </clipPath>
        </defs>
        <g clipPath="url(#cl-asc)">
          {/* El líquido siempre abajo de la pantalla: compensamos la rotación */}
          <g transform={`rotate(${-giro})`}>
            <path d={`M-300,${20 + ola} C-150,${10 - ola} 150,${30 + ola} 300,${20 - ola} L300,300 L-300,300 Z`} fill="#4b6f8f" opacity={0.75} />
          </g>
          <g transform={`rotate(${-giro})`}>
            {asas.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y - 40 + Math.sin(t * 1.5 + i) * 3} r={32} fill={INTESTINO} stroke="#8f5f56" strokeWidth={3} />
            ))}
          </g>
        </g>
        <rect x={-30} y={128} width={60} height={46} rx={10} fill={HUESO} />
      </g>
      {v !== 'onda' && (
        <>
          <L x={400} y={36} c={CIELO} s={23} o={u}>
            {v === 'dorsal' ? 'Arriba timpanismo: asas con gas' : 'El líquido se corre al lado declive'}
          </L>
          <L x={400} y={500} c={DURAZNO} s={23} o={u}>
            {v === 'dorsal' ? 'Flancos mates: matidez de concavidad superior' : 'Matidez desplazable'}
          </L>
        </>
      )}
      {v === 'onda' && (
        <>
          <ManoFrente x={140} y={260} escala={0.8} />
          <rect x={385} y={90} width={30} height={150} rx={12} fill="#d6b49d" stroke="#6f5a4e" strokeWidth={2} opacity={u} />
          <L x={400} y={36} c={LILA} s={23} o={u}>
            Onda ascítica: golpe en un flanco, se siente en el otro
          </L>
          <L x={400} y={500} c={INK2} s={21} w={550} o={u}>
            El borde de una mano en la línea media frena la onda de la pared
          </L>
        </>
      )}
    </svg>
  );
}

/* ─────────── Circulación colateral ─────────── */

function Colateral({ t, paso, dt, vistas = ['porto', 'cava'] }: BaseFig & { vistas?: ('porto' | 'cava')[] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  const C = 'M200,40 C150,40 120,90 118,150 L112,320 C110,400 130,460 160,500 L440,500 C470,460 490,400 488,320 L482,150 C480,90 450,40 400,40 Z';
  const ombligo: [number, number] = [300, 300];
  const medusa = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    const x2 = ombligo[0] + Math.cos(a) * 110;
    const y2 = ombligo[1] + Math.sin(a) * 90;
    const cx = ombligo[0] + Math.cos(a + 0.5) * 60;
    const cy = ombligo[1] + Math.sin(a + 0.5) * 50;
    return `M${ombligo[0]},${ombligo[1]} Q${cx},${cy} ${x2},${y2}`;
  });
  const asc = [150, 200, 400, 450].map((x, i) => `M${x},480 C${x + (i % 2 ? 20 : -20)},380 ${x + (i % 2 ? -20 : 20)},250 ${x},90`);
  const sentido = (d: string, k: number, rev = false) => <Pulso key={k} d={d} t={rev ? -t : t} c={CIELO} v={35} w={4} desfase={k * 13} />;
  return (
    <svg viewBox="0 0 800 540" role="img" aria-label="Circulación colateral portocava y cavocava">
      <path d={C} fill={PIEL} stroke={LINE} strokeWidth={3} />
      <circle cx={ombligo[0]} cy={ombligo[1]} r={8} fill={LINE} />
      {v === 'porto' && (
        <g opacity={u}>
          {medusa.map((d, k) => (
            <path key={k} d={d} fill="none" stroke="#5b7fb0" strokeWidth={7} strokeLinecap="round" />
          ))}
          {medusa.map((d, k) => sentido(d, k))}
          <L x={640} y={180} c={CIELO} s={24}>
            Portocava
          </L>
          <L x={640} y={212} c={INK2} s={21} w={550}>
            sale del ombligo:
          </L>
          <L x={640} y={240} c={INK2} s={21} w={550}>
            cabeza de medusa
          </L>
          <L x={640} y={300} c={INK} s={21} w={550}>
            Hipertensión portal
          </L>
        </g>
      )}
      {v === 'cava' && (
        <g opacity={u}>
          {asc.map((d, k) => (
            <path key={k} d={d} fill="none" stroke="#5b7fb0" strokeWidth={7} strokeLinecap="round" />
          ))}
          {asc.map((d, k) => sentido(d, k, false))}
          <L x={640} y={180} c={LILA} s={24}>
            Cavocava
          </L>
          <L x={640} y={212} c={INK2} s={21} w={550}>
            ascendente: del pubis
          </L>
          <L x={640} y={240} c={INK2} s={21} w={550}>
            hacia el tórax
          </L>
          <L x={640} y={300} c={INK} s={21} w={550}>
            Obstrucción de la cava
          </L>
        </g>
      )}
    </svg>
  );
}

/* ─────────── Palpar con la inspiración: el hígado y el bazo bajan ─────────── */

function Inspiracion({ t, paso, dt, organo = 'higado' }: BaseFig & { organo?: 'higado' | 'bazo' }) {
  const ap = (n: number) => apf(paso, dt, n);
  const resp = paso >= 1 ? (1 - Math.cos(t * 1.6)) / 2 : 0;
  const baja = 34 * resp;
  const higado = organo === 'higado';
  return (
    <svg viewBox="0 0 800 520" role="img" aria-label={higado ? 'El hígado desciende con la inspiración hacia la mano' : 'El bazo crece en dirección a la fosa ilíaca derecha'}>
      <path d="M150,40 C110,60 96,120 100,200 L106,470 L694,470 L700,200 C704,120 690,60 650,40 Z" fill={PIEL} stroke={LINE} strokeWidth={3} />
      {/* Rebordes costales */}
      <path d="M150,170 C250,230 330,250 400,250 C470,250 550,230 650,170" fill="none" stroke={HUESO} strokeWidth={10} strokeLinecap="round" opacity={0.7} />
      <path d={`M140,${110 + baja} C250,${70 + baja} 400,${80 + baja} 560,${120 + baja}`} fill="none" stroke={MUSCULO} strokeWidth={8} opacity={0.8} />
      {higado ? (
        <g transform={`translate(0 ${baja})`}>
          <path d="M120,130 C200,100 360,110 470,150 C430,210 360,250 280,268 C200,282 140,260 120,220 Z" fill={HIGADO} stroke="#5d2a2a" strokeWidth={3} />
        </g>
      ) : (
        <g>
          {(() => {
            const g = 1 + 1.4 * ap(2);
            return <ellipse cx={600 - 60 * ap(2)} cy={170 + 80 * ap(2)} rx={46 * g} ry={26 * g} transform={`rotate(-35 ${600 - 60 * ap(2)} ${170 + 80 * ap(2)})`} fill="#7a4a72" stroke="#4e2c49" strokeWidth={3} />;
          })()}
          <g opacity={ap(2)}>
            <Flecha d="M560,230 L300,420" c={DURAZNO} id="cl-bz-dir" />
          </g>
        </g>
      )}
      <ManoFrente x={higado ? 260 : 300} y={higado ? 360 : 420} escala={0.9} />
      <g opacity={ap(0)}>
        <L x={400} y={500} c={INK} s={22}>
          {higado ? 'La mano espera debajo del reborde, desde la fosa ilíaca derecha' : 'El bazo normal no se palpa: está bajo las costillas'}
        </L>
      </g>
      <g opacity={ap(1)}>
        <L x={720} y={60} a="end" c={MENTA} s={23}>
          Inspiración: el diafragma baja
        </L>
        <L x={720} y={90} a="end" c={MENTA} s={23}>
          {higado ? 'y empuja el hígado hacia la mano' : 'y lo acerca al reborde'}
        </L>
      </g>
      {!higado && (
        <L x={540} y={400} c={DURAZNO} s={23} o={ap(2)}>
          Crece hacia la fosa ilíaca derecha
        </L>
      )}
    </svg>
  );
}

/* ─────────── Reflujo gastroesofágico y Barrett ─────────── */

type ModoReflujo = 'normal' | 'erge' | 'presion' | 'barrett';

function Reflujo({ t, paso, dt, vistas = ['normal', 'erge'] }: BaseFig & { vistas?: ModoReflujo[] }) {
  const m = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  if (m === 'barrett') {
    // Zoom de la mucosa del tercio inferior: plano estratificado → cilíndrico simple.
    const w = 760;
    const cambia = clamp(u * 1.1);
    const capas = Array.from({ length: 4 }, (_, f) =>
      Array.from({ length: 13 }, (_, i) => {
        const x = 20 + i * 56 + (f % 2 ? 28 : 0);
        const y = 330 - f * 34;
        return <ellipse key={`${f}-${i}`} cx={x} cy={y} rx={26} ry={13} fill="#e7c9c0" stroke="#b48d84" strokeWidth={1.5} />;
      }),
    );
    const columnas = Array.from({ length: 16 }, (_, i) => (
      <g key={i}>
        <rect x={420 + i * 22} y={230} width={20} height={120} rx={6} fill="#d9a0a8" stroke="#a46670" strokeWidth={1.5} />
        <ellipse cx={430 + i * 22} cy={330} rx={6} ry={8} fill="#7a3f4c" />
        {i % 4 === 1 && <ellipse cx={430 + i * 22} cy={258} rx={7} ry={14} fill="#f3eef6" opacity={0.85} />}
      </g>
    ));
    return (
      <svg viewBox="0 0 800 480" role="img" aria-label="Esófago de Barrett: metaplasia del epitelio">
        <rect x={20} y={360} width={w} height={60} fill="#7c4a4f" opacity={0.6} />
        <g>{capas}</g>
        <g opacity={cambia}>
          <rect x={410} y={200} width={370} height={160} fill={'var(--v-bg)'} />
          {columnas}
        </g>
        {Array.from({ length: 6 }, (_, i) => (
          <text key={i} x={60 + i * 120} y={150 + Math.sin(t * 2 + i) * 10} fill={ACIDO} fontSize={24} fontWeight={700} fontFamily="Inter Variable, sans-serif">
            H⁺
          </text>
        ))}
        <L x={200} y={440} c={INK} s={22}>
          Plano estratificado
        </L>
        <L x={200} y={466} c={INK2} s={19} w={550}>
          no soporta el ácido
        </L>
        <g opacity={cambia}>
          <L x={600} y={440} c={ROSA} s={22}>
            Cilíndrico (intestinal)
          </L>
          <L x={600} y={466} c={INK2} s={19} w={550}>
            Barrett: preneoplásico
          </L>
        </g>
        <L x={400} y={60} c={ACIDO} s={23}>
          Años de reflujo ácido
        </L>
      </svg>
    );
  }
  const abierto = m === 'erge' || m === 'presion' ? 0.5 + 0.5 * Math.abs(Math.sin(t * 1.8)) : 0;
  const empuje = m === 'presion' ? 6 * Math.abs(Math.sin(t * 2)) : 0;
  const sube = m === 'erge' || m === 'presion';
  const gotas = Array.from({ length: 10 }, (_, i) => {
    const v = (t * 0.32 + i / 10) % 1;
    const y = sube ? 300 - v * (120 + 160 * abierto) : 330 + ((i * 17) % 60);
    const x = 300 + Math.sin(i * 2.1) * (sube ? 10 : 50);
    return <circle key={i} cx={x} cy={y} r={7} fill={ACIDO} opacity={sube ? 1 - v * 0.6 : 0.9} />;
  });
  const anchoEEI = 8 + 22 * abierto;
  return (
    <svg viewBox="0 0 800 500" role="img" aria-label="Barrera antirreflujo y reflujo gastroesofágico">
      <path d="M270,0 L270,250 M330,0 L330,250" stroke={MUCOSA} strokeWidth={10} />
      <rect x={275} y={0} width={50} height={250} fill={MUCOSA} opacity={0.55} />
      {/* Diafragma */}
      <path d="M20,236 C120,214 210,226 262,236 M338,236 C420,224 600,214 780,240" fill="none" stroke={MUSCULO} strokeWidth={12} strokeLinecap="round" opacity={0.85} />
      {/* Estómago */}
      <path d={`M270,280 C200,300 170,380 200,440 C240,500 430,500 470,430 C510,360 470,${290 - empuje} 410,${272 - empuje} C380,264 350,268 330,280 Z`} fill={ESTOMAGO} stroke="#8f5f56" strokeWidth={3} />
      {/* Esfínter esofágico inferior */}
      <rect x={300 - 32} y={248} width={32 - anchoEEI / 2} height={36} rx={8} fill={MUSCULO} />
      <rect x={300 + anchoEEI / 2} y={248} width={32 - anchoEEI / 2} height={36} rx={8} fill={MUSCULO} />
      {gotas}
      {m === 'presion' && (
        <g>
          <Flecha d="M300,500 L300,450" c={MENTA} id="cl-rf-p1" />
          <Flecha d="M120,420 L180,420" c={MENTA} id="cl-rf-p2" />
          <Flecha d="M560,420 L500,420" c={MENTA} id="cl-rf-p3" />
        </g>
      )}
      <L x={520} y={266} a="start" c={INK} s={22}>
        Esfínter esofágico inferior
      </L>
      <L x={120} y={200} c={INK2} s={20} w={550}>
        Diafragma
      </L>
      <g opacity={u}>
        {m === 'normal' && (
          <>
            <L x={560} y={60} c={MENTA} s={24}>
              El esfínter cerrado
            </L>
            <L x={560} y={90} c={MENTA} s={24}>
              frena el ácido
            </L>
          </>
        )}
        {m === 'erge' && (
          <>
            <L x={560} y={60} c={ACIDO} s={24}>
              Se relaja cuando no debe:
            </L>
            <L x={560} y={90} c={ACIDO} s={24}>
              el ácido sube
            </L>
            <L x={560} y={130} c={INK2} s={20} w={550}>
              pirosis, regurgitación
            </L>
          </>
        )}
        {m === 'presion' && (
          <>
            <L x={560} y={60} c={MENTA} s={24}>
              Más presión abdominal
            </L>
            <L x={560} y={90} c={INK2} s={20} w={550}>
              abdominales después de comer,
            </L>
            <L x={560} y={116} c={INK2} s={20} w={550}>
              decúbito, comida copiosa
            </L>
          </>
        )}
      </g>
    </svg>
  );
}

/* ─────────── Barrera mucosa gástrica: normal, AINE, H. pylori, úlcera, gastritis autoinmune ─────────── */

type ModoBarrera = 'normal' | 'aine' | 'hp' | 'ulcera' | 'autoinmune';

function Barrera({ t, paso, dt, vistas = ['normal'] }: BaseFig & { vistas?: ModoBarrera[] }) {
  const m = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : apf(paso, dt, 0);
  const Y = 250; // superficie del epitelio
  const celdas = Array.from({ length: 14 }, (_, i) => 30 + i * 53);
  const hueco = m === 'ulcera' ? [320, 520] : null;
  const vasoAncho = m === 'aine' ? 8 : 22;
  const moco = m === 'aine' || m === 'ulcera' ? 0.25 : 1;
  const acido = Array.from({ length: 10 }, (_, i) => {
    const x = 50 + i * 74 + Math.sin(t + i) * 8;
    const baja = m === 'aine' || m === 'ulcera' ? ((t * 40 + i * 37) % 120) : 0;
    return (
      <text key={i} x={x} y={50 + (i % 3) * 26 + baja} fill={ACIDO} fontSize={22} fontWeight={700} fontFamily="Inter Variable, sans-serif">
        H⁺
      </text>
    );
  });
  return (
    <svg viewBox="0 0 800 520" role="img" aria-label="Barrera mucosa gástrica">
      <rect x={0} y={0} width={800} height={Y - 30} fill="#2a2030" />
      {acido}
      <L x={700} y={40} c={ACIDO} s={21}>
        Luz: pH 1–2
      </L>
      {/* Moco y bicarbonato */}
      <rect x={0} y={Y - 34} width={800} height={34} fill="#cfe3ef" opacity={0.35 * moco} />
      <L x={110} y={Y - 50} c={CIELO} s={20} o={moco}>
        Moco + bicarbonato
      </L>
      {/* Epitelio */}
      {celdas.map((x, i) => {
        if (hueco && x > hueco[0] && x < hueco[1]) return null;
        const parietal = i % 3 === 1;
        const destruida = m === 'autoinmune' && parietal;
        return (
          <g key={x} opacity={destruida ? 0.25 + 0.75 * (1 - u) : 1}>
            <rect x={x - 24} y={Y} width={48} height={110} rx={8} fill={parietal ? '#d9a0a8' : MUCOSA} stroke="#a0605c" strokeWidth={2} />
            <circle cx={x} cy={Y + 80} r={9} fill="#7a3f4c" />
            {parietal && <text x={x} y={Y + 40} textAnchor="middle" fill="#3a1f26" fontSize={16} fontWeight={800} fontFamily="Inter Variable, sans-serif">P</text>}
          </g>
        );
      })}
      {hueco && (
        <g opacity={u}>
          <path d={`M${hueco[0]},${Y} C${hueco[0] + 30},${Y + 150} ${hueco[1] - 30},${Y + 150} ${hueco[1]},${Y}`} fill="#3a1f26" stroke={ROJO} strokeWidth={4} />
          <path d={`M${hueco[0] - 10},${Y + 118} L${hueco[1] + 10},${Y + 118}`} stroke={INK3} strokeWidth={2} strokeDasharray="6 5" />
          <L x={hueco[1] + 20} y={Y + 118} a="start" c={INK2} s={19} w={550}>
            muscular de la mucosa
          </L>
          <L x={420} y={Y + 235} c={ROJO} s={23}>
            Úlcera: pasa la muscular de la mucosa
          </L>
        </g>
      )}
      {/* Submucosa y capilar */}
      <rect x={0} y={Y + 110} width={800} height={150} fill="#5b3a44" opacity={0.7} />
      <path d={`M0,${Y + 190} L800,${Y + 190}`} stroke={SANGRE} strokeWidth={vasoAncho} strokeLinecap="round" />
      {m !== 'aine' &&
        Array.from({ length: 6 }, (_, i) => {
          const v = (t * 0.35 + i / 6) % 1;
          return (
            <text key={i} x={80 + i * 120} y={Y + 175 - v * 55} fill="#cfe3ef" fontSize={17} fontWeight={700} fontFamily="Inter Variable, sans-serif" opacity={1 - v * 0.5}>
              HCO₃⁻
            </text>
          );
        })}
      {m !== 'aine' && m !== 'ulcera' && (
        <L x={400} y={Y + 235} c={INK2} s={19} w={550}>
          Flujo sanguíneo · prostaglandinas
        </L>
      )}
      {m === 'aine' && (
        <g opacity={u}>
          <L x={400} y={168} c={DURAZNO} s={23}>
            AINE: sin prostaglandinas, vasoconstricción
          </L>
          <L x={400} y={198} c={DURAZNO} s={21} w={550}>
            no llega bicarbonato: el ácido daña
          </L>
        </g>
      )}
      {m === 'hp' && (
        <g opacity={u}>
          {Array.from({ length: 6 }, (_, i) => {
            const x = 140 + i * 95;
            const y = Y - 18 + Math.sin(t * 2 + i) * 4;
            return (
              <g key={i}>
                <ellipse cx={x} cy={y} rx={60} ry={30} fill={MENTA} opacity={0.12 + 0.06 * Math.sin(t * 2 + i)} />
                <path d={`M${x - 16},${y} c6,-8 12,8 18,0 c6,-8 12,8 18,0`} fill="none" stroke={MENTA} strokeWidth={5} strokeLinecap="round" />
              </g>
            );
          })}
          <L x={400} y={160} c={MENTA} s={22}>
            Ureasa: urea → amoníaco + CO₂
          </L>
          <L x={400} y={190} c={INK2} s={20} w={550}>
            nube alcalina que protege a la bacteria · el amoníaco lesiona
          </L>
        </g>
      )}
      {m === 'autoinmune' && (
        <g opacity={u}>
          {Array.from({ length: 8 }, (_, i) => {
            const x = 60 + i * 95;
            const y = Y + 140 + Math.sin(t * 2 + i) * 6;
            return <path key={i} d={`M${x},${y + 14} L${x},${y} M${x},${y} L${x - 10},${y - 12} M${x},${y} L${x + 10},${y - 12}`} stroke={LILA} strokeWidth={4} strokeLinecap="round" fill="none" />;
          })}
          <L x={400} y={160} c={LILA} s={22}>
            Anticuerpos contra las células parietales
          </L>
          <L x={400} y={190} c={INK2} s={20} w={550}>
            sin ácido (aclorhidria) · sin factor intrínseco: falta B12
          </L>
        </g>
      )}
      {m === 'normal' && (
        <L x={400} y={170} c={MENTA} s={22} o={u}>
          Moco, bicarbonato, flujo y prostaglandinas defienden la mucosa
        </L>
      )}
    </svg>
  );
}

/* ─────────── Las tres fases de la absorción de las grasas ─────────── */

type FaseAbs = 'normal' | 'intraluminal' | 'mucosa' | 'transporte';

function Absorcion({ t, paso, dt, vistas = ['normal'] }: BaseFig & { vistas?: FaseAbs[] }) {
  const m = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : apf(paso, dt, 0);
  const base = 380; // límite mucosa / submucosa
  const LY = base + 70; // vaso linfático
  const atrofia = m === 'mucosa';
  const XS = [330, 490, 650]; // vellosidades
  const alto = atrofia ? 46 : 200;
  const ancho = atrofia ? 150 : 104;
  const vello = (x: number, inset = 0) => {
    const w = ancho / 2 - inset;
    const top = base - alto + inset;
    const c = atrofia ? 18 : 56;
    return `M${x - w},${base} L${x - w},${top + c} C${x - w},${top - c * 0.3} ${x + w},${top - c * 0.3} ${x + w},${top + c} L${x + w},${base}`;
  };
  // gotas de grasa: en la luz, arriba de las vellosidades
  const gotas = Array.from({ length: 7 }, (_, i) => {
    const v = (t * 0.16 + i / 7) % 1;
    const sinDigerir = m === 'intraluminal';
    const x = 40 + v * (sinDigerir ? 740 : 200);
    const y = 112 + ((i * 41) % 56);
    const r = sinDigerir ? 15 : Math.max(4, 15 - v * 13);
    return <circle key={i} cx={x} cy={y} r={r} fill={ACIDO} stroke="#b9a640" strokeWidth={2} opacity={sinDigerir ? 0.9 : 1 - v * 0.6} />;
  });
  // micelas: entran por la punta de cada vellosidad (salvo con atrofia)
  const micelas =
    m === 'intraluminal'
      ? []
      : Array.from({ length: 9 }, (_, i) => {
          const v = (t * 0.22 + i / 9) % 1;
          const dest = XS[i % 3];
          const entra = !atrofia;
          const x0 = 230;
          const y0 = 110 + (i % 3) * 22;
          const x = entra ? x0 + v * (dest - x0) : x0 + v * 560;
          const y = entra ? y0 + v * (base - alto + 14 - y0) : y0 + Math.sin(v * 9 + i) * 8;
          const o = entra ? 1 - Math.max(0, v - 0.85) * 6 : 1 - Math.max(0, v - 0.85) * 6;
          return (
            <g key={i} opacity={o}>
              <circle cx={x} cy={y} r={9} fill="none" stroke={MENTA} strokeWidth={3} />
              <circle cx={x} cy={y} r={3.5} fill={ACIDO} />
            </g>
          );
        });
  const tapado = m === 'transporte';
  const XT = 760; // obstrucción
  const quilo = atrofia
    ? []
    : Array.from({ length: 12 }, (_, i) => {
        const v = (t * 0.2 + i / 12) % 1;
        const xv = XS[i % 3];
        if (tapado && i >= 6) {
          const k = i - 6;
          return <circle key={i} cx={XT - 26 - (k % 3) * 18} cy={LY - 8 + Math.floor(k / 3) * 16} r={6} fill="#f3eef6" opacity={0.95} />;
        }
        // baja por el quilífero y sigue por el linfático
        const bajada = base - alto + 40;
        const tramo1 = LY - bajada;
        const tramo2 = (tapado ? XT - 40 : 800) - xv;
        const d = v * (tramo1 + tramo2);
        const x = d < tramo1 ? xv : xv + (d - tramo1);
        const y = d < tramo1 ? bajada + d : LY;
        return <circle key={i} cx={x} cy={y} r={5.5} fill="#f3eef6" opacity={0.9} />;
      });
  const nota: Record<FaseAbs, [string, string]> = {
    normal: ['Micelas → enterocito → quilomicrones por la linfa', MENTA],
    intraluminal: ['Sin lipasa ni sales biliares: la grasa no se digiere', ROJO],
    mucosa: ['Vellosidades atróficas: no se absorbe', ROJO],
    transporte: ['Linfa obstruida: se pierden grasas y proteínas', ROJO],
  };
  return (
    <svg viewBox="0 0 800 520" role="img" aria-label="Fases intraluminal, mucosa y de transporte de la absorción de las grasas">
      {/* luz */}
      <rect x={0} y={50} width={800} height={base - 50} fill="#241d2b" />
      {/* submucosa con el linfático */}
      <rect x={0} y={base} width={800} height={520 - base} fill="#4a2f38" />
      {/* criptas entre vellosidades */}
      {[XS[0] - 80, XS[0] + 80, XS[1] + 80, XS[2] + 80].map((x, i) => (
        <path key={i} d={`M${x - 14},${base} q14,40 28,0`} fill="#241d2b" stroke="#a0605c" strokeWidth={2} />
      ))}
      {/* vellosidades: epitelio, lámina propia y quilífero central */}
      {XS.map((x) => (
        <g key={x}>
          <path d={`${vello(x)} Z`} fill={MUCOSA} stroke="#a0605c" strokeWidth={3} />
          <path d={`${vello(x, 16)} Z`} fill="#a9625f" />
          {!atrofia &&
            Array.from({ length: 7 }, (_, k) => {
              const yy = base - 20 - k * 24;
              return <path key={k} d={`M${x - ancho / 2},${yy} l16,0 M${x + ancho / 2},${yy} l-16,0`} stroke="#a0605c" strokeWidth={1.5} />;
            })}
          {!atrofia && <path d={`M${x},${base - alto + 40} L${x},${LY}`} stroke="#efe6d6" strokeWidth={9} strokeLinecap="round" opacity={0.8} />}
          {atrofia && <path d={`M${x},${base - alto + 22} L${x},${LY}`} stroke="#efe6d6" strokeWidth={6} strokeLinecap="round" opacity={0.6} />}
        </g>
      ))}
      {/* vaso linfático colector */}
      <path d={`M${XS[0]},${LY} L800,${LY}`} stroke="#efe6d6" strokeWidth={tapado ? 8 : 14} strokeLinecap="round" opacity={0.7} />
      {tapado && <path d={`M${XT - 14},${LY - 20} l28,40 M${XT + 14},${LY - 20} l-28,40`} stroke={ROJO} strokeWidth={6} strokeLinecap="round" opacity={u} />}
      {/* lipasa y sales biliares */}
      {m !== 'intraluminal' &&
        Array.from({ length: 5 }, (_, i) => (
          <path key={i} d={`M${60 + i * 34},${200 + (i % 2) * 18} l18,0`} stroke={MENTA} strokeWidth={5} strokeLinecap="round" opacity={0.85} />
        ))}
      {m === 'intraluminal' && (
        <path d={`M70,186 l120,46 M190,186 l-120,46`} stroke={ROJO} strokeWidth={5} strokeLinecap="round" opacity={0.5 * u} />
      )}
      {gotas}
      {micelas}
      {quilo}
      <L x={24} y={74} a="start" c={ACIDO} s={20}>
        1 · Luz del duodeno
      </L>
      <L x={24} y={256} a="start" c={m === 'intraluminal' ? ROJO : MENTA} s={20}>
        {m === 'intraluminal' ? 'Sin lipasa ni bilis' : 'Lipasa y sales biliares'}
      </L>
      <L x={24} y={base - 24} a="start" c={MUCOSA} s={20}>
        2 · Mucosa
      </L>
      <L x={24} y={LY} a="start" c="#efe6d6" s={20}>
        3 · Linfa
      </L>
      <L x={400} y={24} c={nota[m][1]} s={22} o={m === 'normal' ? u : 1}>
        {nota[m][0]}
      </L>
    </svg>
  );
}

/* ─────────── Peritoneo: corte transversal del abdomen ─────────── */

type VistaPeritoneo = 'normal' | 'plastron' | 'generalizada' | 'pbe' | 'perforacion' | 'jobert';

const PC = { x: 400, y: 288 }; // centro del corte
const P_OUT = { rx: 320, ry: 196 }; // piel
const P_IN = { rx: 288, ry: 166 }; // peritoneo parietal
const ep = (rx: number, ry: number, grados: number) => {
  const a = (grados * Math.PI) / 180;
  return [PC.x + rx * Math.cos(a), PC.y + ry * Math.sin(a)] as const;
};
const arco = (rx: number, ry: number, de: number, a: number, n = 24) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const [x, y] = ep(rx, ry, de + ((a - de) * i) / n);
    return `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
const ASAS: [number, number][] = [
  [330, 300],
  [412, 262],
  [486, 326],
  [392, 360],
  [566, 352],
  [270, 372],
  [486, 404],
];
const MEDIALUNA = (() => {
  const n = 24;
  const ida = Array.from({ length: n + 1 }, (_, i) => ep(P_IN.rx, P_IN.ry, -165 + (73 * i) / n));
  const vuelta = Array.from({ length: n + 1 }, (_, i) => {
    const k = 1 - i / n;
    const g = Math.sin(Math.PI * k) * 24;
    return ep(P_IN.rx - g, P_IN.ry - g, -165 + 73 * k);
  });
  return [...ida, ...vuelta].map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ') + ' Z';
})();
const HIGADO_CORTE = 'M120,262 C118,190 196,138 300,126 C352,124 372,150 350,186 C322,232 250,276 176,306 C148,316 122,300 120,262 Z';

function Peritoneo({ t, paso, dt, vistas = ['normal'] }: BaseFig & { vistas?: VistaPeritoneo[] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : apf(paso, dt, 0);
  const inflamado = v === 'generalizada' || v === 'perforacion';
  const ileo = inflamado;
  const ascitis = v === 'pbe';
  const aire = v === 'perforacion' || v === 'jobert';
  const nivel = 338; // superficie de la ascitis (lo declive es atrás, abajo en el dibujo)
  const PERF = ASAS[2];
  const nota: Record<VistaPeritoneo, [string, string]> = {
    normal: ['Una cavidad virtual y estéril entre dos hojas', MENTA],
    plastron: ['Plastrón: inflamación localizada contra la pared anterior', DURAZNO],
    generalizada: ['Generalizada: se inflama todo el peritoneo', ROJO],
    pbe: ['PBE: bacterias del intestino infectan la ascitis', CIELO],
    perforacion: ['Perforación: salen muchos gérmenes y aire', ROJO],
    jobert: ['Jobert: el aire tapa el hígado y desaparece la matidez', DURAZNO],
  };
  return (
    <svg viewBox="0 0 800 520" role="img" aria-label="Corte transversal del abdomen: peritoneo parietal, visceral y cavidad peritoneal">
      <defs>
        <clipPath id="cl-perit">
          <ellipse cx={PC.x} cy={PC.y} rx={P_IN.rx} ry={P_IN.ry} />
        </clipPath>
      </defs>
      {/* pared: piel y músculo */}
      <ellipse cx={PC.x} cy={PC.y} rx={P_OUT.rx} ry={P_OUT.ry} fill={PIEL} stroke={LINE} strokeWidth={3} />
      <ellipse cx={PC.x} cy={PC.y} rx={P_OUT.rx - 12} ry={P_OUT.ry - 12} fill={MUSCULO} />
      {/* cavidad */}
      <ellipse cx={PC.x} cy={PC.y} rx={P_IN.rx} ry={P_IN.ry} fill="#241d2b" />
      <g clipPath="url(#cl-perit)">
        {inflamado && <ellipse cx={PC.x} cy={PC.y} rx={P_IN.rx} ry={P_IN.ry} fill="#8a7a3a" opacity={0.28 * u} />}
        {ascitis && <rect x={0} y={nivel + Math.sin(t * 2) * 2} width={800} height={200} fill="#4b6f8f" opacity={0.7} />}
        {ascitis && <rect x={0} y={nivel} width={800} height={200} fill="#c9c08a" opacity={0.35 * u} />}
        {/* hígado y estómago */}
        <path d={HIGADO_CORTE} fill={HIGADO} stroke={v === 'generalizada' ? ROJO : ROSA} strokeWidth={3} />
        <ellipse cx={574} cy={214} rx={84} ry={52} fill={ESTOMAGO} stroke={v === 'generalizada' ? ROJO : ROSA} strokeWidth={3} />
        {/* asas: cada una cubierta por peritoneo visceral */}
        {ASAS.map(([x, y], i) => {
          const r = 33 + (ileo ? 2 : Math.sin(t * 2.2 + i) * 1.6);
          const flota = ascitis ? -Math.max(0, y + r - nivel) * 0.25 : 0;
          const roja = v === 'generalizada' || (v === 'plastron' && i === 1);
          return (
            <g key={i}>
              <circle cx={x} cy={y + flota} r={r} fill={INTESTINO} stroke={roja ? ROJO : ROSA} strokeWidth={roja ? 6 : 3} />
              <circle cx={x} cy={y + flota} r={r - 13} fill="none" stroke="#8f5f56" strokeWidth={2} opacity={0.6} />
            </g>
          );
        })}
        {/* PBE: un solo germen, del asa a la ascitis */}
        {ascitis &&
          Array.from({ length: 14 }, (_, i) => {
            const k = (t * 0.25 + i / 14) % 1;
            const [x0, y0] = ASAS[i % 2 ? 3 : 0];
            const x = x0 + Math.sin(i * 2.3) * (20 + k * 120);
            const y = y0 + 20 + k * 110;
            return <circle key={i} cx={x} cy={y} r={5} fill="#9fd36a" opacity={u * (k < 0.1 ? k * 10 : 1)} />;
          })}
        {/* perforación: varios gérmenes y aire */}
        {v === 'perforacion' && (
          <>
            <path d={`M${PERF[0] + 22},${PERF[1] - 26} l14,-8 l-4,14 Z`} fill="#241d2b" stroke={ROJO} strokeWidth={3} />
            {Array.from({ length: 18 }, (_, i) => {
              const k = (t * 0.3 + i / 18) % 1;
              const ang = -1.4 + (i % 6) * 0.5;
              const x = PERF[0] + 30 + Math.cos(ang) * k * 150;
              const y = PERF[1] - 28 + Math.sin(ang) * k * 90 + k * 40;
              const c = ['#9fd36a', '#e6a35c', '#c79be0'][i % 3];
              return <circle key={i} cx={x} cy={y} r={4.5} fill={c} opacity={u * (1 - k * 0.6)} />;
            })}
            {Array.from({ length: 6 }, (_, i) => {
              const k = (t * 0.2 + i / 6) % 1;
              const x = PERF[0] + 30 + (300 - PERF[0] - 30) * k;
              const y = PERF[1] - 30 + (130 - PERF[1] + 30) * k;
              return <circle key={i} cx={x} cy={y} r={7} fill="none" stroke="#e8eef6" strokeWidth={2.5} opacity={u} />;
            })}
          </>
        )}
        {/* aire libre entre la pared y el hígado */}
        {aire && <path d={MEDIALUNA} fill="#e8eef6" opacity={(v === 'jobert' ? 0.75 : 0.55) * (v === 'jobert' ? 1 : u)} />}
      </g>
      {/* retroperitoneo: columna y aorta por detrás del peritoneo parietal */}
      <path d="M328,456 C338,404 368,384 400,384 C432,384 462,404 472,456 Z" fill={MUSCULO} />
      <circle cx={400} cy={428} r={24} fill={HUESO} stroke="#9a8f80" strokeWidth={2} />
      <circle cx={433} cy={398} r={9} fill={SANGRE} />
      {/* peritoneo parietal */}
      <ellipse cx={PC.x} cy={PC.y} rx={P_IN.rx} ry={P_IN.ry} fill="none" stroke={v === 'generalizada' || v === 'perforacion' ? ROJO : ROSA} strokeWidth={v === 'generalizada' || v === 'perforacion' ? 6 : 3.5} />
      <path d="M328,456 C338,404 368,384 400,384 C432,384 462,404 472,456" fill="none" stroke={inflamado ? ROJO : ROSA} strokeWidth={inflamado ? 6 : 3.5} />
      {v === 'plastron' && <path d={arco(P_IN.rx, P_IN.ry, -100, -62)} fill="none" stroke={ROJO} strokeWidth={9} strokeLinecap="round" opacity={u} />}
      {v === 'plastron' && <ellipse cx={ASAS[1][0]} cy={ASAS[1][1] - 40} rx={70} ry={58} fill={ROJO} opacity={0.18 * u} />}
      {/* percusión sobre el hígado */}
      {v === 'jobert' && (
        <g opacity={u}>
          <rect x={226} y={70} width={70} height={22} rx={11} fill="#d6b49d" stroke="#6f5a4e" strokeWidth={2} transform="rotate(-18 261 81)" />
          {[0, 1, 2].map((k) => (
            <path key={k} d={`M${300 + k * 16},${66 - k * 4} q10,10 0,22`} fill="none" stroke={CIELO} strokeWidth={3} opacity={((t * 2 + k / 3) % 1) * 0.9} />
          ))}
          <L x={150} y={64} c={CIELO} s={20}>
            Timpanismo
          </L>
        </g>
      )}
      {/* rótulos */}
      <L x={400} y={26} c={nota[v][1]} s={22} o={v === 'normal' ? 1 : u}>
        {nota[v][0]}
      </L>
      {v === 'normal' && (
        <>
          <L x={640} y={92} c={ROSA} s={20}>
            Peritoneo parietal
          </L>
          <L x={640} y={462} c={ROSA} s={20} o={apf(paso, dt, 0)}>
            Peritoneo visceral
          </L>
          <L x={214} y={218} c="#f3d9cf" s={20}>
            Hígado
          </L>
          <L x={574} y={214} c="#f3d9cf" s={20}>
            Estómago
          </L>
        </>
      )}
      {v === 'pbe' && (
        <L x={650} y={404} c={CIELO} s={20}>
          Ascitis
        </L>
      )}
      {v === 'generalizada' && (
        <L x={400} y={500} c={ROJO} s={20} o={u}>
          Asas quietas: íleo paralítico
        </L>
      )}
      {v === 'pbe' && (
        <L x={400} y={500} c="#9fd36a" s={20} o={u}>
          Un solo germen (E. coli)
        </L>
      )}
      {v === 'perforacion' && (
        <L x={400} y={500} c={DURAZNO} s={20} o={u}>
          Muchos gérmenes: polimicrobiana
        </L>
      )}
      {v === 'jobert' && (
        <L x={300} y={160} c={INK} s={20}>
          Aire
        </L>
      )}
    </svg>
  );
}

export const FIGURAS_DIG = {
  deglucion: Deglucion,
  esofago: Esofago,
  'centros-vomito': CentrosVomito,
  'acto-vomito': ActoVomito,
  tracto: Tracto,
  hematemesis: Hematemesis,
  estomago: Estomago,
  desgarro: Desgarro,
  perdidas: Perdidas,
  aspiracion: Aspiracion,
  horario: Horario,
  mucosa: Mucosa,
  defecacion: Defecacion,
  bristol: Bristol,
  bilirrubina: Bilirrubina,
  biliar: Biliar,
  ascitis: Ascitis,
  colateral: Colateral,
  inspiracion: Inspiracion,
  reflujo: Reflujo,
  barrera: Barrera,
  absorcion: Absorcion,
  peritoneo: Peritoneo,
} satisfies Record<string, (p: never) => ReactNode>;
