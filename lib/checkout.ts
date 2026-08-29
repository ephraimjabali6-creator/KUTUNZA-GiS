import Stripe from 'stripe';
import { CAMPAIGN_DATA } from '../content/campaignData';
import { amountToMinorUnits } from './money';
import type { DonationInput } from './validation';
import { recordDonation } from './db';
import { getStripe, isDemoPayments, isStripeConfigured } from './stripe';

export async function createCheckoutSession(
  donation: DonationInput,
  origin: string
): Promise<{ url: string; sessionId?: string; demo?: boolean }> {
  if (isDemoPayments() && !isStripeConfigured()) {
    recordDonation({
      amount: donation.amount,
      currency: donation.currency,
      donorName: donation.donorName,
      donorEmail: donation.donorEmail,
      message: donation.message,
      isAnonymous: donation.isAnonymous,
      frequency: donation.frequency,
      stripeSessionId: `demo_${Date.now()}`,
    });
    const params = new URLSearchParams({
      demo: 'true',
      amount: String(donation.amount),
      currency: donation.currency,
    });
    return { url: `${origin}/thank-you?${params.toString()}`, demo: true };
  }

  const stripe = getStripe();
  const monthly = donation.frequency === 'monthly';

  // PayPal via Stripe Checkout: only offered if the connected Stripe account has
  // PayPal enabled. If the request asks for PayPal but the account can't do it,
  // Stripe will reject the session — so we fall back to card automatically.
  const wantsPaypal = donation.paymentMethod === 'paypal' && !monthly;
  const paymentMethodTypes: Stripe.Checkout.SessionCreateParams.PaymentMethodType[] = wantsPaypal
    ? ['card', 'paypal']
    : ['card'];

  // Coupon codes: validated against Stripe's own Promotion Codes so no extra
  // service or dependency is needed. Silently ignored if invalid/expired —
  // the donor already saw a validation error client-side before reaching here.
  let discounts: Stripe.Checkout.SessionCreateParams.Discount[] | undefined;
  if (donation.couponCode) {
    const found = await stripe.promotionCodes.list({ code: donation.couponCode, active: true, limit: 1 });
    if (found.data[0]) {
      discounts = [{ promotion_code: found.data[0].id }];
    }
  }

  const session = await stripe.checkout.sessions.create({
    mode: monthly ? 'subscription' : 'payment',
    payment_method_types: paymentMethodTypes,
    customer_email: donation.donorEmail || undefined,
    customer_creation: !monthly ? 'always' : undefined,
    success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/donate?canceled=true`,
    allow_promotion_codes: discounts ? undefined : true,
    discounts,
    payment_intent_data: !monthly
      ? { setup_future_usage: donation.saveCard ? 'on_session' : undefined }
      : undefined,
    metadata: {
      donorName: donation.donorName,
      donorEmail: donation.donorEmail,
      message: donation.message.slice(0, 400),
      isAnonymous: donation.isAnonymous ? 'true' : 'false',
      frequency: donation.frequency,
      giftAid: donation.giftAid ? 'true' : 'false',
      coverFees: donation.coverFees ? 'true' : 'false',
      paymentMethod: donation.paymentMethod,
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: donation.currency.toLowerCase(),
          unit_amount: amountToMinorUnits(donation.amount),
          recurring: monthly ? { interval: 'month' } : undefined,
          product_data: {
            name: CAMPAIGN_DATA.projectTitle,
            description: monthly
              ? 'Monthly gift for Girls in School'
              : 'One-time gift for Girls in School',
            images: [`${origin}/images/hero-assembly.jpg`],
          },
        },
      },
    ],
  });

  if (!session.url) {
    throw new Error('Stripe did not return a checkout URL.');
  }

  return { url: session.url, sessionId: session.id };
}

export function donationFromCheckoutSession(session: Stripe.Checkout.Session) {
  const amount = (session.amount_total || 0) / 100;
  const currency = (session.currency || 'usd').toUpperCase();
  return {
    amount,
    currency,
    donorName: session.metadata?.donorName || session.customer_details?.name || 'Supporter',
    donorEmail: session.metadata?.donorEmail || session.customer_details?.email || '',
    message: session.metadata?.message || '',
    isAnonymous: session.metadata?.isAnonymous === 'true',
    frequency: (session.metadata?.frequency === 'monthly' ? 'monthly' : 'one_time') as
      | 'one_time'
      | 'monthly',
    stripePaymentToken: String(session.payment_intent || session.subscription || session.id),
    stripeSessionId: session.id,
  };
}
