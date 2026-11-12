// Test del módulo «Parcial del lunes» con Chrome sin interfaz.
// Uso: node scripts/test-parcial.mjs <baseUrl> <carpetaCapturas>
// Recorre la portada, cada tema de cada sistema (visor con diapositivas, preguntas en tres niveles),
// maniobras y puntos (maniquí), banco de preguntas y simulacro, en escritorio y celular.
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const [base, outDir] = process.argv.slice(2);
if (!base || !outDir) {
  console.error('Uso: node scripts/test-parcial.mjs <baseUrl> <carpetaCapturas>');
  process.exit(2);
}
mkdirSync(outDir, { recursive: true });
const url = (r) => base.replace(/\/$/, '') + '/#' + r;
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
const fallas = [];
const ok = (cond, msg) => {
  if (!cond) fallas.push(msg);
  console.log(`${cond ? '✓' : '✗'} ${msg}`);
};

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });

async function abrir(r, vw = 1440, vh = 900) {
  const page = await browser.newPage();
  await page.setViewport({ width: vw, height: vh, deviceScaleFactor: 1 });
  page.errs = [];
  page.on('pageerror', (e) => page.errs.push(e.message));
  page.on('console', (m) => m.type() === 'error' && !/youtube|ERR_BLOCKED/.test(m.text()) && page.errs.push(m.text()));
  page.on('response', (s) => s.status() >= 400 && !s.url().includes('youtube') && page.errs.push(`HTTP ${s.status()} ${s.url()}`));
  await page.goto(url(r), { waitUntil: 'load', timeout: 60000 });
  await page.waitForSelector('h1', { timeout: 30000 }).catch(() => null);
  await espera(600);
  return page;
}
const sinOverflow = (page) => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
const sinErrorBoundary = (page) => page.evaluate(() => !document.body.innerText.includes('No se pudo mostrar'));

// 1. Portada del parcial
{
  const p = await abrir('/parcial');
  const info = await p.evaluate(() => ({ h1: document.querySelector('h1')?.textContent, temas: document.querySelectorAll('.temario li').length, nav: document.querySelectorAll('.pnav__item').length, sidebar: !!document.querySelector('.sidebar__parcial') }));
  ok(info.h1?.includes('Temas fundamentales'), `portada: h1 «${info.h1}»`);
  ok(info.temas >= 25, `portada: ${info.temas} temas en el temario`);
  ok(info.nav === 8, `portada: ${info.nav} accesos en la barra del parcial`);
  ok(info.sidebar, 'columna: bloque «Parcial del lunes»');
  await p.screenshot({ path: join(outDir, 'desk_parcial.png') });
  ok(p.errs.length === 0, `portada sin errores ${p.errs.join(' | ')}`);
  await p.close();
}

// 2. Inicio de la web: acceso destacado
{
  const p = await abrir('/');
  const banner = await p.$('.parcial-banner');
  ok(Boolean(banner), 'inicio: acceso destacado al parcial');
  await p.close();
}

