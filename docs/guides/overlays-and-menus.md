# Overlays and menus

Bench separates modal from non-modal surfaces. Choosing the wrong one is an
accessibility bug, not a style preference.

| Surface         | Component      | Focus behavior                          | Use when                                  |
| --------------- | -------------- | --------------------------------------- | ----------------------------------------- |
| Modal task      | `bch-dialog`   | Native `<dialog>`, trap, restores focus | The page behind must not be used          |
| Offcanvas panel | `bch-drawer`   | No trap, restores focus, Escape closes  | Navigation, filters, secondary context    |
| Menu            | `bch-menu`     | Arrow/Home/End/Escape, restores focus   | A short list of actions                   |
| Tooltip         | `bch-tooltip`  | Hover/focus, `role="tooltip"`           | One sentence of clarification             |
| Toast           | `bch-toast-region` | Queue, no focus steal               | Background result of an action            |

## Dialog

```html
<bch-dialog id="confirm" label="Delete invoice" tone="critical">
  <p>This cannot be undone.</p>
  <bch-button slot="footer" variant="secondary" id="cancel">Cancel</bch-button>
  <bch-button slot="footer" variant="danger" id="delete">Delete</bch-button>
</bch-dialog>
<script type="module">
  const dialog = document.querySelector('#confirm');
  dialog.show();
  dialog.addEventListener('bchClose', () => {
    /* clear transient state */
  });
</script>
```

`tone="critical"` is reserved for genuinely irreversible actions: it escalates
the border and elevation together (Rules 8 and 9). Do not use it for "this
dialog feels important."

## Drawer

Use `bch-drawer` for the non-modal case. It closes on Escape, restores focus to
the trigger, and deliberately does not trap focus — the user may keep working
behind it.

## Menu

```html
<bch-menu label="Actions">
  <bch-menu-item value="duplicate">Duplicate</bch-menu-item>
  <bch-menu-item value="archive">Archive</bch-menu-item>
  <bch-menu-item value="delete" tone="danger">Delete</bch-menu-item>
</bch-menu>
```

Listen to `bchSelect` and run the action in the app. `bchOpenChange` reports
visibility. Menus are action lists, not navigation lists; use `bch-nav` for
destinations.

## Tooltips

```html
<bch-tooltip text="Copies the invoice id">
  <bch-icon-button name="copy" label="Copy id"></bch-icon-button>
</bch-tooltip>
```

The trigger already needs its own accessible name. Do not put essential
instructions only in a tooltip — touch and keyboard users may never see it.

## Toasts

Mount one region per app and call it imperatively:

```html
<bch-toast-region placement="bottom" max-visible="3"></bch-toast-region>
<script type="module">
  const region = document.querySelector('bch-toast-region');
  await region.show({ tone: 'success', message: 'Invoice saved.' });
  await region.show({ tone: 'danger', message: 'Save failed.', duration: 0 });
</script>
```

`duration: 0` keeps the toast until dismissed. Reusing an `id` replaces the
existing toast instead of stacking duplicates. Do not use toasts for errors
that require a decision; use a dialog.

Related: [accessibility contracts](../accessibility/component-contracts.md),
[overlays demo](../demos/bench-demo-definitiva.html).
