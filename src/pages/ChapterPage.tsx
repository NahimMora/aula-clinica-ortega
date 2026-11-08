import { lazy, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import type { Chapter, TheorySection } from '@/types';
import { findChapter, findSystem, neighbours } from '@content/curriculum';
import { useChapter } from '@/lib/useChapter';
import { Blocks, DiagramContext, PriorityBadge } from '@/components/Blocks';
import { ConceptMap } from '@/components/ConceptMap';
import { Closing } from '@/components/Closing';
import { DevList, ExamBadge, MemoryCard, QuizList } from '@/components/Practice';
import { VideoPlayer, asset } from '@/components/VideoPlayer';
import { Rich, Refs } from '@/components/Rich';
import { Icon } from '@/components/Icon';
import { ManeuverList } from '@/components/Maneuvers';
import { AnimContext } from '@/components/Anim';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { markVisited, setCompleted, setLast, toggleBookmark, useProgress } from '@/lib/progress';
import { NotFound, Loading } from './Misc';

// Clase visual por pestañas: se descarga solo para los capítulos que la declaran.
const ClaseView = lazy(() => import('@/clase/ClaseView'));

interface SectionDef {
  id: string;
  letter: string;
  label: string;
  title: string;
}

function sectionDefs(c: Chapter): SectionDef[] {
  const defs: SectionDef[] = [{ id: 'ubicate', letter: 'A', label: 'Mapa', title: 'Ubicate antes de empezar' }];
  if (c.developments.some((d) => d.prio)) defs.push({ id: 'radar', letter: '★', label: 'Lo que toma', title: 'Lo que pregunta el profe' });
  if (c.bases?.sections.length) defs.push({ id: 'bases', letter: 'B', label: 'Bases', title: 'Primero entendé esto' });
  defs.push({ id: 'clase', letter: 'C', label: 'Fichas', title: 'Lo que tenés que saber' });
  if (c.quickRef?.length) defs.push({ id: 'consulta', letter: 'D', label: 'Consulta', title: 'Teoría de consulta rápida' });
  if (c.video) defs.push({ id: 'video', letter: 'E', label: 'Video', title: 'Video con narración' });
  defs.push(
    { id: 'choice', letter: 'F', label: 'Choice', title: 'Preguntas choice' },
    { id: 'desarrollos', letter: 'G', label: 'Desarrollos', title: 'Desarrollos resueltos' },
    { id: 'memoria', letter: 'H', label: 'Memoria', title: 'Tarjetas de memoria' },
  );
  if (c.maneuvers?.ids.length) defs.push({ id: 'maniobras', letter: '✋', label: 'Maniobras', title: 'Maniobras relacionadas' });
  defs.push({ id: 'integracion', letter: 'I', label: 'Cierre', title: 'Integración final' });
  return defs;
}

export function ChapterPage() {
  const { id } = useParams();
  const meta = id ? findChapter(id) : undefined;
  const state = useChapter(id);
  if (!meta) return <NotFound />;
  if (state.status === 'loading') return <Loading label="Cargando capítulo…" />;
  if (state.status === 'missing') return <SoonChapter id={meta.id} />;
  if (state.status === 'error') return <NotFound message={`No se pudo cargar el capítulo (${state.error}).`} />;
  if (state.chapter.clase) return <ClaseView c={state.chapter} />;
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
  const progress = useProgress();
  const [params] = useSearchParams();
  const [current, setCurrent] = useState('ubicate');
  const defs = useMemo(() => sectionDefs(c), [c]);
  const visible = defs;
  const sys = findSystem(c.systemId);
  const nb = neighbours(c.id);
  const pc = progress.chapters[c.id];
  const pct = Math.round(((pc?.visited.filter((v) => defs.some((d) => d.id === v)).length ?? 0) / defs.length) * 100);

  useEffect(() => {
    setLast(`/capitulo/${c.id}`, c.title);
  }, [c.id, c.title]);

  // Marca secciones vistas y resalta la actual.
  useEffect(() => {
    const els = visible.map((d) => document.getElementById(d.id)).filter((e): e is HTMLElement => Boolean(e));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            setCurrent(en.target.id);
            markVisited(c.id, en.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [c.id, visible]);

  // Enlace profundo: ?s=seccion
  useEffect(() => {
    const s = params.get('s');
    if (!s) return;
    const t = window.setTimeout(() => document.getElementById(s)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 250);
    return () => window.clearTimeout(t);
  }, [params]);

  const go = (sid: string) => document.getElementById(sid)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <DiagramContext.Provider value={c.diagrams}>
      <AnimContext.Provider value={{ escenas: c.escenas ?? [], audioBase: asset(`media/${c.id}/pasos/`), conAudio: Boolean(c.audioPasos) }}>
      <article className={`chapter tone-${sys?.tone ?? 'rose'}`}>
        <header className="chero">
          <div className="chero__crumbs">
            <Link to="/">Inicio</Link> <Icon name="chevronRight" size={14} /> {sys && <Link to={`/sistema/${sys.id}`}>{sys.title}</Link>}
          </div>
          <h1 className="chero__title">{c.title}</h1>
          <p className="chero__sub">{c.subtitle}</p>
          <div className="chero__meta">
            <span>
              <Icon name="clock" size={15} /> ~{c.estimatedMinutes} min de estudio
            </span>
            <span>
              <Icon name="pen" size={15} /> {c.mcq.length} choice · {c.developments.length} desarrollos
            </span>
            {c.video && (
              <span>
                <Icon name="video" size={15} /> Video {c.video.duration}
              </span>
            )}
            <span className="chero__progress" title="Secciones recorridas">
              <span className="pbar">
                <span style={{ width: `${pct}%` }} />
              </span>
              {pct}% recorrido
            </span>
          </div>
          <Refs refs={c.sources} label="Basado en" />
        </header>

        <nav className="secnav" aria-label="Secciones del capítulo">
          {visible.map((d) => (
            <button key={d.id} className={`secnav__item ${current === d.id ? 'is-on' : ''} ${pc?.visited.includes(d.id) ? 'is-seen' : ''}`} onClick={() => go(d.id)}>
              <span className="secnav__letter">{d.letter}</span>
              <span className="secnav__label">{d.label}</span>
            </button>
          ))}
        </nav>

        <div className="chapter__body">
          {visible.some((d) => d.id === 'ubicate') && (
            <Section def={defs.find((d) => d.id === 'ubicate')!} chapterId={c.id} intro="Antes de cualquier definición: qué vas a estudiar, de qué depende y cómo se conectan sus partes. Tocá un bloque para ir a su explicación.">
              <ConceptMap data={c.map} onBranch={(bid) => go(`t-${bid}`)} />
            </Section>
          )}

          {visible.some((d) => d.id === 'radar') && (
            <Section def={defs.find((d) => d.id === 'radar')!} chapterId={c.id} intro="Las preguntas de examen de este tema, ordenadas por prioridad, con lo que dijo el profe. Empezá por las P0.">
              <ol className="radar">
                {[...c.developments]
                  .filter((d) => d.prio)
                  .sort((a, b) => (a.prio ?? 'P9').localeCompare(b.prio ?? 'P9'))
                  .map((d) => (
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
                      <div className="radar__go">
                        {d.ficha && (
                          <button className="btn btn--ghost btn--sm" onClick={() => go(`t-${d.ficha}`)}>
                            <Icon name="book" size={14} /> Estudiar
                          </button>
                        )}
                        <button className="btn btn--soft btn--sm" onClick={() => go(`d-${d.id}`)}>
                          <Icon name="pen" size={14} /> Responder
                        </button>
                      </div>
                    </li>
                  ))}
              </ol>
            </Section>
          )}

          {visible.some((d) => d.id === 'bases') && (
            <Section def={defs.find((d) => d.id === 'bases')!} chapterId={c.id} intro={c.bases?.intro}>
              {c.bases?.sections.map((s) => (
                <TheoryBlock key={s.id} s={s} chapterId={c.id} />
              ))}
            </Section>
          )}

          {visible.some((d) => d.id === 'clase') && (
            <Section def={defs.find((d) => d.id === 'clase')!} chapterId={c.id} intro="La explicación completa, en capas: primero el concepto, después el mecanismo y finalmente la clínica. Cada bloque indica su prioridad y de qué clase sale.">
              <div className="toc-inline">
                {c.theory.map((s, i) => (
                  <button key={s.id} onClick={() => go(`t-${s.id}`)}>
                    <span>{i + 1}</span> {s.title}
                  </button>
                ))}
              </div>
              {c.theory.map((s) => (
                <TheoryBlock key={s.id} s={s} chapterId={c.id} />
              ))}
            </Section>
          )}

          {visible.some((d) => d.id === 'consulta') && (
            <Section def={defs.find((d) => d.id === 'consulta')!} chapterId={c.id} intro="Fichas compactas para volver rápido a un dato. El manual web reúne la teoría de todo el sistema y el PDF la deja lista para imprimir.">
              {(c.quickRef ?? []).map((q, i) => (
                <div key={i} className="qref">
                  <div className="qref__title">{q.title}</div>
                  <div className="table-wrap">
                    <table className="btable">
                      <thead>
                        <tr>
                          {q.head.map((h, j) => (
                            <th key={j}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {q.rows.map((r, j) => (
                          <tr key={j}>
                            {r.map((cell, k) => (
                              <td key={k}>
                                <Rich text={cell} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
              <div className="qref__links">
                <Link className="btn btn--soft" to={`/manual/${c.systemId}?c=${c.id}`}>
                  <Icon name="book" size={17} /> Abrir en el manual web
                </Link>
                {sys?.pdf && (
                  <a className="btn btn--soft" href={asset(sys.pdf)} download>
                    <Icon name="download" size={17} /> Descargar PDF del sistema
                  </a>
                )}
              </div>
            </Section>
          )}

          {c.video && visible.some((d) => d.id === 'video') && (
            <Section def={defs.find((d) => d.id === 'video')!} chapterId={c.id} intro="Todo el capítulo de corrido, con voz: las mismas explicaciones animadas de las fichas, una detrás de otra. Ideal para repasar escuchando.">
              <VideoPlayer video={c.video} title={c.title} />
            </Section>
          )}

          {visible.some((d) => d.id === 'choice') && (
            <Section def={defs.find((d) => d.id === 'choice')!} chapterId={c.id} intro="Dificultad progresiva. Las marcadas con ★ corresponden a temas que el profesor señala como de examen. Cada respuesta se corrige al instante y explica también los distractores.">
              <QuizList questions={c.mcq} chapterOf={() => c.id} />
            </Section>
          )}

          {visible.some((d) => d.id === 'desarrollos') && (
            <Section def={defs.find((d) => d.id === 'desarrollos')!} chapterId={c.id} intro="No tenés que escribir nada: leé la pregunta, intentá responderla mentalmente, revelá el desarrollo modelo y marcá con honestidad si lo sabías.">
              <DevList devs={c.developments} chapterOf={() => c.id} />
            </Section>
          )}

          {visible.some((d) => d.id === 'memoria') && (
            <Section def={defs.find((d) => d.id === 'memoria')!} chapterId={c.id} intro="Para lo que cuesta retener: para qué sirve, qué evalúa, cómo se interpreta, una asociación para recordarlo y una pregunta de recuperación.">
              <div className="mem-list">
                {c.memory.map((m) => (
                  <MemoryCard key={m.id} m={m} chapterId={c.id} />
                ))}
              </div>
            </Section>
          )}

          {c.maneuvers && visible.some((d) => d.id === 'maniobras') && (
            <Section def={defs.find((d) => d.id === 'maniobras')!} chapterId={c.id} intro={c.maneuvers.note}>
              <ManeuverList ids={c.maneuvers.ids} />
            </Section>
          )}

          {visible.some((d) => d.id === 'integracion') && (
            <Section def={defs.find((d) => d.id === 'integracion')!} chapterId={c.id} intro="Cerrá el capítulo: el mapa completo, lo imprescindible, las conexiones y un mini simulacro.">
              <Closing c={c} />
            </Section>
          )}

          <div className="chapter__end">
            <button className={`btn ${pc?.completed ? 'btn--known is-on' : 'btn--primary'}`} onClick={() => setCompleted(c.id, !pc?.completed)}>
              <Icon name="check" size={17} /> {pc?.completed ? 'Capítulo completado' : 'Marcar capítulo como completado'}
            </button>
            <div className="chapter__pn">
              {nb.prev && (
                <Link to={`/capitulo/${nb.prev.id}`} className="pn">
                  <Icon name="chevronLeft" size={16} /> {nb.prev.title}
                </Link>
              )}
              {nb.next && (
                <Link to={`/capitulo/${nb.next.id}`} className="pn pn--next">
                  {nb.next.title} <Icon name="chevronRight" size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>
      </AnimContext.Provider>
    </DiagramContext.Provider>
  );
}

function Section({ def, chapterId, intro, children }: { def: SectionDef; chapterId: string; intro?: string; children: ReactNode }) {
  return (
    <section id={def.id} className={`csec csec--${def.id}`} aria-labelledby={`${def.id}-h`} data-chapter={chapterId}>
      <header className="csec__head">
        <span className="csec__letter">{def.letter}</span>
        <div>
          <h2 id={`${def.id}-h`}>{def.title}</h2>
          {intro && (
            <p className="csec__intro">
              <Rich text={intro} />
            </p>
          )}
        </div>
      </header>
      <ErrorBoundary label={`la sección “${def.title}”`}>{children}</ErrorBoundary>
    </section>
  );
}

function TheoryBlock({ s, chapterId }: { s: TheorySection; chapterId: string }) {
  const progress = useProgress();
  const marked = progress.bookmarks.some((b) => b.id === `${chapterId}#t-${s.id}`);
  return (
    <section className="tblock" id={`t-${s.id}`}>
      <header className="tblock__head">
        {s.kicker && <div className="tblock__kicker">{s.kicker}</div>}
        <div className="tblock__row">
          <h3>{s.title}</h3>
          <PriorityBadge p={s.priority} />
          <button className={`iconbtn ${marked ? 'is-on' : ''}`} onClick={() => toggleBookmark({ chapterId, sectionId: `t-${s.id}`, label: s.title })} title={marked ? 'Quitar marcador' : 'Guardar marcador'} aria-pressed={marked}>
            <Icon name="bookmark" size={17} fill={marked ? 'currentColor' : 'none'} />
          </button>
        </div>
        {s.summary && (
          <p className="tblock__summary">
            <Rich text={s.summary} />
          </p>
        )}
      </header>
      <Blocks blocks={s.blocks} />
      <Refs refs={s.refs} />
    </section>
  );
}
