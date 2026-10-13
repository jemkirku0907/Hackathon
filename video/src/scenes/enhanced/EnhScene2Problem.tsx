import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../components/BackgroundGlow';
import { SubtitleOverlay } from '../../components/SubtitleOverlay';
import { BRAND_COLORS } from '../../types';

export const EnhScene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const mainSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  const post2Spring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 13, mass: 0.8 },
  });

  // Slow smooth drift upward
  const driftY = interpolate(frame, [0, 265], [0, -35], { extrapolateRight: 'clamp' });

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
      <BackgroundGlow primaryColor="#475569" secondaryColor={BRAND_COLORS.red} />

      {/* Top Problem Header Badge */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          backgroundColor: 'rgba(236, 32, 43, 0.25)',
          border: `2px solid ${BRAND_COLORS.red}`,
          color: '#FCA5A5',
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
        <span>⚠️</span> THE STUDENT DILEMMA
      </div>

      {/* Main Container */}
      <div
        style={{
          width: 980,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
          transform: `scale(${mainSpring}) translateY(${driftY}px)`,
          marginTop: -40,
          zIndex: 10,
        }}
      >
        {/* Real Facebook Post Screenshot Uploaded by User (Keli Post) */}
        <div
          style={{
            width: 880,
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.85), 0 0 40px rgba(236, 32, 43, 0.25)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            backgroundColor: '#242526',
          }}
        >
          <Img
            src={staticFile('screenshots/fb_keli_post.png')}
            style={{
              width: '100%',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Second Realistic Facebook Post (CIT Location Question) */}
        <div
          style={{
            width: 880,
            transform: `scale(${post2Spring})`,
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            backgroundColor: '#242526',
          }}
        >
          {/* Native FB Header */}
          <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                backgroundColor: '#3A3B3C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 26,
              }}
            >
              👤
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#E4E6EB', fontSize: 20, fontWeight: 700 }}>
                Anonymous UMak Student
              </div>
              <div style={{ color: '#B0B3B8', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                5h • 👥 UMak Student Community
              </div>
            </div>
            <span style={{ color: '#B0B3B8', fontSize: 24 }}>•••</span>
          </div>

          {/* Post Text */}
          <div style={{ padding: '0 24px 20px', color: '#E4E6EB', fontSize: 22, lineHeight: 1.45 }}>
            Hello po! Saan po located yung Center for Information Technology sa Admin Building? Malapit na po exam namin...
          </div>

          {/* Native FB Footer */}
          <div
            style={{
              padding: '14px 24px',
              borderTop: '1px solid #3E4042',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <span style={{ color: '#B0B3B8', fontSize: 18 }}>👍 1</span>
              <span
                style={{
                  backgroundColor: 'rgba(236, 32, 43, 0.2)',
                  border: '1.5px solid #EF4444',
                  color: '#FCA5A5',
                  padding: '4px 14px',
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: 800,
                }}
              >
                💬 0 comments
              </span>
            </div>
            <div style={{ color: '#EF4444', fontSize: 16, fontWeight: 800 }}>
              ⏳ Still waiting for answers...
            </div>
          </div>
        </div>

        {/* Big Bold Headline Callout */}
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <h2
            style={{
              margin: 0,
              fontSize: 42,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-1px',
              textShadow: '0 8px 30px rgba(0, 0, 0, 0.9)',
            }}
          >
            May tanong ka. Pero minsan, <span style={{ color: BRAND_COLORS.yellow }}>walang sumasagot.</span>
          </h2>
          <p
            style={{
              margin: '8px 0 0',
              fontSize: 22,
              fontWeight: 600,
              color: '#CBD5E1',
            }}
          >
            Hours of waiting in Facebook groups and threads with zero replies.
          </p>
        </div>
      </div>

      <SubtitleOverlay
        badge="The Student Problem"
        text="Ever asked a question in a student group, only to wait hours with zero replies? May tanong ka, pero minsan, walang sumasagot."
        accentColor={BRAND_COLORS.red}
      />
    </div>
  );
};
