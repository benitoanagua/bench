import type { StorybookConfig } from '@stencil/storybook-plugin';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|js)'],
  framework: {
    name: '@stencil/storybook-plugin',
    options: {},
  },
};

export default config;
