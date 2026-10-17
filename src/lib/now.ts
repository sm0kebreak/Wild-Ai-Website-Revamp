const clock = globalThis as typeof globalThis & {
  __WILD_NOW__?: number;
  __WILD_PATH__?: string;
};

/** Build time while a prerendered page is hydrating, then the live clock. */
export const currentDate = () =>
  typeof clock.__WILD_NOW__ === 'number' ? new Date(clock.__WILD_NOW__) : new Date();

/** Calendar day in Minneapolis, so the build machine and the browser agree. */
export const chicagoYmd = (from = currentDate()) =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(from);

export const prerenderPath = () => clock.__WILD_PATH__;
