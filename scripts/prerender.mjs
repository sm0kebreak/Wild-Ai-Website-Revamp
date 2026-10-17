import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { routes, sitemapXml } from './routes.mjs';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const builtAt = Date.now();
process.env.NODE_ENV = 'production';
globalThis.__WILD_NOW__ = builtAt;

const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href);
const shell = await readFile(path.join(dist, 'index.html'), 'utf8');

const stripManaged = (html) =>
  html
    .replace(/<script>window\.__WILD_NOW__[\s\S]*?<\/script>\s*/g, '')
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>\s*/gi, '')
    .replace(/<meta[^>]+name="description"[^>]*>\s*/gi, '')
    .replace(/<meta[^>]+name="robots"[^>]*>\s*/gi, '')
    .replace(/<link[^>]+rel="canonical"[^>]*>\s*/gi, '')
    .replace(/<meta[^>]+property="og:[^"]+"[^>]*>\s*/gi, '')
    .replace(/<meta[^>]+name="twitter:[^"]+"[^>]*>\s*/gi, '')
    .replace(/<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>\s*/gi, '');

const count = (html, pattern) => html.match(pattern)?.length ?? 0;

const fileFor = (route) => (route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html'));

const pageFor = (route) => {
  const { html, helmet } = render(route);
  const head = [helmet.title, helmet.meta, helmet.link, helmet.script].map((part) => part.toString()).join('\n');
  const clock = `<script>window.__WILD_NOW__=${builtAt};window.__WILD_PATH__=${JSON.stringify(route)};</script>`;
  let document = stripManaged(shell).replace('</head>', `${head}\n</head>`);
  document = document.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  document = document.replace('<script type="module"', `${clock}\n    <script type="module"`);
  const titles = count(document, /property="og:title"/g);
  const cards = count(document, /name="twitter:card"/g);
  const titleTags = count(document, /<title\b/g);
  if (titles !== 1 || cards !== 1 || titleTags !== 1) {
    throw new Error(`${route} has ${titleTags} title, ${titles} og:title and ${cards} twitter:card tags`);
  }
  if (!document.includes('<h1')) throw new Error(`${route} is missing an h1`);
  const title = document.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? '';
  return { document, title };
};

const stable = render('/');
if (stable.html !== render('/').html) throw new Error('homepage render is not stable');

for (const route of routes) {
  const { document, title } = pageFor(route);
  if (document.includes('Page not found')) throw new Error(`${route} rendered the 404 page`);
  const file = fileFor(route);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, document);
  console.log(route, title);
}

const missing = pageFor('/this-page-does-not-exist');
if (!missing.document.toLowerCase().includes('not found')) {
  throw new Error('unknown path did not render the 404 page');
}
await writeFile(path.join(dist, '404.html'), missing.document);

const home = await readFile(path.join(dist, 'index.html'), 'utf8');
const about = await readFile(path.join(dist, 'about/index.html'), 'utf8');
const companies = await readFile(path.join(dist, 'companies/index.html'), 'utf8');
const required = [
  ['/', home, 'Wild AI | Show us something wild'],
  ['/', home, 'Wild AI is a monthly meetup where builders show something wild: raw AI projects at any stage, live demos, no slides, and real feedback from the room.'],
  ['/', home, 'https://wildai.us/og/wildai-og.jpg'],
  ['/', home, 'summary_large_image'],
  ['/', home, 'https://luma.com/50wo8gm8'],
  ['/', home, '2026-10-19T18:00:00-05:00'],
  ['/', home, 'https://www.linkedin.com/company/wild-ai-community'],
  ['/about', about, 'About | Wild AI'],
  ['/about', about, 'What Wild AI is, who runs it, and how a meetup night works.'],
  ['/about', about, 'https://wildai.us/about'],
  ['/companies', companies, 'Companies | Wild AI'],
  ['/companies', companies, 'Companies whose people have taken the stage at Wild AI, with a short note on what each one does.'],
  ['/companies', companies, 'https://wildai.us/companies'],
];
for (const [route, html, text] of required) {
  if (!html.includes(text)) throw new Error(`${route} is missing ${text}`);
}
if (home.includes('third Monday') || home.includes('gptengineer')) {
  throw new Error('homepage still contains a removed claim or script');
}

const xml = sitemapXml();
await writeFile(path.join(dist, 'sitemap.xml'), xml);
await writeFile(path.join(root, 'public', 'sitemap.xml'), xml);
console.log(`prerendered ${routes.length} routes`);
