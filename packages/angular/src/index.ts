import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { defineCustomElements } from '@bench/components/loader';

/**
 * Angular needs no per-component wrappers: custom elements are first-class in
 * templates once they are registered. This module contributes the two things
 * Angular genuinely misses — `CUSTOM_ELEMENTS_SCHEMA` (so template
 * type-checking accepts `bch-*` tags) and registration of the elements via
 * `@bench/components/loader`, which is idempotent and SSR-safe (Angular
 * Universal runs without `window`).
 */
let registered = false;
function registerElements(): void {
  if (registered || typeof window === 'undefined') return;
  registered = true;
  void defineCustomElements(window);
}
registerElements();

@NgModule({ schemas: [CUSTOM_ELEMENTS_SCHEMA] })
export class BenchModule {}

export const BENCH_CUSTOM_ELEMENTS_SCHEMA = CUSTOM_ELEMENTS_SCHEMA;
