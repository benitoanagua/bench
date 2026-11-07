import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { stencilContent } from '../story-helpers';

const meta = {
  title: 'BENCH/Foundations/Accesibilidad',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Auditoría de accesibilidad de Bench: todos los componentes preservan semántica nativa, soportan teclado, exponen nombre accesible y pasan controles automatizados antes del release.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Accesibilidad: Story = {
  render: () =>
    stencilContent(`
    <section style="max-width:720px;padding:40px;font-family:var(--bch-font-family-sans);color:var(--bch-color-text);line-height:1.6">
      <h1 style="font-size:var(--bch-type-display-size);margin:0 0 8px">Accesibilidad</h1>
      <p style="margin:0 0 20px;color:var(--bch-color-text-muted)">
        Cada componente de Bench debe preservar la semántica nativa donde sea
        posible, soportar interacción por teclado, exponer un nombre accesible
        cuando se requiera y pasar los controles de accesibilidad automatizados
        antes de cada release.
      </p>
      <h2 style="font-size:var(--bch-type-body-lg-size);margin-top:24px">Herramienta de auditoría</h2>
      <p style="margin:0 0 8px">
        El addon <code>a11y</code> de Storybook está deliberadamente
        desactivado (<code>a11y: { test: 'off' }</code>) porque la auditoría
        normativa vive en la suite data-driven de
        <code>packages/testing/visual/a11y.spec.ts</code> (todos los tags
        exportados, WCAG 2.1 A + AA), cableada en el job <code>e2e</code> de
        CI. El addon de Storybook evaluaría la composición completa de cada
        story y recrearía falsos positivos ya justificados por tag
        (tabs/breadcrumbs/splitter: proyección de slots con Stencil scoped).
      </p>
      <p style="margin-top:16px;font-size:var(--bch-type-caption-size);color:var(--bch-color-text-muted)">
        Detalle: <code>docs/quality/a11y.md</code> § herramienta.
      </p>
    </section>
  `),
};
