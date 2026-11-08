import { useEffect, useState } from 'react';
import type { Chapter, MCQ } from '@/types';
import { chapterLoader, findChapter, isAvailable, publishedChapters } from '@content/curriculum';

const cache = new Map<string, Chapter>();

/** Hash FNV-1a: semilla estable por pregunta. */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/**
 * Ordena las opciones de cada choice con una permutación fija por pregunta, para que la correcta
 * no quede siempre en la misma letra. Es determinística: la misma pregunta se ve igual en la web,
 * en el examen y en el PDF, y el historial guardado sigue siendo válido.
 */
export function mezclarOpciones(q: MCQ): MCQ {
  let seed = hash(q.id) || 1;
  const rnd = () => {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    return (seed >>> 0) / 4294967296;
  };
  const idx = q.options.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return { ...q, options: idx.map((i) => q.options[i]), answer: idx.indexOf(q.answer) };
}

export async function loadChapter(id: string): Promise<Chapter | null> {
  if (cache.has(id)) return cache.get(id)!;
  const meta = findChapter(id);
  const loader = chapterLoader(id);
  if (!meta || !loader || !isAvailable(meta)) return null;
  const mod = await loader();
  const c: Chapter = { ...mod.default, mcq: mod.default.mcq.map(mezclarOpciones) };
  cache.set(id, c);
  return c;
}

export async function loadAllPublished(): Promise<Chapter[]> {
  const list = await Promise.all(publishedChapters().map((c) => loadChapter(c.id)));
  return list.filter((c): c is Chapter => Boolean(c));
}

type State = { status: 'loading' } | { status: 'ready'; chapter: Chapter } | { status: 'missing' } | { status: 'error'; error: string };

export function useChapter(id: string | undefined): State {
  const [state, setState] = useState<State>(() => (id && cache.has(id) ? { status: 'ready', chapter: cache.get(id)! } : { status: 'loading' }));
  useEffect(() => {
    let alive = true;
    if (!id) {
      setState({ status: 'missing' });
      return;
    }
    if (cache.has(id)) {
      setState({ status: 'ready', chapter: cache.get(id)! });
      return;
    }
    setState({ status: 'loading' });
    loadChapter(id)
      .then((c) => alive && setState(c ? { status: 'ready', chapter: c } : { status: 'missing' }))
      .catch((e) => alive && setState({ status: 'error', error: String(e) }));
    return () => {
      alive = false;
    };
  }, [id]);
  return state;
}

export function useAllPublished(enabled = true): Chapter[] | null {
  const [list, setList] = useState<Chapter[] | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    loadAllPublished().then((l) => alive && setList(l));
    return () => {
      alive = false;
    };
  }, [enabled]);
  return list;
}
