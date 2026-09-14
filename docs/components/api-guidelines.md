# BENCH API Guidelines

## Properties

Properties are typed, minimal and semantic. Boolean attributes use boolean Stencil props. Avoid string props that encode multiple states.

## Slots

Use slots when consumers need to provide content or another BENCH component. Prefer `start`, `end`, `header`, `footer` and the default slot only where their meaning is stable.

## Events

Custom events use the `hh` prefix and carry typed payloads. Events describe user-facing component behavior, not implementation details.

## Methods

Expose a method only when imperative behavior cannot be expressed naturally through properties, slots or events. Focus and form-control methods are typical examples.

## Native semantics

Prefer native HTML controls and semantics. A custom component should enhance HTML rather than replace browser behavior without a strong reason.
