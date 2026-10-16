import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { publicChapters, type PublicChapter } from '@/data/chapters';
import {
  MEETUP_CADENCE,
  MEETUP_VENUE,
  meetupTitle,
  rsvpUrlFor,
  scheduledMeetups,
  withConfirmedMeetup,
} from '@/lib/meetupSchedule';
import { pastEvents } from '@/data/speakerArchive';

/* Site copy avoids em dashes; stored text still has some. */
const noEmDash = <T,>(value: T): T =>
  value == null ? value : JSON.parse(JSON.stringify(value).replace(/\s*\u2014\s*/g, ' - '));

export interface Chapter {
  id: string;
  slug: string;
  city: string;
  region: string | null;
  status: 'active' | 'launching';
  tagline: string | null;
  about_text: string | null;
  cadence: string | null;
  venue_name: string | null;
  venue_address: string | null;
  venue_notes: string | null;
  member_count: number | null;
  sort_order: number | null;
}

export interface ChapterOrganizer {
  id: string;
  chapter_id: string;
  name: string;
  role: string | null;
  photo_url: string | null;
  bio: string | null;
  contact_email: string | null;
  sort_order: number | null;
}

export interface ChapterEvent {
  id: string;
  chapter_id: string;
  slug: string;
  title: string;
  event_date: string;
  start_time: string | null;
  end_time: string | null;
  venue_name: string | null;
  venue_address: string | null;
  description: string | null;
  agenda: { time: string; label: string }[];
  speakers: { name: string; company?: string; topic?: string; photo_url?: string }[];
  recap_url: string | null;
  meetup_url: string | null;
  attendee_count: number | null;
  chapter?: Chapter;
}

const HOME_CHAPTER = 'minneapolis';

const toPublicChapter = (chapter: PublicChapter, index: number): Chapter => ({
  id: chapter.slug,
  slug: chapter.slug,
  city: chapter.city,
  region: chapter.region,
  status: chapter.status,
  tagline: chapter.tagline,
  about_text: chapter.about,
  cadence: chapter.slug === HOME_CHAPTER ? MEETUP_CADENCE : null,
  venue_name: chapter.slug === HOME_CHAPTER ? MEETUP_VENUE.name : null,
  venue_address: chapter.slug === HOME_CHAPTER ? MEETUP_VENUE.address : null,
  venue_notes: null,
  member_count: null,
  sort_order: index,
});

/** The five public chapters, used when the database is missing a city. */
const PUBLIC_CHAPTER_RECORDS: Chapter[] = publicChapters.map(toPublicChapter);

/** Hide empty counts so the site never renders "0+ members". */
export const formatMemberCount = (count?: number | null) =>
  typeof count === 'number' && count > 0 ? `${count.toLocaleString()}+ members` : null;

/** Used when the chapter row cannot be loaded, so the public calendar still has a next meetup. */
const FALLBACK_HOME_CHAPTER: Chapter =
  PUBLIC_CHAPTER_RECORDS.find((chapter) => chapter.slug === HOME_CHAPTER) ?? PUBLIC_CHAPTER_RECORDS[0];

const mergePublicChapters = (remote: Chapter[]): Chapter[] =>
  PUBLIC_CHAPTER_RECORDS.map((base) => {
    const match = remote.find((chapter) => chapter.slug === base.slug);
    if (!match) return base;
    const memberCount = formatMemberCount(match.member_count) ? match.member_count : null;
    if (base.slug === HOME_CHAPTER) {
      return withMeetupVenue({
        ...base,
        id: match.id,
        about_text: match.about_text || base.about_text,
        member_count: memberCount,
      });
    }
    return {
      ...base,
      id: match.id,
      about_text: match.about_text || base.about_text,
      member_count: memberCount,
    };
  });

const homeChapter = (chapter: Chapter | null | undefined): Chapter =>
  chapter ? withMeetupVenue(chapter) : withMeetupVenue(FALLBACK_HOME_CHAPTER);

/** The recurring venue lives in code, so every surface agrees on it. */
const withMeetupVenue = (chapter: Chapter): Chapter =>
  chapter.slug === HOME_CHAPTER
    ? {
        ...chapter,
        cadence: MEETUP_CADENCE,
        venue_name: MEETUP_VENUE.name,
        venue_address: MEETUP_VENUE.address,
      }
    : chapter;

const CITY_SLUG: Record<string, string> = {
  Minneapolis: 'minneapolis',
  'San Francisco': 'san-francisco',
  Rochester: 'rochester',
};

const archiveChapter = (city: string): Chapter => {
  const slug = CITY_SLUG[city] ?? city.toLowerCase().replace(/\s+/g, '-');
  const known = PUBLIC_CHAPTER_RECORDS.find((chapter) => chapter.slug === slug);
  if (known) return known;
  return {
    id: slug,
    slug,
    city,
    region: null,
    status: 'active',
    tagline: null,
    about_text: null,
    cadence: null,
    venue_name: null,
    venue_address: null,
    venue_notes: null,
    member_count: null,
    sort_order: 99,
  };
};

