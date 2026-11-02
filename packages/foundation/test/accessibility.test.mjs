import test from 'node:test';
import assert from 'node:assert/strict';
import { isActivationKey, setDescribedBy } from '../dist/accessibility.js';

test('isActivationKey accepts Enter and Space only', () => {
  assert.equal(isActivationKey({ key: 'Enter' }), true);
  assert.equal(isActivationKey({ key: ' ' }), true);
  assert.equal(isActivationKey({ key: 'Spacebar' }), false);
  assert.equal(isActivationKey({ key: 'Tab' }), false);
  assert.equal(isActivationKey({ key: 'Escape' }), false);
});

function fakeElement() {
  const attributes = new Map();
  return {
    attributes,
    setAttribute(name, value) {
      attributes.set(name, String(value));
    },
    removeAttribute(name) {
      attributes.delete(name);
    },
  };
}

test('setDescribedBy sets aria-describedby when an id is provided', () => {
  const element = fakeElement();
  setDescribedBy(element, 'hint-1');
  assert.equal(element.attributes.get('aria-describedby'), 'hint-1');
});

test('setDescribedBy removes aria-describedby when the id is omitted', () => {
  const element = fakeElement();
  setDescribedBy(element, 'hint-1');
  setDescribedBy(element);
  assert.equal(element.attributes.has('aria-describedby'), false);
});

test('setDescribedBy treats an empty id as absent', () => {
  const element = fakeElement();
  setDescribedBy(element, '');
  assert.equal(element.attributes.has('aria-describedby'), false);
});
