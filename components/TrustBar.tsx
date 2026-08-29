import { CAMPAIGN_DATA } from '../content/campaignData';

export default function TrustBar() {
  return (
    <section className="border-y border-line bg-mist">
      <div className="site-wrap grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
        {CAMPAIGN_DATA.quickStats.map((stat) => (
          <div key={stat.label}>
            <p className="font-serif text-3xl text-ink">{stat.value}</p>
            <p className="mt-1 text-sm text-ink">{stat.label}</p>
            <p className="text-xs text-ink-faint">{stat.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
