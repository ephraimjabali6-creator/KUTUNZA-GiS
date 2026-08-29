import { ORG } from '../content/org';
import { CAMPAIGN_DATA } from '../content/campaignData';

export default function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: `${ORG.name} — ${ORG.project}`,
    description: CAMPAIGN_DATA.projectTagline,
    email: ORG.contactEmail,
    areaServed: 'Kenya',
    potentialAction: {
      '@type': 'DonateAction',
      target: '/donate',
    },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
