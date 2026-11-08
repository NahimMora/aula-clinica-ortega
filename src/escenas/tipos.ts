// Escenas de Teoría: un dibujo + pasos con narración. Las mismas escenas se recorren en la web
// (paso a paso) y se renderizan en el video, así el texto y el dibujo nunca se contradicen.
// Modelo tomado de farmaco-flor (src/vis): el dibujo es función pura de (escena, paso, t).

import type { NefronaVista, Organo, Punto, Region, UrinarioVista, ViaBiliar } from '../visual/tipos';

export type Tono = 'rose' | 'lilac' | 'sky' | 'mint' | 'peach' | 'gold' | 'red';

export interface PasoBase {
  /** Narración del paso: lo que se lee debajo del dibujo y lo que dice la voz en el video. */
  di: string;
  /** Pronunciación para la voz cuando difiere del texto (p. ej., «Málori Uáis»). */
  voz?: string;
  /** Términos clave que quedan anotados («Retené esto»). */
  retener?: string[];
}

/** Cuadro comparativo que se arma fila por fila (p. ej., hematemesis vs hemoptisis). */
export interface EscenaCuadro {
  tipo: 'cuadro';
  id: string;
  titulo: string;
  cols: [{ t: string; tono: Tono }, { t: string; tono: Tono }];
  filas: { k: string; a: string; b: string }[];
  /** hasta: última fila visible (-1 = solo los encabezados). luz: fila resaltada. */
  pasos: (PasoBase & { hasta: number; luz?: number })[];
}

/** Lista vertical de tarjetas que aparecen de a una (definiciones, horarios, criterios). */
export interface EscenaLista {
  tipo: 'lista';
  id: string;
  titulo: string;
  items: { t: string; d: string; tono: Tono }[];
  pasos: (PasoBase & { hasta: number; luz?: number[] })[];
}

/** Tramos del tubo digestivo. */
export type Tramo = 'esofago' | 'estomago' | 'duodeno' | 'delgado' | 'colon';

/** Tubo digestivo esquemático: se iluminan tramos y aparece una «muestra» del vómito. */
export interface EscenaTubo {
  tipo: 'tubo';
  id: string;
  titulo: string;
  pasos: (PasoBase & {
    luz: Tramo[];
    tono: Tono;
    muestra: { t: string; d: string; color: string; color2?: string };
    obstruccion?: Tramo;
  })[];
}

export interface NodoFlujo {
  id: string;
  x: number;
  y: number;
  t: string;
  w?: number;
  tono?: Tono;
}
export interface LazoFlujo {
  a: string;
  b: string;
  t?: string;
}

/** Diagrama de flujo que se va armando: causa → mecanismo → consecuencia, o algoritmos. */
export interface EscenaFlujo {
  tipo: 'flujo';
  id: string;
  titulo: string;
  nodos: NodoFlujo[];
  lazos: LazoFlujo[];
  pasos: (PasoBase & { ver: string[]; luz?: string[] })[];
}

/** Ilustraciones del esófago y del paciente. */
export type Figura =
  | 'pared' // corte de la pared esofágica normal
  | 'mw' // desgarro de la mucosa (Mallory-Weiss)
  | 'boer' // rotura de todo el espesor (Boerhaave)
  | 'alta' // paciente: se traba en la garganta
  | 'baja' // paciente: se atasca detrás del esternón
  | 'muro' // estenosis: pasa el líquido, no el sólido
  | 'motor' // sin peristaltismo: no pasa nada
  | 'acalasia' // esófago dilatado con nivel y EEI cerrado
  | 'pico' // esofagograma: pico de pájaro
  | 'manzana'; // esofagograma: manzana mordida

/** Uno a tres paneles ilustrados, con una franja opcional (p. ej., una tríada) abajo. */
export interface EscenaPaneles {
  tipo: 'paneles';
  id: string;
  titulo: string;
  pasos: (PasoBase & {
    paneles: { f: Figura; t: string; d?: string; tono?: Tono }[];
    franja?: { items: string[]; hasta: number; tono: Tono; rotulo?: string };
  })[];
}

/** Nota grande al costado de una figura anatómica. */
export interface NotaFig {
  t: string;
  d?: string;
}

/** Abdomen con sus 9 regiones: se iluminan regiones, puntos o un recorrido (dolor que migra). */
export interface EscenaAbdomen {
  tipo: 'abdomen';
  id: string;
  titulo: string;
  pasos: (PasoBase & { tono: Tono; regiones?: Region[]; puntos?: Punto[]; ruta?: Region[]; nota: NotaFig })[];
}

/** Aparato digestivo: se iluminan órganos y se marca la lesión. */
export interface EscenaOrganos {
  tipo: 'organos';
  id: string;
  titulo: string;
  treitz?: boolean;
  pasos: (PasoBase & { tono: Tono; organos: Organo[]; marca?: Organo; nota: NotaFig })[];
}

/** Vía biliar: dónde queda el cálculo o el tumor y qué se dilata. */
export interface EscenaBiliar {
  tipo: 'biliar';
  id: string;
  titulo: string;
  pasos: (PasoBase & { tono: Tono; luz: ViaBiliar[]; calculo?: ViaBiliar; tumor?: ViaBiliar; dilata?: ViaBiliar[]; nota: NotaFig })[];
}

/** Aparato urinario: cálculo, hidronefrosis, globo vesical, tres vasos, irradiación del cólico. */
export interface EscenaUrinario {
  tipo: 'urinario';
  id: string;
  titulo: string;
  pasos: (PasoBase & UrinarioVista & { tono: Tono; nota: NotaFig })[];
}

/** Nefrona: qué parte se lesiona y qué se pierde por la orina. */
export interface EscenaNefrona {
  tipo: 'nefrona';
  id: string;
  titulo: string;
  pasos: (PasoBase & NefronaVista & { tono: Tono; nota: NotaFig })[];
}

export type Escena = EscenaCuadro | EscenaLista | EscenaTubo | EscenaFlujo | EscenaPaneles | EscenaAbdomen | EscenaOrganos | EscenaBiliar | EscenaUrinario | EscenaNefrona;
export type PasoCualquiera = Escena['pasos'][number];
