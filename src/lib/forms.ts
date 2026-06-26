// Form submission helpers.
//
// HANDOFF NOTE FOR TECH TEAM:
// These endpoints are placeholders. Wire them on the server side:
//   POST /api/newsletter  { email, source } -> { ok: true }
//   POST /api/contact     { name, email, message } -> { ok: true }
//
// Recommended backends: Vercel Serverless Functions calling Brevo/Mailchimp/Resend.
// Honeypot field "company" should be ignored if present (anti-spam).

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface NewsletterPayload {
  email: string;
  source?: string;
  company?: string; // honeypot
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  company?: string; // honeypot
}

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export function validateNewsletter(p: NewsletterPayload): string | null {
  if (!p.email.trim()) return 'Please enter your email address.';
  if (!isValidEmail(p.email)) return 'That email address looks incomplete.';
  if (p.company && p.company.trim()) return ''; // silent honeypot reject
  return null;
}

export function validateContact(p: ContactPayload): string | null {
  if (!p.name.trim()) return 'Please share your name.';
  if (!isValidEmail(p.email)) return 'Please enter a valid email address.';
  if (p.message.trim().length < 10) return 'Your message is a little short — tell us a bit more.';
  if (p.company && p.company.trim()) return '';
  return null;
}

import { trackEvent } from './analytics';

export async function submitNewsletter(p: NewsletterPayload): Promise<void> {
  const res = await fetch('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(p),
  });
  if (!res.ok) {
    throw new Error(`Subscription failed (${res.status})`);
  }
  trackEvent('newsletter_submit', { source: p.source || 'unknown' });
}

export async function submitContact(p: ContactPayload): Promise<void> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(p),
  });
  if (!res.ok) {
    throw new Error(`Message failed to send (${res.status})`);
  }
  trackEvent('contact_submit');
}
