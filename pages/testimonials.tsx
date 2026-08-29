import Link from 'next/link';
import SiteLayout from '../components/SiteLayout';
import { CAMPAIGN_DATA } from '../content/campaignData';

function relatedCaseStudy(impactTag: string) {
  // Loose keyword match so each testimonial can point at the most relevant case study.
  const lower = impactTag.toLowerCase();
  const byCategory = CAMPAIGN_DATA.caseStudies.find((s) =>
    s.category.toLowerCase().includes(lower.split(' ')[0])
  );
  return byCategory || CAMPAIGN_DATA.caseStudies[0];
}

export default function TestimonialsPage() {
  return (
    <SiteLayout
      title="Testimonials"
      description="Recipient stories, video testimonials, and the case studies behind them."
    >
      <section className="site-wrap py-16 lg:py-24">
        <p className="eyebrow">Section 2 · Voices from the community</p>
        <h1 className="display mt-4">Testimonials &amp; field stories.</h1>
        <p className="body-copy mt-6 max-w-2xl">
          Names are shortened where a child is involved. Photographs on this site are from real
          visits; quotes can be edited by the client from the content file.
        </p>
      </section>

      {/* Recipient testimonials */}
      <section id="recipient-testimonials" className="border-t border-line py-16 sm:py-20">
        <div className="site-wrap">
          <p className="eyebrow">Recipient testimonials</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">In their own words.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {CAMPAIGN_DATA.testimonials.map((t) => {
              const study = relatedCaseStudy(t.impactTag);
              return (
                <blockquote key={t.id} className="flex flex-col border border-line p-6">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-forest-500">{t.impactTag}</p>
                  <p className="mt-4 flex-1 text-[17px] leading-7 text-ink-muted">"{t.story}"</p>
                  <footer className="mt-6 text-sm">
                    <strong>{t.name}</strong>
                    <span className="block text-ink-faint">
                      {t.role} · {t.school}
                    </span>
                  </footer>
                  <Link
                    href={`/insights/${study.slug}`}
                    className="btn-ghost mt-4 self-start text-sm"
                  >
                    Read the full story <span aria-hidden>→</span>
                  </Link>
                </blockquote>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video testimonials */}
      <section id="video-testimonials" className="border-t border-line bg-mist py-16 sm:py-20">
        <div className="site-wrap">
          <p className="eyebrow">Video testimonials</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Video testimonials &amp; school assemblies.</h2>
          <p className="body-copy mt-4 max-w-2xl">
            Short films from the schools we visit. Captions are provided for every video; press
            play to watch with sound or read along in silence.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {CAMPAIGN_DATA.videoTestimonials.map((v) => (
              <article key={v.id} className="border border-line bg-white">
                <div className="relative">
                  <img src={v.thumbnail} alt="" className="h-56 w-full object-cover" />
                  {v.videoUrl ? (
                    <a
                      href={v.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Play video: ${v.title}`}
                      className="absolute inset-0 flex items-center justify-center bg-ink/20 transition hover:bg-ink/30"
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-forest-600 shadow-lg">
                        ▶
                      </span>
                    </a>
                  ) : (
                    <div
                      aria-label={`Video coming soon: ${v.title}`}
                      className="absolute inset-0 flex items-center justify-center bg-ink/40"
                    >
                      <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-ink">
                        Video coming soon
                      </span>
                    </div>
                  )}
                  <span className="absolute bottom-3 right-3 rounded bg-ink/70 px-2 py-1 text-[11px] text-white">
                    {v.duration}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl">{v.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-forest-500">{v.speaker}</p>
                  <p className="mt-3 text-sm leading-6 text-ink-muted">{v.summary}</p>
                  <p className="mt-3 text-xs text-ink-faint">
                    Captions and transcripts are available for every video on request.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Link through to blog / case studies */}
      <section className="border-t border-line py-16 sm:py-20">
        <div className="site-wrap flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Blog posts</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Read the full case studies.</h2>
            <p className="body-copy mt-3 max-w-xl">
              Every testimonial links back to the field notes and data behind it.
            </p>
          </div>
          <Link href="/insights" className="btn-primary min-h-12">
            Visit the blog <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
