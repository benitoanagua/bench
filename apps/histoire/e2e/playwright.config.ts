import { defineConfig, devices } from '@playwright/test';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// El servidor estático sirve .histoire/dist bajo el mismo prefijo que BASE_PATH.
// Por defecto /bench/ (GitHub Pages); sobreescribible con BASE_PATH=/app/.
const basePath = (process.env.BASE_PATH ?? '/bench/').replace(/\/+$/, '') || '';

// Ruta del build deHistoire relativa a este archivo (no absoluta).
const histoireDist = resolve(__dirname, '..', '.histoire', 'dist');

// Verificación: el build debe existir antes de correr tests
if (!existsSync(histoireDist)) {
  console.error(`⚠️  Cuidado: .histoire/dist no existe en ${histoireDist}. Ejecuta "pnpm --filter @bench/histoire build".`);
}

// Chromium: variable de entorno > Chromium del sistema (Arch/WSLg) > fallback de Playwright.
let executablePath: string | undefined;
if (process.env.CHROMIUM_PATH) {
  executablePath = process.env.CHROMIUM_PATH;
} else {
  for (const candidate of [
    '/usr/bin/chromium',
    '/usr/sbin/chromium',
    '/usr/bin/chromium-browser',
  ]) {
    if (existsSync(candidate)) {
      executablePath = candidate;
      break;
    }
  }
}

export default defineConfig({
  testDir: './',
  testMatch: /.*\.spec\.ts$/,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  maxFailures: process.env.CI ? 5 : 1,
  trace: 'retain-on-failure',
  outputDir: 'test-results',
  use: {
    baseURL: `http://127.0.0.1:5179${basePath}`,
    screenshot: 'only-on-failure',
    headless: true,
    launchOptions: {
      executablePath,
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    },
    // WSLg sin GPU real y ~7.5 GiB de RAM: navegador pesado, pocos workers.
    viewport: { width: 1280, height: 800 },
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    // Sin networkidle como sincronización; usar waitForFunction/locator instead.
    waitForSelectorOptions: { timeout: 5000 },
  },
  webServer: {
    command: `node "${join(__dirname, 'static-server.js')}" "${histoireDist}" "${basePath}" 5179`,
    url: `http://127.0.0.1:5179${basePath}`,
    reuseExistingServer: true,
    timeout: 120_000,
    maxExistingServerRetries: 3,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
      },
    },
  ],
  workers: 2,
  reporter: process.env.CI
    ? [['html', { outputFolder: 'playwright-report' }], ['list']]
    : [['list']],
  globalSetup: undefined,
});