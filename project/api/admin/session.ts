
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac, timingSafeEqual } from 'node:crypto';

function sign(value: string, secret: string) {
  return createHmac('sha256', secret)
    .update(value)
    .digest('base64url');
}

function verifyToken(token: string, secret: string) {
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payload, signature] = parts;
  const expected = sign(payload, secret);

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);

  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const data = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf8')
    );

    if (
      data.name !== process.env.ADMIN_NAME ||
      typeof data.exp !== 'number' ||
      data.exp < Date.now()
    ) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const secret = process.env.ADMIN_SESSION_SECRET;
  const token = req.cookies?.admin_session;

  if (!secret || secret.length < 32 || !token) {
    return res.status(401).json({ authenticated: false });
  }

  const session = verifyToken(token, secret);

  if (!session) {
    return res.status(401).json({ authenticated: false });
  }

  return res.status(200).json({
    authenticated: true,
    name: session.name,
  });
}
