import { put } from '@vercel/blob';

const FORMS = new Set(['sponsor', 'speaker', 'email', 'show-and-tell', 'chapter']);
const NOTIFY_TO = 'jake@wildai.us';

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

const textOf = (record) =>
  [
    `Form: ${record.form}`,
    `Name: ${record.name || '(none)'}`,
    `Email: ${record.email}`,
    '',
    JSON.stringify(record.payload, null, 2),
  ].join('\n');

async function notify(record) {
  const subject = `Wild AI ${record.form}: ${record.name || record.email}`;
  const text = textOf(record);
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'Wild AI <onboarding@resend.dev>',
        to: [NOTIFY_TO],
        subject,
        text,
      }),
    });
    if (!response.ok) throw new Error(`Resend ${response.status}`);
    return 'resend';
  }

  const postmarkToken = process.env.POSTMARK_SERVER_TOKEN;
  const postmarkFrom = process.env.POSTMARK_FROM_EMAIL;
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
        MessageStream: process.env.POSTMARK_MESSAGE_STREAM || 'outbound',
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
  const payload = body?.payload && typeof body.payload === 'object' ? body.payload : {};
  delete payload.image_base64;
  delete payload.imageBase64;

  if (!FORMS.has(form)) return json({ error: 'Unknown form' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Valid email required' }, 400);
  if ((form === 'sponsor' || form === 'speaker' || form === 'chapter' || form === 'show-and-tell') && !name) {
    return json({ error: 'Name required' }, 400);
  }

  const record = {
    form,
    name,
    email,
    payload,
    receivedAt: new Date().toISOString(),
  };

  let emailed = false;
  let emailChannel = null;
  let emailError = null;
  try {
    emailChannel = await notify(record);
    emailed = Boolean(emailChannel);
  } catch (error) {
    emailError = error instanceof Error ? error.message : 'Email failed';
  }

  try {
    const blob = await put(`leads/${form}/${Date.now()}.json`, JSON.stringify({ ...record, emailed, emailChannel, emailError }), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: true,
    });
    return json({ ok: true, id: blob.pathname, emailed, emailChannel, emailError });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not store the submission';
    return json({ error: message }, 500);
  }
}
