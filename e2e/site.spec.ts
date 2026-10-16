import { expect, test, type Page } from '@playwright/test';

const LUMA_EVENT = 'https://luma.com/50wo8gm8';
const LUMA_CALENDAR = 'https://luma.com/wildai';
const LUMA_URLS = new Set([LUMA_EVENT, LUMA_CALENDAR]);

const routes: { path: string; heading: RegExp; redirect?: string }[] = [
  { path: '/', heading: /The room where/ },
  { path: '/events', heading: /Wild AI\s+events/ },
  { path: '/chapters', heading: /Find your/ },
  { path: '/speak', heading: /Demo at/ },
  { path: '/sponsor', heading: /Reach AI/ },
  { path: '/about', heading: /crowded room/ },
  { path: '/join', heading: /Join/ },
  { path: '/start-a-chapter', heading: /chapter/i },
  { path: '/past-events', heading: /Past events/ },
  { path: '/blog', heading: /^Blog$/ },
  { path: '/show-and-tell', heading: /SHOW & TELL/ },
  { path: '/location', heading: /Locations/ },
  { path: '/locations', heading: /Locations/ },
  { path: '/events/february-2026', heading: /FEBRUARY 2026/ },
  { path: '/events/march-2026', heading: /MARCH 2026/ },
  { path: '/events/april-2026', heading: /APRIL 2026/ },
  { path: '/events/may-2026', heading: /MAY 2026/ },
  { path: '/events/gopher-ai-demo-night', heading: /DEMO NIGHT/ },
  { path: '/events/gopher-ai-conference', heading: /DEMO NIGHT/ },
  { path: '/admin/login', heading: /ADMIN ACCESS/ },
  { path: '/minneapolis', heading: /Next up/ },
  { path: '/san-francisco', heading: /coming soon/ },
  { path: '/toronto', heading: /coming soon/ },
  { path: '/chicago', heading: /coming soon/ },
  { path: '/austin', heading: /coming soon/ },
  { path: '/events/msp-october-2026', heading: /October/ },
  { path: '/events/archive-2026-09-21', heading: /September Meetup/ },
  { path: '/events/archive-2025-06-19', heading: /June Meetup/ },
  { path: '/afterparty', heading: /The room where/, redirect: '/' },
  { path: '/press', heading: /The room where/, redirect: '/' },
];

const seedPages = [
  '/',
  '/events',
  '/chapters',
  '/speak',
  '/sponsor',
  '/about',
  '/join',
  '/start-a-chapter',
  '/past-events',
  '/blog',
  '/show-and-tell',
  '/location',
  '/minneapolis',
  '/events/msp-october-2026',
];

test.beforeEach(async ({ page }) => {
  await page.route(/supabase\.co/, (route) => route.abort('failed'));
});

async function dismissIntro(page: Page) {
  const overlay = page.locator('.intro-overlay');
  if (await overlay.isVisible().catch(() => false)) {
    await overlay.click();
    await overlay.waitFor({ state: 'detached', timeout: 6000 });
  }
}

async function openPath(page: Page, path: string) {
  await page.goto(path, { waitUntil: 'domcontentloaded' });
  await dismissIntro(page);
  await expect(page.locator('header.site-header')).toBeVisible();
}

async function assertPage(page: Page, heading: RegExp) {
  await expect(page.getByRole('heading', { level: 1 })).toContainText(heading);
  await expect(page.getByText('Page not found')).toHaveCount(0);
}

function isRegistrationLabel(text: string) {
  return /^(register|register now|rsvp|rsvp now)$/i.test(text.replace(/\s+/g, ' ').trim());
}

test.describe('routes', () => {
  for (const route of routes) {
    test(`${route.path} renders`, async ({ page }) => {
      await openPath(page, route.path);
      if (route.redirect) {
        await expect(page).toHaveURL(new RegExp(`${route.redirect}$`));
      }
      await assertPage(page, route.heading);
    });
  }

  test('unknown paths render the 404 page', async ({ page }) => {
    await openPath(page, '/this-page-does-not-exist');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/not found/i);
    await page.getByRole('link', { name: 'Return to Home' }).click();
    await assertPage(page, /The room where/);
  });
});

