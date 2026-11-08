import type { Chapter } from '@/types';
import { SummaryMap } from '@/components/ConceptMap';
import { McqCard } from '@/components/Practice';
import { Rich } from '@/components/Rich';
import { Icon } from '@/components/Icon';
import { devPending, lastAttempt, useProgress } from '@/lib/progress';

export function Closing({ c, simulacro = true, onPendiente }: { c: Chapter; simulacro?: boolean; onPendiente?: (tipo: 'choice' | 'desarrollo' | 'memoria', id: string) => void }) {
  const progress = useProgress();
  const now = Date.now();
  const pendingDevs = c.developments.filter((d) => progress.devs[d.id] && devPending(progress, d.id, now));
  const wrong = [...c.mcq, ...c.closing.miniExam].filter((q) => {
    const a = lastAttempt(progress, q.id);
    return a && !a.correct;
  });
  const mem = c.memory.filter((m) => progress.memory[m.id]?.status === 'unknown');
  const nothing = !pendingDevs.length && !wrong.length && !mem.length;
  return (
    <div className="closing">
      {(
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
      {simulacro && (
        <>
          <h3 className="closing__h">Mini simulacro</h3>
          <div className="quiz__list">
            {c.closing.miniExam.map((q, i) => (
              <McqCard key={q.id} q={q} chapterId={c.id} n={i + 1} />
            ))}
          </div>
        </>
      )}
      <h3 className="closing__h">Lo que todavía necesito repasar</h3>
      {nothing ? (
        <p className="empty">Todavía no hay pendientes registrados en este capítulo. Aparecen acá los desarrollos que marques como "No lo sabía", las choice que erraste y las tarjetas de memoria que no recordaste.</p>
      ) : (
        <ul className="pending">
          {pendingDevs.map((d) => (
            <li key={d.id}>
              <span className="chip">Desarrollo</span>
              <a href={`#d-${d.id}`} onClick={(e) => (e.preventDefault(), onPendiente ? onPendiente('desarrollo', `d-${d.id}`) : document.getElementById(`d-${d.id}`)?.scrollIntoView({ behavior: 'smooth' }))}>
                <Rich text={d.question} />
              </a>
            </li>
          ))}
          {wrong.map((q) => (
            <li key={q.id}>
              <span className="chip">Choice</span>
              <a href={`#q-${q.id}`} onClick={(e) => (e.preventDefault(), onPendiente ? onPendiente('choice', `q-${q.id}`) : document.getElementById(`q-${q.id}`)?.scrollIntoView({ behavior: 'smooth' }))}>
                {q.topic}
              </a>
            </li>
          ))}
          {mem.map((m) => (
            <li key={m.id}>
              <span className="chip">Memoria</span>
              <a href={`#m-${m.id}`} onClick={(e) => (e.preventDefault(), onPendiente ? onPendiente('memoria', `m-${m.id}`) : document.getElementById(`m-${m.id}`)?.scrollIntoView({ behavior: 'smooth' }))}>
                {m.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
