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
export const MANEUVERS: Maneuver[] = [];

export function maneuverById(id: string): Maneuver | undefined {
  return MANEUVERS.find((m) => m.id === id);
}
