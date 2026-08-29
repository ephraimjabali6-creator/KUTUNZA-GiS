import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CAMPAIGN_DATA } from '../content/campaignData';
import { ORG } from '../content/org';
import { CURRENCY_SYMBOLS, type CurrencyCode } from '../lib/money';
import { impactLine, MONTHLY_PRESETS, ONE_TIME_PRESETS, processingFee, roundUpNudge } from '../lib/presets';

function newIdempotencyKey() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `idemp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export default function DonateWidget() {
  const [step, setStep] = useState<1 | 2>(1);
  const [frequency, setFrequency] = useState<'one_time' | 'monthly'>('one_time');
  const [currency, setCurrency] = useState<CurrencyCode>('GBP');
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [coverFees, setCoverFees] = useState(true);
  const [giftAid, setGiftAid] = useState(false);
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [couponCode, setCouponCode] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [key] = useState(newIdempotencyKey);

  const presets = frequency === 'monthly' ? MONTHLY_PRESETS[currency] : ONE_TIME_PRESETS[currency];
  const selected = custom ? Number(custom) : amount;
  const fee = coverFees ? processingFee(selected || 0, currency) : 0;
  const charged = Math.round(((selected || 0) + fee) * 100) / 100;
  const nudge = custom ? roundUpNudge(Number(custom)) : null;
  const symbol = CURRENCY_SYMBOLS[currency];

  const canStep2 = Number.isFinite(selected) && selected >= 1;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const giftAidOk = !giftAid || (address.trim().length > 4 && postcode.trim().length > 2);
  const canPay = canStep2 && emailOk && giftAidOk && !busy;

  const impact = useMemo(
    () => impactLine(selected || 0, currency, frequency === 'monthly'),
    [selected, currency, frequency]
  );

  async function submit() {
    setError('');
    setBusy(true);
    try {
      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': key,
        },
        body: JSON.stringify({
          amount: charged,
          giftAmount: selected,
          currency,
          donorName: name.trim() || (anonymous ? 'Anonymous' : 'Supporter'),
          donorEmail: email.trim().toLowerCase(),
          message: message.trim(),
          isAnonymous: anonymous,
          frequency,
          coverFees,
          giftAid,
          address: giftAid ? address.trim() : '',
          postcode: giftAid ? postcode.trim() : '',
          paymentMethod,
          couponCode: couponCode.trim().toUpperCase(),
          saveCard,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Could not start checkout.');
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error('Checkout did not return a payment URL.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment could not start.');
      setBusy(false);
    }
  }

  return (
    <div className="border border-line bg-white p-6 sm:p-8">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-forest-500">
        Step {step} of 2
      </p>
      <h2 className="mt-2 font-serif text-3xl">
        {step === 1 ? 'Choose an amount' : 'Your details'}
      </h2>
      <p className="mt-2 text-sm text-ink-muted">
        Card payments go through Stripe. We never see your card number.
      </p>

      {step === 1 ? (
        <>
          <div className="mt-6 grid grid-cols-2 rounded-lg bg-mist p-1 text-sm">
            {(['one_time', 'monthly'] as const).map((f) => (
              <button
                key={f}
                type="button"
                className={`min-h-12 rounded-md ${
                  frequency === f ? 'bg-white text-forest-600' : 'text-ink-muted'
                }`}
                onClick={() => {
                  setFrequency(f);
                  setCustom('');
                  setAmount(f === 'monthly' ? MONTHLY_PRESETS[currency][2].amount : ONE_TIME_PRESETS[currency][1].amount);
                  if (f === 'monthly') setPaymentMethod('card');
                }}
              >
                {f === 'one_time' ? 'One-time' : 'Monthly'}
              </button>
            ))}
          </div>

          <label className="mt-5 block text-xs uppercase tracking-[0.14em] text-ink-faint">
            Currency
            <select
              className="field mt-2"
              value={currency}
              onChange={(e) => {
                const next = e.target.value as CurrencyCode;
                setCurrency(next);
                setCustom('');
                setAmount(
                  frequency === 'monthly' ? MONTHLY_PRESETS[next][2].amount : ONE_TIME_PRESETS[next][1].amount
                );
              }}
            >
              <option value="GBP">GBP £</option>
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>
              <option value="KES">KES</option>
            </select>
          </label>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {presets.map((p) => (
              <button
                key={p.amount}
                type="button"
                onClick={() => {
                  setAmount(p.amount);
                  setCustom('');
                }}
                className={`relative min-h-12 border text-sm ${
                  !custom && amount === p.amount
                    ? 'border-forest-500 bg-forest-500 text-white'
                    : 'border-line bg-white hover:bg-mist'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-2 right-2 bg-forest-50 px-2 py-0.5 text-[10px] uppercase tracking-wide text-forest-700">
                    Most popular
                  </span>
                )}
                {symbol}
                {p.amount.toLocaleString()}
              </button>
            ))}
          </div>

          <label className="mt-4 block text-sm text-ink-muted">
            Custom amount
            <input
              className="field mt-2"
              inputMode="numeric"
              value={custom}
              placeholder={`${symbol}…`}
              onChange={(e) => setCustom(e.target.value.replace(/[^0-9.]/g, ''))}
            />
          </label>
          {nudge && (
            <button type="button" className="mt-2 text-sm text-forest-600" onClick={() => setCustom(String(nudge))}>
              Round up to {symbol}
              {nudge} to stretch the gift?
            </button>
          )}
          <p className="mt-4 text-sm leading-6 text-ink-muted">{impact}</p>
          {selected >= 500 && currency !== 'KES' && (
            <p className="mt-3 border border-line bg-mist p-3 text-sm">
              Major gift: this level can fund a full school visit and kits for a year group.
            </p>
          )}
          <button
            type="button"
            className="btn-primary mt-6 w-full min-h-12"
            disabled={!canStep2}
            onClick={() => setStep(2)}
          >
            Continue
          </button>
        </>
      ) : (
        <>
          <button type="button" className="mt-4 text-sm text-ink-muted" onClick={() => setStep(1)}>
            ← Change amount
          </button>
          <label className="mt-5 block text-sm">
            Name
            <input className="field mt-2" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </label>
          <label className="mt-4 block text-sm">
            Email for receipt
            <input
              className="field mt-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>
          <label className="mt-4 block text-sm">
            Optional note
            <textarea
              className="field mt-2 min-h-[88px]"
              maxLength={250}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <span className="mt-1 block text-xs text-ink-faint">{message.length}/250</span>
          </label>
          <label className="mt-4 flex items-start gap-3 text-sm">
            <input type="checkbox" className="mt-1" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
            Make this gift anonymous on the public supporter list.
          </label>
          <label className="mt-3 flex items-start gap-3 text-sm">
            <input type="checkbox" className="mt-1" checked={coverFees} onChange={(e) => setCoverFees(e.target.checked)} />
            Cover the processing fee so the programme receives {symbol}
            {selected.toLocaleString()}.
            {!coverFees && (
              <span className="block text-ink-faint">Fees will come out of the gift.</span>
            )}
          </label>
          {ORG.giftAidStatus !== 'ineligible' && currency === 'GBP' && (
            <div className="mt-4 border border-line p-4">
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" className="mt-1" checked={giftAid} onChange={(e) => setGiftAid(e.target.checked)} />
                I am a UK taxpayer. Add Gift Aid (25p on every £1) if Kutunza is registered to claim it.
              </label>
              {ORG.giftAidStatus === 'unconfirmed' && (
                <p className="mt-2 text-xs text-ink-faint">
                  Gift Aid status is awaiting client confirmation with HMRC. We will only claim if registration is active.
                </p>
              )}
              {giftAid && (
                <>
                  <input
                    className="field mt-3"
                    placeholder="UK address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    className="field mt-2"
                    placeholder="Postcode"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                  />
                </>
              )}
            </div>
          )}
          <p className="mt-5 text-sm">
            You will pay <strong>{symbol}{charged.toLocaleString()}</strong>
            {frequency === 'monthly' ? ' each month' : ''}.
          </p>

          <div className="mt-5">
            <p className="text-xs uppercase tracking-[0.14em] text-ink-faint">Payment method</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`min-h-12 border text-sm ${
                  paymentMethod === 'card' ? 'border-forest-500 bg-forest-500 text-white' : 'border-line bg-white hover:bg-mist'
                }`}
              >
                Debit / Credit card
              </button>
              <button
                type="button"
                disabled={frequency === 'monthly'}
                onClick={() => setPaymentMethod('paypal')}
                title={frequency === 'monthly' ? 'PayPal is available for one-time gifts only' : undefined}
                className={`min-h-12 border text-sm disabled:cursor-not-allowed disabled:opacity-40 ${
                  paymentMethod === 'paypal' ? 'border-forest-500 bg-forest-500 text-white' : 'border-line bg-white hover:bg-mist'
                }`}
              >
                PayPal
              </button>
            </div>
            {paymentMethod === 'paypal' && (
              <p className="mt-2 text-xs text-ink-faint">
                You will be redirected to PayPal on the secure checkout page. If PayPal is not yet
                enabled on the connected Stripe account, card will be shown instead.
              </p>
            )}
            {paymentMethod === 'card' && (
              <label className="mt-3 flex items-start gap-3 text-sm">
                <input type="checkbox" className="mt-1" checked={saveCard} onChange={(e) => setSaveCard(e.target.checked)} />
                Save this card securely with Stripe for faster giving next time.
              </label>
            )}
          </div>

          <label className="mt-4 block text-sm">
            Coupon / gift code (optional)
            <input
              className="field mt-2 uppercase"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="e.g. GIS10"
              maxLength={40}
            />
            <span className="mt-1 block text-xs text-ink-faint">
              Applied at checkout if it is a valid, active code.
            </span>
          </label>

          {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
          <button type="button" className="btn-primary mt-5 w-full min-h-12" disabled={!canPay} onClick={submit}>
            {busy ? 'Opening secure checkout…' : paymentMethod === 'paypal' ? 'Continue to PayPal' : 'Continue to Stripe'}
          </button>
          <p className="mt-4 text-xs leading-5 text-ink-faint">
            Prefer a bank transfer? Sort code {ORG.bank.sortCode}, account {ORG.bank.accountNumber}, reference{' '}
            {ORG.bank.reference}. Placeholders until the client supplies the charity account.
          </p>
          <p className="mt-2 text-xs text-ink-faint">
            By giving you accept our{' '}
            <Link href="/legal/terms" className="underline">
              terms
            </Link>{' '}
            and{' '}
            <Link href="/legal/privacy" className="underline">
              privacy notice
            </Link>
            .
          </p>
          <p className="mt-3 text-xs text-ink-muted">{CAMPAIGN_DATA.transparencyBreakdown[0].percentage}% of public gifts buy kits and transport.</p>
        </>
      )}
    </div>
  );
}
