import type { Chapter, SourceRef } from '@/types';
import { clase } from './clase';

/*
 * neu-05 — Motilidad y síndromes motores: trastornos del equilibrio (vestibular, cerebeloso, cordonal posterior),
 * síndrome piramidal de la 1.ª y la 2.ª motoneurona, hemiplejías alternas, síndrome extrapiramidal (Parkinson) y
 * síndrome cerebeloso. Fuente: clases «Síndromes del SN» 1–4 y la clase por Meet del 24/10 de Ortega; libro p. 493
 * y 505. Lo que marca: la tríada del Parkinson («siempre yo le pregunto»), la tríada cerebelosa, el examen del
 * síndrome piramidal, la hemiplejía espástica, las alternas, la diferencia 1.ª/2.ª motoneurona y el Romberg.
 * Ver content/traceability/neu-05.md.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const S1 = (t: string) => r('sn-1', t);
const S2 = (t: string) => r('sn-2', t);
const S3 = (t: string) => r('sn-3', t);
const S4 = (t: string) => r('sn-4', t);
const MT = (t: string) => r('neu-meet-1024', t);
const L = (p: string) => r('libro', undefined, p);

const chapter: Chapter = {
  id: 'neu-05',
  systemId: 'neuro',
  title: 'Motilidad y síndromes motores',
  subtitle: 'Ataxia (vestibular, cerebelosa, cordonal), síndrome piramidal de la primera y la segunda motoneurona, hemiplejías alternas, Parkinson y síndrome cerebeloso.',
  estimatedMinutes: 45,
  sources: [S1('00:00–32:43'), S2('00:00–34:23'), S3('00:00–32:52'), S4('00:01–26:30'), MT('00:08–1:30:46'), L('p493'), L('p505')],

  map: {
    center: 'Síndromes motores',
    why: 'Lo que el profesor pregunta: «**siempre yo le pregunto cuál es la tríada de Parkinson**… es para bochazo»; la **tríada del síndrome cerebeloso**; el **examen físico del síndrome piramidal**; la **hemiplejía espástica**; las **hemiplejías alternas**; y la **diferencia entre la primera y la segunda motoneurona**. «Yo pregunto tríadas.»',
    prereqs: [
      { label: 'Motivos de consulta II (neu-02)', detail: 'Movimientos involuntarios, motoneuronas y neuropatías.', chapterId: 'neu-02' },
      { label: 'Pares craneales (neu-03 y neu-04)', detail: 'III y VII para las hemiplejías alternas.', chapterId: 'neu-03' },
      { label: 'Equilibrio y Romberg (neu-01)', detail: 'Vista, vestíbulo, cordones, cerebelo.', chapterId: 'neu-01' },
    ],
    branches: [
      { id: 'equilibrio', label: 'Ataxia', tone: 'gold', items: ['Vestibular', 'Cerebeloso', 'Cordonal posterior'] },
      { id: 'piramidal', label: 'Piramidal', tone: 'sky', items: ['Examen físico ★', 'Espástica ★', 'Alternas ★'] },
      { id: 'extrapiramidal', label: 'Extrapiramidal', tone: 'lilac', items: ['Tríada del Parkinson ★', 'Sustancia negra', 'Parkinsonismo'] },
      { id: 'cerebeloso', label: 'Cerebeloso', tone: 'peach', items: ['Tríada ★', 'Funciones', 'Romberg negativo'] },
    ],
    outcomes: [
      'Distinguir la ataxia **vestibular**, **cerebelosa** y **cordonal posterior** por la marcha, el vértigo, el nistagmo y el Romberg.',
      'Describir el **examen físico del síndrome piramidal** y ubicar la lesión (directa, alterna, medular).',
      'Diferenciar la **1.ª** de la **2.ª motoneurona** y la **espasticidad** de la **rigidez**.',
      'Recitar las **tríadas** del Parkinson y del síndrome cerebeloso.',
    ],
  },

  theory: [
    {
      id: 'equilibrio',
      kicker: 'Clave',
      title: 'Trastorno del equilibrio: tres síndromes',
      priority: 'imprescindible',
      summary: 'Ataxia vestibular, cerebelosa o cordonal posterior. Solo el cerebeloso tiene Romberg negativo; solo el cordonal no tiene vértigo.',
      blocks: [
        {
          t: 'table',
          head: ['', 'Vestibular', 'Cerebeloso', 'Cordonal posterior'],
          rows: [
            ['Marcha', 'En **estrella** (Babinski)', '**De ebrio**', '**Taloneante**, mirando los pies'],
            ['Vértigo', 'Periférico', 'Central', '**No**'],
            ['Nistagmo', 'Horizontal', 'Vertical o rotatorio', 'No'],
            ['Romberg', '**Positivo**', '**Negativo**', '**Positivo**'],
            ['Lo propio', '—', 'Hipotonía', 'Pierde la sensibilidad profunda'],
          ],
        },
        { t: 'callout', kind: 'prof', title: 'Pregunta de final', text: 'El síndrome **cordonal posterior**: «[a una docente] le gusta preguntar: hablame sobre el síndrome cordonal posterior». Y la ataxia con Romberg negativo del cerebeloso: «pregunta de final, esto siempre preguntan».', refs: [S1('03:28'), S4('18:21')] },
      ],
      refs: [S1('02:48'), S1('04:51'), S1('07:48'), S1('10:36'), S1('12:24'), S1('13:47'), S1('14:28'), S1('15:53'), S1('17:20')],
    },
    {
      id: 'piramidal',
      kicker: 'Clave',
      title: 'Síndrome piramidal',
      priority: 'imprescindible',
      summary: 'Lesión de la vía piramidal (célula de Betz → cápsula interna → tronco → decusación bulbar → asta anterior). Debilidad, espasticidad, hiperreflexia, Babinski.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Pregunta de examen', text: '«Todo eso es pregunta de examen… Si yo le pregunto el examen físico de un paciente que tiene un síndrome piramidal, me tienen que decir todo eso.» Y la hemiplejía espástica: «el más característico, y el que le van a preguntar a ustedes en los exámenes».', refs: [MT('13:57'), MT('27:11')] },
        {
          t: 'table',
          head: ['', '1.ª motoneurona', '2.ª motoneurona'],
          rows: [
            ['Parálisis', '**Espástica** (fláccida el primer mes)', '**Fláccida**'],
            ['Tono', 'Hipertonía en **navaja**', 'Atonía'],
            ['Reflejos profundos', '**Hiperreflexia**', '**Arreflexia**'],
            ['Superficiales', 'Abolidos (cutaneoabdominales, cremasteriano)', 'Abolidos'],
            ['Patológicos', '**Babinski**, Oppenheim, Gordon, Schaeffer; **clonus**', 'No'],
            ['Trofismo', 'Atrofia solo por desuso', '**Atrofia**'],
            ['Otros', '**Sincinesias**', '**Fasciculaciones** (triple A)'],
          ],
        },
        { t: 'callout', kind: 'key', title: 'Navaja o rueda dentada', text: 'Espasticidad piramidal: resiste y cede de golpe (**navaja**). Rigidez extrapiramidal: cede a saltos (**rueda dentada**), con reflejos normales.', refs: [S2('14:39'), S2('15:19')] },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Directa', title: 'Cápsula interna', text: 'Cara, brazo y pierna del lado opuesto. La más frecuente: **capsular**.', tone: 'sky' },
            { tag: 'Alterna', title: 'Tronco', text: '**Weber** (mesencéfalo: III homolateral) y **Millard-Gubler** (protuberancia: VII periférico y VI homolateral) + hemiplejía contralateral.', tone: 'red' },
            { tag: 'Medular', title: 'Para y cuadriplejía', text: 'Cervical alta: cuadriplejía; debajo de D2: paraplejía.', tone: 'gold' },
          ],
        },
        { t: 'callout', kind: 'prof', title: 'Alternas', text: '«Si es hemiplejía alterna… la lesión de la vía piramidal está en el tronco encefálico. No se olviden, porque es pregunta de examen.»', refs: [MT('33:12')] },
        { t: 'callout', kind: 'clinic', title: 'Hemiplejía en el coma', text: 'Cabeza y ojos mirando **hacia el lado de la lesión**; signo de la **pipa**; parálisis facial central.', refs: [S2('33:41'), S3('00:44')] },
        {
          t: 'cards',
          cols: 4,
          items: [
            { tag: 'Radial', title: 'Mano caída', text: 'No extiende la muñeca.', tone: 'sky' },
            { tag: 'Mediano', title: 'Del predicador', text: 'No flexiona índice y pulgar.', tone: 'gold' },
            { tag: 'Cubital', title: 'En garra', text: '', tone: 'peach' },
            { tag: 'Ciático poplíteo ext.', title: 'Steppage', text: 'Pie caído (diabetes, alcohol, Guillain-Barré).', tone: 'lilac' },
          ],
        },
      ],
      refs: [S1('24:12'), S1('28:33'), S1('29:55'), S2('24:58'), S2('27:38'), S2('28:59'), S2('31:01'), S3('02:53'), S3('04:21'), S3('06:28'), S3('07:10'), S3('10:51'), S3('13:46'), S3('16:34'), S3('18:40'), S3('20:48'), MT('21:12'), MT('53:06')],
    },
    {
      id: 'extrapiramidal',
      kicker: 'Clave',
      title: 'Síndrome extrapiramidal: el Parkinson',
      priority: 'imprescindible',
      summary: 'Lesión de los núcleos de la base. Parkinson: degeneración de la sustancia negra (cuerpos de Lewy) → falta dopamina. Tríada: bradicinesia, rigidez en rueda dentada, temblor de reposo.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'La pregunta de siempre', text: '«Siempre yo le pregunto cuál es la tríada de Parkinson… y eso es pregunta de examen: no me saben tríadas del Parkinson, es para bochazo.» Y «qué parte de los núcleos de la base está lesionado».', refs: [MT('01:02:37'), MT('01:07:15'), MT('01:07:43')] },
        {
          t: 'steps',
          title: 'La tríada',
          items: [
            { title: 'Bradicinesia', text: 'Lentitud y dificultad para iniciar el movimiento.' },
            { title: 'Rigidez', text: 'Hipertonía con signo de la **rueda dentada**.' },
            { title: 'Temblor de reposo', text: 'Lento y grosero; cede al moverse y con el sueño.' },
          ],
        },
        {
          t: 'cards',
          cols: 2,
          items: [
            { tag: 'Qué se lesiona', title: 'Sustancia negra', text: 'Pars compacta: **α-sinucleína** y **cuerpos de Lewy** → muere → falta **dopamina** en el estriado; predomina la acetilcolina. Causa desconocida.', tone: 'lilac' },
            { tag: 'Cómo se ve', title: 'El parkinsoniano', text: 'Facies inexpresiva, pequeños pasos, giro en bloque, retropulsión, **micrografía**, glabelar inagotable, hiposmia, seborrea; **reflejos normales**.', tone: 'sky' },
            { tag: 'Parkinsonismo', title: 'Causa conocida', text: 'Fármacos (antipsicóticos), manganeso, monóxido de carbono, encefalitis, Wilson. Puede **revertir**.', tone: 'gold' },
            { tag: 'Pierde', title: 'Automáticos y asociados', text: 'La mímica, el balanceo de los brazos al caminar.', tone: 'peach' },
          ],
        },
      ],
      refs: [S3('22:25'), S3('23:49'), S3('25:12'), S3('26:34'), S3('28:01'), S3('29:25'), S4('00:01'), S4('02:47'), S4('03:31'), S4('07:02'), S4('09:56'), S4('11:19'), S4('13:29'), L('p493')],
    },
    {
      id: 'cerebeloso',
      kicker: 'Clave',
      title: 'Síndrome cerebeloso y cordonal posterior',
      priority: 'imprescindible',
      summary: 'Cerebelo: eumetría, isostenia, sinergia, diadococinesia y tono. Tríada: vértigo central, cefalea, vómitos. Ataxia con Romberg negativo, dismetría, temblor intencional, hipotonía.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Pregunta de examen', text: '«Tríadas del síndrome cerebeloso: vértigo de tipo central, cefalea holocraneana y vómitos.» «Tiene temblor de actitud, tiene hipotonía muscular: lo que yo estoy marcando de amarillo es lo que más pregunto.» Una docente preguntó «cuáles son las funciones normales del cerebelo».', refs: [MT('01:17:55'), MT('01:19:07'), S4('15:37')] },
        {
          t: 'table',
          head: ['Función normal', 'Si falla'],
          rows: [
            ['Eumetría (medir el movimiento)', '**Dismetría** (índice-nariz, talón-rodilla)'],
            ['Isostenia (fuerza justa)', 'Fuerza de más o de menos'],
            ['Sinergia', '**Asinergia** (gran asinergia de Babinski)'],
            ['Diadococinesia', '**Adiadococinesia**'],
            ['Tono', '**Hipotonía**; catalepsia cerebelosa'],
          ],
        },
        {
          t: 'cards',
          cols: 2,
          items: [
            { tag: 'Estático', title: 'Posición', text: 'Ataxia con base amplia y **Romberg negativo**; temblor de actitud; desviaciones; hipotonía.', tone: 'peach' },
            { tag: 'Cinético', title: 'Movimiento', text: 'Dismetría, asinergia, adiadococinesia, temblor **intencional**, marcha de ebrio, megalografía, palabra escandida, nistagmo.', tone: 'red' },
          ],
        },
        { t: 'callout', kind: 'tip', title: 'Cordonal posterior', text: 'Lesión de **Goll y Burdach**: pierde la palestesia, la batiestesia y la barestesia; ataxia con **Romberg positivo**, marcha taloneante, **sin vértigo**.', refs: [S4('25:50'), S4('26:30')] },
      ],
      refs: [S4('14:55'), S4('16:18'), S4('17:40'), S4('19:01'), S4('19:43'), S4('20:24'), S4('21:05'), S4('25:09'), MT('01:16:46'), L('p505')],
    },
  ],

  developments: [
    {
      id: 'neu05-d01',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'extrapiramidal',
      question: '¿Cuál es la tríada del Parkinson? ¿Qué núcleo está lesionado?',
      quote: { text: '«…siempre yo le pregunto cuál es la tríada de Parkinson… no me saben tríadas del Parkinson, es para bochazo»', refs: [MT('01:07:15')] },
      answer: [
        { t: 'p', text: '**Bradicinesia** (lentitud y dificultad para iniciar el movimiento), **rigidez** en **rueda dentada** y **temblor de reposo**, lento y grosero.' },
        { t: 'p', text: 'Se lesiona la **sustancia negra** (pars compacta) por acumulación de α-sinucleína y **cuerpos de Lewy**: falta dopamina en el estriado y predomina la acetilcolina. Reflejos normales; facies inexpresiva, marcha a pequeños pasos, micrografía.' },
      ],
      refs: [MT('01:02:37'), MT('01:07:43'), S3('28:01'), S3('29:25')],
    },
    {
      id: 'neu05-d02',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'piramidal',
      question: 'Describa el examen físico de un paciente con síndrome piramidal.',
      quote: { text: '«Si yo le pregunto el examen físico de un paciente que tiene un síndrome piramidal, me tienen que decir todo eso»', refs: [MT('13:57')] },
      answer: [
        { t: 'p', text: '**Fuerza**: paresia o plejía, contralateral si la lesión está arriba del bulbo. **Tono**: espasticidad con signo de la **navaja** (hipotonía el primer mes). **Trofismo**: sin atrofia, salvo por desuso.' },
        { t: 'p', text: '**Reflejos**: hiperreflexia osteotendinosa; abolición de los cutaneoabdominales y el cremasteriano; **Babinski** y sucedáneos (Oppenheim, Gordon, Schaeffer); **clonus**; **sincinesias**. Hemiplejía espástica: brazo pegado al cuerpo, marcha en guadaña, parálisis facial central.' },
      ],
      refs: [S2('28:59'), S2('29:39'), S2('31:01'), S2('31:41'), S3('02:53'), MT('25:39')],
    },
    {
      id: 'neu05-d03',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'cerebeloso',
      question: '¿Cuál es la tríada del síndrome cerebeloso? ¿Cuáles son las funciones normales del cerebelo y qué signos da su lesión?',
      quote: { text: '«Pregunta de examen: tríadas del síndrome cerebeloso… vértigo de tipo central, cefalea holocraneana y vómitos»', refs: [MT('01:17:55')] },
      answer: [
        { t: 'p', text: '**Tríada**: vértigo central, cefalea holocraneana y vómitos. Causas más frecuentes: hemorragias y tumores.' },
        { t: 'p', text: '**Funciones**: eumetría, isostenia, sinergia, diadococinesia, regulación del tono. **Signos**: ataxia con **Romberg negativo**, temblor de actitud e intencional, **dismetría**, **asinergia**, **adiadococinesia**, **hipotonía**, marcha de ebrio, megalografía, palabra escandida, nistagmo.' },
      ],
      refs: [S4('15:37'), S4('16:59'), S4('17:40'), S4('19:01'), S4('25:50'), MT('01:19:07')],
    },
    {
      id: 'neu05-d04',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'piramidal',
      question: '¿Qué es una hemiplejía alterna? Describa los síndromes de Weber y de Millard-Gubler.',
      quote: { text: '«…la lesión de la vía piramidal está en el tronco encefálico. No se olviden, porque es pregunta de examen»', refs: [MT('33:12')] },
      answer: [
        { t: 'p', text: 'Lesión del **tronco**: la vía piramidal todavía no cruzó (hemiplejía **contralateral**) y se lesiona el núcleo de un par craneal (parálisis **homolateral**).' },
        { t: 'p', text: '**Weber**: mesencéfalo; III homolateral (ojo afuera y abajo, ptosis, midriasis) + hemiplejía contralateral. **Millard-Gubler**: protuberancia; VII periférico (y VI) homolateral + hemiplejía contralateral.' },
      ],
      refs: [S3('07:10'), S3('08:37'), S3('10:51'), S3('13:46'), S3('14:29')],
    },
    {
      id: 'neu05-d05',
      origen: 'clase',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'piramidal',
      question: 'Diferencie el síndrome de la primera y de la segunda motoneurona.',
      quote: { text: '«La pregunta que siempre hacen en los finales es cuál es la diferencia entre el síndrome piramidal de la primera motoneurona y de la segunda»', refs: [S3('16:34')] },
      answer: [
        { t: 'p', text: '**1.ª**: espástica (fláccida el primer mes), hipertonía en navaja, hiperreflexia, Babinski, clonus, sincinesias, atrofia solo por desuso, sin fasciculaciones.' },
        { t: 'p', text: '**2.ª**: fláccida, la **triple A** (atonía, arreflexia, atrofia) y **fasciculaciones**; sin Babinski.' },
      ],
      refs: [S1('30:37'), S1('31:18'), S2('16:03'), S3('17:57')],
    },
    {
      id: 'neu05-d06',
      origen: 'clase',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'equilibrio',
      question: 'Diferencie la ataxia vestibular, cerebelosa y cordonal posterior.',
      quote: { text: '«Pregunta de final: [a una docente] le gusta preguntar: hablame sobre el síndrome cordonal posterior»', refs: [S1('03:28')] },
      answer: [
        { t: 'p', text: '**Vestibular**: marcha en estrella, vértigo periférico, nistagmo horizontal, Romberg **positivo**. **Cerebelosa**: marcha de ebrio, vértigo central, nistagmo vertical o rotatorio, Romberg **negativo**, hipotonía.' },
        { t: 'p', text: '**Cordonal posterior** (Goll y Burdach): marcha taloneante mirando los pies, **sin vértigo** ni nistagmo, Romberg **positivo**, pérdida de la sensibilidad profunda (palestesia, batiestesia, barestesia).' },
      ],
      refs: [S1('10:36'), S1('12:24'), S1('13:47'), S1('14:28'), S1('15:53'), S4('26:30')],
    },
  ],

  mcq: [
    { id: 'neu05-q01', origen: 'practica', topic: 'Parkinson', difficulty: 1, emphasis: true, stem: 'La tríada del Parkinson es:', options: [{ text: 'Bradicinesia, rigidez en rueda dentada y temblor de reposo.', why: 'Correcto.' }, { text: 'Espasticidad, hiperreflexia y Babinski.', why: 'Eso es piramidal.' }, { text: 'Vértigo, cefalea y vómitos.', why: 'Es la cerebelosa.' }, { text: 'Atonía, arreflexia y atrofia.', why: 'Es la 2.ª motoneurona.' }], answer: 0, refs: [MT('01:07:15')] },
    { id: 'neu05-q02', origen: 'practica', topic: 'Parkinson', difficulty: 1, emphasis: true, stem: 'En el Parkinson se lesiona principalmente:', options: [{ text: 'La sustancia negra.', why: 'Correcto.' }, { text: 'El núcleo de Luys.', why: 'Da hemibalismo.' }, { text: 'El cerebelo.', why: 'No.' }, { text: 'La cápsula interna.', why: 'Es piramidal.' }], answer: 0, refs: [MT('01:02:37')] },
    { id: 'neu05-q03', origen: 'practica', topic: 'Cerebeloso', difficulty: 1, emphasis: true, stem: 'La tríada del síndrome cerebeloso es:', options: [{ text: 'Vértigo central, cefalea y vómitos.', why: 'Correcto.' }, { text: 'Bradicinesia, rigidez y temblor.', why: 'Es el Parkinson.' }, { text: 'Fiebre, rigidez de nuca y alteración de la conciencia.', why: 'Es meníngea.' }, { text: 'Demencia, incontinencia y marcha.', why: 'Es Hakim-Adams.' }], answer: 0, refs: [MT('01:17:55')] },
    { id: 'neu05-q04', origen: 'practica', topic: 'Ataxia', difficulty: 2, emphasis: true, stem: 'El único trastorno del equilibrio con Romberg negativo es el:', options: [{ text: 'Cerebeloso.', why: 'Correcto.' }, { text: 'Vestibular.', why: 'Es positivo.' }, { text: 'Cordonal posterior.', why: 'Es positivo.' }, { text: 'Polineuropático.', why: 'Suele ser positivo.' }], answer: 0, refs: [S1('14:28')] },
    { id: 'neu05-q05', origen: 'practica', topic: 'Piramidal', difficulty: 2, stem: 'La hipertonía con signo de la navaja es típica del síndrome:', options: [{ text: 'Piramidal.', why: 'Correcto.' }, { text: 'Extrapiramidal.', why: 'Da rueda dentada.' }, { text: 'Cerebeloso.', why: 'Da hipotonía.' }, { text: 'De la 2.ª motoneurona.', why: 'Da atonía.' }], answer: 0, refs: [S2('14:39')] },
    { id: 'neu05-q06', origen: 'practica', topic: 'Piramidal', difficulty: 2, stem: 'En el primer mes de un ACV capsular, la hemiplejía suele ser:', options: [{ text: 'Fláccida (hipotónica).', why: 'Correcto; después se hace espástica.' }, { text: 'Espástica desde el inicio.', why: 'No.' }, { text: 'Rígida en rueda dentada.', why: 'Eso es extrapiramidal.' }, { text: 'Con fasciculaciones.', why: 'Son de la 2.ª motoneurona.' }], answer: 0, refs: [S2('01:32'), S3('02:13')] },
    { id: 'neu05-q07', origen: 'practica', topic: 'Alternas', difficulty: 2, emphasis: true, stem: 'Parálisis facial periférica derecha con hemiplejía izquierda orienta a una lesión de:', options: [{ text: 'La protuberancia derecha (Millard-Gubler).', why: 'Correcto.' }, { text: 'El mesencéfalo derecho (Weber).', why: 'Daría III, no VII.' }, { text: 'La cápsula interna izquierda.', why: 'La facial sería central.' }, { text: 'La médula cervical.', why: 'No afecta el VII.' }], answer: 0, refs: [S3('13:46'), S3('14:29')] },
    { id: 'neu05-q08', origen: 'practica', topic: 'Topografía', difficulty: 2, stem: 'La localización más frecuente de la lesión en un síndrome piramidal es:', options: [{ text: 'La cápsula interna.', why: 'Correcto.' }, { text: 'El cerebelo.', why: 'No.' }, { text: 'El nervio periférico.', why: 'Es 2.ª motoneurona.' }, { text: 'La sustancia negra.', why: 'Es extrapiramidal.' }], answer: 0, refs: [S3('06:28')] },
    { id: 'neu05-q09', origen: 'practica', topic: 'Cerebeloso', difficulty: 2, stem: 'El paciente que al llevar el dedo a la nariz se pasa del objetivo tiene:', options: [{ text: 'Dismetría (cerebelosa).', why: 'Correcto.' }, { text: 'Bradicinesia.', why: 'Es lentitud.' }, { text: 'Espasticidad.', why: 'No.' }, { text: 'Sincinesia.', why: 'No.' }], answer: 0, refs: [S4('21:05')] },
    { id: 'neu05-q10', origen: 'practica', topic: 'Parkinsonismo', difficulty: 2, stem: 'Lo que distingue el parkinsonismo de la enfermedad de Parkinson es:', options: [{ text: 'Que tiene una causa conocida (fármacos, tóxicos) y puede revertir.', why: 'Correcto.' }, { text: 'Que no tiene temblor.', why: 'Puede tenerlo.' }, { text: 'Que da Babinski.', why: 'No.' }, { text: 'Que es hereditario.', why: 'No.' }], answer: 0, refs: [S4('10:39'), S4('13:29')] },
  ],

  memory: [
    {
      id: 'neu05-m01',
      title: 'Las tríadas que pregunta',
      purpose: '«Yo pregunto tríadas.»',
      evaluates: [{ t: 'list', items: ['Parkinson: bradicinesia, rigidez, temblor de reposo', 'Cerebeloso: vértigo central, cefalea, vómitos', '2.ª motoneurona: atonía, arreflexia, atrofia'] }],
      interpret: 'El piramidal no tiene tríada; los otros tres sí.',
      mnemonic: { hook: 'BRT, VCV, AAA.', explain: 'Bradicinesia-Rigidez-Temblor; Vértigo-Cefalea-Vómitos; Atonía-Arreflexia-Atrofia.' },
      recall: { q: '¿Cuál es la tríada del síndrome cerebeloso?', a: 'Vértigo central, cefalea holocraneana y vómitos.' },
    },
    {
      id: 'neu05-m02',
      title: 'Navaja o rueda dentada',
      purpose: 'Las dos hipertonías.',
      evaluates: [{ t: 'list', items: ['Navaja: piramidal, con hiperreflexia y Babinski', 'Rueda dentada: Parkinson, reflejos normales'] }],
      interpret: 'Si cede de golpe es piramidal; si cede a saltos, extrapiramidal.',
      mnemonic: { hook: 'La navaja corta de golpe; la rueda avanza diente por diente.', explain: 'Espasticidad vs rigidez.' },
      recall: { q: '¿Qué signo tiene la rigidez del Parkinson?', a: 'La rueda dentada.' },
    },
    {
      id: 'neu05-m03',
      title: 'Hemiplejías alternas',
      purpose: 'Pregunta de examen.',
      evaluates: [{ t: 'list', items: ['Weber: mesencéfalo, III', 'Millard-Gubler: protuberancia, VII (y VI)', 'Par del lado de la lesión, cuerpo del otro'] }],
      interpret: 'El par craneal delata el nivel del tronco.',
      mnemonic: { hook: 'Weber Mira mal (III, mesencéfalo); Millard Mueca mal (VII, protuberancia).', explain: 'El III mueve el ojo; el VII, la cara.' },
      recall: { q: '¿Qué par se afecta en el síndrome de Weber?', a: 'El III, del lado de la lesión, con hemiplejía contralateral.' },
    },
  ],

  closing: {
    map: {
      center: 'Síndromes motores',
      nodes: [
        { label: 'Ataxia', tone: 'gold', items: ['Vestibular', 'Cerebelosa', 'Cordonal'] },
        { label: 'Piramidal', tone: 'sky', items: ['Navaja, Babinski', 'Cápsula', 'Weber, Millard-Gubler'] },
        { label: 'Extrapiramidal', tone: 'lilac', items: ['Tríada', 'Sustancia negra', 'Rueda dentada'] },
        { label: 'Cerebeloso', tone: 'peach', items: ['Tríada', 'Dismetría', 'Romberg −'] },
      ],
    },
    essentials: [
      'Ataxia: vestibular (estrella, Romberg +), cerebelosa (ebrio, **Romberg −**), cordonal posterior (taloneante, Romberg +, sin vértigo).',
      'Vía piramidal: Betz → cápsula interna → tronco → **decusación bulbar** (80–90 %) → asta anterior.',
      '1.ª motoneurona: espástica (navaja), hiperreflexia, **Babinski**, clonus, sincinesias. 2.ª: **triple A** + fasciculaciones.',
      'La lesión más frecuente: **cápsula interna**. Alternas: **Weber** (III) y **Millard-Gubler** (VII).',
      '**Parkinson**: sustancia negra (Lewy); tríada **bradicinesia, rigidez en rueda dentada, temblor de reposo**.',
      '**Cerebeloso**: tríada vértigo central, cefalea, vómitos; dismetría, asinergia, adiadococinesia, hipotonía.',
    ],
    links: [
      { chapterId: 'neu-02', text: '[[neu-02|Motivos de consulta II]]: temblor, corea, neuropatías.' },
      { chapterId: 'neu-03', text: '[[neu-03|Pares craneales I]]: el III del Weber.' },
      { chapterId: 'neu-04', text: '[[neu-04|Pares craneales II]]: la parálisis facial central y periférica.' },
      { chapterId: 'neu-06', text: '[[neu-06|Otros síndromes]]: sensibilidad, meníngeo e hipertensión endocraneana.' },
    ],
    pitfalls: [
      'Decir que el Romberg es positivo en el cerebeloso.',
      'Confundir navaja (piramidal) con rueda dentada (Parkinson).',
      'Darle fasciculaciones a la primera motoneurona.',
      'Olvidar que el par craneal de la hemiplejía alterna es del lado de la lesión.',
      'Decir que el Parkinson tiene hiperreflexia.',
    ],
    miniExam: [
      {
        id: 'neu05-x01',
        origen: 'practica',
        topic: 'Integración',
        difficulty: 2,
        stem: 'Paciente con hemiplejía derecha espástica, Babinski derecho y comisura derecha caída, que arruga la frente. La lesión está en:',
        options: [
          { text: 'La cápsula interna izquierda.', why: 'Correcto: hemiplejía directa con facial central.' },
          { text: 'La protuberancia derecha.', why: 'Daría facial periférica.' },
          { text: 'La médula cervical derecha.', why: 'No daría facial.' },
          { text: 'La sustancia negra.', why: 'No da Babinski.' },
        ],
        answer: 0,
        refs: [S3('04:21'), S3('06:28')],
      },
    ],
  },

  maneuvers: {
    ids: ['trofismo-tono', 'fuerza-mingazzini', 'reflejo-plantar-babinski', 'clonus', 'reflejos-osteotendinosos', 'romberg', 'indice-nariz', 'talon-rodilla'],
    note: 'El examen del síndrome piramidal y de la taxia.',
  },

  clase,
  diagrams: {},
};

export default chapter;
