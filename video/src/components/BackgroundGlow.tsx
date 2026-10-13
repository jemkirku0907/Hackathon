import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { BRAND_COLORS } from '../types';

export const BackgroundGlow: React.FC<{ primaryColor?: string; secondaryColor?: string }> = ({
  primaryColor = BRAND_COLORS.blue,
  secondaryColor = BRAND_COLORS.cyan,
}) => {
  const frame = useCurrentFrame();

  const pulse = interpolate(Math.sin(frame / 20), [-1, 1], [0.8, 1.2]);
  const rotate = (frame * 0.4) % 360;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#070B14',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {/* Dynamic Radial Orb 1 */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${primaryColor}40 0%, transparent 70%)`,
          filter: 'blur(90px)',
          transform: `scale(${pulse}) rotate(${rotate}deg)`,
          opacity: 0.75,
        }}
      />

      {/* Dynamic Radial Orb 2 */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '5%',
          width: 650,
          height: 650,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${secondaryColor}35 0%, transparent 70%)`,
          filter: 'blur(80px)',
          transform: `scale(${2 - pulse})`,
          opacity: 0.65,
        }}
      />

      {/* Subtle Grid Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px)',
          backgroundSize: '48px 48px',
          opacity: 0.4,
        }}
      />
    </div>
  );
};
