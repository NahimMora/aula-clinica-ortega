import { useEffect, useMemo, useRef, useState } from 'react';
import { Player, type PlayerRef } from '@remotion/player';
import { DeckScene, type DeckSceneProps } from '../video/DeckScene';
import type { Deck } from '../video/kit';
import { Icon } from './Icon';

/** Diapositivas interactivas: cada escena del video, reproducible por separado con @remotion/player. */
export default function SlideDeck({ deck, ids, autoStart }: { deck: Deck; ids: string[]; autoStart: boolean }) {
  const scenes = useMemo(() => (ids.length ? deck.timing.scenes.filter((s) => ids.includes(s.id)) : deck.timing.scenes), [deck, ids]);
  const [i, setI] = useState(0);
  const [narration, setNarration] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [started, setStarted] = useState(autoStart);
  const ref = useRef<PlayerRef>(null);
  const s = scenes[Math.min(i, scenes.length - 1)];
  const props: DeckSceneProps = useMemo(
    () => ({ deck, sceneId: s.id, audioSrc: narration ? `${import.meta.env.BASE_URL}${s.audio}` : undefined }),
    [deck, s, narration],
  );

  useEffect(() => {
    const p = ref.current;
    if (!p) return;
    const onPlay = () => setStarted(true);
    const onEnded = () => {
      if (autoAdvance && i < scenes.length - 1) setI(i + 1);
    };
    p.addEventListener('play', onPlay);
    p.addEventListener('ended', onEnded);
    return () => {
      p.removeEventListener('play', onPlay);
      p.removeEventListener('ended', onEnded);
    };
  }, [i, autoAdvance, scenes.length, s.id, narration]);

  return (
    <div className="sdeck">
      <div className="sdeck__stage">
        <Player
          key={`${s.id}-${narration}`}
          ref={ref}
          component={DeckScene}
          inputProps={props}
          durationInFrames={s.frames}
          fps={deck.timing.fps}
          compositionWidth={1920}
          compositionHeight={1080}
          controls
          autoPlay={started}
          clickToPlay
          doubleClickToFullscreen
          showVolumeControls={narration}
          acknowledgeRemotionLicense
          style={{ width: '100%', aspectRatio: '16 / 9' }}
        />
      </div>
      <div className="sdeck__bar">
        <button className="btn btn--ghost btn--sm" onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} aria-label="Escena anterior">
          <Icon name="chevronLeft" size={16} /> Anterior
        </button>
        <span className="sdeck__count">
          {i + 1} / {scenes.length} · <strong>{s.title}</strong>
        </span>
        <button className="btn btn--ghost btn--sm" onClick={() => setI(Math.min(scenes.length - 1, i + 1))} disabled={i >= scenes.length - 1} aria-label="Escena siguiente">
          Siguiente <Icon name="chevronRight" size={16} />
        </button>
        <label className="switch">
          <input type="checkbox" checked={narration} onChange={(e) => setNarration(e.target.checked)} />
          <span>Narración</span>
        </label>
        {scenes.length > 1 && (
          <label className="switch">
            <input type="checkbox" checked={autoAdvance} onChange={(e) => setAutoAdvance(e.target.checked)} />
            <span>Avanzar solo</span>
          </label>
        )}
      </div>
      {scenes.length > 1 && (
        <div className="sdeck__chips" role="tablist" aria-label="Escenas">
          {scenes.map((x, k) => (
            <button key={x.id} role="tab" aria-selected={k === i} className={k === i ? 'is-on' : ''} onClick={() => setI(k)}>
              {k + 1}. {x.title}
            </button>
          ))}
        </div>
      )}
      <details className="sdeck__text">
        <summary>Texto de la narración de esta escena</summary>
        <p>{s.cues.map((c) => c.text).join(' ')}</p>
      </details>
    </div>
  );
}
