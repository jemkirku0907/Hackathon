import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { RefStyleCaption } from '../../components/RefStyleCaption';
import { BRAND_COLORS } from '../../types';

export const LSScene4Citations: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  const citationZoom = interpolate(frame, [120, 260], [1, 1.2], { extrapolateRight: 'clamp' });
  const panY = interpolate(frame, [120, 260], [0, -60], { extrapolateRight: 'clamp' });

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
          background: 'radial-gradient(circle at 50% 50%, #F5EC38 0%, #D1CA25 80%)',
        }}
      />

      {/* Centered Response Card Showcase */}
      <div
        style={{
          width: 1280,
          backgroundColor: '#0F172A',
          border: `2px solid ${BRAND_COLORS.blue}`,
          borderRadius: 28,
          padding: 44,
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.55)',
          transform: `scale(${entrance * citationZoom}) translateY(${panY}px)`,
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}
      >
        {/* User Question Row */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div
            style={{
              backgroundColor: BRAND_COLORS.blue,
              color: '#FFFFFF',
              borderRadius: '24px 24px 4px 24px',
              padding: '20px 32px',
              fontSize: 26,
              fontWeight: 700,
              boxShadow: `0 10px 30px ${BRAND_COLORS.blue}50`,
            }}
          >
            Where is the Center for Information Technology (CIT) located?
          </div>
        </div>

        {/* AI Answer Row */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              backgroundColor: '#1E293B',
              border: `2px solid ${BRAND_COLORS.blue}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              flexShrink: 0,
            }}
          >
            <Img
              src={staticFile('taga-bird.png')}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: '#1E293B',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '4px 24px 24px 24px',
              padding: '28px 36px',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                border: '1.5px solid #22C55E',
                color: '#4ADE80',
                padding: '4px 14px',
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              <span>✓</span> Grounded &amp; Verified in Official Sources
            </div>

            <p style={{ margin: 0, color: '#FFFFFF', fontSize: 28, lineHeight: 1.45, fontWeight: 500 }}>
              The <strong>Center for Information Technology (CIT)</strong> is located in the{' '}
              <strong style={{ color: BRAND_COLORS.yellow }}>Admin Building</strong>,{' '}
              <strong style={{ color: BRAND_COLORS.cyan }}>Second Floor</strong>,{' '}
              <strong>South Wing</strong>.
            </p>

            {/* Official Citation Pill */}
            <div
              style={{
                marginTop: 24,
                paddingTop: 18,
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(33, 173, 227, 0.2)',
                  border: `2px solid ${BRAND_COLORS.cyan}`,
                  borderRadius: 14,
                  padding: '10px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  boxShadow: frame > 120 ? `0 0 30px ${BRAND_COLORS.cyan}80` : 'none',
                }}
              >
                <span style={{ fontSize: 22 }}>📄</span>
                <span style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 800 }}>
                  Source03.pdf • Page 1
                </span>
                <span
                  style={{
                    backgroundColor: BRAND_COLORS.cyan,
                    color: '#090E1A',
                    fontSize: 13,
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: 6,
                  }}
                >
                  VERIFIED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RefStyleCaption
        title="Grounded answers."
        subtitle="Every answer backed by an exact, verifiable citation."
      />
    </div>
  );
};
