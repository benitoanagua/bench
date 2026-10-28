/** Omnibar data contract (§4.1). The entry type is duplicated here to avoid a runtime
 * dependency on @bench/foundation for Stencil spec tests. The canonical definition
 * lives in @bench/foundation next to the pure parser.
 */
export type BchFunctionEntry = {
  id: string;
  nombre: string;
  path: string[];
  sinonimos?: string[];
  alias?: string;
  permisos?: string[];
  tipo: 'pantalla' | 'accion' | 'macro' | 'reporte';
  frecuenciaUso?: number;
};

/** Value emitted by `bchRun`: a function entry, or the raw query text. */
export type BchOmnibarResult = BchFunctionEntry | { text: string };
