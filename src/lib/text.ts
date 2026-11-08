import type { Block, Chapter, Inline } from '@/types';

/** Normaliza para búsqueda: minúsculas y sin tildes. */
export function norm(s: string): string {
  // Carácter por carácter para conservar la longitud (los índices sirven para recortar fragmentos).
  let out = '';
  for (const ch of s) out += ch.normalize('NFD')[0].toLowerCase();
  return out;
}

/** Quita el marcado inline para indexar o mostrar texto plano. */
export function plain(s: Inline): string {
  return s
    .replace(/\[\[[^|\]]+\|([^\]]+)\]\]/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/==([^=]+)==/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1');
}

export function blocksText(blocks: Block[]): string {
  const out: string[] = [];
  const walk = (b: Block) => {
    switch (b.t) {
      case 'p':
      case 'lead':
      case 'h':
        out.push(b.text);
        break;
      case 'list':
        out.push(...b.items);
        break;
      case 'def':
        out.push(b.term, b.text);
        break;
      case 'callout':
        if (b.title) out.push(b.title);
        if (b.text) out.push(b.text);
        if (b.items) out.push(...b.items);
        break;
      case 'diagram':
        if (b.caption) out.push(b.caption);
        break;
      case 'table':
        out.push(b.head.join(' '), ...b.rows.map((r) => r.join(' ')));
        break;
      case 'cards':
        b.items.forEach((i) => out.push(i.title, i.text));
        break;
      case 'steps':
        b.items.forEach((i) => out.push(i.title, i.text));
        break;
      case 'chain':
        b.items.forEach((i) => out.push(i.label));
        break;
      case 'compare':
        b.cols.forEach((c) => out.push(c.title, ...c.items));
        break;
      case 'accordion':
        b.items.forEach((i) => {
          out.push(i.title);
          i.blocks.forEach(walk);
        });
        break;
      case 'case':
        out.push(b.title, b.text, b.question ?? '', b.answer ?? '');
        break;
      case 'kv':
        b.items.forEach((i) => out.push(i.k, i.v));
        break;
    }
  };
  blocks.forEach(walk);
  return plain(out.join(' \n '));
}

export interface SearchDoc {
  chapterId: string;
  chapterTitle: string;
  sectionId: string;
  title: string;
  kind: 'Teoría' | 'Bases' | 'Choice' | 'Desarrollo' | 'Memoria' | 'Consulta';
  text: string;
}

export function chapterDocs(c: Chapter): SearchDoc[] {
  const base = { chapterId: c.id, chapterTitle: c.title };
  const docs: SearchDoc[] = [];
  c.bases.sections.forEach((s) => docs.push({ ...base, sectionId: `t-${s.id}`, title: s.title, kind: 'Bases', text: blocksText(s.blocks) }));
  c.theory.forEach((s) => docs.push({ ...base, sectionId: `t-${s.id}`, title: s.title, kind: 'Teoría', text: blocksText(s.blocks) }));
  c.quickRef.forEach((q, i) => docs.push({ ...base, sectionId: 'consulta', title: q.title, kind: 'Consulta', text: plain([q.head.join(' '), ...q.rows.map((r) => r.join(' '))].join(' ')) + ' ' + i }));
  c.mcq.forEach((q) => docs.push({ ...base, sectionId: 'choice', title: plain(q.stem).slice(0, 90), kind: 'Choice', text: plain([q.stem, ...q.options.map((o) => o.text + ' ' + o.why)].join(' ')) }));
  c.developments.forEach((d) => docs.push({ ...base, sectionId: 'desarrollos', title: plain(d.question), kind: 'Desarrollo', text: blocksText(d.answer) }));
  c.memory.forEach((m) => docs.push({ ...base, sectionId: 'memoria', title: m.title, kind: 'Memoria', text: plain([m.purpose, m.interpret, m.mnemonic.hook, m.mnemonic.explain].join(' ')) + ' ' + blocksText(m.evaluates) }));
  return docs;
}

export function search(docs: SearchDoc[], query: string): { doc: SearchDoc; score: number; snippet: string }[] {
  const terms = norm(query).split(/\s+/).filter((t) => t.length > 1);
  if (!terms.length) return [];
  const results: { doc: SearchDoc; score: number; snippet: string }[] = [];
  for (const doc of docs) {
    const title = norm(doc.title);
    const body = norm(doc.text);
    let score = 0;
    let all = true;
    for (const t of terms) {
      const inTitle = title.includes(t);
      const count = body.split(t).length - 1;
      if (!inTitle && !count) {
        all = false;
        break;
      }
      score += (inTitle ? 6 : 0) + Math.min(count, 8);
    }
    if (!all) continue;
    const idx = body.indexOf(terms[0]);
    const start = Math.max(0, idx - 70);
    const snippet = (start > 0 ? '…' : '') + doc.text.slice(start, start + 200).replace(/\s+/g, ' ') + '…';
    results.push({ doc, score, snippet });
  }
  return results.sort((a, b) => b.score - a.score).slice(0, 60);
}
