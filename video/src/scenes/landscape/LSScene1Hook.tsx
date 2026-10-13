import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { RefStyleCaption } from '../../components/RefStyleCaption';
import { BRAND_COLORS } from '../../types';

export const LSScene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const windowScale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  // Slow smooth camera zoom in
  const zoom = interpolate(frame, [0, 180], [1, 1.08], { extrapolateRight: 'clamp' });
  const panY = interpolate(frame, [0, 180], [0, -30], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: BRAND_COLORS.yellow,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Background Subtle Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 30%, #F5EC38 0%, #D1CA25 80%)',
        }}
      />

      {/* Floating Desktop Application Window */}
      <div
        style={{
          width: 1540,
          height: 860,
          backgroundColor: '#090E1A',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.15)',
          transform: `scale(${windowScale * zoom}) translateY(${panY}px)`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* macOS / Web App Window Header */}
        <div
          style={{
            height: 48,
            backgroundColor: '#111827',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 18px',
            gap: 8,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#EC202B' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#D1CA25' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#22C55E' }} />

          {/* Browser Address Pill */}
          <div
            style={{
              marginLeft: 24,
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderRadius: 8,
              padding: '4px 16px',
              fontSize: 14,
              color: '#94A3B8',
              fontFamily: 'monospace',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>🔒</span> https://taga-askai.vercel.app/
          </div>
        </div>

        {/* Live App Interface */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <Img
            src={staticFile('screenshots/clean_app_hero.png')}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>
      </div>

      {/* Reference Video Lower-Left Caption Card */}
      <RefStyleCaption
        title="Strictly verified."
        subtitle="Exclusively referencing official University of Makati guidelines."
      />
    </div>
  );
};
