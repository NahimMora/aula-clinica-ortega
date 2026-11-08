// Modelo de «estudio por pestañas» (piloto Aula Clínica 2.0).
// Un capítulo lo activa declarando `estudio` en su contenido. Los datos académicos siguen viviendo en
// el capítulo (theory, mcq, developments, memory, closing, escenas): acá solo se organizan y se agrega
// la fisiopatología explicativa. Los capítulos sin `estudio` usan la página clásica sin ningún cambio.
import type { Inline, SourceRef, VideoMeta } from '@/types';

export type PasoMecanismo = 'causa' | 'mecanismo' | 'consecuencia' | 'signo';

export interface CasoEstudio {
  id: string;
  /** clase = contado por el profesor (lleva referencia) · practica = armado para ejercitar. */
  origen: 'clase' | 'practica';
  titulo: string;
  texto: Inline;
  pregunta: Inline;
  opciones: { text: Inline; why: Inline }[];
  correcta: number;
  /** Razonamiento final: qué mecanismo explica el cuadro. */
  razonamiento: Inline;
  refs?: SourceRef[];
}

interface Comun {
  /** Explicación complementaria: se oculta en modo repaso. */
  extra?: boolean;
}

export type BloqueEstudio = Comun &
  (
    | { t: 'p'; text: Inline }
    | { t: 'h'; text: Inline }
    | { t: 'lista'; items: Inline[] }
    /** Secuencia causal: qué ocurre → por qué → consecuencia → lo que encontrás. */
    | { t: 'mecanismo'; titulo?: Inline; pasos: { k: PasoMecanismo; text: Inline }[] }
    /** Dos columnas; `ancho` indica qué columna se lleva más espacio. */
    | { t: 'par'; a: BloqueEstudio[]; b: BloqueEstudio[]; ancho?: 'a' | 'b' | 'igual' }
    /** Reutiliza un bloque de `chapter.theory` (ficha + tipo de bloque + n-ésimo de ese tipo). */
    | { t: 'desde'; ficha: string; tipo: string; n?: number; titulo?: Inline }
    /** Reutiliza una escena de tipo abdomen de `chapter.escenas`: figura + todos los pasos a la vista. */
    | { t: 'escena'; id: string; titulo?: Inline }
    /** Figura registrada en src/estudio/figuras.tsx. */
    | { t: 'figura'; id: string; pie?: Inline }
    | { t: 'imagen'; src: string; alt: string; pie?: Inline; credito: string; fondo?: 'claro'; marcas?: { x: number; y: number; dir?: 'izq' | 'der' }[] }
    /** Animación corta ya generada (public/media). */
    | { t: 'clip'; src: string; poster: string; titulo: Inline; duracion: string }
    /** Fragmentos reales del video de maniobras (content/maneuvers). */
    | { t: 'maniobras'; ids: string[]; titulo?: Inline }
    | { t: 'video'; video: VideoMeta; titulo: string }
    /** Frase o énfasis del profesor: discreto, con su minuto. */
    | { t: 'prof'; text: Inline; refs: SourceRef[] }
    /** Lo que agrega la ciencia o el libro cuando difiere de la simplificación docente. */
    | { t: 'precision'; text: Inline; origen: string }
    /** Regla mnemotécnica o de una línea (reutiliza textos de `chapter.memory` cuando existen). */
    | { t: 'regla'; text?: Inline; mem?: string }
    | { t: 'tabla'; head: string[]; rows: Inline[][]; titulo?: Inline }
    /** Secciones internas de acceso directo dentro de una pestaña. */
    | { t: 'secciones'; id: string; items: { id: string; label: string; bloques: BloqueEstudio[] }[] }
    /** Comprobación: choice y desarrollos del capítulo, por id. */
    | { t: 'practica'; choice?: string[]; desarrollos?: string[]; titulo?: Inline }
    | { t: 'casos'; items: CasoEstudio[] }
    | { t: 'memoria'; ids: string[] }
    | { t: 'errores' }
    | { t: 'conexiones' }
    | { t: 'pendientes' }
    | { t: 'cierre' }
    /** Enlace a otra pestaña. */
    | { t: 'ir'; tab: string; seccion?: string; text: Inline }
  );

export interface PestanaEstudio {
  id: string;
  n: string;
  label: string;
  titulo: string;
  bloques: BloqueEstudio[];
  fuentes?: SourceRef[];
}

export interface PlanEstudio {
  /** Ramas del mapa inicial con su número de secuencia y la pestaña a la que llevan. */
  mapa: { id: string; label: string; tone: 'rose' | 'lilac' | 'sky' | 'mint' | 'peach' | 'gold' | 'red'; items: string[]; tab: string; seccion?: string }[];
  pestanas: PestanaEstudio[];
  /** Enlaces profundos antiguos (?s=t-dolor, bookmarks, buscador) → pestaña y sección interna. */
  anclas: Record<string, { tab: string; seccion?: string }>;
}
