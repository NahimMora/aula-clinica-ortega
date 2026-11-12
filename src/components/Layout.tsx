import { useEffect, useState, type FormEvent } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { InstalarApp } from './InstalarApp';
import { SYSTEMS, isAvailable } from '@content/curriculum';
import { useProgress } from '@/lib/progress';
import { Icon } from './Icon';
import { ErrorBoundary } from './ErrorBoundary';

const NAV = [
  { to: '/', label: 'Inicio', icon: 'home', end: true },
  { to: '/practica', label: 'Práctica', icon: 'pen' },
  { to: '/examen', label: 'Examen', icon: 'timer' },
  { to: '/maniobras', label: 'Maniobras', icon: 'hand' },
  { to: '/repasar', label: 'Tengo que repasar', icon: 'flag' },
  { to: '/progreso', label: 'Progreso', icon: 'chart' },
];

/** Apartado «Parcial del lunes», arriba de todo en la columna: temario recortado del repaso del 11/11. */
const PARCIAL = [
  { to: '/parcial', label: 'Temario y cómo responder' },
  { to: '/parcial/digestivo', label: 'Aparato digestivo' },
  { to: '/parcial/renal', label: 'Aparato renal' },
  { to: '/parcial/neuro', label: 'Sistema nervioso' },
  { to: '/parcial/soma', label: 'SOMA' },
  { to: '/parcial/maniobras', label: 'Maniobras y puntos dolorosos' },
];

/** Choice del parcial, una entrada por sistema. */
const PARCIAL_CHOICE = [
  { s: 'digestivo', label: 'Digestivo' },
  { s: 'renal', label: 'Renal' },
  { s: 'neuro', label: 'Neurología' },
  { s: 'soma', label: 'SOMA' },
];

/** Preguntas de examen del parcial, una entrada por sistema (banco del parcial con respuesta en tres niveles). */
const PARCIAL_PREGUNTAS = [
  { s: 'digestivo', label: 'Digestivo' },
  { s: 'renal', label: 'Renal' },
  { s: 'neuro', label: 'Neurología' },
  { s: 'soma', label: 'SOMA' },
  { s: 'integracion', label: 'Integración' },
  { s: 'simulacro', label: 'Simulacro oral' },
];

/** Apartado «Preguntas de examen» de la columna: oral más reciente y un acceso por sistema. */
const PREGUNTAS = [
  { s: 'oral-2026-11-10', label: 'Lo que tomó el martes 10/11' },
  { s: 'digestivo', label: 'Digestivo' },
  { s: 'renal', label: 'Nefrourológico' },
  { s: 'neuro', label: 'Neurología' },
  { s: 'soma', label: 'Soma y maniobras' },
];

export function Layout() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [loc.pathname]);
  useEffect(() => {
    setOpen(false);
  }, [loc.pathname, loc.search]);
  return (
    <div className={`shell ${open ? 'is-menu-open' : ''}`}>
      <a className="skip" href="#main">
        Saltar al contenido
      </a>
      <TopBar onMenu={() => setOpen((o) => !o)} menuOpen={open} />
      <div className="shell__body">
        <Sidebar />
        <div className="shell__scrim" onClick={() => setOpen(false)} aria-hidden="true" />
        <main id="main" className="shell__main">
          <ErrorBoundary key={loc.pathname} label="esta página">
            <Outlet />
          </ErrorBoundary>
          <footer className="foot">
            <p>
              <strong>Aula Clínica — Semiología I</strong> · Material de estudio original elaborado a partir de las clases del Dr. Ortega y su libro de Clínica Médica I. No reemplaza la bibliografía ni la consulta
              docente. Las grabaciones, transcripciones y el libro no se publican aquí.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

function TopBar({ onMenu, menuOpen }: { onMenu: () => void; menuOpen: boolean }) {
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (q.trim()) nav(`/buscar?q=${encodeURIComponent(q.trim())}`);
  };
  return (
    <header className="topbar">
      <button className="topbar__menu" onClick={onMenu} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}>
        <Icon name={menuOpen ? 'close' : 'menu'} />
      </button>
      <Link to="/" className="brand" aria-label="Aula Clínica — inicio">
        <span className="brand__mark" aria-hidden="true">
          <Icon name="stethoscope" size={20} />
        </span>
        <span className="brand__text">
          <span className="brand__name">Aula Clínica</span>
          <span className="brand__sub">Semiología I</span>
        </span>
      </Link>
      <nav className="topnav" aria-label="Secciones">
        {NAV.slice(1).map((n) => (
          <NavLink key={n.to} to={n.to} className="topnav__link">
            <Icon name={n.icon} size={16} />
            <span>{n.label}</span>
          </NavLink>
        ))}
      </nav>
      <form className="search" role="search" onSubmit={submit}>
        <Icon name="search" size={17} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar en la teoría…" aria-label="Buscar contenido" />
      </form>
    </header>
  );
}

