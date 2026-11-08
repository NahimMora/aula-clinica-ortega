import { useEffect, useState } from 'react';
import type { Chapter } from '@/types';
import { chapterLoader, findChapter, isAvailable, publishedChapters } from '@content/curriculum';

const cache = new Map<string, Chapter>();

export async function loadChapter(id: string): Promise<Chapter | null> {
  if (cache.has(id)) return cache.get(id)!;
  const meta = findChapter(id);
  const loader = chapterLoader(id);
  if (!meta || !loader || !isAvailable(meta)) return null;
  const mod = await loader();
  cache.set(id, mod.default);
  return mod.default;
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
