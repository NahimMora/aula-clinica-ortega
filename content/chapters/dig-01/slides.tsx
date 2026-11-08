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
  const stations = ['Boca', 'Faringe', 'Esófago', 'Estómago', 'Duodeno'];
  const tones: ToneName[] = ['peach', 'peach', 'sky', 'lilac', 'lilac'];
  const draw = ease(f, cue(t, 3), cue(t, 3) + 150);
  return (
    <>
      {(['Disfagia', 'Dispepsia', 'Náuseas y vómitos'] as const).map((w, i) => (
        <Appear key={w} at={cue(t, 0) + i * 22} style={{ left: 110, top: 270 + i * 110 }}>
          <Chip big tone={(['rose', 'lilac', 'sky'] as ToneName[])[i]}>{w}</Chip>
        </Appear>
      ))}
      <Appear at={cue(t, 1)} style={{ left: 110, top: 640 }}>
        <Chip tone="peach">★ Una de las unidades más preguntadas</Chip>
      </Appear>
      <Appear at={cue(t, 2, 40)} style={{ left: 110, top: 750, fontFamily: DISPLAY, fontSize: 52, fontWeight: 600, color: C.ink }}>
        ¿Dónde está el problema?
      </Appear>
      <Appear at={cue(t, 2, 110)} style={{ left: 110, top: 830, fontFamily: DISPLAY, fontSize: 52, fontWeight: 600, color: C.lilac.ink }}>
        ¿Qué mecanismo lo produce?
      </Appear>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <line x1={1380} y1={300} x2={1380} y2={300 + 560 * draw} stroke={C.lilac.stroke} strokeWidth={14} strokeLinecap="round" />
        {stations.map((s, i) => {
          const p = ease(f, spread(t, 3, 5, i), spread(t, 3, 5, i) + 14);
          const y = 300 + i * 140;
          return (
            <g key={s} opacity={p}>
              <circle cx={1380} cy={y} r={26} fill={C.card} stroke={C[tones[i]].ink} strokeWidth={7} />
              <text x={1430} y={y + 13} fontSize={40} fontWeight={700} fill={C.ink} fontFamily="Inter Variable, sans-serif">
                {s}
              </text>
            </g>
          );
        })}
      </svg>
    </>
  );
};

