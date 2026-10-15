import { NextRequest, NextResponse } from 'next/server';
import { 
  verifyGoogleIdToken, 
  signSession, 
  getAllowedDomains,
  isAllowedInstitutionalDomain,
  deriveStudentId
} from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  const redirectFailure = (reason = 'domain') => {
    const res = NextResponse.redirect(new URL(`/?auth_error=${reason}`, origin));
    res.cookies.set('umak_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(0),
    });
    return res;
  };

  if (error || !code) {
    return redirectFailure('cancelled');
  }

  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = `${origin}/api/auth/callback/google`;

  if (!clientId || !clientSecret) {
    // If client secret is not configured, redirect with error
    return redirectFailure('config');
  }

  try {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenRes.ok) {
      return redirectFailure('token_exchange');
    }

    const tokenData = await tokenRes.json();
    const idToken = tokenData.id_token;
    if (!idToken) {
      return redirectFailure('no_id_token');
    }

    const verification = await verifyGoogleIdToken(idToken);
    if (!verification.valid || !verification.user) {
      return redirectFailure('domain');
    }

    // Success: sign session
    const sessionToken = signSession({
      email: verification.user.email,
      studentId: verification.user.studentId,
      fullName: verification.user.fullName,
    });

    const res = NextResponse.redirect(new URL('/?chat=1', origin));
    res.cookies.set('umak_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60,
    });

    return res;
  } catch (err) {
    return redirectFailure('server_error');
  }
}