// 3. Cada tema de cada sistema
const SIS = ['digestivo', 'renal', 'neuro', 'soma'];
for (const s of SIS) {
  const p = await abrir(`/parcial/${s}`);
  const temas = await p.$$eval('.ptemas__tab', (b) => b.length);
  ok(temas > 0, `${s}: ${temas} temas`);
  for (let i = 0; i < temas; i++) {
    const tabs = await p.$$('.ptemas__tab');
    await tabs[i].click();
    await espera(400);
    // Cada tema se recorre por pestañas, como un capítulo.
    const pest = await p.$$eval('#tema-pestanas .secnav__label', (b) => b.map((x) => x.textContent));
    const titulo = await p.$eval('.ptema__titulo', (e) => e.firstChild?.textContent?.trim());
    const orden = ['Fisiopatología', 'Diapositivas', 'Video', 'Maniobras', 'Memoria', 'Choice', 'Preguntas', 'Cierre'];
    ok(pest.every((x, k) => k === 0 || orden.indexOf(x) > orden.indexOf(pest[k - 1])), `${s} · ${titulo}: pestañas en orden (${pest.join(' → ')})`);
    const info = { preguntas: 0, quedate: 0 };
    for (let j = 0; j < pest.length; j++) {
      await p.evaluate((j) => document.querySelectorAll('#tema-pestanas .secnav__item')[j].click(), j);
      await espera(300);
      if (pest[j] === 'Fisiopatología' || pest[j] === 'Diapositivas') {
        await p.waitForSelector('.clase__panel .visor__escenario, .clase__panel .pares, .clase__panel .ptema__nuevo', { timeout: 20000 }).catch(() => null);
        const v = await p.evaluate(() => ({ visor: Boolean(document.querySelector('.clase__panel .visor__escenario, .clase__panel .pares, .clase__panel .ptema__nuevo')), cargando: document.body.innerText.includes('Cargando diapositivas') }));
        ok(v.visor && !v.cargando, `${s} · ${titulo}: ${pest[j]}`);
      }
      if (pest[j] === 'Video') {
        await p.waitForSelector('.clase__panel video', { timeout: 20000 }).catch(() => null);
        ok(await p.evaluate(() => [...document.querySelectorAll('.clase__panel video')].some((v) => v.currentSrc || v.querySelector('source'))), `${s} · ${titulo}: video`);
      }
      if (pest[j] === 'Maniobras') ok(Boolean(await p.$('.clase__panel .mplaylist, .clase__panel .empty, .clase__panel .mq')), `${s} · ${titulo}: maniobras`);
      if (pest[j] === 'Preguntas') info.preguntas = await p.$$eval('.ptema .pq', (x) => x.length);
      if (pest[j] === 'Cierre') info.quedate = await p.$$eval('.quedate li', (x) => x.length);
    }
    ok(info.quedate > 0, `${s} · ${titulo}: «Con esto tenés que quedarte» (${info.quedate}) · ${info.preguntas} preguntas`);
    ok(await sinErrorBoundary(p), `${s} · ${titulo}: sin error de sección`);
  }
  // Pestaña de preguntas del último tema
  const btnPreg = await p.$$('#tema-pestanas .secnav__item');
  for (const b of btnPreg) if ((await b.evaluate((e) => e.textContent)).includes('Preguntas')) await b.click();
  await espera(300);
  // Abrir una pregunta y sus tres niveles
  const pq = await p.$('.ptema .pq summary');
  if (pq) {
    await pq.click();
    await p.click('.ptema .pq[open] .pq__revelar');
    await espera(150);
    const n1 = await p.$('.ptema .pq[open] .pq__oral');
    ok(Boolean(n1), `${s}: nivel 1 visible al revelar`);
    const mas = await p.$('.ptema .pq[open] .pq__body > .btn--ghost');
    if (mas) await mas.click();
    await espera(150);
    const n2 = await p.$('.ptema .pq[open] .pq__nivel--2, .ptema .pq[open] .pq__nivel--3');
    ok(Boolean(n2), `${s}: niveles 2/3 visibles`);
    await p.click('.ptema .pq[open] .pq__marca--gold');
    const marcado = await p.$('.ptema .pq[open] .pq__marca--gold.is-on');
    ok(Boolean(marcado), `${s}: marca «Dudé» guardada`);
  }
  // Avanzar una diapositiva del visor (primer tema, primera pestaña)
  await p.evaluate(() => document.querySelectorAll('.ptemas__tab')[0].click());
  await espera(300);
  await p.evaluate(() => [...document.querySelectorAll('#tema-pestanas .secnav__item')].find((b) => b.textContent.includes('Diapositivas'))?.click());
  await p.waitForSelector('.ptema .visor__btn--sig', { timeout: 20000 }).catch(() => null);
  const sig = await p.$('.ptema .visor__btn--sig');
  if (sig) {
    const antes = await p.$eval('.ptema .sl__cab h3', (e) => e.textContent);
    // Paso a paso: «Siguiente» hasta que cambie la diapositiva (máx. 8 pasos).
    let despues = antes;
    for (let k = 0; k < 8 && despues === antes; k++) {
      await sig.click();
      await espera(350);
      despues = await p.$eval('.ptema .sl__cab h3', (e) => e.textContent);
    }
    ok(antes !== despues, `${s}: el visor avanza (${antes} → ${despues})`);
  }
  await p.screenshot({ path: join(outDir, `desk_parcial_${s}.png`) });
  ok(p.errs.length === 0, `${s}: sin errores ${p.errs.slice(0, 3).join(' | ')}`);
  await p.close();
}

// 4. Pares craneales: tabla y tapar
{
  const p = await abrir('/parcial/neuro?t=pares&p=teoria');
  await p.waitForSelector('.pares__tabla', { timeout: 15000 });
  const filas = await p.$$eval('.pares__tabla tbody tr', (r) => r.length);
  ok(filas === 12, `pares: ${filas} filas`);
  await p.click('.pares__barra input');
  const tapadas = await p.$$eval('.pares__tabla tr.is-tapado', (r) => r.length);
  ok(tapadas === 12, `pares: tapar oculta ${tapadas}`);
  await p.click('.pares__tabla tbody tr:nth-child(11)');
  const ficha = await p.$eval('.pares__ficha h4', (e) => e.textContent);
  ok(ficha.includes('XI'), `pares: ficha «${ficha}»`);
  await p.close();
}

