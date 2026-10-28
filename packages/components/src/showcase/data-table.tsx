import {
  Component,
  Element,
  Event,
  Listen,
  type EventEmitter,
  Prop,
  State,
  h,
} from '@stencil/core';
import { parseISODate } from '../util/iso-date';

export interface BchTableColumn {
  key: string;
  label: string;
  numeric?: boolean;
  /** Cell data type. Defaults to `'text'`; `numeric: true` is kept as a legacy alias for `type: 'number'`. */
  type?: 'text' | 'number' | 'boolean' | 'date';
  /** Defaults to true — set false for columns that shouldn't be sortable (e.g. an actions column). */
  sortable?: boolean;
}

export type BchTableCellValue = string | number | boolean | null;
export type BchTableRow = Record<string, BchTableCellValue>;

export interface BchCellChangeDetail {
  /** Index of the edited row within the `rows` prop array (source order, not filtered/sorted order). */
  rowIndex: number;
  key: string;
  value: BchTableCellValue;
  row: BchTableRow;
}

export interface BchPasteDetail {
  rows: BchTableRow[];
}

type SortDirection = 'asc' | 'desc' | 'none';
type ColumnType = 'text' | 'number' | 'boolean' | 'date';

/** §4.2 — non-visual constants (_VM/layout tuning, no visual values_). */
const VIRTUAL_THRESHOLD = 500;
const OVERSCAN = 5;
/** Floor for the virtual window when the viewport height is unknown (0 in SSR/mock environments). */
const MIN_VIRTUAL_WINDOW = 20;
/** §2.5 — confirmation flash is 180ms; CSS drives it via --bch-motion-normal, JS clears `is-committed` with the same band. */
const COMMIT_FLASH_MS = 180;

const TRUE_WORDS = ['true', '1', 'sí', 'si', 'yes', 'y'];
const FALSE_WORDS = ['false', '0', 'no', 'n'];

interface RowRef {
  row: BchTableRow;
  /** Index of `row` inside the `rows` prop array — stable identity across filter/sort/page. */
  sourceIndex: number;
}

interface ValidationResult {
  ok: boolean;
  value: BchTableCellValue;
  message?: string;
}

function parseBoolean(value: BchTableCellValue): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value !== 0;
  const word = String(value).trim().toLowerCase();
  if (TRUE_WORDS.includes(word)) return true;
  if (FALSE_WORDS.includes(word)) return false;
  return Boolean(value);
}

/**
 * A real interactive table: click a sortable column header to sort by it
 * (asc → desc → none), type in the filter box to filter across all column
 * values, and page through results — not just a static markup demo.
 * Sorting/filtering/pagination all run client-side over `rows`; for
 * server-side paging, listen for `bchPageChange`/`bchSortChange`/`bchFilterChange`
 * and re-fetch instead of relying on the internal state.
 *
 * ### Grid editable in-place §4.2
 * Double-click or `Enter` on a body cell opens an in-cell `<input>` (provisional
 * state: dashed line via `--bch-line-provisional`), `Enter`/`Tab` confirms,
 * `Escape` cancels, and validation runs on **blur** — never per keystroke.
 * Arrows (`←`/`→`) move focus between cells while no cell is being edited;
 * while editing, they move the caret (the input keeps normal text navigation)
 * and `Tab` is the cell-to-cell move. A valid commit emits `bchCellChange`
 * (source `rowIndex`, `key`, typed `value`, merged `row`) and flashes the cell
 * with the §2.5 confirmation band (`is-committed`, `--bch-motion-normal` toward
 * `--bch-color-action-soft`; reduced-motion honored because the duration is the
 * token itself). An invalid blur marks the cell `is-invalid` (danger color +
 * native `title` tooltip) and discards the draft.
 *
 * Validation criteria (`bch-data-table__input` blur, and Tab): empty string
 * clears the cell to `null` (allowed for every type); `number` uses
 * `parseFloat` semantics (`NaN` → error); `boolean` accepts
 * true/false/1/0/sí/si/yes/y/no/n case-insensitive; `date` requires strict
 * ISO `yyyy-mm-dd` (shared local-time `parseISODate` from `util/iso-date`).
 *
 * ### Totals row (`showTotals`, §2.3)
 * The double line is reserved to totalization boundaries, so a totals row is
 * double-bordered via `--bch-line-total`/`--bch-line-total-width`. Only numeric
 * columns (`type:'number'` or the `numeric` alias) get a sum; other cells stay
 * empty. The sum covers exactly the rows visible on screen — the current page
 * when `pageSize > 0`, otherwise the whole (filtered/sorted) list: what the eye
 * sees is what gets totalized.
 *
 * ### Virtualization (§4.2)
 * With more than `VIRTUAL_THRESHOLD` rows (typ. dataset ≥ hundreds/thousands)
 * the `<tbody>` renders only the visible window plus `OVERSCAN` rows, with
 * spacer rows keeping the scroll height (plain DOM slicing — no per-row
 * transforms, and `display:block` hacks that would break `<table>` are avoided).
 * Row height reads the live `--bch-density-row-height` token, so virtualization
 * follows the density being used. Automatic; no new props.
 *
 * ### Bulk paste (§4.2)
 * A `paste` event containing tabs/newlines (Excel/Sheets grid paste) is parsed
 * line by line, cells split on `\t`, and mapped positionally onto the columns.
 * *No rows are mutated locally* — the component emits `bchPaste` and the
 * application decides. Conversion respects each target column's declared type
 * (`numeric` = alias of `number`): `number` cells use the same `parseFloat`
 * criterion as validation (unparseable → kept as text), `boolean` accepts the
 * same word set, `date` requires ISO `yyyy-mm-dd`; `text` keeps the string as
 * found. Cells beyond the column list are dropped; shorter rows fill the
 * remaining columns with `null`. A single-line plain-text paste (e.g. into the
 * filter box) is never intercepted.
 */
