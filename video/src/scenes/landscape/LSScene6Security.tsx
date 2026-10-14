import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { RefStyleCaption } from '../../components/RefStyleCaption';
import { FloatingParticles, BrandMotionRings } from '../../components/FloatingElements';
import { BRAND_COLORS } from '../../types';

export const LSScene6Security: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const windowScale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  // Shield energy pulse (frames 70 to 240)
  const shieldActive = frame > 70 && frame < 240;
  const shieldScale = interpolate(Math.sin(frame * 0.12), [-1, 1], [0.96, 1.04]);

  // 429 Error Toast emergence (frame 130)
  const toastSpring = spring({
    frame: frame - 130,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  // Recovery banner (frame 245+)
  const recoverySpring = spring({
    frame: frame - 245,
    fps,
    config: { damping: 13, mass: 0.8 },
  });

  let captionPhase = 'Built-in rate limiting';
  let subtitlePhase = 'Protective security layer controlling incoming queries in real time.';
  if (frame > 90 && frame <= 175) {
    captionPhase = 'Helps prevent bot spam and excessive requests';
    subtitlePhase = 'Enforces a strict sliding window limit of 15 requests per minute per client.';
  } else if (frame > 175 && frame <= 245) {
    captionPhase = 'Keeps access more controlled and responsible';
    subtitlePhase = 'Rejects automated bursts with HTTP 429 and precise Retry-After headers.';
  } else if (frame > 245) {
    captionPhase = 'Smart answers. More responsible access.';
    subtitlePhase = 'Legitimate student sessions flow uninterrupted with guaranteed stability.';
  }

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: BRAND_COLORS.blue,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Background Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 40%, #1E3A8A 0%, #090E1A 90%)',
        }}
      />
      <FloatingParticles count={25} color={BRAND_COLORS.cyan} seed={11} />
      <BrandMotionRings size={1100} color={BRAND_COLORS.cyan} accentColor={BRAND_COLORS.yellow} />

      {/* Floating Desktop Window */}
      <div
        style={{
          width: 1540,
          height: 860,
          backgroundColor: '#090E1A',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.75), 0 0 50px rgba(33, 173, 227, 0.3)',
          transform: `scale(${windowScale})`,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* macOS Bar */}
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
            <span style={{ marginLeft: 20, color: '#94A3B8', fontSize: 14, fontFamily: 'monospace' }}>
              🔒 https://taga-askai.vercel.app/ • Server-Side Rate Limiter
            </span>
          </div>

          <div
            style={{
              backgroundColor: frame > 110 && frame < 220 ? 'rgba(236, 32, 43, 0.25)' : 'rgba(34, 197, 94, 0.2)',
              border: `1px solid ${frame > 110 && frame < 220 ? '#EF4444' : '#22C55E'}`,
              color: frame > 110 && frame < 220 ? '#FCA5A5' : '#4ADE80',
              padding: '4px 14px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 800,
              fontFamily: 'monospace',
            }}
          >
            {frame > 110 && frame < 220 ? 'LIMIT: 16/15 req/min (THROTTLED)' : 'ALLOW: 15 req/min (SLIDING WINDOW)'}
          </div>
        </div>

        {/* Live Interface Screenshot */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <Img
            src={staticFile('screenshots/clean_app_hero.png')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'bottom center',
              filter: shieldActive ? 'brightness(0.65)' : 'brightness(1.0)',
            }}
          />

          {/* Protective Shield Overlay */}
          {shieldActive && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at 50% 50%, rgba(63, 86, 202, 0.4) 0%, rgba(9, 14, 26, 0.8) 80%)',
                transform: `scale(${shieldScale})`,
              }}
            >
              <div
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  border: `3px solid ${BRAND_COLORS.cyan}`,
                  boxShadow: `0 0 60px ${BRAND_COLORS.blue}, inset 0 0 40px ${BRAND_COLORS.cyan}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 78,
                }}
              >
                🛡️
              </div>
            </div>
          )}

          {/* 429 Toast */}
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
                padding: '24px 36px',
                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9), 0 0 40px rgba(239, 68, 68, 0.5)',
                maxWidth: 680,
                textAlign: 'center',
                zIndex: 30,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#EF4444', fontWeight: 900, fontSize: 18 }}>
                <span>⚠️</span> HTTP 429 TOO MANY REQUESTS
              </div>
              <div style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 700, marginTop: 10 }}>
                Rate limit exceeded. Maximum 15 requests per minute. Please retry in 30 seconds.
              </div>
              <div style={{ color: '#94A3B8', fontSize: 14, marginTop: 8, fontFamily: 'monospace' }}>
                Retry-After: 30 • Controlled &amp; Responsible Access
              </div>
            </div>
          )}

          {/* Recovery Banner */}
          {frame > 245 && (
            <div
              style={{
                position: 'absolute',
                bottom: 50,
                left: '50%',
                transform: `translateX(-50%) scale(${recoverySpring})`,
                backgroundColor: 'rgba(15, 23, 42, 0.96)',
                border: '2px solid #22C55E',
                borderRadius: 18,
                padding: '16px 32px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(34, 197, 94, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                zIndex: 30,
              }}
            >
              <span style={{ fontSize: 28 }}>✅</span>
              <div>
                <div style={{ color: '#4ADE80', fontSize: 18, fontWeight: 800 }}>
                  NORMAL STUDENT REQUEST SUCCEEDED
                </div>
                <div style={{ color: '#CBD5E1', fontSize: 15 }}>
                  Verified student sessions continue smoothly without delay.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <RefStyleCaption title={captionPhase} subtitle={subtitlePhase} />
    </div>
  );
};
