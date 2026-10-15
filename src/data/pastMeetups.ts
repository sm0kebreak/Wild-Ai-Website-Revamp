import { pastEventHistory2026 } from '@/data/eventHistory2026';

export type PastMeetup = {
  id: string;
  date: string;
  displayDate: string;
  city: string;
  venue?: string;
};

/**
 * Older Minneapolis nights from the past-events archive.
 * Venue is included only where an event page already records one.
 */
const olderMinneapolis: PastMeetup[] = [
  {
    id: '2026-04-20',
    date: '2026-04-20',
    displayDate: 'April 20, 2026',
    city: 'Minneapolis',
    venue: 'Improving Minneapolis',
  },
  { id: '2026-03-16', date: '2026-03-16', displayDate: 'March 16, 2026', city: 'Minneapolis' },
  { id: '2026-02-16', date: '2026-02-16', displayDate: 'February 16, 2026', city: 'Minneapolis' },
  { id: '2026-01-19', date: '2026-01-19', displayDate: 'January 19, 2026', city: 'Minneapolis' },
  { id: '2025-12-15', date: '2025-12-15', displayDate: 'December 15, 2025', city: 'Minneapolis' },
  { id: '2025-11-17', date: '2025-11-17', displayDate: 'November 17, 2025', city: 'Minneapolis' },
  { id: '2025-10-20', date: '2025-10-20', displayDate: 'October 20, 2025', city: 'Minneapolis' },
  { id: '2025-09-15', date: '2025-09-15', displayDate: 'September 15, 2025', city: 'Minneapolis' },
  { id: '2025-08-18', date: '2025-08-18', displayDate: 'August 18, 2025', city: 'Minneapolis' },
  { id: '2025-07-21', date: '2025-07-21', displayDate: 'July 21, 2025', city: 'Minneapolis' },
  { id: '2025-06-16', date: '2025-06-16', displayDate: 'June 16, 2025', city: 'Minneapolis' },
  { id: '2025-05-15', date: '2025-05-15', displayDate: 'May 15, 2025', city: 'Minneapolis' },
  { id: '2025-04-17', date: '2025-04-17', displayDate: 'April 17, 2025', city: 'Minneapolis' },
  { id: '2025-03-20', date: '2025-03-20', displayDate: 'March 20, 2025', city: 'Minneapolis' },
];

/** Real past nights, newest first. Dates and venues come from the event archive. */
export const pastMeetups: PastMeetup[] = [
  ...pastEventHistory2026.map((event) => ({
    id: event.id,
    date: event.date,
    displayDate: event.displayDate,
    city: 'Minneapolis',
    venue: event.venue,
  })),
  ...olderMinneapolis,
].sort((a, b) => b.date.localeCompare(a.date));

export const pastMeetupByDisplayDate = (displayDate: string) =>
  pastMeetups.find((event) => event.displayDate === displayDate);
