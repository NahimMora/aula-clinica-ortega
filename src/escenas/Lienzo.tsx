// Motor de dibujo de las escenas de Teoría. Cada dibujo es función pura de (escena, paso, t):
// no hay estado ni animaciones CSS, así la web lo mueve con requestAnimationFrame y Remotion
// con el número de fotograma (t = segundos desde que empezó el paso).
// Colores: variables CSS --v-* (la web las toma de la paleta oscura; el video las define en línea).
import type { ReactNode } from 'react';
import type { Escena, EscenaAbdomen, EscenaBiliar, EscenaCuadro, EscenaFlujo, EscenaLista, EscenaOrganos, EscenaPaneles, EscenaTubo, Figura, NotaFig, Tono, Tramo } from './tipos';
import type { Organo, Region, ViaBiliar } from '../visual/tipos';
import { ABD_H, ABD_W, AbdomenFig, BIL_H, BIL_W, BiliarFig, TR_H, TR_W, TractoFig } from '../visual/anatomia';

export const W = 960;
export const H = 600;

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const suave = (x: number) => {
  const c = clamp(x);
  return c * c * (3 - 2 * c);
};
/** Aparición: 0 → 1 entre `del` y `del + d` segundos. */
const ap = (t: number, del = 0, d = 0.45) => suave((t - del) / d);

const FONT = "'Inter Variable', 'Segoe UI', system-ui, sans-serif";
const DISPLAY = "'Fraunces Variable', Georgia, serif";
const tinta = 'var(--v-ink)';
const tinta2 = 'var(--v-ink2)';
const tinta3 = 'var(--v-ink3)';
const linea = 'var(--v-line)';
const fondo = 'var(--v-bg)';
const carta = 'var(--v-card)';
const c = (t: Tono = 'lilac') => `var(--v-${t})`;
const f = (t: Tono = 'lilac') => `var(--v-${t}-f)`;

/** Parte un texto en renglones de hasta n caracteres. */
export function renglones(s: string, n: number): string[] {
  const out: string[] = [];
  let cur = '';
  for (const w of s.split(' ')) {
    if (cur && (cur + ' ' + w).length > n) {
      out.push(cur);
      cur = w;
    } else cur = cur ? cur + ' ' + w : w;
  }
  if (cur) out.push(cur);
  return out;
}

function T(p: { x: number; y: number; c?: string; s?: number; w?: number; a?: 'start' | 'middle' | 'end'; o?: number; fam?: string; children: ReactNode }) {
  return (
    <text x={p.x} y={p.y} fill={p.c ?? tinta} fontSize={p.s ?? 26} fontWeight={p.w ?? 600} textAnchor={p.a ?? 'start'} opacity={p.o} fontFamily={p.fam ?? FONT} dominantBaseline="middle">
      {p.children}
    </text>
  );
}

/** Texto en varios renglones centrado verticalmente en y. */
function Multi(p: { x: number; y: number; t: string; n: number; s?: number; c?: string; w?: number; a?: 'start' | 'middle' | 'end'; o?: number; fam?: string; lh?: number }) {
  const r = renglones(p.t, p.n);
  const s = p.s ?? 24;
  const lh = s * (p.lh ?? 1.22);
  return (
    <>
      {r.map((l, i) => (
        <T key={i} x={p.x} y={p.y + (i - (r.length - 1) / 2) * lh} s={s} c={p.c} w={p.w} a={p.a} o={p.o} fam={p.fam}>
          {l}
        </T>
      ))}
    </>
  );
}

/* ───────────────────────── Cuadro comparativo ───────────────────────── */

