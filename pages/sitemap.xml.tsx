import type { GetServerSideProps } from 'next';
import { CAMPAIGN_DATA } from '../content/campaignData';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || `https://${req.headers.host}`;
  const staticPaths = ['/', '/about', '/how-it-works', '/testimonials', '/insights', '/donate', '/contact', '/help'];
  const legal = [
    '/legal/terms',
    '/legal/privacy',
    '/legal/cookies',
    '/legal/refund',
    '/legal/accessibility',
    '/legal/pci',
    '/legal/governance',
  ];
  const posts = CAMPAIGN_DATA.caseStudies.map((s) => `/insights/${s.slug}`);
  const urls = [...staticPaths, ...legal, ...posts];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join('\n')}
</urlset>`;
  res.setHeader('Content-Type', 'application/xml');
  res.write(xml);
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
