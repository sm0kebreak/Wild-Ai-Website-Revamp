import { put } from '@vercel/blob';

// Public forms POST here. JSON is stored in the private Vercel Blob store
// `wild-ai-leads` at leads/<form>/<timestamp>-<suffix>.json.
// The response never includes a blob URL. GET is not allowed.
// BLOB_READ_WRITE_TOKEN is read only on the server.
//
// After the record is ready, the handler tries to email jake@wildai.us.
// Missing mail keys, or a provider error, still store the submission.
// The page must not tell the visitor that an email was sent.
//
// Resend (preferred when RESEND_API_KEY is set):
//   RESEND_API_KEY       required for this provider
//   RESEND_FROM_EMAIL    optional verified sender
// Postmark (only when RESEND_API_KEY is unset):
//   POSTMARK_SERVER_TOKEN   required
//   POSTMARK_FROM_EMAIL     required verified sender
//   POSTMARK_MESSAGE_STREAM optional, default outbound

const FORMS = new Set(['sponsor', 'speaker', 'email', 'show-and-tell', 'chapter']);
const NOTIFY_TO = 'jake@wildai.us';
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

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

export function GET() {
  return new Response(null, { status: 405, headers: { Allow: 'POST' } });
}

function cleanPayload(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const payload = {};
  for (const [key, item] of Object.entries(value)) {
    if (IMAGE_KEYS.has(key)) continue;
    if (typeof item === 'string') {
      if (item.length > 8000 || item.trimStart().startsWith('data:')) continue;
      payload[key] = item;
      continue;
    }
    if (item == null || typeof item === 'number' || typeof item === 'boolean') {
      payload[key] = item;
    }
  }
  return payload;
}

function textOf(record) {
  return [
    `Form: ${record.form}`,
    `Name: ${record.name || '(none)'}`,
    `Email: ${record.email}`,
    '',
    JSON.stringify(record.payload, null, 2),
  ].join('\n');
}

async function notify(record) {
  const subject = `Wild AI ${record.form}: ${record.name || record.email}`;
  const text = textOf(record);
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL?.trim() || 'Wild AI <onboarding@resend.dev>',
        to: [NOTIFY_TO],
        subject,
        text,
      }),
    });
    if (!response.ok) throw new Error(`Resend ${response.status}`);
    return 'resend';
  }

  const postmarkToken = process.env.POSTMARK_SERVER_TOKEN?.trim();
  const postmarkFrom = process.env.POSTMARK_FROM_EMAIL?.trim();
  if (postmarkToken && postmarkFrom) {
    const response = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        'X-Postmark-Server-Token': postmarkToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        From: postmarkFrom,
        To: NOTIFY_TO,
        Subject: subject,
        TextBody: text,
        MessageStream: process.env.POSTMARK_MESSAGE_STREAM?.trim() || 'outbound',
      }),
    });
    if (!response.ok) throw new Error(`Postmark ${response.status}`);
    return 'postmark';
  }

  return null;
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

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return json({ error: 'Could not store the submission' }, 500);

  const record = {
    form,
    name,
    email,
    payload,
    receivedAt: new Date().toISOString(),
  };

  let emailed = false;
  let emailChannel = null;
  try {
    emailChannel = await notify(record);
    emailed = Boolean(emailChannel);
  } catch {
    emailed = false;
    emailChannel = null;
  }

  try {
    await put(`leads/${form}/${Date.now()}.json`, JSON.stringify({ ...record, emailed, emailChannel }), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: true,
      token,
    });
    return json({ ok: true, emailed });
  } catch {
    return json({ error: 'Could not store the submission' }, 500);
  }
}
