import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { RefStyleCaption } from '../../components/RefStyleCaption';
import { FloatingParticles, BrandMotionRings, LightSweep } from '../../components/FloatingElements';
import { BRAND_COLORS } from '../../types';

export const LSScene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Converging trails
  const converge = interpolate(frame, [0, 35], [260, 0], { extrapolateRight: 'clamp' });
  const trailOpacity = interpolate(frame, [0, 20, 35, 45], [0, 0.85, 0.8, 0], { extrapolateRight: 'clamp' });

  // Logo spring
  const logoScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 11, mass: 0.8 },
  });

  const impactShake = frame >= 36 && frame <= 44 ? (frame % 2 === 0 ? 3 : -3) : 0;
  const impactFlash = interpolate(frame, [36, 42, 50], [0, 0.45, 0], { extrapolateRight: 'clamp' });

  const floatY = Math.sin(frame * 0.08) * 8;

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
      {/* Background Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 45%, #1E3A8A 0%, #090E1A 90%)',
        }}
      />
      <FloatingParticles count={26} color={BRAND_COLORS.cyan} seed={1} />
      <BrandMotionRings size={1100} color={BRAND_COLORS.blue} accentColor={BRAND_COLORS.yellow} />

      {/* Converging Light Trails */}
      {frame < 50 && (
        <>
          <div
            style={{
              position: 'absolute',
              width: 250,
              height: 3,
              background: `linear-gradient(to right, transparent, ${BRAND_COLORS.cyan}, transparent)`,
              top: `calc(50% - 150px - ${converge}px)`,
              left: `calc(50% - 250px - ${converge}px)`,
              transform: 'rotate(-30deg)',
              opacity: trailOpacity,
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 250,
              height: 3,
              background: `linear-gradient(to right, transparent, ${BRAND_COLORS.yellow}, transparent)`,
              top: `calc(50% - 150px - ${converge}px)`,
              right: `calc(50% - 250px - ${converge}px)`,
              transform: 'rotate(30deg)',
              opacity: trailOpacity,
            }}
          />
        </>
      )}

      {/* University Header */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '10px 26px',
          borderRadius: 999,
          zIndex: 20,
        }}
      >
        <Img
          src={staticFile('umak-seal.png')}
          style={{ width: 36, height: 36, objectFit: 'contain' }}
        />
        <span
          style={{
            color: '#FFFFFF',
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          University of Makati
        </span>
      </div>

      {/* Official Animated Logo Centerpiece */}
      <div
        style={{
          transform: `scale(${logoScale}) translateY(${floatY + impactShake}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        {/* Spotlight Halo */}
        <div
          style={{
            position: 'absolute',
            width: 800,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(200, 220, 255, 0.55) 40%, rgba(63, 86, 202, 0.25) 70%, transparent 85%)',
            filter: 'blur(50px)',
            zIndex: -1,
          }}
        />

        <div
          style={{
            position: 'relative',
            width: 760,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 25px 60px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 40px rgba(209, 202, 37, 0.4))',
          }}
        >
          <LightSweep startFrame={38} duration={32} color="rgba(255, 255, 255, 0.7)" />

          <Img
            src={staticFile('official-logo-transparent.png')}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 32,
            fontSize: 28,
            fontWeight: 800,
            color: BRAND_COLORS.yellow,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textShadow: `0 0 25px ${BRAND_COLORS.yellow}80`,
          }}
        >
          Your UMak AI Companion.
        </div>
      </div>

      {/* Cinematic Flash */}
      {impactFlash > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#FFFFFF',
            opacity: impactFlash,
            pointerEvents: 'none',
            zIndex: 100,
          }}
        />
      )}

      <RefStyleCaption
        title="Introducing TAGA-asK AI"
        subtitle="The verified AI knowledge assistant built exclusively for the University of Makati."
      />
    </div>
  );
};