@Component({ tag: 'bch-data-table', styleUrl: 'data-table.css', shadow: false, scoped: true })
export class BchDataTable {
  @Element() private el!: HTMLElement;
  @Prop() columns: BchTableColumn[] = [];
  @Prop() rows: (Record<string, string> | BchTableRow)[] = [];
  @Prop() caption = '';
  @Prop() filterable = false;
  @Prop() filterPlaceholder = 'Filter…';
  @Prop() pageSize = 0; // 0 = no pagination, show all rows
  @Prop() showTotals = false;

  @Event() bchSortChange!: EventEmitter<{ key: string; direction: SortDirection }>;
  @Event() bchFilterChange!: EventEmitter<string>;
  @Event() bchPageChange!: EventEmitter<number>;
  @Event() bchCellChange!: EventEmitter<BchCellChangeDetail>;
  @Event() bchPaste!: EventEmitter<BchPasteDetail>;

  @State() private sortKey = '';
  @State() private sortDirection: SortDirection = 'none';
  @State() private filterValue = '';
  @State() private page = 1;
  /** Edited cell (source row index + key). The cell renders as an input while this is set. */
  @State() private editingCell: { rowIndex: number; key: string } | null = null;
  @State() private draftValue = '';
  @State() private invalidCell: { rowIndex: number; key: string; message: string } | null = null;
  @State() private committedCell: { rowIndex: number; key: string } | null = null;
  /** Scroll position of the viewport while the row count exceeds the virtual threshold. */
  @State() private scrollState: { top: number; viewport: number } | null = null;

  /** In-memory (not emitted back into the `rows` prop) overlay of confirmed edits. */
  private edits = new Map<number, Record<string, BchTableCellValue>>();
  private commitTimer?: ReturnType<typeof setTimeout>;

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

  private columnType(column?: BchTableColumn): ColumnType {
    if (!column) return 'text';
    if (column.type) return column.type;
    if (column.numeric) return 'number'; // legacy alias, keeps right-aligned cells working
    return 'text';
  }

  private filteredRows(): RowRef[] {
    if (!this.filterable || !this.filterValue.trim()) {
      return this.rows.map((row, sourceIndex) => ({ row, sourceIndex }));
    }
    const needle = this.filterValue.trim().toLowerCase();
    return this.rows
      .map((row, sourceIndex) => ({ row, sourceIndex }))
      .filter(({ row }) =>
        this.columns.some((col) =>
          String(row[col.key] ?? '')
            .toLowerCase()
            .includes(needle),
        ),
      );
  }

  private sortedRows(rows: RowRef[]): RowRef[] {
    if (!this.sortKey || this.sortDirection === 'none') return rows;
    const key = this.sortKey;
    const column = this.columns.find((c) => c.key === key);
    const numeric = this.columnType(column) === 'number';
    const sorted = [...rows].sort((a, b) => {
      const av = a.row[key] ?? '';
      const bv = b.row[key] ?? '';
      if (numeric) return Number(av) - Number(bv);
      return String(av).localeCompare(String(bv));
    });
    return this.sortDirection === 'desc' ? sorted.reverse() : sorted;
  }

