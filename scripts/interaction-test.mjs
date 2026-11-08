// Test de interacción de un capítulo (estructura por pasos) con Chrome sin interfaz, en ancho de celular.
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
const clic = (h) => h.evaluate((n) => (n.scrollIntoView({ block: 'center' }), n.click()));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage();
await page.setViewport({ width: 400, height: 860, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => m.type() === 'error' && !m.text().includes('youtube') && errors.push(m.text()));
page.on('response', (r) => r.status() >= 400 && !r.url().includes('youtube') && errors.push(`HTTP ${r.status()} ${r.url()}`));
const ir = async (paso) => {
  await page.goto(url(`/capitulo/${chapterId}/${paso}`), { waitUntil: 'load' });
  await page.waitForSelector('.riel', { timeout: 30000 });
  await sleep(600);
};

// 1. Entrada: redirige a «Sabete esto» y muestra el riel completo
await page.goto(url(`/capitulo/${chapterId}`), { waitUntil: 'load' });
await page.waitForSelector('.riel', { timeout: 30000 });
await sleep(800);
const pasos = await page.$$eval('.riel a', (as) => as.map((a) => a.textContent.replace(/\s*✓/, '').trim()));
check('riel de pasos', pasos.join('|') === 'Sabete esto|Teoría|Video|Cuadros|Choice|Desarrollo|Repaso', pasos.join(' · '));
check('entra por «Sabete esto»', page.url().endsWith('/esencial'), page.url());
const radar = await page.$$eval('.radar__item', (l) => l.length);
const p0 = await page.$$eval('.radar__item--P0', (l) => l.length);
check('lo que pregunta el profe (P0 primero)', radar >= 5 && p0 >= 1, `${radar} preguntas · ${p0} P0`);
const ocultoBtn = (await page.$$('.segmento button'))[1];
await clic(ocultoBtn);
await sleep(200);
const cintas = await page.$$('.bloque .cinta');
await clic(cintas[0]);
await sleep(150);
const quedan = await page.$$eval('.bloque .cinta', (c) => c.length);
check('mapa oculto: tapa y destapa', cintas.length > 5 && quedan === cintas.length - 1, `${cintas.length} franjas`);
const ancho = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
check('sin desborde horizontal en celular', ancho);

// 2. Teoría: escenas paso a paso
await ir('teoria');
await page.waitForSelector('.lienzo svg');
const temas = await page.$$eval('.segmento--temas button', (b) => b.length);
const di0 = await page.$eval('.narracion', (n) => n.innerText);
const svg0 = await page.$eval('.lienzo svg', (n) => n.innerHTML.length);
await page.screenshot({ path: join(out, 'teoria-1.png') });
const sig = async () => clic((await page.$$('.dos .boton'))[1]);
await sig();
await sleep(900);
await sig();
await sleep(1200);
const di2 = await page.$eval('.narracion', (n) => n.innerText);
const svg2 = await page.$eval('.lienzo svg', (n) => n.innerHTML.length);
await page.screenshot({ path: join(out, 'teoria-3.png') });
check('teoría: escenas', temas >= 8, `${temas} temas`);
check('teoría: avanza texto y dibujo', di2 !== di0 && svg2 !== svg0, di2.slice(0, 60));
const retener = await page.$$eval('.retener li', (l) => l.length);
check('teoría: «retené esto»', retener > 0, `${retener} términos`);
// Audio del paso
const audioOk = await page.evaluate(async () => {
  const btn = document.querySelector('.escuchar');
  btn?.click();
  await new Promise((r) => setTimeout(r, 1500));
  return btn?.getAttribute('aria-pressed') === 'true';
});
const audioUrl = `${base.replace(/\/$/, '')}/media/${chapterId}/pasos/definiciones-3.mp3`;
const audioHttp = await page.evaluate(async (u) => (await fetch(u, { method: 'HEAD' })).status, audioUrl);
check('teoría: audio del paso', audioOk && audioHttp === 200, `HTTP ${audioHttp}`);
// Último paso: el botón dice «Terminar» y lleva al video
await page.$$eval('.segmento--temas button', (b) => b[b.length - 1].click());
await sleep(300);
for (let k = 0; k < 8; k++) {
  const t = await page.$$eval('.dos .boton', (b) => b[1].textContent);
  if (t.includes('Terminar')) break;
  await sig();
  await sleep(250);
}
await sig();
await sleep(800);
check('teoría: al terminar sigue con el video', page.url().endsWith('/video'), page.url());

// 3. Video
await page.waitForSelector('video', { timeout: 15000 });
const v = await page.$eval('video', (n) => ({ src: n.currentSrc || n.querySelector('source')?.src || n.src, tracks: n.querySelectorAll('track').length }));
check('video presente con subtítulos', /\.mp4/.test(v.src) && v.tracks > 0, v.src.split('/').pop());

// 4. Cuadros: tapar respuestas
await ir('cuadros');
const ncuadros = await page.$$eval('.cuadro', (c) => c.length);
await clic((await page.$$('.segmento button'))[1]);
await sleep(200);
const tapadas = await page.$$eval('.cuadro .cinta', (c) => c.length);
await clic((await page.$$('.cuadro .cinta'))[0]);
await sleep(150);
const tapadas2 = await page.$$eval('.cuadro .cinta', (c) => c.length);
check('cuadros: tapar y destapar casilleros', ncuadros >= 6 && tapadas > 20 && tapadas2 === tapadas - 1, `${ncuadros} cuadros · ${tapadas} casilleros`);
const porque = await page.$$eval('.porque', (p) => p.length);
check('cuadros: «¿por qué?» del libro', porque >= 4, `${porque}`);

// 5. Choice: responder, corrección y reintento; respuestas no siempre en la misma letra
await ir('choice');
const letras = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll('.mcq').forEach(() => out.push(0));
  return out.length;
});
await clic(await page.$('.mcq__opt'));
await sleep(300);
const fb = await page.$eval('.mcq', (n) => n.querySelector('.mcq__feedback')?.innerText ?? '');
check('choice corrige al instante', fb.includes('Por qué'), fb.slice(0, 50).replace(/\n/g, ' '));
const respuestas = [];
for (const card of await page.$$('.mcq')) {
  await clic(await card.$('.mcq__opt'));
  await sleep(60);
  const ok = await card.$eval('.mcq__opt.is-answer .mcq__letter', (n) => n.textContent).catch(() => '?');
  respuestas.push(ok);
}
const distintas = new Set(respuestas).size;
check('choice: la correcta varía de letra', distintas >= 3, `${letras} preguntas · letras ${respuestas.join('')}`);
await clic(await page.$('.mcq .mcq__feedback .btn'));
await sleep(200);
check('choice permite reintentar', (await page.$eval('.mcq', (n) => !n.querySelector('.mcq__feedback'))) === true);

