import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { SPRINGS } from '../../theme';

interface WhipPanWrapperProps {
  children: React.ReactNode;
  durationInFrames: number;
  direction?: 'left' | 'right' | 'up';
}

export const WhipPanWrapper: React.FC<WhipPanWrapperProps> = ({
  children,
  durationInFrames,
  direction = 'left',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Snappy entrance spring (0 -> 14 frames)
  const enterSpring = spring({
    frame,
    fps,
    config: SPRINGS.snappy,
  });

  const enterTranslateX =
    direction === 'left'
      ? interpolate(enterSpring, [0, 1], [300, 0])
      : interpolate(enterSpring, [0, 1], [-300, 0]);
  const enterScale = interpolate(enterSpring, [0, 1], [0.94, 1]);
  const enterBlur = interpolate(enterSpring, [0, 1], [10, 0]);
  const enterOpacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // 2. High-momentum exit whip (last 8 frames)
  const exitWindow = 8;
  const exitStart = Math.max(0, durationInFrames - exitWindow);
  const exitProgress = interpolate(
    frame,
    [exitStart, durationInFrames],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Exponential acceleration curve for exit whip
  const exitTranslateX =
    direction === 'left'
      ? -Math.pow(exitProgress, 2.5) * 850
      : Math.pow(exitProgress, 2.5) * 850;
  const exitBlur = exitProgress * 16;
  const exitOpacity = 1 - Math.pow(exitProgress, 2);

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
