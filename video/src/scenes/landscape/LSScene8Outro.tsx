import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND_COLORS } from '../../types';

export const LSScene8Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 11, mass: 0.8 },
  });

  const floatY = Math.sin(frame / 12) * 8;
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: BRAND_COLORS.yellow,
        display: 'flex',
        flexDirection: 'column',
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
          background: 'radial-gradient(circle at 50% 45%, #F7EE3B 0%, #D1CA25 85%)',
        }}
      />

      {/* Outro Branded Centerpiece (Directly mirroring the reference video's ending) */}
      <div
        style={{
          transform: `scale(${entrance}) translateY(${floatY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity,
        }}
      >
        {/* TAGAK Mascot Box */}
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: 44,
            backgroundColor: '#090E1A',
            border: '4px solid #090E1A',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 18,
          }}
        >
          <Img
            src={staticFile('taga-bird.png')}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Wordmark */}
        <h1
          style={{
            fontSize: 84,
            fontWeight: 900,
            letterSpacing: '-2px',
            color: '#090E1A',
            margin: '28px 0 0',
            textAlign: 'center',
          }}
        >
          TAGA-asK AI
        </h1>

        {/* Official Quote */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 900,
            letterSpacing: '2px',
            color: '#090E1A',
            textTransform: 'uppercase',
            margin: '16px 0 0',
          }}
        >
          &ldquo;Every Tagak, just ask.&rdquo;
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: '2px',
            color: '#334155',
            textTransform: 'uppercase',
            margin: '8px 0 0',
          }}
        >
          Your UMak AI Companion.
        </p>

        {/* Live URL Pill */}
        <div
          style={{
            marginTop: 28,
            backgroundColor: '#090E1A',
            color: '#FFFFFF',
            fontSize: 20,
            fontWeight: 700,
            padding: '10px 28px',
            borderRadius: 999,
            fontFamily: 'monospace',
            letterSpacing: '1px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
          }}
        >
          taga-askai.vercel.app
        </div>

        {/* Developer Credit */}
        <div
          style={{
            marginTop: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            color: '#1E293B',
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          <Img
            src={staticFile('doerrorin-logo.png')}
            style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'contain' }}
          />
          <span>Developed with pride by DoError!n</span>
        </div>
      </div>
    </div>
  );
};
