// Explicación animada paso a paso (idea de farmaco-flor): un dibujo SVG que es función pura de
// (escena, paso, t) + la narración del paso. La web la recorre con Anterior/Siguiente o en «modo clase»
// (avanza sola con la voz); el video de Remotion usa exactamente las mismas escenas.
import { createContext, useContext, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { Escena } from '@/escenas/tipos';
import { Lienzo } from '@/escenas/Lienzo';
import { Icon } from './Icon';

export const AnimContext = createContext<{ escenas: Escena[]; audioBase?: string; conAudio?: boolean }>({ escenas: [] });

/** Segundos desde que se mostró el paso; solo corre mientras el dibujo está en pantalla. */
function useTiempo(clave: string, activo: boolean) {
  const [t, setT] = useState(0);
  const base = useRef(0);
  useEffect(() => {
    base.current = 0;
    setT(0);
  }, [clave]);
  useEffect(() => {
    if (!activo) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setT(8);
      return;
    }
    let raf = 0;
    const ini = performance.now() - base.current * 1000;
    const tic = (a: number) => {
      const s = (a - ini) / 1000;
      base.current = s;
      setT(s);
      if (s < 30) raf = requestAnimationFrame(tic);
    };
    raf = requestAnimationFrame(tic);
    return () => cancelAnimationFrame(raf);
  }, [clave, activo]);
  return t;
}

export function AnimBlock({ id }: { id: string }) {
  const { escenas, audioBase, conAudio } = useContext(AnimContext);
  const e = escenas.find((x) => x.id === id);
  if (!e) return null;
  return <Anim e={e} audioBase={conAudio ? audioBase : undefined} />;
}

export function Anim({ e, audioBase }: { e: Escena; audioBase?: string }) {
  const [pi, setPi] = useState(0);
  const [clase, setClase] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const timer = useRef<number>();
  const p = e.pasos[pi];
  const t = useTiempo(`${e.id}-${pi}`, visible);
  const ultimo = pi === e.pasos.length - 1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([en]) => setVisible(en.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Modo clase: narra el paso (si hay audio) o espera según el largo del texto, y avanza solo.
  useEffect(() => {
    window.clearTimeout(timer.current);
    audio.current?.pause();
    if (!clase) return;
    const siguiente = () => {
      if (pi < e.pasos.length - 1) setPi(pi + 1);
      else setClase(false);
    };
    if (audioBase) {
      const a = audio.current ?? new Audio();
      audio.current = a;
      a.src = `${audioBase}${e.id}-${pi + 1}.mp3`;
      a.onended = () => (timer.current = window.setTimeout(siguiente, 700));
      a.onerror = () => (timer.current = window.setTimeout(siguiente, 2500 + p.di.length * 55));
      void a.play().catch(() => (timer.current = window.setTimeout(siguiente, 2500 + p.di.length * 55)));
    } else {
      timer.current = window.setTimeout(siguiente, 2500 + p.di.length * 55);
    }
    return () => window.clearTimeout(timer.current);
  }, [clase, pi, e, audioBase, p.di.length]);

  useEffect(() => () => audio.current?.pause(), []);

  const ir = (k: number) => {
    setClase(false);
    setPi(Math.max(0, Math.min(e.pasos.length - 1, k)));
  };
  const teclas = (ev: KeyboardEvent<HTMLDivElement>) => {
    if (ev.key === 'ArrowRight') {
      ev.preventDefault();
      ir(pi + 1);
    } else if (ev.key === 'ArrowLeft') {
      ev.preventDefault();
      ir(pi - 1);
    }
  };

  return (
    <figure className="anim" ref={ref} onKeyDown={teclas} tabIndex={-1}>
      <div className="anim__top">
        <span className="anim__kicker">
          <Icon name="play" size={13} /> Explicación animada
        </span>
        <span className="anim__title">{e.titulo}</span>
        <button className={`anim__clase ${clase ? 'is-on' : ''}`} onClick={() => (clase ? setClase(false) : (ultimo && setPi(0), setClase(true)))} aria-pressed={clase}>
          {clase ? '❚❚ Pausar' : audioBase ? '▶ Modo clase (con voz)' : '▶ Reproducir'}
        </button>
      </div>
      <div className="anim__canvas">
        <Lienzo e={e} i={pi} t={t} />
      </div>
      <div className="anim__dots" role="tablist" aria-label="Pasos">
        {e.pasos.map((_, k) => (
          <button key={k} role="tab" aria-selected={k === pi} aria-label={`Paso ${k + 1}`} className={k < pi ? 'ya' : k === pi ? 'on' : ''} onClick={() => ir(k)} />
        ))}
      </div>
      <p className="anim__di" aria-live="polite">
        <span className="anim__n">{pi + 1}</span>
        {p.di}
      </p>
      {p.retener && p.retener.length > 0 && (
        <ul className="anim__ret" aria-label="Retené esto">
          {p.retener.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      )}
      <div className="anim__nav">
        <button className="btn btn--ghost btn--sm" disabled={pi === 0} onClick={() => ir(pi - 1)}>
          <Icon name="chevronLeft" size={15} /> Anterior
        </button>
        <button className="btn btn--soft btn--sm" disabled={ultimo} onClick={() => ir(pi + 1)}>
          Siguiente <Icon name="chevronRight" size={15} />
        </button>
      </div>
    </figure>
  );
}
