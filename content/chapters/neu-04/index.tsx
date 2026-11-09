import type { Chapter, SourceRef } from '@/types';
import { clase } from './clase';

/*
 * neu-04 — Pares craneales II: V trigémino, VII facial, VIII vestibulococlear, IX glosofaríngeo, X vago, XI espinal y
 * XII hipogloso. Fuente: clases «Pares craneales» 4–6 de Ortega. Lo que marca como pregunta: cómo está inervada la
 * lengua («una pregunta que hacen siempre»), el VII («pregunta muchísimo»), la parálisis facial central y periférica,
 * el VIII («para bochar al alumno») y la prueba de Weber. Ver content/traceability/neu-04.md.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const P4 = (t: string) => r('pc-4', t);
const P5 = (t: string) => r('pc-5', t);
const P6 = (t: string) => r('pc-6', t);

const chapter: Chapter = {
  id: 'neu-04',
  systemId: 'neuro',
  title: 'Pares craneales II',
  subtitle: 'Trigémino, facial (parálisis central y periférica), vestibulococlear (Weber, Rinne, ojos de muñeca), glosofaríngeo, vago, espinal e hipogloso, y cómo está inervada la lengua.',
  estimatedMinutes: 40,
  sources: [P4('00:02–28:27'), P5('00:06–26:43'), P6('00:02–20:14')],

  map: {
    center: 'Pares craneales II',
    why: 'Lo que se pregunta: **cómo está inervada la lengua** («una pregunta que hacen siempre en el parcial»), el **VII** («pregunta muchísimo») y la **parálisis facial central y periférica** («no me pueden no saber eso»), el **VIII** («para bochar al alumno») y la **prueba de Weber**.',
    prereqs: [
      { label: 'Pares craneales I (neu-03)', detail: 'Clasificación, origen aparente, oculomotores y nistagmo.', chapterId: 'neu-03' },
      { label: 'Neuralgia del trigémino (neu-01)', detail: 'V2 > V3 > V1.', chapterId: 'neu-01' },
      { label: 'Facies (primer parcial)', detail: 'Parálisis facial central y periférica.' },
    ],
    branches: [
      { id: 'trigemino', label: 'V trigémino', tone: 'gold', items: ['Masticación', 'V1, V2, V3', 'Corneano'] },
      { id: 'facial', label: 'VII facial', tone: 'sky', items: ['Central vs periférica ★', 'Bell y Negro'] },
      { id: 'vestibulococlear', label: 'VIII', tone: 'lilac', items: ['Weber ★', 'Rinne', 'Ojos de muñeca'] },
      { id: 'bajos', label: 'IX a XII y la lengua', tone: 'mint', items: ['Lengua ★', 'Cortina', 'Hipogloso'] },
    ],
    outcomes: [
      'Describir las funciones y la exploración del **trigémino**.',
      'Diferenciar la **parálisis facial central** de la **periférica**.',
      'Distinguir **hipoacusia de conducción y de percepción** con Weber y Rinne.',
      'Explicar **cómo está inervada la lengua** y reconocer las parálisis del IX, X y XII.',
    ],
  },

  theory: [
    {
      id: 'trigemino',
      kicker: 'Pares mixtos',
      title: 'V par: trigémino',
      priority: 'muy-importante',
      summary: 'Motor de la masticación; sensitivo de toda la cara por V1, V2 y V3. Cuatro núcleos. Reflejo corneano.',
      blocks: [
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'V1', title: 'Oftálmica', text: 'Frente, cuero cabelludo, órbita, nariz.', tone: 'sky' },
            { tag: 'V2', title: 'Maxilar superior', text: 'Mejilla, ala de la nariz, labio superior.', tone: 'red' },
            { tag: 'V3', title: 'Maxilar inferior', text: 'Mandíbula, labio inferior, **2/3 anteriores de la lengua** (tacto); músculos de la **masticación**.', tone: 'peach' },
          ],
        },
        {
          t: 'table',
          head: ['Núcleo', 'Dónde', 'Función'],
          rows: [
            ['Mesencefálico', 'Mesencéfalo', 'Sensibilidad profunda'],
            ['Motor', 'Protuberancia', 'Masticación'],
            ['Sensitivo principal', 'Protuberancia', 'Tacto'],
            ['Espinal', 'Bulbo', 'Dolor y temperatura'],
          ],
        },
        { t: 'callout', kind: 'tip', title: 'Exploración', text: 'Pincel, aguja, tubo frío o caliente y diapasón en las tres ramas, comparando los dos lados; abrir la boca contra resistencia; reflejos **corneano** (útil en el coma), superciliar, nasopalpebral y **maseterino**.', refs: [P4('11:55'), P4('12:35'), P4('13:58'), P4('14:39')] },
      ],
      refs: [P4('00:47'), P4('02:50'), P4('05:39'), P4('06:20'), P4('09:07'), P4('09:50'), P4('15:20'), P4('16:42')],
    },
    {
      id: 'facial',
      kicker: 'Clave',
      title: 'VII par: facial',
      priority: 'imprescindible',
      summary: 'Motor de la cara, gusto de los 2/3 anteriores de la lengua, secreción lagrimal y salival. Parálisis central (mitad inferior, contralateral) y periférica (hemicara entera, homolateral).',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Para el parcial', text: '«Otro par que pregunta muchísimo.» «Lo que sí quiero que estudien, por favor, es parálisis facial central, parálisis facial periférica: no me pueden no saber eso.» El porqué (la fisiopatogenia) no se pregunta.', refs: [P4('17:53'), P4('23:38'), P4('25:06')] },
        {
          t: 'compare',
          title: 'Parálisis facial',
          cols: [
            { title: 'Central', tone: 'lilac', items: ['Corteza o vía corticonuclear', '**Solo la mitad inferior**, del lado **opuesto**', 'La frente **se arruga**', 'Signo del **fumador de pipa**'] },
            { title: 'Periférica', tone: 'red', items: ['Núcleo o nervio', '**Toda la hemicara**, del **mismo lado**', 'Frente lisa, **no cierra el ojo**', 'Signos de **Bell** y de **Negro**'] },
          ],
        },
        { t: 'callout', kind: 'key', title: 'Por qué la central respeta la frente', text: 'La parte del núcleo que mueve la frente recibe fibras de **las dos cortezas**; la de la mitad inferior, solo de la opuesta.' },
        { t: 'callout', kind: 'tip', title: 'Exploración', text: 'Mímicas: arrugar la frente, cerrar los ojos, inflar las mejillas, mostrar los dientes. Gusto de los 2/3 anteriores: **ageusia**, hipogeusia, parageusia.', refs: [P4('26:25'), P4('27:05'), P4('28:27')] },
      ],
      refs: [P4('17:25'), P4('18:08'), P4('21:35'), P4('22:22'), P4('24:22'), P4('25:44')],
    },
    {
      id: 'vestibulococlear',
      kicker: 'Clave',
      title: 'VIII par: vestibulococlear',
      priority: 'imprescindible',
      summary: 'Rama coclear (órgano de Corti) y vestibular (conductos semicirculares, utrículo y sáculo). Hipoacusia de conducción y de percepción: Weber y Rinne.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Para el parcial', text: '«Es un par craneal que es directamente para bochar al alumno.» «La prueba de Weber es la prueba que más tienen que conocer… no se tienen que olvidar de eso.» Lo que se pregunta: qué pruebas conocés para evaluar la vía auditiva.', refs: [P5('01:02'), P5('11:21'), P5('16:34')] },
        {
          t: 'table',
          head: ['', 'Conducción', 'Percepción'],
          rows: [
            ['Dónde', 'Oído externo o medio (vía aérea)', 'Oído interno o nervio'],
            ['**Weber**', 'Hacia el oído **enfermo**', 'Hacia el oído **sano**'],
            ['**Rinne**', '**Negativo** (hueso > aire)', 'Positivo (aire > hueso, ambos bajos)'],
          ],
        },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Coma', title: 'Ojos de muñeca', text: 'Reflejo oculocefálico: integra VIII, III y VI.', tone: 'sky' },
            { tag: 'Equilibrio', title: 'Romberg y marcha', text: 'Romberg + vestibular y cordonal; marcha en estrella de Babinski.', tone: 'gold' },
            { tag: 'Provocado', title: 'Nistagmo y calórica', text: 'Prueba rotatoria (sillón de Bárány); prueba calórica.', tone: 'lilac' },
          ],
        },
      ],
      refs: [P5('00:47'), P5('01:31'), P5('04:26'), P5('07:17'), P5('08:40'), P5('10:52'), P5('14:23'), P5('17:47'), P5('20:33'), P5('22:37'), P5('24:40')],
    },
    {
      id: 'bajos',
      kicker: 'Clave',
      title: 'IX, X, XI, XII y la lengua',
      priority: 'imprescindible',
      summary: 'La lengua: V y VII adelante, IX atrás, XII motor. IX y X: faringe, velo, laringe; signo de la cortina. XI: ECM y trapecio. XII: la lengua se desvía al lado paralizado.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Pregunta de siempre', text: '«Hay una pregunta que hacen siempre en el parcial… es cómo está inervada la lengua.»', refs: [P4('07:02')] },
        {
          t: 'table',
          head: ['Zona', 'Tacto', 'Gusto', 'Motor'],
          rows: [
            ['2/3 anteriores', '**V** (maxilar inferior)', '**VII**', '**XII**'],
            ['1/3 posterior', '**IX**', '**IX**', '**XII**'],
            ['Palatogloso', '—', '—', 'X'],
          ],
        },
        {
          t: 'cards',
          cols: 2,
          items: [
            { tag: 'IX glosofaríngeo', title: 'Faringe y tercio posterior', text: 'Constrictor superior; sensibilidad de la faringe; seno carotídeo; parótida. Neuralgia: dolor lancinante al tragar.', tone: 'gold' },
            { tag: 'X vago', title: 'Velo, laringe y vísceras', text: 'Constrictores medio e inferior, velo, laringe (voz); parasimpático torácico y abdominal. **Signo de la cortina**: la úvula se va al lado sano.', tone: 'sky' },
            { tag: 'XI espinal', title: 'ECM y trapecio', text: 'Girar y flexionar la cabeza, elevar los hombros.', tone: 'peach' },
            { tag: 'XII hipogloso', title: 'Lengua', text: 'Parálisis: atrofia, fasciculaciones y **desvío de la punta hacia el lado paralizado**; disartria.', tone: 'mint' },
          ],
        },
      ],
      refs: [P4('07:44'), P6('00:02'), P6('00:56'), P6('03:47'), P6('05:47'), P6('08:02'), P6('11:06'), P6('15:25'), P6('17:29'), P6('19:34')],
    },
  ],

  developments: [
    {
      id: 'neu04-d01',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'bajos',
      question: '¿Cómo está inervada la lengua?',
      quote: { text: '«…hay una pregunta que hacen siempre en el parcial… es cómo está inervada la lengua»', refs: [P4('07:02')] },
      answer: [
        { t: 'p', text: '**Dos tercios anteriores**: sensibilidad (tacto) por el **V** (rama maxilar inferior, nervio lingual) y gusto por el **VII**.' },
        { t: 'p', text: '**Tercio posterior**: sensibilidad y gusto por el **IX**. **Motora**: **XII** (todos los músculos menos el palatogloso, que es del X).' },
      ],
      refs: [P4('07:44'), P6('00:56'), P6('03:47')],
    },
    {
      id: 'neu04-d02',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'facial',
      question: 'Diferencie la parálisis facial central de la periférica.',
      quote: { text: '«…parálisis facial central, parálisis facial periférica: no me pueden no saber eso»', refs: [P4('25:06')] },
      answer: [
        { t: 'p', text: '**Central** (corteza o vía): solo la **mitad inferior** de la cara, del lado **opuesto** a la lesión; la frente se arruga (doble inervación cortical); signo del fumador de pipa.' },
        { t: 'p', text: '**Periférica** (núcleo o nervio): **toda la hemicara** del **mismo lado**; frente lisa, no cierra el ojo; **Bell** (el globo gira hacia arriba al intentar cerrar) y **Negro**.' },
      ],
      refs: [P4('23:42'), P4('24:22')],
    },
    {
      id: 'neu04-d03',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'vestibulococlear',
      question: '¿Qué pruebas conoce para evaluar la vía auditiva? ¿Cómo distingue una hipoacusia de conducción de una de percepción?',
      quote: { text: '«La prueba de Weber es la prueba que más tienen que conocer… no se tienen que olvidar de eso»', refs: [P5('11:21')] },
      answer: [
        { t: 'p', text: 'Agudeza auditiva (voz, reloj, frote de dedos), **Weber**, **Rinne**, Schwabach; audiometría, potenciales evocados, otoscopia.' },
        { t: 'p', text: '**Conducción** (oído externo o medio): Weber lateralizado al oído **enfermo**; Rinne **negativo** (hueso > aire). **Percepción** (oído interno o nervio): Weber al oído **sano**; Rinne positivo.' },
      ],
      refs: [P5('06:35'), P5('07:17'), P5('10:52'), P5('16:26')],
    },
    {
      id: 'neu04-d04',
      origen: 'clase',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'facial',
      question: '¿Cuáles son las funciones del VII par y cómo se explora?',
      quote: { text: '«Otro par muy importante, otro par que pregunta muchísimo»', refs: [P4('17:53')] },
      answer: [
        { t: 'p', text: '**Motor** de los músculos de la cara (y el vientre posterior del digástico); **sensorial**: gusto de los 2/3 anteriores de la lengua; **neurovegetativo**: secreción lagrimal y salival.' },
        { t: 'p', text: 'Se explora con mímicas (arrugar la frente, cerrar los ojos, inflar las mejillas, mostrar los dientes) y el gusto. Alteraciones: parálisis facial central o periférica; ageusia, hipogeusia, parageusia.' },
      ],
      refs: [P4('18:08'), P4('25:44'), P4('26:25'), P4('27:05')],
    },
    {
      id: 'neu04-d05',
      origen: 'practica',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'trigemino',
      question: 'Describa las funciones del trigémino y su exploración.',
      answer: [
        { t: 'p', text: 'Motor de la masticación (temporal, masetero, pterigoideos). Sensitivo de la cara por V1 (oftálmica), V2 (maxilar superior) y V3 (maxilar inferior, que además lleva el tacto de los 2/3 anteriores de la lengua). Ganglio de Gasser → protuberancia → tálamo.' },
        { t: 'p', text: 'Exploración: tacto, dolor, temperatura y vibración en las tres ramas; fuerza al abrir la boca; reflejos corneano, superciliar, nasopalpebral y maseterino.' },
      ],
      refs: [P4('05:39'), P4('06:20'), P4('11:55'), P4('14:39')],
    },
    {
      id: 'neu04-d06',
      origen: 'practica',
      prio: 'P2',
      priority: 'complementario',
      ficha: 'bajos',
      question: '¿Cómo se explora el IX y el X par? ¿Qué es el signo de la cortina?',
      answer: [
        { t: 'p', text: 'Se pide al paciente que diga «ah» con un bajalenguas: el velo sube parejo. **Signo de la cortina**: el lado paralizado no sube y la úvula se desvía hacia el lado sano. Reflejo nauseoso; prueba del vaso de agua; voz (laringe).' },
      ],
      refs: [P6('04:45'), P6('05:47'), P6('11:06'), P6('12:36')],
    },
  ],

  mcq: [
    { id: 'neu04-q01', origen: 'practica', topic: 'Lengua', difficulty: 1, emphasis: true, stem: 'El gusto de los dos tercios anteriores de la lengua depende del:', options: [{ text: 'VII par.', why: 'Correcto.' }, { text: 'V par.', why: 'Lleva el tacto.' }, { text: 'IX par.', why: 'Es el tercio posterior.' }, { text: 'XII par.', why: 'Es motor.' }], answer: 0, refs: [P4('27:05'), P6('03:47')] },
    { id: 'neu04-q02', origen: 'practica', topic: 'Lengua', difficulty: 2, emphasis: true, stem: 'La sensibilidad táctil de los dos tercios anteriores de la lengua depende del:', options: [{ text: 'V par (maxilar inferior).', why: 'Correcto.' }, { text: 'VII par.', why: 'Lleva el gusto.' }, { text: 'IX par.', why: 'Es del tercio posterior.' }, { text: 'X par.', why: 'No.' }], answer: 0, refs: [P4('07:02')] },
    { id: 'neu04-q03', origen: 'practica', topic: 'Facial', difficulty: 2, emphasis: true, stem: 'Una parálisis facial que respeta la frente es:', options: [{ text: 'Central, del lado opuesto a la lesión.', why: 'Correcto.' }, { text: 'Periférica.', why: 'La periférica afecta la frente.' }, { text: 'Del V par.', why: 'No.' }, { text: 'Bilateral siempre.', why: 'No.' }], answer: 0, refs: [P4('23:42')] },
    { id: 'neu04-q04', origen: 'practica', topic: 'Facial', difficulty: 2, stem: 'Al intentar cerrar el ojo paralizado, el globo gira hacia arriba. Es el signo de:', options: [{ text: 'Bell.', why: 'Correcto.' }, { text: 'Negro.', why: 'Es al mirar hacia arriba.' }, { text: 'Babinski.', why: 'Es plantar.' }, { text: 'Romberg.', why: 'Es del equilibrio.' }], answer: 0, refs: [P4('24:22')] },
    { id: 'neu04-q05', origen: 'practica', topic: 'VIII', difficulty: 2, emphasis: true, stem: 'En una hipoacusia de conducción del oído izquierdo, el Weber se lateraliza:', options: [{ text: 'Hacia el oído izquierdo (enfermo).', why: 'Correcto.' }, { text: 'Hacia el oído derecho.', why: 'Eso es en la de percepción.' }, { text: 'Al centro.', why: 'Es lo normal.' }, { text: 'No se oye.', why: 'No.' }], answer: 0, refs: [P5('10:52')] },
    { id: 'neu04-q06', origen: 'practica', topic: 'VIII', difficulty: 2, stem: 'Un Rinne negativo (se oye mejor por hueso que por aire) indica:', options: [{ text: 'Hipoacusia de conducción.', why: 'Correcto.' }, { text: 'Hipoacusia de percepción.', why: 'El Rinne sigue positivo.' }, { text: 'Audición normal.', why: 'Lo normal es Rinne positivo.' }, { text: 'Vértigo central.', why: 'No.' }], answer: 0, refs: [P5('15:44')] },
    { id: 'neu04-q07', origen: 'practica', topic: 'IX y X', difficulty: 2, stem: 'Al decir «ah», la úvula se desvía hacia la izquierda. El lado paralizado es:', options: [{ text: 'El derecho.', why: 'Correcto: la úvula se va al lado sano.' }, { text: 'El izquierdo.', why: 'Al revés.' }, { text: 'Ambos.', why: 'Quedaría al medio sin moverse.' }, { text: 'Ninguno.', why: 'No.' }], answer: 0, refs: [P6('05:47')] },
    { id: 'neu04-q08', origen: 'practica', topic: 'XII', difficulty: 2, stem: 'En la parálisis del hipogloso izquierdo, la lengua protruida se desvía:', options: [{ text: 'Hacia la izquierda (lado paralizado).', why: 'Correcto.' }, { text: 'Hacia la derecha.', why: 'No.' }, { text: 'Hacia arriba.', why: 'No.' }, { text: 'No se desvía.', why: 'Sí.' }], answer: 0, refs: [P6('19:34')] },
    { id: 'neu04-q09', origen: 'practica', topic: 'XI', difficulty: 1, stem: 'El esternocleidomastoideo y el trapecio están inervados por el:', options: [{ text: 'XI par (espinal).', why: 'Correcto.' }, { text: 'XII par.', why: 'Es la lengua.' }, { text: 'X par.', why: 'No.' }, { text: 'VII par.', why: 'No.' }], answer: 0, refs: [P6('15:25')] },
    { id: 'neu04-q10', origen: 'practica', topic: 'V', difficulty: 2, stem: 'El reflejo corneano tiene como vía aferente el:', options: [{ text: 'V par.', why: 'Correcto (la eferente es el VII).' }, { text: 'II par.', why: 'Es el fotomotor.' }, { text: 'III par.', why: 'No.' }, { text: 'VIII par.', why: 'No.' }], answer: 0, refs: [P4('14:39')] },
  ],

  memory: [
    {
      id: 'neu04-m01',
      title: 'La lengua',
      purpose: 'La pregunta de siempre.',
      evaluates: [{ t: 'list', items: ['2/3 anteriores: tacto V, gusto VII', '1/3 posterior: IX', 'Motor: XII (palatogloso, X)'] }],
      interpret: 'Adelante dos pares, atrás uno solo, y el XII mueve todo.',
      mnemonic: { hook: '5 toca, 7 saborea, 9 hace todo atrás, 12 mueve.', explain: 'Tacto anterior V, gusto anterior VII, posterior IX, motor XII.' },
      recall: { q: '¿Qué par lleva el gusto del tercio posterior de la lengua?', a: 'El IX, el glosofaríngeo (también el tacto).' },
    },
    {
      id: 'neu04-m02',
      title: 'Facial central y periférica',
      purpose: '«No me pueden no saber eso.»',
      evaluates: [{ t: 'list', items: ['Central: mitad inferior, contralateral, frente sana', 'Periférica: hemicara entera, homolateral, Bell'] }],
      interpret: 'Si la frente se arruga, la lesión es central.',
      mnemonic: { hook: 'Frente que se arruga, lesión que está arriba.', explain: 'La frente tiene doble inervación cortical.' },
      recall: { q: '¿Qué parálisis facial respeta la frente?', a: 'La central.' },
    },
    {
      id: 'neu04-m03',
      title: 'Weber',
      purpose: 'La prueba que más se pregunta.',
      evaluates: [{ t: 'list', items: ['Conducción → al oído enfermo', 'Percepción → al oído sano'] }],
      interpret: 'En la de conducción el oído interno está sano y oye el hueso.',
      mnemonic: { hook: 'Conducción: Con el enfermo. Percepción: Para el sano.', explain: 'Hacia dónde se lateraliza el Weber.' },
      recall: { q: '¿Hacia dónde se lateraliza el Weber en la hipoacusia de percepción?', a: 'Hacia el oído sano.' },
    },
  ],

  closing: {
    map: {
      center: 'Pares craneales II',
      nodes: [
        { label: 'V', tone: 'gold', items: ['Masticación', 'V1, V2, V3', 'Corneano'] },
        { label: 'VII', tone: 'sky', items: ['Central vs periférica', 'Bell', 'Gusto anterior'] },
        { label: 'VIII', tone: 'lilac', items: ['Weber', 'Rinne', 'Ojos de muñeca'] },
        { label: 'IX a XII', tone: 'mint', items: ['Lengua', 'Cortina', 'Hipogloso'] },
      ],
    },
    essentials: [
      'V: masticación y sensibilidad de la cara (V1, V2, V3); Gasser → protuberancia → tálamo; reflejo **corneano**.',
      'VII: motor de la cara, gusto de los 2/3 anteriores, lágrima y saliva. **Central**: mitad inferior contralateral, frente sana. **Periférica**: hemicara homolateral, Bell.',
      'VIII: coclear (Corti) y vestibular. **Weber**: conducción al enfermo, percepción al sano. **Rinne negativo** = conducción.',
      'Lengua: tacto anterior **V**, gusto anterior **VII**, posterior **IX**, motor **XII**.',
      'IX y X: faringe, velo, laringe; **cortina**: úvula al lado sano. XI: ECM y trapecio. XII: la lengua va al lado **paralizado**.',
    ],
    links: [
      { chapterId: 'neu-03', text: '[[neu-03|Pares craneales I]]: I, II, III, IV y VI.' },
      { chapterId: 'neu-01', text: '[[neu-01|Motivos de consulta I]]: neuralgia del trigémino y vértigo.' },
      { chapterId: 'neu-05', text: '[[neu-05|Síndromes motores]]: la parálisis facial central del síndrome piramidal.' },
    ],
    pitfalls: [
      'Decir que la parálisis facial central afecta la frente.',
      'Darle al VII la sensibilidad de la cara (es del V).',
      'Invertir el Weber (conducción va al oído enfermo).',
      'Decir que la úvula se va hacia el lado paralizado (va al sano).',
      'Decir que la lengua se va hacia el lado sano (va al paralizado).',
    ],
    miniExam: [
      {
        id: 'neu04-x01',
        origen: 'practica',
        topic: 'Integración',
        difficulty: 2,
        stem: 'Paciente con hemiplejía derecha por un ACV: tiene la comisura bucal derecha caída pero arruga bien la frente de los dos lados. La parálisis facial es:',
        options: [
          { text: 'Central derecha, por lesión del hemisferio izquierdo.', why: 'Correcto.' },
          { text: 'Periférica derecha.', why: 'Afectaría la frente.' },
          { text: 'Periférica izquierda.', why: 'No.' },
          { text: 'No es facial.', why: 'Sí lo es.' },
        ],
        answer: 0,
        refs: [P4('23:42'), P4('24:22')],
      },
    ],
  },

  clase,
  diagrams: {},
};

export default chapter;
