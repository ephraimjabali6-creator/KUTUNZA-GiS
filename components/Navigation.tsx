import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ORG } from '../content/org';

// Primary navigation follows the approved site map: Home | About Our Mission |
// Testimonials | Donate | Contact Us. Case studies/blog and help live in the footer
// (secondary navigation) per the site architecture document.
const LINKS = [
  {
    href: '/about',
    label: 'About Our Mission',
    children: [
      { href: '/about', label: 'Our mission' },
      { href: '/about#local-area', label: 'The local area' },
      { href: '/about#statistics', label: "Girls' education — key statistics" },
      { href: '/about#progress', label: 'Charity progress' },
      { href: '/about#patrons', label: 'Patron profiles' },
      { href: '/how-it-works', label: 'How it works' },
    ],
  },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Navigation() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [lang, setLang] = useState<'en' | 'sw'>('en');

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    const stored = window.localStorage.getItem('kutunza-lang');
    if (stored === 'sw' || stored === 'en') setLang(stored);
  }, []);

  const setLanguage = (next: 'en' | 'sw') => {
    setLang(next);
    window.localStorage.setItem('kutunza-lang', next);
    document.documentElement.lang = next === 'sw' ? 'sw' : 'en-GB';
  };

  return (
    <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md ${elevated ? 'border-b border-line' : ''}`}>
      <div className="border-b border-line bg-ink text-[11px] text-white">
        <div className="site-wrap flex items-center justify-between gap-4 py-2">
          <p className="tracking-wide">
            Currently visiting {ORG.schools[0]} and {ORG.schools[1]}, Nairobi.
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="uppercase tracking-[0.14em]"
              onClick={() => setLanguage(lang === 'en' ? 'sw' : 'en')}
              aria-label="Switch language"
            >
              {lang === 'en' ? 'EN · SW' : 'SW · EN'}
            </button>
            <Link href="/donate" className="hidden font-medium uppercase tracking-[0.14em] sm:inline">
              Give
            </Link>
          </div>
        </div>
      </div>
      <div className="site-wrap flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-serif text-[28px] leading-none text-ink">{ORG.name}</span>
          <span className="hidden text-[11px] uppercase tracking-[0.16em] text-ink-faint sm:inline">
            {ORG.projectShort}
          </span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {LINKS.map((link) =>
            'children' in link && link.children ? (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className={`inline-flex items-center gap-1 text-sm ${
                    router.pathname.startsWith('/about') || router.pathname === '/how-it-works'
                      ? 'text-forest-600'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {link.label}
                  <span aria-hidden className="text-[10px]">
                    ▾
                  </span>
                </Link>
                <div className="invisible absolute left-0 top-full z-50 min-w-[220px] border border-line bg-white py-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-ink-muted hover:bg-mist hover:text-ink"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm ${
                  router.pathname.startsWith(link.href) ? 'text-forest-600' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <Link href="/donate" className="btn-primary min-h-12 !py-2.5">
            Donate
          </Link>
        </nav>
        <button
          type="button"
          className="flex min-h-12 min-w-12 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="block h-px w-6 bg-ink" />
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-white px-5 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {LINKS.flatMap((link) =>
              'children' in link && link.children ? link.children : [link]
            ).map((link) => (
              <Link key={link.href} href={link.href} className="min-h-12 text-lg text-ink">
                {link.label}
              </Link>
            ))}
            <Link href="/donate" className="btn-primary w-full min-h-12">
              Donate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
