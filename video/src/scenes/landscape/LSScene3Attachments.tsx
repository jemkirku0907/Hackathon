import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { RefStyleCaption } from '../../components/RefStyleCaption';
import { AnimatedCursor } from '../../components/AnimatedCursor';
import { BRAND_COLORS } from '../../types';

export const LSScene3Attachments: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera zooms into composer at the bottom
  const zoom = interpolate(frame, [0, 240], [1.1, 1.35], { extrapolateRight: 'clamp' });
  const panY = interpolate(frame, [0, 240], [-80, -260], { extrapolateRight: 'clamp' });

  // Attachment chip entrance
  const chipSpring = spring({
    frame: frame - 25,
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
          background: 'radial-gradient(circle at 60% 50%, #F5EC38 0%, #D1CA25 80%)',
        }}
      />

      {/* Floating Desktop Window with Zoom into composer */}
      <div
        style={{
          width: 1540,
          height: 860,
          backgroundColor: '#090E1A',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.45)',
          transform: `scale(${zoom}) translateY(${panY}px)`,
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
        </div>

        {/* Live Interface Screenshot */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <Img
            src={staticFile('screenshots/clean_app_hero.png')}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'bottom center' }}
          />

          {/* Floating High-Contrast Attachment Mockup */}
          {frame > 25 && (
            <div
              style={{
                position: 'absolute',
                bottom: 120,
                left: '50%',
                transform: `translateX(-50%) scale(${chipSpring})`,
                backgroundColor: 'rgba(15, 23, 42, 0.98)',
                border: `2px solid ${BRAND_COLORS.blue}`,
                borderRadius: 20,
                padding: '18px 28px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  backgroundColor: BRAND_COLORS.blue,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 26,
                  color: '#FFFFFF',
                }}
              >
                📎
              </div>
              <div>
                <div style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 800 }}>
                  UMak_Curriculum_Schedule.pdf
                </div>
                <div style={{ color: '#94A3B8', fontSize: 15, marginTop: 2 }}>
                  142.8 KB • Multimodal Document Analysis
                </div>
              </div>
              <div
                style={{
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  border: '1.5px solid #22C55E',
                  color: '#4ADE80',
                  padding: '6px 14px',
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 800,
                  marginLeft: 12,
                }}
              >
                READY TO ASK
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mouse Cursor Navigation: Move to Attach button, click to trigger chip, hover attachment, hover prompt input */}
      {frame < 35 && (
        <AnimatedCursor
          startX={1200}
          startY={800}
          targetX={960}
          targetY={620}
          startFrame={5}
          endFrame={24}
          clickFrame={25}
        />
      )}
      {frame >= 35 && frame < 120 && (
        <AnimatedCursor
          startX={960}
          startY={620}
          targetX={1120}
          targetY={570}
          startFrame={36}
          endFrame={65}
        />
      )}
      {frame >= 120 && (
        <AnimatedCursor
          startX={1120}
          startY={570}
          targetX={900}
          targetY={670}
          startFrame={125}
          endFrame={160}
          clickFrame={165}
        />
      )}

      <RefStyleCaption
        title="Ask with attachments."
        subtitle="Upload images and PDFs for instant multimodal analysis."
      />
    </div>
  );
};
