/**
 * Kit de animación compartido por los videos (render con Remotion CLI) y por las
 * diapositivas interactivas de la web (@remotion/player, cargado bajo demanda).
 * Usa solo imports relativos para que lo resuelvan tanto Vite como el bundler de Remotion.
 */
import type { CSSProperties, FC, ReactNode } from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';

export const C = {
  bg: '#fcf7f3',
  ink: '#2b2331',
  ink2: '#554a5e',
  ink3: '#85798c',
  line: '#e2d5cd',
  rose: { fill: '#fbe3ea', stroke: '#e48fa8', ink: '#933a58' },
  lilac: { fill: '#ece4f9', stroke: '#a98fdb', ink: '#5b4394' },
  sky: { fill: '#dfedf9', stroke: '#7fb0dc', ink: '#2e5f88' },
  mint: { fill: '#dbf0e6', stroke: '#5fb592', ink: '#2b6d54' },
  peach: { fill: '#ffe7d4', stroke: '#e9a46d', ink: '#96572a' },
  red: '#b8435f',
  gold: '#f6d26b',
};
export type ToneName = 'rose' | 'lilac' | 'sky' | 'mint' | 'peach';
export const DISPLAY = "'Fraunces Variable', Georgia, serif";
export const BODY = "'Inter Variable', 'Segoe UI', sans-serif";

export interface Cue {
  start: number;
  end: number;
  text: string;
}
export interface SceneTiming {
  id: string;
  title: string;
  from: number;
  frames: number;
  audio: string;
  audioFrom: number;
  cues: Cue[];
}
export interface Timing {
  fps: number;
  total: number;
  scenes: SceneTiming[];
}
export interface SceneProps {
  t: SceneTiming;
}
export interface Deck {
  chapterId: string;
  chapterTitle: string;
  timing: Timing;
  scenes: Record<string, FC<SceneProps>>;
}

const EASE = Easing.bezier(0.22, 1, 0.36, 1);

/** Interpola 0→1 (o from→to) entre los frames a y b, con saturación. */
export function ease(frame: number, a: number, b: number, from = 0, to = 1): number {
  if (b <= a) return frame >= a ? to : from;
  return interpolate(frame, [a, b], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE });
}

/** Frame de inicio de la oración i de la narración (con desplazamiento opcional). */
export function cue(t: SceneTiming, i: number, offset = 0): number {
  const c = t.cues[Math.min(i, t.cues.length - 1)];
  return (c ? c.start : Math.round((t.frames * i) / Math.max(1, t.cues.length))) + offset;
}

/** Reparte n momentos entre el inicio de la oración i y el de la siguiente. */
export function spread(t: SceneTiming, i: number, n: number, k: number): number {
  const a = cue(t, i);
  const b = i + 1 < t.cues.length ? cue(t, i + 1) : t.frames - 30;
  return Math.round(a + ((b - a) * k) / Math.max(1, n));
}

export const Appear: FC<{ at: number; dur?: number; dy?: number; dx?: number; scale?: boolean; style?: CSSProperties; children: ReactNode }> = ({ at, dur = 18, dy = 26, dx = 0, scale, style, children }) => {
  const f = useCurrentFrame();
  const p = ease(f, at, at + dur);
  return (
    <div
      style={{
        position: 'absolute',
        opacity: p,
        transform: `translate(${(1 - p) * dx}px, ${(1 - p) * dy}px) ${scale ? `scale(${0.85 + 0.15 * p})` : ''}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Card: FC<{ tone?: ToneName; title?: string; tag?: string; children?: ReactNode; style?: CSSProperties; highlight?: boolean }> = ({ tone = 'lilac', title, tag, children, style, highlight }) => {
  const c = C[tone];
  return (
    <div
      style={{
        background: `linear-gradient(160deg, ${c.fill}, #fff 80%)`,
        border: `3px solid ${highlight ? c.ink : c.stroke}`,
        borderRadius: 28,
        padding: '26px 32px',
        boxShadow: '0 18px 40px -22px rgba(95,60,115,.35)',
        fontFamily: BODY,
        color: C.ink2,
        fontSize: 30,
        lineHeight: 1.35,
        ...style,
      }}
    >
      {tag && <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: c.ink, marginBottom: 6 }}>{tag}</div>}
      {title && <div style={{ fontFamily: DISPLAY, fontWeight: 650, fontSize: 40, color: c.ink, marginBottom: 10, lineHeight: 1.15 }}>{title}</div>}
      {children}
    </div>
  );
};

