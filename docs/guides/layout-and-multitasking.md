# Layout and multitasking

Bench assumes a dense, multi-panel workspace. Layout components provide the
resizable structure; the application owns which panels exist and what state
they hold.

## Shell composition

A typical shell combines navigation, a work area, a persistent status bar and
one or more resizable panes:

```html
<div class="workspace">
  <section class="workspace__list"><!-- navigation or list --></section>
  <bch-splitter orientation="horizontal"></bch-splitter>
  <section class="workspace__detail"><!-- detail --></section>
</div>
<bch-status-bar>
  <span slot="start">Page 3 of 42</span>
  <span slot="mode">EDIT</span>
  <span slot="telemetry">1.25 ms</span>
  <span slot="end">es-MX · 100%</span>
</bch-status-bar>
```

`bch-splitter` is only the separator — it does not render or own the panes.
The application lays the panes out and clamps their size. The separator renders a real `separator`
with arrow-key resizing (±16px). Listen to `bchDrag` for the delta and clamp
it in application state:

```ts
splitter.addEventListener('bchDrag', (event) => {
  const { deltaPx } = event.detail;
  width = Math.min(640, Math.max(240, width + deltaPx));
});
```

## Tabs and panels

`bch-tabs` implements the tablist/tab/tabpanel pattern with roving focus and
arrow/Home/End navigation:

```html
<bch-tabs>
  <bch-tab value="overview" active>Overview</bch-tab>
  <bch-tab value="activity">Activity</bch-tab>
  <bch-tab-panel value="overview">...</bch-tab-panel>
  <bch-tab-panel value="activity">...</bch-tab-panel>
</bch-tabs>
```

`bchChange` emits the selected value. Keep the selected value in application
state if it must survive reloads.

## Non-modal panels

`bch-drawer` is the offcanvas panel: it restores focus, closes on Escape and
**does not trap focus** because it is non-modal. Use `bch-dialog` when the user
must not interact with the page behind the panel.

```html
<button type="button" id="open-filters">Filters</button>
<bch-drawer id="filters" label="Filters" side="end">
  <!-- panel content -->
</bch-drawer>
<script type="module">
  const drawer = document.querySelector('#filters');
  document.querySelector('#open-filters').addEventListener('click', () => drawer.show());
</script>
```

## Application-owned layout state

Tier (c) patterns from
[ADR-009](../architecture/adr-009-catalog-scope.md) are not library code:

- panel sizes and collapsed panes persisted per user;
- user-arranged tab groups and workspace switchers;
- moving a panel to a second monitor with `window.open` +
  `screen.isExtended` feature detection and a silent fallback;
- inspector panels built from `bch-card`, `bch-status-bar` and `bch-tabs`.

Keep this state in the application (or a small app-level store). Bench
components only expose the interaction surface. The
[showcase](../showcase.md) demonstrates the visual composition, and the
[layout demo](../demos/bench-demo-layout-interaccion.html) shows the intended
behavior without a framework.
