// Visor de diapositivas: barra de apartados, avance manual y aclaraciones debajo.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Refs, Rich } from '@/components/Rich';
import { Icon } from '@/components/Icon';
import { asset } from '@/components/VideoPlayer';
import { AssetCtx, Diapositiva, type Reloj } from './Diapositiva';
import type { Diapositiva as D, Mazo } from './tipos';

const PASO_S = 0.55;

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

/** Avanza los pasos y el tiempo de la diapositiva. Si ya fue vista, arranca completa. */
function useReloj(d: D, completa: boolean, nonce: number, visible: () => boolean): Reloj {
  const max = Math.max(0, d.voz.length - 1);
  const [r, setR] = useState<Reloj>({ t: 0, paso: completa ? max : 0, dt: completa ? 9 : 0 });
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setR({ t: 0, paso: max, dt: 9 });
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    let ult = 0;
    const continua = Boolean(d.fig);
    const fin = (max + 1) * PASO_S + 0.6;
    const tick = (now: number) => {
      // El sello de requestAnimationFrame puede ser anterior a t0.
      const t = Math.max(0, (now - t0) / 1000);
      if (now - ult >= 33 && (visible() || t < 0.1)) {
        ult = now;
        const paso = completa ? max : Math.min(max, Math.floor(t / PASO_S));
        setR({ t, paso, dt: completa ? 9 : t - paso * PASO_S });
      }
      if (continua || t < fin) raf = requestAnimationFrame(tick);
    };
    setR({ t: 0, paso: completa ? max : 0, dt: completa ? 9 : 0 });
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [d.id, d.fig, completa, max, nonce, visible]);
  return r;
}

export function Visor({ mazo, chapterId, seccionPedida }: { mazo: Mazo; chapterId: string; seccionPedida?: string }) {
  const claveIdx = `aula:clase:${chapterId}:${mazo.id}`;
  const claveVistas = `aula:clase:${chapterId}:vistas`;
  const [soloExamen, setSoloExamen] = useState(false);
  const lista = useMemo(() => (soloExamen ? mazo.diapos.filter((d) => d.examen) : mazo.diapos), [mazo, soloExamen]);
  const [id, setId] = useState(() => {
    const g = leer(claveIdx);
    return g && mazo.diapos.some((d) => d.id === g) ? g : mazo.diapos[0].id;
  });
  const [nonce, setNonce] = useState(0);
  const vistas = useRef<Set<string>>(new Set<string>((() => {
    try {
      return JSON.parse(leer(claveVistas) ?? '[]') as string[];
    } catch {
      return [];
    }
  })()));
  const idx = Math.max(0, lista.findIndex((d) => d.id === id));
  const d = lista[idx] ?? lista[0];
  const [completa, setCompleta] = useState(() => vistas.current.has(d.id));
  const barra = useRef<HTMLDivElement>(null);
  const escenario = useRef<HTMLDivElement>(null);
  const enPantalla = useRef(true);
  const visible = useCallback(() => enPantalla.current, []);
  const reloj = useReloj(d, completa, nonce, visible);
  const secActual = d.sec;

  const ir = useCallback(
    (nuevo: D) => {
      setCompleta(vistas.current.has(nuevo.id));
      setId(nuevo.id);
    },
    [],
  );

  useEffect(() => {
    guardar(claveIdx, d.id);
    if (!vistas.current.has(d.id)) {
      vistas.current.add(d.id);
      guardar(claveVistas, JSON.stringify([...vistas.current]));
    }
  }, [d.id, claveIdx, claveVistas]);

  // Salto pedido desde afuera (enlace profundo).
  useEffect(() => {
    if (!seccionPedida) return;
    const prim = mazo.diapos.find((x) => x.sec === seccionPedida);
    if (prim) ir(prim);
  }, [seccionPedida, mazo, ir]);

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

  const ant = lista[idx - 1];
  const sig = lista[idx + 1];

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.altKey || e.ctrlKey || e.metaKey || /^(INPUT|TEXTAREA|SELECT|VIDEO|IFRAME)$/.test(el.tagName)) return;
      if (e.key === 'ArrowRight' && sig) ir(sig);
      if (e.key === 'ArrowLeft' && ant) ir(ant);
    };
    window.addEventListener('keydown', tecla);
    return () => window.removeEventListener('keydown', tecla);
  }, [ant, sig, ir]);

  const toque = useRef<number | null>(null);

  const seccionesVisibles = mazo.secciones.filter((s) => lista.some((x) => x.sec === s.id));
  const nombreSec = mazo.secciones.find((s) => s.id === d.sec)?.label;
  const posTotal = soloExamen ? `${idx + 1} / ${lista.length} con aviso` : `${idx + 1} / ${lista.length}`;

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
            toque.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (toque.current === null) return;
            const dx = e.changedTouches[0].clientX - toque.current;
            toque.current = null;
            if (Math.abs(dx) < 60) return;
            if (dx < 0 && sig) ir(sig);
            if (dx > 0 && ant) ir(ant);
          }}
        >
          <Diapositiva key={d.id} d={d} reloj={reloj} seccion={nombreSec} />
        </div>

        <div className="visor__control">
          <button type="button" className="visor__nav" onClick={() => ant && ir(ant)} disabled={!ant} aria-label="Diapositiva anterior">
            <Icon name="chevronLeft" size={20} />
          </button>
          <span className="visor__n" aria-live="polite">
            {posTotal}
          </span>
          <button type="button" className="visor__nav visor__nav--sig" onClick={() => sig && ir(sig)} disabled={!sig} aria-label="Diapositiva siguiente">
            <Icon name="chevronRight" size={20} />
          </button>
          <span className="visor__sp" />
          <button
            type="button"
            className="visor__mini"
            onClick={() => {
              setCompleta(false);
              setNonce((n) => n + 1);
            }}
          >
            <Icon name="refresh" size={14} /> Repetir animación
          </button>
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
