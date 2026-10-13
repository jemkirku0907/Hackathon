import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../components/BackgroundGlow';
import { SubtitleOverlay } from '../components/SubtitleOverlay';
import { BRAND_COLORS } from '../types';

export const Scene2Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const scale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  // Slow smooth camera pan and zoom into composer
  const panY = interpolate(frame, [0, 240], [0, -60], { extrapolateRight: 'clamp' });
  const zoom = interpolate(frame, [0, 240], [1, 1.08], { extrapolateRight: 'clamp' });

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
      <BackgroundGlow primaryColor={BRAND_COLORS.blue} secondaryColor={BRAND_COLORS.cyan} />

      {/* Top Header Badge */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          zIndex: 20,
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(63, 86, 202, 0.25)',
            border: `2px solid ${BRAND_COLORS.blue}`,
            color: '#FFFFFF',
            fontSize: 22,
            fontWeight: 800,
            padding: '8px 24px',
            borderRadius: 999,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ color: BRAND_COLORS.yellow }}>●</span> LIVE APPLICATION
        </div>
      </div>

      {/* App Mockup Container (Horizontal viewport inside 9:16 canvas for readability) */}
      <div
        style={{
          width: 960,
          borderRadius: 28,
          overflow: 'hidden',
          backgroundColor: '#0E1626',
          border: '2px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 30px 100px rgba(0, 0, 0, 0.8), 0 0 40px rgba(63, 86, 202, 0.3)',
          transform: `scale(${scale * zoom}) translateY(${panY}px)`,
          marginTop: -60,
        }}
      >
        {/* Browser Top Bar */}
        <div
          style={{
            height: 52,
            backgroundColor: '#161F30',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            gap: 10,
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#EC202B' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#D1CA25' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#22C55E' }} />
          <div
            style={{
              marginLeft: 20,
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderRadius: 8,
              padding: '6px 16px',
              fontSize: 16,
              color: '#94A3B8',
              fontFamily: 'monospace',
            }}
          >
            https://taga-askai.vercel.app/
          </div>
        </div>

        {/* Live Interface Screenshot */}
        <div style={{ position: 'relative', width: '100%', height: 960, overflow: 'hidden' }}>
          <Img
            src={staticFile('screenshots/media_1791867082690_94f8aac9.png')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
            }}
          />

          {/* Glowing Cursor Focus Indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: 80,
              left: '50%',
              transform: 'translateX(-50%)',
              border: `3px solid ${BRAND_COLORS.yellow}`,
              backgroundColor: 'rgba(209, 202, 37, 0.15)',
              borderRadius: 20,
              padding: '16px 32px',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              boxShadow: `0 0 30px ${BRAND_COLORS.yellow}60`,
            }}
          >
            <span>💬</span> Instant Verified AI Answers Grounded in Official Sources
          </div>
        </div>
      </div>

      <SubtitleOverlay
        badge="Zero Hallucinations"
        text="Say goodbye to endless handbook searching. TAGA-asK AI gives you instant, verified answers to all your campus questions."
        accentColor={BRAND_COLORS.cyan}
      />
    </div>
  );
};
