import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildAliasTable,
  rankFunctions,
  resolveAlias,
  ALIAS_SCORE,
  NOMBRE_SCORE,
} from '../dist/function-ranking.js';

const entries = [
  {
    id: 'nf',
    nombre: 'Nueva factura',
    path: ['Facturación', 'Ventas', 'Nueva factura'],
    sinonimos: ['factura', 'invoice'],
    alias: 'nf',
    tipo: 'pantalla',
    frecuenciaUso: 120,
  },
  {
    id: 'nc',
    nombre: 'Nueva nota de crédito',
    path: ['Facturación', 'Ventas'],
    tipo: 'pantalla',
    frecuenciaUso: 30,
  },
  {
    id: 'rep-ventas',
    nombre: 'Reporte de ventas',
    path: ['Reportes', 'Ventas'],
    tipo: 'reporte',
    frecuenciaUso: 75,
  },
];

test('the alias table resolves an alias ignoring case and diacritics', () => {
  const table = buildAliasTable(entries);
  assert.equal(resolveAlias(table, 'nf')?.id, 'nf');
  assert.equal(resolveAlias(table, 'NF')?.id, 'nf');
  assert.equal(resolveAlias(table, '  nf ')?.id, 'nf');
  assert.equal(resolveAlias(table, 'xx'), undefined);
});

test('the alias table keeps the first entry that declares an alias', () => {
  const table = buildAliasTable([
    { ...entries[0], id: 'first' },
    { ...entries[0], id: 'second' },
  ]);
  assert.equal(resolveAlias(table, 'nf')?.id, 'first');
});

test('an exact alias outranks an exact name', () => {
  const ranked = rankFunctions(entries, 'nf');
  assert.equal(ranked[0].entry.id, 'nf');
  assert.equal(ranked[0].reason, 'alias');
  assert.equal(ranked[0].score, ALIAS_SCORE);
});

test('an exact name scores below an alias', () => {
  const ranked = rankFunctions(entries, 'reporte de ventas');
  assert.equal(ranked[0].entry.id, 'rep-ventas');
  assert.equal(ranked[0].reason, 'nombre');
  assert.equal(ranked[0].score, NOMBRE_SCORE);
});

test('substring matches are ordered name, synonym, path', () => {
  const byName = rankFunctions(entries, 'factura');
  assert.equal(byName[0].entry.id, 'nf');
  assert.equal(byName[0].reason, 'nombre');

  const bySynonym = rankFunctions(
    [
      { ...entries[0], id: 'sinonimo', nombre: 'Documento', sinonimos: ['factura'] },
      { ...entries[1], id: 'ruta', nombre: 'Otro', path: ['Facturación'] },
    ],
    'factura',
  );
  assert.equal(bySynonym[0].entry.id, 'sinonimo');
  assert.equal(bySynonym[0].reason, 'sinonimo');
  assert.equal(bySynonym[1].entry.id, 'ruta');
  assert.equal(bySynonym[1].reason, 'ruta');
});

test('a fuzzy match still returns the entry, below every substring match', () => {
  const ranked = rankFunctions(entries, 'nfa');
  assert.equal(ranked[0].entry.id, 'nf');
  assert.equal(ranked[0].reason, 'fuzzy');
  assert.ok(ranked[0].score < 500);
});

test('ties are broken by frequency and then by recency', () => {
  const tied = [
    { id: 'a', nombre: 'Igual', path: ['x'], tipo: 'pantalla', frecuenciaUso: 10 },
    { id: 'b', nombre: 'Igual', path: ['x'], tipo: 'pantalla', frecuenciaUso: 10 },
  ];
  assert.deepEqual(
    rankFunctions(tied, 'Igual').map((item) => item.entry.id),
    ['a', 'b'],
  );
  assert.deepEqual(
    rankFunctions(tied, 'Igual', { recentIds: ['b', 'a'] }).map((item) => item.entry.id),
    ['b', 'a'],
  );
});

test('an empty query lists the index by usage frequency', () => {
  const ranked = rankFunctions(entries, '');
  assert.deepEqual(
    ranked.map((item) => item.entry.id),
    ['nf', 'rep-ventas', 'nc'],
  );
  assert.equal(ranked[0].reason, 'uso');
});

test('the limit caps the number of results', () => {
  assert.equal(rankFunctions(entries, '', { limit: 2 }).length, 2);
});
