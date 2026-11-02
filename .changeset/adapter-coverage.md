---
'@bench/react': patch
'@bench/vue': patch
---

Añadir wrappers para los 12 tags que faltaban (`bch-tree`, `bch-tree-item`, `bch-splitter`, `bch-status-bar`, `bch-mode-badge`, `bch-omnibar`, `bch-alert`, `bch-status`, `bch-metric-card`, `bch-empty-state`, `bch-data-table`, `bch-toolbar`). React los tipa por prop y evento; Vue declara los 52 tags en `GlobalComponents` con props y handlers `onBch*`. `check:api` ahora falla si un tag exportado no tiene wrapper en ambos adaptadores.
