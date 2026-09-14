import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://127.0.0.1:4173', trace: 'retain-on-failure' },
  webServer: { command: 'pnpm --filter @bench/components build && pnpm --filter @bench/showcase build && pnpm --filter @bench/showcase preview', port: 4173, reuseExistingServer: true },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
