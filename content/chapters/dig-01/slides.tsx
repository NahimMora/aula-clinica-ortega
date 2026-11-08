/**
 * Escenas animadas del capítulo dig-01. Se usan en dos lugares:
 *  - el video final (render con Remotion CLI, con narración), y
 *  - las diapositivas interactivas de la teoría (@remotion/player, carga diferida).
 * Cada animación arranca en el inicio real de la oración narrada (timing.json).
 */
import type { FC } from 'react';
import { useCurrentFrame } from 'remotion';
import { Appear, Bullets, C, Card, Chip, DISPLAY, Show, cue, ease, spread, type Deck, type SceneProps, type ToneName } from '../../../src/video/kit';
import timing from './timing.json';

/* ───────── 1. Introducción ───────── */
const Intro: FC<SceneProps> = ({ t }) => {
  const f = useCurrentFrame();
  const asks: { n: string; title: string; text: string; tone: ToneName }[] = [
    { n: '1', title: 'Tipos de vómito', text: 'contenido y horario', tone: 'sky' },
    { n: '2', title: 'Hematemesis vs hemoptisis', text: '«ese cuadrito tienen que sabérselo»', tone: 'peach' },
    { n: '3', title: 'Tríada de Mallory-Weiss', text: 'alcoholismo → vómitos → hematemesis', tone: 'rose' },
    { n: '4', title: 'Acalasia', text: '«lo que siempre suelen preguntar»', tone: 'lilac' },
  ];
  // Los cuatro temas aparecen a medida que se nombran en la oración 2.
  const at = (k: number) => cue(t, 2, 90 + k * 50);
  return (
    <>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 250, display: 'flex', justifyContent: 'center', gap: 22 }}>
        {(['Náuseas y vómitos', 'Disfagia', 'Dispepsia'] as const).map((w, i) => (
          <Appear key={w} at={cue(t, 0) + i * 18} style={{ position: 'relative' }}>
            <Chip big tone={(['sky', 'rose', 'lilac'] as ToneName[])[i]}>{w}</Chip>
          </Appear>
        ))}
      </div>
      <Appear at={cue(t, 1)} style={{ left: 0, right: 0, top: 380, textAlign: 'center' }}>
        <Chip tone="peach">★ Digestivo: una de las unidades más preguntadas</Chip>
      </Appear>
      <div style={{ position: 'absolute', left: 160, top: 490, width: 1600, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26 }}>
        {asks.map((a, k) => {
          const lit = f >= at(k) && f < (k < 3 ? at(k + 1) : cue(t, 3));
          return (
            <Appear key={a.n} at={at(k)} style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, background: C.card, border: `3px solid ${lit ? C[a.tone].ink : C[a.tone].stroke}`, borderRadius: 26, padding: '22px 28px', transform: `scale(${lit ? 1.02 : 1})` }}>
                <span style={{ width: 70, height: 70, flex: 'none', borderRadius: 20, background: C[a.tone].ink, color: C.card, display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontSize: 42, fontWeight: 700 }}>{a.n}</span>
                <div>
                  <div style={{ fontFamily: DISPLAY, fontSize: 40, fontWeight: 650, color: C.ink }}>{a.title}</div>
                  <div style={{ fontSize: 26, color: C.ink2, marginTop: 4 }}>{a.text}</div>
                </div>
              </div>
            </Appear>
          );
        })}
      </div>
      <Appear at={cue(t, 3)} style={{ left: 0, right: 0, top: 900, textAlign: 'center', fontFamily: DISPLAY, fontSize: 48, fontWeight: 600, color: C.lilac.ink }}>
        … y el porqué de cada una
      </Appear>
    </>
  );
};

