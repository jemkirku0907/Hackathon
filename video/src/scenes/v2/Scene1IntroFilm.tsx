import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicEnvironment } from '../../components/CinematicEnvironment';
import { KaraokeCaption } from '../../components/KaraokeCaption';
import { BRAND_COLORS, SPRINGS } from '../../theme';

export const Scene1IntroFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Initial fade-in from black
  const fadeFromBlack = interpolate(frame, [0, 14], [1, 0], { extrapolateRight: 'clamp' });

  // 2. Light streak sweep
  const streakX = interpolate(frame, [6, 32], [-800, 2400], { extrapolateRight: 'clamp' });

  // 3. Heron SVG outline draw-on (frames 10 -> 42)
  const drawProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, mass: 0.9 },
  });
  const strokeDashoffset = interpolate(drawProgress, [0, 1], [900, 0]);

  // 4. Yellow Heron fill and mascot transition (frames 34 -> 60)
  const heronFill = interpolate(frame, [30, 48], [0, 1], { extrapolateRight: 'clamp' });
  const mascotSpring = spring({
    frame: frame - 32,
    fps,
    config: SPRINGS.bouncy,
  });

  // 5. Wordmark Slam ("TAGA-" & "asK AI")
  const tagaSpring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 13, mass: 0.7 },
  });
  const tagaScale = interpolate(tagaSpring, [0, 1], [2.2, 1]);
  const tagaOpacity = interpolate(tagaSpring, [0, 1], [0, 1]);

  const askSpring = spring({
    frame: frame - 46,
    fps,
    config: { damping: 13, mass: 0.7 },
  });
  const askScale = interpolate(askSpring, [0, 1], [2.2, 1]);
  const askOpacity = interpolate(askSpring, [0, 1], [0, 1]);

  // Shockwave pulse ring on slam
  const shockwaveScale = interpolate(frame, [44, 75], [0.6, 2.8], { extrapolateRight: 'clamp' });
  const shockwaveOpacity = interpolate(frame, [44, 52, 75], [0, 0.7, 0], {
    extrapolateRight: 'clamp',
  });

  // 6. Top UMak Seal Badge
  const badgeSpring = spring({
    frame: frame - 18,
    fps,
    config: SPRINGS.smooth,
  });

  // Shine sweep across seal badge
  const sealShineX = interpolate(frame, [25, 60], [-150, 350], { extrapolateRight: 'clamp' });

  // 7. Gentle 3D floating movement
  const floatY = Math.sin(frame * 0.045) * 8;
  const floatRot = Math.sin(frame * 0.035) * 1.2;

  return (
    <CinematicEnvironment
      primaryGlow={BRAND_COLORS.blue}
      secondaryGlow={BRAND_COLORS.yellow}
      cameraMove="pushIn"
      durationInFrames={150}
    >
      {/* UMak University Top Pill */}
      <div
        style={{
          position: 'absolute',
          top: 65,
          opacity: badgeSpring,
          transform: `translateY(${interpolate(badgeSpring, [0, 1], [-20, 0])}px)`,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          backgroundColor: 'rgba(15, 23, 42, 0.82)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          borderRadius: 999,
          padding: '10px 28px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
          zIndex: 30,
          overflow: 'hidden',
        }}
      >
        {/* Shine sweep over badge */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: sealShineX,
            width: 70,
            height: '100%',
            background:
              'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent)',
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

      {/* Hero Logo Stage */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateY(${floatY}px) rotate(${floatRot}deg)`,
          zIndex: 25,
          position: 'relative',
        }}
      >
        {/* Radial yellow bloom behind heron */}
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${BRAND_COLORS.yellow}40 0%, ${BRAND_COLORS.blue}25 50%, transparent 75%)`,
            filter: 'blur(60px)',
            opacity: heronFill,
            zIndex: -1,
          }}
        />

        {/* Heron Mascot Container */}
        <div
          style={{
            position: 'relative',
            width: 260,
            height: 270,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          {/* Slam Shockwave ring centered on mascot */}
          <div
            style={{
              position: 'absolute',
              width: 250,
              height: 250,
              borderRadius: '50%',
              border: `2.5px solid ${BRAND_COLORS.yellow}`,
              transform: `scale(${shockwaveScale})`,
              opacity: shockwaveOpacity,
              filter: 'blur(2px)',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          />

          {/* Animated SVG Path Outline Draw-on */}
          {frame < 60 && (
            <svg
              viewBox="0 0 200 200"
              style={{
                position: 'absolute',
                width: 220,
                height: 220,
                filter: `drop-shadow(0 0 15px ${BRAND_COLORS.yellow})`,
              }}
            >
              {/* Stylized Heron Neck, Beak, and Wing Contour */}
              <path
                d="M 100 20 C 120 40, 130 60, 125 90 C 120 120, 150 140, 165 130 C 145 160, 110 175, 75 160 C 50 145, 45 110, 60 85 C 75 60, 80 40, 100 20 Z M 125 45 L 185 35 L 135 60 Z"
                fill="none"
                stroke={BRAND_COLORS.yellow}
                strokeWidth="4"
                strokeDasharray="900"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}

          {/* Authentic High-Res Heron Mascot Image */}
          <div
            style={{
              transform: `scale(${mascotSpring})`,
              opacity: heronFill,
              filter: `drop-shadow(0 15px 35px rgba(0,0,0,0.8)) drop-shadow(0 0 25px ${BRAND_COLORS.yellow}60)`,
            }}
          >
            <Img
              src={staticFile('heron-mascot.png')}
              style={{
                width: 190,
                height: 'auto',
                display: 'block',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>

        {/* Slamming Kinetic Wordmark: "TAGA-" and "asK AI" */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            marginTop: 18,
          }}
        >
          <span
            style={{
              transform: `scale(${tagaScale})`,
              opacity: tagaOpacity,
              fontSize: 104,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-1px',
              textShadow: '0 10px 40px rgba(0,0,0,0.95)',
              display: 'inline-block',
            }}
          >
            TAGA-
          </span>
          <span
            style={{
              transform: `scale(${askScale})`,
              opacity: askOpacity,
              fontSize: 104,
              fontWeight: 900,
              color: BRAND_COLORS.yellow,
              letterSpacing: '-1px',
              textShadow: `0 0 45px ${BRAND_COLORS.yellow}90, 0 10px 40px rgba(0,0,0,0.95)`,
              display: 'inline-block',
            }}
          >
            asK AI
          </span>
        </div>

        {/* Official Subtitle Underline */}
        <div
          style={{
            marginTop: 14,
            fontSize: 26,
            fontWeight: 800,
            color: BRAND_COLORS.cyan,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            opacity: interpolate(frame, [50, 70], [0, 1], { extrapolateRight: 'clamp' }),
            textShadow: `0 0 16px ${BRAND_COLORS.cyan}60`,
          }}
        >
          Your UMak AI Companion
        </div>
      </div>

      {/* Sweeping Light Streak Effect */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: streakX,
          width: 500,
          height: 3,
          background: `linear-gradient(90deg, transparent, #FFFFFF, ${BRAND_COLORS.yellow}, transparent)`,
          boxShadow: `0 0 40px 10px ${BRAND_COLORS.yellow}`,
          transform: 'rotate(-25deg)',
          opacity: interpolate(frame, [6, 18, 32], [0, 1, 0], { extrapolateRight: 'clamp' }),
          pointerEvents: 'none',
          zIndex: 40,
        }}
      />

      {/* Karaoke Caption */}
      <KaraokeCaption sceneKey="scene1" />

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
  );
};
