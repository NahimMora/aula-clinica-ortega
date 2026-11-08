import { useEffect, useState } from 'react';
import { Link, Navigate, NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import type { Chapter, Cuadro } from '@/types';
import { findChapter, findSystem, neighbours } from '@content/curriculum';
import { useChapter } from '@/lib/useChapter';
import { DevList, ExamBadge, MemoryCard, QuizList } from '@/components/Practice';
import { VideoPlayer, asset } from '@/components/VideoPlayer';
import { Rich, Refs } from '@/components/Rich';
import { Icon } from '@/components/Icon';
import { ManeuverList } from '@/components/Maneuvers';
import { Teoria } from '@/components/Teoria';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { devPending, lastAttempt, markVisited, setCompleted, setLast, useProgress } from '@/lib/progress';
import { NotFound, Loading } from './Misc';

/** Pasos del capítulo, en orden (modelo farmaco-flor: una pantalla por paso). */
export const PASOS = [
  ['esencial', 'Sabete esto'],
  ['teoria', 'Teoría'],
  ['video', 'Video'],
  ['cuadros', 'Cuadros'],
  ['choice', 'Choice'],
  ['desarrollo', 'Desarrollo'],
  ['repaso', 'Repaso'],
] as const;
export type Paso = (typeof PASOS)[number][0];

/** Enlaces viejos (?s=seccion) y de la búsqueda → paso nuevo. */
const ALIAS: Record<string, Paso> = {
  ubicate: 'esencial', radar: 'esencial', clase: 'cuadros', consulta: 'cuadros', bases: 'cuadros', integracion: 'repaso', memoria: 'repaso', maniobras: 'repaso', desarrollos: 'desarrollo',
};

export function ChapterPage() {
  const { id } = useParams();
  const meta = id ? findChapter(id) : undefined;
  const state = useChapter(id);
  if (!meta) return <NotFound />;
  if (state.status === 'loading') return <Loading label="Cargando capítulo…" />;
  if (state.status === 'missing') return <SoonChapter id={meta.id} />;
  if (state.status === 'error') return <NotFound message={`No se pudo cargar el capítulo (${state.error}).`} />;
  return <ChapterView c={state.chapter} />;
}

function SoonChapter({ id }: { id: string }) {
  const meta = findChapter(id)!;
  const sys = findSystem(meta.systemId);
  return (
    <div className="page page--narrow">
      <div className="soon">
        <span className="badge badge--soon">Próximamente</span>
        <h1>{meta.title}</h1>
        <p>{meta.blurb}</p>
        <p className="muted">Fuentes previstas: {meta.sourcesLabel}. Este capítulo todavía no está publicado: se habilita recién cuando está completo y verificado.</p>
        {sys && (
          <Link className="btn btn--soft" to={`/sistema/${sys.id}`}>
            <Icon name="chevronLeft" size={16} /> Volver a {sys.title}
          </Link>
        )}
      </div>
    </div>
  );
}

function ChapterView({ c }: { c: Chapter }) {
  const { paso } = useParams();
  const [params] = useSearchParams();
  const nav = useNavigate();
  const progress = useProgress();
  const sys = findSystem(c.systemId);
  const hechos = progress.chapters[c.id]?.visited ?? [];
  const pasos = PASOS.filter(([p]) => p !== 'video' || c.video);
  const actual = pasos.find(([p]) => p === paso)?.[0];

  useEffect(() => {
    if (!actual) return;
    window.scrollTo(0, 0);
    markVisited(c.id, actual);
    setLast(`/capitulo/${c.id}/${actual}`, c.title);
    document.querySelector('.riel a.activo')?.scrollIntoView({ inline: 'center', block: 'nearest' });
  }, [c.id, c.title, actual]);

  if (!actual) {
    const s = params.get('s');
    const destino = (s && (ALIAS[s] ?? pasos.find(([p]) => p === s)?.[0])) || 'esencial';
    return <Navigate to={`/capitulo/${c.id}/${destino}`} replace />;
  }
  const i = pasos.findIndex(([p]) => p === actual);
  const sig = pasos[i + 1];

  return (
    <article className={`capitulo tone-${sys?.tone ?? 'rose'}`}>
      <header className="cabeza-cap">
        {sys && (
          <Link className="volver" to={`/sistema/${sys.id}`}>
            <Icon name="chevronLeft" size={14} /> {sys.title}
          </Link>
        )}
        <h1>{c.title}</h1>
      </header>
      <nav className="riel" aria-label="Pasos del capítulo">
        <ol>
          {pasos.map(([p, t]) => (
            <li key={p}>
              <NavLink to={`/capitulo/${c.id}/${p}`} replace className={({ isActive }) => (isActive ? 'activo ' : '') + (hechos.includes(p) ? 'hecho' : '')}>
                {t}
                {hechos.includes(p) && <span aria-label=" (visto)"> ✓</span>}
              </NavLink>
            </li>
          ))}
        </ol>
      </nav>
      <main className="pagina" id={actual}>
        <ErrorBoundary label={`el paso «${pasos[i][1]}»`}>
          {actual === 'esencial' && <Esencial c={c} />}
          {actual === 'teoria' && <Teoria escenas={c.escenas} audioBase={asset(`media/${c.id}/pasos/`)} onFin={() => nav(`/capitulo/${c.id}/${c.video ? 'video' : 'cuadros'}`)} />}
          {actual === 'video' && c.video && <VideoPaso c={c} />}
          {actual === 'cuadros' && <Cuadros c={c} />}
          {actual === 'choice' && (
            <>
              <p className="intro">Las marcadas con ★ son temas que el profe señala para el examen. Se corrigen al instante, con el porqué de cada opción.</p>
              <QuizList questions={c.mcq} chapterOf={() => c.id} />
            </>
          )}
          {actual === 'desarrollo' && (
            <>
              <p className="intro">Las preguntas de examen de este tema. Respondé en voz alta, después mirá la respuesta modelo y marcá con honestidad si la sabías.</p>
              <DevList devs={[...c.developments].sort((a, b) => (a.prio ?? 'P9').localeCompare(b.prio ?? 'P9'))} chapterOf={() => c.id} />
            </>
          )}
          {actual === 'repaso' && <Repaso c={c} />}
        </ErrorBoundary>
        {sig && actual !== 'teoria' && (
          <Link className="boton sec ancho seccion" to={`/capitulo/${c.id}/${sig[0]}`}>
            Seguir con {sig[1].toLowerCase()}
          </Link>
        )}
      </main>
    </article>
  );
}

/* ───────────────────────── Sabete esto ───────────────────────── */

function Esencial({ c }: { c: Chapter }) {
  const [oculto, setOculto] = useState(false);
  const preguntas = [...c.developments].filter((d) => d.prio).sort((a, b) => (a.prio ?? 'P9').localeCompare(b.prio ?? 'P9'));
  return (
    <div>
      <p className="grito">Esto tenés que sabértelo sí o sí</p>
      <p className="tenue">
        <Rich text={c.esencial.objetivo} />
      </p>
      {c.esencial.avisos?.map((a, k) => (
        <p key={k} className="aviso">
          <Rich text={a.text} /> <Refs refs={a.refs} label="" />
        </p>
      ))}

      <h2 className="subt">Lo que pregunta el profe</h2>
      <ol className="radar">
        {preguntas.map((d) => (
          <li key={d.id} className={`radar__item radar__item--${d.prio}`}>
            <div className="radar__top">
              <ExamBadge prio={d.prio!} />
              <span className="radar__q">
                <Rich text={d.question} />
              </span>
            </div>
            {d.quote && (
              <div className="radar__quote">
                <Icon name="cap" size={15} /> {d.quote.text} <Refs refs={d.quote.refs} label="" />
              </div>
            )}
          </li>
        ))}
      </ol>

      <h2 className="subt">El mapa del tema</h2>
      <div className="segmento" role="group" aria-label="Modo del mapa">
        <button type="button" aria-pressed={!oculto} onClick={() => setOculto(false)}>
          Mapa limpio
        </button>
        <button type="button" aria-pressed={oculto} onClick={() => setOculto(true)}>
          Mapa oculto
        </button>
      </div>
      {oculto && <p className="tenue chico">Decilo de memoria y tocá cada franja para comprobar.</p>}
      {c.esencial.bloques.map((b) => (
        <section key={b.titulo + String(oculto)} className={`bloque tone-${b.tono}`}>
          <h3>
            {b.titulo} {b.prio && <ExamBadge prio={b.prio} />}
          </h3>
          <dl>
            {b.puntos.map((pt, k) => (
              <div key={k} className="bloque__fila">
                <dt>
                  <Rich text={pt.k} />
                </dt>
                <dd>
                  <Cinta tapada={oculto}>
                    <Rich text={pt.v} />
                  </Cinta>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}

/** Franja que tapa una respuesta hasta que se la toca. */
function Cinta({ tapada, children }: { tapada: boolean; children: React.ReactNode }) {
  const [visto, setVisto] = useState(false);
  if (!tapada || visto) return <>{children}</>;
  return (
    <button type="button" className="cinta" onClick={() => setVisto(true)} aria-label="Mostrar respuesta">
      <span>{children}</span>
    </button>
  );
}

/* ───────────────────────── Video ───────────────────────── */

function VideoPaso({ c }: { c: Chapter }) {
  return (
    <div>
      <VideoPlayer video={c.video!} title={c.title} />
      <p className="tenue chico">Es la misma explicación de Teoría, narrada. Tocá un tema para saltar.</p>
    </div>
  );
}

/* ───────────────────────── Cuadros ───────────────────────── */

function Cuadros({ c }: { c: Chapter }) {
  const [tapar, setTapar] = useState(false);
  const sys = findSystem(c.systemId);
  return (
    <div>
      <p className="intro">Lo que tenés que saber de memoria, con el porqué del libro para defenderlo.</p>
      <div className="segmento" role="group" aria-label="Modo de los cuadros">
        <button type="button" aria-pressed={!tapar} onClick={() => setTapar(false)}>
          Ver todo
        </button>
        <button type="button" aria-pressed={tapar} onClick={() => setTapar(true)}>
          Tapar respuestas
        </button>
      </div>
      {tapar && <p className="tenue chico">Decí cada casillero de memoria y tocalo para comprobar.</p>}
      {c.cuadros.map((q) => (
        <CuadroCard key={q.id + String(tapar)} q={q} tapar={tapar} />
      ))}
      {sys?.pdf && (
        <a className="enlace" href={asset(sys.pdf)} download>
          <Icon name="download" size={16} /> Descargar los cuadros y desarrollos en PDF
        </a>
      )}
    </div>
  );
}

function CuadroCard({ q, tapar }: { q: Cuadro; tapar: boolean }) {
  return (
    <section className="cuadro" id={`c-${q.id}`}>
      <h3>
        {q.titulo} {q.prio && <ExamBadge prio={q.prio} />}
      </h3>
      {q.quote && (
        <p className="radar__quote">
          <Icon name="cap" size={15} /> {q.quote.text} <Refs refs={q.quote.refs} label="" />
        </p>
      )}
      <div className="table-wrap">
        <table className="btable">
          {q.head.some(Boolean) && (
            <thead>
              <tr>
                {q.head.map((h, j) => (
                  <th key={j}>{h}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {q.rows.map((r, j) => (
              <tr key={j}>
                {r.map((cell, k) => (
                  <td key={k}>
                    {k === 0 ? (
                      <Rich text={cell} />
                    ) : (
                      <Cinta tapada={tapar}>
                        <Rich text={cell} />
                      </Cinta>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {q.porque && (
        <details className="porque">
          <summary>¿Por qué? (fisiopatología del libro)</summary>
          <p>
            <Rich text={q.porque} />
          </p>
        </details>
      )}
      {q.nota && (
        <p className="aviso chico">
          <Rich text={q.nota} />
        </p>
      )}
      {q.refs && q.refs.length > 0 && (
        <details className="fuentes">
          <summary>Fuentes ({q.refs.length})</summary>
          <Refs refs={q.refs} label="" />
        </details>
      )}
    </section>
  );
}

/* ───────────────────────── Repaso ───────────────────────── */

function Repaso({ c }: { c: Chapter }) {
  const progress = useProgress();
  const pc = progress.chapters[c.id];
  const nb = neighbours(c.id);
  const now = Date.now();
  const devs = c.developments.filter((d) => progress.devs[d.id] && devPending(progress, d.id, now));
  const mal = c.mcq.filter((q) => {
    const a = lastAttempt(progress, q.id);
    return a && !a.correct;
  });
  return (
    <div>
      <p className="intro">Recordar sin pistas, en días distintos, es lo que fija. Tocá cada tarjeta, respondé y marcá si lo sabías.</p>
      <div className="mem-list">
        {c.memory.map((m) => (
          <MemoryCard key={m.id} m={m} chapterId={c.id} />
        ))}
      </div>

      <section className="seccion">
        <h2 className="subt">Errores que pueden aparecer en el examen</h2>
        <ul className="trampas">
          {c.trampas.map((t, k) => (
            <li key={k}>
              <Rich text={t} />
            </li>
          ))}
        </ul>
      </section>

      <section className="seccion">
        <h2 className="subt">Lo que todavía tengo que repasar</h2>
        {!devs.length && !mal.length ? (
          <p className="tenue">Todavía no hay pendientes. Aparecen acá los desarrollos que marques como «No lo sabía» y las choice que erraste.</p>
        ) : (
          <ul className="pendientes">
            {devs.map((d) => (
              <li key={d.id}>
                <Link to={`/capitulo/${c.id}/desarrollo`}>
                  <span className="chip">Desarrollo</span> <Rich text={d.question} />
                </Link>
              </li>
            ))}
            {mal.map((q) => (
              <li key={q.id}>
                <Link to={`/capitulo/${c.id}/choice`}>
                  <span className="chip">Choice</span> {q.topic}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {c.maneuvers && (
        <section className="seccion">
          <h2 className="subt">Maniobras de este tema</h2>
          <p className="tenue">
            <Rich text={c.maneuvers.note} />
          </p>
          <ManeuverList ids={c.maneuvers.ids} />
        </section>
      )}

      {c.links && (
        <section className="seccion">
          <h2 className="subt">Se conecta con</h2>
          <ul className="trampas trampas--links">
            {c.links.map((l, k) => (
              <li key={k}>
                <Rich text={l.text} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="seccion fin-cap">
        <button type="button" className={`boton ancho ${pc?.completed ? 'sec' : ''}`} onClick={() => setCompleted(c.id, !pc?.completed)}>
          {pc?.completed ? '✓ Capítulo completado' : 'Marcar capítulo como completado'}
        </button>
        {nb.next && (
          <Link className="enlace" to={`/capitulo/${nb.next.id}`}>
            Siguiente capítulo: {nb.next.title} →
          </Link>
        )}
      </div>
    </div>
  );
}
