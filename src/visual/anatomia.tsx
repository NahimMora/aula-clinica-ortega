// Dibujos anatómicos esquemáticos (SVG puro) compartidos por los bloques interactivos de la web
// y por las escenas animadas (Lienzo/video). Colores por variables --v-* (definidas en tokens.css).
// Si se pasa `t` (segundos), la animación se calcula con t (video); si no, la hacen clases CSS (web).
import type { ReactNode } from 'react';
import type { Organo, Punto, Region, VTone, ViaBiliar } from './tipos';

export const col = (t: VTone | 'ink' = 'lilac') => (t === 'ink' ? 'var(--v-ink2)' : `var(--v-${t})`);
export const fil = (t: VTone | 'ink' = 'lilac') => (t === 'ink' ? 'var(--v-card)' : `var(--v-${t}-f)`);
const INK = 'var(--v-ink)';
const INK3 = 'var(--v-ink3)';
const LINE = 'var(--v-line)';
const BG = 'var(--v-bg)';
const FONT = "'Inter Variable', 'Segoe UI', system-ui, sans-serif";

function Label({ x, y, a = 'middle', c = INK, s = 15, w = 750, children }: { x: number; y: number; a?: 'start' | 'middle' | 'end'; c?: string; s?: number; w?: number; children: ReactNode }) {
  return (
    <text x={x} y={y} textAnchor={a} fill={c} fontSize={s} fontWeight={w} fontFamily={FONT} dominantBaseline="middle" style={{ paintOrder: 'stroke', stroke: BG, strokeWidth: 4, strokeLinejoin: 'round' }}>
      {children}
    </text>
  );
}

/** Pulso 0..1: con t lo calcula; sin t devuelve 0.5 y la clase CSS `v-pulse` anima la opacidad. */
const pulso = (t?: number, v = 4) => (t === undefined ? 0.5 : 0.5 + 0.5 * Math.sin(t * v));

/* ───────────────────────── Abdomen: 9 regiones (viewBox 0 0 400 470) ───────────────────────── */

export const ABD_W = 400;
export const ABD_H = 470;
const TORSO = 'M84,8 C62,80 50,160 52,240 C54,318 62,372 104,424 L200,462 L296,424 C338,372 346,318 348,240 C350,160 338,80 316,8 Z';
const COLX = [40, 145, 255, 360];
const ROWY = [0, 172, 306, 470];
export const REGIONES: Record<Region, { c: number; r: number; n: string }> = {
  hd: { c: 0, r: 0, n: 'Hipocondrio der.' },
  epi: { c: 1, r: 0, n: 'Epigastrio' },
  hi: { c: 2, r: 0, n: 'Hipocondrio izq.' },
  fd: { c: 0, r: 1, n: 'Flanco der.' },
  umb: { c: 1, r: 1, n: 'Mesogastrio' },
  fi: { c: 2, r: 1, n: 'Flanco izq.' },
  fid: { c: 0, r: 2, n: 'Fosa ilíaca der.' },
  hipo: { c: 1, r: 2, n: 'Hipogastrio' },
  fii: { c: 2, r: 2, n: 'Fosa ilíaca izq.' },
};
export const centroRegion = (r: Region): [number, number] => {
  const g = REGIONES[r];
  const x = (COLX[g.c] + COLX[g.c + 1]) / 2 + (g.c === 0 ? 18 : g.c === 2 ? -18 : 0);
  const y = (ROWY[g.r] + ROWY[g.r + 1]) / 2 + (g.r === 0 ? 24 : g.r === 2 ? -30 : 0);
  return [x, y];
};
export const PUNTOS: Record<Punto, { x: number; y: number; n: string; r?: number }> = {
  mcburney: { x: 118, y: 322, n: 'McBurney' },
  murphy: { x: 140, y: 140, n: 'Murphy' },
  cullen: { x: 200, y: 246, n: 'Cullen', r: 30 },
  greyturner: { x: 66, y: 250, n: 'Grey-Turner', r: 26 },
  ombligo: { x: 200, y: 246, n: 'Ombligo' },
  epigastrio: { x: 200, y: 120, n: 'Epigastrio' },
  esplenico: { x: 296, y: 130, n: 'Bazo' },
  hipogastrio: { x: 200, y: 380, n: 'Hipogastrio' },
  fii: { x: 286, y: 360, n: 'FII' },
  hd: { x: 104, y: 120, n: 'HD' },
  'renal-d': { x: 92, y: 212, n: 'Riñón der.' },
  'renal-i': { x: 308, y: 212, n: 'Riñón izq.' },
};

