import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import citas from '@content/examen/citas.json';
import { ORALES, type PreguntaOral } from '@content/examen/orales';
import { Icon } from '@/components/Icon';
import { Rich, refText } from '@/components/Rich';
import { norm } from '@/lib/text';
import type { SourceRef } from '@/types';
import '@/styles/preguntas.css';

type Nodo = { t: string; d?: string; hijos?: Nodo[] };
/** Respuesta compacta generada desde la diapositiva, el desarrollo o la maniobra (scripts/build-preguntas.mjs). */
type Resp =
  | { t: 'p'; text: string; clave?: boolean }
  | { t: 'ul'; items: string[]; ol?: boolean }
  | { t: 'def'; term: string; text: string }
  | { t: 'tabla'; head: string[]; filas: string[][] }
  | { t: 'cols'; cols: { titulo: string; items: string[] }[] }
  | { t: 'cadena'; pasos: string[] }
  | { t: 'arbol'; nodos: Nodo[] };

interface Item {
  id: string;
  origen: 'ortega' | 'preguntero';
  texto: string;
  cita?: string;
  nota?: string;
  ref?: SourceRef;
  link: string;
  desarrollo?: boolean;
  maniobra?: boolean;
  resp: Resp[];
}
interface Capitulo {
  id: string;
  title: string;
  items: Item[];
}
interface Sistema {
  id: string;
  title: string;
  tone: string;
  capitulos: Capitulo[];
}

const SISTEMAS = (citas as unknown as { sistemas: Sistema[] }).sistemas;
const ICONO: Record<string, string> = { digestivo: 'stomach', renal: 'kidney', neuro: 'brain', soma: 'bone' };
const CORTO: Record<string, string> = { digestivo: 'Digestivo', renal: 'Renal', neuro: 'Neurología', soma: 'Soma' };
const TONO: Record<string, string> = { digestivo: 'rose', renal: 'sky', neuro: 'lilac', soma: 'peach' };
const fechaCorta = (f: string) => `${f.slice(8, 10)}/${f.slice(5, 7)}`;

/** Preguntas del contenido que ya salieron en un oral: id → fecha corta. */
const TOMADAS = new Map<string, string>(ORALES.flatMap((o) => [...o.teorico, ...o.practico].flatMap((p) => (p.rel ?? []).map((r) => [r, fechaCorta(o.fecha)] as const))));

type Filtro = 'todas' | 'ortega' | 'preguntero';
const TODAS = SISTEMAS.flatMap((s) => s.capitulos.flatMap((c) => c.items));
const PESTANAS = [
  ...ORALES.map((o) => ({ id: o.id, label: `Oral ${fechaCorta(o.fecha)}`, icono: 'target', tono: 'gold', n: o.teorico.length + o.practico.length })),
  ...SISTEMAS.map((s) => ({ id: s.id, label: CORTO[s.id], icono: ICONO[s.id], tono: TONO[s.id], n: s.capitulos.reduce((a, c) => a + c.items.length, 0) })),
];
const cuenta = (ss: Sistema[]) => ss.reduce((a, s) => a + s.capitulos.reduce((b, c) => b + c.items.length, 0), 0);

