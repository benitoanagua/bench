/**
 * Global setup for Bench e2e tests.
 *
 * Falla con mensaje claro si falta el build de Histoire.
 * Se ejecuta antes de que cualquier test empiece.
 * La ruta es relativa al archivo de config de Playwright.
 */
import { existsSync } from 'node:fs';

export default async function globalSetup() {
  // La ruta del .histoire/dist se resuelve usando HISTOIRE_ROOT
  const historiqueRoot = process.env.HISTOIRE_ROOT || '/home/mamaya/Code/bench';
  const distPath = `${historiqueRoot}/apps/histoire/.histoire/dist`;

  if (!existsSync(distPath)) {
    throw new Error(
      `.histoire/dist no existe en ${distPath}. ` +
      'Ejecuta "pnpm --filter @bench/histoire build" antes de correr tests.',
    );
  }
};