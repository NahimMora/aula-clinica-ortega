// Videos del tema: la clase narrada de cada capítulo del tema (la misma de la pestaña «Video» del capítulo),
// con las partes que entran en el parcial marcadas a partir de las diapositivas que usa el tema.
import { useEffect, useState } from 'react';
import { loadChapter } from '@/lib/useChapter';
import { VideoPlayer } from '@/components/VideoPlayer';
import { findChapter } from '@content/curriculum';
import type { VideoMeta } from '@/types';
import type { TemaParcial } from '@content/parcial/tipos';

export interface VideoCap {
  cap: string;
  titulo: string;
  video: VideoMeta;
  repaso?: VideoMeta;
  relevantes: number[];
}

export async function videosDe(t: TemaParcial): Promise<VideoCap[]> {
  const caps = [...new Set([...t.capitulos, ...t.diapos.map((d) => d.cap)])];
  const out: VideoCap[] = [];
  for (const cap of caps) {
    const c = await loadChapter(cap);
    const video = c?.clase?.video ?? c?.video;
    if (!c || !video) continue;
    const plan = c.clase;
    // Partes del video: «Fisiopatología · <sección>» y «Teoría · <sección>», las mismas secciones de las diapositivas.
    const etiquetas = new Set<string>();
    if (plan) {
      for (const id of t.diapos.filter((d) => d.cap === cap).flatMap((d) => d.ids)) {
        const fisio = id.startsWith('f-');
        const mazo = fisio ? plan.fisio : plan.teoria;
        const d = mazo.diapos.find((x) => x.id === id);
        const sec = d && mazo.secciones.find((s) => s.id === d.sec);
        if (sec) etiquetas.add(`${fisio ? 'Fisiopatología' : 'Teoría'} · ${sec.label}`);
      }
    }
    const relevantes = video.chapters.flatMap((ch, i) => (etiquetas.has(ch.label) ? [i] : []));
    out.push({ cap, titulo: findChapter(cap)?.title ?? c.title, video, repaso: plan?.repaso, relevantes });
  }
  return out;
}

export function VideosTema({ t }: { t: TemaParcial }) {
  const [res, setRes] = useState<VideoCap[] | null>(null);
  const [sel, setSel] = useState(0);
  useEffect(() => {
    let vivo = true;
    setRes(null);
    setSel(0);
    videosDe(t)
      .then((r) => vivo && setRes(r))
      .catch(() => vivo && setRes([]));
    return () => {
      vivo = false;
    };
  }, [t]);
  if (!res) return <p className="empty">Cargando videos…</p>;
  if (!res.length) return <p className="empty">Este tema no tiene clase en video: repasalo con las maniobras (cada una tiene su fragmento).</p>;
  const v = res[Math.min(sel, res.length - 1)];
  return (
    <div className="pvideos">
      {res.length > 1 && (
        <div className="pvideos__tabs" role="tablist" aria-label="Videos del tema">
          {res.map((x, i) => (
            <button key={x.cap} role="tab" aria-selected={i === sel} className={`btn ${i === sel ? 'btn--soft' : 'btn--ghost'}`} onClick={() => setSel(i)}>
              {x.titulo} · {x.video.duration}
            </button>
          ))}
        </div>
      )}
      <p className="pvideos__nota">
        <strong>{v.titulo}</strong>
        {v.relevantes.length > 0
          ? ` · ${v.relevantes.length} de ${v.video.chapters.length} partes entran en este tema (marcadas «Entra»): tocá una para ir directo.`
          : ' · clase completa del capítulo.'}
      </p>
      <VideoPlayer key={v.cap} video={v.video} title={v.titulo} relevantes={v.relevantes} />
      {v.repaso && (
        <details className="clase__repaso">
          <summary>Video breve de repaso ({v.repaso.duration}): no reemplaza a la clase</summary>
          <VideoPlayer video={v.repaso} title={`${v.titulo}: repaso`} />
        </details>
      )}
    </div>
  );
}
