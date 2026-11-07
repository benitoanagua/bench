import '@bench/tokens/tokens.css';
import '@bench/tokens/themes.css';
import { defineCustomElements } from '@bench/components/loader';

defineCustomElements();

export const parameters = {
  controls: { expanded: true },
  // Deliberadamente desactivado: la auditoría normativa de accesibilidad es la
  // suite axe data-driven de packages/testing/visual/a11y.spec.ts (todos los
  // tags exportados, wcag2a+wcag2aa, cableada en el job `e2e` de CI). El
  // addon-a11y de Storybook evaluaría la composición completa de cada story y
  // recrearía los falsos positivos ya justificados por tag
  // (tabs/breadcrumbs/splitter: proyección de slots con Stencil scoped). Ver
  // docs/quality/a11y.md § herramienta.
  a11y: { test: 'off' },
  backgrounds: { default: 'light' },
};

export const globalTypes = {
  theme: {
    description: 'BENCH theme',
    defaultValue: 'light',
    toolbar: {
      title: 'Theme',
      icon: 'mirror',
      items: ['light', 'dark'],
    },
  },
};
