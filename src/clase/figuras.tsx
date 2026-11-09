// Ilustraciones de la clase. Cada figura es función pura de (t, paso, dt): la misma en la web y en Remotion.
// Colores por variables --v-* (tokens.css). Rótulos grandes: se leen también en un celular.
// Las figuras de cada sistema viven en figuras-<sistema>.tsx; acá se registran todas en FIGURAS.
import type { ComponentType } from 'react';
import { ABD_H, ABD_W, AbdomenFig } from '../visual/anatomia';
import type { Punto, Region, VTone } from '../visual/tipos';
import { type BaseFig, CIELO, CorteMedula, DIAFRAGMA, DURAZNO, ESTOMAGO, ESTOMAGO_D, HIGADO, HIGADO_D, INK, INK2, INK3, INTESTINO, L, LILA, LINE, MENTA, ManoFrente, Pulso, ROJO, ROSA, SANGRE, Tronco, Via, Visceras, apf, ease } from './figuras-base';
import { FIGURAS_DIG } from './figuras-dig';
import { FIGURAS_REN } from './figuras-ren';

/* ─────────── 1. Vía del dolor ─────────── */

function ViaDolor({ t, paso, dt }: BaseFig) {
  const ap = (n: number) => apf(paso, dt, n);
  const s1 = 'M118,440 C200,470 286,402 352,372';
  const s2 = 'M368,366 C404,352 440,368 474,392';
  const s3 = 'M474,392 C500,438 542,470 606,470';
  const s4 = 'M606,470 C664,400 650,250 560,162';
  const s5 = 'M542,146 C596,126 616,96 612,62';
  return (
    <svg viewBox="0 0 800 560" role="img" aria-label="Vía del dolor desde el nociceptor hasta la corteza">
      {/* Encéfalo en corte */}
      <path d="M520,20 C446,12 392,56 392,116 C392,162 430,194 478,194 L562,194 C610,194 648,162 648,116 C648,56 594,12 520,20 Z" fill="#c9a9a5" stroke="#8d6f6b" strokeWidth={2.5} />
      <path d="M520,20 L520,110 M436,70 C460,84 480,84 500,70 M540,70 C560,84 580,84 604,70 M420,120 C446,132 470,130 490,118 M550,118 C570,130 594,132 620,120" fill="none" stroke="#8d6f6b" strokeWidth={2} />
      <ellipse cx={520} cy={150} rx={36} ry={22} fill={LILA} opacity={0.35 + ap(2) * 0.6} />
      <path d="M520,194 L520,356" stroke="#d8cdc0" strokeWidth={30} strokeLinecap="round" opacity={0.28} />
      <CorteMedula cx={520} cy={430} luzAsta={ap(1)} />
      {/* Órgano y nociceptor */}
      <path d="M26,404 C70,380 128,384 156,420 C176,450 150,492 104,496 C60,500 20,476 18,444 C17,428 18,414 26,404 Z" fill={INTESTINO} stroke="#8f5f56" strokeWidth={2.5} />
      <g stroke={ROSA} strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.5 + 0.5 * Math.abs(Math.sin(t * 3))}>
        <path d="M118,440 L92,422 M118,440 L90,446 M118,440 L100,466 M92,422 L78,410 M92,422 L72,426 M100,466 L86,478" />
      </g>
      <Via d={s1} />
      <ellipse cx={360} cy={370} rx={22} ry={14} fill="#d8c7a8" stroke="#a48f6e" strokeWidth={2} />
      <Via d={s2} o={0.35 + ap(1) * 0.65} />
      <Via d={s3} o={ap(2)} />
      <Via d={s4} o={ap(2)} />
      <Via d={s5} o={ap(3)} />
      {paso >= 0 && <Pulso d={s1} t={t} />}
      {paso >= 1 && <Pulso d={s2} t={t} desfase={40} />}
      {paso >= 2 && <Pulso d={s3} t={t} c={LILA} desfase={70} />}
      {paso >= 2 && <Pulso d={s4} t={t} c={LILA} desfase={30} />}
      {paso >= 3 && <Pulso d={s5} t={t} c={CIELO} desfase={10} />}
      <circle cx={612} cy={60} r={13 + 3 * Math.sin(t * 4)} fill={CIELO} opacity={ap(3) * 0.75} />
      <L x={92} y={378} s={20}>Nociceptor</L>
      <L x={92} y={524} s={17} c={INK2} w={500}>terminal nerviosa libre</L>
      <L x={300} y={332} s={18} c={INK2} o={ap(0)}>Ganglio de la raíz posterior</L>
      <L x={346} y={448} s={18} o={ap(1)} a="end">Asta dorsal</L>
      <L x={346} y={472} s={16} c={INK2} w={500} o={ap(1)} a="end">sustancia P · glutamato</L>
      <L x={702} y={330} s={18} o={ap(2)} a="middle">Espinotalámica</L>
      <L x={702} y={354} s={16} c={INK2} w={500} o={ap(2)}>cruza y asciende</L>
      <L x={440} y={214} s={18} o={ap(2)}>Tálamo</L>
      <L x={722} y={62} s={18} o={ap(3)}>Corteza</L>
    </svg>
  );
}

/* ─────────── 2. Fibras ─────────── */

function Fibras({ t, paso, dt }: BaseFig) {
  const x0 = 110;
  const x1 = 670;
  const px = (ciclo: number, f = 0) => x0 + (x1 - x0) * (((t / ciclo + f) % 1) as number);
  const vainas = Array.from({ length: 7 }, (_, i) => x0 + 10 + i * 80);
  return (
    <svg viewBox="0 0 800 430" role="img" aria-label="Fibra mielínica A delta contra fibra amielínica C">
      <L x={40} y={96} a="start" c={ROSA} s={25}>Aδ · mielínica</L>
      <L x={760} y={96} a="end" s={22}>20 m/s</L>
      <line x1={x0} x2={x1} y1={158} y2={158} stroke={INK3} strokeWidth={5} />
      {vainas.map((x) => (
        <rect key={x} x={x} y={138} width={68} height={40} rx={16} fill="#e9dfd2" stroke="#b8a897" strokeWidth={2} />
      ))}
      <circle cx={px(1.1)} cy={158} r={14} fill={ROSA} />
      <circle cx={px(1.1)} cy={158} r={24} fill={ROSA} opacity={0.28} />
      <g opacity={apf(paso, dt, 1)}>
        <L x={40} y={250} a="start" c={CIELO} s={25}>C · amielínica</L>
        <L x={760} y={250} a="end" s={22}>2 m/s</L>
        <line x1={x0} x2={x1} y1={306} y2={306} stroke={INK3} strokeWidth={3.5} />
        <circle cx={px(11, 0.15)} cy={306} r={10} fill={CIELO} />
        <circle cx={px(11, 0.15)} cy={306} r={19} fill={CIELO} opacity={0.26} />
      </g>
      <L x={400} y={208} c={INK2} w={500} s={19}>agudo, punzante, límites precisos</L>
      <g opacity={apf(paso, dt, 1)}>
        <L x={400} y={362} c={INK2} w={500} s={19}>urente, vago, tardío, mal localizado</L>
      </g>
    </svg>
  );
}

