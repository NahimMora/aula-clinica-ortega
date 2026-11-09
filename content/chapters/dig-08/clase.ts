import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * dig-08: clase visual del síndrome pilórico y el íleo.
 *  1. Clases de Ortega: «5 - Síndrome pilórico» (00:00–16:18) e «6 - Íleo» (00:01–17:03).
 *  2. Libro de Clínica Médica de Ortega (p. 375–378): porcentajes, valores de la sonda, etiologías, mecanismo del dolor.
 *  3. Preguntero: bloque «Síndromes: pilórico, íleo y malabsorción», P1–P7.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const P = (t: string) => r('sd-pil', t);
const I = (t: string) => r('ileo', t);
const L = (p: string) => r('libro', undefined, p);

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-retencion',
    sec: 'piloro',
    titulo: 'El estómago que no se vacía',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'estomago', vistas: [['vaciamiento']] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'El **píloro** se obstruye: úlcera fibrosada, tumor, hipertrofia congénita.' },
          { k: 'mecanismo', text: 'El estómago no se vacía en más de **4 horas**; el contenido se acumula.' },
          { k: 'signo', text: 'Lo único que queda es **vomitar**: alimentos de horas antes, **sin bilis**.' },
          { k: 'signo', text: 'No llegan nutrientes ni líquido al intestino: **pérdida de peso**, deshidratación, constipación.' },
        ],
      },
    ],
    aclara: { text: 'No hay bilis porque el contenido del duodeno no puede volver al estómago a través de un píloro cerrado.', origen: 'Libro, p. 375; Argente-Álvarez, p. 646.' },
    voz: [
      'Empecemos por el síndrome pilórico. El píloro, la puerta de salida del estómago, se obstruye: por una úlcera que se fibrosó, un tumor, o una hipertrofia congénita.',
      'El estómago no puede vaciarse, y el contenido se acumula durante horas.',
      'El estómago busca otra salida: el paciente vomita alimentos que comió horas antes, y sin bilis, porque el duodeno queda del otro lado de la obstrucción.',
      'Y como no pasan nutrientes ni líquido al intestino, pierde peso, se deshidrata y se constipa.',
    ],
    refs: [P('00:42'), P('05:43'), P('08:28'), L('375')],
  },
  {
    id: 'f-reversible',
    sec: 'piloro',
    titulo: 'Reversible o irreversible',
    etapas: ['mecanismo'],
    amplio: true,
    bloques: [
      { t: 'def', term: 'Reversible', tono: 'mint', text: '**Inflamación, edema** y espasmo alrededor de una úlcera activa: cede con tratamiento médico o solo.' },
      { t: 'def', term: 'Irreversible', tono: 'red', en: 1, text: '**Fibrosis** cicatrizal que deforma el píloro y **atonía** gástrica tras una obstrucción prolongada: cirugía.' },
    ],
    aclara: { text: 'En clase se aclara que la fisiopatogenia no hace falta saberla en detalle: lo que importa es que una causa reversible puede volverse irreversible.', origen: 'Clase, min 03:32–04:17.' },
    voz: [
      'Y por qué algunos se resuelven y otros no. En los reversibles, lo que estrecha el píloro es la inflamación, el edema y el espasmo alrededor de una úlcera activa: se resuelve solo o con tratamiento médico.',
      'En los irreversibles hay fibrosis, una cicatriz que deforma el píloro, o un estómago que perdió su tono después de luchar mucho tiempo. Esos van a cirugía.',
    ],
    refs: [P('03:32'), P('04:17'), L('375')],
  },
  {
    id: 'f-chapoteo',
    sec: 'piloro',
    titulo: 'Del peristaltismo visible al chapoteo',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'estomago', vistas: [['vaciamiento']] },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Al principio', tono: 'peach', text: 'El estómago **lucha**: contracciones visibles en el abdomen (peristaltismo gástrico).' },
      { t: 'def', term: 'Al final', tono: 'sky', en: 1, text: 'Se **agota** (atonía): distensión y **chapoteo** gástrico.' },
    ],
    voz: [
      'En el examen se ve la misma historia. Al principio el estómago lucha contra el obstáculo, y a veces se ven sus contracciones a través de la pared.',
      'Cuando se agota, queda distendido y flácido, lleno de líquido y aire: es el momento del chapoteo gástrico.',
    ],
    refs: [P('10:38'), P('11:20'), L('375')],
  },
  {
    id: 'f-ileo',
    sec: 'ileo',
    titulo: 'Íleo: dos maneras de detenerse',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'intestino', modo: 'paralitico' },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Paralítico', tono: 'sky', text: 'Todo el intestino deja de moverse: **silencio**.' },
      { t: 'def', term: 'Mecánico', tono: 'peach', en: 1, text: 'Hay un obstáculo: **por debajo** se paraliza, **por arriba** lucha.' },
    ],
    voz: [
      'Pasemos al íleo, que es la parálisis del tránsito intestinal. Puede ser paralítico: todo el intestino deja de moverse, y el abdomen queda en silencio.',
      'O mecánico: hay un obstáculo. Por debajo, el intestino se paraliza; por arriba, lucha con contracciones fuertes para vencerlo.',
    ],
    refs: [I('00:01'), I('00:43'), I('01:28'), L('376')],
  },
  {
    id: 'f-lucha',
    sec: 'ileo',
    titulo: 'Lucha y agotamiento',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'intestino', modo: 'obstaculo' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'mecanismo', text: 'Por arriba del obstáculo, contracciones violentas: **dolor cólico** y **ruidos de lucha**.' },
          { k: 'mecanismo', text: 'Si se supera la resistencia elástica, el asa se **relaja y se dilata**: el dolor se vuelve continuo.' },
          { k: 'signo', text: 'Si se compromete la **irrigación**: signos peritoneales y riesgo de isquemia.' },
        ],
      },
    ],
    aclara: { text: 'Como todo músculo, el intestino se cansa: un íleo mecánico puede terminar paralizado por completo.', origen: 'Clase, min 01:28; libro, p. 377.' },
    voz: [
      'En el íleo mecánico, por arriba del obstáculo el intestino se contrae con violencia: cada contracción es un cólico, y se auscultan ruidos de lucha.',
      'Si la presión supera la resistencia elástica de la pared, el asa se relaja y se dilata, y el dolor pasa a ser continuo.',
      'Y si la distensión o un estrangulamiento comprometen la irrigación, aparecen signos peritoneales y el riesgo de isquemia.',
    ],
    refs: [I('01:28'), I('10:43'), I('11:26'), L('377')],
  },
  {
    id: 'f-vomitos-nivel',
    sec: 'ileo',
    titulo: 'Vómitos que cambian',
    etapas: ['mecanismo', 'signo'],
    fig: {
      f: 'tracto',
      vistas: [
        { luz: { estomago: 'peach' }, nota: 'Alimentario', notaTone: 'peach' },
        { luz: { duodeno: 'mint', yeyuno: 'mint' }, nota: 'Bilioso', notaTone: 'mint' },
        { luz: { ileon: 'red', colon: 'red' }, nota: 'Fecaloide', notaTone: 'red' },
      ],
    },
    anchoFig: 'chica',
    bloques: [
      { t: 'texto', text: 'El contenido que no avanza **refluye** desde el nivel de la obstrucción.' },
      { t: 'lista', en: 1, items: ['Primero **alimentario**.', 'Después **bilioso**.', 'Al final **fecaloide**: las bacterias proliferan en el asa estancada.'] },
    ],
    voz: [
      'Y el vómito del íleo cambia con el tiempo, porque el contenido refluye desde el nivel de la obstrucción.',
      'Primero es alimentario, después bilioso, y al final fecaloide, cuando las bacterias proliferan en el contenido estancado.',
    ],
    refs: [I('10:01'), L('377')],
  },
  {
    id: 'f-perdidas',
    sec: 'ileo',
    titulo: 'Lo que se pierde',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'perdidas' },
    anchoFig: 'media',
    bloques: [
      { t: 'texto', text: 'Con los vómitos se pierden agua, **potasio** y cloro: **hipopotasemia** y, si predomina el cloro, **alcalosis**.' },
      { t: 'texto', en: 1, text: 'El asa distendida pierde **proteínas** y líquido hacia la luz: hipovolemia.' },
    ],
    voz: [
      'El paciente que vomita pierde agua, potasio y cloro: se deshidrata, hace hipopotasemia y, si predomina la pérdida de cloro, alcalosis metabólica.',
      'Además, la pared del asa distendida deja escapar proteínas y líquido hacia la luz, y eso empeora la hipovolemia.',
    ],
    refs: [I('11:26'), I('12:11'), L('377')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'piloro', label: 'Síndrome pilórico' },
    { id: 'ileo', label: 'Íleo' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-piloro-def',
    sec: 'piloro',
    titulo: 'Síndrome pilórico: qué es',
    fig: { f: 'tracto', vistas: [{ luz: { estomago: 'gold', piloro: 'red' }, marca: { o: 'piloro', tone: 'red' } }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', text: 'Obstrucción del **píloro** que impide el vaciamiento gástrico **por más de 4 horas**.' },
      { t: 'texto', en: 1, text: 'Lo que hay que saber: la **definición**, las **causas** y, sobre todo, la **clínica** y el **diagnóstico**.' },
    ],
    examen: { origen: 'ortega', texto: 'Síndrome pilórico: definición, causas, clínica y diagnóstico (en el oral).', cita: 'Se lo van a preguntar en el oral… la clínica, esto sí o sí tienen que saber.', ref: P('05:04') },
    voz: [
      'El síndrome pilórico es el conjunto de signos y síntomas que produce una obstrucción del píloro, que impide que el estómago se vacíe por más de cuatro horas.',
      'El profesor avisa que en el choice casi no se pregunta, pero en el oral sí: la definición, las causas, y sobre todo la clínica y el diagnóstico.',
    ],
    refs: [P('00:42'), P('04:59'), P('05:04'), L('375')],
  },
  {
    id: 't-piloro-causas',
    sec: 'piloro',
    titulo: 'Causas',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Obstructivas (las más frecuentes)', tono: 'red', items: ['**Úlcera péptica** cerca del píloro', 'Tumores gástricos o pancreáticos', 'Inflamación vecina: duodenitis, pancreatitis, colecistitis', '**Estenosis pilórica congénita**: recién nacidos'] },
          { titulo: 'No obstructivas', tono: 'lilac', items: ['Trastorno de la **inervación**: el esfínter no se relaja', 'Neuropatía diabética, fármacos anticolinérgicos', 'Cirugías gástricas previas'] },
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Etiología del síndrome pilórico: obstructiva y no obstructiva.' },
    voz: [
      'Las causas pueden ser obstructivas, las más frecuentes: una úlcera cerca del píloro, un tumor, una inflamación vecina como una pancreatitis, y la estenosis pilórica congénita del recién nacido, que el profesor destaca: el bebé nace con el músculo del píloro hipertrofiado.',
      'O no obstructivas: un trastorno de la inervación, en el que el esfínter no se relaja, como en la neuropatía diabética o con algunos fármacos.',
    ],
    refs: [P('01:24'), P('02:09'), P('02:52'), P('03:32'), L('375')],
  },
  {
    id: 't-piloro-clinica',
    sec: 'piloro',
    titulo: 'Clínica: el vómito',
    fig: { f: 'estomago', vistas: [['vaciamiento']] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'red', text: 'Síntoma cardinal: el **vómito** (más del 90 %), de alimentos, 4 a 6 horas después de comer.' },
      { t: 'lista', en: 1, items: ['**Pérdida de peso**.', 'Saciedad precoz, dolor epigástrico (adultos con úlcera), constipación.', 'Náuseas a veces: muchos vómitos son **sin náusea**.'] },
    ],
    examen: { origen: 'ortega', texto: 'El síntoma cardinal del síndrome pilórico.', cita: 'Nunca se olviden cuál es el síntoma cardinal, que es el vómito.', ref: P('08:59') },
    voz: [
      'Y la clínica, que el profesor pide saber sí o sí. El síntoma cardinal es el vómito, que no se olvida nunca: de alimentos, cuatro a seis horas después de comer.',
      'Le sigue la pérdida de peso. Puede haber saciedad precoz, dolor epigástrico en los adultos con úlcera, y constipación. Y muchas veces el vómito llega sin náuseas.',
    ],
    refs: [P('05:43'), P('06:26'), P('07:47'), P('08:28'), P('08:59'), L('375')],
  },
  {
    id: 't-piloro-nino',
    sec: 'piloro',
    titulo: 'En el recién nacido',
    amplio: true,
    bloques: [
      { t: 'def', term: 'La tríada que hay que reconocer', tono: 'peach', text: 'Menos de un mes: **vómitos**, **llanto** y **no aumenta de peso**.' },
      { t: 'def', term: 'Oliva pilórica', tono: 'red', en: 1, text: 'El píloro hipertrofiado se palpa en el epigastrio, hacia la derecha (70 a 90 % de los lactantes).' },
    ],
    aclara: { text: 'El caso que cuenta el profesor: un bebé de ocho días con lactancia exclusiva que vomitaba todo, lloraba y no había ganado peso desde el nacimiento.', origen: 'Clase, min 07:07; oliva: libro, p. 376.' },
    voz: [
      'En el recién nacido, el cuadro es muy típico. Un bebé de menos de un mes que vomita todo, llora sin parar y no aumenta de peso.',
      'Y a veces se palpa el píloro hipertrofiado, como una aceituna en el epigastrio: la oliva pilórica.',
    ],
    refs: [P('06:26'), P('07:07'), P('07:47'), P('12:47'), P('13:29'), L('376')],
  },
  {
    id: 't-piloro-examen',
    sec: 'piloro',
    titulo: 'Examen físico',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Hallazgo', 'Por qué'],
        filas: [
          ['Abdomen distendido arriba', 'El estómago está lleno'],
          ['**Chapoteo gástrico**', 'Líquido y aire retenidos'],
          ['Peristaltismo gástrico visible', 'El estómago lucha (al principio)'],
          ['Deshidratación, desnutrición', 'No absorbe líquido ni nutrientes'],
          ['Oliva pilórica', 'Lactantes'],
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: '¿Qué maniobra realiza ante un síndrome pilórico?' },
    voz: [
      'En el examen físico, el abdomen está distendido arriba. Se busca el chapoteo gástrico, con golpes rápidos en el epigastrio: suena como palmadas sobre el agua. Al principio pueden verse las contracciones del estómago. El paciente está deshidratado y desnutrido, y en el lactante puede palparse la oliva pilórica.',
    ],
    refs: [P('10:38'), P('11:20'), P('12:03'), L('375'), L('376')],
  },
  {
    id: 't-piloro-estudios',
    sec: 'piloro',
    titulo: 'Diagnóstico',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Sonda nasogástrica', tono: 'sky', text: 'Más de **300 ml** a las 4 horas de comer, o más de **200 ml** en ayunas: diagnóstico muy probable.' },
      { t: 'def', term: 'Endoscopia digestiva alta', tono: 'red', en: 1, text: 'El **estándar**: el píloro mide 15 a 20 mm; si no pasa el endoscopio (unos 10 a 12 mm), hay estenosis.' },
      { t: 'def', term: 'Rx contrastada', tono: 'lilac', en: 2, text: 'Estómago muy distendido con bario retenido.' },
    ],
    voz: [
      'Para el diagnóstico, primero la sonda nasogástrica: si a las cuatro horas de comer se extraen más de trescientos mililitros, o más de doscientos en ayunas, el diagnóstico es muy probable. Lo normal en ayunas es menos de cincuenta.',
      'El estándar es la endoscopia: el píloro normal mide quince a veinte milímetros; si el endoscopio no pasa, hay estenosis.',
      'Y la radiografía con contraste muestra un estómago muy distendido, con el bario retenido.',
    ],
    refs: [P('14:12'), P('14:56'), P('15:36'), P('16:18'), L('376')],
  },
  {
    id: 't-ileo-def',
    sec: 'ileo',
    titulo: 'Íleo: qué es',
    fig: { f: 'intestino', modo: 'obstaculo' },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: '**Parálisis del tránsito intestinal**.' },
      { t: 'def', term: 'Paralítico o adinámico', tono: 'sky', en: 1, text: 'Ausencia total de motilidad: **silencio** abdominal.' },
      { t: 'def', term: 'Mecánico u obstructivo', tono: 'peach', en: 1, text: 'Obstáculo: parálisis distal y **lucha proximal**: ruidos de lucha.' },
    ],
    examen: { origen: 'ortega', texto: 'Íleo: muy preguntado, en el choice y en el oral.', cita: 'Íleo es preguntado en el parcial, choice y tanto en el oral… El íleo es muy preguntado.', ref: I('02:22') },
    voz: [
      'El íleo es muy preguntado, en el choice y en el oral. Es la parálisis del tránsito intestinal.',
      'Puede ser paralítico o adinámico, con ausencia total de la motilidad y silencio abdominal. O mecánico u obstructivo, con un obstáculo: por debajo, parálisis; por arriba, lucha y ruidos de lucha.',
    ],
    refs: [I('00:01'), I('00:43'), I('02:11'), I('02:22'), L('376')],
  },
  {
    id: 't-paralitico',
    sec: 'ileo',
    titulo: 'Causas del íleo paralítico',
    amplio: true,
    bloques: [
      { t: 'clave', tono: 'red', text: 'La más frecuente: el **posoperatorio**. El tránsito vuelve en **48 a 72 horas**.' },
      {
        t: 'cuadro',
        en: 1,
        compacto: true,
        head: ['Grupo', 'Ejemplos'],
        filas: [
          ['Peritoneal', '**Perforación** con peritonitis (generalizado); abdomen inflamatorio y **pancreatitis** (regional: asa centinela)'],
          ['Vascular', 'Isquemia mesentérica: infarto intestinal'],
          ['Tóxica · carencial', 'Uremia, sepsis, opiáceos · **hipopotasemia**'],
          ['Reflejo · neurológico', 'Cólico biliar o renal · fractura vertebral, trauma de cráneo'],
          ['Espástico', 'Raro: intoxicación por plomo'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'La causa más frecuente de íleo paralítico es la posoperatoria.', cita: 'La causa más frecuente es el íleo posoperatorio. Ese no se tiene que olvidar nunca.', ref: I('05:34') },
    aclara: { text: 'Al recuperarse, primero vuelve el delgado (horas), después el estómago (24 a 48 h) y por último el colon (48 a 72 h).', origen: 'Libro, p. 377.' },
    voz: [
      'Pregunta de parcial: la causa más frecuente de íleo paralítico es el posoperatorio, que no se olvida nunca. Después de una cirugía abdominal, el intestino se paraliza, y recupera la motilidad en cuarenta y ocho a setenta y dos horas.',
      'Otras causas: la perforación con peritonitis, que da un íleo generalizado; el abdomen inflamatorio y la pancreatitis, que dan un íleo regional, el asa centinela; la isquemia mesentérica; causas tóxicas como la uremia o los opiáceos; la hipopotasemia; y reflejos, como un cólico. El espástico es raro: intoxicación por plomo.',
    ],
    refs: [I('02:54'), I('03:37'), I('04:20'), I('05:05'), I('05:34'), L('376'), L('377')],
  },
  {
    id: 't-mecanico',
    sec: 'ileo',
    titulo: 'Causas del íleo mecánico',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Tipo', 'Ejemplos'],
        filas: [
          ['Obstrucción simple: en la luz', '**Íleo biliar** (cálculo en la válvula ileocecal), bolo fecal, bezoares, áscaris'],
          ['En la pared', 'Neoplasias'],
          ['Extrínseca', 'Tumores, adenopatías, **bridas**'],
          ['**Estrangulamiento**', 'Hernia incarcerada, bridas, **vólvulo** (sigmoides), **invaginación** (niños)'],
        ],
      },
      { t: 'clave', en: 3, tono: 'red', text: 'El estrangulamiento compromete la irrigación: riesgo de **isquemia**, se opera.' },
    ],
    examen: { origen: 'preguntero', texto: 'Etiología del íleo mecánico (obstructivo).' },
    aclara: { text: 'En la invaginación intestinal del niño, la materia fecal sale con sangre, «en jalea de grosella».', origen: 'Clase, min 08:38.' },
    voz: [
      'El íleo mecánico puede ser por una obstrucción simple: en la luz, como el íleo biliar, un cálculo que llega al intestino y se impacta en la válvula ileocecal, un bolo fecal o parásitos.',
      'En la pared, una neoplasia.',
      'Desde afuera, un tumor o una brida.',
      'O por estrangulamiento: una hernia incarcerada, una brida, un vólvulo, casi siempre del sigmoides, o una invaginación, muy frecuente en los niños.',
      'El estrangulamiento compromete la irrigación: hay riesgo de isquemia, y se opera.',
    ],
    refs: [I('05:51'), I('06:32'), I('07:15'), I('07:56'), I('08:38'), L('376')],
  },
  {
    id: 't-ileo-clinica',
    sec: 'ileo',
    titulo: 'Clínica del íleo',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Manifestación', 'Detalle'],
        filas: [
          ['**No elimina gases ni materia fecal**', 'El contenido no avanza'],
          ['**Meteorismo y distensión**', 'Escasa si es yeyuno proximal; manifiesta si es colon'],
          ['**Vómitos**', 'Alimentarios → biliosos → fecaloides'],
          ['Dolor', '**Cólico** en el mecánico; en el paralítico, el de la causa (peritonitis)'],
          ['Trastorno hidroelectrolítico', 'Deshidratación, **hipopotasemia**, alcalosis'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Manifestaciones clínicas del íleo.', cita: 'Esto sí tienen que sabérselo como el padre nuestro.', ref: I('09:37') },
    voz: [
      'Y la clínica, que el profesor pide como el Padre Nuestro. El paciente no elimina gases ni materia fecal.',
      'Tiene meteorismo y distensión, poca si la obstrucción es alta, mucha si es en el colon.',
      'Vomita: primero alimentos, después bilis, y al final material fecaloide.',
      'El dolor es cólico en el mecánico; en el paralítico, es el dolor de la causa, como el de una peritonitis.',
      'Y tiene trastornos hidroelectrolíticos: deshidratación, hipopotasemia y alcalosis.',
    ],
    refs: [I('09:19'), I('09:37'), I('10:01'), I('10:43'), I('11:26'), I('12:11'), L('377')],
  },
  {
    id: 't-ileo-examen',
    sec: 'ileo',
    titulo: 'Examen físico: paralítico o mecánico',
    fig: { f: 'rha', todas: true },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Paralítico', tono: 'sky', text: 'Abdomen **distendido, timpánico** y **sin ruidos hidroaéreos**. Si es por peritonitis: tabla, rebote, contractura.' },
      { t: 'def', term: 'Mecánico', tono: 'peach', en: 1, text: 'Distendido, dolor **cólico** y **ruidos de lucha** por arriba del obstáculo.' },
    ],
    examen: { origen: 'ortega', texto: 'Abdomen distendido, timpánico y sin ruidos hidroaéreos: íleo paralítico.', cita: 'Esto lo van a preguntar en el parcial… lo más preguntado: abdomen distendido, timpánico y ausencia de ruido hidroaéreo.', ref: I('13:48') },
    voz: [
      'En el examen, lo más preguntado: un abdomen distendido, timpánico y sin ruidos hidroaéreos es un íleo paralítico. Si la causa es una peritonitis, además vas a encontrar abdomen en tabla, rebote y contractura.',
      'En el mecánico, el abdomen está distendido, el dolor es cólico, y se escuchan ruidos de lucha por arriba de la obstrucción.',
    ],
    refs: [I('13:38'), I('13:48'), I('14:19'), I('15:01'), L('377')],
  },
  {
    id: 't-ileo-estudios',
    sec: 'ileo',
    titulo: 'Estudios: buscar la causa',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Todo íleo es **secundario** a otra patología: hay que buscar la causa.' },
      { t: 'def', term: 'Laboratorio', tono: 'sky', en: 1, text: 'Completo: hemograma, **amilasa**, hepatograma, ionograma, urea, creatinina, estado ácido-base.' },
      { t: 'def', term: 'Rx de abdomen de pie', tono: 'lilac', en: 1, text: '**Niveles hidroaéreos**; aire libre (**Popper**); asa centinela.' },
      { t: 'def', term: 'Tomografía', tono: 'mint', en: 2, text: 'La más usada: confirma la causa.' },
    ],
    voz: [
      'Y algo clave: todo íleo es secundario a otra enfermedad, así que hay que buscar la causa. Si es un íleo regional por pancreatitis, se estudia la pancreatitis; si es por una brida, la brida.',
      'Se pide un laboratorio completo, con amilasa, ionograma, función renal y estado ácido-base. La radiografía de pie muestra niveles hidroaéreos, el aire libre de una perforación o el asa centinela.',
      'Y la tomografía, la más usada, confirma la causa. Con esto, tenés el capítulo. Ahora a practicar.',
    ],
    refs: [I('15:01'), I('15:41'), I('16:22'), I('17:03'), L('378')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'piloro', label: 'Síndrome pilórico' },
    { id: 'ileo', label: 'Íleo' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'clase',
    titulo: 'Recién nacido de 8 días',
    texto: 'Con lactancia materna exclusiva, vomita después de cada toma, llora sin parar y no aumentó de peso desde que nació.',
    pregunta: '¿Qué sospechás?',
    opciones: [
      { text: 'Estenosis pilórica congénita.', why: 'Vómitos, llanto y falta de aumento de peso en menor de un mes.' },
      { text: 'Íleo posoperatorio.', why: 'No fue operado.' },
      { text: 'Gastroenteritis.', why: 'No explica la falta de aumento de peso desde el nacimiento con vómitos de leche.' },
      { text: 'Invaginación intestinal.', why: 'Es más frecuente de los 2 meses a los 6 años, con heces en jalea de grosella.' },
    ],
    correcta: 0,
    razonamiento: 'Síndrome pilórico del lactante: el píloro hipertrofiado no deja vaciar el estómago. Puede palparse la oliva pilórica.',
    refs: [P('07:07'), P('07:47')],
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Hombre de 55 años con úlcera duodenal',
    texto: 'Hace dos meses vomita alimentos que comió la noche anterior, sin bilis; perdió 8 kg. Al palpar el epigastrio con golpes rápidos se percibe chapoteo.',
    pregunta: '¿Qué estudio confirma la causa?',
    opciones: [
      { text: 'Endoscopia digestiva alta.', why: 'Es el estándar: muestra la estenosis y su causa.' },
      { text: 'Ecografía abdominal.', why: 'No es el estudio de elección.' },
      { text: 'Amilasa.', why: 'No confirma una estenosis pilórica.' },
      { text: 'Prueba del aliento.', why: 'Detecta H. pylori, no la obstrucción.' },
    ],
    correcta: 0,
    razonamiento: 'Úlcera crónica fibrosada que obstruye el píloro. La sonda nasogástrica con más de 300 ml a las 4 h también orienta.',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'Mujer operada hace 24 horas',
    texto: 'Después de una colecistectomía no elimina gases. El abdomen está distendido, timpánico y no se auscultan ruidos hidroaéreos. No tiene dolor a la descompresión.',
    pregunta: '¿Qué tiene?',
    opciones: [
      { text: 'Íleo paralítico posoperatorio.', why: 'La causa más frecuente; se recupera en 48–72 h.' },
      { text: 'Íleo mecánico por bridas.', why: 'Daría dolor cólico y ruidos de lucha.' },
      { text: 'Peritonitis.', why: 'Daría tabla y rebote.' },
      { text: 'Síndrome pilórico.', why: 'No explica el silencio abdominal.' },
    ],
    correcta: 0,
    razonamiento: 'Abdomen distendido, timpánico y silencioso: íleo paralítico, y el posoperatorio es el más frecuente.',
  },
  {
    id: 'c4',
    origen: 'practica',
    titulo: 'Mujer de 70 años con litiasis',
    texto: 'Dolor cólico, vómitos que se volvieron biliosos, no elimina gases. Se auscultan ruidos de lucha. La Rx muestra niveles hidroaéreos y aire en la vía biliar.',
    pregunta: '¿Qué tipo de íleo es?',
    opciones: [
      { text: 'Íleo biliar: obstrucción mecánica por un cálculo en la válvula ileocecal.', why: 'Litiasis, aire en la vía biliar y obstrucción con lucha.' },
      { text: 'Íleo paralítico por pancreatitis.', why: 'Daría silencio, no ruidos de lucha.' },
      { text: 'Íleo espástico por plomo.', why: 'No hay intoxicación.' },
      { text: 'Íleo posoperatorio.', why: 'No fue operada.' },
    ],
    correcta: 0,
    razonamiento: 'El cálculo pasa de la vesícula al intestino y se impacta: íleo mecánico por obstrucción simple de la luz.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'pil',
        label: 'Síndrome pilórico',
        tone: 'peach',
        examen: true,
        nota: 'El estómago no se vacía en más de 4 horas',
        hijos: [
          { id: 'pc', label: 'Causas', tone: 'peach', nota: 'Obstructivas: úlcera, tumor, estenosis congénita · no obstructivas: inervación' },
          { id: 'pk', label: 'Clínica', tone: 'red', examen: true, nota: '**Vómito** (cardinal) · pérdida de peso · lactante: vómitos, llanto, sin aumento de peso' },
          { id: 'pd', label: 'Diagnóstico', tone: 'sky', nota: 'Chapoteo · sonda > 300 ml a las 4 h · endoscopia' },
        ],
      },
      {
        id: 'ile',
        label: 'Íleo',
        tone: 'lilac',
        examen: true,
        nota: 'Parálisis del tránsito intestinal',
        hijos: [
          { id: 'par', label: 'Paralítico', tone: 'sky', examen: true, nota: '**Posoperatorio** (el más frecuente) · peritonitis · asa centinela · silencio' },
          { id: 'mec', label: 'Mecánico', tone: 'peach', nota: 'Íleo biliar, bridas, hernia, vólvulo, invaginación · lucha' },
          { id: 'ik', label: 'Clínica', tone: 'red', examen: true, nota: 'Sin gases ni heces · distensión · vómitos que se vuelven fecaloides · hipopotasemia' },
        ],
      },
    ],
    nexos: ['**Distendido, timpánico y sin ruidos:** íleo paralítico.', '**Todo íleo es secundario:** hay que buscar la causa.'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['dig08-d01', 'dig08-d02', 'dig08-d03'],
  anclas: {
    ubicate: { tab: 'mapa' },
    piloro: { tab: 'teoria', seccion: 'piloro' },
    pilorico: { tab: 'teoria', seccion: 'piloro' },
    ileo: { tab: 'teoria', seccion: 'ileo' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    maniobras: { tab: 'maniobras' },
    integracion: { tab: 'cierre' },
  },
};
