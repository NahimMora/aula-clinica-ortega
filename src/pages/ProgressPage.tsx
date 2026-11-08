import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SYSTEMS, isAvailable } from '@content/curriculum';
import { exportProgress, importProgress, resetAll, toggleBookmark, useProgress } from '@/lib/progress';
import { Icon } from '@/components/Icon';

export function ProgressPage() {
  const progress = useProgress();
  const file = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const download = () => {
    const blob = new Blob([exportProgress()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aula-clinica-progreso-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMsg('Progreso exportado.');
  };
  const onFile = async (f: File | undefined) => {
    if (!f) return;
    const r = importProgress(await f.text());
    setMsg(r.ok ? 'Progreso importado correctamente.' : r.error);
  };

  const mcqAll = Object.values(progress.mcq).flatMap((m) => m.attempts);
  const acc = mcqAll.length ? Math.round((mcqAll.filter((a) => a.correct).length / mcqAll.length) * 100) : null;

  return (
    <div className="page page--narrow">
      <h1>Mi progreso</h1>
      <p className="muted">Todo se guarda en este navegador. Exportalo para llevarlo a otro dispositivo.</p>

      <div className="stats">
        <div className="stat">
          <span className="stat__n">{Object.values(progress.chapters).filter((c) => c.completed).length}</span>
          <span>capítulos completados</span>
        </div>
        <div className="stat">
          <span className="stat__n">{mcqAll.length}</span>
          <span>respuestas de choice</span>
        </div>
        <div className="stat">
          <span className="stat__n">{acc === null ? '—' : `${acc}%`}</span>
          <span>de aciertos históricos</span>
        </div>
        <div className="stat">
          <span className="stat__n">{Object.values(progress.devs).filter((d) => d.status === 'known').length}</span>
          <span>desarrollos dominados</span>
        </div>
      </div>

      <h2>Capítulos</h2>
      {SYSTEMS.map((s) => {
        const list = s.chapters.filter(isAvailable);
        if (!list.length) return null;
        return (
          <div key={s.id} className="prog-sys">
            <h3>{s.title}</h3>
            <ul>
              {list.map((c) => {
                const pc = progress.chapters[c.id];
                const answered = Object.values(progress.mcq).filter((m) => m.chapterId === c.id);
                const ok = answered.filter((m) => m.attempts[m.attempts.length - 1]?.correct).length;
                return (
                  <li key={c.id}>
                    <Link to={`/capitulo/${c.id}`}>{c.title}</Link>
                    <span className="muted">
                      {pc?.completed ? '✓ completado' : pc ? `${pc.visited.length} secciones vistas` : 'sin empezar'} · choice: {ok}/{answered.length} correctas en el último intento
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      <h2>Historial de simulacros</h2>
      {progress.exams.length === 0 ? (
        <p className="empty">Todavía no hiciste simulacros.</p>
      ) : (
        <table className="btable">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Resultado</th>
              <th>Tiempo</th>
            </tr>
          </thead>
          <tbody>
            {progress.exams.map((e, i) => (
              <tr key={i}>
                <td>{new Date(e.at).toLocaleString('es-AR')}</td>
                <td>
                  {e.correct}/{e.total} ({Math.round((e.correct / e.total) * 100)}%)
                </td>
                <td>
                  {Math.floor(e.seconds / 60)}:{String(e.seconds % 60).padStart(2, '0')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Marcadores</h2>
      {progress.bookmarks.length === 0 ? (
        <p className="empty">Guardá secciones de teoría con el ícono de marcador para volver rápido.</p>
      ) : (
        <ul className="bookmarks">
          {progress.bookmarks.map((b) => (
            <li key={b.id}>
              <Link to={`/capitulo/${b.chapterId}?s=${b.sectionId}`}>{b.label}</Link>
              <button className="iconbtn" onClick={() => toggleBookmark(b)} title="Quitar marcador" aria-label="Quitar marcador">
                <Icon name="trash" size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <h2>Copia de seguridad</h2>
      <div className="backup">
        <button className="btn btn--soft" onClick={download}>
          <Icon name="download" size={16} /> Exportar JSON
        </button>
        <button className="btn btn--soft" onClick={() => file.current?.click()}>
          <Icon name="upload" size={16} /> Importar JSON
        </button>
        <input ref={file} type="file" accept="application/json,.json" hidden onChange={(e) => onFile(e.target.files?.[0])} />
        {!confirmReset ? (
          <button className="btn btn--ghost" onClick={() => setConfirmReset(true)}>
            <Icon name="trash" size={16} /> Borrar todo el progreso
          </button>
        ) : (
          <span className="confirm">
            ¿Seguro? Se pierde todo lo registrado en este navegador.
            <button
              className="btn btn--unknown btn--sm"
              onClick={() => {
                resetAll();
                setConfirmReset(false);
                setMsg('Progreso borrado.');
              }}
            >
              Sí, borrar
            </button>
            <button className="btn btn--ghost btn--sm" onClick={() => setConfirmReset(false)}>
              Cancelar
            </button>
          </span>
        )}
      </div>
      {msg && (
        <p className="toast" role="status">
          {msg}
        </p>
      )}
    </div>
  );
}
