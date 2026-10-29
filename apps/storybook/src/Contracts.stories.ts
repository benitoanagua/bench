export default {
  title: 'BENCH/Contracts',
};

// Página mínima cuyo único propósito es cargar el loader de @bench/components
// (defineCustomElements se ejecuta en preview.ts), de modo que el test de
// registro pueda verificar que los 52 tags exportados quedan definidos y se
// actualizan como custom elements reales.
export const Registry = {
  render: () => '<div id="bch-contracts-registry" data-bench-contracts></div>',
};
