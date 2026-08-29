/**
 * Organisation copy the client can edit later.
 * Charity number, bank details, and Gift Aid status stay placeholders until confirmed.
 */
export const ORG = {
  name: 'Kutunza',
  project: 'Girls in School',
  projectShort: 'GiS',
  tagline: 'Washable kits and puberty lessons so girls can stay in class.',
  domainPlaceholder: '[INSERT DOMAIN NAME]',
  charityNumber: '[INSERT CHARITY NUMBER]',
  contactEmail: 'giving@kutunza.org',
  privacyEmail: 'privacy@kutunza.org',
  giftAidStatus: 'unconfirmed' as 'unconfirmed' | 'active' | 'ineligible',
  bank: {
    name: '[INSERT ACCOUNT NAME]',
    sortCode: '[INSERT SORT CODE]',
    accountNumber: '[INSERT ACCOUNT NUMBER]',
    reference: 'GiS donation',
  },
  schools: ['Olympic Primary School', 'Ayany Primary School'],
  location: 'Kibera, Nairobi, Kenya',
};
