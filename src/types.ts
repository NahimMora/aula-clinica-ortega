import type { ComponentType } from 'react';

/** Prioridad pedagógica de un subtema.
 *  - imprescindible: el profesor indica expresamente que se evalúa o lo enfatiza.
 *  - muy-importante: concepto central para entender la materia.
 *  - complementario: amplía o aclara. */
export type Priority = 'imprescindible' | 'muy-importante' | 'complementario';

export type Tone = 'rose' | 'lilac' | 'sky' | 'mint' | 'peach';

/** Referencia a una fuente del registro `content/sources.ts`.
 *  `t` = marca de tiempo dentro de la grabación (mm:ss), `p` = página del libro. */
export interface SourceRef {
  src: string;
  t?: string;
  p?: string;
  note?: string;
}

/** Texto con marcado mínimo: **negrita**, *cursiva*, ==resaltado==, [[capitulo-id|texto]]. */
export type Inline = string;

export type CalloutKind = 'prof' | 'tip' | 'warn' | 'clinic' | 'key' | 'note' | 'bib';

export type Block =
  | { t: 'p'; text: Inline }
  | { t: 'lead'; text: Inline }
  | { t: 'h'; text: Inline }
  | { t: 'list'; items: Inline[]; ordered?: boolean }
  | { t: 'def'; term: string; text: Inline; refs?: SourceRef[] }
  | { t: 'callout'; kind: CalloutKind; title?: string; text?: Inline; items?: Inline[]; refs?: SourceRef[] }
  | { t: 'diagram'; id: string; caption?: Inline }
  | { t: 'table'; head: string[]; rows: Inline[][]; caption?: Inline }
  | { t: 'cards'; items: { title: string; text: Inline; tone?: Tone; tag?: string }[]; cols?: 2 | 3 | 4 }
  | { t: 'steps'; title?: string; items: { title: string; text: Inline }[] }
  | { t: 'chain'; title?: string; items: { label: Inline; kind: 'cause' | 'mech' | 'sign' }[] }
  | { t: 'compare'; title?: string; cols: { title: string; tone?: Tone; items: Inline[] }[] }
  | { t: 'accordion'; items: { title: string; blocks: Block[] }[] }
  | { t: 'case'; title: string; text: Inline; question?: Inline; answer?: Inline }
  | { t: 'kv'; items: { k: string; v: Inline }[] };

export interface TheorySection {
  id: string;
  title: string;
  kicker?: string;
  priority: Priority;
  summary?: Inline;
  blocks: Block[];
  refs?: SourceRef[];
}

export interface ConceptMapData {
  center: string;
  why: Inline;
  prereqs: { label: string; detail?: Inline; chapterId?: string }[];
  branches: { id: string; label: string; tone: Tone; items: string[] }[];
  outcomes: Inline[];
}

export interface MCQ {
  id: string;
  stem: Inline;
  options: { text: Inline; why: Inline }[];
  answer: number;
  difficulty: 1 | 2 | 3;
  /** El profesor enfatiza este tema para el examen (respaldado por una referencia). */
  emphasis?: boolean;
  integration?: boolean;
  topic: string;
  refs?: SourceRef[];
}

export interface Development {
  id: string;
  question: Inline;
  priority: Priority;
  emphasis?: boolean;
  answer: Block[];
  keyPoints?: Inline[];
  refs?: SourceRef[];
}

export interface MemoryItem {
  id: string;
  title: string;
  purpose: Inline;
  evaluates: Block[];
  interpret: Inline;
  mnemonic: { hook: string; explain: Inline };
  recall: { q: Inline; a: Inline };
}

export interface VideoMeta {
  src: string;
  poster?: string;
  vtt?: string;
  duration: string;
  chapters: { t: number; label: string }[];
  script: { title: string; text: string }[];
}

export interface ClosingData {
  map: { center: string; nodes: { label: string; tone: Tone; items: string[] }[] };
  essentials: Inline[];
  links: { chapterId?: string; text: Inline }[];
  pitfalls: Inline[];
  miniExam: MCQ[];
}

export interface QuickRef {
  title: string;
  head: string[];
  rows: Inline[][];
}

export interface Chapter {
  id: string;
  systemId: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  sources: SourceRef[];
  map: ConceptMapData;
  bases: { intro: Inline; sections: TheorySection[] };
  theory: TheorySection[];
  quickRef: QuickRef[];
  video?: VideoMeta;
  mcq: MCQ[];
  developments: Development[];
  memory: MemoryItem[];
  maneuvers?: { ids: string[]; note: Inline };
  closing: ClosingData;
  diagrams: Record<string, ComponentType>;
}

export interface ChapterMeta {
  id: string;
  systemId: string;
  title: string;
  short: string;
  status: 'published' | 'soon';
  blurb: string;
  sourcesLabel: string;
}

export interface SystemMeta {
  id: string;
  title: string;
  subtitle: string;
  tone: Tone;
  icon: string;
  description: string;
  pdf?: string;
  chapters: ChapterMeta[];
}

/** Maniobra de examen físico (biblioteca de maniobras). */
export interface Maneuver {
  id: string;
  system: string;
  group: string;
  name: string;
  /** Segmento del video de referencia (YouTube) en segundos. */
  video?: { youtubeId: string; start: number; end: number; label: string };
  explores: Inline;
  patientPosition: Inline;
  examinerPosition: Inline;
  technique: Inline[];
  normal: Inline;
  pathologic: Inline;
  interpretation: Inline;
  pitfalls: Inline[];
  professorNote?: { text: Inline; refs: SourceRef[] };
  refs?: SourceRef[];
}
