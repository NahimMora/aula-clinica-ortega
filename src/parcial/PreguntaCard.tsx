// Una pregunta del parcial en tres niveles: respuesta oral directa → fundamento → repreguntas.
// Primero se intenta responder sin mirar; después se revela de a un nivel.
import { useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Blocks } from '@/components/Blocks';
import { Icon } from '@/components/Icon';
import { Refs, Rich } from '@/components/Rich';
import { preguntaById } from '@content/parcial/preguntas';
import { temaById } from '@content/parcial/temario';
import type { EstadoPregunta, OrigenPregunta, PreguntaParcial } from '@content/parcial/tipos';
import { MARCAS, marcar, useMarcas } from './marcas';

export const ORIGEN_LABEL: Record<OrigenPregunta, string> = {
  repaso: 'Repaso 11/11',
  oral: 'Oral 10/11',
  clase: 'Clase',
  preguntero: 'Preguntero',
  simulada: 'Simulada',
};

export const ESTADO_LABEL: Record<EstadoPregunta, { label: string; title: string }> = {
  confirmada: { label: 'Ya estaba · confirmada', title: 'Ya estaba en la web y el repaso la vuelve a marcar' },
  ampliada: { label: 'Ya estaba · ampliada', title: 'Ya estaba en la web; el repaso agrega algo nuevo' },
  nueva: { label: 'Nueva del repaso', title: 'Aparece por primera vez en el repaso del 11/11' },
  anterior: { label: 'De clases anteriores', title: 'Ya estaba (clase, oral o preguntero); el tema entra al parcial' },
  simulada: { label: 'Simulada', title: 'Armada para practicar: no es una pregunta de Ortega' },
};

/** Ruta a una diapositiva: dentro del tema si está en su mazo; si no, al capítulo. */
export function linkDiapo(diapo: string, temaId?: string): string {
  const [cap, d] = diapo.split(':');
  const tema = temaId ? temaById(temaId) : undefined;
  if (tema && tema.diapos.some((x) => x.cap === cap && x.ids.includes(d))) return `/parcial/${tema.sistema}?t=${tema.id}&d=${encodeURIComponent(diapo)}&ir=teoria`;
  return `/capitulo/${cap}?t=${d.startsWith('f-') ? 'fisio' : 'teoria'}&d=${d}`;
}

export function Etiquetas({ p }: { p: PreguntaParcial }) {
  return (
    <span className="pq__tags">
      <span className={`pq__estado pq__estado--${p.estado}`} title={ESTADO_LABEL[p.estado].title}>
        {ESTADO_LABEL[p.estado].label}
      </span>
      {p.origen
        .filter((o) => o !== 'simulada')
        .map((o) => (
          <span key={o} className={`pq__origen pq__origen--${o}`}>
            {ORIGEN_LABEL[o]}
          </span>
        ))}
      {p.origen.filter((o) => o !== 'simulada' && o !== 'preguntero').length >= 2 && (
        <span className="pq__varias" title="La mencionó en más de una instancia (prioridad, no garantía)">
          <Icon name="star" size={12} /> varias veces
        </span>
      )}
    </span>
  );
}

export function Marcador({ id }: { id: string }) {
  const marcas = useMarcas();
  return (
    <div className="pq__marcas" role="group" aria-label="Cómo me fue">
      {MARCAS.map((m) => (
        <button key={m.id} type="button" className={`pq__marca pq__marca--${m.tono} ${marcas[id] === m.id ? 'is-on' : ''}`} aria-pressed={marcas[id] === m.id} onClick={() => marcar(id, m.id)}>
          {m.label}
        </button>
      ))}
    </div>
  );
}

/** Niveles 2 y 3 y el resto de la ficha (se usan también en el simulacro). */
export function Fundamento({ p, temaId }: { p: PreguntaParcial; temaId?: string }) {
  return (
    <>
      {p.desarrollo.length > 0 && (
        <section className="pq__nivel pq__nivel--2">
          <h4>
            <span className="pq__n">2</span> Si te pregunta «¿por qué?»: el fundamento
          </h4>
          <Blocks blocks={p.desarrollo} />
        </section>
      )}
      {p.repreguntas.length > 0 && (
        <section className="pq__nivel pq__nivel--3">
          <h4>
            <span className="pq__n">3</span> Repreguntas posibles
          </h4>
          <ol className="pq__repreg">
            {p.repreguntas.map((r, i) => (
              <li key={i}>
                <details>
                  <summary>
                    <Rich text={r.q} />
                  </summary>
                  <p>
                    <Rich text={r.a} />
                  </p>
                </details>
              </li>
            ))}
          </ol>
        </section>
      )}
      {(p.relaciones?.length || p.diapo) && (
        <div className="pq__rel">
          <Icon name="route" size={15} />
          <span>Relacionala con:</span>
          {p.relaciones?.map((r, i) => {
            const otra = r.to ? preguntaById(r.to) : undefined;
            return otra ? (
              <Link key={i} to={`/parcial/preguntas?s=${otra.sistema}&q=${otra.id}`} onClick={(e) => abrirPregunta(e, otra.id)}>
                <Rich text={r.text} />
              </Link>
            ) : (
              <span key={i}>
                <Rich text={r.text} />
              </span>
            );
          })}
          {p.diapo && (
            <Link to={linkDiapo(p.diapo, temaId ?? p.tema)}>
              <Icon name="layers" size={14} /> Ver la diapositiva
            </Link>
          )}
        </div>
      )}
      {p.error && (
        <p className="pq__error">
          <Icon name="alert" size={15} /> <strong>Error a evitar:</strong> <Rich text={p.error} />
        </p>
      )}
      <Refs refs={p.fuentes} label="Fuente" />
    </>
  );
}

/** Abre la pregunta referida si está en la página; si no, el enlace lleva al banco con esa pregunta abierta. */
function abrirPregunta(e: MouseEvent, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  if (el instanceof HTMLDetailsElement) el.open = true;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function PreguntaCard({ p, temaId }: { p: PreguntaParcial; temaId?: string }) {
  const [nivel, setNivel] = useState(0);
  const marcas = useMarcas();
  return (
    <details className={`pq pq--${p.estado} ${marcas[p.id] ? `pq--m-${marcas[p.id]}` : ''}`} id={p.id}>
      <summary>
        <span className="pq__q">
          <Rich text={p.q} />
        </span>
        <Etiquetas p={p} />
      </summary>
      <div className="pq__body">
        {nivel === 0 ? (
          <button type="button" className="btn btn--soft pq__revelar" onClick={() => setNivel(1)}>
            <Icon name="eye" size={16} /> Respondé en voz alta y después mirá la respuesta
          </button>
        ) : (
          <>
            <section className="pq__nivel pq__nivel--1">
              <h4>
                <span className="pq__n">1</span> Respuesta oral: lo primero que decís
              </h4>
              <p className="pq__oral">
                <Rich text={p.oral} />
              </p>
            </section>
            {nivel === 1 ? (
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => setNivel(2)}>
                <Icon name="chevronDown" size={15} /> Fundamento, repreguntas y errores
              </button>
            ) : (
              <Fundamento p={p} temaId={temaId} />
            )}
            <Marcador id={p.id} />
          </>
        )}
      </div>
    </details>
  );
}
