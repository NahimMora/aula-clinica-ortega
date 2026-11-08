// Captura secciones de una página como imágenes para revisión visual.
// Uso: node scripts/shoot-sections.mjs <url> <carpeta> <ancho> <selector1> [selector2 ...]
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const [url, out, width, ...sels] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: Number(width), height: 1000, deviceScaleFactor: 1 });
const errs = [];
page.on('pageerror', (e) => errs.push(e.message));
page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
page.on('requestfailed', (q) => errs.push('requestfailed ' + q.url()));
await page.goto(url, { waitUntil: 'load', timeout: 60000 });
await page.waitForSelector('h1', { timeout: 30000 });
await new Promise((r) => setTimeout(r, 1200));
for (const sel of sels) {
  const el = await page.$(sel);
  if (!el) { console.log('NO ENCONTRADO', sel); continue; }
  await el.evaluate((n) => n.scrollIntoView({ block: 'start' }));
  await new Promise((r) => setTimeout(r, 700));
  const box = await el.boundingBox();
  const name = `${width}_${sel.replace(/[^\w]+/g, '_')}.png`;
  const h = Math.min(box.height, 2600);
  await page.screenshot({ path: join(out, name), clip: { x: Math.max(0, box.x - 8), y: box.y - 8 + (await page.evaluate(() => window.scrollY)), width: Math.min(box.width + 16, Number(width)), height: h + 16 }, captureBeyondViewport: true });
  console.log('ok', sel, Math.round(box.height) + 'px');
}
console.log(errs.length ? 'ERRORES:\n' + errs.join('\n') : 'sin errores de consola');
await browser.close();
