import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND_COLORS, LAYOUT } from '../../theme';

interface HudOverlayProps {
  label: string;
  sublabel?: string;
  globalFrameOffset?: number;
}

export const HudOverlay: React.FC<HudOverlayProps> = ({
  label,
  sublabel = 'OFFICIAL UMAK AI ASSISTANT',
  globalFrameOffset = 0,
}) => {
  const localFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const totalFrame = localFrame + globalFrameOffset;

  // Format timecode: MM:SS:FF
  const totalSeconds = totalFrame / fps;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const frames = Math.floor(totalFrame % fps);
  const timecodeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${frames.toString().padStart(2, '0')}`;

  // Subtle breathing opacity for technical crosshairs
  const gridOpacity = interpolate(
    Math.sin(totalFrame * 0.05),
    [-1, 1],
    [0.12, 0.18]
  );

  const bracketLength = 24;
  const bracketThickness = 2;
  const margin = 64;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
        fontFamily: LAYOUT.codeFont,
      }}
    >
      {/* 1. Crosshair technical grid background (+ marks) */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: gridOpacity,
        }}
      >
        <defs>
          <pattern
            id="v3-cross-grid"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            {/* Crosshair + */}
            <line x1="56" y1="60" x2="64" y2="60" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="60" y1="56" x2="60" y2="64" stroke="#FFFFFF" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#v3-cross-grid)" />
      </svg>

      {/* 2. Four Viewport Framing Brackets [ ┌ ┐ └ ┘ ] */}
      {/* Top Left */}
      <div
        style={{
          position: 'absolute',
          top: margin,
          left: margin,
          width: bracketLength,
          height: bracketLength,
          borderTop: `${bracketThickness}px solid rgba(255, 255, 255, 0.45)`,
          borderLeft: `${bracketThickness}px solid rgba(255, 255, 255, 0.45)`,
        }}
      />
      {/* Top Right */}
      <div
        style={{
          position: 'absolute',
          top: margin,
          right: margin,
          width: bracketLength,
          height: bracketLength,
          borderTop: `${bracketThickness}px solid rgba(255, 255, 255, 0.45)`,
          borderRight: `${bracketThickness}px solid rgba(255, 255, 255, 0.45)`,
        }}
      />
      {/* Bottom Left */}
      <div
        style={{
          position: 'absolute',
          bottom: margin,
          left: margin,
          width: bracketLength,
          height: bracketLength,
          borderBottom: `${bracketThickness}px solid rgba(255, 255, 255, 0.45)`,
          borderLeft: `${bracketThickness}px solid rgba(255, 255, 255, 0.45)`,
        }}
      />
      {/* Bottom Right */}
      <div
        style={{
          position: 'absolute',
          bottom: margin,
          right: margin,
          width: bracketLength,
          height: bracketLength,
          borderBottom: `${bracketThickness}px solid rgba(255, 255, 255, 0.45)`,
          borderRight: `${bracketThickness}px solid rgba(255, 255, 255, 0.45)`,
        }}
      />

      {/* 3. Top Left HUD Micro-Label */}
      <div
        style={{
          position: 'absolute',
          top: margin + 4,
          left: margin + 36,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span
          style={{
            color: BRAND_COLORS.cyan,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            textShadow: `0 0 12px ${BRAND_COLORS.cyanGlow}`,
          }}
        >
          [ {label} ]
        </span>
        <span
          style={{
            color: 'rgba(255, 255, 255, 0.35)',
            fontSize: 12,
            letterSpacing: '1.5px',
          }}
        >
          / {sublabel}
        </span>
      </div>

      {/* 4. Top Right HUD Timecode & Live Frame Counter */}
      <div
        style={{
          position: 'absolute',
          top: margin + 4,
          right: margin + 36,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 6,
            padding: '3px 10px',
            color: '#FFFFFF',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '1px',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: BRAND_COLORS.red,
              boxShadow: `0 0 8px ${BRAND_COLORS.red}`,
            }}
          />
          REC
        </span>
        <span
          style={{
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: '1px',
          }}
        >
          TAGA-asK AI · {timecodeStr} / 00:57.00
        </span>
        <span
          style={{
            color: BRAND_COLORS.yellow,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          F{totalFrame.toString().padStart(4, '0')}
        </span>
      </div>

      {/* 5. Bottom Status Ticks */}
      <div
        style={{
          position: 'absolute',
          bottom: margin + 6,
          left: margin + 36,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          color: 'rgba(255, 255, 255, 0.35)',
          fontSize: 11,
          letterSpacing: '1.5px',
        }}
      >
        <span>1080P 60FPS TARGET</span>
        <span>•</span>
        <span>UMAK VERIFIED DATA RAG</span>
        <span>•</span>
        <span>RATE LIMIT: 15 REQ/MIN</span>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: margin + 6,
          right: margin + 36,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: 'rgba(255, 255, 255, 0.35)',
          fontSize: 11,
          letterSpacing: '1.5px',
        }}
      >
        <span>SECURE GATEWAY</span>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: BRAND_COLORS.green,
            boxShadow: `0 0 8px ${BRAND_COLORS.green}`,
          }}
        />
      </div>
    </div>
  );
};
