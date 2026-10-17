import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';
import {
  MEETUP_START_TIME,
  MEETUP_TIME_LINE,
  MEETUP_VENUE,
  meetupSlug,
  nextMeetupDate,
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
    <div className="mx-auto w-full max-w-md text-center lg:mx-0 lg:text-left">
      <p className="kicker">Next meetup</p>
      <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
        {headlineFor(date)}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{MEETUP_TIME_LINE}</p>
      <p className="mt-1 text-sm font-medium text-foreground md:text-base">{MEETUP_VENUE.name}</p>

      {cells ? (
        <div className="countdown-figures mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1 text-muted-foreground lg:justify-start">
          {cells.map((cell) => (
            <span key={cell.label} className="inline-flex items-baseline gap-1.5">
              <span className="text-lg font-medium text-foreground md:text-xl">
                {String(cell.value).padStart(2, '0')}
              </span>
              <span className="text-[0.6875rem] uppercase tracking-wide">{cell.label}</span>
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-sm text-muted-foreground">Doors are open</p>
      )}

      <Link
        to={`/events/${meetupSlug(date)}`}
        tabIndex={spent ? -1 : undefined}
        className="group mt-3 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold text-accent"
      >
        Event details
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default HeroCountdown;
