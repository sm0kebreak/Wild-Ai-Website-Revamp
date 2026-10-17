import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { prefersNativeScroll, ramp, useScrollDriver } from '@/hooks/useScrollProgress';
import HeroCountdown from '@/components/HeroCountdown';
import { nextMeetupDate, rsvpUrlFor } from '@/lib/meetupSchedule';

/**
 * Full-viewport opening stage. It is sticky, so the rest of the page
 * scrolls up over it while the hero sinks away underneath.
 */
const Hero = () => {
  const rsvpUrl = rsvpUrlFor(nextMeetupDate());
  const native = prefersNativeScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const [spent, setSpent] = useState(false);

  /* Holds still for a beat, then sinks and dissolves. Touch scrolling skips this. */
  useScrollDriver((progress) => {
    const exit = native ? 0 : ramp(progress, 0.04, 0.84);
    const nextSpent = !native && progress >= 1;
    setSpent((prev) => (prev === nextSpent ? prev : nextSpent));

    const wash = washRef.current;
    if (wash) {
      wash.style.transform = 'translate3d(0, ' + exit * 8 + 'vh, 0)';
      wash.style.opacity = String(1 - exit * 0.6);
    }
    const copy = copyRef.current;
    if (copy) {
      copy.style.opacity = String(1 - exit);
      copy.style.transform = native
        ? ''
        : 'translate3d(0, ' + exit * 20 + 'vh, 0) scale(' + (1 - exit * 0.07) + ')';
      copy.style.visibility = nextSpent ? 'hidden' : '';
      copy.style.willChange = native || nextSpent ? '' : 'transform, opacity';
    }
    const cue = cueRef.current;
    if (cue) {
      cue.style.opacity = String(1 - ramp(progress, 0, 0.16));
      cue.style.visibility = nextSpent ? 'hidden' : '';
    }
    const section = sectionRef.current;
    if (section) {
      if (nextSpent) section.dataset.spent = 'true';
      else delete section.dataset.spent;
    }
  });

  return (
    <div className="hero-pin">
    <section ref={sectionRef} className="hero-stage" aria-label="Wild AI" aria-hidden={spent}>
      <div ref={washRef} className="hero-wash" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      <div ref={copyRef} className="container relative mx-auto px-4">
        <div className="grid min-w-0 items-center gap-4 md:gap-8 lg:gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <div className="line-mask">
              <p className="rise kicker" style={{ ['--rise-delay' as string]: '120ms' }}>
                Wild AI - Minneapolis
              </p>
            </div>

            <h1 className="display-title mt-3 md:mt-7">
              <span className="line-mask">
                <span className="rise" style={{ ['--rise-delay' as string]: '260ms' }}>
                  The room where
                </span>
              </span>
              <span className="line-mask">
                <span className="rise text-gradient" style={{ ['--rise-delay' as string]: '380ms' }}>
                  AI builders
                </span>
              </span>
              <span className="line-mask">
                <span className="rise" style={{ ['--rise-delay' as string]: '500ms' }}>
                  show their work.
                </span>
              </span>
            </h1>

            <div
              className="rise hero-rule mt-9 hidden max-w-sm md:block"
              style={{ ['--rise-delay' as string]: '640ms' }}
            />

            <p
              className="rise mt-7 hidden max-w-xl text-base leading-relaxed text-muted-foreground md:block md:text-lg"
              style={{ ['--rise-delay' as string]: '720ms' }}
            >
              15-minute demos. No slides. All ages, and free. Doors at 6:00, demos at 6:40,
              networking until 9.
            </p>

            <div
              className="rise mt-4 flex w-full min-w-0 flex-col items-stretch gap-1 sm:mt-6 sm:w-auto sm:flex-row sm:items-center sm:gap-3 md:mt-9"
              style={{ ['--rise-delay' as string]: '820ms' }}
            >
              <Button asChild size="lg" className="group w-full min-w-0 px-3 sm:w-auto sm:px-7">
                <a
                  href={rsvpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={spent ? -1 : undefined}
                >
                  Register now
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-11 w-full font-medium text-muted-foreground hover:bg-transparent hover:text-foreground md:h-12 md:w-auto md:border md:border-border md:px-7 md:text-foreground md:hover:border-accent/55 md:hover:bg-secondary"
              >
                <Link to="/events" tabIndex={spent ? -1 : undefined}>
                  Explore events
                </Link>
              </Button>
            </div>
          </div>

          <div className="rise" style={{ ['--rise-delay' as string]: '900ms' }}>
            <HeroCountdown spent={spent} />
          </div>
        </div>
      </div>

      <div
        ref={cueRef}
        className="absolute inset-x-0 bottom-8 hidden justify-center md:flex"
        aria-hidden="true"
      >
        <span
          className="rise flex items-center gap-2 kicker"
          style={{ ['--rise-delay' as string]: '1100ms' }}
        >
          Scroll
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </span>
      </div>
    </section>
    </div>
  );
};

export default Hero;