/* ───────── 3. ¿Dónde se traba? ───────── */
const Donde: FC<SceneProps> = ({ t }) => {
  const f = useCurrentFrame();
  const oro = ease(f, cue(t, 1), cue(t, 1) + 20);
  const eso = ease(f, cue(t, 3), cue(t, 3) + 20);
  const pulse = 1 + 0.25 * Math.sin(f / 6);
  return (
    <>
      <svg viewBox="0 0 240 300" style={{ position: 'absolute', left: 170, top: 300, width: 520, height: 650 }}>
        <circle cx={120} cy={50} r={32} fill={C.skin} stroke={C.tube} strokeWidth={2} />
        <path d="M104,80 L136,80 L138,116 L102,116 Z" fill={C.skin} stroke={C.tube} strokeWidth={2} />
        <path d="M44,300 L44,170 Q44,126 102,116 L138,116 Q196,126 196,170 L196,300 Z" fill={C.skin} stroke={C.tube} strokeWidth={2} />
        <path d="M120,92 L120,250" stroke={C.sky.stroke} strokeWidth={6} strokeLinecap="round" opacity={0.5} />
        <g opacity={oro}>
          <circle cx={120} cy={100} r={14 * pulse} fill="none" stroke={C.peach.stroke} strokeWidth={3} />
          <circle cx={120} cy={100} r={6} fill={C.peach.ink} />
        </g>
        <g opacity={eso}>
          <circle cx={120} cy={180} r={14 * pulse} fill="none" stroke={C.sky.stroke} strokeWidth={3} />
          <circle cx={120} cy={180} r={6} fill={C.sky.ink} />
        </g>
      </svg>
      <Appear at={cue(t, 1)} style={{ left: 780, top: 240, width: 1030 }}>
        <Card tone="peach" tag="Alta · de transferencia" title="Disfagia orofaríngea" style={{ padding: '20px 30px' }}>
          <Bullets
            size={28}
            items={[
              { at: spread(t, 1, 4, 0), text: 'No puede iniciar la deglución' },
              { at: spread(t, 1, 4, 1), text: 'Señala la garganta' },
              { at: spread(t, 1, 4, 2), text: 'Tos, ahogo, regurgitación nasal' },
              { at: cue(t, 2), text: 'Más difícil con líquidos' },
              { at: cue(t, 2, 70), text: <b style={{ color: C.red }}>Riesgo: neumonía aspirativa</b> },
            ]}
          />
        </Card>
      </Appear>
      <Appear at={cue(t, 3)} style={{ left: 780, top: 730, width: 1030 }}>
        <Card tone="sky" tag="Baja · de transporte" title="Disfagia esofágica" style={{ padding: '20px 30px' }}>
          Traga bien, pero enseguida la comida <b>se atasca detrás del esternón</b>.
        </Card>
      </Appear>
    </>
  );
};

/* ───────── 5. Muro o motor ───────── */
const MuroMotor: FC<SceneProps> = ({ t }) => {
  const f = useCurrentFrame();
  const c2 = cue(t, 2);
  const c4 = cue(t, 4);
  const drops = (cx: number, start: number, pass: boolean) =>
    f > start
      ? [0, 1, 2, 3, 4, 5].map((k) => {
          const y = pass ? 360 + ((f - start) * 6 + k * 95) % 540 : 410 + 10 * Math.sin((f + k * 20) / 8) + k * 6;
          const x = cx - 18 + (k % 3) * 18;
          return <circle key={k} cx={x} cy={y} r={10} fill={C.sky.stroke} opacity={0.9} />;
        })
      : null;
  const ballY = 360 + 150 * ease(f, c2 + 20, c2 + 70);
  const shake = f > c2 + 70 ? 4 * Math.sin(f / 2) : 0;
  return (
    <>
      <Appear at={cue(t, 1)} style={{ left: 380, top: 240 }}>
        <Chip big tone="sky">MURO · mecánica</Chip>
      </Appear>
      <Appear at={cue(t, 1, 30)} style={{ left: 1170, top: 240 }}>
        <Chip big tone="lilac">MOTOR · motora</Chip>
      </Appear>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <path d="M500,340 L500,560 Q530,600 500,640 L500,920 L620,920 L620,640 Q590,600 620,560 L620,340 Z" fill={C.tubeIn} stroke={C.tube} strokeWidth={5} />
        <path d="M500,560 Q545,600 500,640 M620,560 Q575,600 620,640" fill="none" stroke={C.sky.ink} strokeWidth={6} />
        {drops(560, c2, true)}
        <circle cx={560 + shake} cy={ballY} r={34} fill={C.peach.ink} opacity={f > c2 + 10 ? 1 : 0} />
        <path d="M1300,340 L1300,920 L1420,920 L1420,340 Z" fill={C.tubeIn} stroke={C.tube} strokeWidth={5} />
        {drops(1360, c4, false)}
        <circle cx={1360} cy={470 + 8 * Math.sin(f / 10)} r={34} fill={C.peach.ink} opacity={f > c4 ? 1 : 0} />
        <g opacity={ease(f, c4, c4 + 20)}>
          <path d="M1450,600 q20,-30 40,0 t40,0 t40,0" fill="none" stroke={C.lilac.stroke} strokeWidth={6} />
          <line x1={1450} y1={570} x2={1570} y2={630} stroke={C.red} strokeWidth={7} strokeLinecap="round" />
          <text x={1450} y={680} fontSize={26} fontWeight={700} fill={C.red}>
            sin peristaltismo
          </text>
        </g>
      </svg>
      <div style={{ position: 'absolute', left: 110, top: 400, width: 360 }}>
        <Bullets
          items={[
            { at: cue(t, 3), text: <b>Solo sólidos</b> },
            { at: cue(t, 3, 50), text: 'Continua y progresiva' },
            { at: cue(t, 3, 100), text: 'Alivia al regurgitar' },
          ]}
        />
      </div>
      <div style={{ position: 'absolute', left: 1460, top: 720, width: 380 }}>
        <Bullets
          items={[
            { at: cue(t, 5), text: <b>Sólidos y líquidos</b> },
            { at: cue(t, 5, 60), text: 'Intermitente, impredecible' },
          ]}
        />
      </div>
      <Appear at={cue(t, 6)} style={{ left: 110, top: 950 }}>
        <Chip tone="sky">Mecánica n.º 1: estenosis péptica por reflujo</Chip>
      </Appear>
      <Appear at={cue(t, 7)} style={{ left: 1000, top: 950 }}>
        <Chip tone="lilac">Acalasia · Espasmo difuso · Esclerodermia</Chip>
      </Appear>
    </>
  );
};

