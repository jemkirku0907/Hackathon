import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface AnimatedCursorProps {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  startFrame: number;
  endFrame: number;
  clickFrame?: number;
}

export const AnimatedCursor: React.FC<AnimatedCursorProps> = ({
  startX,
  startY,
  targetX,
  targetY,
  startFrame,
  endFrame,
  clickFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth position interpolation
  const currentX = interpolate(frame, [startFrame, endFrame], [startX, targetX], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const currentY = interpolate(frame, [startFrame, endFrame], [startY, targetY], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Click pulse animation
  const isClicking = clickFrame && Math.abs(frame - clickFrame) < 8;
  const clickScale = isClicking ? 0.85 : 1.0;

  // Click ripple effect
  const rippleProgress = clickFrame
    ? interpolate(frame, [clickFrame, clickFrame + 18], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: currentX,
        top: currentY,
        transform: `translate(-2px, -2px) scale(${clickScale})`,
        zIndex: 9999,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.6))',
      }}
    >
      {/* Click ripple */}
      {clickFrame && frame >= clickFrame && frame <= clickFrame + 18 && (
        <div
          style={{
            position: 'absolute',
            top: 2,
            left: 2,
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '2.5px solid #38BDF8',
            transform: `translate(-50%, -50%) scale(${1 + rippleProgress * 1.5})`,
            opacity: 1 - rippleProgress,
          }}
        />
      )}

      {/* SVG macOS / Desktop Pointer Cursor */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 3L10.07 20.97L13.58 13.58L20.97 10.07L3 3Z"
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
