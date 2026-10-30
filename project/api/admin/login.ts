
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac, timingSafeEqual } from 'node:crypto';

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  return left.length === right.length && timingSafeEqual(left, right);
}

function sign(value: string, secret: string) {
  return createHmac('sha256', secret)
    .update(value)
    .digest('base64url');
}

export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const adminName = process.env.ADMIN_NAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!adminName || !adminPassword || !secret || secret.length < 32) {
    return res.status(500).json({
      message: 'Admin authentication is not configured correctly.',
    });
  }

  const { name, password } = req.body ?? {};

  if (
    typeof name !== 'string' ||
    typeof password !== 'string' ||
    name.length > 200 ||
    password.length > 200
  ) {
    return res.status(400).json({ message: 'Invalid login details.' });
  }

  if (
    !safeEqual(name.trim(), adminName) ||
    !safeEqual(password, adminPassword)
  ) {
    return res.status(401).json({
      message: 'Invalid admin name or password.',
    });
  }

  const expiresAt = Date.now() + 8 * 60 * 60 * 1000;
  const payload = Buffer.from(
    JSON.stringify({ name: adminName, exp: expiresAt })
  ).toString('base64url');

  const signature = sign(payload, secret);
  const token = `${payload}.${signature}`;

  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';

  res.setHeader(
    'Set-Cookie',
    `admin_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${secure}`
  );

  return res.status(200).json({
    message: 'Login successful.',
    name: adminName,
  });
}
