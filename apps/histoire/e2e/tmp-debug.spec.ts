import { test } from '@playwright/test';
import { storyUrl, sandboxOf, setTheme } from './helpers';
import { readFileSync } from 'node:fs';

test('axe inside iframe in dark theme', async ({ page }) => {
  const url = await storyUrl('bch-input');
  await page.goto(url, { waitUntil: 'networkidle' });
  const sandbox = sandboxOf(page);
  await setTheme(sandbox, true);
  await page.waitForTimeout(300);
  const axeSrc = readFileSync(
    '/home/mamaya/Code/bench/node_modules/.pnpm/node_modules/axe-core/axe.min.js',
    'utf8',
  );
  const info = await sandbox.evaluate(async (src: string) => {
    const s = document.createElement('script');
    s.textContent = src;
    document.head.appendChild(s);
    await new Promise((r) => setTimeout(r, 50));
    const label = document.querySelector('.sc-bch-input .label')!;
    const results = await (window as any).axe.run(label, { runOnly: ['color-contrast'] });
    return {
      violations: results.violations.map((v: any) => ({
        id: v.id,
        nodes: v.nodes.map((n: any) => n.html),
      })),
      pass: results.incomplete?.length,
    };
  }, axeSrc);
  console.log('INFO:', JSON.stringify(info));
});
