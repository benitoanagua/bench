/* Smoke test del artefacto Storybook para GitHub Pages (Fase 4, ítem 19).
 *
 * Sirve storybook-static bajo la subruta /bench-main/ y verifica:
 *  1. index.html, iframe.html e index.json responden 200 bajo la subruta.
 *  2. index.json tiene ≥126 entradas y al menos una entrada de tipo "docs".
 *  3. No hay requests fallidos (404 de assets) ni errores de consola en
 *     Button/Primary y una story por categoría (Foundations, Patterns,
 *     Showcase, Welcome).
 *  4. El cambio de tema (globals theme:light→dark) modifica
 *    --bch-color-surface computado.
 *
 * Uso: node scripts/storybook-pages-smoke.mjs [ruta-storybook-static]
 *   ruta por defecto: apps/storybook/storybook-static
 */
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const req = createRequire('/home/mamaya/Code/bench/package.json');
const { chromium } = req('@playwright/test');

const STATIC_ROOT = process.argv[2] ?? '/home/mamaya/Code/bench/apps/storybook/storybook-static';
const SUBPATH = '/bench-main';
const PORT = 4910;

const failures = [];
const check = (name, cond, extra = '') => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? ` (${extra})` : ''}`);
  if (!cond) failures.push(`${name}${extra ? ` (${extra})` : ''}`);
};

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

/** Sirve `STATIC_ROOT` bajo el prefijo `SUBPATH`. Quita el prefijo antes de
 * resolver la ruta, de modo que /bench-main/iframe.html → iframe.html. */
const server = createServer(async (r, s) => {
  try {
    const url = new URL(r.url, `http://127.0.0.1:${PORT}`);
    let path = decodeURIComponent(url.pathname);
    if (!path.startsWith(SUBPATH)) {
      s.writeHead(404);
      return s.end('not under subpath');
    }
    path = path.slice(SUBPATH.length) || '/index.html';
    if (path.endsWith('/')) path += 'index.html';
    const file = normalize(join(STATIC_ROOT, path));
    if (!file.startsWith(STATIC_ROOT)) throw new Error('traversal');
    const body = await readFile(file);
    s.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' });
    s.end(body);
  } catch {
    s.writeHead(404);
    s.end('not found');
  }
});

await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${PORT}${SUBPATH}`;

const browser = await chromium.launch();
const page = await browser.newPage();

const consoleErrors = [];
const failedRequests = [];
page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(m.text());
});
page.on('requestfailed', (r) => failedRequests.push(r.url()));

async function get200(path) {
  const res = await page.request.get(`${base}${path}`);
  return res.status();
}

async function openStory(id, globals) {
  const qs = new URLSearchParams({
    path: `/story/${id}`,
    viewMode: 'story',
    ...(globals ? { globals } : {}),
  });
  await page.goto(`${base}/iframe.html?${qs}`, { waitUntil: 'networkidle', timeout: 60_000 });
  // Las stories tipo docs (Tokens, Welcome) montan HTML estático; las de
  // componentes montan elementos bch-*. Esperamos a que haya contenido real.
  await page.waitForFunction(() => document.body.innerHTML.length > 100, undefined, {
    timeout: 30_000,
  });
  // El decorator aplica [data-bch-theme] antes de renderizar; esperamos a que
  // refleje el tema esperado antes de medir custom properties.
  if (globals && globals.theme) {
    await page.waitForTimeout(2000);
  }
  await page.waitForTimeout(1500);
}

try {
  // 0. cambio de tema modifica --bch-color-surface (page fresca para evitar
  //    estado compartido entre navegaciones de stories).
  const themePage = await browser.newPage();
  themePage.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text());
  });
  themePage.on('requestfailed', (r) => failedRequests.push(r.url()));
  const openTheme = async (globals) => {
    const qs = new URLSearchParams({
      path: '/story/bench-components-button--primary',
      viewMode: 'story',
      ...(globals ? { globals } : {}),
    });
    await themePage.goto(`${base}/iframe.html?${qs}`, {
      waitUntil: 'networkidle',
      timeout: 60_000,
    });
    if (globals) await themePage.waitForTimeout(2000);
    else await themePage.waitForTimeout(1500);
  };
  await openTheme();
  const light = await themePage.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--bch-color-surface').trim(),
  );
  await openTheme('theme:dark');
  const dark = await themePage.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--bch-color-surface').trim(),
  );
  await themePage.close();
  check(
    'tema dark cambia --bch-color-surface',
    dark && dark !== light,
    `light=${light} dark=${dark}`,
  );

  // 1. status 200 de las entradas clave bajo la subruta
  const stIndex = await get200('/index.html');
  const stIframe = await get200('/iframe.html');
  const stJson = await get200('/index.json');
  check('index.html 200 bajo /bench-main/', stIndex === 200, `status=${stIndex}`);
  check('iframe.html 200 bajo /bench-main/', stIframe === 200, `status=${stIframe}`);
  check('index.json 200 bajo /bench-main/', stJson === 200, `status=${stJson}`);

  // 2. índice: ≥126 entradas y al menos una de tipo docs
  const indexRes = await page.request.get(`${base}/index.json`);
  const index = await indexRes.json();
  const entries = index.entries ?? {};
  const total = Object.keys(entries).length;
  const docsCount = Object.values(entries).filter((e) => e.type === 'docs').length;
  check('index.json ≥126 entradas', total >= 126, `total=${total}`);
  check('index.json tiene entradas tipo docs', docsCount >= 1, `docs=${docsCount}`);

  // 3. historias por categoría, sin 404 ni errores de consola
  const categoryStories = [
    ['Components', 'bench-components-button--primary'],
    ['Foundations', 'bench-foundations-tokens--docs'],
    ['Patterns', 'bench-patterns-sessions--session-expiry'],
    ['Showcase', 'bench-showcase--product-surface'],
    ['Welcome', 'bench-welcome--welcome'],
  ];
  for (const [cat, id] of categoryStories) {
    await openStory(id);
    const errs = consoleErrors.filter(
      (e) => e.includes(cat) || e.includes(id.toLowerCase().split('--')[0]),
    );
    check(`sin errores de consola en ${cat}/${id}`, errs.length === 0, `errors=${errs.length}`);
  }
  check(
    'sin requests fallidos (assets 404)',
    failedRequests.length === 0,
    `failed=${failedRequests.length}`,
  );
} catch (err) {
  failures.push(`excepción: ${err.message}`);
  console.error(err);
}

await browser.close();
server.close();

if (failures.length) {
  console.error(`\nSMOKE FALLO: ${failures.join(' | ')}`);
  process.exit(1);
}
console.log('\nSMOKE OK: artefacto storybook-static bajo /bench-main/ verificado.');
