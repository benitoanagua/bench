import test from 'node:test';
import assert from 'node:assert/strict';
import { fuzzyScore, normalizeText } from '../dist/fuzzy.js';

test('normalizeText folds case, diacritics and repeated whitespace', () => {
  assert.equal(normalizeText('  Facturación   Rápida '), 'facturacion rapida');
  assert.equal(normalizeText('Nueva Factura'), 'nueva factura');
  assert.equal(normalizeText(''), '');
});

test('an empty query carries no signal', () => {
  assert.equal(fuzzyScore('', 'Nueva factura'), 0);
  assert.equal(fuzzyScore('   ', 'Nueva factura'), 0);
});

test('an exact match scores 1', () => {
  assert.equal(fuzzyScore('factura', 'Factura'), 1);
  assert.equal(fuzzyScore('Facturación', 'facturacion'), 1);
});

test('a prefix scores 0.9 and a substring 0.7', () => {
  assert.equal(fuzzyScore('nue', 'Nueva factura'), 0.9);
  assert.equal(fuzzyScore('fact', 'Nueva factura'), 0.7);
});

test('a subsequence scores between 0.3 and 0.65', () => {
  const dense = fuzzyScore('nfa', 'Nueva factura');
  const sparse = fuzzyScore('nfa', 'Nueva hoja fiscal de prueba');
  assert.ok(dense > 0.3 && dense <= 0.65, `dense=${dense}`);
  assert.ok(sparse > 0.3 && sparse <= 0.65, `sparse=${sparse}`);
  assert.ok(dense > sparse, 'a denser match scores higher');
});

test('a query with no subsequence match scores 0', () => {
  assert.equal(fuzzyScore('zzz', 'Nueva factura'), 0);
  assert.equal(fuzzyScore('nfa', ''), 0);
});