test('internal links from each page open a real route', async ({ page }) => {
  const seen = new Set<string>();
  const failures: string[] = [];

  for (const seed of seedPages) {
    await openPath(page, seed);
    const hrefs = await page.locator('a[href]').evaluateAll((anchors) =>
      anchors.map((anchor) => ({
        href: anchor.getAttribute('href') || '',
        target: anchor.getAttribute('target') || '',
      })),
    );

    for (const item of hrefs) {
      if (!item.href.startsWith('/') || item.href.startsWith('//')) continue;
      if (item.target === '_blank') continue;
      const path = item.href.split('#')[0] || '/';
      if (seen.has(path) || path === seed) continue;
      seen.add(path);

      if (new URL(page.url()).pathname !== seed) await openPath(page, seed);
      const link = page.locator(`a[href="${item.href}"]`).first();
      if (!(await link.isVisible().catch(() => false))) continue;
      await link.evaluate((element: HTMLAnchorElement) => element.click());
      await page.waitForLoadState('domcontentloaded');
      await dismissIntro(page);
      const heading = page.getByRole('heading', { level: 1 }).first();
      const appeared = await heading.waitFor({ state: 'visible', timeout: 8000 }).then(() => true).catch(() => false);
      if (!appeared) failures.push(`${seed} -> ${item.href} (no heading)`);
      if (await page.getByText('Page not found').count()) failures.push(`${seed} -> ${item.href}`);
    }
  }

  expect(failures, failures.join('\n')).toEqual([]);
  expect(seen.size).toBeGreaterThan(10);
});

test('registration, demo, sponsor, and LinkedIn hrefs are valid', async ({ page }) => {
  const pagesToAudit = ['/', '/events', '/past-events', '/minneapolis', '/speak', '/sponsor', '/about'];

  for (const path of pagesToAudit) {
    await openPath(page, path);
    const links = await page.locator('a[href]').evaluateAll((anchors) =>
      anchors.map((anchor) => ({
        href: anchor.getAttribute('href') || '',
        text: (anchor.textContent || '').replace(/\s+/g, ' ').trim(),
      })),
    );

    for (const link of links) {
      if (isRegistrationLabel(link.text)) {
        expect(LUMA_URLS.has(link.href), `${path} ${link.text} -> ${link.href}`).toBe(true);
      }
      if (/^sign up to demo$/i.test(link.text)) expect(link.href).toBe('/speak');
      if (/^become a sponsor$/i.test(link.text)) expect(link.href).toBe('/sponsor');
      if (link.text === 'Read the full recap on LinkedIn' || /linkedin/i.test(link.href)) {
        expect(link.href, link.text).toMatch(/^https:\/\/([a-z0-9-]+\.)?(linkedin\.com|lnkd\.in)\//);
      }
      if (link.href.startsWith('mailto:')) expect(link.href).toMatch(/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/);
    }
  }

  await openPath(page, '/');
  await expect(page.getByRole('link', { name: 'Register now' })).toHaveAttribute('href', LUMA_EVENT);
  await expect(page.locator('header').getByRole('link', { name: 'Register' })).toHaveAttribute('href', LUMA_EVENT);
  await expect(page.locator('#next-event').getByRole('link', { name: 'Register' })).toHaveAttribute('href', LUMA_EVENT);
  await expect(page.getByRole('link', { name: 'Sign up to demo' })).toHaveAttribute('href', '/speak');
  await expect(page.getByRole('link', { name: 'Become a sponsor' })).toHaveAttribute('href', '/sponsor');

  await openPath(page, '/events');
  await expect(page.getByRole('link', { name: /RSVP/ }).first()).toHaveAttribute('href', LUMA_EVENT);
  const upcomingHrefs = await page.locator('a[href*="luma.com"]').evaluateAll((anchors) =>
    anchors.map((anchor) => anchor.getAttribute('href')),
  );
  expect(upcomingHrefs).toContain(LUMA_EVENT);
  expect(upcomingHrefs).toContain(LUMA_CALENDAR);

  await openPath(page, '/past-events');
  const recapLinks = page.getByRole('link', { name: 'Read the full recap on LinkedIn' });
  await expect(recapLinks).toHaveCount(8);
  const recapHrefs = await recapLinks.evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute('href')));
  for (const href of recapHrefs) expect(href).toMatch(/^https:\/\/www\.linkedin\.com\/feed\/update\//);
});

