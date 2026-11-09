// Figuras del aparato nefrourológico: funciones puras de (t, paso, dt).
// Las importa Remotion: sin import.meta ni alias con valor.
import type { ReactNode } from 'react';
import { NEF_H, NEF_W, NefronaFig, URI_H, URI_W, UrinarioFig } from '../visual/anatomia';
import type { NefronaVista, UrinarioVista, VTone } from '../visual/tipos';
import { type BaseFig, CIELO, DURAZNO, INK, INK2, INK3, L, LILA, MENTA, ROJO, SANGRE, apf } from './figuras-base';

const ALBUMINA = '#e8d36a';

/* ─────────── Aparato urinario y nefrona por vistas ─────────── */

type VistaUri = UrinarioVista & { tone?: VTone; nota?: string; notaTone?: VTone };

function Urinario({ t, paso, dt, vistas = [{ luz: [] }] }: BaseFig & { vistas?: VistaUri[] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  return (
    <svg viewBox={`0 0 ${URI_W} ${URI_H + 40}`} role="img" aria-label="Aparato urinario">
      <g opacity={0.6 + 0.4 * u}>
        <UrinarioFig v={v} tone={v.tone ?? 'red'} t={t} idp={`uri-${paso}`} />
      </g>
      {v.nota && (
        <L x={URI_W / 2} y={URI_H + 22} c={v.notaTone ? `var(--v-${v.notaTone})` : INK} s={20}>
          {v.nota}
        </L>
      )}
    </svg>
  );
}

type VistaNef = NefronaVista & { tone?: VTone; nota?: string; notaTone?: VTone };

function NefronaClase({ t, paso, dt, vistas = [{ luz: [] }] }: BaseFig & { vistas?: VistaNef[] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  return (
    <svg viewBox={`-10 -10 ${NEF_W + 20} ${NEF_H + 50}`} role="img" aria-label="Nefrona">
      <g opacity={0.6 + 0.4 * u}>
        <NefronaFig v={v} tone={v.tone ?? 'red'} t={t} />
      </g>
      {v.nota && (
        <L x={NEF_W / 2} y={NEF_H + 26} c={v.notaTone ? `var(--v-${v.notaTone})` : INK} s={20}>
          {v.nota}
        </L>
      )}
    </svg>
  );
}

/* ─────────── Barrera de filtración glomerular ─────────── */

type VistaGlom = 'normal' | 'nefritico' | 'nefrotico';

function Glomerulo({ t, paso, dt, vistas = ['normal'] }: BaseFig & { vistas?: VistaGlom[] }) {
  const v = vistas[Math.min(paso, vistas.length - 1)];
  const u = vistas.length > 1 ? apf(paso, dt, paso) : 1;
  const nefri = v === 'nefritico';
  const nefro = v === 'nefrotico';
  // Capas de la pared, de izquierda (sangre) a derecha (orina)
  const ENDO = 300;
  const MB = 360;
  const POD = 430;
  const huecos = [120, 200, 280, 360, 440];
  const roturas = nefri ? [180, 330] : [];
  // agua y solutos chicos: siempre pasan
  const agua = Array.from({ length: 10 }, (_, i) => {
    const k = (t * 0.35 + i / 10) % 1;
    const y = 110 + ((i * 47) % 320);
    const x = 120 + k * 560;
    const pasa = !nefri || i % 2 === 0; // en el nefrítico filtra menos
    if (!pasa && x > ENDO) return null;
    return <circle key={i} cx={x} cy={y} r={5} fill={CIELO} opacity={0.9} />;
  });
  // albúmina: rebota (normal, nefrítico) o pasa (nefrótico)
  const albumina = Array.from({ length: 8 }, (_, i) => {
    const k = (t * 0.25 + i / 8) % 1;
    const y = 130 + ((i * 59) % 300);
    if (nefro) {
      const x = 100 + k * 600;
      return <circle key={i} cx={x} cy={y} r={9} fill={ALBUMINA} stroke="#a89340" strokeWidth={2} opacity={u} />;
    }
    const ida = k < 0.5 ? k * 2 : 2 - k * 2;
    const x = 110 + ida * (MB - 30 - 110);
    return <circle key={i} cx={x} cy={y} r={9} fill={ALBUMINA} stroke="#a89340" strokeWidth={2} />;
  });
  // glóbulos rojos: quedan (normal, nefrótico) o pasan por las roturas (nefrítico)
  const hematies = Array.from({ length: 5 }, (_, i) => {
    const k = (t * 0.18 + i / 5) % 1;
    if (nefri && i % 2 === 0) {
      const y0 = roturas[(i / 2) % roturas.length];
      const x = 90 + k * 600;
      const y = y0 + Math.sin(k * 6) * 10;
      return <ellipse key={i} cx={x} cy={y} rx={17} ry={11} fill={SANGRE} opacity={u} />;
    }
    const x = 90 + ((k * 2) % 1) * 120;
    const y = 120 + i * 70;
    return <ellipse key={i} cx={x} cy={y} rx={17} ry={11} fill={SANGRE} />;
  });
  const nota: Record<VistaGlom, [string, string]> = {
    normal: ['Pasan agua y solutos chicos; quedan albúmina y glóbulos', MENTA],
    nefritico: ['Inflamación: se rompe la pared, pasan glóbulos rojos y se filtra menos', ROJO],
    nefrotico: ['Se borran los podocitos y se pierde la carga: pasa la albúmina', DURAZNO],
  };
  return (
    <svg viewBox="0 0 800 520" role="img" aria-label="Barrera de filtración glomerular: endotelio, membrana basal y podocitos">
      <rect x={40} y={70} width={ENDO - 40} height={400} fill="#3a1f2a" />
      <rect x={POD + 30} y={70} width={720 - POD} height={400} fill="#1f2a33" />
      {/* endotelio fenestrado */}
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} x={ENDO - 10} y={70 + i * 80 + 12} width={14} height={56} rx={6} fill="#d79aa6" />
      ))}
      {/* membrana basal (carga negativa) */}
      <rect x={MB - 22} y={70} width={44} height={400} fill="#7d7a8c" opacity={nefri ? 0.6 : 1} />
      {!nefro &&
        Array.from({ length: 8 }, (_, i) => (
          <text key={i} x={MB} y={100 + i * 50} textAnchor="middle" dominantBaseline="middle" fill="#e8e8f0" fontSize={22} fontWeight={800}>
            −
          </text>
        ))}
      {roturas.map((y, i) => (
        <rect key={i} x={MB - 24} y={y - 18} width={48} height={36} fill="#3a1f2a" opacity={u} />
      ))}
      {/* depósitos de complejos inmunes y leucocitos en el nefrítico */}
      {nefri && (
        <g opacity={u}>
          {[130, 250, 400].map((y, i) => (
            <circle key={i} cx={MB - 2} cy={y} r={11} fill={LILA} stroke="#5a3a7a" strokeWidth={2} />
          ))}
          {[160, 300].map((y, i) => (
            <circle key={i} cx={200 + i * 40} cy={y} r={20} fill="#e8e0f0" stroke="#9a8ab0" strokeWidth={3} />
          ))}
        </g>
      )}
      {/* podocitos: pies con hendiduras, o borrados en el nefrótico */}
      {nefro ? (
        <rect x={POD - 12} y={70} width={40} height={400} rx={10} fill="#9a6fc0" opacity={0.85} />
      ) : (
        huecos.map((y, i) => <rect key={i} x={POD - 12} y={y - 28} width={40} height={52} rx={14} fill="#9a6fc0" />)
      )}
      {hematies}
      {agua}
      {albumina}
      <L x={170} y={50} c="#e8a0a0" s={20}>
        Sangre (capilar)
      </L>
      <L x={600} y={50} c={CIELO} s={20}>
        Espacio de Bowman
      </L>
      <L x={ENDO - 16} y={492} a="end" c="#d79aa6" s={19}>
        Endotelio
      </L>
      <L x={MB} y={512} c={INK2} s={19}>
        Membrana basal
      </L>
      <L x={POD + 34} y={492} a="start" c="#c9a7e8" s={19}>
        Podocitos
      </L>
      <L x={400} y={22} c={nota[v][1]} s={21} o={v === 'normal' ? 1 : u}>
        {nota[v][0]}
      </L>
      <L x={600} y={430} c={INK3} s={18}>
        {nefro ? 'Proteinuria' : nefri ? 'Hematuria' : 'Orina primaria'}
      </L>
    </svg>
  );
}

export const FIGURAS_REN = {
  urinario: Urinario,
  nefrona: NefronaClase,
  glomerulo: Glomerulo,
} satisfies Record<string, (p: never) => ReactNode>;