function Cuadro({ e, i, t }: { e: EscenaCuadro; i: number; t: number }) {
  const p = e.pasos[i];
  const prev = i > 0 ? e.pasos[i - 1].hasta : -1;
  const n = e.filas.length;
  const top = 116;
  const rh = Math.min(84, (H - top - 14) / n);
  const X = [20, 205, 585];
  const WC = [176, 372, 355];
  const luz = p.luz ?? (p.hasta > prev ? p.hasta : -1);
  return (
    <g>
      {e.cols.map((col, k) => (
        <g key={k}>
          <rect x={X[k + 1]} y={22} width={WC[k + 1]} height={76} rx={18} fill={f(col.tono)} stroke={c(col.tono)} strokeWidth={3} />
          <T x={X[k + 1] + WC[k + 1] / 2} y={61} a="middle" s={36} w={650} c={c(col.tono)} fam={DISPLAY}>
            {col.t}
          </T>
        </g>
      ))}
      {e.filas.map((r, k) => {
        if (k > p.hasta) return null;
        const nueva = k > prev;
        const o = nueva ? ap(t, 0.15 + (k - prev - 1) * 0.25) : 1;
        const y = top + k * rh;
        const on = k === luz;
        return (
          <g key={k} opacity={o} transform={`translate(${nueva ? (1 - o) * 24 : 0} 0)`}>
            <rect x={14} y={y + 3} width={W - 28} height={rh - 6} rx={14} fill={on ? carta : 'transparent'} stroke={on ? c('gold') : 'transparent'} strokeWidth={2.5} />
            <rect x={X[1]} y={y + 7} width={WC[1]} height={rh - 14} rx={12} fill={f(e.cols[0].tono)} opacity={on ? 1 : 0.55} />
            <rect x={X[2]} y={y + 7} width={WC[2]} height={rh - 14} rx={12} fill={f(e.cols[1].tono)} opacity={on ? 1 : 0.55} />
            <Multi x={X[0] + 12} y={y + rh / 2} t={r.k} n={12} s={23} w={800} c={tinta3} />
            <Multi x={X[1] + 14} y={y + rh / 2} t={r.a} n={24} s={rh < 70 ? 25 : 28} w={650} c={c(e.cols[0].tono)} lh={1.15} />
            <Multi x={X[2] + 14} y={y + rh / 2} t={r.b} n={23} s={rh < 70 ? 25 : 28} w={650} c={c(e.cols[1].tono)} lh={1.15} />
          </g>
        );
      })}
    </g>
  );
}

/* ───────────────────────── Lista de tarjetas ───────────────────────── */

function Lista({ e, i, t }: { e: EscenaLista; i: number; t: number }) {
  const p = e.pasos[i];
  const prev = i > 0 ? e.pasos[i - 1].hasta : -1;
  const n = e.items.length;
  const gap = 12;
  const ih = Math.min(112, (H - 24 - gap * (n - 1)) / n);
  const total = n * ih + (n - 1) * gap;
  const y0 = (H - total) / 2;
  const luz = p.luz ?? e.items.map((_, k) => k).filter((k) => k > prev && k <= p.hasta);
  return (
    <g>
      {e.items.map((it, k) => {
        if (k > p.hasta) return null;
        const nueva = k > prev;
        const o = nueva ? ap(t, 0.1 + (k - prev - 1) * 0.3) : 1;
        const y = y0 + k * (ih + gap);
        const on = luz.includes(k);
        return (
          <g key={k} opacity={o * (on || !luz.length ? 1 : 0.62)} transform={`translate(${nueva ? (1 - o) * 30 : 0} 0)`}>
            {on && <rect x={8} y={y - 6} width={W - 16} height={ih + 12} rx={22} fill={c(it.tono)} opacity={0.1 + 0.06 * Math.sin(t * 4)} />}
            <rect x={14} y={y} width={W - 28} height={ih} rx={18} fill={f(it.tono)} stroke={on ? c(it.tono) : linea} strokeWidth={on ? 3 : 2} />
            <rect x={14} y={y} width={10} height={ih} rx={5} fill={c(it.tono)} />
            <T x={44} y={y + ih * 0.3} s={31} w={800} c={c(it.tono)}>
              {it.t}
            </T>
            <Multi x={44} y={y + ih * 0.7} t={it.d} n={62} s={25} w={500} c={tinta} lh={1.1} />
          </g>
        );
      })}
    </g>
  );
}

/* ───────────────────────── Tubo digestivo ───────────────────────── */

const TRAMOS: Record<Tramo, { d: string; lx: number; ly: number; n: string }> = {
  esofago: { d: 'M196,34 L196,176', lx: 228, ly: 96, n: 'Esófago' },
  estomago: { d: 'M196,176 C196,214 150,226 150,262 C150,312 214,326 262,300 C300,280 318,240 300,206', lx: 312, ly: 186, n: 'Estómago' },
  duodeno: { d: 'M300,206 C336,214 348,250 340,282 C332,312 300,318 286,336', lx: 356, ly: 262, n: 'Duodeno' },
  delgado: { d: 'M286,336 C250,350 168,350 168,382 C168,410 300,402 300,430 C300,458 168,452 168,478 C168,500 250,506 270,500', lx: 390, ly: 430, n: 'Delgado' },
  colon: { d: 'M270,500 C330,500 372,516 372,470 L372,372 C372,350 96,350 96,372 L96,530 C96,556 150,566 200,566', lx: 384, ly: 520, n: 'Colon' },
};

