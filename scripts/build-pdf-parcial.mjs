// Genera el PDF del parcial de un sistema a partir de la ruta imprimible /imprimir-parcial/:sistema.
// Uso: node scripts/build-pdf-parcial.mjs <baseUrl> [--compacto] [sistema ...]   (por defecto: neuro)
// --compacto: versión para imprimir, a dos columnas y solo teoría (parcial-<sistema>-imprimir.pdf).
import puppeteer from 'puppeteer-core';
import { mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const [base, ...resto] = process.argv.slice(2);
const compacto = resto.includes('--compacto');
const pedidos = resto.filter((x) => !x.startsWith('--'));
if (!base) throw new Error('Uso: node scripts/build-pdf-parcial.mjs <baseUrl> [sistema ...]');
const NOMBRES = { digestivo: 'Aparato digestivo', renal: 'Aparato renal', neuro: 'Sistema nervioso', soma: 'SOMA' };
const sistemas = pedidos.length ? pedidos : ['neuro'];

mkdirSync(join('public', 'pdf'), { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
for (const s of sistemas) {
  const page = await browser.newPage();
  const errores = [];
  page.on('pageerror', (e) => errores.push(e.message));
  await page.setViewport({ width: 1240, height: 1754 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(`${base.replace(/\/$/, '')}/#/imprimir-parcial/${s}${compacto ? '/compacto' : ''}`, { waitUntil: 'load', timeout: 60000 });
  await page.waitForSelector('body[data-print-ready="1"]', { timeout: 120000 });
  await page.evaluate(() => document.fonts.ready);
  // Las fotos de las diapositivas: esperar a que carguen todas.
  await page.evaluate(() => Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => ((i.onload = r), (i.onerror = r)))))));
  await new Promise((r) => setTimeout(r, 1000));
  const info = await page.evaluate(() => ({ temas: document.querySelectorAll('.pimp__tema, .pc__tema').length, diapos: document.querySelectorAll('.pimp__diapo, .pc__diapo').length, preguntas: document.querySelectorAll('.pimp__preg, .pc__preg').length }));
  const out = join('public', 'pdf', `parcial-${s}${compacto ? '-imprimir' : ''}.pdf`);
  await page.pdf({
    path: out,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `<div style="width:100%;font-size:8px;color:#85798c;padding:0 ${compacto ? 9 : 13}mm;display:flex;justify-content:space-between;font-family:Arial,sans-serif"><span>Aula Clínica — Parcial oral: ${NOMBRES[s] ?? s}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
    margin: compacto ? { top: '9mm', bottom: '12mm', left: '9mm', right: '9mm' } : { top: '14mm', bottom: '16mm', left: '13mm', right: '13mm' },
  });
  console.log(`✓ ${out} · ${info.temas} temas · ${info.diapos} diapositivas · ${info.preguntas} preguntas · ${(statSync(out).size / 1024).toFixed(0)} KB`);
  if (errores.length) console.log('  errores en la página:', errores.slice(0, 5));
  await page.close();
}
await browser.close();
