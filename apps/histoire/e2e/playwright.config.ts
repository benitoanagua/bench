/**
 * Configuración de Playwright para tests e2e de Bench Histoire.
 *
 * Versión simplificada: rutas absolutas conocidas, sin import.meta.url.
 * Ejecutar desde: /home/mamaya/Code/bench (workspace root)
 *   pnpm --filter @bench/histoire test:e2e
 */
import { defineConfig, devices } from '@playwright/test';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as env from './support/env';

// --- Rutas absolutas conocidas ---
// Estas rutas asumen que el workspace está en /home/mamaya/Code/bench
const HISTOIRE_DIR = '/home/mamaya/Code/bench/apps/histoire';
const E2E_DIR = '/home/mamaya/Code/bench/apps/histoire/e2e';
const HISTOIRE_DIST = '/home/mamaya/Code/bench/apps/histoire/.histoire/dist';
const STATIC_SERVER_JS = '/home/mamaya/Code/bench/apps/histoire/e2e/static-server.js';
const GLOBAL_SETUP_TS = '/home/mamaya/Code/bench/apps/histoire/e2e/global-setup.ts';

// --- executablePath: Chromium del sistema ---
let executablePath: string | undefined;
const CHROMIUM_CANDIDATES = [
  '/usr/bin/chromium',
  '/usr/sbin/chromium',
  '/usr/bin/chromium-browser',
];
for (const cand of CHROMIUM_CANDIDATES) {
  if (fs.existsSync(cand)) {
    executablePath = cand;
    break;
  }
}

// --- webServer: sirve .histoire/dist bajo BASE_PATH ---
const webServer = {
  command: `node ${STATIC_SERVER_JS} "${HISTOIRE_DIST}" "${env.BASE_PATH.replace(/\/+$/, '') || ''}" ${env.PORT}`,
  url: env.BASE_URL,
  reuseExistingServer: true,
  timeout: 120_000,
  maxExistingServerRetries: 3,
};

// --- globalSetup: path absoluto ---
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
      executablePath,
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
        executablePath,
      },
    },
    // Mobile Chrome para gallery y viewport tests
    {
      name: 'Chrome Mobile',
      use: {
        ...devices['Pixel 2'],
        executablePath,
      },
    },
  ],
  workers: 2,
  reporter: process.env.CI
    ? [['html', { outputFolder: 'playwright-report' }], ['list']]
    : [['list'], ['json', { outputFile: 'test-results/results.json' }]],
  globalSetup,
});