import { useEffect, useMemo, useState, type MouseEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import citas from '@content/examen/citas.json';
import { ORALES, type PreguntaOral } from '@content/examen/orales';
import { Icon } from '@/components/Icon';
import { Rich, refText } from '@/components/Rich';
import { norm } from '@/lib/text';
import type { SourceRef } from '@/types';
import '@/styles/preguntas.css';

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

const SISTEMAS = (citas as { sistemas: Sistema[] }).sistemas;
const ICONO: Record<string, string> = { digestivo: 'stomach', renal: 'kidney', neuro: 'brain', soma: 'bone' };
const CORTO: Record<string, string> = { digestivo: 'Digestivo', renal: 'Renal', neuro: 'Neurología', soma: 'Soma' };
const TONO: Record<string, string> = { digestivo: 'rose', renal: 'sky', neuro: 'lilac', soma: 'peach' };

/** Preguntas del contenido que ya salieron en un oral: id → fecha corta. */
const TOMADAS = new Map<string, string>(
  ORALES.flatMap((o) => [...o.teorico, ...o.practico].flatMap((p) => (p.rel ?? []).map((r) => [r, o.fecha.slice(8, 10) + '/' + o.fecha.slice(5, 7)] as const))),
);

type Filtro = 'todas' | 'ortega' | 'preguntero';

export function PreguntasPage() {
  const [params] = useSearchParams();
  const [filtro, setFiltro] = useState<Filtro>('todas');
  const [q, setQ] = useState('');
  const ir = params.get('s');

  useEffect(() => {
    if (!ir) return;
    const h = window.setTimeout(() => document.getElementById(`preg-${ir}`)?.scrollIntoView({ block: 'start' }), 120);
    return () => window.clearTimeout(h);
  }, [ir]);

  const total = useMemo(() => SISTEMAS.flatMap((s) => s.capitulos.flatMap((c) => c.items)), []);
  const nq = norm(q.trim());
  const pasa = (i: Item) => (filtro === 'todas' || i.origen === filtro) && (!nq || norm(`${i.texto} ${i.cita ?? ''} ${i.nota ?? ''}`).includes(nq));
  const visibles = SISTEMAS.map((s) => ({ ...s, capitulos: s.capitulos.map((c) => ({ ...c, items: c.items.filter(pasa) })).filter((c) => c.items.length) }));
  const cuantas = visibles.reduce((a, s) => a + s.capitulos.reduce((b, c) => b + c.items.length, 0), 0);

  return (
    <div className="page preg">
      <header className="preg__head">
        <span className="preg__icono">
          <Icon name="alert" size={28} />
        </span>
        <div>
          <h1>Preguntas de examen</h1>
          <p className="preg__sub">
            Todo lo que el Dr. Ortega avisó en clase que toma («pregunta de parcial», «lo van a bochar», «como el Padre Nuestro»), con su <strong>frase textual</strong> y el minuto de la grabación, más las
            del preguntero de la cátedra. Dividido por sistema; cada una lleva a la diapositiva donde se estudia.
          </p>
          <p className="preg__cuenta">
            <strong>{total.length}</strong> preguntas · <strong>{total.filter((i) => i.origen === 'ortega').length}</strong> dichas por Ortega · <strong>{total.filter((i) => i.origen === 'preguntero').length}</strong> del
            preguntero
          </p>
        </div>
      </header>

      <nav className="preg__indice" aria-label="Ir a">
        {ORALES.map((o) => (
          <a key={o.id} href={`#preg-${o.id}`} onClick={saltar(`preg-${o.id}`)} className="preg__salto preg__salto--oral">
            <Icon name="target" size={15} /> {o.titulo}
          </a>
        ))}
        {SISTEMAS.map((s) => (
          <a key={s.id} href={`#preg-${s.id}`} onClick={saltar(`preg-${s.id}`)} className={`preg__salto tone-${TONO[s.id]}`}>
            <Icon name={ICONO[s.id]} size={15} /> {CORTO[s.id]}
          </a>
        ))}
      </nav>

      {ORALES.map((o) => (
        <section key={o.id} id={`preg-${o.id}`} className="preg__oral">
          <div className="preg__oral-cab">
            <span className="preg__nuevo">Lo que tomó</span>
            <h2>{o.titulo}</h2>
          </div>
          <p className="preg__oral-res">
            <Rich text={o.resumen} />
          </p>
          <div className="preg__oral-cols">
            <OralLista titulo="Teórico" items={o.teorico} />
            <OralLista titulo="Práctico (maniquí)" items={o.practico} />
          </div>
        </section>
      ))}

      <div className="preg__filtros">
        <div className="seg" role="group" aria-label="Origen">
          {(
            [
              ['todas', 'Todas'],
              ['ortega', 'Dichas por Ortega'],
              ['preguntero', 'Preguntero'],
            ] as const
          ).map(([k, l]) => (
            <button key={k} className={filtro === k ? 'is-on' : ''} aria-pressed={filtro === k} onClick={() => setFiltro(k)}>
              {l}
            </button>
          ))}
        </div>
        <label className="preg__buscar">
          <Icon name="search" size={16} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filtrar: tríada, Murphy, ascitis…" aria-label="Filtrar preguntas" />
        </label>
        {(q || filtro !== 'todas') && <span className="preg__n">{cuantas} resultados</span>}
      </div>

      {visibles.map((s) => (
        <section key={s.id} id={`preg-${s.id}`} className={`preg__sis tone-${TONO[s.id]}`}>
          <h2 className="preg__sis-t">
            <span className="preg__sis-i">
              <Icon name={ICONO[s.id]} size={18} />
            </span>
            {s.title}
            <span className="preg__sis-n">{s.capitulos.reduce((a, c) => a + c.items.length, 0)}</span>
          </h2>
          {!s.capitulos.length && <p className="empty">Nada con ese filtro.</p>}
          {s.capitulos.map((c) => (
            <div key={c.id} className="preg__cap">
              <h3>{c.id.startsWith('man-') ? <Link to={`/maniobras?sistema=${s.id}`}>{c.title}</Link> : <Link to={`/capitulo/${c.id}`}>{c.title}</Link>}</h3>
              <ol className="preg__lista">
                {c.items.map((i) => (
                  <ItemCita key={i.id} i={i} />
                ))}
              </ol>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

function saltar(id: string) {
  return (e: MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
}

function ItemCita({ i }: { i: Item }) {
  const tomada = TOMADAS.get(i.id);
  return (
    <li className={`preg__item is-${i.origen}`}>
      <div className="preg__q">
        <span className={`preg__tag preg__tag--${i.origen}`}>{i.origen === 'ortega' ? 'Ortega' : 'Preguntero'}</span>
        {tomada && <span className="preg__tag preg__tag--tomada">Tomada el {tomada}</span>}
        <span className="preg__texto">
          <Rich text={i.texto} />
        </span>
      </div>
      {i.cita && <blockquote className="preg__cita">«{i.cita}»</blockquote>}
      {i.nota && (
        <p className="preg__cita">
          <Rich text={i.nota} />
        </p>
      )}
      <div className="preg__meta">
        {i.ref && <span>{refText(i.ref)}</span>}
        <Link to={i.link} className="preg__ir">
          {i.maniobra ? 'Ver la maniobra' : i.desarrollo ? 'Ver el desarrollo' : 'Estudiarlo'} <Icon name="chevronRight" size={14} />
        </Link>
      </div>
    </li>
  );
}

function OralLista({ titulo, items }: { titulo: string; items: PreguntaOral[] }) {
  return (
    <div className="preg__oral-col">
      <h3>{titulo}</h3>
      <ol className="preg__oral-lista">
        {items.map((p, n) => (
          <li key={n} className={`tone-${TONO[p.sistema]}`}>
            <span className="preg__oral-sis">{CORTO[p.sistema]}</span>
            <p className="preg__oral-q">
              <Rich text={p.q} />
            </p>
            {p.nota && (
              <p className="preg__oral-nota">
                <Rich text={p.nota} />
              </p>
            )}
            <details className="preg__oral-a">
              <summary>Ver la respuesta</summary>
              <p>
                <Rich text={p.a} />
              </p>
              <Link to={p.link} className="preg__ir">
                {p.link.startsWith('/maniobras') ? 'Ver la maniobra' : 'Ir a la diapositiva'} <Icon name="chevronRight" size={14} />
              </Link>
            </details>
          </li>
        ))}
      </ol>
    </div>
  );
}
