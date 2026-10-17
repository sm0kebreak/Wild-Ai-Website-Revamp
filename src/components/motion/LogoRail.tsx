import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const RESUME_MS = 3000;

interface LogoRailProps {
  label: string;
  /** Seconds for one set of logos to travel its own width. */
  duration: number;
  reverse?: boolean;
  children: React.ReactNode;
}

export interface LogoRailHandle {
  /** Scroll by one visible width. Positive moves toward the next logos. */
  nudge: (direction: -1 | 1) => void;
}

/**
 * Native horizontal scroller with a seamless loop.
 * Auto-advance writes scrollLeft only while the user is not touching the row.
 * On iOS, writing scrollLeft during a pan cancels the gesture, so a touch,
 * pointer, or wheel pauses the loop until scrolling has settled.
 */
const LogoRail = forwardRef<LogoRailHandle, LogoRailProps>(
  ({ label, duration, reverse = false, children }, ref) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const nudgeRef = useRef<(direction: -1 | 1) => void>(() => {});

    useImperativeHandle(ref, () => ({
      nudge: (direction) => nudgeRef.current(direction),
    }), []);

    useEffect(() => {
      const el = scrollerRef.current;
      if (!el) return;

      const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      let reduced = reducedQuery.matches;
      let paused = reduced;
      let hovering = false;
      let visible = false;
      let userScroll = false;
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
        if (setWidth <= 0 || userScroll) return;
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
        if (paused || userScroll || !visible || reduced || dragging || document.hidden || setWidth <= 0) {
          last = now;
          return;
        }
        const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
        last = now;
        if (dt === 0 || userScroll) return;
        const delta = (setWidth / duration) * dt;
        el.scrollLeft += reverse ? -delta : delta;
        wrap();
      };

      const start = () => {
        if (frame || paused || userScroll || !visible || reduced || hovering) return;
        last = 0;
        frame = requestAnimationFrame(tick);
      };

      const hold = () => {
        userScroll = true;
        paused = true;
        window.clearTimeout(resumeTimer);
        stop();
      };

      const release = () => {
        window.clearTimeout(resumeTimer);
        userScroll = false;
        dragging = false;
        el.classList.remove('is-dragging');
        wrap();
        paused = reduced;
        start();
      };

      const armResume = () => {
        window.clearTimeout(resumeTimer);
        resumeTimer = window.setTimeout(release, RESUME_MS);
      };

      const onResize = () => {
        const previous = setWidth;
        measure();
        if (setWidth <= 0 || userScroll) return;
        if (previous <= 0) el.scrollLeft = setWidth;
        else if (previous !== setWidth) el.scrollLeft = (el.scrollLeft / previous) * setWidth;
        wrap();
      };

      nudgeRef.current = (direction) => {
        hold();
        el.scrollLeft += direction * Math.max(el.clientWidth, 1);
        userScroll = false;
        wrap();
        userScroll = true;
        armResume();
      };

      const onPointerEnter = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        hovering = true;
        paused = true;
        stop();
      };
      const onPointerLeave = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse' || dragging) return;
        hovering = false;
        if (!userScroll) armResume();
      };
      const onPointerDown = (event: PointerEvent) => {
        hold();
        if (event.pointerType !== 'mouse' || event.button !== 0) return;
        dragging = true;
        dragged = false;
        dragOrigin = event.clientX;
        dragScroll = el.scrollLeft;
      };
      const onPointerMove = (event: PointerEvent) => {
        if (!dragging || event.pointerType !== 'mouse') return;
        const dx = event.clientX - dragOrigin;
        if (Math.abs(dx) <= 5) return;
        if (!dragged) {
          dragged = true;
          el.classList.add('is-dragging');
          el.setPointerCapture(event.pointerId);
        }
        const wasUser = userScroll;
        userScroll = false;
        el.scrollLeft = dragScroll - dx;
        wrap();
        userScroll = wasUser;
      };
      const endPointer = (event: PointerEvent) => {
        if (event.pointerType === 'mouse' && dragging) {
          dragging = false;
          el.classList.remove('is-dragging');
          if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
        }
        if (userScroll) armResume();
      };
      const onClickCapture = (event: MouseEvent) => {
        if (!dragged) return;
        event.preventDefault();
        event.stopPropagation();
        dragged = false;
      };
      const onWheel = () => {
        hold();
        armResume();
      };
      const onTouchStart = () => hold();
      const onTouchEnd = () => {
        if (userScroll) armResume();
      };
      const onScroll = () => {
        if (userScroll) {
          armResume();
          return;
        }
        wrap();
      };
      const onScrollEnd = () => {
        if (!userScroll) return;
        // scrollend means the gesture, including momentum, has finished.
        // A short beat still lets a late scroll event push the resume back.
        window.clearTimeout(resumeTimer);
        resumeTimer = window.setTimeout(release, 200);
      };
      const onVisibility = () => {
        if (document.hidden) stop();
        else start();
      };
      const onReduced = () => {
        reduced = reducedQuery.matches;
        if (reduced) {
          paused = true;
          stop();
        } else if (!userScroll && !hovering) {
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
      el.addEventListener('pointerup', endPointer);
      el.addEventListener('pointercancel', endPointer);
      el.addEventListener('click', onClickCapture, true);
      el.addEventListener('wheel', onWheel, { passive: true });
      el.addEventListener('touchstart', onTouchStart, { passive: true });
      el.addEventListener('touchend', onTouchEnd, { passive: true });
      el.addEventListener('touchcancel', onTouchEnd, { passive: true });
      el.addEventListener('scroll', onScroll, { passive: true });
      el.addEventListener('scrollend', onScrollEnd);
      document.addEventListener('visibilitychange', onVisibility);
      reducedQuery.addEventListener('change', onReduced);

      return () => {
        stop();
        window.clearTimeout(resumeTimer);
        nudgeRef.current = () => {};
        observer.disconnect();
        resizeObserver.disconnect();
        el.removeEventListener('pointerenter', onPointerEnter);
        el.removeEventListener('pointerleave', onPointerLeave);
        el.removeEventListener('pointerdown', onPointerDown);
        el.removeEventListener('pointermove', onPointerMove);
        el.removeEventListener('pointerup', endPointer);
        el.removeEventListener('pointercancel', endPointer);
        el.removeEventListener('click', onClickCapture, true);
        el.removeEventListener('wheel', onWheel);
        el.removeEventListener('touchstart', onTouchStart);
        el.removeEventListener('touchend', onTouchEnd);
        el.removeEventListener('touchcancel', onTouchEnd);
        el.removeEventListener('scroll', onScroll);
        el.removeEventListener('scrollend', onScrollEnd);
        document.removeEventListener('visibilitychange', onVisibility);
        reducedQuery.removeEventListener('change', onReduced);
      };
    }, [duration, reverse]);

    return (
      <div
        ref={scrollerRef}
        className="logo-rail"
        tabIndex={0}
        role="region"
        aria-label={label}
        data-logo-rail=""
      >
        <div className="flex w-max">
          {[0, 1, 2].map((copy) => (
            <div
              key={copy}
              data-logo-set={copy === 0 ? 'true' : undefined}
              className="logo-set flex shrink-0 items-center"
              aria-hidden={copy === 0 ? undefined : true}
              {...(copy === 0 ? {} : { inert: '' })}
            >
              {children}
            </div>
          ))}
        </div>
      </div>
    );
  },
);

LogoRail.displayName = 'LogoRail';

export default LogoRail;