/* ─────────── 3. Pared abdominal y maniobra ─────────── */

const CX = 300;
function ondaPared(base: number, d: number, ancho = 800) {
  const pts: string[] = [];
  for (let x = 0; x <= ancho; x += 14) pts.push(`${x},${(base + d * Math.exp(-(((x - CX) / 104) ** 2))).toFixed(1)}`);
  return pts;
}
const bandaPared = (y1: number, y2: number, d1: number, d2: number) => `M${ondaPared(y1, d1).join(' L')} L${ondaPared(y2, d2).reverse().join(' L')} Z`;

function Pared({ t, paso, dt, video, luz = 'ninguna', mano = false, fases, inerv = false }: BaseFig & { luz?: 'ninguna' | 'visceral' | 'parietal' | 'ambas'; mano?: boolean; fases?: ('reposo' | 'comprimir' | 'soltar')[]; inerv?: boolean }) {
  let d = 0;
  let fase: 'reposo' | 'comprimir' | 'soltar' = 'reposo';
  if (mano) {
    let u = 0;
    if (video && fases) {
      fase = fases[Math.min(paso, fases.length - 1)];
      u = dt;
    } else {
      const c = t % 7.2;
      if (c < 1.1) {
        fase = 'reposo';
        u = c;
      } else if (c < 3.7) {
        fase = 'comprimir';
        u = c - 1.1;
      } else if (c < 6.1) {
        fase = 'soltar';
        u = c - 3.7;
      } else {
        fase = 'reposo';
        u = c - 6.1;
      }
    }
    if (fase === 'comprimir') d = 52 * ease(u / 1.2);
    if (fase === 'soltar') d = 52 * Math.max(-0.14, Math.cos(u * 6) * Math.exp(-u * 4.4));
  }
  const parietalOn = luz === 'parietal' || luz === 'ambas' || fase === 'soltar';
  const visceralOn = luz === 'visceral' || luz === 'ambas' || fase === 'comprimir';
  const ay = 276 + d * 0.5;
  const linea = (y: number, k = 1) => `M${ondaPared(y, d * k).join(' L')}`;
  const manoY = (fase === 'soltar' ? 72 : 78) + d;
  return (
    <svg viewBox="0 -46 800 476" role="img" aria-label="Corte de la pared abdominal: piel, músculo, peritoneo parietal, cavidad y asa cubierta por peritoneo visceral">
      <defs>
        <pattern id="cl-musculo" width="11" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(32)">
          <rect width="11" height="11" fill="#5b3136" />
          <line x1="0" y1="0" x2="0" y2="11" stroke="#7b4449" strokeWidth="3.5" />
        </pattern>
      </defs>
      <path d={bandaPared(96, 112, d, d)} fill="#d6b49d" />
      <path d={bandaPared(112, 130, d, d * 0.98)} fill="#c9a86a" />
      <path d={bandaPared(130, 166, d * 0.98, d * 0.92)} fill="url(#cl-musculo)" />
      <path d={linea(169, 0.92)} fill="none" stroke={parietalOn ? ROSA : INK2} strokeWidth={parietalOn ? 6.5 : 3} />
      <ellipse cx={CX} cy={ay} rx={148} ry={66} fill={INTESTINO} />
      <ellipse cx={CX} cy={ay} rx={148} ry={66} fill="none" stroke={visceralOn ? CIELO : INK2} strokeWidth={visceralOn ? 6.5 : 3} />
      <ellipse cx={CX} cy={ay} rx={70} ry={30} fill={ROJO} opacity={0.36} />
      <ellipse cx={640} cy={290} rx={120} ry={52} fill={INTESTINO} opacity={0.75} />
      <ellipse cx={640} cy={290} rx={120} ry={52} fill="none" stroke={INK2} strokeWidth={2.5} opacity={0.75} />
      {inerv && (
        <g>
          <Via d={`M420,${172 + d * 0.3} C520,176 620,170 790,160`} c={ROSA} w={3.5} />
          <Pulso d={`M420,${172 + d * 0.3} C520,176 620,170 790,160`} t={t} v={70} />
          <Via d={`M${CX + 110},${ay + 46} C${CX + 180},${ay + 112} 560,396 790,380`} c={CIELO} w={3.5} />
          <Pulso d={`M${CX + 110},${ay + 46} C${CX + 180},${ay + 112} 560,396 790,380`} t={t} v={10} c={CIELO} />
          <L x={786} y={206} a="end" c={ROSA} s={19}>Nervios espinales D7–L1</L>
          <L x={786} y={408} a="end" c={CIELO} s={19}>Aferentes con el simpático</L>
        </g>
      )}
      {mano && <ManoFrente x={CX} y={manoY} />}
      <L x={12} y={80} a="start" s={18} c={INK2} w={500}>Piel y subcutáneo</L>
      <L x={12} y={150} a="start" s={18}>Músculo</L>
      <L x={12} y={194} a="start" s={19} c={parietalOn ? ROSA : INK}>Peritoneo parietal</L>
      <L x={12} y={232} a="start" s={17} c={INK3} w={500}>Cavidad</L>
      <L x={CX} y={ay} s={19}>Órgano</L>
      <L x={12} y={312} a="start" s={19} c={visceralOn ? CIELO : INK}>Peritoneo</L>
      <L x={12} y={336} a="start" s={19} c={visceralOn ? CIELO : INK}>visceral</L>
      {mano && (
        <L x={620} y={60} s={22} c={fase === 'soltar' ? ROSA : fase === 'comprimir' ? CIELO : INK3}>
          {fase === 'comprimir' ? 'Comprime: hoja visceral' : fase === 'soltar' ? 'Suelta: hoja parietal' : 'Reposo'}
        </L>
      )}
    </svg>
  );
}

/* ─────────── 4. Víscera: dónde están los receptores ─────────── */

