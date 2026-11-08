// Página de capítulo por pestañas numeradas (piloto Aula Clínica 2.0).
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { Chapter } from '@/types';
import { findSystem, neighbours } from '@content/curriculum';
import { ConceptMap } from '@/components/ConceptMap';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Icon } from '@/components/Icon';
import { Refs } from '@/components/Rich';
import { markVisited, setCompleted, setLast, useProgress } from '@/lib/progress';
import { BloquesEstudio, contieneId, EstudioCtx } from './bloques';
import type { PlanEstudio } from './tipos';
import '@/styles/estudio.css';

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
    /* sin persistencia: la navegación sigue funcionando */
  }
};

/** Traduce ?s=… de enlaces anteriores (buscador, marcadores, repaso) a pestaña y sección. */
function ubicar(plan: PlanEstudio, s: string | null): { tab: string; seccion?: string } | null {
  if (!s) return null;
  const a = plan.anclas[s] ?? plan.anclas[s.replace(/^t-/, '')];
  if (a) return a;
  const id = s.replace(/^[qd]-/, '');
  for (const p of plan.pestanas) {
    const r = contieneId(p.bloques, id);
    if (r.encontrado) return { tab: p.id, seccion: r.seccion };
  }
  return null;
}

export default function StudyView({ c }: { c: Chapter }) {
  const plan = c.estudio!;
  const [params, setParams] = useSearchParams();
  const progress = useProgress();
  const pc = progress.chapters[c.id];
  const sys = findSystem(c.systemId);
  const nb = neighbours(c.id);
  const clave = `aula2:pestana:${c.id}`;
  const destino = useMemo(() => ubicar(plan, params.get('s')), [plan, params]);
  const valida = (t: string | null) => (t && plan.pestanas.some((p) => p.id === t) ? t : null);
  const tab = valida(params.get('t')) ?? destino?.tab ?? valida(leer(clave)) ?? plan.pestanas[0].id;
  const [seccion, setSeccion] = useState<string | undefined>(destino?.seccion);
  const [repaso, setRepaso] = useState(() => leer('aula2:repaso') === '1');
  const idx = Math.max(0, plan.pestanas.findIndex((p) => p.id === tab));
  const actual = plan.pestanas[idx];
  const raiz = useRef<HTMLDivElement>(null);
  const barra = useRef<HTMLElement>(null);
  const primera = useRef(true);
  const vistas = plan.pestanas.filter((p) => pc?.visited.includes(p.id)).length;

  const irA = useCallback(
    (t: string, s?: string) => {
      setSeccion(s);
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
    barra.current?.querySelector('.is-on')?.scrollIntoView({ block: 'nearest', inline: 'center' });
    if (primera.current) {
      primera.current = false;
      return;
    }
    const y = (raiz.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 64;
    window.scrollTo({ top: Math.max(0, y), behavior: 'auto' });
  }, [actual.id, c.id, clave]);

  useEffect(() => {
    if (destino?.seccion) setSeccion(destino.seccion);
  }, [destino]);

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.altKey || e.ctrlKey || e.metaKey || /^(INPUT|TEXTAREA|SELECT|VIDEO|IFRAME)$/.test(el.tagName)) return;
      if (e.key === 'ArrowRight' && idx < plan.pestanas.length - 1) irA(plan.pestanas[idx + 1].id);
      if (e.key === 'ArrowLeft' && idx > 0) irA(plan.pestanas[idx - 1].id);
    };
    window.addEventListener('keydown', tecla);
    return () => window.removeEventListener('keydown', tecla);
  }, [idx, irA, plan.pestanas]);

  const alternarRepaso = () => {
    guardar('aula2:repaso', repaso ? '0' : '1');
    setRepaso(!repaso);
  };

  const ant = plan.pestanas[idx - 1];
  const sig = plan.pestanas[idx + 1];
  const seq = useMemo(() => Object.fromEntries(plan.mapa.map((m) => [m.id, plan.pestanas.find((p) => p.id === m.tab)?.n ?? ''])), [plan]);
  const datosMapa = useMemo(() => ({ ...c.map, branches: plan.mapa.map(({ id, label, tone, items }) => ({ id, label, tone, items })) }), [c.map, plan]);

  return (
    <EstudioCtx.Provider value={{ c, repaso, irA, seccionPedida: seccion }}>
      <div className={`estudio ${repaso ? 'is-repaso' : ''}`} ref={raiz}>
        <header className="e-cab">
          <div>
            <p className="e-migas">
              <Link to="/">Inicio</Link>
              <Icon name="chevronRight" size={12} />
              {sys && <Link to={`/sistema/${sys.id}`}>{sys.title}</Link>}
            </p>
            <h1>{c.title}</h1>
          </div>
          <div className="e-cab__der">
            <label className="e-interruptor">
              <input type="checkbox" checked={repaso} onChange={alternarRepaso} />
              <span aria-hidden="true" />
              Modo repaso
            </label>
            <span className="e-avance" title="Pestañas recorridas">
              {vistas} de {plan.pestanas.length}
            </span>
          </div>
        </header>

        <nav className="e-tabs" aria-label="Secciones del capítulo" ref={barra}>
          <div className="e-tabs__l">
            {plan.pestanas.map((p) => (
              <button key={p.id} type="button" className={`${p.id === tab ? 'is-on' : ''} ${pc?.visited.includes(p.id) ? 'is-vista' : ''}`} aria-current={p.id === tab ? 'page' : undefined} onClick={() => irA(p.id)}>
                <span className="e-tabs__n">{p.n}</span>
                {p.label}
              </button>
            ))}
          </div>
          <span className="e-tabs__prog" style={{ width: `${(vistas / plan.pestanas.length) * 100}%` }} />
        </nav>

        <main className="e-pest" key={actual.id}>
          <h2>
            <span className="e-pest__n">{actual.n}</span>
            {actual.titulo}
          </h2>
          <ErrorBoundary label={`la sección «${actual.titulo}»`}>
            {actual.id === plan.pestanas[0].id ? (
              <div className="e-mapa">
                <ConceptMap
                  data={datosMapa}
                  seq={seq}
                  onBranch={(id) => {
                    const m = plan.mapa.find((x) => x.id === id);
                    if (m) irA(m.tab, m.seccion);
                  }}
                />
              </div>
            ) : null}
            <BloquesEstudio bloques={actual.bloques} />
          </ErrorBoundary>
          {actual.fuentes && actual.fuentes.length > 0 && (
            <details className="e-fuentes">
              <summary>Fuentes de esta sección</summary>
              <Refs refs={actual.fuentes} label="" />
            </details>
          )}
          {!sig && (
            <div className="e-fin">
              <button type="button" className={pc?.completed ? 'is-on' : ''} onClick={() => setCompleted(c.id, !pc?.completed)}>
                <Icon name="check" size={16} /> {pc?.completed ? 'Capítulo completado' : 'Marcar capítulo como completado'}
              </button>
              {nb.next && (
                <Link to={`/capitulo/${nb.next.id}`}>
                  Siguiente capítulo: {nb.next.title}
                </Link>
              )}
            </div>
          )}
        </main>

        <nav className="e-pie" aria-label="Sección anterior y siguiente">
          {ant ? (
            <button type="button" onClick={() => irA(ant.id)}>
              <Icon name="chevronLeft" size={16} />
              <span>
                <small>{ant.n}</small> {ant.label}
              </span>
            </button>
          ) : (
            <span />
          )}
          {sig && (
            <button type="button" className="is-sig" onClick={() => irA(sig.id)}>
              <span>
                <small>{sig.n}</small> {sig.label}
              </span>
              <Icon name="chevronRight" size={16} />
            </button>
          )}
        </nav>
      </div>
    </EstudioCtx.Provider>
  );
}
