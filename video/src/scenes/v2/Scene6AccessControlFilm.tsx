import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ShieldCheck, AlertOctagon, CheckCircle2, ShieldAlert, Lock, UserCheck } from 'lucide-react';
import { CinematicEnvironment } from '../../components/CinematicEnvironment';
import { KaraokeCaption } from '../../components/KaraokeCaption';
import { BRAND_COLORS, SPRINGS } from '../../theme';

export const Scene6AccessControlFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Line-drawing Shield Icon animation (frames 6 -> 40)
  const shieldDraw = spring({ frame: frame - 6, fps, config: SPRINGS.smooth });
  const shieldDashoffset = interpolate(shieldDraw, [0, 1], [300, 0]);

  // Dynamic Phase Focus:
  // Phase 1 (0 - 130): Focus on Rate Limiter
  // Phase 2 (130 - 240): Focus on UMak Email Gate
  const isPhase1 = frame < 130;
  const isPhase2 = frame >= 130;

  const panel1Focus = spring({ frame: isPhase1 ? frame - 5 : 130 - frame, fps, config: SPRINGS.smooth });
  const panel2Focus = spring({ frame: isPhase2 ? frame - 130 : 0, fps, config: SPRINGS.smooth });

  const panel1Scale = interpolate(panel1Focus, [0, 1], [0.97, 1.02]);
  const panel1Opacity = interpolate(panel1Focus, [0, 1], [0.65, 1.0]);

  const panel2Scale = interpolate(panel2Focus, [0, 1], [0.97, 1.02]);
  const panel2Opacity = interpolate(panel2Focus, [0, 1], [0.65, 1.0]);

  // 2. RATE LIMITING VISUALIZATION (frames 0 - 130)
  // Request count counter fills from 12 -> 15
  const reqCount = Math.min(15, Math.floor(interpolate(frame, [15, 65], [12, 15])));
  const limitReached = frame >= 65;

  // HTTP 429 Toast Slide In (frames 70 -> 125)
  const toastSpring = spring({ frame: frame - 70, fps, config: SPRINGS.bouncy });
  const toastY = interpolate(toastSpring, [0, 1], [-80, 0]);
  const toastOpacity = interpolate(toastSpring, [0, 1], [0, 1]);

  // 3. UMAK EMAIL AUTHENTICATION DEMO (frames 130 - 240)
  const authFrame = frame - 130;

  // Attempt 1: juan@gmail.com (rejected & shaken)
  const isAttempt1 = authFrame >= 10 && authFrame < 55;
  const emailText1 = 'student@gmail.com'.slice(
    0,
    Math.floor(interpolate(authFrame, [10, 32], [0, 17], { extrapolateRight: 'clamp' }))
  );
  // Shake effect on error (frames 34 - 52)
  const shakeFrame = authFrame - 34;
  let shakeX = 0;
  if (shakeFrame >= 0 && shakeFrame < 18) {
    shakeX = Math.sin(shakeFrame * 1.5) * 8 * (1 - shakeFrame / 18);
  }

  // Attempt 2: student@umak.edu.ph (accepted with green check)
  const isAttempt2 = authFrame >= 55;
  const emailText2 = 'student@umak.edu.ph'.slice(
    0,
    Math.floor(interpolate(authFrame, [58, 82], [0, 19], { extrapolateRight: 'clamp' }))
  );
  const successSpring = spring({ frame: authFrame - 84, fps, config: SPRINGS.bouncy });

  return (
    <CinematicEnvironment
      primaryGlow={BRAND_COLORS.blue}
      secondaryGlow={BRAND_COLORS.cyan}
      cameraMove="pushIn"
      durationInFrames={240}
    >
      {/* Top Header Badge */}
      <div
        style={{
          position: 'absolute',
          top: 50,
          backgroundColor: 'rgba(63, 86, 202, 0.2)',
          border: `1.5px solid ${BRAND_COLORS.blue}`,
          color: '#93C5FD',
          fontSize: 16,
          fontWeight: 800,
          padding: '6px 24px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          zIndex: 40,
        }}
      >
        <Lock size={18} color="#93C5FD" />
        <span>Enterprise Security &amp; Access Control</span>
      </div>

      {/* Main Dual Security Stage (Side-by-Side: Balanced Zero-Deadspace Layout) */}
      <div
        style={{
          width: 1460,
          display: 'flex',
          gap: 36,
          alignItems: 'stretch',
          marginTop: 50,
          zIndex: 30,
        }}
      >
        {/* ========================================================
            PANEL 1: RATE LIMITING & ANTI-BOT
           ======================================================== */}
        <div
          style={{
            flex: 1,
            transform: `scale(${panel1Scale})`,
            opacity: panel1Opacity,
            backgroundColor: '#0F172A',
            border: `1.5px solid ${isPhase1 && limitReached ? BRAND_COLORS.red : isPhase1 ? BRAND_COLORS.cyan : 'rgba(255, 255, 255, 0.12)'}`,
            borderRadius: 24,
            padding: '32px 36px',
            boxShadow: isPhase1 && limitReached
              ? `0 25px 80px rgba(0, 0, 0, 0.9), 0 0 50px ${BRAND_COLORS.red}40`
              : isPhase1
              ? `0 25px 80px rgba(0, 0, 0, 0.9), 0 0 40px ${BRAND_COLORS.cyan}30`
              : '0 20px 60px rgba(0, 0, 0, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            transition: 'border 0.2s, box-shadow 0.2s',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {/* SVG Line-drawn Shield */}
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    stroke={isPhase1 && limitReached ? BRAND_COLORS.red : BRAND_COLORS.cyan}
                    strokeWidth="2.5"
                    strokeDasharray="300"
                    strokeDashoffset={shieldDashoffset}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 900 }}>
                  Server-Side Rate Limiter
                </div>
              </div>
              <span
                style={{
                  backgroundColor: limitReached ? 'rgba(236, 32, 43, 0.2)' : 'rgba(33, 173, 227, 0.2)',
                  border: `1px solid ${limitReached ? BRAND_COLORS.red : BRAND_COLORS.cyan}`,
                  color: limitReached ? '#FCA5A5' : BRAND_COLORS.cyan,
                  fontSize: 13,
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: 6,
                }}
              >
                Sliding Window
              </span>
            </div>

            <div style={{ color: '#94A3B8', fontSize: 16, marginTop: 10 }}>
              Protects campus servers from automated spam and excessive request bursts.
            </div>
          </div>

          {/* Request Velocity Gauge Bar */}
          <div
            style={{
              backgroundColor: 'rgba(30, 41, 59, 0.85)',
              borderRadius: 16,
              padding: '20px 24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ color: '#E2E8F0', fontSize: 16, fontWeight: 700 }}>
                Requests per Minute
              </span>
              <span
                style={{
                  color: limitReached ? BRAND_COLORS.red : BRAND_COLORS.yellow,
                  fontSize: 18,
                  fontWeight: 900,
                  fontFamily: 'monospace',
                }}
              >
                {reqCount} / 15 req/min
              </span>
            </div>

            {/* Progress Track */}
            <div
              style={{
                width: '100%',
                height: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 6,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${(reqCount / 15) * 100}%`,
                  height: '100%',
                  backgroundColor: limitReached ? BRAND_COLORS.red : BRAND_COLORS.cyan,
                  boxShadow: `0 0 15px ${limitReached ? BRAND_COLORS.red : BRAND_COLORS.cyan}`,
                  borderRadius: 6,
                  transition: 'width 0.2s ease-out',
                }}
              />
            </div>
          </div>

          {/* HTTP 429 Alert Toast */}
          <div
            style={{
              transform: `translateY(${toastY}px)`,
              opacity: isPhase1 && frame >= 70 ? toastOpacity : 0.4,
              backgroundColor: 'rgba(127, 29, 29, 0.45)',
              border: '1.5px solid rgba(239, 68, 68, 0.8)',
              borderRadius: 14,
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              boxShadow: '0 10px 30px rgba(239, 68, 68, 0.3)',
            }}
          >
            <ShieldAlert size={26} color="#F87171" />
            <div>
              <div style={{ color: '#FECACA', fontSize: 16, fontWeight: 800 }}>
                Rate limit reached (HTTP 429)
              </div>
              <div style={{ color: '#CBD5E1', fontSize: 13 }}>
                Protected by sliding-window limiter • Retry-After: 30s
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            PANEL 2: UMAK STUDENT AUTHENTICATION
           ======================================================== */}
        <div
          style={{
            flex: 1,
            transform: `scale(${panel2Scale})`,
            opacity: panel2Opacity,
            backgroundColor: '#0F172A',
            border: `1.5px solid ${isPhase2 && isAttempt2 ? BRAND_COLORS.green : isPhase2 && isAttempt1 && authFrame >= 34 ? BRAND_COLORS.red : isPhase2 ? BRAND_COLORS.blue : 'rgba(255, 255, 255, 0.12)'}`,
            borderRadius: 24,
            padding: '32px 36px',
            boxShadow: isPhase2 && isAttempt2
              ? `0 25px 80px rgba(0, 0, 0, 0.9), 0 0 50px ${BRAND_COLORS.green}35`
              : isPhase2
              ? `0 25px 80px rgba(0, 0, 0, 0.9), 0 0 40px ${BRAND_COLORS.blue}40`
              : '0 20px 60px rgba(0, 0, 0, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'border 0.2s, box-shadow 0.2s',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <UserCheck size={28} color={isPhase2 && isAttempt2 ? BRAND_COLORS.green : '#93C5FD'} />
                <div style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 900 }}>
                  UMak Email Gate
                </div>
              </div>
              <span
                style={{
                  backgroundColor: 'rgba(63, 86, 202, 0.25)',
                  border: `1px solid ${BRAND_COLORS.blue}`,
                  color: '#93C5FD',
                  fontSize: 13,
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: 6,
                }}
              >
                @umak.edu.ph
              </span>
            </div>

            <div style={{ color: '#94A3B8', fontSize: 16, marginTop: 10 }}>
              Access strictly restricted to verified University of Makati students and faculty.
            </div>
          </div>

          {/* Interactive Input Simulation */}
          <div
            style={{
              transform: `translateX(${shakeX}px)`,
              backgroundColor: 'rgba(30, 41, 59, 0.95)',
              border: `2px solid ${isPhase2 && isAttempt2 ? BRAND_COLORS.green : isPhase2 && isAttempt1 && authFrame >= 34 ? BRAND_COLORS.red : 'rgba(255, 255, 255, 0.15)'}`,
              borderRadius: 14,
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }}
          >
            <div>
              <div style={{ color: '#94A3B8', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>
                Institutional Email Address
              </div>
              <div
                style={{
                  color: '#FFFFFF',
                  fontSize: 20,
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  marginTop: 2,
                }}
              >
                {isPhase2 && isAttempt2
                  ? emailText2
                  : isPhase2 && isAttempt1
                  ? emailText1
                  : 'student@umak.edu.ph'}
                {isPhase2 && authFrame < 90 && Math.floor(frame / 6) % 2 === 0 && (
                  <span style={{ color: BRAND_COLORS.yellow }}>|</span>
                )}
              </div>
            </div>

            {/* Validation Outcome Icon */}
            {isPhase2 && isAttempt2 && authFrame >= 84 ? (
              <div
                style={{
                  transform: `scale(${successSpring})`,
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  borderRadius: '50%',
                  padding: 6,
                }}
              >
                <CheckCircle2 size={24} color={BRAND_COLORS.green} />
              </div>
            ) : isPhase2 && isAttempt1 && authFrame >= 34 ? (
              <div style={{ backgroundColor: 'rgba(236, 32, 43, 0.2)', borderRadius: '50%', padding: 6 }}>
                <AlertOctagon size={24} color={BRAND_COLORS.red} />
              </div>
            ) : (
              <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', borderRadius: '50%', padding: 6 }}>
                <CheckCircle2 size={24} color={BRAND_COLORS.green} />
              </div>
            )}
          </div>

          {/* Feedback banner below input */}
          <div style={{ minHeight: 45 }}>
            {isPhase2 && isAttempt2 && authFrame >= 84 ? (
              <div style={{ color: '#86EFAC', fontSize: 16, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle2 size={18} />
                <span>Verified UMak Student • Access Granted</span>
              </div>
            ) : isPhase2 && isAttempt1 && authFrame >= 34 ? (
              <div style={{ color: '#FCA5A5', fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertOctagon size={18} />
                <span>Access Denied: Only @umak.edu.ph accounts are allowed</span>
              </div>
            ) : (
              <div style={{ color: '#86EFAC', fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle2 size={18} />
                <span>Institutional Single Sign-On Verified</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <KaraokeCaption sceneKey="scene6" />
    </CinematicEnvironment>
  );
};