function Viscera({ t, paso, dt }: BaseFig) {
  const ap = (n: number) => apf(paso, dt, n);
  const dist = 12 + 12 * Math.sin(t * 1.5);
  const cy = 230;
  const top = (x: number) => cy - 76 - dist * Math.sin((x / 560) * Math.PI);
  const bot = (x: number) => cy + 76 + dist * Math.sin((x / 560) * Math.PI);
  const puntos = (f: (x: number) => number, off: number) => {
    const out: string[] = [];
    for (let x = 0; x <= 560; x += 20) out.push(`${x},${(f(x) + off).toFixed(1)}`);
    return out;
  };
  const banda = (f: (x: number) => number, o1: number, o2: number) => `M${puntos(f, o1).join(' L')} L${puntos(f, o2).reverse().join(' L')} Z`;
  const receptores = [90, 200, 310, 430];
  return (
    <svg viewBox="0 0 800 460" role="img" aria-label="Pared de una víscera hueca con receptores del dolor y cápsula de un órgano macizo">
      <path d={banda(top, -34, -6)} fill="#7b3f43" />
      <path d={banda(bot, 6, 34)} fill="#7b3f43" />
      <path d={banda(top, -6, 12)} fill="#d39b93" />
      <path d={banda(bot, -12, 6)} fill="#d39b93" />
      <path d={`M${puntos(top, -36).join(' L')}`} fill="none" stroke={INK} strokeWidth={3} />
      <path d={`M${puntos(bot, 36).join(' L')}`} fill="none" stroke={INK} strokeWidth={3} />
      {receptores.map((x, i) => {
        const y = top(x) - 20;
        const on = 0.45 + 0.55 * Math.abs(Math.sin(t * 2 + i));
        return (
          <g key={x} stroke={CIELO} strokeWidth={3.2} strokeLinecap="round" fill="none" opacity={on}>
            <path d={`M${x},${y} l-12,-12 M${x},${y} l12,-12 M${x},${y} l0,16 M${x},${y + 16} L${x + 18},${y - 56}`} />
          </g>
        );
      })}
      <L x={280} y={cy} s={22} c={INK2} w={550}>Luz intestinal</L>
      <L x={280} y={40} s={20} c={CIELO}>Receptores en la capa muscular</L>
      <L x={280} y={cy + 150} s={19} c={INK2} w={500}>Serosa = peritoneo visceral</L>
      <Via d="M430,110 C520,70 640,60 790,70" c={CIELO} w={3.5} o={ap(0)} />
      <Pulso d="M430,110 C520,70 640,60 790,70" t={t} v={10} c={CIELO} o={ap(0)} />
      <g opacity={ap(1)} transform="translate(0 6)">
        <path d="M600,200 C640,160 730,160 770,200 C795,230 780,300 730,320 C680,338 620,320 598,282 C584,256 586,222 600,200 Z" fill={HIGADO} />
        <path d="M600,200 C640,160 730,160 770,200 C795,230 780,300 730,320 C680,338 620,320 598,282 C584,256 586,222 600,200 Z" fill="none" stroke={CIELO} strokeWidth={4 + 2 * Math.sin(t * 1.5)} />
        <L x={690} y={246} s={18}>Órgano</L>
        <L x={690} y={270} s={18}>macizo</L>
        <L x={690} y={356} s={19} c={CIELO}>Cápsula: se estira</L>
      </g>
    </svg>
  );
}

/* ─────────── 5. Entrada medular: por qué uno se localiza y el otro no ─────────── */

function PanelEntrada({ x, tono, titulo, bilateral, t, o, resultado }: { x: number; tono: string; titulo: string; bilateral: boolean; t: number; o: number; resultado: string }) {
  const cy = 100;
  const bx = x + 170;
  const org: [number, number] = bilateral ? [bx, 330] : [bx - 70, 332];
  const izq = `M${org[0]},${org[1]} C${bx - 130},300 ${bx - 150},160 ${bx - 50},${cy - 10}`;
  const der = `M${org[0]},${org[1]} C${bx + 130},300 ${bx + 150},160 ${bx + 50},${cy - 10}`;
  return (
    <g opacity={o}>
      <L x={bx} y={22} c={tono} s={24}>{titulo}</L>
      <CorteMedula cx={bx} cy={cy} e={0.72} />
      <path d={`M${bx - 110},232 C${bx - 120},300 ${bx - 110},386 ${bx - 86},432 L${bx + 86},432 C${bx + 110},386 ${bx + 120},300 ${bx + 110},232 Z`} fill="var(--v-skin)" stroke={LINE} strokeWidth={3} />
      {bilateral ? <ellipse cx={bx} cy={332} rx={64} ry={86} fill={tono} opacity={0.34 + 0.12 * Math.sin(t * 2)} /> : <circle cx={org[0]} cy={org[1]} r={15 + 2 * Math.sin(t * 3)} fill={tono} />}
      <Via d={izq} c={tono} w={3} />
      <Pulso d={izq} t={t} v={bilateral ? 14 : 62} c={tono} />
      {bilateral && (
        <>
          <Via d={der} c={tono} w={3} />
          <Pulso d={der} t={t} v={14} c={tono} desfase={50} />
        </>
      )}
      <L x={bx} y={458} s={19}>{resultado}</L>
    </g>
  );
}

function Entrada({ t, paso, dt }: BaseFig) {
  return (
    <svg viewBox="0 0 800 480" role="img" aria-label="Entrada medular bilateral del dolor visceral frente a entrada unilateral del somático">
      <PanelEntrada x={30} tono={CIELO} titulo="Visceral: entra a los dos lados" bilateral t={t} o={apf(paso, dt, 0)} resultado="Línea media, difuso" />
      <PanelEntrada x={430} tono={ROSA} titulo="Somático: un solo lado" bilateral={false} t={t} o={apf(paso, dt, 1)} resultado="Lo señala con un dedo" />
    </svg>
  );
}

/* ─────────── 6. Convergencia ─────────── */