function Tubo({ e, i, t }: { e: EscenaTubo; i: number; t: number }) {
  const p = e.pasos[i];
  const o = ap(t, 0.1, 0.5);
  const sube = (t * 0.9) % 1;
  return (
    <g>
      <circle cx={196} cy={22} r={14} fill="none" stroke={tinta3} strokeWidth={3} />
      {(Object.keys(TRAMOS) as Tramo[]).map((k) => {
        const on = p.luz.includes(k);
        return (
          <g key={k}>
            <path d={TRAMOS[k].d} fill="none" stroke={on ? c(p.tono) : linea} strokeWidth={on ? 30 : 26} strokeLinecap="round" strokeLinejoin="round" opacity={on ? 0.35 + 0.65 * o : 1} />
            <path d={TRAMOS[k].d} fill="none" stroke={on ? f(p.tono) : fondo} strokeWidth={on ? 18 : 16} strokeLinecap="round" strokeLinejoin="round" />
            <T x={TRAMOS[k].lx} y={TRAMOS[k].ly} s={25} w={on ? 800 : 500} c={on ? c(p.tono) : tinta3}>
              {TRAMOS[k].n}
            </T>
          </g>
        );
      })}
      {p.obstruccion && (
        <g opacity={o}>
          <circle cx={200} cy={566} r={20} fill="none" stroke={c('red')} strokeWidth={6} />
          <line x1={186} y1={552} x2={214} y2={580} stroke={c('red')} strokeWidth={6} strokeLinecap="round" />
        </g>
      )}
      {/* El contenido sube por el esófago hacia la boca. */}
      <g opacity={o}>
        {[0, 1, 2].map((k) => {
          const y = 170 - ((sube + k / 3) % 1) * 140;
          return <circle key={k} cx={196} cy={y} r={6} fill={c(p.tono)} />;
        })}
      </g>
      {/* Muestra del vómito */}
      <g opacity={ap(t, 0.25, 0.5)} transform={`translate(${(1 - ap(t, 0.25, 0.5)) * 30} 0)`}>
        <rect x={510} y={40} width={436} height={520} rx={26} fill={carta} stroke={c(p.tono)} strokeWidth={3} />
        <path d="M598,110 L858,110 L830,212 C820,238 636,238 626,212 Z" fill={p.muestra.color} stroke={linea} strokeWidth={3} />
        {p.muestra.color2 &&
          [0, 1, 2, 3, 4, 5, 6, 7].map((k) => <circle key={k} cx={640 + ((k * 37) % 180)} cy={136 + ((k * 23) % 64)} r={6 + (k % 3) * 2} fill={p.muestra.color2} />)}
        <ellipse cx={728} cy={110} rx={130} ry={15} fill={p.muestra.color} stroke={linea} strokeWidth={3} />
        <Multi x={728} y={320} t={p.muestra.t} n={16} s={42} w={650} a="middle" c={c(p.tono)} fam={DISPLAY} />
        <Multi x={728} y={448} t={p.muestra.d} n={24} s={28} w={550} a="middle" c={tinta} />
      </g>
    </g>
  );
}

/* ───────────────────────── Flujo ───────────────────────── */

function cajaFlujo(n: { t: string; w?: number }) {
  const w = n.w ?? 230;
  const lines = renglones(n.t, Math.max(9, Math.floor(w / 14.5)));
  return { w, h: Math.max(66, lines.length * 31 + 26), lines };
}

