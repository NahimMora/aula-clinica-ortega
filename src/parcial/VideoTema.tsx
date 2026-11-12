// Video del tema: reproduce seguidas, como un solo video, las partes de las clases narradas que corresponden
// al tema (y las diapositivas propias del parcial). No hay un archivo nuevo por tema: se saltan los tramos
// de los videos que ya existen (content/parcial/videos-temas.json, generado con `npm run videos:temas`).
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { asset } from '@/components/VideoPlayer';
import VIDEOS from '@content/parcial/videos-temas.json';

export interface Segmento {
  src: string;
  vtt?: string;
  poster?: string;
  ini: number;
  fin: number;
  titulo: string;
}
interface VideoDeTema {
  total: number;
  segmentos: Segmento[];
}

export const videoDeTema = (id: string) => (VIDEOS as Record<string, VideoDeTema | undefined>)[id];

const fmt = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
const VELOCIDADES = [1, 1.25, 1.5, 1.75];

export function VideoTema({ id, titulo }: { id: string; titulo: string }) {
  const v = videoDeTema(id);
  const segs = useMemo(() => v?.segmentos ?? [], [v]);
  const off = useMemo(() => {
    const o: number[] = [];
    let acc = 0;
    for (const s of segs) {
      o.push(acc);
      acc += s.fin - s.ini;
    }
    return o;
  }, [segs]);
  const total = v?.total ?? 0;
  const ref = useRef<HTMLVideoElement>(null);
  const marco = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const iRef = useRef(0);
  const [tTema, setTTema] = useState(0);
  const [jugando, setJugando] = useState(false);
  const [vel, setVel] = useState(1);
  const [subs, setSubs] = useState(true);
  const [falla, setFalla] = useState(false);
  const pendiente = useRef<{ t: number; play: boolean } | null>(null);

  const cargar = useCallback(
    (k: number, t = 0, play = false) => {
      const el = ref.current;
      const s = segs[k];
      if (!el || !s) return;
      iRef.current = k;
      setI(k);
      const src = asset(s.src);
      if (!el.currentSrc.endsWith(s.src)) {
        pendiente.current = { t: s.ini + t, play };
        el.src = src;
        el.load();
      } else {
        el.currentTime = s.ini + t;
        if (play) void el.play().catch(() => undefined);
      }
    },
    [segs],
  );

  // Primer tramo.
  useEffect(() => {
    if (segs.length) cargar(0);
  }, [segs, cargar]);

  // Vigila el final de cada tramo con precisión (timeupdate llega tarde).
  useEffect(() => {
    if (!jugando) return;
    let raf = 0;
    let ultimo = 0;
    const tick = (ahora: number) => {
      const el = ref.current;
      const k = iRef.current;
      const s = segs[k];
      if (el && s) {
        const t = el.currentTime;
        if (t >= s.fin - 0.06) {
          const sig = segs[k + 1];
          if (!sig) {
            el.pause();
          } else if (sig.src === s.src && Math.abs(sig.ini - s.fin) < 0.08) {
            iRef.current = k + 1;
            setI(k + 1);
          } else {
            cargar(k + 1, 0, true);
          }
        }
        if (ahora - ultimo > 250) {
          ultimo = ahora;
          setTTema(off[iRef.current] + Math.max(0, el.currentTime - segs[iRef.current].ini));
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [jugando, segs, off, cargar]);

  const irA = (T: number, play = jugando) => {
    let k = 0;
    for (let j = 0; j < segs.length; j++) if (T >= off[j]) k = j;
    cargar(k, Math.max(0, T - off[k]), play);
    setTTema(T);
  };

  if (!v || !segs.length) return null;
  const s = segs[i];
  return (
    <div className="vplayer vtema">
      <div className="vplayer__frame vtema__marco" ref={marco}>
        {falla ? (
          <div className="vplayer__error">
            <Icon name="alert" /> No se pudo cargar el video. Revisá tu conexión e intentá de nuevo.
          </div>
        ) : (
          <video
            ref={ref}
            playsInline
            preload="metadata"
            poster={s.poster ? asset(s.poster) : undefined}
            aria-label={`Video del tema: ${titulo}`}
            onClick={() => {
              const el = ref.current;
              if (!el) return;
              if (el.paused) void el.play().catch(() => undefined);
              else el.pause();
            }}
            onLoadedMetadata={(e) => {
              const el = e.currentTarget;
              el.defaultPlaybackRate = vel;
              el.playbackRate = vel;
              const p = pendiente.current;
              pendiente.current = null;
              if (p) {
                el.currentTime = p.t;
                if (p.play) void el.play().catch(() => undefined);
              }
              for (const tr of Array.from(el.textTracks)) tr.mode = subs ? 'showing' : 'hidden';
            }}
            onPlay={() => setJugando(true)}
            onPause={() => setJugando(false)}
            onError={() => setFalla(true)}
          >
            {s.vtt && <track key={s.vtt} kind="captions" srcLang="es" label="Español" src={asset(s.vtt)} default={subs} />}
          </video>
        )}
        {!falla && !jugando && (
          <button type="button" className="vtema__toque" aria-label="Reproducir" onClick={() => void ref.current?.play().catch(() => undefined)}>
            <Icon name="play" size={30} />
          </button>
        )}
        <div className="vtema__barra">
          <button
            type="button"
            className="vtema__b"
            aria-label={jugando ? 'Pausa' : 'Reproducir'}
            onClick={() => {
              const el = ref.current;
              if (!el) return;
              if (el.paused) void el.play().catch(() => undefined);
              else el.pause();
            }}
          >
            <Icon name={jugando ? 'pause' : 'play'} size={18} />
          </button>
          <span className="vtema__t">
            {fmt(tTema)} / {fmt(total)}
          </span>
          <input className="vtema__rango" type="range" min={0} max={Math.max(1, Math.floor(total))} step={1} value={Math.floor(tTema)} aria-label="Avance del video" onChange={(e) => irA(Number(e.target.value))} />
          <button
            type="button"
            className="vtema__b vtema__vel"
            aria-label="Velocidad"
            onClick={() => {
              const nv = VELOCIDADES[(VELOCIDADES.indexOf(vel) + 1) % VELOCIDADES.length];
              setVel(nv);
              const el = ref.current;
              if (el) {
                el.defaultPlaybackRate = nv;
                el.playbackRate = nv;
              }
            }}
          >
            {vel}×
          </button>
          <button
            type="button"
            className={`vtema__b ${subs ? 'is-on' : ''}`}
            aria-label="Subtítulos"
            aria-pressed={subs}
            onClick={() => {
              const nv = !subs;
              setSubs(nv);
              const el = ref.current;
              if (el) for (const tr of Array.from(el.textTracks)) tr.mode = nv ? 'showing' : 'hidden';
            }}
          >
            CC
          </button>
          <button
            type="button"
            className="vtema__b"
            aria-label="Pantalla completa"
            onClick={() => {
              const m = marco.current;
              if (!m) return;
              if (document.fullscreenElement) void document.exitFullscreen();
              else void m.requestFullscreen?.().catch(() => undefined);
            }}
          >
            <Icon name="expand" size={16} />
          </button>
        </div>
      </div>
      <div className="vplayer__side">
        <div className="vplayer__meta">
          <Icon name="clock" size={15} /> {fmt(total)} · {segs.length} partes · narración y subtítulos
        </div>
        <ol className="vplayer__chapters">
          {segs.map((x, k) => (
            <li key={k}>
              <button className={k === i ? 'is-on' : ''} onClick={() => irA(off[k], true)}>
                <span className="vplayer__t">{fmt(off[k])}</span>
                <span>{x.titulo}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
