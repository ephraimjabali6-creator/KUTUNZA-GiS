import Stripe from 'stripe';

let stripe: Stripe | null = null;

export function isStripeConfigured(): boolean {
  const key = process.env.STRIPE_SECRET_KEY || '';
  return key.startsWith('sk_test_') || key.startsWith('sk_live_');
}

export function isDemoPayments(): boolean {
  return String(process.env.DEMO_PAYMENTS).toLowerCase() === 'true';
}

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || (!key.startsWith('sk_test_') && !key.startsWith('sk_live_'))) {
    throw new Error('STRIPE_SECRET_KEY is not configured.');
  }
  if (!stripe) {
    stripe = new Stripe(key, { apiVersion: '2023-10-16' });
  }
  return stripe;
}

export function siteOrigin(reqHost?: string | string[]): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  const host = Array.isArray(reqHost) ? reqHost[0] : reqHost;
  return host ? `http://${host}` : 'http://localhost:3000';
}
