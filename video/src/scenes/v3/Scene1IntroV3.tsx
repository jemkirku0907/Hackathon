import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicEnvironment } from '../../components/CinematicEnvironment';
import { HudOverlay } from '../../components/v3/HudOverlay';
import { KineticKaraoke } from '../../components/v3/KineticKaraoke';
import { WhipPanWrapper } from '../../components/v3/WhipPanWrapper';
import { BRAND_COLORS, SPRINGS } from '../../theme';

export const Scene1IntroV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Initial fade-in from black (frames 0 - 10)
  const fadeFromBlack = interpolate(frame, [0, 10], [1, 0], { extrapolateRight: 'clamp' });

  // BEAT 1: "TAGA-" (frames 14 - 30) - high-impact spring drop
  const tagaSpring = spring({
    frame: frame - 14,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 140 },
  });
  const tagaY = interpolate(tagaSpring, [0, 1], [-80, 0]);
  const tagaScale = interpolate(tagaSpring, [0, 1], [1.8, 1]);
  const tagaOpacity = interpolate(tagaSpring, [0, 1], [0, 1]);

  // BEAT 2: Heron Mascot Pop & Radial Bloom (frames 24 - 42)
  const heronSpring = spring({
    frame: frame - 22,
    fps,
    config: SPRINGS.bouncy,
  });
  const heronScale = interpolate(heronSpring, [0, 1], [0.3, 1]);
  const heronOpacity = interpolate(heronSpring, [0, 1], [0, 1]);
  const heronBloom = interpolate(frame, [22, 40], [0, 0.75], { extrapolateRight: 'clamp' });

  // BEAT 3: "asK" Mask-up from below (frames 29 - 46)
  const askSpring = spring({
    frame: frame - 29,
    fps,
    config: { damping: 13, mass: 0.7, stiffness: 150 },
  });
  const askY = interpolate(askSpring, [0, 1], [90, 0]);
  const askOpacity = interpolate(askSpring, [0, 1], [0, 1]);

  // BEAT 4: "AI" Slam with Shockwave (frames 41 - 58)
  const aiSpring = spring({
    frame: frame - 41,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 180 },
  });
  const aiScale = interpolate(aiSpring, [0, 1], [2.4, 1]);
  const aiOpacity = interpolate(aiSpring, [0, 1], [0, 1]);

  // Shockwave ring on AI slam
  const shockwaveScale = interpolate(frame, [42, 68], [0.6, 2.6], { extrapolateRight: 'clamp' });
  const shockwaveOpacity = interpolate(frame, [42, 48, 68], [0, 0.8, 0], {
    extrapolateRight: 'clamp',
  });

  // BEAT 5: Full Lockup settling + UMak Seal Badge Shine (frames 58 - 80)
  const sealSpring = spring({
    frame: frame - 55,
    fps,
    config: SPRINGS.smooth,
  });
  const sealY = interpolate(sealSpring, [0, 1], [-30, 0]);
  const sealOpacity = interpolate(sealSpring, [0, 1], [0, 1]);
  const sealShineX = interpolate(frame, [60, 95], [-120, 320], { extrapolateRight: 'clamp' });

  // BEAT 6: Tagline Mask-up Reveal ("Your UMak AI Companion") (frames 75 - 110)
  const taglineSpring = spring({
    frame: frame - 72,
    fps,
    config: SPRINGS.smooth,
  });
  const taglineY = interpolate(taglineSpring, [0, 1], [30, 0]);
  const taglineOpacity = interpolate(taglineSpring, [0, 1], [0, 1]);

  // Subtle continuous camera float
  const floatY = Math.sin(frame * 0.05) * 6;
  const floatRot = Math.sin(frame * 0.04) * 0.8;

  // Navy drop-shadow glow filter with 2px white outline and cyan neon rim for dark background legibility
  const navyGlowFilter =
    'drop-shadow(0 0 2px #FFFFFF) drop-shadow(0 0 6px #21ADE3) drop-shadow(0 0 20px rgba(33, 173, 227, 0.75))';

  return (
    <WhipPanWrapper durationInFrames={128} direction="left">
      <CinematicEnvironment
        primaryGlow={BRAND_COLORS.blue}
        secondaryGlow={BRAND_COLORS.yellow}
        cameraMove="pushIn"
        durationInFrames={128}
      >
        <HudOverlay label="01 // INTRO" sublabel="BRAND LOCKUP" globalFrameOffset={0} />

        {/* UMak Official Seal Pill (Beat 5) */}
        <div
          style={{
            position: 'absolute',
            top: 72,
            left: '50%',
            transform: `translateX(-50%) translateY(${sealY}px)`,
            opacity: sealOpacity,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            backgroundColor: 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: 999,
            padding: '10px 28px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(33, 173, 227, 0.2)',
            zIndex: 40,
            overflow: 'hidden',
          }}
        >
          {/* Chrome shine sweep */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: sealShineX,
              width: 80,
              height: '100%',
              background:
                'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
              transform: 'skewX(-25deg)',
              pointerEvents: 'none',
            }}
          />
          <Img
            src={staticFile('umak-seal.png')}
            style={{ width: 34, height: 34, objectFit: 'contain' }}
          />
          <span
            style={{
              color: '#FFFFFF',
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            University of Makati
          </span>
        </div>

        {/* Central Logo Stage */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `translateY(${floatY}px) rotate(${floatRot}deg)`,
            zIndex: 30,
            marginTop: 20,
          }}
        >
          {/* Radial yellow bloom behind mascot (Beat 2) */}
          <div
            style={{
              position: 'absolute',
              right: 60,
              width: 520,
              height: 520,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${BRAND_COLORS.yellow}45 0%, ${BRAND_COLORS.blue}25 50%, transparent 75%)`,
              filter: 'blur(70px)',
              opacity: heronBloom,
              zIndex: -1,
            }}
          />

          {/* AI Slam Shockwave (Beat 4) */}
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              left: 480,
              width: 220,
              height: 220,
              borderRadius: '50%',
              border: `3px solid ${BRAND_COLORS.yellow}`,
              transform: `scale(${shockwaveScale})`,
              opacity: shockwaveOpacity,
              filter: 'blur(2px)',
              pointerEvents: 'none',
              zIndex: 35,
            }}
          />

          {/* Wordmark Container (Left Side) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginRight: 40,
            }}
          >
            {/* Top row: TAGA- (Beat 1) */}
            <div
              style={{
                transform: `translateY(${tagaY}px) scale(${tagaScale})`,
                opacity: tagaOpacity,
                filter: navyGlowFilter,
              }}
            >
              <Img
                src={staticFile('logo-layers/logo_taga.png')}
                style={{
                  height: 145,
                  width: 'auto',
                  display: 'block',
                }}
              />
            </div>

            {/* Bottom row: asK (Beat 3) and AI (Beat 4) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginTop: -10,
              }}
            >
              {/* asK Masked Container */}
              <div
                style={{
                  overflow: 'hidden',
                  paddingTop: 6,
                  paddingBottom: 6,
                }}
              >
                <div
                  style={{
                    transform: `translateY(${askY}px)`,
                    opacity: askOpacity,
                    filter: navyGlowFilter,
                  }}
                >
                  <Img
                    src={staticFile('logo-layers/logo_ask.png')}
                    style={{
                      height: 125,
                      width: 'auto',
                      display: 'block',
                    }}
                  />
                </div>
              </div>

              {/* AI Slam */}
              <div
                style={{
                  transform: `scale(${aiScale})`,
                  opacity: aiOpacity,
                  filter: `drop-shadow(0 0 25px ${BRAND_COLORS.yellow}70) drop-shadow(0 6px 14px rgba(0,0,0,0.85))`,
                }}
              >
                <Img
                  src={staticFile('logo-layers/logo_ai.png')}
                  style={{
                    height: 125,
                    width: 'auto',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Mascot Container (Right Side - Beat 2) */}
          <div
            style={{
              transform: `scale(${heronScale})`,
              opacity: heronOpacity,
              filter: `drop-shadow(0 15px 35px rgba(0,0,0,0.85)) drop-shadow(0 0 30px ${BRAND_COLORS.yellow}50)`,
              marginLeft: -20,
            }}
          >
            <Img
              src={staticFile('logo-layers/logo_heron.png')}
              style={{
                height: 380,
                width: 'auto',
                display: 'block',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>

        {/* Tagline Subtitle (Beat 6) */}
        <div
          style={{
            position: 'absolute',
            bottom: 155,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            zIndex: 40,
          }}
        >
          <div
            style={{
              transform: `translateY(${taglineY}px)`,
              opacity: taglineOpacity,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: 999,
              padding: '8px 24px',
              backdropFilter: 'blur(16px)',
            }}
          >
            <span
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: BRAND_COLORS.cyan,
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                textShadow: `0 0 16px ${BRAND_COLORS.cyanGlow}`,
              }}
            >
              Your UMak AI Companion
            </span>
          </div>
        </div>

        {/* Karaoke Caption */}
        <KineticKaraoke sceneId="scene1" />

        {/* Fade from pure black */}
        {fadeFromBlack > 0 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#000000',
              opacity: fadeFromBlack,
              pointerEvents: 'none',
              zIndex: 100,
            }}
          />
        )}
      </CinematicEnvironment>
    </WhipPanWrapper>
  );
};
