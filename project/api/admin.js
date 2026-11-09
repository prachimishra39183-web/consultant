import { createHmac, timingSafeEqual } from 'node:crypto';
import { neon } from '@neondatabase/serverless';

function sign(value, secret) {
  return createHmac('sha256', secret)
    .update(value)
    .digest('base64url');
}

function verifySession(token) {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || secret.length < 32 || !token) return null;

  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [payload, signature] = parts;
    const expected = sign(payload, secret);
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);

    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return null;
    }

    const session = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf8')
    );

    if (
      session.name !== process.env.ADMIN_NAME ||
      typeof session.exp !== 'number' ||
      session.exp <= Date.now()
    ) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

function getBody(req) {
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return req.body ?? {};
}

function getId(value) {
  return (
    typeof value === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value
    )
  );
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const session = verifySession(req.cookies?.admin_session);

  if (!session) {
    return res.status(401).json({
      message: 'Admin session expired. Please log in again.',
    });
  }

  if (!process.env.DATABASE_URL) {
    return res.status(500).json({
      message: 'DATABASE_URL is not configured.',
    });
  }

  const sql = neon(process.env.DATABASE_URL);
  const action = String(req.query.action ?? '');
  const body = getBody(req);

  try {
    // DASHBOARD
    if (action === 'dashboard' && req.method === 'GET') {
      const [
        enquiryCounts,
        bookingCounts,
        recentEnquiries,
        upcomingBookings,
      ] = await Promise.all([
        // General enquiries come from public.enquiries
        sql`
          SELECT
            COUNT(*)::int AS total,
            COUNT(*) FILTER (
              WHERE LOWER(COALESCE(enquiry_status, 'new')) = 'new'
            )::int AS new_count,
            COUNT(*) FILTER (
              WHERE LOWER(COALESCE(enquiry_status, 'new')) = 'contacted'
            )::int AS contacted_count
          FROM public.enquiries
        `,

        // Consultation bookings remain separate
        sql`
          SELECT
            COUNT(*)::int AS total,
            COUNT(*) FILTER (
              WHERE booking_status = 'confirmed'
            )::int AS confirmed,
            COUNT(*) FILTER (
              WHERE payment_status = 'pending'
            )::int AS pending_payments
          FROM consultation_bookings
        `,

        // Latest general enquiries
        sql`
          SELECT
            id,
            name,
            email,
            phone,
            COALESCE(NULLIF(phone, ''), email) AS contact,
            interest,
            interest AS property_type,
            message,
            message AS details,
            NULL::text AS location,
            created_at,
            enquiry_status
          FROM public.enquiries
          ORDER BY created_at DESC
          LIMIT 5
        `,

        // Upcoming consultation bookings
        sql`
          SELECT
            b.*,
            e.name,
            e.contact,
            e.property_type,
            e.location
          FROM consultation_bookings b
          LEFT JOIN consultation_enquiries e
            ON e.id = b.enquiry_id
          WHERE b.selected_slot >= NOW()
            AND b.booking_status = 'confirmed'
          ORDER BY b.selected_slot ASC
          LIMIT 5
        `,
      ]);

      const stats = {
        totalEnquiries: enquiryCounts[0]?.total ?? 0,
        newEnquiries: enquiryCounts[0]?.new_count ?? 0,
        contactedEnquiries: enquiryCounts[0]?.contacted_count ?? 0,
        totalBookings: bookingCounts[0]?.total ?? 0,
        confirmedBookings: bookingCounts[0]?.confirmed ?? 0,
        pendingPayments: bookingCounts[0]?.pending_payments ?? 0,
      };

      return res.status(200).json({
        admin: session.name,
        stats,
        recentEnquiries,
        upcomingBookings,
      });
    }

    // ALL GENERAL ENQUIRIES
    if (action === 'enquiries' && req.method === 'GET') {
      const enquiries = await sql`
        SELECT
          id,
          name,
          email,
          phone,
          COALESCE(NULLIF(phone, ''), email) AS contact,
          interest,
          interest AS property_type,
          message,
          message AS details,
          NULL::text AS location,
          created_at,
          enquiry_status,
          updated_at
        FROM public.enquiries
        ORDER BY created_at DESC
      `;

      return res.status(200).json({ enquiries });
    }

    // CLIENTS BUILT FROM GENERAL ENQUIRIES
    if (action === 'clients' && req.method === 'GET') {
      const rows = await sql`
        SELECT
          MIN(id::text) AS id,
          MIN(name) AS name,
          COALESCE(
            NULLIF(MAX(phone), ''),
            MAX(email)
          ) AS contact,
          MAX(email) AS email,
          MAX(phone) AS phone,
          COUNT(*)::int AS enquiry_count,
          MAX(created_at) AS last_enquiry_at,
          ARRAY_AGG(DISTINCT interest)
            FILTER (WHERE interest IS NOT NULL) AS property_types
        FROM public.enquiries
        GROUP BY
          LOWER(TRIM(name)),
          LOWER(TRIM(COALESCE(email, ''))),
          LOWER(TRIM(COALESCE(phone, '')))
        ORDER BY MAX(created_at) DESC
      `;

      return res.status(200).json({ clients: rows });
    }

    // CONSULTATION BOOKINGS
    // These use the existing consultation tables.
    if (
      ['bookings', 'consultations'].includes(action) &&
      req.method === 'GET'
    ) {
      const rows = await sql`
        SELECT
          b.*,
          e.name,
          e.contact,
          e.property_type,
          e.location,
          e.details AS enquiry_details
        FROM consultation_bookings b
        LEFT JOIN consultation_enquiries e
          ON e.id = b.enquiry_id
        ORDER BY b.created_at DESC
      `;

      return res.status(200).json({
        bookings: rows,
        consultations: rows,
      });
    }

    // UPDATE GENERAL ENQUIRY STATUS
    if (action === 'update-enquiry' && req.method === 'POST') {
      const { id, status } = body;

      const allowed = [
        'new',
        'contacted',
        'in_progress',
        'converted',
        'closed',
      ];

      if (!getId(id) || !allowed.includes(status)) {
        return res.status(400).json({
          message: 'Valid enquiry ID and status are required.',
        });
      }

      const rows = await sql`
        UPDATE public.enquiries
        SET
          enquiry_status = ${status},
          updated_at = NOW()
        WHERE id = ${id}::uuid
        RETURNING *
      `;

      if (!rows.length) {
        return res.status(404).json({
          message: 'Enquiry not found.',
        });
      }

      return res.status(200).json({
        message: 'Enquiry status updated.',
        enquiry: rows[0],
      });
    }

    // MANUAL PAYMENT VERIFICATION
    if (action === 'verify-payment' && req.method === 'POST') {
      const { id, paymentReference } = body;

      if (
        !getId(id) ||
        typeof paymentReference !== 'string' ||
        !paymentReference.trim() ||
        paymentReference.trim().length > 200
      ) {
        return res.status(400).json({
          message: 'Booking ID and payment reference are required.',
        });
      }

      const existing = await sql`
        SELECT id, payment_status
        FROM consultation_bookings
        WHERE id = ${id}::uuid
        LIMIT 1
      `;

      if (!existing.length) {
        return res.status(404).json({
          message: 'Booking not found.',
        });
      }

      if (existing[0].payment_status === 'verified') {
        return res.status(409).json({
          message: 'This payment has already been verified.',
        });
      }

      const rows = await sql`
        UPDATE consultation_bookings
        SET
          payment_status = 'verified',
          payment_reference = ${paymentReference.trim()},
          payment_verified_at = NOW(),
          updated_at = NOW()
        WHERE id = ${id}::uuid
          AND payment_status = 'pending'
        RETURNING *
      `;

      if (!rows.length) {
        return res.status(409).json({
          message: 'Payment status changed. Refresh and try again.',
        });
      }

      return res.status(200).json({
        message:
          'Payment marked verified. Confirm the appointment after checking the payment.',
        booking: rows[0],
      });
    }
    // REJECT PENDING PAYMENT
if (action === 'reject-payment' && req.method === 'POST') {
  const { id, reason } = body;

  if (
    !getId(id) ||
    typeof reason !== 'string' ||
    !reason.trim() ||
    reason.trim().length > 500
  ) {
    return res.status(400).json({
      message: 'Booking ID and a valid rejection reason are required.',
    });
  }

  const rows = await sql`
    UPDATE consultation_bookings
    SET
      payment_status = 'rejected',
      payment_rejected_at = NOW(),
      payment_rejection_reason = ${reason.trim()},
      updated_at = NOW()
    WHERE id = ${id}::uuid
      AND payment_status = 'pending'
    RETURNING *
  `;

  if (!rows.length) {
    return res.status(409).json({
      message: 'Payment is no longer pending. Refresh and try again.',
    });
  }

  return res.status(200).json({
    message: 'Payment rejected successfully.',
    booking: rows[0],
  });
}

    // CONFIRM, CANCEL OR COMPLETE CONSULTATION
    if (action === 'update-booking' && req.method === 'POST') {
      const { id, status, selectedSlot } = body;

      const allowed = ['confirmed', 'cancelled', 'completed'];

      if (!getId(id) || !allowed.includes(status)) {
        return res.status(400).json({
          message: 'Valid booking ID and status are required.',
        });
      }

      const existing = await sql`
        SELECT *
        FROM consultation_bookings
        WHERE id = ${id}::uuid
        LIMIT 1
      `;

      if (!existing.length) {
        return res.status(404).json({
          message: 'Booking not found.',
        });
      }

      const booking = existing[0];

      if (status === 'confirmed') {
        if (booking.payment_status !== 'verified') {
          return res.status(400).json({
            message: 'Verify payment before confirming the booking.',
          });
        }

        const slot = selectedSlot || booking.selected_slot;

        if (
          !slot ||
          Number.isNaN(Date.parse(slot)) ||
          Date.parse(slot) <= Date.now()
        ) {
          return res.status(400).json({
            message: 'Select a valid future appointment slot.',
          });
        }

        const isoSlot = new Date(slot).toISOString();

        const conflict = await sql`
          SELECT id
          FROM consultation_bookings
          WHERE selected_slot = ${isoSlot}::timestamptz
            AND booking_status = 'confirmed'
            AND id <> ${id}::uuid
          LIMIT 1
        `;

        if (conflict.length) {
          return res.status(409).json({
            message: 'This slot is already booked. Choose another slot.',
          });
        }

        const rows = await sql`
          UPDATE consultation_bookings
          SET
            selected_slot = ${isoSlot}::timestamptz,
            booking_status = 'confirmed',
            updated_at = NOW()
          WHERE id = ${id}::uuid
            AND payment_status = 'verified'
          RETURNING *
        `;

        if (!rows.length) {
          return res.status(409).json({
            message: 'Booking changed. Refresh and try again.',
          });
        }

        return res.status(200).json({
          message: 'Appointment confirmed.',
          booking: rows[0],
        });
      }

      const rows = await sql`
        UPDATE consultation_bookings
        SET
          booking_status = ${status},
          updated_at = NOW()
        WHERE id = ${id}::uuid
        RETURNING *
      `;

      return res.status(200).json({
        message: 'Booking status updated.',
        booking: rows[0],
      });
    }

    const knownActions = [
      'dashboard',
      'enquiries',
      'clients',
      'bookings',
      'consultations',
      'update-enquiry',
      'verify-payment',
      'update-booking',
      'reject-payment',
    ];

    if (knownActions.includes(action)) {
      res.setHeader('Allow', 'GET, POST');

      return res.status(405).json({
        message: 'Method not allowed.',
      });
    }

    return res.status(404).json({
      message: 'Unknown admin action.',
    });
  } catch (error) {
    console.error('Admin API error:', error);

    if (error?.code === '23505') {
  if (error?.constraint === 'unique_confirmed_consultation_slot') {
    return res.status(409).json({
      message: 'This appointment slot has just been booked. Choose another slot.',
    });
  }

  if (error?.constraint === 'unique_payment_reference') {
    return res.status(409).json({
      message: 'This payment reference has already been used.',
    });
  }

  return res.status(409).json({
    message: 'This record conflicts with an existing database record.',
  });
}
    return res.status(500).json({
      message:
        'Could not load admin data. Check the database table names and Vercel logs.',
    });
  }
}