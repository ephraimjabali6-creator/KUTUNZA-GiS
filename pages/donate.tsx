import Link from 'next/link';
import SiteLayout from '../components/SiteLayout';
import DonateWidget from '../components/DonateWidget';
import CampaignStrip from '../components/CampaignStrip';
import { CAMPAIGN_DATA } from '../content/campaignData';
import { ORG } from '../content/org';

export default function DonatePage() {
  return (
    <SiteLayout title="Donate" description="Give once or monthly to Girls in School.">
      <section className="site-wrap grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="eyebrow">Section 3 · Empower a schoolgirl today</p>
          <h1 className="display mt-4">A pack that lasts years, not a month.</h1>
          <p className="body-copy mt-6 max-w-md">
            A single washable kit keeps a girl in class for three years instead of missing a week
            of school every month. Your donation pays for the kit, the fitting, and the mentorship
            that goes with it — not just a one-off packet of pads.
          </p>
          <p className="body-copy mt-4 max-w-md">
            Choose an amount in pounds by default. Stripe handles the card, PayPal, and wallet
            payments — we never see or store your card number. If keys are not on this environment
            yet, demo checkout still walks through to a thank-you page.
          </p>
          <ul className="mt-8 space-y-4 text-sm leading-6 text-ink-muted">
            {CAMPAIGN_DATA.donationTiers.slice(0, 3).map((tier) => (
              <li key={tier.id} className="border-l-2 border-forest-500 pl-4">
                <span className="font-medium text-ink">£{tier.amountGBP}</span> — {tier.tagline}
              </li>
            ))}
          </ul>
        </div>
        <DonateWidget />
      </section>

      {/* Impact of Giving */}
      <section className="border-t border-line bg-mist py-16 sm:py-20">
        <div className="site-wrap">
          <p className="eyebrow">Impact of giving</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">What your gift pays for.</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAMPAIGN_DATA.donationTiers.map((tier) => (
              <div key={tier.id} className="border border-line bg-white p-6">
                <p className="font-serif text-2xl">£{tier.amountGBP}</p>
                <p className="mt-1 text-sm font-medium text-forest-600">{tier.tagline}</p>
                <p className="mt-3 text-sm leading-6 text-ink-muted">{tier.impactDescription}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Transparency */}
      <section className="border-t border-line py-16 sm:py-20">
        <div className="site-wrap grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Trust &amp; transparency</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Where every pound goes.</h2>
            <p className="body-copy mt-4">
              We publish a breakdown of spending every year and welcome scrutiny of it. Card
              donations are processed by Stripe; {ORG.name} never sees or stores your card details.
            </p>
            <dl className="mt-8 space-y-5">
              {CAMPAIGN_DATA.transparencyBreakdown.map((row) => (
                <div key={row.category}>
                  <div className="flex items-baseline justify-between text-sm">
                    <dt className="font-medium text-ink">{row.category}</dt>
                    <dd className="font-serif text-lg text-forest-600">{row.percentage}%</dd>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-ink-muted">{row.description}</p>
                  <div className="mt-2 h-1.5 w-full bg-line">
                    <div className="h-1.5 bg-forest-500" style={{ width: `${row.percentage}%` }} />
                  </div>
                </div>
              ))}
            </dl>
          </div>
          <div className="border border-line p-6 sm:p-8">
            <p className="eyebrow">Registration &amp; reports</p>
            <p className="mt-3 text-sm leading-6 text-ink-muted">
              {ORG.name} / {ORG.project} is a registered charity ({ORG.charityNumber}) operating in
              {' '}{ORG.location}. Independent financial audits and our annual report are available
              on request.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {CAMPAIGN_DATA.documentsAvailable.map((doc) => (
                <li key={doc.id} className="flex items-center justify-between border-t border-line pt-3">
                  <span>{doc.title}</span>
                  <span className="text-ink-faint">{doc.size}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact#document-requests" className="btn-ghost mt-6 inline-flex text-sm">
              Request a document <span aria-hidden>→</span>
            </Link>
            <p className="mt-6 text-xs text-ink-faint">
              Full policy detail: <Link href="/legal/governance" className="underline">charity registration &amp; governance</Link>,{' '}
              <Link href="/legal/pci" className="underline">payment security</Link>, and{' '}
              <Link href="/legal/refund" className="underline">refunds</Link>.
            </p>
          </div>
        </div>
      </section>

      <CampaignStrip />
    </SiteLayout>
  );
}
