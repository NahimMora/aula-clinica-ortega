// Visor de diapositivas paso a paso (como Fármaco): cada «Siguiente» revela una parte de la diapositiva
// y debajo aparece la explicación de ese paso, la misma que narra el video. Al terminar los pasos,
// «Siguiente» pasa a la diapositiva que sigue.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Refs, Rich } from '@/components/Rich';
import { Icon } from '@/components/Icon';
import { asset } from '@/components/VideoPlayer';
import { AssetCtx, Diapositiva, Txt, type Reloj } from './Diapositiva';
import type { Diapositiva as D, Mazo } from './tipos';

/** Duración de la aparición de un paso (Diapositiva usa 0,42 s). */
const ANIM_S = 0.6;
/** Las figuras con movimiento siguen animándose este tiempo después del último toque; después quedan quietas (en el celular, un dibujo moviéndose sin parar tilda la página). */
const VIVA_S = 6;

const leer = (k: string) => {
  try {
    return window.localStorage.getItem(k);
  } catch {
    return null;
  }
};
const guardar = (k: string, v: string) => {
  try {
    window.localStorage.setItem(k, v);
  } catch {
    /* sin persistencia: la navegación sigue funcionando */
  }
};

/** Tiempo de la diapositiva (t) y del paso actual (dt). Solo corre mientras hay algo que animar. */
function useReloj(d: D, paso: number, nonce: number, visible: () => boolean): Reloj {
  const [r, setR] = useState<Reloj>({ t: 0, paso, dt: 0 });
  const t0 = useRef(performance.now());
  const idPrevio = useRef(d.id);
  useEffect(() => {
    if (idPrevio.current !== d.id) {
      idPrevio.current = d.id;
      t0.current = performance.now();
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setR({ t: 4, paso, dt: 9 });
      return;
    }
    const inicioPaso = performance.now();
    const hasta = d.fig ? VIVA_S : ANIM_S + 0.1;
    let raf = 0;
    let ult = 0;
    const tick = (now: number) => {
      const dt = Math.max(0, (now - inicioPaso) / 1000);
      if (now - ult >= 33 && visible()) {
        ult = now;
        setR({ t: Math.max(0, (now - t0.current) / 1000), paso, dt });
      }
      if (dt < hasta) raf = requestAnimationFrame(tick);
      else setR({ t: Math.max(0, (now - t0.current) / 1000), paso, dt: 9 });
    };
    setR({ t: Math.max(0, (performance.now() - t0.current) / 1000), paso, dt: 0 });
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [d.id, d.fig, paso, nonce, visible]);
  return r;
}

export function Visor({ mazo, chapterId, seccionPedida, diapoPedida }: { mazo: Mazo; chapterId: string; seccionPedida?: string; diapoPedida?: string }) {
  const claveIdx = `aula:clase:${chapterId}:${mazo.id}`;
  const [soloExamen, setSoloExamen] = useState(false);
  const lista = useMemo(() => (soloExamen ? mazo.diapos.filter((d) => d.examen) : mazo.diapos), [mazo, soloExamen]);
  const [pos, setPos] = useState<{ id: string; paso: number }>(() => {
    const g = leer(claveIdx);
    return { id: g && mazo.diapos.some((d) => d.id === g) ? g : mazo.diapos[0].id, paso: 0 };
  });
  const [nonce, setNonce] = useState(0);
  const idx = Math.max(0, lista.findIndex((d) => d.id === pos.id));
  const d = lista[idx] ?? lista[0];
  const max = Math.max(0, d.voz.length - 1);
  const paso = Math.min(pos.paso, max);
  const barra = useRef<HTMLDivElement>(null);
  const escenario = useRef<HTMLDivElement>(null);
  const enPantalla = useRef(true);
  const visible = useCallback(() => enPantalla.current, []);
  const reloj = useReloj(d, paso, nonce, visible);
  const secActual = d.sec;

  const ir = useCallback((nuevo: D, alFinal = false) => {
    setPos({ id: nuevo.id, paso: alFinal ? Math.max(0, nuevo.voz.length - 1) : 0 });
  }, []);

  const ant = lista[idx - 1];
  const sig = lista[idx + 1];
  const avanzar = useCallback(() => {
    if (paso < max) setPos({ id: d.id, paso: paso + 1 });
    else if (sig) ir(sig);
  }, [paso, max, d.id, sig, ir]);
  const retroceder = useCallback(() => {
    if (paso > 0) setPos({ id: d.id, paso: paso - 1 });
    else if (ant) ir(ant, true);
  }, [paso, d.id, ant, ir]);

  useEffect(() => {
    guardar(claveIdx, d.id);
  }, [d.id, claveIdx]);

  // Salto pedido desde afuera (enlace profundo).
  useEffect(() => {
    if (!seccionPedida) return;
    const prim = mazo.diapos.find((x) => x.sec === seccionPedida);
    if (prim) ir(prim);
  }, [seccionPedida, mazo, ir]);

  // Diapositiva puntual pedida por enlace (?d=…), p. ej., desde Preguntas de examen: se muestra completa.
  useEffect(() => {
    const dp = diapoPedida ? mazo.diapos.find((x) => x.id === diapoPedida) : undefined;
    if (!dp) return;
    ir(dp, true);
    const h = window.setTimeout(() => escenario.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
    return () => window.clearTimeout(h);
  }, [diapoPedida, mazo, ir]);

  // Mantiene visible el apartado activo dentro de la barra, sin mover la página.
  useEffect(() => {
    const b = barra.current;
    const a = b?.querySelector<HTMLElement>('.is-on');
    if (!b || !a) return;
    b.scrollTo({ left: a.offsetLeft - (b.clientWidth - a.clientWidth) / 2, behavior: 'smooth' });
  }, [secActual]);

  useEffect(() => {
    const el = escenario.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => {
      enPantalla.current = e[0].isIntersecting;
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.altKey || e.ctrlKey || e.metaKey || /^(INPUT|TEXTAREA|SELECT|VIDEO|IFRAME)$/.test(el.tagName)) return;
      if (e.key === 'ArrowRight') avanzar();
      if (e.key === 'ArrowLeft') retroceder();
    };
    window.addEventListener('keydown', tecla);
    return () => window.removeEventListener('keydown', tecla);
  }, [avanzar, retroceder]);

  // Deslizar con el dedo: solo cuenta si el gesto es claramente horizontal (si no, era scroll de la página).
  const toque = useRef<{ x: number; y: number } | null>(null);

  const seccionesVisibles = mazo.secciones.filter((s) => lista.some((x) => x.sec === s.id));
  const nombreSec = mazo.secciones.find((s) => s.id === d.sec)?.label;
  const posTotal = soloExamen ? `${idx + 1} / ${lista.length} con aviso` : `${idx + 1} / ${lista.length}`;
  const ultimo = paso >= max && !sig;

  return (
    <AssetCtx.Provider value={asset}>
      <div className="visor">
        <div className="visor__apartados" ref={barra} role="tablist" aria-label="Apartados">
          {seccionesVisibles.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={s.id === secActual}
              className={s.id === secActual ? 'is-on' : ''}
              onClick={() => {
                const prim = lista.find((x) => x.sec === s.id);
                if (prim) ir(prim);
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div
          className="visor__escenario"
          ref={escenario}
          onTouchStart={(e) => {
            toque.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          }}
          onTouchEnd={(e) => {
            const t0 = toque.current;
            toque.current = null;
            if (!t0) return;
            const dx = e.changedTouches[0].clientX - t0.x;
            const dy = e.changedTouches[0].clientY - t0.y;
            if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 2) return;
            if (dx < 0) avanzar();
            else retroceder();
          }}
        >
          <Diapositiva key={d.id} d={d} reloj={reloj} seccion={nombreSec} />
        </div>

        <div className="visor__paso">
          {d.voz.length > 1 && (
            <div className="visor__puntos" role="group" aria-label="Pasos de la diapositiva">
              {d.voz.map((_, i) => (
                <button key={i} type="button" className={i <= paso ? 'ya' : ''} aria-label={`Paso ${i + 1} de ${d.voz.length}`} aria-current={i === paso ? 'step' : undefined} onClick={() => setPos({ id: d.id, paso: i })} />
              ))}
            </div>
          )}
          <p className="visor__narracion" aria-live="polite">
            <Txt text={d.voz[paso] ?? ''} />
          </p>
        </div>

        <div className="visor__control">
          <button type="button" className="visor__btn" onClick={retroceder} disabled={!ant && paso === 0}>
            <Icon name="chevronLeft" size={18} /> Anterior
          </button>
          <span className="visor__n" aria-live="polite">
            {posTotal}
          </span>
          <button type="button" className="visor__btn visor__btn--sig" onClick={avanzar} disabled={ultimo}>
            {paso < max ? 'Siguiente' : 'Siguiente diapositiva'} <Icon name="chevronRight" size={18} />
          </button>
        </div>
        <div className="visor__extra">
          {paso < max && (
            <button type="button" className="visor__mini" onClick={() => setPos({ id: d.id, paso: max })}>
              <Icon name="eye" size={14} /> Ver la diapositiva completa
            </button>
          )}
          {paso > 0 && (
            <button
              type="button"
              className="visor__mini"
              onClick={() => {
                setPos({ id: d.id, paso: 0 });
                setNonce((n) => n + 1);
              }}
            >
              <Icon name="refresh" size={14} /> Desde el principio
            </button>
          )}
          <span className="visor__sp" />
          {mazo.diapos.some((x) => x.examen) && (
            <label className="visor__mini visor__solo">
              <input
                type="checkbox"
                checked={soloExamen}
                onChange={(e) => {
                  const v = e.target.checked;
                  setSoloExamen(v);
                  if (v && !d.examen) {
                    const prim = mazo.diapos.find((x) => x.examen);
                    if (prim) ir(prim);
                  }
                }}
              />
              Solo avisos de examen
            </label>
          )}
        </div>

        {d.aclara && (
          <div className="visor__aclara">
            <h4>Para entenderlo mejor</h4>
            <p>
              <Rich text={d.aclara.text} />
            </p>
            {d.aclara.origen && <small>{d.aclara.origen}</small>}
          </div>
        )}
        <div className="visor__fuentes">
          <Refs refs={d.refs} label="Fuente" />
        </div>
      </div>
    </AssetCtx.Provider>
  );
}
