import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * ren-04: clase visual del síndrome nefrótico.
 *  1. Clase de Ortega: «Síndrome nefrótico» (02:26–32:49).
 *  2. Libro de Clínica Médica de Ortega (p. 440–442): definición, proteínas que se pierden (antitrombina III, IgG,
 *     complemento, transferrina), dislipidemia, clínica, estudios y complicaciones (hipercoagulabilidad multifactorial).
 *  3. Preguntero: «Urinario — Síndromes», P1–P3.
 * Ver content/traceability/ren-04.md.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const S = (t: string) => r('nefrotico', t);
const L = (p: string) => r('libro', undefined, p);

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-barrera',
    sec: 'fisiopatologia',
    titulo: 'La barrera que deja pasar la albúmina',
    etapas: ['normal', 'alteracion', 'signo'],
    fig: { f: 'glomerulo', vistas: ['normal', 'nefrotico', 'nefrotico'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'normal', text: 'La **membrana basal**, con carga negativa, y los **podocitos** frenan a la albúmina.' },
          { k: 'alteracion', text: 'Se **borran los podocitos** y se pierde la carga: la barrera se vuelve **permeable**. No se rompen capilares.' },
          { k: 'signo', text: '**Proteinuria > 3,5 g/día**, selectiva (80–90 % albúmina), sin sangre.' },
        ],
      },
    ],
    voz: [
      'Primero, la lesión. Normalmente la membrana basal, con su carga negativa, y los podocitos, con sus hendiduras, frenan el paso de la albúmina.',
      'En el síndrome nefrótico, los pies de los podocitos se borran y la membrana pierde su carga: la barrera se vuelve permeable a las proteínas. A diferencia del nefrítico, no se rompen capilares.',
      'Pasa albúmina en enormes cantidades: más de tres gramos y medio por día, sobre todo albúmina, sin sangre en la orina.',
    ],
    refs: [S('03:51'), S('04:32'), S('05:12'), L('p440')],
  },
  {
    id: 'f-circulo',
    sec: 'fisiopatologia',
    titulo: 'El círculo del edema',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    amplio: true,
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Se pierde albúmina: **hipoalbuminemia** (< 3 g/dl).' },
          { k: 'mecanismo', text: 'Baja la **presión oncótica**: el líquido sale de los vasos al intersticio (**edema**).' },
          { k: 'mecanismo', text: 'Queda **menos volumen** en los vasos: el riñón activa **renina-angiotensina-aldosterona** y ADH.' },
          { k: 'signo', text: 'Retiene sal y agua, que vuelven a escaparse: **más edema**, hasta la **anasarca**.' },
        ],
      },
    ],
    voz: [
      'La fisiopatología, que el profesor llama fundamental, es un círculo. Se pierde albúmina por la orina, y baja la albúmina en la sangre.',
      'La albúmina es la que retiene el agua dentro de los vasos: sin ella, baja la presión oncótica, y el líquido se escapa al intersticio. Aparece el edema.',
      'Pero ese líquido que se fue deja menos volumen dentro de los vasos. El riñón lo detecta y activa el sistema renina angiotensina aldosterona y la hormona antidiurética.',
      'Retiene sal y agua; pero como la albúmina sigue baja, ese líquido vuelve a escaparse. Más edema, hasta la anasarca.',
    ],
    refs: [S('10:37'), S('11:06'), S('11:59'), S('12:40'), S('14:00'), S('14:40'), L('p440')],
  },
  {
    id: 'f-trombosis',
    sec: 'complicaciones',
    titulo: 'Por qué el nefrótico hace trombosis',
    etapas: ['mecanismo', 'signo'],
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Mecanismo', 'Qué pasa'],
        filas: [
          ['Pierde **antitrombina III** por la orina', 'Falta un anticoagulante natural'],
          ['**Aumentan** fibrinógeno y factores V, VII, VIII y X', 'Más sustrato para coagular'],
          ['**Hemoconcentración** (menos volumen efectivo)', 'Sangre más espesa'],
          ['Más **agregación plaquetaria**', 'Más tendencia al trombo'],
        ],
      },
      { t: 'texto', en: 1, text: 'Trombosis venosas y arteriales; típica: la **vena renal** (8–20 %): dolor en el flanco y hematuria.' },
    ],
    voz: [
      'Y la complicación que hay que explicar bien: la trombosis. El estado de hipercoagulabilidad tiene varias causas que se suman. Por la orina se pierde la antitrombina tres, un anticoagulante natural. Al mismo tiempo, aumentan en la sangre el fibrinógeno y varios factores de la coagulación.',
      'Además, con el líquido escapado al intersticio, la sangre queda concentrada y más viscosa, y las plaquetas se agregan más. El resultado son trombosis venosas y arteriales; la típica es la de la vena renal, que puede dar dolor en el flanco y hematuria.',
    ],
    refs: [S('29:28'), S('30:08'), S('30:48'), L('p442')],
  },
  {
    id: 'f-infecciones',
    sec: 'complicaciones',
    titulo: 'Infecciones y lípidos',
    etapas: ['mecanismo', 'signo'],
    amplio: true,
    bloques: [
      { t: 'def', term: 'Infecciones', tono: 'red', text: 'Se pierden por la orina **inmunoglobulinas**, **complemento** y transferrina: defensas bajas. Con ascitis: **peritonitis bacteriana espontánea**.' },
      { t: 'def', term: 'Lípidos', tono: 'gold', en: 1, text: 'Suben colesterol, LDL y triglicéridos: **xantelasmas**, lipiduria (cilindros grasos) y **aterosclerosis**.' },
    ],
    aclara: { text: 'El apunte aclara que la causa de la dislipidemia todavía no se conoce del todo.', origen: 'Libro, p. 440.' },
    voz: [
      'Por la orina no se va solo la albúmina: también se pierden las inmunoglobulinas, factores del complemento y la transferrina, que necesitan los linfocitos. Las defensas bajan, y con la ascitis, la infección típica es la peritonitis bacteriana espontánea.',
      'Y los lípidos suben: colesterol, LDL y triglicéridos. Aparecen xantelasmas, grasa en la orina, y con el tiempo, aterosclerosis.',
    ],
    refs: [S('27:28'), S('28:08'), S('31:29'), L('p440'), L('p442')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'fisiopatologia', label: 'Barrera y edema' },
    { id: 'complicaciones', label: 'Complicaciones' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-def',
    sec: 'definicion',
    titulo: 'Síndrome nefrótico',
    fig: { f: 'glomerulo', vistas: ['nefrotico'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'gold', text: 'La membrana basal glomerular se vuelve **permeable a las proteínas**.' },
      { t: 'lista', en: 1, items: ['**Proteinuria > 3,5 g/24 h** (selectiva: albúmina).', '**Hipoalbuminemia < 3 g/dl**.', '**Edema**.', '± **Hiperlipidemia** y lipiduria.'] },
    ],
    examen: { origen: 'ortega', texto: 'La definición del síndrome nefrótico.', cita: 'Pero yo quiero que me sepan la definición del síndrome nefrótico.', ref: S('03:54') },
    voz: [
      'El síndrome nefrótico y el nefrítico son dos síndromes que siempre se preguntan en los parciales. Y del nefrótico, el profesor pide la definición: es una alteración de la membrana basal del glomérulo, que se vuelve permeable a las proteínas.',
      'Se caracteriza por una proteinuria de más de tres gramos y medio en veinticuatro horas, una albúmina en sangre menor de tres gramos por decilitro, edema, y muchas veces hiperlipidemia y grasa en la orina.',
    ],
    refs: [S('00:11'), S('03:51'), S('03:54'), S('04:32'), S('05:12'), S('05:53'), L('p440')],
  },
  {
    id: 't-primarias',
    sec: 'definicion',
    titulo: 'Primario o secundario',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Primario', tono: 'peach', text: 'La enfermedad es **del glomérulo mismo**.' },
      { t: 'def', term: 'Secundario', tono: 'lilac', en: 1, text: 'Una **enfermedad sistémica** daña el riñón: diabetes, lupus, amiloidosis.' },
    ],
    voz: [
      'El síndrome puede ser primario, cuando la enfermedad es del propio glomérulo, o secundario, cuando una enfermedad sistémica, como la diabetes, el lupus o la amiloidosis, termina dañando el riñón.',
    ],
    refs: [S('02:26'), S('03:06'), L('p440')],
  },
  {
    id: 't-causas',
    sec: 'causas',
    titulo: 'La causa más frecuente',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Quién', 'Causa más frecuente'],
        filas: [
          ['**En general**', '**Nefropatía diabética** (secundaria)'],
          ['Primaria en el niño', '**Cambios mínimos** (70–80 %)'],
          ['Primaria en el adulto', '**Membranosa** (sobre todo > 40 años)'],
          ['2.ª primaria en ambos', '**Focal y segmentaria**'],
          ['Anciano', '**Amiloidosis**'],
          ['Mujer joven', '**Lupus**'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'La causa más frecuente de síndrome nefrótico.', cita: '¿Cuál es la causa más frecuente de síndrome nefrótico? Esa es la pregunta que siempre hacen en los parciales.', ref: S('07:41') },
    voz: [
      'La pregunta que siempre hacen en los parciales: ¿cuál es la causa más frecuente de síndrome nefrótico? La nefropatía diabética, que es secundaria.',
      'Entre las primarias, depende de la edad. En el niño, la enfermedad de cambios mínimos, setenta a ochenta por ciento. En el adulto, la glomerulopatía membranosa, sobre todo después de los cuarenta. Y la segunda en los dos, la focal y segmentaria. En el anciano hay que pensar en amiloidosis, y en una mujer joven, en lupus.',
    ],
    refs: [S('07:15'), S('07:41'), S('07:55'), S('08:36'), S('09:17'), S('09:57'), L('p440')],
  },
  {
    id: 't-diabetes',
    sec: 'causas',
    titulo: 'La diabetes, en etapas',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'En la nefropatía diabética, el nefrótico aparece en el **estadio 4**; en el **5**, la **insuficiencia renal crónica**.' },
      { t: 'texto', en: 1, text: 'Por eso la diabetes es la causa más frecuente de nefrótico **y** de IRC. Antes, la **microalbuminuria** (30–300 mg/día).' },
    ],
    voz: [
      'La nefropatía diabética avanza por etapas. Primero aparece la microalbuminuria; en el estadio cuatro, el síndrome nefrótico; y en el cinco, la insuficiencia renal crónica.',
      'Por eso la diabetes es a la vez la causa más frecuente de síndrome nefrótico y de insuficiencia renal crónica.',
    ],
    refs: [S('32:09'), S('32:49')],
  },
  {
    id: 't-fisio',
    sec: 'fisiopatologia',
    titulo: 'Todo sale de la proteinuria',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Se pierde por la orina…', 'Aparece'],
        filas: [
          ['**Albúmina**', 'Hipoalbuminemia → **edema** → anasarca'],
          ['**Inmunoglobulinas**, complemento, transferrina', '**Infecciones**'],
          ['**Antitrombina III**', '**Trombosis** (con hemoconcentración y más factores)'],
          ['Proteínas en general', '**Balance nitrogenado negativo**, pérdida muscular'],
        ],
      },
    ],
    voz: [
      'Y la fisiopatología completa sale de una sola cosa: lo que se pierde por la orina. Se pierde albúmina, y aparece el edema. Se pierden inmunoglobulinas, complemento y transferrina, y aparecen las infecciones. Se pierde la antitrombina tres, y junto con la hemoconcentración y el aumento de los factores, aparecen las trombosis. Y la pérdida de proteínas en general lleva a un balance nitrogenado negativo, con pérdida de masa muscular.',
    ],
    refs: [S('10:37'), S('11:06'), S('16:40'), S('27:28'), S('29:28'), L('p440'), L('p442')],
  },
  {
    id: 't-clinica',
    sec: 'clinica',
    titulo: 'Clínica',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Cómo es'],
        filas: [
          ['**Edema**', 'Frío, blando, **con fóvea**: tobillos → párpados (facies abotagada) → **anasarca**'],
          ['Tensión arterial', '**Normal o baja**: el volumen se fue al intersticio'],
          ['Orina', '**Espumosa**'],
          ['Piel y uñas', 'Xantelasmas, xantomas; bandas blancas en las uñas (Muehrcke)'],
          ['Serosas', 'Ascitis, derrame pleural (disnea), pericárdico'],
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Manifestaciones clínicas del síndrome nefrótico.' },
    voz: [
      'La clínica. El edema es frío, blando, y deja fóvea; empieza en los tobillos, sube a los párpados, con una cara abotagada, y puede llegar a la anasarca. La presión es normal o baja, porque el volumen está en el intersticio: a diferencia del nefrítico, no es un hipertenso.',
      'La orina hace espuma. En la piel aparecen xantelasmas por los lípidos, y en las uñas, bandas blancas por la albúmina baja. Y se acumula líquido en las serosas: ascitis, derrame pleural, y más rara vez pericárdico.',
    ],
    refs: [S('17:20'), S('18:02'), S('18:42'), S('19:22'), S('20:02'), L('p441')],
  },
  {
    id: 't-estudios',
    sec: 'clinica',
    titulo: 'Estudios',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Estudio', 'Resultado'],
        filas: [
          ['**Proteinuria de 24 h**', '**> 3,5 g**: la más certera'],
          ['Proteinograma', 'Albúmina < 3 g/dl'],
          ['Lipidograma', 'Colesterol, LDL y triglicéridos altos'],
          ['Sedimento', '**Cilindros grasos**, cuerpos ovales grasos; si hay hematuria, componente nefrítico'],
          ['Etiológico', 'Glucemia, FAN, serologías'],
          ['**Biopsia**', 'Adulto y niño > 10 años; el niño menor sin hematuria se trata como cambios mínimos'],
        ],
      },
    ],
    voz: [
      'Los estudios. La proteinuria de veinticuatro horas es la más certera: más de tres gramos y medio. El proteinograma muestra la albúmina baja, y el lipidograma, los lípidos altos. En el sedimento aparecen cilindros grasos; si además hay hematuria, hay un componente nefrítico.',
      'Se buscan las causas: la glucemia, los anticuerpos del lupus, serologías. Y la biopsia se hace en el adulto y en el niño de más de diez años; el niño más chico, sin hematuria, se trata directamente como una enfermedad de cambios mínimos.',
    ],
    refs: [S('22:45'), S('23:25'), S('24:05'), S('24:58'), S('25:26'), S('26:06'), L('p441')],
  },
  {
    id: 't-complicaciones',
    sec: 'complicaciones',
    titulo: 'Complicaciones',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Complicación', 'Por qué'],
        filas: [
          ['**Infecciones**: PBE, celulitis, urinarias', 'Pierde IgG, complemento, transferrina'],
          ['**Trombosis**: vena renal, venas de las piernas, arterias', 'Antitrombina III, más factores, hemoconcentración'],
          ['**Aterosclerosis**', 'Hiperlipidemia'],
          ['**Balance nitrogenado negativo**', 'Pérdida de proteínas'],
          ['**IRA e IRC**', 'Sobre todo en el diabético mal controlado'],
        ],
      },
    ],
    voz: [
      'Las complicaciones, cada una con su porqué. Infecciones, la más frecuente la peritonitis bacteriana espontánea, porque se pierden inmunoglobulinas y complemento. Trombosis, en la vena renal y en otras venas y arterias, por la antitrombina perdida, los factores aumentados y la sangre concentrada. Aterosclerosis, por los lípidos altos. Un balance nitrogenado negativo, por la pérdida de proteínas. Y la insuficiencia renal, aguda o crónica, sobre todo en el diabético mal controlado.',
    ],
    refs: [S('27:28'), S('28:08'), S('29:28'), S('30:08'), S('30:48'), S('31:29'), L('p442')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'definicion', label: 'Qué es' },
    { id: 'causas', label: 'Causas' },
    { id: 'fisiopatologia', label: 'Fisiopatología' },
    { id: 'clinica', label: 'Clínica y estudios' },
    { id: 'complicaciones', label: 'Complicaciones' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'practica',
    titulo: 'Chico de 4 años hinchado',
    texto: 'Desde hace una semana amanece con los párpados hinchados y ahora tiene los tobillos y el escroto edematosos. TA normal. Orina espumosa, sin sangre. Albúmina 1,8 g/dl.',
    pregunta: '¿Qué tiene y cuál es la causa más probable?',
    opciones: [
      { text: 'Síndrome nefrótico por enfermedad de cambios mínimos.', why: 'La primaria más frecuente en el niño; sin hematuria, se trata sin biopsia.' },
      { text: 'Síndrome nefrítico postestreptocócico.', why: 'Daría hematuria e HTA.' },
      { text: 'Nefropatía diabética.', why: 'Es la causa general más frecuente, pero no en un niño de 4 años.' },
      { text: 'Insuficiencia cardíaca.', why: 'No explica la proteinuria.' },
    ],
    correcta: 0,
    razonamiento: 'Edema con fóvea, TA normal, proteinuria sin sangre e hipoalbuminemia: nefrótico; en el niño, cambios mínimos.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Nefrótico con dolor en el flanco',
    texto: 'Adulto con síndrome nefrótico por glomerulopatía membranosa que presenta dolor brusco en el flanco izquierdo y hematuria.',
    pregunta: '¿Qué complicación sospecha?',
    opciones: [
      { text: 'Trombosis de la vena renal.', why: 'Hipercoagulabilidad: antitrombina III perdida, factores aumentados, hemoconcentración.' },
      { text: 'Cólico renoureteral.', why: 'Posible, pero en el contexto nefrótico hay que pensar en trombosis.' },
      { text: 'Pielonefritis.', why: 'No hay fiebre ni disuria.' },
      { text: 'Peritonitis bacteriana espontánea.', why: 'No explica la hematuria ni el dolor en el flanco.' },
    ],
    correcta: 0,
    razonamiento: 'La trombosis de la vena renal (8–20 %) es la típica del nefrótico, sobre todo en la membranosa.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'nef',
        label: 'Síndrome nefrótico',
        tone: 'gold',
        examen: true,
        nota: 'La barrera glomerular se vuelve permeable a las proteínas',
        hijos: [
          { id: 'def', label: 'Definición', tone: 'gold', examen: true, nota: 'Proteinuria **> 3,5 g/día** · albúmina **< 3 g/dl** · edema · ± hiperlipidemia' },
          { id: 'cau', label: 'Causas', tone: 'peach', examen: true, nota: '**Diabetes** (la más frecuente) · niño: cambios mínimos · adulto: membranosa' },
          { id: 'cli', label: 'Clínica', tone: 'sky', nota: 'Edema frío con fóvea → anasarca · TA normal · orina espumosa' },
          { id: 'com', label: 'Complicaciones', tone: 'red', nota: 'Infecciones (PBE) · **trombosis** (vena renal) · aterosclerosis · IRA/IRC' },
        ],
      },
    ],
    nexos: ['**Todo sale de lo que se pierde por la orina:** albúmina, IgG, antitrombina III.'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['ren04-d01', 'ren04-d02', 'ren04-d03', 'ren04-d04'],
  anclas: {
    ubicate: { tab: 'mapa' },
    definicion: { tab: 'teoria', seccion: 'definicion' },
    causas: { tab: 'teoria', seccion: 'causas' },
    fisiopatologia: { tab: 'teoria', seccion: 'fisiopatologia' },
    clinica: { tab: 'teoria', seccion: 'clinica' },
    complicaciones: { tab: 'teoria', seccion: 'complicaciones' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    integracion: { tab: 'cierre' },
  },
};
