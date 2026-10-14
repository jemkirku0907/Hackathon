import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { BRAND_COLORS, LAYOUT } from '../../theme';
import { VOICEOVER_DATA } from '../../voiceover-timings';

interface KineticKaraokeProps {
  sceneId: string;
}

export const KineticKaraoke: React.FC<KineticKaraokeProps> = ({ sceneId }) => {
  const localFrame = useCurrentFrame();

  const scene = VOICEOVER_DATA.scenes.find((s) => s.id === sceneId);
  if (!scene || scene.words.length === 0) return null;

  // Global frame inside total composition
  const currentGlobalFrame = scene.startFrame + localFrame;

  // Determine which words to show (if multiple sentences, split or window them)
  const words = scene.words;

  // Don't show captions if scene just started or ended
  const sceneFade = interpolate(
    localFrame,
    [0, 8, scene.durationInFrames - 10, scene.durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 80,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 60,
        opacity: sceneFade,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px 12px',
          maxWidth: 1400,
          backgroundColor: 'rgba(7, 11, 20, 0.88)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          borderRadius: 20,
          padding: '14px 32px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75), 0 0 30px rgba(33, 173, 227, 0.15)',
        }}
      >
        {words.map((w, i) => {
          const isActive =
            currentGlobalFrame >= w.startFrame && currentGlobalFrame <= w.endFrame + 2;
          const isPast = currentGlobalFrame > w.endFrame + 2;

          return (
            <span
              key={i}
              style={{
                fontSize: 28,
                fontWeight: isActive ? 900 : 700,
                color: isActive
                  ? BRAND_COLORS.yellow
                  : isPast
                  ? '#FFFFFF'
                  : 'rgba(255, 255, 255, 0.42)',
                backgroundColor: isActive
                  ? 'rgba(255, 214, 10, 0.18)'
                  : 'transparent',
                borderRadius: 8,
                padding: '2px 8px',
                transform: isActive ? 'scale(1.08)' : 'scale(1)',
                transition: 'all 0.1s ease-out',
                textShadow: isActive
                  ? `0 0 16px ${BRAND_COLORS.yellowGlow}, 0 2px 8px rgba(0,0,0,0.8)`
                  : '0 2px 4px rgba(0,0,0,0.6)',
                fontFamily: LAYOUT.fontFamily,
                display: 'inline-block',
              }}
            >
              {w.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
