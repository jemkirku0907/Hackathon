import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { SPRINGS } from '../../theme';
import { VOICEOVER_DATA } from '../../voiceover-timings';

interface WhipPanWrapperProps {
  children: React.ReactNode;
  durationInFrames?: number;
  direction?: 'left' | 'right' | 'up';
  sceneId?: string;
}

export const WhipPanWrapper: React.FC<WhipPanWrapperProps> = ({
  children,
  durationInFrames: customDuration,
  direction = 'left',
  sceneId,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneDuration = sceneId
    ? VOICEOVER_DATA.scenes.find((s) => s.id === sceneId)?.durationInFrames
    : undefined;
  const durationInFrames = customDuration ?? sceneDuration ?? 150;

  // 1. Snappy entrance spring (0 -> 16 frames) with smooth settle
  const enterSpring = spring({
    frame,
    fps,
    config: SPRINGS.snappy,
  });

  const enterTranslateX =
    direction === 'left'
      ? interpolate(enterSpring, [0, 1], [320, 0])
      : interpolate(enterSpring, [0, 1], [-320, 0]);
  const enterScale = interpolate(enterSpring, [0, 1], [0.95, 1]);
  const enterBlur = interpolate(enterSpring, [0, 1], [8, 0]);
  const enterOpacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // 2. High-momentum exit whip (last 9 frames)
  const exitWindow = 9;
  const exitStart = Math.max(0, durationInFrames - exitWindow);
  const exitProgress = interpolate(
    frame,
    [exitStart, durationInFrames],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Smooth acceleration curve for exit whip
  const exitTranslateX =
    direction === 'left'
      ? -Math.pow(exitProgress, 2.2) * 900
      : Math.pow(exitProgress, 2.2) * 900;
  const exitBlur = exitProgress * 12;
  const exitOpacity = 1 - Math.pow(exitProgress, 1.8);

  const totalTranslateX = frame < 20 ? enterTranslateX : exitTranslateX;
  const totalScale = frame < 20 ? enterScale : 1 + exitProgress * 0.08;
  const totalBlur = frame < 20 ? enterBlur : exitBlur;
  const totalOpacity = frame < 20 ? enterOpacity : exitOpacity;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        transform: `translateX(${totalTranslateX}px) scale(${totalScale})`,
        filter: totalBlur > 0.5 ? `blur(${totalBlur}px)` : 'none',
        opacity: totalOpacity,
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
};
