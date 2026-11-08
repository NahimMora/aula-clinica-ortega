// Bloques visuales interactivos de la web. Todo se describe con datos en el capítulo (src/visual/tipos.ts).
import { useMemo, useState, type ReactNode } from 'react';
import { Rich, Refs } from '@/components/Rich';
import { Icon } from '@/components/Icon';
import type { Organo, Region, ViaBiliar, VisualBlock, VTone, FlowNode } from './tipos';
import { ABD_H, ABD_W, AbdomenFig, BIL_H, BIL_W, BiliarFig, BristolGlyph, TR_H, TR_W, TractoFig } from './anatomia';

type B<K extends VisualBlock['t']> = Extract<VisualBlock, { t: K }>;

export function VisualView({ b }: { b: VisualBlock }) {
  switch (b.t) {
    case 'abdomen':
      return <AbdomenBlock b={b} />;
    case 'organos':
      return <OrganosBlock b={b} />;
    case 'biliar':
      return <BiliarBlock b={b} />;
    case 'triad':
      return <Triad b={b} />;
    case 'scale':
      return <Scale b={b} />;
    case 'calc':
      return <Calc b={b} />;
    case 'mnemo':
      return <Mnemo b={b} />;
    case 'timeline':
      return <Timeline b={b} />;
    case 'flow':
      return <FlowTree b={b} />;
    case 'cuadro':
      return <CuadroBlock b={b} />;
  }
}

/* ───────── Explorador: figura + opciones + detalle ───────── */

function Explorer({
  title,
  items,
  caption,
  fig,
  vb,
}: {
  title?: string;
  items: { id: string; t: string; d: string; tone: VTone }[];
  caption?: string;
  fig: (i: number) => ReactNode;
  vb: string;
}) {
  const [i, setI] = useState(0);
  const it = items[i];
  return (
    <figure className="vx">
      {title && <figcaption className="vx__title">{title}</figcaption>}
      <div className="vx__chips" role="tablist" aria-label={title ?? 'Opciones'}>
        {items.map((x, k) => (
          <button key={x.id} role="tab" aria-selected={k === i} className={`vx__chip tone-${x.tone} ${k === i ? 'is-on' : ''}`} onClick={() => setI(k)}>
            {x.t}
          </button>
        ))}
      </div>
      <div className="vx__body">
        <svg className="vx__fig" viewBox={vb} role="img" aria-label={`${it.t}: dibujo esquemático`}>
          {fig(i)}
        </svg>
        <div className={`vx__detail tone-${it.tone}`} key={it.id}>
          <div className="vx__detail-t">{it.t}</div>
          <div className="vx__detail-d">
            <Rich text={it.d} />
          </div>
          <div className="vx__nav">
            <button className="btn btn--ghost btn--sm" disabled={i === 0} onClick={() => setI(i - 1)} aria-label="Anterior">
              <Icon name="chevronLeft" size={15} />
            </button>
            <span>
              {i + 1} / {items.length}
            </span>
            <button className="btn btn--ghost btn--sm" disabled={i === items.length - 1} onClick={() => setI(i + 1)} aria-label="Siguiente">
              <Icon name="chevronRight" size={15} />
            </button>
          </div>
        </div>
      </div>
      {caption && (
        <p className="vx__caption">
          <Rich text={caption} />
        </p>
      )}
    </figure>
  );
}

function AbdomenBlock({ b }: { b: B<'abdomen'> }) {
  return (
    <Explorer
      title={b.title}
      items={b.items}
      caption={b.caption}
      vb={`0 0 ${ABD_W} ${ABD_H}`}
      fig={(i) => {
        const it = b.items[i];
        const luz: Partial<Record<Region, VTone>> = {};
        it.regiones?.forEach((r) => (luz[r] = it.tone));
        return <AbdomenFig key={it.id} luz={luz} puntos={(it.puntos ?? []).map((p) => ({ p, tone: it.tone }))} ruta={it.ruta} rutaTone={it.tone} idp={`abd-${it.id}`} />;
      }}
    />
  );
}

function OrganosBlock({ b }: { b: B<'organos'> }) {
  return (
    <Explorer
      title={b.title}
      items={b.items}
      caption={b.caption}
      vb={`0 0 ${TR_W} ${TR_H}`}
      fig={(i) => {
        const it = b.items[i];
        const luz: Partial<Record<Organo, VTone>> = {};
        it.organos.forEach((o) => (luz[o] = it.tone));
        return <TractoFig luz={luz} marca={it.marca ? { o: it.marca, tone: 'red' } : undefined} treitz={b.treitz} />;
      }}
    />
  );
}

