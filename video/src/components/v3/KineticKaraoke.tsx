import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { BRAND_COLORS, LAYOUT } from '../../theme';
import { TimedWord, VOICEOVER_DATA } from '../../voiceover-timings';

interface KineticKaraokeProps {
  sceneId: string;
}

export const KineticKaraoke: React.FC<KineticKaraokeProps> = ({ sceneId }) => {
  const localFrame = useCurrentFrame();

  const scene = VOICEOVER_DATA.scenes.find((s) => s.id === sceneId);
  if (!scene || scene.words.length === 0) return null;

  const currentGlobalFrame = scene.startFrame + localFrame;

  // Split words into sentence chunks by terminal punctuation (. ? !)
  const sentenceGroups: TimedWord[][] = [];
  let currentGroup: TimedWord[] = [];
  for (const w of scene.words) {
    currentGroup.push(w);
    if (w.word.endsWith('.') || w.word.endsWith('?') || w.word.endsWith('!')) {
      sentenceGroups.push(currentGroup);
      currentGroup = [];
    }
  }
  if (currentGroup.length > 0) {
    sentenceGroups.push(currentGroup);
  }

  // Find active sentence group based on global frame
  let activeGroup = sentenceGroups[0];
  for (let i = 0; i < sentenceGroups.length; i++) {
    const group = sentenceGroups[i];
    const nextGroup = sentenceGroups[i + 1];
    const groupStart = i === 0 ? 0 : group[0].startFrame;
    const groupEnd = nextGroup ? nextGroup[0].startFrame : Infinity;

    if (currentGlobalFrame >= groupStart && currentGlobalFrame < groupEnd) {
      activeGroup = group;
      break;
    }
  }

  // Fade out slightly at very start and very end of scene
  const sceneFade = interpolate(
    localFrame,
    [0, 6, scene.durationInFrames - 8, scene.durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 70,
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
          maxWidth: 1350,
          backgroundColor: 'rgba(7, 11, 22, 0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1.5px solid rgba(255, 255, 255, 0.16)',
          borderRadius: 22,
          padding: '14px 36px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85), 0 0 35px rgba(33, 173, 227, 0.2)',
        }}
      >
        {activeGroup.map((w, i) => {
          const isActive =
            currentGlobalFrame >= w.startFrame && currentGlobalFrame <= w.endFrame + 2;
          const isPast = currentGlobalFrame > w.endFrame + 2;

          return (
            <span
              key={`${w.word}-${w.startFrame}-${i}`}
              style={{
                fontSize: 32,
                fontWeight: isActive ? 900 : 700,
                color: isActive
                  ? BRAND_COLORS.yellow
                  : isPast
                  ? '#FFFFFF'
                  : 'rgba(255, 255, 255, 0.42)',
                backgroundColor: isActive
                  ? 'rgba(244, 235, 42, 0.18)'
                  : 'transparent',
                borderRadius: 8,
                padding: '2px 8px',
                transform: isActive ? 'scale(1.08)' : 'scale(1)',
                textShadow: isActive
                  ? `0 0 20px ${BRAND_COLORS.yellow}, 0 2px 10px rgba(0,0,0,0.9)`
                  : '0 2px 4px rgba(0,0,0,0.6)',
                fontFamily: LAYOUT.fontFamily,
                display: 'inline-block',
                letterSpacing: '-0.3px',
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
