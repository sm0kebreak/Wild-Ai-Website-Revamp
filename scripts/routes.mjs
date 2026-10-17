/** Real pages. Redirects (/admin, /press, /afterparty) are not included. */
export const SITE = 'https://wildai.us';

const ARCHIVE_DATES = [
  '2026-10-14',
  '2026-09-21',
  '2026-08-17',
  '2026-08-05',
  '2026-07-20',
  '2026-06-19',
  '2026-05-18',
  '2026-04-20',
  '2026-03-16',
  '2026-02-16',
  '2026-01-19',
  '2025-12-15',
  '2025-11-17',
  '2025-10-20',
  '2025-09-15',
  '2025-08-18',
  '2025-07-21',
  '2025-06-19',
  '2025-05-15',
  '2025-04-17',
  '2025-03-20',
];

export const routes = [
  '/',
  '/events',
  '/chapters',
  '/speak',
  '/sponsor',
  '/about',
  '/companies',
  '/join',
  '/start-a-chapter',
  '/past-events',
  '/blog',
  '/show-and-tell',
  '/location',
  '/locations',
  '/events/february-2026',
  '/events/march-2026',
  '/events/april-2026',
  '/events/may-2026',
  '/events/gopher-ai-demo-night',
  '/events/gopher-ai-conference',
  '/minneapolis',
  '/san-francisco',
  '/toronto',
  '/chicago',
  '/austin',
  '/events/msp-october-2026',
  '/events/msp-november-2026',
  '/events/msp-december-2026',
  ...ARCHIVE_DATES.map((date) => `/events/archive-${date}`),
];

export const sitemapXml = () => {
  const urls = routes
    .map((route) => `  <url><loc>${SITE}${route === '/' ? '/' : route}</loc></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};