function Convergencia({ t, paso, dt }: BaseFig) {
  const ap = (n: number) => apf(paso, dt, n);
  const visceral = 'M140,392 C260,384 400,340 520,270';
  const piel = 'M152,138 C280,150 410,200 520,256';
  const sube = 'M560,250 C574,180 574,120 566,76';
  const proyecta = 'M528,44 C420,20 262,44 168,108';
  return (
    <svg viewBox="0 0 800 480" role="img" aria-label="Convergencia de una aferencia visceral y una cutánea en la misma neurona del asta dorsal">
      {/* Piel */}
      <path d="M46,84 C96,70 150,76 180,104 C186,136 170,176 130,186 C86,194 46,172 38,132 C36,110 38,94 46,84 Z" fill="var(--v-skin)" stroke={LINE} strokeWidth={2.5} />
      <L x={108} y={130} s={20}>Epigastrio</L>
      {/* Corazón */}
      <path d="M100,430 C58,398 34,370 40,340 C46,312 84,306 100,334 C116,306 154,312 160,340 C166,370 142,398 100,430 Z" fill="#a54a51" stroke="#6f2d33" strokeWidth={2.5} />
      <L x={100} y={452} s={18}>Cara inferior</L>
      {/* Asta dorsal ampliada */}
      <circle cx={560} cy={262} r={132} fill="#a58b87" opacity={0.3} />
      <circle cx={560} cy={262} r={132} fill="none" stroke="#a58b87" strokeWidth={2.5} />
      <L x={560} y={412} s={18} c={INK2} w={500}>Asta dorsal, mismo segmento</L>
      <circle cx={560} cy={262} r={30} fill={LILA} />
      <Via d={visceral} c={CIELO} w={4} o={ap(0)} />
      {paso >= 0 && <Pulso d={visceral} t={t} v={14} c={CIELO} />}
      <Via d={piel} c={ROSA} w={4} o={ap(1)} />
      {paso >= 1 && <Pulso d={piel} t={t} v={50} />}
      <Via d={sube} c={LILA} w={4.5} o={ap(2)} />
      {paso >= 2 && <Pulso d={sube} t={t} v={70} c={LILA} />}
      <g opacity={ap(2)}>
        <path d="M566,18 C530,18 506,40 506,62 C506,84 532,98 566,98 C600,98 628,84 628,62 C628,40 602,18 566,18 Z" fill="#c9a9a5" stroke="#8d6f6b" strokeWidth={2.5} />
      </g>
      <Via d={proyecta} c={DURAZNO} w={3.5} o={ap(3)} dash="10 9" />
      <L x={330} y={22} s={20} c={DURAZNO} o={ap(3)}>Lo proyecta a la piel</L>
      <L x={330} y={400} s={19} c={CIELO} o={ap(0)}>Aferente visceral</L>
      <L x={330} y={150} s={19} c={ROSA} o={ap(1)}>Aferente de la piel</L>
      <L x={702} y={100} s={19} o={ap(2)}>«¿De dónde viene?»</L>
      <L x={560} y={312} s={18}>2.ª neurona</L>
    </svg>
  );
}

/* ─────────── 7. Abdomen ─────────── */

interface VistaAbdomen {
  luz?: Partial<Record<Region, VTone>>;
  puntos?: { p: Punto; tone: VTone }[];
  ruta?: Region[];
  rutaTone?: VTone;
}

function AbdomenClase({ t, paso, dt, video, vistas, colon = false, idp = 'cl' }: BaseFig & { vistas: VistaAbdomen[]; colon?: boolean; idp?: string }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = video ? dt : t % 3.6;
  return (
    <svg viewBox={`0 0 ${ABD_W} ${ABD_H}`} role="img" aria-label="Abdomen con sus nueve regiones">
      <AbdomenFig luz={v.luz} puntos={v.puntos} ruta={v.ruta} rutaTone={v.rutaTone} t={u} idp={idp} etiquetas={!v.puntos?.length} />
      {colon && (
        <g fill="none" strokeLinecap="round" opacity={0.75}>
          <path d="M112,350 C100,300 100,240 106,186 C150,172 250,172 294,186 C302,240 302,300 290,350" stroke={INTESTINO} strokeWidth={14} />
          <path d="M112,356 C110,376 124,392 142,388" stroke={ROJO} strokeWidth={9} />
        </g>
      )}
    </svg>
  );
}

/* ─────────── 8. Arco reflejo: contractura ─────────── */

function ArcoReflejo({ t, paso, dt }: BaseFig) {
  const ap = (n: number) => apf(paso, dt, n);
  const af = 'M210,330 C250,250 370,200 500,152';
  const ef = 'M512,214 C450,296 380,300 330,302';
  const on = ap(2);
  const vib = on * 1.5 * Math.sin(t * 28);
  return (
    <svg viewBox="0 0 800 460" role="img" aria-label="Arco reflejo desde el peritoneo parietal al músculo abdominal">
      <defs>
        <pattern id="cl-m2" width="11" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(32)">
          <rect width="11" height="11" fill={on > 0.5 ? '#8a2f3c' : '#5b3136'} />
          <line x1="0" y1="0" x2="0" y2="11" stroke={on > 0.5 ? '#c04a58' : '#7b4449'} strokeWidth="3.5" />
        </pattern>
      </defs>
      <CorteMedula cx={560} cy={180} e={1.05} luzAsta={ap(0)} luzVentral={ap(1)} />
      <g transform={`translate(0 ${vib})`}>
        <rect x={0} y={262} width={800} height={18} fill="#d6b49d" />
        <rect x={0} y={280} width={800} height={46 + on * 12} fill="url(#cl-m2)" />
        <rect x={0} y={326 + on * 12} width={800} height={7} fill={ROSA} />
      </g>
      <rect x={0} y={342 + on * 12} width={800} height={118} fill={INTESTINO} opacity={0.32} />
      <circle cx={210} cy={336 + on * 12} r={28 + 4 * Math.sin(t * 3)} fill={ROJO} opacity={0.5} />
      <Via d={af} c={ROSA} w={4} o={ap(0)} />
      {paso >= 0 && <Pulso d={af} t={t} v={60} />}
      <Via d={ef} c={MENTA} w={4} o={ap(1)} />
      {paso >= 1 && <Pulso d={ef} t={t} v={60} c={MENTA} />}
      <L x={210} y={410} s={20} c={ROSA}>Peritoneo parietal irritado</L>
      <L x={250} y={200} s={19} c={ROSA} o={ap(0)}>Aferente D7–L1</L>
      <L x={380} y={246} s={19} c={MENTA} o={ap(1)} a="end">Motoneurona</L>
      <L x={600} y={304} s={21} c={INK} o={on}>Contractura involuntaria</L>
    </svg>
  );
}

/* ─────────── 9. Intestino: peristaltismo, obstáculo, íleo ─────────── */

