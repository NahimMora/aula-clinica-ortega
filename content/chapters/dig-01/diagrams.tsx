import { useEffect, useState, type ReactNode } from 'react';
import { Rich } from '@/components/Rich';
import { ChoiceBar, Donut, Flow, PAL, type FlowNode } from '@/components/diagram-kit';
import type { Tone } from '@/types';

/** Texto multilínea para SVG. */
function T({ x, y, lines, size = 12, weight = 400, fill = 'var(--d-text-2)', anchor = 'start', lh = 1.3 }: { x: number; y: number; lines: string[]; size?: number; weight?: number; fill?: string; anchor?: 'start' | 'middle' | 'end'; lh?: number }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor}>
      {lines.map((l, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : size * lh}>
          {l}
        </tspan>
      ))}
    </text>
  );
}

/* ───────── 1. El trayecto: de la boca al duodeno ───────── */

const STATIONS: { name: string; fn: string; tone: Tone; ring?: boolean }[] = [
  { name: 'Boca', fn: 'Masticación y formación del bolo (fase voluntaria)', tone: 'peach' },
  { name: 'Faringe', fn: 'Cruce aerodigestivo: al tragar se cierra la vía aérea', tone: 'peach' },
  { name: 'Esfínter esofágico superior', fn: 'Músculo cricofaríngeo: se relaja para dejar pasar el bolo', tone: 'peach', ring: true },
  { name: 'Esófago · tercio superior', fn: 'Músculo estriado', tone: 'sky' },
  { name: 'Esófago · dos tercios inferiores', fn: 'Músculo liso, plexo mientérico, control vagal', tone: 'sky' },
  { name: 'Esfínter esofágico inferior', fn: 'Se relaja con la onda peristáltica e impide el reflujo', tone: 'sky', ring: true },
  { name: 'Estómago', fn: 'Fundus: acomoda · Cuerpo: secreta ácido · Antro: vacía', tone: 'lilac' },
  { name: 'Píloro', fn: 'Dosifica el vaciamiento hacia el duodeno', tone: 'lilac', ring: true },
  { name: 'Duodeno', fn: 'Recibe bilis y jugo pancreático (papila de Vater)', tone: 'lilac' },
];

export function TrayectoAlto() {
  const y0 = 40;
  const dy = 58;
  const X = 250;
  const yOf = (i: number) => y0 + i * dy;
  const bracket = (from: number, to: number, label: string[], tone: Tone) => (
    <g>
      <path d={`M232,${yOf(from) - 10} L222,${yOf(from) - 10} L222,${yOf(to) + 10} L232,${yOf(to) + 10}`} fill="none" stroke={PAL[tone].stroke} strokeWidth={2.5} strokeLinejoin="round" />
      <T x={210} y={(yOf(from) + yOf(to)) / 2 - (label.length - 1) * 8 + 4} lines={label} anchor="end" size={14} weight={700} fill={PAL[tone].ink} />
    </g>
  );
  return (
    <svg viewBox="0 0 720 565" role="img" aria-label="Esquema del tubo digestivo alto desde la boca hasta el duodeno, con el sitio de cada motivo de consulta">
      {STATIONS.slice(0, -1).map((_, i) => (
        <line key={i} x1={X} y1={yOf(i)} x2={X} y2={yOf(i + 1)} stroke={PAL[STATIONS[i + 1].tone].stroke} strokeWidth={8} strokeLinecap="round" />
      ))}
      {STATIONS.map((s, i) => (
        <g key={s.name}>
          <circle cx={X} cy={yOf(i)} r={s.ring ? 13 : 10} fill="var(--d-card)" stroke={PAL[s.tone].ink} strokeWidth={s.ring ? 5 : 3} />
          {s.ring && <circle cx={X} cy={yOf(i)} r={5} fill={PAL[s.tone].ink} />}
          <text x={X + 26} y={yOf(i) - 3} fontSize={14} fontWeight={700} fill="var(--d-text)">
            {s.name}
          </text>
          <text x={X + 26} y={yOf(i) + 14} fontSize={12} fill="var(--d-text-2)">
            {s.fn}
          </text>
        </g>
      ))}
      {bracket(0, 2, ['Disfagia', 'orofaríngea'], 'peach')}
      {bracket(3, 5, ['Disfagia', 'esofágica'], 'sky')}
      {bracket(6, 8, ['Dispepsia', '(abdomen superior)'], 'lilac')}
      <text x={20} y={556} fontSize={11.5} fill="var(--d-text-3)">
        Los anillos marcan esfínteres. Náuseas y vómitos pueden originarse en cualquier tramo… o fuera del tubo digestivo.
      </text>
    </svg>
  );
}

/* ───────── 2. Las tres fases de la deglución (interactivo) ───────── */

const PHASES = [
  {
    title: 'Fase oral',
    kind: 'Voluntaria',
    what: 'Los músculos masticadores y la lengua trituran el alimento, forman el bolo y lo empujan hacia la faringe.',
    fail: 'cuesta formar y propulsar el bolo: el paciente "no puede arrancar" a tragar.',
  },
  {
    title: 'Fase faríngea',
    kind: 'Involuntaria (refleja, ~1 segundo)',
    what: 'El velo del paladar cierra la nasofaringe, la laringe se eleva, la epiglotis tapa la vía aérea (apnea deglutoria) y se relaja el esfínter esofágico superior.',
    fail: 'el bolo va a la nariz (regurgitación nasal) o a la vía aérea (tos, ahogo, disfonía, neumonía aspirativa): disfagia orofaríngea.',
  },
  {
    title: 'Fase esofágica',
    kind: 'Involuntaria (parasimpático / vago)',
    what: 'Una onda peristáltica recorre el esófago; el esfínter esofágico inferior se relaja al llegar la onda y el bolo entra al estómago.',
    fail: 'ante un obstáculo o una peristalsis defectuosa, el bolo se detiene detrás del esternón: disfagia esofágica.',
  },
];

