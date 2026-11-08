// Verifica que el video y los subtítulos de un capítulo carguen en el reproductor de la web.
// Uso: node scripts/check-video.mjs <baseUrl> <capituloId>
import puppeteer from 'puppeteer-core';
const [base, id] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const p = await b.newPage();
await p.goto(`${base.replace(/\/$/, '')}/#/capitulo/${id}?s=video`, { waitUntil: 'load' });
await p.waitForSelector('#video video', { timeout: 30000 });
await new Promise((r) => setTimeout(r, 4000));
const info = await p.$eval('#video video', (v) => ({ readyState: v.readyState, duration: Math.round(v.duration), w: v.videoWidth, h: v.videoHeight, tracks: v.textTracks.length, cues: v.textTracks[0]?.cues?.length ?? 0, error: v.error?.code ?? null }));
console.log(JSON.stringify(info));
await b.close();
process.exit(info.readyState >= 1 && info.duration > 60 && !info.error ? 0 : 1);
