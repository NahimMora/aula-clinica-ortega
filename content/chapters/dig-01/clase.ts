import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';
import repasoPrevio from './video.json';

/*
 * dig-01: clase visual. Jerarquía de fuentes:
 *  1. Clases de Ortega: MC Digestivo 1 (disfagia y dispepsia), MC Digestivo 2 (00:00–32:03: dispepsia y vómitos)
 *     y Hemorragias digestivas 1 (07:36–17:02: hematemesis vs hemoptisis, Mallory-Weiss).
 *  2. Libro de Clínica Médica de Ortega (p. 75, 369, 375, 377, 390): aclaraciones.
 *  3. Argente-Álvarez (cap. 39-1 p. 639; 39-2 p. 643–644; 39-3 p. 645–646): solo mecanismos que la clase no explica.
 *  4. Preguntero: P1–P5 del bloque «MC náuseas, vómitos y dolor abdominal».
 * «❗ Dr. Ortega» solo aparece cuando él lo señala como pregunta o como lo que no se debe olvidar.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const M1 = (t: string) => r('mc-dig-1', t);
const M2 = (t: string) => r('mc-dig-2', t);
const HD = (t: string) => r('hd-1', t);
const L = (p: string) => r('libro', undefined, p);
const A = (p: string) => r('argente-libro', undefined, p);

const ARG = 'Argente-Álvarez';
const GRAL = 'Fisiología general, no se da en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  /* ──────── El reflejo del vómito ──────── */
  {
    id: 'f-centros',
    sec: 'reflejo',
    titulo: 'Dos centros en el bulbo',
    etapas: ['normal'],
    fig: { f: 'centros-vomito', modo: 'centros' },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Centro del vómito', tono: 'rose', text: 'En la **formación reticular** del bulbo, junto a los centros vasomotor y respiratorio. **Coordina** el acto.' },
      { t: 'def', term: 'Zona quimiorreceptora gatillo', tono: 'peach', en: 1, text: '**Área postrema**, en el piso del IV ventrículo. **Sin barrera hematoencefálica**: detecta lo que circula en la sangre.' },
      { t: 'texto', en: 2, text: 'Por sí sola **no dispara** el vómito: activa al centro.' },
    ],
    aclara: { text: 'La náusea se acompaña de actividad **parasimpática** refleja y de menos motilidad del estómago y del intestino. Por eso el paciente saliva y suda antes de vomitar.', origen: `${ARG}, p. 646.` },
    voz: [
      'Empecemos por el mecanismo. El vómito es un reflejo, y lo coordina un centro ubicado en el bulbo: el centro del vómito, en la formación reticular, al lado de los centros que regulan la presión y la respiración.',
      'Muy cerca, en el piso del cuarto ventrículo, está el área postrema, la zona quimiorreceptora gatillo. No tiene barrera hematoencefálica, así que detecta directamente lo que viaja en la sangre.',
      'Pero esa zona no hace vomitar por sí sola: lo que hace es activar al centro del vómito.',
    ],
    refs: [A('646')],
  },
  {
    id: 'f-aferencias',
    sec: 'reflejo',
    titulo: 'Quién activa el centro',
    etapas: ['alteracion', 'mecanismo'],
    fig: { f: 'centros-vomito', modo: 'aferencias' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'lista',
        items: [
          '**Corteza:** olores, gustos, imágenes, dolor.',
          '**Vestíbulo:** movimiento, infecciones o tumores del laberinto.',
          '**Vago:** distensión del tubo digestivo, inflamación peritoneal, isquemia mesentérica.',
          '**Sangre → zona gatillo:** fármacos, uremia, cetoacidosis, hipercalcemia, toxinas.',
        ],
      },
    ],
    aclara: { text: 'Por eso el vómito no orienta solo a digestivo: el profesor lo enumera en enfermedades del sistema nervioso, cardíacas, urinarias, metabólicas, por fármacos y en el embarazo.', origen: `Vías: ${ARG}, p. 646. Causas: clase, min 25:17.` },
    voz: [
      'Al centro le llegan señales de cuatro lugares. Desde la corteza: un olor, una imagen o un dolor intenso pueden hacer vomitar.',
      'Desde el vestíbulo: el movimiento, o una enfermedad del laberinto.',
      'Desde el propio tubo digestivo, por el vago: la distensión, la inflamación del peritoneo, la isquemia intestinal.',
      'Y desde la sangre, a través de la zona gatillo: fármacos, uremia, cetoacidosis o toxinas. Por eso tantas enfermedades que no son digestivas se presentan con vómitos.',
    ],
    refs: [A('646'), M2('25:17')],
  },
  {
    id: 'f-eferencias',
    sec: 'reflejo',
    titulo: 'Qué ordena el centro',
    etapas: ['mecanismo'],
    fig: { f: 'centros-vomito', modo: 'eferencias' },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Nervio frénico', tono: 'sky', text: 'Contrae el **diafragma**.' },
      { t: 'def', term: 'Nervios espinales', tono: 'mint', en: 1, text: 'Contraen los músculos **intercostales y abdominales**.' },
      { t: 'def', term: 'Vago y pares craneales', tono: 'lilac', en: 2, text: 'Relajan el **esfínter esofágico inferior** y el fondo; cierran el píloro; mueven paladar, faringe y laringe.' },
    ],
    voz: [
      'Una vez activado, el centro manda órdenes por tres caminos. Por el frénico, contrae el diafragma.',
      'Por los nervios espinales, contrae los músculos intercostales y la pared abdominal.',
      'Y por el vago y los pares craneales relaja el esfínter esofágico inferior y el fondo del estómago, cierra el píloro, y coordina el paladar, la faringe y la laringe.',
    ],
    refs: [A('646')],
  },
  {
    id: 'f-acto',
    sec: 'reflejo',
    titulo: 'El acto del vómito',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'acto-vomito' },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'mecanismo', text: 'Onda **antiperistáltica**: la **bilis** pasa al estómago.' },
          { k: 'mecanismo', text: '**Diafragma y abdominales** se contraen; **píloro** cerrado.' },
          { k: 'mecanismo', text: '**EEI y fondo** se relajan: el contenido sube.' },
          { k: 'signo', text: '**Paladar** y **glotis** se cierran: protegen la vía aérea.' },
        ],
      },
    ],
    aclara: { text: 'En la **arcada** ocurre lo mismo, pero el contenido no llega a la boca. La onda antiperistáltica explica que se pueda vomitar con el **estómago vacío** y que el vómito traiga bilis.', origen: `${ARG}, p. 646.` },
    voz: [
      'Y así ocurre el acto. Antes de vomitar, una onda antiperistáltica que empieza en el íleon devuelve el contenido del duodeno, con bilis, al estómago.',
      'Después se contraen juntos el diafragma y los músculos abdominales. El estómago queda apretado, con el píloro cerrado.',
      'El esfínter esofágico inferior y el fondo se relajan, y el contenido sube por el esófago hasta la boca.',
      'Mientras tanto, el paladar blando se eleva y cierra la nasofaringe, y la glotis se cierra para que nada pase a la vía aérea.',
    ],
    refs: [A('646')],
  },

  /* ──────── Lo que sale dice de dónde viene ──────── */
  {
    id: 'f-nivel',
    sec: 'contenido',
    titulo: 'Cuanto más procesado, más lejos',
    etapas: ['mecanismo', 'signo'],
    fig: {
      f: 'tracto',
      vistas: [
        { luz: { esofago: 'peach' }, nota: 'Alimento entero', notaTone: 'peach' },
        { luz: { estomago: 'gold' }, nota: 'Parcialmente digerido', notaTone: 'gold' },
        { luz: { duodeno: 'mint', vesicula: 'mint' }, nota: 'Con bilis', notaTone: 'mint' },
        { luz: { ileon: 'red', colon: 'red' }, nota: 'Fecaloide', notaTone: 'red' },
      ],
    },
    anchoFig: 'chica',
    bloques: [
      {
        t: 'lista',
        items: [
          '**Esófago:** el alimento vuelve sin digerir y con poco ácido.',
          '**Estómago:** parcialmente digerido, con ácido: estuvo un tiempo en contacto con el jugo gástrico.',
          '**Bilis:** el contenido viene desde **debajo de la ampolla de Vater**.',
          '**Fecaloide:** obstrucción baja; las bacterias proliferan y dan el olor.',
        ],
      },
    ],
    aclara: { text: 'Si hay bilis, el contenido duodenal pudo pasar al estómago: por eso un **síndrome pilórico** vomita alimentos retenidos **sin bilis**.', origen: `${ARG}, p. 646; Libro, p. 375.` },
    voz: [
      'El contenido del vómito funciona como una marca de nivel. Si viene del esófago, el alimento vuelve casi entero y casi sin ácido.',
      'Si estuvo en el estómago, vuelve parcialmente digerido y ácido.',
      'Si trae bilis, el contenido viene de más abajo de la ampolla de Vater, en el duodeno.',
      'Y si es fecaloide, hay una obstrucción baja: el contenido se estanca, las bacterias proliferan y aparece ese olor.',
    ],
    refs: [A('646'), L('375'), L('377')],
  },
  {
    id: 'f-sangre',
    sec: 'contenido',
    titulo: 'Por qué la sangre cambia de color',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'hematemesis' },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Estómago', tono: 'peach', text: 'El **ácido** convierte la hemoglobina en **hematina ácida**: borra de café. Roja solo si se vomita enseguida.' },
      { t: 'def', term: 'Vía aérea', tono: 'rose', en: 1, text: 'La sangre se mezcla con **aire**: roja, **espumosa** y de reacción **alcalina**.' },
    ],
    aclara: { text: 'La sangre que sigue hacia el intestino es digerida por las enzimas: sale con la materia fecal como **melena**. Por eso la hematemesis se acompaña después de melena y la hemoptisis no.', origen: 'Clase de hemorragias digestivas, min 08:59; Libro, p. 75.' },
    voz: [
      'La sangre también cuenta de dónde viene. En el estómago se encuentra con el ácido, que transforma la hemoglobina en hematina ácida. Por eso se vomita oscura, como borra de café. Solo es roja si se vomita enseguida.',
      'La sangre del pulmón, en cambio, sale mezclada con aire. Es roja, espumosa, y su reacción es alcalina.',
    ],
    refs: [L('75'), HD('08:59'), A('646')],
  },

  /* ──────── Por qué se complica ──────── */
  {
    id: 'f-perdidas',
    sec: 'complica',
    titulo: 'Lo que se pierde al vomitar',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'perdidas' },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Vómitos repetidos de contenido gástrico.' },
          { k: 'mecanismo', text: 'Se pierden **ácido clorhídrico** (hidrógeno y cloro) y **agua**.' },
          { k: 'mecanismo', text: 'Falta volumen: el riñón retiene sodio y elimina **potasio**.' },
          { k: 'signo', text: '**Alcalosis metabólica**, **hipopotasemia** y **deshidratación**: taquicardia, hipotensión.' },
        ],
      },
    ],
    aclara: { text: 'El jugo gástrico tiene poco potasio: la hipopotasemia es sobre todo **renal**, porque la hipovolemia activa la aldosterona y el bicarbonato que sobra arrastra potasio en la orina.', origen: GRAL },
    voz: [
      'Ahora, por qué se complica. Cuando un paciente vomita una y otra vez contenido del estómago...',
      'pierde ácido clorhídrico, es decir hidrógeno y cloro, y pierde agua.',
      'Al faltar volumen, el riñón trata de retener sodio y, a cambio, elimina potasio.',
      'El resultado es una alcalosis metabólica con hipopotasemia, y un paciente deshidratado, taquicárdico e hipotenso.',
    ],
    refs: [M2('23:15'), L('377')],
  },
  {
    id: 'f-desgarro',
    sec: 'complica',
    titulo: 'El esfuerzo puede romper el esófago',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'desgarro' },
    anchoFig: 'grande',
    bloques: [
      { t: 'texto', text: 'Las **arcadas** suben bruscamente la presión contra la unión esofagogástrica.' },
      { t: 'def', term: 'Mallory-Weiss', tono: 'rose', en: 1, text: 'Desgarro **lineal de la mucosa**: sangra hacia la luz → **hematemesis**.' },
      { t: 'def', term: 'Boerhaave', tono: 'red', en: 2, text: 'Rotura de **todo el espesor**: el contenido pasa al **mediastino**.' },
    ],
    voz: [
      'El otro problema es mecánico. Con cada arcada, la presión sube de golpe contra la unión entre el esófago y el estómago.',
      'Si se desgarra solo la mucosa, en forma lineal, sangra hacia la luz y el paciente vomita sangre. Es el síndrome de Mallory-Weiss.',
      'Si se rompe todo el espesor de la pared, el vómito pasa al mediastino. Es el síndrome de Boerhaave, mucho más grave.',
    ],
    refs: [M2('23:55'), M2('24:31'), HD('16:48'), L('390'), A('646')],
  },
  {
    id: 'f-aspiracion',
    sec: 'complica',
    titulo: 'Si el vómito va al pulmón',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'aspiracion' },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'El contenido gástrico pasa a la vía aérea.' },
          { k: 'mecanismo', text: 'El ácido inflama el pulmón: **neumonitis química**.' },
          { k: 'mecanismo', text: 'El tejido inflamado se **coloniza** con bacterias.' },
          { k: 'signo', text: '**Neumonía aspirativa**, que puede ser la causa de muerte.' },
        ],
      },
    ],
    aclara: { text: 'El riesgo es mayor cuando falla la protección de la vía aérea: alcohol, deterioro de la conciencia o trastornos de la deglución.', origen: GRAL },
    voz: [
      'Y la tercera complicación: el contenido del vómito puede ir hacia la vía aérea.',
      'El ácido inflama el pulmón: es una neumonitis química.',
      'Ese pulmón inflamado se coloniza con bacterias.',
      'Y termina en una neumonía aspirativa, que puede matar al paciente.',
    ],
    refs: [M2('23:21'), M2('23:55')],
  },

  /* ──────── Tragar y no poder ──────── */
  {
    id: 'f-deglucion',
    sec: 'deglucion',
    titulo: 'La deglución normal',
    etapas: ['normal'],
    fig: { f: 'deglucion' },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Oral', tono: 'mint', text: '**Voluntaria:** masticación y lengua forman el bolo y lo llevan atrás.' },
      { t: 'def', term: 'Faríngea', tono: 'lilac', en: 1, text: '**Refleja:** el paladar cierra la nariz, la epiglotis cierra la laringe y se abre el esfínter superior.' },
      { t: 'def', term: 'Esofágica', tono: 'sky', en: 2, text: '**Peristaltismo** comandado por el **parasimpático**; el esfínter inferior se relaja.' },
    ],
    voz: [
      'Pasemos a la deglución. La primera fase es voluntaria: masticamos, y la lengua forma el bolo y lo empuja hacia atrás.',
      'Desde la faringe todo es involuntario. El paladar blando sube y cierra la nariz, la epiglotis tapa la laringe, y se relaja el esfínter esofágico superior.',
      'En el esófago, el parasimpático genera la onda peristáltica que lleva el bolo hasta el estómago, y el esfínter inferior se abre para dejarlo pasar.',
    ],
    refs: [M1('01:33'), M1('02:20'), A('639')],
  },
  {
    id: 'f-orofaringea',
    sec: 'deglucion',
    titulo: 'Cuando no se puede transferir',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'deglucion', modo: 'orofaringea' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Lesión **neuromuscular**: un ACV que afecta los pares craneales de la deglución.' },
          { k: 'mecanismo', text: 'El bolo **no pasa** al esófago: queda en la faringe y la vía aérea no se cierra bien.' },
          { k: 'signo', text: '**Regurgitación nasal**, tos y ahogo por **aspiración**, disfonía.' },
        ],
      },
    ],
    aclara: { text: 'Los **líquidos** son los que más cuestan: avanzan rápido y exigen que la vía aérea se cierre a tiempo.', origen: `Que cuesta más con líquidos: clase, min 03:42, y ${ARG}, p. 639. Por qué: ${GRAL}` },
    voz: [
      'Cuando falla la parte refleja, por ejemplo después de un accidente cerebrovascular que lesiona los pares craneales...',
      'el bolo no se transfiere al esófago. Queda en la faringe, y el paladar y la epiglotis no cierran bien.',
      'Entonces una parte vuelve por la nariz y otra cae a la laringe: el paciente tose, se ahoga y puede aspirar.',
    ],
    refs: [M1('04:24'), M1('05:05'), M1('05:47'), A('639')],
  },
  {
    id: 'f-muro-motor',
    sec: 'deglucion',
    titulo: 'Obstáculo o motor que falla',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'esofago', modo: 'comparar' },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Mecánica', tono: 'peach', text: 'Un obstáculo deja pasar los **líquidos** pero no los **sólidos**. Crece: es **progresiva**.' },
      { t: 'def', term: 'Motora', tono: 'lilac', en: 1, text: 'Falla la onda: no empuja **nada**, ni sólidos ni líquidos. Es **intermitente**.' },
    ],
    voz: [
      'En el esófago hay dos maneras de trabarse. Si hay un obstáculo, el líquido pasa por el costado, pero el sólido no. Y como el obstáculo crece, la disfagia es progresiva.',
      'Si lo que falla es el motor, la onda peristáltica no empuja nada: cuesta tragar sólidos y líquidos, y los síntomas van y vienen.',
    ],
    refs: [M1('12:48'), M1('13:28'), M1('14:08'), A('639')],
  },
  {
    id: 'f-acalasia',
    sec: 'deglucion',
    titulo: 'Acalasia: el esófago que no vacía',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'esofago', modo: 'acalasia' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Se daña el **plexo mientérico de Auerbach**: idiopática o por **Chagas**.' },
          { k: 'mecanismo', text: '**Aperistalsis** y un **esfínter inferior** con más tono, que no se relaja.' },
          { k: 'signo', text: 'El esófago se dilata (**dolicomegaesófago**): disfagia para sólidos y líquidos, regurgitación, dolor torácico.' },
        ],
      },
    ],
    voz: [
      'La acalasia junta los dos problemas. Se daña el plexo mientérico de Auerbach, en general sin causa conocida, o por la enfermedad de Chagas.',
      'El esófago pierde el peristaltismo, y el esfínter inferior aumenta su tono y no se relaja.',
      'El alimento se acumula, el esófago se dilata y se alarga. Por eso cuesta tragar sólidos y líquidos, y el paciente regurgita.',
    ],
    refs: [L('369'), M1('14:48'), M1('24:10')],
  },

  /* ──────── Dispepsia: qué falla ──────── */
  {
    id: 'f-dispepsia',
    sec: 'dispepsia',
    titulo: 'Dispepsia funcional: qué falla',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'estomago', vistas: [['acomodacion'], ['vaciamiento'], ['sensibilidad', 'acido'], ['hp'], ['snc']] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'lista',
        items: [
          'El **fondo no se relaja** al llegar la comida: plenitud, saciedad precoz.',
          '**Vaciamiento retrasado:** el contenido queda retenido.',
          '**Hipersensibilidad visceral:** el ácido es normal, pero duele.',
          '**H. pylori** en 30 a 50 %: inflama, aunque su papel no está claro.',
          '**Estrés y ansiedad** modulan todo lo anterior desde el sistema nervioso.',
        ],
      },
    ],
    aclara: { text: 'Lo clave es que la **secreción de ácido es normal**: lo que cambia es la forma en que el estómago se mueve y la forma en que lo percibe.', origen: `${ARG}, p. 643. Mecanismos: clase, min 02:45–06:53.` },
    voz: [
      'Y por último, qué falla en la dispepsia funcional. Primero, la acomodación: cuando llega la comida, el fondo del estómago debería relajarse. Si no lo hace, el paciente se llena enseguida.',
      'Segundo, el vaciamiento: el estómago tarda en vaciarse y el contenido queda retenido.',
      'Tercero, la hipersensibilidad visceral. El ácido es normal, pero el estómago lo percibe como dolor.',
      'Cuarto, el Helicobacter pylori: está en un tercio a la mitad de estos pacientes y produce inflamación, aunque también aparece en personas sin síntomas.',
      'Y por encima de todo, el sistema nervioso central: el estrés y la ansiedad modulan el movimiento y la sensibilidad del estómago.',
    ],
    refs: [M2('02:45'), M2('03:27'), M2('04:09'), M2('05:32'), M2('06:13'), A('643')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'reflejo', label: 'El reflejo del vómito' },
    { id: 'contenido', label: 'Qué dice el contenido' },
    { id: 'complica', label: 'Por qué se complica' },
    { id: 'deglucion', label: 'Deglución y disfagia' },
    { id: 'dispepsia', label: 'Dispepsia' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  /* ──────── Vómito y náusea ──────── */
  {
    id: 't-definiciones',
    sec: 'vomito',
    titulo: 'Vómito, náusea y lo que no es vómito',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Término', 'Qué es'],
        filas: [
          ['Vómito (emesis)', 'Expulsión **por la boca** del contenido del estómago o del duodeno'],
          ['Náusea', 'Deseo de vomitar: **precede** al vómito'],
          ['Arcadas', 'Contracciones del abdomen y del tórax que preceden al vómito'],
          ['Regurgitación', 'El contenido sube **sin esfuerzo** y vuelve'],
          ['Rumiación', 'Llega a la boca y el paciente **lo vuelve a tragar**'],
          ['Hematemesis', 'Vómito de **sangre**: siempre tubo digestivo **alto**'],
        ],
      },
      { t: 'texto', en: 2, text: 'Lo habitual es consultar por náuseas **y** vómitos: un vómito **sin náusea previa** llama la atención.' },
    ],
    examen: { origen: 'preguntero', texto: '¿Qué es el vómito? ¿Qué es la náusea?' },
    voz: [
      'Vamos con la teoría. El vómito, o emesis, es la expulsión por la boca del contenido del estómago o del duodeno. La náusea es el deseo de vomitar: casi siempre lo precede.',
      'Las arcadas son las contracciones del abdomen y del tórax que vienen antes. Y hay dos cosas que no son vómito: la regurgitación, que sube sin esfuerzo, y la rumiación, cuando el paciente lo vuelve a tragar.',
      'Por eso un paciente que vomita sin haber tenido náuseas te tiene que llamar la atención.',
    ],
    refs: [M2('13:51'), M2('14:31'), M2('15:11')],
  },

  /* ──────── Tipos de vómito ──────── */
  {
    id: 't-clasificacion',
    sec: 'tipos',
    titulo: 'Dos formas de clasificarlo',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Por contenido', tono: 'peach', items: ['**Alimenticio**', '**Parcialmente digerido**', '**Bilioso**', '**Hemático**', '**Fecaloide**'] },
          { titulo: 'Por horario', tono: 'lilac', items: ['**Matinal**, en ayunas', '**Nocturno**', '**Una hora** después de comer', '**Varias horas** después de comer'] },
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Cómo era el vómito y en qué momento apareció.', cita: 'Les pueden preguntar.', ref: M2('16:21') },
    voz: ['Hay dos clasificaciones, y el profesor avisa que te las pueden preguntar. Por el contenido: alimenticio, parcialmente digerido, bilioso, hemático y fecaloide. Y por el horario: matinal, nocturno, o después de comer.'],
    refs: [M2('15:51'), M2('16:21'), M2('19:13')],
  },
  {
    id: 't-alimenticio',
    sec: 'tipos',
    titulo: 'Alimenticio y parcialmente digerido',
    fig: { f: 'tracto', vistas: [{ luz: { esofago: 'peach' } }, { luz: { estomago: 'gold', piloro: 'gold' } }] },
    anchoFig: 'chica',
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Alimenticio', tono: 'peach', items: ['La comida **tal como la comió**, con poco ácido', 'Con opresión retroesternal', 'Pensar en **esófago**'] },
          { titulo: 'Parcialmente digerido', tono: 'gold', items: ['Mucho **líquido y ácido**', 'Pensar en **estómago**', 'Gastroparesia, obstrucción pilórica, distensión gástrica'] },
        ],
      },
    ],
    voz: [
      'Por el contenido. Si el paciente vomita la comida tal como la comió, con poco ácido y con opresión en el pecho, pensá en el esófago.',
      'Si viene con mucho líquido y mucho ácido, parcialmente digerido, el problema está en el estómago: una gastroparesia o una obstrucción del píloro.',
    ],
    refs: [M2('15:51'), M2('16:31')],
  },
  {
    id: 't-bilioso',
    sec: 'tipos',
    titulo: 'Bilioso y fecaloide',
    fig: { f: 'tracto', vistas: [{ luz: { duodeno: 'mint', vesicula: 'mint', pancreas: 'mint' } }, { luz: { ileon: 'red', colon: 'red' } }] },
    anchoFig: 'chica',
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Bilioso', tono: 'mint', items: ['Amarillo verdoso, deja la boca **amarga**', 'Causas **pancreáticas, hepáticas y biliares**'] },
          { titulo: 'Fecaloide', tono: 'red', items: ['Marrón, de **olor fecal**', '**Obstrucción intestinal baja**', '**Fístula gastrocólica**'] },
        ],
      },
    ],
    voz: [
      'El bilioso es amarillo verdoso y deja un sabor amargo en la boca. Aparece en causas pancreáticas, hepáticas y biliares.',
      'Y el fecaloide es marrón, con olor a materia fecal. Indica una obstrucción baja del intestino, o una fístula entre el estómago y el colon.',
    ],
    refs: [M2('17:13'), M2('18:33'), M2('19:13')],
  },
  {
    id: 't-hematico',
    sec: 'tipos',
    titulo: 'Hemático: rojo o borra de café',
    fig: { f: 'tracto', vistas: [{ marca: { o: 'estomago', tone: 'red' }, luz: { esofago: 'red', estomago: 'red', duodeno: 'red' }, treitz: true }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'def', term: 'Rojo claro', tono: 'red', text: 'Sangrado **activo**.' },
      { t: 'def', term: 'Borra de café', tono: 'peach', text: 'Rojo oscuro o negro, con coágulos o restos: sangre **vieja**, ya digerida.' },
      { t: 'lista', en: 1, items: ['Primero descartar **úlcera**.', '**Várices esofágicas:** sangre venosa, abundante.', '**Mallory-Weiss**, cáncer.'] },
    ],
    voz: [
      'El hemático es el vómito con sangre. Si es roja clara, el sangrado está activo. Si es oscura, en borra de café, con coágulos o restos de comida, es sangre vieja, que ya estuvo en el estómago.',
      'Ante una hematemesis, lo primero que hay que descartar es una úlcera. Después, las várices esofágicas, con sangre venosa abundante, el síndrome de Mallory-Weiss y el cáncer.',
    ],
    refs: [M2('17:13'), M2('17:53')],
  },
  {
    id: 't-horario',
    sec: 'tipos',
    titulo: 'Por el horario',
    fig: { f: 'horario' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'lista',
        items: [
          '**Mañana, en ayunas:** embarazo, alcohol la noche anterior, hipertensión endocraneana.',
          '**Noche:** siempre causa orgánica.',
          '**Una hora** después de comer: estómago.',
          '**Varias horas** después: píloro, síndrome pilórico.',
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Tipos o clasificación de los vómitos.' },
    aclara: { text: 'En el síndrome pilórico el estómago no se vacía: el vómito aparece **4 a 6 horas** después de comer, con alimentos retenidos.', origen: 'Libro, p. 375.' },
    voz: [
      'Por el horario. Si vomita por la mañana, en ayunas, pensá siempre en tres cosas: está embarazada, tomó alcohol la noche anterior, o tiene hipertensión endocraneana.',
      'El vómito nocturno casi siempre obedece a una causa orgánica.',
      'Si vomita una hora después de comer, el problema está en el estómago.',
      'Y si vomita varias horas después, en el píloro: es el síndrome pilórico.',
    ],
    refs: [M2('19:13'), M2('19:53'), L('375')],
  },

  /* ──────── Hematemesis y hemoptisis ──────── */
  {
    id: 't-hemat-hemop',
    sec: 'hematemesis',
    titulo: 'Hematemesis frente a hemoptisis',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Hematemesis', 'Hemoptisis'],
        filas: [
          ['Sale con', 'El **vómito**, precedida de náuseas', 'La **tos**, con cosquilleo laríngeo'],
          ['Aspecto', 'Oscura, **borra de café**, coágulos, restos de comida', 'Roja rutilante, **espumosa**, sin restos'],
          ['Reacción', '**Ácida**', '**Alcalina**'],
          ['Después', '**Melena**', 'Esputo hemoptoico, sin melena'],
          ['Antecedentes', 'Digestivos', 'Respiratorios'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Diagnóstico diferencial entre hematemesis y hemoptisis.', cita: 'Diagnóstico diferencial con hemoptisis, pregunta de parcial… por favor ese cuadrito tienen que sabérselo.', ref: HD('08:10') },
    aclara: { text: 'La reacción **alcalina** es la de la hemoptisis: la sangre del pulmón no tuvo contacto con el ácido. La que estuvo en el estómago es **ácida**.', origen: 'Libro de Clínica Médica, p. 75.' },
    voz: [
      'Y llegamos a una pregunta de parcial: el cuadro de hematemesis y hemoptisis, que el profesor pide de memoria. La hematemesis sale con el vómito, precedida de náuseas. La hemoptisis sale con la tos.',
      'La hematemesis es oscura, en borra de café, con coágulos o restos de comida. La hemoptisis es roja, rutilante y espumosa.',
      'La hematemesis es ácida. La hemoptisis, alcalina.',
      'Después de una hematemesis viene la melena. Después de una hemoptisis, no.',
      'Y los antecedentes: digestivos en una, respiratorios en la otra.',
    ],
    refs: [HD('08:10'), HD('08:27'), L('75')],
  },

  /* ──────── Lo que acompaña ──────── */
  {
    id: 't-acompanantes',
    sec: 'acompanan',
    titulo: 'Lo que acompaña al vómito',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Si además tiene', 'Pensar en'],
        filas: [
          ['Dolor en hipocondrio derecho y vómito bilioso', 'Causa **biliar o hepática**: preguntar ictericia, orina y heces'],
          ['Pérdida de peso', '**Cáncer** o síndrome pilórico'],
          ['Vértigo y acúfenos', 'Enfermedad de **Ménière**'],
          ['Cefalea y vómito **en chorro sin náuseas**', '**Hipertensión endocraneana**'],
          ['Fiebre · diarrea', 'Infección · tubo digestivo bajo o cuadro sistémico'],
          ['El vómito **calma** el dolor epigástrico', '**Úlcera**'],
          ['Más de 1,5 litros en 24 horas', 'Causa **orgánica**'],
        ],
      },
    ],
    voz: [
      'Rara vez el paciente consulta solo por vómitos: casi siempre viene con algo más, y eso orienta. Dolor en el hipocondrio derecho con vómito bilioso: pensá en la vía biliar o el hígado.',
      'Pérdida de peso: cáncer, o un síndrome pilórico.',
      'Vértigo y acúfenos: enfermedad de Ménière.',
      'Cefalea con vómitos en chorro, sin náuseas: hipertensión endocraneana.',
      'La fiebre sugiere infección, y la diarrea, el tubo digestivo bajo o un cuadro sistémico.',
      'Si al vomitar se le calma el dolor de estómago, pensá en una úlcera.',
      'Y si vomita más de un litro y medio en veinticuatro horas, la causa es orgánica.',
    ],
    refs: [M2('20:34'), M2('21:14'), M2('21:54'), M2('22:35'), M2('23:03')],
  },
  {
    id: 't-causas',
    sec: 'acompanan',
    titulo: 'El vómito no es solo digestivo',
    bloques: [
      {
        t: 'secuencia',
        items: [
          { ico: 'cerebro', t: 'Sistema nervioso', d: 'hipertensión endocraneana', tono: 'lilac' },
          { ico: 'dolor', t: 'Digestivo', d: 'abdomen agudo, obstrucción', tono: 'rose' },
          { ico: 'fiebre', t: 'Infecciones', d: 'también sistémicas: neumonía', tono: 'peach' },
          { ico: 'lab', t: 'Metabólicas', d: 'y fármacos', tono: 'gold' },
          { ico: 'corazon', t: 'Cardíacas', d: 'y urinarias', tono: 'red' },
          { ico: 'reloj', t: 'Embarazo', d: 'hiperémesis gravídica', tono: 'mint' },
        ],
      },
    ],
    voz: [
      'Y recordá que el vómito aparece en muchísimas enfermedades. Del sistema nervioso, como la hipertensión endocraneana. Digestivas, como cualquier abdomen agudo. Infecciones, incluso fuera del abdomen, como una neumonía. Alteraciones metabólicas y fármacos. Enfermedades cardíacas y urinarias. Y el embarazo.',
    ],
    refs: [M2('25:17'), M2('25:57'), M2('30:40')],
  },

  /* ──────── Complicaciones ──────── */
  {
    id: 't-complicaciones',
    sec: 'complicaciones',
    titulo: 'Complicaciones del vómito',
    amplio: true,
    bloques: [
      {
        t: 'lista',
        items: [
          '**Hipopotasemia** y **alcalosis metabólica**: se pierden potasio y ácido.',
          '**Deshidratación**.',
          '**Neumonitis química → neumonía aspirativa** si aspira el vómito.',
          '**Mallory-Weiss** (desgarro de la mucosa) y **Boerhaave** (rotura del esófago).',
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Las complicaciones del vómito: en clase se avisa que se preguntan.', ref: M2('23:19') },
    voz: [
      'Las complicaciones del vómito se preguntan. La primera, metabólica: hipopotasemia y alcalosis metabólica.',
      'La segunda, la deshidratación.',
      'La tercera, respiratoria: si aspira el vómito, neumonitis química y después neumonía aspirativa.',
      'Y la cuarta, del esófago: el desgarro de Mallory-Weiss y la rotura de Boerhaave.',
    ],
    refs: [M2('23:15'), M2('23:55'), M2('24:31')],
  },
  {
    id: 't-mallory',
    sec: 'complicaciones',
    titulo: 'Síndrome de Mallory-Weiss',
    fig: { f: 'desgarro', vistas: ['mw'] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'secuencia',
        flechas: true,
        items: [
          { ico: 'vaso', t: 'Alcoholismo', tono: 'peach' },
          { ico: 'vomito', t: 'Vómitos', d: 'y arcadas', tono: 'lilac' },
          { ico: 'gota', t: 'Hematemesis', tono: 'red' },
        ],
      },
      { t: 'clave', en: 1, text: 'Desgarro **lineal de la mucosa** de la unión esofagogástrica.' },
      { t: 'texto', en: 1, soloWeb: true, text: 'La tríada es también su **cronología**: toma alcohol, vomita, y al final vomita sangre.' },
    ],
    examen: { origen: 'preguntero', texto: '¿Qué es el síndrome de Mallory-Weiss? Tríada o cronología.', cita: 'Hay una tríada característica… hematemesis, vómito y alcoholismo.', ref: HD('16:48') },
    voz: [
      'El síndrome de Mallory-Weiss tiene una tríada que también es su cronología: un paciente alcohólico, que vomita una y otra vez, y que al final vomita sangre.',
      'La lesión es un desgarro lineal de la mucosa en la unión entre el esófago y el estómago.',
    ],
    refs: [HD('16:48'), HD('17:02'), M2('24:31'), L('390')],
  },
  {
    id: 't-boerhaave',
    sec: 'complicaciones',
    titulo: 'No confundir: Mallory-Weiss y Boerhaave',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Mallory-Weiss', tono: 'rose', items: ['Desgarro de la **mucosa**', 'Sangra hacia la luz: **hematemesis**', 'Paciente alcohólico que vomita'] },
          { titulo: 'Boerhaave', tono: 'red', items: ['Rotura de **todo el espesor**', 'El vómito cae al **mediastino**', 'Mucho más grave'] },
        ],
      },
    ],
    voz: [
      'No los confundas. En el Mallory-Weiss se rompe solo la mucosa y el paciente vomita sangre.',
      'En el Boerhaave se rompe toda la pared del esófago, y el vómito cae al mediastino.',
    ],
    refs: [M2('23:55'), M2('24:31')],
  },

  /* ──────── Cómo se estudia ──────── */
  {
    id: 't-anamnesis',
    sec: 'abordaje',
    titulo: 'Anamnesis del paciente que vomita',
    amplio: true,
    bloques: [
      {
        t: 'lista',
        items: [
          '¿Es **vómito**, regurgitación o rumiación? ¿Lo expulsó?',
          '¿Desde cuándo? **Agudo** menos de 7 días, **crónico** más de 7.',
          '¿Cuánto? Más de 1,5 litros orienta a causa orgánica.',
          '¿Tuvo **náuseas** antes? ¿A qué hora?',
          'Color, sabor, cuántas veces, medicación, síntomas asociados.',
        ],
      },
    ],
    voz: [
      'En la anamnesis, lo primero es confirmar que es un vómito: si el contenido llegó a la boca pero no lo expulsó, es regurgitación o rumiación.',
      'Después, el tiempo: agudo si dura menos de siete días, crónico si dura más.',
      'La cantidad.',
      'Si tuvo náuseas antes, y en qué momento del día vomita.',
      'Y el color, el sabor, cuántas veces, qué medicación toma y qué otros síntomas tiene.',
    ],
    refs: [M2('26:37'), M2('27:17'), M2('27:59')],
  },
  {
    id: 't-examen-fisico',
    sec: 'abordaje',
    titulo: 'Examen físico',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Qué mirar', 'Qué buscás'],
        filas: [
          ['Signos vitales', '**Taquicardia** e **hipotensión** por deshidratación; temperatura'],
          ['Hidratación', 'Turgencia de la piel, mucosas, palidez'],
          ['Inspección', 'Distensión, peristaltismo visible, ictericia'],
          ['Palpación', '**Chapoteo gástrico**: síndrome pilórico · dolor espontáneo: proceso inflamatorio avanzado'],
          ['Neurológico', 'Hipertensión endocraneana: **fondo de ojo** · asterixis · neuropatía autonómica'],
        ],
      },
    ],
    voz: [
      'En el examen físico, empezá por los signos vitales. El paciente que vomita mucho se deshidrata: se pone taquicárdico para compensar, y después hipotenso.',
      'Buscá los signos de deshidratación en la piel y las mucosas.',
      'A la inspección, la distensión, el peristaltismo visible y la ictericia.',
      'A la palpación, el chapoteo gástrico es típico del síndrome pilórico.',
      'Y el examen neurológico, con fondo de ojo, para descartar hipertensión endocraneana.',
    ],
    refs: [M2('27:59'), M2('28:39'), M2('29:19'), M2('30:00')],
  },
  {
    id: 't-laboratorio',
    sec: 'abordaje',
    titulo: 'Laboratorio: CEUCGO y algo más',
    bloques: [
      {
        t: 'secuencia',
        items: [
          { ico: 'lab', t: 'C', d: 'citológico completo', tono: 'sky' },
          { ico: 'lab', t: 'E', d: 'eritrosedimentación', tono: 'sky' },
          { ico: 'lab', t: 'U', d: 'urea', tono: 'sky' },
          { ico: 'lab', t: 'C', d: 'creatinina', tono: 'sky' },
          { ico: 'lab', t: 'G', d: 'glucemia', tono: 'sky' },
          { ico: 'lab', t: 'O', d: 'orina completa', tono: 'sky' },
        ],
      },
      { t: 'clave', en: 1, tono: 'red', text: 'Y siempre **ionograma**: hipopotasemia y alcalosis.' },
      { t: 'texto', en: 2, text: 'Hepatograma y amilasa; en mujeres, **test de embarazo**. Imágenes y endoscopia, según la causa sospechada.' },
    ],
    examen: { origen: 'ortega', texto: 'El ionograma en el paciente que vomita.', cita: '…pero no hay que olvidar nunca el ionograma.', ref: M2('30:46') },
    voz: [
      'En el laboratorio, el profesor usa una regla: CEUCGO. Citológico completo, eritrosedimentación, urea, creatinina, glucemia y orina completa.',
      'Pero hay algo que no se olvida nunca: el ionograma, porque estos pacientes tienden a la hipopotasemia y a la alcalosis metabólica.',
      'Se suma el hepatograma, la amilasa, y en las mujeres un test de embarazo. Las imágenes y la endoscopia dependen de la causa que sospeches.',
    ],
    refs: [M2('30:00'), M2('30:40'), M2('30:46'), M2('31:23')],
  },

  /* ──────── Disfagia ──────── */
  {
    id: 't-disfagia',
    sec: 'disfagia',
    titulo: 'Disfagia: qué es',
    fig: { f: 'deglucion' },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'Dificultad para pasar el alimento **de la boca al estómago**.' },
      { t: 'lista', en: 1, items: ['Dos tramos: de la boca al **esófago superior**, y del esófago al **estómago**.', 'La masticación es **voluntaria**; faringe y esófago, **involuntarios**.'] },
    ],
    voz: [
      'Pasemos a la disfagia. Disfagia es la dificultad para pasar el alimento de la boca al estómago.',
      'Ese camino tiene dos tramos: de la boca a la parte alta del esófago, y del esófago al estómago. La masticación es voluntaria; lo demás, involuntario y comandado por el parasimpático.',
    ],
    refs: [M1('00:49'), M1('01:33'), M1('02:20')],
  },
  {
    id: 't-dos-disfagias',
    sec: 'disfagia',
    titulo: 'Dos disfagias según dónde se traba',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Orofaríngea', tono: 'peach', items: ['También **alta** o **de transferencia**', 'De la boca al esófago superior', 'No puede **iniciar** la deglución'] },
          { titulo: 'Esofágica', tono: 'sky', items: ['También **baja** o **de transporte**', 'Cuerpo del esófago y esfínter inferior', 'Traga bien y **después** se traba'] },
        ],
      },
    ],
    voz: [
      'Según dónde se traba, hay dos disfagias. La orofaríngea, también llamada alta o de transferencia, porque falla el pasaje de la boca a la faringe.',
      'Y la esofágica, baja o de transporte: el paciente traga bien, pero después siente que el alimento se detiene.',
    ],
    refs: [M1('03:00'), M1('10:06'), M1('10:48')],
  },
  {
    id: 't-orofaringea',
    sec: 'disfagia',
    titulo: 'Orofaríngea: cómo se presenta',
    fig: { f: 'deglucion', modo: 'orofaringea' },
    anchoFig: 'media',
    bloques: [
      {
        t: 'lista',
        items: [
          'No puede **iniciar** la deglución; repite el intento.',
          '**Regurgita** enseguida por la boca o la **nariz**.',
          '**Tos** y ahogo por aspiración; **disfonía**.',
          'Puede terminar en **neumonía aspirativa**.',
          'Señala la **garganta**. Cuestan más los **líquidos**.',
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Las características de la disfagia orofaríngea.', cita: 'Esta característica no la pueden… olvidarse, todo está aquí.', ref: M1('04:03') },
    voz: [
      'Estas son las características que el profesor dice que no se pueden olvidar. El paciente no puede iniciar la deglución, y lo intenta una y otra vez.',
      'Regurgita enseguida, por la boca o por la nariz.',
      'Tose, se ahoga, y puede quedar disfónico porque restos de comida caen a la laringe.',
      'Y si llegan al pulmón, una neumonía aspirativa, que es una causa de muerte.',
      'Señala la garganta, y le cuestan más los líquidos.',
    ],
    refs: [M1('03:42'), M1('04:03'), M1('04:24'), M1('05:05'), M1('05:47')],
  },
  {
    id: 't-orofaringea-causas',
    sec: 'disfagia',
    titulo: 'Orofaríngea: causas',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Grupo', 'Causas'],
        filas: [
          ['**Neuromusculares** (≈ 75 %)', '**ACV** (la n.º 1), Parkinson, esclerosis múltiple, ELA, miastenia gravis, miopatía inflamatoria'],
          ['Motoras', 'Disfunción del esfínter esofágico superior: **acalasia cricofaríngea**'],
          ['Estructurales', 'Inflamatorias (tuberculosis, abscesos), neoplasias, radiación, resecciones, compresión extrínseca'],
        ],
      },
    ],
    aclara: { text: 'La acalasia cricofaríngea aparece en mayores de 60 años, a veces diabéticos o tabaquistas: el músculo cricofaríngeo no se relaja.', origen: 'Clase, min 07:22–08:02.' },
    voz: [
      'Las causas. Las más frecuentes, casi tres de cada cuatro, son neuromusculares, y la número uno es el accidente cerebrovascular. Le siguen el Parkinson, la esclerosis múltiple, la esclerosis lateral amiotrófica, la miastenia y las miopatías inflamatorias.',
      'Entre las motoras, la disfunción del esfínter esofágico superior: la acalasia cricofaríngea.',
      'Y las estructurales: inflamaciones, tumores, radiación, cirugías o compresiones desde afuera.',
    ],
    refs: [M1('05:47'), M1('06:30'), M1('07:22'), M1('09:26'), M1('10:06')],
  },
  {
    id: 't-esofagica',
    sec: 'disfagia',
    titulo: 'Esofágica: cómo se presenta',
    fig: { f: 'esofago' },
    anchoFig: 'chica',
    bloques: [
      {
        t: 'lista',
        items: [
          'Aparece **después** de iniciar la deglución.',
          'Atascamiento **retroesternal**, a veces en el epigastrio.',
          '**Sin** tos ni neumonía aspirativa, salvo que el esófago esté lleno.',
          'Dolor torácico, regurgitación tardía, **odinofagia**.',
        ],
      },
    ],
    voz: [
      'La disfagia esofágica es distinta. El paciente pudo tragar, y la molestia aparece después.',
      'Siente que la comida se atasca detrás del esternón, o a veces en la boca del estómago.',
      'No tiene tos ni aspiración, salvo que el esófago esté tan lleno que el contenido suba hasta la laringe.',
      'Y puede tener dolor torácico, regurgitación tardía y odinofagia, que es dolor al tragar.',
    ],
    refs: [M1('10:06'), M1('10:48'), M1('11:28'), M1('12:08')],
  },
  {
    id: 't-mecanica-motora',
    sec: 'disfagia',
    titulo: 'Mecánica o motora',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Mecánica u obstructiva', 'Motora o funcional'],
        filas: [
          ['Alimento', '**Solo sólidos**', '**Sólidos y líquidos**'],
          ['Evolución', 'Continua y **progresiva**', '**Intermitente**, impredecible'],
          ['Qué la alivia', 'Regurgitar', 'Levantar los brazos, inclinarse'],
          ['Mecanismo', 'Un **obstáculo** en la luz', 'Falla del **peristaltismo**'],
        ],
      },
    ],
    voz: [
      'La esofágica se divide según el mecanismo. La mecánica es solo para sólidos. La motora, para sólidos y líquidos.',
      'La mecánica es continua y progresiva. La motora es intermitente: hay momentos en que está bien y momentos en que no.',
      'En la mecánica, lo único que alivia es regurgitar. En la motora, el paciente levanta los brazos o se inclina para que el bolo pase.',
      'Y el mecanismo: un obstáculo en la luz, o un esófago que no se contrae.',
    ],
    refs: [M1('12:48'), M1('13:28'), M1('14:08')],
  },
  {
    id: 't-causas-esofagicas',
    sec: 'disfagia',
    titulo: 'Esofágica: causas',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Tipo', 'Causas'],
        filas: [
          ['**Motoras**', '**Acalasia**, espasmo esofágico difuso, esclerodermia'],
          ['Mecánica **extrínseca**', 'Tumores del mediastino (los más frecuentes), aurícula izquierda dilatada, divertículo de Zenker, bocio'],
          ['Mecánica **intrínseca**', '**Estenosis péptica** (la más frecuente, por reflujo), cáncer de esófago, anillo de Schatzki, membrana de Plummer-Vinson, esofagitis'],
        ],
      },
    ],
    aclara: { text: 'La **estenosis péptica** es la causa más frecuente de disfagia mecánica: el reflujo crónico inflama el esófago y lo cicatriza.', origen: 'Clase, min 16:08.' },
    voz: [
      'Las causas motoras son la acalasia, el espasmo esofágico difuso y la esclerodermia.',
      'Las mecánicas pueden ser extrínsecas, algo que comprime desde afuera, como un tumor del mediastino o una aurícula izquierda dilatada.',
      'O intrínsecas, de la propia pared. La más frecuente es la estenosis péptica, por reflujo. Después, el cáncer de esófago, el anillo de Schatzki y la membrana de Plummer-Vinson.',
    ],
    refs: [M1('14:48'), M1('15:28'), M1('16:08'), M1('16:48')],
  },

  /* ──────── Diagnóstico de la disfagia ──────── */
  {
    id: 't-diferencial',
    sec: 'diag-disfagia',
    titulo: 'Lo que no es disfagia',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Odinofagia', tono: 'rose', items: ['**Dolor** al tragar', 'Procesos inflamatorios: faringoamigdalitis', 'También causas digestivas'] },
          { titulo: 'Globo histérico', tono: 'lilac', items: ['Sensación de **algo en la garganta**', '**Sin relación** con la ingesta', 'Pacientes ansiosos'] },
        ],
      },
    ],
    voz: [
      'Antes de seguir, el diagnóstico diferencial. La odinofagia es dolor al tragar, y casi siempre se debe a un proceso inflamatorio, como una faringoamigdalitis.',
      'El globo histérico es la sensación de tener algo en la garganta, que no tiene relación con la comida. Aparece en pacientes ansiosos.',
    ],
    refs: [M1('16:48'), M1('17:28')],
  },
  {
    id: 't-preguntas',
    sec: 'diag-disfagia',
    titulo: 'El diagnóstico es clínico',
    amplio: true,
    bloques: [
      {
        t: 'secuencia',
        flechas: true,
        items: [
          { ico: 'mano', t: '¿Dónde?', d: 'garganta o detrás del esternón', tono: 'peach' },
          { ico: 'pregunta', t: '¿Con qué?', d: 'sólidos o también líquidos', tono: 'sky' },
          { ico: 'reloj', t: '¿Cómo evoluciona?', d: 'intermitente o progresiva', tono: 'lilac' },
          { ico: 'cerebro', t: '¿Empezó brusco?', d: 'ACV', tono: 'rose' },
        ],
      },
      { t: 'texto', en: 3, text: 'Síntomas asociados: **pirosis** → estenosis péptica · **pérdida de peso** → cáncer · antiácidos crónicos → esofagitis.' },
    ],
    voz: [
      'El diagnóstico es clínico, y sale de unas pocas preguntas. Primero, dónde siente la molestia: en la garganta, o detrás del esternón.',
      'Segundo, con qué alimento: solo sólidos, o también líquidos.',
      'Tercero, cómo evoluciona: intermitente o progresiva.',
      'Cuarto, si empezó de golpe, como en un accidente cerebrovascular. Y los síntomas asociados: la pirosis orienta a estenosis péptica, y la pérdida de peso, a cáncer.',
    ],
    refs: [M1('18:10'), M1('18:50'), M1('20:10'), M1('20:50')],
  },
  {
    id: 't-acalasia',
    sec: 'diag-disfagia',
    titulo: 'La que siempre preguntan',
    fig: { f: 'esofago', modo: 'acalasia' },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'Disfagia **intermitente** y **lentamente progresiva** para **sólidos y líquidos**, con regurgitación.' },
      { t: 'texto', en: 1, text: 'Es un trastorno **funcional**: **acalasia**.' },
    ],
    examen: { origen: 'ortega', texto: 'Disfagia intermitente y lentamente progresiva para sólidos y líquidos.', cita: 'Lo que siempre suelen preguntar es este que voy a marcar aquí.', ref: M1('21:38') },
    voz: [
      'Y acá está lo que, según el profesor, siempre suelen preguntar: una disfagia intermitente y lentamente progresiva, para sólidos y líquidos, con regurgitación.',
      'Es un trastorno funcional: una acalasia.',
    ],
    refs: [M1('21:30'), M1('21:38'), L('369')],
  },
  {
    id: 't-examen-disfagia',
    sec: 'diag-disfagia',
    titulo: 'Examen físico en la disfagia',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Hallazgo', 'Orienta a'],
        filas: [
          ['Signos neurológicos focales', '**ACV**'],
          ['Signos extrapiramidales', 'Parkinson'],
          ['Debilidad muscular que se fatiga', 'Miastenia gravis'],
          ['Bocio, reflejos lentos', 'Hipotiroidismo'],
          ['Adenopatía **supraclavicular** (Virchow)', '**Cáncer**'],
          ['Esclerodactilia, telangiectasias', 'Esclerodermia'],
          ['Candidiasis oral', 'Esofagitis por cándida'],
        ],
      },
    ],
    voz: [
      'En el examen físico, buscá signos neurológicos de un accidente cerebrovascular, y signos extrapiramidales de Parkinson.',
      'Una debilidad muscular que se fatiga hace pensar en miastenia.',
      'El bocio y los reflejos lentos, en hipotiroidismo.',
      'Una adenopatía supraclavicular, el ganglio de Virchow, en un cáncer.',
      'La esclerodactilia y las telangiectasias, en esclerodermia.',
      'Y la candidiasis oral.',
    ],
    refs: [M1('21:30'), M1('22:10')],
  },
  {
    id: 't-estudios-disfagia',
    sec: 'diag-disfagia',
    titulo: 'Qué estudio pedir',
    fig: { f: 'esofago', modo: 'rx' },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Orofaríngea', tono: 'peach', text: 'Mirar la garganta con linterna y bajalenguas; si no alcanza, **endoscopia** alta.' },
      { t: 'def', term: 'Esofágica', tono: 'sky', en: 1, text: '**Manometría** (tono de los esfínteres) y **esofagograma** con bario: acalasia, **pico de pájaro**.' },
      { t: 'def', term: 'Sospecha de cáncer', tono: 'red', en: 2, text: 'Más de 50 años, pérdida de peso: **manzana mordida** → **endoscopia con biopsia**.' },
    ],
    voz: [
      'Los estudios dependen de dónde está el problema. En la orofaríngea, primero mirar la garganta. Si no alcanza, una endoscopia alta.',
      'En la esofágica, la manometría mide el tono de los esfínteres, y el esofagograma con bario muestra en la acalasia un esófago dilatado que termina en pico de pájaro.',
      'Y si el paciente tiene más de cincuenta años y pierde peso, el esofagograma puede mostrar la imagen en manzana mordida. Ahí se hace una endoscopia con biopsia.',
    ],
    refs: [M1('22:50'), M1('23:30'), M1('24:10'), M1('24:50'), M1('25:31')],
  },
  {
    id: 't-algoritmo',
    sec: 'diag-disfagia',
    titulo: 'La disfagia esofágica en un árbol',
    bloques: [
      {
        t: 'arbol',
        raiz: {
          t: 'Disfagia esofágica',
          tono: 'sky',
          hijos: [
            {
              t: 'Solo sólidos',
              d: 'obstructiva',
              tono: 'peach',
              hijos: [
                { t: 'Intermitente', d: 'anillo inferior', tono: 'peach' },
                { t: 'Progresiva', d: '> 50 años y pérdida de peso: cáncer · pirosis: estenosis péptica', tono: 'red' },
              ],
            },
            {
              t: 'Sólidos y líquidos',
              d: 'neuromuscular',
              tono: 'lilac',
              hijos: [
                { t: 'Progresiva', d: 'regurgitación: acalasia · pirosis: esclerodermia', tono: 'lilac', examen: true },
                { t: 'Intermitente', d: 'dolor torácico: espasmo', tono: 'lilac' },
              ],
            },
          ],
        },
      },
    ],
    voz: [
      'Todo junto, en un árbol. Si la disfagia es solo para sólidos, es obstructiva: intermitente, pensá en un anillo; progresiva, en un cáncer si tiene más de cincuenta años y pierde peso, o en una estenosis péptica si tiene pirosis. Si es para sólidos y líquidos, es neuromuscular: progresiva con regurgitación, acalasia; intermitente con dolor torácico, espasmo esofágico.',
    ],
    refs: [M1('25:31'), M1('26:11'), M1('26:51')],
  },

  /* ──────── Dispepsia ──────── */
  {
    id: 't-dispepsia',
    sec: 'dispepsia',
    titulo: 'Dispepsia: el dolor de la boca del estómago',
    fig: { f: 'tracto', vistas: [{ luz: { estomago: 'lilac', duodeno: 'lilac' } }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', tono: 'lilac', text: 'Dolor o malestar del **abdomen superior**: siempre **del ombligo para arriba**.' },
      { t: 'lista', en: 1, items: ['Agudo o crónico, intermitente o continuo.', 'Distensión, gases, eructos, pirosis, náuseas.'] },
      { t: 'prof', en: 1, text: '«…se van a topar con dispepsia o indigestión toda su vida.»', ref: M1('27:26') },
    ],
    voz: [
      'Y llegamos a la dispepsia, el famoso dolor de la boca del estómago. Es un dolor o malestar del abdomen superior: siempre del ombligo para arriba.',
      'Puede ser agudo o crónico, intermitente o continuo, y se acompaña de distensión, gases, eructos, pirosis o náuseas. El profesor lo dice claro: te vas a topar con la dispepsia toda tu vida.',
    ],
    refs: [M1('27:26'), M1('27:32'), M1('28:12')],
  },
  {
    id: 't-roma-sindromes',
    sec: 'dispepsia',
    titulo: 'Los cuatro síntomas: dos síndromes',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Distrés posprandial', tono: 'lilac', items: ['**Plenitud posprandial**: se siente lleno, le cae mal', '**Saciedad precoz**: no puede seguir comiendo'] },
          { titulo: 'Dolor epigástrico', tono: 'rose', items: ['**Dolor o ardor** intermitente', 'Localizado en el epigastrio, al menos **una vez por semana**', 'No calma al defecar; no es vesicular ni del esfínter de Oddi'] },
        ],
      },
    ],
    voz: [
      'Los criterios de Roma reconocen cuatro síntomas, agrupados en dos síndromes. El de distrés posprandial: plenitud después de comer, y saciedad precoz, cuando el paciente no puede seguir comiendo.',
      'Y el de dolor epigástrico: dolor o ardor intermitente, localizado en el epigastrio, al menos una vez por semana, que no se alivia al defecar y que no corresponde a la vesícula.',
    ],
    refs: [M1('28:12'), M1('28:52'), M1('29:32'), M1('30:12'), A('643')],
  },
  {
    id: 't-roma',
    sec: 'dispepsia',
    titulo: 'Criterios de Roma III',
    amplio: true,
    bloques: [
      {
        t: 'lista',
        items: [
          'Uno o más: **plenitud posprandial**, **saciedad precoz**, **dolor** o **ardor** epigástrico.',
          'Durante los últimos **3 meses**, con inicio al menos **6 meses** antes.',
          '**Sin lesión estructural** que lo explique: endoscopia si hace falta.',
        ],
      },
      { t: 'prof', en: 1, text: '«Noventa días de dolor en seis meses, aproximadamente.»', ref: M1('34:14') },
    ],
    aclara: { text: 'Los criterios de Roma vuelven en **intestino irritable** y en **constipación**.', origen: 'Clase, min 33:34.' },
    voz: [
      'Para hablar de dispepsia funcional se usan los criterios de Roma tres. Uno o más de esos cuatro síntomas.',
      'Durante los últimos tres meses, con un inicio de al menos seis meses antes. El profesor lo resume como noventa días de dolor en seis meses.',
      'Y sin ninguna lesión estructural que lo explique, con una endoscopia si hace falta.',
    ],
    refs: [M1('33:34'), M1('34:14'), M1('34:54')],
  },
  {
    id: 't-funcional-organica',
    sec: 'dispepsia',
    titulo: 'Funcional u orgánica',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Funcional: 60 %', tono: 'lilac', items: ['También **esencial** o **no ulcerosa**', 'Diagnóstico **por exclusión**', 'Estrés, nervios: «gastritis por estrés»'] },
          { titulo: 'Orgánica: 40 %', tono: 'rose', items: ['**Úlcera péptica** (la n.º 1)', 'Reflujo gastroesofágico, **cáncer gástrico**', 'Fármacos (AINE, antibióticos), diabetes, vía biliar, páncreas'] },
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'La más frecuente es la funcional; entre las orgánicas, la úlcera.', cita: 'La número 1, la que no deben olvidarse, es la úlcera péptica.', ref: M1('31:46') },
    voz: [
      'Por su causa, la dispepsia es funcional o orgánica. La más frecuente, la número uno, es la funcional, también llamada esencial o no ulcerosa: seis de cada diez. Es un diagnóstico por exclusión, y muchas veces se debe al estrés.',
      'La orgánica es el cuarenta por ciento, y la causa número uno, que no hay que olvidar, es la úlcera péptica. Le siguen el reflujo y el cáncer gástrico, y también los fármacos, la diabetes, la vía biliar y el páncreas.',
    ],
    refs: [M1('30:52'), M1('31:12'), M1('31:46'), M1('32:14'), M1('32:54'), M2('00:01')],
  },
  {
    id: 't-funcional-tipos',
    sec: 'dispepsia',
    titulo: 'Tres formas de dispepsia funcional',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Tipo', 'Cómo se presenta'],
        filas: [
          ['Por **reflujo**', 'Acidez, regurgitación ácida, **pirosis**'],
          ['Tipo **ulceroso**', 'Dolor que **calma con antiácidos** y a veces con la comida; puede **despertarlo** de noche'],
          ['Trastorno de la **motilidad**', 'Retorcijones, saciedad, distensión; **empeora al comer**'],
        ],
      },
    ],
    voz: [
      'La dispepsia funcional se presenta de tres maneras. Por reflujo, con acidez, regurgitación ácida y pirosis.',
      'De tipo ulceroso, con un dolor que calma con los antiácidos y a veces con la comida, y que puede despertar al paciente de noche.',
      'Y por trastorno de la motilidad, con retorcijones que empeoran al comer, porque la comida estimula el peristaltismo.',
    ],
    refs: [M2('00:42'), M2('01:22'), M2('02:04'), A('644')],
  },
  {
    id: 't-clinica',
    sec: 'dispepsia',
    titulo: 'Clínica: las dos D y la P',
    amplio: true,
    bloques: [
      {
        t: 'secuencia',
        items: [
          { ico: 'dolor', t: 'Dolor', d: 'epigástrico, con o sin comida', tono: 'rose' },
          { ico: 'aire', t: 'Distensión', d: 'abdominal alta, flatulencia', tono: 'lilac' },
          { ico: 'fuego', t: 'Pirosis', d: 'con regurgitación', tono: 'peach' },
        ],
      },
      { t: 'prof', en: 1, text: '«Siempre digo las dos D y la P.»', ref: M2('07:28') },
      { t: 'texto', en: 2, text: 'Puede sumar eructos, gases, náuseas y vómitos, tanto en la funcional como en la orgánica.' },
    ],
    voz: [
      'Para la clínica, el profesor usa una regla. La primera D es el dolor epigástrico, después de comer o sin haber comido.',
      'La segunda D, la distensión: el paciente está hinchado, con gases.',
      'Y la P, la pirosis, con regurgitación. Esto lo puede tener tanto una dispepsia funcional como una orgánica.',
    ],
    refs: [M2('07:28'), M2('07:34'), M2('08:14')],
  },
  {
    id: 't-alarma',
    sec: 'dispepsia',
    titulo: 'Signos de alarma: pensar en orgánica',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Signo de alarma', 'Pensar en'],
        filas: [
          ['Más de 50–55 años con pérdida de peso', '**Cáncer**'],
          ['Hematemesis', '**Úlcera**'],
          ['Vómitos persistentes', '**Síndrome pilórico**'],
          ['Disfagia u odinofagia progresiva', 'Cáncer de esófago o de estómago'],
          ['Ictericia', 'Vía biliar, páncreas o hígado'],
          ['Anemia', 'Cáncer gástrico'],
          ['AINE, fracasos terapéuticos, cáncer familiar, cirugía gástrica', 'Úlcera, organicidad'],
        ],
      },
    ],
    aclara: { text: 'La anemia del cáncer gástrico suele ser **ferropénica** por sangrado crónico. La anemia perniciosa (falta de factor intrínseco y de vitamina B12) se debe a una gastritis atrófica autoinmune, que a su vez aumenta el riesgo de cáncer.', origen: GRAL },
    voz: [
      'Pero ojo con los signos de alarma, porque orientan a una causa orgánica. Un paciente de más de cincuenta o cincuenta y cinco años que pierde peso: cáncer.',
      'Hematemesis: úlcera.',
      'Vómitos persistentes: síndrome pilórico.',
      'Disfagia u odinofagia progresiva: cáncer de esófago o de estómago.',
      'Ictericia: vía biliar, páncreas o hígado.',
      'Anemia: cáncer gástrico.',
      'Y el uso de antiinflamatorios, los tratamientos que fracasaron, el cáncer en la familia o una cirugía gástrica previa.',
    ],
    refs: [M2('08:14'), M2('08:54'), M2('09:34'), M2('10:14'), A('644')],
  },
  {
    id: 't-conducta',
    sec: 'dispepsia',
    titulo: 'Qué hacer con una dispepsia',
    bloques: [
      {
        t: 'arbol',
        raiz: {
          t: 'Dispepsia sin reflujo ni AINE',
          tono: 'lilac',
          hijos: [
            { t: 'Más de 55 años o alarma', d: 'endoscopia digestiva alta con biopsia', tono: 'red', examen: true },
            {
              t: '55 o menos, sin alarma',
              d: 'prueba para H. pylori (ureasa)',
              tono: 'mint',
              hijos: [
                { t: 'Positiva', d: 'tratar H. pylori: OCA', tono: 'mint' },
                { t: 'Negativa', d: 'IBP 4 a 6 semanas', tono: 'sky' },
              ],
            },
          ],
        },
      },
      { t: 'texto', en: 1, text: 'Si el tratamiento fracasa: revaluar el diagnóstico y considerar la **endoscopia**.' },
    ],
    aclara: { text: '**OCA:** omeprazol, claritromicina y amoxicilina.', origen: 'Clase, min 12:14.' },
    voz: [
      'Y la conducta. Si el paciente tiene más de cincuenta y cinco años o algún signo de alarma, se hace una endoscopia digestiva alta con biopsia. Si tiene menos y no hay alarma, se busca el Helicobacter pylori, por ejemplo con la prueba de la ureasa: si es positiva, se trata; si es negativa, inhibidores de la bomba de protones por cuatro a seis semanas.',
      'Y si el tratamiento fracasa, se revalúa el diagnóstico y se considera la endoscopia. Con esto tenés el capítulo completo. Ahora a practicar.',
    ],
    refs: [M2('10:14'), M2('10:54'), M2('11:34'), M2('12:14'), A('644')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'vomito', label: 'Vómito y náusea' },
    { id: 'tipos', label: 'Tipos de vómito' },
    { id: 'hematemesis', label: 'Hematemesis' },
    { id: 'acompanan', label: 'Lo que acompaña' },
    { id: 'complicaciones', label: 'Complicaciones' },
    { id: 'abordaje', label: 'Cómo se estudia' },
    { id: 'disfagia', label: 'Disfagia' },
    { id: 'diag-disfagia', label: 'Diagnóstico de la disfagia' },
    { id: 'dispepsia', label: 'Dispepsia' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS (simulacro) ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'practica',
    titulo: 'Mujer de 26 años',
    texto: 'Consulta porque hace dos semanas vomita todas las mañanas, en ayunas. No tiene dolor ni fiebre. Niega tomar alcohol y no tiene cefalea.',
    pregunta: '¿Qué estudio no puede faltar primero?',
    opciones: [
      { text: 'Test de embarazo.', why: 'El vómito matinal en ayunas obliga a pensar primero en embarazo.' },
      { text: 'Endoscopia digestiva alta.', why: 'No hay signos de alarma ni orientación a estómago.' },
      { text: 'Tomografía de cerebro.', why: 'Sin cefalea ni vómito en chorro, la hipertensión endocraneana es menos probable.' },
      { text: 'Esofagograma.', why: 'No hay disfagia.' },
    ],
    correcta: 0,
    razonamiento: 'Vómito matinal: embarazo, alcohol la noche anterior o hipertensión endocraneana. Descartados el alcohol y la cefalea, primero el test de embarazo.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Hombre de 45 años, bebedor',
    texto: 'Después de una noche de alcohol, vomitó muchas veces. En el último vómito aparece sangre roja. Está hemodinámicamente estable.',
    pregunta: '¿Qué lesión sospechás?',
    opciones: [
      { text: 'Desgarro lineal de la mucosa de la unión esofagogástrica.', why: 'Es el síndrome de Mallory-Weiss: alcoholismo, vómitos y hematemesis.' },
      { text: 'Rotura de todo el espesor del esófago.', why: 'Eso es Boerhaave: el contenido va al mediastino y el cuadro es mucho más grave.' },
      { text: 'Hemoptisis por neumonía aspirativa.', why: 'La sangre salió con el vómito, no con la tos.' },
      { text: 'Úlcera duodenal perforada.', why: 'Daría un abdomen agudo perforativo, no esta secuencia.' },
    ],
    correcta: 0,
    razonamiento: 'La tríada de Mallory-Weiss es también su cronología: alcohol, vómitos repetidos y al final hematemesis.',
  },
  {
    id: 'c3',
    origen: 'clase',
    titulo: 'Hombre de 42 años con Chagas',
    texto: 'No fuma ni toma. Refiere que la comida se le traba detrás del esternón, tanto sólidos como líquidos, con días mejores y peores. Tiene diagnóstico de enfermedad de Chagas.',
    pregunta: '¿Qué imagen esperás en el esofagograma?',
    opciones: [
      { text: 'Esófago dilatado que termina en pico de pájaro.', why: 'Es la acalasia: aperistalsis y esfínter inferior que no se relaja.' },
      { text: 'Imagen en manzana mordida.', why: 'Corresponde al cáncer de esófago.' },
      { text: 'Esófago normal.', why: 'La disfagia motora de larga evolución dilata el esófago.' },
      { text: 'Membrana en el esófago superior.', why: 'Es el síndrome de Plummer-Vinson.' },
    ],
    correcta: 0,
    razonamiento: 'Disfagia esofágica para sólidos y líquidos, intermitente, en un paciente con Chagas: acalasia secundaria. Se confirma con manometría y esofagograma.',
    refs: [M1('23:30'), M1('24:10'), M1('24:50')],
  },
  {
    id: 'c4',
    origen: 'practica',
    titulo: 'Hombre de 63 años',
    texto: 'Desde hace tres meses le cuesta tragar la carne y el pan; ahora también el arroz. Los líquidos pasan bien. Perdió 8 kg.',
    pregunta: '¿Qué hacés?',
    opciones: [
      { text: 'Endoscopia digestiva alta con biopsia.', why: 'Disfagia mecánica progresiva con pérdida de peso en mayor de 50: hay que descartar cáncer.' },
      { text: 'Manometría.', why: 'Sirve para trastornos motores; esta disfagia es solo para sólidos.' },
      { text: 'Prueba para Helicobacter pylori.', why: 'Es la conducta en dispepsia sin alarma, no en disfagia progresiva.' },
      { text: 'Inhibidores de la bomba de protones y control.', why: 'Hay signos de alarma: no se puede esperar.' },
    ],
    correcta: 0,
    razonamiento: 'Solo sólidos y progresiva: mecánica. Más de 50 años y pérdida de peso: cáncer hasta que se demuestre lo contrario.',
  },
  {
    id: 'c5',
    origen: 'clase',
    titulo: 'Estudiante antes de un final',
    texto: 'Le duele la boca del estómago cada vez que tiene que rendir, haya comido o no. Los estudios previos fueron normales y no tiene signos de alarma.',
    pregunta: '¿Cómo la clasificás?',
    opciones: [
      { text: 'Dispepsia funcional.', why: 'Descartada la causa orgánica, el estrés actúa desde el sistema nervioso central.' },
      { text: 'Dispepsia orgánica por úlcera.', why: 'No hay datos de úlcera y los estudios fueron normales.' },
      { text: 'Disfagia esofágica.', why: 'No tiene dificultad para tragar.' },
      { text: 'Abdomen agudo.', why: 'Es un cuadro recurrente y sin signos de gravedad.' },
    ],
    correcta: 0,
    razonamiento: 'La dispepsia funcional es la más frecuente y se diagnostica por exclusión. El ejemplo del final es el que usa el profesor.',
    refs: [M2('00:01'), M2('00:42')],
  },
  {
    id: 'c6',
    origen: 'practica',
    titulo: 'Mujer de 34 años con dispepsia',
    texto: 'Plenitud posprandial y ardor epigástrico desde hace cuatro meses. No toma antiinflamatorios, no perdió peso, no tiene anemia ni vómitos.',
    pregunta: '¿Cuál es el siguiente paso?',
    opciones: [
      { text: 'Prueba para Helicobacter pylori.', why: 'Menor de 55 años sin signos de alarma.' },
      { text: 'Endoscopia digestiva alta de entrada.', why: 'Se reserva para mayores de 55 o con alarma.' },
      { text: 'Tomografía de abdomen.', why: 'No está indicada.' },
      { text: 'Esofagograma.', why: 'No hay disfagia.' },
    ],
    correcta: 0,
    razonamiento: 'Sin alarma y menor de 55: prueba para H. pylori. Si es positiva se trata; si es negativa, IBP por 4 a 6 semanas.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'vom',
        label: 'Vómito',
        tone: 'sky',
        nota: 'Reflejo bulbar: centro del vómito y zona gatillo',
        hijos: [
          { id: 'cont', label: 'Por contenido', tone: 'peach', examen: true, nota: 'Alimenticio: esófago · digerido: estómago · bilioso · hemático · fecaloide: obstrucción baja' },
          { id: 'hor', label: 'Por horario', tone: 'lilac', nota: 'Matinal: embarazo, alcohol, HTE · varias horas: píloro · nocturno: orgánico' },
          { id: 'hem', label: 'Hematemesis', tone: 'red', examen: true, nota: 'Frente a hemoptisis: vómito, ácida, borra de café, melena' },
          {
            id: 'comp',
            label: 'Complicaciones',
            tone: 'rose',
            examen: true,
            nota: 'Alcalosis, hipopotasemia, deshidratación, aspiración',
            hijos: [
              { id: 'mw', label: 'Mallory-Weiss', tone: 'rose', examen: true, nota: 'Alcohol → vómitos → hematemesis · mucosa' },
              { id: 'bo', label: 'Boerhaave', tone: 'red', nota: 'Todo el espesor · mediastino' },
            ],
          },
        ],
      },
      {
        id: 'dis',
        label: 'Disfagia',
        tone: 'rose',
        nota: 'Dificultad para llevar el alimento de la boca al estómago',
        hijos: [
          { id: 'oro', label: 'Orofaríngea', tone: 'peach', examen: true, nota: 'Alta, de transferencia · no inicia, tos, nariz · ACV n.º 1' },
          {
            id: 'eso',
            label: 'Esofágica',
            tone: 'sky',
            nota: 'Baja, de transporte · retroesternal',
            hijos: [
              { id: 'mec', label: 'Mecánica', tone: 'peach', nota: 'Solo sólidos, progresiva · estenosis péptica n.º 1, cáncer' },
              { id: 'mot', label: 'Motora', tone: 'lilac', examen: true, nota: 'Sólidos y líquidos, intermitente · **acalasia**' },
            ],
          },
        ],
      },
      {
        id: 'dsp',
        label: 'Dispepsia',
        tone: 'lilac',
        nota: 'Abdomen superior · Roma: 3 meses, inicio 6 meses antes',
        hijos: [
          { id: 'fun', label: 'Funcional', n: '60 %', tone: 'lilac', examen: true, nota: 'Por exclusión · acomodación, vaciamiento, hipersensibilidad, estrés' },
          { id: 'org', label: 'Orgánica', n: '40 %', tone: 'rose', examen: true, nota: 'Úlcera péptica n.º 1 · reflujo · cáncer gástrico' },
          { id: 'ala', label: 'Signos de alarma', tone: 'red', nota: 'Endoscopia digestiva alta' },
        ],
      },
    ],
    nexos: ['**Vómito en chorro sin náuseas** y cefalea: hipertensión endocraneana.', '**Las dos D y la P** de la dispepsia: dolor epigástrico, distensión, pirosis.'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  repaso: { ...repasoPrevio, duration: '6:18' },
  casos,
  simulacroDesarrollos: ['dig01-d01', 'dig01-d03', 'dig01-d05'],
  anclas: {
    ubicate: { tab: 'mapa' },
    vomito: { tab: 'teoria', seccion: 'vomito' },
    'tipos-vomito': { tab: 'teoria', seccion: 'tipos' },
    'hematemesis-hemoptisis': { tab: 'teoria', seccion: 'hematemesis' },
    complicaciones: { tab: 'teoria', seccion: 'complicaciones' },
    laboratorio: { tab: 'teoria', seccion: 'abordaje' },
    disfagia: { tab: 'teoria', seccion: 'disfagia' },
    dispepsia: { tab: 'teoria', seccion: 'dispepsia' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    maniobras: { tab: 'maniobras' },
    integracion: { tab: 'cierre' },
  },
};
