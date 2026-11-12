// Práctica de la consigna del maniquí: Ortega señala un punto y pregunta «¿qué punto doloroso es este?».
// Modo práctica (reconocer entre opciones y revelar) y modo mapa (todos los puntos, tocar para ver).
import { useMemo, useState } from 'react';
import { AbdomenFig } from '@/visual/anatomia';
import { Icon } from '@/components/Icon';
import { Refs, Rich } from '@/components/Rich';
import { PUNTOS_DOLOROSOS, REPAROS_ANT } from '@content/parcial/puntos';
import type { PuntoDoloroso } from '@content/parcial/tipos';

const TORSO = 'M84,8 C62,80 50,160 52,240 C54,318 62,372 104,424 L200,462 L296,424 C338,372 346,318 348,240 C350,160 338,80 316,8 Z';

/** Reparos anatómicos de la vista anterior: espinas ilíacas, líneas umbílico-espinales y biilíaca. */
function ReparosAnteriores() {
  const { ombligo: o, eiasD, eiasI } = REPAROS_ANT;
  return (
    <g className="mq__reparos">
      <line x1={o.x} y1={o.y} x2={eiasD.x} y2={eiasD.y} />
      <line x1={o.x} y1={o.y} x2={eiasI.x} y2={eiasI.y} />
      <line x1={eiasD.x} y1={eiasD.y} x2={eiasI.x} y2={eiasI.y} />
      <line x1={o.x} y1={112} x2={o.x} y2={430} className="mq__media" />
      <circle cx={eiasD.x} cy={eiasD.y} r={5} />
      <circle cx={eiasI.x} cy={eiasI.y} r={5} />
      <text x={eiasD.x - 4} y={eiasD.y + 20} textAnchor="middle">EIAS</text>
      <text x={eiasI.x + 4} y={eiasI.y + 20} textAnchor="middle">EIAS</text>
    </g>
  );
}

/** Vista posterior esquemática: columna, 12.ª costillas, masas lumbares y crestas ilíacas. */
function Espalda() {
  const vert = Array.from({ length: 17 }, (_, i) => 30 + i * 24);
  return (
    <g>
      <path d={TORSO} fill="var(--v-skin)" stroke="var(--v-line)" strokeWidth={3} />
      <g className="mq__espalda">
        {vert.map((y) => (
          <rect key={y} x={192} y={y} width={16} height={16} rx={4} />
        ))}
        <path d="M232,108 C228,180 230,260 244,330 M168,108 C172,180 170,260 156,330" className="mq__musculo" />
        <path d="M208,250 C240,252 268,262 300,286 M192,250 C160,252 132,262 100,286" className="mq__costilla" />
        <path d="M208,226 C246,226 280,236 316,262 M192,226 C154,226 120,236 84,262" className="mq__costilla mq__costilla--11" />
        <path d="M90,372 C130,338 170,334 192,348 M310,372 C270,338 230,334 208,348" className="mq__cresta" />
        <text x={306} y={300}>12.ª costilla</text>
        <text x={248} y={128}>masa lumbar</text>
        <text x={318} y={392}>cresta ilíaca</text>
      </g>
      <text x={380} y={460} textAnchor="end" className="mq__lado">der. del paciente</text>
      <text x={20} y={460} className="mq__lado">izq.</text>
    </g>
  );
}

function Marca({ p, activo, onClick, etiqueta }: { p: PuntoDoloroso; activo?: boolean; onClick?: () => void; etiqueta?: boolean }) {
  const zona = p.zona;
  return (
    <g className={`mq__punto ${activo ? 'is-on' : ''} ${onClick ? 'is-click' : ''}`} onClick={onClick} role={onClick ? 'button' : undefined} aria-label={onClick ? p.nombre : undefined} tabIndex={onClick ? 0 : undefined} onKeyDown={(e) => onClick && (e.key === 'Enter' || e.key === ' ') && onClick()}>
      {zona && 'poly' in zona ? <polygon points={zona.poly} className="mq__zona" /> : null}
      <circle cx={p.x} cy={p.y} r={16} className="mq__anillo" />
      <circle cx={p.x} cy={p.y} r={7} className="mq__centro" />
      {etiqueta && (
        <text x={p.x} y={p.y - 22} textAnchor="middle" className="mq__etq">
          {p.nombre.replace(/^Punto(s)? (de )?/, '').replace(/ \(.*\)$/, '')}
        </text>
      )}
    </g>
  );
}

function Esquema({ vista, puntos, activo, onPunto, etiquetas }: { vista: 'anterior' | 'posterior'; puntos: PuntoDoloroso[]; activo?: string; onPunto?: (id: string) => void; etiquetas?: boolean }) {
  return (
    <svg viewBox="0 0 400 470" className="mq__svg" role="img" aria-label={vista === 'anterior' ? 'Abdomen, vista anterior' : 'Espalda, vista posterior'}>
      {vista === 'anterior' ? (
        <>
          <AbdomenFig etiquetas={false} idp="mq" />
          <ReparosAnteriores />
        </>
      ) : (
        <Espalda />
      )}
      {puntos
        .filter((p) => p.vista === vista)
        .map((p) => (
          <Marca key={p.id} p={p} activo={p.id === activo} onClick={onPunto ? () => onPunto(p.id) : undefined} etiqueta={etiquetas} />
        ))}
    </svg>
  );
}

