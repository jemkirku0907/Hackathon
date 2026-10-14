import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../components/BackgroundGlow';
import { LightSweep } from '../../components/FloatingElements';
import { MasterSubtitleOverlay } from '../../components/MasterSubtitleOverlay';
import { BRAND_COLORS } from '../../types';

export const MasterScene4DemoCIT: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({ frame, fps, config: { damping: 14, mass: 0.9 } });

  // Camera focus on the answer and citation
  const zoom = interpolate(frame, [0, 160, 420], [1, 1.15, 1.22], { extrapolateRight: 'clamp' });
  const panY = interpolate(frame, [0, 160, 420], [0, -30, -50], { extrapolateRight: 'clamp' });

  // Citation highlight card emergence (Frame 180+)
  const citationSpring = spring({ frame: frame - 180, fps, config: { damping: 13, mass: 0.8 } });

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
      <BackgroundGlow primaryColor={BRAND_COLORS.blue} secondaryColor={BRAND_COLORS.cyan} />

      {/* Top Header Badge */}
      <div
        style={{
          position: 'absolute',
          top: 140,
          backgroundColor: 'rgba(33, 173, 227, 0.15)',
          border: `1.5px solid ${BRAND_COLORS.cyan}`,
          color: BRAND_COLORS.cyan,
          fontSize: 22,
          fontWeight: 800,
          padding: '8px 26px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          zIndex: 30,
          boxShadow: '0 4px 20px rgba(33, 173, 227, 0.3)',
        }}
      >
        <span>Strictly Grounded &amp; Verified</span>
      </div>

      {/* Real Application Screenshot Window */}
      <div
        style={{
          position: 'relative',
          width: 980,
          borderRadius: 24,
          overflow: 'hidden',
          backgroundColor: '#0A0E1A',
          border: '1.5px solid rgba(255, 255, 255, 0.16)',
          boxShadow: '0 30px 100px rgba(0, 0, 0, 0.9), 0 0 50px rgba(63, 86, 202, 0.35)',
          transform: `scale(${entrance * zoom}) translateY(${panY}px)`,
          marginTop: -30,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 20,
        }}
      >
        {/* Browser Top Bar */}
        <div
          style={{
            height: 48,
            backgroundColor: '#111827',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            gap: 8,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#EC202B' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#D1CA25' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#22C55E' }} />
          <span style={{ marginLeft: 16, color: '#94A3B8', fontSize: 15, fontFamily: 'monospace' }}>
            https://taga-askai.vercel.app/
          </span>
        </div>

        {/* Real Dark Mode Screenshot (dark_cit_answer.png) */}
        <div style={{ position: 'relative', width: '100%', height: 720, overflow: 'hidden' }}>
          <Img
            src={staticFile('screenshots/dark_cit_answer.png')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 38%',
            }}
          />

          {/* Light Sweep over the verified answer citation */}
          <LightSweep startFrame={185} duration={35} color="rgba(209, 202, 37, 0.45)" />

          {/* Restrained, Clean Citation Callout Badge */}
          {frame >= 180 && (
            <div
              style={{
                position: 'absolute',
                bottom: 80,
                right: 30,
                transform: `scale(${citationSpring})`,
                backgroundColor: 'rgba(15, 23, 42, 0.96)',
                border: `2px solid ${BRAND_COLORS.yellow}`,
                borderRadius: 16,
                padding: '14px 22px',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.85), 0 0 25px rgba(209, 202, 37, 0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <div>
                <div style={{ color: BRAND_COLORS.yellow, fontSize: 14, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Exact Source Citation
                </div>
                <div style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 800 }}>
                  Source03.pdf • Page 1
                </div>
                <div style={{ color: '#94A3B8', fontSize: 14, fontWeight: 600 }}>
                  Admin Building: Second Floor, South Wing
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <MasterSubtitleOverlay
        badge="Verified Citation"
        text="Ask where the CIT is in the Admin Building. TAGA-asK AI answers: Second Floor, South Wing. And it shows where that answer came from: Source zero three, page one."
        accentColor={BRAND_COLORS.yellow}
      />
    </div>
  );
};
