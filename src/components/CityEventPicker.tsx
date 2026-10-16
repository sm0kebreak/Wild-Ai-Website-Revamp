import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EmailCapture from '@/components/EmailCapture';
import { publicChapters, type PublicChapter } from '@/data/chapters';
import { formatDate } from '@/hooks/useChapters';
import {
  MEETUP_VENUE,
  confirmedMeetupDates,
  meetupSlug,
  meetupTitle,
  rsvpUrlFor,
} from '@/lib/meetupSchedule';
import { upcomingLineups } from '@/data/speakerArchive';
import SpeakerRow from '@/components/SpeakerRow';

const dateParts = (dateIso: string) => {
  const date = new Date(`${dateIso}T00:00:00`);
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: date.getDate(),
    weekday: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
  };
};

const MeetupCard = ({ dateIso, featured }: { dateIso: string; featured?: boolean }) => {
  const parts = dateParts(dateIso);
  const rsvpUrl = rsvpUrlFor(dateIso);
  const lineup = upcomingLineups[dateIso];

  return (
    <article
      className={`event-card ${featured ? 'event-card-featured' : ''}`}
    >
      <div className="event-card__date" aria-hidden="true">
        <span>{parts.month}</span>
        <strong>{parts.day}</strong>
        <span>{parts.weekday}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-lg font-semibold leading-tight md:text-xl">
          {meetupTitle(dateIso)}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{formatDate(dateIso)}</p>
        <p className="mt-1 text-sm text-muted-foreground">6:00 PM CT</p>
        {lineup && (
          <div className="mt-3">
            <p className="kicker mb-2">Speaking</p>
            <SpeakerRow speakers={lineup} />
          </div>
        )}
        <p className="mt-3 flex items-start gap-2 text-sm">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <span>
            <span className="block font-medium text-foreground">{MEETUP_VENUE.name}</span>
            <span className="text-muted-foreground">{MEETUP_VENUE.street}</span>
          </span>
        </p>
      </div>
      <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:items-end">
        {rsvpUrl && (
          <a href={rsvpUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">
              Register
              <ArrowUpRight />
            </Button>
          </a>
        )}
        <Link
          to={`/events/${meetupSlug(dateIso)}`}
          className="text-center text-sm font-medium text-accent hover:underline sm:text-right"
        >
          Event details
        </Link>
      </div>
    </article>
  );
};

const LaterMeetup = ({ dateIso }: { dateIso: string }) => {
  const rsvpUrl = rsvpUrlFor(dateIso);
  return (
    <a
      href={rsvpUrl ?? `/events/${meetupSlug(dateIso)}`}
      target={rsvpUrl ? '_blank' : undefined}
      rel={rsvpUrl ? 'noopener noreferrer' : undefined}
      className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent/40"
    >
      <span className="min-w-0">
        <span className="block font-medium">{formatDate(dateIso)}</span>
        <span className="mt-0.5 block truncate text-sm text-muted-foreground">
          6:00 PM CT · {MEETUP_VENUE.name}
        </span>
      </span>
      <span className="shrink-0 text-sm font-semibold text-accent">Register</span>
    </a>
  );
};

const ComingSoon = ({ chapter }: { chapter: PublicChapter }) => (
  <div className="event-card event-card-featured items-stretch">
    <div className="min-w-0 flex-1">
      <p className="kicker text-accent">Next event</p>
      <h3 className="mt-2 font-display text-2xl font-semibold">Coming soon</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {chapter.city} does not have a date on the calendar yet. Get notified when it does.
      </p>
    </div>
    <div className="w-full sm:max-w-sm">
      <EmailCapture
        source="notify"
        cityRequested={chapter.slug}
        title="Get notified"
        description={`One email when ${chapter.city} sets a date.`}
        compact
      />
    </div>
  </div>
);

/** City selector. The card always matches the city that is selected. */
const CityEventPicker = () => {
  const [slug, setSlug] = useState('minneapolis');
  const chapter = publicChapters.find((item) => item.slug === slug) ?? publicChapters[0];
  const dates = chapter.slug === 'minneapolis' ? confirmedMeetupDates() : [];
  const [next, ...later] = dates;

  return (
    <div id="next-event">
      <div className="city-pills" role="tablist" aria-label="Choose a city">
        {publicChapters.map((item) => {
          const selected = item.slug === chapter.slug;
          return (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setSlug(item.slug)}
              className="city-pill"
              data-selected={selected}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4" role="tabpanel">
        {next ? <MeetupCard dateIso={next} featured /> : <ComingSoon chapter={chapter} />}
        {later.length > 0 && (
          <ul className="mt-3 space-y-2">
            {later.map((dateIso) => (
              <li key={dateIso}>
                <LaterMeetup dateIso={dateIso} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CityEventPicker;
