import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import CityEventPicker from '@/components/CityEventPicker';
import { nextMeetupDate, rsvpUrlFor } from '@/lib/meetupSchedule';

const actions = [
  {
    key: 'register',
    title: 'Register',
    detail: 'Minneapolis on Meetup',
    external: true,
  },
  {
    key: 'demo',
    title: 'Sign up to demo',
    detail: 'Five minutes on the mic',
    to: '/speak',
  },
  {
    key: 'sponsor',
    title: 'Sponsor',
    detail: 'Reach the room',
    to: '/sponsor',
  },
] as const;

/**
 * Opening band: the headline, the city selector, and the three ways in.
 * The event card lives in the selector so the city and the date stay together.
 */
const Hero = () => {
  const rsvpUrl = rsvpUrlFor(nextMeetupDate());

  return (
    <section className="hero-stage" aria-label="Wild AI">
      <div className="hero-wash" aria-hidden="true" />

      <div className="container relative mx-auto px-4">
        <div className="max-w-2xl">
          <p className="kicker">Wild AI</p>
          <h1 className="display-title mt-4">
            The room where
            <span className="block text-gradient">AI builders</span>
            show their work.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:mt-5 md:text-lg">
            Short demos, then the room. Minneapolis meets every third Monday.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
          {actions.map((action) => {
            const className = 'action-link';
            const body = (
              <>
                <span className="min-w-0">
                  <span className="block font-display text-sm font-semibold leading-tight text-foreground sm:text-base">
                    {action.title}
                  </span>
                  <span className="mt-0.5 hidden text-sm text-muted-foreground sm:block">{action.detail}</span>
                </span>
                <ArrowUpRight className="hidden h-4 w-4 shrink-0 text-accent sm:block" />
              </>
            );

            if (action.key === 'register') {
              return (
                <a
                  key={action.key}
                  href={rsvpUrl ?? '#next-event'}
                  target={rsvpUrl ? '_blank' : undefined}
                  rel={rsvpUrl ? 'noopener noreferrer' : undefined}
                  className={className}
                >
                  {body}
                </a>
              );
            }

            return (
              <Link key={action.key} to={action.to} className={className}>
                {body}
              </Link>
            );
          })}
        </div>

        <div className="mt-6 md:mt-8">
          <CityEventPicker />
        </div>
      </div>
    </section>
  );
};

export default Hero;
