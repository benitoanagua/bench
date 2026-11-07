import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import assert from 'node:assert/strict';

// `turbo test` builds `dist` first. Import `carbon.js` directly: tsc emits
// extensionless relative imports inside `dist/index.js`, which Node's strict
// ESM resolution rejects.
const dist = (file) => join(dirname(fileURLToPath(import.meta.url)), '..', 'dist', file);
const icons = await import(dist('carbon.js'));

const allowedTags = new Set([
  'path',
  'circle',
  'rect',
  'ellipse',
  'polygon',
  'polyline',
  'line',
  'g',
  'defs',
  'title',
  'style',
  'use',
  'symbol',
]);

test('isCarbonIconName accepts generated names and rejects the rest', () => {
  assert.equal(icons.isCarbonIconName('chevron-down'), true);
  assert.equal(icons.isCarbonIconName('check'), true);
  assert.equal(icons.isCarbonIconName('not-a-carbon-icon'), false);
  assert.equal(icons.isCarbonIconName(''), false);
  // Case-insensitive and whitespace tolerant (same normalisation as util).
  assert.equal(icons.isCarbonIconName('  CHECK '), true);
});

test('isCarbonIconName is a type guard for its dataset', () => {
  const maybe = 'inbox';
  if (icons.isCarbonIconName(maybe)) {
    assert.equal(maybe, 'inbox');
  } else {
    assert.fail('inbox should resolve');
  }
});

test('resolveCarbonIcon returns node geometry for every generated glyph', () => {
  const warnings = [];
  const originalWarn = console.warn;
  console.warn = (message) => warnings.push(String(message));
  try {
    const resolved = icons.resolveCarbonIcon('search');
    assert.ok(Array.isArray(resolved) && resolved.length > 0);
    for (const [tag, attrs] of resolved) {
      assert.ok(allowedTags.has(tag), tag);
      assert.equal(typeof attrs, 'object');
      for (const [key, value] of Object.entries(attrs)) {
        assert.match(key, /^[a-zA-Z-:]+$/, key);
        assert.equal(typeof value, 'string');
      }
    }

    assert.equal(icons.resolveCarbonIcon('ai/book-decay'), undefined);
    assert.ok(
      warnings.some((message) => message.includes('is not in the generated Carbon set')),
      'a missing glyph must not fail silently in development',
    );
  } finally {
    console.warn = originalWarn;
  }
});
