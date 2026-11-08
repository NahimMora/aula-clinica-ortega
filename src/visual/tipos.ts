// Bloques visuales genéricos: cada capítulo describe QUÉ mostrar con datos y estos componentes lo dibujan
// (SVG propio, animado y con colores por tono). Pensados para estudiar mirando, no leyendo párrafos.
import type { Inline, SourceRef } from '@/types';

export type VTone = 'rose' | 'lilac' | 'sky' | 'mint' | 'peach' | 'gold' | 'red';

/** Las 9 regiones del abdomen (vista de frente: la derecha del paciente queda a la izquierda del dibujo). */
export type Region = 'hd' | 'epi' | 'hi' | 'fd' | 'umb' | 'fi' | 'fid' | 'hipo' | 'fii';

/** Puntos y zonas con nombre propio. */
export type Punto =
  | 'mcburney' // FID, unión tercio externo-medio ombligo–EIAS
  | 'murphy' // borde costal derecho, línea medioclavicular
  | 'cullen' // periumbilical
  | 'greyturner' // flancos
  | 'ombligo'
  | 'epigastrio'
  | 'esplenico' // hipocondrio izquierdo
  | 'hipogastrio'
  | 'fii'
  | 'hd'
  | 'renal-d' // ángulo costovertebral (proyección anterior)
  | 'renal-i';

/** Órganos del dibujo del aparato digestivo. */
export type Organo =
  | 'esofago'
  | 'estomago'
  | 'piloro'
  | 'duodeno'
  | 'yeyuno'
  | 'ileon'
  | 'apendice'
  | 'colon'
  | 'recto'
  | 'higado'
  | 'vesicula'
  | 'pancreas'
  | 'bazo';

/** Partes del dibujo de la vía biliar. */
export type ViaBiliar = 'higado' | 'hepatico' | 'vesicula' | 'cistico' | 'coledoco' | 'ampolla' | 'wirsung' | 'pancreas' | 'duodeno';

export interface FlowNode {
  label: string;
  note?: string;
  tone?: VTone | 'ink';
  edge?: string;
  star?: boolean;
  children?: FlowNode[];
}

export type VisualBlock =
  /** Abdomen interactivo: cada opción ilumina regiones, puntos o un recorrido (dolor migratorio). */
  | {
      t: 'abdomen';
      title?: string;
      items: { id: string; t: string; d: Inline; tone: VTone; regiones?: Region[]; puntos?: Punto[]; ruta?: Region[] }[];
      caption?: Inline;
    }
  /** Aparato digestivo interactivo: ilumina órganos y marca dónde está la lesión. */
  | {
      t: 'organos';
      title?: string;
      items: { id: string; t: string; d: Inline; tone: VTone; organos: Organo[]; marca?: Organo }[];
      /** Dibuja el ángulo de Treitz (límite entre hemorragia alta y baja). */
      treitz?: boolean;
      caption?: Inline;
    }
  /** Vía biliar interactiva: dónde está el cálculo (o el tumor) y qué se dilata o inflama. */
  | {
      t: 'biliar';
      title?: string;
      items: { id: string; t: string; d: Inline; tone: VTone; luz: ViaBiliar[]; calculo?: ViaBiliar; tumor?: ViaBiliar; dilata?: ViaBiliar[] }[];
      caption?: Inline;
    }
  /** Tríada / péntada: polígono que se dibuja; `plus` agrega vértices (p. ej., Charcot → Reynolds). */
  | { t: 'triad'; title: string; items: string[]; plus?: string[]; plusLabel?: string; center: string; tone: VTone; note?: Inline; refs?: SourceRef[] }
  /** Escala ordenada (Bristol, clases de hemorragia, Forrest, West Haven…). */
  | { t: 'scale'; title?: string; items: { k: string; t: string; d?: Inline; tone?: VTone; icon?: string }[]; ends?: [string, string]; caption?: Inline }
  /** Calculadora de puntaje (Child-Pugh, Ranson…): se eligen opciones y se ve la clase. */
  | {
      t: 'calc';
      title: string;
      criterios: { k: string; ops: { t: string; pts: number }[] }[];
      bandas: { min: number; max: number; t: string; d?: Inline; tone: VTone }[];
      note?: Inline;
    }
  /** Mnemotecnia: cada letra se despliega en su palabra. */
  | { t: 'mnemo'; word: string; items: { l: string; t: Inline }[]; note?: Inline; tone?: VTone; refs?: SourceRef[] }
  /** Línea de tiempo o secuencia (cronología del dolor, horario del vómito…). */
  | { t: 'timeline'; title?: string; items: { k: string; t: string; d?: Inline; tone?: VTone }[]; caption?: Inline }
  /** Algoritmo en árbol. */
  | { t: 'flow'; root: FlowNode; caption?: Inline }
  /** Cuadro comparativo con «tapar respuestas» para autoevaluarse. */
  | { t: 'cuadro'; title?: string; cols: { t: string; tone: VTone }[]; rows: { k: string; v: Inline[] }[]; caption?: Inline; refs?: SourceRef[] };