function Flujo({ e, i, t }: { e: EscenaFlujo; i: number; t: number }) {
  const p = e.pasos[i];
  const antes = new Set(i > 0 ? e.pasos[i - 1].ver : []);
  const ver = new Set(p.ver);
  const nuevos = p.ver.filter((v) => !antes.has(v));
  const luz = new Set(p.luz ?? nuevos);
  const byId = Object.fromEntries(e.nodos.map((n) => [n.id, n]));
  const op = (id: string) => (antes.has(id) ? 1 : ap(t, 0.1 + nuevos.indexOf(id) * 0.28));
  return (
    <g>
      <defs>
        <marker id={`fl-${e.id}`} viewBox="0 0 10 10" refX={9} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={tinta3} />
        </marker>
      </defs>
      {e.lazos.map((l, k) => {
        if (!ver.has(l.a) || !ver.has(l.b)) return null;
        const A = byId[l.a];
        const B = byId[l.b];
        const ca = cajaFlujo(A);
        const cb = cajaFlujo(B);
        const dx = B.x - A.x;
        const dy = B.y - A.y;
        const horiz = Math.abs(dx) > Math.abs(dy);
        const x1 = horiz ? A.x + Math.sign(dx) * (ca.w / 2) : A.x;
        const y1 = horiz ? A.y : A.y + Math.sign(dy) * (ca.h / 2);
        const x2 = horiz ? B.x - Math.sign(dx) * (cb.w / 2 + 6) : B.x;
        const y2 = horiz ? B.y : B.y - Math.sign(dy) * (cb.h / 2 + 6);
        const d = horiz ? `M${x1},${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}` : `M${x1},${y1} C${x1},${(y1 + y2) / 2} ${x2},${(y1 + y2) / 2} ${x2},${y2}`;
        const o = Math.min(op(l.a), op(l.b));
        const hacia = luz.has(l.b);
        const tb = byId[l.b].tono ?? 'lilac';
        const bez = horiz
          ? ([x1, y1, (x1 + x2) / 2, y1, (x1 + x2) / 2, y2, x2, y2] as const)
          : ([x1, y1, x1, (y1 + y2) / 2, x2, (y1 + y2) / 2, x2, y2] as const);
        const punto = (u: number) => {
          const v = 1 - u;
          return [
            v * v * v * bez[0] + 3 * v * v * u * bez[2] + 3 * v * u * u * bez[4] + u * u * u * bez[6],
            v * v * v * bez[1] + 3 * v * v * u * bez[3] + 3 * v * u * u * bez[5] + u * u * u * bez[7],
          ];
        };
        return (
          <g key={k} opacity={o}>
            <path d={d} fill="none" stroke={hacia ? c(tb) : tinta3} strokeWidth={hacia ? 4 : 3} markerEnd={`url(#fl-${e.id})`} opacity={hacia ? 0.9 : 0.75} />
            {o > 0.9 &&
              [0, 1, 2].map((j) => {
                const u = (t * 0.45 + j / 3) % 1;
                const [px, py] = punto(u);
                return <circle key={j} cx={px} cy={py} r={hacia ? 5.5 : 4} fill={hacia ? c(tb) : tinta3} opacity={Math.sin(u * Math.PI)} />;
              })}
            {l.t && (
              <T x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 14} a="middle" s={18} w={700} c={tinta3}>
                {l.t}
              </T>
            )}
          </g>
        );
      })}
      {e.nodos.map((n) => {
        if (!ver.has(n.id)) return null;
        const b = cajaFlujo(n);
        const o = op(n.id);
        const on = luz.has(n.id);
        const tono = n.tono ?? 'lilac';
        return (
          <g key={n.id} opacity={o} transform={`translate(0 ${(1 - o) * 14})`}>
            {on && <rect x={n.x - b.w / 2 - 8} y={n.y - b.h / 2 - 8} width={b.w + 16} height={b.h + 16} rx={22} fill={c(tono)} opacity={0.12 + 0.08 * Math.sin(t * 4)} />}
            <rect x={n.x - b.w / 2} y={n.y - b.h / 2} width={b.w} height={b.h} rx={16} fill={f(tono)} stroke={c(tono)} strokeWidth={on ? 3.5 : 2} opacity={on ? 1 : 0.92} />
            {b.lines.map((l, k) => (
              <T key={k} x={n.x} y={n.y + (k - (b.lines.length - 1) / 2) * 31} a="middle" s={26} w={on ? 800 : 600} c={on ? c(tono) : tinta}>
                {l}
              </T>
            ))}
          </g>
        );
      })}
    </g>
  );
}

/* ───────────────────────── Figuras (caja local 280 × 360) ───────────────────────── */

