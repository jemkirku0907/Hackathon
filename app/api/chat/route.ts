import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limiter';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { searchSources } from '@/lib/retrieval';
import { generateGroundedAnswer } from '@/lib/generator';
import { ChatResponse } from '@/lib/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    // 1. IP identification & Rate Limiting
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
    
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          answer: rateCheck.error || 'Rate limit exceeded.',
          in_sources: false,
          conflict: false,
          citations: [],
          verification_status: 'error',
          error: rateCheck.error,
        } as ChatResponse,
        {
          status: 429,
          headers: rateCheck.retryAfter
            ? { 'Retry-After': String(rateCheck.retryAfter) }
            : {},
        }
      );
    }

    // 2. Validate Request Body
    const body = await req.json().catch(() => null);
    if (!body || typeof body.message !== 'string') {
      return NextResponse.json(
        {
          answer: 'Invalid request body. A valid message string is required.',
          in_sources: false,
          conflict: false,
          citations: [],
          verification_status: 'error',
          error: 'Bad Request',
        } as ChatResponse,
        { status: 400 }
      );
    }

    const message = body.message.trim();
    if (message.length === 0) {
      return NextResponse.json(
        {
          answer: 'Message cannot be empty.',
          in_sources: false,
          conflict: false,
          citations: [],
          verification_status: 'error',
          error: 'Empty message',
        } as ChatResponse,
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        {
          answer: 'Message exceeds maximum allowed length of 500 characters.',
          in_sources: false,
          conflict: false,
          citations: [],
          verification_status: 'error',
          error: 'Message too long',
        } as ChatResponse,
        { status: 400 }
      );
    }

    // 3. Cloudflare Turnstile Verification
    const turnstileResult = await verifyTurnstileToken(body.turnstileToken);
    if (!turnstileResult.success) {
      return NextResponse.json(
        {
          answer: turnstileResult.error || 'Bot verification failed.',
          in_sources: false,
          conflict: false,
          citations: [],
          verification_status: 'error',
          error: 'Forbidden',
        } as ChatResponse,
        { status: 403 }
      );
    }

    // 4. Retrieve Grounded Sources
    const retrievedChunks = searchSources(message, 4);

    // 5. Generate Grounded AI Answer & Verify Citations
    const responseData = await generateGroundedAnswer(message, retrievedChunks);

    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    console.error('API /chat error:', error);
    return NextResponse.json(
      {
        answer: 'An unexpected internal error occurred. Please try again.',
        in_sources: false,
        conflict: false,
        citations: [],
        verification_status: 'error',
        error: 'Internal Server Error',
      } as ChatResponse,
      { status: 500 }
    );
  }
}
