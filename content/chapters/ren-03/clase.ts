import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * ren-03: clase visual del síndrome nefrítico.
 *  1. Clase de Ortega: «Síndrome nefrítico» (00:02–22:01).
 *  2. Libro de Clínica Médica de Ortega (p. 442–444): definición, causas, clínica, laboratorio, biopsia, complicaciones.
 *  3. Preguntero: «Urinario — Síndromes: nefrótico, nefrítico e ITU».
 * Ver content/traceability/ren-03.md.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const N = (t: string) => r('nefritico', t);
const L = (p: string) => r('libro', undefined, p);


/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-inmuno',
    sec: 'causa',
    titulo: 'De la garganta al riñón',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    amplio: true,
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Una **faringitis o impétigo** por estreptococo beta hemolítico del grupo A.' },
          { k: 'mecanismo', text: 'En **1 a 2 semanas** se forman **inmunocomplejos** (antígeno + anticuerpo) que se depositan en los capilares del glomérulo.' },
          { k: 'mecanismo', text: 'Activan el **complemento** (por eso el **C3 baja**) y atraen células inflamatorias.' },
          { k: 'signo', text: 'El glomérulo se inflama: **síndrome nefrítico**.' },
        ],
      },
    ],
    voz: [
      'El síndrome nefrítico más frecuente empieza lejos del riñón: una faringitis o una infección de piel por estreptococo beta hemolítico del grupo A.',
      'El cuerpo arma anticuerpos contra el estreptococo, y en una o dos semanas se forman inmunocomplejos, antígeno más anticuerpo, que circulan y se depositan en los capilares del glomérulo.',
      'Ahí activan el complemento, que se consume, por eso el C3 en sangre baja, y atraen células inflamatorias.',
      'El glomérulo se inflama: es el síndrome nefrítico.',
    ],
    refs: [N('07:42'), N('09:09'), N('10:25'), N('11:06'), L('p443')],
  },
  {
    id: 'f-pared',
    sec: 'mecanismo',
    titulo: 'El capilar que se rompe',
    etapas: ['normal', 'alteracion', 'signo'],
    fig: { f: 'glomerulo', vistas: ['normal', 'nefritico', 'nefritico'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'normal', text: 'La pared del capilar retiene glóbulos rojos y albúmina.' },
          { k: 'alteracion', text: 'La inflamación **rompe los capilares** y engrosa el glomérulo.' },
          { k: 'signo', text: 'Pasan **glóbulos rojos** (hematuria dismórfica, cilindros hemáticos) y se **filtra menos**.' },
        ],
      },
    ],
    voz: [
      'Normalmente, la pared del capilar glomerular retiene los glóbulos rojos y la albúmina.',
      'En el nefrítico, la inflamación rompe los capilares, y las células inflamatorias engrosan el glomérulo. El profesor lo diferencia del nefrótico: acá los capilares se rompen; allá aumenta la permeabilidad.',
      'Por las roturas pasan glóbulos rojos, que salen deformados y moldeados en cilindros hemáticos. Y como el glomérulo inflamado tiene menos superficie útil, se filtra menos.',
    ],
    refs: [N('00:42'), N('01:24'), N('02:04'), N('13:49'), L('p443')],
  },
  {
    id: 'f-cascada',
    sec: 'clinica',
    titulo: 'Del filtrado bajo a las tres H',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'nefrona', vistas: [{ luz: ['glomerulo'], marca: 'glomerulo', fuga: ['hematies'], tone: 'red', nota: 'Filtra menos y deja pasar sangre', notaTone: 'red' }] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'mecanismo', text: 'Cae el filtrado: se retienen **sal y agua**, y también **urea y creatinina**.' },
          { k: 'signo', text: '**Oliguria** y **hiperazoemia** (urea y creatinina altas).' },
          { k: 'signo', text: 'Más volumen en los vasos: **hipertensión** y **edema** leve.' },
        ],
      },
    ],
    aclara: { text: 'La HTA del nefrítico depende del volumen retenido; por eso la FENa es menor de 1 %: el riñón retiene sodio.', origen: 'Libro, p. 443–444.' },
    voz: [
      'Con el filtrado bajo empieza la cascada. El riñón deja de eliminar sal y agua, y también la urea y la creatinina.',
      'El paciente orina poco, y suben la urea y la creatinina en la sangre: la hiperazoemia.',
      'Y el agua y la sal retenidas aumentan el volumen en los vasos: suben la presión arterial y aparece un edema leve. Así se arman las tres H.',
    ],
    refs: [N('04:14'), N('04:54'), N('05:36'), N('06:18'), L('p443')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'causa', label: 'La causa' },
    { id: 'mecanismo', label: 'El glomérulo' },
    { id: 'clinica', label: 'Las tres H' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-def',
    sec: 'mecanismo',
    titulo: 'Síndrome nefrítico',
    fig: { f: 'glomerulo', vistas: ['nefritico'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'red', text: 'Inflamación **aguda del glomérulo**: hematuria, HTA, hiperazoemia, **oliguria**, edema leve y proteinuria **menor de 3,5 g**.' },
      { t: 'texto', en: 1, text: 'Puede evolucionar a una **insuficiencia renal aguda**.' },
    ],
    examen: { origen: 'preguntero', texto: 'Defina síndrome nefrítico y nombre su tríada característica.' },
    voz: [
      'El síndrome nefrítico es una inflamación aguda del glomérulo. Se manifiesta con hematuria, hipertensión, hiperazoemia, oliguria, un edema leve, y una proteinuria que no llega al rango nefrótico: menos de tres gramos y medio.',
      'Y su evolución temida es la insuficiencia renal aguda.',
    ],
    refs: [N('00:02'), N('00:36'), N('00:42'), L('p442')],
  },
  {
    id: 't-tres-h',
    sec: 'clinica',
    titulo: 'La tríada: las tres H',
    amplio: true,
    bloques: [
      { t: 'clave', tono: 'red', text: '**H**ematuria · **H**ipertensión arterial · **H**iperazoemia.' },
      { t: 'texto', en: 1, text: 'Hiperazoemia: retención de productos nitrogenados, **urea y creatinina** altas. Antes la tríada se decía con el edema; se pide con la hiperazoemia porque anuncia la IRA.' },
    ],
    examen: { origen: 'ortega', texto: 'La tríada característica del síndrome nefrítico.', cita: '¿Cuál es la tríada característica del síndrome nefrítico? Son las tres H: hematuria, hipertensión arterial, hiperazoemia.', ref: N('04:09') },
    voz: [
      'La tríada del síndrome nefrítico, pregunta de los parciales, son las tres H: hematuria, hipertensión arterial e hiperazoemia.',
      'La hiperazoemia es la retención de productos nitrogenados: suben la urea y la creatinina. Antes la tríada se decía con el edema; el profesor la pide con la hiperazoemia, porque es la que marca la evolución hacia la insuficiencia renal aguda.',
    ],
    refs: [N('04:05'), N('04:09'), N('04:14'), N('04:19'), N('17:13')],
  },
  {
    id: 't-clinica',
    sec: 'clinica',
    titulo: 'Cómo se ve',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Orina', tono: 'red', text: 'Poca y **oscura**, rojizo amarronada («Coca-Cola»). Hematuria microscópica en el 70 %, macroscópica en el 30 %.' },
      { t: 'def', term: 'Edema', tono: 'sky', en: 0, text: '**Leve**: párpados (matinal) y maléolos, por retención de sal y agua.' },
      { t: 'def', term: 'Hipertensión', tono: 'gold', en: 1, text: '**Volumen dependiente**: la complicación más temida.' },
    ],
    voz: [
      'Cómo se ve el paciente. Orina poco, y la orina es oscura, rojizo amarronada, como gaseosa cola. La hematuria es microscópica en el setenta por ciento y visible en el treinta.',
      'Tiene un edema leve, en los párpados por la mañana y en los tobillos. Y una hipertensión que depende del volumen retenido, y que es la complicación más temida.',
    ],
    refs: [N('04:54'), N('05:36'), N('06:18'), N('15:49'), N('16:31'), L('p443')],
  },
  {
    id: 't-vs-nefrotico',
    sec: 'mecanismo',
    titulo: 'Nefrítico o nefrótico',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Nefrítico', 'Nefrótico'],
        filas: [
          ['Lesión', '**Rotura** de capilares (inflamación)', '↑ **permeabilidad** de la barrera'],
          ['Orina', '**Hematuria** + cilindros hemáticos', '**Proteinuria** masiva, espuma'],
          ['Proteinuria', '< 3,5 g/día', '**> 3,5 g/día**'],
          ['Edema', 'Leve, por retención', 'Importante, con fóvea, por ↓ oncótica'],
          ['Tensión arterial', '**Alta**', 'Normal o baja'],
          ['Evolución', '**IRA**', 'Crónica'],
        ],
      },
    ],
        voz: [
      'Y el cuadro que los diferencia. En el nefrítico se rompen los capilares por inflamación; en el nefrótico aumenta la permeabilidad de la barrera. El nefrítico da hematuria con cilindros hemáticos; el nefrótico, proteinuria masiva y espuma, de más de tres gramos y medio.',
      'El edema del nefrítico es leve y por retención; el del nefrótico, importante y por baja presión oncótica. El nefrítico tiene la presión alta; el nefrótico, normal o baja. Y el nefrítico evoluciona hacia la insuficiencia aguda.',
    ],
    refs: [N('00:42'), N('02:04'), N('07:01'), L('p442')],
  },
  {
    id: 't-postestreptococica',
    sec: 'causa',
    titulo: 'La causa más frecuente: postestreptocócica',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Glomerulonefritis **postinfecciosa** (endocapilar, proliferativa) por **estreptococo beta hemolítico del grupo A**.' },
      { t: 'texto', en: 1, text: 'Siempre preguntar: ¿tuvo una **faringoamigdalitis** o una infección de **piel** hace **1 o 2 semanas**?' },
    ],
    examen: { origen: 'ortega', texto: 'La causa más frecuente y qué preguntar en la anamnesis.', cita: 'Preguntas de parcial: todo paciente que tiene un síndrome nefrítico… tienen que preguntar si hace una semana o dos semanas tuvieron una infección.', ref: N('09:09') },
    voz: [
      'La causa más frecuente es la glomerulonefritis postinfecciosa, también llamada endocapilar o proliferativa, en general por estreptococo beta hemolítico del grupo A.',
      'Por eso, y es pregunta de parcial, ante todo síndrome nefrítico hay que preguntar si hace una o dos semanas tuvo una infección: una faringoamigdalitis, o una infección de piel como un impétigo.',
    ],
    refs: [N('07:42'), N('08:22'), N('09:01'), N('09:09'), L('p443')],
  },
  {
    id: 't-causas',
    sec: 'causa',
    titulo: 'Otras causas',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Primarias', tono: 'peach', items: ['**Postinfecciosa** (la más frecuente)', 'Nefropatía por **IgA** (Berger)', 'Mesangiocapilar', 'Con semilunas: rápidamente progresiva'] },
          { titulo: 'Secundarias', tono: 'lilac', items: ['**Lupus**', 'Vasculitis (PAN, granulomatosis con poliangeítis)', '**Goodpasture**', 'Schönlein-Henoch'] },
        ],
      },
    ],
    voz: [
      'Las causas se dividen en primarias, del propio riñón: la postinfecciosa, la más frecuente, la nefropatía por IgA, la mesangiocapilar y las glomerulonefritis con semilunas, que progresan rápido.',
      'Y secundarias, de enfermedades sistémicas: el lupus, las vasculitis, el síndrome de Goodpasture y la púrpura de Schönlein-Henoch.',
    ],
    refs: [N('10:25'), N('11:06'), N('12:29'), N('13:09'), L('p443')],
  },
  {
    id: 't-lab',
    sec: 'diagnostico',
    titulo: 'Laboratorio',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Estudio', 'Resultado'],
        filas: [
          ['Sedimento', 'Hematuria **dismórfica**, acantocitos, **cilindros hemáticos**'],
          ['Proteinuria de 24 h', '**< 3,5 g**'],
          ['Función renal', '**Urea y creatinina** altas (de leve a IRA)'],
          ['FENa', '**< 1 %**: el riñón retiene sodio'],
          ['Etiológico', '**ASTO alto**, **C3 bajo**'],
        ],
      },
    ],
    voz: [
      'En el laboratorio, el sedimento es nefrítico: hematuria dismórfica, acantocitos y cilindros hemáticos. La proteinuria de veinticuatro horas no llega a tres gramos y medio. La urea y la creatinina están altas, desde un deterioro leve hasta una insuficiencia renal aguda.',
      'La fracción excretada de sodio es menor del uno por ciento, porque el riñón lo está reteniendo. Y para la causa: las antiestreptolisinas, el ASTO, altas, y el C3 bajo, por el consumo del complemento.',
    ],
    refs: [N('18:37'), N('19:19'), N('20:01'), L('p444')],
  },
  {
    id: 't-biopsia',
    sec: 'diagnostico',
    titulo: 'Biopsia: inmunofluorescencia',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Patrón', 'Pensar en'],
        filas: [
          ['**Granular** (70 %)', 'Postinfecciosa, lupus (depósitos, C3 bajo)'],
          ['**Lineal** (1 %)', '**Goodpasture** (anti membrana basal)'],
          ['**Pauciinmune** (30 %)', 'Vasculitis ANCA +'],
        ],
      },
      { t: 'texto', en: 1, text: 'Indicada si el **C3 sigue bajo**, la IRA progresa rápido, se sospecha una enfermedad sistémica o dura **más de 4 semanas**.' },
    ],
    voz: [
      'Si hace falta biopsia, la inmunofluorescencia da tres patrones. Granular, el setenta por ciento: depósitos de inmunocomplejos, como en la postinfecciosa o el lupus. Lineal, uno por ciento: anticuerpos contra la membrana basal, el Goodpasture. Y pauciinmune, sin depósitos, el treinta por ciento: las vasculitis.',
      'La biopsia se indica si el C3 sigue bajo, si la función renal cae rápido, si se sospecha una enfermedad sistémica, o si el cuadro dura más de cuatro semanas.',
    ],
    refs: [N('20:01'), N('20:41'), L('p444')],
  },
  {
    id: 't-complicaciones',
    sec: 'diagnostico',
    titulo: 'Complicaciones',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Por…', 'Complicación'],
        filas: [
          ['Exceso de volumen', '**Insuficiencia cardíaca**, **edema agudo de pulmón**'],
          ['HTA severa', '**Encefalopatía hipertensiva**'],
          ['Riñón que no filtra', '**IRA** e **hiperpotasemia**'],
        ],
      },
    ],
        voz: [
      'Las complicaciones salen de lo mismo. El volumen retenido sobrecarga al corazón: insuficiencia cardíaca, con ingurgitación yugular, y en los casos graves, edema agudo de pulmón. La hipertensión severa puede dar una encefalopatía hipertensiva. Y el riñón que no filtra lleva a la insuficiencia renal aguda, con hiperpotasemia, porque no puede eliminar el potasio.',
    ],
    refs: [N('21:21'), N('22:01'), L('p444')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'mecanismo', label: 'Qué es' },
    { id: 'clinica', label: 'Clínica' },
    { id: 'causa', label: 'Causas' },
    { id: 'diagnostico', label: 'Diagnóstico' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'practica',
    titulo: 'Chico de 8 años con los párpados hinchados',
    texto: 'Hace dos semanas tuvo una angina. Ahora amanece con los párpados hinchados, orina poco y oscura, «como Coca-Cola». TA 150/95. Creatinina alta, C3 bajo, ASTO alto.',
    pregunta: '¿Qué tiene?',
    opciones: [
      { text: 'Síndrome nefrítico por glomerulonefritis postestreptocócica.', why: 'Tres H tras una faringitis, con C3 bajo y ASTO alto.' },
      { text: 'Síndrome nefrótico.', why: 'Daría proteinuria masiva y edema importante, con TA normal.' },
      { text: 'Infección urinaria.', why: 'No explica la HTA ni el C3 bajo.' },
      { text: 'Litiasis renal.', why: 'Daría dolor cólico.' },
    ],
    correcta: 0,
    razonamiento: 'Inmunocomplejos tras el estreptococo → glomérulo inflamado → hematuria, HTA, hiperazoemia.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Hemoptisis y hematuria',
    texto: 'Hombre joven con hemoptisis y un síndrome nefrítico que empeora en días. La biopsia muestra un patrón lineal.',
    pregunta: '¿Qué sospecha?',
    opciones: [
      { text: 'Síndrome de Goodpasture.', why: 'Anticuerpos anti membrana basal: patrón lineal, pulmón y riñón.' },
      { text: 'Postestreptocócica.', why: 'Da patrón granular.' },
      { text: 'Nefropatía por IgA.', why: 'No da patrón lineal ni hemoptisis.' },
      { text: 'Síndrome nefrótico.', why: 'Es un cuadro nefrítico rápidamente progresivo.' },
    ],
    correcta: 0,
    razonamiento: 'Patrón lineal (1 %) = Goodpasture.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'nef',
        label: 'Síndrome nefrítico',
        tone: 'red',
        examen: true,
        nota: 'Inflamación aguda del glomérulo: se rompen los capilares',
        hijos: [
          { id: 'tri', label: 'Las tres H', tone: 'red', examen: true, nota: '**Hematuria · hipertensión · hiperazoemia** · oliguria, edema leve, proteinuria < 3,5 g' },
          { id: 'cau', label: 'Causa', tone: 'peach', examen: true, nota: '**Postestreptocócica**: faringitis o impétigo hace 1–2 semanas · ASTO ↑ · C3 ↓' },
          { id: 'lab', label: 'Laboratorio', tone: 'lilac', nota: 'Cilindros hemáticos · FENa < 1 % · biopsia: granular, lineal, pauciinmune' },
          { id: 'com', label: 'Complicaciones', tone: 'gold', nota: 'Insuficiencia cardíaca · EAP · encefalopatía hipertensiva · IRA e hiperpotasemia' },
        ],
      },
    ],
    nexos: ['**Nefrítico = sangre y presión alta; nefrótico = proteínas y edema.**'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['ren03-d01', 'ren03-d02', 'ren03-d03', 'ren03-d04'],
  anclas: {
    ubicate: { tab: 'mapa' },
    mecanismo: { tab: 'teoria', seccion: 'mecanismo' },
    clinica: { tab: 'teoria', seccion: 'clinica' },
    causa: { tab: 'teoria', seccion: 'causa' },
    diagnostico: { tab: 'teoria', seccion: 'diagnostico' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    integracion: { tab: 'cierre' },
  },
};