export function PreguntasPage() {
  const [params, setParams] = useSearchParams();
  const [filtro, setFiltro] = useState<Filtro>('todas');
  const [q, setQ] = useState('');
  const [abiertas, setAbiertas] = useState(false);
  const sel = PESTANAS.find((p) => p.id === params.get('s'))?.id ?? PESTANAS[0].id;
  const oral = ORALES.find((o) => o.id === sel);
  const sistema = SISTEMAS.find((s) => s.id === sel);
  const tabs = useRef<HTMLDivElement>(null);
  // Al cambiar de pestaña (también desde la columna), si quedaron arriba de la pantalla, volver a ellas.
  useEffect(() => {
    const el = tabs.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: 'start' });
  }, [sel]);

  const nq = norm(q.trim());
  const pasa = (i: Item) => (filtro === 'todas' || i.origen === filtro) && (!nq || norm(`${i.texto} ${i.cita ?? ''} ${i.nota ?? ''}`).includes(nq));
  const filtrar = (s: Sistema): Sistema => ({ ...s, capitulos: s.capitulos.map((c) => ({ ...c, items: c.items.filter(pasa) })).filter((c) => c.items.length) });
  const busqueda = nq ? SISTEMAS.map(filtrar).filter((s) => s.capitulos.length) : null;
  const vista = sistema ? filtrar(sistema) : null;

  return (
    <div className="page preg">
      <header className="preg__head">
        <span className="preg__icono">
          <Icon name="alert" size={26} />
        </span>
        <div>
          <h1>Preguntas de examen</h1>
          <p className="preg__sub">
            Lo que el Dr. Ortega avisó en clase que toma, con su <strong>frase textual</strong>, y las del preguntero de la cátedra. Tocá una pregunta para ver la respuesta acá mismo.
          </p>
          <p className="preg__cuenta">
            <strong>{TODAS.length}</strong> preguntas · <strong>{TODAS.filter((i) => i.origen === 'ortega').length}</strong> dichas por Ortega · <strong>{TODAS.filter((i) => i.origen === 'preguntero').length}</strong> del preguntero
          </p>
        </div>
      </header>

      <div className="preg__tabs" role="tablist" aria-label="Sistema" ref={tabs}>
        {PESTANAS.map((p) => {
          const on = sel === p.id && !busqueda;
          return (
            <button
              key={p.id}
              role="tab"
              aria-selected={on}
              className={`preg__tab tone-${p.tono} ${on ? 'is-on' : ''}`}
              onClick={() => {
                setQ('');
                setParams({ s: p.id }, { replace: true });
              }}
            >
              <Icon name={p.icono} size={16} /> {p.label} <span className="preg__tab-n">{p.n}</span>
            </button>
          );
        })}
      </div>

      <div className="preg__filtros">
        <label className="preg__buscar">
          <Icon name="search" size={16} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar en todos los sistemas: tríada, Murphy…" aria-label="Buscar preguntas" />
          {q && (
            <button className="preg__limpiar" onClick={() => setQ('')} aria-label="Borrar búsqueda">
              <Icon name="close" size={15} />
            </button>
          )}
        </label>
        {(!oral || busqueda) && (
          <>
            <div className="seg preg__seg" role="group" aria-label="Origen">
              {(
                [
                  ['todas', 'Todas'],
                  ['ortega', 'Ortega'],
                  ['preguntero', 'Preguntero'],
                ] as const
              ).map(([k, l]) => (
                <button key={k} className={filtro === k ? 'is-on' : ''} aria-pressed={filtro === k} onClick={() => setFiltro(k)}>
                  {l}
                </button>
              ))}
            </div>
            <button className={`preg__todas ${abiertas ? 'is-on' : ''}`} aria-pressed={abiertas} onClick={() => setAbiertas((x) => !x)}>
              <Icon name="eye" size={15} /> {abiertas ? 'Ocultar respuestas' : 'Mostrar respuestas'}
            </button>
          </>
        )}
      </div>

      {busqueda ? (
        <section className="preg__panel">
          <p className="preg__n">{busqueda.length ? `${cuenta(busqueda)} preguntas con «${q.trim()}»` : `Nada con «${q.trim()}».`}</p>
          {busqueda.map((s) => (
            <div key={s.id} className={`tone-${TONO[s.id]}`}>
              <h2 className="preg__sis-t">
                <span className="preg__sis-i">
                  <Icon name={ICONO[s.id]} size={17} />
                </span>
                {s.title}
              </h2>
              {s.capitulos.map((c) => (
                <CapituloLista key={c.id} c={c} sistema={s.id} abierto abiertas={abiertas} />
              ))}
            </div>
          ))}
        </section>
      ) : oral ? (
        <section className="preg__panel preg__oral">
          <p className="preg__oral-res">
            <Rich text={oral.resumen} />
          </p>
          <div className="preg__oral-cols">
            <OralLista titulo="Teórico" items={oral.teorico} />
            <OralLista titulo="Práctico (maniquí)" items={oral.practico} />
          </div>
        </section>
      ) : vista ? (
        <section className={`preg__panel tone-${TONO[vista.id]}`}>
          <p className="preg__n">Tocá un capítulo para desplegar sus preguntas.</p>
          {vista.capitulos.map((c) => (
            <CapituloLista key={c.id} c={c} sistema={vista.id} abierto={vista.capitulos.length === 1} abiertas={abiertas} />
          ))}
          {!vista.capitulos.length && <p className="empty">Nada con ese filtro.</p>}
        </section>
      ) : null}
    </div>
  );
}

function CapituloLista({ c, sistema, abierto, abiertas }: { c: Capitulo; sistema: string; abierto?: boolean; abiertas: boolean }) {
  const tomadas = c.items.filter((i) => TOMADAS.has(i.id)).length;
  return (
    <details className="preg__cap" open={abierto || undefined}>
      <summary>
        <Icon name="chevronRight" size={16} />
        <span className="preg__cap-t">{c.title}</span>
        {tomadas > 0 && <span className="preg__tag preg__tag--tomada">{tomadas === 1 ? '1 tomada' : `${tomadas} tomadas`}</span>}
        <span className="preg__cap-n">{c.items.length}</span>
      </summary>
      <ol className="preg__lista">
        {c.items.map((i) => (
          <ItemCita key={`${i.id}-${abiertas}`} i={i} abierta={abiertas} />
        ))}
      </ol>
      <p className="preg__cap-ir">
        {c.id.startsWith('man-') ? <Link to={`/maniobras?sistema=${sistema}`}>Abrir la biblioteca de maniobras</Link> : <Link to={`/capitulo/${c.id}`}>Abrir el capítulo completo</Link>}
      </p>
    </details>
  );
}

