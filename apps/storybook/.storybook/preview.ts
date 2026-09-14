import '@bench/tokens/tokens.css';
import '@bench/tokens/themes.css';
import { defineCustomElements as defineComponents } from '@bench/components/loader';
import { defineCustomElements as definePrimitives } from '@bench/primitives/loader';

definePrimitives();
defineComponents();

export const parameters = {
  controls: { expanded: true },
  a11y: { test: 'todo' },
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