export const Chip: FC<{ tone?: ToneName; children: ReactNode; style?: CSSProperties; big?: boolean }> = ({ tone = 'lilac', children, style, big }) => {
  const c = C[tone];
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        padding: big ? '16px 30px' : '12px 24px',
        borderRadius: 999,
        background: c.fill,
        border: `3px solid ${c.stroke}`,
        color: c.ink,
        fontFamily: BODY,
        fontWeight: 700,
        fontSize: big ? 36 : 28,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Bullets: FC<{ items: { at: number; text: ReactNode }[]; size?: number }> = ({ items, size = 30 }) => {
  const f = useCurrentFrame();
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 12 }}>
      {items.map((it, i) => {
        const p = ease(f, it.at, it.at + 14);
        return (
          <li key={i} style={{ opacity: p, transform: `translateX(${(1 - p) * 30}px)`, display: 'flex', gap: 14, fontSize: size, lineHeight: 1.3 }}>
            <span style={{ color: C.rose.stroke, fontWeight: 900 }}>•</span>
            <span>{it.text}</span>
          </li>
        );
      })}
    </ul>
  );
};

/** Marco común: fondo, título de la escena, numeración y fundidos. */
export const SceneFrame: FC<{ t: SceneTiming; index: number; count: number; chapterTitle: string; children: ReactNode }> = ({ t, index, count, chapterTitle, children }) => {
  const f = useCurrentFrame();
  const fade = Math.min(ease(f, 0, 12), 1 - ease(f, t.frames - 12, t.frames));
  const head = ease(f, 0, 20);
  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: BODY, color: C.ink, overflow: 'hidden' }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px 600px at 0% 0%, ${C.rose.fill} 0%, transparent 60%), radial-gradient(900px 700px at 100% 100%, ${C.lilac.fill} 0%, transparent 60%), radial-gradient(600px 400px at 100% 0%, ${C.sky.fill} 0%, transparent 60%)`,
        }}
      />
      <AbsoluteFill style={{ opacity: fade }}>
        <div style={{ position: 'absolute', left: 110, top: 64, opacity: head, transform: `translateY(${(1 - head) * -16}px)` }}>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: C.rose.ink }}>
            {chapterTitle} · {index + 1}/{count}
          </div>
          <div style={{ fontFamily: DISPLAY, fontSize: 66, fontWeight: 600, lineHeight: 1.1, marginTop: 6 }}>{t.title}</div>
        </div>
        <div style={{ position: 'absolute', right: 80, bottom: 44, fontSize: 22, color: C.ink3, letterSpacing: 1 }}>Aula Clínica · Semiología I</div>
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Visible solo entre los frames a y b, con fundidos. */
export const Show: FC<{ a: number; b?: number; style?: CSSProperties; children: ReactNode }> = ({ a, b = 1e9, style, children }) => {
  const f = useCurrentFrame();
  const o = Math.min(ease(f, a, a + 14), 1 - ease(f, b - 12, b));
  if (o <= 0) return null;
  return <div style={{ position: 'absolute', opacity: o, transform: `translateY(${(1 - ease(f, a, a + 14)) * 20}px)`, ...style }}>{children}</div>;
};

/** Camino SVG que se dibuja progresivamente. */
export function drawStyle(frame: number, a: number, b: number, length = 1000): CSSProperties {
  const p = ease(frame, a, b);
  return { strokeDasharray: length, strokeDashoffset: length * (1 - p) };
}
