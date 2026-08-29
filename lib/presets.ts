import type { CurrencyCode } from './money';

export interface AmountPreset {
  amount: number;
  popular?: boolean;
}

export const ONE_TIME_PRESETS: Record<CurrencyCode, AmountPreset[]> = {
  GBP: [
    { amount: 25 },
    { amount: 50, popular: true },
    { amount: 100 },
    { amount: 250 },
  ],
  USD: [
    { amount: 35 },
    { amount: 65, popular: true },
    { amount: 130 },
    { amount: 300 },
  ],
  EUR: [
    { amount: 30 },
    { amount: 60, popular: true },
    { amount: 120 },
    { amount: 300 },
  ],
  KES: [
    { amount: 3500 },
    { amount: 6500, popular: true },
    { amount: 13000 },
    { amount: 30000 },
  ],
};

export const MONTHLY_PRESETS: Record<CurrencyCode, AmountPreset[]> = {
  GBP: [
    { amount: 5 },
    { amount: 10 },
    { amount: 25, popular: true },
    { amount: 50 },
  ],
  USD: [
    { amount: 10 },
    { amount: 15 },
    { amount: 35, popular: true },
    { amount: 65 },
  ],
  EUR: [
    { amount: 10 },
    { amount: 15 },
    { amount: 30, popular: true },
    { amount: 60 },
  ],
  KES: [
    { amount: 1500 },
    { amount: 2500 },
    { amount: 3500, popular: true },
    { amount: 6500 },
  ],
};

/** Approximate kit cost used only for donor-facing copy. */
const KIT_COST: Record<CurrencyCode, number> = {
  GBP: 25,
  USD: 35,
  EUR: 30,
  KES: 3500,
};

export function kitsFromAmount(amount: number, currency: CurrencyCode): number {
  const cost = KIT_COST[currency];
  return Math.max(0, Math.floor(amount / cost));
}

export function impactLine(amount: number, currency: CurrencyCode, monthly: boolean): string {
  const kits = kitsFromAmount(amount, currency);
  const cadence = monthly ? ' each month' : '';
  if (amount >= (currency === 'KES' ? 65000 : currency === 'GBP' ? 500 : 650)) {
    return `At this level you can underwrite a school visit: classroom lessons plus kits for a whole year group${cadence}.`;
  }
  if (kits <= 0) {
    return `This gift helps buy soap, underwear, and teaching materials used alongside the kits${cadence}.`;
  }
  if (kits === 1) {
    return `About one three-year washable kit and a place in the puberty lesson${cadence}.`;
  }
  return `About ${kits} three-year washable kits, with classroom teaching for those girls${cadence}.`;
}

export function roundUpNudge(amount: number): number | null {
  if (!Number.isFinite(amount) || amount <= 0) return null;
  const last = amount % 10;
  if (last === 0 || last === 5) return null;
  const up = Math.ceil(amount / 5) * 5;
  return up === amount ? null : up;
}

export function processingFee(amount: number, currency: CurrencyCode): number {
  const percent = 0.029;
  const fixed = currency === 'KES' ? 0 : 0.2;
  return Math.round((amount * percent + fixed) * 100) / 100;
}
