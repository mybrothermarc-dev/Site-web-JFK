/**
 * Studio JFK : tableau de bord local pour modifier, prévisualiser et publier le site.
 * Lancé sans fenêtre noire par « Studio-JFK.vbs » (ou « npm run studio » dans un terminal).
 *
 * - sert le tableau de bord sur http://127.0.0.1:4400 ;
 * - démarre l'admin Keystatic en arrière-plan (http://127.0.0.1:4321) ;
 * - liste les changements en attente et publie : build → commit → push.
 * Tout reste sur l'ordinateur : rien de ce Studio n'est mis en ligne.
 */
import http from 'node:http';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const HOST = '127.0.0.1';
const STUDIO_PORT = 4400;
const SITE_PORT = 4321;
const STUDIO_URL = `http://${HOST}:${STUDIO_PORT}/`;
const SITE_URL = `http://${HOST}:${SITE_PORT}`;
const ASTRO_CLI = path.join(ROOT, 'node_modules', 'astro', 'astro.js');
const LOG_FILE = path.join(ROOT, 'studio.log');
const BUILD_LOG = path.join(ROOT, 'build.log');

// Node doit rester trouvable par les sous-processus, même lancé depuis l'explorateur Windows.
process.env.PATH = `${path.dirname(process.execPath)}${path.delimiter}${process.env.PATH ?? ''}`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const stripAnsi = (text) => text.replace(/\x1b\[[0-9;]*m/g, '');

function log(...parts) {
  fs.appendFile(LOG_FILE, `[${new Date().toISOString()}] ${parts.join(' ')}\n`, () => {});
}

/** Lance une commande et récupère sa sortie complète, sans jamais lever d'exception. */
function run(cmd, args, { env = process.env, onData } = {}) {
  return new Promise((resolve) => {
    let out = '';
    let child;
    try {
      child = spawn(cmd, args, { cwd: ROOT, env, windowsHide: true });
    } catch (error) {
      resolve({ code: -1, out: String(error) });
      return;
    }
    const collect = (chunk) => {
      const text = chunk.toString();
      out += text;
      onData?.(text);
    };
    child.stdout.on('data', collect);
    child.stderr.on('data', collect);
    child.on('error', (error) => resolve({ code: -1, out: `${out}${error}` }));
    child.on('close', (code) => resolve({ code: code ?? -1, out }));
  });
}

async function pidOnPort(port) {
  const { out } = await run('netstat', ['-ano', '-p', 'TCP']);
  for (const line of out.split(/\r?\n/)) {
    const cols = line.trim().split(/\s+/);
    if (cols[3] === 'LISTENING' && cols[1]?.endsWith(`:${port}`)) return Number(cols[4]);
  }
  return null;
}

const killTree = (pid) => (pid ? run('taskkill', ['/PID', String(pid), '/T', '/F']) : null);

function openBrowser(url) {
  spawn('explorer.exe', [url], { detached: true, stdio: 'ignore', windowsHide: true }).unref();
}

// ---------- Admin Keystatic (serveur Astro en mode admin) ----------

const site = { state: 'stopped', message: '', child: null };

/** L'admin répond-il ? (404 = un serveur tourne, mais sans Keystatic) */
async function keystaticUp() {
  try {
    const res = await fetch(`${SITE_URL}/api/keystatic/tree`, { signal: AbortSignal.timeout(4000) });
    return res.status !== 404;
  } catch {
    return false;
  }
}

async function startSite() {
  site.state = 'starting';
  site.message = '';
  if (await keystaticUp()) {
    site.state = 'ready';
    return;
  }

  // Un autre serveur occupe le port (ancien aperçu, admin bloqué) : on le remplace.
  await killTree(await pidOnPort(SITE_PORT));

  const env = { ...process.env, JFK_ADMIN: '1', JFK_STUDIO: '1' };
  const child = spawn(process.execPath, [ASTRO_CLI, 'dev', '--port', String(SITE_PORT)], {
    cwd: ROOT,
    env,
    windowsHide: true,
  });
  site.child = child;
  const logStream = fs.createWriteStream(LOG_FILE, { flags: 'a' });
  child.stdout.pipe(logStream, { end: false });
  child.stderr.pipe(logStream, { end: false });
  child.on('exit', (code) => {
    log('admin arrêté, code', code);
    if (site.child !== child) return;
    site.child = null;
    site.state = 'error';
    site.message = 'L’admin s’est arrêté.';
  });

  const deadline = Date.now() + 180_000;
  while (Date.now() < deadline && site.child === child) {
    if (await keystaticUp()) {
      site.state = 'ready';
      // Première compilation des pages en avance, pour que l'admin et l'aperçu s'ouvrent vite.
      fetch(`${SITE_URL}/keystatic`).catch(() => {});
      fetch(`${SITE_URL}/en/`).catch(() => {});
      return;
    }
    await sleep(1500);
  }
  if (site.child === child) {
    site.state = 'error';
    site.message = 'L’admin met trop de temps à démarrer.';
  }
}

async function restartSite() {
  site.state = 'starting';
  site.message = '';
  const child = site.child;
  site.child = null;
  await killTree(child?.pid ?? (await pidOnPort(SITE_PORT)));
  // Cache de Vite : sa corruption donne la page blanche de l'admin.
  fs.rmSync(path.join(ROOT, 'node_modules', '.vite'), { recursive: true, force: true });
  await startSite();
}

// ---------- Changements en attente ----------

const SETTINGS = {
  impact: 'Chiffres d’impact',
  'page-images': 'Photos des pages',
  contacts: 'Coordonnées et réseaux',
  payments: 'Moyens de paiement',
  amounts: 'Montants et répartition des dons',
};
const COLLECTIONS = {
  blog: 'Blog',
  children: 'Enfants à parrainer',
  missionaries: 'Missionnaires',
  teachers: 'Enseignants missionnaires',
  testimonials: 'Témoignages',
  projects2026: 'Projets 2026',
  villageSchools: 'Écoles de village',
};
const PHOTO_FOLDERS = {
  pages: 'Photos des pages',
  enfants: 'Enfants à parrainer',
  missionnaires: 'Missionnaires',
  enseignants: 'Enseignants missionnaires',
  temoignages: 'Témoignages',
  projets: 'Projets 2026',
  blog: 'Blog',
};

const pretty = (slug) => {
  const text = slug.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/** Traduit un chemin de fichier en « rubrique + élément » compréhensible. */
function describe(file) {
  let m;
  if ((m = file.match(/^src\/data\/settings\/([^/]+)\.json$/)) && SETTINGS[m[1]]) {
    return { area: 'Réglages du site', label: SETTINGS[m[1]] };
  }
  if ((m = file.match(/^src\/content\/([^/]+)\/([^/]+)/)) && COLLECTIONS[m[1]]) {
    return { area: COLLECTIONS[m[1]], label: pretty(m[2]) };
  }
  if ((m = file.match(/^src\/assets\/images\/([^/]+)\/(.+)$/))) {
    const rest = m[2].split('/');
    return { area: PHOTO_FOLDERS[m[1]] ?? 'Photos', label: `Photo : ${pretty(rest.length > 1 ? rest[0] : rest[0])}` };
  }
  if ((m = file.match(/^public\/documents\/(.+)$/))) {
    return { area: 'Documents', label: m[1] };
  }
  return { area: 'Technique', label: file, technical: true };
}

async function pendingChanges() {
  const { code, out } = await run('git', ['status', '--porcelain=v1', '-z', '-uall']);
  if (code !== 0) return { items: [], gitError: 'Git est introuvable ou le dossier n’est pas relié à GitHub.' };

  const entries = out.split('\0');
  const items = new Map();
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (!entry) continue;
    const xy = entry.slice(0, 2);
    const file = entry.slice(3);
    if (xy.includes('R') || xy.includes('C')) i++; // l'ancien nom suit le nouveau
    const kind = xy === '??' || xy.includes('A') ? 'added' : xy.includes('D') ? 'deleted' : 'modified';
    const info = describe(file);
    const key = `${info.area}|${info.label}`;
    const previous = items.get(key);
    items.set(key, {
      ...info,
      kind: previous && previous.kind !== kind ? 'modified' : kind,
      files: [...(previous?.files ?? []), file],
    });
  }
  return { items: [...items.values()] };
}

async function publishInfo() {
  const [ahead, last] = await Promise.all([
    run('git', ['rev-list', '--count', '@{u}..HEAD']),
    run('git', ['log', '-1', '--format=%ct%x09%s', '@{u}']),
  ]);
  const [ts, subject] = last.out.trim().split('\t');
  return {
    ahead: ahead.code === 0 ? Number(ahead.out.trim()) || 0 : 0,
    lastPublish: last.code === 0 && ts ? { time: Number(ts) * 1000, subject } : null,
  };
}

// ---------- Publication ----------

let job = null;

function pushError(out) {
  if (/authentication|could not read username|403|permission denied|terminal prompts disabled/i.test(out)) {
    return 'GitHub demande de te reconnecter. Tes modifications sont bien enregistrées sur l’ordinateur : demande à Claude de t’aider à reconnecter GitHub, puis reclique sur « Publier ».';
  }
  if (/rejected|fetch first|non-fast-forward/i.test(out)) {
    return 'Le site sur GitHub a été modifié depuis un autre endroit. Tes modifications sont bien enregistrées : demande à Claude de réunir les deux versions.';
  }
  if (/could not resolve host|unable to access|timed out|failed to connect|network/i.test(out)) {
    return 'Pas de connexion à internet, ou GitHub ne répond pas. Tes modifications sont bien enregistrées : reclique sur « Publier » quand la connexion revient.';
  }
  return 'L’envoi vers GitHub a échoué. Tes modifications sont bien enregistrées : réessaie, ou envoie le détail à Claude.';
}

async function publish() {
  job = {
    running: true,
    startedAt: Date.now(),
    steps: [
      { id: 'check', label: 'Vérification du site', status: 'waiting' },
      { id: 'save', label: 'Enregistrement des modifications', status: 'waiting' },
      { id: 'send', label: 'Envoi sur GitHub', status: 'waiting' },
    ],
    result: null,
    error: null,
    detail: '',
  };
  const current = job;
  const setStep = (id, status) => {
    current.steps.find((s) => s.id === id).status = status;
  };
  const fail = (id, error, detail = '') => {
    setStep(id, 'error');
    Object.assign(current, {
      running: false,
      error,
      detail: stripAnsi(detail).trim().split(/\r?\n/).slice(-20).join('\n'),
      finishedAt: Date.now(),
    });
    log('publication échouée à l’étape', id, '\n', stripAnsi(detail));
  };

  try {
    setStep('check', 'running');
    const env = { ...process.env };
    delete env.JFK_ADMIN;
    delete env.JFK_STUDIO;
    const buildLog = fs.createWriteStream(BUILD_LOG);
    const build = await run(process.execPath, [ASTRO_CLI, 'build', '--force'], {
      env,
      onData: (text) => buildLog.write(text),
    });
    buildLog.end();
    if (build.code !== 0) {
      return fail('check', 'Le site ne peut pas être construit, donc rien n’a été publié. Copie le détail et envoie-le à Claude.', build.out);
    }
    setStep('check', 'done');

    setStep('save', 'running');
    let r = await run('git', ['add', '-A']);
    if (r.code !== 0) return fail('save', 'Impossible d’enregistrer les modifications.', r.out);
    r = await run('git', ['diff', '--cached', '--quiet']);
    if (r.code === 1) {
      const stamp = new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
      r = await run('git', ['commit', '-q', '-m', `Mise à jour depuis le Studio JFK — ${stamp}`]);
      if (r.code !== 0) return fail('save', 'Impossible d’enregistrer les modifications.', r.out);
    }
    setStep('save', 'done');

    setStep('send', 'running');
    r = await run('git', ['push', '-q'], { env: { ...process.env, GIT_TERMINAL_PROMPT: '0' } });
    if (r.code !== 0) return fail('send', pushError(r.out), r.out);
    setStep('send', 'done');

    Object.assign(current, { running: false, result: 'ok', finishedAt: Date.now() });
    log('publication réussie');
  } catch (error) {
    const step = current.steps.find((s) => s.status === 'running');
    fail(step?.id ?? 'check', 'Erreur inattendue. Envoie le détail à Claude.', String(error?.stack ?? error));
  }
}

// ---------- Serveur du tableau de bord ----------

async function shutdown() {
  log('fermeture du Studio');
  const child = site.child;
  site.child = null;
  if (child) await killTree(child.pid);
  process.exit(0);
}

const ALLOWED_HOSTS = new Set([`${HOST}:${STUDIO_PORT}`, `localhost:${STUDIO_PORT}`]);

const server = http.createServer(async (req, res) => {
  const send = (status, body, type = 'application/json; charset=utf-8') => {
    res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    res.end(type.startsWith('application/json') ? JSON.stringify(body) : body);
  };

  // Seul ce tableau de bord, ouvert sur cet ordinateur, peut piloter le Studio.
  if (!ALLOWED_HOSTS.has(req.headers.host ?? '')) return send(403, { error: 'forbidden' });
  const url = new URL(req.url ?? '/', STUDIO_URL);

  try {
    if (req.method === 'GET') {
      if (url.pathname === '/') {
        return send(200, await fs.promises.readFile(new URL('./index.html', import.meta.url)), 'text/html; charset=utf-8');
      }
      if (url.pathname === '/logo.png') {
        return send(200, await fs.promises.readFile(path.join(ROOT, 'public', 'images', 'logo-full-transparent.png')), 'image/png');
      }
      if (url.pathname === '/api/ping') return send(200, { studio: true });
      if (url.pathname === '/api/status') {
        const [changes, info] = await Promise.all([pendingChanges(), publishInfo()]);
        return send(200, { site: { state: site.state, message: site.message }, siteUrl: SITE_URL, ...changes, ...info, job });
      }
    }

    if (req.method === 'POST') {
      if (req.headers['x-studio'] !== '1') return send(403, { error: 'forbidden' });
      if (url.pathname === '/api/publish') {
        if (job?.running) return send(409, { error: 'Une publication est déjà en cours.' });
        publish();
        return send(202, { ok: true });
      }
      if (url.pathname === '/api/site/restart') {
        if (site.state !== 'starting') restartSite();
        return send(202, { ok: true });
      }
      if (url.pathname === '/api/quit') {
        send(200, { ok: true });
        setTimeout(shutdown, 200);
        return;
      }
    }

    send(404, { error: 'not found' });
  } catch (error) {
    log('erreur', error?.stack ?? error);
    send(500, { error: String(error) });
  }
});

async function main() {
  // Studio déjà ouvert : on affiche simplement le tableau de bord existant.
  try {
    const res = await fetch(`${STUDIO_URL}api/ping`, { signal: AbortSignal.timeout(1500) });
    if (res.ok) {
      openBrowser(STUDIO_URL);
      return;
    }
  } catch {}

  server.on('error', (error) => {
    log('impossible de démarrer le Studio :', error.message);
    process.exit(1);
  });
  server.listen(STUDIO_PORT, HOST, () => {
    log('Studio prêt sur', STUDIO_URL);
    if (!process.argv.includes('--no-open')) openBrowser(STUDIO_URL);
    startSite();
  });
}

process.on('SIGINT', shutdown);
main();
