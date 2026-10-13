import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { BRAND_COLORS } from '../types';

interface SubtitleOverlayProps {
  text: string;
  badge?: string;
  accentColor?: string;
}

export const SubtitleOverlay: React.FC<SubtitleOverlayProps> = ({
  text,
  badge,
  accentColor = BRAND_COLORS.yellow,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = interpolate(frame, [0, 10], [20, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 110,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 60px',
        opacity,
        transform: `translateY(${translateY}px)`,
        zIndex: 50,
      }}
    >
      {badge && (
        <div
          style={{
            backgroundColor: `${accentColor}25`,
            border: `2px solid ${accentColor}`,
            color: accentColor,
            fontSize: 24,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            padding: '8px 24px',
            borderRadius: 999,
            marginBottom: 16,
            boxShadow: `0 0 20px ${accentColor}40`,
          }}
        >
          {badge}
        </div>
      )}
      <div
        style={{
          backgroundColor: 'rgba(9, 14, 26, 0.88)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 24,
          padding: '20px 36px',
          textAlign: 'center',
          maxWidth: 960,
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        }}
      >
        <p
          style={{
            margin: 0,
            color: '#FFFFFF',
            fontSize: 34,
            fontWeight: 700,
            lineHeight: 1.35,
            letterSpacing: '-0.5px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
};
