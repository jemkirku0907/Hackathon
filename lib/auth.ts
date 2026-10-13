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

const AUTH_SECRET = process.env.AUTH_SECRET || '578086b50b7df321a19de1c8edc76b303af9c296933b4af6db29c2ca68e86a01';
const ALLOWED_DOMAIN = 'umak.edu.ph';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

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

export function isValidUMakEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const clean = email.trim().toLowerCase();
  const domain = clean.split('@')[1];
  return domain === ALLOWED_DOMAIN;
}

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
 * Never stores plaintext passwords.
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

  // Reset window if expired
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
    // Authenticate password
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

  // First time login for this student: register with secure hashed password
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