export function AbdomenFig({
  luz = {},
  puntos = [],
  ruta,
  rutaTone = 'rose',
  t,
  etiquetas = true,
  idp = 'abd',
}: {
  luz?: Partial<Record<Region, VTone>>;
  puntos?: { p: Punto; tone: VTone }[];
  ruta?: Region[];
  rutaTone?: VTone;
  t?: number;
  etiquetas?: boolean;
  idp?: string;
}) {
  const pu = pulso(t);
  const rutaPts = ruta?.map(centroRegion) ?? [];
  const rutaD = rutaPts.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ');
  // Avance del punto que recorre la ruta (dolor migratorio).
  const prog = t === undefined ? undefined : Math.min(1, t / 2.4);
  let dot: [number, number] | undefined;
  if (rutaPts.length > 1 && prog !== undefined) {
    const segs = rutaPts.length - 1;
    const f = prog * segs;
    const k = Math.min(segs - 1, Math.floor(f));
    const u = f - k;
    dot = [rutaPts[k][0] + (rutaPts[k + 1][0] - rutaPts[k][0]) * u, rutaPts[k][1] + (rutaPts[k + 1][1] - rutaPts[k][1]) * u];
  }
  return (
    <g>
      <defs>
        <clipPath id={`${idp}-clip`}>
          <path d={TORSO} />
        </clipPath>
        <marker id={`${idp}-arr`} viewBox="0 0 10 10" refX={7} refY={5} markerWidth={6} markerHeight={6} orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={col(rutaTone)} />
        </marker>
      </defs>
      <path d={TORSO} fill="var(--v-skin)" stroke={LINE} strokeWidth={3} />
      <g clipPath={`url(#${idp}-clip)`}>
        {(Object.keys(REGIONES) as Region[]).map((r) => {
          const g = REGIONES[r];
          const tone = luz[r];
          return (
            <rect
              key={r}
              x={COLX[g.c]}
              y={ROWY[g.r]}
              width={COLX[g.c + 1] - COLX[g.c]}
              height={ROWY[g.r + 1] - ROWY[g.r]}
              fill={tone ? col(tone) : 'transparent'}
              opacity={tone ? 0.22 + 0.2 * pu : 0}
              className={tone && t === undefined ? 'v-pulse' : undefined}
            />
          );
        })}
        {/* Grilla de las 9 regiones */}
        {[COLX[1], COLX[2]].map((x) => (
          <line key={x} x1={x} y1={0} x2={x} y2={470} stroke={LINE} strokeWidth={2} strokeDasharray="7 7" />
        ))}
        {[ROWY[1], ROWY[2]].map((y) => (
          <line key={y} x1={0} y1={y} x2={400} y2={y} stroke={LINE} strokeWidth={2} strokeDasharray="7 7" />
        ))}
      </g>
      {/* Rebordes costales y ombligo */}
      <path d="M78,64 Q142,160 200,112 Q258,160 322,64" fill="none" stroke={INK3} strokeWidth={2.5} opacity={0.7} />
      <circle cx={200} cy={246} r={5} fill="none" stroke={INK3} strokeWidth={2.5} />
      <path d="M90,350 Q140,400 200,446 Q260,400 310,350" fill="none" stroke={INK3} strokeWidth={2} opacity={0.45} />
      {etiquetas &&
        (Object.keys(REGIONES) as Region[]).map((r) => {
          const [x, y] = centroRegion(r);
          const on = Boolean(luz[r]);
          return (
            <Label key={r} x={x} y={y} s={on ? 15 : 12.5} w={on ? 800 : 600} c={on ? col(luz[r]) : INK3}>
              {REGIONES[r].n}
            </Label>
          );
        })}
      {ruta && rutaPts.length > 1 && (
        <g>
          <path d={rutaD} fill="none" stroke={col(rutaTone)} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="10 9" markerEnd={`url(#${idp}-arr)`} className={t === undefined ? 'v-dash' : undefined} strokeDashoffset={t === undefined ? undefined : -t * 30} />
          {rutaPts.map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1] - 22} r={11} fill={col(rutaTone)} />
          ))}
          {rutaPts.map((p, i) => (
            <text key={`n${i}`} x={p[0]} y={p[1] - 21} textAnchor="middle" dominantBaseline="middle" fontSize={13} fontWeight={800} fill={BG} fontFamily={FONT}>
              {i + 1}
            </text>
          ))}
          {dot && <circle cx={dot[0]} cy={dot[1]} r={9} fill={col(rutaTone)} stroke={BG} strokeWidth={3} />}
        </g>
      )}
      {puntos.map(({ p, tone }) => {
        const P = PUNTOS[p];
        const pares = p === 'greyturner' ? [P.x, 400 - P.x] : p === 'renal-d' || p === 'renal-i' ? [P.x] : [P.x];
        return pares.map((x, k) => (
          <g key={`${p}${k}`}>
            {P.r ? (
              <ellipse cx={x} cy={P.y} rx={P.r} ry={P.r * (p === 'greyturner' ? 1.9 : 0.8)} fill={col(tone)} opacity={0.35 + 0.25 * pu} className={t === undefined ? 'v-pulse' : undefined} />
            ) : (
              <>
                <circle cx={x} cy={P.y} r={14 + 6 * pu} fill="none" stroke={col(tone)} strokeWidth={3} opacity={0.8} className={t === undefined ? 'v-ring' : undefined} />
                <circle cx={x} cy={P.y} r={7} fill={col(tone)} />
              </>
            )}
            {k === 0 && (
              <Label x={x + (P.r ? 0 : 0)} y={P.y + (P.r ? (p === 'greyturner' ? 66 : 36) : 26)} c={col(tone)} s={14}>
                {P.n}
              </Label>
            )}
          </g>
        ));
      })}
      <Label x={20} y={460} a="start" s={11} w={600} c={INK3}>
        der. del paciente
      </Label>
      <Label x={380} y={460} a="end" s={11} w={600} c={INK3}>
        izq.
      </Label>
    </g>
  );
}

