import { NextRequest, NextResponse } from 'next/server';
import { 
  verifyGoogleIdToken, 
  signSession, 
  INSTITUTIONAL_ERROR_MESSAGE,
  getAllowedDomains
} from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const allowedDomain = getAllowedDomains()[0] || 'umak.edu.ph';

  if (!clientId) {
    return NextResponse.json({
      configured: false,
      message: 'Google Client ID is not configured in environment variables.',
      allowedDomain,
    });
  }

  const redirectUri = `${origin}/api/auth/callback/google`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    hd: allowedDomain,
    prompt: 'select_account',
    access_type: 'online',
  });

  const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

  const shouldRedirect = req.nextUrl.searchParams.get('redirect') === 'true';
  if (shouldRedirect) {
    return NextResponse.redirect(oauthUrl);
  }

  return NextResponse.json({
    configured: true,
    url: oauthUrl,
    allowedDomain,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const credential = body?.credential || body?.idToken || body?.token;

    if (!credential || typeof credential !== 'string') {
      const response = NextResponse.json(
        { error: INSTITUTIONAL_ERROR_MESSAGE },
        { status: 400 }
      );
      // Clear session cookie on rejection
      response.cookies.set('umak_session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires: new Date(0),
      });
      return response;
    }

    const verification = await verifyGoogleIdToken(credential);

    if (!verification.valid || !verification.user) {
      const response = NextResponse.json(
        { error: INSTITUTIONAL_ERROR_MESSAGE },
        { status: 403 }
      );
      // Clear session cookie on rejection
      response.cookies.set('umak_session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires: new Date(0),
      });
      return response;
    }

    // Success: create signed session
    const sessionToken = signSession({
      email: verification.user.email,
      studentId: verification.user.studentId,
      fullName: verification.user.fullName,
    });

    const response = NextResponse.json({
      success: true,
      user: verification.user,
    });

    response.cookies.set('umak_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;
  } catch (err) {
    const response = NextResponse.json(
      { error: INSTITUTIONAL_ERROR_MESSAGE },
      { status: 500 }
    );
    response.cookies.set('umak_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(0),
    });
    return response;
  }
}
