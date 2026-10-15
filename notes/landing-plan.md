1. Framework: Next.js 14.2 (App Router) with React 18, Tailwind CSS, and TypeScript.
2. Landing Screen: Located in components/CinematicLandingPage.tsx, mounted via showLandingPage state in app/page.tsx.
3. Auth Method: Custom HMAC-SHA256 signed session cookie (umak_session) managed in lib/auth.ts and app/api/auth/*.
4. Feature Cards: Four cards (Grounded RAG, File Uploads, Campus Map, UMak Security) are rendered in components/CinematicLandingPage.tsx (lines 280-320).
5. Confirmed Domain: The repo strictly uses umak.edu.ph, now configurable via ALLOWED_EMAIL_DOMAINS with umak.edu.ph as default.

## Automated Auth Tests
- Test Script: `scripts/test-auth.cjs`
- Command: `npm run test:auth` or `node scripts/test-auth.cjs`
- Scenarios Tested:
  1. Valid `@umak.edu.ph` institutional Google ID token succeeds.
  2. Public domains like `@gmail.com` rejected with `"Please sign in with your UMak email (@umak.edu.ph)."`.
  3. Lookalike domains (`umak.edu.ph.evil.com`, `evilumak.edu.ph`) strictly rejected.
  4. Unverified emails (`email_verified: false`) rejected.
  5. Missing, empty, malformed, tampered signature, and expired tokens rejected.
  6. Subdomains rejected unless explicitly listed in `ALLOWED_EMAIL_DOMAINS`.
  7. Dynamic configuration of `ALLOWED_EMAIL_DOMAINS` env var verified.
