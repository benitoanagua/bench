import '@bench/tokens/tokens.css';
import '@bench/tokens/themes.css';
import { defineCustomElements } from '@bench/components/loader';

defineCustomElements();

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
