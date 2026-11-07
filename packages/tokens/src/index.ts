/**
 * The JavaScript entry is side-effect-free and must stay loadable from Node
 * (tests and SSR): the stylesheets are explicit imports — tokens.css,
 * themes.css and type-scale.css, all three documented in
 * docs/guides/getting-started.md.
 */

export { breakpoints, minWidthQuery, watchBreakpoint } from './breakpoints.js';
export type { BreakpointKey } from './breakpoints.js';

export const benchTokens = {
  prefix: 'bch',
  spacing: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16'],
  radii: ['sm', 'md', 'lg', 'xl', 'pill'],
  controlSizes: ['sm', 'md', 'lg'],
  themes: ['light', 'dark'],
  breakpointKeys: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
  zIndexLayers: [
    'base',
    'raised',
    'sticky',
    'dropdown',
    'overlay',
    'drawer',
    'modal',
    'toast',
    'tooltip',
  ],
  typeRoles: [
    'display',
    'h1',
    'h2',
    'h3',
    'h4',
    'body-lg',
    'body-md',
    'body-sm',
    'label',
    'caption',
    'overline',
  ],
} as const;
