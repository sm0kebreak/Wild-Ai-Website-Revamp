import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { nextMeetupDate, rsvpUrlFor } from '@/lib/meetupSchedule';

const ActionStrip = () => {
  const rsvpUrl = rsvpUrlFor(nextMeetupDate());

  const items = [
    {
      key: 'register',
      title: 'Register',
      detail: 'Next Minneapolis meetup',
      href: rsvpUrl ?? '#next-event',
      external: Boolean(rsvpUrl),
    },
    {
      key: 'demo',
      title: 'Demo',
      detail: 'Five minutes on the mic',
      href: '/speak',
      external: false,
    },
    {
      key: 'sponsor',
      title: 'Sponsor',
      detail: 'Reach the room',
      href: '/sponsor',
      external: false,
    },
  ] as const;

  return (
    <section className="pb-1 pt-5 md:pt-6" aria-label="Get involved">
      <div className="container mx-auto px-4">
        <ul className="action-bar">
          {items.map((item) => {
            const body = (
              <>
                <span className="min-w-0">
                  <span className="block font-display text-sm font-semibold leading-tight sm:text-base">
                    {item.title}
                  </span>
                  <span className="mt-0.5 hidden text-sm text-muted-foreground sm:block">{item.detail}</span>
                </span>
                <ArrowUpRight className="hidden h-4 w-4 shrink-0 text-accent sm:block" />
              </>
            );
            const className = 'action-link';

            return (
              <li key={item.key}>
                {item.external || item.href.startsWith('http') || item.href.startsWith('#') ? (
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className={className}
                  >
                    {body}
                  </a>
                ) : (
                  <Link to={item.href} className={className}>
                    {body}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ActionStrip;
