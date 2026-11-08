import type { Maneuver } from '@/types';

/** Video de referencia de maniobras (embebible en YouTube). Se reproduce por fragmentos; no se redistribuye. */
export const ARGENTE_YT = 'EC9tSepFn_U';

export interface ManeuverGroup {
  id: string;
  system: 'digestivo' | 'renal' | 'neuro' | 'soma';
  title: string;
  description: string;
  status: 'ready' | 'soon';
}

export const MANEUVER_SYSTEMS = [
  { id: 'digestivo', title: 'Digestivo', tone: 'rose' },
  { id: 'renal', title: 'Renal', tone: 'sky' },
  { id: 'neuro', title: 'Neurología', tone: 'lilac' },
  { id: 'soma', title: 'Soma', tone: 'peach' },
] as const;

/** Grupos previstos. Un grupo pasa a `ready` solo cuando sus fragmentos fueron verificados contra el video. */
export const MANEUVER_GROUPS: ManeuverGroup[] = [
  { id: 'boca-cuello', system: 'digestivo', title: 'Boca, orofaringe y ganglios del cuello', description: 'Inspección de la cavidad oral y búsqueda de adenopatías supraclaviculares (Virchow).', status: 'ready' },
  { id: 'estomago', system: 'digestivo', title: 'Estómago: bazuqueo gástrico', description: 'Chapoteo gástrico por líquido retenido (síndrome pilórico).', status: 'ready' },
  { id: 'abd-inspeccion', system: 'digestivo', title: 'Inspección y topografía del abdomen', description: 'Regiones, forma, cicatrices, circulación colateral, ondas peristálticas.', status: 'soon' },
  { id: 'abd-auscultacion', system: 'digestivo', title: 'Auscultación del abdomen', description: 'Ruidos hidroaéreos y soplos.', status: 'soon' },
  { id: 'abd-percusion', system: 'digestivo', title: 'Percusión del abdomen', description: 'Timpanismo, matidez, ascitis.', status: 'soon' },
  { id: 'abd-palpacion', system: 'digestivo', title: 'Palpación superficial y profunda', description: 'Tono, sensibilidad, defensa, vísceras huecas.', status: 'soon' },
  { id: 'higado', system: 'digestivo', title: 'Hígado', description: 'Palpación monomanual y bimanual, borde hepático.', status: 'soon' },
  { id: 'bazo', system: 'digestivo', title: 'Bazo', description: 'Palpación del bazo y posición de Schuster.', status: 'soon' },
  { id: 'vesicula', system: 'digestivo', title: 'Vesícula biliar', description: 'Punto cístico y signo de Murphy.', status: 'soon' },
  { id: 'rinon', system: 'renal', title: 'Palpación renal', description: 'Maniobras de palpación renal y puntos dolorosos.', status: 'soon' },
  { id: 'pares', system: 'neuro', title: 'Pares craneales', description: 'Exploración de cada par craneal.', status: 'soon' },
  { id: 'motilidad', system: 'neuro', title: 'Motilidad, tono y fuerza', description: 'Fuerza, tono, trofismo y maniobras deficitarias.', status: 'soon' },
  { id: 'reflejos', system: 'neuro', title: 'Reflejos', description: 'Superficiales y osteotendinosos.', status: 'soon' },
  { id: 'sensibilidad', system: 'neuro', title: 'Sensibilidad', description: 'Superficial y profunda.', status: 'soon' },
  { id: 'taxia', system: 'neuro', title: 'Coordinación (taxia) y marcha', description: 'Pruebas de coordinación y equilibrio.', status: 'soon' },
  { id: 'meningeos', system: 'neuro', title: 'Signos meníngeos', description: 'Rigidez de nuca, Kernig y Brudzinski.', status: 'soon' },
  { id: 'soma-columna', system: 'soma', title: 'Columna', description: 'Cervical, dorsal, lumbar y sacroilíacas.', status: 'soon' },
  { id: 'soma-mmss', system: 'soma', title: 'Miembro superior', description: 'Hombro, codo y muñeca.', status: 'soon' },
  { id: 'soma-mmii', system: 'soma', title: 'Miembro inferior', description: 'Cadera, rodilla y tobillo.', status: 'soon' },
];