/* ───────── 6. Acalasia y esofagograma ───────── */
const ACAL = 'M70,24 C58,80 54,150 62,200 C68,232 92,250 98,268 L100,286 L104,286 L106,268 C114,250 138,230 144,200 C152,150 148,80 136,24 Z';
const CANCER = 'M90,20 L90,118 L82,122 L97,128 L93,138 L99,147 L95,157 L100,166 L92,174 L82,178 L90,184 L90,226 C62,236 60,286 98,290 C142,292 146,240 110,226 L110,184 L118,178 L104,172 L108,162 L103,152 L107,143 L102,133 L117,124 L110,118 L110,20 Z';

const Acalasia: FC<SceneProps> = ({ t }) => {
  const f = useCurrentFrame();
  const dil = ease(f, cue(t, 2), cue(t, 3) + 150);
  const half = 30 + 80 * dil;
  const level = ease(f, cue(t, 3), cue(t, 3) + 140);
  const cx = 400;
  const top = 450;
  const bot = 940;
  const body = `M${cx - half},${top} C${cx - half - 10},${top + 160} ${cx - half},${bot - 120} ${cx - 14},${bot - 30} L${cx - 6},${bot} L${cx + 6},${bot} L${cx + 14},${bot - 30} C${cx + half},${bot - 120} ${cx + half + 10},${top + 160} ${cx + half},${top} Z`;
  return (
    <>
      <Appear at={cue(t, 0)} style={{ left: 110, top: 245 }}>
        <Chip tone="peach">★ La que siempre suelen preguntar</Chip>
      </Appear>
      <Appear at={cue(t, 0, 50)} style={{ left: 110, top: 330, fontSize: 34, fontWeight: 600, color: C.ink }}>
        Sólidos + líquidos · lenta y progresiva · regurgitación → <b style={{ color: C.lilac.ink }}>acalasia</b>
      </Appear>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <clipPath id="esoclip">
            <path d={body} />
          </clipPath>
        </defs>
        <g opacity={ease(f, cue(t, 2), cue(t, 2) + 20)}>
          <path d={body} fill={C.tubeIn} stroke={C.tube} strokeWidth={5} />
          <rect x={cx - 200} y={bot - 30 - 380 * level} width={400} height={400} fill={C.peach.fill} clipPath="url(#esoclip)" />
          <circle cx={cx} cy={bot + 6} r={20} fill="none" stroke={C.red} strokeWidth={8} />
          <text x={cx + 44} y={bot + 14} fontSize={26} fontWeight={700} fill={C.red}>
            EEI no se relaja
          </text>
          <text x={cx + half + 30} y={top + 80} fontSize={26} fontWeight={700} fill={C.lilac.ink}>
            sin peristalsis
          </text>
        </g>
      </svg>
      <Appear at={cue(t, 4)} style={{ left: 110, top: 960 }}>
        <Chip tone="rose">📍 Argentina: pensar en Chagas</Chip>
      </Appear>
      {[
        { at: cue(t, 5), x: 900, path: ACAL, label: 'Pico de pájaro', chip: 'Manometría confirma', tone: 'lilac' as ToneName, air: true },
        { at: cue(t, 6), x: 1380, path: CANCER, label: 'Manzana mordida', chip: 'Endoscopía + biopsia', tone: 'rose' as ToneName, air: false },
      ].map((p) => (
        <Appear key={p.label} at={p.at} style={{ left: p.x, top: 410, width: 420 }}>
          <svg viewBox="0 0 200 300" width={280} height={400}>
            <rect width={200} height={300} rx={14} fill={C.xray} />
            {p.air ? (
              <>
                <clipPath id="ac2">
                  <path d={p.path} />
                </clipPath>
                <g clipPath="url(#ac2)">
                  <rect width={200} height={110} fill={C.air} />
                  <rect y={110} width={200} height={200} fill={C.barium} />
                </g>
              </>
            ) : (
              <path d={p.path} fill={C.barium} />
            )}
          </svg>
          <div style={{ fontFamily: DISPLAY, fontSize: 38, fontWeight: 650, marginTop: 10 }}>{p.label}</div>
          <div style={{ marginTop: 8 }}>
            <Chip tone={p.tone}>{p.chip}</Chip>
          </div>
        </Appear>
      ))}
    </>
  );
};

