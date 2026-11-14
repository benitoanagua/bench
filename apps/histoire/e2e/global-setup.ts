/**
 * Global setup for Bench e2e tests.
 *
 * Resolve la ruta de .histoire/dist usando HISTOIRE_ROOT del entorno o una
 * ruta relativa sensible al directorio actual. Falla con mensaje claro si falta
 * el build de Histoire.
 * Se ejecuta antes de que cualquier test empiece.
 */
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

export default async function globalSetup() {
  // La ruta del .histoire/dist se resuelve usando HISTOIRE_ROOT o la raíz actual
  const historiqueRoot = process.env.HISTOIRE_ROOT || process.cwd();
  const distPath = resolve(historiqueRoot, 'apps', 'histoire', '.histoire', 'dist');

  if (!existsSync(distPath)) {
    throw new Error(
      `.histoire/dist no existe en ${distPath}. ` +
      'Ejecuta "pnpm --filter @bench/histoire build" antes de correr tests.',
    );
  }
};