function Intestino({ t, paso, dt, modo = 'normal' }: BaseFig & { modo?: 'normal' | 'obstaculo' | 'paralitico' | 'asa' }) {
  const ap = (n: number) => apf(paso, dt, n);
  const cy = 200;
  const X0 = -12;
  const X1 = 832;
  const OB = 520;
  const radio = (x: number) => {
    if (modo === 'normal') return 38 + 13 * Math.exp(-(((x - X0 - ((t * 130) % (X1 - X0 + 140)) + 70) / 46) ** 2));
    if (modo === 'obstaculo') {
      if (x < OB) return 62 + 18 * Math.exp(-(((x - X0 - ((t * 200) % (OB - X0 + 100)) + 50) / 40) ** 2));
      return 22 + 2 * Math.sin(x / 40);
    }
    if (modo === 'paralitico') return 58;
    return x > 300 && x < 520 ? 60 : 36;
  };
  const arr: string[] = [];
  const abj: string[] = [];
  for (let x = X0; x <= X1; x += 8) {
    const r = radio(x);
    arr.push(`${x},${(cy - r).toFixed(1)}`);
    abj.push(`${x},${(cy + r).toFixed(1)}`);
  }
  const contorno = `M${arr.join(' L')} L${abj.reverse().join(' L')} Z`;
  const part: JSX.Element[] = [];
  if (modo === 'normal' || modo === 'obstaculo') {
    const v = modo === 'normal' ? 42 : 30;
    const fin = modo === 'normal' ? X1 : OB - 26;
    for (let i = 0; i < 16; i++) {
      const lon = fin - X0;
      const x = X0 + ((i * 53 + t * v) % lon);
      const y = cy + Math.sin(i * 7 + t) * (modo === 'normal' ? 14 : 30);
      part.push(<circle key={i} cx={x} cy={y} r={i % 3 ? 7 : 10} fill={i % 3 ? '#b18255' : '#e9dfd2'} opacity={0.9} />);
    }
  }
  if (modo === 'paralitico' || modo === 'asa') {
    const zona = modo === 'asa' ? [310, 500] : [X0 + 20, X1 - 20];
    for (let i = 0; i < 12; i++) {
      const x = zona[0] + ((i * 79) % (zona[1] - zona[0]));
      part.push(<circle key={i} cx={x} cy={cy - 18 + Math.sin(i * 4) * 22} r={13 + (i % 3) * 3} fill="#e9dfd2" opacity={0.26} stroke="#e9dfd2" strokeWidth={1.5} />);
    }
  }
  const ondas = (x: number, y: number, c: string, n: number, fuerte: number) =>
    Array.from({ length: n }, (_, i) => {
      const u = (t * 1.6 + i / n) % 1;
      return <path key={i} d={`M${x - 30 - u * 30},${y - u * 34} Q${x},${y - 28 - u * 44} ${x + 30 + u * 30},${y - u * 34}`} fill="none" stroke={c} strokeWidth={fuerte} opacity={(1 - u) * 0.9} />;
    });
  return (
    <svg viewBox="0 0 820 410" role="img" aria-label="Tramo de intestino con su movimiento">
      <path d={contorno} fill={INTESTINO} stroke="#8f5f56" strokeWidth={3} />
      {part}
      {modo === 'normal' && (
        <>
          {ondas(410, 120, MENTA, 3, 3)}
          <L x={410} y={44} c={MENTA} s={22}>Ruidos hidroaéreos normales</L>
          <L x={410} y={340} s={21} o={ap(1)}>El contenido y el gas avanzan</L>
        </>
      )}
      {modo === 'obstaculo' && (
        <>
          <path d={`M${OB - 34},${cy - 76} C${OB - 6},${cy - 60} ${OB + 14},${cy - 24} ${OB + 18},${cy} C${OB + 14},${cy + 24} ${OB - 6},${cy + 60} ${OB - 34},${cy + 76} C${OB + 4},${cy + 86} ${OB + 56},${cy + 44} ${OB + 56},${cy} C${OB + 56},${cy - 44} ${OB + 4},${cy - 86} ${OB - 34},${cy - 76} Z`} fill="#6f3a55" stroke="#4a2439" strokeWidth={2.5} />
          <L x={OB + 22} y={cy + 118} c={INK} s={20} o={ap(0)}>Obstáculo</L>
          <g opacity={ap(1)}>
            {ondas(220, 104, DURAZNO, 4, 5)}
            <L x={220} y={28} c={DURAZNO} s={23}>Ruidos de lucha</L>
          </g>
          <g opacity={ap(2)}>
            <path d="M260,340 L70,340" stroke={ROSA} strokeWidth={5} strokeLinecap="round" markerEnd="url(#cl-fl)" />
            <L x={170} y={372} c={ROSA} s={21}>Refluye: vómitos</L>
          </g>
          <g opacity={ap(3)}>
            <L x={680} y={120} c={CIELO} s={21}>Silencio</L>
            <L x={680} y={290} s={19} c={INK2} w={500}>Sin gases ni heces</L>
          </g>
          <defs>
            <marker id="cl-fl" viewBox="0 0 10 10" refX={7} refY={5} markerWidth={5} markerHeight={5} orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill={ROSA} />
            </marker>
          </defs>
        </>
      )}
      {modo === 'paralitico' && (
        <>
          <L x={410} y={60} c={CIELO} s={23}>Silencio: sin peristaltismo</L>
          <L x={410} y={340} s={21} o={ap(1)}>Sin obstáculo: el gas se acumula</L>
        </>
      )}
      {modo === 'asa' && (
        <>
          <ellipse cx={410} cy={62} rx={80} ry={36} fill={ROJO} opacity={0.5 + 0.2 * Math.sin(t * 3)} />
          <L x={410} y={62} s={19}>Órgano inflamado</L>
          <L x={410} y={340} c={DURAZNO} s={23} o={ap(1)}>Asa centinela: íleo solo acá</L>
        </>
      )}
    </svg>
  );
}

/* ─────────── 10. Cavidad: aire y sangre ─────────── */

function Percusion({ x, y, sonido, c, t, o }: { x: number; y: number; sonido: string; c: string; t: number; o: number }) {
  const u = t % 1;
  return (
    <g opacity={o}>
      <circle cx={x} cy={y} r={12 + u * 42} fill="none" stroke={c} strokeWidth={3.5} opacity={1 - u} />
      <circle cx={x} cy={y} r={7} fill={c} />
      <L x={x} y={y - 66} c={c} s={24}>{sonido}</L>
    </g>
  );
}

