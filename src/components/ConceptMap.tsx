import { useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { Link } from 'react-router-dom';
import type { ClosingData, ConceptMapData } from '@/types';
import type { MapaConceptual, NodoMapa } from '@/clase/tipos';
import { Rich } from './Rich';
import { Icon } from './Icon';

type PathSpec = { d: string; tone: string };

const hcurve = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = Math.max(24, (x2 - x1) / 2);
  return `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;
};
const vcurve = (x1: number, y1: number, x2: number, y2: number) => {
  const dy = Math.max(18, (y2 - y1) / 2);
  return `M${x1},${y1} C${x1},${y1 + dy} ${x2},${y2 - dy} ${x2},${y2}`;
};

/** Calcula los conectores entre nodos marcados con data-node a partir de su posición real en pantalla. */
function useConnectors(ref: RefObject<HTMLDivElement>, deps: unknown[], build: (q: (sel: string) => DOMRect[], box: DOMRect) => PathSpec[]) {
  const [paths, setPaths] = useState<PathSpec[]>([]);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const compute = () => {
      if (window.innerWidth < 860) {
        setPaths([]);
        return;
      }
      const box = el.getBoundingClientRect();
      const q = (sel: string) => Array.from(el.querySelectorAll<HTMLElement>(sel)).map((n) => n.getBoundingClientRect());
      setPaths(build(q, box));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    window.addEventListener('resize', compute);
    const t = window.setTimeout(compute, 400); // tras cargar fuentes
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', compute);
      window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return paths;
}

function Wires({ paths, id }: { paths: PathSpec[]; id: string }) {
  return (
    <svg className="wires" aria-hidden="true">
      <defs>
        <marker id={`arrow-${id}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
        </marker>
      </defs>
      {paths.map((p, i) => (
        <path key={i} d={p.d} className={`wire wire--${p.tone}`} markerEnd={`url(#arrow-${id})`} />
      ))}
    </svg>
  );
}

