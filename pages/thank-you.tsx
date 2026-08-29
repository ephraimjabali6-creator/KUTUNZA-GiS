import { useRouter } from 'next/router';
import Link from 'next/link';
import SiteLayout from '../components/SiteLayout';
import { CURRENCY_SYMBOLS } from '../lib/money';

export default function ThankYouPage() {
  const { query } = useRouter();
  const amount = query.amount ? String(query.amount) : '';
  const currency = String(query.currency || 'GBP').toUpperCase();
  const symbol = currency in CURRENCY_SYMBOLS ? CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS] : '';
  const demo = query.demo === 'true';
  const share = encodeURIComponent('I just supported Kutunza Girls in School. Join me:');

  return (
    <SiteLayout title="Thank you">
      <section className="site-wrap max-w-xl py-24 text-center">
        <p className="eyebrow">Section 3 · Asante sana! Thank you!</p>
        <h1 className="display mt-4">Thank you.</h1>
        <p className="body-copy mt-6">
          {amount
            ? `Your gift of ${symbol}${amount} is recorded.`
            : 'Your gift is recorded.'}{' '}
          {demo
            ? 'This was a local demo checkout (DEMO_PAYMENTS=true) so no card was charged.'
            : 'A receipt will follow by email when Stripe and Resend are connected on the client account.'}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-ghost min-h-12">
            Back home
          </Link>
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <p className="eyebrow">Spread the word</p>
          <p className="mt-2 text-sm text-ink-muted">
            One gift rarely travels alone — the fastest way to fund another kit is to tell someone
            who cares about the same thing you do.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              className="btn-primary min-h-12"
              href={`https://wa.me/?text=${share}%20${encodeURIComponent('https://kutunza.org/donate')}`}
              target="_blank"
              rel="noreferrer"
            >
              Share on WhatsApp
            </a>
            <a
              className="btn-dark min-h-12"
              href={`https://twitter.com/intent/tweet?text=${share}&url=${encodeURIComponent('https://kutunza.org/donate')}`}
              target="_blank"
              rel="noreferrer"
            >
              Share on X
            </a>
            <a
              className="btn-ghost min-h-12"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://kutunza.org/donate')}`}
              target="_blank"
              rel="noreferrer"
            >
              Share on Facebook
            </a>
            <a className="btn-ghost min-h-12" href={`mailto:?subject=${encodeURIComponent('Join me in supporting girls in school')}&body=${share}%20https://kutunza.org/donate`}>
              Share by email
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
