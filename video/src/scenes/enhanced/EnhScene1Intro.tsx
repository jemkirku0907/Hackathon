import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../components/BackgroundGlow';
import { SubtitleOverlay } from '../../components/SubtitleOverlay';
import { FloatingParticles, BrandMotionRings, LightSweep } from '../../components/FloatingElements';
import { BRAND_COLORS } from '../../types';

export const EnhScene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Converging abstract shapes and light trails towards center (0 to 35 frames)
  const convergeProgress = interpolate(frame, [0, 35], [220, 0], { extrapolateRight: 'clamp' });
  const trailOpacity = interpolate(frame, [0, 20, 35, 45], [0, 0.9, 0.8, 0], { extrapolateRight: 'clamp' });

  // Official Logo scale with cinematic spring impact
  const logoScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 11, mass: 0.8 },
  });

  // Impact flash and camera shake when logo settles (frames 36 to 45)
  const impactShake = frame >= 36 && frame <= 44 ? (frame % 2 === 0 ? 3 : -3) : 0;
  const impactFlash = interpolate(frame, [36, 42, 50], [0, 0.45, 0], { extrapolateRight: 'clamp' });

  // Tagline reveal
  const taglineSpring = spring({
    frame: frame - 38,
    fps,
    config: { damping: 13, mass: 0.8 },
  });
  const taglineY = interpolate(taglineSpring, [0, 1], [30, 0]);

  // Floating idle motion
  const floatY = Math.sin(frame * 0.08) * 8;

  return (
    <div
      style={{
        position: 'relative',
        width: '1080px',
        height: '1920px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <BackgroundGlow primaryColor={BRAND_COLORS.blue} secondaryColor={BRAND_COLORS.yellow} />
      <FloatingParticles count={25} color={BRAND_COLORS.cyan} seed={1} />
      <BrandMotionRings size={920} color={BRAND_COLORS.blue} accentColor={BRAND_COLORS.yellow} />

      {/* Converging Light Trails from corners toward center */}
      {frame < 50 && (
        <>
          <div
            style={{
              position: 'absolute',
              width: 3,
              height: 200,
              background: `linear-gradient(to bottom, transparent, ${BRAND_COLORS.cyan}, transparent)`,
              top: `calc(50% - 260px - ${convergeProgress}px)`,
              left: `calc(50% - 180px - ${convergeProgress * 0.8}px)`,
              transform: 'rotate(-45deg)',
              opacity: trailOpacity,
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 3,
              height: 200,
              background: `linear-gradient(to bottom, transparent, ${BRAND_COLORS.yellow}, transparent)`,
              top: `calc(50% - 260px - ${convergeProgress}px)`,
              right: `calc(50% - 180px - ${convergeProgress * 0.8}px)`,
              transform: 'rotate(45deg)',
              opacity: trailOpacity,
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 3,
              height: 200,
              background: `linear-gradient(to bottom, transparent, ${BRAND_COLORS.blue}, transparent)`,
              bottom: `calc(50% - 120px - ${convergeProgress}px)`,
              left: `calc(50% - 200px - ${convergeProgress * 0.8}px)`,
              transform: 'rotate(45deg)',
              opacity: trailOpacity,
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 3,
              height: 200,
              background: `linear-gradient(to bottom, transparent, ${BRAND_COLORS.red}, transparent)`,
              bottom: `calc(50% - 120px - ${convergeProgress}px)`,
              right: `calc(50% - 200px - ${convergeProgress * 0.8}px)`,
              transform: 'rotate(-45deg)',
              opacity: trailOpacity,
            }}
          />
        </>
      )}

      {/* University Crest Header */}
      <div
        style={{
          position: 'absolute',
          top: 140,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '12px 28px',
          borderRadius: 999,
          opacity: Math.min(1, frame / 20),
          zIndex: 20,
        }}
      >
        <Img
          src={staticFile('umak-seal.png')}
          style={{ width: 44, height: 44, objectFit: 'contain' }}
        />
        <span
          style={{
            color: '#FFFFFF',
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          University of Makati
        </span>
      </div>

      {/* Official Animated Logo Centerpiece */}
      <div
        style={{
          transform: `scale(${logoScale}) translateY(${floatY + impactShake}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: -40,
          zIndex: 10,
        }}
      >
        {/* Soft Radial Ambient Spotlight Glow */}
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 520,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(200, 220, 255, 0.6) 40%, rgba(63, 86, 202, 0.2) 70%, transparent 85%)',
            filter: 'blur(45px)',
            zIndex: -1,
          }}
        />

        {/* Official Logo (Transparent, containing exact official wordmark & heron) */}
        <div
          style={{
            position: 'relative',
            width: 720,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 20px 50px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 35px rgba(209, 202, 37, 0.4))',
          }}
        >
          <LightSweep startFrame={38} duration={32} color="rgba(255, 255, 255, 0.7)" />

          <Img
            src={staticFile('official-logo-transparent.png')}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </div>

        {/* Tagline Reveal */}
        <div
          style={{
            marginTop: 40,
            textAlign: 'center',
            opacity: taglineSpring,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 34,
              fontWeight: 800,
              color: BRAND_COLORS.yellow,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textShadow: `0 0 25px ${BRAND_COLORS.yellow}80`,
            }}
          >
            Your UMak AI Companion.
          </div>
        </div>
      </div>

      {/* Cinematic Flash upon settling */}
      {impactFlash > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#FFFFFF',
            opacity: impactFlash,
            pointerEvents: 'none',
            zIndex: 100,
          }}
        />
      )}

      <SubtitleOverlay
        badge="Official UMak AI"
        text="Introducing TAGA-asK AI — the verified AI companion built for the University of Makati community."
        accentColor={BRAND_COLORS.yellow}
      />
    </div>
  );
};
