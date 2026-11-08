import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import type { Chapter, TheorySection } from '@/types';
import { findSystem, isAvailable } from '@content/curriculum';
import { loadChapter } from '@/lib/useChapter';
import { blocksText, norm, plain } from '@/lib/text';
import { Blocks, DiagramContext, PriorityBadge } from '@/components/Blocks';
import { Rich, Refs } from '@/components/Rich';
import { Icon } from '@/components/Icon';
import { asset } from '@/components/VideoPlayer';
import { Loading, NotFound } from './Misc';

function useSystemChapters(systemId: string | undefined) {
  const [list, setList] = useState<Chapter[] | null>(null);
  useEffect(() => {
    const sys = systemId ? findSystem(systemId) : undefined;
    if (!sys) return;
    let alive = true;
    Promise.all(sys.chapters.filter(isAvailable).map((c) => loadChapter(c.id))).then((l) => alive && setList(l.filter((c): c is Chapter => Boolean(c))));
    return () => {
      alive = false;
    };
  }, [systemId]);
  return list;
}

/* ───────────────────────── Manual web navegable ───────────────────────── */

export function ManualPage() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const sys = id ? findSystem(id) : undefined;
  const chapters = useSystemChapters(id);
  const [filter, setFilter] = useState('');
  const f = norm(filter.trim());

  useEffect(() => {
    const c = params.get('c');
    if (!c || !chapters) return;
    const t = window.setTimeout(() => document.getElementById(`m-${c}`)?.scrollIntoView({ behavior: 'smooth' }), 200);
    return () => window.clearTimeout(t);
  }, [params, chapters]);

  const match = useMemo(() => (s: TheorySection) => !f || norm(s.title).includes(f) || norm(blocksText(s.blocks)).includes(f), [f]);

  if (!sys) return <NotFound />;
  if (!chapters) return <Loading label="Armando el manual…" />;
  return (
    <div className={`page manual tone-${sys.tone}`}>
      <aside className="manual__toc" aria-label="Índice del manual">
        <div className="manual__toc-title">Índice</div>
        {chapters.map((c) => (
          <div key={c.id} className="manual__toc-ch">
            <a href={`#m-${c.id}`} onClick={(e) => (e.preventDefault(), document.getElementById(`m-${c.id}`)?.scrollIntoView({ behavior: 'smooth' }))}>
              {c.title}
            </a>
            <ul>
              {[...c.bases.sections, ...c.theory].filter(match).map((s) => (
                <li key={s.id}>
                  <a href={`#mt-${c.id}-${s.id}`} onClick={(e) => (e.preventDefault(), document.getElementById(`mt-${c.id}-${s.id}`)?.scrollIntoView({ behavior: 'smooth' }))}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
      <div className="manual__main">
        <header className="manual__head">
          <h1>Manual de {sys.title.toLowerCase()}</h1>
          <p className="muted">Toda la teoría publicada del sistema en un solo lugar, para consultar sin buscar dentro de un video.</p>
          <div className="manual__tools">
            <div className="search">
              <Icon name="search" size={17} />
              <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filtrar secciones por término…" aria-label="Filtrar el manual" />
            </div>
            {sys.pdf && (
              <a className="btn btn--soft" href={asset(sys.pdf)} download>
                <Icon name="download" size={16} /> Descargar PDF
              </a>
            )}
          </div>
        </header>
        {chapters.length === 0 && <p className="empty">Todavía no hay capítulos publicados en este sistema.</p>}
        {chapters.map((c) => (
          <DiagramContext.Provider key={c.id} value={c.diagrams}>
            <section className="manual__ch" id={`m-${c.id}`}>
              <div className="manual__ch-head">
                <h2>{c.title}</h2>
                <Link to={`/capitulo/${c.id}`} className="btn btn--ghost btn--sm">
                  Ir al capítulo interactivo <Icon name="arrowRight" size={14} />
                </Link>
              </div>
              {[...c.bases.sections, ...c.theory].filter(match).map((s) => (
                <section key={s.id} className="tblock" id={`mt-${c.id}-${s.id}`}>
                  <header className="tblock__head">
                    <div className="tblock__row">
                      <h3>{s.title}</h3>
                      <PriorityBadge p={s.priority} />
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
              ))}
            </section>
          </DiagramContext.Provider>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── Versión imprimible (fuente del PDF) ───────────────────────── */

export function PrintManual() {
  const { id } = useParams();
  const sys = id ? findSystem(id) : undefined;
  const chapters = useSystemChapters(id);
  useEffect(() => {
    document.documentElement.classList.add('is-print');
    return () => document.documentElement.classList.remove('is-print');
  }, []);
  useEffect(() => {
    if (chapters) window.setTimeout(() => document.body.setAttribute('data-print-ready', '1'), 600);
  }, [chapters]);
  if (!sys) return <NotFound />;
  if (!chapters) return <Loading label="Preparando versión imprimible…" />;
  const date = new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <div className={`print tone-${sys.tone}`}>
      <section className="print__cover">
        <div className="print__brand">Aula Clínica — Semiología I</div>
        <h1>Manual de {sys.title.toLowerCase()}</h1>
        <p className="print__lead">{sys.description}</p>
        <ul className="print__covlist">
          {chapters.map((c) => (
            <li key={c.id}>{c.title}</li>
          ))}
        </ul>
        <p className="print__meta">
          Versión del {date} · {chapters.length} capítulo{chapters.length === 1 ? '' : 's'} publicado{chapters.length === 1 ? '' : 's'} · Material original elaborado a partir de las clases del Dr. Ortega y su libro de Clínica Médica I.
        </p>
      </section>
      {chapters.map((c, ci) => (
        <DiagramContext.Provider key={c.id} value={c.diagrams}>
          <section className="print__ch">
            <div className="print__ch-kicker">Capítulo {ci + 1}</div>
            <h1>{c.title}</h1>
            <p className="print__lead">{c.subtitle}</p>
            <div className="print__map">
              <div className="print__map-col">
                <h4>Necesitás saber</h4>
                <ul>
                  {c.map.prereqs.map((p, i) => (
                    <li key={i}>{p.label}</li>
                  ))}
                </ul>
              </div>
              <div className="print__map-hub">
                <strong>{c.map.center}</strong>
                <p>
                  <Rich text={c.map.why} />
                </p>
                <div className="print__map-branches">
                  {c.map.branches.map((b) => (
                    <div key={b.id} className={`print__map-branch tone-${b.tone}`}>
                      <b>{b.label}</b>
                      <span>{b.items.join(' · ')}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="print__map-col">
                <h4>Al terminar vas a poder</h4>
                <ul>
                  {c.map.outcomes.map((o, i) => (
                    <li key={i}>{plain(o)}</li>
                  ))}
                </ul>
              </div>
            </div>
            {[...c.bases.sections, ...c.theory].map((s) => (
              <section key={s.id} className="tblock">
                <header className="tblock__head">
                  <div className="tblock__row">
                    <h3>{s.title}</h3>
                    <PriorityBadge p={s.priority} />
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
            ))}
            <h2 className="print__h2">Fichas de consulta rápida</h2>
            {c.quickRef.map((q, i) => (
              <div key={i} className="qref">
                <div className="qref__title">{q.title}</div>
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
            ))}
            <h2 className="print__h2">Memoria activa</h2>
            {c.memory.map((m) => (
              <div key={m.id} className="print__mem">
                <h4>{m.title}</h4>
                <p>
                  <b>Para qué sirve:</b> <Rich text={m.purpose} />
                </p>
                <Blocks blocks={m.evaluates} />
                <p>
                  <b>Cómo interpretarlo:</b> <Rich text={m.interpret} />
                </p>
                <p className="print__hook">
                  <b>Mnemotecnia: {m.mnemonic.hook}</b> — <Rich text={m.mnemonic.explain} />
                </p>
              </div>
            ))}
            <h2 className="print__h2">Integración: lo imprescindible</h2>
            <ul className="blist">
              {c.closing.essentials.map((e, i) => (
                <li key={i}>
                  <Rich text={e} />
                </li>
              ))}
            </ul>
            <h2 className="print__h2">Desarrollos modelo</h2>
            {c.developments.map((d, i) => (
              <div key={d.id} className="print__dev">
                <h4>
                  {i + 1}. <Rich text={d.question} />
                </h4>
                <Blocks blocks={d.answer} />
              </div>
            ))}
            <h2 className="print__h2">Preguntas de repaso (choice)</h2>
            <ol className="print__mcq">
              {c.mcq.map((q) => (
                <li key={q.id}>
                  <Rich text={q.stem} />
                  <ol type="A">
                    {q.options.map((o, i) => (
                      <li key={i}>
                        <Rich text={o.text} />
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ol>
            <h3 className="print__h3">Respuestas</h3>
            <ol className="print__answers">
              {c.mcq.map((q) => (
                <li key={q.id}>
                  <b>{'ABCDE'[q.answer]}</b> — <Rich text={q.options[q.answer].why} />
                </li>
              ))}
            </ol>
          </section>
        </DiagramContext.Provider>
      ))}
    </div>
  );
}
