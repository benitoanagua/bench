import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'bench',
  sourceMap: true,
  globalStyle: 'src/styles/global.css',
  // bch-input and bch-pagination are the only pair Stencil's automatic
  // dependents-similarity bundler (optimizeBundlers) merges into one shared
  // lazy chunk. When 2+ tags share a chunk, its entryKey becomes
  // "tag1.tag2.entry" (dot-joined); lazyBundleIdPlugin.getBundleId() then
  // splits that string on "." to derive the physical filename, but its own
  // trailing ".entry" segment gets counted as if it were a third tag,
  // tripping `components.length > 2` and appending a spurious "_2" suffix
  // to the file Stencil actually writes to disk. Meanwhile dist/esm/index.js's
  // re-export map is built from the untouched tag list and points at the
  // un-suffixed name ("bch-input.bch-pagination.entry.js"), which doesn't
  // exist — breaking any consumer (Vite/Rollup) that resolves this package's
  // ESM entry. Confirmed reproducible on @stencil/core 4.44.2 with a clean
  // build (not a stale-cache artifact). Pinning these two into their own
  // single-component bundles keeps each entryKey single-tag ("bch-input.entry"),
  // which never hits the `> 2` branch, sidestepping the bug entirely.
  bundles: [{ components: ['bch-input'] }, { components: ['bch-pagination'] }],
  outputTargets: [
    { type: 'dist' },
    { type: 'dist-custom-elements', customElementsExportBehavior: 'single-export-module' },
  ],
  extras: { enableImportInjection: true },
};
