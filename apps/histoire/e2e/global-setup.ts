/**
 * Global setup for Bench e2e tests.
 *
 * Resolve la ruta de .histoire/dist usando HISTOIRE_ROOT del entorno o una
 * ruta relativa sensible al directorio actual. Intenta construir Histoire si el
 * directorio no existe, mostrando instrucciones claras.
 * Se ejecuta antes de que cualquier test empiece.
 */
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';

export default async function globalSetup() {
  // La ruta del .histoire/dist se resuelve usando HISTOIRE_ROOT o la raíz actual
  const historiqueRoot = process.env.HISTOIRE_ROOT || process.cwd();
  const distPath = resolve(historiqueRoot, 'apps', 'histoire', '.histoire', 'dist');

  if (!existsSync(distPath)) {
    console.warn(
      `.histoire/dist no existe en ${distPath}. ` +
      'Intentando build automático de Histoire...'
    );
    try {
      const buildProcess = spawn('pnpm', ['build'], {
        cwd: historischeRoot,
        stdio: 'pipe',
        shell: true,
      });
      await new Promise((resolve, reject) => {
        buildProcess.on('close', (code) => {
          if (code === 0) resolve(null);
          else reject(new Error(`Build failed with code ${code}`));
        });
        buildProcess.on('error', reject);
      });
      console.log('Build de Histoire completado.');
    } catch (error) {
      throw new Error(
        `.histoire/dist no existe en ${distPath}. ` +
        'Ejecuta "pnpm --filter @bench/histoire build" manualmente antes de correr tests. ' +
        error instanceof Error ? error.message : String(error)
      );
    }
  }
};