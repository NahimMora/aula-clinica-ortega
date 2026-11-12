// Verifica la integridad del módulo «Parcial del lunes»: ids de diapositivas, maniobras, temas,
// relaciones entre preguntas y preguntas existentes que se dicen reunidas. Se corre con `npm run check:parcial`.
import { readFileSync } from 'node:fs';
import { TEMAS } from '../content/parcial/temario';
import { PREGUNTAS } from '../content/parcial/preguntas';
import { PARES } from '../content/parcial/pares';
import { PUNTOS_DOLOROSOS } from '../content/parcial/puntos';
import { MANIOBRAS_PARCIAL } from '../content/parcial/maniobras';
import { MANEUVERS } from '../content/maneuvers/index';
import { SOURCES } from '../content/sources';
import { MAZO_PARCIAL } from '../content/parcial/diapos';
import { CHOICE_DE_CAPITULOS, CHOICE_NUEVOS } from '../content/parcial/choice';

const errores: string[] = [];
const diapos = new Map<string, Set<string>>();
const idsDe = (cap: string) => {
  if (cap === 'parcial') return new Set(MAZO_PARCIAL.diapos.map((d) => d.id));
  if (!diapos.has(cap)) {
    const s = readFileSync(`content/chapters/${cap}/clase.ts`, 'utf8').replace(/\r/g, '');
    diapos.set(cap, new Set([...s.matchAll(/\n\s+id: '([^']+)',\n\s+sec: '/g)].map((m) => m[1])));
  }
  return diapos.get(cap)!;
};
const man = new Set(MANEUVERS.map((m) => m.id));
const citas = JSON.parse(readFileSync('content/examen/citas.json', 'utf8')) as { sistemas: { capitulos: { items: { id: string }[] }[] }[] };
const citaIds = new Set(citas.sistemas.flatMap((s) => s.capitulos.flatMap((c) => c.items.map((i) => i.id))));
const temaIds = new Set(TEMAS.map((t) => t.id));
const pregIds = new Set(PREGUNTAS.map((p) => p.id));
const diapoOk = (ref: string, donde: string) => {
  const [cap, d] = ref.split(':');
  if (!idsDe(cap).has(d)) errores.push(`${donde}: no existe la diapositiva ${ref}`);
};
const fuenteOk = (src: string, donde: string) => {
  if (!SOURCES[src]) errores.push(`${donde}: fuente desconocida ${src}`);
};

