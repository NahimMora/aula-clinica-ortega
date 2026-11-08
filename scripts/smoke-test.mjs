// Test de humo con Chrome sin interfaz.
// Uso: node scripts/smoke-test.mjs <baseUrl> <carpetaCapturas> [ruta1 ruta2 ...]
// Ej.: node scripts/smoke-test.mjs http://localhost:4173/aula-clinica-ortega/ ./shots / /capitulo/dig-01
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const [base, outDir, ...routes] = process.argv.slice(2);
if (!base || !outDir) {
  console.error('Uso: node scripts/smoke-test.mjs <baseUrl> <carpetaCapturas> [rutas...]');
  process.exit(2);
}
mkdirSync(outDir, { recursive: true });
const list = routes.length ? routes : ['/', '/sistema/digestivo', '/maniobras', '/practica', '/examen', '/repasar', '/progreso', '/buscar?q=disfagia'];
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
let failures = 0;
for (const [vw, vh, tag] of [[1440, 900, 'desk'], [390, 844, 'mob']]) {
  for (const r of list) {
    const page = await browser.newPage();
    await page.setViewport({ width: vw, height: vh, deviceScaleFactor: 1 });
    const errs = [];
    page.on('console', (m) => m.type() === 'error' && errs.push(`console: ${m.text()}`));
    page.on('pageerror', (e) => errs.push(`pageerror: ${e.message}`));
    // Los medios se piden por rangos y el navegador aborta la descarga tras leer metadatos: no es un error.
    page.on('requestfailed', (q) => !q.url().includes('youtube') && !(/\.(mp4|mp3)$/.test(q.url()) && q.failure()?.errorText === 'net::ERR_ABORTED') && errs.push(`requestfailed: ${q.url()} ${q.failure()?.errorText}`));
    page.on('response', (s) => s.status() >= 400 && !s.url().includes('youtube') && errs.push(`HTTP ${s.status()}: ${s.url()}`));
    const url = base.replace(/\/$/, '') + '/#' + r;
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForSelector('h1', { timeout: 30000 }).catch(() => null);
    await new Promise((res) => setTimeout(res, 1500));
    const info = await page.evaluate(() => ({
      title: document.title,
      h1: document.querySelector('h1')?.textContent?.trim() ?? '(sin h1)',
      overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
      text: document.body.innerText.length,
    }));
    const name = `${tag}_${r.replace(/[^\w]+/g, '_') || 'home'}.png`;
    await page.screenshot({ path: join(outDir, name), fullPage: false });
    const bad = errs.length || info.overflowX || info.text < 200 || info.h1.includes('No encontramos');
    if (bad) failures++;
    console.log(`${bad ? 'FAIL' : 'ok  '} [${tag}] ${r} — h1: "${info.h1}" · texto: ${info.text} · overflowX: ${info.overflowX}${errs.length ? '\n      ' + errs.join('\n      ') : ''}`);
    await page.close();
  }
}
await browser.close();
console.log(failures ? `\n${failures} verificación(es) con problemas` : '\nTodo ok');
process.exit(failures ? 1 : 0);
