---
'@bench/foundation': minor
---

Añadir los helpers puros del tier (b) de ADR-009: `fuzzyScore`/`normalizeText` (scoring difuso sin acentos ni mayúsculas), `rankFunctions`/`buildAliasTable`/`resolveAlias` (ranking del índice de funciones del §4.1 con prioridad de alias, nombre exacto, subcadena y fuzzy, desempatando por frecuencia y recencia) y `createThrottledRenderer` (fábrica de renderizador con batching por intervalo y temporizadores inyectables). Todos se exportan desde `index.ts` y no tocan el DOM.
