import type { VercelRequest, VercelResponse } from '@vercel/node';
import Razorpay from 'razorpay';

const PRICES: Record<string, number> = {
    ebook: 349,
    paperback: 599,
    hardcover: 1199,
    audiobook: 499,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { edition } = req.body || {};

    if (!edition || typeof PRICES[edition] === 'undefined') {
        return res.status(400).json({ error: 'Invalid edition selection.' });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        console.error('Razorpay credentials are not set');
        return res.status(500).json({ error: 'Razorpay is not configured.' });
    }

    try {
        const rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        });

        const price = PRICES[edition];

        const order = await rzp.orders.create({
            amount: price * 100,
            currency: 'INR',
            receipt: `mango-${Date.now()}`,
        });

        return res.status(200).json({
            id: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.RAZORPAY_KEY_ID,
        });

    } catch (err: any) {
        console.error("Razorpay Error:", err);

        return res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    }
}