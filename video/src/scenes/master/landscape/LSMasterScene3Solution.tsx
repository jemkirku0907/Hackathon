import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../../components/BackgroundGlow';
import { MasterSubtitleOverlay } from '../../../components/MasterSubtitleOverlay';
import { BRAND_COLORS } from '../../../types';

export const LSMasterScene3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const h1Spring = spring({ frame: frame - 5, fps, config: { damping: 14, mass: 0.8 } });
  const h2Spring = spring({ frame: frame - 35, fps, config: { damping: 14, mass: 0.8 } });
  const appSpring = spring({ frame: frame - 20, fps, config: { damping: 14, mass: 0.9 } });

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
      <BackgroundGlow primaryColor={BRAND_COLORS.blue} secondaryColor={BRAND_COLORS.cyan} />

      {/* Top Headline */}
      <div
        style={{
          position: 'absolute',
          top: 60,
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
          Meet <span style={{ color: BRAND_COLORS.yellow }}>TAGA-asK AI</span>
        </div>
        {frame >= 30 && (
          <div
            style={{
              transform: `scale(${h2Spring})`,
              fontSize: 34,
              fontWeight: 800,
              color: BRAND_COLORS.cyan,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            Answers Grounded in Sources.
          </div>
        )}
      </div>

      {/* Real App Window Preview */}
      <div
        style={{
          width: 1280,
          transform: `scale(${appSpring})`,
          backgroundColor: '#0F172A',
          border: '1.5px solid rgba(255, 255, 255, 0.16)',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 30px 90px rgba(0,0,0,0.85), 0 0 50px rgba(63, 86, 202, 0.3)',
          marginTop: 80,
          zIndex: 20,
        }}
      >
        <div
          style={{
            height: 42,
            backgroundColor: '#111827',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            gap: 8,
          }}
        >
          <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#EC202B' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#D1CA25' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#22C55E' }} />
          <span style={{ marginLeft: 14, color: '#94A3B8', fontSize: 14, fontFamily: 'monospace' }}>
            https://taga-askai.vercel.app/
          </span>
        </div>

        <div style={{ position: 'relative', width: '100%', height: 460, overflow: 'hidden' }}>
          <Img
            src={staticFile('screenshots/clean_app_hero.png')}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
          />
        </div>
      </div>

      <MasterSubtitleOverlay
        badge="The Solution"
        text="Meet TAGA-asK AI. Ask a question, and get answers grounded in UMak documents, with sources."
        accentColor={BRAND_COLORS.cyan}
        isLandscape={true}
      />
    </div>
  );
};
