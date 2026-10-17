import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import EmailCapture from '@/components/EmailCapture';

const paths = [
  {
    line: '15 minutes on the mic. No slides.',
    cta: 'Sign up to demo',
    href: '/speak',
  },
  {
    line: 'Sponsorship is $500 per event.',
    cta: 'Become a sponsor',
    href: '/sponsor',
  },
  {
    line: 'Host the same night in your city.',
    cta: 'Start a chapter',
    href: '/start-a-chapter',
  },
] as const;

/** Four ways in. Each is one sentence and one action. */
const ActionStrip = () => (
  <section className="pb-2 pt-6 md:pt-8" aria-label="Ways to take part">
    <div className="container mx-auto min-w-0 px-4">
      <div className="grid min-w-0 gap-3 md:grid-cols-2">
        {paths.map((path) => (
          <div
            key={path.href}
            className="flex min-w-0 flex-col justify-between gap-4 rounded-lg border border-border bg-card p-5 md:p-6"
          >
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{path.line}</p>
            <Button asChild className="w-full sm:w-fit">
              <Link to={path.href}>{path.cta}</Link>
            </Button>
          </div>
        ))}
        <div className="min-w-0">
          <EmailCapture
            source="home"
            title="Email"
            description="One email per event."
            compact
          />
        </div>
      </div>
    </div>
  </section>
);

export default ActionStrip;
