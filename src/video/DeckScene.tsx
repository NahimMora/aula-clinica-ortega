/** Una escena completa (marco + animación + narración opcional). Compartida por el video y las diapositivas. */
import type { FC } from 'react';
import { Audio, Sequence } from 'remotion';
import { SceneFrame, type Deck } from './kit';

export interface DeckSceneProps {
  deck: Deck;
  sceneId: string;
  /** URL del audio de narración ya resuelta (staticFile en el render; BASE_URL en la web). Sin valor: sin narración. */
  audioSrc?: string;
}

export const DeckScene: FC<DeckSceneProps> = ({ deck, sceneId, audioSrc }) => {
  const scenes = deck.timing.scenes;
  const index = scenes.findIndex((s) => s.id === sceneId);
  const t = scenes[index];
  const Scene = deck.scenes[sceneId];
  if (!t || !Scene) return null;
  return (
    <>
      <SceneFrame t={t} index={index} count={scenes.length} chapterTitle={deck.chapterTitle}>
        <Scene t={t} />
      </SceneFrame>
      {audioSrc && (
        <Sequence from={t.audioFrom} layout="none">
          <Audio src={audioSrc} />
        </Sequence>
      )}
    </>
  );
};
