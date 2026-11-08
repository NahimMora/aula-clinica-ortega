// Prueba del modo estudio por pestañas: navegación, recursos reales, responsive, persistencia y repaso.
// Uso: node scripts/test-estudio.mjs <url-base> <capitulo> <carpeta-capturas>
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const [base, cap, out] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const fallas = [];
const ok = (c, m) => {
  if (c) console.log('ok   ' + m);
  else {
    fallas.push(m);
    console.log('FALLA ' + m);
  }
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage();
const errs = [];
page.on('pageerror', (e) => errs.push(e.message));
page.on('console', (m) => m.type() === 'error' && !/youtube|ERR_|403|requestStorage/i.test(m.text()) && errs.push(m.text()));
page.on('response', (r) => {
  const u = r.url();
  if (u.includes('/media/') && r.status() >= 400) errs.push(`${r.status()} ${u}`);
});
const url = (q = '') => `${base}#/capitulo/${cap}${q}`;
const titulo = () => page.$eval('.e-pest h2', (e) => e.textContent);
const abrir = async (q) => {
  await page.goto(url(q), { waitUntil: 'networkidle2', timeout: 60000 });
  await page.reload({ waitUntil: 'networkidle2', timeout: 60000 });
  await page.waitForSelector('.estudio', { timeout: 30000 });
  await sleep(350);
};
const clickTexto = (sel, txt) =>
  page.evaluate(
    (s, t) => {
      const e = [...document.querySelectorAll(s)].find((x) => x.textContent.includes(t));
      if (e) e.click();
      return Boolean(e);
    },
    sel,
    txt,
  );

await page.setViewport({ width: 1440, height: 1000 });
await abrir('?t=e00');
const lista = await page.$$eval('.e-tabs__l button', (b) => b.map((x) => x.textContent));
ok(lista.length >= 5, `pestañas: ${lista.join(' | ')}`);
ok(!(await page.$('.anim__clase')), 'sin botones de reproducción sin función ni pasos «Siguiente»');
ok(await page.evaluate(() => !document.body.innerText.includes('Lo que toma')), 'sin apartado «Lo que toma»');

for (const [w, nom] of [
  [1440, 'd'],
  [390, 'm'],
]) {
  await page.setViewport({ width: w, height: nom === 'd' ? 1000 : 844, deviceScaleFactor: nom === 'd' ? 1 : 2 });
  for (let i = 0; i < lista.length; i++) {
    await page.evaluate((k) => document.querySelectorAll('.e-tabs__l button')[k].click(), i);
    await sleep(260);
    const secs = await page.$$eval('.e-secs__nav button', (b) => b.map((x) => x.textContent));
    for (let k = 0; k < Math.max(1, secs.length); k++) {
      if (secs.length) {
        await page.evaluate((j) => document.querySelectorAll('.e-secs__nav button')[j].click(), k);
        await sleep(170);
      }
      const r = await page.evaluate(() => ({
        err: /Hubo un problema|No se pudo mostrar|Algo salió mal/.test(document.querySelector('.e-pest').innerText),
        of: document.documentElement.scrollWidth - window.innerWidth,
        h: document.querySelector('.e-pest').offsetHeight,
      }));
      const n = `${nom} ${lista[i]}${secs[k] ? ' / ' + secs[k] : ''}`;
      ok(!r.err, `${n}: renderiza (alto ${r.h}px)`);
      ok(r.of <= 1, `${n}: sin desborde horizontal (${r.of})`);
      await page.screenshot({ path: join(out, `${nom}-${i}${secs.length ? '-' + k : ''}.png`), fullPage: true });
    }
  }
}
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });

await abrir('?t=e00');
const seqs = await page.$$eval('.cmap__seq', (s) => s.map((x) => x.textContent));
ok(seqs.join() === '01,02,03,04,05', `mapa numerado: ${seqs.join()}`);
await page.evaluate(() => document.querySelectorAll('.cmap__branch')[3].click());
await sleep(300);
ok((await titulo()).includes('Apendicitis'), 'el bloque 04 del mapa abre su pestaña');

await page.evaluate(() => document.querySelector('.e-pie .is-sig').click());
await sleep(300);
ok((await titulo()).includes('Signos'), 'el botón siguiente lleva a la pestaña 05');
await page.goto(`${base}#/`, { waitUntil: 'networkidle2' });
await abrir('');
ok((await titulo()).includes('Signos'), 'recuerda la última pestaña al volver');

