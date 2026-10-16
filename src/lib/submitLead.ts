export type LeadForm = 'sponsor' | 'speaker' | 'email' | 'show-and-tell' | 'chapter';

export type LeadInput = {
  form: LeadForm;
  name?: string;
  email: string;
  payload?: Record<string, unknown>;
};

export type LeadResult = {
  ok: true;
};

const IMAGE_KEYS = new Set([
  'image',
  'image_base64',
  'imageBase64',
  'image_url',
  'imageUrl',
  'imageName',
  'image_name',
  'headshot',
  'photo',
  'file',
  'preview',
]);

function cleanPayload(payload: Record<string, unknown> | undefined) {
  const next: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(payload ?? {})) {
    if (IMAGE_KEYS.has(key)) continue;
    if (typeof value === 'string' && (value.length > 8000 || value.trimStart().startsWith('data:'))) continue;
    next[key] = value;
  }
  return next;
}

/** Store a public form in the private Vercel Blob store via POST /api/lead. */
export async function submitLead(input: LeadInput): Promise<LeadResult> {
  const response = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...input, payload: cleanPayload(input.payload) }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data?.ok) {
    throw new Error(typeof data?.error === 'string' ? data.error : 'Could not save this submission');
  }
  return { ok: true };
}
