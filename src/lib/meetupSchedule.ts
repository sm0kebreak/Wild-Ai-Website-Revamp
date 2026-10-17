import type { Chapter, ChapterEvent } from '@/hooks/useChapters';
import { confirmedMeetupSpeakers } from '@/data/speakerArchive';

export const MEETUP_VENUE = {
  name: 'Dangerous Man Brewing',
  street: '861 E Hennepin Ave #100',
  cityState: 'Minneapolis, MN 55414',
  address: '861 E Hennepin Ave #100, Minneapolis, MN 55414',
};

export const MEETUP_START_TIME = '18:00';
/** Networking runs until 9:00 PM. Doors stay at 18:00. */
export const MEETUP_END_TIME = '21:00';
export const MEETUP_CADENCE = 'Doors 6:00 PM · Three demos starting at 6:40 · Networking until 9 PM';

/** One line for heroes, cards, and format copy. */
export const MEETUP_TIME_LINE = 'Doors 6:00 PM · Three demos starting at 6:40 · Networking until 9 PM';

/** Exact demo-signup line. Use this on every signup surface. */
export const DEMO_SIGNUP =
  'Sign up to demo: 15 minutes on the mic. Demo to the room what you built, then take questions and feedback from the audience.';

export const meetupFormatCopy =
  'Doors 6:00 PM · Three demos starting at 6:40 · Networking until 9 PM. 15-minute demos, no slides. All ages. Free.';

/** Wild AI Luma calendar. Nights without their own event page register here. */
export const LUMA_CALENDAR_URL = 'https://luma.com/wildai';

/** October 19, 2026 is the only night with its own Luma event. */
const LUMA_EVENT_URLS: Record<string, string> = {
  '2026-10-19': 'https://luma.com/50wo8gm8',
};

/** Announced Minneapolis nights. Registration is on Luma. */
export const CONFIRMED_MEETUPS = [
  { date: '2026-10-19' },
  { date: '2026-11-16' },
  { date: '2026-12-21' },
] as const;

export const CONFIRMED_MEETUP_DATE = CONFIRMED_MEETUPS[0].date;
export const CONFIRMED_MEETUP_URL = LUMA_EVENT_URLS[CONFIRMED_MEETUP_DATE];

export const rsvpUrlFor = (dateIso: string) => LUMA_EVENT_URLS[dateIso] ?? LUMA_CALENDAR_URL;

const isConfirmedMeetup = (dateIso: string) =>
  CONFIRMED_MEETUPS.some((meetup) => meetup.date === dateIso);

/** Clock line for an announced Minneapolis night, or null for every other date. */
export const standingMeetupTime = (dateIso: string) =>
  isConfirmedMeetup(dateIso) ? MEETUP_TIME_LINE : null;

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
  {
    time: '6:40 PM',
    label: 'Three demos start. About 10 minutes to demo, then about 5 minutes of questions and feedback. No slides.',
  },
  { time: 'Until 9 PM', label: 'Networking' },
];

export const meetupBlurb =
  'Doors 6:00 PM · Three demos starting at 6:40 · Networking until 9 PM at Dangerous Man Brewing, 861 E Hennepin Ave #100, Minneapolis. Each demo is 15 minutes with no slides: about 10 minutes to show what you built, then about 5 minutes of questions and feedback. All ages. Free.';

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
    end_time: MEETUP_END_TIME,
    venue_name: MEETUP_VENUE.name,
    venue_address: MEETUP_VENUE.address,
    description: meetupBlurb,
    agenda: meetupAgenda,
    speakers: confirmedMeetupSpeakers(date),
    recap_url: null,
    meetup_url: rsvpUrlFor(date),
    attendee_count: null,
    chapter,
  }));
};

/** Public facts for an announced meetup, including when a stored row already exists. */
export const withConfirmedMeetup = <T extends ChapterEvent>(event: T): T => {
  if (!isConfirmedMeetup(event.event_date)) return event;
  const meetupUrl = rsvpUrlFor(event.event_date);
  return {
    ...event,
    title: meetupTitle(event.event_date),
    start_time: MEETUP_START_TIME,
    end_time: MEETUP_END_TIME,
    venue_name: MEETUP_VENUE.name,
    venue_address: MEETUP_VENUE.address,
    description: meetupBlurb,
    agenda: meetupAgenda,
    meetup_url: meetupUrl,
    speakers: confirmedMeetupSpeakers(event.event_date),
  };
};
