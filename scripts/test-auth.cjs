const crypto = require('crypto');
const assert = require('assert');

// Mock test environment
process.env.NODE_ENV = 'test';
process.env.ALLOWED_EMAIL_DOMAINS = 'umak.edu.ph';
process.env.AUTH_SECRET = 'test-auth-secret-for-umak-institution-32-chars-long';

const AUTH_SECRET = process.env.AUTH_SECRET;
const INSTITUTIONAL_ERROR = 'Please sign in with your UMak email (@umak.edu.ph).';

function getAllowedDomains() {
  const envVal = process.env.ALLOWED_EMAIL_DOMAINS;
  if (!envVal || typeof envVal !== 'string' || !envVal.trim()) {
    return ['umak.edu.ph'];
  }
  return envVal
    .split(',')
    .map(d => d.trim().toLowerCase())
    .filter(Boolean);
}

function isAllowedInstitutionalDomain(email) {
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

function createSignedTestGoogleToken(payload, secret = AUTH_SECRET) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const fullPayload = {
    iss: 'https://accounts.google.com',
    sub: '1029384756',
    aud: 'umak-test-client',
    email: 'student@umak.edu.ph',
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
    .createHmac('sha256', secret)
    .update(`${rawHeader}.${rawPayload}`)
    .digest('base64url');

  return `${rawHeader}.${rawPayload}.${signature}`;
}

async function verifyGoogleIdTokenTest(idToken) {
  if (!idToken || typeof idToken !== 'string') {
    return { valid: false, error: INSTITUTIONAL_ERROR };
  }

  const parts = idToken.trim().split('.');
  if (parts.length !== 3) {
    return { valid: false, error: INSTITUTIONAL_ERROR };
  }

  try {
    const [rawHeader, rawPayload, rawSignature] = parts;
    const header = JSON.parse(Buffer.from(rawHeader, 'base64url').toString('utf8'));
    const payload = JSON.parse(Buffer.from(rawPayload, 'base64url').toString('utf8'));

    // Check signature
    if (header.alg === 'HS256') {
      const expectedSig = crypto
        .createHmac('sha256', AUTH_SECRET)
        .update(`${rawHeader}.${rawPayload}`)
        .digest('base64url');
      const sigBuf = Buffer.from(rawSignature);
      const expBuf = Buffer.from(expectedSig);
      if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
        return { valid: false, error: INSTITUTIONAL_ERROR };
      }
    } else {
      return { valid: false, error: INSTITUTIONAL_ERROR };
    }

    // Check expiry
    const nowSec = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < nowSec) {
      return { valid: false, error: INSTITUTIONAL_ERROR };
    }

    // Require email_verified === true
    const isEmailVerified = payload.email_verified === true || payload.email_verified === 'true';
    if (!isEmailVerified) {
      return { valid: false, error: INSTITUTIONAL_ERROR };
    }

    // Strict domain check (split at last '@', check exact match)
    if (!payload.email || typeof payload.email !== 'string') {
      return { valid: false, error: INSTITUTIONAL_ERROR };
    }
    const cleanEmail = payload.email.trim().toLowerCase();
    const atIndex = cleanEmail.lastIndexOf('@');
    if (atIndex === -1 || atIndex === 0 || atIndex === cleanEmail.length - 1) {
      return { valid: false, error: INSTITUTIONAL_ERROR };
    }
    const domain = cleanEmail.slice(atIndex + 1);
    const allowed = getAllowedDomains();
    if (!allowed.includes(domain)) {
      return { valid: false, error: INSTITUTIONAL_ERROR };
    }

    // Check 'hd' claim if present
    if (payload.hd) {
      const cleanHd = String(payload.hd).trim().toLowerCase();
      if (!allowed.includes(cleanHd)) {
        return { valid: false, error: INSTITUTIONAL_ERROR };
      }
    }

    return {
      valid: true,
      user: {
        email: cleanEmail,
        fullName: payload.name || 'UMak Student',
      },
    };
  } catch {
    return { valid: false, error: INSTITUTIONAL_ERROR };
  }
}

