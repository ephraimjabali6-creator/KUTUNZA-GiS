import Link from 'next/link';

const STEPS = [
  {
    n: '01',
    title: 'Invitation',
    body: 'A local church partner already knows the government school. We visit only when the school asks us in.',
  },
  {
    n: '02',
    title: 'Classroom lesson',
    body: 'Boys and girls stay in their usual class. The puberty lesson is Bible-based and aimed at mutual respect.',
  },
  {
    n: '03',
    title: 'Washable packs',
    body: 'Girls stay behind and each receives a pack of washable sanitary towels she can reuse for years.',
  },
  {
    n: '04',
    title: 'Same year, next year',
    body: 'We return to the same year group annually so the teaching and the kits become ordinary, not a one-off drop.',
  },
];

export default function HowItWorks() {
  return (
    <section className="section border-t border-line">
      <div className="site-wrap">
        <p className="eyebrow">Method</p>
        <h2 className="mt-3 font-serif text-4xl sm:text-5xl">How a school visit actually runs.</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <article key={step.n} className="border-t border-line pt-6">
              <p className="text-xs uppercase tracking-[0.16em] text-forest-500">{step.n}</p>
              <h3 className="mt-3 font-serif text-2xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink-muted">{step.body}</p>
            </article>
          ))}
        </div>
        <Link href="/how-it-works" className="btn-ghost mt-10">
          Full visit notes →
        </Link>
      </div>
    </section>
  );
}
