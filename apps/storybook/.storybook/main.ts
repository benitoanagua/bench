import type { StorybookConfig } from '@stencil/storybook-plugin';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|js)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@stencil/storybook-plugin',
    options: {},
  },
  docs: { autodocs: 'tag' },
  // Telemetry desactivada: el sitio se despliega como artefacto interno y no
  // debe enviar datos de uso a Storybook.
  core: { disableTelemetry: true },
  // Archivos estáticos servidos tal cual: favicon propio, .nojekyll (precaución
  // para GitHub Pages) y demás assets del sitio.
  staticDirs: ['../static'],
};

export default config;
