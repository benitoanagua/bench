# Data density and editing

Bench is built for eight-hour data work. The grid must stay readable at high
row counts and must make provisional state unmistakable.

## Table

`bch-data-table` is a native `<table>` with typed columns, sorting, filtering,
pagination, inline editing and paste.

```html
<bch-data-table id="invoices" caption="Invoices"></bch-data-table>
<script type="module">
  const table = document.querySelector('#invoices');
  table.columns = [
    { key: 'id', label: 'Invoice', sortable: false },
    { key: 'customer', label: 'Customer' },
    { key: 'amount', label: 'Amount', type: 'number', numeric: true },
    { key: 'due', label: 'Due', type: 'date' },
    { key: 'paid', label: 'Paid', type: 'boolean' },
  ];
  table.rows = [
    { id: 'INV-1', customer: 'Acme', amount: 1200, due: '2026-11-01', paid: false },
    { id: 'INV-2', customer: 'Globex', amount: 840, due: '2026-11-04', paid: true },
  ];
  table.filterable = true;
  table.pageSize = 50;
  table.showTotals = true;

  table.addEventListener('bchCellChange', (event) => {
    const { rowIndex, key, value, row } = event.detail;
    // Update application state; the table does not persist domain data.
  });
</script>
```

- Numeric columns align right and use tabular figures; use `type: 'number'`
  (the legacy `numeric: true` alias still works).
- `showTotals` adds a totals row for numeric columns, styled with the
  double-line closing boundary (Rule 8).
- Above 500 rows the table renders a virtual window of visible rows; sorting
  and filtering still operate on the full dataset.
- `bchPaste` emits parsed rows from a clipboard block so the app can validate
  and merge them. The table never writes directly to a backend.

## Inline editing and provisional state

Editing is **Apply-pattern** territory (tier c): the table emits a cell change,
the application keeps a draft snapshot and decides when to commit.

1. Snapshot the row when editing starts.
2. Mark the row/cell provisional with the dashed line token
   (`--bch-line-provisional`) or `bch-empty-state[provisional]` for an empty
   draft surface.
3. Offer three explicit actions: **Apply**, **Live edit** (commit on blur) and
   **Discard**. Never let "discard" be implicit when a draft exists.
4. On apply, emit the real mutation from the app and clear the provisional
   style; on discard, restore the snapshot.

The provisional border is a token decision, not a component state: see
[line-style semantics](../foundations/tokens.md#line-style-semantics-rule-8).

## Density

Data surfaces should inherit density from a container attribute rather than
hard-coding row heights:

```html
<main data-bch-density="compact">
  <bch-data-table ...></bch-data-table>
</main>
```

The comfortable mode is the default; compact is for long grids; spacious is
for touch or low-density review screens. Terminal density is allowed only on a
panel explicitly marked `data-bch-panel="raw-data"`.

## Scrolling and empty states

Wrap the table in a container that can scroll; keep the header and totals row
visible in the application shell if needed. Use `bch-empty-state` when a filter
returns no rows, and keep the filter text visible so the user can undo it.

Related: [component matrix](../components/component-matrix.md),
[data demo](../demos/bench-demo-datos-persistencia.html).
