import React, { useEffect, useRef } from 'react';

const RESUME_MS = 3000;

interface LogoRailProps {
  label: string;
  /** Seconds for one set of logos to travel its own width. */
  duration: number;
  reverse?: boolean;
  children: React.ReactNode;
}

/**
 * Native horizontal scroller with a seamless loop.
 * Auto-advance writes scrollLeft on a paused animation frame. Touch swipes,
 * trackpad pans, and shift-wheel use the browser's own scrolling, so this
 * does not listen to the page scroll and does not re-render while it moves.
 */
const LogoRail = ({ label, duration, reverse = false, children }: LogoRailProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = reducedQuery.matches;
    let paused = reduced;
    let visible = false;
    let frame = 0;
    let last = 0;
    let setWidth = 0;
    let resumeTimer = 0;
    let dragging = false;
    let dragOrigin = 0;
    let dragScroll = 0;
    let dragged = false;

    const measure = () => {
      const set = el.querySelector<HTMLElement>('[data-logo-set]');
      setWidth = set?.offsetWidth ?? 0;
    };

    const wrap = () => {
      if (setWidth <= 0) return;
      let next = el.scrollLeft;
      if (next >= setWidth * 2) next -= setWidth;
      else if (next < setWidth) next += setWidth;
      if (next !== el.scrollLeft) el.scrollLeft = next;
    };

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (paused || !visible || reduced || dragging || document.hidden || setWidth <= 0) {
        last = now;
        return;
      }
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      if (dt === 0) return;
      const delta = (setWidth / duration) * dt;
      el.scrollLeft += reverse ? -delta : delta;
      wrap();
    };

    const start = () => {
      if (frame || paused || !visible || reduced) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };

    const pause = () => {
      paused = true;
      window.clearTimeout(resumeTimer);
      stop();
    };

    const resumeLater = () => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        paused = reduced;
        start();
      }, RESUME_MS);
    };

    const onResize = () => {
      const previous = setWidth;
      measure();
      if (setWidth <= 0) return;
      if (previous <= 0) el.scrollLeft = setWidth;
      else if (previous !== setWidth) el.scrollLeft = (el.scrollLeft / previous) * setWidth;
      wrap();
    };

    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pause();
    };
    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || dragging) return;
      resumeLater();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      dragging = true;
      dragged = false;
      dragOrigin = event.clientX;
      dragScroll = el.scrollLeft;
      pause();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - dragOrigin;
      if (Math.abs(dx) <= 5) return;
      if (!dragged) {
        dragged = true;
        el.classList.add('is-dragging');
        el.setPointerCapture(event.pointerId);
      }
      el.scrollLeft = dragScroll - dx;
      wrap();
    };
    const endDrag = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove('is-dragging');
      if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
      resumeLater();
    };
    const onClickCapture = (event: MouseEvent) => {
      if (!dragged) return;
      event.preventDefault();
      event.stopPropagation();
      dragged = false;
    };
    const onWheel = () => {
      pause();
      resumeLater();
    };
    const onTouchStart = () => pause();
    const onTouchEnd = () => resumeLater();
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    const onReduced = () => {
      reduced = reducedQuery.matches;
      if (reduced) pause();
      else {
        paused = false;
        start();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    observer.observe(el);

    const resizeObserver = new ResizeObserver(onResize);
    const set = el.querySelector('[data-logo-set]');
    if (set) resizeObserver.observe(set);
    onResize();

    el.addEventListener('pointerenter', onPointerEnter);
    el.addEventListener('pointerleave', onPointerLeave);
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);
    el.addEventListener('click', onClickCapture, true);
    el.addEventListener('wheel', onWheel, { passive: true });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });
    el.addEventListener('scroll', wrap, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    reducedQuery.addEventListener('change', onReduced);

    return () => {
      stop();
      window.clearTimeout(resumeTimer);
      observer.disconnect();
      resizeObserver.disconnect();
      el.removeEventListener('pointerenter', onPointerEnter);
      el.removeEventListener('pointerleave', onPointerLeave);
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', endDrag);
      el.removeEventListener('pointercancel', endDrag);
      el.removeEventListener('click', onClickCapture, true);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
      el.removeEventListener('scroll', wrap);
      document.removeEventListener('visibilitychange', onVisibility);
      reducedQuery.removeEventListener('change', onReduced);
    };
  }, [duration, reverse]);

  return (
    <div ref={scrollerRef} className="logo-rail mask-fade-x" tabIndex={0} role="region" aria-label={label}>
      <div className="flex w-max">
        {[0, 1, 2].map((copy) => (
          <div
            key={copy}
            data-logo-set={copy === 0 ? 'true' : undefined}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 0 ? undefined : true}
            {...(copy === 0 ? {} : { inert: '' })}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoRail;
