import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { eventPhotoGroups, type EventPhotoGroup } from '@/data/eventPhotos';

const chipLabel = (group: EventPhotoGroup) => {
  if (group.id === '2026-04-09-gopher') return 'Gopher AI Demo Night';
  const date = new Date(`${group.date}T00:00:00`);
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  return `${group.city} ${month} ${date.getDate()}`;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const EventPhotoGallery = ({
  cinema = false,
  groupId: onlyGroup,
}: {
  cinema?: boolean;
  /** Show one night and hide the night switcher. */
  groupId?: string;
}) => {
  const groups = onlyGroup ? eventPhotoGroups.filter((item) => item.id === onlyGroup) : eventPhotoGroups;
  const [groupId, setGroupId] = useState(groups[0]?.id ?? '');
  const group = groups.find((item) => item.id === groupId) ?? groups[0];
  const [active, setActive] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const photoIndex = useCallback(() => {
    const root = scrollerRef.current;
    if (!root) return 0;
    const slides = root.querySelectorAll<HTMLElement>('[data-photo]');
    const mid = root.scrollLeft + root.clientWidth / 2;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    slides.forEach((slide, index) => {
      const center = slide.offsetLeft + slide.offsetWidth / 2;
      const dist = Math.abs(center - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = index;
      }
    });
    return best;
  }, []);

  const scrollToPhoto = useCallback((index: number) => {
    const root = scrollerRef.current;
    const slide = root?.querySelectorAll<HTMLElement>('[data-photo]')[index];
    if (!root || !slide) return;
    const left = slide.offsetLeft - (root.clientWidth - slide.offsetWidth) / 2;
    root.scrollTo({
      left: Math.max(0, left),
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  }, []);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    root.scrollTo({ left: 0 });
    setActive(0);
  }, [groupId]);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const onScroll = () => setActive(photoIndex());
    root.addEventListener('scroll', onScroll, { passive: true });
    return () => root.removeEventListener('scroll', onScroll);
  }, [groupId, photoIndex]);

  if (!group) return null;

  const groupIndex = groups.findIndex((item) => item.id === group.id);
  const nextGroup = !onlyGroup && groupIndex >= 0 ? groups[groupIndex + 1] : undefined;
  const count = group.photos.length;

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const dir = event.key === 'ArrowRight' ? 1 : -1;
    scrollToPhoto(Math.min(count - 1, Math.max(0, photoIndex() + dir)));
  };

  const showNight = (id: string) => {
    setGroupId(id);
    setActive(0);
  };

  return (
    <section id={onlyGroup ? undefined : 'photos'} className={`photo-section${onlyGroup ? ' mb-10' : cinema ? '' : ' pb-8 pt-2 md:pb-10'}`}>
      <div className={onlyGroup || cinema ? '' : 'container mx-auto px-4'}>
        <div className={cinema ? 'text-center' : 'mb-3 flex items-end justify-between gap-4'}>
          <h2 className={cinema ? 'tesla-title' : 'font-display text-xl font-semibold tracking-tight md:text-2xl'}>
            Photos
          </h2>
        </div>

        {onlyGroup ? null : (
          <div className={`city-pills mb-3 ${cinema ? 'mt-4' : ''}`} role="tablist" aria-label="Choose a night">
            {groups.map((item) => {
              const selected = item.id === group.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  data-selected={selected}
                  className="city-pill"
                  onClick={() => showNight(item.id)}
                >
                  {chipLabel(item)}
                </button>
              );
            })}
          </div>
        )}

        <div className="photo-carousel-frame">
          <div
            ref={scrollerRef}
            className="photo-carousel"
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label={`Photos from ${group.event}`}
            onKeyDown={onKeyDown}
          >
            {group.photos.map((photo) => (
              <figure key={photo.id} className="photo-slide" data-photo data-slide>
                <img
                  src={photo.src}
                  srcSet={photo.srcSet}
                  sizes="(max-width: 767px) 90vw, 70vh"
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
            {nextGroup ? (
              <button type="button" className="photo-slide photo-next-event" data-slide onClick={() => showNight(nextGroup.id)}>
                Next event →
              </button>
            ) : null}
          </div>
          <button
            type="button"
            className="photo-arrow photo-arrow-prev"
            aria-label="Previous photo"
            onClick={() => scrollToPhoto(Math.max(0, active - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="photo-arrow photo-arrow-next"
            aria-label="Next photo"
            onClick={() => scrollToPhoto(Math.min(count - 1, active + 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <p className="photo-counter" aria-live="polite">
            {Math.min(active + 1, count)} / {count}
          </p>
        </div>
      </div>
    </section>
  );
};

export default EventPhotoGallery;
