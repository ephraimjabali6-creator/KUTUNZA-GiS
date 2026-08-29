export const SUPPORTED_CURRENCIES = ['USD', 'GBP', 'EUR', 'KES'] as const;
export type CurrencyCode = (typeof SUPPORTED_CURRENCIES)[number];

const USD_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  GBP: 1.28,
  EUR: 1.08,
  KES: 1 / 130,
};

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  GBP: '£',
  EUR: '€',
  KES: 'KSh ',
};

export function isSupportedCurrency(value: string): value is CurrencyCode {
  return (SUPPORTED_CURRENCIES as readonly string[]).includes(value.toUpperCase());
}

export function toUsd(amount: number, currency: string): number {
  const code = currency.toUpperCase();
  const rate = isSupportedCurrency(code) ? USD_RATES[code] : 1;
  return Math.round(amount * rate * 100) / 100;
}

export function formatMoney(amount: number, currency: string): string {
  const code = currency.toUpperCase();
  const symbol = isSupportedCurrency(code) ? CURRENCY_SYMBOLS[code] : `${code} `;
  const digits = code === 'KES' ? 0 : 2;
  return `${symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: code === 'KES' ? 0 : 2,
    maximumFractionDigits: digits,
  })}`;
}

export function campaignPercentage(raised: number, goal: number): number {
  if (!goal || goal <= 0) return 0;
  return Math.min(100, Math.round((raised / goal) * 100));
}

export function amountToMinorUnits(amount: number): number {
  return Math.round(amount * 100);
}
