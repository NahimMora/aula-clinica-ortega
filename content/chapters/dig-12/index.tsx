import type { Chapter, SourceRef } from '@/types';
import { escenas } from './escenas';

/*
 * dig-12 — Hemorragias digestivas. Fuente: clases Hemorragias digestivas 1 y 2 (Ortega) + libro p. 389–390 (cuadro de clases, %).
 * Preguntero: «Peritonitis, hemorragias digestivas y vesiculares», P4–P11.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const H1 = (t: string) => r('hd-1', t);
const H2 = (t: string) => r('hd-2', t);
const L = (p: string) => r('libro', undefined, p);

const chapter: Chapter = {
  id: 'dig-12',
  systemId: 'digestivo',
  title: 'Hemorragias digestivas',
  subtitle: 'Cuánto perdió (clases I a IV), de dónde viene (alta o baja), por qué sangra y cómo se estudia.',
  estimatedMinutes: 40,
  sources: [H1('00:01–31:50'), H2('00:00–11:55'), L('389–390')],

  map: {
    center: 'Hemorragias digestivas',
    why: '«Hemorragia digestiva, cirrosis e hipertensión portal y pancreatitis aguda: **muy preguntados** en el parcial y en el final, en el choice y en el oral.» Lo que marca: el **cuadro de clases por signos vitales** («como el Padre Nuestro»), la **causa más frecuente** de alta y de baja, y la **prueba de ortostatismo**.',
    prereqs: [
      { label: 'Úlcera péptica (dig-07)', detail: 'La causa n.º 1 de hemorragia alta.', chapterId: 'dig-07' },
      { label: 'Hematemesis vs hemoptisis (dig-01)', detail: 'El cuadro que piden en el parcial.', chapterId: 'dig-01' },
    ],
    branches: [
      { id: 'clases', label: 'Cuánto perdió ★', tone: 'red', items: ['Clases I a IV', 'Ortostatismo ★', 'Anemia ferropénica'] },
      { id: 'formas', label: 'Cómo se ve', tone: 'lilac', items: ['Hematemesis', 'Melena vs hematoquecia', 'Sangre oculta'] },
      { id: 'alta-baja', label: 'De dónde', tone: 'sky', items: ['Treitz', 'Alta: úlcera ★', 'Baja: hemorroides ★'] },
      { id: 'estudios', label: 'Estudios', tone: 'gold', items: ['SNG · endoscopía', 'Colonoscopía', 'Forrest'] },
    ],
    outcomes: [
      'Clasificar una hemorragia en **clase I a IV** por los signos vitales.',
      'Hacer la **prueba de ortostatismo** y saber cuándo es positiva.',
      'Diferenciar **alta** de **baja** y nombrar la causa más frecuente de cada una.',
      'Saber qué **estudio** pedir en cada caso.',
    ],
  },

  theory: [
    {
      id: 'clases',
      kicker: 'Lo que toma ★',
      title: 'Cuánto perdió: clases I a IV',
      priority: 'imprescindible',
      summary: 'Primero los signos vitales: si está inestable se estabiliza, después se busca la causa.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Como el Padre Nuestro', text: 'El cuadro de clasificación por signos vitales «tienen que sabérselo como el Padre Nuestro», y sirve para **cualquier hemorragia**, no solo la digestiva.', refs: [H1('02:05'), H1('06:56')] },
        {
          t: 'cuadro',
          title: 'Clasificación por parámetros vitales (libro p. 389)',
          cols: [
            { t: 'I · leve', tone: 'mint' },
            { t: 'II · moderada', tone: 'gold' },
            { t: 'III · grave', tone: 'peach' },
            { t: 'IV · masiva', tone: 'red' },
          ],
          rows: [
            { k: 'Pérdida', v: ['< 750 ml (< 15 %)', '750–1500 ml (15–30 %)', '1500–2000 ml (30–40 %)', '> 2000 ml (> 40 %)'] },
            { k: 'FC', v: ['< 100', '100–119', '120–139', '> 140'] },
            { k: 'PA', v: ['Normal', 'Normal o ↓', '↓ (TAS < 100)', '↓↓'] },
            { k: 'FR', v: ['14–20', '20–30', '30–39', '> 40'] },
            { k: 'Diuresis (ml/h)', v: ['> 30', '20–30', '5–20', 'Imperceptible'] },
            { k: 'Estado mental', v: ['Normal', 'Ansioso', 'Ansioso y confuso', 'Confuso'] },
          ],
          refs: [L('389'), H1('02:48')],
        },
        {
          t: 'scale',
          title: 'Qué significa cada clase',
          items: [
            { k: 'I', t: 'Leve', d: 'Casi siempre **asintomático**.', tone: 'mint' },
            { k: 'II', t: 'Moderada', d: 'Empiezan a moverse FC, PA, FR y diuresis.', tone: 'gold' },
            { k: 'III', t: 'Grave', d: 'Todo alterado: hipotensión, oliguria, confusión.', tone: 'peach' },
            { k: 'IV', t: 'Masiva', d: '**Shock hipovolémico**: perdió más de 2 litros (40 % de la volemia). Tratar ya.', tone: 'red' },
          ],
        },
        { t: 'callout', kind: 'tip', title: 'Por qué cambia cada signo', text: 'El corazón late más rápido para mantener el flujo (**taquicardia**), se respira más rápido para llevar oxígeno (**taquipnea**), el riñón retiene volumen (**oliguria**) y el cerebro mal perfundido se **confunde**. El hematocrito no sirve al principio: baja recién a las 8 h.', refs: [H1('03:29'), H1('04:12'), L('389')] },
        { t: 'callout', kind: 'note', title: 'Siempre anemia', text: '«Todo paciente con hemorragia digestiva hace anemia», y la más frecuente es la **ferropénica**: bajan glóbulos rojos, hemoglobina y hematocrito. Otras manifestaciones de hipovolemia: lipotimia, disnea, angina, shock.', refs: [H1('05:33'), H1('14:22')] },
      ],
      refs: [H1('01:23'), H1('02:05'), L('389')],
    },
    {
      id: 'ortostatismo',
      kicker: 'Lo que toma ★',
      title: 'La prueba de ortostatismo',
      priority: 'imprescindible',
      summary: 'Acostado y después de pie: si la presión cae, hay hipovolemia.',
      blocks: [
        { t: 'callout', kind: 'prof', text: '«Esto lo preguntan en el parcial: cuál de estas características tiene que tener el paciente para decir que el **ortostatismo es positivo**.»', refs: [H1('21:03')] },
        {
          t: 'timeline',
          title: 'Paso a paso',
          items: [
            { k: '1', t: 'Acostado 2–5 min', d: 'Medir **PA y FC** (y saturación).', tone: 'sky' },
            { k: '2', t: 'De pie', d: 'Volver a medir a los **3 y 5 minutos**.', tone: 'lilac' },
            { k: '3', t: 'Positiva si…', d: 'PAS cae **> 20 mmHg** · PAD cae **> 10 mmHg** · FC sube **> 30** · o mareo / lipotimia.', tone: 'red' },
          ],
        },
        { t: 'callout', kind: 'warn', text: 'Una hipotensión ortostática indica **hipovolemia** (en un paciente que sangra), pero también puede deberse a un trastorno **cardíaco**.', refs: [H1('24:25')] },
      ],
      refs: [H1('21:43'), H1('22:23'), H1('23:05'), H1('25:06')],
    },
    {
      id: 'formas',
      kicker: 'Clínica',
      title: 'Hematemesis, melena, hematoquecia y sangre oculta',
      priority: 'imprescindible',
      summary: 'La forma orienta de dónde viene.',
      blocks: [
        { t: 'anim', id: 'formas' },
        {
          t: 'organos',
          title: 'De dónde viene cada una',
          treitz: true,
          items: [
            { id: 'hem', t: 'Hematemesis', d: 'Vómito de sangre (roja o borra de café): **siempre alta**. Diferencial con hemoptisis: pregunta de parcial.', tone: 'red', organos: ['esofago', 'estomago', 'duodeno'] },
            { id: 'mel', t: 'Melena', d: 'Negra, fétida, sangre digerida: **85 % alta**; < 15 % de delgado o colon derecho con tránsito lento.', tone: 'lilac', organos: ['estomago', 'duodeno', 'ileon'] },
            { id: 'hq', t: 'Hematoquecia', d: 'Sangre roja con las heces: **85 % baja**; alta si > 1000 ml o tránsito rápido.', tone: 'rose', organos: ['colon', 'recto'] },
            { id: 'proc', t: 'Proctorragia', d: 'Sangre pura, **gotas al final** de la deposición: recto o ano (hemorroides, fisura).', tone: 'peach', organos: ['recto'] },
          ],
        },
        { t: 'callout', kind: 'clinic', title: 'Enterorragia vs proctorragia', text: '**Enterorragia**: las heces salen **bañadas** en sangre. **Proctorragia**: terminás de defecar y caen **gotitas** de sangre. Colon izquierdo: sangre más rutilante; derecho: más oscura; ciego: puede dar melena.', refs: [H2('04:27'), H2('08:32')] },
      ],
      refs: [H1('06:56'), H1('08:16'), H1('11:39'), H1('13:41'), H2('03:04'), L('389')],
    },
    {
      id: 'alta-baja',
      kicker: 'Lo que toma ★',
      title: 'Alta vs baja: causas',
      priority: 'imprescindible',
      summary: 'Alta: úlcera. Baja: hemorroides y fisuras.',
      blocks: [
        { t: 'anim', id: 'treitz' },
        {
          t: 'cuadro',
          title: 'Alta vs baja (tapalo)',
          cols: [
            { t: 'Alta', tone: 'red' },
            { t: 'Baja', tone: 'sky' },
          ],
          rows: [
            { k: 'Límite', v: ['Esfínter esofágico superior → **Treitz**', '**Treitz** → ano'] },
            { k: 'Frecuencia / gravedad', v: ['**La más frecuente y la más grave**', 'Menos frecuente, menos grave; suele estar estable'] },
            { k: 'Presentación', v: ['Hematemesis, melena', 'Hematoquecia, proctorragia, sangre oculta'] },
            { k: 'Causa n.º 1', v: ['**Úlcera péptica** (60 %)', '**Hemorroides y fisuras**'] },
            { k: 'Otras causas', v: ['Gastritis erosiva, **várices** esofágicas, **Mallory-Weiss**, esofagitis, neoplasias, malformaciones AV', 'Divertículos, angiodisplasia (colon derecho), cáncer, EII, colitis isquémica, Meckel'] },
            { k: 'Sonda nasogástrica', v: ['Hemática / borra de café', 'Limpia'] },
            { k: 'Urea', v: ['**Elevada** (sangre digerida)', 'Normal'] },
            { k: 'Estudio', v: ['**Endoscopía alta**', '**Colonoscopía**'] },
          ],
          refs: [H1('15:42'), H1('16:22'), H2('00:00'), H2('01:40'), L('390')],
        },
        {
          t: 'compare',
          title: 'Baja: la edad orienta',
          cols: [
            { title: 'Menor de 45', tone: 'mint', items: ['Hemorroides, fisuras', 'Enfermedad inflamatoria', 'Divertículo de Meckel'] },
            { title: 'Mayor de 65', tone: 'red', items: ['Angiodisplasia, divertículos', '**Cáncer** de colon', 'Antecedentes familiares → colonoscopía'] },
          ],
        },
        { t: 'callout', kind: 'key', title: 'Toda hemorragia es secundaria', text: 'Nadie sangra porque sí: la anamnesis busca la causa (AINE, aspirina, corticoides, H. pylori, alcohol, cirrosis, vómitos previos).', refs: [H1('17:02'), H1('17:43'), H1('19:03')] },
      ],
      refs: [H1('15:42'), H2('01:40'), H2('05:08')],
    },
    {
      id: 'estudios',
      kicker: 'Diagnóstico',
      title: 'Qué se pide',
      priority: 'muy-importante',
      summary: 'La conducta principal es la endoscopía (alta o baja).',
      blocks: [
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Primero', title: 'Estabilizar + SNG + tacto rectal', text: 'Signos vitales, perfusión, ortostatismo. Aspirado nasogástrico (¿hay sangre arriba?) y tacto rectal.', tone: 'red' },
            { tag: 'Conducta principal', title: 'Endoscopía', text: '**Alta** si el sangrado es alto; **colonoscopía** (completa, hasta la válvula ileocecal) si es bajo.', tone: 'gold' },
            { tag: 'Si no se encuentra', title: 'Arteriografía / angiografía', text: 'Localiza el vaso que sangra; centellograma; laparotomía en último caso.', tone: 'lilac' },
          ],
        },
        { t: 'callout', kind: 'note', title: 'Laboratorio', text: 'Hemograma, ionograma, coagulación, glucemia, **urea (aumentada)**, creatinina y **grupo y factor**. Si no se conoce el grupo y hay que transfundir de urgencia: **0 negativo**.', refs: [H1('29:49'), H1('30:30'), H1('31:10')] },
        {
          t: 'scale',
          title: 'Clasificación de Forrest (úlcera sangrante, por endoscopía)',
          items: [
            { k: 'Ia', t: 'Sangrado en chorro', d: 'Activo, arterial: máximo riesgo.', tone: 'red' },
            { k: 'Ib', t: 'Sangrado en napa', d: 'Activo, rezumante.', tone: 'rose' },
            { k: 'IIa', t: 'Vaso visible', tone: 'peach' },
            { k: 'IIb', t: 'Coágulo adherido', tone: 'gold' },
            { k: 'IIc', t: 'Base con hematina', tone: 'sky' },
            { k: 'III', t: 'Base limpia', d: 'Fibrina: mínimo riesgo.', tone: 'mint' },
          ],
          caption: 'Cuanto más bajo el número, más riesgo de resangrado. El profe aclara que **no lo toman en el parcial** (es de medicina interna), pero conviene conocerla.',
        },
      ],
      refs: [H1('25:46'), H1('26:28'), H1('27:09'), H1('28:29'), H2('09:54'), H2('10:34')],
    },
  ],

  developments: [
    {
      id: 'dig12-d01',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'clases',
      question: 'Tabla de parámetros vitales de la hemorragia digestiva según clases I a IV.',
      quote: { text: '«…este cuadrito… tienen que sabérselo como el Padre Nuestro»', refs: [H1('02:05')] },
      answer: [
        {
          t: 'table',
          head: ['', 'I leve', 'II moderada', 'III grave', 'IV masiva'],
          rows: [
            ['Pérdida', '< 750 ml (< 15 %)', '750–1500 (15–30 %)', '1500–2000 (30–40 %)', '> 2000 (> 40 %)'],
            ['FC', '< 100', '100–119', '120–139', '> 140'],
            ['PA', 'Normal', 'Normal o ↓', '↓ (TAS < 100)', '↓↓'],
            ['FR', '14–20', '20–30', '30–39', '> 40'],
            ['Diuresis', '> 30', '20–30', '5–20', 'Imperceptible'],
            ['Mental', 'Normal', 'Ansioso', 'Ansioso y confuso', 'Confuso'],
          ],
        },
      ],
      refs: [L('389'), H1('02:48')],
    },
    {
      id: 'dig12-d02',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'alta-baja',
      question: 'Defina hemorragia digestiva alta y mencione al menos cinco etiologías.',
      quote: { text: '«¿Cuál es la causa más frecuente de hemorragia digestiva alta? Tiene que decir úlceras»', refs: [H1('16:22')] },
      answer: [
        { t: 'p', text: 'Sangrado desde el esfínter esofágico superior hasta el **ángulo de Treitz** (esófago, estómago, duodeno). Es la **más frecuente y la más grave**. Se manifiesta con hematemesis y melena.' },
        { t: 'p', text: '**Etiologías:** **úlcera péptica** (60 %), gastritis erosiva (8 %), várices esofágicas (6 %), Mallory-Weiss (4 %), esofagitis, neoplasias (2 %), malformaciones arteriovenosas.' },
      ],
      refs: [H1('15:42'), H1('16:22'), L('390')],
    },
    {
      id: 'dig12-d03',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'ortostatismo',
      question: '¿Cómo se realiza la prueba de hipotensión ortostática?',
      quote: { text: '«…esto lo preguntan en el parcial»', refs: [H1('21:03')] },
      answer: [{ t: 'p', text: 'Paciente **acostado 2–5 min**: medir PA y FC. **De pie**: medir a los **3 y 5 min**. **Positiva:** caída de la PAS **> 20 mmHg** o de la PAD **> 10 mmHg**, aumento de la FC **> 30 lpm**, o síntomas (mareo, lipotimia). Indica **hipovolemia** (también puede ser cardíaca).' }],
      refs: [H1('22:23'), H1('23:05'), H1('25:06')],
    },
    {
      id: 'dig12-d04',
      prio: 'P1',
      priority: 'imprescindible',
      ficha: 'alta-baja',
      question: 'Defina hemorragia digestiva baja y mencione cinco etiologías.',
      quote: { text: '«…pregunta de parcial que muchos confunden: la causa más frecuente… son las hemorroides y las fisuras»', refs: [H2('01:40')] },
      answer: [
        { t: 'p', text: 'Sangrado desde el **ángulo de Treitz hasta el ano**. Menos frecuente y menos grave; suele estar estable y puede pasar desapercibida (sangre oculta).' },
        { t: 'p', text: '**Etiologías:** **hemorroides y fisuras** (las más frecuentes), divertículos, angiodisplasia (colon derecho), cáncer colorrectal, enfermedad inflamatoria, colitis isquémica, divertículo de Meckel.' },
      ],
      refs: [H2('00:00'), H2('01:40'), H2('02:20')],
    },
    {
      id: 'dig12-d05',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'alta-baja',
      question: 'Cuadro de diferenciación clínica de HDA y HDB.',
      answer: [
        {
          t: 'table',
          head: ['', 'Alta', 'Baja'],
          rows: [
            ['Presentación', 'Hematemesis, melena', 'Hematoquecia, proctorragia'],
            ['Hemodinamia', 'Más grave, inestable', 'Suele ser estable'],
            ['Urea', 'Elevada', 'Normal'],
            ['SNG', 'Hemática / borra de café', 'Limpia'],
            ['Estudio', 'Endoscopía alta', 'Colonoscopía'],
          ],
        },
      ],
      refs: [H1('15:42'), H2('00:46'), H1('29:49')],
    },
    {
      id: 'dig12-d06',
      prio: 'P2',
      priority: 'complementario',
      ficha: 'estudios',
      question: 'Explique la clasificación de Forrest.',
      answer: [{ t: 'p', text: 'Clasificación endoscópica de la úlcera sangrante: **Ia** sangrado en chorro, **Ib** en napa, **IIa** vaso visible, **IIb** coágulo adherido, **IIc** base con hematina, **III** base limpia. Cuanto menor el número, mayor riesgo de resangrado. (El profe aclara que no se toma en el parcial.)' }],
      refs: [H1('26:28'), H1('27:09')],
    },
  ],

  mcq: [
    {
      id: 'dig12-q01',
      topic: 'Alta',
      difficulty: 1,
      emphasis: true,
      stem: 'La causa **más frecuente** de hemorragia digestiva alta es:',
      options: [
        { text: 'Várices esofágicas.', why: 'Es una causa importante, pero no la primera.' },
        { text: 'Úlcera péptica.', why: 'Correcto: «tiene que decir úlceras».' },
        { text: 'Mallory-Weiss.', why: 'No.' },
        { text: 'Cáncer gástrico.', why: 'No.' },
      ],
      answer: 1,
      refs: [H1('16:22'), L('390')],
    },
    {
      id: 'dig12-q02',
      topic: 'Baja',
      difficulty: 1,
      emphasis: true,
      stem: 'La causa **más frecuente** de hemorragia digestiva baja es:',
      options: [
        { text: 'Cáncer de colon.', why: 'Es el error que el profe advierte.' },
        { text: 'Hemorroides y fisuras.', why: 'Correcto.' },
        { text: 'Divertículos.', why: 'Frecuentes en mayores, pero no la primera.' },
        { text: 'Angiodisplasia.', why: 'No.' },
      ],
      answer: 1,
      refs: [H2('01:40')],
    },
    {
      id: 'dig12-q03',
      topic: 'Límites',
      difficulty: 1,
      stem: 'El límite entre hemorragia digestiva alta y baja es:',
      options: [
        { text: 'El píloro.', why: 'No.' },
        { text: 'El ángulo de Treitz.', why: 'Correcto.' },
        { text: 'La válvula ileocecal.', why: 'No.' },
        { text: 'El esfínter esofágico inferior.', why: 'No.' },
      ],
      answer: 1,
      refs: [H1('10:19')],
    },
    {
      id: 'dig12-q04',
      topic: 'Formas',
      difficulty: 2,
      stem: 'La **melena** proviene en el 85 % de los casos de:',
      options: [
        { text: 'El tubo digestivo alto.', why: 'Correcto.' },
        { text: 'El recto.', why: 'Da proctorragia.' },
        { text: 'El colon izquierdo.', why: 'Da sangre roja.' },
        { text: 'Las hemorroides.', why: 'No.' },
      ],
      answer: 0,
      refs: [H1('09:39'), L('389')],
    },
    {
      id: 'dig12-q05',
      topic: 'Formas',
      difficulty: 3,
      stem: 'Una hematoquecia puede venir del tubo **alto** cuando:',
      options: [
        { text: 'El sangrado es mayor a 1000 ml o el tránsito es muy rápido.', why: 'Correcto.' },
        { text: 'El tránsito es lento.', why: 'Eso daría melena.' },
        { text: 'Hay hemorroides.', why: 'No.' },
        { text: 'Nunca.', why: 'Sí puede (10–15 %).' },
      ],
      answer: 0,
      refs: [H1('13:01'), L('389')],
    },
    {
      id: 'dig12-q06',
      topic: 'Clases',
      difficulty: 2,
      emphasis: true,
      stem: 'FC 130, TAS 90, FR 32, diuresis 10 ml/h, ansioso y confuso. Clase de hemorragia:',
      options: [
        { text: 'I.', why: 'No.' },
        { text: 'II.', why: 'No.' },
        { text: 'III (grave, 30–40 %).', why: 'Correcto.' },
        { text: 'IV.', why: 'Tendría FC > 140 y diuresis imperceptible.' },
      ],
      answer: 2,
      refs: [L('389')],
    },
    {
      id: 'dig12-q07',
      topic: 'Clases',
      difficulty: 2,
      stem: 'Una pérdida de **más de 2000 ml** (> 40 %) corresponde a:',
      options: [
        { text: 'Clase IV: shock hipovolémico.', why: 'Correcto.' },
        { text: 'Clase II.', why: 'No.' },
        { text: 'Clase I.', why: 'No.' },
        { text: 'No se clasifica.', why: 'No.' },
      ],
      answer: 0,
      refs: [H1('03:29'), L('389')],
    },
    {
      id: 'dig12-q08',
      topic: 'Ortostatismo',
      difficulty: 2,
      emphasis: true,
      stem: 'La prueba de ortostatismo es positiva si al ponerse de pie:',
      options: [
        { text: 'La PAS cae más de 20 mmHg (o la PAD más de 10, o la FC sube más de 30).', why: 'Correcto.' },
        { text: 'La PAS sube 10 mmHg.', why: 'Es normal.' },
        { text: 'La FC baja.', why: 'No.' },
        { text: 'La saturación sube.', why: 'No.' },
      ],
      answer: 0,
      refs: [H1('23:05'), H1('25:06')],
    },
    {
      id: 'dig12-q09',
      topic: 'Laboratorio',
      difficulty: 2,
      stem: 'En la hemorragia digestiva **alta**, la urea suele estar:',
      options: [
        { text: 'Elevada, por la digestión de la sangre.', why: 'Correcto.' },
        { text: 'Baja.', why: 'No.' },
        { text: 'Normal siempre.', why: 'No.' },
        { text: 'No se pide.', why: 'Sí se pide.' },
      ],
      answer: 0,
      refs: [H1('29:49')],
    },
    {
      id: 'dig12-q10',
      topic: 'Estudios',
      difficulty: 1,
      stem: 'Paciente con anemia ferropénica y sangre oculta en materia fecal positiva. Estudio indicado:',
      options: [
        { text: 'Colonoscopía.', why: 'Correcto.' },
        { text: 'Ecografía.', why: 'No.' },
        { text: 'Rx de abdomen.', why: 'No.' },
        { text: 'Nada.', why: 'No.' },
      ],
      answer: 0,
      refs: [H2('04:27')],
    },
  ],

  memory: [
    {
      id: 'dig12-m01',
      title: 'Clases de hemorragia',
      purpose: '«Como el Padre Nuestro».',
      evaluates: [{ t: 'list', items: ['I < 750 · FC < 100', 'II 750–1500 · FC 100–119', 'III 1500–2000 · FC 120–139', 'IV > 2000 · FC > 140'] }],
      interpret: 'Cada clase sube unos 20 latidos.',
      mnemonic: { hook: 'FC: 100 · 120 · 140 (cada clase, +20).', explain: 'Los cortes de frecuencia cardíaca separan las clases.' },
      recall: { q: '¿Qué pérdida y qué FC tiene una hemorragia clase III?', a: '1500–2000 ml (30–40 %), FC 120–139.' },
    },
    {
      id: 'dig12-m02',
      title: 'Causa n.º 1',
      purpose: 'Pregunta de parcial.',
      evaluates: [{ t: 'list', items: ['Alta: úlcera péptica', 'Baja: hemorroides y fisuras'] }],
      interpret: 'Lo más común gana, no lo más grave.',
      mnemonic: { hook: 'Arriba la Úlcera, abajo el Hemorroide.', explain: 'Alta = úlcera; baja = hemorroides y fisuras.' },
      recall: { q: '¿Cuál es la causa más frecuente de hemorragia digestiva alta y de baja?', a: 'Alta: úlcera péptica. Baja: hemorroides y fisuras.' },
    },
    {
      id: 'dig12-m03',
      title: 'Ortostatismo',
      purpose: 'Pregunta de parcial.',
      evaluates: [{ t: 'list', items: ['Acostado 2–5 min', 'De pie: 3 y 5 min', 'PAS ↓ > 20 · PAD ↓ > 10 · FC ↑ > 30'] }],
      interpret: 'Positivo = hipovolemia.',
      mnemonic: { hook: '20 – 10 – 30.', explain: 'PAS cae 20, PAD cae 10, FC sube 30.' },
      recall: { q: '¿Cuándo es positiva la prueba de ortostatismo?', a: 'Si al ponerse de pie la PAS cae > 20 mmHg, la PAD > 10 mmHg, la FC sube > 30 o aparecen síntomas.' },
    },
  ],

  closing: {
    map: {
      center: 'Hemorragias digestivas en una mirada',
      nodes: [
        { label: 'Cuánto ★', tone: 'red', items: ['Clases I–IV', 'FC 100/120/140', 'Ortostatismo 20-10-30'] },
        { label: 'Cómo se ve', tone: 'lilac', items: ['Hematemesis = alta', 'Melena 85 % alta', 'Hematoquecia 85 % baja'] },
        { label: 'De dónde ★', tone: 'sky', items: ['Treitz', 'Alta: úlcera', 'Baja: hemorroides'] },
        { label: 'Estudios', tone: 'gold', items: ['SNG · tacto rectal', 'Endoscopía · colonoscopía', 'Urea ↑ en la alta'] },
      ],
    },
    essentials: [
      '**Clases I–IV**: < 750 / 750–1500 / 1500–2000 / > 2000 ml; FC < 100 / 100–119 / 120–139 / > 140.',
      '**Ortostatismo** positivo: PAS ↓ > 20, PAD ↓ > 10, FC ↑ > 30 o síntomas.',
      '**Alta** (hasta Treitz): la más frecuente y grave; causa n.º 1 **úlcera péptica**.',
      '**Baja** (Treitz–ano): causa n.º 1 **hemorroides y fisuras**.',
      'Melena 85 % alta; hematoquecia 85 % baja; toda hemorragia → **anemia ferropénica**.',
      'Conducta: estabilizar → SNG → **endoscopía** (alta) o **colonoscopía** (baja).',
    ],
    links: [
      { chapterId: 'dig-07', text: '[[dig-07|Úlcera péptica]]: la hemorragia como complicación más frecuente.' },
      { chapterId: 'dig-13', text: '[[dig-13|Cirrosis e hipertensión portal]]: las várices esofágicas.' },
      { chapterId: 'dig-01', text: '[[dig-01|Vómitos]]: hematemesis vs hemoptisis y Mallory-Weiss.' },
      { chapterId: 'dig-03', text: '[[dig-03|Anorrectal]]: gotas al final vs heces bañadas.' },
    ],
    pitfalls: [
      'Decir que la causa más frecuente de hemorragia baja es el cáncer.',
      'Confiar en el hematocrito inicial: baja recién a las 8 h.',
      'Confundir melena (alta) con hematoquecia (baja).',
      'Olvidar los cortes del ortostatismo.',
    ],
    miniExam: [
      {
        id: 'dig12-x01',
        topic: 'Integración',
        difficulty: 2,
        stem: 'Alcohólico con hematemesis abundante, ascitis y circulación colateral. La causa más probable del sangrado es:',
        options: [
          { text: 'Várices esofágicas por hipertensión portal.', why: 'Correcto en este contexto.' },
          { text: 'Hemorroides.', why: 'No.' },
          { text: 'Fisura anal.', why: 'No.' },
          { text: 'Divertículos.', why: 'No.' },
        ],
        answer: 0,
        refs: [H1('16:22'), H1('18:23')],
      },
    ],
  },

  escenas,
  diagrams: {},
};

export default chapter;
