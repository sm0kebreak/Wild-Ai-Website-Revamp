import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroCountdown from '@/components/HeroCountdown';
import { HERO_FRAMES, photoFrame, photoSrc, photoSrcSet } from '@/data/sitePhotos';
import { MEETUP_TIME_LINE, MEETUP_VENUE, nextMeetupDate, rsvpUrlFor } from '@/lib/meetupSchedule';

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
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;
    const id = window.setInterval(() => {
      setFrame((current) => (current + 1) % HERO_FRAMES.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="hero-stage tesla-panel" aria-label="Wild AI">
      <div className="tesla-media hero-fade">
        {HERO_FRAMES.map((stem, index) => {
          const photo = photoFrame(stem);
          return (
            <img
              key={stem}
              className="tesla-photo"
              src={photoSrc(stem)}
              srcSet={photoSrcSet(stem)}
              sizes="100vw"
              alt=""
              width={photo.width}
              height={photo.height}
              data-active={index === frame ? 'true' : 'false'}
              fetchPriority={index === 0 ? 'high' : 'low'}
              decoding="async"
            />
          );
        })}
      </div>
      <div className="tesla-copy">
        <h1 className="tesla-title">
          <span className="block">Minneapolis</span>
          <span className="block">{headlineFor(date)}</span>
        </h1>
        <p className="tesla-sub">
          {MEETUP_TIME_LINE} · {MEETUP_VENUE.name}
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
