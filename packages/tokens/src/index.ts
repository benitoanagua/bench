import './tokens.css';
import './themes.css';
import './type-scale.css';

export { breakpoints, minWidthQuery, watchBreakpoint } from './breakpoints';
export type { BreakpointKey } from './breakpoints';

export const benchTokens = {
  prefix: 'bch',
  spacing: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16'],
  radii: ['sm', 'md', 'lg', 'xl', 'pill'],
  controlSizes: ['sm', 'md', 'lg'],
  themes: ['light', 'dark'],
  breakpointKeys: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
  zIndexLayers: ['base', 'raised', 'sticky', 'dropdown', 'overlay', 'drawer', 'modal', 'toast', 'tooltip'],
  typeRoles: ['display', 'h1', 'h2', 'h3', 'h4', 'body-lg', 'body-md', 'body-sm', 'label', 'caption', 'overline'],
} as const;
