import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoCarousel from '@/components/LogoCarousel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { legacyInsert, submitLead } from '@/lib/submitLead';
import { CheckCircle2, Handshake } from 'lucide-react';
import PageHero from '@/components/PageHero';

const Sponsor = () => {
  const [form, setForm] = useState({ company: '', name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await submitLead(
        {
          form: 'sponsor',
          name: form.name,
          email: form.email,
          payload: {
            company: form.company,
            message: form.message || null,
          },
        },
        () =>
          legacyInsert('sponsor_leads', {
            company: form.company,
            name: form.name,
            email: form.email,
            message: form.message || null,
          }),
      );
      setSubmitted(true);
    } catch {
      setError('Something went wrong - please email us directly instead.');
    }
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Sponsor Wild AI - Reach working AI builders</title>
        <meta
          name="description"
          content="Sponsor a Wild AI meetup and meet builders in person. Minneapolis is on the calendar, with chapters opening in San Francisco, Toronto, Chicago, and Austin."
        />
        <meta property="og:title" content="Sponsor Wild AI" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Helmet>
      <Navbar />

      <main className="pb-20 flex-grow">
        <PageHero
          eyebrow="Partner with us"
          icon={Handshake}
          title={<>Reach AI <span>builders</span>.</>}
          lede="Wild AI rooms are full of people who ship: engineers, founders, and researchers actively building with AI. Sponsors get their attention in person, not in a feed."
        />
        <div className="container mx-auto px-4 pt-14">

          {/* Why sponsor */}
          <div className="max-w-4xl mx-auto surface p-6 md:p-8 mb-16">
            <h2 className="section-title">WHY SPONSORS KEEP COMING BACK</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start"><span className="text-wildai-mint mr-2">→</span> Recruitment: meet your next AI hire in person, not in a pile of résumés</li>
              <li className="flex items-start"><span className="text-wildai-mint mr-2">→</span> Product feedback: demo to builders who will actually use (and break) your tool</li>
              <li className="flex items-start"><span className="text-wildai-mint mr-2">→</span> Brand trust: align with the community voice of local AI scenes, not a generic conference</li>
            </ul>
          </div>

          <div className="max-w-xl mx-auto mb-16 text-center">
            <h2 className="section-title">SPONSORSHIP</h2>
            <p className="font-display text-4xl font-semibold text-wildai-mint">$500 per event</p>
          </div>

          {/* Sponsors + photos */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="section-title text-center">TRUSTED BY</h2>
            <LogoCarousel />
          </div>

          {/* Lead form */}
          <div className="max-w-xl mx-auto">
            <h2 className="section-title text-center">SPONSOR AN EVENT</h2>
            <p className="text-center text-muted-foreground mb-8">
              Sponsorship is $500 per event. Tell us about your company and we will follow up.
            </p>
            {submitted ? (
              <div className="surface p-6 md:p-8 text-center">
                <CheckCircle2 className="w-10 h-10 text-wildai-mint mx-auto mb-3" />
                <p className="font-bold">Thanks - we'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="surface p-6 md:p-8 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sponsor-company">Company</Label>
                    <Input
                      id="sponsor-company"
                      required
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Acme AI"
                      className="bg-surface-deep/70"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sponsor-name">Your name</Label>
                    <Input
                      id="sponsor-name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="bg-surface-deep/70"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sponsor-email">Work email</Label>
                  <Input
                    id="sponsor-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@acme.ai"
                    className="bg-surface-deep/70"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sponsor-message">Message</Label>
                  <Textarea
                    id="sponsor-message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="What are you hoping to get out of sponsoring?"
                    className="bg-surface-deep/70 min-h-[100px]"
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full"
                >
                  {submitting ? 'SENDING…' : 'REQUEST SPONSOR INFO'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sponsor;
