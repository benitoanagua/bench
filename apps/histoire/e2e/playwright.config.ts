/**
 * Configuración de Playwright para tests e2e de Bench Histoire.
 *
 * Rutas relativas: funciona desde cualquier máquina sin hardcodeo.
 * Los paths se resuelven contra el directorio de ESTE archivo (__dirname),
 * nunca contra process.cwd(): pnpm ejecuta los scripts del paquete con
 * cwd = apps/histoire, por lo que basarse en cwd duplicaba la ruta
 * (apps/histoire/apps/histoire/...) y rompía la carga de la config.
 * Para correr: pnpm --filter @bench/histoire test:e2e
 */
import { fileURLToPath } from 'node:url';
import { defineConfig, devices } from '@playwright/test';
import * as path from 'node:path';
import * as env from './support/env';

// Este archivo vive en apps/histoire/e2e/. El paquete es ESM ("type":
// "module"), así que la ruta se resuelve con import.meta.url.
const E2E_DIR = path.dirname(fileURLToPath(import.meta.url));
const HISTOIRE_DIR = path.resolve(E2E_DIR, '..');
const PROJECT_ROOT = path.resolve(HISTOIRE_DIR, '..'); // raíz del monorepo
const HISTOIRE_DIST = path.join(HISTOIRE_DIR, '.histoire', 'dist');
const STATIC_SERVER_JS = path.join(E2E_DIR, 'static-server.js');
const GLOBAL_SETUP_TS = path.join(E2E_DIR, 'global-setup.ts');

// --- webServer: sirve .histoire/dist bajo BASE_PATH ---
const webServer = {
  command: `node ${JSON.stringify(STATIC_SERVER_JS)} "${HISTOIRE_DIST}" "${env.BASE_PATH.replace(/\/+$/, '') || ''}" ${env.PORT}`,
  url: env.BASE_URL,
  reuseExistingServer: true,
  timeout: 120_000,
};

// --- globalSetup: path relativo ---
const globalSetup = GLOBAL_SETUP_TS;

export default defineConfig({
  testDir: './',
  testMatch: /.*\.spec\.ts$/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  maxFailures: process.env.CI ? 5 : 0,
  trace: 'retain-on-failure',
  outputDir: 'test-results',
  use: {
    baseURL: env.BASE_URL,
    screenshot: 'only-on-failure',
    headless: true,
    launchOptions: {
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    },
    // Sin networkidle como sincronización; usar waitForFunction/locator.
    // waitForSelectorOptions quitado (no existe en Playwright).
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },
  webServer,
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
      },
    },
    // Mobile Chrome para gallery y viewport tests
    {
      name: 'Chrome Mobile',
      use: {
        ...devices['Pixel 2'],
      },
    },
  ],
  workers: 2,
  reporter: process.env.CI
    ? [['html', { outputFolder: 'playwright-report' }], ['list']]
    : [['list'], ['json', { outputFile: 'test-results/results.json' }]],
  globalSetup,
});