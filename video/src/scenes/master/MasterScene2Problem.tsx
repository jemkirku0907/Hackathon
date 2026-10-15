import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../components/BackgroundGlow';
import { MasterSubtitleOverlay } from '../../components/MasterSubtitleOverlay';
import { BRAND_COLORS } from '../../types';

export const MasterScene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Progressive Headline Reveals
  const h1Spring = spring({ frame: frame - 5, fps, config: { damping: 14, mass: 0.8 } });
  const h2Spring = spring({ frame: frame - 75, fps, config: { damping: 14, mass: 0.8 } });

  // Real Facebook Post 1 (CIT Post) - Enters with subtle tilt and depth
  const post1Spring = spring({ frame: frame - 15, fps, config: { damping: 14, mass: 0.9 } });
  const post1X = interpolate(post1Spring, [0, 1], [-260, 0]);
  const post1Rotate = interpolate(post1Spring, [0, 1], [-4, -1]);

  // Real Facebook Post 2 (Keli Post) - Rises from below with subtle delay
  const post2Spring = spring({ frame: frame - 45, fps, config: { damping: 14, mass: 0.9 } });
  const post2Y = interpolate(post2Spring, [0, 1], [220, 0]);
  const post2Rotate = interpolate(post2Spring, [0, 1], [4, 1]);

  // Subtle floating parallax
  const float1 = Math.sin(frame * 0.05) * 5;
  const float2 = Math.cos(frame * 0.04) * 5;

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
        backgroundColor: '#0B0F19',
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      <BackgroundGlow primaryColor="#1E293B" secondaryColor={BRAND_COLORS.red} />

      {/* Large Clean Typography at Top */}
      <div
        style={{
          position: 'absolute',
          top: 150,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 30,
        }}
      >
        <div
          style={{
            transform: `scale(${h1Spring})`,
            opacity: h1Spring,
            fontSize: 70,
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '-1px',
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
          }}
        >
          May tanong ka?
        </div>

        {frame >= 70 && (
          <div
            style={{
              transform: `scale(${h2Spring})`,
              opacity: h2Spring,
              marginTop: 10,
              fontSize: 72,
              fontWeight: 900,
              color: BRAND_COLORS.yellow,
              letterSpacing: '-1px',
              textShadow: '0 4px 25px rgba(0,0,0,0.9)',
            }}
          >
            Pero sino ang sasagot?
          </div>
        )}
      </div>

      {/* Real Facebook Post Screenshots in Layered Composition */}
      <div
        style={{
          width: 960,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          marginTop: 130,
          zIndex: 20,
        }}
      >
        {/* Real Facebook Screenshot 1: CIT inquiry with 0 comments */}
        <div
          style={{
            transform: `translateX(${post1X}px) translateY(${float1}px) rotate(${post1Rotate}deg)`,
            width: 900,
            borderRadius: 20,
            overflow: 'hidden',
            backgroundColor: '#242526',
            border: '1.5px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85), 0 0 30px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Img
            src={staticFile('screenshots/fb_cit_post.png')}
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
          />
        </div>

        {/* Real Facebook Screenshot 2: Keli student inquiry */}
        <div
          style={{
            transform: `translateY(${post2Y + float2}px) rotate(${post2Rotate}deg)`,
            width: 900,
            borderRadius: 20,
            overflow: 'hidden',
            backgroundColor: '#242526',
            border: '1.5px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85), 0 0 30px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Img
            src={staticFile('screenshots/fb_keli_post.png')}
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
          />
        </div>
      </div>

      <MasterSubtitleOverlay
        badge="The Problem"
        text="May tanong ka, pero sino ang sasagot? Waiting hours in Facebook groups with zero replies."
        accentColor={BRAND_COLORS.red}
      />
    </div>
  );
};
