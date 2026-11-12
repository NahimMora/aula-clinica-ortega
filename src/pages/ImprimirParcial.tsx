// Versión imprimible del parcial por sistema (ruta /imprimir-parcial/:sistema → PDF).
// Mismo orden que el módulo: cada tema con fisiopatología, diapositivas, lo de la pizarra, video,
// maniobras, memoria, preguntas del oral (los tres niveles, todo abierto) y cierre.
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Blocks } from '@/components/Blocks';
import { Refs, Rich } from '@/components/Rich';
import { asset } from '@/components/VideoPlayer';
import { AssetCtx, Diapositiva } from '@/clase/Diapositiva';
import type { Diapositiva as D } from '@/clase/tipos';
import { planDe } from '@/parcial/MiniVisor';
import { findChapter } from '@content/curriculum';
import { maneuverById } from '@content/maneuvers';
import { PARES } from '@content/parcial/pares';
import { PREGUNTAS } from '@content/parcial/preguntas';
import { COMO_RESPONDER, FECHA_PARCIAL, SISTEMAS_PARCIAL, enPizarra, temasDe } from '@content/parcial/temario';
import type { PreguntaParcial, SistemaParcial, TemaParcial } from '@content/parcial/tipos';
import { ESTADO_LABEL, ORIGEN_LABEL } from '@/parcial/PreguntaCard';
import { videosDe, type VideoCap } from '@/parcial/VideosTema';
import { Loading, NotFound } from './Misc';
import '@/styles/clase.css';
import '@/styles/preguntas.css';
import '@/styles/parcial.css';

interface DiapoImp {
  d: D;
  sec: string;
  aclara?: D['aclara'];
}
interface TemaImp {
  t: TemaParcial;
  fisio: DiapoImp[];
  teoria: DiapoImp[];
  videos: VideoCap[];
}

const fmt = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;

async function armar(t: TemaParcial): Promise<TemaImp> {
  const fisio: DiapoImp[] = [];
  const teoria: DiapoImp[] = [];
  for (const f of t.diapos) {
    const plan = await planDe(f.cap);
    if (!plan) continue;
    for (const id of f.ids) {
      const esF = id.startsWith('f-');
      const aFisio = esF && !t.fisioJunto;
      const mazo = esF ? plan.fisio : plan.teoria;
      const d = mazo.diapos.find((x) => x.id === id);
      if (!d) continue;
      const sec = mazo.secciones.find((s) => s.id === d.sec)?.label ?? '';
      (aFisio ? fisio : teoria).push({ d, sec: esF ? `Fisiopatología · ${findChapter(f.cap)?.title ?? f.cap}` : f.cap === 'parcial' ? 'Repaso del 11/11' : sec, aclara: d.aclara });
    }
  }
  return { t, fisio, teoria, videos: await videosDe(t) };
}

