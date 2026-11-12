// Carga los choice del parcial de uno o varios temas: los de los capítulos (cargando cada capítulo una vez)
// y los nuevos del parcial. Cada pregunta conserva el capítulo para el progreso.
import { useEffect, useState } from 'react';
import type { MCQ } from '@/types';
import { loadChapter } from '@/lib/useChapter';
import { CHOICE_DE_CAPITULOS, CHOICE_NUEVOS } from '@content/parcial/choice';

export interface ChoiceTema {
  q: MCQ;
  tema: string;
  cap: string;
}

export async function choiceDe(temas: string[]): Promise<ChoiceTema[]> {
  const caps = [...new Set(temas.flatMap((t) => (CHOICE_DE_CAPITULOS[t] ?? []).map((x) => x.cap)))];
  const cargados = new Map(await Promise.all(caps.map(async (c) => [c, await loadChapter(c)] as const)));
  const out: ChoiceTema[] = [];
  for (const t of temas) {
    for (const { cap, ids } of CHOICE_DE_CAPITULOS[t] ?? []) {
      const ch = cargados.get(cap);
      const todas = ch ? [...ch.mcq, ...ch.closing.miniExam] : [];
      for (const id of ids) {
        const q = todas.find((x) => x.id === id);
        if (q) out.push({ q, tema: t, cap });
      }
    }
    for (const n of CHOICE_NUEVOS.filter((x) => x.tema === t)) out.push({ q: n, tema: t, cap: 'parcial' });
  }
  return out;
}

export function useChoice(temas: string[]) {
  const clave = temas.join(',');
  const [res, setRes] = useState<ChoiceTema[] | null>(null);
  useEffect(() => {
    let vivo = true;
    setRes(null);
    choiceDe(clave.split(',').filter(Boolean)).then((r) => vivo && setRes(r));
    return () => {
      vivo = false;
    };
  }, [clave]);
  return res;
}
