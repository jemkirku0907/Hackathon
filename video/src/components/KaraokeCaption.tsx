import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND_COLORS, SPRINGS } from '../theme';
import { SCENE_CAPTIONS, CaptionPhrase } from '../captions';

interface KaraokeCaptionProps {
  sceneKey: string;
}

export const KaraokeCaption: React.FC<KaraokeCaptionProps> = ({ sceneKey }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phrases = SCENE_CAPTIONS[sceneKey] || [];

  const currentPhrase: CaptionPhrase | undefined = phrases.find(
    (p) => frame >= p.startFrame && frame < p.endFrame
  ) || phrases[phrases.length - 1];

  if (!currentPhrase) return null;

  // Entrance spring for current phrase pill
  const pillSpring = spring({
    frame: frame - currentPhrase.startFrame,
    fps,
    config: SPRINGS.snappy,
  });

  const tagLineSpring = spring({
    frame: frame - currentPhrase.startFrame - 4,
    fps,
    config: SPRINGS.smooth,
  });

  const translateY = interpolate(pillSpring, [0, 1], [30, 0]);
  const opacity = interpolate(pillSpring, [0, 1], [0, 1]);

  const badgeColor = currentPhrase.badgeColor || BRAND_COLORS.yellow;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 60,
        left: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 90,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          transform: `translateY(${translateY}px)`,
          opacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          maxWidth: 1560,
        }}
      >
        {/* Animated Section Tag with Line Draw */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            opacity: tagLineSpring,
          }}
        >
          {/* Animated line draw left */}
          <div
            style={{
              width: interpolate(tagLineSpring, [0, 1], [0, 32]),
              height: 2,
              backgroundColor: badgeColor,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: badgeColor,
              textShadow: `0 0 12px ${badgeColor}60`,
            }}
          >
            {currentPhrase.badge}
          </div>
          {/* Animated line draw right */}
          <div
            style={{
              width: interpolate(tagLineSpring, [0, 1], [0, 32]),
              height: 2,
              backgroundColor: badgeColor,
              borderRadius: 2,
            }}
          />
        </div>

        {/* High Contrast Glass Capsule */}
        <div
          style={{
            backgroundColor: 'rgba(9, 14, 26, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(255, 255, 255, 0.16)',
            boxShadow:
              '0 20px 50px rgba(0, 0, 0, 0.75), 0 0 30px rgba(63, 86, 202, 0.25)',
            borderRadius: 24,
            padding: '16px 36px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px 12px',
            textAlign: 'center',
            maxWidth: 1480,
          }}
        >
          {currentPhrase.words.map((item, idx) => {
            const isActive = frame >= item.start && frame <= item.end;
            const hasPassed = frame > item.end;

            let textColor = 'rgba(255, 255, 255, 0.38)';
            let fontWeight = 600;
            let transform = 'scale(1)';
            let textShadow = 'none';

            if (isActive) {
              textColor = BRAND_COLORS.yellow;
              fontWeight = 800;
              transform = 'scale(1.08)';
              textShadow = `0 0 20px ${BRAND_COLORS.yellow}90, 0 2px 10px rgba(0,0,0,0.8)`;
            } else if (hasPassed) {
              textColor = '#FFFFFF';
              fontWeight = 700;
            }

            return (
              <span
                key={`${item.word}-${idx}`}
                style={{
                  fontSize: 40,
                  fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
                  color: textColor,
                  fontWeight,
                  transform,
                  textShadow,
                  marginRight: 10,
                  display: 'inline-block',
                  lineHeight: 1.3,
                }}
              >
                {item.word}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
