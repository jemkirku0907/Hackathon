import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../../components/BackgroundGlow';
import { LightSweep } from '../../../components/FloatingElements';
import { MasterSubtitleOverlay } from '../../../components/MasterSubtitleOverlay';
import { BRAND_COLORS } from '../../../types';

export const LSMasterScene4DemoCIT: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14, mass: 0.9 } });
  const zoom = interpolate(frame, [0, 160, 420], [1, 1.12, 1.18], { extrapolateRight: 'clamp' });
  const panY = interpolate(frame, [0, 160, 420], [0, -20, -35], { extrapolateRight: 'clamp' });

  const citationSpring = spring({ frame: frame - 180, fps, config: { damping: 13, mass: 0.8 } });

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

      {/* Top Header Badge */}
      <div
        style={{
          position: 'absolute',
          top: 45,
          backgroundColor: 'rgba(33, 173, 227, 0.15)',
          border: `1.5px solid ${BRAND_COLORS.cyan}`,
          color: BRAND_COLORS.cyan,
          fontSize: 16,
          fontWeight: 800,
          padding: '6px 22px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          zIndex: 30,
        }}
      >
        <span>Strictly Grounded &amp; Verified</span>
      </div>

      {/* Real Application Window Showcase */}
      <div
        style={{
          position: 'relative',
          width: 1380,
          borderRadius: 20,
          overflow: 'hidden',
          backgroundColor: '#0A0E1A',
          border: '1.5px solid rgba(255, 255, 255, 0.16)',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.9), 0 0 50px rgba(63, 86, 202, 0.35)',
          transform: `scale(${entrance * zoom}) translateY(${panY}px)`,
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
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
            padding: '0 18px',
            gap: 8,
          }}
        >
          <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#EC202B' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#D1CA25' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#22C55E' }} />
          <span style={{ marginLeft: 14, color: '#94A3B8', fontSize: 13, fontFamily: 'monospace' }}>
            https://taga-askai.vercel.app/
          </span>
        </div>

        {/* Real Dark Mode Screenshot (dark_cit_answer.png) */}
        <div style={{ position: 'relative', width: '100%', height: 500, overflow: 'hidden' }}>
          <Img
            src={staticFile('screenshots/dark_cit_answer.png')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 40%',
            }}
          />

          <LightSweep startFrame={185} duration={35} color="rgba(209, 202, 37, 0.45)" />

          {/* Citation Callout */}
          {frame >= 180 && (
            <div
              style={{
                position: 'absolute',
                bottom: 40,
                right: 30,
                transform: `scale(${citationSpring})`,
                backgroundColor: 'rgba(15, 23, 42, 0.96)',
                border: `2px solid ${BRAND_COLORS.yellow}`,
                borderRadius: 14,
                padding: '12px 20px',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.85)',
              }}
            >
              <div style={{ color: BRAND_COLORS.yellow, fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Exact Source Citation
              </div>
              <div style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 800 }}>
                Source03.pdf • Page 1
              </div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>
                Admin Building: Second Floor, South Wing
              </div>
            </div>
          )}
        </div>
      </div>

      <MasterSubtitleOverlay
        badge="Verified Citation"
        text="Ask where the CIT is in the Admin Building. TAGA-asK AI answers: Second Floor, South Wing. And it shows where that answer came from: Source zero three, page one."
        accentColor={BRAND_COLORS.yellow}
        isLandscape={true}
      />
    </div>
  );
};
