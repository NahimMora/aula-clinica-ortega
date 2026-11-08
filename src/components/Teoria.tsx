// Teoría: recorrido paso a paso de las escenas del capítulo. Es la versión sin video de cada explicación
// (el video usa exactamente las mismas escenas y el mismo texto).
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { Escena } from '@/escenas/tipos';
import { Lienzo } from '@/escenas/Lienzo';

/** Segundos desde que se mostró el paso (para las animaciones del dibujo). */
function useTiempo(clave: string) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setT(6);
      return;
    }
    let raf = 0;
    const ini = performance.now();
    const tic = (a: number) => {
      setT((a - ini) / 1000);
      raf = requestAnimationFrame(tic);
    };
    raf = requestAnimationFrame(tic);
    return () => cancelAnimationFrame(raf);
  }, [clave]);
  return t;
}

export function Teoria({ escenas, audioBase, onFin }: { escenas: Escena[]; audioBase?: string; onFin?: () => void }) {
  const [ei, setEi] = useState(0);
  const [pi, setPi] = useState(0);
  const [sonando, setSonando] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);
  const temas = useRef<HTMLDivElement>(null);
  const e = escenas[ei];
  const p = e.pasos[pi];
  const t = useTiempo(`${ei}-${pi}`);
  const primero = ei === 0 && pi === 0;
  const ultimo = ei === escenas.length - 1 && pi === e.pasos.length - 1;

  // Al cambiar de paso se corta el audio y el tema activo queda a la vista.
  useEffect(() => {
    audio.current?.pause();
    setSonando(false);
  }, [ei, pi]);
  useEffect(() => {
    temas.current?.querySelector<HTMLElement>('[aria-pressed="true"]')?.scrollIntoView({ inline: 'center', block: 'nearest' });
  }, [ei]);

  const avanzar = () => {
    if (pi + 1 < e.pasos.length) setPi(pi + 1);
    else if (ei + 1 < escenas.length) {
      setEi(ei + 1);
      setPi(0);
    } else onFin?.();
  };
  const atras = () => {
    if (pi > 0) setPi(pi - 1);
    else if (ei > 0) {
      setEi(ei - 1);
      setPi(escenas[ei - 1].pasos.length - 1);
    }
  };
  const escuchar = () => {
    if (!audioBase) return;
    if (sonando) {
      audio.current?.pause();
      setSonando(false);
      return;
    }
    const a = audio.current ?? new Audio();
    audio.current = a;
    a.src = `${audioBase}${e.id}-${pi + 1}.mp3`;
    a.onended = () => setSonando(false);
    a.onerror = () => setSonando(false);
    a.currentTime = 0;
    void a.play().then(() => setSonando(true)).catch(() => setSonando(false));
  };
  const teclas = (ev: KeyboardEvent<HTMLDivElement>) => {
    if (ev.key === 'ArrowRight') {
      ev.preventDefault();
      avanzar();
    } else if (ev.key === 'ArrowLeft') {
      ev.preventDefault();
      atras();
    }
  };

  return (
    <div className="teoria" onKeyDown={teclas}>
      <div className="segmento segmento--temas" ref={temas} role="group" aria-label="Temas">
        {escenas.map((x, i) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={i === ei}
            onClick={() => {
              setEi(i);
              setPi(0);
            }}
          >
            {i + 1}. {x.titulo}
          </button>
        ))}
      </div>
      <div className="lienzo">
        <Lienzo e={e} i={pi} t={t} />
      </div>
      <div className="puntos" aria-label={`Paso ${pi + 1} de ${e.pasos.length}`}>
        {e.pasos.map((_, i) => (
          <i key={i} className={i <= pi ? 'ya' : ''} />
        ))}
      </div>
      <p className="narracion" aria-live="polite">
        {p.di}
      </p>
      {p.retener && p.retener.length > 0 && (
        <ul className="retener" aria-label="Retené esto">
          {p.retener.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      )}
      <div className="dos">
        <button type="button" className="boton sec" disabled={primero} onClick={atras}>
          Anterior
        </button>
        <button type="button" className="boton" onClick={avanzar}>
          {ultimo ? 'Terminar' : 'Siguiente'}
        </button>
      </div>
      {audioBase && (
        <button type="button" className="enlace escuchar" onClick={escuchar} aria-pressed={sonando}>
          {sonando ? '■ Detener' : '🔊 Escuchar este paso'}
        </button>
      )}
    </div>
  );
}
