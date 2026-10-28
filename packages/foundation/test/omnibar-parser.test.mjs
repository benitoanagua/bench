import test from 'node:test';
import assert from 'node:assert/strict';
import { parseOmnibar, describeOmnibarQuery } from '../dist/omnibar-parser.js';

const FIELDS = ['monto', 'vence', 'cliente'];

test('implicit AND: space produces independent filter nodes as an or/group', () => {
  const ast = parseOmnibar('monto:100 cliente:acme');
  assert.equal(ast.kind, 'or');
  assert.equal(ast.branches.length, 2);
  assert.deepEqual(
    ast.branches.map((b) => [b.field, b.op, b.value]),
    [
      ['monto', ':', 100],
      ['cliente', ':', 'acme'],
    ],
  );
});

test('or (case-insensitive) produces an or node with both branches', () => {
  const ast = parseOmnibar('cliente:acme OR cliente:globex', FIELDS);
  assert.equal(ast.kind, 'or');
  assert.equal(ast.branches.length, 2);
  assert.equal(ast.branches[0].value, 'acme');
  assert.equal(ast.branches[1].value, 'globex');
});

test('the five operators parse', () => {
  const cases = [
    ['monto:100', ':', 100],
    ['monto:>1000', ':>', 1000],
    ['monto:<1000', ':<', 1000],
    ['monto:>=1000', ':>=', 1000],
    ['monto:<=1000', ':<=', 1000],
  ];
  for (const [text, op, value] of cases) {
    const ast = parseOmnibar(text, FIELDS);
    assert.equal(ast.kind, 'filter');
    assert.equal(ast.field, 'monto');
    assert.equal(ast.op, op);
    assert.equal(ast.value, value);
  }
});

test('values: number, ISO date, free text', () => {
  const num = parseOmnibar('monto:1234', FIELDS);
  assert.equal(num.value, 1234);
  const date = parseOmnibar('vence:<2026-09-15', FIELDS);
  assert.equal(date.value instanceof Date, true);
  assert.equal(date.value.toISOString().slice(0, 10), '2026-09-15');
  const text = parseOmnibar('cliente:acme', FIELDS);
  assert.equal(text.value, 'acme');
});

test('run: macro by name', () => {
  const ast = parseOmnibar('run:macro1');
  assert.equal(ast.kind, 'macro');
  assert.equal(ast.name, 'macro1');
});

test('m1 short macro form', () => {
  const ast = parseOmnibar('m1');
  assert.equal(ast.kind, 'macro');
  assert.equal(ast.name, 'm1');
});

test('clear command', () => {
  const ast = parseOmnibar('clear');
  assert.equal(ast.kind, 'clear');
});

test('free text — no field, whole text as search', () => {
  const ast = parseOmnibar('hola mundo');
  assert.equal(ast.kind, 'free-text');
  assert.equal(ast.text, 'hola mundo');
});

test('unknown field gives an explicit error, never a silent failure', () => {
  const ast = parseOmnibar('omoneda:USD', FIELDS);
  assert.equal(ast.kind, 'error');
  assert.equal(ast.message, "no existe el campo 'omoneda' en esta vista");
  assert.equal(ast.raw, 'omoneda:USD');
  assert.equal(describeOmnibarQuery(ast), "no existe el campo 'omoneda' en esta vista");
});

test('without fields context the parser does not error', () => {
  const ast = parseOmnibar('omoneda:USD');
  assert.equal(ast.kind, 'filter');
  assert.equal(ast.field, 'omoneda');
});

test('error inside an or chain surfaces the first error', () => {
  const ast = parseOmnibar('cliente:acme or omoneda:USD', FIELDS);
  assert.equal(ast.kind, 'error');
  assert.match(ast.message, /omoneda/);
});
