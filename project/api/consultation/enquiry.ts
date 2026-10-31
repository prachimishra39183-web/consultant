
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
    const {
      name,
      contact,
      propertyType,
      location,
      details,
    } = req.body ?? {};

    if (
      typeof name !== 'string' || !name.trim() ||
      typeof contact !== 'string' || !contact.trim() ||
      typeof propertyType !== 'string' || !propertyType.trim() ||
      typeof location !== 'string' || !location.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required enquiry details.',
      });
    }

    if (
      name.length > 150 ||
      contact.length > 150 ||
      propertyType.length > 100 ||
      location.length > 2000 ||
      (details != null &&
        (typeof details !== 'string' || details.length > 5000))
    ) {
      return res.status(400).json({
        success: false,
        message: 'One or more fields exceed the allowed length.',
      });
    }

    const result = await sql`
      INSERT INTO consultation_enquiries (
        name,
        contact,
        property_type,
        location,
        details
      )
      VALUES (
        ${name.trim()},
        ${contact.trim()},
        ${propertyType.trim()},
        ${location.trim()},
        ${details?.trim() || null}
      )
      RETURNING id, name, contact, created_at
    `;

    return res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully.',
      enquiry: result[0],
    });

  } catch (error) {
    console.error('Enquiry API error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to submit enquiry.',
    });
  }
}
