import '@fontsource-variable/fraunces';
import '@fontsource-variable/inter';
import { useEffect, useState } from 'react';
import { Composition, Series, continueRender, delayRender, staticFile } from 'remotion';
import { DeckScene } from '../../src/video/DeckScene';
import type { Deck } from '../../src/video/kit';
import dig01 from '../../content/chapters/dig-01/slides';

const DECKS: Deck[] = [dig01];

/** Espera a que carguen las fuentes antes de renderizar cada frame. */
function useFonts() {
  const [handle] = useState(() => delayRender('fuentes'));
  useEffect(() => {
    document.fonts.ready.then(() => continueRender(handle));
  }, [handle]);
}

const FullVideo: React.FC<{ deck: Deck }> = ({ deck }) => {
  useFonts();
  return (
    <Series>
      {deck.timing.scenes.map((s) => (
        <Series.Sequence key={s.id} durationInFrames={s.frames}>
          <DeckScene deck={deck} sceneId={s.id} audioSrc={staticFile(s.audio)} />
        </Series.Sequence>
      ))}
    </Series>
  );
};

// Cada mazo se liga a su propio componente: las props de Remotion deben ser serializables
// y el mazo contiene componentes React.
const BOUND = DECKS.map((d) => ({ d, Video: () => <FullVideo deck={d} /> }));

export const Root: React.FC = () => (
  <>
    {BOUND.map(({ d, Video }) => (
      <Composition key={d.chapterId} id={d.chapterId} component={Video} durationInFrames={d.timing.total} fps={d.timing.fps} width={1920} height={1080} />
    ))}
  </>
);
