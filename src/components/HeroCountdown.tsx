import React from 'react';
import { useCountdown } from '@/hooks/useCountdown';
import { MEETUP_START_TIME, nextMeetupDate } from '@/lib/meetupSchedule';

/** Small tabular countdown. The date itself lives in the hero headline. */
const HeroCountdown = ({ date, time }: { date?: string; time?: string }) => {
  const resolved = date ?? nextMeetupDate();
  const clock = time ?? MEETUP_START_TIME;
  const diff = useCountdown(new Date(`${resolved}T${clock}:00`));

  if (!diff) return null;

  const cells = [
    { label: 'Days', value: diff.days },
    { label: 'Hrs', value: diff.hrs },
    { label: 'Min', value: diff.min },
    { label: 'Sec', value: diff.sec },
  ];

  return (
    <div className="countdown-figures mt-4 flex flex-wrap justify-center gap-x-6 gap-y-1 text-base text-white">
      {cells.map((cell) => (
        <span key={cell.label} className="inline-flex items-baseline gap-1.5">
          <span className="text-xl font-semibold text-white md:text-2xl">{String(cell.value).padStart(2, '0')}</span>
          <span className="text-xs font-medium uppercase tracking-wide text-white">{cell.label}</span>
        </span>
      ))}
    </div>
  );
};

export default HeroCountdown;
