// Clase visual de un capítulo: mapa conceptual, mazos de diapositivas y video comparten estos datos.
// La misma <Diapositiva> se dibuja en la web (a tu ritmo) y en Remotion (con la voz de Tomás).
import type { Inline, SourceRef, Tone, VideoMeta } from '@/types';

/** Secuencia pedagógica de la fisiopatología. */
export type Etapa = 'normal' | 'alteracion' | 'mecanismo' | 'signo';

export interface NodoMapa {
  id: string;
  label: string;
  tone?: Tone;
  /** Número pequeño dentro de una clasificación. */
  n?: string;
  /** Lo pide el profesor o el preguntero. */
  examen?: boolean;
  nota?: Inline;
  hijos?: NodoMapa[];
}

/** Mapa inicial: conocimiento médico jerarquizado, no un índice de la página. */
export interface MapaConceptual {
  raices: NodoMapa[];
  /** Relaciones transversales que el árbol no muestra. */
  nexos?: Inline[];
}

export interface AvisoExamen {
  /** ortega: él lo dice como pregunta de examen · preguntero: figura en el preguntero de la cátedra. */
  origen: 'ortega' | 'preguntero';
  texto: Inline;
  cita?: string;
  ref?: SourceRef;
}

interface BaseBloque {
  /** Paso de la narración en el que aparece (por defecto, el primero). */
  en?: number;
  /** Detalle para estudiar: se muestra en la web pero no en el video. */
  soloWeb?: boolean;
}

export type NodoArbol = { t: Inline; d?: Inline; tono?: Tone; examen?: boolean; hijos?: NodoArbol[] };

export type IconoClase = 'dolor' | 'vomito' | 'fiebre' | 'reloj' | 'bisturi' | 'gota' | 'aire' | 'fuego' | 'nudo' | 'vaso' | 'corazon' | 'cerebro' | 'rinon' | 'piel' | 'eco' | 'rx' | 'tac' | 'lab' | 'pregunta' | 'mano' | 'oreja' | 'ojo';

export type BloqueDiapo = BaseBloque &
  (
    | { t: 'texto'; text: Inline }
    | { t: 'clave'; text: Inline; tono?: Tone }
    | { t: 'lista'; items: Inline[] }
    | { t: 'def'; term: string; text: Inline; tono?: Tone }
    | { t: 'cuadro'; head: string[]; filas: Inline[][]; compacto?: boolean }
    | { t: 'comparar'; cols: { titulo: string; tono: Tone; items: Inline[] }[] }
    | { t: 'cadena'; pasos: { k: Etapa; text: Inline }[] }
    | { t: 'secuencia'; items: { ico: IconoClase; t: string; d?: Inline; tono?: Tone }[]; flechas?: boolean }
    | { t: 'arbol'; raiz: NodoArbol }
    | { t: 'foto'; src: string; alt: string; pie?: Inline; credito: string; claro?: boolean }
    | { t: 'fotos'; items: { src: string; alt: string; pie?: Inline; credito: string }[] }
    | { t: 'prof'; text: Inline; ref?: SourceRef }
  );

/** Ilustración reutilizable (src/clase/figuras). */
export type FiguraId =
  | 'via-dolor'
  | 'fibras'
  | 'pared'
  | 'viscera'
  | 'entrada'
  | 'convergencia'
  | 'abdomen'
  | 'arco-reflejo'
  | 'intestino'
  | 'cavidad'
  | 'hipovolemia'
  | 'mesenterica'
  | 'apendice'
  | 'colecistitis'
  | 'ecg'
  | 'rha'
  | 'perfil-liquido'
  // Digestivo (figuras-dig.tsx)
  | 'deglucion'
  | 'esofago'
  | 'centros-vomito'
  | 'acto-vomito'
  | 'tracto'
  | 'hematemesis'
  | 'estomago'
  | 'desgarro'
  | 'perdidas'
  | 'aspiracion'
  | 'horario'
  | 'mucosa'
  | 'defecacion'
  | 'bristol'
  | 'bilirrubina'
  | 'biliar'
  | 'ascitis'
  | 'colateral'
  | 'inspiracion'
  | 'reflujo'
  | 'barrera'
  | 'absorcion'
  | 'peritoneo'
  | 'hipovolemia'
  | 'portal'
  | 'amonio'
  | 'pancreatitis'
  | 'urinario'
  | 'nefrona'
  | 'glomerulo'
  // Neurología (figuras-neu.tsx)
  | 'encefalo'
  | 'cabeza'
  | 'nucleos'
  | 'motora'
  | 'temblor'
  | 'crisis'
  | 'sueno';

export type FiguraSpec = { f: FiguraId } & Record<string, unknown>;

export interface Diapositiva {
  id: string;
  sec: string;
  titulo: string;
  fig?: FiguraSpec;
  /** Proporción de la ilustración: chica 36 %, media 46 %, grande 58 %. */
  anchoFig?: 'chica' | 'media' | 'grande';
  bloques: BloqueDiapo[];
  examen?: AvisoExamen;
  /** «Para entenderlo mejor», debajo de la diapositiva. */
  aclara?: { text: Inline; origen?: string };
  /** Etapas de Normal → Alteración → Mecanismo → Síntoma que cubre (solo fisiopatología). */
  etapas?: Etapa[];
  /** Narración de Tomás por pasos: cada elemento revela lo siguiente de la diapositiva. */
  voz: string[];
  /** Solo para estudiar: no entra en el video. */
  soloDiapo?: boolean;
  /** Poco contenido: el texto se agranda para ocupar la diapositiva sin dejar vacíos. */
  amplio?: boolean;
  refs: SourceRef[];
}

export interface Mazo {
  id: string;
  secciones: { id: string; label: string }[];
  diapos: Diapositiva[];
}

export interface CasoClase {
  id: string;
  /** clase = lo contó el profesor (lleva referencia) · practica = armado para ejercitar. */
  origen: 'clase' | 'practica';
  titulo: string;
  texto: Inline;
  pregunta: Inline;
  opciones: { text: Inline; why: Inline }[];
  correcta: number;
  razonamiento: Inline;
  refs?: SourceRef[];
}

export interface PlanClase {
  mapa: MapaConceptual;
  fisio: Mazo;
  teoria: Mazo;
  /** Clase completa narrada: un único video por capítulo. */
  video?: VideoMeta;
  /** Video breve de repaso: nunca reemplaza a la clase completa. */
  repaso?: VideoMeta;
  casos: CasoClase[];
  /** Enlaces profundos previos (?s=t-dolor, marcadores, buscador) → pestaña y sección. */
  anclas: Record<string, { tab: string; seccion?: string }>;
  /** Desarrollos que entran en el simulacro integrador. */
  simulacroDesarrollos: string[];
}