function ItemCita({ i, abierta }: { i: Item; abierta: boolean }) {
  const tomada = TOMADAS.get(i.id);
  return (
    <li>
      <details className={`preg__item is-${i.origen}`} open={abierta || undefined}>
        <summary>
          <span className="preg__q">
            <span className={`preg__tag preg__tag--${i.origen}`}>{i.origen === 'ortega' ? 'Ortega' : 'Preguntero'}</span>
            {tomada && <span className="preg__tag preg__tag--tomada">Tomada el {tomada}</span>}
            <span className="preg__texto">
              <Rich text={i.texto} />
            </span>
          </span>
          {i.cita && <span className="preg__cita">«{i.cita}»</span>}
          {i.nota && (
            <span className="preg__cita">
              <Rich text={i.nota} />
            </span>
          )}
          <span className="preg__ver">
            <Icon name="chevronRight" size={14} /> Respuesta
          </span>
        </summary>
        <div className="preg__resp">
          <Respuesta r={i.resp} />
          <div className="preg__meta">
            {i.ref && <span>{refText(i.ref)}</span>}
            <Link to={i.link} className="preg__ir">
              {i.maniobra ? 'Video de la maniobra' : i.desarrollo ? 'Ver el desarrollo' : 'Ver la diapositiva'} <Icon name="chevronRight" size={13} />
            </Link>
          </div>
        </div>
      </details>
    </li>
  );
}

function Respuesta({ r }: { r: Resp[] }) {
  return (
    <>
      {r.map((b, k) => {
        switch (b.t) {
          case 'p':
            return (
              <p key={k} className={b.clave ? 'preg__clave' : undefined}>
                <Rich text={b.text} />
              </p>
            );
          case 'ul': {
            const L = b.ol ? 'ol' : 'ul';
            return (
              <L key={k}>
                {b.items.map((x, j) => (
                  <li key={j}>
                    <Rich text={x} />
                  </li>
                ))}
              </L>
            );
          }
          case 'def':
            return (
              <p key={k} className="preg__def">
                <strong>{b.term}:</strong> <Rich text={b.text} />
              </p>
            );
          case 'tabla':
            return (
              <div key={k} className="preg__tabla">
                <table>
                  <thead>
                    <tr>
                      {b.head.map((h, j) => (
                        <th key={j}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.filas.map((f, j) => (
                      <tr key={j}>
                        {f.map((x, m) => (
                          <td key={m}>
                            <Rich text={x} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'cols':
            return (
              <div key={k} className="preg__cols">
                {b.cols.map((c, j) => (
                  <div key={j}>
                    <strong>{c.titulo}</strong>
                    <ul>
                      {c.items.map((x, m) => (
                        <li key={m}>
                          <Rich text={x} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
          case 'cadena':
            return (
              <ol key={k} className="preg__cadena">
                {b.pasos.map((x, j) => (
                  <li key={j}>
                    <Rich text={x} />
                  </li>
                ))}
              </ol>
            );
          case 'arbol':
            return <Arbol key={k} nodos={b.nodos} />;
          default:
            return null;
        }
      })}
    </>
  );
}

function Arbol({ nodos }: { nodos: Nodo[] }) {
  return (
    <ul className="preg__arbol">
      {nodos.map((n, j) => (
        <li key={j}>
          <Rich text={n.d ? `**${n.t}**: ${n.d}` : `**${n.t}**`} />
          {n.hijos?.length ? <Arbol nodos={n.hijos} /> : null}
        </li>
      ))}
    </ul>
  );
}

function OralLista({ titulo, items }: { titulo: string; items: PreguntaOral[] }) {
  return (
    <div className="preg__oral-col">
      <h3>{titulo}</h3>
      <ol className="preg__oral-lista">
        {items.map((p, n) => (
          <li key={n} className={`tone-${TONO[p.sistema]}`}>
            <details className="preg__item">
              <summary>
                <span className="preg__oral-sis">{CORTO[p.sistema]}</span>
                <span className="preg__texto">
                  <Rich text={p.q} />
                </span>
                {p.nota && (
                  <span className="preg__oral-nota">
                    <Rich text={p.nota} />
                  </span>
                )}
                <span className="preg__ver">
                  <Icon name="chevronRight" size={14} /> Respuesta
                </span>
              </summary>
              <div className="preg__resp">
                <p>
                  <Rich text={p.a} />
                </p>
                <div className="preg__meta">
                  <Link to={p.link} className="preg__ir">
                    {p.link.startsWith('/maniobras') ? 'Video de la maniobra' : 'Ver la diapositiva'} <Icon name="chevronRight" size={13} />
                  </Link>
                </div>
              </div>
            </details>
          </li>
        ))}
      </ol>
    </div>
  );
}
