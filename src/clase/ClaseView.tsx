// Capítulo con clase visual: conserva la cabecera, la navegación y los componentes de práctica
// de la página clásica y agrega fisiopatología, diapositivas y video completo.
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { Chapter } from '@/types';
import { findSystem, neighbours } from '@content/curriculum';
import { temasDelCapitulo } from '@content/parcial/temario';
import { MapaArbol } from '@/components/ConceptMap';
import { Closing } from '@/components/Closing';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Icon } from '@/components/Icon';
import { ManeuverList } from '@/components/Maneuvers';
import { DevCard, DevList, McqCard, MemoryCard, QuizList } from '@/components/Practice';
import { Refs } from '@/components/Rich';
import { VideoPlayer } from '@/components/VideoPlayer';
import { lastAttempt, markVisited, setCompleted, setLast, useProgress } from '@/lib/progress';
import { Caso } from './Caso';
import { Visor } from './Visor';
import '@/styles/clase.css';

interface Tab {
  id: string;
  label: string;
  titulo: string;
}

function tabsDe(c: Chapter): Tab[] {
  const out: Tab[] = [
    { id: 'mapa', label: 'Mapa', titulo: 'Mapa conceptual' },
    { id: 'fisio', label: 'Fisiopatología', titulo: 'Fisiopatología' },
    { id: 'teoria', label: 'Diapositivas', titulo: 'Diapositivas' },
  ];
  if (c.clase?.video || c.clase?.repaso) out.push({ id: 'video', label: 'Video', titulo: 'Clase completa en video' });
  out.push({ id: 'choice', label: 'Choice', titulo: 'Choice' }, { id: 'desarrollo', label: 'Desarrollo', titulo: 'Desarrollo' }, { id: 'memoria', label: 'Memoria', titulo: 'Memoria' });
  if (c.maneuvers?.ids.length) out.push({ id: 'maniobras', label: 'Maniobras', titulo: 'Maniobras' });
  out.push({ id: 'cierre', label: 'Cierre', titulo: 'Cierre e integración' }, { id: 'simulacro', label: 'Simulacro', titulo: 'Simulacro final' });
  return out;
}

const leer = (k: string) => {
  try {
    return window.localStorage.getItem(k);
  } catch {
    return null;
  }
};
const guardar = (k: string, v: string) => {
  try {
    window.localStorage.setItem(k, v);
  } catch {
    /* sin persistencia */
  }
};

function Simulacro({ c }: { c: Chapter }) {
  const plan = c.clase!;
  const progress = useProgress();
  const [casos, setCasos] = useState<Record<string, boolean>>({});
  const preguntas = c.closing.miniExam;
  const respondidas = preguntas.map((q) => lastAttempt(progress, q.id)).filter(Boolean);
  const bien = respondidas.filter((a) => a?.correct).length + Object.values(casos).filter(Boolean).length;
  const total = preguntas.length + plan.casos.length;
  const hechas = respondidas.length + Object.keys(casos).length;
  const devs = plan.simulacroDesarrollos.map((id) => c.developments.find((d) => d.id === id)).filter((d): d is NonNullable<typeof d> => Boolean(d));
  return (
    <div className="simulacro">
      <p className="simulacro__marca" role="status">
        <strong>
          {bien} de {hechas}
        </strong>{' '}
        correctas · {hechas} de {total} respondidas
      </p>
      <h3 className="closing__h">Casos clínicos</h3>
      <div className="casos">
        {plan.casos.map((x) => (
          <Caso key={x.id} caso={x} onRespuesta={(ok) => setCasos((p) => ({ ...p, [x.id]: ok }))} />
        ))}
      </div>
      <h3 className="closing__h">Choice integrador</h3>
      <div className="quiz__list">
        {preguntas.map((q, i) => (
          <McqCard key={q.id} q={q} chapterId={c.id} n={i + 1} />
        ))}
      </div>
      <h3 className="closing__h">Desarrollos del examen</h3>
      <div className="devs">
        {devs.map((d, i) => (
          <DevCard key={d.id} d={d} chapterId={c.id} n={i + 1} />
        ))}
      </div>
    </div>
  );
}