/* ───────────────────────── Aparato digestivo (viewBox 0 0 420 520) ───────────────────────── */

export const TR_W = 420;
export const TR_H = 520;
type OrgDef = { d: string; tubo?: number; n: string; lx: number; ly: number; la?: 'start' | 'middle' | 'end' };
export const ORGANOS: Record<Organo, OrgDef> = {
  higado: { d: 'M26,104 C26,62 112,50 196,66 C222,71 228,92 210,110 C184,138 132,172 90,192 C48,208 26,172 26,104 Z', n: 'Hígado', lx: 92, ly: 112 },
  vesicula: { d: 'M128,170 C142,176 146,200 136,214 C126,226 108,222 106,206 C104,190 114,172 128,170 Z', n: 'Vesícula', lx: 104, ly: 236, la: 'end' },
  bazo: { d: 'M350,104 C376,108 388,150 380,184 C372,212 346,214 338,196 C328,170 330,120 350,104 Z', n: 'Bazo', lx: 392, ly: 226, la: 'end' },
  pancreas: { d: 'M178,298 C172,272 204,266 236,262 C276,258 312,236 340,204 C350,214 346,230 334,240 C304,266 266,282 236,288 C218,292 206,306 194,312 Z', n: 'Páncreas', lx: 318, ly: 276 },
  esofago: { d: 'M208,0 L210,118', tubo: 18, n: 'Esófago', lx: 226, ly: 44, la: 'start' },
  estomago: { d: 'M210,118 C212,150 250,132 290,142 C334,154 336,226 296,244 C264,258 238,248 226,238', tubo: 34, n: 'Estómago', lx: 292, ly: 192 },
  piloro: { d: 'M226,238 L206,240', tubo: 14, n: 'Píloro', lx: 200, ly: 222, la: 'end' },
  duodeno: { d: 'M206,240 C172,240 160,262 164,290 C168,318 200,322 226,316 L250,304', tubo: 18, n: 'Duodeno', lx: 154, ly: 300, la: 'end' },
  yeyuno: { d: 'M250,304 C300,300 312,326 284,336 C246,350 214,330 214,352 C214,372 300,358 300,380', tubo: 16, n: 'Yeyuno', lx: 318, ly: 330, la: 'start' },
  ileon: { d: 'M300,380 C300,404 214,392 196,410 C180,426 250,430 230,446 C210,460 150,440 126,430', tubo: 16, n: 'Íleon', lx: 196, ly: 470 },
  colon: { d: 'M108,446 L98,290 C98,270 112,266 130,268 L320,268 C342,268 350,278 350,296 L352,420 C352,452 300,452 262,458 C236,462 222,468 220,478', tubo: 26, n: 'Colon', lx: 60, ly: 360 },
  apendice: { d: 'M104,452 C100,470 90,480 78,486', tubo: 8, n: 'Apéndice', lx: 72, ly: 504 },
  recto: { d: 'M220,478 L220,516', tubo: 24, n: 'Recto', lx: 240, ly: 500, la: 'start' },
};
/** Punto donde se dibuja la lesión de cada órgano. */
const MARCA: Record<Organo, [number, number]> = {
  higado: [110, 120],
  vesicula: [126, 196],
  bazo: [358, 156],
  pancreas: [250, 276],
  esofago: [209, 70],
  estomago: [300, 190],
  piloro: [216, 239],
  duodeno: [166, 288],
  yeyuno: [284, 336],
  ileon: [214, 420],
  colon: [350, 360],
  apendice: [86, 480],
  recto: [220, 500],
};
const ORDEN: Organo[] = ['higado', 'vesicula', 'bazo', 'pancreas', 'colon', 'apendice', 'yeyuno', 'ileon', 'duodeno', 'esofago', 'estomago', 'piloro', 'recto'];

