import React from 'react';
import { Link } from 'react-router-dom';
import { useCountdown } from '@/hooks/useCountdown';
import { Button } from '@/components/ui/button';
import {
  MEETUP_CADENCE,
  MEETUP_START_TIME,
  MEETUP_TIME_LINE,
  MEETUP_VENUE,
  meetupSlug,
  nextMeetupDate,
  rsvpUrlFor,
} from '@/lib/meetupSchedule';

const headlineFor = (dateIso: string) =>
  new Date(`${dateIso}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

const HeroCountdown = ({ spent }: { spent?: boolean }) => {
  const date = nextMeetupDate();
  const diff = useCountdown(new Date(`${date}T${MEETUP_START_TIME}:00`));
  const cells = diff && [
    { label: 'Days', value: diff.days },
    { label: 'Hrs', value: diff.hrs },
    { label: 'Min', value: diff.min },
    { label: 'Sec', value: diff.sec },
  ];

  return (
    <div className="mx-auto w-full max-w-xl text-left">
      <p className="kicker">Minneapolis</p>
      <h1 className="display-title mt-2">{headlineFor(date)}</h1>
      <p className="mt-3 text-base text-foreground">{MEETUP_TIME_LINE}</p>
      <p className="mt-1 text-base font-medium text-foreground">{MEETUP_VENUE.name}</p>
      <p className="mt-2 text-sm text-muted-foreground">{MEETUP_CADENCE.split('.')[0]}.</p>

      <Button asChild size="lg" className="mt-6">
        <a
          href={rsvpUrlFor(date)}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={spent ? -1 : undefined}
        >
          Register
        </a>
      </Button>

      <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
        Doors at 6:00. Live demos at 6:40 PM, 15 minutes each, no slides, then questions, then hang out.
      </p>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
        For builders at any technical level. Raw projects welcome.
      </p>

      {cells ? (
        <div className="countdown-figures mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          {cells.map((cell) => (
            <span key={cell.label} className="inline-flex items-baseline gap-1.5">
              <span className="font-medium text-foreground">{String(cell.value).padStart(2, '0')}</span>
              <span>{cell.label}</span>
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-sm text-muted-foreground">Doors are open</p>
      )}

      <Link
        to={`/events/${meetupSlug(date)}`}
        tabIndex={spent ? -1 : undefined}
        className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-accent"
      >
        Event details
      </Link>
    </div>
  );
};

export default HeroCountdown;
