// Módulo «Parcial del lunes»: recorte del temario que Ortega confirmó en el repaso del 11/11.
// No duplica teoría: cada tema muestra diapositivas de los capítulos existentes y agrega solo lo nuevo del repaso.
import type { Block, Inline, SourceRef } from '@/types';

export type SistemaParcial = 'digestivo' | 'renal' | 'neuro' | 'soma';

/** crítico: lo exige expresamente o avisa que desaprueba · obligatorio: entra y hay que desarrollarlo · complementario: lo necesario para sostener las repreguntas. */
export type Prioridad = 'critico' | 'obligatorio' | 'complementario';

/** Diapositivas de un capítulo existente que se muestran dentro del tema (en este orden). */
export interface DiaposDe {
  cap: string;
  ids: string[];
}

export interface TemaParcial {
  id: string;
  sistema: SistemaParcial;
  titulo: string;
  prioridad: Prioridad;
  /** Por qué entra: lo que dijo o escribió Ortega (con su fuente). */
  porque: Inline;
  fuentes: SourceRef[];
  /** Qué te puede pedir, en el orden en que suele preguntarlo. */
  pide: Inline[];
  /** Teoría ya desarrollada: fisiopatología primero, después la teoría. */
  diapos: DiaposDe[];
  /** true: la fisiopatología no va en una pestaña aparte sino dentro de las diapositivas, junto a lo que explica (en el orden de `diapos`). */
  fisioJunto?: boolean;
  /** Lo que el repaso agrega y no estaba en los capítulos (criterios, valores, tablas). */
  nuevo?: { titulo: string; blocks: Block[]; refs?: SourceRef[] }[];
  /** Maniobras de la biblioteca relacionadas con el tema. */
  maniobras?: string[];
  memoria?: { gancho: string; explica: Inline }[];
  /** «Con esto tenés que quedarte». */
  quedate: Inline[];
  /** Capítulos completos donde se estudia (para el final). */
  capitulos: string[];
}

/** De dónde sale una pregunta.
 *  - repaso: la formuló o la marcó en el repaso del 11/11.
 *  - oral: la tomó en el oral del 10/11 (relato de compañeras).
 *  - clase: avisó en sus clases que la pregunta.
 *  - preguntero: figura en el preguntero de la cátedra.
 *  - simulada: armada para practicar (no es de Ortega). */
export type OrigenPregunta = 'repaso' | 'oral' | 'clase' | 'preguntero' | 'simulada';

/** Resultado de comparar con lo que ya estaba en la web.
 *  - confirmada: ya existía y el repaso la vuelve a marcar.
 *  - ampliada: ya existía, pero el repaso agrega algo nuevo (un valor, una clasificación).
 *  - nueva: aparece por primera vez en el repaso.
 *  - anterior: ya estaba (clase, oral o preguntero) y el repaso no la menciona, pero el tema entra.
 *  - simulada: práctica. */
export type EstadoPregunta = 'confirmada' | 'ampliada' | 'nueva' | 'anterior' | 'simulada';

export interface Repregunta {
  q: Inline;
  a: Inline;
}

export interface PreguntaParcial {
  id: string;
  sistema: SistemaParcial | 'integracion';
  tema: string;
  q: Inline;
  origen: OrigenPregunta[];
  estado: EstadoPregunta;
  /** Nivel 1: lo primero que se responde, solo lo que se preguntó. */
  oral: Inline;
  /** Nivel 2: el fundamento si pregunta «¿por qué?» o «¿cómo se produce?». */
  desarrollo: Block[];
  /** Nivel 3: hacia dónde puede llevarte, en orden. */
  repreguntas: Repregunta[];
  relaciones?: { text: Inline; to?: string }[];
  error?: Inline;
  fuentes: SourceRef[];
  /** Ids de citas.json u orales que esta pregunta reúne (para no duplicar). */
  une?: string[];
  /** Diapositiva donde se estudia: «capítulo:diapositiva». */
  diapo?: string;
}

export interface PuntoDoloroso {
  id: string;
  nombre: string;
  sistema: 'digestivo' | 'renal';
  vista: 'anterior' | 'posterior';
  /** Coordenadas en el esquema (viewBox 0 0 400 470). */
  x: number;
  y: number;
  /** Si es una zona y no un punto. */
  zona?: { rx: number; ry: number } | { poly: string };
  /** Cómo encontrarlo con reparos anatómicos. */
  reparo: Inline;
  organo: Inline;
  significa: Inline;
  explora: Inline;
  /** Lo que se contesta en una línea si Ortega lo señala en el maniquí. */
  respuesta: Inline;
  /** Lo dijo Ortega en clase (con su referencia). */
  prof?: { text: Inline; ref: SourceRef };
  refs: SourceRef[];
}

export interface ParCraneal {
  n: string;
  nombre: string;
  tipo: 'Sensorial' | 'Motor' | 'Mixto';
  funcion: Inline;
  real: Inline;
  aparente: Inline;
  recorrido: Inline;
  explora: Inline;
  alteraciones: Inline;
  porque: Inline;
  maniobras: string[];
  diapo?: string;
  ortega?: { text: Inline; ref: SourceRef };
}
