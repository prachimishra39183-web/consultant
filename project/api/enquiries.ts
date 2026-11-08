
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from './lib/db.js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const body =
      typeof req.body === 'string'
        ? JSON.parse(req.body)
        : req.body;

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return res.status(400).json({ error: 'Invalid request body.' });
    }

    const name =
      typeof body.name === 'string' ? body.name.trim() : '';
    const email =
      typeof body.email === 'string' ? body.email.trim() : '';
    const phone =
      typeof body.phone === 'string' ? body.phone.trim() : '';
    const interest =
      typeof body.interest === 'string'
        ? body.interest.trim()
        : 'General enquiry';
    const message =
      typeof body.message === 'string' ? body.message.trim() : '';

    if (
      !name ||
      name.length > 120 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 255 ||
      phone.length > 30 ||
      interest.length > 150 ||
      message.length > 2000
    ) {
      return res.status(400).json({
        error: 'Please check your enquiry details and try again.',
      });
    }

    const result = await sql`
      INSERT INTO public.enquiries
        (name, email, phone, interest, message)
      VALUES
        (
          ${name},
          ${email},
          ${phone || null},
          ${interest || 'General enquiry'},
          ${message || null}
        )
      RETURNING id, created_at
    `;

    return res.status(201).json({
      success: true,
      enquiry: result[0],
    });
  } catch (error) {
    console.error('Enquiry submission failed:', error);

    return res.status(500).json({
      error: 'Could not save your enquiry. Please try again later.',
    });
  }
}
