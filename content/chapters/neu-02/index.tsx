import type { Chapter, SourceRef } from '@/types';
import { clase } from './clase';

/*
 * neu-02 — Motivos de consulta neurológicos II. Fuente: clases «MC Neurología» parte 3 (00:00–36:38) y parte 4
 * (00:01–30:15) de Ortega + libro p. 508 (causas de polineuropatía). Lo que marca como pregunta: los movimientos
 * involuntarios (temblor, corea, hemibalismo, atetosis, tics), la fasciculación, el cuadro de las neuropatías, la
 * parálisis de Todd y las etapas del sueño. Convulsiones y sueño: «es raro que lo pregunten», solo algunos docentes.
 * Ver content/traceability/neu-02.md.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const M3 = (t: string) => r('mc-neu-3', t);
const M4 = (t: string) => r('mc-neu-4', t);
const L = (p: string) => r('libro', undefined, p);

const chapter: Chapter = {
  id: 'neu-02',
  systemId: 'neuro',
  title: 'Motivos de consulta neurológicos II',
  subtitle: 'Movimientos involuntarios (temblor, corea, hemibalismo, tics, fasciculaciones), debilidad (primera y segunda motoneurona, neuropatías, Guillain-Barré, miopatías), convulsiones y sueño.',
  estimatedMinutes: 40,
  sources: [M3('00:00–36:38'), M4('00:01–30:15'), L('p508')],

  map: {
    center: 'Motivos de consulta neurológicos II',
    why: 'Lo que se pregunta: los **movimientos involuntarios** («muy preguntados en los parciales»), el **temblor** («se lo van a preguntar»), la **fasciculación**, el **cuadro de las neuropatías**, la **parálisis de Todd** y las **etapas del sueño**.',
    prereqs: [
      { label: 'Motivos de consulta I (neu-01)', detail: 'Tálamo, cefaleas, vértigo y Romberg.', chapterId: 'neu-01' },
      { label: 'Examen físico neurológico', detail: 'Tono, fuerza, reflejos y Babinski.' },
      { label: 'Encefalopatía hepática (dig-14)', detail: 'El flapping es una mioclonía negativa.', chapterId: 'dig-14' },
    ],
    branches: [
      { id: 'movimientos', label: 'Movimientos involuntarios', tone: 'lilac', items: ['Temblor ★', 'Corea y hemibalismo', 'Fasciculación ★'] },
      { id: 'debilidad', label: 'Debilidad', tone: 'sky', items: ['1.ª vs 2.ª motoneurona', 'Decusación'] },
      { id: 'snp', label: 'Nervio, placa y músculo', tone: 'mint', items: ['Polineuropatía ★', 'Guillain-Barré', 'Miopatía y miastenia'] },
      { id: 'crisis', label: 'Convulsiones y sueño', tone: 'peach', items: ['Fases', 'Todd ★', 'Etapas del sueño'] },
    ],
    outcomes: [
      'Clasificar el **temblor** y reconocer el de Parkinson, el cerebeloso, el fisiológico y el esencial.',
      'Explicar la **corea** y el **Parkinson** con el equilibrio dopamina–acetilcolina, y ubicar el **hemibalismo**.',
      'Separar debilidad de **1.ª** y **2.ª motoneurona**, **neuropatía** (distal) y **miopatía** (proximal).',
      'Describir las **fases** de la crisis tónico-clónica, la **parálisis de Todd** y las **etapas del sueño**.',
    ],
  },

  theory: [
    {
      id: 'movimientos',
      kicker: 'Clave',
      title: 'Movimientos involuntarios anormales',
      priority: 'imprescindible',
      summary: 'Disfunción de los núcleos de la base: hipercinesias (temblor, corea, balismo, atetosis, mioclonías, distonías, tics) e hipocinesia (Parkinson).',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Lo más preguntado', text: '«Movimientos involuntarios anormales, otro de los temas que son muy preguntados en los parciales.» «Yo quiero que ustedes sepan… temblor, corea, el hemibalismo, la atetosis y los tics, que son por lo general lo más preguntado de todos.»', refs: [M3('00:00'), M3('22:02')] },
        {
          t: 'table',
          head: ['Temblor', 'Cuándo', 'Cómo', 'Pista'],
          rows: [
            ['**Parkinson**', '**Reposo**', 'Lento, grosero; cede al moverse', 'Empieza unilateral; «cuenta monedas»'],
            ['Fisiológico', 'Postural', 'Fino, rápido', 'Ansiedad, frío (adrenalina)'],
            ['**Cerebeloso**', '**Intencional**', 'Aumenta cerca del objetivo', 'Síndrome cerebeloso'],
            ['Esencial', 'Postural', 'Manos, cabeza, voz', 'Hereditario; alcohol y estrés'],
            ['Wilson', 'Postural', 'Grueso, proximal', 'Cobre en los núcleos de la base'],
          ],
        },
        { t: 'callout', kind: 'prof', title: 'El temblor', text: '«El temblor usted tiene que conocerlo… porque se lo van a preguntar.» El movimiento involuntario más frecuente; desaparece con el sueño.', refs: [M3('02:48')] },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Corea', title: 'Cuerpo estriado', text: 'Rápidos, irregulares, arrítmicos. Bajan **acetilcolina y GABA**, sobra dopamina. **Huntington** (hereditaria, irreversible) y **Sydenham** (niños, estreptococo, reversible); también por levodopa.', tone: 'red' },
            { tag: 'Hemibalismo', title: 'Núcleo de Luys', text: 'Una corea de **medio cuerpo**: movimientos de lanzamiento. Lesión vascular del **subtalámico**.', tone: 'peach' },
            { tag: 'Atetosis', title: 'Manos', text: 'Movimientos **lentos** y distónicos de las manos.', tone: 'lilac' },
            { tag: 'Mioclonías', title: 'Flapping', text: 'Contracciones bruscas; el **flapping** (asterixis) es una mioclonía negativa: encefalopatía hepática o urémica.', tone: 'gold' },
            { tag: 'Distonías y tics', title: 'Sostenidas o repetitivos', text: 'Distonía: tortícolis, blefaroespasmo. Tic: breve, repetitivo, se contiene un rato; **Gilles de la Tourette**.', tone: 'sky' },
            { tag: 'Pregunta de parcial', title: 'Fasciculación', text: 'Contracciones espontáneas visibles en reposo: **segunda motoneurona**, con hipotonía.', tone: 'mint' },
          ],
        },
        { t: 'callout', kind: 'key', title: 'Dopamina contra acetilcolina', text: '**Parkinson**: falta dopamina (sustancia negra) → **hipocinesia**. **Corea**: faltan acetilcolina y GABA en el estriado → **hipercinesia**.', refs: [M3('11:52')] },
      ],
      refs: [M3('00:43'), M3('01:24'), M3('04:13'), M3('05:38'), M3('09:48'), M3('11:12'), M3('13:15'), M3('14:38'), M3('16:02'), M3('17:26'), M3('19:28'), M3('21:06')],
    },
    {
      id: 'debilidad',
      kicker: 'Clínica',
      title: 'Debilidad: primera y segunda motoneurona',
      priority: 'muy-importante',
      summary: 'Paresia y plejía. La 1.ª motoneurona da parálisis espástica; la 2.ª, fláccida con atrofia y fasciculaciones.',
      blocks: [
        {
          t: 'table',
          head: ['', '1.ª motoneurona (piramidal)', '2.ª motoneurona'],
          rows: [
            ['Parálisis', '**Espástica**', '**Fláccida**'],
            ['Tono', 'Hipertonía (navaja)', 'Hipotonía o atonía'],
            ['Reflejos', '**Hiperreflexia**', 'Hipo o **arreflexia**'],
            ['Babinski', '**Sí**', 'No'],
            ['Atrofia', 'No (solo por desuso)', '**Sí**'],
            ['Fasciculaciones', 'No', '**Sí**'],
          ],
        },
        { t: 'callout', kind: 'tip', title: 'La decusación', text: 'La vía piramidal cruza en el **bulbo**. Lesión **por arriba** → debilidad del **lado opuesto**; **por debajo** → del **mismo lado**.', refs: [M3('23:55'), M3('24:36')] },
      ],
      refs: [M3('22:21'), M3('23:08'), M3('25:20'), M3('26:00')],
    },
    {
      id: 'snp',
      kicker: 'Clave',
      title: 'Nervio, placa y músculo',
      priority: 'imprescindible',
      summary: 'Mononeuropatía, mononeuropatía múltiple y polineuropatía (distal). Guillain-Barré. Miopatía (proximal) y miastenia (placa).',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Pregunta de parcial', text: '«Esto es pregunta de parcial, lo que les puse en el cuadrito»: las características de las neuropatías.', refs: [M3('29:36')] },
        {
          t: 'compare',
          title: 'Neuropatía y miopatía',
          cols: [
            { title: 'Polineuropatía', tone: 'sky', items: ['**Distal**, simétrica, miembros inferiores', 'Hipotonía, **arreflexia**, atrofia, **fasciculaciones**', '**Trastornos sensitivos**; alodinia', 'LCR, esfínteres y pares normales (salvo la diabética)'] },
            { title: 'Miopatía', tone: 'peach', items: ['**Proximal**: cinturas escapular y pelviana', 'Sin compromiso sensitivo; reflejos casi normales', '**Sin fasciculaciones**; seudohipertrofia', 'Marcha de pato, escápulas aladas; **CPK alta**'] },
          ],
        },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Mononeuropatías', title: 'Un nervio', text: '**Radial**: mano caída. **Mediano**: mano del predicador. **Cubital**: mano en garra. Varios aislados: mononeuropatía múltiple.', tone: 'sky' },
            { tag: 'Las tres', title: 'Polineuropatías', text: '**Diabética**, **alcohólica** (tóxica) y **Guillain-Barré**.', tone: 'gold' },
            { tag: 'Placa', title: 'Miastenia gravis', text: 'Anticuerpos contra el **receptor nicotínico**: fatiga, **ptosis bilateral**.', tone: 'lilac' },
          ],
        },
        { t: 'callout', kind: 'clinic', title: 'Guillain-Barré', text: 'Días después de una **infección** respiratoria o intestinal: desmielinización autoinmune, parálisis **ascendente** (Landry), **arreflexia**, compromiso del **facial**; riesgo de **insuficiencia respiratoria**. LCR: **disociación albúmino-citológica** (proteínas altas, células normales).', refs: [M3('31:01'), M3('31:46'), M3('32:28'), M3('33:10')] },
      ],
      refs: [M3('26:44'), M3('27:31'), M3('28:11'), M3('28:53'), M3('30:20'), M3('33:52'), M3('34:34'), M3('35:17'), M3('35:58'), M3('36:38'), L('p508')],
    },
    {
      id: 'crisis',
      kicker: 'Motivos de consulta',
      title: 'Convulsiones y sueño',
      priority: 'muy-importante',
      summary: 'Fases de la crisis tónico-clónica, parálisis de Todd, convulsión vs epilepsia, diferenciales; regulación y etapas del sueño.',
      blocks: [
        { t: 'callout', kind: 'note', title: 'Lo que se pregunta poco', text: 'Convulsiones y trastornos del sueño: «es raro que lo pregunten en el parcial»; los preguntan algunos docentes.', refs: [M4('00:16')] },
        {
          t: 'steps',
          title: 'Las fases de la crisis tónico-clónica',
          items: [
            { title: 'Aura', text: 'Alucinaciones, mareo, adormecimiento, emociones.' },
            { title: 'Tónica', text: 'Rígido, arqueado; puede orinarse.' },
            { title: 'Clónica', text: 'Sacudidas, saliva por la boca.' },
            { title: 'Postictal', text: 'Débil, atónico, conciencia perdida o confusa.' },
          ],
        },
        { t: 'callout', kind: 'prof', title: 'Parálisis de Todd', text: '«Pregunta de parcial… pregunta siempre qué es la parálisis de Todd o la paresia postictal»: debilidad **transitoria** después de la crisis (casi siempre de un lado), que se va sola en menos de 48 horas.', refs: [M4('17:25'), M4('17:38')] },
        {
          t: 'compare',
          title: 'Convulsión y epilepsia',
          cols: [
            { title: 'Convulsión', tone: 'peach', items: ['La manifestación clínica (tónico-clónica)', 'Causa puntual (fiebre): se va si se retira', '> 30 min o repetidas: **estado de mal epiléptico**'] },
            { title: 'Epilepsia', tone: 'lilac', items: ['Condición **permanente** y recurrente', 'Lesión del SNC (temporal, TEC)', 'Puede no convulsionar: **ausencia**'] },
          ],
        },
        { t: 'callout', kind: 'tip', title: 'Diferenciales', text: '**Síncope** (recupera enseguida), **crisis psicógena** por hiperventilación, **drogas o abstinencia**, y la **convulsión febril** del niño.', refs: [M4('09:46'), M4('10:30'), M4('11:51')] },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Regulación', title: 'Hipotálamo', text: 'Lesión **posterior** → hipersomnia; **anterior** → insomnio. Formación reticular: simpático = vigilia, parasimpático = sueño.', tone: 'lilac' },
            { tag: 'No REM', title: '1–2 y 3–4', text: '1–2: superficial, despierta fácil. 3–4: **profundo**, parasimpático, bajan FC y TA.', tone: 'sky' },
            { tag: 'REM', title: 'Se sueña', text: 'A la hora y media: movimientos oculares rápidos, **atonía**, ondas en dientes de sierra.', tone: 'mint' },
          ],
        },
        { t: 'callout', kind: 'prof', title: 'Las etapas', text: '«Lo que le van a preguntar en sí, y característicamente, son las fases o las etapas del sueño.»', refs: [M4('27:28')] },
      ],
      refs: [M4('00:43'), M4('01:27'), M4('03:36'), M4('06:19'), M4('07:02'), M4('15:25'), M4('16:08'), M4('16:54'), M4('19:05'), M4('21:15'), M4('25:28'), M4('26:09'), M4('28:13'), M4('29:35')],
    },
  ],

  developments: [
    {
      id: 'neu02-d01',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'movimientos',
      question: 'Defina y clasifique el temblor. ¿Cómo es el temblor del Parkinson, el cerebeloso, el fisiológico y el esencial?',
      quote: { text: '«…el temblor usted tiene que conocerlo… porque se lo van a preguntar»', refs: [M3('02:48')] },
      answer: [
        { t: 'p', text: '**Temblor**: oscilaciones rítmicas de un segmento o varias partes del cuerpo; el movimiento involuntario más frecuente; desaparece con el sueño. Se clasifica por velocidad (rápido, mediano, lento), amplitud (fino, grosero), **momento** (reposo, postural, intencional), localización y causa.' },
        { t: 'p', text: '**Parkinson**: de reposo, lento y grosero, empieza unilateral («cuenta monedas»), cede al moverse. **Cerebeloso**: intencional, aumenta al acercarse al objetivo. **Fisiológico**: postural, fino y rápido (ansiedad, frío, adrenalina). **Esencial**: postural, hereditario, manos, cabeza y voz. **Wilson**: grueso y proximal.' },
      ],
      refs: [M3('03:32'), M3('04:13'), M3('05:38'), M3('06:59'), M3('07:42'), M3('08:23')],
    },
    {
      id: 'neu02-d02',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'movimientos',
      question: 'Describa la corea, el hemibalismo, la atetosis y los tics. ¿Qué es una fasciculación?',
      quote: { text: '«…temblor, corea, el hemibalismo, la atetosis y los tics, que son por lo general lo más preguntado de todos»', refs: [M3('22:02')] },
      answer: [
        { t: 'p', text: '**Corea**: movimientos rápidos, irregulares, arrítmicos, que pasan de una parte del cuerpo a otra; lesión del **cuerpo estriado** (bajan acetilcolina y GABA, sobra dopamina). Huntington (hereditaria, irreversible), Sydenham (niños, estreptococo, reversible), por levodopa.' },
        { t: 'p', text: '**Hemibalismo**: corea de medio cuerpo, con movimientos de lanzamiento; lesión vascular del **núcleo subtalámico de Luys**. **Atetosis**: movimientos lentos y distónicos de las manos. **Tics**: breves, bruscos, repetitivos, se contienen un rato (Gilles de la Tourette).' },
        { t: 'p', text: '**Fasciculación**: contracción espontánea de un grupo de fibras, visible en reposo; típica de la **segunda motoneurona**, con hipotonía.' },
      ],
      refs: [M3('09:48'), M3('11:12'), M3('13:15'), M3('14:38'), M3('16:02'), M3('19:28'), M3('21:06')],
    },
    {
      id: 'neu02-d03',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'snp',
      question: 'Características de las neuropatías: mononeuropatía, mononeuropatía múltiple y polineuropatía. Diferencia con la miopatía.',
      quote: { text: '«Esto es pregunta de parcial, lo que les puse en el cuadrito»', refs: [M3('29:36')] },
      answer: [
        { t: 'p', text: '**Mononeuropatía**: un nervio (radial: mano caída; mediano: del predicador; cubital: en garra). **Múltiple**: varios nervios aislados. **Polineuropatía**: muchos nervios, **distal**, simétrica, miembros inferiores.' },
        { t: 'p', text: 'Polineuropatía: paresia, hipotonía, **arreflexia**, atrofia, fasciculaciones, alteración sensitiva y alodinia; LCR, esfínteres y pares normales (salvo la diabética). Las tres: diabética, alcohólica y Guillain-Barré.' },
        { t: 'p', text: '**Miopatía**: **proximal** (cinturas), simétrica, sin compromiso sensitivo ni fasciculaciones, reflejos casi normales, seudohipertrofia, **CPK elevada**.' },
      ],
      refs: [M3('27:31'), M3('28:11'), M3('29:36'), M3('30:20'), M3('33:52'), M3('34:34'), L('p508')],
    },
    {
      id: 'neu02-d04',
      origen: 'clase',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'crisis',
      question: '¿Cuáles son las fases de la crisis tónico-clónica? ¿Qué es la parálisis de Todd?',
      quote: { text: '«…pregunta siempre qué es la parálisis de Todd o la paresia postictal»', refs: [M4('17:25')] },
      answer: [
        { t: 'p', text: '**Aura** (alucinaciones, mareo, emociones) → **tónica** (rigidez, arqueo, incontinencia) → **clónica** (sacudidas, sialorrea) → **postictal** (debilidad, atonía, conciencia perdida o confusa).' },
        { t: 'p', text: '**Parálisis de Todd**: paresia postictal, debilidad **transitoria** después de la crisis, casi siempre de un lado, que se resuelve sola (menos de 48 horas).' },
      ],
      refs: [M4('16:08'), M4('16:54'), M4('17:38')],
    },
    {
      id: 'neu02-d05',
      origen: 'clase',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'crisis',
      question: '¿Cuáles son las etapas del sueño?',
      quote: { text: '«…lo que le van a preguntar en sí, y característicamente, son las fases o las etapas del sueño»', refs: [M4('27:28')] },
      answer: [
        { t: 'p', text: '**No REM 1 y 2**: sueño superficial, se despierta fácil. **No REM 3 y 4**: sueño profundo, predominio parasimpático (bajan FC y TA).' },
        { t: 'p', text: '**REM** (a la hora y media): se sueña; movimientos oculares rápidos, atonía, ondas en dientes de sierra. Regulación: hipotálamo (posterior: su lesión da hipersomnia; anterior: insomnio) y formación reticular.' },
      ],
      refs: [M4('26:09'), M4('27:30'), M4('28:13'), M4('29:35')],
    },
    {
      id: 'neu02-d06',
      origen: 'practica',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'debilidad',
      question: 'Diferencie la lesión de la primera y de la segunda motoneurona.',
      answer: [
        { t: 'p', text: '**1.ª motoneurona**: parálisis espástica, hipertonía en navaja, hiperreflexia, Babinski, sin atrofia (salvo desuso). Por arriba de la decusación bulbar, contralateral; por debajo, homolateral.' },
        { t: 'p', text: '**2.ª motoneurona**: parálisis fláccida, hipotonía, arreflexia, atrofia y fasciculaciones.' },
      ],
      refs: [M3('23:08'), M3('23:55'), M3('25:20'), M3('26:00')],
    },
  ],

  mcq: [
    { id: 'neu02-q01', origen: 'practica', topic: 'Temblor', difficulty: 1, emphasis: true, stem: 'El temblor del Parkinson es típicamente:', options: [{ text: 'De reposo, lento y grosero.', why: 'Correcto.' }, { text: 'Intencional.', why: 'Ese es el cerebeloso.' }, { text: 'Postural, fino y rápido.', why: 'Ese es el fisiológico.' }, { text: 'Persiste durante el sueño.', why: 'El temblor desaparece con el sueño.' }], answer: 0, refs: [M3('05:38')] },
    { id: 'neu02-q02', origen: 'practica', topic: 'Temblor', difficulty: 1, stem: 'Un temblor que aumenta a medida que el dedo se acerca a la nariz es:', options: [{ text: 'Intencional, cerebeloso.', why: 'Correcto.' }, { text: 'De reposo.', why: 'Cede al moverse.' }, { text: 'Fisiológico.', why: 'Es postural.' }, { text: 'Por Wilson.', why: 'Es grueso y proximal.' }], answer: 0, refs: [M3('07:42')] },
    { id: 'neu02-q03', origen: 'practica', topic: 'Corea', difficulty: 2, stem: 'En la corea, la alteración de neurotransmisores en el cuerpo estriado es:', options: [{ text: 'Bajan acetilcolina y GABA; sobra dopamina.', why: 'Correcto.' }, { text: 'Falta dopamina.', why: 'Eso es el Parkinson.' }, { text: 'Sobra acetilcolina.', why: 'También es el Parkinson.' }, { text: 'No hay alteración.', why: 'Sí la hay.' }], answer: 0, refs: [M3('11:12'), M3('11:52')] },
    { id: 'neu02-q04', origen: 'practica', topic: 'Corea', difficulty: 2, stem: 'Un niño con movimientos coreicos semanas después de una faringitis estreptocócica tiene:', options: [{ text: 'Corea de Sydenham (reversible).', why: 'Correcto.' }, { text: 'Corea de Huntington.', why: 'Es hereditaria, del adulto.' }, { text: 'Hemibalismo.', why: 'Es de medio cuerpo, vascular.' }, { text: 'Tics.', why: 'No.' }], answer: 0, refs: [M3('13:15')] },
    { id: 'neu02-q05', origen: 'practica', topic: 'Hemibalismo', difficulty: 2, stem: 'El hemibalismo se debe a una lesión de:', options: [{ text: 'El núcleo subtalámico de Luys.', why: 'Correcto.' }, { text: 'La sustancia negra.', why: 'Da Parkinson.' }, { text: 'El cerebelo.', why: 'No.' }, { text: 'La placa neuromuscular.', why: 'No.' }], answer: 0, refs: [M3('15:18')] },
    { id: 'neu02-q06', origen: 'practica', topic: 'Fasciculación', difficulty: 1, emphasis: true, stem: 'Las fasciculaciones son típicas de la lesión de:', options: [{ text: 'La segunda motoneurona.', why: 'Correcto.' }, { text: 'La primera motoneurona.', why: 'Da espasticidad.' }, { text: 'El músculo (miopatía).', why: 'La miopatía no fascicula.' }, { text: 'El cerebelo.', why: 'No.' }], answer: 0, refs: [M3('21:06')] },
    { id: 'neu02-q07', origen: 'practica', topic: 'Neuropatía', difficulty: 2, emphasis: true, stem: 'La polineuropatía afecta típicamente:', options: [{ text: 'La parte distal, simétrica, a predominio de los miembros inferiores.', why: 'Correcto.' }, { text: 'Las cinturas escapular y pelviana.', why: 'Eso es la miopatía.' }, { text: 'Medio cuerpo.', why: 'Eso es la hemiplejía.' }, { text: 'Solo los párpados.', why: 'Eso sugiere miastenia.' }], answer: 0, refs: [M3('29:36')] },
    { id: 'neu02-q08', origen: 'practica', topic: 'Guillain-Barré', difficulty: 2, stem: 'La disociación albúmino-citológica del LCR en el Guillain-Barré es:', options: [{ text: 'Proteínas altas con células normales.', why: 'Correcto.' }, { text: 'Proteínas y células altas.', why: 'No es disociación.' }, { text: 'Glucosa baja.', why: 'No.' }, { text: 'Células altas con proteínas normales.', why: 'Al revés.' }], answer: 0, refs: [M3('33:10')] },
    { id: 'neu02-q09', origen: 'practica', topic: 'Miopatía', difficulty: 2, stem: 'Debilidad proximal y simétrica, sin trastornos sensitivos ni fasciculaciones, con CPK alta, sugiere:', options: [{ text: 'Miopatía.', why: 'Correcto.' }, { text: 'Polineuropatía.', why: 'Es distal y sensitiva.' }, { text: 'Lesión piramidal.', why: 'Daría hiperreflexia y Babinski.' }, { text: 'Guillain-Barré.', why: 'Es ascendente con arreflexia.' }], answer: 0, refs: [M3('33:52'), M3('35:58')] },
    { id: 'neu02-q10', origen: 'practica', topic: 'Decusación', difficulty: 2, stem: 'Una lesión de la vía piramidal en la cápsula interna izquierda da debilidad:', options: [{ text: 'Del lado derecho.', why: 'Correcto: por arriba de la decusación, contralateral.' }, { text: 'Del lado izquierdo.', why: 'Eso sería por debajo del bulbo.' }, { text: 'De los cuatro miembros.', why: 'No.' }, { text: 'Solo de la cara.', why: 'No.' }], answer: 0, refs: [M3('23:55')] },
    { id: 'neu02-q11', origen: 'practica', topic: 'Convulsión', difficulty: 2, stem: 'La parálisis de Todd es:', options: [{ text: 'Una debilidad transitoria después de una crisis convulsiva.', why: 'Correcto.' }, { text: 'Una parálisis ascendente.', why: 'Eso es Guillain-Barré.' }, { text: 'Una secuela permanente.', why: 'Es transitoria.' }, { text: 'El aura de la crisis.', why: 'No.' }], answer: 0, refs: [M4('17:25')] },
    { id: 'neu02-q12', origen: 'practica', topic: 'Sueño', difficulty: 2, stem: 'La etapa del sueño en la que se sueña, con atonía y movimientos oculares rápidos, es:', options: [{ text: 'REM.', why: 'Correcto.' }, { text: 'No REM 1.', why: 'Es superficial.' }, { text: 'No REM 3–4.', why: 'Es el sueño profundo.' }, { text: 'La latencia.', why: 'No.' }], answer: 0, refs: [M4('29:35')] },
  ],

  memory: [
    {
      id: 'neu02-m01',
      title: 'Los tres temblores',
      purpose: '«Se lo van a preguntar».',
      evaluates: [{ t: 'list', items: ['Reposo: Parkinson', 'Postural: fisiológico y esencial', 'Intencional: cerebeloso'] }],
      interpret: 'Preguntá cuándo aparece: quieto, sosteniendo o yendo hacia algo.',
      mnemonic: { hook: 'Parkinson Reposa, el Cerebelo Intenta.', explain: 'Reposo = Parkinson; intencional = cerebeloso.' },
      recall: { q: '¿Qué temblor es de reposo y cuál es intencional?', a: 'De reposo: el del Parkinson. Intencional: el cerebeloso.' },
    },
    {
      id: 'neu02-m02',
      title: 'Distal o proximal',
      purpose: 'El cuadro de las neuropatías.',
      evaluates: [{ t: 'list', items: ['Neuropatía: distal, sensitiva, arrefléxica, fascicula', 'Miopatía: proximal, sin sensitivo, CPK alta'] }],
      interpret: 'El nervio largo se enferma por la punta; el músculo grande, por las cinturas.',
      mnemonic: { hook: 'Nervio: guante y media. Músculo: hombros y caderas.', explain: 'Polineuropatía distal; miopatía proximal.' },
      recall: { q: '¿Qué distingue una polineuropatía de una miopatía?', a: 'La polineuropatía es distal, con trastornos sensitivos, arreflexia y fasciculaciones; la miopatía es proximal, sin trastornos sensitivos ni fasciculaciones, con CPK alta.' },
    },
    {
      id: 'neu02-m03',
      title: 'Dopamina y acetilcolina',
      purpose: 'Para entender Parkinson y corea.',
      evaluates: [{ t: 'list', items: ['Parkinson: falta dopamina → hipocinesia', 'Corea: faltan acetilcolina y GABA → hipercinesia'] }],
      interpret: 'Son espejos: uno se mueve de menos, otro de más.',
      mnemonic: { hook: 'Sin dopamina me freno; sin acetilcolina me desboco.', explain: 'Parkinson frena; la corea desborda.' },
      recall: { q: '¿Qué neurotransmisor falta en el Parkinson y cuáles en la corea?', a: 'En el Parkinson, la dopamina; en la corea, la acetilcolina y el GABA del estriado.' },
    },
  ],

  closing: {
    map: {
      center: 'Motivos de consulta neurológicos II',
      nodes: [
        { label: 'Movimientos', tone: 'lilac', items: ['Temblor ★', 'Corea, hemibalismo', 'Atetosis, tics', 'Fasciculación ★'] },
        { label: 'Debilidad', tone: 'sky', items: ['1.ª: espástica', '2.ª: fláccida', 'Decusación'] },
        { label: 'Periférico', tone: 'mint', items: ['Polineuropatía ★', 'Guillain-Barré', 'Miopatía, miastenia'] },
        { label: 'Crisis y sueño', tone: 'peach', items: ['Fases', 'Todd ★', 'Etapas'] },
      ],
    },
    essentials: [
      'Movimientos involuntarios: disfunción de los **núcleos de la base**. Parkinson: falta **dopamina**; corea: faltan **acetilcolina y GABA**.',
      'Temblor: **reposo** (Parkinson), **postural** (fisiológico, esencial), **intencional** (cerebeloso); desaparece con el sueño.',
      'Hemibalismo: **núcleo de Luys**. Flapping: mioclonía negativa. **Fasciculación**: segunda motoneurona.',
      '1.ª motoneurona: espástica, hiperreflexia, Babinski. 2.ª: fláccida, arreflexia, atrofia, fasciculaciones. Arriba de la decusación, contralateral.',
      'Polineuropatía **distal**; miopatía **proximal** con CPK alta; Guillain-Barré ascendente con **disociación albúmino-citológica**; miastenia de la **placa**.',
      'Crisis: aura → tónica → clónica → postictal; **Todd**: debilidad transitoria. Sueño: no REM 1–2, 3–4 y **REM**.',
    ],
    links: [
      { chapterId: 'neu-01', text: '[[neu-01|Motivos de consulta I]]: cefaleas, vértigo y Romberg.' },
      { chapterId: 'neu-05', text: '[[neu-05|Síndromes motores]]: piramidal, segunda motoneurona, extrapiramidal y cerebeloso.' },
      { chapterId: 'dig-14', text: '[[dig-14|Encefalopatía hepática]]: el flapping.' },
    ],
    pitfalls: [
      'Decir que el temblor del Parkinson es intencional.',
      'Darle fasciculaciones a la miopatía o a la lesión piramidal.',
      'Confundir la disociación albúmino-citológica (proteínas altas, células normales).',
      'Usar convulsión y epilepsia como sinónimos.',
      'Confundir la lesión por arriba de la decusación (contralateral) con la medular (homolateral).',
    ],
    miniExam: [
      {
        id: 'neu02-x01',
        origen: 'practica',
        topic: 'Integración',
        difficulty: 2,
        stem: 'Paciente con debilidad de las piernas, atrofia de los gemelos, reflejos aquilianos abolidos y hormigueos en «media». Es diabético. Lo más probable es:',
        options: [
          { text: 'Polineuropatía diabética.', why: 'Correcto: distal, sensitiva y arrefléxica.' },
          { text: 'Miopatía.', why: 'Sería proximal y sin hormigueos.' },
          { text: 'Lesión piramidal.', why: 'Daría hiperreflexia.' },
          { text: 'Miastenia gravis.', why: 'No da trastorno sensitivo.' },
        ],
        answer: 0,
        refs: [M3('27:31'), M3('29:36'), M3('30:20')],
      },
    ],
  },

  maneuvers: {
    ids: ['trofismo-tono', 'fuerza-mingazzini', 'reflejos-osteotendinosos', 'reflejo-plantar-babinski'],
    note: 'Para la debilidad: tono, fuerza, reflejos y Babinski.',
  },

  clase,
  diagrams: {},
};

export default chapter;
