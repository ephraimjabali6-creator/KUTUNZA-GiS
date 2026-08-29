import type { NextApiRequest, NextApiResponse } from 'next';
import { parseDonationBody } from '../../lib/validation';
import { rateLimit } from '../../lib/rateLimit';
import { createCheckoutSession } from '../../lib/checkout';
import { isDemoPayments, isStripeConfigured, siteOrigin } from '../../lib/stripe';

const idempotency = new Map<string, { url: string; demo?: boolean }>();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || 'unknown';
  if (!rateLimit(`checkout:${ip}`, 8, 60_000)) {
    return res.status(429).json({ error: 'Too many checkout attempts. Please wait a minute.' });
  }

  const parsed = parseDonationBody(req.body);
  if (!parsed.ok) {
    return res.status(400).json({ error: parsed.error });
  }

  const idem = String(req.headers['idempotency-key'] || '');
  if (idem && idempotency.has(idem)) {
    return res.status(200).json(idempotency.get(idem)!);
  }

  if (!isStripeConfigured() && !isDemoPayments()) {
    return res.status(503).json({
      error: 'Payments are not configured yet. Add STRIPE_SECRET_KEY, or set DEMO_PAYMENTS=true for local preview.',
    });
  }

  try {
    const allowedOrigin = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');
    const requestOrigin = (req.headers.origin as string) || '';
    // Only trust the Origin header if it matches the configured site URL — otherwise
    // an attacker could point Stripe's success/cancel redirect at another domain.
    const origin = allowedOrigin && requestOrigin === allowedOrigin ? requestOrigin : siteOrigin(req.headers.host);
    const session = await createCheckoutSession(parsed.data, origin);
    const payload = { url: session.url, demo: session.demo || false };
    if (idem) idempotency.set(idem, payload);
    return res.status(200).json(payload);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Could not start checkout.';
    console.error('[checkout]', message);
    return res.status(500).json({ error: message });
  }
}
