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

// 1. Secciones obligatorias presentes y no vacías (las opcionales dependen del capítulo)
const sections = await page.$$eval('section.csec', (s) => s.map((x) => ({ id: x.id, len: x.innerText.length })));
const required = ['ubicate', 'clase', 'choice', 'desarrollos', 'memoria', 'integracion'];
const ids = sections.map((s) => s.id);
check('secciones del capítulo', required.every((r) => ids.includes(r)) && sections.every((s) => s.len > 120), sections.map((s) => `${s.id}:${s.len}`).join(' '));

// 2. Diagramas sin "no disponible"
const missing = await page.$$eval('.diagram__missing', (d) => d.length);
check('diagramas presentes', missing === 0, `faltantes: ${missing}`);

// 3. Explicación animada: avanza paso a paso (texto y dibujo cambian)
const anim = await page.$('.tblock .anim');
check('hay explicaciones animadas', Boolean(anim), `${await page.$$eval('.anim', (a) => a.length)} animaciones`);
if (anim) {
  await anim.evaluate((n) => n.scrollIntoView({ block: 'center' }));
  await sleep(900);
  const di0 = await anim.$eval('.anim__di', (n) => n.innerText);
  const svg0 = await anim.$eval('.anim__canvas svg', (n) => n.innerHTML.length);
  await anim.screenshot({ path: join(out, 'anim-1.png') });
  const nx = await anim.$('.anim__nav .btn--soft');
  await nx.evaluate((n) => n.click());
  await sleep(1400);
  const di1 = await anim.$eval('.anim__di', (n) => n.innerText);
  const svg1 = await anim.$eval('.anim__canvas svg', (n) => n.innerHTML.length);
  await anim.screenshot({ path: join(out, 'anim-2.png') });
  check('animación avanza (narración y dibujo)', di0 !== di1 && svg0 !== svg1, di1.slice(0, 60));
}

// 3b. Bloques visuales: explorador, cuadro con tapar respuestas, mnemotecnia
const vx = await page.$('.vx');
if (vx) {
  const t0 = await vx.$eval('.vx__detail-t', (n) => n.innerText);
  const chip = (await vx.$$('.vx__chip'))[1];
  await chip.evaluate((n) => n.click());
  await sleep(300);
  const t1 = await vx.$eval('.vx__detail-t', (n) => n.innerText);
  check('explorador cambia de opción', t0 !== t1, `${t0} → ${t1}`);
}
const cu = await page.$('.vcuadro');
if (cu) {
  await cu.$eval('.vcuadro__top .btn', (n) => n.click());
  await sleep(200);
  const hid = await cu.$$eval('.vcuadro__cell.is-hidden', (c) => c.length);
  await cu.$eval('.vcuadro__cell.is-hidden', (n) => n.click());
  await sleep(200);
  const hid2 = await cu.$$eval('.vcuadro__cell.is-hidden', (c) => c.length);
  check('cuadro: tapar y destapar casilleros', hid > 0 && hid2 === hid - 1, `${hid} → ${hid2}`);
}
const mn = await page.$('.vmnemo');
if (mn) {
  const vis0 = await mn.$eval('.vmnemo__list', (n) => n.offsetHeight);
  await mn.$eval('.vmnemo__word', (n) => n.click());
  await sleep(200);
  const vis1 = await mn.$eval('.vmnemo__list', (n) => n.offsetHeight);
  check('mnemotecnia se despliega', vis0 === 0 && vis1 > 0, `${vis0} → ${vis1}`);
}

// 4. Choice: responder y ver corrección
const firstOpt = await page.$('#choice .mcq__opt');
await firstOpt.evaluate((n) => n.scrollIntoView({ block: 'center' }));
await firstOpt.evaluate((n) => n.click());
await sleep(300);
const fb = await page.$eval('#choice .mcq', (n) => n.querySelector('.mcq__feedback')?.innerText ?? '');
check('choice corrige al instante', fb.includes('Por qué'), fb.slice(0, 50).replace(/\n/g, ' '));
const retry = await page.$('#choice .mcq .mcq__feedback .btn');
await retry.evaluate((n) => n.scrollIntoView({ block: "center" }));
await retry.evaluate((n) => n.click());
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
