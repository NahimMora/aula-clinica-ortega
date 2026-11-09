import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * dig-15: clase visual de la pancreatitis aguda.
 *  1. Clases de Ortega: «Pancreatitis aguda parte 1» (00:02–08:43) y «parte 2» (00:03–24:36).
 *  2. Libro de Clínica Médica de Ortega (p. 407–410): definición, etiologías con porcentajes, formas, teorías, dolor ALICIA,
 *     signos abdominales, falla multiorgánica, laboratorio, imágenes y criterios de Ranson.
 *  3. Preguntero: «Apendicitis y pancreatitis», P4–P8.
 * Correcciones sin atribuir (hipocalcemia, contractura, Ranson): ver content/traceability/dig-15.md.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const A = (t: string) => r('pa-1', t);
const B = (t: string) => r('pa-2', t);
const L = (p: string) => r('libro', undefined, p);

const GRAL = 'Fisiología general, no se da en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-acino',
    sec: 'mecanismo',
    titulo: 'El páncreas que se digiere a sí mismo',
    etapas: ['normal', 'alteracion', 'signo'],
    fig: { f: 'pancreatitis', vistas: ['acino-normal', 'acino', 'acino'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'normal', text: 'Las enzimas salen **inactivas** (tripsinógeno) y se activan recién en el **duodeno**.' },
          { k: 'alteracion', text: 'Se activan **dentro de la glándula**: la tripsina activa al resto.' },
          { k: 'signo', text: '**Autodigestión**: edema, necrosis, hemorragia; inflamación que se extiende.' },
        ],
      },
    ],
    voz: [
      'El páncreas fabrica enzimas muy potentes, capaces de digerir proteínas y grasas. Para no digerirse a sí mismo, las manda inactivas, como tripsinógeno, y se activan recién en el duodeno.',
      'En la pancreatitis aguda, esas enzimas se activan adentro de la propia glándula. La tripsina activa a las demás, en cadena.',
      'Y el páncreas empieza a comerse a sí mismo: edema, necrosis, hemorragia, y una inflamación que puede pasar a los órganos vecinos y a todo el cuerpo.',
    ],
    refs: [A('00:46'), A('03:41'), A('08:00'), L('407')],
  },
  {
    id: 'f-causas',
    sec: 'mecanismo',
    titulo: 'Cálculo y alcohol: cómo la desencadenan',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'biliar', vistas: [{ calculo: 'ampolla', luz: { ampolla: 'red', wirsung: 'red', pancreas: 'red' }, nota: 'Cálculo en la ampolla de Vater', notaTone: 'red' }, { luz: { ampolla: 'gold', wirsung: 'red', pancreas: 'red' }, nota: 'Alcohol: contrae el esfínter de Oddi', notaTone: 'gold' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Litiasis (1.ª causa)', tono: 'red', text: 'Un cálculo enclavado en la **ampolla de Vater** frena la salida: la bilis refluye y la presión sube en el **Wirsung**.' },
      { t: 'def', term: 'Alcohol (2.ª causa)', tono: 'gold', en: 1, text: 'Contrae el **esfínter de Oddi**: la secreción no sale y refluye.' },
      { t: 'texto', en: 1, text: 'En ambos casos, las enzimas se activan adentro.' },
    ],
    voz: [
      'Las dos causas más frecuentes actúan sobre la salida del páncreas. La primera, la litiasis: un cálculo que se enclava en la ampolla de Vater. La bilis no puede salir, refluye, y la presión en el conducto de Wirsung sube.',
      'La segunda, el alcohol, contrae el esfínter de Oddi, con el mismo resultado: la secreción no sale. En los dos casos las enzimas terminan activándose adentro de la glándula.',
    ],
    refs: [A('05:48'), A('06:35'), A('07:16'), A('08:00'), L('407')],
  },
  {
    id: 'f-difusion',
    sec: 'clinica',
    titulo: 'El exudado se difunde',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'pancreatitis', vistas: ['difusion'] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'mecanismo', text: 'El páncreas es **retroperitoneal**: el líquido inflamatorio corre por el retroperitoneo.' },
          { k: 'signo', text: 'Paraliza el asa vecina: **asa centinela** (íleo regional).' },
          { k: 'signo', text: 'Irrita el diafragma izquierdo: **derrame pleural izquierdo**.' },
          { k: 'signo', text: 'Si es hemorrágico, la sangre aflora: **Cullen** (ombligo) y **Grey Turner** (flancos).' },
        ],
      },
    ],
    voz: [
      'El páncreas está detrás del peritoneo. Cuando se inflama, su exudado se difunde por el retroperitoneo, y eso explica los signos.',
      'El asa de intestino más cercana se paraliza: es el asa centinela, un íleo paralítico localizado.',
      'La cola del páncreas toca el diafragma izquierdo; al irritarlo, irrita la pleura de arriba y aparece un derrame pleural izquierdo.',
      'Y si la pancreatitis es necrohemorrágica, la sangre del retroperitoneo aflora en la piel: alrededor del ombligo, el signo de Cullen, y en los flancos, el de Grey Turner.',
    ],
    refs: [B('05:02'), B('05:47'), B('06:32'), B('07:57'), B('08:41'), L('408')],
  },
  {
    id: 'f-hemoconcentracion',
    sec: 'sistemica',
    titulo: 'Hipovolemia con hemoconcentración',
    etapas: ['mecanismo', 'signo'],
    amplio: true,
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'mecanismo', text: 'La inflamación aumenta la **permeabilidad**: el plasma se va a un **tercer espacio**; además, vómitos.' },
          { k: 'signo', text: 'Se pierde líquido pero no glóbulos: **hematocrito alto** (hemoconcentración).' },
          { k: 'signo', text: 'Hipovolemia: hipotensión, taquicardia, **oliguria** (insuficiencia renal prerrenal), shock; trombosis.' },
        ],
      },
    ],
    voz: [
      'El cuadro sistémico empieza por el líquido. La inflamación vuelve permeables los vasos, y el plasma se escapa al retroperitoneo y al abdomen, a un tercer espacio; a eso se suman los vómitos.',
      'Se pierde agua, pero los glóbulos rojos se quedan: la sangre se concentra, y el hematocrito sube. Es la hemoconcentración, que el profesor marca para el parcial y el oral.',
      'El paciente está hipovolémico: hipotenso, taquicárdico, orina poco porque el riñón recibe poca sangre, y puede llegar al shock. Y con la sangre concentrada, tiende a trombosis.',
    ],
    refs: [B('08:41'), B('09:23'), B('10:05'), B('10:46'), B('12:08'), L('408')],
  },
  {
    id: 'f-calcio',
    sec: 'sistemica',
    titulo: 'Calcio bajo y glucosa alta',
    etapas: ['mecanismo', 'signo'],
    amplio: true,
    bloques: [
      { t: 'def', term: 'Hipocalcemia', tono: 'sky', text: 'La lipasa libera ácidos grasos en la grasa necrosada, que **atrapan calcio** (saponificación).' },
      { t: 'def', term: 'Hiperglucemia', tono: 'peach', en: 1, text: 'Se dañan los **islotes**: falta insulina. Indica necrosis extensa.' },
    ],
    aclara: { text: 'El mecanismo de la hipocalcemia (saponificación) es de la fisiología general.', origen: GRAL },
    voz: [
      'Dos alteraciones del laboratorio con su porqué. El calcio baja porque la lipasa libera ácidos grasos en la grasa que se necrosa alrededor del páncreas, y esos ácidos grasos atrapan el calcio, como cuando se forma un jabón.',
      'Y la glucosa sube porque la inflamación daña los islotes de Langerhans, que fabrican la insulina. Una hiperglucemia indica una necrosis extensa.',
    ],
    refs: [B('11:26'), B('17:45'), B('19:08'), L('408'), L('409')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'mecanismo', label: 'Autodigestión' },
    { id: 'clinica', label: 'Los signos' },
    { id: 'sistemica', label: 'Todo el cuerpo' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-def',
    sec: 'mecanismo',
    titulo: 'Pancreatitis aguda',
    fig: { f: 'pancreatitis', vistas: ['acino'] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', text: 'Inflamación aguda por **activación de las enzimas dentro del propio páncreas**: puede comprometer órganos vecinos y lejanos.' },
      { t: 'texto', en: 1, text: 'Solo se toma la **aguda**. La crónica se diferencia por las **calcificaciones**.' },
    ],
    examen: { origen: 'ortega', texto: 'Pancreatitis aguda: choice, oral y final.', cita: 'Pancreatitis aguda tienen que sabérselo sí o sí como la palma de la mano.', ref: B('01:11') },
    voz: [
      'La pancreatitis aguda, que el profesor pide como la palma de la mano: se pregunta en el choice, en el oral y en el final. Es una inflamación aguda del páncreas por la activación de sus enzimas dentro de la propia glándula, que puede comprometer a los órganos vecinos e incluso a órganos a distancia.',
      'Solo se toma la aguda. La crónica es parecida, pero en vez de edema y necrosis tiene calcificaciones.',
    ],
    refs: [A('00:02'), A('00:46'), B('00:43'), B('01:11'), L('407')],
  },
  {
    id: 't-causas',
    sec: 'mecanismo',
    titulo: 'Causas',
    amplio: true,
    bloques: [
      { t: 'clave', tono: 'red', text: '**Litiasis biliar** (1.ª, 45 %, más en mujeres) y **alcoholismo** (2.ª, 35 %, más en hombres): juntas, el 80 %.' },
      {
        t: 'comparar',
        en: 1,
        cols: [
          { titulo: 'Directas', tono: 'peach', items: ['Traumatismo abdominal', 'Posquirúrgica', 'CPRE, maniobras sobre el Oddi'] },
          { titulo: 'Indirectas', tono: 'lilac', items: ['**Litiasis**, **alcohol**', 'Hipertrigliceridemia, hipercalcemia', 'Fármacos, infecciones (parotiditis), autoinmunes, malformaciones'] },
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Las causas más frecuentes de pancreatitis aguda.', cita: 'Pregunta de examen y lo van a preguntar en el parcial: cuáles son las causas más frecuentes que me producen la pancreatitis aguda.', ref: A('01:56') },
    voz: [
      'Las causas, pregunta de parcial. Las dos más frecuentes: la litiasis biliar, la primera, sobre todo en mujeres, y el alcoholismo crónico, la segunda, sobre todo en hombres. Entre las dos explican el ochenta por ciento.',
      'Se dividen en directas, como un traumatismo del abdomen, una cirugía o una endoscopía sobre la papila; e indirectas: la litiasis y el alcohol, y además la hipertrigliceridemia, la hipercalcemia, algunos fármacos, infecciones como la parotiditis, y enfermedades autoinmunes.',
    ],
    refs: [A('01:30'), A('01:56'), A('02:14'), L('407')],
  },
  {
    id: 't-formas',
    sec: 'mecanismo',
    titulo: 'Edematosa y necrohemorrágica',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Edematosa', tono: 'mint', text: 'La **más frecuente** (90–95 %): edema intersticial, exudado leve, células indemnes.' },
      { t: 'def', term: 'Necrohemorrágica', tono: 'red', en: 1, text: 'Grave: **hemorragia y necrosis** que exceden la glándula; cuadro peritoneal y sistémico.' },
    ],
    voz: [
      'Por su anatomía patológica hay dos formas. La edematosa, la más frecuente, en el noventa a noventa y cinco por ciento: hay edema, un exudado leve, y las células pancreáticas se conservan.',
      'Y la necrohemorrágica, una evolución grave: hemorragia dentro del páncreas y necrosis que pasa los límites de la glándula, con un cuadro peritoneal y manifestaciones sistémicas muy fuertes.',
    ],
    refs: [A('02:14'), A('02:59'), L('407')],
  },
  {
    id: 't-dolor',
    sec: 'clinica',
    titulo: 'El dolor',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['ALICIA', ''],
        filas: [
          ['Antigüedad', 'Agudo, de comienzo **brusco**'],
          ['Localización', '**Epigastrio** o hipocondrio izquierdo'],
          ['Irradiación', '**En cinturón** o hemicinturón hacia el dorso (D7–D12)'],
          ['Carácter', '**Transfixiante**: «como una puñalada de lado a lado»'],
          ['Intensidad', 'Muy intenso: más de 7'],
          ['Atenuantes', 'No cede con analgésicos comunes; **posición de plegaria**'],
          ['Agravantes', 'Comidas copiosas, grasas, **alcohol**'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Las manifestaciones clínicas de la pancreatitis aguda.', cita: 'Manifestaciones clínicas de lo que es la pancreatitis aguda, pregunta de parcial.', ref: B('00:03') },
    voz: [
      'Las manifestaciones clínicas son pregunta de parcial, y la principal es el dolor. Agudo, de comienzo brusco, en el epigastrio o el hipocondrio izquierdo, que se irradia en cinturón hacia la espalda. Es transfixiante: el paciente lo describe como una puñalada que lo atraviesa.',
      'Es muy intenso, no cede con los analgésicos comunes, y el paciente busca la posición de plegaria, sentado e inclinado hacia adelante, o acostado de costado con las piernas flexionadas, para aliviar la presión sobre la glándula. Empeora después de comidas copiosas, grasas o alcohol.',
    ],
    refs: [B('00:03'), B('01:27'), B('02:10'), B('02:52'), L('408')],
  },
  {
    id: 't-vomitos-abdomen',
    sec: 'clinica',
    titulo: 'Vómitos y examen del abdomen',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Náuseas y vómitos', tono: 'peach', text: 'El **segundo** síntoma: gástricos o biliosos, copiosos, **no alivian** el dolor.' },
      {
        t: 'cuadro',
        en: 1,
        head: ['Examen', 'Hallazgo'],
        filas: [
          ['Inspección', 'Distensión; Cullen y Grey Turner en la forma grave'],
          ['Auscultación', '**Asa centinela**: silencio localizado'],
          ['Percusión', 'Timpanismo'],
          ['Palpación', 'Doloroso y tenso, **defensa discreta**; puede haber Blumberg'],
        ],
      },
      { t: 'texto', en: 2, soloWeb: true, text: 'Puntos dolorosos pancreáticos: zona coledocopancreática de Chauffard, punto de Desjardins (ver examen físico del abdomen).' },
    ],
    voz: [
      'El segundo síntoma son las náuseas y los vómitos: de contenido gástrico o bilioso, abundantes, y que, a diferencia de los de una gastritis o una colecistitis, no alivian el dolor.',
      'En el abdomen: distensión a la inspección, y en las formas graves, los signos de Cullen y Grey Turner. A la auscultación, el asa centinela, un silencio localizado. Timpanismo a la percusión. Y a la palpación, un abdomen doloroso y tenso, con una defensa discreta para lo intenso del dolor; puede haber signos de irritación peritoneal. El profesor lo resume así: la pancreatitis aguda es un abdomen agudo inflamatorio, el tercero en frecuencia después de la apendicitis y la colecistitis.',
    ],
    refs: [B('03:34'), B('04:16'), B('06:32'), B('07:17'), B('15:41'), L('408'), L('409')],
  },
  {
    id: 't-cullen',
    sec: 'clinica',
    titulo: 'Cullen y Grey Turner',
    fig: { f: 'pancreatitis', vistas: ['difusion'] },
    anchoFig: 'chica',
    bloques: [
      { t: 'def', term: 'Cullen (Halsted-Cullen)', tono: 'lilac', text: 'Equimosis **periumbilical**.' },
      { t: 'def', term: 'Grey Turner', tono: 'lilac', en: 0, text: 'Equimosis en los **flancos**.' },
      { t: 'texto', en: 1, text: 'Hemorragia **retroperitoneal**: pancreatitis **necrohemorrágica**. No son patognomónicos (embarazo ectópico roto).' },
    ],
    examen: { origen: 'ortega', texto: 'Los signos de Cullen y Grey Turner.', cita: 'Lo más característico es esto, y esto pregunta de parcial, chicos: el signo de Cullen, el signo de Grey Turner.', ref: B('05:10') },
    voz: [
      'Y lo que el profesor marca como pregunta de parcial: el signo de Cullen, una equimosis alrededor del ombligo, y el de Grey Turner, equimosis en los flancos.',
      'Son sangre del retroperitoneo que aflora en la piel, y aparecen en la pancreatitis necrohemorrágica, no en la edematosa. Ojo: no son patognomónicos. Cualquier sangrado retroperitoneal puede darlos, como un embarazo ectópico roto.',
    ],
    refs: [B('05:02'), B('05:10'), B('05:47'), L('408')],
  },
  {
    id: 't-sistemicas',
    sec: 'sistemica',
    titulo: 'Falla multiorgánica',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Sistema', 'Alteración'],
        filas: [
          ['Pulmonar', '**Derrame pleural izquierdo**, atelectasia, distrés'],
          ['Cardiovascular', 'Hipotensión, taquicardia, **shock hipovolémico**'],
          ['Renal', '**Oliguria**: insuficiencia prerrenal'],
          ['Hepático', 'Ictericia (15 %)'],
          ['SNC', 'Confusión, desorientación'],
          ['Metabólico', '**Hiperglucemia**, **hipocalcemia**'],
          ['Hematológico', 'Trombosis, CID'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'La hemoconcentración en la pancreatitis aguda.', cita: 'Eso quiero que lo tengan en cuenta, lo pueden preguntar en el parcial, en el oral: por qué los pacientes están hemoconcentrados.', ref: B('10:36') },
    voz: [
      'En los casos graves, la pancreatitis da falla multiorgánica. En el pulmón, el derrame pleural izquierdo, atelectasias o un distrés. En la circulación, hipotensión, taquicardia y shock hipovolémico. En el riñón, oliguria por insuficiencia prerrenal. En el hígado, ictericia, en alrededor del quince por ciento. En el cerebro, confusión.',
      'Y en lo metabólico, hiperglucemia e hipocalcemia; en la sangre, trombosis y coagulación intravascular. Todo arranca en la hipovolemia con hemoconcentración, que el profesor marca para el parcial y el oral.',
    ],
    refs: [B('07:57'), B('08:41'), B('09:23'), B('10:36'), B('11:26'), B('12:08'), L('408')],
  },
  {
    id: 't-anamnesis',
    sec: 'diagnostico',
    titulo: 'Anamnesis y examen general',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Antecedentes', tono: 'peach', text: '**Litiasis**, **alcohol**, comidas copiosas, fármacos, cirugías, familiares con pancreatitis.' },
      { t: 'def', term: 'Aspecto', tono: 'red', en: 1, text: 'Paciente grave, angustiado, inquieto; fiebre, extremidades frías, hipotensión, taquicardia, deshidratación, oliguria.' },
      { t: 'texto', en: 2, soloWeb: true, text: 'Drama pancreático de Dieulafoy: comienzo brusco con dolor, vómitos, meteorismo y shock (forma hemorrágica).' },
    ],
    voz: [
      'En la anamnesis se buscan los antecedentes: litiasis, alcohol, una comida copiosa, fármacos, cirugías, y pancreatitis en la familia.',
      'Salvo las formas leves, es un paciente gravemente enfermo, angustiado, inquieto, a veces con fiebre, con las extremidades frías, hipotenso y taquicárdico, deshidratado y orinando poco. Si tiene fiebre, hay que pensar en una infección; y siempre buscar el derrame pleural izquierdo.',
    ],
    refs: [B('12:08'), B('12:51'), B('14:15'), B('14:58'), L('408'), L('409')],
  },
  {
    id: 't-lab',
    sec: 'diagnostico',
    titulo: 'Laboratorio',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Amilasa', tono: 'gold', text: '**3 veces o más** el valor normal. Sube en la primera hora y baja desde el 3.er día (aparece en la orina). No es exclusiva.' },
      { t: 'def', term: 'Lipasa', tono: 'red', en: 0, text: '**Más específica** y dura más; la de elección, pero cara.' },
      { t: 'lista', en: 1, items: ['Leucocitosis > 15.000; **hipocalcemia**; **hiperglucemia**.', 'LDH alta; bilirrubina, FA y transaminasas (origen biliar).', 'Urea y creatinina: compromiso renal; triglicéridos.'] },
    ],
    voz: [
      'En el laboratorio, lo que se pide en todos lados es la amilasa: si está tres veces o más por encima de lo normal, con la clínica, es una pancreatitis. Sube en la primera hora y baja desde el tercer día, cuando empieza a aparecer en la orina. Pero no es exclusiva: también sube en una úlcera perforada o un embarazo ectópico.',
      'La lipasa es más específica y dura más, pero es cara: se pide cuando hay dudas. Además, leucocitosis de más de quince mil, calcio bajo, glucosa alta, LDH alta, la bilirrubina y las enzimas hepáticas por si el origen es biliar, y la urea y la creatinina por el riñón.',
    ],
    refs: [B('16:22'), B('17:03'), B('17:45'), B('18:26'), B('19:08'), L('409')],
  },
  {
    id: 't-imagenes',
    sec: 'diagnostico',
    titulo: 'Imágenes',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Rx de abdomen y tórax', tono: 'sky', text: '**Asa centinela**, borramiento del psoas; derrame pleural, atelectasias.' },
      { t: 'def', term: 'Ecografía', tono: 'mint', en: 0, text: 'Busca la **litiasis**; limitada para ver el páncreas.' },
      { t: 'def', term: 'Tomografía con contraste', tono: 'red', en: 1, text: 'Gradúa la inflamación y la **necrosis**: criterios de **Balthazar**.' },
    ],
    voz: [
      'En imágenes, la radiografía de abdomen puede mostrar el asa centinela, y la de tórax, el derrame pleural o atelectasias. La ecografía sirve para buscar los cálculos, pero ve mal el páncreas.',
      'Y la tomografía con contraste es la que gradúa la inflamación y la necrosis, con los criterios de Balthazar.',
    ],
    refs: [B('19:08'), B('19:49'), B('20:30'), L('409'), L('410')],
  },
  {
    id: 't-ranson',
    sec: 'gravedad',
    titulo: 'Criterios de Ranson',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Al ingreso', 'No biliar', 'Biliar', 'A las 48 h'],
        filas: [
          ['Edad', '> 55', '> 70', 'Hematocrito: baja > 10 %'],
          ['Leucocitos', '> 16.000', '> 18.000', 'Urea: sube > 5 mg/dl'],
          ['Glucemia', '> 200', '> 220', 'PaO₂ < 60 mmHg'],
          ['GOT', '> 250', '> 250', 'Déficit de bases > 4'],
          ['LDH', '> 350', '> 400', 'Calcemia < 8 mg/dl'],
          ['', '', '', 'Secuestro de líquido > 6 L'],
        ],
      },
      { t: 'texto', en: 1, text: '**1–3**: leve · **4 o más**: severa. Mortalidad: 3 criterios ≈ 3 %, 4–6 ≈ 15 %, > 6 ≈ 40 %.' },
    ],
    examen: { origen: 'ortega', texto: 'Los criterios de Ranson y de Balthazar.', cita: 'No me pueden no saber los criterios de Balthazar, no me pueden no saber los criterios de Ranson. Si no me saben esto, lo van a bochar.', ref: B('20:52') },
    voz: [
      'Los criterios de Ranson, que el profesor pide sin excusas: el que no los sabe, lo bochan. Miden la gravedad y la mortalidad. Al ingreso son cinco: la edad, los leucocitos, la glucemia, la GOT y la LDH, con cortes algo más altos si la pancreatitis es biliar. Por ejemplo, la edad: más de cincuenta y cinco si no es biliar, más de setenta si es biliar.',
      'A las cuarenta y ocho horas son seis, iguales para las dos: que el hematocrito baje más de un diez por ciento, que la urea suba más de cinco, una PaO dos menor de sesenta, un déficit de bases mayor de cuatro, calcio menor de ocho, y un secuestro de líquido de más de seis litros.',
      'De uno a tres criterios, leve; cuatro o más, severa. Con más de seis, la mortalidad ronda el cuarenta por ciento.',
    ],
    refs: [B('20:30'), B('20:52'), B('21:11'), B('21:53'), B('22:34'), B('23:14'), L('410')],
  },
  {
    id: 't-balthazar',
    sec: 'gravedad',
    titulo: 'Criterios de Balthazar',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Grado', 'Tomografía'],
        filas: [
          ['**A**', 'Páncreas normal'],
          ['**B**', 'Agrandamiento difuso'],
          ['**C**', 'Inflamación **peripancreática**'],
          ['**D**', 'Una colección líquida'],
          ['**E**', 'Dos o más colecciones o **gas**'],
        ],
      },
      { t: 'texto', en: 1, text: 'Se suma el **porcentaje de necrosis**: más necrosis, más mortalidad.' },
    ],
    aclara: { text: 'En la clase y el apunte, Balthazar se muestra como tabla; los grados se transcriben de la bibliografía.', origen: 'Bibliografía.' },
    examen: { origen: 'preguntero', texto: 'Mencione los criterios de Ranson y los criterios tomográficos de Balthazar.' },
    voz: [
      'Y los criterios de Balthazar, que gradúan la tomografía. A, páncreas normal. B, agrandamiento difuso. C, inflamación alrededor del páncreas. D, una colección líquida. Y E, dos o más colecciones, o gas.',
      'A eso se le suma cuánto del páncreas está necrosado: cuanta más necrosis, mayor la mortalidad. Ranson mira el laboratorio; Balthazar, la imagen.',
    ],
    refs: [B('20:30'), B('21:11'), L('410')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'mecanismo', label: 'Qué es y causas' },
    { id: 'clinica', label: 'Clínica' },
    { id: 'sistemica', label: 'Sistémica' },
    { id: 'diagnostico', label: 'Diagnóstico' },
    { id: 'gravedad', label: 'Ranson y Balthazar' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'practica',
    titulo: 'Dolor en cinturón después de un asado',
    texto: 'Mujer de 50 años con litiasis conocida. Tras una comida abundante, dolor epigástrico brusco, muy intenso, que la atraviesa hacia la espalda en cinturón, con vómitos que no la alivian. Se sienta inclinada hacia adelante.',
    pregunta: '¿Qué pide para confirmar?',
    opciones: [
      { text: 'Amilasa (o lipasa): tres o más veces el valor normal confirma con la clínica.', why: 'Pancreatitis aguda de probable origen biliar.' },
      { text: 'Solo una ecografía.', why: 'Busca la litiasis, pero no confirma la pancreatitis.' },
      { text: 'Endoscopía alta.', why: 'No es el estudio de la pancreatitis.' },
      { text: 'Tomografía al ingreso siempre.', why: 'Se reserva para dudas o para graduar.' },
    ],
    correcta: 0,
    razonamiento: 'Dolor transfixiante en cinturón, vómitos sin alivio, posición de plegaria: pancreatitis aguda; la litiasis es la primera causa.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Moretones en los flancos',
    texto: 'Hombre alcohólico con pancreatitis grave. Al tercer día aparecen equimosis en ambos flancos y alrededor del ombligo. Está hipotenso, con hematocrito alto y oliguria.',
    pregunta: '¿Qué indican los signos?',
    opciones: [
      { text: 'Grey Turner y Cullen: pancreatitis necrohemorrágica con hemorragia retroperitoneal.', why: 'Sangre del retroperitoneo que aflora en la piel.' },
      { text: 'Pancreatitis edematosa leve.', why: 'Estos signos son de la forma grave.' },
      { text: 'Traumatismo de pared.', why: 'Hay un contexto de pancreatitis.' },
      { text: 'Insuficiencia hepática.', why: 'No explica las equimosis en esos sitios.' },
    ],
    correcta: 0,
    razonamiento: 'Hemoconcentración + oliguria + Cullen/Grey Turner: forma necrohemorrágica, grave.',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'Contar Ranson',
    texto: 'Pancreatitis no biliar. Al ingreso: 60 años, 17.000 leucocitos, glucemia 180, GOT 120, LDH 300. A las 48 h: calcio 7,5 mg/dl; resto sin criterios.',
    pregunta: '¿Cuántos criterios y qué gravedad?',
    opciones: [
      { text: '3 criterios: leve.', why: 'Edad > 55, leucocitos > 16.000 y calcio < 8.' },
      { text: '5 criterios: severa.', why: 'Glucemia, GOT y LDH no superan los cortes.' },
      { text: '1 criterio: leve.', why: 'Son tres.' },
      { text: 'No se puede contar sin tomografía.', why: 'Ranson usa la clínica y el laboratorio.' },
    ],
    correcta: 0,
    razonamiento: 'No biliar: edad > 55 ✔, leucocitos > 16.000 ✔, glucemia > 200 ✘, GOT > 250 ✘, LDH > 350 ✘; a las 48 h calcio < 8 ✔ → 3: leve.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'mec',
        label: 'Autodigestión',
        tone: 'red',
        examen: true,
        nota: 'Las enzimas se activan dentro del páncreas',
        hijos: [
          { id: 'cau', label: 'Causas', tone: 'red', examen: true, nota: '**Litiasis** (1.ª) y **alcohol** (2.ª): 80 %' },
          { id: 'for', label: 'Formas', tone: 'peach', nota: 'Edematosa (la más frecuente) · necrohemorrágica (grave)' },
        ],
      },
      {
        id: 'cli',
        label: 'Clínica',
        tone: 'peach',
        examen: true,
        nota: 'Abdomen agudo inflamatorio',
        hijos: [
          { id: 'dol', label: 'Dolor', tone: 'peach', examen: true, nota: 'Epigástrico, **en cinturón**, transfixiante · plegaria · vómitos sin alivio' },
          { id: 'sig', label: 'Signos', tone: 'lilac', examen: true, nota: '**Cullen** · **Grey Turner** · asa centinela · derrame pleural izquierdo' },
          { id: 'sis', label: 'Sistémica', tone: 'sky', examen: true, nota: '**Hemoconcentración** · shock · oliguria · hipocalcemia · hiperglucemia' },
        ],
      },
      {
        id: 'dx',
        label: 'Diagnóstico y gravedad',
        tone: 'gold',
        examen: true,
        nota: 'Laboratorio + imágenes',
        hijos: [
          { id: 'ami', label: 'Amilasa / lipasa', tone: 'gold', nota: '≥ 3 veces lo normal · la lipasa es más específica' },
          { id: 'ran', label: 'Ranson y Balthazar', tone: 'red', examen: true, nota: 'Ranson: 5 al ingreso + 6 a las 48 h · Balthazar: tomografía A–E' },
        ],
      },
    ],
    nexos: ['**Cullen y Grey Turner:** hemorragia retroperitoneal, no son exclusivos.', '**Ranson = laboratorio; Balthazar = tomografía.**'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['dig15-d01', 'dig15-d02', 'dig15-d03', 'dig15-d04'],
  anclas: {
    ubicate: { tab: 'mapa' },
    mecanismo: { tab: 'teoria', seccion: 'mecanismo' },
    clinica: { tab: 'teoria', seccion: 'clinica' },
    sistemica: { tab: 'teoria', seccion: 'sistemica' },
    diagnostico: { tab: 'teoria', seccion: 'diagnostico' },
    gravedad: { tab: 'teoria', seccion: 'gravedad' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    maniobras: { tab: 'maniobras' },
    integracion: { tab: 'cierre' },
  },
};
