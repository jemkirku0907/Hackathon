import React from 'react';
import { interpolate, spring, staticFile, Img, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../components/BackgroundGlow';
import { SubtitleOverlay } from '../../components/SubtitleOverlay';
import { BRAND_COLORS } from '../../types';

export const EnhScene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 11, mass: 0.8 },
  });

  const floatY = Math.sin(frame / 10) * 8;
  const pulseAura = interpolate(Math.sin(frame / 12), [-1, 1], [0.85, 1.25]);

  // Fade to black at the end (last 20 frames)
  const fadeToBlack = interpolate(frame, [190, 210], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <BackgroundGlow primaryColor={BRAND_COLORS.blue} secondaryColor={BRAND_COLORS.yellow} />

      {/* Center Mascot & Logo Reveal */}
      <div
        style={{
          transform: `scale(${logoScale}) translateY(${floatY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: -60,
        }}
      >
        {/* Glow Halo */}
        <div
          style={{
            position: 'absolute',
            width: 460,
            height: 460,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${BRAND_COLORS.cyan}50 0%, transparent 70%)`,
            filter: 'blur(60px)',
            transform: `scale(${pulseAura})`,
            zIndex: -1,
          }}
        />

        {/* Mascot Card */}
        <div
          style={{
            width: 320,
            height: 320,
            borderRadius: 72,
            backgroundColor: '#0F172A',
            border: `4px solid ${BRAND_COLORS.yellow}`,
            boxShadow: `0 0 80px ${BRAND_COLORS.yellow}60`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <Img
            src={staticFile('taga-bird.png')}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Title Wordmark */}
        <h1
          style={{
            fontSize: 78,
            fontWeight: 900,
            letterSpacing: '-2px',
            margin: '36px 0 0',
            color: '#FFFFFF',
            textAlign: 'center',
            textShadow: '0 10px 40px rgba(0, 0, 0, 0.9)',
          }}
        >
          TAGA-asK <span style={{ color: BRAND_COLORS.yellow }}>AI</span>
        </h1>

        {/* Primary Slogan / Quote */}
        <div
          style={{
            marginTop: 16,
            fontSize: 32,
            fontWeight: 900,
            color: BRAND_COLORS.yellow,
            textAlign: 'center',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            textShadow: `0 0 30px ${BRAND_COLORS.yellow}60`,
          }}
        >
          &ldquo;Every Tagak, just ask.&rdquo;
        </div>

        {/* Subtitle Slogan */}
        <p
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: '#CBD5E1',
            margin: '12px 0 0',
            textAlign: 'center',
            letterSpacing: '0.5px',
          }}
        >
          Ask smarter. Find answers. Stay connected with UMak.
        </p>

        {/* Deployment URL Pill */}
        <div
          style={{
            marginTop: 28,
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
            marginTop: 32,
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
      {frame > 190 && (
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
