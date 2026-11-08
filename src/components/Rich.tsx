import { Fragment, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Inline, SourceRef } from '@/types';
import { sourceLabel } from '@content/sources';

/** Renderiza el marcado mínimo: **negrita**, *cursiva*, ==resaltado==, [[capitulo-id|texto]]. */
export function Rich({ text }: { text: Inline }) {
  return <>{parse(text)}</>;
}

const TOKEN = /(\[\[[^|\]]+\|[^\]]+\]\]|\*\*[^*]+\*\*|==[^=]+==|\*[^*\s][^*]*\*)/g;

function parse(text: string): ReactNode[] {
  const parts = text.split(TOKEN);
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith('[[')) {
      const [target, label] = part.slice(2, -2).split('|');
      return (
        <Link key={i} className="xref" to={`/capitulo/${target}`}>
          {label}
        </Link>
      );
    }
    if (part.startsWith('**')) return <strong key={i}>{parse(part.slice(2, -2))}</strong>;
    if (part.startsWith('==')) return <mark key={i}>{part.slice(2, -2)}</mark>;
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function refText(r: SourceRef): string {
  return [sourceLabel(r.src), r.t ? `min ${r.t}` : '', r.p ? `p. ${r.p}` : ''].filter(Boolean).join(' · ');
}

export function Refs({ refs, label = 'Fuente' }: { refs?: SourceRef[]; label?: string }) {
  if (!refs?.length) return null;
  return (
    <div className="refs" aria-label="Fuentes">
      <span className="refs__label">{label}</span>
      {refs.map((r, i) => (
        <span key={i} className="refs__chip" title={r.note ?? refText(r)}>
          {refText(r)}
        </span>
      ))}
    </div>
  );
}
