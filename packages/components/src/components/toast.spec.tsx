import { newSpecPage } from '@stencil/core/testing';
import { BchToastRegion } from './toast';

describe('bch-toast-region', () => {
  it('renders a shown toast', async () => {
    const page = await newSpecPage({ components: [BchToastRegion], html: '<bch-toast-region></bch-toast-region>' });
    const region = page.rootInstance as BchToastRegion;
    await region.show({ message: 'Saved.' });
    await page.waitForChanges();
    expect(page.root?.textContent).toContain('Saved.');
  });

  it('queues toasts beyond maxVisible and promotes on dismiss', async () => {
    const page = await newSpecPage({ components: [BchToastRegion], html: '<bch-toast-region max-visible="1"></bch-toast-region>' });
    const region = page.rootInstance as BchToastRegion;
    const firstId = await region.show({ message: 'First' });
    await region.show({ message: 'Second' });
    await page.waitForChanges();
    expect(page.root?.textContent).toContain('First');
    expect(page.root?.textContent).not.toContain('Second');

    await region.dismiss(firstId);
    await page.waitForChanges();
    expect(page.root?.textContent).toContain('Second');
  });
});
