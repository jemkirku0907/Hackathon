import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicEnvironment } from '../../components/CinematicEnvironment';
import { KineticKaraoke } from '../../components/v3/KineticKaraoke';
import { BRAND_COLORS, SPRINGS } from '../../theme';

export const Scene7OutroV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance of big brand lockup
  const brandSpring = spring({ frame: frame - 6, fps, config: SPRINGS.snappy });
  const brandScale = interpolate(brandSpring, [0, 1], [0.9, 1]);
  const brandOpacity = interpolate(brandSpring, [0, 1], [0, 1]);

  // 2. Tagline entrance
  const taglineSpring = spring({ frame: frame - 25, fps, config: SPRINGS.smooth });

  // 3. CTA URL Pill entrance
  const ctaSpring = spring({ frame: frame - 55, fps, config: SPRINGS.bouncy });

  // 4. Cursor movement and click on CTA pill (frames 110 -> 180)
  const cursorX = interpolate(frame, [110, 145], [1400, 960], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cursorY = interpolate(frame, [110, 145], [850, 715], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cursorClick = interpolate(frame, [145, 150, 160], [1, 0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Ripple wave after click
  const rippleScale = interpolate(frame, [150, 195], [0.8, 2.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rippleOpacity = interpolate(frame, [150, 160, 195], [0, 0.8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 5. Final fade to black (frames 235 -> 255)
  const fadeOut = interpolate(frame, [235, 255], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <CinematicEnvironment
      primaryGlow={BRAND_COLORS.blue}
      secondaryGlow={BRAND_COLORS.yellow}
      cameraMove="subtleTilt"
      durationInFrames={255}
    >
      {/* Main Closing Brand Center Stage */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${brandScale})`,
          opacity: brandOpacity,
          zIndex: 30,
          marginTop: -20,
        }}
      >
        {/* Yellow radial glow behind brand */}
        <div
          style={{
            position: 'absolute',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${BRAND_COLORS.yellow}35 0%, ${BRAND_COLORS.blue}20 50%, transparent 75%)`,
            filter: 'blur(80px)',
            zIndex: -1,
          }}
        />

        {/* Official Full Transparent Logo */}
        <div
          style={{
            marginBottom: 24,
            filter:
              'drop-shadow(0 0 2px #FFFFFF) drop-shadow(0 0 8px #21ADE3) drop-shadow(0 0 30px rgba(33, 173, 227, 0.8)) drop-shadow(0 15px 35px rgba(0,0,0,0.95))',
          }}
        >
          <Img
            src={staticFile('official-logo-transparent.png')}
            style={{
              height: 240,
              width: 'auto',
              display: 'block',
            }}
          />
        </div>

        {/* High-Contrast Italic Serif Tagline */}
        <div
          style={{
            transform: `translateY(${interpolate(taglineSpring, [0, 1], [30, 0])}px)`,
            opacity: taglineSpring,
            textAlign: 'center',
            marginBottom: 36,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontStyle: 'italic',
              fontWeight: 500,
              fontFamily: "'Playfair Display', Georgia, serif",
              color: '#FFFFFF',
              letterSpacing: '0.5px',
              textShadow: '0 4px 25px rgba(0,0,0,0.9)',
            }}
          >
            &ldquo;Every Tagak, just ask.&rdquo;
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: BRAND_COLORS.yellow,
              letterSpacing: '1.5px',
              marginTop: 12,
              textTransform: 'uppercase',
              textShadow: `0 0 16px ${BRAND_COLORS.yellowGlow}`,
            }}
          >
            Less waiting. Easier access to information.
          </div>
        </div>

        {/* Live CTA URL Pill */}
        <div
          style={{
            position: 'relative',
            transform: `scale(${ctaSpring})`,
            opacity: ctaSpring,
          }}
        >
          {/* Ripple Wave */}
          {frame >= 150 && (
            <div
              style={{
                position: 'absolute',
                inset: -6,
                borderRadius: 999,
                border: `2px solid ${BRAND_COLORS.yellow}`,
                transform: `scale(${rippleScale})`,
                opacity: rippleOpacity,
                pointerEvents: 'none',
              }}
            />
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              backgroundColor: 'rgba(15, 23, 42, 0.92)',
              border: `2px solid ${BRAND_COLORS.yellow}`,
              borderRadius: 999,
              padding: '16px 42px',
              boxShadow: `0 15px 40px rgba(0, 0, 0, 0.8), 0 0 35px ${BRAND_COLORS.yellow}45`,
              backdropFilter: 'blur(20px)',
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: BRAND_COLORS.green,
                boxShadow: `0 0 10px ${BRAND_COLORS.green}`,
              }}
            />
            <span
              style={{
                color: '#FFFFFF',
                fontSize: 26,
                fontWeight: 900,
                letterSpacing: '1.5px',
              }}
            >
              taga-askai.vercel.app
            </span>
          </div>
        </div>
      </div>

      {/* Simulated Clicking Animated Cursor */}
      {frame >= 110 && frame < 200 && (
        <div
          style={{
            position: 'absolute',
            top: cursorY,
            left: cursorX,
            transform: `scale(${cursorClick})`,
            zIndex: 60,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.8))',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Karaoke Caption */}
      <KineticKaraoke sceneId="scene7" />

      {/* Final Fade to Black */}
      {fadeOut > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#000000',
            opacity: fadeOut,
            pointerEvents: 'none',
            zIndex: 100,
          }}
        />
      )}
    </CinematicEnvironment>
  );
};
