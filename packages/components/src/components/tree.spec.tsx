import { newSpecPage } from '@stencil/core/testing';
import { BchTree } from './tree';
import { BchTreeItem } from './tree-item';

/** Build a one-level tree: root with two visible children, first collapsed. */
function buildItems() {
  return [
    {
      id: 'billing',
      label: 'Billing',
      children: [
        { id: 'nf', label: 'New invoice' },
        { id: 'nc', label: 'Credit note' },
      ],
    },
    { id: 'reports', label: 'Reports' },
  ];
}

async function renderTree() {
  const page = await newSpecPage({
    components: [BchTree, BchTreeItem],
    html: '<bch-tree></bch-tree>',
  });
  (page.root as unknown as { items: unknown }).items = buildItems();
  await page.waitForChanges();
  return { page, tree: page.rootInstance as BchTree, root: page.root as HTMLElement };
}

function rows(tree: BchTree) {
  return tree['flatten']().map((r) => ({ value: r.value, row: r.row }));
}

describe('bch-tree', () => {
  it('expands with ArrowRight (collapse → expand)', async () => {
    const { page, tree } = await renderTree();
    const row = rows(tree)[0].row;
    row.focus();
    tree['onKeyDown'](new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await page.waitForChanges();
    expect(rows(tree)[0].row.getAttribute('aria-expanded')).toBe('true');
    // children become visible rows
    expect(rows(tree).length).toBe(4);
  });

  it('descends into the first child with ArrowRight when already expanded', async () => {
    const { page, tree } = await renderTree();
    rows(tree)[0].row.focus();
    tree['onKeyDown'](new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await page.waitForChanges();
    tree['onKeyDown'](new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await page.waitForChanges();
    const visible = rows(tree);
    expect(visible[1].value).toBe('nf');
    expect(visible[1].row.tabIndex).toBe(0);
  });

  it('moves focus with ArrowDown among visible nodes', async () => {
    const { tree } = await renderTree();
    rows(tree)[0].row.focus();
    tree['onKeyDown'](new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(rows(tree)[1].row.tabIndex).toBe(0);
    tree['onKeyDown'](new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    expect(rows(tree)[0].row.tabIndex).toBe(0);
  });

  it('collapses with ArrowLeft', async () => {
    const { page, tree } = await renderTree();
    rows(tree)[0].row.focus();
    tree['onKeyDown'](new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await page.waitForChanges();
    tree['onKeyDown'](new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    await page.waitForChanges();
    expect(rows(tree).length).toBe(2);
    expect(rows(tree)[0].row.getAttribute('aria-expanded')).toBe('false');
  });

  it('selects with Enter, emitting bchSelect with the node id', async () => {
    const { page, tree, root } = await renderTree();
    const selected: string[] = [];
    root.addEventListener('bchSelect', ((e: CustomEvent<string>) => selected.push(e.detail)) as EventListener);
    rows(tree)[0].row.focus();
    tree['onKeyDown'](new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(selected).toEqual(['billing']);
  });
});
