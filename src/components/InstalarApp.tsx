// Botón «Instalar como app»: aparece cuando el navegador ofrece instalar la página (Chrome, Edge, Android).
// En iPhone (Safari) no existe ese aviso: se explica cómo agregarla a la pantalla de inicio.
import { useEffect, useState } from 'react';
import { Icon } from './Icon';

interface AvisoInstalar extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let guardado: AvisoInstalar | null = null;
const oyentes = new Set<() => void>();
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    guardado = e as AvisoInstalar;
    oyentes.forEach((f) => f());
  });
  window.addEventListener('appinstalled', () => {
    guardado = null;
    oyentes.forEach((f) => f());
  });
}

const instalada = () => typeof window !== 'undefined' && (window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true);
const esIOS = () => typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent);

export function InstalarApp() {
  const [, refrescar] = useState(0);
  const [ayuda, setAyuda] = useState(false);
  useEffect(() => {
    const f = () => refrescar((n) => n + 1);
    oyentes.add(f);
    return () => {
      oyentes.delete(f);
    };
  }, []);
  if (instalada()) return null;
  if (guardado) {
    return (
      <button
        type="button"
        className="instalar"
        onClick={async () => {
          const e = guardado;
          if (!e) return;
          await e.prompt();
          await e.userChoice;
          guardado = null;
          refrescar((n) => n + 1);
        }}
      >
        <Icon name="download" size={16} /> Instalar como app
      </button>
    );
  }
  if (!esIOS()) return null;
  return (
    <div className="instalar-ios">
      <button type="button" className="instalar" onClick={() => setAyuda((v) => !v)}>
        <Icon name="download" size={16} /> Instalar como app
      </button>
      {ayuda && <p>En Safari: tocá el botón de compartir (el cuadrado con la flecha) y elegí «Agregar a inicio».</p>}
    </div>
  );
}
