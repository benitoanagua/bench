import { newSpecPage } from '@stencil/core/testing';
import { BchDataTable } from './data-table';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age', numeric: true },
];
const rows = [
  { name: 'Bea', age: '41' },
  { name: 'Ann', age: '30' },
  { name: 'Cid', age: '25' },
];

describe('bch-data-table', () => {
  it('sorts rows ascending then descending on repeated header clicks', async () => {
    const page = await newSpecPage({ components: [BchDataTable] });
    const table = page.doc.createElement('bch-data-table') as HTMLElement & BchDataTable;
    table.columns = columns;
    table.rows = rows;
    page.body.appendChild(table);
    await page.waitForChanges();

    const header = table.querySelector('.bch-data-table__sort') as HTMLButtonElement;
    header.click();
    await page.waitForChanges();
    let names = Array.from(table.querySelectorAll('tbody tr td:first-child')).map(
      (td) => td.textContent,
    );
    expect(names).toEqual(['Ann', 'Bea', 'Cid']);

    header.click();
    await page.waitForChanges();
    names = Array.from(table.querySelectorAll('tbody tr td:first-child')).map(
      (td) => td.textContent,
    );
    expect(names).toEqual(['Cid', 'Bea', 'Ann']);
  });

  it('filters rows across all columns', async () => {
    const page = await newSpecPage({ components: [BchDataTable] });
    const table = page.doc.createElement('bch-data-table') as HTMLElement & BchDataTable;
    table.columns = columns;
    table.rows = rows;
    table.filterable = true;
    page.body.appendChild(table);
    await page.waitForChanges();

    const input = table.querySelector('bch-input') as HTMLElement;
    input.dispatchEvent(new CustomEvent('bchInput', { detail: 'ann' }));
    await page.waitForChanges();
    const names = Array.from(table.querySelectorAll('tbody tr td:first-child')).map(
      (td) => td.textContent,
    );
    expect(names).toEqual(['Ann']);
  });

  it('paginates rows by pageSize', async () => {
    const page = await newSpecPage({ components: [BchDataTable] });
    const table = page.doc.createElement('bch-data-table') as HTMLElement & BchDataTable;
    table.columns = columns;
    table.rows = rows;
    table.pageSize = 2;
    page.body.appendChild(table);
    await page.waitForChanges();
    expect(table.querySelectorAll('tbody tr').length).toBe(2);
    expect(table.querySelector('bch-pagination')).toBeTruthy();
  });
});
