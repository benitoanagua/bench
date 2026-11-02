import type { Config } from '@stencil/core';
import { config as buildConfig } from './stencil.config';

/**
 * `stencil build --dev` is the only way Stencil typechecks the whole project,
 * but its `dist` output target wipes and rewrites `dist/`. A subsequent cached
 * `build` can then leave an incomplete dist (no `esm/`), which breaks
 * consumers such as the React test suite. Emit the typecheck build through a
 * custom-elements target in a throwaway directory so `dist/` only ever
 * contains a real build.
 */
export const config: Config = {
  ...buildConfig,
  outputTargets: [
    {
      type: 'dist-custom-elements',
      dir: '.typecheck',
      externalRuntime: true,
    },
  ],
};
