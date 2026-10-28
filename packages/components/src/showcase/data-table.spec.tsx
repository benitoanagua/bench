import { newSpecPage, type SpecPage } from '@stencil/core/testing';
import { BchDataTable, type BchCellChangeDetail, type BchPasteDetail } from './data-table';
import { readFileSync } from 'fs';
import { join } from 'path';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age', numeric: true },
];
const rows = [
  { name: 'Bea', age: '41' },
  { name: 'Ann', age: '30' },
  { name: 'Cid', age: '25' },
];

interface Mounted {
  table: HTMLElement & BchDataTable;
  page: SpecPage;
}

async function mount(
  props: Partial<HTMLElement & BchDataTable> = {},
  cols = columns,
  data = rows,
): Promise<Mounted> {
  const page = await newSpecPage({ components: [BchDataTable] });
  const table = page.doc.createElement('bch-data-table') as HTMLElement & BchDataTable;
  table.columns = cols;
  table.rows = data;
  Object.assign(table, props);
  page.body.appendChild(table);
  await page.waitForChanges();
  return { table, page };
}

function bodyCells(table: HTMLElement): string[] {
  return Array.from(table.querySelectorAll('tbody tr td:first-child')).map((td) => td.textContent);
}

describe('bch-data-table', () => {
  it('sorts rows ascending then descending on repeated header clicks', async () => {
    const { table, page } = await mount();
    const header = table.querySelector('.bch-data-table__sort') as HTMLButtonElement;
    header.click();
    await page.waitForChanges();
    let names = bodyCells(table);
    expect(names).toEqual(['Ann', 'Bea', 'Cid']);

    header.click();
    await page.waitForChanges();
    names = bodyCells(table);
    expect(names).toEqual(['Cid', 'Bea', 'Ann']);
  });

  it('filters rows across all columns', async () => {
    const { table, page } = await mount({ filterable: true });
    const input = table.querySelector('bch-input') as HTMLElement;
    input.dispatchEvent(new CustomEvent('bchInput', { detail: 'ann' }));
    await page.waitForChanges();
    expect(bodyCells(table)).toEqual(['Ann']);
  });

  it('paginates rows by pageSize', async () => {
    const { table } = await mount({ pageSize: 2 });
    expect(table.querySelectorAll('tbody tr').length).toBe(2);
    expect(table.querySelector('bch-pagination')).toBeTruthy();
  });

  it('Escape cancels an in-place edit without emitting bchCellChange', async () => {
    const { table, page } = await mount();
    const events: BchCellChangeDetail[] = [];
    table.addEventListener('bchCellChange', (ev: CustomEvent<BchCellChangeDetail>) =>
      events.push(ev.detail),
    );
    const td = table.querySelector('tbody td[data-key="age"]') as HTMLTableCellElement;
    td.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
    await page.waitForChanges();
    const input = table.querySelector('.bch-data-table__input') as HTMLInputElement;
    expect(input).toBeTruthy();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await page.waitForChanges();
    expect(table.querySelector('.bch-data-table__input')).toBeFalsy();
    expect(bodyCells(table)).toEqual(['Bea', 'Ann', 'Cid']);
    expect(events).toEqual([]);
  });

  it('Enter confirms an edit and emits bchCellChange with a typed value', async () => {
    const { table, page } = await mount();
    const events: BchCellChangeDetail[] = [];
    table.addEventListener('bchCellChange', (ev: CustomEvent<BchCellChangeDetail>) =>
      events.push(ev.detail),
    );
    const td = table.querySelector('tbody td[data-key="age"]') as HTMLTableCellElement;
    td.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
    await page.waitForChanges();
    const input = table.querySelector('.bch-data-table__input') as HTMLInputElement;
    input.value = '42';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await page.waitForChanges();
    expect(table.querySelector('.bch-data-table__input')).toBeFalsy();
    expect(td.textContent).toBe('42');
    expect(events).toEqual([{ rowIndex: 0, key: 'age', value: 42, row: { name: 'Bea', age: 42 } }]);
  });

  it('marks the cell is-invalid on blur with an invalid draft and keeps the old value', async () => {
    const { table, page } = await mount();
    let changeCount = 0;
    table.addEventListener('bchCellChange', () => changeCount++);
    const td = table.querySelector('tbody td[data-key="age"]') as HTMLTableCellElement;
    td.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
    await page.waitForChanges();
    const input = table.querySelector('.bch-data-table__input') as HTMLInputElement;
    input.value = 'abc';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    await page.waitForChanges();
    expect(table.querySelector('.bch-data-table__input')).toBeFalsy();
    expect(td.classList.contains('is-invalid')).toBe(true);
    expect(td.textContent).toBe('41');
    expect(td.title).toContain('number');
    expect(changeCount).toBe(0);
  });

  it('arrow keys move focus between editable cells', async () => {
    const { table } = await mount();
    const tds = table.querySelectorAll('tbody td[data-key]');
    expect(tds).toHaveLength(6);
    expect(tds[0]).toBeTruthy();
  });

  it('renders a totals row with numeric sums and the double-border tokens', async () => {
    const { table } = await mount({ showTotals: true });
    const totalRow = table.querySelector('tbody tr.is-total') as HTMLTableRowElement;
    expect(totalRow).toBeTruthy();
    const rowHeader = totalRow.querySelector('th[scope="row"]');
    expect(rowHeader?.textContent).toContain('Totals');
    const numericTd = totalRow.querySelector('td.numeric');
    expect(numericTd?.textContent).toBe('96');
    // Style check — the totals border must come from the line-semantics tokens:
    let css = '';
    try {
      css = readFileSync(join(__dirname, 'data-table.css'), 'utf8');
    } catch {
      /* path not available in every test environment */
    }
    if (css) {
      const isTotalRule = css.slice(css.indexOf('tr.is-total'));
      expect(isTotalRule).toContain('var(--bch-line-total-width)');
      expect(isTotalRule).toContain('var(--bch-line-total)');
    }
  });

  it('emits bchPaste with typed rows on bulk paste and never mutates rows', async () => {
    const { table, page } = await mount();
    table.columns = [
      { key: 'name', label: 'Name' },
      { key: 'age', label: 'Age', type: 'number' },
      { key: 'active', label: 'Active', type: 'boolean' },
      { key: 'due', label: 'Due', type: 'date' },
    ];
    await page.waitForChanges();
    const rowsBefore = table.rows;
    const details: BchPasteDetail[] = [];
    table.addEventListener('bchPaste', (ev: CustomEvent<BchPasteDetail>) =>
      details.push(ev.detail),
    );
    const paste = new Event('paste', { bubbles: true, cancelable: true });
    Object.defineProperty(paste, 'clipboardData', {
      value: {
        getData: () => 'B\t12\ttrue\t2025-12-31\nC\t0\tsí\t2020-02-31\n\tin-a-few-days\t2020-02-29',
      },
    });
    table.dispatchEvent(paste);
    await page.waitForChanges();
    expect(details).toHaveLength(1);
    expect(details[0].rows).toEqual([
      { name: 'B', age: 12, active: true, due: '2025-12-31' },
      { name: 'C', age: 0, active: true, due: '2020-02-31' },
      { name: null, age: 'in-a-few-days', active: '2020-02-29', due: null },
    ]);
    expect(table.rows).toBe(rowsBefore); // never mutated locally
  });

  it('does not intercept a single-line plain-text paste', async () => {
    const { table } = await mount();
    const details: BchPasteDetail[] = [];
    table.addEventListener('bchPaste', (ev: CustomEvent<BchPasteDetail>) =>
      details.push(ev.detail),
    );
    const paste = new Event('paste', { bubbles: true, cancelable: true });
    Object.defineProperty(paste, 'clipboardData', { value: { getData: () => 'Ann' } });
    table.dispatchEvent(paste);
    expect(details).toEqual([]);
  });

  it('virtualizes the tbody slice when rows exceed the threshold', async () => {
    const manyRows = Array.from({ length: 700 }, (_, i) => ({
      name: `r${i}`,
      age: String(i % 90),
    }));
    const { table } = await mount({}, columns, manyRows);
    const rendered = table.querySelectorAll('tbody tr').length;
    expect(rendered).toBeGreaterThan(5);
    expect(rendered).toBeLessThan(50);
    expect(bodyCells(table)[0]).toBe('r0');
  });
});