export function ConceptMap({ data, onBranch }: { data: ConceptMapData; onBranch?: (id: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const paths = useConnectors(ref, [data], (q, box) => {
    const hub = q('[data-node="hub"]')[0];
    if (!hub) return [];
    const rel = (r: DOMRect) => ({ x: r.left - box.left, y: r.top - box.top, w: r.width, h: r.height });
    const H = rel(hub);
    const out: PathSpec[] = [];
    q('[data-node="pre"]').forEach((r) => {
      const a = rel(r);
      out.push({ d: hcurve(a.x + a.w, a.y + a.h / 2, H.x - 4, H.y + H.h / 2), tone: 'ink' });
    });
    q('[data-node="out"]').forEach((r) => {
      const a = rel(r);
      out.push({ d: hcurve(H.x + H.w, H.y + H.h / 2, a.x - 4, a.y + a.h / 2), tone: 'ink' });
    });
    const tones = Array.from(ref.current?.querySelectorAll<HTMLElement>('[data-node="branch"]') ?? []).map((n) => n.dataset.tone ?? 'lilac');
    q('[data-node="branch"]').forEach((r, i) => {
      const a = rel(r);
      out.push({ d: vcurve(H.x + H.w / 2, H.y + H.h, a.x + a.w / 2, a.y - 4), tone: tones[i] });
    });
    return out;
  });

  return (
    <div className="cmap" ref={ref}>
      <Wires paths={paths} id="cmap" />
      <div className="cmap__col cmap__pre">
        <div className="cmap__label">
          <Icon name="layers" size={16} /> Necesitás saber
        </div>
        {data.prereqs.map((p, i) => (
          <div key={i} className="cmap__node cmap__node--pre" data-node="pre">
            <div className="cmap__node-title">{p.chapterId ? <Link to={`/capitulo/${p.chapterId}`}>{p.label}</Link> : p.label}</div>
            {p.detail && (
              <div className="cmap__node-detail">
                <Rich text={p.detail} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="cmap__hub" data-node="hub">
        <div className="cmap__hub-kicker">Vamos a estudiar</div>
        <div className="cmap__hub-title">{data.center}</div>
        <div className="cmap__hub-why">
          <span className="cmap__why-label">¿Por qué existe este tema?</span>
          <Rich text={data.why} />
        </div>
      </div>
      <div className="cmap__col cmap__out">
        <div className="cmap__label">
          <Icon name="target" size={16} /> Al terminar vas a poder
        </div>
        {data.outcomes.map((o, i) => (
          <div key={i} className="cmap__node cmap__node--out" data-node="out">
            <Icon name="check" size={16} />
            <span>
              <Rich text={o} />
            </span>
          </div>
        ))}
      </div>
      <div className="cmap__branches" style={{ gridTemplateColumns: `repeat(${Math.min(data.branches.length, 4)}, minmax(0, 1fr))` }}>
        {data.branches.map((b) => (
          <button
            key={b.id}
            type="button"
            className={`cmap__branch tone-${b.tone} ${active === b.id ? 'is-active' : ''}`}
            data-node="branch"
            data-tone={b.tone}
            onMouseEnter={() => setActive(b.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(b.id)}
            onBlur={() => setActive(null)}
            onClick={() => onBranch?.(b.id)}
          >
            <span className="cmap__branch-title">{b.label}</span>
            <ul>
              {b.items.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
            {onBranch && (
              <span className="cmap__branch-go">
                Ir a la explicación <Icon name="arrowRight" size={14} />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function NodoArbolMapa({ n, nivel, padre }: { n: NodoMapa; nivel: number; padre?: string }) {
  const caja = (
    <div className={`mtree__nodo mtree__nodo--${Math.min(nivel, 2)} tone-${n.tone ?? 'lilac'}`} data-mid={n.id} data-mpadre={padre} data-tone={n.tone ?? 'lilac'}>
      <span className="mtree__t">
        {n.n && <span className="mtree__n">{n.n}</span>}
        {n.label}
        {n.examen && (
          <span className="mtree__ex" title="Pregunta de examen">
            ❗
          </span>
        )}
      </span>
      {n.nota && (
        <span className="mtree__d">
          <Rich text={n.nota} />
        </span>
      )}
    </div>
  );
  if (!n.hijos?.length) return caja;
  return (
    <div className="mtree__fila">
      {caja}
      <div className="mtree__hijos">
        {n.hijos.map((h) => (
          <NodoArbolMapa key={h.id} n={h} nivel={nivel + 1} padre={n.id} />
        ))}
      </div>
    </div>
  );
}

/** Mapa inicial: mismo marco que ConceptMap, con la jerarquía médica del tema en lugar de ramas de índice. */
export function MapaArbol({ data, arbol }: { data: ConceptMapData; arbol: MapaConceptual }) {
  const ref = useRef<HTMLDivElement>(null);
  const paths = useConnectors(ref, [data, arbol], (q, box) => {
    const el = ref.current;
    if (!el) return [];
    const rel = (r: DOMRect) => ({ x: r.left - box.left, y: r.top - box.top, w: r.width, h: r.height });
    const out: PathSpec[] = [];
    const hub = q('[data-node="hub"]')[0];
    if (hub) {
      const H = rel(hub);
      q('[data-node="pre"]').forEach((r) => {
        const a = rel(r);
        out.push({ d: hcurve(a.x + a.w, a.y + a.h / 2, H.x - 4, H.y + H.h / 2), tone: 'ink' });
      });
      q('[data-node="out"]').forEach((r) => {
        const a = rel(r);
        out.push({ d: hcurve(H.x + H.w, H.y + H.h / 2, a.x - 4, a.y + a.h / 2), tone: 'ink' });
      });
    }
    const nodos = Array.from(el.querySelectorAll<HTMLElement>('[data-mid]'));
    const porId = new Map(nodos.map((n) => [n.dataset.mid!, n]));
    nodos.forEach((n) => {
      const pid = n.dataset.mpadre;
      if (!pid) return;
      const p = porId.get(pid);
      if (!p) return;
      const a = rel(p.getBoundingClientRect());
      const b = rel(n.getBoundingClientRect());
      out.push({ d: hcurve(a.x + a.w, a.y + a.h / 2, b.x - 4, b.y + b.h / 2), tone: n.dataset.tone ?? 'lilac' });
    });
    return out;
  });
  return (
    <div className="cmap cmap--arbol" ref={ref}>
      <Wires paths={paths} id="mtree" />
      <div className="cmap__col cmap__pre">
        <div className="cmap__label">
          <Icon name="layers" size={16} /> Necesitás saber
        </div>
        {data.prereqs.map((p, i) => (
          <div key={i} className="cmap__node cmap__node--pre" data-node="pre">
            <div className="cmap__node-title">{p.chapterId ? <Link to={`/capitulo/${p.chapterId}`}>{p.label}</Link> : p.label}</div>
            {p.detail && (
              <div className="cmap__node-detail">
                <Rich text={p.detail} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="cmap__hub" data-node="hub">
        <div className="cmap__hub-title">{data.center}</div>
        <div className="cmap__hub-why">
          <Rich text={data.why} />
        </div>
      </div>
      <div className="cmap__col cmap__out">
        <div className="cmap__label">
          <Icon name="target" size={16} /> Al terminar vas a poder
        </div>
        {data.outcomes.map((o, i) => (
          <div key={i} className="cmap__node cmap__node--out" data-node="out">
            <Icon name="check" size={16} />
            <span>
              <Rich text={o} />
            </span>
          </div>
        ))}
      </div>
      <div className="mtree">
        {arbol.raices.map((r) => (
          <NodoArbolMapa key={r.id} n={r} nivel={0} />
        ))}
        {arbol.nexos && (
          <ul className="mtree__nexos">
            {arbol.nexos.map((x, i) => (
              <li key={i}>
                <Rich text={x} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function SummaryMap({ map }: { map: ClosingData['map'] }) {
  const ref = useRef<HTMLDivElement>(null);
  const paths = useConnectors(ref, [map], (q, box) => {
    const c = q('[data-node="center"]')[0];
    if (!c) return [];
    const tones = Array.from(ref.current?.querySelectorAll<HTMLElement>('[data-node="leaf"]') ?? []).map((n) => n.dataset.tone ?? 'lilac');
    return q('[data-node="leaf"]').map((r, i) => ({
      d: vcurve(c.left - box.left + c.width / 2, c.bottom - box.top, r.left - box.left + r.width / 2, r.top - box.top - 4),
      tone: tones[i],
    }));
  });
  return (
    <div className="smap" ref={ref}>
      <Wires paths={paths} id="smap" />
      <div className="smap__center" data-node="center">
        {map.center}
      </div>
      <div className="smap__leaves" style={{ gridTemplateColumns: `repeat(${Math.min(map.nodes.length, 4)}, minmax(0, 1fr))` }}>
        {map.nodes.map((n, i) => (
          <div key={i} className={`smap__leaf tone-${n.tone}`} data-node="leaf" data-tone={n.tone}>
            <div className="smap__leaf-title">{n.label}</div>
            <ul>
              {n.items.map((it, j) => (
                <li key={j}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
