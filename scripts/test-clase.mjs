// Recorre un capítulo con clase visual: pestañas, cada diapositiva (sin desbordes), barra de apartados y práctica.
// Uso: node scripts/test-clase.mjs <url-base> <id> <carpeta> [--fotos]
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const [base, id, out, flag] = process.argv.slice(2);
const FOTOS = flag === '--fotos';
mkdirSync(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
let fallas = 0;
const mal = (m) => {
  fallas++;
  console.log('  ✗', m);
};
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

async function abrir(ancho, alto, movil = false, reducir = true) {
  const page = await browser.newPage();
  await page.setViewport({ width: ancho, height: alto, deviceScaleFactor: 1, isMobile: movil, hasTouch: movil });
  if (reducir) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  page.on('pageerror', (e) => mal('error de página: ' + e.message));
  page.on('console', (m) => m.type() === 'error' && !/Failed to load resource|youtube|ERR_/i.test(m.text()) && mal('consola: ' + m.text()));
  return page;
}
const ir = async (page, t) => {
  await page.goto(`${base}#/capitulo/${id}?t=${t}`, { waitUntil: 'load', timeout: 60000 });
  await page.waitForSelector('.clase__panel', { timeout: 30000 });
  await dormir(450);
};

async function recorrerMazo(page, tab, etiqueta) {
  await ir(page, tab);
  await page.evaluate(() => window.localStorage.clear());
  await ir(page, tab);
  const totalTxt = await page.$eval('.visor__n', (e) => e.textContent);
  const total = Number(totalTxt.split('/')[1]);
  console.log(`· ${tab} (${etiqueta}): ${total} diapositivas`);
  for (let i = 0; i < total; i++) {
    await dormir(etiqueta === 'vivo' ? 220 : 70);
    const r = await page.evaluate(() => {
      const sl = document.querySelector('.sl');
      const cuerpo = document.querySelector('.sl__cuerpo');
      const txt = document.querySelector('.sl__txt');
      const h = sl.querySelector('h3').textContent;
      const altoMovil = getComputedStyle(sl).aspectRatio === 'auto';
      return { h, altoMovil, sl: [sl.scrollHeight, sl.clientHeight], cuerpo: cuerpo ? [cuerpo.scrollHeight, cuerpo.clientHeight] : null, txt: txt ? [txt.scrollHeight, txt.clientHeight] : null, ancho: [document.documentElement.scrollWidth, window.innerWidth] };
    });
    if (etiqueta !== 'vivo' && !r.altoMovil && r.sl[0] > r.sl[1] + 2) mal(`${etiqueta} ${i + 1} «${r.h}» desborda la diapositiva: ${r.sl}`);
    if (etiqueta !== 'vivo' && !r.altoMovil && r.txt && r.txt[0] > r.txt[1] + 2) mal(`${etiqueta} ${i + 1} «${r.h}» texto desborda: ${r.txt}`);
    if (r.ancho[0] > r.ancho[1] + 1) mal(`${etiqueta} ${i + 1} «${r.h}» scroll horizontal: ${r.ancho}`);
    if (FOTOS && etiqueta !== 'vivo') {
      const el = await page.$('.visor__escenario');
      await el.screenshot({ path: join(out, `${etiqueta}-${tab}-${String(i + 1).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 72 });
    }
    if (i < total - 1) await page.click('.visor__nav--sig');
  }
}

// ── Escritorio
const page = await abrir(1440, 950);
await ir(page, 'mapa');
const pestanas = await page.$$eval('.secnav__item', (b) => b.map((x) => x.textContent.trim()));
console.log('Pestañas:', pestanas.join(' | '));
for (const n of ['Mapa', 'Fisiopatología', 'Diapositivas', 'Video', 'Choice', 'Desarrollo', 'Memoria', 'Maniobras', 'Cierre', 'Simulacro']) if (!pestanas.some((p) => p.includes(n))) mal('falta la pestaña ' + n);
await recorrerMazo(page, 'fisio', 'pc');
await recorrerMazo(page, 'teoria', 'pc');

// Barra de apartados: salto, resaltado y posición al volver
await ir(page, 'teoria');
const apartados = await page.$$eval('.visor__apartados button', (b) => b.map((x) => x.textContent));
console.log('Apartados:', apartados.join(' | '));
await page.evaluate(() => [...document.querySelectorAll('.visor__apartados button')].find((b) => b.textContent === 'Clasificación').click());
await dormir(150);
let sel = await page.$eval('.visor__apartados .is-on', (e) => e.textContent);
let tit = await page.$eval('.sl h3', (e) => e.textContent);
if (sel !== 'Clasificación' || !/clasifica/i.test(tit)) mal(`salto a Clasificación: «${sel}» / «${tit}»`);
await page.click('.visor__nav--sig');
await dormir(100);
const antes = await page.$eval('.visor__n', (e) => e.textContent);
await page.evaluate(() => [...document.querySelectorAll('.secnav__item')].find((b) => b.textContent.includes('Choice')).click());
await dormir(300);
await page.evaluate(() => [...document.querySelectorAll('.secnav__item')].find((b) => b.textContent.includes('Diapositivas')).click());
await dormir(300);
const despues = await page.$eval('.visor__n', (e) => e.textContent);
if (antes !== despues) mal(`no conservó la posición: ${antes} → ${despues}`);
console.log('Salto, resaltado y posición: comprobados', antes);
// Solo avisos
await page.evaluate(() => document.querySelector('.visor__solo input').click());
await dormir(150);
const av = await page.$eval('.visor__n', (e) => e.textContent);
if (!/con aviso/.test(av)) mal('filtro de avisos: ' + av);
console.log('Filtro de avisos:', av);
await page.evaluate(() => document.querySelector('.visor__solo input').click());

// Mapa: no es un índice
await ir(page, 'mapa');
const txtMapa = await page.$eval('.cmap', (e) => e.innerText);
for (const n of ['Visceral', 'Somático', 'Referido', 'Médico', 'Quirúrgico', 'Inespecífico', 'Inflamatorio', 'Obstructivo', 'Perforativo', 'Hemorrágico', 'Vascular']) if (!txtMapa.includes(n)) mal('mapa sin ' + n);
if (/Ir a la explicación|Primero veremos|Después estudiarás/.test(txtMapa)) mal('el mapa tiene texto de índice');
if (FOTOS) await (await page.$('.cmap')).screenshot({ path: join(out, 'mapa.png') });

// Práctica
await ir(page, 'choice');
const op = await page.$('.mcq__opt');
await op.click();
await dormir(120);
if (!(await page.$('.mcq.is-correct, .mcq.is-wrong'))) mal('choice sin corrección');
const chip = await page.$eval('.mcq', (e) => e.innerText);
if (!/Elaborada para practicar/.test(chip)) mal('choice sin identificar el origen');
await ir(page, 'desarrollo');
await page.evaluate(() => [...document.querySelectorAll('.dev .btn--primary')][0].click());
await dormir(150);
await page.evaluate(() => [...document.querySelectorAll('.btn--unknown')][0].click());
await dormir(150);
const devTxt = await page.$eval('.dev', (e) => e.innerText);
if (!/Preguntero/.test(devTxt)) mal('desarrollo sin origen');
await ir(page, 'memoria');
if (!(await page.$('.mem-list > *'))) mal('memoria vacía');
await ir(page, 'maniobras');
const maniobras = await page.$eval('.clase__panel', (e) => e.innerText);
if (!/Blumberg/.test(maniobras)) mal('maniobras sin Blumberg');
await ir(page, 'cierre');
const cierre = await page.$eval('.clase__panel', (e) => e.innerText);
for (const n of ['Lo imprescindible', 'Errores', 'Conexiones', 'Lo que todavía necesito repasar']) if (!cierre.includes(n)) mal('cierre sin ' + n);
if (cierre.includes('Mini simulacro')) mal('el mini simulacro quedó en cierre');
if (!/Desarrollo/.test(cierre)) mal('el pendiente del desarrollo no aparece');
await ir(page, 'simulacro');
const sim = await page.$eval('.clase__panel', (e) => e.innerText);
for (const n of ['Casos clínicos', 'Choice integrador', 'Desarrollos del examen']) if (!sim.includes(n)) mal('simulacro sin ' + n);
await page.evaluate(() => document.querySelector('.caso__ops button').click());
await dormir(120);
if (!(await page.$('.caso__r'))) mal('caso sin corrección');
await ir(page, 'video');
const vid = await page.$('video');
if (!vid) console.log('  (todavía no hay video)');
else {
  const dur = await page.evaluate(() => new Promise((res) => { const v = document.querySelector('video'); if (v.readyState >= 1) res(v.duration); else { v.addEventListener('loadedmetadata', () => res(v.duration)); v.addEventListener('error', () => res(-1)); setTimeout(() => res(-2), 15000); } }));
  console.log('Duración del video:', dur);
  if (dur <= 0) mal('el video no carga');
}
await page.close();

// ── Con animación real: cada diapositiva arranca desde el paso 0
const viva = await abrir(1280, 800, false, false);
await recorrerMazo(viva, 'fisio', 'vivo');
await recorrerMazo(viva, 'teoria', 'vivo');
await viva.close();

// ── Celular
const mov = await abrir(390, 800, true);
await recorrerMazo(mov, 'fisio', 'cel');
await recorrerMazo(mov, 'teoria', 'cel');
await mov.close();

await browser.close();
console.log(fallas ? `\n${fallas} problema(s)` : '\nTodas las verificaciones pasaron');
process.exit(fallas ? 1 : 0);