function Sidebar() {
  const progress = useProgress();
  const loc = useLocation();
  return (
    <aside className="sidebar" aria-label="Programa">
      <InstalarApp />
      <nav className="sidebar__nav sidebar__nav--mobile">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className="sidebar__link">
            <Icon name={n.icon} size={17} /> {n.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar__sys sidebar__parcial tone-red">
        <NavLink to="/parcial" end className="sidebar__sys-title">
          <span className="sidebar__sys-icon">
            <Icon name="flag" size={17} />
          </span>
          Parcial del lunes
        </NavLink>
        <ul>
          {PARCIAL.slice(1).map((p) => (
            <li key={p.to}>
              <NavLink to={p.to} className="sidebar__ch">
                <span className="dot" aria-hidden="true" />
                <span>{p.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="sidebar__subtit">
          <Icon name="check" size={14} /> Choice
        </div>
        <ul>
          {PARCIAL_CHOICE.map((p) => {
            const on = loc.pathname === '/parcial/choice' && (new URLSearchParams(loc.search).get('s') ?? 'digestivo') === p.s;
            return (
              <li key={p.s}>
                <Link to={`/parcial/choice?s=${p.s}`} className={`sidebar__ch ${on ? 'active' : ''}`} aria-current={on ? 'page' : undefined}>
                  <span className="dot" aria-hidden="true" />
                  <span>{p.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="sidebar__subtit">
          <Icon name="target" size={14} /> Preguntas de examen
        </div>
        <ul>
          {PARCIAL_PREGUNTAS.map((p) => {
            const on = loc.pathname === '/parcial/preguntas' && (new URLSearchParams(loc.search).get('s') ?? 'digestivo') === p.s;
            return (
              <li key={p.s}>
                <Link to={`/parcial/preguntas?s=${p.s}`} className={`sidebar__ch ${on ? 'active' : ''}`} aria-current={on ? 'page' : undefined}>
                  <span className="dot" aria-hidden="true" />
                  <span>{p.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {SYSTEMS.map((s) => (
        <div key={s.id} className={`sidebar__sys tone-${s.tone}`}>
          <NavLink to={`/sistema/${s.id}`} className="sidebar__sys-title">
            <span className="sidebar__sys-icon">
              <Icon name={s.icon} size={17} />
            </span>
            {s.title}
          </NavLink>
          <ul>
            {s.chapters.map((c) => {
              const avail = isAvailable(c);
              const pc = progress.chapters[c.id];
              return (
                <li key={c.id}>
                  {c.link ? (
                    <NavLink to={c.link} className="sidebar__ch">
                      <span className="dot" aria-hidden="true" />
                      <span>{c.title}</span>
                    </NavLink>
                  ) : avail ? (
                    <NavLink to={`/capitulo/${c.id}`} className="sidebar__ch">
                      <span className={`dot ${pc?.completed ? 'dot--done' : pc ? 'dot--started' : ''}`} aria-hidden="true" />
                      <span>{c.title}</span>
                    </NavLink>
                  ) : (
                    <span className="sidebar__ch is-soon" title="Próximamente">
                      <span className="dot dot--soon" aria-hidden="true" />
                      <span>{c.title}</span>
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <div className="sidebar__sys tone-gold">
        <NavLink to="/preguntas" className="sidebar__sys-title">
          <span className="sidebar__sys-icon">
            <Icon name="alert" size={17} />
          </span>
          Preguntas de examen
        </NavLink>
        <ul>
          {PREGUNTAS.map((p) => (
            <li key={p.s}>
              <Link to={`/preguntas?s=${p.s}`} className="sidebar__ch">
                <span className="dot" aria-hidden="true" />
                <span>{p.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
