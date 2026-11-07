import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { stencilContent } from '../story-helpers';

const meta = {
  title: 'BENCH/Foundations/Tokens',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Tokens de diseño de Bench: jerarquía primitivo → semántico → componente, escala de bordes (4 niveles), semántica de estilos de línea y profundidad. Consulta `packages/tokens/src/tokens.css` y `themes.css`.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Tokens: Story = {
  render: () =>
    stencilContent(`
    <section style="max-width:720px;padding:40px;font-family:var(--bch-font-family-sans);color:var(--bch-color-text);line-height:1.6">
      <h1 style="font-size:var(--bch-type-display-size);margin:0 0 8px">Tokens</h1>
      <p style="margin:0 0 20px;color:var(--bch-color-text-muted)">
        Jerarquía de tokens de Bench: <strong>primitivo</strong> (escalas
        brutas), <strong>semántico</strong> (intención: superficie, texto,
        borde, acción) y <strong>componente</strong> (solo cuando un token
        semántico no basta). Los tokens son CSS custom properties: consúmelos,
        nunca los hardcodees en los estilos de los componentes.
      </p>
      <h2 style="font-size:var(--bch-type-body-lg-size);margin-top:24px">Escala de bordes — 4 niveles</h2>
      <table style="width:100%;border-collapse:collapse;font-size:var(--bch-type-body-md-size)">
        <thead>
          <tr style="text-align:left;border-bottom:2px solid var(--bch-color-border-container)">
            <th style="padding:8px">Nivel</th><th style="padding:8px">Ancho</th><th style="padding:8px">Radio</th><th style="padding:8px">Ejemplo</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid var(--bch-color-border-micro)">
            <td style="padding:8px"><strong>1 — Micro</strong></td><td style="padding:8px">1px</td><td style="padding:8px">1px</td><td style="padding:8px">badges, chips, checkboxes</td>
          </tr>
          <tr style="border-bottom:1px solid var(--bch-color-border-micro)">
            <td style="padding:8px"><strong>2 — Control</strong></td><td style="padding:8px">1px</td><td style="padding:8px">2px</td><td style="padding:8px">inputs, buttons, grid cells</td>
          </tr>
          <tr style="border-bottom:1px solid var(--bch-color-border-micro)">
            <td style="padding:8px"><strong>3 — Container</strong></td><td style="padding:8px">1.5px</td><td style="padding:8px">4px</td><td style="padding:8px">panels, cards, toolbars</td>
          </tr>
          <tr style="border-bottom:1px solid var(--bch-color-border-micro)">
            <td style="padding:8px"><strong>4 — Floating</strong></td><td style="padding:8px">2px</td><td style="padding:8px">6px</td><td style="padding:8px">floating cards, modals</td>
          </tr>
        </tbody>
      </table>
      <p style="margin-top:16px;font-size:var(--bch-type-caption-size);color:var(--bch-color-text-muted)">
        Valores exactos en "packages/tokens/src/tokens.css" § borde y radio.
      </p>
    </section>
  `),
};
