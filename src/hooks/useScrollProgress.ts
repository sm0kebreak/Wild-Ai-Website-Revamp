import { useEffect, useRef, useState } from 'react';

/** Touch and reduced-motion sessions keep the browser's own scroll. */
export const nativeScrollQuery = '(pointer: coarse), (prefers-reduced-motion: reduce)';

export const prefersNativeScroll = () =>
  typeof window !== 'undefined' && window.matchMedia(nativeScrollQuery).matches;

/**
 * Returns how far the page has scrolled through `spanRatio` viewport heights,
 * clamped to 0..1.
 *
 * The value is damped toward the real scroll position rather than tracking it
 * exactly, so wheel clicks - which arrive as coarse jumps - still read as one
 * continuous glide. `smoothing` is the fraction of the remaining distance
 * closed each frame; lower is slower and looser.
 *
 * On a coarse pointer, or when the user prefers reduced motion, this stays at
 * 0 and does not listen. Those sessions scroll natively.
 */
export const useScrollProgress = (spanRatio = 1, smoothing = 0.12) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersNativeScroll()) {
      document.documentElement.dataset.nativeScroll = 'true';
      return;
    }

    let frame = 0;
    let current = 0;
    let target = 0;

    const readTarget = () => {
      const span = window.innerHeight * spanRatio;
      target = span > 0 ? Math.min(window.scrollY / span, 1) : 0;
    };

    const tick = () => {
      current += (target - current) * smoothing;
      if (Math.abs(target - current) < 0.0004) current = target;
      setProgress(current);
      frame = current === target ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      readTarget();
      if (!frame && current !== target) frame = requestAnimationFrame(tick);
    };

    // Land on the true value immediately on mount - no opening slide.
    readTarget();
    current = target;
    setProgress(target);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [spanRatio, smoothing]);

  return progress;
};

/**
 * Drives a scroll-linked effect without React state. Callers write transforms
 * on refs. A per-frame setState here re-rendered the whole homepage, including
 * the photo grid, for as long as the damped value was still catching up.
 */
export const useScrollDriver = (onFrame: (progress: number) => void) => {
  const onFrameRef = useRef(onFrame);
  onFrameRef.current = onFrame;

  useEffect(() => {
    if (prefersNativeScroll()) {
      document.documentElement.dataset.nativeScroll = 'true';
      onFrameRef.current(0);
      return;
    }

    let frame = 0;
    let current = 0;
    let target = 0;

    const readTarget = () => {
      const span = window.innerHeight * 1.25;
      target = span > 0 ? Math.min(window.scrollY / span, 1) : 0;
    };

    const tick = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0004) current = target;
      onFrameRef.current(current);
      frame = current === target ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      readTarget();
      if (!frame && current !== target) frame = requestAnimationFrame(tick);
    };

    readTarget();
    current = target;
    onFrameRef.current(target);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
};

/** Smoothstep easing - no hard starts or stops. */
export const smoothstep = (t: number) => {
  const c = Math.min(Math.max(t, 0), 1);
  return c * c * (3 - 2 * c);
};

/** Remaps `value` from [inMin, inMax] onto 0..1 before smoothing. */
export const ramp = (value: number, inMin: number, inMax: number) =>
  smoothstep((value - inMin) / (inMax - inMin));
