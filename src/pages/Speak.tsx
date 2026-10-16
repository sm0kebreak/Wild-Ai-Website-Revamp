import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SpeakerForm from '@/components/SpeakerForm';
import { Mic2, Clock, Sparkles } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { DEMO_SIGNUP, LUMA_CALENDAR_URL } from '@/lib/meetupSchedule';

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
    <Helmet>
      <title>Speak at Wild AI - Sign up to demo</title>
      <meta
        name="description"
        content="Sign up to demo at Wild AI. 15 minutes on the mic, no slides: about 10 minutes to demo, then about 5 minutes of questions and feedback. All ages. Free."
      />
      <meta property="og:title" content="Speak at Wild AI" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
    </Helmet>
    <Navbar />

    <main className="pb-20 flex-grow">
      <PageHero
        eyebrow="Demos"
        icon={Mic2}
        title={<>Demo at <span>Wild AI</span>.</>}
        lede={DEMO_SIGNUP}
      />
      <div className="container mx-auto px-4 pt-14">

        {/* What we're looking for + what to expect */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
          <div className="surface p-6 md:p-8">
            <h2 className="text-xl font-display font-semibold text-wildai-mint mb-4">WHAT WE'RE LOOKING FOR</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <Sparkles className="w-4 h-4 text-wildai-mint mr-3 mt-1 flex-shrink-0" />
                A live demo of something you built - even half-built
              </li>
              <li className="flex items-start">
                <Sparkles className="w-4 h-4 text-wildai-mint mr-3 mt-1 flex-shrink-0" />
                A hard-won lesson from shipping with AI
              </li>
              <li className="flex items-start">
                <Sparkles className="w-4 h-4 text-wildai-mint mr-3 mt-1 flex-shrink-0" />
                Research or tooling our builder audience can actually use
              </li>
            </ul>
          </div>
          <div className="surface p-6 md:p-8">
            <h2 className="text-xl font-display font-semibold text-wildai-mint mb-4">WHAT TO EXPECT</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <Clock className="w-4 h-4 text-wildai-mint mr-3 mt-1 flex-shrink-0" />
                15 minutes on the mic. No slides.
              </li>
              <li className="flex items-start">
                <Clock className="w-4 h-4 text-wildai-mint mr-3 mt-1 flex-shrink-0" />
                About 10 minutes to demo what you built, then about 5 minutes of questions and feedback from the audience.
              </li>
              <li className="flex items-start">
                <Clock className="w-4 h-4 text-wildai-mint mr-3 mt-1 flex-shrink-0" />
                Doors at 6:00, demos at 6:40, networking until 9. All ages. Free.
              </li>
            </ul>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="section-title text-center">SUBMIT YOUR TALK</h2>
          <p className="text-center text-muted-foreground mb-8">
            Tell us what you're building and we'll match you with a city and a date.
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
