import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@bench/components';

@NgModule({ schemas: [CUSTOM_ELEMENTS_SCHEMA] })
export class BenchModule {}

export const BENCH_CUSTOM_ELEMENTS_SCHEMA = CUSTOM_ELEMENTS_SCHEMA;