function Cavidad({ t, paso, dt, modo = 'aire' }: BaseFig & { modo?: 'aire' | 'sangre' }) {
  const ap = (n: number) => apf(paso, dt, n);
  if (modo === 'aire') {
    const gas = ap(1);
    return (
      <svg viewBox="0 0 640 600" role="img" aria-label="Aire libre que asciende bajo el diafragma y tapa la matidez hepática">
        <Tronco id="cl-t1" />
        <Visceras />
        <path d={DIAFRAGMA} fill="none" stroke="#c4a59e" strokeWidth={5} />
        <path d="M168,258 C184,212 256,182 318,224 C378,186 458,206 474,258 C454,226 384,212 320,244 C252,204 192,222 168,258 Z" fill="#dbe9f6" opacity={0.92 * gas} />
        <g opacity={ap(0)}>
          <circle cx={348} cy={338} r={15 + 2 * Math.sin(t * 5)} fill={ROJO} />
          <L x={420} y={392} c={ROJO} s={20}>Víscera perforada</L>
        </g>
        {paso >= 1 &&
          [0, 1, 2, 3, 4].map((i) => {
            const u = (t * 0.45 + i / 5) % 1;
            const x = 348 + Math.sin(u * 7 + i) * 32 - u * 70;
            const y = 330 - u * 110;
            return <circle key={i} cx={x} cy={y} r={6 + 3 * (i % 2)} fill="#dbe9f6" opacity={(1 - u) * 0.95} />;
          })}
        <L x={320} y={112} s={20} c="#dbe9f6" o={gas}>El gas asciende bajo el diafragma</L>
        {paso < 2 && <Percusion x={232} y={266} sonido="Mate (normal)" c={DURAZNO} t={t} o={ap(0) * (1 - gas)} />}
        <Percusion x={232} y={236} sonido="Timpánico" c={CIELO} t={t} o={ap(2)} />
      </svg>
    );
  }
  const nivel = 600 - 150 * ap(1);
  return (
    <svg viewBox="0 0 640 600" role="img" aria-label="Sangre acumulada en la cavidad peritoneal">
      <Tronco id="cl-t2" />
      <Visceras />
      <g clipPath="url(#cl-t2)">
        <path d={`M172,${nivel} C250,${nivel + 54} 390,${nivel + 54} 468,${nivel} L500,600 L140,600 Z`} fill={SANGRE} opacity={0.82} />
      </g>
      <g opacity={ap(0)}>
        <circle cx={238} cy={498} r={14 + 2 * Math.sin(t * 5)} fill={ROJO} />
        {[0, 1, 2].map((i) => {
          const u = (t * 0.8 + i / 3) % 1;
          return <circle key={i} cx={238 + i * 8} cy={510 + u * 50} r={6} fill={SANGRE} opacity={1 - u} />;
        })}
        <L x={238} y={120} s={20} c={ROJO}>Se rompe un vaso u órgano</L>
      </g>
      <L x={320} y={150} s={20} c={INK2} w={500} o={ap(1)}>La sangre cae a lo declive</L>
      <Percusion x={400} y={540} sonido="Mate" c={DURAZNO} t={t} o={ap(2)} />
    </svg>
  );
}

/* ─────────── 11. Hipovolemia ─────────── */

function Hipovolemia({ t, paso, dt }: BaseFig) {
  const ap = (n: number) => apf(paso, dt, n);
  const nivel = 1 - 0.55 * Math.min(1, (paso + Math.min(1, dt / 2)) / 4);
  const latido = 1 + 0.1 * Math.abs(Math.sin(t * 8));
  return (
    <svg viewBox="0 0 660 560" role="img" aria-label="Signos de hipovolemia en el cuerpo">
      <circle cx={330} cy={72} r={54} fill="var(--v-skin)" stroke={LINE} strokeWidth={3} />
      <g transform="translate(10 -24)">
        <path d="M250,132 C210,146 174,150 152,176 L142,330 L196,332 L206,236 L216,520 L424,520 L434,236 L444,332 L498,330 L488,176 C466,150 430,146 390,132 Z" fill="var(--v-skin)" stroke={LINE} strokeWidth={3} />
      </g>
      <path d="M312,66 C322,54 342,54 350,68 C356,80 344,92 330,90 C316,90 306,78 312,66 Z" fill={LILA} opacity={0.35 + ap(3) * 0.5} />
      <path transform={`translate(330 214) scale(${latido}) translate(-330 -214)`} d="M330,250 C298,226 280,206 286,186 C292,170 320,168 330,186 C340,168 368,170 374,186 C380,206 362,226 330,250 Z" fill="#b54a54" stroke="#6f2d33" strokeWidth={2.5} />
      <ellipse cx={278} cy={344} rx={18} ry={34} fill="#7f4545" opacity={0.6 + ap(2) * 0.4} />
      <ellipse cx={382} cy={344} rx={18} ry={34} fill="#7f4545" opacity={0.6 + ap(2) * 0.4} />
      {/* Volumen */}
      <rect x={560} y={140} width={46} height={300} rx={14} fill="none" stroke={INK3} strokeWidth={3} />
      <rect x={566} y={146 + 288 * (1 - nivel)} width={34} height={288 * nivel} rx={10} fill={SANGRE} />
      <L x={583} y={470} s={18}>Volemia</L>
      <L x={90} y={72} a="start" s={20} c={LILA} o={ap(3)}>Conciencia alterada</L>
      <path d="M284,66 L240,70" stroke={LILA} strokeWidth={2.5} opacity={ap(3)} />
      <L x={70} y={196} a="start" s={20} c={ROSA} o={ap(0)}>Taquicardia</L>
      <L x={70} y={222} a="start" s={20} c={ROSA} o={ap(0)}>Hipotensión</L>
      <path d="M210,208 L284,212" stroke={ROSA} strokeWidth={2.5} opacity={ap(0)} />
      <L x={20} y={420} a="start" s={20} c={CIELO} o={ap(1)}>Frialdad, sudoración</L>
      <path d="M186,410 L216,380" stroke={CIELO} strokeWidth={2.5} opacity={ap(1)} />
      <L x={480} y={522} a="end" s={20} c={DURAZNO} o={ap(2)}>Oliguria</L>
      <path d="M430,510 L394,376" stroke={DURAZNO} strokeWidth={2.5} opacity={ap(2)} />
    </svg>
  );
}

/* ─────────── 12. Isquemia mesentérica ─────────── */

function Mesenterica({ t, paso, dt }: BaseFig) {
  const ap = (n: number) => apf(paso, dt, n);
  const aorta = 'M372,0 L372,400';
  const mes = 'M372,120 C332,160 298,214 284,262';
  const ramas = ['M284,262 C240,286 196,322 166,376', 'M284,262 C264,322 244,380 236,440', 'M284,262 C320,322 342,392 346,450', 'M284,262 C344,290 408,328 448,394'];
  const asa = 'M126,392 C160,340 210,340 232,392 C250,440 300,456 344,424 C380,396 420,378 462,410 C510,446 500,500 440,508 C360,516 250,516 176,500 C118,484 100,430 126,392 Z';
  const c1 = ap(1);
  const c2 = ap(2);
  const c3 = ap(3);
  const color = c2 > 0.5 ? (c3 > 0.5 ? '#3d2535' : '#7a4a68') : INTESTINO;
  return (
    <svg viewBox="0 0 720 540" role="img" aria-label="Arteria mesentérica superior ocluida e intestino isquémico">
      <path d={aorta} stroke="#b44a54" strokeWidth={42} strokeLinecap="round" fill="none" />
      <path d={mes} stroke="#b44a54" strokeWidth={16} fill="none" strokeLinecap="round" />
      {ramas.map((r) => (
        <path key={r} d={r} stroke="#b44a54" strokeWidth={8} fill="none" strokeLinecap="round" opacity={1 - c1 * 0.6} />
      ))}
      <path d={asa} fill={color} stroke="#5d3a35" strokeWidth={3} />
      <path d="M126,392 C160,340 210,340 232,392 C250,440 300,456 344,424 C380,396 420,378 462,410" fill="none" stroke="#fff" strokeOpacity={0.08} strokeWidth={8} />
      {paso < 1 && <Pulso d={mes} t={t} v={70} c="#ffd7dc" />}
      {paso < 1 && ramas.map((r, i) => <Pulso key={r} d={r} t={t} v={70} c="#ffd7dc" w={3.5} desfase={i * 25} />)}
      <g opacity={c1}>
        <ellipse cx={322} cy={178} rx={17} ry={23} transform="rotate(38 322 178)" fill="#2a1420" stroke={ROJO} strokeWidth={3} />
        <L x={180} y={160} c={ROJO} s={21}>Oclusión</L>
      </g>
      <L x={190} y={60} s={21}>Aorta y mesentérica</L>
      <g opacity={c3}>
        {Array.from({ length: 8 }, (_, i) => {
          const u = (t * 0.4 + i / 8) % 1;
          const x = 160 + i * 42;
          const y = 470 - u * 240;
          return <ellipse key={i} cx={x + Math.sin(u * 9) * 10} cy={y} rx={9} ry={4.5} fill={MENTA} opacity={1 - u * 0.7} transform={`rotate(${i * 40} ${x} ${y})`} />;
        })}
        <L x={560} y={260} c={MENTA} s={21}>Translocación</L>
        <L x={560} y={290} c={MENTA} s={21}>bacteriana</L>
      </g>
      <L x={320} y={528} s={20} c={c3 > 0.5 ? ROJO : c2 > 0.5 ? DURAZNO : INK2} o={c2}>{c3 > 0.5 ? 'Infarto intestinal' : 'Isquemia: lactato ↑'}</L>
    </svg>
  );
}

