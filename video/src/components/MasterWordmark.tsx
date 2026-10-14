import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND_COLORS } from '../types';
import { LightSweep } from './FloatingElements';

interface MasterWordmarkProps {
  scale?: number;
  showTagline?: boolean;
  isLandscape?: boolean;
}

export const MasterWordmark: React.FC<MasterWordmarkProps> = ({
  scale = 1.0,
  showTagline = true,
  isLandscape = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle, polished reveal of the official logo
  const logoSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const logoScale = interpolate(logoSpring, [0, 1], [0.88, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // Soft atmospheric spotlight bloom behind the official logo
  const glowOpacity = interpolate(frame, [0, 30], [0, 0.75], { extrapolateRight: 'clamp' });

  // Tagline reveal (clean, restrained)
  const taglineSpring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 14, mass: 0.8 },
  });
  const taglineY = interpolate(taglineSpring, [0, 1], [18, 0]);

  const logoWidth = isLandscape ? 700 : 760;
  const tagSize = isLandscape ? 28 : 34;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${scale})`,
        position: 'relative',
        zIndex: 20,
      }}
    >
      {/* Soft radial spotlight behind logo */}
      <div
        style={{
          position: 'absolute',
          width: isLandscape ? 750 : 800,
          height: isLandscape ? 450 : 500,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(200, 220, 255, 0.45) 40%, rgba(63, 86, 202, 0.2) 70%, transparent 85%)',
          filter: 'blur(55px)',
          opacity: glowOpacity,
          zIndex: -1,
        }}
      />

      {/* Authentic Official Logo (Exact Wordmark & Heron Mascot) */}
      <div
        style={{
          position: 'relative',
          width: logoWidth,
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          filter: 'drop-shadow(0 20px 45px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 30px rgba(209, 202, 37, 0.35))',
        }}
      >
        {/* Subtle, elegant light sweep across the official wordmark */}
        <LightSweep startFrame={32} duration={30} color="rgba(255, 255, 255, 0.7)" />

        <Img
          src={staticFile('official-logo-transparent.png')}
          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
        />
      </div>

      {/* Official Tagline */}
      {showTagline && (
        <div
          style={{
            marginTop: isLandscape ? 24 : 32,
            textAlign: 'center',
            opacity: taglineSpring,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          <div
            style={{
              fontSize: tagSize,
              fontWeight: 800,
              color: BRAND_COLORS.yellow,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textShadow: `0 0 25px ${BRAND_COLORS.yellow}70`,
              fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
            }}
          >
            Your UMak AI Companion
          </div>
        </div>
      )}
    </div>
  );
};
