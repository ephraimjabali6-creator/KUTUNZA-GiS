import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Donations are recorded only after Stripe confirms payment.
 * This endpoint exists so older clients are redirected to Checkout.
 */
export { default } from './checkout_sessions';
