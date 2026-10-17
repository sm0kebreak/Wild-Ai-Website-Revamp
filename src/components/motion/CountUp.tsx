import React from 'react';

interface CountUpProps {
  /** Display string, shown as written. */
  value: string;
  duration?: number;
  className?: string;
}

/** Shows the label. It does not wait for scroll or count up. */
const CountUp = ({ value, duration: _duration, className }: CountUpProps) => (
  <span className={className}>{value}</span>
);

export default CountUp;
