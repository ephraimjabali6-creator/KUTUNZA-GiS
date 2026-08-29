import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';

// Canonical content now lives at /testimonials (matches the approved site map).
// This keeps any old links or bookmarks to /impact working via a redirect.
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.writeHead(308, { Location: '/testimonials' });
  res.end();
  return { props: {} };
};

export default function ImpactRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/testimonials');
  }, [router]);
  return null;
}
