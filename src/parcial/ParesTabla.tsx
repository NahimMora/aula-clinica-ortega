// Los doce pares en el esquema de Ortega. Cuadro general (con «tapar» para autoevaluarse) y ficha por par.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Refs, Rich } from '@/components/Rich';
import { maneuverById } from '@content/maneuvers';
import { PARES } from '@content/parcial/pares';
import { linkDiapo } from './PreguntaCard';

export function ParesTabla() {
  const [tapar, setTapar] = useState(false);
  const [vistos, setVistos] = useState<Set<string>>(new Set());
  const [sel, setSel] = useState('I');
  const p = PARES.find((x) => x.n === sel)!;
  const destapar = (n: string) => setVistos((v) => new Set(v).add(n));
  const oculto = (n: string) => tapar && !vistos.has(n);
  return (
    <div className="pares">
      <div className="pares__barra">
        <label className="switch">
          <input
            type="checkbox"
            checked={tapar}
            onChange={(e) => {
              setTapar(e.target.checked);
              setVistos(new Set());
            }}
          />
          <span>Tapar nombre, tipo y función (tocá la fila para destapar)</span>
        </label>
      </div>
      <div className="pares__tabla-wrap">
        <table className="pares__tabla">
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
              <tr
                key={x.n}
                className={`${sel === x.n ? 'is-on' : ''} ${oculto(x.n) ? 'is-tapado' : ''}`}
                onClick={() => {
                  if (oculto(x.n)) destapar(x.n);
                  setSel(x.n);
                }}
              >
                <th scope="row">{x.n}</th>
                <td>{oculto(x.n) ? '¿…?' : x.nombre}</td>
                <td>{oculto(x.n) ? '¿…?' : <span className={`pares__tipo pares__tipo--${x.tipo.toLowerCase()}`}>{x.tipo}</span>}</td>
                <td>{oculto(x.n) ? '¿…?' : <Rich text={x.funcion} />}</td>
                <td>
                  <Rich text={x.aparente} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pares__tabs" role="tablist" aria-label="Par craneal">
        {PARES.map((x) => (
          <button key={x.n} role="tab" aria-selected={sel === x.n} className={sel === x.n ? 'is-on' : ''} onClick={() => setSel(x.n)}>
            {x.n}
          </button>
        ))}
      </div>
      <article className="pares__ficha">
        <h4>
          {p.n} · {p.nombre} <span className={`pares__tipo pares__tipo--${p.tipo.toLowerCase()}`}>{p.tipo}</span>
        </h4>
        <dl>
          <dt>Función</dt>
          <dd>
            <Rich text={p.funcion} />
          </dd>
          <dt>Origen real</dt>
          <dd>
            <Rich text={p.real} />
          </dd>
          <dt>Origen aparente</dt>
          <dd>
            <Rich text={p.aparente} />
          </dd>
          <dt>Recorrido</dt>
          <dd>
            <Rich text={p.recorrido} />
          </dd>
          <dt>Examen físico</dt>
          <dd>
            <Rich text={p.explora} />
          </dd>
          <dt>Alteraciones</dt>
          <dd>
            <Rich text={p.alteraciones} />
          </dd>
          <dt>¿Por qué?</dt>
          <dd>
            <Rich text={p.porque} />
          </dd>
        </dl>
        {p.ortega && (
          <aside className="callout callout--prof">
            <div className="callout__head">
              <Icon name="cap" size={18} /> Lo que dijo Ortega
            </div>
            <p>
              <Rich text={p.ortega.text} />
            </p>
            <Refs refs={[p.ortega.ref]} />
          </aside>
        )}
        <div className="pares__links">
          {p.maniobras.map((id) => {
            const m = maneuverById(id);
            return m ? (
              <Link key={id} to={`/maniobras?m=${id}`} className="chip-link">
                <Icon name="hand" size={14} /> {m.name}
              </Link>
            ) : null;
          })}
          {p.diapo && (
            <Link to={linkDiapo(p.diapo, 'pares')} className="chip-link">
              <Icon name="layers" size={14} /> Ver la diapositiva
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}
