import { Helmet } from 'react-helmet-async';
import {
  MEETUP_END_TIME,
  MEETUP_START_TIME,
  MEETUP_VENUE,
  nextMeetupDate,
  rsvpUrlFor,
} from '@/lib/meetupSchedule';

const SITE = 'https://wildai.us';

/** Offset that keeps the clock time in America/Chicago, including daylight time. */
const chicagoIso = (dateIso: string, time: string) => {
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

const SiteJsonLd = () => {
  const date = nextMeetupDate();
  const label = new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Wild AI',
    url: SITE,
    logo: `${SITE}/favicon.png`,
    sameAs: [
      'https://www.linkedin.com/company/wild-ai-community',
      'https://www.meetup.com/wild-ai/',
      'https://luma.com/wildai',
    ],
  };
  const event = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Wild AI — ${label}`,
    startDate: chicagoIso(date, MEETUP_START_TIME),
    endDate: chicagoIso(date, MEETUP_END_TIME),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    isAccessibleForFree: true,
    location: {
      '@type': 'Place',
      name: MEETUP_VENUE.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '861 E Hennepin Ave #100',
        addressLocality: 'Minneapolis',
        addressRegion: 'MN',
        postalCode: '55414',
        addressCountry: 'US',
      },
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      url: rsvpUrlFor(date),
      availability: 'https://schema.org/InStock',
    },
    organizer: {
      '@type': 'Organization',
      name: 'Wild AI',
      url: SITE,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(organization)}</script>
      <script type="application/ld+json">{JSON.stringify(event)}</script>
    </Helmet>
  );
};

export default SiteJsonLd;
