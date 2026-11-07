import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BchDataTable } from './index';

let container: HTMLDivElement;
let root: Root;
let mounted: boolean;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  mounted = true;
});

afterEach(async () => {
  if (mounted) React.act(() => root.unmount());
  container.remove();
  mounted = false;
  // Stencil renders (and lazy-load chunks) on macrotasks: nothing may dangle
  // past jsdom teardown, so drain a couple of turns.
  for (let i = 0; i < 4; i += 1) {
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
});

function render(element: React.ReactElement) {
  React.act(() => {
    root.render(element);
  });
}

function dataTable(): HTMLElement {
  const element = container.querySelector('bch-data-table');
  if (!element) throw new Error('bch-data-table not rendered');
  return element as HTMLElement;
}

describe('non-primitive props', () => {
  const columns = [
    {
      key: 'account',
      label: 'Account',
    },
    {
      key: 'sessions',
      label: 'Sessions',
      align: 'end',
    },
  ];

  it('asigna arrays y objetos como propiedad del elemento, no como atributo', () => {
    render(<BchDataTable columns={columns} />);

    const element = dataTable();
    expect(element.getAttribute('columns')).toBeNull();
    expect((element as unknown as { columns: unknown }).columns).toEqual(columns);
  });

  it('no stringifica objetos descriptores en atributos', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
      render(<BchDataTable rows={[{ account: 'ada', sessions: 3 }]} caption="Sessions" />);
      const element = dataTable();
      expect((element as unknown as { rows: unknown }).rows).toEqual([
        { account: 'ada', sessions: 3 },
      ]);
      expect(element.hasAttribute('rows')).toBe(false);
    } finally {
      consoleSpy.mockRestore();
    }
  });
});
