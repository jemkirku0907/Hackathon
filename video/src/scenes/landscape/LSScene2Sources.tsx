import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { RefStyleCaption } from '../../components/RefStyleCaption';
import { BRAND_COLORS } from '../../types';

export const LSScene2Sources: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera pan left towards the sidebar
  const panX = interpolate(frame, [0, 210], [0, 180], { extrapolateRight: 'clamp' });
  const zoom = interpolate(frame, [0, 210], [1.05, 1.25], { extrapolateRight: 'clamp' });

  // Floating highlight badge over PDF list
  const badgeSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

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
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 40% 40%, #F5EC38 0%, #D1CA25 80%)',
        }}
      />

      {/* Floating Desktop Window with Camera Pan */}
      <div
        style={{
          width: 1540,
          height: 860,
          backgroundColor: '#090E1A',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.45)',
          transform: `scale(${zoom}) translateX(${panX}px)`,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Title bar */}
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
          <div
            style={{
              marginLeft: 24,
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderRadius: 8,
              padding: '4px 16px',
              fontSize: 14,
              color: '#94A3B8',
              fontFamily: 'monospace',
            }}
          >
            https://taga-askai.vercel.app/
          </div>
        </div>

        {/* Live Interface Screenshot */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <Img
            src={staticFile('screenshots/media_1791867082690_94f8aac9.png')}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top left' }}
          />

          {/* Floating UI Overlay Card matching reference video style */}
          {frame > 20 && (
            <div
              style={{
                position: 'absolute',
                top: 180,
                left: 120,
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: `2px solid ${BRAND_COLORS.blue}`,
                borderRadius: 16,
                padding: '16px 24px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
                transform: `scale(${badgeSpring})`,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div style={{ color: BRAND_COLORS.yellow, fontWeight: 800, fontSize: 16 }}>
                OFFICIAL KNOWLEDGE BASE
              </div>
              <div style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700 }}>
                • Source01: Scholarships (14p)
              </div>
              <div style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700 }}>
                • Source02: CCIS Requirements (2p)
              </div>
              <div style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700 }}>
                • Source03: Campus Map Directory (6p)
              </div>
              <div style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700 }}>
                • Source04: Administrative Offices (14p)
              </div>
            </div>
          )}
        </div>
      </div>

      <RefStyleCaption
        title="Four official documents."
        subtitle="Scholarships, college requirements, campus map, and offices."
      />
    </div>
  );
};
