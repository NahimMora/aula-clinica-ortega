import type { Chapter, SourceRef } from '@/types';
import { clase } from './clase';

/*
 * neu-03 — Pares craneales I: generalidades, I olfatorio, II óptico (vía óptica, hemianopsias, exploración) y los
 * oculomotores III, IV y VI con la pupila. Fuente: clases «Pares craneales» 1–3 de Ortega. Lo que marca como
 * pregunta: el olfatorio sin tálamo, el recorrido del óptico, la vía óptica («como el Padre Nuestro»), las
 * hemianopsias, qué músculo inerva cada oculomotor, la parálisis del III y del IV, y el nistagmo.
 * Ver content/traceability/neu-03.md.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const P1 = (t: string) => r('pc-1', t);
const P2 = (t: string) => r('pc-2', t);
const P3 = (t: string) => r('pc-3', t);

const chapter: Chapter = {
  id: 'neu-03',
  systemId: 'neuro',
  title: 'Pares craneales I',
  subtitle: 'Clasificación y origen de los pares, el olfatorio, el óptico (vía óptica, hemianopsias y exploración) y los oculomotores III, IV y VI con la pupila y el nistagmo.',
  estimatedMinutes: 45,
  sources: [P1('00:01–31:31'), P2('00:02–35:52'), P3('00:04–34:29')],

  map: {
    center: 'Pares craneales I',
    why: 'Lo que se pregunta: el **olfatorio**, «el único que no hace sinapsis en el tálamo»; el **recorrido del óptico** («por todos los doctores»); la **vía óptica** («como el Padre Nuestro») y las **hemianopsias** («lo van a preguntar siempre»); **qué músculo inerva el III, el IV y el VI**; la **parálisis del III**; y el **nistagmo**.',
    prereqs: [
      { label: 'El tálamo (neu-01)', detail: 'Todas las vías sensitivas menos el olfato.', chapterId: 'neu-01' },
      { label: 'Facies y conciencia (primer parcial)', detail: 'Claude Bernard-Horner, parálisis facial, pupilas en el coma.' },
    ],
    branches: [
      { id: 'generalidades', label: 'Generalidades', tone: 'gold', items: ['Motores, sensoriales, mixtos', 'Origen aparente'] },
      { id: 'olfatorio', label: 'I olfatorio', tone: 'mint', items: ['Bulbo → uncus', 'Sin tálamo ★'] },
      { id: 'optico', label: 'II óptico', tone: 'sky', items: ['Recorrido ★', 'Vía óptica ★', 'Hemianopsias ★'] },
      { id: 'oculomotores', label: 'III, IV y VI', tone: 'peach', items: ['Músculos ★', 'Parálisis', 'Nistagmo ★', 'Pupila'] },
    ],
    outcomes: [
      'Clasificar los doce pares y ubicar dónde nace cada uno.',
      'Recorrer la **vía olfatoria** y la **vía óptica**, y predecir el **campo visual** de cada lesión.',
      'Decir **qué músculo inerva** el III, el IV y el VI y reconocer cada **parálisis**.',
      'Describir el **reflejo fotomotor** y el **nistagmo** central y periférico.',
    ],
  },

  theory: [
    {
      id: 'generalidades',
      kicker: 'Generalidades',
      title: 'Los doce pares',
      priority: 'muy-importante',
      summary: 'Motores (III, IV, VI, XI, XII), sensoriales (I, II, VIII), mixtos (V, VII, IX, X); parasimpáticos III, VII, IX, X. I y II intracraneales; III–IV mesencéfalo; V–VIII protuberancia; IX–XII bulbo.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'El examen físico', text: 'El examen físico del sistema nervioso «es lo que más preguntan en el parcial». Repasar del primer parcial las **facies** (parálisis facial central y periférica, parkinsoniana, miasténica, **Claude Bernard-Horner**, Pourfour du Petit), la **actitud**, la **marcha** y el **estado de conciencia**.', refs: [P1('01:31'), P1('02:53'), P1('03:39')] },
        {
          t: 'table',
          head: ['Tipo', 'Pares', 'Función'],
          rows: [
            ['Motores', 'III, IV, VI, XI, XII', 'Ojo; cuello y hombro; lengua'],
            ['Sensoriales', 'I, II, VIII', 'Olfato, visión, audición'],
            ['Mixtos', 'V, VII, IX, X', 'Motores y sensitivos o sensoriales'],
            ['Con fibras parasimpáticas', 'III, VII, IX, X', 'Vegetativos'],
          ],
        },
        {
          t: 'cards',
          cols: 4,
          items: [
            { tag: 'Intracraneales', title: 'I y II', text: 'No nacen del tronco.', tone: 'mint' },
            { tag: 'Mesencéfalo', title: 'III y IV', text: 'El III por delante; el IV por detrás.', tone: 'gold' },
            { tag: 'Protuberancia', title: 'V a VIII', text: 'VI, VII y VIII en el surco bulboprotuberancial.', tone: 'gold' },
            { tag: 'Bulbo', title: 'IX a XII', text: 'Glosofaríngeo, vago, espinal, hipogloso.', tone: 'gold' },
          ],
        },
      ],
      refs: [P1('05:42'), P1('06:23'), P1('07:03'), P1('07:44'), P1('08:25'), P1('09:07'), P1('09:47')],
    },
    {
      id: 'olfatorio',
      kicker: 'Clave',
      title: 'I par: olfatorio',
      priority: 'imprescindible',
      summary: 'Mucosa olfatoria → bulbo olfatorio → uncus del hipocampo. El único par sensorial que no hace sinapsis en el tálamo.',
      blocks: [
        {
          t: 'steps',
          title: 'La vía olfatoria',
          items: [
            { title: '1.ª neurona', text: 'Mucosa olfatoria («mancha amarilla»), bajo la lámina cribosa del etmoides.' },
            { title: '2.ª neurona', text: '**Bulbo olfatorio**.' },
            { title: '3.ª neurona', text: '**Uncus del hipocampo** (área periamigdalina). **Sin tálamo**.' },
          ],
        },
        { t: 'callout', kind: 'prof', title: 'Pregunta de parcial', text: '«Es el único nervio sensorial que no hace escala en el tálamo.»', refs: [P1('13:13'), P1('14:33')] },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Cuantitativas', title: 'Hiper, hipo, anosmia', text: 'Más, menos o nada de olfato.', tone: 'sky' },
            { tag: 'Cualitativas', title: 'Parosmia, cacosmia', text: 'Olor distorsionado; olores desagradables (embarazo).', tone: 'lilac' },
            { tag: 'Alucinaciones', title: 'Crisis uncinadas', text: 'Olor sin estímulo: lesión del **uncus**, no del nervio.', tone: 'red' },
          ],
        },
        { t: 'callout', kind: 'tip', title: 'Causas y exploración', text: 'La más frecuente: el **resfrío**; traumatismos, fractura de la base del cráneo, tumores, **Parkinson** (atrofia del bulbo). Bilateral e inflamatoria (covid): reversible. Se explora con los ojos cerrados, **una narina por vez**, con sustancias no irritantes.', refs: [P1('15:17'), P1('19:17'), P1('20:40')] },
      ],
      refs: [P1('10:33'), P1('11:13'), P1('11:53'), P1('12:33'), P1('15:57'), P1('16:37'), P1('17:57'), P1('18:37')],
    },
    {
      id: 'optico',
      kicker: 'Clave',
      title: 'II par: óptico',
      priority: 'imprescindible',
      summary: 'Origen real en las células ganglionares; aparente en el quiasma. Cruzan las fibras nasales. Lesión del nervio: amaurosis; del quiasma: hemianopsia bitemporal; retroquiasmática: homónima.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Para el parcial', text: 'El recorrido: «esto es pregunta de parcial por todos los doctores». La vía óptica: «la tienen que saber como si fuese el Padre Nuestro». Las hemianopsias: «lo van a preguntar siempre en el parcial».', refs: [P1('23:53'), P1('24:42'), P2('10:33')] },
        {
          t: 'steps',
          title: 'Recorrido y vía óptica',
          items: [
            { title: 'Retina', text: 'Conos y bastones → bipolares → **ganglionares** (origen real).' },
            { title: 'Nervio óptico', text: 'Porciones **intraocular, intraorbitaria, intracanalicular e intracraneal**.' },
            { title: 'Quiasma', text: 'Cruzan **las fibras nasales**, que ven los campos temporales.' },
            { title: 'Cintillas', text: 'Hasta el **geniculado externo** del tálamo.' },
            { title: 'Radiaciones → calcarina', text: 'Las **inferiores** ven el campo **superior**; las superiores, el inferior. Corteza occipital (áreas 17, 18, 19).' },
          ],
        },
        {
          t: 'table',
          head: ['Lesión', 'Defecto', 'Tipo'],
          rows: [
            ['Nervio óptico', '**Amaurosis** de ese ojo', 'Prequiasmática'],
            ['Quiasma', '**Hemianopsia bitemporal**', 'Heterónima'],
            ['Cintilla', '**Hemianopsia homónima** del lado opuesto', 'Retroquiasmática'],
            ['Radiaciones', '**Cuadrantanopsia homónima** (superior si son las inferiores)', 'Retroquiasmática'],
          ],
        },
        { t: 'callout', kind: 'note', title: 'Cómo se nombra', text: 'La hemianopsia homónima se nombra por el **campo perdido**: la lesión de la cintilla izquierda da una hemianopsia homónima **derecha**.' },
        {
          t: 'cards',
          cols: 4,
          items: [
            { tag: 'Agudeza visual', title: 'Snellen y Jaeger', text: 'Baja: ambliopía.', tone: 'sky' },
            { tag: 'Colores', title: 'Ishihara', text: 'Discromatopsia; daltonismo (rojo y verde).', tone: 'gold' },
            { tag: 'Campo visual', title: 'Confrontación', text: 'Campimetría en el consultorio.', tone: 'lilac' },
            { tag: 'Fondo de ojo', title: 'Oftalmoscopio', text: 'Lo hace el oftalmólogo.', tone: 'red' },
          ],
        },
      ],
      refs: [P1('21:20'), P1('22:41'), P1('23:21'), P1('25:23'), P1('27:24'), P1('30:08'), P2('00:45'), P2('05:03'), P2('06:28'), P2('07:17'), P2('11:39'), P2('13:55'), P2('19:13'), P2('20:45'), P3('00:46'), P3('01:29'), P3('02:10'), P3('02:57')],
    },
    {
      id: 'oculomotores',
      kicker: 'Clave',
      title: 'III, IV y VI, la pupila y el nistagmo',
      priority: 'imprescindible',
      summary: 'III: rectos superior, inferior, interno, oblicuo inferior, elevador del párpado y pupila. IV: oblicuo superior. VI: recto externo.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Pregunta de parcial', text: '«Lo que sí le pueden llegar a preguntar es qué músculo del ojo inerva el tercer par, el cuarto par y el sexto par. Eso es pregunta de parcial, y eso sí lo tienen que saber.»', refs: [P3('10:54')] },
        {
          t: 'table',
          head: ['Par', 'Músculos', 'Si se paraliza'],
          rows: [
            ['**III** motor ocular común', 'Rectos superior, inferior e interno; oblicuo inferior; elevador del párpado; pupila (miosis)', 'Ojo **afuera y abajo**, **ptosis**, **midriasis** (parcial: la pupila responde)'],
            ['**IV** patético', '**Oblicuo superior**: abajo y adentro', 'El ojo queda **alto**; diplopía al mirar abajo (Bielschowsky)'],
            ['**VI** motor ocular externo', '**Recto externo**: afuera', 'Ojo **desviado hacia adentro**'],
          ],
        },
        { t: 'callout', kind: 'clinic', title: 'Diplopía y estrabismo', text: 'La diplopía **aparece al mirar hacia el lado del músculo paralizado**; horizontal (imágenes lado a lado) o vertical (una sobre otra). La motilidad se explora dibujando una **H**.', refs: [P3('22:20'), P3('23:04'), P3('23:45')] },
        {
          t: 'compare',
          title: 'Nistagmo: pregunta de parcial y de final',
          cols: [
            { title: 'Central (cerebelo)', tone: 'red', items: ['Horizontal o **vertical**', 'Sin otros síntomas vestibulares'] },
            { title: 'Periférico (vestíbulo)', tone: 'sky', items: ['Horizontal-**rotatorio**', 'Con vértigo'] },
          ],
        },
        {
          t: 'steps',
          title: 'Reflejo fotomotor (5 componentes)',
          items: [
            { title: 'Estímulo', text: 'La luz.' },
            { title: 'Vía aferente', text: 'El **II par**.' },
            { title: 'Centro', text: 'Núcleo de **Edinger-Westphal** (parasimpático, mesencéfalo).' },
            { title: 'Vía eferente', text: 'Fibras parasimpáticas del **III par**.' },
            { title: 'Respuesta', text: '**Miosis**; también en el otro ojo (**consensual**).' },
          ],
        },
      ],
      refs: [P3('04:19'), P3('05:05'), P3('06:32'), P3('07:57'), P3('08:43'), P3('09:26'), P3('10:14'), P3('22:14'), P3('25:20'), P3('26:01'), P3('28:51'), P3('29:32'), P3('31:37'), P3('33:03'), P3('33:48')],
    },
  ],

  developments: [
    {
      id: 'neu03-d01',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'optico',
      question: 'Describa la vía óptica y las lesiones del campo visual según su localización.',
      quote: { text: '«…la tienen que saber como si fuese el Padre Nuestro» · «hemianopsia… lo van a preguntar siempre en el parcial»', refs: [P1('24:42'), P2('10:33')] },
      answer: [
        { t: 'p', text: '**Vía**: retina (conos y bastones → bipolares → ganglionares) → nervio óptico → **quiasma** (cruzan las fibras **nasales**, que ven los campos temporales) → cintillas → **geniculado externo** del tálamo → radiaciones ópticas → **cisura calcarina** (occipital).' },
        { t: 'p', text: '**Nervio óptico**: amaurosis homolateral. **Quiasma**: hemianopsia **heterónima bitemporal**. **Cintilla**: hemianopsia **homónima** del lado opuesto. **Radiaciones**: cuadrantanopsia homónima (las inferiores ven el campo superior).' },
      ],
      refs: [P1('25:23'), P1('27:24'), P2('05:03'), P2('06:28'), P2('13:55'), P2('14:35'), P2('19:13')],
    },
    {
      id: 'neu03-d02',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'oculomotores',
      question: '¿Qué músculos inervan el III, el IV y el VI par? ¿Cómo queda el ojo en la parálisis de cada uno?',
      quote: { text: '«…qué músculo del ojo inerva el tercer par, el cuarto par y el sexto par. Eso es pregunta de parcial»', refs: [P3('10:54')] },
      answer: [
        { t: 'p', text: '**III**: rectos superior, inferior e interno, oblicuo inferior, elevador del párpado y el esfínter de la pupila. Parálisis completa: ojo afuera y abajo, ptosis y midriasis; parcial: la pupila responde.' },
        { t: 'p', text: '**IV**: oblicuo superior (abajo y adentro). Parálisis: el ojo queda alto, diplopía al mirar abajo. **VI**: recto externo. Parálisis: ojo desviado hacia adentro.' },
      ],
      refs: [P3('07:57'), P3('12:23'), P3('13:09'), P3('18:53'), P3('29:32'), P3('30:14')],
    },
    {
      id: 'neu03-d03',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'olfatorio',
      question: 'Describa la vía olfatoria. ¿Qué la distingue de las otras vías sensoriales?',
      quote: { text: '«…es el único nervio sensorial que no hace escala en el tálamo»', refs: [P1('14:33')] },
      answer: [
        { t: 'p', text: 'Mucosa olfatoria (1.ª neurona) → **bulbo olfatorio** (2.ª) → **uncus del hipocampo** (3.ª). Es el único par sensorial que **no hace sinapsis en el tálamo**.' },
        { t: 'p', text: 'Alteraciones: hiposmia, anosmia, hiperosmia; parosmia, cacosmia; alucinaciones (lesión del uncus: crisis uncinadas). Causa más frecuente: el resfrío; también el Parkinson.' },
      ],
      refs: [P1('11:13'), P1('12:33'), P1('15:57'), P1('18:37'), P1('19:17')],
    },
    {
      id: 'neu03-d04',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'oculomotores',
      question: '¿Qué es el nistagmo? Diferencie el central del periférico.',
      quote: { text: '«Esto es pregunta de parcial… le encanta preguntar nistagmo, tanto en el parcial como en los finales»', refs: [P3('22:14')] },
      answer: [
        { t: 'p', text: 'Movimientos **oscilatorios** de los ojos (horizontales, verticales o rotatorios); fisiológico (provocado) o patológico. Se describe por su sentido, fase, dirección, frecuencia e intensidad (grado 1 a 3).' },
        { t: 'p', text: '**Central** (cerebelo): horizontal o vertical. **Periférico** (vestíbulo): horizontal-rotatorio, con vértigo.' },
      ],
      refs: [P3('24:30'), P3('25:20'), P3('26:01'), P3('27:25'), P3('28:51')],
    },
    {
      id: 'neu03-d05',
      origen: 'clase',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'optico',
      question: '¿Cuál es el recorrido del nervio óptico?',
      quote: { text: '«…esto es pregunta de parcial por todos los doctores»', refs: [P1('23:53')] },
      answer: [
        { t: 'p', text: 'Origen real: células ganglionares de la retina; aparente: el quiasma. Cuatro porciones: **intraocular**, **intraorbitaria**, **intracanalicular** (agujero óptico) e **intracraneal** (hasta el quiasma).' },
      ],
      refs: [P1('22:01'), P1('22:41'), P1('23:21')],
    },
    {
      id: 'neu03-d06',
      origen: 'practica',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'oculomotores',
      question: 'Describa los componentes del reflejo fotomotor.',
      answer: [
        { t: 'p', text: 'Estímulo (luz) → vía aferente (**II par**) → centro (**Edinger-Westphal**, mesencéfalo) → vía eferente (fibras parasimpáticas del **III par**) → respuesta (**miosis**). Consensual: se contrae también la pupila del otro ojo.' },
      ],
      refs: [P2('30:48'), P2('31:34'), P3('33:03'), P3('33:48')],
    },
  ],

  mcq: [
    { id: 'neu03-q01', origen: 'practica', topic: 'Olfatorio', difficulty: 1, emphasis: true, stem: 'El único par sensorial que no hace sinapsis en el tálamo es el:', options: [{ text: 'Olfatorio.', why: 'Correcto.' }, { text: 'Óptico.', why: 'Hace sinapsis en el geniculado.' }, { text: 'Auditivo.', why: 'Pasa por el tálamo.' }, { text: 'Trigémino.', why: 'Pasa por el tálamo.' }], answer: 0, refs: [P1('14:33')] },
    { id: 'neu03-q02', origen: 'practica', topic: 'Vía óptica', difficulty: 2, emphasis: true, stem: 'En el quiasma óptico se cruzan las fibras:', options: [{ text: 'Nasales, que ven los campos temporales.', why: 'Correcto.' }, { text: 'Temporales, que ven los campos nasales.', why: 'Siguen del mismo lado.' }, { text: 'Todas.', why: 'No.' }, { text: 'Ninguna.', why: 'No.' }], answer: 0, refs: [P1('27:24'), P2('00:45')] },
    { id: 'neu03-q03', origen: 'practica', topic: 'Hemianopsias', difficulty: 2, emphasis: true, stem: 'Un tumor de hipófisis que comprime el quiasma da típicamente:', options: [{ text: 'Hemianopsia bitemporal.', why: 'Correcto.' }, { text: 'Hemianopsia homónima.', why: 'Es retroquiasmática.' }, { text: 'Amaurosis unilateral.', why: 'Es del nervio óptico.' }, { text: 'Cuadrantanopsia.', why: 'Es de las radiaciones.' }], answer: 0, refs: [P2('13:55')] },
    { id: 'neu03-q04', origen: 'practica', topic: 'Hemianopsias', difficulty: 2, stem: 'Una lesión de la cintilla óptica izquierda produce:', options: [{ text: 'Hemianopsia homónima derecha.', why: 'Correcto.' }, { text: 'Hemianopsia bitemporal.', why: 'Es del quiasma.' }, { text: 'Ceguera del ojo izquierdo.', why: 'Es del nervio óptico.' }, { text: 'Hemianopsia homónima izquierda.', why: 'Se pierde el campo del lado opuesto.' }], answer: 0, refs: [P2('08:46'), P2('09:28')] },
    { id: 'neu03-q05', origen: 'practica', topic: 'Oculomotores', difficulty: 1, emphasis: true, stem: 'El recto externo está inervado por el:', options: [{ text: 'VI par.', why: 'Correcto.' }, { text: 'III par.', why: 'Inerva los otros rectos.' }, { text: 'IV par.', why: 'Inerva el oblicuo superior.' }, { text: 'V par.', why: 'No.' }], answer: 0, refs: [P3('18:53')] },
    { id: 'neu03-q06', origen: 'practica', topic: 'Oculomotores', difficulty: 2, stem: 'El oblicuo superior, que lleva el ojo abajo y adentro, está inervado por el:', options: [{ text: 'IV par (patético).', why: 'Correcto.' }, { text: 'III par.', why: 'Inerva el oblicuo inferior.' }, { text: 'VI par.', why: 'Inerva el recto externo.' }, { text: 'VII par.', why: 'No.' }], answer: 0, refs: [P3('17:30')] },
    { id: 'neu03-q07', origen: 'practica', topic: 'Parálisis', difficulty: 2, emphasis: true, stem: 'Ptosis, ojo desviado afuera y abajo y midriasis arreactiva indican:', options: [{ text: 'Parálisis completa del III par.', why: 'Correcto.' }, { text: 'Parálisis parcial del III par.', why: 'En la parcial la pupila responde.' }, { text: 'Síndrome de Claude Bernard-Horner.', why: 'Da ptosis con miosis.' }, { text: 'Parálisis del VI.', why: 'Da el ojo adentro.' }], answer: 0, refs: [P3('07:16'), P3('29:32')] },
    { id: 'neu03-q08', origen: 'practica', topic: 'Fotomotor', difficulty: 2, stem: 'La vía eferente del reflejo fotomotor es:', options: [{ text: 'El III par (fibras parasimpáticas).', why: 'Correcto.' }, { text: 'El II par.', why: 'Es la aferente.' }, { text: 'El simpático cervical.', why: 'Dilata la pupila.' }, { text: 'El V par.', why: 'Es la aferente del corneal.' }], answer: 0, refs: [P2('33:48'), P3('33:03')] },
    { id: 'neu03-q09', origen: 'practica', topic: 'Nistagmo', difficulty: 2, stem: 'Un nistagmo vertical orienta a una lesión:', options: [{ text: 'Central (cerebelo, tronco).', why: 'Correcto.' }, { text: 'Del vestíbulo.', why: 'Da nistagmo horizontal-rotatorio.' }, { text: 'Del nervio óptico.', why: 'No.' }, { text: 'Es siempre fisiológico.', why: 'No.' }], answer: 0, refs: [P3('25:20')] },
    { id: 'neu03-q10', origen: 'practica', topic: 'Origen', difficulty: 1, stem: 'Los pares que nacen en el mesencéfalo son:', options: [{ text: 'III y IV.', why: 'Correcto.' }, { text: 'I y II.', why: 'Son intracraneales.' }, { text: 'V y VI.', why: 'Protuberancia.' }, { text: 'IX y X.', why: 'Bulbo.' }], answer: 0, refs: [P1('09:47')] },
  ],

  memory: [
    {
      id: 'neu03-m01',
      title: 'Quién cruza en el quiasma',
      purpose: 'La llave de las hemianopsias.',
      evaluates: [{ t: 'list', items: ['Cruzan las nasales', 'Las nasales ven los campos temporales', 'Quiasma → bitemporal', 'Detrás del quiasma → homónima'] }],
      interpret: 'El campo se invierte en la retina; las que cruzan son las del lado de la nariz.',
      mnemonic: { hook: 'La Nariz Cruza.', explain: 'Las fibras nasales son las que se cruzan; por eso el quiasma se lleva los campos temporales.' },
      recall: { q: '¿Qué defecto da la lesión del quiasma?', a: 'Una hemianopsia heterónima bitemporal.' },
    },
    {
      id: 'neu03-m02',
      title: 'Los oculomotores',
      purpose: 'Pregunta de parcial.',
      evaluates: [{ t: 'list', items: ['VI: recto externo', 'IV: oblicuo superior', 'III: todos los demás + párpado + pupila'] }],
      interpret: 'Dos pares tienen un solo músculo; el III hace el resto.',
      mnemonic: { hook: 'LR6 SO4, el resto 3.', explain: 'Recto lateral (externo) = VI; oblicuo superior = IV; el resto, el III.' },
      recall: { q: '¿Qué inerva el IV par?', a: 'El oblicuo superior, que lleva el ojo abajo y adentro.' },
    },
  ],

  closing: {
    map: {
      center: 'Pares craneales I',
      nodes: [
        { label: 'Generalidades', tone: 'gold', items: ['Motores, sensoriales, mixtos', 'Origen aparente'] },
        { label: 'I olfatorio', tone: 'mint', items: ['Bulbo → uncus', 'Sin tálamo'] },
        { label: 'II óptico', tone: 'sky', items: ['Vía óptica', 'Hemianopsias'] },
        { label: 'III, IV, VI', tone: 'peach', items: ['Músculos', 'Parálisis', 'Nistagmo', 'Fotomotor'] },
      ],
    },
    essentials: [
      'Motores III, IV, VI, XI, XII; sensoriales I, II, VIII; mixtos V, VII, IX, X. I y II intracraneales; III–IV mesencéfalo; V–VIII protuberancia; IX–XII bulbo.',
      'Olfatorio: mucosa → bulbo → **uncus**; el único sin **tálamo**. Alucinación olfatoria = lesión del uncus.',
      'Óptico: ganglionares → nervio (4 porciones) → **quiasma** (cruzan las nasales) → cintilla → geniculado → radiaciones → calcarina.',
      'Nervio: amaurosis. Quiasma: **bitemporal**. Retroquiasmática: **homónima**. Radiaciones: cuadrantanopsia.',
      'III: rectos sup., inf., interno, oblicuo inf., párpado, pupila → parálisis: **afuera y abajo, ptosis, midriasis**. IV: oblicuo superior. VI: recto externo.',
      'Fotomotor: luz → II → **Edinger-Westphal** → III → miosis. Nistagmo vertical: central.',
    ],
    links: [
      { chapterId: 'neu-04', text: '[[neu-04|Pares craneales II]]: del V al XII.' },
      { chapterId: 'neu-01', text: '[[neu-01|Motivos de consulta I]]: el tálamo, el vértigo y el nistagmo.' },
      { chapterId: 'neu-06', text: '[[neu-06|Otros síndromes]]: el VI en la hipertensión endocraneana.' },
    ],
    pitfalls: [
      'Decir que se cruzan las fibras temporales.',
      'Nombrar la hemianopsia homónima por el lado de la lesión en vez del campo perdido.',
      'Darle al III el oblicuo superior (es del IV).',
      'Confundir la parálisis parcial del III (pupila sana) con la completa.',
      'Olvidar que el olfato no pasa por el tálamo.',
    ],
    miniExam: [
      {
        id: 'neu03-x01',
        origen: 'practica',
        topic: 'Integración',
        difficulty: 2,
        stem: 'Paciente que ve doble al mirar hacia la derecha; el ojo derecho no pasa la línea media hacia afuera. El par afectado es:',
        options: [
          { text: 'El VI derecho.', why: 'Correcto: recto externo derecho.' },
          { text: 'El III derecho.', why: 'Daría ptosis y midriasis.' },
          { text: 'El IV derecho.', why: 'Daría diplopía vertical.' },
          { text: 'El II derecho.', why: 'No da diplopía.' },
        ],
        answer: 0,
        refs: [P3('10:14'), P3('23:04')],
      },
    ],
  },

  maneuvers: {
    ids: ['par-olfatorio', 'campo-visual-confrontacion', 'fondo-de-ojo', 'motilidad-ocular', 'reflejos-pupilares'],
    note: 'Exploración del I, II, III, IV y VI par y de las pupilas.',
  },

  clase,
  diagrams: {},
};

export default chapter;
