import type { NextApiRequest, NextApiResponse } from 'next';
import { isDemoPayments, isStripeConfigured } from '../../lib/stripe';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    ok: true,
    service: 'kutunza',
    stripe: isStripeConfigured(),
    demoPayments: isDemoPayments(),
    database: Boolean(process.env.DATABASE_URL),
    email: Boolean(process.env.RESEND_API_KEY),
  });
}
