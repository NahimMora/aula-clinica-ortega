// Dibujos anatómicos esquemáticos (SVG puro) compartidos por los bloques interactivos de la web
// y por las escenas animadas (Lienzo/video). Colores por variables --v-* (definidas en tokens.css).
// Si se pasa `t` (segundos), la animación se calcula con t (video); si no, la hacen clases CSS (web).
import type { ReactNode } from 'react';
import type { Fuga, Nefrona, NefronaVista, Organo, Punto, Region, UrinarioVista, VTone, ViaBiliar, ViaUrinaria } from './tipos';

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
  // Chauffard se dibuja como triángulo: ombligo, línea media hacia arriba y bisectriz del cuadrante superior derecho.
  chauffard: { x: 182, y: 210, n: 'Chauffard' },
  desjardins: { x: 162, y: 186, n: 'Desjardins' },
  'ureteral-sup': { x: 150, y: 246, n: 'Ureteral sup.' },
  'ureteral-med': { x: 159, y: 384, n: 'Ureteral medio' },
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
      {ruta && rutaPts.length > 1 && (
        <g>
          <path d={rutaD} fill="none" stroke={col(rutaTone)} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="10 9" markerEnd={`url(#${idp}-arr)`} className={t === undefined ? 'v-dash' : undefined} strokeDashoffset={t === undefined ? undefined : -t * 30} />
          {rutaPts.map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1] - 32} r={11} fill={col(rutaTone)} />
          ))}
          {rutaPts.map((p, i) => (
            <text key={`n${i}`} x={p[0]} y={p[1] - 31} textAnchor="middle" dominantBaseline="middle" fontSize={13} fontWeight={800} fill={BG} fontFamily={FONT}>
              {i + 1}
            </text>
          ))}
          {dot && <circle cx={dot[0]} cy={dot[1]} r={9} fill={col(rutaTone)} stroke={BG} strokeWidth={3} />}
        </g>
      )}
      {etiquetas &&
        (Object.keys(REGIONES) as Region[]).map((r) => {
          const [x, y] = centroRegion(r);
          const on = Boolean(luz[r]);
          const n = REGIONES[r].n;
          const k = n.lastIndexOf(' ');
          const lineas = k > 0 && n.length > 11 ? [n.slice(0, k), n.slice(k + 1)] : [n];
          return lineas.map((l, j) => (
            <Label key={r + j} x={x} y={y + (j - (lineas.length - 1) / 2) * (on ? 17 : 15)} s={on ? 15.5 : 13} w={on ? 800 : 600} c={on ? col(luz[r]) : INK3}>
              {l}
            </Label>
          ));
        })}
      {puntos.map(({ p, tone }) => {
        const P = PUNTOS[p];
        const pares = p === 'greyturner' || p === 'ureteral-sup' || p === 'ureteral-med' ? [P.x, 400 - P.x] : p === 'renal-d' || p === 'renal-i' ? [P.x] : [P.x];
        return pares.map((x, k) => (
          <g key={`${p}${k}`}>
            {p === 'chauffard' ? (
              <polygon points="200,246 200,178 150,196" fill={col(tone)} stroke={col(tone)} strokeWidth={2.5} strokeLinejoin="round" fillOpacity={0.3 + 0.25 * pu} className={t === undefined ? 'v-pulse' : undefined} />
            ) : P.r ? (
              <ellipse cx={x} cy={P.y} rx={P.r} ry={P.r * (p === 'greyturner' ? 1.9 : 0.8)} fill={col(tone)} opacity={0.35 + 0.25 * pu} className={t === undefined ? 'v-pulse' : undefined} />
            ) : (
              <>
                <circle cx={x} cy={P.y} r={14 + 6 * pu} fill="none" stroke={col(tone)} strokeWidth={3} opacity={0.8} className={t === undefined ? 'v-ring' : undefined} />
                <circle cx={x} cy={P.y} r={7} fill={col(tone)} />
              </>
            )}
            {k === 0 && (
              <Label x={p === 'chauffard' ? 112 : x} y={p === 'chauffard' ? 204 : P.y + (P.r ? (p === 'greyturner' ? 66 : 36) : 26)} c={col(tone)} s={14}>
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
const BASE: Partial<Record<Organo, string>> = { higado: 'var(--v-liver)', vesicula: 'var(--v-bile)', bazo: 'var(--v-spleen)', pancreas: 'var(--v-pan)' };

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
              <path d={g.d} fill="none" stroke={tone ? fil(tone) : 'var(--v-gut)'} strokeWidth={g.tubo} strokeLinecap="round" strokeLinejoin="round" />
            </g>
          );
        }
        return <path key={o} d={g.d} fill={tone ? fil(tone) : BASE[o] ?? 'var(--v-card)'} stroke={tone ? col(tone) : LINE} strokeWidth={tone ? 4 : 2.5} />;
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
const BASE_B: Record<ViaBiliar, string> = {
  higado: 'var(--v-liver)',
  duodeno: 'var(--v-gut)',
  pancreas: 'var(--v-pan)',
  wirsung: 'var(--v-card)',
  vesicula: 'var(--v-bile)',
  hepatico: 'var(--v-bile)',
  cistico: 'var(--v-bile)',
  coledoco: 'var(--v-bile)',
  ampolla: 'var(--v-bile)',
};

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
              <path d={g.d} fill="none" stroke={tone ? fil(tone) : BASE_B[o]} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
            </g>
          );
        }
        const esc = o === 'vesicula' && dil ? 'translate(112 222) scale(1.28) translate(-112 -222)' : undefined;
        return <path key={o} d={g.d} transform={esc} fill={tone ? fil(tone) : BASE_B[o]} stroke={tone ? col(tone) : LINE} strokeWidth={tone ? 4 : 2.5} />;
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

/* ───────────────────────── Utilidades: masa tumoral, curva suave y recorrido por una polilínea ───────────────────────── */

function Masa({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x - 22},${y} C${x - 24},${y - 20} ${x + 6},${y - 28} ${x + 22},${y - 10} C${x + 34},${y + 6} ${x + 10},${y + 26} ${x - 6},${y + 20} C${x - 18},${y + 16} ${x - 20},${y + 8} ${x - 22},${y} Z`}
      fill={col('red')}
      opacity={0.85}
    />
  );
}

/** Curva suave (Catmull-Rom → Bézier) que pasa por todos los puntos. */
function suave(p: [number, number][]) {
  let d = `M${p[0][0]},${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[Math.max(0, i - 1)];
    const b = p[i];
    const c2 = p[i + 1];
    const e = p[Math.min(p.length - 1, i + 2)];
    d += ` C${(b[0] + (c2[0] - a[0]) / 6).toFixed(1)},${(b[1] + (c2[1] - a[1]) / 6).toFixed(1)} ${(c2[0] - (e[0] - b[0]) / 6).toFixed(1)},${(c2[1] - (e[1] - b[1]) / 6).toFixed(1)} ${c2[0]},${c2[1]}`;
  }
  return d;
}

/** Punto a la fracción u (0..1) de una polilínea. */
function enPoli(p: [number, number][], u: number): [number, number] {
  const L: number[] = [0];
  for (let i = 1; i < p.length; i++) L.push(L[i - 1] + Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]));
  const s = u * L[L.length - 1];
  let i = 1;
  while (i < L.length - 1 && L[i] < s) i++;
  const k = (s - L[i - 1]) / (L[i] - L[i - 1] || 1);
  return [p[i - 1][0] + (p[i][0] - p[i - 1][0]) * k, p[i - 1][1] + (p[i][1] - p[i - 1][1]) * k];
}

/* ───────────────────────── Aparato urinario (viewBox 0 0 420 470) ───────────────────────── */

export const URI_W = 420;
export const URI_H = 470;
const RD: [number, number] = [112, 132]; // riñón derecho (a la izquierda del dibujo, más bajo por el hígado)
const RI: [number, number] = [308, 116];
/** Riñón en forma de poroto: s = 1 si el hilio mira a la derecha del dibujo, -1 si mira a la izquierda. */
const rinonP = ([x, y]: [number, number], s: number) =>
  `M${x},${y - 62} C${x - 42 * s},${y - 62} ${x - 50 * s},${y - 20} ${x - 48 * s},${y + 10} C${x - 46 * s},${y + 48} ${x - 26 * s},${y + 64} ${x},${y + 62} C${x + 22 * s},${y + 60} ${x + 30 * s},${y + 44} ${x + 22 * s},${y + 24} C${x + 14 * s},${y + 10} ${x + 14 * s},${y - 6} ${x + 22 * s},${y - 20} C${x + 32 * s},${y - 42} ${x + 24 * s},${y - 62} ${x},${y - 62} Z`;
/** Pelvis renal: embudo que se afina hacia el hilio (unión pieloureteral) con tres cálices hacia la corteza. */
const pelvisP = ([x, y]: [number, number], s: number) =>
  `M${x + 30 * s},${y + 12} C${x + 16 * s},${y + 16} ${x - 12 * s},${y + 24} ${x - 13 * s},${y + 4} C${x - 14 * s},${y - 16} ${x + 10 * s},${y - 10} ${x + 30 * s},${y + 6} Z`;
const calizP = ([x, y]: [number, number], s: number) =>
  `M${x - 6 * s},${y - 8} L${x - 22 * s},${y - 26} M${x - 12 * s},${y + 4} L${x - 30 * s},${y + 2} M${x - 6 * s},${y + 14} L${x - 22 * s},${y + 32}`;
const URETER: Record<'ureter-d' | 'ureter-i', string> = {
  'ureter-d': 'M142,144 C150,200 160,250 166,290 C171,325 176,345 186,364',
  'ureter-i': 'M278,128 C270,190 260,250 254,290 C249,325 244,345 234,364',
};
const VEJIGA = 'M150,374 C150,334 270,334 270,374 C270,410 242,420 210,420 C178,420 150,410 150,374 Z';
const URI_LAB: Record<ViaUrinaria, { n: string; lx: number; ly: number; la?: 'start' | 'middle' | 'end' }> = {
  'rinon-d': { n: 'Riñón der.', lx: 112, ly: 212 },
  'rinon-i': { n: 'Riñón izq.', lx: 308, ly: 196 },
  'pelvis-d': { n: 'Pelvis renal', lx: 150, ly: 104, la: 'start' },
  'pelvis-i': { n: 'Pelvis renal', lx: 270, ly: 74, la: 'end' },
  'ureter-d': { n: 'Uréter', lx: 148, ly: 236, la: 'end' },
  'ureter-i': { n: 'Uréter', lx: 272, ly: 236, la: 'start' },
  vejiga: { n: 'Vejiga', lx: 210, ly: 382 },
  prostata: { n: 'Próstata', lx: 258, ly: 444, la: 'start' },
  uretra: { n: 'Uretra', lx: 222, ly: 464, la: 'start' },
};
const PIEDRA_U: Record<ViaUrinaria, [number, number]> = {
  'rinon-d': [100, 104],
  'rinon-i': [320, 88],
  'pelvis-d': [124, 138],
  'pelvis-i': [296, 122],
  'ureter-d': [164, 274],
  'ureter-i': [256, 274],
  vejiga: [210, 400],
  prostata: [210, 432],
  uretra: [210, 458],
};
const ESTRECHECES: [number, number][] = [
  [144, 152],
  [164, 276],
  [184, 360],
];

function Tubo({ d, w, tone, base, pu, t }: { d: string; w: number; tone?: VTone; base: string; pu: number; t?: number }) {
  return (
    <g>
      <path d={d} fill="none" stroke={tone ? col(tone) : LINE} strokeWidth={w + 6} strokeLinecap="round" strokeLinejoin="round" opacity={tone ? 0.75 + 0.25 * pu : 1} className={tone && t === undefined ? 'v-pulse-soft' : undefined} />
      <path d={d} fill="none" stroke={tone ? fil(tone) : base} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

export function UrinarioFig({ v, tone, t, idp = 'uri' }: { v: UrinarioVista; tone: VTone; t?: number; idp?: string }) {
  const pu = pulso(t);
  const on = (o: ViaUrinaria) => (v.luz.includes(o) ? tone : undefined);
  const dil = (o: ViaUrinaria) => (v.dilata ?? []).includes(o);
  const lado = (r: 'd' | 'i') => {
    const c = r === 'd' ? RD : RI;
    const s = r === 'd' ? 1 : -1;
    const hidro = dil(`rinon-${r}`) || dil(`pelvis-${r}`);
    const kt = on(`rinon-${r}`);
    const pt = on(`pelvis-${r}`);
    const px = c[0] + 26 * s; // la dilatación crece desde la unión pieloureteral hacia adentro
    return (
      <g key={r}>
        <path d={rinonP(c, s)} transform={hidro ? `translate(${c[0]} ${c[1]}) scale(1.14) translate(${-c[0]} ${-c[1]})` : undefined} fill={kt ? fil(kt) : 'var(--v-kidney)'} stroke={kt ? col(kt) : LINE} strokeWidth={kt ? 4 : 2.5} />
        <g transform={hidro ? `translate(${px} ${c[1] + 9}) scale(1.4) translate(${-px} ${-c[1] - 9})` : undefined}>
          <path d={calizP(c, s)} fill="none" stroke={pt ? col(pt) : 'var(--v-urine)'} strokeWidth={hidro ? 7 : 6} strokeLinecap="round" />
          <path d={pelvisP(c, s)} fill={pt ? fil(pt) : 'var(--v-urine)'} stroke={pt ? col(pt) : LINE} strokeWidth={pt ? 3.5 : 2} />
        </g>
      </g>
    );
  };
  const vt = on('vejiga');
  const prt = on('prostata');
  const big = dil('prostata');
  return (
    <g>
      <defs>
        <marker id={`${idp}-arr`} viewBox="0 0 10 10" refX={6} refY={5} markerWidth={5} markerHeight={5} orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={col(tone)} />
        </marker>
      </defs>
      {lado('d')}
      {lado('i')}
      {(['ureter-d', 'ureter-i'] as const).map((u) => (
        <Tubo key={u} d={URETER[u]} w={dil(u) ? 17 : 9} tone={on(u)} base="var(--v-urine)" pu={pu} t={t} />
      ))}
      <path d={VEJIGA} transform={dil('vejiga') ? 'translate(210 378) scale(1.36) translate(-210 -378)' : undefined} fill={vt ? fil(vt) : 'var(--v-urine)'} stroke={vt ? col(vt) : LINE} strokeWidth={vt ? 4 : 2.5} />
      <Tubo d="M210,420 L210,470" w={big ? 5 : 9} tone={on('uretra')} base="var(--v-urine)" pu={pu} t={t} />
      <ellipse cx={210} cy={432} rx={big ? 40 : 26} ry={big ? 25 : 16} fill={prt ? fil(prt) : 'var(--v-spleen)'} stroke={prt ? col(prt) : LINE} strokeWidth={prt ? 4 : 2.5} opacity={0.95} />
      {v.estrecheces &&
        ESTRECHECES.map(([x, y], k) => (
          <g key={k}>
            <circle cx={x} cy={y} r={13} fill="none" stroke={col('gold')} strokeWidth={3} opacity={0.6 + 0.4 * pu} className={t === undefined ? 'v-pulse-soft' : undefined} />
            <Label x={x - 26} y={y} c={col('gold')} s={14}>
              {k + 1}
            </Label>
          </g>
        ))}
      {v.irradia && (
        <path
          d="M58,150 C52,210 70,270 104,320 C130,356 160,400 192,450"
          fill="none"
          stroke={col(tone)}
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray="10 9"
          markerEnd={`url(#${idp}-arr)`}
          className={t === undefined ? 'v-dash' : undefined}
          strokeDashoffset={t === undefined ? undefined : -t * 30}
        />
      )}
      {v.luz.map((o) => {
        const g = URI_LAB[o];
        return (
          <Label key={o} x={g.lx} y={g.ly} a={g.la} c={col(tone)} s={15}>
            {g.n}
          </Label>
        );
      })}
      {v.calculo && <Piedras x={PIEDRA_U[v.calculo][0]} y={PIEDRA_U[v.calculo][1]} />}
      {v.tumor && <Masa x={PIEDRA_U[v.tumor][0]} y={PIEDRA_U[v.tumor][1]} />}
      {v.vasos && (
        <g transform="translate(14 352)">
          <Label x={52} y={0} c={INK3} s={12} w={700}>
            Tres vasos
          </Label>
          {v.vasos.map((rojo, k) => (
            <g key={k} transform={`translate(${k * 36} 14)`}>
              <path d="M4,20 L24,20 L22,48 L6,48 Z" fill={rojo ? col('red') : 'var(--v-urine)'} opacity={rojo ? 0.8 + 0.2 * pu : 1} className={rojo && t === undefined ? 'v-pulse-soft' : undefined} />
              <path d="M0,0 L28,0 L24,50 L4,50 Z" fill="none" stroke={INK3} strokeWidth={2.2} strokeLinejoin="round" />
              <Label x={14} y={64} c={rojo ? col('red') : INK3} s={13}>
                {k + 1}
              </Label>
            </g>
          ))}
        </g>
      )}
    </g>
  );
}

/* ───────────────────────── Nefrona (viewBox 0 0 420 420) ───────────────────────── */

export const NEF_W = 420;
export const NEF_H = 420;
const GLO: [number, number] = [112, 116];
/** Recorrido del filtrado: glomérulo → proximal → Henle → distal → colector. */
const RUTA_N: [number, number][] = [
  [112, 116],
  [158, 118],
  [182, 96],
  [204, 122],
  [226, 94],
  [248, 120],
  [262, 152],
  [260, 250],
  [258, 340],
  [268, 368],
  [284, 372],
  [296, 350],
  [298, 262],
  [300, 184],
  [318, 162],
  [302, 142],
  [322, 126],
  [344, 144],
  [372, 124],
  [372, 250],
  [372, 410],
];
const TRAMO_N: Record<'proximal' | 'henle' | 'distal', [number, number]> = { proximal: [1, 6], henle: [6, 13], distal: [13, 18] };
const NEF_LAB: Record<Nefrona, { n: string; lx: number; ly: number; la?: 'start' | 'middle' | 'end' }> = {
  arteriola: { n: 'Arteriola', lx: 30, ly: 150 },
  glomerulo: { n: 'Glomérulo', lx: 112, ly: 182 },
  bowman: { n: 'Cápsula de Bowman', lx: 100, ly: 46 },
  proximal: { n: 'Túbulo proximal', lx: 215, ly: 68 },
  henle: { n: 'Asa de Henle', lx: 246, ly: 300, la: 'end' },
  distal: { n: 'Túbulo distal', lx: 322, ly: 96 },
  colector: { n: 'Colector', lx: 360, ly: 398, la: 'end' },
};
const MARCA_N: Record<Nefrona, [number, number]> = {
  arteriola: [40, 126],
  glomerulo: [112, 116],
  bowman: [150, 84],
  proximal: [204, 110],
  henle: [259, 300],
  distal: [322, 140],
  colector: [372, 300],
};
const FUGA: Record<Fuga, { n: number; desde: number; dur: number }> = {
  proteinas: { n: 7, desde: 0, dur: 6 },
  hematies: { n: 5, desde: 0, dur: 6.5 },
  glucosa: { n: 6, desde: 0, dur: 6 },
  agua: { n: 8, desde: 18, dur: 3.2 },
};

function Particula({ f }: { f: Fuga }) {
  switch (f) {
    case 'proteinas':
      return <circle r={4.5} fill={col('gold')} stroke={BG} strokeWidth={1.5} />;
    case 'hematies':
      return (
        <g>
          <circle r={7} fill={col('red')} stroke={BG} strokeWidth={1.5} />
          <circle r={2.8} fill={fil('red')} />
        </g>
      );
    case 'glucosa':
      return <polygon points={[0, 1, 2, 3, 4, 5].map((j) => `${(Math.cos((j * Math.PI) / 3) * 6).toFixed(1)},${(Math.sin((j * Math.PI) / 3) * 6).toFixed(1)}`).join(' ')} fill={col('mint')} stroke={BG} strokeWidth={1.5} />;
    case 'agua':
      return <path d="M0,-8 C4,-3 6,0 6,3 A6,6 0 0 1 -6,3 C-6,0 -4,-3 0,-8 Z" fill={col('sky')} stroke={BG} strokeWidth={1.2} />;
  }
}

export function NefronaFig({ v, tone, t }: { v: NefronaVista; tone: VTone; t?: number }) {
  const pu = pulso(t);
  const on = (o: Nefrona) => (v.luz.includes(o) ? tone : undefined);
  const art = on('arteriola');
  const bow = on('bowman');
  const glo = on('glomerulo');
  const colec = on('colector');
  return (
    <g>
      {/* Arteriolas aferente (entra) y eferente (sale) */}
      <Tubo d="M0,128 C30,128 52,126 76,122" w={v.isquemia ? 3.5 : 10} tone={art} base="var(--v-vessel)" pu={pu} t={t} />
      <Tubo d="M76,104 C50,96 28,92 0,92" w={7} base="var(--v-vessel)" pu={pu} t={t} />
      {/* Colector */}
      <Tubo d="M372,36 L372,410" w={18} tone={colec} base="var(--v-urine)" pu={pu} t={t} />
      {/* Túbulos */}
      {(Object.keys(TRAMO_N) as (keyof typeof TRAMO_N)[]).map((k) => {
        const [a, b] = TRAMO_N[k];
        return <Tubo key={k} d={suave(RUTA_N.slice(a, b + 1))} w={11} tone={on(k)} base="var(--v-urine)" pu={pu} t={t} />;
      })}
      {/* Cápsula de Bowman y ovillo glomerular */}
      <circle cx={GLO[0]} cy={GLO[1]} r={44} fill={bow ? fil(bow) : 'var(--v-card)'} stroke={bow ? col(bow) : LINE} strokeWidth={bow ? 4 : 3} />
      {[
        [-12, -10, 11],
        [10, -12, 10],
        [14, 8, 11],
        [-8, 13, 10],
        [0, 0, 8],
      ].map(([dx, dy, r], k) => (
        <circle key={k} cx={GLO[0] + dx} cy={GLO[1] + dy} r={r} fill="none" stroke={glo ? col(glo) : 'var(--v-vessel)'} strokeWidth={glo ? 5 : 4.5} opacity={glo ? 0.75 + 0.25 * pu : 1} className={glo && t === undefined ? 'v-pulse-soft' : undefined} />
      ))}
      {(v.fuga ?? []).map((f) => {
        const F = FUGA[f];
        const ruta = RUTA_N.slice(F.desde);
        const d = ruta.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ');
        return Array.from({ length: F.n }, (_, k) => {
          if (t === undefined) {
            return (
              <g key={`${f}${k}`}>
                <animateMotion path={d} dur={`${F.dur}s`} begin={`${(-k * F.dur) / F.n}s`} repeatCount="indefinite" />
                <Particula f={f} />
              </g>
            );
          }
          const [x, y] = enPoli(ruta, (t / F.dur + k / F.n) % 1);
          return (
            <g key={`${f}${k}`} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
              <Particula f={f} />
            </g>
          );
        });
      })}
      {v.marca && (
        <g stroke={col('red')} strokeWidth={6} strokeLinecap="round">
          <path d={`M${MARCA_N[v.marca][0] - 12},${MARCA_N[v.marca][1] - 12} L${MARCA_N[v.marca][0] + 12},${MARCA_N[v.marca][1] + 12} M${MARCA_N[v.marca][0] + 12},${MARCA_N[v.marca][1] - 12} L${MARCA_N[v.marca][0] - 12},${MARCA_N[v.marca][1] + 12}`} style={{ paintOrder: 'stroke' }} />
        </g>
      )}
      {v.luz.map((o) => {
        const g = NEF_LAB[o];
        return (
          <Label key={o} x={g.lx} y={g.ly} a={g.la} c={col(tone)} s={15}>
            {g.n}
          </Label>
        );
      })}
    </g>
  );
}
