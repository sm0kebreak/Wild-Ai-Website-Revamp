import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { submitLead } from '@/lib/submitLead';

const ShowAndTellForm = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    projectName: '',
    description: '',
    linkedinUrl: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.projectName || !form.description || !form.email || !form.linkedinUrl) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);

    try {
      await submitLead({
        form: 'show-and-tell',
        name: form.name,
        email: form.email,
        payload: {
          projectName: form.projectName,
          description: form.description,
          linkedinUrl: form.linkedinUrl,
        },
      });

      setSubmitted(true);
      toast({ title: "You're in!", description: "Jake has your Show & Tell signup." });
    } catch (err) {
      console.error('Submission error:', err);
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="form-success surface p-6 text-center md:p-8">
        <CheckCircle className="w-10 h-10 text-wildai-mint mx-auto mb-3" />
        <h3 className="text-xl font-display font-semibold mb-2">YOU'RE IN!</h3>
        <p className="text-muted-foreground">Jake has your Show & Tell signup.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 surface space-y-5">
      <div>
        <h3 className="text-lg font-display font-semibold mb-1">SIGN UP FOR SHOW & TELL</h3>
        <p className="text-muted-foreground text-sm">Reserve your spot to show off what you've built.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sat-name">Your Name</Label>
        <Input
          id="sat-name"
          placeholder="Jane Doe"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          maxLength={100}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sat-linkedin">LinkedIn or X URL</Label>
        <Input
          id="sat-linkedin"
          type="url"
          placeholder="https://linkedin.com/in/… or https://x.com/…"
          value={form.linkedinUrl}
          onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
          maxLength={255}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sat-project">Project Name</Label>
        <Input
          id="sat-project"
          placeholder="My Awesome AI Project"
          value={form.projectName}
          onChange={(e) => setForm({ ...form, projectName: e.target.value })}
          maxLength={100}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sat-desc">Short Description</Label>
        <Input
          id="sat-desc"
          placeholder="What does your project do?"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value.slice(0, 150) })}
          maxLength={150}
        />
        <p className="text-xs text-muted-foreground text-right">{form.description.length}/150</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sat-email">Email</Label>
        <Input
          id="sat-email"
          type="email"
          placeholder="jane@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          maxLength={255}
        />
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full"
      >
        {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : "Reserve My Spot"}
      </Button>
    </form>
  );
};

export default ShowAndTellForm;
