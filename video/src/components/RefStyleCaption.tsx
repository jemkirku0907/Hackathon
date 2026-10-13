import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface RefStyleCaptionProps {
  title: string;
  subtitle: string;
}

export const RefStyleCaption: React.FC<RefStyleCaptionProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = interpolate(frame, [0, 8], [15, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 50,
        left: 60,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: '16px 26px',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        opacity,
        transform: `translateY(${translateY}px)`,
        zIndex: 100,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        maxWidth: 580,
      }}
    >
      <div
        style={{
          color: '#0F172A',
          fontSize: 22,
          fontWeight: 800,
          lineHeight: 1.25,
          letterSpacing: '-0.3px',
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: '#64748B',
          fontSize: 15,
          fontWeight: 500,
          marginTop: 4,
          lineHeight: 1.3,
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};