function BiliarBlock({ b }: { b: B<'biliar'> }) {
  return (
    <Explorer
      title={b.title}
      items={b.items}
      caption={b.caption}
      vb={`0 0 ${BIL_W} ${BIL_H}`}
      fig={(i) => {
        const it = b.items[i];
        const luz: Partial<Record<ViaBiliar, VTone>> = {};
        it.luz.forEach((o) => (luz[o] = it.tone));
        return <BiliarFig luz={luz} calculo={it.calculo} tumor={it.tumor} dilata={it.dilata} />;
      }}
    />
  );
}

/* ───────── Tríada / péntada ───────── */

function Triad({ b }: { b: B<'triad'> }) {
  const [plus, setPlus] = useState(false);
  const all = plus && b.plus ? [...b.items, ...b.plus] : b.items;
  const n = all.length;
  const cx = 300;
  const cy = n === 3 ? 182 : 178;
  const R = n === 3 ? 150 : 140;
  const pts = all.map((_, k) => {
    const a = -Math.PI / 2 + (k * 2 * Math.PI) / n;
    return [cx + R * Math.cos(a), cy + R * Math.sin(a)] as [number, number];
  });
  const tone = b.tone;
  return (
    <figure className={`vtriad tone-${tone}`}>
      <figcaption className="vtriad__title">{b.title}</figcaption>
      <svg viewBox={`0 0 600 ${n === 3 ? 350 : 360}`} className="vtriad__svg" role="img" aria-label={`${b.title}: ${all.join(', ')}`}>
        <polygon key={n} points={pts.map((p) => p.join(',')).join(' ')} fill={`var(--v-${tone}-f)`} stroke={`var(--v-${tone})`} strokeWidth={4} strokeLinejoin="round" className="v-draw" pathLength={1} />
        <text x={cx} y={cy + (n === 3 ? 28 : 6)} textAnchor="middle" dominantBaseline="middle" className="vtriad__center" fill={`var(--v-${tone})`} style={{ paintOrder: 'stroke', stroke: 'var(--v-bg)', strokeWidth: 6 }}>
          {b.center}
        </text>
        {all.map((t, k) => {
          const [x, y] = pts[k];
          const extra = k >= b.items.length;
          const ww = Math.min(230, Math.max(110, t.length * 9.5 + 30));
          const lines = t.length > 22 ? [t.slice(0, t.lastIndexOf(' ', 22) > 0 ? t.lastIndexOf(' ', 22) : 22), t.slice(t.lastIndexOf(' ', 22) > 0 ? t.lastIndexOf(' ', 22) + 1 : 22)] : [t];
          const hh = lines.length * 22 + 20;
          const bx = Math.max(6, Math.min(594 - ww, x - ww / 2));
          const by = Math.max(4, Math.min((n === 3 ? 346 : 356) - hh, y - hh / 2));
          return (
            <g key={t} className="v-pop" style={{ animationDelay: `${0.15 + k * 0.18}s` }}>
              <rect x={bx} y={by} width={ww} height={hh} rx={14} fill={extra ? 'var(--v-red-f)' : 'var(--v-card)'} stroke={extra ? 'var(--v-red)' : `var(--v-${tone})`} strokeWidth={3} />
              {lines.map((l, j) => (
                <text key={j} x={bx + ww / 2} y={by + 20 + j * 22 + 1} textAnchor="middle" dominantBaseline="middle" className="vtriad__item" fill={extra ? 'var(--v-red)' : 'var(--v-ink)'}>
                  {l}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
      {b.plus && (
        <button className={`btn btn--sm ${plus ? 'btn--primary' : 'btn--soft'}`} onClick={() => setPlus(!plus)}>
          {plus ? `Volver a la tríada` : b.plusLabel ?? `Agregar ${b.plus.join(' + ')}`}
        </button>
      )}
      {b.note && (
        <p className="vtriad__note">
          <Rich text={b.note} />
        </p>
      )}
      <Refs refs={b.refs} />
    </figure>
  );
}

/* ───────── Escala ───────── */

function Scale({ b }: { b: B<'scale'> }) {
  const [i, setI] = useState<number | null>(null);
  const tones: VTone[] = ['mint', 'sky', 'lilac', 'gold', 'peach', 'rose', 'red'];
  const toneOf = (k: number) => b.items[k].tone ?? tones[Math.round((k / Math.max(1, b.items.length - 1)) * (tones.length - 1))];
  const cur = i === null ? null : b.items[i];
  return (
    <figure className="vscale">
      {b.title && <figcaption className="vx__title">{b.title}</figcaption>}
      <div className="vscale__row" style={{ gridTemplateColumns: `repeat(${b.items.length}, minmax(0, 1fr))` }}>
        {b.items.map((it, k) => (
          <button key={k} className={`vscale__step tone-${toneOf(k)} ${i === k ? 'is-on' : ''}`} onClick={() => setI(i === k ? null : k)} aria-pressed={i === k}>
            <span className="vscale__k">{it.k}</span>
            {it.icon?.startsWith('bristol') && (
              <svg viewBox="0 0 80 50" className="vscale__icon" aria-hidden="true">
                <BristolGlyph n={Number(it.icon.slice(7))} />
              </svg>
            )}
            <span className="vscale__t">{it.t}</span>
          </button>
        ))}
      </div>
      {b.ends && (
        <div className="vscale__ends">
          <span>{b.ends[0]}</span>
          <span>{b.ends[1]}</span>
        </div>
      )}
      <div className={`vscale__detail ${cur ? `tone-${toneOf(i!)}` : ''}`}>
        {cur ? (
          <>
            <strong>
              {cur.k} · {cur.t}
            </strong>{' '}
            {cur.d && <Rich text={cur.d} />}
          </>
        ) : (
          <span className="muted">Tocá un escalón para ver el detalle.</span>
        )}
      </div>
      {b.caption && (
        <p className="vx__caption">
          <Rich text={b.caption} />
        </p>
      )}
    </figure>
  );
}

/* ───────── Calculadora ───────── */

function Calc({ b }: { b: B<'calc'> }) {
  const [sel, setSel] = useState<number[]>(() => b.criterios.map(() => 0));
  const total = sel.reduce((s, k, j) => s + b.criterios[j].ops[k].pts, 0);
  const banda = b.bandas.find((x) => total >= x.min && total <= x.max);
  return (
    <figure className="vcalc">
      <figcaption className="vx__title">
        <Icon name="target" size={16} /> {b.title}
      </figcaption>
      <div className="vcalc__grid">
        {b.criterios.map((c, j) => (
          <div key={c.k} className="vcalc__row">
            <div className="vcalc__k">{c.k}</div>
            <div className="vcalc__ops">
              {c.ops.map((o, k) => (
                <button key={k} className={`vcalc__op ${sel[j] === k ? 'is-on' : ''}`} onClick={() => setSel(sel.map((v, jj) => (jj === j ? k : v)))} aria-pressed={sel[j] === k}>
                  {o.t}
                  <span className="vcalc__pts">{o.pts}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={`vcalc__res tone-${banda?.tone ?? 'lilac'}`}>
        <span className="vcalc__total">{total}</span>
        <div>
          <div className="vcalc__band">{banda?.t ?? '—'}</div>
          {banda?.d && (
            <div className="vcalc__bd">
              <Rich text={banda.d} />
            </div>
          )}
        </div>
      </div>
      <div className="vcalc__bands">
        {b.bandas.map((x) => (
          <span key={x.t} className={`vcalc__chip tone-${x.tone} ${banda === x ? 'is-on' : ''}`}>
            {x.t}: {x.min === x.max ? x.min : `${x.min}–${x.max}`}
          </span>
        ))}
      </div>
      {b.note && (
        <p className="vx__caption">
          <Rich text={b.note} />
        </p>
      )}
    </figure>
  );
}

/* ───────── Mnemotecnia ───────── */

function Mnemo({ b }: { b: B<'mnemo'> }) {
  const [open, setOpen] = useState(false);
  return (
    <figure className={`vmnemo tone-${b.tone ?? 'gold'} ${open ? 'is-open' : ''}`}>
      <button className="vmnemo__word" onClick={() => setOpen(!open)} aria-expanded={open}>
        {b.items.map((it, k) => (
          <span key={k} className="vmnemo__l" style={{ animationDelay: `${k * 0.06}s` }}>
            {it.l}
          </span>
        ))}
        <span className="vmnemo__hint">{open ? 'Ocultar' : 'Tocá para desplegar'}</span>
      </button>
      <ol className="vmnemo__list" hidden={!open}>
        {b.items.map((it, k) => (
          <li key={k} style={{ animationDelay: `${k * 0.07}s` }}>
            <span className="vmnemo__badge">{it.l}</span>
            <span>
              <Rich text={it.t} />
            </span>
          </li>
        ))}
      </ol>
      {b.note && (
        <p className="vmnemo__note">
          <Rich text={b.note} />
        </p>
      )}
      <Refs refs={b.refs} />
    </figure>
  );
}

/* ───────── Línea de tiempo ───────── */

function Timeline({ b }: { b: B<'timeline'> }) {
  const tones: VTone[] = ['sky', 'lilac', 'peach', 'rose', 'mint', 'gold'];
  return (
    <figure className="vtl">
      {b.title && <figcaption className="vx__title">{b.title}</figcaption>}
      <ol className="vtl__list">
        {b.items.map((it, k) => (
          <li key={k} className={`vtl__item tone-${it.tone ?? tones[k % tones.length]}`} style={{ animationDelay: `${k * 0.1}s` }}>
            <span className="vtl__dot" />
            <span className="vtl__k">{it.k}</span>
            <span className="vtl__t">{it.t}</span>
            {it.d && (
              <span className="vtl__d">
                <Rich text={it.d} />
              </span>
            )}
          </li>
        ))}
      </ol>
      {b.caption && (
        <p className="vx__caption">
          <Rich text={b.caption} />
        </p>
      )}
    </figure>
  );
}

/* ───────── Algoritmo en árbol ───────── */

function FlowTree({ b }: { b: B<'flow'> }) {
  return (
    <figure className="flow" role="group" aria-label="Algoritmo">
      <ul className="flow__tree">
        <FlowItem n={b.root} />
      </ul>
      {b.caption && (
        <p className="vx__caption">
          <Rich text={b.caption} />
        </p>
      )}
    </figure>
  );
}

function FlowItem({ n }: { n: FlowNode }) {
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

/* ───────── Cuadro comparativo con autoevaluación ───────── */

function CuadroBlock({ b }: { b: B<'cuadro'> }) {
  const [tapar, setTapar] = useState(false);
  const [vistas, setVistas] = useState<Set<string>>(new Set());
  const cols = useMemo(() => `minmax(96px, 0.8fr) repeat(${b.cols.length}, minmax(0, 1.4fr))`, [b.cols.length]);
  const toggle = () => {
    setTapar(!tapar);
    setVistas(new Set());
  };
  return (
    <figure className="vcuadro">
      <div className="vcuadro__top">
        {b.title && <figcaption className="vx__title">{b.title}</figcaption>}
        <button className={`btn btn--sm ${tapar ? 'btn--primary' : 'btn--soft'}`} onClick={toggle} aria-pressed={tapar}>
          <Icon name={tapar ? 'eye' : 'eyeOff'} size={15} /> {tapar ? 'Ver todo' : 'Tapar respuestas'}
        </button>
      </div>
      <div className="vcuadro__grid" style={{ gridTemplateColumns: cols }}>
        <div className="vcuadro__corner" />
        {b.cols.map((c) => (
          <div key={c.t} className={`vcuadro__head tone-${c.tone}`}>
            {c.t}
          </div>
        ))}
        {b.rows.map((r, i) => (
          <Row key={i} r={r} i={i} cols={b.cols} tapar={tapar} vistas={vistas} setVistas={setVistas} />
        ))}
      </div>
      {tapar && <p className="vx__caption">Decí la respuesta en voz alta y tocá cada casillero para comprobar.</p>}
      {b.caption && (
        <p className="vx__caption">
          <Rich text={b.caption} />
        </p>
      )}
      <Refs refs={b.refs} />
    </figure>
  );
}

function Row({ r, i, cols, tapar, vistas, setVistas }: { r: { k: string; v: string[] }; i: number; cols: { t: string; tone: VTone }[]; tapar: boolean; vistas: Set<string>; setVistas: (s: Set<string>) => void }) {
  return (
    <>
      <div className="vcuadro__k">{r.k}</div>
      {r.v.map((v, j) => {
        const key = `${i}-${j}`;
        const oculto = tapar && !vistas.has(key);
        return (
          <button
            key={j}
            className={`vcuadro__cell tone-${cols[j]?.tone ?? 'lilac'} ${oculto ? 'is-hidden' : ''}`}
            onClick={() => {
              if (!tapar) return;
              const n = new Set(vistas);
              n.has(key) ? n.delete(key) : n.add(key);
              setVistas(n);
            }}
            tabIndex={tapar ? 0 : -1}
            aria-label={oculto ? `Mostrar ${r.k} — ${cols[j]?.t}` : undefined}
          >
            <span className="vcuadro__label">{cols[j]?.t}</span>
            <span className="vcuadro__v">
              <Rich text={v} />
            </span>
          </button>
        );
      })}
    </>
  );
}
