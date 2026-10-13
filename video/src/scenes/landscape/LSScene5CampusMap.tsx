import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { RefStyleCaption } from '../../components/RefStyleCaption';
import { BRAND_COLORS } from '../../types';

export const LSScene5CampusMap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 13, mass: 0.9 },
  });

  const pulse = interpolate(Math.sin(frame / 6), [-1, 1], [0.95, 1.25]);

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: BRAND_COLORS.yellow,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, #F5EC38 0%, #D1CA25 80%)',
        }}
      />

      {/* Campus Map Visualizer Card */}
      <div
        style={{
          width: 1380,
          backgroundColor: '#0B132B',
          border: `2px solid ${BRAND_COLORS.blue}`,
          borderRadius: 28,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.55)',
          transform: `scale(${entrance})`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 32px',
            backgroundColor: '#111C3D',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 26 }}>📍</span>
            <div>
              <h3 style={{ margin: 0, color: '#FFFFFF', fontSize: 22, fontWeight: 800 }}>
                Interactive Campus Map Visualizer
              </h3>
              <p style={{ margin: '2px 0 0', color: '#94A3B8', fontSize: 15 }}>
                Admin Building • Second Floor • South Wing (CIT)
              </p>
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'rgba(209, 202, 37, 0.2)',
              border: `1.5px solid ${BRAND_COLORS.yellow}`,
              color: BRAND_COLORS.yellow,
              padding: '6px 16px',
              borderRadius: 999,
              fontSize: 15,
              fontWeight: 800,
            }}
          >
            LIVE PIN HIGHLIGHT
          </div>
        </div>

        {/* Blueprint Layout Area */}
        <div
          style={{
            height: 480,
            backgroundColor: '#070C1D',
            position: 'relative',
            padding: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'relative', width: 1100, height: 400 }}>
            {/* Admin Building (Target with Active Pin) */}
            <div
              style={{
                position: 'absolute',
                left: '20%',
                top: '25%',
                width: 280,
                height: 160,
                borderRadius: 20,
                backgroundColor: 'rgba(63, 86, 202, 0.45)',
                border: `3px solid ${BRAND_COLORS.cyan}`,
                boxShadow: `0 0 50px ${BRAND_COLORS.cyan}80`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 14,
              }}
            >
              {/* Pulsing Pin */}
              <div
                style={{
                  position: 'absolute',
                  top: -24,
                  transform: `scale(${pulse})`,
                  backgroundColor: BRAND_COLORS.red,
                  color: '#FFFFFF',
                  width: 46,
                  height: 46,
                  borderRadius: '50% 50% 50% 0',
                  transformOrigin: 'bottom left',
                  rotate: '-45deg',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 30px ${BRAND_COLORS.red}`,
                }}
              >
                <div style={{ rotate: '45deg', fontSize: 20 }}>📍</div>
              </div>

              <span style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 800 }}>Admin Building</span>
              <span style={{ color: BRAND_COLORS.yellow, fontSize: 16, fontWeight: 700, marginTop: 4 }}>
                CIT Office (Floor 2, South Wing)
              </span>
            </div>

            {/* HPSB Building */}
            <div
              style={{
                position: 'absolute',
                left: '55%',
                top: '15%',
                width: 320,
                height: 140,
                borderRadius: 16,
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1.5px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94A3B8',
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              HPSB Building (12 Floors)
            </div>

            {/* Acad Building 1 */}
            <div
              style={{
                position: 'absolute',
                left: '20%',
                top: '72%',
                width: 220,
                height: 80,
                borderRadius: 14,
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
                top: '72%',
                width: 240,
                height: 80,
                borderRadius: 14,
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
              Acad Building 2 &amp; 3
            </div>

            {/* Stadium */}
            <div
              style={{
                position: 'absolute',
                left: '74%',
                top: '60%',
                width: 220,
                height: 120,
                borderRadius: 30,
                backgroundColor: 'rgba(236, 32, 43, 0.12)',
                border: '1.5px solid rgba(236, 32, 43, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EF4444',
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              UMak Stadium
            </div>
          </div>
        </div>
      </div>

      <RefStyleCaption
        title="Interactive campus map."
        subtitle="Real-time building, floor, and room pin visualizer."
      />
    </div>
  );
};
