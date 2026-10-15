import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../components/BackgroundGlow';
import { SubtitleOverlay } from '../../components/SubtitleOverlay';
import { FloatingParticles, BrandMotionRings } from '../../components/FloatingElements';
import { BRAND_COLORS } from '../../types';

export const EnhScene4dSecurity: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Window scale
  const windowSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  // Shield activation pulse (frames 70 to 180)
  const shieldActive = frame > 70 && frame < 240;
  const shieldScale = interpolate(Math.sin(frame * 0.12), [-1, 1], [0.96, 1.04]);

  // Request cards positions
  const req1X = interpolate(frame, [10, 60], [-350, 0], { extrapolateRight: 'clamp' });
  const req2X = interpolate(frame, [30, 80], [-350, 0], { extrapolateRight: 'clamp' });

  // Excessive spam burst requests (frames 90 to 140)
  const spamBurstY = interpolate(frame, [90, 130], [-200, 0], { extrapolateRight: 'clamp' });

  // 429 Error Toast emergence (frame 130)
  const toastSpring = spring({
    frame: frame - 130,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  // Recovery / normal request succeeding (frame 240+)
  const recoverySpring = spring({
    frame: frame - 245,
    fps,
    config: { damping: 13, mass: 0.8 },
  });

  // Dynamic security sequence caption text
  let captionPhase = 'Built-in rate limiting';
  if (frame > 90 && frame <= 175) {
    captionPhase = 'Helps prevent bot spam and excessive requests';
  } else if (frame > 175 && frame <= 245) {
    captionPhase = 'Keeps access more controlled and responsible';
  } else if (frame > 245) {
    captionPhase = 'Smart answers. More responsible access.';
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '1080px',
        height: '1920px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <BackgroundGlow primaryColor={BRAND_COLORS.blue} secondaryColor={BRAND_COLORS.cyan} />
      <FloatingParticles count={24} color={BRAND_COLORS.cyan} seed={4} />
      <BrandMotionRings size={950} color={BRAND_COLORS.blue} accentColor={BRAND_COLORS.yellow} />

      {/* Top Security Header Badge */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          backgroundColor: 'rgba(63, 86, 202, 0.25)',
          border: `2px solid ${BRAND_COLORS.blue}`,
          color: '#93C5FD',
          fontSize: 22,
          fontWeight: 800,
          padding: '8px 28px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          zIndex: 20,
          boxShadow: '0 0 25px rgba(63, 86, 202, 0.5)',
        }}
      >
        <span>🛡️</span> RESPONSIBLE ACCESS &amp; RATE LIMITING
      </div>

      {/* Main Showcase Container */}
      <div
        style={{
          width: 980,
          transform: `scale(${windowSpring})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: -30,
          zIndex: 10,
        }}
      >
        {/* Dynamic Security Caption Bar */}
        <div
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            border: `2px solid ${frame > 245 ? BRAND_COLORS.yellow : BRAND_COLORS.cyan}`,
            borderRadius: 20,
            padding: '14px 32px',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.7)',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <span style={{ fontSize: 26 }}>{frame > 245 ? '✨' : '🔒'}</span>
          <span
            style={{
              color: frame > 245 ? BRAND_COLORS.yellow : '#FFFFFF',
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: '-0.3px',
            }}
          >
            {captionPhase}
          </span>
        </div>

        {/* Central App Mockup with Visualized Protective Shield */}
        <div
          style={{
            position: 'relative',
            width: 960,
            borderRadius: 26,
            overflow: 'hidden',
            backgroundColor: '#090E1A',
            border: '2px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 30px 100px rgba(0, 0, 0, 0.85), 0 0 50px rgba(63, 86, 202, 0.35)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              height: 48,
              backgroundColor: '#111827',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#EC202B' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#D1CA25' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#22C55E' }} />
              <span style={{ marginLeft: 16, color: '#94A3B8', fontSize: 14, fontFamily: 'monospace' }}>
                🔒 https://taga-askai.vercel.app/
              </span>
            </div>

            {/* Rate Limiting Counter Widget */}
            <div
              style={{
                backgroundColor: frame > 110 && frame < 220 ? 'rgba(236, 32, 43, 0.25)' : 'rgba(34, 197, 94, 0.2)',
                border: `1px solid ${frame > 110 && frame < 220 ? '#EF4444' : '#22C55E'}`,
                color: frame > 110 && frame < 220 ? '#FCA5A5' : '#4ADE80',
                padding: '4px 12px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: 'monospace',
              }}
            >
              {frame > 110 && frame < 220 ? 'LIMIT: 16/15 req/min (THROTTLED)' : 'ALLOW: 15 req/min (SLIDING WINDOW)'}
            </div>
          </div>

          {/* Chat Workspace View */}
          <div style={{ position: 'relative', width: '100%', height: 680, overflow: 'hidden' }}>
            <Img
              src={staticFile('screenshots/dark_cit_answer.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 35%',
                filter: shieldActive ? 'brightness(0.7)' : 'brightness(1.0)',
              }}
            />

            {/* Protective Blue Shield Overlay when active */}
            {shieldActive && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'radial-gradient(circle at 50% 50%, rgba(63, 86, 202, 0.4) 0%, rgba(9, 14, 26, 0.85) 80%)',
                  transform: `scale(${shieldScale})`,
                }}
              >
                {/* Shield Graphic Halo */}
                <div
                  style={{
                    width: 220,
                    height: 220,
                    borderRadius: '50%',
                    border: `3px solid ${BRAND_COLORS.cyan}`,
                    boxShadow: `0 0 60px ${BRAND_COLORS.blue}, inset 0 0 40px ${BRAND_COLORS.cyan}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 84,
                  }}
                >
                  🛡️
                </div>
              </div>
            )}

            {/* Rate-Limit Exceeded Toast (Verified HTTP 429 response from codebase) */}
            {frame > 130 && frame < 240 && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) scale(${toastSpring})`,
                  backgroundColor: 'rgba(15, 23, 42, 0.98)',
                  border: '2px solid #EF4444',
                  borderRadius: 20,
                  padding: '24px 32px',
                  boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9), 0 0 40px rgba(239, 68, 68, 0.5)',
                  maxWidth: 620,
                  textAlign: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#EF4444', fontWeight: 900, fontSize: 18 }}>
                  <span>⚠️</span> HTTP 429 TOO MANY REQUESTS
                </div>
                <div style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, marginTop: 10, lineHeight: 1.35 }}>
                  Rate limit exceeded. Maximum 15 requests per minute. Please retry in 30 seconds.
                </div>
                <div style={{ color: '#94A3B8', fontSize: 14, marginTop: 8, fontFamily: 'monospace' }}>
                  Retry-After: 30 • Controlled &amp; Responsible Access
                </div>
              </div>
            )}

            {/* Recovery Success Banner (frame 245+) */}
            {frame > 245 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 30,
                  left: '50%',
                  transform: `translateX(-50%) scale(${recoverySpring})`,
                  backgroundColor: 'rgba(15, 23, 42, 0.96)',
                  border: '2px solid #22C55E',
                  borderRadius: 18,
                  padding: '16px 28px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(34, 197, 94, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ fontSize: 24 }}>✅</span>
                <div>
                  <div style={{ color: '#4ADE80', fontSize: 17, fontWeight: 800 }}>
                    NORMAL STUDENT REQUEST SUCCEEDED
                  </div>
                  <div style={{ color: '#CBD5E1', fontSize: 14 }}>
                    Verified student sessions continue smoothly without delay.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <SubtitleOverlay
        badge="Responsible Access"
        text={
          frame > 245
            ? "Smart answers. More responsible access."
            : "Behind the scenes, built-in rate limiting helps prevent bot spam and excessive requests, keeping access more controlled and responsible."
        }
        accentColor={BRAND_COLORS.blue}
      />
    </div>
  );
};
