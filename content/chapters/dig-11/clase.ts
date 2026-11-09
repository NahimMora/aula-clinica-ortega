import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * dig-11: clase visual de los síndromes vesiculares.
 *  1. Clase de Ortega: «Síndromes vesiculares» (00:02–29:17).
 *  2. Libro de Clínica Médica de Ortega (p. 385–388): cálculos, factores de riesgo, cólico biliar, colecistitis, Mirizzi,
 *     coledocolitiasis, colangitis, alitiásica, crónica, pólipos y cáncer.
 *  3. Preguntero: bloque «Hemorragias y vesícula», P12–P20.
 * Correcciones sin atribuir (ver content/traceability/dig-11.md): la colecistitis es litiásica en ~90 %; la ecografía no es
 * invasiva y el cálculo es hiperecogénico; el germen de la colangitis no se nombra; la alitiásica no se asocia a cáncer.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const V = (t: string) => r('vesic', t);
const L = (p: string) => r('libro', undefined, p);

const GRAL = 'Fisiología general, no se da en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-normal',
    sec: 'conceptos',
    titulo: 'El camino de la bilis',
    etapas: ['normal'],
    fig: { f: 'biliar', vistas: [{ luz: { higado: 'mint', hepatico: 'mint' } }, { luz: { vesicula: 'mint', cistico: 'mint' } }, { luz: { coledoco: 'mint', ampolla: 'mint', duodeno: 'mint' } }] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'normal', text: 'El **hígado** fabrica la bilis: hepáticos derecho e izquierdo → **hepático común**.' },
          { k: 'normal', text: 'La **vesícula** la almacena (no la produce); con una comida grasa se contrae y la manda por el **cístico**.' },
          { k: 'normal', text: 'Cístico + hepático común = **colédoco** → ampolla de Vater → 2.ª porción del duodeno.' },
        ],
      },
    ],
    voz: [
      'Primero, el camino normal de la bilis, como lo dibuja el profesor. La fabrica el hígado, sale por los hepáticos derecho e izquierdo, que se unen en el hepático común.',
      'La vesícula no fabrica bilis: la almacena. Cuando comemos algo graso, se contrae y la manda por el conducto cístico.',
      'El cístico se une al hepático común y forman el colédoco, que baja hasta la ampolla de Vater y desemboca en la segunda porción del duodeno.',
    ],
    refs: [V('02:16'), V('03:03'), V('10:26'), L('385')],
  },
  {
    id: 'f-colico',
    sec: 'colecistitis',
    titulo: 'Cólico biliar: se traba un momento',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'biliar', vistas: [{ calculo: 'vesicula', luz: { vesicula: 'gold' } }, { calculo: 'cistico', luz: { vesicula: 'gold', cistico: 'gold' } }, { calculo: 'vesicula', luz: { vesicula: 'gold' }, nota: 'El cálculo se libera: el dolor cede', notaTone: 'mint' }] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Hay **cálculos** en la vesícula. Mientras no se mueven, no duelen.' },
          { k: 'mecanismo', text: 'Tras una comida grasa la vesícula se contrae y un cálculo **tapa el cístico**: sube la presión.' },
          { k: 'signo', text: '**Dolor cólico** en hipocondrio derecho o epigastrio, que **cede** cuando el cálculo se libera. Sin fiebre.' },
        ],
      },
    ],
    voz: [
      'El cólico biliar. Hay cálculos en la vesícula, y mientras no se mueven, no duelen: es la litiasis asintomática.',
      'Después de una comida grasa, la vesícula se contrae, y un cálculo tapa por un momento la salida, el cístico. La presión adentro sube.',
      'Eso es el dolor cólico, en el hipocondrio derecho o el epigastrio. Cuando el cálculo se libera, o cuando un antiespasmódico relaja la vesícula, el dolor se va. No hay fiebre.',
    ],
    refs: [V('08:14'), V('08:57'), V('15:50'), V('16:12'), L('385')],
  },
  {
    id: 'f-colecistitis',
    sec: 'colecistitis',
    titulo: 'Colecistitis: queda impactado',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'biliar', vistas: [{ calculo: 'cistico', luz: { cistico: 'red' } }, { calculo: 'cistico', dilata: ['vesicula'], luz: { vesicula: 'red', cistico: 'red' } }, { calculo: 'cistico', dilata: ['vesicula'], luz: { vesicula: 'red', cistico: 'red' }, nota: 'El colédoco sigue libre: sin ictericia', notaTone: 'mint' }] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'El cálculo queda **impactado en el cístico**.' },
          { k: 'mecanismo', text: 'La vesícula no se vacía: aumenta la presión, se compromete su irrigación y **se inflama**.' },
          { k: 'signo', text: 'Dolor intenso y persistente, **fiebre**, **Murphy positivo**, leucocitosis. Sin ictericia si no se complica.' },
        ],
      },
    ],
    voz: [
      'Si el cálculo no se libera y queda impactado en el cístico, empieza la colecistitis aguda.',
      'La vesícula no puede vaciarse, la presión adentro sigue subiendo, se compromete la irrigación de su pared, y se inflama.',
      'Ahora el dolor es intenso y no cede, aparece la fiebre, el signo de Murphy positivo y la leucocitosis. Y como el colédoco sigue libre, no hay ictericia, salvo que se complique.',
    ],
    refs: [V('01:34'), V('03:51'), V('16:52'), V('18:24'), L('386')],
  },
  {
    id: 'f-sin-ictericia',
    sec: 'ictericia',
    titulo: 'Por qué la litiasis no da ictericia',
    etapas: ['normal', 'alteracion', 'signo'],
    fig: { f: 'biliar', vistas: [{ calculo: 'vesicula', luz: { vesicula: 'gold', hepatico: 'mint', coledoco: 'mint', duodeno: 'mint' }, nota: 'La bilis del hígado igual llega al duodeno', notaTone: 'mint' }, { calculo: 'coledoco', dilata: ['hepatico', 'coledoco'], luz: { hepatico: 'red', coledoco: 'red' }, nota: 'Obstruido el colédoco: la bilis vuelve a la sangre', notaTone: 'red' }] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'normal', text: 'La vesícula solo **almacena**: aunque esté llena de cálculos, la bilis del hígado baja por el hepático común y el colédoco.' },
          { k: 'alteracion', text: 'Si el cálculo **obstruye el colédoco**, la bilis no pasa: la bilirrubina directa vuelve a la sangre.' },
          { k: 'signo', text: '**Ictericia** solo cuando se obstruye la vía biliar principal.' },
        ],
      },
    ],
    voz: [
      'Y la pregunta clave: ¿por qué los cálculos en la vesícula no dan ictericia? Porque la vesícula solo almacena. Aunque esté llena de cálculos, la bilis que fabrica el hígado sigue bajando por el hepático común y el colédoco hasta el duodeno.',
      'Distinto es si el cálculo se escapa y obstruye el colédoco: la bilis no puede pasar, se estanca, y la bilirrubina directa vuelve a la sangre.',
      'Ahí sí hay ictericia. Cálculos en la vesícula, no; obstrucción de la vía biliar, sí.',
    ],
    refs: [V('09:41'), V('10:26'), V('11:08'), V('14:00'), L('387')],
  },
  {
    id: 'f-mirizzi',
    sec: 'ictericia',
    titulo: 'Mirizzi: ictericia sin cálculo en el colédoco',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'biliar', vistas: [{ calculo: 'cistico', dilata: ['vesicula'], luz: { vesicula: 'red', cistico: 'red' } }, { calculo: 'cistico', dilata: ['vesicula', 'hepatico'], luz: { vesicula: 'red', cistico: 'red', hepatico: 'gold' }, nota: 'La masa inflamatoria comprime el hepático común', notaTone: 'gold' }] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Colecistitis con un cálculo impactado en el cístico.' },
          { k: 'mecanismo', text: 'La vesícula inflamada y agrandada **comprime desde afuera** el conducto hepático común.' },
          { k: 'signo', text: '**Ictericia** obstructiva: síndrome coledociano.' },
        ],
      },
    ],
    voz: [
      'Hay una excepción: el síndrome de Mirizzi, una complicación de la colecistitis. El cálculo está impactado en el cístico.',
      'La vesícula inflamada y agrandada crece tanto que comprime desde afuera el conducto hepático común, justo donde se le une el cístico.',
      'Entonces la bilis no puede bajar, y aparece la ictericia, sin que haya ningún cálculo dentro del colédoco.',
    ],
    refs: [V('12:36'), V('13:17'), V('14:00'), V('17:35'), L('386')],
  },
  {
    id: 'f-coledociano',
    sec: 'coledociano',
    titulo: 'Síndrome coledociano: la tríada',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'biliar', vistas: [{ calculo: 'coledoco', luz: { coledoco: 'gold' } }, { calculo: 'coledoco', dilata: ['hepatico', 'coledoco'], luz: { hepatico: 'gold', coledoco: 'gold' } }, { calculo: 'coledoco', dilata: ['hepatico', 'coledoco'], luz: { hepatico: 'gold', coledoco: 'gold', duodeno: 'red' }, nota: 'No llega bilis al intestino: heces claras', notaTone: 'gold' }] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Se **obstruye la vía biliar principal**: cálculo, tumor, parásito.' },
          { k: 'mecanismo', text: 'La bilirrubina **directa**, soluble, vuelve a la sangre y se filtra por el riñón.' },
          { k: 'signo', text: '**Ictericia** + **coluria** (orina oscura) + **hipocolia o acolia** (heces claras). Prurito por las sales biliares.' },
        ],
      },
    ],
    voz: [
      'El síndrome coledociano aparece cuando se obstruye la vía biliar principal: un cálculo, un tumor, un parásito.',
      'La bilirrubina directa, que ya pasó por el hígado y es soluble en agua, no puede salir: vuelve a la sangre y se filtra por el riñón.',
      'Por eso la tríada: ictericia; coluria, la orina oscura; y heces claras, hipocólicas o acólicas, porque no llega bilis al intestino. Las sales biliares en la piel dan prurito.',
    ],
    refs: [V('09:41'), V('17:35'), V('24:18'), L('387')],
  },
  {
    id: 'f-colangitis',
    sec: 'coledociano',
    titulo: 'Colangitis y pancreatitis biliar',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'biliar', vistas: [{ calculo: 'coledoco', dilata: ['hepatico', 'coledoco'], luz: { coledoco: 'red', hepatico: 'red' }, nota: 'Bilis estancada e infectada: Charcot', notaTone: 'red' }, { calculo: 'ampolla', luz: { ampolla: 'red', wirsung: 'red', pancreas: 'red' }, nota: 'Cálculo en la ampolla: tapa el Wirsung', notaTone: 'red' }] },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Colangitis', tono: 'red', text: 'Bilis estancada en un colédoco obstruido + bacterias que **ascienden desde el duodeno**: **dolor, fiebre e ictericia** (Charcot). Emergencia.' },
      { t: 'def', term: 'Pancreatitis biliar', tono: 'peach', en: 1, text: 'El cálculo se enclava en la **ampolla de Vater** y obstruye el **Wirsung**: el jugo pancreático no sale.' },
    ],
    voz: [
      'Y las dos complicaciones de la coledocolitiasis. La bilis normalmente es estéril; pero estancada detrás de un cálculo, bacterias que ascienden desde el duodeno la infectan, con mucha presión. Es la colangitis: dolor, fiebre e ictericia, la tríada de Charcot. Es una emergencia.',
      'Si el cálculo baja hasta enclavarse en la ampolla de Vater, tapa también la salida del conducto de Wirsung: el jugo del páncreas no puede salir, y aparece una pancreatitis biliar.',
    ],
    refs: [V('25:45'), V('26:30'), V('27:12'), L('387')],
  },
  {
    id: 'f-courvoisier',
    sec: 'ictericia',
    titulo: 'Ictericia sin dolor',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'biliar', vistas: [{ tumor: 'pancreas', dilata: ['coledoco', 'hepatico'], luz: { pancreas: 'red' } }, { tumor: 'pancreas', dilata: ['vesicula', 'coledoco', 'hepatico'], luz: { pancreas: 'red', vesicula: 'gold' }, nota: 'Vesícula distendida, indolora y palpable', notaTone: 'gold' }] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Un **tumor de la cabeza del páncreas** cierra el colédoco de a poco.' },
          { k: 'mecanismo', text: 'La vesícula, sana, se distiende con la bilis retenida, sin inflamarse.' },
          { k: 'signo', text: 'Ictericia **progresiva e indolora** con vesícula palpable no dolorosa: **Courvoisier-Terrier**.' },
        ],
      },
    ],
    aclara: { text: 'En la litiasis la vesícula está fibrosada por la inflamación crónica y no se distiende: por eso la vesícula palpable apunta a un tumor.', origen: GRAL },
    voz: [
      'Por último, la ictericia que no duele. Un tumor de la cabeza del páncreas va cerrando el colédoco de a poco, sin inflamación.',
      'La vesícula, que está sana, se va llenando de bilis retenida y se distiende.',
      'Resultado: ictericia progresiva e indolora, con una vesícula palpable que no duele. Es la ley de Courvoisier-Terrier. Ictericia sin dolor: pensar en cáncer.',
    ],
    refs: [V('14:41'), V('15:29'), V('15:50'), L('387')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'conceptos', label: 'La bilis' },
    { id: 'colecistitis', label: 'Cólico y colecistitis' },
    { id: 'ictericia', label: '¿Ictericia?' },
    { id: 'coledociano', label: 'Vía biliar principal' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-intro',
    sec: 'conceptos',
    titulo: 'Síndromes vesiculares',
    fig: { f: 'biliar', vistas: [{ luz: { vesicula: 'mint', cistico: 'mint', coledoco: 'mint' } }] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'Signos y síntomas por enfermedad de la **vesícula** y de la **vía biliar**.' },
      { t: 'prof', en: 1, text: 'No es pregunta de parcial, es pregunta de final en la mayoría de los casos y lo preguntan sus JTP. Para el parcial: ictericia.', ref: V('00:07') },
    ],
    voz: [
      'Los síndromes vesiculares son los signos y síntomas que aparecen por una enfermedad de la vesícula y de toda la vía biliar.',
      'El profesor aclara que, más que en el parcial, se pregunta en el final y en los trabajos prácticos. Para el parcial, lo que no se puede no saber es ictericia: y para entender este tema hay que saberla.',
    ],
    refs: [V('00:02'), V('00:07'), V('00:44')],
  },
  {
    id: 't-colelitiasis',
    sec: 'conceptos',
    titulo: 'Colelitiasis no es colecistitis',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Colelitiasis', tono: 'gold', items: ['**Cálculos** en la vesícula', 'Muchas veces **asintomática**', 'Dolor cólico leve, que pasa rápido'] },
          { titulo: 'Colecistitis aguda', tono: 'red', items: ['**Inflamación** de la vesícula', 'Por un cálculo **impactado en el cístico**', 'Dolor intenso, fiebre: suele terminar en cirugía'] },
        ],
      },
      { t: 'texto', en: 1, soloWeb: true, text: 'Cálculos: **80 % de colesterol**, 20 % pigmentarios (bilirrubinato de calcio).' },
    ],
    voz: [
      'Dos palabras que muchos confunden. Colelitiasis es tener cálculos en la vesícula: puede no doler nunca, o dar un dolor cólico leve que pasa rápido.',
      'Colecistitis es la inflamación de la vesícula, porque un cálculo quedó impactado en el cístico. Duele mucho más, da fiebre, y estos pacientes suelen terminar operados.',
    ],
    refs: [V('00:44'), V('01:34'), V('02:16'), L('385')],
  },
  {
    id: 't-4f',
    sec: 'conceptos',
    titulo: 'Las 4 F y los factores de riesgo',
    amplio: true,
    bloques: [
      { t: 'clave', tono: 'gold', text: '**Female** (mujer) · **Forty** (> 40 años) · **Fat** (obesa) · **Fertile** (en edad fértil).' },
      { t: 'lista', en: 1, items: ['Dieta rica en colesterol y grasas, **hipertrigliceridemia**.', 'Fármacos (anticonceptivos, clofibrato), genética.', '**Embarazo**: los estrógenos aumentan el colesterol de la bilis y la progesterona enlentece la vesícula.', 'Pérdida brusca de peso, ayuno prolongado, nutrición parenteral.'] },
    ],
    examen: { origen: 'ortega', texto: 'Las 4 F de la litiasis vesicular.', cita: 'Las 4 F me las tienen que saber.', ref: V('06:59') },
    voz: [
      'La epidemiología se resume en las cuatro F, que el profesor pide saber: female, mujer; forty, más de cuarenta años; fat, obesa; y fertile, en edad fértil. La patología biliar es más frecuente en mujeres.',
      'Otros factores: una dieta rica en colesterol y grasas, la hipertrigliceridemia, algunos fármacos, la genética, y el embarazo, porque los estrógenos cargan la bilis de colesterol y la progesterona enlentece la vesícula. También la pérdida brusca de peso y el ayuno prolongado.',
    ],
    refs: [V('06:46'), V('06:59'), V('07:32'), L('385')],
  },
  {
    id: 't-viaje',
    sec: 'conceptos',
    titulo: 'El viaje del cálculo',
    fig: { f: 'biliar', vistas: [{ calculo: 'vesicula', luz: { vesicula: 'gold' } }, { calculo: 'cistico', dilata: ['vesicula'], luz: { vesicula: 'red', cistico: 'red' } }, { calculo: 'coledoco', dilata: ['hepatico', 'coledoco'], luz: { coledoco: 'gold' } }, { calculo: 'ampolla', luz: { ampolla: 'red', pancreas: 'red' } }] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cuadro',
        head: ['Dónde está', 'Qué produce'],
        filas: [
          ['Vesícula', '**Colelitiasis**: asintomática o cólico'],
          ['Cístico', '**Colecistitis** → Mirizzi, perforación, fístulas'],
          ['Colédoco', '**Coledocolitiasis** → síndrome coledociano, colangitis'],
          ['Ampolla de Vater', '**Pancreatitis** biliar'],
        ],
      },
    ],
    voz: [
      'Todo se entiende siguiendo al cálculo. Si se queda en la vesícula, es una colelitiasis: no duele, o da un cólico.',
      'Si se impacta en el cístico, colecistitis, que puede complicarse con un Mirizzi, una perforación o una fístula.',
      'Si se escapa al colédoco, coledocolitiasis: síndrome coledociano y, si se infecta, colangitis.',
      'Y si baja hasta la ampolla de Vater, puede dar una pancreatitis.',
    ],
    refs: [V('03:51'), V('04:35'), V('05:19'), V('06:02')],
  },
  {
    id: 't-asintomatica',
    sec: 'colecistitis',
    titulo: 'Litiasis asintomática',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Cálculos que **no se impactan** en el cístico: no duelen. Hallazgo de una ecografía pedida por otro motivo.' },
      { t: 'lista', en: 1, items: ['Es el **85 %** de los diagnósticos de litiasis.', 'Pocas complicaciones: 2–3 % por año hacen un cólico; menos del 1 %, colecistitis.', 'Alrededor del 20 % se vuelve sintomática en 15 años.'] },
    ],
    examen: { origen: 'preguntero', texto: '¿Qué es la litiasis vesicular asintomática?' },
    voz: [
      'La litiasis asintomática: hay cálculos en la vesícula, pero no se impactan en el cístico, así que no duelen. El profesor lo dice así: uno puede tener cálculos en la vesícula y estar perfecto. Se descubre en una ecografía pedida por otra cosa.',
      'Es el ochenta y cinco por ciento de los diagnósticos, y se complica poco: dos o tres por ciento por año hacen un cólico, menos del uno por ciento una colecistitis, y alrededor de un veinte por ciento se vuelve sintomática en quince años.',
    ],
    refs: [V('15:50'), V('16:12'), L('385')],
  },
  {
    id: 't-colico',
    sec: 'colecistitis',
    titulo: 'Cólico biliar',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'El **síntoma cardinal** de la litiasis y su primera manifestación.' },
      {
        t: 'cuadro',
        en: 1,
        head: ['Semiología del dolor', ''],
        filas: [
          ['Localización', 'Epigastrio o **hipocondrio derecho**'],
          ['Irradiación', '**Dorso y hombro derecho**'],
          ['Carácter', '**Cólico**'],
          ['Agravantes', 'Comidas **colecistoquinéticas** (grasas)'],
          ['Atenuantes', 'Ayuno, **antiespasmódicos**'],
        ],
      },
      { t: 'texto', en: 2, text: 'Meteorismo, náuseas, vómitos biliosos. **Sin fiebre ni ictericia**.' },
    ],
    examen: { origen: 'preguntero', texto: '¿Qué es un cólico biliar?' },
    voz: [
      'El cólico biliar es el síntoma cardinal de la litiasis vesicular y su primera manifestación.',
      'Hay que saber su semiología: un dolor agudo en el epigastrio o el hipocondrio derecho, que se irradia al dorso y al hombro derecho, de tipo cólico, que empeora con las comidas grasas, que hacen contraer la vesícula, y mejora con el ayuno o con un antiespasmódico, que la relaja.',
      'Se acompaña de meteorismo, náuseas y vómitos biliosos. Y, sin complicaciones, no hay fiebre ni ictericia.',
    ],
    refs: [V('08:14'), V('08:57'), V('09:41'), V('16:52'), L('385')],
  },
  {
    id: 't-colecistitis',
    sec: 'colecistitis',
    titulo: 'Colecistitis aguda y signo de Murphy',
    fig: { f: 'biliar', vistas: [{ calculo: 'cistico', dilata: ['vesicula'], luz: { vesicula: 'red', cistico: 'red' } }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', tono: 'red', text: 'Obstrucción del **cístico** por un cálculo: aumenta la presión y se inflama la vesícula. Casi siempre **litiásica**.' },
      { t: 'lista', en: 1, items: ['Dolor en hipocondrio derecho, **fiebre**, **Murphy positivo**.', 'Anorexia, náuseas, vómitos; **leucocitosis**.', 'Sin ictericia si no se complica.'] },
      { t: 'def', term: 'Murphy', tono: 'peach', en: 2, text: 'Se presiona el **punto cístico** y se pide una inspiración profunda: el dolor **corta la inspiración**.' },
    ],
    examen: { origen: 'ortega', texto: 'El signo de Murphy en la colecistitis aguda.', cita: 'El signo de Murphy o la maniobra de Murphy la tienen que saber.', ref: V('19:04') },
    voz: [
      'La colecistitis aguda es la obstrucción del cístico por un cálculo, que aumenta la presión y termina inflamando la vesícula. Casi siempre es litiásica.',
      'La clínica: dolor en el hipocondrio derecho, fiebre, y el signo de Murphy positivo. Puede haber anorexia, náuseas y vómitos, y en el laboratorio, leucocitosis. Sin complicaciones, no hay ictericia.',
      'Y la maniobra de Murphy, que el profesor pide saber: se presiona el punto cístico y se le pide al paciente que inspire hondo. Al bajar el hígado, la vesícula inflamada choca contra los dedos, y el dolor corta la inspiración.',
    ],
    refs: [V('16:52'), V('18:24'), V('19:04'), L('386')],
  },
  {
    id: 't-complicaciones',
    sec: 'colecistitis',
    titulo: 'Complicaciones de la colecistitis',
    amplio: true,
    bloques: [
      { t: 'lista', items: ['**Perforación**, gangrena, peritonitis.', '**Fístulas** al intestino (íleo biliar), abscesos.'] },
      { t: 'def', term: 'Síndrome de Mirizzi', tono: 'gold', en: 1, text: 'La vesícula inflamada, con un cálculo en el cístico, **comprime el conducto hepático común**: ictericia obstructiva.' },
    ],
    examen: { origen: 'preguntero', texto: '¿Qué es el síndrome de Mirizzi?' },
    voz: [
      'La colecistitis puede complicarse con una perforación, una gangrena y una peritonitis, o con fístulas hacia el intestino, que pueden dar un íleo biliar, y abscesos.',
      'Y el síndrome de Mirizzi: la vesícula inflamada, con el cálculo impactado en el cístico, comprime desde afuera el conducto hepático común, y aparece una ictericia obstructiva.',
    ],
    refs: [V('04:35'), V('16:52'), V('17:35'), L('386')],
  },
  {
    id: 't-sin-ictericia',
    sec: 'ictericia',
    titulo: '¿Por qué la litiasis vesicular no da ictericia?',
    fig: { f: 'biliar', vistas: [{ calculo: 'vesicula', luz: { vesicula: 'gold', hepatico: 'mint', coledoco: 'mint' } }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', text: 'La vesícula **almacena**, no produce bilis: con cálculos en la vesícula, la bilis sigue bajando por el colédoco.' },
      { t: 'texto', en: 1, text: 'Hay ictericia cuando se **obstruye el colédoco** (o el hepático común).' },
      { t: 'lista', en: 2, items: ['Excepción: una colecistitis con **Mirizzi**.', 'O una colecistitis que inflama las vías biliares del hígado vecino.'] },
    ],
    examen: { origen: 'ortega', texto: 'Por qué no hay ictericia en la litiasis vesicular.', cita: '¿Por qué no hay ictericia en los pacientes que tienen litiasis vesicular? Y eso obviamente es pregunta de examen.', ref: V('10:26') },
    voz: [
      'La pregunta de examen: ¿por qué la litiasis vesicular no da ictericia? Porque la vesícula solo almacena la bilis, no la produce. Aunque tenga cálculos, la bilis del hígado sigue bajando por el colédoco al duodeno.',
      'Hay ictericia cuando se obstruye la vía biliar principal: el colédoco o el hepático común.',
      'Las excepciones son las complicaciones de la colecistitis: el Mirizzi, o una vesícula muy inflamada que compromete las vías biliares del hígado vecino.',
    ],
    refs: [V('09:41'), V('10:26'), V('11:08'), V('11:53'), V('12:36')],
  },
  {
    id: 't-ictericia-dolor',
    sec: 'ictericia',
    titulo: 'Ictericia con o sin dolor',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Con dolor', tono: 'gold', items: ['Patología **calculosa** de la vía biliar', 'Coledocolitiasis, colangitis, Mirizzi'] },
          { titulo: 'Sin dolor', tono: 'red', items: ['Pensar en **cáncer**: cabeza de páncreas', '**Courvoisier-Terrier**: ictericia progresiva, vesícula palpable indolora, pérdida de peso', '**Bard y Pick**: vesícula palpable indolora en un ictérico'] },
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'El signo de Bard y Pick y la ley de Courvoisier-Terrier.', cita: 'Lo tienen que saber para ahora lo que es el signo de Bard y Pick y lo que es la ley de Courvoisier-Terrier, que eso es pregunta de parcial.', ref: V('15:50') },
    voz: [
      'Otro dato importante. La ictericia con dolor apunta a la patología calculosa de la vía biliar: una coledocolitiasis, una colangitis, un Mirizzi.',
      'La ictericia sin dolor hace pensar en cáncer, sobre todo de la cabeza del páncreas. Y acá entran dos clásicos de parcial: la ley de Courvoisier-Terrier, ictericia progresiva con vesícula palpable no dolorosa y pérdida de peso, y el signo de Bard y Pick, esa vesícula palpable e indolora en un paciente ictérico.',
    ],
    refs: [V('14:41'), V('15:29'), V('15:50'), L('387')],
  },
  {
    id: 't-coledociano',
    sec: 'coledociano',
    titulo: 'Síndrome coledociano',
    fig: { f: 'biliar', vistas: [{ calculo: 'coledoco', dilata: ['hepatico', 'coledoco'], luz: { coledoco: 'gold', hepatico: 'gold' } }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', tono: 'gold', text: '**Ictericia + coluria + hipocolia o acolia**. Puede sumar prurito y fiebre.' },
      { t: 'texto', en: 1, text: 'No es una enfermedad del colédoco: es la tríada de **cualquier obstrucción** de la vía biliar principal.' },
      { t: 'lista', en: 2, items: ['Coledocolitiasis, parásitos (áscaris).', 'Disfunción del esfínter de Oddi.', 'Cáncer de páncreas, de vesícula o de vía biliar; adenopatías.'] },
    ],
    examen: { origen: 'ortega', texto: 'Qué es el síndrome coledociano.', cita: '¿Qué es síndrome coledociano? Pregunta de parcial. Esto sí, lo que estoy marcando aquí, sí o sí, como si fuese el Padre Nuestro, me lo saben.', ref: V('24:49') },
    voz: [
      'El síndrome coledociano, que el profesor pide como el Padre Nuestro: ictericia, coluria, e hipocolia o acolia. Puede sumar prurito, por las sales biliares, y fiebre, si hay infección.',
      'Ojo: no es una enfermedad del colédoco. Es la tríada que da cualquier obstrucción de la vía biliar principal.',
      'Las causas: un cálculo en el colédoco, parásitos como el áscaris, una disfunción del esfínter de Oddi, un cáncer de páncreas, de vesícula o de vía biliar, o adenopatías que comprimen.',
    ],
    refs: [V('17:35'), V('23:33'), V('24:18'), V('24:49'), V('25:03'), L('387')],
  },
  {
    id: 't-coledocolitiasis',
    sec: 'coledociano',
    titulo: 'Coledocolitiasis',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Un cálculo migra por el cístico y se impacta en el **colédoco**: la **complicación más frecuente** de la litiasis vesicular (≈ 15 %).' },
      { t: 'lista', en: 1, items: ['Da un **síndrome coledociano**.', 'En la ecografía: colédoco **> 10 mm** (normal, menos de 7 a 8).', 'Si se enclava abajo, en la ampolla o el Oddi: **colangitis** o **pancreatitis**.'] },
    ],
    examen: { origen: 'preguntero', texto: '¿Qué es la coledocolitiasis?' },
    voz: [
      'La coledocolitiasis es el cálculo que se escapó de la vesícula por el cístico y se impactó en el colédoco. Es la complicación más frecuente de la litiasis vesicular: alrededor del quince por ciento.',
      'Produce un síndrome coledociano. En la ecografía, el cálculo a veces no se ve, pero el colédoco está dilatado: más de diez milímetros, cuando lo normal es menos de siete u ocho.',
      'Y si el cálculo se enclava en la parte baja, en la ampolla de Vater o el esfínter de Oddi, puede dar sus dos complicaciones: la colangitis y la pancreatitis.',
    ],
    refs: [V('22:00'), V('25:45'), V('26:30'), L('387')],
  },
  {
    id: 't-colangitis',
    sec: 'coledociano',
    titulo: 'Colangitis: tríada de Charcot',
    amplio: true,
    bloques: [
      { t: 'clave', tono: 'red', text: '**Dolor en hipocondrio derecho + fiebre + ictericia**.' },
      { t: 'texto', en: 1, text: 'La bilis es estéril; detrás de una obstrucción, bacterias que **ascienden desde el duodeno** la infectan. **Emergencia médica**.' },
      { t: 'texto', en: 1, soloWeb: true, text: 'Péntada de Reynolds (colangitis grave): Charcot + hipotensión + alteración de la conciencia. Es de la bibliografía, no se da en clase.' },
    ],
    examen: { origen: 'preguntero', texto: '¿Qué es la colangitis? ¿Tríada de Charcot?' },
    voz: [
      'La colangitis tiene una tríada característica, la de Charcot: dolor en el hipocondrio derecho, fiebre e ictericia.',
      'La bilis normalmente es estéril; pero cuando queda estancada detrás de una obstrucción, bacterias que suben desde el duodeno la infectan. Es una emergencia médica, que necesita resolución inmediata.',
    ],
    refs: [V('26:30'), V('27:12'), L('387')],
  },
  {
    id: 't-pancreatitis-ampolla',
    sec: 'coledociano',
    titulo: 'Pancreatitis biliar y cáncer de la ampolla',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Pancreatitis biliar', tono: 'peach', text: 'Cálculo en la **ampolla de Vater** que obstruye el Wirsung. La litiasis es la causa más frecuente de pancreatitis.' },
      { t: 'def', term: 'Cáncer de la ampolla de Vater', tono: 'lilac', en: 1, text: '**Ictericia + dolor abdominal + hemorragia digestiva alta** (hematemesis, melena). Pérdida de peso.' },
      { t: 'texto', en: 1, soloWeb: true, text: 'Cirrosis biliar secundaria: por obstrucción prolongada de la vía biliar (más en tumores y estrecheces posquirúrgicas).' },
    ],
    voz: [
      'La pancreatitis biliar aparece cuando el cálculo se enclava en la ampolla de Vater y obstruye el conducto de Wirsung. La litiasis biliar es la causa más frecuente de pancreatitis.',
      'Y el cáncer de la ampolla de Vater tiene una tríada que da el profesor: ictericia, dolor abdominal y hemorragia digestiva alta, con vómitos con sangre y melena. Como todo cáncer, con pérdida de peso.',
    ],
    refs: [V('27:12'), V('28:37'), V('29:17'), L('387')],
  },
  {
    id: 't-lab',
    sec: 'estudios',
    titulo: 'Laboratorio',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Marcadores de **colestasis**: **fosfatasa alcalina**, **GGT** y **5′-nucleotidasa**.' },
      { t: 'lista', en: 1, items: ['**Leucocitosis** con desviación a la izquierda (colecistitis, colangitis).', 'Siempre también **hepatograma** y **amilasa**: no pedir solo los de colestasis.'] },
    ],
    examen: { origen: 'ortega', texto: 'Los marcadores de colestasis.', cita: '¿Cuáles son los marcadores de colestasis? Eso tienen que sabérselo.', ref: V('19:30') },
    voz: [
      'En el laboratorio, los marcadores de colestasis, que hay que saber: la fosfatasa alcalina, la gamma glutamil transpeptidasa y la cinco prima nucleotidasa.',
      'En la colecistitis y la colangitis hay leucocitosis con desviación a la izquierda. Y ante un dolor abdominal nunca se piden solo los marcadores de colestasis: también el hepatograma y la amilasa, para no pasar por alto una pancreatitis.',
    ],
    refs: [V('19:04'), V('19:30'), V('19:46'), L('386')],
  },
  {
    id: 't-eco',
    sec: 'estudios',
    titulo: 'Ecografía',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'El estudio de elección: **no invasiva**, diagnóstica en el **95 %**.' },
      { t: 'def', term: 'Cálculo', tono: 'mint', en: 1, text: 'Imagen **hiperecogénica con sombra acústica** posterior. Sin sombra: **pólipo** o **adenocarcinoma**.' },
      { t: 'def', term: 'Colecistitis', tono: 'red', en: 1, text: 'Pared engrosada, **doble pared**, líquido perivesicular.' },
      { t: 'def', term: 'Vía biliar', tono: 'gold', en: 2, text: 'Colédoco > 10 mm. Segundo estudio: **colangiorresonancia**.' },
    ],
    voz: [
      'La ecografía es el método de elección: no es invasiva y hace el diagnóstico en el noventa y cinco por ciento.',
      'El cálculo se ve como una imagen brillante que deja detrás una sombra acústica. Si hay una imagen sin sombra, hay que pensar en un pólipo o en un adenocarcinoma. En la colecistitis, la pared está engrosada, con doble contorno y líquido alrededor.',
      'Si el problema está en la vía biliar, se mide el colédoco; y el segundo estudio es la colangiorresonancia.',
    ],
    refs: [V('19:46'), V('20:37'), V('21:17'), V('22:00'), L('386')],
  },
  {
    id: 't-otros',
    sec: 'otros',
    titulo: 'Otras formas',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Qué es', 'Para recordar'],
        filas: [
          ['Colecistitis **crónica**', 'Fibrosis y engrosamiento por cálculos o colecistitis repetidas', '**Vesícula en porcelana**: riesgo de adenocarcinoma → se opera'],
          ['Colecistitis **alitiásica**', 'Necroinflamación **sin cálculo** (10 %)', 'Pacientes **críticos** (quemados, sepsis, ARM, nutrición parenteral); mortalidad alta'],
          ['**Pólipos**', 'Hallazgo ecográfico, sin sombra acústica', 'Pueden malignizarse (> 1 cm, sospechar)'],
          ['**Cáncer** de vesícula', 'Adenocarcinoma, en el fondo', 'Asociado a litiasis y vesícula en porcelana'],
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Colecistitis aguda alitiásica y colecistitis crónica.' },
    voz: [
      'Y otras formas, que el profesor menciona para que existan. La colecistitis crónica: la vesícula se fibrosa y se engrosa; una de sus formas es la vesícula en porcelana, con riesgo de adenocarcinoma, por eso se opera.',
      'La colecistitis alitiásica es una inflamación sin cálculo, alrededor del diez por ciento, que aparece en pacientes críticos: quemados, sépticos, con respirador o nutrición parenteral. Tiene una mortalidad alta.',
      'Los pólipos son hallazgos de la ecografía, sin sombra acústica, y pueden malignizarse. Y el cáncer de vesícula es en general un adenocarcinoma del fondo, asociado a la litiasis.',
    ],
    refs: [V('22:48'), V('27:12'), V('27:56'), V('28:37'), L('386'), L('387'), L('388')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'conceptos', label: 'El cálculo' },
    { id: 'colecistitis', label: 'Cólico y colecistitis' },
    { id: 'ictericia', label: '¿Ictericia?' },
    { id: 'coledociano', label: 'Vía biliar' },
    { id: 'estudios', label: 'Estudios' },
    { id: 'otros', label: 'Otras formas' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'clase',
    titulo: 'Cálculos y ningún síntoma',
    texto: 'En una ecografía pedida por un control, a una persona joven le encuentran varios cálculos en la vesícula. Nunca tuvo dolor.',
    pregunta: '¿Qué tiene?',
    opciones: [
      { text: 'Litiasis vesicular asintomática.', why: 'Los cálculos no se impactaron en el cístico: no duelen.' },
      { text: 'Colecistitis crónica.', why: 'Es un hallazgo histológico; no hay datos.' },
      { text: 'Coledocolitiasis.', why: 'Daría síndrome coledociano.' },
      { text: 'Cólico biliar.', why: 'No tuvo dolor.' },
    ],
    correcta: 0,
    razonamiento: 'El profesor lo ejemplifica consigo mismo: se pueden tener cálculos en la vesícula y estar perfecto, hasta que uno se impacta en el cístico.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Mujer de 42 años después de un asado',
    texto: 'Mujer obesa, de 42 años, con tres hijos. Desde hace 10 horas tiene dolor en el hipocondrio derecho irradiado al hombro derecho, fiebre de 38,5 °C y vómitos. Al presionar el punto cístico e inspirar, corta la respiración. No está ictérica.',
    pregunta: '¿Qué tiene?',
    opciones: [
      { text: 'Colecistitis aguda litiásica.', why: 'Dolor persistente, fiebre y Murphy positivo, sin ictericia.' },
      { text: 'Cólico biliar simple.', why: 'El cólico no da fiebre ni dura tanto.' },
      { text: 'Colangitis.', why: 'Faltaría la ictericia.' },
      { text: 'Síndrome coledociano.', why: 'No hay ictericia, coluria ni acolia.' },
    ],
    correcta: 0,
    razonamiento: 'Las 4 F, un cálculo impactado en el cístico: vesícula inflamada (Murphy +), con el colédoco libre (sin ictericia).',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'Ictericia, fiebre y escalofríos',
    texto: 'Hombre de 65 años con litiasis conocida. Tiene dolor en el hipocondrio derecho, fiebre con escalofríos, ictericia, orina oscura y heces claras. La ecografía muestra un colédoco de 13 mm.',
    pregunta: '¿Qué tiene?',
    opciones: [
      { text: 'Colangitis por coledocolitiasis (tríada de Charcot): emergencia.', why: 'Dolor, fiebre e ictericia con colédoco dilatado.' },
      { text: 'Colecistitis no complicada.', why: 'No daría ictericia ni colédoco dilatado.' },
      { text: 'Cáncer de cabeza de páncreas.', why: 'Daría ictericia indolora.' },
      { text: 'Hepatitis viral.', why: 'El colédoco dilatado indica obstrucción.' },
    ],
    correcta: 0,
    razonamiento: 'Cálculo en el colédoco (> 10 mm) con bilis infectada: síndrome coledociano + fiebre = colangitis.',
  },
  {
    id: 'c4',
    origen: 'practica',
    titulo: 'Ictericia que no duele',
    texto: 'Hombre de 70 años con ictericia progresiva desde hace dos meses, prurito y 9 kg de pérdida de peso. Sin dolor. Se palpa una vesícula grande e indolora.',
    pregunta: '¿Qué sospecha?',
    opciones: [
      { text: 'Cáncer de la cabeza del páncreas (Courvoisier-Terrier).', why: 'Ictericia progresiva indolora, vesícula palpable y pérdida de peso.' },
      { text: 'Coledocolitiasis.', why: 'Daría dolor y una vesícula fibrosada que no se palpa.' },
      { text: 'Síndrome de Mirizzi.', why: 'Es una complicación dolorosa de la colecistitis.' },
      { text: 'Litiasis asintomática.', why: 'No explica la ictericia.' },
    ],
    correcta: 0,
    razonamiento: 'Ictericia sin dolor: pensar en cáncer. La vesícula sana se distiende con la obstrucción lenta.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'ves',
        label: 'Vesícula',
        tone: 'gold',
        nota: 'Almacena la bilis: sus cálculos no dan ictericia',
        hijos: [
          { id: 'lit', label: 'Colelitiasis', tone: 'gold', examen: true, nota: '**4 F** · asintomática (85 %) · **cólico biliar**: cardinal, sin fiebre' },
          { id: 'col', label: 'Colecistitis aguda', tone: 'red', examen: true, nota: 'Cálculo impactado en el cístico · fiebre · **Murphy** · complicación: **Mirizzi**' },
          { id: 'otr', label: 'Otras', tone: 'lilac', nota: 'Crónica (porcelana) · alitiásica (críticos) · pólipos · cáncer' },
        ],
      },
      {
        id: 'via',
        label: 'Vía biliar principal',
        tone: 'peach',
        examen: true,
        nota: 'Su obstrucción da ictericia',
        hijos: [
          { id: 'sco', label: 'Síndrome coledociano', tone: 'gold', examen: true, nota: '**Ictericia + coluria + hipocolia/acolia** · cualquier obstrucción' },
          { id: 'cdl', label: 'Coledocolitiasis', tone: 'peach', nota: 'Complicación más frecuente · colédoco > 10 mm' },
          { id: 'cha', label: 'Colangitis', tone: 'red', examen: true, nota: '**Charcot**: dolor + fiebre + ictericia · emergencia' },
          { id: 'tum', label: 'Sin dolor', tone: 'lilac', examen: true, nota: 'Cáncer de cabeza de páncreas · **Courvoisier-Terrier**, **Bard y Pick**' },
        ],
      },
    ],
    nexos: ['**Cálculo en la vesícula:** sin ictericia.', '**Ictericia sin dolor:** pensar en cáncer.'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['dig11-d01', 'dig11-d02', 'dig11-d03', 'dig11-d04'],
  anclas: {
    ubicate: { tab: 'mapa' },
    conceptos: { tab: 'teoria', seccion: 'conceptos' },
    colecistitis: { tab: 'teoria', seccion: 'colecistitis' },
    ictericia: { tab: 'teoria', seccion: 'ictericia' },
    coledociano: { tab: 'teoria', seccion: 'coledociano' },
    estudios: { tab: 'teoria', seccion: 'estudios' },
    otros: { tab: 'teoria', seccion: 'otros' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    maniobras: { tab: 'maniobras' },
    integracion: { tab: 'cierre' },
  },
};
