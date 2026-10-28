# Initial Component Matrix

| Component                    | Category   | Primary semantic      | Slots                       | Events               |
| ---------------------------- | ---------- | --------------------- | --------------------------- | -------------------- |
| `bch-icon`                   | primitive  | image/decorative icon | none                        | none                 |
| `bch-button`                 | action     | button                | start, default, end         | `bchPress`           |
| `bch-icon-button`            | action     | button                | none                        | `bchPress`           |
| `bch-input`                  | form       | input                 | none                        | `bchInput`           |
| `bch-textarea`               | form       | textarea              | none                        | `bchInput`           |
| `bch-checkbox`               | form       | checkbox              | none                        | `bchChange`          |
| `bch-radio`                  | form       | radio                 | none                        | `bchChange`          |
| `bch-switch`                 | form       | switch                | none                        | `bchChange`          |
| `bch-select`                 | form       | select                | default                     | `bchChange`          |
| `bch-card`                   | content    | article               | header, default, footer     | none                 |
| `bch-badge`                  | feedback   | status                | default                     | none                 |
| `bch-tree` / `bch-tree-item` | navigation | tree/treeitem/group   | none                        | `bchSelect`          |
| `bch-splitter`               | layout     | separator             | none                        | `bchDrag`            |
| `bch-status-bar`             | layout     | status strip          | start, mode, telemetry, end | none                 |
| `bch-mode-badge`             | feedback   | status (aria-live)    | none                        | none                 |
| `bch-omnibar`                | navigation | combobox/listbox      | none                        | `bchRun`, `bchInput` |

