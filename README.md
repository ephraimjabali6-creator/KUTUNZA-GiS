# Kutunza — Girls in School

Charity site for UK donors funding washable sanitary packs and puberty lessons at Olympic Primary and Ayany Primary in Nairobi.

## Run locally

```bash
cd kutunza
npm install
# DEMO_PAYMENTS=true in .env.local lets you walk checkout without Stripe keys
npm run dev
```

Open http://localhost:3000

## Swap to the client's accounts later

Edit `.env.local` only (or Vercel env). No code changes:

- `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `RESEND_API_KEY` / `RESEND_FROM_EMAIL` / `NOTIFY_EMAIL`
- `DATABASE_URL` (optional Postgres; otherwise in-memory)
- Set `DEMO_PAYMENTS=false` before production

Organisation placeholders (charity number, bank, Gift Aid) live in `content/org.ts`.
Copy and headlines live in `content/campaignData.ts`.
Legal copy lives in `content/legal.ts`.

## Tests

```bash
npm test
npm run build
```

Webhook: `POST /api/webhooks/stripe` with Stripe signature. Schema: `sql/schema.sql`.
