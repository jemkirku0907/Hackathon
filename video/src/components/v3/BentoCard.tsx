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
  badge,
  badgeColor = BRAND_COLORS.cyan,
  glowColor = BRAND_COLORS.blueGlow,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        backgroundColor: 'rgba(11, 18, 38, 0.86)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.16)',
        borderRadius: 24,
        padding: 24,
        boxShadow: `0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px ${glowColor}`,
        overflow: 'hidden',
        fontFamily: LAYOUT.fontFamily,
        ...style,
      }}
    >
      {/* Corner bracket accents */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          width: 8,
          height: 8,
          borderTop: '1.5px solid rgba(255, 255, 255, 0.4)',
          borderLeft: '1.5px solid rgba(255, 255, 255, 0.4)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          width: 8,
          height: 8,
          borderTop: '1.5px solid rgba(255, 255, 255, 0.4)',
          borderRight: '1.5px solid rgba(255, 255, 255, 0.4)',
          pointerEvents: 'none',
        }}
      />

      {/* Optional Top Badge */}
      {badge && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: `1px solid ${badgeColor}50`,
            borderRadius: 999,
            padding: '4px 14px',
            marginBottom: 16,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: badgeColor,
              boxShadow: `0 0 8px ${badgeColor}`,
            }}
          />
          <span
            style={{
              color: '#FFFFFF',
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              fontFamily: LAYOUT.codeFont,
            }}
          >
            {badge}
          </span>
        </div>
      )}

      {children}
    </div>
  );
};
