import React, { useEffect, useRef, useState } from 'react';
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
  const slidesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) return;
    let cancelled = false;
    let id = 0;
    const images = Array.from(slidesRef.current?.querySelectorAll('img') ?? []);
    const decoded = Promise.all(
      images.map((img) => (typeof img.decode === 'function' ? img.decode() : Promise.resolve()).catch(() => undefined)),
    );
    decoded.then(() => {
      if (cancelled) return;
      id = window.setInterval(() => {
        setFrame((current) => (current + 1) % HERO_FRAMES.length);
      }, 6000);
    });
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return (
    <section className="hero-stage tesla-panel" aria-label="Wild AI">
      <div className="hero-fade-frame">
        <div className="tesla-media hero-fade" ref={slidesRef}>
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
        <div className="hero-fade-veil" aria-hidden="true" />
      </div>
      <div className="tesla-copy">
        <h1 className="tesla-title">
          <span className="sr-only">Wild AI</span>
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
