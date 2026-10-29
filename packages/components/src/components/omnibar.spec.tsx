import { newSpecPage } from '@stencil/core/testing';
import { BchOmnibar } from './omnibar';

const ENTRIES = [
  {
    id: 'nf',
    nombre: 'Nueva factura',
    path: ['Facturación', 'Ventas', 'Nueva factura'],
    tipo: 'pantalla' as const,
  },
  {
    id: 'nc',
    nombre: 'Nueva nota de crédito',
    path: ['Facturación', 'Ventas', 'Nota de crédito'],
    tipo: 'pantalla' as const,
  },
  {
    id: 'rep-ventas',
    nombre: 'Reporte de ventas',
    path: ['Reportes', 'Ventas'],
    tipo: 'reporte' as const,
  },
];

async function renderOmnibar() {
  const page = await newSpecPage({
    components: [BchOmnibar],
    html: '<bch-omnibar></bch-omnibar>',
  });
  const omnibar = page.rootInstance as BchOmnibar;
  (page.root as unknown as { entries: unknown }).entries = ENTRIES;
  await page.waitForChanges();
  return { page, omnibar };
}

/** Feed the query state directly; keeps tests independent of input plumbing. */
function typeQuery(omnibar: BchOmnibar, query: string) {
  omnibar['query'] = query;
  omnibar['open'] = query.trim() !== '';
  omnibar['activeIndex'] = 0;
}

type Result = { id?: string; text?: string };

describe('bch-omnibar', () => {
  it('renders the entries it is given', async () => {
    const { page, omnibar } = await renderOmnibar();
    // No query yet: the first entries of the index are shown unfiltered.
    expect(page.root?.textContent).toContain('Nueva factura');
    const ids = (omnibar['results']() as Result[])
      .slice(0, ENTRIES.length)
      .map((result) => result.id);
    expect(ids).toEqual(['nf', 'nc', 'rep-ventas']);
  });

  it('filters results by free text and keeps the raw-text row last', async () => {
    const { omnibar } = await renderOmnibar();
    typeQuery(omnibar, 'nota');
    const results = omnibar['results']() as Result[];
    // 'nota' matches only the credit note, plus the always-present text row.
    expect(results.length).toBe(2);
    expect(results[0]).toMatchObject({ id: 'nc' });
    expect(results[1]).toEqual({ text: 'nota' });
  });

  it('ranks an exact alias above a substring match', async () => {
    const { omnibar } = await renderOmnibar();
    (omnibar as unknown as { entries: unknown }).entries = [
      ...ENTRIES,
      {
        id: 'fast',
        nombre: 'Nueva factura rápida',
        path: ['Facturación'],
        tipo: 'accion',
        alias: 'nfx',
      },
    ];
    typeQuery(omnibar, 'nfx');
    const results = omnibar['results']() as Result[];
    expect(results[0]).toMatchObject({ id: 'fast' });
  });

  it('emits bchRun with the entry on Enter over the active result', async () => {
    const { page, omnibar } = await renderOmnibar();
    const runs: unknown[] = [];
    page.root?.addEventListener('bchRun', ((e: CustomEvent) =>
      runs.push(e.detail)) as EventListener);
    typeQuery(omnibar, 'nota');
    omnibar['onKeyDown'](new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(runs.length).toBe(1);
    expect(runs[0]).toMatchObject({ id: 'nc', nombre: 'Nueva nota de crédito' });
  });

  it('closes and clears the query on Escape', async () => {
    const { page, omnibar } = await renderOmnibar();
    typeQuery(omnibar, 'nota');
    await page.waitForChanges();
    omnibar['onKeyDown'](new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(omnibar['query']).toBe('');
    expect(omnibar['open']).toBe(false);
  });
});
