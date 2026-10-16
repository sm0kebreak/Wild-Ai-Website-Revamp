import { supabase } from '@/integrations/supabase/client';

export type LeadForm = 'sponsor' | 'speaker' | 'email' | 'show-and-tell' | 'chapter';

export type LeadInput = {
  form: LeadForm;
  name?: string;
  email: string;
  payload?: Record<string, unknown>;
};

export type LeadResult = {
  ok: true;
  id: string;
  emailed: boolean;
  legacy: boolean;
};

const LEGACY_TIMEOUT_MS = 4000;

/** Best-effort write to the original Supabase table or edge function. */
async function withTimeout(work: Promise<boolean>) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<boolean>((resolve) => {
    timer = setTimeout(() => resolve(false), LEGACY_TIMEOUT_MS);
  });
  try {
    return await Promise.race([work.catch(() => false), timeout]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export async function submitLead(
  input: LeadInput,
  legacy?: () => Promise<boolean>,
): Promise<LeadResult> {
  const payload = { ...(input.payload ?? {}) };
  delete payload.image_base64;
  delete payload.imageBase64;

  const apiPromise = fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...input, payload }),
  }).then(async (response) => {
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data?.ok) {
      throw new Error(data?.error || 'Could not save this submission');
    }
    return data as { ok: true; id: string; emailed: boolean };
  });

  const legacyPromise = legacy ? withTimeout(legacy()) : Promise.resolve(false);
  const [saved, legacyOk] = await Promise.allSettled([apiPromise, legacyPromise]);

  if (saved.status === 'fulfilled') {
    return {
      ok: true,
      id: saved.value.id,
      emailed: Boolean(saved.value.emailed),
      legacy: legacyOk.status === 'fulfilled' && legacyOk.value,
    };
  }
  if (legacyOk.status === 'fulfilled' && legacyOk.value) {
    return { ok: true, id: 'supabase', emailed: false, legacy: true };
  }
  throw saved.reason instanceof Error ? saved.reason : new Error('Could not save this submission');
}

export async function legacyInsert(
  table: 'chapter_subscribers' | 'sponsor_leads' | 'chapter_applications',
  row: Record<string, unknown>,
) {
  const { error } = await supabase.from(table).insert(row as never);
  if (error && error.code !== '23505') throw error;
  return true;
}
