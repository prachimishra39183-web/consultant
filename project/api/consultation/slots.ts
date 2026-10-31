
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const date = req.query.date;

    if (
      typeof date !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !Number.isFinite(Date.parse(`${date}T00:00:00Z`))
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid date (YYYY-MM-DD).',
      });
    }

    const slots = await sql`
      SELECT selected_slot
      FROM consultation_bookings
      WHERE booking_status = 'confirmed'
        AND selected_slot >= ${date}::date
        AND selected_slot < (${date}::date + INTERVAL '1 day')
      ORDER BY selected_slot ASC
    `;

    return res.status(200).json({
      success: true,
      bookedSlots: slots.map(
        (item) => item.selected_slot
      ),
    });

  } catch (error) {
    console.error('Slots API error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch appointment slots.',
    });
  }
}
