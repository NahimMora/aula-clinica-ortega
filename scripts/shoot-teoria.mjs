// Captura cada paso de Teoría de un capítulo (revisión visual).
// Uso: node scripts/shoot-teoria.mjs "<url>#/capitulo/<id>/teoria" <carpeta> [ancho] [temas: 0,3,5]
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
const [url, out, w = '420', only = ''] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const p = await b.newPage();
await p.setViewport({ width: Number(w), height: 1000, deviceScaleFactor: 1 });
const errs = [];
p.on('pageerror', (e) => errs.push(e.message));
p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
await p.goto(url, { waitUntil: 'networkidle2' });
await p.waitForSelector('.lienzo');
const temas = await p.$$eval('.segmento--temas button', (bs) => bs.length);
for (let ti = 0; ti < temas; ti++) {
  if (only && !only.split(',').includes(String(ti))) continue;
  await p.$$eval('.segmento--temas button', (bs, i) => bs[i].click(), ti);
  await new Promise((r) => setTimeout(r, 300));
  const n = await p.$$eval('.puntos i', (x) => x.length);
  for (let k = 0; k < n; k++) {
    await new Promise((r) => setTimeout(r, 1900));
    const el = await p.$('.teoria');
    await el.screenshot({ path: `${out}/t${String(ti).padStart(2, '0')}-${k}.png` });
    if (k < n - 1) await p.$$eval('.dos .boton', (bs) => bs[1].click());
  }
}
console.log(temas, 'temas', errs.length ? errs.join('\n') : 'sin errores');
await b.close();
