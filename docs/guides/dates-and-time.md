# Dates and time

Bench provides date and time pickers that wrap native HTML5 date/time semantics with consistent styling and accessibility.

## Date picker

```html
<bch-date-picker
  label="Travel date"
  name="travel-date"
  locale="es-BO"
  first-day-of-week="1"
  min="2026-01-01"
  max="2026-12-31"
></bch-date-picker>
```

- The stored/emitted `value` is always ISO `yyyy-mm-dd`, matching native `<input type="date">`.
- `locale` controls weekday/month labels in the calendar UI (e.g., `es-BO`, `en-US`).
- `first-day-of-week` sets the starting day: `0` for Sunday, `1` for Monday.
- The component follows the WAI-ARIA date picker dialog pattern with keyboard navigation.

## Time picker

```html
<bch-time-picker label="Meeting time" name="meeting-time" locale="en-US"></bch-time-picker>
```

- Uses 12-hour or 24-hour format based on `locale`.
- Emits time in ISO format (`HH:mm` or `HH:mm:ss`).

## Validation

Use native validation attributes:

```html
<bch-date-picker
  label="Travel date"
  name="travel-date"
  required
  min="2026-01-01"
  max="2026-12-31"
></bch-date-picker>
```

The component forwards `required`, `min`, and `max` to the underlying input.

Related: [Forms and validation](./forms-and-validation.md).
