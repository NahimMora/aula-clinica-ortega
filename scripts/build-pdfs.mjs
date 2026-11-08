// Genera los manuales PDF por sistema a partir de la ruta imprimible.
// Uso: node scripts/build-pdfs.mjs <baseUrl> [sistema ...]
// Requiere un servidor sirviendo el build (p. ej. `npx vite preview --port 4791`).
import puppeteer from 'puppeteer-core';
import { mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const [base, ...only] = process.argv.slice(2);
if (!base) throw new Error('Uso: node scripts/build-pdfs.mjs <baseUrl> [sistema ...]');
const TARGETS = [
  { id: 'digestivo', file: 'manual-digestivo.pdf', title: 'Manual de sistema digestivo' },
  { id: 'renal', file: 'manual-renal.pdf', title: 'Manual de sistema nefrourológico' },
  { id: 'neuro', file: 'manual-neuro.pdf', title: 'Manual de sistema nervioso' },
].filter((t) => !only.length || only.includes(t.id));

mkdirSync(join('public', 'pdf'), { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
for (const t of TARGETS) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1240, height: 1754 });
  await page.goto(`${base.replace(/\/$/, '')}/#/imprimir/${t.id}`, { waitUntil: 'load', timeout: 60000 });
  await page.waitForSelector('body[data-print-ready="1"]', { timeout: 60000 });
  const chapters = await page.$$eval('.print__ch', (n) => n.length);
  if (!chapters) {
    console.log(`– ${t.id}: sin capítulos publicados, no se genera PDF`);
    await page.close();
    continue;
  }
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 800));
  const out = join('public', 'pdf', t.file);
  await page.pdf({
    path: out,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `<div style="width:100%;font-size:8px;color:#85798c;padding:0 13mm;display:flex;justify-content:space-between;font-family:Arial,sans-serif"><span>Aula Clínica — ${t.title}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
    margin: { top: '14mm', bottom: '16mm', left: '13mm', right: '13mm' },
  });
  console.log(`✓ ${out} · ${chapters} capítulo(s) · ${(statSync(out).size / 1024).toFixed(0)} KB`);
  await page.close();
}
await browser.close();
