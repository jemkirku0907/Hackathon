import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND_COLORS } from '../types';

interface MasterSubtitleOverlayProps {
  text: string;
  badge?: string;
  accentColor?: string;
  isLandscape?: boolean;
}

export const MasterSubtitleOverlay: React.FC<MasterSubtitleOverlayProps> = ({
  text,
  badge,
  accentColor = BRAND_COLORS.yellow,
  isLandscape = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const translateY = interpolate(entrance, [0, 1], [25, 0]);

  // Size targets based on prompt:
  // Vertical (1080x1920): 52-68px subtitles, badges 24-28px
  // Landscape (1920x1080): 32-38px subtitles, badges 18-22px
  const fontSize = isLandscape ? 34 : 52;
  const badgeSize = isLandscape ? 20 : 26;
  const bottomMargin = isLandscape ? 40 : 130; // Elevated to avoid Reels UI overlay
  const maxWidth = isLandscape ? 1400 : 960;
  const padding = isLandscape ? '16px 36px' : '22px 42px';

  return (
    <div
      style={{
        position: 'absolute',
        bottom: bottomMargin,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 40px',
        opacity,
        transform: `translateY(${translateY}px)`,
        zIndex: 60,
        pointerEvents: 'none',
      }}
    >
      {badge && (
        <div
          style={{
            backgroundColor: 'rgba(9, 14, 26, 0.92)',
            border: `2px solid ${accentColor}`,
            color: accentColor,
            fontSize: badgeSize,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            padding: isLandscape ? '6px 20px' : '8px 26px',
            borderRadius: 999,
            marginBottom: isLandscape ? 12 : 16,
            boxShadow: `0 0 25px ${accentColor}50`,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {badge}
        </div>
      )}
      <div
        style={{
          backgroundColor: 'rgba(9, 14, 26, 0.94)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.16)',
          borderRadius: isLandscape ? 20 : 26,
          padding,
          textAlign: 'center',
          maxWidth,
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 40px rgba(0, 0, 0, 0.5)',
        }}
      >
        <p
          style={{
            margin: 0,
            color: '#FFFFFF',
            fontSize,
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: '-0.5px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
};