function Silueta({ dot, tono, t }: { dot: [number, number]; tono: Tono; t: number }) {
  const pulso = 1 + 0.3 * Math.sin(t * 5);
  return (
    <g>
      <circle cx={140} cy={62} r={40} fill={carta} stroke={tinta3} strokeWidth={3} />
      <path d="M122,100 L158,100 L160,138 L120,138 Z" fill={carta} stroke={tinta3} strokeWidth={3} />
      <path d="M34,360 L34,196 C34,150 80,138 120,138 L160,138 C200,138 246,150 246,196 L246,360" fill={carta} stroke={tinta3} strokeWidth={3} />
      <path d="M140,92 L140,300" stroke={c('sky')} strokeWidth={8} strokeLinecap="round" opacity={0.45} />
      <circle cx={dot[0]} cy={dot[1]} r={18 * pulso} fill="none" stroke={c(tono)} strokeWidth={4} />
      <circle cx={dot[0]} cy={dot[1]} r={8} fill={c(tono)} />
    </g>
  );
}

function Pared({ tipo, t }: { tipo: 'pared' | 'mw' | 'boer'; t: number }) {
  const g = ap(t, 0.3, 0.8);
  return (
    <g>
      <circle cx={140} cy={170} r={122} fill={f('peach')} stroke={c('peach')} strokeWidth={3} />
      <circle cx={140} cy={170} r={88} fill={f('rose')} stroke={c('rose')} strokeWidth={2} opacity={0.8} />
      <circle cx={140} cy={170} r={62} fill={f('rose')} stroke={c('rose')} strokeWidth={3} />
      <circle cx={140} cy={170} r={32} fill={fondo} stroke={tinta3} strokeWidth={2} />
      {tipo === 'pared' && (
        <g>
          <T x={140} y={170} a="middle" s={19} w={700} c={tinta3}>
            luz
          </T>
          <T x={140} y={124} a="middle" s={19} w={700} c={c('rose')}>
            mucosa
          </T>
          <T x={140} y={96} a="middle" s={19} w={700} c={c('rose')}>
            submucosa
          </T>
          <T x={140} y={64} a="middle" s={19} w={700} c={c('peach')}>
            muscular
          </T>
        </g>
      )}
      {tipo === 'mw' && (
        <g>
          <path d={`M134,${138} L146,${138} L${140 + 4},${138 - 30 * g} L${140 - 4},${138 - 30 * g} Z`} fill={c('red')} />
          {[0, 1, 2].map((k) => {
            const y = 150 + (((t * 0.8 + k / 3) % 1) * 40);
            return <circle key={k} cx={140 + (k - 1) * 8} cy={y} r={4} fill={c('red')} opacity={g} />;
          })}
        </g>
      )}
      {tipo === 'boer' && (
        <g>
          <path d={`M132,138 L148,138 L${148 + 6 * g},${138 - 100 * g} L${132 - 6 * g},${138 - 100 * g} Z`} fill={c('red')} />
          <path d={`M140,40 L140,${40 - 30 * g}`} stroke={c('red')} strokeWidth={4} strokeDasharray="6 6" />
        </g>
      )}
    </g>
  );
}

function Tubo2({ children, w = 60 }: { children?: ReactNode; w?: number }) {
  return (
    <g>
      <rect x={140 - w / 2} y={10} width={w} height={300} rx={14} fill={f('sky')} stroke={tinta3} strokeWidth={3} />
      {children}
    </g>
  );
}

