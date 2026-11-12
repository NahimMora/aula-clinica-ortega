// Autoevaluación del banco del parcial: «La sé · Dudé · Tengo que repasarla».
// Vive en localStorage (por navegador) y se comparte entre la página de preguntas y los temas.
import { useSyncExternalStore } from 'react';

export type Marca = 'se' | 'dude' | 'repasar';
const KEY = 'aula-clinica-ortega:parcial:marcas';

let estado: Record<string, Marca> = leer();
const oyentes = new Set<() => void>();

function leer(): Record<string, Marca> {
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? '{}') as Record<string, Marca>;
  } catch {
    return {};
  }
}

export function marcar(id: string, m: Marca | null) {
  const nuevo = { ...estado };
  if (m && nuevo[id] !== m) nuevo[id] = m;
  else delete nuevo[id];
  estado = nuevo;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(estado));
  } catch {
    /* sin persistencia: la marca dura mientras la página esté abierta */
  }
  oyentes.forEach((f) => f());
}

export function useMarcas(): Record<string, Marca> {
  return useSyncExternalStore(
    (f) => {
      oyentes.add(f);
      return () => oyentes.delete(f);
    },
    () => estado,
  );
}

export const MARCAS: { id: Marca; label: string; tono: string }[] = [
  { id: 'se', label: 'La sé', tono: 'ok' },
  { id: 'dude', label: 'Dudé', tono: 'gold' },
  { id: 'repasar', label: 'Tengo que repasarla', tono: 'bad' },
];
