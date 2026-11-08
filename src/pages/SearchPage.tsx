import { useMemo, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAllPublished } from '@/lib/useChapter';
import { chapterDocs, search } from '@/lib/text';
import { MANEUVERS } from '@content/maneuvers';
import { Icon } from '@/components/Icon';
import { Loading } from './Misc';

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const [input, setInput] = useState(q);
  useEffect(() => setInput(q), [q]);
  const chapters = useAllPublished();
  const docs = useMemo(() => {
    if (!chapters) return [];
    const list = chapters.flatMap(chapterDocs);
    MANEUVERS.forEach((m) =>
      list.push({ chapterId: '', chapterTitle: 'Biblioteca de maniobras', sectionId: m.id, title: m.name, kind: 'Teoría', text: [m.explores, m.interpretation, ...m.technique].join(' ') }),
    );
    return list;
  }, [chapters]);
  const results = useMemo(() => search(docs, q), [docs, q]);
  return (
    <div className="page page--narrow">
      <h1>Buscar</h1>
      <form
        className="search search--big"
        onSubmit={(e) => {
          e.preventDefault();
          setParams({ q: input });
        }}
      >
        <Icon name="search" size={19} />
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ej.: acalasia, borra de café, Roma…" autoFocus aria-label="Término de búsqueda" />
      </form>
      {!chapters ? (
        <Loading label="Preparando el índice…" />
      ) : q ? (
        <>
          <p className="muted">
            {results.length} resultado{results.length === 1 ? '' : 's'} para “{q}” en los capítulos publicados.
          </p>
          <ul className="results">
            {results.map((r, i) => (
              <li key={i}>
                <Link to={r.doc.chapterId ? `/capitulo/${r.doc.chapterId}?s=${r.doc.sectionId}` : `/maniobras?m=${r.doc.sectionId}`}>
                  <span className="results__kind">{r.doc.kind}</span>
                  <span className="results__title">{r.doc.title}</span>
                  <span className="results__ch">{r.doc.chapterTitle}</span>
                  <span className="results__snip">{r.snippet}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="muted">Escribí un término para buscar en la teoría, las preguntas, los desarrollos y las mnemotecnias.</p>
      )}
    </div>
  );
}
