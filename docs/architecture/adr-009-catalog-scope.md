# ADR-009: Scope classification of the spec §4 catalog (library vs helper vs guide)

## Context

`bench-design-system.md` §4 defines a catalog of patterns for a dense,
8-hour-a-day operational tool. `production-boundaries.md` currently states a
flat rule: "BENCH is a UI library, not an application framework. It must not
contain domain concepts, network clients, authentication, persistence,
exchange-rate logic, transaction logic, or application-specific state."

Some §4 patterns (persistence via IndexedDB + Web Worker, recordable macros,
undo history, financial amounts) are application-domain concerns per that
rule; others (Tree, Offcanvas, Splitter, status bar) are plainly reusable UI.
Putting every §4 pattern in the library would violate the boundaries doc;
refusing every stateful pattern would leave the Grid/Omnibar/Tiling stack
half-built. The classification must be explicit so that gaps between spec and
implementation can be closed without smuggling domain state into the
components package.

## Decision

Each §4 pattern is classified into exactly one of three tiers:

- **(a) Component of Bench** — stateless presentation + interaction semantics,
  lives in `@bench/components`, exported as a `bch-*` web component, documented
  and tested like any other component.
- **(b) Helper / utility** — pure, domain-free function or module (typically in
  `@bench/foundation`), unit-tested, no rendering of domain data itself.
- **(c) Application guide with demo** — the pattern is _documented_ in the docs
  tree as an integration guide (how an application composes Bench pieces to
  build it) and validated by a demo in `apps/showcase`; no library code owns
  the domain state.

Classification:

| §4 Pattern                                                                                  | Tier | Home                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Omnibar / command bar — **UI part** (input + results list + keyboard nav)                   | (a)  | `@bench/components` (`bch-omnibar`)                                                                                                                                          |
| Omnibar — `campo:valor` parser (AND implicit, `or`, `:> :< :>= :<=`, unknown-field message) | (b)  | `@bench/foundation` (pure function + tests)                                                                                                                                  |
| Alias table, function ranking (frecuency/recents), fuzzy scoring                            | (b)  | `@bench/foundation` — pure ranking over manifest data; apps own the manifest                                                                                                 |
| Function manifest (`bench.functions.json`) schema + CI validator                            | (b)  | `tooling/validation/validate-functions-manifest.mjs` (repo tooling)                                                                                                          |
| Leader-key sequences / armed state, Command Palette (Ctrl+K)                                | (c)  | guide + demo (keyboard-event orchestration is app-level)                                                                                                                     |
| Context menus (8–10 relevant actions)                                                       | (c)  | composition of existing `bch-menu`, guide                                                                                                                                    |
| Grid editable in-place / density                                                            | (a)  | `bch-data-table` (showcase package, spec-level behaviors added in phases 2–3)                                                                                                |
| Tree                                                                                        | (a)  | `bch-tree`                                                                                                                                                                   |
| Accordion                                                                                   | (a)  | already `bch-accordion`                                                                                                                                                      |
| Offcanvas (non-modal panel)                                                                 | (a)  | `bch-drawer` non-modal semantics (ADR-010: drawer becomes non-modal; modal variant is `bch-dialog`)                                                                          |
| Splitter / tiling                                                                           | (a)  | `bch-splitter` (row/column resize UI only)                                                                                                                                   |
| Panel layout persistence between sessions                                                   | (c)  | app-level, guide                                                                                                                                                             |
| Inspector panel                                                                             | (c)  | composition of existing components, guide                                                                                                                                    |
| User-arranged tab groups, workspace switcher                                                | (c)  | guide + demo                                                                                                                                                                 |
| Multi-screen Window Placement (second monitor)                                              | (c)  | guide + demo (feature-detected, silent degradation)                                                                                                                          |
| HyperCard record cards                                                                      | (c)  | composition, guide + demo                                                                                                                                                    |
| Throttled renderer (batch interval per panel type)                                          | (b)  | `@bench/foundation` (pure, timed, no DOM ownership)                                                                                                                          |
| Modes with visual feedback (v / Esc), cursors                                               | (c)  | guide + demo (badge + cursor are `bch-*-mode-badge` + CSS conventions)                                                                                                       |
| Mode badge                                                                                  | (a)  | `bch-mode-badge`                                                                                                                                                             |
| Status bar                                                                                  | (a)  | `bch-status-bar`                                                                                                                                                             |
| Adaptive tooltip delay                                                                      | (a)  | improvement inside `bch-tooltip`                                                                                                                                             |
| Balloon Help                                                                                | (c)  | guide (uses `bch-tooltip`)                                                                                                                                                   |
| Macros (record/play, injected FunctionEntry)                                                | (c)  | app-level: recorder state is domain state; guide + demo                                                                                                                      |
| "Apply" pattern (snapshot / live edit / discard)                                            | (c)  | guide + demo                                                                                                                                                                 |
| Undo history panel                                                                          | (c)  | guide + demo (history stack is domain state)                                                                                                                                 |
| Templates (provisional state via dashed border)                                             | (c)  | guide; the provisional _style_ is token work covered by the border-scale tokenization                                                                                        |
| Persistence: IndexedDB + Web Worker                                                         | (c)  | guide + demo; library provides no storage layer                                                                                                                              |
| Session expiry warning                                                                      | (a)  | `bch-dialog` composition with fixed UI structure (critical border ring, two equally visible actions, focus trap); the session logic (timers, extend/revoke) is (c) app-level |
| Password field w/ Caps Lock indicator, org/workspace selector                               | (c)  | composition of `bch-input`/`bch-select`, guide                                                                                                                               |

## Consequences

- `production-boundaries.md` is updated to Codify this three-tier rule instead
  of a flat prohibition, keeping the hard line: **no domain state, storage,
  network, auth, or financial business logic enters `@bench/components`.**
- Helpers in tier (b) must stay pure (no DOM writes from parser/rankers, no
  timers hidden inside components from the stream-throttled renderer).
- Anything classified (c) requires: a docs page under `docs/integrations/`,
  a demo demonstrating it, and a traceability row tying it to a §4 subsection.
- The components package keeps only presentation. The financial §2.10 colors
  are _tokens_, available system-wide; components like badges/status accept
  `risk`/`security` variants only as opt-in styling, documented against the
  §2.10 qualification criteria.
