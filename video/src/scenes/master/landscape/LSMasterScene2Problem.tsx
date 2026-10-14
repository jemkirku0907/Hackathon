import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../../components/BackgroundGlow';
import { MasterSubtitleOverlay } from '../../../components/MasterSubtitleOverlay';
import { BRAND_COLORS } from '../../../types';

export const LSMasterScene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Progressive Headlines
  const h1Spring = spring({ frame: frame - 5, fps, config: { damping: 14, mass: 0.8 } });
  const h2Spring = spring({ frame: frame - 75, fps, config: { damping: 14, mass: 0.8 } });

  // Post Card 1 (Left)
  const card1Spring = spring({ frame: frame - 15, fps, config: { damping: 14, mass: 0.9 } });
  const card1X = interpolate(card1Spring, [0, 1], [-200, 0]);

  // Post Card 2 (Right)
  const card2Spring = spring({ frame: frame - 40, fps, config: { damping: 14, mass: 0.9 } });
  const card2X = interpolate(card2Spring, [0, 1], [200, 0]);

  const float1 = Math.sin(frame * 0.05) * 5;
  const float2 = Math.cos(frame * 0.04) * 5;

  return (
    <div
      style={{
        position: 'relative',
        width: '1920px',
        height: '1080px',
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

      {/* Progressive Headlines */}
      <div
        style={{
          position: 'absolute',
          top: 80,
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
            fontSize: 60,
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
              fontSize: 62,
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

      {/* Side-by-side real Facebook post screenshots */}
      <div
        style={{
          display: 'flex',
          gap: 40,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          marginTop: 100,
        }}
      >
        {/* Real Screenshot 1: CIT post */}
        <div
          style={{
            transform: `translateX(${card1X}px) translateY(${float1}px)`,
            width: 740,
            borderRadius: 18,
            overflow: 'hidden',
            backgroundColor: '#242526',
            border: '1.5px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)',
          }}
        >
          <Img
            src={staticFile('screenshots/fb_cit_post.png')}
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
          />
        </div>

        {/* Real Screenshot 2: Keli post */}
        <div
          style={{
            transform: `translateX(${card2X}px) translateY(${float2}px)`,
            width: 740,
            borderRadius: 18,
            overflow: 'hidden',
            backgroundColor: '#242526',
            border: '1.5px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)',
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
        isLandscape={true}
      />
    </div>
  );
};
