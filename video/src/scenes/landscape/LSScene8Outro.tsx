import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { FloatingParticles, BrandMotionRings, LightSweep } from '../../components/FloatingElements';
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

  // Fade to black at the end
  const fadeToBlack = interpolate(frame, [275, 300], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#090E1A',
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
          background: 'radial-gradient(circle at 50% 45%, #1E3A8A 0%, #090E1A 90%)',
        }}
      />
      <FloatingParticles count={25} color={BRAND_COLORS.yellow} seed={8} />
      <BrandMotionRings size={1100} color={BRAND_COLORS.blue} accentColor={BRAND_COLORS.yellow} />

      {/* Outro Centerpiece with Official Logo */}
      <div
        style={{
          transform: `scale(${entrance}) translateY(${floatY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity,
          zIndex: 10,
        }}
      >
        {/* Soft Radial Spotlight Halo */}
        <div
          style={{
            position: 'absolute',
            width: 800,
            height: 520,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(200, 220, 255, 0.55) 40%, rgba(63, 86, 202, 0.25) 70%, transparent 85%)',
            filter: 'blur(50px)',
            zIndex: -1,
          }}
        />

        {/* Official Logo Display */}
        <div
          style={{
            position: 'relative',
            width: 720,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 20px 50px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 35px rgba(209, 202, 37, 0.45))',
          }}
        >
          <LightSweep startFrame={25} duration={32} color="rgba(255, 255, 255, 0.7)" />

          <Img
            src={staticFile('official-logo-transparent.png')}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </div>

        {/* Official Motto */}
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            letterSpacing: '2px',
            color: BRAND_COLORS.yellow,
            textTransform: 'uppercase',
            margin: '28px 0 0',
            textShadow: `0 0 25px ${BRAND_COLORS.yellow}80`,
          }}
        >
          &ldquo;Every Tagak, just ask.&rdquo;
        </div>

        {/* Closing Tagline */}
        <p
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: '1px',
            color: '#CBD5E1',
            margin: '10px 0 0',
            textAlign: 'center',
          }}
        >
          Ask smarter. Find answers. Stay connected with UMak.
        </p>

        {/* Live URL Pill */}
        <div
          style={{
            marginTop: 22,
            backgroundColor: 'rgba(63, 86, 202, 0.35)',
            border: `2px solid ${BRAND_COLORS.blue}`,
            color: '#FFFFFF',
            fontSize: 20,
            fontWeight: 700,
            padding: '10px 32px',
            borderRadius: 999,
            fontFamily: 'monospace',
            letterSpacing: '1px',
            boxShadow: `0 0 30px ${BRAND_COLORS.blue}60`,
          }}
        >
          taga-askai.vercel.app
        </div>

        {/* Developer Credit */}
        <div
          style={{
            marginTop: 22,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            color: '#94A3B8',
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          <Img
            src={staticFile('doerrorin-logo.png')}
            style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'contain' }}
          />
          <span>Developed with pride by <strong style={{ color: '#FFFFFF' }}>DoError!n</strong></span>
        </div>
      </div>

      {/* Fade to Black */}
      {frame > 275 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#000000',
            opacity: fadeToBlack,
            zIndex: 100,
          }}
        />
      )}
    </div>
  );
};
