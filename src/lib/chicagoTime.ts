/** Calendar day in Minneapolis. */
export const chicagoYmdFrom = (from: Date) =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(from);

/** Offset that keeps the clock time in America/Chicago, including daylight time. */
export const chicagoIso = (dateIso: string, time: string) => {
  const [year, month, day] = dateIso.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  for (const offset of ['-05:00', '-06:00']) {
    const utc = new Date(`${dateIso}T${time}:00${offset}`);
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(utc);
    const read = (type: string) => Number(parts.find((part) => part.type === type)?.value);
    if (
      read('year') === year &&
      read('month') === month &&
      read('day') === day &&
      read('hour') === hour &&
      read('minute') === minute
    ) {
      return `${dateIso}T${time}:00${offset}`;
    }
  }
  return `${dateIso}T${time}:00-05:00`;
};