/* ───────── 7. Dispepsia ───────── */
const Dispepsia: FC<SceneProps> = ({ t }) => {
  const f = useCurrentFrame();
  const glow = ease(f, cue(t, 0), cue(t, 0) + 30) * (0.7 + 0.3 * Math.sin(f / 8));
  const sx = ['Plenitud posprandial', 'Saciedad precoz', 'Dolor epigástrico', 'Ardor epigástrico'];
  const box = ease(f, cue(t, 2), cue(t, 2) + 20);
  return (
    <>
      <svg viewBox="0 0 300 420" style={{ position: 'absolute', left: 130, top: 260, width: 450, height: 630 }}>
        <path d="M60,420 L60,90 Q60,30 150,30 Q240,30 240,90 L240,420 Z" fill={C.skin} stroke={C.tube} strokeWidth={3} />
        <ellipse cx={150} cy={190} rx={58} ry={42} fill={C.rose.stroke} opacity={0.5 * glow} />
        <circle cx={150} cy={290} r={5} fill={C.ink3} />
        <line x1={40} y1={290} x2={260} y2={290} stroke={C.ink3} strokeWidth={2} strokeDasharray="6 6" />
        <text x={150} y={318} textAnchor="middle" fontSize={16} fill={C.ink2}>
          ombligo
        </text>
        <path d="M150,280 L150,236" stroke={C.rose.ink} strokeWidth={4} markerEnd="" />
        <path d="M140,246 L150,232 L160,246" fill="none" stroke={C.rose.ink} strokeWidth={4} />
      </svg>
      {[0, 1].map((g) => (
        <div
          key={g}
          style={{
            position: 'absolute',
            left: 700 + g * 560,
            top: 250,
            width: 520,
            height: 290,
            borderRadius: 28,
            border: `3px solid ${g ? C.rose.stroke : C.lilac.stroke}`,
            background: g ? `${C.rose.fill}88` : `${C.lilac.fill}88`,
            opacity: box,
          }}
        >
          <div style={{ padding: '18px 26px', fontFamily: DISPLAY, fontSize: 28, fontWeight: 650, color: g ? C.rose.ink : C.lilac.ink, whiteSpace: 'nowrap' }}>{g ? 'Síndrome de dolor epigástrico' : 'Síndrome de distrés posprandial'}</div>
        </div>
      ))}
      {sx.map((s, i) => (
        <div key={s} style={{ position: 'absolute', left: 730 + Math.floor(i / 2) * 560, top: 330 + (i % 2) * 92, opacity: ease(f, spread(t, 1, 4, i), spread(t, 1, 4, i) + 14) }}>
          <Chip tone={i < 2 ? 'lilac' : 'rose'}>{s}</Chip>
        </div>
      ))}
      <Appear at={cue(t, 3)} style={{ left: 700, top: 590, width: 1080 }}>
        <div style={{ position: 'relative', height: 70, borderRadius: 35, background: C.track }}>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', borderRadius: 35, background: C.lilac.stroke, color: C.card, fontWeight: 800, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Últimos 3 meses</div>
          <div style={{ position: 'absolute', left: 26, top: 18, fontSize: 28, fontWeight: 700, color: C.ink2 }}>Inicio ≥ 6 meses antes</div>
        </div>
        <div style={{ marginTop: 14, fontSize: 28, color: C.ink2 }}>+ sin lesión estructural que lo explique (endoscopía)</div>
      </Appear>
      <div style={{ position: 'absolute', left: 700, top: 800, display: 'flex', gap: 30 }}>
        {[
          ['D', 'olor'],
          ['D', 'istensión'],
          ['P', 'irosis'],
        ].map(([a, b], i) => (
          <div key={i} style={{ opacity: ease(f, cue(t, 4, 60 + i * 30), cue(t, 4, 74 + i * 30)), fontFamily: DISPLAY, fontSize: 64, fontWeight: 650, color: C.ink }}>
            <span style={{ color: i === 2 ? C.peach.ink : C.rose.ink, fontSize: 96 }}>{a}</span>
            {b}
          </div>
        ))}
      </div>
    </>
  );
};

