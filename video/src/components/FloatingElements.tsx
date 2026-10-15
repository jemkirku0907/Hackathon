import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND_COLORS } from '../types';

/**
 * Ambient floating glowing particles with sine oscillation and smooth opacity.
 */
export const FloatingParticles: React.FC<{
  count?: number;
  color?: string;
  seed?: number;
}> = ({ count = 18, color = BRAND_COLORS.cyan, seed = 1 }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
      {Array.from({ length: count }).map((_, i) => {
        const baseAngle = ((i * 137.5 + seed * 45) * Math.PI) / 180;
        const radius = 180 + ((i * 47) % 380);
        const speed = 0.02 + ((i % 5) * 0.008);
        const size = 3 + (i % 6);
        const xOffset = Math.cos(frame * speed + baseAngle) * (30 + (i % 25));
        const yOffset = Math.sin(frame * speed * 0.8 + baseAngle) * (40 + (i % 35));
        const opacity = interpolate(
          Math.sin(frame * 0.05 + i),
          [-1, 1],
          [0.15, 0.75]
        );

        const leftPct = ((i * 23 + seed * 19) % 90) + 5;
        const topPct = ((i * 31 + seed * 13) % 90) + 5;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${leftPct}%`,
              top: `${topPct}%`,
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: i % 3 === 0 ? BRAND_COLORS.yellow : color,
              boxShadow: `0 0 ${size * 3}px ${i % 3 === 0 ? BRAND_COLORS.yellow : color}`,
              transform: `translate(${xOffset}px, ${yOffset}px)`,
              opacity,
            }}
          />
        );
      })}
    </div>
  );
};

/**
 * Concentric branded protective / cinematic energy rings that pulse and rotate.
 */
export const BrandMotionRings: React.FC<{
  centerX?: string | number;
  centerY?: string | number;
  size?: number;
  color?: string;
  accentColor?: string;
}> = ({
  centerX = '50%',
  centerY = '50%',
  size = 600,
  color = BRAND_COLORS.blue,
  accentColor = BRAND_COLORS.yellow,
}) => {
  const frame = useCurrentFrame();
  const rotate1 = (frame * 0.4) % 360;
  const rotate2 = -(frame * 0.3) % 360;
  const pulse = interpolate(Math.sin(frame * 0.06), [-1, 1], [0.94, 1.06]);

  return (
    <div
      style={{
        position: 'absolute',
        left: centerX,
        top: centerY,
        width: size,
        height: size,
        transform: `translate(-50%, -50%) scale(${pulse})`,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Outer segmented ring */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: `1.5px dashed ${color}45`,
          transform: `rotate(${rotate1}deg)`,
        }}
      />
      {/* Middle glowing solid ring */}
      <div
        style={{
          position: 'absolute',
          inset: size * 0.12,
          borderRadius: '50%',
          border: `2px solid ${color}35`,
          boxShadow: `0 0 35px ${color}25, inset 0 0 35px ${color}20`,
        }}
      />
      {/* Inner fast accent ring */}
      <div
        style={{
          position: 'absolute',
          inset: size * 0.26,
          borderRadius: '50%',
          border: `1.5px dotted ${accentColor}50`,
          transform: `rotate(${rotate2}deg)`,
        }}
      />
    </div>
  );
};

/**
 * Floating PDF Document Source Card representing UMak official knowledge sources.
 */
export const FloatingDocCard: React.FC<{
  title: string;
  sourceCode: string;
  pages: string;
  x: number;
  y: number;
  rotation?: number;
  delay?: number;
  scale?: number;
}> = ({ title, sourceCode, pages, x, y, rotation = 0, delay = 0, scale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 13, mass: 0.8 },
  });

  const floatY = Math.sin((frame + delay * 5) * 0.05) * 9;
  const floatRotate = rotation + Math.cos((frame + delay * 5) * 0.04) * 2;

  if (frame < delay) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${entrance * scale}) translateY(${floatY}px) rotate(${floatRotate}deg)`,
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(16px)',
        border: '1.5px solid rgba(255, 255, 255, 0.16)',
        borderRadius: 18,
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.65), 0 0 25px rgba(63, 86, 202, 0.25)',
        zIndex: 15,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          backgroundColor: 'rgba(236, 32, 43, 0.2)',
          border: '1px solid rgba(236, 32, 43, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
        }}
      >
        📄
      </div>
      <div>
        <div style={{ color: '#F8FAFC', fontSize: 16, fontWeight: 800 }}>{title}</div>
        <div style={{ color: '#94A3B8', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
          <span style={{ color: BRAND_COLORS.yellow, fontWeight: 700 }}>{sourceCode}</span>
          <span>•</span>
          <span>{pages}</span>
        </div>
      </div>
      <div
        style={{
          backgroundColor: 'rgba(34, 197, 94, 0.15)',
          border: '1px solid #22C55E',
          color: '#4ADE80',
          fontSize: 11,
          fontWeight: 800,
          padding: '3px 8px',
          borderRadius: 6,
          letterSpacing: '0.5px',
        }}
      >
        VERIFIED
      </div>
    </div>
  );
};

/**
 * Reusable light sweep highlight effect for cards, wordmarks, and citation highlights.
 */
export const LightSweep: React.FC<{
  startFrame: number;
  duration?: number;
  color?: string;
}> = ({ startFrame, duration = 30, color = 'rgba(255, 255, 255, 0.5)' }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, startFrame + duration], [-100, 220], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (frame < startFrame || frame > startFrame + duration + 5) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: `${progress}%`,
        width: '35%',
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        transform: 'skewX(-25deg)',
        pointerEvents: 'none',
        zIndex: 20,
      }}
    />
  );
};
