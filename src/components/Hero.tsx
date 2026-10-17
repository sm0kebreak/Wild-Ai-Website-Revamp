import React from 'react';
import { Link } from 'react-router-dom';
import HeroCountdown from '@/components/HeroCountdown';
import { MEETUP_VENUE, nextMeetupDate, rsvpUrlFor } from '@/lib/meetupSchedule';

const headlineFor = (dateIso: string) =>
  new Date(`${dateIso}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

/** Full-bleed opening frame. The page scrolls normally underneath it. */
const Hero = () => {
  const date = nextMeetupDate();
  const rsvpUrl = rsvpUrlFor(date);

  return (
    <section className="hero-stage tesla-panel" aria-label="Wild AI" style={{ ['--photo-focus' as string]: 'center 42%' }}>
      <div className="tesla-media">
        <img
          className="tesla-photo"
          src="/event-photos/2026-09-minneapolis-01-1280.webp"
          srcSet="/event-photos/2026-09-minneapolis-01-480.webp 480w, /event-photos/2026-09-minneapolis-01-960.webp 960w, /event-photos/2026-09-minneapolis-01-1280.webp 1280w"
          sizes="100vw"
          alt=""
          width={1280}
          height={960}
          fetchPriority="high"
          decoding="async"
        />
        <div className="tesla-scrim" aria-hidden="true" />
      </div>
      <div className="tesla-copy">
        <h1 className="tesla-title">
          <span className="block">Minneapolis</span>
          <span className="block">{headlineFor(date)}</span>
        </h1>
        <p className="tesla-sub">
          Doors 6:00 PM · Demos 6:40 · {MEETUP_VENUE.name}
        </p>
        <HeroCountdown />
        <div className="tesla-actions">
          <a className="tesla-pill tesla-pill-primary" href={rsvpUrl} target="_blank" rel="noopener noreferrer">
            Register
          </a>
          <Link className="tesla-pill tesla-pill-secondary" to="/speak">
            Demo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