export function TractoFig({ luz = {}, marca, treitz, t }: { luz?: Partial<Record<Organo, VTone>>; marca?: { o: Organo; tone: VTone }; treitz?: boolean; t?: number }) {
  const pu = pulso(t);
  // Los iluminados se dibujan al final para que queden encima.
  const orden = [...ORDEN.filter((o) => !luz[o]), ...ORDEN.filter((o) => luz[o])];
  return (
    <g>
      {orden.map((o) => {
        const g = ORGANOS[o];
        const tone = luz[o];
        if (g.tubo) {
          return (
            <g key={o}>
              <path d={g.d} fill="none" stroke={tone ? col(tone) : LINE} strokeWidth={g.tubo + 7} strokeLinecap="round" strokeLinejoin="round" opacity={tone ? 0.75 + 0.25 * pu : 1} className={tone && t === undefined ? 'v-pulse-soft' : undefined} />
              <path d={g.d} fill="none" stroke={tone ? fil(tone) : 'var(--v-card)'} strokeWidth={g.tubo} strokeLinecap="round" strokeLinejoin="round" />
            </g>
          );
        }
        return <path key={o} d={g.d} fill={tone ? fil(tone) : 'var(--v-card)'} stroke={tone ? col(tone) : LINE} strokeWidth={tone ? 4 : 2.5} />;
      })}
      {treitz && (
        <g>
          <line x1={150} y1={304} x2={330} y2={304} stroke={col('gold')} strokeWidth={3} strokeDasharray="8 6" />
          <circle cx={250} cy={304} r={7} fill={col('gold')} />
          <Label x={336} y={304} a="start" c={col('gold')} s={13}>
            Treitz
          </Label>
        </g>
      )}
      {(Object.keys(luz) as Organo[]).map((o) => {
        const g = ORGANOS[o];
        return (
          <Label key={o} x={g.lx} y={g.ly} a={g.la} c={col(luz[o])} s={15}>
            {g.n}
          </Label>
        );
      })}
      {marca && (
        <g>
          <circle cx={MARCA[marca.o][0]} cy={MARCA[marca.o][1]} r={16 + 6 * pu} fill="none" stroke={col(marca.tone)} strokeWidth={3} className={t === undefined ? 'v-ring' : undefined} />
          <path
            d={`M${MARCA[marca.o][0] - 8},${MARCA[marca.o][1] - 8} L${MARCA[marca.o][0] + 8},${MARCA[marca.o][1] + 8} M${MARCA[marca.o][0] + 8},${MARCA[marca.o][1] - 8} L${MARCA[marca.o][0] - 8},${MARCA[marca.o][1] + 8}`}
            stroke={col(marca.tone)}
            strokeWidth={4}
            strokeLinecap="round"
          />
        </g>
      )}
    </g>
  );
}

/* ───────────────────────── Vía biliar (viewBox 0 0 420 420) ───────────────────────── */

