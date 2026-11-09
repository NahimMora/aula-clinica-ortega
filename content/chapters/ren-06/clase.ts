import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * ren-06: clase visual de la infección urinaria.
 *  1. Clases de Ortega: «Infección urinaria parte 1» (00:03–33:39) y «parte 2» (00:00–16:32); repaso en «Síndrome
 *     nefrítico» (22:42–30:33).
 *  2. Libro de Clínica Médica de Ortega (sección de infección urinaria).
 *  3. Preguntero: «Urinario — Síndromes: nefrótico, nefrítico e ITU», P9–P15.
 * Ver content/traceability/ren-06.md.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const U1 = (t: string) => r('itu-1', t);
const U2 = (t: string) => r('itu-2', t);
const N = (t: string) => r('nefritico', t);

const GRAL = 'Fisiología general, no se da en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-ascendente',
    sec: 'definicion',
    titulo: 'La bacteria sube',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'urinario', vistas: [{ luz: ['uretra'], tone: 'peach', nota: 'Del periné a la uretra', notaTone: 'peach' }, { luz: ['uretra', 'vejiga'], tone: 'lilac', nota: 'Cistitis', notaTone: 'lilac' }, { luz: ['ureter-d', 'pelvis-d', 'rinon-d'], tone: 'red', nota: 'Pielonefritis', notaTone: 'red' }] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Bacterias del **intestino** (E. coli) colonizan el periné y el **meato** uretral.' },
          { k: 'mecanismo', text: 'Suben por la uretra y se multiplican en la **vejiga**: cistitis.' },
          { k: 'signo', text: 'Si siguen subiendo por el uréter (reflujo, obstrucción), llegan al **riñón**: pielonefritis.' },
        ],
      },
    ],
    voz: [
      'La infección urinaria casi siempre sube desde abajo: es la vía ascendente, alrededor del ochenta por ciento. Las bacterias del intestino, sobre todo Escherichia coli, colonizan el periné y el meato de la uretra.',
      'Suben por la uretra y se multiplican en la vejiga: eso es la cistitis, la infección urinaria baja. Por eso es tanto más frecuente en la mujer, que tiene la uretra corta.',
      'Si siguen subiendo por el uréter, porque hay reflujo o una obstrucción, llegan al riñón: la pielonefritis, la infección alta.',
    ],
    refs: [U1('07:46'), U1('08:28'), U1('10:31'), N('23:52'), N('24:40')],
  },
  {
    id: 'f-defensas',
    sec: 'definicion',
    titulo: 'Por qué la orina suele estar estéril',
    etapas: ['normal', 'alteracion', 'signo'],
    fig: { f: 'urinario', vistas: [{ luz: ['vejiga'], tone: 'mint', nota: 'El chorro lava y la vejiga se vacía', notaTone: 'mint' }, { luz: ['vejiga', 'prostata'], dilata: ['vejiga'], tone: 'red', nota: 'Orina estancada: las bacterias crecen', notaTone: 'red' }] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'normal', text: 'El **chorro** arrastra las bacterias y la vejiga se **vacía del todo**.' },
          { k: 'alteracion', text: 'Si la orina se **estanca** (obstrucción, «me la aguanto», vejiga neurogénica) o **refluye** al uréter, o hay una **sonda**…' },
          { k: 'signo', text: '…las bacterias tienen tiempo de multiplicarse: **infección**.' },
        ],
      },
    ],
    aclara: { text: 'El lavado por el flujo urinario es la defensa principal de la vía urinaria.', origen: GRAL },
    voz: [
      'La orina normalmente está estéril porque el chorro arrastra las bacterias que entran, y la vejiga se vacía por completo varias veces al día.',
      'Si la orina se estanca, por una obstrucción, una vejiga que no se vacía, o el hábito de aguantarse, o si refluye hacia el uréter, o si hay una sonda que les da un camino, las bacterias tienen tiempo de multiplicarse.',
      'Por eso el reflujo y la obstrucción son las dos grandes puertas de entrada.',
    ],
    refs: [U1('11:52'), U1('12:34'), U1('13:16'), U2('00:00')],
  },
  {
    id: 'f-sintomas',
    sec: 'clinica',
    titulo: 'Por qué la cistitis no da fiebre',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'urinario', vistas: [{ luz: ['vejiga'], tone: 'lilac', nota: 'Mucosa inflamada: disuria', notaTone: 'lilac' }, { luz: ['rinon-d', 'pelvis-d'], dilata: ['rinon-d'], tone: 'red', nota: 'Parénquima invadido: fiebre', notaTone: 'red' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Cistitis', tono: 'lilac', text: 'La infección se queda en la **mucosa** de la vejiga: arde al orinar (**disuria**), urgencia, polaquiuria. **Sin fiebre**.' },
      { t: 'def', term: 'Pielonefritis', tono: 'red', en: 1, text: 'Las bacterias **invaden el parénquima** renal: **fiebre**, escalofríos, mal estado general; el riñón se hincha y duele la **cápsula** (puñopercusión +).' },
    ],
    aclara: { text: 'La diferencia entre infección superficial de la mucosa e invasión del tejido explica la fiebre.', origen: GRAL },
    voz: [
      'La diferencia entre la infección baja y la alta está en cuánto invade la bacteria. En la cistitis, la infección queda en la mucosa de la vejiga: la orina ácida pasando por una mucosa inflamada arde, la disuria, y la vejiga irritada pide orinar a cada rato. Pero no hay fiebre.',
      'En la pielonefritis, las bacterias invaden el tejido del riñón: aparecen la fiebre, los escalofríos y el mal estado general, y el riñón inflamado se hincha y estira su cápsula, que duele a la puñopercusión.',
    ],
    refs: [U1('20:06'), U1('22:08'), U1('23:14'), U1('24:09'), U1('24:50')],
  },
  {
    id: 'f-ph',
    sec: 'germenes',
    titulo: 'La orina alcalina del Proteus',
    etapas: ['mecanismo', 'signo'],
    amplio: true,
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'mecanismo', text: '**Proteus** y **Klebsiella** desdoblan la **urea** de la orina y liberan amoníaco.' },
          { k: 'signo', text: 'La orina se vuelve **alcalina** (pH ≈ 7); con E. coli queda **ácida**.' },
          { k: 'signo', text: 'En orina alcalina precipitan cristales: cálculos de **estruvita**.' },
        ],
      },
    ],
    aclara: { text: 'La enzima que desdobla la urea (ureasa) y la formación de estruvita.', origen: GRAL },
    voz: [
      'Un detalle de los gérmenes que tiene su porqué. Proteus y Klebsiella desdoblan la urea de la orina y liberan amoníaco.',
      'Eso vuelve la orina alcalina, con un pH cercano a siete; con Escherichia coli, en cambio, la orina sigue ácida.',
      'Y en una orina alcalina precipitan cristales que forman cálculos de estruvita: infección y litiasis se alimentan una a la otra.',
    ],
    refs: [U1('17:20'), U1('18:00'), U1('18:42')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'definicion', label: 'Cómo llega' },
    { id: 'germenes', label: 'El germen' },
    { id: 'clinica', label: 'Baja o alta' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-def',
    sec: 'definicion',
    titulo: 'Infección urinaria',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Microorganismos que colonizan y se **multiplican** en la vía urinaria.' },
      { t: 'def', term: 'Bacteriuria significativa', tono: 'red', en: 1, text: 'Urocultivo **≥ 10⁵ UFC/ml** (en la mujer sintomática puede valer menos; en el hombre, desde 10³).' },
      { t: 'def', term: 'Leucocituria', tono: 'sky', en: 1, text: '**> 5 leucocitos por campo** en la orina completa.' },
      { t: 'texto', en: 2, text: '8 a 9 de cada 10 son **mujeres**; en los neonatos predomina el varón.' },
    ],
    examen: { origen: 'ortega', texto: 'Infección urinaria.', cita: 'Lo pueden llegar a preguntar en el final; en el parcial lo suelen preguntar.', ref: U1('00:45') },
    voz: [
      'La infección urinaria, que se pregunta en el parcial y en el final, es la colonización y multiplicación de microorganismos en la vía urinaria.',
      'Se habla de bacteriuria significativa cuando el urocultivo tiene diez a la quinta unidades formadoras de colonias por mililitro o más; en la mujer con síntomas puede alcanzar con menos, y en el hombre, desde diez a la tercera. Y de leucocituria, cuando hay más de cinco leucocitos por campo.',
      'Ocho o nueve de cada diez pacientes son mujeres; en los recién nacidos, en cambio, predomina el varón.',
    ],
    refs: [U1('00:45'), U1('01:29'), U1('02:12'), U1('02:53'), U1('04:19')],
  },
  {
    id: 't-vias',
    sec: 'definicion',
    titulo: 'Vías de infección',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Vía', 'Frecuencia'],
        filas: [
          ['**Ascendente**', '**≈ 80 %**'],
          ['Hematógena', '10–20 %'],
          ['Por contigüidad', '1–5 %'],
          ['Linfática', 'Muy rara'],
        ],
      },
      { t: 'clave', en: 1, text: 'La vía **ascendente** y **E. coli**: las dos que no pueden fallar.' },
    ],
    examen: { origen: 'ortega', texto: 'La vía y el germen más frecuentes.', cita: 'Si esas dos cosas no le saben responder a los profesores, están bochados: tienen que saber que la vía ascendente es la más frecuente y la Escherichia coli.', ref: N('24:48') },
    voz: [
      'Las vías de infección. La ascendente, desde el meato hacia arriba, es la más frecuente, alrededor del ochenta por ciento. Le siguen la hematógena, por contigüidad, y la linfática, muy rara.',
      'Y el profesor marca dos respuestas que no pueden fallar: la vía más frecuente es la ascendente, y el germen más frecuente es Escherichia coli. El que no las sabe, está bochado.',
    ],
    refs: [U1('07:46'), U1('08:28'), N('24:36'), N('24:48'), N('24:52')],
  },
  {
    id: 't-factores',
    sec: 'definicion',
    titulo: 'Factores predisponentes',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Las dos grandes', tono: 'gold', text: '**Reflujo vesicoureteral** (sobre todo en niños) y **obstrucción**.' },
      { t: 'def', term: 'En la mujer', tono: 'lilac', en: 1, text: 'Uretra corta, relaciones sexuales, espermicidas, diafragma; **déficit de estrógenos** en la menopausia.' },
      { t: 'def', term: 'Hábitos', tono: 'sky', en: 1, text: 'Aguantarse las ganas: vaciado incompleto.' },
    ],
    voz: [
      'Los factores que la favorecen. Los dos grandes son el reflujo vesicoureteral, sobre todo en los chicos, y la obstrucción.',
      'En la mujer, la uretra corta, las relaciones sexuales, los espermicidas y el diafragma, y en la menopausia el déficit de estrógenos. Y un hábito: aguantarse las ganas de orinar, que deja orina estancada.',
    ],
    refs: [U1('10:31'), U1('11:52'), U1('12:34'), U1('13:16')],
  },
  {
    id: 't-germenes',
    sec: 'germenes',
    titulo: 'Los gérmenes',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Germen', 'Dato'],
        filas: [
          ['**Escherichia coli**', 'El más frecuente (90–95 %); orina ácida'],
          ['**Proteus**, Klebsiella', 'Desdoblan la urea: orina **alcalina**, cálculos de estruvita'],
          ['Staphylococcus saprophyticus', 'Mujer joven'],
          ['Pseudomonas, Enterobacter', 'Intrahospitalarias, sondas'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Los microorganismos causales.', cita: 'Los microorganismos causales, que le pueden llegar a preguntar a ustedes en el parcial.', ref: U1('14:39') },
    voz: [
      'Los gérmenes, que se preguntan en el parcial. El más frecuente, por lejos, es Escherichia coli, noventa a noventa y cinco por ciento, con una orina ácida. Proteus y Klebsiella desdoblan la urea y alcalinizan la orina.',
      'El estafilococo saprófito aparece en mujeres jóvenes, y Pseudomonas y Enterobacter en las infecciones intrahospitalarias, con sondas.',
    ],
    refs: [U1('14:39'), U1('15:19'), U1('15:59'), U1('16:40'), U1('17:20'), U1('17:54')],
  },
  {
    id: 't-baja',
    sec: 'clinica',
    titulo: 'ITU baja: cistitis',
    fig: { f: 'urinario', vistas: [{ luz: ['vejiga', 'uretra'], tone: 'lilac' }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', tono: 'lilac', text: 'Síntoma cardinal: la **disuria**.' },
      { t: 'lista', en: 1, items: ['Polaquiuria, tenesmo, **urgencia**.', 'Dolor **suprapúbico**, a veces hematuria.', 'Buen estado general, **sin fiebre**.'] },
    ],
    examen: { origen: 'ortega', texto: 'Cómo se presenta la ITU en la guardia.', cita: '¿Cómo se presenta en la guardia? Y esto es pregunta de parcial… El síntoma cardinal es la disuria. No se olviden de eso.', ref: U1('23:14') },
    voz: [
      'Cómo se presenta en la guardia, pregunta de parcial. La infección baja, la cistitis, es la más frecuente, alrededor del setenta por ciento. Su síntoma cardinal es la disuria, y el profesor pide no olvidarlo.',
      'Se acompaña de polaquiuria, tenesmo, urgencia, dolor arriba del pubis y a veces sangre en la orina. El paciente está bien, y no tiene fiebre.',
    ],
    refs: [U1('20:06'), U1('22:08'), U1('23:14'), U1('23:28'), U1('24:09')],
  },
  {
    id: 't-alta',
    sec: 'clinica',
    titulo: 'ITU alta: pielonefritis aguda',
    fig: { f: 'urinario', vistas: [{ luz: ['rinon-d', 'pelvis-d'], dilata: ['rinon-d'], tone: 'red' }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', tono: 'red', text: '**Mal estado general**, **fiebre** con escalofríos, náuseas, vómitos y **dolor lumbar**.' },
      { t: 'texto', en: 1, text: 'Más los síntomas de la baja. **Puñopercusión** positiva. Es una ITU **complicada**: riesgo de bacteriemia y sepsis.' },
    ],
    examen: { origen: 'ortega', texto: 'La pielonefritis aguda.', cita: 'A ustedes lo que le preguntan es la pielonefritis aguda. Pregunta de parcial.', ref: U1('21:54') },
    voz: [
      'De la infección alta, lo que se pregunta es la pielonefritis aguda. El paciente llega con mal estado general, fiebre con escalofríos, náuseas, vómitos y dolor lumbar, además de los síntomas de la baja.',
      'La puñopercusión es positiva. Y se considera una infección complicada, porque puede pasar a la sangre y dar una sepsis.',
    ],
    refs: [U1('21:49'), U1('21:54'), U1('24:50'), U1('25:31'), U2('08:17')],
  },
  {
    id: 't-baja-alta',
    sec: 'clinica',
    titulo: 'Baja o alta: el cuadro',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Baja (cistitis)', 'Alta (pielonefritis)'],
        filas: [
          ['Frecuencia', '≈ 70 %', '≈ 30 %'],
          ['Estado general', '**Bueno**', '**Malo**'],
          ['Fiebre', '**No**', '**Sí**, con escalofríos'],
          ['Dolor', 'Suprapúbico', '**Lumbar**'],
          ['Síntomas urinarios', 'Disuria, polaquiuria, urgencia', 'Los mismos'],
          ['Examen', 'Dolor suprapúbico', '**Puñopercusión** +'],
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Cuadro comparativo de etiología y clínica de ITU alta y baja.' },
    voz: [
      'En un cuadro: la baja es el setenta por ciento, con buen estado general, sin fiebre, dolor arriba del pubis y síntomas urinarios. La alta es el treinta por ciento, con mal estado general, fiebre con escalofríos, dolor lumbar, los mismos síntomas urinarios, y la puñopercusión positiva.',
    ],
    refs: [U1('23:28'), U1('24:09'), U1('24:50'), U1('25:31'), U2('08:59')],
  },
  {
    id: 't-asintomatica',
    sec: 'clinica',
    titulo: 'Bacteriuria asintomática',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Urocultivo **≥ 10⁵** **sin síntomas** y **sin leucocitos**.' },
      { t: 'texto', en: 1, text: 'Los síntomas los producen los leucocitos. Se repite la muestra (puede ser contaminación) y se trata en pacientes de **alto riesgo** (embarazo).' },
    ],
    examen: { origen: 'preguntero', texto: '¿Qué es la bacteriuria asintomática?' },
    voz: [
      'Y la bacteriuria asintomática: el urocultivo es positivo, pero el paciente no tiene síntomas ni leucocitos en la orina. El profesor lo explica así: los síntomas los producen los leucocitos, la respuesta inflamatoria.',
      'Se repite la muestra, porque puede ser una contaminación, y se trata solo en los pacientes de alto riesgo, como la embarazada.',
    ],
    refs: [U1('26:12'), N('26:04'), N('26:47')],
  },
  {
    id: 't-complicada',
    sec: 'complicada',
    titulo: 'ITU complicada: factores de riesgo',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Grupo', 'Factores'],
        filas: [
          ['Vía urinaria', '**Obstrucción** (litiasis), reflujo, anomalías anatómicas o funcionales'],
          ['Instrumentos', '**Sonda**, catéter, cirugía urológica; infección intrahospitalaria'],
          ['Huésped', '**Embarazo**, **diabetes**, inmunosupresión (VIH, cáncer, trasplante)'],
          ['Paciente', '**Varón**, lactante, > 65 años; ITU a repetición, síntomas > 7 días, antibióticos recientes'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Los factores de riesgo de una ITU complicada.', cita: 'Como si fuese el Padre Nuestro lo tienen que saber, es pregunta de parcial.', ref: U2('04:32') },
    voz: [
      'Los factores de riesgo de una infección urinaria complicada, que el profesor pide como el Padre Nuestro. De la vía urinaria: una obstrucción, como la litiasis, el reflujo, o una anomalía. Instrumentos: una sonda, un catéter, una cirugía urológica, o una infección intrahospitalaria.',
      'Del huésped: el embarazo, la diabetes, la inmunosupresión. Y del paciente: ser varón, lactante o mayor de sesenta y cinco, tener infecciones a repetición, síntomas de más de siete días, o haber recibido antibióticos hace poco.',
    ],
    refs: [U2('00:00'), U2('01:24'), U2('03:31'), U2('04:32')],
  },
  {
    id: 't-recaida',
    sec: 'complicada',
    titulo: 'Recaída o reinfección',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Recaída', tono: 'peach', items: ['Vuelve poco después del tratamiento (≈ 2–3 semanas)', 'Con el **mismo germen**'] },
          { titulo: 'Reinfección', tono: 'sky', items: ['Se curó y vuelve a infectarse', 'Con **otro germen**'] },
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Recaída y reinfección.', cita: 'Recaída y reinfección le van a preguntar en el parcial.', ref: U2('07:09') },
    voz: [
      'Y otra pregunta de parcial: recaída o reinfección. La recaída es la infección que vuelve poco después de terminar el tratamiento, dos o tres semanas, con el mismo germen: no se terminó de curar.',
      'La reinfección es una infección nueva: el paciente se había curado y se vuelve a infectar, con otro germen.',
    ],
    refs: [U2('05:36'), U2('06:16'), U2('06:56'), U2('07:09'), N('29:03')],
  },
  {
    id: 't-dx',
    sec: 'diagnostico',
    titulo: 'Cómo se diagnostica',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Orina completa (≈ 3 h)', tono: 'sky', text: 'Leucocitos > 5/campo, nitritos, pH: si es positiva, **tratamiento empírico**.' },
      { t: 'def', term: 'Urocultivo (24–48 h)', tono: 'red', en: 0, text: '**≥ 10⁵ UFC/ml**: confirma y dice **qué germen** (y su sensibilidad).' },
      { t: 'def', term: 'Ojo con la leucocituria', tono: 'gold', en: 1, text: 'Puede faltar en la obstrucción, la neutropenia o la orina alcalina. Sin germen («estéril»): **tuberculosis**, litiasis, nefritis intersticial.' },
      { t: 'def', term: 'Imágenes', tono: 'mint', en: 2, text: '**Ecografía** renal (la primera, sobre todo en la alta); cistouretrografía miccional para el reflujo en niños.' },
    ],
    examen: { origen: 'preguntero', texto: '¿Qué significa bacteriuria y leucocituria?' },
    voz: [
      'El diagnóstico se apoya en la clínica y dos estudios. La orina completa está en unas tres horas: leucocitos, nitritos, el pH. Si es positiva, se empieza un tratamiento empírico. El urocultivo tarda uno o dos días, confirma la infección con diez a la quinta o más, y dice qué germen es, para ajustar el antibiótico.',
      'Ojo con los leucocitos: pueden faltar si hay una obstrucción, una neutropenia o una orina alcalina que los destruye. Y si hay leucocitos sin germen, hay que pensar en una tuberculosis o una litiasis.',
      'En imágenes, la primera es la ecografía renal; y en los chicos, la cistouretrografía miccional busca el reflujo.',
    ],
    refs: [U2('07:36'), U2('09:42'), U2('10:23'), U2('11:03'), U2('11:44'), U2('12:25'), U2('13:05')],
  },
  {
    id: 't-prevencion',
    sec: 'diagnostico',
    titulo: 'Prevención',
    amplio: true,
    bloques: [
      { t: 'lista', items: ['**Orinar después** de cada relación sexual.', 'Tomar **mucho líquido**.', '**No aguantarse** las ganas.', 'Evitar diafragma y espermicidas.', 'Higiene perineal **de adelante hacia atrás**.'] },
    ],
    voz: [
      'Y la prevención, que sale directo del mecanismo: orinar después de cada relación sexual, para arrastrar las bacterias; tomar mucho líquido; no aguantarse las ganas; evitar el diafragma y los espermicidas; y la higiene perineal de adelante hacia atrás, para no llevar bacterias del intestino al meato.',
    ],
    refs: [U2('15:49'), U2('16:32')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'definicion', label: 'Qué es y cómo llega' },
    { id: 'germenes', label: 'Gérmenes' },
    { id: 'clinica', label: 'Baja o alta' },
    { id: 'complicada', label: 'Complicada y recaída' },
    { id: 'diagnostico', label: 'Diagnóstico' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'practica',
    titulo: 'Ardor al orinar después de las vacaciones',
    texto: 'Mujer de 25 años con ardor al orinar, ganas de orinar a cada rato y dolor arriba del pubis desde hace dos días. Sin fiebre. Puñopercusión negativa.',
    pregunta: '¿Qué tiene y qué germen sospecha?',
    opciones: [
      { text: 'Cistitis (ITU baja) por E. coli.', why: 'Disuria sin fiebre; vía ascendente y E. coli, las más frecuentes.' },
      { text: 'Pielonefritis aguda.', why: 'No hay fiebre ni dolor lumbar.' },
      { text: 'Bacteriuria asintomática.', why: 'Tiene síntomas.' },
      { text: 'Litiasis renal.', why: 'No hay dolor cólico.' },
    ],
    correcta: 0,
    razonamiento: 'El síntoma cardinal de la cistitis es la disuria; buen estado general, sin fiebre.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Fiebre y dolor en la espalda',
    texto: 'Mujer diabética con fiebre de 39 °C, escalofríos, vómitos, dolor lumbar derecho y disuria. Puñopercusión derecha positiva.',
    pregunta: '¿Qué tiene?',
    opciones: [
      { text: 'Pielonefritis aguda: ITU alta complicada (diabetes).', why: 'Fiebre, dolor lumbar y puñopercusión +.' },
      { text: 'Cistitis no complicada.', why: 'La fiebre y el dolor lumbar indican compromiso renal.' },
      { text: 'Cólico renoureteral sin infección.', why: 'No explica la fiebre ni la disuria.' },
      { text: 'Uretritis.', why: 'No da fiebre ni dolor lumbar.' },
    ],
    correcta: 0,
    razonamiento: 'ITU alta con un factor de riesgo (diabetes): complicada, riesgo de sepsis.',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'Vuelve a los quince días',
    texto: 'Una paciente tratada por cistitis por E. coli vuelve 15 días después de terminar el antibiótico, con los mismos síntomas. El urocultivo vuelve a dar E. coli con la misma sensibilidad.',
    pregunta: '¿Recaída o reinfección?',
    opciones: [
      { text: 'Recaída: mismo germen, poco después del tratamiento.', why: 'No se terminó de erradicar.' },
      { text: 'Reinfección.', why: 'Sería con otro germen, después de curarse.' },
      { text: 'Bacteriuria asintomática.', why: 'Tiene síntomas.' },
      { text: 'Contaminación de la muestra.', why: 'Tiene síntomas y el mismo germen.' },
    ],
    correcta: 0,
    razonamiento: 'Recaída = mismo germen, a las 2–3 semanas; reinfección = germen distinto.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'itu',
        label: 'Infección urinaria',
        tone: 'lilac',
        examen: true,
        nota: 'Urocultivo ≥ 10⁵ · leucocituria > 5/campo',
        hijos: [
          { id: 'via', label: 'Vía y germen', tone: 'red', examen: true, nota: '**Ascendente** (80 %) · **E. coli** (90–95 %) · Proteus: orina alcalina' },
          { id: 'baj', label: 'Baja: cistitis', tone: 'lilac', examen: true, nota: '**Disuria** (cardinal), polaquiuria, urgencia · sin fiebre' },
          { id: 'alt', label: 'Alta: pielonefritis', tone: 'red', examen: true, nota: 'Fiebre, escalofríos, **dolor lumbar**, puñopercusión +' },
          { id: 'com', label: 'Complicada', tone: 'gold', examen: true, nota: 'Obstrucción, sonda, embarazo, diabetes, varón · **recaída vs reinfección**' },
          { id: 'dx', label: 'Diagnóstico', tone: 'sky', nota: 'Orina completa → empírico · urocultivo → germen · ecografía' },
        ],
      },
    ],
    nexos: ['**Las dos que no pueden fallar:** vía ascendente y E. coli.', '**Fiebre y dolor lumbar:** el riñón está infectado.'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['ren06-d01', 'ren06-d02', 'ren06-d03', 'ren06-d04', 'ren06-d05'],
  anclas: {
    ubicate: { tab: 'mapa' },
    definicion: { tab: 'teoria', seccion: 'definicion' },
    germenes: { tab: 'teoria', seccion: 'germenes' },
    clinica: { tab: 'teoria', seccion: 'clinica' },
    complicada: { tab: 'teoria', seccion: 'complicada' },
    diagnostico: { tab: 'teoria', seccion: 'diagnostico' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    maniobras: { tab: 'maniobras' },
    integracion: { tab: 'cierre' },
  },
};
