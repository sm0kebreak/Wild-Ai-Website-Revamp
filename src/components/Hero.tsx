import React, { useRef, useState } from 'react';
import { prefersNativeScroll, ramp, useScrollDriver } from '@/hooks/useScrollProgress';
import HeroCountdown from '@/components/HeroCountdown';

/**
 * Full-viewport opening stage. It is sticky, so the rest of the page
 * scrolls up over it while the hero sinks away underneath.
 */
const Hero = () => {
  const native = prefersNativeScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
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
        <HeroCountdown spent={spent} />
      </div>
    </section>
    </div>
  );
};

export default Hero;
