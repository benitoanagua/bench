# Forms and validation

Bench form controls wrap native elements, so native form submission, labels,
autofill and constraint validation keep working.

## Text fields

```html
<bch-input label="Account" name="account" required hint="Company or workspace"></bch-input>
<bch-input label="Email" name="email" type="email" autocomplete="email"></bch-input>
<bch-textarea label="Notes" name="notes" rows="4"></bch-textarea>
```

- Always provide `label`; placeholder text is not a label.
- `hint` and `error` are wired through `aria-describedby` by the component.
- `bchInput` fires on each keystroke, `bchChange` when the value is committed
  (blur/Enter).

## Selection controls

```html
<bch-select label="Currency" name="currency">
  <option value="MXN">MXN</option>
  <option value="USD">USD</option>
</bch-select>

<bch-checkbox name="terms" value="accepted" label="I accept the terms"></bch-checkbox>
<bch-radio name="scope" value="all" label="All records"></bch-radio>
<bch-switch name="notifications" label="Notifications"></bch-switch>
```

`bch-checkbox` and `bch-switch` emit `bchChange` with a boolean;
`bch-radio` and `bch-select` emit the selected string.

## Field composition

For custom layouts, use `bch-form-field` so the label/hint/error contract stays
consistent:

```html
<bch-form-field label="Invoice total" hint="Including tax" error="Must be positive">
  <bch-input name="total" type="number" inputmode="decimal"></bch-input>
</bch-form-field>
```

Do not duplicate the label in both `bch-form-field` and the inner control.

## File upload

```html
<bch-file-upload
  label="Attachments"
  name="files"
  accept="application/pdf,image/*"
  multiple
  max-size-bytes="5242880"
></bch-file-upload>
```

`bchFilesChange` emits the accepted `File[]`; `bchFileError` emits the rejected
ones with a reason. Client-side size/type checks are feedback, not security —
validate again on the server.

## Validation rules

1. Validate on submit and on blur; do not shout while the user is typing the
   first character.
2. Put the message next to the field, not only in a toast.
3. Set `error` on the control and keep the entered value intact.
4. Focus the first invalid control on a failed submit.
5. Use native attributes (`required`, `type`, `min`, `max`, `pattern`) where
   they express the rule. The components forward them.

```ts
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const firstInvalid = form.querySelector('[aria-invalid="true"]');
  firstInvalid?.focus();
});
```

## Dates and time

See the dedicated [dates and time guide](./dates-and-time.md).

Related: [API guidelines](../components/api-guidelines.md),
[forms demo](../demos/bench-demo-auth-sesiones.html).
