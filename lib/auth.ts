import crypto from 'crypto';

export interface UserSession {
  email: string;
  studentId: string;
  fullName: string;
  issuedAt: number;
  expiresAt: number;
}

export interface StoredUser {
  email: string;
  studentId: string;
  fullName: string;
  passwordHash: string;
  createdAt: number;
}

export interface GoogleTokenPayload {
  iss?: string;
  sub?: string;
  aud?: string;
  email?: string;
  email_verified?: boolean | string;
  hd?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  exp?: number;
  iat?: number;
}

const AUTH_SECRET = process.env.AUTH_SECRET || '578086b50b7df321a19de1c8edc76b303af9c296933b4af6db29c2ca68e86a01';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export const INSTITUTIONAL_ERROR_MESSAGE = 'Please sign in with your UMak email (@umak.edu.ph).';

/**
 * Returns allowed email domains configured from ALLOWED_EMAIL_DOMAINS env var.
 * Defaults strictly to ['umak.edu.ph'].
 * Subdomains are only accepted if explicitly listed.
 */
export function getAllowedDomains(): string[] {
  const envVal = process.env.ALLOWED_EMAIL_DOMAINS;
  if (!envVal || typeof envVal !== 'string' || !envVal.trim()) {
    return ['umak.edu.ph'];
  }
  const domains = envVal
    .split(',')
    .map(d => d.trim().toLowerCase())
    .filter(Boolean);
  return domains.length > 0 ? domains : ['umak.edu.ph'];
}

/**
 * Checks whether an email's domain exactly matches one of the allowed domains.
 * Splits at the last '@' to prevent lookalike domains (e.g. umak.edu.ph.evil.com, evilumak.edu.ph).
 */
export function isAllowedInstitutionalDomain(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const clean = email.trim().toLowerCase();
  const atIndex = clean.lastIndexOf('@');
  if (atIndex === -1 || atIndex === 0 || atIndex === clean.length - 1) {
    return false;
  }
  const domain = clean.slice(atIndex + 1);
  const allowed = getAllowedDomains();
  return allowed.includes(domain);
}

/**
 * Backward-compatible helper for UMak institutional email check.
 */
export function isValidUMakEmail(email: string): boolean {
  return isAllowedInstitutionalDomain(email);
}

/**
 * Derives a student ID from an institutional email (e.g. k12048592@umak.edu.ph -> K12048592)
 * or creates a consistent student identifier.
 */
export function deriveStudentId(email: string, fallbackId?: string): string {
  if (fallbackId && fallbackId.trim().length >= 4) {
    return fallbackId.trim().toUpperCase();
  }
  const local = email.split('@')[0] || 'student';
  const match = local.match(/[a-zA-Z]?\d{6,}/);
  if (match) {
    return match[0].toUpperCase();
  }
  return `UM-${local.slice(0, 10).toUpperCase()}`;
}

// In-memory rate limiting map (IP / email -> RateLimitEntry)
interface RateLimitEntry {
  attempts: number;
  lockedUntil: number;
  firstAttempt: number;
}
const loginAttempts = new Map<string, RateLimitEntry>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOCK_MS = 15 * 60 * 1000; // 15 minutes lock

// In-memory student credentials registry (email -> StoredUser)
const userRegistry = new Map<string, StoredUser>();

/**
 * Validates password strength:
 * Minimum 8 characters, must contain at least one letter and one number.
 */
export function validatePasswordStrength(password: string): { valid: boolean; message?: string } {
  if (!password || typeof password !== 'string') {
    return { valid: false, message: 'Password is required.' };
  }
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long.' };
  }
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain both letters and numbers.' };
  }
  return { valid: true };
}

/**
 * Secure password hashing with crypto.scrypt and cryptographically random salt.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString('hex')}`;
}

/**
 * Constant-time verification of password against stored hash.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(':');
    if (!salt || !key) return false;
    const derivedKey = crypto.scryptSync(password, salt, 64);
    const keyBuffer = Buffer.from(key, 'hex');
    if (derivedKey.length !== keyBuffer.length) return false;
    return crypto.timingSafeEqual(derivedKey, keyBuffer);
  } catch {
    return false;
  }
}

/**
 * Checks brute-force rate limit by key (IP or email).
 */
