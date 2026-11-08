import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import type { Chapter, TheorySection } from '@/types';
import { findChapter, findSystem, neighbours } from '@content/curriculum';
import { useChapter } from '@/lib/useChapter';
import { Blocks, DiagramContext, PriorityBadge } from '@/components/Blocks';
import { ConceptMap, SummaryMap } from '@/components/ConceptMap';
import { DevList, MemoryCard, QuizList, McqCard } from '@/components/Practice';
import { VideoPlayer, asset } from '@/components/VideoPlayer';
import { Rich, Refs } from '@/components/Rich';
import { Icon } from '@/components/Icon';
import { ManeuverList } from '@/components/Maneuvers';
import { SlidesBlock, SlidesContext } from '@/components/SlidesBlock';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { devPending, lastAttempt, markVisited, setCompleted, setLast, toggleBookmark, useProgress } from '@/lib/progress';
import { NotFound, Loading } from './Misc';

type Mode = 'completo' | 'teoria' | 'practica';

interface SectionDef {
  id: string;
  letter: string;
  label: string;
  title: string;
  modes: Mode[];
}

function sectionDefs(c: Chapter): SectionDef[] {
  const all: Mode[] = ['completo', 'teoria', 'practica'];
  const t: Mode[] = ['completo', 'teoria'];
  const p: Mode[] = ['completo', 'practica'];
  const defs: SectionDef[] = [
    { id: 'ubicate', letter: 'A', label: 'Ubicate', title: 'Ubicate antes de empezar', modes: t },
  ];
  if (c.developments.some((d) => d.prio)) defs.push({ id: 'radar', letter: '★', label: 'Lo que toma', title: 'Lo que pregunta el profe', modes: all });
  if (c.bases?.sections.length) defs.push({ id: 'bases', letter: 'B', label: 'Bases', title: 'Primero entendé esto', modes: t });
  defs.push({ id: 'clase', letter: 'C', label: 'Fichas', title: 'Lo que tenés que saber', modes: t });
  if (c.quickRef?.length) defs.push({ id: 'consulta', letter: 'D', label: 'Consulta', title: 'Teoría de consulta rápida', modes: t });
  if (c.video || c.slides) defs.push({ id: 'video', letter: 'E', label: 'Video', title: 'Video y diapositivas animadas', modes: t });
  defs.push(
    { id: 'choice', letter: 'F', label: 'Choice', title: 'Preguntas choice', modes: p },
    { id: 'desarrollos', letter: 'G', label: 'Desarrollos', title: 'Desarrollos resueltos', modes: p },
    { id: 'memoria', letter: 'H', label: 'Memoria', title: 'Memoria activa y mnemotecnias', modes: p },
  );
  if (c.maneuvers?.ids.length) defs.push({ id: 'maniobras', letter: '✋', label: 'Maniobras', title: 'Maniobras relacionadas', modes: all });
  defs.push({ id: 'integracion', letter: 'I', label: 'Integración', title: 'Integración final', modes: all });
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
  const [mode, setMode] = useState<Mode>('completo');
  const [current, setCurrent] = useState('ubicate');
  const defs = useMemo(() => sectionDefs(c), [c]);
  const visible = defs.filter((d) => d.modes.includes(mode));
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
      <SlidesContext.Provider value={c.slides}>
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
          <div className="chero__modes seg" role="tablist" aria-label="Modo de estudio">
            {(
              [
                ['completo', 'Recorrido completo'],
                ['teoria', 'Modo teoría'],
                ['practica', 'Modo práctica'],
              ] as const
            ).map(([k, l]) => (
              <button key={k} role="tab" aria-selected={mode === k} className={mode === k ? 'is-on' : ''} onClick={() => setMode(k)}>
                {l}
              </button>
            ))}
          </div>
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

          {(c.video || c.slides) && visible.some((d) => d.id === 'video') && (
            <Section def={defs.find((d) => d.id === 'video')!} chapterId={c.id} intro="El video completo con narración, o las mismas escenas como diapositivas interactivas: reproducí, pausá y avanzá escena por escena. Debajo del video está el guion completo.">
              <VideoSection c={c} />
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
              <Closing c={c} mode={mode} />
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
      </SlidesContext.Provider>
    </DiagramContext.Provider>
  );
}

function VideoSection({ c }: { c: Chapter }) {
  const [tab, setTab] = useState<'video' | 'slides'>(c.video ? 'video' : 'slides');
  return (
    <>
      <div className="seg vtabs" role="tablist" aria-label="Formato">
        {c.video && (
          <button role="tab" aria-selected={tab === 'video'} className={tab === 'video' ? 'is-on' : ''} onClick={() => setTab('video')}>
            Video completo
          </button>
        )}
        {c.slides && (
          <button role="tab" aria-selected={tab === 'slides'} className={tab === 'slides' ? 'is-on' : ''} onClick={() => setTab('slides')}>
            Diapositivas interactivas
          </button>
        )}
      </div>
      {tab === 'video' && c.video && <VideoPlayer video={c.video} title={c.title} />}
      {tab === 'slides' && <SlidesBlock ids={[]} title="Todo el capítulo, escena por escena" startOpen />}
    </>
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

function Closing({ c, mode }: { c: Chapter; mode: Mode }) {
  const progress = useProgress();
  const now = Date.now();
  const pendingDevs = c.developments.filter((d) => progress.devs[d.id] && devPending(progress, d.id, now));
  const wrong = c.mcq.filter((q) => {
    const a = lastAttempt(progress, q.id);
    return a && !a.correct;
  });
  const mem = c.memory.filter((m) => progress.memory[m.id]?.status === 'unknown');
  const nothing = !pendingDevs.length && !wrong.length && !mem.length;
  return (
    <div className="closing">
      {mode !== 'practica' && (
        <>
          <h3 className="closing__h">Mapa conceptual de cierre</h3>
          <SummaryMap map={c.closing.map} />
          <div className="closing__grid">
            <div className="closing__card tone-rose">
              <h4>
                <Icon name="star" size={16} /> Lo imprescindible
              </h4>
              <ul>
                {c.closing.essentials.map((e, i) => (
                  <li key={i}>
                    <Rich text={e} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="closing__card tone-peach">
              <h4>
                <Icon name="alert" size={16} /> Errores que pueden aparecer en el examen
              </h4>
              <ul>
                {c.closing.pitfalls.map((e, i) => (
                  <li key={i}>
                    <Rich text={e} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="closing__card tone-sky">
              <h4>
                <Icon name="route" size={16} /> Conexiones con otros capítulos
              </h4>
              <ul>
                {c.closing.links.map((l, i) => (
                  <li key={i}>
                    <Rich text={l.text} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
      <h3 className="closing__h">Mini simulacro</h3>
      <div className="quiz__list">
        {c.closing.miniExam.map((q, i) => (
          <McqCard key={q.id} q={q} chapterId={c.id} n={i + 1} />
        ))}
      </div>
      <h3 className="closing__h">Lo que todavía necesito repasar</h3>
      {nothing ? (
        <p className="empty">Todavía no hay pendientes registrados en este capítulo. Aparecen acá los desarrollos que marques como "No lo sabía", las choice que erraste y las tarjetas de memoria que no recordaste.</p>
      ) : (
        <ul className="pending">
          {pendingDevs.map((d) => (
            <li key={d.id}>
              <span className="chip">Desarrollo</span>
              <a href={`#d-${d.id}`} onClick={(e) => (e.preventDefault(), document.getElementById(`d-${d.id}`)?.scrollIntoView({ behavior: 'smooth' }))}>
                <Rich text={d.question} />
              </a>
            </li>
          ))}
          {wrong.map((q) => (
            <li key={q.id}>
              <span className="chip">Choice</span>
              <a href={`#q-${q.id}`} onClick={(e) => (e.preventDefault(), document.getElementById(`q-${q.id}`)?.scrollIntoView({ behavior: 'smooth' }))}>
                {q.topic}
              </a>
            </li>
          ))}
          {mem.map((m) => (
            <li key={m.id}>
              <span className="chip">Memoria</span>
              <a href={`#m-${m.id}`} onClick={(e) => (e.preventDefault(), document.getElementById(`m-${m.id}`)?.scrollIntoView({ behavior: 'smooth' }))}>
                {m.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
