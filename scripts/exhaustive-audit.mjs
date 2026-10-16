import { chromium, devices } from '@playwright/test';
import { mkdirSync, appendFileSync, writeFileSync } from 'node:fs';

const base = process.env.AUDIT_BASE || 'https://wild-ai-condensed-preview.vercel.app';
const outDir = process.env.AUDIT_OUT || '/tmp/wild-audit/v2';
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
  '/minneapolis', '/san-francisco', '/toronto', '/chicago', '/austin',
  '/events/msp-october-2026', '/events/msp-november-2026', '/events/msp-december-2026',
  ...archiveDates.map((date) => `/events/archive-${date}`),
  '/afterparty', '/press', '/this-page-does-not-exist',
];
const routes = process.env.AUDIT_ROUTES
  ? process.env.AUDIT_ROUTES.split(',').map((path) => path.trim()).filter(Boolean)
  : allRoutes;

const phone = devices['iPhone 13'];
const origin = new URL(base).origin;

const placeholder = (href) => {
  if (!href) return false;
  const value = href.trim();
  return value === '#' || value.startsWith('javascript:') || /example\.com|TODO|changeme|placeholder/i.test(value);
};

const keyOf = (item) => [item.tag, item.role || '', item.href || '', item.label, item.nth].join('|');

const normPath = (pathname) => pathname.replace(/\/$/, '') || '/';

function status(name, text) {
  writeFileSync(`${outDir}/${name}.status`, text);
}

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
  await page.locator('nav[aria-label="Primary navigation"], button[aria-label="Open navigation"]').first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
}

async function describe(page, scope) {
  return page.evaluate((scopeName) => {
    const selector = [
      'a[href]', 'button', '[role="button"]', '[role="link"]', 'input', 'select', 'textarea',
      'summary', '[role="tab"]', '[role="switch"]', '[role="menuitem"]', '[role="option"]', '[role="combobox"]',
    ].join(', ');
    const shown = (el) => {
      if (el.closest('[inert], [aria-hidden="true"]')) return false;
      const style = getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') return false;
      const rect = el.getBoundingClientRect();
      return rect.width >= 1 || rect.height >= 1;
    };
    const inMenu = (el) => Boolean(el.closest('[role="menu"]'));
    const inListbox = (el) => Boolean(el.closest('[role="listbox"]'));
    const inDialog = (el) => Boolean(el.closest('[role="dialog"]'));
    const keep = (el) => {
      if (!shown(el)) return false;
      if (scopeName === 'menu') return inMenu(el);
      if (scopeName === 'select') return inListbox(el);
      if (scopeName === 'search' || scopeName === 'lightbox') return inDialog(el);
      return !inMenu(el) && !inListbox(el) && !inDialog(el);
    };
    const nodes = [...document.querySelectorAll(selector)].filter(keep);
    const seen = new Map();
    return nodes.map((el) => {
      const label = (
        el.getAttribute('aria-label') ||
        el.getAttribute('title') ||
        el.getAttribute('placeholder') ||
        el.innerText ||
        el.getAttribute('value') ||
        el.tagName
      ).replace(/\s+/g, ' ').trim().slice(0, 140);
      const owner = el.closest('a[href]');
      const ownHref = el.getAttribute('href');
      const nested = Boolean(owner && owner !== el && !ownHref);
      const href = ownHref || (nested ? owner.getAttribute('href') : null);
      const target = el.getAttribute('target') || (nested ? owner.getAttribute('target') : null);
      const signature = [el.tagName, el.getAttribute('role') || '', href || '', label].join('|');
      const nth = seen.get(signature) || 0;
      seen.set(signature, nth + 1);
      const index = `${scopeName}-${nth}-${Math.random().toString(36).slice(2, 8)}`;
      el.setAttribute('data-audit-id', index);
      return {
        index,
        nth,
        tag: el.tagName.toLowerCase(),
        role: el.getAttribute('role'),
        type: el.getAttribute('type'),
        href,
        target,
        nested,
        label,
        disabled: Boolean(el.disabled || el.getAttribute('aria-disabled') === 'true'),
        expanded: el.getAttribute('aria-expanded'),
      };
    });
  }, scope);
}

