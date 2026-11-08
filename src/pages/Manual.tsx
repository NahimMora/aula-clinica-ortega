import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import type { Chapter, Cuadro } from '@/types';
import { findSystem, isAvailable } from '@content/curriculum';
import { loadChapter } from '@/lib/useChapter';
import { norm, plain } from '@/lib/text';
import { Blocks } from '@/components/Blocks';
import { ExamBadge } from '@/components/Practice';
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



function TablaCuadro({ q }: { q: Cuadro }) {
  return (
    <section className="cuadro" id={`mc-${q.id}`}>
      <h3>
        {q.titulo} {q.prio && <ExamBadge prio={q.prio} />}
      </h3>
      {q.quote && (
        <p className="radar__quote">
          {q.quote.text} <Refs refs={q.quote.refs} label="" />
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
                    <Rich text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {q.porque && (
        <p className="porque-print">
          <b>¿Por qué?</b> <Rich text={q.porque} />
        </p>
      )}
      {q.nota && (
        <p className="aviso chico">
          <Rich text={q.nota} />
        </p>
      )}
      <Refs refs={q.refs} />
    </section>
  );
}

/* ───────────────────────── Cuadros del sistema (consulta rápida) ───────────────────────── */

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

  const match = useMemo(() => (q: Cuadro) => !f || norm(q.titulo).includes(f) || norm(plain(q.rows.flat().join(' '))).includes(f), [f]);

  if (!sys) return <NotFound />;
  if (!chapters) return <Loading label="Armando los cuadros…" />;
  return (
    <div className={`page page--narrow manual tone-${sys.tone}`}>
      <header className="manual__head">
        <h1>Cuadros de {sys.title.toLowerCase()}</h1>
        <p className="muted">Todos los cuadros publicados del sistema, para consultar rápido.</p>
        <div className="manual__tools">
          <div className="search">
            <Icon name="search" size={17} />
            <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filtrar por término…" aria-label="Filtrar los cuadros" />
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
        <section className="manual__ch" id={`m-${c.id}`} key={c.id}>
          <div className="manual__ch-head">
            <h2>{c.title}</h2>
            <Link to={`/capitulo/${c.id}`} className="btn btn--ghost btn--sm">
              Ir al capítulo <Icon name="arrowRight" size={14} />
            </Link>
          </div>
          {c.cuadros.filter(match).map((q) => (
            <TablaCuadro key={q.id} q={q} />
          ))}
        </section>
      ))}
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
        <h1>{sys.title}: lo que pregunta el profe</h1>
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
        <section className="print__ch" key={c.id}>
          <div className="print__ch-kicker">Capítulo {ci + 1}</div>
          <h1>{c.title}</h1>
          <p className="print__lead">
            <Rich text={c.esencial.objetivo} />
          </p>
          {c.esencial.avisos?.map((a, k) => (
            <p key={k} className="aviso chico">
              <Rich text={a.text} />
            </p>
          ))}

          <h2 className="print__h2">Lo que pregunta el profe</h2>
          <ol className="print__radar">
            {[...c.developments]
              .filter((d) => d.prio)
              .sort((a, b) => (a.prio ?? 'P9').localeCompare(b.prio ?? 'P9'))
              .map((d) => (
                <li key={d.id}>
                  <b>{d.prio}</b> <Rich text={d.question} /> {d.quote && <span className="muted">— {d.quote.text}</span>}
                </li>
              ))}
          </ol>

          <h2 className="print__h2">Sabete esto</h2>
          {c.esencial.bloques.map((b) => (
            <div key={b.titulo} className="print__bloque">
              <h4>
                {b.titulo} {b.prio && <ExamBadge prio={b.prio} />}
              </h4>
              <dl className="kv">
                {b.puntos.map((pt, k) => (
                  <div key={k} className="kv__row">
                    <dt>
                      <Rich text={pt.k} />
                    </dt>
                    <dd>
                      <Rich text={pt.v} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          <h2 className="print__h2">Cuadros</h2>
          {c.cuadros.map((q) => (
            <TablaCuadro key={q.id} q={q} />
          ))}

          <h2 className="print__h2">Desarrollos modelo</h2>
          {[...c.developments]
            .sort((a, b) => (a.prio ?? 'P9').localeCompare(b.prio ?? 'P9'))
            .map((d, i) => (
              <div key={d.id} className="print__dev">
                <h4>
                  {i + 1}. {d.prio && <ExamBadge prio={d.prio} />} <Rich text={d.question} />
                </h4>
                <Blocks blocks={d.answer} />
              </div>
            ))}

          <h2 className="print__h2">Memoria activa</h2>
          {c.memory.map((m) => (
            <div key={m.id} className="print__mem">
              <h4>{m.title}</h4>
              <Blocks blocks={m.evaluates} />
              <p className="print__hook">
                <b>Mnemotecnia: {m.mnemonic.hook}</b> — <Rich text={m.mnemonic.explain} />
              </p>
            </div>
          ))}

          <h2 className="print__h2">Errores que pueden aparecer en el examen</h2>
          <ul className="blist">
            {c.trampas.map((e, i) => (
              <li key={i}>
                <Rich text={e} />
              </li>
            ))}
          </ul>

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
      ))}
    </div>
  );
}
