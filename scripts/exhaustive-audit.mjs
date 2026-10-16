import { chromium, devices } from '@playwright/test';
import { mkdirSync, appendFileSync, writeFileSync } from 'node:fs';

const base = process.env.AUDIT_BASE || 'https://wild-ai-condensed-preview.vercel.app';
const outDir = process.env.AUDIT_OUT || '/tmp/wild-audit';
mkdirSync(outDir, { recursive: true });

const archiveDates = [
  '2026-10-14', '2026-09-21', '2026-08-17', '2026-08-05', '2026-07-20', '2026-06-19',
  '2026-05-18', '2026-04-20', '2026-03-16', '2026-02-16', '2026-01-19', '2025-12-15',
  '2025-11-17', '2025-10-20', '2025-09-15', '2025-08-18', '2025-07-21', '2025-06-19',
  '2025-05-15', '2025-04-17', '2025-03-20',
];

const allRoutes = [
  '/', '/events', '/chapters', '/speak', '/sponsor', '/about', '/join', '/start-a-chapter',
  '/past-events', '/blog', '/show-and-tell', '/location', '/locations',
  '/events/february-2026', '/events/march-2026', '/events/april-2026', '/events/may-2026',
  '/events/gopher-ai-demo-night', '/events/gopher-ai-conference',
  '/admin/login', '/admin', '/admin/show-and-tell',
  '/minneapolis', '/san-francisco', '/toronto', '/chicago', '/austin',
  '/events/msp-october-2026', '/events/msp-november-2026', '/events/msp-december-2026',
  ...archiveDates.map((date) => `/events/archive-${date}`),
  '/afterparty', '/press', '/this-page-does-not-exist',
];
const routes = process.env.AUDIT_ROUTES
  ? process.env.AUDIT_ROUTES.split(',').map((path) => path.trim()).filter(Boolean)
  : allRoutes;

const phone = devices['iPhone 13'];

const placeholder = (href) => {
  if (!href) return false;
  const value = href.trim();
  return value === '#' || value === '' || value.startsWith('javascript:') || /example\.com|TODO|changeme|placeholder/i.test(value);
};

const keyOf = (item) => [item.tag, item.role || '', item.type || '', item.href || '', item.label].join('|');

async function dismissIntro(page) {
  const overlay = page.locator('.intro-overlay');
  if (await overlay.isVisible().catch(() => false)) {
    await overlay.click();
    await overlay.waitFor({ state: 'detached', timeout: 6000 }).catch(() => {});
  }
}

