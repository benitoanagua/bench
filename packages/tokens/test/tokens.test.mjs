import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import assert from 'node:assert/strict';

// The test suite waits on `turbo test`, which builds `dist` first (the same
// dependency chain the foundation tests use).
const dist = (file) => join(dirname(fileURLToPath(import.meta.url)), '..', 'dist', file);

const tokens = await import(dist('index.js'));
const breakpointsModule = await import(dist('breakpoints.js'));

test('exports the public surface', () => {
  for (const symbol of ['breakpoints', 'minWidthQuery', 'watchBreakpoint', 'benchTokens']) {
    assert.ok(symbol in tokens, `@bench/tokens should export ${symbol}`);
  }
  assert.equal(tokens.benchTokens.prefix, 'bch');
});

test('breakpoints ascending and matching the CSS tokens', () => {
  const breakpoints = tokens.benchTokens.breakpointKeys;
  assert.deepEqual(Object.keys(breakpointsModule.breakpoints), breakpoints);
  const values = Object.values(breakpointsModule.breakpoints);
  for (let i = 1; i < values.length; i += 1) {
    assert.ok(values[i] > values[i - 1], 'breakpoints must be strictly ascending');
  }
  assert.equal(values[0], 0, 'xs starts at 0');

  const css = readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'tokens.css'),
    'utf8',
  );
  for (const [key, value] of Object.entries(breakpointsModule.breakpoints)) {
    assert.match(
      css,
      new RegExp(`--bch-breakpoint-${key}:\\s*${value}px`),
      `tokens.css must mirror the JS breakpoint ${key}=${value}`,
    );
  }
});

test('minWidthQuery formats media queries', () => {
  assert.equal(tokens.minWidthQuery('lg'), '(min-width: 1024px)');
});

test('benchTokens mirrors every referenced scale', () => {
  const data = tokens.benchTokens;
  for (const scale of ['spacing', 'radii', 'controlSizes', 'themes', 'typeRoles']) {
    assert.ok(Array.isArray(data[scale]) && data[scale].length > 0, scale);
  }
  assert.deepEqual(data.zIndexLayers, [
    'base',
    'raised',
    'sticky',
    'dropdown',
    'overlay',
    'drawer',
    'modal',
    'toast',
    'tooltip',
  ]);
});
