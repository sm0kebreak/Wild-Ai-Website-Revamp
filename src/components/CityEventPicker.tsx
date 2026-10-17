import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '@/hooks/useChapters';
import {
  MEETUP_TIME_LINE,
  MEETUP_VENUE,
  meetupSlug,
  meetupTitle,
  nextMeetupDate,
  rsvpUrlFor,
} from '@/lib/meetupSchedule';
import { upcomingLineups } from '@/data/speakerArchive';
import SpeakerRow from '@/components/SpeakerRow';

/** The next Minneapolis meetup, on the homepage photograph. */
const CityEventPicker = () => {
  const dateIso = nextMeetupDate();
  const rsvpUrl = rsvpUrlFor(dateIso);
  const lineup = upcomingLineups[dateIso];

  return (
    <div id="next-event" className="mx-auto w-full max-w-3xl text-left">
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-white/70">Next event · Minneapolis</p>
      <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">{meetupTitle(dateIso)}</h2>
      <p className="mt-3 text-base text-white/85 md:text-lg">
        {formatDate(dateIso)} · {MEETUP_TIME_LINE}
      </p>
      {lineup && (
        <div className="mt-6">
          <SpeakerRow speakers={lineup} detailed />
        </div>
      )}
      <p className="mt-6 text-sm">
        <span className="block font-medium">{MEETUP_VENUE.name}</span>
        <span className="block text-white/70">{MEETUP_VENUE.street}</span>
        <span className="block text-white/70">{MEETUP_VENUE.cityState}</span>
      </p>
      <div className="tesla-actions tesla-actions-start">
        {rsvpUrl && (
          <a className="tesla-pill tesla-pill-primary" href={rsvpUrl} target="_blank" rel="noopener noreferrer">
            Register
          </a>
        )}
        <Link className="tesla-pill tesla-pill-secondary" to={`/events/${meetupSlug(dateIso)}`}>
          Event details
        </Link>
      </div>
    </div>
  );
};

export default CityEventPicker;
