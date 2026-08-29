import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  res.setHeader('Content-Type', 'text/plain');
  res.write(`User-agent: *
Allow: /
Disallow: /api/
Sitemap: ${origin}/sitemap.xml
`);
  res.end();
  return { props: {} };
};

export default function Robots() {
  return null;
}
