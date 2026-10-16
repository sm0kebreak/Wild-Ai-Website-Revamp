import { put } from '@vercel/blob';

// Public forms POST here. One JSON object is stored in the private Vercel Blob
// store `wild-ai-leads` at leads/<form>/<timestamp>-<suffix>.json.
// Email is not sent. Success is the Blob write. The response is
// { ok: true, id: pathname }. pathname is not a public URL.
// BLOB_READ_WRITE_TOKEN is read only on the server.

const FORMS = new Set(['sponsor', 'speaker', 'email', 'show-and-tell', 'chapter']);
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
const SOCIAL_KEYS = new Set([
  'linkedin',
  'linkedin_url',
  'linkedinUrl',
  'x',
  'x_url',
  'xUrl',
  'twitter',
  'twitter_url',
]);

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

export function GET() {
  return new Response(null, { status: 405, headers: { Allow: 'POST' } });
}

function isLinkedInOrX(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return false;
  const host = url.hostname.toLowerCase().replace(/\.$/, '').replace(/^www\./, '');
  return host === 'linkedin.com' || host.endsWith('.linkedin.com') || host === 'x.com' || host === 'twitter.com';
}

function cleanPayload(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const payload = {};
  for (const [key, item] of Object.entries(value)) {
    if (IMAGE_KEYS.has(key)) continue;
    if (typeof item === 'string') {
      const trimmed = item.trim();
      if (!trimmed || trimmed.length > 8000 || trimmed.startsWith('data:')) continue;
      payload[key] = trimmed;
      continue;
    }
    if (item == null || typeof item === 'number' || typeof item === 'boolean') {
      payload[key] = item;
    }
  }
  return payload;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const form = String(body?.form || '');
  const email = String(body?.email || '').trim().toLowerCase();
  const name = String(body?.name || '').trim().slice(0, 200);
  const payload = cleanPayload(body?.payload);

  if (!FORMS.has(form)) return json({ error: 'Unknown form' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Valid email required' }, 400);
  if ((form === 'sponsor' || form === 'speaker' || form === 'chapter' || form === 'show-and-tell') && !name) {
    return json({ error: 'Name required' }, 400);
  }
  for (const key of SOCIAL_KEYS) {
    if (key in payload && !isLinkedInOrX(payload[key])) {
      return json({ error: 'LinkedIn or X URL only' }, 400);
    }
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return json({ error: 'Could not store the submission' }, 500);

  const record = {
    form,
    name,
    email,
    payload,
    receivedAt: new Date().toISOString(),
  };

  try {
    const stored = await put(`leads/${form}/${Date.now()}.json`, JSON.stringify(record), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: true,
      token,
    });
    const id = stored.pathname;
    if (typeof id !== 'string' || !id.startsWith('leads/') || id.includes('://')) {
      return json({ error: 'Could not store the submission' }, 500);
    }
    return json({ ok: true, id });
  } catch {
    return json({ error: 'Could not store the submission' }, 500);
  }
}
