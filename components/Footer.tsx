import Link from 'next/link';
import { CAMPAIGN_DATA } from '../content/campaignData';
import { ORG } from '../content/org';

export default function Footer() {
  const { contactInfo, socialLinks } = CAMPAIGN_DATA;

  return (
    <footer className="bg-forest-800 text-white">
      <div className="site-wrap grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-serif text-3xl">Kutunza</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/80">
            {ORG.project}: washable packs and puberty lessons in government schools, starting in
            Nairobi. Registered charity no. {ORG.charityNumber}.
          </p>
          <Link href="/donate" className="btn-primary mt-6 bg-white text-forest-800 hover:bg-mist">
            Donate
          </Link>
        </div>
        <div className="grid gap-8 text-sm md:col-span-8 sm:grid-cols-3">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-white/60">Programme</p>
            <ul className="space-y-2 text-white/90">
              <li><Link href="/about">About our mission</Link></li>
              <li><Link href="/how-it-works">How it works</Link></li>
              <li><Link href="/testimonials">Testimonials</Link></li>
              <li><Link href="/insights">Case studies / blog</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-white/60">Give</p>
            <ul className="space-y-2 text-white/90">
              <li><Link href="/donate">One-time gift</Link></li>
              <li><Link href="/donate">Monthly</Link></li>
              <li><Link href="/contact#document-requests">Document requests</Link></li>
              <li><Link href="/help">Help centre / FAQ</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-white/60">Offices</p>
            <p className="leading-6 text-white/80">{contactInfo.addressKenya}</p>
            <p className="mt-3 leading-6 text-white/80">
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </p>
            <p className="mt-1 text-white/80">
              <a href="tel:+442079460991">{contactInfo.phoneInternational}</a>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="site-wrap flex flex-col gap-3 py-5 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Kutunza — Girls in School. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
            <Link href="/legal/refund">Refunds</Link>
            <Link href="/legal/cookies">Cookies</Link>
            <Link href="/legal/accessibility">Accessibility</Link>
            <Link href="/legal/pci">Payments</Link>
            <Link href="/legal/governance">Charity registration &amp; legal</Link>
            <a href={socialLinks.instagram} rel="noreferrer" target="_blank">Instagram</a>
            <a href={socialLinks.whatsapp} rel="noreferrer" target="_blank">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
