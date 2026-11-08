import { useState } from 'react';
import { Refs, Rich } from '@/components/Rich';
import type { CasoClase } from './tipos';

export function Caso({ caso, onRespuesta }: { caso: CasoClase; onRespuesta?: (ok: boolean) => void }) {
  const [e, setE] = useState<number | null>(null);
  const respondida = e !== null;
  return (
    <article className="caso">
      <h4>
        {caso.titulo}
        <span className="caso__origen">{caso.origen === 'clase' ? 'contado en clase' : 'armado para practicar'}</span>
      </h4>
      <p>
        <Rich text={caso.texto} />
      </p>
      <p className="caso__q">
        <Rich text={caso.pregunta} />
      </p>
      <div className="caso__ops">
        {caso.opciones.map((o, i) => (
          <button
            key={i}
            type="button"
            disabled={respondida}
            aria-pressed={e === i}
            className={!respondida ? '' : i === caso.correcta ? 'is-ok' : i === e ? 'is-mal' : 'is-apag'}
            onClick={() => {
              setE(i);
              onRespuesta?.(i === caso.correcta);
            }}
          >
            <Rich text={o.text} />
          </button>
        ))}
      </div>
      {respondida && (
        <div className="caso__r" role="status">
          <p>
            <strong>{e === caso.correcta ? 'Correcto.' : 'No es la mejor respuesta.'}</strong> <Rich text={caso.opciones[e].why} />
          </p>
          <p>
            <Rich text={caso.razonamiento} />
          </p>
          {caso.refs && <Refs refs={caso.refs} label="Clase" />}
          <button type="button" className="caso__otra" onClick={() => setE(null)}>
            Volver a intentar
          </button>
        </div>
      )}
    </article>
  );
}