  private pagedRows(rows: RowRef[]): RowRef[] {
    if (!this.pageSize) return rows;
    const start = (this.page - 1) * this.pageSize;
    return rows.slice(start, start + this.pageSize);
  }

  /** Merged display value for one cell: confirmed in-place edits win over the source row. */
  private displayValue(rowRef: RowRef, column: BchTableColumn): BchTableCellValue {
    const merged = this.edits.get(rowRef.sourceIndex);
    if (merged && column.key in merged) return merged[column.key];
    return rowRef.row[column.key] ?? null;
  }

  /**
   * Rendering criterion for cell text: `number` renders raw (`String(value)`;
   * no locale/financial formatting until the §2.10 extension applies),
   * `date` renders the stored ISO string as-is, `null`/empty renders empty, and
   * `boolean` renders the literal `true`/`false` — locale-neutral, keeps the
   * value copy-pastable, and matches the words accepted by validation.
   */
  private cellText(rowRef: RowRef, column: BchTableColumn): string {
    const value = this.displayValue(rowRef, column);
    if (value === null || value === undefined || value === '') return '';
    if (this.columnType(column) === 'boolean') return parseBoolean(value) ? 'true' : 'false';
    return String(value);
  }

  private validateCell(type: ColumnType, text: string): ValidationResult {
    const trimmed = text.trim();
    if (trimmed === '') return { ok: true, value: null }; // empty clears the cell
    if (type === 'number') {
      const n = parseFloat(trimmed);
      if (Number.isNaN(n)) return { ok: false, value: null, message: 'Not a valid number.' };
      return { ok: true, value: n };
    }
    if (type === 'boolean') {
      const word = trimmed.toLowerCase();
      if (TRUE_WORDS.includes(word)) return { ok: true, value: true };
      if (FALSE_WORDS.includes(word)) return { ok: false, value: false };
      return {
        ok: false,
        value: null,
        message: 'Use true/false, 1/0, sí/no or yes/no.',
      };
    }
    if (type === 'date') {
      if (!parseISODate(trimmed)) {
        return { ok: false, value: null, message: 'Use the yyyy-mm-dd date format.' };
      }
      return { ok: true, value: trimmed };
    }
    return { ok: true, value: text };
  }

  private startEdit(rowRef: RowRef, column: BchTableColumn) {
    this.editingCell = { rowIndex: rowRef.sourceIndex, key: column.key };
    this.draftValue = this.cellText(rowRef, column);
    this.invalidCell = null;
    this.committedCell = null;
  }

  private cancelEdit() {
    const was = this.editingCell;
    this.editingCell = null;
    this.invalidCell = null;
    if (was) this.focusCell(was.rowIndex, was.key);
  }

  private commitEdit(input: HTMLInputElement): boolean {
    if (!this.editingCell) return false;
    const { rowIndex, key } = this.editingCell;
    const column = this.columns.find((c) => c.key === key);
    const result = this.validateCell(this.columnType(column), input.value);
    if (!result.ok) {
      // §4.2 — validation on blur, not per keystroke: invalid draft unconfirmed,
      // cell stays flagged with the error in a native tooltip.
      this.invalidCell = { rowIndex, key, message: result.message ?? 'Invalid value.' };
      this.editingCell = null;
      this.focusCell(rowIndex, key);
      return false;
    }
    this.editingCell = null;
    this.invalidCell = null;
    if (column) {
      const merged = { ...(this.edits.get(rowIndex) ?? {}), [key]: result.value };
      this.edits.set(rowIndex, merged);
      const sourceRow = this.rows[rowIndex] ?? {};
      const row: BchTableRow = { ...sourceRow, ...merged };
      this.bchCellChange.emit({ rowIndex, key, value: result.value, row });
      this.committedCell = { rowIndex, key };
      if (this.commitTimer) clearTimeout(this.commitTimer);
      this.commitTimer = setTimeout(() => (this.committedCell = null), COMMIT_FLASH_MS);
    }
    return true;
  }

  private cellSelector(rowIndex: number, key: string): HTMLTableCellElement | null {
    return this.el.querySelector<HTMLTableCellElement>(
      `tbody td[data-row="${rowIndex}"][data-key="${key}"]`,
    );
  }

  private focusCell(rowIndex: number, key: string) {
    this.cellSelector(rowIndex, key)?.focus();
  }

  private focusSibling(from: HTMLTableCellElement, delta: number) {
    const tds = Array.from(this.el.querySelectorAll<HTMLTableCellElement>('tbody td[data-key]'));
    const index = tds.indexOf(from);
    if (index < 0) return;
    tds[index + delta]?.focus();
  }

