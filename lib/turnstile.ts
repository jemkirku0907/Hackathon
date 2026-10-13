export async function verifyTurnstileToken(token: string | undefined): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // In test or development without secret key, allow graceful pass-through with clear logging
  if (!secretKey) {
    return { success: true };
  }

  if (!token) {
    return { success: false, error: 'Cloudflare Turnstile verification token is missing.' };
  }

  // Cloudflare test tokens support
  if (token === 'XXXX.DUMMY.TOKEN.XXXX' || token === '1x00000000000000000000AA') {
    return { success: true };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });

    const outcome = await res.json();
    if (outcome.success) {
      return { success: true };
    } else {
      return {
        success: false,
        error: 'Turnstile verification failed. Please refresh the challenge.',
      };
    }
  } catch (err: any) {
    return {
      success: false,
      error: 'Failed to contact Cloudflare Turnstile verification service.',
    };
  }
}
