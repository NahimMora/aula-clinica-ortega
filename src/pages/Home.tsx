import { Link } from 'react-router-dom';
import { SYSTEMS, isAvailable, publishedChapters } from '@content/curriculum';
import { devPending, lastAttempt, useProgress } from '@/lib/progress';
import { Icon } from '@/components/Icon';

const PATH = [
  { icon: 'map', title: 'Ubicarme', text: 'Un mapa visual antes de cualquier definición.' },
  { icon: 'bulb', title: 'Comprender', text: 'Bases y mecanismos: el porqué de cada signo.' },
  { icon: 'route', title: 'Relacionar', text: 'Comparaciones, algoritmos y casos.' },
  { icon: 'sparkle', title: 'Memorizar y practicar', text: 'Choice, desarrollos modelo y mnemotecnias.' },
];

export function Home() {
  const progress = useProgress();
  const published = publishedChapters();
  const pendingDevs = Object.entries(progress.devs).filter(([id]) => devPending(progress, id)).length;
  const wrong = Object.keys(progress.mcq).filter((id) => {
    const a = lastAttempt(progress, id);
    return a && !a.correct;
  }).length;
  return (
    <div className="page home">
      <section className="hero">
        <div className="hero__text">
          <span className="hero__kicker">Semiología y Clínica Médica I · basada en las clases del Dr. Ortega</span>
          <h1>
            Estudiar para <em>entender</em>,<br />no para repetir frases sueltas.
          </h1>
          <p>
            Cada capítulo funciona como una clase completa: primero te ubicás, después comprendés el mecanismo, lo relacionás con la clínica y recién al final memorizás y practicás.
          </p>
          <div className="hero__cta">
            {progress.last ? (
              <Link className="btn btn--primary" to={progress.last.path}>
                <Icon name="play" size={16} /> Continuar: {progress.last.label}
              </Link>
            ) : published[0] ? (
              <Link className="btn btn--primary" to={`/capitulo/${published[0].id}`}>
                <Icon name="play" size={16} /> Empezar por {published[0].title}
              </Link>
            ) : (
              <Link className="btn btn--primary" to="/sistema/digestivo">
                <Icon name="map" size={16} /> Ver el programa
              </Link>
            )}
            <Link className="btn btn--soft" to="/maniobras">
              <Icon name="hand" size={16} /> Biblioteca de maniobras
            </Link>
          </div>
        </div>
        <ol className="hero__path" aria-label="Recorrido de estudio">
          {PATH.map((p, i) => (
            <li key={p.title}>
              <span className="hero__path-icon">
                <Icon name={p.icon} size={20} />
              </span>
              <div>
                <div className="hero__path-title">
                  {i + 1}. {p.title}
                </div>
                <div className="hero__path-text">{p.text}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {(pendingDevs > 0 || wrong > 0) && (
        <Link to="/repasar" className="review-banner">
          <Icon name="flag" size={18} />
          <span>
            Tenés <strong>{pendingDevs}</strong> desarrollo{pendingDevs === 1 ? '' : 's'} por repasar y <strong>{wrong}</strong> choice errada{wrong === 1 ? '' : 's'}.
          </span>
          <span className="review-banner__go">
            Ir a “Tengo que repasar” <Icon name="arrowRight" size={15} />
          </span>
        </Link>
      )}

      <h2 className="home__h">Sistemas</h2>
      <div className="systems">
        {SYSTEMS.map((s) => {
          const avail = s.chapters.filter(isAvailable);
          const done = s.chapters.filter((c) => progress.chapters[c.id]?.completed).length;
          return (
            <Link key={s.id} to={`/sistema/${s.id}`} className={`syscard tone-${s.tone}`}>
              <span className="syscard__icon">
                <Icon name={s.icon} size={26} />
              </span>
              <div className="syscard__title">{s.title}</div>
              <div className="syscard__sub">{s.subtitle}</div>
              <div className="syscard__foot">
                <span>
                  {avail.length}/{s.chapters.length} capítulos publicados
                </span>
                {done > 0 && <span>· {done} completado{done === 1 ? '' : 's'}</span>}
              </div>
              <span className="pbar pbar--thin">
                <span style={{ width: `${(avail.length / s.chapters.length) * 100}%` }} />
              </span>
            </Link>
          );
        })}
      </div>

      <div className="home__modes">
        <Link to="/practica" className="modecard">
          <Icon name="pen" size={22} />
          <div>
            <strong>Modo práctica</strong>
            <span>Choice y desarrollos de los capítulos publicados, con filtros por pendientes.</span>
          </div>
        </Link>
        <Link to="/examen" className="modecard">
          <Icon name="timer" size={22} />
          <div>
            <strong>Modo examen</strong>
            <span>Simulacro con tiempo, sin corrección hasta el final.</span>
          </div>
        </Link>
        <Link to="/progreso" className="modecard">
          <Icon name="chart" size={22} />
          <div>
            <strong>Mi progreso</strong>
            <span>Historial, marcadores y exportación de tu avance en JSON.</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
