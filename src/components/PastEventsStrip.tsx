import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { pastMeetups } from '@/data/pastMeetups';
import SpeakerRow, { SpeakerFace } from '@/components/SpeakerRow';
import type { LineupSpeaker } from '@/data/speakerArchive';

const AvatarStack = ({
  speakers,
  open,
  label,
}: {
  speakers: LineupSpeaker[];
  open: boolean;
  label: string;
}) => {
  const shown = speakers.slice(0, 4);
  const extra = speakers.length - shown.length;

  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex -space-x-2">
        {shown.map((speaker) => (
          <SpeakerFace
            key={speaker.id}
            speaker={speaker}
            className="h-8 w-8 ring-2 ring-card"
          />
        ))}
      </span>
      {extra > 0 && <span className="text-xs font-medium text-muted-foreground">+{extra}</span>}
      <ChevronDown
        className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
        aria-hidden="true"
      />
      <span className="sr-only">
        {open ? 'Hide' : 'Show'} speakers for {label}: {speakers.map((speaker) => speaker.name).join(', ')}
      </span>
    </span>
  );
};

const Recap = ({ text, href }: { text: string; href?: string }) => {
  const parts = text.split(/(https?:\/\/\S+)/g);
  return (
    <div className="pb-2 pt-1">
      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {parts.map((part, index) => {
          const match = part.match(/^(https?:\/\/.*?)([.,)]*)$/);
          if (!match) return <span key={index}>{part}</span>;
          return (
            <span key={index}>
              <a
                href={match[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent hover:underline"
              >
                {match[1]}
              </a>
              {match[2]}
            </span>
          );
        })}
      </p>
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex min-h-11 items-center text-sm font-medium text-accent hover:underline"
        >
          Read the full recap on LinkedIn
        </a>
      )}
    </div>
  );
};

const PastEventsStrip = ({
  limit,
  detailed = false,
  stacks = false,
}: {
  limit?: number;
  detailed?: boolean;
  stacks?: boolean;
}) => {
  const events = typeof limit === 'number' ? pastMeetups.slice(0, limit) : pastMeetups;
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="past-events" className={stacks ? 'py-6 md:py-8' : 'py-12 md:py-16'}>
      <div className="container mx-auto px-4">
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Archive</p>
            <h2 className="font-display text-xl font-semibold tracking-tight md:text-2xl">Past events</h2>
          </div>
          {typeof limit === 'number' && pastMeetups.length > limit && (
            <Link to="/past-events" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              All events
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {!stacks && (
            <div className="hidden grid-cols-[11rem_8.5rem_1fr] gap-4 border-b border-border px-4 py-2.5 text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground md:grid">
              <span>Date</span>
              <span>City</span>
              <span>Venue</span>
            </div>
          )}
          <ul>
            {events.map((event) => {
              const open = openId === event.id;
              const summary = (
                <>
                  <div className="min-w-0 text-left">
                    <p className="truncate font-medium">{event.displayDate}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {event.city}
                      {event.venue ? ` · ${event.venue}` : ''}
                    </p>
                  </div>
                  {stacks && (
                    <AvatarStack speakers={event.speakers} open={open} label={event.displayDate} />
                  )}
                </>
              );
              return (
                <li key={event.id} className="border-b border-border px-4 py-1.5 last:border-b-0">
                  {stacks ? (
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenId(open ? null : event.id)}
                      className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg py-1 text-left hover:bg-secondary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {summary}
                    </button>
                  ) : (
                    <div className="flex items-center justify-between gap-3 py-1">
                      {summary}
                      {detailed && event.youtubeEmbedId && (
                        <a
                          href={`https://www.youtube.com/watch?v=${event.youtubeEmbedId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-sm font-medium text-accent hover:underline"
                        >
                          Recording
                        </a>
                      )}
                    </div>
                  )}
                  {event.recap && <Recap text={event.recap} href={event.linkedinRecapUrl} />}
                  {stacks && open && (
                    <div className="mt-2 border-t border-border/70 pt-2.5">
                      <SpeakerRow speakers={event.speakers} detailed />
                    </div>
                  )}
                  {!stacks && (
                    <div className="mt-2.5">
                      <SpeakerRow speakers={event.speakers} detailed={detailed} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PastEventsStrip;