// 5. Maniobras y maniquí
{
  const p = await abrir('/parcial/maniobras');
  await p.waitForSelector('.mq__op', { timeout: 15000 });
  const opciones = await p.$$('.mq__op');
  ok(opciones.length === 4, `maniquí: ${opciones.length} opciones`);
  await opciones[0].click();
  await espera(150);
  const ficha = await p.$('.mq__ficha');
  ok(Boolean(ficha), 'maniquí: ficha del punto al responder');
  await p.click('.mq__modo button:nth-child(2)');
  await espera(200);
  const puntos = await p.$$eval('.mq__punto.is-click', (x) => x.length);
  ok(puntos >= 10, `maniquí: ${puntos} puntos en el mapa`);
  for (const s of ['renal', 'neuro', 'soma']) {
    const q = await abrir(`/parcial/maniobras?s=${s}`);
    await espera(300);
    const grupos = await q.$$eval('.pgrupo', (g) => g.length);
    ok(grupos > 0, `maniobras ${s}: ${grupos} grupos`);
    await q.click('.pgrupo:not([open]) summary');
    await espera(300);
    const lista = await q.$('.pgrupo[open] .mplaylist, .pgrupo[open] .pares');
    ok(Boolean(lista), `maniobras ${s}: un grupo abierto muestra su lista`);
    ok(q.errs.length === 0, `maniobras ${s}: sin errores ${q.errs.slice(0, 3).join(' | ')}`);
    await q.close();
  }
  await p.screenshot({ path: join(outDir, 'desk_parcial_maniobras.png') });
  ok(p.errs.length === 0, `maniobras sin errores ${p.errs.slice(0, 3).join(' | ')}`);
  await p.close();
}

// 6. Banco de preguntas y simulacro
{
  const p = await abrir('/parcial/preguntas');
  for (const s of ['digestivo', 'renal', 'neuro', 'soma', 'integracion']) {
    const q = await abrir(`/parcial/preguntas?s=${s}`);
    const n = await q.$$eval('.pq', (x) => x.length);
    ok(n > 0, `preguntas ${s}: ${n}`);
    await q.close();
  }
  const q = await abrir('/parcial/preguntas?s=renal&q=p-nefrotico-complic');
  await espera(600);
  const abierta = await q.$('#p-nefrotico-complic[open]');
  ok(Boolean(abierta), 'preguntas: ?q= abre la pregunta pedida');
  await q.close();
  await p.close();
}
{
  const p = await abrir('/parcial/preguntas?s=simulacro');
  await p.click('.sim__mesa .btn--primary');
  await espera(150);
  ok(Boolean(await p.$('.sim__resp')), 'simulacro: respuesta oral');
  const rep = await p.$('.sim__acciones .btn--soft');
  if (rep) {
    await rep.click();
    await espera(150);
    ok(Boolean(await p.$('.sim__rep')), 'simulacro: repregunta');
  }
  const q1 = await p.$eval('.sim__q', (e) => e.textContent);
  await p.click('.sim__acciones .btn--primary');
  await espera(200);
  const q2 = await p.$eval('.sim__q', (e) => e.textContent);
  ok(q1 !== q2, 'simulacro: otra pregunta');
  await p.screenshot({ path: join(outDir, 'desk_parcial_simulacro.png') });
  ok(p.errs.length === 0, `preguntas sin errores ${p.errs.slice(0, 3).join(' | ')}`);
  await p.close();
}

// 7. Enlace desde un capítulo original y capítulo intacto
{
  const p = await abrir('/capitulo/ren-04');
  await p.waitForSelector('.chero__title', { timeout: 20000 });
  const aviso = await p.$('.ptema-aviso a');
  ok(Boolean(aviso), 'capítulo ren-04: aviso con enlace al tema del parcial');
  const tabs = await p.$$eval('.secnav__item', (x) => x.length);
  ok(tabs >= 8, `capítulo ren-04: conserva sus ${tabs} pestañas`);
  await p.close();
}

// 8. Celular: sin desborde horizontal
for (const r of ['/parcial', '/parcial/digestivo?t=ictericia', '/parcial/neuro?t=pares', '/parcial/maniobras', '/parcial/preguntas?s=simulacro', '/']) {
  const p = await abrir(r, 390, 844);
  await espera(800);
  ok(await sinOverflow(p), `celular ${r}: sin desborde horizontal`);
  await p.screenshot({ path: join(outDir, `mob_${r.replace(/[^\w]+/g, '_')}.png`) });
  ok(p.errs.length === 0, `celular ${r}: sin errores ${p.errs.slice(0, 3).join(' | ')}`);
  await p.close();
}

await browser.close();
if (fallas.length) {
  console.error(`\n${fallas.length} verificaciones fallaron:\n- ${fallas.join('\n- ')}`);
  process.exit(1);
}
console.log('\nTodas las verificaciones pasaron.');
