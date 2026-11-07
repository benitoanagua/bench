import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { stencilContent } from '../story-helpers';

const meta = {
  title: 'BENCH/Foundations/Integraciones',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Integraciones de Bench: React, Vue, Angular y HTML. Los wrappers adaptan los 52 tags de @bench/components sin duplicar estado, accesibilidad ni comportamiento.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Integraciones: Story = {
  render: () =>
    stencilContent(`
    <section style="max-width:720px;padding:40px;font-family:var(--bch-font-family-sans);color:var(--bch-color-text);line-height:1.6">
      <h1 style="font-size:var(--bch-type-display-size);margin:0 0 8px">Integraciones</h1>
      <p style="margin:0 0 20px;color:var(--bch-color-text-muted)">
        La implementación canónica de Bench es el Web Component
        (<code>@bench/components</code>). Los adaptadores expiden wrappers
        tipados para React, Vue y Angular sin duplicar estado, accesibilidad ni
        comportamiento.
      </p>
      <table style="width:100%;border-collapse:collapse;font-size:var(--bch-type-body-md-size)">
        <thead>
          <tr style="text-align:left;border-bottom:2px solid var(--bch-color-border-container)">
            <th style="padding:8px">Framework</th><th style="padding:8px">Paquete</th><th style="padding:8px">Tags cubiertos</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid var(--bch-color-border-micro)">
            <td style="padding:8px"><strong>React</strong></td><td style="padding:8px"><code>@bench/react</code></td><td style="padding:8px">52 tags</td>
          </tr>
          <tr style="border-bottom:1px solid var(--bch-color-border-micro)">
            <td style="padding:8px"><strong>Vue</strong></td><td style="padding:8px"><code>@bench/vue</code></td><td style="padding:8px">52 tags</td>
          </tr>
          <tr style="border-bottom:1px solid var(--bch-color-border-micro)">
            <td style="padding:8px"><strong>Angular</strong></td><td style="padding:8px"><code>@bench/angular</code></td><td style="padding:8px">52 tags</td>
          </tr>
          <tr style="border-bottom:1px solid var(--bch-color-border-micro)">
            <td style="padding:8px"><strong>HTML</strong></td><td style="padding:8px">Custom elements nativos</td><td style="padding:8px">52 tags</td>
          </tr>
        </tbody>
      </table>
      <p style="margin-top:16px;font-size:var(--bch-type-caption-size);color:var(--bch-color-text-muted)">
        Detalle: <code>docs/integrations/</code> (React, Vue, Angular).
      </p>
    </section>
  `),
};
