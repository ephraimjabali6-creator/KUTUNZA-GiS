-- Kutunza schema. Safe to run more than once.
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  target_amount NUMERIC NOT NULL,
  current_amount NUMERIC NOT NULL DEFAULT 0,
  currency VARCHAR(3) NOT NULL DEFAULT 'GBP',
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('draft','active','completed','paused')),
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id),
  donor_name TEXT,
  donor_email TEXT,
  amount NUMERIC NOT NULL,
  currency VARCHAR(8) NOT NULL,
  base_amount_usd NUMERIC,
  payment_intent_id TEXT UNIQUE,
  stripe_session_id TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','succeeded','failed','disputed','refunded')),
  is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
  frequency TEXT DEFAULT 'one_time',
  gift_aid BOOLEAN DEFAULT FALSE,
  cover_fees BOOLEAN DEFAULT FALSE,
  accepted_terms_at TIMESTAMPTZ,
  terms_version TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS processed_webhooks (
  event_id TEXT PRIMARY KEY,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  type TEXT,
  document_requested TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS donations_status_idx ON donations(status);
CREATE INDEX IF NOT EXISTS donations_created_idx ON donations(created_at DESC);