await abrir('?s=t-hemorragico');
ok((await page.$eval('.e-secs__nav .is-on', (e) => e.textContent)).includes('Hemorrágico'), 'el enlace antiguo ?s=t-hemorragico abre la sección correcta');

await abrir('?t=e01');
const antes = await page.evaluate(() => document.querySelectorAll('.e-medio, .e-prec').length);
await page.evaluate(() => document.querySelector('.e-interruptor input').click());
await sleep(200);
const desp = await page.evaluate(() => ({ n: document.querySelectorAll('.e-medio, .e-prec').length, mec: document.querySelectorAll('.e-mec').length, t: document.querySelectorAll('.e-tabla').length }));
ok(antes > 0 && desp.n === 0 && desp.mec > 0 && desp.t > 0, `modo repaso oculta lo complementario (${antes} a ${desp.n}) y conserva lo clave`);
await page.screenshot({ path: join(out, 'repaso-e01.png'), fullPage: true });
await page.evaluate(() => document.querySelector('.e-interruptor input').click());

await abrir('?t=e01');
ok(await page.evaluate(() => document.querySelectorAll('.e-fig-ctrl button')[1].disabled), 'soltar requiere comprimir primero');
await clickTexto('.e-fig-ctrl button', 'Comprimir');
await sleep(650);
const t1 = await page.$eval('.e-fig-ctrl p', (e) => e.textContent);
await page.screenshot({ path: join(out, 'fig-comprimir.png') });
await clickTexto('.e-fig-ctrl button', 'Soltar');
await sleep(850);
const t2 = await page.$eval('.e-fig-ctrl p', (e) => e.textContent);
ok(t1.includes('visceral') && t2.includes('rebote'), 'la figura responde a comprimir y soltar');

await page.evaluate(() => document.querySelector('.mcq__opt').click());
await sleep(200);
ok(Boolean(await page.$('.mcq__feedback')), 'la choice corrige con explicación');

await abrir('?t=e03');
await clickTexto('.e-secs__nav button', 'Perforativo');
await sleep(300);
const v = await page.$eval('.e-medio video', async (el) => {
  el.muted = true;
  await el.play();
  await new Promise((r) => setTimeout(r, 1000));
  el.pause();
  return { t: el.currentTime, d: el.duration };
});
ok(v.t > 0.2 && v.d > 10, `el clip se reproduce (t=${v.t.toFixed(2)}, duración ${v.d.toFixed(1)})`);
const img = await page.$eval('.e-img img', async (el) => {
  if (!el.complete) await new Promise((r) => (el.onload = r));
  return el.naturalWidth;
});
ok(img > 100, `la imagen carga (${img}px)`);

await abrir('?t=e06');
await page.evaluate(() => document.querySelector('.e-caso__ops button').click());
await sleep(200);
ok(Boolean(await page.$('.e-caso__r')), 'los casos corrigen con razonamiento');
await clickTexto('.e-secs__nav button', 'Repaso en video');
await sleep(400);
const vr = await page.$eval('.vplayer video', async (el) => {
  el.muted = true;
  await el.play();
  await new Promise((r) => setTimeout(r, 1000));
  return { d: el.duration, t: el.currentTime };
});
ok(vr.d > 300 && vr.t > 0.2, `el video de repaso se reproduce (duración ${vr.d.toFixed(0)})`);
await page.evaluate(() => document.querySelectorAll('.vplayer__chapters button')[4].click());
await sleep(700);
ok(await page.$eval('.vplayer video', (e) => e.currentTime > 116), 'los capítulos del video saltan al minuto correcto');

await abrir('?t=e01');
await page.evaluate(() => document.querySelector('.segplayer__poster').click());
await sleep(4000);
const yt = await page.$eval('.segplayer', (e) => {
  const f = e.querySelector('iframe');
  return f ? f.src : (e.querySelector('.segplayer__error')?.textContent ?? 'sin iframe');
});
ok(/youtube/.test(yt), `la maniobra abre su fragmento real: ${yt.slice(0, 80)}`);

await browser.close();
if (errs.length) console.log('ERRORES DE CONSOLA:\n' + [...new Set(errs)].join('\n'));
console.log(fallas.length || errs.length ? `\n${fallas.length} fallas, ${errs.length} errores` : '\nTodas las verificaciones pasaron');
process.exit(fallas.length || errs.length ? 1 : 0);
