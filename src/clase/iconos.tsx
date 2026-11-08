import type { IconoClase } from './tipos';

const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

const TRAZOS: Record<IconoClase, JSX.Element> = {
  dolor: <path d="M13 2 5 13h6l-1 9 9-12h-6z" {...P} />,
  vomito: (
    <g {...P}>
      <path d="M8 7a4 4 0 1 1 8 0c0 2-1.4 3.4-4 3.4S8 9 8 7Z" />
      <path d="M12 11v3M9 16c0 2 .5 3-.5 5M12 15v6M15 16c0 2-.5 3 .5 5" />
    </g>
  ),
  fiebre: (
    <g {...P}>
      <path d="M14 14.8V5a2 2 0 1 0-4 0v9.8a4 4 0 1 0 4 0Z" />
      <path d="M12 9v8" />
    </g>
  ),
  reloj: (
    <g {...P}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </g>
  ),
  bisturi: <path d="M3 21 14 10l3 3L6 21H3Zm11-11 5.5-6c1.3 1 2 2.4 1.5 4L17 13" {...P} />,
  gota: <path d="M12 3s7 7.2 7 12a7 7 0 0 1-14 0c0-4.8 7-12 7-12Z" {...P} />,
  aire: <path d="M3 8h11a3 3 0 1 0-3-3M3 13h15a3 3 0 1 1-3 3M3 18h7" {...P} />,
  fuego: <path d="M12 3c1 4 5 6 5 11a5 5 0 0 1-10 0c0-2 1-3 2-4 .3 1.6 1 2.4 2 3 .4-3-1-6 1-10Z" {...P} />,
  nudo: <path d="M3 12h4c2 0 3-5 5-5s3 10 5 10 1-5 4-5" {...P} />,
  vaso: <path d="M4 7c6 0 6 10 12 10h4M4 17c3 0 4-3 5-5m3-4c1-1 2-1 4-1h4" {...P} />,
  corazon: <path d="M12 20s-8-5-8-11a4.4 4.4 0 0 1 8-2.6A4.4 4.4 0 0 1 20 9c0 6-8 11-8 11Z" {...P} />,
  cerebro: <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3 3 3 0 0 0 3-2V6a3 3 0 0 0-3-2Zm6 0a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3 3 3 0 0 1-3-2" {...P} />,
  rinon: <path d="M15 3c-5 0-9 4-9 10 0 4 2 8 6 8 3 0 3-3 2-5-.8-1.6-1-3 .5-4 2-1 5 0 5-4 0-3-2-5-4.5-5Z" {...P} />,
  piel: <path d="M3 8c3 2 6 2 9 0s6-2 9 0M3 14c3 2 6 2 9 0s6-2 9 0M6 20h12" {...P} />,
  eco: (
    <g {...P}>
      <path d="M8 4h8l1 6H7l1-6Z" />
      <path d="M6 14c3 1.5 9 1.5 12 0M4 18c4 2 12 2 16 0" />
    </g>
  ),
  rx: (
    <g {...P}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M12 6v12M8 8c2 1 6 1 8 0M7.5 12c3 1 6 1 9 0M8 16c2 .8 6 .8 8 0" />
    </g>
  ),
  tac: (
    <g {...P}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path d="M3 12h5M16 12h5" />
    </g>
  ),
  lab: <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3M8 15h8" {...P} />,
  pregunta: (
    <g {...P}>
      <path d="M9 9a3 3 0 1 1 4.4 2.7C12.3 12.4 12 13 12 14" />
      <circle cx="12" cy="18" r=".6" />
      <circle cx="12" cy="12" r="10" />
    </g>
  ),
  mano: <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12m0-7a1.5 1.5 0 0 1 3 0v7m0-5.5a1.5 1.5 0 0 1 3 0V13m0-3.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.5a6 6 0 0 1-4.6-2.2L5 15.5a1.6 1.6 0 0 1 2.4-2.1L8 14" {...P} />,
  oreja: <path d="M7 10a5 5 0 1 1 10 0c0 3-3 4-3 7a3 3 0 0 1-6 0M10 10a2 2 0 1 1 4 0" {...P} />,
  ojo: (
    <g {...P}>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </g>
  ),
};

export function Ico({ n }: { n: IconoClase }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="sl-ico">
      {TRAZOS[n]}
    </svg>
  );
}
