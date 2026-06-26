import type { VercelRequest, VercelResponse } from '@vercel/node';

const BREVO_API = 'https://api.brevo.com/v3';
const NEWSLETTER_LIST_ID = Number(process.env.BREVO_NEWSLETTER_LIST_ID || '0');

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, source = 'unknown', company } = req.body || {};

  // Honeypot — bot fills it; return 200 so they don't retry
  if (company && String(company).trim() !== '') {
    return res.status(200).json({ ok: true });
  }

  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Please provide a valid email.' });
  }

  if (!process.env.BREVO_API_KEY) {
    console.error('BREVO_API_KEY is not set');
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  try {
    const brevoRes = await fetch(`${BREVO_API}/contacts`, {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        listIds: NEWSLETTER_LIST_ID ? [NEWSLETTER_LIST_ID] : [],
        attributes: { SOURCE: source },
        updateEnabled: true,        // upsert if already exists
      }),
    });

    if (!brevoRes.ok) {
      const body = await brevoRes.text();
      console.error('Brevo error', brevoRes.status, body);
      // Don't leak Brevo errors to the client
      return res.status(500).json({ error: 'Could not subscribe right now.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Network error.' });
  }
}
