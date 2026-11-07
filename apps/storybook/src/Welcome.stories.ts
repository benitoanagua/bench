import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { stencilContent } from './story-helpers';

const meta = {
  title: 'BENCH/Welcome',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Página de bienvenida del Design System Bench. Aquí arranca la exploración de los componentes, tokens y patrones del sistema.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/** Página de inicio del catálogo Bench. */
export const Welcome: Story = {
  render: () =>
    stencilContent(`
    <section style="max-width:720px;padding:40px;font-family:var(--bch-font-family-sans);color:var(--bch-color-text);line-height:1.6">
      <h1 style="font-size:var(--bch-type-display-size);margin:0 0 8px">Bench</h1>
      <p style="margin:0 0 20px;color:var(--bch-color-text-muted)">
        Design system construido con Stencil y Web Components, pensado para
        pasantes de 8+ horas frente a la interfaz: densidad controlada, tema
        claro/oscuro de primera clase y componentes accesibles por defecto.
      </p>
      <h2 style="font-size:var(--bch-type-body-lg-size);margin-top:24px">Contenido</h2>
      <ul style="margin:8px 0 0 20px;color:var(--bch-color-text-muted)">
        <li><strong>Foundations</strong> — Tokens, Accesibilidad, Integraciones.</li>
        <li><strong>Components</strong> — Botón, Input, Select, Checkbox, Switch, Tabs, Dialog, Drawer, Tooltip, Badge, Progress y más.</li>
        <li><strong>Patterns</strong> — Galería de composición y estados visuales.</li>
        <li><strong>Showcase</strong> — Aplicación de referencia con datos reales.</li>
      </ul>
      <p style="margin-top:24px;font-size:var(--bch-type-caption-size);color:var(--bch-color-text-disabled)">
        Registra los elementos con <code>defineCustomElements()</code> de
        <code>@bench/components/loader</code> e importa
        <code>@bench/tokens/tokens.css</code> +
        <code>@bench/tokens/themes.css</code> +
        <code>@bench/tokens/type-scale.css</code> en tu aplicación.
      </p>
    </section>
  `),
};