export function FichaPunto({ p }: { p: PuntoDoloroso }) {
  return (
    <div className="mq__ficha">
      <h4>{p.nombre}</h4>
      <p className="mq__resp">
        <Rich text={p.respuesta} />
      </p>
      <dl>
        <dt>Cómo encontrarlo</dt>
        <dd>
          <Rich text={p.reparo} />
        </dd>
        <dt>Qué hay debajo</dt>
        <dd>
          <Rich text={p.organo} />
        </dd>
        <dt>Si duele</dt>
        <dd>
          <Rich text={p.significa} />
        </dd>
        <dt>Cómo se explora</dt>
        <dd>
          <Rich text={p.explora} />
        </dd>
      </dl>
      {p.prof && (
        <p className="mq__prof">
          <Icon name="cap" size={15} /> <Rich text={p.prof.text} />
        </p>
      )}
      <Refs refs={[...(p.prof ? [p.prof.ref] : []), ...p.refs]} />
    </div>
  );
}

const mezclar = <T,>(a: T[]): T[] => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

export function Maniqui({ sistema }: { sistema?: 'digestivo' | 'renal' }) {
  const lista = useMemo(() => PUNTOS_DOLOROSOS.filter((p) => !sistema || p.sistema === sistema), [sistema]);
  const [modo, setModo] = useState<'practica' | 'mapa'>('practica');
  const [orden, setOrden] = useState(() => mezclar(lista.map((p) => p.id)));
  const [i, setI] = useState(0);
  const [elegido, setElegido] = useState<string | null>(null);
  const [aciertos, setAciertos] = useState({ bien: 0, total: 0 });
  const [sel, setSel] = useState<string>(lista[0]?.id);
  const actual = lista.find((p) => p.id === orden[i % orden.length])!;
  const opciones = useMemo(() => {
    const otros = mezclar(lista.filter((p) => p.id !== actual.id)).slice(0, 3);
    return mezclar([actual, ...otros]);
  }, [actual, lista]);
  const siguiente = () => {
    setElegido(null);
    if (i + 1 >= orden.length) {
      setOrden(mezclar(lista.map((p) => p.id)));
      setI(0);
    } else setI(i + 1);
  };
  const elegir = (id: string) => {
    if (elegido) return;
    setElegido(id);
    setAciertos((a) => ({ bien: a.bien + (id === actual.id ? 1 : 0), total: a.total + 1 }));
  };
  const selP = lista.find((p) => p.id === sel);

  return (
    <div className="mq">
      <div className="seg mq__modo" role="tablist" aria-label="Modo">
        <button role="tab" aria-selected={modo === 'practica'} className={modo === 'practica' ? 'is-on' : ''} onClick={() => setModo('practica')}>
          ¿Qué punto es este?
        </button>
        <button role="tab" aria-selected={modo === 'mapa'} className={modo === 'mapa' ? 'is-on' : ''} onClick={() => setModo('mapa')}>
          Ver todos los puntos
        </button>
      </div>
      {modo === 'practica' ? (
        <div className="mq__grid">
          <div className="mq__lamina">
            <Esquema vista={actual.vista} puntos={[actual]} activo={actual.id} />
            <p className="mq__vista">{actual.vista === 'anterior' ? 'Vista anterior (la derecha del paciente queda a tu izquierda)' : 'Vista posterior'}</p>
          </div>
          <div className="mq__panel">
            <p className="mq__consigna">
              <Icon name="target" size={18} /> Ortega señala este punto: <strong>¿qué punto doloroso es?</strong>
            </p>
            <div className="mq__opciones">
              {opciones.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={`mq__op ${elegido ? (o.id === actual.id ? 'is-ok' : o.id === elegido ? 'is-bad' : '') : ''}`}
                  onClick={() => elegir(o.id)}
                  disabled={Boolean(elegido)}
                >
                  {o.nombre}
                </button>
              ))}
            </div>
            {elegido ? (
              <>
                <FichaPunto p={actual} />
                <button type="button" className="btn btn--primary" onClick={siguiente}>
                  Siguiente punto <Icon name="arrowRight" size={16} />
                </button>
              </>
            ) : (
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => elegir('__no-se')}>
                No lo sé: mostrame la respuesta
              </button>
            )}
            <p className="mq__score" aria-live="polite">
              {aciertos.total > 0 && (
                <>
                  <strong>
                    {aciertos.bien} de {aciertos.total}
                  </strong>{' '}
                  reconocidos · punto {(i % orden.length) + 1} de {orden.length}
                </>
              )}
            </p>
          </div>
        </div>
      ) : (
        <div className="mq__grid">
          <div className="mq__lamina mq__lamina--doble">
            <Esquema vista="anterior" puntos={lista} activo={sel} onPunto={setSel} />
            {lista.some((p) => p.vista === 'posterior') && <Esquema vista="posterior" puntos={lista} activo={sel} onPunto={setSel} />}
          </div>
          <div className="mq__panel">
            <div className="mq__lista">
              {lista.map((p) => (
                <button key={p.id} type="button" className={`mq__chip ${sel === p.id ? 'is-on' : ''}`} onClick={() => setSel(p.id)}>
                  {p.nombre.replace(/ \(.*\)$/, '')}
                </button>
              ))}
            </div>
            {selP && <FichaPunto p={selP} />}
          </div>
        </div>
      )}
    </div>
  );
}