/* ─────────── 13. Apendicitis: estadios ─────────── */

const ESTADIOS = [
  { n: 'Congestiva', c: '#d97a7f', g: 22, d: 'catarral' },
  { n: 'Flegmonosa', c: '#c55a5f', g: 29, d: 'supurada' },
  { n: 'Gangrenosa', c: '#4c2d3f', g: 29, d: 'pared necrótica' },
  { n: 'Perforada', c: '#3a2433', g: 29, d: 'peritonitis' },
];

function Apendice({ t, paso, dt }: BaseFig) {
  return (
    <svg viewBox="0 0 860 400" role="img" aria-label="Cuatro estadios de la apendicitis">
      {ESTADIOS.map((e, i) => {
        const x = 110 + i * 214;
        const o = apf(paso, dt, i);
        return (
          <g key={e.n} opacity={o}>
            <path d={`M${x - 74},40 C${x - 84},90 ${x - 72},122 ${x - 12},124 C${x + 48},122 ${x + 66},90 ${x + 58},40 Z`} fill={INTESTINO} stroke="#8f5f56" strokeWidth={3} />
            <path d={`M${x - 8},122 C${x - 18},180 ${x + 6},242 ${x + 28},280`} stroke={e.c} strokeWidth={e.g} fill="none" strokeLinecap="round" />
            <ellipse cx={x - 6} cy={138} rx={11} ry={8} fill="#57402a" stroke="#2d1f12" strokeWidth={1.5} />
            {i === 1 && [0, 1, 2].map((k) => <circle key={k} cx={x - 4 + k * 10} cy={186 + k * 30} r={5} fill="#e9d67a" />)}
            {i === 2 && [0, 1, 2, 3].map((k) => <circle key={k} cx={x - 8 + k * 10} cy={174 + k * 26} r={7} fill="#17111a" />)}
            {i === 3 && (
              <g>
                <circle cx={x + 26} cy={258} r={9} fill="#17111a" stroke={ROJO} strokeWidth={3} />
                {[0, 1, 2].map((k) => {
                  const u = (t * 0.6 + k / 3) % 1;
                  return <circle key={k} cx={x + 40 + u * 30} cy={258 + u * 26 - k * 8} r={5} fill="#b18255" opacity={1 - u} />;
                })}
              </g>
            )}
            <L x={x} y={332} s={22}>{`${i + 1}. ${e.n}`}</L>
            <L x={x} y={362} s={18} c={INK2} w={500}>{e.d}</L>
          </g>
        );
      })}
      <L x={124} y={22} s={18} c={DURAZNO}>Fecalito: obstruye la luz</L>
    </svg>
  );
}

/* ─────────── 14. Colecistitis ─────────── */

function Colecistitis({ t, paso, dt }: BaseFig) {
  const ap = (n: number) => apf(paso, dt, n);
  return (
    <svg viewBox="0 0 640 600" role="img" aria-label="Colecistitis aguda con irradiación al hombro derecho">
      <Tronco id="cl-t3" />
      <Visceras apagar={0.5} />
      <path d={HIGADO_D} fill={HIGADO} stroke="#5d2a2a" strokeWidth={2.5} />
      <ellipse cx={262} cy={324} rx={21} ry={36} transform="rotate(20 262 324)" fill="#a9b66a" stroke={ROJO} strokeWidth={4 + 1.5 * Math.sin(t * 3)} />
      <circle cx={256} cy={300} r={9} fill="#57402a" stroke="#2d1f12" strokeWidth={1.5} />
      <L x={150} y={372} s={21} a="start" c={ROSA} o={ap(0)}>Hipocondrio derecho</L>
      <g opacity={ap(1)}>
        <path d="M240,296 C206,240 170,170 142,120" fill="none" stroke={ROSA} strokeWidth={5} strokeDasharray="10 8" strokeDashoffset={-t * 26} />
        <circle cx={140} cy={112} r={20 + 3 * Math.sin(t * 3)} fill={ROSA} opacity={0.6} />
        <L x={160} y={60} s={21} c={ROSA}>Hombro derecho</L>
      </g>
      <g opacity={ap(3)}>
        <path d="M274,356 C296,376 314,392 332,420" fill="none" stroke="#7f9455" strokeWidth={7} strokeLinecap="round" />
        <circle cx={318} cy={400} r={10} fill="#57402a" stroke={DURAZNO} strokeWidth={3} />
        <L x={450} y={440} s={20} c={DURAZNO}>Cálculo en el colédoco</L>
        <L x={450} y={470} s={20} c={DURAZNO}>= ictericia</L>
      </g>
    </svg>
  );
}

/* ─────────── 15. Infarto y dolor epigástrico ─────────── */

