/**
 * Legal copy for /legal/[slug]. Bracketed placeholders (e.g. [INSERT CHARITY NUMBER])
 * are the only parts that need a client-supplied fact before launch; everything else
 * is complete, review-ready policy text.
 */
export const LEGAL_PAGES = {
  terms: {
    title: 'Terms & Conditions of Giving and Platform Use',
    updated: 'Last updated: August 2026',
    sections: [
      {
        heading: 'Acceptance of these terms',
        body: 'By browsing this website or making a donation through it, you agree to these terms and to applicable Kenyan and UK fundraising law. If you do not agree, please do not use the payment services on this site. These terms apply alongside our Privacy Notice, Cookie Policy, and Refunds & Cancellations policy, all linked in the footer.',
      },
      {
        heading: 'Who we are',
        body: 'This website is operated by Kutunza in support of the Girls in School programme, which delivers puberty education and reusable sanitary packs to primary schools in Kenya, currently Olympic Primary and Ayany Primary. Registered charity number: [INSERT CHARITY NUMBER]. Registered office: [INSERT REGISTERED ADDRESS].',
      },
      {
        heading: 'Eligibility',
        body: 'You must be at least 18 years old, or have the permission of a parent or guardian, to make a donation on this site. By donating you confirm that the payment method belongs to you or that you are authorised to use it, and that the funds are not the proceeds of unlawful activity.',
      },
      {
        heading: 'Charitable gifts',
        body: 'Donations made through this site are voluntary gifts to support the programme described above. Gifts are non-refundable except as set out in our Refunds & Cancellations policy or where required by UK consumer protection law. We aim to apply your gift to the programme within the current or following procurement cycle, but exact timing depends on school terms, shipping, and customs clearance into Kenya.',
      },
      {
        heading: 'Payments and pricing',
        body: 'Amounts are shown in the currency you select at checkout; card issuers may apply their own conversion rate and fees for cross-border transactions, which we do not control. You confirm you are authorised to use the chosen payment method. Card details are handled entirely by Stripe, our payment processor. This site stores only receipt metadata and payment tokens, never raw card numbers, CVV codes, or PINs.',
      },
      {
        heading: 'Recurring (monthly) donations',
        body: 'If you choose a monthly gift, your payment method will be charged automatically on the same date each month until you cancel. You can cancel at any time before the next billing date by emailing giving@kutunza.org or using the link in your receipt email; cancellation stops future charges but does not refund the current month once it has been collected.',
      },
      {
        heading: 'Photographs, stories, and intellectual property',
        body: 'Field photographs, video, and student stories published on this site are used with institutional and, where a child is shown, parental or guardian consent, for the purpose of charitable advocacy and fundraising. All text, images, and design on this site are owned by Kutunza or used under licence; commercial reuse, republication, or redistribution without our prior written permission is not allowed.',
      },
      {
        heading: 'Acceptable use',
        body: 'You agree not to use this site to submit false payment information, to attempt to disrupt or gain unauthorised access to our systems, or to upload unlawful, defamatory, or abusive content through the contact form.',
      },
      {
        heading: 'Liability',
        body: 'This site and the information on it are provided "as is". We take reasonable care to keep the site accurate and available, but we do not guarantee uninterrupted access and are not liable for indirect or consequential loss arising from your use of the site, except where such liability cannot be excluded by law (for example, liability for fraud or for death or personal injury caused by our negligence).',
      },
      {
        heading: 'Governing law',
        body: 'These terms are governed by the laws of England and Wales, and by applicable Kenyan law for on-the-ground programme activity. Disputes are subject to the exclusive jurisdiction of the courts of England and Wales, without prejudice to any mandatory consumer protections available to you in your country of residence.',
      },
      {
        heading: 'Changes to these terms',
        body: 'We may update these terms as the platform, our registration status, or the law changes. The date at the top of this page shows the last revision. Continuing to use the site after a change is published means you accept the update; if a change is material we will also note it on the homepage.',
      },
      {
        heading: 'Contact',
        body: 'Questions about these terms can be sent to giving@kutunza.org.',
      },
    ],
  },

  privacy: {
    title: 'Privacy Notice & Data Protection Compliance',
    updated: 'Compliant with the Kenya Data Protection Act 2019 and UK GDPR — last updated August 2026',
    sections: [
      {
        heading: 'Who controls your data',
        body: 'Kutunza is the data controller for personal information collected through this website, for the purposes of both the UK GDPR and the Kenya Data Protection Act 2019. We do not sell, rent, or trade donor lists to any third party.',
      },
      {
        heading: 'What we collect',
        body: 'Depending on how you interact with the site, we collect: your name and email address; a gift amount, currency, and frequency; an optional message you leave with a donation; Gift Aid declaration details (UK taxpayer status, address, and postcode) if you opt in; contact form fields (name, email, organisation, enquiry type, message); and Stripe payment or session identifiers used to reconcile a payment. We never store card numbers, CVV codes, or PINs on our servers — these are handled entirely by Stripe.',
      },
      {
        heading: 'Automatically collected data',
        body: 'Like most websites, our hosting and analytics tools may log your IP address, browser type, and pages visited, for security and to understand site performance in aggregate. See our Cookie Policy for details on optional analytics cookies, which are off by default until you accept them.',
      },
      {
        heading: 'Why we process it',
        body: 'We process your data to: process and receipt your donation; fulfil document requests you make through the contact form; keep the accounting and Gift Aid records charity law requires us to keep; respond to enquiries; and, only if you opt in, send you occasional programme updates. We do not use your data for automated decision-making or profiling.',
      },
      {
        heading: 'Legal basis for processing',
        body: 'We process donation and Gift Aid data under our legal obligation to keep accurate charity accounts, and under contract to fulfil the gift you have made. We process optional newsletter sign-ups and contact form enquiries with your consent, which you may withdraw at any time.',
      },
      {
        heading: 'Who we share it with',
        body: 'We share payment data with Stripe, our PCI-DSS compliant payment processor, strictly to process your transaction. We share email delivery data with our transactional email provider solely to send receipts and responses. We do not share your data with advertisers or data brokers. We may disclose data if required by law, for example to HMRC in connection with a Gift Aid claim.',
      },
      {
        heading: 'International transfers',
        body: 'Because the programme operates in Kenya and our office functions span the UK, your data may be processed in both jurisdictions and by service providers located elsewhere (for example, Stripe\'s infrastructure). Where data leaves the UK or Kenya, we rely on our providers\' standard contractual safeguards.',
      },
      {
        heading: 'Data retention',
        body: 'Donation and receipt records, including Gift Aid declarations, are kept for as long as required by UK and Kenyan charity accounting and tax law (typically at least six years after the relevant tax year), then deleted or anonymised. Contact form messages not tied to a donation are kept for up to two years unless you ask us to delete them sooner.',
      },
      {
        heading: 'Your rights',
        body: 'Subject to applicable law, you may ask us to: give you a copy of the personal data we hold about you; correct inaccurate data; delete data we no longer need to keep for legal reasons; restrict or object to certain processing; and receive your data in a portable format. To exercise any of these rights, write to privacy@kutunza.org. If you are unhappy with our response, you can complain to the UK Information Commissioner\'s Office (ico.org.uk) or Kenya\'s Office of the Data Protection Commissioner (odpc.go.ke).',
      },
      {
        heading: 'Children\'s data',
        body: 'This site is not directed at children, and we do not knowingly collect personal data from children through the donation or contact forms. Photographs of students that appear elsewhere on the site are governed by our safeguarding policy, not by data submitted through this site.',
      },
      {
        heading: 'Security',
        body: 'We use industry-standard technical measures — including TLS encryption in transit, restricted server access, and a payment processor that is independently PCI-DSS certified — to protect the data we hold. No system is perfectly secure, and we encourage you to contact us immediately at privacy@kutunza.org if you believe your data has been compromised.',
      },
      {
        heading: 'Contact',
        body: 'Questions or requests about this notice can be sent to privacy@kutunza.org.',
      },
    ],
  },

  refund: {
    title: 'Refund & Cancellation Policy',
    updated: 'Last updated: August 2026',
    sections: [
      {
        heading: 'Our general approach',
        body: 'Because we begin procuring kits and educational materials shortly after a gift is received, one-time donations are generally treated as final. That said, we will always put things right where a genuine mistake has occurred — see below.',
      },
      {
        heading: 'When we will refund a one-time gift',
        body: 'We will issue a refund if: you were charged more than once for the same gift (a duplicate charge); you made an obvious error in the amount entered (for example, an extra digit); or your card was used without your authorisation. Report any of these to giving@kutunza.org within 30 days of the charge, including your name, the date, the amount, and your receipt ID, and we will investigate and respond within 5 business days.',
      },
      {
        heading: 'Monthly (recurring) gifts',
        body: 'You can cancel or pause a monthly gift at any time, with no notice period, by emailing giving@kutunza.org or using the manage-my-gift link in your receipt email. Cancellation takes effect before your next billing date. We do not prorate or refund the portion of a month already paid, since that gift has typically already been allocated to a current kit order.',
      },
      {
        heading: 'How to request a refund',
        body: 'Email giving@kutunza.org with your name, the date of the transaction, the amount, and your receipt ID (found in your confirmation email). We may ask for further verification to protect against fraudulent refund requests.',
      },
      {
        heading: 'How refunds are paid',
        body: 'Approved refunds are returned to the original payment method used for the donation. Stripe typically completes this within 5–7 business days, though your bank or card issuer may take longer to show the credit on your statement.',
      },
      {
        heading: 'Chargebacks',
        body: 'If you dispute a charge directly with your bank instead of contacting us first, please still let us know at giving@kutunza.org — we are usually able to resolve genuine errors faster than a formal chargeback process, and it helps us keep our merchant account in good standing so we can keep accepting donations.',
      },
    ],
  },

  cookies: {
    title: 'Cookie Policy',
    updated: 'Last updated: August 2026',
    sections: [
      {
        heading: 'What cookies are',
        body: 'Cookies are small text files stored on your device that help a website function and, optionally, help us understand how it is used. We use as few as possible.',
      },
      {
        heading: 'Strictly necessary',
        body: 'These are required for the site to work and cannot be switched off: routing you securely through the Stripe checkout flow, protecting the site against cross-site request forgery, and remembering the cookie choice you make on this banner so we don\'t ask again on every page.',
      },
      {
        heading: 'Analytics (optional)',
        body: 'If you accept analytics cookies, we collect aggregated, anonymised information about which pages are visited and roughly how, so we can improve the donation journey. This is off by default and only activates after you accept it in the cookie banner.',
      },
      {
        heading: 'Functional (optional)',
        body: 'If accepted, a functional cookie remembers your preferred currency on this device so you don\'t have to reselect it on your next visit. It stores no personal information beyond that preference.',
      },
      {
        heading: 'Third-party cookies',
        body: 'When you reach the Stripe-hosted checkout page, Stripe may set its own cookies under its own privacy policy, needed for fraud prevention and to complete your payment. We do not control these directly.',
      },
      {
        heading: 'Managing your choice',
        body: 'You can change your cookie preferences at any time using the "Cookie settings" link in the footer, or by clearing cookies in your browser, which will show the banner again on your next visit.',
      },
    ],
  },

  pci: {
    title: 'PCI-DSS Level 1 Compliance & Security Standard',
    updated: 'PCI-DSS compliance via Stripe — last updated August 2026',
    sections: [
      {
        heading: 'We never touch your card details',
        body: 'All card entry happens on Stripe\'s own hosted Checkout page or embedded Stripe Elements, both served directly from Stripe\'s PCI-DSS Level 1 certified infrastructure — the highest level of certification in the payments industry. This application never receives, transmits, or stores your raw card number, expiry date, or CVV.',
      },
      {
        heading: 'What our servers actually store',
        body: 'After a successful payment, Stripe sends our server a signed webhook event containing a payment/session identifier and the amount charged, which we use only to generate your receipt and keep charity accounting records. If you choose to save a card for future donations, Stripe stores a secure token on our behalf; we only ever see the token, never the underlying card data.',
      },
      {
        heading: 'Encryption in transit',
        body: 'All traffic to and from this site, and between this site and Stripe, is encrypted using TLS. The site also sends HTTP Strict Transport Security headers so browsers refuse to load it over an unencrypted connection.',
      },
      {
        heading: 'Webhook integrity',
        body: 'Donation receipts are only written to our database after Stripe cryptographically signs the checkout.session.completed event with a secret only Stripe and our server know. Unsigned or replayed events are rejected, and each event is processed at most once even if Stripe retries delivery.',
      },
      {
        heading: 'Fraud prevention',
        body: 'Stripe Radar screens transactions for fraud signals in real time. Our own API additionally rate-limits repeated donation attempts from the same client to reduce card-testing abuse.',
      },
      {
        heading: 'Reporting a concern',
        body: 'If you believe there has been unauthorised use of your card on this site, contact your card issuer immediately and also email giving@kutunza.org so we can investigate on our end.',
      },
    ],
  },

  accessibility: {
    title: 'Accessibility Statement',
    updated: 'Target: WCAG 2.1 Level AA — last updated August 2026',
    sections: [
      {
        heading: 'Our commitment',
        body: 'We want everyone, including people using assistive technology, to be able to learn about the programme and donate. We build to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA as our working standard.',
      },
      {
        heading: 'What we\'ve built in',
        body: 'Semantic HTML landmarks and headings so screen readers can navigate the page structure; visible keyboard focus states on every interactive element; full keyboard operability of the navigation, forms, and donation flow; descriptive alt text on meaningful images; and colour combinations chosen to meet minimum contrast ratios.',
      },
      {
        heading: 'Known limitations',
        body: 'Some embedded third-party content, such as the Stripe checkout page and any embedded video players, is controlled by those providers rather than by us; we choose vendors who publish their own accessibility commitments, but cannot guarantee their pages to the same standard as ours.',
      },
      {
        heading: 'Feedback',
        body: 'If you hit a barrier using this site with assistive technology, please tell us — we treat these reports as priority fixes, not just feedback. Email accessibility@kutunza.org with the page and what happened, and where possible, what device or software you were using.',
      },
    ],
  },

  governance: {
    title: 'Charity registration & governance',
    updated: 'Last updated: August 2026',
    sections: [
      {
        heading: 'Registration',
        body: 'Kutunza operates the Girls in School programme. Registered charity number: [INSERT CHARITY NUMBER]. Registered office: [INSERT REGISTERED ADDRESS]. Kenyan programme registration: [INSERT KENYA NGO/CBO REGISTRATION NUMBER]. Certificates for both registrations are available on request through our document request form.',
      },
      {
        heading: 'Accounts and independent audit',
        body: 'Annual accounts, prepared to the relevant UK charity accounting standard, and an independent financial audit are published each year. Copies of the most recent annual report and audit statement can be requested through the contact page and are listed under Document Requests.',
      },
      {
        heading: 'Trustees and oversight',
        body: 'The charity is overseen by a board of trustees who meet regularly to review programme spending, safeguarding practice, and strategic direction. Current trustee names and any relevant declared interests are published in the annual report, available on request.',
      },
      {
        heading: 'How we spend donations',
        body: 'Our published spending breakdown is shown on the Donate page under Trust & Transparency: the large majority of every gift funds kits and hygiene supplies directly, with a smaller share for health education workshops and the minimum needed for governance, audit, and compliant payment processing.',
      },
      {
        heading: 'Safeguarding',
        body: 'All staff and volunteers who work with schools and students follow a written safeguarding policy, including background checks appropriate to their role and a clear reporting line for concerns. Photographs and stories involving children are only published with institutional and, where required, parental or guardian consent.',
      },
      {
        heading: 'Complaints and concerns',
        body: 'If you have a concern about our governance, spending, or conduct, you can raise it confidentially by emailing privacy@kutunza.org. Serious concerns can also be reported to the relevant charity regulator in the UK or Kenya.',
      },
    ],
  },
} as const;

export type LegalSlug = keyof typeof LEGAL_PAGES;
