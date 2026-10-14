import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../../components/BackgroundGlow';
import { MasterSubtitleOverlay } from '../../../components/MasterSubtitleOverlay';
import { BRAND_COLORS } from '../../../types';

export const LSMasterScene6Security: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14, mass: 0.9 } });
  const shieldActive = frame > 30 && frame < 190;
  const borderPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.7, 1]);

  const req1X = interpolate(frame, [10, 50], [-250, 0], { extrapolateRight: 'clamp' });
  const toastSpring = spring({ frame: frame - 95, fps, config: { damping: 13, mass: 0.8 } });
  const authSpring = spring({ frame: frame - 135, fps, config: { damping: 13, mass: 0.8 } });

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
        width: '1920px',
        height: '1080px',
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

      {/* Dynamic Security Caption Bar */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          backgroundColor: 'rgba(15, 23, 42, 0.96)',
          border: `1.5px solid ${frame > 185 ? BRAND_COLORS.yellow : BRAND_COLORS.cyan}`,
          borderRadius: 16,
          padding: '10px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          zIndex: 30,
        }}
      >
        <span style={{ color: frame > 185 ? BRAND_COLORS.yellow : '#FFFFFF', fontSize: 20, fontWeight: 800 }}>
          {captionPhase}
        </span>
      </div>

      <div
        style={{
          width: 1300,
          transform: `scale(${entrance})`,
          backgroundColor: '#0F172A',
          border: `2px solid ${shieldActive ? BRAND_COLORS.cyan : 'rgba(255, 255, 255, 0.16)'}`,
          boxShadow: shieldActive
            ? `0 25px 80px rgba(0, 0, 0, 0.85), 0 0 45px rgba(33, 173, 227, ${borderPulse * 0.4})`
            : '0 25px 80px rgba(0, 0, 0, 0.85)',
          borderRadius: 22,
          padding: '28px 36px',
          display: 'flex',
          flexDirection: 'row',
          gap: 32,
          zIndex: 20,
          marginTop: 60,
        }}
      >
        {/* Requests & Rate Limiter Block */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ transform: `translateX(${req1X}px)`, backgroundColor: 'rgba(30, 41, 59, 0.95)', border: '1px solid rgba(34, 197, 94, 0.4)', borderRadius: 12, padding: '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#FFF', fontSize: 16, fontWeight: 700 }}>Student Request: CIT Location</span>
            <span style={{ color: '#86EFAC', fontSize: 13, fontWeight: 800 }}>Allowed</span>
          </div>

          {frame >= 95 && (
            <div style={{ transform: `scale(${toastSpring})`, backgroundColor: 'rgba(127, 29, 29, 0.35)', border: '1.5px solid rgba(239, 68, 68, 0.6)', borderRadius: 12, padding: '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: '#FCA5A5', fontSize: 16, fontWeight: 800 }}>Rate limit reached (HTTP 429)</div>
                <div style={{ color: '#CBD5E1', fontSize: 13 }}>Maximum 15 requests per minute • Retry in 30s</div>
              </div>
              <span style={{ backgroundColor: BRAND_COLORS.red, color: '#FFF', fontWeight: 800, fontSize: 12, padding: '4px 8px', borderRadius: 6 }}>
                Controlled
              </span>
            </div>
          )}
        </div>

        {/* UMak Authentication Block */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {frame >= 135 && (
            <div style={{ transform: `scale(${authSpring})`, backgroundColor: 'rgba(30, 58, 138, 0.3)', border: `1.5px solid ${BRAND_COLORS.blue}`, borderRadius: 14, padding: '18px 22px' }}>
              <div style={{ color: '#93C5FD', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                UMak Community Access
              </div>
              <div style={{ color: '#FFFFFF', fontSize: 17, fontWeight: 800, marginTop: 4 }}>
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
        isLandscape={true}
      />
    </div>
  );
};
