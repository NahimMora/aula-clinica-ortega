// PDF compacto del parcial para imprimir (ruta /imprimir-parcial/:sistema/compacto).
// Solo teoría y lo clave, a dos columnas: las diapositivas pasadas a texto (sin ilustraciones),
// lo que agregó en la pizarra, maniobras resumidas, memoria, preguntas con su respuesta y el cierre.
// Sin video, sin minutos ni fuentes.
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Blocks } from '@/components/Blocks';
import { Rich } from '@/components/Rich';
import { Txt } from '@/clase/Diapositiva';
import type { BloqueDiapo, Diapositiva as D, NodoArbol } from '@/clase/tipos';
import { loadChapter } from '@/lib/useChapter';
import { maneuverById } from '@content/maneuvers';
import { PARES } from '@content/parcial/pares';
import { PREGUNTAS } from '@content/parcial/preguntas';
import { COMO_RESPONDER, FECHA_PARCIAL, SISTEMAS_PARCIAL, enPizarra, temasDe } from '@content/parcial/temario';
import type { SistemaParcial, TemaParcial } from '@content/parcial/tipos';
import { Loading, NotFound } from './Misc';
import '@/styles/preguntas.css';
import '@/styles/parcial.css';

interface TemaC {
  t: TemaParcial;
  fisio: D[];
  teoria: D[];
}

async function armar(t: TemaParcial): Promise<TemaC> {
  const fisio: D[] = [];
  const teoria: D[] = [];
  for (const f of t.diapos) {
    const plan = (await loadChapter(f.cap))?.clase;
    if (!plan) continue;
    for (const id of f.ids) {
      const esF = id.startsWith('f-');
      const d = (esF ? plan.fisio : plan.teoria).diapos.find((x) => x.id === id);
      if (d) (esF ? fisio : teoria).push(d);
    }
  }
  return { t, fisio, teoria };
}

function Arbol({ n }: { n: NodoArbol }) {
  return (
    <li>
      <Txt text={n.t} />
      {n.d && (
        <>
          {': '}
          <Txt text={n.d} />
        </>
      )}
      {n.hijos && n.hijos.length > 0 && (
        <ul>
          {n.hijos.map((h, i) => (
            <Arbol key={i} n={h} />
          ))}
        </ul>
      )}
    </li>
  );
}

