import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../components/BackgroundGlow';
import { MasterWordmark } from '../../components/MasterWordmark';
import { MasterSubtitleOverlay } from '../../components/MasterSubtitleOverlay';
import { BRAND_COLORS } from '../../types';

export const MasterScene7Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Closing taglines spring
  const tag1Spring = spring({ frame: frame - 35, fps, config: { damping: 14, mass: 0.8 } });
  const tag2Spring = spring({ frame: frame - 60, fps, config: { damping: 14, mass: 0.8 } });
  const pillSpring = spring({ frame: frame - 85, fps, config: { damping: 14, mass: 0.8 } });

  // Smooth fade to black (frames 205 to 240)
  const fadeToBlack = interpolate(frame, [205, 240], [0, 1], { extrapolateRight: 'clamp' });

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
      <BackgroundGlow primaryColor={BRAND_COLORS.blue} secondaryColor={BRAND_COLORS.yellow} />

      {/* Authentic Official Logo Centerpiece */}
      <div style={{ marginTop: -130, zIndex: 20 }}>
        <MasterWordmark scale={1.12} showTagline={false} />
      </div>

      {/* Final Taglines Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginTop: 40,
          zIndex: 25,
          padding: '0 40px',
        }}
      >
        {/* Tagline 1 */}
        <div
          style={{
            transform: `scale(${tag1Spring})`,
            opacity: tag1Spring,
            fontSize: 46,
            fontWeight: 900,
            color: BRAND_COLORS.yellow,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            textShadow: `0 0 25px ${BRAND_COLORS.yellow}70`,
          }}
        >
          Less waiting. Easier access to information.
        </div>

        {/* Tagline 2 */}
        <div
          style={{
            transform: `scale(${tag2Spring})`,
            opacity: tag2Spring,
            marginTop: 14,
            fontSize: 30,
            fontWeight: 700,
            color: '#E2E8F0',
            letterSpacing: '0.6px',
          }}
        >
          Ask smarter. Stay connected with UMak.
        </div>

        {/* Deployment Domain Pill */}
        <div
          style={{
            transform: `scale(${pillSpring})`,
            opacity: pillSpring,
            marginTop: 34,
            backgroundColor: 'rgba(63, 86, 202, 0.25)',
            border: `1.5px solid ${BRAND_COLORS.cyan}`,
            borderRadius: 999,
            padding: '12px 38px',
            boxShadow: '0 4px 30px rgba(33, 173, 227, 0.35)',
          }}
        >
          <span
            style={{
              color: '#FFFFFF',
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: '1px',
              fontFamily: 'monospace',
            }}
          >
            taga-askai.vercel.app
          </span>
        </div>
      </div>

      <MasterSubtitleOverlay
        badge="Ask Smarter"
        text="Less waiting, easier access to information. Ask smarter, stay connected with UMak."
        accentColor={BRAND_COLORS.yellow}
      />

      {/* Smooth fade out to black */}
      {fadeToBlack > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#000000',
            opacity: fadeToBlack,
            pointerEvents: 'none',
            zIndex: 100,
          }}
        />
      )}
    </div>
  );
};
