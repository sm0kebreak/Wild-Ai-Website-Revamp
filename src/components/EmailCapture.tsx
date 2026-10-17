import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { submitLead } from '@/lib/submitLead';
import { Loader2, CheckCircle2, Mail } from 'lucide-react';

interface EmailCaptureProps {
  /** Where the signup came from: 'join' | 'footer' | 'chapter' | 'notify' | 'events' */
  source: string;
  chapterId?: string;
  cityRequested?: string;
  title?: string;
  description?: string;
  compact?: boolean;
  /** Homepage photograph: the form only, no card. */
  bare?: boolean;
}

/**
 * Reusable email capture form. Posts to /api/lead, which stores the address privately.
 */
const EmailCapture = ({
  source,
  chapterId,
  cityRequested,
  title = 'JOIN THE COMMUNITY',
  description = 'Event invites, speaker lineups, and recaps. No spam, unsubscribe anytime.',
  compact = false,
  bare = false,
}: EmailCaptureProps) => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error('Please enter a valid email');
      return;
    }
    setSubmitting(true);
    try {
      const normalized = email.trim().toLowerCase();
      await submitLead({
        form: 'email',
        email: normalized,
        payload: { source, chapterId: chapterId ?? null, cityRequested: cityRequested ?? null },
      });
      setDone(true);
      toast.success("You're on the list!");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : 'Signup failed - please try again');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className={bare ? 'form-success p-6 text-center' : `form-success surface ${compact ? 'p-6' : 'p-10'} text-center`}>
        <CheckCircle2 className="w-10 h-10 text-wildai-mint mx-auto mb-3" />
        <p className="font-mono font-bold text-wildai-mint">YOU'RE ON THE LIST</p>
        <p className="text-sm text-muted-foreground mt-2">Jake has this address for event invites.</p>
      </div>
    );
  }

  return (
    <div className={bare ? '' : `surface ${compact ? 'p-6' : 'p-8'}`}>
      {!bare && (
        <div className="flex items-center gap-2 mb-3">
          <Mail className="w-5 h-5 text-wildai-mint" />
          <h3 className="text-lg font-display font-semibold text-wildai-mint">{title}</h3>
        </div>
      )}
      {!bare && description ? <p className="text-sm text-muted-foreground mb-4">{description}</p> : null}
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={
            bare
              ? 'h-12 flex-grow rounded-full border-white/40 bg-black/60 text-white placeholder:text-white/80'
              : 'flex-grow'
          }
          maxLength={255}
          required
        />
        <Button
          type="submit"
          disabled={submitting}
          className="whitespace-nowrap"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'SUBSCRIBE'}
        </Button>
      </form>
      <p className={`mt-3 text-xs ${bare ? 'text-white/85' : 'text-muted-foreground'}`}>
        By subscribing you agree to receive chapter emails. Unsubscribe anytime.
      </p>
    </div>
  );
};

export default EmailCapture;