/** Maniobras verificadas (fragmentos comprobados contra el video). Se completa capítulo a capítulo. */
export const MANEUVERS: Maneuver[] = [
  {
    id: 'boca-orofaringe',
    system: 'digestivo',
    group: 'boca-cuello',
    name: 'Examen de la boca, orofaringe y glándulas salivales',
    video: { youtubeId: ARGENTE_YT, start: 3008, end: 3090, label: 'Argente · Video 5 (Examen de la cabeza)' },
    explores: 'Piezas dentarias, paladar duro y blando, úvula, lengua (trofismo y lesiones), piso de la boca y glándulas sublinguales, submaxilares y parótidas.',
    patientPosition: 'Sentado, con la cabeza levemente extendida y la boca bien abierta.',
    examinerPosition: 'De frente al paciente, con buena luz (linterna) y bajalenguas; guante si va a palpar.',
    technique: [
      'Pedir que abra la boca: evaluar dientes (estado, prótesis) y paladar duro y blando (lesiones, petequias).',
      'Observar la simetría de la úvula y la orofaringe posterior (amígdalas, signos inflamatorios); deprimir la lengua con el bajalenguas.',
      'Pedir que saque la lengua (trofismo, lesiones) y que la eleve para ver el piso de la boca; palpar con guante si hace falta.',
      'Palpar glándulas sublinguales, submaxilares y parótidas.',
    ],
    normal: 'Mucosas húmedas y rosadas, úvula central, lengua eutrófica sin lesiones, glándulas no palpables o blandas e indoloras.',
    pathologic: 'Placas blanquecinas (candidiasis), signos de faringoamigdalitis, lesiones de la lengua o del paladar, úvula desviada, parótidas aumentadas de tamaño.',
    interpretation:
      'En un paciente con disfagia u odinofagia, la inspección orofaríngea es el primer estudio: descarta una faringoamigdalitis (causa más frecuente de odinofagia) y muestra candidiasis oral (pensar en inmunodepresión o esofagitis por *Candida*). La úvula desviada orienta a lesión de pares bajos (IX–X), compatible con disfagia orofaríngea neurológica. La hipertrofia parotídea se asocia al hábito alcohólico.',
    pitfalls: ['Examinar sin buena iluminación ni bajalenguas: se pierde la pared posterior.', 'Olvidar la orofaringe en la disfagia "alta": es el sitio donde empieza el problema.'],
    professorNote: {
      text: 'Ante una disfagia orofaríngea, lo primero es observar la garganta con linterna y bajalenguas; si no se ve nada, se pasa a la endoscopía alta. También señala la candidiasis oral entre los hallazgos del examen físico.',
      refs: [{ src: 'mc-dig-1', t: '22:10' }, { src: 'mc-dig-1', t: '22:50' }],
    },
    refs: [{ src: 'argente', t: '50:08' }],
  },
  {
    id: 'ganglios-supraclaviculares',
    system: 'digestivo',
    group: 'boca-cuello',
    name: 'Palpación de los ganglios supraclaviculares (ganglio de Virchow)',
    video: { youtubeId: ARGENTE_YT, start: 1936, end: 1982, label: 'Argente · Video 3 (Sistemas diseminados)' },
    explores: 'Las fosas supraclaviculares derecha e izquierda, en busca de adenopatías.',
    patientPosition: 'Decúbito dorsal (o sentado), con el cuello relajado.',
    examinerPosition: 'Al costado o detrás del paciente, palpando con el pulpejo de los dedos en la fosa supraclavicular.',
    technique: [
      'Completar antes la palpación de los grupos cervicales (incluidos los profundos, por detrás del esternocleidomastoideo).',
      'Palpar la fosa supraclavicular izquierda y luego la derecha con movimientos suaves y circulares.',
      'Si se palpa un ganglio, describir tamaño, consistencia, movilidad, sensibilidad y si está adherido.',
    ],
    normal: 'Los ganglios supraclaviculares normalmente no se palpan.',
    pathologic: 'Adenopatía supraclavicular, especialmente izquierda, duro-pétrea y fija.',
    interpretation:
      'El ganglio supraclavicular izquierdo (de Virchow) drena el tórax y también el abdomen superior: su aumento puede ser la metástasis de un adenocarcinoma de estómago. En un paciente con disfagia progresiva, dispepsia con signos de alarma o pérdida de peso, encontrarlo cambia el diagnóstico presuntivo hacia una neoplasia.',
    pitfalls: ['Palpar solo la fosa derecha o hacerlo con demasiada presión.', 'No relacionar el hallazgo con el abdomen: la izquierda drena el abdomen superior.'],
    professorNote: {
      text: 'En el examen físico del paciente con disfagia hay que buscar adenopatías cervicales y supraclaviculares, sospechando un ganglio de Virchow.',
      refs: [{ src: 'mc-dig-1', t: '22:10' }],
    },
    refs: [{ src: 'argente', t: '32:16' }],
  },
  {
    id: 'bazuqueo-gastrico',
    system: 'digestivo',
    group: 'estomago',
    name: 'Bazuqueo o chapoteo gástrico',
    video: { youtubeId: ARGENTE_YT, start: 9594, end: 9644, label: 'Argente · Video 24 (Palpación del abdomen)' },
    explores: 'La presencia de líquido retenido en el estómago (estómago que no se vacía).',
    patientPosition: 'Decúbito dorsal, abdomen descubierto y relajado.',
    examinerPosition: 'A la derecha del paciente, palpando el epigastrio.',
    technique: [
      'Durante la palpación superficial (de abajo hacia arriba, paralela a la línea media) se puede percibir un gorgoteo al llegar al epigastrio.',
      'Para magnificarlo: con la punta de los dedos, hundir el epigastrio con movimientos rápidos y repetidos.',
      'Escuchar y sentir el chapoteo producido por la mezcla de líquido y aire dentro del estómago.',
    ],
    normal: 'No se percibe chapoteo, salvo inmediatamente después de haber ingerido líquidos.',
    pathologic: 'Chapoteo gástrico alejado de las comidas.',
    interpretation:
      'Indica retención gástrica: el estómago no logra vaciarse, típico del síndrome pilórico en fase de atonía. Se correlaciona con vómitos de alimentos parcialmente digeridos varias horas después de comer.',
    pitfalls: ['Interpretarlo como patológico si el paciente acaba de tomar líquido.', 'Buscarlo con palpación profunda lenta: se requieren golpes cortos y rápidos con la punta de los dedos.'],
    professorNote: {
      text: 'El chapoteo gástrico a la palpación es típico del síndrome pilórico.',
      refs: [{ src: 'mc-dig-2', t: '29:19' }],
    },
    refs: [{ src: 'argente', t: '2:39:54' }],
  },
];

export function maneuverById(id: string): Maneuver | undefined {
  return MANEUVERS.find((m) => m.id === id);
}
