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

  // Smooth camera zoom into the chat response and citation
  const zoom = interpolate(frame, [0, 200, 390], [1, 1.25, 1.35], { extrapolateRight: 'clamp' });
  const panX = interpolate(frame, [0, 200, 390], [0, -120, -140], { extrapolateRight: 'clamp' });
  const panY = interpolate(frame, [0, 200, 390], [0, 80, 90], { extrapolateRight: 'clamp' });

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

      {/* Floating Desktop Window with Real Dark Mode App Screenshot */}
      <div
        style={{
          width: 1540,
          height: 860,
          backgroundColor: '#090E1A',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          transform: `scale(${entrance})`,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* macOS Bar */}
        <div
          style={{
            height: 48,
            backgroundColor: '#111827',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            gap: 8,
            zIndex: 10,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#EC202B' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#D1CA25' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#22C55E' }} />
          <span style={{ marginLeft: 20, color: '#94A3B8', fontSize: 14, fontFamily: 'monospace' }}>
            🔒 https://taga-askai.vercel.app/
          </span>
        </div>

        {/* Real Dark Mode Screenshot with Dynamic Camera Pan & Zoom */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              width: '100%',
              height: '100%',
              transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
              transformOrigin: 'center center',
            }}
          >
            <Img
              src={staticFile('screenshots/dark_cit_answer.png')}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
        </div>
      </div>

      <RefStyleCaption
        title="Admin Building, 2nd Floor, South Wing."
        subtitle="Source03.pdf · Page 1. Verified institutional citation in under 30 words."
      />
    </div>
  );
};
