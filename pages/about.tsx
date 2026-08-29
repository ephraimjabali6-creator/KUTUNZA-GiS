import SiteLayout from '../components/SiteLayout';
import { CAMPAIGN_DATA } from '../content/campaignData';
import HowItWorks from '../components/HowItWorks';

export default function AboutPage() {
  const about = CAMPAIGN_DATA.aboutMission;
  return (
    <SiteLayout title="Our mission">
      <section className="site-wrap py-16 lg:py-24">
        <p className="eyebrow">Section 1 · About Our Mission</p>
        <h1 className="display mt-4 max-w-3xl">Dignity in every classroom.</h1>
        <p className="body-copy mt-6 max-w-2xl">{about.introParagraph}</p>
        {about.deepParagraphs.map((p) => (
          <p key={p.slice(0, 24)} className="body-copy mt-4 max-w-2xl">
            {p}
          </p>
        ))}
      </section>
      <HowItWorks />
      <section id="local-area" className="border-t border-line py-20">
        <div className="site-wrap grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Place</p>
            <h2 className="mt-3 font-serif text-4xl">{about.localArea.title}</h2>
            <p className="body-copy mt-5">{about.localArea.description}</p>
          </div>
          <img
            src="/images/hero-assembly.jpg"
            alt="Students lined up in a Nairobi school courtyard"
            className="h-80 w-full rounded-2xl border border-line object-cover"
          />
        </div>
      </section>
      <section id="statistics" className="bg-mist py-20">
        <div className="site-wrap">
          <p className="eyebrow text-center">Girls' education — key statistics</p>
          <h2 className="mt-3 text-center font-serif text-4xl">The reality in numbers.</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {about.keyStatistics.map((item) => (
            <article key={item.label} className="border border-line bg-white p-6">
              <p className="font-serif text-3xl text-forest-600">{item.stat}</p>
              <p className="mt-2 text-sm font-medium">{item.label}</p>
              <p className="mt-2 text-sm text-ink-muted">{item.description}</p>
            </article>
          ))}
        </div>
        </div>
      </section>
      <section id="progress" className="section">
        <div className="site-wrap">
          <p className="eyebrow">Charity progress</p>
          <h2 className="mt-3 font-serif text-4xl">Charity progress &amp; roadmap.</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-2">
            {about.progressMilestones.map((m) => (
              <li key={m.year} className="border-t border-line pt-6">
                <p className="text-xs uppercase tracking-[0.16em] text-forest-500">{m.year}</p>
                <h3 className="mt-2 font-serif text-2xl">{m.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-muted">{m.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section id="patrons" className="border-t border-line bg-mist py-20">
        <div className="site-wrap">
          <p className="eyebrow">Patron profiles</p>
          <h2 className="mt-3 font-serif text-4xl">Patron profiles &amp; field leadership.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {about.patrons.map((patron) => (
              <article key={patron.name} className="flex flex-col border border-line bg-white">
                <img
                  src={patron.image}
                  alt={patron.name}
                  className="h-56 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-xl">{patron.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-forest-500">{patron.role}</p>
                  <p className="mt-1 text-xs text-ink-faint">{patron.organization}</p>
                  <p className="mt-4 text-sm leading-6 text-ink-muted">{patron.bio}</p>
                  <blockquote className="mt-4 border-l-2 border-forest-500 pl-4 text-sm italic leading-6 text-ink-muted">
                    “{patron.quote}”
                  </blockquote>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
