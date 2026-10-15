import React from 'react';
import { BRAND_COLORS, LAYOUT } from '../../theme';

interface BentoCardProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  badge?: string;
  badgeColor?: string;
  glowColor?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  width,
  height,
  style,
  glowColor = BRAND_COLORS.blueGlow,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        backgroundColor: 'rgba(11, 18, 38, 0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.16)',
        borderRadius: 24,
        padding: 24,
        boxShadow: `0 20px 50px rgba(0, 0, 0, 0.75), 0 0 35px ${glowColor}`,
        overflow: 'hidden',
        fontFamily: LAYOUT.fontFamily,
        ...style,
      }}
    >
      {/* Sleek top ambient edge light */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent)',
          pointerEvents: 'none',
        }}
      />
      {children}
    </div>
  );
};