export default function ClaseView({ c }: { c: Chapter }) {
  const plan = c.clase!;
  const [params, setParams] = useSearchParams();
  const progress = useProgress();
  const pc = progress.chapters[c.id];
  const sys = findSystem(c.systemId);
  const nb = neighbours(c.id);
  const tabs = useMemo(() => tabsDe(c), [c]);
  const clave = `aula:clase:${c.id}:pestana`;
  const valida = useCallback((t: string | null) => (t && tabs.some((x) => x.id === t) ? t : null), [tabs]);

  // Enlaces previos: ?s=seccion o ?s=q-… / d-… desde buscador, marcadores y repaso.
  const destino = useMemo(() => {
    const s = params.get('s');
    if (!s) return null;
    const a = plan.anclas[s] ?? plan.anclas[s.replace(/^t-/, '')];
    if (a) return a;
    if (s.startsWith('q-')) return { tab: 'choice' };
    if (s.startsWith('d-')) return { tab: 'desarrollo' };
    if (s.startsWith('m-')) return { tab: 'memoria' };
    return null;
  }, [params, plan]);

  const tab = valida(params.get('t')) ?? destino?.tab ?? valida(leer(clave)) ?? tabs[0].id;
  const idx = Math.max(0, tabs.findIndex((x) => x.id === tab));
  const actual = tabs[idx];
  const [ancla, setAncla] = useState<string | null>(null);
  const vistas = tabs.filter((x) => pc?.visited.includes(x.id)).length;
  const parcial = useMemo(() => temasDelCapitulo(c.id), [c.id]);
  const pct = Math.round((vistas / tabs.length) * 100);

  const irA = useCallback(
    (t: string, id?: string) => {
      setAncla(id ?? null);
      setParams({ t }, { replace: false });
    },
    [setParams],
  );

  useEffect(() => {
    setLast(`/capitulo/${c.id}`, c.title);
  }, [c.id, c.title]);

  useEffect(() => {
    markVisited(c.id, actual.id);
    guardar(clave, actual.id);
  }, [actual.id, c.id, clave]);

  useEffect(() => {
    const s = params.get('s');
    const id = ancla ?? (s && /^[qdm]-/.test(s) ? s : null);
    if (!id) return;
    const h = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 180);
    return () => window.clearTimeout(h);
  }, [ancla, params, actual.id]);

  const ant = tabs[idx - 1];
  const sig = tabs[idx + 1];

  return (
    <article className={`chapter clase tone-${sys?.tone ?? 'rose'}`}>
      <header className="chero">
        <div className="chero__crumbs">
          <Link to="/">Inicio</Link> <Icon name="chevronRight" size={14} /> {sys && <Link to={`/sistema/${sys.id}`}>{sys.title}</Link>}
        </div>
        <h1 className="chero__title">{c.title}</h1>
        <div className="chero__meta">
          <span>
            <Icon name="pen" size={15} /> {c.mcq.length} choice · {c.developments.length} desarrollos
          </span>
          {plan.video && (
            <span>
              <Icon name="video" size={15} /> Clase {plan.video.duration}
            </span>
          )}
          <span className="chero__progress" title="Pestañas recorridas">
            <span className="pbar">
              <span style={{ width: `${pct}%` }} />
            </span>
            {pct}% recorrido
          </span>
        </div>
        {parcial.length > 0 && (
          <p className="ptema-aviso">
            <Icon name="flag" size={15} /> Entra en el parcial del lunes:
            {parcial.map((t) => (
              <Link key={t.id} to={`/parcial/${t.sistema}?t=${t.id}`}>
                {t.titulo}
              </Link>
            ))}
          </p>
        )}
      </header>

      <nav className="secnav" aria-label="Secciones del capítulo">
        {tabs.map((x, i) => (
          <button key={x.id} type="button" className={`secnav__item ${x.id === tab ? 'is-on' : ''} ${pc?.visited.includes(x.id) ? 'is-seen' : ''}`} aria-current={x.id === tab ? 'page' : undefined} onClick={() => irA(x.id)}>
            <span className="secnav__letter">{i + 1}</span>
            <span className="secnav__label">{x.label}</span>
          </button>
        ))}
      </nav>

      <div className="chapter__body">
        <section className={`csec csec--${actual.id} clase__panel`} key={actual.id}>
          <h2 className="clase__h">{actual.titulo}</h2>
          <ErrorBoundary label={`la sección «${actual.titulo}»`}>
            {actual.id === 'mapa' && <MapaArbol data={c.map} arbol={plan.mapa} />}
            {actual.id === 'fisio' && <Visor mazo={plan.fisio} chapterId={c.id} diapoPedida={params.get('d') ?? undefined} />}
            {actual.id === 'teoria' && (
              <Visor mazo={plan.teoria} chapterId={c.id} seccionPedida={destino?.tab === 'teoria' ? destino.seccion : undefined} diapoPedida={params.get('d') ?? undefined} />
            )}
            {actual.id === 'video' && (
              <>
                {plan.video ? <VideoPlayer video={plan.video} title={c.title} /> : <p className="empty">La clase completa todavía no está disponible.</p>}
                {plan.repaso && (
                  <details className="clase__repaso">
                    <summary>Video breve de repaso ({plan.repaso.duration}): no reemplaza a la clase</summary>
                    <VideoPlayer video={plan.repaso} title={`${c.title}: repaso`} />
                  </details>
                )}
              </>
            )}
            {actual.id === 'choice' && <QuizList questions={c.mcq} chapterOf={() => c.id} />}
            {actual.id === 'desarrollo' && <DevList devs={c.developments} chapterOf={() => c.id} />}
            {actual.id === 'memoria' && (
              <div className="mem-list">
                {c.memory.map((m) => (
                  <MemoryCard key={m.id} m={m} chapterId={c.id} />
                ))}
              </div>
            )}
            {actual.id === 'maniobras' && c.maneuvers && (
              <>
                <p className="clase__nota">
                  Introducción práctica: la explicación completa está en la <Link to="/maniobras">biblioteca de maniobras</Link>.
                </p>
                <ManeuverList ids={c.maneuvers.ids} />
              </>
            )}
            {actual.id === 'cierre' && (
              <Closing
                c={c}
                simulacro={false}
                onPendiente={(tipo, id) => irA(tipo === 'choice' ? 'choice' : tipo === 'desarrollo' ? 'desarrollo' : 'memoria', id)}
              />
            )}
            {actual.id === 'simulacro' && <Simulacro c={c} />}
          </ErrorBoundary>
          {actual.id === 'mapa' && <Refs refs={c.sources} label="Basado en" />}
        </section>

        <nav className="clase__pie" aria-label="Pestaña anterior y siguiente">
          {ant ? (
            <button type="button" onClick={() => irA(ant.id)}>
              <Icon name="chevronLeft" size={16} /> {ant.label}
            </button>
          ) : (
            <span />
          )}
          {sig && (
            <button type="button" className="is-sig" onClick={() => irA(sig.id)}>
              {sig.label} <Icon name="chevronRight" size={16} />
            </button>
          )}
        </nav>

        {!sig && (
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
        )}
      </div>
    </article>
  );
}
