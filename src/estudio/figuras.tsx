// Figuras didácticas del modo estudio. Se dibuja solo lo que un esquema representa con exactitud
// (capas de la pared, no anatomía realista); para anatomía y signos reales se usan imágenes con licencia abierta.
import { useEffect, useRef, useState, type ComponentType } from 'react';

const HAND = 'M8 13V5.5a1.5 1.5 0 0 1 3 0V12m0-7a1.5 1.5 0 0 1 3 0v7m0-5.5a1.5 1.5 0 0 1 3 0V13m0-3.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.5a6 6 0 0 1-4.6-2.2L5 15.5a1.6 1.6 0 0 1 2.4-2.1L8 14';

type Maniobra = 'reposo' | 'comprimir' | 'soltar';

/** Interpola `valor` hacia `meta`; con `rebote` sobrepasa levemente, como la pared al soltarla. */
function useTransicion(meta: number, ms: number, rebote: boolean) {
  const [v, setV] = useState(meta);
  const actual = useRef(meta);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      actual.current = meta;
      setV(meta);
      return;
    }
    const ini = actual.current;
    const t0 = performance.now();
    let raf = 0;
    const paso = (a: number) => {
      const u = Math.min(1, (a - t0) / ms);
      const e = rebote ? 1 - Math.cos(u * 5.2) * Math.exp(-4.2 * u) : 1 - (1 - u) * (1 - u);
      actual.current = ini + (meta - ini) * e;
      setV(actual.current);
      if (u < 1) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [meta, ms, rebote]);
  return v;
}

const CX = 232;
const onda = (base: number, d: number) => {
  const pts: string[] = [];
  for (let x = 0; x <= 640; x += 12) pts.push(`${x},${(base + d * Math.exp(-(((x - CX) / 96) ** 2))).toFixed(1)}`);
  return pts;
};
const banda = (y1: number, y2: number, d1: number, d2: number) => `M${onda(y1, d1).join(' L')} L${onda(y2, d2).reverse().join(' L')} Z`;

function PeritoneoMano() {
  const [m, setM] = useState<Maniobra>('reposo');
  const d = useTransicion(m === 'comprimir' ? 42 : 0, m === 'soltar' ? 620 : 420, m === 'soltar');
  const parietalOn = m === 'soltar';
  const visceralOn = m === 'comprimir';
  const ay = 214 + d * 0.5;
  const linea = (y: number, k = 1) => `M${onda(y, d * k).join(' L')}`;
  return (
    <div className="e-fig-peritoneo">
      <svg viewBox="0 0 640 330" role="img" aria-label="Corte esquemático de la pared abdominal: piel, músculo, peritoneo parietal, cavidad y asa intestinal cubierta por peritoneo visceral. La mano comprime y suelta.">
        <defs>
          <pattern id="e-musculo" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(32)">
            <rect width="9" height="9" fill="#3a2a2e" />
            <line x1="0" y1="0" x2="0" y2="9" stroke="#55393f" strokeWidth="3" />
          </pattern>
        </defs>
        <path d={banda(66, 78, d, d)} fill="#c9a58e" />
        <path d={banda(78, 90, d, d * 0.98)} fill="#8f7766" />
        <path d={banda(90, 116, d * 0.98, d * 0.92)} fill="url(#e-musculo)" />
        {/* Peritoneo parietal */}
        <path d={linea(118, 0.92)} fill="none" stroke={parietalOn ? '#ef7d95' : 'var(--e-capa)'} strokeWidth={parietalOn ? 4.5 : 2.5} />
        {/* Asa intestinal con su peritoneo visceral */}
        <ellipse cx={CX} cy={ay} rx={126} ry={52} fill="var(--v-gut)" />
        <ellipse cx={CX} cy={ay} rx={126} ry={52} fill="none" stroke={visceralOn ? '#8fb6d8' : 'var(--e-capa)'} strokeWidth={visceralOn ? 4.5 : 2.5} />
        <ellipse cx={CX} cy={ay} rx={60} ry={24} fill="#ef7d95" opacity={0.32} />
        <ellipse cx={500} cy={226} rx={96} ry={42} fill="var(--v-gut)" opacity={0.75} />
        <ellipse cx={500} cy={226} rx={96} ry={42} fill="none" stroke="var(--e-capa)" strokeWidth={2} opacity={0.75} />
        {/* Fibras */}
        <path d={`M${CX + 90},${ay + 37} C ${CX + 150},${ay + 88} 420,316 620,300`} fill="none" stroke="#8fb6d8" strokeWidth={2.2} className={visceralOn ? 'e-fibra e-fibra--lenta' : ''} strokeDasharray={visceralOn ? undefined : '2 6'} />
        <path d={`M330,${119 + d * 0.3} C 430,134 520,132 620,130`} fill="none" stroke="#ef7d95" strokeWidth={2.2} className={parietalOn ? 'e-fibra e-fibra--rapida' : ''} strokeDasharray={parietalOn ? undefined : '2 6'} />
        {/* Mano */}
        <g transform={`translate(${CX} ${(m === 'soltar' ? 18 : 30) + d}) scale(2.3,-2.3) translate(-12.5 -13)`} fill="#1a191e" stroke="var(--e-tinta)" strokeWidth={1.1} strokeLinejoin="round" strokeLinecap="round">
          <path d={HAND} />
        </g>
        {/* Rótulos */}
        <g className="e-fig-txt">
          <text x="10" y="58">Piel y tejido subcutáneo</text>
          <text x="10" y="108" className="sobre">Músculo</text>
          <text x="10" y="138" fill={parietalOn ? '#ef9bad' : undefined} fontWeight={parietalOn ? 650 : undefined}>Peritoneo parietal</text>
          <text x="10" y="168" className="tenue">Cavidad peritoneal</text>
          <text x={CX} y={ay + 5} textAnchor="middle" className="sobre">Órgano inflamado</text>
          <text x="10" y="244" fill={visceralOn ? '#a9cbe9' : undefined} fontWeight={visceralOn ? 650 : undefined}>Peritoneo</text>
          <text x="10" y="266" fill={visceralOn ? '#a9cbe9' : undefined} fontWeight={visceralOn ? 650 : undefined}>visceral</text>
          <text x="628" y="154" textAnchor="end" fill="#ef9bad">Aδ: rápida, precisa</text>
          <text x="628" y="322" textAnchor="end" fill="#a9cbe9">C: lenta, difusa</text>
        </g>
      </svg>
      <div className="e-fig-ctrl" role="group" aria-label="Maniobra sobre el abdomen">
        <button type="button" className={m === 'comprimir' ? 'is-on' : ''} onClick={() => setM('comprimir')}>
          Comprimir lento
        </button>
        <button type="button" className={m === 'soltar' ? 'is-on' : ''} onClick={() => setM('soltar')} disabled={m !== 'comprimir'}>
          Soltar de golpe
        </button>
        <p aria-live="polite">
          {m === 'reposo' && 'Comprimí para ver qué hoja se explora.'}
          {m === 'comprimir' && 'Si duele al comprimir: peritoneo visceral irritado.'}
          {m === 'soltar' && 'La pared vuelve de golpe y arrastra la hoja parietal. Si duele más que al comprimir: signo del rebote.'}
        </p>
      </div>
    </div>
  );
}

export const FIGURAS: Record<string, ComponentType> = {
  'peritoneo-mano': PeritoneoMano,
};