export const BIL_W = 420;
export const BIL_H = 420;
type BilDef = { d: string; tubo?: number; n: string; lx: number; ly: number; la?: 'start' | 'middle' | 'end' };
export const VIAS: Record<ViaBiliar, BilDef> = {
  higado: { d: 'M0,0 L420,0 L420,58 C330,112 140,112 0,66 Z', n: 'Hígado', lx: 210, ly: 32 },
  duodeno: { d: 'M126,276 C150,280 166,300 166,338 C166,386 214,400 268,394 L330,388', tubo: 30, n: 'Duodeno', lx: 100, ly: 352, la: 'end' },
  pancreas: { d: 'M186,312 C186,282 236,274 300,276 C360,278 410,292 410,314 C410,334 352,340 300,338 C258,336 238,348 216,360 C196,370 186,344 186,312 Z', n: 'Páncreas', lx: 330, ly: 360 },
  vesicula: { d: 'M156,170 C178,196 156,262 112,272 C78,280 60,248 78,222 C94,198 126,186 148,170 Z', n: 'Vesícula', lx: 64, ly: 296, la: 'start' },
  hepatico: { d: 'M150,64 L208,118 M266,64 L208,118 L208,176', tubo: 9, n: 'Hepático común', lx: 222, ly: 146, la: 'start' },
  cistico: { d: 'M208,176 C194,178 176,172 158,174', tubo: 7, n: 'Cístico', lx: 178, ly: 160, la: 'middle' },
  coledoco: { d: 'M208,176 L208,300 C208,318 200,330 192,338', tubo: 10, n: 'Colédoco', lx: 222, ly: 236, la: 'start' },
  wirsung: { d: 'M400,312 C330,310 262,314 200,338', tubo: 6, n: 'Wirsung', lx: 300, ly: 300 },
  ampolla: { d: 'M192,338 L176,344', tubo: 12, n: 'Ampolla de Vater', lx: 192, ly: 372, la: 'start' },
};
const PIEDRA: Record<ViaBiliar, [number, number]> = {
  vesicula: [106, 238],
  cistico: [170, 174],
  hepatico: [208, 140],
  coledoco: [208, 270],
  ampolla: [186, 340],
  higado: [210, 40],
  wirsung: [300, 312],
  pancreas: [214, 318],
  duodeno: [166, 340],
};
const ORDEN_B: ViaBiliar[] = ['higado', 'duodeno', 'pancreas', 'wirsung', 'vesicula', 'hepatico', 'cistico', 'coledoco', 'ampolla'];

function Piedras({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {[
        [-7, -4, 9],
        [6, 3, 8],
        [-2, 9, 6],
      ].map(([dx, dy, r], k) => (
        <polygon
          key={k}
          points={[0, 1, 2, 3, 4, 5].map((j) => `${x + dx + Math.cos(j * 1.05 + k) * r},${y + dy + Math.sin(j * 1.05 + k) * r * 0.85}`).join(' ')}
          fill="var(--v-stone)"
          stroke="var(--v-stone-2)"
          strokeWidth={2}
        />
      ))}
    </g>
  );
}

