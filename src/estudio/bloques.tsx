// Renderizado de los bloques del modo estudio. Reutiliza los datos del capítulo y los componentes de
// práctica existentes; la presentación es propia para evitar tarjetas dentro de tarjetas.
import { createContext, Fragment, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Block, Chapter, Development, Maneuver, MCQ } from '@/types';
import type { VisualBlock, VTone, Region } from '@/visual/tipos';
import type { Escena } from '@/escenas/tipos';
import { ABD_H, ABD_W, AbdomenFig } from '@/visual/anatomia';
import { Rich, Refs } from '@/components/Rich';
import { Blocks } from '@/components/Blocks';
import { Icon } from '@/components/Icon';
import { McqCard, MemoryCard } from '@/components/Practice';
import { SegmentPlayer } from '@/components/Maneuvers';
import { VideoPlayer, asset } from '@/components/VideoPlayer';
import { lastAttempt, devPending, setDev, useProgress } from '@/lib/progress';
import { maneuverById } from '@content/maneuvers';
import { FIGURAS } from './figuras';
import type { BloqueEstudio, CasoEstudio, PasoMecanismo } from './tipos';

interface Ctx {
  c: Chapter;
  repaso: boolean;
  irA: (tab: string, seccion?: string) => void;
  /** Sección interna pedida por un enlace profundo o por el mapa. */
  seccionPedida?: string;
}
export const EstudioCtx = createContext<Ctx>(null as unknown as Ctx);

/** Texto con marcado + estrella discreta de «lo pide el profe». */
export function Txt({ text }: { text: string }) {
  const partes = text.split('★');
  return (
    <>
      {partes.map((p, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <span className="e-star" role="img" aria-label="El profesor lo marca para el examen" title="El profesor lo marca para el examen">
              ★
            </span>
          )}
          <Rich text={i < partes.length - 1 ? p.replace(/ $/, '\u00a0') : p} />
        </Fragment>
      ))}
    </>
  );
}

const ETIQUETA: Record<PasoMecanismo, string> = { causa: 'Qué ocurre', mecanismo: 'Por qué', consecuencia: 'Qué produce', signo: 'Lo que encontrás' };