async function prepare(page, context) {
  const dialogs = await page.getByRole('dialog').count();
  const menu = await page.getByRole('menuitem').count();
  const listbox = await page.getByRole('listbox').count();
  if (context !== 'select' && listbox) await page.keyboard.press('Escape').catch(() => {});
  if (context !== 'search' && context !== 'lightbox' && context !== 'menu' && context !== 'select') {
    await page.keyboard.press('Escape').catch(() => {});
  }
  if (context !== 'search' && context !== 'lightbox' && dialogs) await page.keyboard.press('Escape').catch(() => {});
  if (context !== 'menu' && menu) await page.keyboard.press('Escape').catch(() => {});
  if (context === 'menu') {
    if (!(await page.getByRole('menuitem').count())) {
      await page.getByRole('button', { name: 'Open navigation' }).click().catch(() => {});
    }
    await page.getByRole('menuitem').first().waitFor({ state: 'visible', timeout: 2500 }).catch(() => {});
  }
  if (context === 'search') {
    if (!(await page.getByRole('dialog').count())) {
      const search = page.getByRole('button', { name: 'Search the site' });
      if (await search.isVisible().catch(() => false)) await search.click().catch(() => {});
    }
    await page.getByPlaceholder('Search pages, chapters, events').first().waitFor({ state: 'visible', timeout: 2500 }).catch(() => {});
  }
  if (context === 'past') {
    const past = page.getByRole('button', { name: 'PAST', exact: true });
    if (await past.count()) await past.click().catch(() => {});
    await page.waitForTimeout(150);
  }
  if (context === 'logos') {
    const see = page.getByRole('button', { name: 'See all companies' });
    if (await see.count()) await see.click().catch(() => {});
    await page.locator('#company-logos').waitFor({ state: 'visible', timeout: 2500 }).catch(() => {});
  }
  if (context === 'select') {
    const combo = page.getByRole('combobox').first();
    if (await combo.count() && (await combo.getAttribute('aria-expanded')) !== 'true') {
      await combo.click().catch(() => {});
    }
    await page.getByRole('option').first().waitFor({ state: 'visible', timeout: 2500 }).catch(() => {});
  }
  if (context === 'lightbox') {
    if (!(await page.getByRole('button', { name: 'Next photo' }).count())) {
      await page.getByRole('button', { name: 'Open photo 1' }).click().catch(() => {});
    }
    await page.getByRole('button', { name: 'Next photo' }).waitFor({ state: 'visible', timeout: 2500 }).catch(() => {});
  }
}

async function discover(page) {
  const bag = new Map();
  const add = async (context) => {
    const items = await describe(page, context);
    for (const item of items) {
      const id = `${context}|${keyOf(item)}`;
      if (bag.has(id)) continue;
      bag.set(id, { ...item, key: keyOf(item), context });
    }
  };

  await add('page');

  if (await page.getByRole('button', { name: 'Open navigation' }).count()) {
    await page.getByRole('button', { name: 'Open navigation' }).click();
    await page.getByRole('menuitem').first().waitFor({ state: 'visible', timeout: 2500 }).catch(() => {});
    await add('menu');
    await page.keyboard.press('Escape').catch(() => {});
  }

  const search = page.getByRole('button', { name: 'Search the site' });
  if (await search.isVisible().catch(() => false)) {
    await search.click();
    await page.getByRole('dialog').waitFor({ state: 'visible', timeout: 2500 }).catch(() => {});
    await add('search');
    await page.keyboard.press('Escape').catch(() => {});
  }

  const past = page.getByRole('button', { name: 'PAST', exact: true });
  if (await past.count()) {
    await past.click();
    await page.waitForTimeout(200);
    await add('past');
  }

  const see = page.getByRole('button', { name: 'See all companies' });
  if (await see.count()) {
    await see.click();
    await page.waitForTimeout(150);
    await add('logos');
  }

  const combo = page.locator('main').getByRole('combobox');
  if (await combo.count()) {
    await combo.first().click();
    await page.getByRole('option').first().waitFor({ state: 'visible', timeout: 2500 }).catch(() => {});
    await add('select');
    await page.keyboard.press('Escape').catch(() => {});
  }

  if (await page.getByRole('button', { name: 'Open photo 1' }).count()) {
    await page.getByRole('button', { name: 'Open photo 1' }).click();
    await page.getByRole('button', { name: 'Next photo' }).waitFor({ state: 'visible', timeout: 2500 }).catch(() => {});
    await add('lightbox');
    await page.keyboard.press('Escape').catch(() => {});
  }

  return [...bag.values()];
}

