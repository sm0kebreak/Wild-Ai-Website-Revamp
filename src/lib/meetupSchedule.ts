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

/** The next announced Minneapolis meetup. Later months stay on the third-Monday cadence. */
export const CONFIRMED_MEETUP_DATE = '2026-10-19';
export const CONFIRMED_MEETUP_URL = 'https://www.meetup.com/wild-ai/events/316500602/';

export const rsvpUrlFor = (dateIso: string) =>
  dateIso === CONFIRMED_MEETUP_DATE ? CONFIRMED_MEETUP_URL : null;

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

export const nextMeetupDate = (from = new Date()) => upcomingMeetupDates(1, from)[0];

/** Recurring meetups rendered alongside anything already stored for the chapter. */
export const scheduledMeetups = (chapter: Chapter, count = 4): ChapterEvent[] =>
  upcomingMeetupDates(count).map((date) => ({
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

/** Public facts for the announced meetup, including when a stored row already exists. */
export const withConfirmedMeetup = <T extends ChapterEvent>(event: T): T => {
  if (event.event_date !== CONFIRMED_MEETUP_DATE) return event;
  return {
    ...event,
    title: meetupTitle(event.event_date),
    start_time: MEETUP_START_TIME,
    end_time: null,
    venue_name: MEETUP_VENUE.name,
    venue_address: MEETUP_VENUE.address,
    description: meetupBlurb,
    agenda: meetupAgenda,
    meetup_url: CONFIRMED_MEETUP_URL,
    speakers: [],
  };
};
