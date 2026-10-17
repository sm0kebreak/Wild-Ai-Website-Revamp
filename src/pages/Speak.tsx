import React from 'react';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SpeakerForm from '@/components/SpeakerForm';
import { Mic2 } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { SitePhoto } from '@/components/RoutePhoto';
import { MANIFESTO_STEM } from '@/data/sitePhotos';
import { DEMO_SIGNUP, LUMA_CALENDAR_URL, MEETUP_TIME_LINE, MEETUP_VENUE } from '@/lib/meetupSchedule';

const OCTOBER_LUMA = 'https://luma.com/50wo8gm8';

const faqs = [
  {
    q: 'What is the format?',
    a: '15-minute demos. No slides. About 10 minutes to demo what you built, then about 5 minutes of questions and feedback from the audience.',
  },
  {
    q: 'Who can come, and what does it cost?',
    a: 'All ages. Free.',
  },
  {
    q: 'How do I register?',
    a: 'Register on Luma.',
  },
  {
    q: 'How do I demo?',
    a: DEMO_SIGNUP,
  },
  {
    q: 'How do I sponsor?',
    a: 'Sponsorship is $500 per event. Use the contact form on the sponsor page.',
  },
];

const Speak = () => (
  <div className="flex flex-col min-h-screen">
    <Seo
      title="Demo at Wild AI"
      description="Sign up to demo at Wild AI. 15 minutes on the mic, no slides, then questions and feedback from the room."
      path="/speak"
    />
    <Navbar />

    <main className="pb-20 flex-grow">
      <PageHero
        eyebrow="Demos"
        icon={Mic2}
        title={<>Demo at <span>Wild AI</span>.</>}
      />

      <section className="speak-manifesto" aria-label="Show us">
        <SitePhoto stem={MANIFESTO_STEM} />
        <div className="speak-manifesto-copy">
          <ul>
            <li>What&apos;s a new way to think about a problem?</li>
            <li>What&apos;s a new way to apply AI?</li>
            <li>What&apos;s a new way to build with it?</li>
          </ul>
          <p>Show us your tech. Show us your stack. Show us the project, at any stage.</p>
          <p>The more raw, the better. Get real questions and feedback from the room.</p>
          <p className="speak-manifesto-format">
            {DEMO_SIGNUP} No slides. {MEETUP_TIME_LINE}. {MEETUP_VENUE.name}. All ages. Free.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pt-14">
        {/* Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="section-title text-center">Come show us</h2>
          <p className="text-center text-muted-foreground mb-8">
            Tell us what you&apos;re building and we&apos;ll match you with a city and a date.
          </p>
          <SpeakerForm />
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="section-title text-center">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="surface p-5">
                <summary className="font-bold font-mono cursor-pointer text-sm">{f.q}</summary>
                {f.q === 'How do I register?' ? (
                  <p className="text-muted-foreground text-sm mt-3">
                    Register on Luma. The October 19, 2026 meetup is at{' '}
                    <a href={OCTOBER_LUMA} className="text-wildai-mint hover:underline" target="_blank" rel="noopener noreferrer">
                      {OCTOBER_LUMA}
                    </a>
                    . Other nights, and the calendar, use{' '}
                    <a href={LUMA_CALENDAR_URL} className="text-wildai-mint hover:underline" target="_blank" rel="noopener noreferrer">
                      {LUMA_CALENDAR_URL}
                    </a>
                    .
                  </p>
                ) : f.q === 'How do I sponsor?' ? (
                  <p className="text-muted-foreground text-sm mt-3">
                    Sponsorship is $500 per event. Use the contact form on the{' '}
                    <a href="/sponsor" className="text-wildai-mint hover:underline">sponsor page</a>.
                  </p>
                ) : (
                  <p className="text-muted-foreground text-sm mt-3">{f.a}</p>
                )}
              </details>
            ))}
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Speak;
