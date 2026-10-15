import { NextRequest, NextResponse } from 'next/server';

const AUTH_SECRET = process.env.AUTH_SECRET || '578086b50b7df321a19de1c8edc76b303af9c296933b4af6db29c2ca68e86a01';

function getAllowedDomains(): string[] {
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

function base64UrlToUint8Array(base64url: string): Uint8Array {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4 === 0 ? '' : '='.repeat(4 - (base64.length % 4));
  const binary = atob(base64 + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function uint8ArrayToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function verifySessionToken(token: string): Promise<{ valid: boolean; email?: string } | null> {
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadStr, signatureStr] = parts;

  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(AUTH_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const expectedSigBuffer = await crypto.subtle.sign(
      'HMAC',
      key,
      enc.encode(payloadStr)
    );
    const expectedSigStr = uint8ArrayToBase64Url(new Uint8Array(expectedSigBuffer));

    if (signatureStr !== expectedSigStr) {
      return null;
    }

    const jsonText = new TextDecoder().decode(base64UrlToUint8Array(payloadStr));
    const data = JSON.parse(jsonText);

    if (Date.now() > data.expiresAt) {
      return null;
    }

    return { valid: true, email: data.email };
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Protect chat, upload, and map API routes
  const protectedPrefixes = ['/api/chat', '/api/upload', '/api/map'];
  const isProtected = protectedPrefixes.some(prefix => pathname.startsWith(prefix));

  if (!isProtected) {
    return NextResponse.next();
  }

  const sessionCookie = req.cookies.get('umak_session')?.value;
  if (!sessionCookie) {
    return NextResponse.json(
      { error: 'Unauthorized: Valid UMak student session required.' },
      { status: 401 }
    );
  }

  const verified = await verifySessionToken(sessionCookie);
  if (!verified || !verified.valid || !verified.email) {
    const res = NextResponse.json(
      { error: 'Unauthorized: Session is invalid or expired.' },
      { status: 401 }
    );
    res.cookies.set('umak_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(0),
    });
    return res;
  }

  // Enforce institutional domain
  const cleanEmail = verified.email.trim().toLowerCase();
  const atIndex = cleanEmail.lastIndexOf('@');
  if (atIndex === -1 || atIndex === 0 || atIndex === cleanEmail.length - 1) {
    return NextResponse.json(
      { error: 'Forbidden: Access restricted to institutional accounts.' },
      { status: 403 }
    );
  }

  const domain = cleanEmail.slice(atIndex + 1);
  const allowed = getAllowedDomains();
  if (!allowed.includes(domain)) {
    return NextResponse.json(
      { error: 'Forbidden: UMak institutional account required (@umak.edu.ph).' },
      { status: 403 }
    );
  }

  // Forward with user identity header
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-user-email', cleanEmail);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/api/chat/:path*', '/api/upload/:path*', '/api/map/:path*'],
};
