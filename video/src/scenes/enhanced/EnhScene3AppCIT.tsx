import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../components/BackgroundGlow';
import { SubtitleOverlay } from '../../components/SubtitleOverlay';
import { BRAND_COLORS } from '../../types';

export const EnhScene3AppCIT: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  // Slow smooth zoom into the verified CIT answer
  const zoom = interpolate(frame, [0, 200, 390], [1, 1.15, 1.25], { extrapolateRight: 'clamp' });
  const panY = interpolate(frame, [0, 200, 390], [0, -30, -50], { extrapolateRight: 'clamp' });

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
          backgroundColor: 'rgba(33, 173, 227, 0.25)',
          border: `2px solid ${BRAND_COLORS.cyan}`,
          color: BRAND_COLORS.cyan,
          fontSize: 22,
          fontWeight: 800,
          padding: '8px 26px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          zIndex: 20,
        }}
      >
        <span>⚡</span> REAL-TIME VERIFIED RAG
      </div>

      {/* Window Mockup with User's Exact Dark Mode App Screenshot */}
      <div
        style={{
          width: 980,
          borderRadius: 24,
          overflow: 'hidden',
          backgroundColor: '#090E1A',
          border: '2px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 30px 100px rgba(0, 0, 0, 0.85), 0 0 50px rgba(63, 86, 202, 0.35)',
          transform: `scale(${entrance * zoom}) translateY(${panY}px)`,
          marginTop: -40,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Browser Top Bar */}
        <div
          style={{
            height: 48,
            backgroundColor: '#111827',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            gap: 8,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#EC202B' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#D1CA25' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#22C55E' }} />
          <span style={{ marginLeft: 20, color: '#94A3B8', fontSize: 15, fontFamily: 'monospace' }}>
            🔒 https://taga-askai.vercel.app/
          </span>
        </div>

        {/* Real Dark Mode Screenshot (Showing WHERE IS CIT & Source03.pdf Page 1) */}
        <div style={{ position: 'relative', width: '100%', height: 720, overflow: 'hidden' }}>
          <Img
            src={staticFile('screenshots/dark_cit_answer.png')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 35%',
            }}
          />
        </div>
      </div>

      <SubtitleOverlay
        badge="Direct Answer & Verified Citation"
        text="Enter TAGA-asK AI. Ask where the CIT office is located, and get an instant answer: Second Floor, South Wing, Admin Building, with verified page citations."
        accentColor={BRAND_COLORS.cyan}
      />
    </div>
  );
};
