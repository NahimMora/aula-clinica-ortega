import type { SVGProps } from 'react';

const P: Record<string, string> = {
  stomach: 'M9 3v4c0 2-3 2.5-3 6.5C6 18 9.5 21 13.5 21S20 18.2 20 14.5c0-3-2.2-4.5-4.5-4.5-1.7 0-2.5 1-3.5 1s-1-1.4-1-3V3',
  kidney: 'M12 6.5C10.5 3.5 4 3.8 4 10s4.5 10 7 10c1.7 0 2-1.6 1-3.2-.8-1.3-.8-3.3 0-4.3M12 6.5c1.5-3 8-2.7 8 3.5s-4.5 10-7 10M12 12.5h3',
  brain: 'M9.5 4.5A2.5 2.5 0 0 0 7 7a3 3 0 0 0-2 5.2A3 3 0 0 0 7.5 17a2.5 2.5 0 0 0 4.5 1.5V6a2 2 0 0 0-2.5-1.5zM14.5 4.5A2.5 2.5 0 0 1 17 7a3 3 0 0 1 2 5.2 3 3 0 0 1-2.5 4.8 2.5 2.5 0 0 1-4.5 1.5',
  hand: 'M8 13V5.5a1.5 1.5 0 0 1 3 0V12m0-7a1.5 1.5 0 0 1 3 0v7m0-5.5a1.5 1.5 0 0 1 3 0V13m0-3.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.5a6 6 0 0 1-4.6-2.2L5 15.5a1.6 1.6 0 0 1 2.4-2.1L8 14',
  bone: 'M7.5 4.5a2.5 2.5 0 0 0-2.4 3.3A2.5 2.5 0 1 0 8 11l5 5a2.5 2.5 0 1 0 3.2 2.9 2.5 2.5 0 1 0 2.7-4.3 2.5 2.5 0 0 0-2.9-.6l-5-5a2.5 2.5 0 0 0-3.5-4.5z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm9 16-4-4',
  bookmark: 'M6 4h12v17l-6-4-6 4z',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  star: 'M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z',
  play: 'M8 5v14l11-7z',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 4.5V12l3 2',
  book: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zm0 15A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 18.5',
  map: 'M9 4 3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5zm0 0v13.5m6-11V20',
  layers: 'M12 3 2.5 8 12 13l9.5-5zM2.5 12.5 12 17.5l9.5-5M2.5 16.5 12 21.5l9.5-5',
  list: 'M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z',
  refresh: 'M20 11a8 8 0 0 0-14.3-4.9L4 8m0-5v5h5M4 13a8 8 0 0 0 14.3 4.9L20 16m0 5v-5h-5',
  download: 'M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M4.5 19.5h15',
  upload: 'M12 15V4m0 0L7.5 8.5M12 4l4.5 4.5M4.5 19.5h15',
  menu: 'M4 6.5h16M4 12h16M4 17.5h16',
  close: 'M6 6l12 12M18 6 6 18',
  chevronRight: 'M9 5l7 7-7 7',
  chevronLeft: 'M15 5l-7 7 7 7',
  chevronDown: 'M5 9l7 7 7-7',
  arrowRight: 'M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5',
  flag: 'M5 21V4m0 0h11l-1.8 4L16 12H5',
  target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2z',
  cap: 'M2.5 9 12 4.5 21.5 9 12 13.5zM6.5 11v4.5c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3V11M21.5 9v5',
  bulb: 'M9 18h6m-5 3h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z',
  alert: 'M12 4 2.5 20h19zM12 10v4.5m0 2.5h.01',
  video: 'M3.5 6.5h12v11h-12zm12 4 5-3v9l-5-3',
  pen: 'M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4',
  home: 'M3.5 11 12 4l8.5 7M6 9.5V20h12V9.5',
  chart: 'M4 20V10m6 10V4m6 16v-7m4 7H3',
  trash: 'M4.5 7h15M9.5 7V4.5h5V7m-8 0 1 13h9l1-13',
  info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 8v5m0-8.5h.01',
  heart: 'M12 20s-7.5-4.5-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3c0 5.5-7.5 10-7.5 10z',
  quote: 'M7 7h4v4c0 3-1.5 5-4 6m6-10h4v4c0 3-1.5 5-4 6',
  route: 'M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm12-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 15V9.5A3.5 3.5 0 0 1 9.5 6H13m-1 13h2.5a3.5 3.5 0 0 0 3.5-3.5V9',
  stethoscope: 'M6 3v5a5 5 0 0 0 10 0V3M11 13v2.5a4.5 4.5 0 0 0 9 0V13m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  eye: 'M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12zm9.5-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  timer: 'M12 7a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm0 3.5V14l2 1.5M9.5 3h5M12 3v4',
};

export type IconName = keyof typeof P | string;

export function Icon({ name, size = 20, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  const d = P[name] ?? P.info;
  const filled = name === 'play' || name === 'star';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      <path d={d} />
    </svg>
  );
}
