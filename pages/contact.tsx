import { FormEvent, useState } from 'react';
import SiteLayout from '../components/SiteLayout';
import { CAMPAIGN_DATA } from '../content/campaignData';
import { ORG } from '../content/org';

export default function ContactPage() {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setStatus('');
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get('name') || ''),
      email: String(form.get('email') || '').toLowerCase().trim(),
      organisation: String(form.get('organisation') || ''),
      type: String(form.get('type') || 'general_inquiry'),
      documentRequested: String(form.get('documentRequested') || ''),
      subject: String(form.get('subject') || ''),
      message: String(form.get('message') || ''),
      newsletterOptIn: form.get('newsletterOptIn') === 'on',
      // Honeypot: real visitors never fill this hidden field in. Bots that fill
      // every input do, and the API silently drops those submissions.
      companyWebsite: String(form.get('companyWebsite') || ''),
    };
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setBusy(false);
    setStatus(data.message || data.error || 'Sent.');
    if (res.ok) e.currentTarget.reset();
  }

  return (
    <SiteLayout title="Contact">
      <section className="site-wrap grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="eyebrow">Section 4 · Connect &amp; inquire</p>
          <h1 className="display mt-4">Contact us &amp; governance requests.</h1>
          <p className="body-copy mt-6">
            <a className="underline" href={`mailto:${ORG.contactEmail}`}>
              {ORG.contactEmail}
            </a>
          </p>
          <p className="eyebrow mt-8">Field &amp; liaison offices</p>
          <p className="mt-4 text-sm leading-6 text-ink-muted">{CAMPAIGN_DATA.contactInfo.addressUK}</p>
          <p className="mt-2 text-sm text-ink-muted">{CAMPAIGN_DATA.contactInfo.addressKenya}</p>
          <p className="mt-2 text-sm text-ink-muted">{CAMPAIGN_DATA.contactInfo.phoneInternational}</p>
          <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            <a className="underline" href={CAMPAIGN_DATA.socialLinks.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a className="underline" href={CAMPAIGN_DATA.socialLinks.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </p>
          <div id="document-requests">
            <p className="eyebrow mt-10">Official document requests</p>
            <p className="mt-2 text-sm leading-6 text-ink-muted">
              Request any of the documents below and we will email the file to the address you
              provide in the form.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {CAMPAIGN_DATA.documentsAvailable.map((doc) => (
                <li key={doc.id} className="border-t border-line pt-3">
                  {doc.title} <span className="text-ink-faint">({doc.size})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <form onSubmit={onSubmit} className="border border-line p-6 sm:p-8">
          <p className="eyebrow">Send a direct message</p>
          {/* Honeypot field for spam bots — hidden from real visitors via CSS, not `type=hidden`,
              since some bots specifically skip hidden inputs. */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label>
              Company website
              <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <label className="block text-sm">
            Name
            <input name="name" required className="field mt-2" autoComplete="name" />
          </label>
          <label className="mt-4 block text-sm">
            Email
            <input name="email" type="email" required className="field mt-2" autoComplete="email" />
          </label>
          <label className="mt-4 block text-sm">
            Organisation (optional)
            <input name="organisation" className="field mt-2" />
          </label>
          <label className="mt-4 block text-sm">
            Enquiry type
            <select name="type" className="field mt-2">
              <option value="general_inquiry">General</option>
              <option value="document_request">Document request</option>
              <option value="partnership">Partnership</option>
            </select>
          </label>
          <label className="mt-4 block text-sm">
            Document (if requesting)
            <select name="documentRequested" className="field mt-2">
              <option value="">—</option>
              {CAMPAIGN_DATA.documentsAvailable.map((doc) => (
                <option key={doc.id} value={doc.title}>
                  {doc.title}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-4 block text-sm">
            Subject
            <input name="subject" className="field mt-2" />
          </label>
          <label className="mt-4 block text-sm">
            Message
            <textarea name="message" required className="field mt-2 min-h-[140px]" maxLength={4000} />
          </label>
          <label className="mt-4 flex items-start gap-3 text-sm">
            <input type="checkbox" name="newsletterOptIn" className="mt-1" />
            Send me occasional updates about the programme (optional).
          </label>
          <label className="mt-4 flex items-start gap-3 text-sm">
            <input type="checkbox" required className="mt-1" />
            I agree to the privacy notice for this enquiry.
          </label>
          <button type="submit" className="btn-primary mt-6 min-h-12" disabled={busy}>
            {busy ? 'Sending…' : 'Send'}
          </button>
          {status && <p className="mt-4 text-sm text-ink-muted">{status}</p>}
        </form>
      </section>
    </SiteLayout>
  );
}
