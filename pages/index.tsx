import SiteLayout from '../components/SiteLayout';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import Approach from '../components/Approach';
import HowItWorks from '../components/HowItWorks';
import TestimonialMarquee from '../components/TestimonialMarquee';
import WorkPreview from '../components/WorkPreview';
import CampaignStrip from '../components/CampaignStrip';
import FaqList from '../components/FaqList';
import Link from 'next/link';
import { CAMPAIGN_DATA } from '../content/campaignData';

export default function HomePage() {
  const { currentRaisedUSD, targetGoalUSD, totalDonorsCount } = CAMPAIGN_DATA;
  const percentage = Math.round((currentRaisedUSD / targetGoalUSD) * 100);

  return (
    <SiteLayout title="Girls in School">
      <Hero />
      {/* Quick action bar: live progress + jump straight to giving */}
      <section className="border-y border-line bg-white py-6" aria-label="Live fundraising progress">
        <div className="site-wrap flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-serif text-2xl text-ink">${currentRaisedUSD.toLocaleString()}</span>
            <span className="text-sm text-ink-faint">raised of ${targetGoalUSD.toLocaleString()} goal</span>
            <span className="rounded-full bg-forest-50 px-2.5 py-0.5 text-xs font-medium text-forest-600">
              {percentage}% funded
            </span>
            <span className="text-sm text-ink-faint">· {totalDonorsCount} donors</span>
          </div>
          <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-line sm:w-48">
            <div className="h-1.5 bg-forest-500" style={{ width: `${Math.min(percentage, 100)}%` }} />
          </div>
          <Link href="/donate" className="btn-primary min-h-10 whitespace-nowrap">
            Donate now
          </Link>
        </div>
      </section>
      <TrustBar />
      <Approach />
      <HowItWorks />
      <CampaignStrip />
      <TestimonialMarquee />
      <WorkPreview />
      <FaqList />
      <section className="border-t border-line py-14" aria-label="Useful links">
        <div className="site-wrap">
          <p className="eyebrow">Useful links</p>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <li><Link href="/about" className="text-ink-muted hover:text-forest-600">About our mission</Link></li>
            <li><Link href="/testimonials" className="text-ink-muted hover:text-forest-600">Testimonials</Link></li>
            <li><Link href="/donate" className="text-ink-muted hover:text-forest-600">Donate</Link></li>
            <li><Link href="/contact" className="text-ink-muted hover:text-forest-600">Contact us</Link></li>
            <li><Link href="/insights" className="text-ink-muted hover:text-forest-600">Blog / case studies</Link></li>
            <li><Link href="/contact#document-requests" className="text-ink-muted hover:text-forest-600">Document requests</Link></li>
          </ul>
        </div>
      </section>
      <section className="border-t border-line bg-mist py-20">
        <div className="site-wrap flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Next</p>
            <h2 className="mt-3 font-serif text-4xl">Help us pack the next case for Nairobi.</h2>
            <p className="body-copy mt-4 max-w-xl">
              Gifts from the UK buy the washable packs we take into Olympic Primary and Ayany Primary.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/donate" className="btn-primary min-h-12">
              Donate
            </Link>
            <Link href="/contact" className="btn-ghost min-h-12">
              Talk to the team →
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
