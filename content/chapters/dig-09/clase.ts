import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * dig-09: clase visual de la malabsorción y el intestino irritable.
 *  1. Clases de Ortega: «Malabsorción 1» (00:01–33:42), «Malabsorción 2» (00:00–16:31) y «Síndrome de intestino irritable» (00:02–16:09).
 *  2. Libro de Clínica Médica de Ortega (p. 378–382): causas por fase, Van de Kamer, D-xilosa, Roma III y signos de alarma.
 *  3. Preguntero: bloque «Síndromes: pilórico, íleo y malabsorción», P8–P9.
 * Correcciones sin atribuir (ver content/traceability/dig-09.md): vitamina D (no B12) para el calcio; el porqué de la D-xilosa;
 * Van de Kamer > 6 g/día; gluten = trigo, avena, cebada y centeno.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const A1 = (t: string) => r('malabs-1', t);
const A2 = (t: string) => r('malabs-2', t);
const S = (t: string) => r('sii', t);
const L = (p: string) => r('libro', undefined, p);

const GRAL = 'Fisiología general, no se da en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-normal',
    sec: 'fases',
    titulo: 'Cómo se absorbe la grasa',
    etapas: ['normal'],
    fig: { f: 'absorcion', vistas: ['normal'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'normal', text: '**Luz del duodeno**: la lipasa del páncreas corta la grasa y las **sales biliares** la envuelven en micelas.' },
          { k: 'normal', text: '**Mucosa** del yeyuno e íleon: las vellosidades absorben las micelas.' },
          { k: 'normal', text: '**Transporte**: la grasa sale del enterocito como quilomicrones, **por la linfa**.' },
        ],
      },
    ],
    aclara: { text: 'Micelas y quilomicrones son el detalle del mecanismo; la clase se queda en las tres fases.', origen: GRAL },
    voz: [
      'Para entender la malabsorción hay que seguir a la grasa del almuerzo. En la luz del duodeno, la lipasa del páncreas la corta, y las sales biliares la envuelven en pequeñas gotas que el agua puede llevar.',
      'Esas gotas llegan a la mucosa del yeyuno y del íleon, y las vellosidades las absorben.',
      'Por último, la grasa sale del enterocito y viaja por la linfa. Tres fases: luz, mucosa y transporte. Si falla cualquiera, aparece la malabsorción.',
    ],
    refs: [A1('03:45'), A1('04:26'), A1('11:48'), A1('26:13')],
  },
  {
    id: 'f-intraluminal',
    sec: 'fases',
    titulo: 'Falla la luz: no se digiere',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'absorcion', vistas: ['intraluminal'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Falta **jugo pancreático** o faltan **sales biliares** en el duodeno.' },
          { k: 'mecanismo', text: 'La grasa y las proteínas **no se degradan**; sin bilis tampoco se absorben las vitaminas **A, D, E y K**.' },
          { k: 'signo', text: 'La grasa sale con las heces: **esteatorrea**.' },
        ],
      },
    ],
    voz: [
      'Primera falla: la fase intraluminal. En el duodeno falta el jugo del páncreas, o faltan las sales biliares que vienen del hígado y la vesícula.',
      'Entonces la grasa y las proteínas no se degradan, y sin bilis tampoco se absorben las vitaminas liposolubles: la A, la D, la E y la K.',
      'Esa grasa sigue de largo y sale con la materia fecal. Eso es la esteatorrea.',
    ],
    refs: [A1('05:58'), A1('06:38'), A1('07:26'), A1('08:53'), L('379')],
  },
  {
    id: 'f-mucosa',
    sec: 'fases',
    titulo: 'Falla la mucosa: no se absorbe',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'absorcion', vistas: ['mucosa'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'En la **celíaca**, el gluten activa anticuerpos que **destruyen las vellosidades**.' },
          { k: 'mecanismo', text: 'Los nutrientes llegan digeridos, pero hay **menos superficie** para absorberlos.' },
          { k: 'signo', text: 'Se pierde todo: grasas, proteínas, hidratos, vitaminas y minerales. **Pérdida de peso**.' },
        ],
      },
    ],
    voz: [
      'Segunda falla: la mucosa. El ejemplo es la enfermedad celíaca: el gluten activa anticuerpos que destruyen las vellosidades del intestino delgado.',
      'Ahora el páncreas y la bilis hicieron su trabajo, los nutrientes llegan digeridos, pero la superficie para absorberlos se achicó.',
      'Y como el problema está en la pared, se pierde de todo: grasas, proteínas, hidratos de carbono, vitaminas y minerales. El paciente adelgaza.',
    ],
    refs: [A1('11:48'), A1('12:30'), A1('13:11'), A1('13:52')],
  },
  {
    id: 'f-transporte',
    sec: 'fases',
    titulo: 'Falla la linfa: no sale',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'absorcion', vistas: ['transporte'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'El **drenaje linfático** del intestino está obstruido. Es raro.' },
          { k: 'mecanismo', text: 'Por la linfa viajan los lípidos y las **lipoproteínas**: se pierden los dos.' },
          { k: 'signo', text: 'Esteatorrea y **enteropatía perdedora de proteínas**.' },
        ],
      },
    ],
    voz: [
      'Tercera falla, la menos frecuente: el transporte. El drenaje linfático del intestino está obstruido.',
      'Por la linfa viajan los lípidos unidos a proteínas, así que se pierden las dos cosas.',
      'El paciente tiene esteatorrea y además pierde proteínas: es la enteropatía perdedora de proteínas.',
    ],
    refs: [A1('26:13'), A1('26:56'), A1('27:38'), L('379')],
  },
  {
    id: 'f-calcio',
    sec: 'clinica',
    titulo: 'El calcio que falta',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    amplio: true,
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Sin **vitamina D** (liposoluble) el intestino no absorbe calcio: **hipocalcemia**.' },
          { k: 'mecanismo', text: 'Sube la **PTH**, que saca calcio del hueso.' },
          { k: 'signo', text: 'Hueso: **raquitismo** en el niño, **osteomalacia** en el adulto, osteoporosis.' },
          { k: 'signo', text: 'Nervio y músculo más excitables: parestesias y **tetania** (Trousseau, Chvostek).' },
        ],
      },
    ],
    aclara: { text: 'La vitamina D es la que permite absorber el calcio en el intestino; la PTH, además, aumenta su activación en el riñón.', origen: GRAL },
    voz: [
      'Ahora, de cada falta sale un signo. El calcio: sin vitamina D, que es liposoluble y se pierde con la grasa, el intestino no absorbe calcio y aparece la hipocalcemia.',
      'El cuerpo responde subiendo la parathormona, que saca calcio del hueso para mantener la sangre.',
      'El precio lo paga el hueso: raquitismo en el niño, osteomalacia en el adulto, y osteoporosis.',
      'Y con poco calcio, el nervio y el músculo se excitan de más: parestesias y tetania, que se ponen en evidencia con las maniobras de Trousseau y Chvostek.',
    ],
    refs: [A2('02:49'), A2('04:17'), A2('05:03'), L('380')],
  },
  {
    id: 'f-proteinas',
    sec: 'clinica',
    titulo: 'Proteínas, vitamina K y hierro',
    etapas: ['mecanismo', 'signo'],
    amplio: true,
    bloques: [
      { t: 'def', term: 'Proteínas', tono: 'sky', text: 'Baja la **albúmina** → baja la presión oncótica → **edema** generalizado. Y se consume el músculo: **emaciación**.' },
      { t: 'def', term: 'Vitamina K', tono: 'red', en: 1, text: 'No se fabrican los **factores de coagulación** que dependen de ella → **fenómenos hemorrágicos**.' },
      { t: 'def', term: 'Hierro, B12, ácido fólico', tono: 'rose', en: 2, text: 'Sin materia prima para el glóbulo rojo → **anemia**.' },
    ],
    voz: [
      'Con las proteínas pasa lo mismo, paso por paso: si se pierden, baja la albúmina, baja la presión oncótica, y el líquido se va a los tejidos: edema. Y el cuerpo empieza a consumir su propio músculo.',
      'La vitamina K hace falta para fabricar los factores de coagulación. Si falta, el paciente sangra.',
      'Y sin hierro, vitamina B doce o ácido fólico, no hay materia prima para el glóbulo rojo: anemia.',
    ],
    refs: [A2('05:44'), A2('06:27'), A2('00:43'), L('380')],
  },
  {
    id: 'f-xilosa',
    sec: 'diagnostico',
    titulo: 'Por qué la xilosa separa páncreas de mucosa',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'absorcion', vistas: ['intraluminal', 'mucosa'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'La **D-xilosa** es un azúcar que se absorbe **sin necesitar enzimas pancreáticas**.' },
      { t: 'def', term: 'Páncreas enfermo', tono: 'mint', en: 0, text: 'La mucosa está sana: absorbe la xilosa y la elimina por la orina. **> 5 g en 5 h**.' },
      { t: 'def', term: 'Mucosa enferma', tono: 'red', en: 1, text: 'No la absorbe: queda en la luz. **< 5 g en 5 h**.' },
    ],
    aclara: { text: 'Por eso la xilosa mide solo la mucosa: no depende de la digestión del páncreas ni de la bilis.', origen: GRAL },
    voz: [
      'Y una vez confirmada la esteatorrea, ¿cómo sé si el problema está en el páncreas o en la mucosa? Con la D-xilosa, un azúcar que se absorbe sin necesitar las enzimas del páncreas. Si el páncreas está enfermo pero la mucosa sana, la xilosa se absorbe igual, pasa a la sangre y se elimina por la orina: más de cinco gramos en cinco horas.',
      'Si la mucosa está dañada, la xilosa no se absorbe, se queda en la luz, y en la orina aparece poca: menos de cinco gramos.',
    ],
    refs: [A2('10:46'), A2('12:14'), A2('14:24'), L('380')],
  },
  {
    id: 'f-sii',
    sec: 'sii',
    titulo: 'Intestino irritable: sin lesión',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'tracto', vistas: [{ luz: { colon: 'sky', recto: 'sky' } }] },
    anchoFig: 'chica',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'No hay lesión: es un trastorno **funcional**, de la **motilidad**.' },
          { k: 'mecanismo', text: 'Estrés y ansiedad alteran el control cerebro–intestino: contracciones anormales, intestino más sensible.' },
          { k: 'signo', text: 'Dolor crónico que **mejora al evacuar**, con constipación o diarrea.' },
        ],
      },
    ],
    aclara: { text: 'En clase se aclara que la fisiopatogenia no hace falta saberla en detalle.', origen: 'Clase, min 04:44 y 06:05.' },
    voz: [
      'Y el intestino irritable es lo opuesto: el intestino no tiene ninguna lesión. Es un trastorno funcional, de la motilidad.',
      'El estrés y la ansiedad alteran la comunicación entre el cerebro y el intestino: aparecen contracciones anormales y el intestino se vuelve más sensible a la distensión. Es el dolor de panza antes de rendir un final, pero crónico.',
      'Por eso el dolor mejora al evacuar, y se acompaña de constipación o de diarrea.',
    ],
    refs: [S('00:42'), S('04:44'), S('05:25'), S('06:05'), L('381')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'fases', label: 'Las tres fases' },
    { id: 'clinica', label: 'De la falta al signo' },
    { id: 'diagnostico', label: 'D-xilosa' },
    { id: 'sii', label: 'Intestino irritable' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-definicion',
    sec: 'fases',
    titulo: 'Síndrome de malabsorción',
    fig: { f: 'tracto', vistas: [{ luz: { duodeno: 'gold', pancreas: 'gold', vesicula: 'gold', yeyuno: 'peach', ileon: 'peach' } }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', text: 'Alteración de la **digestión** y/o la **absorción** de los nutrientes.' },
      { t: 'lista', en: 1, items: ['**Macronutrientes**: hidratos de carbono, proteínas, lípidos.', '**Micronutrientes**: vitaminas y minerales.'] },
      { t: 'texto', en: 2, text: 'Se estudia **razonando**: ¿qué no absorbe? Entonces, ¿qué le falta?' },
    ],
    voz: [
      'El síndrome de malabsorción es una alteración de la digestión, de la absorción, o de las dos, de los nutrientes que el cuerpo necesita. No lo produce una sola enfermedad: lo producen muchísimas.',
      'Lo que no se absorbe son macronutrientes, es decir hidratos de carbono, proteínas y lípidos, y micronutrientes, que son vitaminas y minerales.',
      'Por eso el profesor insiste en estudiarlo razonando: si no absorbo tal nutriente, ¿qué me va a faltar? Ahí está toda la clínica.',
    ],
    refs: [A1('00:47'), A1('02:13'), A1('02:58'), A1('28:19'), L('378')],
  },
  {
    id: 't-fases',
    sec: 'fases',
    titulo: 'Las tres fases',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Fase', 'Dónde', 'Qué falla'],
        filas: [
          ['**Intraluminal**', 'Luz del duodeno', 'La **digestión**: jugo pancreático, sales biliares'],
          ['**Mucosa**', 'Yeyuno e íleon', 'La **absorción**: la pared del delgado'],
          ['**Transporte**', 'Linfa', 'La salida de lípidos y proteínas (rara)'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Las fases intraluminal y mucosa: las más frecuentes y las que se preguntan.', cita: 'La que yo sí o sí quiero que sepan es la fase intraluminal y la fase mucosa, que es la más frecuente que le pueden llegar a preguntar.', ref: A1('27:40') },
    voz: [
      'Se ordena en tres fases. La intraluminal, en la luz del duodeno, donde falla la digestión porque faltan los jugos del páncreas o las sales biliares. La mucosa, en el yeyuno y el íleon, donde los nutrientes llegan digeridos pero la pared no los absorbe. Y la de transporte, por la linfa, que es rara. El profesor pide sí o sí las dos primeras, que son las más frecuentes y las que se preguntan.',
    ],
    refs: [A1('02:58'), A1('11:48'), A1('26:13'), A1('27:38'), A2('09:24'), L('379')],
  },
  {
    id: 't-intraluminal',
    sec: 'fases',
    titulo: 'Fase intraluminal: causas',
    fig: { f: 'tracto', vistas: [{ luz: { pancreas: 'gold', higado: 'peach', vesicula: 'peach', duodeno: 'gold' } }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'def', term: 'Insuficiencia pancreática', tono: 'gold', text: 'Pancreatitis crónica, fibrosis quística, cáncer de páncreas. Faltan enzimas: no se degradan **proteínas, grasas e hidratos**.' },
      { t: 'def', term: 'Déficit de sales biliares', tono: 'peach', en: 1, text: 'Obstrucción de la vía biliar, hepatopatías, enfermedad del íleon terminal. No se absorben **grasas y vitaminas liposolubles**.' },
      { t: 'texto', en: 2, text: 'El estómago es causa en **menos del 5 %**.' },
    ],
    voz: [
      'En la fase intraluminal, la falla está en el páncreas, la vía biliar, el hígado o, rara vez, el estómago. La insuficiencia pancreática, por una pancreatitis crónica, una fibrosis quística o un cáncer de páncreas, deja sin enzimas al duodeno: no se degradan las proteínas, las grasas ni los hidratos.',
      'Si faltan las sales biliares, por una obstrucción de la vía biliar o una enfermedad del hígado, lo que no se absorbe son las grasas y las vitaminas liposolubles.',
      'El estómago es causa en menos del cinco por ciento.',
    ],
    refs: [A1('04:26'), A1('05:12'), A1('05:58'), A1('06:38'), A1('10:22'), L('379')],
  },
  {
    id: 't-mucosa',
    sec: 'fases',
    titulo: 'Fase mucosa: causas',
    fig: { f: 'mucosa', modo: 'malabsortiva' },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Estructurales', tono: 'peach', text: '**Enfermedad celíaca** (esprue no tropical), esprue tropical, enteritis por radiación, agammaglobulinemia.' },
      { t: 'def', term: 'Parcial', tono: 'sky', en: 1, text: 'Déficit de **disacaridasas**: la intolerancia a la lactosa.' },
      { t: 'def', term: 'Menos intestino', tono: 'lilac', en: 1, soloWeb: true, text: 'Resecciones intestinales, intestino corto.' },
    ],
    voz: [
      'En la fase mucosa, el problema está en la pared del delgado, desde la cuarta porción del duodeno hacia el yeyuno y el íleon. Las causas estructurales son la enfermedad celíaca o esprue no tropical, el esprue tropical, la enteritis por radiación y la agammaglobulinemia.',
      'Y puede ser parcial, como el déficit de disacaridasas: los pacientes intolerantes a la lactosa.',
    ],
    refs: [A1('11:06'), A1('12:30'), A1('13:52'), A1('14:35'), L('379')],
  },
  {
    id: 't-celiaca',
    sec: 'fases',
    titulo: 'Enfermedad celíaca',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Autoinmune: el **gluten** (trigo, avena, cebada, centeno) activa anticuerpos que **destruyen las vellosidades**.' },
      { t: 'lista', en: 1, items: ['Pierde **superficie de absorción**: pierde nutrientes y peso.', 'Frecuente en **niños**.', 'Fases: aguda, silente, latente. Con **dieta sin gluten** los anticuerpos quedan inactivos; si vuelve el gluten, se reactivan.'] },
      { t: 'texto', en: 2, text: 'La celíaca es **una causa** de malabsorción, no un sinónimo.' },
    ],
    aclara: { text: 'El grado de atrofia se mide por biopsia; en clase se aclara que no hace falta saberlo.', origen: 'Clase, min 20:16 y 26:13.' },
    voz: [
      'La enfermedad celíaca es autoinmune. El gluten, presente en el trigo, la avena, la cebada y el centeno, activa anticuerpos que destruyen las vellosidades del intestino.',
      'Al perder vellosidades se pierde superficie de absorción, y con ella nutrientes y peso. Es muy frecuente en los chicos. Tiene fases: una aguda, y después silente o latente. Con una dieta sin gluten los anticuerpos se quedan inactivos; si el paciente vuelve a comer gluten, se reactivan y vuelven a dañar la mucosa.',
      'Y un detalle que salió en clase: la celíaca no es lo mismo que el síndrome de malabsorción. Es una de sus causas, dentro de la fase mucosa.',
    ],
    refs: [A1('13:52'), A1('14:35'), A1('15:18'), A1('16:00'), A1('19:32'), L('379')],
  },
  {
    id: 't-transporte',
    sec: 'fases',
    titulo: 'Fase de transporte y otras causas',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Transporte (linfática)', tono: 'lilac', text: 'Linfangiectasia, linfomas, enfermedad de Whipple. Se pierden **lípidos y proteínas**: enteropatía perdedora de proteínas.' },
      { t: 'def', term: 'Secundarias, poco frecuentes', tono: 'sky', en: 1, text: 'Pared intestinal (Crohn, amiloidosis), vascular (isquemia mesentérica), metabólicas (hipertiroidismo), **iatrogénicas** (gastrectomía, resecciones, fármacos).' },
    ],
    voz: [
      'La fase de transporte es la menos frecuente: un mal drenaje linfático, por ejemplo por una linfangiectasia, un linfoma o la enfermedad de Whipple. Se pierden lípidos y proteínas, y aparece la enteropatía perdedora de proteínas.',
      'Y hay otras causas, secundarias y poco frecuentes: enfermedades de la pared, como el Crohn, vasculares, metabólicas, y las iatrogénicas, como una gastrectomía.',
    ],
    refs: [A1('26:13'), A1('26:56'), A1('27:38'), L('379')],
  },
  {
    id: 't-diarrea',
    sec: 'clinica',
    titulo: 'Lo cardinal: la diarrea crónica',
    fig: { f: 'absorcion', vistas: ['intraluminal'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'red', text: 'El síntoma **cardinal** de toda malabsorción es la **diarrea crónica**.' },
      { t: 'texto', en: 1, text: 'La forma más frecuente es la **esteatorrea**.' },
    ],
    examen: { origen: 'ortega', texto: 'La diarrea crónica como manifestación cardinal de la malabsorción.', cita: 'Si no me dicen diarrea crónica en un síndrome de mala absorción, lo van a bochar.', ref: A1('28:54') },
    voz: [
      'Vamos a la clínica. Hay algo que siempre es cardinal: la diarrea crónica. El profesor es tajante: si en un síndrome de malabsorción no dicen diarrea crónica, los bochan.',
      'Y la forma más frecuente de esa diarrea es la esteatorrea.',
    ],
    refs: [A1('26:13'), A1('28:19'), A1('28:54'), L('379')],
  },
  {
    id: 't-esteatorrea',
    sec: 'clinica',
    titulo: 'Esteatorrea',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Esteatorrea', tono: 'gold', text: 'Grasa en las heces: **malolientes, pastosas, amarillentas o arcillosas, grasosas, espumosas, que flotan**. Menos frecuentes pero abundantes.' },
      { t: 'def', term: 'Creatorrea', tono: 'peach', en: 1, text: 'Proteínas en las heces: en cuadros **más crónicos** (pancreatitis crónica, celíaca avanzada).' },
    ],
    examen: { origen: 'ortega', texto: 'Qué es la esteatorrea.', cita: 'Esteatorrea, pregunta de parcial, choice, final, oral, en cualquier lado del mundo donde vayan, me van a preguntar.', ref: A1('08:10') },
    voz: [
      'La esteatorrea es grasa en la materia fecal. Son heces malolientes, pastosas, amarillentas o color arcilla, muy grasosas y espumosas, que flotan en el agua. A diferencia de una diarrea acuosa, son menos frecuentes pero más abundantes. El profesor la pide en el parcial, en el choice, en el final y en el oral.',
      'Si lo que se pierde son proteínas, se llama creatorrea, y aparece en cuadros más crónicos, como la pancreatitis crónica o una celíaca avanzada.',
    ],
    refs: [A1('08:10'), A1('08:53'), A1('29:00'), A1('29:40'), L('379')],
  },
  {
    id: 't-triada',
    sec: 'clinica',
    titulo: 'La tríada y la pérdida de peso',
    fig: { f: 'mucosa', modo: 'malabsortiva' },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', text: '**Esteatorrea + distensión abdominal + flatulencia**.' },
      { t: 'prof', en: 1, text: 'Si además tiene pérdida de peso, hay que pensar en un síndrome de malabsorción **hasta que se demuestre lo contrario**.', ref: A1('33:02') },
      { t: 'texto', en: 2, text: '**Pérdida de peso**: primero se pierde la grasa, después las proteínas (emaciación). Es lo más **constante**.' },
    ],
    voz: [
      'La tríada característica: esteatorrea, distensión abdominal y flatulencia.',
      'Si a eso se suma la pérdida de peso, la consigna del profesor es pensar en malabsorción hasta que se demuestre lo contrario.',
      'El paciente adelgaza porque primero pierde la grasa y después las proteínas: se funde el músculo, y entra en emaciación. Es la manifestación más constante.',
    ],
    refs: [A1('08:10'), A1('32:21'), A1('33:02'), L('379')],
  },
  {
    id: 't-macro',
    sec: 'clinica',
    titulo: 'No absorbe… entonces',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['No absorbe', 'Aparece'],
        filas: [
          ['Hidratos de carbono', 'Cansancio, astenia: falta la principal fuente de energía'],
          ['Lípidos', '**Esteatorrea**'],
          ['Proteínas', 'Pérdida de masa muscular; **edema** por hipoalbuminemia'],
          ['Vitaminas y minerales', 'Déficits crónicos: anemia, tetania, sangrado'],
        ],
      },
    ],
    voz: [
      'Y ahora el razonamiento que pide el profesor. Si no absorbe hidratos de carbono, falta la principal fuente de energía: el paciente está cansado. Si no absorbe lípidos, esteatorrea. Si no absorbe proteínas, pierde masa muscular y aparece el edema por la albúmina baja. Y con el tiempo se instalan los déficits de vitaminas y minerales, que son los datos más específicos.',
    ],
    refs: [A1('33:02'), A1('33:42'), A2('00:00'), A2('06:27')],
  },
  {
    id: 't-anemias',
    sec: 'clinica',
    titulo: 'Las anemias',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Hierro', tono: 'rose', text: 'Anemia **ferropénica**: **hipocrómica microcítica**. Coiloniquia.' },
      { t: 'def', term: 'B12 y ácido fólico', tono: 'lilac', en: 1, text: 'Anemia **megaloblástica**: **macrocítica**. Es más frecuente que falte el ácido fólico.' },
      { t: 'def', term: 'Solo la B12', tono: 'sky', en: 2, text: 'Además, **síndrome neuroanémico**: anemia + síndrome del **cordón posterior**.' },
    ],
    voz: [
      'Entre los déficits, las anemias. Si no absorbe hierro, anemia ferropénica, que es hipocrómica y microcítica; puede verse la uña en cuchara, la coiloniquia.',
      'Si no absorbe vitamina B doce o ácido fólico, anemia megaloblástica, que es macrocítica. Es más frecuente que falte el ácido fólico.',
      'Y la falta de B doce agrega algo propio: el síndrome neuroanémico, que es la anemia más un síndrome del cordón posterior de la médula.',
    ],
    refs: [A2('00:43'), A2('01:28'), A2('02:09'), A2('02:49'), L('380')],
  },
  {
    id: 't-calcio',
    sec: 'clinica',
    titulo: 'Calcio y vitamina D',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Parestesias, **tetania**, **raquitismo** (niño), **osteomalacia** (adulto), osteoporosis.' },
      { t: 'def', term: 'Trousseau', tono: 'peach', en: 1, text: 'Se infla el manguito del tensiómetro: la mano hace la **«mano de partero»**.' },
      { t: 'def', term: 'Chvostek', tono: 'peach', en: 1, text: 'Se percute el **nervio facial** por delante de la oreja: se contrae ese lado de la cara.' },
    ],
    aclara: { text: 'Lo que permite absorber calcio en el intestino es la vitamina D.', origen: 'Libro, p. 380.' },
    voz: [
      'El calcio y la vitamina D. Su falta da parestesias, crisis de tetania, raquitismo en los chicos, osteomalacia en el adulto, y osteoporosis.',
      'La hipocalcemia se pone en evidencia con dos maniobras. Trousseau: se infla el manguito del tensiómetro y la mano se contrae en mano de partero. Chvostek: se percute el nervio facial por delante de la oreja y se contrae ese lado de la cara.',
    ],
    refs: [A2('02:49'), A2('05:03'), A2('05:44'), L('380')],
  },
  {
    id: 't-otros-deficits',
    sec: 'clinica',
    titulo: 'Sangrado, edema, piel y ojos',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Déficit', 'Manifestación'],
        filas: [
          ['Vitamina K', '**Fenómenos hemorrágicos**: equimosis, epistaxis; tiempo de protrombina prolongado'],
          ['Proteínas', '**Edema generalizado** (hipoalbuminemia)'],
          ['Complejo B y vitamina C', 'Glositis, queilitis, estomatitis; pelagra (B3), beriberi (B1), escorbuto (C)'],
          ['Vitamina A', '**Ceguera nocturna**, xeroftalmia, queratomalacia'],
        ],
      },
    ],
    voz: [
      'El resto de los déficits. Sin vitamina K, fenómenos hemorrágicos: moretones, sangrado de nariz, y en el laboratorio el tiempo de protrombina prolongado. Sin proteínas, edema generalizado. Sin vitaminas del complejo B y C, lesiones de piel y mucosas: glositis, queilitis, estomatitis, y en los casos graves pelagra, beriberi o escorbuto. Y sin vitamina A, los ojos: ceguera nocturna, sequedad ocular y queratomalacia.',
    ],
    refs: [A2('05:44'), A2('06:27'), A2('07:13'), L('380')],
  },
  {
    id: 't-anamnesis',
    sec: 'diagnostico',
    titulo: 'Cuándo sospecharla',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Típico: **esteatorrea + pérdida de peso con apetito conservado**.' },
      { t: 'lista', en: 1, items: ['Muchos tienen síntomas **leves**: distensión, flatulencias, borborigmos.', 'Otros están **asintomáticos** mucho tiempo: las fases silente y latente no dan síntomas.'] },
    ],
    voz: [
      'Para el diagnóstico, primero una buena anamnesis. La presentación típica es la esteatorrea con pérdida de peso, en un paciente que conserva el apetito.',
      'Pero muchos tienen síntomas leves: distensión, flatulencias, ruidos intestinales. Y otros están asintomáticos durante mucho tiempo, porque las fases silente y latente no dan síntomas.',
    ],
    refs: [A2('07:57'), A2('08:39'), L('380')],
  },
  {
    id: 't-vandekamer',
    sec: 'diagnostico',
    titulo: 'Van de Kamer y Sudán',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Van de Kamer (cuantitativo)', tono: 'gold', text: 'Heces de **72 horas** con una dieta de **100 g de grasa por día**. Más de **6 g/día** de grasa en heces: esteatorrea.' },
      { t: 'def', term: 'Sudán (cualitativo)', tono: 'peach', en: 1, text: 'Tinción de la grasa de las heces, vista al **microscopio**.' },
      { t: 'texto', en: 2, text: 'Los dos **confirman la esteatorrea**. Después hay que ubicar la fase.' },
    ],
    examen: { origen: 'ortega', texto: 'El test de Van de Kamer.', cita: 'Prueba de Van de Kamer. Pregunta de parcial. Como si fuese el Padre Nuestro también tienen que saber el test de Van de Kamer.', ref: A1('30:06') },
    voz: [
      'La esteatorrea se confirma en la materia fecal, con dos pruebas. La cuantitativa es la de Van de Kamer, que el profesor pide saber como el Padre Nuestro: se recogen las heces durante setenta y dos horas, mientras el paciente come cien gramos de grasa por día. Si elimina más de seis gramos de grasa por día, tiene esteatorrea.',
      'La cualitativa es la tinción con Sudán: se colorea la grasa de las heces y se mira al microscopio.',
      'Las dos confirman la esteatorrea. El paso siguiente es saber de dónde viene.',
    ],
    refs: [A1('29:40'), A1('30:06'), A1('30:20'), A1('31:41'), A1('32:21'), L('379'), L('380')],
  },
  {
    id: 't-xilosa',
    sec: 'diagnostico',
    titulo: 'D-xilosa: ¿páncreas o mucosa?',
    amplio: true,
    bloques: [
      { t: 'texto', text: 'Se dan **25 g de D-xilosa** en agua y se mide en la **orina de 5 horas** (o en sangre a la hora y a las 2 horas).' },
      { t: 'def', term: 'Más de 5 g', tono: 'mint', en: 1, text: 'Normal: la mucosa absorbe. Orienta a **páncreas**.' },
      { t: 'def', term: 'Menos de 5 g', tono: 'red', en: 1, text: 'No absorbe: **intestino delgado** (fase mucosa).' },
    ],
    voz: [
      'Para separar la fase intraluminal de la mucosa está la prueba de la D-xilosa. Se dan veinticinco gramos disueltos en agua, y se mide cuánto aparece en la orina de cinco horas, o en sangre a la hora y a las dos horas.',
      'Si elimina más de cinco gramos, la mucosa absorbe bien: la malabsorción viene del páncreas. Si elimina menos de cinco, el problema está en el intestino delgado.',
    ],
    refs: [A2('09:24'), A2('10:46'), A2('11:28'), A2('12:14'), A2('14:24'), L('380')],
  },
  {
    id: 't-celiaca-dx',
    sec: 'diagnostico',
    titulo: 'Si se sospecha celíaca',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Serología', tono: 'lilac', text: 'Anticuerpos **antitransglutaminasa** y **antiendomisio** (IgA).' },
      { t: 'def', term: 'Biopsia', tono: 'sky', en: 1, text: 'Del duodeno distal y el yeyuno: confirma y define el grado.' },
      { t: 'def', term: 'Radiografía', tono: 'peach', en: 1, soloWeb: true, text: 'Asas dilatadas con gas; indica el sitio de la biopsia.' },
    ],
    voz: [
      'Si se sospecha una celíaca, se piden los anticuerpos antitransglutaminasa y antiendomisio, que son pruebas serológicas.',
      'Y si el paciente acepta, la biopsia del intestino, que confirma el diagnóstico y muestra en qué grado está. Después, dieta sin gluten.',
    ],
    refs: [A2('15:07'), A2('15:47'), L('381')],
  },
  {
    id: 't-sii-def',
    sec: 'sii',
    titulo: 'Síndrome de intestino irritable',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Alteración **funcional** del intestino: dolor o malestar **crónico** con alteración del ritmo evacuatorio, **sin causa orgánica**.' },
      { t: 'texto', en: 1, text: 'Ninguna causa estructural, bioquímica ni infecciosa. El diagnóstico es **por exclusión**.' },
    ],
    voz: [
      'Pasamos al síndrome de intestino irritable. Es una alteración funcional, motora, del intestino: dolor o malestar abdominal crónico, con alteración del ritmo evacuatorio, sin una causa orgánica que lo explique.',
      'No hay una infección, ni una lesión, ni una alteración bioquímica. Por eso se diagnostica por exclusión: cuando se descartó todo lo orgánico.',
    ],
    refs: [S('00:42'), S('01:23'), S('02:04'), L('381')],
  },
  {
    id: 't-roma',
    sec: 'sii',
    titulo: 'Criterios de Roma',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Dolor o malestar abdominal recurrente **al menos 3 días por mes en los últimos 3 meses**…' },
      { t: 'lista', en: 1, items: ['…con **2 o más** de: **mejora con la defecación**.', 'Comienzo asociado a un cambio en la **frecuencia** de las deposiciones.', 'Comienzo asociado a un cambio en la **forma** de las deposiciones.'] },
      { t: 'texto', en: 2, soloWeb: true, text: 'Los síntomas comenzaron al menos 6 meses antes (Roma III).' },
    ],
    examen: { origen: 'ortega', texto: 'Los criterios de Roma del intestino irritable.', cita: 'Lo que son los criterios de Roma es pregunta de parcial. Esto, lo que está en el cuadrito, sí o sí lo tienen que estudiar.', ref: S('01:53') },
    voz: [
      'Para definirlo se usan los criterios de Roma, que el profesor marca como pregunta de parcial. Dolor o malestar abdominal recurrente, al menos tres días por mes, en los últimos tres meses.',
      'Asociado a dos o más de estos: que mejore con la defecación, que haya empezado con un cambio en la frecuencia de las deposiciones, o con un cambio en su forma. Para recordarlo: tres días, tres meses, dos de tres.',
    ],
    refs: [S('01:23'), S('01:53'), S('02:04'), S('02:44'), S('03:24'), L('381')],
  },
  {
    id: 't-sii-clinica',
    sec: 'sii',
    titulo: 'Clínica',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Dolor en el **abdomen inferior** + alteración del hábito: **constipación (70–80 %)** o diarrea (20–30 %), que pueden alternar.' },
      { t: 'lista', en: 1, items: ['El dolor **desaparece al evacuar**.', 'Cambia la consistencia de las heces; **moco**.', 'Sensación de **evacuación incompleta** y de distensión.'] },
      { t: 'texto', en: 2, soloWeb: true, text: 'Frecuente; empieza en la adolescencia o juventud y pocos consultan.' },
    ],
    voz: [
      'La clínica: dolor en la parte baja del abdomen, con alteración del hábito evacuatorio. Lo más frecuente es la constipación, en el setenta a ochenta por ciento; el resto tiene diarrea, y pueden alternar.',
      'Ayudan al diagnóstico: el dolor que desaparece al evacuar, el cambio en la consistencia de las heces, el moco, la sensación de no haber evacuado del todo, y la distensión.',
    ],
    refs: [S('02:44'), S('04:04'), S('07:25'), S('08:45'), S('09:25'), S('14:49'), L('382')],
  },
  {
    id: 't-alarma',
    sec: 'sii',
    titulo: '¿Funcional o hay algo orgánico?',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Intestino irritable', tono: 'sky', items: ['Dolor crónico + trastorno evacuatorio', 'Joven', 'Examen y estudios **normales**'] },
          { titulo: 'Alarma: buscar lo orgánico', tono: 'red', items: ['**Pérdida de peso**, fiebre', '**Sangre** oculta o visible; **grasa** en las heces', 'Dolor o diarrea que **despiertan de noche**', '**Mayor de 50** (o de 40 con antecedentes de cáncer de colon): **colonoscopía**'] },
        ],
      },
    ],
    voz: [
      'Lo más importante es no confundirlo con algo orgánico. El intestino irritable es un dolor crónico con trastorno evacuatorio, en general en gente joven, con examen y estudios normales.',
      'Hay datos que no le corresponden y obligan a buscar otra cosa: la pérdida de peso, la fiebre, la sangre en la materia fecal, la grasa, o el dolor que despierta de noche. Y la edad: en un mayor de cincuenta años, o de cuarenta con antecedentes de cáncer de colon, ese mismo cuadro puede ser el comienzo de un adenocarcinoma, y se pide una colonoscopía.',
    ],
    refs: [S('10:07'), S('12:49'), S('13:29'), S('14:09'), L('382')],
  },
  {
    id: 't-sii-estudios',
    sec: 'sii',
    titulo: 'Estudios y tratamiento',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Estudios', tono: 'sky', text: 'Laboratorio **normal**. Si hay diarrea: **coproparasitológico** y **coprocultivo**, para descartar causas orgánicas.' },
      { t: 'def', term: 'Diagnósticos diferenciales', tono: 'peach', en: 1, text: 'Según la edad: intolerancia a la lactosa, colitis ulcerosa, cáncer de colon.' },
      { t: 'def', term: 'Tratamiento', tono: 'mint', en: 2, text: '**Relajación, dieta, ejercicio**. Evitar lactosa, grasas y alcohol (gluten si se sospecha celíaca). Fármacos solo si hace falta.' },
    ],
    voz: [
      'Los estudios son normales. Si hay diarrea, se piden un coproparasitológico y un coprocultivo, para descartar una diarrea orgánica.',
      'Los diagnósticos diferenciales dependen de la edad: una intolerancia a la lactosa, una colitis ulcerosa, o en el mayor, un cáncer de colon.',
      'Y el tratamiento: relajación, dieta y ejercicio. Evitar la lactosa, las grasas y el alcohol, y el gluten si se sospecha una celíaca. Los fármacos, solo si hacen falta.',
    ],
    refs: [S('10:47'), S('12:07'), S('15:29'), S('16:09'), L('382')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'fases', label: 'Qué es y sus fases' },
    { id: 'clinica', label: 'Clínica' },
    { id: 'diagnostico', label: 'Diagnóstico' },
    { id: 'sii', label: 'Intestino irritable' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'clase',
    titulo: 'El celíaco que comió galletitas de avena',
    texto: 'Un joven con enfermedad celíaca, estable con dieta sin gluten, se come un paquete de galletitas de avena. A la semana tiene diarrea, distensión, flatulencia y empieza a bajar de peso.',
    pregunta: '¿Qué pasó?',
    opciones: [
      { text: 'El gluten reactivó los anticuerpos, que vuelven a destruir las vellosidades.', why: 'La celíaca se reactiva con el gluten: fase mucosa.' },
      { text: 'Una insuficiencia pancreática.', why: 'No hay nada que la explique.' },
      { text: 'Un intestino irritable por estrés.', why: 'Hay un desencadenante orgánico claro.' },
      { text: 'Una obstrucción linfática.', why: 'Es la fase rara; acá el problema es la mucosa.' },
    ],
    correcta: 0,
    razonamiento: 'Con dieta sin gluten los anticuerpos quedan inactivos; el gluten (trigo, avena, cebada, centeno) los reactiva.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Esteatorrea y D-xilosa',
    texto: 'Hombre de 50 años, alcohólico, con dolor epigástrico recurrente, diarrea crónica con heces grasosas que flotan y pérdida de peso. Van de Kamer: 14 g/día. D-xilosa: 6 g en la orina de 5 horas.',
    pregunta: '¿Dónde está la falla?',
    opciones: [
      { text: 'Fase intraluminal: insuficiencia pancreática.', why: 'La mucosa absorbe la xilosa normalmente; pensar en pancreatitis crónica.' },
      { text: 'Fase mucosa: celíaca.', why: 'Con mucosa dañada la xilosa estaría por debajo de 5 g.' },
      { text: 'Fase de transporte.', why: 'Es rara y no se mide con la xilosa.' },
      { text: 'No tiene esteatorrea.', why: 'Más de 6 g/día confirma esteatorrea.' },
    ],
    correcta: 0,
    razonamiento: 'Van de Kamer > 6 g/día confirma la esteatorrea; xilosa > 5 g en 5 h indica mucosa sana: el problema es el páncreas.',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'Mujer de 24 años con dolor y constipación',
    texto: 'Desde hace un año tiene dolor en el abdomen inferior varias veces por mes, que se le va cuando evacúa. Alterna constipación con heces blandas y moco. Empeora en época de exámenes. No bajó de peso, no tiene fiebre ni sangrado. Examen y laboratorio normales.',
    pregunta: '¿Qué tiene?',
    opciones: [
      { text: 'Síndrome de intestino irritable.', why: 'Cumple Roma y no tiene signos de alarma.' },
      { text: 'Síndrome de malabsorción.', why: 'No hay esteatorrea ni pérdida de peso.' },
      { text: 'Cáncer de colon.', why: 'Joven, sin alarma ni antecedentes.' },
      { text: 'Colitis ulcerosa.', why: 'Daría sangre y diarrea inflamatoria.' },
    ],
    correcta: 0,
    razonamiento: 'Dolor recurrente que mejora con la defecación y cambia la forma de las heces, joven, sin alarma: intestino irritable.',
  },
  {
    id: 'c4',
    origen: 'practica',
    titulo: 'Hombre de 62 años con el mismo dolor',
    texto: 'Hace cuatro meses tiene dolor abdominal y cambió su hábito: antes evacuaba todos los días, ahora está constipado. Bajó 5 kg sin proponérselo.',
    pregunta: '¿Qué corresponde?',
    opciones: [
      { text: 'Colonoscopía: edad y pérdida de peso son signos de alarma.', why: 'Puede ser el comienzo de un adenocarcinoma de colon.' },
      { text: 'Diagnosticar intestino irritable y tratar con relajación.', why: 'No se puede sin descartar lo orgánico.' },
      { text: 'Pedir solo Van de Kamer.', why: 'No es el estudio que responde a la sospecha.' },
      { text: 'Dieta sin gluten.', why: 'No hay datos de celíaca.' },
    ],
    correcta: 0,
    razonamiento: 'Mayor de 50 con cambio del hábito y pérdida de peso: buscar un cáncer de colon antes de pensar en algo funcional.',
  },
  {
    id: 'c5',
    origen: 'practica',
    titulo: 'Malabsorción con hormigueos',
    texto: 'Mujer con celíaca mal controlada refiere hormigueos en las manos. Al inflar el manguito del tensiómetro, la mano se contrae en «mano de partero».',
    pregunta: '¿Qué déficit explica el signo?',
    opciones: [
      { text: 'Calcio por falta de vitamina D: hipocalcemia (Trousseau positivo).', why: 'La vitamina D se pierde con la grasa y sin ella no se absorbe calcio.' },
      { text: 'Vitamina K.', why: 'Daría sangrado.' },
      { text: 'Vitamina A.', why: 'Daría ceguera nocturna.' },
      { text: 'Hierro.', why: 'Daría anemia hipocrómica microcítica.' },
    ],
    correcta: 0,
    razonamiento: 'Hipocalcemia → aumenta la excitabilidad neuromuscular: parestesias, tetania, Trousseau y Chvostek.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'mal',
        label: 'Síndrome de malabsorción',
        tone: 'gold',
        examen: true,
        nota: 'Falla la digestión y/o la absorción de macro y micronutrientes',
        hijos: [
          { id: 'fas', label: 'Fases', tone: 'peach', examen: true, nota: '**Intraluminal** (páncreas, sales biliares) · **mucosa** (celíaca) · transporte (linfa, rara)' },
          { id: 'cli', label: 'Clínica', tone: 'red', examen: true, nota: '**Diarrea crónica** (cardinal) · **esteatorrea** + distensión + flatulencia · pérdida de peso · déficits' },
          { id: 'dx', label: 'Diagnóstico', tone: 'lilac', examen: true, nota: '**Van de Kamer** > 6 g/día · Sudán · **D-xilosa** · serología celíaca' },
        ],
      },
      {
        id: 'sii',
        label: 'Intestino irritable',
        tone: 'sky',
        examen: true,
        nota: 'Funcional, crónico, sin causa orgánica: diagnóstico por exclusión',
        hijos: [
          { id: 'rom', label: 'Roma', tone: 'sky', examen: true, nota: 'Dolor ≥ 3 días/mes en los últimos 3 meses + **2 de 3**: mejora al defecar, cambia la frecuencia, cambia la forma' },
          { id: 'ala', label: 'Alarma', tone: 'red', nota: 'Pérdida de peso, fiebre, sangre, grasa · > 50 años → colonoscopía' },
        ],
      },
    ],
    nexos: ['**Esteatorrea + pérdida de peso:** malabsorción hasta que se demuestre lo contrario.', '**Grasa en heces o pérdida de peso** no son de intestino irritable.'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['dig09-d01', 'dig09-d02', 'dig09-d03'],
  anclas: {
    ubicate: { tab: 'mapa' },
    fases: { tab: 'teoria', seccion: 'fases' },
    clinica: { tab: 'teoria', seccion: 'clinica' },
    diagnostico: { tab: 'teoria', seccion: 'diagnostico' },
    sii: { tab: 'teoria', seccion: 'sii' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    integracion: { tab: 'cierre' },
  },
};
