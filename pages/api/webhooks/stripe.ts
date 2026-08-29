import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { claimWebhookEvent, recordDonation } from '../../../lib/db';
import { sendDonationReceipt } from '../../../lib/email';
import { getStripe, isStripeConfigured } from '../../../lib/stripe';
import { donationFromCheckoutSession } from '../../../lib/checkout';

export const config = {
  api: { bodyParser: false },
};

async function buffer(readable: NextApiRequest) {
  const chunks: Buffer[] = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const signature = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (isStripeConfigured() && webhookSecret && typeof signature === 'string') {
      event = getStripe().webhooks.constructEvent(buf, signature, webhookSecret);
    } else {
      return res.status(400).json({ error: 'Webhook signature verification is required.' });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid signature';
    return res.status(400).send(`Webhook Error: ${message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const isFirstDelivery = await claimWebhookEvent(event.id);
    if (!isFirstDelivery) {
      // Stripe retried a webhook we already processed — acknowledge without redoing work.
      return res.status(200).json({ received: true, type: event.type, duplicate: true });
    }
    const session = event.data.object as Stripe.Checkout.Session;
    const donation = donationFromCheckoutSession(session);
    const receipt = recordDonation(donation);
    if (receipt && donation.donorEmail) {
      await sendDonationReceipt({
        recipient: donation.donorEmail,
        donorName: donation.donorName,
        amount: donation.amount,
        currency: donation.currency,
        receiptId: receipt.id,
        frequency: donation.frequency,
        giftAid: session.metadata?.giftAid === 'true',
      }).catch((e) => console.error('[webhook email]', e));
    }
  }

  return res.status(200).json({ received: true, type: event.type });
}
