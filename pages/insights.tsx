import Link from 'next/link';
import SiteLayout from '../components/SiteLayout';
import { CAMPAIGN_DATA } from '../content/campaignData';

export default function InsightsPage() {
  return (
    <SiteLayout title="Insights">
      <section className="site-wrap py-16 lg:py-24">
        <p className="eyebrow">Case studies</p>
        <h1 className="display mt-4">Notes from the field.</h1>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {CAMPAIGN_DATA.caseStudies.map((study) => (
            <article key={study.id}>
              <img src={study.image} alt="" className="h-52 w-full object-cover" />
              <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-forest-500">{study.category}</p>
              <h2 className="mt-2 font-serif text-2xl leading-snug">
                <Link href={`/insights/${study.slug}`}>{study.title}</Link>
              </h2>
              <p className="mt-3 text-sm leading-6 text-ink-muted">{study.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
