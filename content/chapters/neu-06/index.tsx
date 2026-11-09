import type { Chapter, SourceRef } from '@/types';
import { clase } from './clase';

/*
 * neu-06 — Otros síndromes neurológicos: sensibilidad, hipertensión endocraneana (con hernias y punción lumbar) y
 * síndrome meníngeo. Fuente: clases «Síndromes del SN» 5–7, la grabación del 26/10 (repaso), «Meningeo y osteo»
 * (práctica) y, para la sensibilidad, «Síndromes del SN 2» y «MC Neurología 4»; libro p. 499. Lo que marca: la tríada
 * de la HTE («la pregunta que yo siempre suelo preguntar»), el VI par y el efecto Cushing («de bochazo»), las fases
 * del edema de papila, tres contraindicaciones de la punción, el cuadro del LCR, meningitis/meningismo/reacción
 * meníngea, la tríada de la meningitis y Kernig y Brudzinski. «Clase Pato repaso» es de Patología y no se usa.
 * Ver content/traceability/neu-06.md.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const S2 = (t: string) => r('sn-2', t);
const S5 = (t: string) => r('sn-5', t);
const S6 = (t: string) => r('sn-6', t);
const S7 = (t: string) => r('sn-7', t);
const RC = (t: string) => r('neu-rec-1026', t);
const MO = (t: string) => r('meningeo-osteo', t);
const L = (p: string) => r('libro', undefined, p);

const chapter: Chapter = {
  id: 'neu-06',
  systemId: 'neuro',
  title: 'Otros síndromes neurológicos',
  subtitle: 'Las vías de la sensibilidad, la hipertensión endocraneana (tríada, edema de papila, VI par, efecto Cushing, hernias), la punción lumbar y el síndrome meníngeo.',
  estimatedMinutes: 40,
  sources: [S5('00:04–31:39'), S6('00:03–36:06'), S7('00:01–06:18'), RC('18:25–52:38'), MO('59:57–1:13:44'), S2('21:33–24:17'), L('p499')],

  map: {
    center: 'Otros síndromes neurológicos',
    why: 'Lo que el profesor pregunta: «la pregunta de examen más comúnmente que yo siempre suelo preguntar es **cuál es la tríada de hipertensión endocraneana**»; el **VI par** y el **efecto Cushing** («preguntas de bochazo»); las **fases del edema de papila**; **tres contraindicaciones** de la punción lumbar; el **cuadro del LCR**; la diferencia entre **meningitis, meningismo y reacción meníngea**; y **Kernig y Brudzinski**.',
    prereqs: [
      { label: 'Pares craneales I (neu-03)', detail: 'El VI par y el fondo de ojo.', chapterId: 'neu-03' },
      { label: 'Síndromes motores (neu-05)', detail: 'El cordonal posterior y la sensibilidad profunda.', chapterId: 'neu-05' },
      { label: 'Cefaleas (neu-01)', detail: 'Primarias y secundarias.', chapterId: 'neu-01' },
    ],
    branches: [
      { id: 'sensibilidad', label: 'Sensibilidad', tone: 'sky', items: ['Espinotalámicas', 'Cordones posteriores'] },
      { id: 'hte', label: 'Hipertensión endocraneana', tone: 'red', items: ['Tríada ★', 'Papila ★', 'VI par y Cushing ★'] },
      { id: 'puncion', label: 'Punción lumbar', tone: 'gold', items: ['Contraindicaciones ★', 'LCR ★'] },
      { id: 'meningeo', label: 'Síndrome meníngeo', tone: 'peach', items: ['Definiciones ★', 'Tríada', 'Kernig y Brudzinski ★'] },
    ],
    outcomes: [
      'Ubicar qué vía lleva cada **sensibilidad**.',
      'Definir la **hipertensión endocraneana**, recitar su **tríada** y las **fases del edema de papila**, el **VI par** y el **efecto Cushing**.',
      'Nombrar las **contraindicaciones** de la punción lumbar e interpretar el **LCR**.',
      'Diferenciar **meningitis, meningismo y reacción meníngea** y explorar la **irritación meníngea**.',
    ],
  },

  theory: [
    {
      id: 'sensibilidad',
      kicker: 'Repaso',
      title: 'Las vías de la sensibilidad',
      priority: 'muy-importante',
      summary: 'Espinotalámica anterior: tacto grosero. Lateral: dolor y temperatura. Cordones posteriores: tacto fino y sensibilidad profunda.',
      blocks: [
        {
          t: 'table',
          head: ['Vía', 'Qué lleva', 'Si se lesiona'],
          rows: [
            ['Espinotalámica anterior', 'Tacto **protopático** (grosero)', '—'],
            ['Espinotalámica lateral', 'Dolor y **temperatura**', 'Anestesia termoalgésica'],
            ['Cordones posteriores (Goll y Burdach)', 'Tacto **epicrítico**; **palestesia**, **batiestesia**, **barestesia**', 'Ataxia con Romberg +'],
          ],
        },
        { t: 'callout', kind: 'key', title: 'Neuropatía o cordonal', text: 'La **polineuropatía** pierde la sensibilidad **superficial**, distal, **en guante y bota**; el **cordonal posterior** pierde la **profunda**.', refs: [S2('03:55'), S2('04:38')] },
      ],
      refs: [S2('21:33'), S2('22:13'), S2('22:54'), S2('23:35'), S2('24:17')],
    },
    {
      id: 'hte',
      kicker: 'Clave',
      title: 'Hipertensión endocraneana',
      priority: 'imprescindible',
      summary: 'Presión intracraneal > 15 mmHg (20 cm de agua) por alteración del parénquima, la sangre o el LCR. Tríada: cefalea, vómito en chorro y edema de papila bilateral.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'La pregunta de siempre', text: '«La pregunta de examen más comúnmente que yo siempre suelo preguntar es: ¿cuál es la tríada de hipertensión endocraneana?» «No me saben esa tríada, lo van a bochar.»', refs: [RC('19:19'), S5('21:44')] },
        {
          t: 'steps',
          title: 'La tríada',
          items: [
            { title: 'Cefalea', text: 'La más frecuente; **holocraneana**, continua; empeora con la tos y el esfuerzo; **no calma con AINE**.' },
            { title: 'Vómito en chorro', text: '**Sin náuseas** previas.' },
            { title: 'Edema de papila', text: 'El hallazgo **más importante**; **bilateral**; fondo de ojo. Fases: **hiperémica, edematosa, atrófica**.' },
          ],
        },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Parénquima', title: 'Masas', text: 'Tumores, abscesos, hemorragias, quistes.', tone: 'gold' },
            { tag: 'LCR', title: 'No se reabsorbe', text: 'Meningitis (granulaciones de Pacchioni), hidrocefalia.', tone: 'sky' },
            { tag: 'Sangre', title: 'Venosa', text: 'Trombosis; encefalopatía hipertensiva.', tone: 'red' },
          ],
        },
        { t: 'callout', kind: 'prof', title: 'De bochazo', text: '«¿Cuál es el par craneal que más veces está lesionado en una hipertensión endocraneana? El par número seis. Eso es pregunta de examen. Y otra cosa más: yo le pregunto qué es el **efecto Cushing**»: **hipertensión arterial + bradicardia + alteraciones respiratorias** (no es el síndrome de Cushing).', refs: [RC('22:55'), RC('23:13'), S6('05:19')] },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Hernia', title: 'Subfalcina', text: 'Bajo la hoz.', tone: 'peach' },
            { tag: 'Hernia', title: 'Uncal', text: 'La **más frecuente**: comprime el mesencéfalo (midriasis).', tone: 'red' },
            { tag: 'Hernia', title: 'Amigdalina', text: 'Comprime el **bulbo**: mortal.', tone: 'red' },
          ],
        },
        { t: 'callout', kind: 'note', title: 'Benigna (idiopática)', text: '**Mujeres jóvenes obesas**; trastornos hormonales, anticonceptivos, corticoides. Las demás formas casi siempre son secundarias a otra enfermedad neurológica.', refs: [S5('18:00'), RC('18:25')] },
      ],
      refs: [S5('00:46'), S5('01:28'), S5('07:50'), S5('10:44'), S5('11:26'), S5('13:38'), S5('14:19'), S5('22:24'), S5('25:21'), S5('26:44'), S5('30:18'), S6('01:29'), L('p499')],
    },
    {
      id: 'puncion',
      kicker: 'Clave',
      title: 'Punción lumbar y LCR',
      priority: 'imprescindible',
      summary: 'Diagnóstico de la HTE: clínico, con imágenes. No punzar con HTE y edema de papila. El LCR distingue la meningitis bacteriana, viral y tuberculosa.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Pregunta de examen', text: '«Decirme tres contraindicaciones para hacer una punción lumbar.» Y «cómo se ve el líquido cefalorraquídeo en una meningitis supurada, viral y tuberculosa»: «lo tienen que saber como el Padre Nuestro».', refs: [RC('31:01'), RC('41:26'), S7('03:29')] },
        {
          t: 'list',
          items: ['**HTE con edema de papila** (el bulbo se enclava en el agujero occipital).', 'Lesión expansiva de la **fosa posterior**.', '**Signos de foco**; **hemorragia** cerebral.', '**Infección** de la piel en el sitio.', '**Diátesis hemorrágica** o plaquetas bajas.'],
        },
        {
          t: 'table',
          head: ['', 'Normal', 'Bacteriana', 'Viral', 'Tuberculosa'],
          rows: [
            ['Aspecto', 'Claro', '**Turbio**', 'Claro', 'Claro'],
            ['Células', 'Muy pocas', '**Neutrófilos**', 'Linfocitos', 'Linfocitos'],
            ['Glucosa', '≈ 60 % de la glucemia', '**Baja**', 'Normal', '**Baja**'],
            ['Proteínas', '15–45 mg/dL', 'Altas', 'Normales o algo altas', 'Altas'],
            ['Cloruros', 'Normales', 'Normales', 'Normales', '**Bajos**'],
          ],
        },
      ],
      refs: [S6('10:13'), S6('10:57'), S6('11:38'), S6('12:22'), S6('13:03'), S6('13:45'), S6('14:28'), S6('15:09'), S7('02:44'), S7('04:11'), S7('04:51'), S7('05:34'), RC('42:42'), RC('43:22')],
    },
    {
      id: 'meningeo',
      kicker: 'Clave',
      title: 'Síndrome meníngeo',
      priority: 'imprescindible',
      summary: 'Meningitis (clínica + LCR alterado), meningismo (clínica + LCR normal), reacción meníngea (LCR alterado sin clínica). Tríada: fiebre + rigidez de nuca + cefalea/convulsiones/alteración de conciencia según la edad.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Lo que siempre pregunta', text: '«Pero yo siempre pregunto esto: ¿cuál es la diferencia entre meningitis, meningismo y reacción meníngea?» Y las maniobras: «como el Padre Nuestro, porque se las van a preguntar: Kernig, Brudzinski».', refs: [RC('32:15'), S6('33:28')] },
        {
          t: 'table',
          head: ['', 'Clínica', 'LCR'],
          rows: [
            ['**Meningitis**', 'Sí', 'Alterado'],
            ['**Meningismo**', 'Sí', 'Normal'],
            ['**Reacción meníngea**', 'No', 'Alterado'],
          ],
        },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Adulto', title: 'Fiebre + nuca + cefalea', text: 'Algunos docentes: fiebre, cefalea y **alteración del sensorio**.', tone: 'red' },
            { tag: 'Niño', title: 'Fiebre + nuca + convulsiones', text: '', tone: 'peach' },
            { tag: 'Anciano', title: 'Fiebre + nuca + conciencia', text: 'Cae el estado de conciencia.', tone: 'lilac' },
          ],
        },
        {
          t: 'cards',
          cols: 2,
          items: [
            { tag: 'Causas', title: 'Infecciosas o no', text: 'Bacterias (neonatos: *S. agalactiae*, *E. coli*; luego neumococo, meningococo), virus, hongos, parásitos; hemorragias, neoplasias. La **tuberculosa** toma la **base**.', tone: 'gold' },
            { tag: 'Llegada', title: 'Vía sanguínea', text: 'La más frecuente; o por continuidad (sinusitis, otitis).', tone: 'sky' },
          ],
        },
        { t: 'callout', kind: 'tip', title: 'Signos de irritación meníngea', text: '**Rigidez de nuca** (Lewinsohn: abre la boca para tocar el pecho), **trípode**, **gatillo de fusil**, **vientre en batea**. **Brudzinski**: al flexionar la nuca flexiona las rodillas. **Kernig**: no puede sentarse ni elevar la pierna sin flexionar la rodilla. No toda rigidez de nuca es meningitis (ancianos postrados, Parkinson).', refs: [S6('30:55'), S6('31:37'), S6('33:44'), S6('34:30'), MO('59:57')] },
      ],
      refs: [S6('16:33'), S6('17:14'), S6('18:36'), S6('20:04'), S6('22:14'), S6('27:55'), S6('28:43'), S7('00:01'), RC('31:41'), RC('33:42'), RC('44:44'), RC('50:29')],
    },
  ],

  developments: [
    {
      id: 'neu06-d01',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'hte',
      question: '¿Cuál es la tríada de la hipertensión endocraneana? Describa cada componente.',
      quote: { text: '«La pregunta de examen más comúnmente que yo siempre suelo preguntar es: ¿cuál es la tríada de hipertensión endocraneana?»', refs: [RC('19:19')] },
      answer: [
        { t: 'p', text: '**Cefalea**: la más frecuente; holocraneana, continua, peor con la tos, el esfuerzo y los movimientos; no calma con AINE.' },
        { t: 'p', text: '**Vómito en chorro**: sin náuseas previas. **Edema de papila**: el hallazgo más importante, **bilateral**, en el fondo de ojo; fases hiperémica, edematosa y atrófica.' },
        { t: 'p', text: 'Definición: presión intracraneal > 15 mmHg (20 cm de agua) por alteración del parénquima, la sangre o el LCR.' },
      ],
      refs: [S5('21:44'), S5('22:24'), S5('24:34'), S5('25:21'), S5('26:44'), RC('20:30'), RC('21:11')],
    },
    {
      id: 'neu06-d02',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'hte',
      question: '¿Qué par craneal se lesiona con más frecuencia en la HTE? ¿Qué es el efecto Cushing?',
      quote: { text: '«¿Cuál es el par craneal que más veces está lesionado…? El par número seis. Eso es pregunta de examen… yo le pregunto qué es el efecto Cushing»', refs: [RC('22:55')] },
      answer: [
        { t: 'p', text: 'El **VI par** (motor ocular externo): ojo desviado hacia adentro, diplopía.' },
        { t: 'p', text: '**Efecto Cushing**: hipertensión arterial + bradicardia + alteraciones respiratorias, en la HTE grave (isquemia del tronco → vasoconstricción → reflejo barorreceptor). No es el síndrome de Cushing.' },
      ],
      refs: [S5('30:18'), S5('30:58'), S6('01:29'), S6('05:19'), RC('23:13')],
    },
    {
      id: 'neu06-d03',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'puncion',
      question: 'Diga tres contraindicaciones de la punción lumbar. ¿Cómo se ve el LCR en la meningitis bacteriana, viral y tuberculosa?',
      quote: { text: '«…decirme tres contraindicaciones para hacer una punción lumbar» · «cómo se ve el líquido cefalorraquídeo en una meningitis supurada, viral y tuberculosa»', refs: [RC('31:01'), RC('41:26')] },
      answer: [
        { t: 'p', text: '**Contraindicaciones**: HTE con edema de papila (enclavamiento del bulbo), lesión expansiva de la fosa posterior, signos de foco, hemorragia cerebral, infección cutánea en el sitio, diátesis hemorrágica o plaquetopenia.' },
        { t: 'p', text: '**Bacteriana**: turbio, neutrófilos, glucosa baja, proteínas altas. **Viral**: claro, linfocitos, glucosa normal, proteínas normales o algo altas. **Tuberculosa**: claro, linfocitos, glucosa baja, proteínas altas y **cloruros bajos**.' },
      ],
      refs: [S6('13:03'), S6('13:45'), S6('14:28'), S7('04:11'), S7('04:51'), S7('05:34'), RC('42:42')],
    },
    {
      id: 'neu06-d04',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'meningeo',
      question: 'Diferencie meningitis, meningismo y reacción meníngea. ¿Cuál es la tríada de la meningitis y cómo se explora la irritación meníngea?',
      quote: { text: '«Pero yo siempre pregunto esto… ¿cuál es la diferencia entre meningitis, meningismo y reacción meníngea?»', refs: [RC('32:15')] },
      answer: [
        { t: 'p', text: '**Meningitis**: clínica + LCR alterado. **Meningismo**: clínica con LCR normal. **Reacción meníngea**: LCR alterado sin clínica.' },
        { t: 'p', text: '**Tríada**: fiebre + rigidez de nuca + cefalea en el adulto (o alteración del sensorio), convulsiones en el niño, caída de la conciencia en el anciano.' },
        { t: 'p', text: '**Irritación meníngea**: rigidez de nuca (Lewinsohn), trípode, gatillo de fusil, vientre en batea; **Brudzinski** (flexión de nuca → flexión de rodillas) y **Kernig** (no se sienta ni eleva la pierna sin flexionar la rodilla).' },
      ],
      refs: [S6('16:33'), S6('17:14'), S6('28:43'), S6('30:55'), S6('33:44'), S6('34:30'), RC('44:44')],
    },
    {
      id: 'neu06-d05',
      origen: 'clase',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'hte',
      question: '¿Cuáles son las fases del edema de papila?',
      quote: { text: '«Esto es pregunta de parcial: cuántas fases tiene el edema de papila»', refs: [S5('26:44')] },
      answer: [
        { t: 'p', text: '**Hiperémica** (papila roja, venas que se dilatan), **edematosa** (bordes borrosos, venas muy dilatadas, arterias finas, hemorragias) y **atrófica** (papila pálida). Debe ser **bilateral** para pensar en HTE; diferenciar del seudopapiledema.' },
      ],
      refs: [S5('27:27'), S5('28:12'), S5('28:54'), RC('21:51')],
    },
    {
      id: 'neu06-d06',
      origen: 'practica',
      prio: 'P2',
      priority: 'complementario',
      ficha: 'hte',
      question: '¿Cuáles son las hernias cerebrales y cuál es la más frecuente?',
      answer: [
        { t: 'p', text: '**Subfalcina** (bajo la hoz), **transtentorial o uncal** (la más frecuente: el uncus comprime el mesencéfalo, midriasis) y **amigdalina** (las amígdalas cerebelosas comprimen el bulbo en el agujero occipital: paro cardiorrespiratorio).' },
      ],
      refs: [S5('08:23'), S5('10:44'), S5('11:26'), S5('13:38')],
    },
  ],

  mcq: [
    { id: 'neu06-q01', origen: 'practica', topic: 'HTE', difficulty: 1, emphasis: true, stem: 'La tríada de la hipertensión endocraneana es:', options: [{ text: 'Cefalea, vómito en chorro y edema de papila.', why: 'Correcto.' }, { text: 'Fiebre, cefalea y rigidez de nuca.', why: 'Es la meningitis.' }, { text: 'HTA, bradicardia y alteración respiratoria.', why: 'Es el efecto Cushing.' }, { text: 'Vértigo, cefalea y vómitos.', why: 'Es la cerebelosa.' }], answer: 0, refs: [RC('19:19')] },
    { id: 'neu06-q02', origen: 'practica', topic: 'HTE', difficulty: 1, emphasis: true, stem: 'El par craneal que se lesiona con más frecuencia en la HTE es el:', options: [{ text: 'VI.', why: 'Correcto.' }, { text: 'III.', why: 'Se afecta en la hernia uncal.' }, { text: 'VII.', why: 'No.' }, { text: 'II.', why: 'Da el edema de papila, pero no es el que se paraliza.' }], answer: 0, refs: [RC('22:55')] },
    { id: 'neu06-q03', origen: 'practica', topic: 'HTE', difficulty: 2, emphasis: true, stem: 'El efecto Cushing consiste en:', options: [{ text: 'Hipertensión arterial, bradicardia y alteración respiratoria.', why: 'Correcto.' }, { text: 'Hipotensión y taquicardia.', why: 'Al revés.' }, { text: 'Obesidad central y estrías.', why: 'Es el síndrome de Cushing.' }, { text: 'Fiebre y rigidez de nuca.', why: 'No.' }], answer: 0, refs: [RC('23:13')] },
    { id: 'neu06-q04', origen: 'practica', topic: 'Papila', difficulty: 2, stem: 'Las fases del edema de papila, en orden, son:', options: [{ text: 'Hiperémica, edematosa y atrófica.', why: 'Correcto.' }, { text: 'Atrófica, edematosa e hiperémica.', why: 'Al revés.' }, { text: 'Edematosa, hemorrágica y fibrosa.', why: 'No.' }, { text: 'Solo hay una.', why: 'Son tres.' }], answer: 0, refs: [S5('26:44')] },
    { id: 'neu06-q05', origen: 'practica', topic: 'Punción', difficulty: 2, emphasis: true, stem: 'Es una contraindicación de la punción lumbar:', options: [{ text: 'HTE con edema de papila.', why: 'Correcto: riesgo de enclavamiento.' }, { text: 'Fiebre.', why: 'No.' }, { text: 'Rigidez de nuca.', why: 'Es una indicación.' }, { text: 'Cefalea.', why: 'No.' }], answer: 0, refs: [S6('13:03')] },
    { id: 'neu06-q06', origen: 'practica', topic: 'LCR', difficulty: 2, emphasis: true, stem: 'Un LCR claro, con linfocitos, glucosa baja y cloruros bajos sugiere meningitis:', options: [{ text: 'Tuberculosa.', why: 'Correcto.' }, { text: 'Bacteriana.', why: 'Sería turbio con neutrófilos.' }, { text: 'Viral.', why: 'La glucosa sería normal.' }, { text: 'Ninguna: es normal.', why: 'No.' }], answer: 0, refs: [S7('05:34')] },
    { id: 'neu06-q07', origen: 'practica', topic: 'Meníngeo', difficulty: 2, emphasis: true, stem: 'Clínica meníngea con LCR normal se denomina:', options: [{ text: 'Meningismo.', why: 'Correcto.' }, { text: 'Meningitis.', why: 'Tendría LCR alterado.' }, { text: 'Reacción meníngea.', why: 'Es LCR alterado sin clínica.' }, { text: 'HTE benigna.', why: 'No.' }], answer: 0, refs: [S6('17:14')] },
    { id: 'neu06-q08', origen: 'practica', topic: 'Meníngeo', difficulty: 2, stem: 'Al flexionar la nuca del paciente acostado, flexiona las rodillas. Es el signo de:', options: [{ text: 'Brudzinski.', why: 'Correcto.' }, { text: 'Kernig.', why: 'Es la rodilla al elevar o sentarse.' }, { text: 'Babinski.', why: 'Es plantar.' }, { text: 'Romberg.', why: 'Es del equilibrio.' }], answer: 0, refs: [S6('34:30')] },
    { id: 'neu06-q09', origen: 'practica', topic: 'Meníngeo', difficulty: 2, stem: 'En el niño, la tríada de la meningitis incluye, además de fiebre y rigidez de nuca:', options: [{ text: 'Convulsiones.', why: 'Correcto.' }, { text: 'Edema de papila.', why: 'No.' }, { text: 'Bradicardia.', why: 'No.' }, { text: 'Vértigo.', why: 'No.' }], answer: 0, refs: [RC('44:44')] },
    { id: 'neu06-q10', origen: 'practica', topic: 'Hernias', difficulty: 2, stem: 'La hernia cerebral más frecuente es la:', options: [{ text: 'Transtentorial (uncal).', why: 'Correcto.' }, { text: 'Amigdalina.', why: 'Es la mortal, no la más frecuente.' }, { text: 'Subfalcina.', why: 'No.' }, { text: 'Ninguna: todas igual.', why: 'No.' }], answer: 0, refs: [S5('13:38')] },
    { id: 'neu06-q11', origen: 'practica', topic: 'Sensibilidad', difficulty: 2, stem: 'La vibración (palestesia) viaja por:', options: [{ text: 'Los cordones posteriores.', why: 'Correcto.' }, { text: 'El haz espinotalámico lateral.', why: 'Lleva dolor y temperatura.' }, { text: 'El haz espinotalámico anterior.', why: 'Lleva el tacto grosero.' }, { text: 'La vía piramidal.', why: 'Es motora.' }], answer: 0, refs: [S2('23:35')] },
  ],

  memory: [
    {
      id: 'neu06-m01',
      title: 'Dos tríadas que no se mezclan',
      purpose: 'HTE y meningitis.',
      evaluates: [{ t: 'list', items: ['HTE: cefalea, vómito en chorro, edema de papila', 'Meningitis: fiebre, rigidez de nuca + (cefalea / convulsiones / conciencia)'] }],
      interpret: 'La fiebre y la nuca dura hablan de meninges; la papila, de presión.',
      mnemonic: { hook: 'Presión: Cabeza, Chorro, Papila. Meninges: Fiebre y Nuca.', explain: 'Cada tríada por su sello.' },
      recall: { q: '¿Cuál es el hallazgo más importante de la HTE?', a: 'El edema de papila bilateral.' },
    },
    {
      id: 'neu06-m02',
      title: 'Meningitis, meningismo y reacción',
      purpose: '«Yo siempre pregunto esto.»',
      evaluates: [{ t: 'list', items: ['Meningitis: clínica + LCR', 'Meningismo: clínica sola', 'Reacción: LCR solo'] }],
      interpret: 'Mirá dos cosas: si hay clínica y si el LCR está alterado.',
      mnemonic: { hook: 'MeningITIS tiene todo; meningISMO es puro show (clínica sin líquido); REACCIÓN es silenciosa (líquido sin clínica).', explain: 'Clínica y LCR.' },
      recall: { q: '¿Qué es la reacción meníngea?', a: 'LCR alterado sin clínica.' },
    },
    {
      id: 'neu06-m03',
      title: 'El LCR',
      purpose: '«Como el Padre Nuestro.»',
      evaluates: [{ t: 'list', items: ['Bacteriana: turbio, neutrófilos, glucosa baja', 'Viral: claro, linfocitos, glucosa normal', 'TBC: claro, linfocitos, glucosa baja, cloruros bajos'] }],
      interpret: 'Turbio = bacteriana; cloruros bajos = tuberculosa.',
      mnemonic: { hook: 'Las bacterias comen azúcar; la TBC además se come la sal.', explain: 'Glucosa baja en bacteriana y TBC; cloruros bajos solo en TBC.' },
      recall: { q: '¿En qué meningitis bajan los cloruros?', a: 'En la tuberculosa.' },
    },
  ],

  closing: {
    map: {
      center: 'Otros síndromes',
      nodes: [
        { label: 'Sensibilidad', tone: 'sky', items: ['Espinotalámicas', 'Cordones'] },
        { label: 'HTE', tone: 'red', items: ['Tríada', 'Papila', 'VI y Cushing', 'Hernias'] },
        { label: 'Punción', tone: 'gold', items: ['Contraindicaciones', 'LCR'] },
        { label: 'Meníngeo', tone: 'peach', items: ['Definiciones', 'Tríada', 'Kernig, Brudzinski'] },
      ],
    },
    essentials: [
      'Sensibilidad: espinotalámica anterior (tacto grosero), lateral (dolor y temperatura), cordones posteriores (tacto fino y profunda).',
      'HTE: > 15 mmHg por parénquima, sangre o LCR. Tríada: **cefalea, vómito en chorro, edema de papila bilateral**.',
      'Papila: **hiperémica → edematosa → atrófica**. Par más lesionado: **VI**. **Efecto Cushing**: HTA + bradicardia + respiración alterada.',
      'Hernias: uncal (la más frecuente), subfalcina, amigdalina (mortal). **No punzar con HTE y edema de papila**.',
      'LCR: bacteriana turbia con neutrófilos y glucosa baja; viral clara con linfocitos; tuberculosa con **cloruros bajos**.',
      'Meningitis (clínica + LCR), meningismo (clínica), reacción (LCR). Tríada: fiebre + nuca + cefalea/convulsiones/conciencia. **Kernig y Brudzinski**.',
    ],
    links: [
      { chapterId: 'neu-01', text: '[[neu-01|Motivos de consulta I]]: las cefaleas.' },
      { chapterId: 'neu-03', text: '[[neu-03|Pares craneales I]]: el VI par y el fondo de ojo.' },
      { chapterId: 'neu-05', text: '[[neu-05|Síndromes motores]]: el cordonal posterior.' },
    ],
    pitfalls: [
      'Confundir el efecto Cushing con el síndrome de Cushing.',
      'Pedir una punción lumbar con edema de papila.',
      'Aceptar un edema de papila unilateral como HTE.',
      'Invertir meningismo y reacción meníngea.',
      'Olvidar que la tuberculosa es la única con cloruros bajos.',
    ],
    miniExam: [
      {
        id: 'neu06-x01',
        origen: 'practica',
        topic: 'Integración',
        difficulty: 2,
        stem: 'Paciente con fiebre, rigidez de nuca y edema de papila bilateral. Antes de la punción lumbar hay que:',
        options: [
          { text: 'Hacer una tomografía: con edema de papila la punción puede enclavar el bulbo.', why: 'Correcto.' },
          { text: 'Punzar de inmediato sin imágenes.', why: 'Riesgo de enclavamiento.' },
          { text: 'Indicar solo analgésicos.', why: 'No.' },
          { text: 'Esperar a que baje la fiebre.', why: 'No.' },
        ],
        answer: 0,
        refs: [S6('10:57'), S6('13:03'), RC('27:24')],
      },
    ],
  },

  maneuvers: {
    ids: ['sensibilidad-superficial', 'sensibilidad-profunda', 'fondo-de-ojo', 'rigidez-nuca', 'kernig-brudzinski'],
    note: 'Sensibilidad, fondo de ojo y signos de irritación meníngea.',
  },

  clase,
  diagrams: {},
};

export default chapter;
