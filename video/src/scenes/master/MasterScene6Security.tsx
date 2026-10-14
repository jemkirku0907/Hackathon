import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../components/BackgroundGlow';
import { MasterSubtitleOverlay } from '../../components/MasterSubtitleOverlay';
import { BRAND_COLORS } from '../../types';

export const MasterScene6Security: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({ frame, fps, config: { damping: 14, mass: 0.9 } });

  // Protective boundary pulse
  const shieldActive = frame > 30 && frame < 190;
  const borderPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.7, 1]);

  // Request cards positions
  const req1X = interpolate(frame, [10, 50], [-300, 0], { extrapolateRight: 'clamp' });
  const toastSpring = spring({ frame: frame - 95, fps, config: { damping: 13, mass: 0.8 } });
  const authSpring = spring({ frame: frame - 135, fps, config: { damping: 13, mass: 0.8 } });

  // Dynamic security sequence caption text based on prompt
  let captionPhase = 'Built-in Rate Limiting';
  if (frame > 60 && frame <= 130) {
    captionPhase = 'Helps reduce excessive requests and bot spam';
  } else if (frame > 130 && frame <= 185) {
    captionPhase = 'Access for the UMak Community';
  } else if (frame > 185) {
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
        backgroundColor: '#0B0F19',
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      <BackgroundGlow primaryColor={BRAND_COLORS.blue} secondaryColor={BRAND_COLORS.cyan} />

      {/* Top Security Header Badge */}
      <div
        style={{
          position: 'absolute',
          top: 140,
          backgroundColor: 'rgba(63, 86, 202, 0.2)',
          border: `1.5px solid ${BRAND_COLORS.blue}`,
          color: '#93C5FD',
          fontSize: 22,
          fontWeight: 800,
          padding: '8px 28px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          zIndex: 30,
        }}
      >
        <span>Access Control &amp; Rate Limiting</span>
      </div>

      {/* Main Showcase Container */}
      <div
        style={{
          width: 960,
          transform: `scale(${entrance})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: -30,
          zIndex: 20,
        }}
      >
        {/* Dynamic Security Caption Bar */}
        <div
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.96)',
            border: `1.5px solid ${frame > 185 ? BRAND_COLORS.yellow : BRAND_COLORS.cyan}`,
            borderRadius: 18,
            padding: '14px 32px',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.75)',
            marginBottom: 26,
            textAlign: 'center',
          }}
        >
          <span
            style={{
              color: frame > 185 ? BRAND_COLORS.yellow : '#FFFFFF',
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: '-0.3px',
            }}
          >
            {captionPhase}
          </span>
        </div>

        {/* Central App Card with Real Security States */}
        <div
          style={{
            position: 'relative',
            width: 940,
            borderRadius: 24,
            overflow: 'hidden',
            backgroundColor: '#0F172A',
            border: `2px solid ${shieldActive ? BRAND_COLORS.cyan : 'rgba(255, 255, 255, 0.16)'}`,
            boxShadow: shieldActive
              ? `0 25px 80px rgba(0, 0, 0, 0.85), 0 0 45px rgba(33, 173, 227, ${borderPulse * 0.4})`
              : '0 25px 80px rgba(0, 0, 0, 0.85)',
            padding: '28px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* Incoming Verified Query */}
          <div
            style={{
              transform: `translateX(${req1X}px)`,
              backgroundColor: 'rgba(30, 41, 59, 0.95)',
              border: '1px solid rgba(34, 197, 94, 0.4)',
              borderRadius: 14,
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700 }}>
                Student Request: CIT Office Location
              </div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>
                Session verified • Query routed to retrieval engine
              </div>
            </div>
            <span style={{ color: '#86EFAC', fontSize: 15, fontWeight: 800 }}>Allowed</span>
          </div>

          {/* Actual Application Rate Limit Notification (429) */}
          {frame >= 95 && (
            <div
              style={{
                transform: `scale(${toastSpring})`,
                backgroundColor: 'rgba(127, 29, 29, 0.35)',
                border: '1.5px solid rgba(239, 68, 68, 0.6)',
                borderRadius: 14,
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ color: '#FCA5A5', fontSize: 18, fontWeight: 800 }}>
                  Rate limit reached (HTTP 429)
                </div>
                <div style={{ color: '#E2E8F0', fontSize: 14, marginTop: 2 }}>
                  Maximum 15 requests per minute • Retry in 30 seconds
                </div>
              </div>
              <span
                style={{
                  backgroundColor: BRAND_COLORS.red,
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: 13,
                  padding: '4px 10px',
                  borderRadius: 6,
                }}
              >
                Controlled
              </span>
            </div>
          )}

          {/* Verified UMak Account Requirement */}
          {frame >= 135 && (
            <div
              style={{
                transform: `scale(${authSpring})`,
                backgroundColor: 'rgba(30, 58, 138, 0.3)',
                border: `1.5px solid ${BRAND_COLORS.blue}`,
                borderRadius: 14,
                padding: '16px 20px',
              }}
            >
              <div style={{ color: '#93C5FD', fontSize: 14, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                UMak Community Access
              </div>
              <div style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 800, marginTop: 4 }}>
                Sign-in requires a verified @umak.edu.ph account
              </div>
            </div>
          )}
        </div>
      </div>

      <MasterSubtitleOverlay
        badge="Access Control"
        text="Built-in rate limiting helps reduce excessive requests and bot spam. And sign-in is limited to UMak email accounts."
        accentColor={BRAND_COLORS.blue}
      />
    </div>
  );
};