for (const t of TEMAS) {
  for (const d of t.diapos) for (const id of d.ids) diapoOk(`${d.cap}:${id}`, `tema ${t.id}`);
  for (const m of t.maniobras ?? []) if (!man.has(m)) errores.push(`tema ${t.id}: no existe la maniobra ${m}`);
  for (const f of t.fuentes) fuenteOk(f.src, `tema ${t.id}`);
}
if (new Set(PREGUNTAS.map((p) => p.id)).size !== PREGUNTAS.length) errores.push('Hay ids de preguntas repetidos');
const textos = new Map<string, string>();
for (const p of PREGUNTAS) {
  if (!temaIds.has(p.tema)) errores.push(`pregunta ${p.id}: tema inexistente ${p.tema}`);
  if (p.diapo) diapoOk(p.diapo, `pregunta ${p.id}`);
  for (const r of p.relaciones ?? []) if (r.to && !pregIds.has(r.to)) errores.push(`pregunta ${p.id}: relación a ${r.to} inexistente`);
  for (const u of p.une ?? []) if (!u.startsWith('oral-') && !u.startsWith('man:') && !citaIds.has(u)) errores.push(`pregunta ${p.id}: reúne ${u}, que no está en citas.json`);
  for (const f of p.fuentes) fuenteOk(f.src, `pregunta ${p.id}`);
  if ((p.estado === 'simulada') !== p.origen.includes('simulada')) errores.push(`pregunta ${p.id}: estado y origen simulada no coinciden`);
  if (!p.oral.trim()) errores.push(`pregunta ${p.id}: sin respuesta oral`);
  const k = p.q.toLowerCase().replace(/[^a-záéíóúñ]/g, '');
  if (textos.has(k)) errores.push(`pregunta ${p.id}: duplica a ${textos.get(k)}`);
  textos.set(k, p.id);
}
for (const x of PARES) {
  for (const m of x.maniobras) if (!man.has(m)) errores.push(`par ${x.n}: no existe la maniobra ${m}`);
  if (x.diapo) diapoOk(x.diapo, `par ${x.n}`);
}
// Diapositivas propias del parcial: narración en cada paso, fuentes conocidas y ninguna sin usar.
const usadas = new Set(TEMAS.flatMap((t) => t.diapos.filter((d) => d.cap === 'parcial').flatMap((d) => d.ids)));
for (const d of MAZO_PARCIAL.diapos) {
  if (!d.voz.length || d.voz.some((v) => !v.trim())) errores.push(`diapositiva ${d.id}: sin narración`);
  const pasos = Math.max(0, ...d.bloques.map((b) => b.en ?? 0));
  if (pasos > d.voz.length - 1) errores.push(`diapositiva ${d.id}: tiene ${pasos + 1} pasos y ${d.voz.length} narraciones`);
  for (const r of d.refs) fuenteOk(r.src, `diapositiva ${d.id}`);
  if (!usadas.has(d.id)) errores.push(`diapositiva ${d.id}: no la usa ningún tema`);
}
// Choice: los de los capítulos existen, los temas existen, las respuestas son válidas y no hay ids repetidos.
const mcqDe = new Map<string, Set<string>>();
for (const [tema, fuentes] of Object.entries(CHOICE_DE_CAPITULOS)) {
  if (!temaIds.has(tema)) errores.push(`choice: tema inexistente ${tema}`);
  for (const { cap, ids } of fuentes) {
    if (!mcqDe.has(cap)) mcqDe.set(cap, new Set([...readFileSync(`content/chapters/${cap}/index.tsx`, 'utf8').matchAll(/id: '([a-z0-9]+-[qx]\d+)'/g)].map((m) => m[1])));
    for (const id of ids) if (!mcqDe.get(cap)!.has(id)) errores.push(`choice ${tema}: no existe ${cap}:${id}`);
  }
}
const idsChoice = new Set<string>();
for (const c of CHOICE_NUEVOS) {
  if (!temaIds.has(c.tema)) errores.push(`choice ${c.id}: tema inexistente ${c.tema}`);
  if (idsChoice.has(c.id)) errores.push(`choice ${c.id}: id repetido`);
  idsChoice.add(c.id);
  if (c.answer < 0 || c.answer >= c.options.length) errores.push(`choice ${c.id}: respuesta fuera de las opciones`);
  if (c.options.some((o) => !o.why.trim())) errores.push(`choice ${c.id}: opción sin explicación`);
  for (const r of c.refs ?? []) fuenteOk(r.src, `choice ${c.id}`);
}
for (const t of TEMAS) {
  const n = (CHOICE_DE_CAPITULOS[t.id] ?? []).reduce((a, f) => a + f.ids.length, 0) + CHOICE_NUEVOS.filter((c) => c.tema === t.id).length;
  if (n < 4) errores.push(`tema ${t.id}: solo ${n} choice`);
}
for (const p of PUNTOS_DOLOROSOS) for (const r of p.refs) fuenteOk(r.src, `punto ${p.id}`);
for (const [s, d] of Object.entries(MANIOBRAS_PARCIAL))
  for (const g of d.grupos) {
    for (const m of g.ids) if (!man.has(m)) errores.push(`maniobras ${s}/${g.titulo}: no existe ${m}`);
    if (g.tema && !temaIds.has(g.tema)) errores.push(`maniobras ${s}/${g.titulo}: tema ${g.tema} inexistente`);
  }
