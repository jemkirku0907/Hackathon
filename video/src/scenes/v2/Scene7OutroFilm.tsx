import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { ExternalLink, Sparkles } from 'lucide-react';
import { CinematicEnvironment } from '../../components/CinematicEnvironment';
import { KaraokeCaption } from '../../components/KaraokeCaption';
import { BRAND_COLORS, SPRINGS } from '../../theme';

export const Scene7OutroFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Logo Stage Reveal & Warm Yellow Bloom
  const logoSpring = spring({ frame: frame - 6, fps, config: SPRINGS.snappy });
  const logoScale = interpolate(logoSpring, [0, 1], [0.85, 1.3]);
  const logoBloom = interpolate(frame, [10, 45], [0, 1], { extrapolateRight: 'clamp' });

  // 2. Word-by-Word Kinetic Tagline 1 ("Less waiting. Easier access to information.")
  const tag1Spring = spring({ frame: frame - 25, fps, config: SPRINGS.smooth });
  const tag1Words = ['Less', 'waiting.', 'Easier', 'access', 'to', 'information.'];

  // 3. Tagline 2 ("Ask smarter. Stay connected with UMak.")
  const tag2Spring = spring({ frame: frame - 65, fps, config: SPRINGS.smooth });

  // 4. Glowing URL Pill (frames 95 -> 240)
  const pillSpring = spring({ frame: frame - 90, fps, config: SPRINGS.bouncy });
  const urlUnderlineWidth = interpolate(frame, [115, 150], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Sleek Cursor Click Simulation on URL Pill (frames 135 -> 175)
  const cursorSpring = spring({ frame: frame - 130, fps, config: SPRINGS.smooth });
  const cursorX = interpolate(cursorSpring, [0, 1], [300, 150]);
  const cursorY = interpolate(cursorSpring, [0, 1], [150, 25]);

  const clickFrame = frame - 155;
  const isClicking = clickFrame >= 0 && clickFrame <= 8;
  const pillClickScale = isClicking ? 0.96 : 1.0;

  // Click Ripple Wave
  const rippleScale = interpolate(clickFrame, [0, 25], [1, 2.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rippleOpacity = interpolate(clickFrame, [0, 6, 25], [0, 0.8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Soft cinematic fade to pure black (Hold 2s then fade: frames 215 -> 240)
  const fadeToBlack = interpolate(frame, [215, 240], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <CinematicEnvironment
      primaryGlow={BRAND_COLORS.blue}
      secondaryGlow={BRAND_COLORS.yellow}
      cameraMove="pushIn"
      durationInFrames={240}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: -60,
          zIndex: 30,
          position: 'relative',
        }}
      >
        {/* Soft atmospheric spotlight bloom behind the official logo */}
        <div
          style={{
            position: 'absolute',
            width: 900,
            height: 500,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255, 255, 255, 0.85) 0%, rgba(200, 220, 255, 0.45) 40%, rgba(63, 86, 202, 0.25) 70%, transparent 85%)',
            filter: 'blur(70px)',
            opacity: logoBloom * 0.8,
            zIndex: -1,
          }}
        />

        {/* Authentic Official Logo (Exact Wordmark & Heron Mascot) */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            filter: `drop-shadow(0 25px 60px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 45px ${BRAND_COLORS.yellow}55)`,
            width: 580,
          }}
        >
          <Img
            src={staticFile('official-logo-transparent.png')}
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
          />
        </div>

        {/* Kinetic Taglines */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginTop: 35,
            zIndex: 35,
          }}
        >
          {/* Tagline 1 */}
          <div
            style={{
              transform: `scale(${tag1Spring})`,
              fontSize: 44,
              fontWeight: 900,
              color: BRAND_COLORS.yellow,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              textShadow: `0 0 35px ${BRAND_COLORS.yellow}80`,
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {tag1Words.map((word, idx) => (
              <span key={idx}>{word}</span>
            ))}
          </div>

          {/* Tagline 2 */}
          {frame >= 60 && (
            <div
              style={{
                transform: `scale(${tag2Spring})`,
                marginTop: 12,
                fontSize: 26,
                fontWeight: 700,
                color: '#E2E8F0',
                letterSpacing: '1px',
              }}
            >
              Ask smarter. Stay connected with UMak.
            </div>
          )}

          {/* Glowing URL Pill with animated underline and click ripple */}
          {frame >= 90 && (
            <div
              style={{
                position: 'relative',
                marginTop: 28,
                transform: `scale(${pillSpring * pillClickScale})`,
              }}
            >
              {/* Radial Click Ripple Wave */}
              {clickFrame >= 0 && (
                <div
                  style={{
                    position: 'absolute',
                    inset: -10,
                    borderRadius: 999,
                    border: `2px solid ${BRAND_COLORS.cyan}`,
                    transform: `scale(${rippleScale})`,
                    opacity: rippleOpacity,
                    pointerEvents: 'none',
                  }}
                />
              )}

              <div
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  border: `2px solid ${BRAND_COLORS.cyan}`,
                  borderRadius: 999,
                  padding: '14px 44px',
                  boxShadow: `0 10px 40px rgba(0, 0, 0, 0.8), 0 0 35px ${BRAND_COLORS.cyan}50`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    color: '#FFFFFF',
                    fontSize: 24,
                    fontWeight: 800,
                    fontFamily: 'monospace',
                    letterSpacing: '1px',
                  }}
                >
                  taga-askai.vercel.app
                </span>
                <ExternalLink size={20} color={BRAND_COLORS.cyan} />

                {/* Animated Underline */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: 3,
                    width: `${urlUnderlineWidth}%`,
                    backgroundColor: BRAND_COLORS.yellow,
                    boxShadow: `0 0 10px ${BRAND_COLORS.yellow}`,
                  }}
                />
              </div>

              {/* Modern Sleek Mouse Cursor hovering & clicking */}
              {frame >= 135 && frame <= 190 && (
                <div
                  style={{
                    position: 'absolute',
                    top: cursorY,
                    left: cursorX,
                    pointerEvents: 'none',
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.9))',
                    transform: isClicking ? 'scale(0.9)' : 'scale(1)',
                    zIndex: 50,
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                      fill="#FFFFFF"
                      stroke="#000000"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <KaraokeCaption sceneKey="scene7" />

      {/* Cinematic Fade to Pure Black (Hold 2s then fade out) */}
      {fadeToBlack > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#000000',
            opacity: fadeToBlack,
            pointerEvents: 'none',
            zIndex: 100,
          }}
        />
      )}
    </CinematicEnvironment>
  );
};