async function openPath(page, path) {
  await page.goto(base + path, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await dismissIntro(page);
  await page.locator('header.site-header, h1').first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
}

async function describe(page) {
  return page.evaluate(() => {
    const nodes = [...document.querySelectorAll(
      'a[href], button, [role="button"], input, select, textarea, summary, [role="tab"], [role="switch"], [role="menuitem"], [role="option"], [role="combobox"]',
    )];
    return nodes.map((el, index) => {
      el.setAttribute('data-audit-id', String(index));
      const label = (
        el.getAttribute('aria-label') ||
        el.getAttribute('title') ||
        el.getAttribute('placeholder') ||
        (el.innerText || '') ||
        el.getAttribute('value') ||
        el.tagName
      ).replace(/\s+/g, ' ').trim().slice(0, 140);
      return {
        index,
        tag: el.tagName.toLowerCase(),
        role: el.getAttribute('role'),
        type: el.getAttribute('type'),
        href: el.getAttribute('href'),
        target: el.getAttribute('target'),
        label,
        disabled: Boolean(el.disabled || el.getAttribute('aria-disabled') === 'true'),
        expanded: el.getAttribute('aria-expanded'),
      };
    });
  });
}

async function locate(page, item) {
  const items = await describe(page);
  const match = items.find((candidate) => keyOf(candidate) === item.key);
  if (!match) return null;
  return page.locator(`[data-audit-id="${match.index}"]`).first();
}

async function reveal(page, item) {
  if (item.role === 'menuitem') {
    const menu = page.getByRole('button', { name: 'Open navigation' });
    if (await menu.count()) await menu.click().catch(() => {});
  }
  if (item.role === 'option') {
    const search = page.getByRole('button', { name: 'Search the site' });
    if (await search.isVisible().catch(() => false)) await search.click().catch(() => {});
  }
}

function expectedFor(item, path) {
  if (item.disabled) return 'disabled control does not navigate';
  if (placeholder(item.href)) return 'not a placeholder href';
  if (item.href?.startsWith('mailto:')) return `mail client for ${item.href}`;
  if (item.href?.startsWith('http')) return `open ${item.href}`;
  if (item.href?.startsWith('/')) return `open ${item.href.split('#')[0] || '/'} without a 404`;
  if (item.href?.startsWith('#')) return `scroll to ${item.href}`;
  if (item.tag === 'input' || item.tag === 'textarea' || item.tag === 'select') return 'focus the field';
  return 'activate the control';
}

async function clickItem(page, item, path) {
  const started = new URL(page.url()).pathname;
  const beforeExpanded = item.expanded;
  const dialogsBefore = await page.getByRole('dialog').count();
  const popupPromise = page.waitForEvent('popup', { timeout: 2500 }).catch(() => null);
  let target = await locate(page, item);
  if (!target) {
    await reveal(page, item);
    target = await locate(page, item);
  }
  target = target || page.locator(`[data-audit-id="${item.index}"]`);
  if (!(await target.count())) {
    return { actual: 'element not in the DOM when clicked', pass: false };
  }
  await target.evaluate((element) => element.click()).catch((error) => {
    throw error;
  });
  const popup = await popupPromise;
  if (popup) {
    const href = item.href || popup.url();
    await popup.close().catch(() => {});
    return { actual: `popup ${href}`, pass: !placeholder(item.href) && Boolean(item.href) };
  }
  await page.waitForTimeout(200);
  const now = new URL(page.url());
  const pathname = now.pathname;
  const missing = await page.getByText('Page not found').count();
  if (pathname !== started || (item.href && item.href.startsWith('/'))) {
    const dest = `${pathname}${now.hash}`;
    const pass = missing === 0 && !placeholder(item.href);
    return { actual: missing ? `404 ${dest}` : dest, pass };
  }
  if (item.href?.startsWith('#')) {
    const id = item.href.slice(1);
    const section = page.locator(`[id="${id}"]`);
    const pass = (await section.count()) > 0;
    if (pass) await section.scrollIntoViewIfNeeded().catch(() => {});
    return { actual: pass ? `scrolled to #${id}` : `missing #${id}`, pass };
  }
  const dialogsAfter = await page.getByRole('dialog').count();
  const expanded = await target.getAttribute('aria-expanded').catch(() => null);
  if (dialogsAfter > dialogsBefore) return { actual: 'opened a dialog', pass: true };
  if (expanded !== beforeExpanded && expanded !== null) return { actual: `aria-expanded=${expanded}`, pass: true };
  if (item.tag === 'input' || item.tag === 'textarea' || item.tag === 'select' || item.role === 'combobox') {
    return { actual: 'focused the field', pass: true };
  }
  if (item.disabled) return { actual: 'stayed disabled', pass: true };
  const toast = await page.locator('[data-sonner-toast], [role="status"]').allTextContents().catch(() => []);
  if (toast.some((text) => text.trim())) return { actual: `toast: ${toast.find((text) => text.trim()).trim().slice(0, 80)}`, pass: true };
  if (item.type === 'submit' || /submit|subscribe|sign in|request|reserve|join/i.test(item.label)) {
    const invalid = await page.locator(':invalid').count();
    if (invalid) return { actual: 'browser validation blocked an empty submit', pass: true };
  }
  return { actual: `stayed on ${path}`, pass: item.tag === 'a' ? false : true };
}

async function auditViewport(name, contextOptions) {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ ...contextOptions, baseURL: base });
  const page = await context.newPage();
  const file = `${outDir}/${name}.jsonl`;
  writeFileSync(file, '');
  const rows = [];
  for (const path of routes) {
    await openPath(page, path);
    const seen = new Set();
    let guard = 0;
    let queue = [];
    const enqueue = async (front) => {
      const items = await describe(page);
      const fresh = [];
      for (const item of items) {
        const key = keyOf(item);
        if (seen.has(key)) continue;
        if (queue.some((queued) => queued.key === key) || fresh.some((queued) => queued.key === key)) continue;
        fresh.push({ ...item, key });
      }
      queue = front ? [...fresh, ...queue] : [...queue, ...fresh];
    };
    await enqueue(false);
    while (queue.length && guard < 800) {
      guard += 1;
      const item = queue.shift();
      if (seen.has(item.key)) continue;
      seen.add(item.key);
      if (new URL(page.url()).pathname !== path.split('#')[0]) await openPath(page, path);
      await describe(page);
      let outcome;
      try {
        outcome = await clickItem(page, item, path);
      } catch (error) {
        outcome = { actual: `click error: ${error.message.slice(0, 140)}`, pass: false };
      }
      const row = {
        viewport: name,
        page: path,
        label: item.label || item.tag,
        tag: item.tag,
        role: item.role,
        href: item.href,
        expected: expectedFor(item, path),
        actual: outcome.actual,
        pass: outcome.pass,
      };
      rows.push(row);
      appendFileSync(file, JSON.stringify(row) + '\n');
      if (page.url().startsWith(base) && new URL(page.url()).pathname === path) {
        await enqueue(true);
        const menuOpen = await page.getByRole('menuitem').count();
        const dialogOpen = await page.getByRole('dialog').count();
        if (!menuOpen && !dialogOpen) await page.keyboard.press('Escape').catch(() => {});
      } else if (!page.url().startsWith(base)) {
        await openPath(page, path);
      }
    }
    console.log(`${name} ${path} ${rows.filter((row) => row.page === path).length}`);
  }
  await browser.close();
  return rows;
}

const [desktop, iphone] = await Promise.all([
  auditViewport('desktop', { viewport: { width: 1280, height: 800 } }),
  auditViewport('iphone', {
    viewport: phone.viewport,
    userAgent: phone.userAgent,
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: phone.deviceScaleFactor,
  }),
]);

const rows = [...desktop, ...iphone];
writeFileSync(`${outDir}/inventory.json`, JSON.stringify(rows, null, 2));
const failed = rows.filter((row) => !row.pass);
console.log(JSON.stringify({ total: rows.length, failed: failed.length, desktop: desktop.length, iphone: iphone.length }, null, 2));
