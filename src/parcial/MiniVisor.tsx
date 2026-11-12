// Visor del tema: arma un mazo con diapositivas de uno o varios capítulos existentes (sin copiarlas)
// y lo muestra con el mismo Visor de la clase visual. Primero fisiopatología, después teoría.
import { useEffect, useState } from 'react';
import { loadChapter } from '@/lib/useChapter';
import { findChapter } from '@content/curriculum';
import { Visor } from '@/clase/Visor';
import type { Diapositiva, Mazo } from '@/clase/tipos';
import type { DiaposDe } from '@content/parcial/tipos';
import '@/styles/clase.css';

async function armarMazo(id: string, fuentes: DiaposDe[]): Promise<{ mazo: Mazo; faltan: string[] }> {
  const secciones: Mazo['secciones'] = [];
  const diapos: Diapositiva[] = [];
  const faltan: string[] = [];
  for (const f of fuentes) {
    const c = await loadChapter(f.cap);
    const plan = c?.clase;
    if (!plan) {
      faltan.push(...f.ids.map((x) => `${f.cap}:${x}`));
      continue;
    }
    const todas = [...plan.fisio.diapos, ...plan.teoria.diapos];
    const etiqueta = (d: Diapositiva) => {
      const m = d.id.startsWith('f-') ? plan.fisio : plan.teoria;
      return m.secciones.find((s) => s.id === d.sec)?.label ?? d.sec;
    };
    const corto = findChapter(f.cap)?.title ?? f.cap;
    for (const x of f.ids) {
      const d = todas.find((y) => y.id === x);
      if (!d) {
        faltan.push(`${f.cap}:${x}`);
        continue;
      }
      // La sección lleva el capítulo para no mezclar apartados con el mismo id.
      const sec = `${f.cap}:${d.id.startsWith('f-') ? 'fisio' : d.sec}`;
      if (!secciones.some((s) => s.id === sec)) {
        const label = d.id.startsWith('f-') ? `Fisiopatología · ${corto}` : etiqueta(d);
        secciones.push({ id: sec, label });
      }
      diapos.push({ ...d, id: `${f.cap}:${d.id}`, sec });
    }
  }
  return { mazo: { id: `parcial-${id}`, secciones, diapos }, faltan };
}

export function MiniVisor({ temaId, fuentes, pedida }: { temaId: string; fuentes: DiaposDe[]; pedida?: string }) {
  const [res, setRes] = useState<{ mazo: Mazo; faltan: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let vivo = true;
    setRes(null);
    armarMazo(temaId, fuentes)
      .then((r) => vivo && setRes(r))
      .catch((e: unknown) => vivo && setError(String(e)));
    return () => {
      vivo = false;
    };
  }, [temaId, fuentes]);
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