// 6. Desarrollo: revelar y marcar «No lo sabía»
await ir('desarrollo');
await clic(await page.$('.dev .btn--primary'));
await sleep(300);
await clic(await page.$('.dev .btn--unknown'));
await sleep(300);
const status = await page.$eval('.dev .dev__status', (n) => n.innerText);
check('desarrollo: «No lo sabía» queda pendiente', /Pendiente/.test(status), status);
const stored = await page.evaluate(() => localStorage.getItem('aula-clinica-ortega:v1') ?? '');
check('progreso guardado en el navegador', stored.includes('"unknown"') && stored.includes('"mcq"'));

// 7. Repaso: pendientes y tarjetas
await ir('repaso');
const pend = await page.$$eval('.pendientes li', (l) => l.length);
check('repaso: muestra lo pendiente', pend >= 2, `${pend} pendientes`);
await clic(await page.$('.mem .btn--soft'));
await sleep(200);
await clic(await page.$('.mem .btn--known'));
await sleep(200);
const memSt = await page.evaluate(() => localStorage.getItem('aula-clinica-ortega:v1') ?? '');
check('repaso: tarjeta de memoria registra «Lo sabía»', memSt.includes('"known"'));

// 8. «Tengo que repasar» (página global) y «Lo sabía» → dominado
await page.goto(url('/repasar'), { waitUntil: 'load' });
await page.waitForSelector('h1');
await sleep(1200);
const rev = await page.$eval('main', (n) => n.innerText);
check('aparece en «Tengo que repasar»', /desarrollos \(1\)/i.test(rev));
await clic(await page.$('.dev .btn--primary'));
await sleep(200);
await clic(await page.$('.dev .btn--known'));
await sleep(300);
await ir('desarrollo');
const st2 = await page.$eval('.dev .dev__status', (n) => n.innerText);
check('«Lo sabía» registra como dominado', /Dominado/.test(st2), st2);

// 9. Maniobra del tema: el fragmento de YouTube carga al tocar
await ir('repaso');
const mbtn = await page.$('.segplayer__poster');
if (mbtn) {
  await clic(mbtn);
  await sleep(4000);
  const iframe = await page.$eval('.segplayer', (n) => n.querySelector('iframe')?.getAttribute('src') ?? '').catch(() => '');
  check('maniobra: carga el fragmento de YouTube', /youtube(-nocookie)?\.com\/embed\/EC9tSepFn_U/.test(iframe) && /start=\d+/.test(iframe), iframe.slice(0, 100));
}

// 10. Enlace viejo (?s=) y búsqueda
await page.goto(url(`/capitulo/${chapterId}?s=desarrollos`), { waitUntil: 'load' });
await sleep(1200);
check('enlace viejo redirige al paso', page.url().endsWith('/desarrollo'), page.url());
await page.goto(url('/buscar?q=acalasia'), { waitUntil: 'load' });
await page.waitForSelector('.results li', { timeout: 20000 }).catch(() => null);
const nres = await page.$$eval('.results li', (l) => l.length);
check('búsqueda devuelve resultados', nres > 0, `${nres} resultados`);

check('sin errores de consola ni recursos rotos', errors.length === 0, errors.slice(0, 5).join(' | '));
await browser.close();
const failed = results.filter((r) => !r.ok).length;
console.log(failed ? `\n${failed} verificación(es) fallidas` : '\nTodas las verificaciones pasaron');
process.exit(failed ? 1 : 0);