/** The 21 archived nights, including speakers, independent of the database. */
export const archiveChapterEvents = (): ChapterEvent[] =>
  pastEvents.map((event) => {
    const chapter = archiveChapter(event.city);
    return {
      id: `archive-${event.date}`,
      chapter_id: chapter.id,
      slug: `archive-${event.date}`,
      title: meetupTitle(event.date),
      event_date: event.date,
      start_time: null,
      end_time: null,
      venue_name: event.venue ?? null,
      venue_address: null,
      description: event.venue
        ? `Wild AI in ${event.city} at ${event.venue}.`
        : `Wild AI in ${event.city}.`,
      agenda: [],
      speakers: event.speakers.map((speaker) => ({
        name: speaker.name,
        company: speaker.role,
        photo_url: speaker.photo,
      })),
      recap_url: event.youtubeEmbedId
        ? `https://www.youtube.com/watch?v=${event.youtubeEmbedId}`
        : null,
      meetup_url: null,
      attendee_count: null,
      chapter,
    };
  });

/** Archive nights win on a shared date so the Past filter lists the real lineup. */
const withArchive = (events: ChapterEvent[]): ChapterEvent[] => {
  const archived = archiveChapterEvents();
  const dates = new Set(archived.map((event) => event.event_date));
  return [...events.filter((event) => !dates.has(event.event_date)), ...archived];
};

/** Fills months that have no stored event with the standing third-Monday meetup. */
const withScheduledMeetups = (events: ChapterEvent[], chapter: Chapter): ChapterEvent[] => {
  const named = events.map((e) =>
    isUpcoming(e.event_date)
      ? { ...withConfirmedMeetup(e), meetup_url: rsvpUrlFor(e.event_date) }
      : e,
  );
  const filled = new Set(named.map((e) => e.event_date.slice(0, 7)));
  const generated = scheduledMeetups(chapter).filter(
    (m) => !filled.has(m.event_date.slice(0, 7))
  );
  return [...generated, ...named];
};

export const useChapters = () =>
  useQuery({
    queryKey: ['chapters'],
    queryFn: async (): Promise<Chapter[]> => {
      try {
        const { data, error } = await supabase
          .from('chapters')
          .select('*')
          .order('sort_order');
        if (error) throw error;
        const chapters = (noEmDash(data) as Chapter[]).map(withMeetupVenue);
        return mergePublicChapters(chapters);
      } catch {
        return PUBLIC_CHAPTER_RECORDS;
      }
    },
  });

export const useChapter = (slug: string | undefined) =>
  useQuery({
    queryKey: ['chapter', slug],
    enabled: !!slug,
    queryFn: async (): Promise<Chapter | null> => {
      try {
        const { data, error } = await supabase
          .from('chapters')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
        if (error) throw error;
        const base = PUBLIC_CHAPTER_RECORDS.find((chapter) => chapter.slug === slug);
        if (data) {
          const merged = mergePublicChapters([withMeetupVenue(noEmDash(data) as Chapter)]);
          return merged.find((chapter) => chapter.slug === slug) ?? base ?? null;
        }
        return base ?? null;
      } catch (error) {
        const base = PUBLIC_CHAPTER_RECORDS.find((chapter) => chapter.slug === slug);
        if (base) return base;
        throw error;
      }
    },
  });

export const useChapterOrganizers = (chapterId: string | undefined) =>
  useQuery({
    queryKey: ['chapter-organizers', chapterId],
    enabled: !!chapterId,
    queryFn: async (): Promise<ChapterOrganizer[]> => {
      const { data, error } = await supabase
        .from('chapter_organizers')
        .select('*')
        .eq('chapter_id', chapterId!)
        .order('sort_order');
      if (error) throw error;
      return noEmDash(data) as ChapterOrganizer[];
    },
  });

export const useChapterEvents = (chapter: Chapter | null | undefined) =>
  useQuery({
    queryKey: ['chapter-events', chapter?.id],
    enabled: !!chapter,
    queryFn: async (): Promise<ChapterEvent[]> => {
      try {
        const { data, error } = await supabase
          .from('chapter_events')
          .select('*')
          .eq('chapter_id', chapter!.id)
          .order('event_date', { ascending: false });
        if (error) throw error;
        const events = noEmDash(data) as unknown as ChapterEvent[];
        return chapter!.slug === HOME_CHAPTER ? withScheduledMeetups(events, chapter!) : events;
      } catch (error) {
        if (chapter!.slug === HOME_CHAPTER) return scheduledMeetups(chapter!);
        throw error;
      }
    },
  });

// All events across chapters with their chapter info
export const useAllEvents = () =>
  useQuery({
    queryKey: ['all-chapter-events'],
    queryFn: async (): Promise<ChapterEvent[]> => {
      try {
        const [eventsResult, chaptersResult] = await Promise.all([
          supabase
            .from('chapter_events')
            .select('*, chapter:chapters(*)')
            .order('event_date', { ascending: false }),
          supabase.from('chapters').select('*').eq('slug', HOME_CHAPTER).maybeSingle(),
        ]);
        if (eventsResult.error) throw eventsResult.error;

        const events = noEmDash(eventsResult.data) as unknown as ChapterEvent[];
        const home = noEmDash(chaptersResult.data) as Chapter | null;
        return withArchive(withScheduledMeetups(events, homeChapter(home)));
      } catch {
        return withArchive(scheduledMeetups(homeChapter(null)));
      }
    },
  });

export const isUpcoming = (dateIso: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateIso + 'T00:00:00') >= today;
};

export const formatDate = (dateIso: string) =>
  new Date(dateIso + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

export const formatTime = (t?: string | null) => {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hh = ((h + 11) % 12) + 1;
  return `${hh}:${String(m).padStart(2, '0')} ${ampm}`;
};
