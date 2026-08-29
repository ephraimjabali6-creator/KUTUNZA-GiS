import Link from 'next/link';
import { CAMPAIGN_DATA } from '../content/campaignData';

export default function TestimonialMarquee() {
  const items = [...CAMPAIGN_DATA.testimonials, ...CAMPAIGN_DATA.testimonials];
  return (
    <section className="border-y border-line py-10">
      <div className="site-wrap mb-6 flex items-end justify-between">
        <div>
          <p className="eyebrow">Testimonials</p>
          <h2 className="mt-2 font-serif text-3xl">What teachers and girls tell us</h2>
        </div>
        <Link href="/testimonials" className="btn-ghost hidden sm:inline-flex">
          All testimonials →
        </Link>
      </div>
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track flex w-max gap-4 px-5 hover:[animation-play-state:paused]">
          {items.map((t, i) => (
            <blockquote
              key={`${t.id}-${i}`}
              className="w-[320px] shrink-0 border border-line bg-white p-5"
            >
              <p className="text-sm leading-6 text-ink-muted">“{t.story}”</p>
              <footer className="mt-4 text-sm">
                <span className="font-medium text-ink">{t.name}</span>
                <span className="mt-1 block text-xs text-ink-faint">
                  {t.role} · {t.school}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
