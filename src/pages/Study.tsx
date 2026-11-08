import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Chapter, MCQ } from '@/types';
import { useAllPublished } from '@/lib/useChapter';
import { devPending, lastAttempt, recordExam, recordMcq, useProgress } from '@/lib/progress';
import { DevList, MemoryCard, QuizList } from '@/components/Practice';
import { Rich } from '@/components/Rich';
import { Icon } from '@/components/Icon';
import { Loading } from './Misc';

function NoChapters() {
  return <p className="empty">Todavía no hay capítulos publicados. Apenas se publique el primero, sus preguntas aparecen acá.</p>;
}

function ChapterPicker({ chapters, selected, onChange }: { chapters: Chapter[]; selected: string[]; onChange: (ids: string[]) => void }) {
  return (
    <div className="picker">
      {chapters.map((c) => (
        <label key={c.id} className={`picker__item ${selected.includes(c.id) ? 'is-on' : ''}`}>
          <input type="checkbox" checked={selected.includes(c.id)} onChange={(e) => onChange(e.target.checked ? [...selected, c.id] : selected.filter((x) => x !== c.id))} />
          {c.title}
        </label>
      ))}
    </div>
  );
}

/* ───────────────────────── Modo práctica ───────────────────────── */

export function PracticePage() {
  const chapters = useAllPublished();
  const [sel, setSel] = useState<string[] | null>(null);
  const [tab, setTab] = useState<'choice' | 'dev' | 'mem'>('choice');
  useEffect(() => {
    if (chapters && sel === null) setSel(chapters.map((c) => c.id));
  }, [chapters, sel]);
  if (!chapters || sel === null) return <Loading />;
  const chosen = chapters.filter((c) => sel.includes(c.id));
  const owner = new Map<string, string>();
  chosen.forEach((c) => [...c.mcq, ...c.developments, ...c.memory].forEach((x) => owner.set(x.id, c.id)));
  const mcq = chosen.flatMap((c) => c.mcq).sort((a, b) => a.difficulty - b.difficulty);
  return (
    <div className="page page--narrow">
      <h1>Modo práctica</h1>
      <p className="muted">Elegí los capítulos y practicá. Todo lo que respondas queda registrado en tu historial.</p>
      {chapters.length === 0 ? (
        <NoChapters />
      ) : (
        <>
          <ChapterPicker chapters={chapters} selected={sel} onChange={setSel} />
          <div className="seg seg--wide" role="tablist">
            <button role="tab" aria-selected={tab === 'choice'} className={tab === 'choice' ? 'is-on' : ''} onClick={() => setTab('choice')}>
              Choice ({mcq.length})
            </button>
            <button role="tab" aria-selected={tab === 'dev'} className={tab === 'dev' ? 'is-on' : ''} onClick={() => setTab('dev')}>
              Desarrollos ({chosen.reduce((n, c) => n + c.developments.length, 0)})
            </button>
            <button role="tab" aria-selected={tab === 'mem'} className={tab === 'mem' ? 'is-on' : ''} onClick={() => setTab('mem')}>
              Memoria ({chosen.reduce((n, c) => n + c.memory.length, 0)})
            </button>
          </div>
          {tab === 'choice' && <QuizList questions={mcq} chapterOf={(q) => owner.get(q.id) ?? ''} />}
          {tab === 'dev' && <DevList devs={chosen.flatMap((c) => c.developments)} chapterOf={(d) => owner.get(d.id) ?? ''} />}
          {tab === 'mem' && (
            <div className="mem-list">
              {chosen.flatMap((c) => c.memory.map((m) => <MemoryCard key={m.id} m={m} chapterId={c.id} />))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ───────────────────────── Modo examen ───────────────────────── */

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

export function ExamPage() {
  const chapters = useAllPublished();
  const [sel, setSel] = useState<string[] | null>(null);
  const [count, setCount] = useState(15);
  const [exam, setExam] = useState<{ qs: { q: MCQ; ch: string }[]; answers: (number | null)[]; start: number; done: boolean } | null>(null);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (chapters && sel === null) setSel(chapters.map((c) => c.id));
  }, [chapters, sel]);
  useEffect(() => {
    if (!exam || exam.done) return;
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, [exam]);
  if (!chapters || sel === null) return <Loading />;
  const pool = chapters.filter((c) => sel.includes(c.id)).flatMap((c) => [...c.mcq, ...c.closing.miniExam].map((q) => ({ q, ch: c.id })));
  const limit = exam ? exam.qs.length * 60_000 : 0;
  const elapsed = exam ? now - exam.start : 0;
  const remaining = Math.max(0, limit - elapsed);

  const finish = () => {
    if (!exam || exam.done) return;
    const correct = exam.qs.filter((x, i) => exam.answers[i] === x.q.answer).length;
    exam.qs.forEach((x, i) => {
      const a = exam.answers[i];
      if (a !== null) recordMcq(x.q.id, x.ch, a, a === x.q.answer);
    });
    recordExam({ at: Date.now(), total: exam.qs.length, correct, seconds: Math.round((Date.now() - exam.start) / 1000), chapterIds: [...new Set(exam.qs.map((x) => x.ch))] });
    setExam({ ...exam, done: true });
  };
  if (exam && !exam.done && remaining <= 0) finish();

  if (!exam)
    return (
      <div className="page page--narrow">
        <h1>Modo examen</h1>
        <p className="muted">Simulacro con un minuto por pregunta. No hay corrección hasta que termines: al final ves tu puntaje y la explicación de cada respuesta.</p>
        {chapters.length === 0 ? (
          <NoChapters />
        ) : (
          <>
            <ChapterPicker chapters={chapters} selected={sel} onChange={setSel} />
            <label className="field">
              Cantidad de preguntas
              <input type="range" min={5} max={Math.max(5, Math.min(40, pool.length))} value={Math.min(count, pool.length)} onChange={(e) => setCount(Number(e.target.value))} />
              <strong>{Math.min(count, pool.length)}</strong>
            </label>
            <button
              className="btn btn--primary"
              disabled={pool.length === 0}
              onClick={() => {
                const qs = shuffle(pool).slice(0, Math.min(count, pool.length));
                setExam({ qs, answers: qs.map(() => null), start: Date.now(), done: false });
                setNow(Date.now());
              }}
            >
              <Icon name="timer" size={17} /> Comenzar simulacro
            </button>
          </>
        )}
      </div>
    );

  const correct = exam.qs.filter((x, i) => exam.answers[i] === x.q.answer).length;
  return (
    <div className="page page--narrow">
      <div className="exam__bar">
        <strong>{exam.done ? 'Resultado' : 'Simulacro en curso'}</strong>
        {!exam.done ? (
          <span className={`exam__timer ${remaining < 60_000 ? 'is-low' : ''}`}>
            <Icon name="timer" size={16} /> {Math.floor(remaining / 60000)}:{String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0')}
          </span>
        ) : (
          <span className="exam__score">
            {correct}/{exam.qs.length} · {Math.round((correct / exam.qs.length) * 100)}%
          </span>
        )}
        {!exam.done ? (
          <button className="btn btn--primary btn--sm" onClick={finish}>
            Entregar
          </button>
        ) : (
          <button className="btn btn--soft btn--sm" onClick={() => setExam(null)}>
            Nuevo simulacro
          </button>
        )}
      </div>
      <ol className="exam__list">
        {exam.qs.map((x, i) => {
          const a = exam.answers[i];
          return (
            <li key={x.q.id + i} className={`mcq ${exam.done ? (a === x.q.answer ? 'is-correct' : 'is-wrong') : ''}`}>
              <div className="mcq__stem">
                <span className="mcq__n">{i + 1}</span> <Rich text={x.q.stem} />
              </div>
              <ol className="mcq__opts">
                {x.q.options.map((o, j) => {
                  const st = exam.done ? (j === x.q.answer ? 'is-answer' : j === a ? 'is-chosen' : 'is-dim') : a === j ? 'is-picked' : '';
                  return (
                    <li key={j}>
                      <button
                        className={`mcq__opt ${st}`}
                        disabled={exam.done}
                        onClick={() => {
                          const answers = [...exam.answers];
                          answers[i] = j;
                          setExam({ ...exam, answers });
                        }}
                      >
                        <span className="mcq__letter">{'ABCDE'[j]}</span>
                        <span className="mcq__opt-text">
                          <Rich text={o.text} />
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
              {exam.done && (
                <div className="mcq__feedback">
                  <div className="mcq__why mcq__why--ok">
                    <strong>Respuesta {'ABCDE'[x.q.answer]}:</strong> <Rich text={x.q.options[x.q.answer].why} />
                  </div>
                  {a !== null && a !== x.q.answer && (
                    <div className="mcq__why">
                      <strong>Tu opción ({'ABCDE'[a]}):</strong> <Rich text={x.q.options[a].why} />
                    </div>
                  )}
                  {a === null && <div className="mcq__why">Sin responder.</div>}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ───────────────────────── Tengo que repasar ───────────────────────── */

export function ReviewPage() {
  const progress = useProgress();
  const chapters = useAllPublished();
  const data = useMemo(() => {
    if (!chapters) return null;
    return chapters
      .map((c) => ({
        c,
        devs: c.developments.filter((d) => progress.devs[d.id] && devPending(progress, d.id)),
        mcq: [...c.mcq, ...c.closing.miniExam].filter((q) => {
          const a = lastAttempt(progress, q.id);
          return a && !a.correct;
        }),
        mem: c.memory.filter((m) => progress.memory[m.id]?.status === 'unknown'),
      }))
      .filter((x) => x.devs.length || x.mcq.length || x.mem.length);
  }, [chapters, progress]);
  if (!data) return <Loading />;
  return (
    <div className="page page--narrow">
      <h1>Tengo que repasar</h1>
      <p className="muted">
        Se arma solo: desarrollos marcados como “No lo sabía” (o con el repaso vencido), choice cuyo último intento fue incorrecto y tarjetas de memoria que no recordaste.
      </p>
      {data.length === 0 && <p className="empty">No tenés pendientes registrados. Cuando practiques, lo que necesites reforzar aparece acá.</p>}
      {data.map(({ c, devs, mcq, mem }) => (
        <section key={c.id} className="review">
          <h2>
            <Link to={`/capitulo/${c.id}`}>{c.title}</Link>
          </h2>
          {devs.length > 0 && (
            <>
              <h3 className="review__h">Desarrollos ({devs.length})</h3>
              <DevList devs={devs} chapterOf={() => c.id} />
            </>
          )}
          {mcq.length > 0 && (
            <>
              <h3 className="review__h">Choice para rehacer ({mcq.length})</h3>
              <QuizList questions={mcq} chapterOf={() => c.id} />
            </>
          )}
          {mem.length > 0 && (
            <>
              <h3 className="review__h">Memoria ({mem.length})</h3>
              <div className="mem-list">
                {mem.map((m) => (
                  <MemoryCard key={m.id} m={m} chapterId={c.id} />
                ))}
              </div>
            </>
          )}
        </section>
      ))}
    </div>
  );
}
