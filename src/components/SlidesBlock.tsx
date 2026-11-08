import { createContext, lazy, Suspense, useContext, useEffect, useState } from 'react';
import type { Deck } from '../video/kit';
import type { Inline } from '@/types';
import { Rich } from './Rich';
import { Icon } from './Icon';

/** Cargador de las escenas del capítulo actual (lo provee la página del capítulo). */
export const SlidesContext = createContext<(() => Promise<{ default: Deck }>) | undefined>(undefined);

// El reproductor de Remotion es pesado: se descarga solo cuando la estudiante abre una diapositiva.
const SlideDeck = lazy(() => import('./SlideDeck'));

export function SlidesBlock({ ids, title, caption, startOpen = false }: { ids: string[]; title: string; caption?: Inline; startOpen?: boolean }) {
  const loader = useContext(SlidesContext);
  const [deck, setDeck] = useState<Deck | null>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const open = () => {
    if (!loader || (state !== 'idle' && state !== 'error')) return;
    setState('loading');
    loader()
      .then((m) => {
        setDeck(m.default);
        setState('ready');
      })
      .catch(() => setState('error'));
  };
  useEffect(() => {
    if (startOpen) open();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startOpen]);
  if (!loader) return null; // p. ej., en la versión imprimible
  return (
    <figure className="slides">
      {state === 'ready' && deck ? (
        <Suspense fallback={<div className="slides__loading">Preparando la diapositiva…</div>}>
          <SlideDeck deck={deck} ids={ids} autoStart={!startOpen} />
        </Suspense>
      ) : (
        <button className="slides__poster" onClick={open} disabled={state === 'loading'}>
          <span className="slides__play">{state === 'loading' ? <span className="spinner" /> : <Icon name="play" size={28} />}</span>
          <span className="slides__kicker">Diapositiva animada{ids.length > 1 ? `s · ${ids.length} escenas` : ''}</span>
          <span className="slides__title">{title}</span>
          <span className="slides__hint">{state === 'error' ? 'No se pudo cargar. Tocá para reintentar.' : 'Reproducí, pausá y avanzá a tu ritmo · con narración opcional'}</span>
        </button>
      )}
      {caption && (
        <figcaption>
          <Rich text={caption} />
        </figcaption>
      )}
    </figure>
  );
}
