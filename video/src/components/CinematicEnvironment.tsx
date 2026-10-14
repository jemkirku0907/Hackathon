import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND_COLORS } from '../theme';

interface CinematicEnvironmentProps {
  children: React.ReactNode;
  primaryGlow?: string;
  secondaryGlow?: string;
  cameraMove?: 'pushIn' | 'panRight' | 'subtleTilt' | 'none';
  durationInFrames?: number;
}

export const CinematicEnvironment: React.FC<CinematicEnvironmentProps> = ({
  children,
  primaryGlow = BRAND_COLORS.blue,
  secondaryGlow = BRAND_COLORS.yellow,
  cameraMove = 'pushIn',
  durationInFrames = 150,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Slow continuous camera motion (No static scenes!)
  let cameraTransform = 'scale(1)';
  if (cameraMove === 'pushIn') {
    const scale = interpolate(frame, [0, durationInFrames], [1, 1.045], {
      extrapolateRight: 'clamp',
    });
    cameraTransform = `scale(${scale})`;
  } else if (cameraMove === 'panRight') {
    const scale = interpolate(frame, [0, durationInFrames], [1, 1.03], {
      extrapolateRight: 'clamp',
    });
    const x = interpolate(frame, [0, durationInFrames], [0, -18], {
      extrapolateRight: 'clamp',
    });
    cameraTransform = `scale(${scale}) translateX(${x}px)`;
  } else if (cameraMove === 'subtleTilt') {
    const scale = interpolate(frame, [0, durationInFrames], [1, 1.04], {
      extrapolateRight: 'clamp',
    });
    const rot = interpolate(frame, [0, durationInFrames], [-0.5, 0.6], {
      extrapolateRight: 'clamp',
    });
    cameraTransform = `scale(${scale}) rotate(${rot}deg)`;
  }

  // Floating ambient dust particles (precalculated pseudo-random)
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      x: ((i * 79 + 33) % 100),
      yBase: ((i * 47 + 19) % 100),
      size: 2 + (i % 3) * 1.5,
      speed: 0.15 + (i % 5) * 0.08,
      opacity: 0.2 + (i % 4) * 0.15,
      color: i % 3 === 0 ? BRAND_COLORS.yellow : BRAND_COLORS.cyan,
    }));
  }, []);

  // Breathing glowing orbs
  const orb1X = Math.sin(frame * 0.02) * 50;
  const orb1Y = Math.cos(frame * 0.025) * 35;
  const orb2X = Math.cos(frame * 0.018) * 60;
  const orb2Y = Math.sin(frame * 0.022) * 40;

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        backgroundColor: '#070B14',
        overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* 1. BACKGROUND DEPTH LAYER */}
      <div
        style={{
          position: 'absolute',
          inset: -40,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {/* Subtle Perspective Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(rgba(63, 86, 202, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(63, 86, 202, 0.06) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            opacity: 0.7,
            transform: 'perspective(1000px) rotateX(25deg) scale(1.15)',
            transformOrigin: 'center 40%',
          }}
        />

        {/* Breathing Primary Glow Orb */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '25%',
            width: 750,
            height: 750,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${primaryGlow}45 0%, ${primaryGlow}15 45%, transparent 70%)`,
            filter: 'blur(90px)',
            transform: `translate(${orb1X}px, ${orb1Y}px)`,
          }}
        />

        {/* Breathing Secondary Glow Orb */}
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            right: '20%',
            width: 650,
            height: 650,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${secondaryGlow}35 0%, ${secondaryGlow}10 45%, transparent 70%)`,
            filter: 'blur(90px)',
            transform: `translate(${orb2X}px, ${orb2Y}px)`,
          }}
        />

        {/* Drifting Micro-Particles */}
        {particles.map((p, idx) => {
          const y = (p.yBase - frame * p.speed) % 100;
          const positiveY = y < 0 ? y + 100 : y;
          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: `${p.x}%`,
                top: `${positiveY}%`,
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                backgroundColor: p.color,
                boxShadow: `0 0 10px ${p.color}`,
                opacity: p.opacity,
              }}
            />
          );
        })}
      </div>

      {/* 2. CAMERA WRAPPER (Midground & Scene Elements) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: cameraTransform,
          transformOrigin: 'center center',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>

      {/* 3. POST-PROCESSING OVERLAYS (Vignette & Film Texture) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at center, transparent 40%, rgba(5, 8, 16, 0.65) 85%, rgba(3, 5, 10, 0.95) 100%)',
          pointerEvents: 'none',
          zIndex: 80,
        }}
      />
    </div>
  );
};