function Ecg({ t, paso, dt }: BaseFig) {
  const ap = (n: number) => apf(paso, dt, n);
  const trazo: string[] = [];
  for (let x = 0; x <= 620; x += 4) {
    const fase = ((x + t * 120) % 160) / 160;
    let y = 0;
    if (fase > 0.34 && fase < 0.38) y = 8;
    if (fase >= 0.38 && fase < 0.42) y = -46;
    if (fase >= 0.42 && fase < 0.46) y = 16;
    if (fase >= 0.46 && fase < 0.66) y = -16 * Math.sin(((fase - 0.46) / 0.2) * Math.PI) - 12;
    trazo.push(`${x + 10},${y + 540}`);
  }
  return (
    <svg viewBox="0 0 640 600" role="img" aria-label="Infarto de cara inferior con dolor epigástrico">
      <Tronco id="cl-t4" />
      <path d={DIAFRAGMA} fill="none" stroke="#c4a59e" strokeWidth={5} />
      <path d="M322,246 C262,198 244,142 262,114 C282,90 316,104 330,132 C350,106 392,102 402,134 C414,172 376,218 322,246 Z" fill="#a54a51" stroke="#6f2d33" strokeWidth={2.5} />
      <path d="M322,246 C296,226 274,206 262,180 C310,204 350,202 394,172 C380,206 356,230 322,246 Z" fill={ROJO} opacity={ap(0) * (0.6 + 0.3 * Math.sin(t * 4))} />
      <path d={ESTOMAGO_D} fill={ESTOMAGO} stroke="#8f5f56" strokeWidth={2.5} opacity={0.75} />
      <ellipse cx={330} cy={306} rx={68} ry={38} fill={ROSA} opacity={ap(1) * (0.42 + 0.14 * Math.sin(t * 3))} />
      <L x={330} y={70} s={21} c={ROJO} o={ap(0)}>Infarto de cara inferior</L>
      <L x={330} y={376} s={21} c={ROSA} o={ap(1)}>Duele en el epigastrio</L>
      <g opacity={ap(2)}>
        <rect x={0} y={480} width={640} height={120} fill="#141119" opacity={0.92} />
        <path d={`M${trazo.join(' L')}`} fill="none" stroke={MENTA} strokeWidth={3.2} />
        <L x={320} y={502} s={20} c={MENTA}>Electrocardiograma</L>
      </g>
    </svg>
  );
}

/* ─────────── 16. Ruidos hidroaéreos ─────────── */

const FILAS_RHA = [
  { n: 'De lucha', d: 'íleo mecánico', c: DURAZNO, a: 56, g: 8, f: 0.9 },
  { n: 'Normales', d: 'conservados', c: MENTA, a: 26, g: 22, f: 0.5 },
  { n: 'Disminuidos', d: 'asa centinela', c: CIELO, a: 13, g: 42, f: 0.25 },
  { n: 'Ausentes', d: 'íleo generalizado', c: ROJO, a: 0, g: 80, f: 0 },
];

/** `todas`: muestra los cuatro patrones aunque la diapositiva tenga menos pasos. */
function Rha({ t, paso, dt, todas = false }: BaseFig & { todas?: boolean }) {
  return (
    <svg viewBox="0 0 800 480" role="img" aria-label="Cuatro patrones de ruidos hidroaéreos">
      {FILAS_RHA.map((f, i) => {
        const y = 62 + i * 116;
        const puntos: string[] = [];
        for (let x = 0; x <= 520; x += 3) {
          const fase = (x + t * 90) / (40 + f.g * 2);
          const paquete = Math.max(0, Math.sin(fase)) ** 3;
          const v = f.a * paquete * Math.sin(x * 0.78 + t * 10);
          puntos.push(`${x + 250},${(y + v).toFixed(1)}`);
        }
        return (
          <g key={f.n} opacity={todas ? 1 : apf(paso, dt, i)}>
            <L x={16} y={y - 12} a="start" c={f.c} s={24}>{f.n}</L>
            <L x={16} y={y + 18} a="start" c={INK2} s={18} w={500}>{f.d}</L>
            <path d={`M${puntos.join(' L')}`} fill="none" stroke={f.c} strokeWidth={3.5} strokeLinejoin="round" />
          </g>
        );
      })}
    </svg>
  );
}

/* ─────────── 17. Perfil de la matidez ─────────── */

function PerfilLiquido({ t, paso, dt }: BaseFig) {
  const ab = (x: number) => `M${x},60 C${x - 40},150 ${x - 50},260 ${x - 18},340 L${x + 244},340 C${x + 276},260 ${x + 266},150 ${x + 226},60 Z`;
  const onda = 3 * Math.sin(t * 1.6);
  return (
    <svg viewBox="0 0 800 400" role="img" aria-label="Matidez de concavidad superior y de convexidad superior">
      <defs>
        <clipPath id="cl-pl1">
          <path d={ab(70)} />
        </clipPath>
        <clipPath id="cl-pl2">
          <path d={ab(502)} />
        </clipPath>
      </defs>
      <g opacity={apf(paso, dt, 0)}>
        <path d={ab(70)} fill="var(--v-skin)" stroke={LINE} strokeWidth={3} />
        <g clipPath="url(#cl-pl1)">
          <path d={`M20,${180 + onda} C100,${290 + onda} 260,${290 + onda} 340,${180 + onda} L340,360 L20,360 Z`} fill={SANGRE} opacity={0.82} />
        </g>
        <L x={183} y={374} c={DURAZNO} s={21}>Concavidad superior</L>
        <L x={183} y={32} s={19} c={INK2} w={500}>Líquido libre: ascitis, sangre</L>
      </g>
      <g opacity={apf(paso, dt, 1)}>
        <path d={ab(502)} fill="var(--v-skin)" stroke={LINE} strokeWidth={3} />
        <g clipPath="url(#cl-pl2)">
          <path d="M470,360 C470,180 560,130 620,130 C680,130 770,180 770,360 Z" fill="#a4728a" opacity={0.85} />
        </g>
        <L x={615} y={374} c={LILA} s={21}>Convexidad superior</L>
        <L x={615} y={32} s={19} c={INK2} w={500}>Embarazo, tumores</L>
      </g>
    </svg>
  );
}

export const FIGURAS: Record<string, ComponentType<never>> = {
  'via-dolor': ViaDolor as ComponentType<never>,
  fibras: Fibras as ComponentType<never>,
  pared: Pared as ComponentType<never>,
  viscera: Viscera as ComponentType<never>,
  entrada: Entrada as ComponentType<never>,
  convergencia: Convergencia as ComponentType<never>,
  abdomen: AbdomenClase as ComponentType<never>,
  'arco-reflejo': ArcoReflejo as ComponentType<never>,
  intestino: Intestino as ComponentType<never>,
  cavidad: Cavidad as ComponentType<never>,
  hipovolemia: Hipovolemia as ComponentType<never>,
  mesenterica: Mesenterica as ComponentType<never>,
  apendice: Apendice as ComponentType<never>,
  colecistitis: Colecistitis as ComponentType<never>,
  ecg: Ecg as ComponentType<never>,
  rha: Rha as ComponentType<never>,
  'perfil-liquido': PerfilLiquido as ComponentType<never>,
  ...(FIGURAS_DIG as Record<string, ComponentType<never>>),
  ...(FIGURAS_REN as Record<string, ComponentType<never>>),
};
