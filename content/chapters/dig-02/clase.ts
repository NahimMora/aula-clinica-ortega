import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * dig-02: clase visual. Jerarquía de fuentes:
 *  1. Clases de Ortega (MC Digestivo 2, 3, 4 y Examen físico 1): qué se estudia.
 *  2. Libro de Clínica Médica de Ortega (p. 2–3, 86, 360, 377, 409): aclaraciones.
 *  3. Argente-Álvarez (cap. 39-4, p. 650–651; cap. 42-4, p. 696–697): solo mecanismos que la clase no explica.
 *  4. Preguntero: orienta los avisos marcados como «preguntero».
 * «❗ Dr. Ortega» solo aparece cuando él lo dice como pregunta de examen.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const M2 = (t: string) => r('mc-dig-2', t);
const M3 = (t: string) => r('mc-dig-3', t);
const M4 = (t: string) => r('mc-dig-4', t);
const EF1 = (t: string) => r('ef-dig-1', t);
const L = (p: string) => r('libro', undefined, p);
const A = (p: string) => r('argente-libro', undefined, p);

const ARG = 'Argente-Álvarez';
const GRAL = 'Fisiología general, no se da en la clase.';

const IMG = 'media/dig-02/img/';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-via',
    sec: 'senal',
    titulo: 'Del estímulo a la corteza',
    etapas: ['normal'],
    fig: { f: 'via-dolor' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'lista',
        items: [
          'El **nociceptor** es una terminal nerviosa libre: responde a estímulos mecánicos, térmicos o químicos.',
          'En el **asta dorsal** la primera neurona libera **sustancia P y glutamato**.',
          'El axón **cruza** por la comisura gris anterior y sube por la **vía espinotalámica**.',
          'Del **tálamo** a la **corteza**: recién ahí se percibe.',
        ],
      },
    ],
    aclara: { text: 'El cuerpo de la primera neurona está en el **ganglio de la raíz posterior**. Por eso una lesión cruzada de la médula altera el dolor del lado opuesto: la vía ya cruzó.', origen: 'Libro de Clínica Médica, p. 2.' },
    voz: [
      'Antes de hablar de abdomen, veamos cómo funciona el dolor. Todo empieza en el nociceptor, que no es más que una terminal nerviosa libre. Responde a tres tipos de estímulo: mecánico, térmico o químico.',
      'Esa señal llega a la médula por la raíz posterior. En el asta dorsal, la primera neurona hace sinapsis y libera dos neurotransmisores: sustancia P y glutamato.',
      'La segunda neurona cruza al lado opuesto por la comisura gris anterior, y sube por el cordón anterolateral. Es la vía espinotalámica.',
      'Termina en el tálamo, y de ahí a la corteza. Recién en ese momento el estímulo se convierte en dolor.',
    ],
    refs: [L('2')],
  },
  {
    id: 'f-fibras',
    sec: 'senal',
    titulo: 'Dos fibras, dos dolores',
    etapas: ['normal'],
    fig: { f: 'fibras' },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Fibras Aδ', tono: 'rose', text: 'Mielínicas, gruesas, rápidas. Suben por la vía **neoespinotalámica**: dolor fino y agudo.' },
      { t: 'def', term: 'Fibras C', tono: 'sky', en: 1, text: 'Amielínicas, delgadas, lentas. Inervación dolorosa **visceral**; vía **paleoespinotalámica**, multisináptica.' },
    ],
    aclara: { text: 'La diferencia de velocidad es de diez veces. Eso explica por qué un dolor somático arranca bruscamente y uno visceral aparece tarde y con límites borrosos.', origen: 'Libro de Clínica Médica, p. 2.' },
    voz: [
      'El dolor viaja por dos cables distintos. Las fibras A delta son mielínicas: conducen rápido, unos veinte metros por segundo, y dan un dolor agudo, punzante, de límites precisos.',
      'Las fibras C no tienen mielina y conducen unas diez veces más lento. Son las que predominan en las vísceras. Por eso el dolor visceral es vago y tardío.',
    ],
    refs: [L('2')],
  },
  {
    id: 'f-hojas',
    sec: 'senal',
    titulo: 'La pared y sus dos hojas',
    etapas: ['normal'],
    fig: { f: 'pared', luz: 'ambas', inerv: true },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Peritoneo parietal', tono: 'rose', text: 'Tapiza la pared por dentro. Lo inervan **nervios espinales de D7 a L1**.' },
      { t: 'def', term: 'Peritoneo visceral', tono: 'sky', en: 1, text: 'Envuelve los órganos. Sus aferentes viajan **junto con los nervios simpáticos**.' },
    ],
    aclara: { text: 'Toda la semiología del capítulo sale de esta diferencia: cada hoja manda la señal por un camino distinto.', origen: `Inervación: ${ARG}, p. 650. Las hojas: clase, min 34:07.` },
    voz: [
      'Ahora la anatomía que necesitás. Por dentro de la pared está el peritoneo parietal. Lo inervan nervios espinales, de dorsal siete a lumbar uno, igual que a la piel.',
      'Pegado a los órganos está el peritoneo visceral. Sus fibras, en cambio, viajan con los nervios simpáticos. Son dos cables distintos para dos hojas distintas.',
    ],
    refs: [M2('34:07'), A('650')],
  },
  {
    id: 'f-visceral',
    sec: 'tipos',
    titulo: 'Dolor visceral: qué lo dispara',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'viscera' },
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'La víscera hueca se **estira o se contrae**, el órgano macizo **distiende su cápsula**, o hay **isquemia** o **inflamación**.' },
          { k: 'mecanismo', text: 'Se activan receptores de la **capa muscular** y de la cápsula; la señal viaja por **fibras C**.' },
          { k: 'signo', text: 'Dolor **sordo, tardío y mal localizado**, a veces percibido lejos del órgano.' },
        ],
      },
    ],
    aclara: { text: 'La pared intestinal casi no duele al cortarla, pero sí al distenderla: por eso el cólico aparece cuando el intestino se estira contra un obstáculo.', origen: `Estímulos: ${ARG}, p. 650. Corte: ${GRAL}` },
    voz: [
      'El dolor visceral no se dispara por cortar, sino por estirar. Puede estirarse la pared de un órgano hueco, como en una obstrucción, o la cápsula de un órgano macizo, como en la hepatitis. También lo produce la isquemia o la inflamación.',
      'Los receptores están en la capa muscular y en la cápsula. La señal sale por fibras C.',
      'El resultado es un dolor sordo, que tarda en aparecer y que el paciente no puede señalar con precisión.',
    ],
    refs: [A('650'), L('2')],
  },
  {
    id: 'f-bilateral',
    sec: 'tipos',
    titulo: 'Por qué uno se localiza y el otro no',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'entrada' },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Visceral', tono: 'sky', text: 'Sus fibras entran a la médula **de ambos lados**: el dolor cae en la **línea media**.' },
      { t: 'def', term: 'Somático', tono: 'rose', en: 1, text: 'Nervios segmentarios de **un solo lado**: el dolor está **en el sitio de la lesión**.' },
    ],
    aclara: { text: 'No hace falta memorizar «visceral = mal localizado»: si la señal entra por ambos lados, el cerebro solo puede ubicarla en el medio.', origen: `${ARG}, p. 650.` },
    voz: [
      'Y acá está la clave de por qué el dolor visceral es mal localizado. Sus fibras ingresan a la médula en forma bilateral. El cerebro recibe la señal de los dos lados, y la ubica en la línea media.',
      'El somático funciona distinto: un nervio segmentario, de un solo lado. Por eso el paciente lo señala con un dedo.',
    ],
    refs: [A('650')],
  },
  {
    id: 'f-somatico',
    sec: 'tipos',
    titulo: 'Dolor somático: cuando llega al parietal',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'pared', luz: 'parietal', inerv: true },
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'El estímulo inflamatorio alcanza el **peritoneo parietal**: bacteriano (peritonitis) o químico (jugo gástrico).' },
          { k: 'mecanismo', text: 'Se activan **nervios espinales D7–L1**, con fibras rápidas y segmentarias.' },
          { k: 'signo', text: 'Dolor **intenso, brusco y localizado**, que empeora con el movimiento, la tos y la respiración.' },
        ],
      },
    ],
    aclara: { text: 'Por eso el paciente con peritonitis se queda **inmóvil**: cada movimiento desplaza una hoja irritada y dispara ese nervio.', origen: `${ARG}, p. 650. Paciente inmóvil: clase, min 03:44.` },
    voz: [
      'Cuando la inflamación llega al peritoneo parietal, todo cambia. El estímulo puede ser bacteriano, en una peritonitis, o químico, como el jugo gástrico de una úlcera perforada.',
      'Ahora se activan nervios espinales, rápidos y segmentarios.',
      'El dolor es intenso, brusco y localizado. Y empeora con cualquier cosa que mueva el peritoneo: caminar, toser, incluso respirar. Por eso este paciente no se mueve.',
    ],
    refs: [A('650'), M4('03:44')],
  },
  {
    id: 'f-referido',
    sec: 'tipos',
    titulo: 'Dolor referido: la convergencia',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'convergencia' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'mecanismo', text: 'Las aferentes de una víscera y las de la piel **convergen en la misma neurona** del asta dorsal.' },
          { k: 'mecanismo', text: 'El cerebro no distingue por qué axón entró el estímulo.' },
          { k: 'signo', text: 'Proyecta la sensación **a la piel** de ese segmento.' },
        ],
      },
    ],
    aclara: { text: 'El infarto de cara inferior comparte segmentos con el epigastrio: por eso puede simular una úlcera. De ahí la regla del electrocardiograma.', origen: `${ARG}, p. 650. Ejemplo: clase, min 04:27.` },
    voz: [
      'El dolor referido se explica por una convergencia. En el asta dorsal, una fibra que viene de la víscera y otra que viene de la piel terminan en la misma neurona.',
      'Esa neurona manda un único mensaje hacia arriba.',
      'El cerebro no puede saber por cuál de los dos axones entró.',
      'Y como está acostumbrado a recibir señales de la piel, proyecta la sensación ahí. Por eso un infarto de cara inferior puede doler en el epigastrio.',
    ],
    refs: [A('650'), M3('04:27')],
  },
  {
    id: 'f-apendicitis',
    sec: 'tipos',
    titulo: 'Apendicitis: un dolor que cambia de mecanismo',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: {
      f: 'abdomen',
      colon: true,
      idp: 'f-ap',
      vistas: [
        { luz: { epi: 'sky', umb: 'sky' } },
        { luz: { epi: 'sky', umb: 'sky' }, ruta: ['epi', 'umb'], rutaTone: 'sky' },
        { luz: { fid: 'rose' }, ruta: ['epi', 'umb', 'fid'], rutaTone: 'rose' },
        { luz: { fid: 'rose' }, puntos: [{ p: 'mcburney', tone: 'rose' }], ruta: ['epi', 'umb', 'fid'], rutaTone: 'rose' },
      ],
    },
    anchoFig: 'chica',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Un **fecalito** obstruye la luz y la pared del apéndice se distiende.' },
          { k: 'mecanismo', text: 'Receptores de la pared, **fibras viscerales**: se percibe en el **epigastrio**.' },
          { k: 'alteracion', text: 'La inflamación se hace **transmural** y toca el **peritoneo parietal**.' },
          { k: 'signo', text: 'El dolor cambia: **intenso, en fosa ilíaca derecha**, con contractura localizada.' },
        ],
      },
    ],
    aclara: { text: 'El apéndice no cambia de lugar: **cambia la hoja que está irritada**. En clase se lo llama dolor referido; en sentido estricto es dolor visceral percibido en la línea media.', origen: `${ARG}, p. 650. Clase, min 22:31.` },
    voz: [
      'La apendicitis es el mejor ejemplo para entender todo esto junto. Empieza con un fecalito que obstruye la luz, y la pared del apéndice se distiende.',
      'Esa distensión activa fibras viscerales. Y el dolor no aparece en la fosa ilíaca, sino en el epigastrio, porque es un dolor visceral en la línea media.',
      'Con las horas, la inflamación atraviesa toda la pared y llega al peritoneo parietal.',
      'Ahí el dolor cambia de carácter y se instala en la fosa ilíaca derecha. El apéndice nunca se movió: lo que cambió fue la hoja irritada.',
    ],
    refs: [A('650'), M3('22:31')],
  },
  {
    id: 'f-maniobra',
    sec: 'irritacion',
    titulo: 'Comprimir y soltar: qué estás explorando',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'pared', mano: true, fases: ['reposo', 'comprimir', 'soltar'] },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Al comprimir', tono: 'sky', en: 1, text: 'Presionás el órgano y su **hoja visceral**.' },
      { t: 'def', term: 'Al soltar', tono: 'rose', en: 2, text: 'La pared vuelve de golpe y arrastra la **hoja parietal**. Si está irritada, duele más.' },
    ],
    aclara: { text: 'Si duele al comprimir pero no al soltar, solo está irritada la hoja visceral. Si duele en las dos, están comprometidas ambas.', origen: 'Clase, min 03:46 y 06:38.' },
    voz: [
      'Ahora llevá eso a la mano. Mirá lo que pasa cuando palpás.',
      'Al comprimir despacio, presionás el órgano y su hoja visceral. Si le duele, esa hoja está irritada.',
      'Al soltar de golpe, la pared vuelve bruscamente y arrastra el peritoneo parietal. Si le duele más que cuando apretabas, la hoja parietal está comprometida. Ese es el signo del rebote.',
    ],
    refs: [M3('03:46'), M3('06:38')],
  },
  {
    id: 'f-contractura',
    sec: 'irritacion',
    titulo: 'Por qué se endurece el abdomen',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'arco-reflejo' },
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'El peritoneo parietal está **irritado**.' },
          { k: 'mecanismo', text: 'La aferente espinal activa la motoneurona: **espasmo reflejo** de los músculos de la pared.' },
          { k: 'signo', text: '**Contractura involuntaria**: en la perforación, abdomen en tabla.' },
        ],
      },
    ],
    aclara: { text: 'Es un reflejo: el paciente no puede relajarlo aunque quiera. Esa es la diferencia con la defensa, que es voluntaria.', origen: `Reflejo: ${ARG}, p. 650. Contractura y defensa: clase, min 02:13.` },
    voz: [
      'Y por qué se pone duro el abdomen. El peritoneo parietal irritado manda su señal por el nervio espinal.',
      'Esa señal, en la médula, activa directamente la motoneurona de los músculos de la pared. Es un espasmo reflejo.',
      'El resultado es una contractura involuntaria. El paciente no puede aflojarla aunque quiera. En una perforación, ese es el abdomen en tabla.',
    ],
    refs: [A('650'), M4('02:13')],
  },
  {
    id: 'f-peristaltismo',
    sec: 'intestino',
    titulo: 'El intestino normal',
    etapas: ['normal'],
    fig: { f: 'intestino', modo: 'normal' },
    anchoFig: 'grande',
    bloques: [
      { t: 'texto', text: 'Las ondas de **peristaltismo** empujan el contenido y el gas hacia abajo.' },
      { t: 'texto', en: 1, text: 'Ese movimiento de líquido y aire es lo que auscultás: los **ruidos hidroaéreos**.' },
    ],
    voz: [
      'Veamos el intestino. En condiciones normales, las ondas de peristaltismo empujan el contenido hacia abajo.',
      'El contenido se mezcla con gas, y esa mezcla en movimiento es lo que escuchás con el estetoscopio. Son los ruidos hidroaéreos.',
    ],
    refs: [M3('29:21')],
  },
  {
    id: 'f-lucha',
    sec: 'intestino',
    titulo: 'Obstáculo: el intestino lucha',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'intestino', modo: 'obstaculo' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Un **obstáculo** impide el paso del bolo.' },
          { k: 'mecanismo', text: 'Sube la **presión intraluminal** y aumenta el **peristaltismo** por arriba.' },
          { k: 'signo', text: 'Dolor **cólico**, ruidos **de lucha**; lo que no baja, **sube: vómitos**.' },
          { k: 'signo', text: 'Por abajo: **sin gases ni heces**, ruidos disminuidos.' },
        ],
      },
    ],
    aclara: { text: 'Si se supera la resistencia elástica de la pared, el asa se relaja y el dolor pasa a ser **continuo**. Si se compromete la irrigación, aparecen signos peritoneales.', origen: `${ARG}, p. 697; Libro, p. 377.` },
    voz: [
      'Ahora poné un obstáculo: un tumor, una brida, una hernia. El contenido no puede pasar.',
      'Por arriba del obstáculo sube la presión, y el intestino aumenta su peristaltismo para tratar de vencerlo. Cada contracción es un cólico. Y lo que escuchás son los ruidos de lucha.',
      'Lo que no puede bajar, sube. Por eso todo síndrome obstructivo se acompaña de vómitos.',
      'Y por debajo del obstáculo no llega nada: no hay gases, no hay materia fecal, y los ruidos disminuyen.',
    ],
    refs: [M3('29:21'), M3('32:43'), M3('33:24'), A('697'), L('377')],
  },
  {
    id: 'f-paralitico',
    sec: 'intestino',
    titulo: 'Íleo paralítico: sin obstáculo, sin movimiento',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'intestino', modo: 'asa' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Un órgano inflamado **irrita** el intestino vecino.' },
          { k: 'mecanismo', text: 'Se detiene el peristaltismo de ese tramo; el gas se acumula.' },
          { k: 'signo', text: 'Localizado: **asa centinela**. Generalizado: peritonitis o perforación, abdomen **silencioso**.' },
        ],
      },
    ],
    voz: [
      'El otro extremo es el íleo paralítico. No hay ningún obstáculo: el intestino simplemente deja de moverse. Un órgano inflamado irrita las asas vecinas.',
      'Se detiene el peristaltismo en ese segmento, y el gas se acumula.',
      'Si afecta un tramo cerca del órgano inflamado, se llama asa centinela. Si es generalizado, pensá en peritonitis o perforación: un abdomen silencioso.',
    ],
    refs: [M3('26:38'), M4('27:30')],
  },
  {
    id: 'f-aire',
    sec: 'cavidad',
    titulo: 'Si se perfora: el aire sube',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'cavidad', modo: 'aire' },
    anchoFig: 'chica',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Se perfora una **víscera hueca** y el gas sale a la cavidad.' },
          { k: 'mecanismo', text: 'El gas **asciende** y se ubica bajo el diafragma, sobre el hígado.' },
          { k: 'signo', text: 'Donde debía haber matidez se percute **timpanismo**.' },
        ],
      },
    ],
    aclara: { text: 'El hígado normalmente suena mate porque es un órgano macizo. El gas se interpone entre la pared y el hígado, y tapa ese sonido.', origen: 'Clase, min 05:09–05:54; Libro, p. 86.' },
    voz: [
      'Pasemos a lo que ocupa la cavidad. Cuando se perfora una víscera hueca, el gas que tenía adentro se escapa al peritoneo.',
      'Y el gas flota. Sube, y se ubica debajo del diafragma, justo por encima del hígado.',
      'El hígado es macizo y suena mate. Pero ahora hay gas interpuesto: al percutir, donde tendría que haber matidez, escuchás timpanismo.',
    ],
    refs: [M4('05:09'), M4('05:54'), L('86')],
  },
  {
    id: 'f-peritonitis',
    sec: 'cavidad',
    titulo: 'Qué contenido irrita el peritoneo',
    etapas: ['alteracion', 'mecanismo'],
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Perforación gástrica', tono: 'peach', items: ['Contenido **ácido**, con pocos gérmenes', 'Inflamación **química** al principio', 'Si el pH sube por enfermedad o medicación, predomina la infección'] },
          { titulo: 'Perforación colónica', tono: 'red', items: ['En el sigmoides, alrededor de **10¹¹ bacterias** por gramo', 'Infección **polimicrobiana**, aerobios y anaerobios', 'Peritonitis **secundaria** franca'] },
        ],
      },
      { t: 'clave', en: 2, text: 'Cuanto más distal la perforación, mayor la carga bacteriana.' },
    ],
    voz: [
      'No todas las perforaciones contaminan igual. En el estómago, el contenido es ácido y tiene pocos gérmenes: al principio la inflamación es química.',
      'En el colon la situación es otra: en el sigmoides hay del orden de diez a la once bacterias por gramo de materia fecal. La infección es polimicrobiana.',
      'La regla es simple: cuanto más distal la perforación, mayor la carga bacteriana.',
    ],
    refs: [A('651')],
  },
  {
    id: 'f-sangre',
    sec: 'cavidad',
    titulo: 'Si sangra: la sangre cae',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'cavidad', modo: 'sangre' },
    anchoFig: 'chica',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Se rompe un **vaso u órgano** y la sangre sale a la cavidad.' },
          { k: 'mecanismo', text: 'Cae a las partes **declives** y **desplaza al aire**.' },
          { k: 'signo', text: 'A la percusión: **matidez**.' },
        ],
      },
    ],
    aclara: { text: 'El abdomen duele pero queda **blando**: la sangre irrita menos el peritoneo que el contenido intestinal, por eso no genera el espasmo de la perforación.', origen: `Abdomen blando: clase, min 12:24. Explicación: ${GRAL}` },
    voz: [
      'Con la sangre pasa exactamente lo contrario. Se rompe un vaso o un órgano, y la sangre sale a la cavidad.',
      'La sangre no sube: cae. Se acumula en las partes declives y desplaza el aire de las asas.',
      'Por eso al percutir encontrás matidez. Aire arriba, timpanismo. Sangre abajo, matidez.',
    ],
    refs: [M4('07:25'), M4('11:43'), M4('12:24')],
  },
  {
    id: 'f-hipovolemia',
    sec: 'cavidad',
    titulo: 'El cuerpo compensa la pérdida',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'hipovolemia' },
    bloques: [
      {
        t: 'lista',
        items: [
          'Cae la volemia: **taquicardia** para sostener el gasto, e **hipotensión** cuando ya no alcanza.',
          'Se redistribuye el flujo: **frialdad y sudoración**.',
          'Baja la perfusión renal: **oliguria**.',
          'No llega sangre al sistema nervioso central: **alteración de la conciencia**.',
        ],
      },
    ],
    aclara: { text: 'En el hemorrágico no se espera fiebre: el paciente tiende a la **hipotermia**.', origen: 'Clase, min 18:38–19:19.' },
    voz: [
      'Mientras tanto, el paciente se está desangrando. Cae la volemia, y el corazón se acelera para sostener el gasto. Cuando no alcanza, aparece la hipotensión.',
      'El organismo redistribuye la sangre hacia los órganos vitales: la piel se pone fría y sudorosa.',
      'Disminuye la perfusión renal, y el paciente deja de orinar.',
      'Y cuando no llega suficiente sangre al sistema nervioso central, se altera la conciencia.',
    ],
    refs: [M4('07:25'), M4('08:10')],
  },
  {
    id: 'f-isquemia',
    sec: 'isquemia',
    titulo: 'Isquemia mesentérica: el intestino se muere',
    etapas: ['normal', 'alteracion', 'mecanismo', 'signo'],
    fig: { f: 'mesenterica' },
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'normal', text: 'La **mesentérica superior** irriga el intestino.' },
          { k: 'alteracion', text: 'Una **oclusión** corta el flujo.' },
          { k: 'mecanismo', text: 'Sin oxígeno, el tejido produce **lactato** y sufre.' },
          { k: 'signo', text: 'El intestino se **infarta**, deja escapar **bacterias**: shock séptico y falla multiorgánica.' },
        ],
      },
    ],
    aclara: { text: 'Al principio solo sufre la víscera: por eso hay **mucho dolor y un examen casi normal**. Los signos peritoneales llegan cuando el daño ya es transmural.', origen: `Evolución: clase, min 15:11–15:51. Dolor desproporcionado: ${GRAL}` },
    voz: [
      'El último mecanismo. La arteria mesentérica superior lleva la sangre al intestino.',
      'Si una trombosis o una embolia la ocluye, el flujo se corta.',
      'El tejido sin oxígeno pasa a metabolismo anaerobio y produce lactato. Por eso se pide en sangre.',
      'Si no se resuelve, el intestino se infarta. Y esa barrera, que contenía a la flora intestinal, deja de existir: las bacterias pasan a la sangre, y el paciente muere por shock séptico y falla multiorgánica.',
    ],
    refs: [M4('13:04'), M4('13:47'), M4('15:11'), M4('16:32')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'senal', label: 'La señal del dolor' },
    { id: 'tipos', label: 'Por qué duele distinto' },
    { id: 'irritacion', label: 'Rebote y contractura' },
    { id: 'intestino', label: 'El intestino' },
    { id: 'cavidad', label: 'Aire y sangre' },
    { id: 'isquemia', label: 'Isquemia' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  /* ──────── Tipos de dolor ──────── */
  {
    id: 't-sindrome',
    sec: 'dolor',
    titulo: 'Abdomen agudo: qué es',
    fig: { f: 'abdomen', idp: 't-def', vistas: [{ luz: { epi: 'rose', umb: 'rose', fid: 'rose', hd: 'rose', hi: 'rose', fd: 'rose', fi: 'rose', hipo: 'rose', fii: 'rose' } }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', text: 'Un **síndrome** cuyo síntoma cardinal es el **dolor abdominal**, con o sin otros signos y síntomas.' },
      { t: 'lista', en: 1, items: ['**No incluye** la exacerbación aguda de un dolor crónico, como el del cáncer de páncreas.', 'Puede ser secundario a un proceso **extraabdominal**: cardíaco o pulmonar.', '«En la guardia veo 4 o 5 por día»: **no todo dolor abdominal es abdomen agudo**.'] },
    ],
    examen: { origen: 'preguntero', texto: '¿Qué es el abdomen agudo? ¿Cuál es su síntoma característico?' },
    voz: [
      'Vamos con la teoría. El abdomen agudo es un síndrome, un conjunto de signos y síntomas, cuyo síntoma cardinal es el dolor abdominal. Puede o no venir acompañado de otros síntomas.',
      'Ojo con la definición: no incluye la reagudización de un dolor crónico. Un paciente con cáncer de páncreas que tiene un pico de dolor no tiene un abdomen agudo.',
      'Y muchas veces el origen ni siquiera está en el abdomen: puede ser cardíaco o pulmonar.',
      'Es un motivo de consulta muy frecuente. El profesor ve cuatro o cinco por guardia.',
    ],
    refs: [M2('32:03'), M2('32:45'), M2('33:25')],
  },
  {
    id: 't-visceral',
    sec: 'dolor',
    titulo: 'Dolor visceral',
    fig: { f: 'pared', luz: 'visceral' },
    bloques: [
      { t: 'def', term: 'Cuándo aparece', tono: 'sky', text: 'Cuando el órgano interno se inflama y compromete el **peritoneo visceral**.' },
      { t: 'lista', en: 1, items: ['**Mal localizado**, impreciso, lejos del sitio de origen.', 'Carácter variable: sordo, urente.', 'Al examen: **duele a la compresión**.'] },
    ],
    aclara: { text: 'Mal localizado porque sus fibras entran a la médula de ambos lados: lo viste en Fisiopatología.' },
    voz: [
      'Son dos tipos de dolor, aunque decimos tres. El primero es el visceral: aparece cuando se inflama un órgano y se compromete su peritoneo visceral.',
      'El paciente no puede decir exactamente dónde le duele.',
      'Puede tener características diversas.',
      'Y al examen físico lo reconocés porque duele cuando comprimís.',
    ],
    refs: [M2('34:07'), M2('34:47'), M3('01:31'), M3('02:15')],
  },
  {
    id: 't-somatico',
    sec: 'dolor',
    titulo: 'Dolor somático',
    fig: { f: 'pared', luz: 'parietal' },
    bloques: [
      { t: 'def', term: 'Cuándo aparece', tono: 'rose', text: 'Cuando se compromete el **peritoneo parietal**, en general en forma secundaria al visceral.' },
      { t: 'lista', en: 1, items: ['**Bien localizado**: el paciente señala el punto.', 'Se intensifica o calma con ciertas posiciones.', 'Puede acompañarse de **contractura o defensa**.', 'Al examen: **duele a la descompresión**.'] },
    ],
    voz: [
      'El segundo es el somático. Aparece cuando la inflamación del peritoneo visceral llega secundariamente al parietal.',
      'Acá el paciente te señala el punto exacto.',
      'El dolor cambia con la posición.',
      'Puede acompañarse de contractura o defensa abdominal.',
      'Y lo identificás a la palpación: duele cuando descomprimís.',
    ],
    refs: [M2('34:47'), M3('02:15'), M3('02:59')],
  },
  {
    id: 't-rebote',
    sec: 'dolor',
    titulo: 'Compresión, descompresión y rebote',
    fig: { f: 'pared', mano: true, fases: ['reposo', 'comprimir', 'soltar'] },
    bloques: [
      {
        t: 'cuadro',
        head: ['Al examinar', 'Significa'],
        filas: [
          ['Duele al comprimir, no al soltar', 'Solo **peritoneo visceral**'],
          ['Duele también al soltar', 'Peritoneo **visceral y parietal**'],
          ['Duele **más** al soltar', '**Signo del rebote**'],
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Tipos de dolor: visceral, somático y referido.' },
    voz: [
      'Fijate cómo se traduce en la mano. Si comprimís y le duele, pero al soltar no, solo está irritado el peritoneo visceral.',
      'Si le duele al comprimir y también al descomprimir, están comprometidas las dos hojas.',
      'Y si al descomprimir le duele más que cuando apretabas, hay compromiso del peritoneo parietal. Eso se llama signo del rebote.',
    ],
    refs: [M3('03:46'), M3('06:38')],
  },
  {
    id: 't-referido',
    sec: 'dolor',
    titulo: 'Dolor referido',
    fig: { f: 'ecg' },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', text: 'De origen visceral, pero se manifiesta **lejos del sitio de origen**.' },
      { t: 'lista', en: 1, items: ['**Apendicitis:** el dolor empieza en el epigastrio.', '**Infarto de cara inferior:** simula úlcera, gastritis o pancreatitis.', '**Colecistitis:** irradia al hombro derecho.'] },
    ],
    aclara: { text: 'El hombro se refiere cuando se irrita el **diafragma**, inervado por el frénico (C3–C5). El cólico renal, en cambio, irradia hacia la ingle y los genitales.', origen: GRAL },
    voz: [
      'El tercero es el referido: es de origen visceral, pero se siente lejos del sitio donde está el problema.',
      'El ejemplo clásico: una apendicitis que empieza doliendo en la boca del estómago.',
      'Otro muy importante: un infarto de cara inferior del corazón, que se presenta como si fuera una úlcera o una gastritis.',
      'Y la colecistitis aguda, que irradia al hombro derecho.',
    ],
    refs: [M3('04:27'), M3('05:13'), M3('23:56')],
  },
  {
    id: 't-tres',
    sec: 'dolor',
    titulo: 'Los tres dolores',
    soloDiapo: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Visceral', 'Somático', 'Referido'],
        filas: [
          ['Nace en', 'Peritoneo **visceral** (el órgano)', 'Peritoneo **parietal**', 'Un órgano, pero se siente **lejos**'],
          ['Fibras', '**C**, amielínicas, lentas', '**Aδ**, mielínicas, rápidas', 'Viscerales'],
          ['Cómo es', 'Sordo, vago, **mal localizado**', 'Punzante, **bien localizado**; empeora al moverse', 'Lejano al sitio de origen'],
          ['Examen', 'Duele a la **compresión**', 'Duele a la **descompresión**', '—'],
          ['Ejemplo', 'Inicio de la apendicitis', 'Apendicitis ya en la fosa ilíaca', 'Infarto inferior que parece úlcera'],
        ],
      },
    ],
    voz: ['Este es el cuadro para estudiar.'],
    refs: [M2('33:25'), M3('00:40'), M3('02:15'), M3('04:27'), L('2')],
  },

  /* ──────── Clasificación ──────── */
  {
    id: 't-clasificacion',
    sec: 'clasif',
    titulo: 'Cómo se clasifica',
    bloques: [
      {
        t: 'arbol',
        raiz: {
          t: 'Abdomen agudo',
          tono: 'lilac',
          hijos: [
            { t: 'Por duración', tono: 'sky', hijos: [{ t: 'Agudo', d: '< 7 días', tono: 'sky' }, { t: 'Crónico', d: '> 7 días', tono: 'sky' }] },
            {
              t: 'Por etiología',
              tono: 'rose',
              hijos: [
                { t: 'Médico', tono: 'mint' },
                { t: 'Quirúrgico', tono: 'rose', examen: true },
                { t: 'Inespecífico', tono: 'peach' },
              ],
            },
          ],
        },
      },
    ],
    examen: { origen: 'preguntero', texto: '¿Cómo se clasifica según la duración y según la etiología?' },
    aclara: { text: 'En dolor en general, el libro llama agudo hasta 4 semanas. Para **abdomen agudo** el corte es de **7 días**, como lo da el profesor y también Argente-Álvarez.', origen: `Clase, min 05:55; Libro, p. 3; ${ARG}, p. 650.` },
    voz: ['Hay dos formas de clasificarlo. Por su duración: agudo, si dura menos de siete días, y crónico, si dura más de siete días. Y por su etiología, que es la parte más importante: médico, quirúrgico e inespecífico.'],
    refs: [M3('05:55'), M3('08:52')],
  },
  {
    id: 't-duracion',
    sec: 'clasif',
    titulo: 'Agudo y crónico',
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Agudo: menos de 7 días', tono: 'rose', items: ['Puede ser **médico o quirúrgico**', 'Siempre **interconsulta con cirugía**', 'Médicos: pielonefritis, pancreatitis, gastritis aguda, úlcera, cólico biliar'] },
          { titulo: 'Crónico: más de 7 días', tono: 'sky', items: ['Tratamiento **médico**; rara vez quirúrgico', 'Dispepsias, intestino irritable', 'Úlceras, enfermedad biliar, pancreatitis crónica'] },
        ],
      },
      { t: 'prof', en: 2, text: '«Todo abdomen agudo, hay que hacer sí o sí una interconsulta con cirugía, porque a veces nos podemos estar comiendo un cuadro quirúrgico.»' },
    ],
    voz: [
      'El agudo dura menos de siete días y puede ser tanto médico como quirúrgico.',
      'El crónico dura más de siete días, y lo habitual es que tenga tratamiento médico: dispepsias, intestino irritable, úlceras.',
      'La regla práctica es esta: todo abdomen agudo lleva interconsulta con cirugía, porque te podés estar comiendo un cuadro quirúrgico.',
    ],
    refs: [M3('05:55'), M3('07:22'), M3('08:08'), M3('08:52')],
  },
  {
    id: 't-medico',
    sec: 'clasif',
    titulo: 'Abdomen agudo médico',
    bloques: [
      { t: 'texto', text: 'Tiene tratamiento médico, **ambulatorio u hospitalario**. El que vomita todo y no tolera la vía oral se interna.' },
      {
        t: 'cuadro',
        en: 1,
        head: ['Origen', 'Ejemplos'],
        filas: [
          ['Torácico', 'Infarto, pericarditis aguda, perforación esofágica (Boerhaave)'],
          ['Abdominal', 'Gastroenteritis, gastritis, pielonefritis aguda'],
          ['Metabólico', 'Cetoacidosis diabética'],
        ],
      },
    ],
    aclara: { text: 'Boerhaave se ve en detalle en síndrome esofágico. En cetoacidosis el dolor abdominal es parte del cuadro metabólico: por eso va la glucemia en el laboratorio.' },
    voz: [
      'El abdomen agudo médico se resuelve con tratamiento médico, a veces ambulatorio y a veces con internación. Si el paciente vomita todo, no le va a servir nada por boca: hay que internarlo y poner un suero.',
      'Hay causas torácicas, como el infarto, la pericarditis o la perforación esofágica.',
      'Hay abdominales, como la gastroenteritis o la pielonefritis.',
      'Y hay metabólicas, como la cetoacidosis diabética.',
    ],
    refs: [M3('12:16'), M3('12:56'), M3('16:21'), M3('17:02')],
  },
  {
    id: 't-inespecifico',
    sec: 'clasif',
    titulo: 'Abdomen agudo inespecífico',
    fig: { f: 'abdomen', idp: 't-ine', vistas: [{ luz: { umb: 'peach', hd: 'peach', hi: 'peach', fd: 'peach', fi: 'peach', epi: 'peach', fid: 'peach', fii: 'peach', hipo: 'peach' } }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'lista', items: ['Dolor **generalizado**, sin signos que lo definan.', 'Frecuente en **mujeres jóvenes**.', 'Es un **diagnóstico por exclusión**: se estudia y se hace seguimiento.'] },
      { t: 'clave', en: 3, tono: 'peach', text: 'Se escribe: «Abdomen agudo inespecífico (¿colecistitis?)».' },
    ],
    aclara: { text: 'La paciente de 22 años que cuenta el profesor llegó así: se dejó constancia de lo que se sospechaba, se pidieron estudios y resultó tener cálculos en la vía biliar. Se operó al día siguiente.', origen: 'Clase, min 10:15–11:36.' },
    voz: [
      'Y está el inespecífico: un dolor muy intenso, generalizado, que no tiene signos que lo definan.',
      'Aparece mucho en mujeres jóvenes.',
      'Es un diagnóstico por exclusión. Hay que estudiarlo y seguirlo.',
      'Y se escribe así: abdomen agudo inespecífico, y entre paréntesis lo que sospechás.',
    ],
    refs: [M3('08:52'), M3('09:34'), M3('10:15'), M3('10:56'), M3('11:36')],
  },
  {
    id: 't-ecg',
    sec: 'clasif',
    titulo: 'La regla que no se negocia',
    fig: { f: 'ecg' },
    bloques: [
      { t: 'clave', text: 'Todo dolor abdominal agudo **por arriba del ombligo** lleva **electrocardiograma**.' },
      { t: 'lista', en: 1, items: ['Epigastrio o hipocondrios: hay que descartar que se esté infartando.', 'Más todavía si es **hipertenso, diabético, tabaquista o alcohólico**.'] },
    ],
    examen: { origen: 'preguntero', texto: 'Dolor agudo supraumbilical: electrocardiograma.' },
    voz: [
      'Y una regla que no se negocia. Todo paciente con dolor abdominal agudo por arriba del ombligo lleva electrocardiograma.',
      'Puede ser epigastrio o cualquiera de los hipocondrios. Hay que descartar que se esté infartando.',
      'Y más todavía si tiene factores de riesgo.',
    ],
    refs: [M3('14:58'), M3('15:40')],
  },

  /* ──────── Los 5 quirúrgicos ──────── */
  {
    id: 't-cinco',
    sec: 'cinco',
    titulo: 'Los cinco abdómenes agudos quirúrgicos',
    bloques: [
      {
        t: 'secuencia',
        items: [
          { ico: 'fuego', t: 'Inflamatorio', d: 'el más frecuente', tono: 'rose' },
          { ico: 'nudo', t: 'Obstructivo', d: 'mecánico', tono: 'peach' },
          { ico: 'aire', t: 'Perforativo', d: 'aire libre', tono: 'gold' },
          { ico: 'gota', t: 'Hemorrágico', d: 'se desangra', tono: 'red' },
          { ico: 'vaso', t: 'Vascular', d: 'el más letal', tono: 'lilac' },
        ],
      },
      { t: 'texto', en: 4, text: 'Son **intraperitoneales** y se resuelven por urgencia o emergencia. Las causas extraabdominales, en cambio, en general tienen tratamiento médico.' },
    ],
    examen: { origen: 'ortega', texto: 'Nombrar los cinco.', cita: 'Esto es pregunta de parcial… hay cinco grandes abdómenes agudos quirúrgicos que se tienen que saber como el Padre Nuestro.', ref: M3('17:02') },
    voz: [
      'Esto es pregunta de parcial, y hay que saberlo como el Padre Nuestro. Son cinco. El primero, y el que te vas a topar siempre, es el inflamatorio.',
      'El segundo, el obstructivo mecánico.',
      'El tercero, el perforativo.',
      'El cuarto, el hemorrágico.',
      'Y el quinto, el vascular o isquémico: el más letal de todos.',
    ],
    refs: [M3('13:36'), M3('17:02'), M3('17:42'), M4('13:04')],
  },
  {
    id: 't-cuadro5',
    sec: 'cinco',
    titulo: 'El cuadro para estudiar',
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['', 'Causas', 'Dolor', 'Examen clave'],
        filas: [
          ['Inflamatorio', 'Todo lo que termina en **-itis**', 'Progresivo, se localiza; luego **fiebre**', '**Blumberg** · asa centinela'],
          ['Obstructivo', '**Bridas**, hernias, tumores, vólvulos, invaginación', '**Cólico** + vómitos, sin gases ni heces', '**RHA de lucha** · distensión · timpanismo'],
          ['Perforativo', '**Úlcera** y **apendicitis** perforadas', '**Súbito**, intenso, generalizado', '**Tabla** · **Jobert** · RHA ausentes'],
          ['Hemorrágico', '**Ectópico**, aneurisma de aorta, trauma', 'Dolor + **hipovolemia**', '**Matidez** · **blando** · Cullen / Grey-Turner'],
          ['Vascular', 'Isquemia **mesentérica**', 'Progresivo, **no calma con analgésicos**', 'Lactato > 2 · **el más letal**'],
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Cuadro de causas, dolor y examen clave de cada uno.' },
    voz: [
      'Y este es el cuadro que resume todo. Lo vamos a desarrollar de a uno. El inflamatorio.',
      'El obstructivo.',
      'El perforativo.',
      'El hemorrágico.',
      'Y el vascular.',
    ],
    refs: [M3('17:42'), M3('28:40'), M4('00:01'), M4('06:41'), M4('13:04')],
  },

  /* ──────── Inflamatorio ──────── */
  {
    id: 't-itis',
    sec: 'inflamatorio',
    titulo: 'Inflamatorio: todo lo que termina en -itis',
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Se operan en ~97 %', tono: 'rose', items: ['**Apendicitis aguda**', '**Colecistitis aguda** (la 2.ª causa)'] },
          { titulo: 'Empiezan con tratamiento médico', tono: 'sky', items: ['**Pancreatitis aguda** (la necrohemorrágica, quirúrgica)', '**Diverticulitis**: según la clasificación de **Hinchey**', '**Adenitis mesentérica**'] },
        ],
      },
    ],
    aclara: { text: 'La diverticulitis son divertículos inflamados con pus: algunas son médicas, otras requieren drenaje y otras cirugía.', origen: 'Clase, min 18:23–19:44.' },
    voz: [
      'El inflamatorio es todo lo que termina en itis. La apendicitis y la colecistitis aguda se operan en el noventa y siete por ciento de los casos.',
      'La pancreatitis, la diverticulitis y la adenitis mesentérica, en cambio, empiezan con tratamiento médico. La diverticulitis depende de la clasificación de Hinchey.',
    ],
    refs: [M3('17:42'), M3('18:23'), M3('19:04'), M3('19:44')],
  },
  {
    id: 't-cronologia',
    sec: 'inflamatorio',
    titulo: 'Cronología de Murphy: el recorrido',
    fig: {
      f: 'abdomen',
      colon: true,
      idp: 't-cr',
      vistas: [
        { luz: { epi: 'rose' } },
        { luz: { epi: 'rose', umb: 'rose' }, ruta: ['epi', 'umb'] },
        { luz: { fid: 'rose' }, ruta: ['epi', 'umb', 'fid'] },
      ],
    },
    anchoFig: 'chica',
    bloques: [
      { t: 'lista', items: ['Empieza en el **epigastrio**.', 'Desciende a la zona **periumbilical**.', 'Termina localizándose en la **fosa ilíaca derecha**.'] },
    ],
    examen: { origen: 'preguntero', texto: 'Diferenciar cronología y tríada de Murphy.', cita: 'Hay dos cosas importantes que quiero que diferencien: cronología de Murphy y tríada de Murphy.', ref: M3('20:25') },
    voz: [
      'En la apendicitis hay dos cosas que el profesor quiere que diferencies: la cronología de Murphy y la tríada de Murphy. La cronología es el recorrido del dolor. Empieza en el epigastrio.',
      'Después desciende a la zona periumbilical.',
      'Y termina localizándose en la fosa ilíaca derecha. Cuando se localiza, ya hay compromiso del peritoneo parietal.',
    ],
    refs: [M3('20:25'), M3('21:10'), M3('21:50'), M3('22:31')],
  },
  {
    id: 't-triada',
    sec: 'inflamatorio',
    titulo: 'Tríada de Murphy: la secuencia',
    bloques: [
      {
        t: 'secuencia',
        flechas: true,
        items: [
          { ico: 'dolor', t: 'Dolor', d: 'primero', tono: 'rose' },
          { ico: 'vomito', t: 'Vómitos', d: 'después', tono: 'peach' },
          { ico: 'fiebre', t: 'Fiebre', d: 'al final', tono: 'gold' },
        ],
      },
      { t: 'clave', en: 3, tono: 'lilac', text: 'Si la fiebre está **antes** del dolor, pensá en gastroenteritis. **Después** del dolor, en abdomen agudo inflamatorio.' },
      { t: 'texto', en: 3, soloWeb: true, text: 'Cronología = **mapa** (dónde duele). Tríada = **reloj** (qué aparece y en qué orden). El **signo** de Murphy es otra cosa: maniobra sobre la vesícula.' },
    ],
    examen: { origen: 'preguntero', texto: '¿Qué es la tríada de Murphy?', ref: M3('21:10') },
    voz: [
      'La tríada, en cambio, es una secuencia de síntomas, y el orden importa. Primero aparece el dolor.',
      'Después los vómitos.',
      'Y por último la fiebre.',
      'Por eso la fiebre te orienta: si aparece antes del dolor, pensá en una gastroenteritis. Si aparece después, en un abdomen agudo inflamatorio.',
    ],
    refs: [M3('21:10'), M4('19:19')],
  },
  {
    id: 't-estadios',
    sec: 'inflamatorio',
    titulo: 'Apendicitis: cuatro estadios',
    fig: { f: 'apendice' },
    anchoFig: 'grande',
    bloques: [
      { t: 'texto', text: 'La causa más frecuente: **fecalitos** que obstruyen la luz. Muy común en **niños y adolescentes**.' },
      { t: 'texto', en: 3, text: 'Si se **perfora**, pasa a ser un abdomen agudo perforativo.' },
    ],
    aclara: { text: 'El **punto de McBurney** está en la unión del tercio externo con los dos tercios internos de la línea entre la espina ilíaca anterosuperior y el ombligo.', origen: `${ARG}, p. 650.` },
    voz: [
      'La causa más frecuente son los fecalitos, que obstruyen la luz del apéndice. Y la evolución tiene cuatro estadios. La primera es congestiva.',
      'Después se hace flegmonosa, con pus.',
      'Luego gangrenosa, y la pared se necrosa.',
      'Y por último se perfora. En ese momento pasa a ser un abdomen agudo perforativo.',
    ],
    refs: [M3('20:25'), M3('23:15')],
  },
  {
    id: 't-colecistitis',
    sec: 'inflamatorio',
    titulo: 'Colecistitis aguda',
    fig: { f: 'colecistitis' },
    anchoFig: 'chica',
    bloques: [
      {
        t: 'secuencia',
        items: [
          { ico: 'dolor', t: 'Dolor en HD', d: 'al hombro derecho', tono: 'rose' },
          { ico: 'vomito', t: 'Vómitos biliosos', tono: 'peach' },
          { ico: 'fiebre', t: 'Fiebre', tono: 'gold' },
          { ico: 'piel', t: 'Ictericia', d: 'puede o no', tono: 'lilac' },
        ],
      },
      { t: 'texto', en: 3, text: 'Si solo está inflamada la vesícula, la ictericia es rara. Aparece cuando un **cálculo se escapa al colédoco**: ictericia obstructiva.' },
      { t: 'texto', en: 3, soloWeb: true, text: 'Más frecuente en el **sexo femenino**, relacionada con alimentos colecistocinéticos.' },
    ],
    voz: [
      'La segunda causa de abdomen agudo inflamatorio es la colecistitis aguda. También tiene su tríada, que puede ser una tétrada. Dolor en el hipocondrio derecho que se irradia al hombro derecho.',
      'Vómitos biliosos.',
      'Fiebre.',
      'Y la ictericia, que puede estar o no. Aparece cuando un cálculo se escapa y se aloja en el colédoco, y es de tipo obstructivo.',
    ],
    refs: [M3('23:56'), M3('24:36'), M3('25:18')],
  },
  {
    id: 't-examen-inflamatorio',
    sec: 'inflamatorio',
    titulo: 'Qué encontrás al examen',
    fig: { f: 'intestino', modo: 'asa' },
    bloques: [
      {
        t: 'cuadro',
        head: ['Paso', 'Hallazgo'],
        filas: [
          ['Inspección', 'Normal al comienzo o **distendido**'],
          ['Auscultación', 'RHA normales, disminuidos o ausentes'],
          ['Percusión', '**Timpanismo**: el gas retenido distiende las asas'],
          ['Palpación', '**Reacción peritoneal**: dolor a la descompresión'],
        ],
      },
    ],
    aclara: { text: 'La **reacción peritoneal** significa que están comprometidas las dos hojas. El íleo paralítico explica por qué no elimina gases ni materia fecal.', origen: 'Clase, min 25:58–27:59.' },
    voz: [
      'Clínica y examen. El paciente deja de eliminar gases y materia fecal, porque está inflamado el peritoneo visceral y se detiene el peristaltismo: es el íleo paralítico. El abdomen puede estar normal al comienzo, o distendido.',
      'A la auscultación, los ruidos pueden estar normales, disminuidos o ausentes.',
      'A la percusión, timpanismo.',
      'Y a la palpación, reacción peritoneal: dolor a la descompresión.',
    ],
    refs: [M3('25:58'), M3('26:38'), M3('27:18'), M3('27:59')],
  },
  {
    id: 't-blumberg',
    sec: 'inflamatorio',
    titulo: 'Blumberg y Gueneau de Mussy',
    fig: {
      f: 'abdomen',
      idp: 't-bl',
      vistas: [
        { luz: { fid: 'gold' }, puntos: [{ p: 'mcburney', tone: 'gold' }] },
        { luz: { hd: 'red', epi: 'red', hi: 'red', fd: 'red', umb: 'red', fi: 'red', fid: 'red', hipo: 'red', fii: 'red' } },
      ],
    },
    anchoFig: 'chica',
    bloques: [
      { t: 'def', term: 'Signo de Blumberg', tono: 'gold', text: 'Dolor a la descompresión **localizado**.' },
      { t: 'def', term: 'Signo de Gueneau de Mussy', tono: 'red', en: 1, text: 'Dolor a la descompresión **generalizado**: peritonitis difusa.' },
      { t: 'texto', en: 1, soloWeb: true, text: '«Rebote» es el nombre general. No todo rebote es Blumberg.' },
    ],
    examen: { origen: 'preguntero', texto: 'Rebote localizado y generalizado.', cita: 'Eso tienen que conocer.', ref: M3('27:59') },
    voz: [
      'Ese dolor a la descompresión tiene nombre según dónde esté. Si es localizado, es el signo de Blumberg.',
      'Si es generalizado, en todo el abdomen, es el signo de Gueneau de Mussy. Rebote es el nombre general.',
    ],
    refs: [M3('27:59'), M4('24:07'), M4('24:48'), L('360')],
  },

  /* ──────── Obstructivo ──────── */
  {
    id: 't-obstructivo',
    sec: 'obstructivo',
    titulo: 'Obstructivo: las causas',
    fig: { f: 'intestino', modo: 'obstaculo' },
    bloques: [
      {
        t: 'lista',
        items: [
          '**Intraluminal:** algo crece por dentro, como un tumor.',
          '**Parietal:** neoplasias infiltrantes o ulceradas.',
          '**Bridas:** asas que se adhieren después de una cirugía.',
          '**Hernias, vólvulos e invaginación** (de 2 meses a 6 años).',
        ],
      },
      { t: 'texto', en: 3, soloWeb: true, text: 'También existen obstrucciones **biliares** (coledocolitiasis) y **urinarias** (cálculo).' },
    ],
    examen: { origen: 'preguntero', texto: 'Obstructivo mecánico: etiologías, clínica y examen físico.' },
    aclara: { text: 'Se operó hace un mes y hoy llega con una obstrucción: pensá en **bridas**. Por eso importa mirar las cicatrices.', origen: 'Clase parte 4, min 22:07.' },
    voz: [
      'El segundo es el obstructivo mecánico. La obstrucción puede ser intraluminal: algo que crece por dentro, como un tumor.',
      'Puede estar en la pared, como las neoplasias infiltrantes.',
      'Las bridas son adherencias que aparecen después de una cirugía: las asas se pegan entre sí y no deja pasar la materia fecal.',
      'Y las hernias, los vólvulos y la invaginación intestinal, típica de los dos meses a los seis años.',
    ],
    refs: [M3('28:40'), M3('30:02'), M3('30:42'), M3('34:46'), M4('22:07')],
  },
  {
    id: 't-obstructivo-clinica',
    sec: 'obstructivo',
    titulo: 'Clínica y examen',
    fig: { f: 'intestino', modo: 'obstaculo' },
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Hallazgo'],
        filas: [
          ['Dolor', '**Cólico**, visceral, mal localizado; varía en intensidad'],
          ['Acompaña', '**Vómitos** y **no elimina gases ni materia fecal**'],
          ['Inspección', '**Distensión** abdominal; ondas peristálticas visibles'],
          ['Auscultación', '**De lucha** por arriba, disminuidos por abajo'],
          ['Percusión', '**Timpanismo**'],
          ['Palpación', 'Dolor localizado o, más a menudo, generalizado'],
        ],
      },
    ],
    aclara: { text: 'La fiebre depende de si hay o no infección: no define el cuadro obstructivo. El **enema** ayuda a ubicar dónde está la obstrucción.', origen: 'Clase, min 32:43; clase parte 4, min 31:32.' },
    voz: [
      'El dolor es de tipo cólico, porque aumenta y disminuye, y es visceral.',
      'Todo síndrome obstructivo se acompaña de vómitos, y el paciente no elimina gases ni materia fecal.',
      'A la inspección, distensión. A veces se ven las ondas peristálticas.',
      'A la auscultación, ruidos de lucha por arriba de la obstrucción, y disminuidos por debajo.',
      'A la percusión, timpanismo, porque hay gas.',
      'Y a la palpación, dolor, que suele ser generalizado.',
    ],
    refs: [M3('31:22'), M3('32:02'), M3('32:43'), M3('33:24'), M3('34:04')],
  },
  {
    id: 't-mecanico-paralitico',
    sec: 'obstructivo',
    titulo: 'No confundir: mecánico y paralítico',
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Íleo mecánico', tono: 'peach', items: ['Hay **obstáculo**', 'Dolor **cólico**', 'RHA **de lucha**', 'Bridas, hernias, tumores'] },
          { titulo: 'Íleo paralítico', tono: 'sky', items: ['**Sin** obstáculo: el intestino deja de moverse', 'Abdomen distendido y **silencioso**', 'Localizado: **asa centinela**', 'Generalizado: peritonitis o perforación'] },
        ],
      },
      { t: 'foto', en: 1, src: `${IMG}rx-obstruccion.jpg`, alt: 'Radiografía de abdomen de pie con asas intestinales dilatadas y niveles hidroaéreos', pie: 'Rx de abdomen: asas dilatadas por encima de la obstrucción.', credito: 'James Heilman, MD. CC BY-SA 3.0, recortada.', soloWeb: true },
    ],
    voz: [
      'No los confundas. En el mecánico hay un obstáculo real, y el intestino lucha contra él. Dolor cólico y ruidos de lucha.',
      'En el paralítico no hay obstáculo: el intestino dejó de moverse. Abdomen distendido y silencioso.',
    ],
    refs: [M3('29:21'), M4('27:30'), A('696')],
  },

  /* ──────── Perforativo ──────── */
  {
    id: 't-perforativo',
    sec: 'perforativo',
    titulo: 'Perforativo: causas y peritonitis',
    bloques: [
      { t: 'texto', text: 'Se perfora una víscera hueca. Las causas más frecuentes son dos: **úlcera** y **apendicitis**; también la colecistitis aguda complicada.' },
      {
        t: 'cuadro',
        en: 1,
        head: ['Peritonitis', 'Qué es', 'Causa típica'],
        filas: [
          ['Primaria', 'Sin perforación. **Monomicrobiana**, por translocación bacteriana', 'Cirrosis, síndrome nefrótico'],
          ['**Secundaria**', 'Por **perforación de víscera hueca**. **Polimicrobiana**', 'El abdomen agudo perforativo'],
          ['Terciaria', 'Persiste tras tratar una peritonitis grave', 'Inmunosuprimidos, posquirúrgicos'],
        ],
      },
    ],
    aclara: { text: 'En clase la terciaria se vincula con causas iatrogénicas o traumáticas. La definición del libro de referencia es infección persistente después del tratamiento quirúrgico. Se desarrolla en [[dig-10|Peritonitis]].', origen: `Clase, min 00:45–01:27; ${ARG}, p. 651.` },
    examen: { origen: 'preguntero', texto: 'Perforativo: etiologías, clínica y examen físico.' },
    voz: [
      'El tercero es el perforativo. Se perforó una víscera hueca, y las causas más frecuentes son dos: la úlcera y la apendicitis.',
      'Cuando hablamos de perforativo, hablamos de peritonitis secundaria, polimicrobiana. Existe además la primaria, sin perforación y monomicrobiana, y la terciaria.',
    ],
    refs: [M4('00:01'), M4('00:45'), M4('01:27'), A('651')],
  },
  {
    id: 't-perforativo-clinica',
    sec: 'perforativo',
    titulo: 'Clínica: el paciente inmóvil',
    fig: { f: 'cavidad', modo: 'aire' },
    anchoFig: 'chica',
    bloques: [
      {
        t: 'lista',
        items: [
          'Dolor **intenso, permanente, generalizado**, que no calma.',
          'Paciente **inmóvil**: todo lo que hace le duele.',
          'Se detiene el tránsito: **RHA ausentes**, vómitos, deshidratación.',
          'Hipotensión, taquicardia. **Quirúrgico de entrada**.',
        ],
      },
    ],
    voz: [
      'El dolor es intenso, permanente y generalizado, y no calma con analgésicos.',
      'El paciente está inmóvil, porque todo lo que hace le hace doler.',
      'Una vez que se perforó, se detiene todo el tránsito. Ruidos hidroaéreos ausentes. El paciente vomita y se deshidrata.',
      'Pasa a estados muy graves, con hipotensión y taquicardia. Se va directamente a cirugía.',
    ],
    refs: [M4('02:13'), M4('03:44'), M4('04:24')],
  },
  {
    id: 't-contractura',
    sec: 'perforativo',
    titulo: 'Contractura y defensa',
    fig: { f: 'arco-reflejo' },
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Contractura', tono: 'red', items: ['**Involuntaria**', 'Por irritación del peritoneo parietal', '**Abdomen en tabla**'] },
          { titulo: 'Defensa', tono: 'mint', items: ['**Voluntaria**', '«No me toques»: se encoge, se encorva', 'Inflamatorios, isquémicos'] },
        ],
      },
    ],
    voz: [
      'Y acá va una diferencia que tenés que tener clara. La contractura muscular es involuntaria: el peritoneo parietal está irritado, y los músculos se endurecen solos. Eso es el abdomen en tabla.',
      'La defensa es voluntaria: te duele, y te encogés, no querés que te toquen.',
    ],
    refs: [M4('02:13'), M4('02:57'), M4('24:48')],
  },
  {
    id: 't-jobert',
    sec: 'perforativo',
    titulo: 'Signo de Jobert',
    fig: { f: 'cavidad', modo: 'aire' },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', tono: 'gold', text: '**Ausencia de la matidez hepática** por neumoperitoneo, secundario a la perforación de una víscera hueca.' },
      { t: 'texto', en: 1, text: 'El gas asciende y tapa la matidez del hígado: se percute **timpanismo**.' },
    ],
    examen: { origen: 'ortega', texto: 'Definir el signo de Jobert.', cita: 'Si no saben este signo, los mandan a su casa.', ref: M4('05:09') },
    voz: [
      'Y llegamos a una pregunta de parcial. El profesor es claro: si no sabés este signo, te manda a tu casa. El signo de Jobert es la ausencia de la matidez hepática, por neumoperitoneo, secundario a la perforación de una víscera hueca.',
      'Como vimos, el gas asciende y tapa la matidez del hígado.',
      'Y a la percusión, donde tendría que estar mate, suena timpánico.',
    ],
    refs: [M4('05:09'), M4('05:54'), M4('26:08'), L('86')],
  },
  {
    id: 't-popper',
    sec: 'perforativo',
    titulo: 'Signo de Popper',
    bloques: [
      { t: 'foto', src: `${IMG}rx-neumoperitoneo.jpg`, alt: 'Radiografía de tórax de pie con una banda de aire entre el diafragma derecho y el hígado', pie: 'Rx de tórax de pie: la media luna de aire bajo el diafragma.', credito: 'Bill Rhodes. CC BY 2.0, recortada.' },
      { t: 'texto', en: 1, text: 'Es lo mismo que Jobert, pero en la **radiografía**: aire subdiafragmático, «signo de la media luna».' },
    ],
    voz: [
      'Lo mismo se ve en la radiografía de tórax de pie. Fijate esa línea oscura entre el diafragma y el hígado.',
      'Es aire libre bajo el diafragma, y se llama signo de Popper, o de la media luna.',
    ],
    refs: [M4('30:12'), M4('30:52')],
  },

  /* ──────── Hemorrágico ──────── */
  {
    id: 't-hemorragico',
    sec: 'hemorragico',
    titulo: 'Hemorrágico: se desangra adentro',
    fig: { f: 'hipovolemia' },
    anchoFig: 'chica',
    bloques: [
      { t: 'texto', text: 'La causa más frecuente es ginecológica: **embarazo ectópico**. También: rotura de **aneurisma de aorta** y **trauma** de hígado o vasos.' },
      { t: 'clave', en: 1, tono: 'red', text: 'Lo que más llama la atención son los **signos de hipovolemia**.' },
      { t: 'texto', en: 2, text: 'Taquicardia, hipotensión, frialdad, sudoración, oliguria, conciencia alterada. Si progresa: shock hipovolémico.' },
    ],
    examen: { origen: 'preguntero', texto: 'Hemorrágico: etiologías, clínica y examen físico.' },
    voz: [
      'El cuarto es el hemorrágico. El paciente se está desangrando dentro del abdomen. La causa más frecuente es ginecológica: el embarazo ectópico.',
      'Además del dolor, lo que más te tiene que llamar la atención son los signos de hipovolemia.',
      'El paciente está hipotenso, taquicárdico, frío, sudoroso, y deja de orinar.',
      'Y si sigue perdiendo sangre, entra en shock hipovolémico.',
    ],
    refs: [M4('06:41'), M4('07:25'), M4('08:10'), M4('11:43')],
  },
  {
    id: 't-matidez',
    sec: 'hemorragico',
    titulo: 'A la percusión: matidez',
    fig: { f: 'cavidad', modo: 'sangre' },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', tono: 'red', text: 'La sangre desplaza al aire: **matidez**.' },
      { t: 'lista', en: 1, items: ['Abdomen **distendido**.', 'A la palpación duele, pero es **blando**.', 'RHA en general normales.'] },
    ],
    examen: { origen: 'ortega', texto: 'Matidez a la percusión en el hemorrágico.', cita: 'Eso es lo que te van a preguntar en el parcial.', ref: M4('12:24') },
    voz: [
      'Y acá está lo que te van a preguntar en el parcial. A la percusión hay matidez: la sangre se fue a las partes bajas y desplazó el aire.',
      'El abdomen está distendido, porque se está llenando de sangre.',
      'Duele a la palpación, pero es blando: no es un abdomen en tabla.',
      'Los ruidos hidroaéreos suelen estar normales.',
    ],
    refs: [M4('08:10'), M4('11:43'), M4('12:24'), M4('13:04')],
  },
  {
    id: 't-cullen',
    sec: 'hemorragico',
    titulo: 'Cullen y Grey-Turner',
    bloques: [
      {
        t: 'fotos',
        items: [
          { src: `${IMG}signo-cullen.jpg`, alt: 'Equimosis periumbilical en la pared abdominal', pie: '**Cullen:** equimosis **periumbilical**.', credito: 'Herbert L. Fred y Hendrik A. van Dijk. CC BY 2.0.' },
          { src: `${IMG}signo-grey-turner.jpg`, alt: 'Equimosis extensas en el flanco', pie: '**Grey-Turner:** equimosis en los **flancos**.', credito: 'Herbert L. Fred y Hendrik A. van Dijk. CC BY 2.0.' },
        ],
      },
      { t: 'clave', en: 2, tono: 'red', text: 'Sangre en el **retroperitoneo**. **No son patognomónicos** de pancreatitis necrohemorrágica.' },
    ],
    examen: { origen: 'preguntero', texto: '¿A qué corresponden Cullen y Grey-Turner?', cita: 'No es patognomónico de la pancreatitis necrohemorrágica. Ojo por eso, muchos dicen eso, no es así.', ref: M4('09:35') },
    aclara: { text: 'Son sangre que difunde por planos hasta el tejido subcutáneo: pueden demorar y su ausencia **no descarta** una hemorragia. Aparecen en ectópico roto, aneurisma de aorta, trauma y pancreatitis necrohemorrágica.', origen: `Causas: clase, min 09:35. Tiempo de aparición: ${GRAL}` },
    voz: [
      'Si la sangre llega al retroperitoneo, pueden aparecer dos signos. El signo de Cullen es una equimosis alrededor del ombligo.',
      'El signo de Grey-Turner es una equimosis en los flancos.',
      'Y mucha atención: muchos dicen que son patognomónicos de la pancreatitis necrohemorrágica. No es así. Aparecen en cualquier hemorragia con sangre en el retroperitoneo.',
    ],
    refs: [M4('08:53'), M4('09:35'), M4('10:18'), M4('11:02')],
  },
  {
    id: 't-aire-sangre',
    sec: 'hemorragico',
    titulo: 'Lo que no se puede olvidar',
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Perforativo', tono: 'gold', items: ['Aire libre: **timpanismo** en el área hepática', '**Jobert** (neumoperitoneo)', 'Abdomen **en tabla**'] },
          { titulo: 'Hemorrágico', tono: 'red', items: ['Sangre: **matidez**', 'Abdomen doloroso pero **blando**', '± Cullen, Grey-Turner'] },
        ],
      },
      { t: 'clave', en: 1, tono: 'lilac', text: 'Aire sube, sangre baja.' },
    ],
    examen: { origen: 'ortega', texto: 'Percusión en perforativo y hemorrágico.', cita: 'Lo que yo no quiero que se olviden son dos.', ref: M4('25:28') },
    voz: [
      'El profesor insiste: lo que no se pueden olvidar son dos cosas. En el perforativo hay aire libre, timpanismo en el área hepática, signo de Jobert, y abdomen en tabla.',
      'En el hemorrágico hay sangre: matidez, y un abdomen doloroso pero blando. Aire sube, sangre baja.',
    ],
    refs: [M4('25:28'), M4('26:08')],
  },

  /* ──────── Vascular ──────── */
  {
    id: 't-vascular',
    sec: 'vascular',
    titulo: 'Vascular o isquémico: el más letal',
    fig: { f: 'mesenterica' },
    bloques: [
      { t: 'texto', text: 'Disminuye el flujo a las vísceras, principalmente por **oclusión mesentérica**: el intestino se infarta. Poco frecuente, pero el más letal.' },
      { t: 'def', term: 'Pensalo en', tono: 'lilac', en: 1, text: 'Paciente **mayor**, **tabaquista**, diabético, hipertenso, o que toma **anticonceptivos orales**.' },
    ],
    examen: { origen: 'preguntero', texto: 'Vascular: etiologías, clínica y examen físico.', cita: 'Es el más letal de todos los abdómenes agudos.', ref: M4('13:04') },
    voz: [
      'El quinto es el vascular o isquémico, y es el más letal de todos, a pesar de ser poco frecuente. Disminuye el flujo sanguíneo hacia las vísceras, sobre todo por oclusión de la mesentérica, y el intestino se infarta.',
      'Pensá siempre en un paciente mayor, tabaquista, diabético, hipertenso o que toma anticonceptivos.',
      'Y mientras tanto, el intestino se va muriendo.',
      'Las bacterias se escapan, y el paciente muere por shock séptico.',
    ],
    refs: [M4('13:04'), M4('13:47'), M4('15:11')],
  },
  {
    id: 't-hora-oro',
    sec: 'vascular',
    titulo: 'Clínica: la hora de oro',
    fig: { f: 'mesenterica' },
    bloques: [
      { t: 'clave', tono: 'lilac', text: 'Dolor que empieza leve, **progresa**, se generaliza y **no responde a ningún analgésico**.' },
      { t: 'prof', en: 1, text: '«Tiempo que pasa, minuto que pasa, intestino que muere.»', ref: M4('14:29') },
      {
        t: 'cuadro',
        en: 2,
        head: ['Examen', 'Evolución'],
        filas: [
          ['Inspección', 'Normal o distendido'],
          ['Auscultación', 'RHA **conservados**; luego **desaparecen**'],
          ['Palpación', 'Dolor a la compresión y descompresión'],
          ['Laboratorio', '**Lactato > 2**: mala perfusión'],
        ],
      },
    ],
    aclara: { text: 'El lactato orienta pero no es específico, y un valor normal no descarta una isquemia temprana: ante la sospecha, no se espera al laboratorio.', origen: GRAL },
    voz: [
      'El dolor empieza leve, va progresando, se generaliza, y no responde a ningún analgésico.',
      'Esto no se olvida nunca: es la hora de oro. Tiempo que pasa, minuto que pasa, intestino que muere.',
      'Al principio el examen es casi normal.',
      'Los ruidos hidroaéreos están conservados, y después desaparecen, porque el intestino ya se murió.',
      'El paciente puede tener dolor a la compresión y descompresión.',
      'Y se pide lactato: mayor a dos indica mala perfusión.',
    ],
    refs: [M4('14:29'), M4('15:51'), M4('16:32')],
  },

  /* ──────── Exploración ──────── */
  {
    id: 't-alicia',
    sec: 'exploracion',
    titulo: 'Anamnesis: ALICIA',
    bloques: [
      {
        t: 'secuencia',
        items: [
          { ico: 'reloj', t: 'Antigüedad', tono: 'lilac' },
          { ico: 'mano', t: 'Localización', tono: 'lilac' },
          { ico: 'aire', t: 'Irradiación', tono: 'lilac' },
          { ico: 'dolor', t: 'Carácter', tono: 'lilac' },
          { ico: 'fuego', t: 'Intensidad', tono: 'lilac' },
          { ico: 'pregunta', t: 'Atenuantes', d: 'y agravantes', tono: 'lilac' },
        ],
      },
      { t: 'texto', en: 5, text: 'Antecedentes: **alcoholismo**, **antiinflamatorios**, **cirugías abdominales** previas.' },
    ],
    examen: { origen: 'preguntero', texto: '¿Cómo se semiografía el dolor?' },
    voz: [
      'Vamos al diagnóstico. Primero la anamnesis. El dolor se semiografía con ALICIA. Antigüedad.',
      'Localización.',
      'Irradiación.',
      'Carácter.',
      'Intensidad.',
      'Y atenuantes o agravantes. Y siempre preguntá por alcoholismo, antiinflamatorios y cirugías previas.',
    ],
    refs: [M4('17:54'), M4('18:38'), L('3')],
  },
  {
    id: 't-acompanantes',
    sec: 'exploracion',
    titulo: 'Lo que acompaña al dolor',
    bloques: [
      {
        t: 'cuadro',
        head: ['Síntoma', 'Qué buscás'],
        filas: [
          ['Náuseas y vómitos', 'Casi siempre presentes'],
          ['Tránsito', '¿Elimina gases y materia fecal? ¿Diarrea? ¿Con sangre?'],
          ['**Fiebre**', 'Inflamatorio, perforativo, isquémico. **No** en hemorrágico: hipotermia'],
          ['Shock', 'Hipovolémico en hemorragia; séptico en perforación o infarto'],
          ['Ginecológicos', 'Leucorrea, enfermedad inflamatoria pelviana: tacto vaginal'],
          ['Urológicos', 'Litiasis, infección urinaria'],
        ],
      },
    ],
    voz: [
      'Después preguntá lo que acompaña. Náuseas y vómitos casi siempre están.',
      'El tránsito: si elimina gases, si tiene diarrea, y cómo es esa diarrea.',
      'La fiebre es fundamental: acompaña a los inflamatorios, perforativos e isquémicos. En el hemorrágico no: el paciente tiende a la hipotermia.',
      'Ojo con el shock: hipovolémico en la hemorragia, séptico en la perforación o el infarto intestinal.',
      'Los síntomas ginecológicos.',
      'Y los urológicos, para descartar litiasis o infección.',
    ],
    refs: [M4('18:38'), M4('19:19'), M4('20:00'), M4('20:43')],
  },
  {
    id: 't-inspeccion',
    sec: 'exploracion',
    titulo: 'Signos vitales e inspección',
    bloques: [
      { t: 'texto', text: 'Signos vitales: **temperatura** (fiebre o hipotermia), frecuencia cardíaca, tensión arterial y frecuencia respiratoria.' },
      {
        t: 'cuadro',
        en: 1,
        head: ['Hallazgo', 'Orienta a'],
        filas: [
          ['Paciente **inmóvil**', 'Irritación peritoneal'],
          ['**Cicatrices** quirúrgicas', '**Bridas**'],
          ['Distensión generalizada', 'Obstrucción, ascitis'],
          ['Distensión localizada', 'Plastrón, absceso'],
          ['Ondas peristálticas', 'Obstrucción: lucha por arriba del obstáculo'],
          ['Equimosis', 'Cullen y Grey-Turner'],
        ],
      },
    ],
    voz: [
      'Examen físico. Empezá por los signos vitales. La temperatura, la frecuencia cardíaca, la tensión y la frecuencia respiratoria, que se altera con mucha frecuencia.',
      'A la inspección, mirá cómo está el paciente. Inmóvil, indica irritación peritoneal.',
      'Si tiene cicatrices quirúrgicas, pensá en bridas.',
      'La distensión generalizada aparece en obstrucciones y ascitis.',
      'La localizada, en plastrones y abscesos.',
      'Las ondas peristálticas visibles indican obstrucción.',
      'Y buscá siempre las equimosis.',
    ],
    refs: [M4('20:43'), M4('21:24'), M4('22:07'), M4('22:47'), M4('23:27')],
  },
  {
    id: 't-palpacion',
    sec: 'exploracion',
    titulo: 'Palpación',
    fig: { f: 'pared', mano: true, fases: ['reposo', 'comprimir', 'soltar'] },
    bloques: [
      {
        t: 'cuadro',
        head: ['Hallazgo', 'Significa'],
        filas: [
          ['Dolor profundo, sin contractura ni defensa', 'Cólico biliar, cólico renal, gastroenteritis'],
          ['Dolor a la compresión', 'Peritoneo **visceral**'],
          ['Dolor a la descompresión', 'Peritoneo **parietal**'],
          ['Doloroso pero **blando**', 'Hemoperitoneo'],
        ],
      },
      { t: 'texto', en: 3, soloWeb: true, text: 'Con un dolor generalizado, el **tacto rectal** ayuda a localizarlo. El tacto vaginal se suma ante un cuadro ginecológico.' },
    ],
    voz: [
      'A la palpación. Un dolor profundo, sin contractura ni defensa, suele corresponder a un cólico biliar, un cólico renal o una gastroenteritis.',
      'El dolor a la compresión habla del peritoneo visceral.',
      'El dolor a la descompresión, del parietal.',
      'Y un abdomen doloroso pero blando te hace pensar en hemoperitoneo.',
    ],
    refs: [M4('24:07'), M4('24:48'), M4('25:28'), M4('28:10')],
  },
  {
    id: 't-percusion',
    sec: 'exploracion',
    titulo: 'Percusión',
    fig: { f: 'perfil-liquido' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cuadro',
        head: ['Sonido', 'Cuadro'],
        filas: [
          ['Timpanismo', 'Generalizado en las obstrucciones'],
          ['Sin matidez hepática', 'Perforación: **Jobert**'],
          ['Matidez', '**Hemorrágico**'],
        ],
      },
    ],
    aclara: { text: 'Matidez de **concavidad superior**: líquido libre (ascitis, hemoperitoneo). De **convexidad superior**: embarazo o tumores.', origen: 'Clase, min 26:49.' },
    voz: [
      'A la percusión, la forma de la matidez te da información. El líquido libre, sea ascitis o sangre, deja una matidez con concavidad superior.',
      'En cambio, un embarazo o un tumor dan una matidez con convexidad superior.',
    ],
    refs: [M4('25:28'), M4('26:08'), M4('26:49')],
  },
  {
    id: 't-auscultacion',
    sec: 'exploracion',
    titulo: 'Auscultación',
    fig: { f: 'rha' },
    anchoFig: 'grande',
    bloques: [
      { t: 'texto', text: 'Cuatro patrones. El profesor insiste con estos: **de lucha** y **ausentes**.' },
      { t: 'texto', en: 2, text: '**Asa centinela:** íleo paralítico **localizado**, abdomen agudo inflamatorio.' },
      { t: 'texto', en: 3, text: '**Silencio:** íleo paralítico **generalizado**, peritonitis, perforación, intestino infartado.' },
    ],
    voz: [
      'A la auscultación, cuatro patrones. Si los ruidos están muy aumentados, son ruidos de lucha, por íleo mecánico.',
      'Pueden estar conservados.',
      'Pueden estar disminuidos, como en el íleo paralítico localizado.',
      'O pueden estar ausentes, en un íleo paralítico generalizado por peritonitis o perforación.',
    ],
    refs: [M4('26:49'), M4('27:30'), EF1('05:00')],
  },
  {
    id: 't-regiones',
    sec: 'exploracion',
    titulo: 'Dónde duele y qué hay debajo',
    soloDiapo: true,
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Región', 'Órganos', 'Pensar en'],
        filas: [
          ['Hipocondrio der.', 'Hígado, vesícula, vía biliar, riñón der.', 'Colecistitis, cólico biliar, colangitis, hepatitis, pielonefritis; neumonía basal'],
          ['Epigastrio', 'Estómago, lóbulo izq. del hígado, páncreas', 'Úlcera perforada, gastritis, pancreatitis, **infarto inferior**'],
          ['Hipocondrio izq.', 'Bazo, cola del páncreas, ángulo esplénico', 'Patología esplénica, pancreatitis'],
          ['Mesogastrio', 'Intestino delgado, aorta', 'Obstrucción, isquemia mesentérica, aneurisma'],
          ['Fosa ilíaca der.', 'Ciego, apéndice, ovario der., uréter', 'Apendicitis, ectópico, anexitis, litiasis'],
          ['Fosa ilíaca izq.', 'Sigmoides, ovario izq., uréter', 'Diverticulitis, anexial, litiasis'],
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Cuadro según cuadrantes y posibles causas de abdomen agudo.' },
    aclara: { text: 'El profesor usa los **4 cuadrantes** (superior e inferior, derecho e izquierdo) y las **9 regiones**: cualquiera de los dos vale.', origen: 'Examen físico, min 02:14.' },
    voz: ['Este cuadro relaciona cada región con sus órganos y sus causas.'],
    refs: [EF1('02:14'), EF1('04:20'), EF1('05:00')],
  },
  {
    id: 't-signos',
    sec: 'exploracion',
    titulo: 'Los signos en una mirada',
    soloDiapo: true,
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Signo', 'Qué encontrás', 'Qué indica'],
        filas: [
          ['Rebote', 'Duele más al soltar que al comprimir', 'Compromiso del peritoneo parietal'],
          ['Blumberg', 'Rebote **localizado**', 'Irritación parietal localizada'],
          ['Gueneau de Mussy', 'Rebote **generalizado**', 'Peritonitis difusa'],
          ['Abdomen en tabla', 'Rigidez involuntaria', 'Perforación, peritonitis'],
          ['Jobert', 'Timpanismo sobre el área hepática', 'Neumoperitoneo'],
          ['Popper', 'Rx de pie: aire bajo el diafragma', 'Neumoperitoneo'],
          ['Cullen', 'Equimosis periumbilical', 'Sangrado retroperitoneal'],
          ['Grey-Turner', 'Equimosis en los flancos', 'Sangrado retroperitoneal'],
          ['Asa centinela', 'Íleo paralítico localizado', 'Abdomen agudo inflamatorio'],
        ],
      },
    ],
    voz: ['Todos los signos en una sola mirada.'],
    refs: [M3('27:59'), M4('05:54'), M4('09:35'), M4('24:48'), M4('27:30'), M4('30:12')],
  },

  /* ──────── Estudios ──────── */
  {
    id: 't-laboratorio',
    sec: 'estudios',
    titulo: 'Laboratorio',
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Pedido', 'Para qué'],
        filas: [
          ['Hemograma, leucocitos', 'Infección, anemia'],
          ['Glucemia', 'Cetoacidosis diabética'],
          ['Uremia', 'Falla renal; también puede orientar a hemorragia'],
          ['**Amilasa**', 'Pancreatitis, pero sube también en ectópico, obstrucción, isquemia, úlcera perforada'],
          ['Hepatograma', 'Procesos colestásicos y pancreáticos'],
          ['Ionograma', 'Deshidratación, híper o hipopotasemia'],
          ['**Troponina**', 'Descartar infarto si el ECG está alterado'],
          ['Prueba de embarazo, orina', 'Ectópico; patología urinaria'],
        ],
      },
    ],
    voz: [
      'En el laboratorio, hemograma y leucocitos.',
      'Glucemia, por la cetoacidosis.',
      'Uremia.',
      'La amilasa: orienta a pancreatitis, pero ojo, también sube en otras causas, como el embarazo ectópico o la obstrucción intestinal.',
      'Hepatograma.',
      'Ionograma.',
      'Troponina, si tenés un electrocardiograma alterado.',
      'Y siempre, prueba de embarazo y análisis de orina.',
    ],
    refs: [M4('28:10'), M4('28:52'), M4('29:32'), L('409')],
  },
  {
    id: 't-imagenes',
    sec: 'estudios',
    titulo: 'Imágenes',
    bloques: [
      {
        t: 'secuencia',
        flechas: true,
        items: [
          { ico: 'eco', t: 'Ecografía', d: 'lo primero: la más barata y rápida', tono: 'mint' },
          { ico: 'rx', t: 'Rx de tórax y abdomen', d: 'de pie: Popper, asas dilatadas', tono: 'sky' },
          { ico: 'tac', t: 'TC de abdomen y pelvis', d: 'si a las 24 h no hay diagnóstico', tono: 'lilac' },
        ],
      },
      { t: 'texto', en: 2, soloWeb: true, text: 'En la TC, una apendicitis se ve como el «signo del tiro al blanco». Calcificaciones o borramiento del psoas orientan a un proceso inflamatorio. El **enema** sirve para ubicar una obstrucción.' },
    ],
    voz: [
      'Y las imágenes. Lo primero que se pide es la ecografía: es lo más barato y lo más rápido.',
      'La radiografía de tórax y abdomen de pie, para buscar aire libre y asas dilatadas.',
      'Y si a las veinticuatro horas no hay diagnóstico, tomografía de abdomen y pelvis. Con esto, ya tenés todo el capítulo. Ahora a practicar.',
    ],
    refs: [M4('30:12'), M4('31:32'), M4('32:13'), M4('32:55')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'dolor', label: 'Tipos de dolor' },
    { id: 'clasif', label: 'Clasificación' },
    { id: 'cinco', label: 'Los 5 quirúrgicos' },
    { id: 'inflamatorio', label: 'Inflamatorio y Murphy' },
    { id: 'obstructivo', label: 'Obstructivo' },
    { id: 'perforativo', label: 'Perforativo' },
    { id: 'hemorragico', label: 'Hemorrágico' },
    { id: 'vascular', label: 'Vascular' },
    { id: 'exploracion', label: 'Exploración' },
    { id: 'estudios', label: 'Estudios' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS (simulacro) ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'practica',
    titulo: 'Varón de 19 años',
    texto: 'Hace 14 horas empezó con dolor en la boca del estómago. Después bajó alrededor del ombligo y ahora lo señala con un dedo en la fosa ilíaca derecha. Primero vomitó y recién después tuvo 38 °C. Al soltar bruscamente la FID le duele más que al comprimir.',
    pregunta: '¿Qué significa que el dolor ahora esté localizado?',
    opciones: [
      { text: 'La inflamación alcanzó el peritoneo parietal.', why: 'El dolor pasó de visceral (fibras C, mal localizado) a somático (preciso).' },
      { text: 'El apéndice cambió de lugar.', why: 'El apéndice no se mueve: lo que cambia es la hoja del peritoneo irritada.' },
      { text: 'Se perforó el apéndice.', why: 'La perforación da dolor súbito y generalizado, no un dolor que se localiza.' },
      { text: 'El dolor sigue siendo visceral, pero más intenso.', why: 'El dolor visceral no se puede señalar con un dedo.' },
    ],
    correcta: 0,
    razonamiento: 'Cronología de Murphy más tríada en orden (dolor, vómitos, fiebre) más Blumberg: abdomen agudo inflamatorio por apendicitis.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Hombre de 58 años con úlcera conocida',
    texto: 'Dolor brusco, intenso y generalizado. Está inmóvil, con el abdomen duro y RHA ausentes. A la percusión hay timpanismo sobre el área hepática.',
    pregunta: '¿Qué estudio muestra directamente el mecanismo que sospechás?',
    opciones: [
      { text: 'Radiografía de tórax de pie.', why: 'Muestra el aire subdiafragmático (Popper), la consecuencia directa de la perforación.' },
      { text: 'Electrocardiograma.', why: 'Lo llevaría igual por tener dolor supraumbilical, pero no muestra la perforación.' },
      { text: 'Tomografía a las 24 horas.', why: 'Es quirúrgico de entrada: no se esperan 24 horas.' },
      { text: 'Amilasa.', why: 'Puede subir en la úlcera perforada, pero es inespecífica.' },
    ],
    correcta: 0,
    razonamiento: 'Aire libre que asciende (Jobert, Popper) más peritonitis secundaria (tabla, RHA ausentes): abdomen agudo perforativo.',
  },
  {
    id: 'c3',
    origen: 'clase',
    titulo: 'Mujer de 22 años en la guardia',
    texto: 'Dolor abdominal generalizado y vómitos biliosos. Presión 90/50, taquicárdica, saturando 93 %, con fiebre y sin ictericia. El signo de Murphy era positivo, pero no del todo manifiesto.',
    pregunta: '¿Cómo se escribe el diagnóstico presuntivo?',
    opciones: [
      { text: 'Abdomen agudo inespecífico (¿colecistitis?).', why: 'Sin evidencia suficiente, se deja constancia del síndrome y, entre paréntesis, de lo que se sospecha.' },
      { text: 'Colecistitis aguda, sin más estudios.', why: 'Falta evidencia: hay que pedir los estudios antes de afirmarlo.' },
      { text: 'Abdomen agudo perforativo.', why: 'No hay tabla ni timpanismo hepático descriptos.' },
      { text: 'Gastroenteritis aguda.', why: 'No explica el compromiso hemodinámico ni el Murphy positivo.' },
    ],
    correcta: 0,
    razonamiento: 'Es un diagnóstico por exclusión que obliga a estudiar y seguir. En este caso, la paciente tenía cálculos en la vía biliar y se operó a la mañana siguiente.',
    refs: [M3('10:15'), M3('11:36'), M3('25:18')],
  },
  {
    id: 'c4',
    origen: 'clase',
    titulo: 'Paciente con aterosclerosis y equimosis en los flancos',
    texto: 'Dolor abdominal, desorientado y deshidratado. Tenía aterosclerosis y le habían colocado un stent hacía poco. Algunos atribuyeron las equimosis a un problema de plaquetas.',
    pregunta: '¿Qué hay que pensar primero?',
    opciones: [
      { text: 'Rotura de aneurisma de aorta con sangrado retroperitoneal.', why: 'Las equimosis en los flancos (Grey-Turner) indican sangre en el retroperitoneo.' },
      { text: 'Pancreatitis necrohemorrágica, porque el signo es patognomónico.', why: 'Es el error que advierte el profesor: no son patognomónicos.' },
      { text: 'Trastorno de las plaquetas.', why: 'Fue la interpretación que demoró el diagnóstico: revisá siempre el abdomen.' },
      { text: 'Abdomen agudo obstructivo.', why: 'La obstrucción no produce equimosis.' },
    ],
    correcta: 0,
    razonamiento: 'Abdomen agudo hemorrágico: sangre en el retroperitoneo, equimosis e hipovolemia con mala perfusión cerebral. En el caso que cuenta el profesor, el paciente murió porque no se actuó a tiempo.',
    refs: [M4('10:18'), M4('11:02')],
  },
  {
    id: 'c5',
    origen: 'practica',
    titulo: 'Mujer de 70 años, fibrilación auricular',
    texto: 'Dolor abdominal de 4 horas, muy intenso, que no calmó con ningún analgésico. El abdomen está blando, casi sin dolor a la palpación, y se auscultan RHA. Lactato 4,2.',
    pregunta: '¿Por qué el examen es casi normal con tanto dolor?',
    opciones: [
      { text: 'Al principio solo sufre la víscera: aún no se compromete el peritoneo parietal.', why: 'Es dolor visceral isquémico; los signos peritoneales llegan cuando el daño es transmural.' },
      { text: 'Porque el dolor es psicógeno.', why: 'El lactato elevado y el contexto indican lo contrario.' },
      { text: 'Porque el abdomen hemorrágico es blando.', why: 'No hay hipovolemia ni matidez descriptas.' },
      { text: 'Porque hay una obstrucción incompleta.', why: 'No hay dolor cólico, vómitos ni ruidos de lucha.' },
    ],
    correcta: 0,
    razonamiento: 'Abdomen agudo vascular. Mucho dolor, examen pobre y lactato alto en un paciente con riesgo embólico: hay que actuar sin esperar los signos peritoneales.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'dolor',
        label: 'Dolor abdominal',
        tone: 'sky',
        nota: 'Según qué hoja se irrita y cómo viaja la señal',
        hijos: [
          { id: 'vis', label: 'Visceral', tone: 'sky', nota: 'Peritoneo visceral · fibras C · mal localizado · duele al **comprimir**' },
          {
            id: 'som',
            label: 'Somático',
            tone: 'rose',
            nota: 'Peritoneo parietal · D7–L1 · bien localizado · duele al **soltar**',
            hijos: [
              { id: 'blu', label: 'Blumberg', tone: 'gold', nota: 'Rebote localizado' },
              { id: 'gue', label: 'Gueneau de Mussy', tone: 'red', nota: 'Rebote generalizado' },
            ],
          },
          { id: 'ref', label: 'Referido', tone: 'lilac', nota: 'Convergencia medular · apendicitis → epigastrio · infarto inferior → «úlcera»' },
        ],
      },
      {
        id: 'aa',
        label: 'Abdomen agudo',
        tone: 'lilac',
        nota: 'Síndrome: el dolor es el síntoma cardinal',
        hijos: [
          { id: 'med', label: 'Médico', tone: 'mint', nota: 'Gastroenteritis · pielonefritis · cetoacidosis · infarto' },
          {
            id: 'qui',
            label: 'Quirúrgico',
            tone: 'rose',
            examen: true,
            nota: 'Evaluación por cirugía',
            hijos: [
              { id: 'q1', n: '1', label: 'Inflamatorio', tone: 'rose', nota: 'Las -itis · tríada de Murphy · asa centinela' },
              { id: 'q2', n: '2', label: 'Obstructivo', tone: 'peach', nota: 'Bridas, hernias, tumores · RHA de lucha' },
              { id: 'q3', n: '3', label: 'Perforativo', tone: 'gold', examen: true, nota: 'Aire libre · tabla · **Jobert**' },
              { id: 'q4', n: '4', label: 'Hemorrágico', tone: 'red', examen: true, nota: 'Sangre · **matidez** · Cullen y Grey-Turner' },
              { id: 'q5', n: '5', label: 'Vascular', tone: 'lilac', nota: 'Oclusión mesentérica · el más letal' },
            ],
          },
          { id: 'ine', label: 'Inespecífico', tone: 'peach', nota: 'Por exclusión · mujeres jóvenes' },
        ],
      },
    ],
    nexos: ['**Duración:** agudo menos de 7 días, crónico más de 7 días.', '**Por arriba del ombligo:** siempre electrocardiograma.'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  repaso: {
    src: 'media/dig-02/repaso-abdomen-agudo.mp4',
    poster: 'media/dig-02/repaso-abdomen-agudo.jpg',
    duration: '5:29',
    chapters: [
      { t: 0, label: 'Definición y dolor' },
      { t: 39, label: 'Tipos de dolor' },
      { t: 61, label: 'Clasificación' },
      { t: 76, label: 'Los cinco quirúrgicos' },
      { t: 117, label: 'Perforativo y hemorrágico' },
      { t: 151, label: 'Cullen y Grey-Turner' },
      { t: 175, label: 'Blumberg y Gueneau de Mussy' },
      { t: 205, label: 'Peritonitis' },
      { t: 246, label: 'Causas por cuadrante' },
      { t: 281, label: 'Examen físico y estudios' },
    ],
    script: [],
  },
  casos,
  simulacroDesarrollos: ['dig02-d01', 'dig02-d02', 'dig02-d05'],
  anclas: {
    ubicate: { tab: 'mapa' },
    dolor: { tab: 'teoria', seccion: 'dolor' },
    clasificacion: { tab: 'teoria', seccion: 'clasif' },
    cinco: { tab: 'teoria', seccion: 'cinco' },
    inflamatorio: { tab: 'teoria', seccion: 'inflamatorio' },
    obstructivo: { tab: 'teoria', seccion: 'obstructivo' },
    perforativo: { tab: 'teoria', seccion: 'perforativo' },
    hemorragico: { tab: 'teoria', seccion: 'hemorragico' },
    vascular: { tab: 'teoria', seccion: 'vascular' },
    regiones: { tab: 'teoria', seccion: 'exploracion' },
    estudio: { tab: 'teoria', seccion: 'exploracion' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    maniobras: { tab: 'maniobras' },
    integracion: { tab: 'cierre' },
  },
};
