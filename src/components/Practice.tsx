import { useMemo, useState } from 'react';
import type { Development, MCQ, MemoryItem } from '@/types';
import { Rich, Refs } from './Rich';
import { Blocks, PriorityBadge } from './Blocks';
import { Icon } from './Icon';
import { devDueLabel, devPending, lastAttempt, recordMcq, setDev, setMemory, useProgress } from '@/lib/progress';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const DIFF = { 1: 'Básica', 2: 'Intermedia', 3: 'Avanzada' } as const;

/* ───────────────────────── Choice ───────────────────────── */

export function McqCard({ q, chapterId, n }: { q: MCQ; chapterId: string; n: number }) {
  const progress = useProgress();
  const [choice, setChoice] = useState<number | null>(null);
  const history = progress.mcq[q.id]?.attempts ?? [];
  const answered = choice !== null;
  const correct = choice === q.answer;

  const pick = (i: number) => {
    if (answered) return;
    setChoice(i);
    recordMcq(q.id, chapterId, i, i === q.answer);
  };

  return (
    <article className={`mcq ${answered ? (correct ? 'is-correct' : 'is-wrong') : ''}`} id={`q-${q.id}`}>
      <header className="mcq__head">
        <span className="mcq__n">{n}</span>
        <span className={`chip chip--diff-${q.difficulty}`}>{DIFF[q.difficulty]}</span>
        {q.emphasis && (
          <span className="chip chip--emph" title="Tema que el profesor enfatiza para el examen">
            <Icon name="star" size={13} /> Énfasis del profesor
          </span>
        )}
        {q.integration && <span className="chip chip--integ">Integración</span>}
        <span className="mcq__topic">{q.topic}</span>
      </header>
      <div className="mcq__stem">
        <Rich text={q.stem} />
      </div>
      <ol className="mcq__opts" role="list">
        {q.options.map((o, i) => {
          const state = !answered ? '' : i === q.answer ? 'is-answer' : i === choice ? 'is-chosen' : 'is-dim';
          return (
            <li key={i}>
              <button type="button" className={`mcq__opt ${state}`} onClick={() => pick(i)} disabled={answered} aria-pressed={choice === i}>
                <span className="mcq__letter">{LETTERS[i]}</span>
                <span className="mcq__opt-text">
                  <Rich text={o.text} />
                </span>
                {answered && i === q.answer && <Icon name="check" size={18} />}
              </button>
            </li>
          );
        })}
      </ol>
      {answered && (
        <div className="mcq__feedback" role="status">
          <div className="mcq__verdict">{correct ? '¡Correcto!' : `Incorrecto — la respuesta es ${LETTERS[q.answer]}`}</div>
          <div className="mcq__why mcq__why--ok">
            <strong>Por qué {LETTERS[q.answer]} es correcta:</strong> <Rich text={q.options[q.answer].why} />
          </div>
          <details className="mcq__distractors" open={!correct}>
            <summary>Por qué las otras opciones no son la mejor respuesta</summary>
            <ul>
              {q.options.map((o, i) =>
                i === q.answer ? null : (
                  <li key={i} className={i === choice ? 'is-chosen' : ''}>
                    <strong>{LETTERS[i]}.</strong> <Rich text={o.why} />
                  </li>
                ),
              )}
            </ul>
          </details>
          <Refs refs={q.refs} />
          <button type="button" className="btn btn--soft btn--sm" onClick={() => setChoice(null)}>
            <Icon name="refresh" size={15} /> Reintentar
          </button>
        </div>
      )}
      {history.length > 0 && (
        <div className="mcq__hist">
          Historial: {history.length} intento{history.length === 1 ? '' : 's'} · {history.filter((h) => h.correct).length} correcto{history.filter((h) => h.correct).length === 1 ? '' : 's'}
          {history[history.length - 1] && !answered && (history[history.length - 1].correct ? ' · último: ✓' : ' · último: ✗')}
        </div>
      )}
    </article>
  );
}

