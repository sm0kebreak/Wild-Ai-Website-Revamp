import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';
import {
  MEETUP_START_TIME,
  MEETUP_VENUE,
  meetupSlug,
  meetupTitle,
  nextMeetupDate,
} from '@/lib/meetupSchedule';
import { formatDate } from '@/hooks/useChapters';

const Cell = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center gap-1 md:gap-2">
    <span className="w-full rounded-md border border-border/70 bg-surface-deep/60 py-1.5 text-center font-mono text-lg font-medium tabular-nums text-foreground md:rounded-lg md:py-4 md:text-4xl">
      {String(value).padStart(2, '0')}
    </span>
    <span className="kicker text-[0.5625rem] md:text-[0.6875rem]">{label}</span>
  </div>
);

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
    <div className="mx-auto w-full max-w-md text-center lg:mx-0">
      <p className="eyebrow justify-center">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        Next meetup in
      </p>

      {cells ? (
        <div className="mt-2.5 grid grid-cols-4 gap-1.5 md:mt-6 md:gap-2.5">
          {cells.map((c) => (
            <Cell key={c.label} value={c.value} label={c.label} />
          ))}
        </div>
      ) : (
        <p className="mt-4 font-display text-2xl text-foreground md:mt-6">Doors are open</p>
      )}

      <Link
        to={`/events/${meetupSlug(date)}`}
        tabIndex={spent ? -1 : undefined}
        className="group mx-auto mt-2 flex w-full max-w-xs flex-col items-center rounded-xl px-3 py-1 text-center md:mt-7 md:max-w-none md:py-2"
      >
        <span className="font-display text-base font-semibold md:text-xl">{meetupTitle(date)}</span>
        <span className="mt-1 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" /> {formatDate(date)} · 6:00 PM CT
        </span>
        <span className="hero-compact-hide mt-1.5 hidden items-center justify-center gap-2 text-[0.9375rem] text-muted-foreground md:flex">
          <MapPin className="h-4 w-4" /> {MEETUP_VENUE.name}
        </span>
        <span className="mt-0.5 inline-flex min-h-11 items-center gap-2 px-3 text-[0.9375rem] font-semibold text-accent">
          Event details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </div>
  );
};

export default HeroCountdown;
