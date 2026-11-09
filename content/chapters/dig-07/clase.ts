import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * dig-07: clase visual del síndrome ulceroso y la gastritis.
 *  1. Clases de Ortega: Sd. ulceroso–gastritis partes 1 (8:31), 2 (34:43) y 3 (16:45).
 *  2. Libro de Clínica Médica de Ortega (p. 370–374): aclaraciones (ureasa, Zollinger-Ellison, clasificación).
 *  3. Preguntero: bloque «Síndromes: esofágico, ulceroso y gastritis», P3–P9.
 * Errores de la transcripción que se enseñan corregidos sin atribuirlos: mecanismo de la ureasa, lectura de la prueba
 * del aliento, OCA con claritromicina, origen de la gastrina (células G del antro), factor intrínseco y vitamina B12.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const U1 = (t: string) => r('sd-ulc-1', t);
const U2 = (t: string) => r('sd-ulc-2', t);
const U3 = (t: string) => r('sd-ulc-3', t);
const L = (p: string) => r('libro', undefined, p);

const GRAL = 'Fisiología general, no se da en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-defensa',
    sec: 'barrera',
    titulo: 'Cómo se defiende el estómago',
    etapas: ['normal'],
    fig: { f: 'barrera', vistas: ['normal'] },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Barrera mucosa', tono: 'sky', text: '**Moco y bicarbonato** sobre el epitelio.' },
      { t: 'def', term: 'Flujo sanguíneo local', tono: 'red', en: 1, text: 'Trae el **bicarbonato** a la mucosa.' },
      { t: 'def', term: 'Prostaglandinas', tono: 'mint', en: 2, text: 'Mantienen **dilatados** los vasos y estimulan moco y bicarbonato.' },
    ],
    aclara: { text: 'La úlcera aparece cuando se rompe el equilibrio entre la agresión (ácido, pepsina) y estas defensas.', origen: 'Libro, p. 370.' },
    voz: [
      'Empecemos por la defensa. El estómago tiene un pH de uno a dos, y su mucosa sobrevive gracias a tres cosas. La barrera mucosa: una capa de moco con bicarbonato sobre el epitelio.',
      'El flujo sanguíneo local, que trae el bicarbonato.',
      'Y las prostaglandinas, que mantienen dilatados esos vasos y estimulan el moco y el bicarbonato. Si alguna falla, el ácido lesiona la mucosa.',
    ],
    refs: [U1('04:48'), U1('05:28'), U1('06:08'), U1('07:29'), L('370')],
  },
  {
    id: 'f-aine',
    sec: 'barrera',
    titulo: 'AINE: se pierden las prostaglandinas',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'barrera', vistas: ['normal', 'aine'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Aspirina y AINE inhiben la **ciclooxigenasa** (COX-1 y COX-2).' },
          { k: 'mecanismo', text: 'Sin **prostaglandinas**: vasoconstricción, menos moco y menos bicarbonato.' },
          { k: 'signo', text: 'El ácido llega al epitelio: **erosiones y úlceras**.' },
        ],
      },
    ],
    aclara: { text: 'Los **corticoides** actúan antes en la misma cadena: inhiben la fosfolipasa A2, no se forma ácido araquidónico y tampoco prostaglandinas.', origen: 'Clase, min 24:26.' },
    voz: [
      'El primer gran agresor son los antiinflamatorios. La aspirina y los AINE inhiben la ciclooxigenasa.',
      'Sin ciclooxigenasa no hay prostaglandinas: los vasos de la mucosa se contraen, llega menos bicarbonato y se produce menos moco.',
      'Entonces el ácido toca el epitelio, y aparecen erosiones y úlceras.',
    ],
    refs: [U2('16:25'), U2('17:08'), U2('17:48'), U2('19:54'), U2('22:51'), U2('24:26')],
  },
  {
    id: 'f-hp',
    sec: 'barrera',
    titulo: 'Helicobacter pylori: la nube alcalina',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'barrera', vistas: ['normal', 'hp'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'El H. pylori coloniza el **antro**, sobre una mucosa dañada.' },
          { k: 'mecanismo', text: 'Su **ureasa** desdobla la urea en **amoníaco** y CO₂: alcaliniza su entorno y lo protege del ácido.' },
          { k: 'mecanismo', text: 'El **amoníaco** y la inflamación lesionan la mucosa; aumenta la gastrina y la secreción ácida.' },
          { k: 'signo', text: '**Gastritis** y **úlcera**.' },
        ],
      },
    ],
    aclara: { text: 'Por eso las pruebas de la ureasa y del aliento detectan la bacteria: buscan los productos de esa reacción.', origen: 'Libro, p. 371.' },
    voz: [
      'El segundo agresor es el Helicobacter pylori, que coloniza sobre todo el antro, aprovechando una mucosa ya dañada.',
      'La bacteria fabrica ureasa, una enzima que desdobla la urea en amoníaco y dióxido de carbono. Así crea a su alrededor una nube alcalina que la protege del ácido.',
      'Pero el amoníaco es tóxico para la mucosa, la bacteria genera inflamación, y aumentan la gastrina y la secreción de ácido.',
      'El resultado es la gastritis y la úlcera.',
    ],
    refs: [U2('00:44'), U2('01:25'), U2('02:51'), U2('10:37'), U2('14:17'), L('371')],
  },
  {
    id: 'f-ulcera',
    sec: 'barrera',
    titulo: 'Erosión o úlcera: la profundidad',
    etapas: ['alteracion', 'signo'],
    fig: { f: 'barrera', vistas: ['ulcera'] },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Erosión (exulceración)', tono: 'peach', text: 'Pérdida de sustancia que **no atraviesa** la muscular de la mucosa: las «úlceras» agudas.' },
      { t: 'def', term: 'Úlcera verdadera', tono: 'red', en: 1, text: '**Atraviesa** la muscular de la mucosa: la deja expuesta al ácido. Crónica, con **fibrosis**.' },
    ],
    voz: [
      'Y la diferencia entre una erosión y una úlcera es la profundidad. Si la pérdida de sustancia no atraviesa la muscular de la mucosa, es una erosión, también llamada exulceración: son las lesiones agudas.',
      'La úlcera verdadera atraviesa la muscular de la mucosa y queda expuesta al ácido. Es crónica, y por eso tiene fibrosis.',
    ],
    refs: [U1('00:44'), U1('01:25'), U1('04:06'), L('370')],
  },
  {
    id: 'f-zollinger',
    sec: 'acido',
    titulo: 'Zollinger-Ellison: demasiada gastrina',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'estomago', vistas: [['acido']] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Un **gastrinoma** (tumor pancreático) produce gastrina sin control.' },
          { k: 'mecanismo', text: 'La gastrina estimula las células parietales: **hiperclorhidria**, el pH baja de 1.' },
          { k: 'signo', text: 'Epigastralgia y **úlceras múltiples**, graves.' },
        ],
      },
    ],
    voz: [
      'Un caso extremo es el síndrome de Zollinger-Ellison. Un tumor del páncreas, el gastrinoma, produce gastrina sin control.',
      'La gastrina estimula las células parietales, y el estómago produce ácido en exceso: el pH baja de uno.',
      'El paciente tiene dolor epigástrico y úlceras múltiples y graves.',
    ],
    refs: [U2('25:12'), U2('25:55'), L('372')],
  },
  {
    id: 'f-autoinmune',
    sec: 'acido',
    titulo: 'Gastritis autoinmune: sin células parietales',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'barrera', vistas: ['normal', 'autoinmune'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: '**Anticuerpos** contra las células parietales del fondo y el cuerpo.' },
          { k: 'mecanismo', text: 'Sin ácido: **aclorhidria**. Sin **factor intrínseco**: no se absorbe la **vitamina B12** en el íleon.' },
          { k: 'mecanismo', text: 'Sin ácido que la frene, las células G del antro liberan más gastrina: **hipergastrinemia**.' },
          { k: 'signo', text: '**Anemia perniciosa** (macrocítica) y atrofia, con riesgo de cáncer.' },
        ],
      },
    ],
    aclara: { text: 'La **gastrina** la producen las **células G del antro**; el páncreas solo la produce cuando hay un gastrinoma.', origen: GRAL },
    voz: [
      'Y el opuesto: la gastritis autoinmune. El organismo fabrica anticuerpos contra las células parietales del fondo y el cuerpo del estómago.',
      'Esas células producen el ácido y el factor intrínseco. Sin ellas no hay ácido, y sin factor intrínseco la vitamina B12 no se absorbe en el íleon terminal.',
      'Como no hay ácido que la frene, las células G del antro liberan más gastrina.',
      'El resultado es una anemia perniciosa, macrocítica, y una mucosa que se atrofia, con mayor riesgo de cáncer.',
    ],
    refs: [U3('10:21'), U3('11:02'), U3('11:42'), U3('12:25'), U3('13:10')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'barrera', label: 'Barrera y agresores' },
    { id: 'acido', label: 'Exceso y falta de ácido' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-aviso',
    sec: 'ulcera',
    titulo: 'Úlcera y gastritis: lo más preguntado',
    amplio: true,
    bloques: [
      { t: 'clave', tono: 'red', text: 'Pregunta de parcial, en el **oral** y en el **choice**.' },
      { t: 'texto', en: 1, text: '**Síndrome ulceroso:** signos y síntomas por una **úlcera**: pérdida de sustancia de la mucosa que **atraviesa la muscular de la mucosa** y queda expuesta al ácido.' },
    ],
    examen: { origen: 'ortega', texto: 'Úlcera péptica y gastritis.', cita: 'Pregunta muchísimo lo que es úlcera péptica, tienen que saber úlcera péptica, tienen que saber de gastritis.', ref: U1('00:23') },
    voz: [
      'Empezamos con lo que el profesor marca como lo más importante: úlcera y gastritis son pregunta de parcial, en el oral y en el choice.',
      'El síndrome ulceroso es el conjunto de signos y síntomas que produce una úlcera: una pérdida de sustancia de la mucosa que atraviesa la muscular de la mucosa y la deja expuesta al ácido.',
    ],
    refs: [U1('00:03'), U1('00:23'), U1('00:44'), L('370')],
  },
  {
    id: 't-clasificacion',
    sec: 'ulcera',
    titulo: 'Aguda o crónica',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Aguda', 'Crónica'],
        filas: [
          ['Qué es', '**Exulceración**: no es verdadera úlcera', '**Úlcera verdadera**, la más frecuente'],
          ['Dónde', 'Al azar', '**Antro** y 1.ª–2.ª porción del **duodeno**'],
          ['Número', 'Múltiples', 'Generalmente única'],
          ['Tamaño', 'Pequeña', '2 a 4 cm'],
          ['Fibrosis', 'No', '**Sí**'],
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Clasificación de las úlceras pépticas.' },
    aclara: { text: 'En clase se aclara que esta clasificación es más de anatomía patológica; lo que sí hay que saber es la localización.', origen: 'Clase, min 01:18.' },
    voz: [
      'Se clasifican en agudas y crónicas. La aguda no es una verdadera úlcera: es una exulceración, que no atraviesa la muscular de la mucosa. La crónica sí, y es la más frecuente.',
      'La aguda aparece en cualquier lugar; la crónica, en el antro y en la primera y segunda porción del duodeno.',
      'Las agudas suelen ser múltiples; las crónicas, únicas.',
      'Las agudas son pequeñas; las crónicas miden de dos a cuatro centímetros.',
      'Y la crónica tiene fibrosis: todo lo crónico tiende a la fibrosis.',
    ],
    refs: [U1('00:44'), U1('01:25'), U1('03:26'), U1('04:06'), L('370')],
  },
  {
    id: 't-localizacion',
    sec: 'ulcera',
    titulo: 'Dónde se ubican',
    fig: { f: 'tracto', vistas: [{ luz: { estomago: 'rose', piloro: 'rose', duodeno: 'red' } }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', tono: 'red', text: '**Antro gástrico** y **1.ª y 2.ª porción del duodeno**: úlceras gastroduodenales.' },
      { t: 'texto', en: 1, text: 'Más frecuentes en el **duodeno** que en el estómago; después esófago, bordes de anastomosis y yeyuno.' },
    ],
    examen: { origen: 'ortega', texto: 'Localización de la úlcera péptica.', cita: 'Antro gástrico y primera y segunda porción del duodeno. Eso sí o sí se tienen que saber.', ref: U1('03:00') },
    voz: [
      'La localización sí hay que saberla sí o sí: el antro gástrico y la primera y segunda porción del duodeno. Por eso se llaman úlceras gastroduodenales.',
      'Son más frecuentes en el duodeno que en el estómago; después vienen el esófago, los bordes de una anastomosis y el yeyuno.',
    ],
    refs: [U1('02:05'), U1('02:46'), U1('03:00'), L('370')],
  },
  {
    id: 't-etiologia',
    sec: 'etiologia',
    titulo: 'Las dos causas más frecuentes',
    fig: { f: 'barrera', vistas: ['hp', 'aine'] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Helicobacter pylori', tono: 'mint', text: 'Coloniza el antro; la **ureasa** genera amoníaco, que alcaliniza su entorno y lesiona la mucosa.' },
      { t: 'def', term: 'Aspirina y AINE', tono: 'peach', en: 1, text: 'Inhiben la ciclooxigenasa: **sin prostaglandinas**, se cae la barrera.' },
    ],
    examen: { origen: 'ortega', texto: 'Factores de riesgo más frecuentes: H. pylori y AINE. La fisiopatogenia puede tomarse en el oral.', cita: '…no es pregunta de parcial en el choice, pero lo pueden preguntar en el oral.', ref: U2('15:18') },
    voz: [
      'Las causas. Las dos más frecuentes, que se preguntan, son el Helicobacter pylori, que coloniza el antro y con su ureasa produce amoníaco, alcaliniza su entorno y lesiona la mucosa.',
      'Y la aspirina y los antiinflamatorios, que inhiben la ciclooxigenasa y dejan a la mucosa sin prostaglandinas. El profesor avisa que el mecanismo puede tomarse en el oral.',
    ],
    refs: [U2('15:01'), U2('15:18'), U2('15:41'), U2('17:08'), L('371')],
  },
  {
    id: 't-otras-causas',
    sec: 'etiologia',
    titulo: 'Otros factores',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Factor', 'Cómo actúa'],
        filas: [
          ['**Estrés** prolongado, cirugías mayores', 'ACTH y cortisol: menos flujo a la mucosa'],
          ['**Corticoides**', 'Inhiben la fosfolipasa A2: no hay prostaglandinas'],
          ['Tabaco, alcohol, café, mate', 'Agreden el epitelio; el café y el mate aumentan el ácido'],
          ['**Zollinger-Ellison**', 'Gastrinoma: hiperclorhidria, úlceras múltiples'],
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Principales etiologías. ¿Qué es el síndrome de Zollinger-Ellison?' },
    voz: [
      'Otros factores. El estrés prolongado y las cirugías mayores: el estrés crónico eleva la ACTH y el cortisol, y disminuye el flujo a la mucosa.',
      'Los corticoides, que impiden la formación de prostaglandinas.',
      'El tabaco, el alcohol, el café y el mate.',
      'Y el síndrome de Zollinger-Ellison: un gastrinoma del páncreas que produce hiperclorhidria y úlceras múltiples. Se trata quitando el tumor.',
    ],
    refs: [U2('22:51'), U2('23:39'), U2('24:26'), U2('25:12'), U2('25:55'), L('372')],
  },
  {
    id: 't-clinica',
    sec: 'clinica',
    titulo: 'El dolor de la úlcera',
    amplio: true,
    bloques: [
      { t: 'clave', text: '**Dolor epigástrico**: la dispepsia de la úlcera.' },
      {
        t: 'cuadro',
        en: 1,
        head: ['ALICIA', 'Úlcera'],
        filas: [
          ['Localización', 'Epigastrio, **sin irradiación**'],
          ['Carácter', 'Quemante, urente'],
          ['Intensidad', 'Variable, intermitente'],
          ['Atenuantes', '**Antiácidos**; en la **duodenal**, a veces la comida'],
          ['Agravantes', 'Lo que aumenta el ácido; en la **gástrica**, la comida'],
        ],
      },
    ],
    voz: [
      'La manifestación más característica es el dolor epigástrico: la dispepsia de la úlcera.',
      'Está en el epigastrio, sin irradiación, es quemante, y su intensidad varía. Lo calman los antiácidos; en la úlcera duodenal, a veces también la comida. Y lo empeora todo lo que aumenta el ácido; en la gástrica, la comida, porque al comer se secreta ácido.',
    ],
    refs: [U2('26:39'), U2('27:21'), U2('28:04'), U2('28:45')],
  },
  {
    id: 't-acompanan',
    sec: 'clinica',
    titulo: 'Lo que acompaña',
    amplio: true,
    bloques: [
      { t: 'lista', items: ['**Acidez**: reflujo, pirosis, eructos.', 'Náuseas y vómitos.', 'Sangrado de erosiones: **hematemesis** o **melena**.', '**Anorexia y pérdida de peso**: pensar en una úlcera **maligna** (cáncer ulcerado).'] },
    ],
    aclara: { text: 'En mayores de 50 años, o con antecedentes familiares de cáncer gástrico, hay que estudiar a fondo.', origen: 'Clase, min 30:12.' },
    voz: [
      'Puede acompañarse de acidez, con reflujo, pirosis y eructos; de náuseas y vómitos; y de sangrado por las erosiones, que se manifiesta como hematemesis o melena.',
      'Y la pérdida de peso es muy importante: las úlceras benignas en general no adelgazan, pero un cáncer ulcerado sí.',
    ],
    refs: [U2('28:45'), U2('29:30'), U2('30:12')],
  },
  {
    id: 't-gastrica-duodenal',
    sec: 'clinica',
    titulo: 'Gástrica o duodenal',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Duodenal', tono: 'sky', items: ['La **más frecuente**', '**Adultos jóvenes**', 'A veces **calma** con la comida', 'Rara vez maligna'] },
          { titulo: 'Gástrica', tono: 'rose', items: ['**Mayores**', '**Empeora** con la comida', 'Siempre endoscopia y **biopsia**: descartar cáncer ulcerado'] },
        ],
      },
    ],
    voz: [
      'La úlcera duodenal es la más frecuente, aparece en adultos jóvenes, puede calmar con la comida, y rara vez es maligna.',
      'La gástrica es más de personas mayores, empeora con la comida, y siempre se le hace endoscopia con biopsia, porque puede ser un cáncer ulcerado.',
    ],
    refs: [U2('30:53'), U2('31:36')],
  },
  {
    id: 't-diagnostico',
    sec: 'diagnostico',
    titulo: 'Diagnóstico: endoscopia',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Anamnesis', tono: 'lilac', text: 'Lo más importante: estrés, **AINE**, automedicación, infusiones, tabaco, alcohol, edad.' },
      { t: 'def', term: 'Examen físico', tono: 'sky', en: 1, text: 'No aporta, salvo que la úlcera se **complique**.' },
      { t: 'def', term: 'Endoscopia digestiva alta', tono: 'red', en: 2, text: 'El **estándar**: dónde, cuántas, tamaño y biopsia. Siempre en mayores de 50–55.' },
    ],
    examen: { origen: 'ortega', texto: 'El estándar de la úlcera es la endoscopia digestiva alta.', cita: 'Preguntas de parcial, y esto lo preguntan en los choices.', ref: U2('33:12') },
    voz: [
      'En el diagnóstico, lo más importante es la anamnesis: estrés, antiinflamatorios, automedicación, infusiones, tabaco, alcohol y la edad.',
      'El examen físico no aporta casi nada, salvo que la úlcera se haya complicado.',
      'Y el estándar, que se pregunta en los choices, es la endoscopia digestiva alta: muestra dónde está la úlcera, cuántas son, su tamaño, y permite la biopsia. La radiografía cayó en desuso.',
    ],
    refs: [U2('32:18'), U2('33:00'), U2('33:12'), U2('33:43'), U3('00:00')],
  },
  {
    id: 't-hp-pruebas',
    sec: 'diagnostico',
    titulo: 'Cómo se busca el Helicobacter pylori',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Prueba', 'Qué es'],
        filas: [
          ['**Endoscopia con biopsia**', 'El estándar: especificidad cercana al 100 %'],
          ['Prueba rápida de la **ureasa**', 'Sobre la biopsia: si la urea se desdobla, hay H. pylori'],
          ['Serología (ELISA)', 'Poco específica'],
          ['PCR', 'Muy específica, cara'],
          ['**Prueba del aliento**', 'Para comprobar la **erradicación** tras el tratamiento'],
        ],
      },
    ],
    aclara: { text: 'Prueba del aliento: el paciente ingiere **urea marcada** (carbono 13 o 14). Si hay H. pylori, su ureasa la desdobla y en el aliento aparece **CO₂ marcado**: prueba positiva. Si no aparece, la bacteria fue erradicada.', origen: 'Libro, p. 371; fisiología general.' },
    voz: [
      'Para buscar el Helicobacter, el estándar sigue siendo la endoscopia con biopsia, con una especificidad cercana al cien por ciento.',
      'Sobre la biopsia se puede hacer la prueba rápida de la ureasa: si la urea se desdobla, hay bacteria.',
      'La serología es poco específica.',
      'La PCR es muy específica, pero cara.',
      'Y la prueba del aliento se usa para comprobar que el tratamiento erradicó la bacteria: se ingiere urea marcada, y si aparece dióxido de carbono marcado en el aliento, la bacteria sigue ahí.',
    ],
    refs: [U3('00:45'), U3('01:26'), U3('02:10'), U3('02:53'), U3('03:38')],
  },
  {
    id: 't-tratamiento',
    sec: 'diagnostico',
    titulo: 'Tratamiento del H. pylori',
    amplio: true,
    bloques: [
      { t: 'def', term: 'OCA', tono: 'mint', text: 'Omeprazol, **claritromicina**, amoxicilina.' },
      { t: 'def', term: 'OMA', tono: 'sky', en: 1, text: 'Omeprazol, **metronidazol**, amoxicilina.' },
      { t: 'texto', en: 1, text: 'Después del tratamiento, la **prueba del aliento** confirma la erradicación.' },
    ],
    voz: [
      'El tratamiento combina un inhibidor de la bomba de protones con dos antibióticos. El OCA: omeprazol, claritromicina y amoxicilina.',
      'O el OMA: omeprazol, metronidazol y amoxicilina. Y después, la prueba del aliento confirma la erradicación.',
    ],
    refs: [U3('02:53'), U3('03:38'), U3('04:27')],
  },
  {
    id: 't-complicaciones',
    sec: 'complicaciones',
    titulo: 'Complicaciones de la úlcera',
    fig: { f: 'tracto', vistas: [{ marca: { o: 'estomago', tone: 'red' }, luz: { estomago: 'red' }, nota: 'Hemorragia', notaTone: 'red' }, { marca: { o: 'duodeno', tone: 'gold' }, luz: { duodeno: 'gold' }, nota: 'Perforación', notaTone: 'gold' }, { marca: { o: 'piloro', tone: 'lilac' }, luz: { piloro: 'lilac', estomago: 'lilac' }, nota: 'Estenosis pilórica', notaTone: 'lilac' }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'def', term: 'Hemorragia digestiva alta', tono: 'red', text: 'La **más frecuente**: hematemesis, melena, hipotensión ortostática, **anemia ferropénica**.' },
      { t: 'def', term: 'Perforación', tono: 'gold', en: 1, text: 'Abdomen agudo perforativo: tabla, Gueneau de Mussy, **Jobert**, **Popper**.' },
      { t: 'def', term: 'Síndrome pilórico', tono: 'lilac', en: 2, text: 'Úlcera crónica fibrosa que tapa el píloro: **vómitos** y **pérdida de peso**.' },
    ],
    examen: { origen: 'ortega', texto: 'Las complicaciones de la úlcera.', cita: '¿Cuáles son las complicaciones? Preguntas de parcial.', ref: U3('05:35') },
    voz: [
      'Las complicaciones son pregunta de parcial. La más frecuente es la hemorragia digestiva alta: el paciente vomita sangre o tiene melena, hipotensión ortostática, taquicardia y anemia ferropénica.',
      'La segunda, la perforación: un abdomen agudo perforativo, con abdomen en tabla, signo de Gueneau de Mussy, el signo de Jobert a la percusión y el de Popper en la radiografía.',
      'Y la tercera, el síndrome pilórico: una úlcera crónica cerca del píloro se fibrosa, se endurece y lo tapa. El paciente vomita y pierde peso.',
    ],
    refs: [U3('05:11'), U3('05:35'), U3('05:55'), U3('06:43'), U3('07:25')],
  },
  {
    id: 't-gastritis',
    sec: 'gastritis',
    titulo: 'Gastritis: definición y clasificación',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Inflamación de la mucosa gástrica, infecciosa o no (autoinmune, fármacos, tabaco, alcohol).' },
      {
        t: 'cuadro',
        en: 1,
        head: ['Criterio', 'Tipos'],
        filas: [
          ['Evolución', '**Aguda** (neutrófilos) · **crónica** (fibrosis, metaplasia, **atrofia**)'],
          ['Localización', 'Antro, cuerpo, cardias'],
          ['Lesión', '**Erosiva** (hemorrágica) · **no erosiva**: tipo A, B y AB'],
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Definición y clasificación de la gastritis.' },
    aclara: { text: 'La gastritis crónica, al atrofiar la mucosa, se relaciona con el **cáncer gástrico**.', origen: 'Clase, min 09:38.' },
    voz: [
      'La gastritis es la inflamación de la mucosa gástrica, por una causa infecciosa o no: autoinmune, fármacos, tabaco o alcohol.',
      'Se clasifica por su evolución en aguda, con neutrófilos, o crónica, con fibrosis, metaplasia y atrofia, que se relaciona con el cáncer. Por su localización. Y por la lesión: erosiva, que es hemorrágica, o no erosiva, que se divide en tipo A, tipo B y tipo AB.',
    ],
    refs: [U3('08:13'), U3('08:58'), U3('09:38'), L('373')],
  },
  {
    id: 't-ab',
    sec: 'gastritis',
    titulo: 'Gastritis tipo A y tipo B',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Tipo A', 'Tipo B'],
        filas: [
          ['Causa', '**Autoinmune**: anticuerpos contra las células parietales', '**Bacteriana**: H. pylori'],
          ['Dónde', '**Fondo y cuerpo**', '**Antro**'],
          ['Ácido', '**Aclorhidria**', 'Normal o aumentado'],
          ['Gastrina', '**Hipergastrinemia**', 'Normal'],
          ['Consecuencia', '**Anemia perniciosa**; atrofia: riesgo de cáncer', 'Se asocia a **úlcera**'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'La gastritis no erosiva: tipo A y tipo B.', cita: 'La no erosiva es la que le van a preguntar a ustedes.', ref: U3('10:07') },
    aclara: { text: 'La infección crónica por H. pylori, si se extiende a todo el estómago (pangastritis), también lleva a la atrofia y aumenta el riesgo de cáncer.', origen: 'Libro, p. 371.' },
    voz: [
      'Y lo que van a preguntar: la gastritis no erosiva, tipo A y tipo B. La tipo A es autoinmune: anticuerpos contra las células parietales. La tipo B es bacteriana, por Helicobacter pylori.',
      'La A está en el fondo y el cuerpo, donde están las células parietales; la B, en el antro.',
      'En la A no hay ácido: aclorhidria. En la B el ácido es normal o está aumentado.',
      'En la A, la gastrina está alta.',
      'Y la A lleva a la anemia perniciosa y a la atrofia, con riesgo de cáncer; la B se asocia a úlcera.',
    ],
    refs: [U3('09:38'), U3('10:07'), U3('10:21'), U3('11:42'), U3('12:25'), U3('13:10')],
  },
  {
    id: 't-gastritis-clinica',
    sec: 'gastritis',
    titulo: 'Clínica y diagnóstico de la gastritis',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Erosiva', tono: 'red', text: 'La mucosa sangra: asintomática, epigastralgia, o **hematemesis** si la erosión es grande.' },
      { t: 'def', term: 'Endoscopia con biopsia', tono: 'sky', en: 1, text: 'El estándar; se busca también el **H. pylori**.' },
      { t: 'def', term: 'Laboratorio en la tipo A', tono: 'lilac', en: 2, text: '**Hipergastrinemia** con **aclorhidria** y **anemia macrocítica** (perniciosa).' },
    ],
    aclara: { text: 'La hipergastrinemia también aparece en el **Zollinger-Ellison**, pero con **hiperclorhidria**: las células parietales están intactas. La tipo A tiene **aclorhidria**. Ese es el diagnóstico diferencial.', origen: 'Clase, min 15:17.' },
    voz: [
      'En la clínica, la gastritis erosiva puede pasar inadvertida, dar dolor epigástrico, o vómitos de sangre si la erosión es grande.',
      'El estándar es la endoscopia con biopsia, donde también se busca el Helicobacter.',
      'Y en el laboratorio de la tipo A, lo que más le interesa al profesor: hipergastrinemia con aclorhidria, y una anemia macrocítica, perniciosa. Con esto, tenés todo el capítulo. Ahora a practicar.',
    ],
    refs: [U3('13:54'), U3('14:35'), U3('15:17'), U3('15:58'), U3('16:23')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'ulcera', label: 'Úlcera' },
    { id: 'etiologia', label: 'Causas' },
    { id: 'clinica', label: 'Clínica' },
    { id: 'diagnostico', label: 'Diagnóstico' },
    { id: 'complicaciones', label: 'Complicaciones' },
    { id: 'gastritis', label: 'Gastritis' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'practica',
    titulo: 'Hombre de 30 años con lumbalgia',
    texto: 'Toma ibuprofeno a diario hace un mes. Consulta por dolor epigástrico quemante; hoy tuvo una deposición negra y está taquicárdico.',
    pregunta: '¿Qué complicación tiene?',
    opciones: [
      { text: 'Hemorragia digestiva alta por úlcera.', why: 'La melena con taquicardia en un consumidor de AINE: la complicación más frecuente de la úlcera.' },
      { text: 'Perforación.', why: 'Daría dolor súbito, tabla y Jobert.' },
      { text: 'Síndrome pilórico.', why: 'Daría vómitos de retención.' },
      { text: 'Gastritis autoinmune.', why: 'No se relaciona con AINE.' },
    ],
    correcta: 0,
    razonamiento: 'Los AINE inhiben la ciclooxigenasa: sin prostaglandinas, se cae la barrera mucosa. La hemorragia es la complicación más frecuente.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Mujer de 62 años con anemia',
    texto: 'Anemia macrocítica, gastrina alta y endoscopia con mucosa atrófica del fondo y el cuerpo. La medición de ácido gástrico muestra aclorhidria.',
    pregunta: '¿Qué tiene?',
    opciones: [
      { text: 'Gastritis tipo A, autoinmune, con anemia perniciosa.', why: 'Sin células parietales no hay ácido ni factor intrínseco.' },
      { text: 'Síndrome de Zollinger-Ellison.', why: 'También eleva la gastrina, pero con hiperclorhidria.' },
      { text: 'Gastritis tipo B por H. pylori.', why: 'Afecta el antro y no da aclorhidria con anemia perniciosa.' },
      { text: 'Úlcera duodenal.', why: 'No explica la anemia macrocítica ni la atrofia del cuerpo.' },
    ],
    correcta: 0,
    razonamiento: 'Hipergastrinemia + aclorhidria = tipo A. Hipergastrinemia + hiperclorhidria = Zollinger-Ellison.',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'Paciente tratado por H. pylori',
    texto: 'Completó el tratamiento con omeprazol, claritromicina y amoxicilina. Un mes después se quiere comprobar si la bacteria fue erradicada.',
    pregunta: '¿Qué prueba se usa?',
    opciones: [
      { text: 'Prueba del aliento con urea marcada.', why: 'Es la de elección para comprobar la erradicación.' },
      { text: 'Serología.', why: 'Los anticuerpos persisten después de erradicar la bacteria.' },
      { text: 'Radiografía de estómago.', why: 'No detecta la bacteria.' },
      { text: 'Gastrinemia.', why: 'No detecta la bacteria.' },
    ],
    correcta: 0,
    razonamiento: 'Si la ureasa del H. pylori desdobla la urea marcada, aparece CO₂ marcado en el aliento: la bacteria persiste.',
  },
  {
    id: 'c4',
    origen: 'practica',
    titulo: 'Hombre de 68 años',
    texto: 'Dolor epigástrico que empeora al comer, pérdida de 7 kg en tres meses. La endoscopia muestra una úlcera en la curvatura menor.',
    pregunta: '¿Qué no puede faltar?',
    opciones: [
      { text: 'Biopsia: descartar un cáncer ulcerado.', why: 'Úlcera gástrica en mayor con pérdida de peso.' },
      { text: 'Tratamiento empírico sin biopsia.', why: 'La gástrica siempre se biopsia.' },
      { text: 'Prueba del aliento únicamente.', why: 'No descarta malignidad.' },
      { text: 'Radiografía con bario.', why: 'Ya hay endoscopia, que es el estándar.' },
    ],
    correcta: 0,
    razonamiento: 'La úlcera gástrica del mayor, que empeora con la comida y adelgaza, obliga a biopsiar.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'ulc',
        label: 'Úlcera péptica',
        tone: 'rose',
        examen: true,
        nota: 'Pasa la muscular de la mucosa · antro y 1.ª–2.ª porción del duodeno',
        hijos: [
          { id: 'cau', label: 'Causas', tone: 'mint', examen: true, nota: '**H. pylori** (ureasa) · **AINE** (sin prostaglandinas) · estrés, corticoides, Zollinger-Ellison' },
          { id: 'cli', label: 'Clínica', tone: 'peach', nota: 'Epigastralgia quemante · duodenal calma con comida, gástrica empeora' },
          { id: 'dx', label: 'Diagnóstico', tone: 'sky', examen: true, nota: '**Endoscopia** con biopsia · ureasa · aliento para la erradicación' },
          { id: 'com', label: 'Complicaciones', tone: 'red', examen: true, nota: 'Hemorragia (la más frecuente) · perforación · síndrome pilórico' },
        ],
      },
      {
        id: 'gas',
        label: 'Gastritis',
        tone: 'lilac',
        examen: true,
        nota: 'Inflamación de la mucosa · aguda o crónica · erosiva o no erosiva',
        hijos: [
          { id: 'ga', label: 'Tipo A', tone: 'lilac', examen: true, nota: 'Autoinmune · fondo y cuerpo · aclorhidria · hipergastrinemia · anemia perniciosa' },
          { id: 'gb', label: 'Tipo B', tone: 'mint', examen: true, nota: 'H. pylori · antro · úlcera' },
        ],
      },
    ],
    nexos: ['**Hipergastrinemia:** con aclorhidria = gastritis A · con hiperclorhidria = Zollinger-Ellison.'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['dig07-d01', 'dig07-d04', 'dig07-d05'],
  anclas: {
    ubicate: { tab: 'mapa' },
    definicion: { tab: 'teoria', seccion: 'ulcera' },
    fisiopatologia: { tab: 'teoria', seccion: 'etiologia' },
    clinica: { tab: 'teoria', seccion: 'clinica' },
    diagnostico: { tab: 'teoria', seccion: 'diagnostico' },
    complicaciones: { tab: 'teoria', seccion: 'complicaciones' },
    gastritis: { tab: 'teoria', seccion: 'gastritis' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    maniobras: { tab: 'maniobras' },
    integracion: { tab: 'cierre' },
  },
};
