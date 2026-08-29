import { describe, expect, it } from 'vitest';
import { amountToMinorUnits, campaignPercentage, formatMoney, toUsd } from '../lib/money';
import { parseContactBody, parseDonationBody } from '../lib/validation';
import { impactLine, processingFee, roundUpNudge } from '../lib/presets';
import { rateLimit, resetRateLimits } from '../lib/rateLimit';

describe('money', () => {
  it('converts gbp toward usd without floating junk', () => {
    expect(toUsd(50, 'GBP')).toBe(64);
  });

  it('caps campaign percentage', () => {
    expect(campaignPercentage(80, 50)).toBe(100);
    expect(campaignPercentage(0, 0)).toBe(0);
  });

  it('formats kes without pence', () => {
    expect(formatMoney(3500, 'KES')).toContain('3,500');
  });

  it('uses stripe minor units', () => {
    expect(amountToMinorUnits(50)).toBe(5000);
  });
});

describe('validation', () => {
  it('defaults currency to GBP', () => {
    const parsed = parseDonationBody({ amount: 25, donorEmail: 'a@b.com' });
    expect(parsed.ok).toBe(true);
    if (parsed.ok) expect(parsed.data.currency).toBe('GBP');
  });

  it('rejects tiny amounts', () => {
    const parsed = parseDonationBody({ amount: 0.2, currency: 'GBP' });
    expect(parsed.ok).toBe(false);
  });

  it('requires contact fields', () => {
    expect(parseContactBody({ name: '', email: 'a@b.com', message: 'hi' }).ok).toBe(false);
    expect(parseContactBody({ name: 'Ada', email: 'ada@kutunza.org', message: 'Hello' }).ok).toBe(true);
  });
});

describe('presets', () => {
  it('nudges amounts not ending in 0 or 5', () => {
    expect(roundUpNudge(37)).toBe(40);
    expect(roundUpNudge(50)).toBeNull();
  });

  it('describes kit impact', () => {
    expect(impactLine(50, 'GBP', false)).toMatch(/2/);
  });

  it('adds a processing fee', () => {
    expect(processingFee(100, 'GBP')).toBeGreaterThan(2);
  });
});

describe('rate limit', () => {
  it('blocks after the window fills', () => {
    resetRateLimits();
    expect(rateLimit('t', 2, 60_000)).toBe(true);
    expect(rateLimit('t', 2, 60_000)).toBe(true);
    expect(rateLimit('t', 2, 60_000)).toBe(false);
  });
});

describe('donation payload with payment method + coupon', () => {
  it('defaults payment method to card and normalises coupon casing', () => {
    const parsed = parseDonationBody({
      amount: 25,
      currency: 'GBP',
      donorEmail: 'a@b.com',
      couponCode: 'gis10',
    });
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.data.paymentMethod).toBe('card');
      expect(parsed.data.couponCode).toBe('GIS10');
    }
  });

  it('accepts an explicit paypal payment method', () => {
    const parsed = parseDonationBody({ amount: 25, currency: 'GBP', paymentMethod: 'paypal' });
    expect(parsed.ok).toBe(true);
    if (parsed.ok) expect(parsed.data.paymentMethod).toBe('paypal');
  });
});

describe('contact honeypot', () => {
  it('flags submissions where the hidden field was filled in', () => {
    const parsed = parseContactBody({
      name: 'Bot',
      email: 'bot@example.com',
      message: 'hi',
      companyWebsite: 'https://spam.example',
    });
    expect(parsed.ok).toBe(true);
    if (parsed.ok) expect(parsed.isBot).toBe(true);
  });

  it('does not flag real submissions', () => {
    const parsed = parseContactBody({ name: 'Ada', email: 'ada@kutunza.org', message: 'Hello' });
    expect(parsed.ok).toBe(true);
    if (parsed.ok) expect(parsed.isBot).toBe(false);
  });
});
