import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * dig-12: clase visual de las hemorragias digestivas.
 *  1. Clases de Ortega: «Hemorragias digestivas parte 1» (00:01–31:50) y «parte 2» (00:00–11:55).
 *  2. Libro de Clínica Médica de Ortega (p. 389–392): tabla de clases I–IV, hematocrito, melena (> 50 ml), hematoquecia,
 *     etiologías con porcentajes, ortostatismo en cinco pasos, sonda nasogástrica, estudios y HDB.
 *  3. Preguntero: bloque digestivo, P4–P11 (tabla, HDA, ortostatismo, Forrest, HDB, cuadro HDA vs HDB).
 * Correcciones sin atribuir (ver content/traceability/dig-12.md): la PA cae por pérdida de volumen pese a la vasoconstricción;
 * la hematemesis es ácida; la melena se debe a la degradación de la hemoglobina; la creatinina no baja.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const H1 = (t: string) => r('hd-1', t);
const H2 = (t: string) => r('hd-2', t);
const L = (p: string) => r('libro', undefined, p);

const GRAL = 'Fisiología general, no se da en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-compensa',
    sec: 'clases',
    titulo: 'Cómo compensa el cuerpo la pérdida',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'hipovolemia', vistas: ['I', 'II', 'III', 'IV'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Se pierde **volemia**: llega menos sangre al corazón y cae el gasto.' },
          { k: 'mecanismo', text: 'El simpático acelera el corazón (**taquicardia**) y **contrae** los vasos de piel y riñón.' },
          { k: 'mecanismo', text: 'El riñón retiene agua y sal: **oliguria**.' },
          { k: 'signo', text: 'Cuando ya no alcanza, **cae la presión**, el cerebro se hipoperfunde: confusión, **shock**.' },
        ],
      },
    ],
    aclara: { text: 'La vasoconstricción periférica sostiene la presión al principio; la presión cae recién cuando la pérdida supera esa compensación.', origen: GRAL },
    voz: [
      'Todo paciente que pierde sangre altera sus signos vitales, y la clave es entender por qué. Al perder volemia, llega menos sangre al corazón, y el gasto cardíaco cae. En la clase uno, menos del quince por ciento, casi no se nota.',
      'El cuerpo responde con el simpático: acelera el corazón, y contrae los vasos de la piel y del riñón, para mandar la sangre que queda a los órganos vitales. Por eso el paciente está pálido y taquicárdico.',
      'El riñón, para no perder más volumen, retiene agua y sal: orina cada vez menos.',
      'Cuando la pérdida supera el cuarenta por ciento, la compensación ya no alcanza: la presión cae, el cerebro recibe poca sangre, el paciente se confunde, y entra en shock hipovolémico.',
    ],
    refs: [H1('02:05'), H1('02:48'), H1('03:29'), H1('04:12'), H1('04:53'), L('389')],
  },
  {
    id: 'f-ortostatismo',
    sec: 'clases',
    titulo: 'Por qué el ortostatismo delata la hipovolemia',
    etapas: ['normal', 'alteracion', 'signo'],
    amplio: true,
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'normal', text: 'Al pararse, la sangre baja a las piernas. Con volemia normal, el reflejo lo corrige: la presión **casi no cambia**.' },
          { k: 'alteracion', text: 'Con poca volemia no hay reserva para compensar.' },
          { k: 'signo', text: 'La TAS cae **> 20 mmHg**, la TAD **> 10**, la FC sube **> 30 lpm**, mareo o lipotimia.' },
        ],
      },
    ],
    aclara: { text: 'El descenso postural también puede deberse a un trastorno cardíaco o autonómico; en un paciente que sangra, indica hipovolemia.', origen: 'Clase, min 24:25; libro, p. 390.' },
    voz: [
      'El ortostatismo usa ese mismo mecanismo. Al pararse, la sangre baja por gravedad a las piernas. Con una volemia normal, el reflejo lo corrige enseguida, y la presión casi no cambia: cinco o diez milímetros, como mucho.',
      'Pero si el paciente perdió sangre, no tiene reserva para compensar.',
      'Entonces, al ponerse de pie, la sistólica cae más de veinte milímetros, la diastólica más de diez, el pulso sube más de treinta, o el paciente se marea. Es la hipotensión ortostática.',
    ],
    refs: [H1('21:03'), H1('21:43'), H1('23:05'), H1('24:25'), H1('25:06'), L('390')],
  },
  {
    id: 'f-melena',
    sec: 'formas',
    titulo: 'Sangre digerida o sangre fresca',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'tracto', vistas: [{ luz: { estomago: 'red', duodeno: 'red' }, treitz: true, nota: 'Sangre que recorre el tubo: melena', notaTone: 'lilac' }, { luz: { colon: 'red', recto: 'red' }, treitz: true, nota: 'Sangre que sale enseguida: roja', notaTone: 'red' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Melena', tono: 'lilac', text: 'La hemoglobina se **degrada** en su recorrido (ácido, enzimas, bacterias del colon): heces **negras y fétidas**. Hace falta **> 50 ml** y tiempo.' },
      { t: 'def', term: 'Hematoquecia', tono: 'red', en: 1, text: 'Sangre **roja**, sin tiempo de degradarse: en general de abajo del Treitz. Si viene de arriba: **> 1000 ml** o tránsito muy rápido.' },
    ],
    voz: [
      'El color de la sangre en las heces depende del tiempo que pasó en el tubo digestivo. La sangre de un sangrado alto recorre todo el intestino: el ácido, las enzimas y las bacterias del colon degradan la hemoglobina, y las heces salen negras, como alquitrán, y fétidas. Es la melena, y hacen falta más de cincuenta mililitros.',
      'La sangre de un sangrado bajo sale enseguida, roja, sin tiempo de degradarse: la hematoquecia. Para que un sangrado alto salga rojo, tiene que ser enorme, más de un litro, o el tránsito muy rápido.',
    ],
    refs: [H1('08:16'), H1('08:59'), H1('09:39'), H1('12:21'), H1('13:01'), L('389')],
  },
  {
    id: 'f-hematocrito',
    sec: 'clases',
    titulo: 'El hematocrito llega tarde',
    etapas: ['mecanismo', 'signo'],
    amplio: true,
    bloques: [
      { t: 'clave', text: 'En el sangrado agudo se pierden **plasma y glóbulos en la misma proporción**: el hematocrito inicial **no refleja** la pérdida.' },
      { t: 'lista', en: 1, items: ['Baja desde las **8 horas**, cuando entra líquido a los vasos; se equilibra en **24–48 h**.', 'El sangrado crónico deja una **anemia ferropénica**: baja el índice eritrocitario (glóbulos rojos, hemoglobina, hematocrito).'] },
    ],
    voz: [
      'Un detalle del laboratorio. En un sangrado agudo se pierde sangre entera: plasma y glóbulos rojos en la misma proporción. Por eso, al principio, el hematocrito puede ser normal, aunque el paciente haya perdido mucho.',
      'Baja recién a partir de las ocho horas, cuando el líquido de los tejidos pasa a los vasos para reponer el volumen, y se equilibra en uno o dos días. Y si el sangrado es crónico, lo que queda es una anemia ferropénica: bajan los glóbulos rojos, la hemoglobina y el hematocrito.',
    ],
    refs: [H1('05:33'), H1('06:15'), H1('14:22'), L('389')],
  },
  {
    id: 'f-urea',
    sec: 'estudios',
    titulo: 'Por qué sube la urea',
    etapas: ['mecanismo', 'signo'],
    amplio: true,
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'mecanismo', text: 'La sangre en el tubo digestivo alto se digiere como una comida rica en **proteínas**.' },
          { k: 'mecanismo', text: 'Esas proteínas se absorben y el hígado las convierte en **urea**; además, llega menos sangre al riñón.' },
          { k: 'signo', text: '**Urea aumentada** con creatinina normal o apenas alta.' },
        ],
      },
    ],
    aclara: { text: 'Mecanismo del aumento de la urea en la hemorragia digestiva alta.', origen: GRAL },
    voz: [
      'Y otro dato del laboratorio que el profesor remarca: la urea está aumentada. ¿Por qué? La sangre que queda en el tubo digestivo alto se digiere como si fuera una comida muy rica en proteínas.',
      'Esas proteínas se absorben, y el hígado las transforma en urea. A eso se suma que, con la hipovolemia, llega menos sangre al riñón.',
      'El resultado es una urea alta, con una creatinina normal o apenas elevada.',
    ],
    refs: [H1('29:49'), L('391')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'clases', label: 'La pérdida' },
    { id: 'formas', label: 'El color' },
    { id: 'estudios', label: 'El laboratorio' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-intro',
    sec: 'clases',
    titulo: 'Hemorragia digestiva',
    fig: { f: 'hipovolemia', vistas: ['II'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'Una **emergencia** gastrointestinal frecuente: más que motivo de consulta, motivo de **internación**.' },
      { t: 'texto', en: 1, text: 'Lo primero, sea cual sea el origen: **cuánta sangre perdió**, por los signos vitales.' },
    ],
    examen: { origen: 'ortega', texto: 'Hemorragia digestiva, cirrosis e hipertensión portal, y pancreatitis aguda.', cita: 'Esos temas son muy preguntados en el parcial, son muy preguntados en el final, sobre todo en la parte choice y en el oral.', ref: H1('00:15') },
    voz: [
      'Empieza la segunda parte de los síndromes digestivos, con tres temas que el profesor marca como muy preguntados en el parcial, en el choice, en el oral y en el final: hemorragia digestiva, cirrosis e hipertensión portal, y pancreatitis aguda. La hemorragia digestiva es una emergencia frecuente: más que un motivo de consulta, es un motivo de internación.',
      'Antes de buscar de dónde sangra, lo primero es saber cuánta sangre perdió, y eso se estima con los signos vitales.',
    ],
    refs: [H1('00:01'), H1('00:15'), H1('00:42'), H1('01:23'), L('389')],
  },
  {
    id: 't-tabla',
    sec: 'clases',
    titulo: 'Clases de hemorragia I a IV',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'I · leve', 'II · moderada', 'III · grave', 'IV · masiva'],
        filas: [
          ['Pérdida (ml)', '< 750', '750–1500', '1500–2000', '> 2000'],
          ['Pérdida (%)', '< 15', '15–30', '30–40', '> 40'],
          ['FC', '< 100', '100–119', '120–139', '> 140'],
          ['PA', 'Normal', 'Normal o baja', 'Baja (TAS < 100)', 'Baja'],
          ['FR', '14–20', '20–30', '30–39', '> 40'],
          ['Diuresis (ml/h)', '> 30', '20–30', '5–20', 'Imperceptible'],
          ['Estado mental', 'Normal', 'Ansioso', 'Ansioso y confuso', 'Confuso'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'La tabla de parámetros vitales según la clase de hemorragia.', cita: 'Este cuadrito… tienen que sabérselo como el Padre Nuestro.', ref: H1('02:22') },
    voz: [
      'Esta tabla el profesor la pide como el Padre Nuestro, y sirve para cualquier hemorragia, no solo la digestiva. Clase uno, leve: menos de setecientos cincuenta mililitros, menos del quince por ciento; todo normal. Clase dos, moderada: hasta mil quinientos, treinta por ciento; el pulso entre cien y ciento diecinueve, la frecuencia respiratoria de veinte a treinta, la diuresis de veinte a treinta mililitros por hora, y el paciente ansioso.',
      'Clase tres, grave: hasta dos litros, cuarenta por ciento; pulso de ciento veinte a ciento treinta y nueve, sistólica menor de cien, orina de cinco a veinte por hora, ansioso y confuso. Y clase cuatro, masiva: más de dos litros, más del cuarenta por ciento; pulso de más de ciento cuarenta, respiración de más de cuarenta, no orina, está confuso. Eso ya es un shock hipovolémico, y hay que actuar de inmediato.',
    ],
    refs: [H1('02:05'), H1('02:22'), H1('02:48'), H1('03:29'), H1('05:33'), H1('05:43'), L('389')],
  },
  {
    id: 't-hipovolemia',
    sec: 'clases',
    titulo: 'Manifestaciones de la hipovolemia',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Manifestación', 'Por qué'],
        filas: [
          ['**Anemia ferropénica**', 'Sangrado crónico: baja el índice eritrocitario'],
          ['**Hipotensión ortostática**', 'No hay volemia para compensar al pararse'],
          ['**Lipotimia**', 'Hipoperfusión cerebral'],
          ['**Disnea**', 'Menos hemoglobina para transportar oxígeno'],
          ['**Angina**', 'Llega menos sangre al corazón'],
          ['**Shock**', 'La pérdida supera la compensación'],
        ],
      },
    ],
    voz: [
      'Las manifestaciones de la hipovolemia, cada una con su porqué. La anemia ferropénica, cuando el sangrado es crónico. La hipotensión ortostática, porque no hay volemia para compensar al pararse. La lipotimia, porque el cerebro recibe poca sangre. La disnea, porque hay menos hemoglobina para llevar oxígeno. La angina, porque también le llega menos sangre al corazón. Y el shock, cuando la pérdida supera la compensación.',
    ],
    refs: [H1('14:22'), H1('15:02'), L('389')],
  },
  {
    id: 't-ortostatismo',
    sec: 'clases',
    titulo: 'Prueba de hipotensión ortostática',
    amplio: true,
    bloques: [
      {
        t: 'lista',
        items: ['Paciente en **posición supina**.', 'Esperar **al menos 2 minutos**.', 'Medir **FC y TA**.', 'Pedirle que se **ponga de pie**.', 'Repetir la medición a los **1, 3 y 5 minutos**.'],
      },
      { t: 'clave', tono: 'red', en: 1, text: 'Positiva: TAS baja **> 20 mmHg**, TAD **> 10 mmHg**, o **mareo o lipotimia**. La FC que sube **> 30 lpm** también orienta.' },
    ],
    examen: { origen: 'ortega', texto: 'Cómo se hace el ortostatismo y cuándo es positivo.', cita: 'Esto lo preguntan en el parcial: cuál de estas características tiene que tener el paciente o cuándo decimos que el paciente tiene ortostatismo positivo.', ref: H1('21:05') },
    voz: [
      'La prueba de hipotensión ortostática, que se pregunta en el parcial, tiene cinco pasos: el paciente acostado boca arriba; esperar por lo menos dos minutos; medir la frecuencia cardíaca y la presión; pedirle que se pare; y repetir la medición al minuto, a los tres y a los cinco minutos.',
      'Es positiva si la sistólica baja más de veinte milímetros de mercurio, la diastólica más de diez, o el paciente se marea o tiene una lipotimia. Si el pulso sube más de treinta latidos, también orienta a hipovolemia.',
    ],
    refs: [H1('20:23'), H1('21:03'), H1('21:05'), H1('22:23'), H1('23:05'), H1('25:06'), L('390')],
  },
  {
    id: 't-hematemesis',
    sec: 'formas',
    titulo: 'Hematemesis',
    fig: { f: 'tracto', vistas: [{ luz: { esofago: 'red', estomago: 'red', duodeno: 'red' }, treitz: true }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', tono: 'red', text: 'Vómito de sangre, roja o **en borra de café**: **siempre indica sangrado alto**.' },
      { t: 'texto', en: 1, text: 'Diferencial con la **hemoptisis**: la hematemesis es ácida, oscura, con restos de alimento (ver el cuadro de dig-01).' },
    ],
    examen: { origen: 'ortega', texto: 'Diagnóstico diferencial de hematemesis y hemoptisis.', cita: '¿Cómo es el diagnóstico diferencial de hematemesis con hemoptisis? Pregunta de parcial.', ref: H1('08:10') },
    voz: [
      'Las formas de presentación. La hematemesis es el vómito de sangre, roja o con coágulos en borra de café, y siempre indica un sangrado alto. Lo mismo significa un aspirado por sonda nasogástrica con sangre.',
      'Y su diagnóstico diferencial con la hemoptisis es pregunta de parcial: la hematemesis es ácida, oscura y con restos de alimento; ese cuadro está completo en el capítulo de vómitos.',
    ],
    refs: [H1('06:56'), H1('07:36'), H1('08:10'), L('389')],
  },
  {
    id: 't-melena-hq',
    sec: 'formas',
    titulo: 'Melena y hematoquecia',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Melena', tono: 'lilac', items: ['Heces **negras**, fétidas: sangre digerida', '**85 % alta**', '< 15 % baja (delgado, colon derecho) con **tránsito lento**'] },
          { titulo: 'Hematoquecia', tono: 'red', items: ['Sangre **roja** con las heces o sola', '**85 % baja**', '10–15 % alta: **> 1000 ml** o tránsito **rápido**'] },
        ],
      },
      { t: 'prof', en: 1, text: 'La hematoquecia es otra pregunta que le habían hecho a uno de los compañeros en el final.', ref: H1('12:53') },
    ],
    voz: [
      'La melena son heces negras y fétidas, de sangre digerida: en el ochenta y cinco por ciento viene del tubo digestivo alto. Menos del quince por ciento viene de abajo, del delgado o del colon derecho, y solo si el tránsito es lento.',
      'La hematoquecia es al revés: sangre roja, con las heces o sola, que en el ochenta y cinco por ciento viene de abajo. Puede venir de arriba si se pierden más de mil mililitros o si el tránsito es muy rápido. El profesor cuenta que se la preguntaron a un compañero en el final.',
    ],
    refs: [H1('08:16'), H1('10:19'), H1('11:39'), H1('12:53'), H1('13:41'), L('389')],
  },
  {
    id: 't-formas-baja',
    sec: 'formas',
    titulo: 'Sangre oculta, enterorragia y proctorragia',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Sangre oculta', tono: 'sky', text: 'Invisible: se descubre por una **anemia ferropénica** y se busca en las heces (agua oxigenada). Después: **colonoscopía**.' },
      { t: 'def', term: 'Enterorragia', tono: 'peach', en: 1, text: 'Sangre que **baña las heces**.' },
      { t: 'def', term: 'Proctorragia', tono: 'red', en: 1, text: 'Sangre pura, **gotas al final** de la deposición: recto o ano.' },
      { t: 'texto', en: 2, text: 'Colon izquierdo: rojo **rutilante** · colon derecho: rojo oscuro · ciego: puede dar **melena**.' },
    ],
    voz: [
      'En la hemorragia baja hay otras formas. La sangre oculta no se ve: se sospecha porque el laboratorio muestra una anemia ferropénica, y se busca en la materia fecal. Si está, el paso siguiente es la colonoscopía.',
      'La enterorragia son heces bañadas en sangre. La proctorragia es sangre pura, que gotea al final de la deposición: viene del recto o del ano.',
      'Y el color orienta la altura: el colon izquierdo da sangre rojo brillante; el derecho, más oscura; y el ciego hasta puede dar melena.',
    ],
    refs: [H2('03:04'), H2('03:46'), H2('04:27'), H2('08:32'), L('391'), L('392')],
  },
  {
    id: 't-treitz',
    sec: 'alta-baja',
    titulo: 'Alta o baja: el ángulo de Treitz',
    fig: { f: 'tracto', vistas: [{ luz: { esofago: 'red', estomago: 'red', duodeno: 'red' }, treitz: true }, { luz: { yeyuno: 'sky', ileon: 'sky', colon: 'sky', recto: 'sky' }, treitz: true }] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Alta', tono: 'red', text: 'Del esfínter esofágico superior **hasta el Treitz** (final del duodeno). La **más frecuente y la más grave**.' },
      { t: 'def', term: 'Baja', tono: 'sky', en: 1, text: 'Por debajo del Treitz: delgado, colon, recto, ano. **Menos frecuente y menos grave**; pasa desapercibida, el paciente suele estar **estable**; el 80 % cede sola.' },
    ],
    voz: [
      'La división la marca el ángulo de Treitz, al final de la cuarta porción del duodeno. La hemorragia alta va desde el esófago hasta el Treitz: es la más frecuente y la más grave.',
      'La baja está por debajo: yeyuno, íleon, colon, recto y ano. Es menos frecuente y menos grave; muchas veces pasa desapercibida, mezclada con las heces, el paciente suele estar hemodinámicamente estable, y en el ochenta por ciento se detiene sola.',
    ],
    refs: [H1('10:19'), H1('15:42'), H2('00:00'), H2('00:46'), L('390'), L('391')],
  },
  {
    id: 't-hda-causas',
    sec: 'alta-baja',
    titulo: 'Causas de hemorragia alta',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Causa', 'Dato'],
        filas: [
          ['**Úlcera péptica** (60 %)', 'La más frecuente'],
          ['Gastritis erosiva', 'La no erosiva no sangra'],
          ['**Várices esofágicas**', 'Hipertensión portal por cirrosis'],
          ['**Mallory-Weiss**', 'Tríada: hematemesis, vómitos, alcoholismo; desgarro lineal esofagogástrico'],
          ['Esofagitis, neoplasias, malformaciones AV', ''],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'La causa más frecuente de hemorragia digestiva alta.', cita: '¿Cuál es la causa más frecuente de hemorragia digestiva alta? Tiene que decir úlceras. Esto es pregunta de parcial.', ref: H1('16:28') },
    voz: [
      'Las causas de hemorragia alta. La más frecuente, y es pregunta de parcial, es la úlcera péptica, alrededor del sesenta por ciento. Le sigue la gastritis erosiva, porque la no erosiva no sangra.',
      'Después, las várices esofágicas, por hipertensión portal de una cirrosis; el síndrome de Mallory-Weiss, con su tríada de hematemesis, vómitos y alcoholismo, por un desgarro lineal de la mucosa esofagogástrica; y la esofagitis, las neoplasias y las malformaciones arteriovenosas.',
    ],
    refs: [H1('16:22'), H1('16:28'), H1('17:02'), H1('18:23'), L('390')],
  },
  {
    id: 't-hda-anamnesis',
    sec: 'alta-baja',
    titulo: 'Toda hemorragia es secundaria',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Hay que buscar la **enfermedad de base**.' },
      {
        t: 'cuadro',
        en: 1,
        head: ['Antecedente', 'Orienta a'],
        filas: [
          ['Aspirina, **AINE**, corticoides, ISRS; H. pylori; pirosis, dolor epigástrico', 'Úlcera o gastritis'],
          ['**Alcohol**, hepatitis virales, hombre', 'Várices (cirrosis), gastritis'],
          ['Alcohol + **vómitos frecuentes**', 'Mallory-Weiss'],
          ['Hepatopatía, insuficiencia renal, coagulopatía', 'Trastorno de la hemostasia'],
        ],
      },
    ],
    voz: [
      'Algo que el profesor repite: toda hemorragia digestiva es secundaria. Nadie vomita sangre sin una enfermedad de base, y la anamnesis va a buscarla.',
      'Si toma aspirina, antiinflamatorios o corticoides, tuvo Helicobacter, o tiene acidez y dolor epigástrico, se piensa en una úlcera o una gastritis. Si es un hombre alcohólico o con hepatitis a repetición, en várices por cirrosis. Si es alcohólico y vomita mucho, en un Mallory-Weiss. Y hay que averiguar enfermedades que alteren la coagulación.',
    ],
    refs: [H1('17:02'), H1('17:43'), H1('18:23'), H1('19:03'), L('390')],
  },
  {
    id: 't-hdb-causas',
    sec: 'alta-baja',
    titulo: 'Causas de hemorragia baja',
    amplio: true,
    bloques: [
      { t: 'clave', tono: 'peach', text: 'Las más frecuentes: **hemorroides y fisuras anales**.' },
      {
        t: 'cuadro',
        en: 1,
        head: ['Edad', 'Pensar en'],
        filas: [
          ['**> 65 años**', '**Divertículos**, **angiodisplasia** (ciego y colon ascendente; insuficiencia renal), cáncer'],
          ['**< 45 años**', 'Hemorroides, fisuras, enfermedad inflamatoria intestinal, divertículo de Meckel'],
          ['Ancianos vasculares', 'Colitis isquémica'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'La causa más frecuente de hemorragia digestiva baja.', cita: 'Una pregunta de parcial que muchos confunden: ¿es más frecuente un sangrado por cáncer o por divertículo que por hemorroides? Las hemorroides son más frecuentes.', ref: H2('01:22') },
    voz: [
      'En la hemorragia baja hay una pregunta de parcial que muchos confunden: la causa más frecuente no es el cáncer ni los divertículos, sino las hemorroides y las fisuras anales.',
      'La edad ordena el resto. En el mayor de sesenta y cinco, divertículos, angiodisplasia, que son vasitos anormales del ciego y el colon ascendente, más frecuentes en la insuficiencia renal, y cáncer. En el menor de cuarenta y cinco, hemorroides, fisuras, enfermedad inflamatoria intestinal y divertículo de Meckel. Y en ancianos con enfermedad vascular, la colitis isquémica.',
    ],
    refs: [H2('00:46'), H2('01:22'), H2('01:40'), H2('02:20'), H2('05:08'), L('391')],
  },
  {
    id: 't-hdb-anamnesis',
    sec: 'alta-baja',
    titulo: 'Anamnesis de la hemorragia baja',
    amplio: true,
    bloques: [
      {
        t: 'lista',
        items: [
          'Con **dolor**: enfermedad inflamatoria o isquemia. **Sin dolor**: angiodisplasia, divertículos, cáncer.',
          '**Alarma de cáncer**: constipación nueva, pérdida de peso, **antecedente familiar** de cáncer de colon.',
          'Hemorroides y fisuras: constipación, dolor, sangre roja en el papel o **gotas al final**.',
          'Radioterapia previa; insuficiencia renal crónica (angiodisplasia).',
        ],
      },
    ],
    voz: [
      'La anamnesis de la hemorragia baja sigue la misma lógica. Si hay dolor, se piensa en una enfermedad inflamatoria o una isquemia; si no hay dolor, en angiodisplasia, divertículos o cáncer.',
      'Hay que buscar las alarmas de cáncer: una constipación que no tenía, la pérdida de peso, y los antecedentes familiares. El ejemplo de la clase: un joven con sangre oculta en la materia fecal cuyo abuelo murió de cáncer de colon. Ese antecedente cambia todo.',
      'Las hemorroides y las fisuras dan constipación, dolor, y sangre roja en el papel o gotas en el inodoro al final de la deposición. Y conviene preguntar por radioterapia previa y por insuficiencia renal.',
    ],
    refs: [H2('05:08'), H2('05:49'), H2('06:29'), H2('07:11'), L('391'), L('392')],
  },
  {
    id: 't-comparar',
    sec: 'alta-baja',
    titulo: 'Alta o baja: el cuadro',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Alta', 'Baja'],
        filas: [
          ['Límite', 'Hasta el Treitz', 'Debajo del Treitz'],
          ['Frecuencia y gravedad', '**Más frecuente y más grave**', 'Menos frecuente y menos grave'],
          ['Forma', 'Hematemesis, **melena**', '**Hematoquecia**, enterorragia, proctorragia, sangre oculta'],
          ['Hemodinamia', 'Inestable con más frecuencia', 'Suele estar **estable**'],
          ['Causa más frecuente', '**Úlcera péptica**', '**Hemorroides y fisuras**'],
          ['Estudio', '**Endoscopía alta**', '**Colonoscopía**'],
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Cuadro de diferenciación clínica de HDA y HDB.' },
    voz: [
      'Y todo junto en un cuadro. La alta llega hasta el Treitz, es la más frecuente y la más grave, se presenta como hematemesis o melena, desestabiliza más al paciente, su causa más frecuente es la úlcera péptica, y se estudia con endoscopía alta. La baja está por debajo del Treitz, es menos frecuente y menos grave, da hematoquecia, enterorragia, proctorragia o sangre oculta, el paciente suele estar estable, su causa más frecuente son las hemorroides y las fisuras, y se estudia con colonoscopía.',
    ],
    refs: [H1('15:42'), H2('00:00'), H2('00:46'), L('390'), L('391')],
  },
  {
    id: 't-examen',
    sec: 'estudios',
    titulo: 'Examen físico',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Primero los **signos vitales**: si está inestable, se estabiliza; si está estable, se busca la causa.' },
      {
        t: 'lista',
        en: 1,
        items: ['Perfusión, hidratación, coloración: palidez.', 'Signos de **hepatopatía crónica e hipertensión portal** (várices).', '**Tacto rectal**: confirma melena o hematoquecia; hemorroides, fisuras, masas.', '**Sonda nasogástrica**: sangre roja = activa; borra de café = cesó; claro **no descarta** (15 %); con bilis, el origen es distal al Treitz.'],
      },
    ],
    voz: [
      'En el examen físico, lo primero son los signos vitales: la hemorragia ya está; lo que importa es si el paciente está estable. Si no lo está, se lo estabiliza; si está estable, se busca la causa.',
      'Se evalúan la perfusión, la hidratación y la palidez; se buscan signos de hepatopatía crónica e hipertensión portal, que sugieren várices; y se hace un tacto rectal, que confirma la melena o la hematoquecia y muestra hemorroides o fisuras. La sonda nasogástrica completa: sangre roja indica sangrado activo; borra de café, que ya paró; un aspirado claro no descarta un sangrado alto, y si sale bilis, el origen está por debajo del Treitz.',
    ],
    refs: [H1('19:43'), H1('20:23'), H1('25:06'), H1('25:46'), H2('07:52'), H2('08:32'), L('390'), L('392')],
  },
  {
    id: 't-endoscopia',
    sec: 'estudios',
    titulo: 'Estudios',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Endoscopía digestiva alta', tono: 'red', text: 'El estudio de elección en la alta, en las primeras 24 h: diagnóstica, **terapéutica** y pronóstica.' },
      { t: 'def', term: 'Colonoscopía', tono: 'sky', en: 1, text: 'El de elección en la baja estable. **Completa**: hasta la válvula ileocecal.' },
      { t: 'def', term: 'Si no se encuentra el foco', tono: 'lilac', en: 2, text: '**Arteriografía** o angiografía mesentérica (sangrado activo); centellograma con eritrocitos marcados; laparotomía. El bario ya no se usa.' },
    ],
    voz: [
      'En los estudios, la conducta principal es la endoscopía. En la alta, la endoscopía digestiva alta en las primeras veinticuatro horas: muestra la lesión, permite tratarla y orienta el pronóstico.',
      'En la baja, si el paciente está estable, la colonoscopía; la completa llega hasta la válvula ileocecal.',
      'Si la endoscopía no encuentra el foco y el paciente sigue sangrando, la arteriografía o angiografía mesentérica, con contraste, muestra el vaso que sangra. También el centellograma, y como último recurso la laparotomía. El estudio con bario ya no se usa.',
    ],
    refs: [H1('26:28'), H1('28:29'), H1('29:09'), H2('09:54'), H2('10:34'), H2('11:15'), L('390'), L('391'), L('392')],
  },
  {
    id: 't-lab',
    sec: 'estudios',
    titulo: 'Laboratorio',
    amplio: true,
    bloques: [
      { t: 'lista', items: ['Hemograma, plaquetas, TP, KPTT, glucemia.', '**Urea aumentada**; creatinina.', '**Grupo y factor** sanguíneo, para transfundir.'] },
      { t: 'texto', en: 1, text: 'Si no se conoce el grupo y el paciente se desangra: sangre **0 negativo**.' },
    ],
    voz: [
      'El laboratorio: hemograma con plaquetas, tiempo de protrombina, KPTT, glucemia, urea, que está aumentada, y creatinina. Y siempre grupo y factor, porque puede necesitar una transfusión.',
      'Un dato práctico de la clase: si llega un paciente desangrándose y no se conoce su grupo, se le transfunde sangre cero negativo.',
    ],
    refs: [H1('29:49'), H1('30:30'), H1('31:10'), L('391')],
  },
  {
    id: 't-forrest',
    sec: 'estudios',
    titulo: 'Clasificación de Forrest',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Forrest', 'Úlcera en la endoscopía'],
        filas: [
          ['**Ia**', 'Sangrado activo en chorro'],
          ['**Ib**', 'Sangrado en sábana (rezumante)'],
          ['**IIa**', 'Vaso visible'],
          ['**IIb**', 'Coágulo adherido'],
          ['**IIc**', 'Base pigmentada'],
          ['**III**', 'Base limpia con fibrina'],
        ],
      },
      { t: 'texto', en: 1, text: 'Cuanto **más bajo** el número, **más riesgo** de que vuelva a sangrar.' },
    ],
    aclara: { text: 'En clase se aclara que Forrest no se pregunta en el parcial (es de medicina interna). Los subtipos IIa–IIc y III completos son de la bibliografía.', origen: 'Clase, min 26:51; bibliografía.' },
    examen: { origen: 'preguntero', texto: 'Explique la clasificación de Forrest.' },
    voz: [
      'Y la clasificación de Forrest, que describe la úlcera sangrante en la endoscopía. El profesor aclara que no se pregunta en el parcial, pero conviene conocerla. Uno a es el sangrado activo en chorro; uno b, en sábana. Dos a, un vaso visible; dos b, un coágulo adherido; dos c, una base pigmentada. Y tres, una base limpia con fibrina.',
      'Cuanto más bajo el número, más riesgo de que vuelva a sangrar.',
    ],
    refs: [H1('26:28'), H1('26:51'), H1('27:09'), H1('27:49')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'clases', label: 'Cuánto perdió' },
    { id: 'formas', label: 'Cómo se ve' },
    { id: 'alta-baja', label: 'Alta o baja' },
    { id: 'estudios', label: 'Examen y estudios' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'clase',
    titulo: 'Sangre oculta y un abuelo con cáncer',
    texto: 'Un joven de 30 años tiene una anemia ferropénica y sangre oculta en la materia fecal. Su abuelo paterno murió de cáncer de colon.',
    pregunta: '¿Qué estudio corresponde?',
    opciones: [
      { text: 'Colonoscopía.', why: 'Sangre oculta con antecedente familiar de cáncer de colon.' },
      { text: 'Solo hierro y control.', why: 'Hay que buscar la causa del sangrado.' },
      { text: 'Endoscopía alta y nada más.', why: 'El antecedente orienta al colon.' },
      { text: 'Radiografía de abdomen.', why: 'No muestra el origen del sangrado.' },
    ],
    correcta: 0,
    razonamiento: 'El ejemplo de la clase: el antecedente familiar obliga a investigar el colon.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Vómitos después de una fiesta',
    texto: 'Hombre de 35 años, bebedor, que después de vomitar muchas veces empieza a vomitar sangre roja. Signos vitales normales.',
    pregunta: '¿Qué sospecha?',
    opciones: [
      { text: 'Síndrome de Mallory-Weiss.', why: 'Tríada: hematemesis, vómitos, alcoholismo.' },
      { text: 'Hemoptisis.', why: 'La sangre viene con el vómito.' },
      { text: 'Hemorroides.', why: 'Es una hemorragia alta.' },
      { text: 'Angiodisplasia.', why: 'Es una causa de hemorragia baja en mayores.' },
    ],
    correcta: 0,
    razonamiento: 'Desgarro lineal de la mucosa esofagogástrica por los vómitos.',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'Melena y pulso rápido',
    texto: 'Mujer que toma ibuprofeno por artrosis. Hace dos días tiene heces negras. Pulso 125 lpm, TA 95/60, FR 32, orina 15 ml/h, está ansiosa y algo confusa.',
    pregunta: '¿Qué clase de hemorragia y qué causa?',
    opciones: [
      { text: 'Clase III (grave), por úlcera péptica por AINE.', why: 'FC 120–139, TAS < 100, diuresis 5–20; melena con AINE.' },
      { text: 'Clase I, por hemorroides.', why: 'Los signos vitales están muy alterados y es melena.' },
      { text: 'Clase IV, por divertículos.', why: 'La FC no supera 140 y la melena es alta.' },
      { text: 'Clase II, por angiodisplasia.', why: 'La TAS < 100 y la diuresis la ubican en III.' },
    ],
    correcta: 0,
    razonamiento: 'Melena = 85 % alta; la causa más frecuente de HDA es la úlcera; los parámetros encajan en la clase III.',
  },
  {
    id: 'c4',
    origen: 'practica',
    titulo: 'Gotas de sangre en el inodoro',
    texto: 'Mujer de 25 años, constipada, con dolor al defecar y gotas de sangre roja al final de la deposición. Signos vitales normales.',
    pregunta: '¿Qué es lo más probable?',
    opciones: [
      { text: 'Fisura anal o hemorroides (proctorragia).', why: 'La causa más frecuente de HDB, con sangre al final de la deposición.' },
      { text: 'Úlcera péptica.', why: 'Daría melena.' },
      { text: 'Cáncer de colon.', why: 'Joven, sin alarmas.' },
      { text: 'Várices esofágicas.', why: 'Darían hematemesis.' },
    ],
    correcta: 0,
    razonamiento: 'Proctorragia en una joven constipada: hemorroides o fisura, las causas más frecuentes de hemorragia baja.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'cua',
        label: 'Cuánto perdió',
        tone: 'red',
        examen: true,
        nota: 'Lo primero, por los signos vitales',
        hijos: [
          { id: 'tab', label: 'Clases I a IV', tone: 'red', examen: true, nota: '< 15 % · 15–30 % · 30–40 % · **> 40 % = shock**' },
          { id: 'ort', label: 'Ortostatismo', tone: 'peach', examen: true, nota: 'TAS ↓ > 20 · TAD ↓ > 10 · FC ↑ > 30 · mareo' },
        ],
      },
      {
        id: 'alt',
        label: 'Alta',
        tone: 'lilac',
        examen: true,
        nota: 'Hasta el Treitz: más frecuente y más grave',
        hijos: [
          { id: 'hcau', label: 'Causas', tone: 'lilac', examen: true, nota: '**Úlcera péptica** · gastritis erosiva · várices · Mallory-Weiss' },
          { id: 'hfor', label: 'Formas', tone: 'lilac', nota: 'Hematemesis · **melena** (85 % alta)' },
        ],
      },
      {
        id: 'baj',
        label: 'Baja',
        tone: 'sky',
        examen: true,
        nota: 'Debajo del Treitz: estable, cede sola',
        hijos: [
          { id: 'bcau', label: 'Causas', tone: 'sky', examen: true, nota: '**Hemorroides y fisuras** · divertículos · angiodisplasia · cáncer' },
          { id: 'bfor', label: 'Formas', tone: 'sky', nota: '**Hematoquecia** (85 % baja) · enterorragia · proctorragia · sangre oculta' },
        ],
      },
    ],
    nexos: ['**Estudio de elección:** endoscopía alta o colonoscopía.', '**Toda hemorragia es secundaria:** buscar la enfermedad de base.'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['dig12-d01', 'dig12-d02', 'dig12-d03', 'dig12-d04', 'dig12-d05'],
  anclas: {
    ubicate: { tab: 'mapa' },
    clases: { tab: 'teoria', seccion: 'clases' },
    ortostatismo: { tab: 'teoria', seccion: 'clases' },
    formas: { tab: 'teoria', seccion: 'formas' },
    'alta-baja': { tab: 'teoria', seccion: 'alta-baja' },
    estudios: { tab: 'teoria', seccion: 'estudios' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    maniobras: { tab: 'maniobras' },
    integracion: { tab: 'cierre' },
  },
};
