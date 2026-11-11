// Junta en content/examen/citas.json todas las preguntas de examen marcadas en el contenido:
//  · los avisos `examen` de las diapositivas (origen «ortega»: lo dice él; «preguntero»: preguntero de la cátedra),
//  · las frases textuales de los desarrollos que no repiten un aviso de diapositiva,
//  · las notas del profesor en las maniobras.
// Se regenera con `npm run preguntas` cada vez que cambia un capítulo. La página /preguntas lee solo este JSON.
import { build } from 'esbuild';
import { mkdtempSync, readdirSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const tmp = mkdtempSync(join(tmpdir(), 'preguntas-'));

async function cargar(entry, nombre) {
  const outfile = join(tmp, `${nombre}.mjs`);
  await build({
    entryPoints: [join(root, entry)],
    bundle: true,
    format: 'esm',
    platform: 'node',
    outfile,
    jsx: 'automatic',
    alias: { '@': join(root, 'src'), '@content': join(root, 'content') },
    loader: { '.svg': 'text', '.css': 'empty' },
    define: { 'import.meta.env.BASE_URL': '"/"', 'import.meta.glob': '__glob' },
    banner: { js: 'const __glob = () => ({});' },
    logLevel: 'error',
  });
  return import(pathToFileURL(outfile).href);
}

const seg = (t) => (t ? t.split(':').reduce((a, x) => a * 60 + Number(x), 0) : NaN);
const cerca = (a, b) => a && b && a.src === b.src && Math.abs(seg(a.t) - seg(b.t)) <= 90;
const limpiar = (s) => s.trim().replace(/^[«“"]+|[»”"]+$/g, '').trim();
// Frases en las que él avisa que se toma (para no sumar citas que solo explican).
const AVISO = /pregunt|boch|padre nuestro|palma de (su|la) mano|no se olvid|tienen que sab|no me pueden no/i;

/*
 * Respuesta en forma compacta (sin ilustración), para leerla en la misma página:
 *   { t: 'p', text } · { t: 'ul', items, ol? } · { t: 'def', term, text } · { t: 'tabla', head, filas }
 *   { t: 'cols', cols: [{ titulo, items }] } · { t: 'cadena', pasos } · { t: 'arbol', nodos: [{ t, d?, hijos? }] }
 */
const arbol = (n) => ({ t: n.t, d: n.d, hijos: n.hijos?.map(arbol) });
function desdeDiapo(bloques) {
  const out = [];
  for (const b of bloques ?? []) {
    if (b.t === 'texto' || b.t === 'clave') out.push({ t: 'p', text: b.text, clave: b.t === 'clave' || undefined });
    else if (b.t === 'lista') out.push({ t: 'ul', items: b.items });
    else if (b.t === 'def') out.push({ t: 'def', term: b.term, text: b.text });
    else if (b.t === 'cuadro') out.push({ t: 'tabla', head: b.head, filas: b.filas });
    else if (b.t === 'comparar') out.push({ t: 'cols', cols: b.cols.map((c) => ({ titulo: c.titulo, items: c.items })) });
    else if (b.t === 'cadena') out.push({ t: 'cadena', pasos: b.pasos.map((x) => x.text) });
    else if (b.t === 'secuencia') out.push({ t: 'ul', ol: b.flechas || undefined, items: b.items.map((x) => (x.d ? `**${x.t}**: ${x.d}` : `**${x.t}**`)) });
    else if (b.t === 'arbol') out.push({ t: 'arbol', nodos: [arbol(b.raiz)] });
    else if (b.t === 'prof') out.push({ t: 'p', text: `Ortega: *${b.text}*` });
    else if (b.t === 'fotos') {
      const pies = b.items.map((x) => x.pie).filter(Boolean);
      if (pies.length) out.push({ t: 'ul', items: pies });
    } else if (b.t === 'foto' && b.pie) out.push({ t: 'p', text: b.pie });
  }
  return out;
}
function desdeTeoria(bloques) {
  const out = [];
  for (const b of bloques ?? []) {
    if (b.t === 'p' || b.t === 'lead') out.push({ t: 'p', text: b.text });
    else if (b.t === 'h') out.push({ t: 'p', text: `**${b.text}**` });
    else if (b.t === 'list') out.push({ t: 'ul', items: b.items, ol: b.ordered || undefined });
    else if (b.t === 'def') out.push({ t: 'def', term: b.term, text: b.text });
    else if (b.t === 'callout') {
      if (b.text) out.push({ t: 'p', text: b.title ? `**${b.title}:** ${b.text}` : b.text });
      if (b.items?.length) out.push({ t: 'ul', items: b.items });
    } else if (b.t === 'table') out.push({ t: 'tabla', head: b.head, filas: b.rows });
    else if (b.t === 'cards' || b.t === 'steps') b.items.forEach((x) => out.push({ t: 'def', term: x.title, text: x.text }));
    else if (b.t === 'kv') b.items.forEach((x) => out.push({ t: 'def', term: x.k, text: x.v }));
    else if (b.t === 'chain') out.push({ t: 'cadena', pasos: b.items.map((x) => x.label) });
    else if (b.t === 'compare') out.push({ t: 'cols', cols: b.cols.map((c) => ({ titulo: c.title, items: c.items })) });
    else if (b.t === 'accordion') b.items.forEach((x) => out.push({ t: 'p', text: `**${x.title}**` }, ...desdeTeoria(x.blocks)));
  }
  return out;
}
// Si la diapositiva dice poco sin su dibujo, se suma su «Para entenderlo mejor».
const conAclara = (resp, aclara) => (aclara && JSON.stringify(resp).length < 260 ? [...resp, { t: 'p', text: aclara.text }] : resp);
const desdeManiobra = (m) => [
  { t: 'ul', ol: true, items: m.technique },
  { t: 'def', term: 'Patológico', text: m.pathologic },
  { t: 'def', term: 'Interpretación', text: m.interpretation },
];

try {
  const { SYSTEMS } = await cargar('content/curriculum.ts', 'curriculum');
  const { MANEUVERS } = await cargar('content/maneuvers/index.ts', 'maniobras');
  const sistemas = [];
  for (const s of SYSTEMS.filter((x) => ['digestivo', 'renal', 'neuro'].includes(x.id))) {
    const capitulos = [];
    for (const meta of s.chapters) {
      if (!readdirSync(join(root, 'content/chapters')).includes(meta.id)) continue;
      const ch = (await cargar(`content/chapters/${meta.id}/index.tsx`, meta.id)).default;
      const items = [];
      for (const [tab, mazo] of [['fisio', ch.clase?.fisio], ['teoria', ch.clase?.teoria]]) {
        for (const d of mazo?.diapos ?? []) {
          if (!d.examen) continue;
          const e = d.examen;
          items.push({ id: `${meta.id}:${d.id}`, origen: e.origen, texto: e.texto, cita: e.cita ? limpiar(e.cita) : undefined, ref: e.ref, link: `/capitulo/${meta.id}?t=${tab}&d=${d.id}`, tema: d.titulo, resp: conAclara(desdeDiapo(d.bloques), d.aclara) });
        }
      }
      for (const dv of ch.developments ?? []) {
        if (!dv.quote || dv.origen === 'practica' || !AVISO.test(dv.quote.text)) continue;
        const ref = dv.quote.refs?.[0];
        if (items.some((x) => cerca(x.ref, ref))) continue;
        items.push({ id: `${meta.id}:${dv.id}`, origen: dv.origen === 'preguntero' ? 'preguntero' : 'ortega', texto: dv.question, cita: limpiar(dv.quote.text), ref, link: `/capitulo/${meta.id}?s=d-${dv.id}`, desarrollo: true, resp: dv.keyPoints?.length ? [{ t: 'ul', items: dv.keyPoints }] : desdeTeoria(dv.answer) });
      }
      if (items.length) capitulos.push({ id: meta.id, title: meta.title, items });
    }
    sistemas.push({ id: s.id, title: s.title, tone: s.tone, capitulos });
  }
  // Notas del profesor en las maniobras (las que no repiten una cita ya tomada de un capítulo).
  const todas = sistemas.flatMap((s) => s.capitulos.flatMap((c) => c.items));
  for (const sys of ['digestivo', 'renal', 'neuro', 'soma']) {
    // Maniobras que comparten la misma frase (p. ej., «las maniobras de rodilla…») van juntas.
    const items = [];
    for (const m of MANEUVERS) {
      const nota = m.professorNote;
      if (m.system !== sys || !nota || !AVISO.test(nota.text) || todas.some((x) => cerca(x.ref, nota.refs?.[0]))) continue;
      const ref = nota.refs?.[0];
      const previo = items.find((x) => x.ref?.src === ref?.src && x.ref?.t === ref?.t);
      if (previo) {
        // Varias maniobras: una ficha corta por maniobra.
        if (!previo.varias) previo.resp = [{ t: 'def', term: previo.texto, text: `${previo.m.technique.join(' ')} **Patológico:** ${previo.m.pathologic}` }];
        previo.varias = true;
        previo.resp.push({ t: 'def', term: m.name, text: `${m.technique.join(' ')} **Patológico:** ${m.pathologic}` });
        previo.texto += ` · ${m.name}`;
        continue;
      }
      items.push({ id: `man:${m.id}`, origen: 'ortega', texto: m.name, nota: nota.text, ref, link: `/maniobras?m=${m.id}`, maniobra: true, resp: desdeManiobra(m), m });
    }
    items.forEach((x) => {
      delete x.m;
      delete x.varias;
    });
    if (!items.length) continue;
    let s = sistemas.find((x) => x.id === sys);
    if (!s) sistemas.push((s = { id: 'soma', title: 'Soma', tone: 'peach', capitulos: [] }));
    s.capitulos.push({ id: `man-${sys}`, title: 'Examen físico: maniobras', items });
  }
  mkdirSync(join(root, 'content/examen'), { recursive: true });
  writeFileSync(join(root, 'content/examen/citas.json'), JSON.stringify({ sistemas }) + '\n');
  for (const s of sistemas) {
    const its = s.capitulos.flatMap((c) => c.items);
    console.log(`${s.id}: ${its.length} preguntas (${its.filter((x) => x.origen === 'ortega').length} de Ortega)`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
