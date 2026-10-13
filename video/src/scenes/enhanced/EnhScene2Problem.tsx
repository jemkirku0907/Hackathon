import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../components/BackgroundGlow';
import { SubtitleOverlay } from '../../components/SubtitleOverlay';
import { BRAND_COLORS } from '../../types';

export const EnhScene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mainSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  const post2Spring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 13, mass: 0.8 },
  });

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

      {/* Main Container with Both Real Facebook Screenshots */}
      <div
        style={{
          width: 980,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 26,
          transform: `scale(${mainSpring}) translateY(${driftY}px)`,
          marginTop: -30,
          zIndex: 10,
        }}
      >
        {/* Real Facebook Post 1: Asking for CIT Location */}
        <div
          style={{
            width: 880,
            borderRadius: 22,
            overflow: 'hidden',
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.85), 0 0 40px rgba(236, 32, 43, 0.25)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            backgroundColor: '#242526',
          }}
        >
          <Img
            src={staticFile('screenshots/fb_cit_post.png')}
            style={{
              width: '100%',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Real Facebook Post 2: Keli asking about Makati scholarship & student benefits */}
        <div
          style={{
            width: 880,
            transform: `scale(${post2Spring})`,
            borderRadius: 22,
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)',
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

        {/* Big Bold Headline Callout */}
        <div style={{ textAlign: 'center', marginTop: 16 }}>
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