function FiguraSVG({ fig, t }: { fig: Figura; t: number }) {
  switch (fig) {
    case 'pared':
    case 'mw':
    case 'boer':
      return <Pared tipo={fig} t={t} />;
    case 'alta':
      return <Silueta dot={[140, 118]} tono="peach" t={t} />;
    case 'baja':
      return <Silueta dot={[140, 230]} tono="sky" t={t} />;
    case 'muro': {
      const drops = [0, 1, 2, 3].map((k) => {
        const y = 20 + (((t * 0.55 + k / 4) % 1) * 290);
        return <circle key={k} cx={132 + (k % 2) * 16} cy={y} r={7} fill={c('sky')} />;
      });
      const by = 40 + 108 * ap(t, 0.2, 1.2);
      const shake = t > 1.4 ? 3 * Math.sin(t * 22) : 0;
      return (
        <g>
          <Tubo2>
            <path d="M110,170 Q140,190 110,210 M170,170 Q140,190 170,210" fill={f('peach')} stroke={tinta3} strokeWidth={3} />
            <path d="M110,170 Q138,190 110,210 L110,170 Z M170,170 Q142,190 170,210 L170,170 Z" fill={c('peach')} opacity={0.75} />
            {drops}
            <circle cx={140 + shake} cy={by} r={22} fill={c('peach')} stroke={tinta} strokeWidth={2} />
          </Tubo2>
          <T x={140} y={342} a="middle" s={24} w={700} c={tinta3}>
            estenosis
          </T>
        </g>
      );
    }
    case 'motor': {
      const fl = (k: number) => 6 * Math.sin(t * 2.4 + k);
      return (
        <g>
          <Tubo2>
            {[0, 1, 2].map((k) => (
              <circle key={k} cx={126 + k * 14} cy={130 + k * 12 + fl(k)} r={7} fill={c('sky')} />
            ))}
            <circle cx={140} cy={88 + fl(5)} r={22} fill={c('peach')} stroke={tinta} strokeWidth={2} />
          </Tubo2>
          <path d="M186,140 q12,-18 24,0 t24,0 t24,0" fill="none" stroke={c('lilac')} strokeWidth={4} />
          <line x1={188} y1={118} x2={256} y2={160} stroke={c('red')} strokeWidth={5} strokeLinecap="round" />
          <T x={140} y={342} a="middle" s={24} w={700} c={tinta3}>
            sin peristaltismo
          </T>
        </g>
      );
    }
    case 'acalasia': {
      const dil = ap(t, 0, 1.4);
      const half = 30 + 62 * dil;
      const top = 10;
      const bot = 300;
      const body = `M${140 - half},${top} C${140 - half - 8},${top + 110} ${140 - half},${bot - 80} ${140 - 12},${bot - 20} L${140 - 5},${bot} L${140 + 5},${bot} L${140 + 12},${bot - 20} C${140 + half},${bot - 80} ${140 + half + 8},${top + 110} ${140 + half},${top} Z`;
      const lvl = 0.25 + 0.4 * ap(t, 0.4, 1.6);
      return (
        <g>
          <defs>
            <clipPath id="acal-clip">
              <path d={body} />
            </clipPath>
          </defs>
          <path d={body} fill={f('sky')} stroke={tinta3} strokeWidth={3} />
          <rect x={0} y={bot - (bot - top) * lvl} width={280} height={400} fill={c('peach')} opacity={0.6} clipPath="url(#acal-clip)" />
          <circle cx={140} cy={bot + 6} r={14} fill="none" stroke={c('red')} strokeWidth={5} />
          <T x={140} y={342} a="middle" s={24} w={700} c={c('red')}>
            EEI no se relaja
          </T>
        </g>
      );
    }
    case 'pico':
    case 'manzana': {
      const ACAL = 'M70,24 C58,80 54,150 62,200 C68,232 92,250 98,268 L100,286 L104,286 L106,268 C114,250 138,230 144,200 C152,150 148,80 136,24 Z';
      const CANCER = 'M90,20 L90,118 L82,122 L97,128 L93,138 L99,147 L95,157 L100,166 L92,174 L82,178 L90,184 L90,226 C62,236 60,286 98,290 C142,292 146,240 110,226 L110,184 L118,178 L104,172 L108,162 L103,152 L107,143 L102,133 L117,124 L110,118 L110,20 Z';
      const o = ap(t, 0.1, 0.7);
      return (
        <g transform="translate(30 10)">
          <rect width={220} height={320} rx={16} fill="#0b0b10" stroke={linea} strokeWidth={2} />
          <g transform="translate(8 6)" opacity={o}>
            {fig === 'pico' ? (
              <>
                <clipPath id="pico-clip">
                  <path d={ACAL} />
                </clipPath>
                <g clipPath="url(#pico-clip)">
                  <rect width={220} height={110} fill="#3a3a44" />
                  <rect y={110} width={220} height={220} fill="#ecebf2" />
                </g>
              </>
            ) : (
              <path d={CANCER} fill="#ecebf2" />
            )}
          </g>
        </g>
      );
    }
  }
}

