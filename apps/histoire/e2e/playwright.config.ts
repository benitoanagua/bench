import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './',
  testMatch: /.*\.spec\.ts$/,
  use: {
    baseURL: 'http://127.0.0.1:5179',
    screenshot: 'only-on-failure',
    launchOptions: {
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    },
  },
  webServer: {
    command:
      'node ./static-server.js /home/mamaya/Code/bench/apps/histoire/.histoire/dist /bench 5179',
    url: 'http://127.0.0.1:5179',
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: devices['Desktop Chrome'],
    },
  ],
});
