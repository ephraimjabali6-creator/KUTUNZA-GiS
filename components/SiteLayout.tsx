import Head from 'next/head';
import { ReactNode } from 'react';
import { CAMPAIGN_DATA } from '../content/campaignData';
import Navigation from './Navigation';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import MobileDonateBar from './MobileDonateBar';
import JsonLd from './JsonLd';

interface Props {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function SiteLayout({ children, title, description }: Props) {
  const pageTitle = title
    ? `${title} | Kutunza`
    : `${CAMPAIGN_DATA.projectTitle} | Kutunza`;
  const desc = description || CAMPAIGN_DATA.projectTagline;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content="/images/hero-assembly.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <JsonLd />
      <Navigation />
      <main id="main" className="pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
      <CookieBanner />
      <MobileDonateBar />
    </>
  );
}
