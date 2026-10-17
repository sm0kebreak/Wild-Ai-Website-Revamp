import { useEffect, useState } from 'react';
import { currentDate } from '@/lib/now';

export interface Countdown {
  days: number;
  hrs: number;
  min: number;
  sec: number;
}

const diffFrom = (target: number, now = Date.now()): Countdown | null => {
  const ms = target - now;
  if (ms <= 0) return null;
  return {
    days: Math.floor(ms / 86_400_000),
    hrs: Math.floor((ms / 3_600_000) % 24),
    min: Math.floor((ms / 60_000) % 60),
    sec: Math.floor((ms / 1000) % 60),
  };
};

/** Ticks once a second until the target passes, then returns null. */
export const useCountdown = (target: Date) => {
  const time = target.getTime();
  const [diff, setDiff] = useState(() => diffFrom(time, currentDate().getTime()));

  useEffect(() => {
    setDiff(diffFrom(time));
    const id = setInterval(() => setDiff(diffFrom(time)), 1000);
    return () => clearInterval(id);
  }, [time]);

  return diff;
};
