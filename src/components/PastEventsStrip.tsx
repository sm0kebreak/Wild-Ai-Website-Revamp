import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { pastMeetups } from '@/data/pastMeetups';
import SpeakerRow from '@/components/SpeakerRow';

const PastEventsStrip = ({ limit, detailed = false }: { limit?: number; detailed?: boolean }) => {
  const events = typeof limit === 'number' ? pastMeetups.slice(0, limit) : pastMeetups;

  return (
    <section id="past-events" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">Archive</p>
            <h2 className="section-title mb-0">Past events</h2>
          </div>
          {typeof limit === 'number' && pastMeetups.length > limit && (
            <Link to="/past-events" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              All events
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="hidden grid-cols-[11rem_8.5rem_1fr] gap-4 border-b border-border px-4 py-2.5 text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground md:grid">
            <span>Date</span>
            <span>City</span>
            <span>Venue</span>
          </div>
          <ul>
            {events.map((event) => (
              <li key={event.id} className="border-b border-border px-4 py-3.5 last:border-b-0">
                <div className="grid gap-0.5 md:grid-cols-[11rem_8.5rem_1fr] md:items-baseline md:gap-4">
                  <span className="font-medium">{event.displayDate}</span>
                  <span className="text-sm text-muted-foreground md:text-foreground">{event.city}</span>
                  <span className="flex items-baseline justify-between gap-3 text-sm text-muted-foreground">
                    <span>{event.venue ?? ''}</span>
                    {detailed && event.youtubeEmbedId && (
                      <a
                        href={`https://www.youtube.com/watch?v=${event.youtubeEmbedId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 font-medium text-accent hover:underline"
                      >
                        Recording
                      </a>
                    )}
                  </span>
                </div>
                <div className="mt-2.5">
                  <SpeakerRow speakers={event.speakers} detailed={detailed} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PastEventsStrip;
