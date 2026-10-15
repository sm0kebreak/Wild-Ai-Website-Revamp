import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { pastMeetups } from '@/data/pastMeetups';

const PastEventsStrip = ({ limit }: { limit?: number }) => {
  const events = typeof limit === 'number' ? pastMeetups.slice(0, limit) : pastMeetups;

  return (
    <section className="py-12 md:py-16">
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
          <div className="hidden grid-cols-[11rem_9.5rem_1fr] gap-4 border-b border-border px-4 py-2.5 text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground md:grid">
            <span>Date</span>
            <span>City</span>
            <span>Venue</span>
          </div>
          <ul>
            {events.map((event) => (
              <li key={event.id} className="border-b border-border last:border-b-0">
                <Link
                  to="/past-events"
                  className="grid gap-0.5 px-4 py-3.5 transition-colors hover:bg-secondary/60 md:grid-cols-[11rem_9.5rem_1fr] md:items-center md:gap-4"
                >
                  <span className="font-medium">{event.displayDate}</span>
                  <span className="text-sm text-muted-foreground md:text-foreground">{event.city}</span>
                  <span className="text-sm text-muted-foreground">{event.venue ?? ''}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PastEventsStrip;
