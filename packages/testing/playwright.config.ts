import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './visual',
  use: {
    baseURL: 'http://127.0.0.1:6006',
    screenshot: 'only-on-failure',
  },
  webServer: {
    // pnpm v10 no longer forwards args after `--` into yarn-style script args;
    // pass flags through the script directly so storybook@10 stays happy.
    command: 'pnpm --filter @bench/storybook storybook --ci',
    url: 'http://127.0.0.1:6006',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