function Paneles({ e, i, t }: { e: EscenaPaneles; i: number; t: number }) {
  const p = e.pasos[i];
  const prev = i > 0 ? e.pasos[i - 1] : undefined;
  const n = p.paneles.length;
  const franjaH = p.franja ? 92 : 0;
  return (
    <g>
      {p.paneles.map((pn, k) => {
        const yaEstaba = prev?.paneles[k]?.f === pn.f && prev?.paneles[k]?.t === pn.t;
        const o = yaEstaba ? 1 : ap(t, 0.1 + k * 0.25);
        const tono = pn.tono ?? 'lilac';
        const tf = yaEstaba ? t + 3 : t;
        if (n === 1) {
          // Una sola figura: dibujo a la izquierda y texto grande a la derecha.
          const alto = H - 30 - franjaH;
          const s = Math.min(420 / 280, alto / 360);
          return (
            <g key={k} opacity={o}>
              <g transform={`translate(${250 - 140 * s} ${15 + (alto - 360 * s) / 2}) scale(${s})`}>
                <FiguraSVG fig={pn.f} t={tf} />
              </g>
              <Multi x={712} y={(H - franjaH) / 2 - 60} t={pn.t} n={14} s={44} w={650} a="middle" c={c(tono)} fam={DISPLAY} />
              {pn.d && <Multi x={712} y={(H - franjaH) / 2 + 70} t={pn.d} n={24} s={28} w={500} a="middle" c={tinta} />}
            </g>
          );
        }
        const pw = (W - 20) / n;
        const cx = 10 + pw * k + pw / 2;
        const figH = H - 30 - 140 - franjaH;
        const s = Math.min((pw - 30) / 280, figH / 360);
        return (
          <g key={k} opacity={o}>
            <g transform={`translate(${cx - 140 * s} ${12}) scale(${s})`}>
              <FiguraSVG fig={pn.f} t={tf} />
            </g>
            <Multi x={cx} y={figH + 50} t={pn.t} n={n === 2 ? 20 : 14} s={n === 2 ? 36 : 30} w={650} a="middle" c={c(tono)} fam={DISPLAY} />
            {pn.d && <Multi x={cx} y={figH + 112} t={pn.d} n={n === 2 ? 30 : 20} s={n === 2 ? 25 : 22} w={500} a="middle" c={tinta2} lh={1.15} />}
          </g>
        );
      })}
      {p.franja && <Franja f={p.franja} prevHasta={prev?.franja ? prev.franja.hasta : -1} t={t} />}
    </g>
  );
}

function Franja({ f: fr, prevHasta, t }: { f: NonNullable<EscenaPaneles['pasos'][number]['franja']>; prevHasta: number; t: number }) {
  const y = 550;
  const rot = fr.rotulo ? fr.rotulo.length * 13 + 22 : 0;
  const ws = fr.items.map((x) => x.length * 17 + 48);
  const arrows = (fr.items.length - 1) * 50;
  const total = rot + ws.reduce((a, b) => a + b, 0) + arrows;
  let x = (W - total) / 2;
  const out: ReactNode[] = [];
  if (fr.rotulo) {
    out.push(
      <T key="r" x={x} y={y} s={24} w={800} c={c(fr.tono)}>
        {fr.rotulo}
      </T>,
    );
    x += rot;
  }
  fr.items.forEach((it, k) => {
    if (k > fr.hasta) return;
    const o = k > prevHasta ? ap(t, 0.2 + (k - prevHasta - 1) * 0.45) : 1;
    if (k > 0) {
      out.push(
        <T key={'a' + k} x={x + 25} y={y} a="middle" s={28} c={tinta3} o={o}>
          →
        </T>,
      );
      x += 50;
    }
    out.push(
      <g key={k} opacity={o}>
        <rect x={x} y={y - 29} width={ws[k]} height={58} rx={29} fill={f(fr.tono)} stroke={c(fr.tono)} strokeWidth={3} />
        <T x={x + ws[k] / 2} y={y + 1} a="middle" s={28} w={750} c={c(fr.tono)}>
          {it}
        </T>
      </g>,
    );
    x += ws[k];
  });
  return <g>{out}</g>;
}

/* ───────────────────────── Lienzo ───────────────────────── */

/* ───────────────────────── Figuras anatómicas con nota ───────────────────────── */

