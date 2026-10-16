import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/hooks/useChapters';
import { MEETUP_VENUE, meetupSlug, meetupTitle, nextMeetupDate, rsvpUrlFor } from '@/lib/meetupSchedule';
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

/** The next Minneapolis meetup, with no city switcher. */
const CityEventPicker = () => {
  const dateIso = nextMeetupDate();
  const parts = dateParts(dateIso);
  const rsvpUrl = rsvpUrlFor(dateIso);
  const lineup = upcomingLineups[dateIso];

  return (
    <div id="next-event" className="min-w-0 max-w-full">
      <p className="kicker mb-3">Next event · Minneapolis</p>
      <article className="event-card event-card-featured">
        <div className="event-card__date" aria-hidden="true">
          <span>{parts.month}</span>
          <strong>{parts.day}</strong>
          <span>{parts.weekday}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-xl font-semibold leading-tight md:text-2xl">
            {meetupTitle(dateIso)}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatDate(dateIso)} · 6:00 PM CT
          </p>
          {lineup && (
            <div className="mt-2">
              <SpeakerRow speakers={lineup} />
            </div>
          )}
          <p className="mt-2 flex min-w-0 items-start gap-2 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span className="min-w-0">
              <span className="block font-medium text-foreground">{MEETUP_VENUE.name}</span>
              <span className="block text-muted-foreground">{MEETUP_VENUE.street}</span>
            </span>
          </p>
        </div>
        <div className="flex w-full min-w-0 max-w-full flex-col gap-2 sm:w-auto sm:items-end">
          {rsvpUrl && (
            <a href={rsvpUrl} target="_blank" rel="noopener noreferrer" className="w-full min-w-0 max-w-full sm:w-auto">
              <Button className="w-full max-w-full sm:w-auto">
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
    </div>
  );
};

export default CityEventPicker;