function BloqueC({ b }: { b: BloqueDiapo }) {
  switch (b.t) {
    case 'texto':
      return (
        <p>
          <Txt text={b.text} />
        </p>
      );
    case 'clave':
      return (
        <p className="pc__clave">
          <Txt text={b.text} />
        </p>
      );
    case 'lista':
      return (
        <ul>
          {b.items.map((x, i) => (
            <li key={i}>
              <Txt text={x} />
            </li>
          ))}
        </ul>
      );
    case 'def':
      return (
        <p>
          <strong>{b.term}:</strong> <Txt text={b.text} />
        </p>
      );
    case 'cuadro':
      return (
        <table className="pc__tabla">
          {b.head.some(Boolean) && (
            <thead>
              <tr>
                {b.head.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {b.filas.map((f, i) => (
              <tr key={i}>
                {f.map((c, j) => (
                  <td key={j}>
                    <Txt text={c} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    case 'comparar':
      return (
        <ul className="pc__comparar">
          {b.cols.map((c, i) => (
            <li key={i}>
              <strong>{c.titulo}:</strong>{' '}
              {c.items.map((x, j) => (
                <span key={j}>
                  {j > 0 && ' · '}
                  <Txt text={x} />
                </span>
              ))}
            </li>
          ))}
        </ul>
      );
    case 'cadena':
      return (
        <p className="pc__cadena">
          {b.pasos.map((p, i) => (
            <span key={i}>
              {i > 0 && ' → '}
              <Txt text={p.text} />
            </span>
          ))}
        </p>
      );
    case 'secuencia':
      return (
        <ol className="pc__sec">
          {b.items.map((x, i) => (
            <li key={i}>
              <strong>{x.t}</strong>
              {x.d && (
                <>
                  {': '}
                  <Txt text={x.d} />
                </>
              )}
            </li>
          ))}
        </ol>
      );
    case 'arbol':
      return (
        <ul className="pc__arbol">
          <Arbol n={b.raiz} />
        </ul>
      );
    case 'prof':
      return (
        <p className="pc__prof">
          <strong>Ortega:</strong> <Txt text={b.text} />
        </p>
      );
    default:
      return null;
  }
}

function DiapoC({ d }: { d: D }) {
  return (
    <div className="pc__diapo">
      <h4>{d.titulo}</h4>
      {d.bloques.map((b, i) => (
        <BloqueC key={i} b={b} />
      ))}
      {d.examen && (
        <p className="pc__examen">
          <strong>❗ {d.examen.origen === 'ortega' ? 'Pregunta de examen' : 'Preguntero'}:</strong> <Txt text={d.examen.texto} />
        </p>
      )}
      {d.aclara && (
        <p className="pc__aclara">
          <Rich text={d.aclara.text} />
        </p>
      )}
    </div>
  );
}

function TemaCompacto({ x, n }: { x: TemaC; n: number }) {
  const { t } = x;
  const ps = PREGUNTAS.filter((p) => p.tema === t.id);
  return (
    <section className="pc__tema">
      <h2 className="pc__titulo">
        {n}. {t.titulo}
        {t.prioridad === 'critico' && <span className="pc__crit">CRÍTICO</span>}
        {enPizarra(t) && <span className="pc__piz">✎ PIZARRA</span>}
      </h2>
      <div className="pc__pide">
        <strong>Qué te puede pedir:</strong>
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
          <h3 className="pc__h">Fisiopatología</h3>
          {x.fisio.map((d) => (
            <DiapoC key={d.id} d={d} />
          ))}
        </>
      )}
      {x.teoria.length > 0 && (
        <>
          <h3 className="pc__h">Teoría</h3>
          {x.teoria.map((d) => (
            <DiapoC key={d.id} d={d} />
          ))}
        </>
      )}
      {t.nuevo?.map((nv, i) => (
        <div key={i} className="pc__pizarra">
          <h3 className="pc__h">✎ {nv.titulo}</h3>
          <Blocks blocks={nv.blocks} />
        </div>
      ))}
      {t.id === 'pares' && (
        <>
          <h3 className="pc__h">Los doce pares</h3>
          {PARES.map((p) => (
            <div key={p.n} className="pc__diapo">
              <h4>
                {p.n} · {p.nombre} ({p.tipo})
              </h4>
              <p>
                <strong>Función:</strong> <Rich text={p.funcion} />
              </p>
              <p>
                <strong>Origen real:</strong> <Rich text={p.real} /> <strong>Aparente:</strong> <Rich text={p.aparente} />
              </p>
              <p>
                <strong>Recorrido:</strong> <Rich text={p.recorrido} />
              </p>
              <p>
                <strong>Examen:</strong> <Rich text={p.explora} />
              </p>
              <p>
                <strong>Alteraciones:</strong> <Rich text={p.alteraciones} />
              </p>
              <p>
                <strong>¿Por qué?</strong> <Rich text={p.porque} />
              </p>
            </div>
          ))}
        </>
      )}
      {t.maniobras && t.maniobras.length > 0 && (
        <>
          <h3 className="pc__h">Maniobras</h3>
          {t.maniobras.map((id) => {
            const m = maneuverById(id);
            if (!m) return null;
            return (
              <div key={id} className="pc__diapo">
                <h4>{m.name}</h4>
                <p>
                  <strong>Explora:</strong> <Rich text={m.explores} />
                </p>
                <p>
                  <strong>Técnica:</strong>{' '}
                  {m.technique.map((s, i) => (
                    <span key={i}>
                      {i > 0 && ' '}
                      <Rich text={s} />
                    </span>
                  ))}
                </p>
                <p>
                  <strong>Positivo:</strong> <Rich text={m.pathologic} />
                </p>
                <p>
                  <strong>Significa:</strong> <Rich text={m.interpretation} />
                </p>
              </div>
            );
          })}
        </>
      )}
      {t.memoria && t.memoria.length > 0 && (
        <>
          <h3 className="pc__h">Memoria</h3>
          {t.memoria.map((m) => (
            <p key={m.gancho} className="pc__memo">
              <strong>{m.gancho}</strong> — <Rich text={m.explica} />
            </p>
          ))}
        </>
      )}
      {ps.length > 0 && (
        <>
          <h3 className="pc__h">Preguntas del oral</h3>
          {ps.map((p, i) => (
            <div key={p.id} className="pc__preg">
              <h4>
                {i + 1}. <Rich text={p.q} />
              </h4>
              <p className="pc__oral">
                <Rich text={p.oral} />
              </p>
              {p.desarrollo.length > 0 && <Blocks blocks={p.desarrollo} />}
              {p.repreguntas.length > 0 && (
                <ul className="pc__repreg">
                  {p.repreguntas.map((r, j) => (
                    <li key={j}>
                      <strong>
                        <Rich text={r.q} />
                      </strong>{' '}
                      <Rich text={r.a} />
                    </li>
                  ))}
                </ul>
              )}
              {p.error && (
                <p className="pc__error">
                  <strong>Error a evitar:</strong> <Rich text={p.error} />
                </p>
              )}
            </div>
          ))}
        </>
      )}
      <div className="pc__quedate">
        <strong>Con esto tenés que quedarte</strong>
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

export function ImprimirParcialCompacto() {
  const { sistema } = useParams();
  const sis = SISTEMAS_PARCIAL.find((s) => s.id === sistema);
  const [temas, setTemas] = useState<TemaC[] | null>(null);
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
    if (temas) window.setTimeout(() => document.body.setAttribute('data-print-ready', '1'), 800);
  }, [temas]);
  if (!sis) return <NotFound />;
  if (!temas) return <Loading label="Preparando el PDF para imprimir…" />;
  return (
    <div className={`pc tone-${sis.tono}`}>
      <header className="pc__cab">
        <h1>
          Parcial oral del {FECHA_PARCIAL} · {sis.titulo}
        </h1>
        <p>
          <strong>Cómo responder:</strong>{' '}
          {COMO_RESPONDER.niveles.map((nv, i) => (
            <span key={nv.n}>
              {i > 0 && ' · '}
              {nv.n}) {nv.t}
            </span>
          ))}
          . ✎ = lo escribió en la pizarra del repaso.
        </p>
      </header>
      {temas.map((x, i) => (
        <TemaCompacto key={x.t.id} x={x} n={i + 1} />
      ))}
    </div>
  );
}
