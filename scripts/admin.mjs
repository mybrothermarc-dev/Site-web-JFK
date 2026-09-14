/**
 * Lance l'admin du site en local : « npm run admin ».
 * Démarre le serveur de développement avec Keystatic activé (variable JFK_ADMIN)
 * et ouvre le navigateur directement sur l'admin.
 */
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const astroCli = fileURLToPath(new URL('../node_modules/astro/astro.js', import.meta.url));

const child = spawn(process.execPath, [astroCli, 'dev'], {
  stdio: 'inherit',
  env: { ...process.env, JFK_ADMIN: '1' },
});

child.on('exit', (code) => process.exit(code ?? 0));