function expectedFor(item) {
  if (placeholder(item.href)) return `not a placeholder (${item.href})`;
  if (item.href?.startsWith('mailto:')) return `mail client for ${item.href}`;
  if (item.href?.startsWith('http')) return `open ${item.href}`;
  if (item.href?.startsWith('/')) return `open ${item.href} without a 404`;
  if (item.href?.startsWith('#')) return `scroll to ${item.href}`;
  if (item.tag === 'input' || item.tag === 'textarea' || item.tag === 'select' || item.role === 'combobox') return 'focus the field';
  if (item.disabled) return 'disabled control does not navigate';
  return 'activate the control';
}

async function notFound(page) {
  return page.getByText('Page not found', { exact: false }).count();
}

async function clickItem(page, item, path) {
  if (placeholder(item.href)) return { actual: `placeholder href ${item.href}`, pass: false };
  await prepare(page, item.context);
  const items = await describe(page, item.context);
  const match = items.find((candidate) => keyOf(candidate) === item.key);
  if (!match) return { actual: 'element not in the DOM when clicked', pass: false };
  const locator = page.locator(`[data-audit-id="${match.index}"]`);

  if (item.href?.startsWith('mailto:')) {
    const before = normPath(new URL(page.url()).pathname);
    await locator.click({ timeout: 2000, noWaitAfter: true, force: true }).catch(() => {});
    const stayed = normPath(new URL(page.url()).pathname) === before;
    return { actual: `mailto link ${item.href}`, pass: stayed && !placeholder(item.href) };
  }

  const expectsPopup = item.target === '_blank' || /^https?:/i.test(item.href || '') || /youtube/i.test(item.label || '');
  const beforeText = await page.locator('main').innerText().catch(() => '');
  const dialogsBefore = await page.getByRole('dialog').count();
  const popupPromise = expectsPopup ? page.waitForEvent('popup', { timeout: 8000 }).catch(() => null) : null;

  await locator.scrollIntoViewIfNeeded({ timeout: 1500 }).catch(() => {});
  const rail = locator.locator('xpath=ancestor::*[@data-logo-rail][1]');
  if (await rail.count()) await rail.hover({ timeout: 1000 }).catch(() => {});
  try {
    await locator.click({ timeout: 5000, noWaitAfter: true });
  } catch {
    await locator.click({ timeout: 2000, force: true, noWaitAfter: true });
  }

  const popup = popupPromise ? await popupPromise : null;
  if (popup) {
    await popup.waitForURL((url) => url.href !== 'about:blank', { timeout: 2000 }).catch(() => {});
    const opened = popup.url();
    await popup.close().catch(() => {});
    const href = item.href || '';
    const pass = Boolean(opened && opened !== 'about:blank' && !placeholder(href || opened));
    return { actual: `popup ${opened || href}`, pass };
  }

  if (item.href?.startsWith('/') || item.href?.startsWith('#')) {
    const expected = new URL(item.href, base);
    const expectedPath = normPath(expected.pathname);
    if (normPath(new URL(page.url()).pathname) !== expectedPath) {
      await page.waitForURL((url) => normPath(url.pathname) === expectedPath, { timeout: 5000 }).catch(() => {});
    }
    const now = new URL(page.url());
    const landed = `${normPath(now.pathname)}${now.hash}`;
    const missing = await notFound(page);
    const hashOk = !expected.hash || now.hash === expected.hash || (await page.locator(expected.hash).count()) > 0;
    const pass = normPath(now.pathname) === expectedPath && missing === 0 && hashOk;
    if (item.href.startsWith('#') && hashOk) return { actual: `scrolled to ${expected.hash}`, pass: true };
    return { actual: missing ? `404 ${landed}` : landed, pass };
  }

  if (item.href?.startsWith('http')) {
    await page.waitForURL((url) => url.href !== page.url() || url.host !== new URL(base).host, { timeout: 1500 }).catch(() => {});
    const now = page.url();
    if (!now.startsWith(origin)) return { actual: `navigated ${now}`, pass: now.startsWith(item.href.slice(0, 24)) };
    return { actual: `did not open ${item.href}`, pass: false };
  }

  await page.waitForTimeout(200);
  const now = new URL(page.url());
  if (!now.href.startsWith(origin)) return { actual: `navigated ${now.href}`, pass: true };
  const landed = normPath(now.pathname);
  if (landed !== normPath(path)) return { actual: landed, pass: (await notFound(page)) === 0 };

  if (item.tag === 'input' || item.tag === 'textarea' || item.tag === 'select' || item.role === 'combobox') {
    return { actual: 'focused the field', pass: true };
  }
  if (item.disabled) return { actual: 'stayed disabled', pass: true };
  const dialogsAfter = await page.getByRole('dialog').count();
  if (dialogsAfter > dialogsBefore) return { actual: 'opened a dialog', pass: true };
  if (dialogsAfter < dialogsBefore) return { actual: 'closed a dialog', pass: true };
  const expanded = await locator.getAttribute('aria-expanded').catch(() => null);
  if (expanded && expanded !== item.expanded) return { actual: `aria-expanded=${expanded}`, pass: true };
  const selected = await locator.getAttribute('aria-selected').catch(() => null);
  if (selected === 'true') return { actual: 'selected', pass: true };
  const toast = await page.locator('[data-sonner-toast], [role="status"]').allTextContents().catch(() => []);
  const toastText = toast.map((text) => text.trim()).find(Boolean);
  if (toastText) return { actual: `toast: ${toastText.slice(0, 80)}`, pass: true };
  if (item.type === 'submit' || /submit|subscribe|sign in|request|reserve|join/i.test(item.label || '')) {
    const invalid = await page.locator(':invalid').count();
    if (invalid) return { actual: 'browser validation blocked an empty submit', pass: true };
  }
  const afterText = await page.locator('main').innerText().catch(() => '');
  if (afterText !== beforeText) return { actual: 'updated the page', pass: true };
  if (item.role === 'option' || item.role === 'tab' || item.role === 'switch') return { actual: 'activated', pass: true };
  return { actual: `stayed on ${path}`, pass: item.tag !== 'a' };
}

