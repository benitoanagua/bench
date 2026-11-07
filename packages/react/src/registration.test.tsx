import { describe, expect, it } from 'vitest';
// Importing the adapter is the registration entry point: the loader defines
// every `bch-*` tag on the global registry.
import './index';

describe('custom element registration', () => {
  it('registra los bch-* al importar @bench/react', () => {
    expect(customElements.get('bch-button')).toBeDefined();
    expect(customElements.get('bch-input')).toBeDefined();
    expect(customElements.get('bch-dialog')).toBeDefined();
  });
});
