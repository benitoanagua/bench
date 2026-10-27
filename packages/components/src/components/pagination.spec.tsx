import { newSpecPage } from '@stencil/core/testing';
import { BchPagination } from './pagination';

describe('bch-pagination', () => {
  it('shows all pages when the total fits without collapsing', async () => {
    const page = await newSpecPage({
      components: [BchPagination],
      html: '<bch-pagination page="1" page-count="5"></bch-pagination>',
    });
    const buttons = page.root?.querySelectorAll('.bch-pagination__page');
    expect(buttons?.length).toBe(5);
  });

  it('collapses distant pages behind an ellipsis', async () => {
    const page = await newSpecPage({
      components: [BchPagination],
      html: '<bch-pagination page="10" page-count="20"></bch-pagination>',
    });
    const ellipses = page.root?.querySelectorAll('.bch-pagination__ellipsis');
    expect(ellipses?.length).toBeGreaterThan(0);
    const current = page.root?.querySelector('[aria-current="page"]');
    expect(current?.textContent?.trim()).toBe('10');
  });

  it('emits bchChange with the clamped next page', async () => {
    const page = await newSpecPage({
      components: [BchPagination],
      html: '<bch-pagination page="1" page-count="3"></bch-pagination>',
    });
    const spy = jest.fn();
    page.root?.addEventListener('bchChange', (event: Event) =>
      spy((event as CustomEvent<number>).detail),
    );
    const next = page.root?.querySelectorAll('.bch-pagination__page')[1] as HTMLButtonElement;
    next.click();
    expect(spy).toHaveBeenCalledWith(2);
  });
});
