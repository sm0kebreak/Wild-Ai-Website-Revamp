import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { eventPhotoGroups, type EventPhotoGroup } from '@/data/eventPhotos';

const chipLabel = (group: EventPhotoGroup) => {
  const date = new Date(`${group.date}T00:00:00`);
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  return `${month} ${date.getDate()} · ${group.city}`;
};

const EventPhotoGallery = ({ cinema = false }: { cinema?: boolean }) => {
  const [groupId, setGroupId] = useState(eventPhotoGroups[0]?.id ?? '');
  const group = eventPhotoGroups.find((item) => item.id === groupId) ?? eventPhotoGroups[0];
  const [index, setIndex] = useState<number | null>(null);
  const active = group && index !== null ? group.photos[index] : null;

  useEffect(() => {
    if (index === null || !group) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        setIndex((current) => (current === null ? current : (current + 1) % group.photos.length));
      }
      if (event.key === 'ArrowLeft') {
        setIndex((current) =>
          current === null ? current : (current - 1 + group.photos.length) % group.photos.length,
        );
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [group, index]);

  if (!group) return null;

  const open = (photoIndex: number) => setIndex(photoIndex);

  return (
    <section id="photos" className={cinema ? '' : 'pb-8 pt-2 md:pb-10'}>
      <div className={cinema ? '' : 'container mx-auto px-4'}>
        <div className={cinema ? 'text-center' : 'mb-3 flex items-end justify-between gap-4'}>
          <h2 className={cinema ? 'tesla-title' : 'font-display text-xl font-semibold tracking-tight md:text-2xl'}>
            Photos
          </h2>
        </div>

        <div className={`city-pills mb-3 ${cinema ? 'mt-8' : ''}`} role="tablist" aria-label="Choose a night">
          {eventPhotoGroups.map((item) => {
            const selected = item.id === group.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                data-selected={selected}
                className="city-pill"
                onClick={() => {
                  setGroupId(item.id);
                  setIndex(null);
                }}
              >
                {chipLabel(item)}
              </button>
            );
          })}
        </div>

        <ul
          className="flex snap-x gap-2 overflow-x-auto pb-1 md:grid md:auto-rows-[7.25rem] md:grid-flow-dense md:grid-cols-6 md:gap-2 md:overflow-visible"
          aria-label={`Photos from ${group.event}`}
        >
          {group.photos.map((photo, photoIndex) => {
            const feature = photoIndex === 0;
            return (
              <li
                key={photo.id}
                className={`snap-start md:min-h-0 ${feature ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => open(photoIndex)}
                  className="block h-full w-max max-w-[16rem] overflow-hidden rounded-xl border border-border bg-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:w-full md:max-w-none md:min-h-0"
                  aria-label={`Open photo ${photoIndex + 1}`}
                >
                  <img
                    src={photo.src}
                    srcSet={photo.srcSet}
                    sizes={feature ? '(max-width: 768px) 70vw, 360px' : '(max-width: 768px) 46vw, 200px'}
                    alt=""
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    decoding="async"
                    className="h-32 w-auto max-w-none object-cover md:h-full md:min-h-0 md:w-full"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <Dialog open={active !== null} onOpenChange={(next) => !next && setIndex(null)}>
        <DialogContent className="max-w-3xl gap-3 border-border bg-card p-3 sm:p-4">
          {active && (
            <>
              <DialogTitle className="sr-only">
                Photo {index !== null ? index + 1 : 1} of {group.photos.length}
              </DialogTitle>
              <DialogDescription className="sr-only">Photograph from a Wild AI night.</DialogDescription>
              <img
                src={active.fullSrc}
                alt=""
                width={active.width}
                height={active.height}
                className="max-h-[70vh] w-full rounded-lg object-contain"
              />
              <div className="flex items-center justify-end gap-3">
                <p className="sr-only">
                  {index !== null ? index + 1 : 0} of {group.photos.length}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    aria-label="Previous photo"
                    onClick={() =>
                      setIndex((current) =>
                        current === null ? current : (current - 1 + group.photos.length) % group.photos.length,
                      )
                    }
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    aria-label="Next photo"
                    onClick={() =>
                      setIndex((current) => (current === null ? current : (current + 1) % group.photos.length))
                    }
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EventPhotoGallery;
