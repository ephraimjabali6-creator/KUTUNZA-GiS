import { useEffect, useState } from 'react';
import Link from 'next/link';

const KEY = 'kutunza-cookie-choice';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!localStorage.getItem(KEY));
  }, []);

  const choose = (value: 'all' | 'necessary') => {
    localStorage.setItem(KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white">
      <div className="site-wrap flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.14em] text-forest-500">Manage cookie preferences</p>
          <p className="mt-1 text-sm text-ink-muted">
            We use necessary cookies to run checkout. Analytics stay off unless you accept.{' '}
            <Link href="/legal/cookies" className="underline">
              Your privacy choices &amp; opt-out centre
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn-primary" onClick={() => choose('all')}>
            Accept all
          </button>
          <button type="button" className="btn-dark" onClick={() => choose('necessary')}>
            Necessary only
          </button>
        </div>
      </div>
    </div>
  );
}
