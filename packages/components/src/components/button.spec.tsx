import { newSpecPage } from '@stencil/core/testing';
import { BchButton } from './button';

describe('bch-button', () => {
  it('renders its content', async () => {
    const page = await newSpecPage({ components: [BchButton], html: '<bch-button>Continue</bch-button>' });
    expect(page.root?.textContent).toContain('Continue');
  });
});
