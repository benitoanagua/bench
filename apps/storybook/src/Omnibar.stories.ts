import type { Meta } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { BchOmnibar, BchFunctionEntry } from '@bench/components';

const meta = {
  title: 'BENCH/Components/Navigation/Omnibar',
  component: BchOmnibar,
} satisfies Meta<BchOmnibar>;

export default meta;

const entries: BchFunctionEntry[] = [
  {
    id: 'nf',
    nombre: 'Nueva factura',
    path: ['Facturación', 'Ventas', 'Nueva factura'],
    sinonimos: ['factura', 'invoice'],
    alias: 'nf',
    tipo: 'pantalla',
    frecuenciaUso: 120,
  },
  {
    id: 'nc',
    nombre: 'Nueva nota de crédito',
    path: ['Facturación', 'Ventas', 'Nota de crédito'],
    tipo: 'pantalla',
    frecuenciaUso: 30,
  },
  {
    id: 'rep-ventas',
    nombre: 'Reporte de ventas',
    path: ['Reportes', 'Ventas'],
    tipo: 'reporte',
    frecuenciaUso: 75,
  },
];

/** Hierarchical breadcrumb results, alias ranks first, raw text always a fallback. */
export const Default = {
  render: () => h('bch-omnibar', { entries }),
};

export const QueryFilterSyntax = {
  // Spec §4.1 live interpretation: type e.g. "cliente:acme" and the hint line
  // under the input shows the parse; an unknown field like "omoneda:USD"
  // produces the explicit "no existe el campo …" message.
  render: () =>
    h('bch-omnibar', { entries, placeholder: 'Try: nota · cliente:acme · omoneda:USD' }),
};

export const EmptyIndex = {
  render: () =>
    h('bch-omnibar', { entries: [], placeholder: 'Search functions or filter (field:value)' }),
};
