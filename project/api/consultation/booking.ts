
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { enquiryId, bookingType } = req.body ?? {};

    if (
      typeof enquiryId !== 'string' ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(enquiryId)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid enquiry ID.',
      });
    }

    if (!['regular', 'urgent'].includes(bookingType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid consultation type.',
      });
    }

    const amount = bookingType === 'urgent' ? 6100 : 5100;

    const result = await sql`
      INSERT INTO consultation_bookings (
        enquiry_id,
        booking_type,
        booking_amount,
        payment_status,
        booking_status
      )
      SELECT
        id,
        ${bookingType},
        ${amount},
        'pending',
        'pending'
      FROM consultation_enquiries
      WHERE id = ${enquiryId}
      RETURNING id, enquiry_id, booking_type,
                booking_amount, payment_status,
                booking_status, created_at
    `;

    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Booking created. Payment is pending.',
      booking: result[0],
    });

  } catch (error) {
    console.error('Booking API error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to create booking.',
    });
  }
}
