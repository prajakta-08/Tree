import type { VercelRequest, VercelResponse } from '@vercel/node';

const BREVO_API = 'https://api.brevo.com/v3';
const INBOX = process.env.CONTACT_INBOX || 'hello@themangoseed.com';
const SENDER = process.env.CONTACT_SENDER || 'no-reply@themangoseed.com';

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, message, company } = req.body || {};

  // Honeypot
  if (company && String(company).trim() !== '') {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email.' });
  }
  if (String(message).length > 5000) {
    return res.status(400).json({ error: 'Message too long.' });
  }

  if (!process.env.BREVO_API_KEY) {
    console.error('BREVO_API_KEY is not set');
    return res.status(500).json({ error: 'Service not configured.' });
  }

  const html = `
    <h2>New message via themangoseed.com</h2>
    <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
    <hr>
    <p style="white-space:pre-line">${escapeHtml(message)}</p>
  `;

  try {
    const brevoRes = await fetch(`${BREVO_API}/smtp/email`, {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { email: SENDER, name: 'The Mango Seed' },
        to: [{ email: INBOX, name: 'The Mango Seed Inbox' }],
        replyTo: { email, name },          // so you can hit Reply directly
        subject: `Contact form — ${name}`,
        htmlContent: html,
      }),
    });

    if (!brevoRes.ok) {
      const body = await brevoRes.text();
      console.error('Brevo SMTP error', brevoRes.status, body);
      return res.status(500).json({ error: 'Could not send right now.' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Network error.' });
  }
}
