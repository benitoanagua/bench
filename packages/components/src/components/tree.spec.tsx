import { newSpecPage } from '@stencil/core/testing';
import { BchTree } from './tree';
import { BchTreeItem } from './tree-item';
import type { BchTreeNode } from './tree-nodes';

const flatItems: BchTreeNode[] = [
  { id: 'billing', label: 'Billing' },
  { id: 'reports', label: 'Reports' },
  { id: 'settings', label: 'Settings' },
];

const branchItems: BchTreeNode[] = [
  {
    id: 'billing',
    label: 'Billing',
    children: [
      { id: 'invoices', label: 'Invoices' },
      { id: 'credit-notes', label: 'Credit notes' },
    ],
  },
  { id: 'reports', label: 'Reports' },
];

function keydown(target: Element, key: string) {
  target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
}

async function render(items: BchTreeNode[]) {
  const page = await newSpecPage({
    components: [BchTree, BchTreeItem],
    html: '<bch-tree></bch-tree>',
  });
  const tree = page.root as HTMLElement & BchTree;
  tree.items = items;
  await page.waitForChanges();
  return { page, tree };
}

describe('bch-tree', () => {
  it('expone role tree y roving tabindex sobre las filas raíz', async () => {
    const { tree } = await render(flatItems);

    expect(tree.querySelector('[role="tree"]')).not.toBeNull();
    const rows = tree.querySelectorAll<HTMLElement>('.bch-tree-item__row');
    expect(rows).toHaveLength(3);
    expect(rows[0].tabIndex).toBe(0);
    expect(rows[1].tabIndex).toBe(-1);
    expect(rows[2].tabIndex).toBe(-1);
  });

  it('ArrowDown/ArrowUp mueven el roving tabindex sin salir de los límites', async () => {
    const { page, tree } = await render(flatItems);
    const nav = tree.querySelector('.bch-tree')!;
    const rows = () => tree.querySelectorAll<HTMLElement>('.bch-tree-item__row');

    keydown(nav, 'ArrowDown');
    await page.waitForChanges();
    expect(rows()[1].tabIndex).toBe(0);

    keydown(nav, 'ArrowDown');
    await page.waitForChanges();
    expect(rows()[2].tabIndex).toBe(0);

    // Clamped at the last row instead of wrapping.
    keydown(nav, 'ArrowDown');
    await page.waitForChanges();
    expect(rows()[2].tabIndex).toBe(0);

    keydown(nav, 'ArrowUp');
    await page.waitForChanges();
    expect(rows()[1].tabIndex).toBe(0);
  });

  it('ArrowRight expande y ArrowLeft colapsa el nodo actual', async () => {
    const { page, tree } = await render(branchItems);
    const nav = tree.querySelector('.bch-tree')!;
    const rootItem = tree.querySelector('bch-tree-item')!;

    keydown(nav, 'ArrowRight');
    await page.waitForChanges();
    // Stencil reflects a true boolean as `expanded=""`, so presence is the
    // stable signal (the literal "true" only exists before reflection).
    expect(rootItem.hasAttribute('expanded')).toBe(true);
    expect(rootItem.querySelector('[aria-expanded]')?.getAttribute('aria-expanded')).toBe('true');

    keydown(nav, 'ArrowLeft');
    await page.waitForChanges();
    expect(rootItem.hasAttribute('expanded')).toBe(false);
    expect(rootItem.querySelector('[aria-expanded]')?.getAttribute('aria-expanded')).toBe('false');
  });

  it('Enter y Space emiten bchSelect con el value del nodo activo', async () => {
    const { page, tree } = await render(flatItems);
    const nav = tree.querySelector('.bch-tree')!;
    const spy = jest.fn();
    tree.addEventListener('bchSelect', (event: Event) => spy((event as CustomEvent).detail));

    keydown(nav, 'Enter');
    await page.waitForChanges();
    expect(spy).toHaveBeenLastCalledWith('billing');

    keydown(nav, 'ArrowDown');
    keydown(nav, ' ');
    await page.waitForChanges();
    expect(spy).toHaveBeenLastCalledWith('reports');
  });
});