function Mecanismo({ b }: { b: Extract<BloqueEstudio, { t: 'mecanismo' }> }) {
  return (
    <div className="e-mec">
      {b.titulo && (
        <h4 className="e-mec__t">
          <Txt text={b.titulo} />
        </h4>
      )}
      <ol>
        {b.pasos.map((p, i) => (
          <li key={i} className={`e-mec__p e-mec__p--${p.k}`}>
            <span className="e-mec__k">{ETIQUETA[p.k]}</span>
            <span className="e-mec__v">
              <Txt text={p.text} />
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ───────── Bloques reutilizados de la teoría del capítulo ───────── */

type V<K extends VisualBlock['t']> = Extract<VisualBlock, { t: K }>;

function Cuadro({ b, titulo }: { b: V<'cuadro'>; titulo?: string }) {
  const [tapado, setTapado] = useState(false);
  const [vistas, setVistas] = useState<Set<string>>(new Set());
  const t = titulo ?? b.title;
  return (
    <div className="e-tabla-wrap">
      <div className="e-tabla-top">
        {t && (
          <h4>
            <Txt text={t} />
          </h4>
        )}
        <button
          type="button"
          className="e-link"
          onClick={() => {
            setTapado(!tapado);
            setVistas(new Set());
          }}
          aria-pressed={tapado}
        >
          {tapado ? 'Mostrar respuestas' : 'Tapar respuestas'}
        </button>
      </div>
      <div className="e-scroll">
        <table className="e-tabla">
          <thead>
            <tr>
              <th />
              {b.cols.map((c) => (
                <th key={c.t}>{c.t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.rows.map((r) => (
              <tr key={r.k}>
                <th scope="row">{r.k}</th>
                {r.v.map((v, i) => {
                  const clave = `${r.k}-${i}`;
                  const oculto = tapado && !vistas.has(clave);
                  return (
                    <td key={i} className={oculto ? 'is-tapado' : ''} onClick={oculto ? () => setVistas(new Set(vistas).add(clave)) : undefined}>
                      <span>
                        <Rich text={v} />
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Comparar({ b, titulo }: { b: Extract<Block, { t: 'compare' }>; titulo?: string }) {
  const t = titulo ?? b.title;
  return (
    <div className="e-comp">
      {t && (
        <h4>
          <Txt text={t} />
        </h4>
      )}
      <div className="e-comp__g">
        {b.cols.map((c) => (
          <div key={c.title}>
            <h5>{c.title}</h5>
            <ul>
              {c.items.map((it, i) => (
                <li key={i}>
                  <Rich text={it} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function Triada({ b, titulo }: { b: V<'triad'>; titulo?: string }) {
  return (
    <div className="e-tri">
      <h4>{titulo ?? b.title}</h4>
      <ol>
        {b.items.map((it) => (
          <li key={it}>{it.replace(/^\d+\s*·\s*/, '')}</li>
        ))}
        {b.plus?.map((it) => (
          <li key={it} className="is-plus">
            ± {it}
          </li>
        ))}
      </ol>
      {b.note && (
        <p>
          <Rich text={b.note} />
        </p>
      )}
    </div>
  );
}

function Lineal({ titulo, items, pie }: { titulo?: string; items: { k: string; t: string; d?: string }[]; pie?: string }) {
  return (
    <div className="e-lin">
      {titulo && (
        <h4>
          <Txt text={titulo} />
        </h4>
      )}
      <ol>
        {items.map((it) => (
          <li key={it.k}>
            <span className="e-lin__k">{it.k}</span>
            <span className="e-lin__t">{it.t}</span>
            {it.d && (
              <span className="e-lin__d">
                <Rich text={it.d} />
              </span>
            )}
          </li>
        ))}
      </ol>
      {pie && (
        <p className="e-nota">
          <Rich text={pie} />
        </p>
      )}
    </div>
  );
}

/** Figura de abdomen con todos los puntos a la vista: elegir una fila actualiza el dibujo (sin «Siguiente»). */
function ExploradorAbdomen({ titulo, filas, pie }: { titulo?: string; filas: { id: string; t: string; d: string; extra?: string; tone: VTone; regiones?: Region[]; puntos?: V<'abdomen'>['items'][number]['puntos']; ruta?: Region[] }[]; pie?: string }) {
  const [i, setI] = useState(0);
  const it = filas[Math.min(i, filas.length - 1)];
  const luz: Partial<Record<Region, VTone>> = {};
  it.regiones?.forEach((r) => (luz[r] = it.tone));
  return (
    <div className="e-exp">
      {titulo && (
        <h4>
          <Txt text={titulo} />
        </h4>
      )}
      <div className="e-exp__g">
        <svg viewBox={`0 0 ${ABD_W} ${ABD_H}`} role="img" aria-label={`${it.t}: esquema del abdomen`}>
          <AbdomenFig key={it.id} luz={luz} puntos={(it.puntos ?? []).map((p) => ({ p, tone: it.tone }))} ruta={it.ruta} rutaTone={it.tone} idp={`e-${it.id}`} />
        </svg>
        <ul>
          {filas.map((f, k) => (
            <li key={f.id}>
              <button type="button" className={k === i ? 'is-on' : ''} aria-pressed={k === i} onClick={() => setI(k)}>
                <span className="e-exp__t">{f.t}</span>
                <span className="e-exp__d">
                  <Rich text={f.d} />
                </span>
                {k === i && f.extra && <span className="e-exp__x">{f.extra}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {pie && (
        <p className="e-nota">
          <Rich text={pie} />
        </p>
      )}
    </div>
  );
}

function Desde({ ficha, tipo, n = 0, titulo }: { ficha: string; tipo: string; n?: number; titulo?: string }) {
  const { c } = useContext(EstudioCtx);
  const sec = c.theory.find((s) => s.id === ficha);
  const b = sec?.blocks.filter((x) => x.t === tipo)[n];
  if (!b) throw new Error(`Bloque no encontrado: ${ficha}/${tipo}[${n}]`);
  switch (b.t) {
    case 'cuadro':
      return <Cuadro b={b} titulo={titulo} />;
    case 'compare':
      return <Comparar b={b} titulo={titulo} />;
    case 'triad':
      return <Triada b={b} titulo={titulo} />;
    case 'timeline':
      return <Lineal titulo={titulo ?? b.title} items={b.items} pie={b.caption} />;
    case 'scale':
      return <Lineal titulo={titulo ?? b.title} items={b.items} />;
    case 'mnemo':
      return <Lineal titulo={titulo ?? b.word} items={b.items.map((it, i) => ({ k: `${it.l}${'​'.repeat(i)}`, t: '', d: it.t }))} pie={b.note} />;
    case 'abdomen':
      return <ExploradorAbdomen titulo={titulo ?? b.title} filas={b.items} pie={b.caption} />;
    case 'callout':
      return (
        <aside className="e-prof">
          <p>
            {b.title && <strong>{b.title}. </strong>}
            <Rich text={b.text ?? ''} />
          </p>
        </aside>
      );
    default:
      return <Blocks blocks={[b]} />;
  }
}

function EscenaAbdomen({ id, titulo }: { id: string; titulo?: string }) {
  const { c } = useContext(EstudioCtx);
  const e: Escena | undefined = c.escenas?.find((x) => x.id === id);
  if (!e || e.tipo !== 'abdomen') throw new Error(`Escena de abdomen no encontrada: ${id}`);
  return (
    <ExploradorAbdomen
      titulo={titulo ?? e.titulo}
      filas={e.pasos.map((p, i) => ({
        id: `${id}${i}`,
        t: p.nota?.t ?? `Paso ${i + 1}`,
        d: p.nota?.d ?? '',
        extra: p.di,
        tone: p.tono,
        regiones: p.regiones,
        puntos: p.puntos,
        ruta: p.ruta,
      }))}
    />
  );
}

/* ───────── Medios ───────── */

function Clip({ b }: { b: Extract<BloqueEstudio, { t: 'clip' }> }) {
  return (
    <figure className="e-medio">
      <video controls preload="none" playsInline poster={asset(b.poster)}>
        <source src={asset(b.src)} type="video/mp4" />
      </video>
      <figcaption>
        <Rich text={b.titulo} /> <span className="e-tenue">Animación con narración, {b.duracion}</span>
      </figcaption>
    </figure>
  );
}

function Imagen({ b }: { b: Extract<BloqueEstudio, { t: 'imagen' }> }) {
  return (
    <figure className={`e-img ${b.fondo === 'claro' ? 'e-img--claro' : ''}`}>
      <div className="e-img__m">
        <img src={asset(b.src)} alt={b.alt} loading="lazy" />
        {b.marcas?.map((m, i) => (
          <span key={i} className={`e-marca e-marca--${m.dir ?? 'der'}`} style={{ left: `${m.x}%`, top: `${m.y}%` }} aria-hidden="true" />
        ))}
      </div>
      <figcaption>
        {b.pie && <Rich text={b.pie} />} <span className="e-credito">{b.credito}</span>
      </figcaption>
    </figure>
  );
}

function Maniobras({ ids, titulo }: { ids: string[]; titulo?: string }) {
  const lista = useMemo(() => ids.map(maneuverById).filter((m): m is Maneuver => Boolean(m?.video)), [ids]);
  const [i, setI] = useState(0);
  if (lista.length !== ids.length) throw new Error(`Maniobra sin video: ${ids.join(', ')}`);
  const m = lista[i];
  return (
    <figure className="e-medio e-man">
      <SegmentPlayer list={lista} index={i} onIndex={setI} autoNext={false} />
      <figcaption>
        {lista.length > 1 ? (
          <span className="e-man__sel" role="group" aria-label="Elegir maniobra">
            {lista.map((x, k) => (
              <button key={x.id} type="button" className={k === i ? 'is-on' : ''} aria-pressed={k === i} onClick={() => setI(k)}>
                {x.name}
              </button>
            ))}
          </span>
        ) : (
          <span className="e-man__n">{titulo ?? m.name}</span>
        )}
        <span className="e-tenue">Examen real, video de maniobras (YouTube)</span>
        <details>
          <summary>Cómo se hace y qué significa</summary>
          <ol>
            {m.technique.map((t, k) => (
              <li key={k}>
                <Rich text={t} />
              </li>
            ))}
          </ol>
          <p>
            <Rich text={m.interpretation} />
          </p>
        </details>
      </figcaption>
    </figure>
  );
}

/* ───────── Práctica ───────── */

function FilaDesarrollo({ d }: { d: Development }) {
  const { c } = useContext(EstudioCtx);
  const progress = useProgress();
  const estado = progress.devs[d.id]?.status;
  return (
    <details className={`e-dev ${estado ? `is-${estado}` : ''}`} id={`d-${d.id}`}>
      <summary>
        {d.prio === 'P0' && <span className="e-star" title="Pregunta de examen">★</span>}
        <Rich text={d.question} />
        {estado && <span className="e-dev__e">{estado === 'known' ? 'La sabía' : 'A repasar'}</span>}
      </summary>
      <div className="e-dev__a">
        {d.quote && <p className="e-tenue">{d.quote.text}</p>}
        <Blocks blocks={d.answer} />
        <div className="e-dev__b">
          <button type="button" className={estado === 'known' ? 'is-on' : ''} onClick={() => setDev(d.id, c.id, true)}>
            La sabía
          </button>
          <button type="button" className={estado === 'unknown' ? 'is-on' : ''} onClick={() => setDev(d.id, c.id, false)}>
            No la sabía
          </button>
        </div>
      </div>
    </details>
  );
}

function Practica({ choice = [], desarrollos = [], titulo }: { choice?: string[]; desarrollos?: string[]; titulo?: string }) {
  const { c } = useContext(EstudioCtx);
  const qs = choice.map((id) => [...c.mcq, ...c.closing.miniExam].find((q) => q.id === id));
  const ds = desarrollos.map((id) => c.developments.find((d) => d.id === id));
  if (qs.some((q) => !q) || ds.some((d) => !d)) throw new Error(`Práctica con id inexistente: ${[...choice, ...desarrollos].join(', ')}`);
  return (
    <section className="e-prac" aria-label="Comprobación de aprendizaje">
      <h3>{titulo ?? 'Comprobá lo que entendiste'}</h3>
      {(qs as MCQ[]).map((q, i) => (
        <McqCard key={q.id} q={q} chapterId={c.id} n={i + 1} />
      ))}
      {ds.length > 0 && (
        <div className="e-devs">
          <h4>{ds.length === 1 ? 'Desarrollo de parcial' : 'Desarrollos de parcial'}</h4>
          {(ds as Development[]).map((d) => (
            <FilaDesarrollo key={d.id} d={d} />
          ))}
        </div>
      )}
    </section>
  );
}

function Caso({ caso }: { caso: CasoEstudio }) {
  const [e, setE] = useState<number | null>(null);
  const respondida = e !== null;
  return (
    <article className="e-caso">
      <h4>
        {caso.titulo}
        {caso.origen === 'clase' && <span className="e-tenue"> contado en clase</span>}
      </h4>
      <p>
        <Rich text={caso.texto} />
      </p>
      <p className="e-caso__q">
        <Rich text={caso.pregunta} />
      </p>
      <div className="e-caso__ops">
        {caso.opciones.map((o, i) => (
          <button
            key={i}
            type="button"
            disabled={respondida}
            aria-pressed={e === i}
            className={!respondida ? '' : i === caso.correcta ? 'is-ok' : i === e ? 'is-mal' : 'is-apag'}
            onClick={() => setE(i)}
          >
            <Rich text={o.text} />
          </button>
        ))}
      </div>
      {respondida && (
        <div className="e-caso__r" role="status">
          <p>
            <strong>{e === caso.correcta ? 'Correcto.' : 'No es la mejor respuesta.'}</strong> <Rich text={caso.opciones[e].why} />
          </p>
          <p>
            <Rich text={caso.razonamiento} />
          </p>
          {caso.refs && <Refs refs={caso.refs} label="Clase" />}
          <button type="button" className="e-link" onClick={() => setE(null)}>
            Volver a intentar
          </button>
        </div>
      )}
    </article>
  );
}

function Pendientes() {
  const { c } = useContext(EstudioCtx);
  const progress = useProgress();
  const ahora = Date.now();
  const devs = c.developments.filter((d) => progress.devs[d.id] && devPending(progress, d.id, ahora));
  const mal = [...c.mcq, ...c.closing.miniExam].filter((q) => {
    const a = lastAttempt(progress, q.id);
    return a && !a.correct;
  });
  if (!devs.length && !mal.length) return <p className="e-nota">Cuando marques un desarrollo como «No la sabía» o erres una choice, aparece acá para repasarlo.</p>;
  return (
    <ul className="e-lista">
      {devs.map((d) => (
        <li key={d.id}>
          <Rich text={d.question} />
        </li>
      ))}
      {mal.map((q) => (
        <li key={q.id}>
          <Rich text={q.stem} />
        </li>
      ))}
    </ul>
  );
}

/* ───────── Secciones internas ───────── */

function Secciones({ b }: { b: Extract<BloqueEstudio, { t: 'secciones' }> }) {
  const { seccionPedida } = useContext(EstudioCtx);
  const [act, setAct] = useState(() => (b.items.some((i) => i.id === seccionPedida) ? seccionPedida! : b.items[0].id));
  useEffect(() => {
    if (seccionPedida && b.items.some((i) => i.id === seccionPedida)) setAct(seccionPedida);
  }, [seccionPedida, b.items]);
  const it = b.items.find((i) => i.id === act) ?? b.items[0];
  return (
    <div className="e-secs">
      <div className="e-secs__nav" role="tablist" aria-label="Secciones de esta pestaña">
        {b.items.map((i) => (
          <button key={i.id} type="button" role="tab" aria-selected={i.id === act} className={i.id === act ? 'is-on' : ''} onClick={() => setAct(i.id)}>
            <Txt text={i.label} />
          </button>
        ))}
      </div>
      <div role="tabpanel" key={it.id}>
        <BloquesEstudio bloques={it.bloques} />
      </div>
    </div>
  );
}

/* ───────── Despacho ───────── */

function Bloque({ b }: { b: BloqueEstudio }): ReactNode {
  const { c, irA } = useContext(EstudioCtx);
  switch (b.t) {
    case 'p':
      return (
        <p className="e-p">
          <Txt text={b.text} />
        </p>
      );
    case 'h':
      return (
        <h3 className="e-h">
          <Txt text={b.text} />
        </h3>
      );
    case 'lista':
      return (
        <ul className="e-lista">
          {b.items.map((it, i) => (
            <li key={i}>
              <Txt text={it} />
            </li>
          ))}
        </ul>
      );
    case 'mecanismo':
      return <Mecanismo b={b} />;
    case 'par':
      return (
        <div className={`e-par e-par--${b.ancho ?? 'igual'}`}>
          <div>
            <BloquesEstudio bloques={b.a} />
          </div>
          <div>
            <BloquesEstudio bloques={b.b} />
          </div>
        </div>
      );
    case 'desde':
      return <Desde ficha={b.ficha} tipo={b.tipo} n={b.n} titulo={b.titulo} />;
    case 'escena':
      return <EscenaAbdomen id={b.id} titulo={b.titulo} />;
    case 'figura': {
      const F = FIGURAS[b.id];
      if (!F) throw new Error(`Figura no registrada: ${b.id}`);
      return (
        <figure className="e-fig">
          <F />
          {b.pie && (
            <figcaption>
              <Rich text={b.pie} />
            </figcaption>
          )}
        </figure>
      );
    }
    case 'imagen':
      return <Imagen b={b} />;
    case 'clip':
      return <Clip b={b} />;
    case 'maniobras':
      return <Maniobras ids={b.ids} titulo={b.titulo} />;
    case 'video':
      return (
        <div className="e-video">
          <VideoPlayer video={b.video} title={b.titulo} />
        </div>
      );
    case 'prof':
      return (
        <aside className="e-prof">
          <p>
            <Txt text={b.text} /> <span className="e-tenue">{b.refs.map((r) => `min ${r.t}`).join(', ')}</span>
          </p>
        </aside>
      );
    case 'precision':
      return (
        <aside className="e-prec">
          <p>
            <strong>Precisión.</strong> <Txt text={b.text} /> <span className="e-tenue">{b.origen}</span>
          </p>
        </aside>
      );
    case 'regla': {
      const m = b.mem ? c.memory.find((x) => x.id === b.mem) : undefined;
      if (b.mem && !m) throw new Error(`Memoria no encontrada: ${b.mem}`);
      return (
        <p className="e-regla">
          <Txt text={m?.mnemonic.hook ?? b.text ?? ''} />
        </p>
      );
    }
    case 'tabla':
      return (
        <div className="e-tabla-wrap">
          {b.titulo && (
            <div className="e-tabla-top">
              <h4>
                <Txt text={b.titulo} />
              </h4>
            </div>
          )}
          <div className="e-scroll">
            <table className="e-tabla">
              <thead>
                <tr>
                  {b.head.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r, i) => (
                  <tr key={i}>
                    {r.map((cel, j) => (j === 0 ? <th key={j} scope="row"><Txt text={cel} /></th> : <td key={j}><Txt text={cel} /></td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case 'secciones':
      return <Secciones b={b} />;
    case 'practica':
      return <Practica choice={b.choice} desarrollos={b.desarrollos} titulo={b.titulo} />;
    case 'casos':
      return (
        <div className="e-casos">
          {b.items.map((x) => (
            <Caso key={x.id} caso={x} />
          ))}
        </div>
      );
    case 'memoria': {
      const items = b.ids.map((id) => c.memory.find((m) => m.id === id)).filter((m): m is NonNullable<typeof m> => Boolean(m));
      return (
        <div className="e-memoria">
          {items.map((m) => (
            <MemoryCard key={m.id} m={m} chapterId={c.id} />
          ))}
        </div>
      );
    }
    case 'errores':
      return (
        <ul className="e-lista e-lista--error">
          {c.closing.pitfalls.map((p, i) => (
            <li key={i}>
              <Rich text={p} />
            </li>
          ))}
        </ul>
      );
    case 'conexiones':
      return (
        <ul className="e-lista">
          {c.closing.links.map((l, i) => (
            <li key={i}>
              <Rich text={l.text} />
            </li>
          ))}
        </ul>
      );
    case 'pendientes':
      return <Pendientes />;
    case 'cierre':
      return (
        <ul className="e-lista">
          {c.closing.essentials.map((p, i) => (
            <li key={i}>
              <Rich text={p} />
            </li>
          ))}
        </ul>
      );
    case 'ir':
      return (
        <button type="button" className="e-ir" onClick={() => irA(b.tab, b.seccion)}>
          <Txt text={b.text} />
          <Icon name="chevronRight" size={15} />
        </button>
      );
  }
}

export function BloquesEstudio({ bloques }: { bloques: BloqueEstudio[] }) {
  const { repaso } = useContext(EstudioCtx);
  return (
    <>
      {bloques
        .filter((b) => !(repaso && b.extra))
        .map((b, i) => (
          <Bloque key={i} b={b} />
        ))}
    </>
  );
}

/** Recorre el plan (usado por los enlaces profundos a preguntas). */
export function contieneId(bloques: BloqueEstudio[], id: string): { encontrado: boolean; seccion?: string } {
  for (const b of bloques) {
    if (b.t === 'practica' && (b.choice?.includes(id) || b.desarrollos?.includes(id))) return { encontrado: true };
    if (b.t === 'par') {
      const r = contieneId([...b.a, ...b.b], id);
      if (r.encontrado) return r;
    }
    if (b.t === 'secciones') {
      for (const s of b.items) {
        const r = contieneId(s.bloques, id);
        if (r.encontrado) return { encontrado: true, seccion: s.id };
      }
    }
  }
  return { encontrado: false };
}
