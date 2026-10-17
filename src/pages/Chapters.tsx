import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmailCapture from '@/components/EmailCapture';
import { Button } from '@/components/ui/button';
import { MapPin, CalendarDays, ArrowRight } from 'lucide-react';
import {
  formatMemberCount,
  useChapters,
  useAllEvents,
  isUpcoming,
  formatDate,
} from '@/hooks/useChapters';
import PageHero from '@/components/PageHero';
import { CHAPTER_SEO_CITIES } from '@/data/chapters';

const Chapters = () => {
  const { data: chapters, isLoading } = useChapters();
  const { data: events } = useAllEvents();

  const nextEventFor = (chapterId: string) =>
    (events ?? [])
      .filter((event) => event.chapter_id === chapterId && isUpcoming(event.event_date))
      .sort((a, b) => a.event_date.localeCompare(b.event_date))[0];

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Wild AI chapters - {CHAPTER_SEO_CITIES}</title>
        <meta
          name="description"
          content={`Find a Wild AI meetup in ${CHAPTER_SEO_CITIES}. See the next event in your city, or get notified when a date is set.`}
        />
        <meta property="og:title" content="Find a Wild AI chapter" />
        <meta
          property="og:description"
          content={`Wild AI meetups in ${CHAPTER_SEO_CITIES}. Pick a city and see what is next.`}
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Helmet>
      <Navbar />
      <main className="pb-20 flex-grow">
        <PageHero
          eyebrow="Chapters"
          title={
            <>
              Find your <span>city</span>
            </>
          }
          lede="Minneapolis is on the calendar. Other cities will post a date when it is set."
          aside={
            <>
              <span>North America</span>
              <strong>{chapters?.length ?? 5} chapters</strong>
            </>
          }
        />

        <section className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isLoading &&
              [0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="h-56 animate-pulse rounded-xl border border-border bg-card" />
              ))}
            {(chapters ?? []).map((chapter) => {
              const next = nextEventFor(chapter.id);
              const members = formatMemberCount(chapter.member_count);
              return (
                <Link
                  key={chapter.slug}
                  to={`/${chapter.slug}`}
                  className="flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/40"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-accent" />
                      {chapter.region}
                    </span>
                    <span className={`kicker ${chapter.status === 'active' ? 'text-accent' : 'text-ember'}`}>
                      {chapter.status === 'active' ? 'Active' : 'Launching'}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl font-semibold">{chapter.city}</h2>
                  <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {next ? (
                      <span>
                        Next: {formatDate(next.event_date)}
                        {next.venue_name ? ` · ${next.venue_name}` : ''}
                      </span>
                    ) : (
                      <span>Next event coming soon</span>
                    )}
                  </p>
                  {members && <p className="mt-3 text-xs text-muted-foreground">{members}</p>}
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    {next ? 'View event' : 'Get notified'}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="flex flex-col justify-center rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-xl font-semibold">Don&apos;t see your city?</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Start a chapter. We share the format, the name, and a hand with the first night.
              </p>
              <Link to="/start-a-chapter" className="mt-5">
                <Button variant="outline">Start a chapter</Button>
              </Link>
            </div>
            <EmailCapture
              source="notify"
              title="Get notified"
              description="An email when a chapter opens near you."
              compact
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Chapters;
