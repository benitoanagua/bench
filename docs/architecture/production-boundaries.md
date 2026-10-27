# BENCH production boundaries

BENCH is a UI library, not an application framework.

It must not contain domain concepts, network clients, authentication, persistence, exchange-rate logic, transaction logic, or application-specific state.

The component layer owns presentation, interaction, semantics, and accessibility. Applications own domain state and orchestration.

## Scope tiers (per ADR-009)

Every pattern in `bench-design-system.md` §4 is classified into exactly one of
three tiers; the classification lives in
[`docs/architecture/adr-009-catalog-scope.md`](./adr-009-catalog-scope.md).
The rules below are the enforcement of that classification.

### (a) Components — allowed in `@bench/components`

Presentation, interaction, semantics, keyboard behavior only. The component
renders what the application hands it; **no storage, no network, no timers
that implement business cadence, no session logic, no macro state, no undo
stacks**.

Examples: `bch-tree`, `bch-drawer` (non-modal), `bch-splitter`,
`bch-status-bar`, `bch-mode-badge`, `bch-omnibar` (UI only), `bch-dialog`
(structural focus trap for true modals, none of the session semantics),
`bch-data-table` (grid editing + virtualization; values and persistence are
props/events owned by the app).

### (b) Helpers — allowed in `@bench/foundation`, `@bench/primitives`, `@bench/validation`

Pure, domain-free, unit-tested functions or schema validators. No DOM writes,
no rendering, no hidden app state.

Examples: the `campo:valor` Omnibar parser (implicit AND, explicit `or`,
`:>`/`:<`/`:>=`/`:<=`, explicit unknown-field error), the throttled batch
renderer (a factory the app wires its own render callbacks into), the
`bench.functions.json` manifest validator.

### (c) Application guides — documented, demo-validated, never library code

Patterns whose correctness requires domain state (what was persisted, what a
macro recorded, which amounts are at risk). Bench ships a docs page under
`docs/integrations/` explaining how to compose Bench pieces, and a demo in
`apps/showcase` proves it. The library never ships the state machinery.

Examples: IndexedDB + Web Worker persistence, recordable macros and their
injection into the function index, undo/redo history panel, workspace/tab
grouping, multi-monitor placement, Balloon Help, templates, leader-key
sequences, the "Apply" configuration pattern, session expiry timers.

## Red lines (unchanged)

Even for tier (a) components, none of the following may enter the library:

- direct reads/writes of IndexedDB, localStorage, or cookies in component code (a density-preference helper is the single, documented exception; it stores only a UI preference token);
- HTTP/WebSocket clients;
- authentication, session extension/revocation, or rates/ledger arithmetic;
- visual values outside the token scale (`--bch-*`, per package rules).
