// Test de interacción de un capítulo con Chrome sin interfaz.
// Uso: node scripts/interaction-test.mjs <baseUrl> <capituloId> <carpetaCapturas>
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const [base, chapterId, out] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const url = (r) => base.replace(/\/$/, '') + '/#' + r;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = [];
const check = (name, ok, extra = '') => {
  results.push({ name, ok });
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`);
};

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage();
await page.setViewport({ width: 1366, height: 900 });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => m.type() === 'error' && !m.text().includes('youtube') && errors.push(m.text()));
page.on('response', (r) => r.status() >= 400 && !r.url().includes('youtube') && errors.push(`HTTP ${r.status()} ${r.url()}`));

await page.goto(url(`/capitulo/${chapterId}`), { waitUntil: 'load' });
await page.waitForSelector('#ubicate', { timeout: 30000 });
await sleep(800);

// 1. Secciones A–I presentes y no vacías
const sections = await page.$$eval('section.csec', (s) => s.map((x) => ({ id: x.id, len: x.innerText.length })));
check('secciones del capítulo', sections.length >= 9 && sections.every((s) => s.len > 120), sections.map((s) => `${s.id}:${s.len}`).join(' '));

// 2. Diagramas sin "no disponible"
const missing = await page.$$eval('.diagram__missing', (d) => d.length);
check('diagramas presentes', missing === 0, `faltantes: ${missing}`);

// 3. Diapositiva animada: abrir, reproducir y avanzar
const poster = await page.$('.tblock .slides__poster');
await poster.evaluate((n) => n.scrollIntoView({ block: 'center' }));
await poster.evaluate((n) => n.click());
await page.waitForSelector('.sdeck__stage', { timeout: 30000 });
await sleep(2500);
const playerOk = await page.$eval('.sdeck__stage', (n) => n.getBoundingClientRect().height > 150);
await (await page.$('.sdeck')).screenshot({ path: join(out, 'slide-open.png') });
const t0 = await page.$eval('.sdeck__stage', (n) => n.innerText);
await sleep(3000);
await (await page.$('.sdeck')).screenshot({ path: join(out, 'slide-playing.png') });
check('diapositiva abre y reproduce', playerOk, `texto visible: ${t0.slice(0, 60).replace(/\n/g, ' ')}`);

// 4. Choice: responder y ver corrección
const firstOpt = await page.$('#choice .mcq__opt');
await firstOpt.evaluate((n) => n.scrollIntoView({ block: 'center' }));
await firstOpt.evaluate((n) => n.click());
await sleep(300);
const fb = await page.$eval('#choice .mcq', (n) => n.querySelector('.mcq__feedback')?.innerText ?? '');
check('choice corrige al instante', fb.includes('Por qué'), fb.slice(0, 50).replace(/\n/g, ' '));
const retry = await page.$('#choice .mcq .mcq__feedback .btn');
await retry.click();
await sleep(200);
check('choice permite reintentar', (await page.$eval('#choice .mcq', (n) => !n.querySelector('.mcq__feedback'))) === true);

// 5. Desarrollo: revelar y marcar "No lo sabía"
const devBtn = await page.$('#desarrollos .dev .btn--primary');
await devBtn.evaluate((n) => n.scrollIntoView({ block: 'center' }));
await devBtn.evaluate((n) => n.click());
await sleep(300);
const unknown = await page.$('#desarrollos .dev .btn--unknown');
await unknown.evaluate((n) => n.click());
await sleep(300);
const status = await page.$eval('#desarrollos .dev .dev__status', (n) => n.innerText);
check('desarrollo: "No lo sabía" queda pendiente', /Pendiente/.test(status), status);

// 6. Persistencia en localStorage
const stored = await page.evaluate(() => localStorage.getItem('aula-clinica-ortega:v1') ?? '');
check('progreso guardado en el navegador', stored.includes('"unknown"') && stored.includes('"mcq"'));

// 7. "Tengo que repasar" muestra el pendiente (tras recargar)
await page.goto(url('/repasar'), { waitUntil: 'load' });
await page.waitForSelector('h1');
await sleep(1200);
const rev = await page.$eval('main', (n) => n.innerText);
check('aparece en "Tengo que repasar"', /desarrollos \(1\)/i.test(rev)); // innerText respeta text-transform

// 8. Lo sabía → dominado
const reveal = await page.$('.dev .btn--primary');
await reveal.click();
await sleep(200);
await (await page.$('.dev .btn--known')).click();
await sleep(300);
await page.goto(url(`/capitulo/${chapterId}?s=desarrollos`), { waitUntil: 'load' });
await page.waitForSelector('#desarrollos .dev__status');
const st2 = await page.$eval('#desarrollos .dev .dev__status', (n) => n.innerText);
check('"Lo sabía" registra como dominado', /Dominado/.test(st2), st2);

// 9. Maniobras: el reproductor de YouTube se carga al tocar
const mbtn = await page.$('#maniobras .segplayer__poster');
if (mbtn) {
  await mbtn.evaluate((n) => n.scrollIntoView({ block: 'center' }));
  await mbtn.evaluate((n) => n.click());
  // Scroll inmediato: fuerza re-renderizados mientras el reproductor todavía se inicializa.
  for (let k = 0; k < 6; k++) {
    await page.mouse.wheel({ deltaY: k % 2 ? -900 : 900 });
    await sleep(150);
  }
  await sleep(4000);
  const iframe = await page.$eval('#maniobras', (n) => n.querySelector('iframe')?.getAttribute('src') ?? '').catch(async () => `SIN #maniobras · url=${page.url()} · h1=${await page.$eval('h1', (n) => n.textContent).catch(() => '-')}`);
  check('maniobra: carga el fragmento de YouTube', /youtube(-nocookie)?\.com\/embed\/EC9tSepFn_U/.test(iframe) && /start=\d+/.test(iframe), iframe.slice(0, 120));
}

// 10. Búsqueda encuentra el capítulo
await page.goto(url('/buscar?q=acalasia'), { waitUntil: 'load' });
await page.waitForSelector('.results li', { timeout: 20000 }).catch(() => null);
const nres = await page.$$eval('.results li', (l) => l.length);
check('búsqueda devuelve resultados', nres > 0, `${nres} resultados`);

check('sin errores de consola ni recursos rotos', errors.length === 0, errors.slice(0, 5).join(' | '));
await browser.close();
const failed = results.filter((r) => !r.ok).length;
console.log(failed ? `\n${failed} verificación(es) fallidas` : '\nTodas las verificaciones pasaron');
process.exit(failed ? 1 : 0);
