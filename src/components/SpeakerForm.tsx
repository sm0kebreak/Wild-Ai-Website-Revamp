import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { submitLead } from '@/lib/submitLead';
import { DEMO_SIGNUP } from '@/lib/meetupSchedule';
import { toast } from 'sonner';
import { Loader2, CheckCircle2 } from 'lucide-react';

const SpeakerForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', linkedin_url: '',
    description: '', what_building: '',
  });

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error('Name required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return toast.error('Valid email required');
    if (!form.description.trim()) return toast.error('Description required');
    if (!form.what_building.trim()) return toast.error("Tell us what you're building");

    setSubmitting(true);
    try {
      await submitLead({
        form: 'speaker',
        name: form.name,
        email: form.email,
        payload: {
          phone: form.phone,
          linkedin_url: form.linkedin_url,
          description: form.description,
          what_building: form.what_building,
        },
      });
      setDone(true);
      toast.success('Jake has your application.');
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="form-success glass flex h-full flex-col items-center justify-center p-6 md:p-10 text-center">
        <CheckCircle2 className="w-14 h-14 text-accent mb-4" />
        <h3 className="font-display text-xl font-semibold mb-3">Application received</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Jake has your application and will review it.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass flex h-full flex-col gap-5 p-6 md:p-8">
      <div>
        <p className="kicker">Take the mic</p>
        <h3 className="mt-3 font-display text-xl font-semibold">Apply to speak</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {DEMO_SIGNUP} No slides. All ages. Free.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input id="name" value={form.name} onChange={(e) => update('name', e.target.value)} required maxLength={200} />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required maxLength={255} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} maxLength={40} />
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn or X URL</Label>
          <Input id="linkedin" type="url" name="linkedin_url" value={form.linkedin_url} onChange={(e) => update('linkedin_url', e.target.value)} placeholder="https://linkedin.com/in/… or https://x.com/…" maxLength={500} />
        </div>
      </div>

      <div>
        <Label htmlFor="description">About you *</Label>
        <Textarea id="description" value={form.description} onChange={(e) => update('description', e.target.value)} rows={4} required maxLength={5000}
          placeholder="A short bio - who you are and what you do." />
      </div>

      <div>
        <Label htmlFor="building">What are you building? *</Label>
        <Textarea id="building" value={form.what_building} onChange={(e) => update('what_building', e.target.value)} rows={4} required maxLength={5000}
          placeholder="The project, idea, or experiment you'd like to share." />
      </div>

      <Button type="submit" disabled={submitting} className="mt-auto w-full py-6">
        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit application'}
      </Button>
    </form>
  );
};

export default SpeakerForm;
