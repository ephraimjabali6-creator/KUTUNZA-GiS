import { Pool } from 'pg';
import { CAMPAIGN_DATA } from '../content/campaignData';
import { formatMoney, toUsd } from './money';

export interface TransactionReceipt {
  id: string;
  amount: number;
  currency: string;
  donorName: string;
  donorEmail: string;
  message?: string;
  isAnonymous: boolean;
  frequency: 'one_time' | 'monthly';
  status: 'completed' | 'pending' | 'refunded';
  stripePaymentToken: string;
  stripeSessionId?: string;
  createdAt: string;
}

export interface ContactLog {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  type: 'general_inquiry' | 'document_request' | 'partnership';
  documentRequested?: string;
  createdAt: string;
}

export interface RecentDonation {
  id: string;
  donorName: string;
  amountFormatted: string;
  message?: string;
  timeAgo: string;
  isAnonymous: boolean;
}

export interface CampaignState {
  targetGoalUSD: number;
  currentRaisedUSD: number;
  totalDonorsCount: number;
  recentDonations: RecentDonation[];
  transactions: TransactionReceipt[];
  contactLogs: ContactLog[];
  processedSessions: Set<string>;
}

const globalForDb = global as unknown as {
  campaignState?: CampaignState;
  pgPool?: Pool;
};

export const defaultCampaignState = (): CampaignState => ({
  targetGoalUSD: CAMPAIGN_DATA.targetGoalUSD,
  currentRaisedUSD: CAMPAIGN_DATA.currentRaisedUSD,
  totalDonorsCount: CAMPAIGN_DATA.totalDonorsCount,
  recentDonations: [
    {
      id: 'rec-1',
      donorName: 'Dr. Sarah Jenkins',
      amountFormatted: '$150',
      message: 'For the girls of Olympic Junior Secondary.',
      timeAgo: '12 minutes ago',
      isAnonymous: false,
    },
    {
      id: 'rec-2',
      donorName: 'Anonymous supporter',
      amountFormatted: '$35',
      message: 'Every girl deserves uninterrupted school.',
      timeAgo: '45 minutes ago',
      isAnonymous: true,
    },
    {
      id: 'rec-3',
      donorName: 'Mark & Fiona L.',
      amountFormatted: '$75',
      message: 'Sponsoring two sisters in Kibera.',
      timeAgo: '2 hours ago',
      isAnonymous: false,
    },
    {
      id: 'rec-4',
      donorName: 'Nairobi Alumni Assoc.',
      amountFormatted: '$500',
      message: 'Whole-school menstrual dignity.',
      timeAgo: '5 hours ago',
      isAnonymous: false,
    },
  ],
  transactions: [],
  contactLogs: [],
  processedSessions: new Set(),
});

export const getDbState = (): CampaignState => {
  if (!globalForDb.campaignState) {
    globalForDb.campaignState = defaultCampaignState();
  }
  return globalForDb.campaignState;
};

function getPool(): Pool | null {
  if (!process.env.DATABASE_URL) return null;
  if (!globalForDb.pgPool) {
    globalForDb.pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes('localhost') ? undefined : { rejectUnauthorized: false },
    });
  }
  return globalForDb.pgPool;
}

/**
 * True on the first time this Stripe event id is seen, false on any retry.
 * Stripe retries webhooks on non-2xx responses, so this must be safe across
 * serverless cold starts — hence the DB-backed table, not just the in-memory
 * Set (which only protects a single warm instance and is used as a fallback
 * when no DATABASE_URL is configured, e.g. local/demo).
 */
export async function claimWebhookEvent(eventId: string): Promise<boolean> {
  const pool = getPool();
  if (!pool) {
    const db = getDbState();
    if (db.processedSessions.has(`evt_${eventId}`)) return false;
    db.processedSessions.add(`evt_${eventId}`);
    return true;
  }
  await ensureSchema();
  const result = await pool.query(
    `INSERT INTO processed_webhooks (event_id) VALUES ($1) ON CONFLICT (event_id) DO NOTHING RETURNING event_id`,
    [eventId]
  );
  return (result.rowCount ?? 0) > 0;
}

