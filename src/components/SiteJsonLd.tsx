import { Helmet } from 'react-helmet-async';
import { chicagoIso } from '@/lib/chicagoTime';
import {
  MEETUP_END_TIME,
  MEETUP_START_TIME,
  MEETUP_VENUE,
  nextMeetupDate,
  rsvpUrlFor,
} from '@/lib/meetupSchedule';

const SITE = 'https://wildai.us';

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
