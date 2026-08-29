import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    questions: [
      {
        q: 'How are donations used?',
        a: 'Public gifts buy washable sanitary packs, teaching materials, and transport to Kenya.',
      },
      {
        q: 'Which schools?',
        a: 'Olympic Primary and Ayany Primary in Nairobi.',
      },
      {
        q: 'Is payment secure?',
        a: 'Cards are processed by Stripe. This site never stores card numbers.',
      },
    ],
  });
}
