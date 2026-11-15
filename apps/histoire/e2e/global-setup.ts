/**
 * Global setup para los tests e2e de Bench Histoire.
 *
 * Resuelve la ruta de apps/histoire/.histoire/dist a partir de la ubicación
 * de ESTE archivo (nunca de process.cwd(), que cambia según quién invoque el
 * proceso). Si el build no existe, intenta construir Histoire (y sus
 * dependencias de workspace) y, si falla, da instrucciones claras.
 *
 * Se ejecuta antes de que cualquier test empiece.
 */
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

export default async function globalSetup() {
  // Este archivo vive en apps/histoire/e2e/ → la raíz del paquete está en ../..
  // HISTOIRE_ROOT permite apuntar a otro checkout (CI/contenedores).
  // El paquete es ESM ("type": "module"): la ruta viene de import.meta.url.
  const e2eDir = dirname(fileURLToPath(import.meta.url));
  const histoireDir = process.env.HISTOIRE_ROOT
    ? resolve(process.env.HISTOIRE_ROOT, 'apps', 'histoire')
    : resolve(e2eDir, '..');
  const projectRoot = resolve(histoireDir, '..');
  const distPath = resolve(histoireDir, '.histoire', 'dist');

  if (existsSync(distPath)) return;

  console.warn(
    `.histoire/dist no existe en ${distPath}. Intentando build de Histoire...`,
  );
  try {
    // El sufijo `...` incluye las dependencias de workspace del paquete
    // (@bench/components, @bench/tokens, @bench/fonts).
    await new Promise<void>((res, rej) => {
      const build = spawn(
        'pnpm',
        ['--filter', '@bench/histoire...', 'build'],
        { cwd: projectRoot, stdio: 'inherit', shell: true },
      );
      build.on('close', (code) => (code === 0 ? res() : rej(new Error(`exit ${code}`))));
      build.on('error', rej);
    });
    console.log('Build de Histoire completado.');
  } catch (error) {
    throw new Error(
      `.histoire/dist no existe en ${distPath} y el build automático falló. ` +
        'Ejecuta "pnpm --filter @bench/histoire build" manualmente antes de correr los tests. ' +
        `Causa: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (!existsSync(distPath)) {
    throw new Error(
      `El build terminó pero .histoire/dist sigue sin existir en ${distPath}. ` +
        'Revisa la salida del build de Histoire.',
    );
  }
}
