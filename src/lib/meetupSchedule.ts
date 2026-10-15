import type { Chapter, ChapterEvent } from '@/hooks/useChapters';

export const MEETUP_VENUE = {
  name: 'Dangerous Man Brewing',
  street: '861 E Hennepin Ave #100',
  cityState: 'Minneapolis, MN 55414',
  address: '861 E Hennepin Ave #100, Minneapolis, MN 55414',
};

export const MEETUP_START_TIME = '18:00';
export const MEETUP_END_TIME = '20:00';
export const MEETUP_CADENCE = 'Third Monday of every month at 6:00 PM CT';

/** Announced Minneapolis meetups. Do not add a date that does not have a Meetup link. */
export const CONFIRMED_MEETUPS = [
  { date: '2026-10-19', url: 'https://www.meetup.com/wild-ai/events/316500602/' },
  { date: '2026-11-16', url: 'https://www.meetup.com/wild-ai/events/316059008/' },
  { date: '2026-12-21', url: 'https://www.meetup.com/wild-ai/events/316059021/' },
] as const;

export const CONFIRMED_MEETUP_DATE = CONFIRMED_MEETUPS[0].date;
export const CONFIRMED_MEETUP_URL = CONFIRMED_MEETUPS[0].url;

export const rsvpUrlFor = (dateIso: string) =>
  CONFIRMED_MEETUPS.find((meetup) => meetup.date === dateIso)?.url ?? null;

/** Confirmed dates that have not passed, soonest first. */
export const confirmedMeetupDates = (from = new Date()): string[] => {
  const today = new Date(from);
  today.setHours(0, 0, 0, 0);
  return CONFIRMED_MEETUPS.map((meetup) => meetup.date).filter(
    (date) => new Date(`${date}T00:00:00`) >= today,
  );
};

export const meetupAgenda = [
  { time: '6:00 PM', label: 'Doors open (CT)' },
  { time: 'Then', label: 'Live demos from builders' },
  { time: 'After', label: 'Networking' },
];

export const meetupBlurb =
  'Doors open at 6:00 PM CT at Dangerous Man Brewing, 861 E Hennepin Ave #100, Minneapolis. Live demos from builders, then networking.';

const pad = (n: number) => String(n).padStart(2, '0');
const toYmd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const thirdMonday = (year: number, month: number) => {
  const first = new Date(year, month, 1);
  return new Date(year, month, 1 + ((8 - first.getDay()) % 7) + 14);
};

const monthName = (dateIso: string) =>
  new Date(dateIso + 'T00:00:00').toLocaleDateString('en-US', { month: 'long' });

export const meetupTitle = (dateIso: string) => `${monthName(dateIso)} Meetup - Wild AI`;

export const meetupSlug = (dateIso: string) =>
  `msp-${monthName(dateIso).toLowerCase()}-${dateIso.slice(0, 4)}`;

/** Next `count` third-Mondays, starting with today's month if it hasn't passed. */
export const upcomingMeetupDates = (count = 4, from = new Date()): string[] => {
  const today = new Date(from);
  today.setHours(0, 0, 0, 0);
  const dates: string[] = [];
  for (let i = 0; dates.length < count; i++) {
    const d = thirdMonday(today.getFullYear(), today.getMonth() + i);
    if (d >= today) dates.push(toYmd(d));
  }
  return dates;
};

export const nextMeetupDate = (from = new Date()) =>
  confirmedMeetupDates(from)[0] ?? upcomingMeetupDates(1, from)[0];

/** Confirmed Minneapolis meetups, alongside anything already stored for the chapter. */
export const scheduledMeetups = (chapter: Chapter, count = 4): ChapterEvent[] => {
  const confirmed = confirmedMeetupDates();
  const dates = confirmed.length > 0 ? confirmed : upcomingMeetupDates(count);
  return dates.map((date) => ({
    id: `scheduled-${date}`,
    chapter_id: chapter.id,
    slug: meetupSlug(date),
    title: meetupTitle(date),
    event_date: date,
    start_time: MEETUP_START_TIME,
    end_time: null,
    venue_name: MEETUP_VENUE.name,
    venue_address: MEETUP_VENUE.address,
    description: meetupBlurb,
    agenda: meetupAgenda,
    speakers: [],
    recap_url: null,
    meetup_url: rsvpUrlFor(date),
    attendee_count: null,
    chapter,
  }));
};

/** Public facts for an announced meetup, including when a stored row already exists. */
export const withConfirmedMeetup = <T extends ChapterEvent>(event: T): T => {
  const meetupUrl = rsvpUrlFor(event.event_date);
  if (!meetupUrl) return event;
  return {
    ...event,
    title: meetupTitle(event.event_date),
    start_time: MEETUP_START_TIME,
    end_time: null,
    venue_name: MEETUP_VENUE.name,
    venue_address: MEETUP_VENUE.address,
    description: meetupBlurb,
    agenda: meetupAgenda,
    meetup_url: meetupUrl,
    speakers: [],
  };
};
