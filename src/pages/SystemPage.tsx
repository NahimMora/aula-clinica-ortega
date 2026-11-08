import { Link, useParams } from 'react-router-dom';
import { findSystem, isAvailable } from '@content/curriculum';
import { useProgress } from '@/lib/progress';
import { Icon } from '@/components/Icon';
import { asset } from '@/components/VideoPlayer';
import { NotFound } from './Misc';

export function SystemPage() {
  const { id } = useParams();
  const sys = id ? findSystem(id) : undefined;
  const progress = useProgress();
  if (!sys) return <NotFound />;
  const anyPublished = sys.chapters.some(isAvailable);
  return (
    <div className={`page sysp tone-${sys.tone}`}>
      <header className="sysp__head">
        <span className="sysp__icon">
          <Icon name={sys.icon} size={30} />
        </span>
        <div>
          <h1>{sys.title}</h1>
          <p className="sysp__sub">{sys.description}</p>
          <div className="sysp__actions">
            {anyPublished && sys.id !== 'maniobras' && sys.id !== 'soma' && (
              <Link className="btn btn--soft" to={`/manual/${sys.id}`}>
                <Icon name="book" size={16} /> Cuadros del sistema
              </Link>
            )}
            {anyPublished && sys.pdf && (
              <a className="btn btn--soft" href={asset(sys.pdf)} download>
                <Icon name="download" size={16} /> PDF integral
              </a>
            )}
            {(sys.id === 'maniobras' || sys.id === 'soma') && (
              <Link className="btn btn--soft" to="/maniobras">
                <Icon name="hand" size={16} /> Abrir la biblioteca de maniobras
              </Link>
            )}
          </div>
        </div>
      </header>
      <ol className="route">
        {sys.chapters.map((c, i) => {
          const avail = isAvailable(c);
          const pc = progress.chapters[c.id];
          return (
            <li key={c.id} className={`route__item ${avail ? '' : 'is-soon'} ${pc?.completed ? 'is-done' : ''}`}>
              <span className="route__n">{pc?.completed ? <Icon name="check" size={16} /> : i + 1}</span>
              <div className="route__card">
                <div className="route__top">
                  <span className="route__short">{c.short}</span>
                  {avail ? <span className="badge badge--ok">Disponible</span> : <span className="badge badge--soon">Próximamente</span>}
                </div>
                <h3>{avail ? <Link to={`/capitulo/${c.id}`}>{c.title}</Link> : c.title}</h3>
                <p>{c.blurb}</p>
                <div className="route__src">Fuentes: {c.sourcesLabel}</div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
