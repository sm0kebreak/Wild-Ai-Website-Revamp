import React, { useRef } from 'react';
import { prefersNativeScroll, ramp, useScrollDriver } from '@/hooks/useScrollProgress';

/**
 * Wraps the page body so it lags behind the scroll at first, then catches up.
 * Paired with the hero sinking away, the content reads as rising out of it.
 * Touch scrolling leaves the panel in place so the page scrolls natively.
 */
const HeroHandoff = ({ children }: { children: React.ReactNode }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);

  useScrollDriver((progress) => {
    const native = prefersNativeScroll();
    const settled = native || progress >= 1;
    /* 1 = still tucked behind the hero, 0 = fully in place. */
    const lag = 1 - ramp(progress, 0.02, 0.86);
    /* Opacity resolves well before the travel does, so the content is solid by
       the time it owns the viewport and only cross-dissolves at the handoff. */
    const solid = ramp(progress, 0.06, 0.5);
    const panel = panelRef.current;
    if (panel) {
      if (settled) {
        panel.style.transform = '';
        panel.style.opacity = '';
      } else {
        panel.style.transform =
          'none';
        panel.style.opacity = String(0.3 + 0.7 * solid);
      }
    }
    const edge = edgeRef.current;
    if (edge) {
      edge.style.background =
        'linear-gradient(to right, transparent, hsl(172 18% 76% / ' +
        (0.5 * (settled ? 0 : lag)).toFixed(3) +
        '), transparent)';
    }
  });

  return (
    <div ref={panelRef} className="hero-handoff relative z-10">
      {/* Lit edge so the panel reads as a distinct plane leaving the hero. */}
      <div
        ref={edgeRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
      />
      {children}
    </div>
  );
};

export default HeroHandoff;