  private onCellKeyDown = (event: KeyboardEvent, rowRef: RowRef, column: BchTableColumn) => {
    const td = event.currentTarget as HTMLTableCellElement;
    if (event.key === 'Enter') {
      event.preventDefault();
      this.startEdit(rowRef, column);
      return;
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.focusSibling(td, 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.focusSibling(td, -1);
    }
  };

  private onInputKeyDown = (event: KeyboardEvent) => {
    const input = event.currentTarget as HTMLInputElement;
    if (event.key === 'Enter') {
      event.preventDefault();
      this.commitEdit(input);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.cancelEdit();
    } else if (event.key === 'Tab') {
      event.preventDefault();
      this.commitEdit(input); // Tab never abandons an invalid edit in one blind step
      if (!this.invalidCell) this.focusSibling(input.closest('td')!, event.shiftKey ? -1 : 1);
    }
  };

  private onViewportScroll = (event: Event) => {
    const viewport = event.target as HTMLElement;
    this.scrollState = { top: viewport.scrollTop, viewport: viewport.clientHeight };
  };

  /**
   * §4.2 bulk paste — see the class docs for the type-detection criteria.
   * Only multi-line/tabbed text is intercepted; single-line paste keeps the
   * native behavior (filter box etc.) so no gesture is stolen surface-wide.
   */
  @Listen('paste')
  onPaste(event: ClipboardEvent) {
    const text = event.clipboardData?.getData('text/plain') ?? '';
    if (!text.includes('\t') && !text.includes('\n')) return;
    event.preventDefault();
    const lines = text
      .replace(/\r/g, '')
      .split('\n')
      .filter((line) => line !== '');
    const parsed: BchTableRow[] = lines.map((line) => {
      const cells = line.split('\t');
      const row: BchTableRow = {};
      this.columns.forEach((column, i) => {
        const raw = (cells[i] ?? '').trim();
        row[column.key] = this.convertPastedCell(raw, this.columnType(column));
      });
      return row;
    });
    this.bchPaste.emit({ rows: parsed });
  }

  private convertPastedCell(raw: string, type: ColumnType): BchTableCellValue {
    if (raw === '') return null;
    if (type === 'number') {
      const n = parseFloat(raw);
      return Number.isNaN(n) ? raw : n;
    }
    if (type === 'boolean') {
      const word = raw.toLowerCase();
      if (TRUE_WORDS.includes(word)) return true;
      if (FALSE_WORDS.includes(word)) return false;
      return raw;
    }
    if (type === 'date') return parseISODate(raw) ? raw : raw;
    return raw;
  }

  private ariaSortFor(column: BchTableColumn): 'ascending' | 'descending' | 'none' {
    if (this.sortKey !== column.key) return 'none';
    if (this.sortDirection === 'asc') return 'ascending';
    if (this.sortDirection === 'desc') return 'descending';
    return 'none';
  }

  /** Live row height, always read from the density token (never hardcoded). */
  private rowHeightPx(): number {
    const value = getComputedStyle(this.el).getPropertyValue('--bch-density-row-height').trim();
    if (value.endsWith('px')) {
      const n = parseFloat(value);
      if (Number.isFinite(n) && n > 0) return n;
    }
    // Fallback only for environments with no computed styles (SSR/mock tests).
    return 36;
  }

  render() {
    const filtered = this.filteredRows();
    const sorted = this.sortedRows(filtered);
    const pageCount = this.pageSize ? Math.max(Math.ceil(sorted.length / this.pageSize), 1) : 1;
    const allVisible = this.pagedRows(sorted);
    const rowCount = allVisible.length;

    // Simple row virtualization: slice the tbody once above the threshold;
    // spacer rows keep the scroll geometry (see class docs, §4.2).
    let visible = allVisible;
    let padTop = 0;
    let padBottom = 0;
    if (rowCount > VIRTUAL_THRESHOLD) {
      const rowHeight = this.rowHeightPx();
      let start = 0;
      let count = MIN_VIRTUAL_WINDOW;
      if (this.scrollState) {
        start = Math.max(0, Math.floor(this.scrollState.top / rowHeight) - OVERSCAN);
        count = Math.max(
          MIN_VIRTUAL_WINDOW,
          Math.ceil(this.scrollState.viewport / rowHeight) + 2 * OVERSCAN,
        );
      }
      const end = Math.min(start + count, rowCount);
      visible = allVisible.slice(start, end);
      padTop = start * rowHeight;
      padBottom = (rowCount - end) * rowHeight;
    }

    const totals: Record<string, number> = {};
    if (this.showTotals) {
      for (const column of this.columns) {
        if (this.columnType(column) !== 'number') continue;
        const sum = allVisible.reduce((acc, rowRef) => {
          const value = Number(this.displayValue(rowRef, column));
          return acc + (Number.isFinite(value) ? value : 0);
        }, 0);
        totals[column.key] = sum;
      }
    }

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
        <div
          class="bch-data-table"
          role="region"
          aria-label={this.caption || 'Data table'}
          tabIndex={0}
          onScroll={this.onViewportScroll}
        >
          <table>
            {this.caption ? <caption>{this.caption}</caption> : null}
            <thead>
              <tr>
                {this.columns.map((c) => {
                  const sortable = c.sortable !== false;
                  return (
                    <th
                      scope="col"
                      class={this.columnType(c) === 'number' ? 'numeric' : ''}
                      aria-sort={sortable ? this.ariaSortFor(c) : undefined}
                    >
                      {sortable ? (
                        <button
                          type="button"
                          class="bch-data-table__sort"
                          onClick={() => this.toggleSort(c)}
                        >
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
              {padTop > 0 ? (
                <tr aria-hidden="true" class="bch-data-table__virtual-spacer">
                  <td colSpan={this.columns.length} style={{ height: `${padTop}px` }} />
                </tr>
              ) : null}
              {rowCount === 0 ? (
                <tr>
                  <td colSpan={this.columns.length} class="bch-data-table__empty">
                    No matching rows.
                  </td>
                </tr>
              ) : (
                visible.map((rowRef) => (
                  <tr>
                    {this.columns.map((c) => {
                      const numeric = this.columnType(c) === 'number';
                      const editing =
                        this.editingCell?.rowIndex === rowRef.sourceIndex &&
                        this.editingCell.key === c.key;
                      const invalid =
                        !editing &&
                        this.invalidCell?.rowIndex === rowRef.sourceIndex &&
                        this.invalidCell.key === c.key;
                      const committed =
                        !editing &&
                        this.committedCell?.rowIndex === rowRef.sourceIndex &&
                        this.committedCell.key === c.key;
                      const tdClass = {
                        numeric,
                        'is-editing': editing,
                        'is-invalid': invalid,
                        'is-committed': committed,
                      };
                      return editing ? (
                        <td
                          class={tdClass}
                          data-row={rowRef.sourceIndex}
                          data-key={c.key}
                          title={this.invalidCell?.message}
                        >
                          <input
                            class="bch-data-table__input"
                            value={this.draftValue}
                            autoFocus
                            aria-label={c.label}
                            onInput={(ev: Event) =>
                              (this.draftValue = (ev.target as HTMLInputElement).value)
                            }
                            onKeyDown={this.onInputKeyDown}
                            onBlur={(ev: FocusEvent) =>
                              this.commitEdit(ev.target as HTMLInputElement)
                            }
                          />
                        </td>
                      ) : (
                        <td
                          class={tdClass}
                          data-row={rowRef.sourceIndex}
                          data-key={c.key}
                          tabIndex={0}
                          title={invalid ? this.invalidCell?.message : undefined}
                          onClick={() => this.focusCell(rowRef.sourceIndex, c.key)}
                          onDblClick={() => this.startEdit(rowRef, c)}
                          onKeyDown={(ev: KeyboardEvent) => this.onCellKeyDown(ev, rowRef, c)}
                        >
                          {this.cellText(rowRef, c)}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
              {padBottom > 0 ? (
                <tr aria-hidden="true" class="bch-data-table__virtual-spacer">
                  <td colSpan={this.columns.length} style={{ height: `${padBottom}px` }} />
                </tr>
              ) : null}
              {this.showTotals && rowCount > 0 ? (
                <tr class="is-total">
                  <th scope="row">
                    <span>Totals</span>
                  </th>
                  {this.columns.slice(1).map((c) => {
                    const numeric = this.columnType(c) === 'number';
                    return (
                      <td class={numeric ? 'numeric' : ''}>
                        {numeric ? String(totals[c.key]) : null}
                      </td>
                    );
                  })}
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        {this.pageSize && sorted.length > this.pageSize ? (
          <div class="bch-data-table__footer">
            <bch-pagination
              page={this.page}
              pageCount={pageCount}
              onBchChange={(event: CustomEvent<number>) => this.goToPage(event.detail)}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
