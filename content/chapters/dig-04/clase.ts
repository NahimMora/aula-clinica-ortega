import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * dig-04: clase visual. No hay una clase grabada de ictericia: el profesor remite a su apunte de motivos de consulta
 * (libro p. 10–15, escrito por el propio Dr. Ortega) y avisa en MC Digestivo 6 (16:13–16:57) que se pregunta mucho.
 * Jerarquía aplicada:
 *  1. Lo que dice el profesor en clase sobre ictericia: MC6 (aviso), Síndromes vesiculares (síndrome coledociano),
 *     Examen físico digestivo 1 (hábito de Chvostek con ictericia).
 *  2. Su apunte (libro p. 10–15): es el contenido al que él mismo manda.
 *  3. Preguntero: bloque «MC ictericia» (P1–P8).
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const M6 = (t: string) => r('mc-dig-6', t);
const VE = (t: string) => r('vesic', t);
const EF1 = (t: string) => r('ef-dig-1', t);
const L = (p: string) => r('libro', undefined, p);

const GRAL = 'Fisiología general, no se da en la clase.';
const APUNTE = 'Apunte del profesor (libro de Clínica Médica)';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-circuito',
    sec: 'circuito',
    titulo: 'El circuito de la bilirrubina',
    etapas: ['normal'],
    fig: { f: 'bilirrubina', modo: 'normal' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'lista',
        items: [
          'Los glóbulos rojos se destruyen: sale **bilirrubina indirecta**, unida a la **albúmina**.',
          'El hepatocito la **capta**, la **conjuga** con ácido glucurónico y la **excreta**: **directa**.',
          'En el intestino, las bacterias la convierten en **estercobilina**: el color de las heces.',
          'Una parte vuelve al hígado; una pequeña parte (**urobilinógeno**) sale por la orina.',
        ],
      },
    ],
    voz: [
      'Para entender la ictericia hay que seguir a la bilirrubina. Cuando se destruyen los glóbulos rojos, la hemoglobina se transforma en bilirrubina indirecta, que viaja en la sangre pegada a la albúmina.',
      'El hepatocito la capta, la conjuga con ácido glucurónico y la excreta a la bilis. Ahora es bilirrubina directa.',
      'En el intestino, las bacterias la transforman, y lo que resulta, la estercobilina, le da el color a la materia fecal.',
      'Una parte se reabsorbe y vuelve al hígado, y una pequeña parte, el urobilinógeno, se elimina por la orina.',
    ],
    refs: [L('10')],
  },
  {
    id: 'f-coluria',
    sec: 'circuito',
    titulo: 'Por qué solo la directa da coluria',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'bilirrubina', modo: 'hepatica' },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Indirecta', tono: 'gold', text: 'Liposoluble y **firmemente unida a la albúmina**: no se filtra. Nunca da coluria.' },
      { t: 'def', term: 'Directa', tono: 'mint', en: 1, text: '**Hidrosoluble**: se filtra en el glomérulo. Si sube, la orina se pone color caoba: **coluria**.' },
    ],
    voz: [
      'Por qué la orina oscura es un dato tan importante. La bilirrubina indirecta viaja pegada a la albúmina, que es una proteína grande: no pasa por el glomérulo. Por más alta que esté, la orina no se oscurece.',
      'La directa, en cambio, es hidrosoluble y se filtra libremente. Cuando sube en la sangre, aparece en la orina, que se pone color caoba. Eso es la coluria.',
    ],
    refs: [L('10'), L('12')],
  },
  {
    id: 'f-escleras',
    sec: 'circuito',
    titulo: 'Dónde se ve primero',
    etapas: ['signo'],
    amplio: true,
    bloques: [
      { t: 'clave', text: 'La bilirrubina se deposita en los tejidos **más perfundidos** y con **más fibras elásticas**.' },
      { t: 'lista', en: 1, items: ['**Esclerótica** y conjuntiva.', 'Mucosa oral: **paladar blando** y **frenillo** de la lengua.', 'Siempre con **luz natural**.'] },
    ],
    voz: [
      'La bilirrubina se deposita primero en los tejidos más perfundidos y con más fibras elásticas.',
      'Por eso se busca en la esclerótica, la conjuntiva, el paladar blando y el frenillo de la lengua. Y siempre con luz natural, porque la luz artificial lo disimula.',
    ],
    refs: [L('12')],
  },
  {
    id: 'f-pre',
    sec: 'tipos',
    titulo: 'Prehepática: sobra bilirrubina',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'bilirrubina', modo: 'pre' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: '**Hemólisis**: se destruyen más glóbulos rojos.' },
          { k: 'mecanismo', text: 'Llega más indirecta de la que el hígado alcanza a conjugar; lo que conjuga, lo excreta.' },
          { k: 'signo', text: '**Indirecta** alta, orina parda **sin coluria**, heces **hipercólicas**, tinte **flavínico**, anemia.' },
        ],
      },
    ],
    aclara: { text: 'Las heces son más oscuras porque llega **más** bilirrubina al intestino; y la orina se oscurece por el urobilinógeno, no por bilirrubina.', origen: `${APUNTE}, p. 12 y 15.` },
    voz: [
      'Ahora, dónde se rompe el circuito. En la prehepática, el problema es que se destruyen demasiados glóbulos rojos.',
      'Llega al hígado más bilirrubina indirecta de la que puede conjugar. Pero lo que conjuga, lo excreta sin problema.',
      'Entonces sube la indirecta, no hay coluria, las heces son más oscuras porque llega más bilirrubina al intestino, el tinte es amarillo pálido, y el paciente está anémico.',
    ],
    refs: [L('11'), L('12'), L('15')],
  },
  {
    id: 'f-hepatica',
    sec: 'tipos',
    titulo: 'Hepática: falla el hepatocito',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'bilirrubina', modo: 'hepatica' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Hepatitis, cirrosis, fármacos; o un defecto en un paso: **captación**, **conjugación** o **excreción**.' },
          { k: 'mecanismo', text: 'Si falla antes de conjugar, sube la **indirecta**; si falla la excreción, la **directa** vuelve a la sangre.' },
          { k: 'signo', text: 'Coluria cuando sube la directa; heces **normocólicas**; tinte **rubínico**.' },
        ],
      },
    ],
    voz: [
      'En la hepática, el que falla es el hepatocito: por una hepatitis, una cirrosis, un fármaco, o por un defecto en alguno de sus tres pasos.',
      'Si falla la captación o la conjugación, sube la indirecta. Si falla la excreción, la directa que ya se formó vuelve a la sangre.',
      'Por eso puede subir cualquiera de las dos. Si sube la directa hay coluria, y el tinte es amarillo rojizo.',
    ],
    refs: [L('11'), L('15')],
  },
  {
    id: 'f-post',
    sec: 'tipos',
    titulo: 'Poshepática: la bilis no sale',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'bilirrubina', modo: 'post' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Se tapa la vía biliar: **cálculo**, **cáncer de la cabeza del páncreas**, ampuloma.' },
          { k: 'mecanismo', text: 'La **directa** no llega al intestino y **refluye** a la sangre, con las sales biliares.' },
          { k: 'signo', text: '**Coluria**, heces **acólicas**, **prurito**; tinte **verdínico**.' },
        ],
      },
    ],
    aclara: { text: 'Si no llega bilirrubina al intestino, no se forma estercobilina: las heces salen color masilla. Y las sales biliares en la piel producen el prurito.', origen: `${APUNTE}, p. 10 y 12.` },
    voz: [
      'En la poshepática, el hígado funciona, pero la vía biliar está tapada: por un cálculo, un cáncer de la cabeza del páncreas o un ampuloma.',
      'La bilirrubina directa no puede llegar al intestino, y refluye a la sangre junto con las sales biliares.',
      'Entonces hay coluria, porque es directa; las heces salen sin color, acólicas, porque no llega estercobilina; y las sales biliares en la piel dan prurito.',
    ],
    refs: [L('10'), L('11'), L('12'), L('15')],
  },
  {
    id: 'f-courvoisier',
    sec: 'tipos',
    titulo: 'Por qué una vesícula se distiende y la otra no',
    etapas: ['mecanismo', 'signo'],
    fig: {
      f: 'biliar',
      vistas: [
        { tumor: 'pancreas', dilata: ['coledoco', 'hepatico', 'vesicula'], luz: { vesicula: 'gold', pancreas: 'red' }, nota: 'Tumor: vesícula grande', notaTone: 'gold' },
        { calculo: 'coledoco', luz: { coledoco: 'peach', vesicula: 'lilac' }, nota: 'Cálculo: vesícula fibrosada', notaTone: 'lilac' },
      ],
    },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Cáncer de cabeza de páncreas', tono: 'gold', text: 'Obstruye **lentamente** a una vesícula sana: se distiende y se palpa, **no duele**.' },
      { t: 'def', term: 'Litiasis', tono: 'lilac', en: 1, text: 'La vesícula ya está **fibrosada** por la inflamación crónica: no puede dilatarse.' },
    ],
    voz: [
      'Y un mecanismo que explica una ley clásica. El cáncer de la cabeza del páncreas obstruye el colédoco lentamente, y la vesícula, que estaba sana, se va distendiendo hasta que se palpa, y no duele.',
      'En la litiasis, en cambio, la vesícula ya está fibrosada por la inflamación crónica, y aunque el colédoco se tape, no puede dilatarse.',
    ],
    refs: [L('13')],
  },
  {
    id: 'f-koller',
    sec: 'tipos',
    titulo: 'La vitamina K y la prueba de Koller',
    etapas: ['mecanismo', 'signo'],
    amplio: true,
    bloques: [
      { t: 'texto', text: 'Los factores **II, VII, IX y X** se fabrican en el hígado y necesitan **vitamina K**, que es **liposoluble**: se absorbe con la bilis.' },
      { t: 'def', term: 'Colestasis', tono: 'gold', en: 1, text: 'Sin bilis no se absorbe la vitamina K: el tiempo de protrombina se alarga, y **corrige** al darla por vía intramuscular.' },
      { t: 'def', term: 'Lesión hepatocelular', tono: 'red', en: 2, text: 'El hígado no fabrica los factores: aunque se dé vitamina K, **no corrige**.' },
    ],
    voz: [
      'El último mecanismo explica una prueba. Los factores de coagulación dos, siete, nueve y diez se fabrican en el hígado y necesitan vitamina K. Y la vitamina K es liposoluble: para absorberse necesita la bilis.',
      'En una colestasis no llega bilis al intestino, la vitamina K no se absorbe, y el tiempo de protrombina se alarga. Si se le da vitamina K por vía intramuscular, se corrige.',
      'En una lesión hepatocelular el problema es que el hígado no fabrica los factores. Aunque le des vitamina K, no corrige.',
    ],
    refs: [L('13'), L('14')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'circuito', label: 'El circuito' },
    { id: 'tipos', label: 'Dónde se rompe' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-aviso',
    sec: 'definicion',
    titulo: 'Ictericia: el aviso del profesor',
    amplio: true,
    bloques: [
      { t: 'clave', tono: 'red', text: 'Se pregunta muchísimo, y sale del **primer apunte**: motivos de consulta.' },
      { t: 'prof', en: 1, text: '«No me saben ictericia para el tercer parcial, los van a bochar… preguntan mucho ictericia, por favor, repasen ictericia.»', ref: M6('16:51') },
    ],
    examen: { origen: 'ortega', texto: 'Ictericia para el tercer parcial.', cita: 'Ictericia, preguntan muchísimo en este parcial.', ref: M6('16:13') },
    voz: [
      'Empezamos con un aviso. El profesor es tajante: ictericia se pregunta muchísimo, y todo sale de su primer apunte, el de motivos de consulta.',
      'En sus palabras: si no saben ictericia para el tercer parcial, los van a bochar.',
    ],
    refs: [M6('16:13'), M6('16:51')],
  },
  {
    id: 't-definicion',
    sec: 'definicion',
    titulo: 'Qué es y valores normales',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Coloración amarilla de **piel y mucosas** cuando la bilirrubina supera los **2 mg/dl**.' },
      {
        t: 'cuadro',
        en: 1,
        head: ['Bilirrubina', 'Normal (mg/dl)'],
        filas: [
          ['Total', '0,3 – 1'],
          ['Directa', '0,1 – 0,4'],
          ['Indirecta', '0,2 – 0,9'],
        ],
      },
      { t: 'texto', en: 2, text: '**Hiperbilirrubinemia subclínica:** entre 1 y 2 mg/dl: está alta, pero todavía no se ve.' },
    ],
    examen: { origen: 'preguntero', texto: 'Definición y valores normales de bilirrubina total, directa e indirecta.' },
    voz: [
      'La ictericia es la coloración amarilla de la piel y las mucosas, que aparece cuando la bilirrubina en sangre supera los dos miligramos por decilitro.',
      'Los valores normales: bilirrubina total de cero coma tres a uno; directa de cero coma uno a cero coma cuatro; indirecta de cero coma dos a cero coma nueve.',
      'Entre uno y dos está la hiperbilirrubinemia subclínica: la bilirrubina está alta, pero todavía no se ve.',
    ],
    refs: [L('10')],
  },
  {
    id: 't-pseudo',
    sec: 'definicion',
    titulo: 'No confundir: pseudoictericia',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Ictericia', tono: 'gold', items: ['Bilirrubina **más de 2** mg/dl', 'Tiñe la **esclerótica**', 'Piel y mucosas'] },
          { titulo: 'Pseudoictericia', tono: 'peach', items: ['Bilirrubina **normal**', '**Respeta la esclerótica**', 'Palmas: **carotenos** (zanahoria, zapallo, cítricos), insuficiencia renal, fármacos'] },
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Hiperbilirrubinemia subclínica y pseudoictericia.' },
    voz: [
      'No la confundas con la pseudoictericia. En la ictericia la bilirrubina está alta y se tiñe la esclerótica.',
      'En la pseudoictericia la bilirrubina es normal: se colorean sobre todo las palmas, y la esclerótica queda blanca. Aparece con los carotenos de la zanahoria, el zapallo o los cítricos, en la insuficiencia renal crónica, o con algunos fármacos.',
    ],
    refs: [L('10')],
  },
  {
    id: 't-indirecta-directa',
    sec: 'bilirrubina',
    titulo: 'Indirecta y directa',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Indirecta (no conjugada)', 'Directa (conjugada)'],
        filas: [
          ['Dónde está', '**Antes** del hepatocito', 'Ya conjugada con **ácido glucurónico**'],
          ['Transporte', 'Unida a la **albúmina**', 'Libre, **hidrosoluble**'],
          ['Orina', '**No** se filtra: sin coluria', 'Se filtra: **coluria**'],
          ['Riesgo', '**Kernicterus** en el neonato', '—'],
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Tabla de diferenciación entre bilirrubina indirecta y directa.' },
    voz: [
      'La diferencia entre las dos bilirrubinas. La indirecta todavía no llegó al hepatocito. La directa ya está conjugada con ácido glucurónico.',
      'La indirecta viaja unida a la albúmina; la directa, libre e hidrosoluble.',
      'Por eso la indirecta no aparece en la orina, y la directa sí: da coluria.',
      'Y la indirecta, en el recién nacido, puede dañar el cerebro: es el kernicterus.',
    ],
    refs: [L('10'), L('11')],
  },
  {
    id: 't-kernicterus',
    sec: 'bilirrubina',
    titulo: 'Kernicterus',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Qué es', tono: 'red', text: 'La bilirrubina **indirecta** se acumula en los **núcleos de la base** del recién nacido.' },
      { t: 'def', term: 'Por qué', tono: 'lilac', en: 1, text: 'La **barrera hematoencefálica** no está formada o está alterada.' },
      { t: 'def', term: 'Consecuencia', tono: 'peach', en: 2, text: '**Daño cerebral irreversible**: trastornos motores y del desarrollo.' },
      { t: 'texto', en: 2, text: 'La ictericia del neonato es **fisiológica** si dura 2 a 3 días.' },
    ],
    examen: { origen: 'preguntero', texto: '¿Qué es el kernicterus?' },
    voz: [
      'El kernicterus es la acumulación de bilirrubina indirecta en los núcleos de la base del cerebro del recién nacido.',
      'Ocurre porque la barrera hematoencefálica todavía no está formada, o está alterada.',
      'Y deja un daño cerebral irreversible. Ojo: la ictericia del recién nacido es fisiológica si dura dos o tres días; si se prolonga, aparece el riesgo.',
    ],
    refs: [L('11')],
  },
  {
    id: 't-clasificacion',
    sec: 'clasificacion',
    titulo: 'Pre, intra y poshepática',
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['', 'Prehepática', 'Hepática', 'Poshepática'],
        filas: [
          ['Mecanismo', 'Hemólisis', 'Falla el hepatocito', 'Obstrucción biliar'],
          ['Bilirrubina', '**Indirecta**', 'Indirecta **o** directa', '**Directa**'],
          ['Orina', 'Parda, sin coluria', '**Coluria**', '**Coluria**'],
          ['Heces', '**Hipercólicas**', 'Normocólicas', 'Hipocólicas o **acólicas**'],
          ['Tinte', 'Flavínico', 'Rubínico', 'Verdínico'],
          ['Marcadores', 'LDH ↑, reticulocitos ↑, haptoglobina ↓', 'GPT y GOT ↑, albúmina ↓', 'FA, GGT, 5′-nucleotidasa ↑'],
          ['Koller', 'No se usa', 'No corrige', 'Corrige'],
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Clasifique la ictericia y diga qué bilirrubina aumenta en cada una.' },
    voz: [
      'Y el cuadro que resume todo. El mecanismo: hemólisis, falla del hepatocito u obstrucción biliar.',
      'La bilirrubina: indirecta en la prehepática, cualquiera de las dos en la hepática, directa en la poshepática.',
      'La orina: sin coluria en la prehepática; con coluria en las otras dos.',
      'Las heces: hipercólicas, normocólicas y acólicas.',
      'El tinte: flavínico, rubínico y verdínico.',
      'Los marcadores: de hemólisis, de necrosis y de colestasis.',
      'Y la prueba de Koller: no corrige en la hepática, corrige en la obstructiva.',
    ],
    refs: [L('11'), L('15')],
  },
  {
    id: 't-causas-pre',
    sec: 'clasificacion',
    titulo: 'Causas prehepáticas y hepáticas',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Prehepática', tono: 'peach', text: 'Hemólisis, **eritroblastosis fetal**, paludismo, reabsorción de hematomas.' },
      { t: 'def', term: 'Hepática, con indirecta', tono: 'lilac', en: 1, text: 'Captación: **Gilbert** (la más común) · conjugación: **Crigler-Najjar** · insuficiencia hepática grave.' },
      { t: 'def', term: 'Hepática, con directa', tono: 'gold', en: 2, text: 'Excreción: **Dubin-Johnson**, Rotor · hepatitis, cirrosis, fármacos, colestasis intrahepática.' },
    ],
    examen: { origen: 'preguntero', texto: 'Etiologías prehepáticas, hepáticas y poshepáticas.' },
    voz: [
      'Las causas. Prehepáticas: la hemólisis, la eritroblastosis fetal, el paludismo o la reabsorción de un hematoma.',
      'Hepáticas con indirecta: cuando falla la captación, como en el síndrome de Gilbert, que es la forma más común; o la conjugación, como en el Crigler-Najjar.',
      'Hepáticas con directa: cuando falla la excreción, como en el Dubin-Johnson o el Rotor, y en las hepatitis, la cirrosis, los fármacos o la colestasis intrahepática.',
    ],
    refs: [L('11'), L('15')],
  },
  {
    id: 't-causas-post',
    sec: 'clasificacion',
    titulo: 'Causas poshepáticas',
    fig: {
      f: 'biliar',
      vistas: [
        { calculo: 'coledoco', luz: { coledoco: 'peach' }, nota: 'Coledocolitiasis', notaTone: 'peach' },
        { tumor: 'pancreas', dilata: ['coledoco', 'vesicula'], luz: { pancreas: 'red' }, nota: 'Cabeza de páncreas', notaTone: 'red' },
        { tumor: 'ampolla', luz: { ampolla: 'lilac' }, nota: 'Ampuloma', notaTone: 'lilac' },
      ],
    },
    anchoFig: 'media',
    bloques: [
      {
        t: 'lista',
        items: [
          '**Litiasis**: coledocolitiasis, síndrome de Mirizzi.',
          '**Cáncer de la cabeza del páncreas**; cáncer del colédoco.',
          '**Ampuloma**: cáncer de la ampolla de Vater.',
        ],
      },
    ],
    voz: [
      'Las poshepáticas son obstrucciones de la vía biliar. La más frecuente, el cálculo en el colédoco.',
      'Después, el cáncer de la cabeza del páncreas, que comprime el colédoco desde afuera.',
      'Y el ampuloma, el cáncer de la ampolla de Vater.',
    ],
    refs: [L('11'), L('15')],
  },
  {
    id: 't-anamnesis-edad',
    sec: 'semiologia',
    titulo: 'La edad orienta',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Edad', 'Pensar en'],
        filas: [
          ['Neonato', 'Fisiológica (2–3 días); si se prolonga, **kernicterus**'],
          ['Niño · adolescente', 'Hepatitis **A** · hepatitis **B**'],
          ['Adulto joven', 'Colecistitis, alcohol, hepatitis B'],
          ['Más de 45 años', 'Litiasis, cirrosis alcohólica, cáncer de páncreas y vía biliar'],
          ['Más de 60 años', '**Cáncer** (75 % de los casos), cirrosis, litiasis'],
          ['Cualquier edad', '**Fármacos**'],
        ],
      },
    ],
    voz: [
      'En la anamnesis, la edad orienta mucho. En el recién nacido es fisiológica, pero si se prolonga hay riesgo de kernicterus.',
      'En el niño pensá en hepatitis A, y en el adolescente, en hepatitis B.',
      'En el adulto joven, colecistitis, alcohol o hepatitis B.',
      'A partir de los cuarenta y cinco, litiasis, cirrosis alcohólica y cáncer de páncreas.',
      'Y después de los sesenta, tres de cada cuatro son cáncer.',
      'Y a cualquier edad, los fármacos.',
    ],
    refs: [L('11')],
  },
  {
    id: 't-anamnesis-otros',
    sec: 'semiologia',
    titulo: 'Sexo, hábitos y forma de comienzo',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Sexo', tono: 'lilac', text: 'Mujer: **litiasis biliar**, cirrosis biliar primaria. Hombre: cirrosis alcohólica, neoplasias.' },
      { t: 'def', term: 'Hábitos', tono: 'peach', en: 1, text: 'Sexuales: hepatitis B y C. Tóxicos: **fármacos** (isoniacida, rifampicina, TMP-SMX, tetraciclinas), alcohol, drogas.' },
      { t: 'def', term: 'Comienzo', tono: 'sky', en: 2, text: '**Brusco:** hepatitis viral, drogas, litiasis. **Insidioso:** cirrosis, **cáncer de cabeza de páncreas**, ampuloma.' },
    ],
    voz: [
      'El sexo: en la mujer, la litiasis biliar y la cirrosis biliar primaria; en el hombre, la cirrosis alcohólica y las neoplasias.',
      'Los hábitos: las conductas sexuales de riesgo orientan a hepatitis B y C, y los tóxicos, a fármacos como la isoniacida o la rifampicina, el alcohol o las drogas.',
      'Y la forma de comienzo: brusco en las hepatitis, las drogas y la litiasis; lento e insidioso en la cirrosis y el cáncer de páncreas.',
    ],
    refs: [L('11')],
  },
  {
    id: 't-acompanantes',
    sec: 'semiologia',
    titulo: 'Síntomas que acompañan',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Síntoma', 'Orienta a'],
        filas: [
          ['Fiebre y escalofríos', 'Hepatitis viral o alcohólica, colelitiasis, tóxicos, absceso hepático'],
          ['Dolor cólico en hipocondrio derecho', '**Colelitiasis**: irradia a dorso y hombro, tras alimentos colecistoquinéticos'],
          ['**Prurito**', '**Colestasis** (poshepática)'],
          ['Pérdida de peso', '**Cáncer de la cabeza del páncreas**'],
          ['Orina caoba · parda', '**Coluria** · hemolítica'],
          ['Heces hipercólicas · normo · acólicas', 'Pre · hepática · poshepática'],
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Rasgos clínicos que hacen pensar en un paciente ictérico.' },
    voz: [
      'Lo que acompaña. Fiebre y escalofríos: hepatitis, colelitiasis o un absceso hepático.',
      'Un dolor cólico en el hipocondrio derecho, que irradia al dorso y al hombro después de comer grasas: colelitiasis, la causa más frecuente.',
      'El prurito habla de colestasis.',
      'La pérdida de peso hace pensar en cáncer de páncreas.',
      'La orina caoba es coluria; la orina parda, hemólisis.',
      'Y las heces: hipercólicas en la prehepática, normales en la hepática y acólicas en la poshepática.',
    ],
    refs: [L('11'), L('12')],
  },
  {
    id: 't-tinte',
    sec: 'semiologia',
    titulo: 'El tinte y el estado general',
    amplio: true,
    bloques: [
      {
        t: 'secuencia',
        items: [
          { ico: 'piel', t: 'Flavínica', d: 'amarillo pálido: hemólisis', tono: 'gold' },
          { ico: 'piel', t: 'Rubínica', d: 'amarillo rojizo: hepatocelular', tono: 'peach' },
          { ico: 'piel', t: 'Verdínica', d: 'verde aceituna: colestasis', tono: 'mint' },
          { ico: 'piel', t: 'Melánica', d: 'negruzca: obstructiva crónica', tono: 'lilac' },
        ],
      },
      { t: 'texto', en: 3, text: 'La **obstructiva** está «más ictérica que enferma»; la **hepatocelular**, con ictericia leve y más compromiso general.' },
    ],
    voz: [
      'El tinte también orienta. Flavínico, amarillo pálido, en la hemólisis.',
      'Rubínico, amarillo rojizo, en la lesión hepatocelular.',
      'Verdínico, verde aceituna, en la colestasis.',
      'Y melánico, negruzco, en las obstructivas crónicas. Y el estado general: el paciente con una obstructiva está más ictérico que enfermo; el hepatocelular, al revés.',
    ],
    refs: [L('12')],
  },
  {
    id: 't-examen',
    sec: 'semiologia',
    titulo: 'Examen físico',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Hallazgo', 'Orienta a'],
        filas: [
          ['Lesiones de rascado', 'Colestasis'],
          ['Xantelasmas', 'Cirrosis biliar primaria'],
          ['Adenopatías generalizadas · Virchow', 'Hepatitis viral · metástasis hepáticas'],
          ['Ictericia **con ascitis**', '**Cirrosis**'],
          ['Hábito de **Chvostek**', 'Cirrosis: vello ginecoide, ginecomastia, ascitis, circulación colateral'],
          ['Hígado firme, borde filoso · blando y doloroso · pétreo', 'Cirrosis · hepatitis aguda · metástasis'],
          ['Esplenomegalia', 'Hipertensión portal o hemólisis'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'El hábito de Chvostek.', cita: 'Esos hábitos de Chvostek lo van a volver a preguntar ahora y lo tienen que saber.', ref: EF1('17:15') },
    voz: [
      'En el examen físico, las lesiones de rascado indican colestasis.',
      'Los xantelasmas en los párpados, cirrosis biliar primaria.',
      'Las adenopatías generalizadas, hepatitis viral; el ganglio de Virchow, metástasis.',
      'Ictericia con ascitis: pensá en cirrosis.',
      'Y el hábito de Chvostek, que el profesor dice que se pregunta: distribución ginecoide del vello, ginecomastia, ascitis y circulación colateral.',
      'A la palpación, el hígado de la cirrosis es firme y de borde filoso; el de la hepatitis aguda, blando y doloroso; el de las metástasis, pétreo y nodular.',
      'Y la esplenomegalia, en la hipertensión portal o en la hemólisis.',
    ],
    refs: [L('12'), L('13'), EF1('17:15')],
  },
  {
    id: 't-sindromes',
    sec: 'semiologia',
    titulo: 'Dos síndromes con ictericia',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Síndrome hemolítico', tono: 'peach', items: ['Bilirrubina **indirecta**', 'Ictericia **flavínica**', '**Anemia**', '**Esplenomegalia**'] },
          { titulo: 'Hipertensión portal', tono: 'lilac', items: ['Bilirrubina **directa**', '**Cirrosis**, ascitis', 'Esplenomegalia', 'Várices esofágicas'] },
        ],
      },
    ],
    voz: [
      'Con la esplenomegalia hay dos síndromes posibles. El hemolítico: bilirrubina indirecta, ictericia flavínica, anemia y esplenomegalia.',
      'Y el de hipertensión portal: bilirrubina directa, cirrosis, ascitis, esplenomegalia y várices esofágicas.',
    ],
    refs: [L('13')],
  },
  {
    id: 't-coledociano',
    sec: 'obstructiva',
    titulo: 'Síndrome coledociano',
    fig: { f: 'bilirrubina', modo: 'post' },
    anchoFig: 'media',
    bloques: [
      {
        t: 'secuencia',
        items: [
          { ico: 'piel', t: 'Ictericia', d: 'obstructiva', tono: 'gold' },
          { ico: 'gota', t: 'Coluria', tono: 'peach' },
          { ico: 'nudo', t: 'Acolia', d: 'o hipocolia', tono: 'lilac' },
        ],
      },
      { t: 'texto', en: 2, text: 'Puede sumar **prurito** (congestión biliar) y **fiebre** (infección).' },
    ],
    examen: { origen: 'ortega', texto: 'Síndrome coledociano: ictericia, acolia o hipocolia y coluria.', cita: '¿Qué es síndrome coledociano? Pregunta de parcial… como si fuese el padre nuestro, me lo saben.', ref: VE('24:49') },
    voz: [
      'El síndrome coledociano es la traducción clínica de una obstrucción del colédoco, y el profesor avisa que es pregunta de parcial: hay que saberlo como el Padre Nuestro. Tiene una tríada: ictericia obstructiva.',
      'Coluria.',
      'Y acolia o hipocolia. Puede acompañarse de prurito, por la congestión biliar, y de fiebre si hay infección.',
    ],
    refs: [VE('24:49'), VE('25:03'), L('13')],
  },
  {
    id: 't-courvoisier',
    sec: 'obstructiva',
    titulo: 'Ley de Courvoisier-Terrier',
    fig: { f: 'biliar', vistas: [{ tumor: 'pancreas', dilata: ['coledoco', 'hepatico', 'vesicula'], luz: { vesicula: 'gold', pancreas: 'red' } }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', tono: 'gold', text: 'Toda ictericia **progresiva** de meses, con **vesícula palpable no dolorosa** y **pérdida de peso**, es **cáncer de la cabeza del páncreas** hasta que se demuestre lo contrario.' },
      { t: 'texto', en: 1, text: 'La obstrucción **litiásica** no distiende la vesícula: su pared está fibrosada.' },
      { t: 'def', term: 'Signo de Bard y Pick', tono: 'lilac', en: 1, text: 'Vesícula palpable no dolorosa en un ictérico, por obstrucción mecánica de la vía biliar.' },
    ],
    examen: { origen: 'preguntero', texto: 'Ley de Courvoisier-Terrier y signo de Courvoisier.' },
    voz: [
      'Y una ley que hay que saber textual. La ley de Courvoisier-Terrier: toda ictericia progresiva de varios meses de evolución, con vesícula palpable no dolorosa y pérdida de peso importante, es cáncer de la cabeza del páncreas hasta que se demuestre lo contrario.',
      'Si la obstrucción es por un cálculo, la vesícula no se distiende, porque su pared está fibrosada. Y el signo de Bard y Pick es justamente esa vesícula palpable e indolora en un paciente ictérico.',
    ],
    refs: [L('13')],
  },
  {
    id: 't-marcadores',
    sec: 'laboratorio',
    titulo: 'Tres grupos de marcadores',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Grupo', 'Marcadores', 'Pista'],
        filas: [
          ['Hemólisis', 'LDH ↑, indirecta ↑, **reticulocitos ↑**, **haptoglobina ↓**', 'Se destruyen glóbulos rojos'],
          ['Necrosis hepatocelular', '**GPT** (más específica), GOT', '**GPT > GOT**: viral · **GOT > GPT**: alcohólica'],
          ['Colestasis', '**FA**, **GGT**, 5′-nucleotidasa, directa, colesterol', 'La bilis no sale'],
          ['Función', 'Albúmina ↓, tiempo de protrombina prolongado', 'El hígado no sintetiza'],
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Rasgos de laboratorio y marcadores a solicitar.' },
    aclara: { text: 'La **haptoglobina** baja porque se une a la hemoglobina libre que liberan los glóbulos rojos destruidos y se consume.', origen: GRAL },
    voz: [
      'En el laboratorio hay tres grupos de marcadores. De hemólisis: la LDH y la indirecta suben, los reticulocitos suben porque la médula compensa, y la haptoglobina baja.',
      'De necrosis: las transaminasas. La GPT es la más específica. Si la GPT supera a la GOT, pensá en hepatitis viral; si es al revés, en hepatitis alcohólica.',
      'De colestasis: la fosfatasa alcalina, la GGT y la cinco nucleotidasa.',
      'Y de función: la albúmina baja y el tiempo de protrombina se alarga.',
    ],
    refs: [L('13')],
  },
  {
    id: 't-hemograma',
    sec: 'laboratorio',
    titulo: 'Hemograma y eritrosedimentación',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Hallazgo', 'Pensar en'],
        filas: [
          ['Anemia', 'Hemólisis, cirróticos'],
          ['Leucocitosis con neutrofilia', 'Hepatitis alcohólica, coledocolitiasis'],
          ['Leucopenia con linfocitosis', 'Hepatitis viral'],
          ['Eosinofilia', 'Fármacos, esquistosomiasis'],
          ['Eritrosedimentación normal · aumentada', 'Hepatitis viral · necrosis hepatocelular'],
        ],
      },
    ],
    voz: [
      'El hemograma también ayuda. La anemia aparece en la hemólisis y en los cirróticos.',
      'La leucocitosis con neutrofilia, en la hepatitis alcohólica y la coledocolitiasis.',
      'La leucopenia con linfocitosis, en la hepatitis viral.',
      'La eosinofilia, en los fármacos y la esquistosomiasis.',
      'Y la eritrosedimentación es normal en la hepatitis viral y aumenta en la necrosis hepatocelular.',
    ],
    refs: [L('13')],
  },
  {
    id: 't-koller',
    sec: 'laboratorio',
    titulo: 'Prueba de Koller',
    bloques: [
      {
        t: 'arbol',
        raiz: {
          t: 'Ictérico con Quick prolongado',
          d: 'vitamina K 10 mg/día IM, 3 días',
          tono: 'lilac',
          hijos: [
            { t: 'Corrige', d: 'colestasis: faltaba vitamina K', tono: 'gold' },
            { t: 'No corrige', d: 'lesión hepatocelular: no fabrica los factores', tono: 'red' },
          ],
        },
      },
    ],
    voz: [
      'Y la prueba de Koller. A un paciente ictérico con el tiempo de protrombina prolongado se le da vitamina K, diez miligramos por día por vía intramuscular, durante tres días. Si corrige, es una colestasis: lo que faltaba era la vitamina K. Si no corrige, es una lesión hepatocelular: el hígado no puede fabricar los factores.',
    ],
    refs: [L('13'), L('14')],
  },
  {
    id: 't-imagenes',
    sec: 'laboratorio',
    titulo: 'Imágenes y otros estudios',
    amplio: true,
    bloques: [
      {
        t: 'secuencia',
        flechas: true,
        items: [
          { ico: 'eco', t: 'Ecografía', d: 'accesible, barata, alto rédito', tono: 'mint' },
          { ico: 'tac', t: 'TC · colangiorresonancia', tono: 'sky' },
          { ico: 'rx', t: 'CPRE · colangiografía percutánea', tono: 'lilac' },
        ],
      },
      { t: 'texto', en: 2, text: 'Marcadores virales: IgM para virus A, B y C, HBsAg, Epstein-Barr, citomegalovirus. Si hace falta, **biopsia hepática**.' },
    ],
    voz: [
      'En las imágenes, lo primero es la ecografía: es accesible, barata y tiene alto rédito.',
      'Después, la tomografía y la colangiorresonancia.',
      'Y la colangiopancreatografía retrógrada endoscópica o la colangiografía percutánea. Si se sospecha hepatitis, se piden los marcadores virales, y si hace falta, una biopsia hepática. Con esto, tenés todo el apunte. Ahora a practicar.',
    ],
    refs: [L('14')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'definicion', label: 'Definición' },
    { id: 'bilirrubina', label: 'Las bilirrubinas' },
    { id: 'clasificacion', label: 'Clasificación' },
    { id: 'semiologia', label: 'Semiología' },
    { id: 'obstructiva', label: 'Obstructiva' },
    { id: 'laboratorio', label: 'Laboratorio' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS (simulacro) ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'practica',
    titulo: 'Hombre de 68 años',
    texto: 'Ictericia que fue aumentando en tres meses, prurito y pérdida de 10 kg. Orina oscura, heces color masilla. Se palpa la vesícula, y no duele.',
    pregunta: '¿Qué sospechás primero?',
    opciones: [
      { text: 'Cáncer de la cabeza del páncreas.', why: 'Ley de Courvoisier-Terrier: ictericia progresiva, vesícula palpable indolora, pérdida de peso.' },
      { text: 'Coledocolitiasis.', why: 'En la litiasis la vesícula está fibrosada y no se distiende.' },
      { text: 'Síndrome de Gilbert.', why: 'Da indirecta, sin coluria ni acolia.' },
      { text: 'Hemólisis.', why: 'No daría coluria ni acolia.' },
    ],
    correcta: 0,
    razonamiento: 'Síndrome coledociano (ictericia, coluria, acolia) con vesícula de Courvoisier: obstrucción lenta, tumoral.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Mujer de 25 años',
    texto: 'Ictericia leve, amarillo pálido, con anemia y esplenomegalia. La orina no es oscura y las heces son muy pigmentadas. LDH alta, haptoglobina baja.',
    pregunta: '¿Qué bilirrubina esperás alta?',
    opciones: [
      { text: 'La indirecta.', why: 'Es una ictericia prehepática por hemólisis.' },
      { text: 'La directa.', why: 'Si subiera la directa habría coluria.' },
      { text: 'Las dos por igual.', why: 'Eso orienta a una causa hepática.' },
      { text: 'Ninguna: es pseudoictericia.', why: 'Hay marcadores de hemólisis: la bilirrubina está alta.' },
    ],
    correcta: 0,
    razonamiento: 'Síndrome hemolítico: indirecta, tinte flavínico, anemia y esplenomegalia; sin coluria, heces hipercólicas.',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'Paciente ictérico con Quick prolongado',
    texto: 'Ictericia con coluria. Se indica vitamina K intramuscular durante tres días y el tiempo de protrombina se normaliza.',
    pregunta: '¿Qué indica el resultado?',
    opciones: [
      { text: 'Colestasis: faltaba vitamina K por falta de bilis.', why: 'La prueba de Koller corrige en la colestasis.' },
      { text: 'Insuficiencia hepática grave.', why: 'En la lesión hepatocelular la prueba no corrige.' },
      { text: 'Hemólisis.', why: 'En la prehepática la prueba no se usa.' },
      { text: 'Pseudoictericia.', why: 'Hay coluria: la bilirrubina está alta.' },
    ],
    correcta: 0,
    razonamiento: 'Los factores II, VII, IX y X necesitan vitamina K, que se absorbe con la bilis. Si corrige, el hígado fabrica bien: el problema era la absorción.',
  },
  {
    id: 'c4',
    origen: 'practica',
    titulo: 'Joven de 22 años con «ojos amarillos»',
    texto: 'Después de unos días de ayuno nota los ojos amarillentos. No tiene coluria ni acolia, el hemograma es normal y la indirecta está levemente alta.',
    pregunta: '¿Cuál es la causa más probable?',
    opciones: [
      { text: 'Síndrome de Gilbert.', why: 'Falla la captación: indirecta levemente alta, sin hemólisis ni lesión hepática.' },
      { text: 'Hepatitis B.', why: 'Daría transaminasas altas y, en general, coluria.' },
      { text: 'Cáncer de cabeza de páncreas.', why: 'Daría directa, coluria y acolia.' },
      { text: 'Dubin-Johnson.', why: 'Es un defecto de la excreción: sube la directa.' },
    ],
    correcta: 0,
    razonamiento: 'Hepática con indirecta, sin hemólisis: falla de la captación, el síndrome de Gilbert, la forma más común.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'bil',
        label: 'Bilirrubina',
        tone: 'gold',
        nota: 'Ictericia: más de 2 mg/dl · subclínica 1–2',
        hijos: [
          { id: 'ind', label: 'Indirecta', tone: 'gold', nota: 'Unida a albúmina · no da coluria · kernicterus' },
          { id: 'dir', label: 'Directa', tone: 'mint', nota: 'Conjugada · hidrosoluble · coluria' },
          { id: 'pse', label: 'Pseudoictericia', tone: 'peach', nota: 'Bilirrubina normal · respeta la esclerótica · carotenos' },
        ],
      },
      {
        id: 'cla',
        label: 'Clasificación',
        tone: 'lilac',
        examen: true,
        nota: 'Dónde se rompe el circuito',
        hijos: [
          { id: 'pre', label: 'Prehepática', tone: 'peach', examen: true, nota: 'Hemólisis · indirecta · orina parda · heces hipercólicas · flavínica' },
          { id: 'hep', label: 'Hepática', tone: 'lilac', examen: true, nota: 'Gilbert, Crigler-Najjar, Dubin-Johnson; hepatitis, cirrosis · rubínica' },
          {
            id: 'pos',
            label: 'Poshepática',
            tone: 'gold',
            examen: true,
            nota: 'Obstrucción · directa · coluria y acolia · verdínica',
            hijos: [
              { id: 'col', label: 'Síndrome coledociano', tone: 'gold', examen: true, nota: 'Ictericia, coluria, acolia' },
              { id: 'cou', label: 'Courvoisier-Terrier', tone: 'red', nota: 'Vesícula palpable indolora: cáncer de cabeza de páncreas' },
            ],
          },
        ],
      },
      {
        id: 'lab',
        label: 'Laboratorio',
        tone: 'sky',
        nota: 'Tres grupos de marcadores',
        hijos: [
          { id: 'hem', label: 'Hemólisis', tone: 'peach', nota: 'LDH, reticulocitos ↑ · haptoglobina ↓' },
          { id: 'nec', label: 'Necrosis', tone: 'red', nota: 'GPT > GOT viral · GOT > GPT alcohólica' },
          { id: 'cos', label: 'Colestasis', tone: 'gold', nota: 'FA, GGT, 5′-nucleotidasa · Koller corrige' },
        ],
      },
    ],
    nexos: ['**Coluria** = directa alta; **acolia** = no llega bilirrubina al intestino.', '**Ictericia con ascitis:** cirrosis.'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['dig04-d01', 'dig04-d02', 'dig04-d05'],
  anclas: {
    ubicate: { tab: 'mapa' },
    definicion: { tab: 'teoria', seccion: 'definicion' },
    metabolismo: { tab: 'teoria', seccion: 'bilirrubina' },
    clasificacion: { tab: 'teoria', seccion: 'clasificacion' },
    semiologia: { tab: 'teoria', seccion: 'semiologia' },
    obstructiva: { tab: 'teoria', seccion: 'obstructiva' },
    laboratorio: { tab: 'teoria', seccion: 'laboratorio' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    maniobras: { tab: 'maniobras' },
    integracion: { tab: 'cierre' },
  },
};
