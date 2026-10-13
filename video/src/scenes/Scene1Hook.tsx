import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../components/BackgroundGlow';
import { SubtitleOverlay } from '../components/SubtitleOverlay';
import { BRAND_COLORS } from '../types';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animation for mascot
  const mascotScale = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  // Logo entrance
  const titleOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [15, 30], [40, 0], { extrapolateRight: 'clamp' });

  // Floating idle motion
  const floatY = Math.sin(frame / 12) * 12;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <BackgroundGlow primaryColor={BRAND_COLORS.blue} secondaryColor={BRAND_COLORS.yellow} />

      {/* Top University Crest Badge */}
      <div
        style={{
          position: 'absolute',
          top: 140,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '12px 28px',
          borderRadius: 999,
          opacity: titleOpacity,
        }}
      >
        <Img
          src={staticFile('umak-seal.png')}
          style={{ width: 44, height: 44, objectFit: 'contain' }}
        />
        <span
          style={{
            color: '#FFFFFF',
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          University of Makati
        </span>
      </div>

      {/* Hero Mascot TAGAK */}
      <div
        style={{
          transform: `scale(${mascotScale}) translateY(${floatY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: -60,
        }}
      >
        <div
          style={{
            width: 320,
            height: 320,
            borderRadius: 72,
            background: 'linear-gradient(135deg, rgba(63, 86, 202, 0.3) 0%, rgba(33, 173, 227, 0.2) 100%)',
            border: `3px solid ${BRAND_COLORS.cyan}`,
            boxShadow: `0 0 80px ${BRAND_COLORS.blue}80, inset 0 0 40px ${BRAND_COLORS.cyan}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 30,
          }}
        >
          <Img
            src={staticFile('taga-bird.png')}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Brand Name Title */}
        <div
          style={{
            marginTop: 48,
            textAlign: 'center',
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <h1
            style={{
              fontSize: 74,
              fontWeight: 900,
              letterSpacing: '-2px',
              margin: 0,
              color: '#FFFFFF',
              textShadow: '0 10px 40px rgba(0, 0, 0, 0.8)',
            }}
          >
            TAGA-asK <span style={{ color: BRAND_COLORS.yellow }}>AI</span>
          </h1>
          <p
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: BRAND_COLORS.cyan,
              margin: '12px 0 0',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Verified Campus Knowledge Assistant
          </p>
        </div>
      </div>

      <SubtitleOverlay
        badge="Official UMak AI"
        text="Introducing TAGA-asK AI — the verified knowledge assistant built exclusively for the UMak community."
        accentColor={BRAND_COLORS.yellow}
      />
    </div>
  );
};
