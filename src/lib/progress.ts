import { useSyncExternalStore } from 'react';

/** Estado de estudio persistido en el navegador (sin backend). */
export interface DevRecord {
  status: 'known' | 'unknown';
  box: number; // caja de Leitner 0..5
  due: number; // epoch ms del próximo repaso
  history: { s: 'known' | 'unknown'; at: number }[];
}

export interface McqAttempt {
  choice: number;
  correct: boolean;
  at: number;
}

export interface ProgressState {
  version: 1;
  chapters: Record<string, { visited: string[]; completed?: boolean; updatedAt: number }>;
  mcq: Record<string, { chapterId: string; attempts: McqAttempt[] }>;
  devs: Record<string, DevRecord & { chapterId: string }>;
  memory: Record<string, { chapterId: string; status: 'known' | 'unknown'; at: number }>;
  bookmarks: { id: string; chapterId: string; sectionId: string; label: string; at: number }[];
  last: { path: string; label: string; at: number } | null;
  exams: { at: number; total: number; correct: number; seconds: number; chapterIds: string[] }[];
}

const KEY = 'aula-clinica-ortega:v1';
const DAY = 86_400_000;
/** Intervalos de repaso espaciado (días) por caja de Leitner. */
export const SRS_INTERVALS = [0, 1, 3, 7, 16, 35];

function empty(): ProgressState {
  return { version: 1, chapters: {}, mcq: {}, devs: {}, memory: {}, bookmarks: [], last: null, exams: [] };
}

function sanitize(raw: unknown): ProgressState {
  const base = empty();
  if (!raw || typeof raw !== 'object') return base;
  const r = raw as Partial<ProgressState>;
  return {
    version: 1,
    chapters: typeof r.chapters === 'object' && r.chapters ? r.chapters : {},
    mcq: typeof r.mcq === 'object' && r.mcq ? r.mcq : {},
    devs: typeof r.devs === 'object' && r.devs ? r.devs : {},
    memory: typeof r.memory === 'object' && r.memory ? r.memory : {},
    bookmarks: Array.isArray(r.bookmarks) ? r.bookmarks : [],
    last: r.last && typeof r.last === 'object' ? r.last : null,
    exams: Array.isArray(r.exams) ? r.exams : [],
  };
}

function load(): ProgressState {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return sanitize(JSON.parse(raw));
  } catch {
    /* almacenamiento no disponible: se trabaja en memoria */
  }
  return empty();
}

let state: ProgressState = typeof window === 'undefined' ? empty() : load();
const listeners = new Set<() => void>();

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* sin persistencia (modo privado o cuota llena) */
  }
}

function update(mutator: (draft: ProgressState) => void) {
  const draft: ProgressState = JSON.parse(JSON.stringify(state));
  mutator(draft);
  state = draft;
  persist();
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribe, () => state, () => state);
}

export function getProgress(): ProgressState {
  return state;
}

/* ───────── Acciones ───────── */

export function markVisited(chapterId: string, sectionId: string) {
  const cur = state.chapters[chapterId];
  if (cur?.visited.includes(sectionId)) return;
  update((d) => {
    const c = d.chapters[chapterId] ?? { visited: [], updatedAt: 0 };
    c.visited = [...c.visited, sectionId];
    c.updatedAt = Date.now();
    d.chapters[chapterId] = c;
  });
}

export function setCompleted(chapterId: string, completed: boolean) {
  update((d) => {
    const c = d.chapters[chapterId] ?? { visited: [], updatedAt: 0 };
    c.completed = completed;
    c.updatedAt = Date.now();
    d.chapters[chapterId] = c;
  });
}

export function setLast(path: string, label: string) {
  if (state.last?.path === path) return;
  update((d) => {
    d.last = { path, label, at: Date.now() };
  });
}

export function recordMcq(id: string, chapterId: string, choice: number, correct: boolean) {
  update((d) => {
    const rec = d.mcq[id] ?? { chapterId, attempts: [] };
    rec.attempts = [...rec.attempts, { choice, correct, at: Date.now() }].slice(-30);
    d.mcq[id] = rec;
  });
}

export function setDev(id: string, chapterId: string, known: boolean) {
  update((d) => {
    const prev = d.devs[id];
    const now = Date.now();
    const status: DevRecord['status'] = known ? 'known' : 'unknown';
    const box = known ? Math.min((prev?.status === 'known' ? prev.box : 0) + 1, SRS_INTERVALS.length - 1) : 0;
    d.devs[id] = {
      chapterId,
      status,
      box,
      due: now + SRS_INTERVALS[box] * DAY,
      history: [...(prev?.history ?? []), { s: status, at: now }].slice(-30),
    };
  });
}

export function setMemory(id: string, chapterId: string, known: boolean) {
  update((d) => {
    d.memory[id] = { chapterId, status: known ? 'known' : 'unknown', at: Date.now() };
  });
}

export function toggleBookmark(b: { chapterId: string; sectionId: string; label: string }) {
  const id = `${b.chapterId}#${b.sectionId}`;
  update((d) => {
    if (d.bookmarks.some((x) => x.id === id)) d.bookmarks = d.bookmarks.filter((x) => x.id !== id);
    else d.bookmarks = [{ id, ...b, at: Date.now() }, ...d.bookmarks];
  });
}

export function recordExam(e: ProgressState['exams'][number]) {
  update((d) => {
    d.exams = [e, ...d.exams].slice(0, 50);
  });
}

export function resetChapter(chapterId: string) {
  update((d) => {
    delete d.chapters[chapterId];
    for (const [k, v] of Object.entries(d.mcq)) if (v.chapterId === chapterId) delete d.mcq[k];
    for (const [k, v] of Object.entries(d.devs)) if (v.chapterId === chapterId) delete d.devs[k];
    for (const [k, v] of Object.entries(d.memory)) if (v.chapterId === chapterId) delete d.memory[k];
  });
}

export function exportProgress(): string {
  return JSON.stringify({ app: 'aula-clinica-ortega', exportedAt: new Date().toISOString(), data: state }, null, 2);
}

export function importProgress(text: string): { ok: true } | { ok: false; error: string } {
  try {
    const parsed = JSON.parse(text);
    const data = parsed?.app === 'aula-clinica-ortega' ? parsed.data : parsed;
    if (!data || typeof data !== 'object' || data.version !== 1) {
      return { ok: false, error: 'El archivo no parece un progreso exportado desde Aula Clínica.' };
    }
    update((d) => Object.assign(d, sanitize(data)));
    return { ok: true };
  } catch {
    return { ok: false, error: 'No se pudo leer el archivo JSON.' };
  }
}

export function resetAll() {
  update((d) => Object.assign(d, empty()));
}

/* ───────── Consultas derivadas ───────── */

export function lastAttempt(s: ProgressState, mcqId: string): McqAttempt | undefined {
  const a = s.mcq[mcqId]?.attempts;
  return a && a.length ? a[a.length - 1] : undefined;
}

/** Un desarrollo está pendiente si nunca se marcó, se marcó "No lo sabía" o venció su repaso. */
export function devPending(s: ProgressState, devId: string, now = Date.now()): boolean {
  const r = s.devs[devId];
  return !r || r.status === 'unknown' || r.due <= now;
}

export function devDueLabel(r: DevRecord | undefined, now = Date.now()): string {
  if (!r) return 'Sin marcar';
  if (r.status === 'unknown') return 'Pendiente de repaso';
  const days = Math.ceil((r.due - now) / DAY);
  if (days <= 0) return 'Repaso programado: hoy';
  return `Dominado · próximo repaso en ${days} día${days === 1 ? '' : 's'}`;
}
