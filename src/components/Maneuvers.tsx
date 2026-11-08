import { useEffect, useMemo, useRef, useState } from 'react';
import type { Maneuver } from '@/types';
import { maneuverById } from '@content/maneuvers';
import { Rich, Refs } from './Rich';
import { Icon } from './Icon';

/* ───────── Reproductor de fragmentos (YouTube IFrame API, dominio sin cookies) ───────── */

interface YTPlayer {
  loadVideoById(o: { videoId: string; startSeconds: number; endSeconds: number }): void;
  cueVideoById(o: { videoId: string; startSeconds: number; endSeconds: number }): void;
  destroy(): void;
}
declare global {
  interface Window {
    YT?: { Player: new (el: HTMLElement, opts: unknown) => YTPlayer; PlayerState: { ENDED: number } };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;
function loadYT(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve, reject) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    s.async = true;
    s.onerror = () => reject(new Error('No se pudo cargar el reproductor de YouTube'));
    document.head.appendChild(s);
  });
  return apiPromise;
}

const fmt = (t: number) => {
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = String(Math.floor(t % 60)).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;
};

export function SegmentPlayer({ list, index, onIndex, autoNext }: { list: Maneuver[]; index: number; onIndex: (i: number) => void; autoNext: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);
  const state = useRef({ list, index, autoNext, onIndex });
  state.current = { list, index, autoNext, onIndex };
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  // El reproductor solo acepta comandos después de onReady; antes sus métodos no existen.
  const ready = useRef(false);
  const loaded = useRef(-1);

  const loadIndex = (i: number) => {
    const p = player.current;
    const m = state.current.list[i];
    if (!p || !ready.current || typeof p.loadVideoById !== 'function' || !m?.video) return;
    loaded.current = i;
    p.loadVideoById({ videoId: m.video.youtubeId, startSeconds: m.video.start, endSeconds: m.video.end });
  };

  useEffect(() => {
    if (!started || !host.current) return;
    let alive = true;
    const i = state.current.index;
    const m = state.current.list[i];
    if (!m?.video) return;
    loadYT()
      .then(() => {
        if (!alive || !host.current || !window.YT) return;
        const el = document.createElement('div');
        host.current.innerHTML = '';
        host.current.appendChild(el);
        loaded.current = i;
        player.current = new window.YT.Player(el, {
          host: 'https://www.youtube-nocookie.com',
          videoId: m.video!.youtubeId,
          playerVars: { start: m.video!.start, end: m.video!.end, rel: 0, modestbranding: 1, playsinline: 1, autoplay: 1 },
          events: {
            onReady: () => {
              ready.current = true;
              // Si la estudiante eligió otra maniobra mientras cargaba, se carga esa.
              if (state.current.index !== loaded.current) loadIndex(state.current.index);
            },
            onStateChange: (e: { data: number }) => {
              const s = state.current;
              if (e.data === window.YT!.PlayerState.ENDED && s.autoNext && s.index < s.list.length - 1) s.onIndex(s.index + 1);
            },
          },
        });
      })
      .catch((e: Error) => setError(e.message));
    return () => {
      alive = false;
      ready.current = false;
      try {
        player.current?.destroy();
      } catch {
        /* el iframe pudo no haber terminado de crearse */
      }
      player.current = null;
    };
  }, [started]);

  // Cambio de maniobra: carga el nuevo fragmento en el mismo reproductor (solo si cambió).
  useEffect(() => {
    if (index !== loaded.current) loadIndex(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const m = list[index];
  if (!m?.video) return null;
  return (
    <div className="segplayer">
      {!started ? (
        <button className="segplayer__poster" onClick={() => setStarted(true)}>
          <span className="segplayer__play">
            <Icon name="play" size={30} />
          </span>
          <span className="segplayer__label">
            Reproducir “{m.name}” · {fmt(m.video.start)}–{fmt(m.video.end)}
          </span>
          <span className="segplayer__note">Se carga el reproductor de YouTube (sin cookies) solo al reproducir.</span>
        </button>
      ) : (
        <div className="segplayer__frame" ref={host} />
      )}
      {error && <p className="segplayer__error">{error}</p>}
    </div>
  );
}

/* ───────── Ficha de una maniobra ───────── */

export function ManeuverDetail({ m }: { m: Maneuver }) {
  return (
    <div className="mdetail">
      <h4>{m.name}</h4>
      <dl className="mdetail__grid">
        <div>
          <dt>Qué explora</dt>
          <dd>
            <Rich text={m.explores} />
          </dd>
        </div>
        <div>
          <dt>Posición del paciente</dt>
          <dd>
            <Rich text={m.patientPosition} />
          </dd>
        </div>
        <div>
          <dt>Posición del examinador</dt>
          <dd>
            <Rich text={m.examinerPosition} />
          </dd>
        </div>
        <div className="mdetail__wide">
          <dt>Cómo se realiza</dt>
          <dd>
            <ol>
              {m.technique.map((t, i) => (
                <li key={i}>
                  <Rich text={t} />
                </li>
              ))}
            </ol>
          </dd>
        </div>
        <div>
          <dt>Hallazgo normal</dt>
          <dd>
            <Rich text={m.normal} />
          </dd>
        </div>
        <div>
          <dt>Hallazgo patológico</dt>
          <dd>
            <Rich text={m.pathologic} />
          </dd>
        </div>
        <div className="mdetail__wide">
          <dt>Interpretación clínica</dt>
          <dd>
            <Rich text={m.interpretation} />
          </dd>
        </div>
        <div className="mdetail__wide">
          <dt>Errores frecuentes</dt>
          <dd>
            <ul>
              {m.pitfalls.map((t, i) => (
                <li key={i}>
                  <Rich text={t} />
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
      {m.professorNote && (
        <aside className="callout callout--prof">
          <div className="callout__head">
            <Icon name="cap" size={18} /> Dato del profesor
          </div>
          <p>
            <Rich text={m.professorNote.text} />
          </p>
          <Refs refs={m.professorNote.refs} />
        </aside>
      )}
      <Refs refs={m.refs} />
    </div>
  );
}

export function ManeuverPlaylist({ list }: { list: Maneuver[] }) {
  const [index, setIndex] = useState(0);
  const [autoNext, setAutoNext] = useState(true);
  if (!list.length) return null;
  const m = list[Math.min(index, list.length - 1)];
  return (
    <div className="mplaylist">
      <div className="mplaylist__main">
        <SegmentPlayer list={list} index={index} onIndex={setIndex} autoNext={autoNext} />
        <ManeuverDetail m={m} />
      </div>
      <div className="mplaylist__side">
        <label className="switch">
          <input type="checkbox" checked={autoNext} onChange={(e) => setAutoNext(e.target.checked)} />
          <span>Reproducir todo el grupo seguido</span>
        </label>
        <ol className="mplaylist__list">
          {list.map((x, i) => (
            <li key={x.id}>
              <button className={i === index ? 'is-on' : ''} onClick={() => setIndex(i)}>
                <span className="mplaylist__n">{i + 1}</span>
                <span>
                  {x.name}
                  {x.video && (
                    <small>
                      {fmt(x.video.start)}–{fmt(x.video.end)}
                    </small>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function ManeuverList({ ids }: { ids: string[] }) {
  const key = ids.join('|');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const list = useMemo(() => ids.map(maneuverById).filter((m): m is Maneuver => Boolean(m)), [key]);
  if (!list.length) return <p className="empty">Las maniobras de este capítulo se incorporan cuando sus fragmentos de video estén verificados.</p>;
  return <ManeuverPlaylist list={list} />;
}
