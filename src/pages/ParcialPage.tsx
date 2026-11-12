// «Parcial del lunes»: módulo independiente con el temario que Ortega confirmó en el repaso del 11/11.
// Reutiliza diapositivas, maniobras y componentes de la web; los capítulos originales no se tocan.
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Blocks } from '@/components/Blocks';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Icon } from '@/components/Icon';
import { ManeuverList } from '@/components/Maneuvers';
import { Refs, Rich } from '@/components/Rich';
import { findChapter } from '@content/curriculum';
import { MANIOBRAS_PARCIAL } from '@content/parcial/maniobras';
import { PREGUNTAS } from '@content/parcial/preguntas';
import { COMO_RESPONDER, EXCLUIDOS, FECHA_PARCIAL, SISTEMAS_PARCIAL, TEMAS, temaById, temasDe } from '@content/parcial/temario';
import type { EstadoPregunta, PreguntaParcial, Prioridad, SistemaParcial, TemaParcial } from '@content/parcial/tipos';
import { Maniqui } from '@/parcial/Maniqui';
import { MiniVisor } from '@/parcial/MiniVisor';
import { ParesTabla } from '@/parcial/ParesTabla';
import { ESTADO_LABEL, Etiquetas, Fundamento, Marcador, PreguntaCard } from '@/parcial/PreguntaCard';
import { useMarcas, type Marca } from '@/parcial/marcas';
import { setLast } from '@/lib/progress';
import { NotFound } from './Misc';
import '@/styles/preguntas.css';
import '@/styles/parcial.css';

const PRIO: Record<Prioridad, { label: string; desc: string }> = {
  critico: { label: 'Crítico', desc: 'Lo exige expresamente o avisó que desaprueba' },
  obligatorio: { label: 'Obligatorio', desc: 'Entra en el parcial y hay que desarrollarlo' },
  complementario: { label: 'Complementario', desc: 'Lo necesario para sostener las repreguntas' },
};
const SISTEMA = Object.fromEntries(SISTEMAS_PARCIAL.map((s) => [s.id, s])) as Record<SistemaParcial, (typeof SISTEMAS_PARCIAL)[number]>;
const preguntasDe = (tema: string) => PREGUNTAS.filter((p) => p.tema === tema);

export function ParcialPage() {
  const { sec } = useParams();
  useEffect(() => {
    setLast(sec ? `/parcial/${sec}` : '/parcial', 'Parcial del lunes');
  }, [sec]);
  let cuerpo: ReactNode;
  if (!sec) cuerpo = <Inicio />;
  else if (sec === 'maniobras') cuerpo = <ManiobrasVista />;
  else if (sec === 'preguntas') cuerpo = <PreguntasVista />;
  else if (sec in SISTEMA) cuerpo = <SistemaVista s={sec as SistemaParcial} />;
  else return <NotFound />;
  return (
    <div className="page parcial">
      <NavParcial actual={sec ?? 'inicio'} />
      <ErrorBoundary key={sec ?? 'inicio'} label="esta sección del parcial">
        {cuerpo}
      </ErrorBoundary>
    </div>
  );
}

