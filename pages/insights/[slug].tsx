import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import SiteLayout from '../../components/SiteLayout';
import { CAMPAIGN_DATA, CaseStudy } from '../../content/campaignData';

export default function InsightArticle({ study }: { study: CaseStudy }) {
  return (
    <SiteLayout title={study.title} description={study.excerpt}>
      <article className="site-wrap py-16 lg:max-w-3xl lg:py-24">
        <p className="eyebrow">{study.category}</p>
        <h1 className="display mt-4">{study.title}</h1>
        <p className="mt-4 text-sm text-ink-faint">
          {study.date} · {study.readTime}
        </p>
        <img src={study.image} alt="" className="mt-10 h-80 w-full object-cover" />
        <div className="mt-8 grid grid-cols-3 gap-4 border border-line p-5 text-center">
          {study.metrics.map((m) => (
            <div key={m.label}>
              <p className="font-serif text-2xl text-forest-600">{m.value}</p>
              <p className="mt-1 text-xs text-ink-faint">{m.label}</p>
            </div>
          ))}
        </div>
        {study.content.map((p) => (
          <p key={p.slice(0, 32)} className="body-copy mt-6">
            {p}
          </p>
        ))}
        <Link href="/donate" className="btn-primary mt-10 inline-flex min-h-12">
          Support this work
        </Link>
      </article>
    </SiteLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: CAMPAIGN_DATA.caseStudies.map((s) => ({ params: { slug: s.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const study = CAMPAIGN_DATA.caseStudies.find((s) => s.slug === params?.slug);
  if (!study) return { notFound: true };
  return { props: { study } };
};
