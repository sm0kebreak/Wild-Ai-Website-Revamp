import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { formatMemberCount, useChapters } from '@/hooks/useChapters';
import { Flame, ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { team } from '@/data/team';

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

const About = () => {
  const { data: chapters } = useChapters();

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>About Wild AI - The AI meetup for people who ship</title>
        <meta
          name="description"
          content="Wild AI is a community-run meetup network for AI builders. Our story, values, team, and code of conduct."
        />
        <meta property="og:title" content="About Wild AI" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Helmet>
      <Navbar />

      <main className="pb-20 flex-grow">
        <PageHero
          eyebrow="About Wild AI"
          icon={Flame}
          title={
            <>
              The best AI conversations happen <span>in a crowded room</span>.
            </>
          }
          lede="Wild AI is a community-run meetup network for people who build with AI. 15-minute demos, no slides. All ages. Free."
        />
        <div className="container mx-auto px-4 pt-14">

          {/* Origin story */}
          <div className="max-w-3xl mx-auto surface p-6 md:p-8 mb-16">
            <h2 className="section-title">THE ORIGIN STORY</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The first Wild AI meetup was a handful of engineers, founders, and students at
                DayBlock Brewing in February, passing around a microphone. It started as a place
                to share who you are, what you&apos;re working on, and why it matters.
              </p>
              <p>
                It&apos;s still going. We want to see what you&apos;re building, how you built it,
                and the tools you used.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="section-title text-center">WHAT WE STAND FOR</h2>
            <div className="surface p-6 md:p-8">
              <p className="text-muted-foreground leading-relaxed">
                Show, don&apos;t tell. Slides are banned. Every speaker gets 15 minutes of mic
                time to demo their work and take questions and feedback from the audience. We
                don&apos;t care how technical you are. The rawer the project, the better.
              </p>
            </div>
          </div>

          {/* Team */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="section-title text-center">THE TEAM</h2>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {team.map((person) => {
                const body = (
                  <>
                    {person.photo ? (
                      <img
                        src={person.photo}
                        alt=""
                        className="avatar-photo mx-auto h-20 w-20"
                        width={256}
                        height={256}
                      />
                    ) : (
                      <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary font-display text-lg font-semibold text-foreground">
                        {initials(person.name)}
                      </span>
                    )}
                    <p className="mt-3 font-display font-semibold leading-tight">{person.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Organizer</p>
                  </>
                );
                return (
                  <li key={person.name}>
                    {person.linkedin ? (
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${person.name} on LinkedIn`}
                        className="surface surface-interactive block h-full p-5 text-center"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="surface block h-full p-5 text-center">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Want to join the crew?{' '}
              <Link to="/start-a-chapter" className="text-wildai-mint hover:underline">
                Apply to organize a chapter →
              </Link>
            </p>
          </div>

          {/* Network */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="section-title text-center">THE NETWORK</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {(chapters ?? []).map((c) => (
                <Link
                  key={c.slug}
                  to={`/${c.slug}`}
                  className="surface surface-interactive p-5 text-center transition-colors group"
                >
                  <p className="font-bold font-mono group-hover:text-wildai-mint transition-colors">
                    {c.city.toUpperCase()}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">{c.region}</p>
                  <span className="text-[10px] font-mono text-wildai-mint">
                    {c.status === 'active' ? 'ACTIVE' : 'LAUNCHING'}
                    {formatMemberCount(c.member_count) ? ` · ${formatMemberCount(c.member_count)}` : ''}
                  </span>
                </Link>
              ))}
              <Link
                to="/chapters"
                className="surface surface-interactive p-5 text-center transition-colors flex flex-col items-center justify-center"
              >
                <p className="font-bold font-mono text-wildai-mint mb-1">MORE CITIES</p>
                <p className="text-xs text-muted-foreground">See the full directory</p>
              </Link>
            </div>
          </div>

          {/* Code of conduct */}
          <div id="conduct" className="max-w-3xl mx-auto surface p-6 md:p-8 mb-16 scroll-mt-28">
            <h2 className="section-title">CODE OF CONDUCT</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Wild AI exists so builders can share real work in a room they trust. That trust
                is non-negotiable. We are inclusive of all backgrounds, experience levels, and
                technologies. Harassment, discrimination, or hostile behavior toward anyone in
                the community - at events or online - results in removal and a ban.
              </p>
              <p>
                Demos are judged on the work, not the person. Recruiters are welcome as
                attendees and sponsors, but the room is never a pitch stage. If you see or
                experience anything that violates this, tell any organizer - we take it
                seriously and act on it.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-display font-semibold mb-4">COME TO A MEETUP</h2>
            <p className="text-muted-foreground mb-6">
              The fastest way to understand Wild AI is to stand in one of our rooms.
            </p>
            <Link to="/chapters">
              <Button >
                FIND YOUR CITY <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
