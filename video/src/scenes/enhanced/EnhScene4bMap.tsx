import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../components/BackgroundGlow';
import { SubtitleOverlay } from '../../components/SubtitleOverlay';
import { BRAND_COLORS } from '../../types';

export const EnhScene4bMap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 13, mass: 0.9 },
  });

  // Pin pulse animation
  const pulse = interpolate(Math.sin(frame / 6), [-1, 1], [0.95, 1.25]);
  const mapZoom = interpolate(frame, [40, 180], [1, 1.12], { extrapolateRight: 'clamp' });

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
      <BackgroundGlow primaryColor={BRAND_COLORS.blue} secondaryColor={BRAND_COLORS.red} />

      {/* Top Feature Tag */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          backgroundColor: 'rgba(236, 32, 43, 0.25)',
          border: `2px solid ${BRAND_COLORS.red}`,
          color: '#FFFFFF',
          fontSize: 22,
          fontWeight: 800,
          padding: '8px 26px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ color: BRAND_COLORS.red }}>📍</span> FEATURE 2: CAMPUS MAP VISUALIZER
      </div>

      {/* Campus Map Visualizer Modal Card */}
      <div
        style={{
          width: 980,
          backgroundColor: '#0B132B',
          border: `2px solid ${BRAND_COLORS.blue}`,
          borderRadius: 32,
          overflow: 'hidden',
          boxShadow: '0 30px 100px rgba(0, 0, 0, 0.85), 0 0 50px rgba(63, 86, 202, 0.3)',
          transform: `scale(${entrance * mapZoom})`,
          marginTop: -60,
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '24px 32px',
            backgroundColor: '#111C3D',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 28 }}>📍</span>
            <div>
              <h3 style={{ margin: 0, color: '#FFFFFF', fontSize: 24, fontWeight: 800 }}>
                Interactive Campus Map Visualizer
              </h3>
              <p style={{ margin: '4px 0 0', color: '#94A3B8', fontSize: 16 }}>
                Admin Building • Second Floor • South Wing
              </p>
            </div>
          </div>
          <div
            style={{
              backgroundColor: `${BRAND_COLORS.yellow}20`,
              border: `1.5px solid ${BRAND_COLORS.yellow}`,
              color: BRAND_COLORS.yellow,
              padding: '6px 16px',
              borderRadius: 999,
              fontSize: 16,
              fontWeight: 800,
            }}
          >
            ACTIVE PINPOINT
          </div>
        </div>

        {/* Blueprint Schematic UMak Campus Layout */}
        <div
          style={{
            position: 'relative',
            height: 480,
            backgroundColor: '#070C1D',
            padding: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'relative', width: 840, height: 420 }}>
            {/* Admin Building (Target with Active Pin) */}
            <div
              style={{
                position: 'absolute',
                left: '18%',
                top: '25%',
                width: 240,
                height: 145,
                borderRadius: 22,
                backgroundColor: 'rgba(63, 86, 202, 0.45)',
                border: `3px solid ${BRAND_COLORS.cyan}`,
                boxShadow: `0 0 45px ${BRAND_COLORS.cyan}80`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 12,
              }}
            >
              {/* Pulsing Pin Marker */}
              <div
                style={{
                  position: 'absolute',
                  top: -26,
                  transform: `scale(${pulse})`,
                  backgroundColor: BRAND_COLORS.red,
                  color: '#FFFFFF',
                  width: 50,
                  height: 50,
                  borderRadius: '50% 50% 50% 0',
                  transformOrigin: 'bottom left',
                  rotate: '-45deg',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 25px ${BRAND_COLORS.red}`,
                }}
              >
                <div style={{ rotate: '45deg', fontSize: 22 }}>📍</div>
              </div>

              <span style={{ color: '#FFFFFF', fontSize: 21, fontWeight: 800 }}>Admin Building</span>
              <span style={{ color: BRAND_COLORS.yellow, fontSize: 15, fontWeight: 700, marginTop: 4 }}>
                CIT Office (Floor 2, South)
              </span>
            </div>

            {/* HPSB */}
            <div
              style={{
                position: 'absolute',
                left: '56%',
                top: '15%',
                width: 280,
                height: 125,
                borderRadius: 16,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1.5px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94A3B8',
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              HPSB Building (12 Floors)
            </div>

            {/* Acad Building 1 */}
            <div
              style={{
                position: 'absolute',
                left: '18%',
                top: '68%',
                width: 190,
                height: 85,
                borderRadius: 16,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1.5px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94A3B8',
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              Acad Building 1
            </div>

            {/* Acad Building 2-3 */}
            <div
              style={{
                position: 'absolute',
                left: '46%',
                top: '68%',
                width: 190,
                height: 85,
                borderRadius: 16,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1.5px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94A3B8',
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              Acad Building 2–3
            </div>

            {/* UMak Stadium */}
            <div
              style={{
                position: 'absolute',
                left: '73%',
                top: '55%',
                width: 190,
                height: 125,
                borderRadius: 30,
                backgroundColor: 'rgba(236, 32, 43, 0.1)',
                border: '1.5px solid rgba(236, 32, 43, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EF4444',
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              UMak Stadium
            </div>
          </div>
        </div>

        {/* Directory Footer */}
        <div
          style={{
            padding: '20px 32px',
            backgroundColor: '#0F1A3A',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: BRAND_COLORS.yellow, fontSize: 22 }}>⚡</span>
            <span style={{ color: '#F8FAFC', fontSize: 18, fontWeight: 700 }}>
              South Wing: Center for Information Technology (CIT), LLC Library
            </span>
          </div>
          <span style={{ color: BRAND_COLORS.cyan, fontSize: 16, fontWeight: 700 }}>
            Source03.pdf • Page 1
          </span>
        </div>
      </div>

      <SubtitleOverlay
        badge="Campus Navigation"
        text="Lost on campus? The interactive campus map visualizer pinpoints the exact building, floor, and wing in real time."
        accentColor={BRAND_COLORS.red}
      />
    </div>
  );
};
