import { NextRequest, NextResponse } from 'next/server';
import { isValidUMakEmail, signSession } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body.email !== 'string') {
      return NextResponse.json(
        { error: 'Invalid payload. Institutional email is required.' },
        { status: 400 }
      );
    }

    const email = body.email.trim().toLowerCase();
    const studentId = typeof body.studentId === 'string' ? body.studentId.trim() : '';
    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : 'UMak Heron';

    if (!isValidUMakEmail(email)) {
      return NextResponse.json(
        { 
          error: 'Access restricted to verified University of Makati students. You must use an official @umak.edu.ph email address.' 
        },
        { status: 403 }
      );
    }

    if (!studentId || studentId.length < 5) {
      return NextResponse.json(
        { error: 'Valid UMak Student ID is required (e.g. K12048592).' },
        { status: 400 }
      );
    }

    // Sign session token
    const token = signSession({
      email,
      studentId,
      fullName: fullName || 'UMak Student',
    });

    const response = NextResponse.json({
      success: true,
      user: {
        email,
        studentId,
        fullName: fullName || 'UMak Student',
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
    console.error('Auth login error:', err);
    return NextResponse.json({ error: 'Authentication internal error' }, { status: 500 });
  }
}
