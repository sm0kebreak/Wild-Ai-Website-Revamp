import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { submitLead } from '@/lib/submitLead';
import { useChapters } from '@/hooks/useChapters';
import PageHero from '@/components/PageHero';
import { CheckCircle2, Mail, Sparkles, CalendarDays } from 'lucide-react';

const Join = () => {
  const { data: chapters } = useChapters();
  const [email, setEmail] = useState('');
  const [city, setCity] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error' | 'duplicate'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const chapter = (chapters ?? []).find((c) => c.slug === city);
    const normalized = email.toLowerCase().trim();
    try {
      await submitLead({
        form: 'email',
        email: normalized,
        payload: { source: 'join', city: city || null, chapterId: chapter?.id ?? null },
      });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Seo
        title="Join | Wild AI"
        description="Get the next Wild AI invite for your city."
        path="/join"
      />
      <Navbar />

      <main className="pb-20 flex-grow">
        <PageHero
          eyebrow="Get on the list"
          title={<>Join <span>Wild AI</span>.</>}
          lede="Join the email list. Demo lineups and recaps from the builders around you. All ages. Free."
        />
        <div className="container mx-auto px-4 pt-14">

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Signup form */}
            <div className="surface p-6 md:p-8">
              {status === 'done' ? (
                <div className="form-success py-10 text-center">
                  <CheckCircle2 className="w-12 h-12 text-wildai-mint mx-auto mb-4" />
                  <h2 className="text-xl font-display font-semibold mb-2">YOU'RE IN</h2>
                  <p className="text-muted-foreground mb-6">
                    Jake has your signup for event invites.
                  </p>
                  <Link to="/chapters">
                    <Button variant="outline">BROWSE CHAPTERS</Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-xl font-display font-semibold text-wildai-mint">SIGN UP</h2>
                  <div className="space-y-2">
                    <Label htmlFor="join-email">Email</Label>
                    <Input
                      id="join-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="bg-surface-deep/70"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Your city</Label>
                    <Select value={city} onValueChange={setCity}>
                      <SelectTrigger className="bg-surface-deep/70">
                        <SelectValue placeholder="Choose a chapter" />
                      </SelectTrigger>
                      <SelectContent>
                        {(chapters ?? []).map((c) => (
                          <SelectItem key={c.slug} value={c.slug}>
                            {c.city}
                            {c.status === 'launching' ? ' (launching)' : ''}
                          </SelectItem>
                        ))}
                        <SelectItem value="other">Somewhere else</SelectItem>
                      </SelectContent>
                    </Select>
                    {city === 'other' && (
                      <p className="text-xs text-muted-foreground">
                        No chapter near you yet - we'll notify you as new cities launch.
                      </p>
                    )}
                  </div>
                  {status === 'error' && (
                    <p className="text-sm text-destructive">
                      Something went wrong - please try again.
                    </p>
                  )}
                  <Button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full"
                  >
                    {status === 'submitting' ? 'JOINING…' : 'JOIN THE LIST'}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Already on the list? You won't get duplicates - this just updates your city.
                  </p>
                </form>
              )}
            </div>

            {/* What you get */}
            <div className="space-y-4">
              <div className="surface p-6">
                <Mail className="w-6 h-6 text-wildai-mint mb-3" />
                <h3 className="font-display font-semibold mb-1">EVENT INVITES FIRST</h3>
                <p className="text-sm text-muted-foreground">
                  Subscribers get the invite days before public announcements - matters when the
                  room fills up.
                </p>
              </div>
              <div className="surface p-6">
                <Sparkles className="w-6 h-6 text-wildai-mint mb-3" />
                <h3 className="font-display font-semibold mb-1">SPEAKER LINEUPS & RECAPS</h3>
                <p className="text-sm text-muted-foreground">
                  Who's demoing, what they showed, and the links - even if you had to miss it.
                </p>
              </div>
              <div className="surface p-6">
                <CalendarDays className="w-6 h-6 text-wildai-mint mb-3" />
                <h3 className="font-display font-semibold mb-1">CITY-BY-CITY UPDATES</h3>
                <p className="text-sm text-muted-foreground">
                  New chapters, launch dates, and venue changes for the city you pick - and only
                  that city.
                </p>
              </div>
              <div className="bg-primary/25 surface p-6">
                <h3 className="font-display font-semibold text-wildai-mint mb-1">WANT TO DO MORE THAN ATTEND?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Demos and chapter organizing are open to everyone on the list.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Link to="/speak">
                    <Button size="sm" variant="outline">GIVE A TALK</Button>
                  </Link>
                  <Link to="/start-a-chapter">
                    <Button size="sm" variant="outline">START A CHAPTER</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Join;
