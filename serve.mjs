import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { realpath, stat } from 'node:fs/promises';
import { dirname, extname, isAbsolute, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || args[0] !== '--port' || !/^\d+$/.test(args[1]))) {
  console.error('Usage: node serve.mjs [--port 3000]');
  process.exit(1);
}
const port = args.length ? Number(args[1]) : 3000;
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('Port must be an integer from 1 to 65535.');
  process.exit(1);
}
const root = await realpath(dirname(fileURLToPath(import.meta.url)));
const routes = new Map([
  ['/', 'viewer/index.html'],
  ['/viewer/index.html', 'viewer/index.html'],
  ['/viewer.css', 'viewer/viewer.css'],
  ['/viewer.js', 'viewer/viewer.js'],
  ['/viewer/viewer.css', 'viewer/viewer.css'],
  ['/viewer/viewer.js', 'viewer/viewer.js'],
  ...[
    'README.md', 'AGENTS.md', 'LICENSE', 'VALIDATION.md', 'RUNBOOK.md', 'ESSAY_PREP.md',
    'REPOSITORIES.md', 'COMMANDS.md', 'DATA_AI_GUIDE.md', 'TRIAL_15MIN.md', 'START_HERE.md',
    'references/semiconductor-glossary.md',
    'skills/task-evidence-check/SKILL.md',
    'skills/task-evidence-check/references/cofa-core.md',
    'output/pdf/hy-school2-notes-text.pdf',
    'output/pdf/hy-school2-notes-images.pdf',
  ].map(path => [`/${path}`, path]),
]);
const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.md': 'text/plain; charset=utf-8',
  '.png': 'image/png', '.pdf': 'application/pdf',
};
const server = createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'");
  const reply = (status, message) => {
    res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(req.method === 'HEAD' ? undefined : `${message}\n`);
  };
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.setHeader('Allow', 'GET, HEAD');
    return reply(405, 'Method not allowed');
  }
  let path;
  try { path = decodeURIComponent((req.url ?? '').split('?')[0]); }
  catch { return reply(400, 'Invalid URL encoding'); }
  if (!path.startsWith('/') || /[\\\0]/.test(path) || path.split('/').some(part => part.startsWith('.'))) {
    return reply(404, 'Not found');
  }
  const image = path.match(/^\/(?:viewer\/)?images\/(image-(?:0[1-9]|[1-6][0-9])\.png)$/);
  const route = routes.get(path) ?? (image ? `viewer/images/${image[1]}` : null);
  if (!route) return reply(404, 'Not found');
  try {
    const file = await realpath(join(root, route));
    const within = relative(root, file);
    if (within === '..' || within.startsWith(`..${sep}`) || isAbsolute(within)) return reply(404, 'Not found');
    const info = await stat(file);
    if (!info.isFile()) return reply(404, 'Not found');
    res.writeHead(200, {
      'Content-Type': mime[extname(file)] ?? 'text/plain; charset=utf-8',
      'Content-Length': info.size,
    });
    if (req.method === 'HEAD') return res.end();
    const stream = createReadStream(file);
    stream.on('error', () => res.destroy());
    res.on('close', () => stream.destroy());
    stream.pipe(res);
  } catch (error) {
    reply(['ENOENT', 'ENOTDIR', 'EACCES'].includes(error.code) ? 404 : 500, 'Unable to read file');
  }
});
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE'
    ? `Port ${port} is already in use. Do not stop an unknown service or switch ports blindly. Use the local MD files, or ask Helper which internal Browser port is allowed before using --port.`
    : `Unable to start server: ${error.code ?? error.message}`);
  process.exitCode = 1;
});
server.listen(port, '0.0.0.0', () => {
  console.log(`Cofa Probe Kit listening on 0.0.0.0:${server.address().port}`);
  console.log(`Use only the provided internal Browser: its preview for port ${server.address().port}, path /. If a PORT field is available, match it to ${server.address().port}; otherwise use the displayed internal preview URL without inventing a URL.`);
  console.log('Keep the exam fullscreen; do not open an external browser or a new tab. Command approval is not permission to leave the exam screen.');
  console.log('If that port is unavailable, use the local MD files and ask Helper. Stop this server with Ctrl+C in its terminal.');
});
let stopping = false;
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => {
  if (stopping) return;
  stopping = true;
  console.log('\nStopping Cofa Probe Kit server.');
  server.close(() => process.exit(0));
  server.closeIdleConnections();
  setTimeout(() => server.closeAllConnections(), 5000).unref();
});