// Toda maniobra que está en un tema aparece en el apartado general.
const general = new Set(Object.values(MANIOBRAS_PARCIAL).flatMap((d) => d.grupos.flatMap((g) => g.ids)));
for (const t of TEMAS) for (const m of t.maniobras ?? []) if (!general.has(m)) errores.push(`maniobra ${m} (tema ${t.id}) no está en el apartado general`);

const reales = PREGUNTAS.filter((p) => p.estado !== 'simulada').length;
const totalChoice = Object.values(CHOICE_DE_CAPITULOS).flat().reduce((a, f) => a + f.ids.length, 0) + CHOICE_NUEVOS.length;
console.log(`check-parcial: ${totalChoice} choice · ${TEMAS.length} temas · ${PREGUNTAS.length} preguntas (${reales} reales) · ${PARES.length} pares · ${PUNTOS_DOLOROSOS.length} puntos`);
if (errores.length) {
  console.error(errores.join('\n'));
  process.exit(1);
}
console.log('check-parcial: ok');

// Informe (no falla): preguntas de Ortega de los capítulos del parcial que el banco todavía no reúne.
if (process.argv.includes('--informe')) {
  const caps = new Set(TEMAS.flatMap((t) => [...t.capitulos, ...t.diapos.map((d) => d.cap)]));
  const unidas = new Set(PREGUNTAS.flatMap((p) => p.une ?? []));
  const todas = (citas as unknown as { sistemas: { capitulos: { id: string; items: { id: string; origen: string; texto: string }[] }[] }[] }).sistemas.flatMap((s) => s.capitulos);
  for (const c of todas) {
    if (!caps.has(c.id)) continue;
    const sueltas = c.items.filter((i) => i.origen === 'ortega' && !unidas.has(i.id));
    if (sueltas.length) console.log(`${c.id}: ${sueltas.map((i) => `${i.id} «${i.texto.slice(0, 70)}»`).join('\n   ')}`);
  }
}

// Matriz de cobertura en Markdown (para docs/progress/PARCIAL.md): `npm run check:parcial -- --matriz`.
if (process.argv.includes('--matriz')) {
  const filas = TEMAS.map((t) => {
    const ps = PREGUNTAS.filter((p) => p.tema === t.id);
    const rep = t.fuentes.filter((f) => f.src === 'repaso-1111').map((f) => f.t).join(', ') || '—';
    const otras = [...new Set(t.fuentes.filter((f) => f.src !== 'repaso-1111').map((f) => (f.src === 'pizarra-repaso' ? 'pizarra repaso' : f.src === 'oral-1011' ? 'oral 10/11' : f.src)))].join(', ');
    return `| ${t.sistema} | ${t.titulo} | ${t.prioridad} | ${rep} | ${otras} | ${t.capitulos.join(', ')} | ${t.diapos.reduce((a, d) => a + d.ids.length, 0)} | ${(t.maniobras ?? []).length} | ${ps.length} (${ps.filter((p) => p.estado !== 'simulada').length} reales) |`;
  });
  console.log(['| Sistema | Tema | Prioridad | Repaso 11/11 (min) | Otras fuentes | Capítulos | Diapos | Maniobras | Preguntas |', '|---|---|---|---|---|---|---|---|---|', ...filas].join('\n'));
  const est = ['confirmada', 'ampliada', 'nueva', 'anterior', 'simulada'].map((e) => `${e}: ${PREGUNTAS.filter((p) => p.estado === e).length}`).join(' · ');
  console.log(`\nPreguntas por estado: ${est}`);
  for (const e of ['confirmada', 'ampliada', 'nueva']) console.log(`\n**${e}**: ${PREGUNTAS.filter((p) => p.estado === e).map((p) => p.q.replace(/\*\*/g, '')).join(' · ')}`);
}
