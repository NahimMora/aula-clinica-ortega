import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { Player, type PlayerRef } from '@remotion/player';
import { DeckScene, type DeckSceneProps } from '../video/DeckScene';
import type { Deck, SceneTiming } from '../video/kit';
import { Icon } from './Icon';

type Mode = 'steps' | 'play';

interface Step {
  scene: number;
  cue: number;
  text: string;
  /** Primer fotograma de la oración (para escucharla). */
  from: number;
  /** Fotograma donde se congela el paso: con su animación completa y antes de los fundidos de la oración siguiente. */
  to: number;
}

function buildSteps(scenes: SceneTiming[]): Step[] {
  const out: Step[] = [];
  scenes.forEach((s, si) => {
    s.cues.forEach((c, ci) => {
      const next = s.cues[ci + 1];
      // Antes del fundido de salida (Show: 12 fotogramas; escena: últimos 12) y después de las entradas (Appear: 18).
      const end = next ? next.start - 14 : s.frames - 16;
      out.push({ scene: si, cue: ci, text: c.text, from: Math.max(0, c.start - 4), to: Math.max(c.start + 24, end) });
    });
  });
  return out;
}

/**
 * Diapositivas interactivas con el mismo motor del video.
 *  - Paso a paso (por defecto): cada oración narrada es un paso; la escena queda congelada con ese paso
 *    ya dibujado y el texto debajo. Anterior/Siguiente, flechas del teclado y «Escuchar este paso».
 *  - Reproducir: la escena corre de corrido, con narración opcional.
 */
