import React from 'react';
import CityEventPicker from '@/components/CityEventPicker';
import { heroBackdrop } from '@/data/eventPhotos';

/** Opening: a short line, then the next event for the city you pick. */
const Hero = () => {
  return (
    <section className="hero-stage" aria-label="Wild AI">
      <img
        src={heroBackdrop.src}
        srcSet={heroBackdrop.srcSet}
        sizes="100vw"
        alt=""
        width={heroBackdrop.width}
        height={heroBackdrop.height}
        decoding="async"
        fetchPriority="high"
        className="hero-photo"
      />
      <div className="hero-wash" aria-hidden="true" />

      <div className="container relative mx-auto px-4">
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-10">
          <div className="max-w-xl pt-1 lg:pt-3">
            <p className="kicker">Wild AI</p>
            <h1 className="mt-2 font-display text-[1.85rem] font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-[3.15rem]">
              The room where
              <span className="block text-gradient">AI builders</span>
              show their work.
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Short demos, then the room. Born in Minneapolis. Meeting in more cities.
            </p>
          </div>
          <CityEventPicker />
        </div>
      </div>
    </section>
  );
};

export default Hero;
