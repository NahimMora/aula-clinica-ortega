import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * ren-02: clase visual del examen físico nefrourológico y la proteinuria.
 *  1. Clase de Ortega: «Motivos de consulta de renal parte 3 — examen físico» (00:00–31:53).
 *  2. Libro de Clínica Médica de Ortega (p. 459–460): edema según el síndrome, piel, TA, palpación renal, puñopercusión.
 *  3. Argente-Álvarez (video de semiología, 3:02:39–3:04:33): palpación renal normal.
 * Ver content/traceability/ren-02.md.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const E = (t: string) => r('ef-ren', t);
const A = (t: string) => r('argente', t);
const L = (p: string) => r('libro', undefined, p);

const GRAL = 'Fisiología general, no se da en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-proteinuria',
    sec: 'proteinuria',
    titulo: 'Por qué la proteinuria es del glomérulo',
    etapas: ['normal', 'alteracion', 'signo'],
    fig: { f: 'glomerulo', vistas: ['normal', 'nefrotico', 'nefrotico'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'normal', text: 'La barrera glomerular deja pasar agua y solutos chicos; la **albúmina**, grande y con carga negativa, **no pasa**.' },
          { k: 'alteracion', text: 'Si la barrera se daña, la albúmina pasa a la orina en cantidad.' },
          { k: 'signo', text: '**Proteinuria**: orina espumosa. Más de **3,5 g/día**: rango nefrótico.' },
        ],
      },
    ],
    voz: [
      'El profesor lo resume en una frase: hay proteinuria, el problema es el glomérulo. ¿Por qué? Porque la barrera del glomérulo deja pasar el agua y las sustancias chicas, pero no la albúmina, que es grande y tiene carga negativa, igual que la membrana basal.',
      'Si esa barrera se daña, la albúmina pasa a la orina.',
      'Y aparece la proteinuria: la orina hace espuma que no se va. Si se pierden más de tres gramos y medio por día, es el rango nefrótico.',
    ],
    refs: [E('05:45'), E('06:17'), E('08:08'), L('p459')],
  },
  {
    id: 'f-irc-piel',
    sec: 'general',
    titulo: 'Lo que el riñón enfermo deja ver en la piel',
    etapas: ['mecanismo', 'signo'],
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['El riñón ya no…', 'Aparece'],
        filas: [
          ['Fabrica **eritropoyetina**', '**Anemia**: piel pálida'],
          ['Elimina pigmentos y toxinas', 'Tinte **amarillento**; **prurito** con lesiones de rascado'],
          ['Elimina la **urea**', 'Las plaquetas funcionan mal: **petequias y equimosis**'],
          ['Regula sal, agua y renina', '**Edema** e **hipertensión**'],
        ],
      },
    ],
    voz: [
      'En el examen general, la piel cuenta lo que el riñón ya no hace. Sin eritropoyetina, no se fabrican glóbulos rojos: anemia y palidez. Los pigmentos y las toxinas que se retienen le dan un tinte amarillento, y producen prurito, con lesiones de rascado.',
      'La urea acumulada hace que las plaquetas funcionen mal: aparecen petequias y moretones. Y como el riñón ya no regula bien la sal, el agua y la renina, hay edema e hipertensión.',
    ],
    refs: [E('26:30'), E('27:10'), E('27:50'), L('p459')],
  },
  {
    id: 'f-guyon',
    sec: 'region',
    titulo: 'Por qué se palpa el riñón en la inspiración',
    etapas: ['normal', 'signo'],
    fig: { f: 'urinario', vistas: [{ luz: ['rinon-d'], tone: 'sky', nota: 'El riñón baja con el diafragma', notaTone: 'sky' }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', text: 'El riñón está **detrás del peritoneo**, debajo del diafragma: **desciende en la inspiración**.' },
      { t: 'texto', en: 1, text: 'Por eso se lo busca entre **dos manos** (una lumbar, una anterior): baja hacia los dedos y se siente **pelotear**.' },
    ],
    aclara: { text: 'Normalmente solo se palpa, en personas delgadas, el polo inferior del riñón derecho.', origen: 'Libro, p. 460; Argente-Álvarez.' },
    voz: [
      'Y la base de las maniobras de palpación. El riñón está detrás del peritoneo, apoyado contra la pared posterior, justo debajo del diafragma. Cuando el paciente inspira, el diafragma baja y empuja al riñón hacia abajo.',
      'Por eso se lo busca con las dos manos, una en la región lumbar y otra adelante: en la inspiración baja hacia los dedos, y si está agrandado, rebota entre las manos. En una persona delgada, normalmente solo se llega a palpar el polo inferior del riñón derecho.',
    ],
    refs: [E('29:11'), E('29:51'), L('p460'), A('3:03:39')],
  },
  {
    id: 'f-estenosis',
    sec: 'general',
    titulo: 'Hipertensión de origen renal',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'nefrona', vistas: [{ luz: ['arteriola'], isquemia: true, tone: 'red', nota: 'Llega poca sangre al riñón', notaTone: 'red' }] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Una **arteria renal estrecha** manda poca sangre al riñón.' },
          { k: 'mecanismo', text: 'El riñón «cree» que falta presión y libera **renina**: angiotensina y aldosterona.' },
          { k: 'signo', text: '**HTA refractaria** (no baja con 3 o 4 fármacos) y **soplo** periumbilical o lumbar.' },
        ],
      },
    ],
    aclara: { text: 'El mecanismo renina-angiotensina de la HTA renovascular.', origen: GRAL },
    voz: [
      'Por último, la presión arterial, que siempre se toma. Una arteria renal estrechada manda poca sangre al riñón.',
      'El riñón interpreta que falta presión y libera renina, que activa la angiotensina y la aldosterona: vasoconstricción y retención de sal.',
      'El resultado es una hipertensión que no baja ni con tres o cuatro antihipertensivos. Ahí hay que auscultar el abdomen y la región lumbar: el soplo de la estenosis de la arteria renal.',
    ],
    refs: [E('27:50'), E('31:13'), E('31:53'), L('p459')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'proteinuria', label: 'Proteinuria' },
    { id: 'general', label: 'Examen general' },
    { id: 'region', label: 'Palpación' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-proteinuria',
    sec: 'proteinuria',
    titulo: 'El paciente con proteinuria',
    fig: { f: 'glomerulo', vistas: ['nefrotico'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'Normal: **menos de 150 mg** en 24 h. Proteinuria: **más de 300 mg**. Rango nefrótico: **más de 3,5 g**.' },
      { t: 'prof', en: 1, text: 'Eso pónganselo en la cabeza, siempre: hay proteinuria, el problema es el glomérulo, nada más.', ref: E('06:17') },
    ],
    examen: { origen: 'ortega', texto: 'Cómo se valora a un paciente con proteinuria.', cita: 'En el final o en los parciales, por ejemplo: ¿cómo valoran ustedes un paciente que tiene proteinuria?', ref: E('24:33') },
    voz: [
      'El paciente con proteinuria, que se pregunta en los parciales y en el final. Lo normal es perder menos de ciento cincuenta miligramos de proteínas por día; más de trescientos ya es proteinuria, y más de tres gramos y medio, rango nefrótico.',
      'Y lo que el profesor pide tener siempre en la cabeza: si hay proteinuria, el problema es el glomérulo.',
    ],
    refs: [E('05:45'), E('06:17'), E('08:08'), E('24:33'), L('p459')],
  },
  {
    id: 't-grados',
    sec: 'proteinuria',
    titulo: 'Cuánta proteína',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['En 24 horas', 'Nombre', 'Dato'],
        filas: [
          ['< 150 mg', 'Fisiológica', ''],
          ['30–300 mg', '**Microalbuminuria**', 'Diabético de más de 5 años'],
          ['300 mg–1 g', 'Leve', ''],
          ['1–3,5 g', 'Moderada', ''],
          ['> 3,5 g', '**Severa: rango nefrótico**', 'Síndrome nefrótico'],
        ],
      },
    ],
    voz: [
      'La proteinuria se gradúa por cantidad. Entre treinta y trescientos miligramos es la microalbuminuria, típica del diabético con más de cinco años de evolución, la primera señal de daño renal. De trescientos miligramos a un gramo, leve; de uno a tres y medio, moderada; y más de tres gramos y medio, severa, el rango del síndrome nefrótico.',
    ],
    refs: [E('09:42'), E('11:06'), E('13:11'), E('13:55')],
  },
  {
    id: 't-metodos',
    sec: 'proteinuria',
    titulo: 'Cómo se mide',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Tiras reactivas', tono: 'sky', text: '**Semicuantitativas**, rápidas, en cruces (++++ = más de 3 g). Lo primero en la guardia.' },
      { t: 'def', term: 'Proteinuria de 24 horas', tono: 'gold', en: 0, text: '**Cuantitativa**: la **más fidedigna**. Se junta toda la orina del día.' },
      { t: 'def', term: 'Electroforesis', tono: 'lilac', en: 1, text: '**Cualitativa**: qué proteína es. La inmunoelectroforesis detecta la de **Bence Jones** (mieloma).' },
    ],
    examen: { origen: 'ortega', texto: 'Los métodos para medir la proteinuria.', cita: 'Las que más se usan… y eso tiene que conocer, porque eso le preguntan en el parcial.', ref: E('21:29') },
    voz: [
      'Los métodos, que se preguntan en el parcial. Las tiras reactivas son semicuantitativas: rápidas y aproximadas, en cruces; cuatro cruces son más de tres gramos. Es lo primero que se hace en la guardia.',
      'La proteinuria de veinticuatro horas es cuantitativa y la más fidedigna: se junta toda la orina del día y se mide cuánto se pierde.',
      'Y la electroforesis es cualitativa: dice qué proteína es. La inmunoelectroforesis encuentra la proteína de Bence Jones del mieloma.',
    ],
    refs: [E('19:34'), E('20:16'), E('20:58'), E('21:29'), E('23:06')],
  },
  {
    id: 't-sedimento',
    sec: 'proteinuria',
    titulo: 'Qué acompaña a la proteinuria',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Hematíes + cilindros hemáticos', tono: 'red', text: 'Lesión **glomerular activa** (nefrítico).' },
      { t: 'def', term: 'Cilindros grasos', tono: 'gold', en: 0, text: 'Síndrome **nefrótico**.' },
      { t: 'def', term: 'Persistente o intermitente', tono: 'mint', en: 1, text: 'Persistente: enfermedad glomerular. Intermitente: ejercicio, fiebre, insuficiencia cardíaca.' },
      { t: 'def', term: 'Por sobrecarga', tono: 'lilac', en: 1, text: 'Sobran proteínas chicas en la sangre (**mieloma**: Bence Jones), que se filtran aunque el glomérulo esté sano.' },
    ],
    examen: { origen: 'preguntero', texto: '¿Qué es la proteinuria por sobrecarga y cómo se detecta?' },
    voz: [
      'Lo que acompaña a la proteinuria orienta. Si hay hematíes y cilindros hemáticos, la lesión glomerular está activa, como en el síndrome nefrítico. Los cilindros grasos, en cambio, son del nefrótico.',
      'Una proteinuria persistente indica enfermedad glomerular; una intermitente puede aparecer con el ejercicio, la fiebre o la insuficiencia cardíaca. Y existe la proteinuria por sobrecarga: cuando sobran proteínas chicas en la sangre, como en el mieloma, que se filtran aunque el glomérulo esté sano.',
    ],
    refs: [E('15:25'), E('16:45'), E('18:09'), E('19:34')],
  },
  {
    id: 't-colores',
    sec: 'orina',
    titulo: 'Los colores de la orina',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Aspecto', 'Pensar en'],
        filas: [
          ['Ámbar, límpida', 'Normal'],
          ['Rojo vivo', '**Hematuria** fresca; rojo oscuro: hemoglobinuria'],
          ['Pardo, «Coca-Cola»', '**Coluria**: bilirrubina directa'],
          ['Normal que **al sol** vira a rojo parduzco', '**Porfiria**'],
          ['Turbia, con olor', '**Infección urinaria**'],
          ['Espuma que no se va', '**Proteinuria**'],
        ],
      },
    ],
    voz: [
      'Los colores de la orina. Rojo vivo es sangre fresca; un rojo más oscuro, hemoglobina libre. Pardo, como gaseosa cola, es la coluria: bilirrubina directa, un problema biliar.',
      'Un caso de la clase: un hombre llega a la guardia con dolor abdominal sin causa, fiebre y vómitos. La orina parece normal, pero al dejarla al sol vira a rojo parduzco: es una porfiria.',
      'Y la orina turbia y con olor hace pensar en una infección; la espuma que no se va, en proteinuria.',
    ],
    refs: [E('02:09'), E('02:49'), E('03:33'), E('04:19'), E('05:01')],
  },
  {
    id: 't-general',
    sec: 'general',
    titulo: 'Examen general: el edema',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Nefrítico', 'Nefrótico'],
        filas: [
          ['Magnitud', '**Leve**', 'Mayor; hasta **anasarca**'],
          ['Dónde', '**Periorbitario**', 'Miembros inferiores, zonas declives'],
          ['Cómo', 'Matinal, blando', 'Pálido, blando, **con fóvea** (Godet)'],
          ['Proteinuria', '< 3,5 g/día', '**> 3,5 g/día**'],
        ],
      },
      { t: 'texto', en: 1, text: 'Además: **tensión arterial** siempre; piel pálida y amarillenta, petequias en la insuficiencia renal.' },
    ],
    voz: [
      'En el examen general, el edema distingue los síndromes. El del nefrítico es leve, alrededor de los ojos, matinal y blando. El del nefrótico es mayor, en las piernas y las zonas declives, pálido, blando y con fóvea, y puede llegar a la anasarca; con más de tres gramos y medio de proteinuria.',
      'Y siempre se toma la presión arterial, y se mira la piel: pálida y amarillenta, con petequias, en la insuficiencia renal.',
    ],
    refs: [E('26:30'), E('27:10'), E('27:50'), L('p459')],
  },
  {
    id: 't-guyon',
    sec: 'region',
    titulo: 'Maniobra de Guyon',
    amplio: true,
    bloques: [
      { t: 'clave', text: '**Decúbito dorsal**. Mano posterior en el **ángulo costomuscular**; mano anterior por fuera de los rectos.' },
      { t: 'texto', en: 1, text: 'Con la inspiración profunda, la mano lumbar da golpes cortos hacia adelante: el riñón agrandado **pelotea** contra la mano anterior.' },
    ],
    examen: { origen: 'ortega', texto: 'La maniobra de Guyon.', cita: 'La primera es la maniobra de Guyon, que esta maniobra siempre la preguntan.', ref: E('29:25') },
    voz: [
      'De las maniobras de palpación renal, la que siempre se pregunta es la de Guyon. El paciente está boca arriba. Una mano va atrás, en el ángulo costomuscular, entre la última costilla y los músculos lumbares; la otra adelante, por fuera de los rectos.',
      'Se le pide una inspiración profunda, y la mano de atrás da golpes cortos hacia adelante: si el riñón está agrandado, rebota contra la mano anterior. Eso es el peloteo renal.',
    ],
    refs: [E('29:11'), E('29:25'), L('p459'), L('p460')],
  },
  {
    id: 't-otras',
    sec: 'region',
    titulo: 'Montenegro, Israel y Glenard',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Montenegro', tono: 'sky', text: 'Igual que Guyon, en **decúbito ventral**: se siente el choque del riñón contra la mano lumbar.' },
      { t: 'def', term: 'Israel', tono: 'lilac', en: 0, text: '**Decúbito lateral** contrario al riñón explorado: el riñón cae hacia la mano anterior.' },
      { t: 'def', term: 'Glenard', tono: 'peach', en: 1, text: 'Pinza bajo el reborde costal: busca la **ptosis renal** (el riñón no vuelve a subir).' },
    ],
    voz: [
      'Las otras maniobras. Montenegro es la misma que Guyon, pero con el paciente boca abajo: se siente el choque del riñón contra la mano lumbar. Israel se hace con el paciente de costado, apoyado sobre el lado contrario, para que el riñón caiga hacia la mano de adelante.',
      'Y Glenard, una pinza con la mano debajo del reborde costal, busca la ptosis renal: el riñón descendido que no vuelve a subir en la espiración.',
    ],
    refs: [E('29:51'), E('30:33'), L('p460')],
  },
  {
    id: 't-percusion',
    sec: 'region',
    titulo: 'Puñopercusión, puntos y auscultación',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Puñopercusión', tono: 'red', text: 'Con el **puño** (Murphy) o el **borde cubital** (Giordano) sobre la fosa lumbar. Normal: **indolora**. Dolor: distensión o inflamación (litiasis, pielonefritis).' },
      { t: 'def', term: 'Puntos ureterales', tono: 'lilac', en: 1, text: 'Superior: a la altura del **ombligo**, borde externo del recto. Medio: sobre la **línea biespinosa**. Posteriores: costovertebral y costomuscular.' },
      { t: 'def', term: 'Auscultación', tono: 'sky', en: 2, text: '**Soplo** periumbilical o lumbar: estenosis de la arteria renal.' },
    ],
    voz: [
      'La puñopercusión se hace con el puño cerrado, o con el borde de la mano, sobre la fosa lumbar. Normalmente no duele; si duele, la vía urinaria está distendida o inflamada, como en una litiasis o una pielonefritis.',
      'Los puntos ureterales: el superior, a la altura del ombligo en el borde externo del recto; el medio, sobre la línea entre las dos espinas ilíacas; y los posteriores, costovertebral y costomuscular.',
      'Y en un hipertenso que no responde al tratamiento, se ausculta: un soplo periumbilical o lumbar sugiere una estenosis de la arteria renal.',
    ],
    refs: [E('30:33'), E('31:13'), E('31:53'), L('p460'), A('3:03:57')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'proteinuria', label: 'Proteinuria' },
    { id: 'orina', label: 'Colores de la orina' },
    { id: 'general', label: 'Examen general' },
    { id: 'region', label: 'Región renal' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'clase',
    titulo: 'La orina que cambia al sol',
    texto: 'Un hombre llega a la guardia con dolor abdominal sin causa clara, fiebre y vómitos. La orina se ve amarilla normal, pero al dejarla al sol se vuelve rojo parduzca.',
    pregunta: '¿Qué sospecha?',
    opciones: [
      { text: 'Porfiria.', why: 'Las porfirinas cambian de color con la luz.' },
      { text: 'Hematuria.', why: 'Sería roja desde el principio.' },
      { text: 'Coluria.', why: 'La orina sería parda al emitirla.' },
      { text: 'Infección urinaria.', why: 'Daría orina turbia con olor.' },
    ],
    correcta: 0,
    razonamiento: 'El caso de la clase: una orina normal que vira a rojo parduzco al sol es una porfiria.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Diabético de diez años',
    texto: 'Diabético tipo 2 de 10 años de evolución, sin edemas. La tira reactiva es negativa, pero la orina de 24 h tiene 120 mg de albúmina.',
    pregunta: '¿Qué tiene?',
    opciones: [
      { text: 'Microalbuminuria: primera señal de nefropatía diabética.', why: 'Entre 30 y 300 mg/día.' },
      { text: 'Rango nefrótico.', why: 'Requiere más de 3,5 g/día.' },
      { text: 'Nada: la tira es negativa.', why: 'La tira no detecta cantidades tan bajas.' },
      { text: 'Proteinuria por sobrecarga.', why: 'Es albúmina, no una proteína chica anormal.' },
    ],
    correcta: 0,
    razonamiento: '30–300 mg/día es microalbuminuria, típica del diabético de más de 5 años.',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'Hipertensión que no baja',
    texto: 'Mujer de 35 años con presión de 180/110 que no baja con cuatro antihipertensivos. Se ausculta un soplo periumbilical.',
    pregunta: '¿Qué sospecha?',
    opciones: [
      { text: 'Estenosis de la arteria renal (HTA renovascular).', why: 'HTA refractaria con soplo: el riñón isquémico libera renina.' },
      { text: 'Síndrome nefrótico.', why: 'No explica el soplo.' },
      { text: 'Cólico renoureteral.', why: 'No da HTA refractaria ni soplo.' },
      { text: 'Hipertensión esencial.', why: 'El soplo obliga a buscar una causa renovascular.' },
    ],
    correcta: 0,
    razonamiento: 'Riñón con poca sangre → renina → angiotensina → HTA refractaria; el soplo es la estenosis.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'pro',
        label: 'Proteinuria',
        tone: 'gold',
        examen: true,
        nota: 'Hay proteinuria: el problema es el glomérulo',
        hijos: [
          { id: 'cua', label: 'Cuánta', tone: 'gold', nota: '> 300 mg/día · microalbuminuria 30–300 · **> 3,5 g = nefrótico**' },
          { id: 'met', label: 'Métodos', tone: 'sky', examen: true, nota: 'Tiras (semicuantitativa) · **24 h** (la más fidedigna) · electroforesis (Bence Jones)' },
        ],
      },
      {
        id: 'exa',
        label: 'Examen físico',
        tone: 'lilac',
        examen: true,
        nota: 'General y región renal',
        hijos: [
          { id: 'gen', label: 'General', tone: 'peach', nota: 'Edema (nefrítico vs nefrótico) · piel · **tensión arterial**' },
          { id: 'guy', label: 'Guyon', tone: 'lilac', examen: true, nota: 'Decúbito dorsal · **peloteo renal** · Montenegro, Israel, Glenard' },
          { id: 'pun', label: 'Puñopercusión y puntos', tone: 'red', nota: 'Dolor = distensión o inflamación · soplo = estenosis de la arteria renal' },
        ],
      },
    ],
    nexos: ['**Espuma que no se va:** proteinuria.', '**Orina normal que vira al sol:** porfiria.'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['ren02-d01', 'ren02-d02', 'ren02-d03'],
  anclas: {
    ubicate: { tab: 'mapa' },
    proteinuria: { tab: 'teoria', seccion: 'proteinuria' },
    orina: { tab: 'teoria', seccion: 'orina' },
    general: { tab: 'teoria', seccion: 'general' },
    region: { tab: 'teoria', seccion: 'region' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    maniobras: { tab: 'maniobras' },
    integracion: { tab: 'cierre' },
  },
};
