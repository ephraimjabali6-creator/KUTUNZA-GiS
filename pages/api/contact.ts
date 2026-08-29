import type { NextApiRequest, NextApiResponse } from 'next';
import { recordContact } from '../../lib/db';
import { parseContactBody } from '../../lib/validation';
import { rateLimit } from '../../lib/rateLimit';
import { sendContactNotification } from '../../lib/email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || 'unknown';
  if (!rateLimit(`contact:${ip}`, 6, 60_000)) {
    return res.status(429).json({ error: 'Too many messages. Please wait a minute.' });
  }

  const parsed = parseContactBody(req.body);
  if (!parsed.ok) {
    return res.status(400).json({ error: parsed.error });
  }

  if (parsed.isBot) {
    // Pretend success so automated submitters don't learn to remove the field.
    return res.status(200).json({
      success: true,
      logId: 'n/a',
      message: 'Thank you. The Nairobi and London desks will reply within one working day.',
    });
  }

  try {
    const log = recordContact(parsed.data);
    await sendContactNotification({ ...parsed.data, logId: log.id }).catch((err) =>
      console.warn('[contact email]', err)
    );

    return res.status(200).json({
      success: true,
      logId: log.id,
      message:
        parsed.data.type === 'document_request'
          ? 'Your document request is with the team. We will send the file to your email shortly.'
          : 'Thank you. The Nairobi and London desks will reply within one working day.',
    });
  } catch (error) {
    console.error('[contact]', error);
    return res.status(500).json({ error: 'Could not send your message. Please try again.' });
  }
}
