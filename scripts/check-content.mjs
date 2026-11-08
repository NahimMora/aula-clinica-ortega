// Verificación estática previa al build: el contenido no debe filtrar fuentes privadas
// ni enlaces de Drive, y los capítulos publicados deben tener su carpeta de contenido.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const errors = [];
// Archivos locales excluidos por .gitignore (contienen IDs de Drive y nunca se suben).
const IGNORED = ['drive_manifest.raw.json', 'drive_download_log.json'];
const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const files = [...walk(join(root, 'content')), ...walk(join(root, 'src')), ...walk(join(root, 'docs')), ...walk(join(root, 'scripts')), ...(existsSync(join(root, 'public')) ? walk(join(root, 'public')) : [])];
for (const f of files) {
  if (!/\.(ts|tsx|json|md|css|html|vtt|svg|py|mjs)$/.test(f) || f.endsWith('check-content.mjs') || IGNORED.some((n) => f.endsWith(n))) continue;
  const published = /[\/](content|src|public)[\/]/.test(f.slice(root.length));
  const t = readFileSync(f, 'utf8');
  if (/drive\.google\.com|docs\.google\.com/.test(t)) errors.push(`${f}: contiene un enlace de Google Drive`);
  // IDs de archivos de Drive (33 caracteres que empiezan con 1); los IDs de YouTube tienen 11.
  if (/(^|[^\w-])1[\w-]{32}(?![\w-])/.test(t)) errors.push(`${f}: parece contener un ID de archivo de Drive`);
  if (published && /sources[\/](drive|local)/.test(t) && !f.includes('traceability')) errors.push(`${f}: referencia rutas de fuentes privadas`);
}
const cur = readFileSync(join(root, 'content/curriculum.ts'), 'utf8');
for (const m of cur.matchAll(/ch\('(\w+)', '([\w-]+)',[^)]*'published'\)/g)) {
  if (!existsSync(join(root, 'content/chapters', m[2], 'index.tsx'))) console.warn(`aviso: ${m[2]} está marcado como publicado pero aún no tiene contenido (se mostrará como Próximamente)`);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`check-content: ok (${files.length} archivos revisados)`);