export function DeglucionFases() {
  const [p, setP] = useState(0);
  const [auto, setAuto] = useState(false);
  useEffect(() => {
    if (!auto) return;
    const t = window.setInterval(() => setP((x) => (x + 1) % 3), 2600);
    return () => window.clearInterval(t);
  }, [auto]);
  const bolus = [
    [118, 138],
    [253, 196],
    [280, 320],
  ][p];
  const velum = p === 1 ? -22 : 52;
  const epi = p === 1 ? 18 : -78;
  const eesOpen = p >= 1;
  const tube = (d: string) => (
    <>
      <path d={d} stroke="var(--d-line)" strokeWidth={34} strokeLinecap="round" fill="none" />
    </>
  );
  const inner = (d: string) => <path d={d} stroke="var(--d-tube-in)" strokeWidth={27} strokeLinecap="round" fill="none" />;
  const paths = ['M60,140 L238,140', 'M238,140 L262,58', 'M246,140 L258,238', 'M242,238 L236,350', 'M274,238 L282,350'];
  return (
    <div className="dfig dfig--split">
      <div>
        <ChoiceBar
          label="Fase de la deglución"
          value={String(p)}
          onChange={(v) => {
            setAuto(false);
            setP(Number(v));
          }}
          options={PHASES.map((f, i) => ({ id: String(i), label: `${i + 1}. ${f.title}`, tone: (['peach', 'rose', 'sky'] as Tone[])[i] }))}
        />
        <svg viewBox="0 0 420 360" role="img" aria-label={`Corte sagital esquemático de boca, faringe, laringe y esófago. ${PHASES[p].title}.`}>
          {paths.map((d) => (
            <g key={d}>{tube(d)}</g>
          ))}
          {paths.map((d) => (
            <g key={'i' + d}>{inner(d)}</g>
          ))}
          <path d="M72,158 Q150,124 228,158 Z" fill="var(--d-rose-fill)" stroke="var(--d-rose-stroke)" strokeWidth={1.5} style={{ transform: p === 0 ? 'translateY(-5px)' : 'none', transition: 'transform .6s' }} />
          <g style={{ transform: `rotate(${velum}deg)`, transformOrigin: '226px 124px', transition: 'transform .6s' }}>
            <line x1={226} y1={124} x2={258} y2={124} stroke="var(--d-rose-ink)" strokeWidth={6} strokeLinecap="round" />
          </g>
          <g style={{ transform: `rotate(${epi}deg)`, transformOrigin: '232px 232px', transition: 'transform .6s' }}>
            <line x1={232} y1={232} x2={260} y2={232} stroke="var(--d-lilac-ink)" strokeWidth={6} strokeLinecap="round" />
          </g>
          <line x1={eesOpen ? 261 : 268} y1={258} x2={eesOpen ? 261 : 268} y2={270} stroke="var(--d-sky-ink)" strokeWidth={5} strokeLinecap="round" style={{ transition: 'all .5s' }} />
          <line x1={eesOpen ? 295 : 288} y1={258} x2={eesOpen ? 295 : 288} y2={270} stroke="var(--d-sky-ink)" strokeWidth={5} strokeLinecap="round" style={{ transition: 'all .5s' }} />
          <circle r={11} fill="var(--d-rose-ink)" style={{ transform: `translate(${bolus[0]}px, ${bolus[1]}px)`, transition: 'transform .8s ease-in-out' }} />
          <T x={92} y={184} lines={['Cavidad oral']} size={13} weight={700} fill="var(--d-text)" />
          <T x={274} y={62} lines={['Nasofaringe']} size={12} />
          <T x={300} y={170} lines={['Faringe']} size={12} />
          <T x={128} y={300} lines={['Laringe →', 'tráquea']} size={12} anchor="start" />
          <T x={304} y={312} lines={['Esófago']} size={12} />
          <T x={304} y={268} lines={['EES']} size={12} weight={700} fill="var(--d-sky-ink)" />
          <T x={220} y={108} lines={['velo del paladar']} size={11} fill="var(--d-rose-ink)" anchor="end" />
          <T x={150} y={232} lines={['epiglotis']} size={11} fill="var(--d-lilac-ink)" />
        </svg>
        <div className="dlegend">
          <button className="btn btn--ghost btn--sm" onClick={() => setAuto((a) => !a)}>
            {auto ? 'Pausar animación' : 'Animar las tres fases'}
          </button>
        </div>
      </div>
      <div className="dfig">
        {PHASES.map((f, i) => (
          <div key={f.title} className={`dpanel tone-${(['peach', 'rose', 'sky'] as Tone[])[i]}`} style={{ opacity: i === p ? 1 : 0.55, transition: 'opacity .3s' }}>
            <h5>
              {i + 1}. {f.title} · <small>{f.kind}</small>
            </h5>
            <p style={{ margin: '0 0 6px' }}>{f.what}</p>
            <p style={{ margin: 0, color: 'var(--d-rose-ink)' }}>
              <strong>Si falla:</strong> {f.fail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── 3. El estómago: regiones y funciones ───────── */

const STOMACH =
  'M250,60 C238,30 268,14 300,22 C350,34 392,92 396,160 C400,232 356,292 292,306 C244,316 196,308 164,290 L150,282 L150,258 C180,266 216,266 246,254 C282,238 300,200 294,150 C290,110 282,84 276,62 Z';

export function EstomagoFunciones() {
  const lead = (x1: number, y1: number, x2: number, y2: number) => <path d={`M${x1},${y1} L${x2},${y2}`} stroke="var(--d-line-2)" strokeWidth={1.2} strokeDasharray="3 3" />;
  return (
    <svg viewBox="0 0 700 360" role="img" aria-label="Estómago esquemático con fundus, cuerpo, antro y píloro y la función de cada región">
      <defs>
        <clipPath id="stomclip">
          <path d={STOMACH} />
        </clipPath>
      </defs>
      <path d="M250,0 L276,0 L276,64 L250,64 Z" fill="var(--d-sky-fill)" stroke="var(--d-sky-stroke)" strokeWidth={2} />
      <path d="M150,262 C118,262 104,278 104,302 L104,360" fill="none" stroke="var(--d-line)" strokeWidth={30} />
      <path d="M150,262 C118,262 104,278 104,302 L104,360" fill="none" stroke="var(--d-tube-in)" strokeWidth={24} />
      <g clipPath="url(#stomclip)">
        <rect x={0} y={0} width={700} height={96} fill={PAL.lilac.fill} />
        <rect x={0} y={96} width={700} height={142} fill={PAL.rose.fill} />
        <rect x={0} y={238} width={700} height={130} fill={PAL.peach.fill} />
      </g>
      <path d={STOMACH} fill="none" stroke="var(--d-text-3)" strokeWidth={2.5} />
      <line x1={150} y1={256} x2={150} y2={284} stroke="var(--d-sky-ink)" strokeWidth={7} strokeLinecap="round" />
      <circle cx={92} cy={330} r={5} fill="var(--d-peach-ink)" />
      <T x={40} y={352} lines={['papila de Vater']} size={11} fill="var(--d-peach-ink)" />
      <T x={300} y={64} lines={['FUNDUS']} size={12} weight={700} fill={PAL.lilac.ink} anchor="middle" />
      <T x={340} y={172} lines={['CUERPO']} size={12} weight={700} fill={PAL.rose.ink} anchor="middle" />
      <T x={236} y={292} lines={['ANTRO']} size={12} weight={700} fill={PAL.peach.ink} anchor="middle" />
      <T x={150} y={240} lines={['PÍLORO']} size={11} weight={700} fill="var(--d-sky-ink)" anchor="middle" />
      {lead(330, 50, 440, 42)}
      <T x={446} y={36} lines={['Fundus: acomodación', 'Se relaja al comer (reflejo vagal) y', 'recibe el alimento sin subir la presión.']} size={12} />
      {lead(380, 160, 440, 132)}
      <T x={446} y={126} lines={['Cuerpo: secreción', 'Células parietales: ácido clorhídrico y', 'factor intrínseco (absorción de B12).']} size={12} />
      {lead(300, 286, 440, 228)}
      <T x={446} y={222} lines={['Antro y píloro: vaciamiento', 'Trituran, mezclan y dosifican el paso', 'del contenido al duodeno.']} size={12} />
      <rect x={440} y={282} width={252} height={70} rx={12} fill="var(--d-card)" stroke="var(--d-line)" />
      <T x={452} y={302} lines={['Barrera mucosa: moco + bicarbonato +', 'prostaglandinas. Los AINEs bajan las', 'prostaglandinas; H. pylori la inflama.']} size={11.5} fill="var(--d-text)" />
    </svg>
  );
}

/* ───────── 4. El reflejo del vómito ───────── */

const INPUTS = [
  { t: 'Tubo digestivo y peritoneo', d: ['Vía vagal: distensión, obstrucción,', 'irritación o inflamación'], tone: 'rose' as Tone },
  { t: 'Zona gatillo (área postrema)', d: ['Fármacos, toxinas, uremia,', 'cetoacidosis, embarazo'], tone: 'lilac' as Tone },
  { t: 'Aparato vestibular', d: ['Cinetosis; Ménière (vértigo', 'y acúfenos)'], tone: 'sky' as Tone },
  { t: 'Corteza y sistema límbico', d: ['Olores, dolor intenso,', 'ansiedad'], tone: 'mint' as Tone },
  { t: 'Hipertensión endocraneana', d: ['Estímulo directo: vómito', 'en chorro, sin náuseas'], tone: 'peach' as Tone },
];

export function ReflejoVomito() {
  const cy = 210;
  return (
    <svg viewBox="0 0 770 420" role="img" aria-label="Esquema del reflejo del vómito: cinco vías aferentes convergen en el centro del vómito del bulbo y producen náusea, arcadas y vómito">
      <defs>
        <marker id="vh" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--d-text-3)" />
        </marker>
      </defs>
      {INPUTS.map((inp, i) => {
        const y = 14 + i * 80;
        return (
          <g key={inp.t}>
            <rect x={8} y={y} width={244} height={66} rx={14} fill={PAL[inp.tone].fill} stroke={PAL[inp.tone].stroke} strokeWidth={1.5} />
            <T x={20} y={y + 22} lines={[inp.t]} size={13} weight={700} fill={PAL[inp.tone].ink} />
            <T x={20} y={y + 40} lines={inp.d} size={11.5} />
            <path d={`M252,${y + 33} C 280,${y + 33} 280,${cy} 300,${cy}`} fill="none" stroke="var(--d-line-2)" strokeWidth={1.8} markerEnd="url(#vh)" strokeDasharray={i === 4 ? '5 4' : undefined} />
          </g>
        );
      })}
      <ellipse cx={395} cy={cy} rx={92} ry={52} fill="var(--d-strong)" />
      <T x={395} y={cy - 4} lines={['Centro del vómito']} size={15} weight={700} fill="var(--d-on-strong)" anchor="middle" />
      <T x={395} y={cy + 16} lines={['(bulbo raquídeo)']} size={12} fill="var(--d-on-strong-2)" anchor="middle" />
      {[
        { t: 'Náusea', d: ['Deseo de vomitar; palidez,', 'sudoración, salivación'], y: 40 },
        { t: 'Arcadas', d: ['Contracciones rítmicas con', 'la glotis cerrada'], y: 172 },
        { t: 'Vómito', d: ['Diafragma + abdominales se contraen,', 'el EEI se relaja: expulsión'], y: 304 },
      ].map((o, i) => (
        <g key={o.t}>
          <rect x={522} y={o.y} width={240} height={70} rx={14} fill="var(--d-card)" stroke="var(--d-line)" strokeWidth={1.5} />
          <T x={536} y={o.y + 24} lines={[o.t]} size={14} weight={700} fill="var(--d-text)" />
          <T x={536} y={o.y + 42} lines={o.d} size={11.5} />
          <path d={`M487,${cy} C 505,${cy} 500,${o.y + 35} 518,${o.y + 35}`} fill="none" stroke="var(--d-line-2)" strokeWidth={1.8} markerEnd="url(#vh)" />
          {i < 2 && <path d={`M642,${o.y + 70} L642,${o.y + 128}`} stroke="var(--d-text-3)" strokeWidth={1.8} markerEnd="url(#vh)" />}
        </g>
      ))}
      <T x={395} y={300} lines={['La HTE puede saltear la náusea', '(línea punteada): vómito en chorro.']} size={11.5} fill="var(--d-peach-ink)" anchor="middle" />
    </svg>
  );
}

/* ───────── 5. ¿Dónde se traba? Orofaríngea vs esofágica ───────── */

const WHERE = {
  oro: {
    title: 'Disfagia orofaríngea (alta, de transferencia)',
    tone: 'peach' as Tone,
    items: [
      'Le cuesta **iniciar** la deglución: repite el intento.',
      'Señala la **garganta** (región cervical).',
      'Regurgitación inmediata por boca **o nariz**.',
      'Tos, sensación de ahogo, disfonía: el bolo entra en la vía aérea.',
      'Más difícil con **líquidos**.',
      'Riesgo: neumonía aspirativa.',
    ],
  },
  eso: {
    title: 'Disfagia esofágica (baja, de transporte)',
    tone: 'sky' as Tone,
    items: [
      'Traga bien: la molestia aparece **después** de iniciar la deglución.',
      'Siente que se le **atasca detrás del esternón** (o en el epigastrio).',
      'Opresión retroesternal, dolor torácico, odinofagia.',
      'Sin regurgitación nasal ni tos (salvo esófago muy ocupado).',
      'Regurgitación tardía.',
      'Sólidos solos → mecánica · sólidos y líquidos → motora.',
    ],
  },
};

export function DisfagiaDonde() {
  const [k, setK] = useState<'oro' | 'eso'>('oro');
  const w = WHERE[k];
  const on = (x: 'oro' | 'eso') => (k === x ? 1 : 0.25);
  return (
    <div className="dfig dfig--split">
      <div>
        <ChoiceBar
          label="Tipo de disfagia"
          value={k}
          onChange={setK}
          options={[
            { id: 'oro', label: 'Orofaríngea', tone: 'peach' },
            { id: 'eso', label: 'Esofágica', tone: 'sky' },
          ]}
        />
        <svg viewBox="0 0 240 300" role="img" aria-label="Silueta que muestra dónde localiza el paciente la disfagia: cuello en la orofaríngea, detrás del esternón en la esofágica">
          <circle cx={120} cy={50} r={32} fill="var(--d-skin)" stroke="var(--d-line)" strokeWidth={2} />
          <path d="M104,80 L136,80 L138,116 L102,116 Z" fill="var(--d-skin)" stroke="var(--d-line)" strokeWidth={2} />
          <path d="M44,300 L44,170 Q44,126 102,116 L138,116 Q196,126 196,170 L196,300 Z" fill="var(--d-skin)" stroke="var(--d-line)" strokeWidth={2} />
          <path d="M120,92 L120,250" stroke="var(--d-sky-stroke)" strokeWidth={6} strokeLinecap="round" opacity={0.5} />
          <g opacity={on('oro')} style={{ transition: 'opacity .3s' }}>
            <circle cx={120} cy={100} r={18} fill="none" stroke="var(--d-peach-stroke)" strokeWidth={3}>
              <animate attributeName="r" values="12;20;12" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx={120} cy={100} r={6} fill="var(--d-peach-ink)" />
            <T x={150} y={98} lines={['"Acá, en la', 'garganta"']} size={11} fill="var(--d-peach-ink)" />
          </g>
          <g opacity={on('eso')} style={{ transition: 'opacity .3s' }}>
            <circle cx={120} cy={180} r={18} fill="none" stroke="var(--d-sky-stroke)" strokeWidth={3}>
              <animate attributeName="r" values="12;20;12" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx={120} cy={180} r={6} fill="var(--d-sky-ink)" />
            <circle cx={120} cy={244} r={5} fill="var(--d-sky-ink)" opacity={0.6} />
            <T x={150} y={178} lines={['"Se me traba', 'detrás del pecho"']} size={11} fill="var(--d-sky-ink)" />
          </g>
        </svg>
      </div>
      <div className={`dpanel tone-${w.tone}`}>
        <h5>{w.title}</h5>
        <ul>
          {w.items.map((it) => (
            <li key={it}>
              <Rich text={it} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ───────── 6. Algoritmo de la disfagia ───────── */

const DISFAGIA_TREE: FlowNode = {
  label: 'Paciente con disfagia',
  note: '1.º ¿dónde se traba? · 2.º ¿con qué alimentos? · 3.º ¿cómo evoluciona?',
  tone: 'ink',
  children: [
    {
      edge: 'cuesta iniciar',
      label: 'Disfagia orofaríngea',
      note: 'Tos, ahogo, regurgitación nasal; señala el cuello',
      tone: 'peach',
      children: [
        { label: 'Neuromuscular (≈75 %)', note: 'ACV (1.ª causa), Parkinson, esclerosis múltiple, ELA, miastenia gravis, miopatías', tone: 'peach' },
        { label: 'Estructural / motora local', note: 'Acalasia cricofaríngea, divertículo de Zenker, tumores, radiación, cirugía', tone: 'peach' },
      ],
    },
    {
      edge: 'traga y se atasca',
      label: 'Disfagia esofágica',
      note: 'Atascamiento retroesternal después de tragar',
      tone: 'sky',
      children: [
        {
          edge: 'solo sólidos',
          label: 'Mecánica (obstructiva)',
          note: 'Continua y progresiva; alivia al regurgitar',
          tone: 'sky',
          children: [
            { edge: 'intermitente', label: 'Anillo de Schatzki', note: 'o membrana esofágica', tone: 'sky' },
            { edge: 'progresiva + pirosis', label: 'Estenosis péptica', note: 'por ERGE: causa más frecuente de disfagia mecánica', tone: 'sky' },
            { edge: 'progresiva + > 50 años + pérdida de peso', label: 'Cáncer de esófago', tone: 'rose' },
          ],
        },
        {
          edge: 'sólidos y líquidos',
          label: 'Motora (funcional)',
          note: 'Intermitente, impredecible, no siempre progresiva',
          tone: 'lilac',
          children: [
            { edge: 'intermitente + dolor torácico', label: 'Espasmo esofágico difuso', tone: 'lilac' },
            { edge: 'progresiva + pirosis', label: 'Esclerodermia', tone: 'lilac' },
            { edge: 'lenta y progresiva + regurgitación', label: 'Acalasia', tone: 'lilac', star: true },
          ],
        },
      ],
    },
  ],
};

export function DisfagiaAlgoritmo() {
  return <Flow root={DISFAGIA_TREE} caption="Algoritmo diagnóstico de la disfagia" />;
}

/* ───────── 7. Esofagograma con bario: normal, acalasia y cáncer ───────── */

function XRay({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 200 300" role="img" aria-label={label}>
      <rect x={0} y={0} width={200} height={300} rx={14} fill="var(--d-xray)" />
      {children}
    </svg>
  );
}

export function Esofagograma() {
  const barium = 'var(--d-barium)';
  return (
    <div className="layers-demo">
      <figure>
        <XRay label="Esofagograma normal: esófago de calibre uniforme que desemboca en el estómago">
          <path d="M92,20 L108,20 L110,212 C150,222 170,256 158,282 C146,300 80,298 74,280 C68,258 80,234 94,222 Z" fill={barium} />
          <ellipse cx={136} cy={238} rx={16} ry={9} fill="var(--d-xray)" opacity={0.85} />
        </XRay>
        <figcaption>
          <strong>Normal</strong>
          <br />
          Calibre uniforme; burbuja de aire gástrico.
        </figcaption>
      </figure>
      <figure>
        <XRay label="Acalasia: esófago dilatado y elongado con nivel hidroaéreo que termina en una punta afilada, en pico de pájaro">
          <defs>
            <clipPath id="acal">
              <path d="M70,24 C58,80 54,150 62,200 C68,232 92,250 98,268 L100,286 L104,286 L106,268 C114,250 138,230 144,200 C152,150 148,80 136,24 Z" />
            </clipPath>
          </defs>
          <g clipPath="url(#acal)">
            <rect x={0} y={0} width={200} height={110} fill="var(--d-air)" />
            <rect x={0} y={110} width={200} height={200} fill={barium} />
          </g>
          <line x1={58} y1={110} x2={150} y2={110} stroke="var(--d-card)" strokeWidth={1} strokeDasharray="3 3" opacity={0.7} />
          <path d="M101,286 L102,298" stroke={barium} strokeWidth={2} />
          <T x={150} y={106} lines={['nivel']} size={10} fill="var(--d-card)" />
          <T x={116} y={282} lines={['pico de', 'pájaro']} size={10} fill="var(--gold-700)" />
        </XRay>
        <figcaption>
          <strong>Acalasia</strong>
          <br />
          Dolicomegaesófago con nivel hidroaéreo y afinamiento liso “en pico de pájaro” (o cola de ratón).
        </figcaption>
      </figure>
      <figure>
        <XRay label="Cáncer de esófago: estrechez irregular y abrupta con bordes en manzana mordida">
          <path
            d="M90,20 L90,118 L82,122 L97,128 L93,138 L99,147 L95,157 L100,166 L92,174 L82,178 L90,184 L90,226 C62,236 60,286 98,290 C142,292 146,240 110,226 L110,184 L118,178 L104,172 L108,162 L103,152 L107,143 L102,133 L117,124 L110,118 L110,20 Z"
            fill={barium}
          />
          <path d="M122,124 L150,110" stroke="var(--gold-700)" strokeWidth={1.2} />
          <T x={136} y={100} lines={['estenosis', 'irregular']} size={10} fill="var(--gold-700)" />
        </XRay>
        <figcaption>
          <strong>Cáncer de esófago</strong>
          <br />
          Estrechez irregular y abrupta, con bordes en “manzana mordida”; se confirma con endoscopía y biopsia.
        </figcaption>
      </figure>
    </div>
  );
}

/* ───────── 8. Dispepsia según Roma ───────── */

export function DispepsiaRoma() {
  return (
    <div className="dfig">
      <div className="dfig dfig--split">
        <div className="dpanel tone-lilac">
          <h5>Síndrome de distrés posprandial</h5>
          <ul>
            <li>Plenitud posprandial molesta</li>
            <li>Saciedad precoz</li>
          </ul>
          <p className="muted" style={{ margin: '6px 0 0', fontSize: '.82rem' }}>
            Se relaciona con la comida. Roma IV exige que ocurran al menos 3 días por semana.
          </p>
        </div>
        <div className="dpanel tone-rose">
          <h5>Síndrome de dolor epigástrico</h5>
          <ul>
            <li>Dolor epigástrico</li>
            <li>Ardor epigástrico</li>
          </ul>
          <p className="muted" style={{ margin: '6px 0 0', fontSize: '.82rem' }}>
            Localizado, intermitente, no se alivia con la defecación ni los gases y no cumple criterios de dolor biliar. Roma IV: al menos 1 día por semana.
          </p>
        </div>
      </div>
      <div className="dfig dfig--split" style={{ alignItems: 'center' }}>
        <div className="dpanel tone-ink">
          <h5>Para todos los casos</h5>
          <ul>
            <li>Síntomas presentes en los últimos 3 meses…</li>
            <li>…con comienzo al menos 6 meses antes del diagnóstico.</li>
            <li>Sin lesión estructural que los explique (endoscopía alta normal si se realizó).</li>
          </ul>
        </div>
        <Donut
          parts={[
            { label: 'Dispepsia funcional (esencial, no ulcerosa)', value: 60, tone: 'lilac' },
            { label: 'Dispepsia orgánica', value: 40, tone: 'rose' },
          ]}
          center={<>Según la clase</>}
        />
      </div>
    </div>
  );
}

/* ───────── 9. Mecanismos de la dispepsia funcional ───────── */

export function DispepsiaMecanismos() {
  const col = (title: string, tone: Tone, items: { t: string; d?: string }[]) => (
    <div className={`dpanel tone-${tone}`}>
      <h5>{title}</h5>
      <ul>
        {items.map((i) => (
          <li key={i.t}>
            <strong>{i.t}</strong>
            {i.d && <> — {i.d}</>}
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className="mech3">
      {col('Disparadores', 'peach', [
        { t: 'Factores psicológicos', d: 'ansiedad, depresión, somatización, estrés' },
        { t: 'Factores externos', d: 'comidas grasas, intolerancias alimentarias' },
        { t: 'Helicobacter pylori', d: 'inflamación de la mucosa sin úlcera' },
        { t: 'Hipersecreción ácida', d: 'y reflujo gastroesofágico' },
      ])}
      <div className="mech3__arrow" aria-hidden="true">
        →
      </div>
      {col('Mecanismos (eje cerebro–estómago)', 'lilac', [
        { t: 'Falla de la acomodación fúndica', d: 'el fundus no se relaja' },
        { t: 'Retraso del vaciamiento gástrico', d: 'el contenido queda retenido' },
        { t: 'Hipersensibilidad visceral', d: 'estímulos normales se sienten como dolor' },
        { t: 'Dismotilidad gastroduodenal' },
      ])}
      <div className="mech3__arrow" aria-hidden="true">
        →
      </div>
      {col('Lo que siente el paciente', 'rose', [
        { t: 'Plenitud y saciedad precoz', d: 'fundus que no acomoda, vaciamiento lento' },
        { t: 'Dolor o ardor epigástrico', d: 'hipersensibilidad, ácido' },
        { t: 'Distensión, eructos, náuseas' },
      ])}
    </div>
  );
}

/* ───────── 10. Conducta ante la dispepsia ───────── */

const DISPEPSIA_TREE: FlowNode = {
  label: 'Dispepsia',
  note: 'Interrogatorio completo: fármacos (AINEs), antecedentes, síntomas biliares o pancreáticos',
  tone: 'ink',
  children: [
    {
      label: '¿≥ 55 años o algún signo de alarma?',
      tone: 'ink',
      children: [
        { edge: 'sí', label: 'Endoscopía digestiva alta + biopsias', note: 'Busca úlcera, cáncer y H. pylori', tone: 'rose', star: true },
        {
          edge: 'no',
          label: 'Test no invasivo de H. pylori',
          tone: 'lilac',
          children: [
            { edge: 'positivo', label: 'Erradicar', note: 'Triple terapia “OCA”', tone: 'mint' },
            {
              edge: 'negativo',
              label: 'IBP 4–6 semanas',
              tone: 'sky',
              children: [{ edge: 'sin respuesta', label: 'Reevaluar → endoscopía', tone: 'rose' }],
            },
          ],
        },
      ],
    },
  ],
};

export function DispepsiaAlgoritmo() {
  return <Flow root={DISPEPSIA_TREE} caption="Conducta ante la dispepsia" />;
}

/* ───────── 11. El vómito: qué contiene y de dónde viene (interactivo) ───────── */

type VKey = 'alim' | 'gast' | 'bili' | 'rojo' | 'cafe' | 'feca';
const VTYPES: Record<VKey, { label: string; tone: Tone; seg: number[]; aspect: string; level: string; think: string }> = {
  alim: { label: 'Alimenticio', tone: 'peach', seg: [0], aspect: 'Alimentos casi enteros, sin digerir y con poco ácido.', level: 'Esófago (nunca llegó al estómago).', think: 'Acalasia, estenosis, divertículo; suele acompañarse de opresión retroesternal.' },
  gast: { label: 'Parcialmente digerido', tone: 'lilac', seg: [1], aspect: 'Restos alimentarios con mucho líquido ácido.', level: 'Estómago.', think: 'Gastroparesia, obstrucción pilórica, distensión gástrica. Si aparece horas después de comer: síndrome pilórico.' },
  bili: { label: 'Bilioso', tone: 'mint', seg: [1, 2], aspect: 'Amarillo-verdoso, deja sabor amargo.', level: 'Contenido duodenal que refluye al estómago (el píloro está permeable).', think: 'Patología biliar, pancreática o hepática; vómitos repetidos. Un síndrome pilórico puro no da vómitos biliosos.' },
  rojo: { label: 'Hemático rojo', tone: 'rose', seg: [0, 1, 2], aspect: 'Sangre roja rutilante.', level: 'Tubo digestivo alto (esófago, estómago, duodeno).', think: 'Sangrado activo: várices esofágicas (sangre venosa abundante), úlcera, Mallory-Weiss.' },
  cafe: { label: 'Borra de café', tone: 'rose', seg: [1, 2], aspect: 'Sangre oscura, granulosa, con coágulos o restos.', level: 'Tubo digestivo alto: sangre que el ácido ya digirió.', think: 'Sangrado no tan reciente; primero descartar úlcera péptica.' },
  feca: { label: 'Fecaloide', tone: 'peach', seg: [3, 4], aspect: 'Marrón, de olor fecal.', level: 'Intestino distal.', think: 'Obstrucción intestinal baja o fístula gastrocólica.' },
};
const SEGS = [
  { name: 'Esófago', y: 20, h: 86, w: 34 },
  { name: 'Estómago', y: 116, h: 84, w: 120 },
  { name: 'Duodeno', y: 210, h: 44, w: 60 },
  { name: 'Intestino delgado', y: 264, h: 70, w: 100 },
  { name: 'Colon', y: 344, h: 60, w: 130 },
];

export function VomitoNivel() {
  const [k, setK] = useState<VKey>('alim');
  const v = VTYPES[k];
  return (
    <div className="dfig dfig--split">
      <div>
        <ChoiceBar label="Tipo de vómito" value={k} onChange={setK} options={(Object.keys(VTYPES) as VKey[]).map((id) => ({ id, label: VTYPES[id].label, tone: VTYPES[id].tone }))} />
        <svg viewBox="0 0 300 415" role="img" aria-label={`Tubo digestivo esquemático; el vómito ${v.label} se origina en: ${v.level}`}>
          {SEGS.map((s, i) => {
            const on = v.seg.includes(i);
            const cx = 100;
            const x = cx - s.w / 2;
            return (
              <g key={s.name}>
                <rect x={x} y={s.y} width={s.w} height={s.h} rx={s.w > 60 ? 26 : 16} fill={on ? PAL[v.tone].fill : 'var(--d-off)'} stroke={on ? PAL[v.tone].ink : 'var(--d-line)'} strokeWidth={on ? 3 : 1.5} style={{ transition: 'all .3s' }} />
                <text x={cx + s.w / 2 + 12} y={s.y + s.h / 2 + 4} fontSize={13} fontWeight={on ? 700 : 500} fill={on ? PAL[v.tone].ink : 'var(--d-text-3)'}>
                  {s.name}
                </text>
              </g>
            );
          })}
          <circle cx={68} cy={232} r={4} fill="var(--d-peach-ink)" />
          <text x={60} y={236} fontSize={10.5} fill="var(--d-peach-ink)" textAnchor="end">
            papila
          </text>
        </svg>
      </div>
      <div className={`dpanel tone-${v.tone}`}>
        <h5>Vómito {v.label.toLowerCase()}</h5>
        <p style={{ margin: '0 0 6px' }}>
          <strong>Aspecto:</strong> {v.aspect}
        </p>
        <p style={{ margin: '0 0 6px' }}>
          <strong>De dónde viene:</strong> {v.level}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Pensar en:</strong> {v.think}
        </p>
      </div>
    </div>
  );
}

/* ───────── 12. El reloj del vómito ───────── */

export function VomitoReloj() {
  const items: { time: string; what: string; why: string; tone: Tone }[] = [
    { time: 'Al despertar, en ayunas', what: 'Embarazo · Alcohol · HTE', why: 'Las tres causas más frecuentes que remarca el profesor: embarazo, haber tomado alcohol la noche anterior, hipertensión endocraneana.', tone: 'peach' },
    { time: '≈ 1 hora después de comer', what: 'Estómago', why: 'Gastritis, úlcera, distensión gástrica.', tone: 'lilac' },
    { time: 'Varias horas después', what: 'Píloro', why: 'Vómito de retención con alimentos de comidas previas: síndrome pilórico.', tone: 'sky' },
    { time: 'Por la noche', what: 'Organicidad', why: 'El vómito nocturno casi siempre obedece a una causa orgánica.', tone: 'rose' },
  ];
  return (
    <div className="tl">
      <div className="tl__bar">
        {items.map((i) => (
          <div key={i.time} className={`tl__item tone-${i.tone}`}>
            <div className="tl__time">{i.time}</div>
            <div className="tl__what">{i.what}</div>
            <div>{i.why}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── 13. Complicaciones del vómito ───────── */

function Wall({ variant }: { variant: 'normal' | 'mw' | 'boer' }) {
  return (
    <svg viewBox="0 0 160 160" role="img" aria-label={variant === 'normal' ? 'Corte transversal normal del esófago' : variant === 'mw' ? 'Desgarro limitado a la mucosa' : 'Rotura de todo el espesor de la pared'}>
      <circle cx={80} cy={80} r={62} fill={PAL.peach.fill} stroke={PAL.peach.stroke} strokeWidth={2} />
      <circle cx={80} cy={80} r={44} fill="var(--d-rose-soft)" stroke={PAL.rose.stroke} strokeWidth={1.5} />
      <circle cx={80} cy={80} r={32} fill={PAL.rose.fill} stroke={PAL.rose.ink} strokeWidth={1.5} />
      <circle cx={80} cy={80} r={16} fill="var(--d-card)" stroke="var(--d-line)" />
      {variant === 'mw' && (
        <>
          <path d="M80,64 L74,48 L86,48 Z" fill="var(--d-red)" />
          <circle cx={80} cy={72} r={2.5} fill="var(--d-red)" />
          <circle cx={84} cy={76} r={2} fill="var(--d-red)" />
        </>
      )}
      {variant === 'boer' && (
        <>
          <path d="M77,64 L74,14 L86,14 L83,64 Z" fill="var(--d-red)" />
          <path d="M80,12 L80,2" stroke="var(--d-red)" strokeWidth={2} />
          <path d="M66,8 L58,0 M94,8 L102,0" stroke="var(--d-red)" strokeWidth={2} />
        </>
      )}
      <text x={80} y={154} textAnchor="middle" fontSize={9} fill="var(--d-text-3)">
        mucosa · submucosa · muscular
      </text>
    </svg>
  );
}

export function VomitoComplicaciones() {
  return (
    <div className="dfig">
      <div className="mech3">
        <div className="dpanel tone-sky">
          <h5>Se pierde por la boca</h5>
          <ul>
            <li>
              <strong>Ácido clorhídrico</strong> (H⁺ y Cl⁻)
            </li>
            <li>
              <strong>Agua y sodio</strong>
            </li>
            <li>Algo de potasio</li>
          </ul>
        </div>
        <div className="mech3__arrow" aria-hidden="true">
          →
        </div>
        <div className="dpanel tone-lilac">
          <h5>El organismo responde</h5>
          <ul>
            <li>Sin H⁺ que neutralizar, sube el bicarbonato.</li>
            <li>La hipovolemia activa la aldosterona: el riñón retiene sodio y elimina potasio.</li>
          </ul>
        </div>
        <div className="mech3__arrow" aria-hidden="true">
          →
        </div>
        <div className="dpanel tone-rose">
          <h5>Resultado</h5>
          <ul>
            <li>
              <strong>Alcalosis metabólica</strong>
            </li>
            <li>
              <strong>Hipopotasemia</strong> (la mayor pérdida es renal)
            </li>
            <li>
              <strong>Deshidratación</strong>: taquicardia, hipotensión
            </li>
          </ul>
        </div>
      </div>
      <div className="layers-demo">
        <figure>
          <Wall variant="normal" />
          <figcaption>
            <strong>Pared esofágica normal</strong>
          </figcaption>
        </figure>
        <figure>
          <Wall variant="mw" />
          <figcaption>
            <strong>Mallory-Weiss</strong>: desgarro de la <em>mucosa</em> de la unión gastroesofágica por arcadas o vómitos intensos (típico del alcohólico) → hematemesis.
          </figcaption>
        </figure>
        <figure>
          <Wall variant="boer" />
          <figcaption>
            <strong>Boerhaave</strong>: rotura de <em>todo el espesor</em> del esófago → el contenido pasa al mediastino (mediastinitis). Emergencia.
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export const diagrams = {
  'trayecto-alto': TrayectoAlto,
  'deglucion-fases': DeglucionFases,
  'estomago-funciones': EstomagoFunciones,
  'reflejo-vomito': ReflejoVomito,
  'disfagia-donde': DisfagiaDonde,
  'disfagia-algoritmo': DisfagiaAlgoritmo,
  esofagograma: Esofagograma,
  'dispepsia-roma': DispepsiaRoma,
  'dispepsia-mecanismos': DispepsiaMecanismos,
  'dispepsia-algoritmo': DispepsiaAlgoritmo,
  'vomito-nivel': VomitoNivel,
  'vomito-reloj': VomitoReloj,
  'vomito-complicaciones': VomitoComplicaciones,
};