test('See all companies toggles and the carousel has no arrows', async ({ page }) => {
  await openPath(page, '/');
  await expect(page.getByRole('button', { name: 'Show previous logos' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Show next logos' })).toHaveCount(0);

  const toggle = page.locator('button[aria-controls="company-logos"]');
  await toggle.scrollIntoViewIfNeeded();
  await expect(toggle).toHaveText('See all companies');
  await expect(page.locator('[data-logo-rail]')).toHaveCount(2);
  const overflow = await page.locator('[data-logo-rail]').first().evaluate((element) => getComputedStyle(element).overflowX);
  expect(overflow).toBe('auto');

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(toggle).toHaveText('Show the carousel');
  await expect(page.locator('#company-logos .grid a, #company-logos .grid span')).not.toHaveCount(0);
  const gridCount = await page.locator('#company-logos .grid [data-fit]').count();
  expect(gridCount).toBeGreaterThan(20);

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toHaveText('See all companies');
  await expect(page.locator('[data-logo-rail]')).toHaveCount(2);
});

test('events Upcoming and Past filters', async ({ page }) => {
  await openPath(page, '/events');
  await expect(page.getByRole('button', { name: 'UPCOMING' })).toBeVisible();
  await expect(page.getByText('October 19, 2026')).toBeVisible();
  await expect(page.getByText('November 16, 2026')).toBeVisible();
  await expect(page.getByText('December 21, 2026')).toBeVisible();
  await expect(page.getByText('No past events for this filter yet.')).toHaveCount(0);

  await page.getByRole('button', { name: 'PAST' }).click();
  await expect(page.getByText('June 19, 2025')).toBeVisible();
  await expect(page.getByText('October 19, 2026')).toHaveCount(0);
  await expect(page.getByText('No past events for this filter yet.')).toHaveCount(0);

  await page.getByRole('link', { name: /June 19, 2025/ }).click();
  await assertPage(page, /June Meetup/);
  await expect(page.getByText('Thursday, June 19, 2025')).toBeVisible();
  await expect(page.getByText('Abhishek Adil').first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Read the full recap on LinkedIn' })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/feed/update/urn:li:activity:7341870434138628096/',
  );

  await openPath(page, '/events');
  await page.getByRole('button', { name: 'UPCOMING' }).click();
  await expect(page.getByText('October 19, 2026')).toBeVisible();
});

const VIKAS_LINKEDIN = 'https://www.linkedin.com/in/vikas-sabbi-801010a9';
const BILLY_LINKEDIN = 'https://www.linkedin.com/in/billy-walker';

test('October 19 lineup and 6:40 PM demo start', async ({ page }) => {
  await openPath(page, '/');
  const next = page.locator('#next-event');
  await expect(next.getByText('6:40 PM')).toBeVisible();
  await expect(next.getByText('Vikas Sabbi')).toBeVisible();
  await expect(next.getByText('Eric Phillips')).toBeVisible();
  await expect(next.getByText('Billy Walker')).toBeVisible();
  await expect(next.getByText('Ducky, a peer-to-peer desktop app.')).toBeVisible();
  await expect(next.getByText(/Circex, AI that turns NASA/)).toBeVisible();
  await expect(next.getByText(/first high schooler ever to speak at Wild AI/i)).toBeVisible();
  await expect(next.getByText(/stealth project, more soon/i)).toBeVisible();
  const nextText = await next.innerText();
  expect(nextText.indexOf('Vikas Sabbi')).toBeLessThan(nextText.indexOf('Eric Phillips'));
  expect(nextText.indexOf('Eric Phillips')).toBeLessThan(nextText.indexOf('Billy Walker'));
  await expect(next.getByRole('link', { name: /Vikas Sabbi/ })).toHaveAttribute('href', VIKAS_LINKEDIN);
  await expect(next.getByRole('link', { name: /Billy Walker/ })).toHaveAttribute('href', BILLY_LINKEDIN);
  await expect(next.getByRole('link', { name: /Eric Phillips/ })).toHaveCount(0);

  await openPath(page, '/events/msp-october-2026');
  await expect(page.getByText('6:40 PM').first()).toBeVisible();
  await expect(page.getByText('6:30')).toHaveCount(0);
  await expect(page.locator('meta[data-rh="true"][name="description"]')).toHaveAttribute(
    'content',
    /Live demos start at 6:40 PM CT\. Networking until 9\./,
  );
  const lineup = page.locator('div.surface').filter({ has: page.getByRole('heading', { name: 'SPEAKER LINEUP' }) });
  await expect(lineup.getByRole('link', { name: /Vikas Sabbi/ })).toHaveAttribute('href', VIKAS_LINKEDIN);
  await expect(lineup.getByRole('link', { name: /Billy Walker/ })).toHaveAttribute('href', BILLY_LINKEDIN);
  await expect(lineup.getByRole('link', { name: /Eric Phillips/ })).toHaveCount(0);
  await expect(lineup.getByText('Eric Phillips')).toBeVisible();
  await expect(lineup.getByText(/first high schooler ever/i)).toBeVisible();
  await expect(page.getByRole('link', { name: 'RSVP NOW' })).toHaveAttribute('href', LUMA_EVENT);

  await openPath(page, '/events');
  await expect(page.getByText('Demos 6:40 PM').first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Vikas Sabbi/ })).toHaveAttribute('href', VIKAS_LINKEDIN);
  await expect(page.getByRole('link', { name: /Billy Walker/ })).toHaveAttribute('href', BILLY_LINKEDIN);
  await expect(page.getByRole('link', { name: /Eric Phillips/ })).toHaveCount(0);
  await expect(page.getByText('Eric Phillips')).toBeVisible();

  await openPath(page, '/minneapolis');
  await expect(page.getByText('6:40 PM').first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Vikas Sabbi/ })).toHaveAttribute('href', VIKAS_LINKEDIN);
  await expect(page.getByRole('link', { name: /Eric Phillips/ })).toHaveCount(0);
  await expect(page.getByText(/first high schooler ever/i)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Register' }).first()).toHaveAttribute('href', LUMA_EVENT);
});