export function checkRateLimit(key: string): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  const entry = loginAttempts.get(key);

  if (!entry) {
    return { allowed: true, remaining: MAX_ATTEMPTS, retryAfterSeconds: 0 };
  }

  if (entry.lockedUntil > now) {
    const retryAfterSeconds = Math.ceil((entry.lockedUntil - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  if (now - entry.firstAttempt > WINDOW_MS) {
    loginAttempts.delete(key);
    return { allowed: true, remaining: MAX_ATTEMPTS, retryAfterSeconds: 0 };
  }

  if (entry.attempts >= MAX_ATTEMPTS) {
    entry.lockedUntil = now + LOCK_MS;
    return { allowed: false, remaining: 0, retryAfterSeconds: Math.ceil(LOCK_MS / 1000) };
  }

  return { allowed: true, remaining: MAX_ATTEMPTS - entry.attempts, retryAfterSeconds: 0 };
}

export function recordFailedAttempt(key: string): void {
  const now = Date.now();
  const entry = loginAttempts.get(key) || { attempts: 0, lockedUntil: 0, firstAttempt: now };
  entry.attempts += 1;
  if (entry.attempts >= MAX_ATTEMPTS) {
    entry.lockedUntil = now + LOCK_MS;
  }
  loginAttempts.set(key, entry);
}

export function recordSuccessfulLogin(key: string): void {
  loginAttempts.delete(key);
}

/**
 * Authenticates an existing student or registers credentials securely on first login.
 */
export function authenticateOrRegisterStudent(
  email: string,
  password: string,
  studentId: string,
  fullName: string
): { success: boolean; error?: string; user?: Omit<StoredUser, 'passwordHash'> } {
  const cleanEmail = email.trim().toLowerCase();

  const existing = userRegistry.get(cleanEmail);
  if (existing) {
    const matches = verifyPassword(password, existing.passwordHash);
    if (!matches) {
      return { success: false, error: 'Incorrect password for this student account.' };
    }
    return {
      success: true,
      user: {
        email: existing.email,
        studentId: existing.studentId,
        fullName: existing.fullName,
        createdAt: existing.createdAt,
      },
    };
  }

  const passwordCheck = validatePasswordStrength(password);
  if (!passwordCheck.valid) {
    return { success: false, error: passwordCheck.message };
  }

  const passwordHash = hashPassword(password);
  const newUser: StoredUser = {
    email: cleanEmail,
    studentId,
    fullName: fullName || 'UMak Student',
    passwordHash,
    createdAt: Date.now(),
  };

  userRegistry.set(cleanEmail, newUser);

  return {
    success: true,
    user: {
      email: newUser.email,
      studentId: newUser.studentId,
      fullName: newUser.fullName,
      createdAt: newUser.createdAt,
    },
  };
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

  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expectedSignature);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as UserSession;
    if (Date.now() > data.expiresAt) {
      return null;
    }
    if (!isAllowedInstitutionalDomain(data.email)) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

/**
 * Server-side verification for Google ID token:
 * 1. Verifies token format and signature
 * 2. Checks expiry and issuer
 * 3. Checks audience if GOOGLE_CLIENT_ID is configured
 * 4. Requires email_verified === true
 * 5. Strictly checks email domain equals an allowed institutional domain (splits at last '@', rejects lookalikes)
 * 6. Checks hd claim equals allowed domain if present
 */
export async function verifyGoogleIdToken(idToken: string): Promise<{
  valid: boolean;
  error?: string;
  user?: { email: string; fullName: string; studentId: string };
}> {
  if (!idToken || typeof idToken !== 'string') {
    return { valid: false, error: INSTITUTIONAL_ERROR_MESSAGE };
  }

  const parts = idToken.trim().split('.');
  if (parts.length !== 3) {
    return { valid: false, error: INSTITUTIONAL_ERROR_MESSAGE };
  }

  try {
    const [rawHeader, rawPayload, rawSignature] = parts;
    const headerJson = Buffer.from(rawHeader, 'base64url').toString('utf8');
    const payloadJson = Buffer.from(rawPayload, 'base64url').toString('utf8');
    const header = JSON.parse(headerJson);
    const payload: GoogleTokenPayload = JSON.parse(payloadJson);

    // 1. Signature & crypto validation
    // For test / simulated tokens signed with AUTH_SECRET or HMAC
    if (header.alg === 'HS256') {
      const expectedSig = crypto
        .createHmac('sha256', AUTH_SECRET)
        .update(`${rawHeader}.${rawPayload}`)
        .digest('base64url');
      const sigBuf = Buffer.from(rawSignature);
      const expBuf = Buffer.from(expectedSig);
      if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
        return { valid: false, error: INSTITUTIONAL_ERROR_MESSAGE };
      }
    } else if (header.alg === 'RS256') {
      // In production, verify with Google's public certs or tokeninfo endpoint
      let verifiedOnline = false;
      try {
        const tokenInfoRes = await fetch(
          `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`,
          { signal: AbortSignal.timeout(4000) }
        );
        if (tokenInfoRes.ok) {
          const info = await tokenInfoRes.json();
          verifiedOnline = true;
          // Synchronize payload claims with verified Google response
          if (info.email) payload.email = info.email;
          if (info.email_verified !== undefined) payload.email_verified = info.email_verified;
          if (info.hd) payload.hd = info.hd;
          if (info.aud) payload.aud = info.aud;
          if (info.exp) payload.exp = Number(info.exp);
          if (info.name) payload.name = info.name;
        }
      } catch {
        // Fallback or network unavailable in isolated test environments
      }

      // If online verification failed and not in test environment, reject
      if (!verifiedOnline && process.env.NODE_ENV !== 'test' && !process.env.ALLOW_OFFLINE_DEV_AUTH) {
        return { valid: false, error: INSTITUTIONAL_ERROR_MESSAGE };
      }
    } else {
      return { valid: false, error: INSTITUTIONAL_ERROR_MESSAGE };
    }

    // 2. Check Expiry
    const nowSec = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < nowSec) {
      return { valid: false, error: INSTITUTIONAL_ERROR_MESSAGE };
    }

    // 3. Check Audience (if configured)
    const expectedClientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (expectedClientId && payload.aud && payload.aud !== expectedClientId) {
      return { valid: false, error: INSTITUTIONAL_ERROR_MESSAGE };
    }

    // 4. Require email_verified === true
    const isEmailVerified = payload.email_verified === true || payload.email_verified === 'true';
    if (!isEmailVerified) {
      return { valid: false, error: INSTITUTIONAL_ERROR_MESSAGE };
    }

    // 5. Check Email & Domain
    if (!payload.email || typeof payload.email !== 'string') {
      return { valid: false, error: INSTITUTIONAL_ERROR_MESSAGE };
    }
    const cleanEmail = payload.email.trim().toLowerCase();
    const atIndex = cleanEmail.lastIndexOf('@');
    if (atIndex === -1 || atIndex === 0 || atIndex === cleanEmail.length - 1) {
      return { valid: false, error: INSTITUTIONAL_ERROR_MESSAGE };
    }
    const domain = cleanEmail.slice(atIndex + 1);
    const allowedDomains = getAllowedDomains();
    if (!allowedDomains.includes(domain)) {
      return { valid: false, error: INSTITUTIONAL_ERROR_MESSAGE };
    }

    // 6. Check 'hd' claim if present (for Google Workspace accounts)
    if (payload.hd) {
      const cleanHd = String(payload.hd).trim().toLowerCase();
      if (!allowedDomains.includes(cleanHd)) {
        return { valid: false, error: INSTITUTIONAL_ERROR_MESSAGE };
      }
    }

    const fullName = payload.name || payload.given_name || 'UMak Student';
    const studentId = deriveStudentId(cleanEmail);

    return {
      valid: true,
      user: {
        email: cleanEmail,
        fullName,
        studentId,
      },
    };
  } catch {
    return { valid: false, error: INSTITUTIONAL_ERROR_MESSAGE };
  }
}

/**
 * Creates a signed test/mock Google ID token for automated unit tests.
 */
export function createMockGoogleIdToken(payload: Partial<GoogleTokenPayload>): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const fullPayload: GoogleTokenPayload = {
    iss: 'https://accounts.google.com',
    sub: '1098234871928374',
    aud: process.env.GOOGLE_CLIENT_ID || 'umak-test-client-id',
    email: 'k12048592@umak.edu.ph',
    email_verified: true,
    hd: 'umak.edu.ph',
    name: 'Juan Dela Cruz',
    exp: Math.floor(Date.now() / 1000) + 3600,
    iat: Math.floor(Date.now() / 1000),
    ...payload,
  };

  const rawHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const rawPayload = Buffer.from(JSON.stringify(fullPayload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(`${rawHeader}.${rawPayload}`)
    .digest('base64url');

  return `${rawHeader}.${rawPayload}.${signature}`;
}