/* ───────── 2. Cómo tragamos ───────── */
const Deglucion: FC<SceneProps> = ({ t }) => {
  const f = useCurrentFrame();
  const c1 = cue(t, 1);
  const c3 = cue(t, 3);
  const c4 = cue(t, 4);
  const c5 = cue(t, 5);
  const c6 = cue(t, 6);
  const keys: [number, number, number][] = [
    [0, 110, 138],
    [c1 + 60, 110, 138],
    [c1 + 140, 205, 140],
    [c3 + 30, 205, 140],
    [c3 + 70, 253, 196],
    [c3 + 110, 279, 300],
    [c4 + 20, 279, 300],
    [c4 + 200, 284, 610],
    [c4 + 240, 305, 690],
  ];
  let bx = keys[0][1];
  let by = keys[0][2];
  for (let i = 1; i < keys.length; i++) {
    if (f >= keys[i - 1][0]) {
      const p = ease(f, keys[i - 1][0], keys[i][0]);
      bx = keys[i - 1][1] + (keys[i][1] - keys[i - 1][1]) * p;
      by = keys[i - 1][2] + (keys[i][2] - keys[i - 1][2]) * p;
    }
  }
  const swallow = ease(f, c3 + 20, c3 + 40) * (1 - ease(f, c4 + 10, c4 + 30));
  const velum = 52 - 74 * swallow;
  const epi = -78 + 96 * swallow;
  const ees = ease(f, c3 + 40, c3 + 60) * (1 - ease(f, c4 + 40, c4 + 60));
  const eei = ease(f, c4 + 170, c4 + 190) * (1 - ease(f, c4 + 250, c4 + 270));
  const waveY = 300 + 310 * ease(f, c4 + 20, c4 + 200);
  const waveOn = f > c4 + 20 && f < c4 + 205;
  const paths = ['M60,140 L238,140', 'M238,140 L262,58', 'M246,140 L258,238', 'M242,238 L232,420', 'M274,238 L284,640'];
  return (
    <>
      <svg viewBox="0 0 460 760" style={{ position: 'absolute', left: 150, top: 240, width: 484, height: 800 }}>
        {paths.map((d) => (
          <path key={d} d={d} stroke={C.tube} strokeWidth={34} strokeLinecap="round" fill="none" />
        ))}
        {paths.map((d) => (
          <path key={'i' + d} d={d} stroke={C.tubeIn} strokeWidth={27} strokeLinecap="round" fill="none" />
        ))}
        <ellipse cx={305} cy={695} rx={78} ry={52} fill={C.lilac.fill} stroke={C.lilac.stroke} strokeWidth={3} />
        <text x={305} y={745} textAnchor="middle" fontSize={18} fill={C.lilac.ink} fontWeight={700}>
          estómago
        </text>
        <path d="M72,158 Q150,124 228,158 Z" fill={C.rose.fill} stroke={C.rose.stroke} strokeWidth={1.5} transform={`translate(0 ${f > c1 && f < c1 + 150 ? -6 : 0})`} />
        <line x1={226} y1={124} x2={258} y2={124} stroke={C.rose.ink} strokeWidth={6} strokeLinecap="round" transform={`rotate(${velum} 226 124)`} />
        <line x1={232} y1={232} x2={260} y2={232} stroke={C.lilac.ink} strokeWidth={6} strokeLinecap="round" transform={`rotate(${epi} 232 232)`} />
        <line x1={268 - 7 * ees} y1={258} x2={268 - 7 * ees} y2={272} stroke={C.sky.ink} strokeWidth={5} strokeLinecap="round" />
        <line x1={288 + 7 * ees} y1={258} x2={288 + 7 * ees} y2={272} stroke={C.sky.ink} strokeWidth={5} strokeLinecap="round" />
        <line x1={276 - 7 * eei} y1={628} x2={276 - 7 * eei} y2={642} stroke={C.sky.ink} strokeWidth={5} strokeLinecap="round" />
        <line x1={296 + 7 * eei} y1={628} x2={296 + 7 * eei} y2={642} stroke={C.sky.ink} strokeWidth={5} strokeLinecap="round" />
        {waveOn && (
          <g opacity={0.9}>
            <line x1={262} y1={waveY - 30} x2={270} y2={waveY - 30} stroke={C.sky.stroke} strokeWidth={6} strokeLinecap="round" />
            <line x1={292} y1={waveY - 30} x2={300} y2={waveY - 30} stroke={C.sky.stroke} strokeWidth={6} strokeLinecap="round" />
          </g>
        )}
        <circle cx={bx} cy={by} r={12} fill={C.rose.ink} opacity={f < c5 ? 1 : 0.25} />
        <g opacity={ease(f, c5, c5 + 20) * (1 - ease(f, c6 - 10, c6))}>
          <circle cx={262 - 10 * ease(f, c5, c5 + 60)} cy={110 - 40 * ease(f, c5, c5 + 60)} r={11} fill={C.red} />
          <circle cx={238} cy={260 + 110 * ease(f, c5, c5 + 60)} r={11} fill={C.red} />
          <text x={300} y={70} fontSize={20} fontWeight={700} fill={C.red}>
            → nariz
          </text>
          <text x={110} y={400} fontSize={20} fontWeight={700} fill={C.red}>
            vía aérea →
          </text>
        </g>
        <g opacity={ease(f, c6, c6 + 20)}>
          <circle cx={281} cy={450} r={12} fill={C.red} />
          <circle cx={281} cy={450} r={22 + 6 * Math.sin(f / 5)} fill="none" stroke={C.red} strokeWidth={3} />
          <text x={318} y={456} fontSize={20} fontWeight={700} fill={C.red}>
            detrás del esternón
          </text>
        </g>
        <text x={120} y={185} fontSize={18} fontWeight={700} fill={C.ink}>
          cavidad oral
        </text>
        <text x={312} y={276} fontSize={17} fontWeight={700} fill={C.sky.ink}>
          EES
        </text>
        <text x={312} y={646} fontSize={17} fontWeight={700} fill={C.sky.ink}>
          EEI
        </text>
      </svg>
      <Appear at={c1} style={{ left: 760, top: 250, width: 1040 }}>
        <Card tone="peach" tag="Voluntaria" title="1 · Fase oral" style={{ padding: '20px 28px' }}>
          Masticación y lengua: se forma el bolo y se empuja hacia atrás.
        </Card>
      </Appear>
      <Appear at={c3} style={{ left: 760, top: 470, width: 1040 }}>
        <Card tone="rose" tag="Involuntaria · ~1 segundo" title="2 · Fase faríngea" style={{ padding: '20px 28px' }}>
          El velo cierra la nariz, la epiglotis tapa la vía aérea y se abre el EES.
        </Card>
      </Appear>
      <Appear at={c4} style={{ left: 760, top: 690, width: 1040 }}>
        <Card tone="sky" tag="Involuntaria · vagal" title="3 · Fase esofágica" style={{ padding: '20px 28px' }}>
          Onda peristáltica hasta el estómago; el EEI se relaja para dejar pasar el bolo.
        </Card>
      </Appear>
      <Appear at={cue(t, 2)} style={{ left: 760, top: 910 }}>
        <Chip tone="lilac">Sistema autónomo · sobre todo parasimpático</Chip>
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

/* ───────── 4. Causas de la disfagia orofaríngea ───────── */
const CausasOro: FC<SceneProps> = ({ t }) => {
  const f = useCurrentFrame();
  const w = 0.75 * ease(f, cue(t, 0, 10), cue(t, 0, 60));
  const rest = ease(f, cue(t, 3), cue(t, 3) + 30);
  const chips = ['Parkinson', 'Esclerosis múltiple', 'ELA', 'Miastenia gravis', 'Miopatías'];
  return (
    <>
      <div style={{ position: 'absolute', left: 110, top: 270, width: 1700, height: 96, borderRadius: 48, background: C.track, overflow: 'hidden' }}>
        <div style={{ width: `${w * 100}%`, height: '100%', background: `linear-gradient(90deg, ${C.rose.stroke}, ${C.lilac.stroke})`, display: 'flex', alignItems: 'center', paddingLeft: 34, color: C.card, fontSize: 36, fontWeight: 800, whiteSpace: 'nowrap' }}>
          ≈ 75 % neuromusculares
        </div>
        <div style={{ position: 'absolute', right: 30, top: 26, fontSize: 30, fontWeight: 700, color: C.ink2, opacity: rest }}>≈ 25 % otras</div>
      </div>
      <Appear at={cue(t, 1)} style={{ left: 110, top: 430, width: 820 }}>
        <Card tone="rose" tag="Causa número uno" title="Accidente cerebrovascular" highlight>
          Lesiona los pares craneales que intervienen en la deglución.
        </Card>
      </Appear>
      <div style={{ position: 'absolute', left: 110, top: 720, width: 840, display: 'flex', flexWrap: 'wrap', gap: 18 }}>
        {chips.map((c, i) => (
          <div key={c} style={{ opacity: ease(f, spread(t, 2, 5, i), spread(t, 2, 5, i) + 14) }}>
            <Chip tone="lilac">{c}</Chip>
          </div>
        ))}
      </div>
      <Appear at={cue(t, 3)} style={{ left: 1010, top: 430, width: 800 }}>
        <Card tone="peach" title="El 25 % restante">
          <Bullets
            size={30}
            items={[
              { at: cue(t, 3, 10), text: <><b>Motores locales:</b> acalasia cricofaríngea</> },
              { at: cue(t, 3, 60), text: <><b>Estructurales:</b> tumores, radiación, cirugías, divertículos</> },
            ]}
          />
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

/* ───────── 8. Orgánica o funcional ───────── */
const Funcional: FC<SceneProps> = ({ t }) => {
  const f = useCurrentFrame();
  const r = 150;
  const circ = 2 * Math.PI * r;
  const a = 0.6 * ease(f, cue(t, 0), cue(t, 0) + 60);
  const b = 0.4 * ease(f, cue(t, 1), cue(t, 1) + 40);
  return (
    <>
      <svg width={460} height={460} style={{ position: 'absolute', left: 130, top: 290 }}>
        <circle cx={230} cy={230} r={r} fill="none" stroke={C.track} strokeWidth={70} />
        <circle cx={230} cy={230} r={r} fill="none" stroke={C.lilac.stroke} strokeWidth={70} strokeDasharray={`${circ * a} ${circ}`} transform="rotate(-90 230 230)" />
        <circle cx={230} cy={230} r={r} fill="none" stroke={C.rose.stroke} strokeWidth={70} strokeDasharray={`${circ * b} ${circ}`} strokeDashoffset={-circ * 0.6} transform="rotate(-90 230 230)" />
        <text x={230} y={225} textAnchor="middle" fontSize={56} fontWeight={800} fill={C.lilac.ink} fontFamily="Inter Variable, sans-serif">
          6 de 10
        </text>
        <text x={230} y={268} textAnchor="middle" fontSize={26} fill={C.ink2} fontFamily="Inter Variable, sans-serif">
          funcionales
        </text>
      </svg>
      <Appear at={cue(t, 0, 30)} style={{ left: 130, top: 790 }}>
        <Chip tone="lilac">Funcional · por exclusión</Chip>
      </Appear>
      <Appear at={cue(t, 1)} style={{ left: 130, top: 880 }}>
        <Chip tone="rose">Orgánica · 4 de 10</Chip>
      </Appear>
      <Appear at={cue(t, 2)} style={{ left: 700, top: 250, width: 1100 }}>
        <Card tone="rose" title="Dispepsia orgánica">
          <Bullets
            items={[
              { at: cue(t, 2, 10), text: <><b>Úlcera péptica</b> (n.º 1)</> },
              { at: cue(t, 2, 80), text: 'Reflujo gastroesofágico · cáncer gástrico' },
              { at: cue(t, 2, 170), text: 'AINEs y algunos antibióticos' },
            ]}
          />
        </Card>
      </Appear>
      <Appear at={cue(t, 4)} style={{ left: 700, top: 620, width: 520 }}>
        <Card tone="peach" title="Estrés · SNC" style={{ padding: '20px 26px' }}>
          Altera el eje cerebro–estómago
        </Card>
      </Appear>
      <div style={{ position: 'absolute', left: 1260, top: 620, display: 'grid', gap: 16 }}>
        {['Fundus que no se relaja', 'Vaciamiento lento', 'Mucosa hipersensible'].map((m, i) => (
          <div key={m} style={{ opacity: ease(f, spread(t, 4, 3, i), spread(t, 4, 3, i) + 14) }}>
            <Chip tone="lilac">→ {m}</Chip>
          </div>
        ))}
      </div>
      <Appear at={cue(t, 5)} style={{ left: 1260, top: 900 }}>
        <Chip tone="rose">Plenitud · saciedad precoz · dolor</Chip>
      </Appear>
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

/* ───────── 10. El reflejo del vómito ───────── */
const Reflejo: FC<SceneProps> = ({ t }) => {
  const f = useCurrentFrame();
  const inputs: [string, string, ToneName][] = [
    ['Tubo digestivo y peritoneo', 'distensión, obstrucción, inflamación', 'rose'],
    ['Zona gatillo (área postrema)', 'fármacos, toxinas, uremia, embarazo', 'lilac'],
    ['Aparato vestibular', 'cinetosis, Ménière', 'sky'],
    ['Corteza', 'olores, dolor, ansiedad', 'mint'],
    ['Presión intracraneal ↑', 'hipertensión endocraneana', 'peach'],
  ];
  const outs = ['Náusea', 'Arcadas', 'Vómito'];
  const hte = ease(f, cue(t, 4), cue(t, 4) + 20);
  return (
    <>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        {inputs.map((inp, i) => {
          const at = spread(t, 1, 5, i);
          const y = 300 + i * 150;
          const d = `M640,${y} C720,${y} 700,620 790,620`;
          const p = ease(f, at, at + 25);
          const k = ((f - at) % 50) / 50;
          return (
            <g key={inp[0]} opacity={p}>
              <path d={d} fill="none" stroke={C[inp[2]].stroke} strokeWidth={5} strokeDasharray={i === 4 ? '12 10' : undefined} />
              {f > at + 25 && <circle cx={640 + 150 * k} cy={y + (620 - y) * k * k} r={9} fill={C[inp[2]].ink} />}
            </g>
          );
        })}
        <g opacity={ease(f, cue(t, 0), cue(t, 0) + 20)}>
          <ellipse cx={960} cy={620} rx={175} ry={95} fill={C.strong} />
          <text x={960} y={610} textAnchor="middle" fontSize={36} fontWeight={800} fill={C.onStrong} fontFamily="Inter Variable, sans-serif">
            Centro del vómito
          </text>
          <text x={960} y={652} textAnchor="middle" fontSize={26} fill={C.onStrong} fontFamily="Inter Variable, sans-serif">
            bulbo raquídeo
          </text>
        </g>
        {outs.map((o, i) => {
          const at = spread(t, 2, 3, i);
          const y = 360 + i * 220;
          return (
            <g key={o} opacity={ease(f, at, at + 14)}>
              <path d={`M1135,620 C1220,620 1200,${y} 1290,${y}`} fill="none" stroke={C.ink3} strokeWidth={4} />
            </g>
          );
        })}
        <g opacity={hte}>
          <path d="M640,900 C900,1010 1150,1000 1290,800" fill="none" stroke={C.red} strokeWidth={6} strokeDasharray="14 10" />
          <text x={820} y={1030} fontSize={28} fontWeight={800} fill={C.red} fontFamily="Inter Variable, sans-serif">
            vómito en chorro, sin náuseas
          </text>
        </g>
      </svg>
      {inputs.map((inp, i) => (
        <Appear key={inp[0]} at={spread(t, 1, 5, i)} style={{ left: 110, top: 245 + i * 150, width: 530 }}>
          <div style={{ background: C[inp[2]].fill, border: `3px solid ${i === 4 && hte > 0 ? C.red : C[inp[2]].stroke}`, borderRadius: 22, padding: '12px 20px' }}>
            <div style={{ fontWeight: 800, fontSize: 28, color: C[inp[2]].ink }}>{inp[0]}</div>
            <div style={{ fontSize: 23, color: C.ink2 }}>{inp[1]}</div>
          </div>
        </Appear>
      ))}
      {outs.map((o, i) => (
        <Appear key={o} at={spread(t, 2, 3, i)} style={{ left: 1300, top: 320 + i * 220, width: 440 }}>
          <div style={{ background: C.card, border: `3px solid ${C.line}`, borderRadius: 22, padding: '18px 26px', fontFamily: DISPLAY, fontSize: 42, fontWeight: 650 }}>
            {i + 1}. {o}
          </div>
        </Appear>
      ))}
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
        { at: cue(t, 2), x: 660, y: 250, tone: 'sky' as ToneName, title: 'Alcalosis metabólica', text: 'Sin ácido que neutralizar, sube el bicarbonato.' },
        { at: cue(t, 3), x: 1240, y: 250, tone: 'lilac' as ToneName, title: 'Hipopotasemia', text: 'Aldosterona ↑: el riñón elimina K⁺ (pérdida principal).' },
        { at: cue(t, 4), x: 660, y: 500, tone: 'peach' as ToneName, title: 'Deshidratación', text: 'Taquicardia, hipotensión.' },
        { at: cue(t, 5), x: 1240, y: 500, tone: 'rose' as ToneName, title: 'Aspiración', text: 'Neumonitis química → neumonía aspirativa.' },
      ].map((c) => (
        <Appear key={c.title} at={c.at} style={{ left: c.x, top: c.y, width: 560 }}>
          <Card tone={c.tone} title={c.title} style={{ padding: '18px 26px', fontSize: 27 }}>
            {c.text}
          </Card>
        </Appear>
      ))}
      {[
        { at: cue(t, 6), x: 110, v: 'normal' as const, title: 'Pared normal', text: 'mucosa · submucosa · muscular' },
        { at: cue(t, 7), x: 690, v: 'mw' as const, title: 'Mallory-Weiss', text: 'desgarro de la mucosa → hematemesis' },
        { at: cue(t, 8), x: 1270, v: 'boer' as const, title: 'Boerhaave', text: 'rotura de todo el espesor → emergencia' },
      ].map((w) => (
        <Appear key={w.title} at={w.at} style={{ left: w.x, top: 770, width: 560, display: 'flex', gap: 20, alignItems: 'center' }}>
          <Wall variant={w.v} size={200} />
          <div>
            <div style={{ fontFamily: DISPLAY, fontSize: 36, fontWeight: 650 }}>{w.title}</div>
            <div style={{ fontSize: 26, color: C.ink2 }}>{w.text}</div>
          </div>
        </Appear>
      ))}
    </>
  );
};

/* ───────── 13. Cierre ───────── */
const Cierre: FC<SceneProps> = ({ t }) => (
  <>
    {[
      { at: cue(t, 1), tone: 'rose' as ToneName, title: 'Disfagia', items: ['¿Dónde se traba?', '¿Con qué alimentos?', '¿Cómo evoluciona?'] },
      { at: cue(t, 2), tone: 'lilac' as ToneName, title: 'Dispepsia', items: ['Criterios de Roma', '¿Orgánica o funcional?', 'Alarma → endoscopía'] },
      { at: cue(t, 3), tone: 'sky' as ToneName, title: 'Vómito', items: ['¿Qué contiene?', '¿Cuándo aparece?', '¿Qué complicaciones?'] },
    ].map((c, i) => (
      <Appear key={c.title} at={c.at} style={{ left: 110 + i * 580, top: 260, width: 540 }}>
        <Card tone={c.tone} title={c.title}>
          <Bullets items={c.items.map((x, k) => ({ at: c.at + 10 + k * 25, text: x }))} />
        </Card>
      </Appear>
    ))}
    <Appear at={cue(t, 4)} style={{ left: 110, top: 690, width: 1700, textAlign: 'center', fontFamily: DISPLAY, fontSize: 56, fontWeight: 600 }}>
      El interrogatorio ya te dice dónde está el problema.
    </Appear>
    <Appear at={cue(t, 5)} style={{ left: 560, top: 840, display: 'flex', gap: 20 }}>
      <Chip tone="rose">Choice</Chip>
      <Chip tone="lilac">Desarrollos</Chip>
      <Chip tone="sky">Memoria activa</Chip>
    </Appear>
  </>
);

export const deck: Deck = {
  chapterId: 'dig-01',
  chapterTitle: 'Disfagia, dispepsia, náuseas y vómitos',
  timing,
  scenes: {
    intro: Intro,
    deglucion: Deglucion,
    donde: Donde,
    'causas-oro': CausasOro,
    'muro-motor': MuroMotor,
    acalasia: Acalasia,
    dispepsia: Dispepsia,
    funcional: Funcional,
    alarma: Alarma,
    reflejo: Reflejo,
    contenido: Contenido,
    'hemat-hemop': HematHemop,
    complicaciones: Complicaciones,
    cierre: Cierre,
  },
};

export default deck;
