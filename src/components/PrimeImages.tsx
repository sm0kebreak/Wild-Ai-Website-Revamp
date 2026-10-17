import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Load and decode below-the-fold images while the thread is idle.
 * Pauses during a scroll so the decode does not land in a fling.
 */
const PrimeImages = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let cancelled = false;
    let idle = 0;
    let scrollTimer = 0;
    let scrolling = false;
    const images = Array.from(document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]'));
    let index = 0;

    const pump = () => {
      if (cancelled || scrolling || index >= images.length) return;
      idle = window.requestIdleCallback((deadline) => {
        if (cancelled || scrolling) return;
        if (deadline.timeRemaining() < 8) {
          pump();
          return;
        }
        const img = images[index];
        index += 1;
        if (!img || (img.complete && img.naturalWidth > 0)) {
          pump();
          return;
        }
        // loading=lazy will not fetch an image that is still far down the page.
        img.loading = 'eager';
        const next = () => {
          if (!cancelled) pump();
        };
        if (typeof img.decode === 'function') img.decode().then(next, next);
        else next();
      });
    };

    const onScroll = () => {
      scrolling = true;
      if (idle) window.cancelIdleCallback(idle);
      idle = 0;
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        scrolling = false;
        pump();
      }, 180);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    if ('requestIdleCallback' in window) pump();

    return () => {
      cancelled = true;
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(scrollTimer);
      if (idle) window.cancelIdleCallback(idle);
    };
  }, [pathname]);

  return null;
};

export default PrimeImages;
