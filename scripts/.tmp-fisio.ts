import { TEMAS } from '../content/parcial/temario';
import { readFileSync } from 'node:fs';

for (const t of TEMAS) {
  const filas: string[] = [];
  for (const d of t.diapos) {
    const src = readFileSync(`content/chapters/${d.cap}/clase.ts`, 'utf8');
    for (const id of d.ids) {
      const i = src.indexOf(`id: '${id}'`);
      const m = i >= 0 ? /titulo: '([^']*)'/.exec(src.slice(i, i + 600)) : null;
      filas.push(`${id.startsWith('f-') ? 'F' : ' '} ${d.cap}:${id} — ${m?.[1] ?? '?'}`);
    }
  }
  console.log(`\n## ${t.sistema} · ${t.id}`);
  console.log(filas.join('\n'));
}
