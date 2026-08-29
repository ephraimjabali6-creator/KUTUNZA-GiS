import Link from 'next/link';
import useSWR from 'swr';
import { CAMPAIGN_DATA } from '../content/campaignData';
import { campaignPercentage } from '../lib/money';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function CampaignStrip() {
  const { data } = useSWR('/api/stats', fetcher, { refreshInterval: 8000 });
  const raised = data?.currentRaisedUSD ?? CAMPAIGN_DATA.currentRaisedUSD;
  const goal = data?.targetGoalUSD ?? CAMPAIGN_DATA.targetGoalUSD;
  const donors = data?.totalDonorsCount ?? CAMPAIGN_DATA.totalDonorsCount;
  const pct = data?.percentage ?? campaignPercentage(raised, goal);

  return (
    <section className="bg-mist py-20">
      <div className="site-wrap grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow">This campaign</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Fund the next visit to Olympic and Ayany.</h2>
          <p className="body-copy mt-5 max-w-lg">
            UK gifts buy washable packs and cover getting them to Nairobi. Totals update after Stripe
            confirms a payment — never before.
          </p>
          <Link href="/donate" className="btn-primary mt-8">
            Donate
          </Link>
        </div>
        <div className="border border-line bg-white p-8">
          <div className="flex justify-between text-sm">
            <span>${raised.toLocaleString()} raised</span>
            <span>${goal.toLocaleString()} goal</span>
          </div>
          <div className="mt-3 h-1.5 bg-line">
            <div className="h-full bg-forest-500" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-4 text-sm text-ink-muted">
            {pct}% · {donors.toLocaleString()} donors
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {CAMPAIGN_DATA.transparencyBreakdown.map((row) => (
              <li key={row.category} className="flex justify-between gap-4 border-t border-line pt-3">
                <span>{row.category}</span>
                <span className="text-forest-600">{row.percentage}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