/* ───────── 9. Signos de alarma ───────── */
const Alarma: FC<SceneProps> = ({ t }) => {
  const f = useCurrentFrame();
  const items: [string, string][] = [
    ['V', 'Vómitos persistentes'],
    ['I', 'Ictericia'],
    ['D', 'Disfagia progresiva'],
    ['A', 'Anemia'],
    ['P', 'Pérdida de peso'],
    ['E', 'Edad > 55 años'],
    ['S', 'Sangrado'],
    ['A', 'AINEs · antecedentes'],
  ];
  const word = ease(f, cue(t, 1), cue(t, 1) + 20);
  return (
    <>
      <div style={{ position: 'absolute', left: 110, top: 250, width: 1700, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
        {items.map(([l, s], i) => (
          <div key={i} style={{ opacity: ease(f, spread(t, 0, 8, i), spread(t, 0, 8, i) + 12), display: 'flex', alignItems: 'center', gap: 14, background: C.card, border: `3px solid ${C.rose.stroke}`, borderRadius: 22, padding: '14px 18px', fontSize: 27, fontWeight: 650 }}>
            <span style={{ width: 52, height: 52, borderRadius: 16, background: C.rose.ink, color: C.card, display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontSize: 32 }}>{l}</span>
            {s}
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', left: 110, top: 480, opacity: word, transform: `scale(${0.9 + 0.1 * word})`, transformOrigin: 'left', fontFamily: DISPLAY, fontSize: 84, fontWeight: 650 }}>
        <span style={{ color: C.rose.ink }}>VIDA</span> que <span style={{ color: C.rose.ink }}>PESA</span> → <span style={{ color: C.lilac.ink }}>VEDA</span>
      </div>
      <Appear at={cue(t, 2)} style={{ left: 110, top: 700, width: 760 }}>
        <Card tone="rose" title="Con alarma" highlight>
          Videoendoscopía digestiva alta con biopsias
        </Card>
      </Appear>
      <div style={{ position: 'absolute', left: 960, top: 640, display: 'grid', gap: 18 }}>
        <Appear at={cue(t, 3)} style={{ position: 'relative' }}>
          <Chip tone="lilac">Joven, sin alarma → test de H. pylori</Chip>
        </Appear>
        <Appear at={cue(t, 4)} style={{ position: 'relative' }}>
          <Chip tone="mint">Positivo → tratar</Chip>
        </Appear>
        <Appear at={cue(t, 5)} style={{ position: 'relative' }}>
          <Chip tone="sky">Negativo → IBP → sin respuesta → endoscopía</Chip>
        </Appear>
      </div>
    </>
  );
};

/* ───────── 11. Qué contiene y cuándo aparece ───────── */
const Contenido: FC<SceneProps> = ({ t }) => {
  const f = useCurrentFrame();
  const segs = [
    { n: 'Esófago', y: 260, h: 110, w: 70 },
    { n: 'Estómago', y: 390, h: 130, w: 280 },
    { n: 'Duodeno', y: 540, h: 70, w: 140 },
    { n: 'Intestino delgado', y: 630, h: 120, w: 240 },
    { n: 'Colon', y: 770, h: 110, w: 300 },
  ];
  const types: { at: number; until: number; on: number[]; tone: ToneName; title: string; text: string }[] = [
    { at: cue(t, 1), until: cue(t, 2), on: [0], tone: 'peach', title: 'Comida casi entera, sin ácido', text: 'Viene del esófago: nunca llegó al estómago.' },
    { at: cue(t, 2), until: cue(t, 3), on: [1], tone: 'lilac', title: 'Ácido, parcialmente digerido', text: 'Viene del estómago.' },
    { at: cue(t, 3), until: cue(t, 4), on: [2], tone: 'mint', title: 'Bilioso: amarillo-verde, amargo', text: 'Refluyó contenido duodenal. El síndrome pilórico NO da vómitos biliosos.' },
    { at: cue(t, 4), until: cue(t, 5), on: [0, 1, 2], tone: 'rose', title: 'Rojo / borra de café', text: 'Rojo: sangrado activo. Borra de café: sangre ya digerida.' },
    { at: cue(t, 5), until: 1e9, on: [3, 4], tone: 'peach', title: 'Fecaloide', text: 'Obstrucción intestinal baja.' },
  ];
  const active = types.find((x) => f >= x.at && f < x.until);
  return (
    <>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        {segs.map((s, i) => {
          const on = active?.on.includes(i);
          const tone = active ? C[active.tone] : null;
          return (
            <g key={s.n}>
              <rect x={330 - s.w / 2} y={s.y} width={s.w} height={s.h} rx={Math.min(40, s.w / 2)} fill={on && tone ? tone.fill : C.track} stroke={on && tone ? tone.ink : C.tube} strokeWidth={on ? 6 : 3} />
              <text x={330 + s.w / 2 + 20} y={s.y + s.h / 2 + 10} fontSize={28} fontWeight={on ? 800 : 500} fill={on && tone ? tone.ink : C.ink3} fontFamily="Inter Variable, sans-serif">
                {s.n}
              </text>
            </g>
          );
        })}
      </svg>
      {types.map((x) => (
        <Show key={x.title} a={x.at} b={x.until} style={{ left: 760, top: 260, width: 1050 }}>
          <Card tone={x.tone} title={x.title}>
            {x.text}
          </Card>
        </Show>
      ))}
      <div style={{ position: 'absolute', left: 760, top: 620, width: 1050, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {[
          ['Mañana en ayunas', 'Embarazo · alcohol · HTE', 'peach'],
          ['≈ 1 h después de comer', 'Estómago', 'lilac'],
          ['Varias horas después', 'Píloro', 'sky'],
        ].map(([a, b, tone], i) => (
          <div key={a} style={{ opacity: ease(f, spread(t, 6, 3, i), spread(t, 6, 3, i) + 14) }}>
            <Card tone={tone as ToneName} style={{ padding: '18px 22px', fontSize: 26 }}>
              <div style={{ fontWeight: 800, color: C[tone as ToneName].ink, fontSize: 22, textTransform: 'uppercase', letterSpacing: 1 }}>{a}</div>
              <div style={{ fontFamily: DISPLAY, fontSize: 34, fontWeight: 650, color: C.ink, marginTop: 6 }}>{b}</div>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};


/* ───────── Hematemesis vs hemoptisis ───────── */
const HematHemop: FC<SceneProps> = ({ t }) => {
  const rows: [string, string, string, number][] = [
    ['Sale con', 'el vómito (náuseas)', 'la tos', 2],
    ['Aspecto', 'oscura, borra de café', 'roja rutilante, espumosa', 3],
    ['Por qué', 'hematina ácida', 'mezclada con aire', 4],
    ['Reacción', 'ácida', 'alcalina', 5],
    ['Después', 'melena', 'sin melena', 6],
  ];
  return (
    <>
      <Appear at={cue(t, 1)} style={{ left: 110, top: 240 }}>
        <Chip tone="peach">★ «Pregunta de parcial… ese cuadrito tienen que sabérselo»</Chip>
      </Appear>
      <div style={{ position: 'absolute', left: 110, top: 340, width: 1700, display: 'grid', gridTemplateColumns: '300px 1fr 1fr', gap: 16 }}>
        <div />
        <Appear at={cue(t, 0)} style={{ position: 'relative' }}><Card tone="peach" title="Hematemesis" style={{ padding: '16px 26px' }} /></Appear>
        <Appear at={cue(t, 0, 20)} style={{ position: 'relative' }}><Card tone="rose" title="Hemoptisis" style={{ padding: '16px 26px' }} /></Appear>
        {rows.map(([k, a, b, c]) => (
          <div key={k} style={{ display: 'contents' }}>
            <Appear at={cue(t, c)} style={{ position: 'relative', fontSize: 30, fontWeight: 800, color: C.ink3, alignSelf: 'center' }}>{k}</Appear>
            <Appear at={cue(t, c)} style={{ position: 'relative', fontSize: 34, fontWeight: 650, color: C.peach.ink }}>{a}</Appear>
            <Appear at={cue(t, c, 15)} style={{ position: 'relative', fontSize: 34, fontWeight: 650, color: C.rose.ink }}>{b}</Appear>
          </div>
        ))}
      </div>
    </>
  );
};

/* ───────── 12. Complicaciones ───────── */
const Wall: FC<{ variant: 'normal' | 'mw' | 'boer'; size: number }> = ({ variant, size }) => (
  <svg viewBox="0 0 160 160" width={size} height={size}>
    <circle cx={80} cy={80} r={62} fill={C.peach.fill} stroke={C.peach.stroke} strokeWidth={2} />
    <circle cx={80} cy={80} r={44} fill={C.rose.fill} stroke={C.rose.stroke} strokeWidth={1.5} />
    <circle cx={80} cy={80} r={32} fill={C.rose.fill} stroke={C.rose.ink} strokeWidth={1.5} />
    <circle cx={80} cy={80} r={16} fill={C.card} stroke={C.tube} />
    {variant === 'mw' && <path d="M80,64 L74,48 L86,48 Z" fill={C.red} />}
    {variant === 'boer' && <path d="M77,64 L74,10 L86,10 L83,64 Z" fill={C.red} />}
  </svg>
);

const Complicaciones: FC<SceneProps> = ({ t }) => {
  const f = useCurrentFrame();
  const c1 = cue(t, 1);
  const parts: [string, string, number][] = [
    ['H⁺ Cl⁻', C.sky.ink, 0],
    ['H₂O', C.sky.stroke, 20],
    ['K⁺', C.lilac.ink, 40],
  ];
  return (
    <>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <path d="M210,300 C200,270 230,255 262,262 C320,276 360,330 362,390 C364,460 320,520 260,530 C210,538 170,520 150,500 L140,470 C170,480 200,478 225,468 C262,452 270,410 262,370 C256,340 240,318 228,302 Z" fill={C.lilac.fill} stroke={C.lilac.stroke} strokeWidth={4} opacity={ease(f, 0, 20)} />
        {parts.map(([label, color, d]) => {
          const p = ease(f, c1 + d, c1 + d + 60);
          return (
            <g key={label} opacity={f > c1 + d ? 1 - 0.3 * ease(f, c1 + d + 60, c1 + d + 120) : 0}>
              <text x={380 + 90 * p} y={330 + d * 3} fontSize={40} fontWeight={800} fill={color} fontFamily="Inter Variable, sans-serif">
                {label}
              </text>
            </g>
          );
        })}
      </svg>
      {[
        { at: cue(t, 2), tone: 'sky' as ToneName, title: 'Alcalosis metabólica', text: 'Se pierde H⁺: sube el bicarbonato.' },
        { at: cue(t, 2, 45), tone: 'lilac' as ToneName, title: 'Hipopotasemia', text: 'Aldosterona ↑: el riñón elimina K⁺.' },
        { at: cue(t, 2, 90), tone: 'peach' as ToneName, title: 'Deshidratación', text: 'Taquicardia, hipotensión.' },
      ].map((c, i) => (
        <Appear key={c.title} at={c.at} style={{ left: 620 + i * 400, top: 250, width: 380 }}>
          <Card tone={c.tone} title={c.title} style={{ padding: '18px 24px', fontSize: 26 }}>
            {c.text}
          </Card>
        </Appear>
      ))}
      <Appear at={cue(t, 3)} style={{ left: 620, top: 470, width: 1180 }}>
        <Card tone="rose" title="Aspiración del vómito" style={{ padding: '16px 24px', fontSize: 26 }}>
          Neumonitis química → neumonía aspirativa
        </Card>
      </Appear>
      {[
        { at: cue(t, 4), x: 110, w: 480, v: 'normal' as const, title: 'Pared normal', text: 'mucosa · submucosa · muscular' },
        { at: cue(t, 5), x: 640, w: 620, v: 'mw' as const, title: 'Mallory-Weiss', text: 'desgarro lineal de la mucosa esofagogástrica' },
        { at: cue(t, 6), x: 1300, w: 520, v: 'boer' as const, title: 'Boerhaave', text: 'rotura de todo el espesor → emergencia' },
      ].map((w) => (
        <Appear key={w.title} at={w.at} style={{ left: w.x, top: 650, width: w.w, display: 'flex', gap: 18, alignItems: 'center' }}>
          <Wall variant={w.v} size={180} />
          <div>
            <div style={{ fontFamily: DISPLAY, fontSize: 36, fontWeight: 650, color: w.v === 'normal' ? C.ink : C.red }}>{w.title}</div>
            <div style={{ fontSize: 25, color: C.ink2 }}>{w.text}</div>
          </div>
        </Appear>
      ))}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 900, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18 }}>
        <Appear at={cue(t, 5, 20)} style={{ position: 'relative', fontSize: 28, fontWeight: 800, color: C.rose.ink }}>
          Tríada (y cronología):
        </Appear>
        {['Alcoholismo', 'Vómitos', 'Hematemesis'].map((x, i) => (
          <Appear key={x} at={cue(t, 5, 110 + i * 40)} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 18 }}>
            {i > 0 && <span style={{ fontSize: 40, color: C.ink3 }}>→</span>}
            <Chip big tone="rose">{x}</Chip>
          </Appear>
        ))}
      </div>
    </>
  );
};

/* ───────── Cierre ───────── */
const Cierre: FC<SceneProps> = ({ t }) => {
  const items: { at: number; tone: ToneName; title: string; text: string }[] = [
    { at: cue(t, 1), tone: 'peach', title: 'Hematemesis vs hemoptisis', text: 'vómito/tos · borra de café/rutilante · ácida/alcalina · melena' },
    { at: cue(t, 2), tone: 'sky', title: 'Tipos de vómito', text: 'alimentario · ácido · bilioso · hemático · fecaloide + horario' },
    { at: cue(t, 3), tone: 'rose', title: 'Mallory-Weiss', text: 'alcoholismo → vómitos → hematemesis' },
    { at: cue(t, 4), tone: 'lilac', title: 'Acalasia', text: 'sólidos y líquidos · lenta y progresiva · regurgitación' },
  ];
  return (
    <>
      <div style={{ position: 'absolute', left: 210, top: 300, width: 1500, display: 'grid', gap: 20 }}>
        {items.map((x) => (
          <Appear key={x.title} at={x.at} dx={-30} dy={0} style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 28, background: C.card, borderLeft: `10px solid ${C[x.tone].ink}`, borderRadius: 20, padding: '20px 30px' }}>
              <span style={{ fontFamily: DISPLAY, fontSize: 38, fontWeight: 650, color: C[x.tone].ink, whiteSpace: 'nowrap' }}>{x.title}</span>
              <span style={{ fontSize: 28, color: C.ink2 }}>{x.text}</span>
            </div>
          </Appear>
        ))}
      </div>
      <Appear at={cue(t, 5)} style={{ left: 0, right: 0, top: 820, display: 'flex', justifyContent: 'center', gap: 20 }}>
        <Chip tone="peach">★ Preguntas de examen</Chip>
        <Chip tone="lilac">Choice</Chip>
        <Chip tone="sky">Memoria activa</Chip>
      </Appear>
    </>
  );
};

export const deck: Deck = {
  chapterId: 'dig-01',
  chapterTitle: 'Disfagia, dispepsia, náuseas y vómitos',
  timing,
  scenes: {
    intro: Intro,
    donde: Donde,
    'muro-motor': MuroMotor,
    acalasia: Acalasia,
    dispepsia: Dispepsia,
    alarma: Alarma,
    contenido: Contenido,
    'hemat-hemop': HematHemop,
    complicaciones: Complicaciones,
    cierre: Cierre,
  },
};

export default deck;
