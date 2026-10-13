import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../components/BackgroundGlow';
import { SubtitleOverlay } from '../../components/SubtitleOverlay';
import { BRAND_COLORS } from '../../types';

export const EnhScene3AppCIT: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth entrance
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  // Question typing simulation
  const fullQuestion = 'Where is the Center for Information Technology located in the Admin Building?';
  const textChars = Math.min(
    fullQuestion.length,
    Math.floor(interpolate(frame, [20, 80], [0, fullQuestion.length], { extrapolateRight: 'clamp' }))
  );
  const typedQuestion = fullQuestion.slice(0, textChars);

  // Response appearance (springs in after typing)
  const responseSpring = spring({
    frame: frame - 90,
    fps,
    config: { damping: 13, mass: 0.8 },
  });

  // Zoom into the verified answer and citation
  const cameraZoom = interpolate(frame, [150, 260], [1, 1.18], { extrapolateRight: 'clamp' });
  const panY = interpolate(frame, [150, 260], [0, -90], { extrapolateRight: 'clamp' });

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
      <BackgroundGlow primaryColor={BRAND_COLORS.blue} secondaryColor={BRAND_COLORS.cyan} />

      {/* Top Header Badge */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          backgroundColor: 'rgba(33, 173, 227, 0.25)',
          border: `2px solid ${BRAND_COLORS.cyan}`,
          color: BRAND_COLORS.cyan,
          fontSize: 22,
          fontWeight: 800,
          padding: '8px 26px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          zIndex: 20,
        }}
      >
        <span>⚡</span> REAL-TIME VERIFIED RAG
      </div>

      {/* Main Clean Application Container */}
      <div
        style={{
          width: 980,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          transform: `scale(${entrance * cameraZoom}) translateY(${panY}px)`,
          marginTop: -60,
        }}
      >
        {/* App Header Banner */}
        <div
          style={{
            backgroundColor: '#0F172A',
            border: '2px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 20,
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Img
              src={staticFile('umak-seal.png')}
              style={{ width: 36, height: 36, objectFit: 'contain' }}
            />
            <div>
              <div style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 800 }}>UMak Knowledge Base</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Exclusively referencing Source01 to Source04</div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.2)',
              border: '1.5px solid #22C55E',
              color: '#4ADE80',
              padding: '6px 14px',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>●</span> 100% Grounded
          </div>
        </div>

        {/* User Question Message */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div
            style={{
              backgroundColor: BRAND_COLORS.blue,
              color: '#FFFFFF',
              borderRadius: '26px 26px 4px 26px',
              padding: '22px 30px',
              fontSize: 25,
              fontWeight: 600,
              maxWidth: 780,
              boxShadow: '0 10px 40px rgba(63, 86, 202, 0.4)',
              lineHeight: 1.4,
            }}
          >
            {typedQuestion}
            {frame < 85 && <span style={{ color: BRAND_COLORS.yellow, fontWeight: 900 }}>|</span>}
          </div>
        </div>

        {/* Assistant Response Bubble (Success / Grounded / No Error) */}
        {frame > 85 && (
          <div
            style={{
              display: 'flex',
              gap: 18,
              transform: `scale(${responseSpring})`,
              transformOrigin: 'top left',
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 20,
                backgroundColor: '#1E293B',
                border: `2px solid ${BRAND_COLORS.blue}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                flexShrink: 0,
              }}
            >
              <Img
                src={staticFile('taga-bird.png')}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: '#111827',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '4px 28px 28px 28px',
                padding: '28px 34px',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.7)',
              }}
            >
              {/* Verified Pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: 'rgba(34, 197, 94, 0.15)',
                  border: '1.5px solid #22C55E',
                  color: '#4ADE80',
                  padding: '6px 16px',
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 700,
                  marginBottom: 16,
                }}
              >
                <span>✓</span> Strictly Grounded &amp; Concise Answer (&lt;30 words)
              </div>

              {/* Exact verified answer */}
              <p
                style={{
                  margin: 0,
                  color: '#F8FAFC',
                  fontSize: 27,
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}
              >
                The <strong>Center for Information Technology (CIT)</strong> is located on the{' '}
                <strong style={{ color: BRAND_COLORS.cyan }}>Second Floor</strong>,{' '}
                <strong style={{ color: BRAND_COLORS.yellow }}>South Wing</strong>,{' '}
                <strong>Admin Building</strong>.
              </p>

              {/* Verified Citation Pill with Pulse */}
              <div
                style={{
                  marginTop: 22,
                  paddingTop: 18,
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    backgroundColor: frame > 160 ? 'rgba(33, 173, 227, 0.35)' : 'rgba(33, 173, 227, 0.15)',
                    border: `2px solid ${BRAND_COLORS.cyan}`,
                    borderRadius: 14,
                    padding: '10px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    boxShadow: frame > 160 ? `0 0 35px ${BRAND_COLORS.cyan}90` : 'none',
                  }}
                >
                  <span style={{ fontSize: 22 }}>📄</span>
                  <span style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700 }}>
                    Source03.pdf • Page 1
                  </span>
                  <span
                    style={{
                      backgroundColor: BRAND_COLORS.cyan,
                      color: '#090E1A',
                      fontSize: 13,
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: 6,
                    }}
                  >
                    OFFICIAL
                  </span>
                </div>

                <div style={{ color: '#94A3B8', fontSize: 16, fontWeight: 600 }}>
                  Response time: <strong>0.8s</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <SubtitleOverlay
        badge="Direct Answer & Verified Citation"
        text="Enter TAGA-asK AI. Ask where the CIT office is located, and get an instant answer: Second Floor, South Wing, Admin Building, with verified page citations."
        accentColor={BRAND_COLORS.cyan}
      />
    </div>
  );
};
