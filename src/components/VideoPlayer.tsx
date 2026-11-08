import { useRef, useState } from 'react';
import type { VideoMeta } from '@/types';
import { Icon } from './Icon';

export const asset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`;

const fmt = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;

export function VideoPlayer({ video, title }: { video: VideoMeta; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [current, setCurrent] = useState(0);
  const [failed, setFailed] = useState(false);
  const seek = (t: number) => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = t;
    void v.play().catch(() => undefined);
  };
  const activeIdx = video.chapters.reduce((acc, c, i) => (current >= c.t ? i : acc), 0);
  return (
    <div className="vplayer">
      <div className="vplayer__frame">
        {failed ? (
          <div className="vplayer__error">
            <Icon name="alert" /> No se pudo cargar el video. Revisá tu conexión e intentá de nuevo.
          </div>
        ) : (
          <video
            ref={ref}
            controls
            preload="metadata"
            playsInline
            poster={video.poster ? asset(video.poster) : undefined}
            onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
            onError={() => setFailed(true)}
            aria-label={`Video explicativo: ${title}`}
          >
            <source src={asset(video.src)} type="video/mp4" />
            {video.vtt && <track kind="captions" srcLang="es" label="Español" src={asset(video.vtt)} default />}
          </video>
        )}
      </div>
      <div className="vplayer__side">
        <div className="vplayer__meta">
          <Icon name="clock" size={15} /> {video.duration} · narración en español rioplatense · subtítulos
        </div>
        <ol className="vplayer__chapters">
          {video.chapters.map((c, i) => (
            <li key={i}>
              <button className={i === activeIdx ? 'is-on' : ''} onClick={() => seek(c.t)}>
                <span className="vplayer__t">{fmt(c.t)}</span>
                <span>{c.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <details className="vplayer__script">
        <summary>
          <Icon name="book" size={16} /> Guion completo del video (para repasar sin volver a verlo)
        </summary>
        {video.script.map((s, i) => (
          <div key={i} className="vplayer__scene">
            <div className="vplayer__scene-title">
              {i + 1}. {s.title}
            </div>
            <p>{s.text}</p>
          </div>
        ))}
      </details>
    </div>
  );
}
