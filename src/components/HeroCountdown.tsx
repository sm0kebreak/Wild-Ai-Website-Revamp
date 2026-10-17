import React from 'react';
import { useCountdown } from '@/hooks/useCountdown';
import { MEETUP_START_TIME, nextMeetupDate } from '@/lib/meetupSchedule';

/** Small tabular countdown. The date itself lives in the hero headline. */
const HeroCountdown = () => {
  const date = nextMeetupDate();
  const diff = useCountdown(new Date(`${date}T${MEETUP_START_TIME}:00`));

  if (!diff) return null;

  const cells = [
    { label: 'Days', value: diff.days },
    { label: 'Hrs', value: diff.hrs },
    { label: 'Min', value: diff.min },
    { label: 'Sec', value: diff.sec },
  ];

  return (
    <div className="countdown-figures mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-white/75">
      {cells.map((cell) => (
        <span key={cell.label} className="inline-flex items-baseline gap-1.5">
          <span className="text-base font-medium text-white">{String(cell.value).padStart(2, '0')}</span>
          <span className="text-[0.6875rem] uppercase tracking-wide">{cell.label}</span>
        </span>
      ))}
    </div>
  );
};

export default HeroCountdown;
