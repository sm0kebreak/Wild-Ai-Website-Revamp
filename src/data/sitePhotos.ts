/** Event frames. Hero shots stay off every other section. */

export type PhotoFrame = {
  stem: string;
  width: number;
  height: number;
  widths: number[];
};

const frame = (stem: string, width: number, height: number, widths: number[]): PhotoFrame => ({
  stem,
  width,
  height,
  widths,
});

const wide = (stem: string): PhotoFrame => frame(stem, 1280, 960, [480, 960, 1280]);
const wide800 = (stem: string): PhotoFrame => frame(stem, 800, 600, [480, 800]);
const tall800 = (stem: string, height = 1067): PhotoFrame => frame(stem, 800, height, [480, 800]);
const wide1600 = (stem: string): PhotoFrame => frame(stem, 1600, 1200, [480, 960, 1600]);
const tall1600 = (stem: string): PhotoFrame => frame(stem, 1600, 2133, [480, 960, 1600]);
const square1600 = (stem: string): PhotoFrame => frame(stem, 1600, 1600, [480, 960, 1600]);

export const PHOTO_FRAMES: Record<string, PhotoFrame> = {
  '2026-09-minneapolis-01': wide('2026-09-minneapolis-01'),
  '2026-08-minneapolis-05': wide('2026-08-minneapolis-05'),
  '2026-08-minneapolis-07': wide('2026-08-minneapolis-07'),
  '2026-09-minneapolis-02': wide('2026-09-minneapolis-02'),
  '2026-08-minneapolis-08': wide('2026-08-minneapolis-08'),
  '2026-08-minneapolis-02': wide('2026-08-minneapolis-02'),
  '2026-08-minneapolis-03': wide('2026-08-minneapolis-03'),
  '2026-08-minneapolis-04': wide('2026-08-minneapolis-04'),
  '2026-08-minneapolis-06': wide('2026-08-minneapolis-06'),
  '2026-09-minneapolis-03': wide('2026-09-minneapolis-03'),
  '2026-09-minneapolis-04': wide('2026-09-minneapolis-04'),
  '2026-08-sf-01': wide('2026-08-sf-01'),
  '2026-08-sf-02': tall800('2026-08-sf-02'),
  '2026-08-minneapolis-01': wide800('2026-08-minneapolis-01'),
  '2026-08-sf-03': tall800('2026-08-sf-03'),
  '2026-08-sf-04': tall800('2026-08-sf-04'),
  '2026-08-sf-05': tall800('2026-08-sf-05'),
  '2026-10-afterparty-01': wide('2026-10-afterparty-01'),
  '2026-10-afterparty-02': wide('2026-10-afterparty-02'),
  '2026-10-afterparty-03': wide('2026-10-afterparty-03'),
  '2026-10-afterparty-04': frame('2026-10-afterparty-04', 1280, 1707, [480, 800, 960, 1280]),
  '2026-10-rochester-01': wide800('2026-10-rochester-01'),
  '2026-10-rochester-02': tall800('2026-10-rochester-02', 1066),
  '2026-10-rochester-03': wide('2026-10-rochester-03'),
  '2026-10-rochester-04': tall800('2026-10-rochester-04', 1066),
  '2026-10-rochester-05': tall800('2026-10-rochester-05', 1066),
  '2026-10-rochester-06': wide('2026-10-rochester-06'),
  '2026-10-rochester-07': tall800('2026-10-rochester-07', 1066),
  '2026-10-rochester-50': wide1600('2026-10-rochester-50'),
  '2026-10-rochester-51': wide1600('2026-10-rochester-51'),
  '2026-10-rochester-52': tall1600('2026-10-rochester-52'),
  '2026-10-rochester-53': square1600('2026-10-rochester-53'),
  '2025-06-minneapolis-01': wide800('2025-06-minneapolis-01'),
  '2025-06-minneapolis-02': wide800('2025-06-minneapolis-02'),
};

/** Crowd and demo frames for the homepage crossfade. Not reused elsewhere. */
export const HERO_FRAMES = [
  '2026-09-minneapolis-01',
  '2026-08-minneapolis-05',
  '2026-08-minneapolis-07',
  '2026-09-minneapolis-02',
  '2026-08-minneapolis-08',
] as const;

export const MANIFESTO_STEM = '2026-08-sf-02';

const PAGE_PHOTO: Record<string, string> = {
  '/events': '2026-10-rochester-03',
  '/chapters': '2026-10-rochester-06',
  '/speak': '2026-10-afterparty-01',
  '/sponsor': '2026-10-afterparty-02',
  '/about': '2026-10-afterparty-03',
  '/join': '2026-08-sf-04',
  '/start-a-chapter': '2026-08-sf-05',
  '/past-events': '2025-06-minneapolis-02',
  '/blog': '2025-06-minneapolis-01',
  '/show-and-tell': '2026-10-rochester-01',
  '/location': '2026-08-sf-03',
  '/locations': '2026-08-sf-03',
  '/events/february-2026': '2026-10-rochester-02',
  '/events/march-2026': '2026-10-rochester-04',
  '/events/april-2026': '2026-10-rochester-05',
  '/events/may-2026': '2026-10-rochester-07',
  '/events/gopher-ai-demo-night': '2026-10-rochester-50',
  '/events/gopher-ai-conference': '2026-10-rochester-50',
  '/minneapolis': '2026-10-rochester-51',
  '/events/msp-october-2026': '2026-10-rochester-52',
  '/austin': '2026-08-minneapolis-01',
  '/404': '2026-10-afterparty-04',
};

const FALLBACK = ['2026-10-rochester-53', '2026-09-minneapolis-04', '2026-08-minneapolis-04', '2026-08-sf-01'];

export const photoFrame = (stem: string) => PHOTO_FRAMES[stem] ?? PHOTO_FRAMES['2026-08-minneapolis-06'];

export const photoSrc = (stem: string) => {
  const photo = photoFrame(stem);
  const largest = photo.widths[photo.widths.length - 1];
  return `/event-photos/${stem}-${largest}.webp`;
};

export const photoSrcSet = (stem: string) => {
  const photo = photoFrame(stem);
  return photo.widths.map((width) => `/event-photos/${stem}-${width}.webp ${width}w`).join(', ');
};

export const photoForPath = (pathname: string) => {
  if (PAGE_PHOTO[pathname]) return PAGE_PHOTO[pathname];
  let hash = 0;
  for (const char of pathname) hash = (hash * 33 + char.charCodeAt(0)) >>> 0;
  return FALLBACK[hash % FALLBACK.length];
};