test('anchors scroll to the named section', async ({ page }) => {
  await openPath(page, '/about');
  await page.locator('a[href="/about#conduct"]').click();
  await expect(page.locator('#conduct')).toBeInViewport();

  await openPath(page, '/san-francisco');
  const signup = page.locator('a[href="#chapter-signup"]');
  if (await signup.count()) {
    await signup.first().click();
    await expect(page.locator('#chapter-signup')).toBeInViewport();
  }

  await openPath(page, '/');
  await page.locator('a[href="/events"]').first().evaluate((element: HTMLAnchorElement) => element.click());
  await expect(page).toHaveURL(/\/events$/);
  await assertPage(page, /events/i);
});

test('forms validate, and a mocked sponsor submit succeeds', async ({ page }) => {
  await openPath(page, '/');
  const email = page.locator('footer input[type="email"]');
  await email.fill('not-an-email');
  await page.locator('footer').getByRole('button', { name: 'SUBSCRIBE' }).click();
  await expect(email).toHaveJSProperty('validity.valid', false);

  await openPath(page, '/speak');
  await page.locator('#name').fill('Test Builder');
  await page.locator('#email').fill('builder@example.com');
  await page.locator('#description').fill('   ');
  await page.locator('#building').fill('A demo');
  await page.getByRole('button', { name: 'Submit application' }).click();
  await expect(page.getByText('Description required')).toBeVisible();

  await openPath(page, '/sponsor');
  await page.getByRole('button', { name: 'REQUEST SPONSOR INFO' }).click();
  await expect(page.locator('#sponsor-company')).toHaveJSProperty('validity.valid', false);
  await expect(page.getByText("we'll be in touch shortly")).toHaveCount(0);

  await page.unroute(/supabase\.co/);
  await page.route(/supabase\.co/, async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({ status: 201, contentType: 'application/json', body: '[]' });
      return;
    }
    await route.fulfill({ status: 200, contentType: 'application/json', body: 'null' });
  });
  await page.route('**/api/lead', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true, id: 'test', emailed: false }),
    });
  });
  await page.locator('#sponsor-company').fill('Acme AI');
  await page.locator('#sponsor-name').fill('Ada Lovelace');
  await page.locator('#sponsor-email').fill('ada@acme.ai');
  await page.getByRole('button', { name: 'REQUEST SPONSOR INFO' }).click();
  await expect(page.getByText("we'll be in touch shortly")).toBeVisible();

  await openPath(page, '/events/march-2026');
  const showForm = page.locator('form').filter({ has: page.locator('#sat-name') });
  await showForm.getByRole('button', { name: 'Reserve My Spot' }).click();
  await expect(page.getByText('Please fill in all fields', { exact: true })).toBeVisible();

  await openPath(page, '/admin/login');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('heading', { name: 'ADMIN ACCESS' })).toBeVisible();
});

