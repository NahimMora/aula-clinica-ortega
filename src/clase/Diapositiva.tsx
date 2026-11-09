// Una diapositiva, dibujada igual en la web y en el video. No usa router ni import.meta:
// Remotion la importa directamente.
import { createContext, Fragment, useContext, type ComponentType, type CSSProperties, type ReactNode } from 'react';
import type { BloqueDiapo, Diapositiva as D, Etapa, NodoArbol } from './tipos';
import { Ico } from './iconos';
import { FIGURAS } from './figuras';

/** Resuelve rutas de media/… según quien dibuja (Vite o Remotion). */
export const AssetCtx = createContext<(p: string) => string>((p) => p);

const TOKEN = /(\*\*[^*]+\*\*|==[^=]+==|\*[^*\s][^*]*\*)/g;
export function Txt({ text }: { text: string }) {
  const piezas = text.split(TOKEN);
  return (
    <>
      {piezas.map((p, i) => {
        if (!p) return null;
        if (p.startsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>;
        if (p.startsWith('==')) return <mark key={i}>{p.slice(2, -2)}</mark>;
        if (p.startsWith('*') && p.endsWith('*') && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

export const ETAPAS: { k: Etapa; label: string }[] = [
  { k: 'normal', label: 'Normal' },
  { k: 'alteracion', label: 'Alteración' },
  { k: 'mecanismo', label: 'Mecanismo' },
  { k: 'signo', label: 'Síntoma o signo' },
];

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export interface Reloj {
  /** Segundos desde que empezó la diapositiva: anima lo que se mueve siempre. */
  t: number;
  /** Paso alcanzado de la narración. */
  paso: number;
  /** Segundos desde el inicio del paso actual. */
  dt: number;
}

const DUR = 0.42;

function Revela({ v, children, as = 'div', className, style }: { v: number; children: ReactNode; as?: 'div' | 'li' | 'tr'; className?: string; style?: CSSProperties }) {
  const E = as;
  return (
    <E className={className} style={{ ...style, opacity: v, transform: v < 1 ? `translateY(${(1 - v) * 10}px)` : undefined }}>
      {children}
    </E>
  );
}

function Arbol({ n, nivel = 0 }: { n: NodoArbol; nivel?: number }) {
  return (
    <div className={`sl-arbol__n sl-arbol__n--${nivel}`}>
      <div className={`sl-arbol__c tone-${n.tono ?? 'lilac'}`}>
        <span className="sl-arbol__t">
          <Txt text={n.t} />
          {n.examen && <span className="sl-ex-mini">❗</span>}
        </span>
        {n.d && (
          <span className="sl-arbol__d">
            <Txt text={n.d} />
          </span>
        )}
      </div>
      {n.hijos && (
        <div className="sl-arbol__h">
          {n.hijos.map((h, i) => (
            <Arbol key={i} n={h} nivel={nivel + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function Bloque({ b, ap, max, resolver }: { b: BloqueDiapo; ap: (n: number) => number; max: number; resolver: (p: string) => string }) {
  const en = Math.min(b.en ?? 0, max);
  const ver = (k = 0) => ap(Math.min(en + k, max));
  switch (b.t) {
    case 'texto':
      return (
        <Revela v={ver()} className="sl-texto">
          <Txt text={b.text} />
        </Revela>
      );
    case 'clave':
      return (
        <Revela v={ver()} className={`sl-clave tone-${b.tono ?? 'rose'}`}>
          <Txt text={b.text} />
        </Revela>
      );
    case 'lista':
      return (
        <ul className="sl-lista">
          {b.items.map((it, i) => (
            <Revela key={i} as="li" v={ver(i)}>
              <Txt text={it} />
            </Revela>
          ))}
        </ul>
      );
    case 'def':
      return (
        <Revela v={ver()} className={`sl-def tone-${b.tono ?? 'lilac'}`}>
          <span className="sl-def__k">{b.term}</span>
          <span>
            <Txt text={b.text} />
          </span>
        </Revela>
      );
    case 'cuadro':
      return (
        <table className={`sl-cuadro ${b.compacto ? 'is-compacto' : ''}`} style={{ opacity: ver() > 0 ? 1 : 0 }}>
          <thead>
            <tr>
              {b.head.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.filas.map((f, i) => (
              <Revela key={i} as="tr" v={ver(i)}>
                {f.map((c, j) =>
                  j === 0 ? (
                    <th key={j} scope="row">
                      <Txt text={c} />
                    </th>
                  ) : (
                    <td key={j} data-l={b.head[j]}>
                      <Txt text={c} />
                    </td>
                  ),
                )}
              </Revela>
            ))}
          </tbody>
        </table>
      );
    case 'comparar':
      return (
        <div className="sl-comparar" style={{ gridTemplateColumns: `repeat(${b.cols.length}, minmax(0, 1fr))` }}>
          {b.cols.map((c, i) => (
            <Revela key={i} v={ver(i)} className={`sl-comparar__c tone-${c.tono}`}>
              <h4>{c.titulo}</h4>
              <ul>
                {c.items.map((it, j) => (
                  <li key={j}>
                    <Txt text={it} />
                  </li>
                ))}
              </ul>
            </Revela>
          ))}
        </div>
      );
    case 'cadena':
      return (
        <ol className="sl-cadena">
          {b.pasos.map((p, i) => (
            <Revela key={i} as="li" v={ver(i)} className={`sl-cadena__p sl-cadena__p--${p.k}`}>
              <span className="sl-cadena__k">{ETAPAS.find((e) => e.k === p.k)?.label}</span>
              <span>
                <Txt text={p.text} />
              </span>
            </Revela>
          ))}
        </ol>
      );
    case 'secuencia':
      return (
        <div className={`sl-secuencia ${b.flechas ? 'con-flechas' : ''}`}>
          {b.items.map((it, i) => (
            <Revela key={i} v={ver(i)} className={`sl-secuencia__i tone-${it.tono ?? 'rose'}`}>
              <Ico n={it.ico} />
              <strong>{it.t}</strong>
              {it.d && (
                <span>
                  <Txt text={it.d} />
                </span>
              )}
            </Revela>
          ))}
        </div>
      );
    case 'arbol':
      return (
        <Revela v={ver()} className="sl-arbol">
          <Arbol n={b.raiz} />
        </Revela>
      );
    case 'foto':
      return (
        <Revela v={ver()} className={`sl-foto ${b.claro ? 'is-claro' : ''}`}>
          <img src={resolver(b.src)} alt={b.alt} />
          {b.pie && (
            <p>
              <Txt text={b.pie} />
            </p>
          )}
          <small>{b.credito}</small>
        </Revela>
      );
    case 'fotos':
      return (
        <div className="sl-fotos" style={{ gridTemplateColumns: `repeat(${b.items.length}, minmax(0, 1fr))` }}>
          {b.items.map((f, i) => (
            <Revela key={i} v={ver(i)} className="sl-foto">
              <img src={resolver(f.src)} alt={f.alt} />
              {f.pie && (
                <p>
                  <Txt text={f.pie} />
                </p>
              )}
              <small>{f.credito}</small>
            </Revela>
          ))}
        </div>
      );
    case 'prof':
      return (
        <Revela v={ver()} className="sl-prof">
          <Txt text={b.text} />
        </Revela>
      );
  }
}

export interface PropsDiapo {
  d: D;
  reloj: Reloj;
  /** true cuando la dibuja Remotion. */
  video?: boolean;
  seccion?: string;
}

export function Diapositiva({ d, reloj, video = false, seccion }: PropsDiapo) {
  const resolver = useContext(AssetCtx);
  const { paso, dt, t } = reloj;
  const max = Math.max(0, d.voz.length - 1);
  const ap = (n: number) => (paso > n ? 1 : paso < n ? 0 : clamp01(dt / DUR));
  const Fig = d.fig ? (FIGURAS[d.fig.f] as ComponentType<Record<string, unknown>>) : null;
  const bloques = d.bloques.filter((b) => !(video && b.soloWeb));
  return (
    <section className={`sl ${Fig ? `sl--fig sl--${d.anchoFig ?? 'media'}` : 'sl--solo'} ${d.amplio ? 'sl--amplio' : ''} ${video ? 'sl--video' : ''}`} aria-label={d.titulo}>
      <header className="sl__cab">
        {seccion && <span className="sl__kicker">{seccion}</span>}
        <h3>{d.titulo}</h3>
        {d.etapas && (
          <ol className="sl__etapas" aria-label="Secuencia del mecanismo">
            {ETAPAS.map((e) => (
              <li key={e.k} className={d.etapas!.includes(e.k) ? `is-on is-${e.k}` : ''}>
                {e.label}
              </li>
            ))}
          </ol>
        )}
      </header>
      <div className="sl__cuerpo">
        {Fig && (
          <div className="sl__fig">
            <Fig {...d.fig} t={t} paso={paso} dt={dt} video={video} max={max} />
          </div>
        )}
        <div className="sl__txt">
          {bloques.map((b, i) => (
            <Bloque key={i} b={b} ap={ap} max={max} resolver={resolver} />
          ))}
        </div>
      </div>
      {d.examen && (
        <aside className="sl__examen">
          <span className="sl__examen-tag">❗ {d.examen.origen === 'ortega' ? 'PREGUNTA DE EXAMEN — Dr. Ortega' : 'PREGUNTERO DE EXAMEN'}</span>
          <span className="sl__examen-txt">
            <Txt text={d.examen.texto} />
            {d.examen.cita && <q>{d.examen.cita}</q>}
            {d.examen.ref?.t && <small>min {d.examen.ref.t}</small>}
          </span>
        </aside>
      )}
    </section>
  );
}
