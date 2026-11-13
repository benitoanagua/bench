// Servidor estático portable y fiel para los tests e2e de Histoire.
// Monta .histoire/dist EXACTAMENTE bajo un prefijo, sin rutas candidatas ni
// fallback: 404 real para lo que no exista. Compatible con Windows.
//
// Uso: node static-server.js <dir> <prefix> <port>
// Ej:  node static-server.js ./dist /bench 5179
import { createServer } from 'node:http';
import { statSync, createReadStream } from 'node:fs';
import { resolve, extname, sep } from 'node:path';

const [dir, prefix, port] = process.argv.slice(2);
if (!dir || !prefix || !port) {
  console.error('Uso: node static-server.js <dir> <prefix> <port>');
  process.exit(1);
}

const root = resolve(dir);
const base = prefix === '/' ? '' : prefix.replace(/\/$/, '');

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
};

function resolveUrl(reqUrl) {
  let pathname = reqUrl.split('?')[0].split('#')[0];
  if (!pathname.startsWith(base + '/') && pathname !== base) return null;
  let rel = pathname.slice(base.length);
  if (!rel || rel === '/') rel = '/index.html';
  const resolved = resolve(root, rel.slice(1));
  if (!resolved.startsWith(root + sep) && resolved !== root) return null;
  return resolved;
}

const server = createServer((req, res) => {
  const file = resolveUrl(req.url);
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found\n');
    return;
  }
  let st;
  try {
    st = statSync(file);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found\n');
    return;
  }
  if (!st.isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found\n');
    return;
  }
  const ext = extname(file).toLowerCase();
  res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
  createReadStream(file).pipe(res);
});

server.listen(parseInt(port, 10), () => {
  console.log(`e2e static server: ${root} bajo ${base || '/'} en :${port}`);
});
