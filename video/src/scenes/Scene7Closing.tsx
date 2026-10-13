import React from 'react';
import { interpolate, spring, staticFile, Img, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../components/BackgroundGlow';
import { SubtitleOverlay } from '../components/SubtitleOverlay';
import { BRAND_COLORS } from '../types';

export const Scene7Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 11, mass: 0.8 },
  });

  const floatY = Math.sin(frame / 10) * 10;
  const pulseAura = interpolate(Math.sin(frame / 12), [-1, 1], [0.8, 1.2]);

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

      {/* Center Mascot & Logo Reveal */}
      <div
        style={{
          transform: `scale(${logoScale}) translateY(${floatY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: -60,
        }}
      >
        {/* Glow Halo */}
        <div
          style={{
            position: 'absolute',
            width: 440,
            height: 440,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${BRAND_COLORS.cyan}50 0%, transparent 70%)`,
            filter: 'blur(60px)',
            transform: `scale(${pulseAura})`,
            zIndex: -1,
          }}
        />

        <div
          style={{
            width: 320,
            height: 320,
            borderRadius: 72,
            backgroundColor: '#0F172A',
            border: `4px solid ${BRAND_COLORS.yellow}`,
            boxShadow: `0 0 80px ${BRAND_COLORS.yellow}60`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <Img
            src={staticFile('taga-bird.png')}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 78,
            fontWeight: 900,
            letterSpacing: '-2px',
            margin: '40px 0 0',
            color: '#FFFFFF',
            textAlign: 'center',
            textShadow: '0 10px 40px rgba(0, 0, 0, 0.9)',
          }}
        >
          TAGA-asK <span style={{ color: BRAND_COLORS.yellow }}>AI</span>
        </h1>

        {/* Motto */}
        <p
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: '#CBD5E1',
            margin: '16px 0 0',
            textAlign: 'center',
            letterSpacing: '1px',
          }}
        >
          Ask smarter. Find answers. Stay connected with UMak.
        </p>

        {/* URL Pill */}
        <div
          style={{
            marginTop: 32,
            backgroundColor: 'rgba(63, 86, 202, 0.3)',
            border: `2px solid ${BRAND_COLORS.blue}`,
            borderRadius: 999,
            padding: '12px 36px',
            color: '#FFFFFF',
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: '1px',
            fontFamily: 'monospace',
            boxShadow: `0 0 30px ${BRAND_COLORS.blue}60`,
          }}
        >
          taga-askai.vercel.app
        </div>

        {/* Developer Credit with DoError!n logo */}
        <div
          style={{
            marginTop: 36,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            padding: '10px 24px',
            borderRadius: 999,
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Img
            src={staticFile('doerrorin-logo.png')}
            style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'contain' }}
          />
          <span style={{ color: '#94A3B8', fontSize: 18, fontWeight: 600 }}>
            Developed with pride by <strong style={{ color: '#FFFFFF' }}>DoError!n</strong>
          </span>
        </div>
      </div>

      <SubtitleOverlay
        badge="Live at taga-askai.vercel.app"
        text="Ask smarter. Find answers. Stay connected with UMak. TAGA-asK AI — developed with pride by DoError!n."
        accentColor={BRAND_COLORS.yellow}
      />
    </div>
  );
};
