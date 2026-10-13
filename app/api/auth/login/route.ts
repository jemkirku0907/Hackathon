import { NextRequest, NextResponse } from 'next/server';
import { 
  isValidUMakEmail, 
  signSession, 
  checkRateLimit, 
  recordFailedAttempt, 
  recordSuccessfulLogin, 
  authenticateOrRegisterStudent 
} from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    
    const body = await req.json().catch(() => null);
    if (!body || typeof body.email !== 'string') {
      return NextResponse.json(
        { error: 'Invalid payload. Institutional email and credentials are required.' },
        { status: 400 }
      );
    }

    const email = body.email.trim().toLowerCase();
    const password = typeof body.password === 'string' ? body.password : '';
    const studentId = typeof body.studentId === 'string' ? body.studentId.trim() : '';
    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : 'UMak Student';

    const rateLimitKey = `${ip}:${email}`;
    const rateCheck = checkRateLimit(rateLimitKey);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { 
          error: `Too many login attempts. For security, account is temporarily locked. Please try again in ${rateCheck.retryAfterSeconds} seconds.` 
        },
        { status: 429 }
      );
    }

    if (!isValidUMakEmail(email)) {
      recordFailedAttempt(rateLimitKey);
      return NextResponse.json(
        { 
          error: 'Access restricted to verified University of Makati students. You must use an official @umak.edu.ph email address.' 
        },
        { status: 403 }
      );
    }

    if (!studentId || studentId.length < 5) {
      recordFailedAttempt(rateLimitKey);
      return NextResponse.json(
        { error: 'Valid UMak Student ID is required (e.g. K12048592).' },
        { status: 400 }
      );
    }

    if (!password) {
      recordFailedAttempt(rateLimitKey);
      return NextResponse.json(
        { error: 'Password is required to access your UMak account.' },
        { status: 400 }
      );
    }

    // Authenticate or register student credentials with established password hashing
    const authResult = authenticateOrRegisterStudent(email, password, studentId, fullName);
    if (!authResult.success || !authResult.user) {
      recordFailedAttempt(rateLimitKey);
      return NextResponse.json(
        { error: authResult.error || 'Invalid credentials. Please verify your password.' },
        { status: 401 }
      );
    }

    // Success: reset rate limit attempts
    recordSuccessfulLogin(rateLimitKey);

    // Sign session token
    const token = signSession({
      email: authResult.user.email,
      studentId: authResult.user.studentId,
      fullName: authResult.user.fullName,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        email: authResult.user.email,
        studentId: authResult.user.studentId,
        fullName: authResult.user.fullName,
      },
    });

    // Set secure, HTTP-only session cookie
    response.cookies.set('umak_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;
  } catch (err) {
    console.error('Auth login error');
    return NextResponse.json({ error: 'Authentication internal error' }, { status: 500 });
  }
}