export function QuizList({ questions, chapterOf }: { questions: MCQ[]; chapterOf: (q: MCQ) => string }) {
  const progress = useProgress();
  const [filter, setFilter] = useState<'all' | 'new' | 'wrong'>('all');
  const [seed, setSeed] = useState(0);
  const stats = useMemo(() => {
    let done = 0;
    let ok = 0;
    questions.forEach((q) => {
      const a = lastAttempt(progress, q.id);
      if (a) {
        done++;
        if (a.correct) ok++;
      }
    });
    return { done, ok };
  }, [progress, questions]);
  const list = questions.filter((q) => {
    const a = lastAttempt(progress, q.id);
    if (filter === 'new') return !a;
    if (filter === 'wrong') return a && !a.correct;
    return true;
  });
  return (
    <div className="quiz">
      <div className="quiz__bar">
        <div className="quiz__stats">
          <strong>{stats.done}</strong>/{questions.length} respondidas · <strong>{stats.ok}</strong> correctas en el último intento
        </div>
        <div className="seg" role="tablist" aria-label="Filtrar preguntas">
          {(
            [
              ['all', 'Todas'],
              ['new', 'Sin responder'],
              ['wrong', 'Erradas'],
            ] as const
          ).map(([k, l]) => (
            <button key={k} role="tab" aria-selected={filter === k} className={filter === k ? 'is-on' : ''} onClick={() => setFilter(k)}>
              {l}
            </button>
          ))}
        </div>
        <button className="btn btn--ghost btn--sm" onClick={() => setSeed((s) => s + 1)} title="Vuelve a mostrar todas las preguntas sin responder en esta sesión">
          <Icon name="refresh" size={15} /> Nueva vuelta
        </button>
      </div>
      {list.length === 0 && <p className="empty">No hay preguntas en este filtro. {filter === 'wrong' ? '¡No tenés preguntas erradas!' : ''}</p>}
      <div className="quiz__list" key={seed}>
        {list.map((q) => (
          <McqCard key={q.id} q={q} chapterId={chapterOf(q)} n={questions.indexOf(q) + 1} />
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── Desarrollos ───────────────────────── */

const PRIO_LABEL = { P0: 'P0 · Lo toma', P1: 'P1 · Muy remarcado', P2: 'P2 · Complementario' } as const;
export function ExamBadge({ prio }: { prio: 'P0' | 'P1' | 'P2' }) {
  return <span className={`xbadge xbadge--${prio}`}>{PRIO_LABEL[prio]}</span>;
}

export function DevCard({ d, chapterId, n }: { d: Development; chapterId: string; n: number }) {
  const progress = useProgress();
  const [open, setOpen] = useState(false);
  const rec = progress.devs[d.id];
  const status = rec?.status;
  return (
    <article className={`dev ${status ? `is-${status}` : ''}`} id={`d-${d.id}`}>
      <header className="dev__head">
        <span className="dev__n">{n}</span>
        {d.prio ? <ExamBadge prio={d.prio} /> : <PriorityBadge p={d.priority} />}
        {d.emphasis && (
          <span className="chip chip--emph">
            <Icon name="star" size={13} /> Lo enfatiza el profesor
          </span>
        )}
        <span className={`dev__status dev__status--${status ?? 'none'}`}>{devDueLabel(rec)}</span>
      </header>
      <h4 className="dev__q">
        <Rich text={d.question} />
      </h4>
      {d.quote && (
        <blockquote className="profquote">
          <Icon name="cap" size={16} />
          <span>{d.quote.text}</span>
          <Refs refs={d.quote.refs} label="Clase" />
        </blockquote>
      )}
      {!open ? (
        <button className="btn btn--primary" onClick={() => setOpen(true)}>
          <Icon name="eye" size={17} /> Ver desarrollo modelo
        </button>
      ) : (
        <>
          <div className="dev__answer">
            <div className="dev__answer-label">Desarrollo modelo</div>
            <Blocks blocks={d.answer} />
            {d.keyPoints && (
              <div className="dev__keys">
                <div className="dev__keys-title">
                  <Icon name="flag" size={15} /> Lo que no puede faltar en tu respuesta
                </div>
                <ul>
                  {d.keyPoints.map((k, i) => (
                    <li key={i}>
                      <Rich text={k} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Refs refs={d.refs} />
          </div>
          <div className="dev__actions" role="group" aria-label="Autoevaluación">
            <button className={`btn btn--known ${status === 'known' ? 'is-on' : ''}`} onClick={() => setDev(d.id, chapterId, true)}>
              <Icon name="check" size={17} /> Lo sabía
            </button>
            <button className={`btn btn--unknown ${status === 'unknown' ? 'is-on' : ''}`} onClick={() => setDev(d.id, chapterId, false)}>
              <Icon name="refresh" size={17} /> No lo sabía
            </button>
          </div>
          <button className="btn btn--ghost btn--sm" onClick={() => setOpen(false)}>
            Ocultar desarrollo
          </button>
        </>
      )}
    </article>
  );
}

export function DevList({ devs, chapterOf }: { devs: Development[]; chapterOf: (d: Development) => string }) {
  const progress = useProgress();
  const [onlyPending, setOnlyPending] = useState(false);
  const known = devs.filter((d) => progress.devs[d.id]?.status === 'known').length;
  const pending = devs.filter((d) => devPending(progress, d.id)).length;
  const list = onlyPending ? devs.filter((d) => devPending(progress, d.id)) : devs;
  return (
    <div className="devs">
      <div className="quiz__bar">
        <div className="quiz__stats">
          <strong>{known}</strong> dominados · <strong>{pending}</strong> por repasar (incluye los no marcados y los repasos vencidos)
        </div>
        <label className="switch">
          <input type="checkbox" checked={onlyPending} onChange={(e) => setOnlyPending(e.target.checked)} />
          <span>Solo los que todavía no domino</span>
        </label>
      </div>
      {list.length === 0 && <p className="empty">¡Todo dominado por ahora! Los desarrollos vuelven a aparecer cuando vence su repaso.</p>}
      {list.map((d) => (
        <DevCard key={d.id} d={d} chapterId={chapterOf(d)} n={devs.indexOf(d) + 1} />
      ))}
    </div>
  );
}

/* ───────────────────────── Memoria activa ───────────────────────── */

export function MemoryCard({ m, chapterId }: { m: MemoryItem; chapterId: string }) {
  const progress = useProgress();
  const [reveal, setReveal] = useState(false);
  const st = progress.memory[m.id]?.status;
  return (
    <article className="mem" id={`m-${m.id}`}>
      <h4 className="mem__title">{m.title}</h4>
      <div className="mem__grid">
        <div className="mem__cell">
          <div className="mem__label">1 · Para qué sirve</div>
          <Rich text={m.purpose} />
        </div>
        <div className="mem__cell mem__cell--wide">
          <div className="mem__label">2 · Qué elementos evalúa</div>
          <Blocks blocks={m.evaluates} />
        </div>
        <div className="mem__cell">
          <div className="mem__label">3 · Cómo interpretarlo</div>
          <Rich text={m.interpret} />
        </div>
        <div className="mem__cell mem__hook">
          <div className="mem__label">4 · Mnemotecnia</div>
          <div className="mem__hook-text">{m.mnemonic.hook}</div>
          <div className="mem__hook-explain">
            <Rich text={m.mnemonic.explain} />
          </div>
        </div>
      </div>
      <div className="mem__recall">
        <div className="mem__label">5 · Recuperación</div>
        <p className="mem__q">
          <Rich text={m.recall.q} />
        </p>
        {!reveal ? (
          <button className="btn btn--soft btn--sm" onClick={() => setReveal(true)}>
            Mostrar respuesta
          </button>
        ) : (
          <>
            <p className="mem__a">
              <Rich text={m.recall.a} />
            </p>
            <div className="dev__actions">
              <button className={`btn btn--known btn--sm ${st === 'known' ? 'is-on' : ''}`} onClick={() => setMemory(m.id, chapterId, true)}>
                <Icon name="check" size={15} /> Lo sabía
              </button>
              <button className={`btn btn--unknown btn--sm ${st === 'unknown' ? 'is-on' : ''}`} onClick={() => setMemory(m.id, chapterId, false)}>
                <Icon name="refresh" size={15} /> No lo sabía
              </button>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
