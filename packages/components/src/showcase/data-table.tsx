import { Component, Event, type EventEmitter, Prop, State, h } from '@stencil/core';

export interface BchTableColumn {
  key: string;
  label: string;
  numeric?: boolean;
  /** Defaults to true — set false for columns that shouldn't be sortable (e.g. an actions column). */
  sortable?: boolean;
}

type SortDirection = 'asc' | 'desc' | 'none';

/**
 * A real interactive table: click a sortable column header to sort by it
 * (asc → desc → none), type in the filter box to filter across all column
 * values, and page through results — not just a static markup demo.
 * Sorting/filtering/pagination all run client-side over `rows`; for
 * server-side paging, listen for `bchPageChange`/`bchSortChange`/`bchFilterChange`
 * and re-fetch instead of relying on the internal state.
 */
@Component({ tag: 'bch-data-table', styleUrl: 'data-table.css', shadow: false, scoped: true })
export class BchDataTable {
  @Prop() columns: BchTableColumn[] = [];
  @Prop() rows: Record<string, string>[] = [];
  @Prop() caption = '';
  @Prop() filterable = false;
  @Prop() filterPlaceholder = 'Filter…';
  @Prop() pageSize = 0; // 0 = no pagination, show all rows

  @Event() bchSortChange!: EventEmitter<{ key: string; direction: SortDirection }>;
  @Event() bchFilterChange!: EventEmitter<string>;
  @Event() bchPageChange!: EventEmitter<number>;

  @State() private sortKey = '';
  @State() private sortDirection: SortDirection = 'none';
  @State() private filterValue = '';
  @State() private page = 1;

  private toggleSort(column: BchTableColumn) {
    if (column.sortable === false) return;
    if (this.sortKey !== column.key) {
      this.sortKey = column.key;
      this.sortDirection = 'asc';
    } else if (this.sortDirection === 'asc') {
      this.sortDirection = 'desc';
    } else if (this.sortDirection === 'desc') {
      this.sortKey = '';
      this.sortDirection = 'none';
    } else {
      this.sortDirection = 'asc';
    }
    this.page = 1;
    this.bchSortChange.emit({ key: this.sortKey, direction: this.sortDirection });
  }

  private onFilterInput = (event: CustomEvent<string>) => {
    this.filterValue = event.detail;
    this.page = 1;
    this.bchFilterChange.emit(this.filterValue);
  };

  private goToPage(page: number) {
    this.page = page;
    this.bchPageChange.emit(page);
  }

  private filteredRows(): Record<string, string>[] {
    if (!this.filterable || !this.filterValue.trim()) return this.rows;
    const needle = this.filterValue.trim().toLowerCase();
    return this.rows.filter((row) => this.columns.some((col) => (row[col.key] ?? '').toLowerCase().includes(needle)));
  }

  private sortedRows(rows: Record<string, string>[]): Record<string, string>[] {
    if (!this.sortKey || this.sortDirection === 'none') return rows;
    const key = this.sortKey;
    const column = this.columns.find((c) => c.key === key);
    const sorted = [...rows].sort((a, b) => {
      const av = a[key] ?? '';
      const bv = b[key] ?? '';
      if (column?.numeric) return Number(av) - Number(bv);
      return av.localeCompare(bv);
    });
    return this.sortDirection === 'desc' ? sorted.reverse() : sorted;
  }

  private pagedRows(rows: Record<string, string>[]): Record<string, string>[] {
    if (!this.pageSize) return rows;
    const start = (this.page - 1) * this.pageSize;
    return rows.slice(start, start + this.pageSize);
  }

  private ariaSortFor(column: BchTableColumn): 'ascending' | 'descending' | 'none' {
    if (this.sortKey !== column.key) return 'none';
    if (this.sortDirection === 'asc') return 'ascending';
    if (this.sortDirection === 'desc') return 'descending';
    return 'none';
  }

  render() {
    const filtered = this.filteredRows();
    const sorted = this.sortedRows(filtered);
    const pageCount = this.pageSize ? Math.max(Math.ceil(sorted.length / this.pageSize), 1) : 1;
    const visibleRows = this.pagedRows(sorted);

    return (
      <div class="bch-data-table-wrapper">
        {this.filterable ? (
          <div class="bch-data-table__toolbar">
            <bch-input
              type="search"
              placeholder={this.filterPlaceholder}
              aria-label={this.filterPlaceholder}
              value={this.filterValue}
              onBchInput={this.onFilterInput}
            />
          </div>
        ) : null}
        <div class="bch-data-table" role="region" aria-label={this.caption || 'Data table'} tabIndex={0}>
          <table>
            {this.caption ? <caption>{this.caption}</caption> : null}
            <thead>
              <tr>
                {this.columns.map((c) => {
                  const sortable = c.sortable !== false;
                  return (
                    <th scope="col" class={c.numeric ? 'numeric' : ''} aria-sort={sortable ? this.ariaSortFor(c) : undefined}>
                      {sortable ? (
                        <button type="button" class="bch-data-table__sort" onClick={() => this.toggleSort(c)}>
                          <span>{c.label}</span>
                          <bch-icon
                            name={
                              this.sortKey === c.key && this.sortDirection === 'asc'
                                ? 'chevron-up'
                                : this.sortKey === c.key && this.sortDirection === 'desc'
                                  ? 'chevron-down'
                                  : 'arrows-sort'
                            }
                            aria-hidden="true"
                          />
                        </button>
                      ) : (
                        c.label
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {visibleRows.length === 0 ? (
                <tr><td colSpan={this.columns.length} class="bch-data-table__empty">No matching rows.</td></tr>
              ) : (
                visibleRows.map((row) => (
                  <tr>{this.columns.map((c) => <td class={c.numeric ? 'numeric' : ''}>{row[c.key]}</td>)}</tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {this.pageSize && sorted.length > this.pageSize ? (
          <div class="bch-data-table__footer">
            <bch-pagination page={this.page} pageCount={pageCount} onBchChange={(event: CustomEvent<number>) => this.goToPage(event.detail)} />
          </div>
        ) : null}
      </div>
    );
  }
}
