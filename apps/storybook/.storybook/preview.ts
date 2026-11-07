import '@bench/tokens/tokens.css';
import '@bench/tokens/themes.css';
import '@bench/tokens/type-scale.css';
import '@bench/fonts/fonts.css';
import { defineCustomElements } from '@bench/components/loader';

defineCustomElements();

export const parameters = {
  controls: { expanded: true },
  // Orden del catálogo en el sidebar de Storybook: Welcome → Foundations →
  // Components → Patterns → Showcase. Dentro de cada grupo, alfabético.
  storySort: {
    order: ['Welcome', 'Foundations', 'Components', 'Patterns', 'Showcase'],
    method: 'alphabetical',
  },
  // Deliberadamente desactivado: la auditoría normativa de accesibilidad es la
  // suite axe data-driven de packages/testing/visual/a11y.spec.ts (todos los
  // tags exportados, wcag2a+wcag2aa, cableada en el job `e2e` de CI). El
  // addon-a11y de Storybook evaluaría la composición completa de cada story y
  // recrearía los falsos positivos ya justificados por tag
  // (tabs/breadcrumbs/splitter: proyección de slots con Stencil scoped). Ver
  // docs/quality/a11y.md § herramienta.
  a11y: { test: 'off' },
};

export const initialGlobals = {
  theme: 'light',
  density: 'comfortable',
};

export const globalTypes = {
  theme: {
    description: 'BENCH theme (tokens/themes.css)',
    toolbar: {
      title: 'Theme',
      icon: 'mirror',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
    },
  },
  density: {
    description: 'Densidad de datos (tokens.css: data-bch-density)',
    toolbar: {
      title: 'Density',
      icon: 'grid',
      items: [
        { value: 'compact', title: 'Compact' },
        { value: 'comfortable', title: 'Comfortable' },
        { value: 'spacious', title: 'Spacious' },
      ],
    },
  },
};

/**
 * Aplica los globals de sistema al documento del preview: el tema vincula
 * `[data-bch-theme]` en <html> (tokens/themes.css) y la densidad enlaza
 * `[data-bch-density]` (tokens.css). Los componentes no ven nada: solo
 * leen custom properties.
 */
export const decorators = [
  (Story, context) => {
    const globals = context?.globals ?? {};
    const theme = globals.theme === 'dark' ? 'dark' : 'light';
    const density = ['compact', 'comfortable', 'spacious'].includes(globals.density)
      ? globals.density
      : 'comfortable';
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-bch-theme', theme);
      document.documentElement.setAttribute('data-bch-density', density);
    }
    return Story();
  },
];