test('photo gallery opens and past events expand', async ({ page }) => {
  await openPath(page, '/');
  const tabs = page.getByRole('tab');
  await expect(tabs.first()).toBeVisible();
  await tabs.nth(1).click();
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await page.getByRole('button', { name: 'Open photo 1' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);

  const pastToggle = page.locator('#past-events button').first();
  await pastToggle.click();
  await expect(pastToggle).toHaveAttribute('aria-expanded', 'true');
});

test('primary navigation reaches every section', async ({ page }, testInfo) => {
  await openPath(page, '/');
  const iphone = testInfo.project.name === 'iphone';

  if (iphone) {
    const menu = page.getByRole('button', { name: 'Open navigation' });
    await expect(menu).toBeVisible();
    await menu.click();
    await expect(page.getByRole('menuitem', { name: 'Chapters' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('menuitem', { name: 'Start a chapter' })).toBeHidden();

    for (const label of ['Chapters', 'Events', 'Speak', 'Sponsor', 'About', 'Minneapolis', 'Start a chapter']) {
      await menu.click();
      await page.getByRole('menuitem', { name: label, exact: true }).click();
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByText('Page not found')).toHaveCount(0);
      await expect(page.getByRole('menuitem', { name: 'Start a chapter' })).toBeHidden();
    }
  } else {
    await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveCount(0);
    for (const item of [
      { label: 'Chapters', heading: /Find your/ },
      { label: 'Events', heading: /events/i },
      { label: 'Speak', heading: /Demo at/ },
      { label: 'Sponsor', heading: /Reach AI/ },
      { label: 'About', heading: /crowded room/ },
    ]) {
      await page.locator('nav[aria-label="Primary navigation"]').getByRole('link', { name: item.label }).click();
      await assertPage(page, item.heading);
    }

    await page.getByRole('button', { name: 'Search the site' }).click();
    await expect(page.getByPlaceholder('Search pages, chapters, events…')).toBeVisible();
    await page.getByRole('option', { name: 'Join the list' }).click();
    await assertPage(page, /Join/);
  }
});