export async function ensureSchema() {
  const pool = getPool();
  if (!pool) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS donations (
      id TEXT PRIMARY KEY,
      amount NUMERIC NOT NULL,
      currency TEXT NOT NULL,
      amount_usd NUMERIC NOT NULL,
      donor_name TEXT,
      donor_email TEXT,
      message TEXT,
      is_anonymous BOOLEAN,
      frequency TEXT,
      stripe_session_id TEXT UNIQUE,
      stripe_payment_token TEXT,
      status TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS contact_logs (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      type TEXT,
      document_requested TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS processed_webhooks (
      event_id TEXT PRIMARY KEY,
      processed_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
}

export function recordDonation(donation: {
  amount: number;
  currency: string;
  donorName: string;
  donorEmail: string;
  message?: string;
  isAnonymous?: boolean;
  frequency?: 'one_time' | 'monthly';
  stripePaymentToken?: string;
  stripeSessionId?: string;
}): TransactionReceipt | null {
  const db = getDbState();
  if (donation.stripeSessionId && db.processedSessions.has(donation.stripeSessionId)) {
    return null;
  }

  const id = `rec_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const amountUSD = toUsd(donation.amount, donation.currency);
  const receipt: TransactionReceipt = {
    id,
    amount: donation.amount,
    currency: donation.currency.toUpperCase(),
    donorName: donation.isAnonymous ? 'Anonymous donor' : donation.donorName || 'Kind donor',
    donorEmail: donation.donorEmail || '',
    message: donation.message,
    isAnonymous: !!donation.isAnonymous,
    frequency: donation.frequency || 'one_time',
    status: 'completed',
    stripePaymentToken: donation.stripePaymentToken || `tok_${Date.now()}`,
    stripeSessionId: donation.stripeSessionId,
    createdAt: new Date().toISOString(),
  };

  db.transactions.unshift(receipt);
  db.currentRaisedUSD += Math.round(amountUSD);
  db.totalDonorsCount += 1;
  if (donation.stripeSessionId) db.processedSessions.add(donation.stripeSessionId);

  db.recentDonations.unshift({
    id: receipt.id,
    donorName: receipt.donorName,
    amountFormatted: formatMoney(receipt.amount, receipt.currency),
    message: receipt.message,
    timeAgo: 'Just now',
    isAnonymous: receipt.isAnonymous,
  });
  db.recentDonations = db.recentDonations.slice(0, 15);

  const pool = getPool();
  if (pool) {
    ensureSchema()
      .then(() =>
        pool.query(
          `INSERT INTO donations
            (id, amount, currency, amount_usd, donor_name, donor_email, message, is_anonymous, frequency, stripe_session_id, stripe_payment_token, status)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
           ON CONFLICT (stripe_session_id) DO NOTHING`,
          [
            receipt.id,
            receipt.amount,
            receipt.currency,
            amountUSD,
            receipt.donorName,
            receipt.donorEmail,
            receipt.message || null,
            receipt.isAnonymous,
            receipt.frequency,
            receipt.stripeSessionId || null,
            receipt.stripePaymentToken,
            receipt.status,
          ]
        )
      )
      .catch((err) => console.error('[db] donation persist failed', err));
  }

  return receipt;
}

export function recordContact(contact: {
  name: string;
  email: string;
  subject?: string;
  message: string;
  type?: ContactLog['type'];
  documentRequested?: string;
}): ContactLog {
  const db = getDbState();
  const log: ContactLog = {
    id: `cnt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: contact.name,
    email: contact.email,
    subject: contact.subject,
    message: contact.message,
    type: contact.type || 'general_inquiry',
    documentRequested: contact.documentRequested,
    createdAt: new Date().toISOString(),
  };
  db.contactLogs.unshift(log);

  const pool = getPool();
  if (pool) {
    ensureSchema()
      .then(() =>
        pool.query(
          `INSERT INTO contact_logs (id, name, email, subject, message, type, document_requested)
           VALUES ($1,$2,$3,$4,$5,$6,$7)`,
          [log.id, log.name, log.email, log.subject || null, log.message, log.type, log.documentRequested || null]
        )
      )
      .catch((err) => console.error('[db] contact persist failed', err));
  }

  return log;
}
