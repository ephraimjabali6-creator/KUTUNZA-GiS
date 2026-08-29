import Link from 'next/link';
import { CAMPAIGN_DATA } from '../content/campaignData';

export default function WorkPreview() {
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <div className="site-wrap">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Case studies &amp; research insights</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Work that shows up in attendance registers.</h2>
          </div>
          <Link href="/insights" className="btn-ghost hidden sm:inline-flex">
            All case studies <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {CAMPAIGN_DATA.caseStudies.map((study) => (
            <article key={study.id}>
              <img src={study.image} alt="" className="h-56 w-full object-cover" />
              <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-forest-500">{study.category}</p>
              <h3 className="mt-2 font-serif text-2xl leading-snug">
                <Link href={`/insights/${study.slug}`}>{study.title}</Link>
              </h3>
              <p className="mt-3 text-sm leading-6 text-ink-muted">{study.excerpt}</p>
            </article>
          ))}
        </div>
        <Link href="/insights" className="btn-ghost mt-8 sm:hidden">
          All case studies →
        </Link>
      </div>
    </section>
  );
}
