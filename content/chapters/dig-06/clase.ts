import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * dig-06: clase visual del síndrome esofágico.
 *  1. Clase de Ortega: «1 - Sd. esofágico» (00:02–24:24). En esta clase no marca preguntas de examen puntuales.
 *  2. Libro de Clínica Médica de Ortega (p. 368–369): aclaraciones (pirosis, dolor torácico, odinofagia, ERGE, acalasia).
 *  3. Preguntero: bloque «Síndromes: esofágico, ulceroso y gastritis», P1 y P2.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const S = (t: string) => r('sd-esof', t);
const L = (p: string) => r('libro', undefined, p);


/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-barrera',
    sec: 'reflujo',
    titulo: 'La barrera antirreflujo',
    etapas: ['normal'],
    fig: { f: 'reflujo', vistas: ['normal'] },
    anchoFig: 'grande',
    bloques: [
      { t: 'texto', text: 'El estómago tiene un pH de 1 a 2. Lo que separa ese ácido del esófago es el **esfínter esofágico inferior**, ayudado por el diafragma.' },
      { t: 'texto', en: 1, text: 'El esfínter se abre para que pase el bolo y **se cierra** enseguida.' },
    ],
    voz: [
      'Empecemos por lo normal. El estómago es muy ácido, y lo que impide que ese ácido suba al esófago es el esfínter esofágico inferior, ayudado por el diafragma, que lo abraza.',
      'El esfínter se abre para dejar pasar el bolo, y se vuelve a cerrar enseguida.',
    ],
    refs: [S('16:04'), L('369')],
  },
  {
    id: 'f-erge',
    sec: 'reflujo',
    titulo: 'Reflujo: el esfínter que no contiene',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'reflujo', vistas: ['normal', 'erge', 'presion'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'El esfínter es **incompetente** o se relaja cuando no debe; hernia hiatal.' },
          { k: 'mecanismo', text: 'El contenido **ácido sube** al esófago.' },
          { k: 'signo', text: '**Pirosis** y **regurgitación**; empeora si sube la presión abdominal o al acostarse.' },
        ],
      },
    ],
    aclara: { text: 'Lo que produce el reflujo es que el esfínter **no contenga**: incompetencia o relajaciones transitorias. Que el esfínter **no se relaje** es lo opuesto: eso es la acalasia.', origen: 'Libro, p. 369.' },
    voz: [
      'En la enfermedad por reflujo, el esfínter es incompetente, o se relaja en momentos en que no debería. También puede haber una hernia hiatal.',
      'El contenido ácido del estómago sube al esófago.',
      'Y aparecen la pirosis y la regurgitación, que empeoran con todo lo que aumenta la presión abdominal, como hacer abdominales después de comer, o al acostarse, porque se pierde la ayuda de la gravedad.',
    ],
    refs: [S('15:30'), S('16:04'), S('03:34'), S('04:15'), L('368'), L('369')],
  },
  {
    id: 'f-barrett',
    sec: 'reflujo',
    titulo: 'Barrett: el epitelio que cambia',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'reflujo', vistas: ['barrett'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Años de reflujo sobre el **tercio inferior**.' },
          { k: 'mecanismo', text: 'El epitelio **plano estratificado** no soporta el ácido y se transforma en **cilíndrico** (metaplasia intestinal).' },
          { k: 'signo', text: 'Es una lesión **preneoplásica**: sobre ella aparece el **adenocarcinoma**.' },
        ],
      },
    ],
    voz: [
      'Y qué pasa con años de reflujo. El esófago tiene un epitelio plano estratificado, que no está hecho para soportar ácido.',
      'Para adaptarse, el tercio inferior cambia su epitelio por uno cilíndrico, de tipo intestinal, que sí lo tolera. Eso es la metaplasia: el esófago de Barrett.',
      'El problema es que esa metaplasia es preneoplásica: sobre ella se desarrolla el adenocarcinoma del tercio inferior.',
    ],
    refs: [S('13:25'), S('14:05'), S('14:48'), S('16:12')],
  },
  {
    id: 'f-acalasia',
    sec: 'motor',
    titulo: 'Acalasia: sin plexo, sin peristaltismo',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'esofago', modo: 'acalasia' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Faltan las neuronas del **plexo mientérico de Auerbach**: idiopática o por **Chagas**.' },
          { k: 'mecanismo', text: 'Sin acetilcolina no hay peristaltismo; el esfínter inferior queda **cerrado**.' },
          { k: 'signo', text: 'El alimento se estanca: **dolicomegaesófago**, disfagia, regurgitación, dolor torácico.' },
        ],
      },
    ],
    aclara: { text: 'En el Chagas, el Trypanosoma cruzi se aloja en las células de los plexos; los amastigotes se multiplican, rompen la célula y la destruyen. Por eso la acalasia chagásica aparece años después.', origen: 'Clase, min 19:37–20:17.' },
    voz: [
      'La acalasia es lo opuesto al reflujo. Faltan las neuronas del plexo mientérico de Auerbach, por una causa desconocida o por la enfermedad de Chagas.',
      'Esas neuronas liberan la acetilcolina que contrae el esófago. Sin ellas no hay peristaltismo, y el esfínter inferior queda cerrado.',
      'El alimento se estanca, el esófago se dilata y se alarga, y el paciente tiene disfagia, regurgitación y dolor en el pecho.',
    ],
    refs: [S('17:36'), S('18:17'), S('18:57'), S('19:37'), S('20:17'), L('369')],
  },
  {
    id: 'f-mecanica',
    sec: 'motor',
    titulo: 'Obstáculo o motor, otra vez',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'esofago', modo: 'comparar' },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Cáncer, estenosis', tono: 'peach', text: 'El obstáculo crece: primero **sólidos**, después líquidos; progresiva.' },
      { t: 'def', term: 'Acalasia, espasmo', tono: 'lilac', en: 1, text: 'Falla el motor: **sólidos y líquidos**, intermitente.' },
    ],
    voz: [
      'Y el principio de la disfagia vale para todo el síndrome. Un cáncer o una estenosis son un obstáculo que crece: primero cuesta tragar sólidos, después también líquidos.',
      'La acalasia o el espasmo son una falla del motor: cuesta todo desde el principio, y va y viene.',
    ],
    refs: [L('368'), L('369')],
  },
  {
    id: 'f-odinofagia',
    sec: 'motor',
    titulo: 'Por qué duele al tragar',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    amplio: true,
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'La mucosa está **lesionada**: faringoamigdalitis, esofagitis por Cándida, fármacos o cáusticos.' },
          { k: 'mecanismo', text: 'El bolo **roza** una superficie inflamada al pasar.' },
          { k: 'signo', text: '**Odinofagia**: patología orgánica, a diferencia del globo histérico.' },
        ],
      },
    ],
    aclara: { text: 'Entre los fármacos que lesionan la mucosa del esófago, el apunte nombra la clindamicina, la doxiciclina y sobre todo el alendronato.', origen: 'Libro, p. 368.' },
    voz: [
      'Y la odinofagia. Cuando la mucosa está lesionada, por una faringoamigdalitis, por una esofagitis por hongos, por fármacos o por cáusticos...',
      'el bolo roza una superficie inflamada al pasar.',
      'Y duele. Por eso la odinofagia indica una patología orgánica, a diferencia del globo histérico.',
    ],
    refs: [S('07:49'), S('15:30'), L('368')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'reflujo', label: 'Reflujo y Barrett' },
    { id: 'motor', label: 'Motor y mucosa' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-intro',
    sec: 'sindrome',
    titulo: 'Cómo se estudian los síndromes',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'El diagnóstico de un síndrome sale de tres cosas: **clínica**, **examen físico** y **complementarios**.' },
      { t: 'lista', en: 1, items: ['Clínica: lo que viste en motivos de consulta.', 'Examen físico: la parte más importante del aparato digestivo.', 'Complementarios: laboratorio e imágenes.'] },
      { t: 'prof', en: 2, text: '«Todo lo que yo diga que es pregunta de examen, chicos, lo anotan.»', ref: S('01:10') },
    ],
    voz: [
      'Empezamos los síndromes del aparato digestivo. El profesor recuerda que el diagnóstico de cada síndrome se apoya en tres cosas: la clínica, el examen físico y los estudios complementarios.',
      'La clínica la viste en motivos de consulta, el examen físico es la parte más importante, y los complementarios son el laboratorio y las imágenes.',
      'Y avisa: todo lo que él marque como pregunta de examen, hay que anotarlo.',
    ],
    refs: [S('00:02'), S('00:45'), S('01:26')],
  },
  {
    id: 't-definicion',
    sec: 'sindrome',
    titulo: 'Síndrome esofágico: los cinco síntomas',
    fig: { f: 'tracto', vistas: [{ luz: { esofago: 'rose' } }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', text: 'Conjunto de signos y síntomas por una patología del **esófago**.' },
      {
        t: 'secuencia',
        en: 1,
        items: [
          { ico: 'nudo', t: 'Disfagia', tono: 'rose' },
          { ico: 'fuego', t: 'Pirosis', tono: 'peach' },
          { ico: 'corazon', t: 'Dolor torácico', tono: 'red' },
          { ico: 'vomito', t: 'Regurgitación', d: 'la más frecuente', tono: 'lilac' },
          { ico: 'dolor', t: 'Odinofagia', tono: 'sky' },
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Definición de síndrome esofágico y sus cinco síntomas.' },
    voz: [
      'El síndrome esofágico es el conjunto de signos y síntomas que aparecen por una patología del esófago.',
      'Y se expresa con cinco síntomas, solos o asociados: disfagia, pirosis, dolor torácico, regurgitación y odinofagia.',
    ],
    refs: [S('01:26'), S('02:09'), L('368')],
  },
  {
    id: 't-pirosis',
    sec: 'sindrome',
    titulo: 'Pirosis',
    fig: { f: 'reflujo', vistas: ['erge'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'Ardor **retroesternal**, por reflujo de contenido ácido; puede subir a la garganta.' },
      { t: 'def', term: 'Agravan', tono: 'peach', en: 1, text: 'Café, mate, comidas grasas, ejercicio con el estómago lleno, el decúbito.' },
      { t: 'def', term: 'Atenúan', tono: 'mint', en: 1, text: 'Antiácidos, inhibidores de la bomba de protones, alimentos alcalinos.' },
      { t: 'texto', en: 2, text: 'Puede dejar sabor amargo y producir **sialorrea**.' },
    ],
    voz: [
      'La pirosis es el ardor retroesternal, por el reflujo de contenido ácido del estómago, que puede llegar hasta la garganta.',
      'La agravan el café, el mate, las comidas grasas, el ejercicio con el estómago lleno, como las abdominales, y el decúbito. La calman los antiácidos, los inhibidores de la bomba de protones y los alimentos alcalinos.',
      'Puede dejar un sabor amargo en la boca, y producir sialorrea, es decir, babeo.',
    ],
    refs: [S('02:49'), S('03:34'), S('04:15'), S('04:57'), L('368')],
  },
  {
    id: 't-dolor',
    sec: 'sindrome',
    titulo: 'Dolor torácico de origen esofágico',
    amplio: true,
    bloques: [
      { t: 'texto', text: 'Poco frecuente como motivo de consulta, y fácil de **confundir**: todo dolor torácico obliga a pensar en causas cardíacas, pulmonares, mediastínicas, esofágicas o neurovertebrales.' },
      { t: 'texto', en: 1, text: 'Se orienta al esófago cuando **acompaña** a otros síntomas del síndrome.' },
    ],
    aclara: { text: 'El esofágico suele no empeorar con el ejercicio, pero puede irradiarse como el coronario y hasta ceder con nitroglicerina: no alcanza para descartar un infarto.', origen: 'Libro, p. 368.' },
    voz: [
      'El dolor torácico de origen esofágico es poco frecuente como motivo de consulta, y se confunde fácilmente. Ante un dolor en el pecho hay que pensar en el corazón, el pulmón, el mediastino, el esófago y la columna.',
      'Lo orienta al esófago que venga acompañado de otros síntomas del síndrome.',
    ],
    refs: [S('04:57'), S('05:40'), L('368')],
  },
  {
    id: 't-regurgitacion',
    sec: 'sindrome',
    titulo: 'Regurgitación: la más frecuente',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Ascenso **espontáneo, sin esfuerzo**, del contenido gástrico al esófago o a la boca.' },
      { t: 'lista', en: 1, items: ['Asociada a **pirosis en más del 90 %**.', 'Sobre todo de **noche**, o tras una comida abundante.', 'Puede dar tos, sialorrea, ahogo; rara vez dolor.'] },
    ],
    voz: [
      'La regurgitación es, según el profesor, el síntoma que más vas a ver. Es el ascenso espontáneo, sin esfuerzo, del contenido del estómago hacia el esófago o la boca.',
      'Se asocia a pirosis en más del noventa por ciento de los casos, aparece sobre todo de noche, y puede dar tos, babeo o sensación de ahogo.',
    ],
    refs: [S('05:40'), S('06:23'), S('07:05'), L('368')],
  },
  {
    id: 't-odinofagia',
    sec: 'sindrome',
    titulo: 'Odinofagia y globo histérico',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Odinofagia', tono: 'rose', items: ['**Dolor** al tragar', 'Patología **orgánica**', 'Causa n.º 1: **faringoamigdalitis**: revisar la garganta', 'Si no, pensar en disfagia orofaríngea (ACV, Parkinson)'] },
          { titulo: 'Globo histérico', tono: 'lilac', items: ['Sensación de algo **atorado**', 'Patología **funcional**', 'Antecedentes de ansiedad, depresión, estrés'] },
        ],
      },
      { t: 'texto', en: 1, text: 'Otros síntomas: eructos, **halitosis**, rumiación.' },
    ],
    voz: [
      'La odinofagia es el dolor al tragar, y su causa más frecuente es la faringoamigdalitis. Por eso lo primero es mirar la garganta: las amígdalas, el paladar, la úvula, si hay exudados. Si no es eso, hay que buscar una disfagia orofaríngea.',
      'No la confundas con el globo histérico, la sensación de tener algo atorado en un paciente ansioso o estresado: es funcional. Y hay otros síntomas, como los eructos, la halitosis o la rumiación.',
    ],
    refs: [S('07:49'), S('08:30'), S('09:11'), S('09:56'), S('10:39')],
  },
  {
    id: 't-etiologias',
    sec: 'etiologias',
    titulo: 'El cuadro de etiologías',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Grupo', 'Ejemplos'],
        filas: [
          ['Tumorales', '**Cáncer de esófago**: epidermoide, adenocarcinoma'],
          ['Inflamatorias', '**Esofagitis por reflujo** (la más frecuente), eosinofílica, cáusticos, radiación'],
          ['Motoras', '**Acalasia** (idiopática o Chagas), espasmo, esclerodermia'],
          ['Mecánicas y otras', 'Anillo de Schatzki, Plummer-Vinson, divertículos (Zenker, epifrénico, de tracción), várices, traumatismos'],
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Cuadro de etiologías del síndrome esofágico con ejemplos.' },
    aclara: { text: 'El diagnóstico **sindrómico** es «síndrome esofágico»; el **presuntivo** lo dan la clínica y el examen; el **definitivo**, los complementarios.', origen: 'Clase, min 11:19–12:01.' },
    voz: [
      'Las etiologías. Tumorales: el cáncer de esófago, epidermoide o adenocarcinoma.',
      'Inflamatorias: la esofagitis, cuya causa más frecuente es el reflujo; también la eosinofílica, los cáusticos y la radiación.',
      'Motoras: la acalasia, idiopática o chagásica, el espasmo y la esclerodermia.',
      'Y otras: el anillo de Schatzki, la membrana de Plummer-Vinson, los divertículos, las várices esofágicas y los traumatismos.',
    ],
    refs: [S('11:19'), S('12:01'), S('14:48'), S('20:57'), L('368'), L('369')],
  },
  {
    id: 't-cancer',
    sec: 'etiologias',
    titulo: 'Cáncer de esófago: dos tipos',
    fig: { f: 'tracto', vistas: [{ luz: { esofago: 'red' }, marca: { o: 'esofago', tone: 'red' } }] },
    anchoFig: 'chica',
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Epidermoide', tono: 'rose', items: ['El **más frecuente** (90 % según la clase)', 'Tercio **medio**'] },
          { titulo: 'Adenocarcinoma', tono: 'red', items: ['Tercio **inferior**', 'Sobre un **esófago de Barrett**', 'Más en hombres; en aumento'] },
        ],
      },
    ],
    aclara: { text: 'Los tumores del tercio inferior y del cardias son cada vez más frecuentes: por eso hay clasificaciones específicas para la unión esofagogástrica.', origen: 'Clase, min 12:01–12:44.' },
    voz: [
      'El cáncer de esófago es poco frecuente, pero viene en aumento, sobre todo en el tercio inferior. Hay dos tipos. El epidermoide, el más frecuente, en el tercio medio.',
      'Y el adenocarcinoma, en el tercio inferior, que aparece sobre un esófago de Barrett, y es más común en hombres.',
    ],
    refs: [S('12:01'), S('12:44'), S('13:10'), S('14:48')],
  },
  {
    id: 't-barrett',
    sec: 'etiologias',
    titulo: 'Esófago de Barrett',
    fig: { f: 'reflujo', vistas: ['barrett'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'Metaplasia del **tercio inferior**: el epitelio plano estratificado se reemplaza por **cilíndrico**.' },
      { t: 'texto', en: 1, text: 'Es la adaptación al ácido de años de reflujo («siempre viví con acidez»), y es **preneoplásico**: adenocarcinoma.' },
    ],
    voz: [
      'El esófago de Barrett es la metaplasia del tercio inferior: el epitelio plano estratificado del esófago se reemplaza por uno cilíndrico.',
      'Es la adaptación a años de reflujo, en el paciente que te dice que vivió toda la vida con acidez. Y es una lesión preneoplásica: sobre ella aparece el adenocarcinoma.',
    ],
    refs: [S('13:25'), S('14:05'), S('14:48')],
  },
  {
    id: 't-erge',
    sec: 'etiologias',
    titulo: 'Enfermedad por reflujo gastroesofágico',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'La causa **más frecuente** de esofagitis. Muy frecuente en todo el mundo.' },
      { t: 'lista', en: 1, items: ['Puede ser aguda, subaguda o crónica.', 'Mecanismo: el **esfínter esofágico inferior** no contiene el ácido.', 'Consecuencias: esofagitis, Barrett, adenocarcinoma.', 'Su gravedad se clasifica por endoscopia (clasificación de Los Ángeles: se ve en medicina interna).'] },
    ],
    aclara: { text: 'Según el apunte, las causas más habituales son las **relajaciones transitorias** del esfínter, la **hernia hiatal** y los trastornos del peristaltismo; la pirosis que desaparece con antiácidos ayuda al diagnóstico, y la disfagia es un signo de alarma.', origen: 'Libro, p. 369.' },
    voz: [
      'La enfermedad por reflujo gastroesofágico es la causa más frecuente de esofagitis, y es muy frecuente en todo el mundo.',
      'Puede ser aguda o crónica. El mecanismo es una falla del esfínter esofágico inferior, que no contiene el ácido; las consecuencias son la esofagitis, el Barrett y el adenocarcinoma. Su gravedad se clasifica por endoscopia, con la clasificación de Los Ángeles, que vas a ver en medicina interna.',
    ],
    refs: [S('14:48'), S('15:30'), S('16:12'), S('16:55'), L('369')],
  },
  {
    id: 't-acalasia',
    sec: 'etiologias',
    titulo: 'Acalasia',
    fig: { f: 'esofago', modo: 'acalasia' },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Qué es', tono: 'lilac', text: 'Trastorno neuromuscular: **aperistalsis** y esfínter inferior que no se relaja.' },
      { t: 'def', term: 'Primaria', tono: 'sky', en: 1, text: 'Congénita o **idiopática**: la causa más frecuente.' },
      { t: 'def', term: 'Secundaria', tono: 'peach', en: 1, text: '**Chagas**, frecuente en la Argentina.' },
      { t: 'texto', en: 2, text: 'Clínica: disfagia esofágica, **regurgitación** y dolor torácico. Imagen: **dolicomegaesófago**.' },
    ],
    voz: [
      'La acalasia es un trastorno neuromuscular: el esófago no tiene peristaltismo y el esfínter inferior no se relaja.',
      'Puede ser primaria, congénita o idiopática, que es la causa más frecuente, o secundaria, sobre todo por Chagas, muy frecuente en nuestro país.',
      'Se presenta con disfagia esofágica, regurgitación y dolor torácico, y en la imagen se ve un esófago largo y dilatado: el dolicomegaesófago.',
    ],
    refs: [S('16:55'), S('17:36'), S('18:57'), S('19:37'), S('20:17')],
  },
  {
    id: 't-otras',
    sec: 'etiologias',
    titulo: 'Otras causas',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Causa', 'Qué recordar'],
        filas: [
          ['Esclerodermia', 'Endurece la pared y lesiona los nervios'],
          ['**Várices esofágicas**', 'Hipertensión portal'],
          ['Anillo de Schatzki', 'Tercio inferior'],
          ['Plummer-Vinson', 'Membrana en el esófago **superior**'],
          ['Divertículos', 'Zenker, epifrénico, por tracción'],
          ['Esofagitis por cáusticos', 'Ingesta de querosén, nafta, lavandina'],
        ],
      },
    ],
    voz: [
      'Otras causas: la esclerodermia; las várices esofágicas, que vas a ver con la hipertensión portal; el anillo de Schatzki, en el tercio inferior; la membrana de Plummer-Vinson, en el superior; los divertículos, como el de Zenker; y las lesiones por cáusticos.',
    ],
    refs: [S('15:30'), S('20:57'), S('21:38')],
  },
  {
    id: 't-estudios',
    sec: 'diagnostico',
    titulo: 'Cómo se estudia el esófago',
    fig: { f: 'esofago', modo: 'rx' },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Esofagograma con bario', tono: 'sky', text: 'El **primero**: no invasivo. Manzana mordida (cáncer), pico de pájaro (acalasia).' },
      { t: 'def', term: 'Manometría', tono: 'lilac', en: 1, text: 'El **estándar** para la **acalasia**: mide la presión del esfínter.' },
      { t: 'def', term: 'Endoscopia', tono: 'rose', en: 2, text: 'Invasiva: **biopsia** y extensión del cáncer.' },
      { t: 'def', term: 'pH ambulatorio', tono: 'mint', en: 2, text: 'Reflujo: ¿el problema es gástrico o esofágico?' },
    ],
    voz: [
      'El diagnóstico definitivo lo dan las imágenes. Lo primero es el esofagograma con bario, porque no es invasivo: muestra la manzana mordida del cáncer o el pico de pájaro de la acalasia.',
      'La manometría es el estándar para la acalasia: mide la presión del esfínter.',
      'La endoscopia es invasiva, pero permite tomar biopsias y ver la extensión de un cáncer. Y el monitoreo ambulatorio del pH sirve en el reflujo. Con esto, tenés el capítulo. Ahora a practicar.',
    ],
    refs: [S('21:38'), S('22:21'), S('23:01'), S('23:42'), S('24:24'), L('369')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'sindrome', label: 'Síndrome y síntomas' },
    { id: 'etiologias', label: 'Etiologías' },
    { id: 'diagnostico', label: 'Estudios' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'practica',
    titulo: 'Hombre de 58 años',
    texto: '«Siempre viví con acidez.» Hace tres meses le cuesta tragar la carne, y perdió peso. El esofagograma muestra una imagen en manzana mordida en el tercio inferior.',
    pregunta: '¿Qué tipo de tumor es más probable?',
    opciones: [
      { text: 'Adenocarcinoma sobre esófago de Barrett.', why: 'Tercio inferior y reflujo crónico.' },
      { text: 'Carcinoma epidermoide.', why: 'Es típico del tercio medio.' },
      { text: 'Acalasia.', why: 'Da pico de pájaro, no manzana mordida.' },
      { text: 'Membrana de Plummer-Vinson.', why: 'Está en el esófago superior.' },
    ],
    correcta: 0,
    razonamiento: 'Reflujo de años → metaplasia de Barrett → adenocarcinoma del tercio inferior. Se confirma con endoscopia y biopsia.',
  },
  {
    id: 'c2',
    origen: 'clase',
    titulo: 'Paciente con odinofagia',
    texto: 'Consulta por dolor al tragar. Al revisar la garganta tiene amígdalas eritematosas con exudado.',
    pregunta: '¿Qué tiene?',
    opciones: [
      { text: 'Faringoamigdalitis: la causa más frecuente de odinofagia.', why: 'Siempre hay que revisar primero la cavidad oral.' },
      { text: 'Esófago de Barrett.', why: 'No produce odinofagia con exudado amigdalino.' },
      { text: 'Globo histérico.', why: 'Hay lesión orgánica visible.' },
      { text: 'Acalasia.', why: 'No explica el exudado.' },
    ],
    correcta: 0,
    razonamiento: 'Ante una odinofagia, primero la garganta: eritema, exudados, úvula. Si es normal, buscar otra causa.',
    refs: [S('08:30'), S('09:11')],
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'Mujer de 40 años de Santiago del Estero',
    texto: 'Desde hace años le cuesta tragar sólidos y líquidos, regurgita de noche y tiene serología positiva para Chagas.',
    pregunta: '¿Qué estudio confirma el diagnóstico?',
    opciones: [
      { text: 'Manometría esofágica.', why: 'Es el estándar para la acalasia: mide el esfínter.' },
      { text: 'pH ambulatorio.', why: 'Sirve para el reflujo.' },
      { text: 'Endoscopia de entrada.', why: 'Es invasiva; no es el estándar para la acalasia.' },
      { text: 'Radiografía de tórax.', why: 'No evalúa la motilidad.' },
    ],
    correcta: 0,
    razonamiento: 'Acalasia chagásica: el parásito destruye el plexo de Auerbach. Esofagograma con pico de pájaro y manometría.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'sin',
        label: 'Síntomas',
        tone: 'rose',
        examen: true,
        nota: 'Los cinco: disfagia, pirosis, dolor torácico, regurgitación, odinofagia',
        hijos: [
          { id: 'reg', label: 'Regurgitación', tone: 'lilac', nota: 'La más frecuente · con pirosis en más del 90 %' },
          { id: 'odi', label: 'Odinofagia', tone: 'sky', nota: 'Orgánica · faringoamigdalitis n.º 1 · ≠ globo histérico' },
        ],
      },
      {
        id: 'eti',
        label: 'Etiologías',
        tone: 'peach',
        examen: true,
        nota: 'Tumorales, inflamatorias, motoras, mecánicas',
        hijos: [
          { id: 'erg', label: 'Reflujo', tone: 'gold', nota: 'Esfínter incompetente · esofagitis · Barrett → adenocarcinoma' },
          { id: 'can', label: 'Cáncer', tone: 'red', nota: 'Epidermoide: tercio medio · adenocarcinoma: inferior' },
          { id: 'aca', label: 'Acalasia', tone: 'lilac', nota: 'Sin plexo de Auerbach · idiopática o Chagas' },
        ],
      },
      {
        id: 'dx',
        label: 'Estudios',
        tone: 'sky',
        nota: 'Diagnóstico definitivo',
        hijos: [
          { id: 'eso', label: 'Esofagograma', tone: 'sky', nota: 'Primero · manzana mordida · pico de pájaro' },
          { id: 'man', label: 'Manometría', tone: 'lilac', nota: 'Estándar de la acalasia' },
          { id: 'end', label: 'Endoscopia', tone: 'rose', nota: 'Biopsia · invasiva' },
        ],
      },
    ],
    nexos: ['**Reflujo** (esfínter que no contiene) y **acalasia** (esfínter que no se relaja) son opuestos.'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['dig06-d01', 'dig06-d02', 'dig06-d03'],
  anclas: {
    ubicate: { tab: 'mapa' },
    sintomas: { tab: 'teoria', seccion: 'sindrome' },
    etiologias: { tab: 'teoria', seccion: 'etiologias' },
    erge: { tab: 'teoria', seccion: 'etiologias' },
    acalasia: { tab: 'teoria', seccion: 'etiologias' },
    diagnostico: { tab: 'teoria', seccion: 'diagnostico' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    maniobras: { tab: 'maniobras' },
    integracion: { tab: 'cierre' },
  },
};
