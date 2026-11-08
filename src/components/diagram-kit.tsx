import { useState, type ReactNode } from 'react';
import type { Tone } from '@/types';
import { Rich } from './Rich';

/** Paleta en hex para SVG (los atributos de presentación no admiten var()). */
export const PAL: Record<Tone | 'ink' | 'gray', { fill: string; stroke: string; ink: string }> = {
  rose: { fill: '#fbe3ea', stroke: '#e48fa8', ink: '#933a58' },
  lilac: { fill: '#ece4f9', stroke: '#a98fdb', ink: '#5b4394' },
  sky: { fill: '#dfedf9', stroke: '#7fb0dc', ink: '#2e5f88' },
  mint: { fill: '#dbf0e6', stroke: '#5fb592', ink: '#2b6d54' },
  peach: { fill: '#ffe7d4', stroke: '#e9a46d', ink: '#96572a' },
  ink: { fill: '#f4eef0', stroke: '#85798c', ink: '#2b2331' },
  gray: { fill: '#f6f1ee', stroke: '#d9ccc4', ink: '#554a5e' },
};

/* ───────── Algoritmo en árbol (HTML: el texto ajusta y en móvil pasa a lista sangrada) ───────── */

export interface FlowNode {
  label: string;
  note?: string;
  tone?: Tone | 'ink';
  edge?: string;
  star?: boolean;
  children?: FlowNode[];
}

export function Flow({ root, caption }: { root: FlowNode; caption?: string }) {
  return (
    <div className="flow" role="group" aria-label={caption ?? 'Algoritmo'}>
      <ul className="flow__tree">
        <FlowItem n={root} />
      </ul>
    </div>
  );
}

function FlowItem({ n }: { n: FlowNode }) {
  // Si todos los hijos son hojas, se apilan en vertical: el árbol queda angosto y legible.
  const stack = Boolean(n.children && n.children.length > 1 && n.children.every((c) => !c.children?.length));
  return (
    <li>
      <FlowBox n={n} />
      {n.children && n.children.length > 0 && (
        <ul className={stack ? 'flow__stack' : undefined}>
          {n.children.map((c, i) =>
            stack ? (
              <li key={i} className="flow__stack-item">
                <FlowBox n={c} />
              </li>
            ) : (
              <FlowItem key={i} n={c} />
            ),
          )}
        </ul>
      )}
    </li>
  );
}

function FlowBox({ n }: { n: FlowNode }) {
  return (
    <div className={`flow__node tone-${n.tone ?? 'ink'} ${n.star ? 'is-star' : ''}`}>
      {n.star && (
        <span className="flow__star" title="Tema que el profesor marca como de examen">
          ★
        </span>
      )}
      {n.edge && <span className="flow__edge">{n.edge}</span>}
      <span className="flow__label">
        <Rich text={n.label} />
      </span>
      {n.note && (
        <span className="flow__note">
          <Rich text={n.note} />
        </span>
      )}
    </div>
  );
}

/* ───────── Anillo de proporciones ───────── */

export function Donut({ parts, size = 170, center }: { parts: { label: string; value: number; tone: Tone }[]; size?: number; center?: ReactNode }) {
  const total = parts.reduce((s, p) => s + p.value, 0);
  const r = 60;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="donut">
      <svg viewBox="0 0 160 160" width={size} height={size} role="img" aria-label={parts.map((p) => `${p.label} ${Math.round((p.value / total) * 100)}%`).join(', ')}>
        <circle cx="80" cy="80" r={r} fill="none" stroke="#f1e8e3" strokeWidth="22" />
        {parts.map((p, i) => {
          const len = (p.value / total) * c;
          const el = (
            <circle
              key={i}
              cx="80"
              cy="80"
              r={r}
              fill="none"
              stroke={PAL[p.tone].stroke}
              strokeWidth="22"
              strokeDasharray={`${len - 2} ${c - len + 2}`}
              strokeDashoffset={-acc}
              transform="rotate(-90 80 80)"
            />
          );
          acc += len;
          return el;
        })}
        {center && (
          <foreignObject x="35" y="55" width="90" height="50">
            <div className="donut__center">{center}</div>
          </foreignObject>
        )}
      </svg>
      <ul className="donut__legend">
        {parts.map((p, i) => (
          <li key={i}>
            <span className="donut__sw" style={{ background: PAL[p.tone].stroke }} />
            <strong>{Math.round((p.value / total) * 100)}%</strong> {p.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── Selector de opciones para diagramas interactivos ───────── */

export function useChoice<T extends string>(initial: T) {
  return useState<T>(initial);
}

export function ChoiceBar<T extends string>({ options, value, onChange, label }: { options: { id: T; label: string; tone?: Tone }[]; value: T; onChange: (v: T) => void; label: string }) {
  return (
    <div className="dchoice" role="tablist" aria-label={label}>
      {options.map((o) => (
        <button key={o.id} role="tab" aria-selected={value === o.id} className={`dchoice__btn tone-${o.tone ?? 'lilac'} ${value === o.id ? 'is-on' : ''}`} onClick={() => onChange(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
