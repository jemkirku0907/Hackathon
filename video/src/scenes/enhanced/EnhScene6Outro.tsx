import React from 'react';
import { interpolate, spring, staticFile, Img, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../components/BackgroundGlow';
import { SubtitleOverlay } from '../../components/SubtitleOverlay';
import { FloatingParticles, BrandMotionRings, LightSweep } from '../../components/FloatingElements';
import { BRAND_COLORS } from '../../types';

export const EnhScene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Floating lines and cards converge towards the center in frames 0 to 25
  const converge = interpolate(frame, [0, 25], [160, 0], { extrapolateRight: 'clamp' });
  const convergeOpacity = interpolate(frame, [0, 15, 30], [0, 0.8, 0], { extrapolateRight: 'clamp' });

  // Logo reveal with smooth spring
  const logoScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 11, mass: 0.8 },
  });

  const floatY = Math.sin(frame / 12) * 8;

  // Fade to black at the end (last 25 frames)
  const fadeToBlack = interpolate(frame, [275, 300], [0, 1], { extrapolateRight: 'clamp' });

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
      <FloatingParticles count={25} color={BRAND_COLORS.yellow} seed={6} />
      <BrandMotionRings size={920} color={BRAND_COLORS.blue} accentColor={BRAND_COLORS.yellow} />

      {/* Converging graphics into center */}
      {frame < 35 && (
        <>
          <div
            style={{
              position: 'absolute',
              width: 160,
              height: 2,
              backgroundColor: BRAND_COLORS.cyan,
              top: `calc(50% - 220px - ${converge}px)`,
              left: `calc(50% - 120px - ${converge}px)`,
              transform: 'rotate(-30deg)',
              opacity: convergeOpacity,
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 160,
              height: 2,
              backgroundColor: BRAND_COLORS.yellow,
              bottom: `calc(50% - 170px - ${converge}px)`,
              right: `calc(50% - 120px - ${converge}px)`,
              transform: 'rotate(30deg)',
              opacity: convergeOpacity,
            }}
          />
        </>
      )}

      {/* Center Official Logo Reveal */}
      <div
        style={{
          transform: `scale(${logoScale}) translateY(${floatY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: -50,
          zIndex: 10,
        }}
      >
        {/* Soft Radial Spotlight Halo */}
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 520,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(200, 220, 255, 0.55) 40%, rgba(63, 86, 202, 0.25) 70%, transparent 85%)',
            filter: 'blur(50px)',
            zIndex: -1,
          }}
        />

        {/* Official Logo (Transparent with exact typography & mascot) */}
        <div
          style={{
            position: 'relative',
            width: 720,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 20px 50px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 35px rgba(209, 202, 37, 0.45))',
          }}
        >
          <LightSweep startFrame={28} duration={32} color="rgba(255, 255, 255, 0.7)" />

          <Img
            src={staticFile('official-logo-transparent.png')}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </div>

        {/* Primary Motto */}
        <div
          style={{
            marginTop: 36,
            fontSize: 34,
            fontWeight: 900,
            color: BRAND_COLORS.yellow,
            textAlign: 'center',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textShadow: `0 0 30px ${BRAND_COLORS.yellow}80`,
          }}
        >
          &ldquo;Every Tagak, just ask.&rdquo;
        </div>

        {/* Closing Tagline */}
        <p
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: '#CBD5E1',
            margin: '12px 0 0',
            textAlign: 'center',
            letterSpacing: '0.8px',
          }}
        >
          Ask smarter. Find answers. Stay connected with UMak.
        </p>

        {/* Deployment URL Pill */}
        <div
          style={{
            marginTop: 26,
            backgroundColor: 'rgba(63, 86, 202, 0.35)',
            border: `2px solid ${BRAND_COLORS.blue}`,
            borderRadius: 999,
            padding: '12px 36px',
            color: '#FFFFFF',
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: '1px',
            fontFamily: 'monospace',
            boxShadow: `0 0 35px ${BRAND_COLORS.blue}70`,
          }}
        >
          taga-askai.vercel.app
        </div>

        {/* DoError!n Developer Signature */}
        <div
          style={{
            marginTop: 28,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            padding: '10px 24px',
            borderRadius: 999,
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Img
            src={staticFile('doerrorin-logo.png')}
            style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'contain' }}
          />
          <span style={{ color: '#94A3B8', fontSize: 18, fontWeight: 600 }}>
            Developed with pride by <strong style={{ color: '#FFFFFF' }}>DoError!n</strong>
          </span>
        </div>
      </div>

      <SubtitleOverlay
        badge="Every Tagak, Just Ask"
        text="Every Tagak, just ask. Ask smarter, find answers, and stay connected with UMak at taga-askai.vercel.app."
        accentColor={BRAND_COLORS.yellow}
      />

      {/* Fade to black overlay */}
      {frame > 275 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#000000',
            opacity: fadeToBlack,
            zIndex: 100,
          }}
        />
      )}
    </div>
  );
};
