import type { NextApiRequest, NextApiResponse } from 'next';
import { getDbState } from '../../lib/db';
import { campaignPercentage } from '../../lib/money';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const db = getDbState();
  res.setHeader('Cache-Control', 'public, s-maxage=5, stale-while-revalidate=30');
  return res.status(200).json({
    success: true,
    targetGoalUSD: db.targetGoalUSD,
    currentRaisedUSD: db.currentRaisedUSD,
    percentage: campaignPercentage(db.currentRaisedUSD, db.targetGoalUSD),
    totalDonorsCount: db.totalDonorsCount,
    recentDonations: db.recentDonations,
    lastUpdated: new Date().toISOString(),
  });
}
