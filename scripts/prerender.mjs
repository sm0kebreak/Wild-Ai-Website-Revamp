import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { routes, sitemapXml } from './routes.mjs';

const PORT = 4188;
const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const waitForServer = async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${PORT}/`);
      if (response.ok) return;
    } catch {
      // preview is still booting
    }
    await sleep(250);
  }
  throw new Error('vite preview did not start');
};

const dedupeHead = () => {
  const nodes = [...document.head.querySelectorAll('title, meta[name], meta[property], link[rel="canonical"]')];
  const groups = new Map();
  for (const node of nodes) {
    const key =
      node.tagName === 'TITLE'
        ? 'title'
        : node.tagName === 'LINK'
          ? `link:${node.getAttribute('rel')}`
          : node.getAttribute('property') || `name:${node.getAttribute('name')}`;
    const list = groups.get(key) ?? [];
    list.push(node);
    groups.set(key, list);
  }
  for (const list of groups.values()) {
    if (list.length < 2) continue;
    const helmet = list.filter((node) => node.getAttribute('data-rh') === 'true');
    const keep = (helmet.length ? helmet : list).at(-1);
    for (const node of list) {
      if (node !== keep) node.remove();
    }
  }
};

const fileFor = (route) => {
  if (route === '/') return path.join(dist, 'index.html');
  return path.join(dist, route.slice(1), 'index.html');
};

const preview = spawn('npx', ['vite', 'preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'], {
  cwd: root,
  detached: true,
  stdio: 'ignore',
});

const stopPreview = () => {
  if (!preview.pid) return;
  try {
    process.kill(-preview.pid, 'SIGKILL');
  } catch {
    preview.kill('SIGKILL');
  }
};

let browser;
let failed = null;
try {
  await waitForServer();
  browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage();
  await page.route(/supabase\.co/, (route) => route.abort());

  const capture = async (route) => {
    await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('h1');
    await page.waitForFunction(() => document.querySelector('meta[property="og:title"]')?.getAttribute('content'));
    await page.evaluate(dedupeHead);
    const html = await page.content();
    const title = await page.title();
    const ogTitles = await page.locator('meta[property="og:title"]').count();
    const cards = await page.locator('meta[name="twitter:card"]').count();
    if (ogTitles !== 1 || cards !== 1) {
      throw new Error(`${route} has ${ogTitles} og:title and ${cards} twitter:card tags`);
    }
    if (!html.includes('<h1')) throw new Error(`${route} is missing an h1`);
    return { html: html.startsWith('<!DOCTYPE') ? html : `<!DOCTYPE html>\n${html}`, title };
  };

  for (const route of routes) {
    const { html, title } = await capture(route);
    if (html.includes('Page not found') && route !== '/404') {
      throw new Error(`${route} rendered the 404 page`);
    }
    const file = fileFor(route);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html);
    console.log(route, title);
  }

  const missing = await capture('/this-page-does-not-exist');
  if (!missing.html.toLowerCase().includes('not found')) {
    throw new Error('unknown path did not render the 404 page');
  }
  await writeFile(path.join(dist, '404.html'), missing.html);

  const xml = sitemapXml();
  await writeFile(path.join(dist, 'sitemap.xml'), xml);
  await writeFile(path.join(root, 'public', 'sitemap.xml'), xml);
  console.log(`prerendered ${routes.length} routes`);
} catch (error) {
  failed = error;
} finally {
  await Promise.race([browser?.close() ?? Promise.resolve(), sleep(2000)]);
  stopPreview();
}

if (failed) {
  console.error(failed);
  process.exit(1);
}
process.exit(0);
