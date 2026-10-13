import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('umak_session')?.value;
  const session = verifySession(token);

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      email: session.email,
      studentId: session.studentId,
      fullName: session.fullName,
      expiresAt: session.expiresAt,
    },
  });
}
