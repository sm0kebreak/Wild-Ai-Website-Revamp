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
    const root = slidesRef.current;
    if (!root) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) return;
    const images = () => Array.from(root.querySelectorAll('img'));
    const decodeAt = (index: number) => {
      const img = images()[index];
      if (img && typeof img.decode === 'function') img.decode().catch(() => undefined);
    };
    let timer = 0;
    let visible = false;
    let ready = false;
    let cancelled = false;
    const start = () => {
      if (timer || !visible || !ready) return;
      timer = window.setInterval(() => {
        setFrame((current) => (current + 1) % HERO_FRAMES.length);
      }, 6000);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    observer.observe(root);
    // Decode the frame on screen and the next one. The rest stay hidden until the fade reaches them.
    decodeAt(0);
    const next = images()[1];
    const pending = next && typeof next.decode === 'function' ? next.decode().catch(() => undefined) : Promise.resolve();
    pending.then(() => {
      if (cancelled) return;
      ready = true;
      start();
    });
    return () => {
      cancelled = true;
      ready = false;
      stop();
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const root = slidesRef.current;
    const next = root?.querySelectorAll('img')[(frame + 1) % HERO_FRAMES.length];
    if (next && typeof next.decode === 'function') next.decode().catch(() => undefined);
  }, [frame]);

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
                {...{ fetchpriority: index === 0 ? 'high' : 'low' }}
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
