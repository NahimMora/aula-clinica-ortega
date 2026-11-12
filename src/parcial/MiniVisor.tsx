// Visor del tema: arma un mazo con diapositivas de uno o varios capítulos existentes (sin copiarlas)
// y lo muestra con el mismo Visor de la clase visual. Primero fisiopatología, después teoría.
import { useEffect, useState } from 'react';
import { loadChapter } from '@/lib/useChapter';
import { findChapter } from '@content/curriculum';
import { Visor } from '@/clase/Visor';
import type { Diapositiva, Mazo } from '@/clase/tipos';
import type { DiaposDe } from '@content/parcial/tipos';
import { MAZO_PARCIAL } from '@content/parcial/diapos';
import '@/styles/clase.css';

export async function planDe(cap: string): Promise<{ fisio: Mazo; teoria: Mazo } | null> {
  if (cap === 'parcial') return { fisio: { id: 'parcial-fisio', secciones: [], diapos: [] }, teoria: MAZO_PARCIAL };
  return (await loadChapter(cap))?.clase ?? null;
}

/** Arma el mazo del tema. Con `junto`, cada diapositiva de fisiopatología queda en el apartado de la teoría que la sigue (o la precede). */
export async function armarMazo(id: string, fuentes: DiaposDe[], junto = false): Promise<{ mazo: Mazo; faltan: string[] }> {
  const secciones: Mazo['secciones'] = [];
  const diapos: Diapositiva[] = [];
  const faltan: string[] = [];
  for (const f of fuentes) {
    const plan = await planDe(f.cap);
    if (!plan) {
      faltan.push(...f.ids.map((x) => `${f.cap}:${x}`));
      continue;
    }
    const todas = [...plan.fisio.diapos, ...plan.teoria.diapos];
    const etiqueta = (d: Diapositiva) => {
      const m = d.id.startsWith('f-') ? plan.fisio : plan.teoria;
      return m.secciones.find((s) => s.id === d.sec)?.label ?? d.sec;
    };
    const corto = f.cap === 'parcial' ? 'Repaso' : (findChapter(f.cap)?.title ?? f.cap);
    const encontradas = f.ids.map((x) => todas.find((y) => y.id === x));
    encontradas.forEach((d, i) => {
      if (!d) {
        faltan.push(`${f.cap}:${f.ids[i]}`);
        return;
      }
      const esF = d.id.startsWith('f-');
      // Junto: la fisiopatología toma el apartado de la teoría vecina.
      const vecina = junto && esF ? (encontradas.slice(i + 1).find((x) => x && !x.id.startsWith('f-')) ?? encontradas.slice(0, i).reverse().find((x) => x && !x.id.startsWith('f-'))) : undefined;
      const base = vecina ?? d;
      const baseF = base.id.startsWith('f-');
      // La sección lleva el capítulo para no mezclar apartados con el mismo id.
      const sec = `${f.cap}:${baseF ? 'fisio' : base.sec}`;
      if (!secciones.some((s) => s.id === sec)) {
        const label = baseF ? `Fisiopatología · ${corto}` : etiqueta(base);
        secciones.push({ id: sec, label });
      }
      diapos.push({ ...d, id: `${f.cap}:${d.id}`, sec });
    });
  }
  return { mazo: { id: `parcial-${id}`, secciones, diapos }, faltan };
}

export function MiniVisor({ temaId, fuentes, pedida, junto = false }: { temaId: string; fuentes: DiaposDe[]; pedida?: string; junto?: boolean }) {
  const [res, setRes] = useState<{ mazo: Mazo; faltan: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let vivo = true;
    setRes(null);
    armarMazo(temaId, fuentes, junto)
      .then((r) => vivo && setRes(r))
      .catch((e: unknown) => vivo && setError(String(e)));
    return () => {
      vivo = false;
    };
  }, [temaId, fuentes, junto]);
  if (error) return <p className="empty">No se pudieron cargar las diapositivas ({error}).</p>;
  if (!res) return <p className="empty">Cargando diapositivas…</p>;
  if (!res.mazo.diapos.length) return <p className="empty">Este tema no tiene diapositivas propias: estudialo con las maniobras.</p>;
  return (
    <>
      <Visor mazo={res.mazo} chapterId={`parcial-${temaId}`} diapoPedida={pedida} />
      {import.meta.env.DEV && res.faltan.length > 0 && <p className="empty">Faltan: {res.faltan.join(', ')}</p>}
    </>
  );
}
