import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24-ac' as any,
});

const PRICES: Record<string, Record<string, number>> = {
  ebook: { USD: 7.99, GBP: 6.99, AED: 29 },
  paperback: { USD: 16.99, GBP: 13.99, AED: 62 },
  hardcover: { USD: 29.99, GBP: 23.99, AED: 110 },
  audiobook: { USD: 14.99, GBP: 12.99, AED: 55 },
};

const NAMES: Record<string, string> = {
  ebook: 'The Mango Seed — E-Book',
  paperback: 'The Mango Seed — Paperback',
  hardcover: 'The Mango Seed — Hardcover Collector\'s Edition',
  audiobook: 'The Mango Seed — Audiobook',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { edition, currency } = req.body || {};

  if (!edition || !currency || !PRICES[edition] || !PRICES[edition][currency]) {
    return res.status(400).json({ error: 'Invalid edition or currency selection.' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Stripe is not configured.' });
  }

  const price = PRICES[edition][currency];

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      payment_intent_data: { capture_method: 'manual' }, // authorize only for pre-order
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: NAMES[edition],
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin || 'https://themangoseed.com'}/preorder?success=true&session_id={CHECKOUT_SESSION_ID}&edition=${edition}`,
      cancel_url: `${req.headers.origin || 'https://themangoseed.com'}/preorder?cancelled=true`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Payment session creation failed.' });
  }
}
