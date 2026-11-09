// Ayudantes compartidos por todas las figuras de la clase (digestivo, renal, neurología).
// Funciones puras de (t, paso, dt): las importa también Remotion, así que sin import.meta ni alias con valor.
import type { ReactNode } from 'react';

export interface BaseFig {
  t: number;
  paso: number;
  dt: number;
  video?: boolean;
  max: number;
}


export const FONT = "'Inter Variable', 'Segoe UI', system-ui, sans-serif";
export const INK = 'var(--v-ink)';
export const INK2 = 'var(--v-ink2)';
export const INK3 = 'var(--v-ink3)';
export const LINE = 'var(--v-line)';
export const ROSA = 'var(--v-rose)';
export const CIELO = 'var(--v-sky)';
export const MENTA = 'var(--v-mint)';
export const DURAZNO = 'var(--v-peach)';
export const LILA = 'var(--v-lilac)';
export const ROJO = 'var(--v-red)';
export const SANGRE = '#a3202f';
export const HIGADO = '#7c3b3a';
export const ESTOMAGO = '#b98378';
export const INTESTINO = '#c8938a';

export const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
export const ease = (u: number) => 1 - (1 - clamp(u)) ** 2;
export const apf = (paso: number, dt: number, n: number) => (paso > n ? 1 : paso < n ? 0 : ease(dt / 0.55));

export function L({ x, y, a = 'middle', c = INK, s = 21, w = 650, o = 1, children }: { x: number; y: number; a?: 'start' | 'middle' | 'end'; c?: string; s?: number; w?: number; o?: number; children: ReactNode }) {
  return (
    <text x={x} y={y} textAnchor={a} fill={c} fontSize={s} fontWeight={w} fontFamily={FONT} opacity={o} dominantBaseline="middle" style={{ paintOrder: 'stroke', stroke: 'var(--v-bg)', strokeWidth: 5, strokeLinejoin: 'round' }}>
      {children}
    </text>
  );
}

/** Impulso que corre por un trazo: un guion que avanza. */
export function Pulso({ d, t, v = 60, c = ROSA, w = 5, o = 1, largo = 12, desfase = 0 }: { d: string; t: number; v?: number; c?: string; w?: number; o?: number; largo?: number; desfase?: number }) {
  return <path d={d} pathLength={100} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeDasharray={`${largo} ${100 - largo}`} strokeDashoffset={-((t * v + desfase) % 100)} opacity={o} />;
}

export function Via({ d, c = INK3, w = 2.5, o = 1, dash }: { d: string; c?: string; w?: number; o?: number; dash?: string }) {
  return <path d={d} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" opacity={o} strokeDasharray={dash} />;
}

/* ─────────── Partes reutilizables ─────────── */

/** Tronco con hombros, visto de frente (viewBox 640×600). */
export const TRONCO = 'M276,0 L276,34 C270,58 200,62 146,84 C116,96 104,120 106,152 L150,176 C150,250 168,300 170,340 C172,400 146,470 140,530 L140,600 L500,600 L500,530 C494,470 468,400 470,340 C472,300 490,250 490,176 L534,152 C536,120 524,96 494,84 C440,62 370,58 364,34 L364,0 Z';
export const DIAFRAGMA = 'M160,268 C176,214 254,186 318,232 C378,194 462,214 480,268';
export const HIGADO_D = 'M160,268 C176,214 254,186 318,232 C346,252 340,280 300,304 C258,330 192,340 170,320 C156,304 154,284 160,268 Z';
export const ESTOMAGO_D = 'M346,236 C380,216 432,224 442,262 C452,304 420,348 380,352 C352,354 330,340 318,324 C340,326 366,318 372,298 C378,276 356,258 346,236 Z';
export const MARCO_COLON = 'M206,500 C196,450 190,400 196,362 C240,352 400,352 446,362 C454,410 454,460 446,500 C430,528 380,536 348,524';
export const DELGADO = 'M240,398 C290,380 350,380 400,396 C420,410 400,424 370,420 C330,414 280,414 250,426 C230,440 250,454 280,450 C320,444 370,444 400,452 C420,466 400,482 370,478 C330,472 290,474 262,486';