function NotaLado({ nota, tono, t, x = 520 }: { nota: NotaFig; tono: Tono; t: number; x?: number }) {
  const o = ap(t, 0.25, 0.5);
  const w = W - x - 24;
  const nt = Math.max(10, Math.floor(w / 25));
  const nd = Math.max(16, Math.floor(w / 15));
  const lt = renglones(nota.t, nt).length;
  return (
    <g opacity={o} transform={`translate(${(1 - o) * 26} 0)`}>
      <rect x={x} y={40} width={w} height={H - 80} rx={26} fill={f(tono)} stroke={c(tono)} strokeWidth={3} />
      <rect x={x} y={40} width={12} height={H - 80} rx={6} fill={c(tono)} />
      <Multi x={x + 36} y={96 + ((lt - 1) * 50) / 2} t={nota.t} n={nt} s={42} w={650} c={c(tono)} fam={DISPLAY} />
      {nota.d && <Multi x={x + 36} y={96 + lt * 50 + 34 + ((renglones(nota.d, nd).length - 1) * 35) / 2} t={nota.d} n={nd} s={27} w={520} c={tinta} lh={1.3} />}
    </g>
  );
}

function AbdomenEsc({ e, i, t }: { e: EscenaAbdomen; i: number; t: number }) {
  const p = e.pasos[i];
  const luz: Partial<Record<Region, Tono>> = {};
  p.regiones?.forEach((r) => (luz[r] = p.tono));
  const sc = (H - 30) / ABD_H;
  return (
    <g>
      <g transform={`translate(${(500 - ABD_W * sc) / 2} 15) scale(${sc})`}>
        <AbdomenFig luz={luz} puntos={(p.puntos ?? []).map((q) => ({ p: q, tone: p.tono }))} ruta={p.ruta} rutaTone={p.tono} t={t} idp={`esc-${e.id}-${i}`} />
      </g>
      <NotaLado nota={p.nota} tono={p.tono} t={t} />
    </g>
  );
}

function OrganosEsc({ e, i, t }: { e: EscenaOrganos; i: number; t: number }) {
  const p = e.pasos[i];
  const luz: Partial<Record<Organo, Tono>> = {};
  p.organos.forEach((o) => (luz[o] = p.tono));
  const sc = (H - 30) / TR_H;
  return (
    <g>
      <g transform={`translate(${(500 - TR_W * sc) / 2} 15) scale(${sc})`}>
        <TractoFig luz={luz} marca={p.marca ? { o: p.marca, tone: 'red' } : undefined} treitz={e.treitz} t={t} />
      </g>
      <NotaLado nota={p.nota} tono={p.tono} t={t} />
    </g>
  );
}

function BiliarEsc({ e, i, t }: { e: EscenaBiliar; i: number; t: number }) {
  const p = e.pasos[i];
  const luz: Partial<Record<ViaBiliar, Tono>> = {};
  p.luz.forEach((o) => (luz[o] = p.tono));
  const sc = (H - 40) / BIL_H;
  return (
    <g>
      <g transform={`translate(${(500 - BIL_W * sc) / 2} 20) scale(${sc})`}>
        <BiliarFig luz={luz} calculo={p.calculo} tumor={p.tumor} dilata={p.dilata} t={t} />
      </g>
      <NotaLado nota={p.nota} tono={p.tono} t={t} />
    </g>
  );
}

export function Lienzo({ e, i, t, titulo = false }: { e: Escena; i: number; t: number; titulo?: boolean }) {
  const k = Math.max(0, Math.min(i, e.pasos.length - 1));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`${e.titulo}: ${e.pasos[k].di}`} style={{ display: 'block', fontFamily: FONT }}>
      <rect width={W} height={H} rx={titulo ? 0 : 22} fill={fondo} />
      {e.tipo === 'cuadro' && <Cuadro e={e} i={k} t={t} />}
      {e.tipo === 'lista' && <Lista e={e} i={k} t={t} />}
      {e.tipo === 'tubo' && <Tubo e={e} i={k} t={t} />}
      {e.tipo === 'flujo' && <Flujo e={e} i={k} t={t} />}
      {e.tipo === 'paneles' && <Paneles e={e} i={k} t={t} />}
      {e.tipo === 'abdomen' && <AbdomenEsc e={e} i={k} t={t} />}
      {e.tipo === 'organos' && <OrganosEsc e={e} i={k} t={t} />}
      {e.tipo === 'biliar' && <BiliarEsc e={e} i={k} t={t} />}
    </svg>
  );
}