function NavParcial({ actual }: { actual: string }) {
  const items = [
    { id: 'inicio', to: '/parcial', label: 'Temario', icon: 'map' },
    ...SISTEMAS_PARCIAL.map((s) => ({ id: s.id, to: `/parcial/${s.id}`, label: s.corto, icon: s.icono })),
    { id: 'maniobras', to: '/parcial/maniobras', label: 'Maniobras y puntos', icon: 'hand' },
    { id: 'preguntas', to: '/parcial/preguntas', label: 'Preguntas del oral', icon: 'target' },
  ];
  return (
    <nav className="pnav" aria-label="Secciones del parcial">
      <span className="pnav__marca">
        <Icon name="flag" size={15} /> Parcial del {FECHA_PARCIAL}
      </span>
      <div className="pnav__items">
        {items.map((i) => (
          <Link key={i.id} to={i.to} className={`pnav__item ${actual === i.id ? 'is-on' : ''}`} aria-current={actual === i.id ? 'page' : undefined}>
            <Icon name={i.icon} size={15} /> {i.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function PrioBadge({ p }: { p: Prioridad }) {
  return (
    <span className={`prio prio--${p}`} title={PRIO[p].desc}>
      {PRIO[p].label}
    </span>
  );
}

/* ═════════════════════════════ Inicio: temario y cómo responder ═════════════════════════════ */

function Inicio() {
  const marcas = useMarcas();
  const reales = PREGUNTAS.filter((p) => p.estado !== 'simulada').length;
  const hechas = PREGUNTAS.filter((p) => marcas[p.id]).length;
  return (
    <>
      <header className="phero">
        <span className="phero__kicker">Parcial oral del {FECHA_PARCIAL} · Dr. Ortega</span>
        <h1>Temas fundamentales para el examen oral</h1>
        <p>
          Solo lo que Ortega confirmó en el repaso del 11/11 (audio y pizarras), con la profundidad de siempre. La teoría es la misma de los capítulos: acá está recortada al temario y ordenada para responder como él pide.
        </p>
      </header>

      <section className="psec">
        <h2 className="psec__h">
          <Icon name="quote" size={20} /> Cómo responder frente a Ortega
        </h2>
        <ol className="niveles">
          {COMO_RESPONDER.niveles.map((n) => (
            <li key={n.n} className={`niveles__item niveles__item--${n.n}`}>
              <span className="niveles__n">{n.n}</span>
              <div>
                <strong>{n.t}</strong>
                <p>{n.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <details className="pplegable">
          <summary>
            <Icon name="chevronRight" size={16} /> Lo que dijo en el repaso sobre cómo responder ({COMO_RESPONDER.reglas.length})
          </summary>
          <ul className="reglas">
            {COMO_RESPONDER.reglas.map((r) => (
              <li key={r.t}>
                <strong>{r.t}.</strong> <Rich text={r.d} /> <Refs refs={[r.ref]} label="" />
              </li>
            ))}
          </ul>
        </details>
      </section>

      <section className="psec">
        <h2 className="psec__h">
          <Icon name="list" size={20} /> Temario confirmado
        </h2>
        <p className="psec__sub">
          <PrioBadge p="critico" /> {PRIO.critico.desc} · <PrioBadge p="obligatorio" /> {PRIO.obligatorio.desc} · <PrioBadge p="complementario" /> {PRIO.complementario.desc}.
        </p>
        <div className="temario">
          {SISTEMAS_PARCIAL.map((s) => (
            <div key={s.id} className={`temario__sis tone-${s.tono}`}>
              <Link to={`/parcial/${s.id}`} className="temario__h">
                <span className="temario__icono">
                  <Icon name={s.icono} size={18} />
                </span>
                {s.titulo}
                <Icon name="arrowRight" size={15} />
              </Link>
              <ul>
                {temasDe(s.id).map((t) => (
                  <li key={t.id}>
                    <Link to={`/parcial/${s.id}?t=${t.id}`}>
                      <span className={`prio-dot prio-dot--${t.prioridad}`} title={PRIO[t.prioridad].label} />
                      <span className="temario__t">{t.titulo}</span>
                      <PrioBadge p={t.prioridad} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <details className="pplegable">
          <summary>
            <Icon name="chevronRight" size={16} /> Lo que no entra en este parcial (queda para el final)
          </summary>
          <div className="excluidos">
            {EXCLUIDOS.map((e) => (
              <div key={e.sistema}>
                <h4>{SISTEMA[e.sistema].titulo}</h4>
                <ul>
                  {e.temas.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <p className="muted">
                  <Rich text={e.nota} />
                </p>
                {e.ref && <Refs refs={[e.ref]} />}
              </div>
            ))}
          </div>
        </details>
      </section>

      <section className="psec paccesos">
        <Link to="/parcial/maniobras" className="pacceso tone-mint">
          <Icon name="hand" size={24} />
          <div>
            <strong>Maniobras y puntos dolorosos</strong>
            <span>Digestivo, renal, neurología y SOMA. Práctica del maniquí: «¿qué punto doloroso es este?».</span>
          </div>
        </Link>
        <Link to="/parcial/preguntas" className="pacceso tone-gold">
          <Icon name="target" size={24} />
          <div>
            <strong>Preguntas del examen oral</strong>
            <span>
              {PREGUNTAS.length} preguntas ({reales} reales, {PREGUNTAS.length - reales} simuladas) · {hechas} marcadas · simulacro con repreguntas.
            </span>
          </div>
        </Link>
      </section>

      <Cobertura />
    </>
  );
}

/** Matriz de cobertura: tema → prioridad, fuentes, capítulos, maniobras y preguntas. */
function Cobertura() {
  return (
    <details className="pplegable psec">
      <summary>
        <Icon name="chevronRight" size={16} /> Matriz de cobertura (tema · fuente · prioridad · capítulo · maniobras · preguntas)
      </summary>
      <div className="tabla-scroll">
        <table className="cobertura">
          <thead>
            <tr>
              <th>Tema</th>
              <th>Prioridad</th>
              <th>Fuentes del repaso</th>
              <th>Capítulos</th>
              <th>Diapos</th>
              <th>Maniobras</th>
              <th>Preguntas</th>
            </tr>
          </thead>
          <tbody>
            {TEMAS.map((t) => {
              const ps = preguntasDe(t.id);
              return (
                <tr key={t.id}>
                  <td>
                    <Link to={`/parcial/${t.sistema}?t=${t.id}`}>{t.titulo}</Link>
                  </td>
                  <td>
                    <PrioBadge p={t.prioridad} />
                  </td>
                  <td className="cobertura__fuentes">
                    {t.fuentes
                      .filter((f) => f.src === 'repaso-1111' || f.src === 'pizarra-repaso' || f.src === 'oral-1011')
                      .map((f) => (f.src === 'repaso-1111' ? f.t : f.src === 'pizarra-repaso' ? 'pizarra' : 'oral 10/11'))
                      .join(' · ') || '—'}
                  </td>
                  <td>{t.capitulos.join(', ')}</td>
                  <td>{t.diapos.reduce((a, d) => a + d.ids.length, 0)}</td>
                  <td>{t.maniobras?.length ?? 0}</td>
                  <td>
                    {ps.length} ({ps.filter((p) => p.estado !== 'simulada').length} reales)
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </details>
  );
}

/* ═════════════════════════════ Sistema → temas ═════════════════════════════ */

function SistemaVista({ s }: { s: SistemaParcial }) {
  const [params, setParams] = useSearchParams();
  const temas = temasDe(s);
  const tema = temas.find((t) => t.id === params.get('t')) ?? temas[0];
  const sis = SISTEMA[s];
  const idx = temas.indexOf(tema);
  const pedida = params.get('d') ?? undefined;
  const ir = params.get('ir');
  useEffect(() => {
    if (!ir) return;
    const h = window.setTimeout(() => document.getElementById(ir)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    return () => window.clearTimeout(h);
  }, [ir, tema.id, pedida]);
  return (
    <div className={`tone-${sis.tono}`}>
      <header className="psis">
        <span className="psis__icono">
          <Icon name={sis.icono} size={24} />
        </span>
        <div>
          <h1>{sis.titulo}</h1>
          <p className="muted">{temas.length} temas para el parcial. Elegí uno: cada tema tiene sus preguntas, su teoría, sus maniobras y el cierre.</p>
        </div>
      </header>
      <div className="ptemas" role="tablist" aria-label="Temas">
        {temas.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === tema.id}
            className={`ptemas__tab ${t.id === tema.id ? 'is-on' : ''}`}
            onClick={() => {
              setParams({ t: t.id });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className={`prio-dot prio-dot--${t.prioridad}`} />
            {t.titulo}
          </button>
        ))}
      </div>
      <TemaVista key={tema.id} t={tema} pedida={pedida} />
      <nav className="ptema__pie">
        {idx > 0 ? (
          <Link className="btn btn--ghost" to={`/parcial/${s}?t=${temas[idx - 1].id}`}>
            <Icon name="chevronLeft" size={16} /> {temas[idx - 1].titulo}
          </Link>
        ) : (
          <span />
        )}
        {idx < temas.length - 1 ? (
          <Link className="btn btn--soft" to={`/parcial/${s}?t=${temas[idx + 1].id}`}>
            {temas[idx + 1].titulo} <Icon name="chevronRight" size={16} />
          </Link>
        ) : (
          <Link className="btn btn--soft" to="/parcial/preguntas">
            Practicar las preguntas <Icon name="chevronRight" size={16} />
          </Link>
        )}
      </nav>
    </div>
  );
}

function Bloque({ id, icon, titulo, children, sub }: { id: string; icon: string; titulo: string; sub?: ReactNode; children: ReactNode }) {
  return (
    <section className="ptema__sec" id={id}>
      <h2 className="ptema__h">
        <Icon name={icon} size={19} /> {titulo}
      </h2>
      {sub && <p className="psec__sub">{sub}</p>}
      {children}
    </section>
  );
}

function TemaVista({ t, pedida }: { t: TemaParcial; pedida?: string }) {
  const ps = preguntasDe(t.id);
  const fuentesDiapos = useMemo(() => t.diapos, [t.diapos]);
  return (
    <article className="ptema">
      <header className="ptema__head">
        <h2 className="ptema__titulo">
          {t.titulo} <PrioBadge p={t.prioridad} />
        </h2>
        <aside className="callout callout--prof ptema__porque">
          <div className="callout__head">
            <Icon name="cap" size={18} /> Por qué entra
          </div>
          <p>
            <Rich text={t.porque} />
          </p>
          <Refs refs={t.fuentes} label="Fuente" />
        </aside>
        <div className="ptema__pide">
          <h3>Qué te puede pedir</h3>
          <ol>
            {t.pide.map((x, i) => (
              <li key={i}>
                <Rich text={x} />
              </li>
            ))}
          </ol>
        </div>
      </header>

      {ps.length > 0 && (
        <Bloque id="responder" icon="target" titulo="¿Cómo responderlo frente a Ortega?" sub="Intentá responder en voz alta antes de abrir. Nivel 1: lo que decís primero · nivel 2: el porqué · nivel 3: las repreguntas.">
          <div className="pq-lista">
            {ps.map((p) => (
              <PreguntaCard key={p.id} p={p} temaId={t.id} />
            ))}
          </div>
        </Bloque>
      )}

      {t.id === 'pares' && (
        <Bloque id="pares" icon="brain" titulo="Los doce pares en el esquema de Ortega" sub="Nombre · función · origen · examen físico · alteraciones. Activá «tapar» para tomarte examen.">
          <ParesTabla />
        </Bloque>
      )}

      {t.nuevo?.map((n, i) => (
        <Bloque key={i} id={`nuevo-${i}`} icon="sparkle" titulo={n.titulo}>
          <div className="ptema__nuevo">
            <Blocks blocks={n.blocks} />
            <Refs refs={n.refs} />
          </div>
        </Bloque>
      ))}

      {t.diapos.length > 0 && (
        <Bloque id="teoria" icon="layers" titulo="Teoría: fisiopatología y diapositivas" sub="Las mismas diapositivas de los capítulos, solo las de este tema: primero la fisiopatología (qué pasa normalmente y qué se altera), después la teoría.">
          <MiniVisor temaId={t.id} fuentes={fuentesDiapos} pedida={pedida} />
        </Bloque>
      )}

      {(t.id === 'ef-digestivo' || t.id === 'ef-renal') && (
        <Bloque id="maniqui" icon="target" titulo="Práctica del maniquí: ¿qué punto doloroso es este?">
          <Maniqui sistema={t.id === 'ef-digestivo' ? 'digestivo' : 'renal'} />
        </Bloque>
      )}

      {t.maniobras && t.maniobras.length > 0 && (
        <Bloque id="maniobras" icon="hand" titulo="Cómo se examina: maniobras de este tema" sub="Las mismas de la biblioteca, con su fragmento de video cuando está verificado.">
          <ManeuverList ids={t.maniobras} />
        </Bloque>
      )}

      {t.memoria && t.memoria.length > 0 && (
        <Bloque id="memoria" icon="bulb" titulo="Memoria">
          <div className="pmemo">
            {t.memoria.map((m) => (
              <div key={m.gancho} className="pmemo__item">
                <strong>{m.gancho}</strong>
                <p>
                  <Rich text={m.explica} />
                </p>
              </div>
            ))}
          </div>
        </Bloque>
      )}

      <section className="quedate">
        <h2>
          <Icon name="check" size={20} /> Con esto tenés que quedarte
        </h2>
        <ul>
          {t.quedate.map((q, i) => (
            <li key={i}>
              <Rich text={q} />
            </li>
          ))}
        </ul>
        <p className="quedate__caps">
          Capítulo completo (para el final):{' '}
          {t.capitulos.map((c, i) => {
            const m = findChapter(c);
            return (
              <span key={c}>
                {i > 0 && ' · '}
                <Link to={m?.link ?? `/capitulo/${c}`}>{m?.title ?? c}</Link>
              </span>
            );
          })}
        </p>
      </section>
    </article>
  );
}

/* ═════════════════════════════ Maniobras y puntos dolorosos ═════════════════════════════ */

function Plegable({ titulo, nota, children, abierto, extra }: { titulo: string; nota?: string; children: ReactNode; abierto?: boolean; extra?: ReactNode }) {
  const [open, setOpen] = useState(Boolean(abierto));
  return (
    <details className="pgrupo" open={open} onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}>
      <summary>
        <Icon name="chevronRight" size={16} />
        <span className="pgrupo__t">{titulo}</span>
        {extra}
      </summary>
      {open && (
        <div className="pgrupo__body">
          {nota && (
            <p className="pgrupo__nota">
              <Rich text={nota} />
            </p>
          )}
          {children}
        </div>
      )}
    </details>
  );
}

function ManiobrasVista() {
  const [params, setParams] = useSearchParams();
  const s = (SISTEMAS_PARCIAL.find((x) => x.id === params.get('s'))?.id ?? 'digestivo') as SistemaParcial;
  const data = MANIOBRAS_PARCIAL[s];
  return (
    <>
      <header className="psis">
        <span className="psis__icono">
          <Icon name="hand" size={24} />
        </span>
        <div>
          <h1>Maniobras y puntos dolorosos</h1>
          <p className="muted">Catálogo para repasar antes de entrar. Cada maniobra es la misma de la biblioteca y de su tema: técnica, qué es positivo, qué significa y su video.</p>
        </div>
      </header>
      <div className="seg seg--wide" role="tablist" aria-label="Sistema">
        {SISTEMAS_PARCIAL.map((x) => (
          <button key={x.id} role="tab" aria-selected={s === x.id} className={s === x.id ? 'is-on' : ''} onClick={() => setParams({ s: x.id })}>
            {x.corto}
          </button>
        ))}
      </div>
      <p className="pintro">
        <Rich text={data.intro} />
      </p>
      {data.puntos && (
        <Plegable titulo={`Puntos dolorosos ${data.puntos === 'digestivo' ? 'abdominales' : 'renoureterales'}: práctica del maniquí`} abierto>
          <Maniqui sistema={data.puntos} />
        </Plegable>
      )}
      {s === 'neuro' && (
        <Plegable titulo="Pares craneales: cuadro de los doce">
          <ParesTabla />
        </Plegable>
      )}
      {data.grupos.map((g) => {
        const tema = g.tema ? temaById(g.tema) : undefined;
        return (
          <Plegable
            key={g.titulo}
            titulo={g.titulo}
            nota={g.nota}
            extra={
              <span className="pgrupo__n">
                {g.ids.length} maniobra{g.ids.length === 1 ? '' : 's'}
              </span>
            }
          >
            <ManeuverList ids={g.ids} />
            {tema && (
              <p className="pgrupo__tema">
                <Icon name="route" size={14} /> Se usa en el tema <Link to={`/parcial/${tema.sistema}?t=${tema.id}`}>{tema.titulo}</Link>
              </p>
            )}
          </Plegable>
        );
      })}
    </>
  );
}

/* ═════════════════════════════ Preguntas del oral ═════════════════════════════ */

type FiltroEstado = 'todas' | 'reales' | 'nuevas' | 'simuladas';
type FiltroMarca = 'todas' | 'sin' | 'dude' | 'repasar';
const PESTANAS_P: { id: SistemaParcial | 'integracion' | 'simulacro'; label: string; icon: string }[] = [
  ...SISTEMAS_PARCIAL.map((s) => ({ id: s.id, label: s.corto, icon: s.icono })),
  { id: 'integracion', label: 'Integración', icon: 'route' },
  { id: 'simulacro', label: 'Simulacro oral', icon: 'timer' },
];

function resumenEstados(ps: PreguntaParcial[]) {
  const c = (e: EstadoPregunta) => ps.filter((p) => p.estado === e).length;
  return { confirmada: c('confirmada'), ampliada: c('ampliada'), nueva: c('nueva'), anterior: c('anterior'), simulada: c('simulada') };
}

function PreguntasVista() {
  const [params, setParams] = useSearchParams();
  const sel = PESTANAS_P.find((p) => p.id === params.get('s'))?.id ?? 'digestivo';
  const [fe, setFe] = useState<FiltroEstado>('todas');
  const [fm, setFm] = useState<FiltroMarca>('todas');
  const marcas = useMarcas();
  const q = params.get('q');
  // Pregunta pedida por enlace (?q=…): sin filtros, abierta y a la vista.
  useEffect(() => {
    if (!q) return;
    setFe('todas');
    setFm('todas');
    const h = window.setTimeout(() => {
      const el = document.getElementById(q);
      if (el instanceof HTMLDetailsElement) el.open = true;
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
    return () => window.clearTimeout(h);
  }, [q, sel]);
  const r = resumenEstados(PREGUNTAS);
  const pasa = (p: PreguntaParcial) =>
    (fe === 'todas' || (fe === 'reales' && p.estado !== 'simulada') || (fe === 'nuevas' && p.estado === 'nueva') || (fe === 'simuladas' && p.estado === 'simulada')) &&
    (fm === 'todas' || (fm === 'sin' && !marcas[p.id]) || marcas[p.id] === fm);
  const lista = sel === 'simulacro' ? [] : PREGUNTAS.filter((p) => p.sistema === sel && pasa(p));
  const porTema = lista.reduce<Record<string, PreguntaParcial[]>>((a, p) => {
    (a[p.tema] ??= []).push(p);
    return a;
  }, {});
  const cuenta = (m: Marca) => PREGUNTAS.filter((p) => marcas[p.id] === m).length;
  return (
    <>
      <header className="psis">
        <span className="psis__icono">
          <Icon name="target" size={24} />
        </span>
        <div>
          <h1>Preguntas del examen oral</h1>
          <p className="muted">
            Las preguntas reales de Ortega comparadas con las que ya estaban en la web (por concepto, sin duplicar). Primero respondé; después abrí la respuesta oral, el fundamento y las repreguntas.
          </p>
        </div>
      </header>
      <div className="presumen">
        <span title={ESTADO_LABEL.confirmada.title}>
          <strong>{r.confirmada}</strong> ya estaban y se confirmaron
        </span>
        <span title={ESTADO_LABEL.ampliada.title}>
          <strong>{r.ampliada}</strong> ampliadas con el repaso
        </span>
        <span title={ESTADO_LABEL.nueva.title}>
          <strong>{r.nueva}</strong> nuevas del repaso
        </span>
        <span title={ESTADO_LABEL.anterior.title}>
          <strong>{r.anterior}</strong> de clases anteriores
        </span>
        <span title={ESTADO_LABEL.simulada.title}>
          <strong>{r.simulada}</strong> simuladas
        </span>
        <span className="presumen__marcas">
          <span className="pq__marca pq__marca--ok is-on">La sé {cuenta('se')}</span>
          <span className="pq__marca pq__marca--gold is-on">Dudé {cuenta('dude')}</span>
          <span className="pq__marca pq__marca--bad is-on">Repasar {cuenta('repasar')}</span>
        </span>
      </div>
      <div className="preg__tabs" role="tablist" aria-label="Sistema">
        {PESTANAS_P.map((p) => (
          <button key={p.id} role="tab" aria-selected={sel === p.id} className={`preg__tab ${sel === p.id ? 'is-on' : ''}`} onClick={() => setParams({ s: p.id }, { replace: true })}>
            <Icon name={p.icon} size={16} /> {p.label}
            {p.id !== 'simulacro' && <span className="preg__tab-n">{PREGUNTAS.filter((x) => x.sistema === p.id).length}</span>}
          </button>
        ))}
      </div>
      {sel === 'simulacro' ? (
        <Simulacro />
      ) : (
        <>
          <div className="pfiltros">
            <div className="seg" role="group" aria-label="Tipo de pregunta">
              {(
                [
                  ['todas', 'Todas'],
                  ['reales', 'Reales de Ortega'],
                  ['nuevas', 'Nuevas del repaso'],
                  ['simuladas', 'Simuladas'],
                ] as const
              ).map(([k, l]) => (
                <button key={k} className={fe === k ? 'is-on' : ''} onClick={() => setFe(k)}>
                  {l}
                </button>
              ))}
            </div>
            <div className="seg" role="group" aria-label="Mis marcas">
              {(
                [
                  ['todas', 'Todas'],
                  ['sin', 'Sin marcar'],
                  ['dude', 'Dudé'],
                  ['repasar', 'Repasar'],
                ] as const
              ).map(([k, l]) => (
                <button key={k} className={fm === k ? 'is-on' : ''} onClick={() => setFm(k)}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          {Object.keys(porTema).length === 0 && <p className="empty">No hay preguntas con ese filtro.</p>}
          {Object.entries(porTema).map(([tema, ps]) => {
            const t = temaById(tema);
            return (
              <section key={tema} className="pgrupo-p">
                <h3>
                  {t ? <Link to={`/parcial/${t.sistema}?t=${t.id}`}>{t.titulo}</Link> : tema} <span className="preg__cap-n">{ps.length}</span>
                </h3>
                <div className="pq-lista">
                  {ps.map((p) => (
                    <PreguntaCard key={p.id} p={p} />
                  ))}
                </div>
              </section>
            );
          })}
        </>
      )}
    </>
  );
}

/** Simulacro al estilo Ortega: pregunta directa → respuesta → repreguntas de a una → marca. Mezcla sistemas. */
function Simulacro() {
  const marcas = useMarcas();
  const [sistemas, setSistemas] = useState<Set<string>>(new Set(['digestivo', 'renal', 'neuro', 'soma', 'integracion']));
  const [soloReales, setSoloReales] = useState(true);
  const [priorizar, setPriorizar] = useState(true);
  const pool = PREGUNTAS.filter((p) => sistemas.has(p.sistema) && (!soloReales || p.estado !== 'simulada'));
  const elegir = (excluir?: string): PreguntaParcial | undefined => {
    const base = pool.filter((p) => p.id !== excluir);
    if (!base.length) return undefined;
    const flojas = base.filter((p) => marcas[p.id] === 'dude' || marcas[p.id] === 'repasar' || !marcas[p.id]);
    const desde = priorizar && flojas.length ? flojas : base;
    return desde[Math.floor(Math.random() * desde.length)];
  };
  const [actual, setActual] = useState<PreguntaParcial | undefined>(() => elegir());
  const [paso, setPaso] = useState(0); // 0: pregunta · 1: respuesta oral · 2..: repreguntas
  const [hechas, setHechas] = useState(0);
  const otra = () => {
    setActual(elegir(actual?.id));
    setPaso(0);
    setHechas((h) => h + 1);
  };
  const toggle = (s: string) =>
    setSistemas((prev) => {
      const n = new Set(prev);
      if (n.has(s)) n.delete(s);
      else n.add(s);
      return n.size ? n : prev;
    });
  const reps = actual?.repreguntas ?? [];
  return (
    <div className="sim">
      <div className="sim__config">
        {[...SISTEMAS_PARCIAL.map((s) => ({ id: s.id, label: s.corto })), { id: 'integracion', label: 'Integración' }].map((s) => (
          <label key={s.id} className="sim__chk">
            <input type="checkbox" checked={sistemas.has(s.id)} onChange={() => toggle(s.id)} /> {s.label}
          </label>
        ))}
        <label className="sim__chk">
          <input type="checkbox" checked={soloReales} onChange={(e) => setSoloReales(e.target.checked)} /> Solo preguntas reales
        </label>
        <label className="sim__chk">
          <input type="checkbox" checked={priorizar} onChange={(e) => setPriorizar(e.target.checked)} /> Priorizar las que dudé, tengo que repasar o no marqué
        </label>
      </div>
      {!actual ? (
        <p className="empty">No hay preguntas con esa selección.</p>
      ) : (
        <div className="sim__mesa">
          <p className="sim__ortega">
            <Icon name="cap" size={18} /> Ortega pregunta {hechas > 0 && <span className="muted">(pregunta {hechas + 1})</span>}
          </p>
          <h3 className="sim__q">
            <Rich text={actual.q} />
          </h3>
          <Etiquetas p={actual} />
          {paso === 0 && (
            <button type="button" className="btn btn--primary" onClick={() => setPaso(1)}>
              Ya respondí en voz alta: ver la respuesta
            </button>
          )}
          {paso >= 1 && (
            <div className="sim__resp">
              <h4>Respuesta oral (nivel 1)</h4>
              <p>
                <Rich text={actual.oral} />
              </p>
            </div>
          )}
          {reps.slice(0, Math.max(0, paso - 1)).map((r, i) => (
            <div key={i} className="sim__rep">
              <p className="sim__ortega">
                <Icon name="cap" size={16} /> Repregunta {i + 1}
              </p>
              <p className="sim__rq">
                <Rich text={r.q} />
              </p>
              <details>
                <summary>Ver la respuesta</summary>
                <p>
                  <Rich text={r.a} />
                </p>
              </details>
            </div>
          ))}
          {paso >= 1 && (
            <div className="sim__acciones">
              {paso - 1 < reps.length ? (
                <button type="button" className="btn btn--soft" onClick={() => setPaso((x) => x + 1)}>
                  <Icon name="chevronDown" size={16} /> Ortega repregunta
                </button>
              ) : (
                <details className="sim__fund">
                  <summary>Fundamento completo, relaciones y errores</summary>
                  <Fundamento p={actual} />
                </details>
              )}
              <Marcador id={actual.id} />
              <button type="button" className="btn btn--primary" onClick={otra}>
                Otra pregunta <Icon name="arrowRight" size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
