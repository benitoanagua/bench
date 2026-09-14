import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './visual',
  use: {
    baseURL: 'http://127.0.0.1:6006',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'pnpm --filter @bench/storybook storybook -- --ci --port 6006',
    url: 'http://127.0.0.1:6006',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
