import puppeteer from 'puppeteer-core';
const [out, ruta, w = '1366', h = '1000', clicks = '0'] = process.argv.slice(2);
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
const errs = [];
page.on('pageerror', (e) => errs.push(e.message));
await page.setViewport({ width: +w, height: +h, deviceScaleFactor: 1, isMobile: +w < 700, hasTouch: +w < 700 });
await page.goto('http://localhost:4799/aula-clinica-ortega/#' + ruta, { waitUntil: 'load' });
await new Promise((r) => setTimeout(r, 2000));
for (let i = 0; i < +clicks; i++) { await page.click('.visor__btn--sig'); await new Promise((r) => setTimeout(r, 400)); }
await new Promise((r) => setTimeout(r, 900));
await page.evaluate(() => document.querySelector('.visor')?.scrollIntoView());
await page.evaluate(() => window.scrollBy(0, -60));
await page.screenshot({ path: out });
console.log(errs.length ? errs : 'sin errores', await page.$eval('.visor__narracion', (e) => e.textContent.slice(0, 80)).catch(() => 'sin narración'));
await browser.close();
