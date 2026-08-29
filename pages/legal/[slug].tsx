import { GetStaticPaths, GetStaticProps } from 'next';
import SiteLayout from '../../components/SiteLayout';
import { LEGAL_PAGES, LegalSlug } from '../../content/legal';

export default function LegalPage({ slug }: { slug: LegalSlug }) {
  const page = LEGAL_PAGES[slug];
  return (
    <SiteLayout title={page.title}>
      <article className="site-wrap max-w-3xl py-16 lg:py-24">
        <p className="eyebrow">Legal</p>
        <h1 className="display mt-4">{page.title}</h1>
        <p className="mt-3 text-sm text-ink-faint">{page.updated}</p>
        {page.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="font-serif text-2xl">{section.heading}</h2>
            <p className="body-copy mt-3">{section.body}</p>
          </section>
        ))}
      </article>
    </SiteLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (Object.keys(LEGAL_PAGES) as LegalSlug[]).map((slug) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as LegalSlug;
  if (!LEGAL_PAGES[slug]) return { notFound: true };
  return { props: { slug } };
};
