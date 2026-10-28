import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveViewportDensity } from '../dist/density.js';

test('auto collapses to compact below the md breakpoint (768px)', () => {
  assert.equal(resolveViewportDensity({ preference: 'auto', viewportWidth: 640 }), 'compact');
  assert.equal(resolveViewportDensity({ preference: 'auto', viewportWidth: 767.9 }), 'compact');
});

test('auto is comfortable from md up', () => {
  assert.equal(resolveViewportDensity({ preference: 'auto', viewportWidth: 768 }), 'comfortable');
  assert.equal(resolveViewportDensity({ preference: 'auto', viewportWidth: 1536 }), 'comfortable');
});

test('a manual preference always wins over the viewport', () => {
  assert.equal(resolveViewportDensity({ preference: 'spacious', viewportWidth: 375 }), 'spacious');
  assert.equal(resolveViewportDensity({ preference: 'compact', viewportWidth: 2560 }), 'compact');
});
