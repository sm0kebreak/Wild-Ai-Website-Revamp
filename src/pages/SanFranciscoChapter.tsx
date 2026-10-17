import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import HeroCountdown from '@/components/HeroCountdown';
import TeslaPanel from '@/components/TeslaPanel';
import EmailCapture from '@/components/EmailCapture';
import PastEventsStrip from '@/components/PastEventsStrip';
import EventPhotoGallery from '@/components/EventPhotoGallery';
import SpeakerRow from '@/components/SpeakerRow';
import { photoFrame, photoSrc, photoSrcSet } from '@/data/sitePhotos';
import { pastEvents } from '@/data/speakerArchive';
import { nextChapterNight, zonedIso } from '@/data/chapterNights';
import { currentDate } from '@/lib/now';

const SITE = 'https://wildai.us';
const TITLE = 'Wild AI San Francisco | Show us something wild';
const HERO = '2026-08-sf-01';
const PAST_DATE = '2026-08-05';

const headlineFor = (dateIso: string) =>
  new Date(`${dateIso}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

const descriptionFor = (dateIso: string | null, venue: string | null) =>
  dateIso
    ? `Wild AI San Francisco meets ${headlineFor(dateIso)}${venue ? ` at ${venue}` : ''}. Builders demo raw AI projects at any stage. Live demos, no slides.`
    : 'Wild AI San Francisco is where builders demo raw AI projects at any stage. Live demos, no slides, and questions from the room. The next date is coming soon.';

/** Tesla chapter page. A date in CHAPTER_NIGHTS turns on the countdown and Event JSON-LD. */
const SanFranciscoChapter = () => {
  const night = nextChapterNight('san-francisco', currentDate());
  const past = pastEvents.filter((event) => event.city === 'San Francisco');
  const first = past.find((event) => event.date === PAST_DATE) ?? past[0];
  const frame = photoFrame(HERO);
  const description = descriptionFor(night?.date ?? null, night?.venueName ?? null);

  const pastEvent = first
    ? {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: 'Wild AI SF #1',
        startDate: first.date,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: first.venue,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'San Francisco',
            addressRegion: 'CA',
            addressCountry: 'US',
          },
        },
        performer: first.speakers.map((speaker) => ({
          '@type': 'Person',
          name: speaker.name,
        })),
        organizer: {
          '@type': 'Organization',
          name: 'Wild AI',
          url: SITE,
        },
      }
    : null;

  const nextEvent = night
    ? {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: `Wild AI San Francisco — ${headlineFor(night.date)}`,
        startDate: zonedIso(night.date, night.startTime, night.timeZone),
        endDate: zonedIso(night.date, night.endTime, night.timeZone),
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        isAccessibleForFree: true,
        location: {
          '@type': 'Place',
          name: night.venueName,
          address: night.venueAddress,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          url: night.lumaUrl,
          availability: 'https://schema.org/InStock',
        },
        organizer: {
          '@type': 'Organization',
          name: 'Wild AI',
          url: SITE,
        },
      }
    : null;

  return (
    <div className="tesla-home flex min-h-screen flex-col">
      <Seo title={TITLE} description={description} path="/san-francisco" />
      <Helmet>
        {pastEvent ? <script type="application/ld+json">{JSON.stringify(pastEvent)}</script> : null}
        {nextEvent ? <script type="application/ld+json">{JSON.stringify(nextEvent)}</script> : null}
      </Helmet>
      <Navbar />
      <main className="min-w-0">
        <section className="hero-stage tesla-panel" aria-label="Wild AI San Francisco">
          <div className="hero-fade-frame" data-fit="contain">
            <div className="hero-fade">
              <img
                className="tesla-photo"
                src={photoSrc(HERO)}
                srcSet={photoSrcSet(HERO)}
                sizes="100vw"
                alt=""
                width={frame.width}
                height={frame.height}
                data-active="true"
                {...{ fetchpriority: 'high' }}
                decoding="async"
              />
            </div>
            <div className="hero-fade-veil" aria-hidden="true" />
          </div>
          <div className="tesla-copy">
            <h1 className="tesla-title">
              <span className="sr-only">Wild AI</span>
              <span className="block">San Francisco</span>
              {night ? <span className="block">{headlineFor(night.date)}</span> : null}
            </h1>
            <p className="tesla-sub">{night ? night.venueName : 'Next event: date coming soon'}</p>
            {night ? <HeroCountdown date={night.date} time={night.startTime} /> : null}
            <div className="tesla-actions">
              {night ? (
                <a className="tesla-pill tesla-pill-primary" href={night.lumaUrl} target="_blank" rel="noopener noreferrer">
                  Register
                </a>
              ) : (
                <a className="tesla-pill tesla-pill-primary" href="#chapter-signup">
                  Get notified
                </a>
              )}
              <Link className="tesla-pill tesla-pill-secondary" to="/speak">
                Demo
              </Link>
            </div>
          </div>
        </section>

        <TeslaPanel id="chapter-signup" flow sentence title="Join the email list">
          {night ? (
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/85">
              {night.venueName}
              {night.venueAddress ? ` · ${night.venueAddress}` : ''}
            </p>
          ) : null}
          <div className="mx-auto mt-8 max-w-md text-left">
            <EmailCapture source="chapter" chapterId="san-francisco" bare title="Join the email list" description="" />
          </div>
          <p className="mt-6 text-center">
            <Link className="text-sm font-semibold text-white underline" to="/speak">
              Want to demo in SF?
            </Link>
          </p>
        </TeslaPanel>

        <TeslaPanel flow wide>
          <PastEventsStrip city="San Francisco" stacks cinema />
        </TeslaPanel>

        {past.map((event) => (
          <TeslaPanel key={event.id} flow sentence title="Speakers" subline={`${event.displayDate}${event.venue ? ` at ${event.venue}` : ''}`}>
            <div className="mx-auto mt-6 max-w-xl text-left">
              <SpeakerRow speakers={event.speakers} detailed />
              {event.recap ? <p className="mt-5 text-sm leading-relaxed text-white/85">{event.recap}</p> : null}
            </div>
          </TeslaPanel>
        ))}

        <TeslaPanel flow wide>
          <EventPhotoGallery cinema groupId="2026-08-05-san-francisco" />
          <p className="mt-4 text-center text-sm text-white/85">
            Photos by{' '}
            <a className="font-semibold underline" href="https://www.linkedin.com/in/maanas-taneja" target="_blank" rel="noopener noreferrer">
              Maanas Taneja
            </a>
          </p>
        </TeslaPanel>
      </main>
      <Footer />
    </div>
  );
};

export default SanFranciscoChapter;
