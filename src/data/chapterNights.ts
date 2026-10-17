import { chicagoYmd, currentDate } from '@/lib/now';

/** A night that is on the calendar. Add one and the chapter page renders it. */
export type ChapterNight = {
  date: string;
  venueName: string;
  venueAddress: string;
  lumaUrl: string;
  startTime: string;
  endTime: string;
  /** IANA zone for the countdown clock and Event JSON-LD. */
  timeZone: string;
};

/**
 * Announced nights outside the Minneapolis calendar.
 * San Francisco has no date yet. Drop the next night in here and the page,
 * the countdown, and the Event JSON-LD pick it up.
 */
export const CHAPTER_NIGHTS: Record<string, ChapterNight[]> = {
  'san-francisco': [],
};

/** Soonest announced night for a chapter, or null when the date is not set. */
export const nextChapterNight = (slug: string, from = currentDate()): ChapterNight | null => {
  const today = chicagoYmd(from);
  return (
    (CHAPTER_NIGHTS[slug] ?? [])
      .filter((night) => night.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date))[0] ?? null
  );
};

/** Clock time in `timeZone`, including daylight time, as an ISO offset. */
export const zonedIso = (dateIso: string, time: string, timeZone: string) => {
  const [year, month, day] = dateIso.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  for (let offsetHours = -12; offsetHours <= 14; offsetHours += 1) {
    const sign = offsetHours >= 0 ? '+' : '-';
    const offset = `${sign}${String(Math.abs(offsetHours)).padStart(2, '0')}:00`;
    const utc = new Date(`${dateIso}T${time}:00${offset}`);
    if (Number.isNaN(utc.getTime())) continue;
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(utc);
    const read = (type: string) => Number(parts.find((part) => part.type === type)?.value);
    if (
      read('year') === year &&
      read('month') === month &&
      read('day') === day &&
      read('hour') === hour &&
      read('minute') === minute
    ) {
      return `${dateIso}T${time}:00${offset}`;
    }
  }
  return `${dateIso}T${time}:00Z`;
};