async function auditViewport(name, contextOptions) {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ ...contextOptions, baseURL: base });
  await context.route('**/*', (route) => {
    const type = route.request().resourceType();
    const url = route.request().url();
    if (type === 'image' || type === 'media' || type === 'font') return route.abort();
    if (url.includes('supabase.co')) return route.abort();
    return route.continue();
  });
  const page = await context.newPage();
  const file = `${outDir}/${name}.jsonl`;
  writeFileSync(file, '');
  const rows = [];
  for (const path of routes) {
    await openPath(page, path);
    await page.getByRole('heading', { level: 1 }).first().waitFor({ state: 'visible', timeout: 8000 }).catch(() => {});
    const landed = normPath(new URL(page.url()).pathname);
    const missing = await notFound(page);
    const redirect = landed !== normPath(path);
    const routeRow = {
      viewport: name,
      page: path,
      label: '(route)',
      tag: 'document',
      role: null,
      href: path,
      context: 'route',
      expected: redirect ? 'intentional redirect or the not-found page' : 'render this route',
      actual: missing ? `404 ${landed}` : redirect ? `redirects to ${landed}` : 'rendered',
      pass: path === '/this-page-does-not-exist' ? missing > 0 : missing === 0,
    };
    rows.push(routeRow);
    appendFileSync(file, JSON.stringify(routeRow) + '\n');
    if ((path === '/press' || path === '/afterparty') && landed === '/') {
      status(name, `${path} redirect`);
      continue;
    }
    const items = await discover(page);
    let index = 0;
    let dirty = true;
    for (const item of items) {
      index += 1;
      status(name, `${path} ${index}/${items.length} ${item.label.slice(0, 40)}`);
      const here = page.url().startsWith(origin) ? normPath(new URL(page.url()).pathname) : '';
      if (dirty || here !== normPath(path)) await openPath(page, path);
      let outcome;
      try {
        outcome = await clickItem(page, item, path);
      } catch (error) {
        outcome = { actual: `click error: ${String(error.message || error).slice(0, 160)}`, pass: false };
      }
      if (!page.url().startsWith(origin)) await openPath(page, path);
      const row = {
        viewport: name,
        page: path,
        label: item.label || item.tag,
        tag: item.tag,
        role: item.role,
        href: item.href,
        context: item.context,
        expected: expectedFor(item),
        actual: outcome.actual,
        pass: outcome.pass,
      };
      rows.push(row);
      appendFileSync(file, JSON.stringify(row) + '\n');
      const stayed = page.url().startsWith(origin) && normPath(new URL(page.url()).pathname) === normPath(path);
      const quiet = /popup |mailto |focused the field|stayed disabled|stayed on /.test(outcome.actual);
      dirty = !stayed || !quiet;
    }
    console.log(`${name} ${path} ${items.length}`);
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
writeFileSync(`${outDir}/failures.json`, JSON.stringify(failed, null, 2));
console.log(JSON.stringify({ total: rows.length, failed: failed.length, desktop: desktop.length, iphone: iphone.length }, null, 2));