export function Tronco({ id }: { id: string }) {
  return (
    <>
      <defs>
        <clipPath id={id}>
          <path d={TRONCO} />
        </clipPath>
      </defs>
      <path d={TRONCO} fill="var(--v-skin)" stroke={LINE} strokeWidth={3} />
      <g fill="none" stroke={LINE} strokeWidth={2.5} opacity={0.55} clipPath={`url(#${id})`}>
        {[120, 150, 180].map((y) => (
          <g key={y}>
            <path d={`M312,${y} C260,${y + 8} 200,${y + 22} 160,${y + 56}`} />
            <path d={`M328,${y} C380,${y + 8} 440,${y + 22} 480,${y + 56}`} />
          </g>
        ))}
      </g>
    </>
  );
}

export function Visceras({ apagar = 1, apendice = true }: { apagar?: number; apendice?: boolean }) {
  return (
    <g opacity={apagar}>
      <path d={MARCO_COLON} fill="none" stroke={INTESTINO} strokeWidth={30} strokeLinecap="round" opacity={0.78} />
      <path d={MARCO_COLON} fill="none" stroke="#a97067" strokeWidth={30} strokeDasharray="3 30" opacity={0.7} />
      <path d={DELGADO} fill="none" stroke={INTESTINO} strokeWidth={17} strokeLinecap="round" />
      {apendice && <path d="M206,516 C204,538 222,556 240,552" fill="none" stroke={INTESTINO} strokeWidth={10} strokeLinecap="round" />}
      <path d={ESTOMAGO_D} fill={ESTOMAGO} stroke="#8f5f56" strokeWidth={2.5} />
      <path d={HIGADO_D} fill={HIGADO} stroke="#5d2a2a" strokeWidth={2.5} />
      <ellipse cx={262} cy={322} rx={15} ry={26} transform="rotate(20 262 322)" fill="#7f9455" stroke="#5e703c" strokeWidth={2} />
    </g>
  );
}

export function ManoFrente({ x, y, escala = 1 }: { x: number; y: number; escala?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${escala})`} fill="#d6b49d" stroke="#6f5a4e" strokeWidth={2.2}>
      <path d="M-44,-120 L-44,-72 C-44,-52 -28,-44 0,-44 C28,-44 44,-52 44,-72 L44,-120 Z" />
      {[-33, -11, 11, 33].map((fx, i) => (
        <rect key={fx} x={fx - 10} y={-58} width={20} height={i === 0 || i === 3 ? 50 : 58} rx={10} />
      ))}
    </g>
  );
}

export function CorteMedula({ cx, cy, e = 1, luzAsta = 0, luzVentral = 0 }: { cx: number; cy: number; e?: number; luzAsta?: number; luzVentral?: number }) {
  const gris = 'M-14,-8 C-40,-26 -56,-52 -50,-58 C-42,-64 -22,-40 -6,-22 L6,-22 C22,-40 42,-64 50,-58 C56,-52 40,-26 14,-8 C44,0 52,26 44,40 C34,50 16,28 6,16 L-6,16 C-16,28 -34,50 -44,40 C-52,26 -44,0 -14,-8 Z';
  return (
    <g transform={`translate(${cx} ${cy}) scale(${e})`}>
      <ellipse rx={92} ry={72} fill="#e9dfd2" stroke="#b8a897" strokeWidth={2.5} opacity={0.92} />
      <path d={gris} fill="#a58b87" />
      <circle cx={-44} cy={-50} r={22} fill={ROSA} opacity={luzAsta * 0.55} />
      <circle cx={-38} cy={34} r={22} fill={MENTA} opacity={luzVentral * 0.6} />
      <circle r={4} fill="#57413f" />
    </g>
  );
}
