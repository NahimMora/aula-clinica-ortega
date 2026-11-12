import type { Inline } from '@/types';
import type { SistemaParcial } from './tipos';

/**
 * Apartado general «Maniobras y puntos dolorosos» del parcial. Solo referencia maniobras de la biblioteca
 * (content/maneuvers) por id: el contenido de cada maniobra no se duplica.
 */
export interface GrupoManiobras {
  titulo: string;
  nota?: Inline;
  ids: string[];
  /** Tema del parcial donde esas maniobras se usan. */
  tema?: string;
}

export const MANIOBRAS_PARCIAL: Record<SistemaParcial, { intro: Inline; puntos?: 'digestivo' | 'renal'; grupos: GrupoManiobras[] }> = {
  digestivo: {
    intro: 'En el oral del 10/11 pidió maniobras de hígado, bazo y riñón **por su nombre**, y en el repaso la consigna del maniquí: «¿qué punto doloroso es este?».',
    puntos: 'digestivo',
    grupos: [
      { titulo: 'Irritación peritoneal y puntos dolorosos', nota: 'Blumberg (localizado) y Gueneau de Mussy (generalizado) sirven para **cualquier** abdomen agudo inflamatorio.', ids: ['puntos-dolorosos-abdomen', 'descompresion-blumberg', 'palpacion-superficial-tension'], tema: 'abdomen-agudo' },
      { titulo: 'Hígado', nota: 'Monomanual simple y en cuchara; bimanuales de **Chauffard**, **Güemes**, **Mathieu** y **Gilbert**; hepatometría 9–12 cm.', ids: ['higado-monomanual-cuchara', 'higado-bimanual', 'hepatometria'], tema: 'cirrosis' },
      { titulo: 'Bazo', nota: 'A la derecha del paciente: simple, bimanual, Galambos. A la izquierda: cuchara, **Naegeli** en posición de **Schuster**, Merlo.', ids: ['bazo-decubito-dorsal', 'bazo-schuster', 'abd-percusion-traube'], tema: 'cirrosis' },
      { titulo: 'Vesícula', ids: ['vesicula-murphy'], tema: 'ictericia' },
      { titulo: 'Ascitis', ids: ['ascitis-maniobras'], tema: 'cirrosis' },
      { titulo: 'Inspección y auscultación', ids: ['abd-inspeccion-estatica-dinamica', 'abd-auscultacion-rha'], tema: 'abdomen-agudo' },
      { titulo: 'Estómago, boca y región anorrectal', ids: ['bazuqueo-gastrico', 'boca-orofaringe', 'ganglios-supraclaviculares', 'tacto-rectal'] },
    ],
  },
  renal: {
    intro: 'En el oral del 10/11: «vos, cualquier maniobra de riñón». Puntos: ureterales superior y medio; renales posteriores costovertebral y costomuscular.',
    puntos: 'renal',
    grupos: [
      { titulo: 'Palpación renal', nota: '**Guyon** (peloteo), **Montenegro**, **Israel** y **Glenard**: todas en inspiración profunda.', ids: ['rinon-guyon', 'rinon-montenegro', 'rinon-israel', 'rinon-glenard'], tema: 'ef-renal' },
      { titulo: 'Percusión y puntos renoureterales', ids: ['punopercusion-lumbar', 'puntos-renoureterales'], tema: 'ef-renal' },
    ],
  },
  neuro: {
    intro: '«El examen físico, todo.» Pares craneales (nombre, función, origen y exploración), motilidad según su pizarra, reflejos, sensibilidad, coordinación y signos meníngeos.',
    grupos: [
      { titulo: 'Pares craneales', ids: ['par-olfatorio', 'campo-visual-confrontacion', 'fondo-de-ojo', 'motilidad-ocular', 'reflejos-pupilares', 'trigemino-sensibilidad', 'reflejo-corneano', 'facial-mimica', 'weber-rinne', 'glosofaringeo-vago', 'espinal', 'hipogloso'], tema: 'pares' },
      { titulo: 'Motilidad: tono, trofismo y fuerza', nota: 'Fuerza: maniobras de **oposición** y deficitarias de **Barré** y **Mingazzini**. Tono: navaja (piramidal) y rueda dentada (extrapiramidal).', ids: ['trofismo-tono', 'fuerza-mingazzini'], tema: 'piramidal' },
      { titulo: 'Reflejos y movimientos automáticos medulares', ids: ['reflejos-osteotendinosos', 'reflejo-plantar-babinski', 'clonus'], tema: 'piramidal' },
      { titulo: 'Coordinación (síndrome cerebeloso)', ids: ['indice-nariz', 'talon-rodilla', 'romberg'], tema: 'cerebeloso' },
      { titulo: 'Sensibilidad', ids: ['sensibilidad-superficial', 'sensibilidad-profunda'], tema: 'funciones-superiores' },
      { titulo: 'Signos meníngeos', ids: ['rigidez-nuca', 'kernig-brudzinski'], tema: 'meningeo' },
    ],
  },
  soma: {
    intro: '«SOMA es examen físico: son maniobras.» Columna, miembro superior y miembro inferior, como en la pizarra; lo encerrado en círculo es lo que avisó que pregunta.',
    grupos: [
      { titulo: 'Columna cervical', ids: ['spurling', 'valsalva-cervical', 'naffziger', 'adson'], tema: 'soma-columna' },
      { titulo: 'Columna dorsal', ids: ['adams'], tema: 'soma-columna' },
      { titulo: 'Columna lumbar', nota: 'Orden de la pizarra: ① Goldthwait ② Lasègue ③ Bragard (Lasègue reforzado) ④ Lasègue invertido · Neri y Neri reforzado · Schober.', ids: ['goldthwait', 'lasegue', 'bragard', 'lasegue-invertido', 'neri', 'schober'], tema: 'soma-columna' },
      { titulo: 'Sacroilíaca', ids: ['volkmann', 'erichsen', 'patrick-fabere', 'gaenslen'], tema: 'soma-columna' },
      { titulo: 'Hombro', ids: ['caida-brazo'], tema: 'soma-mmss' },
      { titulo: 'Codo', nota: 'Encerrado en la pizarra: **tenista** y **golfista**.', ids: ['codo-tenista', 'codo-golfista'], tema: 'soma-mmss' },
      { titulo: 'Muñeca y mano', nota: 'Encerrados: **Tinel**, **túnel carpiano** y **Phalen** (nervio mediano).', ids: ['tinel', 'tunel-carpiano-percusion', 'phalen'], tema: 'soma-mmss' },
      { titulo: 'Cadera', ids: ['patrick-fabere', 'thomas'], tema: 'soma-mmii' },
      { titulo: 'Rodilla', nota: 'Encerrados: **cajón** (cruzados), **bostezo** (laterales) y **Apley** (meniscos).', ids: ['cajon-rodilla', 'bostezo-rodilla', 'apley', 'mcmurray', 'choque-rotuliano'], tema: 'soma-mmii' },
      { titulo: 'Tobillo', ids: ['thompson'], tema: 'soma-mmii' },
    ],
  },
};
