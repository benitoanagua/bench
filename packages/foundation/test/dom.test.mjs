import test from 'node:test';
import assert from 'node:assert/strict';
import { createId, getDirectChildren, getFocusableElements } from '../dist/dom.js';

test('getFocusableElements queries the documented focusable selector', () => {
  const found = [{ id: 'one' }, { id: 'two' }];
  let selector = '';
  const root = {
    querySelectorAll(value) {
      selector = value;
      return found;
    },
  };

  const result = getFocusableElements(root);

  assert.deepEqual(result, found);
  assert.match(selector, /a\[href\]/);
  assert.match(selector, /button:not\(\[disabled\]\)/);
  assert.match(selector, /\[tabindex\]:not\(\[tabindex="-1"\]\)/);
});

test('getDirectChildren filters by tag name case-insensitively', () => {
  const host = {
    children: [
      { tagName: 'BCH-TAB' },
      { tagName: 'SPAN' },
      { tagName: 'bch-tab' },
      { tagName: undefined },
    ],
  };

  const result = getDirectChildren(host, 'bch-tab');

  assert.deepEqual(result, [host.children[0], host.children[2]]);
});

test('getDirectChildren returns an empty array when nothing matches', () => {
  const host = { children: [{ tagName: 'DIV' }] };
  assert.deepEqual(getDirectChildren(host, 'bch-tab'), []);
});

test('createId uses the requested prefix and a stable random-looking suffix', () => {
  const id = createId('field');
  assert.match(id, /^field-[a-z0-9]{1,8}$/);

  const other = createId();
  assert.match(other, /^bch-[a-z0-9]{1,8}$/);
  assert.notEqual(createId('field'), id);
});
