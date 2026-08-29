import { Resend } from 'resend';
import { escapeHtml } from './validation';
import { formatMoney } from './money';
import { ORG } from '../content/org';

function buildReceiptText(details: {
  donorName: string;
  amount: number;
  currency: string;
  receiptId: string;
  frequency?: 'one_time' | 'monthly';
  giftAid?: boolean;
  date: Date;
}) {
  const lines = [
    `${ORG.name} — ${ORG.project}`,
    `Donation receipt ${details.receiptId}`,
    '',
    `Donor: ${details.donorName}`,
    `Date: ${details.date.toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' })}`,
    `Amount: ${formatMoney(details.amount, details.currency)}${details.frequency === 'monthly' ? ' (recurring monthly)' : ' (one-time)'}`,
    details.giftAid ? 'Gift Aid: Requested on this donation.' : undefined,
    `Charity number: ${ORG.charityNumber}`,
    '',
    'Card payments are processed by Stripe. This organisation never stores card numbers.',
    `Questions? Email ${ORG.contactEmail}`,
  ].filter(Boolean);
  return lines.join('\n');
}

export async function sendDonationReceipt(details: {
  recipient: string;
  donorName: string;
  amount: number;
  currency: string;
  receiptId: string;
  frequency?: 'one_time' | 'monthly';
  giftAid?: boolean;
}) {
  const date = new Date();
  const receiptText = buildReceiptText({ ...details, date });

  if (!process.env.RESEND_API_KEY || !details.recipient.includes('@')) {
    console.log(`[email] Receipt ${details.receiptId} for ${details.recipient} (${formatMoney(details.amount, details.currency)})`);
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL || 'Kutunza <giving@kutunza.org>';

  await resend.emails.send({
    from,
    to: [details.recipient],
    subject: `Thank you for supporting girls in Kenya — ${details.receiptId}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #121212; padding: 32px;">
        <p style="letter-spacing: 0.16em; text-transform: uppercase; font-size: 11px; color: #2D6A4F;">Kutunza</p>
        <h1 style="font-size: 28px; line-height: 1.2;">Thank you, ${escapeHtml(details.donorName)}.</h1>
        <p style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #4A4A4A;">
          Your ${details.frequency === 'monthly' ? 'monthly' : 'one-time'} gift of
          <strong>${escapeHtml(formatMoney(details.amount, details.currency))}</strong>
          helps equip schoolgirls in Nairobi with washable menstrual kits and puberty education.
        </p>
        ${details.giftAid ? '<p style="font-family: Arial, sans-serif; font-size: 13px; color: #4A4A4A;">Gift Aid has been requested on this donation, subject to the charity\'s active HMRC registration.</p>' : ''}
        <table style="width: 100%; font-family: Arial, sans-serif; font-size: 13px; color: #4A4A4A; margin-top: 20px; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; border-top: 1px solid #E6E6E2;">Receipt</td><td style="padding: 6px 0; border-top: 1px solid #E6E6E2; text-align: right;">${escapeHtml(details.receiptId)}</td></tr>
          <tr><td style="padding: 6px 0; border-top: 1px solid #E6E6E2;">Date</td><td style="padding: 6px 0; border-top: 1px solid #E6E6E2; text-align: right;">${escapeHtml(date.toLocaleDateString('en-GB'))}</td></tr>
          <tr><td style="padding: 6px 0; border-top: 1px solid #E6E6E2;">Charity number</td><td style="padding: 6px 0; border-top: 1px solid #E6E6E2; text-align: right;">${escapeHtml(ORG.charityNumber)}</td></tr>
        </table>
        <p style="font-family: Arial, sans-serif; font-size: 12px; color: #6B6B6B; margin-top: 24px;">
          A copy of this receipt is attached. Card payments are processed by Stripe; we never see or store your card number.
        </p>
      </div>
    `,
    attachments: [
      {
        filename: `kutunza-receipt-${details.receiptId}.txt`,
        content: Buffer.from(receiptText, 'utf-8').toString('base64'),
      },
    ],
  });
}

export async function sendContactNotification(details: {
  name: string;
  email: string;
  subject?: string;
  message: string;
  type: string;
  documentRequested?: string;
  logId: string;
}) {
  const notify = process.env.NOTIFY_EMAIL;
  if (!process.env.RESEND_API_KEY || !notify) {
    console.log(`[email] Contact ${details.logId} from ${details.email}`);
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL || 'Kutunza <notifications@kutunza.org>';

  await resend.emails.send({
    from,
    to: [notify],
    reply_to: details.email,
    subject: `[${details.type}] ${details.subject || 'New inquiry'} — ${details.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 24px; color: #121212;">
        <p><strong>Name:</strong> ${escapeHtml(details.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(details.email)}</p>
        <p><strong>Type:</strong> ${escapeHtml(details.type)}</p>
        ${details.documentRequested ? `<p><strong>Document:</strong> ${escapeHtml(details.documentRequested)}</p>` : ''}
        <p>${escapeHtml(details.message)}</p>
        <p style="color:#6B6B6B;font-size:12px;">Ref ${escapeHtml(details.logId)}</p>
      </div>
    `,
  });
}
