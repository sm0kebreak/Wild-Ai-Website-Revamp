/**
 * Announced Minneapolis nights, oldest first.
 * Add the date and its Luma page here. The next event, registration links,
 * event pages, and sitemap all follow from this list and today's date.
 */
export type MinneapolisMeetup = {
  date: string;
  luma: string;
};

export const MINNEAPOLIS_MEETUPS: MinneapolisMeetup[] = [
  { date: '2026-10-19', luma: 'https://luma.com/50wo8gm8' },
  { date: '2026-11-16', luma: 'https://luma.com/apk860qm' },
  { date: '2026-12-21', luma: 'https://luma.com/v4c2w2gu' },
  { date: '2027-01-18', luma: 'https://luma.com/8kzm3krz' },
  { date: '2027-02-15', luma: 'https://luma.com/yuh7of9h' },
];

export const meetupMonthName = (dateIso: string) =>
  new Date(`${dateIso}T00:00:00`).toLocaleDateString('en-US', { month: 'long' });

export const minneapolisMeetupSlug = (dateIso: string) =>
  `msp-${meetupMonthName(dateIso).toLowerCase()}-${dateIso.slice(0, 4)}`;

export const minneapolisMeetupPath = (dateIso: string) => `/events/${minneapolisMeetupSlug(dateIso)}`;