export function BiliarFig({ luz = {}, calculo, tumor, dilata = [], t }: { luz?: Partial<Record<ViaBiliar, VTone>>; calculo?: ViaBiliar; tumor?: ViaBiliar; dilata?: ViaBiliar[]; t?: number }) {
  const pu = pulso(t);
  const orden = [...ORDEN_B.filter((o) => !luz[o]), ...ORDEN_B.filter((o) => luz[o])];
  return (
    <g>
      {orden.map((o) => {
        const g = VIAS[o];
        const tone = luz[o];
        const dil = dilata.includes(o);
        if (g.tubo) {
          const w = g.tubo * (dil ? 1.9 : 1);
          return (
            <g key={o}>
              <path d={g.d} fill="none" stroke={tone ? col(tone) : LINE} strokeWidth={w + 6} strokeLinecap="round" strokeLinejoin="round" opacity={tone ? 0.75 + 0.25 * pu : 1} className={tone && t === undefined ? 'v-pulse-soft' : undefined} />
              <path d={g.d} fill="none" stroke={tone ? fil(tone) : 'var(--v-bile)'} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
            </g>
          );
        }
        const esc = o === 'vesicula' && dil ? 'translate(112 222) scale(1.28) translate(-112 -222)' : undefined;
        return <path key={o} d={g.d} transform={esc} fill={tone ? fil(tone) : o === 'vesicula' ? 'var(--v-bile)' : 'var(--v-card)'} stroke={tone ? col(tone) : LINE} strokeWidth={tone ? 4 : 2.5} />;
      })}
      {(Object.keys(luz) as ViaBiliar[]).map((o) => {
        const g = VIAS[o];
        return (
          <Label key={o} x={g.lx} y={g.ly} a={g.la} c={col(luz[o])} s={15}>
            {g.n}
          </Label>
        );
      })}
      {calculo && <Piedras x={PIEDRA[calculo][0]} y={PIEDRA[calculo][1]} />}
      {tumor && (
        <path
          d={`M${PIEDRA[tumor][0] - 22},${PIEDRA[tumor][1]} C${PIEDRA[tumor][0] - 24},${PIEDRA[tumor][1] - 20} ${PIEDRA[tumor][0] + 6},${PIEDRA[tumor][1] - 28} ${PIEDRA[tumor][0] + 22},${PIEDRA[tumor][1] - 10} C${PIEDRA[tumor][0] + 34},${PIEDRA[tumor][1] + 6} ${PIEDRA[tumor][0] + 10},${PIEDRA[tumor][1] + 26} ${PIEDRA[tumor][0] - 6},${PIEDRA[tumor][1] + 20} C${PIEDRA[tumor][0] - 18},${PIEDRA[tumor][1] + 16} ${PIEDRA[tumor][0] - 20},${PIEDRA[tumor][1] + 8} ${PIEDRA[tumor][0] - 22},${PIEDRA[tumor][1]} Z`}
          fill={col('red')}
          opacity={0.85}
        />
      )}
    </g>
  );
}

/* ───────────────────────── Glifos de la escala de Bristol (caja 80 × 50) ───────────────────────── */

export function BristolGlyph({ n }: { n: number }) {
  const c = 'var(--v-stool)';
  const s = 'var(--v-stool-2)';
  switch (n) {
    case 1:
      return (
        <g fill={c} stroke={s} strokeWidth={1.5}>
          {[
            [16, 25, 8],
            [34, 20, 7],
            [50, 28, 8],
            [66, 22, 6],
            [28, 36, 6],
          ].map(([x, y, r], k) => (
            <circle key={k} cx={x} cy={y} r={r} />
          ))}
        </g>
      );
    case 2:
      return (
        <g fill={c} stroke={s} strokeWidth={1.5}>
          {[14, 26, 38, 50, 62].map((x, k) => (
            <circle key={k} cx={x} cy={25 + (k % 2 ? -2 : 2)} r={9} />
          ))}
        </g>
      );
    case 3:
      return (
        <g>
          <rect x={6} y={15} width={68} height={20} rx={10} fill={c} stroke={s} strokeWidth={1.5} />
          {[20, 34, 48, 60].map((x) => (
            <path key={x} d={`M${x},15 L${x - 3},22 M${x + 2},35 L${x - 1},29`} stroke={s} strokeWidth={1.8} />
          ))}
        </g>
      );
    case 4:
      return <path d="M8,30 C20,10 34,40 46,22 C56,8 68,22 74,18" fill="none" stroke={c} strokeWidth={13} strokeLinecap="round" />;
    case 5:
      return (
        <g fill={c} stroke={s} strokeWidth={1.5}>
          {[
            [18, 26, 11, 8],
            [42, 22, 12, 8],
            [64, 28, 10, 7],
          ].map(([x, y, rx, ry], k) => (
            <ellipse key={k} cx={x} cy={y} rx={rx} ry={ry} />
          ))}
        </g>
      );
    case 6:
      return <path d="M8,30 C12,16 24,22 30,14 C38,22 48,12 56,20 C66,14 74,24 72,32 C62,40 50,34 40,38 C28,42 14,40 8,30 Z" fill={c} stroke={s} strokeWidth={1.5} opacity={0.85} />;
    default:
      return (
        <g>
          <ellipse cx={40} cy={30} rx={32} ry={10} fill={c} opacity={0.55} />
          <path d="M14,28 Q24,22 34,28 T54,28 T70,28" fill="none" stroke={s} strokeWidth={2} />
        </g>
      );
  }
}
