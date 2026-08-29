import { isSupportedCurrency, type CurrencyCode } from './money';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_AMOUNT = 1;
const MAX_AMOUNT = 50000;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function cleanText(value: unknown, max = 2000): string {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim().slice(0, max);
}

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value) && value.length <= 254;
}

export interface DonationInput {
  amount: number;
  currency: CurrencyCode;
  donorName: string;
  donorEmail: string;
  message: string;
  isAnonymous: boolean;
  frequency: 'one_time' | 'monthly';
  giftAid: boolean;
  coverFees: boolean;
  paymentMethod: 'card' | 'paypal';
  couponCode: string;
  saveCard: boolean;
}

export function parseDonationBody(body: unknown): { ok: true; data: DonationInput } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'A donation payload is required.' };
  }

  const raw = body as Record<string, unknown>;
  const amount = Number(raw.amount);
  if (!Number.isFinite(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
    return { ok: false, error: `Enter an amount between ${MIN_AMOUNT} and ${MAX_AMOUNT}.` };
  }

  const currencyRaw = String(raw.currency || 'GBP').toUpperCase();
  if (!isSupportedCurrency(currencyRaw)) {
    return { ok: false, error: 'Choose USD, GBP, EUR, or KES.' };
  }

  const frequency = raw.frequency === 'monthly' ? 'monthly' : 'one_time';
  const isAnonymous = Boolean(raw.isAnonymous);
  const donorName = cleanText(raw.donorName, 80) || (isAnonymous ? 'Anonymous' : 'Supporter');
  const donorEmail = cleanText(raw.donorEmail, 254).toLowerCase();
  const message = cleanText(raw.message, 500);

  if (donorEmail && !isValidEmail(donorEmail)) {
    return { ok: false, error: 'Enter a valid email address for your receipt.' };
  }

  return {
    ok: true,
    data: {
      amount,
      currency: currencyRaw,
      donorName,
      donorEmail,
      message,
      isAnonymous,
      frequency,
      giftAid: Boolean(raw.giftAid),
      coverFees: Boolean(raw.coverFees),
      paymentMethod: raw.paymentMethod === 'paypal' ? 'paypal' : 'card',
      couponCode: cleanText(raw.couponCode, 40).toUpperCase(),
      saveCard: Boolean(raw.saveCard),
    },
  };
}

export function parseContactBody(body: unknown):
  | {
      ok: true;
      data: {
        name: string;
        email: string;
        subject: string;
        message: string;
        type: 'general_inquiry' | 'document_request' | 'partnership';
        documentRequested: string;
        newsletterOptIn: boolean;
      };
      isBot: boolean;
    }
  | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'A message payload is required.' };
  }

  const raw = body as Record<string, unknown>;

  // Honeypot: a hidden field real visitors never see or fill. If it has a value,
  // treat the submission as a bot — we still report success so the bot doesn't
  // learn to adjust, but we skip recording and emailing it.
  const isBot = cleanText(raw.companyWebsite, 200).length > 0;

  const name = cleanText(raw.name, 80);
  const email = cleanText(raw.email, 254).toLowerCase();
  const subject = cleanText(raw.subject, 160);
  const message = cleanText(raw.message, 4000);
  const documentRequested = cleanText(raw.documentRequested, 160);
  const newsletterOptIn = Boolean(raw.newsletterOptIn);
  const typeRaw = String(raw.type || 'general_inquiry');
  const type =
    typeRaw === 'document_request' || typeRaw === 'partnership' ? typeRaw : 'general_inquiry';

  if (!name || !email || !message) {
    return { ok: false, error: 'Name, email, and message are required.' };
  }
  if (!isValidEmail(email)) {
    return { ok: false, error: 'Enter a valid email address.' };
  }

  return {
    ok: true,
    data: { name, email, subject, message, type, documentRequested, newsletterOptIn },
    isBot,
  };
}