export default function SlideDeck({ deck, ids, autoStart }: { deck: Deck; ids: string[]; autoStart: boolean }) {
  const scenes = useMemo(() => (ids.length ? deck.timing.scenes.filter((s) => ids.includes(s.id)) : deck.timing.scenes), [deck, ids]);
  const steps = useMemo(() => buildSteps(scenes), [scenes]);
  const [mode, setMode] = useState<Mode>('steps');
  const [k, setK] = useState(0); // paso actual (modo paso a paso)
  const [i, setI] = useState(0); // escena actual (modo reproducir)
  const [narration, setNarration] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [started, setStarted] = useState(autoStart);
  const [listening, setListening] = useState(false);
  const ref = useRef<PlayerRef>(null);
  const stopAt = useRef<number | null>(null);

  const step = steps[Math.min(k, steps.length - 1)];
  const sceneIdx = mode === 'steps' ? step.scene : Math.min(i, scenes.length - 1);
  const s = scenes[sceneIdx];
  const withAudio = mode === 'play' ? narration : true;
  const props: DeckSceneProps = useMemo(
    () => ({ deck, sceneId: s.id, audioSrc: withAudio ? `${import.meta.env.BASE_URL}${s.audio}` : undefined }),
    [deck, s, withAudio],
  );

  // Paso a paso: al cambiar de paso (dentro de la misma escena) se salta al fotograma congelado.
  useEffect(() => {
    if (mode !== 'steps') return;
    const p = ref.current;
    if (!p) return;
    stopAt.current = null;
    setListening(false);
    p.pause();
    p.seekTo(step.to);
  }, [mode, step]);

  // Eventos del reproductor.
  useEffect(() => {
    const p = ref.current;
    if (!p) return;
    const onPlay = () => setStarted(true);
    const onEnded = () => {
      if (mode === 'play' && autoAdvance && i < scenes.length - 1) setI(i + 1);
    };
    const onFrame = (e: { detail: { frame: number } }) => {
      if (stopAt.current !== null && e.detail.frame >= stopAt.current) {
        const target = stopAt.current;
        stopAt.current = null;
        p.pause();
        p.seekTo(target);
        setListening(false);
      }
    };
    const onPause = () => {
      if (stopAt.current === null) setListening(false);
    };
    p.addEventListener('play', onPlay);
    p.addEventListener('ended', onEnded);
    p.addEventListener('frameupdate', onFrame);
    p.addEventListener('pause', onPause);
    return () => {
      p.removeEventListener('play', onPlay);
      p.removeEventListener('ended', onEnded);
      p.removeEventListener('frameupdate', onFrame);
      p.removeEventListener('pause', onPause);
    };
  }, [mode, i, autoAdvance, scenes.length, s.id, narration]);

  const go = useCallback((n: number) => setK(Math.max(0, Math.min(steps.length - 1, n))), [steps.length]);

  const listen = () => {
    const p = ref.current;
    if (!p) return;
    if (listening) {
      stopAt.current = null;
      p.pause();
      p.seekTo(step.to);
      setListening(false);
      return;
    }
    stopAt.current = step.to;
    setListening(true);
    p.seekTo(step.from);
    p.play();
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (mode !== 'steps') return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      e.preventDefault();
      go(k + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      go(k - 1);
    }
  };

  const switchMode = (m: Mode) => {
    if (m === mode) return;
    stopAt.current = null;
    setListening(false);
    if (m === 'play') {
      setI(step.scene);
      setStarted(false);
    } else {
      const first = steps.findIndex((x) => x.scene === i);
      setK(first < 0 ? 0 : first);
    }
    setMode(m);
  };

  // Pasos de la escena actual (para los puntos de progreso).
  const sceneSteps = steps.filter((x) => x.scene === sceneIdx);

  return (
    <div className="sdeck" onKeyDown={onKey}>
      <div className="sdeck__modes" role="tablist" aria-label="Modo de las diapositivas">
        <button role="tab" aria-selected={mode === 'steps'} className={mode === 'steps' ? 'is-on' : ''} onClick={() => switchMode('steps')}>
          Paso a paso
        </button>
        <button role="tab" aria-selected={mode === 'play'} className={mode === 'play' ? 'is-on' : ''} onClick={() => switchMode('play')}>
          <Icon name="play" size={14} /> Reproducir
        </button>
      </div>
      <div className="sdeck__stage">
        <Player
          key={`${mode}-${s.id}-${withAudio}`}
          ref={ref}
          component={DeckScene}
          inputProps={props}
          durationInFrames={s.frames}
          fps={deck.timing.fps}
          compositionWidth={1920}
          compositionHeight={1080}
          initialFrame={mode === 'steps' ? step.to : 0}
          controls={mode === 'play'}
          autoPlay={mode === 'play' && started}
          clickToPlay={mode === 'play'}
          doubleClickToFullscreen
          showVolumeControls={mode === 'play' && narration}
          acknowledgeRemotionLicense
          style={{ width: '100%', aspectRatio: '16 / 9' }}
        />
      </div>

      {mode === 'steps' ? (
        <>
          <div className="sdeck__step" aria-live="polite">
            <p className="sdeck__say">{step.text}</p>
          </div>
          <div className="sdeck__bar">
            <button className="btn btn--ghost btn--sm" onClick={() => go(k - 1)} disabled={k === 0} aria-label="Paso anterior">
              <Icon name="chevronLeft" size={16} /> Anterior
            </button>
            <div className="sdeck__dots" aria-label={`Paso ${step.cue + 1} de ${sceneSteps.length} de esta escena`}>
              {sceneSteps.map((x) => {
                const idx = steps.indexOf(x);
                return <button key={idx} className={idx === k ? 'is-on' : idx < k ? 'is-done' : ''} onClick={() => go(idx)} aria-label={`Ir al paso ${x.cue + 1}`} />;
              })}
            </div>
            <button className="btn btn--sm" onClick={() => go(k + 1)} disabled={k >= steps.length - 1} aria-label="Paso siguiente">
              Siguiente <Icon name="chevronRight" size={16} />
            </button>
            <button className="btn btn--ghost btn--sm" onClick={listen} aria-pressed={listening}>
              {listening ? '■ Detener' : '🔊 Escuchar este paso'}
            </button>
            <span className="sdeck__count">
              {scenes.length > 1 && <>Escena {sceneIdx + 1}/{scenes.length} · </>}
              <strong>{s.title}</strong>
            </span>
          </div>
        </>
      ) : (
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
      )}

      {scenes.length > 1 && (
        <div className="sdeck__chips" role="tablist" aria-label="Escenas">
          {scenes.map((x, n) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={n === sceneIdx}
              className={n === sceneIdx ? 'is-on' : ''}
              onClick={() => (mode === 'steps' ? go(steps.findIndex((st) => st.scene === n)) : setI(n))}
            >
              {n + 1}. {x.title}
            </button>
          ))}
        </div>
      )}
      {mode === 'play' && (
        <details className="sdeck__text">
          <summary>Texto de la narración de esta escena</summary>
          <p>{s.cues.map((c) => c.text).join(' ')}</p>
        </details>
      )}
    </div>
  );
}
