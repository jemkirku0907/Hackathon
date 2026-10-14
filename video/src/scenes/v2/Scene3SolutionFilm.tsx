import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Lock, Sparkles } from 'lucide-react';
import { CinematicEnvironment } from '../../components/CinematicEnvironment';
import { KaraokeCaption } from '../../components/KaraokeCaption';
import { BRAND_COLORS, SPRINGS } from '../../theme';

export const Scene3SolutionFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Shared-element collapse transition: glowing singularity point
  const singularityOpacity = interpolate(frame, [0, 8, 22], [0, 1, 0], {
    extrapolateRight: 'clamp',
  });
  const singularityScale = interpolate(frame, [0, 10, 22], [0.2, 1.8, 0], {
    extrapolateRight: 'clamp',
  });

  // 2. Real App Window expansion from the singularity
  const appSpring = spring({
    frame: frame - 14,
    fps,
    config: { damping: 15, mass: 0.85 },
  });
  const appScale = interpolate(appSpring, [0, 1], [0.15, 1]);
  const appOpacity = interpolate(appSpring, [0, 1], [0, 1]);

  // Rack focus: Blurred to sharp
  const rackBlur = interpolate(frame, [14, 42], [28, 0], { extrapolateRight: 'clamp' });

  // 3. Kinetic Headline Reveals
  const h1Spring = spring({ frame: frame - 6, fps, config: SPRINGS.snappy });
  const h2Spring = spring({ frame: frame - 28, fps, config: SPRINGS.smooth });

  return (
    <CinematicEnvironment
      primaryGlow={BRAND_COLORS.blue}
      secondaryGlow={BRAND_COLORS.cyan}
      cameraMove="pushIn"
      durationInFrames={150}
    >
      {/* Central Singularity Point of Light (Shared-Element Morph) */}
      {frame < 26 && (
        <div
          style={{
            position: 'absolute',
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            boxShadow: `0 0 80px 30px ${BRAND_COLORS.cyan}, 0 0 140px 60px ${BRAND_COLORS.blue}`,
            transform: `scale(${singularityScale})`,
            opacity: singularityOpacity,
            zIndex: 50,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Kinetic Headline */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 40,
        }}
      >
        <div
          style={{
            transform: `scale(${h1Spring})`,
            fontSize: 62,
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '-1.5px',
            textShadow: '0 8px 30px rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span>Meet</span>
          <span
            style={{
              color: BRAND_COLORS.yellow,
              textShadow: `0 0 35px ${BRAND_COLORS.yellow}80`,
            }}
          >
            TAGA-asK AI
          </span>
        </div>

        {frame >= 25 && (
          <div
            style={{
              transform: `scale(${h2Spring})`,
              fontSize: 28,
              fontWeight: 800,
              color: BRAND_COLORS.cyan,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginTop: 6,
              textShadow: `0 0 20px ${BRAND_COLORS.cyan}70`,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Sparkles size={22} color={BRAND_COLORS.cyan} />
            <span>Answers Grounded in Sources</span>
          </div>
        )}
      </div>

      {/* Real Application Window (Expanded from glowing point with Rack Focus) */}
      <div
        style={{
          width: 1360,
          transform: `scale(${appScale})`,
          opacity: appOpacity,
          filter: `blur(${rackBlur}px)`,
          backgroundColor: '#0F172A',
          border: '1.5px solid rgba(255, 255, 255, 0.18)',
          borderRadius: 22,
          overflow: 'hidden',
          boxShadow:
            '0 35px 100px rgba(0, 0, 0, 0.9), 0 0 60px rgba(63, 86, 202, 0.35)',
          marginTop: 65,
          zIndex: 30,
        }}
      >
        {/* Browser Chrome Header */}
        <div
          style={{
            height: 44,
            backgroundColor: '#111827',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            gap: 12,
          }}
        >
          {/* Mac-style Window Controls */}
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#EC202B' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#D1CA25' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#22C55E' }} />
          </div>

          {/* URL Pill with Lock Icon */}
          <div
            style={{
              marginLeft: 18,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 8,
              padding: '4px 16px',
            }}
          >
            <Lock size={12} color="#94A3B8" />
            <span style={{ color: '#E2E8F0', fontSize: 13, fontFamily: 'monospace' }}>
              https://taga-askai.vercel.app/
            </span>
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22C55E' }} />
            <span style={{ color: '#86EFAC', fontSize: 12, fontWeight: 700 }}>Online</span>
          </div>
        </div>

        {/* Real App Dark Mode Screenshot Display */}
        <div style={{ position: 'relative', width: '100%', height: 490, overflow: 'hidden' }}>
          <Img
            src={staticFile('screenshots/dark_scholarship.png')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
            }}
          />
        </div>
      </div>

      <KaraokeCaption sceneKey="scene3" />
    </CinematicEnvironment>
  );
};
