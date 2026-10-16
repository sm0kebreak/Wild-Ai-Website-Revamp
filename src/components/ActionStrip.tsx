import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mic2, Handshake } from 'lucide-react';
import { DEMO_SIGNUP } from '@/lib/meetupSchedule';

const actions = [
  {
    key: 'demo',
    kicker: 'Demo',
    title: 'Sign up to demo',
    pitch: DEMO_SIGNUP,
    href: '/speak',
    cta: 'Sign up to demo',
    icon: Mic2,
    featured: true,
  },
  {
    key: 'sponsor',
    kicker: 'Sponsor',
    title: 'Sponsor an event',
    pitch: 'Put your company in the room with the builders.',
    href: '/sponsor',
    cta: 'Become a sponsor',
    icon: Handshake,
    featured: false,
  },
] as const;

/** Two separate calls to action, each with its own pitch. */
const ActionStrip = () => (
  <section className="pb-2 pt-6 md:pt-8" aria-label="Demo or sponsor">
    <div className="container mx-auto min-w-0 px-4">
      <div className="grid min-w-0 gap-3 md:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.key}
              to={action.href}
              className={`flex min-w-0 flex-col justify-between gap-5 rounded-2xl border p-5 transition-colors md:p-6 ${
                action.featured
                  ? 'border-cta/40 bg-card hover:border-cta'
                  : 'border-accent/40 bg-card hover:border-accent'
              }`}
            >
              <div className="min-w-0">
                <p className={`kicker inline-flex items-center gap-2 ${action.featured ? '' : 'text-accent'}`}>
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {action.kicker}
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  {action.title}
                </h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                  {action.pitch}
                </p>
              </div>
              <span
                className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold sm:w-fit ${
                  action.featured
                    ? 'bg-cta text-cta-foreground'
                    : 'border border-accent/70 text-accent'
                }`}
              >
                {action.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

export default ActionStrip;