async function runAuthTests() {
  console.log('====================================================');
  console.log('TAGA-asK AI: UMak-Only Authentication Test Suite');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    try {
      fn();
      console.log(`[PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] ${name}: ${err.message}`);
      failed++;
    }
  }

  async function testAsync(name, fn) {
    try {
      await fn();
      console.log(`[PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] ${name}: ${err.message}`);
      failed++;
    }
  }

  // 1. Valid @umak.edu.ph email succeeds
  await testAsync('1. Valid @umak.edu.ph email succeeds', async () => {
    const token = createSignedTestGoogleToken({
      email: 'k12048592@umak.edu.ph',
      email_verified: true,
      hd: 'umak.edu.ph',
      name: 'Maria Santos',
    });
    const result = await verifyGoogleIdTokenTest(token);
    assert.strictEqual(result.valid, true, 'Token must be valid');
    assert.strictEqual(result.user.email, 'k12048592@umak.edu.ph');
    assert.strictEqual(result.user.fullName, 'Maria Santos');
  });

  // 2. @gmail.com rejected
  await testAsync('2. @gmail.com rejected', async () => {
    const token = createSignedTestGoogleToken({
      email: 'intruder@gmail.com',
      email_verified: true,
      hd: 'gmail.com',
    });
    const result = await verifyGoogleIdTokenTest(token);
    assert.strictEqual(result.valid, false, 'Gmail token must be rejected');
    assert.strictEqual(result.error, INSTITUTIONAL_ERROR);
  });

  // 3. Lookalike domains rejected
  await testAsync('3. Lookalike domain rejected (umak.edu.ph.evil.com)', async () => {
    const token = createSignedTestGoogleToken({
      email: 'student@umak.edu.ph.evil.com',
      email_verified: true,
      hd: 'umak.edu.ph.evil.com',
    });
    const result = await verifyGoogleIdTokenTest(token);
    assert.strictEqual(result.valid, false, 'umak.edu.ph.evil.com must be rejected');
    assert.strictEqual(result.error, INSTITUTIONAL_ERROR);
  });

  await testAsync('3b. Lookalike domain rejected (evilumak.edu.ph)', async () => {
    const token = createSignedTestGoogleToken({
      email: 'student@evilumak.edu.ph',
      email_verified: true,
      hd: 'evilumak.edu.ph',
    });
    const result = await verifyGoogleIdTokenTest(token);
    assert.strictEqual(result.valid, false, 'evilumak.edu.ph must be rejected');
    assert.strictEqual(result.error, INSTITUTIONAL_ERROR);
  });

  // 4. Unverified email rejected
  await testAsync('4. Unverified email rejected (email_verified: false)', async () => {
    const token = createSignedTestGoogleToken({
      email: 'student@umak.edu.ph',
      email_verified: false,
    });
    const result = await verifyGoogleIdTokenTest(token);
    assert.strictEqual(result.valid, false, 'Unverified email must be rejected');
    assert.strictEqual(result.error, INSTITUTIONAL_ERROR);
  });

  // 5. Missing / invalid / tampered token rejected
  await testAsync('5a. Missing token rejected', async () => {
    const result = await verifyGoogleIdTokenTest(null);
    assert.strictEqual(result.valid, false);
    assert.strictEqual(result.error, INSTITUTIONAL_ERROR);
  });

  await testAsync('5b. Empty string token rejected', async () => {
    const result = await verifyGoogleIdTokenTest('');
    assert.strictEqual(result.valid, false);
    assert.strictEqual(result.error, INSTITUTIONAL_ERROR);
  });

  await testAsync('5c. Malformed token rejected', async () => {
    const result = await verifyGoogleIdTokenTest('invalid.token');
    assert.strictEqual(result.valid, false);
    assert.strictEqual(result.error, INSTITUTIONAL_ERROR);
  });

  await testAsync('5d. Tampered signature rejected', async () => {
    const token = createSignedTestGoogleToken({
      email: 'student@umak.edu.ph',
      email_verified: true,
    }, 'wrong-secret-key-that-does-not-match');
    const result = await verifyGoogleIdTokenTest(token);
    assert.strictEqual(result.valid, false);
    assert.strictEqual(result.error, INSTITUTIONAL_ERROR);
  });

  await testAsync('5e. Expired token rejected', async () => {
    const token = createSignedTestGoogleToken({
      email: 'student@umak.edu.ph',
      email_verified: true,
      exp: Math.floor(Date.now() / 1000) - 300, // expired 5 minutes ago
    });
    const result = await verifyGoogleIdTokenTest(token);
    assert.strictEqual(result.valid, false);
    assert.strictEqual(result.error, INSTITUTIONAL_ERROR);
  });

  // 6. Subdomain rejection when not explicitly listed
  await testAsync('6. Unlisted subdomain rejected (student@subdomain.umak.edu.ph)', async () => {
    const token = createSignedTestGoogleToken({
      email: 'student@subdomain.umak.edu.ph',
      email_verified: true,
      hd: 'subdomain.umak.edu.ph',
    });
    const result = await verifyGoogleIdTokenTest(token);
    assert.strictEqual(result.valid, false, 'Unlisted subdomains must be rejected');
  });

  // 7. Configurable ALLOWED_EMAIL_DOMAINS env var
  test('7. Configurable ALLOWED_EMAIL_DOMAINS works dynamically', () => {
    process.env.ALLOWED_EMAIL_DOMAINS = 'umak.edu.ph, alumni.umak.edu.ph';
    assert.strictEqual(isAllowedInstitutionalDomain('student@umak.edu.ph'), true);
    assert.strictEqual(isAllowedInstitutionalDomain('grad@alumni.umak.edu.ph'), true);
    assert.strictEqual(isAllowedInstitutionalDomain('outsider@other.edu.ph'), false);
    process.env.ALLOWED_EMAIL_DOMAINS = 'umak.edu.ph'; // restore
  });

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

runAuthTests();