function Diapos({ lista }: { lista: DiapoImp[] }) {
  return (
    <div className="pimp__diapos">
      {lista.map(({ d, sec, aclara }) => (
        <figure key={d.id} className="pimp__diapo">
          <div className="visor__escenario">
            <Diapositiva d={d} reloj={{ t: 4, paso: Math.max(0, d.voz.length - 1), dt: 9 }} seccion={sec} />
          </div>
          {aclara && (
            <figcaption className="visor__aclara">
              <strong>Para entenderlo mejor: </strong>
              <Rich text={aclara.text} />
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

function Pregunta({ p, n }: { p: PreguntaParcial; n: number }) {
  return (
    <article className="pimp__preg">
      <h4>
        {n}. <Rich text={p.q} />
      </h4>
      <p className="pimp__tags">
        {ESTADO_LABEL[p.estado].label}
        {p.origen
          .filter((o) => o !== 'simulada')
          .map((o) => ` · ${ORIGEN_LABEL[o]}`)
          .join('')}
      </p>
      <section className="pq__nivel pq__nivel--1">
        <h5>
          <span className="pq__n">1</span> Respuesta oral: lo primero que decís
        </h5>
        <p className="pq__oral">
          <Rich text={p.oral} />
        </p>
      </section>
      {p.desarrollo.length > 0 && (
        <section className="pq__nivel pq__nivel--2">
          <h5>
            <span className="pq__n">2</span> Si te pregunta «¿por qué?»: el fundamento
          </h5>
          <Blocks blocks={p.desarrollo} />
        </section>
      )}
      {p.repreguntas.length > 0 && (
        <section className="pq__nivel pq__nivel--3">
          <h5>
            <span className="pq__n">3</span> Repreguntas posibles
          </h5>
          <ol className="pimp__repreg">
            {p.repreguntas.map((r, i) => (
              <li key={i}>
                <strong>
                  <Rich text={r.q} />
                </strong>
                <br />
                <Rich text={r.a} />
              </li>
            ))}
          </ol>
        </section>
      )}
      {p.relaciones && p.relaciones.length > 0 && (
        <p className="pimp__rel">
          <strong>Relacionala con: </strong>
          {p.relaciones.map((r, i) => (
            <span key={i}>
              {i > 0 && ' · '}
              <Rich text={r.text} />
            </span>
          ))}
        </p>
      )}
      {p.error && (
        <p className="pq__error">
          <strong>Error a evitar:</strong> <Rich text={p.error} />
        </p>
      )}
      <Refs refs={p.fuentes} label="Fuente" />
    </article>
  );
}

function Pares() {
  return (
    <div className="pimp__pares">
      <table className="btable">
        <thead>
          <tr>
            <th>Par</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Función</th>
            <th>Origen aparente</th>
          </tr>
        </thead>
        <tbody>
          {PARES.map((x) => (
            <tr key={x.n}>
              <th>{x.n}</th>
              <td>{x.nombre}</td>
              <td>{x.tipo}</td>
              <td>
                <Rich text={x.funcion} />
              </td>
              <td>
                <Rich text={x.aparente} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {PARES.map((p) => (
        <div key={p.n} className="pimp__par">
          <h4>
            {p.n} · {p.nombre} <small>({p.tipo})</small>
          </h4>
          <dl>
            {(
              [
                ['Función', p.funcion],
                ['Origen real', p.real],
                ['Origen aparente', p.aparente],
                ['Recorrido', p.recorrido],
                ['Examen físico', p.explora],
                ['Alteraciones', p.alteraciones],
                ['¿Por qué?', p.porque],
              ] as const
            ).map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>
                  <Rich text={v} />
                </dd>
              </div>
            ))}
          </dl>
          {p.ortega && (
            <p className="pimp__ortega">
              <strong>Lo que dijo Ortega: </strong>
              <Rich text={p.ortega.text} /> <Refs refs={[p.ortega.ref]} label="" />
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function Maniobras({ ids }: { ids: string[] }) {
  return (
    <div className="pimp__manis">
      {ids.map((id) => {
        const m = maneuverById(id);
        if (!m) return null;
        return (
          <article key={id} className="pimp__mani">
            <h4>{m.name}</h4>
            <dl>
              <div>
                <dt>Qué explora</dt>
                <dd>
                  <Rich text={m.explores} />
                </dd>
              </div>
              <div>
                <dt>Posición</dt>
                <dd>
                  Paciente: <Rich text={m.patientPosition} /> · Examinador: <Rich text={m.examinerPosition} />
                </dd>
              </div>
              <div>
                <dt>Técnica</dt>
                <dd>
                  <ol>
                    {m.technique.map((x, i) => (
                      <li key={i}>
                        <Rich text={x} />
                      </li>
                    ))}
                  </ol>
                </dd>
              </div>
              <div>
                <dt>Normal</dt>
                <dd>
                  <Rich text={m.normal} />
                </dd>
              </div>
              <div>
                <dt>Patológico</dt>
                <dd>
                  <Rich text={m.pathologic} />
                </dd>
              </div>
              <div>
                <dt>Qué significa</dt>
                <dd>
                  <Rich text={m.interpretation} />
                </dd>
              </div>
              {m.professorNote && (
                <div>
                  <dt>Ortega</dt>
                  <dd>
                    <Rich text={m.professorNote.text} />
                  </dd>
                </div>
              )}
            </dl>
          </article>
        );
      })}
    </div>
  );
}

function Tema({ x, n }: { x: TemaImp; n: number }) {
  const { t } = x;
  const ps = PREGUNTAS.filter((p) => p.tema === t.id);
  let paso = 0;
  const h = (titulo: string) => (
    <h2 className="print__h2">
      {++paso}. {titulo}
    </h2>
  );
  return (
    <section className="print__ch pimp__tema">
      <div className="print__ch-kicker">
        Tema {n} · {t.prioridad === 'critico' ? 'Crítico' : t.prioridad === 'obligatorio' ? 'Obligatorio' : 'Complementario'}
        {enPizarra(t) && ' · ✎ En la pizarra'}
      </div>
      <h1>{t.titulo}</h1>
      <aside className="callout callout--prof">
        <div className="callout__head">Por qué entra</div>
        <p>
          <Rich text={t.porque} />
        </p>
        <Refs refs={t.fuentes} label="Fuente" />
      </aside>
      <div className="pimp__pide">
        <h3 className="print__h3">Qué te puede pedir</h3>
        <ol>
          {t.pide.map((p, i) => (
            <li key={i}>
              <Rich text={p} />
            </li>
          ))}
        </ol>
      </div>

      {x.fisio.length > 0 && (
        <>
          {h('Fisiopatología')}
          <Diapos lista={x.fisio} />
        </>
      )}
      {(x.teoria.length > 0 || t.nuevo?.length || t.id === 'pares') && (
        <>
          {h('Diapositivas')}
          <Diapos lista={x.teoria} />
          {t.id === 'pares' && (
            <>
              <h3 className="print__h3">Los doce pares en el esquema de Ortega</h3>
              <Pares />
            </>
          )}
          {t.nuevo?.map((nv, i) => (
            <div key={i} className="pimp__pizarra">
              <h3 className="print__h3">✎ {nv.titulo}</h3>
              <Blocks blocks={nv.blocks} />
              <Refs refs={nv.refs} />
            </div>
          ))}
        </>
      )}
      {x.videos.length > 0 && (
        <>
          {h('Video')}
          {x.videos.map((v) => (
            <div key={v.cap} className="pimp__video">
              <p>
                <strong>Clase en video: {v.titulo}</strong> ({v.video.duration}). En la web: Parcial del lunes → {SISTEMAS_PARCIAL.find((s) => s.id === t.sistema)?.corto} → {t.titulo} → Video.
              </p>
              {v.relevantes.length > 0 && (
                <ul>
                  {v.relevantes.map((i) => (
                    <li key={i}>
                      <b>{fmt(v.video.chapters[i].t)}</b> {v.video.chapters[i].label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      )}
      {t.maniobras && t.maniobras.length > 0 && (
        <>
          {h('Maniobras')}
          <Maniobras ids={t.maniobras} />
        </>
      )}
      {t.memoria && t.memoria.length > 0 && (
        <>
          {h('Memoria')}
          {t.memoria.map((m) => (
            <p key={m.gancho} className="print__hook">
              <b>{m.gancho}</b> — <Rich text={m.explica} />
            </p>
          ))}
        </>
      )}
      {ps.length > 0 && (
        <>
          {h('Preguntas del oral')}
          {ps.map((p, i) => (
            <Pregunta key={p.id} p={p} n={i + 1} />
          ))}
        </>
      )}
      {h('Cierre e integración')}
      <div className="quedate">
        <h3 className="print__h3">Con esto tenés que quedarte</h3>
        <ul>
          {t.quedate.map((q, i) => (
            <li key={i}>
              <Rich text={q} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ImprimirParcial() {
  const { sistema } = useParams();
  const sis = SISTEMAS_PARCIAL.find((s) => s.id === sistema);
  const [temas, setTemas] = useState<TemaImp[] | null>(null);
  useEffect(() => {
    document.documentElement.classList.add('is-print');
    return () => document.documentElement.classList.remove('is-print');
  }, []);
  useEffect(() => {
    if (!sis) return;
    let vivo = true;
    Promise.all(temasDe(sis.id as SistemaParcial).map(armar)).then((r) => vivo && setTemas(r));
    return () => {
      vivo = false;
    };
  }, [sis]);
  useEffect(() => {
    if (temas) window.setTimeout(() => document.body.setAttribute('data-print-ready', '1'), 1500);
  }, [temas]);
  if (!sis) return <NotFound />;
  if (!temas) return <Loading label="Preparando el PDF del parcial…" />;
  const fecha = new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });
  const nPreg = PREGUNTAS.filter((p) => temas.some((x) => x.t.id === p.tema)).length;
  return (
    <AssetCtx.Provider value={asset}>
      <div className={`print pimp tone-${sis.tono}`}>
        <section className="print__cover">
          <div className="print__brand">Aula Clínica — Semiología I · Dr. Ortega</div>
          <h1>Parcial oral del {FECHA_PARCIAL}: {sis.titulo.toLowerCase()}</h1>
          <p className="print__lead">
            Solo lo que Ortega confirmó en el repaso del 11/11 (audio y pizarras), con la profundidad de siempre. Cada tema sigue el orden de la web: fisiopatología, diapositivas, lo que escribió en la pizarra, video, maniobras, memoria,
            preguntas del oral con su respuesta y cierre.
          </p>
          <ol className="print__covlist">
            {temas.map(({ t }) => (
              <li key={t.id}>
                {t.titulo}
                {enPizarra(t) && <span className="pimp__piz"> ✎ pizarra</span>}
                {t.prioridad === 'critico' && <span className="pimp__crit"> · crítico</span>}
              </li>
            ))}
          </ol>
          <p className="print__meta">
            Versión del {fecha} · {temas.length} temas · {nPreg} preguntas del oral · ✎ = lo escribió en la pizarra del repaso. Material elaborado a partir de las clases del Dr. Ortega y su libro de Clínica Médica I.
          </p>
        </section>

        <section className="print__ch">
          <div className="print__ch-kicker">Antes de entrar</div>
          <h1>Cómo responder frente a Ortega</h1>
          <ol className="niveles">
            {COMO_RESPONDER.niveles.map((nv) => (
              <li key={nv.n} className={`niveles__item niveles__item--${nv.n}`}>
                <span className="niveles__n">{nv.n}</span>
                <div>
                  <strong>{nv.t}</strong>
                  <p>{nv.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <h3 className="print__h3">Lo que dijo en el repaso</h3>
          <ul className="reglas">
            {COMO_RESPONDER.reglas.map((r) => (
              <li key={r.t}>
                <strong>{r.t}.</strong> <Rich text={r.d} /> <Refs refs={[r.ref]} label="" />
              </li>
            ))}
          </ul>
        </section>

        {temas.map((x, i) => (
          <Tema key={x.t.id} x={x} n={i + 1} />
        ))}
      </div>
    </AssetCtx.Provider>
  );
}
