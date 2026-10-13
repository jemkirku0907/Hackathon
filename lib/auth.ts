import crypto from 'crypto';

export interface UserSession {
  email: string;
  studentId: string;
  fullName: string;
  issuedAt: number;
  expiresAt: number;
}

const AUTH_SECRET = process.env.AUTH_SECRET || '578086b50b7df321a19de1c8edc76b303af9c296933b4af6db29c2ca68e86a01';
const ALLOWED_DOMAIN = 'umak.edu.ph';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export function isValidUMakEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const clean = email.trim().toLowerCase();
  const domain = clean.split('@')[1];
  return domain === ALLOWED_DOMAIN;
}

export function signSession(session: Omit<UserSession, 'issuedAt' | 'expiresAt'>): string {
  const now = Date.now();
  const fullSession: UserSession = {
    ...session,
    issuedAt: now,
    expiresAt: now + SESSION_TTL_MS,
  };

  const payload = Buffer.from(JSON.stringify(fullSession)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(payload)
    .digest('base64url');

  return `${payload}.${signature}`;
}

export function verifySession(token: string | undefined | null): UserSession | null {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payload, signature] = parts;
  const expectedSignature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(payload)
    .digest('base64url');

  // Constant-time compare to prevent timing attacks
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expectedSignature);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as UserSession;
    if (Date.now() > data.expiresAt) {
      return null; // Expired session
    }
    if (!isValidUMakEmail(data.email)) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}
